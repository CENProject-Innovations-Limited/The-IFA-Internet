/* ─────────────────────────────────────────────────────────────────────────────
   Ifa AP Playground — App.jsx
   toe.cenproject.org/ifa-number/ap-playground/
   Arithmetic Progressions in the Amulu Table & Ifalibrium Chart
───────────────────────────────────────────────────────────────────────────── */

const { useState, useMemo } = React;

// ── AP Data ────────────────────────────────────────────────────────────────

const AMULU_APS = [
  {
    id:'am-meji', group:'amulu', category:'content',
    name:'Odu-Meji Diagonal', d:17, color:'#4caf50',
    terms:[1,18,35,52,69,86,103,120,137,154,171,188,205,222,239,256],
    formula:'aₙ = 17n − 16',
    desc:'All 16 Odu-Meji cells — the main anti-diagonal of the Amulu Table. This d=17 progression is the direct numerical backbone of the Ifa determinant formula (det = ad − bc), where each diagonal step adds 17.'
  },
  {
    id:'am-row1', group:'amulu', category:'structural',
    name:'Row 1 — Ogbe (d=1)', d:1, color:'#f0920c',
    terms:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],
    formula:'aₙ = n',
    desc:'The Ogbe primary row — first row of the Amulu Table, read right-to-left (Ogbe-Ogbe → Ogbe-Ofun). Every row is an AP with d=1; this is row 1.'
  },
  {
    id:'am-row8', group:'amulu', category:'structural',
    name:'Row 8 — Òkànràn (d=1)', d:1, color:'#f0920c',
    terms:[113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128],
    formula:'aₙ = 112 + n',
    desc:'Row 8 (Òkànràn primary). All 16 rows have d=1, forming consecutive 16-term blocks: row r → terms 16(r-1)+1 through 16r.'
  },
  {
    id:'am-col-ogbe', group:'amulu', category:'structural',
    name:'Column Ogbe (d=16)', d:16, color:'#f0920c',
    terms:[1,17,33,49,65,81,97,113,129,145,161,177,193,209,225,241],
    formula:'aₙ = 16n − 15',
    desc:'The Ogbe secondary column — rightmost column of the Amulu Table. Every column is an AP with d=16; Ogbe column (n=1) starts at 1.'
  },
  {
    id:'am-col-ofun', group:'amulu', category:'structural',
    name:'Column Ofun (d=16)', d:16, color:'#ec4899',
    terms:[16,32,48,64,80,96,112,128,144,160,176,192,208,224,240,256],
    formula:'aₙ = 16n',
    desc:'The Ofun secondary column — leftmost column of the Amulu Table. All multiples of 16: every Odu-Ofun composition cell.'
  },
  {
    id:'am-diag-sw', group:'amulu', category:'structural',
    name:'↘ Main Diagonal (d=15)', d:15, color:'#14b8d4',
    terms:[16,31,46,61,76,91,106,121,136,151,166,181,196,211,226,241],
    formula:'aₙ = 15n + 1',
    desc:'Top-left to bottom-right visual diagonal of the Amulu Table (Ogbe-Ofun at top-left → Ofun-Ogbe at bottom-right). Every ↘ diagonal has d=15.'
  },
  {
    id:'am-inv-a', group:'amulu', category:'content',
    name:'Inverse Pair A (d=34)', d:34, color:'#ec4899',
    terms:[2,36,70,104,138,172,206,240],
    formula:'aₙ = 34n − 32',
    desc:'Cells where an odd-numbered primary Odu composes with its bitwise inverse (row n odd, col n+1): Ogbe-Oyeku=2, Ìwòrì-Òdí=36, Ìrosùn-Òwónrín=70… Step d=34 = 2×17 — double the Meji diagonal step.'
  },
  {
    id:'am-inv-b', group:'amulu', category:'content',
    name:'Inverse Pair B (d=34)', d:34, color:'#fbbf24',
    terms:[17,51,85,119,153,187,221,255],
    formula:'aₙ = 34n − 17',
    desc:'Cells where an even-numbered primary Odu composes with its bitwise inverse (row n even, col n−1): Oyeku-Ogbe=17, Òdí-Ìwòrì=51, Òwónrín-Ìrosùn=85… Same d=34, offset by 15 from Pair A.'
  },
];

const IFAL_APS = [
  {
    id:'if-meji', group:'ifalibrium', category:'content',
    name:'Meji Row — Self-Ifalibrium (d=1)', d:1, color:'#f0920c',
    terms:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],
    formula:'aₙ = n',
    desc:'All 16 Self-Ifalibrium (Meji) cells across the top row of the Ifalibrium Chart. Ogbe Méjì=1, Òyèkú Méjì=2, … Òfún Méjì=16. A perfect d=1 progression.'
  },
  {
    id:'if-col-ogbe', group:'ifalibrium', category:'structural',
    name:'Ogbe Column Duals (d=1)', d:1, color:'#f0920c',
    terms:[17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
    formula:'aₙ = 16 + n',
    desc:'The 15 dual cells of the Ogbe column (ci=0). Each column in the Ifalibrium Chart has d=1 in its dual section: 15 consecutive integers.'
  },
  {
    id:'if-cross-row1', group:'ifalibrium', category:'structural',
    name:'Cross-Column Row 1 (d=15)', d:15, color:'#14b8d4',
    terms:[17,32,47,62,77,92,107,122,137,152,167,182,197,212,227,242],
    formula:'aₙ = 15n + 2',
    desc:'The first dual row (rowPos=1) read across all 16 columns. Every cross-column row has d=15 — the 15-column dual structure signature of the Ifalibrium Chart.'
  },
  {
    id:'if-cross-row15', group:'ifalibrium', category:'structural',
    name:'Cross-Column Row 15 (d=15)', d:15, color:'#6366f1',
    terms:[31,46,61,76,91,106,121,136,151,166,181,196,211,226,241,256],
    formula:'aₙ = 15n + 16',
    desc:'The last dual row (rowPos=15), the final cell of each column. Ends at Ofun column last dual = 256. This row and the Meji row (1–16) are the boundary rows of the chart.'
  },
  {
    id:'if-diag-sw', group:'ifalibrium', category:'structural',
    name:'↙ Main Diagonal (d=16)', d:16, color:'#8b5cf6',
    terms:[17,33,49,65,81,97,113,129,145,161,177,193,209,225,241],
    formula:'aₙ = 16n + 1',
    desc:'The main ↙ visual diagonal of the dual section (starting top-right, going bottom-left). This is also the Ifa Sequence of all adjacent cells where secondary Odu number = primary + 1.'
  },
  {
    id:'if-diag-nw', group:'ifalibrium', category:'structural',
    name:'↘ Main Diagonal (d=14)', d:14, color:'#64748b',
    terms:[46,60,74,88,102,116,130,144,158,172,186,200,214,228,242],
    formula:'aₙ = 14n + 32',
    desc:'The main ↘ visual diagonal of the dual section. Step d=14 = 15−1, the complement of the d=15 cross-row step. Together d=14 and d=15 are the two interlocking slopes of the Ifalibrium dual section.'
  },
  {
    id:'if-adj-a', group:'ifalibrium', category:'content',
    name:'Adjacent A — col = row+1 (d=16)', d:16, color:'#8b5cf6',
    terms:[17,33,49,65,81,97,113,129,145,161,177,193,209,225,241],
    formula:'aₙ = 16n + 1',
    desc:'All 15 cells where the secondary Odu immediately follows the primary in the Odu Ifa Sequence (col.n = row.n+1). Includes both Major Dual and Ifalibrium-state pairs. d=16 — same as ↙ diagonal.'
  },
  {
    id:'if-adj-b', group:'ifalibrium', category:'content',
    name:'Adjacent B — col = row−1 (d=16)', d:16, color:'#6366f1',
    terms:[32,48,64,80,96,112,128,144,160,176,192,208,224,240,256],
    formula:'aₙ = 16n + 16',
    desc:'All 15 cells where the secondary Odu immediately precedes the primary (col.n = row.n−1). d=16 — multiples of 16, ending at 256 (Ofun Méjì in the Amulu Table).'
  },
  {
    id:'if-major-a', group:'ifalibrium', category:'content',
    name:'Major Dual A (d=32)', d:32, color:'#e040fb',
    terms:[17,49,81,113,145,177,209,241],
    formula:'aₙ = 32n − 15',
    desc:'Major Dual-Ifalibrium cells for odd-row inverse pairs (Ogbe⇔Oyeku=17, Ìwòrì⇔Òdí=49, Ìrosùn⇔Òwónrín=81…). d=32 = 2×16 = 2×(column step).'
  },
  {
    id:'if-major-b', group:'ifalibrium', category:'content',
    name:'Major Dual B (d=32)', d:32, color:'#c026d3',
    terms:[32,64,96,128,160,192,224,256],
    formula:'aₙ = 32n',
    desc:'Major Dual-Ifalibrium cells for even-row inverse pairs (Oyeku⇔Ogbe=32, Òdí⇔Ìwòrì=64…). All multiples of 32. d=32.'
  },
  {
    id:'if-ifal-a', group:'ifalibrium', category:'content',
    name:'Ifalibrium A (d=32)', d:32, color:'#4caf50',
    terms:[33,65,97,129,161,193,225],
    formula:'aₙ = 32n + 1',
    desc:'Non-inverse adjacent Ifalibrium cells for even-row primary (Oyeku-Ìwòrì=33, Òdí-Ìrosùn=65…). d=32, 7 terms, offset +16 from Major Dual A.'
  },
  {
    id:'if-ifal-b', group:'ifalibrium', category:'content',
    name:'Ifalibrium B (d=32)', d:32, color:'#22c55e',
    terms:[48,80,112,144,176,208,240],
    formula:'aₙ = 32n + 16',
    desc:'Non-inverse adjacent Ifalibrium cells for odd-row primary (Ìwòrì-Oyeku=48, Ìrosùn-Òdí=80…). d=32, 7 terms, offset +16 from Major Dual B.'
  },
];

const ALL_APS = [...AMULU_APS, ...IFAL_APS];

// ── Grid helpers ───────────────────────────────────────────────────────────

// Amulu: cell(rowN, colN) = (rowN-1)*16 + colN
// Grid: rows 1-16 (Ogbe→Ofun), cols visual 0-15 (left=Ofun/n=16, right=Ogbe/n=1)
//   colN = 16 - visualCol
function amulCellNum(rowN, visualCol) {
  const colN = 16 - visualCol;
  return (rowN - 1) * 16 + colN;
}

// Ifalibrium: rowPos=0 → ci+1; rowPos>0 → 16+ci*15+rowPos
// Grid: rows 0-15 (rowPos), cols visual 0-15 (left=Ofun ci=15, right=Ogbe ci=0)
//   ci = 15 - visualCol
function ifalCellNum(rowPos, visualCol) {
  const ci = 15 - visualCol;
  return rowPos === 0 ? ci + 1 : 16 + ci * 15 + rowPos;
}

// ODU names for axis labels
const ODU_SHORT = ['Ogb','Oyè','Ìwò','Òdí','Ìro','Òwó','Òbà','Òkà','Ògú','Òsá','Ìká','Òtú','Òtú','Ìrè','Òsè','Òfú'];

// ── App ────────────────────────────────────────────────────────────────────

function APPlaygroundApp() {
  const [selectedId, setSelectedId] = useState('am-meji');

  const selected = useMemo(() => ALL_APS.find(a => a.id === selectedId) || ALL_APS[0], [selectedId]);
  const termSet  = useMemo(() => new Set(selected.terms), [selected]);

  // AP properties
  const n  = selected.terms.length;
  const a1 = selected.terms[0];
  const an = selected.terms[n - 1];
  const sum = Math.round(n / 2 * (a1 + an));

  const isAmulu = selected.group === 'amulu';

  // Build grid cells
  const amulGrid = useMemo(() => {
    const cells = [];
    for (let rowN = 1; rowN <= 16; rowN++) {
      for (let vc = 0; vc < 16; vc++) {
        const num = amulCellNum(rowN, vc);
        cells.push({ rowN, vc, num, active: termSet.has(num) });
      }
    }
    return cells;
  }, [termSet]);

  const ifalGrid = useMemo(() => {
    const cells = [];
    for (let rp = 0; rp <= 15; rp++) {
      for (let vc = 0; vc < 16; vc++) {
        const num = ifalCellNum(rp, vc);
        cells.push({ rp, vc, num, active: termSet.has(num) });
      }
    }
    return cells;
  }, [termSet]);

  const grid = isAmulu ? amulGrid : ifalGrid;

  return (
    <div className="app-root">
      {/* TOP BAR */}
      <div className="app-bar">
        <a href="../" className="app-bar__back">← IFA Number</a>
        <span className="app-bar__title">Ifa AP Playground</span>
        <span className="app-bar__sub">Arithmetic Progressions in the IFA Matrix</span>
      </div>

      {/* HEADER */}
      <div className="app-main">
        <div className="app-header">
          <div className="app-header__eyebrow">IFA Number Platform · NumoE</div>
          <div className="app-header__title">IfaSequence: Ifa Arithmetic Progression Playground</div>
          <div className="app-header__body">
            An <strong>Ifa Arithmetic Progression (Ifa AP)</strong> is a meta-sequence of Ifanums
            a₁, a₂, …, aₙ where aₖ = a₁ + (k−1)d for a constant common difference d.
            The <strong>Amulu Table</strong> (256 cells, 16×16) and <strong>Ifalibrium Chart</strong> contain
            rich families of meta-APs encoding the deep meta-mathematical Structure of the Odu Ifa.
            Select a Progression to visualise it on the Grid.
          </div>
        </div>

        {/* LEFT: AP selector */}
        <div className="panel-left">
          <div className="panel-left__group-label">Amulu Table</div>
          {AMULU_APS.map(ap => (
            <button
              key={ap.id}
              className={`ap-btn${selectedId === ap.id ? ' ap-btn--active' : ''}`}
              onClick={() => setSelectedId(ap.id)}
            >
              <span className="ap-btn__dot" style={{background: ap.color}} />
              <span className="ap-btn__info">
                <span className="ap-btn__name">{ap.name}</span>
                <span className="ap-btn__meta">d = {ap.d} · {ap.terms.length} terms</span>
              </span>
            </button>
          ))}
          <div className="panel-left__group-label" style={{marginTop:'8px'}}>Ifalibrium Chart</div>
          {IFAL_APS.map(ap => (
            <button
              key={ap.id}
              className={`ap-btn${selectedId === ap.id ? ' ap-btn--active' : ''}`}
              onClick={() => setSelectedId(ap.id)}
            >
              <span className="ap-btn__dot" style={{background: ap.color}} />
              <span className="ap-btn__info">
                <span className="ap-btn__name">{ap.name}</span>
                <span className="ap-btn__meta">d = {ap.d} · {ap.terms.length} terms</span>
              </span>
            </button>
          ))}
        </div>

        {/* CENTER: grid + sequence */}
        <div className="panel-center">
          <div className="grid-header">
            <div>
              <div className="grid-header__title">
                {isAmulu ? 'Amulu Table (16×16)' : 'Ifalibrium Chart (16×16)'}
              </div>
              <div className="grid-header__sub" style={{color: selected.color}}>
                {selected.name} — d = {selected.d}
              </div>
            </div>
          </div>

          {/* Axis labels (top) — RTL: Ofun (left, vc=0) → Ogbe (right, vc=15) */}
          <div style={{display:'flex', paddingLeft:'0px', marginBottom:'2px', gap:'2px', paddingRight:'0px'}}>
            {Array.from({length:16},(_,vc) => (
              <div key={vc} style={{flex:1, textAlign:'center', fontSize:'0.42rem', color:'var(--t3)', fontFamily:'var(--fm)'}}>
                {ODU_SHORT[15 - vc]}
              </div>
            ))}
          </div>

          {/* Grid */}
          <div className="mini-grid-scroll">
          <div className="mini-grid">
            {grid.map((cell, i) => (
              <div
                key={i}
                className={`mini-cell${cell.active ? ' mini-cell--active mini-cell--bright' : ''}`}
                style={cell.active ? {
                  '--cell-color': selected.color,
                  background: selected.color + '33',
                  borderColor: selected.color + '88',
                } : {}}
              >
                <span className="mini-cell__tip">{cell.num}</span>
              </div>
            ))}
          </div>
          </div>{/* end mini-grid-scroll */}

          {/* Legend */}
          <div style={{display:'flex', gap:'14px', fontSize:'0.7rem', color:'var(--t3)', marginBottom:'20px', flexWrap:'wrap'}}>
            <span>
              <span style={{display:'inline-block', width:'10px', height:'10px', borderRadius:'2px', background:selected.color+'44', border:`1px solid ${selected.color}88`, marginRight:'4px', verticalAlign:'middle'}} />
              AP cells ({n})
            </span>
            <span>
              <span style={{display:'inline-block', width:'10px', height:'10px', borderRadius:'2px', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.07)', marginRight:'4px', verticalAlign:'middle'}} />
              Other cells
            </span>
            <span style={{fontStyle:'italic'}}>Hover a cell to see its number</span>
          </div>

          {/* Sequence */}
          <div className="seq-label">Sequence — a₁, a₂, …, a{n}</div>
          <div className="seq-terms">
            {selected.terms.map((t, i) => (
              <span
                key={i}
                className="seq-term"
                style={{color: selected.color, borderColor: selected.color + '55', background: selected.color + '18'}}
              >
                {t}
              </span>
            ))}
          </div>

          {/* Formula */}
          <div style={{marginTop:'8px'}}>
            <div className="seq-label">Formula</div>
            <div className="prop-formula" style={{marginTop:'4px'}}>
              {selected.formula}
              <br />
              Sₙ = n/2 × (a₁ + aₙ) = <strong style={{color: selected.color}}>{sum}</strong>
            </div>
          </div>
        </div>

        {/* RIGHT: properties */}
        <div className="panel-right">
          <div className="props-title">AP Properties</div>

          <div className="prop-row">
            <div className="prop-key">Common Difference</div>
            <div className="prop-val" style={{color: selected.color}}>d = {selected.d}</div>
          </div>

          <div className="prop-row">
            <div className="prop-key">First Term (a₁)</div>
            <div className="prop-val" style={{color:'var(--t1)'}}>{a1}</div>
          </div>

          <div className="prop-row">
            <div className="prop-key">Last Term (aₙ)</div>
            <div className="prop-val" style={{color:'var(--t1)'}}>{an}</div>
          </div>

          <div className="prop-row">
            <div className="prop-key">Number of Terms (n)</div>
            <div className="prop-val" style={{color:'var(--t1)'}}>{n}</div>
          </div>

          <div className="prop-row">
            <div className="prop-key">Sum (Sₙ)</div>
            <div className="prop-val" style={{color: selected.color}}>{sum}</div>
          </div>

          <hr className="prop-divider" />

          <div className="prop-row">
            <div className="prop-key">Formula</div>
            <div className="prop-formula">{selected.formula}</div>
          </div>

          <hr className="prop-divider" />

          <div className="prop-row">
            <div className="prop-key">Chart</div>
            <div className="prop-val--sm" style={{color:'var(--t1)', fontFamily:'var(--fm)', fontSize:'0.82rem'}}>
              {selected.group === 'amulu' ? 'Amulu Table' : 'Ifalibrium Chart'}
            </div>
          </div>

          <div className="prop-row">
            <div className="prop-key">Category</div>
            <span style={{
              display:'inline-block', fontSize:'0.7rem', padding:'2px 10px',
              borderRadius:'12px', fontFamily:'var(--fm)',
              background: selected.category === 'content' ? 'rgba(240,146,12,0.15)' : 'rgba(20,184,212,0.12)',
              color: selected.category === 'content' ? 'var(--amber)' : 'var(--cyan)',
              border: `1px solid ${selected.category === 'content' ? 'rgba(240,146,12,0.3)' : 'rgba(20,184,212,0.25)'}`,
              marginTop:'4px'
            }}>
              {selected.category === 'content' ? '◈ Content-based' : '⊞ Structural'}
            </span>
          </div>

          <hr className="prop-divider" />

          <div className="prop-row">
            <div className="prop-key">Ifa Interpretation</div>
            <div className="prop-desc">{selected.desc}</div>
          </div>

          <hr className="prop-divider" />

          <div style={{fontSize:'0.72rem', color:'var(--t3)', lineHeight:'1.6'}}>
            <strong style={{color:'var(--t2)', display:'block', marginBottom:'4px'}}>Key Relations</strong>
            {selected.d === 17 && <span>d=17 → Meji diagonal step = det(2×2 matrix) structure</span>}
            {selected.d === 34 && <span>d=34 = 2×17 → double the Meji step</span>}
            {selected.d === 32 && <span>d=32 = 2×16 → double the column step</span>}
            {selected.d === 16 && <span>d=16 → column step of the Amulu Table</span>}
            {selected.d === 15 && <span>d=15 → cross-row step, dual-section width − 1</span>}
            {selected.d === 14 && <span>d=14 = 15−1 → complement of cross-row step</span>}
            {selected.d === 1  && <span>d=1 → consecutive Ifanums, simplest AP</span>}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{borderTop:'1px solid var(--br)', padding:'16px 24px', display:'flex', justifyContent:'space-between', flexWrap:'wrap', gap:'8px'}}>
        <span style={{fontSize:'0.72rem', color:'var(--t3)'}}>IFA Number Platform · CENProject · toe.cenproject.org/ifa-number/</span>
        <div style={{display:'flex', gap:'14px'}}>
          <a href="../" style={{fontSize:'0.72rem', color:'var(--t3)'}}>← IFA Number</a>
          <a href="https://ifainternet.org/ifa-matrix/playground/" style={{fontSize:'0.72rem', color:'var(--t3)'}}>IFA Matrix Playground ↗</a>
        </div>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<APPlaygroundApp />);
