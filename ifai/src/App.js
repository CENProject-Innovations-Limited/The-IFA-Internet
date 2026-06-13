/* ─────────────────────────────────────────────────────────────
   Ifai · Ifa Artificial Intelligence
   React 18 + JSX via Babel Standalone
   Integrates: Oracle consultation + Ifa Periodic Table
   CENProject · toe.cenproject.org/ifai/
───────────────────────────────────────────────────────────── */

const {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
  Fragment
} = React;
const HISTORY_KEY = 'ifai-history';
const HISTORY_MAX = 8;

// ════════════════════════════════════════════════════════════
// ORACLE UTILITIES
// ════════════════════════════════════════════════════════════

function buildComposite(row, col) {
  if (row.id === col.id) return {
    ...row,
    _row: row,
    _col: col,
    _isMeji: true,
    _isComposite: false
  };
  const domains = [...new Set([...row.domains, ...col.domains])].slice(0, 7);
  const steamsex = [...new Set([...row.steamsex, ...col.steamsex])];
  const axioms = [...new Set([...row.axioms, ...col.axioms])];
  const rowClause = (row.meaning || '').split('.')[0].trim();
  const colClause = (col.meaning || '').split('.')[0].trim();
  const meaning = [`${rowClause}.`, `Tempered by ${col.name}'s ${(col.domains[0] || col.element || 'force').toLowerCase()} — ${colClause.toLowerCase()}.`, `This composite Odu invites reflection on how ${(row.domains[0] || 'power').toLowerCase()} and ` + `${(col.domains[0] || 'knowledge').toLowerCase()} inform each other.`].join(' ');
  return {
    id: (row.id - 1) * 16 + col.id,
    name: `${row.name}–${col.name}`,
    yoruba: `${row.yoruba}–${col.yoruba}`,
    meji: `${row.name} composed with ${col.name}`,
    code: row.code,
    category: row.category,
    element: row.element,
    planet: col.planet,
    domains,
    meaning,
    steamsex,
    axioms,
    dual: null,
    _row: row,
    _col: col,
    _isMeji: false,
    _isComposite: true
  };
}
function scoreOdu(odu, query) {
  if (!query.trim()) return 1;
  const words = query.toLowerCase().split(/\s+/).filter(w => w.length > 2);
  let score = 0;
  words.forEach(w => {
    if (odu.name.toLowerCase().includes(w)) score += 4;
    odu.domains?.forEach(d => {
      if (d.toLowerCase().includes(w)) score += 2;
    });
    if (odu.meaning?.toLowerCase().includes(w)) score += 1;
    odu.steamsex?.forEach(s => {
      if (s.toLowerCase().includes(w)) score += 1;
    });
    odu.axioms?.forEach(a => {
      if (a.toLowerCase().includes(w)) score += 1;
    });
  });
  return Math.max(score, 0.2);
}
function weightedRandom(items, weights) {
  const total = weights.reduce((a, b) => a + b, 0);
  let r = Math.random() * total;
  for (let i = 0; i < items.length; i++) {
    r -= weights[i];
    if (r <= 0) return items[i];
  }
  return items[items.length - 1];
}
function getDailyOdu(odus) {
  if (!odus.length) return null;
  const today = new Date().toISOString().slice(0, 10);
  let h = 5381;
  for (let i = 0; i < today.length; i++) h = (h * 33 ^ today.charCodeAt(i)) >>> 0;
  return buildComposite(odus[h % 16], odus[(h >> 4) % 16]);
}
function relTime(iso) {
  const s = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (s < 60) return 'just now';
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return new Date(iso).toLocaleDateString('en', {
    month: 'short',
    day: 'numeric'
  });
}

// Convert any odu object to a {row, col} selection
function oduToSelection(odu) {
  if (!odu) return null;
  if (odu._isComposite && !odu._isMeji) return {
    row: odu._row,
    col: odu._col
  };
  const base = odu._row || odu;
  return {
    row: base,
    col: base
  };
}

// ════════════════════════════════════════════════════════════
// PERIODIC TABLE UTILITIES
// ════════════════════════════════════════════════════════════

// 1 → "O" (circle glyph), 0 → "I" (line glyph). Special: all-1s → "O", all-0s → "|"
// IFABit is read right-to-left, so reverse the code before mapping.
function primaryGlyph(code) {
  if (code === '1111') return 'O';
  if (code === '0000') return '|';
  return code.split('').reverse().map(b => b === '1' ? 'O' : 'I').join('');
}
function renderGlyphChars(g) {
  if (g.length === 1) return g;
  return g.split('').map((ch, i) => {
    const next = g[i + 1];
    const mr = !next ? '0' : ch === 'I' && next === 'I' ? '-0.08em' : '-0.22em';
    return /*#__PURE__*/React.createElement("span", {
      key: i,
      style: {
        marginRight: mr
      }
    }, ch);
  });
}

// Block-based cell numbering: Meji row (rowPos 0) → 1–16; members → 16 + ci*15 + rowPos
function ptCellNum(ci, rowPos) {
  return rowPos === 0 ? ci + 1 : 16 + ci * 15 + rowPos;
}
function ptOduName(row, col) {
  return row.id === col.id ? row.meji : `${row.name}-${col.name}`;
}

// For Àpólà column ci at period rowPos, return the Left/Period Odu
// rowPos 0 → Meji; rowPos 1..15 → all other principals in order, skipping ci
function ptSecondaryAt(odus, ci, rowPos) {
  if (rowPos === 0) return odus[ci];
  let k = 0;
  for (let i = 0; i < 16; i++) {
    if (i === ci) continue;
    if (k === rowPos - 1) return odus[i];
    k++;
  }
}
function ptCalcDimmed(row, col, activeCategory, searchTerm) {
  if (activeCategory !== 'all' && row.category !== activeCategory && col.category !== activeCategory) return true;
  if (searchTerm) {
    const t = searchTerm.toLowerCase();
    return !ptOduName(row, col).toLowerCase().includes(t) && !row.name.toLowerCase().includes(t) && !col.name.toLowerCase().includes(t);
  }
  return false;
}

// ════════════════════════════════════════════════════════════
// IFA MARKS  –  two-column binary divination visual
// ════════════════════════════════════════════════════════════
function IfaMarks({
  code = '0000',
  secondCode,
  color = '#888',
  size = 'md'
}) {
  // RTL: period/col Odu → LEFT col; principal/row Odu → RIGHT col
  const leftBits  = (secondCode || code).split('').map(Number);
  const rightBits = code.split('').map(Number);
  function MarkRow({
    bit
  }) {
    return /*#__PURE__*/React.createElement("div", {
      className: "ifa-marks__row"
    }, bit === 0 ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
      className: "ifa-marks__bar",
      style: {
        background: color
      }
    }), /*#__PURE__*/React.createElement("span", {
      className: "ifa-marks__bar",
      style: {
        background: color
      }
    })) : /*#__PURE__*/React.createElement("span", {
      className: "ifa-marks__bar",
      style: {
        background: color
      }
    }));
  }
  return /*#__PURE__*/React.createElement("div", {
    className: `ifa-marks ifa-marks--${size}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "ifa-marks__col"
  }, leftBits.map((b, i) => /*#__PURE__*/React.createElement(MarkRow, {
    key: i,
    bit: b
  }))), /*#__PURE__*/React.createElement("div", {
    className: "ifa-marks__col"
  }, rightBits.map((b, i) => /*#__PURE__*/React.createElement(MarkRow, {
    key: i,
    bit: b
  }))));
}

// ════════════════════════════════════════════════════════════
// IFABIT DISPLAY  –  detailed 8-mark column visualization
// ════════════════════════════════════════════════════════════
function IFABitDisplay({
  rowCode,
  colCode,
  rowLabel,
  colLabel,
  color
}) {
  const leftBits = rowCode.split('').map(Number);
  const rightBits = colCode.split('').map(Number);
  const decimal = parseInt(rowCode + colCode, 2);
  function Mark({
    bit
  }) {
    return /*#__PURE__*/React.createElement("div", {
      className: "ifabit__mark"
    }, bit === 0 ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "ifabit__bar",
      style: {
        background: color
      }
    }), /*#__PURE__*/React.createElement("div", {
      className: "ifabit__bar",
      style: {
        background: color
      }
    })) : /*#__PURE__*/React.createElement("div", {
      className: "ifabit__bar",
      style: {
        background: color
      }
    }));
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "ifabit"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ifabit__cols"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ifabit__col"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ifabit__col-label",
    style: {
      color
    }
  }, colLabel), rightBits.map((b, i) => /*#__PURE__*/React.createElement(Mark, {
    key: i,
    bit: b
  }))), /*#__PURE__*/React.createElement("div", {
    className: "ifabit__col"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ifabit__col-label",
    style: {
      color
    }
  }, rowLabel), leftBits.map((b, i) => /*#__PURE__*/React.createElement(Mark, {
    key: i,
    bit: b
  })))));
}

// ════════════════════════════════════════════════════════════
// HEADER
// ════════════════════════════════════════════════════════════
function Header({
  view,
  onView
}) {
  return /*#__PURE__*/React.createElement("header", {
    className: "header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "header__topbar"
  }, /*#__PURE__*/React.createElement("a", {
    href: "https://ifainternet.org",
    className: "header__topbar-link",
    target: "_blank",
    rel: "noopener noreferrer"
  }, /*#__PURE__*/React.createElement("span", {
    className: "header__topbar-title"
  }, "\u2190 The IFA Internet \xB7 ifainternet.org")), /*#__PURE__*/React.createElement("div", {
    className: "header__exts"
  }, /*#__PURE__*/React.createElement("a", {
    href: "../ifa-periodic-table/",
    className: "header__ext"
  }, "IfaPT"), /*#__PURE__*/React.createElement("a", {
    href: "../ifa-lang/",
    className: "header__ext"
  }, "IfaLang"), /*#__PURE__*/React.createElement("a", {
    href: "https://toe.cenproject.org/",
    className: "header__ext header__ext--accent",
    target: "_blank",
    rel: "noopener noreferrer"
  }, "iTOE \u2197"))), /*#__PURE__*/React.createElement("div", {
    className: "header__main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "header__brand"
  }, /*#__PURE__*/React.createElement("span", {
    className: "header__logo"
  }, "IfAI"), /*#__PURE__*/React.createElement("span", {
    className: "header__tagline"
  }, "Ifa Artificial Intelligence \xB7 ToEAI")), /*#__PURE__*/React.createElement("nav", {
    className: "header__nav"
  }, [['oracle', 'Oracle'], ['table', 'Table'], ['explore', 'Explore'], ['overview', 'Overview']].map(([v, label]) => /*#__PURE__*/React.createElement("button", {
    key: v,
    className: `nav-btn${view === v ? ' nav-btn--active' : ''}`,
    onClick: () => onView(v)
  }, label)))));
}

// ════════════════════════════════════════════════════════════
// DAILY ODU BANNER
// ════════════════════════════════════════════════════════════
function DailyBanner({
  odu,
  categories,
  onClick
}) {
  if (!odu) return null;
  const cat = categories[odu.category] || {};
  const color = cat.color || '#888';
  const secondCode = odu._isComposite ? odu._col?.code : odu.code;
  return /*#__PURE__*/React.createElement("button", {
    className: "daily-banner",
    onClick: onClick,
    style: {
      '--cat-color': color
    }
  }, /*#__PURE__*/React.createElement(IfaMarks, {
    code: odu.code,
    secondCode: secondCode,
    color: color,
    size: "sm"
  }), /*#__PURE__*/React.createElement("div", {
    className: "daily-banner__body"
  }, /*#__PURE__*/React.createElement("span", {
    className: "daily-banner__label"
  }, "Today's Odu"), /*#__PURE__*/React.createElement("span", {
    className: "daily-banner__name"
  }, odu.name)), /*#__PURE__*/React.createElement("span", {
    className: "daily-banner__arrow"
  }, "\u2192"));
}

// ════════════════════════════════════════════════════════════
// READING CARD
// ════════════════════════════════════════════════════════════
function ReadingCard({
  odu,
  categories,
  casting,
  onClick
}) {
  const cat = categories[odu.category] || {};
  const color = cat.color || '#888';
  const secondCode = odu._isComposite ? odu._col?.code : odu.code;
  const ifabitStr = odu._isComposite ? `${odu._row?.code} · ${odu._col?.code}` : odu.code;
  const numStr = odu._isComposite ? `${odu._row?.id} × ${odu._col?.id}` : `#${String(odu.id).padStart(2, '0')}`;
  return /*#__PURE__*/React.createElement("div", {
    className: "reading-card",
    style: {
      '--cat-color': color
    },
    onClick: onClick
  }, /*#__PURE__*/React.createElement("div", {
    className: "reading-card__header"
  }, /*#__PURE__*/React.createElement(IfaMarks, {
    code: odu.code,
    secondCode: secondCode,
    color: color,
    size: "lg"
  }), /*#__PURE__*/React.createElement("div", {
    className: "reading-card__meta"
  }, /*#__PURE__*/React.createElement("span", {
    className: "reading-card__num"
  }, numStr), /*#__PURE__*/React.createElement("span", {
    className: "reading-card__cat"
  }, cat.label), odu._isMeji && /*#__PURE__*/React.createElement("span", {
    className: "badge"
  }, "Meji"))), /*#__PURE__*/React.createElement("div", {
    className: "reading-card__body"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "reading-card__name"
  }, odu.name), odu.yoruba && /*#__PURE__*/React.createElement("div", {
    className: "reading-card__yoruba"
  }, odu.yoruba, " \xB7 ", odu.meji), casting ? /*#__PURE__*/React.createElement("div", {
    className: "reading-card__casting-placeholder"
  }, /*#__PURE__*/React.createElement("span", {
    className: "cast-dot"
  }), /*#__PURE__*/React.createElement("span", {
    className: "cast-dot"
  }), /*#__PURE__*/React.createElement("span", {
    className: "cast-dot"
  })) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("p", {
    className: "reading-card__meaning"
  }, odu.meaning), (odu.element || odu.planet) && /*#__PURE__*/React.createElement("div", {
    className: "reading-card__attrs"
  }, odu.element && /*#__PURE__*/React.createElement("div", {
    className: "attr"
  }, /*#__PURE__*/React.createElement("span", {
    className: "attr__label"
  }, "Element"), /*#__PURE__*/React.createElement("span", {
    className: "attr__val"
  }, odu.element)), odu.planet && /*#__PURE__*/React.createElement("div", {
    className: "attr"
  }, /*#__PURE__*/React.createElement("span", {
    className: "attr__label"
  }, "Planet"), /*#__PURE__*/React.createElement("span", {
    className: "attr__val"
  }, odu.planet)), /*#__PURE__*/React.createElement("div", {
    className: "attr"
  }, /*#__PURE__*/React.createElement("span", {
    className: "attr__label"
  }, "IFABit Encoding"), /*#__PURE__*/React.createElement("span", {
    className: "attr__val attr__val--mono"
  }, ifabitStr))), odu.domains?.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "reading-card__section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "reading-card__tags"
  }, odu.domains.map(d => /*#__PURE__*/React.createElement("span", {
    key: d,
    className: "tag tag--domain"
  }, d)))), odu.steamsex?.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "reading-card__section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "reading-card__section-label"
  }, "Disciplines"), /*#__PURE__*/React.createElement("div", {
    className: "reading-card__tags"
  }, odu.steamsex.map(s => /*#__PURE__*/React.createElement("span", {
    key: s,
    className: "tag"
  }, s)))), /*#__PURE__*/React.createElement("div", {
    className: "reading-card__cta"
  }, "Tap to see full details \u2192"))));
}

// ════════════════════════════════════════════════════════════
// HISTORY STRIP
// ════════════════════════════════════════════════════════════
function HistoryStrip({
  history,
  categories,
  onSelect,
  onClear
}) {
  if (!history.length) return null;
  return /*#__PURE__*/React.createElement("div", {
    className: "history"
  }, /*#__PURE__*/React.createElement("div", {
    className: "history__header"
  }, /*#__PURE__*/React.createElement("span", {
    className: "history__label"
  }, "Recent Ifacomputations"), /*#__PURE__*/React.createElement("button", {
    className: "history__clear",
    onClick: onClear
  }, "Clear")), /*#__PURE__*/React.createElement("div", {
    className: "history__list"
  }, history.map(entry => {
    const cat = categories[entry.odu.category] || {};
    return /*#__PURE__*/React.createElement("button", {
      key: entry.id,
      className: "history__item",
      onClick: () => onSelect(oduToSelection(entry.odu))
    }, /*#__PURE__*/React.createElement("span", {
      className: "history__dot",
      style: {
        background: cat.color || '#888'
      }
    }), /*#__PURE__*/React.createElement("span", {
      className: "history__name"
    }, entry.odu.name), entry.question && /*#__PURE__*/React.createElement("span", {
      className: "history__q"
    }, "\"", entry.question, "\""), /*#__PURE__*/React.createElement("span", {
      className: "history__time"
    }, relTime(entry.ts)));
  })));
}

// ════════════════════════════════════════════════════════════
// ORACLE PANEL
// ════════════════════════════════════════════════════════════
function OraclePanel({
  odus,
  categories,
  onOpenOdu
}) {
  const [question, setQuestion] = useState('');
  const [phase, setPhase] = useState('idle');
  const [flashOdu, setFlashOdu] = useState(null);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
    } catch {
      return [];
    }
  });
  const timerRef = useRef(null);
  const dailyOdu = useMemo(() => getDailyOdu(odus), [odus]);
  useEffect(() => () => clearInterval(timerRef.current), []);
  const handleCast = useCallback(() => {
    if (!odus.length || phase === 'casting') return;
    clearInterval(timerRef.current);
    setPhase('casting');
    setResult(null);
    const weights = odus.map(o => scoreOdu(o, question));
    let ticks = 0;
    timerRef.current = setInterval(() => {
      setFlashOdu(buildComposite(odus[Math.floor(Math.random() * odus.length)], odus[Math.floor(Math.random() * odus.length)]));
      if (++ticks >= 20) {
        clearInterval(timerRef.current);
        const chosen = buildComposite(weightedRandom(odus, weights), weightedRandom(odus, weights));
        setFlashOdu(null);
        setResult(chosen);
        setPhase('revealed');
        const entry = {
          id: Date.now(),
          odu: chosen,
          question: question.trim(),
          ts: new Date().toISOString()
        };
        setHistory(prev => {
          const next = [entry, ...prev].slice(0, HISTORY_MAX);
          try {
            localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
          } catch {}
          return next;
        });
      }
    }, 75);
  }, [odus, phase, question]);
  const clearHistory = useCallback(() => {
    setHistory([]);
    try {
      localStorage.removeItem(HISTORY_KEY);
    } catch {}
  }, []);
  const displayOdu = phase === 'casting' ? flashOdu : result;
  return /*#__PURE__*/React.createElement("main", {
    className: "oracle"
  }, /*#__PURE__*/React.createElement(DailyBanner, {
    odu: dailyOdu,
    categories: categories,
    onClick: () => dailyOdu && onOpenOdu(oduToSelection(dailyOdu))
  }), /*#__PURE__*/React.createElement("div", {
    className: "oracle__hero"
  }, /*#__PURE__*/React.createElement("h1", null, "Ask the Ifa Computer"), /*#__PURE__*/React.createElement("p", null, "256 Odu Ifa \xB7 Consciousness Science \xB7 Unified Knowledge \xB7 Orisa Wisdom"), /*#__PURE__*/React.createElement("p", {
    className: "oracle__hero-sub"
  }, "IfAI is the ", /*#__PURE__*/React.createElement("strong", null, "Ifa Artificial Intelligence"), " \u2014 an Ifacomputation engine powered by the ", /*#__PURE__*/React.createElement("strong", null, "IFA Body of Knowledge (IFABOK)"), ", the 256 Odu Ifa as Ifatoms of all fields of knowledge."), /*#__PURE__*/React.createElement("p", {
    className: "oracle__hero-def"
  }, "Ifacomputations are universal meta-computations")), /*#__PURE__*/React.createElement("div", {
    className: "oracle__form"
  }, /*#__PURE__*/React.createElement("button", {
    className: `cast-btn${phase === 'casting' ? ' cast-btn--active' : ''}`,
    onClick: handleCast,
    disabled: phase === 'casting' || !odus.length
  }, phase === 'casting' ? 'Ifacomputing…' : phase === 'revealed' ? 'Ifacompute again' : 'Ifacompute')), displayOdu && /*#__PURE__*/React.createElement("div", {
    className: `oracle__result${phase === 'casting' ? ' oracle__result--casting' : ' oracle__result--revealed'}`
  }, /*#__PURE__*/React.createElement(ReadingCard, {
    odu: displayOdu,
    categories: categories,
    casting: phase === 'casting',
    onClick: () => phase === 'revealed' && onOpenOdu(oduToSelection(displayOdu))
  })), /*#__PURE__*/React.createElement(HistoryStrip, {
    history: history,
    categories: categories,
    onSelect: onOpenOdu,
    onClear: clearHistory
  }));
}

// ════════════════════════════════════════════════════════════
// ODU CELL  –  single cell in the 16×16 grid
// ════════════════════════════════════════════════════════════
function OduCell({
  row,
  col,
  cellNum,
  color,
  isMeji,
  isDimmed,
  onCellClick,
  onMouseEnter,
  onMouseLeave,
  onMouseMove
}) {
  const short = isMeji ? row.name : `${row.name.slice(0, 3)}-${col.name.slice(0, 3)}`;
  const cls = ['cell', isMeji ? 'cell--meji' : '', isDimmed ? 'cell--dim' : ''].filter(Boolean).join(' ');
  const priGlyph = primaryGlyph(row.code);
  const secGlyph = primaryGlyph(col.code);
  return /*#__PURE__*/React.createElement("div", {
    className: cls,
    style: {
      color
    },
    onClick: onCellClick,
    onMouseEnter: onMouseEnter,
    onMouseLeave: onMouseLeave,
    onMouseMove: onMouseMove
  }, /*#__PURE__*/React.createElement("span", {
    className: "cell__num"
  }, cellNum), /*#__PURE__*/React.createElement("div", {
    className: "cell__glyph"
  }, /*#__PURE__*/React.createElement("span", {
    className: "cell__glyph-sec"
  }, renderGlyphChars(secGlyph)), /*#__PURE__*/React.createElement("span", {
    className: "cell__glyph-pri"
  }, renderGlyphChars(priGlyph))), /*#__PURE__*/React.createElement("span", {
    className: "cell__name"
  }, short));
}

// ════════════════════════════════════════════════════════════
// PERIODIC TABLE  –  16×16 interactive grid
// ════════════════════════════════════════════════════════════
function PeriodicTable({
  odus,
  categories,
  activeCategory,
  searchTerm,
  onCellClick
}) {
  const [tip, setTip] = useState({
    visible: false,
    text: '',
    x: 0,
    y: 0
  });
  const showTip = useCallback((text, e) => setTip({
    visible: true,
    text,
    x: e.clientX + 14,
    y: e.clientY + 14
  }), []);
  const moveTip = useCallback(e => setTip(t => ({
    ...t,
    x: e.clientX + 14,
    y: e.clientY + 14
  })), []);
  const hideTip = useCallback(() => setTip(t => ({
    ...t,
    visible: false
  })), []);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "pt-table-headers"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pt-table-header"
  }, "Apodu: Apola-Odu"), /*#__PURE__*/React.createElement("div", {
    className: "pt-table-header"
  }, "\xC0t\u1EB9f\xE1-\xC8r\xF2j\xE0 Gbogbo \xCCm\u1ECD"), /*#__PURE__*/React.createElement("div", {
    className: "pt-table-header"
  }, "IfaCategory: Apola Odu", /*#__PURE__*/React.createElement("div", {
    className: "pt-table-header__sub"
  }, /*#__PURE__*/React.createElement("span", null, "(IfaCat)"), /*#__PURE__*/React.createElement("span", null, "(Apodu)"))), /*#__PURE__*/React.createElement("div", {
    className: "pt-table-header"
  }, "IfaCategory Theory")), /*#__PURE__*/React.createElement("div", {
    className: "table-scroll"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pt-grid"
  }, [...odus].reverse().map(apolOdu => /*#__PURE__*/React.createElement("div", {
    key: 'ch-' + apolOdu.id,
    className: "pt-col-header",
    style: {
      color: categories[apolOdu.category].color
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "pt-col-header__ifacat"
  }, "IfaCat ", apolOdu.id), /*#__PURE__*/React.createElement("span", {
    className: "pt-col-header__apola"
  }, "\xC0p\xF3l\xE0 ", apolOdu.yoruba))), /*#__PURE__*/React.createElement("div", {
    className: "pt-corner"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pt-corner__label"
  }, "IfaComposition: \xC0m\xFAl\xF9-Odu"), /*#__PURE__*/React.createElement("span", {
    className: "pt-corner__sub"
  }, "(IfaComp)"), /*#__PURE__*/React.createElement("span", {
    className: "pt-corner__sub"
  }, "(\xC0m\xFAl\xF9)")), Array.from({
    length: 16
  }, (_, rowPos) => {
    const reversedOdus = [...odus].reverse();
    const makeCell = principalOdu => {
      const ci = principalOdu.id - 1;
      const secondaryOdu = ptSecondaryAt(odus, ci, rowPos);
      const num = ptCellNum(ci, rowPos);
      const dimmed = ptCalcDimmed(principalOdu, secondaryOdu, activeCategory, searchTerm);
      const color = categories[principalOdu.category].color;
      return /*#__PURE__*/React.createElement(OduCell, {
        key: num,
        row: principalOdu,
        col: secondaryOdu,
        cellNum: num,
        color: color,
        isMeji: rowPos === 0,
        isDimmed: dimmed,
        onCellClick: () => !dimmed && onCellClick({
          row: principalOdu,
          col: secondaryOdu
        }),
        onMouseEnter: e => !dimmed && showTip(ptOduName(principalOdu, secondaryOdu), e),
        onMouseLeave: hideTip,
        onMouseMove: moveTip
      });
    };
    if (rowPos === 0) {
      return /*#__PURE__*/React.createElement(Fragment, {
        key: "period-0"
      }, reversedOdus.map(pOdu => {
        const ci = pOdu.id - 1;
        return ci === 0 || ci === 1 ? makeCell(pOdu) : /*#__PURE__*/React.createElement("div", {
          key: 'bp-ph-' + ci,
          className: "pt-cell-placeholder"
        });
      }), /*#__PURE__*/React.createElement("div", {
        className: "pt-row-header pt-row-header--basepair"
      }, /*#__PURE__*/React.createElement("span", {
        className: "pt-row-header__basepair"
      }, "Ifa Base Pair")), reversedOdus.map(pOdu => {
        const ci = pOdu.id - 1;
        return ci === 0 || ci === 1 ? /*#__PURE__*/React.createElement("div", {
          key: 'ic1-ph-' + ci,
          className: "pt-cell-placeholder"
        }) : makeCell(pOdu);
      }), /*#__PURE__*/React.createElement("div", {
        className: "pt-row-header"
      }, /*#__PURE__*/React.createElement("span", {
        className: "pt-row-header__ifacomp"
      }, "IfaComp 1")));
    }
    return /*#__PURE__*/React.createElement(Fragment, {
      key: 'period-' + rowPos
    }, reversedOdus.map(principalOdu => {
      const ci = principalOdu.id - 1;
      const secondaryOdu = ptSecondaryAt(odus, ci, rowPos);
      const num = ptCellNum(ci, rowPos);
      const dimmed = ptCalcDimmed(principalOdu, secondaryOdu, activeCategory, searchTerm);
      const color = categories[principalOdu.category].color;
      return /*#__PURE__*/React.createElement(OduCell, {
        key: num,
        row: principalOdu,
        col: secondaryOdu,
        cellNum: num,
        color: color,
        isMeji: false,
        isDimmed: dimmed,
        onCellClick: () => !dimmed && onCellClick({
          row: principalOdu,
          col: secondaryOdu
        }),
        onMouseEnter: e => !dimmed && showTip(ptOduName(principalOdu, secondaryOdu), e),
        onMouseLeave: hideTip,
        onMouseMove: moveTip
      });
    }), /*#__PURE__*/React.createElement("div", {
      className: "pt-row-header"
    }, /*#__PURE__*/React.createElement("span", {
      className: "pt-row-header__ifacomp"
    }, "IfaComp ", rowPos + 1)));
  }))), tip.visible && /*#__PURE__*/React.createElement("div", {
    className: "tooltip",
    style: {
      left: Math.min(tip.x, window.innerWidth - 200) + 'px',
      top: tip.y + 'px'
    }
  }, tip.text));
}

// ════════════════════════════════════════════════════════════
// PT LIST VIEW  –  16 principal Odu as cards
// ════════════════════════════════════════════════════════════
function PTListView({
  odus,
  categories,
  activeCategory,
  searchTerm,
  onSelect
}) {
  const filtered = odus.filter(o => {
    const catOk = activeCategory === 'all' || o.category === activeCategory;
    const searchOk = !searchTerm || o.name.toLowerCase().includes(searchTerm.toLowerCase()) || o.meji.toLowerCase().includes(searchTerm.toLowerCase());
    return catOk && searchOk;
  });
  if (!filtered.length) return /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      padding: '48px',
      color: 'var(--text-3)'
    }
  }, "No Odu match your search.");
  return /*#__PURE__*/React.createElement("div", {
    className: "pt-list-grid"
  }, filtered.map(o => {
    const cat = categories[o.category];
    return /*#__PURE__*/React.createElement("div", {
      key: o.id,
      className: "pt-list-card",
      onClick: () => onSelect({
        row: o,
        col: o
      })
    }, /*#__PURE__*/React.createElement("div", {
      className: "pt-list-card__badge",
      style: {
        color: cat.color
      }
    }, /*#__PURE__*/React.createElement("span", null, o.id)), /*#__PURE__*/React.createElement("div", {
      className: "pt-list-card__body"
    }, /*#__PURE__*/React.createElement("div", {
      className: "pt-list-card__name"
    }, o.meji), /*#__PURE__*/React.createElement("div", {
      className: "pt-list-card__yoruba"
    }, o.yoruba, " M\xE9j\xEC"), /*#__PURE__*/React.createElement("div", {
      className: "pt-list-card__cat",
      style: {
        color: cat.color
      }
    }, cat.label), /*#__PURE__*/React.createElement("div", {
      className: "pt-list-card__desc"
    }, o.meaning)));
  }));
}

// ════════════════════════════════════════════════════════════
// TABLE PANEL  –  full periodic table experience
// ════════════════════════════════════════════════════════════
function TablePanel({
  odus,
  categories,
  onOpenOdu
}) {
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('all');
  const [subView, setSubView] = useState('table'); // 'table' | 'list'

  return /*#__PURE__*/React.createElement("div", {
    className: "table-panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pt-controls"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "pt-controls__heading"
  }, "The Complete Form of Ifa's Periodic Table"), /*#__PURE__*/React.createElement("div", {
    className: "pt-controls__inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pt-search"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pt-search__icon"
  }, "\u2315"), /*#__PURE__*/React.createElement("input", {
    className: "pt-search__input",
    type: "text",
    placeholder: "Search Odu\u2026",
    value: search,
    onChange: e => setSearch(e.target.value)
  })), /*#__PURE__*/React.createElement("div", {
    className: "pt-chips"
  }, /*#__PURE__*/React.createElement("button", {
    className: `pt-chip ${filterCat === 'all' ? 'pt-chip--active' : 'pt-chip--inactive'}`,
    style: {
      color: '#9aa3ba',
      borderColor: '#2e3a58'
    },
    onClick: () => setFilterCat('all')
  }, "All"), Object.entries(categories).map(([key, cat]) => /*#__PURE__*/React.createElement("button", {
    key: key,
    className: `pt-chip ${filterCat === key ? 'pt-chip--active' : 'pt-chip--inactive'}`,
    style: {
      color: cat.color,
      borderColor: cat.color
    },
    onClick: () => setFilterCat(key)
  }, cat.label))), /*#__PURE__*/React.createElement("div", {
    className: "pt-view-toggle"
  }, /*#__PURE__*/React.createElement("button", {
    className: `pt-view-btn${subView === 'table' ? ' pt-view-btn--active' : ''}`,
    onClick: () => setSubView('table')
  }, "Grid"), /*#__PURE__*/React.createElement("button", {
    className: `pt-view-btn${subView === 'list' ? ' pt-view-btn--active' : ''}`,
    onClick: () => setSubView('list')
  }, "List")))), /*#__PURE__*/React.createElement("main", {
    className: "table-panel__main"
  }, subView === 'table' ? /*#__PURE__*/React.createElement(PeriodicTable, {
    odus: odus,
    categories: categories,
    activeCategory: filterCat,
    searchTerm: search,
    onCellClick: onOpenOdu
  }) : /*#__PURE__*/React.createElement(PTListView, {
    odus: odus,
    categories: categories,
    activeCategory: filterCat,
    searchTerm: search,
    onSelect: onOpenOdu
  })));
}

// ════════════════════════════════════════════════════════════
// EXPLORE PANEL  –  searchable card grid of 16 principals
// ════════════════════════════════════════════════════════════
function OduCard({
  odu,
  categories,
  onClick
}) {
  const cat = categories[odu.category] || {};
  return /*#__PURE__*/React.createElement("div", {
    className: "odu-card",
    style: {
      '--cat-color': cat.color || '#888'
    },
    onClick: onClick
  }, /*#__PURE__*/React.createElement("div", {
    className: "odu-card__top"
  }, /*#__PURE__*/React.createElement(IfaMarks, {
    code: odu.code,
    color: cat.color || '#888',
    size: "sm"
  }), /*#__PURE__*/React.createElement("span", {
    className: "odu-card__num"
  }, "#", odu.id)), /*#__PURE__*/React.createElement("div", {
    className: "odu-card__name"
  }, odu.name), /*#__PURE__*/React.createElement("div", {
    className: "odu-card__meji"
  }, odu.meji), /*#__PURE__*/React.createElement("p", {
    className: "odu-card__excerpt"
  }, odu.meaning), /*#__PURE__*/React.createElement("div", {
    className: "odu-card__cat"
  }, cat.label));
}
function ExplorePanel({
  odus,
  categories,
  onOpenOdu
}) {
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('');
  const filtered = odus.filter(o => {
    if (filterCat && o.category !== filterCat) return false;
    if (!search) return true;
    const t = search.toLowerCase();
    return o.name.toLowerCase().includes(t) || o.meji?.toLowerCase().includes(t) || o.yoruba?.toLowerCase().includes(t) || o.meaning?.toLowerCase().includes(t) || o.element?.toLowerCase().includes(t) || o.domains?.some(d => d.toLowerCase().includes(t));
  });
  return /*#__PURE__*/React.createElement("main", {
    className: "explore"
  }, /*#__PURE__*/React.createElement("div", {
    className: "explore__controls"
  }, /*#__PURE__*/React.createElement("input", {
    className: "explore__search",
    type: "search",
    placeholder: "Search Odu\u2026",
    value: search,
    onChange: e => setSearch(e.target.value)
  }), /*#__PURE__*/React.createElement("div", {
    className: "explore__chips"
  }, /*#__PURE__*/React.createElement("button", {
    className: `chip${!filterCat ? ' chip--active' : ''}`,
    onClick: () => setFilterCat('')
  }, "All"), Object.entries(categories).map(([key, cat]) => /*#__PURE__*/React.createElement("button", {
    key: key,
    className: `chip${filterCat === key ? ' chip--active' : ''}`,
    style: {
      color: cat.color,
      ...(filterCat === key ? {
        borderColor: cat.color
      } : {})
    },
    onClick: () => setFilterCat(filterCat === key ? '' : key)
  }, cat.label))), /*#__PURE__*/React.createElement("span", {
    className: "explore__count"
  }, filtered.length, " / ", odus.length)), /*#__PURE__*/React.createElement("div", {
    className: "explore__grid"
  }, filtered.map(odu => /*#__PURE__*/React.createElement(OduCard, {
    key: odu.id,
    odu: odu,
    categories: categories,
    onClick: () => onOpenOdu({
      row: odu,
      col: odu
    })
  }))));
}

// ════════════════════════════════════════════════════════════
// IFAI OVERVIEW  –  published content from toe.cenproject.org/ifai-overview/
// ════════════════════════════════════════════════════════════

const OVERVIEW_URL = 'https://toe.cenproject.org/ifai-overview/';
const IFAI_FEATURES = [{
  title: 'The IfAI Framework',
  desc: 'A universal structure that unifies all AI models and systems seamlessly. IfAI is also called ToEAI or CENAI.'
}, {
  title: 'IFABit Technology',
  desc: 'The IFA Binary System empowers IfAI as a key element of IFA Mathematics.'
}, {
  title: 'AIoE Integration',
  desc: 'Using IFA as a bridge to connect all AI models and systems by developing IfAI as the Standard Model of AI.'
}, {
  title: 'Guided by 16 IFA Axioms',
  desc: 'The 16 Major Odu Ifa are the cornerstone Principles underlying all AI models and systems.'
}, {
  title: 'CENAI Applications',
  desc: 'IfAI is also known as EnergyAI or CENAI — real-world solutions powered by the IfAI and Ifai frameworks.'
}];
const IFAI_METRICS = [{
  value: '16',
  label: 'Axiom Principles',
  note: 'Foundational impact of the 16 IFA Axioms within AI models'
}, {
  value: 'X+',
  label: 'IFABit Operations',
  note: 'Computational power delivered by IFABit in AI frameworks'
}, {
  value: 'X',
  label: 'AI Model Variations',
  note: 'Diversity of AI models influenced by the IfAI framework'
}, {
  value: 'X',
  label: 'Global Integrations',
  note: 'Widespread adoption of the IfAI framework worldwide'
}];
const IFAI_TECHNOLOGIES = [{
  title: 'IFA Neural Network (IFANN)',
  desc: 'Ifa-Informed Neural Networks / Energy-Informed Neural Networks (EnergyNNs). Build neural networks in IfaLang, explore knowledge unification via Orunmila Deep Learning Networks (ODDNs).'
}, {
  title: 'IFA Machine Learning (IFAML)',
  desc: 'Machine learning done in IfaLang — giving computers the ability to learn without being programmed explicitly.'
}, {
  title: 'AI Builder: Standard Model of AI',
  desc: 'IFAI is a universal builder of AI models and systems — the Standard Model of AI and the universe of all AI models.'
}];
function OverviewPanel() {
  return /*#__PURE__*/React.createElement("main", {
    className: "overview"
  }, /*#__PURE__*/React.createElement("div", {
    className: "overview__hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "overview__hero-text"
  }, /*#__PURE__*/React.createElement("div", {
    className: "overview__eyebrow"
  }, "IfAI \xB7 ToEAI \xB7 CENAI \xB7 AIoE"), /*#__PURE__*/React.createElement("h1", {
    className: "overview__title"
  }, "Ifa Polymathic AI"), /*#__PURE__*/React.createElement("p", {
    className: "overview__desc"
  }, "Ifa AI (IfAI) is the AI for Everything (AIoE). Understand Ifa AI's Foundational Principles, showcasing how the 16 IFA Axioms (Oj\xFA Od\xF9 If\xE1 M\u1EB9r\xECnd\xEDnl\xF3g\xFAn) and IFABit empower a universal AI Framework, driving innovation and shaping the future of Artificial Intelligence."), /*#__PURE__*/React.createElement("a", {
    className: "overview__cta",
    href: OVERVIEW_URL,
    target: "_blank",
    rel: "noopener noreferrer"
  }, "Read Full Article on toe.cenproject.org \u2197")), /*#__PURE__*/React.createElement("img", {
    className: "overview__hero-img",
    src: "https://toe.cenproject.org/wp-content/uploads/2025/11/IfAI-Tradition-Meets-Tech-1-1024x683.png",
    alt: "IfAI \u2014 Tradition Meets Tech",
    loading: "lazy"
  })), /*#__PURE__*/React.createElement("section", {
    className: "overview__section"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "overview__section-title"
  }, "Learn the Underlying Structure of AI"), /*#__PURE__*/React.createElement("p", {
    className: "overview__section-sub"
  }, "An overview of key innovations and Ifa Digitization Programs."), /*#__PURE__*/React.createElement("div", {
    className: "overview__features"
  }, IFAI_FEATURES.map(f => /*#__PURE__*/React.createElement("div", {
    key: f.title,
    className: "overview__feature"
  }, /*#__PURE__*/React.createElement("div", {
    className: "overview__feature-title"
  }, f.title), /*#__PURE__*/React.createElement("div", {
    className: "overview__feature-desc"
  }, f.desc))))), /*#__PURE__*/React.createElement("section", {
    className: "overview__section overview__section--alt"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "overview__section-title"
  }, "Core Metrics Illustrating Success and Innovation"), /*#__PURE__*/React.createElement("p", {
    className: "overview__section-sub"
  }, "Vital metrics reflecting groundbreaking achievements. Ifa AI is universal meta-AI."), /*#__PURE__*/React.createElement("div", {
    className: "overview__metrics"
  }, IFAI_METRICS.map(m => /*#__PURE__*/React.createElement("div", {
    key: m.label,
    className: "overview__metric"
  }, /*#__PURE__*/React.createElement("span", {
    className: "overview__metric-value"
  }, m.value), /*#__PURE__*/React.createElement("span", {
    className: "overview__metric-label"
  }, m.label), /*#__PURE__*/React.createElement("span", {
    className: "overview__metric-note"
  }, m.note))))), /*#__PURE__*/React.createElement("section", {
    className: "overview__section"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "overview__section-title"
  }, "Ifa Polymathy"), /*#__PURE__*/React.createElement("p", {
    className: "overview__polymathy-body"
  }, "Polymathy is the pursuit of excellence, mastery, and knowledge across multiple, diverse fields, driven by deep curiosity and lifelong learning. Unlike specialists, polymaths integrate insights from varied disciplines \u2014 art, science, technology \u2014 to foster creativity and solve complex problems. Historically, figures like Orunmila/Ifa, Leonardo da Vinci, Osun, and Aristotle epitomize this approach."), /*#__PURE__*/React.createElement("p", {
    className: "overview__polymathy-body"
  }, /*#__PURE__*/React.createElement("strong", null, "IfaPolymathy"), " is the polymathic engine of the IFA Internet \u2014 empowering individuals to master multiple disciplines through IFA Mathematics, unify knowledge into One, and build solutions across science, technology, arts, and the unknown."), /*#__PURE__*/React.createElement("a", {
    className: "overview__text-link",
    href: "https://toe.cenproject.org/ifa-polymathy-toe-polymathy/",
    target: "_blank",
    rel: "noopener noreferrer"
  }, "Learn More about Ifa Polymathy \u2197")), /*#__PURE__*/React.createElement("section", {
    className: "overview__section overview__section--alt"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "overview__section-title"
  }, "The Fundamental Theory of AI"), /*#__PURE__*/React.createElement("p", {
    className: "overview__section-sub"
  }, "Resources that deepen your understanding of IfAI, empowering you with tools to unlock AI's full potential."), /*#__PURE__*/React.createElement("div", {
    className: "overview__techs"
  }, IFAI_TECHNOLOGIES.map(t => /*#__PURE__*/React.createElement("div", {
    key: t.title,
    className: "overview__tech"
  }, /*#__PURE__*/React.createElement("div", {
    className: "overview__tech-title"
  }, t.title), /*#__PURE__*/React.createElement("div", {
    className: "overview__tech-desc"
  }, t.desc))))), /*#__PURE__*/React.createElement("div", {
    className: "overview__banner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "overview__banner-text"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "overview__banner-h"
  }, "Discover the Future with Us"), /*#__PURE__*/React.createElement("p", {
    className: "overview__banner-sub"
  }, "Take the next step to uncover the limitless possibilities of AI and innovation.")), /*#__PURE__*/React.createElement("div", {
    className: "overview__banner-actions"
  }, /*#__PURE__*/React.createElement("a", {
    className: "overview__cta",
    href: OVERVIEW_URL,
    target: "_blank",
    rel: "noopener noreferrer"
  }, "Full Article: Ifai Overview \u2197"), /*#__PURE__*/React.createElement("a", {
    className: "overview__cta overview__cta--ghost",
    href: "https://cenproject.org/the-ifa-coding-academy/",
    target: "_blank",
    rel: "noopener noreferrer"
  }, "Ifa Coding Academy \u2197"))));
}

// ════════════════════════════════════════════════════════════
// IFA NETWORKS  –  kominifa.com + ejiodi.com deep-link integration
// ════════════════════════════════════════════════════════════

const KOMI_BASE = 'https://www.kominifa.com';
const EJIODI_BASE = 'https://www.ejiodi.com';

// Ejiodi URL slugs for the 16 principal Odu
// Pattern: /odu-ifa/apola-[slug]/
// Odi (id 4) uses 'iwori2' on ejiodi.com — all others follow natural name
const EJIODI_SLUG = {
  1: 'ogbe',
  2: 'oyeku',
  3: 'iwori',
  4: 'iwori2',
  5: 'irosun',
  6: 'owonrin',
  7: 'obara',
  8: 'okanran',
  9: 'ogunda',
  10: 'osa',
  11: 'ika',
  12: 'oturupon',
  13: 'otura',
  14: 'irete',
  15: 'ose',
  16: 'ofun'
};

// URL slugs for each of the 16 principal Odu on kominifa.com
// Meji pages use the full Meji name; composite parts use the base name.
// Ogbe is special: its Meji page is /ejiogbe; Ofun (id 16) is listed as /orangun.
const KOMI_MEJI_SLUG = {
  1: 'ejiogbe',
  2: 'oyeku',
  3: 'iwori',
  4: 'odi',
  5: 'irosun',
  6: 'owonrin',
  7: 'obara',
  8: 'okanran',
  9: 'ogunda',
  10: 'osa',
  11: 'ika',
  12: 'oturupon',
  13: 'otura',
  14: 'irete',
  15: 'ose',
  16: 'orangun'
};
const KOMI_PART_SLUG = {
  1: 'ogbe',
  2: 'oyeku',
  3: 'iwori',
  4: 'odi',
  5: 'irosun',
  6: 'owonrin',
  7: 'obara',
  8: 'okanran',
  9: 'ogunda',
  10: 'osa',
  11: 'ika',
  12: 'oturupon',
  13: 'otura',
  14: 'irete',
  15: 'ose',
  16: 'ofun'
};

// Orisa Knowledge pages on kominifa.com associated with each Odu
const KOMI_ORISA = {
  1: [{
    name: 'Ifa Practice',
    path: '/blog/ifa-practice'
  }],
  2: [{
    name: 'Egbe',
    path: '/blog/egbe'
  }],
  3: [{
    name: 'Ori',
    path: '/blog/ori'
  }],
  5: [{
    name: 'Osun',
    path: '/blog/osun'
  }],
  6: [{
    name: 'Sango',
    path: '/blog/sango'
  }],
  7: [{
    name: 'Sango',
    path: '/blog/sango'
  }],
  8: [{
    name: 'Sango',
    path: '/blog/sango'
  }, {
    name: 'Ogun',
    path: '/blog/ogun'
  }],
  9: [{
    name: 'Ogun',
    path: '/blog/ogun'
  }],
  10: [{
    name: 'Sango',
    path: '/blog/sango'
  }],
  11: [{
    name: 'Egbe',
    path: '/blog/egbe'
  }],
  13: [{
    name: 'Ifa Practice',
    path: '/blog/ifa-practice'
  }],
  14: [{
    name: 'Ifa Practice',
    path: '/blog/ifa-practice'
  }],
  15: [{
    name: 'Osun',
    path: '/blog/osun'
  }, {
    name: 'Aje',
    path: '/blog/aje'
  }],
  16: [{
    name: 'Obatala',
    path: '/blog/obatala'
  }]
};
function kominifaOduUrl(row, col) {
  if (row.id === col.id) {
    return KOMI_BASE + '/' + (KOMI_MEJI_SLUG[row.id] || row.name.toLowerCase());
  }
  var rs = KOMI_PART_SLUG[row.id] || row.name.toLowerCase();
  var cs = KOMI_PART_SLUG[col.id] || col.name.toLowerCase();
  return KOMI_BASE + '/' + rs + '-' + cs;
}
function IfaNetwork({
  row,
  col,
  color
}) {
  var isMeji = row.id === col.id;
  var oduUrl = kominifaOduUrl(row, col);
  var oduName = isMeji ? row.meji : row.name + '\u2013' + col.name;

  // Ejiodi: always links to the principal (row) Odu's Apola page
  var ejiSlug = EJIODI_SLUG[row.id] || row.name.toLowerCase();
  var ejiUrl = EJIODI_BASE + '/odu-ifa/apola-' + ejiSlug + '/';
  var orisa = useMemo(function () {
    var seen = new Set();
    var result = [];
    var ids = isMeji ? [row.id] : [row.id, col.id];
    ids.forEach(function (id) {
      (KOMI_ORISA[id] || []).forEach(function (o) {
        if (!seen.has(o.path)) {
          seen.add(o.path);
          result.push(o);
        }
      });
    });
    return result;
  }, [row.id, col.id, isMeji]);
  return /*#__PURE__*/React.createElement("div", {
    className: "modal__section ifa-network"
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal__section-label"
  }, "Ifa Networks"), /*#__PURE__*/React.createElement("div", {
    className: "ifa-net__grid"
  }, /*#__PURE__*/React.createElement("a", {
    className: "ifa-net__card ifa-net__card--odu",
    href: oduUrl,
    target: "_blank",
    rel: "noopener noreferrer"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ifa-net__badge ifa-net__badge--ifa"
  }, "Ifa Knowledge"), /*#__PURE__*/React.createElement("span", {
    className: "ifa-net__name",
    style: {
      color
    }
  }, oduName), /*#__PURE__*/React.createElement("span", {
    className: "ifa-net__sub"
  }, "kominifa.com \xB7 256 Odu Ifa")), /*#__PURE__*/React.createElement("a", {
    className: "ifa-net__card ifa-net__card--ejiodi",
    href: ejiUrl,
    target: "_blank",
    rel: "noopener noreferrer"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ifa-net__badge ifa-net__badge--trad"
  }, "Traditional Knowledge"), /*#__PURE__*/React.createElement("span", {
    className: "ifa-net__name",
    style: {
      color
    }
  }, isMeji ? row.meji : row.name), /*#__PURE__*/React.createElement("span", {
    className: "ifa-net__sub"
  }, "\xC8j\xEC\xF2d\xED \xB7 Home of Tradition")), orisa.map(function (o) {
    return /*#__PURE__*/React.createElement("a", {
      key: o.path,
      className: "ifa-net__card ifa-net__card--orisa",
      href: KOMI_BASE + o.path,
      target: "_blank",
      rel: "noopener noreferrer"
    }, /*#__PURE__*/React.createElement("span", {
      className: "ifa-net__badge ifa-net__badge--orisa"
    }, "Orisa Knowledge"), /*#__PURE__*/React.createElement("span", {
      className: "ifa-net__name"
    }, o.name), /*#__PURE__*/React.createElement("span", {
      className: "ifa-net__sub"
    }, "kominifa.com"));
  })));
}

// ════════════════════════════════════════════════════════════
// WIKIPEDIA KNOWLEDGE INTEGRATION
// ════════════════════════════════════════════════════════════

const wikiCache = new Map();
function wikiSearchFallback(term, encoded) {
  return fetch('https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=' + encoded + '&srlimit=1&format=json&origin=*').then(function (sRes) {
    if (!sRes.ok) {
      wikiCache.set(term, null);
      return null;
    }
    return sRes.json().then(function (sData) {
      var topTitle = sData.query && sData.query.search && sData.query.search[0] && sData.query.search[0].title;
      if (!topTitle) {
        wikiCache.set(term, null);
        return null;
      }
      return fetch('https://en.wikipedia.org/api/rest_v1/page/summary/' + encodeURIComponent(topTitle), {
        headers: {
          Accept: 'application/json'
        }
      }).then(function (r2) {
        if (!r2.ok) {
          wikiCache.set(term, null);
          return null;
        }
        return r2.json().then(function (d2) {
          var result = d2.type !== 'disambiguation' ? d2 : null;
          wikiCache.set(term, result);
          return result;
        });
      });
    });
  }).catch(function (err) {
    wikiCache.set(term, null);
    return null;
  });
}
function fetchWikiSummary(term) {
  if (wikiCache.has(term)) return Promise.resolve(wikiCache.get(term));
  var encoded = encodeURIComponent(term);
  return fetch('https://en.wikipedia.org/api/rest_v1/page/summary/' + encoded, {
    headers: {
      Accept: 'application/json'
    }
  }).then(function (res) {
    if (!res.ok) return wikiSearchFallback(term, encoded);
    return res.json().then(function (data) {
      if (data.type === 'disambiguation') return wikiSearchFallback(term, encoded);
      wikiCache.set(term, data);
      return data;
    });
  }).catch(function (err) {
    wikiCache.set(term, null);
    return null;
  });
}
function WikiKnowledge({
  domains,
  steamsex,
  color
}) {
  const domainKey = (domains || []).slice(0, 3).join(',');
  const steamsexKey = (steamsex || []).slice(0, 3).join(',');
  const terms = useMemo(() => {
    const combined = [...(domains || []).slice(0, 3), ...(steamsex || []).slice(0, 3)];
    return [...new Set(combined)].slice(0, 5);
  }, [domainKey, steamsexKey]);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const termKey = terms.join(',');
  useEffect(() => {
    if (!termKey) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    setLoading(true);
    setArticles([]);
    Promise.all(terms.map(fetchWikiSummary)).then(results => {
      if (cancelled) return;
      setArticles(results.filter(Boolean));
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [termKey]);
  if (!termKey) return null;
  return /*#__PURE__*/React.createElement("div", {
    className: "modal__section wiki-knowledge"
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal__section-label"
  }, "Knowledge Links \xB7 Wikipedia"), loading ? /*#__PURE__*/React.createElement("div", {
    className: "wiki-loading"
  }, /*#__PURE__*/React.createElement("span", {
    className: "wiki-dot"
  }), /*#__PURE__*/React.createElement("span", {
    className: "wiki-dot"
  }), /*#__PURE__*/React.createElement("span", {
    className: "wiki-dot"
  })) : articles.length === 0 ? /*#__PURE__*/React.createElement("p", {
    className: "wiki-empty"
  }, "No articles found for this Odu's domains.") : /*#__PURE__*/React.createElement("div", {
    className: "wiki-grid"
  }, articles.map(art => /*#__PURE__*/React.createElement("a", {
    key: art.title,
    className: "wiki-card",
    href: art.content_urls?.desktop?.page,
    target: "_blank",
    rel: "noopener noreferrer"
  }, art.thumbnail?.source && /*#__PURE__*/React.createElement("img", {
    className: "wiki-card__thumb",
    src: art.thumbnail.source,
    alt: "",
    loading: "lazy"
  }), /*#__PURE__*/React.createElement("div", {
    className: "wiki-card__body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wiki-card__title",
    style: {
      color
    }
  }, art.title), /*#__PURE__*/React.createElement("div", {
    className: "wiki-card__extract"
  }, (art.extract || '').slice(0, 160), (art.extract || '').length > 160 ? '…' : ''))))));
}

// ════════════════════════════════════════════════════════════
// IFA PHILOSOPHY SECTION
// ════════════════════════════════════════════════════════════

const PHIL_BRANCHES = [{
  key: 'logic',
  name: 'Ifa Logic',
  sub: 'Reasoning · Principles'
}, {
  key: 'ethics',
  name: 'Ifa Ethics',
  sub: 'Ọmọlúwàbí · Balance · Fairness'
}, {
  key: 'ontology',
  name: 'Ifa Ontology',
  sub: 'Being & existence'
}, {
  key: 'epistemology',
  name: 'Ifa Epistemology',
  sub: 'Knowledge · Wisdom'
}, {
  key: 'phenomenology',
  name: 'Ifa Phenomenology',
  sub: 'Lived experience · Odu Ifa'
}, {
  key: 'paradox',
  name: 'IfaParadox',
  sub: 'Esu · Duality · Ternality'
}];
const PHIL_ENTITIES = [{
  name: 'Ọbàtálá',
  role: 'Purity · Ethical Leadership · Light'
}, {
  name: 'Orunmila',
  role: 'Father of Wisdom'
}, {
  name: 'Esu',
  role: 'Paradox · Duality · Ternality'
}, {
  name: 'Lúwa (Òrìṣà Lúwàbí)',
  role: 'Wisdom · Morality · Ethics'
}, {
  name: 'Egbe',
  role: 'Collective Consciousness'
}, {
  name: 'Olodumare',
  role: 'Supreme Creative Force'
}];
const OMOLUABI_VALUES = ['Honesty', 'Respect', 'Responsibility', 'Fairness', 'Sustainability', 'Harmony'];
function IfaPhilosophySection({
  color
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "modal__section ifa-phil"
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal__section-label"
  }, "Ifa Philosophy \xB7 PhiloE"), /*#__PURE__*/React.createElement("p", {
    className: "ifa-phil__tagline"
  }, /*#__PURE__*/React.createElement("strong", null, "Orisa Philosophy:"), " every element of nature is an Orisa \u2014 Energy or Consciousness. The 16 Major Odu Ifa are the Laws of Nature underlying all philosophical systems."), /*#__PURE__*/React.createElement("div", {
    className: "ifa-phil__branches"
  }, PHIL_BRANCHES.map(function (b) {
    return /*#__PURE__*/React.createElement("div", {
      key: b.key,
      className: "ifa-phil__branch"
    }, /*#__PURE__*/React.createElement("span", {
      className: "ifa-phil__branch-name",
      style: {
        color
      }
    }, b.name), /*#__PURE__*/React.createElement("span", {
      className: "ifa-phil__branch-sub"
    }, b.sub));
  })), /*#__PURE__*/React.createElement("div", {
    className: "ifa-phil__sub-label"
  }, "Key Figures"), /*#__PURE__*/React.createElement("div", {
    className: "ifa-phil__entities"
  }, PHIL_ENTITIES.map(e => /*#__PURE__*/React.createElement("div", {
    key: e.name,
    className: "ifa-phil__entity"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ifa-phil__entity-name"
  }, e.name), /*#__PURE__*/React.createElement("span", {
    className: "ifa-phil__entity-role"
  }, e.role)))), /*#__PURE__*/React.createElement("div", {
    className: "ifa-phil__omoluabi"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ifa-phil__omoluabi-label"
  }, "\u1ECCm\u1ECDl\xFAw\xE0b\xED Values"), /*#__PURE__*/React.createElement("div", {
    className: "ifa-phil__omoluabi-vals"
  }, OMOLUABI_VALUES.map(v => /*#__PURE__*/React.createElement("span", {
    key: v,
    className: "ifa-phil__omoluabi-val"
  }, v)))), /*#__PURE__*/React.createElement("div", {
    className: "ifa-phil__links"
  }, /*#__PURE__*/React.createElement("a", {
    className: "ifa-phil__link",
    href: "https://toe.cenproject.org/ifa-philosophy/",
    target: "_blank",
    rel: "noopener noreferrer"
  }, "Ifa Philosophy \u2197"), /*#__PURE__*/React.createElement("a", {
    className: "ifa-phil__link",
    href: "https://toe.cenproject.org/ifa-ethics/",
    target: "_blank",
    rel: "noopener noreferrer"
  }, "Ifa Ethics \u2197")));
}

// ════════════════════════════════════════════════════════════
// IFA INTERNET SECTION  –  iTOE platform links by discipline
// ════════════════════════════════════════════════════════════

const ITOE_BASE = 'https://toe.cenproject.org';
const STEAMSEX_ITOE = {
  'Science': '/ifa-science/',
  'Mathematics': '/ifa-mathematics-toe-mathematics/',
  'Engineering': '/ifa-engineering/',
  'Technology': '/ifa-computer/',
  'Computer Science': '/ifa-computer/',
  'Art': '/ifa-non-science/',
  'Arts': '/ifa-non-science/',
  'Philosophy': '/ifa-philosophy/',
  'Spirituality': '/ifa-philosophy/',
  'Neuroscience': '/ifa-neuroscience/',
  'Biology': '/ifa-biology/',
  'Physics': '/ifa-physics/',
  'Chemistry': '/ifachemistry/',
  'Medicine': '/ifa-medicine-toe-medicine/',
  'Language': '/ifa-language/',
  'Economics': '/ifa-non-science/',
  'Social Science': '/ifa-non-science/',
  'Strategy': '/ifa-intelligence/',
  'Ecology': '/ifa-biology/',
  'Meteorology': '/ifa-physical-science/'
};
const STEAMSEX_LABEL = {
  '/ifa-science/': 'IFA Science',
  '/ifa-mathematics-toe-mathematics/': 'IFA Mathematics',
  '/ifa-engineering/': 'IFA Engineering',
  '/ifa-computer/': 'IFA Computer',
  '/ifa-non-science/': 'IFA Non-Science',
  '/ifa-philosophy/': 'IFA Philosophy',
  '/ifa-neuroscience/': 'IFA Neuroscience',
  '/ifa-biology/': 'IFA Biology',
  '/ifa-physics/': 'IFA Physics',
  '/ifachemistry/': 'IFA Chemistry',
  '/ifa-medicine-toe-medicine/': 'IFA Medicine',
  '/ifa-language/': 'IFA Language',
  '/ifa-intelligence/': 'IFA Intelligence',
  '/ifa-physical-science/': 'IFA Physical Science'
};
function IfaInternetSection({
  steamsex,
  color
}) {
  const links = useMemo(() => {
    const seen = new Set();
    const result = [];
    (steamsex || []).forEach(s => {
      const path = STEAMSEX_ITOE[s];
      if (path && !seen.has(path)) {
        seen.add(path);
        result.push({
          label: STEAMSEX_LABEL[path] || 'IFA ' + s,
          url: ITOE_BASE + path
        });
      }
    });
    return result;
  }, [(steamsex || []).join(',')]);
  if (!links.length) return null;
  return /*#__PURE__*/React.createElement("div", {
    className: "modal__section itoe-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal__section-label"
  }, "IFA Internet \xB7 toe.cenproject.org"), /*#__PURE__*/React.createElement("div", {
    className: "itoe__chips"
  }, links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l.url,
    className: "itoe__chip",
    href: l.url,
    target: "_blank",
    rel: "noopener noreferrer",
    style: {
      borderColor: color + '55',
      color
    }
  }, l.label, " \u2192"))), /*#__PURE__*/React.createElement("a", {
    className: "ifa-phil__link",
    href: "https://toe.cenproject.org/",
    target: "_blank",
    rel: "noopener noreferrer"
  }, "Full IFA Internet \xB7 iTOE \u2192"));
}

// ════════════════════════════════════════════════════════════
// FOOTER  –  IFA Internet ecosystem links
// ════════════════════════════════════════════════════════════

function Footer() {
  return /*#__PURE__*/React.createElement("footer", {
    className: "app-footer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "app-footer__inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "app-footer__brand"
  }, /*#__PURE__*/React.createElement("span", {
    className: "app-footer__logo"
  }, "Ifai"), /*#__PURE__*/React.createElement("span", {
    className: "app-footer__part"
  }, "Part of the IFA Internet \xB7", ' ', /*#__PURE__*/React.createElement("a", {
    href: "https://toe.cenproject.org/",
    target: "_blank",
    rel: "noopener noreferrer"
  }, "toe.cenproject.org"))), /*#__PURE__*/React.createElement("div", {
    className: "app-footer__links"
  }, /*#__PURE__*/React.createElement("a", {
    href: "https://toe.cenproject.org/ifai-overview/",
    target: "_blank",
    rel: "noopener noreferrer"
  }, "Ifai Overview"), /*#__PURE__*/React.createElement("a", {
    href: "https://toe.cenproject.org/ifa-intelligence/",
    target: "_blank",
    rel: "noopener noreferrer"
  }, "IFA Intelligence"), /*#__PURE__*/React.createElement("a", {
    href: "../ifa-periodic-table/"
  }, "Ifa Periodic Table"), /*#__PURE__*/React.createElement("a", {
    href: "../ifa-lang/"
  }, "IFA Language"), /*#__PURE__*/React.createElement("a", {
    href: "../ifa-game/"
  }, "IFA Game"), /*#__PURE__*/React.createElement("a", {
    href: "https://toe.cenproject.org/ifa-philosophy/",
    target: "_blank",
    rel: "noopener noreferrer"
  }, "Ifa Philosophy"), /*#__PURE__*/React.createElement("a", {
    href: "https://toe.cenproject.org/ifa-networking-toe-networking/",
    target: "_blank",
    rel: "noopener noreferrer"
  }, "Ifa Networking"), /*#__PURE__*/React.createElement("a", {
    href: "https://toe.cenproject.org/ifa-mathematics-toe-mathematics/",
    target: "_blank",
    rel: "noopener noreferrer"
  }, "IFA Mathematics"), /*#__PURE__*/React.createElement("a", {
    href: "https://toe.cenproject.org/ifalabs-toelabs/",
    target: "_blank",
    rel: "noopener noreferrer"
  }, "IfaLabs"), /*#__PURE__*/React.createElement("a", {
    href: "https://www.kominifa.com/",
    target: "_blank",
    rel: "noopener noreferrer"
  }, "KomiIfa Network"), /*#__PURE__*/React.createElement("a", {
    href: "https://www.ejiodi.com/",
    target: "_blank",
    rel: "noopener noreferrer"
  }, "\xC8j\xEC\xF2d\xED \xB7 Home of Tradition")), /*#__PURE__*/React.createElement("div", {
    className: "app-footer__copy"
  }, "CENProject \xB7 The IFA Internet (iTOE) \xB7 IFABOK \xB7 256 Odu Ifa")));
}

// ════════════════════════════════════════════════════════════
// MODAL BODY — Meji (principal Odu) detail
// ════════════════════════════════════════════════════════════
function MejiDetail({
  odu,
  rowCat,
  allOdus,
  categories,
  onNavigate
}) {
  const color = rowCat.color || '#888';
  const dualOdu = allOdus.find(o => o.id === odu.dual);
  const dualCat = dualOdu ? categories[dualOdu.category] : null;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "modal__section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal__section-label"
  }, "Oj\xFA Od\xF9 \xB7 Meaning & Domain"), /*#__PURE__*/React.createElement("p", {
    className: "modal__meaning"
  }, odu.meaning)), /*#__PURE__*/React.createElement(IfaNetwork, {
    row: odu,
    col: odu,
    color: color
  }), /*#__PURE__*/React.createElement(WikiKnowledge, {
    domains: odu.domains,
    steamsex: odu.steamsex,
    color: color
  }), odu.domains?.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "modal__section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal__section-label"
  }, "Core Domains"), /*#__PURE__*/React.createElement("div", {
    className: "domain-chips"
  }, odu.domains.map(d => /*#__PURE__*/React.createElement("span", {
    key: d,
    className: "domain-chip"
  }, d)))), /*#__PURE__*/React.createElement("div", {
    className: "modal__section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal__section-label"
  }, "IFABit Encoding \xB7 \xC0p\xF3l\xE0 Code"), /*#__PURE__*/React.createElement(IFABitDisplay, {
    rowCode: odu.code,
    colCode: odu.code,
    rowLabel: odu.name,
    colLabel: odu.name,
    color: color
  })), (odu.element || odu.planet) && /*#__PURE__*/React.createElement("div", {
    className: "info-grid modal__section"
  }, odu.element && /*#__PURE__*/React.createElement("div", {
    className: "info-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "info-card__label"
  }, "Elemental Correspondence"), /*#__PURE__*/React.createElement("div", {
    className: "info-card__value",
    style: {
      color
    }
  }, odu.element)), odu.planet && /*#__PURE__*/React.createElement("div", {
    className: "info-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "info-card__label"
  }, "Planetary Influence"), /*#__PURE__*/React.createElement("div", {
    className: "info-card__value",
    style: {
      color
    }
  }, odu.planet))), odu.steamsex?.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "modal__section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal__section-label"
  }, "STEAMSEX Disciplines"), /*#__PURE__*/React.createElement("div", {
    className: "steamsex-tags"
  }, odu.steamsex.map(s => /*#__PURE__*/React.createElement("span", {
    key: s,
    className: "steamsex-tag"
  }, s)))), odu.axioms?.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "modal__section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal__section-label"
  }, "Ifa Periodicity Laws"), /*#__PURE__*/React.createElement("div", {
    className: "domain-chips"
  }, odu.axioms.map(a => /*#__PURE__*/React.createElement("span", {
    key: a,
    className: "domain-chip",
    style: {
      borderColor: color + '55'
    }
  }, a)))), /*#__PURE__*/React.createElement(IfaPhilosophySection, {
    color: color
  }), dualOdu && dualCat && /*#__PURE__*/React.createElement("div", {
    className: "modal__section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal__section-label"
  }, "Ifa Dual \xB7 Inverse \xC0p\xF3l\xE0"), /*#__PURE__*/React.createElement("div", {
    className: "dual-row",
    onClick: () => onNavigate(dualOdu.id)
  }, /*#__PURE__*/React.createElement("div", {
    className: "dual-badge",
    style: {
      color: dualCat.color
    }
  }, /*#__PURE__*/React.createElement("span", null, dualOdu.id)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "dual-name"
  }, dualOdu.meji), /*#__PURE__*/React.createElement("div", {
    className: "dual-yoruba"
  }, dualOdu.yoruba, " M\xE9j\xEC \xB7 ", dualCat.label)), /*#__PURE__*/React.createElement("div", {
    className: "dual-arrow"
  }, "\u2192"))));
}

// ════════════════════════════════════════════════════════════
// MODAL BODY — Composite Odu detail
// ════════════════════════════════════════════════════════════
function CompositeDetail({
  row,
  col,
  rowCat,
  colCat,
  onNavigate
}) {
  const uniqueDomains = [...new Set([...row.domains.slice(0, 3), ...col.domains.slice(0, 3)])];
  const uniqueSteamsex = [...new Set([...row.steamsex, ...col.steamsex])];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "modal__section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal__section-label"
  }, "\xC0m\xFAl\xF9 Od\xF9 \xB7 Composite Ifatom"), /*#__PURE__*/React.createElement("p", {
    className: "modal__meaning"
  }, "This \xC0m\xFAl\xF9 Od\xF9 (Composite Ifatom) belongs to the", ' ', /*#__PURE__*/React.createElement("strong", {
    style: {
      color: rowCat.color
    }
  }, "\xC0p\xF3l\xE0 ", row.name), " IfaGroup, expressing the interplay between", ' ', /*#__PURE__*/React.createElement("em", null, row.domains.slice(0, 2).join(', ')), " (Right/Principal) and", ' ', /*#__PURE__*/React.createElement("em", null, col.domains.slice(0, 2).join(', ')), " (Left/Period). Click either parent below to explore its full meaning.")), /*#__PURE__*/React.createElement(IfaNetwork, {
    row: row,
    col: col,
    color: rowCat.color
  }), /*#__PURE__*/React.createElement(WikiKnowledge, {
    domains: uniqueDomains,
    steamsex: uniqueSteamsex,
    color: rowCat.color
  }), /*#__PURE__*/React.createElement("div", {
    className: "info-grid modal__section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "info-card info-card--link",
    onClick: () => onNavigate(row.id)
  }, /*#__PURE__*/React.createElement("div", {
    className: "info-card__label",
    style: {
      color: rowCat.color
    }
  }, "\xC0p\xF3l\xE0 Odu \xB7 Right (Principal)"), /*#__PURE__*/React.createElement("div", {
    className: "info-card__value"
  }, row.meji), /*#__PURE__*/React.createElement("div", {
    className: "info-card__sub"
  }, row.domains.slice(0, 3).join(' · '))), /*#__PURE__*/React.createElement("div", {
    className: "info-card info-card--link",
    onClick: () => onNavigate(col.id)
  }, /*#__PURE__*/React.createElement("div", {
    className: "info-card__label",
    style: {
      color: colCat.color
    }
  }, "Period Odu \xB7 Left (Secondary)"), /*#__PURE__*/React.createElement("div", {
    className: "info-card__value"
  }, col.meji), /*#__PURE__*/React.createElement("div", {
    className: "info-card__sub"
  }, col.domains.slice(0, 3).join(' · ')))), uniqueDomains.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "modal__section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal__section-label"
  }, "Combined Domains"), /*#__PURE__*/React.createElement("div", {
    className: "domain-chips"
  }, uniqueDomains.map(d => /*#__PURE__*/React.createElement("span", {
    key: d,
    className: "domain-chip"
  }, d)))), /*#__PURE__*/React.createElement("div", {
    className: "modal__section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal__section-label"
  }, "IFABit Encoding \xB7 \xC0m\xFAl\xF9 Composition"), /*#__PURE__*/React.createElement(IFABitDisplay, {
    rowCode: row.code,
    colCode: col.code,
    rowLabel: row.name,
    colLabel: col.name,
    color: rowCat.color
  })), uniqueSteamsex.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "modal__section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal__section-label"
  }, "STEAMSEX Disciplines"), /*#__PURE__*/React.createElement("div", {
    className: "steamsex-tags"
  }, uniqueSteamsex.map(s => /*#__PURE__*/React.createElement("span", {
    key: s,
    className: "steamsex-tag"
  }, s)))), /*#__PURE__*/React.createElement(IfaPhilosophySection, {
    color: rowCat.color
  }));
}

// ════════════════════════════════════════════════════════════
// ODU MODAL  –  unified detail overlay for all three views
// selection = { row: OduObj, col: OduObj }
//   row === col  →  Meji (principal)
//   row !== col  →  Composite
// ════════════════════════════════════════════════════════════
function OduModal({
  selection,
  allOdus,
  categories,
  onClose,
  onNavigate
}) {
  const {
    row,
    col
  } = selection;
  const isMeji = row.id === col.id;
  const rowCat = categories[row.category] || {};
  const colCat = categories[col.category] || {};
  const color = rowCat.color || '#888';
  const name = isMeji ? row.name : `${row.name}–${col.name}`;
  const sub = isMeji ? `${row.yoruba} · ${row.meji} · Odu #${row.id}` : `${row.yoruba}–${col.yoruba} · Àmúlù Odù`;
  useEffect(() => {
    const handler = e => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);
  const handleOverlay = e => {
    if (e.target === e.currentTarget) onClose();
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "modal-overlay",
    onClick: handleOverlay
  }, /*#__PURE__*/React.createElement("article", {
    className: "modal"
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal__header",
    style: {
      borderTop: `3px solid ${color}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal__header-top"
  }, /*#__PURE__*/React.createElement(IfaMarks, {
    code: row.code,
    secondCode: isMeji ? row.code : col.code,
    color: color,
    size: "lg"
  }), /*#__PURE__*/React.createElement("div", {
    className: "modal__header-info"
  }, /*#__PURE__*/React.createElement("span", {
    className: "modal__cat",
    style: {
      color
    }
  }, rowCat.label), isMeji && /*#__PURE__*/React.createElement("span", {
    className: "badge"
  }, "Meji"), !isMeji && /*#__PURE__*/React.createElement("span", {
    className: "badge badge--dim"
  }, "Composite"))), /*#__PURE__*/React.createElement("button", {
    className: "modal__close",
    onClick: onClose,
    "aria-label": "Close"
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    className: "modal__body"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "modal__name",
    style: {
      color
    }
  }, name), /*#__PURE__*/React.createElement("div", {
    className: "modal__sub"
  }, sub), isMeji ? /*#__PURE__*/React.createElement(MejiDetail, {
    odu: row,
    rowCat: rowCat,
    allOdus: allOdus,
    categories: categories,
    onNavigate: onNavigate
  }) : /*#__PURE__*/React.createElement(CompositeDetail, {
    row: row,
    col: col,
    rowCat: rowCat,
    colCat: colCat,
    onNavigate: onNavigate
  }))));
}

// ════════════════════════════════════════════════════════════
// APP ROOT
// ════════════════════════════════════════════════════════════
function App() {
  const [odus, setOdus] = useState([]);
  const [categories, setCategories] = useState({});
  const [view, setView] = useState('oracle');
  const [selection, setSelection] = useState(null); // { row, col }

  useEffect(() => {
    fetch('./data/odu.json').then(r => r.json()).then(d => {
      setOdus(d.odu || []);
      setCategories(d.categories || {});
    }).catch(err => console.error('Failed to load odu.json:', err));
  }, []);
  const navigateTo = useCallback(id => {
    const o = odus.find(x => x.id === id);
    if (o) setSelection({
      row: o,
      col: o
    });
  }, [odus]);
  if (!odus.length) {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Header, {
      view: view,
      onView: setView
    }), /*#__PURE__*/React.createElement("div", {
      className: "app-loading"
    }, /*#__PURE__*/React.createElement("span", {
      className: "app-loading__dot"
    }), /*#__PURE__*/React.createElement("span", {
      className: "app-loading__dot"
    }), /*#__PURE__*/React.createElement("span", {
      className: "app-loading__dot"
    })));
  }
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Header, {
    view: view,
    onView: setView
  }), view === 'oracle' && /*#__PURE__*/React.createElement(OraclePanel, {
    odus: odus,
    categories: categories,
    onOpenOdu: setSelection
  }), view === 'table' && /*#__PURE__*/React.createElement(TablePanel, {
    odus: odus,
    categories: categories,
    onOpenOdu: setSelection
  }), view === 'explore' && /*#__PURE__*/React.createElement(ExplorePanel, {
    odus: odus,
    categories: categories,
    onOpenOdu: setSelection
  }), view === 'overview' && /*#__PURE__*/React.createElement(OverviewPanel, null), /*#__PURE__*/React.createElement(Footer, null), selection && /*#__PURE__*/React.createElement(OduModal, {
    selection: selection,
    allOdus: odus,
    categories: categories,
    onClose: () => setSelection(null),
    onNavigate: navigateTo
  }));
}

// ─── Mount ───────────────────────────────────────────────────
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(/*#__PURE__*/React.createElement(App, null));
