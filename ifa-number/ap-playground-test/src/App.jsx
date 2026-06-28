/* ─────────────────────────────────────────────────────────────────────────────
   Ifa AP Playground — App.jsx (TEST)
   Arithmetic Progressions in the Amulu Table & Ifalibrium Chart
───────────────────────────────────────────────────────────────────────────── */

const { useState, useMemo } = React;

// ── Odu 16 ───────────────────────────────────────────────────────────────────
const ODU_16 = [
  { n:'01', name:'Ogbé',      color:'#f0920c' },
  { n:'02', name:'Òyèkú',    color:'#6366f1' },
  { n:'03', name:'Ìwòrì',    color:'#14b8d4' },
  { n:'04', name:'Òdí',      color:'#00c87c' },
  { n:'05', name:'Ìrosùn',   color:'#ef4444' },
  { n:'06', name:'Òwónrín',  color:'#8b5cf6' },
  { n:'07', name:'Òbàrà',    color:'#3b9eff' },
  { n:'08', name:'Òkànràn',  color:'#ec4899' },
  { n:'09', name:'Ògúndá',   color:'#f0920c' },
  { n:'10', name:'Òsá',      color:'#6366f1' },
  { n:'11', name:'Ìká',      color:'#14b8d4' },
  { n:'12', name:'Òtúrúpòn', color:'#00c87c' },
  { n:'13', name:'Òtúrá',    color:'#ef4444' },
  { n:'14', name:'Ìrètè',    color:'#8b5cf6' },
  { n:'15', name:'Òsè',      color:'#3b9eff' },
  { n:'16', name:'Òfún',     color:'#ec4899' },
];

// RTL column order: Ofun (left) → Ogbe (right)
const reversedOdu = [...ODU_16].reverse();

// ── AP Data ─────────────────────────────────────────────────────────────────
// Each entry: { id, tab, name, d, group, color, terms[], formula, desc }
// d = common difference in cell-number space (1–256).
// group = display group label used for left-panel section headers.

// ── d=1 · Horizontal (one per row, 16 total) ────────────────────────────────
// Row r (0-indexed): all 16 cells across secondary Odus Ogbé→Òfún, d_cell=1.
// Terms: r·16+1, r·16+2, …, r·16+16
const _H_D1 = ODU_16.map((odu, r) => {
  const a1 = r * 16 + 1;
  return {
    id:      `amul-h-d1-${String(r + 1).padStart(2, '0')}`,
    tab:     'amulu',
    name:    `${odu.name} AP`,
    d:       1,
    group:   'd=1 · Horizontal',
    color:   odu.color,
    terms:   Array.from({ length: 16 }, (_, k) => a1 + k),
    formula: `aₖ = ${a1} + (k−1),  k = 1…16`,
    desc:    `${odu.name} as primary Odu across all 16 secondary Odus (Ogbé → Òfún). ` +
             `${odu.name}-Ogbé [${a1}] to ${odu.name}-Òfún [${a1 + 15}].`,
  };
});

// ── d=1 · Vertical (one per column, 16 total) ───────────────────────────────
// Col c (0-indexed, secondary Odu): all 16 primary Odus Ogbé→Òfún, d_cell=16.
// Terms: c+1, c+17, c+33, …, c+241
const _V_D1 = ODU_16.map((odu, c) => {
  const a1 = c + 1;
  return {
    id:      `amul-v-d1-${String(c + 1).padStart(2, '0')}`,
    tab:     'amulu',
    name:    `${odu.name} AP`,
    d:       16,
    group:   'd=1 · Vertical',
    color:   odu.color,
    terms:   Array.from({ length: 16 }, (_, k) => a1 + k * 16),
    formula: `aₖ = ${a1} + (k−1)·16,  k = 1…16`,
    desc:    `${odu.name} as secondary Odu across all 16 primary Odus (Ogbé → Òfún). ` +
             `Ogbé-${odu.name} [${a1}] to Òfún-${odu.name} [${a1 + 15 * 16}].`,
  };
});

// ── d=2…15 · Generalised generator ──────────────────────────────────────────
// Roman numerals for start-index labels (I … XV).
const ROMAN = ['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII','XIII','XIV','XV'];

// Horizontal APs for Odu step D: for each of the 16 rows, D start offsets.
// Only includes starts with ≥ 2 terms. d_cell = D.
function makeH(D) {
  return ODU_16.flatMap((odu, r) => {
    const out = [];
    for (let s = 0; s < D; s++) {
      const idx = [];
      for (let i = s; i < 16; i += D) idx.push(i);
      if (idx.length < 2) continue;
      const a1    = r * 16 + s + 1;
      const terms = idx.map(i => r * 16 + i + 1);
      out.push({
        id:      `amul-h-d${D}-${String(r + 1).padStart(2, '0')}-${s + 1}`,
        tab:     'amulu',
        name:    `${odu.name} AP ${ROMAN[s]}`,
        d:       D,
        group:   `d=${D} · Horizontal`,
        color:   odu.color,
        terms,
        formula: `aₖ = ${a1} + (k−1)·${D},  k = 1…${terms.length}`,
        desc:    `${odu.name} as primary Odu, every ${D}th secondary Odu starting ${ODU_16[s].name}. ` +
                 `[${terms[0]}] → [${terms[terms.length - 1]}].`,
      });
    }
    return out;
  });
}

// Vertical APs for Odu step D: for each of the 16 columns, D start offsets.
// Only includes starts with ≥ 2 terms. d_cell = D × 16.
function makeV(D) {
  return ODU_16.flatMap((odu, c) => {
    const out = [];
    for (let s = 0; s < D; s++) {
      const idx = [];
      for (let i = s; i < 16; i += D) idx.push(i);
      if (idx.length < 2) continue;
      const a1    = s * 16 + (c + 1);
      const terms = idx.map(r => r * 16 + (c + 1));
      out.push({
        id:      `amul-v-d${D}-${String(c + 1).padStart(2, '0')}-${s + 1}`,
        tab:     'amulu',
        name:    `${odu.name} AP ${ROMAN[s]}`,
        d:       D * 16,
        group:   `d=${D} · Vertical`,
        color:   odu.color,
        terms,
        formula: `aₖ = ${a1} + (k−1)·${D * 16},  k = 1…${terms.length}`,
        desc:    `${odu.name} as secondary Odu, every ${D}th primary Odu starting ${ODU_16[s].name}. ` +
                 `[${terms[0]}] → [${terms[terms.length - 1]}].`,
      });
    }
    return out;
  });
}

// Build all d=2…15 families in order: H then V for each d.
const _D2_15 = [];
for (let D = 2; D <= 15; D++) {
  _D2_15.push(...makeH(D), ...makeV(D));
}

// ── Right Diagonals: direction ↙ (+1 row, −1 vc), d_cell = 17 per Odu-step ─
// Parameterised by k = r + vc, k = 2..30 → 29 diagonals with ≥2 cells.
// Cell formula: 17r − k.  Main diagonal k=16: the 16 Méjì pairs.
function makeRD(D) {
  const aps = [];
  for (let k = 2; k <= 30; k++) {
    const rStart = Math.max(1, k - 15);
    const rEnd   = Math.min(16, k);
    const L      = rEnd - rStart + 1;
    if (L < 2) continue;

    const vcStart  = k - rStart;
    const priStart = ODU_16[rStart - 1];
    const secStart = ODU_16[15 - vcStart];
    const baseName = priStart.name === secStart.name
      ? `${priStart.name} Méjì`
      : `${priStart.name}-${secStart.name}`;

    for (let s = 0; s < D; s++) {
      const rows = [];
      for (let i = rStart + s; i <= rEnd; i += D) rows.push(i);
      if (rows.length < 2) continue;

      const terms = rows.map(r => 17 * r - k);
      const a1    = terms[0];

      aps.push({
        id:      `amul-rd-d${D}-k${String(k).padStart(2, '0')}-s${s}`,
        tab:     'amulu',
        name:    D === 1 ? `${baseName} AP` : `${baseName} AP ${ROMAN[s]}`,
        d:       17 * D,
        group:   `d=${D} · Diagonal Right`,
        color:   priStart.color,
        terms,
        formula: `aₖ = ${a1} + (k−1)·${17 * D},  k = 1…${terms.length}`,
        desc:    `Right diagonal (↙): ${baseName}${D > 1 ? `, offset ${s + 1}` : ''}. ` +
                 `Primary and secondary Odu advance together. [${terms[0]}] → [${terms[terms.length - 1]}].`,
      });
    }
  }
  return aps;
}

// ── Left Diagonals: direction ↘ (+1 row, +1 vc), d_cell = 15 per Odu-step ──
// Parameterised by m = r − vc, m = −13..15 → 29 diagonals with ≥2 cells.
// Cell formula: 15r + m.  Main diagonal m=1: complementary pairs Ogbé-Òfún → Òfún-Ogbé.
function makeLD(D) {
  const aps = [];
  for (let m = -13; m <= 15; m++) {
    const rStart = Math.max(1, m);
    const rEnd   = Math.min(16, m + 15);
    const L      = rEnd - rStart + 1;
    if (L < 2) continue;

    const vcStart  = rStart - m;
    const priStart = ODU_16[rStart - 1];
    const secStart = ODU_16[15 - vcStart];
    const baseName = `${priStart.name}-${secStart.name}`;
    const mStr     = m >= 0 ? `m${m}` : `mn${-m}`;

    for (let s = 0; s < D; s++) {
      const rows = [];
      for (let i = rStart + s; i <= rEnd; i += D) rows.push(i);
      if (rows.length < 2) continue;

      const terms = rows.map(r => 15 * r + m);
      const a1    = terms[0];

      aps.push({
        id:      `amul-ld-d${D}-${mStr}-s${s}`,
        tab:     'amulu',
        name:    D === 1 ? `${baseName} AP` : `${baseName} AP ${ROMAN[s]}`,
        d:       15 * D,
        group:   `d=${D} · Diagonal Left`,
        color:   priStart.color,
        terms,
        formula: `aₖ = ${a1} + (k−1)·${15 * D},  k = 1…${terms.length}`,
        desc:    `Left diagonal (↘): ${baseName}${D > 1 ? `, offset ${s + 1}` : ''}. ` +
                 `Primary Odu advances, secondary Odu retreats. [${terms[0]}] → [${terms[terms.length - 1]}].`,
      });
    }
  }
  return aps;
}

// Build all diagonal families: d=1 then d=2..15 for RD and LD.
const _RD_D1 = makeRD(1);
const _LD_D1 = makeLD(1);
const _DIAG_D2_15 = [];
for (let D = 2; D <= 15; D++) {
  _DIAG_D2_15.push(...makeRD(D), ...makeLD(D));
}

const AMULU_APS = [..._H_D1, ..._V_D1, ..._D2_15, ..._RD_D1, ..._LD_D1, ..._DIAG_D2_15];

const IFAL_APS = [
  // Ifalibrium Chart progressions go here
];

// ── AP of d-values tab ───────────────────────────────────────────────────────
// The d_cell values of all horizontal AP families (1, 2, …, 15) form an AP.
// The d_cell values of all vertical AP families (16, 32, …, 240) form an AP.
// More AP-of-d-values entries will be added here over time.
const DVAL_APS = [
  {
    id:      'dval-h-amulu',
    tab:     'dval',
    name:    'Horizontal d-values AP',
    d:       1,
    group:   'Amulu Table · Horizontal',
    color:   '#fbbf24',
    terms:   Array.from({ length: 15 }, (_, k) => k + 1),        // [1, 2, …, 15]
    formula: 'aₖ = 1 + (k−1)·1 = k,  k = 1…15',
    desc:    'The common differences of all 15 horizontal Amulu AP families (d=1 … 15) ' +
             'themselves form an AP: 1, 2, 3, …, 15. a₁=1, d=1, n=15, S₁₅=120.',
  },
  {
    id:      'dval-v-amulu',
    tab:     'dval',
    name:    'Vertical d-values AP',
    d:       16,
    group:   'Amulu Table · Vertical',
    color:   '#4ade80',
    terms:   Array.from({ length: 15 }, (_, k) => (k + 1) * 16), // [16, 32, …, 240]
    formula: 'aₖ = 16 + (k−1)·16 = 16k,  k = 1…15',
    desc:    'The common differences of all 15 vertical Amulu AP families (d_cell=16 … 240) ' +
             'themselves form an AP: 16, 32, 48, …, 240. a₁=16, d=16, n=15, S₁₅=1920.',
  },
];

// ── GCD helper ───────────────────────────────────────────────────────────────
function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { const t = b; b = a % b; a = t; } return a; }

// ── Skew / Knight's-Move Directions ─────────────────────────────────────────
// Direction (dr, dvc): Δr rows down, Δvc visual-column steps.
// d_cell = dr×16 − dvc.  Only primitive directions (gcd(dr,|dvc|)=1), excluding
// the four standard families already in AMULU_APS:
//   vertical (1,0), left diagonal (1,+1), right diagonal (1,−1).
function makeSkew(dr, dvc) {
  const d_cell = dr * 16 - dvc;
  const dvcStr = dvc >= 0 ? `+${dvc}` : `${dvc}`;
  const aps = [];

  for (let r = 1; r <= 16; r++) {
    for (let vc = 0; vc <= 15; vc++) {
      // Only process "first" points — no valid predecessor in this direction
      const pr = r - dr, pvc = vc - dvc;
      if (pr >= 1 && pr <= 16 && pvc >= 0 && pvc <= 15) continue;

      // Trace diagonal forward
      const terms = [];
      let cr = r, cvc = vc;
      while (cr >= 1 && cr <= 16 && cvc >= 0 && cvc <= 15) {
        terms.push((cr - 1) * 16 + (16 - cvc));
        cr += dr;
        cvc += dvc;
      }
      if (terms.length < 2) continue;

      const priOdu  = ODU_16[r - 1];
      const secOdu  = ODU_16[15 - vc];
      const pairName = priOdu.name === secOdu.name
        ? `${priOdu.name} Méjì`
        : `${priOdu.name}-${secOdu.name}`;
      const a1 = terms[0];

      aps.push({
        id:      `skew-dr${dr}-dvc${dvc >= 0 ? dvc : 'n' + (-dvc)}-r${r}-vc${vc}`,
        tab:     'skew',
        name:    `${pairName} AP`,
        d:       d_cell,
        group:   `Dir (${dr},${dvcStr}) · d=${d_cell}`,
        color:   priOdu.color,
        terms,
        formula: `aₖ = ${a1} + (k−1)·${d_cell},  k = 1…${terms.length}`,
        desc:    `Skew direction (Δr=${dr}, Δvc=${dvcStr}): ${pairName}. ` +
                 `Primary Odu steps ${dr}, secondary Odu steps ${dvcStr}. ` +
                 `[${terms[0]}] → [${terms[terms.length - 1]}].`,
      });
    }
  }
  return aps;
}

const SKEW_APS = (() => {
  const out = [];
  for (let dr = 1; dr <= 15; dr++) {
    for (let dvc = -15; dvc <= 15; dvc++) {
      if (dr === 1 && dvc ===  0) continue; // vertical primitive (covered)
      if (dr === 1 && dvc ===  1) continue; // left diagonal primitive (covered)
      if (dr === 1 && dvc === -1) continue; // right diagonal primitive (covered)
      if (gcd(dr, Math.abs(dvc)) !== 1) continue;
      out.push(...makeSkew(dr, dvc));
    }
  }
  return out;
})();

const ALL_APS = [...AMULU_APS, ...IFAL_APS, ...DVAL_APS, ...SKEW_APS];

// ── Grid helpers ─────────────────────────────────────────────────────────────

// Amulu Table: vc=0 is leftmost (Ofun), vc=15 is rightmost (Ogbe)
// cell(rowN, vc) = (rowN−1)×16 + (16−vc)
function amulCellNum(rowN, vc) {
  return (rowN - 1) * 16 + (16 - vc);
}

// Ifalibrium Chart: rowPos=0 → ci+1;  rowPos>0 → 16 + ci×15 + rowPos
// Visual cols 0–15: left = Ofun (ci=15), right = Ogbe (ci=0)
function ifalCellNum(rowPos, vc) {
  const ci = 15 - vc;
  return rowPos === 0 ? ci + 1 : 16 + ci * 15 + rowPos;
}

// Returns the secondary Odu for a given principal column index + rowPos
function secondaryAt(ci, rowPos) {
  if (rowPos === 0) return ODU_16[ci];
  let k = 0;
  for (let i = 0; i < 16; i++) {
    if (i === ci) continue;
    if (k === rowPos - 1) return ODU_16[i];
    k++;
  }
}

// ── App ───────────────────────────────────────────────────────────────────────

function APPlaygroundApp() {
  const [activeTab,  setActiveTab]  = useState('amulu');
  const [selectedId, setSelectedId] = useState(null);
  const [tip, setTip] = useState({ visible: false, text: '', x: 0, y: 0 });

  function switchTab(tab) {
    setActiveTab(tab);
    setSelectedId(null);
  }

  const showTip = (text, e) => setTip({ visible: true, text, x: e.clientX + 14, y: e.clientY + 14 });
  const moveTip = (e)       => setTip(t => ({ ...t, x: e.clientX + 14, y: e.clientY + 14 }));
  const hideTip = ()        => setTip(t => ({ ...t, visible: false }));

  const tabAPs   = activeTab === 'amulu' ? AMULU_APS
                 : activeTab === 'dval'  ? DVAL_APS
                 : activeTab === 'skew'  ? SKEW_APS
                 :                        IFAL_APS;
  const selected = useMemo(() => ALL_APS.find(a => a.id === selectedId) || null, [selectedId]);
  const termSet  = useMemo(() => new Set(selected ? selected.terms : []), [selected]);

  // Ifalibrium grid cells — ci stored for tooltip
  const ifalGrid = useMemo(() => {
    const cells = [];
    for (let rp = 0; rp <= 15; rp++)
      for (let vc = 0; vc < 16; vc++) {
        const ci  = 15 - vc;
        const num = ifalCellNum(rp, vc);
        cells.push({ rp, vc, ci, num, active: termSet.has(num) });
      }
    return cells;
  }, [termSet]);

  const gridTitle = activeTab === 'ifalibrium' ? 'Ifalibrium Chart (16×16)'
                 : activeTab === 'dval'        ? 'Amulu Table (16×16) — AP of d-values'
                 : activeTab === 'skew'        ? 'Amulu Table (16×16) — Skew Directions'
                 :                              'Amulu Table (16×16)';

  // Summary numbers for right panel
  const n   = selected ? selected.terms.length : 0;
  const a1  = selected ? selected.terms[0] : null;
  const an  = selected ? selected.terms[n - 1] : null;
  const sum = selected ? Math.round(n / 2 * (a1 + an)) : null;

  // Shared active-cell style helper
  function activeStyle(col) {
    return { '--cell-color': col, background: col + '33', borderColor: col + '88' };
  }

  return (
    <div className="app-root">

      {/* ── Top Bar ──────────────────────────────────────────────────── */}
      <div className="app-bar">
        <a href="../" className="app-bar__back">← IFA Number</a>

        <div className="ap-tabs">
          <button
            className={`ap-tab${activeTab === 'ifaap' ? ' ap-tab--active' : ''}`}
            onClick={() => switchTab('ifaap')}
          >Ifa AP</button>
          <button
            className={`ap-tab${activeTab === 'amulu' ? ' ap-tab--active' : ''}`}
            onClick={() => switchTab('amulu')}
          >Amulu Table</button>
          <button
            className={`ap-tab${activeTab === 'ifalibrium' ? ' ap-tab--active' : ''}`}
            onClick={() => switchTab('ifalibrium')}
          >Ifalibrium Chart</button>
          <button
            className={`ap-tab${activeTab === 'dval' ? ' ap-tab--active' : ''}`}
            onClick={() => switchTab('dval')}
          >AP of d-values</button>
          <button
            className={`ap-tab${activeTab === 'skew' ? ' ap-tab--active' : ''}`}
            onClick={() => switchTab('skew')}
          >Skew Directions</button>
        </div>

        <span className="app-bar__title">Ifa AP Playground</span>
        <span className="app-bar__sub">
          {activeTab === 'ifaap'      ? 'Meta-Structures of Ifa · Ancient Metamathematics'
         : activeTab === 'amulu'      ? 'Arithmetic Progressions in the Amulu Table'
         : activeTab === 'ifalibrium' ? 'Arithmetic Progressions in the Ifalibrium Chart'
         : activeTab === 'skew'       ? 'Skew & Knight\'s-Move APs in the Amulu Table'
         :                             'Arithmetic Progressions of Common Differences'}
        </span>
      </div>

      {/* ── Main layout ──────────────────────────────────────────────── */}
      <div className="app-main">

        {/* Full-width header */}
        <div className="app-header">
          <div className="app-header__eyebrow">IFA Number Platform · NumoE</div>
          <div className="app-header__title">Ifa AP Playground —{' '}
            {activeTab === 'ifaap'      ? 'Ifa Arithmetic Progressions'
           : activeTab === 'amulu'      ? 'Amulu Table'
           : activeTab === 'ifalibrium' ? 'Ifalibrium Chart'
           : activeTab === 'skew'       ? 'Skew Directions'
           :                             'The AP of APs — AP of d-values'}
          </div>
          <div className="app-header__body">
            {activeTab === 'ifaap' ? (
              <>
                <strong>Ifa APs</strong> are the meta-structures of Ifa — universal frameworks for studying,
                modelling, and analysing all fields of knowledge through the ancient metamathematical methods
                of Ifa. Their dual is the <strong>Orisa AP</strong>.
              </>
            ) : activeTab === 'dval' ? (
              <>
                These are <strong>Ifa Meta-APs</strong>: The <strong>Common Differences</strong> of each family of Ifa APs themselves form
                Arithmetic Progressions — <strong>APs of d-values</strong>. These Common Differences are known as <strong>Ifa Differences</strong> or <strong>ToE Differences</strong>. Each entry below
                identifies one such meta-AP, the family it arises from, and highlights its terms
                on the Amulu Table.
              </>
            ) : activeTab === 'skew' ? (
              <>
                <strong>Skew (knight's-move) APs</strong> move across the Amulu Table in a direction
                (Δr, Δvc) where neither Δr nor Δvc is 0 or ±1 simultaneously — directions beyond
                horizontal, vertical, and the two standard diagonals. Each primitive direction
                (Δr, Δvc) with gcd = 1 defines a family of diagonals. Select a progression to
                highlight it on the grid.
              </>
            ) : (
              <>
                An <strong>Ifa Arithmetic Progression (Ifa AP)</strong> is a meta-sequence of Ifanums
                a₁, a₂, …, aₙ where aₖ = a₁ + (k−1)d for a constant common difference d.
                Select a progression from the left panel to highlight it on the grid.
              </>
            )}
          </div>
        </div>

        {/* ── INTRO: Ifa AP overview (ifaap tab only) ─────────────────── */}
        {activeTab === 'ifaap' && (
          <div className="intro-panel">

            <div className="intro-section" style={{ borderLeftColor: 'var(--amber)' }}>
              <div className="intro-eyebrow">Definition</div>
              <h2 className="intro-heading">Ifa Arithmetic Progressions (Ifa AP)</h2>
              <div className="intro-body">
                <p>An <strong>Ifa Arithmetic Progression (Ifa AP)</strong> is a meta-sequence of <strong>Ifanums</strong> — a₁, a₂, …, aₙ — where each term aₖ satisfies a constant common difference d:</p>
                <div className="intro-formula">aₖ = a₁ + (k − 1) · d,&nbsp;&nbsp;&nbsp;k = 1, 2, …, n</div>
                <p>An Ifa AP is any sequence of Odu cells with a constant step — revealing the arithmetic Structure of Odu space.</p>
              </div>
            </div>

            <div className="intro-section" style={{ borderLeftColor: 'var(--cyan)' }}>
              <div className="intro-eyebrow">Role</div>
              <h2 className="intro-heading">Meta-Structures of Ifa</h2>
              <div className="intro-body">
                <p>Ifa APs are the <strong>meta-structures of Ifa</strong>: universal frameworks used to <strong>study, model, and analyse all fields of knowledge</strong> through the ancient metamathematical methods of Ifa. Where conventional mathematics studies progressions in abstract number space, Ifa Metamathematics studies progressions, evolutions, transformations, within the doubly infinite dimensional Odu Space (in 256 Folds) of Energies that underlie all things in existence, including all fields of knowledge.</p>
                <p>Every axis of the Amulu Table yields a distinct family of Ifa APs: horizontal (same primary Odu stepping through secondary Odu), vertical (same secondary Odu stepping through primary Odu), right diagonal (both advancing together, d = 17), left diagonal (primary advancing, secondary retreating, d = 15), and skew / knight's-move directions. Together these families encode all structural laws of Odu relationships.</p>
              </div>
            </div>

            <div className="intro-dual-card">
              <div className="intro-eyebrow" style={{ marginBottom:'16px' }}>Dual Structure</div>
              <div className="intro-dual-grid">
                <div className="intro-dual-col" style={{ borderLeftColor: 'var(--amber)' }}>
                  <div className="intro-dual-title" style={{ color: 'var(--amber)' }}>Ifa AP</div>
                  <div className="intro-body">
                    <p>Traverses Odu Space. Expressed in <strong>IfaLang</strong>. Grounded in the Amulu Table, Ifalibrium Chart, others. The progressive, sequential Arm of Ifa Metamathematics.</p>
                  </div>
                </div>
                <div className="intro-dual-col" style={{ borderLeftColor: 'var(--indigo)' }}>
                  <div className="intro-dual-title" style={{ color: 'var(--indigo)' }}>Orisa AP — Dual</div>
                  <div className="intro-body">
                    <p>The Dual of Ifa AP. Traverses Orisa manifestation patterns. Expressed in <strong>OrisaLang</strong>. The same metamathematical structure viewed through the Orisa Lens.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="intro-section" style={{ borderLeftColor: 'var(--green)' }}>
              <div className="intro-eyebrow">Series</div>
              <h2 className="intro-heading">Ifa Series</h2>
              <div className="intro-body">
                <p>The sum of the terms of an Ifa AP is an <strong>Ifa Series</strong>. For an Ifa AP with first term a₁, last term aₙ, and n terms:</p>
                <div className="intro-formula">Sₙ = n/2 × (a₁ + aₙ)</div>
                <p>Its Dual is the <strong>Orisa Series</strong>. Just as Ifa APs are meta-sequences encoding Odu Structure, Ifa Series encode the cumulative Energy of all Odu in a progression.</p>
              </div>
            </div>

            <div className="intro-section" style={{ borderLeftColor: 'var(--purple)' }}>
              <div className="intro-eyebrow">Navigate</div>
              <h2 className="intro-heading">Explore Ifa APs</h2>
              <div className="intro-body">
                <ul className="intro-list">
                  <li><strong>Amulu Table</strong> — all horizontal, vertical, and diagonal Ifa APs in the 16 × 16 Odu grid ({AMULU_APS.length.toLocaleString()} APs)</li>
                  <li><strong>Skew Directions</strong> — knight's-move and non-standard-axis APs across the Amulu Table ({SKEW_APS.length.toLocaleString()} APs)</li>
                  <li><strong>AP of d-values</strong> — Ifa Meta-APs: the APs formed by the common differences themselves ({DVAL_APS.length.toLocaleString()} APs)</li>
                  <li><strong>Ifalibrium Chart</strong> — Ifa APs in the Ifalibrium Chart ({IFAL_APS.length.toLocaleString()} APs)</li>
                </ul>
                <div className="grand-total">
                  <div className="grand-total__num">{ALL_APS.length.toLocaleString()}</div>
                  <div className="grand-total__label">
                    Grand Total — Ifa Arithmetic Progressions
                    <span className="grand-total__sub">across all tabs · updates automatically as new APs are added</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ── Data tabs: LEFT / CENTER / RIGHT panels ──────────────────── */}
        {activeTab !== 'ifaap' && (<>

        {/* ── LEFT: progression list ──────────────────────────────────── */}
        <div className="panel-left">
          <div className="panel-count">
            <span className="panel-count__num">{tabAPs.length.toLocaleString()}</span>
            <span className="panel-count__label">Arithmetic Progressions</span>
          </div>
          {tabAPs.length === 0 ? (
            <div style={{ fontSize:'0.72rem', color:'var(--t3)', padding:'20px', fontStyle:'italic', lineHeight:'1.7' }}>
              No progressions added yet<br/>for this chart.
            </div>
          ) : (() => {
            let lastGroup = null;
            return tabAPs.map(ap => {
              const showHeader = ap.group && ap.group !== lastGroup;
              if (showHeader) lastGroup = ap.group;
              return (
                <React.Fragment key={ap.id}>
                  {showHeader && (
                    <div className="ap-group-header">{ap.group}</div>
                  )}
                  <button
                    className={`ap-btn${selectedId === ap.id ? ' ap-btn--active' : ''}`}
                    onClick={() => setSelectedId(ap.id)}
                  >
                    <span className="ap-btn__dot" style={{ background: ap.color }} />
                    <span className="ap-btn__info">
                      <span className="ap-btn__name">{ap.name}</span>
                      <span className="ap-btn__meta">d = {ap.d} · {ap.terms.length} terms</span>
                    </span>
                  </button>
                </React.Fragment>
              );
            });
          })()}
        </div>

        {/* ── CENTER: grid + sequence ────────────────────────────────── */}
        <div className="panel-center">
          <div className="grid-header">
            <div>
              <div className="grid-header__title">{gridTitle}</div>
              {selected && (
                <div className="grid-header__sub" style={{ color: selected.color }}>
                  {selected.name} — d = {selected.d}
                </div>
              )}
            </div>
          </div>

          {/* ══ AMULU TABLE — column headers + structured 16×17 grid ══ */}
          {(activeTab === 'amulu' || activeTab === 'dval' || activeTab === 'skew') && (
            <div className="mini-grid-scroll">
              <div className="amul-wrap">

                {/* Column headers: RTL Ofun (left) → Ogbe (right) + corner */}
                <div className="amul-col-headers">
                  {reversedOdu.map(o => (
                    <div key={o.n} className="amul-col-header" style={{ color: o.color }}>
                      <span className="amul-col-header__num">{o.n}</span>
                      <span className="amul-col-header__name">{o.name.slice(0, 5)}</span>
                    </div>
                  ))}
                  <div className="amul-corner">↓ / →</div>
                </div>

                {/* Grid: 16 rows, each = 16 mini-cells + 1 row header */}
                <div className="amul-grid">
                  {ODU_16.map((rowOdu, rowIdx) => (
                    <React.Fragment key={rowIdx}>
                      {reversedOdu.map((colOdu, vc) => {
                        const num      = amulCellNum(rowIdx + 1, vc);
                        const isActive = termSet.has(num);
                        const isMeji   = rowOdu.n === colOdu.n;
                        const tipText  = isMeji
                          ? `${rowOdu.name} Méjì · ${num}`
                          : `${rowOdu.name} × ${colOdu.name} · ${num}`;
                        return (
                          <div
                            key={vc}
                            className={`mini-cell${isActive ? ' mini-cell--active mini-cell--bright' : ''}`}
                            style={isActive && selected ? activeStyle(selected.color) : {}}
                            onMouseEnter={e => showTip(tipText, e)}
                            onMouseMove={moveTip}
                            onMouseLeave={hideTip}
                          />
                        );
                      })}
                      {/* Row header (right side): Ogbe top → Ofun bottom */}
                      <div className="amul-row-header" style={{ color: rowOdu.color }}>
                        <span className="amul-row-header__num">{rowOdu.n}</span>
                        <span className="amul-row-header__name">{rowOdu.name.slice(0, 5)}</span>
                      </div>
                    </React.Fragment>
                  ))}
                </div>

              </div>
            </div>
          )}

          {/* ══ IFALIBRIUM CHART — top axis + flat mini-grid ══ */}
          {activeTab === 'ifalibrium' && (
            <>
              {/* Top axis: RTL Ofun → Ogbe */}
              <div style={{ display:'flex', marginBottom:'2px', gap:'2px' }}>
                {reversedOdu.map((o, i) => (
                  <div key={i} style={{ flex:1, textAlign:'center', fontSize:'0.42rem', color:'var(--t3)', fontFamily:'var(--fm)' }}>
                    {o.name.slice(0, 3)}
                  </div>
                ))}
              </div>
              <div className="mini-grid-scroll">
                <div className="mini-grid">
                  {ifalGrid.map((cell, i) => {
                    const principal = ODU_16[cell.ci];
                    const secondary = secondaryAt(cell.ci, cell.rp);
                    const isMeji    = cell.rp === 0;
                    const tipText   = isMeji
                      ? `${principal.name} Méjì · ${cell.num}`
                      : `${principal.name}-${secondary.name} · ${cell.num}`;
                    return (
                      <div
                        key={i}
                        className={`mini-cell${cell.active ? ' mini-cell--active mini-cell--bright' : ''}`}
                        style={cell.active && selected ? activeStyle(selected.color) : {}}
                        onMouseEnter={e => showTip(tipText, e)}
                        onMouseMove={moveTip}
                        onMouseLeave={hideTip}
                      />
                    );
                  })}
                </div>
              </div>
            </>
          )}

          {/* Legend */}
          <div style={{ display:'flex', gap:'14px', fontSize:'0.7rem', color:'var(--t3)', margin:'8px 0 20px', flexWrap:'wrap' }}>
            {selected ? (
              <span>
                <span style={{ display:'inline-block', width:'10px', height:'10px', borderRadius:'2px', background: selected.color+'44', border:`1px solid ${selected.color}88`, marginRight:'4px', verticalAlign:'middle' }} />
                AP cells ({n})
              </span>
            ) : (
              <span>256 Odu Ifa cells</span>
            )}
            <span style={{ fontStyle:'italic' }}>Hover a cell to see its Odu name</span>
          </div>

          {/* Sequence + formula */}
          {selected && (
            <>
              <div className="seq-label">Sequence — a₁, a₂, …, a{n}</div>
              <div className="seq-terms">
                {selected.terms.map((t, i) => (
                  <span key={i} className="seq-term"
                    style={{ color: selected.color, borderColor: selected.color+'55', background: selected.color+'18' }}>
                    {t}
                  </span>
                ))}
              </div>
              <div style={{ marginTop:'8px' }}>
                <div className="seq-label">Formula</div>
                <div className="prop-formula" style={{ marginTop:'4px' }}>
                  {selected.formula}
                  <br />
                  Sₙ = n/2 × (a₁ + aₙ) = <strong style={{ color: selected.color }}>{sum}</strong>
                </div>
              </div>
            </>
          )}
        </div>

        {/* ── RIGHT: AP properties ───────────────────────────────────── */}
        <div className="panel-right">
          <div className="props-title">AP Properties</div>
          {!selected ? (
            <div style={{ fontSize:'0.72rem', color:'var(--t3)', fontStyle:'italic', marginTop:'8px' }}>
              No progression selected.
            </div>
          ) : (
            <>
              <div className="prop-row">
                <div className="prop-key">Common Difference</div>
                <div className="prop-val" style={{ color: selected.color }}>d = {selected.d}</div>
              </div>
              <div className="prop-row">
                <div className="prop-key">First Term (a₁)</div>
                <div className="prop-val" style={{ color:'var(--t1)' }}>{a1}</div>
              </div>
              <div className="prop-row">
                <div className="prop-key">Last Term (aₙ)</div>
                <div className="prop-val" style={{ color:'var(--t1)' }}>{an}</div>
              </div>
              <div className="prop-row">
                <div className="prop-key">Number of Terms (n)</div>
                <div className="prop-val" style={{ color:'var(--t1)' }}>{n}</div>
              </div>
              <div className="prop-row">
                <div className="prop-key">Sum (Sₙ)</div>
                <div className="prop-val" style={{ color: selected.color }}>{sum}</div>
              </div>
              <hr className="prop-divider" />
              <div className="prop-row">
                <div className="prop-key">Formula</div>
                <div className="prop-formula">{selected.formula}</div>
              </div>
              <hr className="prop-divider" />
              <div className="prop-row">
                <div className="prop-key">Ifa Interpretation</div>
                <div className="prop-desc">{selected.desc}</div>
              </div>
            </>
          )}
        </div>

        </>)}

      </div>

      {/* ── Footer ───────────────────────────────────────────────────── */}
      <div style={{ borderTop:'1px solid var(--br)', padding:'16px 24px', display:'flex', justifyContent:'space-between', flexWrap:'wrap', gap:'8px' }}>
        <span style={{ fontSize:'0.72rem', color:'var(--t3)' }}>IFA Number Platform · CENProject · ifainternet.org/ifa-number/</span>
        <div style={{ display:'flex', gap:'14px' }}>
          <a href="../" style={{ fontSize:'0.72rem', color:'var(--t3)' }}>← IFA Number</a>
          <a href="https://ifainternet.org/ifa-evolution/ifa-sequence/" style={{ fontSize:'0.72rem', color:'var(--t3)' }}>Ifa Sequence ↗</a>
          <a href="https://ifainternet.org/ifa-matrix/playground/" style={{ fontSize:'0.72rem', color:'var(--t3)' }}>IFA Matrix Playground ↗</a>
        </div>
      </div>

      {/* ── Tooltip ──────────────────────────────────────────────────── */}
      {tip.visible && (
        <div
          className="ap-tip"
          style={{
            left: Math.min(tip.x, window.innerWidth - 300) + 'px',
            top:  tip.y + 'px',
          }}
        >{tip.text}</div>
      )}

    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<APPlaygroundApp />);
