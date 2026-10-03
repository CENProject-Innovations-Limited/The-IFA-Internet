/* ─────────────────────────────────────────────────────────────────────────────
   Ifa History — Ìtàn Ifá-Òrìṣà
   The IFA Internet · CENProject
───────────────────────────────────────────────────────────────────────────── */

const { useState } = React;

// ─── DATA ────────────────────────────────────────────────────────────────────

const ALIASES = [
  { label: 'Ìtàn Ifá — Ìtànfá',                color: '#d4a017' },
  { label: 'Ìtàn Òrìṣà — Ìtànṣà',              color: '#7c3aed' },
  { label: 'Ìtàn Ifá-Òrìṣà',                   color: '#00c87c' },
  { label: 'Ìtàn Ilẹ̀ Ifẹ̀ · Yorùbáland',       color: '#3b9eff' },
  { label: 'Big History · Mathematical History', color: '#f5c518' },
];

const STATS = [
  { value: '256',  label: 'Odu Ifa',         sub: 'Axiomatic History Matrix'       },
  { value: '16',   label: 'Principal Laws',  sub: 'Governing Historical Knowledge' },
  { value: 'CEN',  label: 'Unifying Field',  sub: 'Consciousness · Energy · Nature'},
  { value: 'Ìtàn', label: 'Core Concept',    sub: 'Story · History · Narrative'    },
];

const DISCIPLINES = [
  {
    num: '01', sym: '⊡', color: '#d4a017',
    title: 'Historiography',
    sub: 'The Science of Historical Method',
    body: 'How history is written — methods, sources, and critical assumptions that shape all historical narrative.',
  },
  {
    num: '02', sym: '⚖', color: '#00c87c',
    title: 'Historicity',
    sub: 'Authenticity & Source Accuracy',
    body: 'Critical assessment of whether events, persons, and narratives are grounded in verifiable, traceable fact.',
  },
  {
    num: '03', sym: '⧗', color: '#7c3aed',
    title: 'Chronology',
    sub: 'Time, Dating & Sequence',
    body: 'Ordering events in time — establishing dates, durations, and sequences from cosmic origins to the present.',
  },
  {
    num: '04', sym: 'Φ', color: '#3b9eff',
    title: 'Philosophy of History',
    sub: 'Epistemological Foundations',
    body: 'The nature, purpose, and meaning of history — causation, agency, progress, and the limits of historical knowledge.',
  },
  {
    num: '05', sym: '◈', color: '#f5c518',
    title: 'Archaeology',
    sub: 'Material Evidence of the Past',
    body: 'Systematic study of artefacts, structures, and landscapes to reconstruct human activity across all periods.',
  },
  {
    num: '06', sym: '⚑', color: '#e9498a',
    title: 'Political History',
    sub: 'Governance & Power Through Time',
    body: 'How societies have organised, contested, and transformed political systems and structures of authority.',
  },
  {
    num: '07', sym: '∞', color: '#d4a017',
    title: 'Big History',
    sub: 'Cosmic to Human Scale',
    body: 'Situating human history within the full sweep of cosmic evolution — from the Big Bang to the present.',
  },
  {
    num: '08', sym: '⊛', color: '#7c3aed',
    title: 'Ifa Historical Education',
    sub: 'Transmitting the Past',
    body: 'How historical knowledge is taught and applied through the IFA Body of Knowledge across all platforms.',
  },
];

const ITAN = [
  {
    sym: 'Ì',  color: '#d4a017',
    title: 'Ìtàn Ifá',
    short: 'Ìtànfá',
    body: 'The history of Ifa — its origins, Odu structure, and transmission across generations. The historical dimension of the IFA Body of Knowledge.',
  },
  {
    sym: 'Ò', color: '#7c3aed',
    title: 'Ìtàn Òrìṣà',
    short: 'Ìtànṣà',
    body: 'The history of the Orisa — divine forces, their manifestations, and their roles across cosmic and human history.',
  },
  {
    sym: '⊕', color: '#00c87c',
    title: 'Ìtàn Ifá-Òrìṣà',
    short: 'Complete History',
    body: 'The unified field — the axiomatic, complete framework through which the IFA Internet documents and narrates the full spectrum of human and cosmic history.',
  },
  {
    sym: '⌾', color: '#3b9eff',
    title: 'Ìtàn Ilẹ̀ Ifẹ̀',
    short: 'Yorùbáland',
    body: 'Ilẹ̀ Ifẹ̀ (Alẹ̀ Ufẹ̀) is now referred to as Yorubaland in modern times, encompassing Ilé-Ifẹ̀, Osun, Ekiti, Ondo, Ijebu, Remo, Sagamu, Eko, Oyo, Egba, Okun, areas of Benin, Togo, Ghana, and others. History of Ilẹ̀ Ifẹ̀ — the spiritual and cultural origin of Yorùbáland and its people (tribes). The axiomatic historical record of the birthplace of Ifa and Orisa Knowledge.',
  },
];

const LAWS = [
  { num: '01', name: 'Èjìogbè',       desc: 'Origin & Primacy',          color: '#d4a017' },
  { num: '02', name: 'Ọ̀yẹ̀kú Méjì',   desc: 'Transition & Endings',      color: '#7c3aed' },
  { num: '03', name: 'Ìwòrì Méjì',    desc: 'Inner Knowledge',           color: '#3b9eff' },
  { num: '04', name: 'Odí Méjì',      desc: 'Hidden Potential',          color: '#00c87c' },
  { num: '05', name: 'Ìrosùn Méjì',   desc: 'Sacrifice & Exchange',      color: '#e9498a' },
  { num: '06', name: 'Owónrín Méjì',  desc: 'Unexpected Change',         color: '#f5c518' },
  { num: '07', name: 'Òbàrà Méjì',    desc: 'Leadership & Power',        color: '#d4a017' },
  { num: '08', name: 'Òkànràn Méjì',  desc: 'Conflict & Resolution',     color: '#7c3aed' },
  { num: '09', name: 'Ògúndá Méjì',   desc: 'Action & Advancement',      color: '#3b9eff' },
  { num: '10', name: 'Òṣá Méjì',      desc: 'Transformation & Flow',     color: '#00c87c' },
  { num: '11', name: 'Ìká Méjì',      desc: 'Intellect & Craft',         color: '#e9498a' },
  { num: '12', name: 'Otúrúpọn Méjì', desc: 'Complexity & Accumulation', color: '#f5c518' },
  { num: '13', name: 'Otúrá Méjì',    desc: 'Communication & Trust',     color: '#d4a017' },
  { num: '14', name: 'Ìrẹtẹ Méjì',    desc: 'Foundation & Stability',    color: '#7c3aed' },
  { num: '15', name: 'Òṣé Méjì',      desc: 'Expansion & Prosperity',    color: '#3b9eff' },
  { num: '16', name: 'Òfún Méjì',     desc: 'Creation & Completion',     color: '#00c87c' },
];

// ─── STEAMSEX HISTORY DATA ────────────────────────────────────────────────────

const STEAMSEX_HIST = [
  { letter:'S', name:'History as Science',        short:'Science',    color:'#f0920c',
    desc:'Applying scientific method, empiricism, and Ifa axiomatic laws to the study of the past — making history a verifiable, reproducible discipline grounded in the 256 Odu.' },
  { letter:'T', name:'History as Technology',     short:'Technology', color:'#14b8d4',
    desc:'How technologies have shaped historical forces — and how Ifa Technologies document, simulate, and transmit the full record of Ìtàn across all eras.' },
  { letter:'E', name:'History as Engineering',    short:'Engineering',color:'#00c87c',
    desc:'The design and construction of civilisations, infrastructures, and knowledge systems across time — history as the complete record of all human and Orisa engineering.' },
  { letter:'A', name:'History as Arts',           short:'Arts',       color:'#ec4899',
    desc:'Oral tradition, literature, music, and visual culture as historical documents — the aesthetic dimension of Ìtàn and all creative historical expression.' },
  { letter:'M', name:'History as Mathematics',    short:'Mathematics',color:'#f5c518',
    desc:'Mathematical modelling of historical processes — chronology, periodisation, statistical history, and the 256 Odu as the axiomatic matrix of all historical knowledge.' },
  { letter:'S', name:'History as Social Science', short:'Social',     color:'#8b5cf6',
    desc:'The history of society, culture, economics, politics, and collective human life — every social science has its own Ìtàn, all governed by the 16 Ifa Laws of Nature.' },
  { letter:'E', name:'History as Education',      short:'Education',  color:'#3b9eff',
    desc:'How historical knowledge is transmitted, preserved, and taught across generations — Ifa Historical Education as the living engine of civilisational memory and identity.' },
  { letter:'X', name:'History as Others',         short:'Unknowns',   color:'#6366f1',
    desc:'The history of the unknown — undocumented civilisations, frontier fields, speculative histories, and all dimensions of the past not yet formally narrated in IFABOK.' },
];

// ─── SIDECHRX HISTORY DATA ────────────────────────────────────────────────────

const SIDECHRX_HIST = [
  { letter:'S', name:'Symmetry Laws of History',     color:'#f0920c', symbol:'⊛',
    desc:'History preserves deep structural patterns across all periods — civilisations rise and fall in symmetric cycles governed by the Ogbé Base-Field of Ifa.' },
  { letter:'I', name:'Invariance Laws of History',   color:'#6366f1', symbol:'⟲',
    desc:'What persists through all historical change — the invariant laws, cultural constants, and axiomatic truths that remain unchanged across all eras and civilisations.' },
  { letter:'D', name:'Duality Laws of History',      color:'#14b8d4', symbol:'⇔',
    desc:'Every historical force has a dual — rise and fall, memory and forgetting, colonisation and liberation — governed by the Ìwòrì Duality principle of Ifa.' },
  { letter:'E', name:'Emergence Laws of History',    color:'#00c87c', symbol:'↑',
    desc:'New civilisations, ideas, and epochs emerge irreducibly from prior forces — all of history is a continuous Ifa Emergence event unfolding across the Odu field.' },
  { letter:'C', name:'Composition Laws of History',  color:'#ef4444', symbol:'⊕',
    desc:'History is the Amulu composition of all prior events — each era is an Odu composed from the preceding ones, building the complete 256-layer historical matrix.' },
  { letter:'H', name:'Holism Laws of History',       color:'#8b5cf6', symbol:'◎',
    desc:'No historical event can be understood in isolation — Ifa Holism demands every Ìtàn be studied within its full, irreducible context across the complete Odu field.' },
  { letter:'R', name:'Reductionism Laws of History', color:'#3b9eff', symbol:'↓',
    desc:'Every historical event reduces to its foundational Odu — the irreducible axiomatic laws that generated it from first Ifa principles, back to the Ogbé BaseField.' },
  { letter:'X', name:'Simulation Laws of History',   color:'#ec4899', symbol:'◈',
    desc:'All of history is an Ifa Simulation running on the Ogbé BaseField — every historical event is a running Odu programme within the cosmic Ìtàn simulation.' },
];

// ─── IFA RADIAL DIAGRAM ───────────────────────────────────────────────────────

function IfaRadialDiagram({ nodes, centerLabel, centerSub, accentColor, ringLabel }) {
  const [hovered, setHovered] = React.useState(null);
  const cx = 250, cy = 200, nodeR = 158, centerR = 46, dimR = 26;

  const pts = nodes.map((d, i) => {
    const angle = (i / nodes.length) * 2 * Math.PI - Math.PI / 2;
    return { ...d, x: cx + nodeR * Math.cos(angle), y: cy + nodeR * Math.sin(angle) };
  });

  const pathId = `ring-path-${centerLabel.replace(/[\s/]/g, '')}`;

  return (
    <div className="ifar">
      <svg viewBox="0 0 500 400" className="ifar__svg" role="img" aria-label={`${centerLabel} radial matrix diagram`}>
        <defs>
          <path id={pathId}
            d={`M ${cx - nodeR - 20} ${cy} a ${nodeR + 20} ${nodeR + 20} 0 1 1 1 0`} />
        </defs>

        {/* Outer decorative rings */}
        <circle cx={cx} cy={cy} r={nodeR + 20} fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth={1} strokeDasharray="2 12" />
        <circle cx={cx} cy={cy} r={nodeR} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={1} strokeDasharray="4 8" />

        {/* Ring label */}
        <text fontSize="7" fill="rgba(255,255,255,0.15)" fontFamily="monospace" letterSpacing="2.5">
          <textPath href={`#${pathId}`}>{ringLabel || 'IFA HISTORY MATRIX · ÌTÀN · 256 ODU IFA · '}</textPath>
        </text>

        {/* Spokes */}
        {pts.map((p, i) => (
          <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y}
            stroke={hovered === i ? p.color : 'rgba(255,255,255,0.09)'}
            strokeWidth={hovered === i ? 1.8 : 1} />
        ))}

        {/* Center glow */}
        <circle cx={cx} cy={cy} r={centerR + 14} fill={`${accentColor}0d`} />
        <circle cx={cx} cy={cy} r={centerR} fill={`${accentColor}1a`} stroke={accentColor} strokeWidth={1.5} />

        {/* Center text */}
        <text x={cx} y={centerSub ? cy - 4 : cy + 5}
          textAnchor="middle" fill={accentColor}
          fontSize={centerLabel.length > 8 ? '10' : '13'}
          fontWeight="700" fontFamily="'Segoe UI', sans-serif">
          {centerLabel}
        </text>
        {centerSub && (
          <text x={cx} y={cy + 10}
            textAnchor="middle" fill="rgba(255,255,255,0.35)"
            fontSize="7.5" fontFamily="'Segoe UI', sans-serif">
            {centerSub}
          </text>
        )}

        {/* Dimension/Principle nodes */}
        {pts.map((p, i) => (
          <g key={i}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{ cursor: 'pointer' }}>
            <circle cx={p.x} cy={p.y} r={dimR}
              fill={hovered === i ? `${p.color}2e` : `${p.color}18`}
              stroke={p.color} strokeWidth={hovered === i ? 2 : 1.5} />
            <text x={p.x} y={p.y - 3}
              textAnchor="middle" fill={p.color}
              fontSize="11" fontWeight="700" fontFamily="'Segoe UI', sans-serif">
              {p.letter}
            </text>
            <text x={p.x} y={p.y + 10}
              textAnchor="middle" fill="rgba(255,255,255,0.5)"
              fontSize="7" fontFamily="'Segoe UI', sans-serif">
              {p.short}
            </text>
          </g>
        ))}
      </svg>

      {/* Hover tooltip */}
      {hovered !== null && (
        <div className="ifar__tooltip">
          <span className="ifar__tooltip-letter" style={{ color: pts[hovered].color }}>
            {pts[hovered].letter}
          </span>
          <div>
            <div className="ifar__tooltip-name">{pts[hovered].name}</div>
            <div className="ifar__tooltip-desc">{pts[hovered].desc}</div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── TIME SPHERE VISUAL ───────────────────────────────────────────────────────

function TimeSphere() {
  return (
    <div className="time-sphere" aria-hidden="true">
      <div className="ts-ring ts-ring--3">
        <span className="ts-ring__tag ts-ring__tag--top">Cosmic</span>
      </div>
      <div className="ts-ring ts-ring--2">
        <span className="ts-ring__tag ts-ring__tag--bot">Human</span>
      </div>
      <div className="ts-ring ts-ring--1" />
      <div className="ts-arc ts-arc--1" />
      <div className="ts-arc ts-arc--2" />
      <div className="ts-particle ts-particle--1" />
      <div className="ts-particle ts-particle--2" />
      <div className="ts-particle ts-particle--3" />
      <div className="ts-particle ts-particle--4" />
      <div className="ts-core">
        <div className="ts-core__glow" />
        <span className="ts-core__text">Ìtàn</span>
        <span className="ts-core__sub">Ifa History</span>
      </div>
    </div>
  );
}

// ─── HEADER ──────────────────────────────────────────────────────────────────

function Header() {
  return (
    <header className="header">
      <div className="header__inner">
        <a href="../" className="header__brand">
          <img src="../src/assets/itoe_logo.png" alt="iTOE" className="header__logo" />
          <div>
            <div className="header__site">The IFA Internet</div>
            <div className="header__name">Ifa History</div>
          </div>
        </a>
        <nav className="header__nav">
          <a className="nav-link" href="#definition">What is Ìtàn</a>
          <a className="nav-link" href="#itan">Ìtàn Framework</a>
          <a className="nav-link" href="#disciplines">Disciplines</a>
          <a className="nav-link" href="#laws">16 Laws</a>
          <a className="nav-link" href="#projects">Projects</a>
          <a className="nav-link nav-link--playground" href="./playground/">⬡ Playground</a>
          <a className="nav-link nav-link--cta"
             href="https://toe.cenproject.org/ifa-mathematics-toe-mathematics/"
             target="_blank" rel="noopener noreferrer">IFA Mathematics</a>
        </nav>
      </div>
    </header>
  );
}

// ─── MOBILE BAR ──────────────────────────────────────────────────────────────

function MobileBar() {
  const items = [
    { sym: '⌂',   label: 'Home',      href: '../' },
    { sym: 'Ìtàn', label: 'Ìtàn',    href: '#definition' },
    { sym: '◈',   label: 'Fields',    href: '#disciplines' },
    { sym: '16',  label: 'Laws',       href: '#laws' },
    { sym: '⬡',   label: 'Play',      href: './playground/' },
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

      <div className="container hero__layout">
        <div className="hero__left">
          <div className="hero__badge">
            <span className="hero__badge-dot" />
            The IFA Internet &mdash; Ifa History Platform
          </div>

          <h1 className="hero__title">
            <span className="hero__title-main">Ifa History</span>
            <span className="hero__title-colon">History in Ifa Language (IfaLang)</span>
            <span className="hero__title-yor">Ìtàn ní Èdè Ifá</span>
            <span className="hero__title-dual">
              Dual: <em>Orisa History</em> — History in Orisa Language (OrisaLang)
            </span>
            <span className="hero__title-yor hero__title-yor--orisa">Ìtàn ní Èdè Òrìṣà</span>
            <span className="hero__title-sub">Ìtàn Ifá-Òrìṣà</span>
          </h1>

          <p className="hero__tagline">
            The Complete Axiomatic Framework for History &mdash; grounded in the 256 Odu Ifa
          </p>

          <p className="hero__desc">
            <strong>Ifa History</strong> is the IFA Internet's field for studying, documenting,
            and narrating history through the 16 Ifa and Orisa Laws of Nature — a mathematical,
            interdisciplinary, and polymathic approach spanning historiography, chronology,
            philosophy, archaeology, politics, Big History, and others.
          </p>

          <div className="hero__aliases">
            {ALIASES.map((a, i) => (
              <span key={i} className="hero__alias" style={{ '--alias-color': a.color }}>
                {a.label}
              </span>
            ))}
          </div>

          <div className="hero__ctas">
            <a href="#definition" className="btn btn--primary">Explore Ìtàn</a>
            <a href="#laws" className="btn btn--ghost">The 16 Laws</a>
          </div>
        </div>

        <div className="hero__right" aria-hidden="true">
          <TimeSphere />
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
              <span className="section__eyebrow section__eyebrow--gold">What is Ifa History</span>
              <h2 className="section__title">
                Ìtàn — <span className="accent--gold">Story, History &amp; Narrative</span>
              </h2>
              <p className="section__subtitle">
                In Yoruba, <strong>Ìtàn</strong> means story, history, and narrative simultaneously —
                a unified conception that the IFA Internet extends into a complete axiomatic science.
              </p>
            </div>

            <div className="def-blocks">
              <div className="def-block">
                <div className="def-block__icon">Ìtàn</div>
                <div className="def-block__content">
                  <div className="def-block__label">History as Ìtàn</div>
                  <p className="def-block__body">
                    History is the systematic study and interpretation of the human past using
                    primary and secondary sources to construct explanatory narratives.
                    Ifa History extends this definition to all dimensions of reality.
                  </p>
                </div>
              </div>
              <div className="def-block">
                <div className="def-block__icon">256</div>
                <div className="def-block__content">
                  <div className="def-block__label">The Axiomatic Matrix</div>
                  <p className="def-block__body">
                    The 256 Odu Ifa serve as the axiomatic matrix of all historical knowledge —
                    encoding the laws that govern how events unfold, how knowledge is transmitted,
                    and how the past shapes the present.
                  </p>
                </div>
              </div>
              <div className="def-block">
                <div className="def-block__icon">∞</div>
                <div className="def-block__content">
                  <div className="def-block__label">Mathematical &amp; Polymathic</div>
                  <p className="def-block__body">
                    A mathematical, interdisciplinary approach — integrating historiography,
                    philosophy, archaeology, science, and the Ifa Body of Knowledge into
                    a unified, polymathic historical science.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="def-visual">
            <div className="itan-symbol">
              <div className="itan-symbol__ring itan-symbol__ring--outer" />
              <div className="itan-symbol__ring itan-symbol__ring--mid" />
              <div className="itan-symbol__arc itan-symbol__arc--1" />
              <div className="itan-symbol__arc itan-symbol__arc--2" />
              <div className="itan-symbol__core">
                <span className="itan-symbol__char">Ìtàn</span>
              </div>
              <div className="itan-symbol__label">Story · History · Narrative</div>
              <div className="itan-symbol__sub">Ifa &amp; Orisa · 256 Odu</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── ÌTÀN ÒRÌṢÀ & ÒRÌṢÀ ÌTÀN SECTION ───────────────────────────────────────

const ORISA_DUAL = [
  {
    sym: 'Ò', color: '#7c3aed',
    title: 'Ìtàn Òrìṣà',
    short: 'Ìtànṣà',
    body: 'The history OF the Orisa — the systematic study of divine forces, their cosmic origins, manifestations, and roles across all dimensions of reality, as narrated and encoded in the Odu Ifa.',
  },
  {
    sym: '⊚', color: '#d4a017',
    title: 'Òrìṣà Ìtàn',
    short: 'The Orisa of History',
    body: 'The Orisa OF History — the divine designation for the Orisa whose domain is Ìtàn itself: the cosmic custodian and supreme narrator of history, reality, and all that has unfolded across time.',
  },
];

function OrisaItanSection() {
  return (
    <section className="section section--dark" id="orisa-itan">
      <div className="container">
        <div className="section__header section__header--center">
          <span className="section__eyebrow section__eyebrow--violet">The Dual</span>
          <h2 className="section__title">
            Ìtàn Òrìṣà &amp; <span className="accent--violet">Òrìṣà Ìtàn</span>
          </h2>
          <p className="section__subtitle">
            Ìtàn Òrìṣà is the history of the Orisa. Òrìṣà Ìtàn is the Orisa of History —
            the divine whose domain is Ìtàn itself.
          </p>
        </div>

        <div className="itan-grid" style={{ marginBottom: '28px' }}>
          {ORISA_DUAL.map((d, i) => (
            <div key={i} className="itan-card" style={{ '--ic-color': d.color }}>
              <div className="itan-card__top">
                <div className="itan-card__sym">{d.sym}</div>
                <div className="itan-card__short">{d.short}</div>
              </div>
              <h3 className="itan-card__title">{d.title}</h3>
              <p className="itan-card__body">{d.body}</p>
              <div className="itan-card__glow" />
            </div>
          ))}
        </div>

        <div className="orunmila-block">
          <div className="orunmila-block__glow" aria-hidden="true" />
          <div className="orunmila-block__sym">Ọ̀</div>
          <div>
            <div className="orunmila-block__label">Òrìṣà Ìtàn</div>
            <h3 className="orunmila-block__title">
              Ọ̀rúnmìlà — The Energy &amp; Spirit of History
            </h3>
            <p className="orunmila-block__body">
              Ọ̀rúnmìlà is <strong>Òrìṣà Ìtàn</strong> — the Orisa who embodies and governs the
              field of History. Present at the formation of all destinies and the unfolding of all
              events, Ọ̀rúnmìlà is the cosmic witness and supreme narrator of Ìtàn. In IFABOK,
              Ọ̀rúnmìlà is the Energy and Spirit through which all history is known, interpreted,
              and transmitted — the living axiomatic foundation of Ifa History.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── ÌTÀN FRAMEWORK SECTION ──────────────────────────────────────────────────

function ItanSection() {
  return (
    <section className="section section--alt" id="itan">
      <div className="container">
        <div className="section__header section__header--center">
          <span className="section__eyebrow section__eyebrow--violet">The Ìtàn Framework</span>
          <h2 className="section__title">Four Dimensions of Ifa-Orisa History</h2>
          <p className="section__subtitle">
            The dual of Ifa History is Orisa History. Together they form the complete, axiomatic Ìtàn framework.
          </p>
        </div>

        <div className="itan-grid">
          {ITAN.map((it, i) => (
            <div key={i} className="itan-card" style={{ '--ic-color': it.color }}>
              <div className="itan-card__top">
                <div className="itan-card__sym">{it.sym}</div>
                <div className="itan-card__short">{it.short}</div>
              </div>
              <h3 className="itan-card__title">{it.title}</h3>
              <p className="itan-card__body">{it.body}</p>
              <div className="itan-card__glow" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── IFAYORUBA BRIDGE ────────────────────────────────────────────────────────

function IfaYorBridgeSection() {
  return (
    <section className="twin-bridge" aria-label="Linked Platform: IfaYoruba">
      <div className="container">
        <div className="twin-bridge__label">Linked Platform — Studying Together</div>
        <div className="twin-bridge__row">

          <div className="twin-bridge__self">
            <div className="twin-bridge__self-sym">Ìtàn</div>
            <div className="twin-bridge__self-name">Ifa History</div>
            <div className="twin-bridge__self-sub">IfaLang · Ìtàn ní Èdè Ifá</div>
          </div>

          <div className="twin-bridge__mid">
            <div className="twin-bridge__line" aria-hidden="true" />
            <div className="twin-bridge__scope">
              <div className="twin-bridge__scope-hd">Shared Study</div>
              <div className="twin-bridge__scope-items">
                <span>Ifa-Orisa Origin of Language</span>
                <span>Ifa-Orisa History</span>
                <span>Yoruba Towns &amp; Cities</span>
                <span>Ìtàn Ilẹ̀ Ifẹ̀ &amp; Yorùbáland</span>
              </div>
            </div>
            <div className="twin-bridge__line" aria-hidden="true" />
          </div>

          <a href="https://ifainternet.org/ifa-yor/" className="twin-bridge__link">
            <div className="twin-bridge__link-sym">Odù</div>
            <div className="twin-bridge__link-name">IfaYoruba</div>
            <div className="twin-bridge__link-sub">OrisaLang · Ìtàn ní Èdè Òrìṣà</div>
            <div className="twin-bridge__link-arrow">Explore IfaYoruba →</div>
          </a>

        </div>
      </div>
    </section>
  );
}

// ─── DISCIPLINES SECTION ─────────────────────────────────────────────────────

function DisciplinesSection() {
  return (
    <section className="section section--dark" id="disciplines">
      <div className="container">
        <div className="section__header section__header--center">
          <span className="section__eyebrow section__eyebrow--gold">Fields of Study</span>
          <h2 className="section__title">Core Disciplines of Ifa History</h2>
          <p className="section__subtitle">
            Ifa History spans all fields of knowledge — these are its primary disciplines,
            each governed by the axiomatic structure of the 256 Odu Ifa.
          </p>
        </div>

        <div className="disc-grid">
          {DISCIPLINES.map(d => (
            <div key={d.num} className="disc-card" style={{ '--dc-color': d.color }}>
              <div className="disc-card__top">
                <span className="disc-card__sym">{d.sym}</span>
                <span className="disc-card__num">{d.num}</span>
              </div>
              <h3 className="disc-card__title">{d.title}</h3>
              <div className="disc-card__sub">{d.sub}</div>
              <p className="disc-card__body">{d.body}</p>
              <div className="disc-card__bar" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── STEAMSEX MATRIX SECTION (IFA HISTORY) ───────────────────────────────────

function SteamsexHistSection() {
  return (
    <section className="section" id="steamsex">
      <div className="container">

        <div className="section__header section__header--center">
          <span className="section__eyebrow section__eyebrow--amber">IFA Matrix · MatxoE · CEN Matrix · Amulu Matrix</span>
          <h2 className="section__title">
            The <span style={{ color: 'var(--amber-lt)' }}>STEAMSEX</span> Matrix (Ifa Architecture)
          </h2>
          <p className="section__subtitle">
            The IFA Matrix maps every field of knowledge to the Node of{' '}
            <strong>History</strong> — showing Ifa History as the polymathic, axiomatic record
            of all knowledge: Science, Technology, Engineering, Arts, Mathematics, Social Science,
            Education, and Others.
          </p>
        </div>

        {/* Definition block */}
        <div className="stx-hist-def">
          <div className="stx-hist-def__label">STEAMSEX — The 8 Dimensions of History</div>
          <p className="stx-hist-def__text">
            <strong>STEAMSEX</strong> stands for{' '}
            <strong style={{ color: '#f0920c' }}>Science</strong>,{' '}
            <strong style={{ color: '#14b8d4' }}>Technology</strong>,{' '}
            <strong style={{ color: '#00c87c' }}>Engineering</strong>,{' '}
            <strong style={{ color: '#ec4899' }}>Arts</strong>,{' '}
            <strong style={{ color: '#f5c518' }}>Mathematics</strong>,{' '}
            <strong style={{ color: '#8b5cf6' }}>Social Science</strong>,{' '}
            <strong style={{ color: '#3b9eff' }}>Education</strong>, and{' '}
            <strong style={{ color: '#6366f1' }}>Others (Unknowns)</strong> —
            every dimension of reality has its own Ìtàn (History), unified through the
            Ifa History axiomatic framework and the 256 Odu Ifa.
          </p>
        </div>

        {/* Acronym pills */}
        <div className="stx-acronym">
          {STEAMSEX_HIST.map((d, i) => (
            <div key={i} className="stx-acronym__pill" style={{ borderColor: d.color + '38' }}>
              <span className="stx-acronym__letter" style={{ color: d.color }}>{d.letter}</span>
              <span className="stx-acronym__name">{d.name}</span>
            </div>
          ))}
        </div>

        {/* Two radial diagrams */}
        <div className="stx-hist-diagrams">
          <div className="stx-hist-diagram-wrap">
            <div className="stx-hist-diagram-label">STEAMSEX Matrix · Ifa Architecture</div>
            <IfaRadialDiagram
              nodes={STEAMSEX_HIST}
              centerLabel="History"
              centerSub="Ìtàn · Ifa"
              accentColor="#d4a017"
              ringLabel="S · T · E · A · M · S · E · X · STEAMSEX MATRIX · IFA HISTORY · "
            />
          </div>
          <div className="stx-hist-diagram-wrap">
            <div className="stx-hist-diagram-label">STEAMSEX Matrix · Energy Architecture</div>
            <IfaRadialDiagram
              nodes={STEAMSEX_HIST}
              centerLabel="Energy"
              centerSub="of History · Ìtàn"
              accentColor="#00c87c"
              ringLabel="S · T · E · A · M · S · E · X · STEAMSEX MATRIX · ENERGY ARCHITECTURE · "
            />
          </div>
        </div>

        {/* 8 dimension cards */}
        <div className="stx-dim-grid">
          {STEAMSEX_HIST.map((d, i) => (
            <div key={i} className="stx-dim-card" style={{ '--sdc-color': d.color }}>
              <div className="stx-dim-card__top">
                <span className="stx-dim-card__letter">{d.letter}</span>
                <span className="stx-dim-card__short">{d.short}</span>
              </div>
              <div className="stx-dim-card__name">{d.name}</div>
              <p className="stx-dim-card__desc">{d.desc}</p>
              <div className="stx-dim-card__bar" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

// ─── SIDECHRX MATRIX SECTION (IFA HISTORY) ───────────────────────────────────

function SidechrxHistSection() {
  return (
    <section className="section section--dark" id="sidechrx">
      <div className="container">

        <div className="section__header section__header--center">
          <span className="section__eyebrow section__eyebrow--violet">IFA Mathematica: SIDECHRX (8 Meta-Principles of Ifa)</span>
          <h2 className="section__title">
            <span style={{ color: 'var(--amber-lt)' }}>SIDECHRX</span> — The 8 Principles{' '}
            <span className="accent--violet">Within</span> the History Odu
          </h2>
          <p className="section__subtitle">
            SIDECHRX are the 8 universal meta-principles of Ifa, discovered within the 16 Oju Odu Ifa.
            In Ifa History, the Node is <strong>IfaHistory</strong> — these 8 principles describe
            the axiomatic laws governing how history unfolds, is composed, and is narrated across all eras.
          </p>
        </div>

        {/* Acronym bar */}
        <div className="sidechrx-intro">
          <div className="sidechrx-intro__bar">
            {SIDECHRX_HIST.map((p, i) => (
              <div key={i} className="sidechrx-intro__item" style={{ '--c': p.color }}>
                <span className="sidechrx-intro__letter">{p.letter}</span>
                <span className="sidechrx-intro__name">{p.name.replace(' Laws of History', '')}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Radial diagram */}
        <div className="sdx-diagram-center">
          <IfaRadialDiagram
            nodes={SIDECHRX_HIST.map(p => ({ ...p, short: p.name.replace(' Laws of History', '') }))}
            centerLabel="IfaHistory"
            centerSub="Ìtàn Ifá-Òrìṣà"
            accentColor="#d4a017"
            ringLabel="S · I · D · E · C · H · R · X · SIDECHRX MATRIX · IFA HISTORY · "
          />
        </div>

        {/* 8 principle cards */}
        <div className="sdx-principle-grid">
          {SIDECHRX_HIST.map((p, i) => (
            <div key={i} className="sdx-principle-card" style={{ '--spc-color': p.color }}>
              <div className="sdx-principle-card__top">
                <span className="sdx-principle-card__sym">{p.symbol}</span>
                <span className="sdx-principle-card__letter">{p.letter}</span>
              </div>
              <div className="sdx-principle-card__name">{p.name}</div>
              <p className="sdx-principle-card__desc">{p.desc}</p>
              <div className="sdx-principle-card__bar" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

// ─── 16 LAWS SECTION ─────────────────────────────────────────────────────────

function LawsSection() {
  const [active, setActive] = useState(null);

  return (
    <section className="section" id="laws">
      <div className="container">
        <div className="section__header section__header--center">
          <span className="section__eyebrow section__eyebrow--amber">The Axiomatic Foundation</span>
          <h2 className="section__title">The 16 Laws of Ifa History</h2>
          <p className="section__subtitle">
            The 16 Principal Odu Ifa are the governing laws of all historical knowledge —
            the axiomatic codes from which every historical principle derives.
          </p>
        </div>

        <div className="laws-grid">
          {LAWS.map((law, i) => (
            <div
              key={i}
              className={`law-chip${active === i ? ' law-chip--active' : ''}`}
              style={{ '--lc-color': law.color }}
              onClick={() => setActive(active === i ? null : i)}
            >
              <div className="law-chip__num">{law.num}</div>
              <div className="law-chip__name">{law.name}</div>
              <div className="law-chip__desc">{law.desc}</div>
            </div>
          ))}
        </div>

        <p className="laws-caption">
          Select any law to expand &mdash; all 256 Odu derive from these 16 principal codes
        </p>
      </div>
    </section>
  );
}

// ─── PROJECTS SECTION ────────────────────────────────────────────────────────

const NOTE_ENTRIES = [
  {
    odu: 'Èjìogbè', color: '#d4a017', tag: 'Big History',
    title: 'The First Era — Ogbé BaseField',
    body: 'All history begins in the Ogbé BaseField — the primordial Odu from which every epoch, civilisation, and historical event emerges. The 16 Ifa Laws of Nature govern every process without exception.',
  },
  {
    odu: 'Òyèkú Méjì', color: '#6366f1', tag: 'Invariance Laws',
    title: 'What Persists Through Time',
    body: 'Certain truths remain constant across all civilisations and eras — the Invariance Laws of History, encoded in Òyèkú Méjì. From the oldest oral traditions to modern historiography, the same axiomatic laws always apply.',
  },
  {
    odu: 'Ìwòrì Méjì', color: '#14b8d4', tag: 'Duality Laws',
    title: 'Rise & Fall · Memory & Forgetting',
    body: 'Every historical force has a dual — colonisation and liberation, memory and forgetting, creation and destruction. Ìwòrì Méjì encodes the fundamental duality that drives all historical motion across every era.',
  },
  {
    odu: 'Ìrosùn Méjì', color: '#ef4444', tag: 'Composition Laws',
    title: 'History as Amulu Composition',
    body: 'Each historical era is composed from all that came before it — an Odu built from preceding Odu in a continuous Amulu process. No epoch is isolated; every civilisation is a composition of prior forces.',
  },
];

function NoteMockup() {
  const [active, setActive] = React.useState(0);
  const [typed, setTyped] = React.useState('');
  const entry = NOTE_ENTRIES[active];

  React.useEffect(() => {
    setTyped('');
    let i = 0;
    const full = entry.body;
    const iv = setInterval(() => {
      if (i < full.length) { setTyped(full.slice(0, ++i)); }
      else { clearInterval(iv); }
    }, 16);
    return () => clearInterval(iv);
  }, [active]);

  React.useEffect(() => {
    const t = setTimeout(() => setActive(a => (a + 1) % NOTE_ENTRIES.length), 5800);
    return () => clearTimeout(t);
  }, [active]);

  return (
    <div className="note-mockup">
      <div className="note-mockup__bar">
        <span className="note-mockup__dot" />
        <span className="note-mockup__dot" />
        <span className="note-mockup__dot" />
        <span className="note-mockup__title">Ifa Note</span>
      </div>
      <div className="note-mockup__inner">
        <div className="note-mockup__sidebar">
          {NOTE_ENTRIES.map((e, i) => (
            <button
              key={i}
              className={'note-mockup__nav' + (i === active ? ' is-active' : '')}
              style={{ '--nc': e.color }}
              onClick={() => setActive(i)}
            >
              <span className="note-mockup__nav-odu">{e.odu}</span>
              <span className="note-mockup__nav-tag">{e.tag}</span>
            </button>
          ))}
        </div>
        <div className="note-mockup__content">
          <div className="note-mockup__content-tag" style={{ '--nc': entry.color }}>
            Odu: {entry.odu} · {entry.tag}
          </div>
          <div className="note-mockup__content-title" style={{ color: entry.color }}>
            {entry.title}
          </div>
          <div className="note-mockup__content-body">
            {typed}<span className="note-mockup__cursor">|</span>
          </div>
          <div className="note-mockup__dots">
            {NOTE_ENTRIES.map((_, i) => (
              <button key={i} className={'note-mockup__dot-btn' + (i === active ? ' is-active' : '')} style={{ '--nc': NOTE_ENTRIES[i].color }} onClick={() => setActive(i)} />
            ))}
          </div>
        </div>
      </div>
      <a className="note-mockup__open" href="https://ifainternet.org/ifa-notebook/env/" target="_blank" rel="noopener noreferrer">
        Open Ifa Note →
      </a>
    </div>
  );
}

function ProjectsSection() {
  return (
    <section className="section section--alt" id="projects">
      <div className="container">
        <div className="projects-layout">
          <div className="projects-text">
            <div className="section__header">
              <span className="section__eyebrow section__eyebrow--jade">Live Now</span>
              <h2 className="section__title">
                Build History Projects with <span className="accent--jade">Ifa Note</span>
              </h2>
            </div>
            <p className="projects-body">
              <strong>Ifa Note</strong> is the IFA Internet's collaborative knowledge tool — live now.
              Build structured history projects using Ifa Historical methods, the Odu Ifa framework,
              and publish them to the Ifa History community.
            </p>

            <div className="projects-features">
              {[
                { sym: '✍', color: '#d4a017', title: 'Research & Write', desc: 'Structure history projects using Ifa Historical methods and the Odu Ifa framework.' },
                { sym: '⊕', color: '#00c87c', title: 'Publish & Share',  desc: 'Publish completed projects on the Ifa History Platform for the IFA Internet community.' },
                { sym: '◉', color: '#7c3aed', title: 'Collaborate',       desc: 'Work with others on joint historical research, documentation, and narration projects.' },
              ].map((f, i) => (
                <div key={i} className="project-feature" style={{ '--pf-color': f.color }}>
                  <div className="project-feature__sym">{f.sym}</div>
                  <div>
                    <div className="project-feature__title">{f.title}</div>
                    <div className="project-feature__desc">{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="projects-cta">
              <a className="projects-soon-badge" href="https://ifainternet.org/ifa-notebook/env/" target="_blank" rel="noopener noreferrer">Open Ifa Note</a>
            </div>
          </div>

          <div className="projects-visual">
            <NoteMockup />
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
              <img src="../src/assets/itoe_logo.png" alt="iTOE" className="footer__logo-mark" />
              <span>The IFA Internet</span>
            </div>
            <p className="footer__tagline">Ifa History — Ìtàn Ifá-Òrìṣà</p>
            <p className="footer__tagline footer__tagline--sm">
              Part of the <a href="https://cenproject.org/" className="footer__link-inline">CENProject</a> — Consciousness-Energy Research.
            </p>
          </div>
          <nav className="footer__links">
            <a href="#definition"  className="footer__link">What is Ìtàn</a>
            <a href="#itan"        className="footer__link">Ìtàn Framework</a>
            <a href="#disciplines" className="footer__link">Disciplines</a>
            <a href="#laws"        className="footer__link">16 Laws</a>
            <a href="#projects"    className="footer__link">Ifa Note</a>
            <a href="../"          className="footer__link">IFA Internet</a>
          </nav>
        </div>
        <div className="footer__bottom">
          <span className="footer__copy">
            &copy; 2026 CENProject Innovations Limited. All rights reserved.
          </span>
          <span className="footer__powered">
            The IFA Internet &mdash; Ifa History Platform
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
        <OrisaItanSection />
        <ItanSection />
        <IfaYorBridgeSection />
        <DisciplinesSection />
        <SteamsexHistSection />
        <SidechrxHistSection />
        <LawsSection />
        <ProjectsSection />
      </main>
      <Footer />
      <MobileBar />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
