const fs = require('fs');
const { WORDS, SENTENCES } = require('./data.js');

// Deduplicate WORDS based on hanzi, keeping the first occurrence
const uniqueWordsMap = new Map();
WORDS.forEach(w => {
    if (!uniqueWordsMap.has(w.hanzi)) {
        uniqueWordsMap.set(w.hanzi, w);
    }
});
const deduplicatedWords = Array.from(uniqueWordsMap.values());

// Deduplicate SENTENCES based on cn
const uniqueSentencesMap = new Map();
SENTENCES.forEach(s => {
    if (!uniqueSentencesMap.has(s.cn)) {
        uniqueSentencesMap.set(s.cn, s);
    }
});
const deduplicatedSentences = Array.from(uniqueSentencesMap.values());

let html = fs.readFileSync('index.html', 'utf8');

// 1. Replace WORDS and SENTENCES
const wordsRegex = /const WORDS = \[[\s\S]*?\];/;
const sentencesRegex = /const SENTENCES = \[[\s\S]*?\];/;

const newWordsStr = `const WORDS = ${JSON.stringify(deduplicatedWords, null, 2)};`;
const newSentencesStr = `const SENTENCES = ${JSON.stringify(deduplicatedSentences, null, 2)};`;

html = html.replace(wordsRegex, newWordsStr);
html = html.replace(sentencesRegex, newSentencesStr);

// 2. Remove TTS Server Bar
html = html.replace(
    /<div id="tts-bar">[\s\S]*?<\/div>/,
    `<!-- TTS Status Bar Removed --><div id="tts-bar" style="display:none"></div>`
);

// 3. Simplify TTS Engine
const ttsEngineRegex = /const TTS = \(\(\) => \{[\s\S]*?\}\)\(\);/g;
const newTTSObj = `const TTS = (() => {
  function wsSpeak(text, btn) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'zh-CN'; u.rate = 0.85;
    const v = window.speechSynthesis.getVoices().find(v => v.lang.startsWith('zh'));
    if (v) u.voice = v;
    if (btn) btn.classList.add('playing');
    u.onend = u.onerror = () => { if (btn) btn.classList.remove('playing'); };
    window.speechSynthesis.speak(u);
  }
  return {
    init: async () => {},
    speak: (text, btn = null) => {
      wsSpeak(text, btn);
    }
  };
})();`;
html = html.replace(ttsEngineRegex, newTTSObj);

// 4. State updates adding flashOrder and quizOrder
html = html.replace(/flashIdx: 0, flashFlipped: false,/, `flashIdx: 0, flashFlipped: false, flashOrder: [],`);
html = html.replace(/quizIdx: 0, quizAnswered: false, quizSelected: null, quizScore: \[\], quizOptions: \[\],/, `quizIdx: 0, quizAnswered: false, quizSelected: null, quizScore: [], quizOptions: [], quizOrder: [],`);

// 5. Update Flashcard randomization
const renderFlashRegex = /function renderFlash\(\) \{[\s\S]*?document\.getElementById\('fc'\)\.addEventListener/g;
const newRenderFlash = `function renderFlash() {
  const pool = S.words.length ? S.words : WORDS;
  if (S.flashOrder.length !== pool.length) {
    S.flashOrder = pool.map((_, i) => i).sort(() => 0.5 - Math.random());
    S.flashIdx = 0;
  }
  if (S.flashIdx >= pool.length) S.flashIdx = 0;
  const c = pool[S.flashOrder[S.flashIdx]];
  
  const exs = SENTENCES.filter(s => s.cn.includes(c.hanzi)).slice(0, 1);
  const vidHtml = \`<a class="video-card" href="https://youglish.com/pronounce/\${encodeURIComponent(c.hanzi)}/chinese" target="_blank" rel="noopener" style="margin-top:0.4rem; padding:0.3rem"><span class="video-badge" style="background:#E50914;color:white">YouGlish Video</span></a>\`;

  document.getElementById('main').innerHTML = \`
  <div style="display:flex;flex-direction:column;align-items:center;gap:1.2rem;padding:1.5rem 0">
    <div style="display:flex;align-items:center;gap:0.65rem;flex-wrap:wrap;justify-content:center"><div class="level-pills">\${levelPills()}</div><span class="muted">\${S.flashIdx + 1}/\${pool.length}</span></div>
    <div class="fc-scene" id="fc"><div class="fc-inner \${S.flashFlipped ? 'flipped' : ''}">
      <div class="fc-face fc-front">
        <div style="font-family:'Noto Serif SC',serif;font-size:4.8rem;line-height:1;color:var(--accent)">\${c.hanzi}</div>
        <button class="vol-btn" id="fv1">🔊</button>
        <div class="muted" style="font-size:0.58rem">tıkla → çevir</div>
      </div>
      <div class="fc-face fc-back" style="overflow-y:auto; padding: 1rem;">
        <div style="text-align:center">
          <div style="font-size:1.3rem;color:var(--accent);font-family:'Space Mono',monospace;margin-bottom:0.2rem">\${c.pinyin}</div>
          \${c.tr ? \`<div style="font-size:0.9rem;color:var(--text);margin-bottom:0.2rem">\${c.tr}</div>\` : ''}
          \${c.en ? \`<div style="font-size:0.7rem;color:var(--text2);text-align:left;display:inline-block;margin-top:0.2rem">\${c.en.split(' / ').slice(0, 2).map(m => \`<div>• \${m}</div>\`).join('')}</div>\` : ''}
          <button class="vol-btn" style="width:26px;height:26px;font-size:0.7rem;margin-top:0.2rem" id="fv2">🔊</button>
        </div>
        \${exs.length ? \`<div style="font-size:0.7rem; margin-top:0.4rem; color:var(--text2); border-top:1px solid var(--border); padding-top:0.4rem"><div>\${exs[0].cn}</div><div>\${exs[0].tr}</div><button class="vol-btn" style="width:22px;height:22px;font-size:0.6rem;margin-top:2px" id="fv_ex">🔊</button></div>\` : ''}
        \${vidHtml}
        \${c.hsk ? \`<div class="tag" style="margin-top:0.3rem">HSK \${c.hsk}</div>\` : ''}
      </div>
    </div></div>
    <div style="display:flex;gap:0.6rem"><button class="btn" id="fprev">← Önceki</button><button class="btn btn-accent" id="fnext">Sonraki →</button></div>
  </div>\`;
  document.getElementById('fc').addEventListener`;
html = html.replace(renderFlashRegex, newRenderFlash);

// Reset flashOrder when pills are clicked
html = html.replace(/S\.hskLevel = p\.dataset\.level; S\.flashIdx = 0; S\.flashFlipped = false; filterWords\(\); renderFlash\(\);/g, `S.hskLevel = p.dataset.level; S.flashIdx = 0; S.flashFlipped = false; S.flashOrder = []; filterWords(); renderFlash();`);

// Add audio for flashcard example
html = html.replace(
    /\['fv1', 'fv2'\]\.forEach\(id => \{ const b = document\.getElementById\(id\); if \(b\) b\.addEventListener\('click', e => \{ e\.stopPropagation\(\); speak\(c\.hanzi, b\); \}\); \}\);/,
    `['fv1', 'fv2'].forEach(id => { const b = document.getElementById(id); if (b) b.addEventListener('click', e => { e.stopPropagation(); speak(c.hanzi, b); }); }); if (document.getElementById('fv_ex')) { const bex = document.getElementById('fv_ex'); bex.addEventListener('click', e => { e.stopPropagation(); speak(exs[0].cn, bex); }); }`
);


// 6. Update Quiz randomization
const initQuizRegex = /function initQuiz\(\) \{[\s\S]*?S\.quizAnswered = false; S\.quizSelected = null; \}/g;
const newInitQuiz = `function initQuiz() { 
  const pool = S.words.length >= 4 ? S.words : WORDS; 
  if (S.quizOrder.length !== pool.length) {
    S.quizOrder = pool.map((_, i) => i).sort(() => 0.5 - Math.random());
    S.quizIdx = 0;
  }
  const c = pool[S.quizOrder[S.quizIdx % pool.length]]; 
  const w = pool.filter(x => x.hanzi !== c.hanzi).sort(() => 0.5 - Math.random()).slice(0, 3); 
  S.quizOptions = [c, ...w].sort(() => 0.5 - Math.random()); 
  S.quizAnswered = false; S.quizSelected = null; 
}`;
html = html.replace(initQuizRegex, newInitQuiz);

html = html.replace(/S\.hskLevel = p\.dataset\.level; S\.quizIdx = 0; S\.quizScore = \[\]; S\.quizOptions = \[\]; filterWords\(\); initQuiz\(\); renderQuiz\(\);/g, `S.hskLevel = p.dataset.level; S.quizIdx = 0; S.quizScore = []; S.quizOptions = []; S.quizOrder = []; filterWords(); initQuiz(); renderQuiz();`);

// Write the modified HTML back
fs.writeFileSync('index.html', html, 'utf8');

console.log('Update complete.');
