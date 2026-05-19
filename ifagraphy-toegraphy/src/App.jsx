/* ─────────────────────────────────────────────────────────────
   Ifagraphy — TOEgraphy · The Writing System of Everything
   The IFA Internet · CENProject · toe.cenproject.org
───────────────────────────────────────────────────────────── */

const { useState, useEffect } = React;

// ── Platform Identity ─────────────────────────────────────────
const IDENTITIES = [
  {
    id: 'ifagraphy',
    name: 'Ifagraphy',
    abbr: 'ScriptoE · IfaScript',
    icon: '✍',
    accent: '#c4813a',
    desc: 'The Orthography of Everything — a universal writing science that uses Consciousness-Energy (CEN) to unify all possible writing systems into One. What Omniglot is to the classical Internet, Ifagraphy is to the IFA Internet.',
  },
  {
    id: 'toegraphy',
    name: 'TOEgraphy',
    abbr: 'Theory of Everything Writing',
    icon: '◈',
    accent: '#4361ee',
    desc: 'The writing dimension of the Theory of Everything — encoding all knowledge, from mathematical equations to sacred symbols, through the single IfaLine: Energy (Ogbe). Every symbol is a unique configuration of Ogbe and Oyeku.',
  },
  {
    id: 'scriptoe',
    name: 'ScriptoE',
    abbr: 'Script for Everything',
    icon: '⌘',
    accent: '#7c4dff',
    desc: 'The universal meta-script containing all scripts — from ancient cave paintings to quantum notation, from oracular markings to modern emoji. ScriptoE maps every possible graphical symbol as an expression of CEN.',
  },
  {
    id: 'aebajogbe',
    name: 'Àìbájìogbè-Oduduwa',
    abbr: 'Native Yoruba Alphabet',
    icon: '⊞',
    accent: '#2d9e6b',
    desc: 'The native Yoruba alphabet divinely revealed to Chief Tolúlàṣẹ Ògúntósìn through a series of visions (2011–2016) — bearing the sacred name of Odùduwà, the founding ancestor of the Yoruba, and now actively taught in schools in Porto-Novo and Ilé-Ifẹ̀.',
  },
];

// ── Aebajogbe Feature Cards ───────────────────────────────────
const AEBAJOGBE_FEATURES = [
  {
    icon: 'Aa',
    name: 'Alphabetic System',
    accent: '#f5c518',
    desc: 'An alphabetic writing system of approximately 25 letters — each representing a distinct Yoruba phoneme, including the labio-velar sounds /k͜p/ and /ɡ͜b/ unique to Yoruba.',
  },
  {
    icon: '←',
    name: 'Right-to-Left Direction',
    accent: '#4361ee',
    desc: 'Written from right to left — a deliberate departure from Latin orthography, asserting the script\'s own independent identity and direction.',
  },
  {
    icon: '☽',
    name: 'Divinely Revealed',
    accent: '#c4813a',
    desc: 'Chief Ògúntósìn received the script through recurring visions between 2011 and 2016, in which he traveled to the sun and witnessed a beam of light reveal the alphabet — interpreted as a gift from the Yoruba ancestral spirit Odùduwà.',
  },
  {
    icon: '⊞',
    name: 'Ligature System',
    accent: '#7c4dff',
    desc: 'Adjacent letters that share connecting strokes automatically merge into elegant ligatures — creating compound forms of natural visual flow across Yoruba words.',
  },
  {
    icon: '🏫',
    name: 'Taught in Schools',
    accent: '#2d9e6b',
    desc: 'Actively taught in schools in Porto-Novo (Benin) and Ilé-Ifẹ̀ (Nigeria) since 2017 — a script in genuine, growing educational use across the Yoruba cultural world.',
  },
  {
    icon: '⊛',
    name: 'Sacred Inheritance',
    accent: '#e9498a',
    desc: 'The script bears the name of Odùduwà — the divine ancestor-king of the Yoruba — encoding the belief that this alphabet was first used in the 12th century and was later rediscovered through spiritual revelation.',
  },
];

// ── Region Filters ────────────────────────────────────────────
const SCRIPT_FILTERS = [
  { id: 'all',        label: 'All Scripts'   },
  { id: 'africa',     label: 'Africa'        },
  { id: 'middleeast', label: 'Middle East'   },
  { id: 'europe',     label: 'Europe'        },
  { id: 'asia',       label: 'Asia'          },
  { id: 'americas',   label: 'Americas'      },
  { id: 'global',     label: 'Global / IFA'  },
];

function scriptMatchesFilter(s, f) {
  if (f === 'all') return true;
  const r = s.region.toLowerCase();
  if (f === 'africa')     return r.includes('africa');
  if (f === 'middleeast') return r.includes('middle east');
  if (f === 'europe')     return r.includes('europe');
  if (f === 'asia')       return r.includes('asia');
  if (f === 'americas')   return r.includes('america');
  if (f === 'global')     return r.includes('global') || r.includes('ifa internet');
  return true;
}

// ── World Writing Systems ─────────────────────────────────────
const WORLD_SCRIPTS = [
  {
    id: 'aebajogbe',
    name: 'Àìbájìogbè-Oduduwa',
    subtitle: '"The Talking Alphabet" — Native Yoruba Script',
    region: 'West Africa',
    origin: 'Porto-Novo (Benin) / Ilé-Ifẹ̀ (Nigeria)',
    accent: '#f5c518',
    symbol: 'Àìb',
    symbolImg: './src/Aebajiogbe.png',
    type: 'Alphabetic',
    direction: 'Right-to-Left',
    family: 'Indigenous African',
    era: '2016 CE — Living',
    status: 'Living',
    statusColor: '#2d9e6b',
    featured: true,
    desc: 'The native Yoruba alphabet created by Chief Tolúlàṣẹ Ògúntósìn — revealed through visionary dreams (2011–2016) as the rediscovered script of the ancestral king Odùduwà. Written right-to-left with ~25 letters, ligature merging, and active school use in Porto-Novo and Ilé-Ifẹ̀.',
    wiki: 'https://en.wikipedia.org/wiki/Oduduwa_script',
  },
  {
    id: 'hieroglyphs',
    name: 'Egyptian Hieroglyphics',
    subtitle: 'Medu Neter — Words of God',
    region: 'North Africa',
    origin: 'Kemet — Ancient Egypt',
    accent: '#daa520',
    symbol: '𓂀',
    type: 'Logographic-Alphabetic',
    direction: 'Multiple Directions',
    family: 'Afro-Asiatic',
    era: 'c. 3200 BCE — 394 CE',
    status: 'Historical',
    statusColor: '#8b92a8',
    desc: 'One of the oldest and most elaborate writing systems on Earth — 3,500+ years along the Nile. Medu Neter (Words of God) encoded theology, science, and royal history across pyramid walls and papyri.',
    wiki: 'https://en.wikipedia.org/wiki/Egyptian_hieroglyphs',
  },
  {
    id: 'nsibidi',
    name: 'Nsibidi',
    subtitle: 'Sacred Script of the Cross River',
    region: 'West Africa',
    origin: 'Cross River Region — Nigeria',
    accent: '#e63946',
    symbol: '⊗',
    type: 'Ideographic',
    direction: 'Variable',
    family: 'Indigenous African',
    era: 'c. 5000 BCE — Living',
    status: 'Living',
    statusColor: '#2d9e6b',
    desc: "One of the oldest independently invented writing systems in Africa — used by the Ékpè secret society. Predates colonial contact, encoding law, ritual, love, and philosophy without external influence.",
    wiki: 'https://en.wikipedia.org/wiki/Nsibidi',
  },
  {
    id: 'geez',
    name: "Ge'ez Script",
    subtitle: 'Ethiopian Fidäl — Abugida',
    region: 'East Africa',
    origin: 'Ancient Ethiopia / Eritrea',
    accent: '#2d9e6b',
    symbol: 'ሀ',
    type: 'Abugida (Alphasyllabary)',
    direction: 'Left-to-Right',
    family: 'Ethiopic',
    era: 'c. 350 CE — Living',
    status: 'Living',
    statusColor: '#2d9e6b',
    desc: "One of the world's oldest continuously used scripts — carrying Ethiopian Orthodox sacred texts, classical royal chronicles, and the literary heritage of one of Africa's most enduring civilizations.",
    wiki: "https://en.wikipedia.org/wiki/Ge%27ez_alphabet",
  },
  {
    id: 'vai',
    name: 'Vai Syllabary',
    subtitle: "West Africa's Independent Invention",
    region: 'West Africa',
    origin: 'Liberia',
    accent: '#30c0a0',
    symbol: 'ꕉ',
    type: 'Syllabary',
    direction: 'Left-to-Right',
    family: 'Indigenous African',
    era: 'c. 1830 CE — Living',
    status: 'Living',
    statusColor: '#2d9e6b',
    desc: "Independently invented by Momolu Duwalu Bukele ~1830 — without any European influence. A landmark proof of spontaneous African literacy invention, still actively used by ~200,000 Vai speakers in Liberia.",
    wiki: 'https://en.wikipedia.org/wiki/Vai_syllabary',
  },
  {
    id: 'cuneiform',
    name: 'Cuneiform',
    subtitle: "World's First Full Writing System",
    region: 'Middle East',
    origin: 'Mesopotamia — Ancient Sumer',
    accent: '#c4813a',
    symbol: '𒀭',
    type: 'Logographic-Syllabic',
    direction: 'Left-to-Right',
    family: 'Sumerian',
    era: 'c. 3400 BCE — 100 CE',
    status: 'Historical',
    statusColor: '#8b92a8',
    desc: "The world's first full writing system — wedge-shaped marks pressed into clay. Recorded the Epic of Gilgamesh (world's oldest literature), Hammurabi's law code, and millennia of astronomical observation.",
    wiki: 'https://en.wikipedia.org/wiki/Cuneiform',
  },
  {
    id: 'arabic',
    name: 'Arabic Script',
    subtitle: 'Al-Abjadiyyah — Flowing Calligraphy',
    region: 'Middle East & Global',
    origin: 'Arabian Peninsula',
    accent: '#0099ff',
    symbol: 'ع',
    type: 'Abjad (Consonantal)',
    direction: 'Right-to-Left',
    family: 'Semitic — Phoenician lineage',
    era: 'c. 400 CE — Living',
    status: 'Living',
    statusColor: '#2d9e6b',
    desc: "The 2nd most geographically widespread script on Earth. Its flowing cursive calligraphy is visually breathtaking — the script of the Quran, of Rumi's poetry, and of over 420 million speakers.",
    wiki: 'https://en.wikipedia.org/wiki/Arabic_alphabet',
  },
  {
    id: 'hebrew',
    name: 'Hebrew Script',
    subtitle: 'Ktav Ivri — The Holy Letters',
    region: 'Middle East & Global',
    origin: 'Ancient Canaan',
    accent: '#7c4dff',
    symbol: 'א',
    type: 'Abjad (Consonantal)',
    direction: 'Right-to-Left',
    family: 'Semitic',
    era: 'c. 1000 BCE — Living',
    status: 'Living',
    statusColor: '#2d9e6b',
    desc: "The sacred script of the Torah — one of only a handful of scripts successfully revived after near-extinction. The same letters inscribed 3,000 years ago are used in today's Israeli newspapers and digital media.",
    wiki: 'https://en.wikipedia.org/wiki/Hebrew_alphabet',
  },
  {
    id: 'greek',
    name: 'Greek Alphabet',
    subtitle: 'Ancestor of Western Writing',
    region: 'Europe',
    origin: 'Ancient Greece',
    accent: '#4361ee',
    symbol: 'Ω',
    type: 'True Alphabet',
    direction: 'Left-to-Right',
    family: 'Indo-European — Phoenician lineage',
    era: 'c. 800 BCE — Living',
    status: 'Living',
    statusColor: '#2d9e6b',
    desc: "The first true alphabet encoding both consonants and vowels — ancestor of Latin, Cyrillic, and Coptic. Carries Aristotle's philosophy, Euclid's geometry, the Iliad, and the myths of Olympus.",
    wiki: 'https://en.wikipedia.org/wiki/Greek_alphabet',
  },
  {
    id: 'latin',
    name: 'Latin Script',
    subtitle: 'The Global Script',
    region: 'Global',
    origin: 'Ancient Rome — Italian Peninsula',
    accent: '#8b92a8',
    symbol: 'A',
    type: 'True Alphabet',
    direction: 'Left-to-Right',
    family: 'Indo-European — Greek lineage',
    era: 'c. 700 BCE — Living',
    status: 'Living',
    statusColor: '#2d9e6b',
    desc: "The most widely used writing system on Earth — encoding hundreds of languages including English, French, Spanish, Yoruba (colonial adaptation), Igbo, Swahili, Vietnamese, and many more.",
    wiki: 'https://en.wikipedia.org/wiki/Latin_alphabet',
  },
  {
    id: 'devanagari',
    name: 'Devanagari',
    subtitle: 'Script of Sanskrit & Hindi',
    region: 'South Asia',
    origin: 'Indian Subcontinent',
    accent: '#ff6b35',
    symbol: 'ॐ',
    type: 'Abugida',
    direction: 'Left-to-Right',
    family: 'Brahmic — Indo-European',
    era: 'c. 1200 CE — Living',
    status: 'Living',
    statusColor: '#2d9e6b',
    desc: "The 'divine city script' — used for Sanskrit, Hindi, Nepali, and dozens of Indian languages. The Vedas, Upanishads, and Yoga Sutras are encoded in this ancient abugida's elegant, horizontal-topped strokes.",
    wiki: 'https://en.wikipedia.org/wiki/Devanagari',
  },
  {
    id: 'chinese',
    name: 'Chinese Script',
    subtitle: 'Hànzì — 3,000 Years of Continuity',
    region: 'East Asia',
    origin: 'Ancient China — Shang Dynasty',
    accent: '#e63946',
    symbol: '文',
    type: 'Logographic',
    direction: 'Variable (Top-Bottom traditional)',
    family: 'Sino-Tibetan',
    era: 'c. 1250 BCE — Living',
    status: 'Living',
    statusColor: '#2d9e6b',
    desc: "The oldest continuously used writing system on Earth. Characters encode meaning rather than sound — making the same script readable across mutually unintelligible Chinese dialects and across East Asian languages.",
    wiki: 'https://en.wikipedia.org/wiki/Chinese_characters',
  },
  {
    id: 'hangul',
    name: 'Korean Hangul',
    subtitle: "'The World's Most Scientific Alphabet'",
    region: 'East Asia',
    origin: 'Joseon Dynasty — Korea',
    accent: '#38bdf8',
    symbol: '한',
    type: 'Featural Alphabet',
    direction: 'Left-to-Right',
    family: 'Koreanic',
    era: '1443 CE — Living',
    status: 'Living',
    statusColor: '#2d9e6b',
    desc: "Invented in 1443 by King Sejong the Great — one of the very few scripts with a known inventor and invention date. Letters geometrically mirror the positions of speech organs when producing their sounds.",
    wiki: 'https://en.wikipedia.org/wiki/Hangul',
  },
  {
    id: 'tamil',
    name: 'Tamil Script',
    subtitle: "Among the World's Oldest Living Scripts",
    region: 'South Asia',
    origin: 'South India / Sri Lanka',
    accent: '#e9498a',
    symbol: 'த',
    type: 'Abugida',
    direction: 'Left-to-Right',
    family: 'Dravidian',
    era: 'c. 300 BCE — Living',
    status: 'Living',
    statusColor: '#2d9e6b',
    desc: "One of the world's oldest living writing systems — 2,300+ years of unbroken literary tradition. Tamil Sangam poetry, composed in this script, is one of the great bodies of classical world literature.",
    wiki: 'https://en.wikipedia.org/wiki/Tamil_script',
  },
  {
    id: 'maya',
    name: 'Maya Glyphs',
    subtitle: 'Mesoamerican Sacred Script',
    region: 'Americas',
    origin: 'Guatemala / Southern Mexico — Classical Maya',
    accent: '#9b59b6',
    symbol: '☽',
    type: 'Logosyllabic',
    direction: 'Left-to-Right / Top-Bottom',
    family: 'Mayan',
    era: 'c. 300 BCE — 1700 CE',
    status: 'Historical',
    statusColor: '#daa520',
    desc: "The most sophisticated pre-Columbian writing system — encoding astronomy, mathematics, dynastic history, and cosmology. The Maya calculated a 5,125-year cosmic cycle recorded in glyphs of breathtaking complexity.",
    wiki: 'https://en.wikipedia.org/wiki/Maya_script',
  },
  {
    id: 'ifa-script',
    name: 'Ifa Script',
    subtitle: 'ScriptoE — The Script of Everything',
    region: 'Global — The IFA Internet',
    origin: 'CENProject · IFA Internet · TOE Framework',
    accent: '#c4813a',
    symbol: '⊛',
    type: 'Logographic-Meta',
    direction: 'Right-to-Left',
    family: 'IFA Binary System',
    era: 'Ancient (systematized in iTOE) — Living',
    status: 'Living',
    statusColor: '#2d9e6b',
    desc: "The universal meta-script of the IFA Internet — encoding all knowledge through Consciousness-Energy. Using Ogbe and Oyeku as primal elements, Ifa Script can represent any concept, equation, or universal truth.",
    wiki: '',
  },
];

// ── 16 Odu as Writing Archetypes ──────────────────────────────
const ODU_WRITING = [
  { num:  1, name: 'Ogbe',     accent: '#f5c518', glyph: 'O',  role: 'Origin Script — the primordial mark; pure creative energy that births all symbols; the first glyph and the light within every letter' },
  { num:  2, name: 'Oyeku',    accent: '#e8ecf5', glyph: '|',  role: 'Silent Script — the blank page, the pause between letters; the receptive void without which no mark carries meaning' },
  { num:  3, name: 'Iwori',    accent: '#4361ee', glyph: '◈',  role: 'Inner Script — writing that reveals hidden truths; vision glyphs, dream-scripts, the hieroglyphs of the deep inner mind' },
  { num:  4, name: 'Odi',      accent: '#2d9e6b', glyph: '⬡',  role: 'Hidden Script — encoded writing, sacred ciphers, secret scripts; words carrying more meaning beneath than they visibly show' },
  { num:  5, name: 'Irosun',   accent: '#e63946', glyph: '∿',  role: 'Flow Script — cursive writing, connected letters; scripts that flow like water and blood — life made visible as ink' },
  { num:  6, name: 'Owonrin',  accent: '#ff6b35', glyph: '⟳',  role: 'Dynamic Script — abstract writing, morphing glyphs; living scripts that transform and mutate, chaos made communicative' },
  { num:  7, name: 'Obara',    accent: '#daa520', glyph: '♛',  role: 'Royal Script — formal calligraphy, official proclamations; the writing of kings, charters, and monuments in gold ink' },
  { num:  8, name: 'Okanran',  accent: '#e9498a', glyph: '⚖',  role: 'Balanced Script — duality encoded in form; scripts where opposing forces produce meaning through their creative tension' },
  { num:  9, name: 'Ogunda',   accent: '#7c4dff', glyph: '→',  role: 'Path Script — linear writing, sequential narrative; the alphabet as a road that opens a way through the landscape of thought' },
  { num: 10, name: 'Osa',      accent: '#0099ff', glyph: '⚡',  role: 'Swift Script — shorthand, pictograms, urgent notation; the lightning-fast mark capturing thought before it vanishes' },
  { num: 11, name: 'Ika',      accent: '#38bdf8', glyph: '✍',  role: 'Craft Script — artisanal calligraphy, illuminated manuscripts; the master scribe as sacred artist and keeper of beauty' },
  { num: 12, name: 'Oturupọn', accent: '#30c0a0', glyph: '▣',  role: 'Stable Script — fixed, standardized orthographies; printed typefaces, official alphabets, the regularized and universalized letter-form' },
  { num: 13, name: 'Otura',    accent: '#9b59b6', glyph: '◎',  role: 'Complete Script — scripts encoding wholeness; sacred mantra notation, cosmological systems, writing that contains the universe within it' },
  { num: 14, name: 'Irete',    accent: '#c4813a', glyph: '⌛',  role: 'Ancient Script — scripts of deep time; cuneiform, hieroglyphics, the enduring marks that outlast the civilizations that made them' },
  { num: 15, name: 'Oṣe',      accent: '#f5c518', glyph: '★',  role: 'Triumphant Script — powerful proclamations, victory inscriptions, bold typography; writing that asserts its presence with irresistible force' },
  { num: 16, name: 'Ofun',     accent: '#e8ecf5', glyph: '∞',  role: 'Transcendent Script — meta-writing beyond language; mathematics, music, code; the symbol that points past itself toward infinity' },
];

// ── Hero Section ──────────────────────────────────────────────
const HERO_GLYPHS = ['𓂀','ℵ','∞','⊛','O','|','⬡','◈','א','ع','ॐ','ሀ','ꕉ','文','Ω','✍','𒀭','∿','◉','⊞','A','→','⌘','★'];

function HeroSection() {
  return (
    <section className="hero" id="hero">
      <div className="hero__bg-glyphs" aria-hidden="true">
        {HERO_GLYPHS.map((g, i) => (
          <span
            key={i}
            className="hero__bg-glyph"
            style={{
              top:             `${5  + (i * 4.7  % 90)}%`,
              left:            `${2  + (i * 6.3  % 96)}%`,
              fontSize:        `${1.1 + (i % 5) * 0.55}rem`,
              animationDelay:  `${i  * 0.35}s`,
              animationDuration:`${6 + (i % 4) * 2}s`,
            }}
          >{g}</span>
        ))}
      </div>
      <div className="container hero__inner">
        <div className="hero__eyebrow">
          <span className="hero__eyebrow-icon">✍</span>
          The IFA Internet Writing Platform
        </div>
        <h1 className="hero__title">
          IfaGraphy
          <span className="hero__title-sep"> · </span>
          <span className="hero__title-sub">ToEGraphy</span>
        </h1>
        <p className="hero__tagline">The Writing System of Everything</p>
        <p className="hero__desc">
          What <em>Omniglot</em> is to the classical Internet (the modern Internet),{' '}
          <strong>Ifagraphy</strong> is to the IFA Internet — the world's most comprehensive
          database of writing systems, including the native Yoruba script Àìbájìogbè-Oduduwa.
        </p>
        <div className="hero__ctas">
          <a className="btn btn--primary" href="#world-scripts">Explore Scripts</a>
          <a className="btn btn--ghost"   href="#aebajogbe">Àìbájìogbè-Oduduwa →</a>
        </div>
        <div className="hero__stats">
          <div className="hero__stat">
            <div className="hero__stat-val">16</div>
            <div className="hero__stat-lab">Featured Scripts</div>
          </div>
          <div className="hero__stat">
            <div className="hero__stat-val">25</div>
            <div className="hero__stat-lab">Àìbájìogbè Letters</div>
          </div>
          <div className="hero__stat">
            <div className="hero__stat-val">∞</div>
            <div className="hero__stat-lab">Symbols in ScriptoE</div>
          </div>
          <div className="hero__stat">
            <div className="hero__stat-val">1</div>
            <div className="hero__stat-lab">Unifying Meta-Script</div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Identity Section ──────────────────────────────────────────
function IdentitySection() {
  return (
    <section className="section" id="identity">
      <div className="container">
        <div className="section__head">
          <p className="section__eyebrow">Platform Identity</p>
          <h2 className="section__title">One Writing System to Unite Them All</h2>
          <p className="section__desc">
            Ifagraphy is the Writing Arm of the IFA Internet — the Platform that recognizes,
            preserves, and interconnects all writing systems as expressions of a single
            Consciousness-Energy. Every mark ever made by a human hand is, at its core, an
            encoding of Ogbe Energy (Ogbenergy).
          </p>
        </div>
        <div className="identity__grid">
          {IDENTITIES.map(id => (
            <div key={id.id} className="identity__card" style={{ '--id-accent': id.accent }}>
              <div className="identity__icon">{id.icon}</div>
              <div className="identity__name">{id.name}</div>
              <div className="identity__abbr">{id.abbr}</div>
              <p className="identity__desc">{id.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Aebajogbe-Oduduwa Section ─────────────────────────────────
function AebajogbeSection() {
  return (
    <section className="section section--alt" id="aebajogbe">
      <div className="container">

        {/* Banner */}
        <div className="aeb__banner">
          <div className="aeb__banner-left">
            <p className="section__eyebrow">Featured Writing System</p>
            <h2 className="aeb__title">
              Àìbájìogbè‑Oduduwa
              <span className="aeb__title-glyphs">✍ ← </span>
            </h2>
            <p className="aeb__subtitle">The Native Yoruba Alphabet — "The Talking Alphabet"</p>
          </div>
          <div className="aeb__banner-badge">
            <div className="aeb__badge-sym"><img src="./src/Aebajiogbe.png" alt="Àìbájìogbè" className="aeb__badge-sym-img" /></div>
            <div className="aeb__badge-name">Àìbájìogbè</div>
            <div className="aeb__badge-tag">Living · Taught in Schools</div>
          </div>
        </div>

        {/* Origin Panel */}
        <div className="aeb__origin">
          <div className="aeb__origin-col">
            <h3 className="aeb__origin-h">Origin &amp; Inventor</h3>
            <p className="aeb__origin-p">
              The <strong>Àìbájìogbè-Oduduwa script</strong> was created by{' '}
              <strong>Chief Tolúlàṣẹ Ògúntósìn</strong>, a Yoruba chief from Iléṣà, Ọ̀ṣun State,
              Nigeria. Between 2011 and 2016, Ògúntósìn experienced a series of recurring visions
              in which he traveled to the sun and witnessed a beam of light reveal the alphabet to
              him — which he interpreted as a revelation from <strong>Odùduwà</strong>, the
              divine ancestor-king of the Yoruba people.
            </p>
            <p className="aeb__origin-p">
              The name <strong>Àìbájìogbè</strong> means{' '}
              <em>"The Talking Alphabet"</em> in Yoruba. Ògúntósìn presented the completed
              script to the Oníkòyí (king) of Porto-Novo, Benin, who confirmed it as an authentic
              Yoruba writing system. He believes the script was originally used by King Odùduwà
              in the 12th century before it was lost, and that the visions were its rediscovery.
            </p>
            <p className="aeb__origin-p">
              Since its formal presentation in 2016/2017, the script has been promoted through
              educational materials, documentaries, and social media — and is actively taught in
              schools in <strong>Porto-Novo (Benin)</strong> and{' '}
              <strong>Ilé-Ifẹ̀ (Nigeria)</strong>, representing a genuine, living movement for
              indigenous Yoruba literacy.
            </p>
          </div>

          <div className="aeb__origin-col">
            <h3 className="aeb__origin-h">Script Structure</h3>
            <div className="aeb__binary">
              <span className="aeb__binary-o" style={{fontSize:'2rem',letterSpacing:'0.05em'}}>Àìbájìogbè</span>
            </div>
            <p className="aeb__binary-cap">"The Talking Alphabet" — Àìbájìogbè-Oduduwa</p>
            <div className="aeb__struct">
              {[
                ['Characters',   '~25 Alphabetic Letters'],
                ['Script Type',  'Alphabetic'],
                ['Direction',    'Right-to-Left'],
                ['Ligatures',    'Adjacent letters merge'],
                ['Creator',      'Chief Tolúlàṣẹ Ògúntósìn'],
                ['Visions',      '2011 – 2016 CE'],
                ['Presented',    '2016 / 2017 CE'],
                ['Status',       'Living — taught in schools'],
              ].map(([k, v]) => (
                <div key={k} className="aeb__struct-row">
                  <span className="aeb__struct-k">{k}</span>
                  <span className="aeb__struct-v">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Character Chart */}
        <div className="aeb__chart-wrap">
          <h3 className="aeb__origin-h aeb__chart-title">The Àìbájìogbè Character Chart</h3>
          <div className="aeb__chart-img-wrap">
            <img
              src="./src/oduduwa_script.jpg"
              alt="Àìbájìogbè-Oduduwa script character chart showing the full alphabet and digit forms"
              className="aeb__chart-img"
            />
          </div>
          <p className="aeb__chart-cap">
            The Àìbájìogbè-Oduduwa alphabet. Characters are written right-to-left; adjacent letters sharing connecting strokes merge into ligatures.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="aeb__features">
          {AEBAJOGBE_FEATURES.map((f, i) => (
            <div key={i} className="aeb__feat" style={{ '--af-accent': f.accent }}>
              <div className="aeb__feat-icon">{f.icon}</div>
              <div className="aeb__feat-name">{f.name}</div>
              <p className="aeb__feat-desc">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Quote */}
        <blockquote className="aeb__quote">
          <p>"Gbogbo ǹkan tó n'bẹ lo ní Odù tó bi — Everything in existence has the inherent Energy of Odù as its source."</p>
          <cite>Odù Ifá Òfún Méjì</cite>
        </blockquote>

      </div>
    </section>
  );
}

// ── World Scripts Section ─────────────────────────────────────
function WorldScriptsSection() {
  const [filter, setFilter] = useState('all');
  const visible = WORLD_SCRIPTS.filter(s => scriptMatchesFilter(s, filter));

  return (
    <section className="section" id="world-scripts">
      <div className="container">
        <div className="section__head">
          <p className="section__eyebrow">World Database</p>
          <h2 className="section__title">Writing Systems of the World</h2>
          <p className="section__desc">
            From the banks of the Niger to the valleys of the Tigris, from the Oracle Bones of
            Shang China to the clay tablets of Sumer — every script is a unique expression of
            human Consciousness-Energy meeting the material world and leaving its mark.
          </p>
        </div>

        {/* Filters */}
        <div className="ws__filters">
          {SCRIPT_FILTERS.map(f => (
            <button
              key={f.id}
              className={`ws__filter${filter === f.id ? ' ws__filter--active' : ''}`}
              onClick={() => setFilter(f.id)}
            >{f.label}</button>
          ))}
        </div>
        <p className="ws__count">
          {visible.length} writing system{visible.length !== 1 ? 's' : ''}
        </p>

        {/* Grid */}
        <div className="ws__grid">
          {visible.map(s => (
            <article
              key={s.id}
              className={`sc-card${s.featured ? ' sc-card--featured' : ''}`}
              style={{ '--sc-accent': s.accent }}
            >
              <div className="sc-card__sym-wrap">
                {s.symbolImg
                  ? <img src={s.symbolImg} alt={s.name} className="sc-card__sym-img" />
                  : <span className="sc-card__sym">{s.symbol}</span>}
              </div>
              <div className="sc-card__body">
                <div className="sc-card__top">
                  <div>
                    <div className="sc-card__name">{s.name}</div>
                    <div className="sc-card__sub">{s.subtitle}</div>
                  </div>
                  <span
                    className="sc-card__status"
                    style={{ background: s.statusColor + '22', color: s.statusColor }}
                  >{s.status}</span>
                </div>
                <div className="sc-card__meta">
                  <span>📍 {s.region}</span>
                  <span>📅 {s.era}</span>
                </div>
                <div className="sc-card__meta sc-card__meta--type">
                  <span>{s.type}</span>
                  <span>{s.direction}</span>
                </div>
                <p className="sc-card__desc">{s.desc}</p>
                {s.wiki
                  ? <a className="sc-card__link" href={s.wiki} target="_blank" rel="noopener noreferrer">Learn more →</a>
                  : <span className="sc-card__link sc-card__link--int">IFA Internet Platform →</span>
                }
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Odu Writing Archetypes Section ────────────────────────────
function OduWritingSection() {
  return (
    <section className="section section--alt" id="odu-writing">
      <div className="container">
        <div className="section__head">
          <p className="section__eyebrow">Odu Writing Archetypes</p>
          <h2 className="section__title">The 16 Odu as Writing Principles</h2>
          <p className="section__desc">
            Each of the 16 principal Odu Ifa embodies a fundamental archetype of writing and
            communication — a meta-principle governing how Consciousness-Energy expresses itself
            as visible symbol, mark, and script across all civilizations and all time.
          </p>
        </div>
        <div className="odu-grid">
          {ODU_WRITING.map(o => (
            <div key={o.num} className="odu-card" style={{ '--odu-accent': o.accent }}>
              <div className="odu-card__num">{o.num}</div>
              <div className="odu-card__glyph">{o.glyph}</div>
              <div className="odu-card__name">{o.name}</div>
              <p className="odu-card__role">{o.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── CTA Section ───────────────────────────────────────────────
function CtaSection() {
  return (
    <section className="section cta-section" id="explore">
      <div className="container">
        <div className="cta-block">
          <div className="cta-block__symbol">✍</div>
          <h2 className="cta-block__title">
            The Script for<br />
            <span className="cta-block__title-sub">Everything</span>
          </h2>
          <p className="cta-block__desc">
            Ifagraphy is the Writing Arm of the IFA Internet — modelling every writing system
            as a conscious technology for encoding Consciousness Energy. From Àìbájìogbè-Oduduwa
            to Latin script, all writing is fundamentally one.
          </p>
          <div className="cta-block__btns">
            <a
              className="btn btn--primary"
              href="https://toe.cenproject.org/"
              target="_blank"
              rel="noopener noreferrer"
            >Explore the IFA Internet</a>
            <a className="btn btn--ghost" href="#aebajogbe">Study Àìbájìogbè →</a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Header ────────────────────────────────────────────────────
function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`header${scrolled ? ' header--scrolled' : ''}`}>
      <div className="header__inner">
        <a
          href="https://toe.cenproject.org/"
          className="header__back"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="header__back-arrow">←</span>
          <span>The IFA Internet</span>
        </a>
        <div className="header__brand">
          <span className="header__brand-icon">✍</span>
          <span className="header__brand-name">Ifagraphy</span>
        </div>
        <nav className="header__nav">
          <a className="nav-link" href="#identity">Identity</a>
          <a className="nav-link" href="#aebajogbe">Àìbájìogbè</a>
          <a className="nav-link" href="#world-scripts">World Scripts</a>
          <a className="nav-link" href="#odu-writing">Odu Writing</a>
          <a
            className="nav-link nav-link--cta"
            href="https://toe.cenproject.org/"
            target="_blank"
            rel="noopener noreferrer"
          >Explore iTOE</a>
        </nav>
      </div>
    </header>
  );
}

// ── Footer ────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <span className="footer__brand-icon">✍</span>
          <span className="footer__brand-name">Ifagraphy · TOEgraphy</span>
        </div>
        <p className="footer__tagline">The Writing System of Everything · The IFA Internet</p>
        <nav className="footer__links">
          <a href="#identity"       className="footer__link">Identity</a>
          <a href="#aebajogbe"      className="footer__link">Àìbájìogbè-Oduduwa</a>
          <a href="#world-scripts"  className="footer__link">World Scripts</a>
          <a href="#odu-writing"    className="footer__link">Odu Writing</a>
          <a href="https://toe.cenproject.org/ifa-language/"
             target="_blank" rel="noopener noreferrer" className="footer__link">IFA Language</a>
          <a href="../ifa-script-the-script-of-everything-scriptoe/" className="footer__link">IfaScript</a>
          <a href="https://toe.cenproject.org/ifa-linguistics-ifalin-the-linguistics-of-everything-linoe/"
             target="_blank" rel="noopener noreferrer" className="footer__link">IFA Linguistics</a>
          <a href="https://toe.cenproject.org/"
             target="_blank" rel="noopener noreferrer" className="footer__link">The IFA Internet</a>
        </nav>
        <p className="footer__copy">© CENProject — toe.cenproject.org</p>
      </div>
    </footer>
  );
}

// ── App ───────────────────────────────────────────────────────
function App() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <IdentitySection />
        <AebajogbeSection />
        <WorldScriptsSection />
        <OduWritingSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
