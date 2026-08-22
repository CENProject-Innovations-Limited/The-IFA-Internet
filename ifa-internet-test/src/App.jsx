/* ─────────────────────────────────────────────────────────────
   The IFA Internet · iTOE · CENProject
   toe.cenproject.org
───────────────────────────────────────────────────────────── */

const { useState, useEffect } = React;

// ── Category color map ────────────────────────────────────────
const CAT_COLOR = {
  math:          '#f5c518',
  science:       '#4361ee',
  tech:          '#2d9e6b',
  network:       '#0099ff',
  language:      '#7c4dff',
  tools:         '#e9498a',
  philosophy:    '#daa520',
  education:     '#e63946',
  arts:          '#ff6b35',
  'non-science': '#9b59b6',
};

// Featured app icon glyphs
const APP_ICON = {
  'ifa-periodic-table': 'PT',
  'ifai':               'AI',
  'ifa-lang':           'IL',
  'ifa-game':           'G',
  'ifa-analysis':       'IA',
  'ifa-mechanics':      'M',
  'ifa-physics':        'PH',
};

// ── Header ────────────────────────────────────────────────────
function Header() {
  return (
    <header className="header">
      <div className="header__inner">
        <a href="/" className="header__logo">
          <img src="../src/assets/itoe_logo.png" alt="iTOE" className="header__logo-mark" />
          <div className="header__logo-text">
            <span className="header__logo-title">The IFA Internet</span>
          </div>
        </a>
        <nav className="header__nav">
          <a className="nav-link" href="#mission">Mission</a>
          <a className="nav-link" href="#platforms">Platforms</a>
          <a className="nav-link" href="#networking">Networking</a>
          <a className="nav-link" href="https://cenproject.org/" className="nav-link">CENProject</a>
          <a className="nav-link nav-link--cta" href="https://toe.cenproject.org" target="_blank" rel="noopener noreferrer">Explore</a>
        </nav>
      </div>
    </header>
  );
}

// ── Mobile Bottom Bar ─────────────────────────────────────────
function MobileBar() {
  const items = [
    { sym: '⌂',  label: 'Home',      href: '/' },
    { sym: '◈',  label: 'Mission',   href: '#mission' },
    { sym: '⊞',  label: 'Platforms', href: '#platforms' },
    { sym: '◉',  label: 'Network',   href: '#networking' },
    { sym: '→',  label: 'Explore',   href: 'https://toe.cenproject.org', target: '_blank' },
  ];
  return (
    <nav className="mobile-bar" aria-label="Mobile navigation">
      <div className="mobile-bar__row">
        {items.map(it => (
          <a
            key={it.label}
            className="mobile-bar__item"
            href={it.href}
            target={it.target || undefined}
            rel={it.target ? 'noopener noreferrer' : undefined}
          >
            <span className="mobile-bar__sym">{it.sym}</span>
            <span>{it.label}</span>
          </a>
        ))}
      </div>
    </nav>
  );
}

// ── Odu Ifa Welcome Demo ──────────────────────────────────────
function OduIfaDemo() {
  return (
    <div className="odu-demo" aria-label="Odu Ifa Internet — Binary Foundation">
      <p className="odu-demo__welcome">Welcome to</p>

      <div className="odu-demo__pair">
        {/* O — Odu · IfaZero · Ogbe */}
        <div className="odu-demo__unit odu-demo__unit--o">
          <div className="odu-demo__word">Odu</div>
          <div className="odu-demo__ring">
            <span className="odu-demo__sym odu-demo__sym--o">O</span>
          </div>
        </div>

        <div className="odu-demo__sep" aria-hidden="true">+</div>

        {/* | — Ifa · IfaOne · Oyeku */}
        <div className="odu-demo__unit odu-demo__unit--bar">
          <div className="odu-demo__word">Ifa</div>
          <div className="odu-demo__ring odu-demo__ring--rect">
            <span className="odu-demo__sym odu-demo__sym--bar">|</span>
          </div>
        </div>
      </div>

      <div className="odu-demo__bottom">
        <p className="odu-demo__internet">
          {'Internet'.split('').map((ch, i) => (
            <span key={i} className="odu-demo__internet-ch" style={{ animationDelay: `${i * 0.09}s` }}>{ch}</span>
          ))}
        </p>
        <p className="odu-demo__caption">All 256 Odu Ifa encoded in O and | Energy States</p>
      </div>
    </div>
  );
}

// ── Hero ──────────────────────────────────────────────────────
function HeroSection({ hero }) {
  return (
    <section className="hero">
      <div className="hero__bg">
        <div className="hero__grid" />
        <div className="hero__glow" />
        <div className="hero__glow-2" />
      </div>

      {/* Decorative floating nodes */}
      <div className="hero__nodes" aria-hidden="true">
        {[
          { top:'12%', left:'8%',   size:40,  dur:'12s', color:'rgba(245,197,24,0.35)' },
          { top:'72%', left:'6%',   size:24,  dur:'15s', color:'rgba(0,54,247,0.4)' },
          { top:'30%', right:'7%',  size:56,  dur:'10s', color:'rgba(124,77,255,0.3)' },
          { top:'75%', right:'10%', size:32,  dur:'17s', color:'rgba(45,158,107,0.35)' },
          { top:'55%', left:'14%',  size:18,  dur:'13s', color:'rgba(233,73,138,0.3)' },
        ].map((n, i) => (
          <div
            key={i}
            className="hero__node"
            style={{
              top: n.top, left: n.left, right: n.right,
              width: n.size, height: n.size,
              borderColor: n.color,
              animationDuration: n.dur,
              animationDelay: `${i * 1.2}s`,
            }}
          />
        ))}
      </div>

      <div className="hero__inner">
        <div className="hero__badge">
          <span className="hero__badge-dot" />
          Internet Model of the Theory of Everything
        </div>

        <OduIfaDemo />

        <h1 className="hero__title">
          <span>{hero.title}</span>
        </h1>

        <p className="hero__subtitle">{hero.subtitle}</p>

        <p className="hero__tagline">
          <strong>"{hero.tagline}"</strong>
          {' '}— {hero.description}
        </p>

        <div className="hero__ctas">
          <a className="btn btn--primary" href={hero.cta_primary.href}>
            {hero.cta_primary.label} ↓
          </a>
          <a className="btn btn--secondary" href={hero.cta_secondary.href}>
            {hero.cta_secondary.label}
          </a>
        </div>
      </div>
    </section>
  );
}

// ── Stats Bar ─────────────────────────────────────────────────
function StatsBar({ stats }) {
  return (
    <section className="stats">
      <div className="stats__inner container">
        {stats.map(s => (
          <div key={s.label} className="stat">
            <div className="stat__value">{s.value}</div>
            <div className="stat__label">{s.label}</div>
            <div className="stat__sub">{s.sub}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Mission ───────────────────────────────────────────────────
function MissionSection({ mission }) {
  return (
    <section id="mission" className="section">
      <div className="container">
        <div className="section__header">
          <span className="section__eyebrow" style={{ textTransform: 'none' }}>Our Framework: The IFA Theory of Everything (iTOE)</span>
          <h2 className="section__title">{mission.title}</h2>
          <p className="section__desc">{mission.premise}</p>
        </div>
        <div className="pillars">
          {mission.pillars.map(p => (
            <div key={p.id} className="pillar">
              <span className="pillar__symbol">{p.symbol}</span>
              <h3 className="pillar__title">{p.title}</h3>
              <p className="pillar__body">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── IFABit Section ────────────────────────────────────────────
function IfabitSection() {
  return (
    <section className="section section--alt">
      <div className="container">
        <div className="section__header">
          <span className="section__eyebrow">The Ifa Encoding System (IES)</span>
          <h2 className="section__title">IFABit — The Binary Digit of Everything</h2>
          <p className="section__desc">
            The universe encoded in two States: Ogbe (Energy) and Oyeku (Anergy).
            All the remaining 254 Odu Ifa are 4-Bit Combinations (Amulu) of these Dual Primal Forces —
            the ancient Blueprint for all internetworking methodologies and systems.
          </p>
        </div>

        <div className="ifabit-display">
          <div className="ifabit-item">
            <div className="ifabit-symbol ifabit-symbol--ogbe" />
            <div className="ifabit-label">
              <strong>Ogbe</strong><br />
              Energy
            </div>
          </div>

          <div className="ifabit-connector">+</div>

          <div className="ifabit-item">
            <div className="ifabit-symbol--oyeku-line">|</div>
            <div className="ifabit-label">
              <strong>Oyeku</strong><br />
              Anergy
            </div>
          </div>

          <div className="ifabit-connector">=</div>

          <div className="ifabit-item">
            <div className="ifabit-symbol" style={{
              borderColor: 'var(--border-2)',
              color: 'var(--text)',
              background: 'var(--surface-2)',
              fontSize: '1rem',
              fontWeight: 800,
            }}>
              254<br />
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-2)', letterSpacing: '0.08em', marginTop: '2px', display: 'inline-block' }}>Odu</span>
            </div>
            <div className="ifabit-label">
              <strong>254 Odu Ifa</strong>
            </div>
          </div>
        </div>

        <div className="ifabit-total">
          <div className="ifabit-total__number">256 Odu Ifa</div>
          <div className="ifabit-total__sub">Knowledge Codes</div>
          <div className="ifabit-total__note">The Codes for Everything (CodeoE)</div>
        </div>
      </div>
    </section>
  );
}

// ── TOEBit Section ────────────────────────────────────────────
function TOEBitSection() {
  const pair = [
    {
      id: 'ogbe',
      name: 'Ogbe',
      kind: 'Energy',
      accent: '#f5c518',
      bgAccent: 'rgba(245,197,24,0.07)',
      desc: 'The most fundamental Building Block of Everything (BBoE) — the Universal Building Block of all "building blocks" in modern science. Ogbe is Energy itself: the primordial, active, creative force.',
      reps: [
        {
          symText: 'I',
          name: 'IfaLine',
          note: 'Primary form of Ogbe — the IFA Line. Not 1 (one) in modern math or bit.',
        },
        {
          symText: 'O',
          name: 'IfaCircle · IfaZero',
          note: 'Circular Opon Ifa shape. Not zero (0) in modern math or bit.',
        },
        {
          symSvg: 'duoinfinity',
          name: 'Duoinfinity · InfinitoE',
          note: 'Ifa Infinity — ∞ crossed with 8, centers coinciding. The Infinity for Everything.',
        },
        {
          symSvg: 'ifazero',
          name: 'IfaZero Metarepresentation',
          note: 'Circle with clockwise arrow on the right — the Energy (Ogbe) directional symbol.',
        },
      ],
    },
    {
      id: 'oyeku',
      name: 'Oyeku',
      kind: 'Anergy',
      accent: '#4361ee',
      bgAccent: 'rgba(0,54,247,0.07)',
      desc: 'Non-Energy — the Dual of Ogbe. Oyeku is Anergy: the complementary, receptive, potential force. Together with Ogbe it generates all the remaining 254 Odu Ifa.',
      reps: [
        {
          symText: '‖',
          name: 'Dual IfaLine',
          note: 'Primary form of Oyeku — the Dual of the Ogbe IfaLine.',
        },
        {
          symText: '|',
          name: 'IfaLine · IfaOne',
          note: 'IFA One — not one (1) in modern math or bit.',
        },
        {
          symSvg: 'duoninfinity',
          name: 'Duoninfinity · NinfinitoE',
          note: 'Ifa Ninfinity — Duoinfinity with "/" slash. Non-Infinity, Dual of Infinity.',
        },
        {
          symSvg: 'ifaone',
          name: 'IfaOne Metarepresentation',
          note: 'Circle with counterclockwise arrow on the left — the Anergy (Oyeku) directional symbol.',
        },
      ],
    },
  ];

  return (
    <section className="section">
      <div className="container">
        <div className="section__header">
          <span className="section__eyebrow">Universal Encoding Primitives</span>
          <h2 className="section__title">
            The TOEBit (IFABit): The Bit for Everything (BitoE)
          </h2>
          <p className="section__desc">
            IfaZero (Ogbe) and IfaOne (Oyeku) are the Universal Energy–Anergy Pair —
            the Primordial Ancestors of all kinds of numbers.
            Known as Ifa Numbers (ToE Numbers), IfaZero and IfaOne are <em>not</em> the same as 0 and 1 in modern mathematics or computing.
            IfaNumbers carry multiple meta-representations across the IFA System.
          </p>
        </div>

        <div className="toebit-pair">
          {pair.map(s => (
            <div
              key={s.id}
              className="toebit-card"
              style={{ '--toebit-accent': s.accent, '--toebit-bg': s.bgAccent }}
            >
              {/* Primary visual */}
              <div className="toebit-primary-wrap">
                {s.id === 'ogbe'
                  ? <div className="toebit-circle" />
                  : <div className="toebit-line" />
                }
                <div className="toebit-primary-label">
                  {s.id === 'ogbe' ? 'IfaCircle · Energy (Ogbe)' : 'IfaLine · Anergy (Oyeku)'}
                </div>
              </div>

              <h3 className="toebit-name">
                {s.name}
                <span className="toebit-kind"> — {s.kind}</span>
              </h3>
              <p className="toebit-desc">{s.desc}</p>

              <div className="toebit-reps">
                <div className="toebit-reps__label">Meta-Representations</div>
                {s.reps.map((r, i) => (
                  <div key={i} className="toebit-rep">
                    <div className="toebit-rep__sym">
                      {r.symSvg === 'duoinfinity' && (
                        <img
                          src="../src/assets/duoinfinity_logo.png"
                          alt="Duoinfinity — Ifa Infinity"
                          className="toebit-sym-img"
                        />
                      )}
                      {r.symSvg === 'duoninfinity' && (
                        <img
                          src="../src/assets/duoninfinity_logo.png"
                          alt="Duoninfinity — Ifa Ninfinity"
                          className="toebit-sym-img"
                        />
                      )}
                      {r.symSvg === 'ifazero' && (
                        <img
                          src="../src/assets/IfaZero.png"
                          alt="IfaZero Metarepresentation"
                          className="toebit-sym-img"
                        />
                      )}
                      {r.symSvg === 'ifaone' && (
                        <img
                          src="../src/assets/IfaOne.png"
                          alt="IfaOne Metarepresentation"
                          className="toebit-sym-img"
                        />
                      )}
                      {r.symText && r.symText}
                    </div>
                    <div className="toebit-rep__text">
                      <div className="toebit-rep__name">{r.name}</div>
                      <div className="toebit-rep__note">{r.note}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="toebit-axiom">
          "IfaZero (Ogbe) and IfaOne (Oyeku) are the Primordial Ancestors of all numbers and are not the same as zero (0) and one (1) in modern mathematics or computing."
        </p>
      </div>
    </section>
  );
}

// ── Featured Apps ─────────────────────────────────────────────
function FeaturedAppsSection({ platforms }) {
  const featured = platforms.filter(p => p.local && p.featured !== false);

  // All local apps, with featured first
  const localAll = [
    ...platforms.filter(p => p.local && p.featured),
    ...platforms.filter(p => p.local && !p.featured),
  ];

  return (
    <section className="section">
      <div className="container">
        <div className="section__header">
          <span className="section__eyebrow">Interactive Apps</span>
          <h2 className="section__title">Live IFA Platforms</h2>
          <div className="platforms-tagline">
            <p className="platforms-tagline__lead">
              Learn All Fields and Build Technologies with
            </p>
            <div className="platforms-tagline__roles">
              <span className="role-badge role-badge--babalawo">Babalawo</span>
              <span className="role-badge role-badge--iyanifa">Iyanifa</span>
              <span className="role-badge role-badge--olorisa">Olorisa</span>
              <span className="role-badge role-badge--onisegun">Onisese</span>
            </div>
          </div>
          <p className="section__desc">
            Explore the IFA Internet through interactive tools — built and running on toe.cenproject.org.
          </p>
        </div>

        <div className="featured-grid">
          {localAll.map(p => {
            const accent = CAT_COLOR[p.category] || '#f5c518';
            const icon   = APP_ICON[p.id] || p.name.slice(0,2).toUpperCase();
            return (
              <a
                key={p.id}
                href={p.url}
                className="featured-card"
                style={{ '--card-accent': accent }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="featured-card__top">
                  <div className="featured-card__icon" style={{ background: accent }}>
                    {icon}
                  </div>
                  <div className="featured-card__names">
                    <div className="featured-card__name">{p.name}</div>
                    <div className="featured-card__subtitle">{p.subtitle}</div>
                  </div>
                </div>
                <p className="featured-card__desc">{p.description}</p>
                <span className="badge-local">Live App</span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── Platforms Catalog ─────────────────────────────────────────
function PlatformsSection({ platforms, categories }) {
  const [active, setActive] = useState('all');

  const filtered = active === 'all'
    ? platforms
    : platforms.filter(p => p.category === active || (p.alsoIn && p.alsoIn.includes(active)));

  return (
    <section id="platforms" className="section section--alt">
      <div className="container">
        <div className="section__header">
          <span className="section__eyebrow">Platform Catalog</span>
          <h2 className="section__title">All IFA Platforms</h2>
          <p className="section__desc">
            40+ Platforms spanning every field ... mathematics, sciences, technology, networking, language, philosophy, education, others — all unified in one Theory of Everything (TOE).
          </p>
        </div>

        {/* Category filters */}
        <div className="filter-tabs">
          {categories.map(cat => {
            const isActive = active === cat.id;
            return (
              <button
                key={cat.id}
                className={`filter-tab${isActive ? ' filter-tab--active' : ''}`}
                style={isActive ? { background: cat.color, color: cat.id === 'all' ? '#fff' : '#000' } : {}}
                onClick={() => setActive(cat.id)}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Platform grid */}
        <div className="platforms-grid">
          {filtered.map(p => {
            const accent = CAT_COLOR[p.category] || '#f5c518';
            return (
              <a
                key={p.id}
                href={p.url}
                className="platform-card"
                style={{ '--card-accent': accent }}
                target="_blank"
                rel="noopener noreferrer"
              >
                {p.local && <span className="platform-card__local-badge" title="Live app" />}
                <div className="platform-card__cat-bar" />
                <div className="platform-card__name">{p.name}</div>
                <div className="platform-card__subtitle">{p.subtitle}</div>
                <p className="platform-card__desc">{p.description}</p>
                <span className="platform-card__arrow">→</span>
              </a>
            );
          })}
        </div>

        <p className="platforms-count">
          Showing {filtered.length} of {platforms.length} platforms
        </p>
      </div>
    </section>
  );
}

// ── Networking Section ────────────────────────────────────────
function NetworkingSection({ networking }) {
  return (
    <section id="networking" className="section">
      <div className="container">
        <div className="section__header">
          <span className="section__eyebrow">IFA Internetworking</span>
          <h2 className="section__title">{networking.title}</h2>
          <p className="section__desc">{networking.description}</p>
        </div>

        {/* Hub */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
          <div className="networking-hub">
            <span className="networking-hub__symbol">⊛</span>
            <span className="networking-hub__label">
              <span className="networking-hub__label-top">IFA Internet</span><br />
              <span className="networking-hub__label-sub">The Internet of Internets</span>
            </span>
          </div>
        </div>

        {/* Nodes */}
        <div className="networking-layout">
          {networking.nodes.map(node => (
            <div
              key={node.id}
              className="networking-node"
              style={{ '--node-accent': node.accent }}
            >
              <div className="networking-node__name">{node.name}</div>
              <div className="networking-node__subtitle">{node.subtitle}</div>
              <p className="networking-node__desc">{node.description}</p>
            </div>
          ))}
        </div>

        {/* Natural vs Artificial Internetworking */}
        <div className="inet-split">
          <div className="inet-split__intro">
            <p className="inet-split__lead">
              The IFA Internet is a <strong>natural and conscious Internet</strong> — rooted in the Living Energy of{' '}
              <strong>Ogbe</strong>, the primal Force of existence. As the Internet of Internets, it encompasses all
              artificial Internets: the classical Internet (the modern Internet), the quantum Internet, and others yet
              to emerge.
            </p>
          </div>

          <div className="inet-split__grid">
            {/* Natural */}
            <div className="inet-card inet-card--natural">
              <div className="inet-card__header">
                <span className="inet-card__icon">◯</span>
                <div>
                  <h4 className="inet-card__title">Natural Internetworking</h4>
                  <span className="inet-card__tag">Conscious · Energy-Based</span>
                </div>
              </div>
              <p className="inet-card__desc">
                Natural internetworking operates through <strong>Brain-to-Brain Communications</strong> (B2B Comms) —
                direct Energy-based connections between conscious nodes, without physical intermediaries.
              </p>
              <div className="inet-card__computers">
                <span className="inet-card__comp-label">Natural Computers</span>
                <div className="inet-card__comp-list">
                  <span className="inet-card__comp">Ifa Computer</span>
                  <span className="inet-card__comp">Orisa Computer</span>
                  <span className="inet-card__comp">Human Computer</span>
                </div>
              </div>
              <div className="inet-card__comms">
                <strong>B2B Comms</strong> — Brain-to-Brain Connections
              </div>
            </div>

            {/* Artificial */}
            <div className="inet-card inet-card--artificial">
              <div className="inet-card__header">
                <span className="inet-card__icon">⬡</span>
                <div>
                  <h4 className="inet-card__title">Artificial Internetworking</h4>
                  <span className="inet-card__tag">Machine · Signal-Based</span>
                </div>
              </div>
              <p className="inet-card__desc">
                Artificial internetworking operates through <strong>Machine-to-Machine Communications</strong> (M2M Comms) —
                signal-based connections between engineered devices across physical networks.
              </p>
              <div className="inet-card__computers">
                <span className="inet-card__comp-label">Artificial Computers</span>
                <div className="inet-card__comp-list">
                  <span className="inet-card__comp">Modern Computer</span>
                  <span className="inet-card__comp">Quantum Computer</span>
                  <span className="inet-card__comp">Machine (AI) Systems</span>
                </div>
              </div>
              <div className="inet-card__comms">
                <strong>M2M Comms</strong> — Machine-to-Machine Connections
              </div>
            </div>
          </div>

          <div className="inet-split__footer">
            <span className="inet-split__consci">Key <strong>ConSci</strong> Applications — Consciousness Science of the IFA Internet</span>
          </div>
        </div>

        {/* Link to networking page */}
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <a
            href="/ifa-networking-toe-networking/"
            className="btn btn--secondary"
          >
            Explore IFA Networking →
          </a>
        </div>

        {/* IfaNetworks subsection */}
        <div className="ifa-networks">
          <h3 className="ifa-networks__title">IfaNetworks</h3>
          <p className="ifa-networks__desc">
            Independent networks within the IFA Ecosystem:
          </p>
          <div className="ifa-networks__list">
            <a
              href="https://www.kominifa.com/"
              className="ifa-network-card"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="ifa-network-card__name">Kominifa</span>
            </a>
            <a
              href="https://ejiodi.com/"
              className="ifa-network-card"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="ifa-network-card__name">Ejiodi</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────
function Footer({ footer }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__inner">
          <div className="footer__brand">
            <div className="footer__logo">
              <img src="../src/assets/itoe_logo.png" alt="iTOE" className="footer__logo-mark" />
              <span>The IFA Internet</span>
            </div>
            <p className="footer__tagline">{footer.tagline}</p>
            <p className="footer__tagline" style={{ marginTop: 4 }}>
              Part of the <a href="https://cenproject.org/" style={{ color: 'var(--gold)' }}>CENProject</a> — Consciousness-Energy Research.
            </p>
          </div>
          <nav className="footer__links">
            {footer.links.map(l => (
              <a
                key={l.label}
                href={l.href}
                className="footer__link"
                target={l.href.startsWith('http') ? '_blank' : undefined}
                rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="footer__bottom">
          <span className="footer__copy">© {footer.copyright}</span>
          <span className="footer__axiom">
            "Consciousness-Energy (CEN) is everything that really exists."
          </span>
        </div>
      </div>
    </footer>
  );
}

// ── App (root) ────────────────────────────────────────────────
function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('../data/platforms.json')
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then(setData)
      .catch(e => setError(e.message));
  }, []);

  if (error) {
    return (
      <div style={{
          minHeight: '100vh', display: 'flex', alignItems: 'center',
          justifyContent: 'center', flexDirection: 'column', gap: 16,
          color: 'var(--text-2)', fontFamily: 'monospace',
        }}>
          <span style={{ fontSize: '2rem' }}>⚠</span>
          <p>Failed to load data: {error}</p>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-3)' }}>
            Make sure the app is served over HTTP (not file://)
          </p>
        </div>
    );
  }

  if (!data) {
    const delays = ['0s', '0.5s', '1s', '1.5s'];
    // 4 Ogbe marks × 44px + 3 gaps × 10px = total column height
    const ogbeColH = 4 * 44 + 3 * 10;

    return (
      <div style={{
        position: 'fixed', inset: 0,
        background: '#060e1c',
        backgroundImage: 'radial-gradient(circle, rgba(245,197,24,0.045) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: 44,
        fontFamily: 'Inter, system-ui, sans-serif',
        userSelect: 'none',
      }}>
        <style>{`
          @keyframes ifa-flash {
            0%, 100% { opacity: 0.12; }
            12.5%    { opacity: 1; }
            25%      { opacity: 0.12; }
          }
          @keyframes ifa-glow {
            0%, 100% { opacity: 0.12; filter: none; }
            12.5%    { opacity: 1; filter: drop-shadow(0 0 10px rgba(245,197,24,0.65)); }
            25%      { opacity: 0.12; filter: none; }
          }
          @keyframes connector-on {
            0%, 100% { opacity: 0.06; }
            12.5%    { opacity: 0.55; }
            25%      { opacity: 0.06; }
          }
          @keyframes ifa-title-breathe {
            0%, 100% { opacity: 0.75; }
            50%      { opacity: 1; }
          }
          @keyframes dot-seq {
            0%, 100% { opacity: 0.15; transform: scaleY(1); }
            50%      { opacity: 1;    transform: scaleY(1.5); }
          }
          @keyframes ifa4bit-breathe {
            0%, 100% { filter: drop-shadow(0 0 3px rgba(255,255,255,0.25)); opacity: 0.85; }
            50%      { filter: drop-shadow(0 0 14px rgba(255,255,255,0.75)); opacity: 1; }
          }
        `}</style>

        {/* Title */}
        <div style={{ textAlign: 'center', animation: 'ifa-title-breathe 3s ease-in-out infinite' }}>
          <div style={{
            fontSize: '1rem', fontWeight: 700, letterSpacing: '0.32em',
            color: '#f5c518', textTransform: 'uppercase',
          }}>
            IFA Internet
          </div>
          <div style={{
            fontSize: '0.6rem', letterSpacing: '0.2em', color: '#1e3350',
            textTransform: 'uppercase', marginTop: 7,
          }}>
            Global Network of Ifa Computers
          </div>
        </div>

        {/* Symbol matrix — 3 columns: Ogbe marks | connectors | IfaInfinity(4-Bit) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>

          {/* Column labels */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 2 }}>
            <span style={{ width: 44, textAlign: 'center', fontSize: '0.5rem', letterSpacing: '0.15em', color: '#1a2d45', textTransform: 'uppercase' }}>Ogbe</span>
            <span style={{ width: 70 }}/>
            <span style={{ width: 84, textAlign: 'center', fontSize: '0.5rem', letterSpacing: '0.15em', color: '#1a2d45', textTransform: 'uppercase' }}>IfaInfinity</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>

            {/* Left column: 4 individual Ogbe marks, each animated in sequence */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[0, 1, 2, 3].map(i => (
                <svg key={i} width="44" height="44" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg"
                     style={{ display: 'block', animation: 'ifa-flash 2s ease-in-out infinite', animationDelay: delays[i] }}>
                  <ellipse cx="22" cy="22" rx="4.5" ry="14" fill="white"/>
                </svg>
              ))}
            </div>

            {/* Center column: 4 connectors, each pulses with its row */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[0, 1, 2, 3].map(i => (
                <svg key={i} width="70" height="44" viewBox="0 0 70 44" xmlns="http://www.w3.org/2000/svg" fill="none"
                     style={{ display: 'block', animation: 'connector-on 2s ease-in-out infinite', animationDelay: delays[i] }}>
                  <line x1="4" y1="22" x2="60" y2="22" stroke="#f5c518" strokeWidth="1" strokeDasharray="5 4"/>
                  <polygon points="58,18 66,22 58,26" fill="#f5c518"/>
                </svg>
              ))}
            </div>

            {/* Right: IfaInfinity(4-Bit) — the precise metamathematical symbol */}
            <img
              src="../src/assets/IfaInfinity4Bit.png"
              alt="IfaInfinity 4-Bit"
              style={{
                height: ogbeColH,
                width: 'auto',
                display: 'block',
                animation: 'ifa4bit-breathe 2s ease-in-out infinite',
              }}
            />

          </div>
        </div>

        {/* Status bar */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          {/* 4 animated bars — mirror the 4 marks above */}
          <div style={{ display: 'flex', gap: 5, alignItems: 'flex-end', height: 14 }}>
            {[0, 1, 2, 3].map(i => (
              <div key={i} style={{
                width: 3, height: 10, borderRadius: 2,
                background: '#f5c518',
                animation: 'dot-seq 2s ease-in-out infinite',
                animationDelay: delays[i],
                transformOrigin: 'bottom',
              }}/>
            ))}
          </div>
          <div style={{
            fontSize: '0.62rem', letterSpacing: '0.16em',
            color: '#1e3350', textTransform: 'uppercase',
          }}>
            Initializing Ifa Computers
          </div>
        </div>

      </div>
    );
  }

  return (
    <>
      <Header />
      <MobileBar />
      <main>
        <HeroSection hero={data.hero} />
        <StatsBar stats={data.stats} />
        <MissionSection mission={data.mission} />
        <IfabitSection />
        <TOEBitSection />
        <FeaturedAppsSection platforms={data.platforms} />
        <PlatformsSection platforms={data.platforms} categories={data.categories} />
        <NetworkingSection networking={data.networking} />
      </main>
      <Footer footer={data.footer} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
