'use strict';

// ─── DATA ────────────────────────────────────────────────────────────────────

// Eight-Based Dafabase Structure — Ètò Ibùdó-Ẹ̀gbà Ifá Oníkáà Mẹ́jọ
// Every Káà (IfaPartition) holds exactly 8 towns.

const DAFA_SETS = [
  {
    set:   1,
    sym:   '⊕',
    name:  'Káà Kinní',
    part:  'First IfaPartition',
    sub:   'Lagos · Lagoon · Ijebu Axis',
    desc:  'Coastal and lagoon settlements, Ijebu maritime corridor — the Atlantic gateway of Yorubaland',
    color: '#d4a017',
  },
  {
    set:   2,
    sym:   '⊗',
    name:  'Káà Kejì',
    part:  'Second IfaPartition',
    sub:   'Remo · Osun · Oyo · Kwara · Ondo · Ekiti',
    desc:  'Inner Yorubaland arc — heartland kingdoms stretching from Remo through Ekiti',
    color: '#8b5cf6',
  },
  {
    set:   3,
    sym:   '⊙',
    name:  'Káà Kẹ́ta',
    part:  'Third IfaPartition',
    sub:   'Lagos Mainland',
    desc:  'Lagos Mainland settlements',
    color: '#00c87c',
  },
];

const TOWNS = [
  // ── Káà Kinní — Set 1 ───────────────────────────────────────────────────
  {
    id: 1, set: 1, ilu: 'Ojọ́ta', short: 'Ojọ́ta',
    etymology: 'Ojú Ọta — Ojúbọ Òrìṣà Ọta: shrine of the Stone Deity (Ọta)',
    ipinle: 'Lagos', region: 'SW',
    odufa: '—',
    orisa: 'Òrìṣà Ọta (sacred stone deity)',
    oye_oba: 'Ọba of Ojọ́ta (Ọlọ́jọ́ta of Ojọ́ta)',
    oruko_oba: 'Alayeluwa Oba Jimoh Adewale Olawale-Cole (deceased, 2025)',
    odun: '—',
    omiran: 'Located in Kosofe Local Government Area. Lagos State. Yoruba settlement consecrated to the sacred stone (Ọta) deity.',
    website: 'https://ojolga.lg.gov.ng/',
    color: '#d4a017',
  },
  {
    id: 2, set: 1, ilu: 'Ìkòròdú', short: 'Ìkòròdú',
    etymology: 'Oko Òdú — Farm/Land of the Òdú (a kind/specie of vegetable)',
    ipinle: 'Lagos', region: 'SW',
    odufa: 'Ogbèfún (Ogbè-Òfún)',
    orisa: 'Òrìṣà Oko (Oṣó), Ọ̀gá, Ọ̀sàrà (Ọ̀sà), Ẹ̀lúkú',
    oye_oba: 'Ọba of Ìkòròdú (Àyángbùrẹ̀n of Ìkòròdú)',
    oruko_oba: 'Oba Kabiru Adewale Shotobi (Ayangburen IV)',
    odun: 'Ẹ̀lúkú Festival, Ọ̀gá Festival, Ìgúnnóko Festival',
    omiran: 'Ìkòròdú is Ìkòròdú Ọ̀gá Àkárìgbò in full. Major commercial hub, Ikorodu LGA, Lagos. Ancient trade & fishing community on Lagos Lagoon. One of Lagos\'s oldest towns.',
    website: 'https://ikorodulga.lg.gov.ng/',
    color: '#14b8d4',
  },
  {
    id: 3, set: 1, ilu: 'Ojúẹlẹ́gba', short: 'Ojúẹlẹ́gba',
    etymology: 'Ojúbọ Ẹlẹ́gbára — the shrine of Esu Elegbara (Alágbára, the Powerful One)',
    ipinle: 'Lagos', region: 'SW',
    odufa: '—',
    orisa: 'Ẹlẹ́gbá/Ẹlẹ́gbára/Èṣù Alágbára',
    oye_oba: 'Baálẹ̀ of Ojuelegba (The Olojuelegba of Ojuelegba)',
    oruko_oba: 'Hrm Kehinde Michael Abayomi',
    odun: 'Ẹlẹ́gbára Festival',
    omiran: 'Landmark area in Surulere/Lagos. Major transit crossroads. Named for the Esu shrine standing at the crossroads — Esu\'s sacred domain.',
    note_links: [{ href: 'https://esukiisesatani.com/', text: 'Esu is not Satan (Devil)' }],
    website: 'https://surulere-lg.com.ng/',
    color: '#ef4444',
  },
  {
    id: 4, set: 1, ilu: 'Ẹgbẹ́dá', short: 'Ẹgbẹ́dá',
    etymology: 'Ẹgbẹ́jọdá',
    ipinle: 'Lagos', region: 'SW',
    odufa: '—',
    orisa: '—',
    oye_oba: 'Ẹlẹ́gbẹ́dá of Ẹgbẹ́dá',
    oruko_oba: 'Oba Hameed Omogoriola Orelope-Laka',
    odun: '—',
    omiran: 'In Alimosho LGA, Lagos State.',
    website: 'https://alimosholga.lg.gov.ng/',
    color: '#f0920c',
  },
  {
    id: 5, set: 1, ilu: 'Imuṣin', short: 'Imuṣin',
    etymology: 'Ìmu Iṣin — Place where good Iṣin trees (ackee: blighia sapida) grow abundantly',
    ipinle: 'Ogun', region: 'SW',
    odufa: '—',
    orisa: 'Iṣin, Ògún Obélú, Yemọja, Èṣù',
    oye_oba: 'Ọba of Imushin (Olókò of Imuṣin)',
    oruko_oba: 'Alayeluwa Oba Stephen Adedeji Onafowokan (Ojafadego II)',
    odun: 'Iṣin Festival, Ogun Festival',
    omiran: 'Imuṣin is in Ijebu East LGA, Ogun. Muṣin (Lagos Mainland) is a separate but etymologically linked settlement — both named for the sacred Iṣin tree.',
    website: 'https://ijebuimusin.com/',
    color: '#00c87c',
  },
  {
    id: 17, set: 3, ilu: 'Muṣin', short: 'Muṣin',
    etymology: 'Mu Iṣin — ibi tí a ti n mú Iṣin (where we pick Iṣin)',
    ipinle: 'Lagos', region: 'SW',
    odufa: '—',
    orisa: '—',
    oye_oba: 'Ọba of Muṣin (Olu of Muṣin)',
    oruko_oba: 'His Royal Majesty, Oba Fatai Ayinla Aileru, the Olu of Mushinland',
    odun: '—',
    omiran: 'Muṣin (Mushin) is a Local Government Area on Lagos Mainland. Etymologically linked to Imuṣin (Ijebu East LGA) — both settlements named for the sacred Iṣin tree.',
    website: 'https://mushin.lg.gov.ng/',
    color: '#00c87c',
  },
  {
    id: 6, set: 1, ilu: 'Ìjẹ̀bú', short: 'Ìjẹ̀bú',
    etymology: 'Ìjẹ ibú — Food of the deep sea/abyss. Roots: Àjẹ̀bú (Àjẹ̀bú and Olóde, the two prominent leaders and original founders of Ìjẹ̀bú)',
    ipinle: 'Ogun', region: 'SW',
    odufa: 'Ọ̀ṣẹ́turá (Ọ̀ṣẹ́ + Òtúrá)',
    orisa: 'Agẹmọ, Alárẹ̀, Àjẹ̀bú, Olóde, Ọbánta',
    oye_oba: 'Ọba of Ìjẹ̀bú (Awùjalẹ̀ of Ìjẹ̀búland)',
    oruko_oba: 'Oba Sikiru Kayode Adetona (deceased, 2025)',
    odun: 'Agẹmọ Festival (seven days, annual), Ojúde Ọba',
    omiran: 'Ancient Ijebu kingdom, capital at Ijebu Ode. Famous Agemo masquerade tradition. Powerful pre-colonial merchant state.',
    website: 'https://ojudeoba.com/',
    color: '#8b5cf6',
  },
  {
    id: 7, set: 1, ilu: 'Ìjẹ̀bú Òde', short: 'Ìjẹ̀bú Òde',
    etymology: 'Founded by Àjẹ̀bú and Olóde from Ilé-Ifẹ̀ — their names fused into the town\'s name',
    ipinle: 'Ogun', region: 'SW',
    odufa: 'Ọ̀ṣẹ́turá',
    orisa: 'Agẹmọ, Alárẹ̀, Àjẹ̀bú, Olóde, Ọbánta',
    oye_oba: 'Ọba of Ìjẹ̀bú (Awùjalẹ̀ of Ìjẹ̀búland)',
    oruko_oba: 'Oba Sikiru Kayode Adetona (deceased, 2025)',
    odun: 'Agẹmọ Festival (seven days, annual), Ojúde Ọba',
    omiran: 'Capital of Ijebu kingdom. Major Yoruba trade city in Ogun State. Founded by emigrants from Ilé-Ifẹ̀.',
    website: 'https://ogunstate.gov.ng/',
    color: '#14b8d4',
  },
  {
    id: 8, set: 1, ilu: 'Ṣagámù / Ìṣagámù', short: 'Ṣagámù',
    etymology: 'Òrìṣàgamu Ẹwà — Òrìṣà gún àmù ẹwà: the Orisa shattered the beautiful, mysterious clay pot',
    ipinle: 'Ogun', region: 'SW',
    odufa: '—',
    orisa: 'Yewa (Iyewa, Iyawa), Agẹmọ',
    oye_oba: 'Ọba of Remoland (Àkárìgbò of Remoland)',
    oruko_oba: 'Oba Babatunde Ajayi (Àkárìgbò)',
    odun: 'Ṣagámù Day, Agẹmọ Festival, Bàtọ̀rọ̀ Orò Festival, Líderò Festival',
    omiran: 'Seat of Remo traditional government in Ogun State. Major commercial and educational city on Lagos–Ibadan axis.',
    website: 'https://ogunstate.gov.ng/',
    color: '#d4a017',
  },

  // ── Káà Kejì — Set 2 ────────────────────────────────────────────────────
  {
    id: 9, set: 2, ilu: 'Ìrẹ́mọ (Rẹ́mọ)', short: 'Ìrẹ́mọ',
    etymology: 'Ìrẹ́mọ (Ìrẹ́ ọmọ) Quarters of Ilé-Ifẹ̀ — Rẹ́mọ Métààlélógbòn (33 Rẹ́mọ Towns)',
    ipinle: 'Ogun', region: 'SW',
    odufa: '—',
    orisa: 'Agẹmọ, Ẹ̀lúkú',
    oye_oba: 'Ọba of Remoland (Àkárìgbò of Remoland)',
    oruko_oba: 'Oba Babatunde Ajayi (Àkárìgbò)',
    odun: 'Egúngún Ẹ̀lúkú Festival, Agẹmọ Festival, Bàtọ̀rọ̀ Orò Festival, Líderò Festival',
    omiran: 'Rẹ́mọ\'s origin is Ìrẹ́mọ Quarters in Ilé-Ifẹ̀. The Remo sub-group of Yoruba (Ogun/Lagos State).',
    color: '#8b5cf6',
  },
  {
    id: 10, set: 2, ilu: 'Ìṣarà (Rẹ́mọ)', short: 'Ìṣarà',
    etymology: 'Ìṣe Àrà — Ọmọọba Adéyẹmọ (Ọdẹmọ/Ọdẹ Ọmọ/Adé Ọmọ) founded Ìṣarà, along with his hunter companions, Iṣẹ́ Ọ̀rúnmìlà and Àrà; the 3 travelled together as ọdẹ (hunters) from Ilé-Ifẹ̀ to present-day Iṣẹ́-Àrà (Ìṣarà). Iṣẹ́ was the Babalawo.',
    ipinle: 'Ogun', region: 'SW',
    odufa: '—',
    orisa: 'Ajé, Orò, Agẹmọ, Ọdẹmọ, Iṣẹ́ Ọ̀rúnmìlà, Àrà',
    oye_oba: 'Ọdẹmọ of Isara',
    oruko_oba: 'HRM Oba Peter Olúwọlé Ògúnbáyọ̀ (Ọ̀tẹ̀tẹ́ III)',
    odun: 'Agẹmọ Festival, Rẹ́mọ Day Festival',
    omiran: 'Ìṣarà-Rẹ́mọ. Birthplace of Chief Obafemi Awolowo. In Remo, Ogun State.',
    website: 'https://isara-remo.webflow.io/',
    color: '#00c87c',
  },
  {
    id: 11, set: 2, ilu: 'Èṣúré', short: 'Èṣúré',
    etymology: 'Ẹ̀ṣù ré yùn — pay Ẹ̀ṣù his due homage/offering',
    ipinle: 'Ogun', region: 'SW',
    odufa: '—',
    orisa: 'Ògún Obélú, Yemọja, Èṣù',
    oye_oba: 'Obélú of Èṣúré',
    oruko_oba: 'Alayeluwa Oba AbdSamad Olalekan Kasali',
    odun: 'Ọdún Ògún Obélú (every November), Ọdún Yemọja',
    omiran: 'Èṣúré, Ìjẹ̀bú Imuṣin, is in Ìjẹ̀bú East LGA.',
    website: 'https://esurecommunity.org.ng/',
    color: '#ef4444',
  },
  {
    id: 12, set: 2, ilu: 'Òṣogbo', short: 'Òṣogbo',
    etymology: 'Oṣó Inú Igbó — the powerful/mysterious one dwelling within the forest',
    ipinle: 'Osun', region: 'SW',
    odufa: 'Ìdin Amìlẹ̀kẹ̀ / Ìdin Òṣogbo (Òdí Ìrẹté)',
    orisa: 'Ọṣun',
    oye_oba: 'Ataoja of Osogbo',
    oruko_oba: 'Oba Jimoh Oyetunji Larooye II',
    odun: 'Osun-Osogbo Festival (UNESCO Intangible Heritage)',
    omiran: 'Capital of Osun State. UNESCO World Heritage Sacred Grove. Global centre of Ọṣun veneration.',
    website: 'https://www.osunstate.gov.ng/',
    color: '#d4a017',
  },
  {
    id: 13, set: 2, ilu: 'Ìbàdàn', short: 'Ìbàdàn',
    etymology: 'Ẹ̀bá Ọ̀dàn — By the edge of the wide-open savannah/grassland (Ọ̀dàn)',
    ipinle: 'Ọ̀yọ́', region: 'SW',
    odufa: 'Ọ̀ṣẹ́ Méjì (Ọ̀ṣẹ́ Olúbàdàn)',
    orisa: 'Yemọja, Olóòlù, Ọya, Ṣàńgó',
    oye_oba: 'Olúbàdàn of Ibadanland',
    oruko_oba: 'Oba Rashidi Adewolu Akanmu Ladoja',
    odun: 'Olóòlù Festival, Òkè\'bàdàn Festival, Egúngún Festival',
    omiran: 'Largest city in West Africa by land area. Home of University of Ibadan (est. 1948). Capital of Oyo State.',
    website: 'https://oyostate.gov.ng/',
    color: '#6366f1',
  },
  {
    id: 14, set: 2, ilu: 'Ìlọrin', short: 'Ìlọrin',
    etymology: 'Ìlọ irin — The forging of iron; land of ironworkers and metal smiths',
    ipinle: 'Kwara', region: 'N-Central',
    odufa: 'Ọ̀kànràn Ìwòrì',
    orisa: 'Ògún',
    oye_oba: 'Emir of Ilorin',
    oruko_oba: 'Alhaji Ibrahim Sulu-Gambari',
    odun: 'Emir\'s Sallah Durbar',
    omiran: 'Capital of Kwara State. Originally a frontier settlement and military outpost of the ancient Oyo Empire; came under Fulani emirate in 19th c. Major cultural crossroads.',
    website: 'https://kwarastate.gov.ng/',
    color: '#3b9eff',
  },
  {
    id: 15, set: 2, ilu: 'Òndó', short: 'Òndó',
    etymology: 'Òde Ìdó — Outer frontier/exit of Ido; founded by Princess Pupupu of Ilé-Ifẹ̀',
    ipinle: 'Ondo', region: 'SW',
    odufa: 'Ọ̀bárà Méjì',
    orisa: 'Ògún, Ọrẹ̀',
    oye_oba: 'Osemawe of Ondo',
    oruko_oba: 'Oba Dr. Victor Kiladejo',
    odun: 'Ògún Festival, Igogo Festival',
    omiran: 'Founded by Princess Pupupu, daughter of the Ooni of Ile-Ife. In Ondo State.',
    website: 'https://ondostate.gov.ng/',
    color: '#ec4899',
  },
  {
    id: 16, set: 2, ilu: 'Ìláròó', short: 'Ìláròó',
    etymology: 'Ìlú Àró — Town of Àró, a Yoruba chieftancy title',
    ipinle: 'Ogun', region: 'SW',
    odufa: '—',
    orisa: 'Yewa (Iyewa, Iyawa)',
    oye_oba: 'Olu of Ilaro and Paramount Ruler of Yewaland',
    oruko_oba: 'Oba Kehinde Gbadewole Olugbenle',
    odun: 'Oronna Ilaro Festival',
    omiran: 'Ìláròó (Ilaro) is the headquarters of Yewaland, the Yewa South Local government.',
    website: 'https://www.ilaramokin.org/',
    color: '#f5c518',
  },
];

// 8 compass positions for the radial overlay (matching 8 Odu columns)
const COMPASS = [
  { key: 'etymology', label: 'Etymology · Ìpìnlẹ̀ ọ̀rọ̀', icon: '◌', area: 'nw', sym: 'NW' },
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

// ─── OPON IFA CIRCULAR VIEW ──────────────────────────────────────────────────

const AREA_ANGLE = { n: 0, ne: 45, e: 90, se: 135, s: 180, sw: 225, w: 270, nw: 315 };

function OponView({ town }) {
  const R = 38;
  const nodes = COMPASS.map(f => {
    const rad = (AREA_ANGLE[f.area] * Math.PI) / 180;
    return {
      ...f,
      x: 50 + R * Math.sin(rad),
      y: 50 - R * Math.cos(rad),
      val: town[f.key] || '—',
    };
  });

  return (
    <div className="ift-opon">
      {/* Decorative rings, cross-lines, spokes */}
      <svg className="ift-opon__svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        <circle cx="50" cy="50" r="47" fill="none"
          stroke={town.color} strokeOpacity="0.12" strokeWidth="0.45" strokeDasharray="1.5 3" />
        <line x1="50" y1="3" x2="50" y2="97"
          stroke={town.color} strokeOpacity="0.06" strokeWidth="0.25" />
        <line x1="3" y1="50" x2="97" y2="50"
          stroke={town.color} strokeOpacity="0.06" strokeWidth="0.25" />
        <circle cx="50" cy="50" r={R} fill="none"
          stroke={town.color} strokeOpacity="0.08" strokeWidth="0.3" />
        <circle cx="50" cy="50" r="10" fill={town.color + '0d'}
          stroke={town.color} strokeOpacity="0.38" strokeWidth="0.5" />
        {nodes.map(n => (
          <line key={n.key} x1="50" y1="50" x2={n.x} y2={n.y}
            stroke={town.color} strokeOpacity="0.2" strokeWidth="0.28" />
        ))}
        {nodes.map(n => (
          <circle key={n.key} cx={n.x} cy={n.y} r="1.3"
            fill={town.color} fillOpacity="0.5" />
        ))}
      </svg>

      {/* Center */}
      <div className="ift-opon__center"
        style={{ borderColor: town.color + '44', background: town.color + '0d' }}>
        <div className="ift-opon__c-num" style={{ color: town.color }}>#{town.id}</div>
        <div className="ift-opon__c-name" style={{ color: town.color }}>{town.short}</div>
        <div className="ift-opon__c-state">{town.ipinle}</div>
        {town.website && (
          <a className="ift-opon__c-site" href={town.website} target="_blank" rel="noopener noreferrer"
            style={{ color: town.color }}>↗</a>
        )}
      </div>

      {/* 8 data nodes */}
      {nodes.map(n => {
        const short = n.val.length > 26 ? n.val.slice(0, 24) + '…' : n.val;
        return (
          <div key={n.key} className="ift-opon__node"
            style={{ left: n.x + '%', top: n.y + '%', borderColor: town.color + '33' }}
            title={n.val}>
            <div className="ift-opon__node-lbl">
              <span className="ift-opon__node-icon" style={{ color: town.color }}>{n.icon}</span>
              {n.label}
            </div>
            <div className="ift-opon__node-val">{short}</div>
          </div>
        );
      })}
    </div>
  );
}

// ─── COMPASS OVERLAY ─────────────────────────────────────────────────────────

function TownCompass({ town, onClose }) {
  const [mode, setMode] = React.useState('rect');

  React.useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <div className="ift-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="ift-tab-panel" style={{ '--tc': town.color }}>

        {/* ── Header ── */}
        <div className="ift-tab-header">
          <div className="ift-tab-title">
            <span className="ift-tab-sigil">⊛</span>
            <span className="ift-tab-name">The IfaTab</span>
            <span className="ift-tab-paren">(Ọpọ́n Ifá Map)</span>
          </div>
          <div className="ift-mode-toggle">
            <span className={`ift-mode-opt${mode === 'rect' ? ' ift-mode-opt--on' : ''}`}>Rectangular</span>
            <button
              className={`ift-mode-track${mode === 'circ' ? ' ift-mode-track--right' : ''}`}
              onClick={() => setMode(m => m === 'rect' ? 'circ' : 'rect')}
              aria-label="Switch between rectangular and circular layout"
            >
              <span className="ift-mode-knob" />
            </button>
            <span className={`ift-mode-opt${mode === 'circ' ? ' ift-mode-opt--on' : ''}`}>Circular</span>
          </div>
          <button className="ift-tab-close" onClick={onClose} aria-label="Close">✕</button>
        </div>

        {/* ── Rectangular view ── */}
        {mode === 'rect' && (
          <div className="ift-compass">
            {COMPASS.map(f => (
              <div key={f.key} className={`ift-cell ift-cell--${f.area}`} data-area={f.area}>
                <div className="ift-cell__label">
                  <span className="ift-cell__icon">{f.icon}</span>
                  {f.label}
                </div>
                <div className="ift-cell__value">{town[f.key] || '—'}</div>
              </div>
            ))}
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
        )}

        {/* ── Circular (Ọpọ́n Ifá) view ── */}
        {mode === 'circ' && <OponView town={town} />}

      </div>
    </div>
  );
}

// ─── IFA TABLE ───────────────────────────────────────────────────────────────

function IfaTable() {
  const [active, setActive]   = React.useState(null);
  const [query, setQuery]     = React.useState('');
  const [sortKey, setSortKey] = React.useState('id');
  const [sortDir, setSortDir] = React.useState(1);

  // Filtered + sorted towns
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

  // Build render rows: interleave set-header rows with town rows
  const rows = React.useMemo(() => {
    // Group filtered towns by their set number, preserving sort order within each set
    const bySet = {};
    for (const t of filtered) {
      if (!bySet[t.set]) bySet[t.set] = [];
      bySet[t.set].push(t);
    }
    const out = [];
    let rowNum = 0;
    for (const s of DAFA_SETS) {
      const setTowns = bySet[s.set] || [];
      if (setTowns.length === 0) continue;
      out.push({ type: 'set-head', meta: s, count: setTowns.length });
      for (const t of setTowns) {
        rowNum++;
        out.push({ type: 'town', data: t, rowNum });
      }
    }
    return out;
  }, [filtered]);

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
          {filtered.length} / {TOWNS.length} towns · tap name to explore
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
            {rows.map((row) => {
              if (row.type === 'set-head') {
                const s = row.meta;
                return (
                  <tr key={`set-${s.set}`} className="ift-set-head">
                    <td colSpan={9} className="ift-set-head__td">
                      <span className="ift-set-head__sym" style={{ color: s.color }}>{s.sym}</span>
                      <span className="ift-set-head__name" style={{ color: s.color }}>{s.name}</span>
                      <span className="ift-set-head__odu" style={{ borderColor: s.color + '55', color: s.color + 'cc' }}>{s.part}</span>
                      <span className="ift-set-head__sub">{s.sub}</span>
                      <span className="ift-set-head__count" style={{ color: s.color + 'aa' }}>{row.count} towns</span>
                    </td>
                  </tr>
                );
              }
              const t = row.data;
              return (
                <tr
                  key={t.id}
                  className={'ift-row' + (active && active.id === t.id ? ' ift-row--active' : '')}
                  style={{ '--tc': t.color }}
                >
                  <td className="ift-td ift-td--num">{row.rowNum}</td>
                  <td
                    className="ift-td ift-td--ilu"
                    onClick={() => setActive(active && active.id === t.id ? null : t)}
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
                    {t.note_links && t.note_links.map((nl, i) => (
                      <span key={i}> <a className="ift-site-link" href={nl.href} target="_blank" rel="noopener noreferrer">{nl.text}</a></span>
                    ))}
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
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Compass overlay */}
      {active && (
        <TownCompass
          town={active}
          onClose={() => setActive(null)}
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

// ─── UNDER DEVELOPMENT BANNER ────────────────────────────────────────────────

const ODU_MARKS = ['⊕','⊗','◉','⊛','◎','◈','◌','◇'];

function DevBanner() {
  return (
    <div className="dev-banner" role="status" aria-label="Under Development">
      <div className="dev-banner__marks dev-banner__marks--left" aria-hidden="true">
        <div className="dev-banner__col">
          {ODU_MARKS.slice(0,4).map((m,i) => (
            <span key={i} className="dev-banner__mark" style={{ animationDelay: `${i * 0.18}s` }}>{m}</span>
          ))}
        </div>
        <div className="dev-banner__col">
          {ODU_MARKS.slice(4,8).map((m,i) => (
            <span key={i} className="dev-banner__mark" style={{ animationDelay: `${(i + 4) * 0.18}s` }}>{m}</span>
          ))}
        </div>
      </div>

      <div className="dev-banner__body">
        <span className="dev-banner__sigil" aria-hidden="true">⬡</span>
        <div className="dev-banner__text">
          <span className="dev-banner__title">Under Development</span>
          <span className="dev-banner__sub">
            Ìdàgbàsókè — The Playground is being built.
            New towns, Odu mappings, and features arriving.
          </span>
        </div>
        <span className="dev-banner__sigil" aria-hidden="true">⬡</span>
      </div>

      <div className="dev-banner__marks dev-banner__marks--right" aria-hidden="true">
        <div className="dev-banner__col">
          {ODU_MARKS.slice(4,8).map((m,i) => (
            <span key={i} className="dev-banner__mark" style={{ animationDelay: `${(7 - i) * 0.18}s` }}>{m}</span>
          ))}
        </div>
        <div className="dev-banner__col">
          {ODU_MARKS.slice(0,4).map((m,i) => (
            <span key={i} className="dev-banner__mark" style={{ animationDelay: `${(3 - i) * 0.18}s` }}>{m}</span>
          ))}
        </div>
      </div>
    </div>
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
        <p className="pg-hero__dafa-sub">
          The Eight-Based Dafabase Structure — Ètò Ibùdó-Ẹ̀gbà Ifá Oníkáà Mẹ́jọ
        </p>
        <p className="pg-hero__motto">
          Building the Dafabase, the IfaDatabase for Yorubaland on the IFA Internet…
        </p>
        <div className="pg-hero__meta">
          <span className="pg-meta-pill">8 Columns · Ifa Architecture</span>
          <span className="pg-meta-pill">IfaDatabase Management System</span>
          <span className="pg-meta-pill">Dafabase Management System (DfBMS)</span>
          <span className="pg-meta-pill">Database Management System (DBMS)</span>
          <span className="pg-meta-pill">IfaComputing</span>
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

// ─── ODU MARK ────────────────────────────────────────────────────────────────
// '1' → single vertical line (Ogbe/Energy)  |  '0' → double vertical lines (Oyeku/Anergy)

function OduMark({ code }) {
  return (
    <div className="odu-m">
      {code.split('').map((b, i) => (
        <div key={i} className="odu-m__row">
          {b === '0'
            ? <><span className="odu-m__bar" /><span className="odu-m__bar" /></>
            : <span className="odu-m__bar odu-m__bar--s" />
          }
        </div>
      ))}
    </div>
  );
}

// For Méjì: both columns carry the same code; rotating 180° physically reverses the rows
// → the partner Méjì's marks appear. For composite Odu: leftCode ≠ rightCode; marks swap
// at the midpoint so the partner composite is shown when fully rotated.
// Drag vertically or click to rotate; snaps to 0° / 180° on release.
function OduFlipPair({ odu1, odu2, pairLabel }) {
  const [displayDeg, setDisplayDeg] = React.useState(0);
  const [nameIdx, setNameIdx]       = React.useState(0);
  const [animated, setAnimated]     = React.useState(true);
  const currentDeg = React.useRef(0);
  const drag       = React.useRef({ on: false, y0: 0, startDeg: 0, moved: false });

  function applyDeg(d, anim) {
    currentDeg.current = d;
    setAnimated(anim);
    setDisplayDeg(d);
  }
  function syncName(d) {
    const norm = ((Math.round(d) % 360) + 360) % 360;
    setNameIdx(norm >= 90 && norm < 270 ? 1 : 0);
  }
  function clickRotate() {
    const base = Math.round(currentDeg.current / 180) * 180;
    const next = base + 180;
    applyDeg(next, true);
    setTimeout(() => syncName(next), 375);
  }
  function onPD(e) {
    drag.current = { on: true, y0: e.clientY, startDeg: currentDeg.current, moved: false };
    setAnimated(false);
    e.currentTarget.setPointerCapture(e.pointerId);
  }
  function onPM(e) {
    if (!drag.current.on) return;
    const dy = e.clientY - drag.current.y0;
    if (Math.abs(dy) > 4) drag.current.moved = true;
    const newDeg = drag.current.startDeg + dy * 1.8;
    currentDeg.current = newDeg;
    setDisplayDeg(newDeg);
    syncName(newDeg);
  }
  function onPU() {
    if (!drag.current.on) return;
    drag.current.on = false;
    if (!drag.current.moved) {
      clickRotate();
    } else {
      const snapped = Math.round(currentDeg.current / 180) * 180;
      applyDeg(snapped, true);
      syncName(snapped);
    }
  }

  const shown   = nameIdx === 0 ? odu1 : odu2;
  const partner = nameIdx === 0 ? odu2 : odu1;
  // Always render odu1's codes — the CSS transform achieves the visual partner transition.
  // Méjì (has .code): rotate(180°) reverses row order → e.g. '0011' visually becomes '1100'.
  // Composite (has .leftCode): rotateY(180°) swaps left↔right columns without inverting rows
  //   → partner is exactly odu1's columns in swapped positions. No code swap needed in either case.
  const isMeji    = !odu1.leftCode;
  const leftCode  = odu1.leftCode ?? odu1.code;
  const rightCode = odu1.rightCode ?? odu1.code;

  return (
    <div className="odu-fpair">
      {pairLabel && <div className="odu-fpair__pair-label">{pairLabel}</div>}
      <div className="odu-fpair__stage"
           onPointerDown={onPD} onPointerMove={onPM} onPointerUp={onPU}
           role="button" tabIndex={0}
           onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') clickRotate(); }}>
        <div className="odu-fpair__marks"
             style={{
               transform: isMeji ? `rotate(${displayDeg}deg)` : `rotateY(${displayDeg}deg)`,
               transition: animated ? 'transform 0.75s cubic-bezier(0.4,0,0.2,1)' : 'none',
             }}>
          <OduMark code={leftCode} />
          <OduMark code={rightCode} />
        </div>
        <div className="odu-fpair__nameplate">
          <span className="odu-fpair__name">{shown.name}</span>
          <span className="odu-fpair__meji">{shown.meji}</span>
        </div>
        <div className="odu-fpair__hint" aria-hidden="true">↻ drag or click → {partner.name}</div>
      </div>
    </div>
  );
}

// ─── SCARIFICATION SECTION ───────────────────────────────────────────────────

const ILA_MARKS = [
  { name: 'Pélé',          pattern: '3 vertical lines on cheeks',          origin: 'Ilé-Ifẹ̀'       },
  { name: 'Àbàjà',        pattern: '3–4 horizontal stripes per cheek (sometimes twelve horizontal lines, six lines per cheek)',    origin: 'Oyo (Aláàfin)' },
  { name: 'Gọ̀mbọ́/Kẹ́kẹ́', pattern: 'Multiple curved lines near mouth', origin: 'Ogbomosho'      },
  { name: 'Òwu',          pattern: '6 incisions per cheek',               origin: 'Abeokuta / Owu' },
  { name: 'Soju',        pattern: 'Single vertical line per cheek',      origin: 'Ondo'           },
  { name: 'Yagba',       pattern: '3 converging lines at mouth corners', origin: 'North Yoruba'   },
];

function ScarificationSection() {
  return (
    <section className="scar-section">
      <div className="scar-inner">

        <div className="scar-heading-row">
          <span className="scar-sigil" aria-hidden="true">◈</span>
          <div>
            <h2 className="scar-title">Ifa-Orisa Scarification Arts, Sciences, and Technology</h2>
          </div>
        </div>

        {/* 1 — Tattoo */}
        <div className="scar-block">
          <h3 className="scar-sub-title">Ifa &amp; Orisa Tattoo</h3>
          <p className="scar-sub-tag">Tattoo and Tribal Marks as Ifa-Orisa Visual Language</p>
          <p className="scar-body">
            In Ifa-Orisa Tradition, body inscription encodes identity, lineage, and Orisa devotion.
            Each mark is a living visual language — a declaration of Ìlú (town), Ẹbí (family), and Òrìṣà
            covenant. Drawing blood through the act of marking is itself a sacred agreement with
            ancestral and spiritual forces.
          </p>
          <div className="scar-vocab">
            <span className="scar-vocab__item"><em>Tattoo</em> — fín-fín ara, òòlà</span>
            <span className="scar-vocab__item"><em>Tattooing</em> — Ara fínfín</span>
            <span className="scar-vocab__item"><em>Tattoo artist</em> — Olóòlà</span>
          </div>
        </div>

        {/* Abẹ́gán — the sacred workspace */}
        <div className="scar-abegan">
          <span className="scar-abegan__label">Abẹ́gán</span>
          <span className="scar-abegan__def">
            The workspace of the
            {' '}<em>Tattoo Artist · Tribal Mark Artist · Native Medical Scientist · Ancient Surgeon</em>
            {' '}— <em>Olóòlà · Ọ̀kọlà · Oníṣègùn · Oníṣẹ́ ábẹ</em>
          </span>
        </div>

        {/* 2 — Tribal Marks */}
        <div className="scar-block">
          <h3 className="scar-sub-title">Ifa-Orisa Tribal Marks</h3>
          <p className="scar-sub-tag">Ilà — Scarification as Town, Clan &amp; Òrìṣà Identity</p>
          <p className="scar-body">
            Ilà (tribal marks) are facial and body scarifications that identify a person's town, clan,
            and Òrìṣà lineage.
          </p>
          <p className="scar-body">
            Cuts are made by the Ọ̀kọlà (tribal mark artist) using iron blades —
            within Ògún's domain — and carry protective, spiritual, and royal covenant weight.
          </p>
          <p className="scar-body">
            In Yorubaland, Ilà also served as a form of beautification — marks of aesthetic distinction
            that enhanced personal attractiveness and adorned the face and body with cultural elegance.
          </p>
          <div className="scar-marks-grid">
            {ILA_MARKS.map(m => (
              <div key={m.name} className="scar-mark-card">
                <div className="scar-mark-card__name">{m.name}</div>
                <div className="scar-mark-card__origin">{m.origin}</div>
                <div className="scar-mark-card__pattern">{m.pattern}</div>
              </div>
            ))}
          </div>
          <div className="scar-vocab">
            <span className="scar-vocab__item"><em>Line</em> — Ìlà</span>
            <span className="scar-vocab__item"><em>Tribal mark</em> — Ilà</span>
            <span className="scar-vocab__item"><em>Tribal mark artist</em> — Ọ̀kọlà/Olóòlà</span>
          </div>
        </div>

        {/* 2b — Ikoólo & Gbẹ́rẹ́ sísín */}
        <div className="scar-block scar-block--ikoolo-special">
          <h3 className="scar-sub-title">Ikoólo — Tribal Mark &amp; Medical Treatment</h3>
          <p className="scar-sub-tag">Both an Ifa-Orisa Tribal Mark and a Medical Procedure · Therapeutic Scarification in Ancient Ilẹ̀-Ifẹ̀</p>
          <div className="scar-ikoolo">
            <div>
              <span className="scar-ikoolo__term">Ikoólo</span>
              <span className="scar-dim"> — also: ìkoólo wẹ́wẹ́ · koólò wẹ́wẹ́</span>
            </div>
            <p className="scar-ikoolo__def">
              Sixty (60) careful marks made all over the body of a sick child — one of the oldest forms
              of therapeutic scarification in ancient Ilẹ̀-Ifẹ̀ documented in Odu Ifa, used to treat specific
              diseases and medical conditions. Unique among Ifa-Orisa body inscriptions: Ikoólo
              functions simultaneously as a tribal mark and a medical treatment — a living inscription
              of both identity and healing.
            </p>
          </div>
          <div className="scar-ikoolo">
            <div>
              <span className="scar-ikoolo__term">Gbẹ́rẹ́ sísín</span>
            </div>
            <p className="scar-ikoolo__def">
              A unique form of therapy practised in ancient Ilẹ̀-Ifẹ̀ — a precursor of what is now
              known as Intravenous (IV) Therapy (intravenous injections and infusions). Gbẹ́rẹ́ sísín
              is Ifa-Orisa IV Medical Sciences and a <em>metascience</em> (metamedicine): it operates
              at the intersection of Ifa-Orisa Knowledge Systems, body science, and spiritual covenant.
            </p>
          </div>
          <div className="scar-compare">
            <div className="scar-compare__heading">Global Comparison — IV &amp; Needle-Based Medical Sciences</div>
            <div className="scar-compare__grid">
              <div className="scar-compare__col">
                <div className="scar-compare__col-label">Western IV Science</div>
                <div className="scar-compare__col-body">
                  Intravenous injections and infusions via needle into the bloodstream. Modern clinical
                  standard for drug delivery, hydration, and nutrition.
                </div>
              </div>
              <div className="scar-compare__col scar-compare__col--ifa">
                <div className="scar-compare__col-label">Gbẹ́rẹ́ sísín</div>
                <div className="scar-compare__col-sub">Ifa-Orisa IV Medical Sciences · African IV Medical Sciences · Metascience (Metamedicine)</div>
                <div className="scar-compare__col-body">
                  Ancient Ilẹ̀-Ifẹ̀ precursor to modern IV therapy — therapeutic body inscriptions and
                  treatment delivered through the body's surface, rooted in Ifa-Orisa Knowledge.
                  A metascience (metamedicine) combining physical treatment with spiritual covenant.
                </div>
              </div>
              <div className="scar-compare__col">
                <div className="scar-compare__col-label">Acupuncture</div>
                <div className="scar-compare__col-sub">Chinese Medical Science · Asian Medical Sciences</div>
                <div className="scar-compare__col-body">
                  Ancient Chinese therapy using fine needles inserted at specific body points to
                  regulate energy flow (Qi). One of the oldest documented needle-based medical systems.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 — IfaID */}
        <div className="scar-block scar-block--id">
          <h3 className="scar-sub-title">Ifa-Orisa Identification</h3>
          <p className="scar-sub-tag">IfaID · OrisaID — Ifa Identification · Orisa Identification</p>
          <p className="scar-body">
            Marks, tattoos, and devotional insignia form a living identification system.
          </p>
        </div>

        {/* 4 — Àṣà Ilà Kíkọ àti Ìwòsàn */}
        <div className="scar-block">
          <h3 className="scar-sub-title">Àṣà Ilà Kíkọ àti Ìwòsàn</h3>
          <p className="scar-sub-tag">The Tradition of Scarification and Medical Science in Ifa and Orisa Practices, Ìṣẹ̀ṣe</p>
          <p className="scar-body">
            In ancient Ilẹ̀-Ifẹ̀, the Abẹ́gán was a centre of knowledge and healing. Children who
            fell frequently ill were brought here for combined treatment:
            {' '}<em>íṣẹ́ ìkọlà</em> (scarification) · <em>íṣẹ́ ábẹ</em> (surgery) ·
            <em> íṣègùn</em> (medicine) · <em>ẹbọ</em> (offering) · <em>ètùtù</em> (propitiation).
          </p>
          <div className="scar-ikoolo">
            <div>
              <span className="scar-ikoolo__term">Ikoólo</span>
              <span className="scar-dim"> — also: ìkoólo wẹ́wẹ́ · koólò wẹ́wẹ́</span>
            </div>
            <p className="scar-ikoolo__def">
              Careful marks made all over the body of a sick child — one of the oldest forms of
              therapeutic scarification in ancient Ilẹ̀-Ifẹ̀ documented in Odu Ifa, used to treat specific
              diseases and medical conditions.
            </p>
          </div>
          <div className="scar-ifaref">
            <span className="scar-ifaref__label">IfaRef</span>
            <span className="scar-ifaref__pairs">
              IfaReferences (Ifa References): Ọ̀wọ́nrín Méjì &amp; Ìrosún Méjì · Ògúndá Méjì &amp; Ọ̀sá Méjì ·
              Ọ̀ṣẹ́-Òturá &amp; Òturá-Ọ̀ṣẹ́ · Ìwòrì-Ògúndá &amp; Ògúndá-Ìwòrì
            </span>
          </div>
          <p className="scar-ifaref-note">
            These are some of the Ifa-Orisa Laws of Nature governing Scarification and Medical Studies
            in the <em>IFA-ORISA Body of Knowledge (IFA-ORISABOK)</em>.
          </p>
          <div className="scar-odu-pairs">
            <OduFlipPair
              pairLabel="1st pair"
              odu1={{ name: 'Ọ̀wọ́nrín', meji: 'Ọ̀wọ́nrín Méjì', code: '0011' }}
              odu2={{ name: 'Ìrosún',   meji: 'Ìrosún Méjì',   code: '1100' }}
            />
            <OduFlipPair
              pairLabel="2nd pair"
              odu1={{ name: 'Ògúndá', meji: 'Ògúndá Méjì', code: '1110' }}
              odu2={{ name: 'Ọ̀sá',   meji: 'Ọ̀sá Méjì',   code: '0111' }}
            />
            <OduFlipPair
              pairLabel="3rd pair"
              odu1={{ name: 'Ìwòrì-Ògúndá', meji: 'Ìwòrì-Ògúndá', leftCode: '1110', rightCode: '0110' }}
              odu2={{ name: 'Ògúndá-Ìwòrì', meji: 'Ògúndá-Ìwòrì', leftCode: '0110', rightCode: '1110' }}
            />
            <OduFlipPair
              pairLabel="4th pair"
              odu1={{ name: 'Ọ̀ṣẹ́-Òturá',  meji: 'Ọ̀ṣẹ́-Òturá',  leftCode: '1011', rightCode: '1010' }}
              odu2={{ name: 'Òturá-Ọ̀ṣẹ́',  meji: 'Òturá-Ọ̀ṣẹ́',  leftCode: '1010', rightCode: '1011' }}
            />
          </div>
        </div>

        {/* Disclaimer */}
        <div className="scar-disclaimer">
          <p className="scar-disclaimer__text">
            Today, it is important for Yoruba/African parents to engage in necessary rites to provide
            spiritual support and protection for their children; but these rites should be done in line with
            the right Ifa and Orisa Traditions, Nigerian laws, and state laws. Also, it is a criminal
            offense to give a child tribal marks in Nigeria, meaning you cannot legally perform this
            practice on your child. While an adult can legally choose body modification for themselves,
            Section 24 of the Child Rights Act 2003 strictly prohibits anyone from making a skin mark
            or tattoo on any person under the age of 18.
          </p>
        </div>

      </div>
    </section>
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
      <DevBanner />
      <main className="pg-main">
        <PgTableLabel />
        <IfaTable />
      </main>
      <ScarificationSection />
      <PgFooter />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
