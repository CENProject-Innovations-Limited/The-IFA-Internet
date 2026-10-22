/* ─────────────────────────────────────────────────────────────────────────────
   Ifa Economics — TOE Economics
   The IFA Internet · CENProject
   ifainternet.org/ifa-economics/
───────────────────────────────────────────────────────────────────────────── */

const { useState } = React;

// ── Data ──────────────────────────────────────────────────────────────────────

const ALIASES = [
  { label: 'TOE Economics',                    color: '#f0920c' },
  { label: 'Ifa-Informed Economic Sciences',   color: '#f5c518' },
  { label: 'Orisa-Informed Economic Sciences', color: '#00c87c' },
  { label: 'Eboconomics',                      color: '#8b5cf6' },
  { label: 'Ifa Business Sciences',            color: '#3b9eff' },
];

const STATS = [
  { value: '16', label: 'Ifa Laws of Nature',   sub: 'Ojú Odù Ifá Mẹ̀rìndínlógún' },
  { value: '16', label: 'Orisa Laws of Nature',  sub: 'Ojú Odù Òòṣà Mẹ̀rìndínlógún' },
  { value: '256', label: 'Odu Ifa',              sub: 'Axiomatic Economic Matrix' },
  { value: 'I–V', label: 'Ètò Ẹ̀súníńdibú',    sub: '5 Core Efficiency Principles' },
];

const EFF_TOOLS = [
  { classical: 'Kaizen',             yoruba: 'Késẹ̀ẹnì',                          desc: 'Continuous, incremental improvement — daily, perpetual' },
  { classical: 'Kanban',             yoruba: 'Kànbáanì',                                desc: 'Visual signal-based workflow management' },
  { classical: 'Just-In-Time (JIT)', yoruba: 'Ìpèsè ní àkókò',                          desc: 'Right resource, right moment — zero excess inventory' },
  { classical: '5S Framework',       yoruba: 'Ìṣètò Ibi-iṣẹ́ S Márùn-ún',                 desc: 'Workplace organisation: Sort, Set in order, Shine, Standardize, Sustain — a core tool of TPS and Kaizen philosophy' },
  { classical: 'PDCA Cycle',         yoruba: 'Ètò Òbìrí Òwò ṢṢYGb (PDCA)· Ṣètò · Ṣe · Yẹẹ́wò · Gbégbésẹ̀', desc: 'Plan · Do · Check · Act — iterative improvement loop' },
  { classical: 'Quality Management', yoruba: 'Ìṣàkóso Ìdárasí ní Ilé Iṣẹ́',                      desc: 'Managing quality at every stage of production and delivery' },
  { classical: 'TQM',                yoruba: 'Ìṣàkóso Ìdárasí fún gbogbo Ẹ̀ka/Ìsọ̀rí Ilé Iṣẹ́', desc: 'Total Quality Management — quality as organisational culture' },
  { classical: 'Six Sigma',          yoruba: 'Sígímà Mẹ́fà',                             desc: 'Data-driven process quality — near-zero defect standard' },
  { classical: 'Lean',               yoruba: 'Ìṣiṣẹ́ Tẹẹ́rẹ́ Tẹẹ́rẹ́',                      desc: 'Eliminate waste; maximise value in every process step' },
];

const ESUN_TOOLS = [
  {
    num: 'I',
    name: 'Ìtọ́jú + Ìdọ́gba',
    sub: 'Conservation & Balance',
    color: '#f0920c',
    odu: 'Ọ̀yẹ̀kú-Ìká · Ìká-Ọ̀yẹ̀kú',
    body: 'Ìtọ́jú: conserve your energy for work that creates value — waste nothing at the source. Ìdọ́gba: balance quality against cost, input against output, short-term gain against long-term health.',
    tips: [
      'Daily: audit tasks — cut anything that consumes energy without creating value',
      'Set quality benchmarks before production begins; hold the balance between quality and speed',
      'Review cost vs value monthly; close resource leaks before they compound',
    ],
    principle: 'Ìtọ́jú okun àti agbára fún iṣẹ́ tówúlò — conserve your energy for work/activities that create value.',
  },
  {
    num: 'II',
    name: 'Idáfá / Ìdaáṣà / Ìbọ',
    sub: 'Ifa & Orisa Divination',
    color: '#8b5cf6',
    body: 'Consult Ifa (Idáfá) or Orisa (Ìdaáṣà) for spiritual support, protection, and strategic guidance — especially before major decisions, ventures, or pivots.',
    tips: [
      'Consult a trained babaláwo or Orisa priest before launching ventures or major pivots',
      'Ìbọ (the act of giving/offering Ẹbọ — sacrifice) teaches the importance of discipline, delayed gratification, and spiritual offering in business',
      'Perform prescribed Ẹbọ; spiritual alignment reduces unseen friction in business',
      'Revisit divination at key milestones: launch, expansion, partnership formation',
    ],
  },
  {
    num: 'III',
    name: 'Ìjáfáfá / Ìtẹramọ́ṣẹ́',
    sub: 'Hard Work & Smart Work',
    color: '#f5c518',
    body: 'Ìjáfáfá (hard work) without wisdom wastes energy. Ìtẹramọ́ṣẹ́ (persistent, efficient work) pairs effort with strategy — doing the right things, the right way.',
    tips: [
      'Plan before executing — every hour of planning saves three in correction',
      'Work with the grain of a task, not against it; remove friction before applying force',
      'Identify your highest-value activities and guard time for deep work',
      'Rest deliberately — Ìtọ́jú applies to human energy, not only material resources',
    ],
  },
  {
    num: 'IV',
    name: 'Ìwàpẹ̀lẹ́',
    sub: 'Integrity & Good Character',
    color: '#00c87c',
    body: 'Integrity, honesty, respect, fairness, and good work ethics. In Ifa, Ìwàpẹ̀lẹ́ is the single most powerful attractor of long-term prosperity — and the hardest to recover once lost.',
    tips: [
      'Honour every commitment — reputation is the scarcest form of business capital',
      'Resolve disputes fairly; a just settlement costs less than a destroyed relationship',
      'Treat staff, suppliers, and customers with equal respect',
      'Let Ìwàpẹ̀lẹ́ show in the small decisions — it compounds over time',
    ],
  },
  {
    num: 'V',
    name: 'Iyè-inú-fún-òwò (Iyènú)',
    sub: 'Entrepreneurial Mindset',
    color: '#3b9eff',
    body: 'The capacity to spot opportunity, turn problems into viable business ideas, and manage resources with discipline. Iyènú is cultivated through practice, not merely gifted at birth.',
    tips: [
      'Train the eye to see problems as unmet needs — every complaint is a market signal',
      'Track cash flow daily; financial discipline is the skeleton of every venture',
      'Build deep market understanding before diversifying — breadth without depth is brittle',
      'Read across fields: innovation arrives most often from adjacent domains',
    ],
  },
];

const PROVERBS = [
  {
    yor: 'Ọgbọ́n ọdún yií, agọ̀ ẹ̀mií ni',
    meaning: "Today's wisdom is tomorrow's folly",
    lesson: 'Business knowledge grows stale. Commit to continuous evaluation and adaptation — what worked last cycle may not serve today.',
    color: '#f0920c',
  },
  {
    yor: 'Ọlọ́gbọ́n kan ò le takókó omi métí aṣọ, mọ̀ràn-mọ̀ràn kan ò lè mọ oye iyẹ̀pẹ̀ ilẹ̀',
    meaning: 'No single expert can wring every drop; no single counsel can know all the depth of the earth',
    lesson: 'Human knowledge has limits. Stay humble, keep learning, remain open to ideas from outside your industry and discipline.',
    color: '#8b5cf6',
  },
  {
    yor: 'Akirikọ́fá ṣàgbà agbélékọ́fá',
    meaning: 'The one who learns from many sources becomes senior to the one who learns from one',
    lesson: 'Draw from diverse fields, disciplines, and people. Cross-disciplinary learning drives the innovation that single-track expertise cannot.',
    color: '#00c87c',
  },
];

// ── Components ────────────────────────────────────────────────────────────────

function Header() {
  return (
    <header className="header">
      <div className="header__inner">
        <div className="header__brand">
          <div>
            <div className="header__site">The IFA Internet</div>
            <div className="header__name">Ifa Economics</div>
          </div>
        </div>
        <nav className="header__nav" aria-label="Page sections">
          <a href="#biz-mgmt"    className="nav-link">Business Management</a>
          <a href="#econ-sci"    className="nav-link">Economic Sciences</a>
          <a href="#efficiency"  className="nav-link">Business Efficiency</a>
          <a href="#esun"        className="nav-link">Ètò Ẹ̀súníńdibú</a>
          <a href="./advanced/" className="nav-link nav-link--adv" target="_blank" rel="noopener noreferrer">Advanced ↗</a>
          <a href="https://ifainternet.org" className="nav-link nav-link--cta">IFA Internet</a>
        </nav>
      </div>
    </header>
  );
}

function MobileBar() {
  return (
    <nav className="mobile-bar" aria-label="Mobile navigation">
      <div className="mobile-bar__row">
        <a href="#biz-mgmt"   className="mobile-bar__item"><span className="mobile-bar__sym">🏢</span>Business</a>
        <a href="#econ-sci"   className="mobile-bar__item"><span className="mobile-bar__sym">📐</span>Sciences</a>
        <a href="#efficiency" className="mobile-bar__item"><span className="mobile-bar__sym">⚙️</span>Efficiency</a>
        <a href="#esun"       className="mobile-bar__item"><span className="mobile-bar__sym">⬡</span>Ètò Ẹ̀sún</a>
        <a href="https://ifainternet.org" className="mobile-bar__item"><span className="mobile-bar__sym">🌐</span>IFA Internet</a>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__grid" />
        <div className="hero__orb hero__orb--a" />
        <div className="hero__orb hero__orb--b" />
        <div className="hero__orb hero__orb--c" />
        <div className="hero__scanline" />
      </div>

      <div className="container">
        <div className="hero__layout">
          <div className="hero__left">
            <div className="hero__badge">
              <span className="hero__badge-dot" aria-hidden="true" />
              TOE Economics · The IFA Internet
            </div>
            <div className="hero__title">
              <span className="hero__title-main">Ifa Economics</span>
              <span className="hero__title-sub">Ìmọ̀jìnlẹ̀ Ọrọ̀ Ajé ní Èdè Ifá — The Economics of Everything</span>
            </div>
            <p className="hero__tagline">Ifa-Informed · Orisa-Informed · Odu-Axiomatic</p>
            <p className="hero__desc">
              The economic sciences of the IFA Internet — grounded in the 256 Odu Ifa and the 16 Laws of Nature.
              Covers a variety of disciplines, including, but not limited to, IfaBusiness Management, OrisaBusiness Management, Ifa-Informed Economic Sciences,
              and <strong>Ètò Ẹ̀súníńdibú</strong> — the Ifa-Orisa Business Efficiency System.
            </p>
            <div className="hero__aliases">
              {ALIASES.map(a => (
                <span key={a.label} className="hero__alias" style={{ '--alias-color': a.color }}>{a.label}</span>
              ))}
            </div>
          </div>
          <div className="hero__right" aria-hidden="true">
            <div className="energy-orb">
              <div className="energy-orb__ring energy-orb__ring--1" />
              <div className="energy-orb__ring energy-orb__ring--2" />
              <div className="energy-orb__ring energy-orb__ring--3" />
              <div className="energy-orb__arc energy-orb__arc--1" />
              <div className="energy-orb__arc energy-orb__arc--2" />
              <div className="energy-orb__arc energy-orb__arc--3" />
              <div className="energy-orb__particle energy-orb__particle--1" />
              <div className="energy-orb__particle energy-orb__particle--2" />
              <div className="energy-orb__particle energy-orb__particle--3" />
              <div className="energy-orb__particle energy-orb__particle--4" />
              <div className="energy-orb__core">
                <div className="energy-orb__core-glow" />
                <span className="energy-orb__char">₦⟳</span>
                <span className="energy-orb__core-label">TOE Econ</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hero__stats-bar">
        <div className="container">
          <div className="hero__stats">
            {STATS.map(s => (
              <div key={s.label} className="hero__stat">
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

// ── Business Management ───────────────────────────────────────────────────────

function BizManagementSection() {
  return (
    <section className="section section--alt" id="biz-mgmt">
      <div className="container">
        <div className="section__header">
          <span className="section__eyebrow section__eyebrow--amber">// Business Management</span>
          <h2 className="section__title">
            <span className="accent--amber">IfaBusiness</span> &amp; <span className="accent--jade">OrisaBusiness</span> Management
          </h2>
          <p className="section__subtitle">
            Business management studied and practised in alignment with the Laws of Nature —
            the 16 Principal Odu Ifa (Ifa) and the 16 Principal Odu Orisa (Orisa).
          </p>
        </div>

        <div className="biz-duo">
          {/* IfaBusiness Management */}
          <div className="biz-card biz-card--ifa">
            <div className="biz-card__bar" style={{ background: 'linear-gradient(90deg, var(--amber), transparent)' }} />
            <div className="biz-card__header">
              <div className="biz-card__icon" style={{ color: 'var(--amber-lt)' }}>⬡</div>
              <div>
                <div className="biz-card__name">IfaBusiness Management</div>
                <div className="biz-card__sub">Ìṣàkóso Òwò Ifá</div>
              </div>
            </div>
            <p className="biz-card__body">
              Business management studied, done/practiced in line with the{' '}
              <strong>16 Ifa Laws of Nature (Ojú Odù Ifá Mẹ̀rìndínlógún)</strong> — the 16 Principal Odu Ifa.
              Each of the 16 laws governs a domain of business reality: strategy, resources, relationships, risk,
              growth, and more. IfaBusiness Management applies these laws as living operating principles,
              not merely historical or spiritual references.
            </p>
            <div className="biz-card__tag" style={{ borderColor: 'rgba(240,146,12,0.3)', color: 'var(--amber-lt)' }}>
              Ifa-Informed Business Practice
            </div>
          </div>

          {/* OrisaBusiness Management */}
          <div className="biz-card biz-card--orisa">
            <div className="biz-card__bar" style={{ background: 'linear-gradient(90deg, var(--jade), transparent)' }} />
            <div className="biz-card__header">
              <div className="biz-card__icon" style={{ color: 'var(--jade-lt)' }}>◈</div>
              <div>
                <div className="biz-card__name">OrisaBusiness Management</div>
                <div className="biz-card__sub">Ìṣàkóso Òwò Òòṣà</div>
              </div>
            </div>
            <p className="biz-card__body">
              Business management studied, done/practiced in line with the{' '}
              <strong>16 Orisa Laws of Nature (Ojú Odù Òòṣà Mẹ̀rìndínlógún)</strong> — the 16 Principal Odu Orisa.
              OrisaBusiness Management is the dual of IfaBusiness Management (Ojú/Òdì), bringing the intuitive,
              relational, and creative dimensions of the Orisa Laws into organisational strategy, leadership, and
              operational culture.
            </p>
            <div className="biz-card__tag" style={{ borderColor: 'rgba(0,200,124,0.3)', color: 'var(--jade-lt)' }}>
              Orisa-Informed Business Practice
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Economic Sciences ─────────────────────────────────────────────────────────

function EconomicSciencesSection() {
  return (
    <section className="section" id="econ-sci">
      <div className="container">
        <div className="section__header">
          <span className="section__eyebrow section__eyebrow--violet">// Economic Sciences & Practices</span>
          <h2 className="section__title">
            Ifa &amp; Orisa <span className="accent--violet">Economic Sciences</span>
          </h2>
          <p className="section__subtitle">
            Also known as Ifa-Informed and Orisa-Informed Economic Sciences — mathematical, polymathic,
            and interdisciplinary approaches to economics grounded in the Odu Ifa framework.
          </p>
        </div>

        <div className="sci-grid">
          <div className="sci-card" style={{ '--sc': '#f0920c' }}>
            <div className="sci-card__top">
              <div className="sci-card__icon">∀</div>
              <div className="sci-card__num">01</div>
            </div>
            <div className="sci-card__title">Ifa Economic Sciences</div>
            <div className="sci-card__also">Also: Ifa-Informed Economic Sciences</div>
            <p className="sci-card__body">
              Mathematical, polymathic, and interdisciplinary economic sciences informed by the Ifa system —
              from micro and macro economics through to econometrics, game theory, behavioural economics,
              and development economics, all read through the axiomatic lens of the 256 Odu Ifa.
            </p>
          </div>

          <div className="sci-card" style={{ '--sc': '#00c87c' }}>
            <div className="sci-card__top">
              <div className="sci-card__icon">∃</div>
              <div className="sci-card__num">02</div>
            </div>
            <div className="sci-card__title">Orisa Economic Sciences</div>
            <div className="sci-card__also">Also: Orisa-Informed Economic Sciences</div>
            <p className="sci-card__body">
              The dual of Ifa Economic Sciences — economic sciences informed by the Orisa Laws of Nature.
              Where Ifa Economics emphasises universal principles (∀, For All), Orisa Economics
              brings the particular and contextual (∃, There Exists): local economies, communal exchange,
              and the situated wisdom of the Orisa Laws.
            </p>
          </div>

          <div className="sci-card" style={{ '--sc': '#f5c518' }}>
            <div className="sci-card__top">
              <div className="sci-card__icon">⊕</div>
              <div className="sci-card__num">03</div>
            </div>
            <div className="sci-card__title">Ifa-Informed Economic Practices</div>
            <div className="sci-card__also">Applied Ifa Economics</div>
            <p className="sci-card__body">
              The applied arm of Ifa Economic Sciences — economic practices, business models, financial
              instruments, and policy frameworks developed or evaluated in alignment with the Ifa Laws
              of Nature. Bridges Ifa Economic theory and real-world decision-making.
            </p>
          </div>

          <div className="sci-card" style={{ '--sc': '#3b9eff' }}>
            <div className="sci-card__top">
              <div className="sci-card__icon">◎</div>
              <div className="sci-card__num">04</div>
            </div>
            <div className="sci-card__title">Orisa-Informed Economic Practices</div>
            <div className="sci-card__also">Applied Orisa Economics</div>
            <p className="sci-card__body">
              The applied dual — economic practices, community exchange models, and organisational
              cultures shaped by the Orisa Laws. Particularly concerned with relational, creative,
              and sustainable dimensions of economic life that purely quantitative models miss.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Business Efficiency ───────────────────────────────────────────────────────

function BusinessEfficiencySection() {
  return (
    <section className="section section--alt" id="efficiency">
      <div className="container">
        <div className="section__header">
          <span className="section__eyebrow section__eyebrow--amber">// Ṣíṣe-Òwò-Lọ́nà-Tótọ́</span>
          <h2 className="section__title">
            Business Efficiency <span className="accent--amber">in Yoruba: Effectiveness vs Efficiency</span>
          </h2>
          <p className="section__subtitle">
            Classical efficiency frameworks — Kaizen, Kanban, Lean, and others — expressed in
            Yoruba through Ifa and Orisa language. Ṣíṣe-Òwò-Lọ́nà-Tótọ́: making business work right and well.
          </p>
          <p className="section__subtitle">
            Effectiveness is doing the right things to achieve your desired goals, while efficiency is doing things right by using the least amount of resources, time, or money.
          </p>
          <p className="section__subtitle">
            Efficiency, <em>Ìfi-ọ́nà-tótọ́-ṣe-ǹnkan</em>, is more about process than action, entails doing things right.
          </p>
          <p className="section__subtitle">
            Effectiveness, <em>Ìṣe-ǹnkan-lọ́nà-tótọ́</em>, is more about action than process, entails doing the right things.
          </p>
        </div>

        <div className="eff-table">
          <div className="eff-table__head">
            <span>Classical</span>
            <span>Àlàyé</span>
            <span className="eff-table__desc-head">Description</span>
          </div>
          {EFF_TOOLS.map(t => (
            <div key={t.classical} className="eff-row">
              <span className="eff-row__classical">{t.classical}</span>
              <span className="eff-row__yoruba">{t.yoruba}</span>
              <span className="eff-row__desc">{t.desc}</span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '2.5rem', paddingTop: '1.25rem', borderTop: '1px solid rgba(240,146,12,0.12)' }}>
          <p style={{ fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-3, #505869)', marginBottom: '0.6rem' }}>Keywords</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {[
              'Ìmọ̀jìnlẹ̀ Ọrọ̀ Ajé ní Èdè Ifá',
              'Ìmọ̀jìnlẹ̀ Ọrọ̀ Ajé Ifá',
              'Ìmọ̀jìnlẹ̀ Ọrọ̀ Ajé Òrìṣà',
              'Ifa Business Studies (Ẹ̀kọ́ Òwò Ifá Ṣíṣe)',
              'Òrìṣà Business Studies (Ẹ̀kọ́ Òwò Òrìṣà Ṣíṣe)',
              'Ifa Accounting (Ẹ̀kọ́ Ìṣírò Òwò/Owó Ifá Ṣíṣe)',
              'Ifa Finance (Ẹ̀kọ́ Ìdókòwò Ifá)',
            ].map(kw => (
              <span key={kw} style={{
                display: 'inline-block', padding: '3px 10px',
                background: 'rgba(240,146,12,0.08)', border: '1px solid rgba(240,146,12,0.22)',
                borderRadius: '999px', fontSize: '0.72rem', color: 'var(--text-2, #8892aa)',
                lineHeight: 1.5,
              }}>{kw}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Ètò Ẹ̀súníńdibú ──────────────────────────────────────────────────────────

function EtoSuniNdibuSection() {
  const [open, setOpen] = useState(null);

  return (
    <section className="section" id="esun">
      <div className="container">

        {/* Section header */}
        <div className="section__header">
          <span className="section__eyebrow section__eyebrow--amber">// Ọ̀yẹ̀kú-Ìká · Ọ̀yẹ̀kú-bìká</span>
          <h2 className="section__title">
            <span className="accent--amber">Ètò Ẹ̀sún Teéré Teéré ní Ń'dibú</span>
          </h2>
          <p className="section__subtitle" style={{ maxWidth: '720px' }}>
            Known in short as <strong>Ètò Ẹ̀súníńdibú</strong> or <strong>I máarùn</strong>{' '}
            (pronounced <em>ee máarùn</em>, the 5 Is) — a key Ifa-Orisa System for production,
            industrial operations, engineering, and every field of study and profession.
          </p>
        </div>

        {/* Definition callout */}
        <div className="esun-callout">
          <div className="esun-callout__icon">⬡</div>
          <div className="esun-callout__body">
            <strong>Ètò Ẹ̀súníńdibú</strong> is the Ifa-Orisa equivalent of the 5S Framework and
            Lean methodology — a system for conserving energy, eliminating waste lean at the source,
            and sustaining the conditions for productive, high-quality work.
            It is a key <strong>Ifa-Orisa Bridging Tool</strong> designed to close the gap between
            business and economic theory on one side, and practice on the other.
          </div>
        </div>

        {/* 5 Tools */}
        <h3 className="esun-tools-title">I máarùn — The 5 Core Principles</h3>
        <div className="esun-tools">
          {ESUN_TOOLS.map((tool, i) => (
            <div
              key={tool.num}
              className={'esun-tool' + (open === i ? ' esun-tool--open' : '')}
              style={{ '--tc': tool.color }}
            >
              <button
                className="esun-tool__header"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <div className="esun-tool__num">{tool.num}</div>
                <div className="esun-tool__titles">
                  <div className="esun-tool__name">{tool.name}</div>
                  <div className="esun-tool__sub">{tool.sub}</div>
                </div>
                {tool.odu && (
                  <div className="esun-tool__odu">Odu: {tool.odu}</div>
                )}
                <div className="esun-tool__chevron">{open === i ? '−' : '+'}</div>
              </button>

              {open === i && (
                <div className="esun-tool__detail">
                  <p className="esun-tool__body">{tool.body}</p>
                  {tool.principle && (
                    <blockquote className="esun-tool__principle">
                      <span className="esun-tool__principle-mark" aria-hidden="true">❧</span>
                      {tool.principle}
                    </blockquote>
                  )}
                  <div className="esun-tips">
                    <div className="esun-tips__label">Daily practice</div>
                    {tool.tips.map((tip, j) => (
                      <div key={j} className="esun-tip">
                        <span className="esun-tip__dot" aria-hidden="true">·</span>
                        <span>{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Proverbs */}
        <div style={{ marginTop: '3rem' }}>
          <h3 className="esun-tools-title">Key Ifa-Orisa Business Efficiency Principles</h3>
          <div className="proverbs">
            {PROVERBS.map(p => (
              <div key={p.yor} className="proverb-card" style={{ '--pc': p.color }}>
                <div className="proverb-card__yor">{p.yor}</div>
                <div className="proverb-card__meaning">{p.meaning}</div>
                <p className="proverb-card__lesson">{p.lesson}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__energy-line" aria-hidden="true" />
      <div className="container">
        <div className="footer__inner">
          <div className="footer__brand">
            <div className="footer__logo">
              <span style={{ color: 'var(--amber-lt)', fontWeight: 800 }}>Ifa Economics</span>
            </div>
            <p className="footer__tagline">
              TOE Economics · The Economics of the Theory of Everything<br />
              Part of{' '}
              <a href="https://ifainternet.org" className="footer__link-inline">The IFA Internet</a>
              {' '}— the iTOE by CENProject.
            </p>
            <p className="footer__tagline footer__tagline--sm">
              Ifa-Informed Economic Sciences · Orisa-Informed Economic Sciences ·
              Ètò Ẹ̀súníńdibú · Ọ̀yẹ̀kú-Ìká
            </p>
          </div>
          <div className="footer__links">
            <a href="https://ifainternet.org"                          className="footer__link">The IFA Internet</a>
            <a href="./advanced/"                                       className="footer__link" target="_blank" rel="noopener noreferrer">Advanced — IFABOK Program</a>
            <a href="https://toe.cenproject.org/ebology-the-field-of-energy-exchange/" className="footer__link">Ebology</a>
            <a href="https://ifainternet.org/ifa-logic/"               className="footer__link">IfaLogic</a>
            <a href="https://ifainternet.org/ifa-computing/"           className="footer__link">Ifa Computing</a>
          </div>
        </div>
        <div className="footer__bottom">
          <span className="footer__copy">© The IFA Internet · CENProject</span>
          <span className="footer__powered">TOE Economics · Ifa-Informed Economic Sciences</span>
        </div>
      </div>
    </footer>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <BizManagementSection />
        <EconomicSciencesSection />
        <BusinessEfficiencySection />
        <EtoSuniNdibuSection />
      </main>
      <Footer />
      <MobileBar />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
