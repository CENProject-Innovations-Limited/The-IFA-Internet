/* ─────────────────────────────────────────────────────────────────────────────
   IFA Code — CodoE · Odù Ifá Codes for Everything
   Subpage of IFA Mathematica · The IFA Internet · CENProject
   toe.cenproject.org/ifa-programming-language-ifa-pl/
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

// ─── DATA — IFA CODE MATRIX (CodoE) ──────────────────────────────────────────

const CODOE_DIMS = [
  { letter: 'S', name: 'Scientific Codes',    short: 'Science',     color: '#f0920c',
    desc: 'The systematic study of the natural world — its laws, forces, matter, life, and the universe — through observation, experimentation, and reasoning. Encoded, studied, developed, and modelled using the Energy-Based Approaches of Ifa and Orisa.' },
  { letter: 'T', name: 'Technological Codes', short: 'Technology',  color: '#14b8d4',
    desc: 'The creation and application of tools, machines, systems, and techniques that extend human capability and solve real-world problems. Encoded, studied, developed, and modelled using the Energy-Based Approaches of Ifa and Orisa.' },
  { letter: 'E', name: 'Engineering Codes',   short: 'Engineering', color: '#00c87c',
    desc: 'The disciplined design, building, and optimisation of structures, machines, systems, and processes that serve human and natural needs. Encoded, studied, developed, and modelled using the Energy-Based Approaches of Ifa and Orisa.' },
  { letter: 'A', name: 'Artistic Codes',      short: 'Arts',        color: '#ec4899',
    desc: 'The full range of human creative expression — visual art, music, literature, drama, dance, and all forms of aesthetic and cultural production. Encoded, studied, developed, and modelled using the Energy-Based Approaches of Ifa and Orisa.' },
  { letter: 'M', name: 'Management Codes',    short: 'Management',  color: '#f5c518',
    desc: 'The science and practice of organising, directing, and optimising human effort, resources, and institutions toward shared goals. Encoded, studied, developed, and modelled using the Energy-Based Approaches of Ifa and Orisa.' },
  { letter: 'S', name: 'Sociocultural Codes', short: 'Social',      color: '#8b5cf6',
    desc: 'The study of human society, behaviour, culture, economics, politics, history, and the relationships that shape collective human life. Encoded, studied, developed, and modelled using the Energy-Based Approaches of Ifa and Orisa.' },
  { letter: 'E', name: 'Educational Codes',   short: 'Education',   color: '#3b9eff',
    desc: 'The process and practice of teaching, learning, and transmitting knowledge, values, and skills across individuals, communities, and generations. Encoded, studied, developed, and modelled using the Energy-Based Approaches of Ifa and Orisa.' },
  { letter: 'X', name: 'Others (X)',           short: 'Unknowns',    color: '#6366f1',
    desc: 'All fields, disciplines, and phenomena not yet named, classified, or fully understood — the open frontier of human and cosmic knowledge. Encoded, studied, developed, and modelled using the Energy-Based Approaches of Ifa and Orisa.' },
];

// ─── DATA — IfaPL MODEL 1: Programming Languages ─────────────────────────────

const IFAPL_LANGS_DIMS = [
  { letter: 'Py', name: 'IfaPython: Python CodoE', short: 'IfaPython',   color: '#3b82f6',
    desc: 'IfaPython encodes the Python programming language through Odu Ifa structures — unifying Python\'s paradigms, dynamic typing, and library ecosystem with the 16 Laws of Knowledge.' },
  { letter: 'Jv', name: 'IfaJava: Java CodoE',     short: 'IfaJava',     color: '#f97316',
    desc: 'IfaJava expresses the Java language as an Ifa Algebra — revealing the Odu structures underlying Java\'s type system, class hierarchy, and platform-independent design.' },
  { letter: 'C',  name: 'IfaC: C CodoE',           short: 'IfaC',        color: '#94a3b8',
    desc: 'IfaC encodes the C language — the foundational systems tongue of computing — as Odu Ifa code structures, revealing its primitive knowledge laws and memory patterns.' },
  { letter: 'Hs', name: 'IfaHaskell: Haskell CodoE',short: 'IfaHaskell', color: '#8b5cf6',
    desc: 'IfaHaskell maps Haskell\'s purely functional paradigm onto Ifa Algebras — demonstrating the deep alignment of functional types and monadic structures with Odu knowledge.' },
  { letter: 'Rb', name: 'Ifa Ruby: Ruby CodoE',     short: 'IfaRuby',    color: '#dc2626',
    desc: 'Ifa Ruby encodes Ruby\'s dynamic, expressive paradigm as Odu Ifa patterns — unifying object orientation, meta-programming, and human-centred design through CodoE.' },
  { letter: 'JS', name: 'Ifa JavaScript: JS CodoE', short: 'IfaJS',      color: '#f5c518',
    desc: 'Ifa JavaScript encodes the universal language of the web through Odu Ifa — revealing the knowledge laws governing JS\'s event model, prototype chain, and asynchronous design.' },
  { letter: 'HT', name: 'IfaHTML: HTML CodoE',      short: 'IfaHTML',    color: '#f0920c',
    desc: 'IfaHTML encodes HyperText Markup Language as an Odu structure — the fundamental code of the web expressed through Ifa knowledge patterns and semantic document structures.' },
  { letter: 'X',  name: 'Other CodoEs',             short: 'OtherCodoEs',color: '#6366f1',
    desc: 'All other programming language CodoEs — Rust, Lisp, Erlang, SQL, Prolog, and beyond — encoded through the universal Odu Ifa framework of IfaPL.' },
];

// ─── DATA — IfaPL MODEL 2: SIDECHRX Principles ───────────────────────────────

const SIDECHRX_DIMS = [
  { letter: 'S', name: 'Symmetry',       short: 'Symmetry',     color: '#f0920c' },
  { letter: 'I', name: 'Invariance',     short: 'Invariance',   color: '#6366f1' },
  { letter: 'D', name: 'Duality',        short: 'Duality',      color: '#14b8d4' },
  { letter: 'E', name: 'Emergence',      short: 'Emergence',    color: '#00c87c' },
  { letter: 'C', name: 'Composition',    short: 'Composition',  color: '#ef4444' },
  { letter: 'H', name: 'Holism',         short: 'Holism',       color: '#8b5cf6' },
  { letter: 'R', name: 'Reductionism',   short: 'Reductionism', color: '#3b9eff' },
  { letter: 'X', name: 'Simulation',     short: 'Simulation',   color: '#ec4899' },
];

// ─── DATA — IfaPL MODEL 3: Paradigm Matrix (PaaL) — Ifa-Programming-2 ────────

const IFAPL_PAL_DIMS = [
  { letter: 'FP', name: 'Functional',      short: 'Functional',  color: '#8b5cf6',
    desc: 'Functional programming — computation as mathematical function application. IfaPL reveals Functional PL as a manifestation of Ifa function algebras (FunctoEs) and Odu mappings.' },
  { letter: 'OO', name: 'Object-Oriented', short: 'OO',          color: '#3b9eff',
    desc: 'Object-Oriented programming — knowledge encoded as interacting objects. IfaPL models OOP as an Ifa algebra of encapsulated knowledge nodes governed by Odu inheritance laws.' },
  { letter: 'PD', name: 'Procedural',      short: 'Procedural',  color: '#00c87c',
    desc: 'Procedural programming — sequential instruction sets encoding computational processes. Mapped to Odu Ifa as step-by-step knowledge operations through Ifa procedural codes.' },
  { letter: 'LP', name: 'Logic',           short: 'Logic',       color: '#f5c518',
    desc: 'Logic programming — computation through logical inference and constraint solving. IfaPL models Logic PL through the 16 Ifa Axiom inference system and Odu truth patterns.' },
  { letter: 'CP', name: 'Concurrent',      short: 'Concurrent',  color: '#f0920c',
    desc: 'Concurrent programming — parallel execution models and process communication. Encoded in IfaPL as multi-dimensional Odu interaction patterns and simultaneous knowledge flows.' },
  { letter: 'MP', name: 'Meta-Language',   short: 'Meta-PL',     color: '#14b8d4',
    desc: 'Meta-programming — code that generates or transforms other code. The deepest expression of PaaL: the language writing itself, governed by Ifa meta-structural laws.' },
  { letter: 'DC', name: 'Declarative',     short: 'Declarative', color: '#ec4899',
    desc: 'Declarative programming — expressing WHAT to compute, not HOW. IfaPL maps declarative paradigms to Ifa knowledge specification structures and Odu declarative codes.' },
  { letter: 'IP', name: 'Imperative',      short: 'Imperative',  color: '#6366f1',
    desc: 'Imperative programming — explicit step-by-step control flow. The foundational computational mode encoded as Odu Ifa procedural knowledge laws and explicit state transitions.' },
];

// ─── DATA — IfaPL MODEL 4: Knowledge-Language Matrix (KL) — Ifa-Programming-3 ─

const IFAPL_KL_DIMS = [
  { letter: 'Sy', name: 'Syntax Systems',  short: 'Syntax',      color: '#f5c518',
    desc: 'Formal syntax, grammars, and parsing systems — the surface structure of any PL encoded as Odu knowledge-language patterns (KL-Syntax), governing valid code forms.' },
  { letter: 'Sm', name: 'Semantics',       short: 'Semantics',   color: '#8b5cf6',
    desc: 'Denotational, operational, and axiomatic semantics — the meaning layer of PLs mapped through Ifa knowledge semantics (KL-Semantics) and Odu interpretation laws.' },
  { letter: 'Ty', name: 'Type Systems',    short: 'Types',       color: '#3b9eff',
    desc: 'Static and dynamic type systems — the classification and constraint structures of PLs expressed as Ifa Algebra type hierarchies (KL-Types) rooted in Odu knowledge.' },
  { letter: 'Mm', name: 'Memory Models',   short: 'Memory',      color: '#00c87c',
    desc: 'Stack, heap, garbage collection, and memory management — the physical knowledge substrate of all PLs encoded through Ifa resource laws (KL-Memory) and Odu patterns.' },
  { letter: 'Ev', name: 'Evaluation',      short: 'Evaluation',  color: '#f0920c',
    desc: 'Eager and lazy evaluation strategies, reduction rules, and execution order — encoded as Odu evaluation patterns in the IfaPL Knowledge-Language framework (KL-Eval).' },
  { letter: 'Md', name: 'Modularity',      short: 'Modularity',  color: '#14b8d4',
    desc: 'Module systems, namespaces, encapsulation, and package management — the structural knowledge units of PLs encoded as Ifa modular patterns (KL-Module) and Odu bundles.' },
  { letter: 'Cn', name: 'Concurrency',     short: 'Concurrency', color: '#ec4899',
    desc: 'Threads, actors, async/await, and parallel computation — the multi-dimensional execution model of PLs through Ifa concurrent knowledge-language laws (KL-Concurrent).' },
  { letter: 'ML', name: 'Meta-Language',   short: 'Meta-Lang',   color: '#6366f1',
    desc: 'Macros, reflection, meta-objects, and language-level extensibility — the self-referential X-layer of all PLs encoded as IfaLang meta-structures (KL-Meta). The key of PaaL.' },
];

// ─── MATRIX DIAGRAM COMPONENT ─────────────────────────────────────────────────

function MatrixDiagram({ index, title, centerLine1, centerLine2, accentColor, dims, imageUrl, imageAlt, ringText }) {
  const [active, setActive]         = useState(false);
  const [hoveredDim, setHoveredDim] = useState(null);
  const [pinnedDim, setPinnedDim]   = useState(null);

  const cx = 310, cy = 250, nodeR = 172, centerR = 50, dimR = 27;
  const color = accentColor || '#f0920c';
  const arcText = ringText || 'IFA CODE · CODOE · ODU IFA · IFAPL · PROGRAMMING FOR EVERYTHING ·';
  const gradId   = 'mdx-cg-' + index;
  const bgGradId = 'mdx-bg-' + index;
  const arcId    = 'mdx-arc-' + index;

  const nodes = dims.map((d, i) => {
    const angle = (i / 8) * 2 * Math.PI - Math.PI / 2;
    return { ...d, x: cx + nodeR * Math.cos(angle), y: cy + nodeR * Math.sin(angle), angle };
  });

  const hovNode      = pinnedDim !== null ? nodes[pinnedDim] : hoveredDim !== null ? nodes[hoveredDim] : null;
  const handleToggle = () => { setActive(v => !v); setHoveredDim(null); setPinnedDim(null); };
  const handleDimClick = (i) => { if (!active) return; setPinnedDim(p => p === i ? null : i); };

  // font size for center label based on length
  const fs1 = centerLine1.length <= 3 ? 21 : centerLine1.length <= 5 ? 16 : 12;

  return (
    <div className={`stx-diagram${imageUrl ? '' : ' stx-diagram--graph-only'}`}>
      {imageUrl && (
        <div className="stx-diagram__img-frame">
          <img src={imageUrl} alt={imageAlt} loading="lazy" />
          <div className="stx-diagram__img-caption">{imageAlt}</div>
        </div>
      )}

      <div className="stx-diagram__graph-wrap">
        <div className="stx-diagram__title">{title}</div>
        <div className="stx-diagram__hint">
          {!active
            ? <>Click <strong style={{ color }}>{centerLine1}</strong> to open the 0+8D Matrix →</>
            : <span style={{ color, fontSize: '0.68rem' }}>◈ Matrix open — hover a node, click to pin its description</span>
          }
        </div>

        <svg viewBox="0 0 620 500" className="stx-svg">
          <defs>
            <radialGradient id={gradId} cx="50%" cy="50%" r="50%">
              <stop offset="0%"   stopColor={color} stopOpacity="0.38" />
              <stop offset="100%" stopColor={color} stopOpacity="0" />
            </radialGradient>
            <radialGradient id={bgGradId} cx="50%" cy="50%" r="50%">
              <stop offset="0%"   stopColor="#0d1320" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#050810" stopOpacity="0" />
            </radialGradient>
            <path id={arcId}
              d={'M ' + cx + ',' + (cy - nodeR - 20) +
                 ' A ' + (nodeR + 20) + ',' + (nodeR + 20) +
                 ' 0 1 1 ' + (cx - 0.01) + ',' + (cy - nodeR - 20)} />
          </defs>

          {/* Soft background halo */}
          <circle cx={cx} cy={cy} r={nodeR + 36} fill={'url(#' + bgGradId + ')'} />

          {/* Orbit ring */}
          <circle cx={cx} cy={cy} r={nodeR} fill="none"
            stroke="rgba(255,255,255,0.045)" strokeWidth="1" strokeDasharray="3 7" />

          {/* Orbit arc text */}
          <text opacity={active ? 1 : 0}
            style={{ transition: 'opacity 0.65s ease 0.5s' }}
            fill="rgba(255,255,255,0.13)" fontSize="7" letterSpacing="2.5" fontFamily="monospace">
            <textPath startOffset="3%" href={'#' + arcId}>{arcText}</textPath>
          </text>

          {/* Edges */}
          {nodes.map((d, i) => {
            const sx = cx + (centerR + 6) * Math.cos(d.angle);
            const sy = cy + (centerR + 6) * Math.sin(d.angle);
            const ex = cx + (nodeR - dimR - 4) * Math.cos(d.angle);
            const ey = cy + (nodeR - dimR - 4) * Math.sin(d.angle);
            const len = Math.hypot(ex - sx, ey - sy).toFixed(1);
            const delay = active ? i * 52 : 0;
            return (
              <line key={i} x1={sx} y1={sy} x2={ex} y2={ey}
                stroke={d.color} strokeWidth="1.5"
                strokeDasharray={len}
                strokeDashoffset={active ? 0 : len}
                opacity={active ? 0.72 : 0}
                style={{ transition: 'stroke-dashoffset 0.55s ease ' + delay + 'ms, opacity 0.3s ease ' + delay + 'ms' }} />
            );
          })}

          {/* Dimension nodes */}
          {nodes.map((d, i) => {
            const isPin  = pinnedDim === i;
            const isHov  = hoveredDim === i || isPin;
            const delay  = active ? i * 52 + 180 : 0;
            const lblLen = d.letter.length;
            const lfs    = lblLen <= 2 ? 14 : lblLen <= 3 ? 11 : 9;
            return (
              <g key={i}>
                {/* Glow halo — fixed size, only opacity changes */}
                <circle cx={d.x} cy={d.y} r={dimR + 5} fill={d.color}
                  opacity={active ? (isHov ? 0.22 : 0.08) : 0}
                  style={{ transition: 'opacity 0.4s ease ' + delay + 'ms' }} />
                {/* Node ring — thicker when pinned */}
                <circle cx={d.x} cy={d.y} r={dimR}
                  fill="var(--bg-3)" stroke={d.color}
                  strokeWidth={isPin ? 3.5 : isHov ? 2.5 : 1.5}
                  opacity={active ? 1 : 0}
                  style={{ transition: 'opacity 0.4s ease ' + delay + 'ms, stroke-width 0.18s' }} />
                <text x={d.x} y={d.y - 5} textAnchor="middle"
                  fill={d.color} fontSize={lfs} fontWeight="800" fontFamily="monospace"
                  opacity={active ? 1 : 0}
                  style={{ transition: 'opacity 0.45s ease ' + (delay + 80) + 'ms' }}>
                  {d.letter}
                </text>
                <text x={d.x} y={d.y + 12} textAnchor="middle"
                  fill={d.color} fontSize="8.5"
                  opacity={active ? 0.85 : 0}
                  style={{ transition: 'opacity 0.45s ease ' + (delay + 80) + 'ms' }}>
                  {d.short}
                </text>
                {/* Hit area */}
                <circle cx={d.x} cy={d.y} r={dimR + 10} fill="transparent"
                  style={{ cursor: active ? 'pointer' : 'default' }}
                  onMouseEnter={() => active && setHoveredDim(i)}
                  onMouseLeave={() => setHoveredDim(null)}
                  onClick={() => handleDimClick(i)} />
              </g>
            );
          })}

          {/* Center node */}
          <g onClick={handleToggle} style={{ cursor: 'pointer' }}>
            <circle cx={cx} cy={cy} r="70" fill="none"
              stroke={color} strokeWidth="1.2" className="stx-pulse" />
            <circle cx={cx} cy={cy} r={centerR + 14} fill={'url(#' + gradId + ')'} />
            <circle cx={cx} cy={cy} r={centerR}
              fill="var(--bg-3)" stroke={color} strokeWidth="2.5" />
            <text x={cx} y={centerLine2 ? cy - 9 : cy + 6} textAnchor="middle"
              fill={color} fontSize={fs1} fontWeight="900"
              letterSpacing="1.5" fontFamily="monospace">{centerLine1}</text>
            {centerLine2 && (
              <text x={cx} y={cy + 9} textAnchor="middle"
                fill={color} fontSize="8.5" opacity="0.8" fontFamily="monospace">
                {centerLine2}
              </text>
            )}
            <text x={cx} y={cy + (centerLine2 ? 22 : 19)} textAnchor="middle"
              fill={color} fontSize="7" opacity="0.65">
              {active ? '◈ CLICK TO CLOSE' : '↓ CLICK TO OPEN'}
            </text>
          </g>
        </svg>

        {/* Info panel — fixed-height wrapper prevents layout shifts */}
        <div style={{ minHeight: 90, flexShrink: 0 }}>
          {hovNode ? (
            <div className="stx-dim-info" style={{ '--c': hovNode.color }}>
              <div className="stx-dim-info__letter">{hovNode.letter}</div>
              <div className="stx-dim-info__content">
                <div className="stx-dim-info__name">
                  {hovNode.name}
                  {pinnedDim !== null && <span className="stx-dim-info__pin">◈ pinned · click to release</span>}
                </div>
                <p className="stx-dim-info__desc">{hovNode.desc}</p>
              </div>
            </div>
          ) : active ? (
            <div className="stx-dim-hint">Hover a node to preview · click to pin its description · {dims.length} dimensions active</div>
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
        <a href="../../" className="header__brand">
          <img src="../../src/assets/itoe_logo.png" alt="iTOE" className="header__logo" />
          <div>
            <div className="header__site">The IFA Internet</div>
            <div className="header__name">IFA Mathematica · IFA Code</div>
          </div>
        </a>
        <nav className="header__nav">
          <a className="nav-link" href="#codoe">CodoE</a>
          <a className="nav-link" href="#ifapl">IfaPL</a>
          <a className="nav-link" href="#paal">PaaL</a>
          <a className="nav-link" href="../">IFA Mathematica</a>
          <a className="nav-link nav-link--cta"
             href="https://toe.cenproject.org/ifa-programming-language-ifa-pl/"
             target="_blank" rel="noopener noreferrer">IfaPL on TOE</a>
        </nav>
      </div>
    </header>
  );
}

// ─── MOBILE BAR ──────────────────────────────────────────────────────────────

function MobileBar() {
  const items = [
    { sym: '⌂',  label: 'IFA Math',  href: '../' },
    { sym: '⊞',  label: 'CodoE',     href: '#codoe' },
    { sym: '{ }',label: 'IfaPL',     href: '#ifapl' },
    { sym: '∞',  label: 'PaaL',      href: '#paal' },
    { sym: '↗',  label: 'TOE',       href: 'https://toe.cenproject.org/ifa-programming-language-ifa-pl/' },
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
    <section className="hero hero--sub">
      <div className="hero__bg">
        <div className="hero__grid" />
        <div className="hero__orb hero__orb--a" style={{ '--orb-color': '#f0920c' }} />
        <div className="hero__orb hero__orb--b" style={{ '--orb-color': '#8b5cf6' }} />
        <div className="hero__orb hero__orb--c" />
        <div className="hero__scanline" />
      </div>
      <div className="container hero__layout hero__layout--full">
        <div className="hero__left hero__left--full">
          <div className="ifc-breadcrumb">
            <a href="../../" className="ifc-breadcrumb__link">The IFA Internet</a>
            <span className="ifc-breadcrumb__sep"> › </span>
            <a href="../" className="ifc-breadcrumb__link">IFA Mathematica</a>
            <span className="ifc-breadcrumb__sep"> › </span>
            <span className="ifc-breadcrumb__cur">IFA Code</span>
          </div>

          <div className="hero__badge">
            <span className="hero__badge-dot" />
            IFA Mathematica — IFA Code Platform
          </div>

          <h1 className="hero__title">
            <span className="hero__title-main">IFA Code</span>
            <span className="hero__title-sub">Odù Ifá — Codes for Everything (CodoE)</span>
          </h1>

          <p className="hero__tagline">
            Knowledge Codes &mdash; ToE Codes &mdash; Ẹ̀rìndínlọ́tàlenígba Odùfá
          </p>

          <p className="hero__yoruba">
            <span className="hero__yoruba-yor">Ẹ̀rìndínlọ́tàlenígba Odùfá — Odù fún Gbogbo Ìmọ̀ Lágbaye — Odù fún Gbogbonkan</span>
            <span className="hero__yoruba-sep"> · </span>
            <span className="hero__yoruba-en">256 Ifa Codes — Codes for All Knowledge in the World — Codes for Everything</span>
          </p>

          <p className="hero__desc">
            Ifa Codes (Odù Ifá) are the <strong>Codes for Everything (CodoE)</strong> — also known as
            Knowledge Codes, ToE Codes, and Ifa Programming Codes. The 256 Odu Ifa
            constitute the <strong>Universal Code Matrix</strong> underlying all fields of knowledge,
            all programming languages, and all systems of the IFA Internet.
          </p>

          <div className="ifc-alias-row">
            {['CodoE', 'Knowledge Codes', 'ToE Codes', 'Ifa Programming Codes', '256 Odu', 'IfaPL', 'Code Matrix'].map((a, i) => (
              <span key={i} className="ifc-alias">{a}</span>
            ))}
          </div>

          <div className="hero__ctas">
            <a href="#codoe" className="btn btn--primary">Explore CodoE Matrix</a>
            <a href="#ifapl" className="btn btn--ghost">Ifa Programming Language</a>
          </div>
        </div>
      </div>

      <div className="hero__stats-bar">
        <div className="container">
          <div className="hero__stats">
            {[
              { value: '256',   label: 'Odu Ifa',        sub: 'The Universal Code Matrix' },
              { value: '8D',    label: 'CodoE Matrix',   sub: 'Knowledge Code Dimensions' },
              { value: 'IfaPL', label: 'Ifa PL',         sub: 'Programming for Everything' },
              { value: 'SYMBOE', label: 'Code Fields',    sub: 'All Domains, All Languages' },
            ].map((s, i) => (
              <div key={i} className="hero__stat">
                <div className="hero__stat-value">{s.value === 'SYMBOE' ? <OgbeSymbol size={46} /> : s.value}</div>
                <div className="hero__stat-label">{s.label}</div>
                <div className="hero__stat-sub">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── IFA CODE / CodoE SECTION ─────────────────────────────────────────────────

function IfaCodeSection() {
  return (
    <section className="section" id="codoe">
      <div className="container">
        <div className="section__header section__header--center">
          <span className="section__eyebrow section__eyebrow--amber">The Universal Code Matrix</span>
          <h2 className="section__title">
            Ifa Codes (Odù Ifá) — <span className="accent--amber">CodoE</span>
          </h2>
          <p className="section__subtitle">
            Ifa Codes (Odù Ifá) are the <strong>Codes for Everything (CodoE)</strong> — Knowledge Codes,
            ToE Codes, and the axiomatic code matrix of all fields of knowledge.
            The 0+8D IFA Code Matrix organises all knowledge into 8 CodoE dimensions.
          </p>
        </div>

        <div className="ifc-intro-grid">
          <div className="ifc-def-block">
            <div className="ifc-def-block__icon">⊞</div>
            <div>
              <div className="ifc-def-block__label">Codes for Everything (CodoE)</div>
              <p className="ifc-def-block__body">
                CodoE is the Universal Code System of the IFA Internet — encoding all fields
                of knowledge, all sciences, technologies, arts, and disciplines as Ifa Code
                Structures rooted in the 256 Odu Ifa Axiomatic Matrices.
              </p>
            </div>
          </div>
          <div className="ifc-def-block">
            <div className="ifc-def-block__icon">⌥</div>
            <div>
              <div className="ifc-def-block__label">Knowledge Codes · ToE Codes</div>
              <p className="ifc-def-block__body">
                Every field of knowledge has its corresponding Ifa Code (Odufa) — a formal encoding
                through the 256 Odu Ifa. Scientific codes, artistic codes, engineering codes,
                and all others are unified dimensions of the CodoE.
              </p>
            </div>
          </div>
          <div className="ifc-def-block">
            <div className="ifc-def-block__icon">{ }</div>
            <div>
              <div className="ifc-def-block__label">Ifa Programming — One Dimension of CodoE</div>
              <p className="ifc-def-block__body">
                Ifa Programming (IfaPL) is one of the many CodoE dimensions — the coding of
                all programming languages as Odu Ifa structures.{' '}
                <a href="https://toe.cenproject.org/ifa-programming-language-ifa-pl/"
                   target="_blank" rel="noopener noreferrer" className="ifc-link">
                  Explore IfaPL on TOE →
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="ifc-diagram-wrap ifc-diagram-wrap--single">
          <MatrixDiagram
            index={0}
            title="The IFA Code Matrix · 0+8D CodoE"
            centerLine1="IFA"
            centerLine2="CODES"
            accentColor="#f0920c"
            dims={CODOE_DIMS}
            ringText="IFA CODE · CODOE · KNOWLEDGE CODES · TOE CODES · ODU IFA · 256 ·"
          />
        </div>
      </div>
    </section>
  );
}

// ─── IfaPL SECTION ────────────────────────────────────────────────────────────

function IfaPLSection() {
  return (
    <section className="section section--alt" id="ifapl">
      <div className="container">
        <div className="section__header section__header--center">
          <span className="section__eyebrow section__eyebrow--violet">Ifa Programming Language</span>
          <h2 className="section__title">
            IfaPL — <span className="accent--violet">Programming for Everything</span>
          </h2>
          <p className="section__subtitle">
            Ifa Programming is one of the many Dimensions of the CodoE.
            IfaPL is the <strong>universe of programming languages</strong> — revealing the
            Fundamental Principles (16 Odu Ifa) as the Meta-Structures that underpin all
            programming languages and their models.
          </p>
        </div>

        <div className="ifc-notice">
          <span className="ifc-notice__icon">{ }</span>
          <div>
            <strong>Ifa Programming Language (IfaPL)</strong> — Ifa Programming: Programming for Everything.
            Also known as <strong>Programming-as-a-Language (PaaL)</strong>, IfaPL is a tool for scientifically
            studying the features and principles common to all PLs and modelling them using Ifabits.{' '}
            <a href="https://toe.cenproject.org/ifa-programming-language-ifa-pl/"
               target="_blank" rel="noopener noreferrer" className="ifc-link">
              Read full article on TOE Mathematics →
            </a>
          </div>
        </div>

        {/* Model 1: IfaPL Languages */}
        <div className="ifc-model-header">
          <div className="ifc-model-num">Model 1</div>
          <div>
            <h3 className="ifc-model-title">IFA Code: IfaPL — Programming Language CodoEs</h3>
            <p className="ifc-model-sub">Node: <em>Ifa Codes: IfaPL</em> · 8 programming language dimensions</p>
          </div>
        </div>
        <div className="ifc-diagram-wrap ifc-diagram-wrap--single">
          <MatrixDiagram
            index={1}
            title="Ifa Codes: IfaPL — 0+8D Programming Language Matrix"
            centerLine1="IfaPL"
            centerLine2="Ifa Codes"
            accentColor="#8b5cf6"
            dims={IFAPL_LANGS_DIMS}
            ringText="IFAPL · IFA CODES · CODOE · PYTHON · JAVA · HASKELL · JAVASCRIPT · HTML ·"
          />
        </div>

        {/* Model 2: SIDECHRX Principles */}
        <div className="ifc-model-header">
          <div className="ifc-model-num">Model 2</div>
          <div>
            <h3 className="ifc-model-title">IfaPL — 8 SIDECHRX Principles</h3>
            <p className="ifc-model-sub">Node: <em>IfaPL: Programming for Everything</em> · 8 SIDECHRX meta-principles</p>
            <p className="ifc-model-sub">The 16 General Laws of Ifa Governing All PLs</p>
          </div>
        </div>
        <div className="ifc-diagram-wrap ifc-diagram-wrap--single">
          <MatrixDiagram
            index={2}
            title="IfaPL: Programming for Everything — 0+8D SIDECHRX Matrix"
            centerLine1="IfaPL"
            centerLine2="ProgoE"
            accentColor="#3b9eff"
            dims={SIDECHRX_DIMS}
            ringText="SIDECHRX · SYNTAX · INTEGRATION · DATA · EXPRESSIVENESS · COMPLETENESS · HIERARCHY · RECURSION · EXTENSIBILITY ·"
          />
        </div>
      </div>
    </section>
  );
}

// ─── IfaPL IMAGE MODELS SECTION ───────────────────────────────────────────────

function IfaPLImageSection() {
  return (
    <section className="section section--dark" id="ifapl-models">
      <div className="container">
        <div className="section__header section__header--center">
          <span className="section__eyebrow section__eyebrow--gold">Ifa Meta-Programming: IfaPL Deep Models</span>
          <h2 className="section__title">
            IfaPL <span className="accent--gold">Paradigm &amp; Knowledge Matrices</span>
          </h2>
          <p className="section__subtitle">
            Two complementary 0+8D views of IfaPL — the Paradigm Matrix (PaaL) and the
            Knowledge-Language Matrix (KL) — encoded through the 256 Odu Ifa.
          </p>
        </div>

        {/* Model 3: PaaL Paradigm Matrix with image 2 */}
        <div className="ifc-model-header">
          <div className="ifc-model-num">Model 3</div>
          <div>
            <h3 className="ifc-model-title">IfaPL: PaaL — Programming Paradigm Matrix</h3>
            <p className="ifc-model-sub">Node: <em>IfaPL: PaaL</em> · 8 programming paradigm dimensions</p>
          </div>
        </div>
        <div className="ifc-diagram-wrap">
          <MatrixDiagram
            index={3}
            title="IfaPL: PaaL — 0+8D Programming Paradigm Matrix"
            centerLine1="PaaL"
            accentColor="#f5c518"
            dims={IFAPL_PAL_DIMS}
            imageUrl="../src/Ifa-Programming-2-768x340.png"
            imageAlt="Ifa Programming — PaaL Paradigm Matrix"
            ringText="PAAL · PROGRAMMING AS A LANGUAGE · FUNCTIONAL · OO · PROCEDURAL · LOGIC · CONCURRENT · META · DECLARATIVE · IMPERATIVE ·"
          />
        </div>

        {/* Model 4: KL Knowledge-Language Matrix with image 3 */}
        <div className="ifc-model-header">
          <div className="ifc-model-num">Model 4</div>
          <div>
            <h3 className="ifc-model-title">IfaPL: KL — Knowledge-Language Matrix</h3>
            <p className="ifc-model-sub">Node: <em>IfaPL: IfaKL</em> · 8 knowledge-language meta-structure dimensions</p>
          </div>
        </div>
        <div className="ifc-diagram-wrap">
          <MatrixDiagram
            index={4}
            title="IfaPL: IfaKL — 0+8D Knowledge-Language Matrix"
            centerLine1="IfaKL"
            accentColor="#00c87c"
            dims={IFAPL_KL_DIMS}
            imageUrl="../src/Ifa-Programming-3-768x340.png"
            imageAlt="Ifa Programming — Knowledge-Language Matrix"
            ringText="IFAKL · KNOWLEDGE LANGUAGE · SYNTAX · SEMANTICS · TYPES · MEMORY · EVALUATION · MODULARITY · CONCURRENCY · META ·"
          />
        </div>
      </div>
    </section>
  );
}

// ─── PaaL / PL-UI EXPLANATION SECTION ────────────────────────────────────────

function PaaLSection() {
  const concepts = [
    {
      sym: '{ }',
      color: '#f5c518',
      title: 'IfaPL — Universe of Programming Languages',
      body: 'IfaPL is the universe of programming languages (PLs). It reveals the Fundamental Principles (16 Odu Ifa) as the Meta-Structures that underpin all programming languages and their models. Every programming language — from Python to Haskell, C to HTML — is modelled and studied as an element of IfaPL.'
    },
    {
      sym: '↔',
      color: '#8b5cf6',
      title: 'PaaL — Programming-as-a-Language',
      body: 'Also known as Programming-as-a-Language (PaaL), IfaPL is a tool for scientifically studying the features or principles common and fundamental to all PLs, and modelling them using Ifabits. PaaL treats the entire space of programming languages as a single unified Language.'
    },
    {
      sym: '⊗',
      color: '#3b9eff',
      title: 'PL-UI — Programming Language Unification & Integration',
      body: 'Programming Language Unification & Integration (PL-UI), also known as PL/UI, is the project of unifying all programming languages under IfaPL. PL-UI demonstrates that all PLs share a common Meta-Axiomatic Foundation: the 16 Odu Ifa as Universal Programming Laws governing all computational paradigms.'
    },
    {
      sym: 'KL',
      color: '#00c87c',
      title: 'Knowledge Language (KL) — IfaLang Meta-Structure',
      body: 'PL/UI is also known as the knowledge language (KL) — a key meta-structure of IfaLang. Every programming language X can be expressed as a knowledge language through IfaLang, revealing its underlying Odu Ifa code structure.'
    },
    {
      sym: 'XaaL',
      color: '#f0920c',
      title: 'IfaX — X-as-a-Language (XaaL)',
      body: 'Ifa X or IfaX (X-as-a-Language, XaaL) is any programming language X expressed in IfaLang. IfaPython is Python-as-a-Language (PyaaL), IfaJava is Java-as-a-Language (JavaaaL), and so on. XaaL unifies all programming languages as dialects of the universal IfaPL knowledge language.'
    },
    {
      sym: '16',
      color: '#e040fb',
      title: '16 Odu Ifa — Universal Programming Laws',
      body: 'The 16 Principal Odu Ifa are the Universal Programming Laws (UPLs) — the irreducible Meta-Structures underlying all programming languages. They are the Ifa Axioms of computation: governing syntax, semantics, type systems, evaluation, and every other dimension of the SIDECHRX Framework.'
    },
  ];

  return (
    <section className="section" id="paal">
      <div className="container">
        <div className="section__header section__header--center">
          <span className="section__eyebrow section__eyebrow--electric">The Foundation of IfaPL</span>
          <h2 className="section__title">
            PaaL · PL-UI · <span className="accent--electric">IfaX</span>
          </h2>
          <p className="section__subtitle">
            Understanding IfaPL as the meta-language of all programming languages —
            through Programming-as-a-Language (PaaL), PL Unification &amp; Integration,
            and X-as-a-Language (XaaL).
          </p>
        </div>

        <div className="ifc-concepts-grid">
          {concepts.map((c, i) => (
            <div key={i} className="ifc-concept-card" style={{ '--cc': c.color }}>
              <div className="ifc-concept-card__sym">{c.sym}</div>
              <h3 className="ifc-concept-card__title">{c.title}</h3>
              <p className="ifc-concept-card__body">{c.body}</p>
              <div className="ifc-concept-card__glow" />
            </div>
          ))}
        </div>

        <div className="ifc-cta-block">
          <div className="ifc-cta-block__inner">
            <div className="ifc-cta-block__icon">{ }</div>
            <div>
              <div className="ifc-cta-block__title">Explore Ifa Programming Language on TOE Mathematics</div>
              <p className="ifc-cta-block__body">
                The full Ifa Programming Language (IfaPL) article — including IfaPL as the CodoE of
                all programming, the SIDECHRX framework, and the 16 Odu Ifa programming laws — is
                published on TOE Mathematics (toe.cenproject.org).
              </p>
              <div className="ifc-cta-block__actions">
                <a href="https://toe.cenproject.org/ifa-programming-language-ifa-pl/"
                   target="_blank" rel="noopener noreferrer" className="btn btn--primary">
                  Read IfaPL on TOE Mathematics
                </a>
                <a href="../" className="btn btn--ghost">Back to IFA Mathematica</a>
              </div>
            </div>
          </div>
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
              <img src="../../src/assets/itoe_logo.png" alt="iTOE" className="footer__logo-mark" />
              <span>The IFA Internet</span>
            </div>
            <p className="footer__tagline">IFA Code — Odù Ifá Codes for Everything (CodoE)</p>
            <p className="footer__tagline footer__tagline--sm">
              Part of <a href="../" className="footer__link-inline">IFA Mathematica</a> ·{' '}
              <a href="https://cenproject.org/" className="footer__link-inline">CENProject</a>
            </p>
          </div>
          <nav className="footer__links">
            <a href="#codoe"      className="footer__link">CodoE Matrix</a>
            <a href="#ifapl"      className="footer__link">IfaPL</a>
            <a href="#ifapl-models" className="footer__link">PaaL · KL</a>
            <a href="#paal"       className="footer__link">PL-UI · XaaL</a>
            <a href="../"         className="footer__link">IFA Mathematica</a>
            <a href="../../"      className="footer__link">IFA Internet</a>
          </nav>
        </div>
        <div className="footer__bottom">
          <span className="footer__copy">
            &copy; 2026 CENProject Innovations Limited. All rights reserved.
          </span>
          <span className="footer__powered">
            IFA Code · IFA Mathematica Platform · The IFA Internet
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
        <IfaCodeSection />
        <IfaPLSection />
        <IfaPLImageSection />
        <PaaLSection />
      </main>
      <Footer />
      <MobileBar />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
