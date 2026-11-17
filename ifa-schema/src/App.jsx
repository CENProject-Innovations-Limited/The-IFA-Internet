// Ifa Schema: ToE Schema — IFA Internet Platform
// React 18 UMD + Babel Standalone — no build step

const { useState, useEffect, useRef } = React;

// ── Data ─────────────────────────────────────────────────────────────────────

const FEATURES = [
  {
    icon: '⬡',
    title: 'Universal Schema Integration',
    body: 'Unveils how the Ifa Schema harmonizes diverse schematic models, fostering a unified understanding that enhances interdisciplinary collaboration.',
    color: '#3b9eff',
  },
  {
    icon: '⟳',
    title: 'Dynamic Energy & Consciousness Mapping',
    body: "Highlights the framework's role in decoding the interplay between energy flows and consciousness structures to inform holistic analysis.",
    color: '#f0920c',
  },
  {
    icon: '◈',
    title: 'Systematic Framework Adaptability',
    body: "Details the schema's versatility in adapting to varied fields, enabling tailored applications while maintaining core systematic integrity.",
    color: '#00c87c',
  },
];

const SCHEMA_TYPES = [
  {
    id: 'general',
    num: '01',
    title: 'General Meaning',
    field: 'Universal',
    color: '#3b9eff',
    icon: '◻',
    summary: 'A plan, structure, or model showing how parts of a system are organized.',
    body: 'In general terms, a schema is a plan, structure, or model that shows how parts of a system are organized. The core idea is always a structured representation of how things are arranged and related.',
    examples: [
      'A map is a schema of geography.',
      'A table of contents is a schema of a book.',
      'A database structure is a schema of stored information.',
    ],
    formula: 'Schema = Organized structure of knowledge or data',
  },
  {
    id: 'math',
    num: '02',
    title: 'Mathematics & Logic',
    field: 'Mathematics',
    color: '#f0920c',
    icon: '∑',
    summary: 'A general template for formulas or statements generating many specific instances.',
    body: 'In mathematics and logic, a schema is a general template for formulas or statements that can generate many specific instances. Logical schema [P → Q] is a pattern that can represent many statements.',
    examples: [
      'If it rains → the ground gets wet',
      'If a number is even → it is divisible by 2',
    ],
    formula: 'Schema = Formula pattern [P → Q]',
  },
  {
    id: 'database',
    num: '03',
    title: 'Database Systems',
    field: 'Computer Science',
    color: '#14b8d4',
    icon: '⊞',
    summary: 'Describes database structure — tables, fields, data types, relationships.',
    body: 'In computer science, a schema describes the structure of a database. The schema defines tables, fields, data types, and relationships — acting like a blueprint of the database.',
    examples: [
      'Student_ID — Integer',
      'Name — Text',
      'Age — Integer',
      'Course — Text',
    ],
    formula: 'Schema = Blueprint of the database',
  },
  {
    id: 'psychology',
    num: '04',
    title: 'Psychology',
    field: 'Cognitive Science',
    color: '#8b5cf6',
    icon: '⌀',
    summary: 'A mental framework used to organize knowledge — developed by Jean Piaget.',
    body: 'In psychology (especially cognitive science), a schema is a mental framework used to organize knowledge. The concept was developed by Jean Piaget. When someone says "school", the brain activates a school schema.',
    examples: [
      'School schema: teacher, classroom, students, homework',
      'City schema: roads, buildings, people, transit',
    ],
    formula: 'Schema = Mental framework for organizing experience',
  },
  {
    id: 'ai',
    num: '05',
    title: 'Artificial Intelligence',
    field: 'AI & Knowledge',
    color: '#ec4899',
    icon: '⟐',
    summary: 'Structured knowledge representations that allow machines to reason.',
    body: 'In AI and knowledge representation, schemas organize knowledge so machines can reason. Frame schemas, semantic networks, and knowledge graphs allow machines to understand complex relationships between entities.',
    examples: [
      'Car → has → engine',
      'Car → uses → fuel',
      'Driver → operates → car',
    ],
    formula: 'Schema = Structured knowledge for machine reasoning',
  },
  {
    id: 'web',
    num: '06',
    title: 'Web Technology',
    field: 'Internet',
    color: '#00c87c',
    icon: '⬡',
    summary: 'Structured data added to web pages to help search engines understand content.',
    body: 'On the internet, schema markup is structured data added to web pages to help search engines understand content. Google and other search engines use schema to organize web information.',
    examples: [
      'Person: Name: Ada Lovelace',
      'Profession: Mathematician',
      'Birth Year: 1815',
    ],
    formula: 'Schema = Semantic structure for the web',
  },
  {
    id: 'philosophy',
    num: '07',
    title: 'Philosophy & Epistemology',
    field: 'Philosophy',
    color: '#f59e0b',
    icon: '⊕',
    summary: 'A conceptual structure used to interpret reality — formulated by Immanuel Kant.',
    body: "In philosophy, a schema is a conceptual structure used to interpret reality. Immanuel Kant proposed schemata as mental structures that connect pure concepts with sensory experience — bridging thought and the world.",
    examples: [
      'Time as a schema for applying causality',
      'Space as a schema for applying geometry',
    ],
    formula: 'Schema = Conceptual bridge between thought and experience',
  },
  {
    id: 'analogy',
    num: '08',
    title: 'Mathematical Analogy',
    field: 'Meta-Mathematics',
    color: '#3b9eff',
    icon: '≡',
    summary: 'A schema as function template: f(x) = ax + b generates all linear functions.',
    body: 'A simple mathematical way to understand schema — think of a function template: f(x) = ax + b. This is a schema for all linear functions. Every specific linear function is an instance of this schema.',
    examples: [
      'f(x) = 2x + 1',
      'f(x) = 5x − 7',
      'f(x) = −3x + 4',
    ],
    formula: 'f(x) = ax + b — Schema for all linear functions',
  },
  {
    id: 'vs',
    num: '09',
    title: 'Schema vs Model vs Framework',
    field: 'Conceptual',
    color: '#14b8d4',
    icon: '≠',
    summary: 'Schema = structure; Model = representation of reality; Framework = system of ideas.',
    body: 'These three concepts are often conflated but serve distinct roles in knowledge organization. A schema is the structural blueprint; a model is a representation of reality derived from it; a framework is a broader system of ideas and tools.',
    examples: [
      'Schema — Structure or blueprint',
      'Model — Representation of reality',
      'Framework — System of ideas or tools',
    ],
    formula: 'Schema ⊂ Meta-structure of all knowledge systems',
  },
  {
    id: 'deep',
    num: '10',
    title: 'Deep Scientific View',
    field: 'Universal Principle',
    color: '#00c87c',
    icon: '∞',
    summary: 'Schema is a universal organizing principle — a meta-structure of knowledge itself.',
    body: 'In modern knowledge systems, schema is a universal organizing principle used in mathematics, physics, linguistics, artificial intelligence, databases, and knowledge engineering. It is essentially a meta-structure of knowledge — the structure of structures.',
    examples: [
      'Used in mathematics, physics, linguistics',
      'Core to artificial intelligence systems',
      'Foundation of database engineering',
      'Universal across all fields of knowledge',
    ],
    formula: 'Schema = Meta-structure of knowledge',
  },
];

const ADVANCED_TOPICS = [
  {
    id: 'category',
    title: 'Schema in Category Theory',
    subtitle: 'Structural Patterns & Morphisms',
    color: '#3b9eff',
    icon: '⟶',
    body: 'In Category Theory, a schema can be understood as a structural pattern describing objects and the relationships (morphisms) between them. Category theory studies structures and relationships rather than the internal details of objects — a category consists of Objects, Morphisms (arrows), and Composition rules.',
    detail: 'A schema in this context is essentially a small category that acts as a template for a system of relations, allowing systems to be described abstractly and universally. This is why category theory is sometimes called the mathematics of structure. Developed by Samuel Eilenberg and Saunders Mac Lane in 1945.',
    example: 'Student → EnrolledIn → Course\nObjects: Student, Course\nMorphism: EnrolledIn : Student → Course',
    author: 'Eilenberg & Mac Lane, 1945',
  },
  {
    id: 'algebraic',
    title: 'Schema in Algebraic Geometry',
    subtitle: 'Grothendieck Schemes',
    color: '#f0920c',
    icon: 'S',
    body: "In Algebraic Geometry, a schema (scheme) is a generalized geometric space defined using algebraic structures. Instead of defining geometry purely by points, schemes define geometry using rings of functions — a profound conceptual inversion that Grothendieck called the Spec construction.",
    detail: "A scheme consists of a topological space (prime ideals as points) and a structure sheaf of rings. This combination unifies algebraic geometry, number theory, topology, and arithmetic geometry. Grothendieck's ideas later influenced the proof of Fermat's Last Theorem by Andrew Wiles.",
    example: 'Spec(R) = spectrum of ring R\n(Topological Space, Structure Sheaf)\nPrime ideals ↔ Points of geometric space',
    author: 'Alexander Grothendieck, 1960s',
  },
  {
    id: 'ai-advanced',
    title: 'Schema Theory in AI',
    subtitle: 'Structured Knowledge Representation',
    color: '#8b5cf6',
    icon: '⟐',
    body: 'In Artificial Intelligence, schema theory refers to structured knowledge representations used by intelligent systems. Schemas represent typical patterns of knowledge — enabling systems to interpret situations, predict events, and reason about actions.',
    detail: 'This idea originated in cognitive science (Frederic Bartlett, Jean Piaget). Modern AI implementations include frames, knowledge graphs, and semantic networks. Large language models implicitly learn schematic representations from vast corpora of human knowledge.',
    example: 'Restaurant Schema:\n→ enter → sit at table\n→ order food → eat\n→ pay bill → leave',
    author: 'Bartlett, Piaget — formalized in AI by Minsky (frames)',
  },
  {
    id: 'grothendieck',
    title: 'The Grothendieck Revolution',
    subtitle: 'Algebra–Geometry Unification',
    color: '#00c87c',
    icon: 'G',
    body: 'Alexander Grothendieck introduced schemes in the 1960s, generalizing geometry far beyond classical varieties. His fundamental insight: from any commutative ring R, construct a geometric object Spec(R) — the spectrum of the ring, representing the set of prime ideals as points of a geometric space.',
    detail: "Grothendieck's scheme theory enabled modern moduli spaces, étale cohomology, and proofs of the Weil conjectures. It revealed a profound truth: Space itself can be described algebraically. Prime numbers become geometric objects in Spec(ℤ). Geometry is the visible expression of algebraic structure.",
    example: 'ℤ as geometric space: Spec(ℤ)\nEach prime p → a geometric point\n2, 3, 5, 7, 11, … = Points of space',
    author: 'Alexander Grothendieck, IHÉS, 1960–1970',
  },
];

const STATS = [
  { value: 175, label: 'Schema Integration Index', desc: 'Schema connectivity and coherence', color: '#3b9eff' },
  { value: 320, label: 'Consciousness Interaction Score', desc: 'Dynamic interplay between energy and awareness', color: '#f0920c' },
  { value: 265, label: 'Systematic Structure Efficiency', desc: 'Effectiveness of structural design in diverse applications', color: '#00c87c' },
  { value: 410, label: 'Energy Flow Coefficient', desc: 'Energy distribution within the Ifa Schema model', color: '#8b5cf6' },
];

const FOUNDATION_CARDS = [
  {
    icon: '◻',
    title: 'Foundations of Schema Theory',
    body: 'Understand the core principles that define schemas, schemes, and schematics in a systematic context.',
    color: '#3b9eff',
  },
  {
    icon: '⟳',
    title: 'Energy & Consciousness Interplay',
    body: 'Investigate the dynamic relationships between energy flow, consciousness, and structured systems.',
    color: '#f0920c',
  },
  {
    icon: '◈',
    title: 'Applications Across Disciplines',
    body: 'Discover how Ifa Schema informs diverse fields through systematic structures and conceptual frameworks.',
    color: '#00c87c',
  },
];

// ── Wilson Scheme Data ────────────────────────────────────────────────────────

const WILSON_IFA_PILLARS = [
  { num: '00', title: 'Odú',                              sub: 'General Law / Principle / Code' },
  { num: '01', title: 'Àlàyé Ìjìnlẹ̀',                  sub: 'Theory' },
  { num: '02', title: 'Ìdánkanwò',                       sub: 'Experiment' },
  { num: '03', title: 'Iṣẹ́ Ayárabíaṣá / Ìṣirò ṣíṣe',   sub: 'Computation' },
  { num: '04', title: 'Àtẹ/àwòrán yíyá',                sub: 'Design' },
  { num: '05', title: 'Ìbánisọ̀rọ̀',                     sub: 'Communication' },
  { num: '06', title: 'Ìwàpẹ̀lẹ́ / Ìwà ọmọlúwàbí',      sub: 'Ethics & Morality' },
  { num: '07', title: 'Àrògún / Ìwòye',                  sub: 'Logic' },
  { num: '08', title: 'Àti àwọn òdì (ìdàkejì) wọn mẹ́jọ', sub: 'And Their 8 Duals' },
];

// ── IFA Academy Data ──────────────────────────────────────────────────────────

const IFA_ACADEMY_COURSES = [
  {
    num: '0',
    title: 'The Basics of IFA Coding',
    duration: '4 Months',
    color: '#3b9eff',
    chapters: [
      { num: '0', title: 'Chapter 0' },
      { num: '1', title: 'Chapter 1' },
      { num: '2', title: 'Chapter 2' },
      { num: '3', title: 'Chapter 3: IfaProject', isProject: true },
    ],
  },
  {
    num: '1',
    title: 'Introduction to IFA Mathematics',
    duration: '4 Months',
    color: '#f0920c',
    chapters: [
      { num: '0', title: 'Chapter 0' },
      { num: '1', title: 'Chapter 1' },
      { num: '2', title: 'Chapter 2' },
      { num: '3', title: 'Chapter 3: IfaProject', isProject: true },
    ],
  },
  {
    num: '2',
    title: 'Intermediate IFA Mathematics I (IFA STEAM)',
    duration: '4 Months',
    color: '#00c87c',
    chapters: [
      { num: '0', title: 'Chapter 0' },
      { num: '1', title: 'Chapter 1' },
      { num: '2', title: 'Chapter 2' },
      { num: '3', title: 'Chapter 3: IfaProject', isProject: true },
    ],
  },
  {
    num: '3',
    title: 'Project Work',
    duration: '',
    color: '#8b5cf6',
    chapters: [
      { num: '0', title: 'Chapter 0' },
      { num: '1', title: 'Chapter 1' },
      { num: '2', title: 'Chapter 2' },
      { num: '3', title: 'Chapter 3: IfaProject', isProject: true },
    ],
  },
];

// ── Schema Network Visualization ─────────────────────────────────────────────

const NETWORK_NODES = [
  { id: 'ifa',    label: 'Ifa Schema', x: 50, y: 50, r: 9,  color: '#f0920c', primary: true },
  { id: 'math',   label: 'Math',       x: 20, y: 18, r: 5.5, color: '#3b9eff' },
  { id: 'ai',     label: 'AI',         x: 80, y: 18, r: 5.5, color: '#8b5cf6' },
  { id: 'db',     label: 'Database',   x: 88, y: 60, r: 5,   color: '#14b8d4' },
  { id: 'phil',   label: 'Philosophy', x: 12, y: 65, r: 5.5, color: '#00c87c' },
  { id: 'web',    label: 'Web',        x: 50, y: 8,  r: 4,   color: '#ec4899' },
  { id: 'psych',  label: 'Psychology', x: 82, y: 85, r: 4.5, color: '#f59e0b' },
  { id: 'cat',    label: 'Category',   x: 18, y: 88, r: 4.5, color: '#3b9eff' },
  { id: 'groth',  label: 'Grothendieck', x: 50, y: 88, r: 4, color: '#00c87c' },
];

const NETWORK_EDGES = [
  ['ifa','math'],['ifa','ai'],['ifa','db'],['ifa','phil'],
  ['ifa','web'],['ifa','psych'],['ifa','cat'],['ifa','groth'],
  ['math','ai'],['ai','db'],['db','psych'],['phil','cat'],
  ['math','groth'],['web','ai'],['cat','groth'],
];

function SchemaNetwork() {
  return (
    <svg viewBox="0 0 100 100" className="schema-net" aria-hidden="true">
      <defs>
        <radialGradient id="node-ifa" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#ffe0a0" />
          <stop offset="100%" stopColor="#f0920c" />
        </radialGradient>
        <filter id="glow-net">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Edges */}
      {NETWORK_EDGES.map(([a, b], i) => {
        const na = NETWORK_NODES.find(n => n.id === a);
        const nb = NETWORK_NODES.find(n => n.id === b);
        const isPrimary = a === 'ifa' || b === 'ifa';
        return (
          <line
            key={i}
            x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
            stroke={isPrimary ? 'rgba(240,146,12,0.22)' : 'rgba(59,158,255,0.12)'}
            strokeWidth={isPrimary ? '0.4' : '0.25'}
          />
        );
      })}

      {/* Nodes */}
      {NETWORK_NODES.map(n => (
        <g key={n.id} className={`net-node${n.primary ? ' net-node--primary' : ''}`}>
          {n.primary && (
            <circle cx={n.x} cy={n.y} r={n.r + 5} fill="none" stroke={n.color} strokeWidth="0.3" opacity="0.25" className="net-pulse" />
          )}
          <circle
            cx={n.x} cy={n.y} r={n.r}
            fill={n.primary ? 'url(#node-ifa)' : `${n.color}28`}
            stroke={n.color}
            strokeWidth={n.primary ? '0.7' : '0.4'}
            filter={n.primary ? 'url(#glow-net)' : undefined}
          />
          {n.primary && (
            <circle cx={n.x} cy={n.y} r={n.r * 0.55} fill={`${n.color}55`} stroke={n.color} strokeWidth="0.3" />
          )}
          <text
            x={n.x} y={n.y}
            textAnchor="middle" dy="0.35em"
            fill={n.primary ? '#fff' : n.color}
            fontSize={n.primary ? '3.2' : '2.4'}
            fontWeight="700"
            letterSpacing="-0.02"
          >
            {n.primary ? 'Ifa Schema' : n.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

// ── Animated Counter ──────────────────────────────────────────────────────────

function AnimatedCounter({ target, color }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const step = Math.ceil(target / 60);
          const timer = setInterval(() => {
            start += step;
            if (start >= target) { setVal(target); clearInterval(timer); }
            else setVal(start);
          }, 18);
        }
      },
      { threshold: 0.4 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);

  return <span ref={ref} className="stat-value" style={{ color }}>{val}</span>;
}

// ── Nav ───────────────────────────────────────────────────────────────────────

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <nav className={`nav${scrolled ? ' nav--scrolled' : ''}`}>
      <a href="../" className="nav-logo">
        <span className="nav-logo__mark">◈</span>
        <span className="nav-logo__text">IFA Internet</span>
      </a>
      <div className="nav-links">
        <a href="#overview"   className="nav-link">Overview</a>
        <a href="#explorer"   className="nav-link">Explorer</a>
        <a href="#advanced"   className="nav-link">Advanced</a>
        <a href="#wilson"     className="nav-link">Wilson Scheme</a>
        <a href="#academy"    className="nav-link">Academy</a>
        <a href="#foundation" className="nav-link">Foundation</a>
        <a href="./lab/" className="nav-link nav-link--lab" target="_blank" rel="noopener noreferrer">Lab ↗</a>
      </div>
      <a href="../" className="nav-cta">← Back</a>
    </nav>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="hero" id="overview">
      <div className="hero__bg-grid" aria-hidden="true" />
      <div className="hero__orbs" aria-hidden="true">
        <div className="hero__orb hero__orb--1" />
        <div className="hero__orb hero__orb--2" />
        <div className="hero__orb hero__orb--3" />
      </div>

      <div className="hero__inner">
        <div className="hero__text">
          <div className="hero__eyebrow">
            <span className="hero__tag">IFA Internet Platform</span>
            <span className="hero__sep">·</span>
            <span className="hero__tag hero__tag--dim">SchemoE</span>
          </div>

          <h1 className="hero__title">
            Ifa Schema
            <span className="hero__title-sub"> : ToE Schema</span>
          </h1>

          <p className="hero__tagline">
            Schematic Approach to Unification and Integration of Everything (UIoE)
          </p>

          <p className="hero__body">
            Ifa Schema is the world of schemas — covering the study of schemas in all fields,
            in addition to schemes, schematics, graphs, and related areas. Also known as the{' '}
            <strong>ToE Schema</strong>, <strong>Energy-Based Schema</strong>,{' '}
            <strong>Consciousness Schema</strong>, or the{' '}
            <strong>Schema for Everything (SchemoE)</strong>.
          </p>

          <p className="hero__body hero__body--accent">
            Universal Meta-Schema for IFA Systems — especially Ifa Computer and Ifa AI.
          </p>

          <div className="hero__actions">
            <a href="#explorer" className="btn btn--primary">Explore Schema Types</a>
            <a href="#advanced" className="btn btn--ghost">Advanced Topics</a>
          </div>
        </div>

        <div className="hero__viz">
          <div className="hero__viz-wrap">
            <SchemaNetwork />
            <div className="hero__viz-label">Ifa Schema Network</div>
          </div>
        </div>
      </div>

      <div className="hero__features">
        {FEATURES.map((f, i) => (
          <div key={i} className="feature-card" style={{ '--fc': f.color }}>
            <div className="feature-card__icon">{f.icon}</div>
            <h3 className="feature-card__title">{f.title}</h3>
            <p className="feature-card__body">{f.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Schema Explorer ───────────────────────────────────────────────────────────

function SchemaExplorer() {
  const [active, setActive] = useState(0);
  const s = SCHEMA_TYPES[active];
  const tabsRef = useRef(null);

  return (
    <section className="explorer section" id="explorer">
      <div className="section__inner">
        <div className="section__header">
          <span className="section__eyebrow">Core Principles</span>
          <h2 className="section__title">What is a Schema?</h2>
          <p className="section__sub">
            A <strong>schema</strong> (plural: schemas or schemata) is a structured framework or
            blueprint used to organize information, concepts, or systems. The exact meaning depends
            on the field — but the core idea is always a structured representation of how things
            are arranged and related.
          </p>
        </div>

        {/* Tab bar */}
        <div className="explorer__tabs" ref={tabsRef} role="tablist">
          {SCHEMA_TYPES.map((s, i) => (
            <button
              key={s.id}
              role="tab"
              aria-selected={active === i}
              className={`explorer__tab${active === i ? ' explorer__tab--active' : ''}`}
              style={{ '--tc': s.color }}
              onClick={() => setActive(i)}
            >
              <span className="explorer__tab-num">{s.num}</span>
              <span className="explorer__tab-title">{s.title}</span>
            </button>
          ))}
        </div>

        {/* Panel */}
        <div className="explorer__panel" style={{ '--pc': s.color }} key={s.id}>
          <div className="explorer__panel-left">
            <div className="explorer__sym" style={{ color: s.color }}>{s.icon}</div>
            <div className="explorer__field-badge" style={{ '--fc': s.color }}>{s.field}</div>
            <h3 className="explorer__panel-title">{s.title}</h3>
            <p className="explorer__panel-summary">{s.summary}</p>
            <div className="explorer__formula" style={{ borderColor: `${s.color}55` }}>
              <span className="explorer__formula-label">Formula</span>
              <code className="explorer__formula-code" style={{ color: s.color }}>{s.formula}</code>
            </div>
          </div>
          <div className="explorer__panel-right">
            <p className="explorer__body">{s.body}</p>
            <div className="explorer__examples">
              <span className="explorer__examples-label">Examples</span>
              <ul className="explorer__examples-list">
                {s.examples.map((ex, i) => (
                  <li key={i} className="explorer__example-item">
                    <span className="explorer__example-dot" style={{ background: s.color }} />
                    {ex}
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

// ── Advanced Topics ───────────────────────────────────────────────────────────

function AdvancedTopics() {
  const [open, setOpen] = useState(null);

  return (
    <section className="advanced section" id="advanced">
      <div className="section__inner">
        <div className="section__header">
          <span className="section__eyebrow">Advanced Schema</span>
          <h2 className="section__title">Schema in Advanced Mathematics, AI & Philosophy</h2>
          <p className="section__sub">
            The word <em>schema</em> appears in several advanced areas of mathematics and computer
            science. Although the contexts differ, the central idea remains: a structure that
            organizes relationships between elements of a system.
          </p>
        </div>

        <div className="advanced__grid">
          {ADVANCED_TOPICS.map((t, i) => {
            const isOpen = open === t.id;
            return (
              <div
                key={t.id}
                className={`adv-card${isOpen ? ' adv-card--open' : ''}`}
                style={{ '--ac': t.color }}
              >
                <div className="adv-card__head">
                  <div className="adv-card__icon-wrap">
                    <span className="adv-card__icon">{t.icon}</span>
                  </div>
                  <div className="adv-card__meta">
                    <h3 className="adv-card__title">{t.title}</h3>
                    <span className="adv-card__sub">{t.subtitle}</span>
                  </div>
                  <button
                    className="adv-card__toggle"
                    onClick={() => setOpen(isOpen ? null : t.id)}
                    aria-label={isOpen ? 'Collapse' : 'Expand'}
                  >
                    <span className="adv-card__toggle-icon">{isOpen ? '−' : '+'}</span>
                  </button>
                </div>

                <p className="adv-card__body">{t.body}</p>

                {isOpen && (
                  <div className="adv-card__detail">
                    <p className="adv-card__detail-text">{t.detail}</p>
                    <div className="adv-card__example">
                      <span className="adv-card__example-label">IfaSchema:</span>
                      <pre className="adv-card__example-code">{t.example}</pre>
                    </div>
                    <div className="adv-card__author">
                      <span className="adv-card__author-dot" />
                      {t.author}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Comparative table */}
        <div className="adv-table-wrap">
          <h3 className="adv-table__title">Comparative View</h3>
          <div className="adv-table">
            <div className="adv-table__row adv-table__row--head">
              <span>Field</span>
              <span>Schema Meaning</span>
            </div>
            {[
              ['Category Theory',    'Structural pattern (objects + morphisms)'],
              ['Algebraic Geometry', 'Generalized geometric space via rings'],
              ['Artificial Intelligence', 'Structured knowledge representation'],
              ['Grothendieck Mathematics', 'Algebra–geometry unification (Spec)'],
              ['Ifa Schema (ToE)',   'Meta-schema: structure of all structures'],
            ].map(([f, m], i) => (
              <div key={i} className="adv-table__row">
                <span className="adv-table__field">{f}</span>
                <span className="adv-table__meaning">{m}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Stats ─────────────────────────────────────────────────────────────────────

function Stats() {
  return (
    <section className="stats-section">
      <div className="stats-section__inner">
        <p className="stats-section__label">Comprehensive Insight into Core Data Points</p>
        <div className="stats-grid">
          {STATS.map((s, i) => (
            <div key={i} className="stat-card" style={{ '--sc': s.color }}>
              <AnimatedCounter target={s.value} color={s.color} />
              <div className="stat-label">{s.label}</div>
              <div className="stat-desc">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Foundation ────────────────────────────────────────────────────────────────

function Foundation() {
  return (
    <section className="foundation section" id="foundation">
      <div className="section__inner">
        <div className="section__header">
          <span className="section__eyebrow">Foundations</span>
          <h2 className="section__title">Explore the Foundations of Ifa Schema</h2>
          <p className="section__sub">
            Delve into comprehensive resources that illuminate the universal framework of schemas
            and their applications across disciplines.
          </p>
        </div>

        <div className="foundation__grid">
          {FOUNDATION_CARDS.map((c, i) => (
            <div key={i} className="found-card" style={{ '--fc': c.color }}>
              <div className="found-card__icon">{c.icon}</div>
              <h3 className="found-card__title">{c.title}</h3>
              <p className="found-card__body">{c.body}</p>
              <div className="found-card__arrow">→</div>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="cta-banner">
          <div className="cta-banner__glow" aria-hidden="true" />
          <div className="cta-banner__text">
            <h3 className="cta-banner__title">Begin Your Journey with Ifa Schema Now</h3>
            <p className="cta-banner__body">
              Discover how Ifa Schema unravels universal patterns and enhances your understanding
              across disciplines. Engage with detailed insights and practical applications to
              elevate your knowledge.
            </p>
          </div>
          <div className="cta-banner__actions">
            <a href="#explorer" className="btn btn--primary">Explore Schema Types</a>
            <a href="../" className="btn btn--ghost">IFA Internet</a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Ifa-Wilson Scheme ─────────────────────────────────────────────────────────

function WilsonScheme() {
  return (
    <section className="wilson section" id="wilson">
      <div className="section__inner">
        <div className="section__header">
          <span className="section__eyebrow">Ifa Schemes</span>
          <h2 className="section__title">The Ifa-Wilson Scheme</h2>
          <p className="section__sub">
            Also known as the <strong>Ifa-Based Wilson Scheme</strong> — applying Ifa/Orisa Logic
            (ToE Logic) to generalize the Wilson Scheme (or any scheme) to all fields of knowledge
            and all dimensions of reality, beyond science.
          </p>
        </div>

        {/* Ken Wilson Quote */}
        <div className="wilson-quote">
          <div className="wilson-quote__mark">"</div>
          <blockquote className="wilson-quote__text">
            Computation had become the third leg of science, joining the traditions of theory and experiment.
          </blockquote>
          <div className="wilson-quote__attr">
            — <strong>Ken Wilson</strong>, Nobel Physics Laureate
          </div>
        </div>

        <div className="wilson-pillars-wrap">
          {/* Wilson Original */}
          <div className="wilson-col">
            <div className="wilson-col__head">
              <span className="wilson-col__badge" style={{ '--wc': '#3b9eff' }}>Wilson Scheme</span>
              <h3 className="wilson-col__title">Pillars (Legs) of Science</h3>
            </div>
            <ul className="wilson-list">
              {['Theory', 'Experiment', 'Computation'].map((p, i) => (
                <li key={i} className="wilson-list__item" style={{ '--wc': '#3b9eff' }}>
                  <span className="wilson-list__num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="wilson-list__label">{p}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="wilson-arrow">
            <div className="wilson-arrow__line" />
            <span className="wilson-arrow__sym">⟹</span>
            <div className="wilson-arrow__label">Ifa Generalization</div>
          </div>

          {/* Ifa Extension */}
          <div className="wilson-col wilson-col--ifa">
            <div className="wilson-col__head">
              <span className="wilson-col__badge" style={{ '--wc': '#f0920c' }}>Ifa Scheme</span>
              <h3 className="wilson-col__title">Pillars of the Ifa-Wilson Scheme</h3>
            </div>
            <ul className="wilson-list">
              {WILSON_IFA_PILLARS.map((p, i) => (
                <li key={i} className="wilson-list__item" style={{ '--wc': i === 8 ? '#8b5cf6' : '#f0920c' }}>
                  <span className="wilson-list__num">{p.num}</span>
                  <div className="wilson-list__content">
                    <span className="wilson-list__label">{p.title}</span>
                    <span className="wilson-list__sub">{p.sub}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Brief explanation */}
        <div className="wilson-desc">
          <p className="wilson-desc__text">
            The <strong>Ifa-Wilson Scheme</strong> uses Ifa/Orisa Logic — the Theory of Everything
            (ToE) Logic — to generalize Wilson's three-pillar model of science to <em>all fields
            of knowledge</em> and all dimensions of reality. Where Wilson identified Theory,
            Experiment, and Computation as the three legs of scientific inquiry, the Ifa-Wilson
            Scheme extends this to 8 Ifa Pillars (and their 8 Duals), as encoded in the
            axiomatic structure of the 256 Odu Ifa. Any scheme, discipline, or domain of
            knowledge — from art to law, from spirituality to engineering — can be systematized
            through this generalized Ifa framework.
          </p>
        </div>
      </div>
    </section>
  );
}

// ── IFA Academy ───────────────────────────────────────────────────────────────

function IfaAcademy() {
  return (
    <section className="academy section" id="academy">
      <div className="section__inner">
        <div className="section__header">
          <span className="section__eyebrow">IFA Academy</span>
          <h2 className="section__title">Ifa Schema — Course Structure</h2>
          <p className="section__sub">
            The foundational curriculum for studying IFABOK and IFA Mathematics courses through
            the Ifa Schema Framework. Each course contains Chapters 0–3; Chapter 3 (IfaProject)
            is always dedicated to project work.
          </p>
        </div>

        <div className="academy__grid">
          {IFA_ACADEMY_COURSES.map((c) => (
            <div key={c.num} className="academy-card" style={{ '--ac': c.color }}>
              <div className="academy-card__header">
                <div className="academy-card__num">Course {c.num}</div>
                {c.duration && <div className="academy-card__duration">{c.duration}</div>}
              </div>
              <h3 className="academy-card__title">{c.title}</h3>
              <ul className="academy-card__chapters">
                {c.chapters.map((ch, j) => (
                  <li key={j} className={`academy-chapter${ch.isProject ? ' academy-chapter--project' : ''}`}>
                    <span className="academy-chapter__dot" />
                    <span className="academy-chapter__label">{ch.title}</span>
                    {ch.isProject && <span className="academy-chapter__tag">Project</span>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <span className="footer__logo">◈ Ifa Schema</span>
          <p className="footer__tagline">
            The Schema for Everything (SchemoE) — Universal Meta-Schema for IFA Systems
          </p>
        </div>
        <nav className="footer__nav">
          <a href="#overview"   className="footer__link">Overview</a>
          <a href="#explorer"   className="footer__link">Explorer</a>
          <a href="#advanced"   className="footer__link">Advanced</a>
          <a href="#wilson"     className="footer__link">Wilson Scheme</a>
          <a href="#academy"    className="footer__link">Academy</a>
          <a href="#foundation" className="footer__link">Foundation</a>
          <a href="./lab/" className="footer__link" target="_blank" rel="noopener noreferrer">IfaSchema Lab ↗</a>
        </nav>
        <div className="footer__copy">
          © {new Date().getFullYear()} The IFA Internet · CENProject Innovations Limited
        </div>
      </div>
    </footer>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────

function App() {
  return (
    <div className="app">
      <Nav />
      <main>
        <Hero />
        <SchemaExplorer />
        <AdvancedTopics />
        <WilsonScheme />
        <IfaAcademy />
        <Stats />
        <Foundation />
      </main>
      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
