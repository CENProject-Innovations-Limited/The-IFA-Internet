/* ─────────────────────────────────────────────────────────────────────────────
   Advanced Ifa Economics — IFABOK Program
   -oE Structures · IfaConvertible Farm · Ifa-Orisa Tree Model
   The IFA Internet · CENProject
   ifainternet.org/ifa-economics/advanced/
───────────────────────────────────────────────────────────────────────────── */

const { useState } = React;

// ── Login Config (change credentials here) ────────────────────────────────────
const LOGIN_USER = 'ifabok';
const LOGIN_PASS = 'ifabok2025';
const SESSION_KEY = 'ifabok_adv_auth';

// ── Data ──────────────────────────────────────────────────────────────────────

const OE_STRUCTS = [
  {
    id: 'okolé',
    key: 'oko ilé (okolé)',
    color: '#00c87c',
    type: 'farm',
    trans: 'Household Farm',
    body: 'The foundational household agricultural unit of the Ifa economy. All other oko structures build outward from okolé.',
    op: {
      yor: 'Dídá owó oko òwò (okoòwò) nígbà ìkómọ',
      en: 'Contributing okoòwò money (funds raised for a child during the naming ceremony) for the mother to set up a business for the child later, or for them to learn a trade, skill, or pursue education.',
    },
  },
  {
    id: 'okoòwò',
    key: 'oko òwò (okoòwò)',
    color: '#f0920c',
    type: 'farm',
    trans: 'Commerce Farm',
    body: 'Farm or enterprise dedicated to trade and commercial exchange — the economic production unit of the Ifa household economy.',
    op: null,
  },
  {
    id: 'okowòsàn',
    key: 'oko ìwòsàn (okowòsàn)',
    color: '#3b9eff',
    type: 'farm',
    trans: 'Healing Farm',
    body: 'A farm (large or small) featuring a wide variety of natural medicines and herbs. Encompasses: ilé ìwòsàn (healing house / hospital), ilẹ̀ ìwòsàn (healing land — grounding-based treatment techniques), òdò ìwòsàn (healing river/sea), and omi ìwòsàn (healing water). Used for treating mental illness and serious, severe, or benign health conditions.',
    sub: [
      { key: 'ilé ìwòsàn',  en: 'Healing house / hospital' },
      { key: 'ilẹ̀ ìwòsàn', en: 'Healing land — grounding-based treatment' },
      { key: 'òdò ìwòsàn',  en: 'Healing river / sea' },
      { key: 'omi ìwòsàn',  en: 'Healing water' },
    ],
    op: null,
  },
  {
    id: 'okajé',
    key: 'oko ajé (okajé)',
    color: '#f5c518',
    type: 'farm',
    trans: 'Prosperity Farm',
    body: 'Farm for cultivating and stewarding material and spiritual wealth in alignment with Ifa.',
    op: null,
  },
  {
    id: 'okomọ̀',
    key: 'oko ìmọ̀ (okomọ̀)',
    color: '#8b5cf6',
    type: 'farm',
    trans: 'Knowledge Farm',
    body: 'Structured space for cultivating, preserving, and sharing knowledge — the agricultural metaphor applied to intellectual production.',
    op: null,
  },
  {
    id: 'igbóìmọ̀',
    key: 'igbó ìmọ̀',
    color: '#38e8a0',
    type: 'forest',
    trans: 'Knowledge Forest',
    body: 'The forest of deep, expansive, interconnected knowledge — beyond the cultivated farm of okomọ̀.',
    op: null,
  },
  {
    id: 'okoẹ̀kọ́',
    key: 'oko ẹ̀kọ́ (okoẹ̀kọ́)',
    color: '#e9498a',
    type: 'farm',
    trans: 'Education Farm',
    body: 'Farm structured for the transmission of knowledge — formal and informal education rooted in Ifa pedagogical principles.',
    op: null,
  },
  {
    id: 'igbófá',
    key: 'igbó Ifá (igbófá)',
    color: '#ffaa32',
    type: 'sacred',
    trans: 'Ifa Sacred Grove',
    body: 'Sacred forest of Ifa — a protected spiritual-ecological space for Ifa wisdom, transmission, and practice. Part of igbó irúnmọlẹ̀.',
    op: null,
  },
  {
    id: 'igbòòṣà',
    key: 'igbó òòṣà (igbòòṣà)',
    color: '#00c87c',
    type: 'sacred',
    trans: 'Orisa Sacred Grove',
    body: 'Sacred forest of the Orisa — ecological and spiritual domain of Orisa guardianship and worship. Part of igbó irúnmọlẹ̀.',
    op: null,
  },
];

// ── Tree data: parent structures + shared child ───────────────────────────────

const IGBO_IRUNMOLE = {
  id: 'igbóirúnmọlẹ̀', label: 'Igbó Irúnmọlẹ̀', sub: 'Sacred Parent Structures', color: '#f5c518',
  desc: 'The collective sacred groves — Igbó Ifá (Igbófá) and Igbó Òòṣà (Igbòòṣà) — the divine parent structures (male and female) from which the entire Ifa-Orisa system emerges.',
};

// Parent structures — both parents of the Ifa-Orisa System
const PARENTS = [
  {
    id: 'igbófá', label: 'Igbó Ifá (Igbófá)', sub: 'Ifa Sacred Grove · Parent', color: '#ffaa32',
    desc: 'Sacred forest of Ifa — a protected spiritual-ecological space for Ifa wisdom, transmission, and practice. Parent structure of the Ifa-Orisa system, jointly constituting Igbó Irúnmọlẹ̀ with Igbó Òòṣà.',
  },
  {
    id: 'igbòòṣà', label: 'Igbó Òòṣà (Igbòòṣà)', sub: 'Orisa Sacred Grove · Parent', color: '#00c87c',
    desc: 'Sacred forest of the Orisa — ecological and spiritual domain of Orisa guardianship and worship. Parent structure of the Ifa-Orisa system, jointly constituting Igbó Irúnmọlẹ̀ with Igbó Ifá.',
  },
];

// The Ifa-Orisa System — single child of both parent structures
const IFA_ORISA_SYSTEM = {
  id: 'root', label: 'Ifa-Orisa System', sub: '256 Odu Ifa', color: '#f0920c',
  desc: 'The 256 Odu Ifa — the axiomatic foundation from which all Ifa-Orisa structures emerge successively. Child of both parent structures: Igbó Ifá (Igbófá) and Igbó Òòṣà (Igbòòṣà).',
  children: [
    {
      id: 'okolé', label: 'Oko Ilé (Okolé)', sub: 'Household Farm', color: '#00c87c',
      desc: 'The core household agricultural unit — foundation of the Ifa domestic economy. All oko variants emerge from here.',
      children: [
        {
          id: 'okoòwò', label: 'Okoòwò', sub: 'Commerce Farm', color: '#f0920c',
          desc: 'Trade and commerce farm — the okoòwò principle governs all business enterprise.', children: [],
        },
        {
          id: 'okowòsàn', label: 'Okowòsàn', sub: 'Healing Farm', color: '#3b9eff',
          desc: 'Healing farm complex: natural herbs and medicines, plus ilé ìwòsàn (hospital), ilẹ̀ ìwòsàn (healing land/grounding), òdò ìwòsàn (healing river/sea), omi ìwòsàn (healing water).',
          children: [
            { id: 'iléìwòsàn',  label: 'Ilé Ìwòsàn',  sub: 'Hospital',      color: '#7dc3ff', desc: 'The healing house — structured care in the Ifa tradition.', children: [] },
            { id: 'ilẹ̀ìwòsàn', label: 'Ilẹ̀ Ìwòsàn', sub: 'Healing Land',  color: '#7dc3ff', desc: 'Grounding-based treatment — the earth itself as therapeutic agent.', children: [] },
            { id: 'òdòìwòsàn',  label: 'Òdò Ìwòsàn',  sub: 'Healing River', color: '#7dc3ff', desc: 'Aquatic healing — hydrotherapy and ritual healing in river or sea.', children: [] },
            { id: 'omiìwòsàn',  label: 'Omi Ìwòsàn',  sub: 'Healing Water', color: '#7dc3ff', desc: 'Sacred and medicinal water — a key element of Ifa healing practice.', children: [] },
          ],
        },
        {
          id: 'okajé', label: 'Okajé', sub: 'Prosperity Farm', color: '#f5c518',
          desc: 'Farm for cultivating material and spiritual prosperity.', children: [],
        },
        {
          id: 'okomọ̀', label: 'Okomọ̀', sub: 'Knowledge Farm', color: '#8b5cf6',
          desc: 'Knowledge cultivation — structured intellectual and wisdom farming.',
          children: [
            { id: 'igbóìmọ̀', label: 'Igbó Ìmọ̀', sub: 'Knowledge Forest', color: '#38e8a0', desc: 'Deep, wild, interconnected knowledge — beyond the cultivated okomọ̀ farm.', children: [] },
          ],
        },
        {
          id: 'okoẹ̀kọ́', label: 'Okoẹ̀kọ́', sub: 'Education Farm', color: '#e9498a',
          desc: 'Farm for formal and informal education rooted in Ifa pedagogy.', children: [],
        },
      ],
    },
    {
      id: 'settlement', label: 'Settlement Progression', sub: 'Abà → Àgbáyé', color: '#3b9eff',
      desc: 'The successive emergence of human settlement forms — from hamlet outward to nation, country, continent, world, and ultimately the Universe.',
      children: [
        { id: 'abà',    label: 'Abà',           sub: 'Hamlet',  color: '#6e90b8', desc: 'The smallest settlement — a cluster of households.', children: [] },
        {
          id: 'abúlé',  label: 'Abúlé / Ilétò', sub: 'Village', color: '#7dc3ff',
          desc: 'Village — organised community with shared resources and informal governance.',
          children: [
            { id: 'ọjà', label: 'Ọjà', sub: 'Market', color: '#f5c518', desc: 'The market — emerges with community density; the site of okoòwò exchange.', children: [] },
          ],
        },
        { id: 'ìlú',    label: 'Ìlú',           sub: 'Town',    color: '#f0920c', desc: 'Town — larger settlement with defined governance and specialised roles.', children: [] },
        { id: 'ìpínlẹ̀', label: 'Ìpínlẹ̀',      sub: 'State',   color: '#8b5cf6', desc: 'State — a formally bounded political and economic unit.', children: [] },
        { id: 'orílẹ̀',          label: 'Orílẹ̀ Èdè',                         sub: 'Èdè Nation',                       color: '#00c87c', desc: 'Nation — uniting people under shared identity, language, governance, and Ifa values.', children: [] },
        { id: 'àgbárílẹ̀-kékeré', label: 'Àgbájọ Orílẹ̀ Èdè (Àgbárílẹ̀) Kékeré', sub: 'Country',                          color: '#6366f1', desc: 'Country — a bounded political-geographic entity; a gathering (àgbájọ) of nations (orílẹ̀ èdè) within a defined territory under shared governance.', children: [] },
        { id: 'àgbárílẹ̀-ńlà',   label: 'Àgbárílẹ̀ Ńlà',                        sub: 'Continent',                         color: '#3b9eff', desc: 'Continent — a great landmass encompassing many countries; the broad geographic and cultural grouping of nations and peoples.', children: [] },
        { id: 'ayé',             label: 'Ayé',                                  sub: 'The World / Earth',                 color: '#14b8d4', desc: 'Ayé — the World / Earth; the physical plane of existence inhabited by humankind, nature, and all living beings.', children: [] },
        { id: 'alẹ̀-ufẹ̀',       label: 'Alẹ̀ Ufẹ̀ / Ifẹ̀',                    sub: 'Ifa-Orisa Origin of the Universe',   color: '#f5c518', desc: 'Alẹ̀ Ufẹ̀/Ifẹ̀ — the sacred Ifa-Orisa origin point of the Universe; Alẹ̀ Ufẹ̀ as the cosmological ground from which all creation was seeded and the 256 Odu Ifa were revealed.', children: [] },
        { id: 'àgbáyé',         label: 'Àgbá Ayé (Àgbáyé)',                    sub: 'The Universe',                      color: '#8b5cf6', desc: 'Àgbá Ayé (Àgbáyé) — the Universe; the totality of all existence, seen and unseen, encompassing Ayé (the physical world) and Ọ̀run (the spiritual realm) as one complete whole.', children: [] },
      ],
    },
  ],
};

// ── Dual / Inverted Tree chain ────────────────────────────────────────────────

const INVERTED_CHAIN = [
  { id: 'i-abà',              label: 'Abà',                                      sub: 'Hamlet',                          color: '#6e90b8', desc: 'The smallest settlement — a cluster of households.' },
  { id: 'i-abúlé',            label: 'Abúlé / Ilétò',                           sub: 'Village',                         color: '#7dc3ff', desc: 'Village — organised community with shared resources and informal governance.' },
  { id: 'i-ìlú',              label: 'Ìlú',                                      sub: 'Town',                            color: '#f0920c', desc: 'Town — larger settlement with defined governance and specialised roles.' },
  { id: 'i-ìpínlẹ̀',          label: 'Ìpínlẹ̀',                                sub: 'State',                           color: '#8b5cf6', desc: 'State — a formally bounded political and economic unit.' },
  { id: 'i-orílẹ̀',           label: 'Orílẹ̀ Èdè',                             sub: 'Èdè Nation',                      color: '#00c87c', desc: 'Nation — uniting people under shared identity, language, governance, and Ifa values.' },
  { id: 'i-àgbárílẹ̀-kékeré', label: 'Àgbájọ Orílẹ̀ Èdè (Àgbárílẹ̀) Kékeré', sub: 'Country',                        color: '#6366f1', desc: 'Country — a bounded political-geographic entity; a gathering of nations within a defined territory under shared governance.' },
  { id: 'i-àgbárílẹ̀-ńlà',   label: 'Àgbárílẹ̀ Ńlà',                          sub: 'Continent',                       color: '#3b9eff', desc: 'Continent — a great landmass encompassing many countries; the broad geographic and cultural grouping of nations and peoples.' },
  { id: 'i-ayé',              label: 'Ayé',                                      sub: 'The World / Earth',               color: '#14b8d4', desc: 'Ayé — the World / Earth; the physical plane of existence inhabited by humankind, nature, and all living beings.' },
  { id: 'i-alẹ̀-ufẹ̀',        label: 'Alẹ̀ Ufẹ̀ / Ifẹ̀',                      sub: 'Ifa-Orisa Origin of the Universe', color: '#f5c518', desc: 'Alẹ̀ Ufẹ̀/Ifẹ̀ — the sacred Ifa-Orisa origin point of the Universe; Alẹ̀ Ufẹ̀ as the cosmological ground from which all creation was seeded and the 256 Odu Ifa were revealed.' },
  { id: 'i-àgbáyé',          label: 'Àgbá Ayé (Àgbáyé)',                       sub: 'The Universe',                    color: '#8b5cf6', desc: 'Àgbá Ayé (Àgbáyé) — the Universe; the totality of all existence, seen and unseen, encompassing Ayé (the physical world) and Ọ̀run (the spiritual realm) as one complete whole.' },
];

// ── Login Gate ────────────────────────────────────────────────────────────────

function LoginGate({ onAuth }) {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    setTimeout(() => {
      if (user.trim().toLowerCase() === LOGIN_USER && pass === LOGIN_PASS) {
        sessionStorage.setItem(SESSION_KEY, '1');
        onAuth();
      } else {
        setError('Incorrect username or password.');
        setBusy(false);
      }
    }, 400);
  };

  return (
    <div className="login-gate">
      <div className="login-gate__bg" aria-hidden="true">
        <div className="login-gate__grid" />
        <div className="login-gate__orb login-gate__orb--a" />
        <div className="login-gate__orb login-gate__orb--b" />
      </div>
      <div className="login-box">
        <div className="login-box__badge">IFABOK Program</div>
        <div className="login-box__logo">Advanced Ifa Economics</div>
        <p className="login-box__sub">Premium content — sign in to access</p>
        <form className="login-form" onSubmit={submit} noValidate>
          <label className="login-form__label" htmlFor="lf-user">Username</label>
          <input
            id="lf-user" type="text"
            className="login-form__input"
            value={user}
            onChange={e => setUser(e.target.value)}
            autoComplete="username"
            required
          />
          <label className="login-form__label" htmlFor="lf-pass">Password</label>
          <input
            id="lf-pass" type="password"
            className="login-form__input"
            value={pass}
            onChange={e => setPass(e.target.value)}
            autoComplete="current-password"
            required
          />
          {error && <div className="login-form__error" role="alert">{error}</div>}
          <button type="submit" className="login-form__btn" disabled={busy}>
            {busy ? 'Verifying…' : 'Sign In'}
          </button>
        </form>
        <a href="../" className="login-box__back">← Back to Ifa Economics</a>
      </div>
    </div>
  );
}

// ── Components ────────────────────────────────────────────────────────────────

function Header() {
  return (
    <header className="header">
      <div className="header__inner">
        <div className="header__brand">
          <div className="header__breadcrumb">
            <a href="https://ifainternet.org/ifa-economics/" className="header__bc-link">Ifa Economics</a>
            <span className="header__bc-sep">›</span>
            <span className="header__bc-cur">Advanced</span>
          </div>
        </div>
        <nav className="header__nav" aria-label="Page sections">
          <a href="#ifafarm"         className="nav-link">IfaFarm</a>
          <a href="#smart-ifafarm"   className="nav-link">Smart IfaFarm</a>
          <a href="#oaa"             className="nav-link">OaaS · OaaP</a>
          <a href="#oe-structures"   className="nav-link">-oE Structures</a>
          <a href="#conv-farm"       className="nav-link">IfaConvertible</a>
          <a href="#ifa-tree"        className="nav-link">Tree Model</a>
          <a href="https://ifainternet.org/the-ifa-learn/"
             className="nav-link nav-link--learn"
             target="_blank" rel="noopener noreferrer">IfaLearn ↗</a>
          <a href="https://ifainternet.org/ifa-economics/" className="nav-link nav-link--cta">Ifa Economics</a>
        </nav>
      </div>
    </header>
  );
}

function MobileBar() {
  return (
    <nav className="mobile-bar" aria-label="Mobile navigation">
      <div className="mobile-bar__row">
        <a href="#ifafarm"        className="mobile-bar__item"><span className="mobile-bar__sym">🌾</span>IfaFarm</a>
        <a href="#smart-ifafarm"  className="mobile-bar__item"><span className="mobile-bar__sym">🌿</span>Smart Farm</a>
        <a href="#oaa"            className="mobile-bar__item"><span className="mobile-bar__sym">⟳</span>OaaS·OaaP</a>
        <a href="#oe-structures"  className="mobile-bar__item"><span className="mobile-bar__sym">⬡</span>-oE</a>
        <a href="#conv-farm"      className="mobile-bar__item"><span className="mobile-bar__sym">⟳</span>Convertible</a>
        <a href="#ifa-tree"       className="mobile-bar__item"><span className="mobile-bar__sym">🌳</span>Tree</a>
        <a href="https://ifainternet.org/the-ifa-learn/"
           className="mobile-bar__item"
           target="_blank" rel="noopener noreferrer">
          <span className="mobile-bar__sym">◎</span>IfaLearn
        </a>
        <a href="https://ifainternet.org/ifa-economics/" className="mobile-bar__item"><span className="mobile-bar__sym">←</span>Ifa Econ</a>
      </div>
    </nav>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="hero" id="ifafarm">
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__grid" />
        <div className="hero__orb hero__orb--a" />
        <div className="hero__orb hero__orb--b" />
        <div className="hero__scanline" />
      </div>
      <div className="container">
        <div className="hero__layout">
          <div className="hero__left">
            <div className="hero__badge">
              <span className="hero__badge-dot" aria-hidden="true" />
              Advanced Ifa Economics · IFABOK Program
            </div>
            <div className="hero__title">
              <span className="hero__title-main">IfaFarm &amp; Ifagric</span>
              <span className="hero__title-sub">-oE Structures · IfaConvertible Farm · Ifa-Orisa Tree Model</span>
            </div>
            <p className="hero__desc">
              IfaFarm (Ifagric) — the application of Ifa-Orisa principles to agricultural and structural design.
              Every domain of life maps to an <em>oko</em> (farm), <em>igbó</em> (forest), <em>ilé</em> (house), or <em>ilẹ̀</em> (land/ground) — the <strong>-oE (of/for Everything) Structures</strong> of the Odu Ifa.
            </p>
            <div className="hero__tags">
              {['Oko', 'Igbó', 'Ilé', 'Ilẹ̀', '-oE Structures', 'IfaConvertible Farm', 'Ifa-Orisa Tree Model'].map(t => (
                <span key={t} className="hero__tag">{t}</span>
              ))}
            </div>
          </div>
          <div className="hero__right" aria-hidden="true">
            <div className="farm-orb">
              <div className="farm-orb__ring farm-orb__ring--1" />
              <div className="farm-orb__ring farm-orb__ring--2" />
              <div className="farm-orb__ring farm-orb__ring--3" />
              <div className="farm-orb__core">
                <span className="farm-orb__sym">🌾</span>
                <span className="farm-orb__label">Ifagric</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Smart IfaFarm · Okolé ─────────────────────────────────────────────────────

const SF_FEATURES = [
  {
    sym: '🌿',
    color: '#00c87c',
    title: 'Living Farm Intelligence',
    desc: 'Smart tools rooted in the 256 Odu Ifa that read, respond to, and amplify the natural intelligence of your farm — where real-time data flows meet Àṣẹ.',
  },
  {
    sym: '⚡',
    color: '#f5c518',
    title: 'Digital Root Network',
    desc: 'A connected ecosystem of sensors, dashboards, and Ifa-modelled algorithms — the technological nervous system of your Smart Okoilé, always grounded in earth.',
  },
  {
    sym: '🌾',
    color: '#f0920c',
    title: 'Odu-Aligned Cultivation',
    desc: 'Planting, harvest, and resource cycles guided by the axiomatic wisdom of the Odu Ifa — ancient seasonal intelligence made digitally precise and actionable.',
  },
  {
    sym: '⬡',
    color: '#3b9eff',
    title: 'Ẹbọnet Integration',
    desc: 'Every Smart IfaFarm is a living node in the Ẹbọnet — your farm\'s outputs, exchanges, and energy flows wired directly into the Ifa energy-exchange economy.',
  },
];

function SmartIfaFarmSection() {
  return (
    <section className="section section--smart-farm" id="smart-ifafarm">
      <div className="container">

        <div className="sf-layout">
          <div className="sf-text">
            <span className="section__eyebrow section__eyebrow--jade">// Smart IfaFarm · Okolé</span>
            <h2 className="section__title sf__title">
              Where Nature <span className="accent--jade">Lives</span> Inside Technology
            </h2>
            <p className="sf__lead">
              <strong>Smart IfaFarm, Okoilé</strong> is the household farm reimagined for the digital
              age — a seamlessly integrated ecosystem where the living intelligence of nature and the
              precision of technology are no longer separate worlds but a single, breathing whole.
              This is not technology imitating nature: it is nature amplified through the axiomatic
              wisdom of Ifa, delivered as the most connected, most alive digital farming experience
              ever conceived.
            </p>
            <p className="sf__sub">
              Every tool, every data stream, every interaction within Smart IfaFarm, Okolé is
              rooted in the <strong>256 Odu Ifa</strong> — the eternal code of nature itself.
              The farm breathes. The technology listens. Together, they cultivate life across
              every dimension of existence.
            </p>
            <div className="sf__tags">
              {['Ifa Digital Farm', 'Nature-First Tech', 'Odu Ifa Alignment', 'Smart Okolé', 'Ẹbọnet Node', 'Ifagric Platform'].map(t => (
                <span key={t} className="sf__tag">{t}</span>
              ))}
            </div>
          </div>

          <div className="sf-visual" aria-hidden="true">
            <div className="sf-orb">
              <div className="sf-orb__ring sf-orb__ring--3" />
              <div className="sf-orb__ring sf-orb__ring--2" />
              <div className="sf-orb__ring sf-orb__ring--1" />
              <div className="sf-orb__particle sf-orb__particle--1">🌿</div>
              <div className="sf-orb__particle sf-orb__particle--2">⚡</div>
              <div className="sf-orb__particle sf-orb__particle--3">◎</div>
              <div className="sf-orb__particle sf-orb__particle--4">⬡</div>
              <div className="sf-orb__core">
                <span className="sf-orb__sym">🌾</span>
                <span className="sf-orb__label">Smart Okolé</span>
                <span className="sf-orb__sub">Nature × Digital</span>
              </div>
            </div>
          </div>
        </div>

        <div className="sf-features">
          {SF_FEATURES.map((f, i) => (
            <div key={i} className="sf-card" style={{ '--sfc': f.color }}>
              <div className="sf-card__sym">{f.sym}</div>
              <div className="sf-card__glow" />
              <div className="sf-card__title">{f.title}</div>
              <p className="sf-card__desc">{f.desc}</p>
              <div className="sf-card__bar" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

// ── OaaS / OaaP ───────────────────────────────────────────────────────────────

const OAA_MODELS = [
  {
    id: 'oaas',
    badge: 'Service',
    color: '#14b8d4',
    sym: '⟳',
    short: 'OaaS',
    title: 'Okoilé-as-a-Service',
    tagline: 'We design, build, and activate your Smart Okoilé.',
    body: 'OaaS is the complete end-to-end service of designing, building, and activating a Smart Okoilé — tailored precisely to your home, estate, or organisation. From soil intelligence and Odu-aligned cultivation systems to connected sensors, dashboards, and full Ẹbọnet integration, we deliver the complete fusion of living nature and advanced technology. You receive the harmony and peace of nature, the luxury of the digital world, and the wisdom of Ifa — all woven into one breathing, intelligent space.',
    forList: [
      'Homeowners seeking a living, breathing digital farm',
      'Companies building nature-forward campuses and retreats',
      'Estates and residential developments',
      'Wellness, healing, and hospitality centres',
    ],
  },
  {
    id: 'oaap',
    badge: 'Product',
    color: '#00c87c',
    sym: '⬡',
    short: 'OaaP',
    title: 'Okoilé-as-a-Product',
    tagline: 'A complete Smart Okoilé — own it, deploy it, live it.',
    body: 'OaaP is Smart Okoilé packaged as a fully deployable product — a self-contained ecosystem of intelligent farm hardware, Ifa-modelled software, and nature-integrated design that any home or company can acquire, install, and own outright. No ongoing service dependency. Just the harmony and peace of nature, the luxury of the digital world, and the axiomatic wisdom of Ifa — delivered as a complete, ownable product.',
    forList: [
      'Homeowners ready to own their nature-digital future',
      'Companies investing in sustainable, living workspaces',
      'Property developers embedding Smart Okoilé into new builds',
      'Investors in Ifa-rooted agri-tech products',
    ],
  },
];

function OaaSection() {
  return (
    <section className="section section--oaa" id="oaa">
      <div className="container">

        <div className="section__header">
          <span className="section__eyebrow section__eyebrow--jade">// Smart Okoilé · Delivery Models</span>
          <h2 className="section__title">
            Okoilé-as-a-Service <span className="oaa__amp">&amp;</span> Okoilé-as-a-Product
          </h2>
          <p className="section__subtitle">
            The harmony of nature and the luxury of the digital world — delivered two ways:
            as a bespoke service we design and build for you, or as a complete product you own.
          </p>
        </div>

        <div className="oaa-split">
          {OAA_MODELS.map(o => (
            <div key={o.id} className="oaa-card" style={{ '--oac': o.color }}>
              <div className="oaa-card__glow" aria-hidden="true" />
              <div className="oaa-card__top">
                <span className="oaa-card__badge">{o.badge}</span>
                <span className="oaa-card__sym" aria-hidden="true">{o.sym}</span>
              </div>
              <div className="oaa-card__short">{o.short}</div>
              <h3 className="oaa-card__title">{o.title}</h3>
              <p className="oaa-card__tagline">"{o.tagline}"</p>
              <p className="oaa-card__body">{o.body}</p>
              <div className="oaa-card__for">
                <span className="oaa-card__for-label">For</span>
                <ul className="oaa-card__for-list">
                  {o.forList.map((item, i) => (
                    <li key={i} className="oaa-card__for-item">
                      <span className="oaa-card__for-dot" aria-hidden="true">◆</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="oaa-card__bar" />
            </div>
          ))}
        </div>

        <div className="oaa-shared">
          <p className="oaa-shared__text">
            Both OaaS and OaaP are rooted in the <strong>256 Odu Ifa</strong> — the eternal
            axiomatic code of nature — and wired into the <strong>Ẹbọnet</strong> energy-exchange
            network. Whether you commission a Smart Okoilé or acquire one as a product, you step
            into the most harmonious fusion of nature, technology, and Ifa wisdom ever conceived.
          </p>
          <div className="oaa-shared__tags">
            {['Smart Okoilé', 'OaaS', 'OaaP', 'Nature × Digital', 'Ifa AgriTech', 'Ẹbọnet Node', 'Ifagric Platform'].map(t => (
              <span key={t} className="sf__tag">{t}</span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

// ── Vocabulary ────────────────────────────────────────────────────────────────

function VocabSection() {
  const VOCAB = [
    { yor: 'Oko',  en: 'Farm / Cultivated Space', color: '#00c87c',
      note: 'The primary unit of structured production — physical, intellectual, or spiritual. Every oko variant names a specific domain of cultivation.' },
    { yor: 'Igbó', en: 'Forest / Wild Productive Space', color: '#38e8a0',
      note: 'A larger, less-bounded productive space — the forest of knowledge, the sacred grove, the deep commons.' },
    { yor: 'Ilé',  en: 'House / Home', color: '#f0920c',
      note: 'The built structure — the healing house (ilé ìwòsàn), the family compound, the institutional home.' },
    { yor: 'Ilẹ̀', en: 'Ground / Land / Earth', color: '#f5c518',
      note: 'The land and earth as therapeutic and productive agent — grounding-based treatment, land stewardship.' },
  ];
  return (
    <section className="section section--alt" id="vocab">
      <div className="container">
        <div className="section__header">
          <span className="section__eyebrow section__eyebrow--jade">// Structural Vocabulary</span>
          <h2 className="section__title">Oko · Igbó · Ilé · Ilẹ̀</h2>
          <p className="section__subtitle">The four structural words that name every Ifa-Orisa productive space.</p>
        </div>
        <div className="vocab-grid">
          {VOCAB.map(v => (
            <div key={v.yor} className="vocab-card" style={{ '--vc': v.color }}>
              <div className="vocab-card__yor">{v.yor}</div>
              <div className="vocab-card__en">{v.en}</div>
              <p className="vocab-card__note">{v.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── IfaLearn Bridge ───────────────────────────────────────────────────────────

function IfaLearnBridge() {
  return (
    <div className="learn-bridge">
      <div className="container">
        <div className="learn-bridge__inner">
          <div className="learn-bridge__left">
            <div className="learn-bridge__tag">Okoẹ̀kọ́ · Okomọ̀ · Digital Expression</div>
            <h3 className="learn-bridge__title">
              <span style={{ color: '#38d4ec' }}>IfaLearn</span> — The Education Farm Made Digital
            </h3>
            <p className="learn-bridge__body">
              <strong>Okoẹ̀kọ́</strong> (Education Farm) and <strong>okomọ̀</strong> (Knowledge Farm)
              find their full digital embodiment in <strong>IfaLearn</strong> — the Ifa Digital Learning
              Ecosystem of the IFA Internet. Where the -oE Structures define the structural model,
              IfaLearn is the living platform: Ifacodemy, IfaLMS, Ifa AI, and more, all rooted
              in the same 256 Odu Ifa axiomatic foundation.
            </p>
            <a
              href="https://ifainternet.org/the-ifa-learn/"
              target="_blank" rel="noopener noreferrer"
              className="learn-bridge__cta"
            >
              Explore IfaLearn →
            </a>
          </div>
          <div className="learn-bridge__chips">
            {[
              ['⊞', 'IfaLMS',     '#14b8d4'],
              ['Ψ',  'Ifa AI',     '#7c3aed'],
              ['⊛', 'IfaLabs',    '#f5c518'],
              ['◈', 'Ifa Games',  '#f0920c'],
              ['⬡', 'Ifacodemy',  '#ec4899'],
            ].map(([sym, label, color]) => (
              <div key={label} className="learn-bridge__chip" style={{ '--lbc': color }}>
                <span className="learn-bridge__chip-sym">{sym}</span>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Okajé Section ─────────────────────────────────────────────────────────────

const OKAJE_MODELS = [
  {
    id: 'okoile',
    sym: '⬡',
    label: 'Okoilé',
    color: '#00c87c',
    desc: 'The Smart Ifa-Orisa Farm — nature-digital productive space.',
    xaas: { short: 'OkoilEaaS', full: 'Okoilé-as-a-Service' },
    xaap: { short: 'OkoilEaaP', full: 'Okoilé-as-a-Product' },
  },
  {
    id: 'ifax',
    sym: '◈',
    label: 'IfaX',
    color: '#f5c518',
    desc: 'Any Ifa-rooted service or product across every field and profession X.',
    xaas: { short: 'IfaXaaS', full: 'IfaX-as-a-Service' },
    xaap: { short: 'IfaXaaP', full: 'IfaX-as-a-Product' },
  },
  {
    id: 'orisax',
    sym: '⊛',
    label: 'OrisaX',
    color: '#8b5cf6',
    desc: 'Any Orisa-rooted service or product across every field and profession X.',
    xaas: { short: 'OrisaXaaS', full: 'OrisaX-as-a-Service' },
    xaap: { short: 'OrisaXaaP', full: 'OrisaX-as-a-Product' },
  },
];

function OkajeSection() {
  return (
    <section className="section section--alt" id="okaje">
      <div className="container">

        <div className="section__header">
          <span className="section__eyebrow section__eyebrow--amber">// Ajé · Ifa-Orisa Markets · Prosperity</span>
          <h2 className="section__title">
            Oko Ajé <span className="okaje__paren">(Okajé)</span>
          </h2>
          <p className="section__subtitle">
            Prosperity Farm — the commercial root of the Ifa-Orisa ecosystem,
            where every farm, grove, and knowledge system becomes a living market.
          </p>
        </div>

        {/* ── Ajemiposi Spotlight ── */}
        <div className="okaje-spotlight">
          <div className="okaje-spotlight__left">
            <div className="okaje-spotlight__badge">Ifa-Orisa African Markets</div>
            <h3 className="okaje-spotlight__title">Ajemiposi Africa</h3>
            <p className="okaje-spotlight__body">
              <strong>Ajemiposi</strong> is the Ifa-Orisa marketplace for Africa and the African diaspora —
              hosting <strong>IfaMarkets</strong> and <strong>OrisaMarkets</strong> as both digital and
              physical Ifa-Orisa Market Places. Every seller, practitioner, and creator brings their
              Okoilé, IfaX, or OrisaX offering to Ajemiposi — finding buyers across the continent
              and across the world.
            </p>
            <a
              href="https://ajemiposi.com/"
              target="_blank" rel="noopener noreferrer"
              className="okaje-spotlight__cta"
            >
              Visit Ajemiposi →
            </a>
          </div>
          <div className="okaje-spotlight__right">
            {[
              ['◎', 'IfaMarkets',         '#00c87c'],
              ['⊛', 'OrisaMarkets',        '#8b5cf6'],
              ['⬡', 'Digital Marketplaces','#f5c518'],
              ['◈', 'Physical Marketplaces','#f0920c'],
            ].map(([sym, label, color]) => (
              <div key={label} className="okaje-chip" style={{ '--okc': color }}>
                <span className="okaje-chip__sym">{sym}</span>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Delivery Models ── */}
        <div className="okaje-grid">
          {OKAJE_MODELS.map(m => (
            <div key={m.id} className="okaje-card" style={{ '--okc': m.color }}>
              <div className="okaje-card__glow" aria-hidden="true" />
              <div className="okaje-card__sym">{m.sym}</div>
              <h3 className="okaje-card__label">{m.label}</h3>
              <p className="okaje-card__desc">{m.desc}</p>
              <div className="okaje-card__pills">
                <div className="okaje-pill okaje-pill--service">
                  <span className="okaje-pill__tag">XaaS</span>
                  <span className="okaje-pill__name">{m.xaas.short}</span>
                  <span className="okaje-pill__full">{m.xaas.full}</span>
                </div>
                <div className="okaje-pill okaje-pill--product">
                  <span className="okaje-pill__tag">XaaP</span>
                  <span className="okaje-pill__name">{m.xaap.short}</span>
                  <span className="okaje-pill__full">{m.xaap.full}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="okaje-note">
          X stands for any service, product, field, or profession —
          <strong> IfaXaaS / IfaXaaP</strong> and <strong>OrisaXaaS / OrisaXaaP</strong> are
          universal delivery wrappers for the entire Ifa-Orisa knowledge economy.
        </p>

      </div>
    </section>
  );
}

// ── -oE Structures ────────────────────────────────────────────────────────────

const TYPE_BADGE = { farm: 'Oko', forest: 'Igbó', sacred: 'Igbó Irúnmọlẹ̀' };

function OeStructuresSection() {
  const [open, setOpen] = useState(null);

  return (
    <section className="section" id="oe-structures">
      <div className="container">
        <div className="section__header">
          <span className="section__eyebrow section__eyebrow--violet">// -oE Structures</span>
          <h2 className="section__title">
            <span className="accent--violet">-oE Structures</span>
          </h2>
          <p className="section__subtitle">
            -oE (of/for Everything) Structures are the general Ifa-Orisa models for every domain of life.
            Click any card to read its description.
          </p>
        </div>

        <div className="oe-grid">
          {OE_STRUCTS.map((s, i) => (
            <div
              key={s.id}
              className={'oe-card' + (open === i ? ' oe-card--open' : '')}
              style={{ '--oc': s.color }}
              onClick={() => setOpen(open === i ? null : i)}
              role="button" tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && setOpen(open === i ? null : i)}
              aria-expanded={open === i}
            >
              <div className="oe-card__top">
                <span className="oe-card__badge">{TYPE_BADGE[s.type]}</span>
                <span className="oe-card__arr" aria-hidden="true">{open === i ? '−' : '+'}</span>
              </div>
              <div className="oe-card__key">{s.key}</div>
              <div className="oe-card__trans">{s.trans}</div>
              {open === i && (
                <div className="oe-card__detail">
                  <p className="oe-card__body">{s.body}</p>
                  {s.sub && (
                    <ul className="oe-card__sublist">
                      {s.sub.map(x => (
                        <li key={x.key}><strong>{x.key}</strong> — {x.en}</li>
                      ))}
                    </ul>
                  )}
                  {s.op && (
                    <div className="oe-card__op">
                      <div className="oe-card__op-label">Operational Model</div>
                      <div className="oe-card__op-yor">{s.op.yor}</div>
                      <p className="oe-card__op-en">{s.op.en}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="oe-note">
          <strong>Igbó irúnmọlẹ̀</strong> — the collective term for <strong>Igbófá</strong> and <strong>Igbòòṣà</strong> —
          are the divinely established Parent Structures of all Ifa-Orisa structures. They precede and transcend
          the -oE succession model; see the Ifa-Orisa Tree Model below for their position at the root.
        </div>
      </div>
    </section>
  );
}

// ── IfaConvertible Farm ────────────────────────────────────────────────────────

function IfaConvertibleSection() {
  return (
    <section className="section section--alt" id="conv-farm">
      <div className="container">
        <div className="section__header">
          <span className="section__eyebrow section__eyebrow--amber">// IfaConvertible Farm</span>
          <h2 className="section__title">
            <span className="accent--amber">IfaConvertible Farm</span>
          </h2>
          <p className="section__subtitle">
            A farm or productive space designed to be convertible between -oE structure types —
            functioning as okowòsàn, okoòwò, okomọ̀, or okoẹ̀kọ́ in different seasons, needs, or Odu cycles,
            based on Ifa and Orisa Structures.
          </p>
        </div>

        <div className="conv-layout">
          <div className="conv-card">
            <div className="conv-card__num">01</div>
            <div className="conv-card__icon">⟳</div>
            <div className="conv-card__title">Convertibility Principle</div>
            <p className="conv-card__body">
              The 256 Odu Ifa provide structural templates for any domain of activity. An IfaConvertible Farm
              applies these templates modularly — the same physical or institutional space can be reconfigured
              across oko types as circumstances require, without losing its Ifa-Orisa grounding.
            </p>
          </div>

          <div className="conv-card">
            <div className="conv-card__num">02</div>
            <div className="conv-card__icon" style={{ color: '#00c87c' }}>⬡</div>
            <div className="conv-card__title">Operational Model — Okolé</div>
            <p className="conv-card__body">
              <strong>Dídá owó oko òwò (okoòwò) nígbà ìkómọ</strong> — contributing okoòwò money
              (funds raised for a child during the naming ceremony) for the mother to set up a business
              for the child later, or for them to learn a trade, skill, or pursue education.
            </p>
            <p className="conv-card__body conv-card__body--mt">
              The okolé system treats the child's future productivity as a farm — okoòwò capital is
              seeded at birth through ìkómọ contributions and cultivated over time, an indigenous model
              of capital formation and human investment rooted in Ifa community practice.
            </p>
          </div>

          <div className="conv-card">
            <div className="conv-card__num">03</div>
            <div className="conv-card__icon" style={{ color: '#3b9eff' }}>◈</div>
            <div className="conv-card__title">Ifa &amp; Orisa Structural Basis</div>
            <p className="conv-card__body">
              Each oko variant is grounded in specific Odu Ifa governing its domain — okowòsàn aligns with
              Odu governing health and healing; okoòwò aligns with Odu governing commerce; okajé with Odu
              governing prosperity. The IfaConvertible Farm operates across these Odu templates as a unified,
              flexible Ifa-Orisa structure.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Ifa-Orisa Tree Model ───────────────────────────────────────────────────────

function InvertedTree({ activeId, onSelect }) {
  return (
    <div className="inv-tree">

      {/* Linear chain: Abà → Àgbáyé */}
      <div className="inv-chain">
        {INVERTED_CHAIN.map((node, idx) => (
          <React.Fragment key={node.id}>
            <button
              className={'tnode__btn inv-node' + (activeId === node.id ? ' tnode__btn--active' : '')}
              style={{ '--nc': node.color }}
              onClick={() => onSelect(node.id, node)}
            >
              <span className="tnode__label">{node.label}</span>
              <span className="tnode__sub">{node.sub}</span>
            </button>
            {idx < INVERTED_CHAIN.length - 1 && (
              <div className="inv-vline" aria-hidden="true" />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Transition: Àgbáyé → Ifa-Orisa System */}
      <div className="inv-vline inv-vline--accent" aria-hidden="true" />

      {/* Ifa-Orisa System */}
      <button
        className={'tnode__btn otree__root-btn' + (activeId === 'i-root' ? ' tnode__btn--active' : '')}
        style={{ '--nc': IFA_ORISA_SYSTEM.color }}
        onClick={() => onSelect('i-root', IFA_ORISA_SYSTEM)}
      >
        <span className="tnode__label">{IFA_ORISA_SYSTEM.label}</span>
        <span className="tnode__sub">{IFA_ORISA_SYSTEM.sub}</span>
      </button>

      {/* Fork: Ifa-Orisa System → two parents */}
      <div className="otree__connector-wrap" aria-hidden="true">
        <svg className="otree__svg" viewBox="0 0 200 32" preserveAspectRatio="none">
          <line x1="100" y1="0"  x2="100" y2="16" stroke="rgba(240,146,12,0.4)"   strokeWidth="1.5"/>
          <line x1="50"  y1="16" x2="150" y2="16" stroke="rgba(245,197,24,0.35)"  strokeWidth="1.5"/>
          <line x1="50"  y1="16" x2="50"  y2="32" stroke="rgba(255,170,50,0.45)"  strokeWidth="1.5"/>
          <line x1="150" y1="16" x2="150" y2="32" stroke="rgba(0,200,124,0.45)"   strokeWidth="1.5"/>
        </svg>
      </div>

      {/* Two parent nodes */}
      <div className="otree__parents-row">
        {PARENTS.map(p => (
          <button
            key={'i-' + p.id}
            className={'tnode__btn otree__parent-btn' + (activeId === 'i-' + p.id ? ' tnode__btn--active' : '')}
            style={{ '--nc': p.color }}
            onClick={() => onSelect('i-' + p.id, { ...p, id: 'i-' + p.id })}
          >
            <span className="tnode__label">{p.label}</span>
            <span className="tnode__sub">{p.sub}</span>
          </button>
        ))}
      </div>

      {/* Merge: two parents → Igbó Irúnmọlẹ̀ */}
      <div className="otree__connector-wrap" aria-hidden="true">
        <svg className="otree__svg" viewBox="0 0 200 40" preserveAspectRatio="none">
          <line x1="50"  y1="0"  x2="50"  y2="20" stroke="rgba(255,170,50,0.45)"  strokeWidth="1.5"/>
          <line x1="150" y1="0"  x2="150" y2="20" stroke="rgba(0,200,124,0.45)"   strokeWidth="1.5"/>
          <line x1="50"  y1="20" x2="150" y2="20" stroke="rgba(245,197,24,0.35)"  strokeWidth="1.5"/>
          <line x1="100" y1="20" x2="100" y2="40" stroke="rgba(245,197,24,0.5)"   strokeWidth="1.5"/>
        </svg>
      </div>

      {/* Igbó Irúnmọlẹ̀ */}
      <button
        className={'tnode__btn otree__root-btn' + (activeId === 'i-igbóirúnmọlẹ̀' ? ' tnode__btn--active' : '')}
        style={{ '--nc': IGBO_IRUNMOLE.color }}
        onClick={() => onSelect('i-igbóirúnmọlẹ̀', IGBO_IRUNMOLE)}
      >
        <span className="tnode__label">{IGBO_IRUNMOLE.label}</span>
        <span className="tnode__sub">{IGBO_IRUNMOLE.sub}</span>
      </button>

    </div>
  );
}

function TreeNode({ node, depth, activeId, onSelect }) {
  const [open, setOpen] = useState(depth < 2);
  const hasKids = node.children && node.children.length > 0;
  const isActive = activeId === node.id;

  const toggle = () => {
    onSelect(node.id, node);
    if (hasKids) setOpen(o => !o);
  };

  return (
    <div className={'tnode tnode--d' + depth} style={{ '--nc': node.color }}>
      <button
        className={'tnode__btn' + (isActive ? ' tnode__btn--active' : '')}
        onClick={toggle}
        aria-expanded={hasKids ? open : undefined}
      >
        <span className="tnode__label">{node.label}</span>
        <span className="tnode__sub">{node.sub}</span>
        {hasKids && <span className="tnode__arr" aria-hidden="true">{open ? '▾' : '▸'}</span>}
      </button>
      {hasKids && open && (
        <div className={'tnode__kids tnode__kids--d' + depth}>
          {node.children.map(c => (
            <TreeNode key={c.id} node={c} depth={depth + 1} activeId={activeId} onSelect={onSelect} />
          ))}
        </div>
      )}
    </div>
  );
}

function IfaOriTreeSection() {
  const [activeId, setActiveId] = useState(null);
  const [activeNode, setActiveNode] = useState(null);
  const [treeMode, setTreeMode] = useState('original');

  const pick = (id, node) => {
    if (activeId === id) { setActiveId(null); setActiveNode(null); }
    else { setActiveId(id); setActiveNode(node); }
  };

  const switchMode = (mode) => {
    setTreeMode(mode);
    setActiveId(null);
    setActiveNode(null);
  };

  return (
    <section className="section" id="ifa-tree">
      <div className="container">
        <div className="section__header">
          <span className="section__eyebrow section__eyebrow--amber">// Ifa-Orisa Structural Tree</span>
          <h2 className="section__title">
            <span className="accent--amber">Ifa-Orisa Tree Model</span>
          </h2>
          <p className="section__subtitle">
            Igbó Irúnmọlẹ̀ — <strong>Igbó Ifá (Igbófá)</strong> and{' '}
            <strong>Igbó Òòṣà (Igbòòṣà)</strong> — are the two Parent Structures
            from which the Ifa-Orisa System is born. Click any node to read its description.
          </p>
        </div>

        {/* ── Tree mode switcher ── */}
        <div className="tree-switcher">
          <button
            className={'tree-switcher__btn' + (treeMode === 'original' ? ' tree-switcher__btn--active' : '')}
            onClick={() => switchMode('original')}
          >
            ▾ Original Tree
          </button>
          <button
            className={'tree-switcher__btn' + (treeMode === 'dual' ? ' tree-switcher__btn--active' : '')}
            onClick={() => switchMode('dual')}
          >
            ▴ Dual Tree
          </button>
        </div>

        {treeMode === 'original' ? (
          <div className="otree">

            {/* ① Root: Igbó Irúnmọlẹ̀ */}
            <div className="otree__root-row">
              <button
                className={'tnode__btn otree__root-btn' + (activeId === IGBO_IRUNMOLE.id ? ' tnode__btn--active' : '')}
                style={{ '--nc': IGBO_IRUNMOLE.color }}
                onClick={() => pick(IGBO_IRUNMOLE.id, IGBO_IRUNMOLE)}
              >
                <span className="tnode__label">{IGBO_IRUNMOLE.label}</span>
                <span className="tnode__sub">{IGBO_IRUNMOLE.sub}</span>
              </button>
            </div>

            {/* ② Fork: root → two parents */}
            <div className="otree__connector-wrap" aria-hidden="true">
              <svg className="otree__svg" viewBox="0 0 200 32" preserveAspectRatio="none">
                <line x1="100" y1="0"  x2="100" y2="16" stroke="rgba(245,197,24,0.35)"  strokeWidth="1.5"/>
                <line x1="50"  y1="16" x2="150" y2="16" stroke="rgba(245,197,24,0.35)"  strokeWidth="1.5"/>
                <line x1="50"  y1="16" x2="50"  y2="32" stroke="rgba(255,170,50,0.45)"  strokeWidth="1.5"/>
                <line x1="150" y1="16" x2="150" y2="32" stroke="rgba(0,200,124,0.45)"   strokeWidth="1.5"/>
              </svg>
            </div>

            {/* ③ Two parent nodes side by side */}
            <div className="otree__parents-row">
              {PARENTS.map(p => (
                <button
                  key={p.id}
                  className={'tnode__btn otree__parent-btn' + (activeId === p.id ? ' tnode__btn--active' : '')}
                  style={{ '--nc': p.color }}
                  onClick={() => pick(p.id, p)}
                >
                  <span className="tnode__label">{p.label}</span>
                  <span className="tnode__sub">{p.sub}</span>
                </button>
              ))}
            </div>

            {/* ④ Merge: two parents → single child */}
            <div className="otree__connector-wrap" aria-hidden="true">
              <svg className="otree__svg" viewBox="0 0 200 40" preserveAspectRatio="none">
                <line x1="50"  y1="0"  x2="50"  y2="20" stroke="rgba(255,170,50,0.45)"  strokeWidth="1.5"/>
                <line x1="150" y1="0"  x2="150" y2="20" stroke="rgba(0,200,124,0.45)"   strokeWidth="1.5"/>
                <line x1="50"  y1="20" x2="150" y2="20" stroke="rgba(245,197,24,0.35)"  strokeWidth="1.5"/>
                <line x1="100" y1="20" x2="100" y2="40" stroke="rgba(240,146,12,0.5)"   strokeWidth="1.5"/>
              </svg>
            </div>

            {/* ⑤ Child: Ifa-Orisa System + descendants */}
            <div className="otree__canvas">
              <TreeNode node={IFA_ORISA_SYSTEM} depth={0} activeId={activeId} onSelect={pick} />
            </div>

            {activeNode && (
              <div className="otree__detail" style={{ '--nc': activeNode.color }}>
                <div className="otree__detail-header">
                  <span className="otree__detail-name">{activeNode.label}</span>
                  <span className="otree__detail-sub">{activeNode.sub}</span>
                </div>
                <p className="otree__detail-desc">{activeNode.desc}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="otree otree--dual">
            <InvertedTree activeId={activeId} onSelect={pick} />
            {activeNode && (
              <div className="otree__detail" style={{ '--nc': activeNode.color }}>
                <div className="otree__detail-header">
                  <span className="otree__detail-name">{activeNode.label}</span>
                  <span className="otree__detail-sub">{activeNode.sub}</span>
                </div>
                <p className="otree__detail-desc">{activeNode.desc}</p>
              </div>
            )}
          </div>
        )}

        <div className="otree__sacred-note">
          <span className="otree__sacred-badge">Igbó Irúnmọlẹ̀</span>
          <span className="otree__sacred-text">
            <strong>Igbó Ifá (Igbófá)</strong> and <strong>Igbó Òòṣà (Igbòòṣà)</strong> —
            collectively <strong>Igbó Irúnmọlẹ̀</strong> — are the divinely established Parent Structures
            of all Ifa-Orisa structures. They are not succession-derived; they are the sacred foundation
            from which the entire system is grounded and emerges.
          </span>
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
              <span style={{ color: 'var(--jade-lt)', fontWeight: 800 }}>Advanced Ifa Economics</span>
            </div>
            <p className="footer__tagline">
              IFABOK Program · -oE Structures · IfaConvertible Farm<br />
              Part of{' '}
              <a href="https://ifainternet.org/ifa-economics/" className="footer__link-inline">Ifa Economics</a>
              {' '}·{' '}
              <a href="https://ifainternet.org" className="footer__link-inline">The IFA Internet</a>
            </p>
          </div>
          <div className="footer__links">
            <a href="https://ifainternet.org/ifa-economics/"  className="footer__link">Ifa Economics</a>
            <a href="https://ifainternet.org/the-ifa-learn/"
               className="footer__link" target="_blank" rel="noopener noreferrer">IfaLearn</a>
            <a href="https://ifainternet.org"                 className="footer__link">The IFA Internet</a>
            <a href="https://toe.cenproject.org/ebology-the-field-of-energy-exchange/" className="footer__link">Ebology</a>
            <a href="https://ifainternet.org/ifa-logic/"      className="footer__link">IfaLogic</a>
          </div>
        </div>
        <div className="footer__bottom">
          <span className="footer__copy">© The IFA Internet · CENProject</span>
          <span className="footer__powered">IFABOK Program · Advanced Ifa Economics</span>
        </div>
      </div>
    </footer>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────

function App() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(SESSION_KEY) === '1');

  if (!authed) return <LoginGate onAuth={() => setAuthed(true)} />;

  return (
    <>
      <Header />
      <main>
        <Hero />
        <SmartIfaFarmSection />
        <OaaSection />
        <VocabSection />
        <IfaLearnBridge />
        <OkajeSection />
        <OeStructuresSection />
        <IfaConvertibleSection />
        <IfaOriTreeSection />
      </main>
      <Footer />
      <MobileBar />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
