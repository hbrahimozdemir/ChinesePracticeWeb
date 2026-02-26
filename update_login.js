const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Add Login CSS
const cssInjection = `
    /* ── Login Overlay ── */
    #login-overlay {
      position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
      background: var(--bg);
      z-index: 9999;
      display: flex; flex-direction: column; align-items: center; justify-content: center;
    }
    .login-box {
      background: var(--surface); padding: 2.5rem; border-radius: 12px;
      border: 1px solid var(--border); width: 340px; text-align: center;
      box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    }
    .login-box h2 {
      font-family: 'Noto Serif SC', serif; color: var(--accent); margin-bottom: 1.5rem; letter-spacing: 2px;
    }
    .login-input {
      width: 100%; padding: 0.8rem; margin-bottom: 1rem;
      background: var(--surface2); border: 1px solid var(--border);
      color: var(--text); border-radius: 6px; font-family: 'Space Mono', monospace; outline: none;
    }
    .login-input:focus { border-color: var(--accent); }
    #login-error { color: var(--red); font-size: 0.75rem; margin-bottom: 1rem; min-height: 1rem; }
`;
html = html.replace('</style>', cssInjection + '\n  </style>');

// 2. Add Login HTML
const htmlInjection = `
  <div id="login-overlay">
    <div class="login-box">
      <h2>汉语学习<br><span style="font-size:0.8rem;color:var(--text2);font-family:'Space Mono',monospace;letter-spacing:1px">GİRİŞ YAP</span></h2>
      <input type="text" id="login-user" class="login-input" placeholder="Kullanıcı Adı" autocomplete="off" />
      <input type="password" id="login-pass" class="login-input" placeholder="Şifre" />
      <div id="login-error"></div>
      <button class="btn btn-accent" id="login-btn" style="width:100%;padding:0.8rem">Giriş</button>
    </div>
  </div>

  <div id="app-content" style="display:none; flex-direction:column; min-height:100vh">
`;
html = html.replace('<header>', htmlInjection + '\n  <header>');
html = html.replace('</body>', '  </div>\n</body>'); // Close #app-content

// 3. Remove Anki Tab from Header
html = html.replace('<button data-tab="anki">🎴 Anki</button>', '');

// 4. Remove Sql.js and jszip
html = html.replace('<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js"></script>', '');
html = html.replace('<script src="https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.2/sql-wasm.min.js"></script>', '');

// 5. Remove Anki Logic & Add Login Logic
const scriptsRegex = /<script>([\s\S]*?)<\/script>/;
const match = html.match(scriptsRegex);

if (match) {
    let js = match[1];

    // Remove Anki from State
    js = js.replace(/ankiCards: \[\], ankiIdx: 0, ankiFlipped: false, ankiFilter: '',/, '');

    // Remove parseApkg and renderAnki
    js = js.replace(/\/\/ ── ANKI ──────────────────────────────────────────────────────[\s\S]*?\/\/ ══════════════════════════════════════════════════════════════\n    \/\/  BOOT/m, '// ══════════════════════════════════════════════════════════════\n    //  BOOT');

    // Change render fallback
    js = js.replace(/else if \(S\.tab === 'quiz'\) renderQuiz\(\);\n\s*else renderAnki\(\);/, `else if (S.tab === 'quiz') renderQuiz();`);

    // Login Logic in BOOT
    const oldBoot = /window\.addEventListener\('load', async \(\) => \{[\s\S]*?\}\);/;
    const newBoot = `
    document.getElementById('login-btn').addEventListener('click', () => {
      const u = document.getElementById('login-user').value.trim();
      const p = document.getElementById('login-pass').value.trim();
      if (u === 'admin' && p === 'admin1718') {
        sessionStorage.setItem('ch_auth', '1');
        document.getElementById('login-overlay').style.display = 'none';
        document.getElementById('app-content').style.display = 'flex';
      } else {
        document.getElementById('login-error').textContent = 'Hatalı kullanıcı adı veya şifre!';
      }
    });

    window.addEventListener('load', async () => {
      if (sessionStorage.getItem('ch_auth') === '1') {
        document.getElementById('login-overlay').style.display = 'none';
        document.getElementById('app-content').style.display = 'flex';
      } else {
        document.getElementById('app-content').style.display = 'none';
      }
      if ('speechSynthesis' in window) window.speechSynthesis.getVoices();
      filterWords();
      await TTS.init();
      render();
    });`;

    js = js.replace(oldBoot, newBoot);

    html = html.replace(scriptsRegex, `<script>${js}</script>`);
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('Update logic applied');
