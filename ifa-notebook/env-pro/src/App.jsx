/* ─────────────────────────────────────────────────────────────────────────────
   IfaNote Pro — Premium Notebook Environment
   IFA = Ifa For All · The IFA Internet · CENProject
   ifainternet.org/ifa-notebook/env-pro/
   PRO FEATURES: Multi-notebook manager · Auto-save · 4 Themes · Presentation
   Mode · Share via URL · AI Cell (Claude) · Focus Mode
───────────────────────────────────────────────────────────────────────────── */

const { useState, useEffect, useRef } = React;

// ── Auth — reads live IfaLMS user data from shared localStorage ─────────────
// IfaLMS stores its state in 'ifaLMS_v2' on the same origin (ifainternet.org),
// so IfaNote Pro can validate against exactly the same accounts and passwords.
const LMS_STORAGE_KEY   = 'ifaLMS_v2';
const NOTE_SESSION_KEY  = 'ifanote_pro_user';

const SEED_STUDENTS = [
  { username: 'admin',    password: 'OrisaIfa22233.', name: 'IFA Academy Admin',  role: 'admin',   status: 'approved' },
  { username: 'adewale',  password: 'student123',     name: 'Adewale Okafor',     role: 'student', status: 'approved' },
  { username: 'chiamaka', password: 'student123',     name: 'Chiamaka Nwosu',     role: 'student', status: 'pending'  },
  { username: 'tayo',     password: 'student123',     name: 'Tayo Adeleke',       role: 'student', status: 'approved' },
  { username: 'emeka',    password: 'student123',     name: 'Emeka Obi',          role: 'student', status: 'pending'  },
  { username: 'ngozi',    password: 'student123',     name: 'Ngozi Adeyemi',      role: 'student', status: 'approved' },
];

function getLmsUsers() {
  try {
    const raw = localStorage.getItem(LMS_STORAGE_KEY);
    if (raw) {
      const state = JSON.parse(raw);
      if (Array.isArray(state.users)) return state.users;
    }
  } catch (e) {}
  return SEED_STUDENTS;
}

function getNoteSession() {
  try {
    const raw = localStorage.getItem(NOTE_SESSION_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return null;
}

function SubscriptionGate({ onUnlock }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState(false);
  const [shake, setShake]       = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const users = getLmsUsers();
    const user  = users.find(
      u => u.username === username.trim() && u.password === password
    );
    if (user) {
      localStorage.setItem(NOTE_SESSION_KEY, JSON.stringify({ username: user.username, name: user.name }));
      onUnlock(user.name);
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 600);
    }
  }

  return (
    <div className="sub-gate">
      <div className="sub-gate__bg" aria-hidden="true">
        <div className="sub-gate__grid" />
        <div className="sub-gate__orb sub-gate__orb--a" />
        <div className="sub-gate__orb sub-gate__orb--b" />
        <div className="sub-gate__orb sub-gate__orb--c" />
      </div>

      <div className={`sub-gate__card${shake ? ' sub-gate__card--shake' : ''}`}>
        <div className="sub-gate__logo" aria-label="IfaNote Pro">
          <span className="sub-gate__logo-ifa">Ifa</span>
          <span className="sub-gate__logo-rest">Note</span>
          <span className="sub-gate__logo-dot">·</span>
          <span className="sub-gate__logo-tag">PRO</span>
        </div>

        <div className="sub-gate__icon" aria-hidden="true">◉</div>

        <h1 className="sub-gate__title">Student Login</h1>
        <p className="sub-gate__desc">
          IFA Note Premium is available exclusively to students of the{' '}
          <strong>IFA Academy of Polymaths</strong> and premium members.
          Sign in with your{' '}
          <a href="https://ifainternet.org/ifa-lms/ifa-academy/#" target="_blank" rel="noopener noreferrer" className="sub-gate__join-link">IFA Academy</a>{' '}
          login details.
        </p>

        <form onSubmit={handleSubmit} className="sub-gate__form">
          <input
            type="text"
            className={`sub-gate__input${error ? ' sub-gate__input--error' : ''}`}
            placeholder="Username"
            value={username}
            onChange={e => { setUsername(e.target.value); setError(false); }}
            autoComplete="username"
            spellCheck={false}
            aria-label="Username"
          />
          <input
            type="password"
            className={`sub-gate__input${error ? ' sub-gate__input--error' : ''}`}
            placeholder="Password"
            value={password}
            onChange={e => { setPassword(e.target.value); setError(false); }}
            autoComplete="current-password"
            aria-label="Password"
          />
          <button type="submit" className="sub-gate__btn">
            Sign in to IfaNote Pro <span className="sub-gate__btn-arrow">→</span>
          </button>
        </form>

        {error && (
          <p className="sub-gate__error" role="alert">
            ⊗ Invalid username or password — use your IFA Academy login details.
          </p>
        )}

        <div className="sub-gate__divider" />

        <p className="sub-gate__join">
          Not yet a student?{' '}
          <a
            href="https://ifainternet.org/ifa-lms/ifa-academy/#enroll"
            target="_blank"
            rel="noopener noreferrer"
            className="sub-gate__join-link"
          >
            Join the IFA Academy of Polymaths →
          </a>
        </p>

        <div className="sub-gate__footer">
          <a href="/" className="sub-gate__home">← IFA Internet</a>
          <span className="sub-gate__tag">The IFA Internet · CENProject</span>
        </div>
      </div>
    </div>
  );
}

/* ── Odu Ifa data (16 principal Odu with IFABit codes) ────────────────────── */
const INAIFA_ODU = [
  { name:'Ogbè',       latin:'Ogbe',      num:1,  color:'#f5c518', domain:'Light · Creation',     field:'Mathematics',  code:'1111' },
  { name:'Ọ̀yẹ̀kú',    latin:'Oyeku',     num:2,  color:'#a78bfa', domain:'Void · Transition',    field:'Philosophy',   code:'0000' },
  { name:'Ìwòrì',     latin:'Iwori',     num:3,  color:'#3b9eff', domain:'Vision · Self',         field:'Physics',      code:'0110' },
  { name:'Òdí',       latin:'Odi',       num:4,  color:'#10b981', domain:'Birth · Gestation',     field:'Biology',      code:'1001' },
  { name:'Ìrosún',    latin:'Irosun',    num:5,  color:'#f43f5e', domain:'Blood · Sacrifice',     field:'Medicine',     code:'1100' },
  { name:'Ọ̀wọ́nrín',  latin:'Owonrin',   num:6,  color:'#f97316', domain:'Chaos · Revolution',    field:'Engineering',  code:'0011' },
  { name:'Ọ̀bárà',    latin:'Obara',     num:7,  color:'#f59e0b', domain:'Royalty · Expansion',   field:'Economics',    code:'1000' },
  { name:'Ọ̀kànràn',  latin:'Okanran',   num:8,  color:'#ec4899', domain:'Conflict · Resolve',    field:'Governance',   code:'0001' },
  { name:'Ògúndá',    latin:'Ogunda',    num:9,  color:'#dc2626', domain:'Iron · Justice',        field:'Law',          code:'1110' },
  { name:'Ọ̀sá',      latin:'Osa',       num:10, color:'#818cf8', domain:'Speed · Surprise',      field:'Technology',   code:'0111' },
  { name:'Ìká',       latin:'Ika',       num:11, color:'#14b8a6', domain:'Wealth · Wisdom',       field:'Finance',      code:'0100' },
  { name:'Òtúrúpọ̀n', latin:'Oturupon',  num:12, color:'#84cc16', domain:'Covenant · Ground',     field:'Architecture', code:'0010' },
  { name:'Òtúrá',     latin:'Otura',     num:13, color:'#06b6d4', domain:'Creation · Olódumàre', field:'Astronomy',    code:'1011' },
  { name:'Ìrẹtẹ̀',    latin:'Irete',     num:14, color:'#f472b6', domain:'Destiny · Firmness',    field:'History',      code:'1101' },
  { name:'Ọ̀ṣẹ́',      latin:'Ose',       num:15, color:'#c084fc', domain:'Prosperity · Beauty',   field:'Arts & Music', code:'1010' },
  { name:'Òfún',      latin:'Ofun',      num:16, color:'#cbd5e1', domain:'Death · Rebirth',       field:'Metaphysics',  code:'0101' },
];

/* ── STEAMSEX & SIDECHRX data (for Odu cell matrices) ───────────────────── */
const NB_STEAMSEX = [
  { letter:'S', name:'(Natural) Science', short:'Science',    color:'#f0920c' },
  { letter:'T', name:'Technology',        short:'Technology', color:'#14b8d4' },
  { letter:'E', name:'Engineering',       short:'Engineering',color:'#00c87c' },
  { letter:'A', name:'Arts',              short:'Arts',       color:'#ec4899' },
  { letter:'M', name:'Mathematics',       short:'Math',       color:'#f5c518' },
  { letter:'S', name:'Social Science',    short:'Social',     color:'#8b5cf6' },
  { letter:'E', name:'Education',         short:'Education',  color:'#3b9eff' },
  { letter:'X', name:'Others (Unknowns)', short:'Unknowns',   color:'#6366f1' },
];

const NB_SIDECHRX = [
  { letter:'S', name:'Symmetry',     color:'#f0920c' },
  { letter:'I', name:'Invariance',   color:'#6366f1' },
  { letter:'D', name:'Duality',      color:'#14b8d4' },
  { letter:'E', name:'Emergence',    color:'#00c87c' },
  { letter:'C', name:'Composition',  color:'#ef4444' },
  { letter:'H', name:'Holism',       color:'#8b5cf6' },
  { letter:'R', name:'Reductionism', color:'#3b9eff' },
  { letter:'X', name:'Simulation',   color:'#ec4899' },
];

/* ── Cell colours ─────────────────────────────────────────────────────────── */
const CELL_CLR = {
  odu: '#10b981', text: '#3b9eff',
  art: '#f43f5e', multimedia: '#8b5cf6',
  math: '#06b6d4', schematics: '#84cc16', others: '#94a3b8',
  ai: '#a855f7', lang: '#f5c518',
};

/* ── Cell badge labels ────────────────────────────────────────────────────── */
const CELL_BADGE = {
  odu: 'ODU', text: 'TEXT',
  art: '🎨 ART', multimedia: '▶ MEDIA',
  math: '∑ MATH', schematics: '⊞ SCHEM', others: '… OTHERS',
  ai: '✦ AI', lang: '🗣 LANG · Experimental',
};

/* ── Language config for code cells ──────────────────────────────────────── */
const LANG_CONFIG = {
  js: {
    label: 'JavaScript', badge: 'JS', color: '#f0920c',
    hint: 'JavaScript · runs in your browser',
    placeholder: '// JavaScript',
  },
  python: {
    label: 'Python', badge: '🐍 Python', color: '#22d3ee',
    hint: 'Python 3 · numpy, math & more — powered by Pyodide (WebAssembly)',
    placeholder: '# Python 3 — powered by Pyodide (WebAssembly)\n# numpy, math, json, sys and the standard library are available\n# Use micropip.install("pkg") for extra packages',
  },
  c: {
    label: 'C', badge: 'C', color: '#a78bfa',
    hint: 'C · full compiler integration — Phase II',
    placeholder: '/* C */\n#include <stdio.h>\n\nint main() {\n    printf("Hello, Ifa!\\n");\n    return 0;\n}',
  },
  scratch: {
    label: 'Scratch', badge: '🐱 Scratch', color: '#f59e0b',
    hint: 'Scratch · block-based visual language',
    placeholder: '',
  },
};

/* ── JS sandbox helper ────────────────────────────────────────────────────── */
function codeToOdu(marks) {
  const code = marks.join('');
  return INAIFA_ODU.find(o => o.code === code) || null;
}

function oduMarksToText(marks) {
  // Single mark (m=1) → '|', double mark (m=0) → '||'
  return marks.map(m => m === 1 ? '|' : '||');
}

/* ── Text Markdown renderer (shared by preview + export) ─────────────────── */
function renderTextMarkdown(rawText, rtl) {
  const text = rawText || '';
  const esc  = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  const dir  = rtl ? ' dir="rtl" style="text-align:right;margin:0 0 4px"' : ' style="margin:0 0 4px"';
  const inline = s => esc(s)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g,     '<em>$1</em>');
  return text.split('\n').map(line => {
    if (line.startsWith('#### ')) return `<h4${dir}>${inline(line.slice(5))}</h4>`;
    if (line.startsWith('### '))  return `<h3${dir}>${inline(line.slice(4))}</h3>`;
    if (line.startsWith('## '))   return `<h2${dir}>${inline(line.slice(3))}</h2>`;
    if (line.startsWith('# '))    return `<h1${dir}>${inline(line.slice(2))}</h1>`;
    if (line.trim() === '')        return '<br>';
    return `<p${dir}>${inline(line)}</p>`;
  }).join('');
}

function runJSCell(src) {
  const logs = [];
  const con = {
    log:   (...a) => logs.push(a.map(x => typeof x==='object'?JSON.stringify(x,null,2):String(x)).join(' ')),
    error: (...a) => logs.push('⚠ '+a.map(String).join(' ')),
    warn:  (...a) => logs.push('⚠ '+a.map(String).join(' ')),
    info:  (...a) => logs.push(a.map(String).join(' ')),
  };
  try {
    /* jshint ignore:start */
    const fn = new Function('console', src);
    /* jshint ignore:end */
    const ret = fn(con);
    if (logs.length === 0 && ret !== undefined) logs.push(String(ret));
    return { ok: true, lines: logs };
  } catch(e) {
    return { ok: false, lines: ['Error: ' + e.message] };
  }
}

/* ── JS Terminal REPL (indirect eval → global scope; var-declared vars persist) */
function runJSTerminalLine(src) {
  const logs = [];
  const orig = { log: console.log, error: console.error, warn: console.warn, info: console.info };
  console.log   = (...a) => logs.push(a.map(x => typeof x==='object'?JSON.stringify(x,null,2):String(x)).join(' '));
  console.error = (...a) => logs.push('⚠ '+a.map(String).join(' '));
  console.warn  = (...a) => logs.push('⚠ '+a.map(String).join(' '));
  console.info  = (...a) => logs.push(a.map(String).join(' '));
  try {
    const ret = (0, eval)(src); // indirect eval → runs in global scope
    Object.assign(console, orig);
    if (logs.length === 0 && ret !== undefined)
      logs.push(typeof ret === 'object' ? JSON.stringify(ret, null, 2) : String(ret));
    return { ok: true, lines: logs };
  } catch(e) {
    Object.assign(console, orig);
    return { ok: false, lines: ['⚠ ' + e.message] };
  }
}

/* ── Pyodide (Python-in-WebAssembly) loader ───────────────────────────────── */
const PYODIDE_VERSION = '0.26.2';
const PYODIDE_CDN = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`;

let _pyodide = null;
let _pyodidePromise = null;

function loadPyodideOnce() {
  if (_pyodide) return Promise.resolve(_pyodide);
  if (_pyodidePromise) return _pyodidePromise;
  _pyodidePromise = new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = PYODIDE_CDN + 'pyodide.js';
    s.onload = () => {
      /* global loadPyodide */
      loadPyodide({ indexURL: PYODIDE_CDN })
        .then(py => { _pyodide = py; resolve(py); })
        .catch(reject);
    };
    s.onerror = () => reject(new Error('Failed to load Pyodide — check your internet connection.'));
    document.head.appendChild(s);
  });
  return _pyodidePromise;
}

async function runPythonCell(src) {
  const py = await loadPyodideOnce();
  // Redirect stdout + stderr into a StringIO buffer
  py.runPython(`
import sys
from io import StringIO as _SIO
_nb_buf = _SIO()
_nb_prev_out, _nb_prev_err = sys.stdout, sys.stderr
sys.stdout = sys.stderr = _nb_buf
`);
  try {
    await py.runPythonAsync(src);
    const out = py.runPython('_nb_buf.getvalue()');
    py.runPython('sys.stdout, sys.stderr = _nb_prev_out, _nb_prev_err');
    const trimmed = (out || '').trimEnd();
    const lines   = trimmed ? trimmed.split('\n') : [];
    return { ok: true, lines };
  } catch(e) {
    try { py.runPython('sys.stdout, sys.stderr = _nb_prev_out, _nb_prev_err'); } catch(_) {}
    return { ok: false, lines: [String(e)] };
  }
}

/* ── KaTeX (Math renderer) ────────────────────────────────────────────────── */
const KATEX_CDN = 'https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/';
let _katex = null, _katexPromise = null;

function loadKatexOnce() {
  if (_katex) return Promise.resolve(_katex);
  if (_katexPromise) return _katexPromise;
  _katexPromise = new Promise((resolve, reject) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet'; link.href = KATEX_CDN + 'katex.min.css';
    document.head.appendChild(link);
    const s = document.createElement('script');
    s.src = KATEX_CDN + 'katex.min.js';
    s.onload  = () => { _katex = window.katex; resolve(_katex); };
    s.onerror = () => reject(new Error('Failed to load KaTeX — check your connection.'));
    document.head.appendChild(s);
  });
  return _katexPromise;
}

function renderMathSrc(src, katex) {
  try {
    let html = src;
    // $$…$$ → display
    html = html.replace(/\$\$([^$]+)\$\$/gs, (_, m) =>
      katex.renderToString(m.trim(), { displayMode: true, throwOnError: false }));
    // $…$ → inline
    html = html.replace(/\$([^$\n]+)\$/g, (_, m) =>
      katex.renderToString(m.trim(), { displayMode: false, throwOnError: false }));
    // No $ markers → render whole thing as display math
    if (!src.includes('$')) {
      html = katex.renderToString(src.trim(), { displayMode: true, throwOnError: false });
    }
    return { ok: true, html };
  } catch(e) {
    return { ok: false, html: `<span style="color:#f87171">Error: ${e.message}</span>` };
  }
}

/* ── Mermaid (Diagram renderer) ───────────────────────────────────────────── */
let _mermaid = null, _mermaidPromise = null;

function loadMermaidOnce() {
  if (_mermaid) return Promise.resolve(_mermaid);
  if (_mermaidPromise) return _mermaidPromise;
  _mermaidPromise = new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js';
    s.onload = () => {
      const m = window.mermaid;
      m.initialize({ startOnLoad: false, theme: 'dark', securityLevel: 'loose' });
      _mermaid = m; resolve(m);
    };
    s.onerror = () => reject(new Error('Failed to load Mermaid — check your connection.'));
    document.head.appendChild(s);
  });
  return _mermaidPromise;
}

const MERMAID_KEYWORDS = ['flowchart','graph','sequenceDiagram','classDiagram',
  'stateDiagram','erDiagram','gantt','pie','gitGraph','mindmap','timeline'];

function isMermaidSrc(src) {
  const first = src.trimStart().toLowerCase();
  return MERMAID_KEYWORDS.some(k => first.startsWith(k.toLowerCase()));
}

/* ── Graphviz / DOT (diagram renderer) ──────────────────────────────────────── */
let _viz = null, _vizPromise = null;
function loadVizOnce() {
  if (_viz) return Promise.resolve(_viz);
  if (_vizPromise) return _vizPromise;
  _vizPromise = new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/@viz-js/viz@3/lib/viz-standalone.js';
    s.onload = () => {
      window.Viz.instance()
        .then(v => { _viz = v; resolve(v); })
        .catch(reject);
    };
    s.onerror = () => reject(new Error('Failed to load Graphviz — check your connection.'));
    document.head.appendChild(s);
  });
  return _vizPromise;
}

/* ── Aebajiogbe-Oduduwa keyboard layout ──────────────────────────────────── */
// Characters rendered via Aebajiogbe Oduduwa font (Arabic codepoints → Aebajiogbe glyphs)
const ODU_KB_ROWS = [
  // Row 1 — top row (glyphs 1–14, RTL order on physical keyboard)
  ['\u0634','\u062b','\u0644\u0627','\u062a','\u062e','\u0621','\u064a','\u0628','\u0641','\u0624','\u0631','\u0645','\u0635','\u0639'],
  // Row 2 — middle row (glyphs 15–25)
  ['\u0629','\u0649','\u0647','\u0627','\u0642','\u0633','\u0626','\u0646','\u0644','\u063a','\u062d'],
  // Row 3 — short row (glyphs 36–44 + punctuation)
  ['\u0648','\u0632','\u0643','\u061f','\u0637',',','.'],
  // Row 4 — digit row (glyphs 26–35, U+1E950–U+1E959)
  ['\u{1E950}','\u{1E951}','\u{1E952}','\u{1E953}','\u{1E954}','\u{1E955}','\u{1E956}','\u{1E957}','\u{1E958}','\u{1E959}'],
  // Row 5 — extra Arabic glyphs that appear in row 4 of physical keyboard
  ['\u0630','\u0636'],
];

function AebajiogbeKeyboard({ onInsert }) {
  return (
    <div className="odu-kb" onClick={e => e.stopPropagation()}>
      {ODU_KB_ROWS.map((row, ri) => (
        <div key={ri} className="odu-kb__row">
          {row.map((ch, ci) => (
            <button key={ci} className="odu-kb__key" onClick={() => onInsert(ch)}
              title={`U+${[...ch].map(c => c.codePointAt(0).toString(16).toUpperCase().padStart(4,'0')).join('+')}`}>
              {ch}
            </button>
          ))}
        </div>
      ))}
      <div className="odu-kb__row odu-kb__row--util">
        <button className="odu-kb__key odu-kb__key--wide" onClick={() => onInsert(' ')}>Space</button>
        <button className="odu-kb__key odu-kb__key--util" onClick={() => onInsert('\n')}>↵</button>
      </div>
    </div>
  );
}

/* ── ABD (Yorùbá Full Keyboard) ──────────────────────────────────────────── */
// ABD = Aborisa Dialect Board — full Yorùbá vowels, consonants, and tonal marks
// Vowel rows: each group of 4 = [base, low-tone ̀, high-tone ́, mid-tone ̄]
const ABD_KB_GROUPS = [
  {
    label: 'Vowels',
    hint: 'base · \u0300 low · \u0301 high · \u0304 mid  (each group of 4)',
    rows: [
      // a-group (base, ̀, ́, ̄)  +  e-group
      ['a','\u00E0','\u00E1','\u0101',  'e','\u00E8','\u00E9','\u0113'],
      // ẹ-group  +  i-group
      ['\u1EB9','\u1EB9\u0300','\u1EB9\u0301','\u1EB9\u0304',  'i','\u00EC','\u00ED','\u012B'],
      // o-group  +  ọ-group
      ['o','\u00F2','\u00F3','\u014D',  '\u1ECD','\u1ECD\u0300','\u1ECD\u0301','\u1ECD\u0304'],
      // u-group  +  n-group (nasal)
      ['u','\u00F9','\u00FA','\u016B',  'n','\u01F9','\u0144','n\u0304'],
    ],
  },
  {
    label: 'VOWELS',
    hint: 'base · \u0300 low · \u0301 high · \u0304 mid  (each group of 4)',
    rows: [
      ['A','\u00C0','\u00C1','\u0100',  'E','\u00C8','\u00C9','\u0112'],
      ['\u1EB8','\u1EB8\u0300','\u1EB8\u0301','\u1EB8\u0304',  'I','\u00CC','\u00CD','\u012A'],
      ['O','\u00D2','\u00D3','\u014C',  '\u1ECC','\u1ECC\u0300','\u1ECC\u0301','\u1ECC\u0304'],
      ['U','\u00D9','\u00DA','\u016A',  'N','\u01F8','\u0143','N\u0304'],
    ],
  },
  {
    label: 'Consonants',
    hint: null,
    rows: [
      ['b','d','f','g','gb','h','j','k','kp'],
      ['l','m','p','r','s','\u1E63','t','w','y'],
      ['B','D','F','G','GB','H','J','K','KP'],
      ['L','M','P','R','S','\u1E62','T','W','Y'],
    ],
  },
];

function AbdKeyboard({ onInsert }) {
  const [activeTab, setActiveTab] = useState(0);
  const group = ABD_KB_GROUPS[activeTab];
  return (
    <div className="nb-math-kb nb-abd-kb" onClick={e => e.stopPropagation()}>
      <div className="nb-math-kb__tabs">
        {ABD_KB_GROUPS.map((g, i) => (
          <button key={i}
            className={'nb-math-kb__tab' + (i === activeTab ? ' nb-math-kb__tab--active' : '')}
            onClick={() => setActiveTab(i)}>
            {g.label}
          </button>
        ))}
      </div>
      {group.hint && <div className="nb-abd-kb__hint">{group.hint}</div>}
      <div className="nb-math-kb__keys">
        {group.rows.map((row, ri) => (
          <div key={ri} className="nb-math-kb__row nb-abd-kb__row">
            {row.map((ch, ci) => (
              <button key={ci}
                className={'nb-abd-kb__key' + (ci === 3 ? ' nb-abd-kb__key--sep' : '')}
                onClick={() => onInsert(ch)}
                title={[...ch].map(c => 'U+' + c.codePointAt(0).toString(16).toUpperCase().padStart(4,'0')).join(' ')}>
                {ch}
              </button>
            ))}
          </div>
        ))}
        <div className="odu-kb__row odu-kb__row--util" style={{marginTop:'4px'}}>
          <button className="odu-kb__key odu-kb__key--wide" style={{fontFamily:'inherit'}} onClick={() => onInsert(' ')}>Space</button>
          <button className="odu-kb__key odu-kb__key--util" style={{fontFamily:'inherit'}} onClick={() => onInsert('\n')}>↵</button>
        </div>
      </div>
    </div>
  );
}

/* ── Special Characters Keyboard ─────────────────────────────────────────── */
const SPECIAL_KB_GROUPS = [
  {
    label: 'Math',
    rows: [
      ['±','∓','×','÷','·','∝','≈','≡','∼','≠','≤','≥'],
      ['∞','∂','∇','∑','∏','∫','∬','∮','√','∛','∜','∠'],
      ['°','′','″','⊕','⊗','⊥','∈','∉','∩','∪','∅','∀'],
    ],
  },
  {
    label: 'Arrows',
    rows: [
      ['→','←','↑','↓','↔','↕','↗','↘','↙','↖'],
      ['⇒','⇐','⇑','⇓','⇔','⟹','⟸','⟺','↩','↪'],
      ['➡','⬅','⬆','⬇','↺','↻','↱','↲','⤴','⤵'],
    ],
  },
  {
    label: 'Currency',
    rows: [
      ['$','€','£','¥','₦','₿','₹','₩','¢','₽'],
      ['₫','₱','₭','₴','₺','₼','₾','₸','฿','₡'],
    ],
  },
  {
    label: 'Misc',
    rows: [
      ['©','®','™','§','¶','†','‡','•','·','…'],
      ['\u201C','\u201D','\u2018','\u2019','\u00AB','\u00BB','\u2014','\u2013','\u2010','\u2011'],
      ['★','☆','✓','✗','♠','♣','♥','♦','№','℗'],
    ],
  },
];

function SpecialCharsKeyboard({ onInsert }) {
  const [activeTab, setActiveTab] = useState(0);
  const group = SPECIAL_KB_GROUPS[activeTab];
  return (
    <div className="nb-math-kb nb-sp-kb" onClick={e => e.stopPropagation()}>
      <div className="nb-math-kb__tabs">
        {SPECIAL_KB_GROUPS.map((g, i) => (
          <button key={i}
            className={'nb-math-kb__tab' + (i === activeTab ? ' nb-math-kb__tab--active' : '')}
            onClick={() => setActiveTab(i)}>
            {g.label}
          </button>
        ))}
      </div>
      <div className="nb-math-kb__keys">
        {group.rows.map((row, ri) => (
          <div key={ri} className="nb-math-kb__row">
            {row.map((ch, ci) => (
              <button key={ci} className="nb-math-kb__key"
                onClick={() => onInsert(ch)}
                title={'U+' + ch.codePointAt(0).toString(16).toUpperCase().padStart(4,'0')}>
                {ch}
              </button>
            ))}
          </div>
        ))}
        <div className="odu-kb__row odu-kb__row--util" style={{marginTop:'4px'}}>
          <button className="odu-kb__key odu-kb__key--wide" style={{fontFamily:'inherit'}} onClick={() => onInsert(' ')}>Space</button>
          <button className="odu-kb__key odu-kb__key--util" style={{fontFamily:'inherit'}} onClick={() => onInsert('\n')}>↵</button>
        </div>
      </div>
    </div>
  );
}

/* ── Math Symbols Keyboard ────────────────────────────────────────────────── */
const MATH_KB_GROUPS = [
  {
    label: 'Greek',
    rows: [
      ['α','β','γ','δ','ε','ζ','η','θ','ι','κ','λ','μ'],
      ['ν','ξ','π','ρ','σ','τ','υ','φ','χ','ψ','ω'],
      ['Γ','Δ','Θ','Λ','Ξ','Π','Σ','Φ','Ψ','Ω'],
    ],
  },
  {
    label: 'Operators',
    rows: [
      ['±','∓','×','÷','·','∝','≈','≡','∼','≠','≤','≥'],
      ['∞','∂','∇','∑','∏','∫','∬','∮','√','∛','∜'],
    ],
  },
  {
    label: 'Logic/Set',
    rows: [
      ['∈','∉','∩','∪','⊂','⊃','⊆','⊇','∅'],
      ['∧','∨','¬','→','←','↔','∀','∃','⊕','⊗','⊥'],
    ],
  },
  {
    label: 'LaTeX',
    rows: [
      [
        { label: 'a/b',    insert: '\\frac{}{}' },
        { label: '√x',     insert: '\\sqrt{}' },
        { label: 'xⁿ',     insert: '^{}' },
        { label: 'xᵢ',     insert: '_{}' },
        { label: '∫',      insert: '\\int_{}^{}' },
        { label: '∑',      insert: '\\sum_{i=0}^{n}' },
        { label: '∏',      insert: '\\prod_{}^{}' },
        { label: 'lim',    insert: '\\lim_{}' },
      ],
      [
        { label: '(  )',   insert: '\\left( \\right)' },
        { label: '|  |',   insert: '\\left| \\right|' },
        { label: 'binom',  insert: '\\binom{}{}' },
        { label: 'vec',    insert: '\\vec{}' },
        { label: 'hat',    insert: '\\hat{}' },
        { label: 'bar',    insert: '\\bar{}' },
        { label: 'matrix', insert: '\\begin{matrix}  &  \\\\  &  \\end{matrix}' },
        { label: 'cases',  insert: '\\begin{cases}  &  \\\\  &  \\end{cases}' },
      ],
      [
        { label: '$$…$$', insert: '$$\n\n$$' },
        { label: '$…$',   insert: '$ $' },
        { label: 'text',  insert: '\\text{}' },
        { label: 'bold',  insert: '\\mathbf{}' },
        { label: 'over',  insert: '\\overline{}' },
        { label: 'under', insert: '\\underline{}' },
        { label: '\\not', insert: '\\not' },
        { label: 'cdot',  insert: '\\cdot' },
      ],
    ],
  },
];

function MathSymbolsKeyboard({ onInsert }) {
  const [activeTab, setActiveTab] = useState(0);
  const group = MATH_KB_GROUPS[activeTab];
  return (
    <div className="nb-math-kb" onClick={e => e.stopPropagation()}>
      <div className="nb-math-kb__tabs">
        {MATH_KB_GROUPS.map((g, i) => (
          <button key={i}
            className={'nb-math-kb__tab' + (i === activeTab ? ' nb-math-kb__tab--active' : '')}
            onClick={() => setActiveTab(i)}>
            {g.label}
          </button>
        ))}
      </div>
      <div className="nb-math-kb__keys">
        {group.rows.map((row, ri) => (
          <div key={ri} className="nb-math-kb__row">
            {row.map((item, ci) => {
              const isLatex = typeof item !== 'string';
              return (
                <button key={ci}
                  className={'nb-math-kb__key' + (isLatex ? ' nb-math-kb__key--latex' : '')}
                  onClick={() => onInsert(isLatex ? item.insert : item)}
                  title={isLatex ? item.insert : item}>
                  {isLatex ? item.label : item}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Math evaluator (standalone — no hook deps) ───────────────────────────── */
function evalCalcExpr(e, isDeg, ansVal) {
  if (!e || !e.trim()) return null;
  const D2R = Math.PI / 180, R2D = 180 / Math.PI;
  const factorial = n => {
    n = Math.round(Math.abs(n));
    if (n > 170) return Infinity;
    let r = 1; for (let i = 2; i <= n; i++) r *= i; return r;
  };
  const nCr = (n, k) => factorial(n) / (factorial(k) * factorial(n - k));
  const nPr = (n, k) => factorial(n) / factorial(n - k);
  const sinFn  = isDeg ? d => Math.sin(d * D2R)  : x => Math.sin(x);
  const cosFn  = isDeg ? d => Math.cos(d * D2R)  : x => Math.cos(x);
  const tanFn  = isDeg ? d => Math.tan(d * D2R)  : x => Math.tan(x);
  const asinFn = isDeg ? x => Math.asin(x) * R2D : x => Math.asin(x);
  const acosFn = isDeg ? x => Math.acos(x) * R2D : x => Math.acos(x);
  const atanFn = isDeg ? x => Math.atan(x) * R2D : x => Math.atan(x);
  try {
    const s = e
      .replace(/×/g,  '*').replace(/÷/g, '/').replace(/−/g, '-')
      .replace(/\^/g, '**')
      .replace(/π/g,  '(Math.PI)')
      .replace(/φ/g,  '(1.6180339887498948)')
      .replace(/γ/g,  '(0.5772156649015329)')
      .replace(/\bAns\b/g, ansVal != null ? '(' + ansVal + ')' : '0')
      /* hyperbolic — before basic trig */
      .replace(/asinh\(/g,'Math.asinh(').replace(/acosh\(/g,'Math.acosh(').replace(/atanh\(/g,'Math.atanh(')
      .replace(/sinh\(/g, 'Math.sinh(' ).replace(/cosh\(/g, 'Math.cosh(' ).replace(/tanh\(/g, 'Math.tanh(')
      /* inverse trig — before basic trig */
      .replace(/asin\(/g,'asinFn(').replace(/acos\(/g,'acosFn(').replace(/atan2\(/g,'Math.atan2(').replace(/atan\(/g,'atanFn(')
      /* basic trig */
      .replace(/sin\(/g,'sinFn(').replace(/cos\(/g,'cosFn(').replace(/tan\(/g,'tanFn(')
      /* logs — log₂ before log */
      .replace(/log₂\(/g,'Math.log2(').replace(/log\(/g,'Math.log10(').replace(/ln\(/g,'Math.log(')
      /* roots / exp */
      .replace(/√\(/g,'Math.sqrt(').replace(/∛\(/g,'Math.cbrt(').replace(/exp\(/g,'Math.exp(')
      /* misc */
      .replace(/abs\(/g,'Math.abs(').replace(/ceil\(/g,'Math.ceil(').replace(/floor\(/g,'Math.floor(')
      .replace(/round\(/g,'Math.round(').replace(/sign\(/g,'Math.sign(').replace(/trunc\(/g,'Math.trunc(')
      .replace(/max\(/g,'Math.max(').replace(/min\(/g,'Math.min(')
      .replace(/hypot\(/g,'Math.hypot(').replace(/clz32\(/g,'Math.clz32(')
      .replace(/nCr\(/g,'nCr(').replace(/nPr\(/g,'nPr(')
      .replace(/(\d+(?:\.\d+)?)\s*!/g,'factorial($1)')
      .replace(/\brandom\b/g,'(Math.random())')
      /* e constant — after all function replacements */
      .replace(/\be\b/g,'(Math.E)');
    /* jshint ignore:start */
    const fn = new Function(
      'Math','sinFn','cosFn','tanFn','asinFn','acosFn','atanFn','factorial','nCr','nPr',
      '"use strict";return(' + s + ')'
    );
    /* jshint ignore:end */
    const v = fn(Math,sinFn,cosFn,tanFn,asinFn,acosFn,atanFn,factorial,nCr,nPr);
    if (typeof v !== 'number') return { ok: true, val: String(v), num: NaN };
    if (!isFinite(v)) return { ok: false, val: isNaN(v) ? 'Error' : (v > 0 ? '∞' : '-∞'), num: v };
    const str = Number.isInteger(v) ? String(v) : (+v.toFixed(12)).toString();
    return { ok: true, val: str, num: v };
  } catch(_) { return { ok: false, val: 'Error', num: NaN }; }
}

/* ── MathCalculator ────────────────────────────────────────────────────────── */
function MathCalculator({ mode }) {
  const [expr,    setExpr]    = useState('');
  const [result,  setResult]  = useState('');
  const [history, setHistory] = useState([]);
  const [deg,     setDeg]     = useState(true);    // true = DEG, false = RAD
  const [mem,     setMem]     = useState(0);
  const [ans,     setAns]     = useState(null);
  const [liveRes, setLiveRes] = useState(null);
  const [copied,  setCopied]  = useState(false);

  /* live preview while building expression */
  useEffect(() => {
    if (!expr.trim()) { setLiveRes(null); return; }
    const r = evalCalcExpr(expr, deg, ans);
    if (r && r.ok && r.val !== expr.trim()) setLiveRes(r.val);
    else setLiveRes(null);
  }, [expr, deg, ans]);

  function pressEq() {
    if (!expr.trim()) return;
    const r = evalCalcExpr(expr, deg, ans);
    if (!r) return;
    setResult(r.val);
    if (r.ok && isFinite(r.num)) {
      setAns(r.num);
      setHistory(h => [{ expr, result: r.val }, ...h].slice(0, 30));
      setExpr(r.val);
    }
    setLiveRes(null);
  }

  function press(k) {
    if (k === 'C')       { setExpr(''); setResult(''); setLiveRes(null); return; }
    if (k === '⌫')      { setExpr(x => x.slice(0, -1)); setResult(''); return; }
    if (k === '=')       { pressEq(); return; }
    if (k === 'DEG/RAD') { setDeg(d => !d); return; }
    if (k === 'MC')      { setMem(0); return; }
    if (k === 'MR')      { setExpr(x => x + String(mem)); setResult(''); return; }
    if (k === 'M+') {
      const r = evalCalcExpr(expr, deg, ans);
      if (r && r.ok && isFinite(r.num)) setMem(m => +(m + r.num).toPrecision(14));
      return;
    }
    if (k === 'M−') {
      const r = evalCalcExpr(expr, deg, ans);
      if (r && r.ok && isFinite(r.num)) setMem(m => +(m - r.num).toPrecision(14));
      return;
    }
    if (k === 'Ans')  { setExpr(x => x + (ans != null ? String(ans) : '0')); setResult(''); return; }
    if (k === 'x²')   { setExpr(x => '(' + (x || '0') + ')^2'); setResult(''); return; }
    if (k === 'x³')   { setExpr(x => '(' + (x || '0') + ')^3'); setResult(''); return; }
    if (k === '1/x')  { setExpr(x => '1/(' + (x || '1') + ')'); setResult(''); return; }
    if (k === 'n!')   { setExpr(x => (x || '0') + '!'); setResult(''); return; }
    if (k === '+/-')  {
      setExpr(x => {
        if (!x || x === '0') return '-';
        if (x.startsWith('-(') && x.endsWith(')')) return x.slice(2, -1);
        return '-(' + x + ')';
      });
      setResult(''); return;
    }
    setExpr(x => x + k);
    setResult('');
  }

  function copyResult() {
    const txt = result || liveRes || expr;
    if (txt && navigator.clipboard) {
      navigator.clipboard.writeText(txt).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1200);
      }).catch(() => {});
    }
  }

  function btnClass(k) {
    if (k === '=')        return 'nb-calc-btn nb-calc-btn--eq';
    if (k === 'C')        return 'nb-calc-btn nb-calc-btn--clr';
    if (k === '⌫')       return 'nb-calc-btn nb-calc-btn--del';
    if (k === 'DEG/RAD')  return 'nb-calc-btn nb-calc-btn--toggle';
    if (['MC','MR','M+','M−'].includes(k)) return 'nb-calc-btn nb-calc-btn--mem';
    if (k === 'Ans')      return 'nb-calc-btn nb-calc-btn--ans';
    if (['+','−','×','÷','^','%'].includes(k)) return 'nb-calc-btn nb-calc-btn--op';
    if (['x²','x³','1/x','n!','+/-'].includes(k)) return 'nb-calc-btn nb-calc-btn--op2';
    if (['π','e','φ','γ'].includes(k)) return 'nb-calc-btn nb-calc-btn--const';
    if (['sin(','cos(','tan(','asin(','acos(','atan(',
         'sinh(','cosh(','tanh(','asinh(','acosh(','atanh(',
         'ln(','log(','log₂(','√(','∛(','exp(',
         'abs(','ceil(','floor(','round(','sign(',
         'nCr(','nPr(','atan2(','random',
         'max(','min(','hypot('].includes(k)) return 'nb-calc-btn nb-calc-btn--fn';
    return 'nb-calc-btn';
  }

  /* 6-column scientific rows — grouped by function category */
  const sciRows = [
    /* memory & mode */
    ['DEG/RAD', 'Ans',   'MC',    'MR',    'M+',    'M−'   ],
    /* basic trig */
    ['sin(',    'cos(',  'tan(',  'asin(', 'acos(', 'atan(' ],
    /* hyperbolic */
    ['sinh(',   'cosh(', 'tanh(', 'asinh(','acosh(','atanh('],
    /* power / unary */
    ['x²',      'x³',   '^',     'exp(',  '1/x',   'n!'    ],
    /* root / log */
    ['√(',      '∛(',   'ln(',   'log(',  'log₂(', '+/-'   ],
    /* combinatorics / geometry */
    ['abs(',    'round(','ceil(', 'floor(','nCr(',  'nPr('  ],
    /* constants & misc */
    ['π',       'e',    'φ',     'γ',     'sign(', 'random'],
  ];

  const basicRows = [
    ['C', '(', ')', '⌫'],
    ['7', '8', '9', '÷'],
    ['4', '5', '6', '×'],
    ['1', '2', '3', '−'],
    ['0', '.', '=', '+'],
  ];

  const hasErr = ['Error','∞','-∞'].includes(result);

  return (
    <div className="nb-calc" onClick={e => e.stopPropagation()}>

      {/* ── Display ── */}
      <div className="nb-calc__display">
        <div className="nb-calc__status-row">
          {mode === 'scientific' && (
            <span className={'nb-calc__badge nb-calc__badge--mode' + (deg ? '' : ' nb-calc__badge--rad')}>
              {deg ? 'DEG' : 'RAD'}
            </span>
          )}
          {mem !== 0 && (
            <span className="nb-calc__badge nb-calc__badge--mem">
              M:{(+mem.toPrecision(6)).toString()}
            </span>
          )}
          {ans != null && <span className="nb-calc__badge nb-calc__badge--ans">Ans</span>}
          {(result || liveRes) && (
            <button className="nb-calc__copy-btn" title={copied ? 'Copied!' : 'Copy result'}
              onClick={e => { e.stopPropagation(); copyResult(); }}>
              {copied ? '✓' : '⎘'}
            </button>
          )}
        </div>
        <div className="nb-calc__expr">{expr || '0'}</div>
        {liveRes && !result && (
          <div className="nb-calc__live">≈ {liveRes}</div>
        )}
        {result && (
          <div className={'nb-calc__result' + (hasErr ? ' nb-calc__result--err' : '')}>
            {result}
          </div>
        )}
      </div>

      {/* ── Scientific panel ── */}
      {mode === 'scientific' && (
        <div className="nb-calc__sci-panel">
          {sciRows.map((row, ri) => (
            <div key={ri} className="nb-calc__row nb-calc__row--6">
              {row.map(k => (
                <button key={k} className={btnClass(k)}
                  onClick={e => { e.stopPropagation(); press(k); }}
                  title={k === 'DEG/RAD' ? (deg ? 'Switch to Radians' : 'Switch to Degrees') : k}>
                  {k === 'DEG/RAD' ? (deg ? 'DEG' : 'RAD') : k}
                </button>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* ── Basic grid ── */}
      <div className="nb-calc__grid">
        {basicRows.map((row, ri) => (
          <div key={ri} className="nb-calc__row">
            {row.map(k => (
              <button key={k} className={btnClass(k)}
                onClick={e => { e.stopPropagation(); press(k); }}>
                {k}
              </button>
            ))}
          </div>
        ))}
      </div>

      {/* ── History ── */}
      {history.length > 0 && (
        <div className="nb-calc__history">
          <div className="nb-calc__history-hdr">
            <span>History ({history.length})</span>
            <button className="nb-calc__history-clear"
              onClick={e => { e.stopPropagation(); setHistory([]); setAns(null); }}>
              Clear
            </button>
          </div>
          {history.map((h, i) => (
            <div key={i} className="nb-calc__history-item"
              title="Click to reuse result"
              onClick={e => { e.stopPropagation(); setExpr(h.result); setResult(''); }}>
              <span className="nb-calc__history-expr">{h.expr}</span>
              <span className="nb-calc__history-eq"> = </span>
              <span className="nb-calc__history-result">{h.result}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Font options for text cells ──────────────────────────────────────────── */
const TEXT_FONTS = [
  { label: 'Noto Sans',     value: "'Noto Sans', sans-serif" },
  { label: 'Noto Serif',    value: "'Noto Serif', serif" },
  { label: 'Gentium Plus',  value: "'Gentium Plus', serif" },
  { label: 'Ubuntu',        value: "'Ubuntu', sans-serif" },
  { label: 'System',        value: "system-ui, -apple-system, sans-serif" },
  { label: 'Mono',          value: "'Courier New', monospace" },
];
const DEFAULT_TEXT_FONT = TEXT_FONTS[0].value;

/* ── Cell factory ─────────────────────────────────────────────────────────── */
let _nbId = 0;
function newNbCell(type, extra) {
  return Object.assign(
    { id: ++_nbId, type, input: '', output: null, running: false,
      right: [1,1,1,1], left: [1,1,1,1],
      lang: 'js',                  // for code cells
      font: DEFAULT_TEXT_FONT },   // for text cells
    extra || {}
  );
}

/* ── Download trigger helper ─────────────────────────────────────────────── */
// Appends the anchor to the DOM before clicking so all browsers register the
// download, then removes it and revokes the blob URL after a short delay.
function triggerDownload(url, filename) {
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 150);
}

/* ── Export helpers ───────────────────────────────────────────────────────── */
function exportIfa(cells, title) {
  const header = `IfaNote Notebook\nTitle: ${title}\nExported: ${new Date().toISOString()}\n${'─'.repeat(56)}\n\n`;
  const body = cells.map((c, i) => {
    const hdr = `[Cell ${i+1} | ${c.type.toUpperCase()}]`;
    if (c.type === 'odu') {
      const r = codeToOdu(c.right), l = codeToOdu(c.left);
      const rm = oduMarksToText(c.right), lm = oduMarksToText(c.left);
      const markRows = rm.map((rv, i) => `    ${rv.padEnd(8)}  ${lm[i]}`).join('\n');
      return `${hdr}\n  Ọtún (Right)    Òsì (Left)\n${markRows}\n  ${r ? r.name : '?'}  ·  ${l ? l.name : '?'}\n`;
    }
    if (c.type === 'ai') {
      const prompt = c.aiPrompt ? `Prompt: ${c.aiPrompt}` : '(no prompt)';
      const response = c.output?.text ? `Response: ${c.output.text}` : '(no response)';
      return `${hdr}\n${prompt}\n${response}\n`;
    }
    return `${hdr}\n${c.input}\n`;
  });
  const blob = new Blob([header + body.join('\n')], { type: 'text/plain' });
  triggerDownload(URL.createObjectURL(blob), (title||'notebook').replace(/\s+/g,'-').toLowerCase()+'.ifa');
}

/* ── Native serialization (round-trip JSON) ───────────────────────────────── */
function serializeNotebook(cells, title) {
  return JSON.stringify({
    version: 1,
    title,
    saved: new Date().toISOString(),
    cells: cells.map(({ id, running, output, ...rest }) => {
      // Preserve output only when the URL is a persistent data: or http(s): URL.
      // blob: URLs are ephemeral (session-only) and must not be saved.
      const keepOutput = output && output.url && !output.url.startsWith('blob:') ? output : undefined;
      return keepOutput ? { ...rest, output: keepOutput } : rest;
    }),
  }, null, 2);
}

function deserializeNotebook(text) {
  const data = JSON.parse(text);
  if (!Array.isArray(data.cells)) throw new Error('Not a valid IfaNote file.');
  return {
    title: data.title || 'Untitled IfaNote',
    cells: data.cells.map(c => newNbCell(c.type || 'text', c)),
  };
}

/* ── Shared HTML export body builder ──────────────────────────────────────── */
function buildExportBody(cells, format = 'pdf') {
  const esc = s => (s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  return cells.map((c, i) => {
    const hdr = `<h2>Cell ${i + 1} &mdash; ${c.type.toUpperCase()}</h2>`;
    if (c.type === 'odu') {
      const r = codeToOdu(c.right), l = codeToOdu(c.left);
      const rm = oduMarksToText(c.right), lm = oduMarksToText(c.left);
      const meji = r && l && r.num === l.num;
      const autoName = r && l ? `${esc(r.name)} ${esc(l.name)}` : '?';
      const fullName = c.oduName ? esc(c.oduName) : autoName;
      const badge = r && l ? `#${r.num}–${l.num}` : '';
      const domain = esc(c.oduTopic || (r ? r.domain || '' : ''));
      const tdMark = `text-align:right;padding:5pt 22pt;border:1px solid #ccc;font-size:14pt;font-family:monospace`;
      const tdName = `${tdMark};font-weight:bold`;
      const markRowsRTL = lm.map((lv, idx) =>
        `<tr><td style="${tdMark}">${lv}</td><td style="${tdMark}">${rm[idx]}</td></tr>`
      ).join('\n      ');
      return `${hdr}
<table style="border-collapse:collapse;margin:8pt 0 8pt auto">
  <tr>
    <th style="padding:5pt 22pt;border:1px solid #ccc;background:#f0f0f0;text-align:right">Òsì (Left)</th>
    <th style="padding:5pt 22pt;border:1px solid #ccc;background:#f0f0f0;text-align:right">Ọtún (Right)</th>
  </tr>
  ${markRowsRTL}
  <tr>
    <td style="${tdName}">${esc(l ? l.name : '?')}</td>
    <td style="${tdName}">${esc(r ? r.name : '?')}</td>
  </tr>
</table>
<p style="margin:4pt 0 12pt;font-size:15pt;font-weight:bold;text-align:right">
  ${fullName}${meji ? ' <span style="color:#a78bfa">Méjì ✦</span>' : ''}
  <span style="font-size:11pt;font-weight:normal;color:#555;margin-right:8pt">${badge}${domain ? ' &mdash; ' + domain : ''}</span>
</p>`;
    }
    if (c.type === 'text') {
      const aeb = c.scriptMode === 'aebajiogbe';
      const rendered = renderTextMarkdown(c.input || '', aeb);
      return aeb
        ? `${hdr}<div style="font-family:'Aebajiogbe Oduduwa',serif;font-size:16pt">${rendered}</div>`
        : `${hdr}${rendered}`;
    }
    if (c.type === 'code') {
      const codeOut = c.output && c.output.lines && c.output.lines.length > 0
        ? `\n<pre style="background:#1a1a2e;color:#e2e8f0;border-left:3px solid #3b9eff;margin-top:0"><code>${esc(c.output.lines.join('\n'))}</code></pre>`
        : (c.output && c.output.lines && c.output.lines.length === 0
          ? `\n<p style="font-size:9pt;color:#888;margin:2pt 0 8pt">✓ Ran — no output</p>`
          : '');
      return `${hdr}<pre><code>${esc(c.input || '')}</code></pre>${codeOut}`;
    }
    if (c.type === 'math') {
      const mathRendered = format === 'pdf' && c.output && c.output.html
        ? `\n<div style="padding:8pt 0;overflow-x:auto">${c.output.html}</div>`
        : '';
      const mathErr = c.output && c.output.ok === false && c.output.html
        ? `\n<p style="color:#f87171;font-size:9pt">${esc(c.output.html.replace(/<[^>]+>/g,''))}</p>`
        : '';
      return `${hdr}<pre style="background:#0a0e1a;color:#c8d8ee">${esc(c.input || '')}</pre>${mathRendered || mathErr}`;
    }
    if (c.type === 'schematics') return `${hdr}<pre>${esc(c.input || '')}</pre>`;
    if (c.type === 'multimedia') {
      if (!c.output || !c.output.ok) return `${hdr}<p style="color:#888;font-size:9pt">No media attached.</p>`;
      const mt  = c.output.mediaType;
      const url = c.output.url || '';
      const fn  = esc(c.output.fileName || url);
      if (mt === 'image') {
        return `${hdr}<img src="${url}" alt="${fn}" style="max-width:100%;height:auto;border-radius:4px;margin:6pt 0" />`;
      }
      if (mt === 'audio') {
        return `${hdr}<p style="margin:4pt 0"><strong>Audio:</strong> ${url.startsWith('data:') ? `<em>${fn || 'Recorded audio'}</em>` : `<a href="${esc(url)}">${fn}</a>`}</p>`;
      }
      if (mt === 'pdf') {
        return `${hdr}<p style="margin:4pt 0"><strong>PDF:</strong> ${url.startsWith('data:') ? `<em>${fn || 'Attached PDF'}</em>` : `<a href="${esc(url)}">${fn}</a>`}</p>`;
      }
      if (mt === 'docx' || mt === 'pptx') {
        const label = mt === 'pptx' ? 'Presentation' : 'Word Document';
        return `${hdr}<p style="margin:4pt 0"><strong>${label}:</strong> <em>${fn || 'Attached file'}</em></p>`;
      }
      if (mt === 'link' || mt === 'youtube' || mt === 'vimeo' || mt === 'spotify' || mt === 'video') {
        const label = mt === 'youtube' ? 'YouTube' : mt === 'vimeo' ? 'Vimeo' : mt === 'spotify' ? 'Spotify' : mt === 'video' ? 'Video' : 'Link';
        return `${hdr}<p style="margin:4pt 0"><strong>${label}:</strong> <a href="${esc(url)}">${esc(url)}</a></p>`;
      }
      return `${hdr}<p><a href="${esc(url)}">${fn || esc(url)}</a></p>`;
    }
    if (c.type === 'others') {
      if (c.kind === 'todo' && c.todos && c.todos.length) {
        const items = c.todos.map(t =>
          `<li style="${t.done ? 'text-decoration:line-through;color:#888' : ''}">${esc(t.text || '')}</li>`
        ).join('');
        return `${hdr}<ul style="padding-left:20px">${items}</ul>`;
      }
      return `${hdr}<p>${esc(c.input || '').replace(/\n/g, '<br>')}</p>`;
    }
    return `${hdr}<p>${esc(c.input || '')}</p>`;
  }).join('\n');
}

const EXPORT_BASE_CSS = [
  'body{font-family:Calibri,sans-serif;font-size:12pt;line-height:1.6;margin:2cm}',
  'h1{font-size:20pt;color:#1a1a2e;margin-bottom:6pt}',
  'h2{font-size:13pt;color:#1e3a6e;margin-top:16pt;border-bottom:1px solid #ccc;padding-bottom:3pt}',
  'pre,code{font-family:"Courier New",monospace;font-size:10pt;background:#f5f5f5;padding:8pt;display:block;white-space:pre-wrap}',
].join('');

/* ── Word-compatible HTML export ──────────────────────────────────────────── */
function generateWordHTML(cells, title, fontFaceCSS = '') {
  const esc = s => (s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  const body = buildExportBody(cells, 'word');
  return [
    '<html xmlns:o="urn:schemas-microsoft-com:office:office"',
    '      xmlns:w="urn:schemas-microsoft-com:office:word"',
    '      xmlns="http://www.w3.org/TR/REC-html40">',
    '<head><meta charset="UTF-8">',
    `<title>${esc(title)}</title>`,
    '<style>',
    fontFaceCSS,
    EXPORT_BASE_CSS,
    '</style></head><body>',
    `<h1>${esc(title)}</h1>`,
    body,
    '</body></html>',
  ].join('\n');
}

/* ── IfagramCanvas (Art & Design cell) ───────────────────────────────────── */
function IfagramCanvas({ cell, onChange }) {
  const canvasRef   = useRef(null);
  const fileInputRef = useRef(null);
  const drawing    = useRef(false);
  const startPos   = useRef(null);
  const snapshot   = useRef(null);
  const historyRef = useRef([]);
  const redoRef    = useRef([]);

  const [tool,      setTool]      = useState('pen');
  const [color,     setColor]     = useState('#f43f5e');
  const [fillColor, setFillColor] = useState('#1a2535');
  const [bgColor,   setBgColor]   = useState('#020509');
  const [size,      setSize]      = useState(4);
  const [opacity,   setOpacity]   = useState(100);
  const [filled,    setFilled]    = useState(false);
  const [showGrid,  setShowGrid]  = useState(false);
  const [cursorPos, setCursorPos] = useState(null);
  const [textState, setTextState] = useState(null);
  const [textVal,   setTextVal]   = useState('');
  const [fontSize,  setFontSize]  = useState(22);
  const [undoLen,   setUndoLen]   = useState(0);
  const [redoLen,   setRedoLen]   = useState(0);

  const CW = 900, CH = 520;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, CW, CH);
    if (cell.canvasData) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
        historyRef.current = [canvas.toDataURL()];
        setUndoLen(1);
      };
      img.src = cell.canvasData;
    } else {
      historyRef.current = [canvas.toDataURL()];
      setUndoLen(1);
    }
  }, []); // eslint-disable-line

  function pushHistory() {
    const url = canvasRef.current.toDataURL();
    historyRef.current.push(url);
    if (historyRef.current.length > 50) historyRef.current.shift();
    redoRef.current = [];
    setUndoLen(historyRef.current.length);
    setRedoLen(0);
  }

  function restoreURL(url) {
    const canvas = canvasRef.current, ctx = canvas.getContext('2d');
    ctx.globalAlpha = 1;
    ctx.clearRect(0, 0, CW, CH);
    const img = new Image();
    img.onload = () => ctx.drawImage(img, 0, 0);
    img.src = url;
  }

  function undo() {
    if (historyRef.current.length <= 1) return;
    const cur = historyRef.current.pop();
    redoRef.current.push(cur);
    const prev = historyRef.current[historyRef.current.length - 1];
    restoreURL(prev);
    setUndoLen(historyRef.current.length);
    setRedoLen(redoRef.current.length);
    onChange({ canvasData: prev });
  }

  function redo() {
    if (!redoRef.current.length) return;
    const next = redoRef.current.pop();
    historyRef.current.push(next);
    restoreURL(next);
    setUndoLen(historyRef.current.length);
    setRedoLen(redoRef.current.length);
    onChange({ canvasData: next });
  }

  function getPos(e) {
    const r  = canvasRef.current.getBoundingClientRect();
    const sx = CW / r.width, sy = CH / r.height;
    const s  = e.touches ? e.touches[0] : e;
    return {
      x:  Math.round((s.clientX - r.left) * sx),
      y:  Math.round((s.clientY - r.top)  * sy),
      cx: s.clientX - r.left,
      cy: s.clientY - r.top,
    };
  }

  function applyStyle(ctx) {
    ctx.globalAlpha = opacity / 100;
    ctx.strokeStyle = color;
    ctx.fillStyle   = color;
    ctx.lineWidth   = size;
    ctx.lineCap     = 'round';
    ctx.lineJoin    = 'round';
  }

  function hexToRgba(hex) {
    const h = hex.replace('#', '');
    return [
      parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16),
      parseInt(h.slice(4, 6), 16), Math.round((opacity / 100) * 255),
    ];
  }

  function floodFill(px, py) {
    const canvas = canvasRef.current, ctx = canvas.getContext('2d');
    const data = ctx.getImageData(0, 0, CW, CH), d = data.data;
    const i0 = (py * CW + px) * 4;
    const [tr, tg, tb, ta] = [d[i0], d[i0+1], d[i0+2], d[i0+3]];
    const [fr, fg, fb, fa] = hexToRgba(color);
    if (tr===fr && tg===fg && tb===fb && ta===fa) return;
    const vis = new Uint8Array(CW * CH), stk = [px + py * CW];
    while (stk.length) {
      const n = stk.pop(), cx = n % CW, cy = Math.floor(n / CW);
      if (cx<0||cy<0||cx>=CW||cy>=CH||vis[n]) continue;
      const k = n * 4;
      if (d[k]!==tr||d[k+1]!==tg||d[k+2]!==tb||d[k+3]!==ta) continue;
      vis[n]=1; d[k]=fr; d[k+1]=fg; d[k+2]=fb; d[k+3]=fa;
      stk.push(n+1, n-1, n+CW, n-CW);
    }
    ctx.putImageData(data, 0, 0);
    pushHistory();
    onChange({ canvasData: canvas.toDataURL() });
  }

  function pickColor(px, py) {
    const d = canvasRef.current.getContext('2d').getImageData(px, py, 1, 1).data;
    setColor('#' + [d[0],d[1],d[2]].map(v => v.toString(16).padStart(2,'0')).join(''));
    setTool('pen');
  }

  function drawShapePreview(ctx, sp, ep) {
    applyStyle(ctx);
    ctx.beginPath();
    if (tool === 'line') {
      ctx.moveTo(sp.x, sp.y); ctx.lineTo(ep.x, ep.y); ctx.stroke();
    } else if (tool === 'rect') {
      if (filled) { ctx.fillStyle = fillColor; ctx.fillRect(sp.x, sp.y, ep.x-sp.x, ep.y-sp.y); }
      ctx.strokeStyle = color; ctx.strokeRect(sp.x, sp.y, ep.x-sp.x, ep.y-sp.y);
    } else if (tool === 'ellipse') {
      const rx = Math.abs(ep.x-sp.x)/2, ry = Math.abs(ep.y-sp.y)/2;
      ctx.ellipse((sp.x+ep.x)/2, (sp.y+ep.y)/2, rx||1, ry||1, 0, 0, Math.PI*2);
      if (filled) { ctx.fillStyle = fillColor; ctx.fill(); }
      ctx.strokeStyle = color; ctx.stroke();
    } else if (tool === 'triangle') {
      ctx.moveTo((sp.x+ep.x)/2, sp.y); ctx.lineTo(ep.x, ep.y);
      ctx.lineTo(sp.x, ep.y); ctx.closePath();
      if (filled) { ctx.fillStyle = fillColor; ctx.fill(); }
      ctx.strokeStyle = color; ctx.stroke();
    } else if (tool === 'star') {
      const cx=(sp.x+ep.x)/2, cy=(sp.y+ep.y)/2;
      const outerR=Math.max(Math.abs(ep.x-sp.x),Math.abs(ep.y-sp.y))/2, innerR=outerR*0.42;
      for (let i=0;i<10;i++) {
        const a=Math.PI/5*i - Math.PI/2, r=i%2===0?outerR:innerR;
        i===0?ctx.moveTo(cx+r*Math.cos(a),cy+r*Math.sin(a)):ctx.lineTo(cx+r*Math.cos(a),cy+r*Math.sin(a));
      }
      ctx.closePath();
      if (filled) { ctx.fillStyle = fillColor; ctx.fill(); }
      ctx.strokeStyle = color; ctx.stroke();
    } else if (tool === 'arrow') {
      const dx=ep.x-sp.x, dy=ep.y-sp.y, ang=Math.atan2(dy,dx), len=Math.hypot(dx,dy);
      ctx.moveTo(sp.x, sp.y); ctx.lineTo(ep.x, ep.y); ctx.stroke();
      const hw=Math.max(size*2.5,12);
      ctx.beginPath();
      ctx.moveTo(ep.x, ep.y);
      ctx.lineTo(ep.x-hw*Math.cos(ang-0.45), ep.y-hw*Math.sin(ang-0.45));
      ctx.lineTo(ep.x-hw*Math.cos(ang+0.45), ep.y-hw*Math.sin(ang+0.45));
      ctx.closePath(); ctx.fillStyle=color; ctx.fill();
    }
  }

  function onStart(e) {
    e.preventDefault(); e.stopPropagation();
    const p = getPos(e), ctx = canvasRef.current.getContext('2d');
    if (tool === 'text') {
      setTextState({ x: p.x, y: p.y, cx: p.cx, cy: p.cy }); setTextVal(''); return;
    }
    if (tool === 'fill')    { floodFill(p.x, p.y); return; }
    if (tool === 'eyedrop') { pickColor(p.x, p.y); return; }
    drawing.current = true; startPos.current = p;
    if (['line','rect','ellipse','triangle','star','arrow'].includes(tool)) {
      snapshot.current = ctx.getImageData(0, 0, CW, CH);
    } else {
      applyStyle(ctx);
      if (tool === 'brush') ctx.lineWidth = size * 3;
      ctx.beginPath(); ctx.arc(p.x, p.y, (tool==='brush'?size*1.5:size)/2, 0, Math.PI*2); ctx.fill();
    }
  }

  function onMove(e) {
    e.preventDefault();
    const p = getPos(e);
    setCursorPos({ x: p.x, y: p.y });
    if (!drawing.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (tool === 'pen' || tool === 'brush') {
      applyStyle(ctx);
      if (tool === 'brush') ctx.lineWidth = size * 3;
      ctx.beginPath(); ctx.moveTo(startPos.current.x, startPos.current.y); ctx.lineTo(p.x, p.y); ctx.stroke();
      startPos.current = p;
    } else if (tool === 'spray') {
      ctx.globalAlpha = (opacity / 100) * 0.08;
      ctx.fillStyle = color;
      const r = size * 4;
      for (let i = 0; i < 30; i++) {
        const a=Math.random()*Math.PI*2, dist=Math.random()*r;
        ctx.beginPath(); ctx.arc(p.x+dist*Math.cos(a), p.y+dist*Math.sin(a), 1, 0, Math.PI*2); ctx.fill();
      }
    } else if (tool === 'eraser') {
      ctx.globalAlpha = 1; ctx.strokeStyle = bgColor;
      ctx.lineWidth = size * 3; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
      ctx.beginPath(); ctx.moveTo(startPos.current.x, startPos.current.y); ctx.lineTo(p.x, p.y); ctx.stroke();
      startPos.current = p;
    } else if (['line','rect','ellipse','triangle','star','arrow'].includes(tool)) {
      ctx.putImageData(snapshot.current, 0, 0);
      drawShapePreview(canvasRef.current.getContext('2d'), startPos.current, p);
    }
  }

  function onEnd() {
    if (!drawing.current) return;
    drawing.current = false; snapshot.current = null;
    pushHistory();
    onChange({ canvasData: canvasRef.current.toDataURL() });
  }

  function commitText() {
    if (!textState || !textVal.trim()) { setTextState(null); return; }
    const ctx = canvasRef.current.getContext('2d');
    applyStyle(ctx);
    ctx.font = `${fontSize}px sans-serif`;
    ctx.fillText(textVal, textState.x, textState.y + fontSize);
    setTextState(null); setTextVal('');
    pushHistory();
    onChange({ canvasData: canvasRef.current.toDataURL() });
  }

  function clear() {
    const canvas = canvasRef.current, ctx = canvas.getContext('2d');
    ctx.globalAlpha = 1; ctx.fillStyle = bgColor; ctx.fillRect(0, 0, CW, CH);
    pushHistory();
    onChange({ canvasData: canvas.toDataURL() });
  }

  function download() {
    const a = document.createElement('a');
    a.href = canvasRef.current.toDataURL('image/png');
    a.download = 'ifagram.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  // Draw an image (src = data URL or object URL) onto the canvas, scaled to fill
  function pasteImage(src, onDone) {
    const img = new Image();
    img.onload = () => {
      const ctx = canvasRef.current.getContext('2d');
      const scale = Math.min(CW / img.width, CH / img.height);
      const w = Math.round(img.width  * scale);
      const h = Math.round(img.height * scale);
      const x = Math.round((CW - w) / 2);
      const y = Math.round((CH - h) / 2);
      ctx.globalAlpha = 1;
      ctx.drawImage(img, x, y, w, h);
      if (onDone) onDone();
      pushHistory();
      onChange({ canvasData: canvasRef.current.toDataURL() });
    };
    img.src = src;
  }

  // Paste button — reads image from system clipboard via Clipboard API
  async function pasteFromClipboard() {
    try {
      const items = await navigator.clipboard.read();
      for (const item of items) {
        const imageType = item.types.find(t => t.startsWith('image/'));
        if (imageType) {
          const blob = await item.getType(imageType);
          const url  = URL.createObjectURL(blob);
          pasteImage(url, () => URL.revokeObjectURL(url));
          return;
        }
      }
      alert('No image found in clipboard.\nCopy an image first, then click Paste.');
    } catch {
      // Clipboard API denied — guide user to Ctrl+V on the canvas
      alert('Clipboard access was denied.\nClick the canvas area and press Ctrl+V (or Cmd+V) to paste.');
    }
  }

  // Open image from local file
  function openFile(e) {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = ev => pasteImage(ev.target.result);
    reader.readAsDataURL(file);
    e.target.value = '';   // reset so the same file can be re-selected
  }

  // Ctrl+V / Cmd+V directly on the canvas wrapper
  function onCanvasPaste(e) {
    const items = e.clipboardData?.items;
    if (!items) return;
    for (const item of items) {
      if (item.type.startsWith('image/')) {
        const blob = item.getAsFile();
        const url  = URL.createObjectURL(blob);
        pasteImage(url, () => URL.revokeObjectURL(url));
        e.preventDefault();
        return;
      }
    }
  }

  const TOOLS = [
    { id: 'pen',      label: '✏ Pen'      },
    { id: 'brush',    label: '🖌 Brush'   },
    { id: 'spray',    label: '✦ Spray'    },
    { id: 'eraser',   label: '◻ Erase'   },
    { id: 'line',     label: '╱ Line'     },
    { id: 'arrow',    label: '→ Arrow'    },
    { id: 'rect',     label: '▭ Rect'     },
    { id: 'ellipse',  label: '◯ Ellipse'  },
    { id: 'triangle', label: '△ Triangle' },
    { id: 'star',     label: '★ Star'     },
    { id: 'text',     label: 'T Text'     },
    { id: 'fill',     label: '▨ Fill'     },
    { id: 'eyedrop',  label: '◈ Pick'     },
  ];

  const SWATCHES = [
    '#f43f5e','#f97316','#eab308','#84cc16',
    '#22c55e','#14b8d4','#6366f1','#a855f7',
    '#ec4899','#ffffff','#8892aa','#020509',
  ];

  const cursors = { eraser:'cell', eyedrop:'crosshair', text:'text', fill:'copy', spray:'default' };
  const scaleX  = canvasRef.current ? canvasRef.current.getBoundingClientRect().width / CW : 1;

  return (
    <div className="nb-ifagram" onClick={e => e.stopPropagation()}>

      {/* Row 1: Tool buttons */}
      <div className="nb-ifagram__toolbar nb-ifagram__toolbar--tools">
        {TOOLS.map(t => (
          <button key={t.id}
            className={'nb-ifagram-tool' + (tool === t.id ? ' nb-ifagram-tool--active' : '')}
            onClick={e => { e.stopPropagation(); setTool(t.id); }}>{t.label}</button>
        ))}
        <label className="nb-ifagram-opt-label" style={{marginLeft:'auto'}}>
          <input type="checkbox" checked={filled} onChange={e => setFilled(e.target.checked)} /> Filled
        </label>
        <label className="nb-ifagram-opt-label">
          <input type="checkbox" checked={showGrid} onChange={e => setShowGrid(e.target.checked)} /> Grid
        </label>
      </div>

      {/* Row 2: Colour pickers + sliders */}
      <div className="nb-ifagram__toolbar nb-ifagram__toolbar--opts">
        <span className="nb-ifagram-lbl">Stroke</span>
        <input type="color" className="nb-ifagram-color" value={color}
          onChange={e => setColor(e.target.value)} onClick={e => e.stopPropagation()} title="Stroke colour" />
        <span className="nb-ifagram-lbl">Fill</span>
        <input type="color" className="nb-ifagram-color" value={fillColor}
          onChange={e => setFillColor(e.target.value)} onClick={e => e.stopPropagation()} title="Fill colour (shapes)" />
        <span className="nb-ifagram-lbl">BG</span>
        <input type="color" className="nb-ifagram-color" value={bgColor}
          onChange={e => setBgColor(e.target.value)} onClick={e => e.stopPropagation()} title="Background / eraser colour" />
        <span className="nb-ifagram-lbl" style={{marginLeft:6}}>Size</span>
        <input type="range" className="nb-ifagram-size" min={1} max={60} value={size}
          onChange={e => setSize(Number(e.target.value))} onClick={e => e.stopPropagation()} />
        <span className="nb-ifagram-size-label">{size}px</span>
        <span className="nb-ifagram-lbl" style={{marginLeft:6}}>Opacity</span>
        <input type="range" className="nb-ifagram-size" min={5} max={100} value={opacity}
          onChange={e => setOpacity(Number(e.target.value))} onClick={e => e.stopPropagation()} />
        <span className="nb-ifagram-size-label">{opacity}%</span>
        {tool === 'text' && (<>
          <span className="nb-ifagram-lbl" style={{marginLeft:6}}>Font</span>
          <input type="range" className="nb-ifagram-size" min={8} max={80} value={fontSize}
            onChange={e => setFontSize(Number(e.target.value))} onClick={e => e.stopPropagation()} />
          <span className="nb-ifagram-size-label">{fontSize}px</span>
        </>)}
      </div>

      {/* Row 3: Swatches + undo/redo/download/clear */}
      <div className="nb-ifagram__toolbar nb-ifagram__toolbar--actions">
        {SWATCHES.map(sw => (
          <button key={sw} className="nb-ifagram-swatch"
            style={{ background: sw, outline: color === sw ? '2px solid rgba(255,255,255,0.85)' : 'none', outlineOffset: '2px' }}
            onClick={e => { e.stopPropagation(); setColor(sw); }} title={sw} />
        ))}
        <div style={{marginLeft:'auto', display:'flex', gap:5, alignItems:'center'}}>
          <button className="nb-ifagram-tool nb-ifagram-tool--paste"
            onClick={e => { e.stopPropagation(); pasteFromClipboard(); }}
            title="Paste image from clipboard (or press Ctrl+V on the canvas)">📋 Paste</button>
          <button className="nb-ifagram-tool nb-ifagram-tool--paste"
            onClick={e => { e.stopPropagation(); fileInputRef.current.click(); }}
            title="Open image from file">📂 Open</button>
          <button className="nb-ifagram-tool" onClick={e => { e.stopPropagation(); undo(); }}
            disabled={undoLen <= 1} title="Undo">↩ Undo</button>
          <button className="nb-ifagram-tool" onClick={e => { e.stopPropagation(); redo(); }}
            disabled={redoLen === 0} title="Redo">↪ Redo</button>
          <button className="nb-ifagram-tool" onClick={e => { e.stopPropagation(); download(); }}
            title="Download as PNG">⬇ Save</button>
          <button className="nb-ifagram-clear" onClick={e => { e.stopPropagation(); clear(); }}>Clear</button>
        </div>
        {/* Hidden file input for Open */}
        <input ref={fileInputRef} type="file" accept="image/*"
          style={{ display: 'none' }} onChange={openFile} />
      </div>

      {/* Canvas */}
      <div className="nb-ifagram__canvas-wrap" tabIndex={0} onPaste={onCanvasPaste}
        style={{ outline: 'none' }}>
        <canvas ref={canvasRef} className="nb-ifagram__canvas" width={CW} height={CH}
          onMouseDown={onStart} onMouseMove={onMove}
          onMouseUp={onEnd} onMouseLeave={e => { if (drawing.current) onEnd(); setCursorPos(null); }}
          onTouchStart={onStart} onTouchMove={onMove} onTouchEnd={onEnd}
          style={{ cursor: cursors[tool] || 'crosshair' }} />
        {showGrid && <div className="nb-ifagram__grid-overlay" />}
        {textState && (
          <div className="nb-ifagram__text-overlay" style={{ left: textState.cx, top: textState.cy }}>
            <input autoFocus className="nb-ifagram__text-input"
              value={textVal} onChange={e => setTextVal(e.target.value)}
              style={{ fontSize: Math.max(10, fontSize * scaleX) + 'px', color }}
              onKeyDown={e => { if (e.key==='Enter'){e.preventDefault();commitText();} if(e.key==='Escape')setTextState(null); }}
              onBlur={commitText} placeholder="Type, then Enter…" />
          </div>
        )}
      </div>

      {/* Status bar */}
      <div className="nb-ifagram__status">
        <span>{CW} × {CH} px</span>
        {cursorPos && <span>x {cursorPos.x}  y {cursorPos.y}</span>}
        <span style={{marginLeft:'auto'}}>
          {TOOLS.find(t => t.id === tool)?.label} · {size}px · {opacity}%
          {filled && ['rect','ellipse','triangle','star'].includes(tool) ? ' · filled' : ''}
        </span>
      </div>
    </div>
  );
}

/* ── Mammoth (DOCX renderer) ──────────────────────────────────────────────── */
let _mammoth = null, _mammothPromise = null;
function loadMammothOnce() {
  if (_mammoth) return Promise.resolve(_mammoth);
  if (_mammothPromise) return _mammothPromise;
  _mammothPromise = new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/mammoth@1.6.0/mammoth.browser.min.js';
    s.onload  = () => { _mammoth = window.mammoth; resolve(window.mammoth); };
    s.onerror = () => reject(new Error('Failed to load mammoth.js'));
    document.head.appendChild(s);
  });
  return _mammothPromise;
}

function dataUrlToArrayBuffer(dataUrl) {
  const base64 = dataUrl.substring(dataUrl.indexOf(',') + 1);
  const binary = atob(base64);
  const buf = new ArrayBuffer(binary.length);
  const view = new Uint8Array(buf);
  for (let i = 0; i < binary.length; i++) view[i] = binary.charCodeAt(i);
  return buf;
}

function DocxViewer({ url, compact }) {
  const [html, setHtml]   = React.useState(null);
  const [err,  setErr]    = React.useState(null);
  useEffect(() => {
    if (!url) return;
    setHtml(null); setErr(null);
    loadMammothOnce()
      .then(() => {
        const buf = dataUrlToArrayBuffer(url);
        return window.mammoth.convertToHtml({ arrayBuffer: buf });
      })
      .then(res => setHtml(res.value))
      .catch(e  => setErr('Could not render document: ' + e.message));
  }, [url]);
  if (err)   return <div className="nb-doc-err">{err}</div>;
  if (!html) return <div className="nb-doc-loading">⟳ Loading document…</div>;
  return <div className={'nb-docx-body' + (compact ? ' nb-docx-body--compact' : '')}
    dangerouslySetInnerHTML={{ __html: html }} />;
}

function DocCard({ fileName, url, mediaType, dark }) {
  const isPptx = mediaType === 'pptx';
  function download() {
    const a = document.createElement('a');
    a.href = url; a.download = fileName || ('document.' + mediaType); a.click();
  }
  return (
    <div className={'nb-doc-card' + (dark ? ' nb-doc-card--dark' : '')}>
      <span className="nb-doc-card__icon">{isPptx ? '📊' : '📄'}</span>
      <div className="nb-doc-card__info">
        <span className="nb-doc-card__name">{fileName || (isPptx ? 'Presentation' : 'Document')}</span>
        <span className="nb-doc-card__type">{isPptx ? 'PowerPoint Presentation' : 'Word Document'}</span>
        {isPptx && <span className="nb-doc-card__note">Open in PowerPoint or Google Slides to view slides</span>}
      </div>
      <button className="nb-doc-card__dl" onClick={e => { e.stopPropagation(); download(); }}>⬇ Download</button>
    </div>
  );
}

/* ── PdfViewer — converts data: URL to blob: URL so iframes can render it ── */
function PdfViewer({ url, className, title }) {
  const [displayUrl, setDisplayUrl] = React.useState(null);
  useEffect(() => {
    if (!url) { setDisplayUrl(null); return; }
    if (!url.startsWith('data:')) { setDisplayUrl(url); return; }
    try {
      const base64 = url.substring(url.indexOf(',') + 1);
      const binary = atob(base64);
      const bytes  = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
      const blob   = new Blob([bytes], { type: 'application/pdf' });
      const objUrl = URL.createObjectURL(blob);
      setDisplayUrl(objUrl);
      return () => URL.revokeObjectURL(objUrl);
    } catch(e) { setDisplayUrl(url); }
  }, [url]);
  if (!displayUrl) return <div className="nb-doc-loading">⟳ Loading PDF…</div>;
  return <iframe src={displayUrl} className={className || 'nb-media__pdf'} title={title || 'PDF'} />;
}

/* ── LinkReader — inline article/PDF/any-URL readable viewer ─────────────── */
function LinkReader({ url, initEmbed, onToggleEmbed }) {
  const [embed, setEmbed] = React.useState(!!initEmbed);
  let domain = url;
  try { domain = new URL(url).hostname.replace(/^www\./, ''); } catch(e) {}
  const favicon = 'https://www.google.com/s2/favicons?domain=' + encodeURIComponent(domain) + '&sz=32';
  const displayUrl = url.length > 72 ? url.slice(0, 69) + '\u2026' : url;
  function toggle(e) {
    e.stopPropagation();
    const next = !embed;
    setEmbed(next);
    if (onToggleEmbed) onToggleEmbed(next);
  }
  return (
    <div className="nb-link-reader">
      <div className="nb-link-reader__card">
        <img className="nb-link-reader__favicon" src={favicon} alt=""
          onError={e => { e.target.style.display = 'none'; }} />
        <div className="nb-link-reader__meta">
          <span className="nb-link-reader__domain">{domain}</span>
          <span className="nb-link-reader__url" title={url}>{displayUrl}</span>
        </div>
        <div className="nb-link-reader__actions">
          <button
            className={'nb-link-reader__btn' + (embed ? ' nb-link-reader__btn--close' : ' nb-link-reader__btn--embed')}
            onClick={toggle}>
            {embed ? '\u229f Close' : '\u229e Read Inline'}
          </button>
          <a className="nb-link-reader__btn nb-link-reader__btn--open"
            href={url} target="_blank" rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}>Open \u2197</a>
        </div>
      </div>
      {embed && (
        <div className="nb-link-reader__frame-wrap">
          <iframe
            src={url}
            className="nb-link-reader__iframe"
            title="Inline Reader"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-top-navigation-by-user-activation"
          />
          <p className="nb-link-reader__note">
            If this page appears blank, the site blocks inline embedding \u2014{' '}
            <a href={url} target="_blank" rel="noopener noreferrer">open in new tab \u2197</a>
          </p>
        </div>
      )}
    </div>
  );
}

/* ── MultimediaCell ───────────────────────────────────────────────────────── */
function detectMediaType(url) {
  const u = (url || '').trim().toLowerCase();
  if (!u) return null;
  if (/\.(jpe?g|png|gif|webp|svg|avif|bmp)(\?|#|$)/.test(u))  return 'image';
  if (/\.(mp4|webm|ogv|mov)(\?|#|$)/.test(u))                  return 'video';
  if (/\.(mp3|wav|ogg|flac|aac|m4a)(\?|#|$)/.test(u))         return 'audio';
  if (/\.(pdf)(\?|#|$)/.test(u))                                return 'pdf';
  if (/(?:youtube\.com\/watch|youtu\.be\/)/.test(u))            return 'youtube';
  if (/vimeo\.com\/\d+/.test(u))                                return 'vimeo';
  if (/open\.spotify\.com\//.test(u))                           return 'spotify';
  return 'link';
}

function youtubeId(url) {
  const m = (url || '').match(/(?:v=|youtu\.be\/)([A-Za-z0-9_-]{11})/);
  return m ? m[1] : null;
}

function vimeoId(url) {
  const m = (url || '').match(/vimeo\.com\/(\d+)/);
  return m ? m[1] : null;
}

function spotifyEmbedUrl(url) {
  /* https://open.spotify.com/track/ID → https://open.spotify.com/embed/track/ID */
  return url.replace(/open\.spotify\.com\/(?!embed\/)/, 'open.spotify.com/embed/');
}

const MEDIA_TOOLS = [
  { id: 'url',    label: '🔗 URL' },
  { id: 'file',   label: '📁 File' },
  { id: 'camera', label: '📷 Camera' },
  { id: 'record', label: '🎙 Record' },
];

function MultimediaCell({ cell, onChange }) {
  const tool = cell.mediaTool || 'url';

  /* ── Camera state ───────────────────────────── */
  const videoRef     = useRef(null);
  const camStreamRef = useRef(null);
  const snapCanvasRef = useRef(null);
  const [camActive, setCamActive]   = useState(false);
  const [camError,  setCamError]    = useState(null);
  const [facingMode, setFacingMode] = useState('environment');

  /* ── Recorder state ─────────────────────────── */
  const recorderRef  = useRef(null);
  const chunksRef    = useRef([]);
  const timerRef     = useRef(null);
  const [recording,  setRecording]  = useState(false);
  const [recTime,    setRecTime]    = useState(0);
  const [recError,   setRecError]   = useState(null);

  /* cleanup on unmount */
  useEffect(() => {
    return () => { _stopCamera(); _stopRecorder(); };
  }, []);

  /* stop camera / recorder when leaving their tab */
  useEffect(() => {
    if (tool !== 'camera') _stopCamera();
    if (tool !== 'record') _stopRecorder();
  }, [tool]);

  function _stopCamera() {
    if (camStreamRef.current) {
      camStreamRef.current.getTracks().forEach(t => t.stop());
      camStreamRef.current = null;
    }
    setCamActive(false);
    setCamError(null);
  }

  function _stopRecorder() {
    if (recorderRef.current && recorderRef.current.state !== 'inactive') {
      recorderRef.current.stop();
    }
    clearInterval(timerRef.current);
    setRecording(false);
    setRecTime(0);
    setRecError(null);
  }

  async function startCamera(facing) {
    const mode = facing || facingMode;
    setCamError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: mode } });
      camStreamRef.current = stream;
      if (videoRef.current) { videoRef.current.srcObject = stream; }
      setCamActive(true);
    } catch(_) {
      setCamError('Camera access denied or not available in this browser.');
    }
  }

  async function flipCamera() {
    const next = facingMode === 'environment' ? 'user' : 'environment';
    setFacingMode(next);
    if (camActive) {
      if (camStreamRef.current) camStreamRef.current.getTracks().forEach(t => t.stop());
      camStreamRef.current = null;
      await startCamera(next);
    }
  }

  function capturePhoto() {
    if (!videoRef.current || !camActive) return;
    const v = videoRef.current;
    const c = snapCanvasRef.current;
    c.width  = v.videoWidth;
    c.height = v.videoHeight;
    c.getContext('2d').drawImage(v, 0, 0);
    const dataUrl = c.toDataURL('image/png');
    _stopCamera();
    onChange({ output: { ok: true, mediaType: 'image', url: dataUrl } });
  }

  async function startRecording() {
    setRecError(null);
    chunksRef.current = [];
    setRecTime(0);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      recorderRef.current = recorder;
      recorder.ondataavailable = e => { if (e.data.size > 0) chunksRef.current.push(e.data); };
      recorder.onstop = () => {
        stream.getTracks().forEach(t => t.stop());
        clearInterval(timerRef.current);
        setRecording(false);
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.onload = e => onChange({ output: { ok: true, mediaType: 'audio', url: e.target.result } });
        reader.readAsDataURL(blob);
      };
      recorder.start();
      setRecording(true);
      timerRef.current = setInterval(() => setRecTime(t => t + 1), 1000);
    } catch(_) {
      setRecError('Microphone access denied or not available in this browser.');
    }
  }

  function handleFile(file) {
    if (!file) return;
    let mediaType = 'link';
    if      (file.type.startsWith('image/'))       mediaType = 'image';
    else if (file.type.startsWith('video/'))        mediaType = 'video';
    else if (file.type.startsWith('audio/'))        mediaType = 'audio';
    else if (file.type === 'application/pdf')       mediaType = 'pdf';
    else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
             file.type === 'application/msword')    mediaType = 'docx';
    else if (file.type === 'application/vnd.openxmlformats-officedocument.presentationml.presentation' ||
             file.type === 'application/vnd.ms-powerpoint') mediaType = 'pptx';
    const reader = new FileReader();
    reader.onload = e => onChange({ output: { ok: true, mediaType, url: e.target.result, fileName: file.name } });
    reader.readAsDataURL(file);
  }

  function fmtTime(s) {
    return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
  }

  function embed() {
    const url = (cell.input || '').trim();
    if (!url) return;
    onChange({ output: { ok: true, mediaType: detectMediaType(url), url } });
  }

  const mt = cell.output ? cell.output.mediaType : null;

  return (
    <div className="nb-media">

      {/* ── Tool tabs ─────────────────────────────────────────────── */}
      <div className="nb-media__tabs">
        {MEDIA_TOOLS.map(t => (
          <button key={t.id}
            className={'nb-media__tab' + (tool === t.id ? ' nb-media__tab--active' : '')}
            onClick={e => { e.stopPropagation(); onChange({ mediaTool: t.id, output: null }); }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* ── URL mode ──────────────────────────────────────────────── */}
      {tool === 'url' && (
        <div className="nb-media__url-row">
          <input className="nb-media__url-input" type="url"
            placeholder="Paste a URL — image, video, audio, YouTube, Vimeo, Spotify, PDF…"
            value={cell.input || ''}
            onChange={e => onChange({ input: e.target.value, output: null })}
            onKeyDown={e => { if (e.key === 'Enter') embed(); e.stopPropagation(); }}
            onClick={e => e.stopPropagation()} />
          <button className="nb-media__embed-btn" onClick={e => { e.stopPropagation(); embed(); }}>Embed ▶</button>
        </div>
      )}

      {/* ── File mode ─────────────────────────────────────────────── */}
      {tool === 'file' && (
        <div className="nb-media__dropzone"
          onDragOver={e => { e.preventDefault(); e.stopPropagation(); }}
          onDrop={e => { e.preventDefault(); e.stopPropagation(); handleFile(e.dataTransfer.files[0]); }}
          onClick={e => { e.stopPropagation(); document.getElementById('nb-file-' + cell.id)?.click(); }}>
          <span className="nb-media__drop-icon">📁</span>
          <span className="nb-media__drop-text">Click or drag & drop a file</span>
          <span className="nb-media__drop-sub">Image · Video · Audio · PDF · Word · PPT</span>
          <input id={'nb-file-' + cell.id} type="file"
            accept="image/*,video/*,audio/*,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/vnd.ms-powerpoint"
            style={{ display: 'none' }}
            onChange={e => { handleFile(e.target.files[0]); e.target.value = ''; }}
            onClick={e => e.stopPropagation()} />
        </div>
      )}

      {/* ── Camera mode ───────────────────────────────────────────── */}
      {tool === 'camera' && (
        <div className="nb-media__camera">
          {camError && <p className="nb-media__error">{camError}</p>}
          <div className="nb-media__cam-view">
            <video ref={videoRef} autoPlay playsInline muted
              style={{ display: camActive ? 'block' : 'none', width: '100%', borderRadius: '6px' }} />
            {!camActive && !camError && (
              <div className="nb-media__cam-placeholder">
                <span style={{ fontSize: '2rem' }}>📷</span>
                <span>Camera is off</span>
              </div>
            )}
          </div>
          <canvas ref={snapCanvasRef} style={{ display: 'none' }} />
          <div className="nb-media__cam-controls">
            {!camActive
              ? <button className="nb-media__action-btn" onClick={e => { e.stopPropagation(); startCamera(); }}>Start Camera</button>
              : <>
                  <button className="nb-media__action-btn nb-media__action-btn--green"
                    onClick={e => { e.stopPropagation(); capturePhoto(); }}>📸 Capture</button>
                  <button className="nb-media__action-btn nb-media__action-btn--flip"
                    title={facingMode === 'environment' ? 'Switch to front camera' : 'Switch to back camera'}
                    onClick={e => { e.stopPropagation(); flipCamera(); }}>🔄 Flip</button>
                  <button className="nb-media__action-btn nb-media__action-btn--red"
                    onClick={e => { e.stopPropagation(); _stopCamera(); }}>Stop</button>
                </>
            }
          </div>
        </div>
      )}

      {/* ── Record mode ───────────────────────────────────────────── */}
      {tool === 'record' && (
        <div className="nb-media__recorder">
          {recError && <p className="nb-media__error">{recError}</p>}
          <div className="nb-media__rec-display">
            <span className={'nb-media__rec-dot' + (recording ? ' nb-media__rec-dot--on' : '')} />
            <span className="nb-media__rec-time">{fmtTime(recTime)}</span>
            <span className="nb-media__rec-label">{recording ? 'Recording…' : 'Ready'}</span>
          </div>
          <div className="nb-media__cam-controls">
            {!recording
              ? <button className="nb-media__action-btn"
                  onClick={e => { e.stopPropagation(); startRecording(); }}>🎙 Start Recording</button>
              : <button className="nb-media__action-btn nb-media__action-btn--red"
                  onClick={e => { e.stopPropagation(); recorderRef.current && recorderRef.current.stop(); }}>⏹ Stop</button>
            }
          </div>
        </div>
      )}

      {/* ── Preview (shared across all modes) ─────────────────────── */}
      {cell.output && cell.output.url && (
        <div className="nb-media__preview">
          {mt === 'image'   && <img src={cell.output.url} alt={cell.output.fileName || 'media'} loading="lazy" />}
          {mt === 'video'   && <video src={cell.output.url} controls />}
          {mt === 'audio'   && <audio src={cell.output.url} controls style={{ width: '100%' }} />}
          {mt === 'pdf'  && <PdfViewer url={cell.output.url} title={cell.output.fileName || 'PDF'} className="nb-media__pdf" />}
          {mt === 'docx' && <DocxViewer url={cell.output.url} />}
          {mt === 'pptx' && <DocCard fileName={cell.output.fileName} url={cell.output.url} mediaType="pptx" />}
          {mt === 'youtube' && (
            <iframe src={`https://www.youtube.com/embed/${youtubeId(cell.output.url)}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen title="YouTube video" />
          )}
          {mt === 'vimeo' && (
            <iframe src={`https://player.vimeo.com/video/${vimeoId(cell.output.url)}`}
              allow="autoplay; fullscreen; picture-in-picture" allowFullScreen title="Vimeo video" />
          )}
          {mt === 'spotify' && (
            <iframe src={spotifyEmbedUrl(cell.output.url)}
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy" title="Spotify" className="nb-media__spotify" />
          )}
          {mt === 'link' && (
            <LinkReader
              url={cell.output.url}
              initEmbed={!!cell.linkEmbed}
              onToggleEmbed={v => onChange({ linkEmbed: v })}
            />
          )}
          {cell.output.fileName && (
            <p className="nb-media__file-name">{cell.output.fileName}</p>
          )}
        </div>
      )}
    </div>
  );
}

/* ── OthersCell ───────────────────────────────────────────────────────────── */
function OthersCell({ cell, onChange }) {
  const kind = cell.kind || 'note';
  return (
    <div className="nb-others">
      <select className="nb-others-kind-select" value={kind}
        onChange={e => { e.stopPropagation(); onChange({ kind: e.target.value }); }}
        onClick={e => e.stopPropagation()} aria-label="Entry type">
        <option value="note">📝 Note</option>
        <option value="bookmark">🔖 Bookmark</option>
        <option value="quote">💬 Quote</option>
        <option value="todo">☑ To-Do List</option>
      </select>

      {kind === 'todo' && (
        <div className="nb-others__todo">
          {(cell.todos || []).map((item, i) => (
            <div key={i} className="nb-others__todo-item">
              <input type="checkbox" className="nb-others__todo-check"
                checked={!!item.done}
                onChange={e => {
                  e.stopPropagation();
                  const todos = [...(cell.todos || [])];
                  todos[i] = { ...todos[i], done: e.target.checked };
                  onChange({ todos });
                }}
                onClick={e => e.stopPropagation()} />
              <input className={`nb-others__todo-text${item.done ? ' nb-others__todo-text--done' : ''}`}
                value={item.text || ''}
                onChange={e => {
                  const todos = [...(cell.todos || [])];
                  todos[i] = { ...todos[i], text: e.target.value };
                  onChange({ todos });
                }}
                onClick={e => e.stopPropagation()}
                placeholder="Task…" />
              <button className="nb-others__todo-del"
                onClick={e => {
                  e.stopPropagation();
                  onChange({ todos: (cell.todos || []).filter((_, j) => j !== i) });
                }}
                title="Remove task">×</button>
            </div>
          ))}
          <button className="nb-others__todo-add"
            onClick={e => {
              e.stopPropagation();
              onChange({ todos: [...(cell.todos || []), { text: '', done: false }] });
            }}>＋ Add task</button>
        </div>
      )}

      {kind === 'note' && (
        <textarea className="nb-others__textarea"
          placeholder="General notes, ideas, links, or anything that doesn't fit elsewhere…"
          value={cell.input || ''}
          onChange={e => onChange({ input: e.target.value })}
          onClick={e => e.stopPropagation()}
          rows={Math.max(2, ((cell.input || '').match(/\n/g)||[]).length + 2)} />
      )}

      {kind === 'bookmark' && (
        <>
          <input className="nb-others__text-input" placeholder="Title…"
            value={cell.bookmarkTitle || ''}
            onChange={e => onChange({ bookmarkTitle: e.target.value })}
            onClick={e => e.stopPropagation()} />
          <input className="nb-others__text-input" type="url" placeholder="URL…"
            value={cell.bookmarkUrl || ''}
            onChange={e => onChange({ bookmarkUrl: e.target.value })}
            onClick={e => e.stopPropagation()} />
          <textarea className="nb-others__textarea" placeholder="Description (optional)…"
            value={cell.input || ''}
            onChange={e => onChange({ input: e.target.value })}
            onClick={e => e.stopPropagation()} rows={2} />
          {(cell.bookmarkTitle || cell.bookmarkUrl) && (
            <div className="nb-others__bookmark">
              {cell.bookmarkTitle && <div className="nb-others__bookmark-title">{cell.bookmarkTitle}</div>}
              {cell.bookmarkUrl   && (
                <div className="nb-others__bookmark-url">
                  <a href={cell.bookmarkUrl} target="_blank" rel="noopener noreferrer">{cell.bookmarkUrl}</a>
                </div>
              )}
              {cell.input && <div className="nb-others__bookmark-desc">{cell.input}</div>}
            </div>
          )}
        </>
      )}

      {kind === 'quote' && (
        <>
          <textarea className="nb-others__textarea" placeholder="Enter quote…"
            value={cell.input || ''}
            onChange={e => onChange({ input: e.target.value })}
            onClick={e => e.stopPropagation()}
            rows={Math.max(2, ((cell.input || '').match(/\n/g)||[]).length + 2)} />
          {cell.input && <blockquote className="nb-others__quote">{cell.input}</blockquote>}
        </>
      )}
    </div>
  );
}

/* ── OduMarkFigure ────────────────────────────────────────────────────────── */
function OduMarkFigure({ marks, label, color, onChange }) {
  const odu = codeToOdu(marks);
  return (
    <div className="nb-odu-figure">
      <div className="nb-odu-fig-label" style={{ color }}>{label}</div>
      <div className="nb-odu-marks">
        {marks.map((m, i) => (
          <button
            key={i}
            className={'nb-mark-btn' + (m === 1 ? ' nb-mark-btn--single' : ' nb-mark-btn--double')}
            onClick={e => {
              e.stopPropagation();
              const next = [...marks];
              next[i] = next[i] === 1 ? 0 : 1;
              onChange(next);
            }}
            title={m === 1 ? 'Single mark | — click to toggle' : 'Double mark || — click to toggle'}
          >
            <span className="nb-mark-bar" />
            {m === 0 && <span className="nb-mark-bar" />}
          </button>
        ))}
      </div>
      {odu && (
        <div className="nb-odu-fig-name" style={{ color: odu.color }}>{odu.name}</div>
      )}
    </div>
  );
}

/* ── TextFormatToolbar ────────────────────────────────────────────────────── */
function TextFormatToolbar({ textareaRef, value, onUpdate }) {
  function applyLinePrefix(prefix) {
    const el = textareaRef.current;
    const text = value || '';
    const pos  = el ? el.selectionStart : text.length;
    const lineStart = text.lastIndexOf('\n', pos - 1) + 1;
    const headingMatch = text.slice(lineStart).match(/^(#{1,4} )/);
    let newText, cursorDelta;
    if (headingMatch && headingMatch[1] === prefix) {
      newText     = text.slice(0, lineStart) + text.slice(lineStart + headingMatch[1].length);
      cursorDelta = -headingMatch[1].length;
    } else if (headingMatch) {
      newText     = text.slice(0, lineStart) + prefix + text.slice(lineStart + headingMatch[1].length);
      cursorDelta = prefix.length - headingMatch[1].length;
    } else {
      newText     = text.slice(0, lineStart) + prefix + text.slice(lineStart);
      cursorDelta = prefix.length;
    }
    onUpdate(newText);
    if (el) setTimeout(() => { el.selectionStart = el.selectionEnd = pos + cursorDelta; el.focus(); }, 0);
  }

  function applyWrap(before, after) {
    const el    = textareaRef.current;
    const text  = value || '';
    const start = el ? el.selectionStart : text.length;
    const end   = el ? el.selectionEnd   : text.length;
    const sel   = text.slice(start, end);
    if (sel.startsWith(before) && sel.endsWith(after) && sel.length > before.length + after.length) {
      const inner = sel.slice(before.length, sel.length - after.length);
      onUpdate(text.slice(0, start) + inner + text.slice(end));
      if (el) setTimeout(() => { el.selectionStart = start; el.selectionEnd = start + inner.length; el.focus(); }, 0);
    } else if (sel) {
      onUpdate(text.slice(0, start) + before + sel + after + text.slice(end));
      if (el) setTimeout(() => { el.selectionStart = start + before.length; el.selectionEnd = end + before.length; el.focus(); }, 0);
    } else {
      onUpdate(text.slice(0, start) + before + after + text.slice(end));
      if (el) setTimeout(() => { el.selectionStart = el.selectionEnd = start + before.length; el.focus(); }, 0);
    }
  }

  function applyCase(fn) {
    const el    = textareaRef.current;
    const text  = value || '';
    const start = el ? el.selectionStart : 0;
    const end   = el ? el.selectionEnd   : text.length;
    if (start !== end) {
      const t = fn(text.slice(start, end));
      onUpdate(text.slice(0, start) + t + text.slice(end));
      if (el) setTimeout(() => { el.selectionStart = start; el.selectionEnd = start + t.length; el.focus(); }, 0);
    } else {
      onUpdate(fn(text));
    }
  }

  function sentenceCase(s) {
    return s.toLowerCase().replace(/(^\s*\w|[.!?]\s+\w)/g, c => c.toUpperCase());
  }

  const headings = [['# ','H1'],['## ','H2'],['### ','H3'],['#### ','H4']];
  return (
    <div className="nb-text-toolbar" onClick={e => e.stopPropagation()}>
      {headings.map(([p, label]) => (
        <button key={p} className="nb-text-tb-btn" onClick={() => applyLinePrefix(p)} title={`Heading ${label.slice(1)}`}>{label}</button>
      ))}
      <span className="nb-text-tb-sep" />
      <button className="nb-text-tb-btn nb-text-tb-btn--bold"   onClick={() => applyWrap('**','**')} title="Bold"><strong>B</strong></button>
      <button className="nb-text-tb-btn nb-text-tb-btn--italic" onClick={() => applyWrap('*','*')}   title="Italic"><em>I</em></button>
      <span className="nb-text-tb-sep" />
      <button className="nb-text-tb-btn" onClick={() => applyCase(s => s.toUpperCase())} title="UPPERCASE">AA</button>
      <button className="nb-text-tb-btn" onClick={() => applyCase(s => s.toLowerCase())} title="lowercase">aa</button>
      <button className="nb-text-tb-btn" onClick={() => applyCase(sentenceCase)}          title="Sentence case">Aa</button>
    </div>
  );
}

/* ── OduMarkInput ─────────────────────────────────────────────────────────── */
function OduMarkInput({ right, left, onChangeRight, onChangeLeft, oduTopic, onChangeTopic, oduName, onChangeName }) {
  const rightOdu = codeToOdu(right);
  const leftOdu  = codeToOdu(left);
  const autoName = rightOdu && leftOdu ? `${rightOdu.name} ${leftOdu.name}` : '';
  return (
    <div className="nb-odu-input" style={{ alignItems: 'stretch' }}>
      <div className="nb-odu-figures" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', width: '100%', justifyContent: 'center', gap: '8px' }}>
        <OduMarkFigure marks={left}  label="Òsì (Left)"   color="#3b9eff" onChange={onChangeLeft}  />
        <div className="nb-odu-sep">·</div>
        <OduMarkFigure marks={right} label="Ọtún (Right)" color="#f0920c" onChange={onChangeRight} />
      </div>
      {rightOdu && leftOdu && (
        <div className="nb-odu-result">
          <input
            className="nb-odu-name-input"
            value={oduName || ''}
            onChange={e => { e.stopPropagation(); onChangeName(e.target.value); }}
            onClick={e => e.stopPropagation()}
            placeholder={autoName}
            style={{ color: oduName ? '#f0f5ff' : undefined }}
          />
          <span className="nb-odu-result__badge">#{rightOdu.num}–{leftOdu.num}</span>
          {rightOdu.num === leftOdu.num && (
            <span className="nb-odu-result__meji">Méjì ✦</span>
          )}
          <input
            className="nb-odu-topic"
            value={oduTopic || ''}
            onChange={e => { e.stopPropagation(); onChangeTopic(e.target.value); }}
            onClick={e => e.stopPropagation()}
            placeholder={rightOdu.domain}
          />
        </div>
      )}
    </div>
  );
}

/* ── Matrix center-label word-wrap helper ────────────────────────────────── */
function matrixCenterLines(label) {
  const words = label.split(' ');
  if (words.length === 1 || label.length <= 8) return [label];
  const mid = Math.ceil(words.length / 2);
  return [words.slice(0, mid).join(' '), words.slice(mid).join(' ')];
}

/* ── OduSteamsexMatrix — STEAMSEX 8-dim radial diagram ──────────────────── */
function OduSteamsexMatrix({ topic }) {
  const label = topic.trim() || 'IFA';
  const lines = matrixCenterLines(label);
  const cx = 150, cy = 150, orbit = 105, cR = 30, dR = 20;
  const fs   = label.length > 12 ? 6 : label.length > 7 ? 8.5 : 11;
  const nodes = NB_STEAMSEX.map((d, i) => {
    const a = (i / 8) * 2 * Math.PI - Math.PI / 2;
    return { ...d, x: cx + orbit * Math.cos(a), y: cy + orbit * Math.sin(a), a };
  });
  return (
    <div className="nb-odu-matrix">
      <div className="nb-odu-matrix__label">STEAMSEX Matrix</div>
      <svg viewBox="0 0 300 300" className="nb-matrix-svg">
        {/* Orbit ring */}
        <circle cx={cx} cy={cy} r={orbit} fill="none" stroke="rgba(255,255,255,0.05)"
          strokeWidth="1" strokeDasharray="3 6" />
        {/* Spokes */}
        {nodes.map((d, i) => {
          const sx = cx + (cR + 4) * Math.cos(d.a), sy = cy + (cR + 4) * Math.sin(d.a);
          const ex = cx + (orbit - dR - 3) * Math.cos(d.a), ey = cy + (orbit - dR - 3) * Math.sin(d.a);
          return <line key={i} x1={sx} y1={sy} x2={ex} y2={ey}
            stroke={d.color} strokeWidth="1.2" opacity="0.55" />;
        })}
        {/* Dim nodes */}
        {nodes.map((d, i) => (
          <g key={i}>
            <circle cx={d.x} cy={d.y} r={dR} fill="#070e1c" stroke={d.color} strokeWidth="1.5" />
            <text x={d.x} y={d.y - 2} textAnchor="middle" fill={d.color}
              fontSize="12" fontWeight="800" fontFamily="monospace">{d.letter}</text>
            <text x={d.x} y={d.y + 10} textAnchor="middle" fill={d.color}
              fontSize="5.5" opacity="0.8">{d.short}</text>
          </g>
        ))}
        {/* Center node */}
        <circle cx={cx} cy={cy} r={cR} fill="#070e1c" stroke="#f0920c" strokeWidth="2" />
        {lines.map((l, i) => (
          <text key={i} x={cx}
            y={cy + (lines.length === 1 ? 4 : i === 0 ? -1 : fs * 1.35 + 3)}
            textAnchor="middle" fill="#f0920c"
            fontSize={fs} fontWeight="900" fontFamily="monospace">{l}</text>
        ))}
        {/* Ring label */}
        <text x={cx} y={290} textAnchor="middle" fill="rgba(255,255,255,0.13)"
          fontSize="5.5" letterSpacing="2" fontFamily="monospace">S·T·E·A·M·S·E·X</text>
      </svg>
    </div>
  );
}

/* ── OduSidechrxMatrix — SIDECHRX 8-principle radial diagram ────────────── */
function OduSidechrxMatrix({ topic, rightOdu }) {
  const label = topic.trim() || 'IFA';
  const lines = matrixCenterLines(label);
  const cx = 150, cy = 150, orbit = 105, cR = 30, dR = 20;
  const fs   = label.length > 12 ? 6 : label.length > 7 ? 8.5 : 11;
  // Map right Odu number → SIDECHRX index (1-8 → 0-7 primary; 9-16 → 0-7 anti)
  const activeIdx = rightOdu ? (rightOdu.num <= 8 ? rightOdu.num - 1 : rightOdu.num - 9) : -1;
  const isAnti    = rightOdu ? rightOdu.num > 8 : false;
  const activeColor = activeIdx >= 0 ? NB_SIDECHRX[activeIdx].color : '#f0920c';
  const nodes = NB_SIDECHRX.map((d, i) => {
    const a = (i / 8) * 2 * Math.PI - Math.PI / 2;
    const isActive = i === activeIdx;
    return { ...d, x: cx + orbit * Math.cos(a), y: cy + orbit * Math.sin(a), a, isActive };
  });
  return (
    <div className="nb-odu-matrix">
      <div className="nb-odu-matrix__label">SIDECHRX Matrix{isAnti ? ' · Anti' : ''}</div>
      <svg viewBox="0 0 300 300" className="nb-matrix-svg">
        <circle cx={cx} cy={cy} r={orbit} fill="none" stroke="rgba(255,255,255,0.05)"
          strokeWidth="1" strokeDasharray="3 6" />
        {nodes.map((d, i) => {
          const sx = cx + (cR + 4) * Math.cos(d.a), sy = cy + (cR + 4) * Math.sin(d.a);
          const ex = cx + (orbit - dR - 3) * Math.cos(d.a), ey = cy + (orbit - dR - 3) * Math.sin(d.a);
          return <line key={i} x1={sx} y1={sy} x2={ex} y2={ey}
            stroke={d.color} strokeWidth={d.isActive ? 2 : 1.2}
            opacity={d.isActive ? 0.9 : 0.35} />;
        })}
        {nodes.map((d, i) => (
          <g key={i}>
            {d.isActive && <circle cx={d.x} cy={d.y} r={dR + 7} fill={d.color} opacity="0.15" />}
            <circle cx={d.x} cy={d.y} r={dR} fill="#070e1c" stroke={d.color}
              strokeWidth={d.isActive ? 2.5 : 1.5} opacity={d.isActive ? 1 : 0.45} />
            <text x={d.x} y={d.y - 2} textAnchor="middle" fill={d.color}
              fontSize="12" fontWeight="800" fontFamily="monospace"
              opacity={d.isActive ? 1 : 0.5}>{d.letter}</text>
            <text x={d.x} y={d.y + 10} textAnchor="middle" fill={d.color}
              fontSize="5.5" opacity={d.isActive ? 0.9 : 0.4}>{d.name}</text>
          </g>
        ))}
        {/* Center node */}
        <circle cx={cx} cy={cy} r={cR} fill="#070e1c" stroke={activeColor} strokeWidth="2" />
        {lines.map((l, i) => (
          <text key={i} x={cx}
            y={cy + (lines.length === 1 ? 4 : i === 0 ? -1 : fs * 1.35 + 3)}
            textAnchor="middle" fill={activeColor}
            fontSize={fs} fontWeight="900" fontFamily="monospace">{l}</text>
        ))}
        <text x={cx} y={290} textAnchor="middle" fill="rgba(255,255,255,0.13)"
          fontSize="5.5" letterSpacing="2" fontFamily="monospace">S·I·D·E·C·H·R·X</text>
      </svg>
    </div>
  );
}

/* ── OduSteamsexOduMatrix — 16 Odu STEAMSEX radial diagram ──────────────── */
function OduSteamsexOduMatrix({ topic, rightOdu, leftOdu }) {
  const label    = topic.trim() || 'IFA';
  const lines    = matrixCenterLines(label);
  const cx = 165, cy = 165, orbit = 122, cR = 30, nR = 14;
  const fs       = label.length > 12 ? 6 : label.length > 7 ? 8.5 : 11;
  const rightNum = rightOdu ? rightOdu.num : -1;
  const leftNum  = leftOdu  ? leftOdu.num  : -1;
  const nodes = INAIFA_ODU.map((o, i) => {
    const a = (i / 16) * 2 * Math.PI - Math.PI / 2;
    const isActive = o.num === rightNum || o.num === leftNum;
    return { ...o, x: cx + orbit * Math.cos(a), y: cy + orbit * Math.sin(a), a, isActive };
  });
  return (
    <div className="nb-odu-matrix">
      <div className="nb-odu-matrix__label">Odu STEAMSEX Matrix · 16 Odu Ifa</div>
      <svg viewBox="0 0 330 330" className="nb-matrix-svg" style={{ maxWidth: 330 }}>
        <circle cx={cx} cy={cy} r={orbit} fill="none" stroke="rgba(255,255,255,0.05)"
          strokeWidth="1" strokeDasharray="3 6" />
        {nodes.map((d, i) => {
          const sx = cx + (cR + 4) * Math.cos(d.a), sy = cy + (cR + 4) * Math.sin(d.a);
          const ex = cx + (orbit - nR - 3) * Math.cos(d.a), ey = cy + (orbit - nR - 3) * Math.sin(d.a);
          return <line key={i} x1={sx} y1={sy} x2={ex} y2={ey}
            stroke={d.color} strokeWidth={d.isActive ? 2 : 1}
            opacity={d.isActive ? 0.9 : 0.28} />;
        })}
        {nodes.map((d, i) => (
          <g key={i}>
            {d.isActive && <circle cx={d.x} cy={d.y} r={nR + 6} fill={d.color} opacity="0.18" />}
            <circle cx={d.x} cy={d.y} r={nR} fill="#070e1c" stroke={d.color}
              strokeWidth={d.isActive ? 2.5 : 1.2} opacity={d.isActive ? 1 : 0.38} />
            <text x={d.x} y={d.y + 4} textAnchor="middle" fill={d.color}
              fontSize="7.5" fontWeight="800" fontFamily="monospace"
              opacity={d.isActive ? 1 : 0.45}>{String(d.num).padStart(2,'0')}</text>
          </g>
        ))}
        {/* Center node */}
        <circle cx={cx} cy={cy} r={cR} fill="#070e1c" stroke="#f0920c" strokeWidth="2" />
        {lines.map((l, i) => (
          <text key={i} x={cx}
            y={cy + (lines.length === 1 ? 4 : i === 0 ? -1 : fs * 1.35 + 3)}
            textAnchor="middle" fill="#f0920c"
            fontSize={fs} fontWeight="900" fontFamily="monospace">{l}</text>
        ))}
        <text x={cx} y={320} textAnchor="middle" fill="rgba(255,255,255,0.13)"
          fontSize="5.5" letterSpacing="1.5" fontFamily="monospace">ODU STEAMSEX MATRIX · 16 ODU IFA</text>
      </svg>
    </div>
  );
}

/* ── TerminalPanel ────────────────────────────────────────────────────────── */
function TerminalPanel({ lang }) {
  const [history, setHistory] = useState([
    { kind: 'sys', text: lang === 'python'
        ? 'Python 3 (Pyodide) · IfaNote Terminal  —  type Python and press Enter'
        : 'JavaScript · IfaNote Terminal  —  type JS and press Enter' }
  ]);
  const [input,   setInput]   = useState('');
  const [running, setRunning] = useState(false);
  const [cmdHist, setCmdHist] = useState([]);
  const [histIdx, setHistIdx] = useState(-1);
  const inputRef = useRef(null);
  const bodyRef  = useRef(null);
  const prompt   = lang === 'python' ? '>>> ' : '> ';

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [history, running]);

  async function execute() {
    const cmd = input.trim();
    if (!cmd) return;
    setInput('');
    setHistIdx(-1);
    setCmdHist(h => [cmd, ...h]);
    setHistory(h => [...h, { kind: 'in', text: cmd }]);
    setRunning(true);
    let result;
    try {
      result = lang === 'python' ? await runPythonCell(cmd) : runJSTerminalLine(cmd);
    } catch(e) {
      result = { ok: false, lines: ['⚠ ' + String(e)] };
    }
    setRunning(false);
    if (result.lines.length > 0) {
      setHistory(h => [...h, ...result.lines.map(l => ({ kind: result.ok ? 'out' : 'err', text: l }))]);
    } else if (result.ok) {
      setHistory(h => [...h, { kind: 'empty', text: '✓' }]);
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!running) execute();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = Math.min(histIdx + 1, cmdHist.length - 1);
      setHistIdx(next);
      if (cmdHist[next] !== undefined) setInput(cmdHist[next]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = Math.max(histIdx - 1, -1);
      setHistIdx(next);
      setInput(next === -1 ? '' : (cmdHist[next] || ''));
    }
  }

  return (
    <div className="nb-terminal" onClick={e => e.stopPropagation()}>
      <div className="nb-terminal__bar">
        <span className="nb-terminal__dot nb-terminal__dot--r" />
        <span className="nb-terminal__dot nb-terminal__dot--y" />
        <span className="nb-terminal__dot nb-terminal__dot--g" />
        <span className="nb-terminal__title">
          {lang === 'python' ? '⌨ Python Terminal' : '⌨ JS Terminal'}
        </span>
        <button className="nb-terminal__clear" onClick={() => setHistory([])}>Clear</button>
      </div>
      <div className="nb-terminal__body" ref={bodyRef}>
        {history.map((h, i) => (
          <div key={i} className={'nb-term-line nb-term-line--' + h.kind}>
            {h.kind === 'in' && <span className="nb-term-prompt">{prompt}</span>}
            <span className="nb-term-text">{h.text}</span>
          </div>
        ))}
        {running && (
          <div className="nb-term-line nb-term-line--running">
            <span className="nb-term-prompt">{prompt}</span>
            <span className="nb-term-cursor" />
          </div>
        )}
      </div>
      <div className="nb-terminal__input-row">
        <span className="nb-term-prompt">{prompt}</span>
        <input
          ref={inputRef}
          className="nb-terminal__input"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={lang === 'python' ? 'print("Hello, Ifa!")' : 'console.log("Hello, Ifa!")'}
          disabled={running}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="none"
          spellCheck={false}
          inputMode="text"
          enterKeyHint="send"
          aria-label="Terminal input"
        />
      </div>
    </div>
  );
}

/* ── IfaNote Keyboard — Yorùbá Tone Learning System ─────────────────────── */

const IFAKB_VOWELS = [
  { name:'A', low:'à', mid:'a', high:'á', lowU:'À', midU:'A', highU:'Á' },
  { name:'E', low:'è', mid:'e', high:'é', lowU:'È', midU:'E', highU:'É' },
  { name:'Ẹ', low:'ẹ\u0300', mid:'ẹ', high:'ẹ\u0301', lowU:'Ẹ\u0300', midU:'Ẹ', highU:'Ẹ\u0301', special:true },
  { name:'I', low:'ì', mid:'i', high:'í', lowU:'Ì', midU:'I', highU:'Í' },
  { name:'O', low:'ò', mid:'o', high:'ó', lowU:'Ò', midU:'O', highU:'Ó' },
  { name:'Ọ', low:'ọ\u0300', mid:'ọ', high:'ọ\u0301', lowU:'Ọ\u0300', midU:'Ọ', highU:'Ọ\u0301', special:true },
  { name:'U', low:'ù', mid:'u', high:'ú', lowU:'Ù', midU:'U', highU:'Ú' },
];

const IFAKB_CONSONANTS = [
  ['b','d','f','g','gb','h','j','k','kp'],
  ['l','m','n','p','r','s','ṣ','t','w','y'],
  ['B','D','F','G','GB','H','J','K','KP'],
  ['L','M','N','P','R','S','Ṣ','T','W','Y'],
];

// Recognize exercises — given a character, identify its tone
const IFAKB_RECOGNIZE = [
  { q:'á', answer:'high', tts:'á' }, { q:'à', answer:'low',  tts:'à' },
  { q:'a', answer:'mid',  tts:'a'  }, { q:'é', answer:'high', tts:'é' },
  { q:'è', answer:'low',  tts:'è'  }, { q:'ẹ\u0301', answer:'high', tts:'ẹ\u0301' },
  { q:'ẹ\u0300', answer:'low', tts:'ẹ\u0300' }, { q:'ẹ', answer:'mid', tts:'ẹ' },
  { q:'ó', answer:'high', tts:'ó'  }, { q:'ò', answer:'low',  tts:'ò' },
  { q:'ọ\u0301', answer:'high', tts:'ọ\u0301' }, { q:'ọ\u0300', answer:'low', tts:'ọ\u0300' },
  { q:'í', answer:'high', tts:'í'  }, { q:'ì', answer:'low',  tts:'ì' },
  { q:'ú', answer:'high', tts:'ú'  }, { q:'ù', answer:'low',  tts:'ù' },
  { q:'i', answer:'mid',  tts:'i'  }, { q:'o', answer:'mid',  tts:'o' },
];

// Mark exercises — given vowel name + target tone, choose the correct variant
const IFAKB_MARK = [
  {vowel:'A',tone:'high'},{vowel:'A',tone:'low'},{vowel:'A',tone:'mid'},
  {vowel:'E',tone:'high'},{vowel:'E',tone:'low'},{vowel:'E',tone:'mid'},
  {vowel:'Ẹ',tone:'high'},{vowel:'Ẹ',tone:'low'},{vowel:'Ẹ',tone:'mid'},
  {vowel:'I',tone:'high'},{vowel:'I',tone:'low'},
  {vowel:'O',tone:'high'},{vowel:'O',tone:'low'},{vowel:'O',tone:'mid'},
  {vowel:'Ọ',tone:'high'},{vowel:'Ọ',tone:'low'},
  {vowel:'U',tone:'high'},{vowel:'U',tone:'low'},
];

// Word list — common Yorùbá vocabulary for syllable-tone study
// syllables array used to split the word into tone-analysable parts
const IFAKB_WORDS = [
  { text:'ọmọ',    meaning:'child',        syllables:['ọ','mọ']        },
  { text:'ilé',    meaning:'house',        syllables:['i','lé']        },
  { text:'omi',    meaning:'water',        syllables:['o','mi']        },
  { text:'orí',    meaning:'head',         syllables:['o','rí']        },
  { text:'àṣà',    meaning:'custom',       syllables:['à','ṣà']        },
  { text:'ẹ̀kọ́',   meaning:'lesson',       syllables:['ẹ\u0300','kọ\u0301'] },
  { text:'àwọn',   meaning:'they / them',  syllables:['à','wọn']       },
  { text:'ìwé',    meaning:'book',         syllables:['ì','wé']        },
  { text:'ojú',    meaning:'eye / face',   syllables:['o','jú']        },
  { text:'ẹ̀rọ',   meaning:'machine',      syllables:['ẹ\u0300','rọ']  },
  { text:'Yorùbá', meaning:'Yorùbá',       syllables:['Yo','rù','bá']  },
  { text:'odò',    meaning:'river',        syllables:['o','dò']        },
  { text:'àgbàdo', meaning:'maize / corn', syllables:['à','gbà','do']  },
];

const TONE_META = {
  high: { label:'High', arrow:'↗', color:'#f0920c', hint:'Rising — acute accent ´' },
  mid:  { label:'Mid',  arrow:'→', color:'#6e90b8', hint:'Level — no mark' },
  low:  { label:'Low',  arrow:'↘', color:'#3b9eff', hint:'Falling — grave accent `' },
};

function detectTone(syl) {
  const n = syl.normalize('NFD');
  if (n.includes('\u0301')) return 'high';
  if (n.includes('\u0300')) return 'low';
  return 'mid';
}

/* ── Yorùbá TTS via Hugging Face MMS (facebook/mms-tts-yor) ──────────────── *
 * The Web Speech API has no real Yoruba voice in any browser; lang='yo'      *
 * silently falls back to English, producing wrong tones and vowel quality.   *
 * facebook/mms-tts-yor is a VITS model trained on native Yorùbá speech —    *
 * it handles ẹ/ọ open vowels and all three lexical tones correctly.          *
 * Falls back to lang='yo-NG' browser TTS if the HF API is unreachable.      *
 * ─────────────────────────────────────────────────────────────────────────── */
let _yorTTSAudio   = null;   // current Audio instance
let _yorTTSOnDone  = null;   // pending done-callback

async function speakYoruba(text, onBusy, onDone) {
  // Cancel any in-progress audio
  if (_yorTTSAudio)  { try { _yorTTSAudio.pause(); } catch(e) {} _yorTTSAudio = null; }
  if (_yorTTSOnDone) { try { _yorTTSOnDone();       } catch(e) {} _yorTTSOnDone = null; }
  if (window.speechSynthesis) window.speechSynthesis.cancel();

  if (onBusy) onBusy();

  // Normalize to NFD so combining marks (ọ+acute etc.) stay attached
  const input = text.normalize('NFD');

  try {
    const ctrl = new AbortController();
    const tid  = setTimeout(() => ctrl.abort(), 14000);
    const res  = await fetch(
      'https://api-inference.huggingface.co/models/facebook/mms-tts-yor',
      {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ inputs: input }),
        signal:  ctrl.signal,
      }
    );
    clearTimeout(tid);
    if (!res.ok) throw new Error(`HF ${res.status}`);
    const blob  = await res.blob();
    const url   = URL.createObjectURL(blob);
    _yorTTSAudio = new Audio(url);
    _yorTTSOnDone = null;
    _yorTTSAudio.onended = () => { URL.revokeObjectURL(url); _yorTTSAudio = null; if (onDone) onDone(); };
    _yorTTSAudio.onerror = () => { URL.revokeObjectURL(url); _yorTTSAudio = null; if (onDone) onDone(); };
    _yorTTSAudio.play().catch(() => { if (onDone) onDone(); });
  } catch(e) {
    console.warn('[IfaNote TTS] HF unavailable —', e.message, '— falling back to browser TTS');
    _yorTTSOnDone = null;
    if (window.speechSynthesis) {
      const u  = new SpeechSynthesisUtterance(text);
      u.lang   = 'yo-NG';
      u.rate   = 0.75;
      u.onend  = () => { if (onDone) onDone(); };
      u.onerror = () => { if (onDone) onDone(); };
      window.speechSynthesis.speak(u);
    } else {
      if (onDone) onDone();
    }
  }
}

function IfaNoteKeyboard({ onInsert }) {
  const [mode,       setMode]       = useState('write');
  const [showUpper,  setShowUpper]  = useState(false);
  const [learnTab,   setLearnTab]   = useState('recognize');
  const [exIdx,      setExIdx]      = useState(0);
  const [exResult,   setExResult]   = useState(null);   // null | 'correct' | 'wrong'
  const [score,      setScore]      = useState({ correct:0, total:0 });
  const [markIdx,    setMarkIdx]    = useState(0);
  const [markResult, setMarkResult] = useState(null);
  const [wordIdx,    setWordIdx]    = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);  // true while HF audio is loading/playing

  // Local wrapper — passes loading callbacks to the async speakYoruba function
  function speakText(text) {
    speakYoruba(text, () => setIsSpeaking(true), () => setIsSpeaking(false));
  }

  function nextRecognize() {
    setExResult(null);
    setExIdx(i => (i + 1) % IFAKB_RECOGNIZE.length);
  }

  function answerRecognize(tone) {
    if (exResult) return;
    const ok = tone === IFAKB_RECOGNIZE[exIdx].answer;
    setExResult(ok ? 'correct' : 'wrong');
    setScore(s => ({ correct: s.correct + (ok ? 1 : 0), total: s.total + 1 }));
  }

  function answerMark(tone) {
    if (markResult) return;
    const ok = tone === IFAKB_MARK[markIdx].tone;
    setMarkResult(ok ? 'correct' : 'wrong');
    if (ok) setTimeout(() => { setMarkResult(null); setMarkIdx(i => (i + 1) % IFAKB_MARK.length); }, 950);
  }

  const ex       = IFAKB_RECOGNIZE[exIdx];
  const markData = IFAKB_MARK[markIdx];
  const markV    = IFAKB_VOWELS.find(v => v.name === markData.vowel);
  const word     = IFAKB_WORDS[wordIdx % IFAKB_WORDS.length];

  return (
    <div className="ifakb" onClick={e => e.stopPropagation()}>

      {/* ── Mode tabs ──────────────────────────────────────────────── */}
      <div className="ifakb__tabs">
        <button className={'ifakb__tab' + (mode === 'write' ? ' ifakb__tab--on' : '')} onClick={() => setMode('write')}>✍ Write</button>
        <button className={'ifakb__tab' + (mode === 'learn' ? ' ifakb__tab--on' : '')} onClick={() => setMode('learn')}>🎓 Learn</button>
        <span className="ifakb__brand">IfaNote · IfaYor · Yorùbá</span>
        {isSpeaking && <span className="ifakb__speaking-pill">▶ Speaking…</span>}
        {score.total > 0 && <span className="ifakb__score-badge">{score.correct}/{score.total}</span>}
      </div>

      {/* ── WRITE MODE ─────────────────────────────────────────────── */}
      {mode === 'write' && (
        <div className="ifakb__write">
          <div className="ifakb__legend">
            <span className="ifakb__legend-item ifakb__legend--low">↘ Low (à)</span>
            <span className="ifakb__legend-item ifakb__legend--mid">→ Mid (a)</span>
            <span className="ifakb__legend-item ifakb__legend--high">↗ High (á)</span>
            <button className="ifakb__case-btn" onClick={() => setShowUpper(u => !u)}>
              {showUpper ? '⇑ CAPS ON' : '⇩ lower'}
            </button>
          </div>

          {/* Vowel grid: Letter | Low | Mid | High */}
          <div className="ifakb__vowel-grid">
            <div className="ifakb__vowel-hdr">
              <span>Letter</span>
              <span className="ifakb__hdr--low">↘ Low</span>
              <span className="ifakb__hdr--mid">→ Mid</span>
              <span className="ifakb__hdr--high">↗ High</span>
            </div>
            {IFAKB_VOWELS.map(v => (
              <div key={v.name} className={'ifakb__vowel-row' + (v.special ? ' ifakb__vowel-row--sp' : '')}>
                <span className="ifakb__vowel-lbl">{v.name}</span>
                <button className="ifakb__vbtn ifakb__vbtn--low"  onClick={() => onInsert(showUpper ? v.lowU  : v.low)}>{showUpper ? v.lowU  : v.low}</button>
                <button className="ifakb__vbtn ifakb__vbtn--mid"  onClick={() => onInsert(showUpper ? v.midU  : v.mid)}>{showUpper ? v.midU  : v.mid}</button>
                <button className="ifakb__vbtn ifakb__vbtn--high" onClick={() => onInsert(showUpper ? v.highU : v.high)}>{showUpper ? v.highU : v.high}</button>
              </div>
            ))}
          </div>

          {/* Consonants */}
          <div className="ifakb__cons-area">
            {IFAKB_CONSONANTS.map((row, ri) => (
              <div key={ri} className="ifakb__cons-row">
                {row.map((ch, ci) => (
                  <button key={ci}
                    className={'ifakb__cbtn' + (ch === 'ṣ' || ch === 'Ṣ' ? ' ifakb__cbtn--sp' : '')}
                    onClick={() => onInsert(ch)} title={ch === 'ṣ' || ch === 'Ṣ' ? 'Yorùbá SH sound' : ch}>
                    {ch}
                  </button>
                ))}
              </div>
            ))}
          </div>

          {/* Utility row */}
          <div className="ifakb__util-row">
            <button className="ifakb__ubtn ifakb__ubtn--wide" onClick={() => onInsert(' ')}>Space</button>
            <button className="ifakb__ubtn" onClick={() => onInsert('\n')}>↵</button>
            <button className="ifakb__ubtn" onClick={() => onInsert('.')}>.</button>
            <button className="ifakb__ubtn" onClick={() => onInsert(',')}>，</button>
            <button className="ifakb__ubtn" onClick={() => onInsert('!')}>!</button>
            <button className="ifakb__ubtn" onClick={() => onInsert('?')}>?</button>
          </div>
        </div>
      )}

      {/* ── LEARN MODE ─────────────────────────────────────────────── */}
      {mode === 'learn' && (
        <div className="ifakb__learn">

          {/* Tone reference cards */}
          <div className="ifakb__tref">
            {Object.entries(TONE_META).map(([tone, m]) => (
              <div key={tone} className="ifakb__tref-card" style={{'--tk': m.color}}>
                <div className="ifakb__tref-arrow">{m.arrow}</div>
                <div className="ifakb__tref-name">{m.label}</div>
                <div className="ifakb__tref-hint">{m.hint}</div>
                <div className="ifakb__tref-chars">
                  {IFAKB_VOWELS.map(v => (
                    <button key={v.name} className="ifakb__tref-char"
                      onClick={() => speakText(v[tone])} title={'Hear: ' + v[tone]}>
                      {v[tone]}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Exercise tabs */}
          <div className="ifakb__ex-tabs">
            {[
              { id:'recognize', label:'① Recognize' },
              { id:'mark',      label:'② Mark'      },
              { id:'words',     label:'③ Words'     },
            ].map(t => (
              <button key={t.id}
                className={'ifakb__ex-tab' + (learnTab === t.id ? ' ifakb__ex-tab--on' : '')}
                onClick={() => setLearnTab(t.id)}>
                {t.label}
              </button>
            ))}
            {score.total > 0 && (
              <span className="ifakb__ex-score">
                Score: {score.correct}/{score.total}
                {score.total >= 5 && ' · ' + Math.round(score.correct / score.total * 100) + '%'}
              </span>
            )}
          </div>

          {/* ── Exercise 1: Recognize ─────────────────────────────── */}
          {learnTab === 'recognize' && (
            <div className="ifakb__exercise">
              <p className="ifakb__ex-q">What tone does this character use?</p>
              <div className="ifakb__ex-display">
                <span className="ifakb__ex-char">{ex.q}</span>
                <button className="ifakb__ex-hear" onClick={() => speakText(ex.tts)}>♪ Hear</button>
              </div>
              {!exResult && (
                <div className="ifakb__ex-opts">
                  {Object.entries(TONE_META).map(([tone, m]) => (
                    <button key={tone} className="ifakb__ex-opt" style={{'--tk': m.color}}
                      onClick={() => answerRecognize(tone)}>
                      <span className="ifakb__ex-opt-arr">{m.arrow}</span>
                      <span className="ifakb__ex-opt-lbl">{m.label}</span>
                    </button>
                  ))}
                </div>
              )}
              {exResult && (
                <div className={'ifakb__ex-fb ifakb__ex-fb--' + exResult}>
                  {exResult === 'correct'
                    ? `✓ Correct! "${ex.q}" is ${TONE_META[ex.answer].arrow} ${ex.answer} tone.`
                    : `✗ "${ex.q}" is ${TONE_META[ex.answer].arrow} ${ex.answer} tone — try to remember!`}
                  <button className="ifakb__ex-next" onClick={nextRecognize}>Next →</button>
                </div>
              )}
            </div>
          )}

          {/* ── Exercise 2: Mark ─────────────────────────────────── */}
          {learnTab === 'mark' && (
            <div className="ifakb__exercise">
              <p className="ifakb__ex-q">
                Add the{' '}
                <strong style={{color: TONE_META[markData.tone].color}}>
                  {TONE_META[markData.tone].arrow} {markData.tone}
                </strong>{' '}
                tone to: <strong className="ifakb__ex-base">{markV.mid}</strong>
              </p>
              <div className="ifakb__ex-display">
                <span className="ifakb__ex-char">{markV.mid}</span>
                <span className="ifakb__ex-arrow">→</span>
                <span className="ifakb__ex-char ifakb__ex-char--q">?</span>
                <button className="ifakb__ex-hear" onClick={() => speakText(markV[markData.tone])}>♪ Hear</button>
              </div>
              <div className="ifakb__ex-opts">
                {['low', 'mid', 'high'].map(tone => (
                  <button key={tone}
                    className={'ifakb__ex-opt' +
                      (markResult && tone === markData.tone ? ' ifakb__ex-opt--ok'  : '') +
                      (markResult === 'wrong' && tone !== markData.tone ? ' ifakb__ex-opt--dim' : '')}
                    style={{'--tk': TONE_META[tone].color}}
                    onClick={() => answerMark(tone)}
                    disabled={!!markResult}>
                    <span className="ifakb__ex-opt-arr">{TONE_META[tone].arrow}</span>
                    <span className="ifakb__ex-opt-char">{markV[tone]}</span>
                  </button>
                ))}
              </div>
              {markResult && (
                <div className={'ifakb__ex-fb ifakb__ex-fb--' + markResult}>
                  {markResult === 'correct'
                    ? `✓ ${markV.mid} + ${TONE_META[markData.tone].label} = ${markV[markData.tone]}`
                    : `✗ Answer: ${markV[markData.tone]} (${markV.mid} + ${TONE_META[markData.tone].label} tone)`}
                </div>
              )}
            </div>
          )}

          {/* ── Exercise 3: Words ─────────────────────────────────── */}
          {learnTab === 'words' && (
            <div className="ifakb__exercise">
              <p className="ifakb__ex-q">Study the tones in this Yorùbá word — click each syllable to hear it:</p>
              <div className="ifakb__word-main">
                <span className="ifakb__word-text">{word.text}</span>
                <span className="ifakb__word-gloss">— {word.meaning}</span>
                <button className="ifakb__ex-hear" onClick={() => speakText(word.text)}>♪ Hear</button>
              </div>
              <div className="ifakb__word-syls">
                {word.syllables.map((syl, si) => {
                  const tone = detectTone(syl);
                  const m    = TONE_META[tone];
                  return (
                    <div key={si} className="ifakb__syl" style={{'--tk': m.color}}>
                      <button className="ifakb__syl-btn" onClick={() => speakText(syl)}>{syl}</button>
                      <div className="ifakb__syl-info">{m.arrow} {m.label}</div>
                    </div>
                  );
                })}
              </div>
              <div className="ifakb__word-nav">
                <button className="ifakb__wnav-btn"
                  onClick={() => setWordIdx(i => (i - 1 + IFAKB_WORDS.length) % IFAKB_WORDS.length)}>← Prev</button>
                <span className="ifakb__wnav-cnt">{(wordIdx % IFAKB_WORDS.length) + 1} / {IFAKB_WORDS.length}</span>
                <button className="ifakb__wnav-btn"
                  onClick={() => setWordIdx(i => (i + 1) % IFAKB_WORDS.length)}>Next →</button>
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
}

/* ── NbCell ───────────────────────────────────────────────────────────────── */
function NbCell({ cell, idx, active, onFocus, onRun, onDelete, onClear, onMoveUp, onMoveDown, onChange, isFirst, isLast, apiKey, onNeedKey }) {
  const textareaRef  = useRef(null);  // for Aebajiogbe cursor-position insertion
  const mathInputRef = useRef(null);  // for Math cell cursor-position insertion
  const [confirmDelete, setConfirmDelete] = useState(false);
  const lang    = cell.lang || 'js';
  const cfg     = cell.type === 'code' ? (LANG_CONFIG[lang] || LANG_CONFIG.js) : null;
  const clr     = cfg ? cfg.color : (CELL_CLR[cell.type] || '#888');

  const isCode       = cell.type === 'code';
  const isPython     = isCode && lang === 'python';
  const isScratch    = isCode && lang === 'scratch';
  const isArt        = cell.type === 'art';
  const isMultimedia = cell.type === 'multimedia';
  const isMath       = cell.type === 'math';
  const isSchematics = cell.type === 'schematics';
  const isOthers     = cell.type === 'others';
  const isAi         = cell.type === 'ai';
  const isLang       = cell.type === 'lang';
  const isOdu        = cell.type === 'text' && cell.scriptMode === 'aebajiogbe';
  const isAbd        = cell.type === 'text' && cell.scriptMode === 'abd';
  const isSpecial    = cell.type === 'text' && cell.scriptMode === 'special';
  const baseFont     = cell.type === 'text' ? (cell.font || DEFAULT_TEXT_FONT) : null;
  const textFont     = isOdu
    ? "'Aebajiogbe Oduduwa', 'Noto Sans', sans-serif"
    : baseFont;

  function insertAtCursor(ch) {
    const el = textareaRef.current;
    if (!el) { onChange({ input: (cell.input || '') + ch }); return; }
    const start = el.selectionStart, end = el.selectionEnd;
    const next = (cell.input || '').slice(0, start) + ch + (cell.input || '').slice(end);
    onChange({ input: next });
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(start + ch.length, start + ch.length);
    });
  }

  function mathInsertAtCursor(ch) {
    const el = mathInputRef.current;
    if (!el) { onChange({ input: (cell.input || '') + ch, output: null }); return; }
    const start = el.selectionStart, end = el.selectionEnd;
    const next = (cell.input || '').slice(0, start) + ch + (cell.input || '').slice(end);
    onChange({ input: next, output: null });
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(start + ch.length, start + ch.length);
    });
  }

  // Art, Multimedia, Others, AI, Lang, and calculator-mode Math have no terminal run button
  // Schematics: only Mermaid and Graphviz need Run; SVG and ASCII auto-render on change
  const isRunnable = !isAi && !isLang && (['code', 'text'].includes(cell.type) ||
    (cell.type === 'schematics' && (!cell.schemTool || cell.schemTool === 'mermaid' || cell.schemTool === 'graphviz')) ||
    (cell.type === 'math' && (!cell.mathTool || cell.mathTool === 'latex')));

  return (
    <div
      className={'nb-cell nb-cell--' + cell.type + (active ? ' nb-cell--active' : '') + (cell.running ? ' nb-cell--running' : '')}
      style={{ '--nb-clr': clr }}
      onClick={onFocus}
    >
      {/* Gutter */}
      <div className="nb-cell__gutter">
        <span className="nb-cell__num">
          {cell.running ? <span className="nb-spin">⟳</span> : `[${idx + 1}]`}
        </span>
        <button
          className="nb-cell__run-gutter"
          onClick={e => { e.stopPropagation(); onRun(); }}
          disabled={cell.running || !isRunnable}
          title={cell.running ? 'Running…' : 'Run cell'}
          aria-label="Run cell"
        >▶</button>
      </div>

      {/* Body */}
      <div className="nb-cell__body">

        {/* Header bar */}
        <div className="nb-cell__hdr">
          <span className="nb-cell__type-badge">
            {cfg ? cfg.badge : (CELL_BADGE[cell.type] || cell.type.toUpperCase())}
          </span>

          {/* Language selector — code cells only */}
          {isCode && (
            <select className="nb-lang-select" value={lang}
              onChange={e => { e.stopPropagation(); onChange({ lang: e.target.value, output: null, running: false }); }}
              onClick={e => e.stopPropagation()} disabled={cell.running} aria-label="Programming language">
              {Object.entries(LANG_CONFIG).map(([key, lc]) => (
                <option key={key} value={key}>{lc.label}</option>
              ))}
            </select>
          )}

          {/* Kind selector — others cells */}
          {isOthers && (
            <select className="nb-others-kind-select" value={cell.kind || 'note'}
              onChange={e => { e.stopPropagation(); onChange({ kind: e.target.value }); }}
              onClick={e => e.stopPropagation()} aria-label="Entry type">
              <option value="note">📝 Note</option>
              <option value="bookmark">🔖 Bookmark</option>
              <option value="quote">💬 Quote</option>
              <option value="todo">☑ To-Do List</option>
            </select>
          )}

          {/* Font selector — text cells only */}
          {cell.type === 'text' && (
            <select className="nb-font-select" value={cell.font || DEFAULT_TEXT_FONT}
              onChange={e => { e.stopPropagation(); onChange({ font: e.target.value }); }}
              onClick={e => e.stopPropagation()} aria-label="Text font"
              title="Choose font — helpful for Yoruba and other tonal languages">
              {TEXT_FONTS.map(f => (
                <option key={f.value} value={f.value}>{f.label}</option>
              ))}
            </select>
          )}

          {/* Script selector — text cells only */}
          {cell.type === 'text' && (
            <select className="nb-script-select" value={cell.scriptMode || 'latin'}
              onChange={e => { e.stopPropagation(); onChange({ scriptMode: e.target.value }); }}
              onClick={e => e.stopPropagation()} aria-label="Script">
              <option value="latin">Latin</option>
              <option value="abd">ABD — Yorùbá</option>
              <option value="special">Special Characters</option>
              <option value="aebajiogbe">Aebajiogbe-Oduduwa</option>
            </select>
          )}

          {/* Odu view selector — odu cells only */}
          {cell.type === 'odu' && (
            <select className="nb-odu-view-select" value={cell.oduView || 'odu'}
              onChange={e => { e.stopPropagation(); onChange({ oduView: e.target.value }); }}
              onClick={e => e.stopPropagation()} aria-label="Odu cell view">
              <option value="odu">Odu</option>
              <option value="steamsex">STEAMSEX Matrix</option>
              <option value="sidechrx">SIDECHRX Matrix</option>
              <option value="steamsex-odu">Odu STEAMSEX Matrix</option>
            </select>
          )}

          {/* Math tool selector — math cells only */}
          {isMath && (
            <select className="nb-math-mode-select" value={cell.mathTool || 'latex'}
              onChange={e => { e.stopPropagation(); onChange({ mathTool: e.target.value, output: null }); }}
              onClick={e => e.stopPropagation()} aria-label="Math tool" disabled={cell.running}>
              <option value="latex">LaTeX</option>
              <option value="calc-basic">Calc: Basic</option>
              <option value="calc-sci">Calc: Scientific</option>
            </select>
          )}

          {/* Schematics tool selector */}
          {isSchematics && (
            <select className="nb-schem-tool-select" value={cell.schemTool || 'mermaid'}
              onChange={e => { e.stopPropagation(); onChange({ schemTool: e.target.value, output: null }); }}
              onClick={e => e.stopPropagation()} aria-label="Schematics tool" disabled={cell.running}>
              <option value="mermaid">Mermaid</option>
              <option value="graphviz">Graphviz DOT</option>
              <option value="svg">SVG Code</option>
              <option value="ascii">ASCII Art</option>
            </select>
          )}

          {/* Symbols keyboard toggle — math LaTeX mode only */}
          {isMath && (!cell.mathTool || cell.mathTool === 'latex') && (
            <button className={'nb-math-kb-toggle' + (cell.showMathKb ? ' nb-math-kb-toggle--on' : '')}
              onClick={e => { e.stopPropagation(); onChange({ showMathKb: !cell.showMathKb }); }}
              title={cell.showMathKb ? 'Hide symbols keyboard' : 'Show symbols keyboard'}>
              Σ Symbols
            </button>
          )}

          {/* Hint text */}
          {!cell.running && (
            isCode       && !isScratch  ? <span className="nb-cell__hdr-note">{cfg.hint}</span> :
            cell.type === 'odu'         ? <span className="nb-cell__hdr-note">Click marks to toggle | ↔ ||</span> :
            isArt                       ? <span className="nb-cell__hdr-note">Pen · Brush · Spray · Shapes · Text · Fill · Undo/Redo</span> :
            isMultimedia                ? <span className="nb-cell__hdr-note">URL · File upload · Camera · Microphone</span> :
            isMath && (!cell.mathTool || cell.mathTool === 'latex') ? <span className="nb-cell__hdr-note">KaTeX · press Run</span> :
            isMath                      ? null :
            isSchematics && (!cell.schemTool || cell.schemTool === 'mermaid') ? <span className="nb-cell__hdr-note">flowchart · sequence · class · ER · state · gantt · mindmap</span> :
            isSchematics && cell.schemTool === 'graphviz' ? <span className="nb-cell__hdr-note">DOT: digraph G &#123; A -&gt; B &#125; · press Run</span> :
            isSchematics && cell.schemTool === 'svg'      ? <span className="nb-cell__hdr-note">SVG markup — auto-renders on input</span> :
            isSchematics && cell.schemTool === 'ascii'    ? <span className="nb-cell__hdr-note">ASCII art — renders as plain text</span> :
            isSchematics                ? null :
            null
          )}
          {cell.running && (
            <span className="nb-cell__hdr-note nb-cell__hdr-note--running">
              {isMath       ? 'Rendering math…' :
               isSchematics ? 'Rendering diagram…' :
               _pyodide     ? 'Running Python…' : 'Loading Python kernel (first run ~5 s)…'}
            </span>
          )}

          <div className="nb-cell__controls">
            {isCode && !isScratch && lang !== 'c' && (
              <button
                className={'nb-ctrl-btn nb-ctrl-btn--term' + (cell.showTerminal ? ' nb-ctrl-btn--term-on' : '')}
                onClick={e => { e.stopPropagation(); onChange({ showTerminal: !cell.showTerminal }); }}
                title={cell.showTerminal ? 'Hide terminal' : 'Open terminal'}
                aria-label="Toggle terminal"
              >⌨</button>
            )}
            <button className="nb-ctrl-btn" onClick={e => { e.stopPropagation(); onMoveUp(); }}   disabled={isFirst} title="Move up"   aria-label="Move cell up">↑</button>
            <button className="nb-ctrl-btn" onClick={e => { e.stopPropagation(); onMoveDown(); }} disabled={isLast}  title="Move down" aria-label="Move cell down">↓</button>
            <button className="nb-ctrl-btn nb-ctrl-btn--clr" onClick={e => { e.stopPropagation(); onClear(); }}
              title={cell.type === 'odu' ? 'Reset marks to Ogbe' : 'Clear cell content'}
              aria-label={cell.type === 'odu' ? 'Reset to Ogbe' : 'Clear cell'}>⌫</button>
            <button className="nb-ctrl-btn nb-ctrl-btn--del" onClick={e => { e.stopPropagation(); setConfirmDelete(true); }} title="Delete cell" aria-label="Delete cell">×</button>
          </div>
        </div>

        {/* ── Delete confirmation dialog ─────────────────────────────────── */}
        {confirmDelete && (
          <div className="nb-confirm-overlay" onClick={e => e.stopPropagation()}>
            <div className="nb-confirm-dialog">
              <p className="nb-confirm-title">Delete IfaCell</p>
              <p className="nb-confirm-body">Are you sure you want to delete this cell?</p>
              <div className="nb-confirm-actions">
                <button className="nb-confirm-btn nb-confirm-btn--yes" onClick={() => { setConfirmDelete(false); onDelete(); }}>Yes, Delete</button>
                <button className="nb-confirm-btn nb-confirm-btn--no"  onClick={() => setConfirmDelete(false)}>No, Keep</button>
              </div>
            </div>
          </div>
        )}

        {/* Scratch — info panel */}
        {isScratch && (
          <div className="nb-scratch-panel">
            <div className="nb-scratch-icon">🐱</div>
            <p className="nb-scratch-desc">
              Scratch is a <strong>block-based visual</strong> programming language — code is built by dragging and snapping coloured blocks, not by typing in a text editor.
            </p>
            <a className="nb-scratch-link" href="https://scratch.mit.edu/projects/editor/"
              target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}>
              Open Scratch Editor →
            </a>
            <p className="nb-scratch-note">Opens the MIT Scratch editor in a new tab. · Embedded blocks — Phase II.</p>
          </div>
        )}

        {/* Code textarea — JS, Python, C */}
        {isCode && !isScratch && (
          <textarea
            className={'nb-code-input' + (isPython ? ' nb-python-input' : '')}
            value={cell.input}
            onChange={e => onChange({ input: e.target.value, output: null })}
            onFocus={onFocus}
            placeholder={cfg.placeholder}
            rows={Math.max(3, (cell.input.match(/\n/g)||[]).length + 2)}
            spellCheck={false} disabled={cell.running}
          />
        )}

        {/* Text / notes */}
        {cell.type === 'text' && (
          <>
            <TextFormatToolbar
              textareaRef={textareaRef}
              value={cell.input}
              onUpdate={v => onChange({ input: v })}
            />
            <textarea className="nb-text-input"
              ref={textareaRef}
              style={{ fontFamily: textFont, ...(isOdu ? { direction: 'rtl', textAlign: 'right' } : {}) }}
              value={cell.input}
              onChange={e => onChange({ input: e.target.value })}
              onFocus={onFocus}
              placeholder={isOdu ? 'Use the keyboard below to type in Aebajiogbe-Oduduwa script…' : isAbd ? 'Type Yorùbá — use the ABD keyboard below for tonal marks…' : isSpecial ? 'Use the keyboard below to insert special characters…' : 'Type text, # H1, ## H2, **bold**, *italic*…'}
              rows={Math.max(2, (cell.input.match(/\n/g)||[]).length + 2)}
            />
            {isOdu && <AebajiogbeKeyboard onInsert={insertAtCursor} />}
            {isAbd && <AbdKeyboard onInsert={insertAtCursor} />}
            {isSpecial && <SpecialCharsKeyboard onInsert={insertAtCursor} />}
          </>
        )}

        {/* Odu marks */}
        {cell.type === 'odu' && (
          <OduMarkInput right={cell.right} left={cell.left}
            onChangeRight={r => onChange({ right: r })}
            onChangeLeft={l  => onChange({ left: l })}
            oduTopic={cell.oduTopic || ''}
            onChangeTopic={t => onChange({ oduTopic: t })}
            oduName={cell.oduName || ''}
            onChangeName={n => onChange({ oduName: n })} />
        )}

        {/* Odu matrices — rendered below marks when a matrix view is selected */}
        {cell.type === 'odu' && (() => {
          const v  = cell.oduView || 'odu';
          const ro = codeToOdu(cell.right);
          const lo = codeToOdu(cell.left);
          const topic = cell.oduTopic || '';
          if (v === 'steamsex')     return <OduSteamsexMatrix    topic={topic} />;
          if (v === 'sidechrx')     return <OduSidechrxMatrix    topic={topic} rightOdu={ro} />;
          if (v === 'steamsex-odu') return <OduSteamsexOduMatrix topic={topic} rightOdu={ro} leftOdu={lo} />;
          return null;
        })()}

        {/* Art & Design — Ifagram canvas */}
        {isArt && <IfagramCanvas key={cell.clearKey || 0} cell={cell} onChange={onChange} />}

        {/* Multimedia */}
        {isMultimedia && <MultimediaCell cell={cell} onChange={onChange} />}

        {/* Math & Metamath — LaTeX mode */}
        {isMath && (!cell.mathTool || cell.mathTool === 'latex') && (
          <>
            <textarea className="nb-math-input"
              ref={mathInputRef}
              value={cell.input || ''}
              onChange={e => onChange({ input: e.target.value, output: null })}
              onFocus={onFocus}
              placeholder={'Wrap LaTeX in $…$ (inline) or $$…$$ (display):\n  $E = mc^2$\n  $$\\frac{a}{b} = \\sqrt{x}$$\nOr type plain LaTeX and press Run.'}
              rows={Math.max(3, ((cell.input || '').match(/\n/g)||[]).length + 2)}
              spellCheck={false} disabled={cell.running}
            />
            {cell.showMathKb && <MathSymbolsKeyboard onInsert={mathInsertAtCursor} />}
            {cell.output && cell.output.html && !cell.running && (
              <div className="nb-math-render" dangerouslySetInnerHTML={{ __html: cell.output.html }} />
            )}
            <p className="nb-math-hint">$E=mc^2$ · $$\sum_i^n$$ · \frac&#123;a&#125;&#123;b&#125; · \sqrt&#123;x&#125; · \int_a^b — press Run to render</p>
          </>
        )}

        {/* Math & Metamath — Calculator mode */}
        {isMath && (cell.mathTool === 'calc-basic' || cell.mathTool === 'calc-sci') && (
          <MathCalculator mode={cell.mathTool === 'calc-sci' ? 'scientific' : 'basic'} />
        )}

        {/* Schematics / Technical Designs */}
        {isSchematics && (() => {
          const tool = cell.schemTool || 'mermaid';
          const placeholders = {
            mermaid:  'flowchart TD\n  A[Start] --> B{Choice}\n  B -->|Yes| C[Done]\n  B -->|No|  D[Retry]\n\nOr: sequenceDiagram · classDiagram · erDiagram · gantt · pie · mindmap',
            graphviz: 'digraph G {\n  rankdir=LR\n  A -> B -> C\n  B -> D\n}\n\nPress Run to render.',
            svg:      '<svg viewBox="0 0 200 80" xmlns="http://www.w3.org/2000/svg">\n  <rect x="10" y="10" width="80" height="40" rx="6" fill="#10b981"/>\n  <text x="50" y="35" text-anchor="middle" fill="white" font-size="13">Block</text>\n  <line x1="90" y1="30" x2="120" y2="30" stroke="#84cc16" stroke-width="2" marker-end="url(#a)"/>\n</svg>',
            ascii:    '  [Source] ──► [Process] ──► [Output]\n      │                        ▲\n      └──────[Alt Path]────────┘',
          };
          return (
            <>
              <textarea className="nb-schem-input"
                value={cell.input || ''}
                onChange={e => {
                  const val = e.target.value;
                  if (tool === 'svg') {
                    onChange({ input: val, output: val.trim() ? { ok: true, svgRaw: val.trim() } : null });
                  } else if (tool === 'ascii') {
                    onChange({ input: val, output: val.trim() ? { ok: true, ascii: true } : null });
                  } else {
                    onChange({ input: val, output: null });
                  }
                }}
                onFocus={onFocus}
                placeholder={placeholders[tool] || placeholders.mermaid}
                rows={Math.max(4, ((cell.input || '').match(/\n/g)||[]).length + 2)}
                spellCheck={false} disabled={cell.running}
              />
              {/* Mermaid rendered SVG */}
              {(tool === 'mermaid') && cell.output && !cell.running && cell.output.svg && (
                <div className="nb-schem-render" dangerouslySetInnerHTML={{ __html: cell.output.svg }} />
              )}
              {/* Mermaid fallback: ASCII art display */}
              {(tool === 'mermaid') && cell.output && !cell.running && !cell.output.svg && !cell.output.error && cell.output.ok && (
                <div className="nb-schem-render"><code className="nb-schem-ascii">{cell.input}</code></div>
              )}
              {/* Graphviz rendered SVG */}
              {tool === 'graphviz' && cell.output && !cell.running && cell.output.svg && (
                <div className="nb-schem-render nb-schem-render--graphviz" dangerouslySetInnerHTML={{ __html: cell.output.svg }} />
              )}
              {/* SVG Code — auto-renders */}
              {tool === 'svg' && cell.output && cell.output.svgRaw && (
                <div className="nb-schem-render nb-schem-render--svg" dangerouslySetInnerHTML={{ __html: cell.output.svgRaw }} />
              )}
              {/* ASCII Art — auto-renders */}
              {tool === 'ascii' && cell.output && cell.output.ascii && (
                <div className="nb-schem-render"><code className="nb-schem-ascii">{cell.input}</code></div>
              )}
              {/* Error */}
              {cell.output && !cell.running && cell.output.error && (
                <p className="nb-schem-err">⚠ {cell.output.error}</p>
              )}
              <p className="nb-schem-hint">
                {tool === 'mermaid'  && 'Mermaid: flowchart · sequenceDiagram · classDiagram · erDiagram · gantt · pie · mindmap · stateDiagram'}
                {tool === 'graphviz' && 'DOT: graph { } · digraph { } · subgraph · node/edge attributes — press Run to render'}
                {tool === 'svg'      && 'SVG markup — auto-renders as you type · supports all standard SVG elements'}
                {tool === 'ascii'    && 'ASCII art — renders as monospace text · use box-drawing chars for clean diagrams'}
              </p>
            </>
          );
        })()}

        {/* Others — Note / Bookmark / Quote */}
        {isOthers && <OthersCell cell={cell} onChange={onChange} />}

        {/* AI — Claude-powered assistant cell */}
        {isAi && <AiCell cell={cell} onChange={onChange} apiKey={apiKey} onNeedKey={onNeedKey} />}

        {/* Lang — IfaNote Keyboard · Yorùbá tone writing & learning */}
        {isLang && (
          <>
            <textarea
              className="nb-text-input"
              ref={textareaRef}
              value={cell.input || ''}
              onChange={e => onChange({ input: e.target.value })}
              onFocus={onFocus}
              placeholder="Type Yorùbá here — use the IfaNote Keyboard below to insert tone-marked characters…"
              rows={Math.max(2, ((cell.input || '').match(/\n/g) || []).length + 2)}
              style={{ fontFamily: "'Gentium Plus', 'Noto Serif', serif" }}
            />
            <IfaNoteKeyboard onInsert={insertAtCursor} />
          </>
        )}

        {/* Running dots */}
        {cell.running && (
          <div className="nb-cell__running-bar">
            <span className="nb-running-dot" />
            <span className="nb-running-dot" />
            <span className="nb-running-dot" />
          </div>
        )}

        {/* Standard output — code and text cells only */}
        {cell.output && !cell.running && (cell.type === 'code' || cell.type === 'text') && (
          <div className={'nb-cell__output' + (cell.output.ok === false ? ' nb-cell__output--err' : '')}>
            {isCode && cell.output.lines && (
              cell.output.lines.length === 0
                ? <div className="nb-out-line nb-out-empty">✓ Ran — no output</div>
                : cell.output.lines.map((line, i) => (
                    <div key={i} className="nb-out-line">{line || '\u00A0'}</div>
                  ))
            )}
            {cell.type === 'text' && (
              <div className="nb-text-preview" style={{ fontFamily: textFont }}
                dangerouslySetInnerHTML={{ __html: renderTextMarkdown(cell.input, isOdu) }} />
            )}
          </div>
        )}

        {/* Run button — code, text, math, schematics; hidden for Scratch */}
        {isRunnable && !isScratch && (
          <button
            className={'nb-run-btn' + (isPython ? ' nb-run-btn--python' : '')}
            onClick={e => { e.stopPropagation(); onRun(); }}
            disabled={cell.running}
          >
            {cell.running ? '⟳ Running…' : '▶ Run'}
          </button>
        )}

        {/* Terminal — JS and Python code cells only */}
        {isCode && !isScratch && lang !== 'c' && cell.showTerminal && (
          <TerminalPanel lang={lang} />
        )}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   PRO ADDITIONS — constants, storage, components
══════════════════════════════════════════════════════════════════════════════ */

const PRO_NOTEBOOKS_KEY = 'ifanote-pro-notebooks';
const PRO_ACTIVE_KEY    = 'ifanote-pro-active';
const PRO_THEME_KEY     = 'ifanote-pro-theme';
const PRO_AI_KEY_KEY    = 'ifanote-pro-apikey';

/* ── Pro notebook storage helpers ─────────────────────────────────────────── */
function proLoadAll() {
  try { return JSON.parse(localStorage.getItem(PRO_NOTEBOOKS_KEY) || '[]'); }
  catch { return []; }
}
function proSaveAll(nbs) {
  try { localStorage.setItem(PRO_NOTEBOOKS_KEY, JSON.stringify(nbs)); } catch {}
}
function proActiveId() {
  return localStorage.getItem(PRO_ACTIVE_KEY) || null;
}
function proSetActiveId(id) {
  try { localStorage.setItem(PRO_ACTIVE_KEY, id); } catch {}
}
function proMakeId() {
  return 'nb-' + Date.now() + '-' + Math.random().toString(36).slice(2,7);
}
function proDefaultNotebook() {
  const id = proMakeId();
  return {
    id,
    title: 'My First IfaNote',
    updatedAt: new Date().toISOString(),
    data: serializeNotebook([
      newNbCell('odu',  { right:[1,1,1,1], left:[1,1,1,1] }),
      newNbCell('text', { input: 'Welcome to **IfaNote Pro** — The Premium Notebook for Everything.\nCombine code, Odu Ifa wisdom, AI assistance, and universal knowledge.' }),
      newNbCell('code', { lang:'js', input: 'const wave = x => Math.sin(x) * Math.cos(x / 2);\nfor (let i = 0; i < 4; i++) console.log(`Ψ(${i}) = ${wave(i).toFixed(4)}`);' }),
    ], 'My First IfaNote'),
  };
}

/* ── Pro share helpers ────────────────────────────────────────────────────── */
function proEncodeNotebook(cells, title) {
  const json = serializeNotebook(cells, title);
  try {
    return btoa(unescape(encodeURIComponent(json)));
  } catch { return null; }
}
function proDecodeNotebook(b64) {
  try {
    const json = decodeURIComponent(escape(atob(b64)));
    return deserializeNotebook(json);
  } catch { return null; }
}
function proShareUrl(cells, title) {
  const enc = proEncodeNotebook(cells, title);
  if (!enc) return '';
  const base = window.location.href.split('#')[0];
  return base + '#nb=' + enc;
}
function proLoadFromHash() {
  const hash = window.location.hash;
  const m    = hash.match(/#nb=(.+)/);
  if (!m) return null;
  return proDecodeNotebook(m[1]);
}

/* ── NotebookSidebar ──────────────────────────────────────────────────────── */
function NotebookSidebar({ notebooks, activeId, onSelect, onCreate, onRename, onDelete, onClose }) {
  const [renamingId, setRenamingId] = useState(null);
  const [renameVal,  setRenameVal]  = useState('');
  const renameRef = useRef(null);
  useEffect(() => { if (renamingId && renameRef.current) renameRef.current.focus(); }, [renamingId]);

  function startRename(nb) {
    setRenamingId(nb.id);
    setRenameVal(nb.title);
  }
  function commitRename(id) {
    if (renameVal.trim()) onRename(id, renameVal.trim());
    setRenamingId(null);
  }

  return (
    <>
      <div className="pro-sidebar-backdrop" onClick={onClose} />
      <aside className="pro-sidebar" aria-label="Notebook manager">
        <div className="pro-sidebar__header">
          <span className="pro-sidebar__title">📓 Notebooks</span>
          <button className="pro-sidebar__close" onClick={onClose} aria-label="Close sidebar">×</button>
        </div>
        <button className="pro-sidebar__new-btn" onClick={onCreate}>＋ New Notebook</button>
        <div className="pro-sidebar__list" role="list">
          {notebooks.map(nb => (
            <div key={nb.id} className={'pro-nb-item' + (nb.id === activeId ? ' pro-nb-item--active' : '')}
              role="listitem" onClick={() => { onSelect(nb.id); onClose(); }}>
              <span className="pro-nb-item__icon">📄</span>
              {renamingId === nb.id ? (
                <input
                  ref={renameRef}
                  className="pro-nb-rename-input"
                  value={renameVal}
                  onChange={e => setRenameVal(e.target.value)}
                  onBlur={() => commitRename(nb.id)}
                  onKeyDown={e => {
                    e.stopPropagation();
                    if (e.key === 'Enter')  commitRename(nb.id);
                    if (e.key === 'Escape') setRenamingId(null);
                  }}
                  onClick={e => e.stopPropagation()}
                />
              ) : (
                <span className="pro-nb-item__title">{nb.title}</span>
              )}
              <span className="pro-nb-item__meta">
                {nb.updatedAt ? new Date(nb.updatedAt).toLocaleDateString() : ''}
              </span>
              <div className="pro-nb-item__actions" onClick={e => e.stopPropagation()}>
                <button className="pro-nb-item__act-btn" title="Rename"
                  onClick={() => startRename(nb)}>✎</button>
                <button className="pro-nb-item__act-btn pro-nb-item__act-btn--del" title="Delete"
                  onClick={() => {
                    if (window.confirm(`Delete "${nb.title}"?`)) onDelete(nb.id);
                  }}>×</button>
              </div>
            </div>
          ))}
        </div>
      </aside>
    </>
  );
}

/* ── PresentationMode ─────────────────────────────────────────────────────── */
const PRESENT_TYPE_LABEL = {
  odu: 'Odu Ifa', text: 'Text', code: 'Code', math: 'Math',
  schematics: 'Diagram', art: 'Ifagram', multimedia: 'Media',
  ai: 'AI', others: 'Note',
};

function PresentationMode({ cells, title, onExit }) {
  const [idx, setIdx] = useState(0);
  const cell = cells[idx];
  const progress = cells.length > 1 ? ((idx + 1) / cells.length) * 100 : 100;

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
        setIdx(i => Math.min(i + 1, cells.length - 1));
      }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        setIdx(i => Math.max(i - 1, 0));
      }
      if (e.key === 'Escape') onExit();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [cells.length, onExit]);

  function renderOduMarks(marks, color) {
    return (
      <div className="pro-present-odu__col">
        {marks.map((m, i) => (
          <div key={i}
            className={'pro-present-odu__mark' + (m === 1 ? ' pro-present-odu__mark--single' : ' pro-present-odu__mark--double')}
            style={{ color }}>
            <span className="pro-present-odu__bar" />
            {m === 0 && <span className="pro-present-odu__bar" />}
          </div>
        ))}
      </div>
    );
  }

  function renderCellContent(c) {
    if (!c) return null;

    if (c.type === 'odu') {
      const r = codeToOdu(c.right), l = codeToOdu(c.left);
      return (
        <div className="pro-present-odu">
          <div className="pro-present-odu__figures">
            <div className="pro-present-odu__figure">
              {renderOduMarks(c.left, l ? l.color : '#a78bfa')}
              <div className="pro-present-odu__figname" style={{ color: l ? l.color : '#a78bfa' }}>
                {l ? l.name : '?'}
              </div>
            </div>
            <div className="pro-present-odu__sep">✦</div>
            <div className="pro-present-odu__figure">
              {renderOduMarks(c.right, r ? r.color : '#f0920c')}
              <div className="pro-present-odu__figname" style={{ color: r ? r.color : '#f0920c' }}>
                {r ? r.name : '?'}
              </div>
            </div>
          </div>
          {c.oduName && (
            <div style={{ color: '#f0920c', fontSize: '1.15rem', fontWeight: 700, marginTop: 4 }}>{c.oduName}</div>
          )}
          {r && l && (
            <div style={{ color: '#4a5570', fontSize: '0.82rem', marginTop: 6 }}>
              #{r.num}–{l.num}{r.num === l.num ? ' · Méjì ✦' : ''}
              {c.oduTopic ? ' · ' + c.oduTopic : ''}
            </div>
          )}
        </div>
      );
    }

    if (c.type === 'text') {
      const isAebajiogbe = c.scriptMode === 'aebajiogbe';
      const font = isAebajiogbe
        ? "'Aebajiogbe Oduduwa', 'Noto Sans', sans-serif"
        : (c.font || DEFAULT_TEXT_FONT);
      const html = renderTextMarkdown(c.input || '', isAebajiogbe);
      return (
        <div className="pro-present-cell__text" style={{ fontFamily: font }}
          dangerouslySetInnerHTML={{ __html: html }} />
      );
    }

    if (c.type === 'multimedia') {
      const mt  = c.output ? c.output.mediaType : null;
      const url = c.output ? c.output.url : null;
      if (!url) return <div style={{ color: '#2a3a55', fontStyle: 'italic' }}>No media attached</div>;
      if (mt === 'docx') return (
        <div className="pro-present-media pro-present-media--doc">
          <div className="pro-present-doc-label">📄 {c.output.fileName || 'Word Document'}</div>
          <div className="pro-present-docx-wrap">
            <DocxViewer url={url} compact={false} />
          </div>
        </div>
      );
      if (mt === 'pptx') return (
        <div className="pro-present-media">
          <DocCard fileName={c.output.fileName} url={url} mediaType="pptx" dark />
        </div>
      );
      return (
        <div className="pro-present-media">
          {mt === 'image' && (
            <img src={url} alt={c.output.fileName || 'media'} className="pro-present-media__img" />
          )}
          {mt === 'video' && (
            <video src={url} controls className="pro-present-media__video" />
          )}
          {mt === 'audio' && (
            <audio src={url} controls className="pro-present-media__audio" />
          )}
          {mt === 'youtube' && (
            <iframe
              src={`https://www.youtube.com/embed/${youtubeId(url)}?rel=0`}
              className="pro-present-media__iframe"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen title="YouTube video" />
          )}
          {mt === 'vimeo' && (
            <iframe
              src={`https://player.vimeo.com/video/${vimeoId(url)}`}
              className="pro-present-media__iframe"
              allow="autoplay; fullscreen; picture-in-picture" allowFullScreen title="Vimeo video" />
          )}
          {mt === 'spotify' && (
            <iframe src={spotifyEmbedUrl(url)}
              className="pro-present-media__spotify"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              title="Spotify" />
          )}
          {mt === 'pdf' && (
            <PdfViewer url={url} className="pro-present-media__iframe" title={c.output.fileName || 'PDF'} />
          )}
          {mt === 'link' && (
            <LinkReader url={url} initEmbed={!!c.linkEmbed} />
          )}
          {c.output.fileName && (
            <p className="pro-present-media__filename">{c.output.fileName}</p>
          )}
        </div>
      );
    }

    if (c.type === 'code') {
      const hasOutput = c.output && Array.isArray(c.output.lines);
      const isErr = hasOutput && c.output.ok === false;
      return (
        <div className="pro-present-code-wrap">
          <div className="pro-present-code-label">
            <span className="pro-present-code-lang">{(c.lang || 'js').toUpperCase()}</span>
            <span>Code</span>
          </div>
          <pre className="pro-present-cell__code">{c.input || ''}</pre>
          {hasOutput && (
            <>
              <div className={'pro-present-output-label' + (isErr ? ' pro-present-output-label--err' : '')}>
                {isErr ? '✕ Error' : '▶ Output'}
              </div>
              <div className={'pro-present-cell__output' + (isErr ? ' pro-present-cell__output--err' : '')}>
                {c.output.lines.length === 0
                  ? <span className="pro-present-out-empty">✓ Ran — no output</span>
                  : c.output.lines.map((line, i) => (
                      <div key={i}>{line || '\u00A0'}</div>
                    ))
                }
              </div>
            </>
          )}
        </div>
      );
    }

    if (c.type === 'math') {
      if (c.output && c.output.html) {
        return <div style={{ fontSize: '1.6rem', textAlign: 'center' }}
          dangerouslySetInnerHTML={{ __html: c.output.html }} />;
      }
      return <pre className="pro-present-cell__code">{c.input || ''}</pre>;
    }

    if (c.type === 'schematics') {
      if (c.output && c.output.svg) {
        return <div dangerouslySetInnerHTML={{ __html: c.output.svg }}
          style={{ maxWidth: '100%', overflow: 'auto' }} />;
      }
      return <pre className="pro-present-cell__code">{c.input || ''}</pre>;
    }

    if (c.type === 'art' && c.canvasData) {
      return <img src={c.canvasData} alt="Ifagram"
        style={{ maxWidth: '100%', maxHeight: '60vh', borderRadius: 8, objectFit: 'contain' }} />;
    }

    if (c.type === 'ai') {
      return (
        <>
          {c.aiPrompt && (
            <div style={{ color: '#6e90b8', marginBottom: 12, fontStyle: 'italic' }}>"{c.aiPrompt}"</div>
          )}
          {c.output && c.output.text && (
            <div className="pro-present-cell__text">{c.output.text}</div>
          )}
        </>
      );
    }

    if (c.input) return <div className="pro-present-cell__text">{c.input}</div>;
    return <div style={{ color: '#2a3a55', fontStyle: 'italic' }}>Empty cell</div>;
  }

  return (
    <div className="pro-present-overlay" role="dialog" aria-label="Presentation mode">
      {/* Progress bar */}
      <div className="pro-present-progress">
        <div className="pro-present-progress__bar" style={{ width: progress + '%' }} />
      </div>

      {/* Top bar */}
      <div className="pro-present-topbar">
        <span className="pro-present-title">📽 {title}</span>
        <span className="pro-present-counter">{idx + 1} / {cells.length}</span>
        <button className="pro-present-exit" onClick={onExit}>
          ✕ Exit <kbd style={{ fontSize: '0.6rem', opacity: 0.6 }}>Esc</kbd>
        </button>
      </div>

      {/* Body */}
      <div className="pro-present-body"
        onClick={e => {
          const x = e.clientX / window.innerWidth;
          if (x < 0.3) setIdx(i => Math.max(i - 1, 0));
          else if (x > 0.7) setIdx(i => Math.min(i + 1, cells.length - 1));
        }}>

        {/* Side arrows */}
        {idx > 0 && (
          <button className="pro-present-arrow pro-present-arrow--left"
            onClick={e => { e.stopPropagation(); setIdx(i => Math.max(i - 1, 0)); }}
            aria-label="Previous">‹</button>
        )}
        {idx < cells.length - 1 && (
          <button className="pro-present-arrow pro-present-arrow--right"
            onClick={e => { e.stopPropagation(); setIdx(i => Math.min(i + 1, cells.length - 1)); }}
            aria-label="Next">›</button>
        )}

        <div className="pro-present-cell" onClick={e => e.stopPropagation()}>
          <div className="pro-present-cell__type">
            {PRESENT_TYPE_LABEL[cell?.type] || (cell?.type?.toUpperCase() || '')}
          </div>
          {renderCellContent(cell)}
        </div>
      </div>

      {/* Bottom nav */}
      <div className="pro-present-nav">
        <button className="pro-present-nav-btn"
          onClick={() => setIdx(i => Math.max(i - 1, 0))}
          disabled={idx === 0}>← Prev</button>
        <div className="pro-present-dots">
          {cells.map((_, i) => (
            <button key={i}
              className={'pro-present-dot' + (i === idx ? ' pro-present-dot--active' : '')}
              onClick={() => setIdx(i)} aria-label={`Slide ${i + 1}`} />
          ))}
        </div>
        <button className="pro-present-nav-btn"
          onClick={() => setIdx(i => Math.min(i + 1, cells.length - 1))}
          disabled={idx === cells.length - 1}>Next →</button>
      </div>
    </div>
  );
}

/* ── AiCell ───────────────────────────────────────────────────────────────── */
function AiCell({ cell, onChange, apiKey, onNeedKey }) {
  const [running, setRunning] = useState(false);

  async function callClaude() {
    if (!apiKey) { onNeedKey(); return; }
    const prompt = (cell.aiPrompt || '').trim();
    if (!prompt) return;
    setRunning(true);
    onChange({ output: null });
    try {
      const model = cell.aiModel || 'claude-haiku-4-5-20251001';
      const resp = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'content-type': 'application/json',
          'anthropic-dangerous-direct-browser-access': 'true',
        },
        body: JSON.stringify({
          model,
          max_tokens: 1024,
          messages: [{ role: 'user', content: prompt }],
        }),
      });
      if (!resp.ok) {
        const err = await resp.json().catch(() => ({ error: { message: resp.statusText } }));
        onChange({ output: { ok: false, text: 'API error: ' + (err.error?.message || resp.statusText) } });
      } else {
        const data = await resp.json();
        const text = data.content?.[0]?.text || '';
        onChange({ output: { ok: true, text, model, tokens: data.usage?.output_tokens } });
      }
    } catch(e) {
      onChange({ output: { ok: false, text: 'Network error: ' + e.message } });
    }
    setRunning(false);
  }

  return (
    <div className="nb-ai-cell" onClick={e => e.stopPropagation()}>
      <textarea
        className="nb-ai-prompt"
        placeholder="Ask Claude anything — Ifa wisdom, code help, explanations, analysis…"
        value={cell.aiPrompt || ''}
        rows={Math.max(3, ((cell.aiPrompt || '').match(/\n/g)||[]).length + 2)}
        onChange={e => onChange({ aiPrompt: e.target.value, output: null })}
        onFocus={e => e.stopPropagation()}
        disabled={running}
      />
      <div className="nb-ai-toolbar">
        <select className="nb-ai-model-select" value={cell.aiModel || 'claude-haiku-4-5-20251001'}
          onChange={e => onChange({ aiModel: e.target.value })}
          onClick={e => e.stopPropagation()}>
          <option value="claude-haiku-4-5-20251001">Haiku 4.5 — Fast</option>
          <option value="claude-sonnet-4-6">Sonnet 4.6 — Balanced</option>
          <option value="claude-opus-4-6">Opus 4.6 — Powerful</option>
        </select>
        <button className="nb-ai-run-btn" onClick={callClaude} disabled={running || !cell.aiPrompt?.trim()}>
          {running ? '⟳ Thinking…' : '✦ Ask Claude'}
        </button>
        <button className="nb-ai-key-btn" onClick={e => { e.stopPropagation(); onNeedKey(); }}
          title={apiKey ? 'Change API key' : 'Set API key'}>
          {apiKey ? '🔑 Key set' : '🔑 Set Key'}
        </button>
        {cell.output?.tokens && (
          <span className="nb-ai-usage">{cell.output.tokens} tokens</span>
        )}
      </div>
      {!apiKey && !cell.output && (
        <div className="nb-ai-key-prompt">
          Set your Anthropic API key to use the AI cell.
          <br />
          <button className="nb-ai-set-key-btn" onClick={e => { e.stopPropagation(); onNeedKey(); }}>
            Set API Key →
          </button>
        </div>
      )}
      {cell.output && (
        <div className={'nb-ai-response' + (cell.output.ok ? '' : ' nb-ai-response--error')}>
          {cell.output.ok && cell.output.model && (
            <div style={{ fontSize:'0.62rem', color:'#14b8d4', marginBottom:8, opacity:0.7 }}>
              {cell.output.model}
            </div>
          )}
          {cell.output.text}
        </div>
      )}
    </div>
  );
}

/* ── ApiKeyDialog ─────────────────────────────────────────────────────────── */
function ApiKeyDialog({ current, onSave, onClose }) {
  const [val, setVal] = useState(current || '');
  return (
    <div className="pro-apikey-overlay" onClick={onClose}>
      <div className="pro-apikey-dialog" onClick={e => e.stopPropagation()}>
        <p className="pro-apikey-title">🔑 Anthropic API Key</p>
        <p className="pro-apikey-desc">
          Enter your Anthropic API key to enable AI cells. Your key is stored only in your browser's
          localStorage and never sent anywhere except to api.anthropic.com.
        </p>
        <input className="pro-apikey-input" type="password"
          placeholder="sk-ant-…"
          value={val}
          onChange={e => setVal(e.target.value)}
          onKeyDown={e => { if (e.key==='Enter') onSave(val.trim()); if(e.key==='Escape') onClose(); }}
          autoFocus
        />
        <div className="pro-apikey-actions">
          <button className="pro-apikey-cancel" onClick={onClose}>Cancel</button>
          {current && (
            <button className="pro-apikey-cancel" style={{color:'#f43f5e',borderColor:'rgba(244,63,94,0.3)'}}
              onClick={() => onSave('')}>Clear Key</button>
          )}
          <button className="pro-apikey-save" onClick={() => onSave(val.trim())}>Save Key</button>
        </div>
      </div>
    </div>
  );
}

/* ── ShareDialog ──────────────────────────────────────────────────────────── */
function ShareDialog({ url, onClose }) {
  const [copied, setCopied] = useState(false);
  function copy() {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => { setCopied(true); setTimeout(()=>setCopied(false),2000); });
    }
  }
  return (
    <div className="pro-share-overlay" onClick={onClose}>
      <div className="pro-share-dialog" onClick={e => e.stopPropagation()}>
        <p className="pro-share-title">🔗 Share Notebook</p>
        <p className="pro-share-desc">
          This URL contains your full notebook encoded in the URL hash. Anyone with this link
          can open an exact copy of your current notebook.
        </p>
        <div className="pro-share-url-row">
          <textarea className="pro-share-url" readOnly value={url} rows={3} />
          <button className="pro-share-copy-btn" onClick={copy}>{copied ? '✓ Copied!' : '⎘ Copy'}</button>
        </div>
        <div className="pro-share-actions">
          <button className="pro-share-close" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

/* ── Main App (Pro) ───────────────────────────────────────────────────────── */
function App({ onLogout, noteUser }) {
  /* ── Pro: init state from localStorage ─────────────────────────────────── */
  const [notebooks,    setNotebooks]    = useState(() => {
    let nbs = proLoadAll();
    if (!nbs.length) {
      const def = proDefaultNotebook();
      nbs = [def];
      proSaveAll(nbs);
    }
    return nbs;
  });
  const [activeNbId,   setActiveNbId]   = useState(() => {
    const stored = proActiveId();
    const nbs = proLoadAll();
    return (stored && nbs.find(n=>n.id===stored)) ? stored : (nbs[0]?.id || null);
  });
  const [cells, setCells] = useState(() => {
    const nbs = proLoadAll();
    const aid = proActiveId() || nbs[0]?.id;
    const nb  = nbs.find(n => n.id === aid) || nbs[0];
    if (!nb) return [newNbCell('odu',{right:[1,1,1,1],left:[1,1,1,1]}), newNbCell('text',{input:''})];
    try { return deserializeNotebook(nb.data).cells; } catch { return [newNbCell('text',{input:''})]; }
  });
  const [nbTitle,      setNbTitle]      = useState(() => {
    const nbs = proLoadAll();
    const aid = proActiveId() || nbs[0]?.id;
    return nbs.find(n=>n.id===aid)?.title || 'Untitled IfaNote';
  });

  const [active,       setActive]       = useState(null);
  const [editTitle,    setEditTitle]    = useState(false);
  const [fileMenuOpen, setFileMenuOpen] = useState(false);

  /* ── Pro state ──────────────────────────────────────────────────────────── */
  const [theme,        setTheme]        = useState(() => localStorage.getItem(PRO_THEME_KEY) || 'dark');
  const [showSidebar,  setShowSidebar]  = useState(false);
  const [showPresent,  setShowPresent]  = useState(false);
  const [showShare,    setShowShare]    = useState(false);
  const [shareUrl,     setShareUrl]     = useState('');
  const [showApiKey,   setShowApiKey]   = useState(false);
  const [apiKey,       setApiKey]       = useState(() => localStorage.getItem(PRO_AI_KEY_KEY) || '');
  const [saveStatus,   setSaveStatus]   = useState('');   // '' | 'saving' | 'saved'
  const [focusMode,    setFocusMode]    = useState(false);

  const titleRef    = useRef(null);
  const fileMenuRef = useRef(null);
  const fileInputRef = useRef(null);
  const saveTimerRef = useRef(null);

  /* ── Apply theme to <html> ──────────────────────────────────────────────── */
  useEffect(() => {
    document.documentElement.dataset.theme = theme === 'dark' ? '' : theme;
    try { localStorage.setItem(PRO_THEME_KEY, theme); } catch {}
  }, [theme]);

  /* ── URL hash: load shared notebook on mount ────────────────────────────── */
  useEffect(() => {
    const shared = proLoadFromHash();
    if (shared && window.confirm('A shared IfaNote was detected in the URL. Open it as a new notebook?')) {
      const newNb = {
        id: proMakeId(),
        title: shared.title || 'Shared IfaNote',
        updatedAt: new Date().toISOString(),
        data: serializeNotebook(shared.cells, shared.title || 'Shared IfaNote'),
      };
      setNotebooks(nbs => { const next=[...nbs,newNb]; proSaveAll(next); return next; });
      setActiveNbId(newNb.id);
      proSetActiveId(newNb.id);
      setNbTitle(newNb.title);
      setCells(shared.cells);
      window.history.replaceState(null,'',window.location.pathname);
    }
  }, []); // eslint-disable-line

  /* ── Auto-save (debounced, 1.5 s after last change) ─────────────────────── */
  useEffect(() => {
    if (!activeNbId) return;
    setSaveStatus('saving');
    clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      setNotebooks(nbs => {
        const next = nbs.map(nb => nb.id === activeNbId
          ? { ...nb, title: nbTitle, updatedAt: new Date().toISOString(),
              data: serializeNotebook(cells, nbTitle) }
          : nb
        );
        proSaveAll(next);
        return next;
      });
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus(''), 2000);
    }, 1500);
  }, [cells, nbTitle, activeNbId]); // eslint-disable-line

  useEffect(() => {
    if (editTitle && titleRef.current) titleRef.current.focus();
  }, [editTitle]);

  useEffect(() => {
    function onOutsideClick(e) {
      if (fileMenuRef.current && !fileMenuRef.current.contains(e.target)) setFileMenuOpen(false);
    }
    document.addEventListener('mousedown', onOutsideClick);
    return () => document.removeEventListener('mousedown', onOutsideClick);
  }, []);

  useEffect(() => {
    function onKeyDown(e) {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        saveNotebook();
      }
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [cells, nbTitle]); // eslint-disable-line

  /* ── Pro: notebook management ────────────────────────────────────────────── */
  function proSelectNotebook(id) {
    // Save current first
    setNotebooks(nbs => {
      const next = nbs.map(nb => nb.id === activeNbId
        ? { ...nb, title: nbTitle, updatedAt: new Date().toISOString(), data: serializeNotebook(cells, nbTitle) }
        : nb
      );
      proSaveAll(next);
      // Load target
      const target = next.find(n => n.id === id);
      if (target) {
        setActiveNbId(id);
        proSetActiveId(id);
        try {
          const loaded = deserializeNotebook(target.data);
          setNbTitle(loaded.title || 'Untitled');
          setCells(loaded.cells);
        } catch {
          setNbTitle(target.title || 'Untitled');
          setCells([newNbCell('text',{input:''})]);
        }
        setActive(null);
      }
      return next;
    });
  }

  function proCreateNotebook() {
    const nb = { id: proMakeId(), title: 'Untitled IfaNote', updatedAt: new Date().toISOString(),
      data: serializeNotebook([newNbCell('odu',{right:[1,1,1,1],left:[1,1,1,1]}),newNbCell('text',{input:''})], 'Untitled IfaNote') };
    setNotebooks(nbs => { const next=[...nbs,nb]; proSaveAll(next); return next; });
    proSelectNotebook(nb.id);
  }

  function proRenameNotebook(id, title) {
    setNotebooks(nbs => {
      const next = nbs.map(nb => nb.id===id ? {...nb,title} : nb);
      proSaveAll(next);
      return next;
    });
    if (id === activeNbId) setNbTitle(title);
  }

  function proDeleteNotebook(id) {
    setNotebooks(nbs => {
      const next = nbs.filter(nb => nb.id !== id);
      if (!next.length) {
        const def = proDefaultNotebook();
        next.push(def);
      }
      proSaveAll(next);
      if (id === activeNbId) {
        const first = next[0];
        proSelectNotebook(first.id);
      }
      return next;
    });
  }

  /* ── Pro: API key management ─────────────────────────────────────────────── */
  function saveApiKey(key) {
    setApiKey(key);
    try {
      if (key) localStorage.setItem(PRO_AI_KEY_KEY, key);
      else localStorage.removeItem(PRO_AI_KEY_KEY);
    } catch {}
    setShowApiKey(false);
  }

  /* ── File management handlers ─────────────────────────────────────────── */
  function handleOpen(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = evt => {
      try {
        const { title, cells: loaded } = deserializeNotebook(evt.target.result);
        setNbTitle(title);
        setCells(loaded);
        setActive(null);
      } catch (err) {
        alert('Could not open file: ' + err.message);
      }
    };
    reader.readAsText(file);
    e.target.value = '';   // reset so the same file can be reopened
    setFileMenuOpen(false);
  }

  function saveNotebook() {
    const json = serializeNotebook(cells, nbTitle);
    const blob = new Blob([json], { type: 'application/json' });
    triggerDownload(URL.createObjectURL(blob), (nbTitle || 'notebook').replace(/\s+/g, '-').toLowerCase() + '.ifanb');
    setFileMenuOpen(false);
  }

  async function exportAsWord() {
    let fontFaceCSS = '';
    try {
      const resp = await fetch('./src/AebajiogbeOduduwa-Regular.woff'); // Pro: font in ./src/
      if (resp.ok) {
        const buf = await resp.arrayBuffer();
        const bytes = new Uint8Array(buf);
        let binary = '';
        for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
        fontFaceCSS = `@font-face{font-family:'Aebajiogbe Oduduwa';src:url('data:font/woff;base64,${btoa(binary)}') format('woff')}`;
      }
    } catch(_) { /* proceed without embedded font */ }
    const html = generateWordHTML(cells, nbTitle, fontFaceCSS);
    const blob = new Blob([html], { type: 'application/msword' });
    triggerDownload(URL.createObjectURL(blob), (nbTitle || 'notebook').replace(/\s+/g, '-').toLowerCase() + '.doc');
    setFileMenuOpen(false);
  }

  async function exportAsPDF() {
    setFileMenuOpen(false);
    let fontDataURI = null;
    try {
      const resp = await fetch('./src/AebajiogbeOduduwa-Regular.woff'); // Pro: font in ./src/
      if (resp.ok) {
        const buf = await resp.arrayBuffer();
        const bytes = new Uint8Array(buf);
        let binary = '';
        for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
        fontDataURI = `data:font/woff;base64,${btoa(binary)}`;
      }
    } catch(_) {}
    const fontFaceCSS = fontDataURI
      ? `@font-face{font-family:'Aebajiogbe Oduduwa';src:url('${fontDataURI}') format('woff')}`
      : '';
    const esc = s => (s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    const hasMathOutput = cells.some(c => c.type === 'math' && c.output && c.output.html);
    const body = buildExportBody(cells, 'pdf');
    const html = [
      '<!DOCTYPE html><html><head><meta charset="UTF-8">',
      `<title>${esc(nbTitle)}</title>`,
      hasMathOutput ? `<link rel="stylesheet" href="${KATEX_CDN}katex.min.css">` : '',
      '<style>',
      fontFaceCSS,
      EXPORT_BASE_CSS,
      '*{print-color-adjust:exact;-webkit-print-color-adjust:exact}',
      '@media print{body{margin:1.5cm}}',
      '</style></head><body>',
      `<h1>${esc(nbTitle)}</h1>`,
      body,
      '</body></html>',
    ].join('\n');
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const blobUrl = URL.createObjectURL(blob);
    const win = window.open(blobUrl, '_blank', 'width=900,height=700');
    win.addEventListener('load', async () => {
      // Explicitly load font via FontFace API — more reliable than fonts.ready for data URIs
      if (fontDataURI && win.FontFace) {
        try {
          const ff = new win.FontFace('Aebajiogbe Oduduwa', `url('${fontDataURI}')`);
          await ff.load();
          win.document.fonts.add(ff);
        } catch(_) {}
      }
      win.print();
    });
    win.addEventListener('afterprint', () => { win.close(); URL.revokeObjectURL(blobUrl); });
  }

  function duplicateNotebook() {
    const newTitle = 'Copy of ' + nbTitle;
    setCells(cs => cs.map(c => ({ ...c, id: ++_nbId, output: null, running: false })));
    setNbTitle(newTitle);
    setActive(null);
    setFileMenuOpen(false);
  }

  function deleteNotebook() {
    if (!window.confirm('Delete all cells and start a fresh notebook?')) return;
    setCells([
      newNbCell('odu',  { right: [1,1,1,1], left: [1,1,1,1] }),
      newNbCell('text', { input: '' }),
    ]);
    setNbTitle('Untitled IfaNote');
    setActive(null);
    setFileMenuOpen(false);
  }

  function updateCell(id, patch) {
    setCells(cs => cs.map(c => c.id === id ? { ...c, ...patch } : c));
  }

  function runCell(id) {
    setCells(cs => {
      const cell = cs.find(c => c.id === id);
      if (!cell || cell.running) return cs;

      if (cell.type === 'text') {
        return cs.map(c => c.id === id ? { ...c, output: { ok: true, lines: [] } } : c);
      }

      if (cell.type === 'code') {
        const lang = cell.lang || 'js';

        if (lang === 'js') {
          return cs.map(c => c.id === id ? { ...c, output: runJSCell(c.input) } : c);
        }
        if (lang === 'python') {
          const src = cell.input;
          runPythonCell(src)
            .then(result => updateCell(id, { running: false, output: result }))
            .catch(e    => updateCell(id, { running: false, output: { ok: false, lines: [String(e)] } }));
          return cs.map(c => c.id === id ? { ...c, running: true, output: null } : c);
        }
        if (lang === 'c') {
          return cs.map(c => c.id === id ? {
            ...c, output: { ok: true, lines: [
              'C compiler — Phase II.',
              'JS and Python are fully live — switch the language dropdown above to use them now.',
            ]}
          } : c);
        }
        // Scratch: no terminal output (handled by the info panel)
        return cs;
      }

      if (cell.type === 'math') {
        const src = (cell.input || '').trim();
        if (!src) return cs;
        loadKatexOnce()
          .then(katex => updateCell(id, { running: false, output: renderMathSrc(src, katex) }))
          .catch(e    => updateCell(id, { running: false, output: { ok: false, html: `<span style="color:#f87171">Failed to load KaTeX: ${e.message}</span>` } }));
        return cs.map(c => c.id === id ? { ...c, running: true, output: null } : c);
      }

      if (cell.type === 'schematics') {
        const src = (cell.input || '').trim();
        if (!src) return cs;
        const tool = cell.schemTool || 'mermaid';

        if (tool === 'mermaid') {
          if (isMermaidSrc(src)) {
            loadMermaidOnce()
              .then(async mermaid => {
                try {
                  const { svg } = await mermaid.render('nb-m-' + id + '-' + Date.now(), src);
                  updateCell(id, { running: false, output: { ok: true, svg } });
                } catch(e) {
                  updateCell(id, { running: false, output: { ok: false, svg: null, error: 'Diagram error: ' + e.message } });
                }
              })
              .catch(e => updateCell(id, { running: false, output: { ok: false, svg: null, error: String(e) } }));
            return cs.map(c => c.id === id ? { ...c, running: true, output: null } : c);
          }
          // ASCII art fallback in Mermaid mode
          return cs.map(c => c.id === id ? { ...c, output: { ok: true, svg: null } } : c);
        }

        if (tool === 'graphviz') {
          loadVizOnce()
            .then(viz => {
              try {
                const svg = viz.renderString(src, { format: 'svg' });
                updateCell(id, { running: false, output: { ok: true, svg } });
              } catch(e) {
                updateCell(id, { running: false, output: { ok: false, svg: null, error: 'DOT error: ' + e.message } });
              }
            })
            .catch(e => updateCell(id, { running: false, output: { ok: false, svg: null, error: String(e) } }));
          return cs.map(c => c.id === id ? { ...c, running: true, output: null } : c);
        }

        // svg / ascii: handled via onChange auto-render — Run is a no-op
        return cs;
      }

      // AI: AiCell manages its own async state — Run is a no-op here
      if (cell.type === 'ai') return cs;

      return cs;
    });
  }

  function runAll() {
    const pythonCells = cells.filter(c => c.type === 'code' && c.lang === 'python' && !c.running);
    const mathCells   = cells.filter(c => c.type === 'math' && !c.running && (c.input || '').trim() && (!c.mathTool || c.mathTool === 'latex'));
    const schemCells  = cells.filter(c => c.type === 'schematics' && !c.running && (c.input || '').trim() &&
      (!c.schemTool || c.schemTool === 'mermaid' || c.schemTool === 'graphviz'));

    setCells(cs => cs.map(c => {
      if (c.type === 'text') return { ...c, output: { ok: true, lines: [] } };
      if (c.type === 'code') {
        const lang = c.lang || 'js';
        if (lang === 'js')      return { ...c, output: runJSCell(c.input) };
        if (lang === 'python')  return { ...c, running: true, output: null };
        if (lang === 'c')       return { ...c, output: { ok: true, lines: ['C compiler — Phase II. Switch to JS or Python to run code now.'] } };
        return c; // scratch
      }
      if (c.type === 'math' && (c.input || '').trim() && (!c.mathTool || c.mathTool === 'latex')) return { ...c, running: true, output: null };
      if (c.type === 'schematics' && (c.input || '').trim() && (!c.schemTool || c.schemTool === 'mermaid' || c.schemTool === 'graphviz')) return { ...c, running: true, output: null };
      return c;
    }));

    pythonCells.forEach(c => {
      runPythonCell(c.input)
        .then(result => updateCell(c.id, { running: false, output: result }))
        .catch(e    => updateCell(c.id, { running: false, output: { ok: false, lines: [String(e)] } }));
    });

    mathCells.forEach(c => {
      loadKatexOnce()
        .then(katex => updateCell(c.id, { running: false, output: renderMathSrc(c.input.trim(), katex) }))
        .catch(e    => updateCell(c.id, { running: false, output: { ok: false, html: `<span style="color:#f87171">${e.message}</span>` } }));
    });

    schemCells.forEach(c => {
      const src  = c.input.trim();
      const tool = c.schemTool || 'mermaid';
      if (tool === 'graphviz') {
        loadVizOnce()
          .then(viz => {
            try {
              const svg = viz.renderString(src, { format: 'svg' });
              updateCell(c.id, { running: false, output: { ok: true, svg } });
            } catch(e) {
              updateCell(c.id, { running: false, output: { ok: false, svg: null, error: 'DOT error: ' + e.message } });
            }
          })
          .catch(e => updateCell(c.id, { running: false, output: { ok: false, svg: null, error: String(e) } }));
      } else if (isMermaidSrc(src)) {
        loadMermaidOnce()
          .then(async mermaid => {
            try {
              const { svg } = await mermaid.render('nb-m-' + c.id + '-' + Date.now(), src);
              updateCell(c.id, { running: false, output: { ok: true, svg } });
            } catch(e) {
              updateCell(c.id, { running: false, output: { ok: false, svg: null, error: 'Diagram error: ' + e.message } });
            }
          })
          .catch(e => updateCell(c.id, { running: false, output: { ok: false, svg: null, error: String(e) } }));
      } else {
        updateCell(c.id, { running: false, output: { ok: true, svg: null } });
      }
    });
  }

  function addCell(type) {
    setCells(cs => [...cs, newNbCell(type)]);
  }

  function deleteCell(id) {
    setCells(cs => cs.filter(c => c.id !== id));
  }

  function clearCell(id) {
    setCells(cs => cs.map(c => {
      if (c.id !== id) return c;
      // Odu: reset both sides to Ogbe (1111) and clear name/topic
      if (c.type === 'odu') return { ...c, right: [1,1,1,1], left: [1,1,1,1], oduName: '', oduTopic: '' };
      // Art: bump clearKey so IfagramCanvas remounts with a blank canvas
      if (c.type === 'art') return { ...c, canvasData: null, output: null, clearKey: (c.clearKey || 0) + 1 };
      // Others: wipe all text fields
      if (c.type === 'others') return { ...c, input: '', bookmarkTitle: '', bookmarkUrl: '', todos: [], output: null };
      // AI: clear prompt and response
      if (c.type === 'ai') return { ...c, aiPrompt: '', output: null };
      // Everything else: clear input + output
      return { ...c, input: '', output: null };
    }));
  }

  function moveCell(id, dir) {
    setCells(cs => {
      const idx  = cs.findIndex(c => c.id === id);
      const next = idx + dir;
      if (idx < 0 || next < 0 || next >= cs.length) return cs;
      const arr = [...cs];
      [arr[idx], arr[next]] = [arr[next], arr[idx]];
      return arr;
    });
  }

  return (
    <div className={'env-root' + (focusMode ? ' pro-focus-active' : '')}>

      {/* ── Presentation mode overlay ─────────────────────────────────────── */}
      {showPresent && (
        <PresentationMode cells={cells} title={nbTitle} onExit={() => setShowPresent(false)} />
      )}

      {/* ── Notebook sidebar ──────────────────────────────────────────────── */}
      {showSidebar && (
        <NotebookSidebar
          notebooks={notebooks}
          activeId={activeNbId}
          onSelect={proSelectNotebook}
          onCreate={proCreateNotebook}
          onRename={proRenameNotebook}
          onDelete={proDeleteNotebook}
          onClose={() => setShowSidebar(false)}
        />
      )}

      {/* ── Share dialog ──────────────────────────────────────────────────── */}
      {showShare && (
        <ShareDialog url={shareUrl} onClose={() => setShowShare(false)} />
      )}

      {/* ── API key dialog ─────────────────────────────────────────────────── */}
      {showApiKey && (
        <ApiKeyDialog current={apiKey} onSave={saveApiKey} onClose={() => setShowApiKey(false)} />
      )}

      {/* ── Top bar ──────────────────────────────────────────────────────── */}
      <header className="env-topbar">
        <div className="env-topbar__left">
          {/* Notebooks sidebar toggle */}
          <button className="pro-sidebar-btn" onClick={() => setShowSidebar(s => !s)} title="Manage notebooks">
            ☰ <span style={{fontSize:'0.68rem'}}>{notebooks.length}</span>
          </button>

          <span className="env-topbar__sep" aria-hidden="true">·</span>

          {/* Pro badge */}
          <span className="pro-badge"><span className="pro-badge__crown">♛</span> PRO</span>

          <span className="env-topbar__sep" aria-hidden="true">·</span>

          {/* Notebook title */}
          {editTitle ? (
            <input
              ref={titleRef}
              className="env-title-input"
              value={nbTitle}
              onChange={e => setNbTitle(e.target.value)}
              onBlur={() => setEditTitle(false)}
              onKeyDown={e => { if (e.key === 'Enter' || e.key === 'Escape') setEditTitle(false); }}
              aria-label="Notebook title"
            />
          ) : (
            <button className="env-title-btn" onClick={() => setEditTitle(true)} title="Click to rename">
              📓 {nbTitle}
            </button>
          )}

          {/* Auto-save indicator */}
          <span className={'pro-save-indicator' + (saveStatus === 'saved' ? ' pro-save-indicator--saved' : saveStatus === 'saving' ? ' pro-save-indicator--saving' : '')}>
            {saveStatus === 'saving' ? '◌ saving…' : saveStatus === 'saved' ? '✓ saved' : ''}
          </span>
        </div>

        <div className="env-topbar__center">
          <button className="nb-add-btn nb-add-btn--odu"        onClick={() => addCell('odu')}>＋ Odu</button>
          <button className="nb-add-btn nb-add-btn--text"       onClick={() => addCell('text')}>＋ Text</button>
          <button className="nb-add-btn nb-add-btn--code"       onClick={() => addCell('code')}>＋ Code</button>
          <button className="nb-add-btn nb-add-btn--art"        onClick={() => addCell('art')}>＋ Art</button>
          <button className="nb-add-btn nb-add-btn--multimedia" onClick={() => addCell('multimedia')}>＋ Media</button>
          <button className="nb-add-btn nb-add-btn--math"       onClick={() => addCell('math')}>＋ Math</button>
          <button className="nb-add-btn nb-add-btn--schematics" onClick={() => addCell('schematics')}>＋ Schem</button>
          <button className="nb-add-btn nb-add-btn--others"     onClick={() => addCell('others')}>＋ Others</button>
          <button className="nb-add-btn" style={{'--nb-add-clr':'#14b8d4'}} onClick={() => addCell('ai')}>＋ AI</button>
          <button className="nb-add-btn nb-add-btn--lang" onClick={() => addCell('lang')}>＋ Lang</button>
        </div>

        <div className="env-topbar__right">
          {/* Theme picker */}
          <select className="pro-theme-select" value={theme} onChange={e => setTheme(e.target.value)} title="Switch theme">
            <option value="dark">🌑 Dark</option>
            <option value="light">☀ Light</option>
            <option value="gold">✦ Gold</option>
            <option value="ocean">🌊 Ocean</option>
          </select>

          {/* Focus mode */}
          <button className={'pro-topbar-btn' + (focusMode ? ' pro-topbar-btn--present' : '')}
            onClick={() => setFocusMode(f => !f)}
            title={focusMode ? 'Exit focus mode' : 'Focus mode — dim all but active cell'}>
            {focusMode ? '◎ Focus On' : '◌ Focus'}
          </button>

          {/* Present */}
          <button className="pro-topbar-btn pro-topbar-btn--present"
            onClick={() => setShowPresent(true)}
            title="Presentation mode">
            📽 Present
          </button>

          {/* Share */}
          <button className="pro-topbar-btn pro-topbar-btn--share"
            onClick={() => { setShareUrl(proShareUrl(cells, nbTitle)); setShowShare(true); }}
            title="Share notebook via URL">
            🔗 Share
          </button>

          {/* AI key */}
          <button className="pro-topbar-btn pro-topbar-btn--ai"
            onClick={() => setShowApiKey(true)}
            title={apiKey ? 'Claude API key set — click to change' : 'Set Claude API key for AI cells'}>
            {apiKey ? '✦ AI' : '✦ AI Key'}
          </button>

          <button className="nb-run-all-btn" onClick={runAll} title="Run all cells">▶▶ Run All</button>

          {/* ── Save button ───────────────────────────────────────────── */}
          <button className="nb-save-btn" onClick={saveNotebook} title="Save notebook to computer (.ifanb) — Ctrl+S">
            💾 Save
          </button>

          {/* ── File menu ─────────────────────────────────────────────── */}
          <div className="nb-file-menu" ref={fileMenuRef}>
            <button
              className={'nb-file-btn' + (fileMenuOpen ? ' nb-file-btn--open' : '')}
              onClick={() => setFileMenuOpen(o => !o)}
              title="Open, save, export this notebook"
            >
              File ▾
            </button>

            {fileMenuOpen && (
              <div className="nb-file-dropdown" role="menu">
                <button className="nb-file-item" role="menuitem"
                  onClick={() => { fileInputRef.current.click(); setFileMenuOpen(false); }}>
                  📂 Open…
                </button>
                <div className="nb-file-sep" />
                <button className="nb-file-item" role="menuitem" onClick={saveNotebook}>
                  💾 Download  <span className="nb-file-hint">.ifanb</span>
                </button>
                <div className="nb-file-sep" />
                <div className="nb-file-section-label">Export As</div>
                <button className="nb-file-item nb-file-item--sub" role="menuitem"
                  onClick={() => { exportIfa(cells, nbTitle); setFileMenuOpen(false); }}>
                  Plain text  <span className="nb-file-hint">.ifa</span>
                </button>
                <button className="nb-file-item nb-file-item--sub" role="menuitem" onClick={exportAsWord}>
                  Word  <span className="nb-file-hint">.doc</span>
                </button>
                <button className="nb-file-item nb-file-item--sub" role="menuitem" onClick={exportAsPDF}>
                  PDF  <span className="nb-file-hint">print dialog</span>
                </button>
                <div className="nb-file-sep" />
                <button className="nb-file-item" role="menuitem" onClick={duplicateNotebook}>
                  ⧉ Duplicate
                </button>
                <div className="nb-file-sep" />
                <button className="nb-file-item nb-file-item--danger" role="menuitem"
                  onClick={deleteNotebook}>
                  🗑 New notebook
                </button>
              </div>
            )}
          </div>

          <input ref={fileInputRef} type="file" accept=".ifanb,.json"
            style={{ display: 'none' }} onChange={handleOpen} />

          {/* ── User / logout ─────────────────────────────────────────── */}
          {noteUser && (
            <div className="pro-user-badge" title={`Signed in as ${noteUser.name}`}>
              <span className="pro-user-badge__name">{noteUser.name.split(' ')[0]}</span>
              <button className="pro-user-badge__logout" onClick={onLogout} title="Sign out">⏻</button>
            </div>
          )}
        </div>
      </header>

      {/* ── Notebook area ────────────────────────────────────────────────── */}
      <main className="env-main" role="main" aria-label="IfaNote Pro notebook">
        <div className="nb-cells" role="list" aria-label="Notebook cells">
          {cells.map((cell, idx) => (
            <NbCell
              key={cell.id}
              cell={cell}
              idx={idx}
              active={active === cell.id}
              onFocus={() => setActive(cell.id)}
              onRun={() => runCell(cell.id)}
              onDelete={() => deleteCell(cell.id)}
              onClear={() => clearCell(cell.id)}
              onMoveUp={() => moveCell(cell.id, -1)}
              onMoveDown={() => moveCell(cell.id, 1)}
              onChange={patch => updateCell(cell.id, patch)}
              isFirst={idx === 0}
              isLast={idx === cells.length - 1}
              apiKey={apiKey}
              onNeedKey={() => setShowApiKey(true)}
            />
          ))}
        </div>

        {/* Bottom add row */}
        <div className="nb-add-row">
          <button className="nb-add-inline nb-add-inline--odu"        onClick={() => addCell('odu')}>+ Odu</button>
          <button className="nb-add-inline nb-add-inline--text"       onClick={() => addCell('text')}>+ Text</button>
          <button className="nb-add-inline nb-add-inline--code"       onClick={() => addCell('code')}>+ Code</button>
          <button className="nb-add-inline nb-add-inline--art"        onClick={() => addCell('art')}>+ Art</button>
          <button className="nb-add-inline nb-add-inline--multimedia" onClick={() => addCell('multimedia')}>+ Media</button>
          <button className="nb-add-inline nb-add-inline--math"       onClick={() => addCell('math')}>+ Math</button>
          <button className="nb-add-inline nb-add-inline--schematics" onClick={() => addCell('schematics')}>+ Schematics</button>
          <button className="nb-add-inline nb-add-inline--others"     onClick={() => addCell('others')}>+ Others</button>
          <button className="nb-add-inline" style={{'--nb-add-clr':'#14b8d4'}} onClick={() => addCell('ai')}>+ AI</button>
          <button className="nb-add-inline nb-add-inline--lang" onClick={() => addCell('lang')}>+ Lang</button>
        </div>

        <div className="nb-footer-note">
          <span>⚡ JS · 🐍 Python (Pyodide)</span>
          <span>·</span>
          <span>🎨 Ifagram · ▶ Multimedia</span>
          <span>·</span>
          <span>∑ Math (KaTeX) · ⊞ Mermaid</span>
          <span>·</span>
          <span>✦ All 256 Odu Ifa</span>
          <span>·</span>
          <span>🐱 Scratch · C — Phase II</span>
        </div>
      </main>
    </div>
  );
}

// ── Auth wrapper — keeps all App hooks unconditional ────────────────────────
function AppRoot() {
  const [unlocked, setUnlocked] = useState(() => getNoteSession() !== null);
  const [noteUser, setNoteUser] = useState(() => getNoteSession());

  function handleUnlock() {
    const session = getNoteSession();
    setNoteUser(session);
    setUnlocked(true);
  }

  function handleLogout() {
    localStorage.removeItem(NOTE_SESSION_KEY);
    setNoteUser(null);
    setUnlocked(false);
  }

  if (!unlocked) {
    return <SubscriptionGate onUnlock={handleUnlock} />;
  }

  return <App onLogout={handleLogout} noteUser={noteUser} />;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<AppRoot />);
