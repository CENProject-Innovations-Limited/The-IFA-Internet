/* ─────────────────────────────────────────────────────────────────────────────
   Ebology — The Field of Energy Exchange
   The IFA Internet · CENProject
   toe.cenproject.org/ebology-the-field-of-energy-exchange/
───────────────────────────────────────────────────────────────────────────── */

const { useState } = React;

// ─── DATA ────────────────────────────────────────────────────────────────────

const ALIASES = [
  { label: 'EnxBOK — Energy Exchange Body of Knowledge', color: '#f0920c' },
  { label: 'ToE Energy Exchange',                        color: '#00c87c' },
  { label: 'Consciousness Energy Exchange',              color: '#8b5cf6' },
  { label: 'Ifa & Orisa Energy Studies',                 color: '#f5c518' },
  { label: 'Metascience of Ẹbọ',                        color: '#3b9eff' },
];

const STATS = [
  { value: '256',  label: 'Odu Ifa',          sub: 'The Axiomatic Exchange Matrix' },
  { value: '16',   label: 'Principal Codes',  sub: 'Laws Governing Energy Exchange' },
  { value: 'CEN',  label: 'Unifying Field',   sub: 'Consciousness · Energy · Nature' },
  { value: 'Ẹbọ', label: 'Core Concept',      sub: 'The Multidimensional Being' },
];

const AREAS = [
  {
    num: '01',
    title: 'Ifa Energy Exchange',
    sub: 'ToE Energy Exchange',
    body: 'The study of how energy flows, exchanges, and transforms across all domains of existence through the axiomatic structure of the 256 Odu Ifa. Ifa Energy Exchange is the universal substrate of all interactions within the IFA Internet.',
    color: '#f0920c',
    sym: '⟳',
  },
  {
    num: '02',
    title: 'Consciousness Energy Exchange',
    sub: 'CEN Exchange Dynamics',
    body: 'The science of how Consciousness and Energy exchange between humans, nature, and non-physical forces. Consciousness Energy Exchange establishes the CEN framework as the governing intelligence behind all ebological processes.',
    color: '#00c87c',
    sym: 'Ψ',
  },
  {
    num: '03',
    title: 'Ifa Economics',
    sub: 'The Economics of the Odu',
    body: 'Ifa Economics applies the 256 Odu Ifa as axiomatic economic principles — governing the distribution, exchange, and transformation of value, resources, and energy across all economic systems within the IFA Internet.',
    color: '#8b5cf6',
    sym: '⊕',
  },
  {
    num: '04',
    title: 'Eboconomics',
    sub: 'Ebo Economics — The Amulu',
    body: 'Eboconomics is the Amulu (composition) of Ebology and Economics — bridging energy science with metaphysical economics. It provides the axiomatic framework for understanding all exchange systems through the lens of Ẹbọ and the living knowledge of the 256 Odu Ifa.',
    color: '#f5c518',
    sym: '◎',
  },
  {
    num: '05',
    title: 'Ebo Economy',
    sub: 'Sustainable Exchange Models',
    body: 'The Ebo Economy provides economic models rooted in energy exchange principles that promote sustainable practices and interconnected prosperity. It positions every economic interaction as an act of ebological exchange — governed by the 256 Odu Ifa.',
    color: '#3b9eff',
    sym: '⬡',
  },
  {
    num: '06',
    title: 'Energy-Based Communications',
    sub: 'Ifa & Orisa Communications',
    body: 'Energy-Based Communications is the study of Energy-Based Connections — encompassing Ifa Communications and Orisa Communications — through which structured ritual offerings, in accordance with Ifa Principles on the Ifa Energy Exchange Framework, flow across the Ebonetwork (Ebonet). These communications facilitate balanced interactions among humans, all fields of knowledge, nature, and the spiritual realms, enhancing harmony and consciousness across the Totality of Existence.',
    color: '#14b8d4',
    sym: '◈',
  },
];

const PRINCIPLES = [
  {
    sym: 'Ψ',
    title: 'IfaWave Function',
    sub: 'Consciousness Wavefunction',
    color: '#f0920c',
    body: 'The IfaWave Function is the Consciousness Wavefunction — the mathematical description of consciousness as a Field of Potentiality. Known as Amulu in Yoruba, it maps the Superposition of all possible and impossible energy states before an exchange interaction resolves them into reality. Every Ẹbọ outcome exists as a Probability Field (Ifa Field) until the exchange occurs.',
  },
  {
    sym: 'W',
    title: 'IfaWork Function',
    sub: 'Consciousness Workfunction',
    color: '#14b8d4',
    body: 'For anything to manifest physically or in other ways, it must satisfy certain (threshold) energy requirements. This is known as IfaWorkfunction, which is the fundamental building block and container of all kinds of workfunction (WF) in modern science. Ifa Workfunction is a vital ebological principle, which is called the law of energy exchange in the Odu Ifa, which generalizes workfunction theory in physical science and engineering to all fields of knowledge (all dimensions of reality). This energy exchange law in IFABOK is a manifestation of IfaBalance or Ifa Equilibrium Principle or Amulu (Ifa Composition), a much deeper Law (examined below).',
  },
  {
    sym: '∿',
    title: 'Ifa Superposition',
    sub: 'Multiple States of Exchange',
    color: '#00c87c',
    body: 'Ifa Superposition describes how all possible energy exchange states coexist simultaneously before a conscious interaction resolves them. Every Ẹbọ outcome exists in Superposition — a Probability Cloud of infinite possibilities and infinite impossibilities expressed in IfaLang as IfaInfinity (Double Infinity) — until the exchange occurs, collapsing the Field into a specific ebological state aligned with a specific Odu.',
  },
  {
    sym: '⧖',
    title: 'Wavefunction Collapse',
    sub: 'Exchange Becomes Reality',
    color: '#8b5cf6',
    body: 'Wavefunction collapse is the moment Ẹbọ energy exchange produces manifestation or result — when energy exchange between human, nature, and spirit resolves from Potentiality into a specific energystate (censtate) of reality. The observation or ritual act forces the system from Superposition into a single definite ebological outcome.',
  },
  {
    sym: '⟳',
    title: 'Energy Exchange Cycle',
    sub: 'The Perpetual Ẹbọ Loop',
    color: '#f5c518',
    body: 'The Energy Exchange Cycle describes the perpetual circulation of Àṣẹ through all domains of existence. Every Ẹbọ offered enters a continuous exchange loop — flowing between the physical body, the natural world, and the non-physical forces — governed by the axiomatic structure of the Odu Ifa.',
  },
  {
    sym: '⊕',
    title: 'Ebo Economy Principle',
    sub: 'Balanced Exchange as Foundation',
    color: '#3b9eff',
    body: 'The Ebo Economy Principle holds that all sustainable economic systems are grounded in balanced energy exchange. Prosperity, abundance, and harmony emerge when the give-and-return cycle of Ẹbọ is honored — aligning human economic behaviour with the axiomatic exchange laws encoded in the 256 Odu Ifa.',
  },
  {
    sym: '◎',
    title: 'The Amulu Principle',
    sub: 'Composition of Ebology & Economics',
    color: '#00c87c',
    body: 'The Amulu (composition) principle establishes that Ebology and Economics are not separate disciplines but a unified system. All economic value, exchange, and distribution are expressions of deeper ebological energy flows — and all energy flows carry economic consequences. Eboconomics is the formal science of this unity.',
  },
];

const NETWORK_CARDS = [
  {
    sym: '⬡',
    title: 'Ẹbọnet',
    sub: 'Ifa Energy Exchange Network',
    color: '#f0920c',
    body: 'Ẹbọnet is the Ifa Energy Exchange Network — the structured framework through which Ase flow/cycle, Energy pathways, transfer, and flows, and ritual offerings in accordance with Ifa Principles facilitate balanced interactions among humans, nature, spiritual realms, all fields of knowledge, and the Totality of Existence (TOE). Ẹbọnet serves as the energetic network infrastructure for all ebological exchange on the IFA Internet.',
  },
  {
    id: 'ebolang',
    sym: '⟶',
    title: 'EboLang',
    sub: 'OrisaLang — The Dual of IfaLang',
    color: '#ec4899',
    body: 'EboLang is a key OrisaLang — the Dual of IfaLang — providing the energy exchange (energy transfer) view for every field of knowledge. As the energetic complement to IfaLang, EboLang encodes the Ẹbọ dimension of reality: the universal language of how energy flows, exchanges, and transfers across all fields of knowledge and the Totality of Existence.',
  },
  {
    sym: '◉',
    title: 'Ifa Energy Management',
    sub: 'Systems & Frameworks',
    color: '#00c87c',
    body: 'Ifa Energy Management Systems apply the foundational principles of Ebology to govern, regulate, and sustain energy exchange processes. These systems draw from the transformative power of the Ẹbọ knowledge base to maintain harmony and consciousness within all exchange interactions.',
  },
  {
    sym: '⊛',
    title: 'Ebo Economy',
    sub: 'Sustainable Exchange Models',
    color: '#8b5cf6',
    body: 'The Ebo Economy models economic systems through the lens of energy exchange — promoting sustainable practices and interconnected prosperity. Every economic interaction is an act of ebological exchange, governed by the living intelligence of the 256 Odu Ifa.',
  },
];

const STEPS = [
  {
    num: '01',
    title: 'Foundations of Energy Exchange',
    body: 'Begin by exploring the core concepts of Ẹbọ and the interaction between humans, nature, and spiritual energies — establishing the axiomatic basis for deeper engagement with Ebology.',
    color: '#f0920c',
  },
  {
    num: '02',
    title: 'Applying Eboconomics',
    body: 'Learn to implement Ifa and Ebo Economics principles, navigating the structured systems that govern consciousness energy exchange across all knowledge fields of the IFA Internet.',
    color: '#00c87c',
  },
  {
    num: '03',
    title: 'Embracing Eboconomical Systems',
    body: 'Understand how to utilize advanced Ebology technologies and metascience to enhance and sustain balanced energy interactions — bringing the complete wisdom of the 256 Odu Ifa into practice.',
    color: '#8b5cf6',
  },
];

// ─── SHARED: ENERGY ORB VISUAL ────────────────────────────────────────────────

function EnergyOrb() {
  return (
    <div className="energy-orb" aria-hidden="true">
      <div className="energy-orb__ring energy-orb__ring--3" />
      <div className="energy-orb__ring energy-orb__ring--2" />
      <div className="energy-orb__ring energy-orb__ring--1" />
      <div className="energy-orb__arc energy-orb__arc--1" />
      <div className="energy-orb__arc energy-orb__arc--2" />
      <div className="energy-orb__arc energy-orb__arc--3" />
      <div className="energy-orb__particle energy-orb__particle--1" />
      <div className="energy-orb__particle energy-orb__particle--2" />
      <div className="energy-orb__particle energy-orb__particle--3" />
      <div className="energy-orb__particle energy-orb__particle--4" />
      <div className="energy-orb__core">
        <div className="energy-orb__core-glow" />
        <span className="energy-orb__char">Ẹbọ</span>
        <span className="energy-orb__core-label">Energy Exchange</span>
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
            <div className="header__name">Ebology</div>
          </div>
        </a>
        <nav className="header__nav">
          <a className="nav-link" href="#definition">Ẹbọ</a>
          <a className="nav-link" href="#areas">Areas</a>
          <a className="nav-link" href="#network">Ẹbọnet</a>
          <a className="nav-link" href="#ebolang">EboLang</a>
          <a className="nav-link" href="#principles">Principles</a>
          <a className="nav-link" href="#eboconomics">Eboconomics</a>
          <a className="nav-link" href="#path">Learn</a>
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
    { sym: '⌂',   label: 'Home',       href: '../' },
    { sym: 'Ẹbọ', label: 'Ẹbọ',       href: '#definition' },
    { sym: '⬡',   label: 'Ẹbọnet',    href: '#network' },
    { sym: '⟶',   label: 'EboLang',   href: '#ebolang' },
    { sym: '∿',   label: 'Principles', href: '#principles' },
    { sym: '⊕',   label: 'Ebonomics', href: '#eboconomics' },
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
            The IFA Internet &mdash; Ebology Platform
          </div>

          <h1 className="hero__title">
            <span className="hero__title-main">Ebology</span>
            <span className="hero__title-sub">The Field of Energy Exchange</span>
          </h1>

          <p className="hero__tagline">
            Ifa &amp; Orisa Energy Studies &mdash; The Metascience of Ẹbọ
          </p>

          <p className="hero__desc">
            Ebology is the <strong>Energy Exchange Body of Knowledge (EnxBOK)</strong> —
            the structured knowledge, science, practice, philosophy, and art of energy
            exchange as a system of interaction between humans, nature, and non-physical forces.
            At its core lies <strong>Ẹbọ</strong> — a multidimensional being whose study
            constitutes the mathematical and holistic foundation of this science.
          </p>

          <div className="hero__aliases">
            {ALIASES.map((a, i) => (
              <span key={i} className="hero__alias" style={{ '--alias-color': a.color }}>
                {a.label}
              </span>
            ))}
          </div>

          <div className="hero__ctas">
            <a href="#definition" className="btn btn--primary">Explore Ẹbọ</a>
            <a href="#principles" className="btn btn--ghost">The Principles</a>
          </div>
        </div>

        <div className="hero__right" aria-hidden="true">
          <EnergyOrb />
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
              <span className="section__eyebrow section__eyebrow--amber">What is Ebology</span>
              <h2 className="section__title">
                The Metascience of <span className="accent--amber">Ẹbọ</span>
              </h2>
              <p className="section__subtitle">
                Ebology is the mathematical and holistic study of <strong>Ẹbọ</strong> — a
                multidimensional being. In the IFA Body of Knowledge (IFABOK), Ebology
                encompasses the structured knowledge, science, practice, philosophy, and
                art of energy exchange.
              </p>
            </div>

            <div className="def-blocks">
              <div className="def-block">
                <div className="def-block__icon">Ẹbọ</div>
                <div className="def-block__content">
                  <div className="def-block__label">Ẹbọ</div>
                  <p className="def-block__body">
                    In everyday language, Ẹbọ means sacrifice, ritual, or offering. But
                    within the IFA metascience, it is far deeper — a core Aspect of the
                    metascience of Ifa and Orisa, describing the multidimensional exchange
                    of energy between the physical, natural, and spiritual realms.
                  </p>
                </div>
              </div>
              <div className="def-block">
                <div className="def-block__icon">⟳</div>
                <div className="def-block__content">
                  <div className="def-block__label">EnxBOK</div>
                  <p className="def-block__body">
                    As the Energy Exchange Body of Knowledge, Ebology is the science and art
                    of energy exchange — studying how humans, nature, and non-physical forces
                    interact through structured, axiomatic exchange principles derived from
                    the 256 Odu Ifa.
                  </p>
                </div>
              </div>
              <div className="def-block">
                <div className="def-block__icon">⬡</div>
                <div className="def-block__content">
                  <div className="def-block__label">IFA Internet Application</div>
                  <p className="def-block__body">
                    Ebology has a wide range of applications on the IFA Internet, including
                    eboconomical systems and technologies — applying the knowledge of the
                    metascience of Ẹbọ across all platforms and knowledge fields.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="def-visual">
            <div className="ebo-symbol">
              <div className="ebo-symbol__ring ebo-symbol__ring--outer" />
              <div className="ebo-symbol__ring ebo-symbol__ring--mid" />
              <div className="ebo-symbol__arc ebo-symbol__arc--1" />
              <div className="ebo-symbol__arc ebo-symbol__arc--2" />
              <div className="ebo-symbol__core">
                <span className="ebo-symbol__char">Ẹbọ</span>
              </div>
              <div className="ebo-symbol__label">The Multidimensional Being</div>
              <div className="ebo-symbol__sub">Energy Exchange · Ifa Metascience</div>
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
          <span className="section__eyebrow section__eyebrow--jade">Key Areas of Study</span>
          <h2 className="section__title">The Core Fields of Ebology</h2>
          <p className="section__subtitle">
            Research and study in Ebology spans all fields of knowledge and interconnected areas, each grounded in
            the 256 Odu Ifa as the axiomatic energy-exchange matrix.
          </p>
        </div>

        <div className="areas-grid">
          {AREAS.map(a => (
            <div key={a.num} className="area-card" style={{ '--area-color': a.color }}>
              <div className="area-card__top">
                <span className="area-card__sym">{a.sym}</span>
                <span className="area-card__num">{a.num}</span>
              </div>
              <h3 className="area-card__title">{a.title}</h3>
              <div className="area-card__sub">{a.sub}</div>
              <p className="area-card__body">{a.body}</p>
              <div className="area-card__glow" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── EBONET / NETWORK SECTION ─────────────────────────────────────────────────

function NetworkSection() {
  return (
    <section className="section section--dark" id="network">
      <div className="container">
        <div className="section__header section__header--center">
          <span className="section__eyebrow section__eyebrow--amber">Energy Infrastructure</span>
          <h2 className="section__title">
            Ẹbọnet &amp; <span className="accent--amber">Ifa Energy Systems</span>
          </h2>
          <p className="section__subtitle">
            The network and management systems through which Ebology is applied —
            facilitating balanced energy exchange across all domains of the IFA Internet.
          </p>
        </div>

        <div className="network-cards">
          {NETWORK_CARDS.map((c, i) => (
            <div key={i} id={c.id || undefined} className="network-card" style={{ '--nc-color': c.color }}>
              <div className="network-card__header">
                <div className="network-card__icon">{c.sym}</div>
                <div className="network-card__pulse" />
              </div>
              <h3 className="network-card__title">{c.title}</h3>
              <div className="network-card__sub">{c.sub}</div>
              <p className="network-card__desc">{c.body}</p>
              <div className="network-card__bar" />
            </div>
          ))}
        </div>

        <div className="ebonet-flow-wrap">
          <div className="ebonet-flow">
            <div className="ebonet-node ebonet-node--human">
              <div className="ebonet-node__ring" />
              <div className="ebonet-node__dot" />
              <div className="ebonet-node__sym">◯</div>
              <div className="ebonet-node__label">Human</div>
            </div>
            <div className="ebonet-edge">
              <div className="ebonet-edge__track">
                <div className="ebonet-edge__flow" />
              </div>
              <div className="ebonet-edge__label">Àṣẹ</div>
            </div>
            <div className="ebonet-node ebonet-node--ebo">
              <div className="ebonet-node__ring" />
              <div className="ebonet-node__dot" />
              <div className="ebonet-node__sym ebonet-node__sym--main">Ẹbọ</div>
              <div className="ebonet-node__label">Exchange</div>
            </div>
            <div className="ebonet-edge">
              <div className="ebonet-edge__track">
                <div className="ebonet-edge__flow ebonet-edge__flow--rev" />
              </div>
              <div className="ebonet-edge__label">Àṣẹ</div>
            </div>
            <div className="ebonet-node ebonet-node--nature">
              <div className="ebonet-node__ring" />
              <div className="ebonet-node__dot" />
              <div className="ebonet-node__sym">⬡</div>
              <div className="ebonet-node__label">Nature</div>
            </div>
            <div className="ebonet-edge">
              <div className="ebonet-edge__track">
                <div className="ebonet-edge__flow" />
              </div>
              <div className="ebonet-edge__label">Àṣẹ</div>
            </div>
            <div className="ebonet-node ebonet-node--spirit">
              <div className="ebonet-node__ring" />
              <div className="ebonet-node__dot" />
              <div className="ebonet-node__sym">◎</div>
              <div className="ebonet-node__label">Spirit</div>
            </div>
          </div>
          <p className="ebonet-flow__caption">
            IfaSchema: Ẹbọnet facilitates the structured exchange of Àṣẹ across all realms
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── PRINCIPLES SECTION ──────────────────────────────────────────────────────

function PrinciplesSection() {
  const [active, setActive] = useState(0);
  const p = PRINCIPLES[active];

  return (
    <section className="section" id="principles">
      <div className="container">
        <div className="section__header section__header--center">
          <span className="section__eyebrow section__eyebrow--violet">Ebological Science</span>
          <h2 className="section__title">The Principles of Ebology</h2>
          <p className="section__subtitle">
            The foundational principles that govern energy exchange — from the
            quantum mechanics of the IfaWave Function to the perpetual Ẹbọ Exchange Cycle.
          </p>
        </div>

        <div className="principles-layout">
          <div className="principles-tabs">
            {PRINCIPLES.map((pr, i) => (
              <button
                key={i}
                className={`principle-tab${i === active ? ' principle-tab--active' : ''}`}
                style={{ '--pt-color': pr.color }}
                onClick={() => setActive(i)}
              >
                <span className="principle-tab__sym">{pr.sym}</span>
                <span className="principle-tab__name">{pr.title}</span>
                <span className="principle-tab__arrow">›</span>
              </button>
            ))}
          </div>

          <div className="principle-detail" style={{ '--pd-color': p.color }}>
            <div className="principle-detail__bg" />
            <div className="principle-detail__sym">{p.sym}</div>
            <h3 className="principle-detail__title">{p.title}</h3>
            <div className="principle-detail__sub">{p.sub}</div>
            <p className="principle-detail__body">{p.body}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── EBOCONOMICS SECTION ──────────────────────────────────────────────────────

function EboconomicsSection() {
  return (
    <section className="section section--alt" id="eboconomics">
      <div className="container">
        <div className="eboco-grid">
          <div className="eboco-text">
            <div className="section__header">
              <span className="section__eyebrow section__eyebrow--jade">The Amulu</span>
              <h2 className="section__title">
                Eboconomics: Composition of <span className="accent--jade">Ebology &amp; Economics</span>
              </h2>
            </div>
            <p className="eboco-body">
              <strong>Eboconomics</strong> is the formal science arising from the Amulu
              (composition) of Ebology and Economics. It is an interdisciplinary field that connects the sciences with the non-sciences, bridging energy science with
              metaphysical economics — establishing that all economic activity is, at its
              deepest level, an act of energy exchange.
            </p>
            <p className="eboco-body">
              The <strong>Ebo Economy</strong> provides the economic meta-models that emerge
              from this Union: sustainable, axiomatic exchange meta-systems rooted in the 256
              Odu Ifa — promoting interconnected prosperity through balanced energy flow.
            </p>

            <div className="amulu-display">
              <div className="amulu-part amulu-part--left">
                <div className="amulu-part__sym">Ẹ</div>
                <div className="amulu-part__name">Ebology</div>
                <div className="amulu-part__desc">Energy Exchange Science</div>
              </div>
              <div className="amulu-op">⊕</div>
              <div className="amulu-part amulu-part--right">
                <div className="amulu-part__sym">
                  <svg viewBox="0 0 60 42" width="52" height="36" aria-label="Cowrie shell" style={{display:'block'}}>
                    {/* Outer shell body */}
                    <ellipse cx="30" cy="21" rx="28" ry="18" fill="#ede8d0" stroke="#c4ad7a" strokeWidth="1.2"/>
                    {/* Inner lip / callus band */}
                    <ellipse cx="30" cy="21" rx="20" ry="10" fill="#d4c898"/>
                    {/* Central aperture slit */}
                    <ellipse cx="30" cy="21" rx="13" ry="4.5" fill="#1c0e06"/>
                    {/* Top teeth — pointing down into slit */}
                    <rect x="19" y="16.8" width="2" height="2.8" rx="0.6" fill="#e8dfc4"/>
                    <rect x="23" y="16.3" width="2" height="3.3" rx="0.6" fill="#e8dfc4"/>
                    <rect x="27" y="16" width="2" height="3.6" rx="0.6" fill="#e8dfc4"/>
                    <rect x="31" y="16" width="2" height="3.6" rx="0.6" fill="#e8dfc4"/>
                    <rect x="35" y="16.3" width="2" height="3.3" rx="0.6" fill="#e8dfc4"/>
                    <rect x="39" y="16.8" width="2" height="2.8" rx="0.6" fill="#e8dfc4"/>
                    {/* Bottom teeth — pointing up into slit */}
                    <rect x="19" y="22.4" width="2" height="2.8" rx="0.6" fill="#e8dfc4"/>
                    <rect x="23" y="22.4" width="2" height="3.3" rx="0.6" fill="#e8dfc4"/>
                    <rect x="27" y="22.4" width="2" height="3.6" rx="0.6" fill="#e8dfc4"/>
                    <rect x="31" y="22.4" width="2" height="3.6" rx="0.6" fill="#e8dfc4"/>
                    <rect x="35" y="22.4" width="2" height="3.3" rx="0.6" fill="#e8dfc4"/>
                    <rect x="39" y="22.4" width="2" height="2.8" rx="0.6" fill="#e8dfc4"/>
                    {/* Dorsal highlight */}
                    <ellipse cx="22" cy="14" rx="7" ry="3.5" fill="rgba(255,255,255,0.28)" transform="rotate(-18 22 14)"/>
                  </svg>
                </div>
                <div className="amulu-part__name">Economics</div>
                <div className="amulu-part__desc">Value Exchange Science</div>
              </div>
              <div className="amulu-equals">=</div>
              <div className="amulu-result">
                <div className="amulu-result__name">Eboconomics</div>
                <div className="amulu-result__desc">Amulu · Unified Exchange Science</div>
              </div>
            </div>
          </div>

          <div className="eboco-cards">
            {[
              { icon: '⟳', color: '#f0920c', title: 'Sustainable Exchange', desc: 'Economic models and meta-models rooted in balanced energy exchange that promote sustainable practices and interconnected prosperity across all knowledge fields.' },
              { icon: '◎', color: '#00c87c', title: 'Ifa Economics',        desc: 'The 256 Odu Ifa as axiomatic economic principles — governing the distribution, exchange, and transformation of value, resources, and energy.' },
              { icon: '⊛', color: '#8b5cf6', title: 'Ebo Economy',          desc: 'The practical economic systems and meta-systems that emerge when Ifa Energy Exchange Principles govern all transactions — aligning prosperity with cosmic balance.' },
              { icon: '⊕', color: '#f5c518', title: 'Ẹbọnet Technologies',  desc: 'Eboconomical systems and technologies applying the knowledge of the metascience of Ẹbọ across the full IFA Internet ecosystem.' },
            ].map((c, i) => (
              <div key={i} className="eboco-card" style={{ '--ec-color': c.color }}>
                <div className="eboco-card__icon">{c.icon}</div>
                <h4 className="eboco-card__title">{c.title}</h4>
                <p className="eboco-card__desc">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── LEARNING PATH SECTION ────────────────────────────────────────────────────

function PathSection() {
  return (
    <section className="section section--dark" id="path">
      <div className="container">
        <div className="section__header section__header--center">
          <span className="section__eyebrow section__eyebrow--amber">Understanding Ebology</span>
          <h2 className="section__title">Your Journey into Energy Exchange</h2>
          <p className="section__subtitle">
            Three foundational steps to understanding Ebology — from the core concepts of
            Ẹbọ to the full application of Eboconomical systems.
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
          <a href="https://toe.cenproject.org/ebology-the-field-of-energy-exchange/"
             target="_blank" rel="noopener noreferrer"
             className="btn btn--primary">
            Explore Ebology on TOE
          </a>
          <a href="../" className="btn btn--ghost">
            Back to IFA Internet
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
              Ebology — The Field of Energy Exchange
            </p>
            <p className="footer__tagline footer__tagline--sm">
              Part of the <a href="https://cenproject.org/" className="footer__link-inline">CENProject</a> — Consciousness-Energy Research.
            </p>
          </div>
          <nav className="footer__links">
            <a href="#definition" className="footer__link">What is Ẹbọ</a>
            <a href="#areas" className="footer__link">Key Areas</a>
            <a href="#network" className="footer__link">Ẹbọnet</a>
            <a href="#principles" className="footer__link">Principles</a>
            <a href="#eboconomics" className="footer__link">Eboconomics</a>
            <a href="#path" className="footer__link">Learn</a>
            <a href="../" className="footer__link">IFA Internet</a>
          </nav>
        </div>
        <div className="footer__bottom">
          <span className="footer__copy">
            &copy; 2026 CENProject Innovations Limited. All rights reserved.
          </span>
          <span className="footer__powered">
            The IFA Internet &mdash; Ebology Platform
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
        <AreasSection />
        <NetworkSection />
        <PrinciplesSection />
        <EboconomicsSection />
        <PathSection />
      </main>
      <Footer />
      <MobileBar />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
