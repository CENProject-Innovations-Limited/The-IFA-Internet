/* ─────────────────────────────────────────────────────────────────────────────
   Ifa Determinant · Ìbò Gbígbà
   IFA Matrix Platform · The IFA Internet · CENProject
   ifainternet.org/ifa-matrix/ifa-determinant/
───────────────────────────────────────────────────────────────────────────── */

const { useState, useEffect, useRef, useCallback } = React;

// ── ODU DATA ──────────────────────────────────────────────────────────────────

const ODU_16 = [
  { n:'01', name:'Ogbé',      color:'#f0920c', code:'0000' },
  { n:'02', name:'Òyèkú',    color:'#6366f1', code:'1111' },
  { n:'03', name:'Ìwòrì',    color:'#14b8d4', code:'1001' },
  { n:'04', name:'Òdí',      color:'#00c87c', code:'0110' },
  { n:'05', name:'Ìrosùn',   color:'#ef4444', code:'0011' },
  { n:'06', name:'Òwónrín',  color:'#8b5cf6', code:'1100' },
  { n:'07', name:'Òbàrà',    color:'#3b9eff', code:'0111' },
  { n:'08', name:'Òkànràn',  color:'#ec4899', code:'1110' },
  { n:'09', name:'Ògúndá',   color:'#f0920c', code:'0001' },
  { n:'10', name:'Òsá',      color:'#6366f1', code:'1000' },
  { n:'11', name:'Ìká',      color:'#14b8d4', code:'1011' },
  { n:'12', name:'Òtúrúpòn', color:'#00c87c', code:'1101' },
  { n:'13', name:'Òtúrá',    color:'#ef4444', code:'0100' },
  { n:'14', name:'Ìrètè',    color:'#8b5cf6', code:'0010' },
  { n:'15', name:'Òsè',      color:'#3b9eff', code:'0101' },
  { n:'16', name:'Òfún',     color:'#ec4899', code:'1010' },
];

// Ire types (9) and Ibi types (8)
const IRE_TYPES = [
  'Ire Àìkú — Health & Longevity',
  'Ire Owó — Fortune & Wealth',
  'Ire Ọmọ — Children & Legacy',
  'Ire Àṣeyorí — Progress & Success',
  'Ire Ifẹ́ — Happiness & Love',
  'Ire Ìṣẹ — Work & Purpose',
  'Ire Ọgbọ́n — Intelligence & Wisdom',
  'Ire Ìrántí — Memory & Knowledge',
  'Ire Àárọ̀ — Spiritual Alignment',
];
const IBI_TYPES = [
  'Àrùn — Disease & Illness',
  'Àwọn Ẹ̀wọ̀n — Imprisonment & Bondage',
  'Ebí — Loss & Scarcity',
  'Ọ̀tẹ̀ — Betrayal & Conspiracy',
  'Ìjà — Conflict & Trouble',
  'Ìpòfo — Death & Destruction',
  'Àjẹ́ — Curse & Affliction',
  'Ìjákulẹ̀ — Paralysis & Stagnation',
];

// ── TIMELINE DATA ─────────────────────────────────────────────────────────────

const TIMELINE = [
  {
    year: '~3000 BCE+',
    region: 'Yoruba / Africa',
    who: 'Ifa Tradition — Ìbò Gbígbà',
    event: 'Ifa\'s Determinant: the Consciousness of all determinants generally is Ìbò, an orisa (past being) and wife of Orunmila. Babalawo cast Ikin palm nuts to derive the Odu (256-State Binary Matrix of Ifa), then resolve the reading through Ìbò Gbígbà — the Scalar Binary Resolution Operator yielding Ire (nonzero) or Ibi (zero).',
    color: '#f0920c',
    origin: true,
  },
  {
    year: '~1800 BCE',
    region: 'Babylon / Middle East',
    who: 'Babylonian Mathematics',
    event: 'Cuneiform tablets record simultaneous linear equations with implicit coefficient arrays. No formal matrix structure, but the arithmetic of multi-variable systems begins.',
    color: '#14b8d4',
  },
  {
    year: '~200 BCE',
    region: 'China / Asia',
    who: 'Nine Chapters on the Mathematical Art',
    event: 'Coefficient tables arranged in rectangular arrays — solved by row operations remarkably similar to modern Gaussian elimination. The first documented matrix notation outside Africa.',
    color: '#ef4444',
  },
  {
    year: '1545 CE',
    region: 'Italy / Europe',
    who: 'Gerolamo Cardan — Ars Magna',
    event: 'First European formulation of a rule for 2-equation systems, foreshadowing Cramer\'s Rule. The shadow of the Ifa Determinant reaches European algebra.',
    color: '#8b5cf6',
  },
  {
    year: '1683 CE',
    region: 'Japan / Asia',
    who: 'Seki Takakazu',
    event: 'Independently discovered determinants for solving systems of simultaneous equations — parallel to Leibniz in Europe but without contact with either African or European traditions.',
    color: '#ec4899',
  },
  {
    year: '1693 CE',
    region: 'Germany / Europe',
    who: 'Gottfried Wilhelm Leibniz',
    event: 'Formalized binary logic (1,0) — 2,000+ years after Ifa. First European notation of determinant concepts, in correspondence with de l\'Hôpital. He did not know he was rediscovering what Yoruba Babalawo had always known.',
    color: '#6366f1',
  },
  {
    year: '1750 CE',
    region: 'Switzerland / Europe',
    who: 'Gabriel Cramer',
    event: 'Cramer\'s Rule generalized for n×n systems — the formula that any Babalawo using Ìbò Gbígbà had been applying for millennia in spiritual form.',
    color: '#3b9eff',
  },
  {
    year: '1772 CE',
    region: 'France / Europe',
    who: 'Pierre-Simon Laplace',
    event: 'Laplace expansion — cofactor expansion of determinants. The recursive decomposition mirrors how a Babalawo layers Ìbò castings to narrow from Ire/Ibi to specific sub-type.',
    color: '#00c87c',
  },
  {
    year: '1812 CE',
    region: 'France / Europe',
    who: 'Augustin-Louis Cauchy',
    event: '"Determinant" formalized in its modern sense. Proved det(AB) = det(A)·det(B) — the multiplication theorem. The word finally existed in European math for what Ifa had always called Ìbò Gbígbà.',
    color: '#f5c518',
  },
  {
    year: '1858 CE',
    region: 'England / Europe',
    who: 'Arthur Cayley — Memoir on Matrices',
    event: 'Matrix algebra formally founded. Vertical bar notation |A|. Cayley-Hamilton theorem. What Ifa encoded in the Ọpọ́n Ifá divination tray for millennia became Western mathematics\' newest major field.',
    color: '#8b5cf6',
  },
  {
    year: '1903 CE',
    region: 'Germany / Europe',
    who: 'Weierstrass & Kronecker',
    event: 'Fully axiomatic determinant theory — the modern rigorous foundation. Matrix algebra becomes a core subject in universities worldwide.',
    color: '#14b8d4',
  },
  {
    year: 'Today',
    region: 'Global / Digital',
    who: 'AI · Quantum · Classical Computing',
    event: 'Determinants power artificial intelligence, quantum gate matrices, 3D graphics transformations, encryption, scientific simulation. Every GPU, every neural network, every quantum computer runs on what Ìbò Gbígbà discovered — the principle that a system of states can be resolved to a single scalar truth.',
    color: '#00c87c',
  },
];

// ── AUDIO ─────────────────────────────────────────────────────────────────────

const audioCtxRef = { current: null };
function getCtx() {
  if (!audioCtxRef.current) {
    audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioCtxRef.current;
}

// Pentatonic scale — warm ancient feel (top-right → bottom-left, descending as bone sweeps RTL)
const COWRY_FREQS = [
  // Left column (indices 0–3, top→bottom)
  329.63, 293.66, 261.63, 220.00,
  // Right column (indices 4–7, top→bottom)
  659.25, 587.33, 523.25, 440.00,
];

function playTone(freq, type = 'triangle', duration = 0.28) {
  try {
    const ctx = getCtx();
    const osc  = ctx.createOscillator();
    const gain = ctx.createGain();
    const delay = ctx.createDelay(0.1);
    delay.delayTime.value = 0.04;
    osc.connect(gain);
    gain.connect(delay);
    delay.connect(ctx.destination);
    gain.connect(ctx.destination);
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.22, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration + 0.05);
  } catch(e) {}
}

function playIboSound(isIre) {
  try {
    const ctx = getCtx();
    const freqs = isIre
      ? [261.63, 329.63, 392, 523.25]
      : [220, 196, 174.61, 130.81];
    freqs.forEach((f, i) => {
      const osc  = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = isIre ? 'sine' : 'triangle';
      osc.frequency.value = f;
      const t = ctx.currentTime + i * 0.12;
      gain.gain.setValueAtTime(0.18, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
      osc.start(t);
      osc.stop(t + 0.4);
    });
  } catch(e) {}
}

// ── ODU HELPERS ───────────────────────────────────────────────────────────────

function oduFromCode(code) {
  return ODU_16.find(o => o.code === code) || ODU_16[1];
}

function computeDet2x2(bits) {
  // Matrix [[bits[0],bits[1]],[bits[2],bits[3]]] (all 0/1)
  return bits[0] * bits[3] - bits[1] * bits[2];
}

// ── SVG COMPONENTS ────────────────────────────────────────────────────────────

function CowrySVG({ open, color, active, swept, sweepPass = 0 }) {
  const glowColor = color || '#f0920c';
  // Second pass of a double-mark seed uses a violet glow to distinguish the confirmation sweep
  const sweepColor = sweepPass === 1 ? '#8b5cf6' : glowColor;
  return (
    <svg width="46" height="38" viewBox="0 0 46 38" style={{ display: 'block', overflow: 'visible' }}>
      {active && (
        <ellipse cx="23" cy="19" rx="22" ry="18"
          fill="none" stroke={glowColor} strokeWidth="2.5" opacity="0.7"
          style={{ filter: 'blur(2px)' }} />
      )}
      {open ? (
        /* Open cowry — mouth/opening visible = Ogbe */
        <g>
          <ellipse cx="23" cy="19" rx="20" ry="14" fill="#f0e0b0" stroke="#c9a050" strokeWidth="1.8"/>
          <ellipse cx="23" cy="22" rx="13" ry="8" fill="#e4ca88"/>
          {/* Opening / mouth */}
          <path d="M 7 21 Q 23 31 39 21" fill="#3a2005" />
          <path d="M 9 19 Q 23 27 37 19" fill="none" stroke="#8b6010" strokeWidth="1.8"/>
          {/* Teeth ridges */}
          {[12,15,18,21,24,27,30,33].map(x => (
            <line key={x} x1={x} y1="21" x2={x} y2="26" stroke="#6b4808" strokeWidth="0.7" opacity="0.55"/>
          ))}
          {/* Shine */}
          <ellipse cx="15" cy="13" rx="4" ry="2.5" fill="white" opacity="0.18" transform="rotate(-20,15,13)"/>
        </g>
      ) : (
        /* Closed cowry — convex back = Oyeku */
        <g>
          <ellipse cx="23" cy="19" rx="20" ry="12" fill="#c8a870" stroke="#9a7a40" strokeWidth="1.8"/>
          <ellipse cx="23" cy="18" rx="13" ry="7.5" fill="#b89860" />
          <line x1="23" y1="8" x2="23" y2="30" stroke="#9a7a40" strokeWidth="0.8" opacity="0.35"/>
          {/* Dorsal ridges */}
          {[-6,-3,0,3,6].map(dx => (
            <ellipse key={dx} cx={23+dx} cy="18" rx="1.5" ry="6" fill="none"
              stroke="#9a7a40" strokeWidth="0.6" opacity="0.3"/>
          ))}
          {/* Shine */}
          <ellipse cx="14" cy="13" rx="4" ry="2" fill="white" opacity="0.14" transform="rotate(-20,14,13)"/>
        </g>
      )}
      {swept && (
        <ellipse cx="23" cy="19" rx="21" ry="15"
          fill="none"
          stroke={sweepColor}
          strokeWidth={sweepPass === 1 ? 4.5 : 3}
          opacity={sweepPass === 1 ? 1 : 0.9}
          style={{ filter: `blur(${sweepPass === 1 ? 5 : 3}px)` }} />
      )}
    </svg>
  );
}

function BoneSVG({ width = 86 }) {
  const h = 22;
  return (
    <svg width={width} height={h} viewBox={`0 0 ${width} ${h}`} style={{ display: 'block' }}>
      {/* Shaft */}
      <rect x="14" y="7" width={width-28} height="8" rx="4" fill="#f0ead8" stroke="#d4c0a0" strokeWidth="1.2"/>
      {/* Left knob top */}
      <circle cx="10" cy="5"  r="5.5" fill="#f0ead8" stroke="#d4c0a0" strokeWidth="1.2"/>
      {/* Left knob bottom */}
      <circle cx="10" cy="17" r="5.5" fill="#f0ead8" stroke="#d4c0a0" strokeWidth="1.2"/>
      {/* Right knob top */}
      <circle cx={width-10} cy="5"  r="5.5" fill="#f0ead8" stroke="#d4c0a0" strokeWidth="1.2"/>
      {/* Right knob bottom */}
      <circle cx={width-10} cy="17" r="5.5" fill="#f0ead8" stroke="#d4c0a0" strokeWidth="1.2"/>
      {/* Shine */}
      <ellipse cx="18" cy="9" rx="6" ry="2" fill="white" opacity="0.25" transform="rotate(-15,18,9)"/>
    </svg>
  );
}

function HandSVG({ open, isIre }) {
  return (
    <svg width="60" height="60" viewBox="0 0 60 60">
      {open ? (
        /* Open hand */
        <g>
          <ellipse cx="30" cy="38" rx="16" ry="12" fill="#c8a870" stroke="#a08050" strokeWidth="1.5"/>
          {/* Fingers */}
          {[0,1,2,3,4].map(i => (
            <rect key={i}
              x={12 + i*8} y={16 + (i===0||i===4 ? 8 : i===1||i===3 ? 4 : 0)}
              width="6" height={18 - (i===0||i===4 ? 6 : 2)}
              rx="3" fill="#c8a870" stroke="#a08050" strokeWidth="1"/>
          ))}
          {/* Object */}
          {isIre ? (
            <circle cx="30" cy="38" r="6" fill="#4caf50" opacity="0.9"/>
          ) : (
            <circle cx="30" cy="38" r="6" fill="#ef4444" opacity="0.9"/>
          )}
        </g>
      ) : (
        /* Closed fist */
        <g>
          <ellipse cx="30" cy="35" rx="17" ry="13" fill="#c8a870" stroke="#a08050" strokeWidth="1.5"/>
          <rect x="14" y="20" width="32" height="18" rx="8" fill="#c8a870" stroke="#a08050" strokeWidth="1.5"/>
          {[0,1,2,3].map(i => (
            <line key={i} x1={17+i*8} y1="20" x2={17+i*8} y2="30" stroke="#a08050" strokeWidth="0.8" opacity="0.4"/>
          ))}
          <rect x="12" y="30" width="10" height="10" rx="4" fill="#b89860" stroke="#a08050" strokeWidth="1"/>
        </g>
      )}
    </svg>
  );
}

// ── OGBE SYMBOL ───────────────────────────────────────────────────────────────

function OgbeSymbol({ size = 20, className = '' }) {
  const canvasRef = React.useRef(null);
  const a   = size * 0.47;
  const ccx = size / 2;
  const ccy = size / 2;
  const sc  = a / 200;
  const N   = 80;

  React.useEffect(() => {
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
      style={{ display: 'inline-block', verticalAlign: 'middle', width: size + 'px', height: size + 'px' }}
      aria-label="Ogbe Energy Symbol — SymboE" />
  );
}

// ── IFA BRACKET (IfaBracket) ──────────────────────────────────────────────────
// Normal bracket character + OgbeSymbol subscript = IfaBracket (Ifa Script)
// Used only on the closing bracket of a pair; opening bracket is plain amber.
function IfaBracket({ children }) {
  return (
    <span style={{ whiteSpace: 'nowrap' }}>
      <span style={{
        fontSize: '1.05em', fontWeight: 700, color: '#f0920c',
        fontFamily: 'monospace',
      }}>{children}</span><span style={{
        display: 'inline-block',
        verticalAlign: 'sub',
        width: '10px',
        height: '10px',
        marginLeft: '1px',
        pointerEvents: 'none',
      }}><OgbeSymbol size={10} /></span>
    </span>
  );
}

// ── IBO DET 2×2 COMPONENT ─────────────────────────────────────────────────────
// Interactive section: Ifa 2×2 Opon Ifa = det = ad − bc,
// 4 sweeping motion patterns, Method 1 vs Method 2 side-by-side.

function IboDet2x2() {
  const [activeSweep, setActiveSweep] = React.useState(0);
  const [drawProg,    setDrawProg]    = React.useState(1);
  const rafRef = React.useRef(null);

  const SWEEPS = [
    { id:'rtl-single', label:'Single RTL', dir:'RTL', passes:1, color:'#f0920c',
      desc:'One pass, right → center. Open cowry (Ogbé / 0). The bone sweeps once across the row, terminating at the center dot (=). Used in both methods.' },
    { id:'rtl-double', label:'Double RTL', dir:'RTL', passes:2, color:'#8b5cf6',
      desc:'Two passes, right → center. Closed cowry (Òyèkú / 1). First pass (amber glow), second confirmation pass (violet), both terminate at center. Used in both methods.' },
    { id:'ttb-single', label:'Single TTB', dir:'TTB', passes:1, color:'#14b8d4',
      desc:'One pass, top → center. Open cowry (Ogbé / 0). The bone sweeps down the column, terminating at the center dot (=). Used in both methods.' },
    { id:'ttb-double', label:'Double TTB', dir:'TTB', passes:2, color:'#4caf50',
      desc:'Two passes, top → center. Closed cowry (Òyèkú / 1). First pass then second confirmation pass, both terminating at the center dot (=). Used in both methods.' },
  ];

  React.useEffect(() => {
    setDrawProg(0);
    let start = null;
    const DURATION = 1000;
    function step(ts) {
      if (!start) start = ts;
      const p = Math.min((ts - start) / DURATION, 1);
      setDrawProg(p);
      if (p < 1) { rafRef.current = requestAnimationFrame(step); }
    }
    rafRef.current = requestAnimationFrame(step);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [activeSweep]);

  const sw = SWEEPS[activeSweep];

  // SVG layout
  const W = 280, H = 200, CX = W / 2, CY = H / 2;
  // Cowry node positions (2×2 grid around center)
  const CELLS = {
    tl: { x: 52,  y: 55  },  // top-left
    tr: { x: 228, y: 55  },  // top-right
    bl: { x: 52,  y: 145 },  // bottom-left
    br: { x: 228, y: 145 },  // bottom-right
  };
  // Center termination point per row/col
  const CTRS = {
    rowTop: { x: CX, y: 55  },
    rowBot: { x: CX, y: 145 },
    colL:   { x: 52,  y: CY },
    colR:   { x: 228, y: CY },
  };

  // Build animated lines from drawProg (0→1)
  function buildLines() {
    const lines = [];
    const segs = sw.dir === 'RTL'
      // RTL row-by-row: tr→center, tl→center, br→center, bl→center (4 segs × passes)
      ? [
          { from: CELLS.tr, to: CTRS.rowTop, c: sw.color },
          { from: CELLS.tl, to: CTRS.rowTop, c: sw.passes===2?'#8b5cf6':sw.color },
          { from: CELLS.br, to: CTRS.rowBot, c: sw.color },
          { from: CELLS.bl, to: CTRS.rowBot, c: sw.passes===2?'#8b5cf6':sw.color },
        ]
      // TTB col-by-col: tr→center, br→center, tl→center, bl→center
      : [
          { from: CELLS.tr, to: CTRS.colR,   c: sw.color },
          { from: CELLS.br, to: CTRS.colR,   c: sw.passes===2?'#4caf50':sw.color },
          { from: CELLS.tl, to: CTRS.colL,   c: '#14b8d4' },
          { from: CELLS.bl, to: CTRS.colL,   c: sw.passes===2?'#4caf50':'#14b8d4' },
        ];

    segs.forEach((seg, i) => {
      const frac  = 1 / segs.length;
      const start = i * frac;
      const end   = start + frac;
      const lp    = Math.max(0, Math.min(1, (drawProg - start) / (end - start)));
      const x2 = seg.from.x + (seg.to.x - seg.from.x) * lp;
      const y2 = seg.from.y + (seg.to.y - seg.from.y) * lp;
      lines.push({ x1: seg.from.x, y1: seg.from.y, x2, y2, color: seg.c });
    });
    return lines;
  }

  const lines = buildLines();

  return (
    <div className="ibodet2x2-wrap" id="ibodet2x2">
      <div className="ibodet2x2-inner">

        {/* Header */}
        <div className="ibodet2x2-header">
          <div className="ifd-sec-badge">Ọpọ́n Ifá · Matrix Origin</div>
          <h2 className="ibodet2x2-title">How Ifa Computes the Determinant (A Simplified Guide)</h2>
          <p className="ibodet2x2-tagline">Ìbò Gbígbà is a highly technical field and practice in the Odu Ifa System.</p>
          <p className="ibodet2x2-sub">
            The Ọpọ́n Ifá (Ifa Tray) used in Ìbò Gbígbà encodes the <strong>change in orientation
            of outcomes</strong> across Methods 1 and 2 as a <strong>2×2 meta-matrix</strong>:
            L₁ (Method 1, Left outcome), R₁ (Method 1, Right outcome), L₂ (Method 2, Left outcome),
            and R₂ (Method 2, Right outcome). Both <em>Column Sweep (TTB)</em> and{' '}
            <em>Row Sweep (RTL)</em> are used in <strong>both</strong> methods — the sweep pattern is
            not exclusive to either. The orientation reversal between the two methods produces the
            formula <em>det = L₁·R₂ − R₁·L₂</em> — identical to <em>det = ad − bc</em>, the same
            formula modern mathematics uses for the 2×2 determinant.
          </p>
        </div>

        {/* Main: matrix equation + sweep visualizer */}
        <div className="ibodet2x2-main">

          {/* Left: 2×2 matrix layout */}
          <div className="ibodet2x2-matrix-card">
            <div className="ibodet2x2-card-label">Ọpọ́n Ifá · 2×2 Meta-Matrix of Outcomes</div>
            <div className="ibodet2x2-matrix">
              <div className="ibodet2x2-mat-bracket">[</div>
              <div className="ibodet2x2-mat-grid">
                {[
                  { key:'L1', label:'L₁', sub:'a', pos:'M1 · Left outcome',  color:'#f0920c', diag:'main' },
                  { key:'R1', label:'R₁', sub:'b', pos:'M1 · Right outcome', color:'#6366f1', diag:'anti' },
                  { key:'L2', label:'L₂', sub:'c', pos:'M2 · Left outcome',  color:'#6366f1', diag:'anti' },
                  { key:'R2', label:'R₂', sub:'d', pos:'M2 · Right outcome', color:'#f0920c', diag:'main' },
                ].map(cell => (
                  <div key={cell.key} className="ibodet2x2-mat-cell">
                    <span className="ibodet2x2-mat-var" style={{ color: cell.color }}>{cell.label}</span>
                    <span className="ibodet2x2-mat-sub" style={{ color: cell.color+'99' }}>{cell.sub}</span>
                    <span className="ibodet2x2-mat-pos">{cell.pos}</span>
                  </div>
                ))}
              </div>
              <div className="ibodet2x2-mat-bracket">]</div>
            </div>

            <div className="ibodet2x2-det-formula">
              <span className="ibodet2x2-det-label">det =&nbsp;</span>
              <span style={{ color:'#f0920c', fontWeight:800 }}>L₁</span>
              <span style={{ color:'#4caf50', fontWeight:800 }}>·R₂</span>
              <span style={{ color:'#a8b4cc', margin:'0 6px' }}>−</span>
              <span style={{ color:'#6366f1', fontWeight:800 }}>R₁</span>
              <span style={{ color:'#ef4444', fontWeight:800 }}>·L₂</span>
            </div>

            <div className="ibodet2x2-ifa-claim">
              The Ọpọ́n Ifá encodes the <strong style={{ color:'#f0920c' }}>change in orientation</strong> between
              Methods 1 and 2. L₁ and R₂ sit on the <strong style={{ color:'#f0920c' }}>main diagonal</strong> —
              the positive term, Ire (det≠0). R₁ and L₂ sit on the{' '}
              <strong style={{ color:'#ef4444' }}>anti-diagonal</strong> — the negative term, Ibi (det=0).
              The orientation reversal is exactly what produces the sign structure of the determinant.
              <em> det = L₁·R₂ − R₁·L₂ = ad − bc. This is the same formula.</em>
            </div>
          </div>

          {/* Right: animated sweep visualizer */}
          <div className="ibodet2x2-sweep-card">
            <div className="ibodet2x2-card-label">4 Sweeping Motion Patterns</div>

            <div className="ibodet2x2-tabs">
              {SWEEPS.map((s, i) => (
                <button key={s.id}
                  className={`ibodet2x2-tab${activeSweep===i ? ' ibodet2x2-tab--active' : ''}`}
                  style={activeSweep===i ? { borderColor:s.color, color:s.color, background:s.color+'22' } : {}}
                  onClick={() => setActiveSweep(i)}>
                  {s.label}
                </button>
              ))}
            </div>

            <div className="ibodet2x2-svg-wrap">
              <svg viewBox={`0 0 ${W} ${H}`} className="ibodet2x2-svg">
                {/* Grid guides */}
                <line x1={CX} y1="0" x2={CX} y2={H} stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
                <line x1="0" y1={CY} x2={W} y2={CY} stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>

                {/* Animated sweep lines */}
                {lines.map((ln, i) => (
                  <line key={i} x1={ln.x1} y1={ln.y1} x2={ln.x2} y2={ln.y2}
                    stroke={ln.color} strokeWidth="2.2" strokeLinecap="round" opacity="0.88"/>
                ))}

                {/* Arrowheads on completed lines */}
                {lines.filter(ln => {
                  const dx = ln.x2 - ln.x1, dy = ln.y2 - ln.y1;
                  return Math.sqrt(dx*dx+dy*dy) > 6;
                }).map((ln, i) => {
                  const dx = ln.x2-ln.x1, dy = ln.y2-ln.y1;
                  const len = Math.sqrt(dx*dx+dy*dy);
                  const ux = dx/len, uy = dy/len;
                  const ax = ln.x2 - ux*8, ay = ln.y2 - uy*8;
                  const px = -uy*4, py = ux*4;
                  return (
                    <polygon key={i}
                      points={`${ln.x2},${ln.y2} ${ax+px},${ay+py} ${ax-px},${ay-py}`}
                      fill={ln.color} opacity="0.85"/>
                  );
                })}

                {/* Cowry dots at 4 corners */}
                {Object.entries(CELLS).map(([key, pos]) => {
                  const isMain = key==='tl' || key==='br';
                  return (
                    <g key={key}>
                      <circle cx={pos.x} cy={pos.y} r="20"
                        fill="rgba(8,13,24,0.94)"
                        stroke={isMain ? '#f0920c55' : '#6366f155'}
                        strokeWidth="1.5"/>
                      <text x={pos.x} y={pos.y+6} textAnchor="middle"
                        fill={isMain ? '#f0920c' : '#818cf8'}
                        fontSize="15" fontWeight="800" fontFamily="monospace">
                        {key==='tl'?'a':key==='tr'?'b':key==='bl'?'c':'d'}
                      </text>
                    </g>
                  );
                })}

                {/* Center termination node (the = sign) */}
                <circle cx={CX} cy={CY} r="14" fill="rgba(240,146,12,0.08)" stroke="#f0920c" strokeWidth="2"/>
                <circle cx={CX} cy={CY} r="5" fill="#f0920c"/>
                <text x={CX} y={CY-19} textAnchor="middle" fill="#f0920c" fontSize="9" fontFamily="monospace" fontWeight="700">=</text>
                <text x={CX} y={CY+28} textAnchor="middle" fill="#5a6a8a" fontSize="7" fontFamily="sans-serif">center</text>

                {/* Row center dots for RTL */}
                {sw.dir==='RTL' && [CTRS.rowTop, CTRS.rowBot].map((c,i) => (
                  <circle key={i} cx={c.x} cy={c.y} r="5" fill="#f0920c88"/>
                ))}
                {/* Col center dots for TTB */}
                {sw.dir==='TTB' && [CTRS.colL, CTRS.colR].map((c,i) => (
                  <circle key={i} cx={c.x} cy={c.y} r="5" fill="#14b8d488"/>
                ))}

                {/* Direction label */}
                <text x={W-5} y="14" textAnchor="end"
                  fill={sw.color} fontSize="9" fontFamily="monospace" fontWeight="700">
                  {sw.dir} ×{sw.passes}
                </text>
              </svg>
            </div>

            <div className="ibodet2x2-sweep-desc" style={{ borderLeftColor: sw.color }}>
              <span><strong style={{ color: sw.color }}>{sw.label}</strong> — {sw.desc}</span>
              <span className="ibodet2x2-sweep-desc-badge"
                style={{ background: sw.color+'22', borderColor: sw.color+'55', color: sw.color }}>
                {sw.dir==='RTL' ? '↞ Row sweep R→L' : '↓ Col sweep T→B'} · Both methods
              </span>
            </div>
          </div>
        </div>

        {/* Method 1 vs Method 2 comparison */}
        <div className="ibodet2x2-methods">
          <div className="ibodet2x2-method-card ibodet2x2-method-card--1">
            <div className="ibodet2x2-method-badge-head">Method 1</div>
            <div className="ibodet2x2-method-title">Client Holds Ìbò</div>
            <ul className="ibodet2x2-method-list">
              <li>Client holds the Ìbò objects in two closed hands</li>
              <li>Bone sweeps the Ọpọ́n Ifá — both TTB (column) and RTL (row) sweeps are used</li>
              <li>Senior Odu position swept first; each sweep terminates at the center dot (=)</li>
              <li>Open cowry (Ogbé / 0) = one pass; Closed (Òyèkú / 1) = two passes</li>
              <li>After sweep: client selects a hand — Ire or Ibi</li>
              <li>Outcome positions: L₁ (left outcome) and R₁ (right outcome)</li>
              <li>Rule: senior Odu leads → LEFT hand = Ire; junior leads → RIGHT hand = Ire</li>
            </ul>
            <div className="ibodet2x2-method-formula">
              TTB or RTL sweep → center dot (=) → hand selection → L₁ / R₁
            </div>
            <div className="ibodet2x2-method-logic">
              <span className="ibodet2x2-logic-badge ibodet2x2-logic-badge--int">Intuitionistic Logic</span>
              Each sweep is evaluated independently; the client's hand selection resolves the final state.
            </div>
          </div>

          <div className="ibodet2x2-method-card ibodet2x2-method-card--2">
            <div className="ibodet2x2-method-badge-head">Method 2</div>
            <div className="ibodet2x2-method-title">Ìbò Beside Ọ̀pẹ̀lẹ̀</div>
            <ul className="ibodet2x2-method-list">
              <li>Ìbò objects lie beside the Ọ̀pẹ̀lẹ̀ chain: positive (cowrie) right, negative (bone) left</li>
              <li>Bone sweeps the Ọpọ́n Ifá — both TTB (column) and RTL (row) sweeps are used</li>
              <li>Each sweep terminates at the center dot (=); senior position swept first</li>
              <li>Open cowry (Ogbé / 0) = one pass; Closed (Òyèkú / 1) = two passes</li>
              <li>Auto-resolved — no hand selection required</li>
              <li>Outcome positions: L₂ (left outcome) and R₂ (right outcome)</li>
              <li>Rule: <em>REVERSED orientation</em> from Method 1 — senior leads → RIGHT (+) = Ire; junior leads → LEFT (−) = Ibi</li>
            </ul>
            <div className="ibodet2x2-method-formula">
              TTB or RTL sweep → center dot (=) → auto-resolve → L₂ / R₂
            </div>
            <div className="ibodet2x2-method-logic">
              <span className="ibodet2x2-logic-badge ibodet2x2-logic-badge--nonint">Non-Intuitionistic Logic</span>
              The sweep direction and orientation structure resolve the outcome automatically — no intermediate hand selection.
            </div>
          </div>

          <div className="ibodet2x2-logic-note">
            The Babalawo applies a combination or <em>amulu</em> of <strong>intuitionistic</strong> and{' '}
            <strong>non-intuitionistic logic</strong> unique to Ifa/Orisa Knowledge depending on
            context — Method 1 evaluates each sweep independently (intuitionistic), while Method 2
            auto-resolves through structural orientation (non-intuitionistic / classical).
          </div>
        </div>

        {/* Evidence source box */}
        <a
          href="https://www.youtube.com/watch?v=BpS3ZO8euaU&t=409s"
          target="_blank"
          rel="noopener noreferrer"
          className="ibodet2x2-evidence">
          <div className="ibodet2x2-evidence__left">
            <div className="ibodet2x2-evidence__badge">Primary Source</div>
            <div className="ibodet2x2-evidence__title">
              Ìbò Gbígbà in Practice — Watch the Evidence
            </div>
            <div className="ibodet2x2-evidence__desc">
              See a highly respected Babalawo demonstrate the Ìbò sweeping process live. Observe the
              column and row sweeps, the center termination, and how the orientation
              rule of Methods 1 and 2 manifests in a real divination session.
            </div>
            <div className="ibodet2x2-evidence__meta">
              <span className="ibodet2x2-evidence__meta-item">
                <span className="ibodet2x2-evidence__meta-icon">▶</span> YouTube · starts at 6:49
              </span>
              <span className="ibodet2x2-evidence__meta-sep">·</span>
              <span className="ibodet2x2-evidence__meta-item">Ifa Knowledge System</span>
            </div>
          </div>
          <div className="ibodet2x2-evidence__right">
            <div className="ibodet2x2-evidence__play">
              <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" width="56" height="56">
                <circle cx="28" cy="28" r="27" stroke="currentColor" strokeWidth="1.5" opacity="0.35"/>
                <circle cx="28" cy="28" r="27" fill="currentColor" opacity="0.08"/>
                <polygon points="22,18 42,28 22,38" fill="currentColor" opacity="0.9"/>
              </svg>
            </div>
            <div className="ibodet2x2-evidence__cta">Watch Now ↗</div>
          </div>
        </a>

        {/* Historical claim banner */}
        <div className="ibodet2x2-claim">
          <div className="ibodet2x2-claim__icon">⬡</div>
          <div className="ibodet2x2-claim__text">
            <strong>Historical Perspective:</strong> The Ọpọ́n Ifá 2×2 layout and its Ìbò sweeping
            motions encode the formula <em>det = ad − bc</em> — the exact same formula as the
            modern 2×2 determinant — millennia before Leibniz (1693) or Cauchy (1812).
            The main diagonal sweep (a·d, amber) produces the positive term: <em>Ire</em>.
            The anti-diagonal sweep (b·c, red) produces the negative term: <em>Ibi</em>.
            The center dot is the equality sign. The four sweeping motions are
            the four arithmetic operations of determinant computation.{' '}
            <strong>This is the origin of determinant theory.</strong>
            <span className="ibodet2x2-claim__note">
              <span className="ibodet2x2-claim__note-icon">✦</span>
              Note: This is just an introductory guide into Yoruba mathematics as encoded in the Odu Ifa.
              As a core aspect of Ifa Knowledge System, Ìbò Gbígbà is much deeper than what can be
              captured in any book or digital platform.
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}

// ── COMPUTOE COMPONENT ────────────────────────────────────────────────────────

function ComputoE() {
  // 8 cowries: indices 0–3 = left column top→bottom, 4–7 = right column top→bottom
  const [cowries, setCowries]   = useState([0,0,0,0,0,0,0,0]); // 0=open/Ogbe, 1=closed/Oyeku
  const [active,  setActive]    = useState(-1);
  const [swept,     setSwept]     = useState(-1);
  const [sweepPass, setSweepPass] = useState(0);    // 0=first pass, 1=second pass (double-mark)
  const [sweepDir,  setSweepDir]  = useState('rtl'); // 'rtl'=right→left, 'ltr'=left→right
  const [mode,      setMode]      = useState('matrix'); // matrix | quantum | ai
  const [iboPhase,  setIboPhase]  = useState('idle');  // idle | ready | result
  const [iboOpen,   setIboOpen]   = useState({ left: false, right: false });
  const [iboResult, setIboResult] = useState(null);   // {isIre,type,hand,selfSeized?}
  const [sweeping,  setSweeping]  = useState(false);
  const [boardShape,setBoardShape] = useState('circle'); // circle | square
  const sweepRef = useRef(null);
  const [method, setMethod] = useState(1);       // 1 = Method 1 (Client holds Ibo), 2 = Method 2 (Ibo beside Opele)
  const [sweepMode, setSweepMode] = useState('TTB'); // 'TTB' = column sweep | 'RTL' = row sweep (both used in both methods)

  // Independent left (Y) and right (X) arm codes → full 256 Odu
  const leftCode  = cowries.slice(0,4).map(String).join('');   // Y (secondary)
  const rightCode = cowries.slice(4,8).map(String).join('');   // X (principal)
  const leftOdu   = oduFromCode(leftCode);
  const rightOdu  = oduFromCode(rightCode);
  const isMeji       = leftCode === rightCode;
  const seniorIsRight = parseInt(rightOdu.n, 10) <= parseInt(leftOdu.n, 10);
  const oduDisplayName = isMeji ? `${rightOdu.name} Méjì` : `${rightOdu.name} ${leftOdu.name}`;
  const oduColor  = rightOdu.color;
  const leftBits  = cowries.slice(0,4);
  const rightBits = cowries.slice(4,8);
  const detL = computeDet2x2(leftBits);
  const detR = computeDet2x2(rightBits);

  // Hand assignments (odd odu# → left=Ire; even → right=Ire)
  const oduNum = parseInt(rightOdu.n, 10);
  const leftIsIre  = oduNum % 2 === 1;
  const rightIsIre = !leftIsIre;

  function toggleCowry(idx) {
    if (sweeping) return;
    playTone(COWRY_FREQS[idx]);
    setActive(idx);
    setTimeout(() => setActive(-1), 300);
    setCowries(prev => prev.map((v,i) => i === idx ? 1 - v : v));
    setIboPhase('idle');
    setIboResult(null);
    setIboOpen({ left: false, right: false });
  }

  function castRandom() {
    if (sweeping) return;
    const leftNew  = Array.from({ length: 4 }, () => Math.round(Math.random()));
    const rightNew = Array.from({ length: 4 }, () => Math.round(Math.random()));
    const allNew   = [...leftNew, ...rightNew];
    setCowries(allNew);
    setIboPhase('idle');
    setIboResult(null);
    setIboOpen({ left: false, right: false });
    // Play ascending arp for all 8 cowries
    allNew.forEach((b, i) => {
      setTimeout(() => {
        playTone(COWRY_FREQS[i]);
        setSwept(i);
        setTimeout(() => setSwept(-1), 250);
      }, i * 130);
    });
  }

  function resetBoard() {
    if (sweeping) return;
    setCowries([0,0,0,0,0,0,0,0]);
    setIboPhase('idle');
    setIboResult(null);
    setIboOpen({ left: false, right: false });
  }

  function doSweep() {
    if (sweeping) return;
    setSweeping(true);

    // ── 1. Sweep direction by sweepMode (independent of method) ──────────────
    // Both TTB (column) and RTL (row) sweeps are used in both methods.
    // sweepMode ('TTB' | 'RTL') is selected by the user independently.
    // Senior position always sweeps first; sweep terminates at center dot (=).
    // Method determines HOW the result is resolved (hand selection vs auto),
    // NOT which sweep direction is used.

    let dir, seedOrder;

    if (sweepMode === 'RTL') {
      if (seniorIsRight) {
        // X (right) senior → row sweeps right → left: [4,0], [5,1], [6,2], [7,3]
        dir = 'rtl-row';
        seedOrder = [4, 0, 5, 1, 6, 2, 7, 3];
      } else {
        // Y (left) senior → row sweeps left → right: [0,4], [1,5], [2,6], [3,7]
        dir = 'ltr-row';
        seedOrder = [0, 4, 1, 5, 2, 6, 3, 7];
      }
    } else {
      // TTB: column-by-column, senior column first
      if (seniorIsRight) {
        dir = 'ttb-x'; // X (right) column top→bottom first
        seedOrder = [4, 5, 6, 7, 0, 1, 2, 3];
      } else {
        dir = 'ttb-y'; // Y (left) column top→bottom first
        seedOrder = [0, 1, 2, 3, 4, 5, 6, 7];
      }
    }
    setSweepDir(dir);

    // ── 2. Arrow multiplicity: 4 sweeping motion patterns ─────────────────────
    // Motion 1 — RTL single-pass (Ogbé / open / 0) — used in both methods
    // Motion 2 — RTL double-pass (Òyèkú / closed / 1) — used in both methods
    // Motion 3 — TTB single-pass (Ogbé / open / 0) — used in both methods
    // Motion 4 — TTB double-pass (Òyèkú / closed / 1) — used in both methods
    // All sweeps terminate at the center dot (=) — the equality sign.
    const events = [];
    let t = 0;
    const GAP_SINGLE   = 380;
    const DUR_PASS1    = 250;
    const GAP_BETWEEN  = 190;
    const GAP_AFTER2   = 310;

    seedOrder.forEach(idx => {
      const val = cowries[idx];
      if (val === 0) {
        events.push({ idx, pass: 0, totalPasses: 1, t });
        t += GAP_SINGLE;
      } else {
        events.push({ idx, pass: 0, totalPasses: 2, t });
        t += DUR_PASS1 + GAP_BETWEEN;
        events.push({ idx, pass: 1, totalPasses: 2, t });
        t += GAP_AFTER2;
      }
    });

    const totalDuration = t;

    // ── 3. Fire sweep events ──────────────────────────────────────────────────
    events.forEach(({ idx, pass, totalPasses, t: delay }) => {
      sweepRef.current = setTimeout(() => {
        const baseFreq = COWRY_FREQS[idx];
        const pitch = (totalPasses === 2 && pass === 1) ? baseFreq * 1.189 : baseFreq;
        playTone(pitch, totalPasses === 2 ? 'sine' : 'triangle', 0.26);
        setSwept(idx);
        setSweepPass(pass);
        const flashDur = totalPasses === 1 ? 310 : 215;
        setTimeout(() => setSwept(-1), flashDur);
      }, delay);
    });

    // ── 4. Resolve ────────────────────────────────────────────────────────────
    setTimeout(() => {
      setSweeping(false);
      setSweepDir('rtl-row');

      if (isMeji) {
        // Non-intuitionistic: Méjì Odu self-seize (both methods)
        const oduN = parseInt(rightOdu.n, 10);
        const isIre = oduN % 2 === 1;
        const typeList = isIre ? IRE_TYPES : IBI_TYPES;
        const type = typeList[Math.floor(Math.random() * typeList.length)];
        playIboSound(isIre);
        setIboResult({ isIre, type, hand: 'self', selfSeized: true });
        setIboPhase('result');
      } else if (method === 2) {
        // Method 2 auto-resolve: Ibo beside Opele — REVERSED orientation.
        // Senior column swept first → reads RIGHT (positive = cowrie) → Ire.
        // Junior column swept first → reads LEFT (negative = bone) → Ibi.
        const isIre = seniorIsRight;
        const typeList = isIre ? IRE_TYPES : IBI_TYPES;
        const type = typeList[Math.floor(Math.random() * typeList.length)];
        playIboSound(isIre);
        setIboResult({ isIre, type, hand: isIre ? 'right-obj' : 'left-obj', method2: true });
        setIboPhase('result');
      } else {
        // Method 1: intuitionistic — client selects hand
        setIboPhase('ready');
      }
    }, totalDuration + 440);
  }

  function castIbo(hand) {
    if (iboPhase !== 'ready') return;
    const isIre = hand === 'left' ? leftIsIre : rightIsIre;
    const typeList = isIre ? IRE_TYPES : IBI_TYPES;
    const type = typeList[Math.floor(Math.random() * typeList.length)];
    playIboSound(isIre);
    setIboOpen(prev => ({ ...prev, [hand]: true }));
    setTimeout(() => {
      setIboResult({ isIre, type, hand });
      setIboPhase('result');
    }, 600);
  }

  useEffect(() => () => { if (sweepRef.current) clearTimeout(sweepRef.current); }, []);

  const MODES = [
    { id:'matrix',  label:'Matrix',  icon:'≡' },
    { id:'quantum', label:'Quantum', icon:'ψ' },
    { id:'ai',      label:'AI',      icon:'◎' },
  ];

  // Quantum-style probability amplitudes (fun, educational, not rigorous)
  const qAmps = [...rightBits, ...leftBits].map(b => ({
    label: b ? '|Òyèkú⟩' : '|Ogbé⟩',
    state: b ? '|1⟩' : '|0⟩',
    prob:  b === 0 ? 78 : 22,
    isOne: b === 1,
  }));

  return (
    <div className="computoe-wrap" id="computoe">
      <div className="computoe-inner">

        {/* Header */}
        <div className="computoe-header">
          <div className="computoe-badge">
            <span>⬡</span>
            ComputoE · Interactive Ifa Computer
          </div>
          <div className="computoe-title">The Ifa Computer</div>
          <div className="computoe-sub">
            The Ifa Computer is the Computer for Everything (ComputoE), also known as the Computer of Energy (ComputoE), the ToE Computer, or Consciousness Computer. It is the Tech where ancient African computing meets classical, quantum, and AI paradigms.
            Cast the Ikin, read the Odu, cast the Ìbò — then watch modern mathematics say the same thing.
          </div>
          {/* Platform stats bar — inspired by IBM Quantum system info */}
          <div className="computoe-platform-bar">
            <span className="cmp-stat-chip cmp-stat-chip--live">System Online</span>
            <span className="cmp-stat-chip">16 Oju Odu · 256 Odu</span>
            <span className="cmp-stat-chip">8-bit IFABit</span>
            <span className="cmp-stat-chip">8-bit IFA Encoding</span>
            <span className="cmp-stat-chip">2 × 2 Matrix</span>
            <span className="cmp-stat-chip">Classical · Quantum · AI</span>
          </div>
        </div>

        {/* Main grid: Ifa board + Modern panel */}
        <div className="computoe-main">

          {/* ── LEFT: Ifa board ─────────────────────────────────── */}
          <div className="cmp-panel cmp-panel--ifa">
            <div className="cmp-panel__head">
              <span className="cmp-panel__title" style={{ color: '#f0920c', textTransform: 'none' }}>Ọpọ́n Ifá · The IfaTablet (IfaTab)</span>
              <span style={{ fontSize: '0.7rem', color: '#5a6a8a' }}>Click any cowry · drag the bone</span>
            </div>
            <div className="cmp-panel__body" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

              {/* Board shape toggle */}
              <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
                {[
                  { id: 'circle', label: 'IfaCircle', icon: '◉' },
                  { id: 'square', label: 'IfaSquare', icon: '⬛' },
                ].map(opt => (
                  <button key={opt.id}
                    onClick={() => setBoardShape(opt.id)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 5,
                      padding: '4px 14px', borderRadius: 20, border: '1px solid',
                      fontSize: '0.72rem', fontWeight: 700, cursor: 'pointer',
                      letterSpacing: '0.03em',
                      background: boardShape === opt.id ? 'rgba(240,146,12,0.18)' : 'transparent',
                      borderColor: boardShape === opt.id ? '#f0920c' : 'rgba(255,255,255,0.12)',
                      color: boardShape === opt.id ? '#f0920c' : '#5a6a8a',
                      transition: 'all 0.2s ease',
                    }}>
                    <span style={{ fontSize: '0.65rem' }}>{opt.icon}</span>
                    {opt.label}
                  </button>
                ))}
              </div>

              {/* Opon Ifa */}
              <div className={`opon-ifa${boardShape === 'square' ? ' opon-ifa--square' : ''}`} style={{ borderColor: oduColor + 'aa' }}>
                {/* Column labels */}
                <div className="opon-col-labels">
                  <span>Left Arm</span>
                  <span>Right Arm</span>
                </div>

                <div className="opon-inner">
                  {/* Left column — Y (secondary Odu) */}
                  <div className="cowry-col">
                    {[0,1,2,3].map(i => (
                      <div key={i}
                           className={`cowry-wrap${swept === i ? (cowries[i] === 0 ? ' cowry-swept-single' : sweepPass === 0 ? ' cowry-swept-double-a' : ' cowry-swept-double-b') : ''}`}
                           onClick={() => toggleCowry(i)}
                           style={{ position: 'relative' }}>
                        <CowrySVG
                          open={cowries[i] === 0}
                          color={leftOdu.color}
                          active={active === i}
                          swept={swept === i}
                          sweepPass={sweepPass}
                        />
                        <div className="cowry-mark-indicator"
                             style={{ color: cowries[i] ? '#6366f1' : leftOdu.color, fontSize: '0.58rem' }}>
                          {cowries[i] ? 'Òyèkú' : 'Ogbé'}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Center divider + Odu name */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                    <div style={{ fontSize: '0.6rem', color: '#5a6a8a', textTransform: 'uppercase',
                      letterSpacing: '0.1em', writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                      {isMeji ? 'Odù Méjì' : 'Odù Ifa'}
                    </div>
                    <div style={{ width: 1, flex: 1, background: 'rgba(255,255,255,0.06)' }} />
                    <div style={{ textAlign: 'center', maxWidth: 48 }}>
                      <div style={{ fontSize: '0.65rem', fontWeight: 800, color: rightOdu.color, lineHeight: 1.2 }}>
                        {rightOdu.name}
                      </div>
                      {!isMeji && (
                        <div style={{ fontSize: '0.6rem', fontWeight: 700, color: leftOdu.color, lineHeight: 1.2, marginTop: 2 }}>
                          {leftOdu.name}
                        </div>
                      )}
                      {isMeji && (
                        <div style={{ fontSize: '0.52rem', color: '#5a6a8a', lineHeight: 1.2 }}>Méjì</div>
                      )}
                    </div>
                    <div style={{ width: 1, flex: 1, background: 'rgba(255,255,255,0.06)' }} />
                  </div>

                  {/* Right column — X (principal Odu) */}
                  <div className="cowry-col">
                    {[4,5,6,7].map(i => (
                      <div key={i}
                           className={`cowry-wrap${swept === i ? (cowries[i] === 0 ? ' cowry-swept-single' : sweepPass === 0 ? ' cowry-swept-double-a' : ' cowry-swept-double-b') : ''}`}
                           onClick={() => toggleCowry(i)}
                           style={{ position: 'relative' }}>
                        <CowrySVG
                          open={cowries[i] === 0}
                          color={rightOdu.color}
                          active={active === i}
                          swept={swept === i}
                          sweepPass={sweepPass}
                        />
                        <div className="cowry-mark-indicator"
                             style={{ color: cowries[i] ? '#6366f1' : rightOdu.color, fontSize: '0.58rem' }}>
                          {cowries[i] ? 'Òyèkú' : 'Ogbé'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bone */}
                <div className={`bone-wrapper${sweeping ? ' bone-wrapper--active' : ''}`}
                     title="The Babalawo's reading bone — drag across the cowries">
                  <BoneSVG width={sweeping ? 110 : 86} />
                </div>
              </div>

              {/* Legend */}
              <div className="computoe-legend" style={{ marginTop: 24 }}>
                <div className="cleg">
                  <CowrySVG open={true}  color="#f0920c" /> <span>Open = Ogbé (0)</span>
                </div>
                <div className="cleg">
                  <CowrySVG open={false} color="#6366f1" /> <span>Closed = Òyèkú (1)</span>
                </div>
                <div className="cleg">
                  <BoneSVG width={50} /> <span>Reading Bone</span>
                </div>
              </div>

              {/* Controls */}
              <div className="board-controls">
                {/* Method selector */}
                <div className="sweep-method-toggle">
                  {[
                    { id: 1, label: 'Method 1', hint: 'Client holds Ibo — hand-resolved; both TTB and RTL sweeps' },
                    { id: 2, label: 'Method 2', hint: 'Ibo beside Opele — auto-resolves; both TTB and RTL sweeps' },
                  ].map(opt => (
                    <button key={opt.id}
                      className={`bctl sweep-method-btn${method === opt.id ? ' sweep-method-btn--active' : ''}`}
                      onClick={() => { if (!sweeping) { setMethod(opt.id); setIboPhase('idle'); setIboResult(null); setIboOpen({ left: false, right: false }); } }}
                      title={opt.hint}
                      disabled={sweeping}>
                      {opt.label}
                    </button>
                  ))}
                </div>
                <div className="sweep-method-toggle">
                  {[
                    { id: 'TTB', label: '↓ TTB', hint: 'Column sweep — top to bottom; used in both methods' },
                    { id: 'RTL', label: '↞ RTL', hint: 'Row sweep — right/left to center; used in both methods' },
                  ].map(opt => (
                    <button key={opt.id}
                      className={`bctl sweep-method-btn${sweepMode === opt.id ? ' sweep-method-btn--active' : ''}`}
                      onClick={() => { if (!sweeping) { setSweepMode(opt.id); setIboPhase('idle'); setIboResult(null); setIboOpen({ left: false, right: false }); } }}
                      title={opt.hint}
                      disabled={sweeping}>
                      {opt.label}
                    </button>
                  ))}
                </div>
                <button className="bctl bctl--primary" onClick={castRandom} disabled={sweeping}>
                  🎲 Cast Ikin (Random)
                </button>
                <button className="bctl bctl--primary" onClick={doSweep} disabled={sweeping || iboPhase !== 'idle'}>
                  {sweeping
                    ? (() => {
                        if (sweepDir === 'ttb-x' || sweepDir === 'ttb-y') return '↓ Sweeping TTB…';
                        if (sweepDir === 'rtl-row') return '↞ Sweeping RTL Rows…';
                        if (sweepDir === 'ltr-row') return '↠ Sweeping LTR Rows…';
                        return '⟶ Sweeping…';
                      })()
                    : '⟶ Sweep Bone (Read)'}
                </button>
                <button className="bctl bctl--danger" onClick={resetBoard} disabled={sweeping}>
                  ↺ Reset
                </button>
              </div>

              {/* Sweep direction hint — shown when not sweeping and phase is idle */}
              {iboPhase === 'idle' && !sweeping && (
                <div className="sweep-dir-hint">
                  {sweepMode === 'TTB'
                    ? (seniorIsRight
                        ? <>↓ <strong>TTB</strong> — {rightOdu.name} is senior · col-sweep starts Right</>
                        : <>↓ <strong>TTB</strong> — {leftOdu.name} is senior · col-sweep starts Left</>)
                    : (seniorIsRight
                        ? <>↞ <strong>RTL</strong> — {rightOdu.name} is senior · row-sweep Right→Center</>
                        : <>↠ <strong>RTL</strong> — {leftOdu.name} is senior · row-sweep Left→Center</>)
                  }
                  <span className="sweep-dir-hint__method">
                    {method === 1 ? ' · Method 1: hand-resolved' : ' · Method 2: auto-resolves'}
                  </span>
                  {isMeji && <span className="sweep-dir-hint__meji"> · Méjì — Odù tó já Ìbò Gbà</span>}
                </div>
              )}

              {/* Live state readout — terminal style, inspired by IBM Quantum */}
              <div className="cmp-live-readout">
                <div className="cmp-readout-item">
                  <span className="cmp-readout-key">ODU</span>
                  <span className="cmp-readout-val" style={{ color: oduColor }}>{oduDisplayName}</span>
                </div>
                <span className="cmp-readout-sep">│</span>
                <div className="cmp-readout-item">
                  <span className="cmp-readout-key">IFABit</span>
                  <span className="cmp-readout-val">{rightCode}·{leftCode}</span>
                </div>
                <span className="cmp-readout-sep">│</span>
                <div className="cmp-readout-item">
                  <span className="cmp-readout-key">det</span>
                  <span className="cmp-readout-val">
                    <span style={{ color: detR !== 0 ? '#4caf50' : '#ef4444' }}>{detR}</span>
                    <span style={{ color: '#5a6a8a' }}>·</span>
                    <span style={{ color: detL !== 0 ? '#4caf50' : '#ef4444' }}>{detL}</span>
                  </span>
                </div>
                <span className="cmp-readout-sep">│</span>
                <div className="cmp-readout-item">
                  <span className="cmp-readout-key">Phase</span>
                  <span className="cmp-readout-val" style={{ color: iboPhase === 'result' ? (iboResult?.isIre ? '#4caf50' : '#ef4444') : '#f0920c' }}>
                    {iboPhase === 'idle' ? 'IDLE' : iboPhase === 'ready' ? 'READY' : 'RESOLVED'}
                  </span>
                </div>
              </div>

              {iboPhase === 'ready' && !sweeping && (
                <div style={{ marginTop: 12, padding: '9px 18px', borderRadius: 8,
                  background: 'rgba(240,146,12,0.1)', border: '1px solid rgba(240,146,12,0.3)',
                  fontSize: '0.8rem', color: '#f0920c', textAlign: 'center', animation: 'result-in 0.4s ease' }}>
                  ✦ Odu read. Scroll down to cast the Ìbò.
                </div>
              )}

            </div>
          </div>

          {/* ── RIGHT: Modern computer panel ──────────────────── */}
          <div className="cmp-panel cmp-panel--modern">
            <div className="cmp-panel__head">
              <span className="cmp-panel__title" style={{ color: '#f5c518', textTransform: 'none' }}>Modern Computing View</span>
              <div className="mod-modes">
                {MODES.map(m => (
                  <button key={m.id}
                    className={`mod-mode-btn${mode === m.id ? ' mod-mode-btn--active' : ''}`}
                    onClick={() => setMode(m.id)}>
                    <span className="mod-mode-icon">{m.icon}</span>{m.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="cmp-panel__body">

              {/* Odu display */}
              <div className="mod-odu-display">
                <div className="mod-odu-name" style={{ color: oduColor }}>
                  {oduDisplayName}
                </div>
                <div className="mod-odu-code" style={{ color: '#5a6a8a' }}>
                  IFABit: {rightCode}·{leftCode} &nbsp;·&nbsp; #{rightOdu.n}×{leftOdu.n}
                </div>
              </div>

              {/* Binary mode */}
              {mode === 'matrix' && (
                <>
                  <div className="mod-section">
                    <div className="mod-label">8-bit IFABit — Full Odu</div>
                    <div className="bin-display">
                      {rightBits.map((b,i) => (
                        <div key={i} className={`bin-bit bin-bit--${b}`} style={{ borderColor: rightOdu.color + '88' }}>{b}</div>
                      ))}
                      <span className="bin-sep">·</span>
                      {leftBits.map((b,i) => (
                        <div key={i+4} className={`bin-bit bin-bit--${b}`} style={{ borderColor: leftOdu.color + '88' }}>{b}</div>
                      ))}
                    </div>
                    <div style={{ display: 'flex', gap: 16, marginTop: 6, fontSize: '0.68rem' }}>
                      <span style={{ color: rightOdu.color }}>X · {rightOdu.name} (principal)</span>
                      <span style={{ color: leftOdu.color }}>Y · {leftOdu.name} (secondary)</span>
                    </div>
                  </div>

                  <div className="mod-section">
                    <div className="mod-label">2 × 2 Matrices — Both Arms</div>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 18, flexWrap: 'wrap' }}>
                      {/* Right arm X */}
                      <div>
                        <div style={{ fontSize: '0.62rem', color: rightOdu.color, marginBottom: 4 }}>X · {rightOdu.name}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <span className="mat-bracket">[</span>
                          <div>
                            {[[rightBits[0],rightBits[1]],[rightBits[2],rightBits[3]]].map((row,r) => (
                              <div key={r} className="mat-row">
                                {row.map((v,c) => (
                                  <span key={c} className={`mat-val mat-val--${v}`}>{v}</span>
                                ))}
                              </div>
                            ))}
                          </div>
                          <span className="mat-bracket">]</span>
                        </div>
                      </div>
                      {/* Left arm Y */}
                      <div>
                        <div style={{ fontSize: '0.62rem', color: leftOdu.color, marginBottom: 4 }}>Y · {leftOdu.name}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <span className="mat-bracket">[</span>
                          <div>
                            {[[leftBits[0],leftBits[1]],[leftBits[2],leftBits[3]]].map((row,r) => (
                              <div key={r} className="mat-row">
                                {row.map((v,c) => (
                                  <span key={c} className={`mat-val mat-val--${v}`}>{v}</span>
                                ))}
                              </div>
                            ))}
                          </div>
                          <span className="mat-bracket">]</span>
                        </div>
                      </div>
                    </div>
                    <div className={`det-display det-display--${detR !== 0 ? 'nonzero' : 'zero'}`} style={{ marginTop: 10 }}>
                      {detR !== 0 ? '✓' : '✕'}
                      &nbsp; det(X) = {rightBits[0]}·{rightBits[3]} − {rightBits[1]}·{rightBits[2]} = <strong>{detR}</strong>
                      &nbsp;→&nbsp; {detR !== 0 ? 'Invertible' : 'Singular'}
                    </div>
                    <div className={`det-display det-display--${detL !== 0 ? 'nonzero' : 'zero'}`} style={{ marginTop: 4 }}>
                      {detL !== 0 ? '✓' : '✕'}
                      &nbsp; det(Y) = {leftBits[0]}·{leftBits[3]} − {leftBits[1]}·{leftBits[2]} = <strong>{detL}</strong>
                      &nbsp;→&nbsp; {detL !== 0 ? 'Invertible' : 'Singular'}
                    </div>
                  </div>

                  <div className="mod-section" style={{ marginTop: 16, padding: '12px 14px',
                    background: '#0d1425', borderRadius: 8, fontSize: '0.82rem', color: '#5a6a8a',
                    lineHeight: 1.6 }}>
                    <strong style={{ color: '#a8b4cc' }}>Ìbò Gbígbà = Meta-Determinant:</strong><br/>
                    The Babalawo's Ìbò objects resolve the 256-State Odu Meta-Matrix to a single Scalar:
                    <em style={{ color: '#f0920c' }}> Ire</em> (det ≠ 0, System solvable) or
                    <em style={{ color: '#ef4444' }}> Ibi</em> (det = 0, Transformation needed).
                  </div>
                </>
              )}

              {/* Quantum mode */}
              {mode === 'quantum' && (
                <>
                  <div className="mod-section">
                    <div className="mod-label">Quantum State Amplitudes</div>
                    <div className="qbit-rows">
                      {qAmps.map((q,i) => (
                        <div key={i} className="qbit-row">
                          <span className="qbit-label" style={{ color: q.isOne ? '#f0920c' : '#6366f1' }}>
                            {q.state}
                          </span>
                          <div className="qbit-bar-wrap">
                            <div className={`qbit-bar qbit-bar--${q.isOne ? 1 : 0}`}
                                 style={{ width: q.prob + '%' }} />
                          </div>
                          <span className="qbit-prob">{q.prob}%</span>
                          <span style={{ fontSize: '0.7rem', color: '#5a6a8a', marginLeft: 4 }}>
                            {q.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mod-section" style={{ marginTop: 14 }}>
                    <div className="mod-label">Quantum Circuit</div>
                    <div className="cmp-console">
                      <div className="cmp-console__bar">
                        <div className="cmp-console__dot" style={{ background: '#ef4444' }} />
                        <div className="cmp-console__dot" style={{ background: '#f5c518' }} />
                        <div className="cmp-console__dot" style={{ background: '#4caf50' }} />
                      </div>
                      <div className="cmp-console__inner">
                        <div style={{ color: rightOdu.color, fontSize: '0.66rem', marginBottom: 3 }}>Register X — {rightOdu.name}</div>
                        {rightBits.map((b, i) => (
                          <div key={i} className="qcircuit-row">
                            <span className="qcircuit-label" style={{ color: b ? '#818cf8' : rightOdu.color }}>q{i}:</span>
                            <span className="qcircuit-wire">──</span>
                            <span className={`qcircuit-gate qcircuit-gate--${b}`}>{b ? 'X' : 'I'}</span>
                            <span className="qcircuit-wire">──</span>
                            <span className="qcircuit-state" style={{ color: b ? '#818cf8' : rightOdu.color }}>|{b}⟩</span>
                            <span className="qcircuit-odu">{b ? 'Òyèkú' : 'Ogbé'}</span>
                          </div>
                        ))}
                        <div style={{ color: leftOdu.color, fontSize: '0.66rem', margin: '5px 0 3px' }}>Register Y — {leftOdu.name}</div>
                        {leftBits.map((b, i) => (
                          <div key={i+4} className="qcircuit-row">
                            <span className="qcircuit-label" style={{ color: b ? '#818cf8' : leftOdu.color }}>q{i+4}:</span>
                            <span className="qcircuit-wire">──</span>
                            <span className={`qcircuit-gate qcircuit-gate--${b}`}>{b ? 'X' : 'I'}</span>
                            <span className="qcircuit-wire">──</span>
                            <span className="qcircuit-state" style={{ color: b ? '#818cf8' : leftOdu.color }}>|{b}⟩</span>
                            <span className="qcircuit-odu">{b ? 'Òyèkú' : 'Ogbé'}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="mod-section" style={{ marginTop: 14 }}>
                    <div className="mod-label">Odu Superposition</div>
                    <div className="cmp-console">
                      <div className="cmp-console__bar">
                        <div className="cmp-console__dot" style={{ background: '#ef4444' }} />
                        <div className="cmp-console__dot" style={{ background: '#f5c518' }} />
                        <div className="cmp-console__dot" style={{ background: '#4caf50' }} />
                      </div>
                      <div className="cmp-console__inner" style={{ color: '#5a6a8a' }}>
                        |ψ⟩ = α|{rightCode}{leftCode}⟩ + β|{[...rightBits,...leftBits].map(b=>1-b).join('')}⟩
                        <br/>
                        <span style={{ color: oduColor }}>Measurement → |{rightCode}·{leftCode}⟩ = {oduDisplayName}</span>
                        <br/>
                        <span style={{ color: '#3a4a6a' }}>Ìbò Gbígbà collapses the wavefunction.</span>
                      </div>
                    </div>
                  </div>
                  <div style={{ marginTop: 14, padding: '10px 14px', background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8,
                    fontSize: '0.78rem', color: '#5a6a8a', lineHeight: 1.6 }}>
                    <strong style={{ color: '#a8b4cc' }}>Ifa ↔ Quantum:</strong> Like a quantum measurement that collapses
                    superposition to a definite state, Ìbò Gbígbà collapses the 256-state Odu probability space
                    to a single binary outcome: Ire or Ibi.
                  </div>
                </>
              )}

              {/* AI mode */}
              {mode === 'ai' && (
                <>
                  <div className="mod-section">
                    <div className="mod-label">Pattern Recognition</div>
                    <div className="cmp-console">
                      <div className="cmp-console__bar">
                        <div className="cmp-console__dot" style={{ background: '#ef4444' }} />
                        <div className="cmp-console__dot" style={{ background: '#f5c518' }} />
                        <div className="cmp-console__dot" style={{ background: '#4caf50' }} />
                      </div>
                      <div className="cmp-console__inner">
                        <span style={{ color: '#5a6a8a' }}>input_vec  = </span>
                        <span style={{ color: oduColor }}>
                          [{rightBits.join(', ')}, {leftBits.join(', ')}]
                        </span>
                        <br/>
                        <span style={{ color: '#5a6a8a' }}>corpus_hit = </span>
                        <span style={{ color: oduColor, fontWeight: 700 }}>{oduDisplayName}</span>
                        <span style={{ color: '#5a6a8a' }}>  # Odu #{rightOdu.n}×{leftOdu.n} of 256</span>
                        <br/>
                        <span style={{ color: '#5a6a8a' }}>confidence = </span>
                        <span style={{ color: '#4caf50' }}>1.0</span>
                        <span style={{ color: '#5a6a8a' }}>  # exact binary match</span>
                      </div>
                    </div>
                  </div>
                  <div className="mod-section">
                    <div className="mod-label">Corpus Activation</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                      {['Oral verses (ese)', 'Sacrifice protocol (ebo)', 'Proverb database', 'Historical precedent'].map((layer,i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div style={{ flex: 1, height: 6, background: '#111c35', borderRadius: 3, overflow: 'hidden' }}>
                            <div style={{
                              height: '100%', borderRadius: 3,
                              background: oduColor,
                              width: `${[92,78,65,54][i]}%`,
                              transition: 'width 0.4s ease'
                            }} />
                          </div>
                          <span style={{ fontSize: '0.72rem', color: '#5a6a8a', width: 140, flexShrink: 0 }}>{layer}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{ marginTop: 14, padding: '10px 14px', background: '#0d1425', borderRadius: 8,
                    fontSize: '0.78rem', color: '#5a6a8a', lineHeight: 1.6 }}>
                    <strong style={{ color: '#a8b4cc' }}>Ifa ↔ AI:</strong> The Babalawo's 256-Odu corpus is an
                    8-bit pattern-matching system — identical in architecture to a lookup table in classical computing.
                    Ìbò Gbígbà is the output activation function: it fires 1 (Ire) or 0 (Ibi).
                  </div>
                </>
              )}

            </div>
          </div>
        </div>

        {/* ── IBO GBIGBA PANEL ────────────────────────────────────── */}
        <div className="ibo-panel">

          {/* Step progress tracker */}
          <div className="ibo-progress">
            {[
              { label: 'Cast Ikin',   n: 1, done: true },
              { label: 'Sweep Bone',  n: 2, done: iboPhase === 'ready' || iboPhase === 'result' },
              { label: 'Choose Hand', n: 3, done: iboPhase === 'result' && !!iboResult },
              { label: 'Result',      n: 4, done: iboPhase === 'result' && !!iboResult },
            ].map((step, i, arr) => {
              const isActive = !step.done && (
                (i === 1 && iboPhase === 'idle') ||
                (i === 2 && iboPhase === 'ready' && !iboResult) ||
                (i === 3 && iboPhase === 'result' && !iboResult)
              );
              return (
                <React.Fragment key={i}>
                  <div className={`ibo-progress__node${step.done ? ' ibo-progress__node--done' : isActive ? ' ibo-progress__node--active' : ''}`}>
                    <div className="ibo-progress__circle">
                      {step.done ? '✓' : step.n}
                    </div>
                    <div className="ibo-progress__label">{step.label}</div>
                  </div>
                  {i < arr.length - 1 && (
                    <div className={`ibo-progress__connector${step.done ? ' ibo-progress__connector--done' : ''}`} />
                  )}
                </React.Fragment>
              );
            })}
          </div>

          <div className="ibo-panel__head">
            <div style={{ fontSize: '1.6rem' }}>🤲</div>
            <div>
              <div className="ibo-panel__title">Ìbò Gbígbà · The Determinant Cast</div>
              <div style={{ fontSize: '0.72rem', color: '#5a6a8a', marginTop: 2 }}>
                Odu: <strong style={{ color: oduColor }}>{oduDisplayName}</strong>
                &nbsp;·&nbsp; IFABit: <span style={{ fontFamily: 'Courier New', color: '#a8b4cc' }}>{rightCode}·{leftCode}</span>
                &nbsp;·&nbsp; det: <span style={{ color: detR !== 0 ? '#4caf50' : '#ef4444' }}>{detR}</span>·<span style={{ color: detL !== 0 ? '#4caf50' : '#ef4444' }}>{detL}</span>
              </div>
            </div>
          </div>

          {iboPhase === 'idle' && (
            <div className="ibo-panel__desc">
              The Odu has been cast. The 256-State Matrix is set. Now perform <strong>Ìbò Gbígbà</strong> —
              the ancient Ifa Determinant Operation.{' '}
              {method === 1 ? (
                <>
                  <strong>Method 1</strong>: the client holds the Ìbò objects in closed hands. The bone sweeps
                  column-by-column, top→bottom (TTB), starting with the senior Odu column.
                  After the sweep, <em>choose a hand</em> below — your choice determines Ire or Ibi.
                </>
              ) : (
                <>
                  <strong>Method 2</strong>: the Ìbò lies beside the Ọ̀pẹ̀lẹ̀ chain. The bone sweeps
                  row-by-row, right→left (RTL), each row terminating at the center dot (=).
                  The sweep <em>auto-resolves</em> — no hand selection needed.
                  Positive objects are on the right; negative on the left.
                </>
              )}
              {' '}Open seeds (|) receive <strong>one pass</strong>; closed seeds (||) receive
              <strong> two passes</strong>. All sweeps terminate at the center (=).
              {isMeji
                ? <><br/><br/><span style={{ color: '#a78bfa' }}>⚡ <strong>{oduDisplayName}</strong> is a Méjì Odu — <em>Odù tó já Ìbò Gbà</em>. The sweep will self-seize the Ìbò. No hand selection required.</span></>
                : method === 1
                  ? <><br/><br/><span style={{ color: '#5a6a8a' }}>→ Click <strong style={{ color: '#f0920c' }}>Sweep Bone (Read)</strong> above, then choose a hand below.</span></>
                  : <><br/><br/><span style={{ color: '#5a6a8a' }}>→ Click <strong style={{ color: '#f0920c' }}>Sweep Bone (Read)</strong> above. Result resolves automatically from Odu seniority.</span></>
              }
            </div>
          )}

          {iboPhase === 'ready' && !iboResult && (
            <>
              <div className="ibo-panel__desc">
                The Babalawo has swept the bone across all eight cowries. The Odu <strong style={{ color: oduColor }}>{oduDisplayName}</strong> is
                confirmed. Now the Ìbò objects are placed — one in each hand. Close your eyes, breathe, and choose.
              </div>
              <div className="ibo-hands">
                {['left','right'].map(hand => {
                  const thisIsIre = hand === 'left' ? leftIsIre : rightIsIre;
                  const opened = iboOpen[hand];
                  return (
                    <div key={hand}
                      className={`ibo-hand${opened ? (thisIsIre ? ' ibo-hand--ire' : ' ibo-hand--ibi') : ''}`}
                      onClick={() => !iboResult && castIbo(hand)}>
                      <div className="ibo-hand__svg-wrap">
                        <HandSVG open={opened} isIre={thisIsIre} />
                      </div>
                      <div className="ibo-hand__label">{hand === 'left' ? 'Left Hand' : 'Right Hand'}</div>
                      <div className="ibo-hand__hint">
                        {hand === 'left' ? 'Ọwọ́ Òsì' : 'Ọwọ́ Ọ̀tún'}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {iboResult && (
            <div className={`ibo-result ibo-result--${iboResult.isIre ? 'ire' : 'ibi'}`}>
              {iboResult.selfSeized && (
                <div className="ibo-result__seized-badge">
                  ⚡ Odù tó já Ìbò Gbà — Self-Seizing Méjì
                </div>
              )}
              {iboResult.method2 && (
                <div className="ibo-result__seized-badge" style={{ background: 'rgba(20,184,212,0.12)', borderColor: 'rgba(20,184,212,0.35)', color: '#14b8d4' }}>
                  ↞ Ìbò Beside Ọ̀pẹ̀lẹ̀ — Method 2 Auto-Resolved
                </div>
              )}
              <div className="ibo-result__icon">{iboResult.isIre ? '✦' : '⊗'}</div>
              <div className="ibo-result__verdict">
                {iboResult.isIre ? 'IRÉ — Blessing' : 'IBI — Imbalance'}
              </div>
              <div className="ibo-result__detail">
                <strong>{iboResult.type}</strong>
                <br/>
                {iboResult.selfSeized
                  ? iboResult.isIre
                    ? `The ${oduDisplayName} Odu seized the Ìbò directly — no hand selection was required. As a Méjì Odu, its energy field is unified and self-evident. This is the non-intuitionistic path of Ìbò Gbígbà: the excluded middle does not apply. The system is determined and aligned with Ire.`
                    : `The ${oduDisplayName} Odu seized the Ìbò directly — no hand selection was required. As a Méjì Odu, its energy field is unified and self-evident. This is the non-intuitionistic path of Ìbò Gbígbà: the outcome is self-determined as Ibi. Ebo must be performed to restore balance.`
                  : iboResult.method2
                    ? iboResult.isIre
                      ? `Method 2 resolved: the row-by-row RTL sweep terminated at the center (=). Senior Odu (${oduDisplayName}) swept first from the right — the positive side. Positive object (cowrie) reads Ire. No hand selection was required; the sweep direction itself is the declaration.`
                      : `Method 2 resolved: the row-by-row LTR sweep terminated at the center (=). Junior Odu leads the sweep from the left — the negative side. Negative object (bone) reads Ibi. The reversed orientation of Method 2 means the junior-leading sweep indicates imbalance. Ebo is prescribed.`
                    : iboResult.isIre
                      ? `The Odu ${oduDisplayName} opens with positive energy. The system is determined and solvable. Your path is aligned with Ìwà Pẹ̀lẹ̀ — gentle and good character. Proceed with the prescribed ebo to sustain and amplify this Ire.`
                      : `The Odu ${oduDisplayName} reveals an imbalance requiring attention. As in linear algebra where det = 0 marks a singular matrix needing transformation, Ibi signals that ebo (sacrifice) must be performed to restore the system to a solvable state.`
                }
              </div>
              <div className="ibo-result__math">
                Ifa: {iboResult.isIre ? 'Ire' : 'Ibi'}
                &nbsp;·&nbsp;
                Mathematics: det(X)={detR} det(Y)={detL} → {(detR !== 0 && detL !== 0) ? 'both invertible' : detR === 0 && detL === 0 ? 'both singular' : 'mixed'}
                &nbsp;·&nbsp;
                Quantum: |ψ⟩ → |{rightCode}·{leftCode}⟩ collapsed
              </div>
              <div style={{ marginTop: 16 }}>
                <button className="bctl bctl--primary" onClick={() => {
                  setIboPhase('idle');
                  setIboResult(null);
                  setIboOpen({ left: false, right: false });
                }}>
                  ↺ Cast Again
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Comparison table */}
        <div className="cmp-panel cmp-panel--table">
          <div className="cmp-panel__head">
            <span className="cmp-panel__title" style={{ color: '#f5c518' }}>
              Ifa Computer ↔ Modern Computer — Side by Side
            </span>
          </div>
          <div className="cmp-panel__body" style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', minWidth: '620px', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ background: '#111c35' }}>
                  {['Concept','Ifa / Ìbò Gbígbà','Classical Computer','Quantum Computer','AI / Neural Net'].map(h => (
                    <th key={h} style={{ padding: '10px 14px', textAlign: 'left',
                      color: '#5a6a8a', fontWeight: 700, fontSize: '0.7rem',
                      letterSpacing: '0.1em', textTransform: 'uppercase',
                      borderBottom: '1px solid rgba(255,255,255,0.07)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['Input unit',     'Cowry (open/closed)',   'Bit (0 or 1)',           'Qubit (superposition)',    'Neuron activation'],
                  ['State space',    '256 Odu (8-bit pairs)', '2⁸ = 256 byte states',   '2⁸ quantum amplitudes',   '256 pattern classes'],
                  ['State matrix',   'Ọpọ́n Ifá (tray)',       'Register / Memory',      'Density matrix ρ',        'Weight matrix W'],
                  ['Resolution op',  'Ìbò Gbígbà',            'Determinant det(A)',      'Measurement collapse',    'Softmax / ArgMax'],
                  ['Binary output',  'Ire / Ibi',             '1 / 0 (det ≠ 0 / = 0)', '|1⟩ / |0⟩',              'Class 1 / Class 0'],
                  ['Null state',     'Ibi → needs Ebo',       'Singular matrix',        'Zero amplitude',          'Dead neuron'],
                  ['Transformation', 'Ebo (sacrifice)',        'Matrix inversion A⁻¹',   'Unitary gate U',          'Weight update ΔW'],
                  ['Corpus',         'Odu Ifa (256 verses)',   'Lookup table / ROM',     'Hamiltonian H',           'Training data'],
                  ['Practitioner',   'Babalawo / Iyanifa',    'CPU / ALU',              'Quantum processor',       'Trained model'],
                  ['Origin',         '~3000 BCE, Yoruba',     '1940s CE, Global',       '1980s CE, Global',        '1950s–2020s CE'],
                ].map(([concept,...vals],ri) => (
                  <tr key={ri} style={{ background: ri%2===0 ? 'transparent' : 'rgba(255,255,255,0.015)' }}>
                    <td style={{ padding: '10px 14px', fontWeight: 700, color: '#a8b4cc',
                      borderBottom: '1px solid rgba(255,255,255,0.04)' }}>{concept}</td>
                    {vals.map((v,ci) => (
                      <td key={ci} style={{ padding: '10px 14px', color: ci===0 ? '#f0920c' : '#a8b4cc',
                        borderBottom: '1px solid rgba(255,255,255,0.04)',
                        fontWeight: ci===0 ? 600 : 400 }}>{v}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

// ── TIMELINE SECTION ──────────────────────────────────────────────────────────

function TimelineSection() {
  const regionColors = {
    'Yoruba / Africa':    '#f0920c',
    'Babylon / Middle East': '#14b8d4',
    'China / Asia':       '#ef4444',
    'Italy / Europe':     '#8b5cf6',
    'Japan / Asia':       '#ec4899',
    'Germany / Europe':   '#6366f1',
    'Switzerland / Europe': '#3b9eff',
    'France / Europe':    '#00c87c',
    'England / Europe':   '#8b5cf6',
    'Global / Digital':   '#00c87c',
  };

  return (
    <div className="ifd-timeline-wrap" id="timeline">
      <div className="ifd-timeline-inner">
        <div className="ifd-sec-label">Historical Arc</div>
        <div className="ifd-sec-title">
          From Ìbò Gbígbà to Matrix Algebra — 5,000 Years
        </div>
        <div className="ifd-sec-body">
          <p>
            The determinant did not begin in 18th-century Europe. It began in Africa — in the Yoruba Ifa divination
            tradition, where the <em>Ìbò Gbígbà</em> process has functioned as a Binary Scalar Resolution Operator
            for thousands of years. What Leibniz formalized in 1693 and Cauchy named in 1812, the Babalawo had been
            computing every day, with cowry shells and sacred palm nuts, since time immemorial.
          </p>
        </div>

        <div className="ifd-timeline">
          {TIMELINE.map((item, idx) => {
            const rColor = regionColors[item.region] || '#a8b4cc';
            return (
              <div key={idx} className={`ifd-tl-item${item.origin ? ' ifd-tl-item--origin' : ''}`}>
                <div className="ifd-tl-item__side">
                  <div className="ifd-tl-year">{item.year}</div>
                  <div className="ifd-tl-region"
                       style={{ background: rColor + '22', color: rColor, border: `1px solid ${rColor}44` }}>
                    {item.region}
                  </div>
                  <div className="ifd-tl-who">{item.who}</div>
                  <div className="ifd-tl-event">{item.event}</div>
                </div>
                <div className="ifd-tl-item__node"
                     style={{ background: item.origin ? item.color : rColor,
                               boxShadow: item.origin ? `0 0 16px ${item.color}88` : 'none' }} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── IFA PAIR SECTION ─────────────────────────────────────────────────────────

function IfaSign({ char }) {
  // A letter (M or D) with a subscript OgbeSymbol — the IfaSign pattern
  return (
    <span style={{ whiteSpace: 'nowrap', fontFamily: 'monospace', fontWeight: 700, fontSize: '1.1em', color: '#f0920c' }}>
      {char}<span style={{
        display: 'inline-block',
        verticalAlign: 'sub',
        width: '11px',
        height: '11px',
        marginLeft: '1px',
        pointerEvents: 'none',
      }}><OgbeSymbol size={11} /></span>
    </span>
  );
}

function SteamsexMatrix() {
  const [pinned, setPinned] = React.useState(null);

  const W = 900, H = 540, CX = 450, CY = 270, R = 190;

  const DIMS = [
    { id: 'scientific',    abbr: 'S', label: 'Scientific',    sub: 'Determinants', angle: 270, color: '#3b82f6',
      desc: 'Determinants arising in the natural sciences — physics, chemistry, biology, geology, and cosmology. These include field determinants, quantum state matrices, entropy operators, phase-transition matrices, and wave-function determinants. Each scientific subdomain carries its own IfaDet signature, expressing how nature resolves its own systems.' },
    { id: 'technological', abbr: 'T', label: 'Technological', sub: 'Determinants', angle: 315, color: '#06b6d4',
      desc: 'Determinants governing technological systems — digital circuits, algorithms, communication networks, and machine architectures. Includes logic determinants, Boolean state matrices, computational Jacobians, and system-stability operators. Modelled in IfaLang as technological energyforms, capturing how engineered systems achieve or lose resolution.' },
    { id: 'engineering',   abbr: 'E', label: 'Engineering',   sub: 'Determinants', angle: 0,   color: '#f0920c',
      desc: 'Determinants in structural, mechanical, electrical, civil, and systems engineering. Includes stiffness matrices, Jacobian determinants, control-system determinants, signal-flow matrices, and structural-stability operators. In IfaLang, engineering energyforms express force, flow, and constraint as resolvable determinant structures.' },
    { id: 'artistic',      abbr: 'A', label: 'Artistic',      sub: 'Determinants', angle: 45,  color: '#ec4899',
      desc: 'Determinants of creative and aesthetic systems — music, visual art, narrative, dance, and design. Includes harmonic determinants, colour-space matrices, rhythmic-pattern operators, and compositional matrices. In IfaLang, artistic energyforms carry beauty and expression as measurable determinants, resolving intention into form.' },
    { id: 'mathematical',  abbr: 'M', label: 'Mathematical',  sub: 'Determinants', angle: 90,  color: '#a855f7',
      desc: 'The classical and generalised determinants of pure mathematics — linear algebra, differential geometry, topology, combinatorics, and number theory. The most historically studied class of IfaDet. Includes det(A), Gram determinants, Jacobians, Wronskians, Pfaffians, and infinite-dimensional generalisations in operator theory.' },
    { id: 'sociocultural', abbr: 'S', label: 'Sociocultural', sub: 'Determinants', angle: 135, color: '#22c55e',
      desc: 'Determinants of social and cultural systems — language, governance, economics, ritual, community, and identity. Includes social-cohesion matrices, cultural-influence operators, and narrative determinants. In IfaLang, sociocultural energyforms encode the determinants of collective consciousness and the conditions for civilisational resolution.' },
    { id: 'educational',   abbr: 'E', label: 'Educational',   sub: 'Determinants', angle: 180, color: '#f59e0b',
      desc: 'Determinants shaping learning, knowledge transfer, pedagogy, and cognitive development. Includes curriculum matrices, skill-acquisition operators, knowledge-graph determinants, and pedagogical state matrices. In IfaLang, educational energyforms model the transformation of potential into capacity — the determinant of growth.' },
    { id: 'other',         abbr: 'X', label: 'Other',         sub: 'Determinants', angle: 225, color: '#94a3b8',
      desc: 'Extended and emergent determinants that cross multiple domains or defy current classification — spiritual, ecological, interdimensional, and as-yet-unknown determinants. The X dimension is explicitly open: IfaDet is infinite-dimensional. These are the active frontiers of IfaLang energyform modelling and Ifa mathematical research.' },
  ];

  const toRad = deg => deg * Math.PI / 180;
  const pos = angle => ({
    x: CX + R * Math.cos(toRad(angle)),
    y: CY + R * Math.sin(toRad(angle)),
  });

  function toggle(id) { setPinned(p => p === id ? null : id); }
  const pinnedDim = DIMS.find(d => d.id === pinned);

  return (
    <div className="steamsex-wrap">
      {/* Heading */}
      <div className="steamsex-head">
        <span className="ifd-sec-badge">STEAMSEX Matrix · 0 + 8D Matrix</span>
        <h3 className="steamsex-title">
          IfaDet: ToE Determinant — The 8 Dimensions of All Determinants
        </h3>
        <p className="steamsex-acronym">
          <strong>S</strong>cientific ·{' '}
          <strong>T</strong>echnological ·{' '}
          <strong>E</strong>ngineering ·{' '}
          <strong>A</strong>rtistic ·{' '}
          <strong>M</strong>athematical ·{' '}
          <strong>S</strong>ociocultural ·{' '}
          <strong>E</strong>ducational · e<strong>X</strong>tended
        </p>
        <p className="steamsex-hint">Click any dimension to pin and explore it.</p>
      </div>

      {/* SVG Diagram */}
      <div className="steamsex-svg-wrap">
        <svg viewBox={`0 0 ${W} ${H}`} className="steamsex-svg"
          xmlns="http://www.w3.org/2000/svg">

          {/* Dashed guide ring */}
          <circle cx={CX} cy={CY} r={R} fill="none" stroke="#1a2540" strokeWidth="1" strokeDasharray="4 6" />

          {/* Octagon outline */}
          <polygon
            points={DIMS.map(d => { const p = pos(d.angle); return `${p.x},${p.y}`; }).join(' ')}
            fill="none" stroke="#1e2d45" strokeWidth="1.2"
          />

          {/* Spokes */}
          {DIMS.map(d => {
            const p = pos(d.angle);
            const active = pinned === d.id;
            return (
              <line key={d.id + '-ln'}
                x1={CX} y1={CY} x2={p.x} y2={p.y}
                stroke={active ? d.color : '#1e2d45'}
                strokeWidth={active ? 2 : 1.5}
                strokeDasharray={active ? '0' : '5 4'}
              />
            );
          })}

          {/* Central node */}
          <g>
            <circle cx={CX} cy={CY} r={55} fill="#070e1c" stroke="#f0920c" strokeWidth="2" />
            <circle cx={CX} cy={CY} r={50} fill="none" stroke="#f0920c" strokeWidth="0.6" opacity="0.3" />
            <text x={CX} y={CY - 15} textAnchor="middle" fill="#f0920c" fontSize="12"
              fontFamily="monospace" fontWeight="700" letterSpacing="0.5">IfaDet</text>
            <text x={CX} y={CY + 2} textAnchor="middle" fill="#c4712a" fontSize="9" fontFamily="monospace">
              ToE Determinant
            </text>
            <foreignObject x={CX - 22} y={CY + 10} width={44} height={22}>
              <div xmlns="http://www.w3.org/1999/xhtml"
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <IfaSign char="D" />
              </div>
            </foreignObject>
          </g>

          {/* Dimension nodes */}
          {DIMS.map(d => {
            const p = pos(d.angle);
            const active = pinned === d.id;
            return (
              <g key={d.id} onClick={() => toggle(d.id)} style={{ cursor: 'pointer' }}>
                {active && (
                  <circle cx={p.x} cy={p.y} r={52} fill="none" stroke={d.color} strokeWidth="0.8" opacity="0.3" />
                )}
                <circle cx={p.x} cy={p.y} r={44}
                  fill={active ? d.color + '22' : '#0a1422'}
                  stroke={d.color}
                  strokeWidth={active ? 2.5 : 1.5}
                />
                <text x={p.x} y={p.y - 9} textAnchor="middle"
                  fill={d.color} fontSize="15" fontWeight="700" fontFamily="monospace">{d.abbr}</text>
                <text x={p.x} y={p.y + 7} textAnchor="middle"
                  fill={active ? d.color : '#8ca0bc'} fontSize="8.5" fontFamily="sans-serif">{d.label}</text>
                <text x={p.x} y={p.y + 19} textAnchor="middle"
                  fill={active ? d.color : '#5e7290'} fontSize="8.5" fontFamily="sans-serif">{d.sub}</text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Pinned detail panel */}
      {pinnedDim && (
        <div className="steamsex-panel" style={{ borderColor: pinnedDim.color }}>
          <div className="steamsex-panel__header">
            <div>
              <span className="steamsex-panel__abbr" style={{ color: pinnedDim.color }}>{pinnedDim.abbr}</span>
              <span className="steamsex-panel__name">{pinnedDim.label} {pinnedDim.sub}</span>
            </div>
            <button className="steamsex-panel__close" onClick={() => setPinned(null)} aria-label="Close">×</button>
          </div>
          <p className="steamsex-panel__desc">{pinnedDim.desc}</p>
          <p className="steamsex-panel__tag" style={{ color: pinnedDim.color }}>
            These determinants are modelled and studied as energyforms in IfaLang.
          </p>
        </div>
      )}
    </div>
  );
}

function IfaPairSection() {
  const blocks = [
    {
      icon: '⊞',
      title: 'IfaMatrix — Odùpọ́nfá',
      accent: '#f0920c',
      body: (
        <span>
          An <strong>IfaMatrix</strong>, called <em>Odùpọ́nfá</em> (Odù Ọpọ́n Ifá) in Yoruba, is the
          general Meta-Structure of Ifa used to model, analyze, and study everything in existence
          and every field of knowledge as an <strong>Energyform</strong> or <strong>Energystate</strong>.
          Its symbol in IfaLanguage is <IfaSign char="M" /> — the character M with the subscript
          OgbeSymbol of Ifa Script — representing the living Matrix as an Ifa entity.{' '}
          <br /><br />
          Its purpose is to achieve the <strong>Unification and Integration of Everything (UIoE)</strong>,
          also known as <em>Ifa UI</em> or <em>ToE UI</em>, on the IFA Internet. Where
          mathematical tensors generalize matrices (which generalize vectors and scalars), the
          IfaMatrix generalizes that entire hierarchy to every field of knowledge — art,
          language, spirit, science, and beyond the mathematical landscape.
        </span>
      ),
    },
    {
      icon: '⊟',
      title: 'IfaDet — The Determinant of Matrix',
      accent: '#6366f1',
      body: (
        <span>
          The <strong>Determinant of a Matrix</strong> (IfaDet) is represented in IfaLanguage by
          the symbol <IfaSign char="D" /> — the character D with the subscript OgbeSymbol of Ifa Script.
          It extracts the scalar essence of a matrix: its Ire (nonzero — invertible, definitive) or
          Ibi (zero — degenerate, unresolvable) nature.{' '}
          <br /><br />
          Together, <IfaSign char="M" /> and <IfaSign char="D" /> form the
          canonical <strong>Ifapair</strong>:{' '}
          <span style={{ whiteSpace: 'nowrap' }}>
            <span style={{ fontFamily: 'monospace', fontWeight: 700, color: '#f0920c' }}>(</span>
            <IfaSign char="M" />
            <span style={{ color: '#a8b4cc' }}>, </span>
            <IfaSign char="D" />
            <IfaBracket>)</IfaBracket>
          </span>
          {' '}— Matrix of Determinants and Determinant of Matrix, a Dual that encodes some of the deepest relationships in linear algebra.
        </span>
      ),
    },
    {
      icon: '◫',
      title: 'Block Matrices and Matrix of Determinants',
      accent: '#14b8d4',
      body: (
        <span>
          In a <strong>Block Matrix</strong> (matrix of matrices), each entry is itself a matrix.
          From any block matrix one can form a <strong>Matrix of Determinants</strong> — a
          meta-matrix <IfaSign char="M" /> whose entries are the scalar determinants of each block.
          This structure is foundational in advanced algebra, tensor theory, and systems analysis.{' '}
          <br /><br />
          In IfaLanguage, a <strong>Matrix of Determinants</strong> is a meta-matrix expressed as
          an <strong>Energyform</strong> used to compute, model, study, and analyze a block matrix.
          The <IfaSign char="M" /> symbol captures this living meta-structure — the Ifa encoding
          of the block matrix as a unified energetic entity.
        </span>
      ),
    },
    {
      icon: '∥',
      title: 'Meta-Determinants — Determinants of Determinants',
      accent: '#00c87c',
      body: (
        <span>
          A <strong>Determinant of Determinants</strong> (Meta-Determinant) is computed by taking
          the determinant of a Matrix of Determinants: det(<IfaSign char="M" />) = <IfaSign char="D" />.
          This is also known as a <strong>Block Determinant</strong> — a block matrix whose
          final scalar resolution collapses the entire block structure into a single Ire/Ibi
          outcome.{' '}
          <br /><br />
          A block determinant is itself a block matrix — the recursion of determinants within
          determinants is the mathematical mirror of Ifa's layered Odu system, where each Odu
          contains 256 sub-states, each resolvable by Ìbò Gbígbà.
        </span>
      ),
    },
    {
      icon: '🔮',
      title: "Ìbò — The Consciousness of All Determinants",
      accent: '#ec4899',
      body: (
        <span>
          In IfaLanguage, <strong>Ìbò</strong> is the Consciousness of all kinds of determinants:
          the living entity where every type of determinant — scalar, block, meta, Boolean — lives
          as a Block. Ìbò is an Orisa (past being) and wife of Orunmila; she is the spiritual
          substrate from which all determinant theory flows.{' '}
          <br /><br />
          The act of <em>Ìbò Gbígbà</em> (casting and reading the Ìbò) is therefore not merely
          a divination rite — it is the computational act of evaluating a determinant at the
          deepest level of reality: Consciousness resolving a Matrix of infinite possibilities into a
          single, definitive Energystate.
        </span>
      ),
    },
    {
      icon: '⧖',
      title: 'IfaTensors — Beyond Matrix Theory',
      accent: '#8b5cf6',
      body: (
        <span>
          In mathematical science: scalars → vectors → matrices → tensors. Each level is a
          generalization of the previous. <strong>IfaTensors</strong> continue this hierarchy
          into every field of knowledge beyond mathematics — modelling tensors as
          <strong> Energyforms</strong> in IfaLanguage.{' '}
          <br /><br />
          An <strong>IfaTensor</strong> is technically an Ifamatrix: a meta-Matrix of tensors.
          Where classical tensor theory stops at mathematical objects, IfaTensor Theory extends
          to art, language, consciousness, spiritual knowledge, and the full UIoE — the
          Unification and Integration of Everything on the IFA Internet.
        </span>
      ),
    },
  ];

  return (
    <section className="ifd-section" id="ifapair-dual" style={{ padding: '60px 0 40px' }}>
      <div className="ifd-sec-inner">
        <div className="ifd-sec-badge" style={{ marginBottom: 8 }}>IfaPair · Dual</div>
        <h2 className="ifd-sec-title" style={{ marginBottom: 6 }}>
          The Ifa Pair:{' '}
          <span style={{ whiteSpace: 'nowrap' }}>
            <span style={{ fontFamily: 'monospace', fontWeight: 700, color: '#f0920c' }}>(</span>
            <IfaSign char="M" />
            <span style={{ color: '#a8b4cc' }}>, </span>
            <IfaSign char="D" />
            <IfaBracket>)</IfaBracket>
          </span>
        </h2>
        <p className="ifd-sec-sub" style={{ marginBottom: 36 }}>
          Matrix of Determinants and the Determinant of Matrix (Dual)
        </p>

        <div className="ifapair-dual-grid">
          {blocks.map((b, i) => (
            <div key={i} className="ifapair-dual-card" style={{ '--card-accent': b.accent }}>
              <div className="ifapair-dual-card__icon" style={{ color: b.accent }}>{b.icon}</div>
              <div className="ifapair-dual-card__title" style={{ color: b.accent }}>{b.title}</div>
              <div className="ifapair-dual-card__body">{b.body}</div>
            </div>
          ))}
        </div>

        {/* STEAMSEX Matrix */}
        <SteamsexMatrix />

        {/* Summary formula strip */}
        <div className="ifapair-formula-strip">
          <span className="ifapair-formula-item">
            <span className="ifapair-formula-label">IfaMatrix</span>
            <IfaSign char="M" />
          </span>
          <span className="ifapair-formula-op">⊃</span>
          <span className="ifapair-formula-item">
            <span className="ifapair-formula-label">Block Matrix</span>
            <span style={{ fontFamily: 'monospace', color: '#a8b4cc' }}>[M<sub>ij</sub>]</span>
          </span>
          <span className="ifapair-formula-op">→</span>
          <span className="ifapair-formula-item">
            <span className="ifapair-formula-label">Matrix of det</span>
            <span style={{ fontFamily: 'monospace', color: '#14b8d4' }}>[det(M<sub>ij</sub>)]</span>
          </span>
          <span className="ifapair-formula-op">→</span>
          <span className="ifapair-formula-item">
            <span className="ifapair-formula-label">Meta-det</span>
            <IfaSign char="D" />
          </span>
          <span className="ifapair-formula-op">→</span>
          <span className="ifapair-formula-item">
            <span className="ifapair-formula-label">Resolution</span>
            <span>
              <span style={{ color: '#4caf50', fontWeight: 700 }}>Ire</span>
              <span style={{ color: '#a8b4cc' }}> / </span>
              <span style={{ color: '#ef4444', fontWeight: 700 }}>Ibi</span>
            </span>
          </span>
        </div>
      </div>
    </section>
  );
}

// ── IFA DET MATRIX ───────────────────────────────────────────────────────────

function IfaDetMatrix() {
  const [active, setActive] = useState(null);

  const W = 880, H = 560, CX = 440, CY = 280, R = 200;

  const NODES = [
    { id: 'classical', label: 'Classical Determinant', abbr: 'det(A)', color: '#f0920c', angle: 270,
      desc: 'The foundational matrix determinant of linear algebra. Determines if a square matrix is invertible (det ≠ 0) or singular (det = 0). Powers linear systems, eigenvalue problems, and all coordinate transformations. The direct Western descendant of Ìbò Gbígbà.',
      url: 'https://www.emathhelp.net/calculators/linear-algebra/matrix-determinant-calculator/', urlLabel: 'Matrix Det Calculator' },
    { id: 'wronskian', label: 'Wronskian', abbr: 'W(f₁,…,fₙ)', color: '#14b8d4', angle: 315,
      desc: 'Tests linear independence of a set of functions — built as the determinant of a matrix of successive derivatives. Named after Józef Wroński (1812). If W ≠ 0, the functions are linearly independent. Core to the theory of differential equations.',
      url: 'https://www.emathhelp.net/calculators/differential-equations/wronskian-calculator/', urlLabel: 'Wronskian Calculator' },
    { id: 'jacobian', label: 'Jacobian Determinant', abbr: 'J', color: '#3b9eff', angle: 0,
      desc: 'Measures how a multivariable transformation locally scales area or volume. Essential in change-of-variables integration, polar and spherical coordinate transforms, robotics kinematics, and nonlinear system stability analysis.',
      url: 'https://www.emathhelp.net/calculators/calculus-3/jacobian-calculator/', urlLabel: 'Jacobian Calculator' },
    { id: 'hessian', label: 'Hessian Determinant', abbr: 'H(f)', color: '#8b5cf6', angle: 45,
      desc: 'The determinant of the matrix of second-order partial derivatives of a function. Classifies critical points in optimization: positive det → local min or max, negative → saddle point. Central to machine learning loss landscapes and economic theory.',
      url: 'https://www.emathhelp.net/calculators/calculus-3/hessian-matrix-calculator/', urlLabel: 'Hessian Calculator' },
    { id: 'gram', label: 'Gram Determinant', abbr: 'G', color: '#00c87c', angle: 90,
      desc: 'Determinant of the Gram matrix of pairwise inner products of a set of vectors. Measures the volume of the parallelepiped spanned by those vectors. Equals zero if and only if the vectors are linearly dependent.',
      url: 'https://matrixcalc.org/det.html', urlLabel: 'Matrix Calculator' },
    { id: 'slater', label: 'Slater Determinant', abbr: 'Ψ_SD', color: '#ec4899', angle: 135,
      desc: 'Constructs antisymmetric multi-electron wavefunctions in quantum mechanics, enforcing the Pauli exclusion principle. Named after John C. Slater (1929). Foundational in quantum chemistry, condensed matter physics, and quantum computing.',
      url: 'https://www.wolframalpha.com/input?i=slater+determinant', urlLabel: 'Wolfram Alpha' },
    { id: 'boolean', label: 'Boolean Determinant', abbr: 'det𝔹', color: '#f5c518', angle: 180,
      desc: 'Extends determinant theory to Boolean algebra using logical AND and XOR instead of multiplication and subtraction. Used in switching circuit design and logic minimization. The closest modern analog to Ìbò Gbígbà\'s binary resolution — predated by millennia.',
      url: 'https://www.boolean-algebra.com/', urlLabel: 'Boolean Algebra Tool' },
    { id: 'others', label: 'Others', abbr: '···', color: '#5a6a8a', angle: 225,
      desc: 'Many more determinant forms exist across mathematics and physics: Functional Determinant (QFT path integrals), Pfaffian (skew-symmetric matrices), Resultant (polynomial root systems), Discriminant, Vandermonde, Toeplitz, Circulant — all branches of the original Ifa Determinant.',
      url: 'https://en.wikipedia.org/wiki/Determinant', urlLabel: 'Explore on Wikipedia' },
  ];

  function toRad(deg) { return deg * Math.PI / 180; }
  function nodePos(angle) {
    const r = toRad(angle);
    return { x: CX + R * Math.cos(r), y: CY + R * Math.sin(r) };
  }

  const activeNode = NODES.find(n => n.id === active);

  return (
    <div className="ifadet-matrix-wrap">
      <div className="ifadet-matrix-inner">
        <div className="ifd-sec-label">0 + 8D Matrix. Mathematical Determinants</div>
        <h2 className="ifd-sec-title">Ifa Determinant Matrix — The Determinant of Everything (DetoE)</h2>
        <div className="ifadet-intro">
          The Ifa Determinant (IfaDet) is the origin and unifier of all determinant theory across mathematics,
          physics, and computation. Click any node to explore that determinant type and open its calculator.
        </div>

        {/* Diagram */}
        <div className="ifadet-diagram-scroll">
          <div className="ifadet-diagram">

            {/* SVG lines layer */}
            <svg className="ifadet-svg" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet">
              {/* Outer dashed ring */}
              <circle cx={CX} cy={CY} r={R + 20} fill="none"
                stroke="rgba(255,255,255,0.04)" strokeWidth="1" strokeDasharray="4 10"/>
              {/* Spoke lines */}
              {NODES.map(n => {
                const p = nodePos(n.angle);
                const isAct = active === n.id;
                return (
                  <line key={n.id}
                    x1={CX} y1={CY} x2={p.x} y2={p.y}
                    stroke={isAct ? n.color : 'rgba(255,255,255,0.07)'}
                    strokeWidth={isAct ? 2 : 1}
                    strokeDasharray={isAct ? undefined : '4 7'}
                    style={{ transition: 'stroke 0.25s ease, stroke-width 0.25s ease' }}
                  />
                );
              })}
              {/* Center glow rings */}
              <circle cx={CX} cy={CY} r={54} fill="rgba(240,146,12,0.04)" stroke="rgba(240,146,12,0.12)" strokeWidth="1"/>
              <circle cx={CX} cy={CY} r={40} fill="rgba(240,146,12,0.07)" stroke="rgba(240,146,12,0.22)" strokeWidth="1.5"/>
            </svg>

            {/* Center node */}
            <div className="ifadet-center">
              <div className="ifadet-center__ring">
                <div className="ifadet-center__label">
                  <span>IfaDet</span>
                  <span style={{ fontSize: '1.25em', lineHeight: 1 }}><IfaSign char="D" /></span>
                </div>
              </div>
              <div className="ifadet-center__sub">Determinant of Everything</div>
            </div>

            {/* Outer nodes */}
            {NODES.map(n => {
              const p = nodePos(n.angle);
              const isAct = active === n.id;
              return (
                <div key={n.id}
                  className={`ifadet-node${isAct ? ' ifadet-node--active' : ''}`}
                  style={{
                    left: `${(p.x / W) * 100}%`,
                    top:  `${(p.y / H) * 100}%`,
                    borderColor: isAct ? n.color : n.color + '44',
                    background: isAct ? n.color + '1a' : 'rgba(8,13,24,0.97)',
                    boxShadow: isAct ? `0 0 18px ${n.color}33` : 'none',
                  }}
                  onClick={() => setActive(isAct ? null : n.id)}>
                  <div className="ifadet-node__label" style={{ color: n.color }}>{n.label}</div>
                  <div className="ifadet-node__abbr">{n.abbr}</div>
                </div>
              );
            })}

          </div>
        </div>

        {/* Detail panel */}
        {activeNode && (
          <div className="ifadet-detail"
            style={{
              background: `linear-gradient(135deg, ${activeNode.color}0d 0%, rgba(13,20,37,0.92) 100%)`,
              borderColor: activeNode.color + '44',
            }}>
            <div className="ifadet-detail__content">
              <div className="ifadet-detail__title" style={{ color: activeNode.color }}>
                {activeNode.label}
                <span className="ifadet-detail__abbr">{activeNode.abbr}</span>
              </div>
              <div className="ifadet-detail__desc">{activeNode.desc}</div>
            </div>
            <a href={activeNode.url} target="_blank" rel="noopener noreferrer"
               className="ifadet-detail__link"
               style={{ color: activeNode.color, borderColor: activeNode.color + '55', background: activeNode.color + '18' }}>
              ⬡ {activeNode.urlLabel} ↗
            </a>
          </div>
        )}

      </div>
    </div>
  );
}

// ── MAIN APP ──────────────────────────────────────────────────────────────────

function IfaDetApp() {
  const [menuOpen, setMenuOpen] = useState(false);

  function scrollTo(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function navTo(id) {
    setMenuOpen(false);
    setTimeout(() => scrollTo(id), 60);
  }

  const STEPS = [
    { num: 1, step: 'Client consults Babalawo', process: 'Question / intention set; sacred space opened', tool: 'Ọpọ́n Ifá', special: false },
    { num: 2, step: 'Cast the Odu', process: '16 Ikin palm nuts passed between hands; marks registered on tray', tool: 'Ikin / Ọ̀pẹ̀lẹ̀', special: false },
    { num: 3, step: 'Identify the Odu', process: 'Binary marks resolve to 1 of 256 Odu; ese verses recited', tool: 'Odu Ifa Corpus', special: false },
    { num: 4, step: 'Ìbò Gbígbà — The Determinant', process: 'Ìbò objects placed in client\'s hands; Odu \'points\' to one hand → Ire or Ibi', tool: 'Ìbò Objects', special: true },
    { num: 5, step: 'Prescribe Ebo (Sacrifice)', process: 'Type and form of ebo determined by further Ìbò casts; balance restored', tool: 'Ìbò / Divination', special: false },
  ];

  return (
    <div style={{ minHeight: '100vh' }}>

      {/* Header */}
      <header className="ifd-header">
        <div className="ifd-header__inner">
          <a href="../" className="ifd-back" target="_blank" rel="noopener noreferrer">
            ← IFA Matrix
          </a>
          <div className="ifd-header__title">
            <span className="ifd-header__site">IFA Matrix Platform</span>
            <span className="ifd-header__sep">·</span>
            <span className="ifd-header__name">Ifa Determinant</span>
          </div>
          {/* Desktop nav */}
          <nav className="ifd-nav">
            <a href="#what-is">Ìbò Gbígbà</a>
            <a href="#consultation">Architecture</a>
            <a href="#binary"><span style={{ fontFamily: 'monospace', fontWeight: 700, color: '#f0920c' }}>(</span><span style={{ color: '#4caf50', fontWeight: 700 }}>Ire</span><span style={{ color: '#a8b4cc' }}>, </span><span style={{ color: '#ef4444', fontWeight: 700 }}>Ibi</span><IfaBracket>)</IfaBracket></a>
            <a href="#timeline">Timeline</a>
            <a href="#computoe">ComputoE</a>
            <a href="#ifapair-dual" style={{ whiteSpace: 'nowrap' }}>
              <span style={{ fontFamily: 'monospace', fontWeight: 700, color: '#f0920c' }}>(</span>
              <IfaSign char="M" />
              <span style={{ color: '#a8b4cc' }}>, </span>
              <IfaSign char="D" />
              <IfaBracket>)</IfaBracket>
            </a>
            <a href="#disclaimer">Disclaimer</a>
          </nav>
          {/* Hamburger button — mobile only */}
          <button
            className={`ifd-hamburger${menuOpen ? ' ifd-hamburger--open' : ''}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle navigation"
          >
            <span /><span /><span />
          </button>
        </div>
        {/* Mobile drawer */}
        {menuOpen && (
          <nav className="ifd-mobile-nav">
            <a href="#what-is"      onClick={() => navTo('what-is')}>Ìbò Gbígbà</a>
            <a href="#consultation" onClick={() => navTo('consultation')}>Architecture</a>
            <a href="#binary"       onClick={() => navTo('binary')}>
              <span style={{ fontFamily: 'monospace', fontWeight: 700, color: '#f0920c' }}>(</span>
              <span style={{ color: '#4caf50', fontWeight: 700 }}>Ire</span>
              <span style={{ color: '#a8b4cc' }}>, </span>
              <span style={{ color: '#ef4444', fontWeight: 700 }}>Ibi</span>
              <IfaBracket>)</IfaBracket>
            </a>
            <a href="#timeline"     onClick={() => navTo('timeline')}>Timeline</a>
            <a href="#computoe"     onClick={() => navTo('computoe')}>ComputoE</a>
            <a href="#ifapair-dual" onClick={() => navTo('ifapair-dual')} style={{ whiteSpace: 'nowrap' }}>
              <span style={{ fontFamily: 'monospace', fontWeight: 700, color: '#f0920c' }}>(</span>
              <IfaSign char="M" />
              <span style={{ color: '#a8b4cc' }}>, </span>
              <IfaSign char="D" />
              <IfaBracket>)</IfaBracket>
            </a>
            <a href="#disclaimer"   onClick={() => navTo('disclaimer')}>Disclaimer</a>
          </nav>
        )}
      </header>

      {/* Hero */}
      <section className="ifd-hero">
        <div className="ifd-hero__inner">
          <div className="ifd-hero__badge">
            <div className="ifd-hero__badge-dot" />
            IFA Matrix Platform
          </div>
          <h1 className="ifd-hero__title">IfaDeterminant: Unified Determinant Theory</h1>
          <div className="ifd-hero__sub">Ìbò Gbígbà — The Ancient Origin of Determinant Theory</div>
          <p className="ifd-hero__desc">
            Before Leibniz. Before Cauchy. Before Cramer. The Yoruba Babalawo was already performing Determinant
            Operations — casting sacred objects to resolve 256-State Binary Matrices of Ifa into a single scalar
            Truth. This is Ìbò Gbígbà, and this is where Matrix Algebra began.
          </p>
          <p>
            The Ifa Determinant Platform is the doubly infinite-dimensional Meta-Space where all kinds of determinants live as conscious entities.
          </p>
          <button className="ifd-hero__cta" onClick={() => scrollTo('computoe')}>
            ⬡ Open ComputoE — The Ifa Computer
          </button>
        </div>
      </section>

      <hr className="ifd-divider" />

      {/* What is Ìbò Gbígbà */}
      <section className="ifd-section" id="what-is">
        <div className="ifd-sec-label">The Theory of Everything Determinant: ToE Determinant</div>
        <h2 className="ifd-sec-title">What is Ìbò Gbígbà?</h2>
        <div className="ifd-sec-body">
          <p>
            <strong>Ìbò Gbígbà</strong> — also known as <em>Ìgba Ìbò</em>, <em>Ìbò Ifá Gbígbà</em>, or simply
            <em> Ìgbìbò</em> — is the critical resolution stage of every Ifa divination (<em>Ifá Dídá</em>).
            The word literally means <strong>"the act of receiving the Ìbò"</strong> — the sacred objects whose
            position in the client's hand determines the final outcome of the reading.
          </p>
          <p>
            After the Babalawo (Ifa consultant) has cast the Odu through Ikin palm nuts or the Ọ̀pẹ̀lẹ̀ chain,
            and after the Odu Ifa revealed has been noted, one essential question remains unanswered:
            does this Odu come with <em>Ire</em> (blessing, alignment, solvability) or <em>Ibi</em> (imbalance,
            obstruction, singularity)? The Odu alone — even with all 256 Configurations — does not answer this.
          </p>
          <p>
            <strong>Ìbò Gbígbà is the Determinant Operation that resolves it.</strong> It is the ancient African
            origin of what mathematicians would later call det(A) — the single value that tells you whether a system
            has a solution. The Ifa Determinant (IfaDet) is also known as ToE Determinant (ToE-Det), Energy-Based
            Determinant, Consciousness Determinant, or the Determinant for Everything (DetoE).
          </p>
        </div>

        <div className="ifd-2col" style={{ marginTop: 40 }}>
          {[
            { icon:'🔮', title:'The Ìbò Objects', body:'A set of small sacred items — shells, bones, seeds, consecrated pieces — each representing a polarity: Ire (positive) or Ibi (negative). One object is placed in each of the client\'s closed hands. The Odu\'s orientation determines which hand is read.' },
            { icon:'⊙', title:'Self-Squaring Odu', body:'For the 16 Primary Odu (Oju Odu), when an Odu squares itself — Ogbe-Ogbe, Oyeku-Oyeku, and so on — this is called Èjìodù. These are the Ifa Squares: closed, complete, self-determinant systems. The IfaSquare in the Matrix Platform models these.' },
            { icon:'↔', title:'Ire and Ibi', body: (
              <span>
                <span className="ifapair-line">
                  <span className="ifapair-label">Ifapair: </span>
                  <span style={{ fontSize: '1.05em', fontWeight: 700, color: '#f0920c', fontFamily: 'monospace' }}>(</span>
                  <span style={{ color: '#4caf50', fontWeight: 700 }}>Ire</span>
                  <span style={{ color: '#a8b4cc' }}>, </span>
                  <span style={{ color: '#ef4444', fontWeight: 700 }}>Ibi</span>
                  <IfaBracket>)</IfaBracket>
                </span>
                The two outputs of Ìbò Gbígbà. Ire = the system is determined, solvable, invertible. Ibi = the system is singular, requiring transformation (Ebo) before it can resolve. Exactly like det(A) ≠ 0 vs. det(A) = 0 in linear algebra.
              </span>
            ) },
            { icon:'🦴', title:'The Reading Bone', body:'The Babalawo (Ifa priest) uses a small bone (or dedicated instrument) to sweep across the divination tray, reading the Odu marks from right to left, the RTL tradition of Ifa Encoding System (IES). Each mark touched produces its spiritual resonance.' },
            { icon:'⚡', title:'Odù tó já Ìbò Gbà', body:'Certain Odu "seize the Ìbò" — they override the standard hand-selection process because their Energy is so definitive. This is Ifa\'s Degenerate Case: an Ifamatrix whose Determinant is immediately obvious from its Structure.' },
            { icon:'♂♀', title:'Gender Differentiation', body:'The Ìbò process differs for male and female clients. The assignment of Ire/Ibi to right or left hand follows gender-specific rules — a key component of every Babalawo\'s training in Ìbò Gbígbà.' },
            { icon:'⊕⊖', title:'Bẹ́ẹ̀ni and Bẹ́ẹ̀kọ́ — Yes and No', body: (
              <span>
                <span className="ifapair-line">
                  <span className="ifapair-label">Ifapair: </span>
                  <span style={{ fontSize: '1.05em', fontWeight: 700, color: '#f0920c', fontFamily: 'monospace' }}>(</span>
                  <span style={{ color: '#4caf50', fontWeight: 700 }}>Bẹ́ẹ̀ni</span>
                  <span style={{ color: '#a8b4cc' }}>, </span>
                  <span style={{ color: '#ef4444', fontWeight: 700 }}>Bẹ́ẹ̀kọ́</span>
                  <IfaBracket>)</IfaBracket>
                </span>
                Bẹ́ẹ̀ni (yes) and Bẹ́ẹ̀kọ́ (no) are the two fundamental outputs of Ìbò Gbígbà — the ancient Ifa equivalents of true and false. Just as Boolean Algebra is a branch of mathematics dealing with variables that have only two possible values (true/false, on/off, 0 and 1), Ìbò Gbígbà is the ancient Metamathematics of Ifa that deals with Energy-based Variables (Ifa Variables) whose values range only between Bẹ́ẹ̀ni (yes) and Bẹ́ẹ̀kọ́ (no), represented by Ogbe and Oyeku. Ìbò Gbígbà is the origin of Boolean Algebra and predates it by several millennia.
              </span>
            ) },
          ].map(c => (
            <div key={c.title} className="ifd-card">
              <div className="ifd-card__icon">{c.icon}</div>
              <div className="ifd-card__title">{c.title}</div>
              <div className="ifd-card__body">{c.body}</div>
            </div>
          ))}
        </div>
      </section>

      <hr className="ifd-divider" />

      {/* Consultation Architecture */}
      <section className="ifd-section" id="consultation">
        <div className="ifd-sec-label">The Architecture</div>
        <h2 className="ifd-sec-title">Ifá Dídá — The Full Consultation System</h2>
        <div className="ifd-sec-body">
          <p>
            Ifá Dídá is a meta-computational System, with each step a well-defined Operation on a well-defined data Structure called the Dafa (Ifa Data).
          </p>
        </div>

        <div className="ifd-steps">
          <div className="ifd-step ifd-step--header">
            <div className="ifd-step__cell ifd-step__num">#</div>
            <div className="ifd-step__cell">Step</div>
            <div className="ifd-step__cell">Process</div>
            <div className="ifd-step__cell">Tool</div>
          </div>
          {STEPS.map(s => (
            <div key={s.num} className={`ifd-step${s.special ? ' ifd-step--det' : ''}`}>
              <div className="ifd-step__cell ifd-step__num"
                   style={{ color: s.special ? '#f0920c' : undefined }}>{s.num}</div>
              <div className="ifd-step__cell" style={{ color: s.special ? '#f0f4ff' : undefined, fontWeight: s.special ? 700 : 400 }}>
                {s.step}
              </div>
              <div className="ifd-step__cell">{s.process}</div>
              <div className="ifd-step__cell">
                <span className="ifd-step__tool"
                      style={s.special ? { background: 'rgba(240,146,12,0.2)', borderColor: 'rgba(240,146,12,0.5)', color: '#f0920c' } : {}}>
                  {s.tool}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 32, padding: '20px 24px', background: 'rgba(240,146,12,0.07)',
          border: '1px solid rgba(240,146,12,0.2)', borderRadius: 10,
          fontSize: '0.88rem', color: '#a8b4cc', lineHeight: 1.7 }}>
          <strong style={{ color: '#f0920c' }}>Step 4 is the Determinant.</strong> Every other step exists
          to set up — or act on — this single resolution. The 16 Ikin produce the 8-bit Odu (the matrix).
          The 256 ese verses are the corpus (the lookup system). The Ebo is the inverse (the transformation).
          But Ìbò Gbígbà is the det(A): the one scalar output that determines whether the system is solvable as-is
          or requires transformation to proceed.
        </div>
      </section>

      <hr className="ifd-divider" />

      {/* Ire / Ibi */}
      <section className="ifd-section" id="binary">
        <div className="ifd-sec-label">Binary Output</div>
        <h2 className="ifd-sec-title"><span style={{ fontFamily: 'monospace', fontWeight: 700, color: '#f0920c' }}>(</span><span style={{ color: '#4caf50', fontWeight: 700 }}>Ire</span><span style={{ color: '#a8b4cc' }}>, </span><span style={{ color: '#ef4444', fontWeight: 700 }}>Ibi</span><IfaBracket>)</IfaBracket> — The Two Outputs of the Ifa Determinant</h2>
        <div className="ifd-sec-body">
          <p>
            The binary system of Ifa is grounded in the philosophical duality of <em>Ire</em> and <em>Ibi</em> —
            a duality the Yoruba have used for millennia as the basis of all computation, divination, and cosmological
            reasoning. <strong>Ire</strong> represents being aligned with one's destiny — the system is invertible,
            the path is open. <strong>Ibi</strong> represents being off-track — the system is singular, transformation
            is required before the path can open.
          </p>
          <p>
            This is not mere metaphor. The structural equivalence is exact: a matrix with det ≠ 0 has a unique solution
            (Ire); a singular matrix with det = 0 has no unique solution without transformation (Ibi). Ìbò Gbígbà
            discovered this mathematical truth through spiritual technology thousands of years before European
            mathematicians formalized it.
          </p>
        </div>

        <div className="ifd-ireib">
          <div className="ifd-ireib__col ifd-ireib__col--ire">
            <div className="ifd-ireib__head">✦ Ire — The 9 Blessings (det ≠ 0)</div>
            <div className="ifd-ireib__list">
              {IRE_TYPES.map(t => <div key={t} className="ifd-ireib__item">{t}</div>)}
            </div>
          </div>
          <div className="ifd-ireib__col ifd-ireib__col--ibi">
            <div className="ifd-ireib__head">⊗ Ibi — The 8 Imbalances (det = 0)</div>
            <div className="ifd-ireib__list">
              {IBI_TYPES.map(t => <div key={t} className="ifd-ireib__item">{t}</div>)}
            </div>
          </div>
        </div>

        <div style={{ marginTop: 32, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 16 }}>
          {[
            { label: 'Ifa System',      ire: 'Ire → Proceed, Ebo to sustain', ibi: 'Ibi → Ebo required first' },
            { label: 'Linear Algebra',  ire: 'det(A) ≠ 0 → Unique solution',  ibi: 'det(A) = 0 → No unique solution' },
            { label: 'Quantum',         ire: '|1⟩ → Definite state measured',  ibi: '|0⟩ → Zero amplitude' },
            { label: 'AI / Neural Net', ire: 'Activation fires → output 1',    ibi: 'Dead neuron → output 0' },
          ].map(row => (
            <div key={row.label} style={{ background: '#0d1425', border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 10, padding: '16px 18px' }}>
              <div style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em',
                textTransform: 'uppercase', color: '#5a6a8a', marginBottom: 10 }}>{row.label}</div>
              <div style={{ fontSize: '0.82rem', color: '#4caf50', marginBottom: 6 }}>✓ {row.ire}</div>
              <div style={{ fontSize: '0.82rem', color: '#ef4444' }}>✕ {row.ibi}</div>
            </div>
          ))}
        </div>
      </section>

      <hr className="ifd-divider" />

      {/* Timeline */}
      <TimelineSection />

      {/* ComputoE */}
      <ComputoE />

      {/* Ibo Det 2×2 — Opon Ifa matrix origin, 4 sweeping motions, Method 1 vs 2 */}
      <IboDet2x2 />

      {/* Ifa Pair Dual */}
      <IfaPairSection />

      {/* Ifa Det Matrix */}
      <IfaDetMatrix />

      {/* Disclaimer */}
      <div className="ifd-disclaimer" id="disclaimer">
        <div className="ifd-disclaimer__inner">
          <span className="ifd-disclaimer__icon">⚠</span>
          <p className="ifd-disclaimer__text">
            <strong>Disclaimer:</strong> The Ìbò Gbígbà Platform is built strictly for educational,
            research, and technology development purposes. It is not designed or intended as a tool
            to train as a Babalawo. The study and practice of Ifa divination as a Babalawo requires
            direct initiation, mentorship, and transmission within the living Ifa tradition —
            something no digital platform can provide or replace.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="ifd-footer">
        <div className="ifd-footer__text">
          Ifa Determinant · Ìbò Gbígbà · IFA Matrix Platform ·{' '}
          <a href="../" className="ifd-footer__link" target="_blank" rel="noopener noreferrer">IFA Matrix</a>
          {' '}·{' '}
          <a href="../../" className="ifd-footer__link" target="_blank" rel="noopener noreferrer">IFA Internet</a>
          {' '}· Part of the{' '}
          <a href="https://cenproject.org/" className="ifd-footer__link" target="_blank" rel="noopener noreferrer">CENProject</a>
        </div>
      </footer>

    </div>
  );
}

ReactDOM.render(<IfaDetApp />, document.getElementById('root'));
