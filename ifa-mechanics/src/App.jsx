/* ─────────────────────────────────────────────────────────────
   Ifa Mechanics · MechoE — The Mechanics of Everything
   React 18 + JSX via Babel Standalone · no build step
   CENProject · ifainternet.org/ifa-mechanics/
───────────────────────────────────────────────────────────── */

const { useState, useEffect, useRef } = React;

const DISCIPLINES = [
  {
    id: 'ifa-analysis', name: 'Ifa Analysis', abbr: 'AnalysoE', tag: 'Analysis',
    glyph: '∑', accent: '#4361ee',
    externalUrl: 'https://toe.cenproject.org/ifa-analysis/', localUrl: '/ifa-analysis/',
    chips: ['Analytical System', 'AnalysoE', 'Ifanalysis', 'Cross-Domain', 'IFA Framework'],
    desc: 'The unified analytical platform — Ifanalysis integrates every IFA discipline through the lens of AnalysoE, the Analysis of Everything.',
  },
  {
    id: 'ifalabs', name: 'IfaLabs', abbr: 'TOELabs', tag: 'Research',
    glyph: '⬡', accent: '#00e07c',
    externalUrl: 'https://toe.cenproject.org/ifalabs-toelabs/', localUrl: '/ifa-labs/',
    chips: ['E.T.H.I.C.S', 'IfaSpace', 'Research', 'Innovation', 'Labs'],
    desc: 'The research and innovation hub of the IFA Internet — blending African cultural heritage with IFA Principles across all knowledge fields.',
  },
  {
    id: 'calculus', name: 'Ifa Calculus', abbr: 'TOE Calculus', tag: 'Mathematics',
    glyph: '∫', accent: '#4361ee',
    externalUrl: 'https://toe.cenproject.org/ifa-calculus-toe-calculus/', localUrl: null,
    chips: ['Differentiation', 'Integration', 'IfaDifferintegral', 'Ifa Transform', 'Fractional Calculus'],
    desc: 'The universal container for all calculus types — bridging mathematics, physics, and consciousness mechanics through continuous change.',
  },
  {
    id: 'ifagebra', name: 'IfaGebra', abbr: 'AlgebroE · TOEGebra', tag: 'Algebra',
    glyph: '⊕', accent: '#7c4dff',
    externalUrl: 'https://toe.cenproject.org/ifagebra-overview/', localUrl: null,
    chips: ['IFA Field Theory', 'NeuroGebra', 'BioGebra', 'Ifa Transforms', 'Consciousness Algebra'],
    desc: 'The Algebra of Everything — Ogbe energy field as the fundamental algebraic structure spanning all knowledge domains.',
  },
  {
    id: 'mathematics', name: 'IFA Mathematica', abbr: 'TOE Mathematics', tag: 'Foundation',
    glyph: '∑', accent: '#f5c518',
    externalUrl: 'https://toe.cenproject.org/ifa-mathematics-toe-mathematics/', localUrl: null,
    chips: ['16 IFA Axioms', 'Consciousness Mechanics', 'NumoEs', 'IFABOK', 'Knowledge Laws'],
    desc: 'A new way of thinking — Mathematics as Energy to study all knowledge fields through the 16 foundational Axioms of Everything.',
  },
  {
    id: 'physics', name: 'Ifa Physics', abbr: 'ToEPhysics · PoE', tag: 'Physics',
    glyph: '⚛', accent: '#00d9b8',
    externalUrl: 'https://toe.cenproject.org/ifa-physics/', localUrl: null,
    chips: ['Standard Model', 'Quantum Field', 'Consciousness Physics', 'Ifagrams', '16 Ifa Codes'],
    desc: 'The Physics of Everything — CEN Energy as the unified understanding of cosmos structure, universal dynamics, and development.',
  },
  {
    id: 'engineering', name: 'Ifa Engineering', abbr: 'EngoE', tag: 'Engineering',
    glyph: '⚙', accent: '#ff6b35',
    externalUrl: 'https://toe.cenproject.org/ifa-engineering/', localUrl: null,
    chips: ['EnGebras', 'Ifaxioms', 'CEN Matrix', 'Green Engineering', 'Systems Design'],
    desc: 'The Engineering of Everything — unifying all engineering disciplines through the CEN Matrix and Consciousness-Energy principles.',
  },
  {
    id: 'mechanics', name: 'Ifa Mechanics', abbr: 'MechoE · TOE Mechanics', tag: 'Core',
    glyph: '◎', accent: '#f59e0b',
    externalUrl: 'https://toe.cenproject.org/ifa-mechanics-toe-mechanics/', localUrl: '/ifa-mechanics/',
    chips: ['Knowledge Laws', 'Ifa Operators', 'Universal Dynamics', 'MetaMathematics', 'Consciousness Mechanics'],
    desc: 'Consciousness Mechanics — studying all disciplines mathematically as energy forms within the IFA Binary System of Education.',
  },
  {
    id: 'modelling', name: 'Ifa Modelling', abbr: 'ModloE · ToE Modeling', tag: 'Modelling',
    glyph: '⬟', accent: '#a855f7',
    externalUrl: 'https://toe.cenproject.org/ifa-modeling-toe-modeling/', localUrl: null,
    chips: ['Ifatoms', 'IfaKey · IfaLock', 'Ifa Entanglement', 'Meta-Laws', 'Orisa Modelling'],
    desc: 'Using Odu Ifa and Odu Oosa codes to create meta-models of all theories, systems, and knowledge structures.',
  },
  {
    id: 'periodic-table', name: 'Ifa Periodic Table', abbr: 'IfaPT', tag: 'Tool',
    glyph: '⊞', accent: '#06b6d4',
    externalUrl: 'https://toe.cenproject.org/ifa-periodic-table/', localUrl: '/ifa-periodic-table/',
    chips: ['256 Odu', 'IFABit System', 'Knowledge Map', 'Interactive', 'Periodic System'],
    desc: 'The 256 Odu Ifa mapped as a periodic table — an interactive knowledge navigation and mechanical reference system.',
  },
  {
    id: 'games', name: 'Ifa Games', abbr: 'TOEGames', tag: 'Applied',
    glyph: '◈', accent: '#eab308',
    externalUrl: 'https://www.playifagames.org/', localUrl: null,
    chips: ['Ifa STEAM', 'Knowledge Games', 'Ifa Philosophy', 'Science Games', 'Interactive Learning'],
    desc: 'Gamified STEAM learning through Ifa knowledge — making deep mechanical concepts accessible, engaging, and enjoyable.',
  },
];

const SPECTRUM = [
  { name: 'Classical',     icon: '⚙', accent: '#f59e0b', desc: 'Ifa Mechanics applies the 16 IFA Axioms to Classical Mechanics — motion, force, mass, and energy — reframing Newton\'s laws within the binary intelligence of the 256 Odu Ifa.' },
  { name: 'Quantum',       icon: '⚛', accent: '#00d9b8', desc: 'Ifa Quantum Mechanics (IQM) extends the principles and theories of quantum mechanics to every field of knowledge — where superposition, entanglement, uncertainty, and others are studied through IfaLens.' },
  { name: 'Consciousness', icon: '⬡', accent: '#00e07c', desc: 'Consciousness Mechanics treats all phenomena as energyforms in IfaSpace — every discipline, every law, every force understood as consciousness in motion.' },
  { name: 'Structural',    icon: '⊞', accent: '#7c4dff', desc: 'Structural Mechanics uses Ifa Modelling and Ifatoms to map the deep architecture of mechanical systems — from molecular bonds to cosmic structures.' },
  { name: 'Mathematical',  icon: '∑',  accent: '#f5c518', desc: 'Mathematical Mechanics applies IFA Mathematica, Ifa Calculus, and IfaGebra to express every mechanical law in the universal language of the IFA Axioms.' },
  { name: 'Orisa',         icon: '⬡', accent: '#e9498a', desc: 'Orisa Mechanics — the living, dynamic dual of Ifa Mechanics — applies Orisa Philosophy as mechanical archetypes: Ogun as force, Osun as flow, Sango as dynamic energy.' },
];

const STATS = [
  { value: '256', label: 'Odu Ifa',     sub: 'Mechanical Codes',   glyph: '⊞' },
  { value: '16',  label: 'IFA Axioms',  sub: 'Laws of Motion',     glyph: '∑' },
  { value: '11+', label: 'Disciplines', sub: 'Integrated Fields',  glyph: '⬡' },
  { value: '∞',   label: 'MechoE',      sub: 'Mechanical Scope',   glyph: '◎' },
];

const ORISA_MECHS = [
  { name: 'Ogun',    role: 'Force & Motion',     symbol: '⌇', accent: '#ff6b35', desc: 'The archetypal force — iron, momentum, and directed mechanical energy.' },
  { name: 'Osun',    role: 'Flow & Dynamics',    symbol: '≋', accent: '#f5c518', desc: 'Fluid dynamics, harmonic flow, and the mechanics of continuous energy.' },
  { name: 'Sango',   role: 'Power & Resonance',  symbol: '⌁', accent: '#e9498a', desc: 'Dynamic energy, electromagnetic resonance, and the mechanics of power.' },
  { name: 'Obatala', role: 'Structure & Form',   symbol: '◎', accent: '#e8ecf2', desc: 'Structural integrity, form mechanics, and the architecture of equilibrium.' },
  { name: 'Yemoja',  role: 'Wave & Field',       symbol: '≈', accent: '#06b6d4', desc: 'Wave mechanics, field theory, and the expansive mechanics of deep systems.' },
  { name: 'Esu',     role: 'Duality & Transform',symbol: '⟷', accent: '#a855f7', desc: 'Transformation mechanics, boundary conditions, and the duality operator.' },
];

const PHYS_SYMBOLS = ['F','m','a','v','\u03c9','\u2207','\u2202','\u03c1','\u03bb','\u03c4','\u03c3','\u03b5','\u03a6','E','p','L','\u222e','\u221d','\u210f','\u03bc'];

const IFATIZE_ASPECTS = [
  {
    num: '01', icon: '\u25ce',
    title: 'Ifa Reduction Technique',
    body: 'Ifatization is a key Ifa Reduction technique in Consciousness Mechanics \u2014 the process of reducing everything in existence, including Existence itself, to its inherent Energy. In IFABOK, this inherent Energy is called Odu.',
    accent: '#f59e0b',
  },
  {
    num: '02', icon: '\u2211',
    title: 'Mathematical Energyform',
    body: 'To ifatize is to express any element of nature \u2014 or Nature itself \u2014 as a mathematical energyform. The result of ifatization is always an energyform representation within the IFA mathematical framework.',
    accent: '#f97316',
  },
  {
    num: '03', icon: '\u2b21',
    title: 'Unification & Integration of Everything',
    body: 'The core purpose of Ifatization is the Unification and Integration of Everything (UIoE) \u2014 bringing every discipline, phenomenon, and field of knowledge into a single coherent energyform framework governed by the 16 IFA Axioms.',
    accent: '#00e07c',
  },
  {
    num: '04', icon: '\u221e',
    title: 'Universal Application',
    body: 'Ifatization applies to everything without exception: physical matter, consciousness, social systems, mathematics, language, and Existence itself. Nothing is beyond ifatization \u2014 every entity has an Odu (inherent Energy).',
    accent: '#7c4dff',
  },
];

// ── Header ────────────────────────────────────────────────────
function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return (
    <header className={`site-header${scrolled ? ' site-header--scrolled' : ''}`}>
      <div className="header__inner">
        <a href="/" className="header__logo">
          <span className="header__logo-mark">◎</span>
          <span className="header__logo-ifa">Ifa</span>
          <span className="header__logo-rest">Mechanics</span>
          <span className="header__logo-sep">·</span>
          <span className="header__logo-tag">MechoE</span>
        </a>
        <nav className="header__nav">
          <a href="#disciplines"  className="header__link">Disciplines</a>
          <a href="#spectrum"    className="header__link">Spectrum</a>
          <a href="#ifatization" className="header__link">Ifatization</a>
          <a href="#orisa"       className="header__link">Orisa</a>
          <a href="#about"       className="header__link">About</a>
          <a href="https://toe.cenproject.org/ifa-mechanics-toe-mechanics/" target="_blank" className="header__cta">
            Open Platform →
          </a>
        </nav>
      </div>
    </header>
  );
}

// ── Hero ──────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="hero">
      <div className="hero__grid" aria-hidden="true" />
      <div className="hero__orb hero__orb--1" aria-hidden="true" />
      <div className="hero__orb hero__orb--2" aria-hidden="true" />
      <div className="hero__orb hero__orb--3" aria-hidden="true" />

      <div className="hero__symbols" aria-hidden="true">
        {PHYS_SYMBOLS.map((sym, i) => (
          <span key={i} className="hero__sym" style={{
            '--sx':  `${(i * 4.9 + 3) % 94}%`,
            '--sy':  `${(i * 13.1 + 6) % 86}%`,
            '--sd':  `${i * 0.6}s`,
            '--ss':  `${5 + (i % 6) * 0.8}s`,
            '--sop': `${0.06 + (i % 5) * 0.04}`,
          }}>{sym}</span>
        ))}
      </div>

      <div className="hero__inner">
        <div className="hero__eyebrow">
          <span className="hero__eyebrow-line" />
          <span className="hero__eyebrow-text">MechoE — The Mechanics of Everything</span>
          <span className="hero__eyebrow-line" />
        </div>

        <h1 className="hero__title">
          <span className="hero__title-ifa">Ifa</span>
          <br />
          <span className="hero__title-rest">Mechanics</span>
        </h1>

        <p className="hero__sub">
          A unified mechanics platform integrating IFA Mathematica, Ifa Calculus,
          Ifa Physics, IfaGebra, Ifa Engineering, and Consciousness Mechanics —
          grounded in the 256 Odu Ifa.
        </p>

        <div className="hero__actions">
          <a href="#disciplines" className="hero__btn hero__btn--primary">
            <span>Explore Disciplines</span>
            <span className="hero__btn-arrow">→</span>
          </a>
          <a href="https://toe.cenproject.org/ifa-mechanics-toe-mechanics/" target="_blank" className="hero__btn hero__btn--ghost">
            TOE Mechanics Platform
          </a>
        </div>

        <div className="hero__odu" aria-hidden="true">
          <span className="hero__odu-label">Odu Ifa Binary</span>
          <div className="hero__odu-bits">
            {'O|OO|O|O'.split('').map((c, i) => (
              <span key={i} className={`hero__odu-bit hero__odu-bit--${c === 'O' ? 'ogbe' : 'oyeku'}`}>{c}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="hero__scroll-hint" aria-hidden="true">
        <span className="hero__scroll-line" />
        <span className="hero__scroll-label">Scroll</span>
      </div>
    </section>
  );
}

// ── Stats ─────────────────────────────────────────────────────
function StatsBar() {
  return (
    <div className="stats-bar">
      <div className="stats-bar__inner">
        {STATS.map((s, i) => (
          <div key={s.label} className="stats-item">
            <div className="stats-item__glyph">{s.glyph}</div>
            <div className="stats-item__body">
              <span className="stats-item__value">{s.value}</span>
              <div className="stats-item__meta">
                <span className="stats-item__label">{s.label}</span>
                <span className="stats-item__sub">{s.sub}</span>
              </div>
            </div>
            {i < STATS.length - 1 && <div className="stats-item__divider" />}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Discipline Card ───────────────────────────────────────────
function DisciplineCard({ d, index }) {
  return (
    <article className="disc-card" style={{ '--dc-accent': d.accent }}>
      <div className="disc-card__top">
        <div className="disc-card__index">
          {String(index + 1).padStart(2, '0')}
        </div>
        <span className="disc-card__tag">{d.tag}</span>
      </div>
      <div className="disc-card__glyph-wrap">
        <span className="disc-card__glyph">{d.glyph}</span>
        <div className="disc-card__glyph-bg" />
      </div>
      <div className="disc-card__body">
        <h3 className="disc-card__name">{d.name}</h3>
        <p className="disc-card__abbr">{d.abbr}</p>
        <p className="disc-card__desc">{d.desc}</p>
        <div className="disc-card__chips">
          {d.chips.map(c => <span key={c} className="disc-chip">{c}</span>)}
        </div>
      </div>
      <div className="disc-card__actions">
        {d.localUrl && (
          <a href={d.localUrl} className="disc-btn disc-btn--primary" target="_blank">Open App →</a>
        )}
        <a href={d.externalUrl} className={`disc-btn ${d.localUrl ? 'disc-btn--ghost' : 'disc-btn--primary'}`} target="_blank">
          {d.localUrl ? 'Learn More' : 'Explore →'}
        </a>
      </div>
    </article>
  );
}

function DisciplinesSection() {
  return (
    <section className="disciplines" id="disciplines">
      <div className="section__inner">
        <div className="section__header">
          <span className="section__eyebrow">Integrated Disciplines</span>
          <h2 className="section__title">The Mechanical Ecosystem</h2>
          <p className="section__sub">
            Eleven interconnected fields of knowledge — unified through Ifa Mechanics —
            forming a complete mechanical System for Everything (SystoE).
          </p>
        </div>
        <div className="disc-grid">
          {DISCIPLINES.map((d, i) => <DisciplineCard key={d.id} d={d} index={i} />)}
        </div>
      </div>
    </section>
  );
}

// ── Spectrum ──────────────────────────────────────────────────
function SpectrumSection() {
  const [active, setActive] = useState(0);
  const s = SPECTRUM[active];
  return (
    <section className="spectrum" id="spectrum">
      <div className="spectrum__bg-pattern" aria-hidden="true" />
      <div className="section__inner">
        <div className="section__header">
          <span className="section__eyebrow">Mechanics Spectrum</span>
          <h2 className="section__title">∞ Dimensions of Mechanics</h2>
          <p className="section__sub">
            IfaMechanics operates across a full spectrum — from classical rigor to conscious inquiry.
          </p>
        </div>

        <div className="spectrum__layout">
          <div className="spectrum__tabs">
            {SPECTRUM.map((sp, i) => (
              <button
                key={sp.name}
                className={`spectrum__tab${i === active ? ' spectrum__tab--active' : ''}`}
                style={{ '--st-accent': sp.accent }}
                onClick={() => setActive(i)}
              >
                <span className="spectrum__tab-icon">{sp.icon}</span>
                <span className="spectrum__tab-name">{sp.name}</span>
                <span className="spectrum__tab-arrow">→</span>
              </button>
            ))}
          </div>

          <div className="spectrum__panel" style={{ '--sd-accent': s.accent }}>
            <div className="spectrum__panel-header">
              <div className="spectrum__panel-num">
                {String(active + 1).padStart(2, '0')} / {String(SPECTRUM.length).padStart(2, '0')}
              </div>
              <div className="spectrum__panel-icon">{s.icon}</div>
            </div>
            <h3 className="spectrum__panel-name">{s.name} Mechanics</h3>
            <div className="spectrum__panel-bar" />
            <p className="spectrum__panel-desc">{s.desc}</p>
            <div className="spectrum__panel-footer">
              <span className="spectrum__panel-label">IfaMechanics · MechoE</span>
              <div className="spectrum__panel-dots">
                {SPECTRUM.map((_, i) => (
                  <button
                    key={i}
                    className={`spectrum__dot${i === active ? ' spectrum__dot--active' : ''}`}
                    style={{ '--sd-accent': SPECTRUM[i].accent }}
                    onClick={() => setActive(i)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Ifatization ───────────────────────────────────────────────
function IfatizationSection() {
  const COMPARE_ROWS = [
    ['Consciousness Mechanics',     'Quantum Mechanics'],
    ['Reduces to Odu (inherent Energy)', 'Reduces to quanta'],
    ['Universal \u2014 all knowledge domains', 'Confined to microphysics'],
    ['Mathematical energyform',     'Discrete energy packet'],
    ['UIoE \u2014 Unify Everything', 'Quantum field theory'],
    ['ifatize (IfaLang verb)',       'quantize (physics verb)'],
  ];
  return (
    <section className="ifatize-sect" id="ifatization">
      <div className="section__inner">
        <div className="section__header">
          <span className="section__eyebrow">Ifa Reduction Technique</span>
          <h2 className="section__title">Ifatization</h2>
          <p className="section__sub">
            The Consciousness Mechanical equivalent of quantization &mdash; expressing everything
            in existence as mathematical energyform, for the Unification and Integration of Everything (UIoE).
          </p>
        </div>

        <div className="ifatize-layout">
          {/* Left: four aspect cards */}
          <div className="ifatize-cards">
            {IFATIZE_ASPECTS.map(a => (
              <div key={a.num} className="ifatize-card" style={{ '--ia': a.accent }}>
                <div className="ifatize-card__head">
                  <span className="ifatize-card__num">{a.num}</span>
                  <span className="ifatize-card__icon">{a.icon}</span>
                </div>
                <div className="ifatize-card__title">{a.title}</div>
                <p className="ifatize-card__body">{a.body}</p>
              </div>
            ))}
          </div>

          {/* Right: definition + comparison */}
          <div className="ifatize-panel">
            <div className="ifatize-def">
              <div className="ifatize-def__tag">IfaLang &mdash; IFA Language Definition</div>
              <div className="ifatize-def__term">ifatize</div>
              <div className="ifatize-def__meta">verb &middot; IfaLang</div>
              <div className="ifatize-def__body">
                <strong>To express something (anything at all) in terms of Consciousness Energy (CEN)
                or Ogbe &mdash; i.e., as an energyform.</strong>
              </div>
              <div className="ifatize-def__usage">
                <span className="ifatize-def__usage-lbl">Example</span>
                <span className="ifatize-def__usage-ex">
                  &ldquo;To ifatize gravity is to express gravitational force as its inherent Odu energy
                  within the IFA Mechanics framework.&rdquo;
                </span>
              </div>
              <div className="ifatize-def__forms">
                <span>noun: <strong>Ifatization</strong></span>
                <span>&middot;</span>
                <span>result: <strong>Energyform</strong></span>
                <span>&middot;</span>
                <span>energy: <strong>Odu</strong></span>
              </div>
            </div>

            <div className="ifatize-compare">
              <div className="ifatize-compare__head">
                <span className="ifatize-compare__col-ifa">Ifatization</span>
                <span className="ifatize-compare__sep">{'\u27f7'}</span>
                <span className="ifatize-compare__col-qm">Quantization</span>
              </div>
              {COMPARE_ROWS.map(([l, r], i) => (
                <div key={i} className="ifatize-compare__row">
                  <div className="ifatize-compare__cell ifatize-compare__cell--ifa">{l}</div>
                  <div className="ifatize-compare__cell ifatize-compare__cell--qm">{r}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Orisa Mechanics ───────────────────────────────────────────
function OrisaSection() {
  return (
    <section className="orisa-mech" id="orisa">
      <div className="section__inner">

        {/* Duality header */}
        <div className="orisa-mech__duality">
          <div className="orisa-mech__pole">
            <div className="orisa-mech__pole-glyph" style={{ color: '#f59e0b' }}>∑</div>
            <div className="orisa-mech__pole-name">Ifa Mechanics</div>
            <div className="orisa-mech__pole-sub">MechoE</div>
          </div>
          <div className="orisa-mech__bridge">
            <div className="orisa-mech__bridge-sym">⟷</div>
            <div className="orisa-mech__bridge-label">Dual Mechanics</div>
          </div>
          <div className="orisa-mech__pole">
            <div className="orisa-mech__pole-glyph" style={{ color: '#e9498a' }}>⬡</div>
            <div className="orisa-mech__pole-name">Orisa Mechanics</div>
            <div className="orisa-mech__pole-sub">OrisaMech</div>
          </div>
        </div>

        {/* Intro text */}
        <div className="orisa-mech__intro">
          <div className="section__eyebrow">Orisa Mechanics · OrisaMech</div>
          <h2 className="section__title" style={{ textAlign: 'left' }}>
            The Living Dual of Ifa Mechanics
          </h2>
          <p className="orisa-mech__lead">
            Orisa Mechanics is grounded in Orisa Philosophy — the dynamic, embodied counterpart
            to Ifa Mechanics. Where Ifa Mechanics reveals the Universal Binary Code beneath all motion,
            Orisa Mechanics names the Archetypes: Obatala as the Consciousness of Dynamics, Odu as the
            Consciousness of Structure, Ogun as the Consciousness of Force, Osun as the Consciousness of
            Flow, Sango as the Consciousness of Light, Oya as the Consciousness of Change.
          </p>
          <p className="orisa-mech__lead">
            At their intersection: <strong>Ifa-Orisa Mechanics</strong> — revealing Energy (Ogbe)
            as the underlying structure of the energy-force pair in both Classical Mechanics
            and Quantum Mechanics in Physics.
          </p>
        </div>

        {/* Diagrams */}
        <div className="orisa-mech__diagrams">
          <div className="orisa-mech__diagram-card">
            <div className="orisa-mech__diagram-label">Ifa Mechanics — Structural Map</div>
            <img src="./src/ifa-mechanics-diagram.png" alt="Ifa Mechanics Diagram" className="orisa-mech__diagram-img" />
          </div>
          <div className="orisa-mech__diagram-card">
            <div className="orisa-mech__diagram-label">Ifa-Orisa Mechanics — Energy-Force Pair</div>
            <img src="./src/ifa-mechanics-diagram1.png" alt="Ifa Mechanics Diagram 2" className="orisa-mech__diagram-img" />
          </div>
        </div>

        {/* Orisa grid */}
        <div className="orisa-mech__grid">
          {ORISA_MECHS.map(o => (
            <div key={o.name} className="orisa-card" style={{ '--oc-accent': o.accent }}>
              <div className="orisa-card__top">
                <span className="orisa-card__sym">{o.symbol}</span>
                <span className="orisa-card__name">{o.name}</span>
              </div>
              <div className="orisa-card__role">{o.role}</div>
              <p className="orisa-card__desc">{o.desc}</p>
            </div>
          ))}
        </div>

        <p className="orisa-mech__note">
          Also: Obatala (Structure), Oya (Transformation), Sopona (Decay), Osanyin (Field Healing) and more.
        </p>
      </div>
    </section>
  );
}

// ── About ─────────────────────────────────────────────────────
function AboutSection() {
  const features = [
    { icon: '⊞', text: '256 Odu Ifa as the binary code of all mechanical phenomena' },
    { icon: '∑',  text: '16 IFA Axioms as universal laws of motion and consciousness' },
    { icon: '⚛', text: 'Classical, Quantum, and Consciousness Mechanics unified' },
    { icon: '⬡', text: 'Orisa Philosophy as living mechanical archetypes' },
    { icon: '∫',  text: 'Ifa Calculus and IfaGebra as the mathematical language' },
    { icon: '◎', text: 'MechoE — studying all disciplines as energy forms' },
  ];
  return (
    <section className="about" id="about">
      <div className="section__inner">
        <div className="about__grid">
          <div className="about__text">
            <span className="section__eyebrow">About IfaMechanics</span>
            <h2 className="about__title">The Mechanics<br />of Everything</h2>
            <p className="about__para">
              Ifa Mechanics (MechoE) is the unified mechanics framework of the IFA Internet —
              a cross-disciplinary platform that studies all phenomena as motion, force, and energy
              operating within the IFA Binary System of Education.
            </p>
            <p className="about__para">
              At its core, IfaMechanics treats all knowledge as energy — following the 16 IFA Axioms
              to apply mechanical, mathematical, and philosophical analysis simultaneously across
              every discipline.
            </p>
            <ul className="about__features">
              {features.map(f => (
                <li key={f.icon} className="about__feature">
                  <span className="about__feature-icon">{f.icon}</span>
                  <span className="about__feature-text">{f.text}</span>
                </li>
              ))}
            </ul>
            <a href="https://toe.cenproject.org/ifa-mechanics-toe-mechanics/" target="_blank" className="about__link">
              Explore TOE Mechanics Platform →
            </a>
          </div>

          <div className="about__visual">
            <div className="about__axioms-card">
              <div className="about__axioms-header">
                <span className="about__axioms-title">16 IFA Axioms</span>
                <span className="about__axioms-sub">Laws of MechoE</span>
              </div>
              <div className="about__axioms-grid">
                {Array.from({ length: 16 }, (_, i) => (
                  <div key={i} className="about__axiom-cell" style={{ '--ac-delay': `${i * 0.14}s` }}>
                    <span className="about__axiom-num">{i + 1}</span>
                    <span className="about__axiom-bit">{i % 2 === 0 ? 'O' : '|'}</span>
                  </div>
                ))}
              </div>
              <div className="about__axioms-footer">
                <span className="about__axioms-tag">IFA Binary System of Education</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── CTA ───────────────────────────────────────────────────────
function CTASection() {
  return (
    <section className="cta-strip">
      <div className="cta-strip__glow" aria-hidden="true" />
      <div className="section__inner">
        <div className="cta-strip__inner">
          <div className="cta-strip__left">
            <div className="cta-strip__glyph">◎</div>
            <div className="cta-strip__text">
              <h2 className="cta-strip__title">Begin Your Mechanical Analysis</h2>
              <p className="cta-strip__sub">Enter the mechanics ecosystem of the IFA Internet.</p>
            </div>
          </div>
          <div className="cta-strip__actions">
            <a href="https://toe.cenproject.org/ifa-mechanics-toe-mechanics/" target="_blank" className="cta-btn cta-btn--primary">
              TOE Mechanics Platform →
            </a>
            <a href="/" className="cta-btn cta-btn--ghost">← IFA Internet</a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer__inner">
        <div className="footer__top">
          <div className="footer__brand">
            <span className="footer__logo">
              <span className="footer__logo-mark">◎</span>IfaMechanics
            </span>
            <span className="footer__tag">MechoE — The Mechanics of Everything</span>
          </div>
          <div className="footer__links">
            <a href="https://toe.cenproject.org/ifa-mechanics-toe-mechanics/" target="_blank">TOE Mechanics</a>
            <a href="https://toe.cenproject.org/ifa-physics/" target="_blank">Ifa Physics</a>
            <a href="https://toe.cenproject.org/ifa-mathematics-toe-mathematics/" target="_blank">IFA Mathematica</a>
            <a href="https://toe.cenproject.org/ifa-calculus-toe-calculus/" target="_blank">Ifa Calculus</a>
            <a href="https://toe.cenproject.org/ifa-engineering/" target="_blank">Ifa Engineering</a>
            <a href="https://toe.cenproject.org/" target="_blank">toe.cenproject.org</a>
          </div>
        </div>
        <div className="footer__bottom">
          <p className="footer__copy">© 2025 CENProject Innovations Limited. Part of the IFA Internet.</p>
          <div className="footer__odu" aria-hidden="true">
            {'O|OO|O|O'.split('').map((c, i) => (
              <span key={i} className={`footer__bit footer__bit--${c === 'O' ? 'ogbe' : 'oyeku'}`}>{c}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ── App ───────────────────────────────────────────────────────
function App() {
  return (
    <div className="app">
      <Header />
      <HeroSection />
      <StatsBar />
      <DisciplinesSection />
      <SpectrumSection />
      <IfatizationSection />
      <OrisaSection />
      <AboutSection />
      <CTASection />
      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
