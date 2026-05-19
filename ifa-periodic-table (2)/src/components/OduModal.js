import { useEffect } from 'react';
import html from 'htm/react';

function Dot({ bit }) {
  return bit === 1
    ? html`<div className="modal__dot" />`
    : html`<div className="modal__dot modal__dot--zero" />`;
}

function IFABitDisplay({ code, color }) {
  const bits     = code.split('').map(Number);
  const rightCol = bits.slice(0, 2);
  const leftCol  = bits.slice(2, 4);
  const decimal  = parseInt(code, 2);

  const Mark = ({ b }) => b === 1
    ? html`<div className="ifabit__dot" />`
    : html`
        <div className="ifabit__dot ifabit__dot--zero" />
        <div className="ifabit__dot ifabit__dot--zero" />
      `;

  return html`
    <div className="ifabit" style=${{ color }}>
      <div className="ifabit__cols">
        <div className="ifabit__col">
          <div className="ifabit__col-label">Right</div>
          ${rightCol.map((b, i) => html`
            <div key=${i} className="ifabit__mark"><${Mark} b=${b} /></div>
          `)}
        </div>
        <div className="ifabit__col">
          <div className="ifabit__col-label">Left</div>
          ${leftCol.map((b, i) => html`
            <div key=${i} className="ifabit__mark"><${Mark} b=${b} /></div>
          `)}
        </div>
      </div>
      <div>
        <div className="modal__section-label" style=${{ marginBottom: '4px' }}>IFABit Code</div>
        <div className="ifabit__code">${code}₂</div>
        <div style=${{ fontSize: '12px', color: 'var(--text-3)', marginTop: '3px' }}>${decimal}₁₀</div>
      </div>
    </div>
  `;
}

function MejiDetail({ odu, cat, oduById, catMap, onNavigate }) {
  const color   = cat.color;
  const dualOdu = oduById[odu.dual];
  const dualCat = dualOdu ? catMap[dualOdu.category] : null;

  return html`
    <div className="modal__section">
      <div className="modal__section-label">Meaning & Domain</div>
      <p className="modal__meaning">${odu.meaning}</p>
    </div>

    <div className="modal__section">
      <div className="modal__section-label">Core Domains</div>
      <div className="domain-chips">
        ${odu.domains.map(d => html`<span key=${d} className="domain-chip">${d}</span>`)}
      </div>
    </div>

    <div className="modal__section">
      <div className="modal__section-label">IFABit Representation</div>
      <${IFABitDisplay} code=${odu.code} color=${color} />
    </div>

    <div className="info-grid modal__section">
      <div className="info-card">
        <div className="info-card__label">Elemental Correspondence</div>
        <div className="info-card__value" style=${{ color }}>${odu.element}</div>
      </div>
      <div className="info-card">
        <div className="info-card__label">Planetary Influence</div>
        <div className="info-card__value" style=${{ color }}>${odu.planet}</div>
      </div>
    </div>

    <div className="modal__section">
      <div className="modal__section-label">STEAMSEX Disciplines</div>
      <div className="steamsex-tags">
        ${odu.steamsex.map(s => html`<span key=${s} className="steamsex-tag">${s}</span>`)}
      </div>
    </div>

    <div className="modal__section">
      <div className="modal__section-label">Ifa Periodicity Laws</div>
      <div className="domain-chips">
        ${odu.axioms.map(a => html`
          <span key=${a} className="domain-chip" style=${{ borderColor: color + '55' }}>${a}</span>
        `)}
      </div>
    </div>

    ${dualOdu && html`
      <div className="modal__section">
        <div className="modal__section-label">Inverse / Dual Odu</div>
        <div className="dual-row" onClick=${() => onNavigate(dualOdu.id)}>
          <div className="dual-badge" style=${{ color: dualCat.color }}>
            <span>${dualOdu.id}</span>
          </div>
          <div>
            <div className="dual-name">${dualOdu.meji}</div>
            <div className="dual-yoruba">${dualOdu.yoruba} Méjì · ${dualCat.label}</div>
          </div>
          <div className="dual-arrow">→</div>
        </div>
      </div>
    `}
  `;
}

function CompositeDetail({ row, col, rowCat, colCat, onNavigate }) {
  const uniqueDomains  = [...new Set([...row.domains.slice(0, 3), ...col.domains.slice(0, 3)])];
  const uniqueSteamsex = [...new Set([...row.steamsex, ...col.steamsex])];

  return html`
    <div className="modal__section">
      <div className="modal__section-label">Composite Ifatom</div>
      <p className="modal__meaning">
        This Ifatom carries the combined energies of${' '}
        <strong style=${{ color: rowCat.color }}>${rowCat.label}</strong> and${' '}
        <strong style=${{ color: colCat.color }}>${colCat.label}</strong> principles,
        expressing the interplay between${' '}
        <em>${row.domains.slice(0, 2).join(', ')}</em> and${' '}
        <em>${col.domains.slice(0, 2).join(', ')}</em>.
        Click either parent below to explore its full meaning.
      </p>
    </div>

    <div className="info-grid modal__section">
      <div className="info-card info-card--link" onClick=${() => onNavigate(row.id)}>
        <div className="info-card__label" style=${{ color: rowCat.color }}>Right Odu (Primary)</div>
        <div className="info-card__value">${row.meji}</div>
        <div className="info-card__sub">${row.domains.slice(0, 3).join(' · ')}</div>
      </div>
      <div className="info-card info-card--link" onClick=${() => onNavigate(col.id)}>
        <div className="info-card__label" style=${{ color: colCat.color }}>Left Odu (Secondary)</div>
        <div className="info-card__value">${col.meji}</div>
        <div className="info-card__sub">${col.domains.slice(0, 3).join(' · ')}</div>
      </div>
    </div>

    <div className="modal__section">
      <div className="modal__section-label">Combined Domains</div>
      <div className="domain-chips">
        ${uniqueDomains.map(d => html`<span key=${d} className="domain-chip">${d}</span>`)}
      </div>
    </div>

    <div className="modal__section">
      <div className="modal__section-label">Primary IFABit (${row.name})</div>
      <${IFABitDisplay} code=${row.code} color=${rowCat.color} />
    </div>

    <div className="modal__section">
      <div className="modal__section-label">STEAMSEX Disciplines</div>
      <div className="steamsex-tags">
        ${uniqueSteamsex.map(s => html`<span key=${s} className="steamsex-tag">${s}</span>`)}
      </div>
    </div>
  `;
}

export function OduModal({ selection, odu, categories, onClose, onNavigate }) {
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
  const yoruba  = isMeji ? `${row.yoruba} Méjì` : `${row.yoruba}-${col.yoruba}`;

  const bits     = row.code.split('').map(Number);
  const rightCol = bits.slice(0, 2);
  const leftCol  = bits.slice(2, 4);

  return html`
    <div className="overlay" onClick=${e => e.target === e.currentTarget && onClose()}>
      <div className="modal">

        <button className="modal__close" onClick=${onClose}>×</button>

        <div className="modal__header">
          <div className="modal__badge" style=${{ color }}>
            <span className="modal__badge-num">${num}</span>
            <div className="modal__badge-marks">
              <div className="modal__mark-col">
                ${rightCol.map((b, i) => html`<${Dot} key=${i} bit=${b} />`)}
              </div>
              <div className="modal__mark-col">
                ${leftCol.map((b, i) => html`<${Dot} key=${i} bit=${b} />`)}
              </div>
            </div>
          </div>
          <div className="modal__title">
            <h2>${name}</h2>
            <div className="modal__yoruba">${yoruba}</div>
            <div
              className="modal__tag"
              style=${{ color, borderColor: color + '60', background: color + '18' }}
            >
              ${rowCat.label}${!isMeji ? ' × ' + colCat.label : ''}
            </div>
          </div>
        </div>

        <div className="modal__body">
          ${isMeji
            ? html`<${MejiDetail} odu=${row} cat=${rowCat} oduById=${oduById} catMap=${categories} onNavigate=${onNavigate} />`
            : html`<${CompositeDetail} row=${row} col=${col} rowCat=${rowCat} colCat=${colCat} onNavigate=${onNavigate} />`
          }
        </div>

      </div>
    </div>
  `;
}
