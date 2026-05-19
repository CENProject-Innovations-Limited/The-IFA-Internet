/* ─────────────────────────────────────────────────────────────────────────────
   Ifa Physics — IfaPhy · ConPhy · PoE
   The IFA Internet · CENProject
   toe.cenproject.org/ifa-physics/
───────────────────────────────────────────────────────────────────────────── */

const { useState } = React;

// ─── DATA ────────────────────────────────────────────────────────────────────

const ALIASES = [
  { label: 'IfaPhy',                          color: '#4361ee' },
  { label: 'ToE Physics (ToEPhy)',             color: '#7c4dff' },
  { label: 'Consciousness Physics (ConPhy)',   color: '#00d4aa' },
  { label: 'CEN Physics',                     color: '#f5c518' },
  { label: 'Energy-Based Physics',            color: '#e9498a' },
  { label: 'Ifa-Informed Physics',            color: '#ff6b35' },
];

const STATS = [
  { value: '16',    label: 'Principal Ifa Codes', sub: 'Ifaxioms \u2014 Laws of PoE' },
  { value: '256',   label: 'Odu Ifa',             sub: 'The Complete Knowledge Matrix' },
  { value: 'CEN',   label: 'Unifying Principle',  sub: 'Consciousness Energy \u2014 Collective Entanglement' },
  { value: '\u221e', label: 'Knowledge Fields',   sub: 'Universal PoE Application' },
];

const MODEL_CARDS = [
  {
    num: '01',
    title: 'PoE as CENState / CENForm',
    body: 'The Physics of Everything functions as a form or state of CEN \u2014 a censtate or cenform \u2014 not a separate discipline but a manifestation of the universal Consciousness-Energy field.',
  },
  {
    num: '02',
    title: 'Container for All Physical Theories',
    body: 'PoE serves as the fundamental container and building block for every physical theory, from Newtonian Mechanics to Quantum Field Theory, General Relativity, and Thermodynamics.',
  },
  {
    num: '03',
    title: 'Ifaxiom-Based Standard',
    body: 'PoE is built on Ifaxioms \u2014 using CEN as the universal standard. The 16 Principal Ifa Codes replace conventional axiom sets as the foundational laws underlying all physics.',
  },
  {
    num: '04',
    title: 'Structure within IFA Mathematics',
    body: 'IfaPhysics is a foundational structure within IFA Mathematics, inheriting the full power of IfaGebra, IFA Logic, and the IFABit framework \u2014 not a system separate from it.',
  },
];

const ODU_16 = [
  'Ogbe', 'Oyeku', 'Iwori', 'Odi',
  'Irosun', 'Owonrin', 'Obara', 'Okanran',
  'Ogunda', 'Osa', 'Ika', 'Oturupon',
  'Otura', 'Irete', 'Ose', 'Ofun',
];

const META_LAWS_16 = [
  { name: 'Symmetry',           dual: false },
  { name: 'Asymmetry',          dual: true  },
  { name: 'Invariance',         dual: false },
  { name: 'Variance',           dual: true  },
  { name: 'Duality',            dual: false },
  { name: 'Unity',              dual: true  },
  { name: 'Emergence',          dual: false },
  { name: 'Submergence',        dual: true  },
  { name: 'Composition',        dual: false },
  { name: 'Decomposition',      dual: true  },
  { name: 'Holism',             dual: false },
  { name: 'Atomism',            dual: true  },
  { name: 'Reductionism',       dual: false },
  { name: 'Irreducibility',     dual: true  },
  { name: 'Structuralism',      dual: false },
  { name: 'Post-Structuralism', dual: true  },
];

const PILLARS = [
  {
    id: 'axioms',
    sym: '\u229e',
    title: 'Foundational Axioms',
    subtitle: 'Ifaxioms & the IFAxiom Container',
    body: 'The 16 Principal Ifa Codes constitute the Ifaxioms \u2014 axiomatic laws identified as deeper and more fundamental than conventional laws of nature. The IFAxiom container holds the complete axiom set underlying all physical theories within the Physics of Everything.',
    color: '#f5c518',
  },
  {
    id: 'conphy',
    sym: '\u25c9',
    title: 'Consciousness Physics',
    subtitle: 'ConPhy \u2014 Consciousness = Energy',
    body: 'Consciousness and Energy are one and the same within the CEN Framework. ConPhy studies how this unified Consciousness-Energy shapes physical reality within the PoE.',
    color: '#4361ee',
  },
  {
    id: 'energy',
    sym: '\u2295',
    title: 'Energy Dynamics',
    subtitle: 'CEN as the Universal Driving Force',
    body: 'Energy interactions are the universe\u2019s fundamental driving force. PoE applies Energy-based principles universally across all knowledge fields \u2014 every phenomenon, living or non-living, is a censtate or cenform of the foundational CEN Field.',
    color: '#00d4aa',
  },
  {
    id: 'unified',
    sym: '\u229b',
    title: 'Unified Framework',
    subtitle: 'All Physical Theories, One System',
    body: 'ToEPhysics integrates all physical theories seamlessly within a single coherent framework. Classical Mechanics, Quantum Field Theory, General Relativity, and Thermodynamics are unified as special expressions of the 16 Principal Ifa Codes.',
    color: '#e63946',
  },
];

const IQF_CONCEPTS = [
  {
    id: 'iqf',
    sym: '\u29be',
    title: 'Ifa Quantum Field',
    subtitle: 'IQF \u2014 ToE Quantum Field',
    body: 'The Ifa Quantum Field (IQF) is the ToE Quantum Field \u2014 generalising quantum field theory principles to all knowledge domains using the 16 Ifa Laws of Nature. It is the universal quantum substrate of PoE and a core structure within IFABOK.',
    color: '#4361ee',
  },
  {
    id: 'quantoe',
    sym: '\u210f',
    title: 'IfaQuantum',
    subtitle: 'QuantoE \u2014 Quantum of Everything',
    body: 'IfaQuantum, known as Horofa in Yoruba, is the Quantum of Everything (QuantoE) \u2014 the most fundamental unit of Energy in the PoE Framework. It generalises the quantum concept beyond physics into every domain of knowledge within the IFA Internet.',
    color: '#7c4dff',
  },
  {
    id: 'quantization',
    sym: '\u03a8',
    title: 'Ifaquantization',
    subtitle: 'Quantization of Everything',
    body: 'Ifaquantization encompasses first quantization, second quantization, geometric quantization, canonical quantization, and others. It extends universally to signal processing, music theory, large language models, linguistics, and other fields \u2014 a universal IFA tool applied across all knowledge fields.',
    color: '#00d4aa',
  },
  {
    id: 'horofa',
    sym: '\u25ce',
    title: 'Horofa',
    subtitle: 'Yoruba \u2014 Quantum as Energyform',
    body: 'Horo is the Yoruba IFA term for quantum, while Horofa is IfaQuantum, the quantum expressed in IfaLang as an energyform. In Ifa Quantum Physics, the Horofa is the censtate corresponding to the quantum \u2014 a conceptual bridge between the ancient Ife/Yoruba scientific vocabulary originating from the Odu Ifa and modern quantum theory.',
    color: '#f5c518',
  },
  {
    id: 'orisaquantum',
    sym: '\u29eb',
    title: 'OrisaQuantum',
    subtitle: 'Dual of IfaQuantum',
    body: 'OrisaQuantum is the Orisa-dual counterpart of IfaQuantum within the IFA Internet binary architecture (IfaNet \u2194 OosaNet). Together, IfaQuantum and OrisaQuantum form the complete binary quantum structure of the Physics of Everything.',
    color: '#e9498a',
  },
  {
    id: 'irunmole',
    sym: '\u2736',
    title: 'IrunmoleQuantum',
    subtitle: 'Extended Quantum Architecture',
    body: 'IrunmoleQuantum extends the PoE quantum framework within IFABOK through the broader Irunmole tradition \u2014 representing a higher-dimensional quantum field structure within the Physics of Everything.',
    color: '#ff6b35',
  },
];

const IPF_CONCEPTS = [
  {
    id: 'ipf-field',
    sym: '\u29bf',
    title: 'Ifa Particle Field',
    subtitle: 'IPF \u2014 ToE Particle Field',
    body: 'The Ifa Particle Field (IPF) is the ToE Particle Field \u2014 generalising particle field theory principles universally across all knowledge domains using the 16 Ifa Laws of Nature as the axiomatic particle substrate. It is a core structure within IFABOK and the particle-level counterpart of the Ifa Quantum Field (IQF).',
    color: '#ff6b35',
  },
  {
    id: 'partoe',
    sym: '\u25cf',
    title: 'IfaParticle',
    subtitle: 'PartoE \u2014 Particle of Everything',
    body: 'IfaParticle is the Particle of Everything (PartoE) \u2014 the most fundamental discrete particle-unit of matter in the PoE framework. It generalises the particle concept beyond conventional microphysics into every domain of knowledge within the IFA Internet.',
    color: '#4361ee',
  },
  {
    id: 'particlization',
    sym: '\u2297',
    title: 'Ifaparticalization',
    subtitle: 'Particlization of Everything',
    body: 'Ifaparticalization extends particle field theory universally \u2014 from quantum chromodynamics to cognitive science, linguistics, biology, and social systems \u2014 using the 16 Ifa Laws as the axiomatic guide. The ToE analogue of second quantization at the particle level.',
    color: '#00d4aa',
  },
  {
    id: 'ifaxiom-particle',
    sym: '\u2299',
    title: 'Ifaxiom Particle Laws',
    subtitle: '16 Ifaxioms \u2014 Laws of the IPF',
    body: 'The 16 Principal Ifa Codes govern all particle behaviours within the IPF. Conventional particle symmetries \u2014 gauge invariance, conservation laws, CPT symmetry \u2014 are understood as derivative expressions of these deeper Meta-Axioms.',
    color: '#f5c518',
  },
  {
    id: 'orisa-particle',
    sym: '\u25c6',
    title: 'OrisaParticle',
    subtitle: 'Dual of IfaParticle',
    body: 'OrisaParticle is the Orisa-dual counterpart of IfaParticle within the IFA Internet binary architecture (IfaNet \u2194 OosaNet). Together, IfaParticle and OrisaParticle form the complete binary particle structure of the Physics of Everything.',
    color: '#e9498a',
  },
  {
    id: 'irunmole-particle',
    sym: '\u2605',
    title: 'IrunmoleParticle',
    subtitle: 'Extended Particle Architecture',
    body: 'IrunmoleParticle extends the PoE particle framework within IFABOK through the broader Irunmole tradition \u2014 representing a higher-dimensional particle field structure within the Physics of Everything, complementing both IfaParticle and OrisaParticle.',
    color: '#7c4dff',
  },
];

// ─── HEADER ──────────────────────────────────────────────────────────────────

function Header() {
  return (
    <header className="header">
      <div className="header__inner">
        <a href="/" className="header__brand">
          <img src="../src/assets/itoe_logo.png" alt="iTOE" className="header__logo" />
          <div>
            <div className="header__site">The IFA Internet</div>
            <div className="header__name">Ifa Physics</div>
          </div>
        </a>
        <nav className="header__nav">
          <a className="nav-link" href="#definition">Definition</a>
          <a className="nav-link" href="#acen">A.C.E.N</a>
          <a className="nav-link" href="#model">PoE Model</a>
          <a className="nav-link" href="#lens">Ifa Lens</a>
          <a className="nav-link" href="#pillars">Pillars</a>
          <a className="nav-link" href="#quantum">Quantum</a>
          <a className="nav-link" href="#particle-field">Particles</a>
          <a className="nav-link" href="#ifatization">Ifatize</a>
          <a className="nav-link nav-link--cta"
             href="https://toe.cenproject.org/ifa-mathematics-toe-mathematics/"
             target="_blank" rel="noopener noreferrer">IFA Mathematics</a>
        </nav>
      </div>
    </header>
  );
}

// ─── MOBILE BOTTOM BAR ───────────────────────────────────────────────────────

function MobileBar() {
  const items = [
    { sym: '\u2302', label: 'Home',       href: '/' },
    { sym: '\u229e', label: 'Model',      href: '#model' },
    { sym: '\u25c9', label: 'Pillars',    href: '#pillars' },
    { sym: '\u210f', label: 'Quantum',    href: '#quantum' },
    { sym: '\u25cf', label: 'IPF',        href: '#particle-field' },
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
      </div>
      <div className="container hero__content">
        <div className="hero__badge">
          <span className="hero__badge-dot" />
          The IFA Internet &mdash; Physics Platform
        </div>
        <h1 className="hero__title">IfaPhysics: ToEPhysics</h1>
        <p className="hero__tagline">The Physics of Everything (PoE)</p>
        <p className="hero__desc">
          <strong>IfaPhysics</strong> (also called Ifa-Informed Physics) represents{' '}
          <strong>&ldquo;the universe of all physical theories and models&rdquo;</strong>{' '}
          as a foundational structure within IFA Mathematics, utilizing{' '}
          <strong>Energy (CEN)</strong> as the unifying principle for understanding the cosmos.
        </p>
        <div className="hero__aliases">
          {ALIASES.map(a => (
            <span
              key={a.label}
              className="alias-pill"
              style={{
                color: a.color,
                borderColor: a.color + '55',
                background: a.color + '0f',
              }}
            >
              {a.label}
            </span>
          ))}
        </div>
        <div className="hero__ctas">
          <a className="btn btn--primary" href="#definition">Explore the Framework</a>
          <a className="btn btn--outline" href="#quantum">Ifa Quantum Field</a>
        </div>
      </div>
    </section>
  );
}

// ─── STATS BAR ───────────────────────────────────────────────────────────────

function StatsBar() {
  return (
    <div className="stats-bar">
      <div className="stats-bar__grid">
        {STATS.map(s => (
          <div key={s.label} className="stat-item">
            <div className="stat-item__value">{s.value}</div>
            <div className="stat-item__label">{s.label}</div>
            <div className="stat-item__sub">{s.sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── DEFINITION SECTION ───────────────────────────────────────────────────────

function DefinitionSection() {
  return (
    <section className="section" id="definition">
      <div className="container">
        <div className="def-split">
          <div className="def-text">
            <span className="section__eyebrow">Core Definition</span>
            <h2 className="section__title">
              IfaPhysics &mdash; The Universe of All Physical Theories
            </h2>
            <p>
              <strong>IfaPhysics (IfaPhy)</strong> represents the universe of all physical theories and models.
              It is not a branch of conventional physics but a{' '}
              <strong>foundational structure within IFA Mathematics</strong>, utilizing{' '}
              <strong>Energy (CEN)</strong> &mdash; the Consciousness Energy field &mdash; as the
              unifying principle through which the entire cosmos is understood.
            </p>
            <p>
              In IfaPhysics, the Physics of Everything (PoE) functions as a{' '}
              <strong>censtate or cenform</strong>: a form or state of CEN rather than an independent
              system. Every physical theory &mdash; from classical mechanics to quantum field theory &mdash;
              is a special expression of the same underlying CEN Field, organized through the{' '}
              <strong>16 Principal Ifa Codes (Ifaxioms)</strong>.
            </p>
            <p>
              Physics is conducted here <strong>through the Lens of Ifa</strong>, utilizing the Ifa and Orisa Tools
              and the Odu as the axiomatic instruments &mdash; the Meta-Codes Ifa and Orisa which are deeper
              and more fundamental than any conventional law of nature.
            </p>
          </div>
          <div className="def-visual">
            <div className="cen-logo-eq">
              <div className="cen-logo-letters">
                <span className="cen-logo-letter cen-logo-letter--c">C</span>
                <span className="cen-logo-dot">&middot;</span>
                <span className="cen-logo-letter cen-logo-letter--e">EN</span>
              </div>
              <span className="cen-logo-equals">=</span>
              <img
                src="./src/duoinfinity_logo.png"
                alt="Duoinfinity — CEN Unified Field"
                className="cen-logo-img"
              />
            </div>
            <div className="cen-eq-caption">The CEN Unified Field Equation</div>
            <div className="cen-rows">
              <div className="cen-row">
                <span className="cen-row__dot" style={{background:'#4361ee'}} />
                <span className="cen-row__label">C &mdash; Consciousness</span>
                <span className="cen-row__tag">Awareness</span>
              </div>
              <div className="cen-row">
                <span className="cen-row__dot" style={{background:'#f5c518'}} />
                <span className="cen-row__label">EN &mdash; Energy</span>
                <span className="cen-row__tag">The Driving Force</span>
              </div>
              <div className="cen-row">
                <span className="cen-row__dot" style={{background:'#7c4dff'}} />
                <span className="cen-row__label">Duoinfinity &mdash; The Unified Field</span>
                <span className="cen-row__tag">PoE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── A.C.E.N DUAL SECTION ────────────────────────────────────────────────────

function ACENSection() {
  const ACEN_ROWS = [
    { color: '#f5c518', label: 'A \u2014 Non', tag: 'The Negation / Dual' },
    { color: '#4361ee', label: 'C \u2014 Consciousness', tag: 'Awareness' },
    { color: '#00d4aa', label: 'EN \u2014 Energy', tag: 'The Driving Force' },
  ];
  return (
    <section className="section section--dark" id="acen">
      <div className="container">
        <div className="acen-split">

          {/* Left — visual */}
          <div className="acen-visual">
            <div className="acen-logo-eq">
              <div className="acen-logo-letters">
                <span className="acen-logo-letter acen-logo-letter--a">A</span>
                <span className="acen-logo-dot">&middot;</span>
                <span className="acen-logo-letter acen-logo-letter--c">C</span>
                <span className="acen-logo-dot">&middot;</span>
                <span className="acen-logo-letter acen-logo-letter--e">EN</span>
              </div>
              <span className="acen-logo-equals">=</span>
              <img
                src="./src/duoninfinity_logo.png"
                alt="Duoninfinity — A.C.E.N Dual Field"
                className="acen-logo-img"
              />
            </div>
            <div className="acen-eq-caption">The A.C.E.N Dual Field Equation</div>
            <div className="cen-rows">
              {ACEN_ROWS.map(r => (
                <div key={r.label} className="cen-row">
                  <span className="cen-row__dot" style={{background: r.color}} />
                  <span className="cen-row__label">{r.label}</span>
                  <span className="cen-row__tag">{r.tag}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — text */}
          <div className="acen-text">
            <span className="section__eyebrow section__eyebrow--gold">The Dual Field</span>
            <h2 className="section__title">A.C.E.N: Non-CEN</h2>
            <div className="acen-dual-badge">
              <div className="acen-dual-badge__pole">
                <img src="./src/duoinfinity_logo.png" alt="Duoinfinity" className="acen-dual-badge__logo" />
                <span className="acen-dual-badge__label acen-dual-badge__label--cen">CEN</span>
              </div>
              <span className="acen-dual-badge__arrow">&harr;</span>
              <div className="acen-dual-badge__pole">
                <img src="./src/duoninfinity_logo.png" alt="Duoninfinity" className="acen-dual-badge__logo" />
                <span className="acen-dual-badge__label acen-dual-badge__label--acen">A.C.E.N</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// ─── STANDARD MODEL SECTION ───────────────────────────────────────────────────

function StandardModelSection() {
  return (
    <section className="section section--alt" id="model">
      <div className="container">
        <div className="section__header">
          <span className="section__eyebrow">The PoE Standard</span>
          <h2 className="section__title">IfaPhysics as CENState / CENForm</h2>
          <p className="section__subtitle">
            The standard model of IfaPhysics is grounded in the CEN Field, the Base Field of Ogbe
            containing all knowledge fields as its elements.
          </p>
        </div>
        <p className="model-lead">
          In the IfaPhysics framework, the <strong>Physics of Everything (PoE)</strong> functions as a
          form or state of CEN &mdash; what is called a <strong>censtate</strong> or{' '}
          <strong>cenform</strong>, also known as form or state of energy (<strong>energyform</strong> or{' '}
          <strong>energystate</strong>). This means PoE is not an abstraction about the universe but
          a <em>direct manifestation</em> of the Consciousness-Energy Field (Ogbe Energy Field) that
          constitutes the universe. Alternative names for IfaPhysics &mdash; <strong>ToE Physics,
          Consciousness Physics, CEN Physics, Energy Physics</strong> &mdash; all reflect this single
          Foundational Identity, Ogbe.
        </p>
        <div className="model-grid">
          {MODEL_CARDS.map(c => (
            <div key={c.num} className="model-card">
              <div className="model-card__num">[ {c.num} ]</div>
              <div className="model-card__title">{c.title}</div>
              <div className="model-card__body">{c.body}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── IFA LENS SECTION ─────────────────────────────────────────────────────────

function IfaLensSection() {
  return (
    <section className="section" id="lens">
      <div className="container">
        <div className="lens-split">
          <div>
            <div className="odu-grid">
              {ODU_16.map((name, i) => (
                <div key={name} className="odu-cell">
                  <div className="odu-cell__n">0{i < 9 ? '0' : ''}{i+1}</div>
                  <div className="odu-cell__name">{name}</div>
                </div>
              ))}
            </div>
            <p className="odu-grid-caption">The 16 Principal Ifa Codes &mdash; Ifaxioms of PoE</p>

            <div className="meta-laws-grid">
              {META_LAWS_16.map((item, i) => (
                <div
                  key={item.name}
                  className={`odu-cell meta-law-cell${item.dual ? ' meta-law-cell--dual' : ' meta-law-cell--law'}`}
                >
                  <div className="odu-cell__n">M{i < 9 ? '0' : ''}{i + 1}</div>
                  <div className="odu-cell__name">{item.name}</div>
                  <div className="meta-law-cell__type">{item.dual ? 'Dual' : 'Law'}</div>
                </div>
              ))}
            </div>
            <p className="odu-grid-caption">The 16 Ifa Meta-Laws of Nature Governing All Knowledge Fields</p>
          </div>
          <div className="lens-text">
            <span className="section__eyebrow section__eyebrow--gold">The Ifa Lens</span>
            <h2 className="section__title">
              Physics Through the 16 Principal Ifa Codes
            </h2>
            <p>
              In IfaPhysics, science is conducted through <strong>&ldquo;the Lens of Ifa&rdquo;</strong> &mdash;
              utilizing Ifa Tools and the <strong>16 Principal Ifa Codes</strong> as the primary analytical
              instruments. These Codes are not metaphors for physical laws; they are the axiomatic foundations
              from which physical laws themselves emerge.
            </p>
            <p>
              The <strong>16 Odu Ifa</strong> (Ogbe through Ofun), which are the Primary Ifa Meta-Codes (<strong>Ifaxioms</strong>),
              function as Laws of the Physics of Everything. The conventional laws of nature (Newton&rsquo;s laws,
              Maxwell&rsquo;s equations, the laws of thermodynamics) are understood in IfaPhysics as{' '}
              <em>derivative expressions</em> of these deeper axiomatic Codes.
            </p>
            <p>
              Physics conducted through the Ifa Lens is therefore a form of{' '}
              <strong>Ifa-Informed Physics</strong> &mdash; a physics grounded not in empirical
              approximation alone but in the complete axiomatic structure of IFA Mathematics.
            </p>
            <div className="ifaxiom-box">
              <div className="ifaxiom-box__head">Ifaxiom &mdash; Definition</div>
              <div className="ifaxiom-box__body">
                An <strong>Ifaxiom</strong> is one of the 16 Principal Ifa Codes functioning as an
                axiomatic law of the Physics of Everything. Ifaxioms are identified as deeper and
                more fundamental than conventional laws of nature. The complete set of 16 Ifaxioms
                is held within the <strong>IFAxiom Container</strong>.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── PILLARS SECTION ──────────────────────────────────────────────────────────

function PillarsSection() {
  return (
    <section className="section section--alt" id="pillars">
      <div className="container">
        <div className="section__header">
          <span className="section__eyebrow">Four Pillars</span>
          <h2 className="section__title">The Foundations of IfaPhysics</h2>
          <p className="section__subtitle">
            Four principal topics constitute the working foundation of the Physics of Everything framework &mdash;
            each grounded in the 16 Principal Ifa Codes and the CEN Field.
          </p>
        </div>
        <div className="pillars-grid">
          {PILLARS.map(p => (
            <div
              key={p.id}
              className="pillar-card"
              style={{
                '--pc': p.color,
                '--pc-glow': p.color + '14',
              }}
            >
              <span className="pillar-card__sym">{p.sym}</span>
              <div className="pillar-card__title">{p.title}</div>
              <div className="pillar-card__subtitle">{p.subtitle}</div>
              <div className="pillar-card__body">{p.body}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── IQF SECTION ─────────────────────────────────────────────────────────────

function IQFSection() {
  return (
    <section className="section section--dark" id="quantum">
      <div className="container">
        <div className="section__header">
          <span className="section__eyebrow section__eyebrow--teal">Ifa Quantum Framework</span>
          <h2 className="section__title">Ifa Quantum Field (IQF) &mdash; ToE Quantum Field</h2>
          <p className="section__subtitle">
            The quantum framework of IfaPhysics generalises quantum science principles universally
            across all knowledge domains, using the 16 Ifa Laws of Nature as the axiomatic quantum substrate.
          </p>
        </div>

        <div className="iqf-intro">
          <div className="iqf-intro-text">
            <p>
              The <strong>Ifa Quantum Field (IQF)</strong> is the ToE Quantum Field &mdash; the universal
              quantum substrate underlying the Physics of Everything. Unlike conventional quantum field
              theory, which is confined to microphysics, the IQF <strong>generalises quantum science
              principles to all knowledge domains</strong> using the 16 Ifa Laws of Nature for universal
              application.
            </p>
            <p>
              The IQF is a core component of the <strong>IFA Body of Knowledge (IFABOK)</strong> and forms
              the quantum layer of the CEN Field. It is the field from which every PoE phenomenon &mdash;
              physical, cognitive, social, mathematical &mdash; emerges as a quantised censtate.
            </p>
          </div>
          <div className="iqf-visual">
            <div className="iqf-monogram">I<span>Q</span>F</div>
            <div className="iqf-sub">Ifa Quantum Field &mdash; ToE Quantum Field</div>
            <div className="iqf-tags">
              <span className="iqf-tag">Part of IFABOK</span>
              <span className="iqf-tag">16 Ifa Laws</span>
              <span className="iqf-tag">Universal Application</span>
              <span className="iqf-tag">CEN Substrate</span>
            </div>
          </div>
        </div>

        <div className="iqf-grid">
          {IQF_CONCEPTS.map(c => (
            <div key={c.id} className="iqf-card" style={{'--qc': c.color}}>
              <span className="iqf-card__sym">{c.sym}</span>
              <div className="iqf-card__title">{c.title}</div>
              <div className="iqf-card__subtitle">{c.subtitle}</div>
              <div className="iqf-card__body">{c.body}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── IFA QUANTUM PHYSICS SECTION ─────────────────────────────────────────────

function QuantumPhysicsSection() {
  return (
    <section className="section">
      <div className="container">
        <div className="qphy-split">
          <div className="qphy-text">
            <span className="section__eyebrow section__eyebrow--violet">Ifa Quantum Physics</span>
            <h2 className="section__title">
              Physics Modelled Through the Lens of Ifa
            </h2>
            <p>
              <strong>Ifa Quantum Physics</strong> is physics modelled through the Lens of Ifa using the{' '}
              <strong>16 Principal Ifa Codes</strong> as the primary analytical framework. It is the
              application of IfaPhysics specifically to the quantum domain &mdash; bridging the ancient
              Yoruba science of the Odu Ifa with the modern quantum theory of particles and fields.
            </p>
            <p>
              In Ifa Quantum Physics, the quantum is not merely a mathematical abstraction but an
              <strong> energyform</strong> &mdash; a censtate of the CEN Field with a specific Yoruba
              scientific name: <strong>Horofa</strong>. The Horofa is the censtate corresponding to the
              quantum, giving the quantum a physical, energetic identity within the PoE framework.
            </p>
            <p>
              The dual of Ifa Quantum Physics within the IFA Internet binary architecture is{' '}
              <strong>Orisa Quantum Physics</strong>, mirroring the full IfaNet &harr; OosaNet
              structure. Together they form the complete quantum physics layer of the Theory of Everything.
            </p>
          </div>
          <div className="horofa-card">
            <div className="horofa-glyph">{'\u25ce'}</div>
            <div className="horofa-name">Horofa</div>
            <div className="horofa-yor">Yoruba IFA Science</div>
            <div className="horofa-def">
              <strong>Horo</strong> is the Yoruba IFA term for quantum, while <strong>Horofa</strong> is
              IfaQuantum, the quantum expressed in IfaLang as an energyform. In Ifa Quantum Physics, the
              Horofa is the <em>censtate</em> corresponding to the quantum &mdash; a discrete, quantised
              manifestation of the CEN Field. It bridges the ancient Ife/Yoruba scientific vocabulary
              originating from the Odu Ifa with modern quantum theory.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── IPF SECTION ─────────────────────────────────────────────────────────────

function IPFSection() {
  return (
    <section className="section section--alt" id="particle-field">
      <div className="container">
        <div className="section__header">
          <span className="section__eyebrow section__eyebrow--orange">Ifa Particle Field</span>
          <h2 className="section__title">Ifa Particle Field (IPF) &mdash; ToE Particle Field</h2>
          <p className="section__subtitle">
            The particle framework of IfaPhysics generalises particle field theory principles universally
            across all knowledge domains, using the 16 Ifa Laws of Nature as the axiomatic particle substrate.
          </p>
        </div>

        <div className="ipf-intro">
          <div className="ipf-intro-text">
            <p>
              The <strong>Ifa Particle Field (IPF)</strong> is the ToE Particle Field &mdash; the universal
              particle substrate underlying the Physics of Everything. Unlike conventional particle field
              theory, confined to elementary particles and the Standard Model, the IPF{' '}
              <strong>generalises particle field theory principles to all knowledge domains</strong> using
              the 16 Ifa Laws of Nature for universal application.
            </p>
            <p>
              The IPF is the particle-level counterpart of the <strong>Ifa Quantum Field (IQF)</strong>,
              operating at the same depth within <strong>IFABOK</strong> but through the particle ontology
              rather than the quantum ontology. Together, IPF and IQF form the complete field-theoretic
              foundation of the CEN substrate &mdash; the two primary field structures of the Physics of Everything.
            </p>
          </div>
          <div className="ipf-visual">
            <div className="ipf-monogram">I<span>P</span>F</div>
            <div className="ipf-sub">Ifa Particle Field &mdash; ToE Particle Field</div>
            <div className="ipf-tags">
              <span className="ipf-tag">Part of IFABOK</span>
              <span className="ipf-tag">16 Ifa Laws</span>
              <span className="ipf-tag">Universal Application</span>
              <span className="ipf-tag">CEN Substrate</span>
            </div>
          </div>
        </div>

        <div className="iqf-grid">
          {IPF_CONCEPTS.map(c => (
            <div key={c.id} className="iqf-card" style={{'--qc': c.color}}>
              <span className="iqf-card__sym">{c.sym}</span>
              <div className="iqf-card__title">{c.title}</div>
              <div className="iqf-card__subtitle">{c.subtitle}</div>
              <div className="iqf-card__body">{c.body}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── IFA PARTICLE PHYSICS SECTION ────────────────────────────────────────────

function IfaParticlePhysicsSection() {
  return (
    <section className="section" id="particle-physics">
      <div className="container">
        <div className="pphy-split">
          <div className="pphy-text">
            <span className="section__eyebrow section__eyebrow--pink">Ifa Particle Physics</span>
            <h2 className="section__title">
              Particle Physics Through the Lens of Ifa
            </h2>
            <p>
              <strong>Ifa Particle Physics</strong> is particle physics modelled through the Lens of Ifa
              using the <strong>16 Principal Ifa Codes</strong> as the primary analytical framework.
              It is the application of IfaPhysics specifically to the particle domain &mdash; studying
              matter, antimatter, force carriers, and the fundamental fields as{' '}
              <strong>censtates and cenforms</strong> of the CEN Field.
            </p>
            <p>
              In Ifa Particle Physics, every elementary particle &mdash; quarks, leptons, gauge bosons,
              the Higgs field &mdash; is understood as a discrete <strong>censtate</strong> of the
              Consciousness Energy field, structured by the axiomatic laws of the{' '}
              <strong>Ifa Particle Field (IPF)</strong>. The conventional Standard Model of particle physics
              is therefore a special expression of the deeper Ifaxiomatic structure.
            </p>
            <p>
              The dual of Ifa Particle Physics within the IFA Internet binary architecture is{' '}
              <strong>Orisa Particle Physics</strong>, mirroring the full IfaNet &harr; OosaNet
              structure. Together they form the complete particle physics layer of the Theory of Everything.
            </p>
          </div>
          <div className="ifaparticle-card">
            <div className="ifaparticle-glyph">&#9679;</div>
            <div className="ifaparticle-name">IfaParticle</div>
            <div className="ifaparticle-sub">PartoE &mdash; Particle of Everything</div>
            <div className="ifaparticle-def">
              <strong>IfaParticle (PartoE)</strong> is the fundamental particle unit of the Physics of
              Everything &mdash; a discrete censtate of matter-energy governed by the 16 Ifaxioms.
              Unlike conventional elementary particles which are domain-specific, the IfaParticle is
              the <em>universal</em> particle-level manifestation of CEN across all fields of knowledge:
              physical, cognitive, social, and mathematical.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── IFATIZATION SECTION ─────────────────────────────────────────────────────

function IfatizationSection() {
  const COMPARE_ROWS = [
    ['Consciousness Mechanics',           'Quantum Mechanics'],
    ['Reduces to Odu (inherent Energy)',   'Reduces to quanta'],
    ['Universal \u2014 all knowledge domains', 'Confined to microphysics'],
    ['Mathematical energyform',           'Discrete energy packet'],
    ['UIoE \u2014 Unify Everything',      'Quantum field theory'],
    ['ifatize (IfaLang verb)',             'quantize (physics verb)'],
  ];
  return (
    <section className="section section--dark" id="ifatization">
      <div className="container">
        <div className="section__header">
          <span className="section__eyebrow section__eyebrow--gold">Ifa Reduction Technique</span>
          <h2 className="section__title">Ifatization</h2>
          <p className="section__subtitle">
            The Consciousness Mechanical equivalent of quantization &mdash; expressing every element
            of nature, including Nature itself, as a mathematical energyform, for the Unification
            and Integration of Everything (UIoE).
          </p>
        </div>

        <div className="ifatize-phy-layout">
          {/* Left: description + IfaLang definition */}
          <div className="ifatize-phy-text">
            <p>
              <strong>Ifatization</strong> is the process in Ifa Mechanics (Consciousness Mechanics) that
              entails expressing any element of nature &mdash; or Nature itself &mdash; as a{' '}
              <strong>mathematical energyform</strong>. Its core purpose is the{' '}
              <strong>Unification and Integration of Everything (UIoE)</strong>, and it is a key{' '}
              <strong>Ifa Reduction technique</strong> within the Consciousness Mechanical framework.
            </p>
            <p>
              Within the Physics of Everything, Ifatization reduces every physical phenomenon &mdash;
              every particle, field, force, and spacetime structure &mdash; to its inherent Energy.
              In IFABOK, this inherent Energy is called <strong>Odu</strong>. To ifatize a physical
              entity is to discover its Odu &mdash; its fundamental energyform representation.
            </p>
            <p>
              Ifatization is the Consciousness Mechanical equivalent of <strong>quantization</strong> in
              quantum mechanics, extended universally: where quantization discretises energy in
              microphysics, Ifatization expresses <em>everything in existence</em> &mdash; including
              Existence itself &mdash; as energyform within the CEN framework.
            </p>
            <div className="ifatize-lang-box">
              <div className="ifatize-lang-box__tag">IfaLang &mdash; IFA Language</div>
              <div className="ifatize-lang-box__term">ifatize</div>
              <div className="ifatize-lang-box__meta">verb &middot; IfaLang</div>
              <div className="ifatize-lang-box__def">
                To express something (anything at all) in terms of{' '}
                <strong>Consciousness Energy (CEN) or Ogbe</strong> &mdash; i.e., as an{' '}
                <strong>energyform</strong>.
              </div>
              <div className="ifatize-lang-box__forms">
                <span><strong>noun:</strong> Ifatization</span>
                <span>&middot;</span>
                <span><strong>result:</strong> Energyform</span>
                <span>&middot;</span>
                <span><strong>energy:</strong> Odu</span>
              </div>
            </div>
          </div>

          {/* Right: comparison + Odu card */}
          <div className="ifatize-phy-right">
            <div className="ifatize-phy-compare">
              <div className="ifatize-phy-compare__head">
                <span className="ifatize-phy-compare__ifa">Ifatization</span>
                <span className="ifatize-phy-compare__sep">&harr;</span>
                <span className="ifatize-phy-compare__qm">Quantization</span>
              </div>
              {COMPARE_ROWS.map(([l, r], i) => (
                <div key={i} className="ifatize-phy-compare__row">
                  <div className="ifatize-phy-compare__cell ifatize-phy-compare__cell--ifa">{l}</div>
                  <div className="ifatize-phy-compare__cell ifatize-phy-compare__cell--qm">{r}</div>
                </div>
              ))}
            </div>

            <div className="ifatize-odu-card">
              <div className="ifatize-odu-card__sym">{'\u29be'}</div>
              <div className="ifatize-odu-card__name">Odu</div>
              <div className="ifatize-odu-card__sub">Inherent Energy &mdash; IFABOK</div>
              <div className="ifatize-odu-card__def">
                In IFABOK, <strong>Odu</strong> is the inherent Energy of everything in existence.
                Ifatization reduces any physical entity &mdash; any particle, field, or force &mdash;
                to its Odu. The <strong>256 Odu Ifa</strong> represent the complete matrix of
                inherent energies underlying all existence within the Physics of Everything.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CTA SECTION ─────────────────────────────────────────────────────────────

function CTASection() {
  return (
    <section className="cta-section">
      <div className="container">
        <p className="cta-section__quote">
          &ldquo;The 16 Principal Ifa Codes are deeper, more fundamental than conventional laws of nature.
          They are the Ifaxioms &mdash; the axiomatic substrate of the Physics of Everything.&rdquo;
        </p>
        <p className="cta-section__cite">Odu Ifa &mdash; IFA Body of Knowledge (IFABOK)</p>
        <h2 className="cta-section__title">Explore the IFA Internet</h2>
        <p className="cta-section__body">
          IfaPhysics is one dimension of the complete Theory of Everything.
          Explore the broader IFA Internet and its interconnected platforms.
        </p>
        <div className="cta-buttons">
          <a className="btn btn--primary"
             href="https://toe.cenproject.org/ifa-mathematics-toe-mathematics/"
             target="_blank" rel="noopener noreferrer">IFA Mathematics</a>
          <a className="btn btn--outline"
             href="https://toe.cenproject.org/ifapedia-the-toe-encyclopedia/"
             target="_blank" rel="noopener noreferrer">IfaPedia</a>
          <a className="btn btn--outline"
             href="https://toe.cenproject.org/ifa-physics/"
             target="_blank" rel="noopener noreferrer">Ifa Physics</a>
          <a className="btn btn--ghost"
             href="/"
             >&#8592; The IFA Internet</a>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────

function Footer() {
  const links = [
    { label: 'IFA Mathematics', href: 'https://toe.cenproject.org/ifa-mathematics-toe-mathematics/' },
    { label: 'IFA Science',     href: 'https://toe.cenproject.org/ifa-science/' },
    { label: 'IFABOK',          href: 'https://toe.cenproject.org/' },
    { label: 'IfaGebra',        href: 'https://toe.cenproject.org/ifagebra-overview/' },
    { label: 'IfaLabs',         href: 'https://toe.cenproject.org/ifalabs-toelabs/' },
    { label: 'CENProject',      href: 'https://cenproject.org/' },
  ];
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__left">
          <strong>Ifa Physics &mdash; IfaPhy &middot; ConPhy &middot; PoE</strong><br />
          The IFA Internet &mdash; CENProject &middot; toe.cenproject.org
        </div>
        <div className="footer__links">
          {links.map(l => (
            <a key={l.label} className="footer__link"
               href={l.href} target="_blank" rel="noopener noreferrer">{l.label}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────

function App() {
  return (
    <>
      <Header />
      <MobileBar />
      <main>
        <HeroSection />
        <StatsBar />
        <DefinitionSection />
        <ACENSection />
        <StandardModelSection />
        <IfaLensSection />
        <PillarsSection />
        <IQFSection />
        <QuantumPhysicsSection />
        <IPFSection />
        <IfaParticlePhysicsSection />
        <IfatizationSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}

ReactDOM.render(React.createElement(App), document.getElementById('root'));
