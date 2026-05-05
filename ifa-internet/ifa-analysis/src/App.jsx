/* ─────────────────────────────────────────────────────────────
   Ifanalysis · IFA Analysis
   React 18 + JSX via Babel Standalone · no build step
   CENProject · toe.cenproject.org/ifa-analysis/
───────────────────────────────────────────────────────────── */

const { useState, useEffect, useMemo } = React;

const TABS = ['Overview', 'Analyzer', 'Compare', 'Patterns'];
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
  const style = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    width: px, height: px, fontSize: px * 0.88,
    fontWeight: 900, lineHeight: 1, fontFamily: 'Georgia, serif',
  };
  return bit === '1'
    ? <span style={{ ...style, color: '#c9a227' }}>O</span>
    : <span style={{ ...style, color: '#4361ee' }}>|</span>;
}

function OduCode({ code, size = 'md' }) {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {code.split('').map((b, i) => <IfaMark key={i} bit={b} size={size} />)}
    </div>
  );
}

// ── Bar chart ────────────────────────────────────────────────
function BarChart({ data, title }) {
  const max = Math.max(...data.map(d => d.count), 1);
  return (
    <div className="chart-section">
      <h3 className="chart-title">{title}</h3>
      <div className="chart-bars">
        {data.map(({ label, count, color }) => (
          <div key={label} className="bar-row">
            <span className="bar-label" title={label}>{label}</span>
            <div className="bar-track">
              <div className="bar-fill" style={{ width: `${(count / max) * 100}%`, background: color || PRIMARY }} />
            </div>
            <span className="bar-count">{count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Stat card ────────────────────────────────────────────────
function StatCard({ label, value, sub, color }) {
  return (
    <div className="stat-card">
      <div className="stat-value" style={{ color: color || PRIMARY }}>{value}</div>
      <div className="stat-label">{label}</div>
      {sub && <div className="stat-sub">{sub}</div>}
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// OVERVIEW TAB
// ════════════════════════════════════════════════════════════
function OverviewTab({ odu, cats, ad }) {
  const axiomFreq = useMemo(() => {
    const f = {};
    odu.forEach(o => o.axioms.forEach(a => { f[a] = (f[a] || 0) + 1; }));
    return Object.entries(f).sort((a, b) => b[1] - a[1])
      .map(([label, count]) => ({ label, count, color: ad?.axioms?.[label]?.color || PRIMARY }));
  }, [odu, ad]);

  const steamsexFreq = useMemo(() => {
    const f = {};
    odu.forEach(o => o.steamsex.forEach(s => { f[s] = (f[s] || 0) + 1; }));
    return Object.entries(f).sort((a, b) => b[1] - a[1])
      .map(([label, count]) => ({ label, count, color: ad?.steamsexFields?.[label]?.color || PRIMARY }));
  }, [odu, ad]);

  const catFreq = useMemo(() =>
    Object.entries(cats).map(([k, cat]) => ({
      label: cat.label,
      count: odu.filter(o => o.category === k).length,
      color: cat.color,
    })), [odu, cats]);

  const planetFreq = useMemo(() => {
    const f = {};
    odu.forEach(o => { f[o.planet] = (f[o.planet] || 0) + 1; });
    return Object.entries(f).sort((a, b) => b[1] - a[1])
      .map(([label, count]) => ({ label, count, color: '#7c4dff' }));
  }, [odu]);

  const elementFreq = useMemo(() => {
    const f = {};
    odu.forEach(o => { f[o.element] = (f[o.element] || 0) + 1; });
    return Object.entries(f).sort((a, b) => b[1] - a[1])
      .map(([label, count]) => ({ label, count, color: ad?.elements?.[label]?.color || '#888' }));
  }, [odu, ad]);

  return (
    <div className="tab-content">
      <div className="page-header">
        <h2 className="page-title">IFA Analysis Overview</h2>
        <p className="page-desc">
          The 16 principal Odu Ifa are simultaneously the <strong>16 Laws of Knowledge (LOKs)</strong> — the Laws of Everything (LawoE) — that govern all fields and disciplines in IFA Mathematics (Consciousness Mathematics). This tab analyzes their axioms, STEAMSEX fields, domains, and elemental associations.
        </p>
      </div>

      <div className="stat-grid">
        <StatCard label="Laws of Knowledge" value="16" sub="LOKs · LawoE" color="#c9a227" />
        <StatCard label="Total Odu" value="256" sub="16 × 16 combinations" color={PRIMARY} />
        <StatCard label="Dual Pairs" value="8" sub="Category axes" color="#2d9e6b" />
        <StatCard label="IFA Axioms" value={axiomFreq.length} sub="Unique principles" color="#7c4dff" />
        <StatCard label="STEAMSEX Fields" value={steamsexFreq.length} sub="Unique disciplines" color="#e9498a" />
        <StatCard label="Planets" value={planetFreq.length} sub="Celestial bodies" color="#5e72b4" />
      </div>

      <div className="charts-grid">
        <BarChart data={axiomFreq}   title="Axiom Frequency (across 16 Odu)" />
        <BarChart data={steamsexFreq} title="STEAMSEX Field Frequency" />
        <BarChart data={catFreq}     title="Category Distribution" />
        <BarChart data={planetFreq}  title="Planetary Associations" />
      </div>

      <div className="lok-section">
        <h3 className="section-label">16 Laws of Knowledge — Oju Odu Ifa Mẹrìndínlógún</h3>
        <div className="lok-grid">
          {odu.map(o => {
            const cc = CAT_COLORS[o.category] || '#888';
            return (
              <div key={o.id} className="lok-item" style={{ borderLeftColor: cc }}>
                <div className="lok-num" style={{ color: cc }}>LOK {o.id}</div>
                <div className="lok-name">{o.name}</div>
                <div className="lok-meji">{o.meji}</div>
                <OduCode code={o.code} size="sm" />
              </div>
            );
          })}
        </div>
      </div>

      <div className="element-grid">
        <h3 className="section-label">Elemental Associations</h3>
        <div className="elem-tiles">
          {odu.map(o => {
            const elemColor = ad?.elements?.[o.element]?.color || '#888';
            return (
              <div key={o.id} className="elem-tile" style={{ borderColor: CAT_COLORS[o.category] }}>
                <div className="et-code"><OduCode code={o.code} size="sm" /></div>
                <div className="et-name" style={{ color: CAT_COLORS[o.category] }}>{o.name}</div>
                <div className="et-elem" style={{ color: elemColor }}>{o.element}</div>
                <div className="et-planet">{o.planet}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// ANALYZER TAB
// ════════════════════════════════════════════════════════════
function AnalyzerTab({ odu, cats, ad }) {
  const [selId, setSelId] = useState(1);
  const o = odu.find(x => x.id === selId) || odu[0];
  const catColor = CAT_COLORS[o.category] || PRIMARY;
  const axiomDefs = ad?.axioms || {};
  const steamDefs = ad?.steamsexFields || {};
  const dualOdu = odu.find(x => x.id === o.dual);

  // Compute rank among 16 (by energy content = count of 1-bits)
  const energyCount = o.code.split('').filter(b => b === '1').length;
  const anegyCount  = 4 - energyCount;

  return (
    <div className="tab-content">
      <div className="analyzer-header">
        <div>
          <label className="field-label">Select Odu</label>
          <select
            className="odu-select"
            value={selId}
            onChange={e => setSelId(+e.target.value)}
          >
            {odu.map(x => (
              <option key={x.id} value={x.id}>{x.name} — {x.meji}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="acard" style={{ '--cat': catColor }}>
        {/* ── Card head ── */}
        <div className="acard-head" style={{ borderBottomColor: catColor }}>
          <div className="acard-id">
            <OduCode code={o.code} size="lg" />
          </div>
          <div className="acard-titles">
            <h2 className="acard-name">{o.name}</h2>
            <div className="acard-meji">{o.meji}</div>
            <div className="acard-yoruba">{o.yoruba}</div>
          </div>
          <div className="acard-meta">
            <span className="badge" style={{ background: catColor }}>
              {cats[o.category]?.label}
            </span>
            <div className="meta-row">
              <span className="meta-lbl">IFABit</span>
              <span className="meta-val mono">{o.code}</span>
            </div>
            <div className="meta-row">
              <span className="meta-lbl">LOK</span>
              <span className="meta-val" style={{ color: '#c9a227' }}>Law #{o.id} of 16</span>
            </div>
            <div className="meta-row">
              <span className="meta-lbl">Rank</span>
              <span className="meta-val">#{o.id} / 16</span>
            </div>
            <div className="meta-row">
              <span className="meta-lbl">Element</span>
              <span className="meta-val">{o.element}</span>
            </div>
            <div className="meta-row">
              <span className="meta-lbl">Planet</span>
              <span className="meta-val">{o.planet}</span>
            </div>
          </div>
        </div>

        {/* ── Energy/Anergy balance ── */}
        <div className="acard-section">
          <div className="sec-label">Energy–Anergy Balance</div>
          <div className="balance-bar">
            <div className="bal-seg ogbe-seg" style={{ flex: energyCount }}>
              <span>{energyCount} Energy (O)</span>
            </div>
            <div className="bal-seg oyeku-seg" style={{ flex: anegyCount }}>
              <span>{anegyCount} Anergy (|)</span>
            </div>
          </div>
          <div className="balance-note">
            {energyCount === 4 ? 'Pure Energy — maximum creative force'
              : anegyCount === 4 ? 'Pure Anergy — maximum receptive void'
              : energyCount > anegyCount ? 'Energy-dominant — active, outward expression'
              : energyCount < anegyCount ? 'Anergy-dominant — receptive, inward depth'
              : 'Perfectly balanced — equal Energy and Anergy'}
          </div>
        </div>

        {/* ── Meaning ── */}
        <div className="acard-section">
          <div className="sec-label">Meaning</div>
          <p className="acard-meaning">{o.meaning}</p>
        </div>

        {/* ── Domains ── */}
        <div className="acard-section">
          <div className="sec-label">Domains ({o.domains.length})</div>
          <div className="tag-cloud">
            {o.domains.map(d => (
              <span key={d} className="tag tag-domain">{d}</span>
            ))}
          </div>
        </div>

        {/* ── Axioms ── */}
        <div className="acard-section">
          <div className="sec-label">IFA Axioms ({o.axioms.length})</div>
          <div className="axiom-list">
            {o.axioms.map(a => {
              const def = axiomDefs[a] || {};
              return (
                <div key={a} className="axiom-item" style={{ borderLeftColor: def.color || '#555' }}>
                  <div className="axiom-name" style={{ color: def.color || '#ccc' }}>
                    {def.symbol && <span className="axiom-sym">{def.symbol}</span>} {a}
                  </div>
                  {def.def && <div className="axiom-def">{def.def}</div>}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── STEAMSEX ── */}
        <div className="acard-section">
          <div className="sec-label">STEAMSEX Fields ({o.steamsex.length})</div>
          <div className="tag-cloud">
            {o.steamsex.map(s => {
              const def = steamDefs[s] || {};
              return (
                <span
                  key={s} className="tag tag-steam"
                  style={{ borderColor: def.color || PRIMARY, color: def.color || PRIMARY, background: (def.color || PRIMARY) + '1a' }}
                >
                  {def.icon} {s}
                </span>
              );
            })}
          </div>
        </div>

        {/* ── Dual pair ── */}
        {dualOdu && (
          <div className="acard-section">
            <div className="sec-label">Dual Pair</div>
            <div className="dual-row">
              <div className="dual-self">
                <OduCode code={o.code} size="md" />
                <span style={{ color: catColor, fontWeight: 700 }}>{o.name}</span>
              </div>
              <div className="dual-arrow">⟷</div>
              <div className="dual-partner">
                <OduCode code={dualOdu.code} size="md" />
                <span style={{ color: CAT_COLORS[dualOdu.category], fontWeight: 700 }}>{dualOdu.name}</span>
              </div>
            </div>
            <div className="dual-note">
              {cats[o.category]?.desc}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// COMPARE TAB
// ════════════════════════════════════════════════════════════
function CompareTab({ odu, cats, ad }) {
  const [leftId,  setLeftId]  = useState(1);
  const [rightId, setRightId] = useState(2);
  const L = odu.find(o => o.id === leftId)  || odu[0];
  const R = odu.find(o => o.id === rightId) || odu[1];
  const axiomDefs = ad?.axioms || {};
  const steamDefs = ad?.steamsexFields || {};

  const sharedAxioms  = L.axioms.filter(a => R.axioms.includes(a));
  const sharedSteam   = L.steamsex.filter(s => R.steamsex.includes(s));
  const sharedDomains = L.domains.filter(d => R.domains.includes(d));
  const isSame = L.id === R.id;
  const isDual = L.dual === R.id;

  function OduPanel({ o, shared }) {
    const cc = CAT_COLORS[o.category] || PRIMARY;
    const energy = o.code.split('').filter(b => b === '1').length;
    return (
      <div className="cp-panel">
        <div className="cp-head" style={{ borderBottomColor: cc }}>
          <OduCode code={o.code} size="md" />
          <div className="cp-names">
            <div className="cp-name" style={{ color: cc }}>{o.name}</div>
            <div className="cp-meji">{o.meji}</div>
          </div>
          <span className="badge" style={{ background: cc }}>{cats[o.category]?.label}</span>
        </div>

        <div className="cp-body">
          <div className="cp-row">
            <span className="cp-lbl">IFABit</span>
            <span className="mono">{o.code}</span>
          </div>
          <div className="cp-row">
            <span className="cp-lbl">Element</span>
            <span>{o.element}</span>
          </div>
          <div className="cp-row">
            <span className="cp-lbl">Planet</span>
            <span>{o.planet}</span>
          </div>
          <div className="cp-row">
            <span className="cp-lbl">Energy bits</span>
            <span style={{ color: '#c9a227', fontWeight: 700 }}>{energy} / 4</span>
          </div>

          <div className="cp-section-label">Domains</div>
          <div className="tag-cloud mini">
            {o.domains.map(d => (
              <span key={d} className={`tag ${shared.domains.includes(d) ? 'tag-shared' : 'tag-domain'}`}>{d}</span>
            ))}
          </div>

          <div className="cp-section-label">Axioms</div>
          <div className="tag-cloud mini">
            {o.axioms.map(a => (
              <span key={a} className={`tag ${shared.axioms.includes(a) ? 'tag-shared' : ''}`}
                style={{ borderColor: axiomDefs[a]?.color || '#555', color: axiomDefs[a]?.color || '#888' }}>
                {axiomDefs[a]?.symbol} {a}
              </span>
            ))}
          </div>

          <div className="cp-section-label">STEAMSEX</div>
          <div className="tag-cloud mini">
            {o.steamsex.map(s => (
              <span key={s} className={`tag ${shared.steam.includes(s) ? 'tag-shared' : 'tag-steam'}`}
                style={shared.steam.includes(s) ? {} : { borderColor: steamDefs[s]?.color || '#555', color: steamDefs[s]?.color || '#888' }}>
                {steamDefs[s]?.icon} {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const shared = { axioms: sharedAxioms, steam: sharedSteam, domains: sharedDomains };

  return (
    <div className="tab-content">
      <div className="compare-header">
        <div className="compare-selects">
          <div>
            <label className="field-label">Left Odu</label>
            <select className="odu-select" value={leftId} onChange={e => setLeftId(+e.target.value)}>
              {odu.map(o => <option key={o.id} value={o.id}>{o.name}</option>)}
            </select>
          </div>
          <div className="vs-badge">vs</div>
          <div>
            <label className="field-label">Right Odu</label>
            <select className="odu-select" value={rightId} onChange={e => setRightId(+e.target.value)}>
              {odu.map(o => <option key={o.id} value={o.id}>{o.name}</option>)}
            </select>
          </div>
        </div>

        {isSame && (
          <div className="compare-note note-info">Same Odu selected — showing full self-analysis</div>
        )}
        {isDual && (
          <div className="compare-note note-dual">Dual pair — these Odu are complementary opposites in the {cats[L.category]?.label} axis</div>
        )}
      </div>

      <div className="compare-layout">
        <OduPanel o={L} shared={shared} />

        {/* Shared column */}
        <div className="shared-col">
          <div className="shared-title">Shared Properties</div>

          {sharedAxioms.length > 0 && (
            <div className="shared-group">
              <div className="shared-sec-lbl">Axioms ({sharedAxioms.length})</div>
              {sharedAxioms.map(a => (
                <div key={a} className="shared-item" style={{ color: axiomDefs[a]?.color || '#ccc' }}>
                  {axiomDefs[a]?.symbol} {a}
                </div>
              ))}
            </div>
          )}
          {sharedSteam.length > 0 && (
            <div className="shared-group">
              <div className="shared-sec-lbl">STEAMSEX ({sharedSteam.length})</div>
              {sharedSteam.map(s => (
                <div key={s} className="shared-item" style={{ color: steamDefs[s]?.color || '#ccc' }}>
                  {steamDefs[s]?.icon} {s}
                </div>
              ))}
            </div>
          )}
          {sharedDomains.length > 0 && (
            <div className="shared-group">
              <div className="shared-sec-lbl">Domains ({sharedDomains.length})</div>
              {sharedDomains.map(d => (
                <div key={d} className="shared-item">{d}</div>
              ))}
            </div>
          )}
          {!sharedAxioms.length && !sharedSteam.length && !sharedDomains.length && (
            <div className="shared-none">No shared properties</div>
          )}

          {/* Similarity score */}
          <div className="similarity">
            <div className="sim-label">Overlap Score</div>
            <div className="sim-val">
              {sharedAxioms.length + sharedSteam.length + sharedDomains.length}
            </div>
            <div className="sim-sub">shared properties</div>
          </div>
        </div>

        <OduPanel o={R} shared={shared} />
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// PATTERNS TAB
// ════════════════════════════════════════════════════════════
function PatternsTab({ odu, cats, ad }) {
  const [filterType,  setFilterType]  = useState('axiom');
  const [filterValue, setFilterValue] = useState('');
  const axiomDefs = ad?.axioms || {};
  const steamDefs = ad?.steamsexFields || {};

  const allAxioms   = useMemo(() => [...new Set(odu.flatMap(o => o.axioms))].sort(), [odu]);
  const allSteam    = useMemo(() => [...new Set(odu.flatMap(o => o.steamsex))].sort(), [odu]);
  const allDomains  = useMemo(() => [...new Set(odu.flatMap(o => o.domains))].sort(), [odu]);
  const allElements = useMemo(() => [...new Set(odu.map(o => o.element))].sort(), [odu]);
  const allPlanets  = useMemo(() => [...new Set(odu.map(o => o.planet))].sort(), [odu]);
  const allCats     = useMemo(() => Object.entries(cats).map(([k, v]) => ({ key: k, label: v.label })), [cats]);

  const options = useMemo(() => {
    if (filterType === 'axiom')    return allAxioms.map(a => ({ value: a, label: `${axiomDefs[a]?.symbol || ''} ${a}`.trim() }));
    if (filterType === 'steamsex') return allSteam.map(s => ({ value: s, label: `${steamDefs[s]?.icon || ''} ${s}`.trim() }));
    if (filterType === 'domain')   return allDomains.map(d => ({ value: d, label: d }));
    if (filterType === 'element')  return allElements.map(e => ({ value: e, label: e }));
    if (filterType === 'planet')   return allPlanets.map(p => ({ value: p, label: p }));
    if (filterType === 'category') return allCats.map(c => ({ value: c.key, label: c.label }));
    return [];
  }, [filterType, allAxioms, allSteam, allDomains, allElements, allPlanets, allCats, axiomDefs, steamDefs]);

  useEffect(() => { setFilterValue(options[0]?.value || ''); }, [filterType]);

  const matches = useMemo(() => {
    if (!filterValue) return [];
    return odu.filter(o => {
      if (filterType === 'axiom')    return o.axioms.includes(filterValue);
      if (filterType === 'steamsex') return o.steamsex.includes(filterValue);
      if (filterType === 'domain')   return o.domains.includes(filterValue);
      if (filterType === 'element')  return o.element === filterValue;
      if (filterType === 'planet')   return o.planet === filterValue;
      if (filterType === 'category') return o.category === filterValue;
      return false;
    });
  }, [odu, filterType, filterValue]);

  const currentOpt = options.find(o => o.value === filterValue);
  const filterColor = filterType === 'axiom' ? axiomDefs[filterValue]?.color
    : filterType === 'steamsex' ? steamDefs[filterValue]?.color
    : null;

  return (
    <div className="tab-content">
      <div className="page-header">
        <h2 className="page-title">Pattern Explorer</h2>
        <p className="page-desc">Filter the 16 principal Odu by axiom, STEAMSEX field, domain, element, planet, or category to discover structural patterns.</p>
      </div>

      <div className="pattern-filters">
        <div className="filter-group">
          <label className="field-label">Filter type</label>
          <select className="odu-select" value={filterType} onChange={e => setFilterType(e.target.value)}>
            <option value="axiom">IFA Axiom</option>
            <option value="steamsex">STEAMSEX Field</option>
            <option value="domain">Domain</option>
            <option value="element">Element</option>
            <option value="planet">Planet</option>
            <option value="category">Category</option>
          </select>
        </div>
        <div className="filter-group">
          <label className="field-label">Value</label>
          <select className="odu-select" value={filterValue} onChange={e => setFilterValue(e.target.value)}>
            {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
        <div className="filter-result-info" style={{ color: filterColor || 'var(--text-muted)' }}>
          <span className="filter-match-count">{matches.length}</span>
          <span> / 16 Odu match</span>
        </div>
      </div>

      {/* Pattern annotation */}
      {filterType === 'axiom' && axiomDefs[filterValue] && (
        <div className="pattern-annotation" style={{ borderLeftColor: axiomDefs[filterValue].color }}>
          <span className="ann-sym" style={{ color: axiomDefs[filterValue].color }}>
            {axiomDefs[filterValue].symbol}
          </span>
          <div>
            <div className="ann-name" style={{ color: axiomDefs[filterValue].color }}>{filterValue}</div>
            <div className="ann-def">{axiomDefs[filterValue].def}</div>
          </div>
        </div>
      )}
      {filterType === 'steamsex' && steamDefs[filterValue] && (
        <div className="pattern-annotation" style={{ borderLeftColor: steamDefs[filterValue].color }}>
          <span className="ann-sym" style={{ color: steamDefs[filterValue].color }}>
            {steamDefs[filterValue].icon}
          </span>
          <div>
            <div className="ann-name" style={{ color: steamDefs[filterValue].color }}>{filterValue}</div>
          </div>
        </div>
      )}

      {/* Results grid */}
      <div className="patterns-grid">
        {matches.map(o => {
          const cc = CAT_COLORS[o.category] || PRIMARY;
          return (
            <div key={o.id} className="pcard" style={{ '--cc': cc }}>
              <div className="pcard-head" style={{ borderBottomColor: cc }}>
                <OduCode code={o.code} size="sm" />
                <div className="pcard-name" style={{ color: cc }}>{o.name}</div>
                <span className="badge sm" style={{ background: cc }}>{cats[o.category]?.label}</span>
              </div>
              <div className="pcard-body">
                <div className="pcard-elem">{o.element} · {o.planet}</div>
                <div className="tag-cloud mini">
                  {o.axioms.map(a => (
                    <span key={a} className="tag"
                      style={{ borderColor: axiomDefs[a]?.color || '#555', color: axiomDefs[a]?.color || '#888', fontSize: '0.62rem' }}>
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
        {matches.length === 0 && (
          <div className="no-match">No Odu match this filter.</div>
        )}
      </div>

      {/* Non-matching (dimmed) */}
      {matches.length > 0 && matches.length < 16 && (
        <div className="non-match-section">
          <div className="non-match-label">Not matching ({16 - matches.length})</div>
          <div className="non-match-row">
            {odu.filter(o => !matches.includes(o)).map(o => (
              <div key={o.id} className="nm-chip" style={{ borderColor: CAT_COLORS[o.category] + '55', color: 'var(--text-muted)' }}>
                <OduCode code={o.code} size="sm" />
                <span>{o.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// ROOT APP
// ════════════════════════════════════════════════════════════
function App() {
  const [oduData,      setOduData]      = useState(null);
  const [analysisData, setAnalysisData] = useState(null);
  const [tab,          setTab]          = useState('Overview');
  const [error,        setError]        = useState(null);

  useEffect(() => {
    Promise.all([
      fetch('./data/odu.json').then(r => r.json()),
      fetch('./data/analysis.json').then(r => r.json()),
    ])
      .then(([od, ad]) => { setOduData(od); setAnalysisData(ad); })
      .catch(e => setError(e.message));
  }, []);

  if (error) return <div className="screen-center"><div className="error-msg">{error}</div></div>;
  if (!oduData) return (
    <div className="screen-center">
      <div className="spinner" />
      <div className="loading-txt">Loading Ifanalysis…</div>
    </div>
  );

  const { odu, categories: cats } = oduData;

  return (
    <div className="app">
      <header className="hdr">
        <div className="hdr-inner">
          <div className="brand">
            <div className="brand-glyphs">
              <OduCode code="1001" size="sm" />
              <OduCode code="0110" size="sm" />
            </div>
            <div>
              <div className="brand-name">Ifanalysis</div>
              <div className="brand-sub">IFA Analysis · CENProject</div>
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
        {tab === 'Overview' && <OverviewTab odu={odu} cats={cats} ad={analysisData} />}
        {tab === 'Analyzer' && <AnalyzerTab odu={odu} cats={cats} ad={analysisData} />}
        {tab === 'Compare'  && <CompareTab  odu={odu} cats={cats} ad={analysisData} />}
        {tab === 'Patterns' && <PatternsTab odu={odu} cats={cats} ad={analysisData} />}
      </main>

      <footer className="ftr">
        Ifanalysis · CENProject ·
        <a href="https://toe.cenproject.org/ifa-analysis/" target="_blank" rel="noopener noreferrer">
          toe.cenproject.org/ifa-analysis/
        </a>
      </footer>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
