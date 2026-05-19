/* ─────────────────────────────────────────────────────────────
   IfaScript — ScriptoE · The Script of Everything
   The IFA Internet · CENProject · toe.cenproject.org
───────────────────────────────────────────────────────────── */

const { useState, useEffect } = React;

// ── Platform Identity ─────────────────────────────────────────
const IDENTITIES = [
  {
    id: 'ifascript',
    name: 'IfaScript',
    abbr: 'IFA Scripting Platform',
    icon: '⌨',
    accent: '#00d4ff',
    desc: 'The Scripting Platform of the IFA Internet — the world\'s most comprehensive script explorer, covering natural writing systems, notation systems, digital encodings, and the IFA binary scripting system. What worldscriptsexplorer.page is to the classical Internet, IfaScript is to the IFA Internet.',
  },
  {
    id: 'scriptoe',
    name: 'ScriptoE',
    abbr: 'Script of Everything',
    icon: '⊛',
    accent: '#39d353',
    desc: 'The universal meta-script containing all scripts — every writing system, notation scheme, encoding protocol, and symbolic language, unified as expressions of Ogbe Energy (Ogbenergy). ScriptoE is the script layer of the Theory of Everything.',
  },
  {
    id: 'ifa-scripting',
    name: 'IFA Scripting',
    abbr: 'Scripting Practice · IfaLang · IFABOK',
    icon: '{ }',
    accent: '#7c4dff',
    desc: 'The scripting practice within IfaLang and the IFA Body of Knowledge (IFABOK) — using IFABits (Ogbe O / Oyeku |) as base operators, IFA Scripting encodes all knowledge, formulas, and commands in the language of Consciousness-Energy.',
  },
  {
    id: 'scriptnet',
    name: 'ScriptNet',
    abbr: 'The Script Network',
    icon: '◈',
    accent: '#f5c518',
    desc: 'The network of all scripts — connecting every notation system, writing system, and encoding protocol into a single unified knowledge web. ScriptNet is the script layer of IfaNet, the Network of Everything.',
  },
];

// ── Script Category Filters ───────────────────────────────────
const SCRIPT_CATEGORIES = [
  { id: 'all',      label: 'All Systems'     },
  { id: 'natural',  label: 'Natural Scripts' },
  { id: 'notation', label: 'Notation'        },
  { id: 'digital',  label: 'Digital'         },
  { id: 'ifa',      label: 'IFA System'      },
];

function scriptCatMatch(s, cat) {
  if (cat === 'all') return true;
  return s.category === cat;
}

// ── World Script Systems ──────────────────────────────────────
const SCRIPT_SYSTEMS = [
  // ── IFA SYSTEM ──
  {
    id: 'ifabits',
    name: 'IFABits',
    subtitle: 'Ogbe · Oyeku — The Binary Base',
    category: 'ifa',
    symbol: 'O|',
    accent: '#f5c518',
    type: 'Binary',
    chars: '2 base → 256',
    direction: 'Right-to-Left',
    encoding: 'IFA Binary System',
    status: 'Living',
    statusColor: '#39d353',
    featured: true,
    desc: 'The IFA scripting base — Ogbe (O, Energy) and Oyeku (|, Anergy) are the two primordial operators from which all 256 Odu Ifa are encoded as 8-IFABit sequences. Every script in ScriptoE is ultimately an expression of IFABit combinations.',
  },
  {
    id: 'odu-encoding',
    name: 'Odu Ifa Encoding',
    subtitle: '256 Odu — The Instruction Set',
    category: 'ifa',
    symbol: '⊞',
    accent: '#c4813a',
    type: 'Ternary-Binary',
    chars: '256',
    direction: 'Right-to-Left',
    encoding: 'IFABit 8-sequence',
    status: 'Living',
    statusColor: '#39d353',
    desc: 'The 256 Odu Ifa encoded as 8-IFABit sequences — the complete instruction set of existence. Each Odu is a unique binary combination of Ogbe (O) and Oyeku (|) functioning simultaneously as philosophical text, divination code, and knowledge script.',
  },
  {
    id: 'scriptoe-sys',
    name: 'ScriptoE',
    subtitle: 'The Universal Meta-Script',
    category: 'ifa',
    symbol: '⊛',
    accent: '#39d353',
    type: 'Meta-Script',
    chars: '∞',
    direction: 'All Directions',
    encoding: 'Consciousness-Energy',
    status: 'Living',
    statusColor: '#39d353',
    desc: 'The meta-script that contains all scripts — every graphical symbol ever produced by human consciousness is a unique configuration of Ogbe Energy (Ogbenergy). ScriptoE maps all possible symbolic expressions within one unified encoding framework.',
  },
  // ── NATURAL SCRIPTS ──
  {
    id: 'aebajogbe',
    name: 'Àìbájìogbè-Oduduwa',
    subtitle: '"The Talking Alphabet" — Native Yoruba',
    category: 'natural',
    symbol: 'Àìb',
    accent: '#f5c518',
    type: 'Alphabetic',
    chars: '~25',
    direction: 'Right-to-Left',
    encoding: 'Non-Unicode (in progress)',
    status: 'Living',
    statusColor: '#39d353',
    desc: 'The native Yoruba alphabet revealed through visions to Chief Tolúlàṣẹ Ògúntósìn (2011–2016), bearing the name of the ancestral king Odùduwà. ~25 letters with ligature merging; actively taught in schools in Porto-Novo and Ilé-Ifẹ̀.',
    link: '../ifagraphy-toegraphy/',
  },
  {
    id: 'arabic',
    name: 'Arabic Script',
    subtitle: 'Al-Abjadiyyah — 420M+ Speakers',
    category: 'natural',
    symbol: 'ع',
    accent: '#0099ff',
    type: 'Abjad',
    chars: '28 base + diacritics',
    direction: 'Right-to-Left',
    encoding: 'Unicode U+0600–U+06FF',
    status: 'Living',
    statusColor: '#39d353',
    desc: 'The second most geographically widespread script on Earth. Cursive by nature — letters change form based on word position. The script of the Quran, classical Islamic science, and over 420 million speakers.',
  },
  {
    id: 'chinese',
    name: 'Chinese Script (Hànzì)',
    subtitle: '3,000+ Years of Continuous Use',
    category: 'natural',
    symbol: '文',
    accent: '#e63946',
    type: 'Logographic',
    chars: '50,000+ (common: 3,500)',
    direction: 'Variable (LTR / Top-Bottom)',
    encoding: 'Unicode CJK U+4E00–U+9FFF+',
    status: 'Living',
    statusColor: '#39d353',
    desc: 'The oldest continuously used writing system on Earth. Characters encode meaning, not sound — the same glyph is readable across mutually unintelligible Chinese dialects and multiple East Asian languages.',
  },
  {
    id: 'devanagari',
    name: 'Devanagari',
    subtitle: 'Script of Sanskrit, Hindi, Nepali',
    category: 'natural',
    symbol: 'ॐ',
    accent: '#ff6b35',
    type: 'Abugida',
    chars: '47 primary + vowel marks',
    direction: 'Left-to-Right',
    encoding: 'Unicode U+0900–U+097F',
    status: 'Living',
    statusColor: '#39d353',
    desc: 'The "divine city script" — used for Sanskrit, Hindi, Nepali, and dozens of Indian languages. Each consonant carries an inherent vowel; vowels are attached as diacritics. The Vedas, Upanishads, and Yoga Sutras are encoded in this ancient abugida.',
  },
  {
    id: 'greek',
    name: 'Greek Alphabet',
    subtitle: 'Ancestor of Western Scripts',
    category: 'natural',
    symbol: 'Ω',
    accent: '#4361ee',
    type: 'True Alphabet',
    chars: '24',
    direction: 'Left-to-Right',
    encoding: 'Unicode U+0370–U+03FF',
    status: 'Living',
    statusColor: '#39d353',
    desc: 'The first true alphabet encoding both consonants and vowels. Ancestor of Latin, Cyrillic, and Coptic. Also the script of scientific notation — α, β, γ, δ, Σ, Ω, π — used globally across mathematics and physics.',
  },
  {
    id: 'geez',
    name: "Ge'ez / Ethiopic",
    subtitle: 'Oldest Living African Script',
    category: 'natural',
    symbol: 'ሀ',
    accent: '#2d9e6b',
    type: 'Abugida',
    chars: '231+ syllabic units',
    direction: 'Left-to-Right',
    encoding: 'Unicode U+1200–U+137F',
    status: 'Living',
    statusColor: '#39d353',
    desc: "One of the world's oldest continuously used scripts — carrying Ethiopian Orthodox sacred texts, royal chronicles, and the literary heritage of one of Africa's most enduring civilizations. Each base consonant has 7 vowel-modified forms.",
  },
  {
    id: 'latin',
    name: 'Latin Script',
    subtitle: 'The World\'s Most Widely Used Script',
    category: 'natural',
    symbol: 'A',
    accent: '#00d4ff',
    type: 'True Alphabet',
    chars: '26 base + extended variants',
    direction: 'Left-to-Right',
    encoding: 'Unicode U+0041–U+007A+',
    status: 'Living',
    statusColor: '#39d353',
    desc: 'The most geographically widespread script on Earth — used for English, Spanish, French, Portuguese, Yoruba, Swahili, and hundreds more. Descended from Greek via Etruscan; now the default script of science, diplomacy, and the global internet.',
  },
  {
    id: 'cyrillic',
    name: 'Cyrillic Script',
    subtitle: 'Script of Slavic & Eurasian Languages',
    category: 'natural',
    symbol: 'Ж',
    accent: '#4361ee',
    type: 'True Alphabet',
    chars: '33 (Russian); up to 72 across languages',
    direction: 'Left-to-Right',
    encoding: 'Unicode U+0400–U+04FF',
    status: 'Living',
    statusColor: '#39d353',
    desc: 'Created in the 9th century by Saints Cyril and Methodius to write Old Church Slavonic. Now the script of Russian, Ukrainian, Bulgarian, Mongolian, and over 50 languages spanning Eastern Europe and Central Asia.',
  },
  {
    id: 'hebrew',
    name: 'Hebrew Script',
    subtitle: 'Script of the Torah & Kabbalah',
    category: 'natural',
    symbol: 'א',
    accent: '#daa520',
    type: 'Abjad',
    chars: '22 consonants + optional vowel marks',
    direction: 'Right-to-Left',
    encoding: 'Unicode U+0590–U+05FF',
    status: 'Living',
    statusColor: '#39d353',
    desc: 'One of the oldest alphabetic scripts still in use — encoding the Torah, Talmud, and Kabbalistic tradition. Each of the 22 letters carries deep numerological and mystical meaning, making Hebrew a sacred script with built-in metaphysical encoding.',
  },
  {
    id: 'hieroglyphics',
    name: 'Egyptian Hieroglyphics',
    subtitle: 'The Words of the Gods',
    category: 'natural',
    symbol: '𓂀',
    accent: '#c4813a',
    type: 'Logographic + Alphabetic',
    chars: '700+ classical; 6,000+ Ptolemaic',
    direction: 'Variable (LTR / RTL / Top-Bottom)',
    encoding: 'Unicode U+13000–U+1342F',
    status: 'Historical',
    statusColor: '#aaa',
    desc: 'The sacred script of ancient Egypt — "Medu Netjer" (Words of the Gods). In use for over 3,500 years, combining logograms, phonetic signs, and determinatives. Monumental inscriptions, the Book of the Dead, and the Rosetta Stone are its legacy.',
  },
  {
    id: 'japanese',
    name: 'Japanese Writing System',
    subtitle: 'Kanji · Hiragana · Katakana',
    category: 'natural',
    symbol: '字',
    accent: '#e63946',
    type: 'Mixed (Logographic + Syllabic)',
    chars: '2,136 standard Kanji + 96 Kana each',
    direction: 'Variable (LTR / Top-Bottom)',
    encoding: 'Unicode CJK + Kana blocks',
    status: 'Living',
    statusColor: '#39d353',
    desc: 'A uniquely layered system combining three scripts: Kanji (Chinese-derived logograms), Hiragana (syllabary for grammar), and Katakana (syllabary for foreign words). One of the most complex writing systems in everyday use by over 125 million people.',
  },
  {
    id: 'tifinagh',
    name: 'Tifinagh Script',
    subtitle: 'Ancient Script of the Amazigh People',
    category: 'natural',
    symbol: 'ⵣ',
    accent: '#2d9e6b',
    type: 'Abjad / Alphabet (Neo-Tifinagh)',
    chars: '33 (Neo-Tifinagh)',
    direction: 'Variable (traditional: various; modern: LTR)',
    encoding: 'Unicode U+2D30–U+2D7F',
    status: 'Living',
    statusColor: '#39d353',
    desc: 'The native script of the Amazigh (Berber) people of North Africa — one of the oldest indigenous African scripts, with geometric forms traceable to ancient Libyan inscriptions. Neo-Tifinagh is now an official script in Morocco.',
  },
  {
    id: 'hangul',
    name: 'Hangul',
    subtitle: 'The Designed Alphabet of Korea',
    category: 'natural',
    symbol: '한',
    accent: '#00b4d8',
    type: 'Featural Alphabet',
    chars: '24 jamo (14 consonants + 10 vowels)',
    direction: 'Left-to-Right (historically Top-Bottom)',
    encoding: 'Unicode U+AC00–U+D7AF',
    status: 'Living',
    statusColor: '#39d353',
    desc: 'The only major script in the world that was consciously designed — created in 1443 by King Sejong and scholars to be learnable in a single day. Letter shapes reflect the shape of the vocal organs producing each sound; syllables assemble into compact blocks.',
  },
  // ── NOTATION SYSTEMS ──
  {
    id: 'math-notation',
    name: 'Mathematical Notation',
    subtitle: 'The Universal Language of Science',
    category: 'notation',
    symbol: '∑',
    accent: '#00d4ff',
    type: 'Symbolic Notation',
    chars: '∞ (standardized subset ~1,000)',
    direction: 'Variable / LTR',
    encoding: 'Unicode Mathematical Operators',
    status: 'Living',
    statusColor: '#39d353',
    desc: 'The most universal notation system on Earth — transcending all natural languages. Symbols like ∑, ∫, ∂, →, ⊂, ∞ communicate precise mathematical meaning to any reader regardless of native language. The closest existing analogue to ScriptoE.',
  },
  {
    id: 'ipa',
    name: 'IPA — Phonetic Alphabet',
    subtitle: 'International Phonetic Alphabet',
    category: 'notation',
    symbol: 'ɔ',
    accent: '#e9498a',
    type: 'Phonetic Notation',
    chars: '107 letters + 55 diacritics',
    direction: 'Left-to-Right',
    encoding: 'Unicode IPA Extensions',
    status: 'Living',
    statusColor: '#39d353',
    desc: 'A universal phonetic notation system capable of representing every sound producible by the human vocal tract — across all 7,000+ human languages. Essential for linguistics, language learning, and IfaLang phonological analysis.',
  },
  {
    id: 'music-notation',
    name: 'Musical Staff Notation',
    subtitle: 'Encoding Sound Through Time',
    category: 'notation',
    symbol: '♩',
    accent: '#9b59b6',
    type: 'Temporal Notation',
    chars: 'Variable (12 pitches × durations)',
    direction: 'Left-to-Right',
    encoding: 'Unicode Musical Symbols U+1D100+',
    status: 'Living',
    statusColor: '#39d353',
    desc: 'A two-dimensional time-space script — horizontal axis = time, vertical axis = pitch. Encodes the full complexity of musical performance: melody, harmony, rhythm, dynamics, and expression in a single visual system.',
  },
  {
    id: 'dna-notation',
    name: 'DNA / RNA Notation',
    subtitle: 'The Script of Life',
    category: 'notation',
    symbol: 'ACGT',
    accent: '#30c0a0',
    type: 'Biological Notation',
    chars: '4 (A, C, G, T/U)',
    direction: '5′ → 3′ (Left-to-Right)',
    encoding: 'IUPAC nucleotide codes (ASCII)',
    status: 'Living',
    statusColor: '#39d353',
    desc: 'The deepest script known to science — Adenine, Cytosine, Guanine, Thymine encoding every living organism. A 4-character alphabet generating 3 billion base-pairs in the human genome. The biological analogue of the IFA binary system.',
  },
  {
    id: 'chemical',
    name: 'Chemical Notation',
    subtitle: 'IUPAC / SMILES / Structural',
    category: 'notation',
    symbol: 'H₂O',
    accent: '#daa520',
    type: 'Scientific Notation',
    chars: '118 elements + structural rules',
    direction: 'Variable',
    encoding: 'ASCII (SMILES) / Unicode',
    status: 'Living',
    statusColor: '#39d353',
    desc: 'A family of notation systems encoding molecular structure, chemical reactions, and elemental composition. SMILES notation compresses full 3D molecular structure into a linear ASCII string — one of the most information-dense scripts in science.',
  },
  // ── DIGITAL ENCODINGS ──
  {
    id: 'unicode',
    name: 'Unicode (UTF-8)',
    subtitle: 'The Global Character Standard',
    category: 'digital',
    symbol: 'U+',
    accent: '#00d4ff',
    type: 'Universal Encoding',
    chars: '149,813 (Unicode 15.1)',
    direction: 'All (per script)',
    encoding: 'UTF-8 / UTF-16 / UTF-32',
    status: 'Living',
    statusColor: '#39d353',
    desc: 'The standard for encoding, representing, and handling text for all the world\'s writing systems. Unicode is the closest real-world analogue to ScriptoE — a unified encoding space for all human scripts. As of Unicode 15.1: 149,813 characters across 161 scripts.',
  },
  {
    id: 'binary',
    name: 'Binary (Base-2)',
    subtitle: '0 and 1 — The Machine Language',
    category: 'digital',
    symbol: '01',
    accent: '#39d353',
    type: 'Machine Encoding',
    chars: '2 (0, 1)',
    direction: 'Left-to-Right',
    encoding: 'Electrical signal (voltage levels)',
    status: 'Living',
    statusColor: '#39d353',
    desc: 'The foundational script of all digital computation — every program, image, sound, and text in every digital device ultimately resolves to sequences of 0s and 1s. The computational parallel of the IFA binary system (Oyeku = 0, Ogbe = 1).',
  },
  {
    id: 'ascii',
    name: 'ASCII',
    subtitle: 'American Standard Code for Information Interchange',
    category: 'digital',
    symbol: 'A',
    accent: '#8b92a8',
    type: 'Character Encoding',
    chars: '128 (printable: 95)',
    direction: 'Left-to-Right',
    encoding: '7-bit binary (U+0000–U+007F)',
    status: 'Living',
    statusColor: '#39d353',
    desc: 'The foundational character encoding of the digital era — 128 characters (letters, digits, punctuation, control codes) that became the basis for all subsequent Western digital encoding. Still the backbone of internet protocols, source code, and system communication.',
  },
  {
    id: 'morse',
    name: 'Morse Code',
    subtitle: 'Dots, Dashes, and Silence',
    category: 'digital',
    symbol: '·−',
    accent: '#c4813a',
    type: 'Pulse Encoding',
    chars: '54 (26 letters + digits + punctuation)',
    direction: 'Left-to-Right (time-based)',
    encoding: 'Binary pulse (dot/dash/space)',
    status: 'Living',
    statusColor: '#39d353',
    desc: 'A binary-ternary encoding using dots (·), dashes (−), and silence — transmittable as sound, light, or electrical signal. The original universal long-distance digital encoding, predating electronic computers by over a century.',
  },
];


// ── Hero glyphs ───────────────────────────────────────────────
const HERO_GLYPHS = ['O','|','⌨','⊛','{}','01','∑','∞','◈','U+','ACGT','·−','ɔ','♩','ع','文','ॐ','ሀ','ω','⊞','→','≡','∂','⟨⟩'];

// ── Hero Section ──────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="hero" id="hero">
      <div className="hero__grid-bg" aria-hidden="true" />
      <div className="hero__bg-glyphs" aria-hidden="true">
        {HERO_GLYPHS.map((g, i) => (
          <span
            key={i}
            className="hero__bg-glyph"
            style={{
              top:              `${4   + (i * 4.3  % 92)}%`,
              left:             `${1   + (i * 6.7  % 97)}%`,
              fontSize:         `${0.75 + (i % 5) * 0.35}rem`,
              animationDelay:   `${i   * 0.3}s`,
              animationDuration:`${5   + (i % 4) * 1.8}s`,
              color: i % 3 === 0 ? 'rgba(0,212,255,0.18)' : i % 3 === 1 ? 'rgba(57,211,83,0.15)' : 'rgba(124,77,255,0.12)',
            }}
          >{g}</span>
        ))}
      </div>
      <div className="container hero__inner">
        <div className="hero__eyebrow">
          <span className="hero__eyebrow-tag">⌨ The IFA Internet Scripting Platform</span>
        </div>
        <div className="hero__prompt">
          <span className="hero__prompt-prefix">ifascript:~$</span>
          <span className="hero__prompt-cmd"> explore --all-scripts --universe</span>
          <span className="hero__prompt-cursor">▊</span>
        </div>
        <h1 className="hero__title">
          IfaScript
          <span className="hero__title-sep"> · </span>
          <span className="hero__title-sub">ScriptoE</span>
        </h1>
        <p className="hero__tagline">The Script for Everything</p>
        <p className="hero__desc">
          What the World Scripts Explorer is to the classical Internet (the modern Internet),{' '}
          <strong>IfaScript</strong> is to the IFA Internet — the most comprehensive script explorer
          covering natural writing systems, notation systems, digital encodings, and others,
          all unified through Consciousness Energy.
        </p>
        <div className="hero__ctas">
          <a className="btn btn--primary" href="#script-explorer">Explore Scripts</a>
          <a className="btn btn--ghost"   href="#ifabit-foundation">IFABit System →</a>
        </div>
        <div className="hero__stats">
          <div className="hero__stat">
            <div className="hero__stat-val">161+</div>
            <div className="hero__stat-lab">Unicode Scripts</div>
          </div>
          <div className="hero__stat">
            <div className="hero__stat-val">149K+</div>
            <div className="hero__stat-lab">Unicode Characters</div>
          </div>
          <div className="hero__stat">
            <div className="hero__stat-val">256</div>
            <div className="hero__stat-lab">Odu IFABit Codes</div>
          </div>
          <div className="hero__stat">
            <div className="hero__stat-val">2</div>
            <div className="hero__stat-lab">Base Operators (O · |)</div>
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
          <p className="section__eyebrow">// Platform Identity</p>
          <h2 className="section__title">One Script to Encode Them All</h2>
          <p className="section__desc">
            IfaScript is the Scripting Platform of the IFA Internet — a key subject and practice
            within IfaLang and the IFA Body of Knowledge (IFABOK). Every script, code, and notation
            system in the universe is, at its foundation, an encoding of Ogbe Energy (Ogbenergy).
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

// ── IFABit Foundation Section ─────────────────────────────────
function IfabitFoundationSection() {
  return (
    <section className="section section--alt" id="ifabit-foundation">
      <div className="container">
        <div className="section__head">
          <p className="section__eyebrow">// IFA Scripting Core</p>
          <h2 className="section__title">The IFABit Scripting System</h2>
          <p className="section__desc">
            At the foundation of all IFA Scripting are two primordial operators —{' '}
            <strong>Ogbe (O)</strong> and <strong>Oyeku (|)</strong> — the binary base from which
            all 256 Odu are encoded as 8-IFABit sequences. This is the scripting foundation of
            the IFA Internet.
          </p>
        </div>

        {/* Base Operators */}
        <div className="ifabit__operators">
          <div className="ifabit__op ifabit__op--ogbe">
            <div className="ifabit__op-sym">O</div>
            <div className="ifabit__op-name">Ogbe</div>
            <div className="ifabit__op-code">IFABit · |</div>
            <p className="ifabit__op-desc">Pure Energy · Open Mark · Creative Force<br/>The active operator — light, expansion, manifestation</p>
          </div>
          <div className="ifabit__divider">
            <span className="ifabit__divider-sym">·</span>
            <span className="ifabit__divider-label">binary base</span>
          </div>
          <div className="ifabit__op ifabit__op--oyeku">
            <div className="ifabit__op-sym">|</div>
            <div className="ifabit__op-name">Oyeku</div>
            <div className="ifabit__op-code">IFABit · ||</div>
            <p className="ifabit__op-desc">Pure Anergy · Closed Mark · Receptive Force<br/>The passive operator — void, contraction, potential</p>
          </div>
        </div>

        {/* Code example */}
        <div className="ifabit__code-block">
          <div className="ifabit__code-header">
            <span className="ifabit__code-dot ifabit__code-dot--r" />
            <span className="ifabit__code-dot ifabit__code-dot--y" />
            <span className="ifabit__code-dot ifabit__code-dot--g" />
            <span className="ifabit__code-title">ifascript — odu_encoding.ifa</span>
          </div>
          <pre className="ifabit__code-body">{`// IFA Scripting — Base Operators
const Ogbe  = "O";  // IFABit: 1 — Energy, Light, Creation
const Oyeku = "|";  // IFABit: 0 — Anergy, Void, Potential

// Encoding Odu as 8-IFABit sequences
const Ogbe_Odu  = "O O O O  O O O O";  // 11111111 — Pure Energy
const Oyeku_Odu = "| | | |  | | | |";  // 00000000 — Pure Void
const Iwori_Odu = "| O O |  | O O |";  // 01100110 — Inner Vision

// ScriptoE: all scripts resolve to Ogbenergy
function encode(symbol) {
  return symbol.split('').map(c =>
    c === 'O' ? 1 : c === '|' ? 0 : ifaMap(c)
  );
}`}</pre>
        </div>

        {/* SODU Section */}
        <div className="sodu-section">
          <div className="sodu-section__logo-wrap">
            <img src="./src/sodu-logo.png" alt="SODU — Standard Odu for IfaCharacter Encoding" className="sodu-section__logo" />
          </div>
          <h3 className="sodu-section__title">The Ifa Encoding Scheme</h3>
          <p className="sodu-section__subtitle">Standard Odu for IfaCharacter Encoding (SODU)</p>
          <p className="sodu-section__desc">
            SODU serves the same purpose for the <strong>Ifa Computer</strong> — the Odu Ifa — as{' '}
            <strong>Unicode</strong> and <strong>ASCII</strong> do for modern computers: translating
            human languages into machine language and back again. The <em>Odu Ifa</em> is the Ifa
            Computer — the ancient and very first computing technology, built by the ancient African
            mathematicians <strong>Orunmila</strong> and <strong>Osun</strong>.
          </p>
          <div className="sodu-section__compare">
            <div className="sodu-section__compare-row">
              <span className="sodu-section__compare-system">Modern Computers</span>
              <span className="sodu-section__compare-arrow">→</span>
              <span className="sodu-section__compare-standard">Unicode / ASCII</span>
            </div>
            <div className="sodu-section__compare-vs">↕</div>
            <div className="sodu-section__compare-row">
              <span className="sodu-section__compare-system">The Ifa Computer (Odu Ifa)</span>
              <span className="sodu-section__compare-arrow">→</span>
              <span className="sodu-section__compare-standard sodu-section__compare-standard--ifa">SODU / IfaScript</span>
            </div>
          </div>
          <p className="sodu-section__context">
            Also known as <strong>IfaScript</strong>, SODU is a key element of Ifa Language (IfaLang),
            providing the Standards for Odus used in Energy-based communications, Ifa Computing, and
            the IFA Internet — also known as the Theory of Everything (TOE), IFA Mathematics, the Ifa
            Binary System of Education, or the IFA Body of Knowledge (IFABOK). SODU is a vital
            meta-structure of IFA Mathematics and provides the meta-characters used in IfaLang, the
            TOE Language (TOEL).
          </p>
        </div>

      </div>
    </section>
  );
}

// ── Ifa Binary Encoding Section ──────────────────────────────
function IfaBinaryEncoding() {
  return (
    <section className="ifa-binary">
      <div className="ifa-binary__inner">
        <p className="ifa-binary__tag">Universal Encoding Primitives</p>
        <h2 className="ifa-binary__title">The Ifa Binary Encoding Scheme</h2>
        <p className="ifa-binary__subtitle">The TOEBit (IFABit) · The Bit for Everything (BitoE)</p>
        <p className="ifa-binary__desc">
          IfaZero (Ogbe) and IfaOne (Oyeku) are the Universal Energy–Anergy Pair — the Primordial Ancestors
          of all kinds of numbers. Known as Ifa Numbers (ToE Numbers), IfaZero and IfaOne are not the same
          as 0 and 1 in modern mathematics or computing. <strong>IfaNumbers</strong> carry multiple
          meta-representations across the IFA System.
        </p>

        <div className="ifa-binary__duo">
          {/* ── Ogbe ── */}
          <div className="ifa-binary__card ifa-binary__card--ogbe">
            <div className="ifa-binary__symbol">
              <span className="ifa-binary__glyph ifa-binary__glyph--ogbe">O</span>
              <span className="ifa-binary__glyph-label">IfaCircle · Energy (Ogbe)</span>
            </div>
            <div className="ifa-binary__card-body">
              <h3 className="ifa-binary__card-name">
                <span className="ifa-binary__card-name--ogbe">Ogbe</span>
                <span className="ifa-binary__card-name-dash"> — </span>
                <span className="ifa-binary__card-name-sub">Energy</span>
              </h3>
              <p className="ifa-binary__card-desc">
                The most fundamental Building Block of Everything (BBoE) — the Universal Building Block of
                all "building blocks" in modern science. Ogbe is Energy itself: the primordial, active,
                creative force.
              </p>
              <div className="ifa-binary__meta-label">Meta-Representations</div>
              <ul className="ifa-binary__metas">
                <li className="ifa-binary__meta">
                  <span className="ifa-binary__meta-glyph ifa-binary__meta-glyph--oyeku">|</span>
                  <div className="ifa-binary__meta-text">
                    <strong>IfaLine</strong>
                    <p>The Dual Form of Ogbe — the IfA Line. Not 1 (one) in modern math or bit.</p>
                  </div>
                </li>
                <li className="ifa-binary__meta">
                  <span className="ifa-binary__meta-glyph ifa-binary__meta-glyph--ogbe">O</span>
                  <div className="ifa-binary__meta-text">
                    <strong>IfaCircle · IfaZero</strong>
                    <p>Circular form; its shape. Not zero (0) in modern math or bit.</p>
                  </div>
                </li>
                <li className="ifa-binary__meta">
                  <img className="ifa-binary__meta-glyph ifa-binary__meta-glyph--img" src="./src/duoinfinity_logo.png" alt="DuoInfinity — InfinitoE" />
                  <div className="ifa-binary__meta-text">
                    <strong>DuoInfinity · InfinitoE</strong>
                    <p>Ifa Infinity — crossed with ∞; renders circling. The Infinity for Everything.</p>
                  </div>
                </li>
                <li className="ifa-binary__meta">
                  <img className="ifa-binary__meta-glyph ifa-binary__meta-glyph--img" src="../ifa-language/images/IfaZero.png" alt="IfaZero Metarepresentation" />
                  <div className="ifa-binary__meta-text">
                    <strong>IfaZero Metarepresentation</strong>
                    <p>Circle with clockwise arrow on the right — the Energy (Ogbe) directional symbol.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* ── Oyeku ── */}
          <div className="ifa-binary__card ifa-binary__card--oyeku">
            <div className="ifa-binary__symbol">
              <span className="ifa-binary__glyph ifa-binary__glyph--oyeku">|</span>
              <span className="ifa-binary__glyph-label">IfaLine · Anergy (Oyeku)</span>
            </div>
            <div className="ifa-binary__card-body">
              <h3 className="ifa-binary__card-name">
                <span className="ifa-binary__card-name--oyeku">Oyeku</span>
                <span className="ifa-binary__card-name-dash"> — </span>
                <span className="ifa-binary__card-name-sub">Anergy</span>
              </h3>
              <p className="ifa-binary__card-desc">
                Non-Energy — the Dual of Ogbe. Oyeku is Anergy: the complementary, receptive, potential
                force. Together with Ogbe it generates all the remaining 254 Odu Ifa.
              </p>
              <div className="ifa-binary__meta-label">Meta-Representations</div>
              <ul className="ifa-binary__metas">
                <li className="ifa-binary__meta">
                  <span className="ifa-binary__meta-glyph ifa-binary__meta-glyph--dualline">‖</span>
                  <div className="ifa-binary__meta-text">
                    <strong>Dual IfaLine</strong>
                    <p>Primary form of Oyeku — the Dual of the Ogbe IfaLine.</p>
                  </div>
                </li>
                <li className="ifa-binary__meta">
                  <span className="ifa-binary__meta-glyph ifa-binary__meta-glyph--oyeku">|</span>
                  <div className="ifa-binary__meta-text">
                    <strong>IfaLine · IfaOne</strong>
                    <p>Not the same as 1 (one) in modern math or bit.</p>
                  </div>
                </li>
                <li className="ifa-binary__meta">
                  <img className="ifa-binary__meta-glyph ifa-binary__meta-glyph--img" src="./src/duoninfinity_logo.png" alt="DuoInfinity — NinfinitoE" />
                  <div className="ifa-binary__meta-text">
                    <strong>DuoInfinity · NinfinitoE</strong>
                    <p>Ifa Ninfinity — DuoInfinity with "J" dash. NanInfinity. Dual of Infinity.</p>
                  </div>
                </li>
                <li className="ifa-binary__meta">
                  <img className="ifa-binary__meta-glyph ifa-binary__meta-glyph--img" src="../ifa-language/images/IfaOne.png" alt="IfaOne Metarepresentation" />
                  <div className="ifa-binary__meta-text">
                    <strong>IfaOne Metarepresentation</strong>
                    <p>Circle with counterclockwise arrow on the left — the Anergy (Oyeku) directional symbol.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="ifa-binary__axiom">
          <p className="ifa-binary__connector">
            <span className="ifa-binary__emdash">—</span>
            {' '}is the IfaConnector or IfaLink.
          </p>
          <blockquote className="ifa-binary__quote">
            "IfaZero (Ogbe) and IfaOne (Oyeku) are the Primordial Ancestors of all numbers and are not
            the same as zero (0) and one (1) in modern mathematics or computing."
          </blockquote>
        </div>
      </div>
    </section>
  );
}

// ── Script Explorer Section ───────────────────────────────────
function ScriptExplorerSection() {
  const [cat, setCat] = useState('all');
  const visible = SCRIPT_SYSTEMS.filter(s => scriptCatMatch(s, cat));

  return (
    <section className="section" id="script-explorer">
      <div className="container">
        <div className="section__head">
          <p className="section__eyebrow">// World Script Explorer</p>
          <h2 className="section__title">Scripts of the World</h2>
          <p className="section__desc">
            From natural writing systems with thousands of years of history to digital encoding
            schemes powering the modern Internet — every script is a unique technology for
            encoding Consciousness-Energy as visible, transmissible symbol.
          </p>
        </div>

        {/* Category Filters */}
        <div className="se__filters">
          {SCRIPT_CATEGORIES.map(c => (
            <button
              key={c.id}
              className={`se__filter${cat === c.id ? ' se__filter--active' : ''}`}
              onClick={() => setCat(c.id)}
            >
              <span className="se__filter-prefix">$</span>{c.label}
            </button>
          ))}
        </div>
        <p className="se__count">
          <span className="se__count-num">{visible.length}</span> systems loaded
        </p>

        {/* Grid */}
        <div className="se__grid">
          {visible.map(s => (
            <article
              key={s.id}
              className={`sc-card${s.featured ? ' sc-card--featured' : ''}`}
              style={{ '--sc-accent': s.accent }}
            >
              <div className="sc-card__sym-wrap">
                <span className="sc-card__sym">{s.symbol}</span>
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
                  <span className="sc-card__meta-key">TYPE</span>
                  <span>{s.type}</span>
                </div>
                <div className="sc-card__meta">
                  <span className="sc-card__meta-key">CHARS</span>
                  <span>{s.chars}</span>
                </div>
                <div className="sc-card__meta">
                  <span className="sc-card__meta-key">DIR</span>
                  <span>{s.direction}</span>
                </div>
                <div className="sc-card__meta sc-card__meta--encoding">
                  <span className="sc-card__meta-key">ENC</span>
                  <span>{s.encoding}</span>
                </div>
                <p className="sc-card__desc">{s.desc}</p>
                {s.link
                  ? <a className="sc-card__link" href={s.link}>Explore on IFA Internet →</a>
                  : <span className="sc-card__link sc-card__link--int">ScriptoE System</span>
                }
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── IFA Scripting in Practice ─────────────────────────────────
function PracticeSection() {
  return (
    <section className="section section--alt" id="practice">
      <div className="container">
        <div className="section__head">
          <p className="section__eyebrow">// IFA Scripting in Practice</p>
          <h2 className="section__title">IfaScript in IfaLang &amp; IFABOK</h2>
          <p className="section__desc">
            IFA Scripting is a key subject and practice within IfaLang (the Theory of Everything
            Language) and the IFA Body of Knowledge (IFABOK) — the scripting system by which all
            knowledge is encoded, transmitted, and decoded through Consciousness-Energy.
          </p>
        </div>

        <div className="practice__grid">
          <div className="practice__card">
            <div className="practice__card-icon" style={{ color: '#00d4ff' }}>⌨</div>
            <div className="practice__card-name">IfaScript Language</div>
            <p className="practice__card-desc">
              A scripting language built on IFABits — using Ogbe (O) and Oyeku (|) as binary
              operators to encode all knowledge structures. IfaScript expressions are valid both
              as philosophical statements and as computable IFA logic.
            </p>
          </div>
          <div className="practice__card">
            <div className="practice__card-icon" style={{ color: '#39d353' }}>{ }</div>
            <div className="practice__card-name">ScriptoE Notation</div>
            <p className="practice__card-desc">
              The universal notation system of the IFA Internet — capable of expressing any
              concept from any field in a unified symbolic vocabulary. Mathematical equations,
              Odu Ifa sequences, linguistic structures, and scientific formulas all written in one
              coherent meta-script.
            </p>
          </div>
          <div className="practice__card">
            <div className="practice__card-icon" style={{ color: '#7c4dff' }}>◈</div>
            <div className="practice__card-name">Script Networking</div>
            <p className="practice__card-desc">
              Scripts are not isolated — they form a network. IfaScript maps every writing system,
              notation scheme, and encoding protocol as a node in ScriptNet, showing how all
              scripts are interconnected expressions of the same underlying Consciousness-Energy.
            </p>
          </div>
          <div className="practice__card">
            <div className="practice__card-icon" style={{ color: '#f5c518' }}>⊞</div>
            <div className="practice__card-name">Odu Script Encoding</div>
            <p className="practice__card-desc">
              Each of the 256 Odu Ifa is a unique 8-IFABit script-code encoding a complete
              knowledge-state. IFA Scripting uses these Odu codes as the instruction set for
              expressing any concept, equation, or truth in the IFA Internet's universal language.
            </p>
          </div>
          <div className="practice__card">
            <div className="practice__card-icon" style={{ color: '#e9498a' }}>∑</div>
            <div className="practice__card-name">Cross-Script Translation</div>
            <p className="practice__card-desc">
              IfaScript enables cross-script translation — the same concept expressed as a
              mathematical formula, an Odu IFABit sequence, a natural language sentence, a
              DNA codon, or a musical motif. All scripts are dialects of the same underlying
              Consciousness-Energy.
            </p>
          </div>
          <div className="practice__card">
            <div className="practice__card-icon" style={{ color: '#c4813a' }}>✍</div>
            <div className="practice__card-name">Àìbájìogbè &amp; ScriptoE</div>
            <p className="practice__card-desc">
              The Àìbájìogbè-Oduduwa script is featured within IfaScript as the primary natural
              script of the Yoruba dimension of the IFA Internet — bridging the ancient oral and
              written traditions of Ilé-Ifẹ̀ with the universal ScriptoE meta-encoding framework.
            </p>
          </div>
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
          <div className="cta-block__prompt">
            <span className="cta-prompt-prefix">scriptoe:~$</span>
            <span className="cta-prompt-cmd"> connect --ifalang --ifagraphy --ifa-internet</span>
          </div>
          <div className="cta-block__symbol">⊛</div>
          <h2 className="cta-block__title">
            The Script<br />
            <span className="cta-block__title-sub">for Everything</span>
          </h2>
          <p className="cta-block__desc">
            IfaScript is the scripting arm of the IFA Internet — the platform where every writing
            system, encoding scheme, and notation language is recognized as a sacred technology
            for expressing Consciousness-Energy. All scripts are One in ScriptoE.
          </p>
          <div className="cta-block__btns">
            <a
              className="btn btn--primary"
              href="../ifa-language/"
            >IFA Language (IfaLang) →</a>
            <a
              className="btn btn--secondary"
              href="../ifagraphy-toegraphy/"
            >Ifagraphy — Writing Platform →</a>
            <a
              className="btn btn--ghost"
              href="https://toe.cenproject.org/"
              target="_blank"
              rel="noopener noreferrer"
            >The IFA Internet</a>
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
          <span className="header__brand-icon">⌨</span>
          <span className="header__brand-name">IfaScript</span>
          <span className="header__brand-tag">ScriptoE</span>
        </div>
        <nav className="header__nav">
          <a className="nav-link" href="#identity">Identity</a>
          <a className="nav-link" href="#ifabit-foundation">IFABit</a>
          <a className="nav-link" href="#script-explorer">Explorer</a>
          <a className="nav-link" href="#practice">Practice</a>
          <a className="nav-link" href="../ifa-language/">IfaLang</a>
          <a className="nav-link nav-link--cta" href="#explore">Get Started</a>
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
          <span className="footer__brand-icon">⌨</span>
          <span className="footer__brand-name">IfaScript · ScriptoE</span>
        </div>
        <p className="footer__tagline">The Script for Everything · The IFA Internet</p>
        <nav className="footer__links">
          <a href="#identity"           className="footer__link">Identity</a>
          <a href="#ifabit-foundation"  className="footer__link">IFABit System</a>
          <a href="#script-explorer"    className="footer__link">Script Explorer</a>
          <a href="#practice"           className="footer__link">Practice</a>
          <a href="../ifa-language/"    className="footer__link">IFA Language</a>
          <a href="../ifagraphy-toegraphy/" className="footer__link">Ifagraphy</a>
          <a href="https://toe.cenproject.org/ifa-linguistics-ifalin-the-linguistics-of-everything-linoe/"
             target="_blank" rel="noopener noreferrer" className="footer__link">IFA Linguistics</a>
          <a href="https://toe.cenproject.org/ifa-programming-language-ifa-pl/"
             target="_blank" rel="noopener noreferrer" className="footer__link">IfaPL</a>
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
        <IfabitFoundationSection />
        <IfaBinaryEncoding />
        <ScriptExplorerSection />
        <PracticeSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
