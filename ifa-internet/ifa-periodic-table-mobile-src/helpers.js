// ─────────────────────────────────────────────────────────────
//  Ifa Periodic Table Mobile  ·  Helper Functions
// ─────────────────────────────────────────────────────────────

export function cellNum(ci, rowPos) {
  if (rowPos === 0) return ci + 1;
  return 16 + ci * 15 + rowPos;
}

export function oduName(row, col) {
  return row.id === col.id ? row.meji : `${row.name}-${col.name}`;
}

export function secondaryAt(odu, ci, rowPos) {
  if (rowPos === 0) return odu[ci];
  let k = 0;
  for (let i = 0; i < 16; i++) {
    if (i === ci) continue;
    if (k === rowPos - 1) return odu[i];
    k++;
  }
}

export function calcDimmed(row, col, activeCategory, searchTerm) {
  if (activeCategory !== 'all' && row.category !== activeCategory && col.category !== activeCategory) return true;
  if (searchTerm) {
    const t = searchTerm.toLowerCase();
    return !oduName(row, col).toLowerCase().includes(t) &&
           !row.name.toLowerCase().includes(t) &&
           !col.name.toLowerCase().includes(t);
  }
  return false;
}

export function primaryGlyph(code) {
  if (code === '1111') return 'O';
  if (code === '0000') return '|';
  return code.split('').map(b => b === '1' ? 'O' : 'I').join('');
}
