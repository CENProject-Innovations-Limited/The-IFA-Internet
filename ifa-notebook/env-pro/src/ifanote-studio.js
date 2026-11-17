/* ==========================================================================
   IfaNote Studio — IfaLabs + Ilé Arọ́ integration for IfaNote Pro (env-pro)

   Load AFTER src/App.jsx. Vanilla JS, no dependencies. It never edits the
   React app or the saved notebooks directly: every notebook action goes
   through IfaNote's own buttons and inputs (e.g. "+ Media" → File), so the
   app stays the single owner of its data.

   Adds
     • Activity rail (right) ............ Ilé Arọ́ · IfaLabs · Commands · Look
     • Studio dock ....................... live Ilé Arọ́ benches (same-origin
                                           iframe) + IfaLabs directory/viewer
     • Insert design into notebook ....... Logic / Blueprint / Register →
                                           new Media cell (SVG)
     • Command palette ................... Ctrl/⌘+K or Ctrl/⌘+Shift+P
     • Status bar ........................ save state · cells · theme
   Shortcuts: Alt+I Ilé Arọ́ · Alt+L IfaLabs · Esc closes palette
   ========================================================================== */
(function () {
  'use strict';
  if (window.__ifaNoteStudio) return;
  window.__ifaNoteStudio = true;

  const ILE_URL = '/ifa-labs/ile-aro/';
  const LS_KEY = 'ifs.studio.v1';
  const root = document.documentElement;

  /* ---------- state ------------------------------------------------------ */
  const state = Object.assign(
    { open: false, pane: 'ile', ileMode: 'logic', width: 560, classic: false },
    safeJSON(lsGet(LS_KEY))
  );
  function save() { lsSet(LS_KEY, JSON.stringify(state)); }
  function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* quota / private mode */ } }
  function safeJSON(s) { try { return s ? JSON.parse(s) : {}; } catch (e) { return {}; } }

  /* ---------- helpers ---------------------------------------------------- */
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  function h(tag, attrs, ...kids) {
    const el = document.createElement(tag);
    for (const k in attrs || {}) {
      const v = attrs[k];
      if (v == null || v === false) continue;
      if (k === 'class') el.className = v;
      else if (k === 'html') el.innerHTML = v;
      else if (k.startsWith('on')) el.addEventListener(k.slice(2), v);
      else el.setAttribute(k, v === true ? '' : v);
    }
    kids.flat().forEach(c => c != null && el.append(c.nodeType ? c : document.createTextNode(c)));
    return el;
  }
  function waitFor(fn, ms = 2500) {
    return new Promise((res, rej) => {
      const t0 = performance.now();
      (function tick() {
        let v; try { v = fn(); } catch (e) { v = null; }
        if (v) return res(v);
        if (performance.now() - t0 > ms) return rej(new Error('timeout'));
        requestAnimationFrame(tick);
      })();
    });
  }
  // Diacritic-insensitive matching: "ile aro" finds "Ilé Arọ́", "ise ona" finds "Iṣẹ́ Ọnà"
  const fold = s => s.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase();
  const isEditable = el => el && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName));
  const stamp = () => {
    const d = new Date(), p = n => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}-${p(d.getHours())}${p(d.getMinutes())}`;
  };

  const ICON = {
    ile: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11 12 4l9 7"/><path d="M5 10v10h14V10"/><path d="M9 20v-5a3 3 0 0 1 6 0v5"/></svg>',
    labs: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3h6"/><path d="M10 3v6L4.5 18.5A1.7 1.7 0 0 0 6 21h12a1.7 1.7 0 0 0 1.5-2.5L14 9V3"/><path d="M7.5 15h9"/></svg>',
    cmd: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3z"/></svg>',
    look: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18"/><path d="M8 13h5M8 16h8"/><path d="M19 12v6"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    ext: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4h6v6"/><path d="M20 4 10 14"/><path d="M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5"/></svg>',
    insert: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v10"/><path d="m7 10 5 5 5-5"/><path d="M5 19h14"/></svg>',
    dl: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4v11"/><path d="m7 11 5 5 5-5"/><path d="M4 20h16"/></svg>',
    copy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a1 1 0 0 1 1-1h10"/></svg>',
    back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 6l-6 6 6 6"/></svg>',
    reload: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 11a8 8 0 1 0-2.3 5.7"/><path d="M20 5v6h-6"/></svg>'
  };
  const icon = k => { const s = h('span', { 'aria-hidden': 'true', style: 'display:contents' }); s.innerHTML = ICON[k]; return s; };

  /* ---------- IfaLabs directory (from ifainternet.org/ifa-labs) ---------- */
  const LABS = [
    { g: 'S', name: 'Ifa Science Lab', field: 'Natural Science', c: '#3ecf8e',
      d: 'Energy and nature through Ifa — Ogbenergy, Oyeku Anergy, energy fields and Ifa Simulation Theory.',
      links: [['Ifa Analysis', '/ifa-analysis/']] },
    { g: 'T', name: 'Ifa Technology Lab', field: 'Technology', c: '#4c9bff',
      d: 'Build with IfaLang: networks, computing and intelligent systems.',
      links: [['IfAI: ToEAI', 'https://toe.cenproject.org/sample-page/'], ['IFABitcoin', 'https://toe.cenproject.org/ifabitcoin/']] },
    { g: 'E', name: 'Ifa Engineering Lab', field: 'Engineering', c: '#f0920c',
      d: 'Iṣẹ́ Ọnà Ayárabíàṣá — design with IfaCAD and OrisaCAD, guided by Green Engineering.',
      links: [['Ilé Arọ́ playground', '#ile', true], ['Iṣẹ́ Ọnà Ayárabíàṣá', '/ifa-labs/#ise-ona'], ['IfaCAD', '/ifa-labs/#ifacad'], ['OrisaCAD', '/ifa-labs/#orisacad']] },
    { g: 'A', name: 'Ifa Arts Lab', field: 'Art & Design', c: '#f472b6',
      d: 'Ifarts and Orisarts, IfaDesigns and OrisaDesigns from the Ifa Graphical Language System.',
      links: [['Ifa Art', '/ifa-art/'], ['IfaDiagram', '/ifagram/']] },
    { g: 'M', name: 'Ifa Mathematics Lab', field: 'Mathematics', c: '#a78bfa',
      d: 'The binary structure of the 256 Odu Ifa, IfaGebra and Ifa Calculus.',
      links: [['IFA Mathematics', 'https://toe.cenproject.org/ifa-mathematics-toe-mathematics/'], ['IfaGebra', 'https://toe.cenproject.org/ifagebra-overview/'], ['Ifa Calculus', 'https://toe.cenproject.org/ifa-calculus-toe-calculus/']] },
    { g: '4+', name: 'IfaLab For Children', field: 'Kids & Teens', c: '#2dd4bf',
      d: 'Ifa STEAM for young learners — Orisa characters, Yoruba counting, Odu patterns and Ifanimations.',
      links: [['Ifagrams for Kids & Teens', '/ifagram/kids/']] },
    { g: '◎', name: 'More from IfaLabs', field: 'Playgrounds & games', c: '#eab308',
      d: 'Other student spaces and the wider IfaLabs platform.',
      links: [['IfaLabs home', '/ifa-labs/'], ['IfaLens Playground', '/ifa-lens/'], ['IfaGames', '/ifa-labs/#ifagames'], ['Play IfaGames', 'https://playifagames.org/'], ['ToELabs', 'https://toe.cenproject.org/ifalabs-toelabs/']] }
  ];
  const isInternal = url => url.startsWith('/') && !url.startsWith('//');

  /* ---------- Ilé Arọ́ modes --------------------------------------------- */
  const MODES = [
    { id: 'start', label: 'Projects' },
    { id: 'logic', label: 'Logic', capture: 'Logic & Circuits' },
    { id: 'blueprint', label: 'Blueprint', capture: 'Blueprint' },
    { id: 'register', label: 'Register', capture: 'Odu Register' },
    { id: 'full', label: 'Full page' }
  ];
  const PROJECT_TO_MODE = { 'ogbe-lamp': 'logic', encoder: 'logic', 'half-adder': 'logic', duality: 'logic', pavilion: 'blueprint', count: 'register' };

  const EMBED_CSS = `
    .ground, #app > header.header, #app > footer.footer { display: none !important; }
    html.ifs-embed-focus #app > main > section:not(.ifs-show) { display: none !important; }
    html.ifs-embed-focus #app > main > section.ifs-show { margin: 0 !important; padding-top: 16px !important; padding-bottom: 24px !important; min-height: 0 !important; }
    html.ifs-embed-focus, html.ifs-embed-focus body { scroll-behavior: auto !important; }
  `;

  /* ========================================================================
     Build UI
     ======================================================================== */
  let rail, dock, status, palette, toastEl, ileFrame, ileLoading, insertBtn, dlBtn, copyBtn, actionNote;
  let labsList, viewer, viewerFrame, viewerTitle, viewerUrl;

  function build() {
    /* rail */
    rail = h('nav', { id: 'ifs-rail', class: 'ifs-ui', 'aria-label': 'Studio' },
      h('button', { type: 'button', 'data-k': 'ile', 'data-tip': 'Ilé Arọ́ (Alt+I)', 'aria-label': 'Ilé Arọ́', onclick: () => togglePane('ile') }, icon('ile')),
      h('button', { type: 'button', 'data-k': 'labs', 'data-tip': 'IfaLabs (Alt+L)', 'aria-label': 'IfaLabs', onclick: () => togglePane('labs') }, icon('labs')),
      h('span', { class: 'ifs-rail__sep' }),
      h('button', { type: 'button', 'data-tip': 'Commands (Ctrl+K)', 'aria-label': 'Command palette', onclick: openPalette }, icon('cmd')),
      h('button', { type: 'button', 'data-k': 'look', 'data-tip': 'Studio / Classic look', 'aria-label': 'Toggle Studio look', onclick: toggleLook }, icon('look'))
    );

    /* dock */
    const resize = h('div', { class: 'ifs-resize', title: 'Drag to resize', onpointerdown: startResize });

    // Ilé Arọ́ pane
    const seg = h('div', { class: 'ifs-seg', role: 'group', 'aria-label': 'Ilé Arọ́ workbench' },
      MODES.map(m => h('button', { type: 'button', 'data-mode': m.id, onclick: () => setIleMode(m.id) }, m.label)));
    insertBtn = h('button', { type: 'button', class: 'ifs-btn ifs-btn--primary', onclick: insertDesign }, icon('insert'), 'Insert into notebook');
    dlBtn = h('button', { type: 'button', class: 'ifs-btn', onclick: downloadDesign, title: 'Download as .svg' }, icon('dl'), 'SVG');
    copyBtn = h('button', { type: 'button', class: 'ifs-btn', onclick: copyDesign, title: 'Copy SVG markup' }, icon('copy'), 'Copy');
    actionNote = h('div', { class: 'ifs-note' });
    ileLoading = h('div', { class: 'ifs-loading' }, 'Opening Ilé Arọ́…');
    ileFrame = h('iframe', { title: 'Ilé Arọ́: IfaCAD and OrisaCAD Playground', allow: 'clipboard-write' });
    ileFrame.addEventListener('load', onIleLoad);
    const paneIle = h('section', { class: 'ifs-pane', 'data-pane': 'ile' },
      seg,
      h('div', { class: 'ifs-actions' }, insertBtn, dlBtn, copyBtn, actionNote),
      h('div', { class: 'ifs-frame-wrap' }, ileFrame, ileLoading)
    );

    // IfaLabs pane
    labsList = h('div', { class: 'ifs-labs' },
      LABS.map(L => h('article', { class: 'ifs-lab', style: `--lab:${L.c}` },
        h('div', { class: 'ifs-lab__top' },
          h('span', { class: 'ifs-lab__glyph', 'aria-hidden': 'true' }, L.g),
          h('div', null, h('div', { class: 'ifs-lab__name' }, L.name), h('div', { class: 'ifs-lab__field' }, L.field))),
        h('p', null, L.d),
        h('div', { class: 'ifs-lab__links' },
          L.links.map(([t, u, star]) => h('button', {
            type: 'button', class: 'ifs-chip' + (star ? ' ifs-chip--star' : ''),
            onclick: () => star ? showPane('ile') : openLab(t, u)
          }, t, isInternal(u) || star ? null : icon('ext'))))
      )),
      h('div', { class: 'ifs-labs__foot' }, 'Labs on ifainternet.org open here beside your notebook; external sites open in a new tab.')
    );
    viewerTitle = h('b');
    viewerFrame = h('iframe', { title: 'IfaLabs' });
    viewer = h('div', { class: 'ifs-viewer' },
      h('div', { class: 'ifs-viewer__bar' },
        h('button', { type: 'button', class: 'ifs-iconbtn', onclick: closeLab }, icon('back'), 'Labs'),
        viewerTitle, h('span', { class: 'ifs-spacer', style: 'flex:1' }),
        h('button', { type: 'button', class: 'ifs-iconbtn', title: 'Open in a new tab', onclick: () => window.open(viewerUrl, '_blank', 'noopener') }, icon('ext'))),
      h('div', { class: 'ifs-frame-wrap' }, viewerFrame));
    const paneLabs = h('section', { class: 'ifs-pane', 'data-pane': 'labs' }, labsList, viewer);

    const headTitle = h('div', null, h('div', { class: 'ifs-dock__title' }), h('div', { class: 'ifs-dock__sub' }));
    dock = h('aside', { id: 'ifs-dock', class: 'ifs-ui', 'aria-label': 'Studio dock' },
      resize,
      h('header', { class: 'ifs-dock__head' }, headTitle, h('span', { class: 'ifs-spacer' }),
        h('button', { type: 'button', class: 'ifs-iconbtn', title: 'Reload', 'aria-label': 'Reload', onclick: reloadPane }, icon('reload')),
        h('button', { type: 'button', class: 'ifs-iconbtn', title: 'Open in a new tab', 'aria-label': 'Open in a new tab', onclick: popOut }, icon('ext')),
        h('button', { type: 'button', class: 'ifs-iconbtn', title: 'Close panel', 'aria-label': 'Close panel', onclick: closeDock }, icon('close'))),
      paneIle, paneLabs);

    /* status bar */
    status = h('footer', { id: 'ifs-status', class: 'ifs-ui', role: 'status' },
      h('span', null, h('i', { class: 'ifs-dot', 'data-s': 'dot' }), h('span', { 'data-s': 'save' }, 'Ready')),
      h('span', { 'data-s': 'cells', class: 'ifs-hide-sm' }),
      h('span', { 'data-s': 'theme', class: 'ifs-hide-sm' }),
      h('span', { class: 'ifs-spacer' }),
      h('button', { type: 'button', onclick: () => togglePane('ile') }, 'Ilé Arọ́'),
      h('button', { type: 'button', onclick: () => togglePane('labs') }, 'IfaLabs'),
      h('button', { type: 'button', onclick: openPalette, class: 'ifs-hide-sm' }, 'Commands ', h('kbd', null, navigator.platform.includes('Mac') ? '⌘K' : 'Ctrl K'))
    );

    /* palette */
    const input = h('input', { type: 'text', placeholder: 'Type a command — e.g. “blueprint”, “insert code”, “gold”…', 'aria-label': 'Command', autocomplete: 'off', spellcheck: 'false' });
    const list = h('ul', { role: 'listbox' });
    palette = h('div', { class: 'ifs-palette-back ifs-ui', onmousedown: e => { if (e.target === palette) closePalette(); } },
      h('div', { class: 'ifs-palette', role: 'dialog', 'aria-label': 'Command palette' }, input, list));
    palette._input = input; palette._list = list;
    input.addEventListener('input', renderPalette);
    input.addEventListener('keydown', paletteKeys);

    toastEl = h('div', { id: 'ifs-toast', class: 'ifs-ui', role: 'status', 'aria-live': 'polite' });

    document.body.append(rail, dock, status, palette, toastEl);
  }

  /* ========================================================================
     Dock behaviour
     ======================================================================== */
  function applyChrome() {
    root.classList.add('ifs-tools');
    root.classList.toggle('ifs', !state.classic);
    root.classList.toggle('ifs-dock-open', !!state.open);
    root.style.setProperty('--ifs-dock-w', clampW(state.width) + 'px');
    $$('#ifs-rail [data-k]').forEach(b => {
      const k = b.dataset.k;
      b.setAttribute('aria-pressed', k === 'look' ? String(!state.classic) : String(state.open && state.pane === k));
    });
    $$('.ifs-pane', dock).forEach(p => p.classList.toggle('is-on', p.dataset.pane === state.pane));
    const [t, s] = $$('.ifs-dock__head > div:first-child > div', dock);
    if (state.pane === 'ile') { t.textContent = 'Ilé Arọ́'; s.textContent = 'IfaCAD and OrisaCAD Playground'; }
    else { t.textContent = 'IfaLabs'; s.textContent = 'ToELabs · an IfaLab for every field of STEAM'; }
    $$('.ifs-seg button', dock).forEach(b => b.setAttribute('aria-pressed', String(b.dataset.mode === state.ileMode)));
    const m = MODES.find(x => x.id === state.ileMode);
    const can = !!(m && m.capture);
    [insertBtn, dlBtn, copyBtn].forEach(b => { b.disabled = !can; });
    actionNote.textContent = can
      ? `Adds a snapshot of the ${m.capture} bench as a new Media cell at the end of this notebook.`
      : state.ileMode === 'start'
        ? 'Pick a project — the panel follows it to the right bench.'
        : 'Choose Logic, Blueprint or Register to insert a design.';
  }
  const clampW = w => Math.max(340, Math.min(Math.round(window.innerWidth * 0.72), w || 560));

  function showPane(p) {
    state.open = true; state.pane = p; save(); applyChrome();
    if (p === 'ile') ensureIle();
  }
  function togglePane(p) { (state.open && state.pane === p) ? closeDock() : showPane(p); }
  function closeDock() { state.open = false; save(); applyChrome(); }

  function startResize(e) {
    e.preventDefault();
    root.classList.add('ifs-dragging');
    const rw = parseFloat(getComputedStyle(root).getPropertyValue('--ifs-rail')) || 0;
    const move = ev => { state.width = clampW(window.innerWidth - rw - ev.clientX); root.style.setProperty('--ifs-dock-w', state.width + 'px'); };
    const up = () => { root.classList.remove('ifs-dragging'); window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up); save(); };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  }

  function reloadPane() {
    if (state.pane === 'ile') { ileLoading.hidden = false; ileFrame.contentWindow && ileFrame.contentWindow.location.reload(); }
    else if (viewer.classList.contains('is-on')) viewerFrame.contentWindow.location.reload();
  }
  function popOut() {
    const url = state.pane === 'ile' ? ILE_URL + (state.ileMode !== 'full' ? '#' + state.ileMode : '') : (viewer.classList.contains('is-on') ? viewerUrl : '/ifa-labs/');
    window.open(url, '_blank', 'noopener');
  }

  /* ---------- IfaLabs ---------------------------------------------------- */
  function openLab(title, url) {
    if (!isInternal(url)) { window.open(url, '_blank', 'noopener'); return; }
    viewerUrl = url; viewerTitle.textContent = title;
    if (viewerFrame.getAttribute('src') !== url) viewerFrame.src = url;
    labsList.style.display = 'none'; viewer.classList.add('is-on');
    showPane('labs');
  }
  function closeLab() { viewer.classList.remove('is-on'); labsList.style.display = ''; }

  /* ---------- Ilé Arọ́ ---------------------------------------------------- */
  function ensureIle() { if (!ileFrame.getAttribute('src')) { ileLoading.hidden = false; ileFrame.src = ILE_URL; } }
  function ileDoc() { try { return ileFrame.contentDocument; } catch (e) { return null; } }

  function onIleLoad() {
    ileLoading.hidden = true;
    const d = ileDoc();
    if (!d) return;
    const signedOut = /ifa-auth/.test(d.location.pathname) || !d.getElementById('logic');
    if (signedOut) {
      actionNote.textContent = 'Sign in inside the panel to use Ilé Arọ́.';
      [insertBtn, dlBtn, copyBtn].forEach(b => { b.disabled = true; });
      return;
    }
    if (!d.getElementById('ifs-embed')) {
      const st = d.createElement('style'); st.id = 'ifs-embed'; st.textContent = EMBED_CSS; d.head.append(st);
    }
    // follow "Start project" to the bench it opens
    d.addEventListener('click', e => {
      const b = e.target.closest && e.target.closest('[data-project]');
      if (b && PROJECT_TO_MODE[b.dataset.project]) setTimeout(() => setIleMode(PROJECT_TO_MODE[b.dataset.project]), 0);
    });
    // shortcuts keep working while the bench has focus
    d.addEventListener('keydown', globalKeys);
    applyIleMode();
  }

  function setIleMode(m) { state.ileMode = m; save(); applyChrome(); applyIleMode(); }
  function applyIleMode() {
    const d = ileDoc();
    if (!d || !d.getElementById('logic')) return;
    const focus = state.ileMode !== 'full';
    d.documentElement.classList.toggle('ifs-embed-focus', focus);
    $$('#app > main > section', d).forEach(s => s.classList.toggle('ifs-show', s.id === state.ileMode));
    const target = focus ? null : d.getElementById('logic');
    (ileFrame.contentWindow || {}).scrollTo && ileFrame.contentWindow.scrollTo(0, target ? 0 : 0);
  }

  /* ---------- Capturing designs ----------------------------------------- */
  const SVG_PROPS = ['fill', 'fill-opacity', 'fill-rule', 'stroke', 'stroke-width', 'stroke-opacity', 'stroke-dasharray',
    'stroke-linecap', 'stroke-linejoin', 'opacity', 'font-family', 'font-size', 'font-weight', 'font-style',
    'text-anchor', 'dominant-baseline', 'letter-spacing', 'visibility', 'paint-order', 'marker-start', 'marker-end'];

  function bgOf(el, win) {
    for (let n = el; n && n.nodeType === 1; n = n.parentElement) {
      const c = win.getComputedStyle(n).backgroundColor;
      if (c && !/rgba\(0, 0, 0, 0\)|transparent/.test(c)) return c;
    }
    return '#0b1220';
  }

  function serializeSvg(svg, win) {
    const clone = svg.cloneNode(true);
    const src = [svg, ...svg.querySelectorAll('*')];
    const dst = [clone, ...clone.querySelectorAll('*')];
    src.forEach((el, i) => {
      const cs = win.getComputedStyle(el), out = dst[i];
      if (cs.display === 'none') { out.setAttribute('display', 'none'); return; }
      let st = '';
      for (const p of SVG_PROPS) { const v = cs.getPropertyValue(p); if (v) st += `${p}:${v};`; }
      out.setAttribute('style', st);
      out.removeAttribute('class');
    });
    const vb = svg.viewBox && svg.viewBox.baseVal;
    const r = svg.getBoundingClientRect();
    const w = (vb && vb.width) || r.width || 800, hgt = (vb && vb.height) || r.height || 500;
    clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    clone.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
    clone.setAttribute('width', Math.round(w));
    clone.setAttribute('height', Math.round(hgt));
    clone.removeAttribute('id');
    const bg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    if (vb && vb.width) { bg.setAttribute('x', vb.x); bg.setAttribute('y', vb.y); }
    bg.setAttribute('width', w); bg.setAttribute('height', hgt);
    bg.setAttribute('fill', bgOf(svg, win));
    clone.insertBefore(bg, clone.firstChild);
    return '<?xml version="1.0" encoding="UTF-8"?>\n' + new XMLSerializer().serializeToString(clone);
  }

  // Register bench has no SVG; draw a faithful card from its live readouts.
  function registerSvg(d, win) {
    const txt = id => { const el = d.getElementById(id); return el ? el.innerText.replace(/\s+\n/g, '\n').trim() : ''; };
    const odus = txt('rg-odus'), combo = txt('rg-combo'), bits = txt('rg-bits');
    const lang = (d.querySelector('[data-rlang][aria-pressed="true"]') || {}).textContent || '';
    const lines = [odus, combo, bits].join('\n').split('\n').map(s => s.trim()).filter(Boolean).slice(0, 14);
    const esc = s => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
    const W = 720, H = 90 + lines.length * 26;
    const bench = d.getElementById('rg-bench');
    const bg = bench ? bgOf(bench, win) : '#0b1220';
    const ink = bench ? win.getComputedStyle(bench).color : '#e9eef8';
    let y = 92;
    const body = lines.map(l => { const s = `<text x="28" y="${y}" font-size="15" fill="${ink}" font-family="JetBrains Mono, Menlo, monospace">${esc(l)}</text>`; y += 26; return s; }).join('');
    return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<rect width="${W}" height="${H}" rx="14" fill="${bg}"/>
<text x="28" y="40" font-size="13" font-weight="700" letter-spacing="1.5" fill="#f0920c" font-family="Inter, Segoe UI, sans-serif">ILÉ ARỌ́ · ODU REGISTER${lang ? ' · ' + esc(lang.toUpperCase()) : ''}</text>
<text x="28" y="62" font-size="12" fill="${ink}" opacity=".6" font-family="Inter, Segoe UI, sans-serif">odu-register.ifacad · ${esc(new Date().toLocaleString())}</text>
${body}
</svg>`;
  }

  function captureCurrent() {
    const d = ileDoc(), win = ileFrame.contentWindow;
    if (!d || !win || !d.getElementById('logic')) throw new Error('Ilé Arọ́ is not open yet.');
    const mode = state.ileMode;
    let svgText;
    if (mode === 'logic') svgText = serializeSvg(d.getElementById('lg-svg'), win);
    else if (mode === 'blueprint') svgText = serializeSvg(d.getElementById('bp-svg'), win);
    else if (mode === 'register') svgText = registerSvg(d, win);
    else throw new Error('Choose Logic, Blueprint or Register first.');
    const name = `ile-aro-${mode}-${stamp()}.svg`;
    return { name, svgText, file: new File([svgText], name, { type: 'image/svg+xml' }) };
  }

  /* ---------- Into the notebook (through IfaNote's own UI) -------------- */
  async function insertFileAsMediaCell(file) {
    const add = $('.nb-add-btn--multimedia');
    if (!add) throw new Error('The notebook’s “+ Media” button was not found.');
    const before = new Set($$('.nb-cell'));
    add.click();
    const cell = await waitFor(() => $$('.nb-cell--multimedia').find(c => !before.has(c)));
    const fileTab = $$('.nb-media__tab', cell).find(b => /file/i.test(b.textContent));
    if (fileTab) fileTab.click();
    const input = await waitFor(() => cell.querySelector('input[type="file"]'));
    const dt = new DataTransfer(); dt.items.add(file);
    input.files = dt.files;
    input.dispatchEvent(new Event('change', { bubbles: true }));
    await waitFor(() => cell.querySelector('img'), 3000).catch(() => {});
    cell.scrollIntoView({ behavior: 'smooth', block: 'center' });
    cell.classList.add('ifs-flash');
    setTimeout(() => cell.classList.remove('ifs-flash'), 1700);
    return cell;
  }

  async function insertDesign() {
    try {
      const { file, svgText } = captureCurrent();
      if (svgText.length > 600000) toast('Large design (' + Math.round(svgText.length / 1024) + ' KB) — notebooks are stored in your browser, so keep an eye on space.');
      insertBtn.disabled = true;
      await insertFileAsMediaCell(file);
      toast('Design inserted as a new Media cell.');
    } catch (e) { toast(e.message || 'Could not insert the design.'); }
    finally { applyChrome(); }
  }
  function downloadDesign() {
    try {
      const { name, svgText } = captureCurrent();
      const a = h('a', { href: URL.createObjectURL(new Blob([svgText], { type: 'image/svg+xml' })), download: name });
      document.body.append(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
    } catch (e) { toast(e.message); }
  }
  async function copyDesign() {
    try { const { svgText } = captureCurrent(); await navigator.clipboard.writeText(svgText); toast('SVG copied to the clipboard.'); }
    catch (e) { toast(e.message || 'Copy failed.'); }
  }

  /* ========================================================================
     Command palette
     ======================================================================== */
  function clickText(sel, re) { const b = $$(sel).find(x => re.test(x.textContent)); if (b) b.click(); else toast('That control isn’t available right now.'); }
  function setTheme(v) {
    const s = $('.pro-theme-select'); if (!s) return;
    Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, 'value').set.call(s, v);
    s.dispatchEvent(new Event('change', { bubbles: true }));
  }
  function commands() {
    const C = [];
    $$('.env-topbar__center .nb-add-btn').forEach(b => {
      const t = b.textContent.replace(/^[+\s]+/, '').trim();
      if (t && !b.disabled) C.push({ cat: 'Cell', t: 'Insert ' + t + ' cell', run: () => b.click() });
    });
    $$('.env-topbar__right > button').forEach(b => {
      if (b.classList.contains('pro-user-badge')) return; // never sign the user out from here
      const t = b.textContent.replace(/[^\p{L}\p{N}\s]/gu, '').trim();
      if (t && !b.disabled) C.push({ cat: 'Notebook', t, run: () => b.click() });
    });
    const sel = $('.pro-theme-select');
    if (sel) $$('option', sel).forEach(o => C.push({ cat: 'Theme', t: o.textContent.replace(/[^\p{L}\s]/gu, '').trim() + ' theme', run: () => setTheme(o.value) }));
    MODES.forEach(m => C.push({ cat: 'Ilé Arọ́', t: 'Open ' + (m.id === 'start' ? 'projects' : m.label + (m.capture ? ' bench' : '')), run: () => { showPane('ile'); setIleMode(m.id); } }));
    MODES.filter(m => m.capture).forEach(m => C.push({ cat: 'Ilé Arọ́', t: 'Insert ' + m.capture + ' design into notebook', run: async () => { showPane('ile'); setIleMode(m.id); try { await waitFor(() => ileDoc() && ileDoc().getElementById('logic'), 8000); } catch (e) {} insertDesign(); } }));
    C.push({ cat: 'IfaLabs', t: 'Browse all labs', run: () => { closeLab(); showPane('labs'); } });
    LABS.forEach(L => L.links.forEach(([t, u, star]) => { if (!star) C.push({ cat: 'IfaLabs', t: t + ' — ' + L.name, run: () => openLab(t, u) }); }));
    C.push({ cat: 'Studio', t: state.classic ? 'Use Studio look' : 'Use Classic look', run: toggleLook });
    C.push({ cat: 'Studio', t: state.open ? 'Close side panel' : 'Open side panel', run: () => state.open ? closeDock() : showPane(state.pane) });
    return C;
  }
  let paletteItems = [], paletteSel = 0;
  function openPalette() {
    palette.classList.add('is-on');
    palette._input.value = '';
    renderPalette();
    setTimeout(() => palette._input.focus(), 0);
  }
  function closePalette() { palette.classList.remove('is-on'); }
  function renderPalette() {
    const q = fold(palette._input.value.trim());
    const terms = q.split(/\s+/).filter(Boolean);
    let items = commands();
    const n = /^\d+$/.test(q) ? +q : 0;
    if (n) items.unshift({ cat: 'Go to', t: 'Cell [' + n + ']', run: () => goToCell(n) });
    items = items.filter(c => { const s = fold(c.cat + ' ' + c.t); return terms.every(w => s.includes(w)) || (n && c.cat === 'Go to'); });
    paletteItems = items.slice(0, 60); paletteSel = 0;
    const list = palette._list; list.textContent = '';
    if (!paletteItems.length) { list.append(h('li', { class: 'ifs-empty' }, 'No matching command')); return; }
    paletteItems.forEach((c, i) => list.append(h('li', {
      role: 'option', class: i === 0 ? 'is-sel' : '',
      onmouseenter: () => markSel(i), onclick: () => runCmd(i)
    }, h('span', { class: 'ifs-cat' }, c.cat), c.t)));
  }
  function markSel(i) { paletteSel = i; $$('li', palette._list).forEach((li, j) => li.classList.toggle('is-sel', j === i)); }
  function runCmd(i) { const c = paletteItems[i]; closePalette(); if (c) setTimeout(c.run, 0); }
  function paletteKeys(e) {
    if (e.key === 'ArrowDown') { e.preventDefault(); markSel(Math.min(paletteItems.length - 1, paletteSel + 1)); scrollSel(); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); markSel(Math.max(0, paletteSel - 1)); scrollSel(); }
    else if (e.key === 'Enter') { e.preventDefault(); runCmd(paletteSel); }
    else if (e.key === 'Escape') { e.preventDefault(); closePalette(); }
  }
  function scrollSel() { const li = $$('li', palette._list)[paletteSel]; li && li.scrollIntoView({ block: 'nearest' }); }
  function goToCell(n) {
    const c = $$('.nb-cell')[n - 1];
    if (!c) return toast('There is no cell [' + n + '].');
    c.scrollIntoView({ behavior: 'smooth', block: 'center' });
    c.classList.add('ifs-flash'); setTimeout(() => c.classList.remove('ifs-flash'), 1700);
  }

  /* ========================================================================
     Look toggle, status, keys, toast
     ======================================================================== */
  function toggleLook() { state.classic = !state.classic; save(); applyChrome(); toast(state.classic ? 'Classic look — Studio tools stay available.' : 'Studio look on.'); }

  let toastT;
  function toast(msg) { toastEl.textContent = msg; toastEl.classList.add('is-on'); clearTimeout(toastT); toastT = setTimeout(() => toastEl.classList.remove('is-on'), 2600); }

  function updateStatus() {
    const saveEl = $('.pro-save-indicator');
    const saveTxt = saveEl ? saveEl.textContent.trim() : '';
    const busy = /saving|unsaved|…/i.test(saveTxt);
    $('[data-s="save"]', status).textContent = saveTxt || 'Ready';
    $('[data-s="dot"]', status).classList.toggle('is-busy', busy);
    const n = $$('.nb-cell').length;
    $('[data-s="cells"]', status).textContent = n + (n === 1 ? ' cell' : ' cells');
    const th = root.dataset.theme || 'dark';
    $('[data-s="theme"]', status).textContent = th.charAt(0).toUpperCase() + th.slice(1) + ' theme';
  }

  function globalKeys(e) {
    const mod = e.ctrlKey || e.metaKey;
    if (mod && (e.key === 'k' || e.key === 'K') && !e.shiftKey && !e.altKey) { e.preventDefault(); openPalette(); return; }
    if (mod && e.shiftKey && (e.key === 'p' || e.key === 'P')) { e.preventDefault(); openPalette(); return; }
    if (e.altKey && !mod && !isEditable(e.target)) {
      if (e.code === 'KeyI') { e.preventDefault(); togglePane('ile'); }
      else if (e.code === 'KeyL') { e.preventDefault(); togglePane('labs'); }
    }
    if (e.key === 'Escape' && palette.classList.contains('is-on')) closePalette();
  }

  /* ========================================================================
     Boot (after React has rendered the notebook)
     ======================================================================== */
  function boot() {
    build();
    applyChrome();
    if (state.open && state.pane === 'ile') ensureIle();
    updateStatus();
    let pending = false;
    new MutationObserver(() => { if (!pending) { pending = true; requestAnimationFrame(() => { pending = false; updateStatus(); }); } })
      .observe(document.getElementById('root') || document.body, { childList: true, subtree: true, characterData: true });
    new MutationObserver(updateStatus).observe(root, { attributes: true, attributeFilter: ['data-theme'] });
    document.addEventListener('keydown', globalKeys);
    window.addEventListener('resize', () => { root.style.setProperty('--ifs-dock-w', clampW(state.width) + 'px'); });
    window.IfaNoteStudio = { open: showPane, close: closeDock, insertDesign, setIleMode, palette: openPalette };
  }

  waitFor(() => document.querySelector('.env-root .env-topbar'), 30000)
    .then(boot)
    .catch(() => { /* not the notebook view (e.g. signed out) — stay out of the way */ });
})();
