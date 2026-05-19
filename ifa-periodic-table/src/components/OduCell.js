import html from 'htm/react';

function MarkCol({ bits }) {
  return html`
    <div className="cell__mark-col">
      ${bits.map((b, i) => b === 1
        ? html`<div key=${i} className="cell__dot" />`
        : html`<div key=${i} style=${{ display: 'flex', gap: '1px' }}>
            <div className="cell__dot cell__dot--pair" />
            <div className="cell__dot cell__dot--pair" />
          </div>`
      )}
    </div>
  `;
}

export function OduCell({ row, col, cellNum, color, isDimmed, isMeji, onCellClick, onMouseEnter, onMouseLeave, onMouseMove }) {
  const bits = row.code.split('').map(Number);
  const col1 = bits.slice(0, 2);
  const col2 = bits.slice(2, 4);

  const shortName = isMeji
    ? row.name
    : `${row.name.slice(0, 3)}-${col.name.slice(0, 3)}`;

  const classes = [
    'cell',
    isMeji   ? 'cell--meji' : '',
    isDimmed ? 'cell--dim'  : '',
  ].filter(Boolean).join(' ');

  return html`
    <div
      className=${classes}
      style=${{ color }}
      onClick=${onCellClick}
      onMouseEnter=${onMouseEnter}
      onMouseLeave=${onMouseLeave}
      onMouseMove=${onMouseMove}
    >
      <span className="cell__num">${cellNum}</span>
      <span className="cell__name">${shortName}</span>
      <div className="cell__marks">
        <${MarkCol} bits=${col1} />
        <${MarkCol} bits=${col2} />
      </div>
    </div>
  `;
}
