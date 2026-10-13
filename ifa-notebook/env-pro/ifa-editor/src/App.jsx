/* ─────────────────────────────────────────────────────────────────────────────
   IfaEditor — ToE Editor · Energy-Based Editor
   IfaNote Pro · The IFA Internet · CENProject
   ifainternet.org/ifa-notebook/env-pro/ifa-editor/
   IfaPen: OgbeTip (Energy-based) · OyekuTip (Anergy-based)
───────────────────────────────────────────────────────────────────────────── */

const { useState, useEffect, useRef, useCallback } = React;

/* ── IfaPen modes ─────────────────────────────────────────────────────────── */
const PEN_MODES = {
  ogbe: {
    id:       'ogbe',
    name:     'OgbeTip',
    label:    'Energy',
    odu:      'Ogbè',
    code:     '1111',
    color:    '#f5c518',
    desc:     'Energy-Based Editing — Ogbè · Light · Creation',
    mark:     '|',       // IfaPrint mark: Ogbe = single stroke (|)
    insert:   '|',
    placeholder: 'OgbeTip active — begin Ifacoding; energize this field; develop your IfaSystem & OrisaSystem',
  },
  oyeku: {
    id:       'oyeku',
    name:     'OyekuTip',
    label:    'Anergy',
    odu:      'Ọ̀yẹ̀kú',
    code:     '0000',
    color:    '#a78bfa',
    desc:     'Anergy-Based Editing — Ọ̀yẹ̀kú · Void · Transition',
    mark:     '||',      // IfaPrint mark: Oyeku = double stroke (||)
    insert:   '||',
    placeholder: 'OyekuTip active — the Void and end Ifacode states in IfaTech & OrisaTech',
  },
};

/* ── 16 Principal Odu Ifa ─────────────────────────────────────────────────── */
/* IfaCharacter glyphs: O = Ogbe/Energy (bit 1), I = Oyeku/Anergy (bit 0)
   Format matches ifa-periodic-table primaryGlyph: code read right-to-left, 1→O, 0→I */
const ODU = [
  { name:'Ogbè',       latin:'Ogbe',      num:1,  color:'#f5c518', code:'1111', mark:'O'    },
  { name:'Ọ̀yẹ̀kú',    latin:'Oyeku',     num:2,  color:'#a78bfa', code:'0000', mark:'|'    },
  { name:'Ìwòrì',     latin:'Iwori',     num:3,  color:'#3b9eff', code:'0110', mark:'IOOI' },
  { name:'Òdí',       latin:'Odi',       num:4,  color:'#10b981', code:'1001', mark:'OIIO' },
  { name:'Ìrosún',    latin:'Irosun',    num:5,  color:'#f43f5e', code:'1100', mark:'IIOO' },
  { name:'Ọ̀wọ́nrín',  latin:'Owonrin',   num:6,  color:'#f97316', code:'0011', mark:'OOII' },
  { name:'Ọ̀bárà',    latin:'Obara',     num:7,  color:'#f59e0b', code:'1000', mark:'IIIO' },
  { name:'Ọ̀kànràn',  latin:'Okanran',   num:8,  color:'#ec4899', code:'0001', mark:'OIII' },
  { name:'Ògúndá',    latin:'Ogunda',    num:9,  color:'#dc2626', code:'1110', mark:'IOOO' },
  { name:'Ọ̀sá',      latin:'Osa',       num:10, color:'#818cf8', code:'0111', mark:'OOOI' },
  { name:'Ìká',       latin:'Ika',       num:11, color:'#14b8a6', code:'0100', mark:'IIOI' },
  { name:'Òtúrúpọ̀n', latin:'Oturupon',  num:12, color:'#84cc16', code:'0010', mark:'IOII' },
  { name:'Òtúrá',     latin:'Otura',     num:13, color:'#06b6d4', code:'1011', mark:'OOIO' },
  { name:'Ìrẹtẹ̀',    latin:'Irete',     num:14, color:'#f472b6', code:'1101', mark:'OIOO' },
  { name:'Ọ̀ṣẹ́',      latin:'Ose',       num:15, color:'#c084fc', code:'1010', mark:'IOIO' },
  { name:'Òfún',      latin:'Ofun',      num:16, color:'#cbd5e1', code:'0101', mark:'OIOI' },
];

/* Resolve 4 marks → Odu entry */
function getOduFromMarks(marks4) {
  const code = marks4.map(m => m === 'ogbe' ? '1' : '0').join('');
  return ODU.find(o => o.code === code) || null;
}

/* Build the hover title for a full 8-mark Odu tray.
   Babalawo order: mark 1→right row 0, mark 2→left row 0, mark 3→right row 1 … (interleaved RTL→LTR per row, top→bottom) */
function oduTrayTitle(marks) {
  const right4 = [marks[0], marks[2], marks[4], marks[6]]; // odd-indexed presses → right col
  const left4  = [marks[1], marks[3], marks[5], marks[7]]; // even-indexed presses → left col
  const r = getOduFromMarks(right4);
  const l = getOduFromMarks(left4);
  if (!r || !l) return '';
  return r.num === l.num ? `${r.name} Méjì` : `${r.name} ${l.name}`;
}

/* Render glyph with tight spacing matching ifa-periodic-table renderGlyphChars */
function renderGlyph(g) {
  if (!g || g.length <= 1) return g;
  return g.split('').map((ch, i) => {
    const isLast = i === g.length - 1;
    const next = g[i + 1];
    const mr = isLast ? '0' : (ch === 'I' && next === 'I') ? '-0.08em' : '-0.22em';
    return <span key={i} style={{ marginRight: mr }}>{ch}</span>;
  });
}

/* Generate same tight-spaced HTML as a string, for inserting into the canvas */
function glyphHTML(g) {
  if (!g || g.length <= 1) return g || '';
  return g.split('').map((ch, i) => {
    const isLast = i === g.length - 1;
    const next = g[i + 1];
    const mr = isLast ? '0' : (ch === 'I' && next === 'I') ? '-0.08em' : '-0.22em';
    return `<span style="margin-right:${mr}">${ch}</span>`;
  }).join('');
}

/* ── OgbeSymbol — four-lobe lemniscate (SymboE), canvas-based ───────────── */
function OgbeSymbol({ size = 20, className = '' }) {
  const canvasRef = useRef(null);
  const a   = size * 0.47;
  const ccx = size / 2;
  const ccy = size / 2;
  const sc  = a / 200;
  const N   = 80;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const DPR = window.devicePixelRatio || 1;
    canvas.width  = size * DPR;
    canvas.height = size * DPR;
    const ctx = canvas.getContext('2d');
    ctx.scale(DPR, DPR);

    function buildLobe(t0, t1, neg) {
      const pts = [];
      for (let i = 0; i <= N; i++) {
        const t  = t0 + (t1 - t0) * i / N;
        const c2 = Math.cos(2 * t);
        const v  = neg ? -c2 : c2;
        if (v < 1e-10) continue;
        const rho = a * Math.sqrt(v);
        pts.push([ccx + rho * Math.cos(t), ccy + rho * Math.sin(t)]);
      }
      return pts;
    }

    const PI = Math.PI;
    const lobes = [
      buildLobe(-PI/4,   PI/4,   false),
      buildLobe(3*PI/4,  5*PI/4, false),
      buildLobe(PI/4,    3*PI/4, true),
      buildLobe(5*PI/4,  7*PI/4, true),
    ];

    function strokeLobe(pts, lw, rgba, blur) {
      if (!pts.length) return;
      ctx.save();
      ctx.strokeStyle = rgba;
      ctx.lineWidth   = Math.max(0.3, lw * sc);
      ctx.shadowColor = rgba;
      ctx.shadowBlur  = blur * sc;
      ctx.lineCap     = 'round';
      ctx.lineJoin    = 'round';
      ctx.beginPath();
      ctx.moveTo(pts[0][0], pts[0][1]);
      for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
      ctx.stroke();
      ctx.restore();
    }

    ctx.clearRect(0, 0, size, size);
    for (const lobe of lobes) {
      strokeLobe(lobe, 44, 'rgba(245,197,24,0.03)', 65);
      strokeLobe(lobe, 26, 'rgba(245,197,24,0.07)', 44);
      strokeLobe(lobe, 15, 'rgba(245,197,24,0.16)', 28);
      strokeLobe(lobe,  7, 'rgba(245,197,24,0.34)', 16);
      strokeLobe(lobe,  3, 'rgba(245,197,24,0.62)',  8);
      strokeLobe(lobe,1.4, 'rgba(245,197,24,0.90)',  4);
      strokeLobe(lobe,0.7, 'rgba(255,248,210,0.95)', 2);
    }
    ctx.save();
    ctx.shadowColor = 'rgba(245,197,24,1)';
    ctx.shadowBlur  = 22 * sc;
    ctx.fillStyle   = 'rgba(255,248,210,1)';
    ctx.beginPath();
    ctx.arc(ccx, ccy, Math.max(0.5, 3.5 * sc), 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();
  }, [size]);

  return (
    <canvas ref={canvasRef} className={className}
      style={{ display:'inline-block', verticalAlign:'middle', width:size+'px', height:size+'px' }}
      aria-label="Ogbe Energy Symbol — SymboE" />
  );
}

/* ── OyekuSymbol — Oyeku Anergy Symbol (two lemniscates + diagonal), canvas ─ */
function OyekuSymbol({ size = 20 }) {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const s = size;
    const DPR = window.devicePixelRatio || 1;
    canvas.width = s * DPR; canvas.height = s * DPR;
    const ctx = canvas.getContext('2d');
    ctx.scale(DPR, DPR);
    const cx = s/2, cy = s/2, r = s*0.36, gold = '#f5c518';
    ctx.clearRect(0, 0, s, s);
    const drawLobes = (alpha, lineW) => {
      ctx.save(); ctx.globalAlpha = alpha; ctx.strokeStyle = gold;
      ctx.lineWidth = lineW; ctx.lineCap = 'round';
      for (let rot = 0; rot < 2; rot++) {
        ctx.beginPath();
        for (let t = 0; t <= Math.PI * 2; t += 0.01) {
          const c2 = Math.cos(2 * t);
          const scale = c2 >= 0 ? Math.sqrt(c2) : 0;
          const x = cx + (rot === 0 ? 1 : 0) * r * scale * Math.cos(t) + (rot === 1 ? 1 : 0) * r * scale * Math.sin(t);
          const y = cy + (rot === 0 ? 1 : 0) * r * scale * Math.sin(t) + (rot === 1 ? 1 : 0) * r * scale * Math.cos(t);
          t < 0.02 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      ctx.restore();
    };
    drawLobes(0.12, s*0.22); drawLobes(0.22, s*0.13); drawLobes(0.55, s*0.055); drawLobes(1.00, s*0.022);
    const ext = s * 0.30;
    const drawDiag = (alpha, lineW, blur) => {
      ctx.save(); ctx.globalAlpha = alpha; ctx.strokeStyle = gold;
      ctx.lineWidth = lineW; ctx.lineCap = 'round';
      ctx.shadowColor = gold; ctx.shadowBlur = blur;
      ctx.beginPath(); ctx.moveTo(cx+ext, cy-ext); ctx.lineTo(cx-ext, cy+ext); ctx.stroke();
      ctx.restore();
    };
    drawDiag(0.03,s*0.20,s*0.12); drawDiag(0.07,s*0.12,s*0.08); drawDiag(0.16,s*0.07,s*0.05);
    drawDiag(0.34,s*0.03,s*0.03); drawDiag(0.62,s*0.014,s*0.015); drawDiag(0.90,s*0.007,s*0.007);
    drawDiag(0.95,s*0.003,s*0.003);
  }, [size]);
  return (
    <canvas ref={ref}
      style={{ display:'inline-block', verticalAlign:'middle', width:size+'px', height:size+'px' }}
      aria-label="Oyeku Anergy Symbol" />
  );
}

/* ── buildOgbeSVGStr — static SVG equivalent of OgbeSymbol (for insertHTML) */
function buildOgbeSVGStr(size) {
  const a  = size * 0.47;
  const cx = size / 2;
  const cy = size / 2;
  const N  = 28;
  const PI = Math.PI;
  function buildLobe(t0, t1, neg) {
    const pts = [];
    for (let i = 0; i <= N; i++) {
      const t  = t0 + (t1 - t0) * i / N;
      const c2 = Math.cos(2 * t);
      const v  = neg ? -c2 : c2;
      if (v < 1e-10) continue;
      const rho = a * Math.sqrt(v);
      pts.push([(cx + rho * Math.cos(t)).toFixed(2), (cy + rho * Math.sin(t)).toFixed(2)]);
    }
    return pts;
  }
  const lobes = [
    buildLobe(-PI/4,   PI/4,   false),
    buildLobe(3*PI/4,  5*PI/4, false),
    buildLobe(PI/4,    3*PI/4, true),
    buildLobe(5*PI/4,  7*PI/4, true),
  ];
  let d = '';
  for (const lobe of lobes) {
    if (!lobe.length) continue;
    d += `M${lobe[0][0]},${lobe[0][1]}`;
    for (let i = 1; i < lobe.length; i++) d += ` L${lobe[i][0]},${lobe[i][1]}`;
  }
  const sw1 = Math.max(0.4, size * 0.065).toFixed(2);
  const sw2 = Math.max(0.25, size * 0.038).toFixed(2);
  const r   = Math.max(0.5, size * 0.09).toFixed(2);
  const id  = `og${size}x`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" style="display:inline-block;vertical-align:middle;flex-shrink:0"><defs><filter id="${id}"><feGaussianBlur stdDeviation="0.8" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs><g filter="url(#${id})"><path d="${d}" stroke="rgba(245,197,24,0.55)" stroke-width="${sw1}" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" stroke="rgba(245,197,24,0.92)" stroke-width="${sw2}" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="${cx.toFixed(2)}" cy="${cy.toFixed(2)}" r="${r}" fill="rgba(255,248,210,1)"/></g></svg>`;
}

/* ── buildOyekuSVGStr — static SVG equivalent of OyekuSymbol (for insertHTML) */
function buildOyekuSVGStr(size) {
  const cx = size/2, cy = size/2, r = size*0.36;
  const N = 64;
  let paths = [];
  for (let rot = 0; rot < 2; rot++) {
    const pts = [];
    for (let i = 0; i <= N; i++) {
      const t  = i * Math.PI * 2 / N;
      const c2 = Math.cos(2 * t);
      if (c2 < 1e-10) continue;
      const sc = Math.sqrt(c2);
      const px = rot === 0 ? cx + r*sc*Math.cos(t) : cx + r*sc*Math.sin(t);
      const py = rot === 0 ? cy + r*sc*Math.sin(t) : cy + r*sc*Math.cos(t);
      pts.push([px.toFixed(2), py.toFixed(2)]);
    }
    if (pts.length) {
      let d = `M${pts[0][0]},${pts[0][1]}`;
      for (let i = 1; i < pts.length; i++) d += ` L${pts[i][0]},${pts[i][1]}`;
      paths.push(d);
    }
  }
  const ext = size * 0.30;
  const dx1 = (cx+ext).toFixed(2), dy1 = (cy-ext).toFixed(2);
  const dx2 = (cx-ext).toFixed(2), dy2 = (cy+ext).toFixed(2);
  const sw1 = Math.max(0.4, size*0.055).toFixed(2);
  const sw2 = Math.max(0.25, size*0.028).toFixed(2);
  const id  = `oy${size}x`;
  const p   = paths.map(d =>
    `<path d="${d}" stroke="rgba(245,197,24,0.55)" stroke-width="${sw1}" fill="none" stroke-linecap="round"/>` +
    `<path d="${d}" stroke="rgba(245,197,24,0.92)" stroke-width="${sw2}" fill="none" stroke-linecap="round"/>`
  ).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" style="display:inline-block;vertical-align:middle;flex-shrink:0"><defs><filter id="${id}"><feGaussianBlur stdDeviation="0.6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs><g filter="url(#${id})">${p}<line x1="${dx1}" y1="${dy1}" x2="${dx2}" y2="${dy2}" stroke="rgba(245,197,24,0.55)" stroke-width="${sw1}"/><line x1="${dx1}" y1="${dy1}" x2="${dx2}" y2="${dy2}" stroke="rgba(245,197,24,0.92)" stroke-width="${sw2}"/></g></svg>`;
}

/* ── IfaSign palette (math/logic symbols with Ifa meaning) ───────────────── */
const IFA_SIGNS = [
  { sym: '∞', title: 'IfaInfinity — Double Infinity' },
  { sym: '⊕', title: 'IfaPlus — Amulu (Composition)' },
  { sym: '⊗', title: 'IfaTimes — Cross Exchange' },
  { sym: '⊘', title: 'IfaVoid — Division through Void' },
  { sym: '⊙', title: 'IfaDot — Centre of Field' },
  { sym: '⊛', title: 'IfaStar — Radiant Exchange' },
  { sym: 'Ψ',  title: 'IfaWave — Consciousness Wavefunction' },
  { sym: '∿',  title: 'Ifa Superposition' },
  { sym: '⧖',  title: 'Wavefunction Collapse' },
  { sym: 'W',  title: 'IfaWork Function — W(Ẹbọ)' },
  { sym: '∂',  title: 'IfaPartial — Partial Field' },
  { sym: '∇',  title: 'IfaGrad — Gradient of Field' },
  { sym: '∑',  title: 'IfaSum — Total Exchange' },
  { sym: '√',  title: 'IfaRoot — Root Field' },
  { sym: '≡',  title: 'IfaEqual — Ifa Equivalence' },
  { sym: '≈',  title: 'IfaApprox — Amulu Approximation' },
  { sym: '∈',  title: 'IfaIn — Element of Ifa Set' },
  { sym: '∀',  title: 'IfaAll — For All Odu' },
  { sym: '∃',  title: 'IfaExists — Odu Existence' },
  { sym: '→',  title: 'IfaFlow — Energy Transfer' },
  { sym: '⟷',  title: 'IfaBiFlow — Bidirectional Exchange' },
  { sym: '⬡',  title: 'Ẹbọnet Node' },
  { sym: '◎',  title: 'IfaCircle — Field Container' },
  { sym: '⟳',  title: 'IfaCycle — Energy Exchange Cycle' },
];

/* ── IfaCircuit Builder — gate palette data ──────────────────────────────── */
const CIRCUIT_GATES = {
  classical: [
    { sym:'▷', name:'Buffer', color:'#f5c518', desc:'Identity — output equals input' },
    { sym:'∧', name:'AND',    color:'#00c87c', desc:'Output 1 only when ALL inputs are 1' },
    { sym:'∨', name:'OR',     color:'#f0920c', desc:'Output 1 when ANY input is 1' },
    { sym:'¬', name:'NOT',    color:'#14b8d4', desc:'Inverts the input — NOT gate' },
    { sym:'⊼', name:'NAND',   color:'#ec4899', desc:'NOT AND — universal gate (functionally complete)' },
    { sym:'⊽', name:'NOR',    color:'#8b5cf6', desc:'NOT OR — universal gate (functionally complete)' },
    { sym:'⊕', name:'XOR',    color:'#3b9eff', desc:'Output 1 when inputs DIFFER' },
    { sym:'⊙', name:'XNOR',   color:'#6366f1', desc:'Output 1 when inputs are SAME — equivalence gate' },
  ],
  quantum: [
    { sym:'I',   label:'I',    name:'Identity',   color:'#aab8d4', desc:'Quantum identity — passes qubit unchanged' },
    { sym:'X',   label:'X',    name:'Pauli-X',    color:'#14b8d4', desc:'Quantum NOT (Flip) — flips |0⟩ ↔ |1⟩' },
    { sym:'Y',   label:'Y',    name:'Pauli-Y',    color:'#ec4899', desc:'Rotation 180° around Y-axis with phase' },
    { sym:'Z',   label:'Z',    name:'Pauli-Z',    color:'#8b5cf6', desc:'Phase flip — negates |1⟩ state' },
    { sym:'H',   label:'H',    name:'Hadamard',   color:'#f5c518', desc:'Superpose — creates equal superposition |+⟩ / |−⟩' },
    { sym:'S',   label:'S',    name:'S Gate',     color:'#00c87c', desc:'Phase gate — π/2 phase shift on |1⟩ (√Z)' },
    { sym:'T',   label:'T',    name:'T Gate',     color:'#f0920c', desc:'π/8 gate — π/4 phase shift on |1⟩ (√S)' },
    { sym:'CX',  label:'CNOT', name:'CNOT',       color:'#3b9eff', desc:'Entangle — Controlled-NOT; flips target if control |1⟩' },
    { sym:'CZ',  label:'CZ',   name:'Ctrl-Z',     color:'#6366f1', desc:'Controlled-Z — applies Z to target if control is |1⟩' },
    { sym:'CS',  label:'CS',   name:'Ctrl-Phase', color:'#a78bfa', desc:'Controlled-Phase — applies S to target if control is |1⟩' },
    { sym:'SW',  label:'SWAP', name:'SWAP',       color:'#f43f5e', desc:'SWAP — exchanges two qubit states' },
    { sym:'Rφ',  label:'R(φ)', name:'R-Gate',     color:'#c084fc', desc:'Y-rotation gate R(φ) — rotation by angle φ' },
  ],
  ifa: [
    // Each pair: [right-col (Oyeku/dual), left-col (Ogbe/energy)] — Ejiogbe on right, Oyeku on left
    // 1–2: Pure master gates — OyekuSymbol (left) / OgbeSymbol (right)
    { sym:'',  pureSymbol:true,  isEnergy:false, name:'Oyeku Meji Gate',             color:'#f5c518', odu:'Oyeku Meji',    desc:'IfaNOT Gate · Anergy Foundation of All Gates' },
    { sym:'',  pureSymbol:true,  isEnergy:true,  name:'Ejiogbe Gate',               color:'#f5c518', odu:'Ejiogbe',       desc:'IfaBuffer Gate · Energy Foundation of All Gates' },
    // 3–8: Classical IfaGates — NAND (left/Odi), AND (right/Iwori)
    { sym:'⊼',  gateType:'NAND', isEnergy:true,  name:'IfaNAND Gate',                color:'#f0920c', odu:'Odi Meji',      desc:'IfaNAND — Odu Odi Meji' },
    { sym:'∧',  gateType:'AND',  isEnergy:true,  name:'IfaAND Gate',                 color:'#00c87c', odu:'Iwori Meji',    desc:'IfaAND — Odu Iwori Meji' },
    { sym:'⊽',  gateType:'NOR',  isEnergy:true,  name:'IfaNOR Gate',                 color:'#ec4899', odu:'Owonrin Meji',  desc:'IfaNOR — Odu Owonrin Meji' },
    { sym:'∨',  gateType:'OR',   isEnergy:true,  name:'IfaOR Gate',                  color:'#14b8d4', odu:'Irosun Meji',   desc:'IfaOR — Odu Irosun Meji' },
    { sym:'⊙',  gateType:'XNOR', isEnergy:true,  name:'IfaXNOR Gate',                color:'#3b9eff', odu:'Okanran Meji',  desc:'IfaXNOR — Odu Okanran Meji' },
    { sym:'⊕',  gateType:'XOR',  isEnergy:true,  name:'IfaXOR Gate',                 color:'#8b5cf6', odu:'Obara Meji',    desc:'IfaXOR — Odu Obara Meji' },
    // 9–14: Quantum Pauli IfaGates — Osa (left), Ogunda (right); Oturupon (left), Ika (right); Irete (left), Otura (right)
    { sym:'X',                    isEnergy:true,  name:'IfaPauli-X Gate',             color:'#ec4899', odu:'Osa Meji',      desc:'IfaPauli-X — Odu Osa Meji' },
    { sym:'𝕀',                    isEnergy:true,  name:'IfaPauli Identity (Dual) Gate', color:'#14b8d4', odu:'Ogunda Meji',  desc:'IfaPauli Identity Dual — Odu Ogunda Meji' },
    { sym:'Y',                    isEnergy:true,  name:'IfaPauli-Y Gate',             color:'#f5c518', odu:'Oturupon Meji', desc:'IfaPauli-Y — Odu Oturupon Meji' },
    { sym:'Y̅',                    isEnergy:true,  name:'IfaPauli-Y Dual Gate',        color:'#8b5cf6', odu:'Ika Meji',      desc:'IfaPauli-Y Dual — Odu Ika Meji' },
    { sym:'Z',                    isEnergy:true,  name:'IfaPauli-Z Gate',             color:'#f0920c', odu:'Irete Meji',    desc:'IfaPauli-Z — Odu Irete Meji' },
    { sym:'Z̅',                    isEnergy:true,  name:'IfaPauli-Z Dual Gate',        color:'#00c87c', odu:'Otura Meji',    desc:'IfaPauli-Z Dual — Odu Otura Meji' },
    // 15–16: IfaX Gate — Ofun (left), Ose (right)
    { sym:'𝒳',                    isEnergy:false, name:'IfaX Gate',                   color:'#a78bfa', odu:'Ofun Meji',     desc:'IfaX — IfaGeneralization (Ofun Meji)' },
    { sym:'𝒳',                    isEnergy:true,  name:'IfaX Dual Gate',              color:'#a78bfa', odu:'Ose Meji',      desc:'IfaX Dual — IfaGeneralization (Ose Meji)' },
  ],
};

/* ── SIDECHRX Law Matrix ──────────────────────────────────────────────────── */
const SIDECHRX_MATRIX = [
  { letter:'S', name:'Symmetry',     odu:'Ogbé',      color:'#f0920c', symbol:'⊛', subtitle:'The Base-Field Symmetry',              tagline:'All Ifa transformations preserve the structure of reality.' },
  { letter:'I', name:'Invariance',   odu:'Òyèkú',     color:'#6366f1', symbol:'⟲', subtitle:'What Persists Through All Transformations', tagline:'Certain Ifa Quantities remain unchanged under every transformation in IFABOK.' },
  { letter:'D', name:'Duality',      odu:'Ìwòrì',     color:'#14b8d4', symbol:'⇔', subtitle:'The Duality of Everything (DualoE)',    tagline:'Everything in existence has a Dual — its Superpartner (Ìpọ̀nrí / Ẹnìkejì) in Ọ̀run.' },
  { letter:'E', name:'Emergence',    odu:'Òdí',       color:'#00c87c', symbol:'↑', subtitle:'The Emergence of Everything (EmergencoE)', tagline:'The 16 Oju Odu, especially Ogbe Energy, generate all complexity through the Amulu Operations.' },
  { letter:'C', name:'Composition',  odu:'Ìrosùn',    color:'#ef4444', symbol:'⊕', subtitle:'The Composition of Everything (CompoE)', tagline:'Ogbèyẹ̀kú ni Baba Àmúlù: The Binary Operation generating all 256 Odu Ifa.' },
  { letter:'H', name:'Holism',       odu:'Òwónrín',   color:'#8b5cf6', symbol:'◎', subtitle:'The Holism of Everything (HolismoE)',   tagline:'The IFA Matrix as a holistic System — irreducible to any proper subset of 254 Odu.' },
  { letter:'R', name:'Reductionism', odu:'Òbàrà',     color:'#3b9eff', symbol:'↓', subtitle:'The Reductionism of Everything',        tagline:'Reducing any field of knowledge to its Odufa (inherent Energy).' },
  { letter:'X', name:'Others',       odu:'Òkànràn',   color:'#ec4899', symbol:'◈', subtitle:'The Simulation of Everything (SimoE)', tagline:'Ayé lọjà, ọ̀run nilé: The physical realm is a simulation of the non-physical realm.' },
];

/* ── STEAMSEX Matrix ──────────────────────────────────────────────────────── */
const STEAMSEX_MATRIX = [
  { letter:'S', domain:'Science',            color:'#f5c518', odu1:'Ogbé',      odu2:'Òyèkú',    sub:'Origin & Decay Sequences' },
  { letter:'T', domain:'Technology',         color:'#14b8d4', odu1:'Ìwòrì',     odu2:'Òdí',      sub:'Structural & Deep Learning Sequences' },
  { letter:'E', domain:'Engineering',        color:'#00c87c', odu1:'Ìrosùn',    odu2:'Òwónrín',  sub:'Flow & Systems Integration Sequences' },
  { letter:'A', domain:'Art',                color:'#f0920c', odu1:'Òbàrà',     odu2:'Òkànràn',  sub:'Aesthetic & Dynamic Tension Sequences' },
  { letter:'M', domain:'Mathematics',        color:'#8b5cf6', odu1:'Ògúndá',    odu2:'Òsá',      sub:'Prime & Fractal Sequences' },
  { letter:'S', domain:'Sports',             color:'#ec4899', odu1:'Ìká',       odu2:'Òtúrúpòn', sub:'Strategic & Reversal Sequences' },
  { letter:'E', domain:'Economics',          color:'#a78bfa', odu1:'Òtúrá',     odu2:'Ìretè',    sub:'Market Cycle & Accumulation Sequences' },
  { letter:'X', domain:'Cross-Disciplinary', color:'#f43f5e', odu1:'Òsé',       odu2:'Òfún',     sub:'Innovation & Universal Meta-Sequences' },
];

/* ── Unicode BiDi control characters ─────────────────────────────────────── */
const BIDI_CHARS = [
  { sym: '\u200E', code: 'LRM',  label: 'LRM',  title: 'Left-to-Right Mark — invisible LTR directional mark',      color: '#3b9eff' },
  { sym: '\u200F', code: 'RLM',  label: 'RLM',  title: 'Right-to-Left Mark — invisible RTL directional mark',      color: '#a78bfa' },
  { sym: '\u202A', code: 'LRE',  label: 'LRE',  title: 'LTR Embedding — begin left-to-right embedded text',        color: '#3b9eff' },
  { sym: '\u202B', code: 'RLE',  label: 'RLE',  title: 'RTL Embedding — begin right-to-left embedded text',        color: '#a78bfa' },
  { sym: '\u202C', code: 'PDF',  label: 'PDF',  title: 'Pop Directional Formatting — end embedding or override',   color: '#6e90b8' },
  { sym: '\u202D', code: 'LRO',  label: 'LRO',  title: 'LTR Override — force every char to display left-to-right', color: '#00c87c' },
  { sym: '\u202E', code: 'RLO',  label: 'RLO',  title: 'RTL Override — force every char to display right-to-left', color: '#f43f5e' },
  { sym: '\u2066', code: 'LRI',  label: 'LRI',  title: 'LTR Isolate — isolates LTR content from surrounding text', color: '#3b9eff' },
  { sym: '\u2067', code: 'RLI',  label: 'RLI',  title: 'RTL Isolate — isolates RTL content from surrounding text', color: '#a78bfa' },
  { sym: '\u2068', code: 'FSI',  label: 'FSI',  title: 'First Strong Isolate — auto-detects direction from first strong character', color: '#f5c518' },
  { sym: '\u2069', code: 'PDI',  label: 'PDI',  title: 'Pop Directional Isolate — closes LRI, RLI, or FSI',       color: '#6e90b8' },
  { sym: '\u061C', code: 'ALM',  label: 'ALM',  title: 'Arabic Letter Mark — invisible mark for Arabic/RTL layout', color: '#f0920c' },
];

/* ── World Scripts — direction reference + insertion palette ──────────────── */
const WORLD_SCRIPTS = [
  { name:'Latin',       sample:'Abc',   dir:'ltr', color:'#3b9eff', desc:'Latin — English, French, Yoruba, Spanish…' },
  { name:'Arabic',      sample:'عربي',  dir:'rtl', color:'#f0920c', desc:'Arabic script (RTL)' },
  { name:'Hebrew',      sample:'עברית', dir:'rtl', color:'#a78bfa', desc:'Hebrew script (RTL)' },
  { name:'Persian',     sample:'فارسی', dir:'rtl', color:'#fb7185', desc:'Persian/Farsi script (RTL)' },
  { name:'Urdu',        sample:'اردو',  dir:'rtl', color:'#fbbf24', desc:'Urdu script (RTL)' },
  { name:"N'Ko",        sample:'ߊߋ',   dir:'rtl', color:'#c084fc', desc:"N'Ko script (RTL) — West Africa" },
  { name:'Thaana',      sample:'ތާނަ', dir:'rtl', color:'#38bdf8', desc:'Thaana script (RTL) — Maldivian Dhivehi' },
  { name:'Devanagari',  sample:'अ आ',  dir:'ltr', color:'#00c87c', desc:'Devanagari (LTR) — Hindi, Sanskrit, Marathi' },
  { name:'Chinese',     sample:'中文',  dir:'ltr', color:'#f5c518', desc:'Chinese script (LTR)' },
  { name:'Japanese',    sample:'あア漢', dir:'ltr', color:'#14b8d4', desc:'Japanese (LTR)' },
  { name:'Korean',      sample:'한글',  dir:'ltr', color:'#ec4899', desc:'Korean Hangul (LTR)' },
  { name:'Greek',       sample:'αβγ',  dir:'ltr', color:'#84cc16', desc:'Greek script (LTR)' },
  { name:'Cyrillic',    sample:'Аб',   dir:'ltr', color:'#f472b6', desc:'Cyrillic (LTR) — Russian, Ukrainian…' },
  { name:'Georgian',    sample:'ქართ', dir:'ltr', color:'#fb923c', desc:'Georgian script (LTR)' },
  { name:'Armenian',    sample:'Ա ա',  dir:'ltr', color:'#a3e635', desc:'Armenian script (LTR)' },
  { name:'Ethiopian',   sample:'አ ሀ',  dir:'ltr', color:'#34d399', desc:'Ethiopic — Amharic, Tigrinya (LTR)' },
  { name:'Thai',        sample:'ก ข',  dir:'ltr', color:'#fde68a', desc:'Thai script (LTR)' },
  { name:'Aebajiogbe',  sample:'\u0634\u062b', dir:'rtl', color:'#f5c518', desc:'Aebajiogbe-Oduduwa Script (RTL)' },
];

/* ── Ifa-OrisaField — Knowledge fields palette ────────────────────────────── */
const ORISA_KNOWLEDGE_FIELDS = [
  { name:'Physics',           sym:'⚛', color:'#3b9eff', cat:'Sciences' },
  { name:'Chemistry',         sym:'⚗', color:'#00c87c', cat:'Sciences' },
  { name:'Biology',           sym:'⬡', color:'#84cc16', cat:'Sciences' },
  { name:'Mathematics',       sym:'∑', color:'#f5c518', cat:'Sciences' },
  { name:'Astronomy',         sym:'✦', color:'#a78bfa', cat:'Sciences' },
  { name:'Computer Science',  sym:'⌥', color:'#14b8d4', cat:'Sciences' },
  { name:'Earth Science',     sym:'◎', color:'#34d399', cat:'Sciences' },
  { name:'Neuroscience',      sym:'⌾', color:'#fb7185', cat:'Sciences' },
  { name:'Economics',         sym:'⊛', color:'#f0920c', cat:'Social Sciences' },
  { name:'Sociology',         sym:'◈', color:'#ec4899', cat:'Social Sciences' },
  { name:'Psychology',        sym:'Ψ', color:'#8b5cf6', cat:'Social Sciences' },
  { name:'Anthropology',      sym:'⌬', color:'#fbbf24', cat:'Social Sciences' },
  { name:'Political Science', sym:'⊕', color:'#38bdf8', cat:'Social Sciences' },
  { name:'History',           sym:'↺', color:'#c084fc', cat:'Social Sciences' },
  { name:'Philosophy',        sym:'∞', color:'#f5c518', cat:'Humanities' },
  { name:'Literature',        sym:'✦', color:'#f472b6', cat:'Humanities' },
  { name:'Linguistics',       sym:'λ', color:'#34d399', cat:'Humanities' },
  { name:'Arts',              sym:'◑', color:'#fb923c', cat:'Humanities' },
  { name:'Music',             sym:'♩', color:'#e879f9', cat:'Humanities' },
  { name:'Theology',          sym:'☽', color:'#fde68a', cat:'Humanities' },
  { name:'Ebology',           sym:'Ẹ', color:'#f0920c', cat:'Ifa Sciences' },
  { name:'IfaLang',           sym:'λ', color:'#3b9eff', cat:'Ifa Sciences' },
  { name:'IfaComputing',      sym:'⊕', color:'#14b8d4', cat:'Ifa Sciences' },
  { name:'IfaGebra',          sym:'∿', color:'#a78bfa', cat:'Ifa Sciences' },
  { name:'IfaAnalysis',       sym:'∂', color:'#00c87c', cat:'Ifa Sciences' },
  { name:'IfaArchitecture',   sym:'⬡', color:'#f5c518', cat:'Ifa Sciences' },
  { name:'IfaCalendar',       sym:'◎', color:'#f472b6', cat:'Ifa Sciences' },
];

/* ── Ifa-OrisaLang — Languages palette ────────────────────────────────────── */
const ORISA_LANGUAGES = [
  { name:'English',    code:'en',   dir:'ltr', color:'#3b9eff', cat:'Natural' },
  { name:'French',     code:'fr',   dir:'ltr', color:'#14b8d4', cat:'Natural' },
  { name:'Spanish',    code:'es',   dir:'ltr', color:'#00c87c', cat:'Natural' },
  { name:'Yoruba',     code:'yo',   dir:'ltr', color:'#f0920c', cat:'Natural' },
  { name:'Igbo',       code:'ig',   dir:'ltr', color:'#84cc16', cat:'Natural' },
  { name:'Hausa',      code:'ha',   dir:'ltr', color:'#fbbf24', cat:'Natural' },
  { name:'Swahili',    code:'sw',   dir:'ltr', color:'#34d399', cat:'Natural' },
  { name:'Chinese',    code:'zh',   dir:'ltr', color:'#f5c518', cat:'Natural' },
  { name:'Japanese',   code:'ja',   dir:'ltr', color:'#ec4899', cat:'Natural' },
  { name:'Korean',     code:'ko',   dir:'ltr', color:'#fb7185', cat:'Natural' },
  { name:'Hindi',      code:'hi',   dir:'ltr', color:'#c084fc', cat:'Natural' },
  { name:'Arabic',     code:'ar',   dir:'rtl', color:'#f0920c', cat:'Natural' },
  { name:'Hebrew',     code:'he',   dir:'rtl', color:'#a78bfa', cat:'Natural' },
  { name:'Persian',    code:'fa',   dir:'rtl', color:'#fb7185', cat:'Natural' },
  { name:'Urdu',       code:'ur',   dir:'rtl', color:'#fbbf24', cat:'Natural' },
  { name:"N'Ko",       code:'nqo',  dir:'rtl', color:'#c084fc', cat:'Natural' },
  { name:'Python',     code:'py',   dir:'ltr', color:'#3b9eff', cat:'Artificial' },
  { name:'JavaScript', code:'js',   dir:'ltr', color:'#f5c518', cat:'Artificial' },
  { name:'Rust',       code:'rs',   dir:'ltr', color:'#f0920c', cat:'Artificial' },
  { name:'C++',        code:'cpp',  dir:'ltr', color:'#00c87c', cat:'Artificial' },
  { name:'SQL',        code:'sql',  dir:'ltr', color:'#14b8d4', cat:'Artificial' },
  { name:'Lisp',       code:'lisp', dir:'ltr', color:'#a78bfa', cat:'Artificial' },
  { name:'Go',         code:'go',   dir:'ltr', color:'#38bdf8', cat:'Artificial' },
];

/* ── Circuit notation symbols ─────────────────────────────────────────────── */
const CIRCUIT_SYMS = [
  { sym:'─',   title:'Wire (horizontal)' },
  { sym:'│',   title:'Wire (vertical)' },
  { sym:'┤',   title:'Wire T-junction' },
  { sym:'●',   title:'Control dot' },
  { sym:'⊕',   title:'CNOT target / XOR node' },
  { sym:'⊗',   title:'Swap / cross node' },
  { sym:'|0⟩', title:'Qubit |0⟩ — zero state' },
  { sym:'|1⟩', title:'Qubit |1⟩ — one state' },
  { sym:'|+⟩', title:'Qubit |+⟩ — plus state (superposition)' },
  { sym:'|−⟩', title:'Qubit |−⟩ — minus state (superposition)' },
  { sym:'|ψ⟩', title:'Qubit |ψ⟩ — general pure state' },
  { sym:'⟨ψ|', title:'Bra ⟨ψ| — dual state vector' },
  { sym:'⊗',   title:'Tensor product' },
  { sym:'†',   title:'Hermitian conjugate (†)' },
  { sym:'√',   title:'Square root (gate notation)' },
];

/* ── Aebajiogbe-Oduduwa script characters (Arabic codepoints → custom font) ─ */
const ABD_SCRIPT_CHARS = [
  '\u0634','\u062b','\u0644\u0627','\u062a','\u062e','\u0621','\u064a','\u0628','\u0641','\u0624','\u0631','\u0645','\u0635','\u0639',
  '\u0629','\u0649','\u0647','\u0627','\u0642','\u0633','\u0626','\u0646','\u0644','\u063a','\u062d',
  '\u0648','\u0632','\u0643','\u061f','\u0637',
  '\u{1E950}','\u{1E951}','\u{1E952}','\u{1E953}','\u{1E954}','\u{1E955}','\u{1E956}','\u{1E957}','\u{1E958}','\u{1E959}',
  '\u0630','\u0636',
];

/* ── Yoruba / Ifa characters ──────────────────────────────────────────────── */
const YORUBA_CHARS = [
  'Ẹ','ẹ','Ọ','ọ','Ṣ','ṣ','Ṹ','ṹ',
  'À','à','Á','á','Â','â',
  'È','è','É','é',
  'Ì','ì','Í','í',
  'Ò','ò','Ó','ó',
  'Ù','ù','Ú','ú',
  'Ṅ','ṅ','Ǹ','ǹ',
];

/* ── Sidebar sections ─────────────────────────────────────────────────────── */
function SidebarSection({ title, open, onToggle, children }) {
  return (
    <div className={`sidebar-section${open ? ' sidebar-section--open' : ''}`}>
      <div className="sidebar-section__head" onClick={onToggle} role="button" tabIndex={0}
           onKeyDown={e => e.key === 'Enter' && onToggle()}>
        {title}
        <span className="sidebar-section__arrow">›</span>
      </div>
      {open && <div className="sidebar-section__body">{children}</div>}
    </div>
  );
}

/* ── Toolbar button ───────────────────────────────────────────────────────── */
function TbBtn({ title, active, wide, onClick, children, className: extra }) {
  return (
    <button
      className={`tb-btn${wide ? ' tb-btn--wide' : ''}${active ? ' tb-btn--active' : ''}${extra ? ` ${extra}` : ''}`}
      title={title}
      onMouseDown={e => { e.preventDefault(); onClick && onClick(); }}
    >
      {children}
    </button>
  );
}

/* ── Logic Gate SVG — shared string builder (sidebar chips + IfaTerminal insert) ─ */
function gateIconSVGHtml(name, color) {
  const a = `viewBox="0 0 56 36" width="36" height="23" fill="none" stroke="${color}" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round"`;
  switch (name) {
    case 'Buffer': return `<svg ${a}><line x1="0" y1="18" x2="8" y2="18"/><polygon points="8,5 8,31 46,18" fill="none"/><line x1="46" y1="18" x2="56" y2="18"/></svg>`;
    case 'AND':    return `<svg ${a}><line x1="0" y1="12" x2="8" y2="12"/><line x1="0" y1="24" x2="8" y2="24"/><path d="M 8,5 L 8,31 L 26,31 Q 46,31 46,18 Q 46,5 26,5 Z"/><line x1="46" y1="18" x2="56" y2="18"/></svg>`;
    case 'OR':     return `<svg ${a}><line x1="0" y1="12" x2="10" y2="12"/><line x1="0" y1="24" x2="10" y2="24"/><path d="M 10,5 Q 2,18 10,31 Q 27,28 44,18 Q 27,8 10,5 Z"/><line x1="44" y1="18" x2="56" y2="18"/></svg>`;
    case 'NOT':    return `<svg ${a}><line x1="0" y1="18" x2="6" y2="18"/><polygon points="6,5 6,31 42,18" fill="none"/><circle cx="45" cy="18" r="3" fill="none"/><line x1="48" y1="18" x2="56" y2="18"/></svg>`;
    case 'NAND':   return `<svg ${a}><line x1="0" y1="12" x2="6" y2="12"/><line x1="0" y1="24" x2="6" y2="24"/><path d="M 6,5 L 6,31 L 22,31 Q 40,31 40,18 Q 40,5 22,5 Z"/><circle cx="43" cy="18" r="3" fill="none"/><line x1="46" y1="18" x2="56" y2="18"/></svg>`;
    case 'NOR':    return `<svg ${a}><line x1="0" y1="12" x2="10" y2="12"/><line x1="0" y1="24" x2="10" y2="24"/><path d="M 10,5 Q 2,18 10,31 Q 26,28 41,18 Q 26,8 10,5 Z"/><circle cx="44" cy="18" r="3" fill="none"/><line x1="47" y1="18" x2="56" y2="18"/></svg>`;
    case 'XOR':    return `<svg ${a}><line x1="0" y1="12" x2="12" y2="12"/><line x1="0" y1="24" x2="12" y2="24"/><path d="M 12,5 Q 4,18 12,31 Q 29,28 46,18 Q 29,8 12,5 Z"/><path d="M 7,5 Q 0,18 7,31"/><line x1="46" y1="18" x2="56" y2="18"/></svg>`;
    case 'XNOR':   return `<svg ${a}><line x1="0" y1="12" x2="12" y2="12"/><line x1="0" y1="24" x2="12" y2="24"/><path d="M 12,5 Q 4,18 12,31 Q 26,28 40,18 Q 26,8 12,5 Z"/><path d="M 7,5 Q 0,18 7,31"/><circle cx="43" cy="18" r="3" fill="none"/><line x1="46" y1="18" x2="56" y2="18"/></svg>`;
    default:       return null;
  }
}

/* ── Logic Gate Icon React component (sidebar chips) ─────────────────────── */
function GateIcon({ name, color }) {
  const svg = gateIconSVGHtml(name, color);
  if (svg) return <span dangerouslySetInnerHTML={{ __html: svg }}/>;
  return <span style={{ color, fontSize:'1rem', fontWeight:700 }}>{name[0]}</span>;
}

/* ── Quantum Gate SVG — circuit-diagram style ─────────────────────────────── */
function quantumGateIconSVGHtml(gateName, label, color) {
  const s = color;
  const fs = label.length > 3 ? 7 : label.length > 2 ? 9 : 12;
  const oneQ = `viewBox="0 0 56 36" width="36" height="23" fill="none" stroke="${s}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"`;
  const twoQ = `viewBox="0 0 56 54" width="36" height="34" fill="none" stroke="${s}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"`;
  const txt = (x, y, lbl, size) => `<text x="${x}" y="${y}" text-anchor="middle" dominant-baseline="middle" fill="${s}" stroke="none" font-size="${size}" font-weight="700" font-family="Georgia,serif">${lbl}</text>`;
  if (gateName === 'CNOT') {
    // control dot + vertical + target ⊕
    return `<svg ${twoQ}><line x1="0" y1="13" x2="56" y2="13"/><circle cx="28" cy="13" r="4" fill="${s}" stroke="none"/><line x1="28" y1="17" x2="28" y2="31"/><line x1="0" y1="41" x2="56" y2="41"/><circle cx="28" cy="41" r="10"/><line x1="28" y1="31" x2="28" y2="51"/><line x1="18" y1="41" x2="38" y2="41"/></svg>`;
  }
  if (gateName === 'Ctrl-Z') {
    // control dot + vertical + box Z
    return `<svg ${twoQ}><line x1="0" y1="13" x2="56" y2="13"/><circle cx="28" cy="13" r="4" fill="${s}" stroke="none"/><line x1="28" y1="17" x2="28" y2="29"/><line x1="0" y1="41" x2="12" y2="41"/><rect x="12" y="29" width="32" height="24" rx="3" fill="${s}18"/>${txt(28,41,'Z',12)}<line x1="44" y1="41" x2="56" y2="41"/></svg>`;
  }
  if (gateName === 'Ctrl-Phase') {
    // control dot + vertical + box S
    return `<svg ${twoQ}><line x1="0" y1="13" x2="56" y2="13"/><circle cx="28" cy="13" r="4" fill="${s}" stroke="none"/><line x1="28" y1="17" x2="28" y2="29"/><line x1="0" y1="41" x2="12" y2="41"/><rect x="12" y="29" width="32" height="24" rx="3" fill="${s}18"/>${txt(28,41,'S',12)}<line x1="44" y1="41" x2="56" y2="41"/></svg>`;
  }
  if (gateName === 'SWAP') {
    // two wires with × marks connected vertically
    const d = 6;
    return `<svg ${twoQ}><line x1="0" y1="13" x2="56" y2="13"/><line x1="0" y1="41" x2="56" y2="41"/><line x1="${28-d}" y1="${13-d}" x2="${28+d}" y2="${13+d}"/><line x1="${28+d}" y1="${13-d}" x2="${28-d}" y2="${13+d}"/><line x1="${28-d}" y1="${41-d}" x2="${28+d}" y2="${41+d}"/><line x1="${28+d}" y1="${41-d}" x2="${28-d}" y2="${41+d}"/><line x1="28" y1="${13+d}" x2="28" y2="${41-d}"/></svg>`;
  }
  // Single-qubit gate: ─[box label]─
  return `<svg ${oneQ}><line x1="0" y1="18" x2="12" y2="18"/><rect x="12" y="4" width="32" height="28" rx="3" fill="${s}18"/>${txt(28,18,label,fs)}<line x1="44" y1="18" x2="56" y2="18"/></svg>`;
}

/* ── Quantum Gate Icon React component ───────────────────────────────────── */
function QGateIcon({ name, label, color }) {
  const svg = quantumGateIconSVGHtml(name, label, color);
  if (svg) return <span dangerouslySetInnerHTML={{ __html: svg }}/>;
  return <span style={{ color, fontSize:'1rem', fontWeight:700 }}>{label}</span>;
}

/* ── IfaGate chip icon — gate shape/sym + OgbeSymbol or OyekuSymbol subscript ─ */
function IfaGateIcon({ gate }) {
  const { pureSymbol, isEnergy, sym, gateType, color } = gate;
  if (pureSymbol) {
    return isEnergy ? <OgbeSymbol size={22} /> : <OyekuSymbol size={22} />;
  }
  const subSym = isEnergy
    ? <span style={{ position:'absolute', bottom:'-0.1em', right:'-0.45em', lineHeight:1, display:'inline-flex' }}><OgbeSymbol size={9} /></span>
    : <span style={{ position:'absolute', bottom:'-0.1em', right:'-0.45em', lineHeight:1, display:'inline-flex' }}><OyekuSymbol size={9} /></span>;
  const mainIcon = gateType
    ? <GateIcon name={gateType} color={color} />
    : <span style={{ color, fontSize:'1rem', fontFamily:'Georgia,serif', lineHeight:1, fontWeight:700 }}>{sym}</span>;
  return (
    <span style={{ position:'relative', display:'inline-flex', alignItems:'center', lineHeight:1, paddingRight:'0.45em', paddingBottom:'0.1em' }}>
      {mainIcon}{subSym}
    </span>
  );
}

/* ── ifaGateHtml — HTML string of IfaGate expression for terminal insertion ─ */
function ifaGateHtml(gate) {
  const { pureSymbol, isEnergy, sym, gateType, color } = gate;
  const subSVG = isEnergy
    ? `<span style="position:absolute;bottom:-0.1em;right:-0.45em;line-height:1;display:inline-flex">${buildOgbeSVGStr(9)}</span>`
    : `<span style="position:absolute;bottom:-0.1em;right:-0.45em;line-height:1;display:inline-flex">${buildOyekuSVGStr(9)}</span>`;
  if (pureSymbol) {
    return isEnergy ? buildOgbeSVGStr(22) : buildOyekuSVGStr(22);
  }
  const mainHtml = gateType
    ? (gateIconSVGHtml(gateType, color) || `<span style="color:${color};font-family:Georgia,serif;font-weight:700">${sym}</span>`)
    : `<span style="color:${color};font-size:1rem;font-family:Georgia,serif;font-weight:700;line-height:1">${sym}</span>`;
  return `<span style="position:relative;display:inline-flex;align-items:center;line-height:1;padding-right:0.45em;padding-bottom:0.1em">${mainHtml}${subSVG}</span>`;
}

/* ── Word / char count ────────────────────────────────────────────────────── */
function countText(el) {
  if (!el) return { words: 0, chars: 0 };
  const text = el.innerText || '';
  const chars = text.replace(/\n/g, '').length;
  const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  return { words, chars };
}

/* ── Main IfaEditor component ─────────────────────────────────────────────── */
function IfaEditor() {
  const [penMode, setPenMode]         = useState('ogbe');
  const [sections, setSections]       = useState({ odu: true, signs: false, aeb: false, yoruba: false, principles: false, circuit: false, construction: false, bidi: false, orisaField: false, orisaLang: false });
  const [canvasDir, setCanvasDir]     = useState('rtl');
  const [circuitTab, setCircuitTab]   = useState('classical');
  const [principlesTab, setPrinciplesTab] = useState('sidechrx');
  const [textColor, setTextColor]     = useState('#f0f5ff');
  const [counts, setCounts]           = useState({ words: 0, chars: 0 });
  const [oduMarks, setOduMarks]       = useState([]);  // 0–8 pending IfaPen marks
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [varName, setVarName]         = useState('');
  const [varValue, setVarValue]       = useState('');
  const [circuitName, setCircuitName] = useState('');
  const canvasRef = useRef(null);
  const colorInputRef = useRef(null);

  const mode = PEN_MODES[penMode];

  /* ── focus canvas on mount ──────────────────────────────────────────────── */
  useEffect(() => {
    setTimeout(() => canvasRef.current?.focus(), 80);
  }, []);

  /* ── update counts on input ─────────────────────────────────────────────── */
  const handleInput = useCallback(() => {
    setCounts(countText(canvasRef.current));
  }, []);

  /* ── execCommand helpers ────────────────────────────────────────────────── */
  const fmt = useCallback((cmd, val = null) => {
    canvasRef.current?.focus();
    document.execCommand(cmd, false, val);
  }, []);

  const insertHTML = useCallback((html) => {
    canvasRef.current?.focus();
    document.execCommand('insertHTML', false, html);
  }, []);

  const insertText = useCallback((text) => {
    canvasRef.current?.focus();
    document.execCommand('insertText', false, text);
  }, []);

  /* ── Insert completed Odu tray ───────────────────────────────────────────────
     Babalawo order (Opon Ifa, RTL top→bottom):
       Press 1 → right col row 0 · Press 2 → left col row 0
       Press 3 → right col row 1 · Press 4 → left col row 1
       Press 5 → right col row 2 · Press 6 → left col row 2
       Press 7 → right col row 3 · Press 8 → left col row 3
     So: right = marks[0,2,4,6]  |  left = marks[1,3,5,7]                   */
  const insertOduTray = useCallback((marks) => {
    const markHTML = (m) => {
      const sym   = m === 'ogbe' ? '|' : '||';
      const color = m === 'ogbe' ? '#f5c518' : '#a78bfa';
      return `<span class="odu-tray__mark" style="color:${color}">${sym}</span>`;
    };
    const colHTML = (col) =>
      `<span class="odu-tray__col">${col.map(markHTML).join('')}</span>`;
    const right = [marks[0], marks[2], marks[4], marks[6]];
    const left  = [marks[1], marks[3], marks[5], marks[7]];
    const title = oduTrayTitle(marks);
    const html  = `<span class="odu-tray" contenteditable="false"${title ? ` title="${title}"` : ''}>${colHTML(right)}${colHTML(left)}</span>&#8203;`;
    canvasRef.current?.focus();
    document.execCommand('insertHTML', false, html);
  }, []);

  /* ── Press one IfaPen mark — builds Odu mark by mark ───────────────────── */
  const pressIfaPen = useCallback((tip) => {
    setPenMode(tip);
    setOduMarks(prev => {
      const next = [...prev, tip];
      return next.length <= 8 ? next : prev;
    });
  }, []);

  /* ── Auto-commit when 8th mark is placed ────────────────────────────────── */
  useEffect(() => {
    if (oduMarks.length === 8) {
      insertOduTray(oduMarks);
      setOduMarks([]);
    }
  }, [oduMarks, insertOduTray]);

  /* ── Aebajiogbe char click: insert as Aebajiogbe-font span (RTL) ─────────── */
  const insertAebChar = useCallback((ch) => {
    insertHTML(`<span class="aeb-inline">${ch}</span>`);
  }, [insertHTML]);

  /* ── Odu chip click: insert mark as styled span ─────────────────────────── */
  const insertOduMark = useCallback((odu) => {
    insertHTML(
      `<span class="odu-inline" style="color:${odu.color}" title="${odu.name} (${odu.code})">${glyphHTML(odu.mark)}</span>`
    );
  }, [insertHTML]);

  /* ── Export as plain text ────────────────────────────────────────────────── */
  const exportTxt = useCallback(() => {
    const text = canvasRef.current?.innerText || '';
    const blob = new Blob([text], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'ifa-editor-draft.txt';
    a.click();
  }, []);

  /* ── Export as HTML ──────────────────────────────────────────────────────── */
  const exportHTML = useCallback(() => {
    const inner = canvasRef.current?.innerHTML || '';
    const html = `<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8">\n<title>IfaEditor Export</title>\n<style>body{font-family:Georgia,serif;max-width:780px;margin:40px auto;line-height:1.8;color:#111}</style>\n</head>\n<body>\n${inner}\n</body>\n</html>`;
    const blob = new Blob([html], { type: 'text/html' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'ifa-editor-export.html';
    a.click();
  }, []);

  /* ── toggle sidebar section ──────────────────────────────────────────────── */
  const toggleSection = useCallback((key) => {
    setSections(prev => ({ ...prev, [key]: !prev[key] }));
  }, []);

  /* ── heading select ──────────────────────────────────────────────────────── */
  const applyHeading = useCallback((val) => {
    if (val === 'p') fmt('formatBlock', 'p');
    else if (val === 'h1') fmt('formatBlock', 'h1');
    else if (val === 'h2') fmt('formatBlock', 'h2');
    else if (val === 'h3') fmt('formatBlock', 'h3');
    else if (val === 'blockquote') fmt('formatBlock', 'blockquote');
  }, [fmt]);

  /* ── apply text colour ───────────────────────────────────────────────────── */
  const applyColor = useCallback((color) => {
    setTextColor(color);
    fmt('foreColor', color);
  }, [fmt]);

  /* ── clear canvas ────────────────────────────────────────────────────────── */
  const clearCanvas = useCallback(() => {
    if (canvasRef.current) {
      canvasRef.current.innerHTML = '';
      canvasRef.current.focus();
    }
    setCounts({ words: 0, chars: 0 });
    setOduMarks([]);
  }, []);

  /* ── Insert a manually-constructed IfaVariable into the terminal ────────── */
  const insertIfaVariable = useCallback(() => {
    if (!varName.trim()) return;
    const n = varName.trim();
    const html = `<span style="display:inline-flex;align-items:baseline;padding:1px 9px;border:1px solid rgba(245,197,24,0.32);border-radius:6px;background:rgba(245,197,24,0.06);white-space:nowrap;margin:0 2px;color:#f5c518;font-weight:700;font-family:Georgia,serif;vertical-align:middle" title="IfaVariable: ${n}">${n}</span>&#8203;`;
    insertHTML(html);
    setVarName('');
  }, [varName, insertHTML]);

  /* ── Insert variable + OgbeSymbol subscript → Ifa Expression ─────────────── */
  const insertOgbeExpr = useCallback(() => {
    const n = varName.trim();
    const html = n
      ? `<span class="ifa-expr" style="margin:0 0.45em 0 0" title="IfaExpression: ${n} (Ogbe Energy)"><span class="ifa-expr__char">${n}</span><span class="ifa-expr__sym" style="width:11px;height:11px">${buildOgbeSVGStr(11)}</span></span>&#8203;`
      : `<span class="ifa-expr" style="margin:0 0.45em 0 0" title="IfaExpression: Ogbe Energy"><span class="ifa-expr__sym" style="width:11px;height:11px">${buildOgbeSVGStr(11)}</span></span>&#8203;`;
    insertHTML(html);
    setVarName('');
  }, [varName, insertHTML]);

  /* ── Insert variable + OyekuSymbol subscript → Ifa Expression ───────────── */
  const insertOyekuExpr = useCallback(() => {
    const n = varName.trim();
    const html = n
      ? `<span class="ifa-expr" style="margin:0 0.45em 0 0" title="IfaExpression: ${n} (Oyeku Anergy)"><span class="ifa-expr__char">${n}</span><span class="ifa-expr__sym" style="width:11px;height:11px">${buildOyekuSVGStr(11)}</span></span>&#8203;`
      : `<span class="ifa-expr" style="margin:0 0.45em 0 0" title="IfaExpression: Oyeku Anergy"><span class="ifa-expr__sym" style="width:11px;height:11px">${buildOyekuSVGStr(11)}</span></span>&#8203;`;
    insertHTML(html);
    setVarName('');
  }, [varName, insertHTML]);

  /* ── Insert OgbeSymbol as standalone Ifa Variable (normal form) ──────────── */
  const insertStandaloneOgbe = useCallback(() => {
    const html = `<span style="display:inline-flex;align-items:center;padding:2px 7px;border:1px solid rgba(245,197,24,0.32);border-radius:6px;background:rgba(245,197,24,0.06);white-space:nowrap;margin:0 2px;vertical-align:middle" title="Ifa Variable: Ogbe Energy">${buildOgbeSVGStr(16)}</span>&#8203;`;
    insertHTML(html);
  }, [insertHTML]);

  /* ── Insert OyekuSymbol as standalone Ifa Variable (normal form) ─────────── */
  const insertStandaloneOyeku = useCallback(() => {
    const html = `<span style="display:inline-flex;align-items:center;padding:2px 7px;border:1px solid rgba(245,197,24,0.32);border-radius:6px;background:rgba(245,197,24,0.06);white-space:nowrap;margin:0 2px;vertical-align:middle" title="Ifa Variable: Oyeku Anergy">${buildOyekuSVGStr(16)}</span>&#8203;`;
    insertHTML(html);
  }, [insertHTML]);

  /* ── Insert a manually-constructed IfaCircuit block into the terminal ────── */
  const insertIfaCircuit = useCallback(() => {
    if (!circuitName.trim()) return;
    const n = circuitName.trim();
    const html = `<span style="display:inline-flex;align-items:center;gap:4px;padding:2px 10px;border:1px solid rgba(20,184,212,0.35);border-radius:6px;background:rgba(20,184,212,0.07);white-space:nowrap;margin:0 2px;font-family:Georgia,serif;vertical-align:middle" title="IfaCircuit: ${n}"><span style="color:#14b8d4;opacity:0.6;font-size:0.8em">⟦</span><span style="color:#14b8d4;font-weight:700">${n}</span><span style="color:#14b8d4;opacity:0.6;font-size:0.8em">⟧</span></span>&#8203;`;
    insertHTML(html);
    setCircuitName('');
  }, [circuitName, insertHTML]);

  /* ── Wrap current selection (or insert cursor marker) in a directional span ─
     dir: 'ltr' | 'rtl' | 'auto' | 'isolate' (bdi)                            */
  const wrapDir = useCallback((dir) => {
    canvasRef.current?.focus();
    const sel = window.getSelection();
    if (!sel || !sel.rangeCount) return;
    const range = sel.getRangeAt(0);
    if (range.collapsed) {
      // Nothing selected — insert a zero-width space in a directional context
      // so the next keystrokes adopt the chosen direction
      const html = dir === 'isolate'
        ? `<bdi>&#8203;</bdi>&#8203;`
        : `<span dir="${dir}" style="unicode-bidi:isolate">&#8203;</span>&#8203;`;
      document.execCommand('insertHTML', false, html);
      return;
    }
    // Clone selected content as serialised HTML, then re-insert wrapped
    const frag = range.cloneContents();
    const tmp  = document.createElement('div');
    tmp.appendChild(frag);
    const inner = tmp.innerHTML;
    const html = dir === 'isolate'
      ? `<bdi>${inner}</bdi>&#8203;`
      : `<span dir="${dir}" style="unicode-bidi:isolate">${inner}</span>&#8203;`;
    document.execCommand('insertHTML', false, html);
    handleInput();
  }, [handleInput]);

  /* ── Insert a Unicode BiDi control character ─────────────────────────────── */
  const insertBiDiChar = useCallback((sym) => {
    canvasRef.current?.focus();
    document.execCommand('insertText', false, sym);
  }, []);

  /* ── Insert a world-script directional span at cursor ────────────────────── */
  const insertScriptSpan = useCallback((script) => {
    const dir  = script.dir;
    const html = `<span dir="${dir}" style="unicode-bidi:isolate" title="IfaFlow — ${script.name} (${dir.toUpperCase()})">&#8203;</span>&#8203;`;
    canvasRef.current?.focus();
    document.execCommand('insertHTML', false, html);
  }, []);

  /* ── Insert a field-of-knowledge annotation label at cursor ─────────────── */
  const insertFieldLabel = useCallback((field) => {
    const html = `<span data-orisa-field="${field.name}" style="color:${field.color};font-weight:700;font-size:0.8em;border:1px solid ${field.color}55;border-radius:4px;padding:1px 5px;background:${field.color}12" title="Ifa-OrisaField — ${field.name}">${field.sym} ${field.name}</span>&#8203;`;
    canvasRef.current?.focus();
    document.execCommand('insertHTML', false, html);
  }, []);

  /* ── Insert a language-tagged span at cursor ──────────────────────────────── */
  const insertLangSpan = useCallback((lang) => {
    const html = `<span lang="${lang.code}" dir="${lang.dir}" style="unicode-bidi:isolate" title="Ifa-OrisaLang — ${lang.name} (${lang.code.toUpperCase()})">&#8203;</span>&#8203;`;
    canvasRef.current?.focus();
    document.execCommand('insertHTML', false, html);
  }, []);

  /* ── Insert a gate box from the IfaCircuit Builder palette ──────────────── */
  const insertGateBox = useCallback((gate, tabType) => {
    let inner, boxStyle;
    if (tabType === 'classical') {
      inner = gateIconSVGHtml(gate.name, gate.color) || gate.sym;
      boxStyle = `display:inline-flex;align-items:center;padding:2px 5px;border:1px solid ${gate.color}55;border-radius:5px;background:${gate.color}10;margin:0 2px;white-space:nowrap;vertical-align:middle;line-height:1`;
    } else if (tabType === 'quantum') {
      inner = quantumGateIconSVGHtml(gate.name, gate.label || gate.sym, gate.color) || gate.sym;
      boxStyle = `display:inline-flex;align-items:center;padding:2px 5px;border:1px solid ${gate.color}55;border-radius:5px;background:${gate.color}10;margin:0 2px;white-space:nowrap;vertical-align:middle;line-height:1`;
    } else if (tabType === 'ifa') {
      inner = ifaGateHtml(gate);
      boxStyle = `display:inline-flex;align-items:center;padding:2px 8px;border:1px solid ${gate.color}55;border-radius:5px;background:${gate.color}10;margin:0 2px;white-space:nowrap;vertical-align:middle;line-height:1`;
    } else {
      inner = gate.sym;
      boxStyle = `display:inline-flex;align-items:baseline;padding:1px 7px;border:1px solid ${gate.color}55;border-radius:5px;background:${gate.color}12;color:${gate.color};font-size:0.92em;margin:0 2px;font-family:Georgia,serif;line-height:1.65;white-space:nowrap`;
    }
    const html = `<span style="${boxStyle}" title="${gate.name}">${inner}</span>&#8203;`;
    insertHTML(html);
  }, [insertHTML]);

  return (
    <div className={`ifaed ifaed--${penMode}`}>

      {/* ── Topbar ──────────────────────────────────────────────────────────── */}
      <header className="ifaed-topbar">
        <div className="ifaed-topbar__left">
          <a href="../" className="ifaed-back">← IfaNote Pro</a>
          <span className="ifaed-topbar__sep">/</span>
          <div className="ifaed-title">
            <span>Ifa</span>Editor
            &nbsp;·&nbsp;
            <span style={{ color: '#6e90b8', fontWeight: 400 }}>ToE Editor</span>
          </div>

          <div style={{
            display:'flex', alignItems:'center', gap:'5px',
            marginLeft:'14px', flexShrink: 0
          }}>
            <span
              title="The IfaShell: Ìkara — outer Shell of Ikin Ifá; wraps the Kernel as Ìkara wraps Kórókin"
              style={{
                fontSize:'0.67rem', padding:'2px 9px', borderRadius:'12px',
                border:'1px solid #14d4f433', color:'#14d4f4',
                background:'#14d4f40a', letterSpacing:'0.025em',
                whiteSpace:'nowrap', cursor:'default', userSelect:'none',
              }}>
              ⬡ The IfaShell: Ìkara
            </span>
            <span aria-hidden="true" style={{ color:'#2e4460', fontSize:'0.75rem', lineHeight:1 }}>⊃</span>
            <span
              title="The IfaKernel: Kórókin — the Seed at the heart of Ikin Ifá; the innermost core wrapped by Ìkara"
              style={{
                fontSize:'0.67rem', padding:'2px 9px', borderRadius:'12px',
                border:'1px solid #f0920c33', color:'#f0920c',
                background:'#f0920c0a', letterSpacing:'0.025em',
                whiteSpace:'nowrap', cursor:'default', userSelect:'none',
              }}>
              ⚙ The IfaKernel: Kórókin
            </span>
          </div>

        </div>

        {/* ── IfaPen ───────────────────────────────────────────────────────── */}
        <div className="ifaed-topbar__right">
          <div className="ifapen-wrap">
            <div className="ifapen-fn-label">
              <span className="ifapen-fn-label__action">
                IfaPrint<span className="ifapen-fn-label__slash">/</span>IfaWrite
              </span>
              <span className="ifapen-fn-label__sep" />
              <span className="ifapen-fn-label__yor">
                Tẹ Odù sọ́pọ́n <em>(Todùsọ́pọ́n)</em>
              </span>
            </div>

            {/* Odu tray preview — Babalawo order: right col row 0, left col row 0, right col row 1 … */}
            {oduMarks.length > 0 && (
              <div className="odu-pen-preview"
                   title={`${oduMarks.length}/8 marks — ${8 - oduMarks.length} to complete Odu`}>
                {[0, 1].map(colIdx => (
                  <div key={colIdx} className="odu-pen-preview__col">
                    {[0, 1, 2, 3].map(rowIdx => {
                      const m = oduMarks[rowIdx * 2 + colIdx];
                      return (
                        <div key={rowIdx}
                             className={`odu-pen-preview__slot${m ? ' is-filled' : ''}`}
                             style={m ? { color: m === 'ogbe' ? '#f5c518' : '#a78bfa' } : {}}>
                          {m ? (m === 'ogbe' ? '|' : '||') : '·'}
                        </div>
                      );
                    })}
                  </div>
                ))}
                <button
                  className="odu-pen-preview__reset"
                  onMouseDown={e => { e.preventDefault(); setOduMarks([]); }}
                  title="Clear pending marks">×</button>
              </div>
            )}

            <div className="ifapen-toggle" title="IfaPen — ogbebit · oyekubit">
              <button
                className={`ifapen-btn ifapen-btn--oyeku${penMode === 'oyeku' ? ' ifapen-btn--active' : ''}`}
                onMouseDown={e => { e.preventDefault(); pressIfaPen('oyeku'); }}
                title="oyekubit — Tẹ Ọ̀yẹ̀kú · Anergy mark (||)"
              >
                <span className="ifapen-btn__mark">{PEN_MODES.oyeku.mark}</span>
                oyekubit
              </button>
              <span className="ifapen-divider" />
              <button
                className={`ifapen-btn ifapen-btn--ogbe${penMode === 'ogbe' ? ' ifapen-btn--active' : ''}`}
                onMouseDown={e => { e.preventDefault(); pressIfaPen('ogbe'); }}
                title="ogbebit — Tẹ Ogbè · Energy mark (|)"
              >
                <span className="ifapen-btn__mark">{PEN_MODES.ogbe.mark}</span>
                ogbebit
              </button>
            </div>

            {/* ── Create Your IfaBit ──────────────────────────────────────────── */}
            <div style={{
              marginTop:'7px', paddingTop:'7px',
              borderTop:'1px solid rgba(255,255,255,0.06)',
              display:'flex', flexDirection:'column', alignItems:'center', gap:'4px',
            }}>
              <div title="Press ogbebit (|) or oyekubit (||) to place an IfaBit — 8 marks build one Odu" style={{
                display:'inline-flex', alignItems:'center', gap:'7px',
                background: penMode === 'ogbe' ? 'rgba(245,197,24,0.08)' : 'rgba(167,139,250,0.08)',
                border: `1px solid ${penMode === 'ogbe' ? 'rgba(245,197,24,0.24)' : 'rgba(167,139,250,0.24)'}`,
                borderRadius:'10px', padding:'3px 11px 3px 8px', cursor:'default',
              }}>
                <span style={{
                  color: penMode === 'ogbe' ? '#f5c518' : '#a78bfa',
                  fontSize:'0.82rem', lineHeight:1, fontWeight:700,
                  minWidth:'14px', textAlign:'center',
                }}>
                  {penMode === 'ogbe' ? '|' : '||'}
                </span>
                <span style={{
                  fontSize:'0.6rem', fontWeight:700, letterSpacing:'0.08em',
                  color:'#6e90b8',
                }}>
                  Create Your IfaBit
                </span>
              </div>
              <div style={{
                fontSize:'0.53rem', color:'#3a4f6a',
                letterSpacing:'0.04em', textAlign:'center',
              }}>
                Building Block · IfaSystem · IfaTech
              </div>
            </div>

          </div>

          <button className="ifaed-action" onClick={exportTxt} title="Export plain text">
            ↓ .txt
          </button>
          <button className="ifaed-action" onClick={exportHTML} title="Export HTML">
            ↓ .html
          </button>
        </div>
      </header>

      {/* ── Body ────────────────────────────────────────────────────────────── */}
      <div className="ifaed-body">

        {/* Backdrop — closes sidebar drawer on mobile */}
        {sidebarOpen && (
          <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} aria-hidden="true" />
        )}

        {/* ── Sidebar ─────────────────────────────────────────────────────── */}
        <aside className={`ifaed-sidebar${sidebarOpen ? ' ifaed-sidebar--open' : ''}`}
               aria-label="Ifa symbol palette">

          {/* Mobile drawer header */}
          <div className="sidebar-mobile-header">
            <span>Odù Palette</span>
            <button className="sidebar-mobile-close"
                    onMouseDown={e => { e.preventDefault(); setSidebarOpen(false); }}
                    aria-label="Close palette">✕</button>
          </div>

          {/* IfaCharacters */}
          <SidebarSection title="IfaCharacters" open={sections.odu} onToggle={() => toggleSection('odu')}>
            <div className="odu-palette">
              {Array.from({length: 8}, (_, i) => [ODU[i*2+1], ODU[i*2]]).flat().map(o => (
                <button
                  key={o.num}
                  className="odu-chip"
                  title={`${o.name} (${o.latin})`}
                  onClick={() => insertOduMark(o)}
                >
                  <span className="odu-chip__mark" style={{ color: o.color }}>{renderGlyph(o.mark)}</span>
                </button>
              ))}
            </div>
          </SidebarSection>

          {/* Ifa-Orisa Principles */}
          <SidebarSection title="Ifa-Orisa Principles" open={sections.principles} onToggle={() => toggleSection('principles')}>

            {/* Tab switcher */}
            <div style={{ display:'flex', gap:'4px', marginBottom:'10px' }}>
              {[
                { key:'sidechrx', label:'SIDECHRX', color:'#f5c518' },
                { key:'steamsex', label:'STEAMSEX',  color:'#14b8d4' },
              ].map(t => (
                <button key={t.key}
                  onMouseDown={e => { e.preventDefault(); setPrinciplesTab(t.key); }}
                  style={{
                    flex:1, fontSize:'0.58rem', padding:'4px 0', borderRadius:'6px',
                    border:`1px solid ${principlesTab === t.key ? t.color + '55' : 'rgba(255,255,255,0.07)'}`,
                    background: principlesTab === t.key ? t.color + '16' : 'transparent',
                    color: principlesTab === t.key ? t.color : '#3a5070',
                    fontWeight: principlesTab === t.key ? 700 : 400,
                    cursor:'pointer', letterSpacing:'0.04em', transition:'all 0.15s',
                  }}>
                  {t.label}
                </button>
              ))}
            </div>

            {/* Eyebrow */}
            <div style={{ fontSize:'0.52rem', color:'#2e4460', letterSpacing:'0.07em', marginBottom:'7px' }}>
              {principlesTab === 'sidechrx' && '8 Meta-Laws · IFA Mathematica · Click to Insert'}
              {principlesTab === 'steamsex' && '8 Domains · 16 Oju Odu · Click to Insert'}
            </div>

            {/* SIDECHRX Matrix */}
            {principlesTab === 'sidechrx' && (
              <div style={{ display:'flex', flexDirection:'column', gap:'4px' }}>
                {SIDECHRX_MATRIX.map((p, i) => (
                  <button key={i}
                    title={`${p.letter} — ${p.name} (${p.odu}) · ${p.subtitle}\n${p.tagline}`}
                    onMouseDown={e => {
                      e.preventDefault();
                      insertHTML(
                        `<span style="display:inline-flex;align-items:baseline;gap:5px;padding:1px 8px;border:1px solid ${p.color}44;border-radius:5px;background:${p.color}0d;white-space:nowrap;margin:0 2px;vertical-align:middle"><span style="color:${p.color};font-weight:700;font-family:Georgia,serif;font-size:1.05em">${p.symbol}</span><span style="color:${p.color};font-weight:700;font-size:0.88em">${p.letter}</span><span style="color:#aab8d4;font-size:0.82em">${p.name}</span><span style="color:#3a5070;font-size:0.75em">·</span><span style="color:#6a7f9a;font-size:0.75em;font-style:italic">${p.odu}</span></span>&#8203;`
                      );
                    }}
                    style={{
                      display:'flex', alignItems:'center', gap:'7px',
                      padding:'5px 8px', borderRadius:'7px', textAlign:'left',
                      border:`1px solid ${p.color}22`, background:`${p.color}08`,
                      cursor:'pointer', transition:'background 0.12s, border-color 0.12s',
                    }}>
                    <span style={{ color:p.color, fontSize:'1rem', fontFamily:'Georgia,serif', minWidth:'16px', textAlign:'center' }}>{p.symbol}</span>
                    <span style={{ display:'flex', flexDirection:'column', gap:'1px', flex:1, minWidth:0 }}>
                      <span style={{ display:'flex', alignItems:'baseline', gap:'5px' }}>
                        <span style={{ color:p.color, fontWeight:700, fontSize:'0.65rem', letterSpacing:'0.04em' }}>{p.letter} — {p.name}</span>
                        <span style={{ color:'#3a5070', fontSize:'0.58rem' }}>{p.odu}</span>
                      </span>
                      <span style={{ color:'#4a6080', fontSize:'0.55rem', lineHeight:1.3, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{p.subtitle}</span>
                    </span>
                  </button>
                ))}
              </div>
            )}

            {/* STEAMSEX Matrix */}
            {principlesTab === 'steamsex' && (
              <div style={{ display:'flex', flexDirection:'column', gap:'4px' }}>
                {STEAMSEX_MATRIX.map((d, i) => (
                  <button key={i}
                    title={`${d.letter} — ${d.domain}\n${d.sub}\nOdu: ${d.odu1} · ${d.odu2}`}
                    onMouseDown={e => {
                      e.preventDefault();
                      insertHTML(
                        `<span style="display:inline-flex;align-items:baseline;gap:5px;padding:1px 8px;border:1px solid ${d.color}44;border-radius:5px;background:${d.color}0d;white-space:nowrap;margin:0 2px;vertical-align:middle"><span style="color:${d.color};font-weight:700;font-size:0.9em">${d.letter}</span><span style="color:#aab8d4;font-size:0.82em">${d.domain}</span><span style="color:#3a5070;font-size:0.75em">·</span><span style="color:#6a7f9a;font-size:0.75em;font-style:italic">${d.odu1} · ${d.odu2}</span></span>&#8203;`
                      );
                    }}
                    style={{
                      display:'flex', alignItems:'center', gap:'7px',
                      padding:'5px 8px', borderRadius:'7px', textAlign:'left',
                      border:`1px solid ${d.color}22`, background:`${d.color}08`,
                      cursor:'pointer', transition:'background 0.12s, border-color 0.12s',
                    }}>
                    <span style={{
                      color:d.color, fontWeight:700, fontSize:'0.78rem',
                      fontFamily:'Georgia,serif', minWidth:'16px', textAlign:'center',
                    }}>{d.letter}</span>
                    <span style={{ display:'flex', flexDirection:'column', gap:'1px', flex:1, minWidth:0 }}>
                      <span style={{ display:'flex', alignItems:'baseline', gap:'5px' }}>
                        <span style={{ color:d.color, fontWeight:700, fontSize:'0.65rem', letterSpacing:'0.04em' }}>{d.domain}</span>
                        <span style={{ color:'#3a5070', fontSize:'0.58rem' }}>{d.odu1} · {d.odu2}</span>
                      </span>
                      <span style={{ color:'#4a6080', fontSize:'0.55rem', lineHeight:1.3, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{d.sub}</span>
                    </span>
                  </button>
                ))}
              </div>
            )}


          {/* ── Ifa-OrisaField subsection ──────────────────────────────────── */}
          <SidebarSection title="Ifa-OrisaField — Language-Agnostic Field" open={sections.orisaField} onToggle={() => toggleSection('orisaField')}>

            <div style={{ fontSize:'0.52rem', color:'#2e4460', letterSpacing:'0.07em', marginBottom:'12px', lineHeight:1.6 }}>
              Language-Independent Field (LIF): Study or express any field of knowledge — sciences and non-sciences — based on Odu Ifa-Orisa Principles. Click to insert a field annotation at cursor.
            </div>

            {[
              { cat:'Sciences',       color:'#3b9eff' },
              { cat:'Social Sciences',color:'#ec4899' },
              { cat:'Humanities',     color:'#f5c518' },
              { cat:'Ifa Sciences',   color:'#f0920c' },
            ].map(({ cat, color }) => (
              <div key={cat} style={{ marginBottom:'10px' }}>
                <div style={{ fontSize:'0.55rem', fontWeight:700, letterSpacing:'0.08em', color, marginBottom:'5px', textTransform:'uppercase' }}>
                  {cat}
                </div>
                <div style={{ display:'flex', flexWrap:'wrap', gap:'4px' }}>
                  {ORISA_KNOWLEDGE_FIELDS.filter(f => f.cat === cat).map((f, i) => (
                    <button key={i}
                      title={`Ifa-OrisaField: ${f.name}\nClick to insert field annotation`}
                      onMouseDown={e => { e.preventDefault(); insertFieldLabel(f); }}
                      style={{
                        display:'inline-flex', alignItems:'center', gap:'4px',
                        padding:'3px 7px', borderRadius:'6px', fontSize:'0.58rem', fontWeight:600,
                        border:`1px solid ${f.color}44`, background:`${f.color}0d`,
                        color:f.color, cursor:'pointer', letterSpacing:'0.02em',
                        transition:'background 0.12s',
                      }}>
                      <span style={{ fontSize:'0.7rem' }}>{f.sym}</span>
                      {f.name}
                    </button>
                  ))}
                </div>
              </div>
            ))}

          </SidebarSection>

          {/* ── Ifa-OrisaLang subsection ───────────────────────────────────── */}
          <SidebarSection title="Ifa-OrisaLang — Field-Agnostic Language" open={sections.orisaLang} onToggle={() => toggleSection('orisaLang')}>

            <div style={{ fontSize:'0.52rem', color:'#2e4460', letterSpacing:'0.07em', marginBottom:'12px', lineHeight:1.6 }}>
              Field-Independent Language (FIL): Study or express any language — natural or artificial — based on Odu Ifa-Orisa Principles. Click to open a language-tagged span at cursor, then type in that language.
            </div>

            {[
              { cat:'Natural',    color:'#00c87c' },
              { cat:'Artificial', color:'#14b8d4' },
            ].map(({ cat, color }) => (
              <div key={cat} style={{ marginBottom:'10px' }}>
                <div style={{ fontSize:'0.55rem', fontWeight:700, letterSpacing:'0.08em', color, marginBottom:'5px', textTransform:'uppercase' }}>
                  {cat}
                </div>
                <div style={{ display:'flex', flexDirection:'column', gap:'3px' }}>
                  {ORISA_LANGUAGES.filter(l => l.cat === cat).map((l, i) => (
                    <button key={i}
                      title={`Ifa-OrisaLang: ${l.name} (${l.code.toUpperCase()}) — ${l.dir.toUpperCase()}\nClick to insert language span`}
                      onMouseDown={e => { e.preventDefault(); insertLangSpan(l); }}
                      style={{
                        display:'flex', alignItems:'center', gap:'7px',
                        padding:'4px 8px', borderRadius:'7px', textAlign:'left',
                        border:`1px solid ${l.color}22`, background:`${l.color}08`,
                        cursor:'pointer', transition:'background 0.12s',
                      }}>
                      <span style={{
                        fontSize:'0.48rem', fontWeight:700, letterSpacing:'0.05em',
                        padding:'1px 4px', borderRadius:'4px', flexShrink:0,
                        background: l.dir === 'rtl' ? 'rgba(167,139,250,0.16)' : 'rgba(59,158,255,0.16)',
                        color:       l.dir === 'rtl' ? '#a78bfa' : '#3b9eff',
                        fontFamily:'monospace',
                      }}>{l.dir.toUpperCase()}</span>
                      <span style={{
                        fontSize:'0.5rem', fontWeight:700, letterSpacing:'0.06em',
                        padding:'1px 5px', borderRadius:'4px',
                        background:`${l.color}18`, color:l.color,
                        flexShrink:0, fontFamily:'monospace',
                      }}>{l.code.toUpperCase()}</span>
                      <span style={{ color:'#4a6080', fontSize:'0.6rem', flex:1,
                        overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                        {l.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ))}

          </SidebarSection>

          </SidebarSection>

          {/* Ifa Variables */}
          <SidebarSection title="Ifa Variables" open={sections.signs} onToggle={() => toggleSection('signs')}>
            <div className="sign-palette">
              {IFA_SIGNS.map((s, i) => (
                <button
                  key={i}
                  className="sign-chip"
                  title={`IfaExpression: ${s.title}`}
                  onClick={() => insertHTML(
                    `<span class="ifa-expr" style="margin:0 0.45em 0 0" title="IfaExpression: ${s.title}"><span class="ifa-expr__char">${s.sym}</span><span class="ifa-expr__sym" style="width:11px;height:11px">${buildOgbeSVGStr(11)}</span></span>&#8203;`
                  )}
                >
                  <span className="ifa-expr">
                    <span className="ifa-expr__char">{s.sym}</span>
                    <span className="ifa-expr__sym" style={{ width:8, height:8 }}>
                      <OgbeSymbol size={8} />
                    </span>
                  </span>
                </button>
              ))}
            </div>
            <div style={{ borderTop:'1px solid rgba(255,255,255,0.05)', paddingTop:'7px', marginTop:'4px' }}>
              <div style={{ fontSize:'0.52rem', color:'#2e4460', letterSpacing:'0.06em', marginBottom:'5px' }}>
                Aebajiogbe-Oduduwa Symbols
              </div>
              <div style={{ display:'flex', flexWrap:'wrap', gap:'3px', direction:'rtl' }}>
                {ABD_SCRIPT_CHARS.map((c, i) => (
                  <button
                    key={i}
                    className="char-chip aeb-chip"
                    title={`IfaExpression (Aebajiogbe-Oduduwa) · U+${[...c].map(cp => cp.codePointAt(0).toString(16).toUpperCase().padStart(4,'0')).join('+')}`}
                    onClick={() => insertHTML(
                      `<span class="ifa-expr" style="margin:0 0.45em 0 0.42em" title="IfaExpression (Aebajiogbe-Oduduwa)"><span class="ifa-expr__sym" style="width:11px;height:11px;right:auto;left:-0.42em">${buildOgbeSVGStr(11)}</span><span class="ifa-expr__char aeb-inline">${c}</span></span>&#8203;`
                    )}
                  >
                    <span className="ifa-expr" style={{ fontFamily:'inherit' }}>
                      <span className="ifa-expr__sym" style={{ width:8, height:8, right:'auto', left:'-0.42em' }}>
                        <OgbeSymbol size={8} />
                      </span>
                      <span className="ifa-expr__char">{c}</span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </SidebarSection>

          {/* Aebajiogbe-Oduduwa Script */}
          <SidebarSection title="Aebajiogbe-Oduduwa Script" open={sections.aeb} onToggle={() => toggleSection('aeb')}>
            <div className="char-palette" dir="rtl">
              {ABD_SCRIPT_CHARS.map((c, i) => (
                <button
                  key={i}
                  className="char-chip aeb-chip"
                  title={`U+${[...c].map(cp => cp.codePointAt(0).toString(16).toUpperCase().padStart(4,'0')).join('+')}`}
                  onClick={() => insertAebChar(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </SidebarSection>

          {/* ABD Yoruba Chars */}
          <SidebarSection title="ABD Yoruba Chars" open={sections.yoruba} onToggle={() => toggleSection('yoruba')}>
            <div className="char-palette">
              {YORUBA_CHARS.map((c, i) => (
                <button
                  key={i}
                  className="char-chip"
                  title={`Insert ${c}`}
                  onClick={() => insertText(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </SidebarSection>

          {/* ── IfaCircuit Builder ────────────────────────────────────────── */}
          <SidebarSection title="IfaCircuit Builder" open={sections.circuit} onToggle={() => toggleSection('circuit')}>

            {/* Tab switcher: Classical / Quantum / IfaGates */}
            <div style={{ display:'flex', gap:'4px', marginBottom:'10px' }}>
              {[
                { key:'classical', label:'Classical', color:'#00c87c' },
                { key:'quantum',   label:'Quantum',   color:'#14b8d4' },
                { key:'ifa',       label:'IfaGates',  color:'#f5c518' },
              ].map(t => (
                <button key={t.key}
                  onMouseDown={e => { e.preventDefault(); setCircuitTab(t.key); }}
                  style={{
                    flex:1, fontSize:'0.58rem', padding:'4px 0', borderRadius:'6px',
                    border:`1px solid ${circuitTab === t.key ? t.color + '55' : 'rgba(255,255,255,0.07)'}`,
                    background: circuitTab === t.key ? t.color + '16' : 'transparent',
                    color: circuitTab === t.key ? t.color : '#3a5070',
                    fontWeight: circuitTab === t.key ? 700 : 400,
                    cursor:'pointer', letterSpacing:'0.04em',
                    transition:'all 0.15s',
                  }}>
                  {t.label}
                </button>
              ))}
            </div>

            {/* Eyebrow label */}
            <div style={{
              fontSize:'0.55rem', color:'#2e4460', letterSpacing:'0.07em',
              marginBottom:'7px',
            }}>
              {circuitTab === 'classical' && '8 Classical Logic Gates · Click to Insert'}
              {circuitTab === 'quantum'   && '8 Quantum Gates · Click to Insert'}
              {circuitTab === 'ifa'       && '16 IfaGates · Odu Ifa Logic Gates · Click to Insert'}
            </div>

            {/* Gate chips grid */}
            <div style={{
              display:'grid',
              gridTemplateColumns: circuitTab === 'ifa' ? 'repeat(2,1fr)' : 'repeat(2,1fr)',
              gap:'5px', marginBottom:'11px',
            }}>
              {CIRCUIT_GATES[circuitTab].map((g, i) => (
                <button key={i}
                  title={`${g.name}${g.odu ? ' · ' + g.odu : ''} — ${g.desc}`}
                  onMouseDown={e => { e.preventDefault(); insertGateBox(g, circuitTab); }}
                  style={{
                    display:'flex', flexDirection:'column', alignItems:'center', gap:'3px',
                    padding:'7px 4px 6px', borderRadius:'8px',
                    border:`1px solid ${g.color}28`,
                    background:`${g.color}08`,
                    cursor:'pointer', transition:'background 0.12s, border-color 0.12s',
                  }}>
                  {circuitTab === 'classical'
                    ? <GateIcon name={g.name} color={g.color}/>
                    : circuitTab === 'quantum'
                      ? <QGateIcon name={g.name} label={g.label || g.sym} color={g.color}/>
                      : <IfaGateIcon gate={g}/>
                  }
                  <span style={{
                    fontSize:'0.53rem', color:'#5a7090',
                    letterSpacing:'0.02em', textAlign:'center', lineHeight:1.25,
                  }}>
                    {g.name}
                    {g.odu && <><br/><span style={{ color:'#3a5070' }}>{g.odu}</span></>}
                  </span>
                </button>
              ))}
            </div>

            {/* Circuit symbols palette */}
            <div style={{ borderTop:'1px solid rgba(255,255,255,0.05)', paddingTop:'8px' }}>
              <div style={{
                fontSize:'0.55rem', color:'#2e4460',
                letterSpacing:'0.07em', marginBottom:'6px',
              }}>
                Circuit Symbols
              </div>
              <div style={{ display:'flex', flexWrap:'wrap', gap:'4px' }}>
                {CIRCUIT_SYMS.map((s, i) => (
                  <button key={i}
                    title={s.title}
                    onMouseDown={e => { e.preventDefault(); insertText(s.sym); }}
                    style={{
                      padding:'3px 6px', borderRadius:'5px',
                      border:'1px solid rgba(255,255,255,0.07)',
                      background:'rgba(255,255,255,0.03)',
                      color:'#5a7a9a', fontSize:'0.8rem', cursor:'pointer',
                      fontFamily:'Georgia,serif',
                    }}>
                    {s.sym}
                  </button>
                ))}
              </div>
            </div>

            {/* Footer link to full IfaLogic Matrix */}
            <a href="https://ifainternet.org/ifa-logic/#truth-table"
               target="_blank" rel="noopener noreferrer"
               style={{
                 display:'block', marginTop:'11px',
                 fontSize:'0.58rem', color:'#3a5a7a',
                 textDecoration:'none', textAlign:'center',
                 letterSpacing:'0.04em', borderTop:'1px solid rgba(255,255,255,0.05)',
                 paddingTop:'8px',
               }}>
              ↗ Full IfaLogic Matrix · Truth Tables · IfaLogic Platform
            </a>

          </SidebarSection>

          {/* ── IfaConstruction ───────────────────────────────────────────── */}
          <SidebarSection title="IfaConstruction" open={sections.construction} onToggle={() => toggleSection('construction')}>

            {/* Description */}
            <div style={{
              fontSize:'0.58rem', color:'#3a5878', lineHeight:1.55,
              marginBottom:'13px', letterSpacing:'0.01em',
            }}>
              Use the IfaConstructor to Create Your IfaVariables, IfaObjects, IfaSystems, etc.
            </div>

            {/* ── IfaVariables ─────────────────────────────────────────────── */}
            <div style={{ marginBottom:'16px' }}>
              <div style={{
                fontSize:'0.6rem', fontWeight:700, letterSpacing:'0.08em',
                color:'#f5c518', marginBottom:'8px',
              }}>
                IfaVariables
              </div>

              {/* Aebajiogbe-Oduduwa symbol chips */}
              <div style={{ marginBottom:'7px' }}>
                <div style={{
                  fontSize:'0.52rem', color:'#2e4460', letterSpacing:'0.06em', marginBottom:'5px',
                }}>
                  Aebajiogbe-Oduduwa Symbols · click to insert
                </div>
                <div style={{ display:'flex', flexWrap:'wrap', gap:'3px', direction:'rtl' }}>
                  {ABD_SCRIPT_CHARS.map((c, i) => (
                    <button
                      key={i}
                      className="char-chip aeb-chip"
                      title={`Aebajiogbe-Oduduwa · U+${[...c].map(cp => cp.codePointAt(0).toString(16).toUpperCase().padStart(4,'0')).join('+')}`}
                      onMouseDown={e => { e.preventDefault(); insertAebChar(c); }}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display:'flex', flexDirection:'column', gap:'6px' }}>
                <input
                  type="text"
                  placeholder="Variable name — x, energy, ψ …"
                  value={varName}
                  onChange={e => setVarName(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && insertIfaVariable()}
                  style={{
                    width:'100%', padding:'5px 8px', fontSize:'0.62rem',
                    background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.1)',
                    borderRadius:'6px', color:'#aab8d4', outline:'none',
                    fontFamily:'inherit', boxSizing:'border-box',
                  }}
                />

                {/* ── Subscript — attach symbol to variable as Ifa Expression ─── */}
                <div style={{ fontSize:'0.49rem', color:'#2e4460', letterSpacing:'0.07em', marginTop:'2px' }}>
                  Attach as subscript → Ifa Expression
                </div>
                <div style={{ display:'flex', gap:'6px' }}>
                  <button
                    onMouseDown={e => { e.preventDefault(); insertOyekuExpr(); }}
                    title="Attach Oyeku Anergy symbol as subscript to variable → Ifa Expression"
                    style={{
                      flex:1, display:'flex', alignItems:'center', justifyContent:'center', gap:'5px',
                      padding:'5px 6px', fontSize:'0.58rem', fontWeight:700,
                      borderRadius:'6px', border:'1px solid rgba(167,139,250,0.3)',
                      background:'rgba(167,139,250,0.07)', color:'#a78bfa',
                      cursor:'pointer', letterSpacing:'0.03em', transition:'background 0.12s',
                    }}>
                    <OyekuSymbol size={13} />
                    <span>Oyeku Anergy</span>
                  </button>
                  <button
                    onMouseDown={e => { e.preventDefault(); insertOgbeExpr(); }}
                    title="Attach Ogbe Energy symbol as subscript to variable → Ifa Expression"
                    style={{
                      flex:1, display:'flex', alignItems:'center', justifyContent:'center', gap:'5px',
                      padding:'5px 6px', fontSize:'0.58rem', fontWeight:700,
                      borderRadius:'6px', border:'1px solid rgba(245,197,24,0.3)',
                      background:'rgba(245,197,24,0.07)', color:'#f5c518',
                      cursor:'pointer', letterSpacing:'0.03em', transition:'background 0.12s',
                    }}>
                    <OgbeSymbol size={13} />
                    <span>Ogbe Energy</span>
                  </button>
                </div>

                {/* ── Normal form — insert symbol standalone as Ifa Variable ──── */}
                <div style={{ fontSize:'0.49rem', color:'#2e4460', letterSpacing:'0.07em', marginTop:'2px' }}>
                  As Ifa Variable (normal form)
                </div>
                <div style={{ display:'flex', gap:'6px' }}>
                  <button
                    onMouseDown={e => { e.preventDefault(); insertStandaloneOyeku(); }}
                    title="Insert Oyeku Anergy symbol as standalone Ifa Variable"
                    style={{
                      flex:1, display:'flex', alignItems:'center', justifyContent:'center', gap:'5px',
                      padding:'5px 6px', fontSize:'0.58rem', fontWeight:700,
                      borderRadius:'6px', border:'1px solid rgba(167,139,250,0.22)',
                      background:'rgba(167,139,250,0.04)', color:'#7a6aaa',
                      cursor:'pointer', letterSpacing:'0.03em', transition:'background 0.12s',
                    }}>
                    <OyekuSymbol size={13} />
                    <span>Oyeku Anergy</span>
                  </button>
                  <button
                    onMouseDown={e => { e.preventDefault(); insertStandaloneOgbe(); }}
                    title="Insert Ogbe Energy symbol as standalone Ifa Variable"
                    style={{
                      flex:1, display:'flex', alignItems:'center', justifyContent:'center', gap:'5px',
                      padding:'5px 6px', fontSize:'0.58rem', fontWeight:700,
                      borderRadius:'6px', border:'1px solid rgba(245,197,24,0.22)',
                      background:'rgba(245,197,24,0.04)', color:'#a08a30',
                      cursor:'pointer', letterSpacing:'0.03em', transition:'background 0.12s',
                    }}>
                    <OgbeSymbol size={13} />
                    <span>Ogbe Energy</span>
                  </button>
                </div>

                {/* ── Create plain IfaVariable from name ───────────────────────── */}
                <button
                  onMouseDown={e => { e.preventDefault(); insertIfaVariable(); }}
                  style={{
                    padding:'5px 0', fontSize:'0.6rem', fontWeight:700,
                    borderRadius:'6px', border:'1px solid rgba(245,197,24,0.3)',
                    background:'rgba(245,197,24,0.08)', color:'#f5c518',
                    cursor:'pointer', letterSpacing:'0.04em', marginTop:'2px',
                    transition:'background 0.12s',
                  }}>
                  + Create IfaVariable
                </button>
              </div>
            </div>

            {/* ── IfaCircuits ──────────────────────────────────────────────── */}
            <div>
              <div style={{
                fontSize:'0.6rem', fontWeight:700, letterSpacing:'0.08em',
                color:'#14b8d4', marginBottom:'8px',
              }}>
                IfaCircuits
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:'5px' }}>
                <input
                  type="text"
                  placeholder="Circuit name — HalfAdder, IfaXOR …"
                  value={circuitName}
                  onChange={e => setCircuitName(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && insertIfaCircuit()}
                  style={{
                    width:'100%', padding:'5px 8px', fontSize:'0.62rem',
                    background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.1)',
                    borderRadius:'6px', color:'#aab8d4', outline:'none',
                    fontFamily:'inherit', boxSizing:'border-box',
                  }}
                />
                <button
                  onMouseDown={e => { e.preventDefault(); insertIfaCircuit(); }}
                  style={{
                    padding:'5px 0', fontSize:'0.6rem', fontWeight:700,
                    borderRadius:'6px', border:'1px solid rgba(20,184,212,0.3)',
                    background:'rgba(20,184,212,0.08)', color:'#14b8d4',
                    cursor:'pointer', letterSpacing:'0.04em',
                    transition:'background 0.12s',
                  }}>
                  + Create IfaCircuit
                </button>
              </div>
            </div>

          </SidebarSection>

          {/* ── IfaBiDi — Bidirectional Script ───────────────────────────── */}
          <SidebarSection title="IfaBiDi — Bidirectional Script" open={sections.bidi} onToggle={() => toggleSection('bidi')}>

            {/* Eyebrow */}
            <div style={{ fontSize:'0.52rem', color:'#2e4460', letterSpacing:'0.07em', marginBottom:'10px', lineHeight:1.55 }}>
              Write any script in any direction. Canvas direction can be changed in the toolbar.
            </div>

            {/* ── Canvas direction quick-set ───────────────────────────────── */}
            <div style={{ marginBottom:'13px' }}>
              <div style={{ fontSize:'0.6rem', fontWeight:700, letterSpacing:'0.08em', color:'#3b9eff', marginBottom:'7px' }}>
                IfaFlow — Canvas Direction
              </div>
              <div style={{ display:'flex', gap:'4px' }}>
                {[
                  { dir:'ltr',  label:'← LTR',    color:'#3b9eff', tip:'Ogbe Direction — Left to Right' },
                  { dir:'auto', label:'↕ Auto',    color:'#f5c518', tip:'Natural — browser detects from first character' },
                  { dir:'rtl',  label:'RTL →',     color:'#a78bfa', tip:'Oyeku Direction — Right to Left' },
                ].map(d => (
                  <button key={d.dir}
                    onMouseDown={e => { e.preventDefault(); setCanvasDir(d.dir); canvasRef.current?.focus(); }}
                    title={d.tip}
                    style={{
                      flex:1, padding:'5px 0', fontSize:'0.6rem', fontWeight:700, borderRadius:'7px',
                      border:`1px solid ${canvasDir === d.dir ? d.color + '66' : 'rgba(255,255,255,0.07)'}`,
                      background: canvasDir === d.dir ? d.color + '1a' : 'transparent',
                      color: canvasDir === d.dir ? d.color : '#3a5070',
                      cursor:'pointer', transition:'all 0.15s', letterSpacing:'0.04em',
                    }}>
                    {d.label}
                  </button>
                ))}
              </div>
            </div>

            {/* ── Inline direction wrap ────────────────────────────────────── */}
            <div style={{ marginBottom:'13px' }}>
              <div style={{ fontSize:'0.6rem', fontWeight:700, letterSpacing:'0.08em', color:'#00c87c', marginBottom:'4px' }}>
                Wrap Selection
              </div>
              <div style={{ fontSize:'0.52rem', color:'#2e4460', letterSpacing:'0.05em', marginBottom:'7px' }}>
                Select text, then click to override its direction
              </div>
              <div style={{ display:'flex', gap:'4px' }}>
                {[
                  { dir:'ltr',     label:'⇐ LTR',  color:'#3b9eff', tip:'Force selection Left-to-Right (Ogbe Flow)' },
                  { dir:'rtl',     label:'RTL ⇒',  color:'#a78bfa', tip:'Force selection Right-to-Left (Oyeku Flow)' },
                  { dir:'isolate', label:'⟺ iso',  color:'#00c87c', tip:'BiDi Isolate — directional island, prevents bleed' },
                ].map(d => (
                  <button key={d.dir}
                    onMouseDown={e => { e.preventDefault(); wrapDir(d.dir); }}
                    title={d.tip}
                    style={{
                      flex:1, padding:'5px 0', fontSize:'0.6rem', fontWeight:700, borderRadius:'7px',
                      border:`1px solid ${d.color}44`,
                      background:`${d.color}0d`,
                      color:d.color, cursor:'pointer', letterSpacing:'0.03em',
                      transition:'background 0.12s',
                    }}>
                    {d.label}
                  </button>
                ))}
              </div>
            </div>

            {/* ── Unicode BiDi control characters ─────────────────────────── */}
            <div style={{ marginBottom:'13px' }}>
              <div style={{ fontSize:'0.6rem', fontWeight:700, letterSpacing:'0.08em', color:'#f5c518', marginBottom:'4px' }}>
                Unicode BiDi Controls
              </div>
              <div style={{ fontSize:'0.52rem', color:'#2e4460', letterSpacing:'0.05em', marginBottom:'7px' }}>
                Invisible control characters — click to insert at cursor
              </div>
              <div style={{ display:'flex', flexWrap:'wrap', gap:'4px' }}>
                {BIDI_CHARS.map((b, i) => (
                  <button key={i}
                    title={b.title}
                    onMouseDown={e => { e.preventDefault(); insertBiDiChar(b.sym); }}
                    style={{
                      padding:'4px 7px', borderRadius:'6px', fontSize:'0.6rem', fontWeight:700,
                      border:`1px solid ${b.color}44`, background:`${b.color}0d`,
                      color:b.color, cursor:'pointer', letterSpacing:'0.04em',
                      fontFamily:'monospace', transition:'background 0.12s',
                    }}>
                    {b.label}
                  </button>
                ))}
              </div>
            </div>

            {/* ── World scripts palette ────────────────────────────────────── */}
            <div>
              <div style={{ fontSize:'0.6rem', fontWeight:700, letterSpacing:'0.08em', color:'#ec4899', marginBottom:'4px' }}>
                World Scripts
              </div>
              <div style={{ fontSize:'0.52rem', color:'#2e4460', letterSpacing:'0.05em', marginBottom:'8px' }}>
                Click to open a directional span at cursor — then type in that script
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:'3px' }}>
                {WORLD_SCRIPTS.map((s, i) => (
                  <button key={i}
                    title={`${s.desc}\nClick to insert a ${s.dir.toUpperCase()} span at cursor`}
                    onMouseDown={e => { e.preventDefault(); insertScriptSpan(s); }}
                    style={{
                      display:'flex', alignItems:'center', gap:'8px',
                      padding:'5px 8px', borderRadius:'7px', textAlign:'left',
                      border:`1px solid ${s.color}22`, background:`${s.color}08`,
                      cursor:'pointer', transition:'background 0.12s',
                    }}>
                    {/* Direction badge */}
                    <span style={{
                      fontSize:'0.5rem', fontWeight:700, letterSpacing:'0.06em',
                      padding:'1px 5px', borderRadius:'4px',
                      background: s.dir === 'rtl' ? 'rgba(167,139,250,0.16)' : 'rgba(59,158,255,0.16)',
                      color:       s.dir === 'rtl' ? '#a78bfa' : '#3b9eff',
                      flexShrink:0, fontFamily:'monospace',
                    }}>{s.dir.toUpperCase()}</span>
                    {/* Script sample */}
                    <span style={{
                      color:s.color, fontSize:'0.88rem', fontWeight:700,
                      dir:s.dir, minWidth:'42px', textAlign: s.dir === 'rtl' ? 'right' : 'left',
                    }}>{s.sample}</span>
                    {/* Name */}
                    <span style={{ color:'#4a6080', fontSize:'0.6rem', flex:1,
                      overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                      {s.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

          </SidebarSection>

        </aside>

        {/* ── Main editor ─────────────────────────────────────────────────── */}
        <div className="ifaed-main">

          {/* Formatting toolbar */}
          <div className="ifaed-toolbar" role="toolbar" aria-label="Formatting options">

            {/* Block type */}
            <select className="tb-select" onChange={e => applyHeading(e.target.value)} defaultValue="p"
                    title="Block type">
              <option value="p">Paragraph</option>
              <option value="h1">Heading 1</option>
              <option value="h2">Heading 2</option>
              <option value="h3">Heading 3</option>
              <option value="blockquote">Blockquote</option>
            </select>

            <span className="toolbar-sep" />

            {/* Bold / Italic / Underline / Strike */}
            <TbBtn title="Bold (Ctrl+B)"         onClick={() => fmt('bold')}><b>B</b></TbBtn>
            <TbBtn title="Italic (Ctrl+I)"       onClick={() => fmt('italic')}><i>I</i></TbBtn>
            <TbBtn title="Underline (Ctrl+U)"    onClick={() => fmt('underline')}><u>U</u></TbBtn>
            <TbBtn title="Strikethrough"         onClick={() => fmt('strikeThrough')}>S̶</TbBtn>

            <span className="toolbar-sep" />

            {/* Align */}
            <TbBtn title="Align left"   onClick={() => fmt('justifyLeft')}>⬛</TbBtn>
            <TbBtn title="Align centre" onClick={() => fmt('justifyCenter')}>☰</TbBtn>
            <TbBtn title="Align right"  onClick={() => fmt('justifyRight')}>▤</TbBtn>

            <span className="toolbar-sep" />

            {/* Lists */}
            <TbBtn title="Bullet list"   onClick={() => fmt('insertUnorderedList')}>•≡</TbBtn>
            <TbBtn title="Numbered list" onClick={() => fmt('insertOrderedList')}>1≡</TbBtn>

            <span className="toolbar-sep" />

            {/* Text colour */}
            <button
              className="tb-color-btn"
              title="Text colour"
              onMouseDown={e => { e.preventDefault(); colorInputRef.current?.click(); }}
            >
              <span style={{ color: textColor }}>A</span>
              <div className="tb-color-btn__swatch" style={{ background: textColor }} />
              <input
                ref={colorInputRef}
                type="color"
                className="tb-color-input"
                value={textColor}
                onChange={e => applyColor(e.target.value)}
              />
            </button>

            {/* Ifa-themed quick colours */}
            {[
              { c: '#f5c518', t: 'Ogbe — Gold' },
              { c: '#a78bfa', t: 'Oyeku — Violet' },
              { c: '#00c87c', t: 'Jade' },
              { c: '#3b9eff', t: 'Electric Blue' },
              { c: '#f43f5e', t: 'Irosun — Red' },
              { c: '#f0f5ff', t: 'White' },
            ].map(({ c, t }) => (
              <button
                key={c}
                className="tb-color-btn"
                title={t}
                onMouseDown={e => { e.preventDefault(); applyColor(c); }}
                style={{ width: 20 }}
              >
                <div className="tb-color-btn__swatch" style={{ background: c, width: 14, height: 14, borderRadius: '50%' }} />
              </button>
            ))}

            <span className="toolbar-sep" />

            {/* Clear formatting */}
            <TbBtn title="Clear formatting" wide onClick={() => fmt('removeFormat')}>✕ fmt</TbBtn>

            {/* Clear terminal */}
            <TbBtn title="Clear terminal — erase all content" wide onClick={clearCanvas}>⌫ clear</TbBtn>

            <span className="toolbar-sep" />

            {/* ── IfaFlow — BiDi canvas direction ──────────────────────────── */}
            <div className="tb-dir-group" title="IfaFlow — Canvas writing direction">
              <button
                className={`tb-dir-btn${canvasDir === 'ltr' ? ' tb-dir-btn--active tb-dir-btn--ltr' : ''}`}
                title="IfaFlow LTR — Ogbe Direction: text flows left → right (Latin, Yoruba, Devanagari…)"
                onMouseDown={e => { e.preventDefault(); setCanvasDir('ltr'); canvasRef.current?.focus(); }}
              >← LTR</button>
              <button
                className={`tb-dir-btn${canvasDir === 'auto' ? ' tb-dir-btn--active tb-dir-btn--auto' : ''}`}
                title="IfaFlow Auto — Natural direction: browser detects from first strong character"
                onMouseDown={e => { e.preventDefault(); setCanvasDir('auto'); canvasRef.current?.focus(); }}
              >↕ Auto</button>
              <button
                className={`tb-dir-btn${canvasDir === 'rtl' ? ' tb-dir-btn--active tb-dir-btn--rtl' : ''}`}
                title="IfaFlow RTL — Oyeku Direction: text flows right → left (Arabic, Hebrew, Aebajiogbe…)"
                onMouseDown={e => { e.preventDefault(); setCanvasDir('rtl'); canvasRef.current?.focus(); }}
              >RTL →</button>
            </div>

            <span className="toolbar-sep" />

            {/* ── Inline direction wrap — applies to selection ─────────────── */}
            <TbBtn title="Wrap selection LTR — force selected text left-to-right (Ogbe Flow)"
                   onClick={() => wrapDir('ltr')}>⇐ ltr</TbBtn>
            <TbBtn title="Wrap selection RTL — force selected text right-to-left (Oyeku Flow)"
                   onClick={() => wrapDir('rtl')}>rtl ⇒</TbBtn>
            <TbBtn title="BiDi Isolate — wrap selection in a directional island (prevents direction bleed)"
                   onClick={() => wrapDir('isolate')}>⟺ iso</TbBtn>

            <span className="toolbar-sep" />

            {/* Odù Palette toggle — mobile only */}
            <TbBtn title="Odù Palette" wide
                   active={sidebarOpen}
                   onClick={() => setSidebarOpen(s => !s)}
                   className="tb-palette-btn">◈ Odù</TbBtn>

          </div>

          {/* Canvas */}
          <div className="ifaed-canvas-wrap">
            <div className="ifaterminal-label" aria-hidden="true">
              <div className="ifaterminal-label__row">
                <span className="ifaterminal-label__deco">◈</span>
                <span className="ifaterminal-label__name">The IfaTerminal</span>
                <span className="ifaterminal-label__deco">◈</span>
              </div>
              <div className="ifaterminal-label__obns">Odufa-Based Notation System (OBNS)</div>
            </div>
            <div
              ref={canvasRef}
              className="ifaed-canvas"
              contentEditable
              suppressContentEditableWarning
              data-placeholder={mode.placeholder}
              dir={canvasDir}
              spellCheck
              onInput={handleInput}
              aria-label="IfaEditor writing canvas"
              aria-multiline="true"
              role="textbox"
            />
          </div>

          {/* Status bar */}
          <div className="ifaed-statusbar">
            <div className="statusbar__mode">
              <div className="statusbar__mode-dot" />
              <span className="statusbar__mode-label">
                IfaPen · {mode.name}
              </span>
              <span style={{ color: 'var(--text-3)', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>
                — {mode.desc}
              </span>
            </div>
            <div className="statusbar__counts">
              <span><b>{counts.words}</b> words</span>
              <span><b>{counts.chars}</b> chars</span>
            </div>
            <div className="statusbar__dir" title="IfaFlow — canvas writing direction (change in toolbar)">
              <span className={`statusbar__dir-dot statusbar__dir-dot--${canvasDir}`} />
              <span className="statusbar__dir-label">
                {canvasDir === 'ltr'  && '← LTR · Ogbe Flow'}
                {canvasDir === 'rtl'  && 'RTL → · Oyeku Flow'}
                {canvasDir === 'auto' && '↕ Auto · Natural Flow'}
              </span>
            </div>
            <div className="statusbar__tip">
              Click any IfaCharacter or IfaSign to insert at cursor
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<IfaEditor />);
