/* ─────────────────────────────────────────────────────────────────────────────
   Ifa Category Theory — IFACAT · TOECAT
   The IFA Internet · CENProject
   ifainternet.org/ifa-category-theory/
───────────────────────────────────────────────────────────────────────────── */

const { useState } = React;

// ─── DATA ────────────────────────────────────────────────────────────────────

const ALIASES = [
  { label: 'IFACAT — Ifa Category Theory',             color: '#f5c518' },
  { label: 'TOECAT — ToE Category Theory',             color: '#3b9eff' },
  { label: 'Ifa System Theory',                         color: '#8b5cf6' },
  { label: 'Ifa Structural Mathematics',                color: '#00c87c' },
  { label: 'General Ifa-Orisa System for Everything',   color: '#f0920c' },
];

const STATS = [
  { value: '256',   label: 'Ifa Objects',      sub: 'Odu Ifa as Mathematical Objects'    },
  { value: '16',    label: 'Principal Objects', sub: 'The Core Odu Category'              },
  { value: 'CEN',   label: 'Base Category',     sub: 'Innermost Universe · Base Reality'  },
  { value: 'Amulu', label: 'Composition Law',   sub: 'The Ifa Composition Operator'       },
];

const ELEMENTS = [
  {
    num: '01', sym: '◉', color: '#f5c518',
    title: 'Ifa Objects',
    sub: 'The 256 Odu Ifa',
    body: 'In IFACAT, the mathematical objects are the 256 Odu Ifa — the axiomatic building blocks of all existence. Each Odu is an Ifa Object: a node in the Universal Category through which all knowledge, energy, and reality are structured. The 16 Principal Odu form the core object set of the base category.',
  },
  {
    num: '02', sym: '→', color: '#3b9eff',
    title: 'Ifa Morphisms',
    sub: 'Àṣẹ Arrows',
    body: 'Ifa Morphisms are the Àṣẹ Arrows — the structured transformations and energy flows between Ifa Objects (Odu). Every interaction, exchange, or transformation between Odu is an Ifa Morphism. They carry Àṣẹ (divine energy-authority) and define the full relational structure of the IFACAT universe.',
  },
  {
    num: '03', sym: '⊕', color: '#f0920c',
    title: 'Amulu (Composition)',
    sub: 'The Ifa Composition Operator',
    body: 'Amulu is the composition law of IFACAT — the operator (⊕) that combines two Ifa Morphisms into a third. The Amulu Table records all compositions of the Odu Ifa, exists in two forms (Major and Minor), and encodes whether composition is commutative or non-commutative for each pair of Odu.',
  },
  {
    num: '04', sym: '𝟙', color: '#00c87c',
    title: 'Ifa Identity',
    sub: 'The Identity Morphism',
    body: 'Every Ifa Object (Odu) has an identity morphism — the Ifa Identity — which maps the Odu to itself without transformation. The identity law holds that composing any morphism with the identity produces the same morphism. In IFABOK, Ifa Identity is the self-resonance of an Odu in its pure, unexchanged state.',
  },
  {
    num: '05', sym: 'F', color: '#8b5cf6',
    title: 'Ifa Functors',
    sub: 'Mappings Between Ifacats',
    body: 'Ifa Functors are structure-preserving mappings between ifacats (Ifa categories). They translate Ifa Objects and Morphisms from one knowledge domain to another while preserving the composition law (Amulu). Every cross-domain connection on the IFA Internet is an Ifa Functor at work.',
  },
  {
    num: '06', sym: 'η', color: '#e9498a',
    title: 'Ifa Natural Transformations',
    sub: 'Mappings Between Ifa Functors',
    body: 'Ifa Natural Transformations are systematic mappings between Ifa Functors — the highest level of structural correspondence in IFACAT. They ensure that all translations between knowledge domains are coherent and consistent across the full network of ifacats, grounded in the 256 Odu Ifa.',
  },
];

const AMULU_FORMS = [
  {
    id: 'major', sym: '⊕', color: '#f0920c',
    title: 'Amulu Major',
    sub: 'The Full Composition Table',
    body: 'The Amulu Major is the full Ifa Composition Table — the complete record of all pairwise compositions of the 256 Odu Ifa. For each pair (Odu A, Odu B), the table records the resulting Odu C = A ⊕ B. The Amulu Major is the Master Composition Matrix of IFACAT, encoding the complete structural algebra of the entire Ifa System.',
    check: 'Checks full commutativity across all 256 Odu pairs — whether A ⊕ B = B ⊕ A for every Odu combination. Non-commutative entries reveal asymmetric energy exchange relationships between Odu, whose interpretation falls within the domain of Ifa Hermeneutics.',
  },
  {
    id: 'minor', sym: '⊗', color: '#3b9eff',
    title: 'Amulu Minor',
    sub: 'The Principal Composition Table',
    body: 'The Amulu Minor is the composition table of the 16 Principal Odu — the reduced, foundational form of the Amulu Table. It captures the core structural algebra of the 16 Principal Ifa Codes and serves as the operational basis for IFACAT practice, Ifa Hermeneutics, and all applied ebological computations on the IFA Internet.',
    check: 'Checks commutativity within the 16 Principal Odu. The Hermeneutic interpretation of non-commutative results reveals the directional nature of energy exchange between principal forces — encoding which Odu leads and which follows in a given exchange.',
  },
];

const IFACATS = [
  { sym: '⚛',  color: '#3b9eff', title: 'Physics ifacat',        sub: 'IfaPhysics Category',       body: 'The category of all physical theories, models, and transformations — structured through the 256 Odu as physical laws and the CEN field as the base object of all physical reality.' },
  { sym: '∑',  color: '#f5c518', title: 'Mathematics ifacat',    sub: 'IfaMathematics Category',    body: 'The category of all mathematical structures, axioms, and transformations — grounded in IFA Mathematics as the universal axiomatic system of the IFA Internet.' },
  { sym: 'Ẹ',  color: '#f0920c', title: 'Ebology ifacat',        sub: 'Energy Exchange Category',   body: 'The category governing all energy exchange, Ẹbọ interactions, and economic transformations — connecting human, nature, and spirit through structured Àṣẹ morphisms.' },
  { sym: '⬡',  color: '#00c87c', title: 'Nature ifacat',         sub: 'Orisa Nature Category',      body: 'The category of all natural systems, ecological relationships, and Orisa forces — where every natural process is an Ifa Morphism between environmental Odu Objects.' },
  { sym: 'Ψ',  color: '#8b5cf6', title: 'Consciousness ifacat',  sub: 'CEN Consciousness Category', body: 'The category of all consciousness states, mental transformations, and awareness fields — with the CEN (Consciousness-Energy-Nature) field as the terminal object of all categories.' },
  { sym: '⟳',  color: '#e9498a', title: 'Time ifacat',           sub: 'Ifa Temporal Category',      body: 'The category of all temporal structures, cycles, and transformations — where Odu Ifa encode the axiomatic time-laws governing all rhythms of existence across all dimensions.' },
];

const PRINCIPLES = [
  {
    sym: '⊕', color: '#f0920c',
    title: 'The Amulu (Composition) Principle',
    sub: 'Associativity of Ifa Exchange',
    body: 'All Ifa Morphisms (Àṣẹ Arrows) satisfy associativity under Amulu composition: (f ⊕ g) ⊕ h = f ⊕ (g ⊕ h). This is the foundational law of the Ifa System — that all chains of energy exchange and transformation are order-independent in their grouping, governed by the axiomatic structure of the Odu Ifa.',
  },
  {
    sym: '𝟙', color: '#00c87c',
    title: 'The Identity Principle',
    sub: 'Self-Resonance of Every Odu',
    body: 'Every Ifa Object (Odu) possesses a unique identity morphism representing its pure self-state. For any morphism f: A → B, the identity laws hold: id_B ⊕ f = f and f ⊕ id_A = f. In IFABOK, this encodes the principle that every Odu is complete and whole in itself before any exchange occurs.',
  },
  {
    sym: '⇔', color: '#3b9eff',
    title: 'The Commutativity Principle',
    sub: 'Possible or Impossible Exchange',
    body: 'In IFACAT, commutativity of composition (A ⊕ B = B ⊕ A) is not guaranteed — it must be checked via the Amulu Table. When commutativity holds, the energy exchange between two Odu is symmetric. When it does not, the exchange is directional, encoding an asymmetric relationship that Ifa Hermeneutics must interpret.',
  },
  {
    sym: 'F', color: '#8b5cf6',
    title: 'The Functor Principle',
    sub: 'Structure-Preserving Mappings',
    body: 'Ifa Functors preserve the entire categorical structure — objects, morphisms, identity, and composition — when mapping between ifacats. A Functor F: C → D satisfies F(g ⊕ f) = F(g) ⊕ F(f) and F(id_A) = id_{F(A)}. This ensures every cross-domain translation on the IFA Internet is structurally faithful.',
  },
  {
    sym: 'η', color: '#e9498a',
    title: 'The Natural Transformation Principle',
    sub: 'Coherence Across All Ifacats',
    body: 'A Natural Transformation η: F ⟹ G between Ifa Functors F, G: C → D assigns to each Ifa Object A a morphism η_A: F(A) → G(A) such that all naturality squares commute. This ensures the global coherence of the IFACAT universe — that all structural correspondences between knowledge domains are consistent.',
  },
  {
    sym: '◉', color: '#f5c518',
    title: 'The Universal Property Principle',
    sub: 'Odu as Universal Constructs',
    body: 'Many Ifa Objects possess universal properties — uniquely characterized (up to unique isomorphism) by their relationships to all other objects in the category. The 16 Principal Odu each satisfy universal properties within IFACAT, making them the axiomatic anchors of the entire Ifa System structure.',
  },
];

const STEPS = [
  {
    num: '01', color: '#f5c518',
    title: 'Foundations: Objects & Morphisms',
    body: 'Begin with the core building blocks of IFACAT — Ifa Objects (the 256 Odu Ifa) and Ifa Morphisms (Àṣẹ Arrows). Understand how every entity in existence is an Ifa Object and every transformation is an Ifa Morphism, governed by the Amulu composition law.',
  },
  {
    num: '02', color: '#3b9eff',
    title: 'The Amulu Table & Commutativity',
    body: 'Study the Amulu Table in its two forms — Major and Minor — learning to read, interpret, and apply the composition of Odu Ifa. Practice commutativity checking and develop facility with the Ifa Hermeneutics of non-commutative compositions.',
  },
  {
    num: '03', color: '#8b5cf6',
    title: 'Ifacats, Functors & Natural Transformations',
    body: 'Advance into the higher structures of IFACAT: the network of ifacats (knowledge categories), Ifa Functors (cross-domain mappings), and Ifa Natural Transformations (global coherence). This is the full Ifa System — the General Ifa-Orisa System for Everything.',
  },
];

// ─── COMMUTATIVE DIAGRAM VISUAL ───────────────────────────────────────────────

function CommutativeDiagram() {
  return (
    <div className="cat-diagram" aria-hidden="true">
      <div className="cat-diagram__glow" />
      <svg viewBox="0 0 380 300" className="cat-svg" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="mh" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto">
            <polygon points="0 0, 7 2.5, 0 5" fill="#3b9eff" opacity="0.9" />
          </marker>
          <marker id="mv" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto">
            <polygon points="0 0, 7 2.5, 0 5" fill="#f0920c" opacity="0.9" />
          </marker>
          <filter id="glow-b" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="glow-a" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Arrow lines */}
        <line x1="96" y1="68"  x2="276" y2="68"  stroke="#3b9eff" strokeWidth="1.6" markerEnd="url(#mh)" filter="url(#glow-b)" opacity="0.8" />
        <line x1="96" y1="232" x2="276" y2="232" stroke="#3b9eff" strokeWidth="1.6" markerEnd="url(#mh)" filter="url(#glow-b)" opacity="0.8" />
        <line x1="68" y1="96"  x2="68"  y2="204" stroke="#f0920c" strokeWidth="1.6" markerEnd="url(#mv)" filter="url(#glow-a)" opacity="0.8" />
        <line x1="312" y1="96" x2="312" y2="204" stroke="#f0920c" strokeWidth="1.6" markerEnd="url(#mv)" filter="url(#glow-a)" opacity="0.8" />

        {/* Morphism labels */}
        <text x="190" y="57"  textAnchor="middle" fill="#7dc3ff" fontSize="15" fontStyle="italic" fontFamily="Georgia, serif">f</text>
        <text x="190" y="254" textAnchor="middle" fill="#7dc3ff" fontSize="15" fontStyle="italic" fontFamily="Georgia, serif">k</text>
        <text x="50"  y="155" textAnchor="middle" fill="#ffaa32" fontSize="15" fontStyle="italic" fontFamily="Georgia, serif">h</text>
        <text x="330" y="155" textAnchor="middle" fill="#ffaa32" fontSize="15" fontStyle="italic" fontFamily="Georgia, serif">g</text>

        {/* Center */}
        <text x="190" y="143" textAnchor="middle" fill="#38e8a0" fontSize="10" fontWeight="700" letterSpacing="2.5" fontFamily="'Segoe UI', system-ui, sans-serif">COMMUTES</text>
        <text x="190" y="160" textAnchor="middle" fill="#38e8a0" fontSize="12" fontFamily="Georgia, serif" opacity="0.85">g ∘ f = k ∘ h</text>

        {/* Node: A — Ogbe */}
        <circle cx="68" cy="68" r="27" fill="#040810" stroke="#f5c518" strokeWidth="1.8" />
        <text x="68" y="62" textAnchor="middle" fill="#f5c518" fontSize="8" fontWeight="800" fontFamily="'Segoe UI', system-ui, sans-serif" letterSpacing="0.8">OGBE</text>
        <text x="68" y="78" textAnchor="middle" fill="#f5c518" fontSize="14" fontFamily="Georgia, serif" fontStyle="italic">A</text>

        {/* Node: B — Oyeku */}
        <circle cx="312" cy="68" r="27" fill="#040810" stroke="#3b9eff" strokeWidth="1.8" />
        <text x="312" y="62" textAnchor="middle" fill="#7dc3ff" fontSize="8" fontWeight="800" fontFamily="'Segoe UI', system-ui, sans-serif" letterSpacing="0.8">OYEKU</text>
        <text x="312" y="78" textAnchor="middle" fill="#7dc3ff" fontSize="14" fontFamily="Georgia, serif" fontStyle="italic">B</text>

        {/* Node: C — Iwori */}
        <circle cx="68" cy="232" r="27" fill="#040810" stroke="#f0920c" strokeWidth="1.8" />
        <text x="68" y="226" textAnchor="middle" fill="#ffaa32" fontSize="8" fontWeight="800" fontFamily="'Segoe UI', system-ui, sans-serif" letterSpacing="0.8">IWORI</text>
        <text x="68" y="242" textAnchor="middle" fill="#ffaa32" fontSize="14" fontFamily="Georgia, serif" fontStyle="italic">C</text>

        {/* Node: D — Odi */}
        <circle cx="312" cy="232" r="27" fill="#040810" stroke="#8b5cf6" strokeWidth="1.8" />
        <text x="312" y="226" textAnchor="middle" fill="#a78bfa" fontSize="8" fontWeight="800" fontFamily="'Segoe UI', system-ui, sans-serif" letterSpacing="0.8">ODI</text>
        <text x="312" y="242" textAnchor="middle" fill="#a78bfa" fontSize="14" fontFamily="Georgia, serif" fontStyle="italic">D</text>

        {/* Animated particles */}
        <circle r="3" fill="#7dc3ff" opacity="0.95">
          <animateMotion dur="2.6s" repeatCount="indefinite" path="M 96 68 L 276 68" />
        </circle>
        <circle r="3" fill="#7dc3ff" opacity="0.95">
          <animateMotion dur="2.6s" repeatCount="indefinite" begin="1.3s" path="M 96 232 L 276 232" />
        </circle>
        <circle r="3" fill="#ffaa32" opacity="0.95">
          <animateMotion dur="2.6s" repeatCount="indefinite" begin="0.65s" path="M 68 96 L 68 204" />
        </circle>
        <circle r="3" fill="#ffaa32" opacity="0.95">
          <animateMotion dur="2.6s" repeatCount="indefinite" begin="1.95s" path="M 312 96 L 312 204" />
        </circle>
      </svg>

      <div className="cat-diagram__caption">
        <span className="cat-diagram__eq">g ∘ f = k ∘ h</span>
        <span className="cat-diagram__sub">Amulu Commutativity · Ifa Commutative Square</span>
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
            <div className="header__name">Ifa Category Theory</div>
          </div>
        </a>
        <nav className="header__nav">
          <a className="nav-link" href="#definition">IFACAT</a>
          <a className="nav-link" href="#elements">Elements</a>
          <a className="nav-link" href="#amulu">Amulu Table</a>
          <a className="nav-link" href="#ifacats">Ifacats</a>
          <a className="nav-link" href="#principles">Principles</a>
          <a className="nav-link" href="#platforms">Platforms</a>
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
    { sym: '⌂',  label: 'Home',       href: '../'          },
    { sym: '◉',  label: 'IFACAT',     href: '#definition'  },
    { sym: '⊕',  label: 'Amulu',      href: '#amulu'       },
    { sym: 'F',  label: 'Ifacats',    href: '#ifacats'     },
    { sym: '⇔',  label: 'Principles', href: '#principles'  },
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
        <div className="hero__lattice" />
        <div className="hero__orb hero__orb--a" />
        <div className="hero__orb hero__orb--b" />
        <div className="hero__orb hero__orb--c" />
        <div className="hero__scanline" />
      </div>

      <div className="container hero__layout">
        <div className="hero__left">
          <div className="hero__badge">
            <span className="hero__badge-dot" />
            The IFA Internet &mdash; Ifa Category Theory Platform
          </div>

          <h1 className="hero__title">
            <span className="hero__title-main">Ifa Category Theory</span>
            <span className="hero__title-sub">IFACAT &middot; TOECAT</span>
          </h1>

          <p className="hero__tagline">
            The General Ifa-Orisa System for Everything
          </p>

          <p className="hero__desc">
            <strong>Ifa Category Theory (IFACAT)</strong> is the mathematical framework
            that models all fields of knowledge and everything in existence through the
            256 Odu Ifa as objects, Àṣẹ as morphisms, and Amulu as the universal
            composition law. IFACAT models the Innermost Universe — the Base Reality,
            CEN, or the Source — and is also known as{' '}
            <strong>ToE Category Theory (TOECAT)</strong>.
          </p>

          <div className="hero__aliases">
            {ALIASES.map((a, i) => (
              <span key={i} className="hero__alias" style={{ '--alias-color': a.color }}>
                {a.label}
              </span>
            ))}
          </div>

          <div className="hero__ctas">
            <a href="#definition" className="btn btn--primary">Explore IFACAT</a>
            <a href="#amulu" className="btn btn--ghost">The Amulu Table</a>
          </div>
        </div>

        <div className="hero__right" aria-hidden="true">
          <CommutativeDiagram />
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
              <span className="section__eyebrow section__eyebrow--gold">What is IFACAT</span>
              <h2 className="section__title">
                The <span className="accent--gold">Ifa Category</span> Theory
              </h2>
              <p className="section__subtitle">
                IFACAT is the highest-level mathematical framework of the IFA Internet —
                the structural science that models <em>everything in existence</em> through
                the axiomatic language of the 256 Odu Ifa.
              </p>
            </div>

            <div className="def-blocks">
              <div className="def-block">
                <div className="def-block__icon">◉</div>
                <div className="def-block__content">
                  <div className="def-block__label">IFACAT</div>
                  <p className="def-block__body">
                    Ifa Category Theory (IFACAT) is the mathematical framework that
                    organizes all Ifa knowledge into a universal categorical structure —
                    with Odu as objects, Àṣẹ as morphisms, and Amulu as the composition
                    law. IFACAT models the Innermost Universe: the Base Reality, CEN,
                    or the Source.
                  </p>
                </div>
              </div>
              <div className="def-block">
                <div className="def-block__icon">⬡</div>
                <div className="def-block__content">
                  <div className="def-block__label">ifacats</div>
                  <p className="def-block__body">
                    ifacats are the individual Ifa categories that model every field of
                    knowledge and every dimension of existence — Physics ifacat,
                    Mathematics ifacat, Ebology ifacat, and more. Each ifacat is a
                    sub-universe of IFACAT, connected through Ifa Functors and Natural
                    Transformations.
                  </p>
                </div>
              </div>
              <div className="def-block">
                <div className="def-block__icon">⊕</div>
                <div className="def-block__content">
                  <div className="def-block__label">TOECAT</div>
                  <p className="def-block__body">
                    IFACAT is also known as ToE Category Theory (TOECAT) — the
                    Category Theory of Everything. It is the most general and complete
                    mathematical system on the IFA Internet, providing the structural
                    foundation for all Ifa science, Ifa mathematics, and all
                    knowledge fields in the IFABOK.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="def-visual">
            <div className="ifacat-symbol">
              <div className="ifacat-symbol__ring ifacat-symbol__ring--outer" />
              <div className="ifacat-symbol__ring ifacat-symbol__ring--mid" />
              <div className="ifacat-symbol__node ifacat-symbol__node--tl">◉</div>
              <div className="ifacat-symbol__node ifacat-symbol__node--tr">◉</div>
              <div className="ifacat-symbol__node ifacat-symbol__node--bl">◉</div>
              <div className="ifacat-symbol__node ifacat-symbol__node--br">◉</div>
              <div className="ifacat-symbol__core">
                <span className="ifacat-symbol__char">IFACAT</span>
                <span className="ifacat-symbol__sub">Ifa Category Theory</span>
              </div>
              <div className="ifacat-symbol__label">The Ifa System</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── ELEMENTS SECTION ────────────────────────────────────────────────────────

function ElementsSection() {
  return (
    <section className="section section--alt" id="elements">
      <div className="container">
        <div className="section__header section__header--center">
          <span className="section__eyebrow section__eyebrow--electric">Core Structure</span>
          <h2 className="section__title">The Six Elements of IFACAT</h2>
          <p className="section__subtitle">
            Every category in mathematics requires objects, morphisms, composition,
            and identity. IFACAT extends these with Ifa Functors and Natural Transformations —
            the full structural algebra of the General Ifa-Orisa System.
          </p>
        </div>

        <div className="elements-grid">
          {ELEMENTS.map(el => (
            <div key={el.num} className="element-card" style={{ '--el-color': el.color }}>
              <div className="element-card__top">
                <span className="element-card__sym">{el.sym}</span>
                <span className="element-card__num">{el.num}</span>
              </div>
              <h3 className="element-card__title">{el.title}</h3>
              <div className="element-card__sub">{el.sub}</div>
              <p className="element-card__body">{el.body}</p>
              <div className="element-card__glow" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── AMULU TABLE SECTION ─────────────────────────────────────────────────────

function AmuluTableSection() {
  const [active, setActive] = useState(0);
  const form = AMULU_FORMS[active];

  const ODU4 = ['Ogbe', 'Oyeku', 'Iwori', 'Odi'];

  return (
    <section className="section section--dark" id="amulu">
      <div className="container">
        <div className="section__header section__header--center">
          <span className="section__eyebrow section__eyebrow--amber">Ifa Composition</span>
          <h2 className="section__title">
            The Amulu Table — <span className="accent--amber">Two Forms</span>
          </h2>
          <p className="section__subtitle">
            The Amulu Table is the composition table of the Ifa System — recording
            all pairwise compositions of Odu Ifa and checking commutativity
            across the full IFACAT structure.
          </p>
        </div>

        <div className="amulu-layout">
          <div className="amulu-tabs">
            {AMULU_FORMS.map((f, i) => (
              <button
                key={f.id}
                className={`amulu-tab${i === active ? ' amulu-tab--active' : ''}`}
                style={{ '--at-color': f.color }}
                onClick={() => setActive(i)}
              >
                <span className="amulu-tab__sym">{f.sym}</span>
                <span className="amulu-tab__name">{f.title}</span>
                <span className="amulu-tab__sub">{f.sub}</span>
              </button>
            ))}
          </div>

          <div className="amulu-detail" style={{ '--ad-color': form.color }}>
            <div className="amulu-detail__bg" />
            <div className="amulu-detail__sym">{form.sym}</div>
            <h3 className="amulu-detail__title">{form.title}</h3>
            <div className="amulu-detail__sub">{form.sub}</div>
            <p className="amulu-detail__body">{form.body}</p>

            <div className="amulu-check">
              <div className="amulu-check__label">
                <span className="amulu-check__icon">⇔</span>
                Commutativity Check
              </div>
              <p className="amulu-check__body">{form.check}</p>
            </div>

            <div className="amulu-mini-table">
              <div className="amulu-mini-table__label">
                Conceptual Amulu Table — {active === 0 ? '256 × 256' : '16 × 16'} Matrix
              </div>
              <div className="amulu-mini-table__grid">
                <div className="amulu-mini-table__corner">⊕</div>
                {ODU4.map(o => (
                  <div key={o} className="amulu-mini-table__head">{o}</div>
                ))}
                {ODU4.map(row => (
                  <React.Fragment key={row}>
                    <div className="amulu-mini-table__head amulu-mini-table__head--row">{row}</div>
                    {ODU4.map(col => (
                      <div
                        key={col}
                        className={`amulu-mini-table__cell${row === col ? ' amulu-mini-table__cell--diag' : ''}`}
                      >
                        {row === col ? row.slice(0, 3) : '·'}
                      </div>
                    ))}
                  </React.Fragment>
                ))}
              </div>
              <div className="amulu-mini-table__note">
                Diagonal = Identity · Off-diagonal = Odu composition result
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── IFACATS SECTION ─────────────────────────────────────────────────────────

function IfacatsSection() {
  return (
    <section className="section" id="ifacats">
      <div className="container">
        <div className="section__header section__header--center">
          <span className="section__eyebrow section__eyebrow--jade">The Knowledge Categories</span>
          <h2 className="section__title">The Ifacats</h2>
          <p className="section__subtitle">
            ifacats are the individual Ifa categories — each one a model of a field
            of knowledge or a dimension of existence. All ifacats are connected through
            Ifa Functors within the universal IFACAT framework.
          </p>
        </div>

        <div className="ifacats-grid">
          {IFACATS.map((c, i) => (
            <div key={i} className="ifacat-card" style={{ '--ic-color': c.color }}>
              <div className="ifacat-card__header">
                <div className="ifacat-card__sym">{c.sym}</div>
                <div className="ifacat-card__pulse" />
              </div>
              <h3 className="ifacat-card__title">{c.title}</h3>
              <div className="ifacat-card__sub">{c.sub}</div>
              <p className="ifacat-card__body">{c.body}</p>
              <div className="ifacat-card__bar" />
            </div>
          ))}
        </div>

        <div className="ifacats-note">
          <div className="ifacats-note__inner">
            <span className="ifacats-note__sym">F</span>
            <p className="ifacats-note__text">
              All ifacats are connected by <strong>Ifa Functors</strong> — structure-preserving
              mappings that translate Ifa Objects and Morphisms across knowledge domains
              while preserving the Amulu composition law. The IFA Internet is the
              technological realisation of this categorical network.
            </p>
          </div>
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
    <section className="section section--alt" id="principles">
      <div className="container">
        <div className="section__header section__header--center">
          <span className="section__eyebrow section__eyebrow--violet">Mathematical Laws</span>
          <h2 className="section__title">The Principles of IFACAT</h2>
          <p className="section__subtitle">
            The foundational mathematical principles governing the Ifa Category Theory
            system — from the Amulu composition law to natural transformations.
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

// ─── PLATFORMS, PLAYGROUNDS & GAMES SECTION ─────────────────────────────────
// Ifa Cube · Ifa Category Theory Playground · Ifa Matrix Playground · IfáLudo

const PLATFORMS = [
  {
    sym: '□³', color: 'var(--gold)',
    title: 'Ifa Cube',
    sub: 'Ẹ̀ta-Odù (Ẹ̀tadù): The Ifa Cube Platform',
    body: 'The 16 principal Odù as the corners of a four-dimensional cube. Create your own Ẹ̀tadù, turn the IfaCube Space, and follow IfaPoint, IfaLine, IfaSquare and IfaCube up to the Duoinfinicube.',
    href: 'https://ifainternet.org/ifa-category-theory/ifa-cube/',
    cta: 'Open the Ifa Cube Platform',
  },
  {
    sym: '⇒', color: 'var(--violet-lt)',
    title: 'Gbàgéde Àpólà Odù',
    sub: 'Ifa Category Theory Playground',
    body: 'IFACAT, hands-on: the Odù hypercube and the lattice of becoming, the Amulu category of 256 Odù Ifá as arrows, the 24 paths and their permutohedron, functors, natural transformations, and the 16 Odù as the 16 logic gates.',
    href: 'https://ifainternet.org/ifa-category-theory/playground/',
    cta: 'Open the IFACAT Playground',
  },
  {
    sym: '▦', color: 'var(--electric)',
    title: 'Ifa Matrix Playground',
    sub: 'The 256 Odù Ifá as IfaBinary tiles',
    body: 'The Odù Ifá laid out as matrices of IfaBinary tiles, including the Ifalibrium I and Ifalibrium II charts, with Self (Major) and Dual (Minor) filters for the Méjì and the 240 compound Odù.',
    href: 'https://ifainternet.org/ifa-matrix/playground/',
    cta: 'Open the Ifa Matrix Playground',
  },
  {
    sym: '⯃', color: 'var(--jade)',
    title: 'IfáLudo',
    sub: 'IfaCube-Based Game · Play Ifá Games',
    body: 'Ludo rebuilt with Ifá-Òrìṣà logic. Cast two Ifa Hypercube dice for one of the 256 Odù Ifá, move by its single marks, and race your four tokens home on the Ọpọ́n or the IfaCircle (Òbìrìfá).',
    href: 'https://playifagames.org/ifa-ludo/',
    cta: 'Play IfáLudo',
  },
];

const PLATFORMS_CSS = `
.platforms-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px}
@media (max-width:760px){.platforms-grid{grid-template-columns:minmax(0,1fr)}}
.platform-card{display:flex;flex-direction:column;text-decoration:none;color:inherit;min-width:0}
.platform-card .ifacat-card__header{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px}
.platform-card__ext{font-size:.7rem;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;color:var(--text-2)}
.platform-card .ifacat-card__body{flex:1;margin:0 0 18px}
.platform-card__cta{font-size:.86rem;font-weight:800;color:var(--ic-color)}
.platform-card__cta span{display:inline-block;transition:transform .2s}
.platform-card:hover .platform-card__cta span,.platform-card:focus-visible .platform-card__cta span{transform:translateX(4px)}
.platform-card:focus-visible{outline:2px solid var(--gold);outline-offset:3px}
`;

function PlatformsSection() {
  return (
    <section className="section" id="platforms">
      <style>{PLATFORMS_CSS}</style>
      <div className="container">
        <div className="section__header section__header--center">
          <span className="section__eyebrow section__eyebrow--gold">Explore &amp; Play</span>
          <h2 className="section__title">IFACAT Platforms, Playgrounds &amp; Games</h2>
          <p className="section__subtitle">
            Ifa Category Theory in action: build and turn the IfaCube, work through the
            categories of the Odù Ifá, read the Ifa Matrix tile by tile, and play IfáLudo.
          </p>
        </div>
        <div className="platforms-grid">
          {PLATFORMS.map(p => {
            const external = !p.href.startsWith('https://ifainternet.org/');
            return (
              <a key={p.title} className="ifacat-card platform-card" href={p.href}
                 style={{ '--ic-color': p.color }}
                 {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                <div className="ifacat-card__header">
                  <div className="ifacat-card__sym">{p.sym}</div>
                  <span className="platform-card__ext">{external ? 'playifagames.org ↗' : 'ifainternet.org'}</span>
                </div>
                <h3 className="ifacat-card__title">{p.title}</h3>
                <div className="ifacat-card__sub">{p.sub}</div>
                <p className="ifacat-card__body">{p.body}</p>
                <span className="platform-card__cta">{p.cta} <span>→</span></span>
              </a>
            );
          })}
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
          <span className="section__eyebrow section__eyebrow--amber">Understanding IFACAT</span>
          <h2 className="section__title">Your Journey into the Ifa System</h2>
          <p className="section__subtitle">
            Three foundational steps to mastering Ifa Category Theory — from core
            objects and morphisms to the full network of ifacats and natural
            transformations.
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
          <a href="https://toe.cenproject.org/ifa-category-theory/"
             target="_blank" rel="noopener noreferrer"
             className="btn btn--primary">
            Explore IFACAT on TOE
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
              Ifa Category Theory — IFACAT · TOECAT
            </p>
            <p className="footer__tagline footer__tagline--sm">
              Part of the <a href="https://cenproject.org/" className="footer__link-inline">CENProject</a> — Consciousness-Energy Research.
            </p>
          </div>
          <nav className="footer__links">
            <a href="#definition" className="footer__link">IFACAT</a>
            <a href="#elements" className="footer__link">Elements</a>
            <a href="#amulu" className="footer__link">Amulu Table</a>
            <a href="#ifacats" className="footer__link">Ifacats</a>
            <a href="#principles" className="footer__link">Principles</a>
            <a href="#platforms" className="footer__link">Platforms</a>
            <a href="#path" className="footer__link">Learn</a>
            <a href="../" className="footer__link">IFA Internet</a>
          </nav>
        </div>
        <div className="footer__bottom">
          <span className="footer__copy">
            &copy; 2026 CENProject Innovations Limited. All rights reserved.
          </span>
          <span className="footer__powered">
            The IFA Internet &mdash; Ifa Category Theory Platform
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
        <ElementsSection />
        <AmuluTableSection />
        <IfacatsSection />
        <PrinciplesSection />
        <PlatformsSection />
        <PathSection />
      </main>
      <Footer />
      <MobileBar />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
