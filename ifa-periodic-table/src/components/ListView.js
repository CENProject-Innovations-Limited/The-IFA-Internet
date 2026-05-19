import html from 'htm/react';

export function ListView({ odu, categories, activeCategory, searchTerm, onSelect }) {
  const filtered = odu.filter(o => {
    const catOk    = activeCategory === 'all' || o.category === activeCategory;
    const searchOk = !searchTerm ||
      o.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.meji.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.yoruba.toLowerCase().includes(searchTerm.toLowerCase());
    return catOk && searchOk;
  });

  if (filtered.length === 0) return html`
    <div style=${{ textAlign: 'center', padding: '48px', color: 'var(--text-3)' }}>
      No Odu match your search.
    </div>
  `;

  return html`
    <div className="list-grid">
      ${filtered.map(o => {
        const cat = categories[o.category];
        return html`
          <div key=${o.id} className="odu-card" onClick=${() => onSelect({ row: o, col: o, num: o.id })}>
            <div className="odu-card__badge" style=${{ color: cat.color }}>
              <span>${o.id}</span>
            </div>
            <div className="odu-card__body">
              <div className="odu-card__name">${o.meji}</div>
              <div className="odu-card__yoruba">${o.yoruba} Méjì</div>
              <div className="odu-card__cat" style=${{ color: cat.color }}>${cat.label}</div>
              <div className="odu-card__desc">${o.meaning}</div>
            </div>
          </div>
        `;
      })}
    </div>
  `;
}
