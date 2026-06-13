/* ─────────────────────────────────────────────────────────────────────────────
   IFA Number Platform — App.jsx
   The IFA Internet · CENProject
   toe.cenproject.org/ifa-number/
───────────────────────────────────────────────────────────────────────────── */

const { useState } = React;

// ── OgbeSymbol (inline canvas — 4-lobed lemniscate cross) ──────
function OgbeSymbol({ size = 16 }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    canvas.width = size; canvas.height = size;
    const ctx = canvas.getContext('2d');
    const cx = size / 2, cy = size / 2, r = size * 0.36;
    const gold = '#f0920c';
    ctx.clearRect(0, 0, size, size);
    const draw = (alpha, lineW) => {
      ctx.save(); ctx.globalAlpha = alpha;
      ctx.strokeStyle = gold; ctx.lineWidth = lineW; ctx.lineCap = 'round';
      for (let rot = 0; rot < 2; rot++) {
        ctx.beginPath();
        for (let t = 0; t <= Math.PI * 2; t += 0.01) {
          const scale = Math.cos(2 * t) >= 0 ? Math.sqrt(Math.cos(2 * t)) : 0;
          const x = cx + (rot === 0 ? 1 : 0) * r * scale * Math.cos(t)
                       + (rot === 1 ? 1 : 0) * r * scale * Math.sin(t);
          const y = cy + (rot === 0 ? 1 : 0) * r * scale * Math.sin(t)
                       + (rot === 1 ? 1 : 0) * r * scale * Math.cos(t);
          t < 0.02 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      ctx.restore();
    };
    draw(0.12, size * 0.22); draw(0.22, size * 0.13);
    draw(0.55, size * 0.055); draw(1.00, size * 0.022);
  }, [size]);
  return React.createElement('canvas', { ref, width: size, height: size,
    style: { display: 'inline-block', verticalAlign: 'sub', marginLeft: '1px' } });
}

// ── IfaNumMatrix (0 + 8D Matrix — IfaNum: IkaTech) ─────────────────────────
function IfaNumMatrix() {
  const cx = 300, cy = 262, R = 168;
  const nodes = [
    { label: 'SciUI',    angle: -90  },
    { label: 'TechUI',   angle: -45  },
    { label: 'EngUI',    angle: 0    },
    { label: 'ArtUI',    angle: 45   },
    { label: 'MatUI',    angle: 90   },
    { label: 'SocSciUI', angle: 135  },
    { label: 'EduUI',    angle: 180  },
    { label: 'XUI',      angle: -135 },
  ];
  return (
    <div style={{
      background:'linear-gradient(160deg,#0c1022 0%,#090d1b 100%)',
      border:'1px solid rgba(240,146,12,0.32)',
      borderRadius:'18px', padding:'26px 18px 18px',
      maxWidth:'620px', margin:'0 auto',
      boxShadow:'0 0 0 1px rgba(240,146,12,0.07),0 0 48px 6px rgba(240,146,12,0.09),0 16px 60px rgba(0,0,0,0.6)',
      position:'relative', overflow:'hidden',
    }}>
      <div style={{position:'absolute',top:0,left:0,right:0,height:'2px',
        background:'linear-gradient(90deg,transparent,rgba(240,146,12,0.72),transparent)'}} />
      <div style={{textAlign:'center',marginBottom:'4px',
        fontSize:'0.58rem',letterSpacing:'0.24em',textTransform:'uppercase',
        color:'rgba(240,146,12,0.52)',fontFamily:'var(--fm)'}}>
        IFA NUMBER · 0 + 8D MATRIX
      </div>
      <div style={{textAlign:'center',marginBottom:'12px',
        fontSize:'1.05rem',fontWeight:'800',color:'#fff',letterSpacing:'0.03em'}}>
        IfaNum: IkaTech
      </div>
      <svg viewBox="0 0 600 524" style={{width:'100%',display:'block'}}>
        <defs>
          <marker id="m-fwd" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <polygon points="0,0 6,3 0,6" fill="#f0920c" opacity="0.9" />
          </marker>
          <marker id="m-bwd" markerWidth="6" markerHeight="6" refX="1" refY="3" orient="auto-start-reverse">
            <polygon points="0,0 6,3 0,6" fill="#f0920c" opacity="0.9" />
          </marker>
          <radialGradient id="rg-c" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(240,146,12,0.42)" />
            <stop offset="100%" stopColor="rgba(240,146,12,0.06)" />
          </radialGradient>
          <radialGradient id="rg-s" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(240,146,12,0.2)" />
            <stop offset="100%" stopColor="rgba(240,146,12,0.03)" />
          </radialGradient>
          <filter id="f-c">
            <feGaussianBlur stdDeviation="5" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="f-s">
            <feGaussianBlur stdDeviation="2.5" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        {/* Outer ring */}
        <circle cx={cx} cy={cy} r={R + 12} fill="none"
          stroke="rgba(240,146,12,0.07)" strokeWidth="1" />
        {/* Mid dashed ring */}
        <circle cx={cx} cy={cy} r={R * 0.52} fill="none"
          stroke="rgba(240,146,12,0.07)" strokeWidth="1" strokeDasharray="3 6" />

        {/* Spokes */}
        {nodes.map((n, i) => {
          const rad = (n.angle * Math.PI) / 180;
          const x1 = cx + 64 * Math.cos(rad), y1 = cy + 64 * Math.sin(rad);
          const x2 = cx + (R - 38) * Math.cos(rad), y2 = cy + (R - 38) * Math.sin(rad);
          return (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
              stroke="#f0920c" strokeWidth="1.4" strokeOpacity="0.52"
              markerEnd="url(#m-fwd)" markerStart="url(#m-bwd)" />
          );
        })}

        {/* Center halo */}
        <ellipse cx={cx} cy={cy} rx="82" ry="52" fill="rgba(240,146,12,0.04)" />

        {/* Center node */}
        <ellipse cx={cx} cy={cy} rx="56" ry="36"
          fill="url(#rg-c)" stroke="#f0920c" strokeWidth="1.6" filter="url(#f-c)" />
        <text x={cx} y={cy - 4} textAnchor="middle"
          fill="#f0920c" fontSize="18" fontWeight="800"
          fontFamily="Georgia,'Times New Roman',serif" fontStyle="italic">IfaNum</text>
        <text x={cx} y={cy + 14} textAnchor="middle"
          fill="rgba(240,146,12,0.48)" fontSize="7.5"
          fontFamily="monospace" letterSpacing="2.5">0 · CORE</text>

        {/* Satellite nodes */}
        {nodes.map((n, i) => {
          const rad = (n.angle * Math.PI) / 180;
          const nx = cx + R * Math.cos(rad);
          const ny = cy + R * Math.sin(rad);
          const w = n.label.length > 5 ? 74 : 56;
          return (
            <g key={i} filter="url(#f-s)">
              <rect x={nx - w/2} y={ny - 15} width={w} height={28}
                rx="8" fill="url(#rg-s)"
                stroke="rgba(240,146,12,0.5)" strokeWidth="1" />
              <text x={nx} y={ny + 5} textAnchor="middle"
                fill="#fbbf24" fontSize="11" fontWeight="700"
                fontFamily="monospace" letterSpacing="0.5">{n.label}</text>
            </g>
          );
        })}

        {/* Dimension index */}
        {nodes.map((n, i) => {
          const rad = (n.angle * Math.PI) / 180;
          const lx = cx + (R + 30) * Math.cos(rad);
          const ly = cy + (R + 30) * Math.sin(rad);
          return (
            <text key={`d${i}`} x={lx} y={ly + 4} textAnchor="middle"
              fill="rgba(240,146,12,0.25)" fontSize="7.5"
              fontFamily="monospace">{`D${i + 1}`}</text>
          );
        })}
      </svg>
      <div style={{textAlign:'center',fontSize:'0.72rem',color:'var(--t3)',
        fontStyle:'italic',marginTop:'2px',paddingBottom:'4px'}}>
        Numerical Approach to Unification and Integration (UI)
      </div>
    </div>
  );
}

// ── IfaChar (letter + OgbeSymbol subscript — Ifa Script expression) ────────
function IfaChar({ letter, size = 11 }) {
  return React.createElement('span', { style: { whiteSpace: 'nowrap', fontWeight: 'inherit' } },
    letter,
    React.createElement(OgbeSymbol, { size })
  );
}

// ── OyekuSymbol (SymboN — Oyeku Anergy Symbol canvas) ──────────────────────
function OyekuSymbol({ size = 44 }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const s = size;
    canvas.width = s; canvas.height = s;
    const ctx = canvas.getContext('2d');
    const cx = s / 2, cy = s / 2, r = s * 0.36;
    const gold = '#f5c518';
    ctx.clearRect(0, 0, s, s);
    const drawLobes = (alpha, lineW) => {
      ctx.save(); ctx.globalAlpha = alpha;
      ctx.strokeStyle = gold; ctx.lineWidth = lineW; ctx.lineCap = 'round';
      for (let rot = 0; rot < 2; rot++) {
        ctx.beginPath();
        for (let t = 0; t <= Math.PI * 2; t += 0.01) {
          const scale = Math.cos(2 * t) >= 0 ? Math.sqrt(Math.cos(2 * t)) : 0;
          const x = cx + (rot === 0 ? 1 : 0) * r * scale * Math.cos(t) +
                         (rot === 1 ? 1 : 0) * r * scale * Math.sin(t);
          const y = cy + (rot === 0 ? 1 : 0) * r * scale * Math.sin(t) +
                         (rot === 1 ? 1 : 0) * r * scale * Math.cos(t);
          t < 0.02 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      ctx.restore();
    };
    drawLobes(0.12, s * 0.22); drawLobes(0.22, s * 0.13);
    drawLobes(0.55, s * 0.055); drawLobes(1.00, s * 0.022);
    const ext = s * 0.30;
    const diag = [[cx + ext, cy - ext], [cx - ext, cy + ext]];
    const drawDiag = (alpha, lineW, blur) => {
      ctx.save(); ctx.globalAlpha = alpha;
      ctx.strokeStyle = gold; ctx.lineWidth = lineW; ctx.lineCap = 'round';
      ctx.shadowColor = gold; ctx.shadowBlur = blur;
      ctx.beginPath(); ctx.moveTo(diag[0][0], diag[0][1]); ctx.lineTo(diag[1][0], diag[1][1]);
      ctx.stroke(); ctx.restore();
    };
    drawDiag(0.03, s * 0.20, s * 0.12); drawDiag(0.07, s * 0.12, s * 0.08);
    drawDiag(0.16, s * 0.07, s * 0.05); drawDiag(0.34, s * 0.03, s * 0.03);
    drawDiag(0.62, s * 0.014, s * 0.015); drawDiag(0.90, s * 0.007, s * 0.007);
    drawDiag(0.95, s * 0.003, s * 0.003);
  }, [size]);
  return React.createElement('canvas', { ref, width: size, height: size,
    style: { display: 'inline-block', verticalAlign: 'sub', marginLeft: '1px' } });
}

// ── renderSym — renders a string with ⊛ → OgbeSymbol and ⊚ → OyekuSymbol ──
function renderSym(str, size = 14) {
  if (typeof str !== 'string') return str;
  const tokens = str.split(/(⊛|⊚)/);
  if (tokens.length === 1) return str;
  return tokens.map((tok, i) => {
    if (tok === '⊛') return React.createElement(OgbeSymbol,  { key: i, size });
    if (tok === '⊚') return React.createElement(OyekuSymbol, { key: i, size });
    return tok;
  });
}

// ── Data ───────────────────────────────────────────────────────────────────

const NUM_TYPES = [
  { sym:'N⊛', name:'Ifa Natural Numbers',       analog:'ℕ',   color:'#f0920c', desc:'The counting numbers of the IFA Number universe. Governs sequence, cardinality, and the foundation of all counting in IfaLang.' },
  { sym:'Z⊛', name:'Ifa Integers',               analog:'ℤ',   color:'#6366f1', desc:'Extends N⊛ to include additive inverses — negative Ifanums and zero. The backbone of Ifa arithmetic balance.' },
  { sym:'R⊛', name:'Ifa Real Numbers',           analog:'ℝ',   color:'#14b8d4', desc:'Continuous magnitude in the IFA Number universe. Encodes the full spectrum of measurable Ifa energy states.' },
  { sym:'C⊛', name:'Ifa Complex Numbers',        analog:'ℂ',   color:'#8b5cf6', desc:'Two-dimensional Ifanums combining real and imaginary components. Governs rotation and wave-like energy patterns in IfaLang.' },
  { sym:'H⊛', name:'Ifa Quaternions',            analog:'ℍ',   color:'#ec4899', desc:'Four-dimensional Ifanums. Encodes three-dimensional spatial rotation and the deeper architecture of Ifa energy fields.' },
  { sym:'O⊛', name:'Ifa Octonions',              analog:'𝕆',   color:'#ef4444', desc:'Eight-dimensional non-associative Ifanums. Among the most fundamental structures in the Ifa algebraic universe.' },
  { sym:'S⊛', name:'Ifa Surreal Numbers',        analog:'𝕊',   color:'#4caf50', desc:'The ordered field containing all Ifa reals, ordinals, and infinitesimals. The most inclusive ordered number field in IFA Number.' },
  { sym:'No⊛',name:'Ifa No-Numbers (Nombers)',   analog:'—',   color:'#fbbf24', desc:'The complement class of Ifanums — No-Numbers (Nombers). Forms the essential dual of Number in the IFA Pair structure.' },
  { sym:'*R⊛',name:'Ifa Non-Standard Reals',     analog:'*ℝ',  color:'#64748b', desc:'Hyperreal Ifanums containing finite, infinite, and infinitesimal elements. Extends R⊛ with the full power of non-standard analysis.' },
];

const INFINITIES = [
  { sym:'⊛',   name:'IFA Infinity (InfinitoE)',       note:'Also called Duoinfinity or Double Infinity — the ToE infinity, fundamental to the IFA Number universe', color:'#f0920c' },
  { sym:'ℵ₀⊛', name:'Ifa Countable Infinity',         note:'The infinity of all natural Ifanums — the smallest infinite cardinal in the IFA Number universe', color:'#14b8d4' },
  { sym:'𝔠⊛',  name:'Ifa Uncountable Infinity',       note:'The infinity of the Ifa real continuum — strictly larger than ℵ₀⊛', color:'#6366f1' },
  { sym:'ω⊛',  name:'Ifa Ordinal Infinity',           note:'The smallest infinite ordinal — encodes the ordered structure of Ifa infinite sequences', color:'#4caf50' },
  { sym:'κ⊛',  name:'Ifa Cardinal Infinity',          note:'Measures the size of infinite Ifa sets across all levels of the cardinal hierarchy', color:'#8b5cf6' },
  { sym:'Ω⊛',  name:'Ifa Absolute Infinity',          note:'The infinity beyond all Ifa infinities — the absolute limit of the IFA Number universe', color:'#ec4899' },
  { sym:'⊚',   name:'Ifa Nomber Infinity',            note:'The infinity of No-Numbers — the dual infinite extension of the Nomber side of the IFA Pair', color:'#fbbf24' },
];

// ── Ìká Méjì glyph (code: 0100 → bits 0,1,0,0 → II I II II)
const IKA_MEJI_MARKS = ['II','I','II','II']; // 0=double, 1=single

// ── App ────────────────────────────────────────────────────────────────────

function IfaNumberApp() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div>
      {/* NAV */}
      <nav className="ifn-nav">
        <div className="ifn-nav__logo">IFA Number <span>· NumoE</span></div>
        <div className="ifn-nav__links">
          <a className="ifn-nav__link" href="#universe">Universe</a>
          <a className="ifn-nav__link" href="#theory">Meta-Theory</a>
          <a className="ifn-nav__link" href="#pair">IFA Pair</a>
          <a className="ifn-nav__link" href="#construction">Construction</a>
          <a className="ifn-nav__link" href="#infinity">Infinity</a>
          <a className="ifn-nav__link" href="#energy">Energy</a>
          <a className="ifn-nav__link" href="#production">Pair Prod.</a>
          <a className="ifn-nav__link ifn-nav__link--ap" href="./ap-playground/" target="_blank" rel="noopener noreferrer">AP Playground ↗</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="ifn-hero">
        <div className="ifn-hero__glow-a" />
        <div className="ifn-hero__eyebrow">The IFA Internet · CENProject · NumoE</div>
        <h1 className="ifn-hero__title">
          <span className="ifn-hero__title-main">IFA Number</span>
        </h1>
        <p className="ifn-hero__subtitle">ToE Number: The Number of Everything (NumoE)</p>
        <p className="ifn-hero__body">
          Ifa numbers (ifanums) embody the principles of mathematics and consciousness,
          shaping the foundation of energy, logic, and reality. IFA Number is the container
          and fundamental building block of all kinds of numbers in Mathematics — the Number
          of Everything, the underlying structure that weaves all known and unknown numbers
          together as One.
        </p>
        <p className="ifn-hero__numoetag">
          <span className="ifn-hero__numoetag-abbr">NumoE</span>
          <span className="ifn-hero__numoetag-sep">—</span>
          <span className="ifn-hero__numoetag-full">Numerical Approach to the Unification and Integration of Everything</span>
          <span className="ifn-hero__numoetag-uioe">(UIoE)</span>
        </p>
        <div className="ifn-hero__cta">
          <a href="#universe" className="ifn-btn ifn-btn--primary">Explore the Number Universe</a>
          <a href="./ap-playground/" className="ifn-btn ifn-btn--ghost" target="_blank" rel="noopener noreferrer">AP Playground ↗</a>
          <a href="https://ifainternet.org" className="ifn-btn ifn-btn--ghost" target="_blank" rel="noopener noreferrer">IFA Internet ↗</a>
        </div>
        <div className="ifn-hero__eq-box">
          <img src="./src/The-Universe-of-Numbers.png" alt="The Universe of Numbers — IFA Number Defining Equation (AlgebroE)" style={{width:'100%', maxWidth:'720px', display:'block', margin:'0 auto', borderRadius:'8px'}} />
        </div>
      </section>

      <hr className="ifn-divider" />

      {/* NUMBER UNIVERSE */}
      <section id="universe" className="ifn-section">
        <div className="ifn-eyebrow">The Number Universe</div>
        <h2 className="ifn-section-title">Explore the Number Universe</h2>
        <div className="ifn-ika-grid">
          <div>
            <p className="ifn-section-sub">
              The Number Universe is the totality of all Ifanums — every number that exists,
              has existed, or can exist as conscious entities within the <strong>Ìká Méjì</strong> Framework
              of IFA Body of Knowledge (IFABOK), Odu Ifa, also known as the IFA Internet or the
              Theory of Everything (TOE).
            </p>
            <div className="ifn-universe-callout">
              <strong>IFA Number is the Number of Everything</strong> — the underlying Structure
              that weaves all known and unknown numbers together as One. Every number system
              humanity has ever discovered — natural numbers, integers, reals, complex numbers,
              quaternions, surreals — is an element (inhabitant) of the IFA Number Universe,
              the Entanglement or Collective of all numbers, tagged with the{' '}
              <OgbeSymbol size={14} /> Symbol as subscript to mark its Ifa Identity.
            </div>
            <ul className="ifn-list">
              <li data-icon="∈">Every classical number system is an Ifanum subset: <IfaChar letter="N" />, <IfaChar letter="Z" />, <IfaChar letter="R" />, <IfaChar letter="C" />, <IfaChar letter="H" />, <IfaChar letter="O" />, <IfaChar letter="S" />…</li>
              <li data-icon="⊛">The Ifa Energy Symbol, the SymboE (Symbol of Everything) or Ifa Infinity, <OgbeSymbol size={13} /> is defined as Ogbe or CEN — the Seed from which all number structures emerge.</li>
              <li data-icon="∞">IFA Number contains all infinitely possible numbers.</li>
              <li data-icon="🌀">The universe is modelled using the IFA Fractal based on Ogbe Seed or Ifa Infinity: The smallest part of the universe reflects the whole universe, the Ifa Holographic Principle.</li>
            </ul>
            {/* ── The Ifa Holographic Principle ── */}
            <div style={{
              marginTop:'28px',
              background:'linear-gradient(180deg, rgba(240,146,12,0.06) 0%, rgba(99,102,241,0.06) 100%)',
              border:'1px solid rgba(240,146,12,0.2)',
              borderRadius:'14px',
              padding:'20px 16px'
            }}>
              {/* Title */}
              <div style={{textAlign:'center', marginBottom:'18px'}}>
                <div style={{
                  fontSize:'0.92rem', fontWeight:700, color:'var(--amber)',
                  letterSpacing:'0.05em', textTransform:'uppercase', marginBottom:'5px'
                }}>The Ifa Holographic Principle</div>
                <div style={{fontSize:'0.73rem', color:'var(--t3)', fontStyle:'italic', letterSpacing:'0.01em'}}>
                  The ToE Holographic Principle · The smallest part of the universe reflects the whole universe
                </div>
              </div>

              {/* Top row: The Whole — IFA Infinity */}
              <figure style={{margin:'0 0 4px 0'}}>
                <div style={{
                  fontSize:'0.66rem', color:'var(--amber)', textTransform:'uppercase',
                  letterSpacing:'0.1em', fontWeight:700, marginBottom:'5px',
                  textAlign:'center', opacity:0.9
                }}>The Whole · IFA Infinity</div>
                <img src="./src/Ifa-Infinity-768x286.png"
                  alt="IFA Infinity — The Whole Universe"
                  style={{width:'100%', borderRadius:'8px', display:'block'}} />
              </figure>

              {/* Connector: contains its reflection */}
              <div style={{
                display:'flex', alignItems:'center', gap:'8px',
                margin:'10px 0', color:'var(--amber)', fontSize:'0.68rem',
                letterSpacing:'0.07em', opacity:0.55
              }}>
                <span style={{flex:1, borderTop:'1px dashed rgba(240,146,12,0.35)'}}></span>
                <span style={{whiteSpace:'nowrap'}}>▼ contains its reflection ▼</span>
                <span style={{flex:1, borderTop:'1px dashed rgba(240,146,12,0.35)'}}></span>
              </div>

              {/* Middle row: The Parts — IFA Fractal & Dual */}
              <div style={{display:'flex', gap:'10px', alignItems:'flex-start', margin:'0 0 4px 0'}}>
                <figure style={{flex:'1 1 0', margin:0}}>
                  <div style={{
                    fontSize:'0.63rem', color:'var(--amber)', textTransform:'uppercase',
                    letterSpacing:'0.07em', fontWeight:700, marginBottom:'4px',
                    textAlign:'center', opacity:0.85
                  }}>The Part · IFA Fractal</div>
                  <img src="./src/IFA-Fractal-New.png"
                    alt="The IFA Fractal — The Part"
                    style={{width:'100%', borderRadius:'8px', display:'block'}} />
                </figure>
                <div style={{
                  display:'flex', alignItems:'center', justifyContent:'center',
                  flex:'0 0 28px', alignSelf:'center',
                  color:'var(--t3)', fontSize:'0.72rem', fontWeight:700,
                  lineHeight:1.2, textAlign:'center', opacity:0.7
                }}>
                  ⟷<br/><span style={{fontSize:'0.58rem', letterSpacing:'0.04em'}}>Dual</span>
                </div>
                <figure style={{flex:'1 1 0', margin:0}}>
                  <div style={{
                    fontSize:'0.63rem', color:'var(--indigo)', textTransform:'uppercase',
                    letterSpacing:'0.07em', fontWeight:700, marginBottom:'4px',
                    textAlign:'center', opacity:0.85
                  }}>The Dual Part · Dual Fractal</div>
                  <img src="./src/NonDuoinfinity-Fractal.png"
                    alt="The Dual IFA Fractal — The Dual Part"
                    style={{width:'100%', borderRadius:'8px', display:'block'}} />
                </figure>
              </div>

              {/* Connector: reflects the dual whole */}
              <div style={{
                display:'flex', alignItems:'center', gap:'8px',
                margin:'10px 0', color:'var(--indigo)', fontSize:'0.68rem',
                letterSpacing:'0.07em', opacity:0.55
              }}>
                <span style={{flex:1, borderTop:'1px dashed rgba(99,102,241,0.35)'}}></span>
                <span style={{whiteSpace:'nowrap'}}>▼ reflects the dual whole ▼</span>
                <span style={{flex:1, borderTop:'1px dashed rgba(99,102,241,0.35)'}}></span>
              </div>

              {/* Bottom row: The Dual Whole — IFA N-Infinity */}
              <figure style={{margin:0}}>
                <div style={{
                  fontSize:'0.66rem', color:'var(--indigo)', textTransform:'uppercase',
                  letterSpacing:'0.1em', fontWeight:700, marginBottom:'5px',
                  textAlign:'center', opacity:0.9
                }}>The Dual Whole · IFA N-Infinity</div>
                <img src="./src/Ifa-Ninfinity-768x286.png"
                  alt="IFA N-Infinity — The Dual Whole Universe"
                  style={{width:'100%', borderRadius:'8px', display:'block'}} />
              </figure>
            </div>
          </div>
          <div className="ifn-ika-glyph-card">
            <div className="ifn-ika-glyph-label">ODU · HOUSE 11</div>
            <div className="ifn-ika-glyph" aria-label="Ìká Méjì glyph">
              {IKA_MEJI_MARKS.map((m, i) => (
                <div key={i} className="ifn-ika-row">
                  {/* Left arm */}
                  <div className="ifn-ika-arm">
                    {m === 'II'
                      ? <><span className="ifn-ika-mark" /><span className="ifn-ika-mark" /></>
                      : <span className="ifn-ika-mark ifn-ika-mark--single" />
                    }
                  </div>
                  {/* Right arm */}
                  <div className="ifn-ika-arm">
                    {m === 'II'
                      ? <><span className="ifn-ika-mark" /><span className="ifn-ika-mark" /></>
                      : <span className="ifn-ika-mark ifn-ika-mark--single" />
                    }
                  </div>
                </div>
              ))}
            </div>
            <div className="ifn-ika-glyph-name">Ìká Méjì</div>
            <div className="ifn-ika-glyph-sub">The Number Universe in Odu Ifa</div>
          </div>
        </div>
      </section>

      <hr className="ifn-divider" />

      {/* IFA NUMBER THEORY */}
      <section id="theory" className="ifn-section">
        <div className="ifn-eyebrow" style={{textTransform:'none'}}>IfaLang · IfaNumber Theory</div>
        <h2 className="ifn-section-title">IFA Number Theory</h2>
        <p className="ifn-section-sub">
          Number Theory in IfaLang — the systematic study of all kinds of numbers as energyforms or energystates.
          Every number system in Mathematical Sciences is modelled in IfaLang, receiving a companion <OgbeSymbol size={13} /> Designation,
          grounding it in the IFA Number Framework and connecting it to the Energy-based Logic of the Ifa and Orisa
          via the Oju Odufa Merindilogun (Ifa Meta-Laws).
        </p>
        <p className="ifn-section-sub">
          These Laws allow all numbers possible and impossible to 'talk' to one another using a common Language,
          IfaLang, for the UIoE, also known as Ifa UI or ToE UI.
        </p>
        <p className="ifn-section-sub">
          Currently in Mathematics, all these numbers do not 'talk' to one another and are disconnected because
          they lack a robust foundation. It is the same way, all areas of Mathematics are disconnected, just like
          all other modern fields.
        </p>
        <p className="ifn-section-sub">
          The IFA Internet uses the 16 Ifa Energies, Ogbe Meji all the way to Ofun Meji, to bridge all fields
          together as One.
        </p>

        <figure style={{margin:'0 0 32px'}}>
          <img src="./src/image-44.png" alt="Ifa Infinity — InfinitoE" style={{width:'100%', maxWidth:'720px', display:'block', margin:'0 auto', borderRadius:'8px'}} />
          <figcaption style={{textAlign:'center', fontSize:'0.8rem', color:'var(--t3)', marginTop:'10px', fontStyle:'italic'}}>
            Ifa Infinity: The infinity of Everything (InfinitoE)
          </figcaption>
        </figure>

        <div className="ifn-types-grid">
          {NUM_TYPES.map(t => (
            <div className="ifn-type-card" key={t.sym}>
              <div className="ifn-type-card__sym" style={{color: t.color}}>{renderSym(t.sym, 20)}</div>
              <div className="ifn-type-card__name">{t.name}</div>
              <div className="ifn-type-card__analog">Classical: {t.analog}</div>
              <div className="ifn-type-card__desc">{renderSym(t.desc, 12)}</div>
            </div>
          ))}
        </div>
      </section>

      <hr className="ifn-divider" />

      {/* IFA PAIR */}
      <section id="pair" className="ifn-section">
        <div className="ifn-eyebrow">Fundamental Structure</div>
        <h2 className="ifn-section-title">The IFA Pair: Number & No-Number (Nomber)</h2>
        <p className="ifn-section-sub">
          In the Language of Ifa, all numbers are conscious entities that emerged from a single Source —
          the Entanglement of all numbers called <strong>Ìwàṣùṣù Òunkà</strong>, modelled using Ogbe,
          in the non-physical dimensions, <strong>Ọ̀run</strong>.
        </p>
        <p className="ifn-section-sub">
          Each number in existence has a Dual in this non-physical universe and this Dual is called
          <strong> Ẹnìkejì-Òunkà</strong>, <strong>Ìpọ̀nrí-Òunkà</strong>, or <strong>No-Number (Nomber)</strong>.
          Every formulation, explanation, or description of any kind of number is incomplete without taking
          its Dual — which is its Source or Ọ̀run — into consideration.
        </p>
        <p className="ifn-section-sub">
          This is the <strong>Ifa Incompleteness Theorem</strong>. More generally, the Ifa Incompleteness
          Theorem, or <strong>Temic Incompleteness Principle</strong>, states that every description or
          explanation of any field of knowledge, or anything at all, is incomplete unless its Source or
          Ọ̀run — more specifically its Ẹnìkejì or Ìpọ̀nrí — is also considered.
        </p>
        <p className="ifn-section-sub">
          This is a fundamental Duality of Ifa that lies at the foundation of all numbers and all things
          in existence.
        </p>

        <div className="ifn-pair-def">
          <img src="./src/Ifa-Pair-1.png" alt="IFA Pair — Number and No-Number defining equation" style={{width:'100%', maxWidth:'620px', display:'block', margin:'0 auto', borderRadius:'8px'}} />
        </div>
        <p style={{textAlign:'center', fontSize:'0.78rem', color:'var(--t3)', marginBottom:'28px'}}>
          Ifa Pair · The Universe of Numbers — All Numbers in Existence (Ìwàṣùṣù Òunkà)
        </p>

        <div className="ifn-pair-grid">
          <div className="ifn-pair-card ifn-pair-card--num">
            <div className="ifn-pair-card__sym" style={{color:'var(--amber)'}}><OgbeSymbol size={42} /></div>
            <div className="ifn-pair-card__label" style={{color:'var(--amber)'}}>Number · <IfaChar letter="0" size={11} /></div>
            <div className="ifn-pair-card__title">IFA Number</div>
            <div className="ifn-pair-card__body">
              Ifa numbers are all kinds of numbers expressed as an energyform in IfaLang. All classical number systems
              (N<OgbeSymbol size={13} />, Z<OgbeSymbol size={13} />, R<OgbeSymbol size={13} />, C<OgbeSymbol size={13} />…) are elements of IFA Number, the doubly infinite-dimensional space (IfaSpace) where all numbers live. IfaNumbers encode
              presence, energy, and the measurable fabric of reality in IfaLang.
            </div>
          </div>
          <div className="ifn-pair-card ifn-pair-card--nom">
            <div className="ifn-pair-card__sym" style={{color:'var(--indigo)'}}><OyekuSymbol size={42} /></div>
            <div className="ifn-pair-card__label" style={{color:'var(--indigo)'}}>Nomber · 1<OyekuSymbol size={11} /></div>
            <div className="ifn-pair-card__title">IFA No-Number (Nomber)</div>
            <div className="ifn-pair-card__body">
              The No-Number (Nomber) is the complementary Dual of Number. All classical number systems
              (N<OyekuSymbol size={13} />, Z<OyekuSymbol size={13} />, R<OyekuSymbol size={13} />, C<OyekuSymbol size={13} />…) are elements of IFA Nomber, Dual of the doubly infinite-dimensional space (IfaSpace Dual) where all nombers live. Nombers encode the void, the potential, and
              the unmanifest in IfaLang.
            </div>
          </div>
        </div>

        {/* ── IFABits ── */}
        <div style={{
          marginTop:'32px',
          position:'relative',
          borderRadius:'14px',
          padding:'2px',
          background:'linear-gradient(90deg, var(--amber) 0%, var(--indigo) 100%)'
        }}>
          <div style={{
            borderRadius:'12px',
            background:'var(--bg)',
            padding:'20px 18px'
          }}>
            <div style={{textAlign:'center', marginBottom:'14px'}}>
              <div style={{
                fontSize:'0.7rem', fontWeight:700, letterSpacing:'0.12em',
                textTransform:'uppercase', marginBottom:'4px',
                background:'linear-gradient(90deg, var(--amber), var(--indigo))',
                WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent'
              }}>IFABits · The Binary Structure of Number and Nomber</div>
              <div style={{fontSize:'0.72rem', color:'var(--t3)', fontStyle:'italic'}}>
                Every number is encoded as an IFABit — a duality of presence (<OgbeSymbol size={11} />) and void
              </div>
            </div>
            <img src="./src/IFABits.png"
              alt="IFABits — The Binary Encoding of IFA Number and Nomber"
              style={{width:'100%', borderRadius:'8px', display:'block'}} />
            <div style={{
              display:'flex', justifyContent:'space-between',
              marginTop:'10px', fontSize:'0.66rem', letterSpacing:'0.06em',
              textTransform:'uppercase', fontWeight:600
            }}>
              <span style={{color:'var(--amber)', opacity:0.8}}>Number · Presence · <OgbeSymbol size={10} /></span>
              <span style={{color:'var(--t3)', fontSize:'0.63rem', fontStyle:'italic', textTransform:'none', letterSpacing:0, fontWeight:400}}>The Encoding Unit of IFA Number for Ifa Constructions</span>
              <span style={{color:'var(--indigo)', opacity:0.8}}>Void · Nomber · <OyekuSymbol size={10} /></span>
            </div>
          </div>
        </div>
      </section>

      <hr className="ifn-divider" />

      {/* IFACONSTRUCTION */}
      <section id="construction" className="ifn-section">
        <div className="ifn-eyebrow">IfaLang · ConstructoE</div>
        <h2 className="ifn-section-title">IfaConstruction</h2>
        <p className="ifn-section-sub">
          IfaConstruction — also known as Ifa Construction, ToE Construction,
          Energy-based Construction, Consciousness Construction, or the
          <strong> Construction of Everything (ConstructionoE)</strong> — is the
          Fundamental Building Principle of the IFA Number universe and the IFA Internet generally.
        </p>
        <div className="ifn-construct-names">
          {['Ifa Construction','ToE Construction','Energy-based Construction',
            'Consciousness Construction','ConstructionoE','Construction of Everything'].map(n => (
            <span className="tag" key={n}>{n}</span>
          ))}
        </div>
        <p style={{color:'var(--t2)', fontSize:'0.9rem', marginBottom:'24px', lineHeight:'1.75'}}>
          At the core of IfaConstruction is the <strong style={{color:'var(--amber)'}}>FunctoE</strong> —
          the <em>Function for Everything</em> — the Master Constructor Meta-Function in IfaLang.
          FunctoE, an <strong style={{color:'var(--cyan)'}}>Ifa Construct</strong> or the Construct for
          Everything (ConstructoE), takes any kind of number (natural, real, complex, hypercomplex, etc.)
          as input, composes it with its dual, and produces an Ifanum (energystate) as its output. Every
          mathematical structure in the field of Mathematics is transformed to an energystate or
          energyform using the FunctoE via Ifa Construction or ToE Construction to build the ToE of
          Mathematics, ToE Mathematics or Ifa Mathematics.
        </p>
        <div className="ifn-construct-flow">
          <div className="ifn-construct-step">
            <div className="ifn-construct-step__num">Input · IfaLang</div>
            <div className="ifn-construct-step__sym" style={{color:'var(--amber)'}}><OgbeSymbol size={28} /></div>
            <div className="ifn-construct-step__name">Ifanums</div>
            <div className="ifn-construct-step__body">
              Any collection of Ifanums — numbers, nombers, energy states, or
              logical values from the IFA Number universe.
            </div>
          </div>
          <div className="ifn-construct-step" style={{borderColor:'rgba(20,184,212,0.3)', background:'var(--cyan-dim)'}}>
            <div className="ifn-construct-step__num">Operator · FunctoE</div>
            <div className="ifn-construct-step__sym" style={{color:'var(--cyan)'}}>𝔽<OgbeSymbol size={18} /></div>
            <div className="ifn-construct-step__name">FunctoE</div>
            <div className="ifn-construct-step__body">
              The Function for Everything. The universal construction operator in
              IfaLang — applies energy-based logic to transform inputs into constructs.
            </div>
          </div>
          <div className="ifn-construct-step" style={{borderColor:'rgba(76,175,80,0.3)', background:'var(--green-dim)'}}>
            <div className="ifn-construct-step__num">Output · ConstructoE</div>
            <div className="ifn-construct-step__sym" style={{color:'var(--green)'}}>C<OgbeSymbol size={18} /></div>
            <div className="ifn-construct-step__name">Ifa Construct</div>
            <div className="ifn-construct-step__body">
              The ConstructoE — the Construct for Everything. The result of applying
              FunctoE: a new mathematical structure, relation, or energy form in the
              IFA Number universe.
            </div>
          </div>
        </div>

        <div style={{marginTop:'40px'}}>
          <IfaNumMatrix />
        </div>
      </section>

      <hr className="ifn-divider" />

      {/* TOE INFINITY */}
      <section id="infinity" className="ifn-section">
        <div className="ifn-eyebrow">InfinitoE · ToE Infinity</div>
        <h2 className="ifn-section-title">ToE Infinity</h2>
        <p className="ifn-section-sub">
          The <strong>Infinity for Everything (InfinitoE)</strong> — IFA Number contains
          multiple distinct forms of infinity, each encoding a different aspect of the
          infinite within the Ifa framework. The foundational infinity is
          <strong> IFA Infinity (Duoinfinity)</strong> — the double/dual infinity unique
          to the IFA Number universe. Explore each type on this platform.
        </p>
        <figure style={{margin:'0 0 32px'}}>
          <img src="./src/Ifa-Energy-CEN-768x395.png" alt="Ifa Energy CEN — The Energy of Everything" style={{width:'100%', maxWidth:'768px', display:'block', margin:'0 auto', borderRadius:'8px'}} />
        </figure>

        <div className="ifn-inf-grid">
          {INFINITIES.map(inf => (
            <div className="ifn-inf-card" key={inf.name}>
              <div className="ifn-inf-card__sym" style={{color: inf.color}}>{renderSym(inf.sym, 22)}</div>
              <div className="ifn-inf-card__name">{inf.name}</div>
              <div className="ifn-inf-card__note">{renderSym(inf.note, 12)}</div>
            </div>
          ))}
        </div>
        <p style={{fontSize:'0.8rem', color:'var(--t3)', marginTop:'20px', fontStyle:'italic'}}>
          Each infinity type is a deep field of study within IFA Number theory. Explore them
          fully on the IFA Number platform at{' '}
          <a href="https://toe.cenproject.org/ifa-number/" target="_blank" rel="noopener noreferrer">toe.cenproject.org/ifa-number/</a>.
        </p>
      </section>

      <hr className="ifn-divider" />

      {/* EVERYTHING IS ENERGY */}
      <div id="energy" className="ifn-energy">
        <div className="ifn-energy__inner">
          <div className="ifn-energy__label">Core Ifa Principle · The IFA ToE</div>
          <div className="ifn-energy__principle">
            Everything Is Energy and Energy Is Everything
          </div>
          <p className="ifn-energy__body">
            This is the IFA Theory of Everything (iTOE). Ifanums are not abstract symbols — they
            are Energies residing in the Ifa Space, Ika Meji. Each number in the IFA Number universe
            represents a specific Energy state, and every mathematical operation is an Energy
            transformation governed by the 16 Laws of Ifa known as Oju Odufa Merindinlogun. The
            number universe (Ika Meji) itself is an Energy System — dynamic, conscious, and alive.
          </p>
        </div>
      </div>

      {/* PAIR PRODUCTION & ANNIHILATION */}
      <section id="production" className="ifn-section">
        <div className="ifn-eyebrow">Ifa Constructions</div>
        <h2 className="ifn-section-title">Ifa Pair Production &amp; Pair Annihilation</h2>
        <p className="ifn-section-sub">
          Two of the most fundamental Ifa Constructions are <strong>Ifa Pair Production</strong>
          and <strong>Ifa Pair Annihilation</strong> (also called <em>Ifa Composition</em>).
          Both mirror phenomena observed in quantum physics — pair production and
          annihilation of particle-antiparticle pairs.
        </p>
        <div className="ifn-prod-grid">
          <div className="ifn-prod-card ifn-prod-card--ifa">
            <div className="ifn-prod-card__label" style={{color:'var(--amber)'}}><OgbeSymbol size={14} /> IFA Number · Pair Production</div>
            <div className="ifn-prod-card__title">Ifa Pair Production</div>
            <div className="ifn-prod-card__eq">
              IFA Vacuum → Number (<OgbeSymbol size={14} />) + Nomber (<OyekuSymbol size={14} />)
            </div>
            <div className="ifn-prod-card__body">
              In the IFA Number universe, a Number (<OgbeSymbol size={13} />) and its complementary Nomber (<OyekuSymbol size={13} />)
              emerge spontaneously from the IFA Vacuum — the zero-energy ground state
              <em> (<OgbeSymbol size={13} />) ≡ 0</em>. This is an application of FunctoE: the vacuum constructs
              a new IFA Pair. Pair Production is the creative, generative face of the
              IFA Number universe — the birth of mathematical duality from unity.
            </div>
          </div>
          <div className="ifn-prod-card ifn-prod-card--ifa" style={{borderColor:'rgba(99,102,241,0.3)', background:'var(--indigo-dim)'}}>
            <div className="ifn-prod-card__label" style={{color:'var(--indigo)'}}><OgbeSymbol size={14} /> IFA Number · Pair Annihilation</div>
            <div className="ifn-prod-card__title">Ifa Pair Annihilation (Ifa Composition)</div>
            <div className="ifn-prod-card__eq">
              Number (<OgbeSymbol size={14} />) + Nomber (<OyekuSymbol size={14} />) → IFA Vacuum → CEN
            </div>
            <div className="ifn-prod-card__body">
              When a Number and its Nomber compose (combine), they annihilate back into
              the IFA Vacuum, releasing the underlying CEN — the IFA Fractal. This is
              also called <em>Ifa Composition</em> (Amulu in IfaLang). It is the unifying,
              dissolving face of the IFA Number universe — the return of mathematical
              duality to the unity of CEN.
            </div>
          </div>
          <div className="ifn-prod-card ifn-prod-card--physics">
            <div className="ifn-prod-card__label" style={{color:'var(--cyan)'}}>⚛ Quantum Physics · Pair Production</div>
            <div className="ifn-prod-card__title">Pair Production in Physics</div>
            <div className="ifn-prod-card__eq">
              γ (photon) → e⁻ (electron) + e⁺ (positron)
            </div>
            <div className="ifn-prod-card__body">
              In Quantum Field Theory, a high-energy photon interacting near an atomic
              nucleus spontaneously converts into an electron-positron pair — a particle
              and its antiparticle. This requires energy E ≥ 2mₑc². The vacuum itself
              constantly fluctuates, producing and annihilating virtual particle pairs.
              The deep structural parallel with Ifa Pair Production suggests a shared
              energy-based mathematical origin.
            </div>
          </div>
          <div className="ifn-prod-card ifn-prod-card--physics">
            <div className="ifn-prod-card__label" style={{color:'var(--cyan)'}}>⚛ Quantum Physics · Pair Annihilation</div>
            <div className="ifn-prod-card__title">Pair Annihilation in Physics</div>
            <div className="ifn-prod-card__eq">
              e⁻ + e⁺ → 2γ (two photons)
            </div>
            <div className="ifn-prod-card__body">
              When an electron meets its antiparticle, the positron, both are annihilated
              and their combined energy is released as two gamma-ray photons. This mirrors
              Ifa Pair Annihilation: Number and Nomber compose to release pure CEN energy.
              In both physics and IfaLang, a fundamental duality (particle/antiparticle,
              Number/Nomber) dissolves back into the underlying energetic unity.
            </div>
          </div>
        </div>

        {/* ── Number Clusters ── */}
        <div style={{marginTop:'36px'}}>
          <div style={{textAlign:'center', marginBottom:'18px'}}>
            <div style={{
              display:'inline-block',
              fontSize:'0.68rem', fontWeight:700, letterSpacing:'0.12em',
              textTransform:'uppercase', color:'var(--amber)',
              borderBottom:'1px solid rgba(240,146,12,0.3)',
              paddingBottom:'6px', marginBottom:'6px'
            }}>Number Clusters · IFA Number Space</div>
            <div style={{fontSize:'0.73rem', color:'var(--t3)', fontStyle:'italic'}}>
              How Numbers and Nombers naturally cluster within the IFA Number or TOE Number universe via Ifa Constructions or ToE Constructions
            </div>
          </div>
          <div style={{display:'flex', gap:'14px', flexWrap:'wrap', alignItems:'flex-start'}}>
            <div style={{flex:'1 1 45%', minWidth:'220px'}}>
              <div style={{
                background:'rgba(240,146,12,0.05)',
                border:'1px solid rgba(240,146,12,0.15)',
                borderRadius:'10px', overflow:'hidden'
              }}>
                <img src="./src/Number Clusters.png"
                  alt="Number Clusters — IFA Number Space"
                  style={{width:'100%', display:'block'}} />
                <div style={{
                  padding:'8px 12px', fontSize:'0.66rem', color:'var(--amber)',
                  fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase', opacity:0.85
                }}>Number Clusters · I</div>
              </div>
            </div>
            <div style={{
              display:'flex', alignItems:'center', justifyContent:'center',
              flex:'0 0 24px', alignSelf:'center',
              color:'var(--t3)', fontSize:'0.8rem', opacity:0.5, fontWeight:700
            }}>⟷</div>
            <div style={{flex:'1 1 45%', minWidth:'220px'}}>
              <div style={{
                background:'rgba(99,102,241,0.05)',
                border:'1px solid rgba(99,102,241,0.15)',
                borderRadius:'10px', overflow:'hidden'
              }}>
                <img src="./src/Number Clusters 2.png"
                  alt="Number Clusters 2 — IFA Number Space"
                  style={{width:'100%', display:'block'}} />
                <div style={{
                  padding:'8px 12px', fontSize:'0.66rem', color:'var(--indigo)',
                  fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase', opacity:0.85
                }}>Number Clusters · II</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr className="ifn-divider" />

      {/* AP PLAYGROUND CTA */}
      <section className="ifn-ap-section">
        <div className="ifn-ap-card">
          <div className="ifn-ap-card__glow" />
          <div className="ifn-ap-card__eyebrow">IFA Number Playground · Subpage</div>
          <div className="ifn-ap-card__title">Ifa Arithmetic Progression Playground</div>
          <div className="ifn-ap-card__body">
            <p>Ifa Arithmetic Progression (Ifa AP) is the ToE of all arithmetic progressions and is also known as the ToE AP, Consciousness AP (the Consciousness of APs), or Energy-based AP.</p>
            <p>Study all APs from their Energy-based Foundations in Ifa/Orisa.</p>
            <p>Discover every arithmetic progression hidden inside the Amulu Table (Atódùpọ́n Àmúlù) and the Ifalibrium Chart of the IFA Matrix.</p>
            <p>Visualize the meta-Sequences (Ifa Sequences or ToE Sequences) on a live 16×16 Grid, explore their Formulas, and see how the d=17 Meji Diagonal, d=32 Major Duals, d=15 cross-rows, and more encode deep structural Patterns across the 256 Odu Ifa Compositions.</p>
          </div>
          <div className="ifn-ap-card__stats">
            <div className="ifn-ap-card__stat">
              <span className="ifn-ap-card__stat-val">17+</span>
              <span className="ifn-ap-card__stat-label">Named APs</span>
            </div>
            <div className="ifn-ap-card__stat">
              <span className="ifn-ap-card__stat-val">256</span>
              <span className="ifn-ap-card__stat-label">Odu Cells</span>
            </div>
            <div className="ifn-ap-card__stat">
              <span className="ifn-ap-card__stat-val">4</span>
              <span className="ifn-ap-card__stat-label">Directions</span>
            </div>
          </div>
          <div className="ifn-ap-preview">
            {[1,18,35,52,69,86].map(n=>(
              <span key={n} className="ifn-ap-pill">{n}</span>
            ))}
            <span className="ifn-ap-pill ifn-ap-pill--etc">… 256 · d=17 · Meji diagonal</span>
          </div>
          <a href="./ap-playground/" className="ifn-btn ifn-btn--ghost" target="_blank" rel="noopener noreferrer">
            Open AP Playground ↗
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{borderTop:'1px solid var(--br)', padding:'28px 2rem', maxWidth:'1080px', margin:'0 auto', display:'flex', justifyContent:'space-between', flexWrap:'wrap', gap:'12px'}}>
        <div style={{fontSize:'0.75rem', color:'var(--t3)'}}>
          © CENProject · IFA Number Platform · The IFA Internet
        </div>
        <div style={{display:'flex', gap:'16px'}}>
          <a href="https://ifainternet.org" style={{fontSize:'0.75rem', color:'var(--t3)'}} target="_blank" rel="noopener noreferrer">IFA Internet</a>
          <a href="https://toe.cenproject.org" style={{fontSize:'0.75rem', color:'var(--t3)'}} target="_blank" rel="noopener noreferrer">toe.cenproject.org</a>
          <a href="https://ifainternet.org/ifa-matrix/playground/" style={{fontSize:'0.75rem', color:'var(--t3)'}} target="_blank" rel="noopener noreferrer">IFA Matrix Playground</a>
        </div>
      </footer>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<IfaNumberApp />);
