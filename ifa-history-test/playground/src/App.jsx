'use strict';

// ─── DATA ────────────────────────────────────────────────────────────────────

const TOWNS = [
  {
    id: 1, ilu: 'Ojọ́ta', short: 'Ojọ́ta',
    etymology: 'Ojú Ọta — Ojúbọ Òrìṣà Ọta: the face/shrine of the Stone Deity (Ọta)',
    ipinle: 'Lagos', region: 'SW',
    odufa: '—',
    orisa: 'Òrìṣà Ọta (sacred stone deity)',
    oye_oba: 'Baálẹ̀ of Ojọ́ta',
    oruko_oba: '—',
    odun: 'Ọta Festival',
    omiran: 'Located in Ojo LGA, Lagos State. Ancient Yoruba settlement consecrated to the sacred stone (Ọta) deity.',
    website: 'https://ojolga.lg.gov.ng/',
    color: '#d4a017',
  },
  {
    id: 2, ilu: 'Ìkòròdú', short: 'Ìkòròdú',
    etymology: 'Oko Òdú — Farm/Land of the Odu (the primordial spiritual force)',
    ipinle: 'Lagos', region: 'SW',
    odufa: 'Ogbèfún (Ogbè-Òfún)',
    orisa: 'Òrìṣà Oko, Oṣó, Ọ̀sàrà (Ọ̀sà), Ẹ̀lúkú',
    oye_oba: 'Ayangburen of Ikorodu',
    oruko_oba: 'Oba Kabiru Adewale Shotobi (Ayangburen IV)',
    odun: 'Oṣo Festival, Ẹ̀lúkú Festival, Ọ̀sàrà Festival',
    omiran: 'Major commercial hub, Ikorodu LGA, Lagos. Ancient trade & fishing community on Lagos Lagoon. One of Lagos\'s oldest towns.',
    website: 'https://ikorodulga.lg.gov.ng/',
    color: '#14b8d4',
  },
  {
    id: 3, ilu: 'Ojúẹlẹ́gba', short: 'Ojúẹlẹ́gba',
    etymology: 'Ojúbọ Ẹlẹ́gbára — the face/shrine of Esu Elegbara (Alágbára, the Powerful One)',
    ipinle: 'Lagos', region: 'SW',
    odufa: '—',
    orisa: 'Ẹlẹ́gbára / Èṣù Alágbára',
    oye_oba: 'Baálẹ̀ of Ojuelegba',
    oruko_oba: '—',
    odun: 'Ẹlẹ́gbára Festival',
    omiran: 'Landmark area in Surulere/Lagos. Major transit crossroads. Named for the Esu shrine standing at the crossroads — Esu\'s sacred domain.',
    website: 'https://surulere-lg.com.ng/',
    color: '#ef4444',
  },
  {
    id: 4, ilu: 'Ìrẹ́mọ (Rẹ́mọ)', short: 'Ìrẹ́mọ',
    etymology: 'Ìrẹ́ ọmọ — Grace/Beauty of Children; linked to Àká & Ọ̀rànmíyàn of Ilé-Ifẹ̀',
    ipinle: 'Ogun', region: 'SW',
    odufa: '—',
    orisa: 'Àká, Ọ̀rànmíyàn',
    oye_oba: 'Oba of Iremo-Remo',
    oruko_oba: '—',
    odun: 'Àká Festival, Ọ̀rànmíyàn Day',
    omiran: 'Agboolé Àká; Ìrẹ́mọ Quarters in Ilé-Ifẹ̀. Part of the Remo sub-group of Yoruba (Ogun State).',
    color: '#8b5cf6',
  },
  {
    id: 5, ilu: 'Ìṣarà (Rẹ́mọ)', short: 'Ìṣarà',
    etymology: 'Ìṣe Àrà — The deed/work of the Àrà people; the miracle-workers',
    ipinle: 'Ogun', region: 'SW',
    odufa: '—',
    orisa: 'Ogun, Agemo',
    oye_oba: 'Odèmọ of Isara',
    oruko_oba: '—',
    odun: 'Agemo Festival, Ogun Festival',
    omiran: 'Birthplace of Chief Obafemi Awolowo. In Remo, Ogun State. Known as Isara-Remo.',
    website: 'https://isara-remo.webflow.io/',
    color: '#00c87c',
  },
  {
    id: 6, ilu: 'Ẹgbẹ́da', short: 'Ẹgbẹ́da',
    etymology: 'Ẹgbẹ́jọdá — The assembly/group that judged or settled a great dispute',
    ipinle: 'Lagos', region: 'SW',
    odufa: '—',
    orisa: 'Ogun',
    oye_oba: 'Baálẹ̀ of Egbeda',
    oruko_oba: '—',
    odun: 'Ogun Festival',
    omiran: 'In Alimosho LGA, Lagos State. One of the oldest Yoruba settlements in the Alimosho corridor.',
    website: 'https://alimosholga.lg.gov.ng/',
    color: '#f0920c',
  },
  {
    id: 7, ilu: 'Òṣogbo', short: 'Òṣogbo',
    etymology: 'Oṣó Inú Igbó — the powerful/mysterious one dwelling within the forest',
    ipinle: 'Osun', region: 'SW',
    odufa: 'Ìdin Amìlẹ̀kẹ̀ / Ìdin Òṣogbo (Òdí Ìrẹté)',
    orisa: 'Ọṣun (river goddess), Larooye, Ataoja lineage',
    oye_oba: 'Ataoja of Osogbo',
    oruko_oba: 'Oba Jimoh Oyetunji Larooye II',
    odun: 'Osun-Osogbo Festival (UNESCO Intangible Heritage)',
    omiran: 'Capital of Osun State. UNESCO World Heritage Sacred Grove. Global centre of Ọṣun veneration.',
    website: 'https://www.osunstate.gov.ng/',
    color: '#d4a017',
  },
  {
    id: 8, ilu: 'Ìbàdàn', short: 'Ìbàdàn',
    etymology: 'Ẹ̀bá Ọ̀dàn — By the edge of the wide-open savannah/grassland (Ọ̀dàn)',
    ipinle: 'Oyo', region: 'SW',
    odufa: 'Ọ̀ṣẹ́ Méjì (Ọ̀ṣẹ́ Olúbàdàn)',
    orisa: 'Oya, Sango, Ogun, Ọ̀ṣun',
    oye_oba: 'Olúbàdàn of Ibadanland',
    oruko_oba: 'Oba Lekan Balogun (Olubadan I)',
    odun: 'Olubadan Festival, Oya Festival, Ogun Festival',
    omiran: 'Largest city in West Africa by land area. Home of University of Ibadan (est. 1948). Capital of Oyo State.',
    website: 'https://oyostate.gov.ng/',
    color: '#6366f1',
  },
  {
    id: 9, ilu: 'Ìlọrin', short: 'Ìlọrin',
    etymology: 'Ìlọ irin — The flowing/forging of iron; land of ironworkers and metal smiths',
    ipinle: 'Kwara', region: 'N-Central',
    odufa: 'Ọ̀kànràn Ìwòrì',
    orisa: 'Bàtà (Sango\'s drum deity), Esinkin, Ogun',
    oye_oba: 'Emir of Ilorin',
    oruko_oba: 'Alhaji Ibrahim Sulu-Gambari (CFR)',
    odun: 'Bàtà Festival, Emir\'s Sallah Durbar',
    omiran: 'Capital of Kwara State. Originally Yoruba Oluyole kingdom; came under Fulani emirate in 19th c. Major cultural crossroads.',
    website: 'https://kwarastate.gov.ng/',
    color: '#3b9eff',
  },
  {
    id: 10, ilu: 'Òndó', short: 'Òndó',
    etymology: 'Òde Ìdó — Outer frontier/exit of Ido; founded by Princess Pupupu of Ilé-Ifẹ̀',
    ipinle: 'Ondo', region: 'SW',
    odufa: 'Ọ̀bárà Méjì',
    orisa: 'Orisagbemi, Ogun, Ọ̀ṣun',
    oye_oba: 'Osemawe of Ondo',
    oruko_oba: 'Oba Dr. Victor Kiladejo',
    odun: 'Ogun Festival, Igogo Festival',
    omiran: 'Founded by Princess Pupupu, daughter of the Ooni of Ile-Ife. Capital of former Ondo Province. In Ondo State.',
    website: 'https://ondostate.gov.ng/',
    color: '#ec4899',
  },
  {
    id: 11, ilu: 'Ìláròó', short: 'Ìláròó',
    etymology: 'Ìlú Àró — Town of the Àró people: the indigo/blue-dye craftspeople',
    ipinle: 'Ekiti', region: 'SW',
    odufa: '—',
    orisa: 'Àró deity, Ogun',
    oye_oba: 'Alara of Ilara-Mokin',
    oruko_oba: '—',
    odun: 'Àró Festival, Ogun Festival',
    omiran: 'One of the ancient Ekiti kingdoms. Alara is among the Farabale kings of Ekiti. Known for indigo-weaving heritage.',
    website: 'https://www.ilaramokin.org/',
    color: '#f5c518',
  },
  {
    id: 12, ilu: 'Èṣúré', short: 'Èṣúré',
    etymology: 'Ẹ̀ṣù ré yùn — Esu has settled/pleased here; town consecrated to Esu',
    ipinle: 'Ekiti', region: 'SW',
    odufa: '—',
    orisa: 'Èṣù / Ẹlẹ́gbára',
    oye_oba: 'Elesu of Esure',
    oruko_oba: '—',
    odun: 'Esu Festival, Ẹlẹ́gbára Day',
    omiran: 'Sacred town of Esu/Elegbara in Ekiti State. Houses one of the most ancient Esu shrines in all Yorubaland.',
    website: 'https://esurecommunity.org.ng/',
    color: '#ef4444',
  },
  {
    id: 13, ilu: 'Imuṣin / Muṣin', short: 'Imuṣin',
    etymology: 'Ìmu Iṣin — Place where good Iṣin trees (Ricinodendron heudelotii) grow abundantly',
    ipinle: 'Lagos', region: 'SW',
    odufa: '—',
    orisa: 'Iṣin tree deity, Ogun',
    oye_oba: 'Baálẹ̀ of Imushin',
    oruko_oba: '—',
    odun: 'Iṣin Festival, Ogun Festival',
    omiran: 'Imushin in Ikorodu LGA. Muṣin (Lagos Mainland) is a separate but etymologically linked settlement — both named for the sacred Iṣin tree.',
    website: 'https://ijebuimusin.com/',
    website2: 'https://mushin.lg.gov.ng/blog/page/98/',
    color: '#00c87c',
  },
  {
    id: 14, ilu: 'Ìjẹ̀bú', short: 'Ìjẹ̀bú',
    etymology: 'Ìjẹ ibú — Food of the deep sea/abyss. Also Àjẹ̀bú. Ancient Ijebu kingdom',
    ipinle: 'Ogun', region: 'SW',
    odufa: 'Ọ̀ṣẹ́turá (Ọ̀ṣẹ́ + Òtúrá)',
    orisa: 'Agemo (masquerade deity), Ọ̀ṣun',
    oye_oba: 'Awujale of Ijebuland',
    oruko_oba: 'Oba Sikiru Kayode Adetona (since 1960)',
    odun: 'Agemo Festival (16 days, annual), Ojude Oba',
    omiran: 'Ancient Ijebu kingdom, capital at Ijebu Ode. Famous Agemo masquerade tradition. Powerful pre-colonial merchant state.',
    website: 'https://ojudeoba.com/',
    color: '#8b5cf6',
  },
  {
    id: 15, ilu: 'Ìjẹ̀bú Òde', short: 'Ìjẹ̀bú Òde',
    etymology: 'Founded by Àjẹ̀bú and Olóde from Ilé-Ifẹ̀ — their names fused into the town\'s name',
    ipinle: 'Ogun', region: 'SW',
    odufa: 'Ọ̀ṣẹ́turá',
    orisa: 'Agemo, Ọ̀ṣun',
    oye_oba: 'Awujale of Ijebuland',
    oruko_oba: 'Oba Sikiru Kayode Adetona',
    odun: 'Ojude Oba, Agemo Festival',
    omiran: 'Capital of Ijebu kingdom. Major Yoruba trade city in Ogun State. Founded by emigrants from Ilé-Ifẹ̀.',
    website: 'https://ogunstate.gov.ng/',
    color: '#14b8d4',
  },
  {
    id: 16, ilu: 'Ṣagámù / Ìṣagámù', short: 'Ṣagámù',
    etymology: 'Òrìṣàgamu Ẹwà — Òrìṣà gún àmù ẹwà: the Orisa shattered the beautiful, mysterious clay pot',
    ipinle: 'Ogun', region: 'SW',
    odufa: '—',
    orisa: 'Ogun, Obanta, Yewa',
    oye_oba: 'Akarigbo of Remoland',
    oruko_oba: 'Oba Babatunde Ajayi (Akarigbo)',
    odun: 'Ojude Oba Sagamu, Obanta Festival, Ogun Festival',
    omiran: 'Seat of Remo traditional government in Ogun State. Major commercial and educational city on Lagos–Ibadan axis.',
    website: 'https://ogunstate.gov.ng/',
    color: '#d4a017',
  },
];

// 8 compass positions for the radial overlay (matching 8 Odu columns)
const COMPASS = [
  { key: 'etymology', label: 'Etymology · Ìtumọ̀', icon: '◌', area: 'nw', sym: 'NW' },
  { key: 'ipinle',    label: 'Ìpínlẹ̀ (State)',    icon: '◈', area: 'n',  sym: 'N'  },
  { key: 'odufa',     label: 'Odùfá Ìtẹ̀lúdó',    icon: '⊛', area: 'ne', sym: 'NE' },
  { key: 'omiran',    label: 'Àwọn Òmìrán',        icon: '◇', area: 'w',  sym: 'W'  },
  { key: 'orisa',     label: 'Òrìṣà Ìlú',          icon: '◉', area: 'e',  sym: 'E'  },
  { key: 'odun',      label: 'Ọdún Ìlú',           icon: '◎', area: 'sw', sym: 'SW' },
  { key: 'oruko_oba', label: 'Orúkọ Ọba Ìlú',      icon: '⊗', area: 's',  sym: 'S'  },
  { key: 'oye_oba',   label: 'Oyè Ọba Ìlú',        icon: '⊕', area: 'se', sym: 'SE' },
];

const COL_HEADS = [
  { key: 'ilu',       label: 'Ìlú',              sub: 'Town / City'            },
  { key: 'ipinle',    label: 'Ìpínlẹ̀',          sub: 'State'                  },
  { key: 'odufa',     label: 'Odùfá Ìtẹ̀lúdó',  sub: 'Founding Odù Ifá'      },
  { key: 'orisa',     label: 'Òrìṣà Ìlú',       sub: 'Town Deity / Ancestors' },
  { key: 'oye_oba',   label: 'Oyè Ọba',         sub: 'King Title'             },
  { key: 'oruko_oba', label: 'Orúkọ Ọba',       sub: 'King'                   },
  { key: 'odun',      label: 'Ọdún Ìlú',        sub: 'Festivals'              },
  { key: 'omiran',    label: 'Àwọn Òmìrán',     sub: 'Others'                 },
];

// ─── COMPASS OVERLAY ─────────────────────────────────────────────────────────

function TownCompass({ town, onMouseEnter, onMouseLeave, onClose, onTouchStart }) {
  // Close on Escape
  React.useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <div
      className="ift-overlay"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onTouchStart={onTouchStart}
    >
      <div className="ift-compass" style={{ '--tc': town.color }}>

        {/* Close */}
        <button className="ift-compass__close" onClick={onClose} aria-label="Close">✕</button>

        {/* 8 compass cells */}
        {COMPASS.map(f => (
          <div key={f.key} className={`ift-cell ift-cell--${f.area}`} data-area={f.area}>
            <div className="ift-cell__label">
              <span className="ift-cell__icon">{f.icon}</span>
              {f.label}
            </div>
            <div className="ift-cell__value">
              {town[f.key] || '—'}
            </div>
          </div>
        ))}

        {/* Center */}
        <div className="ift-cell ift-cell--center">
          <div className="ift-center__num">#{town.id}</div>
          <div className="ift-center__name">{town.short}</div>
          <div className="ift-center__full">{town.ilu}</div>
          <div className="ift-center__region" style={{ background: town.color + '22', color: town.color, borderColor: town.color + '55' }}>
            {town.ipinle} · {town.region}
          </div>
          {town.website && (
            <a className="ift-center__site" href={town.website} target="_blank" rel="noopener noreferrer"
              style={{ color: town.color, borderColor: town.color + '44' }}>
              ↗ Official Site
            </a>
          )}
        </div>

        {/* Spoke lines (SVG overlay behind grid) */}
        <svg className="ift-compass__spokes" viewBox="0 0 3 3" preserveAspectRatio="none" aria-hidden="true">
          <line x1="1.5" y1="1.5" x2="0.5" y2="0.5" />
          <line x1="1.5" y1="1.5" x2="1.5" y2="0.5" />
          <line x1="1.5" y1="1.5" x2="2.5" y2="0.5" />
          <line x1="1.5" y1="1.5" x2="0.5" y2="1.5" />
          <line x1="1.5" y1="1.5" x2="2.5" y2="1.5" />
          <line x1="1.5" y1="1.5" x2="0.5" y2="2.5" />
          <line x1="1.5" y1="1.5" x2="1.5" y2="2.5" />
          <line x1="1.5" y1="1.5" x2="2.5" y2="2.5" />
        </svg>
      </div>
    </div>
  );
}

// ─── IFA TABLE ───────────────────────────────────────────────────────────────

function IfaTable() {
  const [active, setActive]   = React.useState(null);
  const [query, setQuery]     = React.useState('');
  const [sortKey, setSortKey] = React.useState('ilu');
  const [sortDir, setSortDir] = React.useState(1);
  const hideRef = React.useRef(null);
  const touchResetRef = React.useRef(null);
  const isTouchRef = React.useRef(false);

  const filtered = React.useMemo(() => {
    const q = query.toLowerCase();
    return TOWNS
      .filter(t =>
        !q ||
        t.ilu.toLowerCase().includes(q) ||
        t.ipinle.toLowerCase().includes(q) ||
        t.orisa.toLowerCase().includes(q) ||
        t.odufa.toLowerCase().includes(q) ||
        t.etymology.toLowerCase().includes(q)
      )
      .sort((a, b) => {
        const av = String(a[sortKey] ?? ''), bv = String(b[sortKey] ?? '');
        return av.localeCompare(bv, 'yo') * sortDir;
      });
  }, [query, sortKey, sortDir]);

  const markTouch = () => {
    isTouchRef.current = true;
    clearTimeout(touchResetRef.current);
    touchResetRef.current = setTimeout(() => { isTouchRef.current = false; }, 800);
  };

  const handleEnter = (town) => {
    clearTimeout(hideRef.current);
    setActive(town);
  };
  const handleLeave = () => {
    if (isTouchRef.current) return;
    hideRef.current = setTimeout(() => setActive(null), 380);
  };
  const handleOverlayEnter = () => clearTimeout(hideRef.current);
  const handleOverlayLeave = () => {
    if (isTouchRef.current) return;
    setActive(null);
  };

  const toggleSort = (key) => {
    if (sortKey === key) setSortDir(d => -d);
    else { setSortKey(key); setSortDir(1); }
  };

  const sortArrow = (key) =>
    sortKey === key ? (sortDir === 1 ? ' ↑' : ' ↓') : '';

  return (
    <div className="ift-wrap">

      {/* Search bar */}
      <div className="ift-toolbar">
        <div className="ift-search">
          <span className="ift-search__icon">⌕</span>
          <input
            className="ift-search__input"
            type="text"
            placeholder="Search towns, states, Odu, Orisa…"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          {query && (
            <button className="ift-search__clear" onClick={() => setQuery('')}>✕</button>
          )}
        </div>
        <div className="ift-toolbar__count">
          {filtered.length} / {TOWNS.length} towns · tap or hover name to explore
        </div>
      </div>

      {/* Scrollable table container */}
      <div className="ift-scroll">
        <table className="ift-table">
          <thead>
            <tr>
              <th className="ift-th ift-th--num">#</th>
              {COL_HEADS.map(c => (
                <th
                  key={c.key}
                  className={'ift-th' + (sortKey === c.key ? ' ift-th--sorted' : '')}
                  onClick={() => toggleSort(c.key)}
                >
                  <span className="ift-th__label">{c.label}{sortArrow(c.key)}</span>
                  <span className="ift-th__sub">{c.sub}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={9} className="ift-empty">No towns match "{query}"</td>
              </tr>
            )}
            {filtered.map(t => (
              <tr
                key={t.id}
                className={'ift-row' + (active && active.id === t.id ? ' ift-row--active' : '')}
                style={{ '--tc': t.color }}
              >
                <td className="ift-td ift-td--num">{t.id}</td>
                <td
                  className="ift-td ift-td--ilu"
                  onMouseEnter={() => handleEnter(t)}
                  onMouseLeave={handleLeave}
                  onTouchStart={markTouch}
                  onClick={() => handleEnter(t)}
                >
                  <span className="ift-ilu__name">{t.short}</span>
                </td>
                <td className="ift-td">
                  <span className="ift-badge" style={{ '--bc': t.color }}>{t.ipinle}</span>
                </td>
                <td className="ift-td ift-td--odu">{t.odufa}</td>
                <td className="ift-td">{t.orisa}</td>
                <td className="ift-td">{t.oye_oba}</td>
                <td className="ift-td">{t.oruko_oba}</td>
                <td className="ift-td">{t.odun}</td>
                <td className="ift-td ift-td--omiran">
                  {t.omiran}
                  {t.website && (
                    <span className="ift-site-links">
                      <a className="ift-site-link" href={t.website} target="_blank" rel="noopener noreferrer">↗ Official Site</a>
                      {t.website2 && (
                        <a className="ift-site-link" href={t.website2} target="_blank" rel="noopener noreferrer">↗ Muṣin</a>
                      )}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Compass overlay */}
      {active && (
        <TownCompass
          town={active}
          onMouseEnter={handleOverlayEnter}
          onMouseLeave={handleOverlayLeave}
          onClose={() => setActive(null)}
          onTouchStart={markTouch}
        />
      )}
    </div>
  );
}

// ─── HEADER ──────────────────────────────────────────────────────────────────

function PgHeader() {
  return (
    <header className="pg-header">
      <div className="pg-header__inner">
        <a href="../" className="pg-header__back">
          <img src="../../src/assets/itoe_logo.png" alt="iTOE" className="pg-header__logo" />
          <span className="pg-header__back-label">
            <span className="pg-header__site">The IFA Internet</span>
            <span className="pg-header__page">Ifa History</span>
          </span>
        </a>
        <div className="pg-header__id">
          <span className="pg-header__badge">Playground</span>
        </div>
      </div>
    </header>
  );
}

// ─── HERO ────────────────────────────────────────────────────────────────────

function PgHero() {
  return (
    <section className="pg-hero">
      <div className="pg-hero__inner">
        <div className="pg-hero__eyebrow">
          <span className="pg-tag pg-tag--gold">IfaTable</span>
          <span className="pg-tag pg-tag--dim">Ifa-Orisa History Matrix</span>
        </div>
        <h1 className="pg-hero__title">
          Gbàgede Odùpọ́n Ifá fún Ìtàn
        </h1>
        <p className="pg-hero__subtitle">
          A Summary of Ilẹ̀-Ifẹ̀ / Ilẹ̀ Yorùbá —{' '}
          <em>Ìtàn Ilẹ̀-Ifẹ̀ / Ilẹ̀ Yorùbá ní Ṣókí</em>
        </p>
        <p className="pg-hero__motto">
          Building the Dafabase, the IfaDatabase for Yorubaland on the IFA Internet…
        </p>
        <div className="pg-hero__meta">
          <span className="pg-meta-pill">8 Columns · Ifa Architecture</span>
          <span className="pg-meta-pill">{TOWNS.length} Towns · Growing</span>
          <span className="pg-meta-pill">Tap or hover a town to explore</span>
        </div>
      </div>
    </section>
  );
}

// ─── TABLE LABEL ─────────────────────────────────────────────────────────────

function PgTableLabel() {
  return (
    <div className="pg-tl">
      <div className="pg-tl__card pg-tl__card--orisa">
        <span className="pg-tl__sym" aria-hidden="true">◉</span>
        <h2 className="pg-tl__name">OrisaTable</h2>
        <p className="pg-tl__desc">Town Deities &amp; Sacred Origins</p>
      </div>
      <div className="pg-tl__divider" aria-hidden="true">
        <span className="pg-tl__div-line" />
        <span className="pg-tl__div-mark">✦</span>
        <span className="pg-tl__div-line" />
      </div>
      <div className="pg-tl__card pg-tl__card--ifa">
        <span className="pg-tl__sym" aria-hidden="true">⊛</span>
        <h2 className="pg-tl__name">Ifa-OrisaTable</h2>
        <p className="pg-tl__desc">Founding Odù &amp; Royal Lineage</p>
      </div>
    </div>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────

function PgFooter() {
  return (
    <footer className="pg-footer">
      <div className="pg-footer__inner">
        <div className="pg-footer__copy">
          © The IFA Internet · Ifa History Playground ·{' '}
          <a href="../" className="pg-footer__link">← Back to Ifa History</a>
        </div>
        <div className="pg-footer__note">
          IfaDatabase for Yorubaland — building the axiomatic record of Ilẹ̀-Ifẹ̀/Ilẹ̀ Yorùbá
        </div>
      </div>
    </footer>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────

function App() {
  return (
    <div className="pg">
      <PgHeader />
      <PgHero />
      <main className="pg-main">
        <PgTableLabel />
        <IfaTable />
      </main>
      <PgFooter />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
