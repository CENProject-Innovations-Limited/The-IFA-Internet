import html from 'htm/react';

export function Controls({ categories, activeCategory, onCategory, searchTerm, onSearch, view, onView }) {
  return html`
    <div className="controls">
      <div className="controls__inner">

        <div className="search">
          <span className="search__icon">⌕</span>
          <input
            className="search__input"
            type="text"
            placeholder="Search Odu…"
            value=${searchTerm}
            onChange=${e => onSearch(e.target.value)}
          />
        </div>

        <div className="chips">
          <button
            className=${'chip ' + (activeCategory === 'all' ? 'chip--active' : 'chip--inactive')}
            style=${{ color: '#9aa3ba', borderColor: '#2e3a58' }}
            onClick=${() => onCategory('all')}
          >All</button>

          ${Object.entries(categories).map(([key, cat]) => html`
            <button
              key=${key}
              className=${'chip ' + (activeCategory === key ? 'chip--active' : 'chip--inactive')}
              style=${{ color: cat.color, borderColor: cat.color }}
              onClick=${() => onCategory(key)}
            >${cat.label}</button>
          `)}
        </div>

        <div className="view-toggle">
          <button
            className=${'view-btn ' + (view === 'table' ? 'view-btn--active' : '')}
            onClick=${() => onView('table')}
          >Grid</button>
          <button
            className=${'view-btn ' + (view === 'list' ? 'view-btn--active' : '')}
            onClick=${() => onView('list')}
          >List</button>
        </div>

      </div>
    </div>
  `;
}
