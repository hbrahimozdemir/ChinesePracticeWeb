// ══════════════════════════════════════════════════════════════
//  CONFIG — Render deploy sonrası kendi URL'ini localStorage'a kaydeder
// ══════════════════════════════════════════════════════════════
const CONFIG_KEY = 'tts_server_url';

function getSavedServer() {
  return localStorage.getItem(CONFIG_KEY) || '';
}
function saveServer(url) {
  localStorage.setItem(CONFIG_KEY, url.trim().replace(/\/$/, ''));
}

// ══════════════════════════════════════════════════════════════
//  TTS ENGINE
// ══════════════════════════════════════════════════════════════
const TTS = (() => {
  let unlocked = false;
  if (typeof window !== 'undefined') {
    const unlock = () => {
      if (!unlocked && 'speechSynthesis' in window) {
        const u = new SpeechSynthesisUtterance('');
        u.volume = 0;
        window.speechSynthesis.speak(u);
        unlocked = true;
        document.removeEventListener('touchstart', unlock);
        document.removeEventListener('click', unlock);
      }
    };
    document.addEventListener('touchstart', unlock, { once: true });
    document.addEventListener('click', unlock, { once: true });
  }

  function wsSpeak(text, btn, isRepeat) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'zh-CN';
    u.rate = isRepeat ? 0.55 : 0.85;
    u.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      // Prioritize Google voices or specific high-quality ones often found on mobile/desktop
      const preferred = voices.find(v => v.lang.includes('zh') && (v.name.includes('Google') || v.name.includes('Premium') || v.name.includes('Xiaoxiao')));
      const fallback = voices.find(v => v.lang.startsWith('zh'));
      if (preferred) u.voice = preferred;
      else if (fallback) u.voice = fallback;
    }

    if (btn) btn.classList.add('playing');
    u.onend = () => { if (btn) btn.classList.remove('playing'); };
    u.onerror = (e) => {
      console.warn('TTS Error', e);
      if (btn) btn.classList.remove('playing');
    };
    window.speechSynthesis.speak(u);
  }
  return {
    init: async () => { },
    speak: (text, btn = null, isRepeat = false) => {
      wsSpeak(text, btn, isRepeat);
    }
  };
})();

// Tekrarçalınma takibi: aynı metin 4 saniye içinde tekrar çalınırsa yavaş mod
let _lastSpokenText = '', _lastSpokenAt = 0;
const speak = (t, b) => {
  if (!t) return;
  const now = Date.now();
  const isRepeat = (t === _lastSpokenText) && (now - _lastSpokenAt < 4000);
  _lastSpokenText = t;
  _lastSpokenAt = now;
  TTS.speak(t, b, isRepeat);
};

// ══════════════════════════════════════════════════════════════
//  STATE
// ══════════════════════════════════════════════════════════════
const S = {
  tab: 'dictionary', hskLevel: 'all', unitFilter: 'all', words: [],
  selected: null, graphSearch: '', showUnitLinks: false, quizMode: 'hanzi', quizCorrect: null, quizMeaningShown: false,
  flashIdx: 0, flashFlipped: false, flashOrder: [],
  quizIdx: 0, quizAnswered: false, quizSelected: null, quizScore: [], quizOptions: [], quizOrder: [],
  sentIdx: 0, sentUser: [], sentAvail: [], sentStatus: 'idle',

};

// ══════════════════════════════════════════════════════════════
//  DATA (Kullanıcı İlişkisel Sözlüğü)
// ══════════════════════════════════════════════════════════════



// ══════════════════════════════════════════════════════════════
//  FILTER
// ══════════════════════════════════════════════════════════════
function filterWords() {
  const l = S.hskLevel;
  const u = S.unitFilter || 'all';
  let filtered = l === 'all' ? WORDS : l === '1-2' ? WORDS.filter(w => w.hsk <= 2) : l === '3-4' ? WORDS.filter(w => w.hsk >= 3 && w.hsk <= 4) : WORDS.filter(w => w.hsk >= 5);

  if (u !== 'all') {
    // If unit 7 or 8 is selected, show both (as they are combined in the curriculum)
    if (u == 7 || u == 8) {
      filtered = filtered.filter(w => w.unit == 7 || w.unit == 8);
    } else {
      filtered = filtered.filter(w => w.unit == u);
    }
  }
  S.words = filtered;
}

// ══════════════════════════════════════════════════════════════
//  D3 GRAPH
// ══════════════════════════════════════════════════════════════
let sim = null;

// Bir bileşik kelimenin tüm karakterlerini döndürür (WORDS'te varsa)
function compoundChars(comp) {
  const chars = [];
  for (const ch of comp) {
    if (WORDS.find(x => x.hanzi === ch)) chars.push(ch);
  }
  return chars;
}

function buildGraph(center) {
  if (!center) return null;
  const nodes = [], links = [], seen = new Set();
  // add(word, isCenter, type) - type: 'center'|'compound'|'char'|'unit'|'mdbg'
  const add = (w, iC = false, type = 'local') => {
    if (seen.has(w.hanzi)) return;
    seen.add(w.hanzi);
    nodes.push({ id: w.hanzi, pinyin: w.pinyin, meaning: w.tr || w.en, hsk: w.hsk, isCenter: iC, nodeType: type });
  };
  add(center, true, 'center');

  // 1️⃣ Compound connections (legacy)
  (center.compounds || []).forEach(c => {
    const chars = compoundChars(c);
    if (chars.length >= 2) {
      chars.forEach((ch, i) => {
        const w = WORDS.find(x => x.hanzi === ch) || { hanzi: ch, pinyin: '', tr: '', en: '', hsk: center.hsk, compounds: [] };
        add(w, false, 'compound');
        if (i > 0) links.push({ source: chars[i - 1], target: ch, ltype: 'compound' });
        if (ch !== center.hanzi && i === 0) links.push({ source: center.hanzi, target: ch, ltype: 'compound' });
      });
    } else {
      const w = WORDS.find(x => x.hanzi === c) || { hanzi: c, pinyin: '', tr: '', en: '', hsk: center.hsk, compounds: [] };
      add(w, false, 'compound');
      links.push({ source: center.hanzi, target: c, ltype: 'compound' });
    }
  });

  // 2️⃣ Shared character connections - words that share characters with center
  const centerChars = [...new Set([...center.hanzi])];
  centerChars.forEach(ch => {
    WORDS.forEach(w => {
      if (w.hanzi === center.hanzi || seen.has(w.hanzi)) return;
      if (w.hanzi.includes(ch)) {
        add(w, false, 'char');
        links.push({ source: center.hanzi, target: w.hanzi, ltype: 'char', shared: ch });
      }
    });
  });

  // 3️⃣ Reverse: words whose compounds include center
  WORDS.forEach(w => {
    if (w.hanzi === center.hanzi) return;
    if ((w.compounds || []).includes(center.hanzi) && !seen.has(w.hanzi)) {
      add(w, false, 'compound');
      links.push({ source: w.hanzi, target: center.hanzi, ltype: 'compound' });
    }
  });

  // 4️⃣ Same-unit context connections (toggle)
  if (S.showUnitLinks) {
    WORDS.filter(w => w.unit === center.unit && w.hanzi !== center.hanzi && !seen.has(w.hanzi)).slice(0, 5).forEach(w => {
      add(w, false, 'unit');
      links.push({ source: center.hanzi, target: w.hanzi, ltype: 'unit' });
    });
  }

  return { nodes, links };
}

function renderGraph(center) {
  const el = document.getElementById('graph-container'); if (!el) return;
  el.innerHTML = '';
  if (!center) { el.innerHTML = `<div class="graph-empty"><div class="big">学</div><p class="muted">Kelime seçin veya arama yapın</p></div>`; return; }
  const data = buildGraph(center);
  if (!data || !data.nodes.length) { el.innerHTML = `<div class="graph-empty"><p class="muted">Bağlantı bulunamadı</p></div>`; return; }
  const W = el.clientWidth || 700, H = el.clientHeight || 490;
  const svg = d3.select(el).append('svg').attr('viewBox', `0 0 ${W} ${H}`);
  svg.append('defs').append('marker').attr('id', 'arr').attr('viewBox', '0 -5 10 10').attr('refX', 24).attr('refY', 0).attr('markerWidth', 5).attr('markerHeight', 5).attr('orient', 'auto').append('path').attr('d', 'M0,-5L10,0L0,5').attr('fill', 'rgba(232,184,75,0.45)');
  const g = svg.append('g');
  svg.call(d3.zoom().scaleExtent([0.2, 4]).on('zoom', e => g.attr('transform', e.transform)));
  if (sim) sim.stop();
  sim = d3.forceSimulation(data.nodes).force('link', d3.forceLink(data.links).id(d => d.id).distance(105)).force('charge', d3.forceManyBody().strength(-260)).force('center', d3.forceCenter(W / 2, H / 2)).force('collision', d3.forceCollide(44));
  const linkColor = d => d.ltype === 'unit' ? 'rgba(59,130,246,0.35)' : d.ltype === 'char' ? 'rgba(16,185,129,0.35)' : 'rgba(232,184,75,0.28)';
  const link = g.append('g').selectAll('line').data(data.links).enter().append('line').attr('stroke', linkColor).attr('stroke-width', 1.5).attr('marker-end', 'url(#arr)');
  const nd = g.append('g').selectAll('g').data(data.nodes).enter().append('g').style('cursor', 'pointer').call(d3.drag().on('start', (e, d) => { if (!e.active) sim.alphaTarget(0.3).restart(); d.fx = d.x; d.fy = d.y; }).on('drag', (e, d) => { d.fx = e.x; d.fy = e.y; }).on('end', (e, d) => { if (!e.active) sim.alphaTarget(0); d.fx = null; d.fy = null; }));
  nd.append('circle')
    .attr('r', d => d.isCenter ? 35 : 25)
    .attr('fill', d => d.isCenter ? 'rgba(232,184,75,0.14)' : d.nodeType === 'unit' ? 'rgba(59,130,246,0.07)' : d.nodeType === 'char' ? 'rgba(16,185,129,0.07)' : 'rgba(34,34,40,0.96)')
    .attr('stroke', d => d.isCenter ? '#e8b84b' : d.nodeType === 'unit' ? '#3b82f6' : d.nodeType === 'char' ? '#10b981' : '#3e3e48')
    .attr('stroke-width', d => d.isCenter ? 2 : 1)

  nd.append('text').attr('text-anchor', 'middle').attr('dominant-baseline', 'central').attr('font-family', 'Noto Serif SC,serif').attr('font-size', d => d.isCenter ? '1.3rem' : '0.95rem').attr('fill', d => d.isCenter ? '#e8b84b' : '#f0ede6').text(d => d.id);
  nd.append('text').attr('text-anchor', 'middle').attr('y', d => d.isCenter ? 48 : 35).attr('font-family', 'Space Mono,monospace').attr('font-size', '0.5rem').attr('fill', '#9a9890').text(d => d.pinyin);
  nd.on('click', (e, d) => { const w = WORDS.find(x => x.hanzi === d.id); if (w) { S.selected = w; renderGraph(w); renderDetail(); updWL(); } });
  const tt = document.getElementById('tooltip');
  nd.on('mouseover', (e, d) => { document.getElementById('tt-hz').textContent = d.id; document.getElementById('tt-py').textContent = d.pinyin; document.getElementById('tt-mn').textContent = d.meaning || ''; tt.style.display = 'block'; }).on('mousemove', e => { tt.style.left = (e.clientX + 13) + 'px'; tt.style.top = (e.clientY - 8) + 'px'; }).on('mouseout', () => { tt.style.display = 'none'; });
  sim.on('tick', () => { link.attr('x1', d => d.source.x).attr('y1', d => d.source.y).attr('x2', d => d.target.x).attr('y2', d => d.target.y); nd.attr('transform', d => `translate(${d.x},${d.y})`); });
}

// ══════════════════════════════════════════════════════════════
//  RENDER
// ══════════════════════════════════════════════════════════════
function render() {
  document.addEventListener('click', e => {
    const p = e.target.closest('.pill');
    if (p) {
      if (p.dataset.level) S.hskLevel = p.dataset.level;
      if (p.dataset.unit) S.unitFilter = p.dataset.unit;
      S.flashIdx = 0; S.flashFlipped = false; S.flashOrder = [];
      S.quizIdx = 0; S.quizScore = []; S.quizOptions = []; S.quizOrder = [];
      filterWords();
      if (S.tab === 'dictionary') { renderDict(); renderGraph(S.selected); }
      if (S.tab === 'flashcards') { renderFlash(); }
      if (S.tab === 'quiz') { initQuiz(); renderQuiz(); }
    }
  });

  document.querySelectorAll('#nav button').forEach(b => b.classList.toggle('active', b.dataset.tab === S.tab));
  if (S.tab === 'dictionary') renderDict();
  else if (S.tab === 'flashcards') renderFlash();
  else if (S.tab === 'sentences') renderSent();
  else if (S.tab === 'quiz') renderQuiz();
}

function levelPills() {
  const hsk = ['all', '1-2', '3-4', '5-6'].map(l => `<button class="pill ${S.hskLevel === l ? 'active' : ''}" data-level="${l}">${l === 'all' ? 'Tümü' : 'HSK ' + l}</button>`).join('');
  let unitsHtml = '';
  if (S.tab === 'flashcards' || S.tab === 'dictionary' || S.tab === 'quiz') {
    const units = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    unitsHtml = '<div style="width:100%; height:4px"></div>' + '<button class="pill ' + (S.unitFilter === 'all' ? 'active' : '') + '" data-unit="all">Tüm Üniteler</button>' +
      units.map(u => `<button class="pill ${S.unitFilter == u ? 'active' : ''}" data-unit="${u}">Ünite ${u}</button>`).join('');
  }
  return hsk + unitsHtml;
}
// ── DICTIONARY ────────────────────────────────────────────────
let hwWriter = null;
function renderStroke(boxId, hanzi) {
  const box = document.getElementById(boxId);
  if (!box || !hanzi) return;
  box.innerHTML = '';
  const isMobile = window.innerWidth <= 768;
  const size = isMobile ? 100 : 140;
  try {
    hwWriter = HanziWriter.create(boxId, hanzi[0], {
      width: size, height: size,
      padding: 5,
      strokeAnimationSpeed: 1.5,
      delayBetweenStrokes: 200,
      strokeColor: '#e8b84b',
      radicalColor: '#4caf7d',
      outlineColor: '#2e2e38'
    });
    hwWriter.loopCharacterAnimation();
  } catch (e) { console.error('HanziWriter err', e); }
}
function renderDict() {
  const f = S.words.filter(w => { const q = S.graphSearch.toLowerCase().trim(); return !q || w.hanzi.includes(q) || w.pinyin.toLowerCase().includes(q) || (w.tr || '').toLowerCase().includes(q) || (w.en || '').toLowerCase().includes(q); });

  if (document.getElementById('dsearch') && document.querySelector('.word-list')) {
    document.querySelector('.word-list').innerHTML = f.map(w => `<div class="word-row ${S.selected?.hanzi === w.hanzi ? 'selected' : ''}" data-h="${w.hanzi}"><span class="hw">${w.hanzi}</span><div style="flex:1;min-width:0"><div class="py">${w.pinyin}</div><div class="mn">${(w.tr || w.en || '').split(' / ')[0]}</div></div>${w.hsk ? `<span class="lv-badge">H${w.hsk}</span>` : ''}</div>`).join('') + (!f.length ? `<div class="muted" style="text-align:center;padding:2rem">Sonuç yok</div>` : '');
    const mc = document.getElementById('dict-count'); if (mc) mc.textContent = `${f.length} kelime`;
    document.querySelectorAll('.word-list .word-row').forEach(r => r.addEventListener('click', () => { S.selected = WORDS.find(x => x.hanzi === r.dataset.h); renderDict(); renderGraph(S.selected); renderDetail(); updWL(); }));
    updWL();
    return;
  }

  document.getElementById('main').innerHTML = `
    <div class="grid-3" style="align-items:start">
      <div class="card" style="padding:1rem">
        <div style="margin-bottom:0.85rem">
          <div class="search-wrap" style="margin-bottom:0.6rem"><span class="icon">🔍</span><input id="dsearch" type="text" placeholder="Hanzi, pinyin, anlam..." value="${S.graphSearch}"/></div>
          <div class="level-pills">${levelPills()}</div>
          <div class="muted" style="margin-top:0.4rem" id="dict-count">${f.length} kelime</div>
        </div>
        <div class="word-list">
          ${f.map(w => `<div class="word-row ${S.selected?.hanzi === w.hanzi ? 'selected' : ''}" data-h="${w.hanzi}"><span class="hw">${w.hanzi}</span><div style="flex:1;min-width:0"><div class="py">${w.pinyin}</div><div class="mn">${(w.tr || w.en || '').split(' / ')[0]}</div></div>${w.hsk ? `<span class="lv-badge">H${w.hsk}</span>` : ''}</div>`).join('')}
          ${!f.length ? `<div class="muted" style="text-align:center;padding:2rem">Sonuç yok</div>` : ''}
        </div>
      </div>
      <div>
        <div style="margin-bottom:0.6rem;display:flex;align-items:center;gap:0.55rem">
          <span style="width:6px;height:6px;border-radius:50%;background:var(--green);display:inline-block"></span>
          <span class="muted">Karakter Ağı</span>
          ${S.selected ? `<span class="tag tag-accent">${S.selected.hanzi} · ${S.selected.pinyin}</span>` : ''}
        </div>
        <div id="graph-container"></div>
        <div style="display:flex;align-items:center;gap:0.5rem;margin-top:0.35rem;flex-wrap:wrap">
          <p class="muted" style="font-size:0.58rem">Sürükle · Scroll=zoom · Node'a tıkla=gez</p>
          <span class="muted" style="font-size:0.55rem">│ <span style="color:rgba(16,185,129,0.8)">●</span> ortak karakter</span>
          <button id="unit-toggle-btn" class="btn btn-sm" style="font-size:0.55rem;padding:0.18rem 0.5rem;${S.showUnitLinks ? 'border-color:rgba(59,130,246,0.8);color:rgba(59,130,246,0.9)' : ''}" onclick="S.showUnitLinks=!S.showUnitLinks;renderGraph(S.selected);">${S.showUnitLinks ? '<span style=\"color:rgba(59,130,246,0.9)\">●</span> Aynı Ders: AÇIK' : '● Aynı Ders: KAPALI'}</button>
          
        </div>
      </div>
      <div class="card" id="det">${detHTML()}</div>
    </div>`;
  document.getElementById('dsearch').addEventListener('input', e => {
    const curVal = e.target.value;
    S.graphSearch = curVal; const q = curVal.trim();
    if (q) { const w = S.words.find(x => x.hanzi === q) || S.words.find(x => x.hanzi.includes(q) || x.pinyin.toLowerCase().includes(q)); if (w) S.selected = w; }
    renderDict(); renderGraph(S.selected); renderDetail(); updWL();
  });

  document.querySelectorAll('.word-row').forEach(r => r.addEventListener('click', () => { S.selected = WORDS.find(x => x.hanzi === r.dataset.h); renderDict(); renderGraph(S.selected); renderDetail(); updWL(); }));
  bindDet(); setTimeout(() => renderGraph(S.selected), 40);
}

function detHTML() {
  if (!S.selected) return `<div style="text-align:center;padding:2.5rem 1rem;color:var(--text2)"><div style="font-size:4rem;opacity:0.07;font-family:'Noto Serif SC',serif">字</div><p class="muted" style="margin-top:0.75rem">Bir kelime seçin</p></div>`;
  const w = S.selected, exs = SENTENCES.filter(s => s.cn.includes(w.hanzi)).slice(0, 3);
  // Video bölümü (YouGlish Çince)
  const vidHtml = `
        <div style="width:100%">
          <div class="muted" style="font-size:0.58rem;letter-spacing:2px;margin-bottom:0.4rem">▶ VİDEO KAYNAKLAR</div>
          <a class="video-card" href="https://youglish.com/pronounce/${encodeURIComponent(w.hanzi)}/chinese" target="_blank" rel="noopener">
            <div style="width:48px;height:34px;background:#E50914;color:white;display:flex;align-items:center;justify-content:center;border-radius:4px;font-weight:bold;font-size:1.1rem">Y</div>
            <span class="video-title">Gerçek videolarda dinle (${w.hanzi})</span>
            <span class="video-badge" style="background:#E50914;color:white">YouGlish</span>
          </a>
        </div>`;
  return `<div style="display:flex;flex-direction:column;align-items:center;gap:1rem" class="fade-in">
    ${w.hanzi.length === 1 ? `<div class="stroke-box" id="dict-stroke" title="Tekrar oynat / Quiz için tıkla"></div>` : `<div class="char-box"><div class="hanzi-xl" style="display:flex;flex-wrap:wrap;justify-content:center;">${[...w.hanzi].map(ch => `<span class="hoverable-char" data-ch="${ch}" style="cursor:help;transition:color 0.2s" onmouseover="this.style.color='var(--text)'" onmouseout="this.style.color=''">` + ch + `</span>`).join('')}</div></div>`}
    <button class="vol-btn" id="vmain">🔊</button>
    <div style="text-align:center">
      <div class="pinyin-big">${w.pinyin}</div>
      <div style="margin-top:0.35rem;line-height:1.7">
        ${w.tr ? `<div style="color:var(--accent);font-weight:600;margin-bottom:0.4rem">${w.tr}</div>` : ''}
        ${w.en ? `<div style="color:var(--text2);font-size:0.82rem;text-align:left;display:inline-block;max-width:90%">
          ${w.en.split(' / ').map(m => `<div style="margin-bottom:0.2rem">• ${m}</div>`).join('')}
        </div>` : ''}
      </div>
      ${w.hsk ? `<span class="tag" style="margin-top:0.32rem;display:inline-block">HSK ${w.hsk}</span>` : ''}
    </div>
    ${w.compounds?.length ? `<div style="width:100%"><div class="muted" style="font-size:0.58rem;letter-spacing:2px;margin-bottom:0.4rem">BİLEŞİKLER</div><div style="display:flex;flex-wrap:wrap;gap:0.32rem">${w.compounds.map(c => { const cw = WORDS.find(x => x.hanzi === c); return `<button class="btn btn-sm compound-btn" data-h="${c}" title="${cw ? cw.tr || cw.en : ''}">${c}</button>`; }).join('')}</div></div>` : ''}
    ${exs.length ? `<div style="width:100%"><div class="muted" style="font-size:0.58rem;letter-spacing:2px;margin-bottom:0.4rem">ÖRNEK CÜMLELER</div>${exs.map(s => `<div class="sentence-card" style="margin-bottom:0.42rem"><div class="s-cn"><span>${s.cn}</span><button class="vol-btn" style="width:26px;height:26px;font-size:0.7rem" data-speak="${s.cn}">🔊</button></div><div class="s-py">${s.py}</div><div class="s-tr">${s.tr}</div></div>`).join('')}</div>` : `<div style="width:100%"><a href="https://www.mdbg.net/chinese/dictionary?page=worddict&wdrst=0&wdqt=${encodeURIComponent(w.hanzi)}" target="_blank" class="btn" style="width:100%;text-align:center;display:block">🔗 MDBG'de gör</a></div>`}
    ${vidHtml}
  </div>`;
}
function bindDet() {
  if (S.selected && S.selected.hanzi.length === 1 && document.getElementById('dict-stroke')) {
    renderStroke('dict-stroke', S.selected.hanzi);
    document.getElementById('dict-stroke').addEventListener('click', () => hwWriter && hwWriter.quiz());
  }
  const vm = document.getElementById('vmain'); if (vm) vm.addEventListener('click', () => speak(S.selected?.hanzi, vm));
  document.querySelectorAll('[data-speak]').forEach(b => b.addEventListener('click', () => speak(b.dataset.speak, b)));
  document.querySelectorAll('.compound-btn').forEach(b => b.addEventListener('click', () => { const w = WORDS.find(x => x.hanzi === b.dataset.h); if (w) { S.selected = w; renderGraph(w); document.getElementById('det').innerHTML = detHTML(); bindDet(); updWL(); } }));
  bindHoverableChars();
}
function renderDetail() { const p = document.getElementById('det'); if (p) { p.innerHTML = detHTML(); bindDet(); } }
function updWL() { document.querySelectorAll('.word-row').forEach(r => r.classList.toggle('selected', r.dataset.h === S.selected?.hanzi)); }

// ── FLASHCARDS ────────────────────────────────────────────────
function renderFlash() {
  const pool = S.words.length ? S.words : WORDS;
  if (S.flashOrder.length !== pool.length) {
    S.flashOrder = pool.map((_, i) => i).sort(() => 0.5 - Math.random());
    S.flashIdx = 0;
  }
  if (S.flashIdx >= pool.length) S.flashIdx = 0;
  const c = pool[S.flashOrder[S.flashIdx]];

  const exs = SENTENCES.filter(s => s.cn.includes(c.hanzi)).slice(0, 1);
  const vidHtml = `<a class="video-card" href="https://youglish.com/pronounce/${encodeURIComponent(c.hanzi)}/chinese" target="_blank" rel="noopener" style="margin-top:0.4rem; padding:0.3rem"><span class="video-badge" style="background:#E50914;color:white">YouGlish Video</span></a>`;

  document.getElementById('main').innerHTML = `
  <div style="display:flex;flex-direction:column;align-items:center;gap:1.2rem;padding:1.5rem 0">
    <div style="display:flex;align-items:center;gap:0.65rem;flex-wrap:wrap;justify-content:center"><div class="level-pills">${levelPills()}</div><span class="muted">${S.flashIdx + 1}/${pool.length}</span></div>
    <div class="fc-scene" id="fc"><div class="fc-inner ${S.flashFlipped ? 'flipped' : ''}">
      <div class="fc-face fc-front">
        ${c.hanzi.length === 1 ? `<div class="stroke-box" id="flash-stroke" style="margin-bottom:0.8rem; border-color:transparent; background:transparent"></div>` : `<div style="font-family:'Noto Serif SC',serif;font-size:4.8rem;line-height:1;color:var(--accent);display:flex;flex-wrap:wrap;justify-content:center;">${[...c.hanzi].map(ch => `<span class="hoverable-char" data-ch="${ch}" style="cursor:help;transition:color 0.2s" onmouseover="this.style.color='var(--text)'" onmouseout="this.style.color=''">` + ch + `</span>`).join('')}</div>`}
        <button class="vol-btn" id="fv1">🔊</button>
        <div class="muted" style="font-size:0.58rem">tıkla → çevir</div>
      </div>
      <div class="fc-face fc-back" style="overflow-y:auto; padding: 1rem;">
        <div style="text-align:center">
          <div style="font-size:1.3rem;color:var(--accent);font-family:'Space Mono',monospace;margin-bottom:0.2rem">${c.pinyin}</div>
          ${c.tr ? `<div style="font-size:0.9rem;color:var(--text);margin-bottom:0.2rem">${c.tr}</div>` : ''}
          ${c.en ? `<div style="font-size:0.7rem;color:var(--text2);text-align:left;display:inline-block;margin-top:0.2rem">${c.en.split(' / ').slice(0, 2).map(m => `<div>• ${m}</div>`).join('')}</div>` : ''}
          <button class="vol-btn" style="width:26px;height:26px;font-size:0.7rem;margin-top:0.2rem" id="fv2">🔊</button>
        </div>
        ${exs.length ? `<div style="font-size:0.7rem; margin-top:0.4rem; color:var(--text2); border-top:1px solid var(--border); padding-top:0.4rem"><div>${exs[0].cn}</div><div>${exs[0].tr}</div><button class="vol-btn" style="width:22px;height:22px;font-size:0.6rem;margin-top:2px" id="fv_ex">🔊</button></div>` : ''}
        ${vidHtml}
        ${c.hsk ? `<div class="tag" style="margin-top:0.3rem">HSK ${c.hsk}</div>` : ''}
        <div id="stroke-seq-container" style="margin-top:1rem; padding-top:0.8rem; border-top:1px solid var(--border); width:100%; text-align:center;">
          <div class="muted" style="font-size:0.55rem;letter-spacing:2px;margin-bottom:0.5rem">ADIM ADIM ÇİZİM</div>
          ${[...c.hanzi].map((ch, ci) => `
            <div style="display:inline-block;margin:0 6px;vertical-align:top;">
              <button class="char-audio-btn hoverable-char" data-ch="${ch}" style="background:none;border:none;cursor:help;color:var(--accent);font-family:'Noto Serif SC',serif;font-size:1rem;display:block;width:100%;margin-bottom:4px;transition:color 0.2s" onmouseover="this.style.color='var(--text)'" onmouseout="this.style.color='var(--accent)'">🔊 ${ch}</button>
              <div id="stroke-seq-${ci}" style="display:flex;flex-wrap:wrap;gap:3px;justify-content:center;"></div>
            </div>
          `).join('')}
        </div>
      </div>
    </div></div>
    <div style="display:flex;gap:0.6rem"><button class="btn" id="fprev">← Önceki</button><button class="btn btn-accent" id="fnext">Sonraki →</button></div>
  </div>`;
  if (c.hanzi.length === 1 && document.getElementById('flash-stroke')) {
    renderStroke('flash-stroke', c.hanzi);
  }

  // Render stroke sequence for each character
  const renderCharStrokes = (ch, targetId) => {
    HanziWriter.loadCharacterData(ch).then(function (charData) {
      const target = document.getElementById(targetId);
      if (!target) return;
      target.innerHTML = '';
      const isMobile = window.innerWidth <= 768;
      const W = isMobile ? 32 : 38, H = isMobile ? 32 : 38, P = 2;
      for (let i = 0; i < charData.strokes.length; i++) {
        const strokesPortion = charData.strokes.slice(0, i + 1);
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.style.width = W + 'px'; svg.style.height = H + 'px';
        svg.style.border = '1px solid var(--border)';
        svg.style.borderRadius = '4px'; svg.style.background = 'var(--surface)';
        const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        const td = HanziWriter.getScalingTransform(W, H, P);
        group.setAttribute('transform', td.transform);
        svg.appendChild(group);
        strokesPortion.forEach(function (strokePath, index) {
          const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          path.setAttribute('d', strokePath);
          path.style.fill = index === strokesPortion.length - 1 ? '#ef4444' : '#a1a1aa';
          group.appendChild(path);
        });
        target.appendChild(svg);
      }
    }).catch(err => console.log('HanziWriter chart err:', err));
  };
  [...c.hanzi].forEach((ch, ci) => {
    renderCharStrokes(ch, 'stroke-seq-' + ci);
  });
  document.querySelectorAll('.char-audio-btn').forEach(btn => {
    btn.addEventListener('click', e => { e.stopPropagation(); speak(btn.dataset.ch, btn); });
  });

  bindHoverableChars();
  document.getElementById('fc').addEventListener('click', () => { S.flashFlipped = !S.flashFlipped; renderFlash(); });
  document.getElementById('fprev').addEventListener('click', e => { e.stopPropagation(); S.flashIdx = (S.flashIdx - 1 + pool.length) % pool.length; S.flashFlipped = false; renderFlash(); });
  document.getElementById('fnext').addEventListener('click', e => { e.stopPropagation(); S.flashIdx = (S.flashIdx + 1) % pool.length; S.flashFlipped = false; renderFlash(); });
  ['fv1', 'fv2'].forEach(id => { const b = document.getElementById(id); if (b) b.addEventListener('click', e => { e.stopPropagation(); speak(c.hanzi, b); }); }); if (document.getElementById('fv_ex')) { const bex = document.getElementById('fv_ex'); bex.addEventListener('click', e => { e.stopPropagation(); speak(exs[0].cn, bex); }); }

}

// ── SENTENCES ─────────────────────────────────────────────────
function initSent() {
  const s = SENTENCES[S.sentIdx];
  let bl = s.blocks.map(w => ({ w, isDecoy: false }));

  // Add 1-2 random decoy words from vocabulary to make it harder
  const numDecoys = Math.floor(Math.random() * 2) + 1;
  const pool = S.words.length > 5 ? S.words : WORDS;
  for (let i = 0; i < numDecoys; i++) {
    const decoy = pool[Math.floor(Math.random() * pool.length)].hanzi;
    // only add if it's not already in the sentence
    if (!s.cn.includes(decoy) && decoy.length > 0) {
      bl.push({ w: decoy, isDecoy: true });
    }
  }

  // Shuffle
  for (let i = bl.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [bl[i], bl[j]] = [bl[j], bl[i]];
  }

  S.sentAvail = bl;
  S.sentUser = [];
  S.sentStatus = 'idle';
}
function renderSent() {
  if (!S.sentAvail.length && !S.sentUser.length) initSent();
  const s = SENTENCES[S.sentIdx];
  document.getElementById('main').innerHTML = `
    <div style="max-width:640px;margin:0 auto;display:flex;flex-direction:column;gap:1.15rem">
      <div class="card">
        <div style="text-align:center;margin-bottom:1.2rem;position:relative">
          <div class="muted" style="font-size:0.58rem;letter-spacing:3px;margin-bottom:0.42rem">TÜRKÇEDEN ÇİNCEYE</div>
          <div style="font-size:1.4rem;color:var(--text);line-height:1.4">${s.tr}</div>
          <div class="muted" style="margin-top:0.42rem">${S.sentIdx + 1}/${SENTENCES.length}</div>
          ${S.sentStatus !== 'correct' ? `<button class="btn btn-sm" id="hint-btn" style="position:absolute;right:0;top:0" title="İpucu Ver">💡 İpucu</button>` : ''}
        </div>
        
        <div class="blocks-area ${S.sentStatus}" id="drop">
          ${!S.sentUser.length ? `<span class="muted">Kelimeleri sıraya koy...</span>` : ''}
          ${S.sentUser.map((b, i) => `<button class="block-btn placed" data-i="${i}" data-src="u">${b.w}</button>`).join('')}
        </div>
        
        <div style="display:flex;flex-wrap:wrap;gap:0.42rem;justify-content:center;margin:0.85rem 0; min-height: 50px;">
          ${S.sentAvail.map((b, i) => `<button class="block-btn" data-i="${i}" data-src="a">${b.w}</button>`).join('')}
        </div>
        
        <div style="display:flex;gap:0.6rem;justify-content:center;margin-top:1rem">
          ${S.sentStatus === 'correct' ? `<button class="btn" id="sl">🔊 Dinle</button><button class="btn btn-accent" id="sn">Sonraki →</button>` : `<button class="btn btn-accent" id="sc">✓ Kontrol Et</button><button class="btn btn-sm" id="sr" title="Sıfırla">↺</button>`}
        </div>
        
        ${S.sentStatus === 'correct' ? `<div style="text-align:center;margin-top:0.85rem;color:var(--green);font-size:0.9rem;font-weight:bold">✓ Harika! Doğru sıralama.</div><div style="text-align:center;color:var(--accent);font-size:0.8rem;margin-top:0.3rem">${s.py}</div><div style="text-align:center;color:var(--text);font-family:'Noto Serif SC',serif;font-size:1.2rem;margin-top:0.3rem">${s.cn}</div>` : S.sentStatus === 'wrong' ? `<div style="text-align:center;margin-top:0.85rem;color:var(--red);font-size:0.85rem">✗ Yanlış sıralama, tekrar dene</div>` : ''}
      </div>
      
      <div class="card" style="padding:0.85rem">
        <div class="muted" style="font-size:0.58rem;letter-spacing:2px;margin-bottom:0.6rem;display:flex;justify-content:space-between">
          <span>TÜM CÜMLELER</span>
          <span style="color:var(--accent)">${SENTENCES.length} Cümle</span>
        </div>
        <div style="max-height: 400px; overflow-y: auto;">
          ${SENTENCES.map((sen, i) => `<div class="word-row ${i === S.sentIdx ? 'selected' : ''}" data-si="${i}" style="padding:0.42rem 0.55rem"><span class="muted" style="min-width:1.2rem;font-size:0.58rem">${i + 1}</span><span style="font-family:'Noto Serif SC',serif;color:var(--text);font-size:1rem;">${sen.cn}</span><span class="muted" style="flex:1;padding-left:0.5rem;font-size:0.75rem">${sen.tr}</span><button class="vol-btn" style="width:25px;height:25px;font-size:0.68rem" data-speak="${sen.cn}">🔊</button></div>`).join('')}
        </div>
      </div>
    </div>`;

  document.querySelectorAll('[data-src]').forEach(b => b.addEventListener('click', () => {
    const i = +b.dataset.i, src = b.dataset.src;
    if (src === 'a') {
      S.sentUser.push(S.sentAvail.splice(i, 1)[0]);
    } else {
      S.sentAvail.push(S.sentUser.splice(i, 1)[0]);
    }
    S.sentStatus = 'idle';
    renderSent();
  }));

  document.getElementById('sc')?.addEventListener('click', () => {
    const uStr = S.sentUser.map(x => x.w).join('');
    const cStr = s.blocks.join('');
    S.sentStatus = uStr === cStr ? 'correct' : 'wrong';
    if (S.sentStatus === 'correct') speak(s.cn);
    renderSent();
  });
  document.getElementById('sr')?.addEventListener('click', () => { S.sentAvail = []; S.sentUser = []; renderSent(); });
  document.getElementById('sl')?.addEventListener('click', () => speak(s.cn));
  document.getElementById('sn')?.addEventListener('click', () => { S.sentIdx = (S.sentIdx + 1) % SENTENCES.length; S.sentAvail = []; S.sentUser = []; renderSent(); });

  document.getElementById('hint-btn')?.addEventListener('click', () => {
    // Find the first incorrect block or missing block
    const correctBlocks = s.blocks;
    let targetIndex = S.sentUser.length;

    // If they already have blocks, check if they are correct so far
    for (let i = 0; i < S.sentUser.length; i++) {
      if (S.sentUser[i].w !== correctBlocks[i]) {
        targetIndex = i;
        break;
      }
    }

    if (targetIndex < correctBlocks.length) {
      const neededWord = correctBlocks[targetIndex];
      // Find it in avail
      const idxInAvail = S.sentAvail.findIndex(x => x.w === neededWord && !x.isDecoy);
      if (idxInAvail !== -1) {
        const block = S.sentAvail.splice(idxInAvail, 1)[0];
        // If we are replacing a wrong block
        if (targetIndex < S.sentUser.length) {
          // Return all blocks from targetIndex onwards back to avail
          const removed = S.sentUser.splice(targetIndex);
          S.sentAvail.push(...removed);
        }
        S.sentUser.push(block);
        S.sentStatus = 'idle';
        renderSent();
      }
    }
  });

  document.querySelectorAll('[data-si]').forEach(r => r.addEventListener('click', e => { if (e.target.dataset.speak) return; S.sentIdx = +r.dataset.si; S.sentAvail = []; S.sentUser = []; renderSent(); }));
  document.querySelectorAll('[data-speak]').forEach(b => b.addEventListener('click', e => { e.stopPropagation(); speak(b.dataset.speak, b); }));
}

// ── QUIZ ──────────────────────────────────────────────────────
function initQuiz() {
  const pool = (S.words.length >= 4 ? S.words : WORDS);
  if (S.quizOrder.length !== pool.length) {
    S.quizOrder = pool.map((_, i) => i).sort(() => 0.5 - Math.random());
    S.quizIdx = 0;
  }
  const c = pool[S.quizOrder[S.quizIdx % pool.length]];
  S.quizCorrect = c; // store correct answer in state – used by renderQuiz
  // 3 wrong options different from correct on the active field
  let filterFn;
  if (S.quizMode === 'pinyin') filterFn = x => x.pinyin !== c.pinyin;
  else if (S.quizMode === 'meaning') filterFn = x => x.hanzi !== c.hanzi;
  else filterFn = x => x.hanzi !== c.hanzi;

  const wrongs = pool.filter(filterFn).sort(() => 0.5 - Math.random()).slice(0, 3);
  S.quizOptions = [c, ...wrongs].sort(() => 0.5 - Math.random());
  S.quizAnswered = false; S.quizSelected = null; S.quizMeaningShown = false;
}
function renderQuiz() {
  if (!S.quizOptions.length || !S.quizCorrect) initQuiz();
  const c = S.quizCorrect; // always use the stored correct answer
  const mode = S.quizMode || 'hanzi';

  let questionHtml, optLabel, isCorrectOpt, questionTitle;

  if (mode === 'pinyin') {
    questionTitle = 'HANZİ NEDİR?';
    questionHtml = `<div style="font-family:'Noto Serif SC',serif;font-size:3rem;letter-spacing:4px;color:var(--text)">${c.hanzi}</div>`;
    optLabel = opt => `<span style="font-size:0.85rem;letter-spacing:1px">${opt.pinyin}</span>`;
    isCorrectOpt = opt => opt.pinyin === c.pinyin;
  } else if (mode === 'meaning') {
    questionTitle = 'ÇİNCE KARŞILIĞI NEDİR?';
    questionHtml = `<div class="qz-meaning-prompt" style="font-size:1.4rem;color:var(--text);letter-spacing:1px;line-height:1.4">${c.tr || c.en || '?'}</div>`;
    optLabel = opt => `<span style="font-family:'Noto Serif SC',serif;font-size:1.5rem">${opt.hanzi}</span>`;
    isCorrectOpt = opt => opt.hanzi === c.hanzi;
  } else {
    // hanzi mode
    questionTitle = 'HANZİ OKUNUŞU?';
    questionHtml = `<div style="font-size:1.6rem;color:var(--accent);font-family:'Space Mono',monospace;letter-spacing:2px">${c.pinyin}</div>`;
    optLabel = opt => `<span style="font-family:'Noto Serif SC',serif;font-size:1.5rem">${opt.hanzi}</span>`;
    isCorrectOpt = opt => opt.hanzi === c.hanzi;
  }

  document.getElementById('main').innerHTML = `
    <div style="max-width:500px;margin:0 auto;display:flex;flex-direction:column;gap:1.1rem">
      <div style="display:flex;align-items:center;gap:0.6rem;flex-wrap:wrap">
        <div class="level-pills">${levelPills()}</div>
        <div style="display:flex;gap:0.35rem;margin-left:auto">
          <button id="mode-hanzi" class="btn btn-sm ${mode === 'hanzi' ? 'btn-accent' : ''}" style="font-size:0.6rem">汉字</button>
          <button id="mode-pinyin" class="btn btn-sm ${mode === 'pinyin' ? 'btn-accent' : ''}" style="font-size:0.6rem">Pīnyīn</button>
          <button id="mode-meaning" class="btn btn-sm ${mode === 'meaning' ? 'btn-accent' : ''}" style="font-size:0.6rem">Anlam</button>
        </div>
      </div>
      <div class="score-bar">${S.quizScore.slice(-12).map(h => `<div class="score-dot ${h ? 'hit' : 'miss'}"></div>`).join('')}${S.quizScore.length ? `<span class="muted" style="margin-left:0.38rem">${S.quizScore.filter(Boolean).length}/${S.quizScore.length}</span>` : ''}</div>
      <div class="card" style="text-align:center">
        <div class="muted" style="font-size:0.58rem;letter-spacing:3px;margin-bottom:0.85rem">${questionTitle}</div>
        <div style="display:flex;align-items:center;justify-content:center;gap:0.85rem;margin-bottom:0.85rem;flex-direction:column;">
          <div style="display:flex;align-items:center;justify-content:center;gap:0.85rem;">
            ${mode === 'meaning' ? '' : questionHtml}
            ${mode === 'meaning' ? '' : `<button class="vol-btn" id="qv">🔊</button>`}
          </div>
          ${mode === 'meaning' ? questionHtml : ''}
        </div>
        <div style="margin-bottom:1.2rem;min-height:1.4rem">
          ${S.quizMeaningShown
      ? (mode === 'meaning' ? `<div style="color:var(--text2);font-size:0.85rem;font-family:'Space Mono',monospace"><span class="muted">İpucu:</span> ${c.pinyin}</div>` : `<div style="color:var(--text2);font-size:0.8rem">${c.tr || c.en}</div>`)
      : `<button id="show-meaning-btn" class="btn btn-sm" style="font-size:0.6rem;opacity:0.6">${mode === 'meaning' ? 'İpucu Göster 👁' : 'Anlamı Göster 👁'}</button>`
    }
        </div>
        <div class="qz-grid">${S.quizOptions.map((opt, i) => {
      let cls = '';
      if (S.quizAnswered) cls = isCorrectOpt(opt) ? 'correct' : opt === S.quizSelected ? 'wrong' : '';
      return `<button class="qz-opt ${cls}" data-qi="${i}" ${S.quizAnswered ? 'disabled' : ''}>${optLabel(opt)}</button>`;
    }).join('')}</div>
        ${S.quizAnswered ? `<div style="margin-top:1rem">
          <div style="color:${isCorrectOpt(S.quizSelected) ? 'var(--green)' : 'var(--red)'};margin-bottom:0.6rem;font-size:0.82rem">
            ${isCorrectOpt(S.quizSelected) ? '✓ Doğru!' : '✗ Yanlış — Doğrusu: ' + (mode === 'pinyin' ? c.pinyin : c.hanzi) + ' · ' + c.tr}
          </div>
          <button class="btn btn-accent" id="qn">Sonraki →</button>
        </div>` : ''}
      </div>
    </div>`;

  document.getElementById('qv')?.addEventListener('click', () => speak(c.hanzi, document.getElementById('qv')));
  document.getElementById('show-meaning-btn')?.addEventListener('click', () => { S.quizMeaningShown = true; renderQuiz(); });
  document.getElementById('mode-hanzi')?.addEventListener('click', () => { S.quizMode = 'hanzi'; S.quizOptions = []; initQuiz(); renderQuiz(); });
  document.getElementById('mode-pinyin')?.addEventListener('click', () => { S.quizMode = 'pinyin'; S.quizOptions = []; initQuiz(); renderQuiz(); });
  document.getElementById('mode-meaning')?.addEventListener('click', () => { S.quizMode = 'meaning'; S.quizOptions = []; initQuiz(); renderQuiz(); });
  document.querySelectorAll('.qz-opt').forEach(b => b.addEventListener('click', () => {
    if (S.quizAnswered) return;
    S.quizSelected = S.quizOptions[+b.dataset.qi];
    S.quizAnswered = true;
    const hit = isCorrectOpt(S.quizSelected);
    S.quizScore.push(hit);
    if (hit) speak(c.hanzi, b);
    renderQuiz();
  }));
  document.getElementById('qn')?.addEventListener('click', () => { S.quizIdx++; S.quizOptions = []; initQuiz(); renderQuiz(); });
}

// ══════════════════════════════════════════════════════════════
//  HOVERABLE CHARS & POPUP
// ══════════════════════════════════════════════════════════════
function bindHoverableChars() {
  document.querySelectorAll('.hoverable-char').forEach(el => {
    if (el.dataset.hoverBound) return;
    el.dataset.hoverBound = "1";
    el.addEventListener('mouseenter', e => {
      const popup = document.getElementById('char-hover-popup');
      if (!popup) return;
      popup.style.display = 'block';
      const rect = el.getBoundingClientRect();
      let left = rect.left + rect.width / 2 - 60;
      let top = rect.top - 130;
      if (top < 0) top = rect.bottom + 10;
      if (left < 0) left = 10;
      popup.style.left = left + 'px';
      popup.style.top = top + 'px';

      document.getElementById('char-hover-stroke').innerHTML = '';
      try {
        window._hoverWriter = HanziWriter.create('char-hover-stroke', el.dataset.ch, {
          width: 108, height: 108, padding: 5, strokeAnimationSpeed: 1.5,
          delayBetweenStrokes: 200, strokeColor: '#e8b84b', radicalColor: '#4caf7d',
          outlineColor: '#2e2e38'
        });
        window._hoverWriter.loopCharacterAnimation();
      } catch (err) { }
    });
    el.addEventListener('mouseleave', () => {
      const popup = document.getElementById('char-hover-popup');
      if (popup) popup.style.display = 'none';
      if (window._hoverWriter) {
        document.getElementById('char-hover-stroke').innerHTML = '';
        window._hoverWriter = null;
      }
    });
  });
}

document.addEventListener('click', e => {
  if (!e.target.closest('.hoverable-char')) {
    const popup = document.getElementById('char-hover-popup');
    if (popup) popup.style.display = 'none';
    if (window._hoverWriter) {
      document.getElementById('char-hover-stroke').innerHTML = '';
      window._hoverWriter = null;
    }
  }
});

// ══════════════════════════════════════════════════════════════
//  BOOT
// ══════════════════════════════════════════════════════════════
document.querySelectorAll('#nav button').forEach(b => b.addEventListener('click', () => { S.tab = b.dataset.tab; render(); }));
window.addEventListener('load', async () => {
  if ('speechSynthesis' in window) window.speechSynthesis.getVoices();
  filterWords();
  await TTS.init();
  render();
});
