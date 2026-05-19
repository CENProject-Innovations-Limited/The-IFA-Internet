/* ─────────────────────────────────────────────────────────────
   Ifa Computing — ComputoE · The Computer for Everything
   The IFA Internet · CENProject · toe.cenproject.org
───────────────────────────────────────────────────────────── */

const { useState, useEffect } = React;

// ── Five Pillars of Ifa Computing ─────────────────────────────
const PILLARS = [
  {
    id: 'ifabit',
    name: 'IfaBit',
    abbr: 'TOEBit · CENBit · EnergyBit',
    icon: '⬡',
    accent: '#00d9b8',
    url: 'https://toe.cenproject.org/ifabit-overview/',
    desc: 'The fundamental building block of all information — unifying classical bits, qubits, and all computational units within the IFA Binary System. Nature\'s own instruction set.',
  },
  {
    id: 'info',
    name: 'Ifa Information',
    abbr: 'InfoE · Information for Everything',
    icon: '◈',
    accent: '#4361ee',
    url: 'https://toe.cenproject.org/ifa-information/',
    desc: 'The Grand Unified Theory of Information Science — container of all theories, models, and systems of information, from classical Shannon theory to quantum to consciousness-based InfoE.',
  },
  {
    id: 'algo',
    name: 'Ifa Algorithm',
    abbr: 'Ifalgo · AlgoE · TOE Algorithm',
    icon: '⟳',
    accent: '#f5c518',
    url: 'https://toe.cenproject.org/ifa-algorithm/',
    desc: 'The Algorithm for Everything — the foundational framework unifying all algorithms across computer science, engineering, mathematics, and every field of knowledge through the 16 Odu Axioms.',
  },
  {
    id: 'prog',
    name: 'Ifa Programming',
    abbr: 'IfaProg · Energy Programming',
    icon: '⌥',
    accent: '#e9498a',
    url: 'https://toe.cenproject.org/ifa-algorithm/',
    desc: 'Programming through Ifa principles — writing algorithms, designing systems, and engineering software using the 256 Odu Ifa as the universal programming matrix and design pattern library.',
  },
  {
    id: 'lang',
    name: 'Ifa Language',
    abbr: 'IfaLang · IfaPL · Language for Everything',
    icon: '⌘',
    accent: '#7c4dff',
    url: 'https://toe.cenproject.org/ifa-language/',
    desc: 'The Language for Everything — one meta-language unifying all programming languages, formal systems, and natural languages through the single IfaLine: Energy (CEN).',
  },
];

// ── IfaBit: Four Computational Unit Types ─────────────────────
const BIT_TYPES = [
  {
    name: 'Classical Bit',
    symbol: '0 | 1',
    states: '2',
    framework: 'Binary Logic',
    accent: '#8b92a8',
    desc: 'The traditional binary unit — encodes information as either 0 or 1. The foundation of all classical computing, from transistors to modern supercomputers.',
  },
  {
    name: 'Qubit',
    symbol: '|ψ⟩',
    states: '∞ (superposed)',
    framework: 'Quantum Mechanics',
    accent: '#0099ff',
    desc: 'The quantum bit — exists in superposition of 0 and 1 simultaneously until measured. Enables exponential computational power for specific classes of problems.',
  },
  {
    name: 'IFABit',
    symbol: 'O · |',
    states: '256 (Odu-complete)',
    framework: 'IFA Binary System',
    accent: '#00d9b8',
    desc: 'The Ifa bit — the universal computational unit encoding all possible information states through the Ogbe–Oyeku (O·|) pair. Unifies classical, quantum, and all computational paradigms into one.',
  },
  {
    name: 'N-it',
    symbol: 'Nₙ',
    states: 'N (base-N)',
    framework: 'IfaComputer',
    accent: '#ff6b35',
    desc: 'The generalized N-base unit — bridges classical and quantum systems, enabling computation in any base or dimensional framework through the IFABit superstructure.',
  },
];

// ── Ifa Information Components ─────────────────────────────────
const INFO_COMPONENTS = [
  {
    name: 'The Dafa',
    icon: '◎',
    accent: '#00d9b8',
    desc: 'Data encoded in IfaLang — information formatted within the Ifa Information System for efficient processing and universal representation across all fields.',
  },
  {
    name: 'InfoE Theory',
    icon: '◈',
    accent: '#4361ee',
    desc: 'The universe of all information theories — classical Shannon information, quantum information, and consciousness-based InfoE unified under one axiomatic framework.',
  },
  {
    name: 'IfaInfo',
    icon: '◉',
    accent: '#f5c518',
    desc: 'Output from an Ifa Computer — analyzed, contextualized, and processed through IfaLang. Structured intelligence produced by Ifa-based computational systems.',
  },
  {
    name: 'IfaComms',
    icon: '◌',
    accent: '#e9498a',
    desc: 'Grand Unified Theory of Communications — unifying all communication technologies, protocols, and management systems under the Ifa Information framework.',
  },
  {
    name: 'InfoE Algebras',
    icon: '⊕',
    accent: '#7c4dff',
    desc: 'Foundational mathematical structures expressed as IFAGebras — the algebraic backbone of Ifa Information Science, connecting all information theories mathematically.',
  },
  {
    name: 'Ẹ̀là Unit',
    icon: '⊛',
    accent: '#ff6b35',
    desc: 'The measurement standard for Ifa\'s internetworking and integration capabilities — the quantum of connectivity binding the IFA Internet together.',
  },
];

// ── Ifalgorithm: Five Core Principles ─────────────────────────
const ALGO_PRINCIPLES = [
  {
    n: '01',
    title: 'Comprehensive Framework',
    accent: '#00d9b8',
    desc: 'Integrates algorithms from all fields — computer science, engineering, mathematics, life sciences — into one robust, unified structure built on the 16 Odu Ifa as natural axioms.',
  },
  {
    n: '02',
    title: 'Advanced Scalability',
    accent: '#4361ee',
    desc: 'Adapts seamlessly across scales — from micro-algorithms governing subatomic processes to macro-algorithms governing cosmic systems and societal structures.',
  },
  {
    n: '03',
    title: 'Cross-Disciplinary Insight',
    accent: '#f5c518',
    desc: 'Bridges computer science, engineering, biology, economics, and beyond — revealing the universal algorithmic intelligence underlying all fields through Ifa principles.',
  },
  {
    n: '04',
    title: 'Unified Approach',
    accent: '#e9498a',
    desc: 'One cohesive framework for all algorithmic solutions — eliminating fragmentation between disciplines by grounding every algorithm in Ifa Mathematics (IfaGebra).',
  },
  {
    n: '05',
    title: 'Future-Focused Design',
    accent: '#7c4dff',
    desc: 'Accommodates emerging technologies and innovations — designed to evolve with the frontier of computation, quantum systems, and AI without requiring foundational redesign.',
  },
];

// ── Ifa Language Computing Features ───────────────────────────
const LANG_FEATURES = [
  {
    name: 'IfaPL',
    subtitle: 'Programming Language for Everything',
    icon: '{ }',
    accent: '#00d9b8',
    desc: 'Energy (CEN) — the single Matrix uniting all programming languages as One. IfaPL treats every programming paradigm as a dialect of the universal IfaLang meta-grammar.',
  },
  {
    name: 'IfaScript',
    subtitle: 'Command-Line Access · System Integration',
    icon: '$ _',
    accent: '#4361ee',
    desc: 'Command-line access to IfaLang for software integration — enabling system-level interaction and technical implementation across all Ifa Computing platforms and environments.',
  },
  {
    name: 'IfaLens',
    subtitle: 'Sensor for Everything',
    icon: '◎',
    accent: '#f5c518',
    desc: 'A Sensor for Everything — builds complex linguistic structures for knowledge integration, treating all domains as queryable, computable, and cross-referenceable information systems.',
  },
  {
    name: 'XaaL Model',
    subtitle: 'X-as-a-Language',
    icon: '⟺',
    accent: '#e9498a',
    desc: 'Any field as a Language — engineering, economics, medicine, physics each become a language with grammar, syntax, and semantics fully computable through IfaLang.',
  },
  {
    name: 'Orisa Languages',
    subtitle: 'Domain Specializations',
    icon: '⬡',
    accent: '#7c4dff',
    desc: 'OgunLang (engineering), EsuLang (networking/logic), SangoLang (electrical systems) — specialized computational dialects embodying each Orisa\'s architectural intelligence.',
  },
  {
    name: 'IfaComms Protocol',
    subtitle: 'Grand Unified Communications',
    icon: '⊸',
    accent: '#ff6b35',
    desc: 'The communication backbone of the IFA Internet — a unified protocol framework encoding all networking, signaling, and data exchange standards within the IfaLang meta-system.',
  },
];

// ── Computer Types ─────────────────────────────────────────────
const COMPUTER_TYPES = [
  { name: 'Ifa Computer',       bits: '256-iBit', system: 'Odu Ifa (256)',       accent: '#f5c518' },
  { name: 'Oosa Computer',      bits: '16-iBit',  system: 'Erindinlogun (16)',    accent: '#e9498a' },
  { name: 'I Ching System',     bits: '64-iBit',  system: 'I Ching (64)',         accent: '#4361ee' },
  { name: 'Classical Computer', bits: 'Bit',      system: 'Binary (0|1)',         accent: '#8b92a8' },
  { name: 'Quantum Computer',   bits: 'Qubit',    system: 'Superposition',        accent: '#0099ff' },
];

// ── Header ─────────────────────────────────────────────────────
function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <header className={`header${scrolled ? ' header--scrolled' : ''}`}>
      <div className="header__inner">
        <a href="https://ifainternet.org" className="header__back" target="_blank" rel="noopener noreferrer">
          <span className="header__back-arrow">←</span>
          <span>The IFA Internet</span>
        </a>
        <div className="header__brand">
          <span className="header__brand-icon">⬡</span>
          <span className="header__brand-name">IFA Computing</span>
        </div>
        <nav className="header__nav">
          <a className="nav-link" href="#pillars">Pillars</a>
          <a className="nav-link" href="#ifabit">IfaBit</a>
          <a className="nav-link" href="#information">Information</a>
          <a className="nav-link" href="#algorithm">Algorithm</a>
          <a className="nav-link" href="#language">Language</a>
          <a
            className="nav-link nav-link--cta"
            href="https://toe.cenproject.org/ifa-computer/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ifa Computer →
          </a>
        </nav>
      </div>
    </header>
  );
}

// ── Hero ───────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="hero">
      <div className="hero__bg">
        <div className="hero__circuit-grid" />
        <div className="hero__glow hero__glow--teal" />
        <div className="hero__glow hero__glow--blue" />
      </div>

      {/* Animated circuit nodes */}
      <div className="hero__nodes" aria-hidden="true">
        {[...Array(14)].map((_, i) => (
          <div
            key={i}
            className="hero__node"
            style={{
              '--nx': `${[8,18,30,42,55,67,78,88,14,35,50,65,80,92][i]}%`,
              '--ny': `${[15,72,28,60,18,80,35,55,45,85,10,65,90,40][i]}%`,
              '--nd': `${i * 0.45}s`,
              '--ns': `${2.5 + (i % 4) * 0.6}s`,
            }}
          />
        ))}
      </div>

      {/* Odu binary stream — O and | */}
      <div className="hero__stream" aria-hidden="true">
        {['O|OO||O|', '||O|OO||', 'OO||O|OO', '|OO||OO|', 'O||OO||O'].map((s, i) => (
          <div
            key={i}
            className="hero__stream-col"
            style={{ '--sc-delay': `${i * 1.3}s`, '--sc-left': `${i * 20 + 2}%` }}
          >
            {s.split('').map((c, j) => (
              <span key={j} className="hero__stream-char" style={{ '--char-delay': `${j * 0.15}s` }}>{c}</span>
            ))}
          </div>
        ))}
      </div>

      {/* IfaLine stream — I and II */}
      <div className="hero__stream hero__stream--ifaline" aria-hidden="true">
        {[
          ['|','||','|','||','|','||','|','||'],
          ['||','|','||','|','||','|','||','|'],
          ['|','|','||','||','|','|','||','||'],
          ['||','||','|','|','||','||','|','|'],
          ['|','||','||','|','|','||','|','||'],
        ].map((col, i) => (
          <div
            key={i}
            className="hero__stream-col hero__stream-col--ifaline"
            style={{ '--sc-delay': `${i * 1.7 + 0.6}s`, '--sc-left': `${i * 20 + 12}%` }}
          >
            {col.map((c, j) => (
              <span key={j} className="hero__stream-char hero__stream-char--ifaline" style={{ '--char-delay': `${j * 0.2}s` }}>{c}</span>
            ))}
          </div>
        ))}
      </div>

      <div className="hero__inner">
        <div className="hero__eyebrow">
          <span className="hero__eyebrow-dot" />
          The IFA Internet · iTOE Platform
        </div>

        <h1 className="hero__title">
          <span className="hero__title-ifa">Ifa</span>
          <span className="hero__title-main">Computing</span>
        </h1>

        <p className="hero__subtitle">ComputoE — The Computer for Everything</p>

        <p className="hero__desc">
          Redefining computation through the Energy-based principles of Ifa and Orisa.
          The 256 Odu Ifa as the universal instruction set — encoding every possible
          computational state of Consciousness-Energy (CEN).
        </p>

        <div className="hero__stats">
          {[
            { v: '256', l: 'IFABit States' },
            { v: '16',  l: 'Ifa Axioms' },
            { v: '16',  l: 'Core Pillars' },
            { v: '∞',   l: 'Computations' },
          ].map(s => (
            <div key={s.l} className="hero__stat">
              <div className="hero__stat-value">{s.v}</div>
              <div className="hero__stat-label">{s.l}</div>
            </div>
          ))}
        </div>

        <div className="hero__ctas">
          <a className="btn btn--primary" href="#pillars">Explore IFA Computing ↓</a>
          <a
            className="btn btn--ghost"
            href="https://toe.cenproject.org/ifa-computer/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ifa Computer →
          </a>
        </div>
      </div>
    </section>
  );
}

// ── Pillars Section ────────────────────────────────────────────
function PillarsSection() {
  return (
    <section id="pillars" className="section">
      <div className="container">
        <div className="section__header">
          <span className="section__eyebrow" style={{ color: '#00d9b8' }}>16 Pillars · One Unified Framework</span>
          <h2 className="section__title">What is <span style={{ color: '#00d9b8' }}>Ifa Computing</span>?</h2>
          <p className="section__desc">
            Ifa Computing (ComputoE) redefines what a computer is, what computation means, and what
            information can be — grounded in the 256 Odu Ifa as the universe's original instruction set.
            256 interconnected Pillars (Odufa) form the complete science of Ifa-based computation.
          </p>
        </div>

        <div className="pillars-grid">
          {PILLARS.map(p => (
            <a
              key={p.id}
              href={p.url}
              className="pillar-card"
              style={{ '--pc-accent': p.accent }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="pillar-card__top" />
              <div className="pillar-card__icon">{p.icon}</div>
              <div className="pillar-card__name">{p.name}</div>
              <div className="pillar-card__abbr">{p.abbr}</div>
              <p className="pillar-card__desc">{p.desc}</p>
              <div className="pillar-card__cta">Explore →</div>
            </a>
          ))}
        </div>

        {/* Computer types comparison strip */}
        <div className="comp-types">
          <div className="comp-types__label">Ifa Computer Systems</div>
          <div className="comp-types__row">
            {COMPUTER_TYPES.map((c, i) => (
              <div key={i} className="comp-type" style={{ '--ct-accent': c.accent }}>
                <div className="comp-type__name">{c.name}</div>
                <div className="comp-type__bits">{c.bits}</div>
                <div className="comp-type__system">{c.system}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── IfaBit Section ─────────────────────────────────────────────
function IfaBitSection() {
  const [active, setActive] = useState(2); // default to IFABit

  const bit = BIT_TYPES[active];

  return (
    <section id="ifabit" className="section section--alt">
      <div className="container">
        <div className="section__header">
          <span className="section__eyebrow" style={{ color: '#00d9b8' }}>IfaBit · TOEBit · CENBit · EnergyBit</span>
          <h2 className="section__title">The <span style={{ color: '#00d9b8' }}>Universal Bit</span></h2>
          <p className="section__desc">
            IFABit is Nature's own information unit — the fundamental building block of all computation.
            It unifies classical bits, quantum bits, and generalized N-its within the IFA Binary System,
            grounded in the Ogbe–Oyeku pair: the primal duality of all information.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="bit-tabs">
          {BIT_TYPES.map((b, i) => (
            <button
              key={i}
              className={`bit-tab${active === i ? ' bit-tab--active' : ''}`}
              style={{ '--bt-accent': b.accent }}
              onClick={() => setActive(i)}
            >
              <div className="bit-tab__symbol">{b.symbol}</div>
              <div className="bit-tab__name">{b.name}</div>
            </button>
          ))}
        </div>

        {/* Active bit detail */}
        <div className="bit-detail" style={{ '--bd-accent': bit.accent }}>
          <div className="bit-detail__left">
            <div className="bit-detail__symbol-large">{bit.symbol}</div>
            <div className="bit-detail__meta-grid">
              <div className="bit-detail__meta-item">
                <div className="bit-detail__meta-label">States</div>
                <div className="bit-detail__meta-val" style={{ color: bit.accent }}>{bit.states}</div>
              </div>
              <div className="bit-detail__meta-item">
                <div className="bit-detail__meta-label">Framework</div>
                <div className="bit-detail__meta-val" style={{ color: bit.accent }}>{bit.framework}</div>
              </div>
            </div>
          </div>
          <div className="bit-detail__right">
            <div className="bit-detail__name">{bit.name}</div>
            <p className="bit-detail__desc">{bit.desc}</p>
          </div>
        </div>

        {/* Ogbe–Oyeku pair */}
        <div className="odu-pair">
          <div className="odu-pair__side" style={{ '--op-col': '#f5c518' }}>
            <div className="odu-pair__glyph">O</div>
            <div className="odu-pair__name">Ogbe</div>
            <div className="odu-pair__tags">
              <span>Energy</span><span>IfaZero</span><span>0</span>
            </div>
          </div>
          <div className="odu-pair__divider">
            <div className="odu-pair__line" />
            <div className="odu-pair__label">IFABit Pair</div>
            <div className="odu-pair__arrow">⟷</div>
            <div className="odu-pair__line" />
          </div>
          <div className="odu-pair__side" style={{ '--op-col': '#e8ecf5' }}>
            <div className="odu-pair__glyph">|</div>
            <div className="odu-pair__name">Oyeku</div>
            <div className="odu-pair__tags">
              <span>Anergy</span><span>IfaOne</span><span>1</span>
            </div>
          </div>
        </div>

        <div className="section__cta-row">
          <a
            href="https://toe.cenproject.org/ifabit-overview/"
            className="btn btn--outline"
            target="_blank"
            rel="noopener noreferrer"
            style={{ '--btn-col': '#00d9b8' }}
          >
            Full IfaBit Overview →
          </a>
        </div>
      </div>
    </section>
  );
}

// ── Ifa Binary Encoding Scheme ────────────────────────────────
function IfaBinaryEncoding() {
  return (
    <section className="ifa-binary">
      <div className="ifa-binary__inner">
        <p className="ifa-binary__tag">Universal Encoding Primitives</p>
        <h2 className="ifa-binary__title">The Ifa Binary Encoding Scheme</h2>
        <p className="ifa-binary__subtitle">The TOEBit (IFABit) · The Bit for Everything (BitoE)</p>
        <p className="ifa-binary__desc">
          IfaZero (Ogbe) and IfaOne (Oyeku) are the Universal Energy–Anergy Pair — the Primordial Ancestors
          of all kinds of numbers. Known as Ifa Numbers (ToE Numbers), IfaZero and IfaOne are not the same
          as 0 and 1 in modern mathematics or computing. <strong>IfaNumbers</strong> carry multiple
          meta-representations across the IFA System.
        </p>

        <div className="ifa-binary__duo">
          {/* ── Ogbe ── */}
          <div className="ifa-binary__card ifa-binary__card--ogbe">
            <div className="ifa-binary__symbol">
              <span className="ifa-binary__glyph ifa-binary__glyph--ogbe">O</span>
              <span className="ifa-binary__glyph-label">IfaCircle · Energy (Ogbe)</span>
            </div>
            <div className="ifa-binary__card-body">
              <h3 className="ifa-binary__card-name">
                <span className="ifa-binary__card-name--ogbe">Ogbe</span>
                <span className="ifa-binary__card-name-dash"> — </span>
                <span className="ifa-binary__card-name-sub">Energy</span>
              </h3>
              <p className="ifa-binary__card-desc">
                The most fundamental Building Block of Everything (BBoE) — the Universal Building Block of
                all "building blocks" in modern science. Ogbe is Energy itself: the primordial, active,
                creative force.
              </p>
              <div className="ifa-binary__meta-label">Meta-Representations</div>
              <ul className="ifa-binary__metas">
                <li className="ifa-binary__meta">
                  <span className="ifa-binary__meta-glyph ifa-binary__meta-glyph--oyeku">|</span>
                  <div className="ifa-binary__meta-text">
                    <strong>IfaLine</strong>
                    <p>The Dual Form of Ogbe — the IfA Line. Not 1 (one) in modern math or bit.</p>
                  </div>
                </li>
                <li className="ifa-binary__meta">
                  <span className="ifa-binary__meta-glyph ifa-binary__meta-glyph--ogbe">O</span>
                  <div className="ifa-binary__meta-text">
                    <strong>IfaCircle · IfaZero</strong>
                    <p>Circular form; its shape. Not zero (0) in modern math or bit.</p>
                  </div>
                </li>
                <li className="ifa-binary__meta">
                  <img className="ifa-binary__meta-glyph--inf-img" src="./images/duoinfinity_logo.png" alt="DuoInfinity Symbol" />
                  <div className="ifa-binary__meta-text">
                    <strong>DuoInfinity · InfinitoE</strong>
                    <p>Ifa Infinity — crossed with ∞; renders circling. The Infinity for Everything.</p>
                  </div>
                </li>
                <li className="ifa-binary__meta">
                  <img className="ifa-binary__meta-glyph ifa-binary__meta-glyph--img" src="./images/IfaZero.png" alt="IfaZero Metarepresentation" />
                  <div className="ifa-binary__meta-text">
                    <strong>IfaZero Metarepresentation</strong>
                    <p>Circle with clockwise arrow on the right — the Energy (Ogbe) directional symbol.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* ── Oyeku ── */}
          <div className="ifa-binary__card ifa-binary__card--oyeku">
            <div className="ifa-binary__symbol">
              <span className="ifa-binary__glyph ifa-binary__glyph--oyeku">|</span>
              <span className="ifa-binary__glyph-label">IfaLine · Anergy (Oyeku)</span>
            </div>
            <div className="ifa-binary__card-body">
              <h3 className="ifa-binary__card-name">
                <span className="ifa-binary__card-name--oyeku">Oyeku</span>
                <span className="ifa-binary__card-name-dash"> — </span>
                <span className="ifa-binary__card-name-sub">Anergy</span>
              </h3>
              <p className="ifa-binary__card-desc">
                Non-Energy — the Dual of Ogbe. Oyeku is Anergy: the complementary, receptive, potential
                force. Together with Ogbe it generates all the remaining 254 Odu Ifa.
              </p>
              <div className="ifa-binary__meta-label">Meta-Representations</div>
              <ul className="ifa-binary__metas">
                <li className="ifa-binary__meta">
                  <span className="ifa-binary__meta-glyph ifa-binary__meta-glyph--dualline">‖</span>
                  <div className="ifa-binary__meta-text">
                    <strong>Dual IfaLine</strong>
                    <p>Primary form of Oyeku — the Dual of the Ogbe IfaLine.</p>
                  </div>
                </li>
                <li className="ifa-binary__meta">
                  <span className="ifa-binary__meta-glyph ifa-binary__meta-glyph--oyeku">|</span>
                  <div className="ifa-binary__meta-text">
                    <strong>IfaLine · IfaOne</strong>
                    <p>Not the same as 1 (one) in modern math or bit.</p>
                  </div>
                </li>
                <li className="ifa-binary__meta">
                  <img className="ifa-binary__meta-glyph--inf-img" src="./images/duoninfinity_logo.png" alt="DuoNinfinity Symbol" />
                  <div className="ifa-binary__meta-text">
                    <strong>DuoInfinity · NinfinitoE</strong>
                    <p>Ifa Ninfinity — DuoInfinity with "J" dash. NanInfinity. Dual of Infinity.</p>
                  </div>
                </li>
                <li className="ifa-binary__meta">
                  <img className="ifa-binary__meta-glyph ifa-binary__meta-glyph--img" src="./images/IfaOne.png" alt="IfaOne Metarepresentation" />
                  <div className="ifa-binary__meta-text">
                    <strong>IfaOne Metarepresentation</strong>
                    <p>Circle with counterclockwise arrow on the left — the Anergy (Oyeku) directional symbol.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="ifa-binary__axiom">
          <p className="ifa-binary__connector">
            <span className="ifa-binary__emdash">—</span>
            {' '}is the IfaConnector or IfaLink.
          </p>
          <blockquote className="ifa-binary__quote">
            "IfaZero (Ogbe) and IfaOne (Oyeku) are the Primordial Ancestors of all numbers and are not
            the same as zero (0) and one (1) in modern mathematics or computing."
          </blockquote>
        </div>
      </div>
    </section>
  );
}

// ── Ifa Information Section ────────────────────────────────────
function InformationSection() {
  return (
    <section id="information" className="section">
      <div className="container">
        <div className="section__header">
          <span className="section__eyebrow" style={{ color: '#4361ee' }}>InfoE · Information for Everything</span>
          <h2 className="section__title">Ifa <span style={{ color: '#4361ee' }}>Information</span></h2>
          <p className="section__desc">
            Ifa Information (InfoE) is the container and fundamental building block of all theories and
            models of information science — from classical to quantum to consciousness-based information.
            The CEN Matrix connects every information theory under one unified Ifa framework.
          </p>
        </div>

        <div className="info-grid">
          {INFO_COMPONENTS.map((c, i) => (
            <div key={i} className="info-card" style={{ '--ic-accent': c.accent }}>
              <div className="info-card__icon">{c.icon}</div>
              <div className="info-card__name">{c.name}</div>
              <p className="info-card__desc">{c.desc}</p>
            </div>
          ))}
        </div>

        <div className="section__cta-row">
          <a
            href="https://toe.cenproject.org/ifa-information/"
            className="btn btn--outline"
            target="_blank"
            rel="noopener noreferrer"
            style={{ '--btn-col': '#4361ee' }}
          >
            Explore Ifa Information →
          </a>
        </div>
      </div>
    </section>
  );
}

// ── Ifa Algorithm + Programming Section ───────────────────────
function AlgorithmSection() {
  return (
    <section id="algorithm" className="section section--alt">
      <div className="container">
        <div className="section__header">
          <span className="section__eyebrow" style={{ color: '#f5c518' }}>Ifalgo · AlgoE · TOE Algorithm · CEN Algorithm</span>
          <h2 className="section__title">Ifa Algorithm <span style={{ color: '#f5c518' }}>&amp; Programming</span></h2>
          <p className="section__desc">
            The Ifalgorithm (Ifalgo) is the Algorithm for Everything — the foundational integration tool
            within IFA Mathematics that unifies all algorithms across every field. Ifa Programming applies
            these principles to write software, design systems, and engineer solutions through IfaLogic and OrisaLogic.
          </p>
        </div>

        <div className="algo-layout">
          <div className="algo-principles">
            {ALGO_PRINCIPLES.map((p, i) => (
              <div key={i} className="algo-principle" style={{ '--ap-accent': p.accent }}>
                <div className="algo-principle__num">{p.n}</div>
                <div className="algo-principle__body">
                  <div className="algo-principle__title">{p.title}</div>
                  <p className="algo-principle__desc">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="algo-aside">
            <div className="algo-aside__card">
              <div className="algo-aside__label">Core Foundation</div>
              <div className="algo-aside__val">16 Major Odu Ifa</div>
              <p className="algo-aside__sub">The 16 natural laws serving as axiomatic constants for all algorithmic reasoning</p>
            </div>
            <div className="algo-aside__card">
              <div className="algo-aside__label">Technical Methods</div>
              <div className="algo-aside__val">AlgoEs · IfaGebra</div>
              <p className="algo-aside__sub">Energy-based transformations powering all Ifa algorithmic computations</p>
            </div>
            <div className="algo-aside__card">
              <div className="algo-aside__label">Applications</div>
              <div className="algo-aside__val">Ifa Technologies</div>
              <p className="algo-aside__sub">Ifa Networks, Ifa Engineering, and all implementation strategies across the IFA Internet</p>
            </div>
            <div className="algo-aside__cta-block">
              <a
                href="https://toe.cenproject.org/ifa-algorithm/"
                className="btn btn--outline"
                target="_blank"
                rel="noopener noreferrer"
                style={{ '--btn-col': '#f5c518' }}
              >
                Ifa Algorithm →
              </a>
              <a
                href="https://toe.cenproject.org/ifa-algorithm/"
                className="btn btn--outline"
                target="_blank"
                rel="noopener noreferrer"
                style={{ '--btn-col': '#e9498a' }}
              >
                Ifa Programming →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Ifa Language Section ───────────────────────────────────────
function LanguageSection() {
  return (
    <section id="language" className="section">
      <div className="container">
        <div className="section__header">
          <span className="section__eyebrow" style={{ color: '#7c4dff' }}>IfaLang · IfaPL · Language for Everything</span>
          <h2 className="section__title">Ifa <span style={{ color: '#7c4dff' }}>Language</span></h2>
          <p className="section__desc">
            IfaLang is the Language for Everything — one meta-language built on a single foundational
            symbol: Energy (the IfaLine). Every programming language, formal system, and natural language
            is a dialect of this universal grammar. Code is consciousness expressed as structure.
          </p>
        </div>

        <div className="lang-grid">
          {LANG_FEATURES.map((f, i) => (
            <div key={i} className="lang-card" style={{ '--lc-accent': f.accent }}>
              <div className="lang-card__icon">{f.icon}</div>
              <div className="lang-card__name">{f.name}</div>
              <div className="lang-card__sub">{f.subtitle}</div>
              <p className="lang-card__desc">{f.desc}</p>
            </div>
          ))}
        </div>

        <blockquote className="comp-axiom">
          "IfaLang represents all fields of knowledge, systems, technologies, formulas, languages,
          data, graphics, and code — through the single unified Energy framework: CEN (Ogbe)."
          <cite>— Ifa Language · IfaPL · The IFA Internet</cite>
        </blockquote>

        <div className="section__cta-row">
          <a
            href="https://toe.cenproject.org/ifa-language/"
            className="btn btn--outline"
            target="_blank"
            rel="noopener noreferrer"
            style={{ '--btn-col': '#7c4dff' }}
          >
            Explore Ifa Language →
          </a>
        </div>
      </div>
    </section>
  );
}

// ── CTA / Ifa Computer Section ─────────────────────────────────
function ComputerCTASection() {
  return (
    <section className="section section--cta">
      <div className="container">
        <div className="cta-block">
          <div className="cta-block__bg" />
          <div className="cta-block__inner">
            <div className="cta-block__eyebrow">The Ifa Computer · ComputoE · TOE Computer</div>
            <h2 className="cta-block__title">The Computer of Energy<br />(ComputoE)</h2>
            <p className="cta-block__desc">
              The Ifa Computer redefines meta-computation — a universal computational system
              built on the 256 Odu Ifa as its instruction Set, unifying classical computers,
              quantum computers, and all other computational paradigms into one coherent Structure.
            </p>
            <div className="cta-block__actions">
              <a
                href="https://toe.cenproject.org/ifa-computer/"
                className="btn btn--primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Explore the Ifa Computer →
              </a>
              <a
                href="https://toe.cenproject.org"
                className="btn btn--ghost"
                target="_blank"
                rel="noopener noreferrer"
              >
                The IFA Internet
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Footer ─────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__inner">
          <div className="footer__brand">
            <div className="footer__logo">
              <span className="footer__logo-icon">⬡</span>
              <span className="footer__logo-name">IFA Computing</span>
            </div>
            <p className="footer__tagline">ComputoE — The Computer for Everything</p>
            <p className="footer__tagline" style={{ marginTop: 4, fontSize: '0.8rem' }}>
              Part of{' '}
              <a href="https://ifainternet.org" style={{ color: 'var(--gold)' }}>The IFA Internet</a>
              {' · '}
              <a href="https://cenproject.org" style={{ color: 'var(--gold)' }}>CENProject</a>
            </p>
          </div>
          <nav className="footer__links">
            <a href="https://ifainternet.org" className="footer__link" target="_blank" rel="noopener noreferrer">← IFA Internet</a>
            <a href="https://toe.cenproject.org/ifa-computer/" className="footer__link" target="_blank" rel="noopener noreferrer">Ifa Computer</a>
            <a href="https://toe.cenproject.org/ifabit-overview/" className="footer__link" target="_blank" rel="noopener noreferrer">IfaBit</a>
            <a href="https://toe.cenproject.org/ifa-information/" className="footer__link" target="_blank" rel="noopener noreferrer">Ifa Information</a>
            <a href="https://toe.cenproject.org/ifa-algorithm/" className="footer__link" target="_blank" rel="noopener noreferrer">Ifa Algorithm</a>
            <a href="https://toe.cenproject.org/ifa-language/" className="footer__link" target="_blank" rel="noopener noreferrer">Ifa Language</a>
          </nav>
        </div>
        <div className="footer__bottom">
          <span className="footer__copy">© CENProject — toe.cenproject.org</span>
          <span className="footer__axiom">"Consciousness-Energy (CEN) is everything that really exists."</span>
        </div>
      </div>
    </footer>
  );
}

// ── App ────────────────────────────────────────────────────────
function App() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <PillarsSection />
        <IfaBitSection />
        <IfaBinaryEncoding />
        <InformationSection />
        <AlgorithmSection />
        <LanguageSection />
        <ComputerCTASection />
      </main>
      <Footer />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
