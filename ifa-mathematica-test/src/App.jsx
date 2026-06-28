/* ─────────────────────────────────────────────────────────────────────────────
   IFA Mathematica — TOE Mathematica · IFABOK
   The IFA Internet · CENProject
   toe.cenproject.org/ifa-mathematics-toe-mathematics/
───────────────────────────────────────────────────────────────────────────── */

const { useState } = React;

// ─── SymboE — Ogbe Energy Symbol (Ifa Script) ────────────────────────────────

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

// ─── IfaExpr — Ifa Variable (character + SymboE subscript) ───────────────────

function IfaExpr({ char, charSize = '1.6rem', symSize = 11, charColor = 'var(--text)', tight = false }) {
  return (
    <span className="ifa-expr" style={tight ? { paddingRight: symSize + 'px' } : {}}>
      <span className="ifa-expr__char" style={{ fontSize: charSize, color: charColor }}>{char}</span>
      <span className="ifa-expr__sym" style={{ width: symSize, height: symSize, ...(tight ? { right: '0px', bottom: '0.2em' } : {}) }}>
        <OgbeSymbol size={symSize} />
      </span>
    </span>
  );
}

// ─── DATA ────────────────────────────────────────────────────────────────────

const ALIASES = [
  { label: 'IFABOK — IFA Body of Knowledge',         color: '#f5c518' },
  { label: 'TOE Mathematica',                        color: '#8b5cf6' },
  { label: 'MathematicoE — Mathematica of Everything', color: '#3b9eff' },
  { label: 'Consciousness Mathematics',              color: '#00c87c' },
  { label: 'Mathematics of Duoinfinities',           color: '#f0920c' },
  { label: 'Olodumare Mathematics',                  color: '#e040fb' },
];

const STATS = [
  { value: '256',  label: 'Odu Ifa',         sub: 'The Axiomatic Knowledge Matrix' },
  { value: '16',   label: 'Laws of Knowledge', sub: 'Principal Odu · LoKs · LawoE' },
  { value: 'CEN',  label: 'Unified Field',   sub: 'Consciousness · Energy · Nature' },
  { value: <OgbeSymbol size={52} />, label: 'Duoinfinities',   sub: 'Possibilities & Impossibilities' },
];

const AREAS = [
  {
    num: '01',
    title: 'IFA Mathematica',
    sub: 'TOE Mathematica · MathematicoE',
    body: 'IFA Mathematica is the foundational tool for integrating, unifying, and internetworking all fields of knowledge. It functions as the Base-Field and Core Structure of the IFA Internet (iTOE) — the mathematical substrate through which all knowledge disciplines are connected, studied, and advanced.',
    color: '#f5c518',
    sym: '∑',
  },
  {
    num: '02',
    title: 'IFAGebra',
    sub: 'IfAlgebras · ToEGebra',
    body: 'In Consciousness Mechanics, all fields of knowledge are modeled as metamathematical structures called Ifa Algebras. IFAGebra enables the scientific study of all disciplines — including arts, humanities, music, and drama — as algebraic knowledge structures governed by the 16 Principal Odu Ifa.',
    color: '#8b5cf6',
    sym: '⊗',
    varChar: 'A',
    link: 'https://ifainternet.org/ifa-mathematica/ifa-gebra/',
  },
  {
    num: '03',
    title: 'Consciousness Mechanics',
    sub: 'IFA Mechanics · ConMech',
    body: 'Consciousness Mechanics is the Standard Model of Mechanics for all fields and disciplines of knowledge. It generalizes all mechanics — Classical, Lagrangian, Hamiltonian, Relativistic, and Quantum — into a unified framework expressed through IFA Mathematics and the CEN Unified Field.',
    color: '#3b9eff',
    sym: 'Ψ',
  },
  {
    num: '04',
    title: 'Ifa Numbers (NumoEs)',
    sub: 'The Number System of Everything',
    body: 'Ifa Numbers (NumoEs) form the foundational number system of IFA Mathematics. They extend conventional number theory to encompass all dimensions of reality — grounding arithmetic, algebra, and analysis in the axiomatic structure of the 256 Odu Ifa.',
    color: '#00c87c',
    sym: 'ℕ',
    varChar: 'N',
  },
  {
    num: '05',
    title: 'The 16 Laws of Knowledge',
    sub: 'LOKs · LawoE · Ifa Axioms',
    body: 'The 16 Principal Odu Ifa are the Laws of Knowledge (LOKs) — the axiomatic foundation governing all fields of knowledge. Also known as the Laws of Everything (LawoE), Ifa Identities, TOE Axioms, and TOE Codes, they are the 16 irreducible principles through which all knowledge is unified.',
    color: '#f0920c',
    sym: '16',
  },
];

const FRAMEWORKS = [
  {
    sym: 'ℕ',
    varChar: 'N',
    title: 'Ifa Numbers',
    sub: 'NumoEs — Numbers of Everything',
    color: '#f5c518',
    body: 'Ifa Numbers (NumoEs) are the foundational numerical entities of IFA Mathematics — extending all conventional number systems into a unified framework that encompasses every dimension of reality. Every number in modern mathematics is a special case of an Ifa Number.',
  },
  {
    sym: '⊛',
    varChar: 'A',
    title: 'Ifa Algebras',
    sub: 'AlgebroEs — Algebras of Everything',
    color: '#8b5cf6',
    body: 'Ifa Algebras (AlgebroEs) are the metamathematical Structures that model all fields of knowledge as meta-algebraic systems. Every discipline — from Physics to Music to Drama — has a corresponding Ifa Algebra, enabling rigorous cross-field unification and study.',
  },
  {
    sym: 'ƒ',
    varChar: 'F',
    title: 'Ifa Functions',
    sub: 'FunctoEs — Functions of Everything',
    color: '#3b9eff',
    body: 'Ifa Functions (FunctoEs) govern the mappings and transformations between knowledge fields within IFA Mathematics. They describe how information, energy, and structure flow between disciplines — formalising the interconnections of the IFA Internet.',
  },
  {
    sym: 'Ô',
    varChar: 'O',
    title: 'Ifa Operators',
    sub: 'OpoEs — Operators of Everything',
    color: '#00c87c',
    body: 'Ifa Operators (OpoEs) are the fundamental operational elements of IFA Mathematics — acting on Ifa Numbers, Algebras, and Functions to produce transformations across all knowledge fields. They are the engine of IFA Mechanics and Consciousness Mathematics.',
  },
];

const ODU_16 = [
  { num: '01', name: 'Ejiogbe',    color: '#f5c518' },
  { num: '02', name: 'Oyeku Meji', color: '#8b5cf6' },
  { num: '03', name: 'Iwori Meji', color: '#3b9eff' },
  { num: '04', name: 'Odi Meji',   color: '#00c87c' },
  { num: '05', name: 'Irosun Meji',color: '#f0920c' },
  { num: '06', name: 'Owonrin Meji',color:'#e040fb' },
  { num: '07', name: 'Obara Meji', color: '#f5c518' },
  { num: '08', name: 'Okanran Meji',color:'#8b5cf6' },
  { num: '09', name: 'Ogunda Meji',color: '#3b9eff' },
  { num: '10', name: 'Osa Meji',   color: '#00c87c' },
  { num: '11', name: 'Ika Meji',   color: '#f0920c' },
  { num: '12', name: 'Oturupon Meji',color:'#e040fb'},
  { num: '13', name: 'Otura Meji', color: '#f5c518' },
  { num: '14', name: 'Irete Meji', color: '#8b5cf6' },
  { num: '15', name: 'Ose Meji',   color: '#3b9eff' },
  { num: '16', name: 'Ofun Meji',  color: '#00c87c' },
];

const CAPABILITIES = [
  {
    sym: '∑',
    title: 'Vast System, All Integrated',
    body: 'IFA Mathematica integrates every field of knowledge through a single Axiomatic Framework — the 256 Odu Ifa. Physics, Music, Engineering, Drama, every field — all unified under the same Mathematical Laws of Ifa and Orisa.',
    color: '#f5c518',
    label: 'Total Integration',
  },
  {
    sym: '16',
    title: 'Industrial-Strength Axiomatics',
    body: 'Grounded in the 16 Laws of Knowledge — the irreducible Axiomatic Foundation of Everything. Every theorem, formula, principle, knowledge field is based on these 16 Ifa Axioms (LOKs).',
    color: '#8b5cf6',
    label: 'Axiomatic Depth',
  },
  {
    sym: '⊗',
    title: 'Universal Knowledge Algebra',
    body: 'Through IFAGebra and the Ifa Algebras, every discipline becomes a rigorous metamathematical structure. Arts, Sciences, Humanities — all expressible as algebraic knowledge systems with Ifa Operators.',
    color: '#3b9eff',
    label: 'Meta-Algebraic',
  },
  {
    sym: 'Ψ',
    title: 'The Standard Model of Everything',
    body: 'Consciousness Mechanics generalizes Classical, Quantum, Relativistic, and all other mechanics into a unified Framework — expressed through BaseField, Ogbe Energy (Ogbenergy).',
    color: '#00c87c',
    label: 'Unified Mechanics',
  },
];

const STEPS = [
  {
    num: '01',
    title: 'Foundations of IFA Mathematics',
    body: 'Begin with the Foundational Framework — understanding the 16 Laws of Knowledge (LOKs), the Axiomatic Structure of the 256 Odu Ifa, and the CEN Unified Field as the Basis of all studies and research on the IFA Internet.',
    color: '#f5c518',
  },
  {
    num: '02',
    title: 'Exploring IFAGebra & Consciousness Mechanics',
    body: 'Engage with IFAGebra (Ifa Algebras) and Consciousness Mechanics — learning how all fields of knowledge are modeled as metamathematical structures and unified through the Standard Model of IFA Mechanics.',
    color: '#8b5cf6',
  },
  {
    num: '03',
    title: 'Mastering the Mathematical Frameworks',
    body: 'Advance into the Full Suite of IFA Mathematical Frameworks — Ifa Numbers (NumoEs), Ifa Functions (FunctoEs), Ifa Operators (OpoEs), and others — applying them across all knowledge fields of the IFA Internet.',
    color: '#3b9eff',
  },
];

// ─── STEAMSEX MATRIX DATA ─────────────────────────────────────────────────────

const STEAMSEX_DIMS = [
  { letter:'S', name:'(Natural) Science',  short:'Science',     color:'#f0920c',
    desc:'The systematic study of the natural world — its laws, forces, matter, life, and the universe — through observation, experimentation, and reasoning. Studied and modelled using the Energy-Based Approaches of Ifa and Orisa.' },
  { letter:'T', name:'Technology',          short:'Technology',  color:'#14b8d4',
    desc:'The creation and application of tools, machines, systems, and techniques that extend human capability and solve real-world problems. Studied and modelled using the Energy-Based Approaches of Ifa and Orisa.' },
  { letter:'E', name:'Engineering',         short:'Engineering', color:'#00c87c',
    desc:'The disciplined design, building, and optimisation of structures, machines, systems, and processes that serve human and natural needs. Studied and modelled using the Energy-Based Approaches of Ifa and Orisa.' },
  { letter:'A', name:'Arts',               short:'Arts',        color:'#ec4899',
    desc:'The full range of human creative expression — visual art, music, literature, drama, dance, and all forms of aesthetic and cultural production. Studied and modelled using the Energy-Based Approaches of Ifa and Orisa.' },
  { letter:'M', name:'Mathematics',        short:'Mathematics', color:'#f5c518',
    desc:'The formal study of number, quantity, structure, space, and pattern — the universal language underpinning all science, logic, and knowledge. Studied and modelled using the Energy-Based Approaches of Ifa and Orisa.' },
  { letter:'S', name:'Social Science',     short:'Social',      color:'#8b5cf6',
    desc:'The study of human society, behaviour, culture, economics, politics, history, and the relationships that shape collective human life. Studied and modelled using the Energy-Based Approaches of Ifa and Orisa.' },
  { letter:'E', name:'Education',          short:'Education',   color:'#3b9eff',
    desc:'The process and practice of teaching, learning, and transmitting knowledge, values, and skills across individuals, communities, and generations. Studied and modelled using the Energy-Based Approaches of Ifa and Orisa.' },
  { letter:'X', name:'Others (Unknowns)',  short:'Unknowns',    color:'#6366f1',
    desc:'All fields, disciplines, and phenomena not yet named, classified, or fully understood — the open frontier of human and cosmic knowledge. Studied and modelled using the Energy-Based Approaches of Ifa and Orisa.' },
];

// ─── STEAMSEX DIAGRAM ─────────────────────────────────────────────────────────

function SteamsexDiagram({ title, variant, index }) {
  const [active, setActive]         = React.useState(false);
  const [hoveredDim, setHoveredDim] = React.useState(null);
  const [pinnedDim, setPinnedDim]   = React.useState(null);

  const cx = 390, cy = 310, nodeR = 220, centerR = 60, dimR = 40;
  const accentColor = variant === 'energy' ? '#00c87c' : '#f0920c';

  const dims = STEAMSEX_DIMS.map((d, i) => {
    const angle = (i / 8) * 2 * Math.PI - Math.PI / 2;
    return { ...d, x: cx + nodeR * Math.cos(angle), y: cy + nodeR * Math.sin(angle), angle };
  });

  const hovDim = pinnedDim !== null ? dims[pinnedDim] : hoveredDim !== null ? dims[hoveredDim] : null;

  const handleToggle = () => { setActive(v => !v); setHoveredDim(null); setPinnedDim(null); };
  const handleDimClick = (i) => { if (!active) return; setPinnedDim(p => p === i ? null : i); };

  return (
    <div className="stx-diagram">
      {/* Interactive graph */}
      <div className="stx-diagram__graph-wrap">
        <div className="stx-diagram__title">{title}</div>
        <div className="stx-diagram__hint">
          {!active
            ? <>Click <strong style={{ color: accentColor }}>{variant === 'energy' ? 'Energy' : 'IFA'}</strong> to explore the 8 STEAMSEX {'Dimensions'} →</>
            : <span style={{ color: accentColor, fontSize: '0.68rem' }}>◈ Matrix open — hover a node, click to pin its description</span>
          }
        </div>

        <svg viewBox="0 0 780 620" className="stx-svg">
          <defs>
            <radialGradient id={'stx-cg-' + index} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={accentColor} stopOpacity="0.38" />
              <stop offset="100%" stopColor={accentColor} stopOpacity="0" />
            </radialGradient>
            <radialGradient id={'stx-bg-' + index} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0d1320" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#050810" stopOpacity="0" />
            </radialGradient>
            {dims.map((d, i) => (
              <clipPath key={'cp' + i} id={'clip-' + index + '-' + i}>
                <circle cx={d.x} cy={d.y} r={dimR - 2} />
              </clipPath>
            ))}
          </defs>

          {/* Soft background halo */}
          <circle cx={cx} cy={cy} r={nodeR + 36} fill={'url(#stx-bg-' + index + ')'} />

          {/* Orbit ring */}
          <circle cx={cx} cy={cy} r={nodeR} fill="none"
            stroke="rgba(255,255,255,0.045)" strokeWidth="1" strokeDasharray="3 7" />

          {/* STEAMSEX ring label */}
          <text
            opacity={active ? 1 : 0}
            style={{ transition: 'opacity 0.65s ease 0.5s' }}
            fill="rgba(255,255,255,0.13)" fontSize="7" letterSpacing="2.5" fontFamily="monospace">
            <textPath startOffset="3%" href={'#stx-arc-' + index}>
              {'S · T · E · A · M · S · E · X · STEAMSEX MATRIX · IFA MATRIX ·'}
            </textPath>
          </text>
          <defs>
            <path id={'stx-arc-' + index}
              d={'M ' + cx + ',' + (cy - nodeR - 20) +
                 ' A ' + (nodeR + 20) + ',' + (nodeR + 20) +
                 ' 0 1 1 ' + (cx - 0.01) + ',' + (cy - nodeR - 20)} />
          </defs>

          {/* Edges */}
          {dims.map((d, i) => {
            const sx = cx + (centerR + 6) * Math.cos(d.angle);
            const sy = cy + (centerR + 6) * Math.sin(d.angle);
            const ex = cx + (nodeR - dimR - 4) * Math.cos(d.angle);
            const ey = cy + (nodeR - dimR - 4) * Math.sin(d.angle);
            const len = Math.hypot(ex - sx, ey - sy).toFixed(1);
            const delay = active ? i * 52 : 0;
            return (
              <line key={i}
                x1={sx} y1={sy} x2={ex} y2={ey}
                stroke={d.color} strokeWidth="1.5"
                strokeDasharray={len}
                strokeDashoffset={active ? 0 : len}
                opacity={active ? 0.72 : 0}
                style={{ transition: 'stroke-dashoffset 0.55s ease ' + delay + 'ms, opacity 0.3s ease ' + delay + 'ms' }}
              />
            );
          })}

          {/* Dimension nodes */}
          {dims.map((d, i) => {
            const isPin = pinnedDim === i;
            const isHov = hoveredDim === i || isPin;
            const delay = active ? i * 52 + 180 : 0;
            return (
              <g key={i}>
                {/* Glow halo — fixed size, only opacity changes on hover/pin */}
                <circle cx={d.x} cy={d.y} r={dimR + 4} fill={d.color}
                  opacity={active ? (isHov ? 0.22 : 0.08) : 0}
                  style={{ transition: 'opacity 0.4s ease ' + delay + 'ms' }} />
                {/* Node ring — thicker when pinned */}
                <circle cx={d.x} cy={d.y} r={dimR}
                  fill="var(--bg-3)" stroke={d.color}
                  strokeWidth={isPin ? 3.5 : isHov ? 2.5 : 1.5}
                  opacity={active ? 1 : 0}
                  style={{ transition: 'opacity 0.4s ease ' + delay + 'ms, stroke-width 0.18s' }} />
                {/* Letter + short name clipped to node circle */}
                <g clipPath={'url(#clip-' + index + '-' + i + ')'}
                   opacity={active ? 1 : 0}
                   style={{ transition: 'opacity 0.45s ease ' + (delay + 80) + 'ms' }}>
                  <text x={d.x} y={d.y - 5} textAnchor="middle"
                    fill={d.color} fontSize="20" fontWeight="800" fontFamily="monospace"
                    dominantBaseline="auto">
                    {d.letter}
                  </text>
                  <text x={d.x} y={d.y + 19} textAnchor="middle"
                    fill={d.color} fontSize="11" fontFamily="sans-serif"
                    opacity="0.9" dominantBaseline="auto">
                    {d.short}
                  </text>
                </g>
                {/* Hit area */}
                <circle cx={d.x} cy={d.y} r={dimR + 10} fill="transparent"
                  style={{ cursor: active ? 'pointer' : 'default' }}
                  onMouseEnter={() => active && setHoveredDim(i)}
                  onMouseLeave={() => setHoveredDim(null)}
                  onClick={() => handleDimClick(i)} />
              </g>
            );
          })}

          {/* Center node — IFA */}
          <g onClick={handleToggle} style={{ cursor: 'pointer' }}>
            {/* Pulse ring */}
            <circle cx={cx} cy={cy} r="70" fill="none"
              stroke={accentColor} strokeWidth="1.2" className="stx-pulse" />
            {/* Glow halo */}
            <circle cx={cx} cy={cy} r={centerR + 14} fill={'url(#stx-cg-' + index + ')'} />
            {/* Main circle */}
            <circle cx={cx} cy={cy} r={centerR}
              fill="var(--bg-3)" stroke={accentColor} strokeWidth="2.5" />
            <>
              {/* IFA text */}
              <text x={cx} y={cy - 7} textAnchor="middle"
                fill={accentColor} fontSize="21" fontWeight="900"
                letterSpacing="3" fontFamily="monospace">IFA</text>
              {/* Status sub-text */}
              <text x={cx} y={cy + 13} textAnchor="middle"
                fill={accentColor} fontSize="7.5" opacity="0.7">
                {active ? '◈ CLICK TO CLOSE' : '↓ CLICK TO OPEN'}
              </text>
            </>
          </g>
        </svg>

        {/* Dimension info panel — fixed-height wrapper prevents layout shifts */}
        <div style={{ minHeight: 90, flexShrink: 0 }}>
          {hovDim ? (
            <div className="stx-dim-info" style={{ '--c': hovDim.color }}>
              <div className="stx-dim-info__letter">{hovDim.letter}</div>
              <div className="stx-dim-info__content">
                <div className="stx-dim-info__name">
                  {hovDim.name}
                  {pinnedDim !== null && <span className="stx-dim-info__pin">◈ pinned · click to release</span>}
                </div>
                <p className="stx-dim-info__desc">{hovDim.desc}</p>
              </div>
            </div>
          ) : active ? (
            <div className="stx-dim-hint">Hover a node to preview · click to pin its description · {STEAMSEX_DIMS.length} dimensions active</div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

// ─── HEADER ──────────────────────────────────────────────────────────────────

function Header() {
  return (
    <header className="header">
      <div className="header__inner">
        <a href="../" className="header__brand" target="_blank" rel="noopener noreferrer">
          <img src="../src/assets/itoe_logo.png" alt="iTOE" className="header__logo" />
          <div>
            <div className="header__site">The IFA Internet</div>
            <div className="header__name">IFA Mathematica</div>
          </div>
        </a>
        <nav className="header__nav">
          <a className="nav-link" href="#definition">IFABOK</a>
          <a className="nav-link" href="#areas">Areas</a>
          <a className="nav-link" href="#frameworks">Frameworks</a>
          <a className="nav-link" href="#laws">16 LOKs</a>
          <a className="nav-link" href="./ifa-code/" target="_blank" rel="noopener noreferrer">IFA Code</a>
          <a className="nav-link" href="./ifa-transform/" target="_blank" rel="noopener noreferrer">Ifa Transform</a>
          <a className="nav-link" href="https://ifainternet.org/ifa-mathematica/ifa-gebra/" target="_blank" rel="noopener noreferrer">IfaGebra</a>
          <a className="nav-link" href="https://ifainternet.org/ifa-matrix/"
             target="_blank" rel="noopener noreferrer">IFA Matrix ↗</a>
          <a className="nav-link" href="https://ifainternet.org/ifa-mathematica/ifa-gebra/"
             target="_blank" rel="noopener noreferrer">IfaGebra Overview ↗</a>
          <a className="nav-link nav-link--cta"
             href="https://toe.cenproject.org/ifa-mathematics-toe-mathematics/"
             target="_blank" rel="noopener noreferrer">TOE Mathematics</a>
        </nav>
      </div>
    </header>
  );
}

// ─── MOBILE BAR ──────────────────────────────────────────────────────────────

function MobileBar() {
  const items = [
    { sym: '⌂',  label: 'Home',       href: '../' },
    { sym: '∑',  label: 'IFABOK',     href: '#definition' },
    { sym: '⊗',  label: 'Areas',      href: '#areas' },
    { sym: 'ƒ',  label: 'Frameworks', href: '#frameworks' },
    { sym: '16', label: 'LOKs',       href: '#laws' },
  ];
  return (
    <nav className="mobile-bar" aria-label="Mobile navigation">
      <div className="mobile-bar__row">
        {items.map(it => (
          <a key={it.label} className="mobile-bar__item" href={it.href}>
            <span className="mobile-bar__sym">{it.sym}</span>
            <span>{it.label}</span>
          </a>
        ))}
      </div>
    </nav>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="hero">
      <div className="hero__bg">
        <div className="hero__grid" />
        <div className="hero__orb hero__orb--a" />
        <div className="hero__orb hero__orb--b" />
        <div className="hero__orb hero__orb--c" />
        <div className="hero__scanline" />
      </div>
      {/* Hero text — full width */}
      <div className="container hero__text-area">
        <div className="hero__badge">
          <span className="hero__badge-dot" />
          The IFA Internet &mdash; IFA Mathematica Platform
        </div>

        <h1 className="hero__title">
          <span className="hero__title-main">IFA Mathematica</span>
          <span className="hero__title-sub">The Mathematica of Everything</span>
        </h1>

        <p className="hero__tagline">
          IFA Body of Knowledge (IFABOK) &mdash; TOE Mathematica &mdash; MathematicoE
        </p>

        <p className="hero__yoruba">
          <span className="hero__yoruba-yor">Ìṣiròfá — Èdè Gbogbogbò fún Gbogbo Ìmọ̀ Lágbayé</span>
          <span className="hero__yoruba-sep"> · </span>
          <span className="hero__yoruba-en">IFA Mathematics is General and Universal Metamathematics for All Knowledge Fields</span>
        </p>

        <p className="hero__desc">
          IFA Mathematics is a <strong>new way of thinking that uses Mathematics,
          expressed as a form of the Energy, Ogbe or CEN, to study and model all fields of knowledge.</strong> As the
          foundational Body of Knowledge of the IFA Internet, it unifies all knowledge fields
          through the <strong>16 Ifa Laws of Knowledge (LOKs)</strong>, the{' '}
          <strong>256 Odu Ifa</strong>, and the{' '}
          <strong>CEN Unified Field</strong> — Consciousness and Energy Field.
        </p>

        <div className="hero__aliases">
          {ALIASES.map((a, i) => (
            <span key={i} className="hero__alias" style={{ '--alias-color': a.color }}>
              {a.label}
            </span>
          ))}
        </div>

        <div className="hero__ctas">
          <a href="#definition" className="btn btn--primary">Explore IFABOK</a>
          <a href="#laws" className="btn btn--ghost">The 16 LOKs</a>
        </div>
      </div>

      {/* STEAMSEX Diagram — full width below text */}
      <div className="hero__diagram-area">
        <div className="container">
          <SteamsexDiagram
            variant="ifa"
            index={0}
            title="The STEAMSEX Matrix · Ifa Architecture"
          />
        </div>
      </div>

      <div className="hero__stats-bar">
        <div className="container">
          <div className="hero__stats">
            {STATS.map((s, i) => (
              <div key={i} className="hero__stat">
                <div className="hero__stat-value">{s.value}</div>
                <div className="hero__stat-label">{s.label}</div>
                <div className="hero__stat-sub">{s.sub}</div>
              </div>
            ))}
          </div>
          <div className="hero__stats-quote">
            <span className="hero__stats-quote-text">
              Ifá ló l'ọgbọ́n, awo òde Ẹ̀gbá; Òòṣà lómọ̀yókù, awo òde Ìjẹ̀ṣà
            </span>
            <span className="hero__stats-quote-attr">— Ọ̀kànràn Òfún</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── DEFINITION SECTION ──────────────────────────────────────────────────────

function DefinitionSection() {
  return (
    <section className="section" id="definition">
      <div className="container">
        <div className="def-grid">
          <div className="def-text">
            <div className="section__header">
              <span className="section__eyebrow section__eyebrow--gold">What is IFA Mathematica</span>
              <h2 className="section__title">
                The <span className="accent--gold">IFA Body of Knowledge</span>
              </h2>
              <p className="section__subtitle">
                IFABOK is the collection and sum total of the deep wisdom, knowledge,
                philosophies, and principles encoded in the <strong>Odù Ifá</strong> —
                with profound applications across all fields of knowledge, especially
                Science, Technology, Engineering, Arts, and Mathematics (STEAM).
              </p>
            </div>

            <div className="def-blocks">
              <div className="def-block">
                <div className="def-block__icon">∑</div>
                <div className="def-block__content">
                  <div className="def-block__label">IFA Mathematics</div>
                  <p className="def-block__body">
                    IFA Mathematics is the scientific study of energies that manifest as
                    all elements of nature, including all fields and disciplines of knowledge.
                    It is expressed through the 256 Odu Ifa as the axiomatic knowledge matrix.
                  </p>
                </div>
              </div>
              <div className="def-block">
                <div className="def-block__icon">⊗</div>
                <div className="def-block__content">
                  <div className="def-block__label">IFA Mathematica</div>
                  <p className="def-block__body">
                    IFA Mathematica is the Tool for integrating, unifying, and
                    internetworking all fields of knowledge. It serves as the Base-Field
                    and Core Structure of the IFA Internet — the MathematicoE.
                  </p>
                </div>
              </div>
              <div className="def-block">
                <div className="def-block__icon">16</div>
                <div className="def-block__content">
                  <div className="def-block__label">16 Ifa Axioms</div>
                  <p className="def-block__body">
                    The foundational principles of IFA Mathematics are the 16 IFA Axioms
                    — the Oju Odu Ifa Mẹrìndínlógún. Their mission is to unify and integrate
                    all disciplines; their vision is to drive innovation across all fields of knowledge.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="def-visual">
            <div className="ifabok-symbol">
              <div className="ifabok-symbol__ring ifabok-symbol__ring--outer" />
              <div className="ifabok-symbol__ring ifabok-symbol__ring--mid" />
              <div className="ifabok-symbol__arc ifabok-symbol__arc--1" />
              <div className="ifabok-symbol__arc ifabok-symbol__arc--2" />
              <div className="ifabok-symbol__core">
                <span className="ifabok-symbol__char">∑</span>
                <span className="ifabok-symbol__sub">IFABOK</span>
              </div>
              <div className="ifabok-symbol__label">IFA Body of Knowledge</div>
              <div className="ifabok-symbol__sublabel">Mathematics · Energy · Everything</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── KEY AREAS SECTION ───────────────────────────────────────────────────────

function AreasSection() {
  return (
    <section className="section section--alt" id="areas">
      <div className="container">
        <div className="section__header section__header--center">
          <span className="section__eyebrow section__eyebrow--violet">Platforms &amp; Fields</span>
          <h2 className="section__title">The Core Areas of IFA Mathematica</h2>
          <p className="section__subtitle">
            IFA Mathematica spans all fields of knowledge — grounded in the 256 Odu Ifa
            as the axiomatic knowledge matrix and unified through the CEN Field.
          </p>
        </div>

        <div className="areas-grid">
          {AREAS.map(a => (
            <div key={a.num} className="area-card" style={{ '--area-color': a.color }}>
              <div className="area-card__top">
                <span className="area-card__sym">
                  {a.varChar
                    ? <IfaExpr char={a.varChar} charSize="1.4rem" symSize={13} charColor={a.color} />
                    : a.sym}
                </span>
                <span className="area-card__num">{a.num}</span>
              </div>
              <h3 className="area-card__title">{a.title}</h3>
              <div className="area-card__sub">{a.sub}</div>
              <p className="area-card__body">{a.body}</p>
              {a.link && (
                <a href={a.link} target="_blank" rel="noopener noreferrer"
                   style={{ display: 'inline-block', marginTop: '10px', fontSize: '0.78rem',
                     color: a.color, fontWeight: 700, textDecoration: 'none' }}>
                  Explore on TOE ↗
                </a>
              )}
              <div className="area-card__glow" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── MATHEMATICAL FRAMEWORKS ──────────────────────────────────────────────────

function FrameworksSection() {
  const [active, setActive] = useState(0);
  const f = FRAMEWORKS[active];

  return (
    <section className="section section--dark" id="frameworks">
      <div className="container">
        <div className="section__header section__header--center">
          <span className="section__eyebrow section__eyebrow--gold">The Mathematical Toolkit</span>
          <h2 className="section__title">
            IFA Mathematical <span className="accent--gold">Frameworks</span>
          </h2>
          <p className="section__subtitle">
            The four foundational frameworks through which IFA Mathematics operates —
            Numbers, Algebras, Functions, and Operators of Everything.
          </p>
        </div>

        <div className="principles-layout">
          <div className="principles-tabs">
            {FRAMEWORKS.map((fw, i) => (
              <button
                key={i}
                className={`principle-tab${i === active ? ' principle-tab--active' : ''}`}
                style={{ '--pt-color': fw.color }}
                onClick={() => setActive(i)}
              >
                <span className="principle-tab__sym">
                  {fw.varChar
                    ? <IfaExpr char={fw.varChar} charSize="1.1rem" symSize={9} charColor={fw.color} tight />
                    : fw.sym}
                </span>
                <span className="principle-tab__name">{fw.title}</span>
                <span className="principle-tab__arrow">›</span>
              </button>
            ))}
          </div>

          <div className="principle-detail" style={{ '--pd-color': f.color }}>
            <div className="principle-detail__bg" />
            <div className="principle-detail__sym">
              {f.varChar
                ? <IfaExpr char={f.varChar} charSize="3rem" symSize={24} charColor={f.color} tight />
                : f.sym}
            </div>
            <h3 className="principle-detail__title">{f.title}</h3>
            <div className="principle-detail__sub">{f.sub}</div>
            <p className="principle-detail__body">{f.body}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── 16 LAWS OF KNOWLEDGE ────────────────────────────────────────────────────

function LawsSection() {
  return (
    <section className="section" id="laws">
      <div className="container">
        <div className="section__header section__header--center">
          <span className="section__eyebrow section__eyebrow--amber">Axiomatic Foundation</span>
          <h2 className="section__title">
            The 16 <span className="accent--amber">Laws of Knowledge</span>
          </h2>
          <p className="section__subtitle">
            The 16 Principal Odu Ifa are the Laws of Knowledge (LOKs) — the Laws of Everything
            (LawoE), Ifa Axioms, Ifa Identities, TOE Codes. They are the irreducible axiomatic
            foundation governing all fields of knowledge.
          </p>
        </div>

        <div className="lok-aliases">
          {['Laws of Knowledge (LOKs)', 'Laws of Everything (LawoE)', 'Ifa Axioms', 'Ifa Identities', 'TOE Laws', 'TOE Axioms', 'TOE Codes', '16 IfaBoKs'].map((a, i) => (
            <span key={i} className="lok-alias">{a}</span>
          ))}
        </div>

        <div className="odu-grid">
          {ODU_16.map(o => (
            <div key={o.num} className="odu-card" style={{ '--odu-color': o.color }}>
              <div className="odu-card__num">{o.num}</div>
              <div className="odu-card__name">{o.name}</div>
              <div className="odu-card__glow" />
            </div>
          ))}
        </div>

        <div className="laws-note">
          <div className="laws-note__icon">∑</div>
          <p className="laws-note__text">
            The 16 Principal Odu Ifa form the <strong>axiomatic core</strong> of all
            256 Odu — each combination encoding a specific Law of Knowledge applicable
            across every field of the IFA Internet.
          </p>
        </div>

        <OjuOduNetworkSection />
      </div>
    </section>
  );
}

// ─── OJU ODU NETWORK SECTION (Ifagram) ───────────────────────────────────────

const ODU_NET = [
  { n:'01', name:'Ogbé',      letter:'S',  type:'O', color:'#f0920c', desc:'The Primal Active State — governs beginnings, light, and intelligence. Ogbé is the foundational open energy of all creation: the source of all active Ifa operations and the first Law of Knowledge.' },
  { n:'02', name:'Òyèkú',    letter:'I',  type:'I', color:'#6366f1', desc:'The Primal Void State — governs transformation, endings, and night energy. Òyèkú is the closed void that completes the binary foundation of all Ifa operations alongside Ogbé.' },
  { n:'03', name:'Ìwòrì',    letter:'D',  type:'O', color:'#14b8d4', desc:'Inner Vision — governs introspection, the mind, and the energy of deep thought. Ìwòrì encodes the law of inward reflection and the discovery of hidden knowledge.' },
  { n:'04', name:'Òdí',      letter:'E',  type:'I', color:'#00c87c', desc:'The Womb — governs creation, hidden formation, and generative energy. Òdí encodes the law of concealment and the birth of new forms from hidden depths.' },
  { n:'05', name:'Ìrosùn',   letter:'C',  type:'O', color:'#ef4444', desc:'The Law of Flow — governs circulation, exchange, and the dynamic movement of Àṣẹ. Ìrosùn encodes the principle of continuity and the ceaseless flow of energy through all fields.' },
  { n:'06', name:'Òwónrín',  letter:'H',  type:'I', color:'#8b5cf6', desc:'Chaos and Innovation — governs lightning, sudden change, and creative disruption. Òwónrín encodes the law of unpredictable transformation and the energy of breakthrough.' },
  { n:'07', name:'Òbàrà',    letter:'R',  type:'O', color:'#3b9eff', desc:'Royal Power — governs leadership, authority, and the energy of sovereignty. Òbàrà encodes the law of abundance, expansive vision, and the full expression of Àṣẹ.' },
  { n:'08', name:'Òkànràn',  letter:'X',  type:'I', color:'#ec4899', desc:'Dynamic Opposition — governs tension, conflict, and the energy of opposing forces. Òkànràn encodes the law of challenge and the productive friction that drives transformation.' },
  { n:'09', name:'Ògúndá',   letter:'S′', type:'O', color:'#f0920c', desc:'The Path Opener — governs iron, roads, and the energy of clearing obstacles. Ògúndá encodes the law of determination and the power to forge new pathways through all resistance.' },
  { n:'10', name:'Òsá',      letter:'I′', type:'I', color:'#6366f1', desc:'The Wind of Change — governs speed, swift transitions, and volatile energy. Òsá encodes the law of rapid transformation and the restless movement of Àṣẹ across fields.' },
  { n:'11', name:'Ìká',      letter:'D′', type:'O', color:'#14b8d4', desc:'The Energy of Aggregation — governs accumulation, concentration, and gathering. Ìká encodes the law of convergence and the principle of drawing diverse energies into unity.' },
  { n:'12', name:'Òtúrúpòn', letter:'E′', type:'I', color:'#00c87c', desc:'The Energy of Reversal — governs hidden forces, mysteries, and unexpected inversions. Òtúrúpòn encodes the law of reversal and the power of concealed operations.' },
  { n:'13', name:'Òtúrá',    letter:'C′', type:'O', color:'#ef4444', desc:'The Energy of Harmony — governs peace, balance, and restorative energy. Òtúrá encodes the law of reconciliation and the principle of achieving equilibrium across opposing forces.' },
  { n:'14', name:'Ìrètè',    letter:'H′', type:'I', color:'#8b5cf6', desc:'The Energy of Endurance — governs patience, long processes, and sustained Àṣẹ. Ìrètè encodes the law of perseverance and the principle of steady accumulation over time.' },
  { n:'15', name:'Òsè',      letter:'R′', type:'O', color:'#3b9eff', desc:'The Law of Operations — governs all transformations, cosmic order, and universal laws. Òsè encodes the principle of lawful operation: that all processes in the universe follow the deep structure of Ifa.' },
  { n:'16', name:'Òfún',     letter:'X′', type:'I', color:'#ec4899', desc:'The Energy of Completion — governs cycles, totality, and the fulfillment of Àṣẹ. Òfún encodes the law of wholeness and the return of all energy to its source.' },
];

function OjuOduNetworkSection() {
  const [hoveredOdu, setHoveredOdu] = useState(null);
  const [pinnedOdu, setPinnedOdu]   = useState(null);
  const active = pinnedOdu ?? hoveredOdu ?? ODU_NET[0];

  function getSpokes(odu) {
    const idx = parseInt(odu.n, 10);
    const first7 = ODU_NET.slice(0, 7).filter(o => o.n !== odu.n);
    if (idx <= 7) {
      return [odu, ...first7, { n: 'others', name: 'Others (08–16)', color: '#ec4899' }];
    }
    return [odu, ...first7.slice(0, 6), { n: 'others', name: 'Obara + Others', color: '#3b9eff' }];
  }

  const spokes = getSpokes(active);
  const K = 0.707;
  const SC = [
    [280,        142,        280,  70,  280,  42,  280,  56, 'middle'],
    [280+110*K,  210-68*K,   455,  78,  459,  73,  459,  87, 'start' ],
    [390,        210,        515, 210,  518, 206,  518, 220, 'start' ],
    [280+110*K,  210+68*K,   455, 342,  459, 340,  459, 354, 'start' ],
    [280,        278,        280, 330,  280, 348,  280, 362, 'middle'],
    [280-110*K,  210+68*K,   105, 342,  101, 340,  101, 354, 'end'   ],
    [170,        210,         45, 210,   41, 206,   41, 220, 'end'   ],
    [280-110*K,  210-68*K,   105,  78,  101,  73,  101,  87, 'end'   ],
  ];

  const handleGridEnter = (o) => { if (!pinnedOdu) setHoveredOdu(o); };
  const handleGridLeave = ()  => { setHoveredOdu(null); };
  const handleGridClick = (o) => {
    setPinnedOdu(p => p?.n === o.n ? null : o);
    setHoveredOdu(null);
  };
  const handleSpokeClick = (p) => {
    if (p.n === 'others') return;
    const odu = ODU_NET.find(o => o.n === p.n);
    if (odu) { setPinnedOdu(prev => prev?.n === odu.n ? null : odu); setHoveredOdu(null); }
  };

  return (
    <div className="oju-odu-network-wrap">
      <div className="section__header section__header--center" style={{ marginTop: '56px' }}>
        <span className="section__eyebrow section__eyebrow--amber">Odu Ifa Network — Ifagram</span>
        <h2 className="section__title">
          The <span className="accent--amber">16 Oju Odu</span> — <span className="accent--violet">Odu Ifa Network Map</span>
        </h2>
        <p className="section__subtitle">
          Select any of the 16 Ojú Odù Ifá to reveal its Odu Network — the Ifagram of how that Odu connects across the full 16 Oju Odu space.
          <br /><span style={{ fontSize: '0.82em', color: 'var(--text-3)' }}>
            Each node connects to itself first, then the first 7 Odu in order, then Others (08–16) — 8 edges total.
          </span>
        </p>
      </div>

      <div className="d8-ifagram-note">
        <div className="d8-ifagram-note__label">Ifagram — Ifa Diagram</div>
        <p className="d8-ifagram-note__text">
          Each Diagram is an <strong>Ifagram</strong>: a Visual Meta-Structure for Diagrammatic Reasoning with Ifa and network theory.
          The central Node (Ifa Circle) is the selected Ojú Odù. Spokes connect it to 8 outer positions: itself (N),
          followed by the other Oju Odu in order, then Others — forming the complete Odu Ifa Network across all 16 Oju Odu.
        </p>
      </div>

      <div className="d8-layout">
        {/* Left: 16 Odu selector grid */}
        <div className="d8-grid-col">
          <div className="d8-grid-label">
            {pinnedOdu
              ? <span>◈ Pinned: <span style={{ color: pinnedOdu.color, fontWeight: 700 }}>{pinnedOdu.name}</span> — click again to release</span>
              : 'Ojú Odù Ifá Mẹrindínlógún — Hover to Preview · Click to Pin & Explore'
            }
          </div>
          <div className="d8-odu-grid">
            {ODU_NET.map(o => (
              <div key={o.n}
                className={`d8-odu-cell${active.n === o.n ? ' d8-odu-cell--active' : ''}`}
                style={{
                  '--c': o.color,
                  ...(pinnedOdu?.n === o.n ? { outline: '2px solid ' + o.color, outlineOffset: '2px' } : {}),
                }}
                onMouseEnter={() => handleGridEnter(o)}
                onMouseLeave={handleGridLeave}
                onClick={() => handleGridClick(o)}
                role="button" tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && handleGridClick(o)}
              >
                <div className="d8-odu-cell__n">{o.n}</div>
                <div className="d8-odu-cell__name">{o.name}</div>
                <div className={`d8-odu-cell__badge d8-odu-cell__badge--${o.type}`}>
                  {pinnedOdu?.n === o.n ? '◈' : o.type === 'O' ? 'P' : 'Inv'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Odu Network Ifagram panel */}
        <div className="d8-panel" style={{ '--c': active.color }}>
          <div className="d8-panel__head">
            <div className="d8-panel__odu-row">
              <span className="d8-panel__num">{active.n}</span>
              <div className="d8-panel__meta">
                <div className="d8-panel__name">
                  {active.name}
                  {pinnedOdu && (
                    <span style={{ fontSize: '0.62rem', marginLeft: '8px', color: 'var(--text-3)', fontWeight: 400 }}>
                      ◈ pinned · click to release
                    </span>
                  )}
                </div>
                <div className="d8-panel__sub">
                  <span className="d8-panel__letter" style={{ color: active.color }}>{active.letter}</span>
                  <span className={`d8-panel__badge d8-panel__badge--${active.type}`}>
                    {active.type === 'O' ? 'Principal Odu' : 'Inverse Odu'}
                  </span>
                </div>
              </div>
            </div>
            <div className="d8-panel__tag">16 Odu</div>
          </div>

          {/* Radial SVG — Odu network compass */}
          <svg viewBox="0 0 560 420" overflow="visible" width="100%"
            style={{ display:'block', maxWidth:'min(460px, calc(100vw - 40px))', margin:'0 auto 22px', fontFamily:'inherit' }}>
            <defs>
              {spokes.map((p, i) => (
                <marker key={i} id={`on-arr-${i}-${active.n}`} markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
                  <polygon points="0 1, 0 7, 8 4" fill={p.color} fillOpacity={i === 0 ? 1 : 0.7}/>
                </marker>
              ))}
              <marker id={`on-ifa-c-${active.n}`} markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
                <polygon points="0 1, 0 7, 8 4" fill={active.color}/>
              </marker>
            </defs>

            {SC.map(([ex, ey, tx, ty], idx) => {
              const p = spokes[idx];
              const isSelf = idx === 0;
              return (
                <line key={idx} x1={ex} y1={ey} x2={tx} y2={ty}
                  stroke={p.color} strokeWidth={isSelf ? 2.5 : 1.2}
                  strokeOpacity={isSelf ? 1 : 0.45}
                  markerEnd={`url(#on-arr-${idx}-${active.n})`} />
              );
            })}

            <ellipse cx="280" cy="210" rx="110" ry="68"
              fill="#111827" stroke={active.color} strokeWidth="2.5"/>
            <path d="M 387.6,195.9 A 110,68 0 0,1 387.6,224.1"
              fill="none" stroke={active.color} strokeWidth="3"
              markerEnd={`url(#on-ifa-c-${active.n})`}/>
            <text x="280" y="200" textAnchor="middle" fontSize="16"
              fontWeight="800" fill={active.color}>{active.name}</text>
            <text x="280" y="216" textAnchor="middle" fontSize="11"
              fill="rgba(255,255,255,0.38)">{active.n}</text>
            <text x="280" y="232" textAnchor="middle" fontSize="11" fontWeight="700"
              fill={active.type === 'O' ? '#f0920c' : '#8b5cf6'}>
              {active.type === 'O' ? 'Principal' : 'Inverse'}
            </text>

            {SC.map(([ex, ey, tx, ty, lx, ly, nx, ny, anc], idx) => {
              const p = spokes[idx];
              const isSelf = idx === 0;
              const canClick = p.n !== 'others';
              return (
                <g key={idx}
                  onClick={() => handleSpokeClick(p)}
                  style={{ cursor: canClick ? 'pointer' : 'default' }}>
                  <rect
                    x={anc === 'end' ? lx - 62 : anc === 'start' ? lx - 3 : lx - 31}
                    y={ly - 18} width="64" height="36" fill="transparent" />
                  <text x={lx} y={ly} textAnchor={anc} fontSize="13" fontWeight="800"
                    fill={p.color} fillOpacity={isSelf ? 1 : 0.7}>
                    {p.n === 'others' ? '08–16' : p.n}
                  </text>
                  <text x={nx} y={ny} textAnchor={anc} fontSize="11"
                    fontWeight={isSelf ? 700 : 400}
                    fill={isSelf ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.45)'}>
                    {p.name}
                  </text>
                </g>
              );
            })}
          </svg>

          <div style={{ textAlign:'center', fontSize:'0.7rem', color:'var(--text-3)', letterSpacing:'0.08em', marginBottom:'12px', fontWeight:600 }}>
            IFAGRAM &nbsp;·&nbsp; Ifa Diagram — Odu Ifa Network
          </div>

          {/* Explore panel — shown when an Odu is pinned */}
          {pinnedOdu && (
            <div style={{
              margin: '0 0 16px',
              padding: '14px 16px',
              background: 'rgba(0,0,0,0.28)',
              border: '1px solid ' + pinnedOdu.color + '44',
              borderRadius: '10px',
            }}>
              <div style={{
                fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em',
                color: pinnedOdu.color, marginBottom: '6px', textTransform: 'uppercase',
              }}>
                ◈ Exploring — {pinnedOdu.n} · {pinnedOdu.name}
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-2)', lineHeight: 1.6, margin: 0 }}>
                {pinnedOdu.desc}
              </p>
              <button
                onClick={() => setPinnedOdu(null)}
                style={{
                  marginTop: '10px', padding: '4px 12px',
                  fontSize: '0.7rem', fontWeight: 700,
                  background: 'transparent',
                  border: '1px solid ' + pinnedOdu.color + '66',
                  color: pinnedOdu.color, borderRadius: '6px',
                  cursor: 'pointer', letterSpacing: '0.06em',
                }}>
                Release Pin
              </button>
            </div>
          )}

          <div className="d8-dims-list">
            {spokes.map((p, i) => (
              <div key={i} className="d8-dim-row"
                onClick={() => handleSpokeClick(p)}
                style={{ '--dc': p.color, cursor: p.n !== 'others' ? 'pointer' : 'default' }}>
                <span className="d8-dim-row__letter">{p.n === 'others' ? '08–16' : p.n}</span>
                <span className="d8-dim-row__text">{i === 0 ? `${p.name} — Self` : p.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── LEARNING PATH SECTION ────────────────────────────────────────────────────

function PathSection() {
  return (
    <section className="section section--alt" id="path">
      <div className="container">
        <div className="section__header section__header--center">
          <span className="section__eyebrow section__eyebrow--electric">Understanding IFABOK</span>
          <h2 className="section__title">Your Journey into IFA Mathematics</h2>
          <p className="section__subtitle">
            Three foundational steps to understanding IFA Mathematica — from the core Laws
            of Knowledge to the full application of the Mathematical Frameworks.
          </p>
        </div>

        <div className="path-steps">
          {STEPS.map((s, i) => (
            <div key={i} className="path-step" style={{ '--step-color': s.color }}>
              <div className="path-step__left">
                <div className="path-step__num">{s.num}</div>
                {i < STEPS.length - 1 && <div className="path-step__connector" />}
              </div>
              <div className="path-step__card">
                <h3 className="path-step__title">{s.title}</h3>
                <p className="path-step__body">{s.body}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="path-cta">
          <a href="https://toe.cenproject.org/ifa-mathematics-toe-mathematics/"
             target="_blank" rel="noopener noreferrer"
             className="btn btn--primary">
            Explore on TOE Mathematics
          </a>
          <a href="./ifa-transform/" target="_blank" rel="noopener noreferrer"
             className="btn btn--ghost">
            Ifa Transform
          </a>
          <a href="https://ifainternet.org/ifa-mathematica/ifa-gebra/" target="_blank" rel="noopener noreferrer"
             className="btn btn--ghost">
            IfaGebra
          </a>
          <a href="https://ifainternet.org/ifa-mathematica/ifa-gebra/" target="_blank" rel="noopener noreferrer"
             className="btn btn--ghost">
            IfaGebra Overview ↗
          </a>
          <a href="../" className="btn btn--ghost" target="_blank" rel="noopener noreferrer">
            Back to IFA Internet
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── CAPABILITIES SECTION ─────────────────────────────────────────────────────

function CapabilitiesSection() {
  return (
    <section className="section section--dark" id="capabilities">
      <div className="container">
        <div className="section__header section__header--center">
          <span className="section__eyebrow section__eyebrow--gold">Why IFA Mathematica</span>
          <h2 className="section__title">
            One System for <span className="accent--gold">All Knowledge</span>
          </h2>
          <p className="section__subtitle">
            IFA Mathematica is the world's most comprehensive Metamathematical Framework —
            integrating every field of knowledge through a single Unified Meta-Axiomatic Structure.
          </p>
        </div>
        <div className="cap-grid">
          {CAPABILITIES.map((c, i) => (
            <div key={i} className="cap-card" style={{ '--cc': c.color }}>
              <div className="cap-card__top">
                <div className="cap-card__icon">{c.sym}</div>
                <span className="cap-card__label">{c.label}</span>
              </div>
              <h3 className="cap-card__title">{c.title}</h3>
              <p className="cap-card__body">{c.body}</p>
              <div className="cap-card__glow" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── KNOWLEDGE COVERAGE SECTION ───────────────────────────────────────────────

function CoverageSection() {
  return (
    <section className="section section--alt" id="coverage">
      <div className="container">
        <div className="section__header section__header--center">
          <span className="section__eyebrow section__eyebrow--jade">STEAMSEX Coverage</span>
          <h2 className="section__title">
            All Fields of <span className="accent--jade">Knowledge</span>
          </h2>
          <p className="section__subtitle">
            IFA Mathematica covers the complete STEAMSEX Spectrum — every field of human
            knowledge, modelled and unified through the IFA Mathematics Framework.
          </p>
        </div>
        <div className="stx-cov-grid">
          {STEAMSEX_DIMS.map((d, i) => (
            <div key={i} className="stx-cov-card" style={{ '--scc': d.color }}>
              <div className="stx-cov-card__letter">{d.letter}</div>
              <div className="stx-cov-card__name">{d.name}</div>
              <p className="stx-cov-card__body">{d.desc}</p>
            </div>
          ))}
        </div>
        <div className="cov-note">
          <span className="cov-note__sym">256</span>
          <div>
            <div className="cov-note__title">256 Odu Ifa — The Axiomatic Knowledge Matrix</div>
            <p className="cov-note__body">
              Every field within the STEAMSEX spectrum is grounded in the 256 Odu Ifa —
              the complete combinatorial matrix of the 16 Principal Odu. Each Odu encodes a unique
              knowledge configuration applicable across all disciplines of the IFA Internet.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── LINKED PLATFORMS SECTION ────────────────────────────────────────────────

function LinkedPlatformsSection() {
  return (
    <section className="section section--dark" id="platforms">
      <div className="container">
        <div className="section__header section__header--center">
          <span className="section__eyebrow section__eyebrow--violet">IFA Mathematica Subplatforms</span>
          <h2 className="section__title">Linked <span className="accent--violet">Platforms</span></h2>
          <p className="section__subtitle">
            IFA Mathematica is the Parent Framework for these core Platforms —
            each exploring a distinct Dimension of the Mathematica for Everything.
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '820px', margin: '0 auto' }}>
          <a href="https://ifainternet.org/ifa-matrix/"
             className="ifg-link-card" target="_blank" rel="noopener noreferrer">
            <span className="ifg-link-card__sym" style={{ color: '#f5c518' }}>⊞</span>
            <div>
              <div className="ifg-link-card__title">IFA Matrix — Matrix of Everything (MatrixoE) ↗</div>
              <div className="ifg-link-card__sub">
                The Matrix of All Matrices — a unified structural framework mapping all knowledge fields through the
                8 SIDECHRX Principles, 16 Oju Odu Ifa, and the 0+8D Model. Built on IfaGebra and the Amulu Operation.
              </div>
            </div>
          </a>
          <a href="https://ifainternet.org/ifa-mathematica/ifa-gebra/"
             className="ifg-link-card" target="_blank" rel="noopener noreferrer">
            <span className="ifg-link-card__sym" style={{ color: '#8b5cf6' }}>⊗</span>
            <div>
              <div className="ifg-link-card__title">IfaGebra — Algebra of Everything (AlgebroE) ↗</div>
              <div className="ifg-link-card__sub">
                The Meta-Algebraic Framework underlying all IFA Mathematics — every algebraic structure,
                Ifa Operator, and energy-exchange rule is defined within IfaGebra and its Ifalgebras.
              </div>
            </div>
          </a>
          <a href="https://ifainternet.org/ifa-mathematics-toe-mathematics/ifa-transform/"
             className="ifg-link-card" target="_blank" rel="noopener noreferrer">
            <span className="ifg-link-card__sym" style={{ color: '#14b8d4' }}>∿</span>
            <div>
              <div className="ifg-link-card__title">IFA Transform — Transform of Everything (TransformoE) ↗</div>
              <div className="ifg-link-card__sub">
                The Universe of Transforms — the container of all transformations, operations, and processes
                across all knowledge fields. IfaDifferintegral, Ifa Operator Theory, and the Ifa Transformation Framework.
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__energy-line" aria-hidden="true" />
      <div className="container">
        <div className="footer__inner">
          <div className="footer__brand">
            <div className="footer__logo">
              <img src="../src/assets/itoe_logo.png" alt="iTOE" className="footer__logo-mark" />
              <span>The IFA Internet</span>
            </div>
            <p className="footer__tagline">
              IFA Mathematica — The Mathematica of Everything
            </p>
            <p className="footer__tagline footer__tagline--sm">
              Part of the <a href="https://cenproject.org/" className="footer__link-inline" target="_blank" rel="noopener noreferrer">CENProject</a> — Consciousness-Energy Research.
            </p>
          </div>
          <nav className="footer__links">
            <a href="#definition" className="footer__link">IFABOK</a>
            <a href="#areas" className="footer__link">Core Areas</a>
            <a href="#frameworks" className="footer__link">Frameworks</a>
            <a href="#laws" className="footer__link">16 LOKs</a>
            <a href="#path" className="footer__link">Learn</a>
            <a href="https://ifainternet.org/ifa-mathematica/ifa-gebra/" className="footer__link" target="_blank" rel="noopener noreferrer">IfaGebra</a>
            <a href="./ifa-transform/" className="footer__link" target="_blank" rel="noopener noreferrer">Ifa Transform</a>
            <a href="https://ifainternet.org/ifa-matrix/" className="footer__link" target="_blank" rel="noopener noreferrer">IFA Matrix ↗</a>
            <a href="../" className="footer__link" target="_blank" rel="noopener noreferrer">IFA Internet</a>
          </nav>
        </div>
        <div className="footer__bottom">
          <span className="footer__copy">
            &copy; 2026 CENProject Innovations Limited. All rights reserved.
          </span>
          <span className="footer__powered">
            The IFA Internet &mdash; IFA Mathematica Platform
          </span>
        </div>
      </div>
    </footer>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────

function App() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <DefinitionSection />
        <CapabilitiesSection />
        <AreasSection />
        <CoverageSection />
        <FrameworksSection />
        <LawsSection />
        <PathSection />
        <LinkedPlatformsSection />
      </main>
      <Footer />
      <MobileBar />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
