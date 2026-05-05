/* ─────────────────────────────────────────────────────────────
   Ifa Periodic Table  ·  React 18 + JSX via Babel Standalone
   All 256 Odu Ifa (Ifatoms) as an interactive periodic table
   CENProject  ·  toe.cenproject.org/ifa-periodic-table/
───────────────────────────────────────────────────────────── */

const { useState, useEffect, useCallback, Fragment } = React;

// ════════════════════════════════════════════════════════════
// DECORATIVE COMPONENTS  (Ifa · Orisa · Isese · Palm)
// ════════════════════════════════════════════════════════════

function PalmSVG({ className }) {
  return (
    <svg className={className} viewBox="0 0 100 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Trunk — slightly curved, with bark rings */}
      <path d="M52 198 C50 168 46 132 48 103 C50 76 52 52 56 18"
            stroke="currentColor" strokeWidth="7" strokeLinecap="round"/>
      <ellipse cx="50" cy="173" rx="2" ry="1.2" fill="currentColor" opacity="0.4"/>
      <ellipse cx="49" cy="146" rx="2" ry="1.2" fill="currentColor" opacity="0.4"/>
      <ellipse cx="50" cy="118" rx="2" ry="1.2" fill="currentColor" opacity="0.4"/>
      {/* Palm nut cluster at crown */}
      <circle cx="55" cy="22" r="7"   fill="currentColor" opacity="0.85"/>
      <circle cx="67" cy="30" r="5.5" fill="currentColor" opacity="0.7"/>
      <circle cx="43" cy="29" r="5.5" fill="currentColor" opacity="0.7"/>
      <circle cx="61" cy="14" r="4.5" fill="currentColor" opacity="0.6"/>
      <circle cx="73" cy="22" r="3.5" fill="currentColor" opacity="0.55"/>
      <circle cx="38" cy="19" r="3.5" fill="currentColor" opacity="0.55"/>
      {/* Fronds — left */}
      <path d="M56 18 C40 13 20 16 2  34"  stroke="currentColor" strokeWidth="4"   strokeLinecap="round"/>
      <path d="M56 18 C42 6  24 2  8  14"  stroke="currentColor" strokeWidth="3.5" strokeLinecap="round"/>
      <path d="M56 18 C44 3  28 -1 16  8"  stroke="currentColor" strokeWidth="3"   strokeLinecap="round"/>
      <path d="M56 18 C42 22 24 37  6 56"  stroke="currentColor" strokeWidth="3.5" strokeLinecap="round"/>
      <path d="M56 18 C48 7  38  0 26 -8"  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      {/* Fronds — right */}
      <path d="M56 18 C72 13 90 16 100 34" stroke="currentColor" strokeWidth="4"   strokeLinecap="round"/>
      <path d="M56 18 C70 6  88 2   96 14" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round"/>
      <path d="M56 18 C68 3  82 -1  90  8" stroke="currentColor" strokeWidth="3"   strokeLinecap="round"/>
      <path d="M56 18 C70 22 86 37  96 56" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round"/>
      <path d="M56 18 C64 7  74  0  82 -8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      {/* Top centre frond */}
      <path d="M56 18 C55 6  53 -2 51 -12" stroke="currentColor" strokeWidth="3"   strokeLinecap="round"/>
    </svg>
  );
}

function OponIfaSVG({ className }) {
  return (
    <svg className={className} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Outer carved rim */}
      <circle cx="80" cy="80" r="76" stroke="currentColor" strokeWidth="3.5" opacity="0.75"/>
      <circle cx="80" cy="80" r="67" stroke="currentColor" strokeWidth="1"   opacity="0.3"/>
      {/* Eshu/Elegba face — guardian of the divination tray */}
      <circle cx="80" cy="12" r="9"  stroke="currentColor" strokeWidth="2"   opacity="0.85"/>
      <circle cx="80" cy="12" r="3"  fill="currentColor"                     opacity="0.7"/>
      <path   d="M75 7 L80 2 L85 7"  stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" opacity="0.8"/>
      {/* Internal cross-axis guides */}
      <line x1="80"  y1="23"  x2="80"  y2="137" stroke="currentColor" strokeWidth="0.6" opacity="0.15"/>
      <line x1="23"  y1="80"  x2="137" y2="80"  stroke="currentColor" strokeWidth="0.6" opacity="0.15"/>
      <line x1="34"  y1="34"  x2="126" y2="126" stroke="currentColor" strokeWidth="0.4" opacity="0.1"/>
      <line x1="126" y1="34"  x2="34"  y2="126" stroke="currentColor" strokeWidth="0.4" opacity="0.1"/>
      {/* 8 Odu marks — cardinal (single = Ogbe/Energy) */}
      <line x1="80"  y1="4"   x2="80"  y2="16"  stroke="currentColor" strokeWidth="3"/>
      <line x1="144" y1="80"  x2="156" y2="80"  stroke="currentColor" strokeWidth="3"/>
      <line x1="80"  y1="144" x2="80"  y2="156" stroke="currentColor" strokeWidth="3"/>
      <line x1="4"   y1="80"  x2="16"  y2="80"  stroke="currentColor" strokeWidth="3"/>
      {/* 8 Odu marks — ordinal (double = Oyeku/Anergy) */}
      <line x1="120" y1="19"  x2="124" y2="23"  stroke="currentColor" strokeWidth="2.5"/>
      <line x1="123" y1="16"  x2="127" y2="20"  stroke="currentColor" strokeWidth="2.5"/>
      <line x1="120" y1="137" x2="124" y2="141" stroke="currentColor" strokeWidth="2.5"/>
      <line x1="123" y1="140" x2="127" y2="144" stroke="currentColor" strokeWidth="2.5"/>
      <line x1="33"  y1="137" x2="37"  y2="141" stroke="currentColor" strokeWidth="2.5"/>
      <line x1="36"  y1="140" x2="40"  y2="144" stroke="currentColor" strokeWidth="2.5"/>
      <line x1="33"  y1="19"  x2="37"  y2="23"  stroke="currentColor" strokeWidth="2.5"/>
      <line x1="36"  y1="16"  x2="40"  y2="20"  stroke="currentColor" strokeWidth="2.5"/>
      {/* Inner diamond */}
      <path d="M80 52 L108 80 L80 108 L52 80 Z" stroke="currentColor" strokeWidth="1.2" opacity="0.3"/>
      {/* Centre */}
      <circle cx="80" cy="80" r="14" stroke="currentColor" strokeWidth="1.5" opacity="0.4"/>
      <circle cx="80" cy="80" r="5"  fill="currentColor"                     opacity="0.35"/>
    </svg>
  );
}

function IfaHeroStrip() {
  return (
    <div className="ifa-hero">
      {/* Yoruba textile colour stripes */}
      <div className="ifa-hero__stripe ifa-hero__stripe--top" />
      {/* Palm silhouettes */}
      <PalmSVG className="ifa-hero__palm ifa-hero__palm--l1" />
      <PalmSVG className="ifa-hero__palm ifa-hero__palm--l2" />
      <PalmSVG className="ifa-hero__palm ifa-hero__palm--r1" />
      <PalmSVG className="ifa-hero__palm ifa-hero__palm--r2" />
      {/* Opon Ifa watermark */}
      <OponIfaSVG className="ifa-hero__opon" />
      {/* Centre content */}
      <div className="ifa-hero__content">
        <p className="ifa-hero__tagline">Mapping the Building Blocks of All Fields of Knowledge.</p>
        <p className="ifa-hero__tradition">Ifá. Òrìṣà. Ìṣẹ̀ṣe.</p>
      </div>
      <div className="ifa-hero__stripe ifa-hero__stripe--bot" />
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// IFABOK TABLE BANNER
// ════════════════════════════════════════════════════════════
function IfabokBanner() {
  return (
    <section className="ifabok-banner">
      <div className="ifabok-banner__inner">
        <figure className="ifabok-banner__figure">
          <img
            className="ifabok-banner__img"
            src="images/ifabok-periodic-table.png"
            alt="The IFABOK — Àtẹ́fá-Èròjà Gbogbo ìmọ̀, The Periodic Table of All Knowledge"
          />
        </figure>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════
// IFA PERIODIC TABLE INTRO
// ════════════════════════════════════════════════════════════
function IfaPTIntro() {
  return (
    <section className="ifapt-intro">
      <div className="ifapt-intro__inner">
        <div className="ifapt-intro__body">
          <p>
            The <strong>Ifa Periodic Table</strong>, or the{' '}
            <em>Periodic Table of Everything (PToE)</em>, extends chemistry's model to knowledge.
            Based on{' '}
            <strong className="ifapt-intro__accent ifapt-intro__accent--gold">16 Ifa Axioms</strong>{' '}
            <span className="ifapt-intro__note">(Oju Odu Ifa)</span>, it classifies reality and all fields of knowledge by{' '}
            <strong className="ifapt-intro__accent">Ifa Energy Patterns</strong> or{' '}
            <strong className="ifapt-intro__accent">Ifa Energy Vibrations</strong>.
          </p>
          <div className="ifapt-intro__stats">
            <div className="ifapt-intro__stat">
              <span className="ifapt-intro__stat-num">256</span>
              <span className="ifapt-intro__stat-lbl">Elements</span>
            </div>
            <div className="ifapt-intro__divider" />
            <div className="ifapt-intro__stat">
              <span className="ifapt-intro__stat-num">16</span>
              <span className="ifapt-intro__stat-lbl">Groups</span>
            </div>
            <div className="ifapt-intro__divider" />
            <div className="ifapt-intro__stat">
              <span className="ifapt-intro__stat-num">16</span>
              <span className="ifapt-intro__stat-lbl">Periods</span>
            </div>
          </div>
          <p className="ifapt-intro__closing">
            It serves as a unifying framework for all fields within the BaseField,{' '}
            <strong className="ifapt-intro__accent ifapt-intro__accent--gold">IFA Mathematics</strong>.
          </p>
          <p className="ifapt-intro__expanded">
            The <strong>Ifa Periodic Table</strong> is a Tool of the{' '}
            <strong className="ifapt-intro__accent ifapt-intro__accent--gold">IFA Body of Knowledge (IFABOK)</strong>,
            also called the{' '}
            <strong className="ifapt-intro__accent">IFA Internet</strong>,{' '}
            <strong className="ifapt-intro__accent ifapt-intro__accent--gold">IFA Mathematics</strong>, or the{' '}
            <strong className="ifapt-intro__accent">Theory of Everything (TOE)</strong> — for{' '}
            <em>learning all fields mathematically</em>,{' '}
            <em>integrating all fields together</em>, and{' '}
            <em>building Ifa Technologies and Systems</em>.
          </p>
        </div>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════
// IFA PT GALLERY (5 intro images after IfaPTIntro)
// ════════════════════════════════════════════════════════════
function IfaPTGallery() {
  return (
    <section className="ifapt-gallery">
      <div className="ifapt-gallery__inner">

        {/* Row 1: two wide images side by side */}
        <div className="ifapt-gallery__row ifapt-gallery__row--duo">
          <figure className="ifapt-gallery__figure ifapt-gallery__figure--wide">
            <img
              className="ifapt-gallery__img ifapt-gallery__img--light"
              src="images/ifalang-master-character-ogbe.png"
              alt="Ifa I/O Notation: IfaLang Master Character, Ogbe"
            />
          </figure>
          <figure className="ifapt-gallery__figure ifapt-gallery__figure--wide">
            <img
              className="ifapt-gallery__img ifapt-gallery__img--light"
              src="images/ifapt-four-forms.png"
              alt="The IfaPT: Four Different Forms of Ifa Periodic Table"
            />
          </figure>
        </div>

        {/* Row 2: ifabit full-width */}
        <div className="ifapt-gallery__row ifapt-gallery__row--solo">
          <figure className="ifapt-gallery__figure">
            <img
              className="ifapt-gallery__img ifapt-gallery__img--light"
              src="images/ifabit-bit-universe.png"
              alt="IFABit: The Bit Universe — The Universe of Building Blocks"
            />
            <figcaption className="ifapt-gallery__caption">
              The Dual Form of Ifa's Periodic Table
            </figcaption>
          </figure>
        </div>

        {/* Row 3: compact + matrix side by side */}
        <div className="ifapt-gallery__row ifapt-gallery__row--duo">
          <figure className="ifapt-gallery__figure">
            <img
              className="ifapt-gallery__img ifapt-gallery__img--dark"
              src="images/ifa-infinity-compact.png"
              alt="The Compact Form of Ifa's Periodic Table — Ifa Infinity (Duoinfinity)"
            />
            <figcaption className="ifapt-gallery__caption">
              The Compact Form of Ifa's Periodic Table
            </figcaption>
          </figure>
          <figure className="ifapt-gallery__figure">
            <img
              className="ifapt-gallery__img ifapt-gallery__img--light"
              src="images/ifalang-16-odu-matrix.png"
              alt="IfaLang — 16 Odu Ifa matrix form characters"
            />
            <figcaption className="ifapt-gallery__caption">
              The Matrix Form of Ifa's Periodic Table
            </figcaption>
          </figure>
        </div>

      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════
// IFATOM INTRO
// ════════════════════════════════════════════════════════════
function IfatomIntro() {
  return (
    <section className="ifatom-intro">
      <div className="ifatom-intro__inner">
        <img
          className="ifatom-intro__diagram"
          src="images/ifatom-diagram.png"
          alt="IFAtom: The Atom of Everything (AtomoE) — diagram showing Ifa-Atom at the centre connected to atoms of Natural Science, Technology, Engineering, Arts, Mathematics, Social Science, Education, and Other Fields"
        />
        <p className="ifatom-intro__desc">
          Ifatoms are the 256 Odu Ifa and are the most basic building blocks of all fields and disciplines of knowledge.
        </p>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════
// HEADER
// ════════════════════════════════════════════════════════════
function Header() {
  return (
    <header className="header">
      {/* Decorative background elements */}
      <PalmSVG className="header__palm header__palm--left" />
      <PalmSVG className="header__palm header__palm--right" />
      <OponIfaSVG className="header__opon-bg" />
      <div className="header__topbar">
        <span className="header__topbar-title">The IFA Internet</span>
      </div>
      <div className="header__inner">
        <div className="header__left">
          <div className="header__logo">
            <img
              className="header__logo-img"
              src="images/cenproject-logo.png"
              alt="CENProject logo"
            />
          </div>
          <div className="header__title">
            <h1>Ifa Periodic Table</h1>
            <p>IfaPT · ToEPT · Standard Model of Every Knowledge · CENProject</p>
          </div>
        </div>
        <div className="header__stats">
          <div className="stat">
            <span className="stat__number">256</span>
            <span className="stat__label">Ifatoms</span>
          </div>
          <div className="stat">
            <span className="stat__number">16</span>
            <span className="stat__label">IfaGroups</span>
          </div>
          <div className="stat">
            <span className="stat__number">16</span>
            <span className="stat__label">IfaPeriods</span>
          </div>
        </div>
      </div>
    </header>
  );
}

// ════════════════════════════════════════════════════════════
// CONTROLS
// ════════════════════════════════════════════════════════════
function Controls({ categories, activeCategory, onCategory, searchTerm, onSearch, view, onView }) {
  return (
    <div className="controls">
      <h2 className="controls__heading">The Complete Form of Ifa's Periodic Table</h2>
      <div className="controls__inner">

        <div className="search">
          <span className="search__icon">⌕</span>
          <input
            className="search__input"
            type="text"
            placeholder="Search Odu…"
            value={searchTerm}
            onChange={e => onSearch(e.target.value)}
          />
        </div>

        <div className="chips">
          <button
            className={'chip ' + (activeCategory === 'all' ? 'chip--active' : 'chip--inactive')}
            style={{ color: '#9aa3ba', borderColor: '#2e3a58' }}
            onClick={() => onCategory('all')}
          >All</button>

          {Object.entries(categories).map(([key, cat]) => (
            <button
              key={key}
              className={'chip ' + (activeCategory === key ? 'chip--active' : 'chip--inactive')}
              style={{ color: cat.color, borderColor: cat.color }}
              onClick={() => onCategory(key)}
            >{cat.label}</button>
          ))}
        </div>

        <div className="view-toggle">
          <button
            className={'view-btn ' + (view === 'table' ? 'view-btn--active' : '')}
            onClick={() => onView('table')}
          >Grid</button>
          <button
            className={'view-btn ' + (view === 'list' ? 'view-btn--active' : '')}
            onClick={() => onView('list')}
          >List</button>
        </div>

      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// IFA GLYPH HELPERS
// ════════════════════════════════════════════════════════════
// Build the primary meta-symbol glyph string for a 4-bit code.
// Read RIGHT TO LEFT: code[3], code[2], code[1], code[0].
// 1 → O (Ifa Circle), 0 → I (Ifa Line with crossbars in compound context).
// Collapsed parents: "1111" → "O", "0000" → "|" (standalone Ifa Line, no crossbars).
function primaryGlyph(code) {
  if (code === '1111') return 'O';
  if (code === '0000') return '|';
  return code.split('').map(b => b === '1' ? 'O' : 'I').join('');
}

// Render glyph string as individual character spans with tight margins so characters touch.
// II pairs get slightly less negative margin so consecutive Ifa Lines remain distinct.
function renderGlyphChars(g) {
  if (g.length === 1) return g;
  return g.split('').map((ch, i) => {
    const isLast = i === g.length - 1;
    const next = g[i + 1];
    let mr = '0';
    if (!isLast) {
      mr = (ch === 'I' && next === 'I') ? '-0.08em' : '-0.22em';
    }
    return <span key={i} style={{ marginRight: mr }}>{ch}</span>;
  });
}

// ════════════════════════════════════════════════════════════
// ODU CELL
// ════════════════════════════════════════════════════════════
function OduCell({ row, col, cellNum, color, isMeji, isDimmed, onCellClick, onMouseEnter, onMouseLeave, onMouseMove }) {
  const short    = isMeji ? row.name : `${row.name.slice(0,3)}-${col.name.slice(0,3)}`;
  const cls      = ['cell', isMeji ? 'cell--meji' : '', isDimmed ? 'cell--dim' : ''].filter(Boolean).join(' ');
  const priGlyph = primaryGlyph(row.code); // principal (Àpólà) — large, bottom
  const secGlyph = primaryGlyph(col.code); // secondary (Period) — small, top

  return (
    <div
      className={cls}
      style={{ color }}
      onClick={onCellClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseMove={onMouseMove}
    >
      <span className="cell__num">{cellNum}</span>
      <div className="cell__glyph">
        <span className="cell__glyph-sec">{renderGlyphChars(secGlyph)}</span>
        <span className="cell__glyph-pri">{renderGlyphChars(priGlyph)}</span>
      </div>
      <span className="cell__name">{short}</span>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// PERIODIC TABLE
// ════════════════════════════════════════════════════════════
// Block-based numbering:
//   Meji row (rowPos 0)  → 1–16, one per IfaCat (ci + 1)
//   Member rows (rowPos 1–15) → block k (ci = k-1) occupies slots 17–31, 32–46, …, 242–256
//   Formula: 16 + ci * 15 + rowPos
function cellNum(ci, rowPos) {
  if (rowPos === 0) return ci + 1;
  return 16 + ci * 15 + rowPos;
}
function oduName(row, col) { return row.id === col.id ? row.meji : `${row.name}-${col.name}`; }

// For Àpólà column ci, return the secondary (Left) Odu at period row-position rowPos.
// rowPos 0 → Meji (secondary = principal itself)
// rowPos 1..15 → all other Odu in standard order, skipping ci
function secondaryAt(odu, ci, rowPos) {
  if (rowPos === 0) return odu[ci];
  let k = 0;
  for (let i = 0; i < 16; i++) {
    if (i === ci) continue;
    if (k === rowPos - 1) return odu[i];
    k++;
  }
}

function calcDimmed(row, col, activeCategory, searchTerm) {
  if (activeCategory !== 'all' && row.category !== activeCategory && col.category !== activeCategory) return true;
  if (searchTerm) {
    const t = searchTerm.toLowerCase();
    return !oduName(row, col).toLowerCase().includes(t) &&
           !row.name.toLowerCase().includes(t) &&
           !col.name.toLowerCase().includes(t);
  }
  return false;
}

function PeriodicTable({ odu, categories, activeCategory, searchTerm, onCellClick }) {
  const [tip, setTip] = useState({ visible: false, text: '', x: 0, y: 0 });

  const showTip = useCallback((text, e) => setTip({ visible: true, text, x: e.clientX + 14, y: e.clientY + 14 }), []);
  const moveTip = useCallback(e => setTip(t => ({ ...t, x: e.clientX + 14, y: e.clientY + 14 })), []);
  const hideTip = useCallback(() => setTip(t => ({ ...t, visible: false })), []);

  return (
    <div>
      {/* Table header labels */}
      <div className="pt-table-headers">
        <div className="pt-table-header">Apodu: Apola-Odu</div>
        <div className="pt-table-header">Àtẹfá-Èròjà Gbogbo Ìmọ</div>
        <div className="pt-table-header">
          IfaCategory: Apola Odu
          <div className="pt-table-header__sub">
            <span>(IfaCat)</span>
            <span>(Apodu)</span>
          </div>
        </div>
        <div className="pt-table-header">IfaCategory Theory</div>
      </div>

      {/* Grid */}
      <div className="table-scroll">
        <div className="pt-grid">

          {/* Column headers — IfaCat 16 (left) → IfaCat 1 (right), right-to-left structure */}
          {[...odu].reverse().map(apolOdu => (
            <div key={'ch-' + apolOdu.id} className="pt-col-header"
                 style={{ color: categories[apolOdu.category].color }}>
              <span className="pt-col-header__ifacat">IfaCat {apolOdu.id}</span>
              <span className="pt-col-header__apola">Àpólà {apolOdu.yoruba}</span>
            </div>
          ))}

          {/* Corner — row-header column label (now on the right, after IfaCat 1) */}
          <div className="pt-corner">
            <span className="pt-corner__label">IfaComposition: Àmúlù-Odu</span>
            <span className="pt-corner__sub">(IfaComp)</span>
            <span className="pt-corner__sub">(Àmúlù)</span>
          </div>

          {/* Rows = IfaPeriods (16 periods) */}
          {Array.from({ length: 16 }, (_, rowPos) => {
            const reversedOdu = [...odu].reverse();

            // Helper: render one OduCell for a given principalOdu at rowPos
            const makeCell = (principalOdu) => {
              const ci          = principalOdu.id - 1;
              const secondaryOdu = secondaryAt(odu, ci, rowPos);
              const num         = cellNum(ci, rowPos);
              const dimmed      = calcDimmed(principalOdu, secondaryOdu, activeCategory, searchTerm);
              const name        = oduName(principalOdu, secondaryOdu);
              const color       = categories[principalOdu.category].color;
              return (
                <OduCell
                  key={num}
                  row={principalOdu}
                  col={secondaryOdu}
                  cellNum={num}
                  color={color}
                  isMeji={true}
                  isDimmed={dimmed}
                  onCellClick={() => !dimmed && onCellClick({ row: principalOdu, col: secondaryOdu, num })}
                  onMouseEnter={e => !dimmed && showTip(name, e)}
                  onMouseLeave={hideTip}
                  onMouseMove={moveTip}
                />
              );
            };

            if (rowPos === 0) {
              // Split the Meji row into two visual rows:
              // Row A — Base Pair: Ogbe (ci=0) and Oyeku (ci=1) only; other columns are placeholders
              // Row B — IfaComp 1: the 14 remaining Meji (ci=2..15); Ogbe/Oyeku columns are placeholders
              return (
                <Fragment key="period-0">
                  {/* ── Base Pair row ── */}
                  {reversedOdu.map((pOdu) => {
                    const ci = pOdu.id - 1;
                    return (ci === 0 || ci === 1)
                      ? makeCell(pOdu)
                      : <div key={'bp-ph-' + ci} className="pt-cell-placeholder" />;
                  })}
                  <div className="pt-row-header pt-row-header--basepair">
                    <span className="pt-row-header__basepair">Ifa Base Pair</span>
                  </div>

                  {/* ── IfaComp 1 row — 14 prime Meji ── */}
                  {reversedOdu.map((pOdu) => {
                    const ci = pOdu.id - 1;
                    return (ci === 0 || ci === 1)
                      ? <div key={'ic1-ph-' + ci} className="pt-cell-placeholder" />
                      : makeCell(pOdu);
                  })}
                  <div className="pt-row-header">
                    <span className="pt-row-header__ifacomp">IfaComp 1</span>
                  </div>
                </Fragment>
              );
            }

            // Regular rows: IfaComp 2–16
            return (
              <Fragment key={'period-' + rowPos}>
                {reversedOdu.map((principalOdu) => {
                  const ci          = principalOdu.id - 1;
                  const secondaryOdu = secondaryAt(odu, ci, rowPos);
                  const num         = cellNum(ci, rowPos);
                  const dimmed      = calcDimmed(principalOdu, secondaryOdu, activeCategory, searchTerm);
                  const name        = oduName(principalOdu, secondaryOdu);
                  const color       = categories[principalOdu.category].color;
                  return (
                    <OduCell
                      key={num}
                      row={principalOdu}
                      col={secondaryOdu}
                      cellNum={num}
                      color={color}
                      isMeji={false}
                      isDimmed={dimmed}
                      onCellClick={() => !dimmed && onCellClick({ row: principalOdu, col: secondaryOdu, num })}
                      onMouseEnter={e => !dimmed && showTip(name, e)}
                      onMouseLeave={hideTip}
                      onMouseMove={moveTip}
                    />
                  );
                })}
                <div className="pt-row-header">
                  <span className="pt-row-header__ifacomp">IfaComp {rowPos + 1}</span>
                </div>
              </Fragment>
            );
          })}

        </div>
      </div>

      {/* Tooltip */}
      {tip.visible && (
        <div
          className="tooltip"
          style={{ left: Math.min(tip.x, window.innerWidth - 200) + 'px', top: tip.y + 'px' }}
        >{tip.text}</div>
      )}
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// LIST VIEW
// ════════════════════════════════════════════════════════════
function ListView({ odu, categories, activeCategory, searchTerm, onSelect }) {
  const filtered = odu.filter(o => {
    const catOk    = activeCategory === 'all' || o.category === activeCategory;
    const searchOk = !searchTerm ||
      o.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.meji.toLowerCase().includes(searchTerm.toLowerCase());
    return catOk && searchOk;
  });

  if (!filtered.length) return (
    <div style={{ textAlign: 'center', padding: '48px', color: 'var(--text-3)' }}>
      No Odu match your search.
    </div>
  );

  return (
    <div className="list-grid">
      {filtered.map(o => {
        const cat = categories[o.category];
        return (
          <div key={o.id} className="odu-card" onClick={() => onSelect({ row: o, col: o, num: o.id })}>
            <div className="odu-card__badge" style={{ color: cat.color }}>
              <span>{o.id}</span>
            </div>
            <div className="odu-card__body">
              <div className="odu-card__name">{o.meji}</div>
              <div className="odu-card__yoruba">{o.yoruba} Méjì</div>
              <div className="odu-card__cat" style={{ color: cat.color }}>{cat.label}</div>
              <div className="odu-card__desc">{o.meaning}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// MODAL
// ════════════════════════════════════════════════════════════
function ModalDot({ bit }) {
  return bit === 1
    ? <div className="modal__dot" />
    : <div className="modal__dot modal__dot--zero" />;
}

function IFABitDisplay({ code, rightLabel, leftLabel, color }) {
  // code is 8 bits: first 4 = Àpólà / Right Odu (principal), last 4 = Period / Left Odu (secondary)
  const rightBits = code.slice(0, 4).split('').map(Number);
  const leftBits  = code.slice(4, 8).split('').map(Number);
  const decimal   = parseInt(code, 2);

  return (
    <div className="ifabit" style={{ color }}>
      <div className="ifabit__cols">
        <div className="ifabit__col">
          <div className="ifabit__col-label">{rightLabel || 'Right'}</div>
          {rightBits.map((b, i) => (
            <div key={i} className="ifabit__mark">
              {b === 1
                ? <div className="ifabit__dot" />
                : <><div className="ifabit__dot ifabit__dot--zero" /><div className="ifabit__dot ifabit__dot--zero" /></>
              }
            </div>
          ))}
        </div>
        <div className="ifabit__col">
          <div className="ifabit__col-label">{leftLabel || 'Left'}</div>
          {leftBits.map((b, i) => (
            <div key={i} className="ifabit__mark">
              {b === 1
                ? <div className="ifabit__dot" />
                : <><div className="ifabit__dot ifabit__dot--zero" /><div className="ifabit__dot ifabit__dot--zero" /></>
              }
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="modal__section-label" style={{ marginBottom: '4px' }}>IFABit Code</div>
        <div className="ifabit__code">{code}₂</div>
        <div style={{ fontSize: '12px', color: 'var(--text-3)', marginTop: '3px' }}>{decimal}₁₀</div>
      </div>
    </div>
  );
}

function MejiDetail({ odu, cat, oduById, catMap, onNavigate }) {
  const color   = cat.color;
  const dualOdu = oduById[odu.dual];
  const dualCat = dualOdu ? catMap[dualOdu.category] : null;

  return (
    <>
      <div className="modal__section">
        <div className="modal__section-label">Ojú Odù · Meaning & Domain</div>
        <p className="modal__meaning">{odu.meaning}</p>
      </div>

      <div className="modal__section">
        <div className="modal__section-label">Core Domains</div>
        <div className="domain-chips">
          {odu.domains.map(d => <span key={d} className="domain-chip">{d}</span>)}
        </div>
      </div>

      <div className="modal__section">
        <div className="modal__section-label">IFABit · Àpólà Code</div>
        <IFABitDisplay code={odu.code + odu.code} rightLabel={odu.name} leftLabel={odu.name} color={color} />
      </div>

      <div className="info-grid modal__section">
        <div className="info-card">
          <div className="info-card__label">Elemental Correspondence</div>
          <div className="info-card__value" style={{ color }}>{odu.element}</div>
        </div>
        <div className="info-card">
          <div className="info-card__label">Planetary Influence</div>
          <div className="info-card__value" style={{ color }}>{odu.planet}</div>
        </div>
      </div>

      <div className="modal__section">
        <div className="modal__section-label">STEAMSEX Disciplines</div>
        <div className="steamsex-tags">
          {odu.steamsex.map(s => <span key={s} className="steamsex-tag">{s}</span>)}
        </div>
      </div>

      <div className="modal__section">
        <div className="modal__section-label">Ifa Periodicity Laws</div>
        <div className="domain-chips">
          {odu.axioms.map(a => (
            <span key={a} className="domain-chip" style={{ borderColor: color + '55' }}>{a}</span>
          ))}
        </div>
      </div>

      {dualOdu && (
        <div className="modal__section">
          <div className="modal__section-label">Ifa Dual · Inverse Àpólà</div>
          <div className="dual-row" onClick={() => onNavigate(dualOdu.id)}>
            <div className="dual-badge" style={{ color: dualCat.color }}>
              <span>{dualOdu.id}</span>
            </div>
            <div>
              <div className="dual-name">{dualOdu.meji}</div>
              <div className="dual-yoruba">{dualOdu.yoruba} Méjì · {dualCat.label}</div>
            </div>
            <div className="dual-arrow">→</div>
          </div>
        </div>
      )}
    </>
  );
}

function CompositeDetail({ row, col, rowCat, colCat, onNavigate }) {
  const uniqueDomains  = [...new Set([...row.domains.slice(0,3), ...col.domains.slice(0,3)])];
  const uniqueSteamsex = [...new Set([...row.steamsex, ...col.steamsex])];

  return (
    <>
      <div className="modal__section">
        <div className="modal__section-label">Àmúlù Odù · Composite Ifatom</div>
        <p className="modal__meaning">
          This Àmúlù Odù (Composite Ifatom) belongs to the{' '}
          <strong style={{ color: rowCat.color }}>Àpólà {row.name}</strong> IfaGroup,
          expressing the interplay between{' '}
          <em>{row.domains.slice(0,2).join(', ')}</em> (Right/Principal) and{' '}
          <em>{col.domains.slice(0,2).join(', ')}</em> (Left/Period).
          Click either parent below to explore its full meaning.
        </p>
      </div>

      <div className="info-grid modal__section">
        <div className="info-card info-card--link" onClick={() => onNavigate(row.id)}>
          <div className="info-card__label" style={{ color: rowCat.color }}>Àpólà Odu · Right (Principal)</div>
          <div className="info-card__value">{row.meji}</div>
          <div className="info-card__sub">{row.domains.slice(0,3).join(' · ')}</div>
        </div>
        <div className="info-card info-card--link" onClick={() => onNavigate(col.id)}>
          <div className="info-card__label" style={{ color: colCat.color }}>Period Odu · Left (Secondary)</div>
          <div className="info-card__value">{col.meji}</div>
          <div className="info-card__sub">{col.domains.slice(0,3).join(' · ')}</div>
        </div>
      </div>

      <div className="modal__section">
        <div className="modal__section-label">Combined Domains</div>
        <div className="domain-chips">
          {uniqueDomains.map(d => <span key={d} className="domain-chip">{d}</span>)}
        </div>
      </div>

      <div className="modal__section">
        <div className="modal__section-label">IFABit · Àmúlù Composition</div>
        <IFABitDisplay code={row.code + col.code} rightLabel={row.name} leftLabel={col.name} color={rowCat.color} />
      </div>

      <div className="modal__section">
        <div className="modal__section-label">STEAMSEX Disciplines</div>
        <div className="steamsex-tags">
          {uniqueSteamsex.map(s => <span key={s} className="steamsex-tag">{s}</span>)}
        </div>
      </div>
    </>
  );
}

function OduModal({ selection, odu, categories, onClose, onNavigate }) {
  const oduById = Object.fromEntries(odu.map(o => [o.id, o]));

  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  if (!selection) return null;

  const { row, col, num } = selection;
  const isMeji  = row.id === col.id;
  const rowCat  = categories[row.category];
  const colCat  = categories[col.category];
  const color   = rowCat.color;
  const name    = isMeji ? row.meji : `${row.name}-${col.name}`;
  const yoruba  = isMeji ? `${row.yoruba} Méjì · Ojú Odù` : `${row.yoruba}-${col.yoruba} · Àmúlù Odù`;
  const rowBits = row.code.split('').map(Number);
  const colBits = col.code.split('').map(Number);

  return (
    <div className="overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <button className="modal__close" onClick={onClose}>×</button>

        <div className="modal__header">
          <div className="modal__badge" style={{ color }}>
            <span className="modal__badge-num">{num}</span>
            <div className="modal__badge-marks">
              <div className="modal__mark-col">
                {rowBits.map((b, i) => <ModalDot key={i} bit={b} />)}
              </div>
              <div className="modal__mark-col">
                {colBits.map((b, i) => <ModalDot key={i} bit={b} />)}
              </div>
            </div>
          </div>
          <div className="modal__title">
            <h2>{name}</h2>
            <div className="modal__yoruba">{yoruba}</div>
            <div
              className="modal__tag"
              style={{ color, borderColor: color + '60', background: color + '18' }}
            >
              {isMeji ? rowCat.label + ' · IfaGroup ' + row.id : 'Àpólà ' + row.name + ' × ' + col.name}
            </div>
          </div>
        </div>

        <div className="modal__body">
          {isMeji
            ? <MejiDetail odu={row} cat={rowCat} oduById={oduById} catMap={categories} onNavigate={onNavigate} />
            : <CompositeDetail row={row} col={col} rowCat={rowCat} colCat={colCat} onNavigate={onNavigate} />
          }
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// APP  (root component + data fetch)
// ════════════════════════════════════════════════════════════
function App() {
  const [data, setData]           = useState(null);
  const [category, setCategory]   = useState('all');
  const [search, setSearch]       = useState('');
  const [view, setView]           = useState('table');
  const [selection, setSelection] = useState(null);

  useEffect(() => {
    fetch('./data/odu.json')
      .then(r => r.json())
      .then(setData)
      .catch(err => console.error('Failed to load odu.json', err));
  }, []);

  const navigateTo = useCallback(id => {
    if (!data) return;
    const o = data.odu.find(x => x.id === id);
    // Meji cell number in column-major scheme: column ci = id-1, period rowPos = 0
    if (o) setSelection({ row: o, col: o, num: o.id });
  }, [data]);

  if (!data) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', color: 'var(--text-3)', fontSize: '14px' }}>
      Loading Ifatoms…
    </div>
  );

  const { odu, categories } = data;

  return (
    <div>
      <Header />
      <IfaHeroStrip />
      <IfabokBanner />
      <IfaPTIntro />
      <IfaPTGallery />

      <Controls
        categories={categories}
        activeCategory={category}
        onCategory={setCategory}
        searchTerm={search}
        onSearch={setSearch}
        view={view}
        onView={setView}
      />

      <main className="main">
        {view === 'table'
          ? <PeriodicTable
              odu={odu}
              categories={categories}
              activeCategory={category}
              searchTerm={search}
              onCellClick={setSelection}
            />
          : <ListView
              odu={odu}
              categories={categories}
              activeCategory={category}
              searchTerm={search}
              onSelect={setSelection}
            />
        }
      </main>

      {/* Dual Laws section */}
      <section className="dual-laws">
        <div className="dual-laws__inner">
          <span className="dual-laws__label">8 Dual Laws</span>
          <div className="dual-laws__chips">
            {Object.values(categories).map((cat, i) => {
              const duals = ['Asymmetry', 'Variance', 'Unity', 'Reduction', 'Decomposition', 'Atomism', 'Synthesis', 'Dynamism'];
              return (
                <span key={i} className="dual-chip" style={{ color: cat.color, borderColor: cat.color }}>
                  {duals[i]}
                </span>
              );
            })}
          </div>
        </div>
      </section>

      <IfatomIntro />

      {/* Ifa Periodic Table reference diagrams */}
      <section className="ptoe-diagrams">
        <div className="ptoe-diagrams__inner">
          <img
            className="ptoe-diagrams__img"
            src="images/ifa-ptoe-generalized.png"
            alt="The Ifa Periodic Table: The Periodic Table of Everything (PToE) — generalized table showing integration across fields horizontally and integration within a field vertically"
          />
          <img
            className="ptoe-diagrams__img"
            src="images/ifa-ptoe-knowledge-elements.png"
            alt="The Ifa Periodic Table: The Periodic Table of Knowledge Elements — Ifa-branded table showing Natural Science, Technology, Engineering, Arts, Mathematics, Social Science, Education, and Others"
          />
        </div>
      </section>

      {/* Mendeleev reference */}
      <section className="mendeleev-ref">
        <div className="mendeleev-ref__inner">
          <figure className="mendeleev-ref__figure">
            <img
              className="mendeleev-ref__img"
              src="images/acs-periodic-table.png"
              alt="ACS Periodic Table of Elements — The Modern Form of Mendeleev's Periodic Table"
            />
            <figcaption className="mendeleev-ref__caption">
              The Modern Form of Mendeleev's Periodic Table.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Standard Model of Particle Physics */}
      <section className="standard-model-ref">
        <div className="standard-model-ref__inner">
          <figure className="standard-model-ref__figure">
            <img
              className="standard-model-ref__img"
              src="images/standard-model-particle-physics.png"
              alt="The Standard Model of Particle Physics — The Periodic Table of Elementary Particles showing matter particles (fermions) and force carriers (bosons)"
            />
            <figcaption className="standard-model-ref__caption">
              The Standard Model of Particle Physics — The Periodic Table of Elementary Particles.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Topological insulators & superconductors tenfold table */}
      <section className="tenfold-ref">
        <div className="tenfold-ref__inner">
          <figure className="tenfold-ref__figure">
            <img
              className="tenfold-ref__img"
              src="images/tenfold-topological-table.png"
              alt="Periodic table of topological insulators and superconductors — the tenfold classification showing symmetry classes A, AIII, AI, BDI, D, DIII, AII, CII, C, CI with topological invariants ℤ, 2ℤ, ℤ₂"
            />
            <figcaption className="tenfold-ref__caption">
              The periodic table of topological insulators and topological superconductors, also known as the tenfold classification of topological insulators and superconductors.
            </figcaption>
          </figure>
        </div>
      </section>

      <footer className="footer">
        <p>
          <strong>Ifa Periodic Table (IfaPT)</strong> — The Periodic Table of Everything (PToE) · © CENProject
        </p>
        <p className="footer__sub">
          256 Ifatoms (Odu Ifa) · 16 IfaGroups (Àpólà Odù) · 16 IfaPeriods · STEAMSEX Matrix Framework
        </p>
        <a
          className="footer__launch"
          href="https://toe.cenproject.org/ifa-periodic-table/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="footer__launch-glyph">O</span>
          <span className="footer__launch-text">
            <span className="footer__launch-label">Ifa Periodic Table Platform</span>
            <span className="footer__launch-url">toe.cenproject.org/ifa-periodic-table</span>
          </span>
          <span className="footer__launch-arrow">↗</span>
        </a>
      </footer>

      <OduModal
        selection={selection}
        odu={odu}
        categories={categories}
        onClose={() => setSelection(null)}
        onNavigate={navigateTo}
      />
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// MOUNT
// ════════════════════════════════════════════════════════════
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
