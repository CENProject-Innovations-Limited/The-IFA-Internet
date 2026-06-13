/* ─────────────────────────────────────────────────────────────────────────────
   IFA Matrix Playground — Ifalibrium Chart + Amulu Table
   The IFA Internet · CENProject
   ifainternet.org/ifa-matrix/playground/
───────────────────────────────────────────────────────────────────────────── */

const { useState } = React;

// ─── DATA ─────────────────────────────────────────────────────────────────────

const ODU_16 = [
  { n:'01', name:'Ogbé',      color:'#f0920c', code:'1111' },
  { n:'02', name:'Òyèkú',    color:'#6366f1', code:'0000' },
  { n:'03', name:'Ìwòrì',    color:'#14b8d4', code:'0110' },
  { n:'04', name:'Òdí',      color:'#00c87c', code:'1001' },
  { n:'05', name:'Ìrosùn',   color:'#ef4444', code:'1100' },
  { n:'06', name:'Òwónrín',  color:'#8b5cf6', code:'0011' },
  { n:'07', name:'Òbàrà',    color:'#3b9eff', code:'1000' },
  { n:'08', name:'Òkànràn',  color:'#ec4899', code:'0001' },
  { n:'09', name:'Ògúndá',   color:'#f0920c', code:'1110' },
  { n:'10', name:'Òsá',      color:'#6366f1', code:'0111' },
  { n:'11', name:'Ìká',      color:'#14b8d4', code:'0100' },
  { n:'12', name:'Òtúrúpòn', color:'#00c87c', code:'0010' },
  { n:'13', name:'Òtúrá',    color:'#ef4444', code:'1011' },
  { n:'14', name:'Ìrètè',    color:'#8b5cf6', code:'1101' },
  { n:'15', name:'Òsè',      color:'#3b9eff', code:'1010' },
  { n:'16', name:'Òfún',     color:'#ec4899', code:'0101' },
];

const INVERSE_PAIRS = [
  { a:{n:'01'}, b:{n:'02'} },
  { a:{n:'03'}, b:{n:'04'} },
  { a:{n:'05'}, b:{n:'06'} },
  { a:{n:'07'}, b:{n:'08'} },
  { a:{n:'09'}, b:{n:'10'} },
  { a:{n:'11'}, b:{n:'12'} },
  { a:{n:'13'}, b:{n:'14'} },
  { a:{n:'15'}, b:{n:'16'} },
];

const INVERSE_SET = new Set(
  INVERSE_PAIRS.flatMap(p => [`${p.a.n}-${p.b.n}`, `${p.b.n}-${p.a.n}`])
);

// ─── APP ──────────────────────────────────────────────────────────────────────

function PlaygroundApp() {
  const [activeChart, setActiveChart] = useState('ifalibrium');
  const [filter, setFilter]           = useState('all');
  const [tip, setTip]                 = useState({ visible: false, text: '', x: 0, y: 0 });
  const [selectedEjio, setSelectedEjio] = useState(null);

  function switchChart(chart) {
    setActiveChart(chart);
    setFilter('all');
    setSelectedEjio(null);
  }

  // Hash routing — #ejio opens IfaSquare chart
  React.useEffect(() => {
    if (window.location.hash === '#ejio') {
      setActiveChart('ejio');
      window.history.replaceState(null, '', window.location.pathname);
    }
  }, []);

  // ─── Glyph helpers ────────────────────────────────────────────────
  function primaryGlyph(code) {
    if (code === '1111') return 'O';
    if (code === '0000') return '|';
    return code.split('').reverse().map(b => b === '1' ? 'O' : 'I').join('');
  }
  function renderGlyphChars(g) {
    if (g.length === 1) return g;
    return g.split('').map((ch, i) => {
      const isLast = i === g.length - 1;
      const next   = g[i + 1];
      const mr     = isLast ? '0' : (ch === 'I' && next === 'I') ? '-0.08em' : '-0.22em';
      return <span key={i} style={{ marginRight: mr }}>{ch}</span>;
    });
  }

  // ─── Odu arm marks (SVG rects for one arm of an IfaSquare) ────────
  // code: 4-bit string · xOff: x-start · colW: arm width · totalH: arm height · yOff: y-start
  // Convention matches OduMarks (DOUBLES_16 encoding):
  //   bit='1' (ODU_16 Ogbe element) → single rect (one unified bar)
  //   bit='0' (ODU_16 Oyeku element) → double rect (two bars)
  //   Code read LTR = top to bottom (no reversal)
  function armMarks(code, color, xOff, colW, totalH, yOff = 0) {
    const bits = code.split(''); // LTR = top to bottom
    const rowH = totalH / 4;
    const barH = rowH * 0.55;
    const barW = colW * 0.17;
    const gap  = colW * 0.13;
    const cx   = xOff + colW / 2;
    return bits.map((bit, i) => {
      const y = yOff + rowH * i + (rowH - barH) / 2;
      return bit === '1'
        ? <rect key={i} x={cx - barW / 2} y={y} width={barW} height={barH} rx={barW / 2} fill={color} />
        : <React.Fragment key={i}>
            <rect x={cx - gap / 2 - barW} y={y} width={barW} height={barH} rx={barW / 2} fill={color} />
            <rect x={cx + gap / 2}        y={y} width={barW} height={barH} rx={barW / 2} fill={color} />
          </React.Fragment>;
    });
  }

  // ─── Tooltip ──────────────────────────────────────────────────────
  const showTip = (text, e) => setTip({ visible: true, text, x: e.clientX + 14, y: e.clientY + 14 });
  const moveTip = (e)       => setTip(t => ({ ...t, x: e.clientX + 14, y: e.clientY + 14 }));
  const hideTip = ()        => setTip(t => ({ ...t, visible: false }));

  const reversedOdu = [...ODU_16].reverse();

  // ══════════════════════════════════════════════════════════════════
  //  IFALIBRIUM CHART helpers
  // ══════════════════════════════════════════════════════════════════

  function secondaryAt(ci, rowPos) {
    if (rowPos === 0) return ODU_16[ci];
    let k = 0;
    for (let i = 0; i < 16; i++) {
      if (i === ci) continue;
      if (k === rowPos - 1) return ODU_16[i];
      k++;
    }
  }
  function cellNum(ci, rowPos) {
    return rowPos === 0 ? ci + 1 : 16 + ci * 15 + rowPos;
  }
  function cellState(ci, rowPos) {
    if (rowPos === 0) return 'self';
    const p = ODU_16[ci];
    const s = secondaryAt(ci, rowPos);
    if (INVERSE_SET.has(`${p.n}-${s.n}`)) return 'major';
    if (Math.abs(parseInt(p.n) - parseInt(s.n)) === 1) return 'ifalibrium';
    return 'minor';
  }
  function ifalIsFaded(state) {
    if (filter === 'all') return false;
    return state !== filter;
  }
  function renderIfalCell(ci, rowPos) {
    const principal = ODU_16[ci];
    const secondary = secondaryAt(ci, rowPos);
    const num       = cellNum(ci, rowPos);
    const state     = cellState(ci, rowPos);
    const isMeji    = rowPos === 0;
    const priG      = primaryGlyph(principal.code);
    const secG      = primaryGlyph(secondary.code);
    const shortName = isMeji
      ? principal.name
      : `${principal.name.slice(0,3)}-${secondary.name.slice(0,3)}`;
    const tipLabel  = isMeji
      ? `${principal.name} Méjì · ${num} · Self-Ifalibrium`
      : state === 'major'
        ? `${principal.name} ⇔ ${secondary.name} · ${num} · Major Dual-Ifalibrium`
        : state === 'ifalibrium'
          ? `${principal.name}-${secondary.name} · ${num} · Ifalibrium Dual`
          : `${principal.name}-${secondary.name} · ${num} · Minor Dual-Ifalibrium`;
    const faded     = ifalIsFaded(state);
    const cellColor = state === 'major'      ? '#e040fb'
                    : state === 'ifalibrium' ? '#4caf50'
                    : principal.color;

    return (
      <div
        key={`pg-${ci}-${rowPos}`}
        className={`pg-cell pg-cell--${state}${faded ? ' pg-cell--faded' : ''}`}
        onMouseEnter={e => showTip(tipLabel, e)}
        onMouseLeave={hideTip}
        onMouseMove={moveTip}
      >
        <span className="pg-cell__num" style={{ color: cellColor }}>{num}</span>
        <div className="pg-cell__glyph" style={{ color: cellColor }}>
          <span className="pg-cell__glyph-sec">{renderGlyphChars(secG)}</span>
          <span className="pg-cell__glyph-pri">{renderGlyphChars(priG)}</span>
        </div>
        <span className="pg-cell__name" style={{ color: cellColor }}>{shortName}</span>
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════════
  //  AMULU TABLE helpers
  //  Rows TTB: Ogbe (top) → Ofun (bottom)  — primary Odu (vertical axis)
  //  Cols RTL: Ofun (left) → Ogbe (right)  — secondary Odu (horizontal axis)
  //  Cell(row i, col j) = Odu[i] × Odu[j]  composition
  //
  //  Categories:
  //    basis-meji  Ogbe-Meji & Oyeku-Meji (diagonal rows 0–1) — Ifa Basis Pair Méjì
  //    basis-pair  Ogbe-Oyeku & Oyeku-Ogbe (off-diagonal)     — Ifa Basis Pair
  //    major       Ìwòrì-Meji → Òfún-Meji (diagonal rows 2–15) — Major Amulu
  //    minor       all 238 remaining off-diagonal              — Minor Amulu
  // ══════════════════════════════════════════════════════════════════

  function amulCategory(rowIdx, colIdx) {
    const isMeji = rowIdx === colIdx;
    if (isMeji) return rowIdx <= 1 ? 'basis-meji' : 'major';
    if ((rowIdx === 0 && colIdx === 1) || (rowIdx === 1 && colIdx === 0)) return 'basis-pair';
    return 'minor';
  }
  function amulIsFaded(cat) {
    if (filter === 'all')   return false;
    if (filter === 'basis') return cat !== 'basis-meji' && cat !== 'basis-pair';
    if (filter === 'major') return cat !== 'major';
    if (filter === 'minor') return cat !== 'minor';
    return false;
  }
  function renderAmulCell(rowOdu, colOdu) {
    const rowIdx    = parseInt(rowOdu.n, 10) - 1;
    const colIdx    = parseInt(colOdu.n, 10) - 1;
    const cellNum   = rowIdx * 16 + parseInt(colOdu.n, 10); // RTL numbering: Ogbe col = 1, Ofun col = 16
    const cat       = amulCategory(rowIdx, colIdx);
    const isMeji    = rowIdx === colIdx;
    const priG      = primaryGlyph(rowOdu.code);   // primary = row Odu (bottom, larger)
    const secG      = primaryGlyph(colOdu.code);   // secondary = col Odu (top, dimmer)
    const shortName = isMeji
      ? rowOdu.name
      : `${rowOdu.name.slice(0,3)}-${colOdu.name.slice(0,3)}`;
    const tipLabel  = isMeji
      ? `${rowOdu.name} Méjì · ${cat === 'basis-meji' ? 'Ifa Basis Pair Méjì' : 'Major Amulu'}`
      : cat === 'basis-pair'
        ? `${rowOdu.name}-${colOdu.name} · Ifa Basis Pair`
        : `${rowOdu.name}-${colOdu.name} · Minor Amulu`;
    const cellColor = cat === 'basis-meji' ? '#f0920c'
                    : cat === 'basis-pair'  ? '#fbbf24'
                    : cat === 'major'       ? '#4caf50'
                    : rowOdu.color;
    const faded = amulIsFaded(cat);

    return (
      <div
        key={`am-${rowIdx}-${colIdx}`}
        className={`pg-cell pg-cell--am-${cat}${faded ? ' pg-cell--faded' : ''}`}
        onMouseEnter={e => showTip(tipLabel, e)}
        onMouseLeave={hideTip}
        onMouseMove={moveTip}
      >
        <span className="pg-cell__num" style={{ color: cellColor }}>{cellNum}</span>
        <div className="pg-cell__glyph" style={{ color: cellColor }}>
          <span className="pg-cell__glyph-sec">{renderGlyphChars(secG)}</span>
          <span className="pg-cell__glyph-pri">{renderGlyphChars(priG)}</span>
        </div>
        <span className="pg-cell__name" style={{ color: cellColor }}>{shortName}</span>
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════════
  //  RENDER
  // ══════════════════════════════════════════════════════════════════

  const subtitle = activeChart === 'ifalibrium'
    ? "Ifalibrium — The Complete Form of Ifa's Periodic Table"
    : activeChart === 'amulu'
      ? 'Amulu Table (Atódùpọ́n Àmúlù) — The Ifa Composition Matrix'
      : 'IfaSquare · Èjìodù — Energy-Based Squaring · Create Your IfaCell';

  return (
    <div className="pg-root">

      {/* ── Top Bar ─────────────────────────────────────────────────── */}
      <header className="pg-topbar">
        <a href="../" className="pg-back">
          <span className="pg-back__arrow">←</span>
          <span className="pg-back__label">IFA Matrix</span>
        </a>

        <a href="../#ifa-square" className="pg-back" style={{ color: '#f5c518', borderColor: 'rgba(245,197,24,0.3)' }}>
          <span className="pg-back__arrow">□²</span>
          <span className="pg-back__label">Ifa Square</span>
        </a>

        {/* ── Chart switcher tabs ──────────────────────────────────── */}
        <div className="pg-chart-tabs">
          <button
            className={`pg-chart-tab${activeChart === 'ifalibrium' ? ' pg-chart-tab--active' : ''}`}
            onClick={() => switchChart('ifalibrium')}
          >Ifalibrium</button>
          <button
            className={`pg-chart-tab${activeChart === 'amulu' ? ' pg-chart-tab--active' : ''}`}
            onClick={() => switchChart('amulu')}
          >Amulu Table</button>
          <button
            className={`pg-chart-tab pg-chart-tab--ejio${activeChart === 'ejio' ? ' pg-chart-tab--active' : ''}`}
            onClick={() => switchChart('ejio')}
          >IfaSquare · Èjìodù</button>
        </div>

        <div className="pg-topbar__title">
          <span className="pg-topbar__name">IFA Matrix Playground</span>
          <span className="pg-topbar__sep">·</span>
          <span className="pg-topbar__sub">{subtitle}</span>
        </div>

        {/* ── Ifalibrium filters ───────────────────────────────────── */}
        {activeChart === 'ifalibrium' && (
          <div className="pg-filters">
            <button
              className={`pg-filter-btn${filter === 'all' ? ' pg-filter-btn--active' : ''}`}
              onClick={() => setFilter('all')}
            >All 256</button>
            <button
              className={`pg-filter-btn pg-filter-btn--amber${filter === 'self' ? ' pg-filter-btn--active pg-filter-btn--active-amber' : ''}`}
              onClick={() => setFilter('self')}
            >⊙ Self</button>
            <button
              className={`pg-filter-btn pg-filter-btn--magenta${filter === 'major' ? ' pg-filter-btn--active pg-filter-btn--active-magenta' : ''}`}
              onClick={() => setFilter('major')}
            >⇔ Major</button>
            <button
              className={`pg-filter-btn pg-filter-btn--green${filter === 'ifalibrium' ? ' pg-filter-btn--active pg-filter-btn--active-green' : ''}`}
              onClick={() => setFilter('ifalibrium')}
            >→ Ifalibrium</button>
            <button
              className={`pg-filter-btn pg-filter-btn--cyan${filter === 'minor' ? ' pg-filter-btn--active pg-filter-btn--active-cyan' : ''}`}
              onClick={() => setFilter('minor')}
            >∿ Minor</button>
          </div>
        )}

        {/* ── Amulu filters ────────────────────────────────────────── */}
        {activeChart === 'amulu' && (
          <div className="pg-filters">
            <button
              className={`pg-filter-btn${filter === 'all' ? ' pg-filter-btn--active' : ''}`}
              onClick={() => setFilter('all')}
            >All 256</button>
            <button
              className={`pg-filter-btn pg-filter-btn--amber${filter === 'basis' ? ' pg-filter-btn--active pg-filter-btn--active-amber' : ''}`}
              onClick={() => setFilter('basis')}
            >⊙ Ifa Basis</button>
            <button
              className={`pg-filter-btn pg-filter-btn--green${filter === 'major' ? ' pg-filter-btn--active pg-filter-btn--active-green' : ''}`}
              onClick={() => setFilter('major')}
            >◈ Major Amulu</button>
            <button
              className={`pg-filter-btn pg-filter-btn--cyan${filter === 'minor' ? ' pg-filter-btn--active pg-filter-btn--active-cyan' : ''}`}
              onClick={() => setFilter('minor')}
            >∿ Minor Amulu</button>
          </div>
        )}
      </header>

      {/* ══════════════════════════════════════════════════════════════
          IFALIBRIUM CHART
      ══════════════════════════════════════════════════════════════ */}
      {activeChart === 'ifalibrium' && (
        <main className="pg-main">
          {/* Column headers */}
          <div className="pg-col-headers">
            {reversedOdu.map(o => (
              <div key={o.n} className="pg-col-header" style={{ color: o.color }}>
                <span className="pg-col-header__num">{o.n}</span>
                <span className="pg-col-header__name">{o.name.slice(0, 5)}</span>
              </div>
            ))}
            <div className="pg-corner">IfaComp</div>
          </div>

          {/* Grid */}
          <div className="pg-grid">
            {Array.from({ length: 16 }, (_, rowPos) => {
              if (rowPos === 0) {
                return (
                  <React.Fragment key="row-0">
                    {reversedOdu.map(pOdu => {
                      const ci = parseInt(pOdu.n, 10) - 1;
                      return (ci === 0 || ci === 1)
                        ? renderIfalCell(ci, 0)
                        : <div key={`bp-ph-${ci}`} className="pg-ph" />;
                    })}
                    <div className="pg-row-header pg-row-header--basepair">Base Pair</div>
                    {reversedOdu.map(pOdu => {
                      const ci = parseInt(pOdu.n, 10) - 1;
                      return (ci === 0 || ci === 1)
                        ? <div key={`ic1-ph-${ci}`} className="pg-ph" />
                        : renderIfalCell(ci, 0);
                    })}
                    <div className="pg-row-header">IfaComp 1</div>
                  </React.Fragment>
                );
              }
              return (
                <React.Fragment key={`row-${rowPos}`}>
                  {reversedOdu.map(pOdu => {
                    const ci = parseInt(pOdu.n, 10) - 1;
                    return renderIfalCell(ci, rowPos);
                  })}
                  <div className="pg-row-header">IfaComp {rowPos + 1}</div>
                </React.Fragment>
              );
            })}
          </div>
        </main>
      )}

      {/* ══════════════════════════════════════════════════════════════
          AMULU TABLE  (Atódùpọ́n Àmúlù)
          Rows TTB: Ogbe (top) → Ofun (bottom)   = primary Odu
          Cols RTL: Ofun (left) → Ogbe (right)   = secondary Odu
      ══════════════════════════════════════════════════════════════ */}
      {activeChart === 'amulu' && (
        <main className="pg-main">

          {/* Column headers — RTL order, Ofun at left, Ogbe at right */}
          <div className="pg-col-headers pg-col-headers--amul">
            {reversedOdu.map(o => (
              <div
                key={o.n}
                className="pg-col-header"
                style={{ color: parseInt(o.n, 10) <= 2 ? '#f0920c' : o.color }}
              >
                <span className="pg-col-header__num">{o.n}</span>
                <span className="pg-col-header__name">{o.name.slice(0, 5)}</span>
              </div>
            ))}
            <div className="pg-corner pg-corner--amul">↓ / →</div>
          </div>

          {/* 16 × 16 grid — right column = row headers (TTB) */}
          <div className="pg-grid pg-grid--amul">
            {ODU_16.map((rowOdu, rowIdx) => (
              <React.Fragment key={`amul-row-${rowIdx}`}>
                {/* 16 cells — one per RTL column */}
                {reversedOdu.map(colOdu => renderAmulCell(rowOdu, colOdu))}
                {/* Row header on the right */}
                <div
                  className={`pg-row-header pg-row-header--amul${rowIdx < 2 ? ' pg-row-header--amul-basis' : ''}`}
                  style={{ color: rowIdx < 2 ? '#f0920c' : rowOdu.color }}
                >
                  <span className="pg-row-header__num">{rowOdu.n}</span>
                  <span className="pg-row-header__name">{rowOdu.name.slice(0, 5)}</span>
                </div>
              </React.Fragment>
            ))}
          </div>

        </main>
      )}

      {/* ══════════════════════════════════════════════════════════════
          IFASQUARE — ÈJÌODÙ TABLE
          16 × 16 grid · diagonal = Èjìodù IfaSquares · off-diag = dimmed
      ══════════════════════════════════════════════════════════════ */}
      {activeChart === 'ejio' && (
        <main className="pg-main pg-main--ejio">

          {/* Column headers — RTL, Ofun left → Ogbe right */}
          <div className="pg-col-headers pg-col-headers--amul">
            {reversedOdu.map(o => (
              <div key={o.n} className="pg-col-header" style={{ color: o.color }}>
                <span className="pg-col-header__num">{o.n}</span>
                <span className="pg-col-header__name">{o.name.slice(0, 5)}</span>
              </div>
            ))}
            <div className="pg-corner pg-corner--amul">Odu →</div>
          </div>

          {/* 16 × 16 Èjìodù grid */}
          <div className="pg-grid pg-grid--amul pg-grid--ejio">
            {ODU_16.map((rowOdu) => (
              <React.Fragment key={`ejio-row-${rowOdu.n}`}>
                {reversedOdu.map(colOdu => {
                  const isMeji = rowOdu.n === colOdu.n;
                  const isSel  = selectedEjio === rowOdu.n && isMeji;
                  if (!isMeji) {
                    return <div key={`ejio-${rowOdu.n}-${colOdu.n}`} className="pg-cell pg-cell--ejio-off" />;
                  }
                  return (
                    <div
                      key={`ejio-${rowOdu.n}-${colOdu.n}`}
                      className={`pg-cell pg-cell--ejio-meji${isSel ? ' pg-cell--ejio-sel' : ''}`}
                      style={{ '--oc': rowOdu.color }}
                      onClick={() => setSelectedEjio(isSel ? null : rowOdu.n)}
                      onMouseEnter={e => showTip(`${rowOdu.name} Méjì · Èjìodù — click to create IfaCell`, e)}
                      onMouseLeave={hideTip}
                      onMouseMove={moveTip}
                    >
                      <svg width="100%" viewBox="0 0 44 52"
                           preserveAspectRatio="xMidYMid meet"
                           style={{ flex: 1, maxHeight: '68%' }}>
                        {armMarks(rowOdu.code, rowOdu.color, 2, 18, 52)}
                        {armMarks(rowOdu.code, rowOdu.color, 24, 18, 52)}
                      </svg>
                      <span className="pg-cell__name ejio-cell__name" style={{ color: rowOdu.color }}>
                        {rowOdu.name}
                      </span>
                    </div>
                  );
                })}
                <div
                  className="pg-row-header pg-row-header--amul"
                  style={{ color: rowOdu.color }}
                >
                  <span className="pg-row-header__num">{rowOdu.n}</span>
                  <span className="pg-row-header__name">{rowOdu.name.slice(0, 5)}</span>
                </div>
              </React.Fragment>
            ))}
          </div>

          {/* ── IfaCell Creator ──────────────────────────────────────── */}
          {selectedEjio && (() => {
            const odu  = ODU_16.find(d => d.n === selectedEjio);
            const AW   = 58, AH = 116, PAD = 10, SEP = 14;
            const svgW = PAD + AW + SEP + AW + PAD;
            const svgH = AH + PAD * 2;
            return (
              <div className="ejio-creator" style={{ '--oc': odu.color }}>
                <button className="ejio-creator__close" onClick={() => setSelectedEjio(null)} title="Close">✕</button>
                <div className="ejio-creator__hd">
                  <span className="ejio-creator__badge">IfaCell · IfaSquare · Your Èjìodù</span>
                  <h3 className="ejio-creator__title" style={{ color: odu.color }}>
                    {odu.name} Méjì
                  </h3>
                  <div className="ejio-creator__yoruba">Èjìodù · Odù-Odù · Odù Méjì · Odu #{odu.n}</div>
                </div>
                <div className="ejio-creator__body">
                  <div className="ejio-creator__visual">
                    <svg width={svgW} height={svgH} viewBox={`0 0 ${svgW} ${svgH}`}
                         style={{ display: 'block' }}>
                      <rect x="0.75" y="0.75" width={svgW - 1.5} height={svgH - 1.5}
                            rx="6" fill="none"
                            stroke={odu.color} strokeWidth="1.4" strokeOpacity="0.45" />
                      {armMarks(odu.code, odu.color, PAD, AW, AH, PAD)}
                      {armMarks(odu.code, odu.color, PAD + AW + SEP, AW, AH, PAD)}
                    </svg>
                    <div className="ejio-creator__eq">
                      <span style={{ color: odu.color }}>{odu.name}</span>
                      <span className="ejio-creator__eq-op">⊙</span>
                      <span style={{ color: odu.color }}>{odu.name}</span>
                      <span className="ejio-creator__eq-op">=</span>
                      <strong style={{ color: odu.color }}>{odu.name} Méjì</strong>
                    </div>
                  </div>
                  <div className="ejio-creator__info">
                    {[
                      ['IFABit Code',    `${odu.code} · ${odu.code}`],
                      ['IfaDimension',   '2 arms · equal length & breadth'],
                      ['IfaSquare Type', `${odu.name} Méjì Square`],
                      ['Ifa Condition',  'One Odu replicates itself'],
                      ['Odu Number',     odu.n],
                    ].map(([label, val]) => (
                      <div key={label} className="ejio-creator__info-row">
                        <span className="ejio-creator__info-lbl">{label}</span>
                        <span className="ejio-creator__info-val"
                              style={label === 'Odu Number' || label === 'IFABit Code' ? { color: odu.color } : {}}>
                          {val}
                        </span>
                      </div>
                    ))}
                    <p className="ejio-creator__note">
                      Click any other highlighted diagonal cell to switch Odu,
                      or click the same cell again to close.
                    </p>
                  </div>
                </div>
              </div>
            );
          })()}

        </main>
      )}

      {/* Tooltip */}
      {tip.visible && (
        <div
          className="pg-tip"
          style={{
            left: Math.min(tip.x, window.innerWidth - 280) + 'px',
            top:  tip.y + 'px',
          }}
        >{tip.text}</div>
      )}

    </div>
  );
}

ReactDOM.render(<PlaygroundApp />, document.getElementById('root'));
