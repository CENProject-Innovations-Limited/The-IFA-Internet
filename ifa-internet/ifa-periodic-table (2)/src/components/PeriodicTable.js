import { useState, useCallback, Fragment } from 'react';
import html from 'htm/react';
import { OduCell } from './OduCell.js';

function cellNum(ri, ci) { return ri * 16 + ci + 1; }

function oduName(row, col) {
  return row.id === col.id ? row.meji : `${row.name}-${col.name}`;
}

function isDimmed(row, col, activeCategory, searchTerm) {
  if (activeCategory !== 'all') {
    if (row.category !== activeCategory && col.category !== activeCategory) return true;
  }
  if (searchTerm) {
    const t = searchTerm.toLowerCase();
    if (!oduName(row, col).toLowerCase().includes(t) &&
        !row.name.toLowerCase().includes(t) &&
        !col.name.toLowerCase().includes(t)) return true;
  }
  return false;
}

export function PeriodicTable({ odu, categories, activeCategory, searchTerm, onCellClick }) {
  const [tooltip, setTooltip] = useState({ visible: false, text: '', x: 0, y: 0 });

  const showTip = useCallback((text, e) =>
    setTooltip({ visible: true, text, x: e.clientX + 14, y: e.clientY + 14 }), []);

  const moveTip = useCallback(e =>
    setTooltip(t => ({ ...t, x: e.clientX + 14, y: e.clientY + 14 })), []);

  const hideTip = useCallback(() =>
    setTooltip(t => ({ ...t, visible: false })), []);

  return html`
    <div>
      <!-- Legend -->
      <div className="legend">
        ${Object.entries(categories).map(([key, cat]) => html`
          <div key=${key} className="legend__item">
            <div className="legend__swatch" style=${{ background: cat.color }} />
            <span>${cat.label}</span>
          </div>
        `)}
        <div className="legend__sep" />
        <div className="legend__item">
          <div className="legend__swatch" style=${{ background: 'transparent', outline: '2px solid #555', outlineOffset: '-2px' }} />
          <span>Meji (Principal Odu)</span>
        </div>
      </div>

      <!-- Grid -->
      <div className="table-scroll">
        <div className="pt-grid">

          <!-- Corner spacer -->
          <div />

          <!-- Column headers -->
          ${odu.map(col => html`
            <div key=${'ch-' + col.id} className="pt-col-header" style=${{ color: categories[col.category].color }}>
              <span className="pt-col-header__num">${col.id}</span>
              <span className="pt-col-header__name">${col.name}</span>
            </div>
          `)}

          <!-- Rows: each row = Fragment(row-header + 16 cells) -->
          ${odu.map((row, ri) => html`
            <${Fragment} key=${row.id}>
              <div className="pt-row-header">
                <span className="pt-row-header__num">${row.id}</span>
                <span className="pt-row-header__name" style=${{ color: categories[row.category].color }}>${row.name}</span>
                <span className="pt-row-header__yoruba">${row.yoruba}</span>
              </div>

              ${odu.map((col, ci) => {
                const isMeji = row.id === col.id;
                const dim    = isDimmed(row, col, activeCategory, searchTerm);
                const num    = cellNum(ri, ci);
                const name   = oduName(row, col);
                const color  = categories[row.category].color;
                return html`
                  <${OduCell}
                    key=${num}
                    row=${row}
                    col=${col}
                    cellNum=${num}
                    color=${color}
                    isMeji=${isMeji}
                    isDimmed=${dim}
                    onCellClick=${() => !dim && onCellClick({ row, col, num })}
                    onMouseEnter=${e => !dim && showTip(name, e)}
                    onMouseLeave=${hideTip}
                    onMouseMove=${moveTip}
                  />
                `;
              })}
            </${Fragment}>
          `)}

        </div>
      </div>

      <!-- Tooltip -->
      ${tooltip.visible && html`
        <div
          className="tooltip"
          style=${{ left: Math.min(tooltip.x, window.innerWidth - 200) + 'px', top: tooltip.y + 'px' }}
        >${tooltip.text}</div>
      `}
    </div>
  `;
}
