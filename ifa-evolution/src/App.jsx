/* ─────────────────────────────────────────────────────────────────────────────
   Ifa Evolution — The General Theory of Evolution
   The IFA Internet · CENProject
───────────────────────────────────────────────────────────────────────────── */

const { useState } = React;

// ─── DATA ────────────────────────────────────────────────────────────────────

const ALIASES = [
  { label: 'ToE Evolution — Theory of Everything Evolution', color: '#00e676' },
  { label: 'General Theory of Evolution (GTE)',              color: '#8b5cf6' },
  { label: 'Ifa Life Sciences',                              color: '#f0920c' },
  { label: 'Evolutionary Meta-Field',                        color: '#f5c518' },
  { label: 'IFA Mathematica — Evolution Module',             color: '#14b8d4' },
];

const STATS = [
  { value: '256',     label: 'Odu Ifa',         sub: 'Axiomatic Evolution Matrix' },
  { value: 'All',     label: 'Fields',           sub: 'Biology to Mathematics' },
  { value: 'CEN',     label: 'Evolution Driver', sub: 'Consciousness · Energy' },
  { value: 'Igi Iye', label: 'Tree of Life',     sub: 'Universal Evolutionary Structure' },
];

const FIELDS = [
  { num:'01', title:'Biological Evolution',     sub:'BioE — Ifa Biology',       body:'The study of the evolution of life forms, organisms, and ecosystems through the axiomatic lens of the 256 Odu Ifa. Ifa Biology (BioE) provides the foundational framework for understanding the Tree of Life — Igi Ìyè Ifá — as the universal structure encoding all biological evolutionary relationships across all dimensions of time and space.', color:'#00e676', sym:'⊕' },
  { num:'02', title:'Consciousness Evolution',  sub:'CEN Evolution Dynamics',    body:'The science of how Consciousness evolves across all realms of existence — from primordial awareness in proto-cells to the full self-reflective intelligence of the human mind. Consciousness Evolution maps the CEN Field (Consciousness Energy Field) as the driving Force behind all evolutionary processes across all fields of knowledge.', color:'#8b5cf6', sym:'Ψ' },
  { num:'03', title:'Cultural Evolution',        sub:'Ifa Social Sciences',       body:'The evolutionary study of human culture, society, tradition, and civilisation through the Odu Ifa. Cultural Evolution in the Ifa framework recognises that societies, institutions, and belief systems evolve according to the same axiomatic principles governing biological life — encoded in the 256 Odu as the universal evolutionary matrix.', color:'#f0920c', sym:'◎' },
  { num:'04', title:'Mathematical Evolution',    sub:'IFA Mathematica',           body:'The meta-study of how mathematical structures, theories, and systems evolve over time and across knowledge fields. IFA Mathematica provides the axiomatic foundation from which all mathematical evolution proceeds — establishing the 256 Odu Ifa as the generative source of all mathematical structures, relationships, and transformations.', color:'#f5c518', sym:'∑' },
  { num:'05', title:'Linguistic Evolution',      sub:'IfaLang — Ifa Language',    body:'The evolutionary study of language, meaning, and symbolic communication through the IFA Framework. IfaLang traces the emergence and transformation of language systems as expressions of deeper Odu Ifa Principles — establishing that all language evolution is a manifestation of the fundamental Ifa Codes governing information, pattern, and consciousness.', color:'#14b8d4', sym:'∿' },
  { num:'06', title:'Economic Evolution',        sub:'Eboconomics',               body:'The study of how economic systems, exchange networks, and value models evolve through the principles of Ebology and the 256 Odu Ifa. Eboconomics applies the General Theory of Evolution to economics — recognising that all economic evolution is a form of energy exchange evolution governed by the axiomatic laws of the Odu Ifa.', color:'#00c87c', sym:'⟳' },
  { num:'07', title:'Cosmic Evolution',          sub:'IfaPhy — Ifa Physics',      body:'The evolutionary study of matter, energy, space, and time — from the Big Bang to the present moment — through the physics of the 256 Odu Ifa. Ifa Physics (IfaPhy) positions cosmic evolution as a consciousness-driven process, governed by the CEN Unified Field and the axiomatic structure of the Odu as the laws of universal transformation.', color:'#3b9eff', sym:'⬡' },
  { num:'08', title:'Technological Evolution',   sub:'Ifa Computing & IfaNet',    body:'The study of how technologies, systems, networks, and tools evolve in societies, cultures, civilizations, and historical eras, periods. In Odu Ifa, Technological Evolution recognises that all tools and systems are expressions of the Energy, Ogbe — and that the trajectory of technological evolution is governed by the same 16 Axiomatic Principles (Oju Odufa Merindinlogun) driving biological and consciousness evolution.', color:'#e040fb', sym:'⊛' },
  { num:'09+', title:'Others',                    sub:'Additional Dimensions & Anti-Domains', body:'Beyond the Eight Primary Domains, Ifa Evolution encompasses many other evolutionary dimensions — including Spiritual Evolution, Psychological Evolution, Geometric Evolution, and others — each governed by the same 256 Odu Ifa Axiomatic Principles. Equally, every Domain carries its Anti-Domain (dual): the anti-evolutionary force, dissolution dynamic, or inverse field that pairs with it. Biological Anti-Evolution, Consciousness Devolution, Cultural Entropy, Mathematical Undecidability, Linguistic Decay, Economic Collapse, Cosmic Entropy, and Technological Regression are some of these eight Anti-Domains — together with their own duals and extensions. The full scope of Ifa Evolution is 256-dimensional, mirroring the completeness of the Odu Ifa Matrix.', color:'#94a3b8', sym:'∞' },
];

const PRINCIPLES = [
  { sym:'∞', title:'General Theory of Evolution', sub:'GTE — The Meta-Theory', color:'#00e676',
    body:'The General Theory of Evolution (GTE) is Ifa Evolution\'s foundational meta-principle: that evolution is not limited to biology but is a universal process governing the transformation of all systems across all fields of knowledge and all dimensions of reality. The 256 Odu Ifa serve as the axiomatic matrix from which all evolutionary processes — biological, mathematical, cultural, or cosmic — emerge and unfold.' },
  { sym:'Ψ', title:'Evolution & Consciousness', sub:'CEN as the Evolutionary Driver', color:'#8b5cf6',
    body:'All evolution, in every field of knowledge, is ultimately driven by and directed toward the evolution of Consciousness. The CEN field (Consciousness-Energy-Nature) positions Consciousness as the fundamental force behind all evolutionary change — not an emergent by-product of biological evolution, but its very engine. Every Odu Ifa is simultaneously an encoding of a conscious evolutionary state.' },
  { sym:'⧜', title:'Ọ̀pẹ̀tẹ́ẹrẹ́ Principle', sub:'Ìwòrì Méjì — Foundation of the Ifa Tree', color:'#f0920c',
    body:'The Ifa Tree of Life — Igi Ìyè Ifá — is grounded in the Ifa Principle of Ọ̀pẹ̀tẹ́ẹrẹ́ (Ìwòrì Méjì). This Odu governs hierarchical structure, branching relationships, and the parent–child organisation of all Ifa Dafa (data). It establishes the foundational law by which all life, knowledge, and existence is organised into the universal tree — from the Root (Ifa Root) to the furthest leaf node.' },
  { sym:'⬡', title:'Ifa Selection', sub:'256 Odu as the Universal Selector', color:'#f5c518',
    body:'Where Darwin identified natural selection as the mechanism of biological evolution, Ifa Evolution identifies Ifa Selection as the universal selection mechanism across all fields. Ifa Selection is the process by which the 256 Odu Ifa govern which states, forms, systems, and patterns persist, transform, or dissolve across all dimensions of reality — the axiomatic engine of all evolutionary change.' },
  { sym:'⟳', title:'Ifa Tree Dafa Structure', sub:'IfaTree — Hierarchical Knowledge Organisation', color:'#14b8d4',
    body:'The Ifa Tree Dafa Structure (IfaTree) is the structural principle governing how all Ifa Data (Dafa) is organised on the IFA Web. It is a hierarchical parent–child structure built from the 16 Ifa Binary Codes — forming a universal tree from the Ifa Root downward through all nodes of knowledge. Every field, concept, and entity on the IFA Internet is a node in this universal Ifa Tree.' },
];

const SIDECHRX = [
  { letter:'S', name:'Symmetry',     odu:'Ogbé',      type:'O', color:'#f0920c', symbol:'⊛', subtitle:'The Base-Field Symmetry',                           tagline:'The fundamental principle that all Ifa transformations preserve the structure of reality.' },
  { letter:'I', name:'Invariance',   odu:'Òyèkú',     type:'I', color:'#6366f1', symbol:'⟲', subtitle:'What Persists Through All Transformations',          tagline:'The principle that certain Ifa Quantities remain unchanged under every transformation in the IFA Body of Knowledge (IFABOK).' },
  { letter:'D', name:'Duality',      odu:'Ìwòrì',     type:'I', color:'#14b8d4', symbol:'⇔', subtitle:'The Duality of Everything (DualoE) — Ogbé and Òyèkú', tagline:'Everything in existence has a Dual — its Superpartner called Ìpọ̀nrí or Ẹnìkejì in the non-physical Universe, Ọ̀run.' },
  { letter:'E', name:'Emergence',    odu:'Òdí',       type:'O', color:'#00c87c', symbol:'↑', subtitle:'The Emergence of Everything (EmergencoE)',             tagline:'How the 16 Oju Odu Ifa, especially Ogbe Energy, generate all complexity in the universe through the Amulu Operations.' },
  { letter:'C', name:'Composition',  odu:'Ìrosùn',    type:'I', color:'#ef4444', symbol:'⊕', subtitle:'The Composition of Everything (CompoE) — 16 × 16 = 256', tagline:'Ogbèyẹ̀kú ni Baba Àmúlù: The Binary Operation involving Ogbe and Oyeku that generates all the remaining 254 Odu Ifa.' },
  { letter:'H', name:'Holism',       odu:'Òwónrín',   type:'O', color:'#8b5cf6', symbol:'◎', subtitle:'The Holism for Everything (HolismoE)',                  tagline:'The IFA Matrix as a holistic System represented as Ogbe (Energy) — irreducible to any proper subset of 254 Odu.' },
  { letter:'R', name:'Reductionism', odu:'Òbàrà',     type:'O', color:'#3b9eff', symbol:'↓', subtitle:'The Reductionism of Everything (ReductionismoE)',       tagline:'Reducing any field of knowledge to its Odufa (inherent Energy).' },
  { letter:'X', name:'Others',       odu:'Òkànràn',   type:'O', color:'#ec4899', symbol:'◈', subtitle:'The Simulation of Everything (SimoE)',                  tagline:'Ayé lọjà, ọ̀run nilé: The physical realm is a simulation of the non-physical realm.' },
];

const RESOURCES = [
  { name:'Ewé', type:'Indigenous Knowledge', color:'#a3e635',
    url:'https://www.ewe.com.ng/',
    desc:'Yoruba herbal medicine and Isese plant/animal knowledge community — bridging traditional ecological knowledge with evolutionary and botanical research.' },
  { name:'Open Tree of Life', type:'Database', color:'#00e676',
    url:'https://tree.opentreeoflife.org/',
    desc:'Synthesises 2,000+ published phylogenies into a single comprehensive tree of 2.3 million species — one of the most complete open-access phylogenetic databases available.' },
  { name:'TimeTree of Life', type:'Temporal Database', color:'#8b5cf6',
    url:'https://timetree.org/',
    desc:'Molecular divergence times for 137,306 species from 3,000+ studies — enabling temporal evolutionary mapping across the history of life on Earth.' },
  { name:'iTOL — Interactive Tree of Life', type:'Visualisation', color:'#f0920c',
    url:'https://itol.embl.de/',
    desc:'Browser-based platform for displaying, annotating, and managing phylogenetic trees — a leading scientific visualisation tool for evolutionary research.' },
  { name:'OneZoom', type:'Fractal Explorer', color:'#f5c518',
    url:'https://www.onezoom.org/',
    desc:'Fractal deep-zoom explorer of the Tree of Life with 1.5M+ tips — an interactive way to navigate the full scope of biological diversity.' },
  { name:'Earth BioGenome Project', type:'Research Initiative', color:'#14b8d4',
    url:'https://www.earthbiogenome.org/',
    desc:'Global consortium sequencing all 1.67 million known eukaryotic species — the most ambitious biological genome mapping project in history.' },
  { name:'iNaturalist', type:'Citizen Science', color:'#3b9eff',
    url:'https://www.inaturalist.org/',
    desc:'200M+ biodiversity observations from 3.3M contributors — a leading citizen science platform for participatory biodiversity data gathering at planetary scale.' },
  { name:'Origin of Life Early-career Network', type:'Research Network', color:'#f472b6',
    url:'https://oolen.org/',
    desc:'Global network supporting early-career researchers studying life\'s origins — connecting scientists working on the deepest questions in evolutionary biology.' },
  { name:'Periodic Table of Life (NASA)', type:'AI Framework', color:'#60a5fa',
    url:'https://software.nasa.gov/software/LEW-19879-1',
    desc:'NASA AI framework applying biological evolutionary principles to human system design — bridging evolutionary science with engineering and technology.' },
];

const STEPS = [
  { num:'01', title:'Understand the Meta-Field', body:'Begin by exploring Ifa Evolution as the General Theory of Evolution — understanding how the 256 Odu Ifa serve as the universal evolutionary matrix across all fields of knowledge, from biology to mathematics.', color:'#00e676' },
  { num:'02', title:'Explore the Fields of Ifa Evolution', body:'Engage with each of the eight fields — Biological, Consciousness, Cultural, Mathematical, Linguistic, Economic, Cosmic, and Technological Evolution — understanding how each is governed by the same axiomatic Odu Ifa principles.', color:'#8b5cf6' },
  { num:'03', title:'Navigate the Igi Ìyè Ifá', body:'Use the Igi Ìyè Ifá (iToL) Explorer to map evolutionary relationships across the Tree of Life — integrating scientific tools, Ifa Data Structures (Dafa Structures), and the five iToL capabilities into a unified evolutionary understanding.', color:'#f0920c' },
];

// ─── EVOLUTION TREE VIZ ───────────────────────────────────────────────────────

function EvolutionTreeViz() {
  return (
    <div className="evo-tree-wrap" aria-hidden="true">
      <div className="evo-tree-glow" />
      <svg
        className="evo-tree-svg"
        viewBox="0 0 400 330"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* ── Trunk ── */}
        <line className="branch branch--trunk" x1="200" y1="305" x2="200" y2="260" />

        {/* ── Level 1 branches ── */}
        <line className="branch branch--l1" x1="200" y1="260" x2="110" y2="205" />
        <line className="branch branch--l1" x1="200" y1="260" x2="290" y2="205" />

        {/* ── Level 2 branches (left) ── */}
        <line className="branch branch--l2" x1="110" y1="205" x2="55"  y2="148" />
        <line className="branch branch--l2" x1="110" y1="205" x2="155" y2="143" />

        {/* ── Level 2 branches (right) ── */}
        <line className="branch branch--l2" x1="290" y1="205" x2="245" y2="143" />
        <line className="branch branch--l2" x1="290" y1="205" x2="340" y2="148" />

        {/* ── Level 3 leaf branches (far left) ── */}
        <line className="branch branch--l3" x1="55"  y1="148" x2="25"  y2="90" />
        <line className="branch branch--l3" x1="55"  y1="148" x2="75"  y2="88" />

        {/* ── Level 3 leaf branches (left-centre) ── */}
        <line className="branch branch--l3" x1="155" y1="143" x2="130" y2="87" />
        <line className="branch branch--l3" x1="155" y1="143" x2="174" y2="85" />

        {/* ── Level 3 leaf branches (right-centre) ── */}
        <line className="branch branch--l3" x1="245" y1="143" x2="226" y2="85" />
        <line className="branch branch--l3" x1="245" y1="143" x2="260" y2="87" />

        {/* ── Level 3 leaf branches (far right) ── */}
        <line className="branch branch--l3" x1="340" y1="148" x2="322" y2="88" />
        <line className="branch branch--l3" x1="340" y1="148" x2="372" y2="90" />

        {/* ── Level 1 junction nodes ── */}
        <circle className="node" cx="110" cy="205" r="5" style={{animationDelay:'0.4s'}} />
        <circle className="node" cx="290" cy="205" r="5" style={{animationDelay:'0.7s'}} />

        {/* ── Level 2 nodes ── */}
        <circle className="node" cx="55"  cy="148" r="4" style={{animationDelay:'0.8s'}} />
        <circle className="node" cx="155" cy="143" r="4" style={{animationDelay:'1.0s'}} />
        <circle className="node" cx="245" cy="143" r="4" style={{animationDelay:'1.0s'}} />
        <circle className="node" cx="340" cy="148" r="4" style={{animationDelay:'0.8s'}} />

        {/* ── Leaf tips (pulsing) ── */}
        <circle className="leaf" cx="25"  cy="90"  r="4" style={{animationDelay:'0s'}} />
        <circle className="leaf" cx="75"  cy="88"  r="4" style={{animationDelay:'0.3s'}} />
        <circle className="leaf" cx="130" cy="87"  r="4" style={{animationDelay:'0.6s'}} />
        <circle className="leaf" cx="174" cy="85"  r="4" style={{animationDelay:'0.2s'}} />
        <circle className="leaf" cx="226" cy="85"  r="4" style={{animationDelay:'0.5s'}} />
        <circle className="leaf" cx="260" cy="87"  r="4" style={{animationDelay:'0.8s'}} />
        <circle className="leaf" cx="322" cy="88"  r="4" style={{animationDelay:'0.1s'}} />
        <circle className="leaf" cx="372" cy="90"  r="4" style={{animationDelay:'0.4s'}} />

        {/* ── Level 2 labels ── */}
        <text x="55"  y="140" textAnchor="middle" fontSize="9" fill="#4a7a5a" fontFamily="sans-serif">Biology</text>
        <text x="155" y="135" textAnchor="middle" fontSize="9" fill="#4a7a5a" fontFamily="sans-serif">Culture</text>
        <text x="245" y="135" textAnchor="middle" fontSize="9" fill="#4a7a5a" fontFamily="sans-serif">Mind</text>
        <text x="340" y="140" textAnchor="middle" fontSize="9" fill="#4a7a5a" fontFamily="sans-serif">Cosmos</text>

        {/* ── Root node ── */}
        <circle className="node node--root" cx="200" cy="305" r="7" />
        <text x="200" y="320" textAnchor="middle" fontSize="9" fill="#ffaa32" fontFamily="sans-serif" fontWeight="700">Igi Ìyè Ifá</text>

        {/* ── L1 junction glow dots ── */}
        <circle cx="200" cy="260" r="3.5" fill="#00e676" opacity="0.85"
          style={{filter:'drop-shadow(0 0 5px #00e676)'}} />
      </svg>
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
            <div className="header__name">Ifa Evolution</div>
          </div>
        </a>
        <nav className="header__nav">
          <a className="nav-link" href="#definition">Definition</a>
          <a className="nav-link" href="#fields">Fields</a>
          <a className="nav-link" href="#itol">iToL</a>
          <a className="nav-link" href="#subsections">Sequence &amp; Taxonomy</a>
          <a className="nav-link" href="#principles">Principles</a>
          <a className="nav-link" href="#resources">Resources</a>
          <a className="nav-link" href="#path">Path</a>
          <a className="nav-link nav-link--cta"
             href="https://toe.cenproject.org/ifa-mathematics-toe-mathematics/"
             target="_blank" rel="noopener noreferrer">IFA Mathematica</a>
        </nav>
      </div>
    </header>
  );
}

// ─── MOBILE BAR ──────────────────────────────────────────────────────────────

function MobileBar() {
  const items = [
    { sym: '⌂',  label: 'Home',       href: '../' },
    { sym: '∞',  label: 'Evolution',  href: '#definition' },
    { sym: '⬡',  label: 'iToL',      href: '#itol' },
    { sym: 'Ψ',  label: 'Principles', href: '#principles' },
    { sym: '⟳',  label: 'Resources',  href: '#resources' },
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
            The IFA Internet &mdash; Ifa Evolution Platform
          </div>

          <h1 className="hero__title">
            <span className="hero__title-main">Ifa Evolution</span>
            <span className="hero__title-sub">The General Theory of Evolution</span>
          </h1>

          <p className="hero__tagline">
            ToE Evolution &middot; Ifa Life Sciences &middot; IFA Mathematica
          </p>

          <p className="hero__desc">
            Ifa Evolution is the <strong>meta-field that provides a General Theory of Evolution (GTE)</strong> for all fields of knowledge — biological, mathematical, cultural, linguistic, economic, cosmic, and beyond. Grounded in the <strong>256 Odu Ifa</strong> as the Axiomatic Evolutionary Matrix, it positions evolution not as a biological phenomenon alone but as the universal law of transformation across all dimensions of reality.
          </p>

          <div className="hero__aliases">
            {ALIASES.map((a, i) => (
              <span key={i} className="hero__alias" style={{ '--alias-color': a.color }}>
                {a.label}
              </span>
            ))}
          </div>

          <div className="hero__ctas">
            <a href="#fields" className="btn btn--primary">Explore the Fields</a>
            <a href="#itol" className="btn btn--ghost">Igi Ìyè Ifá iToL</a>
          </div>
        </div>

        <div className="hero__right" aria-hidden="true">
          <EvolutionTreeViz />
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
              <span className="section__eyebrow section__eyebrow--bio">What is Ifa Evolution</span>
              <h2 className="section__title">
                The <span className="accent--bio">General Theory</span> of Evolution
              </h2>
              <p className="section__subtitle">
                Ifa Evolution is the meta-field of knowledge providing a General Theory of Evolution (GTE) for all fields — integrating biology, consciousness, culture, mathematics, linguistics, economics, physics, and technology through the Axiomatic Structure of the 256 Odu Ifa.
              </p>
            </div>

            <div className="def-blocks">
              <div className="def-block">
                <div className="def-block__icon">∞</div>
                <div className="def-block__content">
                  <div className="def-block__label">General Theory of Evolution</div>
                  <p className="def-block__body">
                    Evolution is not a phenomenon unique to biology. The GTE holds that every system — mathematical, social, linguistic, economic, cosmic — evolves according to the same Axiomatic Principles encoded in the 256 Odu Ifa. This is the universal law of transformation.
                  </p>
                </div>
              </div>
              <div className="def-block">
                <div className="def-block__icon">🌿</div>
                <div className="def-block__content">
                  <div className="def-block__label">Ifa Life Sciences</div>
                  <p className="def-block__body">
                    As the Ifa Life Sciences field, Ifa Evolution is a key aspect of IfaBiology or ToE Biology, or the Biology for Everything (BioE) as one of eight evolutionary Domains — mapping all life through the Igi Ìyè Ifá (Tree of Life) and the hierarchical Ifa Tree Dafa Structure. Dafa: Ifa Data.
                  </p>
                </div>
              </div>
              <div className="def-block">
                <div className="def-block__icon">∑</div>
                <div className="def-block__content">
                  <div className="def-block__label">IFA Mathematica</div>
                  <p className="def-block__body">
                    Ifa Evolution operates as the Evolution Module of IFA Mathematica — providing the Axiomatic Mathematical Framework from which all evolutionary structures, patterns, and transformations are derived across all fields of knowledge.
                  </p>
                </div>
              </div>
              <div className="def-block">
                <div className="def-block__icon">⟳</div>
                <div className="def-block__content">
                  <div className="def-block__label">The ToE of Evolution</div>
                  <p className="def-block__body">
                    IfaEvolution is also known as ToE Evolution, Energy-Based Evolution, Consciousness Evolution (the Consciousness of all kinds of evolution), or the Evolution of Everything (EvolutionoE). The Ifa Evolution, and its Dual, Orisa Evolution, entails using the 256 Odu Ifa and 16 Odu Orisa to model, analyze, and study all structures, theories, models, and frameworks of evolution in any field, and interconnect them together.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="def-visual" aria-hidden="true">
            <div className="gte-visual">
              <div className="gte-branch gte-branch--1" />
              <div className="gte-branch gte-branch--2" />
              <div className="gte-branch gte-branch--3" />
              <div className="gte-branch gte-branch--4" />
              <div className="gte-branch gte-branch--5" />
              <div className="gte-branch gte-branch--6" />
              <div className="gte-branch gte-branch--7" />
              <div className="gte-branch gte-branch--8" />
              <div className="gte-node gte-node--1" />
              <div className="gte-node gte-node--2" />
              <div className="gte-node gte-node--3" />
              <div className="gte-node gte-node--4" />
              <div className="gte-node gte-node--5" />
              <div className="gte-node gte-node--6" />
              <div className="gte-node gte-node--7" />
              <div className="gte-node gte-node--8" />
              <div className="gte-core">
                <span className="gte-text">GTE</span>
              </div>
              <div className="gte-label">The Evolutionary Meta-Field</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FIELDS SECTION ───────────────────────────────────────────────────────────

function FieldsSection() {
  return (
    <section className="section section--alt" id="fields">
      <div className="container">
        <div className="section__header section__header--center">
          <span className="section__eyebrow section__eyebrow--bio">Eight Domains and Their Eight Duals (Anti-Domains)</span>
          <h2 className="section__title">The Fields of Ifa Evolution</h2>
          <p className="section__subtitle">
            16 interconnected Fields, or better still a set of Fields, constitute the General Theory of Evolution — each governed by the same Axiomatic 256 Odu Ifa Principles, each a dimension(s) of the universal evolutionary process.
          </p>
        </div>

        <div className="fields-grid">
          {FIELDS.map(f => (
            <div key={f.num} className="field-card" style={{ '--field-color': f.color }}>
              <div className="field-card__bar" />
              <div className="field-card__top">
                <span className="field-card__sym">{f.sym}</span>
                <span className="field-card__num">{f.num}</span>
              </div>
              <h3 className="field-card__title">{f.title}</h3>
              <div className="field-card__sub">{f.sub}</div>
              <p className="field-card__body">{f.body}</p>
              <div className="field-card__glow" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── iToL SECTION ─────────────────────────────────────────────────────────────

function IToLSection() {
  const chips = [
    'Evolutionary Mapping',
    'Interdisciplinary Insights',
    'Consciousness Studies',
    'Genetic Lineage Tracing',
    'Geological Contextualization',
  ];
  return (
    <section className="section section--itol" id="itol">
      <div className="container">
        <div className="section__header section__header--center">
          <span className="section__eyebrow section__eyebrow--teal">Ifa Tree of Life</span>
          <h2 className="section__title">
            Igi Ìyè Ifá &mdash; <span className="accent--teal">The Ifa Tree of Life Explorer</span>
          </h2>
          <p className="section__subtitle">
            The iToL (Igi Ìyè Ifá) Explorer is the dedicated research environment for mapping evolutionary relationships across all life, knowledge, and existence through the Ifa Tree Dafa Structure and the various iToL capabilities.
          </p>
        </div>

        <div className="itol-layout">
          <div className="itol-left">
            <p className="itol-desc">
              The <strong>Igi Ìyè Ifá</strong> (Ifa Tree of Life) is the Universal Hierarchical Structure encoding all evolutionary relationships — from the earliest common ancestor of all life forms to every living, extinct, and potential organism. Built on the <strong>Ifa Tree Dafa Structure</strong> (IfaTree) and grounded in the Ọ̀pẹ̀tẹ́ẹrẹ́ Principle of Ìwòrì Méjì, it is the Ifa Framework's answer to the global scientific effort to map all life on Earth.
            </p>
            <p className="itol-desc">
              The iToL Explorer integrates scientific databases, phylogenetic tools, and the axiomatic wisdom of the 256 Odu Ifa into various core research capabilities — enabling researchers, scholars, and consciousness explorers to navigate the full depth of biological and evolutionary knowledge.
            </p>
            <div className="itol-chips">
              {chips.map((c, i) => (
                <span key={i} className="itol-chip">{c}</span>
              ))}
            </div>
          </div>

          <div className="itol-right">
            <div className="itol-cta-card">
              <div className="itol-cta-card__sym">🌳</div>
              <h3 className="itol-cta-card__title">Igi Ìyè Ifá Explorer</h3>
              <p className="itol-cta-card__sub">
                Navigate the full Ifa Tree of Life — integrating evolutionary mapping, genetic lineage tracing, consciousness studies, geological contextualization, and interdisciplinary insights into a unified research environment.
              </p>
              <a href="./itol/" className="btn btn--primary" style={{width:'100%', justifyContent:'center'}}>
                Explore the iToL
              </a>
            </div>
          </div>
        </div>

        <div className="igi-gallery">
          <div className="igi-gallery__eyebrow">Igi Ìyè Ifá — Visual Reference</div>
          <div className="igi-gallery__grid">
            <figure className="igi-gallery__fig">
              <img src="./src/Igi-Iyefa-768x490.png"
                   alt="Igi Ìyè Ifá — The Ifa Tree of Life"
                   loading="lazy" />
              <figcaption>Igi Ìyè Ifá — The Ifa Tree of Life</figcaption>
            </figure>
            <figure className="igi-gallery__fig">
              <img src="./src/Igi-Iyefa1-1-768x314.png"
                   alt="Igi Ìyè Ifá — Ifa Evolutionary Lineage"
                   loading="lazy" />
              <figcaption>Igi Ìyè Ifá — Ifa Evolutionary Lineage</figcaption>
            </figure>
          </div>
          <p className="igi-gallery__note">
            These Ifa Charts are developed actively based on ancient data in Odu Ifa (Dafa), other African Indigenous Knowledge Systems (AIKS), and modern databases. The Ifa Tree of Life (iToL) Explorer is a living Platform and will be regularly updated based on the latest research findings in AIKS and modern systems.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── SIDECHRX MATRIX DIAGRAM ─────────────────────────────────────────────────

function SidechrxMatrixDiagram() {
  const cx = 300, cy = 300, armLen = 150, centerR = 50, nodeR = 28;
  const labelDist = armLen + nodeR + 14;
  const toRad = (deg) => (deg - 90) * Math.PI / 180;
  const ANGLES  = [0, 45, 90, 135, 180, 225, 270, 315];
  const ANCHORS = ['middle','start','start','start','middle','end','end','end'];

  const pts = SIDECHRX.map((p, i) => {
    const rad = toRad(ANGLES[i]);
    return {
      ...p,
      nx: cx + armLen * Math.cos(rad),
      ny: cy + armLen * Math.sin(rad),
      lx: cx + labelDist * Math.cos(rad),
      ly: cy + labelDist * Math.sin(rad),
      anchor: ANCHORS[i],
    };
  });

  return (
    <div className="matrix-diagram">
      <div className="matrix-diagram__header">
        <h3 className="matrix-diagram__title">
          0 + 8D Matrix &mdash; <span className="accent--amber">Ifa Evolution</span> as the Node
        </h3>
      </div>
      <div className="matrix-diagram__svg-wrap">
        <svg viewBox="0 0 600 600" className="matrix-diagram__svg" aria-hidden="true">

          {/* Dashed outer ring */}
          <circle cx={cx} cy={cy} r={armLen}
            fill="none" stroke="#1e2a3a" strokeWidth="1" strokeDasharray="4 7" />

          {/* Arms */}
          {pts.map(p => (
            <line key={`arm-${p.letter}`}
              x1={cx} y1={cy} x2={p.nx} y2={p.ny}
              stroke={p.color} strokeWidth="1.5" opacity="0.4" />
          ))}

          {/* Outer node glow + circle + label */}
          {pts.map(p => (
            <g key={`node-${p.letter}`}>
              <circle cx={p.nx} cy={p.ny} r={nodeR + 7}
                fill={p.color} opacity="0.08" />
              <circle cx={p.nx} cy={p.ny} r={nodeR}
                fill="#0d1117" stroke={p.color} strokeWidth="2" />
              <text x={p.nx} y={p.ny}
                textAnchor="middle" dominantBaseline="central"
                fontSize="16" fontWeight="900"
                fill={p.color} fontFamily="'Courier New', monospace">
                {p.letter}
              </text>
              <text x={p.lx} y={p.ly}
                textAnchor={p.anchor} dominantBaseline="middle"
                fontSize="9.5" fontWeight="600"
                fill="#6a8a7a" fontFamily="sans-serif">
                {p.name}
              </text>
            </g>
          ))}

          {/* Center 0D node */}
          <circle cx={cx} cy={cy} r={centerR + 10}
            fill="#f0920c" opacity="0.07" />
          <circle cx={cx} cy={cy} r={centerR}
            fill="#0c1118" stroke="#f0920c" strokeWidth="2.5" />
          <text x={cx} y={cy - 17}
            textAnchor="middle" fontSize="8"
            fill="#7a7a8a" fontFamily="monospace">0D</text>
          <text x={cx} y={cy - 3}
            textAnchor="middle" fontSize="12" fontWeight="800"
            fill="#f0920c" fontFamily="sans-serif">Ifa</text>
          <text x={cx} y={cy + 13}
            textAnchor="middle" fontSize="12" fontWeight="800"
            fill="#f0920c" fontFamily="sans-serif">Evolution</text>

        </svg>
      </div>
    </div>
  );
}

// ─── SIDECHRX SECTION ────────────────────────────────────────────────────────

function SidechrxSection() {
  return (
    <section className="section section--dark" id="principles">
      <div className="container">
        <div className="section__header section__header--center">
          <span className="section__eyebrow section__eyebrow--violet">IFA Mathematica: SIDECHRX (8 Meta-Principles of Ifa)</span>
          <h2 className="section__title">
            <span className="accent--amber">SIDECHRX</span> — The 8 Principles <span className="accent--violet">Within</span> the Odu Ifa
          </h2>
          <p className="section__subtitle">
            SIDECHRX are the 8 universal meta-principles of Ifa — <strong>discovered within the 16 Oju Odu Ifa</strong> through mathematical, scientific, and philosophical study. They are not English translations of the Odu names. They are the living principles that the Odu embody, govern, and express across all fields of knowledge.
          </p>
        </div>

        <div className="sidechrx-intro">
          <div className="sidechrx-intro__bar">
            {SIDECHRX.map((p) => (
              <div key={p.letter} className="sidechrx-intro__item" style={{ '--c': p.color }}>
                <span className="sidechrx-intro__letter">{p.letter}</span>
                <span className="sidechrx-intro__name">{p.name}</span>
              </div>
            ))}
          </div>
          <p className="sidechrx-intro__note">
            The 16 Oju Odu (Ogbé → Òfún) each embodies a set of primary Principles and Anti-Principles — together forming the complete 16-Law SIDECHRX System. Explore each portal on the IFA Matrix to discover that Principle Set across all fields of knowledge.
          </p>
        </div>

        <div className="portals-grid">
          {SIDECHRX.map(p => (
            <div key={p.letter} className="portal-card" style={{ '--c': p.color }}>
              <div className="portal-card__letter">{p.letter}</div>
              <div className="portal-card__name">{p.name}</div>
              <div className="portal-card__subtitle">{p.subtitle}</div>
              <p className="portal-card__desc">{p.tagline}</p>
              <a className="portal-card__btn"
                 href="https://ifainternet.org/ifa-matrix/"
                 target="_blank" rel="noopener noreferrer">
                <span>Explore on IFA Matrix</span>
                <span className="portal-card__btn-arrow">→</span>
              </a>
            </div>
          ))}
        </div>

        <SidechrxMatrixDiagram />
      </div>
    </section>
  );
}

// ─── SUBSECTIONS SECTION ─────────────────────────────────────────────────────

function SubsectionsSection() {
  const subs = [
    {
      sym: '∿',
      title: 'Ifa Sequence',
      sub: 'ToE Sequence',
      color: '#f5c518',
      href: './ifa-sequence/',
      desc: 'An ordered (continuous, connected) arrangement or configuration of everything — elements, objects, events, states, or transformations — expressed in terms of their Odu (inherent Energy), i.e., as an energyform. Ifa Sequence (also known as ToE Sequence, Energy-Based Sequence, or Consciousness Sequence) is the General and Universal Framework for studying, modelling, and analysing all kinds of sequences across every field of knowledge — sciences and non-sciences alike.',
    },
    {
      sym: '⬡',
      title: 'Ifa Taxonomy',
      sub: 'ToE Taxonomy',
      color: '#8b5cf6',
      href: './ifa-taxonomy/',
      desc: 'The universal classification system for all fields of knowledge within the Ifa Evolution framework — organising all living, non-living, and conceptual entities into a unified taxonomic hierarchy grounded in the Igi Ìyè Ifá (Ifa Tree of Life) and the Ifa Tree Dafa Structure.',
    },
  ];

  return (
    <section className="section section--alt" id="subsections">
      <div className="container">
        <div className="section__header section__header--center">
          <span className="section__eyebrow section__eyebrow--teal">Ifa Evolution Sub-Platforms</span>
          <h2 className="section__title">Ifa Sequence &amp; Ifa Taxonomy</h2>
          <p className="section__subtitle">
            Two dedicated sub-platforms of Ifa Evolution — each extending the General Theory of Evolution into structured sequence and classification frameworks across all dimensions of the IFA Body of Knowledge.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '28px', marginTop: '12px' }}>
          {subs.map((s, i) => (
            <div key={i} className="field-card" style={{ '--field-color': s.color }}>
              <div className="field-card__bar" />
              <div className="field-card__top">
                <span className="field-card__sym">{s.sym}</span>
              </div>
              <h3 className="field-card__title">{s.title}</h3>
              <div className="field-card__sub">{s.sub}</div>
              <p className="field-card__body">{s.desc}</p>
              {s.href && (
                <a href={s.href} style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  marginTop: '18px', padding: '8px 16px',
                  background: `rgba(${s.color === '#f5c518' ? '245,197,24' : '139,92,246'},0.12)`,
                  border: `1px solid ${s.color}44`,
                  borderRadius: '8px',
                  fontSize: '0.8rem', fontWeight: '600',
                  color: s.color, textDecoration: 'none',
                  transition: 'background 0.2s',
                }}>
                  Explore {s.title} →
                </a>
              )}
              <div className="field-card__glow" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── RESOURCES SECTION ───────────────────────────────────────────────────────

function ResourcesSection() {
  return (
    <section className="section section--alt" id="resources">
      <div className="container">
        <div className="section__header section__header--center">
          <span className="section__eyebrow section__eyebrow--bio">Scientific Tools</span>
          <h2 className="section__title">Key Resources &amp; Research Tools</h2>
          <p className="section__subtitle">
            The leading scientific databases, visualisation platforms, and research initiatives that support iToL exploration and Ifa Evolution research.
          </p>
        </div>

        <div className="resources-grid">
          {RESOURCES.map((r, i) => (
            <div key={i} className="resource-card" style={{ '--rc-color': r.color }}>
              <div className="resource-card__bar" />
              <div className="resource-card__header">
                <div className="resource-card__name">{r.name}</div>
                <div className="resource-card__type">{r.type}</div>
              </div>
              <p className="resource-card__desc">{r.desc}</p>
              {r.url && (
                <a href={r.url} className="resource-card__link"
                   target="_blank" rel="noopener noreferrer">
                  Visit Resource
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PATH SECTION ─────────────────────────────────────────────────────────────

function PathSection() {
  return (
    <section className="section section--dark" id="path">
      <div className="container">
        <div className="section__header section__header--center">
          <span className="section__eyebrow section__eyebrow--amber">Getting Started</span>
          <h2 className="section__title">Your Journey into Ifa Evolution</h2>
          <p className="section__subtitle">
            Three foundational steps to understanding Ifa Evolution — from the meta-theory to the full navigation of the Igi Ìyè Ifá.
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
          <a href="./itol/" className="btn btn--primary">
            Explore Igi Ìyè Ifá iToL
          </a>
          <a href="https://toe.cenproject.org/ifa-mathematics-toe-mathematics/"
             target="_blank" rel="noopener noreferrer"
             className="btn btn--ghost">
            IFA Mathematica
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
              Ifa Evolution — The General Theory of Evolution
            </p>
            <p className="footer__tagline footer__tagline--sm">
              Part of the <a href="https://cenproject.org/" className="footer__link-inline">CENProject</a> — Consciousness-Energy Research.
            </p>
          </div>
          <nav className="footer__links">
            <a href="#definition" className="footer__link">Definition</a>
            <a href="#fields" className="footer__link">Eight Fields</a>
            <a href="#itol" className="footer__link">Igi Ìyè Ifá</a>
            <a href="#principles" className="footer__link">Principles</a>
            <a href="#resources" className="footer__link">Resources</a>
            <a href="#path" className="footer__link">Path</a>
            <a href="../" className="footer__link">IFA Internet</a>
          </nav>
        </div>
        <div className="footer__bottom">
          <span className="footer__copy">
            &copy; 2026 CENProject Innovations Limited. All rights reserved.
          </span>
          <span className="footer__powered">
            The IFA Internet &mdash; Ifa Evolution Platform
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
        <FieldsSection />
        <IToLSection />
        <SubsectionsSection />
        <SidechrxSection />
        <ResourcesSection />
        <PathSection />
      </main>
      <Footer />
      <MobileBar />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
