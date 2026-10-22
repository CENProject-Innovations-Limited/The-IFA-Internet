/* ─────────────────────────────────────────────────────────────────────────────
   IfaFarm / Ifagric — Advanced Ifa Economics Subpage
   -oE Structures · IfaConvertible Farm · Ifa-Orisa Tree Model
   The IFA Internet · CENProject
   ifainternet.org/ifa-economics/ifagric/
───────────────────────────────────────────────────────────────────────────── */

const { useState } = React;

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

// Succession Tree — igbó irúnmọlẹ̀ excluded (sacred, not succession structures)
const TREE_DATA = {
  id: 'root', label: 'Ifa-Orisa System', sub: '256 Odu Ifa', color: '#f0920c',
  desc: 'The 256 Odu Ifa — the axiomatic foundation from which all Ifa-Orisa structures emerge successively.',
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
      id: 'settlement', label: 'Settlement Progression', sub: 'Abà → Orílẹ̀', color: '#3b9eff',
      desc: 'The successive emergence of human settlement forms — from hamlet outward to nation.',
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
        { id: 'orílẹ̀',  label: 'Orílẹ̀',       sub: 'Nation',  color: '#00c87c', desc: 'Nation — uniting people under shared identity, governance, and Ifa values.', children: [] },
      ],
    },
  ],
};

// ── Components ────────────────────────────────────────────────────────────────

function Header() {
  return (
    <header className="header">
      <div className="header__inner">
        <div className="header__brand">
          <div className="header__breadcrumb">
            <a href="https://ifainternet.org/ifa-economics/" className="header__bc-link">Ifa Economics</a>
            <span className="header__bc-sep">›</span>
            <span className="header__bc-cur">IfaFarm / Ifagric</span>
          </div>
        </div>
        <nav className="header__nav" aria-label="Page sections">
          <a href="#ifafarm"         className="nav-link">IfaFarm</a>
          <a href="#oe-structures"   className="nav-link">-oE Structures</a>
          <a href="#conv-farm"       className="nav-link">IfaConvertible</a>
          <a href="#ifa-tree"        className="nav-link">Tree Model</a>
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
        <a href="#oe-structures"  className="mobile-bar__item"><span className="mobile-bar__sym">⬡</span>-oE</a>
        <a href="#conv-farm"      className="mobile-bar__item"><span className="mobile-bar__sym">⟳</span>Convertible</a>
        <a href="#ifa-tree"       className="mobile-bar__item"><span className="mobile-bar__sym">🌳</span>Tree</a>
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
              Advanced Ifa Economics · Ifa-Orisa Structures
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
          <strong>Igbó irúnmọlẹ̀</strong> — the collective term for igbófá and igbòòṣà — are sacred groves
          that are divinely established, not structurally derived. They precede and transcend the -oE succession model.
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

  const handleSelect = (id, node) => {
    if (activeId === id) { setActiveId(null); setActiveNode(null); }
    else { setActiveId(id); setActiveNode(node); }
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
            The successive emergence of Ifa-Orisa structures from the 256 Odu Ifa.
            Click any node to expand its children or read its description below.
            Igbó irúnmọlẹ̀ (sacred groves) sit outside this succession tree.
          </p>
        </div>

        <div className="otree">
          <div className="otree__canvas">
            <TreeNode node={TREE_DATA} depth={0} activeId={activeId} onSelect={handleSelect} />
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

        <div className="otree__sacred-note">
          <span className="otree__sacred-badge">Igbó Irúnmọlẹ̀</span>
          <span className="otree__sacred-text">
            <strong>Igbó Ifá (Igbófá)</strong> and <strong>Igbó Òòṣà (Igbòòṣà)</strong> —
            the sacred groves of Ifa and Orisa — are not succession structures. They are divinely established
            spaces that precede and transcend the emergence sequence shown above.
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
              <span style={{ color: 'var(--jade-lt)', fontWeight: 800 }}>IfaFarm / Ifagric</span>
            </div>
            <p className="footer__tagline">
              Advanced Ifa Economics · -oE Structures · IfaConvertible Farm<br />
              Part of{' '}
              <a href="https://ifainternet.org/ifa-economics/" className="footer__link-inline">Ifa Economics</a>
              {' '}·{' '}
              <a href="https://ifainternet.org" className="footer__link-inline">The IFA Internet</a>
            </p>
          </div>
          <div className="footer__links">
            <a href="https://ifainternet.org/ifa-economics/"  className="footer__link">Ifa Economics</a>
            <a href="https://ifainternet.org"                 className="footer__link">The IFA Internet</a>
            <a href="https://toe.cenproject.org/ebology-the-field-of-energy-exchange/" className="footer__link">Ebology</a>
            <a href="https://ifainternet.org/ifa-logic/"      className="footer__link">IfaLogic</a>
          </div>
        </div>
        <div className="footer__bottom">
          <span className="footer__copy">© The IFA Internet · CENProject</span>
          <span className="footer__powered">IfaFarm · Ifagric · -oE Structures</span>
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
        <VocabSection />
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
