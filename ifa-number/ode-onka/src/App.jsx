/* ─────────────────────────────────────────────────────────────────────
   Òde Ònkà — World of Numbers | IfaSim · IFA Number · The IFA Internet
──────────────────────────────────────────────────────────────────────── */

const { useState, useEffect } = React;

// ─── useWindowWidth ───────────────────────────────────────────────────────────
function useWindowWidth() {
  const [w, setW] = useState(window.innerWidth);
  useEffect(() => {
    const h = () => setW(window.innerWidth);
    window.addEventListener('resize', h, { passive: true });
    return () => window.removeEventListener('resize', h);
  }, []);
  return w;
}

// ─── OgbeSymbol ───────────────────────────────────────────────────────────────

function OgbeSymbol({ size = 20 }) {
  const canvasRef = React.useRef(null);
  const a = size * 0.47;
  const ccx = size / 2, ccy = size / 2;
  const N = 80;
  const sc = a / 200;

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
      buildLobe(-PI/4, PI/4, false),
      buildLobe(3*PI/4, 5*PI/4, false),
      buildLobe(PI/4, 3*PI/4, true),
      buildLobe(5*PI/4, 7*PI/4, true),
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
    <canvas ref={canvasRef}
      style={{ display: 'inline-block', verticalAlign: 'middle', width: size + 'px', height: size + 'px' }}
      aria-label="Ogbe Energy Symbol" />
  );
}

// ─── OyekuSymbol ──────────────────────────────────────────────────────────────

function OyekuSymbol({ size = 20 }) {
  const ref = React.useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const s = size;
    canvas.width = s; canvas.height = s;
    const ctx = canvas.getContext('2d');
    const cx = s/2, cy = s/2, r = s*0.36, gold = '#f5c518';
    ctx.clearRect(0,0,s,s);
    const drawLobes = (alpha, lineW) => {
      ctx.save(); ctx.globalAlpha=alpha; ctx.strokeStyle=gold; ctx.lineWidth=lineW; ctx.lineCap='round';
      for (let rot=0; rot<2; rot++) {
        ctx.beginPath();
        for (let t=0; t<=Math.PI*2; t+=0.01) {
          const scale = Math.cos(2*t)>=0 ? Math.sqrt(Math.cos(2*t)) : 0;
          const x = cx + (rot===0?1:0)*r*scale*Math.cos(t) + (rot===1?1:0)*r*scale*Math.sin(t);
          const y = cy + (rot===0?1:0)*r*scale*Math.sin(t) + (rot===1?1:0)*r*scale*Math.cos(t);
          t<0.02 ? ctx.moveTo(x,y) : ctx.lineTo(x,y);
        }
        ctx.stroke();
      }
      ctx.restore();
    };
    drawLobes(0.12, s*0.22); drawLobes(0.22, s*0.13); drawLobes(0.55, s*0.055); drawLobes(1.00, s*0.022);
    const ext = s*0.30;
    const diag = [[cx+ext,cy-ext],[cx-ext,cy+ext]];
    const drawDiag = (alpha,lineW,blur) => {
      ctx.save(); ctx.globalAlpha=alpha; ctx.strokeStyle=gold; ctx.lineWidth=lineW; ctx.lineCap='round';
      ctx.shadowColor=gold; ctx.shadowBlur=blur;
      ctx.beginPath(); ctx.moveTo(diag[0][0],diag[0][1]); ctx.lineTo(diag[1][0],diag[1][1]); ctx.stroke();
      ctx.restore();
    };
    drawDiag(0.03,s*0.20,s*0.12); drawDiag(0.07,s*0.12,s*0.08); drawDiag(0.16,s*0.07,s*0.05);
    drawDiag(0.34,s*0.03,s*0.03); drawDiag(0.62,s*0.014,s*0.015); drawDiag(0.90,s*0.007,s*0.007);
    drawDiag(0.95,s*0.003,s*0.003);
  }, [size]);
  return React.createElement('canvas', { ref, width: size, height: size,
    style: { display: 'inline-block', verticalAlign: 'middle', width: size+'px', height: size+'px' } });
}

// ─── Ika Meji ────────────────────────────────────────────────────────────────
// Odu #11 · binary 0100 → rows: double single double double
const IKA_ROWS = ['II', 'I', 'II', 'II'];

// ─── Animation data ──────────────────────────────────────────────────────────
const FLOAT_SYMS = [
  {s:'ℕ', x:7,  y:14, d:0,   dur:14, sz:1.7, op:0.45},
  {s:'ℤ', x:87, y:19, d:2,   dur:16, sz:1.4, op:0.38},
  {s:'ℚ', x:21, y:71, d:1,   dur:12, sz:1.3, op:0.42},
  {s:'ℝ', x:74, y:64, d:3,   dur:18, sz:1.9, op:0.5},
  {s:'ℂ', x:44, y:7,  d:0.5, dur:15, sz:1.5, op:0.45},
  {s:'ℍ', x:59, y:79, d:1.5, dur:13, sz:1.4, op:0.38},
  {s:'𝕆', x:11, y:44, d:2.5, dur:17, sz:1.3, op:0.32},
  {s:'∞', x:79, y:37, d:0.8, dur:11, sz:2.1, op:0.55},
  {s:'∫', x:29, y:87, d:1.2, dur:14, sz:1.6, op:0.42},
  {s:'∂', x:67, y:11, d:3.5, dur:16, sz:1.3, op:0.38},
  {s:'∑', x:4,  y:59, d:0.3, dur:19, sz:1.5, op:0.45},
  {s:'∏', x:91, y:54, d:2.8, dur:13, sz:1.4, op:0.38},
  {s:'π', x:39, y:21, d:1.8, dur:15, sz:1.8, op:0.5},
  {s:'e', x:54, y:91, d:0.6, dur:12, sz:1.4, op:0.42},
  {s:'i', x:17, y:29, d:4,   dur:14, sz:1.7, op:0.45},
  {s:'φ', x:81, y:81, d:1.4, dur:17, sz:1.5, op:0.38},
  {s:'Δ', x:34, y:54, d:2.2, dur:11, sz:1.3, op:0.42},
  {s:'ω', x:69, y:27, d:3.2, dur:15, sz:1.4, op:0.45},
  {s:'√', x:24, y:9,  d:1.6, dur:13, sz:1.5, op:0.42},
  {s:'ℵ', x:13, y:82, d:3.8, dur:14, sz:1.4, op:0.42},
  {s:'Ω', x:50, y:47, d:0.9, dur:20, sz:1.2, op:0.28},
  {s:'∇', x:91, y:41, d:2.1, dur:16, sz:1.3, op:0.35},
  {s:'±', x:63, y:94, d:2.6, dur:15, sz:1.3, op:0.38},
  {s:'⊕', x:36, y:38, d:1.1, dur:18, sz:1.2, op:0.3},
];

const BURST = [
  {s:'ℕ', a:0},   {s:'ℝ', a:24},  {s:'ℂ', a:48},  {s:'ℍ', a:72},
  {s:'𝕆', a:96},  {s:'∞', a:120}, {s:'π', a:144},  {s:'e', a:168},
  {s:'i', a:192}, {s:'φ', a:216}, {s:'∑', a:240},  {s:'∫', a:264},
  {s:'∂', a:288}, {s:'Δ', a:312}, {s:'ℵ', a:336},
];

// ─── Number Talks ticker data ─────────────────────────────────────────────────
const TALKS = [
  "e^(iπ) + 1 = 0", "i² = −1", "φ = (1+√5)/2", "ℵ₀ < 2^ℵ₀",
  "2 · 4 · 8 ↦ Ọ̀rúnmìlà", "5 ↦ Ọ̀ṣun", "3 ↦ Èṣù", "10 ↦ Ọya",
  "∞ is Odu", "ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ ⊂ ℂ", "0! = 1", "√−1 = i",
  "∑ = everything", "∂/∂t = change", "∫ = becoming", "π ≈ 3.14159…",
  "ℵ₁ > ℵ₀", "1 + 1 = Ifa", "∞ − ∞ = ?", "every Odu is a number",
];

// ─── Page data ───────────────────────────────────────────────────────────────
const NUM_KINDS = [
  {
    sym:'ℕ  ℤ  ℚ', name:'Discrete Numbers', color:'#f0920c',
    desc:'Counting numbers, integers, rationals — the bedrock of arithmetic. The first citizens of Òde Ònkà.',
  },
  {
    sym:'ℝ', name:'Real Numbers', color:'#14b8d4',
    desc:'The continuous line: rationals, irrationals, transcendentals (π, e, √2…). Every measurable magnitude.',
  },
  {
    sym:'ℂ', name:'Complex Numbers', color:'#8b5cf6',
    desc:'Real + imaginary (a + bi). Two-dimensional, rotating, governing waves and quantum states.',
  },
  {
    sym:'ℍ', name:'Quaternions', color:'#ec4899',
    desc:'Four-dimensional hypercomplex numbers. Encode 3D rotation. Used in physics, robotics, and graphics.',
  },
  {
    sym:'𝕆', name:'Octonions', color:'#ef4444',
    desc:'Eight-dimensional, non-associative. Linked to string theory, exceptional Lie groups, and M-theory.',
  },
  {
    sym:'𝕊  *ℝ', name:'Surreal & Beyond', color:'#4caf50',
    desc:'Surreals contain all reals, ordinals, infinitesimals. Non-standard reals extend analysis past every limit.',
  },
];

const ORISA_NUMS = [
  {name:'Ọ̀rúnmìlà / Ifa', nums:[2,4,8], color:'#f0920c', desc:'Witness of creation. Even numbers, sacred pairs, powers of two.'},
  {name:'Ọ̀ṣun',           nums:[5],     color:'#fbbf24', desc:'Orisa of rivers and love. Five — the living, breathing center.'},
  {name:'Ọya',             nums:[10],    color:'#8b5cf6', desc:'Orisa of storms and change. Ten — complete transition.'},
  {name:'Èṣù / Ìyàmi',    nums:[3],     color:'#ef4444', desc:'The divine Messenger. Three — beginning, middle, and end.'},
];

// ─── IfaNum Matrix data ───────────────────────────────────────────────────────

const IFANUM_MATRIX = [
  {
    id: 'ejiogbe',
    energyName: 'Ejiogbe Matrix',       dualName: 'Oyeku Meji Matrix',
    energyOdu:  'Ejiogbe',              dualOdu:  'Oyeku Meji',
    sym: 'n', pureSymbol: true, color: '#f5c518',
    rows: ['II','II','II','II'],
    energyDesc: 'The pure Energy master matrix — all Ogbe. Every arm is Ogbe (||). The template from which all Ifanum matrices derive.',
    dualDesc: 'The pure Anergy dual — Oyeku Meji. All arms are Oyeku (|). The complementary void matrix.',
  },
  {
    id: 'natural',
    energyName: 'IfaNatural Matrix',          dualName: 'IfaNatural Dual Matrix',
    energyOdu:  'Iwori Meji',               dualOdu:  'Odi Meji',
    sym: 'ℕ', color: '#f0920c',
    rows: ['I','II','II','I'],
    energyDesc: 'Counting numbers as Ifanum — ℕ subscript Ogbe. The foundational number system of OnkaLang.',
    dualDesc: 'The anergy dual of natural numbers — ℕ subscript Oyeku.',
  },
  {
    id: 'reals',
    energyName: 'IfaReals Matrix',      dualName: 'IfaReals Dual Matrix',
    energyOdu:  'Irosun Meji',          dualOdu:  'Owonrin Meji',
    sym: 'ℝ', color: '#14b8d4',
    energyRows: ['II','II','I','I'],
    dualRows:   ['I','I','II','II'],
    energyDesc: 'The continuous number line as Ifanum — ℝ subscript Ogbe. Every measurable magnitude.',
    dualDesc: 'The anergy dual of real numbers — ℝ subscript Oyeku.',
  },
  {
    id: 'quaternion',
    energyName: 'IfaComplex Matrix',    dualName: 'IfaComplex Dual Matrix',
    energyOdu:  'Obara Meji',           dualOdu:  'Okanran Meji',
    sym: 'ℍ', color: '#ec4899',
    energyRows: ['II','I','I','I'],
    dualRows:   ['I','I','I','II'],
    energyDesc: 'Quaternions as Ifanum — ℍ subscript Ogbe. Four-dimensional rotation encoding spacetime.',
    dualDesc: 'The anergy dual of quaternions — ℍ subscript Oyeku.',
  },
  {
    id: 'complex',
    energyName: 'IfaQuaternion Matrix', dualName: 'IfaQuaternion Dual Matrix',
    energyOdu:  'Ogunda Meji',          dualOdu:  'Osa Meji',
    sym: 'ℂ', color: '#8b5cf6',
    energyRows: ['II','II','II','I'],
    dualRows:   ['I','II','II','II'],
    energyDesc: 'Complex numbers (a+bi) as Ifanum — ℂ subscript Ogbe. Two-dimensional Ifa energy states.',
    dualDesc: 'The anergy dual of complex numbers — ℂ subscript Oyeku.',
  },
  {
    id: 'sedenion',
    energyName: 'IfaSedenion Matrix',   dualName: 'IfaSedenion Dual Matrix',
    energyOdu:  'Otura Meji',           dualOdu:  'Irete Meji',
    sym: '𝕊', color: '#4caf50',
    energyRows: ['I','II','I','I'],
    dualRows:   ['I','I','II','I'],
    energyDesc: 'Sedenions as Ifanum — 𝕊 subscript Ogbe. Sixteen-dimensional hypercomplex numbers.',
    dualDesc: 'The anergy dual of sedenions — 𝕊 subscript Oyeku.',
  },
  {
    id: 'octonion',
    energyName: 'IfaOctonion Matrix',   dualName: 'IfaOctonion Dual Matrix',
    energyOdu:  'Ika Meji',             dualOdu:  'Oturupon Meji',
    sym: '𝕆', color: '#ef4444',
    energyRows: ['II','I','II','II'],
    dualRows:   ['II','II','I','II'],
    energyDesc: 'Octonions as Ifanum — 𝕆 subscript Ogbe. Eight-dimensional non-associative algebra.',
    dualDesc: 'The anergy dual of octonions — 𝕆 subscript Oyeku.',
  },
  {
    id: 'ifax',
    energyName: 'IfaX Matrix',          dualName: 'IfaGeneralization',
    energyOdu:  'Ose Meji',             dualOdu:  'Ofun Meji',
    sym: 'X', color: '#a78bfa',
    energyRows: ['II','I','II','I'],
    dualRows:   ['I','II','I','II'],
    energyDesc: 'Any number n as Ifanum — n subscript Ogbe. The IfaGeneralization: every possible number system is an Ifanum subset.',
    dualDesc: 'The IfaGeneralization dual — n subscript Oyeku for all n.',
  },
];

// ─── IfaNum 0+8D Matrix data ──────────────────────────────────────────────────

const STEAMSEX_DIMS = [
  { letter:'S', name:'Science',      short:'Sci',  color:'#f0920c', desc:'The Science of Numbers'            },
  { letter:'T', name:'Technology',   short:'Tech', color:'#14b8d4', desc:'The Technology of Numbers'         },
  { letter:'E', name:'Engineering',  short:'Eng',  color:'#00c87c', desc:'The Engineering of Numbers'        },
  { letter:'A', name:'Arts',         short:'Arts', color:'#ec4899', desc:'The Arts of Numbers'                },
  { letter:'M', name:'Mathematics',  short:'Math', color:'#f5c518', desc:'The Mathematics of Numbers'        },
  { letter:'S', name:'Social',       short:'Soc',  color:'#8b5cf6', desc:'The Social Science of Numbers'     },
  { letter:'E', name:'Education',    short:'Edu',  color:'#3b9eff', desc:'The Education of Numbers'          },
  { letter:'X', name:'Others',       short:'X',    color:'#6366f1', desc:'The Unknown Dimensions of Numbers' },
];

const SIDECHRX_DIMS = [
  { letter:'S', name:'Symmetry',     short:'Sym',  color:'#f0920c', desc:'The Symmetry Laws of Numbers'     },
  { letter:'I', name:'Invariance',   short:'Inv',  color:'#6366f1', desc:'The Invariance Laws of Numbers'   },
  { letter:'D', name:'Duality',      short:'Dual', color:'#14b8d4', desc:'The Duality Laws of Numbers'      },
  { letter:'E', name:'Emergence',    short:'Emg',  color:'#10b981', desc:'The Emergence Laws of Numbers'    },
  { letter:'C', name:'Composition',  short:'Comp', color:'#ec4899', desc:'The Composition Laws of Numbers'  },
  { letter:'H', name:'Holism',       short:'Hol',  color:'#f5c518', desc:'The Holism Laws of Numbers'       },
  { letter:'R', name:'Reductionism', short:'Red',  color:'#8b5cf6', desc:'The Reductionism Laws of Numbers' },
  { letter:'X', name:'Others',       short:'X',    color:'#a78bfa', desc:'The Unknown Laws of Numbers'      },
];

// ─── Intro Overlay ───────────────────────────────────────────────────────────

function IkaMejiAnim({ phase }) {
  return (
    <div className="ode-ika">
      <div className="ode-ika__label">ÒDU · HOUSE 11</div>
      <div className="ode-ika__marks">
        {IKA_ROWS.map((row, ri) => (
          <div key={ri}
            className={`ode-ika__row${phase >= 1 ? ' ode-ika__row--in' : ''}`}
            style={{animationDelay:`${ri * 0.40}s`}}
          >
            <div className="ode-ika__arm">
              {row === 'II'
                ? <><span className="ode-mark"/><span className="ode-mark"/></>
                : <span className="ode-mark ode-mark--s"/>}
            </div>
            <div className="ode-ika__arm">
              {row === 'II'
                ? <><span className="ode-mark"/><span className="ode-mark"/></>
                : <span className="ode-mark ode-mark--s"/>}
            </div>
          </div>
        ))}
      </div>
      <div className={`ode-ika__name${phase >= 2 ? ' ode-ika__name--in' : ''}`}>
        Ìká Méjì
      </div>
    </div>
  );
}

function IntroOverlay({ onDone }) {
  const [phase, setPhase] = useState(0);
  // 0=init  1=marks  2=burst  3=title  4=cta  5=out

  useEffect(() => {
    const t = [
      setTimeout(() => setPhase(1), 500),
      setTimeout(() => setPhase(2), 2300),
      setTimeout(() => setPhase(3), 3300),
      setTimeout(() => setPhase(4), 4400),
      setTimeout(() => { setPhase(5); setTimeout(onDone, 500); }, 7500),
    ];
    return () => t.forEach(clearTimeout);
  }, []);

  const skip = () => { setPhase(5); setTimeout(onDone, 350); };

  return (
    <div className={`ode-intro${phase >= 5 ? ' ode-intro--out' : ''}`}>
      {/* Floating bg symbols */}
      <div className="ode-intro__bg" aria-hidden="true">
        {FLOAT_SYMS.map((f, i) => (
          <span key={i} className="ode-float" style={{
            left:`${f.x}%`, top:`${f.y}%`,
            fontSize:`${f.sz}rem`, opacity:f.op,
            animationDuration:`${f.dur}s`, animationDelay:`${f.d}s`,
          }}>{f.s}</span>
        ))}
      </div>

      {/* Centre stage */}
      <div className="ode-intro__stage">

        <IkaMejiAnim phase={phase} />

        {/* Number burst */}
        {phase >= 2 && (
          <div className="ode-burst" aria-hidden="true">
            {BURST.map((b, i) => {
              const rad = (b.a * Math.PI) / 180;
              const R = 36;
              return (
                <span key={i} className="ode-burst__sym" style={{
                  '--tx': `${(Math.cos(rad) * R).toFixed(2)}vmin`,
                  '--ty': `${(Math.sin(rad) * R).toFixed(2)}vmin`,
                  animationDelay:`${i * 0.05}s`,
                }}>{b.s}</span>
              );
            })}
          </div>
        )}

        {/* Title */}
        <div className={`ode-intro__title${phase >= 3 ? ' ode-intro__title--in' : ''}`}>
          <div className="ode-intro__t-main">Òde Ònkà</div>
          <div className="ode-intro__t-sub">the World of Numbers</div>
          <div className="ode-intro__t-tag">IfaSim · IFA Number</div>
        </div>

        {/* CTA */}
        {phase >= 4 && (
          <button className="ode-intro__enter" onClick={skip}>
            Enter the World →
          </button>
        )}
      </div>

      <button className="ode-intro__skip" onClick={skip} aria-label="Skip intro">
        {phase >= 4 ? 'click anywhere to continue' : 'skip →'}
      </button>
    </div>
  );
}

// ─── Header ──────────────────────────────────────────────────────────────────

function OdeOnkaHeader() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', h, {passive:true});
    return () => window.removeEventListener('scroll', h);
  }, []);
  return (
    <header className={`oo-header${scrolled ? ' oo-header--scrolled' : ''}`}>
      <div className="oo-header__inner">
        <a href="../" className="oo-back">← IFA Number</a>
        <div className="oo-brand">
          <span className="oo-brand__icon">⬡</span>
          <span className="oo-brand__name">Òde Ònkà</span>
          <span className="oo-brand__tag">IfaSim</span>
        </div>
        <a href="https://ifainternet.org" className="oo-inet" target="_blank" rel="noopener noreferrer">
          IFA Internet
        </a>
      </div>
    </header>
  );
}

// ─── Reusable Ika Meji glyph (small) ─────────────────────────────────────────

function IkaMejiSmall({ markClass = 'oo-sm-mark', singleClass = 'oo-sm-mark--s', armClass = 'oo-sm-arm', rowClass = 'oo-sm-row' }) {
  return (
    <>
      {IKA_ROWS.map((row, ri) => (
        <div key={ri} className={rowClass}>
          <div className={armClass}>
            {row === 'II'
              ? <><span className={markClass}/><span className={markClass}/></>
              : <span className={`${markClass} ${singleClass}`}/>}
          </div>
          <div className={armClass}>
            {row === 'II'
              ? <><span className={markClass}/><span className={markClass}/></>
              : <span className={`${markClass} ${singleClass}`}/>}
          </div>
        </div>
      ))}
    </>
  );
}

// ─── Number Talks ticker ──────────────────────────────────────────────────────

function NumberTalksTicker() {
  const items = [...TALKS, ...TALKS];
  return (
    <div className="oo-talks" aria-label="Ònkà ń'sọ̀rọ̀ — Number Talks">
      <div className="oo-talks__label">
        <span className="oo-talks__dot-live"/>
        Ònkà ń'sọ̀rọ̀
      </div>
      <div className="oo-talks__track" aria-hidden="true">
        <div className="oo-talks__inner">
          {items.map((t, i) => (
            <span key={i} className="oo-talks__item">
              <span className="oo-talks__sep">·</span>{t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Sections ─────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="oo-hero">
      <div className="oo-hero__bg" aria-hidden="true">
        <div className="oo-hero__blob oo-hero__blob--1"/>
        <div className="oo-hero__blob oo-hero__blob--2"/>
        <div className="oo-hero__blob oo-hero__blob--3"/>
      </div>
      <div className="oo-container">
        <div className="oo-eyebrow">IfaSim · IFA Number · Ìká Méjì — Odu #11</div>
        <h1 className="oo-hero__title">Òde Ònkà</h1>
        <p className="oo-hero__sub">the World of Numbers</p>
        <p className="oo-hero__body">
          An Ifa Simulation governed by Odu, <strong>Ìká Méjì</strong>. In this world, inhabitants speak
          <strong> Èdè Onka</strong> — OnkaLang, the Language of Numbers. Everything they
          do — think, create, relate, govern, build — they do in numbers.
          At the heart of Òde Ònkà lies a truth: certain sacred meta-numbers underlie
          everything in existence.
        </p>
        <div className="oo-hero__pills">
          {['Èdè Onka · OnkaLang','Ònkà Ifá','Ònkàṣà','Ifa Number Matrix'].map(p => (
            <span key={p} className="oo-pill">{p}</span>
          ))}
        </div>

        <NumberTalksTicker />

        {/* Ika Meji hero glyph */}
        <div className="oo-hero__ika">
          <div className="oo-hero__ika-glyph">
            <IkaMejiSmall
              markClass="oo-hm" singleClass="oo-hm--s"
              armClass="oo-hm-arm" rowClass="oo-hm-row"
            />
          </div>
          <div className="oo-hero__ika-info">
            <div className="oo-hero__ika-name">Ìká Méjì</div>
            <div className="oo-hero__ika-sub">Odu #11 · Àgbáyé Ònkà: Numbers Universe</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function NumberKindsSection() {
  return (
    <section id="kinds" className="oo-section">
      <div className="oo-container">
        <div className="oo-eyebrow">Èdè Onka · Citizens of Òde Ònkà</div>
        <h2 className="oo-section-title">Kinds of Numbers</h2>
        <p className="oo-section-sub">
          In Òde Ònkà, every number is a citizen with its own nature, dimension, and role.
          From the simplest counting numbers to infinite-dimensional algebras — all dwell here.
        </p>
        <div className="oo-kinds-grid">
          {NUM_KINDS.map((k, i) => (
            <div key={i} className="oo-kind-card" style={{'--kc': k.color}}>
              <div className="oo-kind-card__sym">{k.sym}</div>
              <div className="oo-kind-card__name">{k.name}</div>
              <p className="oo-kind-card__desc">{k.desc}</p>
            </div>
          ))}
        </div>
        <p className="oo-section-note">
          All number systems receive the Ifa designation in IFA Number — each becomes an Ifanum,
          a number-as-energyform, within the full IFA Number universe.
        </p>
      </div>
    </section>
  );
}

function IfaNumbersSection() {
  return (
    <section id="ifa-numbers" className="oo-section oo-section--alt">
      <div className="oo-container">
        <div className="oo-eyebrow">Meta-Numbers · IFABOK</div>
        <h2 className="oo-section-title">Ifa Numbers &amp; Their Dual</h2>
        <p className="oo-section-sub">
          Beyond ordinary numbers lie sacred meta-numbers — the inner numerical structures
          that pattern everything in existence, revealed through Odu Ifa.
        </p>

        <div className="oo-dual-grid">
          {/* Ònkà Ifá */}
          <div className="oo-dual-card oo-dual-card--a">
            <div className="oo-dual-card__tag">Ònkà Ifá · Ònkàfá</div>
            <h3 className="oo-dual-card__title">Ifa Numbers</h3>
            <p className="oo-dual-card__body">
              Sacred, highly complex meta-numbers that underlie all existence.
              The inner structures of matter, energy, mind, and spirit are patterned
              after Ifa Numbers — they are not computed; they are revealed through Odu Ifa.
              Each Ifa Number encodes a deep principle of the cosmos.
            </p>
          </div>

          <div className="oo-dual-arrow" aria-hidden="true">⟷<br/><span>Dual</span></div>

          {/* Ifa Ònkà */}
          <div className="oo-dual-card oo-dual-card--b">
            <div className="oo-dual-card__tag">Ifa Ònkà</div>
            <h3 className="oo-dual-card__title">The Odu that Birthed All Numbers</h3>
            <p className="oo-dual-card__body">
              The dual of Ifa Numbers. <strong>Ifa Ònkà</strong> is the Odu — the
              primordial numerical pattern — from which all numbers emerged. It is the
              number-face of Ifa itself: the numerical genome of the cosmos, the Source
              from which every counting thing flows.
            </p>
          </div>
        </div>

        <div className="oo-callout">
          <span className="oo-callout__icon">✦</span>
          <span>
            The inner structure of everything in existence is patterned after Ifa Numbers —
            meta-numbers that exist in the deepest layer of Òde Ònkà, at the boundary of
            number and spirit.
          </span>
        </div>
      </div>
    </section>
  );
}

function OrisaNumbersSection() {
  return (
    <section id="orisa-numbers" className="oo-section">
      <div className="oo-container">
        <div className="oo-eyebrow">Sacred Numbers · Yoruba Cosmology</div>
        <h2 className="oo-section-title">Orisa Numbers &amp; Their Dual</h2>
        <p className="oo-section-sub">
          Each Orisa — the sacred beings of Yoruba cosmology — has favorite numbers that
          encode their essence. In Òde Ònkà, these are resonant frequencies in OnkaLang.
        </p>

        <div className="oo-dual-grid">
          {/* Ònkà Òrìṣà */}
          <div className="oo-dual-card oo-dual-card--c">
            <div className="oo-dual-card__tag">Ònkà Òrìṣà · Ònkàṣà</div>
            <h3 className="oo-dual-card__title">Orisa Numbers</h3>
            <p className="oo-dual-card__body">
              The favorite numbers of the Orisa — sacred constants embedded in the fabric
              of reality. These numbers carry each Orisa's energy signature and appear
              as patterns in nature, art, ritual, and the structure of existence itself.
            </p>
          </div>

          <div className="oo-dual-arrow" aria-hidden="true">⟷<br/><span>Dual</span></div>

          {/* Òrìṣà Ònkà */}
          <div className="oo-dual-card oo-dual-card--d">
            <div className="oo-dual-card__tag">Òrìṣà Ònkà</div>
            <h3 className="oo-dual-card__title">Numbers as Orisa</h3>
            <p className="oo-dual-card__body">
              The dual: certain numbers are themselves Orisa — living, conscious entities.
              In Òde Ònkà, numbers are not passive symbols. They are the sacred beings
              who govern the patterns of existence — the Orisa who speak in mathematics.
            </p>
          </div>
        </div>

        {/* Orisa favorites */}
        <div className="oo-orisa-grid">
          {ORISA_NUMS.map((o, i) => (
            <div key={i} className="oo-orisa-card" style={{'--oc': o.color}}>
              <div className="oo-orisa-card__name">{o.name}</div>
              <div className="oo-orisa-card__nums">
                <span className="oo-orisa-num">{o.nums.join(', ')}</span>
              </div>
              <p className="oo-orisa-card__desc">{o.desc}</p>
            </div>
          ))}
        </div>
        <p className="oo-section-note">
          The full table of Orisa Numbers is part of the Ifa Number Matrix — coming soon.
        </p>
      </div>
    </section>
  );
}

// ─── IfaNum expression components ────────────────────────────────────────────

function IfaNumOgbe({ sym, symSize = '1.2rem', iconSize = 11, color = 'var(--t1)' }) {
  return (
    <span className="inm-expr inm-expr--ogbe">
      <span className="inm-expr__char" style={{ fontSize: symSize, color }}>{sym}</span>
      <span className="inm-expr__sub"><OgbeSymbol size={iconSize} /></span>
    </span>
  );
}

function IfaNumOyeku({ sym, symSize = '1.2rem', iconSize = 11, color = 'var(--t2)' }) {
  return (
    <span className="inm-expr inm-expr--oyeku">
      <span className="inm-expr__char" style={{ fontSize: symSize, color }}>{sym}</span>
      <span className="inm-expr__sub"><OyekuSymbol size={iconSize} /></span>
    </span>
  );
}

// ─── Traditional Odu mark ─────────────────────────────────────────────────────
// 'II' = Ogbe  → 1 vertical mark  (single palm-nut remaining)
// 'I'  = Oyeku → 2 vertical marks (two palm-nuts remaining)

function TradiMark({ row }) {
  return (
    <div className="inm-tm">
      <span className="inm-tm__line" />
      {row === 'I' && <span className="inm-tm__line" />}
    </div>
  );
}

// ─── IfaMatrix reveal CSS ─────────────────────────────────────────────────────

function InmRevealStyles() {
  useEffect(() => {
    const el = document.createElement('style');
    el.id = 'inm-reveal-styles';
    el.textContent = `
/* ── IfaNum Matrix Interactive Reveal ───────────────────────── */
.inm-cell {
  padding: 0 !important;
  gap: 0 !important;
  position: relative;
  cursor: pointer;
  perspective: 900px;
}
@keyframes inm-cell-flash {
  0%   { box-shadow: 0 0 0   rgba(255,255,255,0); }
  30%  { box-shadow: 0 0 32px var(--inmc, #f5c518); }
  100% { box-shadow: 0 0 0   rgba(255,255,255,0); }
}
.inm-cell--flash { animation: inm-cell-flash 0.55s ease-out; }

.inm-cell__flip {
  width: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.72s cubic-bezier(0.4, 0.15, 0.2, 1);
  will-change: transform;
}
.inm-cell--revealed .inm-cell__flip { transform: rotateY(180deg); }

.inm-cell__front {
  display: flex; flex-direction: column; align-items: center;
  gap: 14px; padding: 18px 10px 14px;
  width: 100%; box-sizing: border-box;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}
.inm-cell__back {
  position: absolute; inset: 0;
  transform: rotateY(180deg);
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  border-radius: 12px;
  display: flex; flex-direction: column;
  align-items: center; justify-content: space-between;
  padding: 10px 8px 10px; box-sizing: border-box;
  background: radial-gradient(ellipse at 50% 30%, #14093a 0%, #060210 100%);
  border: 1px solid rgba(245,197,24,0.20);
  overflow: hidden;
}
.inm-cell__back::before {
  content: '';
  position: absolute; inset: 0;
  background:
    radial-gradient(circle at 22% 18%, rgba(245,197,24,0.10) 0%, transparent 52%),
    radial-gradient(circle at 78% 82%, rgba(245,197,24,0.07) 0%, transparent 45%);
  pointer-events: none;
}

/* Reveal cue on front */
.inm-cell__cue {
  font-size: 0.55rem; font-weight: 600; letter-spacing: 0.06em;
  color: rgba(245,197,24,0.38); text-align: center;
  transition: color 0.2s;
}
.inm-cell:hover .inm-cell__cue { color: rgba(245,197,24,0.70); }
.inm-cell--revealed .inm-cell__front .inm-cell__cue { visibility: hidden; }

/* Sparkle */
@keyframes inm-sparkle {
  0%   { opacity: 0; transform: scale(0) rotate(-15deg); }
  45%  { opacity: 1; transform: scale(1.4) rotate(25deg); }
  100% { opacity: 0; transform: scale(0.9) rotate(55deg); }
}
.inm-odu-sparkle {
  position: absolute; top: 5px; right: 7px;
  font-size: 0.62rem; color: rgba(245,197,24,0.85);
  opacity: 0; pointer-events: none;
}
.inm-cell--revealed .inm-odu-sparkle {
  animation: inm-sparkle 1s ease-out 0.6s forwards;
}

/* Traditional Odu mark container — one arm of a row */
.inm-tm {
  display: flex; gap: 5px;
  align-items: center; justify-content: center;
  min-width: 30px;
}
/* Each individual vertical mark */
@keyframes inm-mark-pulse {
  0%,100% { box-shadow: 0 0 5px 2px rgba(245,197,24,0.55), 0 0 14px 4px rgba(245,197,24,0.25); }
  50%     { box-shadow: 0 0 9px 3px rgba(245,197,24,0.85), 0 0 22px 7px rgba(245,197,24,0.45); }
}
.inm-tm__line {
  display: inline-block;
  width: 7px; height: 30px;
  background: linear-gradient(180deg, #ffe566 0%, #f5c518 48%, #c9960c 100%);
  border-radius: 50px;
  box-shadow: 0 0 5px 2px rgba(245,197,24,0.55), 0 0 14px 4px rgba(245,197,24,0.25),
              inset 0 1px 0 rgba(255,240,140,0.55);
  animation: inm-mark-pulse 2.8s ease-in-out infinite;
}

/* Odu rows grid */
.inm-odu-rows {
  display: flex; flex-direction: column; gap: 6px; align-items: center;
  position: relative; z-index: 1;
}
.inm-odu-row { display: flex; gap: 22px; align-items: center; }

/* Marks and name fade-glow in after flip */
@keyframes inm-glow-in {
  0%   { opacity: 0; filter: blur(8px); }
  100% { opacity: 1; filter: blur(0); }
}
.inm-cell--revealed .inm-odu-rows {
  animation: inm-glow-in 0.5s ease-out 0.65s both;
}
.inm-odu-name {
  font-size: 0.70rem; font-weight: 700; letter-spacing: 0.06em;
  color: #f5c518; text-align: center;
  text-shadow: 0 0 10px rgba(245,197,24,0.8), 0 0 24px rgba(245,197,24,0.4);
  position: relative; z-index: 1;
  opacity: 0;
}
.inm-cell--revealed .inm-odu-name {
  animation: inm-glow-in 0.5s ease-out 0.85s both;
}

/* ── Mobile: scale down mark & cell padding ──────────────────── */
@media (max-width: 600px) {
  .inm-cell__front { padding: 14px 8px 10px; gap: 10px; }
  .inm-cell__cue { font-size: 0.5rem; }
  .inm-cell__back { padding: 8px 6px; }
  .inm-tm__line { width: 6px; height: 24px; }
  .inm-odu-row { gap: 14px; }
  .inm-odu-rows { gap: 5px; }
  .inm-odu-name { font-size: 0.62rem; }
}
@media (max-width: 480px) {
  .inm-cell__front { padding: 12px 6px 8px; gap: 8px; }
  .inm-cell__back { padding: 6px 4px; }
  .inm-tm__line { width: 5px; height: 20px; }
  .inm-odu-row { gap: 10px; }
  .inm-odu-rows { gap: 4px; }
  .inm-odu-name { font-size: 0.58rem; }
}

/* ── Reduced motion ──────────────────────────────────────────── */
@media (prefers-reduced-motion: reduce) {
  .inm-cell__flip { transition-duration: 0.01ms !important; }
  .inm-tm__line { animation: none; }
  .inm-cell--flash { animation: none; }
  .inm-cell--revealed .inm-odu-sparkle { animation: none; opacity: 0; }
  .inm-cell--revealed .inm-odu-rows { animation: none; opacity: 1; filter: none; }
  .inm-cell--revealed .inm-odu-name { animation: none; opacity: 1; }
}
    `;
    document.head.appendChild(el);
    return () => { const s = document.getElementById('inm-reveal-styles'); if (s) s.remove(); };
  }, []);
  return null;
}

// ─── Single matrix cell — interactive flip card ───────────────────────────────

function IfaMatrix({ name, sym, displayRows, isEnergy, color, pureSymbol, oduName }) {
  const [revealed, setRevealed] = useState(false);
  const [flash, setFlash] = useState(false);

  const handleClick = () => {
    setFlash(true);
    setTimeout(() => setFlash(false), 580);
    setRevealed(r => !r);
  };

  const exprColor = isEnergy ? color : 'var(--t2)';
  const cellStyle = isEnergy
    ? { borderColor: color + '45', background: `linear-gradient(135deg,${color}11,transparent)` }
    : {};

  const renderArm = (row) => {
    if (pureSymbol) return row === 'II' ? <OgbeSymbol size={18} /> : <OyekuSymbol size={18} />;
    return row === 'II'
      ? <IfaNumOgbe sym={sym} symSize="1rem" iconSize={11} color={exprColor} />
      : <IfaNumOyeku sym={sym} symSize="1rem" iconSize={11} />;
  };

  const cls = ['inm-cell',
    isEnergy ? 'inm-cell--energy' : 'inm-cell--dual',
    revealed ? 'inm-cell--revealed' : '',
    flash    ? 'inm-cell--flash'    : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={cls} style={{ '--inmc': color, ...cellStyle }} onClick={handleClick}>
      <div className="inm-cell__flip">

        {/* ── Front face ── */}
        <div className="inm-cell__front">
          <div className="inm-cell__body">
            {displayRows.map((row, ri) => (
              <div key={ri} className="inm-cell__row">
                <div className="inm-cell__arm">{renderArm(row)}</div>
                <div className="inm-cell__arm">{renderArm(row)}</div>
              </div>
            ))}
          </div>
          <div className="inm-cell__name">{name}</div>
          <div className="inm-cell__cue">Reveal Odu ✦</div>
        </div>

        {/* ── Back face — Odu reveal ── */}
        <div className="inm-cell__back">
          <span className="inm-odu-sparkle" aria-hidden="true">✦</span>
          <div className="inm-odu-rows">
            {displayRows.map((row, ri) => (
              <div key={ri} className="inm-odu-row">
                <TradiMark row={row} />
                <TradiMark row={row} />
              </div>
            ))}
          </div>
          <div className="inm-odu-name">{oduName}</div>
        </div>

      </div>
    </div>
  );
}

// ─── IfaNumMatrixSection ──────────────────────────────────────────────────────

function IfaNumMatrixSection() {
  return (
    <>
      <InmRevealStyles />
      <IfaNumMatrixSectionInner />
    </>
  );
}

function IfaNumMatrixSectionInner() {
  const SUBSET_SYMS = [
    {s:'ℕ',l:'N'}, {s:'ℤ',l:'Z'}, {s:'ℝ',l:'R'}, {s:'ℂ',l:'C'},
    {s:'ℍ',l:'H'}, {s:'𝕆',l:'O'}, {s:'𝕊',l:'S'},
  ];
  return (
    <section id="ifanum-matrix" className="oo-section oo-section--alt">
      <div className="oo-container">
        <div className="oo-eyebrow">IfaNum Matrix · OnkaLang · IFABOK</div>
        <h2 className="oo-section-title">IfaNum Matrix</h2>
        <div className="inm-matrix-intro">
          <p className="oo-section-sub">Ifa Number Matrix — Every classical number system expressed as an Ifanum subset.</p>
          <p className="oo-section-sub">At the most fundamental level, what we mean by a Matrix here are the 256 Odu Ifa and the 16 Odu Orisa. They are universal meta-matrices.</p>
          <p className="oo-section-sub">At an emergent level, we refer to matrices in modern math and STEM.</p>
          <p className="oo-section-sub">Also, in Consciousness Science and related fields, matrix also means the matrix that we perceive as reality or nature.</p>
        </div>

        {/* Ifanum subset statement */}
        <div className="inm-subset">
          <div className="inm-subset__syms">
            {SUBSET_SYMS.map((s, i) => (
              <React.Fragment key={i}>
                <IfaNumOgbe sym={s.s} symSize="1.35rem" iconSize={12} color="#eef1fb" />
                {i < SUBSET_SYMS.length - 1 && <span className="inm-subset__sep">,</span>}
              </React.Fragment>
            ))}
            <span className="inm-subset__ell">, …</span>
          </div>
          <h3 className="inm-subset__heading">Ifa Definition (IfaDef): ToE Definition (ToE Def)</h3>
          <p className="inm-subset__tagline"><em>Àwọn ònkà tí a lèfi ṣe gbogbo ǹkàn (the Numbers for Everything, NumoE).</em></p>
          <div className="inm-subset__caption">
            <p>An <strong>Ifanum</strong> (IfaNum) is any kind of number, <em>n</em>, that is expressed, computed, constructed, or viewed using the 16 Ifa Laws of Nature, <strong>Oju Odufa Merindinlogun</strong> — the <strong>SIDECHRX Principles</strong>.</p>
            <hr className="inm-subset__rule" />
            <p>Ifanums are the <strong>NumoEs</strong> or <strong>ToE Numbers</strong> (ToE Nums) used to do advanced studies, metamodelling, meta-simulations, and meta-analyses across the 16 <strong>STEAMSEX Dimensions</strong>, i.e., all fields of knowledge.</p>
            <hr className="inm-subset__rule" />
            <p>They are <strong>Tools for the Unification and Integration of Everything</strong> (UIoE), also known <strong>IfaUI</strong> (Ifa Unification and Integration) or <strong>ToE UI</strong> (ToE Unification and Integration), a core program of the IFA Internet for building the General/Universal/Standard Model of any field, tech, or system in IfaLang.</p>
            <hr className="inm-subset__rule" />
            <p>Ifanums are numbers in IfaLang, <em>n</em>, with the <strong>Ogbe Energy Symbol</strong> (the SymboE — Symbol of Everything, or Ifa Infinity) attached to them as subscript. Its dual is <em>n</em> with the <strong>Oyeku Anergy Symbol</strong> attached as subscript. These are <em>Ifa Constructions</em> or <em>Ifa Expressions</em>.</p>
          </div>
          <div className="inm-def-row">
            <div className="inm-def-item">
              <IfaNumOgbe sym="n" symSize="1.5rem" iconSize={14} color="#f5c518" />
              <span className="inm-def-item__defop">:=</span>
              <OgbeSymbol size={22} />
              <span className="inm-def-item__label">Ifanum — Energy form</span>
            </div>
            <div className="inm-def-divider">⟷</div>
            <div className="inm-def-item">
              <IfaNumOyeku sym="n" symSize="1.5rem" iconSize={14} />
              <span className="inm-def-item__defop">:=</span>
              <OyekuSymbol size={22} />
              <span className="inm-def-item__label">Dual Ifanum — Anergy form</span>
            </div>
          </div>
        </div>

        <h3 className="inm-matrix-subheading">The Matrix of Number Perception</h3>

        {/* 4×4 Matrix grid — each cell is one Odu Matrix (energy or dual) */}
        <div className="inm-matrix-grid">
          {IFANUM_MATRIX.flatMap(data => {
            const eRows = data.energyRows || data.rows;
            const dRows = data.dualRows || data.rows.map(r => r === 'II' ? 'I' : 'II');
            return [
              <IfaMatrix key={data.id + '-e'} name={data.energyName} sym={data.sym}
                displayRows={eRows} isEnergy={true} color={data.color} pureSymbol={data.pureSymbol}
                oduName={data.energyOdu} />,
              <IfaMatrix key={data.id + '-d'} name={data.dualName} sym={data.sym}
                displayRows={dRows} isEnergy={false} color={data.color} pureSymbol={data.pureSymbol}
                oduName={data.dualOdu} />,
            ];
          })}
        </div>
      </div>
    </section>
  );
}

// ─── IfaNum 0+8D Radial Matrix ────────────────────────────────────────────────

function IfaNumRadialMatrix({ dims, variant }) {
  const [activeIdx, setActiveIdx] = useState(null);
  const ww = useWindowWidth();
  const sm  = ww < 520;
  const W   = sm ? 340 : 560;
  const H   = sm ? 292 : 480;
  const cx  = W / 2, cy = H / 2;
  const orbitR = sm ? 102 : 165;
  const nodeR  = sm ?  19  : 30;
  const isEllipse = variant === 'sidechrx';
  const cRx = sm ? (isEllipse ? 40 : 31) : (isEllipse ? 68 : 52);
  const cRy = sm ? (isEllipse ? 27 : 31) : (isEllipse ? 44 : 52);
  const lOff  = sm ? nodeR + 8  : nodeR + 12;
  const lFsz  = sm ? 7 : 8.5;
  const foW   = sm ? 30 : 56,  foH  = sm ? 18 : 30;
  const nfoW  = sm ? 22 : 34,  nfoH = sm ? 16 : 24;
  const gradId = `inm0g-${variant}`;

  const positions = dims.map((_, i) => {
    const a = (i / 8) * 2 * Math.PI - Math.PI / 2;
    const ca = Math.cos(a), sa = Math.sin(a);
    const cRim = isEllipse
      ? (cRx * cRy) / Math.sqrt((cRy * ca) ** 2 + (cRx * sa) ** 2)
      : cRx;
    return {
      nx: cx + orbitR * ca,               ny: cy + orbitR * sa,
      sx: cx + (cRim + 5) * ca,           sy: cy + (cRim + 5) * sa,
      ex: cx + (orbitR - nodeR - 4) * ca, ey: cy + (orbitR - nodeR - 4) * sa,
      lx: cx + (orbitR + lOff) * ca,
      ly: cy + (orbitR + lOff) * sa,
      a,
    };
  });

  const anchors   = ['middle','start','start','start','middle','end','end','end'];
  const dBaseline = ['auto','middle','middle','middle','hanging','middle','middle','middle'];
  const toggle = i => setActiveIdx(ai => ai === i ? null : i);
  const active = activeIdx !== null ? dims[activeIdx] : null;

  return (
    <div className="inm0-wrap">
      <svg viewBox={`0 0 ${W} ${H}`} className="inm0-svg">
        <defs>
          <radialGradient id={gradId}>
            <stop offset="0%"   stopColor="#f5c518" stopOpacity="0.18"/>
            <stop offset="100%" stopColor="#f5c518" stopOpacity="0"/>
          </radialGradient>
        </defs>

        {/* Orbit ring */}
        <circle cx={cx} cy={cy} r={orbitR} fill="none"
          stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="3 8"/>

        {/* Spokes */}
        {positions.map((p, i) => (
          <line key={i} x1={p.sx} y1={p.sy} x2={p.ex} y2={p.ey}
            stroke={activeIdx === i ? dims[i].color : 'rgba(255,255,255,0.13)'}
            strokeWidth={activeIdx === i ? 2 : 1}
            style={{transition:'stroke 0.3s, stroke-width 0.3s'}}/>
        ))}

        {/* Center glow */}
        {isEllipse
          ? <ellipse cx={cx} cy={cy} rx={cRx+14} ry={cRy+14} fill={`url(#${gradId})`}/>
          : <circle  cx={cx} cy={cy} r={cRx+14}              fill={`url(#${gradId})`}/>}

        {/* Center node */}
        {isEllipse
          ? <ellipse cx={cx} cy={cy} rx={cRx} ry={cRy}
              fill="#04080f" stroke="#f5c518" strokeWidth="2"/>
          : <circle  cx={cx} cy={cy} r={cRx}
              fill="#04080f" stroke="#f5c518" strokeWidth="2"/>}

        {/* Center n_Ogbe via foreignObject */}
        <foreignObject x={cx - foW/2} y={cy - foH/2} width={foW} height={foH}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'center',
            width:'100%',height:'100%'}}>
            <IfaNumOgbe sym="n" symSize={sm ? "0.85rem" : "1.2rem"} iconSize={sm ? 9 : 12} color="#f5c518"/>
          </div>
        </foreignObject>

        {/* Outer nodes */}
        {positions.map((p, i) => {
          const d = dims[i];
          const isA = activeIdx === i;
          return (
            <g key={i} onClick={() => toggle(i)} style={{cursor:'pointer'}}>
              <circle cx={p.nx} cy={p.ny} r={nodeR+10}
                fill={d.color} fillOpacity={isA ? 0.12 : 0}
                style={{transition:'fill-opacity 0.3s'}}/>
              <circle cx={p.nx} cy={p.ny} r={nodeR}
                fill="#060c18"
                stroke={isA ? d.color : 'rgba(255,255,255,0.18)'}
                strokeWidth={isA ? 2.2 : 1.5}
                style={{transition:'stroke 0.3s, stroke-width 0.3s'}}/>
              <foreignObject x={p.nx - nfoW/2} y={p.ny - nfoH/2} width={nfoW} height={nfoH}>
                <div style={{display:'flex',alignItems:'center',justifyContent:'center',
                  width:'100%',height:'100%'}}>
                  <IfaNumOgbe sym={d.letter} symSize={sm ? "0.7rem" : "0.85rem"} iconSize={sm ? 6 : 8}
                    color={isA ? d.color : 'rgba(200,210,235,0.65)'}/>
                </div>
              </foreignObject>
              <text x={p.lx} y={p.ly}
                textAnchor={anchors[i]} dominantBaseline={dBaseline[i]}
                fontSize={lFsz} fontFamily="system-ui,sans-serif"
                fill={isA ? d.color : 'rgba(136,146,170,0.72)'}
                style={{transition:'fill 0.3s',pointerEvents:'none'}}>
                {sm ? d.short : d.name}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Description panel */}
      <div className="inm0-desc"
        style={active ? {borderColor:active.color+'44',background:active.color+'0d'} : {}}>
        {active ? (
          <>
            <span className="inm0-desc__sym">
              <IfaNumOgbe sym={active.letter} symSize="1rem" iconSize={10} color={active.color}/>
            </span>
            <span className="inm0-desc__name" style={{color:active.color}}>{active.name}</span>
            <span className="inm0-desc__sep">—</span>
            <span className="inm0-desc__text">{active.desc}</span>
          </>
        ) : (
          <span className="inm0-desc__hint">Click a node to explore</span>
        )}
      </div>
    </div>
  );
}

// ─── IfaNum 0+8D Section ──────────────────────────────────────────────────────

function IfaNum0Plus8DSection() {
  const [slide, setSlide] = useState(0);
  const labels = ['IfaNum STEAMSEX Matrix', 'IfaNum SIDECHRX Matrix'];
  return (
    <section id="ifanum-0plus8d" className="oo-section oo-section--alt">
      <div className="oo-container">
        <div className="oo-eyebrow">IfaNum 0+8D Matrix · IfaSlider · OnkaLang</div>
        <h2 className="oo-section-title">The IfaNum Matrix (Featuring IfaSlider)</h2>
        <p className="oo-section-sub">
          The Ifanum{' '}
          <IfaNumOgbe sym="n" symSize="1rem" iconSize={10} color="var(--t1)"/>{' '}
          at the Centre, with its 8 Dimensions radiating outward.
          Use the <strong>IfaSlider</strong> to switch between the two 0+8D Matrices.
          Click any Node to explore its Dimension.
        </p>

        <div className="inm0-slider">
          {labels.map((label, i) => (
            <button key={i}
              className={`inm0-slider__tab${slide === i ? ' inm0-slider__tab--active' : ''}`}
              onClick={() => setSlide(i)}>
              {label}
            </button>
          ))}
        </div>

        <div className="inm0-matrix-title">{labels[slide]}</div>

        {slide === 0
          ? <IfaNumRadialMatrix key="steamsex" dims={STEAMSEX_DIMS} variant="steamsex"/>
          : <IfaNumRadialMatrix key="sidechrx" dims={SIDECHRX_DIMS} variant="sidechrx"/>}
      </div>
    </section>
  );
}

function OdeOnkaFooter() {
  return (
    <footer className="oo-footer">
      <div className="oo-footer__inner oo-container">
        <span>
          Part of <a href="../">IFA Number</a>{' · '}
          <a href="https://ifainternet.org" target="_blank" rel="noopener noreferrer">The IFA Internet</a>{' · '}
          <a href="https://cenproject.org" target="_blank" rel="noopener noreferrer">CENProject</a>
        </span>
        <span className="oo-footer__axiom">"Consciousness-Energy (CEN) is everything that really exists."</span>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

function App() {
  const [introDone, setIntroDone] = useState(false);
  return (
    <>
      {!introDone && <IntroOverlay onDone={() => setIntroDone(true)} />}
      <div className={`oo-page${introDone ? ' oo-page--in' : ''}`} aria-hidden={!introDone}>
        <OdeOnkaHeader />
        <main>
          <HeroSection />
          <NumberKindsSection />
          <IfaNumbersSection />
          <OrisaNumbersSection />
          <IfaNumMatrixSection />
          <IfaNum0Plus8DSection />
        </main>
        <OdeOnkaFooter />
      </div>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
