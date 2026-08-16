/* ─────────────────────────────────────────────────────────────────────────────
   IEMBOK — Ifa/Orisa Engineering Management Body of Knowledge
   The IFA Internet · IFABOK · CENProject
   ifainternet.org/iembok/
───────────────────────────────────────────────────────────────────────────── */

const { useState } = React;

// ─── DATA ─────────────────────────────────────────────────────────────────────

const STATS = [
  { num: '16',  label: 'Laws of Ifa/Orisa',   sub: 'Oju Odu Merindinlogun' },
  { num: '256', label: 'Odu Ifa',              sub: 'Complete Knowledge Matrix' },
  { num: '4',   label: 'Foundation Odu',       sub: 'Engineering Management Core' },
  { num: '8',   label: 'Core Lenses',          sub: 'IEMBOK Research Areas' },
];

// marks: 4 rows; 1 = single bar (ojukọ), 2 = double bar (ẹtẹjọ)
// Meji = both left and right columns are identical
const FOUNDATION_ODU = [
  {
    num: '09',
    name: 'Ogunda Méjì',
    yoruba: 'Ògún-dá Méjì',
    role: 'Engineering Body of Knowledge',
    badge: 'EngBoK · Ifa Engineering',
    marks: [1, 1, 1, 2],
    color: '#e05520',
    glyph: 'Ọ̀G',
    desc: 'Ogunda Meji is the Odu Ifa that governs iron, metals, technology, engineering, paths, the clearing of obstacles, and other areas. In the IFABOK, Ogun Meji is the Engineering Body of Knowledge (EngBoK) — the primary Source of engineering principles, laws, and methods expressed in IfaLang/OrisaLang. It embodies the science of building, forging, and creating solutions to complex problems across every dimension of reality.',
  },
  {
    num: '06',
    name: 'Owonrin Méjì',
    yoruba: 'Òwọ́nrín Méjì',
    role: 'Innovation & Complexity Science',
    badge: 'Complexity Theory · Disruption',
    marks: [2, 2, 1, 1],
    color: '#8b5cf6',
    glyph: 'ỌW',
    desc: 'Owonrin Meji is the Odu of physics, innovation, radical disruption, transformation, quants, and other areas. In management science it underpins complexity theory, disruptive innovation, and the management of nonlinear, unpredictable systems, and others. Owonrin reveals the hidden order within chaos — a foundational principle of engineering management, complex adaptive systems, and the science of technological invention.',
  },
  {
    num: '07',
    name: 'Obara Méjì',
    yoruba: 'Òbàrà Méjì',
    role: 'Leadership & Authority Sciences',
    badge: 'Governance Theory · Authority',
    marks: [1, 2, 2, 2],
    color: '#f5c518',
    glyph: 'ỌB',
    desc: 'Obara Meji is the Odu of royalty, authority, leadership, management, and magnanimity. In the IFABOK, Obara Meji governs leadership science, management science, organizational authority structures, governance theory, the science of influence and command, and other areas. It encodes the Principles by which leaders and managers build, sustain, and expand institutions — the Ifa Foundation of organizational leadership and engineering governance.',
  },
  {
    num: '11',
    name: 'Ìká Méjì',
    yoruba: 'Ìká Méjì',
    role: 'Strategy & Knowledge Systems',
    badge: 'Strategic Planning · Info Science',
    marks: [2, 1, 2, 2],
    color: '#0ea5e9',
    glyph: 'ÌK',
    desc: 'Ika Meji governs quants, knowledge systems, mathematical sciences, number systems, number algebras, strategic intelligence, information architecture, and others. In the IFABOK, Ika Meji underlies management science theories of strategic planning, quantitative analysis, organizational design, knowledge management, information systems, and others. It encodes the science of structuring knowledge and complex systems for maximum strategic effectiveness and organizational advantage.',
  },
];

const LENSES = [
  {
    icon: '⚡',
    title: 'Ifá & Òrìṣà Knowledge Systems',
    body: 'Engineering and management principles encoded based on the 256 Ifa Laws of Nature and 16 Orisa Laws of Nature — the primary Source Framework of IEMBOK. Every management theory is traceable to an Odu Ifa.',
    color: '#e05520',
  },
  {
    icon: '⟲',
    title: 'Systems Thinking',
    body: 'Holistic analysis of complex engineering and organizational systems, feedback loops, and emergent properties — rooted in Ifa\'s systemic, interconnected worldview of all reality.',
    color: '#8b5cf6',
  },
  {
    icon: '∑',
    title: 'Mathematical Modeling',
    body: 'Formal quantitative modeling of engineering management phenomena using IfaLang, OrisaLang, and the metamathematical structures of the Odu Ifa.',
    color: '#0ea5e9',
  },
  {
    icon: '◎',
    title: 'Holistic Problem Solving',
    body: 'Polymathic, interdisciplinary approaches to complex engineering and organizational problems — drawing simultaneously from multiple fields of knowledge as Ifa prescribes.',
    color: '#00c87c',
  },
  {
    icon: '◈',
    title: 'Organizational Leadership',
    body: 'Leadership theories and practices grounded in Ifa Orisa principles — developing leaders who embody Ifa\'s governance wisdom and the Odu Ifa leadership models.',
    color: '#f5c518',
  },
  {
    icon: '⋈',
    title: 'Knowledge Integration',
    body: 'Synthesis of engineering, management, humanities, and sciences — advancing the Theory of Everything (TOE) in management through Ifa\'s integrative knowledge system.',
    color: '#e9498a',
  },
  {
    icon: '✦',
    title: 'Innovation Management',
    body: 'Managing creativity, invention, and technological transformation through Owonrin Meji\'s disruptive innovation principles and the boundless creative force of Ifa.',
    color: '#a78bfa',
  },
  {
    icon: '⊞',
    title: 'Engineering Governance',
    body: 'Ethical, accountable, and effective engineering governance — including policy, standards, and regulatory principles derived from Ifa Orisa law and the Odu Ifa.',
    color: '#3b9eff',
  },
];

const PURPOSES = [
  { n: '01', text: 'Advance the General (Grand Unified) Theory (GUT) of engineering management discovered in the Odu Ifa and Odu Orisa.' },
  { n: '02', text: 'Generalize key principles of engineering management to every field of knowledge using Ifa\u2019s polymathic, holistic framework.' },
  { n: '03', text: 'Develop and formalize Ifa Engineering as engineering done in IfaLang/OrisaLang — the Universal Formal Language of Ifa and Orisa Knowledge (IOK).' },
  { n: '04', text: 'Model management sciences using the mathematical, polymathic, holistic, and interdisciplinary approaches of Ifa/Orisa.' },
  { n: '05', text: 'Create inventions and solve complex societal problems through IEMBOK\'s integrated engineering-management framework.' },
  { n: '06', text: 'Explore, document, develop, and apply engineering management principles through the Lens of Ifá and Òrìṣà Knowledge Systems (IOKS).' },
  { n: '07', text: 'Bridge traditional Ifa Wisdom with modern engineering management science, organizational theory, and systems engineering.' },
];

// ─── 16 Ojú Odù (for 0+8D interactive) ───────────────────────────────────────

const ODU_16 = [
  { n:'01', name:'Ejiogbe',       yoruba:'Ogbé',       color:'#f0920c', sidechrx:'S',   type:'O' },
  { n:'02', name:'Oyeku Meji',    yoruba:'Òyèkú',      color:'#6366f1', sidechrx:'I',   type:'I' },
  { n:'03', name:'Iwori Meji',    yoruba:'Ìwòrì',      color:'#14b8d4', sidechrx:'D',   type:'I' },
  { n:'04', name:'Odi Meji',      yoruba:'Òdí',        color:'#00c87c', sidechrx:'E',   type:'O' },
  { n:'05', name:'Irosun Meji',   yoruba:'Ìrosùn',     color:'#ef4444', sidechrx:'C',   type:'I' },
  { n:'06', name:'Owonrin Meji',  yoruba:'Òwónrín',    color:'#8b5cf6', sidechrx:'H',   type:'O' },
  { n:'07', name:'Obara Meji',    yoruba:'Òbàrà',      color:'#3b9eff', sidechrx:'R',   type:'O' },
  { n:'08', name:'Okanran Meji',  yoruba:'Òkànràn',    color:'#ec4899', sidechrx:'X',   type:'O' },
  { n:'09', name:'Ogunda Meji',   yoruba:'Ògúndá',     color:'#f0920c', sidechrx:"S'",  type:'O' },
  { n:'10', name:'Osa Meji',      yoruba:'Òsá',        color:'#6366f1', sidechrx:"I'",  type:'I' },
  { n:'11', name:'Ika Meji',      yoruba:'Ìká',        color:'#14b8d4', sidechrx:"D'",  type:'I' },
  { n:'12', name:'Oturupon Meji', yoruba:'Òtúrúpòn',   color:'#00c87c', sidechrx:"E'",  type:'I' },
  { n:'13', name:'Otura Meji',    yoruba:'Òtúrá',      color:'#ef4444', sidechrx:"C'",  type:'I' },
  { n:'14', name:'Irete Meji',    yoruba:'Ìrètè',      color:'#8b5cf6', sidechrx:"H'",  type:'I' },
  { n:'15', name:'Ose Meji',      yoruba:'Òsè',        color:'#3b9eff', sidechrx:"R'",  type:'O' },
  { n:'16', name:'Ofun Meji',     yoruba:'Òfún',       color:'#ec4899', sidechrx:"X'",  type:'I' },
];

// ─── SIDECHRX — Engineering Management Principles ──────────────────────────────

const SIDECHRX_IEMBOK = [
  {
    letter:'S', name:'Symmetry', color:'#f0920c', symbol:'⊛',
    tagline:'Symmetry Principles of Engineering Management — the structural balance and preserved form of engineering organizations, governance systems, and management frameworks under all transformations and leadership transitions.',
  },
  {
    letter:'I', name:'Invariance', color:'#6366f1', symbol:'⟲',
    tagline:'Invariance Principles of Engineering Management — the conserved laws of engineering excellence that persist across all management paradigms, technology cycles, organizational change, and cultural transformation.',
  },
  {
    letter:'D', name:'Duality', color:'#14b8d4', symbol:'⇔',
    tagline:'Duality Principles of Engineering Management — fundamental dual structures: technical ↔ managerial, analysis ↔ synthesis, engineering ↔ leadership, Ifa Engineering ↔ Orisa Engineering Management.',
  },
  {
    letter:'E', name:'Emergence', color:'#00c87c', symbol:'↑',
    tagline:'Emergence Principles of Engineering Management — how engineering cultures, innovations, institutions, and organizational capabilities emerge irreducibly from engineer interactions, team dynamics, and management processes.',
  },
  {
    letter:'C', name:'Composition', color:'#ef4444', symbol:'⊕',
    tagline:'Composition Principles of Engineering Management — how engineering projects, programs, and portfolios compose from component principles into unified management wholes, and how organizations compose from teams.',
  },
  {
    letter:'H', name:'Holism', color:'#8b5cf6', symbol:'◎',
    tagline:'Holism Principles of Engineering Management — engineering organizations as irreducible wholes whose systemic properties, culture, and excellence cannot be derived from any management subset or sub-process alone.',
  },
  {
    letter:'R', name:'Reductionism', color:'#3b9eff', symbol:'↓',
    tagline:'Reductionism Principles of Engineering Management — reducing every management theory, engineering process, and organizational principle to its foundational Odu Ifa axioms and first-principles laws.',
  },
  {
    letter:'X', name:'Simulation', color:'#ec4899', symbol:'◈',
    tagline:'Simulation Principles of Engineering Management — modeling, simulating, and stress-testing engineering organizations, project futures, and management scenarios through Ifa Simulation methods and Orisa frameworks.',
  },
];

const STEAMSEX = [
  {
    id: 'dim-S1', letter: 'S', label: 'Science',
    title: 'Engineering Management as a Science',
    desc: 'Applying the scientific method — hypothesis, experimentation, and quantitative modeling — to engineering organizations. Grounded in Owonrin Méjì\'s science of discovery and empirical laws encoded in the Odu Ifa.',
    color: '#e05520',
  },
  {
    id: 'dim-T', letter: 'T', label: 'Technology',
    title: 'Engineering Management as a Technology',
    desc: 'Engineering Management as a formal technology — tools, methods, systems, and processes for organizing and optimizing engineering work. Rooted in Ogunda Méjì\'s domain of iron, tools, and technological creation.',
    color: '#f5c518',
  },
  {
    id: 'dim-E1', letter: 'E', label: 'Engineering',
    title: 'Engineering Management as Engineering',
    desc: 'Managing engineering as itself an act of engineering — designing systems of people, process, and technology with formal rigor. The meta-engineering encoded in the EngBoK of Ogunda Méjì.',
    color: '#0ea5e9',
  },
  {
    id: 'dim-A', letter: 'A', label: 'Arts',
    title: 'Engineering Management as an Art',
    desc: 'The creative, intuitive, and aesthetic dimensions of engineering leadership — Ifart and Orisart applied to organizational design, strategic vision, and the cultivation of engineering culture.',
    color: '#00c87c',
  },
  {
    id: 'dim-M', letter: 'M', label: 'Mathematics',
    title: 'Engineering Management as Mathematics',
    desc: 'Formal mathematical and metamathematical modeling of engineering organizations and management processes — using IfaLang, Ìká Méjì\'s number algebras, and the quantitative structures of the Odu Ifa.',
    color: '#a78bfa',
  },
  {
    id: 'dim-S2', letter: 'S', label: 'Social Science',
    title: 'Engineering Management as a Social Science',
    desc: 'Engineering organizations as complex social systems — drawing from Obara Méjì\'s governance science to study human behavior, organizational dynamics, and the social structures shaping engineering outcomes.',
    color: '#e9498a',
  },
  {
    id: 'dim-E2', letter: 'E', label: 'Economics',
    title: 'Engineering Management as Economics',
    desc: 'The economic dimensions of engineering — resource allocation, value creation, market dynamics, and organizational incentives. Rooted in Ifa Economics (Eboconomics) and the energy-exchange laws of the Odu Ifa.',
    color: '#3b9eff',
  },
  {
    id: 'dim-X', letter: 'X', label: 'Others',
    title: 'Engineering Management as Others',
    desc: 'The open dimension of engineering management — disciplines, fields, and domains beyond the core STEAMS that intersect with engineering management: law, medicine, policy, ethics, cross-disciplinary sciences, and all emerging fields encoded in the 256 Odu Ifa.',
    color: '#ff7a48',
  },
];

// ─── OduMark ──────────────────────────────────────────────────────────────────

function OduMark({ marks, marksR, color, variant }) {
  const cfg = {
    sm: { w: 6,  h: 17, colGap: 10, rowGap: 7,  barGap: 4 },
    md: { w: 8,  h: 22, colGap: 14, rowGap: 10, barGap: 5 },
    lg: { w: 10, h: 30, colGap: 17, rowGap: 12, barGap: 6 },
    xl: { w: 13, h: 40, colGap: 22, rowGap: 15, barGap: 8 },
  }[variant || 'md'];

  // For non-Meji Odu, left and right columns differ; marksR overrides the right column
  const right = marksR || marks;

  const renderCol = (colMarks, ci) => (
    <div key={ci} style={{ display: 'flex', flexDirection: 'column', gap: cfg.rowGap, alignItems: 'center' }}>
      {colMarks.map((m, ri) => (
        <div key={ri} style={{ display: 'flex', gap: cfg.barGap }}>
          <div style={{
            width: cfg.w, height: cfg.h,
            background: color, borderRadius: 2,
            boxShadow: `0 0 7px ${color}60`,
          }} />
          {m === 2 && (
            <div style={{
              width: cfg.w, height: cfg.h,
              background: color, borderRadius: 2,
              boxShadow: `0 0 7px ${color}60`,
            }} />
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div style={{ display: 'flex', gap: cfg.colGap, alignItems: 'center', justifyContent: 'center' }}>
      {renderCol(marks, 0)}
      {renderCol(right, 1)}
    </div>
  );
}

// ─── IemboOrb ─────────────────────────────────────────────────────────────────

function IemboOrb() {
  return (
    <div className="iembo-orb" aria-hidden="true">
      <div className="iembo-orb__ring iembo-orb__ring--1" />
      <div className="iembo-orb__ring iembo-orb__ring--2" />
      <div className="iembo-orb__ring iembo-orb__ring--3" />
      <div className="iembo-orb__arc iembo-orb__arc--1" />
      <div className="iembo-orb__arc iembo-orb__arc--2" />
      <div className="iembo-orb__core">
        <OduMark marks={[1, 2, 2, 2]} marksR={[1, 1, 1, 2]} color="#e05520" variant="lg" />
      </div>
      <div className="iembo-orb__glow" />
    </div>
  );
}

// ─── IEMBOKMatrix ─────────────────────────────────────────────────────────────

function IEMBOKMatrix() {
  const cx = 300, cy = 300, R = 190, nodeR = 30, centerR = 62;
  const dims = STEAMSEX.map((d, i) => {
    const angle = (i * 45 - 90) * Math.PI / 180;
    return { ...d, x: cx + R * Math.cos(angle), y: cy + R * Math.sin(angle) };
  });
  const octPath = dims.map((d, i) =>
    `${i === 0 ? 'M' : 'L'} ${d.x.toFixed(1)},${d.y.toFixed(1)}`
  ).join(' ') + ' Z';

  return (
    <svg className="toe-matrix__svg" viewBox="0 0 600 600"
      aria-label="IEMBOK 0+8D STEAMSEX Matrix — Ifa Transform">
      <defs>
        <linearGradient id="mx-center-border" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e05520"/>
          <stop offset="100%" stopColor="#8b5cf6"/>
        </linearGradient>
        <linearGradient id="mx-io-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00d9b8"/>
          <stop offset="100%" stopColor="#8b5cf6"/>
        </linearGradient>
        <linearGradient id="mx-embok-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ff7a48"/>
          <stop offset="100%" stopColor="#f5c518"/>
        </linearGradient>
        <radialGradient id="mx-center-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#e05520" stopOpacity="0.28"/>
          <stop offset="55%" stopColor="#8b5cf6" stopOpacity="0.14"/>
          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0"/>
        </radialGradient>
      </defs>

      {/* Web rings */}
      {[0.33, 0.67].map((frac, i) => (
        <circle key={i} cx={cx} cy={cy} r={R * frac}
          fill="none" stroke="rgba(139,92,246,0.06)" strokeWidth="1" strokeDasharray="3 6"/>
      ))}
      <circle cx={cx} cy={cy} r={R}
        fill="none" stroke="rgba(139,92,246,0.10)" strokeWidth="1"/>

      {/* Outer octagon */}
      <path d={octPath} fill="none" stroke="rgba(139,92,246,0.09)" strokeWidth="1"/>

      {/* Spokes */}
      {dims.map((d) => (
        <line key={d.id + '-spoke'} x1={cx} y1={cy} x2={d.x} y2={d.y}
          stroke={d.color} strokeWidth="1" strokeOpacity="0.22"/>
      ))}

      {/* Outer dimension nodes */}
      {dims.map((d) => (
        <g key={d.id}>
          <circle cx={d.x} cy={d.y} r={nodeR + 12} fill={d.color} fillOpacity="0.07"/>
          <circle cx={d.x} cy={d.y} r={nodeR}
            fill="#060408" stroke={d.color} strokeWidth="1.8" strokeOpacity="0.8"/>
          <text x={d.x} y={d.y + 1} textAnchor="middle" dominantBaseline="middle"
            fill={d.color} fontSize="15" fontWeight="800"
            fontFamily="Space Grotesk, system-ui, sans-serif">
            {d.letter}
          </text>
          <text x={d.x} y={d.y + nodeR + 15} textAnchor="middle"
            fill="rgba(110,127,170,0.65)" fontSize="8.5"
            fontFamily="Space Grotesk, system-ui, sans-serif">
            {d.label}
          </text>
        </g>
      ))}

      {/* Center glow halo */}
      <circle cx={cx} cy={cy} r={centerR + 28} fill="url(#mx-center-glow)"/>
      {/* Center node */}
      <circle cx={cx} cy={cy} r={centerR}
        fill="#060408" stroke="url(#mx-center-border)" strokeWidth="2.2"/>
      {/* Center — I/O */}
      <text x={cx} y={cy - 16} textAnchor="middle" dominantBaseline="middle"
        fill="url(#mx-io-grad)" fontSize="20" fontWeight="900"
        fontFamily="Space Grotesk, system-ui, sans-serif">
        I/O
      </text>
      {/* Center — EMBOK */}
      <text x={cx} y={cy + 9} textAnchor="middle" dominantBaseline="middle"
        fill="url(#mx-embok-grad)" fontSize="18" fontWeight="900"
        fontFamily="Space Grotesk, system-ui, sans-serif">
        EMBOK
      </text>
      {/* Center — label */}
      <text x={cx} y={cy + 28} textAnchor="middle" dominantBaseline="middle"
        fill="rgba(110,127,170,0.4)" fontSize="7.5"
        fontFamily="Space Grotesk, system-ui, sans-serif">
        0+8D · IFA TRANSFORM
      </text>
    </svg>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────

function Header() {
  return (
    <header className="header">
      <div className="container header__inner">
        <div className="header__brand">
          <span className="header__dot" />
          <span className="header__prog">
            <span className="header__io-badge" aria-label="I/O">
              <svg viewBox="0 0 66 34" width="58" height="30" aria-hidden="true">
                <defs>
                  <linearGradient id="iembok-border" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#e05520"/>
                    <stop offset="100%" stopColor="#8b5cf6"/>
                  </linearGradient>
                  <linearGradient id="iembok-slash" x1="0%" y1="100%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="#e05520"/>
                    <stop offset="100%" stopColor="#8b5cf6"/>
                  </linearGradient>
                </defs>
                <rect x="0.75" y="0.75" width="64.5" height="32.5" rx="7" fill="#06060e" stroke="url(#iembok-border)" strokeWidth="1.5"/>
                <rect x="10" y="6" width="5" height="22" rx="2" fill="#e05520"/>
                <line x1="26" y1="28" x2="37" y2="6" stroke="url(#iembok-slash)" strokeWidth="2.8" strokeLinecap="round"/>
                <circle cx="52" cy="17" r="9" fill="none" stroke="#8b5cf6" strokeWidth="4"/>
              </svg>
            </span>
            <span className="header__embok">EMBOK</span>
          </span>
          <span className="header__sep" aria-hidden="true">
            <svg width="2" height="16" viewBox="0 0 2 16"><defs><linearGradient id="sep-g" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#e05520" stopOpacity="0.8"/><stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.6"/></linearGradient></defs><rect width="2" height="16" rx="1" fill="url(#sep-g)"/></svg>
          </span>
          <span className="header__parent">IFABOK</span>
        </div>
        <nav className="header__nav">
          <a href="#odu"     className="header__navlink">Foundation Odu</a>
          <a href="#program" className="header__navlink">Program</a>
          <a href="#matrix"  className="header__navlink">Matrix</a>
          <a href="#lenses"  className="header__navlink">Lenses</a>
          <a href="../"      className="header__home">IFA Internet ↗</a>
        </nav>
      </div>
    </header>
  );
}

// ─── MobileBar ────────────────────────────────────────────────────────────────

function MobileBar() {
  const tabs = [
    { label: 'Overview', href: '#top',     icon: '⊙' },
    { label: 'Odu',      href: '#odu',     icon: '⚡' },
    { label: 'Program',  href: '#program', icon: '◎' },
    { label: 'Matrix',   href: '#matrix',  icon: '◉' },
    { label: 'Lenses',   href: '#lenses',  icon: '⋈' },
  ];
  return (
    <nav className="mobile-bar" aria-label="Page navigation">
      {tabs.map((t, i) => (
        <a key={i} href={t.href} className="mobile-bar__tab">
          <span className="mobile-bar__icon" aria-hidden="true">{t.icon}</span>
          <span className="mobile-bar__label">{t.label}</span>
        </a>
      ))}
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__grid" aria-hidden="true" />
      <div className="hero__veil" aria-hidden="true" />
      <div className="container hero__inner">
        <div className="hero__content">
          <div className="eyebrow eyebrow--fire">IFABOK PROGRAM · IFA INTERNET</div>
          <div className="hero__tags">
            <span className="hero__tag" style={{ '--tc': '#e05520' }}>Ifa Engineering</span>
            <span className="hero__tag" style={{ '--tc': '#8b5cf6' }}>Ifa Management Science</span>
            <span className="hero__tag" style={{ '--tc': '#0ea5e9' }}>EngBoK · MgtBoK</span>
          </div>
          <h1 className="hero__h1">
            <span className="hero__h1--abbr"><span className="hero__h1--io">I/O</span>EMBOK</span>
            <span className="hero__h1--full">
              Ifa/Orisa Engineering Management<br />Body of Knowledge
            </span>
          </h1>
          <p className="hero__tagline">
            Engineering the present and the future through the Wisdom of the Odu Ifa
          </p>
          <p className="hero__desc">
            Also known as IEMBOK, this IFABOK program develops, studies, models, and builds
            engineering management using the mathematical, polymathic, holistic, and
            interdisciplinary approaches of Ifa/Orisa — applying this knowledge to
            create inventions and solve complex problems in society.
          </p>
          <div className="hero__odu-strip">
            {FOUNDATION_ODU.map((o, i) => (
              <div key={i} className="hero__odu-chip" style={{ '--oc': o.color }}>
                <span className="hero__odu-chip-mark">
                  <OduMark marks={o.marks} color={o.color} variant="sm" />
                </span>
                <span className="hero__odu-chip-name">{o.name}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="hero__visual">
          <IemboOrb />
        </div>
      </div>
    </section>
  );
}

// ─── StatsBar ─────────────────────────────────────────────────────────────────

function StatsBar() {
  return (
    <div className="stats-bar">
      <div className="container stats-bar__inner">
        {STATS.map((s, i) => (
          <div key={i} className="stats-bar__item">
            <span className="stats-bar__num">{s.num}</span>
            <span className="stats-bar__label">{s.label}</span>
            <span className="stats-bar__sub">{s.sub}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Foundation Section ───────────────────────────────────────────────────────

function FoundationSection() {
  return (
    <section className="section section--alt">
      <div className="container">
        <div className="eyebrow eyebrow--fire">THE IFABOK CONTEXT</div>
        <h2 className="section__title">Engineering & Management in IfaLang</h2>
        <p className="section__lead">
          The IFA Body of Knowledge (IFABOK) — also known as the IFA Internet or the
          Theory of Everything (TOE) — encodes all fields of human knowledge using the
          256 Odu Ifa and 16 Odu Orisa. IEMBOK draws from two Foundational Knowledge
          Domains within this Framework.
        </p>
        <div className="found-grid">
          <div className="found-card" style={{ '--fc': '#e05520' }}>
            <div className="found-card__badge">EngBoK</div>
            <div className="found-card__odu-mark">
              <OduMark marks={[1,1,1,2]} color="#e05520" variant="md" />
            </div>
            <h3 className="found-card__title">Ifa Engineering</h3>
            <p className="found-card__body">
              Ifa Engineering is the field of engineering developed, studied, modelled, and
              built using the 16 Laws of Ifa/Orisa — the Oju Odu Merindinlogun. It is
              engineering done in <strong>IfaLang/OrisaLang</strong>: the Universal Formal
              Language of Ifa/Orisa. In the IFABOK, <strong>Ogunda Méjì</strong> is the Engineering
              Body of Knowledge (EngBoK) — the Odu governing iron, technology, paths, the
              essence of engineering, and the clearing of obstacles. Orisa Engineering
              is the Dual of Ifa Engineering.
            </p>
          </div>
          <div className="found-card" style={{ '--fc': '#8b5cf6' }}>
            <div className="found-card__badge">MgtBoK</div>
            <div className="found-card__odu-mark">
              <OduMark marks={FOUNDATION_ODU[2].marks} color={FOUNDATION_ODU[2].color} variant="md" />
            </div>
            <h3 className="found-card__title">Ifa Management Science</h3>
            <p className="found-card__body">
              Ifa Management Science is the field of management science developed, studied,
              modelled, and built using the 16 Laws of Ifa/Orisa. It is management science
              in <strong>IfaLang/OrisaLang</strong>. The Odu Ifa <strong>Owonrin Méjì</strong>, <strong>Obara Méjì</strong>, <strong>Ìká Méjì</strong>,
              and <strong>Ọ̀ṣẹ Méjì</strong> are key Odu underlying management sciences —
              encoding innovation theory, strategic systems science, and organizational
              excellence, and others. Its Dual is Orisa Management Science.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Odu Section ──────────────────────────────────────────────────────────────

function OduSection() {
  return (
    <section className="section" id="odu">
      <div className="container">
        <div className="eyebrow eyebrow--gold">THE ODU IFA FOUNDATION</div>
        <h2 className="section__title">Four Odu Ifa of Engineering Management</h2>
        <p className="section__lead">
          In the IFABOK, these four Odu Ifa form the primary knowledge foundation of IEMBOK —
          each encoding a set of dimensions of engineering and management science in its deepest,
          most universal form.
        </p>
        <div className="odu-grid">
          {FOUNDATION_ODU.map((odu, i) => (
            <div key={i} className="odu-card" style={{ '--oc': odu.color }}>
              <div className="odu-card__top">
                <div className="odu-card__num-badge">{odu.num}</div>
                <div className="odu-card__marks">
                  <OduMark marks={odu.marks} color={odu.color} variant="lg" />
                </div>
              </div>
              <div className="odu-card__body">
                <h3 className="odu-card__name">{odu.name}</h3>
                <p className="odu-card__yoruba">{odu.yoruba}</p>
                <div className="odu-card__role">{odu.role}</div>
                <div className="odu-card__badge">{odu.badge}</div>
                <p className="odu-card__desc">{odu.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Engineering Management Overview ─────────────────────────────────────────

function EngMgtSection() {
  const aspects = [
    { icon: '⚙', label: 'Technology Management',  color: '#e05520' },
    { icon: '◫', label: 'Systems Engineering',     color: '#0ea5e9' },
    { icon: '⬡', label: 'Project Management',      color: '#8b5cf6' },
    { icon: '◎', label: 'Quality & Risk',           color: '#f5c518' },
    { icon: '◈', label: 'Organizational Leadership', color: '#00c87c' },
    { icon: '✦', label: 'R&D Management',           color: '#e9498a' },
  ];
  return (
    <section className="section section--alt">
      <div className="container">
        <div className="eyebrow eyebrow--blue">FIELD OVERVIEW</div>
        <h2 className="section__title">Engineering Management</h2>
        <div className="engmgt">
          <div className="engmgt__text">
            <p>
              <strong>Engineering Management</strong> is a specialized discipline that bridges
              the technical expertise of engineering with the organizational and strategic
              skills of management. It applies engineering principles to the planning, design,
              development, and operation of integrated systems of people, materials, information,
              equipment, and energy.
            </p>
            <p>
              The field encompasses technology and innovation management, project management,
              organizational leadership, systems engineering, quality management, risk
              management, and the governance of engineering enterprises and institutions.
            </p>
            <p>
              Engineering Management draws from mechanical, electrical, civil, industrial,
              and computer engineering disciplines, combined with business administration,
              economics, organizational behavior, and operations research. Its goal: maximize
              organizational performance through the effective application of engineering
              knowledge and management science — a goal IEMBOK advances through the Lens of
              Ifa/Orisa.
            </p>
          </div>
          <div className="engmgt__aspects">
            {aspects.map((a, i) => (
              <div key={i} className="engmgt__aspect" style={{ '--ea': a.color }}>
                <span className="engmgt__icon" aria-hidden="true">{a.icon}</span>
                <span className="engmgt__label">{a.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Program Section ──────────────────────────────────────────────────────────

function ProgramSection() {
  return (
    <section className="section" id="program">
      <div className="container">
        <div className="eyebrow eyebrow--fire">THE IEMBOK PROGRAM</div>
        <h2 className="section__title">Mission & Core Purposes</h2>

        <div className="program__mission">
          <div className="program__mission-label">IEMBOK Mission</div>
          <p className="program__mission-text">
            To discover, develop, and apply the Grand Unified Theory (GUT) of engineering
            management encoded in the Odu Ifa and Odu Orisa — generalizing the fundamental
            principles of engineering management to every field of knowledge, and applying
            this unified framework to solve complex problems in human society through the
            mathematical, polymathic, holistic, and interdisciplinary approaches of Ifa/Orisa.
          </p>
        </div>

        <div className="program__gut">
          <div className="program__gut-tag" aria-hidden="true">GUT</div>
          <div className="program__gut-body">
            <h3 className="program__gut-title">
              General Unified Theory (GUT) of Engineering Management
            </h3>
            <p className="program__gut-desc">
              A central aim of IEMBOK is advancing the General Unified Theory (GUT) of
              engineering management — the discovery that all engineering management
              principles, in every modern field, are encoded within the Odu Ifa and can
              be formally expressed in IfaLang. IEMBOK seeks to formalize this unified
              theory and generalize its principles to all fields of knowledge: from the
              physical sciences and mathematics to the humanities and the social sciences.
            </p>
          </div>
        </div>

        <h3 className="program__purposes-heading">Core Purposes of IEMBOK</h3>
        <div className="program__purposes">
          {PURPOSES.map((p, i) => (
            <div key={i} className="program__purpose">
              <span className="program__purpose-n">{p.n}</span>
              <p className="program__purpose-text">{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Lenses Section ───────────────────────────────────────────────────────────

function LensesSection() {
  return (
    <section className="section section--alt" id="lenses">
      <div className="container">
        <div className="eyebrow eyebrow--jade">RESEARCH & KNOWLEDGE AREAS</div>
        <h2 className="section__title">The Core Lenses of IEMBOK</h2>
        <p className="section__lead">
          IEMBOK explores, documents, develops, and applies engineering management
          principles through eight interconnected Lenses — each derived from Ifa/Orisa
          knowledge and the Odu Ifa.
        </p>
        <div className="lenses-grid">
          {LENSES.map((lens, i) => (
            <div key={i} className="lens-card" style={{ '--lc': lens.color }}>
              <div className="lens-card__icon" aria-hidden="true">{lens.icon}</div>
              <h3 className="lens-card__title">{lens.title}</h3>
              <p className="lens-card__body">{lens.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── TOE Matrix Section ───────────────────────────────────────────────────────

function TOEMatrixSection() {
  return (
    <section className="section section--dark" id="matrix">
      <div className="container">
        <div className="eyebrow eyebrow--violet">IFA TOE 0+8D MATRIX · IFA TRANSFORM</div>
        <h2 className="section__title">The IEMBOK 0+8D Matrix</h2>
        <p className="section__lead">
          The Ifa Transform maps IEMBOK across 8 STEAMSEX Dimensions — the Polymathic
          Framework of the IFA Internet&rsquo;s Theory of Everything. Each dimension is a
          distinct Ifa/Orisa transformation of Engineering Management: a Lens through which
          its principles are rediscovered, generalized, and re-encoded using the
          256 Odu Ifa and 16 Odu Orisa.
        </p>
        <div className="toe-matrix">
          <div className="toe-matrix__diagram">
            <IEMBOKMatrix />
          </div>
          <div className="steamsex-grid">
            {STEAMSEX.map((dim) => (
              <div key={dim.id} className="steamsex-card" style={{ '--dc': dim.color }}>
                <div className="steamsex-card__header">
                  <span className="steamsex-card__letter">{dim.letter}</span>
                  <span className="steamsex-card__label">{dim.label}</span>
                </div>
                <h3 className="steamsex-card__title">{dim.title}</h3>
                <p className="steamsex-card__desc">{dim.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="section-cta">
          <a href="https://ifainternet.org/ifa-matrix/" className="section-cta__link" target="_blank" rel="noopener noreferrer">
            Explore the Full IFA Matrix Platform →
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── ZeroEightD Section (Àtẹjìnlẹ̀ Ọ̀kánlẹ́jọ) ────────────────────────────────

function ZeroEightDSection() {
  const [active, setActive] = useState(ODU_16[0]);
  const baseLetter = active.sidechrx.replace("'", '');

  // SVG compass coordinates: [ellipse_ex, ellipse_ey, arrow_tip_x, arrow_tip_y,
  //                            letter_x, letter_y, name_x, name_y, text-anchor]
  const c = 0.707;
  const SC = [
    [280,            142,           280,  68,  280,  40,  280,  54,  'middle'], // N  S
    [280 + 110 * c,  210 - 68 * c,  455,  76,  459,  71,  459,  85,  'start' ], // NE I
    [390,            210,           516, 210,  519, 206,  519, 220,  'start' ], // E  D
    [280 + 110 * c,  210 + 68 * c,  455, 344,  459, 340,  459, 354,  'start' ], // SE E
    [280,            278,           280, 332,  280, 350,  280, 364,  'middle'], // S  C
    [280 - 110 * c,  210 + 68 * c,  105, 344,  101, 340,  101, 354,  'end'   ], // SW H
    [170,            210,            44, 210,   41, 206,   41, 220,  'end'   ], // W  R
    [280 - 110 * c,  210 - 68 * c,  105,  76,  101,  71,  101,  85,  'end'   ], // NW X
  ];

  return (
    <section className="section section--alt" id="d8-iembok">
      <div className="container">

        <div className="eyebrow eyebrow--gold">Àtẹjìnlẹ̀ Ọ̀kánlẹ́jọ</div>
        <h2 className="section__title">
          The{' '}
          <span style={{ color: 'var(--gold)' }}>0+8D</span>{' '}
          Model —{' '}
          <span style={{ color: 'var(--violet-lt)' }}>8 Ifa Dimensions</span>
        </h2>
        <p className="section__lead">
          Click any of the 16 Ojú Odù Ifá to reveal how that Odu governs each of the
          8 SIDECHRX Principles of the IFA Matrix — applied to Engineering Management in IEMBOK.
          <br />
          <span style={{ fontSize: '0.82em', color: 'var(--text-3)' }}>
            0 = Ground Reference State &nbsp;·&nbsp; 8D = S · I · D · E · C · H · R · X (Ifa Principles)
          </span>
        </p>

        {/* Ifagram description note */}
        <div className="d8i-ifagram-note">
          <div className="d8i-ifagram-note__label">Ifagram — Ifa Diagram</div>
          <p className="d8i-ifagram-note__text">
            Each Diagram below is an <strong>Ifagram</strong>: a Visual Meta-Structure for
            Diagrammatic Reasoning with Ifa using network theory. The central Node is{' '}
            <strong>I/OEMBOK</strong> — the Ifa Circle representing the full body of
            Ifa/Orisa Engineering Management Knowledge. Spokes connect I/OEMBOK to the
            8 SIDECHRX Principles at the 8 compass points of the Àtẹjìnlẹ̀ Ọ̀kánlẹ́jọ (0+8D Space),
            mapping every Odu Ifa to the full SIDECHRX Knowledge Structure.
          </p>
        </div>

        {/* Formula bar */}
        <div className="d8i-formula-bar">
          <div className="d8i-fbar-eq">
            <span className="d8i-fbar-zero">0</span>
            <span className="d8i-fbar-op">+</span>
            <div className="d8i-fbar-dims">
              {SIDECHRX_IEMBOK.map((d, i) => (
                <span key={i} className="d8i-fbar-dim" style={{ color: d.color }} title={d.name}>
                  {d.letter}
                </span>
              ))}
            </div>
          </div>
          <div className="d8i-fbar-labels">
            <span className="d8i-fbar-ref">Ground Ref</span>
            <span className="d8i-fbar-op-sm">+</span>
            {SIDECHRX_IEMBOK.map((d, i) => (
              <span key={i} className="d8i-fbar-label" style={{ color: d.color }}>{d.name}</span>
            ))}
          </div>
        </div>

        {/* Two-column layout */}
        <div className="d8i-layout">

          {/* Left: 16 Odu grid */}
          <div className="d8i-grid-col">
            <div className="d8i-grid-label">Ojú Odù Ifá Mẹrindínlógún — Click to Explore</div>
            <div className="d8i-odu-grid">
              {ODU_16.map(o => (
                <div
                  key={o.n}
                  className={`d8i-odu-cell${active.n === o.n ? ' d8i-odu-cell--active' : ''}`}
                  style={{ '--c': o.color }}
                  onMouseEnter={() => setActive(o)}
                  onClick={() => setActive(o)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => e.key === 'Enter' && setActive(o)}
                >
                  <div className="d8i-odu-cell__n">{o.n}</div>
                  <div className="d8i-odu-cell__name">{o.name}</div>
                  <div className={`d8i-odu-cell__badge d8i-odu-cell__badge--${o.type}`}>
                    {o.type === 'O' ? 'P' : 'Inv'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Ifagram panel */}
          <div className="d8i-panel" style={{ '--c': active.color }}>

            <div className="d8i-panel__head">
              <div className="d8i-panel__odu-row">
                <span className="d8i-panel__num" style={{ color: active.color }}>{active.n}</span>
                <div className="d8i-panel__meta">
                  <div className="d8i-panel__name">{active.name}</div>
                  <div className="d8i-panel__sub">
                    <span className="d8i-panel__sidechrx" style={{ color: active.color }}>
                      {active.sidechrx}
                    </span>
                    <span className={`d8i-panel__type d8i-panel__type--${active.type}`}>
                      {active.type === 'O' ? 'Principal Odu' : 'Inverse Odu'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="d8i-panel__tag">0 + 8D</div>
            </div>

            {/* SVG Ifagram */}
            {(() => {
              return (
                <svg viewBox="0 0 560 420" overflow="visible" width="100%"
                  style={{ display:'block', maxWidth:'min(460px, calc(100vw - 40px))', margin:'0 auto 20px', fontFamily:'inherit' }}>
                  <defs>
                    <marker id="d8i-arr" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
                      <polygon points="0 1,0 7,8 4" fill="rgba(255,255,255,0.22)"/>
                    </marker>
                    {SIDECHRX_IEMBOK.map((p, i) => (
                      <marker key={i} id={`d8i-arr-${i}`} markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
                        <polygon points="0 1,0 7,8 4" fill={p.color}/>
                      </marker>
                    ))}
                    <marker id={`d8i-rim-${active.n}`} markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
                      <polygon points="0 1,0 7,8 4" fill={active.color}/>
                    </marker>
                    <linearGradient id="d8i-io-g" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#00d9b8"/>
                      <stop offset="100%" stopColor="#8b5cf6"/>
                    </linearGradient>
                    <linearGradient id="d8i-embok-g" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#ff7a48"/>
                      <stop offset="100%" stopColor="#f5c518"/>
                    </linearGradient>
                  </defs>

                  {/* Spoke lines */}
                  {SC.map(([ex, ey, tx, ty], idx) => {
                    const p = SIDECHRX_IEMBOK[idx];
                    const isMatch = baseLetter === p.letter;
                    return (
                      <line key={idx}
                        x1={ex} y1={ey} x2={tx} y2={ty}
                        stroke={isMatch ? p.color : 'rgba(255,255,255,0.16)'}
                        strokeWidth={isMatch ? 2.2 : 1}
                        markerEnd={isMatch ? `url(#d8i-arr-${idx})` : 'url(#d8i-arr)'}
                      />
                    );
                  })}

                  {/* Center ellipse — I/OEMBOK Ifa Circle */}
                  <ellipse cx="280" cy="210" rx="110" ry="68"
                    fill="#060408" stroke={active.color} strokeWidth="2.5"/>
                  {/* Ifa Circle — canonical arrow on circumference */}
                  <path d="M 387.6,195.9 A 110,68 0 0,1 387.6,224.1"
                    fill="none" stroke={active.color} strokeWidth="3"
                    markerEnd={`url(#d8i-rim-${active.n})`}/>
                  {/* I/O */}
                  <text x="280" y="197" textAnchor="middle" fontSize="17" fontWeight="900"
                    fill="url(#d8i-io-g)" fontFamily="Space Grotesk,system-ui,sans-serif">I/O</text>
                  {/* EMBOK */}
                  <text x="280" y="215" textAnchor="middle" fontSize="15" fontWeight="900"
                    fill="url(#d8i-embok-g)" fontFamily="Space Grotesk,system-ui,sans-serif">EMBOK</text>
                  {/* Sub-label */}
                  <text x="280" y="232" textAnchor="middle" fontSize="8.5"
                    fill="rgba(176,168,220,0.38)" fontFamily="Space Grotesk,system-ui,sans-serif">
                    0+8D · IFA TRANSFORM
                  </text>

                  {/* Spoke labels */}
                  {SC.map(([ex, ey, tx, ty, lx, ly, nx, ny, anc], idx) => {
                    const p = SIDECHRX_IEMBOK[idx];
                    const isMatch = baseLetter === p.letter;
                    return (
                      <g key={idx}>
                        <text x={lx} y={ly} textAnchor={anc} fontSize="13" fontWeight="800"
                          fill={isMatch ? p.color : 'rgba(255,255,255,0.45)'}
                          fontFamily="Space Grotesk,system-ui,sans-serif">{p.letter}</text>
                        <text x={nx} y={ny} textAnchor={anc} fontSize="10.5"
                          fontWeight={isMatch ? 700 : 400}
                          fill={isMatch ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.3)'}
                          fontFamily="Space Grotesk,system-ui,sans-serif">{p.name}</text>
                      </g>
                    );
                  })}
                </svg>
              );
            })()}

            {/* Ifagram caption */}
            <div className="d8i-caption">
              IFAGRAM &nbsp;·&nbsp; Ifa Diagram — Diagrammatic Reasoning with Ifa
            </div>

            {/* SIDECHRX Engineering Management descriptions */}
            <div className="d8i-dims-list">
              {SIDECHRX_IEMBOK.map((p, i) => (
                <div key={i} className={`d8i-dim-row${baseLetter === p.letter ? ' d8i-dim-row--match' : ''}`}
                  style={{ '--dc': p.color }}>
                  <span className="d8i-dim-row__letter">{p.letter}</span>
                  <span className="d8i-dim-row__text">{p.tagline}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SIDECHRX legend bar */}
        <div className="d8i-legend">
          <span className="d8i-legend__ref">
            <span style={{ color: 'var(--gold)', fontWeight: 800 }}>0</span> Reference
          </span>
          <span className="d8i-legend__div" />
          {SIDECHRX_IEMBOK.map((d, i) => (
            <span key={i} className="d8i-legend__item">
              <span style={{ color: d.color, fontWeight: 800 }}>{d.letter}</span>
              <span>{d.name}</span>
            </span>
          ))}
        </div>
        <div className="section-cta">
          <a href="https://ifainternet.org/ifa-matrix/playground/" className="section-cta__link" target="_blank" rel="noopener noreferrer">
            Explore the Full IFA Matrix Playground →
          </a>
        </div>

      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  const links = [
    { label: 'IFA Internet',         href: '../' },
    { label: 'Ebology',              href: '../ebology-test/' },
    { label: 'Ifa Periodic Table',   href: '../ifa-periodic-table/kids/' },
    { label: 'IFABOK',               href: '../' },
  ];
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <div className="footer__orb" aria-hidden="true">
            <OduMark marks={[1,2,2,2]} marksR={[1,1,1,2]} color="#e05520" variant="sm" />
          </div>
          <div>
            <div className="footer__name">IEMBOK</div>
            <div className="footer__full">Ifa/Orisa Engineering Management Body of Knowledge</div>
          </div>
        </div>
        <div className="footer__links">
          {links.map((l, i) => (
            <a key={i} href={l.href} className="footer__link">{l.label}</a>
          ))}
        </div>
        <div className="footer__copy">
          Part of the IFA Internet · IFABOK · Theory of Everything (TOE) · CENProject
        </div>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

function App() {
  return (
    <div className="app">
      <Header />
      <Hero />
      <StatsBar />
      <FoundationSection />
      <OduSection />
      <EngMgtSection />
      <ProgramSection />
      <TOEMatrixSection />
      <ZeroEightDSection />
      <LensesSection />
      <Footer />
      <MobileBar />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
