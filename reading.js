/**
 * Reading Practice Logic
 * Translates React component logic into Vanilla JS for ChinesePracticeWeb
 */

let R_STATE = {
  activeStoryIdx: 0,
  activeWordId: null,
  hoveredWordId: null,
  isSpeaking: false,
  speechRate: 1.0,
  tokens: []
};

let ttsKeepAlive = null;

function initReading() {
  renderReadingHeader();
  loadStory(0);
  bindGlobalEvents();
}

function loadStory(idx) {
  R_STATE.activeStoryIdx = idx;
  R_STATE.activeWordId = null;
  R_STATE.tokens = tokenizeText(READING_STORIES[idx].text);
  renderReadingMain();
}

function tokenizeText(text) {
  let result = [];
  let i = 0;
  const maxLen = 8;
  const dict = READING_DICT;

  while (i < text.length) {
    if (text[i] === '\n') {
      result.push({ type: 'newline', id: `nl-${i}` });
      i++;
      continue;
    }

    let matched = false;
    for (let len = maxLen; len > 0; len--) {
      if (i + len <= text.length) {
        let word = text.substring(i, i + len);
        if (dict[word]) {
          result.push({ 
            type: 'word', 
            text: word, 
            p: dict[word].p, 
            t: dict[word].t, 
            id: `word-${i}` 
          });
          i += len;
          matched = true;
          break;
        }
      }
    }

    if (!matched) {
      result.push({ type: 'char', text: text[i], id: `char-${i}` });
      i++;
    }
  }
  return result;
}

function renderReadingHeader() {
  const container = document.getElementById('story-tabs');
  if (!container) return;
  container.innerHTML = READING_STORIES.map((s, idx) => `
    <button class="tab-btn ${R_STATE.activeStoryIdx === idx ? 'active' : ''}" onclick="loadStory(${idx})">
      第 ${idx + 1} 课
    </button>
  `).join('');
}

function renderReadingMain() {
  const story = READING_STORIES[R_STATE.activeStoryIdx];
  const titleEl = document.getElementById('story-title');
  const bodyEl = document.getElementById('story-body');
  const questionsEl = document.getElementById('story-questions');
  const vocabEl = document.getElementById('story-vocab');

  if (titleEl) titleEl.textContent = story.title;
  
  if (bodyEl) {
    bodyEl.innerHTML = R_STATE.tokens.map(token => {
      if (token.type === 'newline') return '<div class="reading-nl"></div>';
      if (token.type === 'char') return `<span class="reading-char">${token.text}</span>`;
      
      const isClicked = R_STATE.activeWordId === token.id;
      return `
        <span class="reading-word-wrapper" 
              onmouseenter="handleTokenHover('${token.id}')" 
              onmouseleave="handleTokenLeave()"
              onclick="handleTokenClick(event, '${token.id}')">
          <span class="reading-word ${isClicked ? 'clicked' : ''}">${token.text}</span>
          <span class="reading-popup ${isClicked ? 'visible' : ''}" id="popup-${token.id}">
             <span class="popup-pinyin">${token.p}</span>
             ${isClicked ? `<span class="popup-trans">${token.t}</span>` : ''}
          </span>
        </span>
      `;
    }).join('');
  }

  if (questionsEl) {
    questionsEl.innerHTML = story.questions.map((q, i) => `
      <div class="story-q-box">
        <p class="story-q-text"><strong>${i+1}. ${q.q}</strong></p>
        <p class="story-a-text"><span class="q-icon">➜</span> ${q.a}</p>
      </div>
    `).join('');
  }

  if (vocabEl && story.vocabUnits) {
    vocabEl.innerHTML = `
      <h3 class="vocab-title">主要词汇 (Ana Kelimeler)</h3>
      <div class="vocab-grid">
        ${story.vocabUnits.map(v => `
          <div class="vocab-card">
            <h4>${v.unit}</h4>
            <p>${v.words}</p>
          </div>
        `).join('')}
      </div>
    `;
  } else if (vocabEl) {
    vocabEl.innerHTML = '';
  }

  renderReadingHeader(); // Update active tab
}

function handleTokenHover(id) {
  if (R_STATE.activeWordId) return;
  const popup = document.getElementById(`popup-${id}`);
  if (popup) popup.classList.add('hovered');
}

function handleTokenLeave() {
  document.querySelectorAll('.reading-popup.hovered').forEach(el => el.classList.remove('hovered'));
}

function handleTokenClick(e, id) {
  e.stopPropagation();
  const token = R_STATE.tokens.find(t => t.id === id);
  if (R_STATE.activeWordId === id) {
    R_STATE.activeWordId = null;
  } else {
    R_STATE.activeWordId = id;
    if (token && token.text) {
      speakWord(token.text);
    }
  }
  renderReadingMain();
}

function speakWord(text) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'zh-CN';
  u.rate = 0.8; // Slightly slower for individual words
  const voices = window.speechSynthesis.getVoices();
  const v = voices.find(v => v.lang.includes('zh') && (v.name.includes('Google') || v.name.includes('Premium')));
  if (v) u.voice = v;
  window.speechSynthesis.speak(u);
}

function bindGlobalEvents() {
  document.addEventListener('click', () => {
    if (R_STATE.activeWordId) {
      R_STATE.activeWordId = null;
      renderReadingMain();
    }
  });

  const rateInput = document.getElementById('speed-range');
  if (rateInput) {
    rateInput.addEventListener('input', (e) => {
      R_STATE.speechRate = parseFloat(e.target.value);
      const valDisplay = document.getElementById('speed-val');
      if (valDisplay) valDisplay.textContent = R_STATE.speechRate.toFixed(1) + 'x';
    });
  }
}

function speakStory() {
  const story = READING_STORIES[R_STATE.activeStoryIdx];
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  if (ttsKeepAlive) clearInterval(ttsKeepAlive);
  
  const u = new SpeechSynthesisUtterance(story.text);
  u.lang = 'zh-CN';
  u.rate = R_STATE.speechRate;
  
  const voices = window.speechSynthesis.getVoices();
  const v = voices.find(v => v.lang.includes('zh') && (v.name.includes('Google') || v.name.includes('Premium')));
  if (v) u.voice = v;

  const btn = document.getElementById('speak-btn');
  if (btn) btn.classList.add('playing');
  
  u.onstart = () => {
    // Workaround for Chromium 15s TTS bug
    ttsKeepAlive = setInterval(() => {
      window.speechSynthesis.pause();
      window.speechSynthesis.resume();
    }, 12000); // 12 seconds
  };

  u.onend = u.onerror = () => {
    if (btn) btn.classList.remove('playing');
    if (ttsKeepAlive) clearInterval(ttsKeepAlive);
  };
  
  window.speechSynthesis.speak(u);
}

function stopStory() {
  if (ttsKeepAlive) clearInterval(ttsKeepAlive);
  window.speechSynthesis.cancel();
  const btn = document.getElementById('speak-btn');
  if (btn) btn.classList.remove('playing');
}

// Start when document is ready
document.addEventListener('DOMContentLoaded', initReading);
