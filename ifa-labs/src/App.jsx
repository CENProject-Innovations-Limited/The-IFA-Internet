/* ─────────────────────────────────────────────────────────────
   IfaLabs — TOELabs · Research & Innovation Lab
   The IFA Internet · CENProject · toe.cenproject.org
───────────────────────────────────────────────────────────── */

const { useState, useEffect } = React;

// ── Six Labs ──────────────────────────────────────────────────
const LABS = [
  {
    id: 'engineering',
    name: 'Ifa Engineering',
    abbr: 'EngoE',
    tag: 'Engineering',
    glyph: '⚙',
    accent: '#00e07c',
    externalUrl: 'https://toe.cenproject.org/ifa-engineering/',
    localUrl: null,
    desc: 'The Engineering of Everything — integrating and unifying all engineering disciplines through the CEN Matrix. From classical structures to green engineering, grounded in Ifa axioms.',
    chips: ['EnGebras', 'Ifaxioms', 'CEN Matrix', 'Green Engineering', 'Standard Model'],
  },
  {
    id: 'mechanics',
    name: 'Ifa Mechanics',
    abbr: 'MechoE',
    tag: 'Mechanics',
    glyph: '⚛',
    accent: '#4361ee',
    externalUrl: 'https://toe.cenproject.org/ifa-mechanics-toe-mechanics/',
    localUrl: '/ifa-mechanics/',
    desc: 'Universal mechanics at the deepest level of reality — Energy (Ogbe). Classical, quantum, and consciousness mechanics unified through Ifa Language and Odu operators.',
    chips: ['Science Mechanics', 'Quantum Mechanics', 'Orisa Mechanics', 'Ifa Operators', 'Ifa Functions'],
  },
  {
    id: 'analysis',
    name: 'Ifa Analysis',
    abbr: 'AnalyE',
    tag: 'Analysis',
    glyph: '◎',
    accent: '#f5c518',
    externalUrl: 'https://toe.cenproject.org/ifa-analysis/',
    localUrl: '/ifa-analysis/',
    desc: 'Analysis across all modern fields through the lens of Ifa — unifying mathematical, statistical, data-driven, and psychoanalytical methods under one framework powered by IfaLang.',
    chips: ['Mathematical', 'Statistical', 'Data Analysis', 'Psychoanalysis', 'IfaLang'],
  },
  {
    id: 'modelling',
    name: 'Ifa Modelling',
    abbr: 'ModloE',
    tag: 'Modelling',
    glyph: '⬡',
    accent: '#e9498a',
    externalUrl: 'https://toe.cenproject.org/ifa-modeling-toe-modeling/',
    localUrl: null,
    desc: 'Meta-models of all theories and systems using Odu Ifa codes — Ifatoms as Atoms of Everything, IfaKey/IfaLock systems, and Ifa Entanglement for complex modelling.',
    chips: ['Ifatoms', 'IfaKey · IfaLock', 'Ifa Entanglement', 'Meta-Laws', 'Orisa Modelling'],
  },
  {
    id: 'periodic-table',
    name: 'Ifa Periodic Table',
    abbr: 'IfaPT',
    tag: 'Tool',
    glyph: '⊞',
    accent: '#7c4dff',
    externalUrl: 'https://toe.cenproject.org/ifa-periodic-table/',
    localUrl: '/ifa-periodic-table/',
    desc: 'An interactive exploration of all 256 Odu Ifa — the Blueprint of everything, organized as a Periodic Table of knowledge, consciousness, and existence.',
    chips: ['256 Odu', 'Interactive', 'Blueprint', 'Knowledge Map', 'Ifa Codes'],
  },
  {
    id: 'games',
    name: 'Ifa Games',
    abbr: 'TOEGames',
    tag: 'Games',
    glyph: '◈',
    accent: '#ff6b35',
    externalUrl: 'https://www.playifagames.org/',
    localUrl: null,
    desc: 'Games as applications of Ifa Philosophy and Science — knowledge unifiers, integrators, and generators. Learning Ifa STEAM through play and interactive engagement.',
    chips: ['Ifa STEAM', 'Knowledge Games', 'Ifa Philosophy', 'Science', 'Interactive'],
  },
];

// ── E.T.H.I.C.S Framework ─────────────────────────────────────
const ETHICS = [
  { letter: 'E', word: 'Engineering',          accent: '#00e07c', desc: 'Building systems and solutions grounded in Energy-based Ifa principles and African technological heritage.' },
  { letter: 'T', word: 'Trust',                accent: '#4361ee', desc: 'Reliability, transparency, and accountability embedded in every lab process and platform we build.' },
  { letter: 'H', word: 'Honesty',              accent: '#f5c518', desc: 'Intellectual integrity and truthfulness across all research, development, and knowledge production.' },
  { letter: 'I', word: 'Integrity',            accent: '#e9498a', desc: 'Coherence between Ifa values, Ọmọlúwàbí ethos, and technological practice at every stage.' },
  { letter: 'C', word: 'Courage',              accent: '#7c4dff', desc: 'Boldness to challenge conventional paradigms and forge new knowledge with Ifa insight and innovation.' },
  { letter: 'S', word: 'Sustainability & Safety', accent: '#ff6b35', desc: 'Green engineering principles and ethical technology for lasting impact and global wellbeing.' },
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
          <span className="header__brand-name">IfaLabs</span>
        </div>
        <nav className="header__nav">
          <a className="nav-link" href="#labs">Labs</a>
          <a className="nav-link" href="#about">About</a>
          <a className="nav-link" href="#ethics">E.T.H.I.C.S</a>
          <a
            className="nav-link nav-link--cta"
            href="https://toe.cenproject.org/ifalabs-toelabs/"
            target="_blank"
            rel="noopener noreferrer"
          >
            TOELabs →
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
        <div className="hero__grid" />
        <div className="hero__glow hero__glow--green" />
        <div className="hero__glow hero__glow--blue" />
      </div>

      {/* Floating lab orbs */}
      <div className="hero__orbs" aria-hidden="true">
        {[
          { s: 260, x: '8%',  y: '20%', d: '0s',    dur: '18s' },
          { s: 140, x: '82%', y: '12%', d: '3s',    dur: '14s' },
          { s: 90,  x: '55%', y: '75%', d: '1.5s',  dur: '20s' },
          { s: 180, x: '75%', y: '60%', d: '5s',    dur: '16s' },
          { s: 60,  x: '20%', y: '70%', d: '2.5s',  dur: '22s' },
          { s: 110, x: '40%', y: '18%', d: '4s',    dur: '17s' },
        ].map((o, i) => (
          <div
            key={i}
            className="hero__orb"
            style={{
              '--os': `${o.s}px`,
              '--ox': o.x,
              '--oy': o.y,
              '--od': o.d,
              '--odur': o.dur,
            }}
          />
        ))}
      </div>

      {/* Molecular connections */}
      <svg className="hero__svg" aria-hidden="true" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice">
        <g stroke="rgba(0,224,124,0.08)" strokeWidth="1" fill="none">
          <line x1="96" y1="140" x2="480" y2="126" />
          <line x1="984" y1="84" x2="660" y2="126" />
          <line x1="480" y1="126" x2="660" y2="126" />
          <line x1="900" y1="420" x2="660" y2="525" />
          <line x1="240" y1="490" x2="480" y2="126" />
          <line x1="240" y1="490" x2="660" y2="525" />
        </g>
        <g fill="rgba(0,224,124,0.25)">
          <circle cx="96" cy="140" r="4" /><circle cx="480" cy="126" r="4" />
          <circle cx="984" cy="84" r="4" /><circle cx="660" cy="126" r="4" />
          <circle cx="900" cy="420" r="4" /><circle cx="240" cy="490" r="4" />
          <circle cx="660" cy="525" r="4" />
        </g>
      </svg>

      <div className="hero__inner">
        <div className="hero__eyebrow">
          <span className="hero__eyebrow-pip" />
          The IFA Internet · Research &amp; Innovation Lab
        </div>

        <div className="hero__wordmark">
          <span className="hero__wordmark-ifa">Ifa</span>
          <span className="hero__wordmark-labs">Labs</span>
        </div>

        <p className="hero__tagline">
          Where African Cultural Intelligence Meets Innovation
        </p>

        <p className="hero__desc">
          IfaLabs (TOELabs) bridges cutting-edge technological development with the deep wisdom
          of Ifa and Orisa — engineering, analysing, modelling, and playing at the frontier
          of the Theory of Everything.
        </p>

        <div className="hero__stats">
          {[
            { v: '6',    l: 'Active e-Labs' },
            { v: '256',  l: 'Odu Blueprints' },
            { v: 'E.T.H.I.C.S', l: 'Framework' },
            { v: '∞',    l: 'Discoveries' },
          ].map(s => (
            <div key={s.l} className="hero__stat">
              <div className="hero__stat-value">{s.v}</div>
              <div className="hero__stat-label">{s.l}</div>
            </div>
          ))}
        </div>

        <div className="hero__ctas">
          <a className="btn btn--primary" href="#labs">Enter the Labs ↓</a>
          <a
            className="btn btn--ghost"
            href="https://toe.cenproject.org/ifalabs-toelabs/"
            target="_blank"
            rel="noopener noreferrer"
          >
            TOELabs →
          </a>
        </div>
      </div>
    </section>
  );
}

// ── Labs Grid ──────────────────────────────────────────────────
function LabsGrid() {
  return (
    <section id="labs" className="section">
      <div className="container">
        <div className="section__header">
          <span className="section__eyebrow">Six Active Labs · Open for Exploration</span>
          <h2 className="section__title">The <span style={{ color: 'var(--lab)' }}>IfaLabs</span> Collection</h2>
          <p className="section__desc">
            Six interconnected research labs — each a deep field of inquiry, each grounded in Ifa
            principles, each contributing to the unified Theory of Everything that is the IFA Internet.
          </p>
        </div>

        <div className="labs-grid">
          {LABS.map(lab => (
            <div key={lab.id} className="lab-card" style={{ '--lc-accent': lab.accent }}>
              {/* Card visual top */}
              <div className="lab-card__visual">
                <div className="lab-card__visual-bg" />
                <div className="lab-card__glyph">{lab.glyph}</div>
                <div className="lab-card__abbr">{lab.abbr}</div>
                <span className="lab-card__tag">{lab.tag}</span>
              </div>

              {/* Card body */}
              <div className="lab-card__body">
                <h3 className="lab-card__name">{lab.name}</h3>
                <p className="lab-card__desc">{lab.desc}</p>

                <div className="lab-card__chips">
                  {lab.chips.map((c, i) => (
                    <span key={i} className="lab-card__chip">{c}</span>
                  ))}
                </div>

                <div className="lab-card__actions">
                  {lab.localUrl && (
                    <a
                      href={lab.localUrl}
                      className="lab-btn lab-btn--primary"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Open Lab →
                    </a>
                  )}
                  <a
                    href={lab.externalUrl}
                    className={`lab-btn ${lab.localUrl ? 'lab-btn--ghost' : 'lab-btn--primary'}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {lab.localUrl ? 'Learn More' : 'Enter Lab →'}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── About / IfaSpace Section ───────────────────────────────────
function AboutSection() {
  return (
    <section id="about" className="section section--alt">
      <div className="container">
        <div className="about-layout">
          <div className="about-text">
            <span className="section__eyebrow" style={{ color: 'var(--lab)', textAlign: 'left', display: 'block' }}>
              TOELabs · IfaLabs · What We Are
            </span>
            <h2 className="about-title">
              Bridging African Intelligence<br />
              <span style={{ color: 'var(--lab)' }}>with the Future</span>
            </h2>
            <p className="about-desc">
              IfaLabs is the research and innovation engine of the IFA Internet — a dynamic platform
              that blends African cultural heritage and Ifa Principles with cutting-edge technological
              development. We do not separate science from culture. For us, they were never apart.
            </p>
            <p className="about-desc">
              Guided by the <strong style={{ color: 'var(--lab)' }}>Ọmọlúwàbí Ethos</strong> and the
              E.T.H.I.C.S Framework, every lab, tool, and initiative at IfaLabs is engineered to
              empower the iTOE — the Internet Model of the Theory of Everything.
            </p>
          </div>

          <div className="ifaspace-card">
            <div className="ifaspace-card__top" />
            <div className="ifaspace-card__icon">◉</div>
            <div className="ifaspace-card__name">IfaSpace</div>
            <div className="ifaspace-card__sub">TOESpace · Knowledge Ecosystem</div>
            <p className="ifaspace-card__desc">
              IfaSpace is the information and knowledge ecosystem of IfaLabs — where all fields of
              knowledge are made to "talk" to one another in Ifa Language (CEN Language) for building
              the Theory of Everything.
            </p>
            <div className="ifaspace-card__pills">
              <span>All Fields</span><span>IfaLang</span><span>CEN Language</span><span>TOE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── E.T.H.I.C.S Section ───────────────────────────────────────
function EthicsSection() {
  const [active, setActive] = useState(0);
  const e = ETHICS[active];

  return (
    <section id="ethics" className="section">
      <div className="container">
        <div className="section__header">
          <span className="section__eyebrow">Our Guiding Framework</span>
          <h2 className="section__title">The <span style={{ color: 'var(--lab)' }}>E.T.H.I.C.S</span> Framework</h2>
          <p className="section__desc">
            Every lab initiative at IfaLabs is anchored in six principles — forming the ethical and
            engineering backbone of all research, development, and innovation we produce.
          </p>
        </div>

        <div className="ethics-layout">
          {/* Letter buttons */}
          <div className="ethics-letters">
            {ETHICS.map((item, i) => (
              <button
                key={i}
                className={`ethics-btn${active === i ? ' ethics-btn--active' : ''}`}
                style={{ '--eb-accent': item.accent }}
                onClick={() => setActive(i)}
              >
                <span className="ethics-btn__letter">{item.letter}</span>
                <span className="ethics-btn__word">{item.word}</span>
              </button>
            ))}
          </div>

          {/* Active detail */}
          <div className="ethics-detail" style={{ '--ed-accent': e.accent }}>
            <div className="ethics-detail__letter">{e.letter}</div>
            <div className="ethics-detail__word">{e.word}</div>
            <p className="ethics-detail__desc">{e.desc}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── CTA Section ────────────────────────────────────────────────
function CTASection() {
  return (
    <section className="section section--cta">
      <div className="container">
        <div className="cta-strip">
          <div className="cta-strip__bg" />
          <div className="cta-strip__inner">
            <div className="cta-strip__left">
              <div className="cta-strip__eyebrow">IfaLabs · TOELabs · IFA Internet</div>
              <h2 className="cta-strip__title">Ready to Explore the Labs?</h2>
              <p className="cta-strip__desc">
                Six active research labs. One unified mission. The Engineering, Analysis, Mechanics,
                Modelling, and Games of the Theory of Everything — built on the IFA Internet.
              </p>
            </div>
            <div className="cta-strip__actions">
              <a
                href="https://toe.cenproject.org/ifalabs-toelabs/"
                className="btn btn--primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit TOELabs →
              </a>
              <a
                href="https://www.playifagames.org/"
                className="btn btn--ghost"
                target="_blank"
                rel="noopener noreferrer"
              >
                Play Ifa Games
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
              <span className="footer__logo-name">IfaLabs</span>
            </div>
            <p className="footer__tagline">TOELabs — Research &amp; Innovation Lab of the IFA Internet</p>
            <p className="footer__tagline" style={{ marginTop: 4, fontSize: '0.8rem' }}>
              Part of{' '}
              <a href="https://ifainternet.org" style={{ color: 'var(--lab)' }}>The IFA Internet</a>
              {' · '}
              <a href="https://cenproject.org" style={{ color: 'var(--lab)' }}>CENProject</a>
            </p>
          </div>
          <nav className="footer__links">
            <a href="https://ifainternet.org" className="footer__link" target="_blank" rel="noopener noreferrer">← IFA Internet</a>
            <a href="https://toe.cenproject.org/ifa-engineering/" className="footer__link" target="_blank" rel="noopener noreferrer">Ifa Engineering</a>
            <a href="/ifa-mechanics/" className="footer__link" target="_blank" rel="noopener noreferrer">Ifa Mechanics</a>
            <a href="/ifa-analysis/" className="footer__link" target="_blank" rel="noopener noreferrer">Ifa Analysis</a>
            <a href="https://toe.cenproject.org/ifa-modeling-toe-modeling/" className="footer__link" target="_blank" rel="noopener noreferrer">Ifa Modelling</a>
            <a href="/ifa-periodic-table/" className="footer__link" target="_blank" rel="noopener noreferrer">Ifa Periodic Table</a>
            <a href="https://www.playifagames.org/" className="footer__link" target="_blank" rel="noopener noreferrer">Ifa Games</a>
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
        <LabsGrid />
        <AboutSection />
        <EthicsSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
