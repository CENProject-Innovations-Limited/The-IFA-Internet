/* ─────────────────────────────────────────────────────────────
   IFA Mechanics · TOE Mechanics
   React 18 + JSX via Babel Standalone · no build step
   CENProject · toe.cenproject.org/ifa-mechanics-toe-mechanics/
───────────────────────────────────────────────────────────── */

const { useState, useEffect, useRef, useMemo, useCallback } = React;

const TABS    = ['Binary', 'Combinations', 'Categories', 'Casting', 'Mathematics'];
const PRIMARY = '#0036F7';
const CAT_COLORS = {
  primordial: '#c9a227',
  cognitive:  '#4361ee',
  vital:      '#e63946',
  social:     '#daa520',
  active:     '#2d9e6b',
  strategic:  '#5e72b4',
  sacred:     '#7c4dff',
  abundant:   '#e9498a',
};

// ── IFABit mark display ──────────────────────────────────────
function IfaMark({ bit, size = 'md' }) {
  const px = { sm: 15, md: 20, lg: 28, xl: 36 }[size] || 20;
  return bit === '1'
    ? <span className="ifa-mark ogbe" style={{ fontSize: px }}>O</span>
    : <span className="ifa-mark oyeku" style={{ fontSize: px }}>|</span>;
}

function OduCode({ code, size = 'md' }) {
  return (
    <div className="odu-code">
      {code.split('').map((b, i) => <IfaMark key={i} bit={b} size={size} />)}
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// BINARY TAB
// ════════════════════════════════════════════════════════════
function BinaryTab({ odu, cats, mech }) {
  const [hovered, setHovered] = useState(null);
  const bs = mech?.binarySystem || {};

  const analyzeCode = code => ({
    energy: code.split('').filter(b => b === '1').length,
    anergy: code.split('').filter(b => b === '0').length,
    decimal: parseInt(code, 2),
  });

  // Group by energy content
  const byEnergy = useMemo(() => {
    const g = { 0: [], 1: [], 2: [], 3: [], 4: [] };
    odu.forEach(o => { g[o.code.split('').filter(b => b === '1').length].push(o); });
    return g;
  }, [odu]);

  return (
    <div className="tab-content">
      <div className="section-head">
        <h2 className="section-title">IFABit Binary System</h2>
        <p className="section-desc">{bs.description}</p>
      </div>

      {/* Symbol duality */}
      <div className="symbol-duality">
        <div className="sym-card">
          <div className="sym-glyph ogbe-glyph">O</div>
          <div className="sym-name">Ogbe</div>
          <div className="sym-bit">Bit = 1</div>
          <div className="sym-attrs">
            {(bs.symbols?.ogbe?.desc || '').split('·').map((a, i) => (
              <span key={i} className="sym-attr">{a.trim()}</span>
            ))}
          </div>
        </div>
        <div className="sym-divider">
          <div className="sym-div-arrow">⟷</div>
          <div className="sym-div-label">Duality Axis</div>
          <div className="sym-div-sub">Energy ↔ Anergy</div>
        </div>
        <div className="sym-card">
          <div className="sym-glyph oyeku-glyph">|</div>
          <div className="sym-name">Oyeku</div>
          <div className="sym-bit">Bit = 0</div>
          <div className="sym-attrs">
            {(bs.symbols?.oyeku?.desc || '').split('·').map((a, i) => (
              <span key={i} className="sym-attr">{a.trim()}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Binary table */}
      <div className="table-wrap">
        <table className="bin-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Odu</th>
              <th>Meji Name</th>
              <th>Category</th>
              <th>IFABit</th>
              <th>Visual</th>
              <th>Decimal</th>
              <th style={{ color: '#c9a227' }}>O (1)</th>
              <th style={{ color: '#4361ee' }}>| (0)</th>
            </tr>
          </thead>
          <tbody>
            {odu.map(o => {
              const { energy, anergy, decimal } = analyzeCode(o.code);
              const cc = CAT_COLORS[o.category] || '#888';
              const isH = hovered === o.id;
              return (
                <tr
                  key={o.id}
                  className={isH ? 'tr-hover' : ''}
                  onMouseEnter={() => setHovered(o.id)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <td className="td-muted">{o.id}</td>
                  <td className="td-odu" style={{ color: cc }}>{o.name}</td>
                  <td className="td-muted td-meji">{o.meji}</td>
                  <td><span className="cat-badge" style={{ background: cc }}>{cats[o.category]?.label}</span></td>
                  <td className="mono">{o.code}</td>
                  <td><OduCode code={o.code} size="sm" /></td>
                  <td className="mono td-muted">{decimal}</td>
                  <td className="td-energy">{energy}</td>
                  <td className="td-anergy">{anergy}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Energy distribution */}
      <div className="energy-dist">
        <h3 className="subsection-title">Energy Content Distribution</h3>
        <div className="energy-bars">
          {[4, 3, 2, 1, 0].map(e => (
            <div key={e} className="ed-row">
              <div className="ed-label">
                <span className="ed-count-label">{e} Energy</span>
                <span className="ed-bit-label">{e} O · {4 - e} |</span>
              </div>
              <div className="ed-odu-chips">
                {byEnergy[e].map(o => (
                  <div key={o.id} className="ed-chip" style={{ borderColor: CAT_COLORS[o.category] }}>
                    <OduCode code={o.code} size="sm" />
                    <span style={{ color: CAT_COLORS[o.category], fontWeight: 700, fontSize: '0.72rem' }}>{o.name}</span>
                  </div>
                ))}
                {byEnergy[e].length === 0 && <span className="td-muted" style={{ fontSize: '0.72rem' }}>—</span>}
              </div>
              <div className="ed-n">{byEnergy[e].length}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="info-box">
        <div className="info-box-title">IFABit Pattern Completeness</div>
        <div className="info-box-body">{bs.note}</div>
      </div>

      <div className="info-box" style={{ marginTop: '1rem', borderLeftColor: '#c9a227' }}>
        <div className="info-box-title" style={{ color: '#c9a227' }}>Mathematics of Duoinfinities</div>
        <div className="info-box-body">
          The IFABit binary system is the foundational encoding of <strong>IFA Mathematics</strong> — formally called the "Mathematics of Duoinfinities." Every 4-bit Odu code is a coordinate in the dual-infinity space defined by Ogbe (Energy / O / 1 = the active infinite pole) and Oyeku (Anergy / | / 0 = the receptive infinite pole). See the <strong>Mathematics</strong> tab for the full framework.
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// COMBINATIONS TAB
// ════════════════════════════════════════════════════════════
function CombinationsTab({ odu, cats, mech }) {
  const [hover, setHover] = useState(null); // { ri, ci }
  const cr = mech?.combinationRule || {};

  const hL = hover ? odu[hover.ri] : null;
  const hR = hover ? odu[hover.ci] : null;
  const isMeji = hover && hover.ri === hover.ci;

  return (
    <div className="tab-content">
      <div className="section-head">
        <h2 className="section-title">{cr.title || '256 Odu Combination Mechanics'}</h2>
        <p className="section-desc">{cr.description}</p>
      </div>

      {/* Formula cards */}
      <div className="formula-row">
        <div className="formula-card">
          <div className="fc-val">16</div>
          <div className="fc-lbl">Principal Odu (Osi)</div>
        </div>
        <div className="formula-op">×</div>
        <div className="formula-card">
          <div className="fc-val">16</div>
          <div className="fc-lbl">Principal Odu (Otun)</div>
        </div>
        <div className="formula-op">=</div>
        <div className="formula-card formula-result">
          <div className="fc-val gold">256</div>
          <div className="fc-lbl">Total Odu Ifa</div>
        </div>
      </div>

      {/* Hover info bar */}
      <div className={`combo-info-bar ${hover ? 'cib-visible' : ''}`}>
        {hover ? (
          <>
            <div className="cib-part">
              <OduCode code={hL.code} size="sm" />
              <span style={{ color: CAT_COLORS[hL.category], fontWeight: 700 }}>{hL.name}</span>
              <span className="cib-role">(Osi)</span>
            </div>
            <span className="cib-plus">+</span>
            <div className="cib-part">
              <OduCode code={hR.code} size="sm" />
              <span style={{ color: CAT_COLORS[hR.category], fontWeight: 700 }}>{hR.name}</span>
              <span className="cib-role">(Otun)</span>
            </div>
            <div className="cib-sep">→</div>
            <span className="mono cib-code">{hL.code}{hR.code}</span>
            {isMeji && <span className="meji-tag">Meji</span>}
          </>
        ) : (
          <span className="cib-hint">Hover a cell to inspect the combination</span>
        )}
      </div>

      {/* 16×16 Matrix */}
      <div className="matrix-scroll">
        <div className="matrix">
          {/* Header row */}
          <div className="mrow mrow-head">
            <div className="mcorner">Osi ↓ · Otun →</div>
            {odu.map(o => (
              <div key={o.id} className="mhdr-cell" style={{ color: CAT_COLORS[o.category] }} title={o.name}>
                {o.name.substring(0, 3)}
              </div>
            ))}
          </div>
          {/* Data rows */}
          {odu.map((rowO, ri) => {
            const rcc = CAT_COLORS[rowO.category] || '#555';
            return (
              <div key={rowO.id} className="mrow">
                <div className="mrow-lbl" style={{ color: rcc }}>{rowO.name.substring(0, 3)}</div>
                {odu.map((colO, ci) => {
                  const isM    = ri === ci;
                  const isHov  = hover && hover.ri === ri && hover.ci === ci;
                  const isLine = hover && (hover.ri === ri || hover.ci === ci);
                  let bg = 'transparent';
                  if (isHov)       bg = rcc + '66';
                  else if (isM)    bg = rcc + '33';
                  else if (isLine) bg = rcc + '14';
                  return (
                    <div
                      key={colO.id}
                      className={`mcell ${isM ? 'mcell-meji' : ''} ${isHov ? 'mcell-hov' : ''}`}
                      style={{ background: bg, '--rcc': rcc }}
                      onMouseEnter={() => setHover({ ri, ci })}
                      onMouseLeave={() => setHover(null)}
                      title={`${rowO.name} + ${colO.name}`}
                    >
                      {isM && <div className="meji-dot" style={{ background: rcc }} />}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      {/* IfaGebra note */}
      <div className="info-box" style={{ marginBottom: '1.25rem', borderLeftColor: '#0036F7' }}>
        <div className="info-box-title">IfaGebra — Algebra of Everything</div>
        <div className="info-box-body">
          Each of the 256 combinations defines a unique <strong>Ifa algebra</strong> structure within IfaGebra. The 16 Meji (diagonal) represent self-algebraic structures — fields of knowledge interacting with themselves. The 240 compounds represent cross-field algebraic interactions between distinct knowledge domains.
        </div>
      </div>

      {/* Legend + sub-counts */}
      <div className="combo-footer">
        <div className="combo-legend">
          <div className="cl-item">
            <div className="cl-dot" style={{ background: 'rgba(201,162,39,0.6)' }} />
            <span>16 Meji (self-combinations, diagonal)</span>
          </div>
          <div className="cl-item">
            <div className="cl-dot" style={{ background: 'rgba(255,255,255,0.12)' }} />
            <span>240 compound Odu</span>
          </div>
        </div>
        <div className="combo-sub-stats">
          <div className="css-item">
            <div className="css-val">16</div><div className="css-lbl">Meji</div>
          </div>
          <div className="css-item">
            <div className="css-val">240</div><div className="css-lbl">Compounds</div>
          </div>
          <div className="css-item">
            <div className="css-val gold">256</div><div className="css-lbl">Total</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// CATEGORIES TAB
// ════════════════════════════════════════════════════════════
function CategoriesTab({ odu, cats, mech }) {
  const [expanded, setExpanded] = useState(null);
  const cm = mech?.categoryMechanics || {};
  const pairs = cm.pairs || [];

  const catOdu = useMemo(() => {
    const g = {};
    odu.forEach(o => { if (!g[o.category]) g[o.category] = []; g[o.category].push(o); });
    return g;
  }, [odu]);

  return (
    <div className="tab-content">
      <div className="section-head">
        <h2 className="section-title">{cm.title || 'Category Mechanics'}</h2>
        <p className="section-desc">{cm.description}</p>
      </div>

      <div className="cat-grid">
        {pairs.map((pair, idx) => {
          const cat = cats[pair.category] || {};
          const cc  = cat.color || PRIMARY;
          const odus = catOdu[pair.category] || [];
          const isExp = expanded === pair.category;
          return (
            <div
              key={pair.category}
              className={`cat-card ${isExp ? 'cat-exp' : ''}`}
              style={{ '--cc': cc, borderColor: isExp ? cc : 'var(--border)' }}
              onClick={() => setExpanded(isExp ? null : pair.category)}
            >
              <div className="cc-index">{idx + 1}</div>
              <div className="cc-head" style={{ borderBottomColor: cc }}>
                <div className="cc-label" style={{ color: cc }}>{cat.label}</div>
                <div className="cc-principle">{pair.principle}</div>
              </div>
              <div className="cc-desc">{cat.desc}</div>
              <div className="cc-axis">{pair.axis}</div>

              <div className="cc-pair">
                {odus.map(o => (
                  <div key={o.id} className="cc-odu">
                    <OduCode code={o.code} size="sm" />
                    <div className="cc-odu-info">
                      <div className="cc-odu-name">{o.name}</div>
                      <div className="mono cc-odu-code">{o.code}</div>
                    </div>
                  </div>
                ))}
              </div>

              {isExp && (
                <div className="cc-expanded" onClick={e => e.stopPropagation()}>
                  {odus.map(o => (
                    <div key={o.id} className="cc-detail">
                      <div className="cc-d-head" style={{ color: cc }}>
                        <OduCode code={o.code} size="sm" />
                        {o.meji}
                      </div>
                      <div className="cc-d-elem">{o.element} · {o.planet}</div>
                      <div className="cc-d-meaning">{o.meaning.substring(0, 160)}…</div>
                      <div className="cc-d-domains">
                        {o.domains.slice(0, 5).map(d => (
                          <span key={d} className="cc-domain-tag">{d}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="cc-expand-hint">{isExp ? '▲ collapse' : '▼ expand'}</div>
            </div>
          );
        })}
      </div>

      <div className="info-box" style={{ marginTop: '1.5rem' }}>
        <div className="info-box-title">Category Duality Principle</div>
        <div className="info-box-body">
          Each category pair reflects a fundamental axis of CEN (Consciousness-Energy): one Odu emphasizes the
          Energy/active/masculine pole, the other the Anergy/receptive/feminine pole. Together the 8 axes × 2 poles
          create the complete 16-Odu system — a balanced binary taxonomy of all existence.
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// CASTING TAB
// ════════════════════════════════════════════════════════════
function CastingTab({ odu, cats, mech }) {
  const steps = mech?.castingProcess || [];
  const [casting, setCasting]   = useState(false);
  const [curStep, setCurStep]   = useState(0);
  const [marks,   setMarks]     = useState([]);  // 8 bits
  const [done,    setDone]      = useState(false);
  const ivRef = useRef(null);

  const reset = useCallback(() => {
    clearInterval(ivRef.current);
    setCasting(false);
    setCurStep(0);
    setMarks([]);
    setDone(false);
  }, []);

  const startCast = useCallback(() => {
    reset();
    const allMarks = Array.from({ length: 8 }, () => Math.random() > 0.5 ? '1' : '0');
    setCasting(true);
    setCurStep(1);
    let s = 1;
    ivRef.current = setInterval(() => {
      s++;
      if (s <= steps.length) {
        setCurStep(s);
        if (s === 4) setMarks(allMarks.slice(0, 4));
        if (s === 5) setMarks([...allMarks]);
      } else {
        setDone(true);
        setCasting(false);
        clearInterval(ivRef.current);
      }
    }, 1300);
  }, [reset, steps.length]);

  useEffect(() => () => clearInterval(ivRef.current), []);

  const result = useMemo(() => {
    if (marks.length < 8) return null;
    const rc = marks.slice(0, 4).join('');
    const lc = marks.slice(4, 8).join('');
    return {
      rightCode: rc, leftCode: lc,
      rightOdu: odu.find(o => o.code === rc),
      leftOdu:  odu.find(o => o.code === lc),
      isMeji: rc === lc,
    };
  }, [marks, odu]);

  return (
    <div className="tab-content">
      <div className="section-head">
        <h2 className="section-title">Casting Mechanics</h2>
        <p className="section-desc">
          Ifa divination uses 16 sacred palm nuts (ikin Ifa) to generate binary marks. Each attempt produces
          Ogbe (O = 1) or Oyeku (| = 0), building two 4-bit columns that identify one of the 256 Odu Ifa.
        </p>
      </div>

      {/* Steps */}
      <div className="cast-steps">
        {steps.map(s => {
          const isActive  = curStep >= s.step;
          const isCurrent = curStep === s.step && casting;
          return (
            <div
              key={s.step}
              className={`cast-step ${isActive ? 'cs-active' : ''} ${isCurrent ? 'cs-current' : ''}`}
            >
              <div className="cs-num" style={{ background: isActive ? PRIMARY : 'var(--surface2)' }}>
                {s.step}
              </div>
              <div className="cs-body">
                <div className="cs-name">{s.name}</div>
                <div className="cs-desc">{s.description}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Controls */}
      <div className="cast-controls">
        <button className="cast-btn" onClick={startCast} disabled={casting}>
          {casting ? 'Casting…' : done ? 'Cast Again' : 'Begin Casting'}
        </button>
        {(casting || done) && (
          <button className="cast-reset" onClick={reset}>Reset</button>
        )}
      </div>

      {/* Marks display */}
      {marks.length > 0 && (
        <div className="marks-display">
          {/* Right column */}
          <div className="marks-col">
            <div className="marks-col-label">Right Column (Otun) — 1st</div>
            <div className="marks-row">
              {[0,1,2,3].map(i =>
                marks[i] !== undefined
                  ? <IfaMark key={i} bit={marks[i]} size="xl" />
                  : <div key={i} className="mark-ph" />
              )}
            </div>
            {marks.length >= 4 && (
              <div className="marks-code mono">{marks.slice(0,4).join('')}</div>
            )}
          </div>

          {/* Left column — show when all 8 ready */}
          {marks.length >= 8 && (
            <div className="marks-col">
              <div className="marks-col-label">Left Column (Osi) — 2nd</div>
              <div className="marks-row">
                {[4,5,6,7].map(i => <IfaMark key={i} bit={marks[i]} size="xl" />)}
              </div>
              <div className="marks-code mono">{marks.slice(4,8).join('')}</div>
            </div>
          )}
        </div>
      )}

      {/* Result */}
      {done && result && (
        <div className="cast-result">
          <div className="cr-header">
            {result.isMeji
              ? '✦ Meji — Self-combination, the most potent reading'
              : '✦ Composite Odu — Two-Odu combination'}
          </div>
          <div className="cr-pair">
            {/* Right (Otun) */}
            {result.rightOdu && (
              <div className="cr-odu" style={{ '--cc': CAT_COLORS[result.rightOdu.category] }}>
                <div className="cr-role">Otun (Right)</div>
                <OduCode code={result.rightCode} size="lg" />
                <div className="cr-name" style={{ color: CAT_COLORS[result.rightOdu.category] }}>
                  {result.rightOdu.name}
                </div>
                <div className="cr-meji">{result.rightOdu.meji}</div>
                <div className="cr-cat">
                  <span className="cat-badge" style={{ background: CAT_COLORS[result.rightOdu.category] }}>
                    {cats[result.rightOdu.category]?.label}
                  </span>
                </div>
              </div>
            )}

            {result.isMeji && (
              <div className="cr-meji-center">
                <div className="crm-label">Meji</div>
                <div className="crm-sub">Self-paired</div>
              </div>
            )}

            {/* Left (Osi) */}
            {result.leftOdu && !result.isMeji && (
              <div className="cr-odu" style={{ '--cc': CAT_COLORS[result.leftOdu.category] }}>
                <div className="cr-role">Osi (Left)</div>
                <OduCode code={result.leftCode} size="lg" />
                <div className="cr-name" style={{ color: CAT_COLORS[result.leftOdu.category] }}>
                  {result.leftOdu.name}
                </div>
                <div className="cr-meji">{result.leftOdu.meji}</div>
                <div className="cr-cat">
                  <span className="cat-badge" style={{ background: CAT_COLORS[result.leftOdu.category] }}>
                    {cats[result.leftOdu.category]?.label}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Full IFABit code */}
          <div className="cr-fullcode">
            <span className="cr-fullcode-lbl">Full IFABit:</span>
            <span className="mono cr-fullcode-val">{result.rightCode} {result.leftCode}</span>
          </div>

          {/* Primary Odu meaning snippet */}
          {result.rightOdu && (
            <div className="cr-meaning">
              <span className="cr-meaning-odu" style={{ color: CAT_COLORS[result.rightOdu.category] }}>
                {result.rightOdu.name}:
              </span>
              {' '}{result.rightOdu.meaning}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// MATHEMATICS TAB
// ════════════════════════════════════════════════════════════
function MathematicsTab() {
  const PILLARS = [
    { abbr: 'NumoEs',    name: 'Ifa Numbers',   icon: '∞', color: '#c9a227',
      desc: 'The number system of IFA Mathematics. IFABit codes (Ogbe=1, Oyeku=0) are NumoEs — binary numbers encoding all 256 Odu and every quantitative relationship in the system.' },
    { abbr: 'AlgebroEs', name: 'Ifa Algebras',  icon: '⊕', color: '#0036F7',
      desc: 'Metamathematical structures called Ifa algebras. IfaGebra uses AlgebroEs to model every field of knowledge — physics, music, linguistics, drama — as a distinct algebraic instance.' },
    { abbr: 'FunctoEs',  name: 'Ifa Functions', icon: 'ƒ', color: '#2d9e6b',
      desc: 'Functional mappings between Ifa algebraic structures. Encode transformations between Odu states and how knowledge transitions occur across the 256-Odu system.' },
    { abbr: 'OpoEs',     name: 'Ifa Operators', icon: '⊗', color: '#7c4dff',
      desc: 'Operational rules governing how IFA structures combine. The 16×16 combination rule producing 256 Odu is the primary OpoE — the operator of the whole system.' },
  ];

  const IFAGEBRA_FIELDS = [
    'Mathematics Algebra', 'Physics Algebra', 'Chemistry Algebra', 'Biology Algebra',
    'Music Algebra', 'Linguistics Algebra', 'Marketing Algebra', 'Drama Algebra',
    'Engineering Algebra', 'Social Science Algebra', 'Philosophy Algebra', 'Medicine Algebra',
  ];

  const MECH_STACK = [
    { name: 'Galilean Mechanics',     desc: 'Inertial reference frames and relative motion' },
    { name: 'Newtonian Mechanics',    desc: 'Force, mass, and acceleration' },
    { name: 'Lagrangian Mechanics',   desc: 'Energy-based variational formulation' },
    { name: 'Hamiltonian Mechanics',  desc: 'Phase space and canonical equations' },
    { name: 'Relativistic Mechanics', desc: 'Space-time and energy-mass equivalence' },
    { name: 'Quantum Mechanics',      desc: 'Wave-function and probabilistic state description' },
  ];

  return (
    <div className="tab-content">
      <div className="section-head">
        <h2 className="section-title">IFA Mathematics</h2>
        <p className="section-desc">
          IFA Mathematics (Olodumare Mathematics / Consciousness Mathematics / TOE Mathematics) — "a new way of thinking that uses Mathematics, expressed as a form of Energy, to study all fields of knowledge." The IFABit binary system is its foundational encoding layer.
        </p>
      </div>

      {/* Duoinfinities */}
      <div className="math-section">
        <h3 className="math-sec-title">Mathematics of Duoinfinities</h3>
        <p className="math-sec-desc">
          IFA Mathematics is formally the "Mathematics of Duoinfinities" — grounded in two complementary infinite poles. Every IFABit code is a coordinate in this dual-infinity space.
        </p>
        <div className="duoinf-display">
          <div className="duoinf-pole" style={{ borderColor: '#c9a227' }}>
            <div className="duoinf-glyph" style={{ color: '#c9a227' }}>O</div>
            <div className="duoinf-name" style={{ color: '#c9a227' }}>Energy Infinity</div>
            <div className="duoinf-sym">Ogbe · Bit = 1</div>
            <div className="duoinf-desc">Active, creative, outward-flowing pole of infinite possibility</div>
          </div>
          <div className="duoinf-axis">
            <div className="duoinf-arrow">⟷</div>
            <div className="duoinf-axis-lbl">Duo-Infinity Axis</div>
          </div>
          <div className="duoinf-pole" style={{ borderColor: '#4361ee' }}>
            <div className="duoinf-glyph" style={{ color: '#4361ee' }}>|</div>
            <div className="duoinf-name" style={{ color: '#4361ee' }}>Anergy Infinity</div>
            <div className="duoinf-sym">Oyeku · Bit = 0</div>
            <div className="duoinf-desc">Receptive, void, inward-flowing pole of infinite depth</div>
          </div>
        </div>
      </div>

      {/* Four Pillars */}
      <div className="math-section">
        <h3 className="math-sec-title">Four Mathematical Pillars</h3>
        <p className="math-sec-desc">IFA Mathematics is built on four structural components that together model all knowledge domains.</p>
        <div className="pillars-grid">
          {PILLARS.map(p => (
            <div key={p.abbr} className="pillar-card" style={{ borderTopColor: p.color }}>
              <div className="pillar-icon" style={{ color: p.color }}>{p.icon}</div>
              <div className="pillar-abbr" style={{ color: p.color }}>{p.abbr}</div>
              <div className="pillar-name">{p.name}</div>
              <div className="pillar-desc">{p.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* IfaGebra */}
      <div className="math-section">
        <h3 className="math-sec-title">IfaGebra — Algebra of Everything</h3>
        <p className="math-sec-desc">
          IfaGebra (NetGebra) represents every field of knowledge as a metamathematical <em>Ifa algebra</em> structure, enabling mathematical study of all disciplines — including the humanities.
        </p>
        <div className="ifagebra-grid">
          {IFAGEBRA_FIELDS.map(f => <div key={f} className="ifag-chip">{f}</div>)}
          <div className="ifag-chip ifag-more">+ all fields of knowledge</div>
        </div>
        <div className="ifagebra-note">
          The 256 Odu Ifa are the complete set of AlgebroE structures in IfaGebra. Each 16×16 combination defines a unique algebraic interaction between two knowledge domains.
        </div>
      </div>

      {/* Consciousness Mechanics */}
      <div className="math-section">
        <h3 className="math-sec-title">Consciousness Mechanics — Standard Model</h3>
        <p className="math-sec-desc">
          IFA Mechanics is the "Standard Model of Mechanics for all fields and disciplines" — unifying the full spectrum of mechanical frameworks under a single CEN (Consciousness-Energy) structure.
        </p>
        <div className="mech-stack">
          {MECH_STACK.map((m, i) => (
            <div key={m.name} className="mech-item">
              <div className="mech-num">{i + 1}</div>
              <div className="mech-body">
                <div className="mech-name">{m.name}</div>
                <div className="mech-desc">{m.desc}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="mech-unifies">
          <div className="mu-arrow">↓ unified by</div>
          <div className="mu-box">
            <div className="mu-label">Consciousness Mechanics (IFA Mechanics)</div>
            <div className="mu-sub">The Standard Model for All Fields and Disciplines</div>
          </div>
        </div>
      </div>

      {/* Trinity */}
      <div className="info-box" style={{ marginTop: '0.5rem' }}>
        <div className="info-box-title">IFA Trinity Principle</div>
        <div className="info-box-body">
          Every Ifa Technology is simultaneously: a{' '}
          <strong style={{ color: '#c9a227' }}>Practical Tool</strong> (usable now) ·{' '}
          a <strong style={{ color: '#0036F7' }}>Teachable Discipline</strong> (structured knowledge) ·{' '}
          a <strong style={{ color: '#2d9e6b' }}>Research Frontier</strong> (continuously advancing).
          IFA Mechanics embodies all three.
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// ROOT APP
// ════════════════════════════════════════════════════════════
function App() {
  const [oduData,  setOduData]  = useState(null);
  const [mechData, setMechData] = useState(null);
  const [tab,      setTab]      = useState('Binary');
  const [error,    setError]    = useState(null);

  useEffect(() => {
    Promise.all([
      fetch('./data/odu.json').then(r => r.json()),
      fetch('./data/mechanics.json').then(r => r.json()),
    ])
      .then(([od, md]) => { setOduData(od); setMechData(md); })
      .catch(e => setError(e.message));
  }, []);

  if (error) return <div className="screen-center"><div className="error-msg">{error}</div></div>;
  if (!oduData) return (
    <div className="screen-center">
      <div className="spinner" />
      <div className="loading-txt">Loading IFA Mechanics…</div>
    </div>
  );

  const { odu, categories: cats } = oduData;

  return (
    <div className="app">
      <header className="hdr">
        <div className="hdr-inner">
          <div className="brand">
            <div className="brand-glyphs">
              <OduCode code="1111" size="sm" />
              <OduCode code="0000" size="sm" />
            </div>
            <div>
              <div className="brand-name">IFA Mechanics</div>
              <div className="brand-sub">TOE Mechanics · CENProject</div>
            </div>
          </div>
          <nav className="tab-nav">
            {TABS.map(t => (
              <button key={t} className={`tab-btn ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>
                {t}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="main-content">
        {tab === 'Binary'       && <BinaryTab       odu={odu} cats={cats} mech={mechData} />}
        {tab === 'Combinations' && <CombinationsTab odu={odu} cats={cats} mech={mechData} />}
        {tab === 'Categories'   && <CategoriesTab   odu={odu} cats={cats} mech={mechData} />}
        {tab === 'Casting'      && <CastingTab      odu={odu} cats={cats} mech={mechData} />}
        {tab === 'Mathematics'  && <MathematicsTab />}
      </main>

      <footer className="ftr">
        IFA Mechanics · CENProject ·
        <a href="https://toe.cenproject.org/ifa-mechanics-toe-mechanics/" target="_blank" rel="noopener noreferrer">
          toe.cenproject.org/ifa-mechanics-toe-mechanics/
        </a>
      </footer>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
