/* ─────────────────────────────────────────────────────────────────────────────
   IfaYoruba (IfaYor) — Yoruba Language of the Odu Ifa
   The IFA Internet · CENProject
   toe.cenproject.org/ifa-yoruba-ifayor-platform/
───────────────────────────────────────────────────────────────────────────── */

const { useState } = React;

// ─── DATA ────────────────────────────────────────────────────────────────────

const ALIASES = [
  { label: 'IfaYor — Ifa Yoruba Program',          color: '#7c3aed' },
  { label: 'Theory of Language in Odu Ifa',         color: '#f5c518' },
  { label: 'Oduduwa Script Platform',               color: '#e8488a' },
  { label: 'Yoruba Language & Culture Studies',     color: '#00c87c' },
  { label: 'IfaYoruba Learning Platform',           color: '#3b9eff' },
];

const STATS = [
  { value: '256',  label: 'Odu Ifa',          sub: 'The Language Matrix of Everything' },
  { value: '4',    label: 'Learning Tracks',  sub: 'Kids · Teens · Adults · Professionals' },
  { value: 'Odù',  label: 'Oduduwa Script',   sub: 'Native Yoruba Writing System' },
  { value: 'Àṣẹ',  label: 'Living Language',  sub: 'The Force Behind All Words' },
];

const TRACKS = [
  {
    sym: '⭐',
    label: 'Kids',
    age: 'Ages 5 – 12',
    color: '#f5c518',
    title: 'IfaYor for Kids',
    body: 'Young learners begin with the living sounds of Yoruba — songs, stories, and the sacred symbols of the Oduduwa script. Through play, art, and Ifa tales, children discover that every word is an energy exchange rooted in the 256 Odu Ifa.',
    topics: [
      'Yoruba Alphabet — ABD & Oduduwa Script',
      'Ifa Stories, Proverbs & Folklore',
      'Basic Orisa Names & Concepts',
      'Script Drawing & Symbol Art',
      'Language Games, Songs & Chants',
    ],
  },
  {
    sym: '🔥',
    label: 'Teens',
    age: 'Ages 13 – 17',
    color: '#e8488a',
    title: 'IfaYor for Teens',
    body: 'Teen learners advance into the grammar and structure of Yoruba as encoded in the Odu Ifa — building conversational fluency, understanding the Oduduwa script in STEM contexts, and beginning to create their own language technology projects.',
    topics: [
      'Advanced Yoruba Grammar (Odu Ifa-rooted)',
      'Oduduwa Script in STEM Contexts',
      'Ifa & Orisa Culture and History',
      'Language Technology Projects',
      'Ifa Economics & Cultural Systems',
    ],
  },
  {
    sym: '◎',
    label: 'Adults',
    age: 'Ages 18+',
    color: '#7c3aed',
    title: 'IfaYor for Adults',
    body: 'Adult learners engage Yoruba language theory through the full depth of the Odu Ifa — tracing the origins of Yoruba and human languages, developing fluency in the Oduduwa-Aebajiogbe script, and contributing to IfaYoruba research and applied language systems.',
    topics: [
      'Odu Ifa as Language Theory',
      'Yoruba Linguistic Origins & Etymology',
      'Oduduwa-Aebajiogbe Script Research',
      'IfaYor Applied Language Systems',
      'Language Technology Development',
    ],
  },
  {
    sym: '◈',
    label: 'Professionals',
    age: 'All Fields & Industries',
    color: '#00c87c',
    title: 'IfaYor for Professionals',
    body: 'Professionals from every field — medicine, law, engineering, science, arts, business, education, and beyond — learn to practise, translate, and develop their discipline in Yoruba. IfaYor for Professionals bridges technical expertise with the living language of the Odu Ifa, enabling practitioners to build Yoruba-language knowledge systems, terminology, and resources within their own fields.',
    topics: [
      'Field-Specific Yoruba Terminology & Translation',
      'Developing Professional Vocabulary from Odu Ifa',
      'Translating Texts, Curricula & Frameworks into Yoruba',
      'Yoruba-Language Research & Academic Writing',
      'Building Field Glossaries & Terminology Standards',
      'Practising Your Profession in Yoruba',
      'Cross-Field IfaYor Collaboration & Publication',
    ],
  },
];

const CURRICULUM = [
  {
    num: '01',
    sym: 'Odù',
    title: 'Oduduwa Script',
    sub: 'The Native Yoruba Writing System',
    color: '#f5c518',
    body: 'The Oduduwa-Aebajiogbe script is the indigenous writing system of Yoruba civilization — predating the adoption of the Latin ABD system. IfaYor teaches learners to read, write, and apply this script across STEM fields, arts, and everyday communication, restoring the original written intelligence of the Yoruba people.',
  },
  {
    num: '02',
    sym: 'Ψ',
    title: 'Odu Ifa Language Theory',
    sub: 'The Origin of Human Language',
    color: '#7c3aed',
    body: 'The 256 Odu Ifa encode the axiomatic laws governing language, sound, and meaning. IfaYoruba studies these as the theoretical foundation of Yoruba — and, by extension, all human language — revealing language as a structured energy-exchange system rooted in Àṣẹ and the CEN Field (Consciousness-Energy-Nature).',
  },
  {
    num: '03',
    sym: '⬡',
    title: 'Ifa & Orisa Culture',
    sub: 'Yoruba Civilization & Cosmology',
    color: '#00c87c',
    body: 'Language cannot be separated from culture. IfaYor grounds all Yoruba language instruction in the living traditions of Ifa and Orisa — cosmology, ritual, oral literature, chant, proverb, praise poetry (Oríkì), and the Odu stories that encode the entirety of Yoruba knowledge.',
  },
  {
    num: '04',
    sym: 'ABD',
    title: 'Modern Yoruba',
    sub: 'Alphabet-Based Diacritic System',
    color: '#3b9eff',
    body: 'IfaYor also teaches standard Yoruba using the Latin-derived Alphabet-Based Diacritic (ABD) system used in modern schools — ensuring learners achieve full fluency across both systems and can navigate Yoruba as taught in contemporary educational institutions.',
  },
  {
    num: '05',
    sym: '⊕',
    title: 'Language Technology',
    sub: 'Applied IfaYor Projects',
    color: '#e8488a',
    body: 'Every IfaYor learner builds applied language technology projects — games, digital simulations, design systems, and IfaNet tools — turning language learning into creation. Projects are deployed on the IFA Internet platforms and shared across the global IfaYor learning community.',
  },
];

const PROJECTS = [
  {
    icon: '⬡',
    color: '#f0920c',
    title: 'Aebajiogbe STEAM Framework',
    desc: 'The key IfaYor framework for students, partners, and collaborators — developing the Oduduwa-Aebajiogbe native Yoruba script for Science, Technology, Engineering, Arts, and Mathematics. The Aebajiogbe STEAM Framework creates notation systems, educational standards, and applied tools that embed the indigenous Yoruba writing system into all STEAM disciplines on the IFA Internet.',
    featured: true,
  },
  {
    icon: '🎮',
    color: '#f5c518',
    title: 'Yoruba Language Games',
    desc: 'Interactive games teaching Yoruba vocabulary, grammar, and Odu Ifa concepts — designed and built by learners, deployed on the IFA Internet and Play Ifa Games platform.',
  },
  {
    icon: '✍️',
    color: '#7c3aed',
    title: 'Oduduwa Script Tools',
    desc: 'Digital tools for writing, rendering, and encoding the Oduduwa-Aebajiogbe script — from keyboard input systems to STEM notation frameworks.',
  },
  {
    icon: '🔬',
    color: '#00c87c',
    title: 'Language Simulations',
    desc: 'Computational simulations of Yoruba phonology, tone systems, and Odu Ifa grammar structures — built with IfaComputer and IfaMatrix technologies.',
  },
  {
    icon: '🎨',
    color: '#e8488a',
    title: 'Cultural Design Systems',
    desc: 'Visual design systems encoding Yoruba cultural motifs, Odu symbols, and Oduduwa script aesthetics — applied across art, fashion, and digital media.',
  },
  {
    icon: '📡',
    color: '#3b9eff',
    title: 'IfaNet Language Systems',
    desc: 'Language-technology systems that power the IFA Internet — from IfaLang translation layers to IfaMatrix encoding of Yoruba syntax and grammar structure.',
  },
];

const LINKED_APPS = [
  {
    sym: '📓',
    title: 'IfaNote',
    sub: 'Ifa Notebook & Research',
    color: '#f5c518',
    href: '/ifa-notebook/',
    desc: 'Document Yoruba language research, Odu meanings, and IfaYor project notes in the Ifa Notebook system.',
  },
  {
    sym: '💻',
    title: 'IfaComputer',
    sub: 'Computer of Everything',
    color: '#3b9eff',
    href: '/ifa-computer/',
    desc: 'Build IfaYor language technology using Ifa computing systems, IFABit encoding, and the IfaNet infrastructure.',
  },
  {
    sym: '⬡',
    title: 'IfaMatrix',
    sub: 'Matrix of Everything',
    color: '#8b5cf6',
    href: '/ifa-matrix/',
    desc: 'Map Yoruba grammar and Odu Ifa language structure through the unified IfaMatrix framework and SIDECHRX principles.',
  },
  {
    sym: '∿',
    title: 'IfaLang',
    sub: 'Theory of Everything Language',
    color: '#00c87c',
    href: '/ifa-language/',
    desc: 'Explore the universal language layer of the IFA Internet — connecting IfaYoruba to all fields of knowledge through TOEL.',
  },
  {
    sym: '⊞',
    title: 'Ifa Periodic Table',
    sub: '256 Odu Interactive Explorer',
    color: '#f0920c',
    href: '/ifa-periodic-table/',
    desc: 'Study the 256 Odu Ifa as the axiomatic language matrix — the blueprint underlying all Yoruba knowledge and vocabulary.',
  },
  {
    sym: '🎮',
    title: 'Play Ifa Games',
    sub: 'Language Games & Simulations',
    color: '#e8488a',
    href: 'https://www.playifagames.org/',
    desc: 'Deploy and play Yoruba language games created in IfaYor project courses on the dedicated Ifa Games platform.',
  },
];

const EXAMS = [
  {
    id: 'waec',
    exam: 'WAEC',
    full: 'West African Examinations Council',
    badge: 'WASSCE',
    color: '#f5c518',
    url: 'https://waecsyllabus.com/yoruba-waec-syllabus/',
    downloadLabel: 'Download WAEC Syllabus PDF',
    structure: [
      { paper: 'Paper 1', detail: '60 Multiple-Choice Questions', time: '1 hour · 60 marks' },
      { paper: 'Paper 2', detail: 'Essay & Long-Answer Questions', time: '2 hours · 100 marks' },
    ],
    sections: [
      {
        label: 'A — Language',
        topics: [
          'Comprehension & Composition (narrative, descriptive, argumentative)',
          'Yoruba Sound System — Vowels, Consonants & Tones',
          'Grammar — Word Structure & Word Classes',
          'Sentence Types & Structure',
          'Translation (Yoruba ↔ English)',
        ],
      },
      {
        label: 'B — Literature',
        topics: [
          'Oral Literature — Prose, Drama & Poetry',
          'Written Literature — Prose, Poetry & Drama',
          'Set Texts (assigned by year, through 2030)',
        ],
      },
      {
        label: 'C — Culture',
        topics: [
          'Ceremonies — Naming, Marriage & Funeral',
          'Yoruba Foods, Games & Non-Verbal Communication',
          'Family, Inheritance & Home Training',
          'Religion, Ancestors & Spiritual Beliefs',
          'Occupations, Politics & Economics',
        ],
      },
    ],
    texts: [
      'Akojopo Alo Ijapa — Adeboye Babalola (Oral Prose)',
      'Eegun Alare — Lawuyi Ogunniran (Oral Drama)',
      'Ojulowo Oriki Ifa — Akano Fasina Agboola (Oral Poetry)',
      'Ogun Omode — Akinwumi Isola (Written Prose)',
      'Ede Abinibi ati Awon Arofo Miiran — Olufemi Adewole (Written Poetry)',
      'Ote Oye — Olusola Fadiya (Written Drama)',
    ],
  },
  {
    id: 'jamb',
    exam: 'JAMB',
    full: 'Joint Admissions and Matriculation Board',
    badge: 'UTME',
    color: '#3b9eff',
    url: 'https://jamb-gov.org/yoruba-syllabus/',
    downloadLabel: 'Download JAMB Syllabus PDF',
    structure: [
      { paper: 'UTME Yoruba', detail: '40 Multiple-Choice Questions', time: 'Part of UTME session' },
    ],
    sections: [
      {
        label: 'Orthography & Phonology',
        topics: [
          'Yoruba Alphabets & Diacritical Marks',
          'Vowels, Consonants & Tonal Patterns',
          'Syllable Structure & Sound Combinations',
          'Correct Spelling & Punctuation in Yoruba',
        ],
      },
      {
        label: 'Grammar & Comprehension',
        topics: [
          'Word Classes — Nouns, Verbs, Adjectives, Pronouns',
          'Sentence Structure & Syntax',
          'Comprehension Passages & Vocabulary in Context',
          'Morphology — Word Formation & Derivatives',
        ],
      },
      {
        label: 'Oral Traditions & Literature',
        topics: [
          'Ifa Oral Poetry (Ese Ifa) & Divination Literature',
          'Oriki — Praise Poetry & Its Functions',
          'Alo (Folktales) & Proverbs (Owe)',
          'Written Literature — Prose, Drama & Poetry',
        ],
      },
      {
        label: 'Yoruba Number System',
        topics: [
          'Counting Structures — Vigesimal (Base-20) System',
          'Subtraction & Grouping in Yoruba Numerals',
          'Number Words in Context & Everyday Usage',
        ],
      },
    ],
    texts: [
      'JAMB-prescribed Yoruba prose texts (updated annually)',
      'JAMB-prescribed Yoruba drama texts (updated annually)',
      'Ifa oral corpus — Ese Ifa selections',
      'Oriki & Alo collections as specified by JAMB',
    ],
  },
];

const STEPS = [
  {
    num: '01',
    color: '#f5c518',
    title: 'Begin with Language & Script',
    body: 'Start your IfaYor journey by learning Yoruba through the Odu Ifa and the Oduduwa script — discovering language as a living energy system rooted in Àṣẹ and the 256 Odu.',
  },
  {
    num: '02',
    color: '#7c3aed',
    title: 'Explore Culture & Knowledge',
    body: 'Deepen your understanding of Ifa and Orisa culture, Yoruba cosmology, and the rich oral traditions — connecting language to the full living knowledge system of the IFA Internet.',
  },
  {
    num: '03',
    color: '#e8488a',
    title: 'Build Language Technologies',
    body: 'Apply your learning by creating games, tools, simulations, and language systems — contributing original projects to the IFA Internet and the IfaYor learning community worldwide.',
  },
];

// ─── ÌMỌ̀ BAR ─────────────────────────────────────────────────────────────────
// "Ìmọ̀ Ìjìnlẹ̀ Èdè Yorùbá Inú Odù Ifá" — Deep Knowledge of the Yoruba Language Within Odu Ifa

function ImoBar() {
  return (
    <div className="imo-bar" role="banner" aria-label="Platform identity">
      <div className="imo-bar__inner">

        {/* Left: Ifa vertical marks */}
        <div className="imo-bar__marks" aria-hidden="true">
          <div className="imo-bar__dot" />
          <div className="imo-bar__dot" />
          <div className="imo-bar__dot" />
          <div className="imo-bar__dot" />
        </div>

        {/* Left glyph */}
        <span className="imo-bar__glyph imo-bar__glyph--l" aria-hidden="true">Odù</span>

        {/* Central phrase */}
        <div className="imo-bar__center">
          <span className="imo-bar__phrase" lang="yo">
            Ìmọ̀ Ìjìnlẹ̀ Èdè Yorùbá Inú Odù Ifá
          </span>
          <span className="imo-bar__sub">
            Deep Knowledge of the Yoruba Language Within the Odu Ifa
          </span>
        </div>

        {/* Right glyph */}
        <span className="imo-bar__glyph imo-bar__glyph--r" aria-hidden="true">Àṣẹ</span>

        {/* Right: Ifa vertical marks */}
        <div className="imo-bar__marks" aria-hidden="true">
          <div className="imo-bar__dot" />
          <div className="imo-bar__dot" />
          <div className="imo-bar__dot" />
          <div className="imo-bar__dot" />
        </div>

      </div>
    </div>
  );
}

// ─── SHARED: ODU SCRIPT ORB ───────────────────────────────────────────────────

function OduScriptOrb() {
  return (
    <div className="script-orb" aria-hidden="true">
      <div className="script-orb__ring script-orb__ring--3" />
      <div className="script-orb__ring script-orb__ring--2" />
      <div className="script-orb__ring script-orb__ring--1" />
      <div className="script-orb__arc script-orb__arc--1" />
      <div className="script-orb__arc script-orb__arc--2" />
      <div className="script-orb__arc script-orb__arc--3" />
      {/* Orbiting Yoruba characters */}
      <div className="script-orb__glyph script-orb__glyph--1">À</div>
      <div className="script-orb__glyph script-orb__glyph--2">Ẹ</div>
      <div className="script-orb__glyph script-orb__glyph--3">Ọ</div>
      <div className="script-orb__glyph script-orb__glyph--4">Ṣ</div>
      <div className="script-orb__glyph script-orb__glyph--5">Ú</div>
      <div className="script-orb__glyph script-orb__glyph--6">Ì</div>
      <div className="script-orb__particle script-orb__particle--1" />
      <div className="script-orb__particle script-orb__particle--2" />
      <div className="script-orb__particle script-orb__particle--3" />
      <div className="script-orb__core">
        <div className="script-orb__core-glow" />
        <span className="script-orb__char">Odù</span>
        <span className="script-orb__core-label">IfaYoruba</span>
      </div>
    </div>
  );
}

// ─── HEADER ──────────────────────────────────────────────────────────────────

function Header() {
  return (
    <header className="header">
      <div className="header__inner">
        <a href="../" className="header__brand">
          <img src="../src/assets/itoe_logo.png" alt="iTOE" className="header__logo" />
          <div>
            <div className="header__site">The IFA Internet</div>
            <div className="header__name">IfaYoruba</div>
          </div>
        </a>
        <nav className="header__nav">
          <a className="nav-link" href="#definition">IfaYor</a>
          <a className="nav-link" href="#tracks">Tracks</a>
          <a className="nav-link" href="#curriculum">Curriculum</a>
          <a className="nav-link" href="#projects">Projects</a>
          <a className="nav-link" href="#exams">WAEC &amp; JAMB</a>
          <a className="nav-link" href="#connected">Apps</a>
          <a className="nav-link" href="#path">Learn</a>
          <a className="nav-link nav-link--cta"
             href="https://toe.cenproject.org/ifa-yoruba-ifayor-platform/"
             target="_blank" rel="noopener noreferrer">TOE Platform</a>
        </nav>
      </div>
    </header>
  );
}

// ─── MOBILE BAR ──────────────────────────────────────────────────────────────

function MobileBar() {
  const items = [
    { sym: '⌂',   label: 'Home',       href: '../' },
    { sym: 'Odù', label: 'IfaYor',     href: '#definition' },
    { sym: '⭐',   label: 'Tracks',     href: '#tracks' },
    { sym: '⬡',   label: 'Curriculum', href: '#curriculum' },
    { sym: '🎮',  label: 'Projects',   href: '#projects' },
  ];
  return (
    <nav className="mobile-bar" aria-label="Mobile navigation">
      <div className="mobile-bar__row">
        {items.map(it => (
          <a key={it.label} className="mobile-bar__item" href={it.href}>
            <span className="mobile-bar__sym">{it.sym}</span>
            <span>{it.label}</span>
          </a>
        ))}
      </div>
    </nav>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="hero">
      <div className="hero__bg">
        <div className="hero__grid" />
        <div className="hero__orb hero__orb--a" />
        <div className="hero__orb hero__orb--b" />
        <div className="hero__orb hero__orb--c" />
        <div className="hero__scanline" />
      </div>

      <div className="container hero__layout">
        <div className="hero__left">
          <div className="hero__badge">
            <span className="hero__badge-dot" />
            The IFA Internet &mdash; IfaYoruba Platform
          </div>

          <h1 className="hero__title">
            <span className="hero__title-main">IfaYoruba</span>
            <span className="hero__title-sub">Language of the Odu Ifa</span>
          </h1>

          <p className="hero__tagline">
            Yoruba Language Studies &mdash; The Oduduwa Script &mdash; Ifa &amp; Orisa Culture
          </p>

          <p className="hero__desc">
            <strong>IfaYoruba (IfaYor)</strong> is the Yoruba language learning platform of
            the IFA Internet — studying the theories of language encoded in the 256 Odu Ifa,
            teaching Yoruba through the <strong>Oduduwa-Aebajiogbe native script</strong>,
            and equipping kids, teens, and adults with the living knowledge of Ifa and
            Orisa culture.
          </p>

          <div className="hero__aliases">
            {ALIASES.map((a, i) => (
              <span key={i} className="hero__alias" style={{ '--alias-color': a.color }}>
                {a.label}
              </span>
            ))}
          </div>

          <div className="hero__ctas">
            <a href="#tracks" className="btn btn--primary">Choose Your Track</a>
            <a href="#curriculum" className="btn btn--ghost">The Curriculum</a>
          </div>
        </div>

        <div className="hero__right" aria-hidden="true">
          <OduScriptOrb />
        </div>
      </div>

      <div className="hero__stats-bar">
        <div className="container">
          <div className="hero__stats">
            {STATS.map((s, i) => (
              <div key={i} className="hero__stat">
                <div className="hero__stat-value">{s.value}</div>
                <div className="hero__stat-label">{s.label}</div>
                <div className="hero__stat-sub">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── DEFINITION SECTION ──────────────────────────────────────────────────────

function DefinitionSection() {
  return (
    <section className="section" id="definition">
      <div className="container">
        <div className="def-grid">
          <div className="def-text">
            <div className="section__header">
              <span className="section__eyebrow section__eyebrow--gold">What is IfaYoruba</span>
              <h2 className="section__title">
                Yoruba Through the <span className="accent--gold">Odu Ifa</span>
              </h2>
              <p className="section__subtitle">
                IfaYoruba (IfaYor) is the language program of the IFA Internet — rooted in the
                understanding that the 256 Odu Ifa are the axiomatic source of Yoruba language,
                culture, and all human knowledge systems.
              </p>
            </div>

            <div className="def-blocks">
              <div className="def-block">
                <div className="def-block__icon">Odù</div>
                <div className="def-block__content">
                  <div className="def-block__label">Language Theory</div>
                  <p className="def-block__body">
                    IfaYor studies the theories of language encoded in the Odu Ifa — establishing
                    Yoruba not merely as a spoken tongue, but as a structured energy-exchange
                    system where every word, tone, and symbol carries Àṣẹ.
                  </p>
                </div>
              </div>
              <div className="def-block">
                <div className="def-block__icon">✍️</div>
                <div className="def-block__content">
                  <div className="def-block__label">Oduduwa Script</div>
                  <p className="def-block__body">
                    The Oduduwa-Aebajiogbe is the native Yoruba writing system — predating the
                    Latin ABD adopted in modern schools. IfaYor teaches this indigenous script
                    alongside standard Yoruba, restoring the full written intelligence of
                    Yoruba civilization.
                  </p>
                </div>
              </div>
              <div className="def-block">
                <div className="def-block__icon">🎮</div>
                <div className="def-block__content">
                  <div className="def-block__label">Learning by Building</div>
                  <p className="def-block__body">
                    IfaYor learners do not just study language — they build with it. Every track
                    includes hands-on projects: games, design systems, simulations, and
                    language technologies deployed on the IFA Internet.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="def-visual">
            <div className="script-symbol">
              <div className="script-symbol__ring script-symbol__ring--outer" />
              <div className="script-symbol__ring script-symbol__ring--mid" />
              <div className="script-symbol__arc script-symbol__arc--1" />
              <div className="script-symbol__arc script-symbol__arc--2" />
              <div className="script-symbol__core">
                <span className="script-symbol__char">Odù</span>
              </div>
              <div className="script-symbol__label">Oduduwa-Aebajiogbe</div>
              <div className="script-symbol__sub">Native Yoruba Script · Ifa Language Matrix</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── LEARNING TRACKS SECTION ─────────────────────────────────────────────────

function TracksSection() {
  const [active, setActive] = useState(0);
  const t = TRACKS[active];

  return (
    <section className="section section--alt" id="tracks">
      <div className="container">
        <div className="section__header section__header--center">
          <span className="section__eyebrow section__eyebrow--rose">Learning Tracks</span>
          <h2 className="section__title">IfaYor for Everyone</h2>
          <p className="section__subtitle">
            Four dedicated tracks — for kids, teens, adults, and professionals — each
            tailored to age, field, depth, and learning objectives, all grounded in the 256 Odu Ifa.
          </p>
        </div>

        <div className="tracks-layout">
          <div className="tracks-tabs">
            {TRACKS.map((tr, i) => (
              <button
                key={i}
                className={`track-tab${i === active ? ' track-tab--active' : ''}`}
                style={{ '--tt-color': tr.color }}
                onClick={() => setActive(i)}
              >
                <span className="track-tab__sym">{tr.sym}</span>
                <div className="track-tab__info">
                  <span className="track-tab__label">{tr.label}</span>
                  <span className="track-tab__age">{tr.age}</span>
                </div>
                <span className="track-tab__arrow">›</span>
              </button>
            ))}
          </div>

          <div className="track-detail" style={{ '--td-color': t.color }}>
            <div className="track-detail__bg" />
            <div className="track-detail__header">
              <span className="track-detail__sym">{t.sym}</span>
              <div>
                <h3 className="track-detail__title">{t.title}</h3>
                <div className="track-detail__age">{t.age}</div>
              </div>
            </div>
            <p className="track-detail__body">{t.body}</p>
            <div className="track-detail__topics">
              <div className="track-detail__topics-label">Core Topics</div>
              <ul className="track-detail__list">
                {t.topics.map((topic, i) => (
                  <li key={i} className="track-detail__item">
                    <span className="track-detail__dot" />
                    {topic}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CURRICULUM SECTION ───────────────────────────────────────────────────────

function CurriculumSection() {
  return (
    <section className="section section--dark" id="curriculum">
      <div className="container">
        <div className="section__header section__header--center">
          <span className="section__eyebrow section__eyebrow--gold">Core Curriculum</span>
          <h2 className="section__title">What You Learn in IfaYor</h2>
          <p className="section__subtitle">
            Five core areas of study — from the Oduduwa native script to applied language
            technology — each grounded in the axiomatic structure of the 256 Odu Ifa.
          </p>
        </div>

        <div className="curriculum-grid">
          {CURRICULUM.map(c => (
            <div key={c.num} className="curriculum-card" style={{ '--cc-color': c.color }}>
              <div className="curriculum-card__top">
                <span className="curriculum-card__sym">{c.sym}</span>
                <span className="curriculum-card__num">{c.num}</span>
              </div>
              <h3 className="curriculum-card__title">{c.title}</h3>
              <div className="curriculum-card__sub">{c.sub}</div>
              <p className="curriculum-card__body">{c.body}</p>
              <div className="curriculum-card__glow" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PROJECTS SECTION ─────────────────────────────────────────────────────────

function ProjectsSection() {
  return (
    <section className="section" id="projects">
      <div className="container">
        <div className="section__header section__header--center">
          <span className="section__eyebrow section__eyebrow--violet">IfaYor Projects</span>
          <h2 className="section__title">
            Learn by <span className="accent--violet">Building</span>
          </h2>
          <p className="section__subtitle">
            Every IfaYor learner builds real language technology — games, tools, simulations,
            and systems that apply Yoruba language knowledge across the IFA Internet.
          </p>
        </div>

        <div className="projects-grid">
          {PROJECTS.map((p, i) => (
            <div key={i} className={`project-card${p.featured ? ' project-card--featured' : ''}`} style={{ '--pc-color': p.color }}>
              {p.featured && <div className="project-card__badge">Key Framework</div>}
              <div className="project-card__icon">{p.icon}</div>
              <h3 className="project-card__title">{p.title}</h3>
              <p className="project-card__desc">{p.desc}</p>
              {p.featured && (
                <div className="project-card__tags">
                  <span className="project-card__tag">Students</span>
                  <span className="project-card__tag">Partners</span>
                  <span className="project-card__tag">Collaborators</span>
                </div>
              )}
              <div className="project-card__bar" />
            </div>
          ))}
        </div>

        <div className="projects-note">
          <div className="projects-note__inner">
            <span className="projects-note__sym">⊕</span>
            <p className="projects-note__text">
              Projects are deployed on the IFA Internet and shared with the global IfaYor
              community — making every learner a contributor to the living language ecosystem.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── EXAMS SECTION ───────────────────────────────────────────────────────────

function ExamsSection() {
  const [active, setActive] = useState(0);
  const [frameError, setFrameError] = useState([false, false]);
  const ex = EXAMS[active];

  function handleFrameLoad(e) {
    try {
      // If frame loaded a cross-origin error page, contentDocument may be inaccessible
      const doc = e.target.contentDocument;
      if (!doc || doc.title === '') setFrameError(prev => { const n=[...prev]; n[active]=true; return n; });
    } catch(_) {
      setFrameError(prev => { const n=[...prev]; n[active]=true; return n; });
    }
  }

  return (
    <section className="section section--dark" id="exams">
      <div className="container">
        <div className="section__header section__header--center">
          <span className="section__eyebrow section__eyebrow--gold">Exam Preparation</span>
          <h2 className="section__title">IfaYor for WAEC and JAMB</h2>
          <p className="section__subtitle">
            Dedicated IfaYor programs aligned to the WAEC and JAMB Yoruba syllabuses — study
            the official curriculum through the lens of the Odu Ifa and Yoruba culture.
          </p>
        </div>

        {/* Exam tabs */}
        <div className="exam-tabs">
          {EXAMS.map((e, i) => (
            <button
              key={e.id}
              className={`exam-tab${i === active ? ' exam-tab--active' : ''}`}
              style={{ '--et-color': e.color }}
              onClick={() => setActive(i)}
            >
              <span className="exam-tab__badge">{e.badge}</span>
              <span className="exam-tab__name">{e.exam}</span>
              <span className="exam-tab__full">{e.full}</span>
            </button>
          ))}
        </div>

        {/* Main panel */}
        <div className="exam-panel" style={{ '--ep-color': ex.color }}>

          {/* Left: quick-reference */}
          <div className="exam-ref">
            <div className="exam-ref__header">
              <span className="exam-ref__badge" style={{ background: `color-mix(in srgb, ${ex.color} 14%, transparent)`, color: ex.color, border: `1px solid color-mix(in srgb, ${ex.color} 32%, transparent)` }}>{ex.badge}</span>
              <h3 className="exam-ref__title">{ex.exam} Yoruba Syllabus</h3>
              <p className="exam-ref__full">{ex.full}</p>
            </div>

            {/* Exam structure */}
            <div className="exam-ref__block">
              <div className="exam-ref__block-label">Exam Structure</div>
              {ex.structure.map((s, i) => (
                <div key={i} className="exam-struct">
                  <div className="exam-struct__paper">{s.paper}</div>
                  <div className="exam-struct__detail">{s.detail}</div>
                  <div className="exam-struct__time">{s.time}</div>
                </div>
              ))}
            </div>

            {/* Sections */}
            <div className="exam-ref__block">
              <div className="exam-ref__block-label">Syllabus Sections</div>
              {ex.sections.map((sec, i) => (
                <div key={i} className="exam-section">
                  <div className="exam-section__label">{sec.label}</div>
                  <ul className="exam-section__list">
                    {sec.topics.map((t, j) => (
                      <li key={j} className="exam-section__item">
                        <span className="exam-section__dot" style={{ background: ex.color }} />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Set texts */}
            <div className="exam-ref__block">
              <div className="exam-ref__block-label">Set Texts &amp; Recommended Reading</div>
              <ul className="exam-texts">
                {ex.texts.map((t, i) => (
                  <li key={i} className="exam-texts__item">
                    <span className="exam-texts__dot" style={{ background: ex.color }} />
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTAs */}
            <div className="exam-ref__ctas">
              <a href={ex.url} target="_blank" rel="noopener noreferrer"
                 className="exam-cta exam-cta--primary" style={{ '--ec-color': ex.color }}>
                ↗ Read Full Syllabus
              </a>
              <a href={ex.url} target="_blank" rel="noopener noreferrer"
                 className="exam-cta exam-cta--ghost" style={{ '--ec-color': ex.color }}>
                ↓ Download PDF
              </a>
            </div>
          </div>

          {/* Right: iframe embed */}
          <div className="exam-frame-wrap">
            <div className="exam-frame-bar">
              <span className="exam-frame-bar__dot exam-frame-bar__dot--r" />
              <span className="exam-frame-bar__dot exam-frame-bar__dot--y" />
              <span className="exam-frame-bar__dot exam-frame-bar__dot--g" />
              <span className="exam-frame-bar__url">{ex.url}</span>
              <a href={ex.url} target="_blank" rel="noopener noreferrer"
                 className="exam-frame-bar__open">Open ↗</a>
            </div>
            {frameError[active] ? (
              <div className="exam-frame-blocked">
                <div className="exam-frame-blocked__icon">🔒</div>
                <p className="exam-frame-blocked__msg">
                  This syllabus source has restricted in-page embedding.
                </p>
                <a href={ex.url} target="_blank" rel="noopener noreferrer"
                   className="exam-cta exam-cta--primary" style={{ '--ec-color': ex.color }}>
                  ↗ Read Syllabus on Source Site
                </a>
              </div>
            ) : (
              <iframe
                key={ex.id}
                src={ex.url}
                title={`${ex.exam} Yoruba Syllabus`}
                className="exam-frame"
                onLoad={handleFrameLoad}
                sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
              />
            )}
          </div>

        </div>
      </div>
    </section>
  );
}

// ─── CONNECTED APPS SECTION ───────────────────────────────────────────────────

function ConnectedSection() {
  return (
    <section className="section section--alt" id="connected">
      <div className="container">
        <div className="section__header section__header--center">
          <span className="section__eyebrow section__eyebrow--jade">IFA Internet Ecosystem</span>
          <h2 className="section__title">IfaYor Connected Platforms</h2>
          <p className="section__subtitle">
            IfaYoruba is fully integrated with the IFA Internet — linking to the tools,
            platforms, and knowledge systems that power every aspect of language learning
            and creation.
          </p>
        </div>

        <div className="connected-grid">
          {LINKED_APPS.map((app, i) => (
            <a
              key={i}
              href={app.href}
              className="connected-card"
              style={{ '--ca-color': app.color }}
              target={app.href.startsWith('http') ? '_blank' : undefined}
              rel={app.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              <div className="connected-card__header">
                <div className="connected-card__icon">{app.sym}</div>
                <div className="connected-card__pulse" />
              </div>
              <h3 className="connected-card__title">{app.title}</h3>
              <div className="connected-card__sub">{app.sub}</div>
              <p className="connected-card__desc">{app.desc}</p>
              <div className="connected-card__arrow">→</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── LEARNING PATH SECTION ────────────────────────────────────────────────────

function PathSection() {
  return (
    <section className="section section--dark" id="path">
      <div className="container">
        <div className="section__header section__header--center">
          <span className="section__eyebrow section__eyebrow--gold">Your IfaYor Journey</span>
          <h2 className="section__title">Three Steps into Yoruba Knowledge</h2>
          <p className="section__subtitle">
            From your first Yoruba word to building your own language technology —
            IfaYor guides every learner through three transformative stages.
          </p>
        </div>

        <div className="path-steps">
          {STEPS.map((s, i) => (
            <div key={i} className="path-step" style={{ '--step-color': s.color }}>
              <div className="path-step__left">
                <div className="path-step__num">{s.num}</div>
                {i < STEPS.length - 1 && <div className="path-step__connector" />}
              </div>
              <div className="path-step__card">
                <h3 className="path-step__title">{s.title}</h3>
                <p className="path-step__body">{s.body}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="path-cta">
          <a href="https://toe.cenproject.org/ifa-yoruba-ifayor-platform/"
             target="_blank" rel="noopener noreferrer"
             className="btn btn--primary">
            Explore IfaYor on TOE
          </a>
          <a href="../" className="btn btn--ghost">
            Back to IFA Internet
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__energy-line" aria-hidden="true" />
      <div className="container">
        <div className="footer__inner">
          <div className="footer__brand">
            <div className="footer__logo">
              <img src="../src/assets/itoe_logo.png" alt="iTOE" className="footer__logo-mark" />
              <span>The IFA Internet</span>
            </div>
            <p className="footer__tagline">
              IfaYoruba (IfaYor) — Language of the Odu Ifa
            </p>
            <p className="footer__tagline footer__tagline--sm">
              Part of the <a href="https://cenproject.org/" className="footer__link-inline">CENProject</a> — Consciousness-Energy Research.
            </p>
          </div>
          <nav className="footer__links">
            <a href="#definition"  className="footer__link">IfaYor</a>
            <a href="#tracks"      className="footer__link">Learning Tracks</a>
            <a href="#curriculum"  className="footer__link">Curriculum</a>
            <a href="#projects"    className="footer__link">Projects</a>
            <a href="#connected"   className="footer__link">Connected Apps</a>
            <a href="#path"        className="footer__link">Learn</a>
            <a href="../"          className="footer__link">IFA Internet</a>
          </nav>
        </div>
        <div className="footer__bottom">
          <span className="footer__copy">
            &copy; 2026 CENProject Innovations Limited. All rights reserved.
          </span>
          <span className="footer__powered">
            The IFA Internet &mdash; IfaYoruba Platform
          </span>
        </div>
      </div>
    </footer>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────

function App() {
  return (
    <>
      <ImoBar />
      <Header />
      <main>
        <HeroSection />
        <DefinitionSection />
        <TracksSection />
        <CurriculumSection />
        <ProjectsSection />
        <ExamsSection />
        <ConnectedSection />
        <PathSection />
      </main>
      <Footer />
      <MobileBar />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
