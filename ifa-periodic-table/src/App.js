import { useState, useEffect, useCallback } from 'react';
import html from 'htm/react';
import { Header }        from './components/Header.js';
import { Controls }      from './components/Controls.js';
import { PeriodicTable } from './components/PeriodicTable.js';
import { OduModal }      from './components/OduModal.js';
import { ListView }      from './components/ListView.js';

export function App() {
  const [data, setData]               = useState(null);
  const [activeCategory, setCategory] = useState('all');
  const [searchTerm, setSearch]       = useState('');
  const [view, setView]               = useState('table');
  const [selection, setSelection]     = useState(null);

  useEffect(() => {
    fetch('./data/odu.json')
      .then(r => r.json())
      .then(setData)
      .catch(err => console.error('Failed to load odu.json', err));
  }, []);

  const navigateToOdu = useCallback(id => {
    if (!data) return;
    const odu = data.odu.find(o => o.id === id);
    if (odu) setSelection({ row: odu, col: odu, num: odu.id });
  }, [data]);

  const closeModal = useCallback(() => setSelection(null), []);

  if (!data) return html`
    <div style=${{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', color: 'var(--text-3)', fontSize: '14px' }}>
      Loading Ifatoms…
    </div>
  `;

  const { odu, categories } = data;

  return html`
    <div>
      <${Header} />

      <${Controls}
        categories=${categories}
        activeCategory=${activeCategory}
        onCategory=${setCategory}
        searchTerm=${searchTerm}
        onSearch=${setSearch}
        view=${view}
        onView=${setView}
      />

      <main className="main">
        ${view === 'table'
          ? html`<${PeriodicTable}
              odu=${odu}
              categories=${categories}
              activeCategory=${activeCategory}
              searchTerm=${searchTerm}
              onCellClick=${setSelection}
            />`
          : html`<${ListView}
              odu=${odu}
              categories=${categories}
              activeCategory=${activeCategory}
              searchTerm=${searchTerm}
              onSelect=${setSelection}
            />`
        }
      </main>

      <footer className="footer">
        <p>
          <strong>Ifa Periodic Table (IfaPT)</strong> — The Periodic Table of Everything (PToE) ·${' '}
          <a href="https://toe.cenproject.org/ifa-periodic-table/" target="_blank">toe.cenproject.org</a>
          · © CENProject
        </p>
        <p className="footer__sub">
          256 Odu Ifa (Ifatoms) · 16 Groups (Ojú Odù) · 16 Periods · STEAMSEX Matrix Framework
        </p>
      </footer>

      <${OduModal}
        selection=${selection}
        odu=${odu}
        categories=${categories}
        onClose=${closeModal}
        onNavigate=${navigateToOdu}
      />
    </div>
  `;
}
