/* ─────────────────────────────────────────────────────────────
   IfaLang · Ifa Language + Ifa Periodic Table · React 18 + Babel
   Universal meta-language & 256-Ifatom periodic table
   CENProject · toe.cenproject.org/ifa-language/
───────────────────────────────────────────────────────────── */

const { useState, useEffect, useMemo, useCallback, Fragment, useRef } = React;

// ── OgbeSymbol (SymboE — Ogbe Energy Symbol canvas) ──────────
function OgbeSymbol({ size = 44 }) {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const s = size;
    canvas.width  = s;
    canvas.height = s;
    const ctx = canvas.getContext('2d');
    const cx = s / 2, cy = s / 2, r = s * 0.36;
    const gold = '#f5c518';
    ctx.clearRect(0, 0, s, s);
    const draw = (alpha, lineW) => {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = gold;
      ctx.lineWidth   = lineW;
      ctx.lineCap     = 'round';
      for (let rot = 0; rot < 2; rot++) {
        ctx.beginPath();
        for (let t = 0; t <= Math.PI * 2; t += 0.01) {
          const scale = Math.cos(2 * t) >= 0 ? Math.sqrt(Math.cos(2 * t)) : 0;
          const x = cx + (rot === 0 ? 1 : 0) * r * scale * Math.cos(t) +
                         (rot === 1 ? 1 : 0) * r * scale * Math.sin(t);
          const y = cy + (rot === 0 ? 1 : 0) * r * scale * Math.sin(t) +
                         (rot === 1 ? 1 : 0) * r * scale * Math.cos(t);
          t < 0.02 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      ctx.restore();
    };
    draw(0.12, s * 0.22);
    draw(0.22, s * 0.13);
    draw(0.55, s * 0.055);
    draw(1.00, s * 0.022);
  }, [size]);
  return React.createElement('canvas', { ref, width: size, height: size,
    style: { display: 'block', flexShrink: 0, marginTop: '1px' } });
}

// ── OyekuSymbol (SymboN — Oyeku Anergy Symbol canvas) ─────────
function OyekuSymbol({ size = 44 }) {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const s = size;
    canvas.width  = s;
    canvas.height = s;
    const ctx = canvas.getContext('2d');
    const cx = s / 2, cy = s / 2, r = s * 0.36;
    const gold = '#f5c518';
    ctx.clearRect(0, 0, s, s);
    const drawLobes = (alpha, lineW) => {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = gold;
      ctx.lineWidth   = lineW;
      ctx.lineCap     = 'round';
      for (let rot = 0; rot < 2; rot++) {
        ctx.beginPath();
        for (let t = 0; t <= Math.PI * 2; t += 0.01) {
          const scale = Math.cos(2 * t) >= 0 ? Math.sqrt(Math.cos(2 * t)) : 0;
          const x = cx + (rot === 0 ? 1 : 0) * r * scale * Math.cos(t) +
                         (rot === 1 ? 1 : 0) * r * scale * Math.sin(t);
          const y = cy + (rot === 0 ? 1 : 0) * r * scale * Math.sin(t) +
                         (rot === 1 ? 1 : 0) * r * scale * Math.cos(t);
          t < 0.02 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      ctx.restore();
    };
    drawLobes(0.12, s * 0.22);
    drawLobes(0.22, s * 0.13);
    drawLobes(0.55, s * 0.055);
    drawLobes(1.00, s * 0.022);
    const ext = s * 0.30;
    const diag = [[cx + ext, cy - ext], [cx - ext, cy + ext]];
    const drawDiag = (alpha, lineW, blur) => {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = gold;
      ctx.lineWidth   = lineW;
      ctx.lineCap     = 'round';
      ctx.shadowColor = gold;
      ctx.shadowBlur  = blur;
      ctx.beginPath();
      ctx.moveTo(diag[0][0], diag[0][1]);
      ctx.lineTo(diag[1][0], diag[1][1]);
      ctx.stroke();
      ctx.restore();
    };
    drawDiag(0.03, s * 0.20, s * 0.12);
    drawDiag(0.07, s * 0.12, s * 0.08);
    drawDiag(0.16, s * 0.07, s * 0.05);
    drawDiag(0.34, s * 0.03, s * 0.03);
    drawDiag(0.62, s * 0.014, s * 0.015);
    drawDiag(0.90, s * 0.007, s * 0.007);
    drawDiag(0.95, s * 0.003, s * 0.003);
  }, [size]);
  return React.createElement('canvas', { ref, width: size, height: size,
    style: { display: 'block', flexShrink: 0, marginTop: '1px' } });
}

// ── MetaCircleCanvas (IfaZero / IfaOne Metarepresentation) ─────
function MetaCircleCanvas({ gold = true, size = 44 }) {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const DPR = window.devicePixelRatio || 1;
    canvas.width        = size * DPR;
    canvas.height       = size * DPR;
    canvas.style.width  = size + 'px';
    canvas.style.height = size + 'px';
    const ctx = canvas.getContext('2d');
    ctx.scale(DPR, DPR);
    const cx = size / 2, cy = size / 2;
    const R   = size * 0.360;
    const ARR = size * 0.135;

    const circL = gold
      ? [[2.2,'rgba(245,197,24,0.15)',5],[1.0,'rgba(245,197,24,0.58)',2.5],[0.5,'rgba(255,248,210,0.92)',1]]
      : [[2.2,'rgba(225,35,65,0.18)', 4],[1.0,'rgba(235,55,80,0.65)', 2.5],[0.5,'rgba(255,120,140,0.88)',1]];
    for (const [lw, color, blur] of circL) {
      ctx.save();
      ctx.strokeStyle = color; ctx.lineWidth = lw;
      ctx.shadowColor = color; ctx.shadowBlur = blur;
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, 2 * Math.PI); ctx.stroke();
      ctx.restore();
    }

    const tipX = gold ? cx + R : cx - R;
    const angle = Math.PI / 2;
    const arrL = gold
      ? [['rgba(245,197,24,0.42)',7],['rgba(255,248,210,0.92)',1.5]]
      : [['rgba(225,35,65,0.44)', 6],['rgba(255,120,140,0.90)',1.5]];
    for (const [color, blur] of arrL) {
      ctx.save();
      ctx.translate(tipX, cy); ctx.rotate(angle);
      ctx.shadowColor = color; ctx.shadowBlur = blur; ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(-ARR, -ARR * 0.44);
      ctx.lineTo(-ARR,  ARR * 0.44);
      ctx.closePath(); ctx.fill();
      ctx.restore();
    }

    const dotColor = gold ? 'rgba(245,197,24,1)'  : 'rgba(230,40,65,1)';
    const dotFill  = gold ? 'rgba(255,248,210,1)' : 'rgba(255,170,185,1)';
    ctx.save();
    ctx.shadowColor = dotColor; ctx.shadowBlur = 7;
    ctx.fillStyle = dotFill;
    ctx.beginPath(); ctx.arc(cx, cy, 1.8, 0, 2 * Math.PI); ctx.fill();
    ctx.restore();
  }, [gold, size]);
  return React.createElement('canvas', { ref,
    style: { display:'block', flexShrink:0, marginTop:'1px' } });
}

// ════════════════════════════════════════════════════════════
// GLYPH HELPERS  (Periodic Table section)
// ════════════════════════════════════════════════════════════
function primaryGlyph(code) {
  if (code === '1111') return 'O';
  if (code === '0000') return '|';
  return code.split('').reverse().map(b => b === '1' ? 'O' : 'I').join('');
}
function renderGlyphChars(g) {
  if (g.length === 1) return g;
  return g.split('').map((ch, i) => {
    const isLast = i === g.length - 1;
    const next = g[i + 1];
    let mr = '0';
    if (!isLast) mr = (ch === 'I' && next === 'I') ? '-0.08em' : '-0.22em';
    return <span key={i} style={{ marginRight: mr }}>{ch}</span>;
  });
}

// ════════════════════════════════════════════════════════════
// PT DECORATIVE COMPONENTS  (ported from Ifa Periodic Table)
// ════════════════════════════════════════════════════════════
function PalmSVG({ className }) {
  return (
    <svg className={className} viewBox="0 0 100 200" fill="none" aria-hidden="true">
      <path d="M52 198 C50 168 46 132 48 103 C50 76 52 52 56 18" stroke="currentColor" strokeWidth="7" strokeLinecap="round"/>
      <ellipse cx="50" cy="173" rx="2" ry="1.2" fill="currentColor" opacity="0.4"/>
      <ellipse cx="49" cy="146" rx="2" ry="1.2" fill="currentColor" opacity="0.4"/>
      <ellipse cx="50" cy="118" rx="2" ry="1.2" fill="currentColor" opacity="0.4"/>
      <circle cx="55" cy="22" r="7"   fill="currentColor" opacity="0.85"/>
      <circle cx="67" cy="30" r="5.5" fill="currentColor" opacity="0.7"/>
      <circle cx="43" cy="29" r="5.5" fill="currentColor" opacity="0.7"/>
      <circle cx="61" cy="14" r="4.5" fill="currentColor" opacity="0.6"/>
      <circle cx="73" cy="22" r="3.5" fill="currentColor" opacity="0.55"/>
      <circle cx="38" cy="19" r="3.5" fill="currentColor" opacity="0.55"/>
      <path d="M56 18 C40 13 20 16 2  34"  stroke="currentColor" strokeWidth="4"   strokeLinecap="round"/>
      <path d="M56 18 C42 6  24 2  8  14"  stroke="currentColor" strokeWidth="3.5" strokeLinecap="round"/>
      <path d="M56 18 C44 3  28 -1 16  8"  stroke="currentColor" strokeWidth="3"   strokeLinecap="round"/>
      <path d="M56 18 C42 22 24 37  6 56"  stroke="currentColor" strokeWidth="3.5" strokeLinecap="round"/>
      <path d="M56 18 C48 7  38  0 26 -8"  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M56 18 C72 13 90 16 100 34" stroke="currentColor" strokeWidth="4"   strokeLinecap="round"/>
      <path d="M56 18 C70 6  88 2   96 14" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round"/>
      <path d="M56 18 C68 3  82 -1  90  8" stroke="currentColor" strokeWidth="3"   strokeLinecap="round"/>
      <path d="M56 18 C70 22 86 37  96 56" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round"/>
      <path d="M56 18 C64 7  74  0  82 -8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M56 18 C55 6  53 -2 51 -12" stroke="currentColor" strokeWidth="3"   strokeLinecap="round"/>
    </svg>
  );
}

function OponIfaSVG({ className }) {
  return (
    <svg className={className} viewBox="0 0 160 160" fill="none" aria-hidden="true">
      <circle cx="80" cy="80" r="76" stroke="currentColor" strokeWidth="3.5" opacity="0.75"/>
      <circle cx="80" cy="80" r="67" stroke="currentColor" strokeWidth="1"   opacity="0.3"/>
      <circle cx="80" cy="12" r="9"  stroke="currentColor" strokeWidth="2"   opacity="0.85"/>
      <circle cx="80" cy="12" r="3"  fill="currentColor"   opacity="0.7"/>
      <path   d="M75 7 L80 2 L85 7"  stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" opacity="0.8"/>
      <line x1="80"  y1="23"  x2="80"  y2="137" stroke="currentColor" strokeWidth="0.6" opacity="0.15"/>
      <line x1="23"  y1="80"  x2="137" y2="80"  stroke="currentColor" strokeWidth="0.6" opacity="0.15"/>
      <line x1="34"  y1="34"  x2="126" y2="126" stroke="currentColor" strokeWidth="0.4" opacity="0.1"/>
      <line x1="126" y1="34"  x2="34"  y2="126" stroke="currentColor" strokeWidth="0.4" opacity="0.1"/>
      <line x1="80"  y1="4"   x2="80"  y2="16"  stroke="currentColor" strokeWidth="3"/>
      <line x1="144" y1="80"  x2="156" y2="80"  stroke="currentColor" strokeWidth="3"/>
      <line x1="80"  y1="144" x2="80"  y2="156" stroke="currentColor" strokeWidth="3"/>
      <line x1="4"   y1="80"  x2="16"  y2="80"  stroke="currentColor" strokeWidth="3"/>
      <line x1="120" y1="19"  x2="124" y2="23"  stroke="currentColor" strokeWidth="2.5"/>
      <line x1="123" y1="16"  x2="127" y2="20"  stroke="currentColor" strokeWidth="2.5"/>
      <line x1="120" y1="137" x2="124" y2="141" stroke="currentColor" strokeWidth="2.5"/>
      <line x1="123" y1="140" x2="127" y2="144" stroke="currentColor" strokeWidth="2.5"/>
      <line x1="33"  y1="137" x2="37"  y2="141" stroke="currentColor" strokeWidth="2.5"/>
      <line x1="36"  y1="140" x2="40"  y2="144" stroke="currentColor" strokeWidth="2.5"/>
      <line x1="33"  y1="19"  x2="37"  y2="23"  stroke="currentColor" strokeWidth="2.5"/>
      <line x1="36"  y1="16"  x2="40"  y2="20"  stroke="currentColor" strokeWidth="2.5"/>
      <path d="M80 52 L108 80 L80 108 L52 80 Z" stroke="currentColor" strokeWidth="1.2" opacity="0.3"/>
      <circle cx="80" cy="80" r="14" stroke="currentColor" strokeWidth="1.5" opacity="0.4"/>
      <circle cx="80" cy="80" r="5"  fill="currentColor"   opacity="0.35"/>
    </svg>
  );
}

function IfaHeroStrip() {
  return (
    <div className="ifa-hero">
      <div className="ifa-hero__stripe ifa-hero__stripe--top" />
      <PalmSVG className="ifa-hero__palm ifa-hero__palm--l1" />
      <PalmSVG className="ifa-hero__palm ifa-hero__palm--l2" />
      <PalmSVG className="ifa-hero__palm ifa-hero__palm--r1" />
      <PalmSVG className="ifa-hero__palm ifa-hero__palm--r2" />
      <OponIfaSVG className="ifa-hero__opon" />
      <div className="ifa-hero__content">
        <p className="ifa-hero__tagline">Mapping the Building Blocks of All Fields of Knowledge.</p>
        <p className="ifa-hero__tradition">Ifá. Òrìṣà. Ìṣẹ̀ṣe.</p>
      </div>
      <div className="ifa-hero__stripe ifa-hero__stripe--bot" />
    </div>
  );
}

function IfabokBanner() {
  return (
    <section className="ifabok-banner">
      <div className="ifabok-banner__inner">
        <figure className="ifabok-banner__figure">
          <img className="ifabok-banner__img"
            src="../ifa-periodic-table/images/ifabok-periodic-table.png"
            alt="The IFABOK — Àtẹ́fá-Èròjà Gbogbo ìmọ̀, The Periodic Table of All Knowledge" />
        </figure>
      </div>
    </section>
  );
}

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
            <div className="ifapt-intro__stat"><span className="ifapt-intro__stat-num">256</span><span className="ifapt-intro__stat-lbl">Elements</span></div>
            <div className="ifapt-intro__divider" />
            <div className="ifapt-intro__stat"><span className="ifapt-intro__stat-num">16</span><span className="ifapt-intro__stat-lbl">Groups</span></div>
            <div className="ifapt-intro__divider" />
            <div className="ifapt-intro__stat"><span className="ifapt-intro__stat-num">16</span><span className="ifapt-intro__stat-lbl">Periods</span></div>
          </div>
          <p className="ifapt-intro__closing">
            It serves as a unifying framework for all fields within the BaseField,{' '}
            <strong className="ifapt-intro__accent ifapt-intro__accent--gold">IFA Mathematics</strong>.
          </p>
          <p className="ifapt-intro__expanded">
            The <strong>Ifa Periodic Table</strong> is a Tool of the{' '}
            <strong className="ifapt-intro__accent ifapt-intro__accent--gold">IFA Body of Knowledge (IFABOK)</strong>,
            also called the <strong className="ifapt-intro__accent">IFA Internet</strong>,{' '}
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

function IfaPTGallery() {
  return (
    <section className="ifapt-gallery">
      <div className="ifapt-gallery__inner">
        <div className="ifapt-gallery__row ifapt-gallery__row--duo">
          <figure className="ifapt-gallery__figure">
            <img className="ifapt-gallery__img ifapt-gallery__img--light"
              src="../ifa-periodic-table/images/ifalang-master-character-ogbe.png"
              alt="Ifa I/O Notation: IfaLang Master Character, Ogbe" />
          </figure>
          <figure className="ifapt-gallery__figure">
            <img className="ifapt-gallery__img ifapt-gallery__img--light"
              src="../ifa-periodic-table/images/ifapt-four-forms.png"
              alt="The IfaPT: Four Different Forms of Ifa Periodic Table" />
          </figure>
        </div>
        <div className="ifapt-gallery__row ifapt-gallery__row--solo">
          <figure className="ifapt-gallery__figure">
            <img className="ifapt-gallery__img ifapt-gallery__img--light"
              src="../ifa-periodic-table/images/ifabit-bit-universe.png"
              alt="IFABit: The Bit Universe — The Universe of Building Blocks" />
            <figcaption className="ifapt-gallery__caption">The Dual Form of Ifa's Periodic Table</figcaption>
          </figure>
        </div>
        <div className="ifapt-gallery__row ifapt-gallery__row--duo">
          <figure className="ifapt-gallery__figure">
            <img className="ifapt-gallery__img ifapt-gallery__img--dark"
              src="../ifa-periodic-table/images/ifa-infinity-compact.png"
              alt="The Compact Form of Ifa's Periodic Table — Ifa Infinity (Duoinfinity)" />
            <figcaption className="ifapt-gallery__caption">The Compact Form of Ifa's Periodic Table</figcaption>
          </figure>
          <figure className="ifapt-gallery__figure">
            <img className="ifapt-gallery__img ifapt-gallery__img--light"
              src="../ifa-periodic-table/images/ifalang-16-odu-matrix.png"
              alt="IfaLang — 16 Odu Ifa matrix form characters" />
            <figcaption className="ifapt-gallery__caption">The Matrix Form of Ifa's Periodic Table</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

function IfatomIntro() {
  return (
    <section className="ifatom-intro">
      <div className="ifatom-intro__inner">
        <img className="ifatom-intro__diagram"
          src="../ifa-periodic-table/images/ifatom-diagram.png"
          alt="IFAtom: The Atom of Everything (AtomoE) — diagram showing Ifa-Atom at the centre connected to atoms of Natural Science, Technology, Engineering, Arts, Mathematics, Social Science, Education, and Other Fields" />
        <p className="ifatom-intro__desc">
          Ifatoms are the 256 Odu Ifa and are the most basic building blocks of all fields and disciplines of knowledge.
        </p>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════
// IFA MARKS  –  two-column binary divination visual
// bit=1 → single bar (Ogbe/Energy)  |  bit=0 → double bar (Oyeku/Anergy)
// ════════════════════════════════════════════════════════════
function IfaMarks({ code = '0000', secondCode, color = '#888', size = 'md' }) {
  const leftBits  = code.split('').map(Number);
  const rightBits = (secondCode || code).split('').map(Number);

  function MarkRow({ bit }) {
    return (
      <div className="ifa-marks__row">
        {bit === 0
          ? <>
              <span className="ifa-marks__bar" style={{ background: color }} />
              <span className="ifa-marks__bar" style={{ background: color }} />
            </>
          : <span className="ifa-marks__bar" style={{ background: color }} />
        }
      </div>
    );
  }

  return (
    <div className={`ifa-marks ifa-marks--${size}`}>
      <div className="ifa-marks__col">
        {leftBits.map((b, i) => <MarkRow key={i} bit={b} />)}
      </div>
      <div className="ifa-marks__col">
        {rightBits.map((b, i) => <MarkRow key={i} bit={b} />)}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// HEADER  —  logo + section tabs + law nav
// ════════════════════════════════════════════════════════════
function Header({ section, onSection, laws, activeId, onSelect, ifaplUrl }) {
  return (
    <header className="header">
      <div className="header__topbar">
        <a href="https://toe.cenproject.org/" className="header__topbar-link" target="_blank" rel="noopener noreferrer">
          <span className="header__topbar-title">The IFA Internet · toe.cenproject.org</span>
        </a>
      </div>
      <div className="header__top">
        <div className="header__brand">
<span className="header__logo">IfaLang</span>
        </div>
        <div className="header__sections">
          <button
            className={'header__sec-btn' + (section === 'ifalang' ? ' header__sec-btn--active' : '')}
            onClick={() => onSection('ifalang')}
          >IfaLang</button>
          <button
            className={'header__sec-btn' + (section === 'orisa' ? ' header__sec-btn--active' : '')}
            onClick={() => onSection('orisa')}
          >OrisaLang</button>
          <button
            className={'header__sec-btn' + (section === 'pt' ? ' header__sec-btn--active' : '')}
            onClick={() => onSection('pt')}
          >Ifa Periodic Table</button>
        </div>
        <a href={ifaplUrl} className="header__ext" target="_blank" rel="noopener">IfaPL →</a>
      </div>

      {section === 'ifalang' && (
        <nav className="law-nav" aria-label="16 Laws of Ifa">
          <button
            className={'law-nav__btn' + (!activeId ? ' law-nav__btn--active' : '')}
            style={{ '--law-color': 'var(--gold)' }}
            onClick={() => onSelect(null)}
          >All</button>
          <span className="law-nav__sep">|</span>
          {laws.map((pair, idx) => (
            <Fragment key={pair.primary.id}>
              {idx > 0 && <span className="law-nav__sep">·</span>}
              <button
                className={'law-nav__btn' + (activeId === pair.primary.id ? ' law-nav__btn--active' : '')}
                style={{ '--law-color': pair.primary.color }}
                onClick={() => onSelect(pair.primary.id)}
              >{pair.primary.name}</button>
              <button
                className={'law-nav__btn law-nav__btn--dual' + (activeId === pair.dual.id ? ' law-nav__btn--active' : '')}
                style={{ '--law-color': pair.dual.color }}
                onClick={() => onSelect(pair.dual.id)}
              >{pair.dual.name}</button>
            </Fragment>
          ))}
        </nav>
      )}
    </header>
  );
}

// ════════════════════════════════════════════════════════════
// LAW CARD  (IfaLang section)
// ════════════════════════════════════════════════════════════
function LawCard({ law, dualName, onClick }) {
  const fieldKeys = Object.keys(law.fields).slice(0,4);
  return (
    <div className="law-card" style={{ '--law-color': law.color }} onClick={onClick}>
      <div className="law-card__top">
        <div className="law-card__name">{law.name}</div>
        <span className={'law-card__badge law-card__badge--' + law.type}>
          {law.type === 'primary' ? 'Law' : 'Dual'}
        </span>
      </div>
      <p className="law-card__def">{law.definition}</p>
      <div className="law-card__fields">
        {fieldKeys.map(f => <span key={f} className="law-card__field">{f}</span>)}
      </div>
      <div className="law-card__dual-ref">
        {law.type === 'primary' ? 'Dual:' : 'Primary:'}&nbsp;<span>{dualName}</span>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// IFA BINARY ENCODING SCHEME
// ════════════════════════════════════════════════════════════
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
                  <OgbeSymbol size={44} />
                  <div className="ifa-binary__meta-text">
                    <strong>DuoInfinity · InfinitoE</strong>
                    <p>Ifa Infinity — crossed with ∞; renders circling. The Infinity for Everything.</p>
                  </div>
                </li>
                <li className="ifa-binary__meta">
                  <MetaCircleCanvas gold={true} size={44} />
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
                  <OyekuSymbol size={44} />
                  <div className="ifa-binary__meta-text">
                    <strong>DuoInfinity · NinfinitoE</strong>
                    <p>Ifa Ninfinity — DuoInfinity with "J" dash. NanInfinity. Dual of Infinity.</p>
                  </div>
                </li>
                <li className="ifa-binary__meta">
                  <MetaCircleCanvas gold={false} size={44} />
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

// ════════════════════════════════════════════════════════════
// OVERVIEW  —  all 16 laws
// ════════════════════════════════════════════════════════════
function Overview({ lawPairs, meta, onSelect }) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const allLaws = useMemo(() => lawPairs.flatMap(p => [p.primary, p.dual]), [lawPairs]);

  const matchedIds = useMemo(() => {
    if (!search.trim()) return null;
    const t = search.toLowerCase();
    return new Set(allLaws.filter(l =>
      l.name.toLowerCase().includes(t) ||
      l.definition.toLowerCase().includes(t) ||
      l.principle.toLowerCase().includes(t) ||
      Object.values(l.fields).some(v => v.toLowerCase().includes(t)) ||
      l.technology.toLowerCase().includes(t)
    ).map(l => l.id));
  }, [search, allLaws]);

  const visiblePairs = useMemo(() => lawPairs.map(pair => {
    const showP = (filter === 'all' || filter === 'primary') && (!matchedIds || matchedIds.has(pair.primary.id));
    const showD = (filter === 'all' || filter === 'dual')    && (!matchedIds || matchedIds.has(pair.dual.id));
    return { pair, showP, showD };
  }).filter(x => x.showP || x.showD), [lawPairs, filter, matchedIds]);

  const totalShown = visiblePairs.reduce((n, x) => n + (x.showP ? 1 : 0) + (x.showD ? 1 : 0), 0);

  return (
    <div>
      <div className="hero">
        <p className="hero__itoe-tag">IFA Language · CEN Language · Language of Energy</p>
        <h1 className="hero__title">IfaLang</h1>
        <p className="hero__sub">{meta.description}</p>
        <p className="hero__context">
          IfaLang is the <strong>Language of Energy (LoE)</strong> — the Universal Communication Protocol
          of the <strong>IFA Internet</strong> (IfaNet), enabling all fields of knowledge to 'talk to one another'
          using the <strong>256 Odu Ifa</strong>. It is the Language of the{' '}
          <strong>IFA Body of Knowledge (IFABOK)</strong>.
        </p>
        <div className="hero__links">
          <a href={meta.ifapl_url} className="hero__ifapl" target="_blank" rel="noopener">
            ↗ IfaPL — Ifa Programming Language
          </a>
          <a href="https://toe.cenproject.org/ifa-language/" className="hero__ifapl" target="_blank" rel="noopener noreferrer">
            ↗ IfaLang Platform
          </a>
        </div>
      </div>
      <IfaBinaryEncoding />
      <div className="overview">
        <div className="overview__search-row">
          <input
            className="overview__search" type="search"
            placeholder="Search laws, fields, technologies…"
            value={search} onChange={e => setSearch(e.target.value)}
          />
          <div className="overview__filter">
            {['all','primary','dual'].map(f => (
              <button key={f} className={'filter-btn' + (filter === f ? ' filter-btn--active' : '')} onClick={() => setFilter(f)}>
                {f === 'all' ? 'All 16' : f === 'primary' ? '8 Laws' : '8 Duals'}
              </button>
            ))}
          </div>
          <span className="overview__count">{totalShown} / 16</span>
        </div>
        {visiblePairs.map(({ pair, showP, showD }) => (
          <div key={pair.primary.id} className="pair-row">
            {showP ? <LawCard law={pair.primary} dualName={pair.dual.name} onClick={() => onSelect(pair.primary.id)} /> : <div />}
            {showD ? <LawCard law={pair.dual} dualName={pair.primary.name} onClick={() => onSelect(pair.dual.id)} /> : <div />}
          </div>
        ))}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// LAW DETAIL
// ════════════════════════════════════════════════════════════
function LawDetail({ law, dualLaw, onSelectDual }) {
  const FIELD_ORDER = ['Physics','Mathematics','Biology','Computer Science','Economics','Engineering'];
  const fieldEntries = FIELD_ORDER.filter(k => law.fields[k]).map(k => [k, law.fields[k]]);
  Object.entries(law.fields).forEach(([k,v]) => { if (!FIELD_ORDER.includes(k)) fieldEntries.push([k,v]); });
  const oduCode = (law.oduCode || '').replace(/[^01]/g,'').slice(0,4);

  return (
    <div className="law-detail" style={{ '--law-color': law.color }}>
      <div className="law-detail__header">
        <div className="law-detail__header-left">
          <div className="law-detail__type">{law.type === 'primary' ? 'Primary Law' : 'Dual Law'} · IfaLang</div>
          <h1 className="law-detail__name">{law.name}</h1>
          <p className="law-detail__def">{law.definition}</p>
          {law.mathematicalForm && <div className="law-detail__math">{law.mathematicalForm}</div>}
        </div>
        {law.odu && (
          <div className="law-detail__odu">
            {oduCode.length === 4 && <IfaMarks code={oduCode} color={law.color} size="md" />}
            <span className="law-detail__odu-label">Odu</span>
            <span className="law-detail__odu-name">{law.odu}</span>
            {oduCode && <span className="law-detail__odu-code">{oduCode}</span>}
          </div>
        )}
      </div>
      <div className="law-detail__principle">{law.principle}</div>
      <div className="law-detail__section-title">Cross-Field Applications</div>
      <div className="law-detail__fields">
        {fieldEntries.map(([field,body]) => (
          <div className="field-card" key={field} style={{ '--law-color': law.color }}>
            <div className="field-card__name">{field}</div>
            <div className="field-card__body">{body}</div>
          </div>
        ))}
      </div>
      {law.technology && (<><div className="law-detail__section-title">Technologies</div><div className="law-detail__tech">{law.technology}</div></>)}
      {law.unification && (<><div className="law-detail__section-title">Unification</div><div className="law-detail__unif">{law.unification}</div></>)}
      {dualLaw && (
        <>
          <div className="law-detail__section-title">{law.type === 'primary' ? 'Dual (Opposite) Law' : 'Primary Law'}</div>
          <div className="dual-link" style={{ '--dual-color': dualLaw.color }}
            onClick={() => onSelectDual(dualLaw.id)} role="button" tabIndex={0}
            onKeyDown={e => e.key === 'Enter' && onSelectDual(dualLaw.id)}>
            <div>
              <div className="dual-link__label">{dualLaw.type === 'primary' ? 'Primary Law' : 'Dual Law'} · IfaLang</div>
              <div className="dual-link__name">{dualLaw.name}</div>
              <div className="dual-link__def">{dualLaw.definition}</div>
            </div>
            <span className="dual-link__arrow">→</span>
          </div>
        </>
      )}
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// ORISA CARD  (OrisaLang section)
// ════════════════════════════════════════════════════════════
function OrisaCard({ item }) {
  return (
    <div className="ol-card" style={{ '--ol-color': item.color }}>
      <div className="ol-card__top">
        <span className="ol-card__lang">{item.lang}</span>
        <span className="ol-card__orisa">{item.orisa}</span>
      </div>
      <p className="ol-card__domain">{item.domain}</p>
      <p className="ol-card__energy">{item.energy}</p>
      <div className="ol-card__sectors">
        {item.sectors.map(s => <span key={s} className="ol-card__sector">{s}</span>)}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// ORISA CODEX  (OrisaLang → Codex sub-section)
// ════════════════════════════════════════════════════════════
function OrisaCodexIntro() {
  return (
    <div className="oc-intro">
      <div className="oc-intro__badges">
        <span className="oc-intro__badge">OrisaMatrix</span>
        <span className="oc-intro__badge">Dual of IfaMatrix</span>
        <span className="oc-intro__badge">Ẹ́rìndínlógún Pattern</span>
        <span className="oc-intro__badge">OrisaLogic</span>
      </div>
      <h2 className="oc-intro__title">OrisaCodex</h2>
      <p className="oc-intro__desc">
        The Matrix of Symbols of all past beings, higher beings, early beings, and first beings —
        Òrìṣà, Irúnmọlẹ̀, Ẹbọra — in Ìṣẹ̀ṣe. The Dual of IfaMatrix, used for
        Ifa-Orisa Communications, Ifa-Orisa Networking, Ifa-Orisa Internetworking, Ifa-Orisa Systems, and Ifa-Orisa Technologies.
      </p>
      <p className="oc-intro__sub">
        Each <strong>OrisaScript</strong> encodes 8 sacred symbols — animals, plants, and elements of
        nature — arranged in the pattern of Odu Ifa: two columns of four, following the 16 Orisa
        Principles known as <em>Ẹ́rìndínlógún</em>. Click any script to reveal its symbols.
      </p>
      <div className="oc-intro__uses">
        <span className="oc-intro__use">Ifa Icons</span>
        <span className="oc-intro__use">Orisa Icons</span>
        <span className="oc-intro__use">Ifa Emojis</span>
        <span className="oc-intro__use">Orisa Emojis</span>
        <span className="oc-intro__use">Ifa Emoticons</span>
        <span className="oc-intro__use">Orisa Emoticons</span>
        <span className="oc-intro__use">Ifa-Orisa Systems</span>
        <span className="oc-intro__use">Ifa-Orisa Technologies</span>
        <span className="oc-intro__use">Orisa Codex</span>
        <span className="oc-intro__use">Orisa-Codex</span>
        <span className="oc-intro__use">Orisa Script</span>
        <span className="oc-intro__use">Orisa-Script</span>
        <span className="oc-intro__use">IfaScript</span>
        <span className="oc-intro__use">Ifa-Script</span>
        <span className="oc-intro__use">Ifa Script</span>
        <span className="oc-intro__use">ToE Script</span>
      </div>
    </div>
  );
}

// ── Irun Ọlọ́ṣun Icon — black locs + silver comb ──────────────
function IrunOlosunIcon() {
  const braidXs = [5, 11, 17, 23, 29, 35];
  const toothXs = [9, 15, 21, 27, 33];
  return (
    <svg viewBox="0 0 42 48" width="34" height="38" aria-hidden="true" style={{display:'block'}}>
      {/* black locs */}
      {braidXs.map((x, k) => (
        <g key={k}>
          <path
            d={`M${x} 0 Q${x+1} 10 ${x} 20 Q${x-1} 30 ${x} 40 Q${x+1} 44 ${x} 48`}
            stroke="#1a0f08" strokeWidth="4" fill="none" strokeLinecap="round"
          />
          <path
            d={`M${x} 0 Q${x+1} 10 ${x} 20 Q${x-1} 30 ${x} 40 Q${x+1} 44 ${x} 48`}
            stroke="rgba(90,55,20,0.32)" strokeWidth="1.4" fill="none" strokeLinecap="round"
          />
        </g>
      ))}
      {/* silver comb bar */}
      <path d="M2 22 Q21 17 40 22" stroke="#9ab0bc" strokeWidth="3" fill="none" strokeLinecap="round"/>
      <path d="M2 22 Q21 17 40 22" stroke="rgba(230,245,255,0.45)" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      {/* comb teeth pointing up */}
      {toothXs.map((x, k) => {
        const base = 22 - (21 - x) * (21 - x) * 0.007;
        return <line key={k} x1={x} y1={base} x2={x} y2={base - 8} stroke="#b8ccd8" strokeWidth="1.8" strokeLinecap="round"/>;
      })}
      {/* comb top ornament */}
      <path d="M18 12 Q21 7 24 12" stroke="#b8ccd8" strokeWidth="1.6" fill="none" strokeLinecap="round"/>
      <circle cx="21" cy="9" r="2" fill="#ccdde8" stroke="#9ab0bc" strokeWidth="0.8"/>
      {/* gold bead left */}
      <circle cx="6" cy="8" r="2.4" fill="#f0a800" stroke="#c8860a" strokeWidth="0.7"/>
      <circle cx="6" cy="7" r="1" fill="rgba(255,230,120,0.55)"/>
      {/* orange/coral bead right */}
      <circle cx="36" cy="9" r="2" fill="#e05c3c" stroke="#b84020" strokeWidth="0.7"/>
    </svg>
  );
}

// ── Yoruba Portrait SVG (for OrisaScript people slider) ──────
function YorubaPortrait({ gender, color, role }) {
  const skin = '#8C5E3C';
  const isRoyal = /wife|queen|king|royal|priestess/i.test(role || '');
  const ac   = color || '#c0392b';
  const gold = '#f5c518';
  const bead = '#d63031';

  const face = (
    <>
      <rect x="33" y="39" width="14" height="11" rx="3" fill={skin}/>
      <path d="M27 47 Q40 53 53 47" stroke={bead} strokeWidth="3.5" fill="none" strokeLinecap="round" strokeDasharray="4,2.5"/>
      <ellipse cx="40" cy="27" rx="17" ry="19" fill={skin}/>
      <line x1="26" y1="26" x2="21" y2="31" stroke="#5C3010" strokeWidth="1.1" opacity="0.55"/>
      <line x1="27" y1="30" x2="22" y2="35" stroke="#5C3010" strokeWidth="1.1" opacity="0.55"/>
      <line x1="54" y1="26" x2="59" y2="31" stroke="#5C3010" strokeWidth="1.1" opacity="0.55"/>
      <line x1="53" y1="30" x2="58" y2="35" stroke="#5C3010" strokeWidth="1.1" opacity="0.55"/>
      <ellipse cx="33" cy="24" rx="3.2" ry="2.6" fill="#1A0800"/>
      <ellipse cx="47" cy="24" rx="3.2" ry="2.6" fill="#1A0800"/>
      <ellipse cx="32.2" cy="23.2" rx="1.1" ry="0.9" fill="white" opacity="0.45"/>
      <ellipse cx="46.2" cy="23.2" rx="1.1" ry="0.9" fill="white" opacity="0.45"/>
      <ellipse cx="40" cy="31" rx="3.2" ry="2.2" fill="#7A4F28" opacity="0.65"/>
      <path d="M34 36 Q40 40 46 36" stroke="#5C2D10" strokeWidth="2.2" fill="#B06040" strokeLinecap="round"/>
    </>
  );

  if (gender === 'female') {
    return (
      <svg viewBox="0 0 80 112" width="72" height="101" aria-hidden="true" style={{display:'block',flexShrink:0}}>
        <rect x="14" y="64" width="52" height="44" rx="4" fill={ac}/>
        <line x1="14" y1="72" x2="66" y2="72" stroke={gold} strokeWidth="1.2" opacity="0.35"/>
        <line x1="14" y1="80" x2="66" y2="80" stroke={gold} strokeWidth="1.2" opacity="0.35"/>
        <line x1="14" y1="88" x2="66" y2="88" stroke={gold} strokeWidth="1.2" opacity="0.35"/>
        <rect x="13" y="44" width="54" height="24" rx="6" fill={ac} opacity="0.88"/>
        <line x1="13" y1="52" x2="67" y2="52" stroke={gold} strokeWidth="1.2" opacity="0.3"/>
        <line x1="13" y1="60" x2="67" y2="60" stroke={gold} strokeWidth="1.2" opacity="0.3"/>
        {face}
        <ellipse cx="40" cy="10" rx="22" ry="12" fill={gold}/>
        <path d="M18 10 Q40 -1 62 10 L63 17 Q40 7 17 17 Z" fill={isRoyal ? gold : '#e0a800'} opacity="0.85"/>
        <line x1="23" y1="7" x2="25" y2="18" stroke="rgba(0,0,0,0.18)" strokeWidth="1"/>
        <line x1="32" y1="4" x2="33" y2="17" stroke="rgba(0,0,0,0.18)" strokeWidth="1"/>
        <line x1="40" y1="3" x2="40" y2="17" stroke="rgba(0,0,0,0.18)" strokeWidth="1"/>
        <line x1="48" y1="4" x2="47" y2="17" stroke="rgba(0,0,0,0.18)" strokeWidth="1"/>
        <line x1="57" y1="7" x2="55" y2="18" stroke="rgba(0,0,0,0.18)" strokeWidth="1"/>
        {isRoyal && <ellipse cx="40" cy="9" rx="6" ry="3" fill={ac} opacity="0.7"/>}
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 80 112" width="72" height="101" aria-hidden="true" style={{display:'block',flexShrink:0}}>
      <path d="M6 50 Q40 66 74 50 L70 108 L10 108 Z" fill={ac} opacity="0.5"/>
      <rect x="15" y="44" width="50" height="42" rx="5" fill={ac}/>
      <line x1="10" y1="70" x2="70" y2="70" stroke={gold} strokeWidth="1.3" opacity="0.35"/>
      <line x1="10" y1="82" x2="70" y2="82" stroke={gold} strokeWidth="1.3" opacity="0.35"/>
      <rect x="20" y="90" width="40" height="16" rx="3" fill={ac} opacity="0.6"/>
      {face}
      <ellipse cx="40" cy="11" rx="19" ry="10" fill={isRoyal ? gold : '#1a1a2e'}/>
      <path d="M21 11 Q40 4 59 11" fill={isRoyal ? '#e0a800' : '#0f0f20'}/>
      {isRoyal && (
        <>
          <ellipse cx="40" cy="10" rx="7" ry="4" fill={ac} opacity="0.85"/>
          <line x1="33" y1="7" x2="31" y2="2" stroke={gold} strokeWidth="1.5"/>
          <line x1="40" y1="6" x2="40" y2="1" stroke={gold} strokeWidth="1.5"/>
          <line x1="47" y1="7" x2="49" y2="2" stroke={gold} strokeWidth="1.5"/>
          <circle cx="31" cy="2" r="1.5" fill={gold}/>
          <circle cx="40" cy="1" r="1.5" fill={gold}/>
          <circle cx="49" cy="2" r="1.5" fill={gold}/>
        </>
      )}
    </svg>
  );
}

function OrisaScriptCard({ item, expanded, onToggle }) {
  const [openPersons, setOpenPersons] = useState({});
  const togglePerson = useCallback((i, e) => {
    e.stopPropagation();
    setOpenPersons(s => ({ ...s, [i]: !s[i] }));
  }, []);

  const col1 = item.symbols ? item.symbols.slice(0, 4) : [];
  const col2 = item.symbols ? item.symbols.slice(4, 8) : [];
  return (
    <div
      className={'oc-card' + (expanded ? ' oc-card--open' : '')}
      style={{ '--oc-color': item.color }}
      onClick={onToggle}
      role="button"
      tabIndex={0}
      onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onToggle()}
      aria-expanded={expanded}
    >
      <div className="oc-card__head">
        <span className="oc-card__script">{item.script || (item.lang.replace('Lang','Script'))}</span>
        <span className="oc-card__orisa">{item.orisa}</span>
      </div>

      <div className="oc-matrix">
        <div className="oc-matrix__col">
          {col1.map((sym, i) => (
            <div key={i} className="oc-cell" title={sym.name}>
              <span className="oc-cell__glyph" role="img" aria-label={sym.name}>{sym.glyph}</span>
            </div>
          ))}
        </div>
        <div className="oc-matrix__col">
          {col2.map((sym, i) => (
            <div key={i} className="oc-cell" title={sym.name}>
              <span className="oc-cell__glyph" role="img" aria-label={sym.name}>{sym.glyph}</span>
            </div>
          ))}
        </div>
      </div>

      <p className="oc-card__domain">{item.domain.split(',')[0]}</p>

      {expanded && item.symbols && (
        <div className="oc-detail" onClick={e => e.stopPropagation()}>
          <div className="oc-detail__label">OrisaScript · 8 Sacred Symbols</div>
          <div className="oc-detail__list">
            {item.symbols.map((sym, i) => (
              <Fragment key={i}>
                <div className="oc-detail__row">
                  <span className="oc-detail__glyph" role="img" aria-label={sym.name}>
                    {sym.svgGlyph === 'irunOlosun' ? <IrunOlosunIcon /> : sym.glyph}
                  </span>
                  <div className="oc-detail__text">
                    <span className="oc-detail__name">{sym.name}</span>
                    <span className="oc-detail__meaning">{sym.meaning}</span>
                  </div>
                  {sym.person && (
                    <button
                      className={'person-toggle' + (openPersons[i] ? ' person-toggle--on' : '')}
                      onClick={e => togglePerson(i, e)}
                      title={openPersons[i] ? 'Hide person' : 'Show past Yoruba person'}
                      aria-label={openPersons[i] ? 'Hide person behind this name' : 'Show past Yoruba person behind this name'}
                    >
                      <span className="person-toggle__track">
                        <span className="person-toggle__thumb" />
                      </span>
                      <span className="person-toggle__label">Person</span>
                    </button>
                  )}
                </div>
                {sym.person && openPersons[i] && (
                  <div className="person-card" onClick={e => e.stopPropagation()}>
                    <div className="person-card__portrait">
                      <YorubaPortrait gender={sym.person.gender} color={item.color} role={sym.person.role} />
                    </div>
                    <div className="person-card__info">
                      <div className="person-card__badge">Past Yoruba Person</div>
                      <div className="person-card__name">{sym.person.name}</div>
                      <div className="person-card__role">{sym.person.role}</div>
                      <p className="person-card__desc">{sym.person.desc}</p>
                    </div>
                  </div>
                )}
              </Fragment>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function OrisaCodex({ orisa }) {
  const [active, setActive] = useState(null);
  return (
    <div className="oc-wrap">
      <OrisaCodexIntro />
      <div className="oc-grid">
        {orisa.map(item => (
          <OrisaScriptCard
            key={item.id}
            item={item}
            expanded={active === item.id}
            onToggle={() => setActive(active === item.id ? null : item.id)}
          />
        ))}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// ORISA OVERVIEW  (OrisaLang section)
// ════════════════════════════════════════════════════════════
function OrisaOverview({ data }) {
  const [view,   setView]   = useState('codex');
  const [search, setSearch] = useState('');
  const filtered = useMemo(() => {
    if (!search.trim()) return data.orisa;
    const t = search.toLowerCase();
    return data.orisa.filter(item =>
      item.lang.toLowerCase().includes(t) ||
      item.orisa.toLowerCase().includes(t) ||
      item.domain.toLowerCase().includes(t) ||
      item.energy.toLowerCase().includes(t) ||
      item.sectors.some(s => s.toLowerCase().includes(t))
    );
  }, [data.orisa, search]);

  return (
    <div>
      <div className="hero">
        <p className="hero__itoe-tag">Orisa Language · Energy Language · Consciousness Language</p>
        <h1 className="hero__title">OrisaLang</h1>
        <p className="hero__sub">{data.meta.description}</p>
        <p className="hero__context">
          <em>Every element of nature, including Nature herself, is an Orisa</em> — Energy or Consciousness.
          OrisaLang maps and reveals these Energies as the Bases of all fields of knowledge in IfaLogic.
        </p>
      </div>

      <div className="ol-subnav">
        <button
          className={'ol-subnav__btn' + (view === 'codex' ? ' ol-subnav__btn--active' : '')}
          onClick={() => setView('codex')}
        >◉ OrisaCodex</button>
        <button
          className={'ol-subnav__btn' + (view === 'langs' ? ' ol-subnav__btn--active' : '')}
          onClick={() => setView('langs')}
        >⊛ OrisaLang</button>
      </div>

      {view === 'codex' && <OrisaCodex orisa={data.orisa} />}

      {view === 'langs' && (
        <div className="ol-overview">
          <div className="ol-search-row">
            <input
              className="ol-search" type="search"
              placeholder="Search Orisa, domains, technologies…"
              value={search} onChange={e => setSearch(e.target.value)}
            />
            <span className="ol-count">{filtered.length} / {data.orisa.length}</span>
          </div>
          {filtered.length === 0
            ? <div className="ol-empty">No Orisa Language matches your search.</div>
            : <div className="ol-grid">
                {filtered.map(item => <OrisaCard key={item.id} item={item} />)}
              </div>
          }
        </div>
      )}
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// PT CONTROLS
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
// PERIODIC TABLE HELPERS
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

// ════════════════════════════════════════════════════════════
// PERIODIC TABLE
// ════════════════════════════════════════════════════════════
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

      {/* Mobile scroll hint */}
      <div className="table-scroll-hint">
        <span>←</span><span>Swipe to explore all 256 Ifatoms</span><span>→</span>
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
// IFA NETWORKS  –  kominifa.com + ejiodi.com deep-link integration
// ════════════════════════════════════════════════════════════

const KOMI_BASE   = 'https://www.kominifa.com';
const EJIODI_BASE = 'https://www.ejiodi.com';

const EJIODI_SLUG = {
   1: 'ogbe',      2: 'oyeku',     3: 'iwori',    4: 'iwori2',
   5: 'irosun',    6: 'owonrin',   7: 'obara',    8: 'okanran',
   9: 'ogunda',   10: 'osa',      11: 'ika',      12: 'oturupon',
  13: 'otura',    14: 'irete',    15: 'ose',      16: 'ofun'
};
const KOMI_MEJI_SLUG = {
  1: 'ejiogbe',  2: 'oyeku',    3: 'iwori',    4: 'odi',
  5: 'irosun',   6: 'owonrin',  7: 'obara',    8: 'okanran',
  9: 'ogunda',  10: 'osa',     11: 'ika',      12: 'oturupon',
 13: 'otura',   14: 'irete',   15: 'ose',      16: 'orangun'
};
const KOMI_PART_SLUG = {
  1: 'ogbe',    2: 'oyeku',    3: 'iwori',    4: 'odi',
  5: 'irosun',  6: 'owonrin',  7: 'obara',    8: 'okanran',
  9: 'ogunda', 10: 'osa',     11: 'ika',      12: 'oturupon',
 13: 'otura',  14: 'irete',   15: 'ose',      16: 'ofun'
};
const KOMI_ORISA = {
  1:  [{ name: 'Ifa Practice',  path: '/blog/ifa-practice' }],
  2:  [{ name: 'Egbe',          path: '/blog/egbe' }],
  3:  [{ name: 'Ori',           path: '/blog/ori' }],
  5:  [{ name: 'Osun',          path: '/blog/osun' }],
  6:  [{ name: 'Sango',         path: '/blog/sango' }],
  7:  [{ name: 'Sango',         path: '/blog/sango' }],
  8:  [{ name: 'Sango',         path: '/blog/sango' }, { name: 'Ogun', path: '/blog/ogun' }],
  9:  [{ name: 'Ogun',          path: '/blog/ogun' }],
  10: [{ name: 'Sango',         path: '/blog/sango' }],
  11: [{ name: 'Egbe',          path: '/blog/egbe' }],
  13: [{ name: 'Ifa Practice',  path: '/blog/ifa-practice' }],
  14: [{ name: 'Ifa Practice',  path: '/blog/ifa-practice' }],
  15: [{ name: 'Osun',          path: '/blog/osun' }, { name: 'Aje', path: '/blog/aje' }],
  16: [{ name: 'Obatala',       path: '/blog/obatala' }],
};

function kominifaOduUrl(row, col) {
  if (row.id === col.id) {
    return KOMI_BASE + '/' + (KOMI_MEJI_SLUG[row.id] || row.name.toLowerCase());
  }
  const rs = KOMI_PART_SLUG[row.id] || row.name.toLowerCase();
  const cs = KOMI_PART_SLUG[col.id] || col.name.toLowerCase();
  return KOMI_BASE + '/' + rs + '-' + cs;
}

function IfaNetwork({ row, col, color }) {
  const isMeji  = row.id === col.id;
  const oduUrl  = kominifaOduUrl(row, col);
  const oduName = isMeji ? row.meji : row.name + '\u2013' + col.name;
  const ejiSlug = EJIODI_SLUG[row.id] || row.name.toLowerCase();
  const ejiUrl  = EJIODI_BASE + '/odu-ifa/apola-' + ejiSlug + '/';

  const orisa = useMemo(() => {
    const seen = new Set();
    const result = [];
    const ids = isMeji ? [row.id] : [row.id, col.id];
    ids.forEach(id => {
      (KOMI_ORISA[id] || []).forEach(o => {
        if (!seen.has(o.path)) { seen.add(o.path); result.push(o); }
      });
    });
    return result;
  }, [row.id, col.id, isMeji]);

  return (
    <div className="modal__section ifa-network">
      <div className="modal__section-label">Ifa Networks</div>
      <div className="ifa-net__grid">

        <a className="ifa-net__card ifa-net__card--odu" href={oduUrl} target="_blank" rel="noopener noreferrer">
          <span className="ifa-net__badge ifa-net__badge--ifa">Ifa Knowledge</span>
          <span className="ifa-net__name" style={{ color }}>{oduName}</span>
          <span className="ifa-net__sub">kominifa.com · 256 Odu Ifa</span>
        </a>

        <a className="ifa-net__card ifa-net__card--ejiodi" href={ejiUrl} target="_blank" rel="noopener noreferrer">
          <span className="ifa-net__badge ifa-net__badge--trad">Traditional Knowledge</span>
          <span className="ifa-net__name" style={{ color }}>{isMeji ? row.meji : row.name}</span>
          <span className="ifa-net__sub">Èjìòdí · Home of Tradition</span>
        </a>

        {orisa.map(o => (
          <a key={o.path} className="ifa-net__card ifa-net__card--orisa"
            href={KOMI_BASE + o.path} target="_blank" rel="noopener noreferrer">
            <span className="ifa-net__badge ifa-net__badge--orisa">Orisa Knowledge</span>
            <span className="ifa-net__name">{o.name}</span>
            <span className="ifa-net__sub">kominifa.com</span>
          </a>
        ))}

      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// WIKIPEDIA KNOWLEDGE INTEGRATION
// ════════════════════════════════════════════════════════════

const wikiCache = new Map();

function wikiSearchFallback(term, encoded) {
  return fetch(
    'https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=' + encoded + '&srlimit=1&format=json&origin=*'
  ).then(sRes => {
    if (!sRes.ok) { wikiCache.set(term, null); return null; }
    return sRes.json().then(sData => {
      const topTitle = sData.query?.search?.[0]?.title;
      if (!topTitle) { wikiCache.set(term, null); return null; }
      return fetch('https://en.wikipedia.org/api/rest_v1/page/summary/' + encodeURIComponent(topTitle), {
        headers: { Accept: 'application/json' }
      }).then(r2 => {
        if (!r2.ok) { wikiCache.set(term, null); return null; }
        return r2.json().then(d2 => {
          const result = d2.type !== 'disambiguation' ? d2 : null;
          wikiCache.set(term, result);
          return result;
        });
      });
    });
  }).catch(() => { wikiCache.set(term, null); return null; });
}

function fetchWikiSummary(term) {
  if (wikiCache.has(term)) return Promise.resolve(wikiCache.get(term));
  const encoded = encodeURIComponent(term);
  return fetch('https://en.wikipedia.org/api/rest_v1/page/summary/' + encoded, {
    headers: { Accept: 'application/json' }
  }).then(res => {
    if (!res.ok) return wikiSearchFallback(term, encoded);
    return res.json().then(data => {
      if (data.type === 'disambiguation') return wikiSearchFallback(term, encoded);
      wikiCache.set(term, data);
      return data;
    });
  }).catch(() => { wikiCache.set(term, null); return null; });
}

function WikiKnowledge({ domains, steamsex, color }) {
  const termKey = useMemo(() => {
    const combined = [...(domains || []).slice(0, 3), ...(steamsex || []).slice(0, 3)];
    return [...new Set(combined)].slice(0, 5).join(',');
  }, [(domains || []).slice(0,3).join(','), (steamsex || []).slice(0,3).join(',')]);

  const terms = termKey ? termKey.split(',') : [];
  const [articles, setArticles] = useState([]);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    if (!termKey) { setLoading(false); return; }
    let cancelled = false;
    setLoading(true);
    setArticles([]);
    Promise.all(terms.map(fetchWikiSummary)).then(results => {
      if (cancelled) return;
      setArticles(results.filter(Boolean));
      setLoading(false);
    });
    return () => { cancelled = true; };
  }, [termKey]);

  if (!termKey) return null;

  return (
    <div className="modal__section wiki-knowledge">
      <div className="modal__section-label">Knowledge Links · Wikipedia</div>
      {loading ? (
        <div className="wiki-loading">
          <span className="wiki-dot" /><span className="wiki-dot" /><span className="wiki-dot" />
        </div>
      ) : articles.length === 0 ? (
        <p className="wiki-empty">No articles found for this Odu's domains.</p>
      ) : (
        <div className="wiki-grid">
          {articles.map(art => (
            <a key={art.title} className="wiki-card"
              href={art.content_urls?.desktop?.page}
              target="_blank" rel="noopener noreferrer">
              {art.thumbnail?.source && (
                <img className="wiki-card__thumb" src={art.thumbnail.source} alt="" loading="lazy" />
              )}
              <div className="wiki-card__body">
                <div className="wiki-card__title" style={{ color }}>{art.title}</div>
                <div className="wiki-card__extract">
                  {(art.extract || '').slice(0, 160)}{(art.extract || '').length > 160 ? '…' : ''}
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// MODAL
// ════════════════════════════════════════════════════════════
function ModalDot({ bit }) {
  return (
    <div className="modal__mark-row">
      {bit === 0
        ? <><div className="modal__bar" /><div className="modal__bar" /></>
        : <div className="modal__bar" />
      }
    </div>
  );
}

// IFABitDisplay — shows 4-bit marks for two Odu side by side.
// RTL rule: principal/row Odu → LEFT column (LTR name lists principal first = LEFT);
//           period/col Odu → RIGHT column (RTL reading starts from RIGHT = period).
function IFABitDisplay({ rowCode, colCode, rowLabel, colLabel, color }) {
  const leftBits  = rowCode.split('').map(Number);
  const rightBits = colCode.split('').map(Number);
  const decimal   = parseInt(rowCode + colCode, 2);

  function Mark({ bit }) {
    return (
      <div className="ifabit__mark">
        {bit === 0
          ? <>
              <div className="ifabit__bar" style={{ background: color }} />
              <div className="ifabit__bar" style={{ background: color }} />
            </>
          : <div className="ifabit__bar" style={{ background: color }} />
        }
      </div>
    );
  }

  return (
    <div className="ifabit">
      <div className="ifabit__cols">
        <div className="ifabit__col">
          <div className="ifabit__col-label" style={{ color }}>{colLabel}</div>
          {rightBits.map((b, i) => <Mark key={i} bit={b} />)}
        </div>
        <div className="ifabit__col">
          <div className="ifabit__col-label" style={{ color }}>{rowLabel}</div>
          {leftBits.map((b, i) => <Mark key={i} bit={b} />)}
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// IFA PHILOSOPHY SECTION
// ════════════════════════════════════════════════════════════

const PHIL_BRANCHES = [
  { key: 'logic',        name: 'Ifa Logic',         sub: 'Reasoning · Principles' },
  { key: 'ethics',       name: 'Ifa Ethics',         sub: 'Ọmọlúwàbí · Balance · Fairness' },
  { key: 'ontology',     name: 'Ifa Ontology',       sub: 'Being & existence' },
  { key: 'epistemology', name: 'Ifa Epistemology',   sub: 'Knowledge · Wisdom' },
  { key: 'phenomenology',name: 'Ifa Phenomenology',  sub: 'Lived experience · Odu Ifa' },
  { key: 'paradox',      name: 'IfaParadox',         sub: 'Esu · Duality · Ternality' },
];

const PHIL_ENTITIES = [
  { name: 'Ọbàtálá',              role: 'Purity · Ethical Leadership · Light' },
  { name: 'Orunmila',             role: 'Father of Wisdom' },
  { name: 'Esu',                  role: 'Paradox · Duality · Ternality' },
  { name: 'Lúwa (Òrìṣà Lúwàbí)', role: 'Wisdom · Morality · Ethics' },
  { name: 'Egbe',                 role: 'Collective Consciousness' },
  { name: 'Olodumare',            role: 'Supreme Creative Force' },
];

const OMOLUABI_VALUES = ['Honesty', 'Respect', 'Responsibility', 'Fairness', 'Sustainability', 'Harmony'];

function IfaPhilosophySection({ color }) {
  return (
    <div className="modal__section ifa-phil">
      <div className="modal__section-label">Ifa Philosophy · PhiloE</div>
      <p className="ifa-phil__tagline">
        <strong>Orisa Philosophy:</strong> every element of nature is an Orisa — Energy or Consciousness.
        The 16 Major Odu Ifa are the Laws of Nature underlying all philosophical systems.
      </p>
      <div className="ifa-phil__branches">
        {PHIL_BRANCHES.map(b => (
          <div key={b.key} className="ifa-phil__branch">
            <span className="ifa-phil__branch-name" style={{ color }}>{b.name}</span>
            <span className="ifa-phil__branch-sub">{b.sub}</span>
          </div>
        ))}
      </div>
      <div className="ifa-phil__sub-label">Key Figures</div>
      <div className="ifa-phil__entities">
        {PHIL_ENTITIES.map(e => (
          <div key={e.name} className="ifa-phil__entity">
            <span className="ifa-phil__entity-name">{e.name}</span>
            <span className="ifa-phil__entity-role">{e.role}</span>
          </div>
        ))}
      </div>
      <div className="ifa-phil__omoluabi">
        <span className="ifa-phil__omoluabi-label">Ọmọlúwàbí Values</span>
        <div className="ifa-phil__omoluabi-vals">
          {OMOLUABI_VALUES.map(v => (
            <span key={v} className="ifa-phil__omoluabi-val">{v}</span>
          ))}
        </div>
      </div>
      <div className="ifa-phil__links">
        <a className="ifa-phil__link" href="https://toe.cenproject.org/ifa-philosophy/" target="_blank" rel="noopener noreferrer">Ifa Philosophy ↗</a>
        <a className="ifa-phil__link" href="https://toe.cenproject.org/ifa-ethics/" target="_blank" rel="noopener noreferrer">Ifa Ethics ↗</a>
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
        <div className="modal__section-label">IFABit Encoding · Àpólà Code</div>
        <IFABitDisplay rowCode={odu.code} colCode={odu.code} rowLabel={odu.name} colLabel={odu.name} color={color} />
      </div>

      <div className="modal__section">
        <div className="info-card">
          <div className="info-card__label">Elemental Correspondence</div>
          <div className="info-card__value" style={{ color }}>{odu.element}</div>
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

      <IfaNetwork row={odu} col={odu} color={color} />
      <WikiKnowledge domains={odu.domains} steamsex={odu.steamsex} color={color} />
      <IfaPhilosophySection color={color} />
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
        <div className="modal__section-label">IFABit Encoding · Àmúlù Composition</div>
        <IFABitDisplay rowCode={row.code} colCode={col.code} rowLabel={row.name} colLabel={col.name} color={rowCat.color} />
      </div>

      <div className="modal__section">
        <div className="modal__section-label">STEAMSEX Disciplines</div>
        <div className="steamsex-tags">
          {uniqueSteamsex.map(s => <span key={s} className="steamsex-tag">{s}</span>)}
        </div>
      </div>

      <IfaNetwork row={row} col={col} color={rowCat.color} />
      <WikiKnowledge domains={uniqueDomains} steamsex={uniqueSteamsex} color={rowCat.color} />
      <IfaPhilosophySection color={rowCat.color} />
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
                {colBits.map((b, i) => <ModalDot key={i} bit={b} />)}
              </div>
              <div className="modal__mark-col">
                {rowBits.map((b, i) => <ModalDot key={i} bit={b} />)}
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
// APP FOOTER
// ════════════════════════════════════════════════════════════
function AppFooter() {
  return (
    <footer className="app-footer">
      <div className="app-footer__inner">
        <div className="app-footer__brand">
          <span className="app-footer__logo">IfaLang</span>
          <span className="app-footer__part">Part of the IFA Internet · <a href="https://toe.cenproject.org/" target="_blank" rel="noopener noreferrer">toe.cenproject.org</a></span>
        </div>
        <div className="app-footer__links">
          <a href="https://toe.cenproject.org/ifa-language/" target="_blank" rel="noopener noreferrer">IFA Language</a>
          <a href="../ifa-periodic-table/">Ifa Periodic Table</a>
          <a href="../ifai/">IfAI</a>
          <a href="../ifa-game/">IFA Game</a>
          <a href="../ifa-script-the-script-of-everything-scriptoe/">IfaScript</a>
          <a href="../ifagraphy-toegraphy/">Ifagraphy</a>
          <a href="https://toe.cenproject.org/ifa-linguistics-ifalin-the-linguistics-of-everything-linoe/" target="_blank" rel="noopener noreferrer">Ifa Linguistics</a>
          <a href="https://toe.cenproject.org/ifa-programming-language-ifa-pl/" target="_blank" rel="noopener noreferrer">IfaPL</a>
          <a href="https://toe.cenproject.org/ifa-networking-toe-networking/" target="_blank" rel="noopener noreferrer">Ifa Networking</a>
          <a href="https://toe.cenproject.org/ifa-mathematics-toe-mathematics/" target="_blank" rel="noopener noreferrer">IFA Mathematics</a>
        </div>
        <div className="app-footer__copy">CENProject · The IFA Internet (iTOE) · IFABOK · 256 Odu Ifa</div>
      </div>
    </footer>
  );
}

// ════════════════════════════════════════════════════════════
// APP ROOT
// ════════════════════════════════════════════════════════════
function App() {
  const [section,  setSection]  = useState('ifalang');
  const [langData, setLangData] = useState(null);
  const [oduData,  setOduData]  = useState(null);
  const [activeId, setActiveId] = useState(null);

  const [orisaData, setOrisaData] = useState(null);

  const [ptCat,    setPtCat]    = useState('all');
  const [ptSearch, setPtSearch] = useState('');
  const [ptView,   setPtView]   = useState('table');
  const [ptSel,    setPtSel]    = useState(null);

  useEffect(() => {
    fetch('./data/lang.json').then(r => r.json()).then(setLangData)
      .catch(err => console.error('Failed to load lang.json:', err));
  }, []);

  useEffect(() => {
    if (section === 'orisa' && !orisaData) {
      fetch('./data/orisa.json').then(r => r.json()).then(setOrisaData)
        .catch(err => console.error('Failed to load orisa.json:', err));
    }
  }, [section, orisaData]);

  useEffect(() => {
    if (section === 'pt' && !oduData) {
      fetch('../ifa-periodic-table/data/odu.json').then(r => r.json()).then(setOduData)
        .catch(err => console.error('Failed to load odu.json:', err));
    }
  }, [section, oduData]);

  const lawMap = useMemo(() => {
    if (!langData) return {};
    const m = {};
    langData.lawPairs.forEach(p => {
      m[p.primary.id] = { ...p.primary, dualId: p.dual.id };
      m[p.dual.id]    = { ...p.dual,    dualId: p.primary.id };
    });
    return m;
  }, [langData]);

  const ptNavigate = useCallback(id => {
    if (!oduData) return;
    const o = oduData.odu.find(x => x.id === id);
    if (o) setPtSel({ row: o, col: o, num: o.id });
  }, [oduData]);

  if (!langData) return (
    <div>
      <div style={{ height:'var(--header-h)', background:'rgba(13,17,23,0.94)', borderBottom:'1px solid var(--border)', display:'flex', alignItems:'center', padding:'0 28px' }}>
        <span style={{ fontSize:'1.4rem', fontWeight:900, background:'linear-gradient(135deg,#f5c518,#f0a500)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>IfaLang</span>
      </div>
      <div className="app-loading">
        <span className="app-loading__dot" /><span className="app-loading__dot" /><span className="app-loading__dot" />
      </div>
    </div>
  );

  const activeLaw = activeId ? lawMap[activeId] : null;
  const dualLaw   = activeLaw ? lawMap[activeLaw.dualId] : null;

  return (
    <div>
      <Header
        section={section}
        onSection={id => { setSection(id); setActiveId(null); }}
        laws={langData.lawPairs}
        activeId={activeId}
        onSelect={setActiveId}
        ifaplUrl={langData.meta.ifapl_url}
      />

      {section === 'ifalang' && (
        !activeId
          ? <Overview lawPairs={langData.lawPairs} meta={langData.meta} onSelect={setActiveId} />
          : <LawDetail key={activeId} law={activeLaw} dualLaw={dualLaw} onSelectDual={setActiveId} />
      )}

      {section === 'orisa' && (
        !orisaData
          ? <div className="app-loading">
              <span className="app-loading__dot" /><span className="app-loading__dot" /><span className="app-loading__dot" />
            </div>
          : <OrisaOverview data={orisaData} />
      )}

      {(section === 'ifalang' || section === 'orisa') && <AppFooter />}

      {section === 'pt' && (
        !oduData
          ? <div className="app-loading">
              <span className="app-loading__dot" /><span className="app-loading__dot" /><span className="app-loading__dot" />
            </div>
          : <>
              <IfaHeroStrip />
              <IfabokBanner />
              <IfaPTIntro />
              <IfaPTGallery />
              <Controls
                categories={oduData.categories}
                activeCategory={ptCat} onCategory={setPtCat}
                searchTerm={ptSearch} onSearch={setPtSearch}
                view={ptView} onView={setPtView}
              />
              <main className="main">
                {ptView === 'table'
                  ? <PeriodicTable odu={oduData.odu} categories={oduData.categories}
                      activeCategory={ptCat} searchTerm={ptSearch} onCellClick={setPtSel} />
                  : <ListView odu={oduData.odu} categories={oduData.categories}
                      activeCategory={ptCat} searchTerm={ptSearch} onSelect={setPtSel} />
                }
              </main>
              <section className="dual-laws">
                <div className="dual-laws__inner">
                  <span className="dual-laws__label">8 Dual Laws</span>
                  <div className="dual-laws__chips">
                    {Object.values(oduData.categories).map((cat, i) => {
                      const duals = ['Asymmetry','Variance','Unity','Reduction','Decomposition','Atomism','Synthesis','Dynamism'];
                      return <span key={i} className="dual-chip" style={{ color: cat.color, borderColor: cat.color }}>{duals[i]}</span>;
                    })}
                  </div>
                </div>
              </section>
              <IfatomIntro />
              <section className="ptoe-diagrams">
                <div className="ptoe-diagrams__inner">
                  <img className="ptoe-diagrams__img"
                    src="../ifa-periodic-table/images/ifa-ptoe-generalized.png"
                    alt="The Ifa Periodic Table: The Periodic Table of Everything (PToE) — generalized table" />
                  <img className="ptoe-diagrams__img"
                    src="../ifa-periodic-table/images/ifa-ptoe-knowledge-elements.png"
                    alt="The Ifa Periodic Table: The Periodic Table of Knowledge Elements" />
                </div>
              </section>
              <section className="mendeleev-ref">
                <div className="mendeleev-ref__inner">
                  <figure className="mendeleev-ref__figure">
                    <img className="mendeleev-ref__img"
                      src="../ifa-periodic-table/images/acs-periodic-table.png"
                      alt="ACS Periodic Table of Elements — The Modern Form of Mendeleev's Periodic Table" />
                    <figcaption className="mendeleev-ref__caption">The Modern Form of Mendeleev's Periodic Table.</figcaption>
                  </figure>
                </div>
              </section>
              <section className="standard-model-ref">
                <div className="standard-model-ref__inner">
                  <figure className="standard-model-ref__figure">
                    <img className="standard-model-ref__img"
                      src="../ifa-periodic-table/images/standard-model-particle-physics.png"
                      alt="The Standard Model of Particle Physics — The Periodic Table of Elementary Particles" />
                    <figcaption className="standard-model-ref__caption">The Standard Model of Particle Physics — The Periodic Table of Elementary Particles.</figcaption>
                  </figure>
                </div>
              </section>
              <section className="tenfold-ref">
                <div className="tenfold-ref__inner">
                  <figure className="tenfold-ref__figure">
                    <img className="tenfold-ref__img"
                      src="../ifa-periodic-table/images/tenfold-topological-table.png"
                      alt="Periodic table of topological insulators and superconductors" />
                    <figcaption className="tenfold-ref__caption">The periodic table of topological insulators and topological superconductors, also known as the tenfold classification.</figcaption>
                  </figure>
                </div>
              </section>
              <footer className="footer">
                <p><strong>Ifa Periodic Table (IfaPT)</strong> — The Periodic Table of Everything (PToE) · © CENProject</p>
                <p className="footer__sub">256 Ifatoms (Odu Ifa) · 16 IfaGroups (Àpólà Odù) · 16 IfaPeriods · STEAMSEX Matrix Framework</p>
                <a className="footer__launch" href="https://toe.cenproject.org/ifa-periodic-table/" target="_blank" rel="noopener noreferrer">
                  <span className="footer__launch-glyph">O</span>
                  <span className="footer__launch-text">
                    <span className="footer__launch-label">Ifa Periodic Table Platform</span>
                    <span className="footer__launch-url">toe.cenproject.org/ifa-periodic-table</span>
                  </span>
                  <span className="footer__launch-arrow">↗</span>
                </a>
              </footer>
              <OduModal selection={ptSel} odu={oduData.odu} categories={oduData.categories}
                onClose={() => setPtSel(null)} onNavigate={ptNavigate} />
            </>
      )}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
