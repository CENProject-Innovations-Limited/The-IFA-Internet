/* ─────────────────────────────────────────────────────────────
   Ifanalysis · IFA Analysis Platform
   AnalysoE — The Analysis of Everything
   React 18 + JSX via Babel Standalone · no build step
   CENProject · toe.cenproject.org/ifa-analysis/
───────────────────────────────────────────────────────────── */

const { useState, useEffect } = React;

const DISCIPLINES = [
  {
    id: 'ifalabs',
    name: 'IfaLabs',
    abbr: 'TOELabs',
    tag: 'Research Hub',
    glyph: '⬡',
    accent: '#00e07c',
    externalUrl: 'https://toe.cenproject.org/ifalabs-toelabs/',
    localUrl: '/ifa-labs/',
    chips: ['E.T.H.I.C.S', 'IfaSpace', 'Research', 'Innovation', 'Labs'],
    desc: 'The research and innovation hub of the IFA Internet — blending African cultural heritage with IFA Principles across all knowledge fields.',
  },
  {
    id: 'calculus',
    name: 'Ifa Calculus',
    abbr: 'TOE Calculus',
    tag: 'Mathematics',
    glyph: '∫',
    accent: '#4361ee',
    externalUrl: 'https://toe.cenproject.org/ifa-calculus-toe-calculus/',
    localUrl: null,
    chips: ['Differentiation', 'Integration', 'IfaDifferintegral', 'Ifa Transform', 'Fractional Calculus'],
    desc: 'The universal container for all calculus types — bridging mathematics, physics, and consciousness mechanics through the study of continuous change.',
  },
  {
    id: 'ifagebra',
    name: 'IfaGebra',
    abbr: 'AlgebroE · TOEGebra',
    tag: 'Algebra',
    glyph: '⊕',
    accent: '#7c4dff',
    externalUrl: 'https://toe.cenproject.org/ifagebra-overview/',
    localUrl: null,
    chips: ['IFA Field Theory', 'NeuroGebra', 'BioGebra', 'Ifa Transforms', 'Consciousness Algebra'],
    desc: 'The Algebra of Everything — Ogbe energy field as the fundamental algebraic structure spanning all knowledge domains.',
  },
  {
    id: 'mathematics',
    name: 'IFA Mathematics',
    abbr: 'TOE Mathematics',
    tag: 'Foundation',
    glyph: '∑',
    accent: '#f5c518',
    externalUrl: 'https://toe.cenproject.org/ifa-mathematics-toe-mathematics/',
    localUrl: null,
    chips: ['16 IFA Axioms', 'Consciousness Mechanics', 'NumoEs', 'IFABOK', 'Knowledge Laws'],
    desc: 'A new way of thinking — Mathematics as Energy to study all knowledge fields through the 16 foundational Axioms of Everything.',
  },
  {
    id: 'physics',
    name: 'Ifa Physics',
    abbr: 'ToEPhysics · PoE',
    tag: 'Physics',
    glyph: '⚛',
    accent: '#00d9b8',
    externalUrl: 'https://toe.cenproject.org/ifa-physics/',
    localUrl: null,
    chips: ['Standard Model', 'Quantum Field', 'Consciousness Physics', 'Ifagrams', '16 Ifa Codes'],
    desc: 'The Physics of Everything — CEN Energy as the unified understanding of cosmos structure, universal dynamics, and development.',
  },
  {
    id: 'engineering',
    name: 'Ifa Engineering',
    abbr: 'EngoE',
    tag: 'Engineering',
    glyph: '⚙',
    accent: '#ff6b35',
    externalUrl: 'https://toe.cenproject.org/ifa-engineering/',
    localUrl: null,
    chips: ['EnGebras', 'Ifaxioms', 'CEN Matrix', 'Green Engineering', 'Systems Design'],
    desc: 'The Engineering of Everything — unifying all engineering disciplines through the CEN Matrix and Consciousness-Energy principles.',
  },
  {
    id: 'mechanics',
    name: 'Ifa Mechanics',
    abbr: 'MechoE',
    tag: 'Mechanics',
    glyph: '◎',
    accent: '#e9498a',
    externalUrl: 'https://toe.cenproject.org/ifa-mechanics-toe-mechanics/',
    localUrl: '/ifa-mechanics/',
    chips: ['Knowledge Laws', 'Ifa Operators', 'Universal Dynamics', 'MetaMathematics', 'Consciousness Mechanics'],
    desc: 'Consciousness Mechanics — studying all disciplines mathematically as energy forms within the IFA Binary System of Education.',
  },
  {
    id: 'modelling',
    name: 'Ifa Modelling',
    abbr: 'ModloE · ToE Modeling',
    tag: 'Modelling',
    glyph: '⬟',
    accent: '#a855f7',
    externalUrl: 'https://toe.cenproject.org/ifa-modeling-toe-modeling/',
    localUrl: null,
    chips: ['Ifatoms', 'IfaKey · IfaLock', 'Ifa Entanglement', 'Meta-Laws', 'Orisa Modelling'],
    desc: 'Using Odu Ifa and Odu Oosa codes to create meta-models of all theories, systems, and knowledge structures.',
  },
  {
    id: 'periodic-table',
    name: 'Ifa Periodic Table',
    abbr: 'IfaPT',
    tag: 'Tool',
    glyph: '⊞',
    accent: '#06b6d4',
    externalUrl: 'https://toe.cenproject.org/ifa-periodic-table/',
    localUrl: '/ifa-periodic-table/',
    chips: ['256 Odu', 'IFABit System', 'Knowledge Map', 'Interactive', 'Periodic System'],
    desc: 'The 256 Odu Ifa mapped as a periodic table — an interactive knowledge navigation and analytical reference system.',
  },
  {
    id: 'games',
    name: 'Ifa Games',
    abbr: 'TOEGames',
    tag: 'Applied',
    glyph: '◈',
    accent: '#eab308',
    externalUrl: 'https://www.playifagames.org/',
    localUrl: null,
    chips: ['Ifa STEAM', 'Knowledge Games', 'Ifa Philosophy', 'Science Games', 'Interactive Learning'],
    desc: 'Gamified STEAM learning through Ifa knowledge — making deep analytical concepts accessible, engaging, and enjoyable.',
  },
  {
    id: 'ifa-computing',
    name: 'Ifa Computing',
    abbr: 'CompoE · TOE Computing',
    tag: 'Computing',
    glyph: '⊡',
    accent: '#38bdf8',
    externalUrl: 'https://toe.cenproject.org/ifa-computer/',
    localUrl: '/ifa-computing/',
    chips: ['IFA Binary', 'Ifa Algorithms', 'Neural IFA', 'Quantum IFA', 'IFA Logic Gates'],
    desc: 'The computational backbone of the IFA Internet — translating the 256 Odu binary architecture into algorithms, logic systems, and intelligent analytical networks.',
  },
];

const SPECTRUM = [
  {
    name: 'Mathematical',
    icon: '∑',
    accent: '#4361ee',
    desc: 'Applying IFA Axioms, IfaGebra, and TOE Mathematics to quantify, model, and solve problems across every knowledge domain — from abstract algebra, behavioural psychology, to creative arts.',
  },
  {
    name: 'Scientific',
    icon: '⚛',
    accent: '#00d9b8',
    desc: 'Grounded in Ifa Physics and Ifa Mechanics, this dimension analyzes the structure of reality through Consciousness-Energy (CEN) principles and the 16 Ifa Codes.',
  },
  {
    name: 'Statistical',
    icon: '◉',
    accent: '#f5c518',
    desc: 'Pattern recognition across the 256 Odu codes — extracting statistical insights, distributions, and analytical signals from the ancient knowledge architecture of Odu Ifa.',
  },
  {
    name: 'Structural',
    icon: '⊞',
    accent: '#7c4dff',
    desc: 'Exploring the deep architecture of knowledge through Ifa Modelling, Ifatoms, the IfaKey–IfaLock framework, and the Ifa Periodic Table as a periodic knowledge system.',
  },
  {
    name: 'Engineering',
    icon: '⚙',
    accent: '#ff6b35',
    desc: 'Applying EngoE frameworks and the CEN Matrix to design, build, and optimize systems — combining Green Engineering ethics with Ifa mathematical rigor.',
  },
  {
    name: 'Conscious',
    icon: '⬡',
    accent: '#00e07c',
    desc: 'Consciousness Mechanics as the deepest layer of analysis — studying all fields as energy forms within IfaSpace, where every discipline communicates in IfaLang.',
  },
  {
    name: 'Artistic',
    icon: '✦',
    accent: '#f472b6',
    desc: 'Creative expression as a dimension of analysis — Ifanalysis recognises art, aesthetics, and cultural form as rigorous knowledge systems within the 256 Odu Ifa.',
  },
  {
    name: 'Infinite Dimensions',
    icon: '∞',
    accent: '#f5c518',
    desc: 'Ifanalysis transcends finite boundaries — the analytical scope of AnalysoE spans all Duoinfinities, Odu codes, and knowledge dimensions without limit.',
  },
];

const STATS = [
  { value: '256', label: 'Odu Ifa',     sub: 'Analytical Codes'   },
  { value: '16',  label: 'IFA Axioms',  sub: 'Laws of Knowledge'  },
  { value: '10+', label: 'Disciplines', sub: 'Integrated Fields'   },
  { value: '∞',   label: 'AnalysoE',      sub: 'Analytical Scope'   },
];

const MATH_SYMBOLS = [
  '∑','∫','∂','∞','π','√','Δ','∇','λ','Ψ','Ω','φ','≡','⊗','⊕','O','|','∀','∃','⊂',
];

const ORISA_ANALYSES = [
  {
    name: 'Osun Analysis',
    glyph: '≋',
    accent: '#f5c518',
    desc: 'Sweetness, flow, and creative abundance — Osun Analysis applies the logic of emotional intelligence, beauty, and generative energy across every analytical domain.',
  },
  {
    name: 'Ogun Analysis',
    glyph: '⌇',
    accent: '#ff6b35',
    desc: 'Precision, force, and structural clarity — Ogun Analysis examines systems through transformative energy, cutting away ambiguity to reveal the iron core of truth.',
  },
  {
    name: 'Obatala Analysis',
    glyph: '◎',
    accent: '#e8ecf2',
    desc: 'Purity, cosmic form, and refined consciousness — Obatala Analysis frames all knowledge through the lens of wholeness, clarity, and the architecture of creation.',
  },
  {
    name: 'Odu Analysis',
    glyph: '⬡',
    accent: '#7c4dff',
    desc: 'The womb of all existence — Odu Analysis applies the primordial codes of creation to interpret and map every field of knowledge from its deepest source.',
  },
  {
    name: 'Sango Analysis',
    glyph: '⌁',
    accent: '#e9498a',
    desc: 'Lightning intelligence and dynamic justice — Sango Analysis governs power structures, transformative events, and high-energy systems across all disciplines.',
  },
  {
    name: 'Yemoja Analysis',
    glyph: '≈',
    accent: '#06b6d4',
    desc: 'Depth, origin, and universal care — Yemoja Analysis examines expansive, generative systems and the deep currents that nourish all forms of knowledge.',
  },
];

// ── Header ────────────────────────────────────────────────────
function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return (
    <header className={`site-header${scrolled ? ' site-header--scrolled' : ''}`}>
      <div className="header__inner">
        <a href="/" className="header__logo">
          <span className="header__logo-ifa">Ifa</span>
          <span className="header__logo-rest">nalysis</span>
          <span className="header__logo-sep">·</span>
          <span className="header__logo-tag">AnalysoE</span>
        </a>
        <nav className="header__nav">
          <a href="#disciplines"          className="header__link">Disciplines</a>
          <a href="#ifa-computing"        className="header__link">Computing</a>
          <a href="#spectrum"             className="header__link">Spectrum</a>
          <a href="#orisa-analysis"       className="header__link">Orisa</a>
          <a href="#ifa-numerical-analysis" className="header__link">Numerics</a>
          <a href="#about"                className="header__link">About</a>
          <a href="https://toe.cenproject.org/ifa-analysis/" target="_blank" className="header__cta">
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
      <div className="hero__symbols" aria-hidden="true">
        {MATH_SYMBOLS.map((sym, i) => (
          <span
            key={i}
            className="hero__sym"
            style={{
              '--sx':  `${(i * 5.3 + 4) % 96}%`,
              '--sy':  `${(i * 11.7 + 8) % 88}%`,
              '--sd':  `${i * 0.6}s`,
              '--ss':  `${4 + (i % 6) * 0.7}s`,
              '--sop': `${0.05 + (i % 5) * 0.03}`,
            }}
          >
            {sym}
          </span>
        ))}
      </div>

      <div className="hero__inner">
        <div className="hero__badge">AnalysoE — The Analysis of Everything</div>

        <h1 className="hero__title">
          <span className="hero__title-ifa">Ifa</span>
          <span className="hero__title-rest">nalysis</span>
        </h1>

        <p className="hero__sub">
          A unified analytical platform integrating IFA Mathematics, Ifa Calculus,<br />
          IfaGebra, Ifa Physics, Ifa Engineering, and Consciousness Mechanics<br />
          — grounded in the 256 Odu Ifa.
        </p>

        <div className="hero__actions">
          <a href="#disciplines" className="hero__btn hero__btn--primary">Explore Disciplines</a>
          <a href="https://toe.cenproject.org/ifa-analysis/" target="_blank" className="hero__btn hero__btn--ghost">
            IFA Analysis Platform →
          </a>
        </div>

        <div className="hero__odu" aria-hidden="true">
          <span className="hero__odu-label">Odu Ifa Binary</span>
          <div className="hero__odu-bits">
            {'O|OO|O|O'.split('').map((c, i) => (
              <span
                key={i}
                className={`hero__odu-bit hero__odu-bit--${c === 'O' ? 'ogbe' : 'oyeku'}`}
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Stats Bar ─────────────────────────────────────────────────
function StatsBar() {
  return (
    <div className="stats-bar">
      {STATS.map(s => (
        <div key={s.label} className="stats-bar__item">
          <span className="stats-bar__value">{s.value}</span>
          <div className="stats-bar__meta">
            <span className="stats-bar__label">{s.label}</span>
            <span className="stats-bar__sub">{s.sub}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Discipline Card ───────────────────────────────────────────
function DisciplineCard({ d }) {
  return (
    <article className="disc-card" style={{ '--dc-accent': d.accent }}>
      <div className="disc-card__visual">
        <div className="disc-card__visual-bg" />
        <span className="disc-card__glyph">{d.glyph}</span>
        <span className="disc-card__tag">{d.tag}</span>
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
        <a
          href={d.externalUrl}
          className={`disc-btn ${d.localUrl ? 'disc-btn--ghost' : 'disc-btn--primary'}`}
          target="_blank"
        >
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
          <h2 className="section__title">The Analytical Ecosystem</h2>
          <p className="section__sub">
            Different interconnected fields of knowledge — unified through the IFA Framework —
            forming a complete analytical System for Everything (SystoE).
          </p>
        </div>
        <div className="disc-grid">
          {DISCIPLINES.map(d => <DisciplineCard key={d.id} d={d} />)}
        </div>
      </div>
    </section>
  );
}

// ── Ifa Computing ─────────────────────────────────────────────
function IfaComputingSection() {
  return (
    <section className="ifa-computing" id="ifa-computing">
      <div className="section__inner">
        <div className="ifc__layout">

          <div className="ifc__text">
            <span className="section__eyebrow">Ifa Computing · CompoE</span>
            <h2 className="ifc__title">The Computational Backbone of AnalysoE</h2>
            <p className="ifc__para">
              Ifa Computing translates the ancient binary intelligence of the 256 Odu Ifa into
              modern computational paradigms — IFA Logic Gates, Ifa Algorithms, Neural IFA
              networks, and Quantum IFA architectures.
            </p>
            <p className="ifc__para">
              At the intersection of tradition and technology, Ifa Computing powers the analytical
              infrastructure of the entire IFA Internet — making the 16 IFA Axioms computable,
              the Odu codes searchable, and the whole of AnalysoE digitally accessible.
            </p>
            <div className="ifc__chips">
              {['IFA Binary','Ifa Algorithms','Neural IFA','Quantum IFA','IFA Logic Gates','CompoE'].map(c => (
                <span key={c} className="ifc__chip">{c}</span>
              ))}
            </div>
            <div className="ifc__actions">
              <a href="/ifa-computing/" target="_blank" className="ifc__btn ifc__btn--primary">
                Open Ifa Computing →
              </a>
              <a href="https://toe.cenproject.org/ifa-computer/" target="_blank" className="ifc__btn ifc__btn--ghost">
                Learn More
              </a>
            </div>
          </div>

          <div className="ifc__diagram-wrap">
            <div className="ifc__diagram-glow" aria-hidden="true" />
            <div className="ifc__diagram-frame">
              <div className="ifc__diagram-label">Diagrammatic Reasoning in IFA</div>
              <img
                src="./src/ifa-analysis-diagram.png"
                alt="Ifanalysis as Unified Analysis — diagrammatic reasoning with IFA showing Scientific, Technological, Engineering, Artistic, Mathematical, Sociocultural, Educational and X Analysis"
                className="ifc__diagram-img"
              />
              <div className="ifc__diagram-caption">
                <span className="ifc__diagram-caption-accent">Ifanalysis</span> as the unified centre —
                Ifa Computing provides the logical and computational substrate for all analytical spokes.
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// ── Orisa Analysis ────────────────────────────────────────────
function OrisaSection() {
  return (
    <section className="orisa" id="orisa-analysis">
      <div className="section__inner">

        <div className="section__header">
          <span className="section__eyebrow">Orisanalysis</span>
          <h2 className="section__title">Orisa Analysis — The Dual of Ifanalysis</h2>
          <p className="section__sub">
            As Ifanalysis illuminates through the 256 Odu codes, Orisanalysis illuminates through
            the living energies of the Orisa — divine archetypes that embody every dimension of
            human experience, knowledge, and cosmic order.
          </p>
        </div>

        <div className="orisa__duality">
          <div className="orisa__pole orisa__pole--ifa">
            <div className="orisa__pole-icon">∑</div>
            <h3 className="orisa__pole-name">Ifanalysis</h3>
            <p className="orisa__pole-desc">
              Structural, mathematical, and scientific analysis through the architecture of the 256 Odu Ifa codes.
            </p>
          </div>
          <div className="orisa__duality-bridge">
            <div className="orisa__bridge-symbol">⟷</div>
            <div className="orisa__bridge-label">Dual Analysis</div>
            <div className="orisa__bridge-sub">Two lenses · One truth</div>
          </div>
          <div className="orisa__pole orisa__pole--orisa">
            <div className="orisa__pole-icon">⬡</div>
            <h3 className="orisa__pole-name">Orisanalysis</h3>
            <p className="orisa__pole-desc">
              Living, dynamic, and consciousness-led analysis through the archetypal energies of the Orisa.
            </p>
          </div>
        </div>

        <div className="orisa__grid">
          {ORISA_ANALYSES.map(o => (
            <div key={o.name} className="orisa-card" style={{ '--oc-accent': o.accent }}>
              <div className="orisa-card__top">
                <span className="orisa-card__glyph">{o.glyph}</span>
                <span className="orisa-card__name">{o.name}</span>
              </div>
              <p className="orisa-card__desc">{o.desc}</p>
              <div className="orisa-card__bar" />
            </div>
          ))}
        </div>

        <p className="orisa__footer-note">
          Other dimensions: Esu Analysis · Oya Analysis · Sopona Analysis · Osanyin Analysis — the full Orisa spectrum as analytical lenses.
        </p>

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
      <div className="section__inner">
        <div className="section__header">
          <span className="section__eyebrow">Analysis Spectrum</span>
          <h2 className="section__title">∞ Dimensions of Analysis</h2>
          <p className="section__sub">
            Ifanalysis operates across a full spectrum — from mathematical rigor to conscious inquiry.
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
              </button>
            ))}
          </div>
          <div className="spectrum__detail" style={{ '--sd-accent': s.accent }}>
            <div className="spectrum__detail-icon">{s.icon}</div>
            <h3 className="spectrum__detail-name">{s.name} Analysis</h3>
            <p className="spectrum__detail-desc">{s.desc}</p>
            <div className="spectrum__detail-bar" />
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Ifa Behavioral Analysis ───────────────────────────────────
const IFABA_PILLARS = [
  { icon: '◉', label: 'Observable Behavior',  desc: 'Systematic study of measurable, observable conduct across all contexts — biological, social, cognitive, and cultural.' },
  { icon: '⊕', label: 'Unified BA Model',     desc: 'Integrating diverse BA approaches, theories, models, tools, and techniques into one coherent analytical framework.' },
  { icon: '⬡', label: 'BA in IfaLang',        desc: 'Performing Behavioral Analysis in IfaLang — the universal meta-language of the IFA Internet — for deeper cross-disciplinary insight.' },
  { icon: '∑', label: 'IFA-Informed',          desc: 'Grounded in the 256 Odu Ifa and the 16 IFA Axioms, giving every behavioral observation an archetypal and mathematical foundation.' },
];

function IfaBASection() {
  return (
    <section className="ifaba" id="ifa-ba">
      <div className="section__inner">

        <div className="ifaba__layout">

          {/* Left — diagram */}
          <div className="ifaba__visual">
            <div className="ifaba__img-wrap">
              <div className="ifaba__img-badge">IfaBA · Ifa-BA</div>
              <img
                src="./src/ifaba-diagram.png"
                alt="IfaBA — Ifa Behavioral Analysis diagram"
                className="ifaba__img"
              />
              <div className="ifaba__img-overlay" aria-hidden="true" />
            </div>
          </div>

          {/* Right — content */}
          <div className="ifaba__content">
            <span className="section__eyebrow">Ifa Behavioral Analysis</span>
            <h2 className="ifaba__title">
              <span className="ifaba__title-accent">IfaBA</span> — Ifa-Informed Behavioral Analysis
            </h2>
            <p className="ifaba__lead">
              Also known as <strong>Ifa-Informed Behavioral Analysis</strong>, IfaBA is a general,
              unified model of behavioral analysis (BA) that integrates diverse BA approaches,
              theories, models, tools, and techniques to gain a deeper insight into the systematic
              study of observable behavior.
            </p>
            <p className="ifaba__para">
              Ifa BA entails doing BA in <strong>IfaLang</strong> — the universal meta-language of
              the IFA Internet — enabling behavioral patterns to be expressed, compared, and analysed
              across biological, social, cognitive, cultural, and computational domains simultaneously.
            </p>

            <div className="ifaba__pillars">
              {IFABA_PILLARS.map(p => (
                <div key={p.label} className="ifaba__pillar">
                  <span className="ifaba__pillar-icon">{p.icon}</span>
                  <div>
                    <div className="ifaba__pillar-label">{p.label}</div>
                    <div className="ifaba__pillar-desc">{p.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="ifaba__chips">
              {['Applied BA','Cognitive BA','Social BA','Neuro-BA','Cultural BA','IfaLang','256 Odu','Unified Model'].map(c => (
                <span key={c} className="ifaba__chip">{c}</span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// ── Ifa Numerical Analysis Playground ────────────────────────
const IFANA_FEATURES = [
  { icon: '∑', label: 'Ifa AP Analysis',        desc: 'Arithmetic progressions across all 256 Odu Ifa families, including Amulu Table mapping and AP pair comparisons.' },
  { icon: 'Δ', label: 'Ifa FDM',                desc: 'Ifa Finite Difference Method — numerical differentiation and integration grounded in IFA binary architecture.' },
  { icon: '≋', label: 'Higher-Order Meta-APs',  desc: 'Ifa Differences (ToE Differences): the common differences of Ifa AP families that themselves form APs.' },
  { icon: '⬡', label: 'AI-Augmented Analysis',  desc: 'Explore IfaNumerical Analysis alongside 7 major AI platforms — a hub-and-spoke intelligence matrix.' },
];

function IfaNumericalPlaygroundSection() {
  return (
    <section className="ifana" id="ifa-numerical-analysis">
      <div className="section__inner">
        <div className="ifana__layout">

          {/* Left — content */}
          <div className="ifana__content">
            <span className="section__eyebrow">Ifa Numerical Analysis · IfaNA</span>
            <h2 className="ifana__title">
              <span className="ifana__title-accent">Ifa Numerical Analysis</span> Playground
            </h2>
            <p className="ifana__lead">
              The <strong>ToE of Numerical Analysis</strong> — using the 256 Odu Ifa to generalise
              Numerical Analysis across every field of knowledge. Explore Ifa APs, Ifa GP families,
              higher-order Meta-APs, the Ifa Finite Difference Method, and AI-augmented numerical
              exploration, all expressed in <strong>IfaLang</strong>.
            </p>
            <div className="ifana__features">
              {IFANA_FEATURES.map(f => (
                <div key={f.label} className="ifana__feature">
                  <span className="ifana__feature-icon">{f.icon}</span>
                  <div style={{minWidth:0}}>
                    <div className="ifana__feature-label">{f.label}</div>
                    <div className="ifana__feature-desc">{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="ifana__chips">
              {['AP Analysis','GP Analysis','Ifa FDM','Meta-APs','IfaLang','AI Integration','256 Odu','ToE Numerics'].map(c => (
                <span key={c} className="ifana__chip">{c}</span>
              ))}
            </div>
            <div className="ifana__actions">
              <a href="/ifa-analysis/ifa-numerical-analysis/" className="ifana__btn ifana__btn--primary">
                Open Playground →
              </a>
              <a href="https://toe.cenproject.org/ifa-analysis/" target="_blank" className="ifana__btn ifana__btn--ghost">
                Learn More
              </a>
            </div>
          </div>

          {/* Right — visual */}
          <div className="ifana__visual">
            <div className="ifana__card">
              <div className="ifana__card-label">IfaNumerical Analysis · Scope</div>
              <div className="ifana__card-stats">
                <div className="ifana__stat">
                  <span className="ifana__stat-val">256</span>
                  <span className="ifana__stat-key">Odu Ifa Families</span>
                </div>
                <div className="ifana__stat">
                  <span className="ifana__stat-val">∞</span>
                  <span className="ifana__stat-key">AP Family Scope</span>
                </div>
                <div className="ifana__stat">
                  <span className="ifana__stat-val">7+</span>
                  <span className="ifana__stat-key">AI Platforms</span>
                </div>
                <div className="ifana__stat">
                  <span className="ifana__stat-val">ToE</span>
                  <span className="ifana__stat-key">Numerical Analysis</span>
                </div>
              </div>
              <div className="ifana__card-formula">
                <span className="ifana__formula-line">aₙ = a₁ + (n − 1)d</span>
                <span className="ifana__formula-sub">Ifa AP · Odu-indexed progression</span>
              </div>
              <div className="ifana__card-glow" aria-hidden="true" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// ── About ─────────────────────────────────────────────────────
function AboutSection() {
  return (
    <section className="about" id="about">
      <div className="section__inner">
        <div className="about__grid">
          <div className="about__text">
            <span className="section__eyebrow">About Ifanalysis</span>
            <h2 className="about__title">Experience Integrated Analytical Insights</h2>
            <p className="about__para">
              Ifanalysis (IFA Analysis) is the analytical framework of the IFA Internet — a
              cross-disciplinary platform that bridges traditional Ifa knowledge with modern
              analytical methodologies using IfaLang as its universal language.
            </p>
            <p className="about__para">
              At its core, Ifanalysis treats all knowledge as energy — following the 16 IFA Axioms
              to apply mathematical, scientific, and philosophical analysis simultaneously across
              every discipline in the STEAMSEX framework.
            </p>
            <p className="about__para">
              From the continuous transformations of Ifa Calculus to the structural meta-models of
              Ifa Modelling, every analytical tool within the ecosystem speaks the same language:
              the 256 Odu Ifa.
            </p>
            <a href="https://toe.cenproject.org/ifa-analysis/" target="_blank" className="about__link">
              Explore IFA Analysis Platform →
            </a>
          </div>

          <div className="about__visual">
            <div className="about__axioms-card">
              <div className="about__axioms-title">16 IFA Axioms</div>
              <div className="about__axioms-grid">
                {Array.from({ length: 16 }, (_, i) => (
                  <div
                    key={i}
                    className="about__axiom-cell"
                    style={{ '--ac-delay': `${i * 0.12}s` }}
                  >
                    <span className="about__axiom-num">{i + 1}</span>
                  </div>
                ))}
              </div>
              <p className="about__axioms-sub">Laws of Knowledge — Foundation of AnalysoE</p>
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
      <div className="section__inner">
        <div className="cta-strip__inner">
          <div className="cta-strip__text">
            <h2 className="cta-strip__title">Begin Your Analysis</h2>
            <p className="cta-strip__sub">Enter the analytical ecosystem of the IFA Internet.</p>
          </div>
          <div className="cta-strip__actions">
            <a href="https://toe.cenproject.org/ifa-analysis/" target="_blank" className="cta-btn cta-btn--primary">
              IFA Analysis Platform →
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
        <div className="footer__brand">
          <span className="footer__logo">Ifanalysis</span>
          <span className="footer__tag">AnalysoE — The Analysis of Everything</span>
        </div>
        <div className="footer__links">
          <a href="https://toe.cenproject.org/ifa-analysis/" target="_blank">IFA Analysis</a>
          <a href="https://toe.cenproject.org/ifa-mathematics-toe-mathematics/" target="_blank">IFA Mathematics</a>
          <a href="https://toe.cenproject.org/ifa-calculus-toe-calculus/" target="_blank">Ifa Calculus</a>
          <a href="https://toe.cenproject.org/ifa-physics/" target="_blank">Ifa Physics</a>
          <a href="https://toe.cenproject.org/" target="_blank">toe.cenproject.org</a>
        </div>
        <p className="footer__copy">© 2025 CENProject Innovations Limited. Part of the IFA Internet.</p>
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
      <IfaComputingSection />
      <SpectrumSection />
      <OrisaSection />
      <IfaBASection />
      <IfaNumericalPlaygroundSection />
      <AboutSection />
      <CTASection />
      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
