/* ─────────────────────────────────────────────────────────────────────────────
   IfaNote — The Notebook for Everything  (v2 — rich redesign)
   IFA = Ifa For All · The IFA Internet · CENProject
   ifainternet.org/ifa-notebook/
───────────────────────────────────────────────────────────────────────────── */

const { useState, useEffect, useRef } = React;

/* ── Data ──────────────────────────────────────────────────────────────────── */

const COMPONENTS = [
  {
    key: 'kernel',
    nameEn: 'IfaKernel',
    nameYo: 'Kórókin',
    icon: '⚙',
    variant: 'kernel',
    body: 'IfaKernel (Kórókin) is the computational heart of IfaNote — the Ifacomputational engine that processes every field of knowledge as unified, mathematical, and deeply connected. It executes IfaLang expressions, evaluates Odu-based axioms, resolves IfaGebra operations, and bridges all modern programming languages into the universal computational fabric of the IFA Internet.',
    demoText: 'IfaKernel · Kórókin',
  },
  {
    key: 'pen',
    nameEn: 'IfaPen',
    nameYo: 'Gégéfà',
    icon: '✍',
    variant: 'pen',
    body: 'A key IfaLang System and Interface, the IfaPen (Gégéfà) is the authoring and input layer of IfaNote — the intelligent, reactive cell editor that lets you write IfaLang, mathematics, poetry, science, philosophy, code, and non-scientific knowledge side-by-side in one unified environment. IfaPen is a Tool of the Ifa Editor and understands mixed-language input, rendering Odu marks, IfaGebra notation, and standard LaTeX/Markdown seamlessly in the same notebook.',
    demoText: 'IfaPen · Gégéfà',
  },
  {
    key: 'light',
    nameEn: 'IfaLight',
    nameYo: 'Ináfá',
    icon: '✦',
    variant: 'light',
    body: 'IfaLight (Ináfá) is the rendering and visualisation engine of IfaNote — converting every knowledge expression into illuminated, interactive output: mathematical plots, Odu mark diagrams, knowledge graphs, IFABit state maps, simulation outputs, and multimedia. IfaLight makes knowledge visible, animated, and deeply intuitive across all fields.',
    demoText: 'IfaLight · Ináfá',
  },
  {
    key: 'book',
    nameEn: 'IfaBook',
    nameYo: 'ÌwéÌfá',
    icon: '📖',
    variant: 'book',
    body: 'IfaBook (ÌwéÌfá) is the notebook storage, organisation, and publishing layer — where your knowledge lives, grows, and is shared with the world. IfaBook manages notebooks as plain-text files, enables reactive cell graphs (so changing one value updates all dependent outputs instantly), and integrates with the broader IFA Internet knowledge network — the IFABOK and the Theory of Everything (TOE). Dual Systems: the ORISA Body of Knowledge (ORISABOK) and the OrisaBook (ÌwéÒṣà).',
    demoText: 'IfaBook · Ìwéfá',
  },
];

// Each feature gets --fc (border color), --fc-glow, --fi (icon color)
const FEATURES = [
  {
    icon: '∞',   title: 'Every Field, One Environment',
    body: 'From quantum physics to Yoruba philosophy, economics to poetry — IfaNote is the first environment that treats every field of knowledge as deeply mathematical, unified, and computable.',
    fc: 'rgba(240,146,12,0.32)', fcg: 'rgba(240,146,12,0.06)', fi: '#f0920c',
  },
  {
    icon: 'Ψ',   title: 'IfaLang Kernel',
    body: "Write in IfaLang — the polymathic, mathematical language of Ifa & Orisa — or any modern programming language. IfaNote's kernel supports multilingual, polyglot computation in one shared namespace.",
    fc: 'rgba(59,158,255,0.32)', fcg: 'rgba(59,158,255,0.06)', fi: '#7dc3ff',
  },
  {
    icon: '⟳',   title: 'Reactive Computation',
    body: 'Like Marimo and Pluto.jl — but universal. Change any value, formula, or Odu parameter and every dependent cell updates instantly across all fields of knowledge.',
    fc: 'rgba(0,200,124,0.32)',  fcg: 'rgba(0,200,124,0.06)',  fi: '#38e8a0',
  },
  {
    icon: '◉',   title: 'Odu Ifa Cell Types',
    body: 'Native cell types for Odu marks (IFABit notation), IfaGebra expressions, cowrie-based probability, Àṣẹ flow diagrams, and IfaWave Function visualisations — unique to IfaNote.',
    fc: 'rgba(245,197,24,0.32)', fcg: 'rgba(245,197,24,0.06)', fi: '#f5c518',
  },
  {
    icon: '🌐',  title: 'IFABOK Integration',
    body: 'Every IfaNote notebook is semantically grounded in the IFA Body of Knowledge. Cross-reference Odu axioms, IFABOK theorems, and the 256 Odu Ifa across all notebooks.',
    fc: 'rgba(139,92,246,0.32)', fcg: 'rgba(139,92,246,0.06)', fi: '#a78bfa',
  },
  {
    icon: '⚡',  title: 'Browser-Native & Offline-First',
    body: 'Runs in your browser via WASM — no server required. IfaNote works offline, syncs when connected, and never loses your work. Plain-text .ifa files you own forever.',
    fc: 'rgba(20,212,244,0.32)', fcg: 'rgba(20,212,244,0.06)', fi: '#14d4f4',
  },
  {
    icon: '🎨',  title: 'Multimedia Output',
    body: 'Render knowledge as charts, animations, audio, video, 3D visualisations, Opon Ifa diagrams, and interactive simulations — first-class output types alongside text and code.',
    fc: 'rgba(233,73,138,0.32)', fcg: 'rgba(233,73,138,0.06)', fi: '#e9498a',
  },
  {
    icon: '🤝',  title: 'Open Source & Universal',
    body: 'Fully open-source, community-driven, and free for all. IfaNote belongs to thinkers, polymaths, and geniuses everywhere — from kids learning IfaLang to researchers unifying all fields.',
    fc: 'rgba(0,200,124,0.32)',  fcg: 'rgba(0,200,124,0.06)',  fi: '#00c87c',
  },
  {
    icon: '🏫',  title: 'Education for All Ages',
    body: 'Designed for kids, teens, and adults alike. Visual, interactive, and culturally rich — IfaNote makes the deepest mathematics and philosophy accessible to every age and background.',
    fc: 'rgba(240,146,12,0.32)', fcg: 'rgba(240,146,12,0.06)', fi: '#ffaa32',
  },
];

const FIELDS = [
  { label: 'Mathematics',           cat: 'math' },
  { label: 'Physics',               cat: 'sci'  },
  { label: 'Quantum Science',       cat: 'sci'  },
  { label: 'Chemistry',             cat: 'sci'  },
  { label: 'Biology',               cat: 'sci'  },
  { label: 'Astronomy',             cat: 'sci'  },
  { label: 'Medicine',              cat: 'sci'  },
  { label: 'Ifa Science',           cat: 'ifa'  },
  { label: 'IfaGebra',             cat: 'ifa'  },
  { label: 'Ebology',               cat: 'ifa'  },
  { label: 'Ifa Computing',         cat: 'ifa'  },
  { label: 'Ifa Physics',           cat: 'ifa'  },
  { label: 'Ifa Language (IfaLang)',cat: 'ifa'  },
  { label: 'Orisa Studies',         cat: 'ifa'  },
  { label: 'Philosophy',            cat: 'phil' },
  { label: 'Logic',                 cat: 'phil' },
  { label: 'Metaphysics',           cat: 'phil' },
  { label: 'Economics',             cat: 'hum'  },
  { label: 'History',               cat: 'hum'  },
  { label: 'Linguistics',           cat: 'hum'  },
  { label: 'Sociology',             cat: 'hum'  },
  { label: 'Psychology',            cat: 'hum'  },
  { label: 'Literature',            cat: 'art'  },
  { label: 'Music Theory',          cat: 'art'  },
  { label: 'Visual Art',            cat: 'art'  },
  { label: 'Computer Science',      cat: 'tech' },
  { label: 'Engineering',           cat: 'tech' },
  { label: 'AI & Machine Learning', cat: 'tech' },
  { label: 'Architecture',          cat: 'tech' },
  { label: 'Data Science',          cat: 'tech' },
];

const CAT_META = {
  ifa:  { label: 'Ifa & Orisa',  color: '#f0920c', css: '--gl-color:#f0920c' },
  math: { label: 'Mathematics',  color: '#ffaa32', css: '--gl-color:#ffaa32' },
  sci:  { label: 'Sciences',     color: '#3b9eff', css: '--gl-color:#3b9eff' },
  phil: { label: 'Philosophy',   color: '#a78bfa', css: '--gl-color:#a78bfa' },
  hum:  { label: 'Humanities',   color: '#38e8a0', css: '--gl-color:#38e8a0' },
  art:  { label: 'Arts',         color: '#e9498a', css: '--gl-color:#e9498a' },
  tech: { label: 'Technology',   color: '#f5c518', css: '--gl-color:#f5c518' },
};

const PHASES = [
  {
    num: 'Phase I',
    title: 'IfaNote Foundation — Static Notebook UI',
    body: 'Core notebook interface: IfaBook document model, IfaPen cell editor (markdown + code + Odu), IfaLight output renderer (text, math, Odu marks), and IfaKernel stub. Browser-native, offline-first, plain-text .ifa files.',
  },
  {
    num: 'Phase II',
    title: 'IfaKernel & IfaLang Engine',
    body: 'Live IfaLang kernel via WASM: reactive cell execution, IfaGebra evaluation, Odu axiom resolution, Python/JS polyglot support. Reactive graph — change one cell, update all dependents instantly.',
  },
  {
    num: 'Phase III',
    title: 'IfaLight Visualisation & Multimedia',
    body: 'Full rendering suite: interactive charts, Opon Ifa diagrams, IFABit state maps, IfaWave Function animations, audio output, 3D visualisations, and cowrie-based probability displays.',
  },
  {
    num: 'Phase IV',
    title: 'IFABOK Integration & IFA Internet Network',
    body: 'Semantic grounding in the full IFA Body of Knowledge: cross-notebook knowledge graph, Odu Ifa axiom library, IFABOK theorem browser, and integration with all IFA Internet platforms.',
  },
];

const AUDIENCE = [
  { sym: '🧠', label: 'Thinkers & Polymaths' },
  { sym: '🔬', label: 'Scientists & Researchers' },
  { sym: '📐', label: 'Mathematicians' },
  { sym: '💻', label: 'Programmers & Engineers' },
  { sym: '🎓', label: 'Students & Educators' },
  { sym: '🌍', label: 'Philosophers & Humanists' },
  { sym: '🎨', label: 'Artists & Creatives' },
  { sym: '👶', label: 'Kids & Teens Learning IfaLang' },
  { sym: '🏛', label: 'Ifa & Orisa Scholars' },
];

/* ── Hero Background Elements ───────────────────────────────────────────────── */
const FLOAT_ITEMS = [
  { sym:'⊕', top:'9%',  left:'5%'  },
  { sym:'∞', top:'13%', left:'90%' },
  { sym:'Ψ', top:'30%', left:'3%'  },
  { sym:'◎', top:'22%', left:'81%' },
  { sym:'⧖', top:'56%', left:'6%'  },
  { sym:'⟳', top:'68%', left:'87%' },
  { sym:'∿', top:'81%', left:'13%' },
  { sym:'✦', top:'44%', left:'93%' },
  { sym:'☯', top:'62%', left:'2%'  },
  { sym:'∂', top:'87%', left:'74%' },
  { sym:'☰', top:'38%', left:'0.5%'},
  { sym:'∑', top:'76%', left:'56%' },
];

function HeroBackground() {
  return (
    <>
      <div className="hero__bg" aria-hidden="true" />
      <div className="hero__opon" aria-hidden="true" />
      {/* Glowing orbs */}
      <div className="hero__orbs" aria-hidden="true">
        <div className="hero__orb hero__orb--1" />
        <div className="hero__orb hero__orb--2" />
        <div className="hero__orb hero__orb--3" />
        <div className="hero__orb hero__orb--4" />
      </div>
      {/* Opon Ifa animated rings */}
      <div className="hero__rings" aria-hidden="true">
        <div className="hero__ring hero__ring--spin"     />
        <div className="hero__ring hero__ring--1"        />
        <div className="hero__ring hero__ring--2"        />
        <div className="hero__ring hero__ring--spin-rev" />
        <div className="hero__ring hero__ring--3"        />
        <div className="hero__ring hero__ring--4"        />
      </div>
      {/* Floating symbols */}
      <div className="hero__floats" aria-hidden="true">
        {FLOAT_ITEMS.map((it, i) => (
          <span key={i} className="hero__float" style={{ top: it.top, left: it.left }}>
            {it.sym}
          </span>
        ))}
      </div>
    </>
  );
}

/* ── Notebook Window Preview ────────────────────────────────────────────────── */
function NotebookWindow() {
  const lines = ['1','2','3','4','5','6','7','8'];
  return (
    <div className="nb-window" aria-label="IfaNote notebook preview">
      {/* Title bar */}
      <div className="nb-window__titlebar">
        <div className="nb-window__dots">
          <div className="nb-window__dot nb-window__dot--red"    />
          <div className="nb-window__dot nb-window__dot--yellow" />
          <div className="nb-window__dot nb-window__dot--green"  />
        </div>
        <div className="nb-window__tabs">
          <div className="nb-window__tab nb-window__tab--active">✦ notebook.ifa</div>
          <div className="nb-window__tab">⚙ kernel.ifa</div>
          <div className="nb-window__tab">📖 ifabook/</div>
        </div>
      </div>
      {/* Body */}
      <div className="nb-window__body">
        <div className="nb-window__gutter" aria-hidden="true">
          {lines.map(n => <div className="nb-window__ln" key={n}>{n}</div>)}
        </div>
        <div className="nb-cells">
          {/* Odu cell */}
          <div className="nb-cell nb-cell--odu">
            <div className="nb-cell__header">
              <span className="nb-cell__header-dot" aria-hidden="true" />
              Odu Cell
            </div>
            <div className="nb-cell__code">
              ☰ Ogbè Méjì<br/>
              ⊕ Ẹbọ ∿ Àṣẹ<br/>
              ∞ ↔ IfaWave<br/>
              Ψ → manifest()
            </div>
          </div>
          {/* Math cell */}
          <div className="nb-cell nb-cell--math">
            <div className="nb-cell__header">
              <span className="nb-cell__header-dot" aria-hidden="true" />
              Math Cell
            </div>
            <div className="nb-cell__code">
              Ψ(x,t) = ∑ cₙφₙ<br/>
              W(Ẹbọ) {'>'} W₀<br/>
              IFABit ⊃ Qubit<br/>
              ∇² + ∞ = TOE
            </div>
          </div>
          {/* Code cell */}
          <div className="nb-cell nb-cell--code">
            <div className="nb-cell__header">
              <span className="nb-cell__header-dot" aria-hidden="true" />
              IfaLang Cell
            </div>
            <div className="nb-cell__code">
              odu = Ogbe.meji()<br/>
              ebo.exchange(ase)<br/>
              field = ∞.map(<br/>
              {'  '} → manifest()
            </div>
          </div>
          {/* Output */}
          <div className="nb-cell nb-cell--out">
            <div className="nb-cell__header">
              <span className="nb-cell__header-dot" aria-hidden="true" />
              IfaLight Output
            </div>
            <div className="nb-cell__code">
              ◉ Wave rendered<br/>
              ✦ Odu visualised<br/>
              ⟳ Reactive live<br/>
              ∞ TOE grounded
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Navbar ─────────────────────────────────────────────────────────────────── */
const NAV_LINKS = [
  { href: '#about',        label: 'About' },
  { href: '#components',   label: 'Components' },
  { href: './env/', label: 'Open IfaNote', ext: true },
  { href: '#features',     label: 'Features' },
  { href: '#fields',       label: 'Fields' },
  { href: '#roadmap',      label: 'Roadmap' },
  { href: 'https://ifainternet.org', label: 'IFA Internet', ext: true },
];

function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="navbar__brand">
        <span className="navbar__logo">IfaNote</span>
        <span className="navbar__badge">IFABOK</span>
      </div>
      <ul className="navbar__links">
        {NAV_LINKS.map(l => (
          <li key={l.href}>
            <a href={l.href} {...(l.ext ? { target:'_blank', rel:'noopener' } : {})}>{l.label}</a>
          </li>
        ))}
      </ul>
      <div className="navbar__right">
        <a className="navbar__cta" href="#roadmap">Get Involved</a>
        <button
          className={'navbar__burger' + (open ? ' navbar__burger--open' : '')}
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle navigation"
          aria-expanded={open}>
          <span /><span /><span />
        </button>
      </div>
      {open && (
        <div className="navbar__mobile-menu">
          {NAV_LINKS.map(l => (
            <a key={l.href} href={l.href} className="navbar__mobile-link"
              onClick={() => setOpen(false)}
              {...(l.ext ? { target:'_blank', rel:'noopener' } : {})}>
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

/* ── Hero ───────────────────────────────────────────────────────────────────── */
function Hero({ onWatchIntro }) {
  return (
    <section className="hero" aria-label="IfaNote introduction">
      <HeroBackground />

      <div className="hero__content">
        <div className="hero__eyebrow">
          <span className="hero__eyebrow-dot" aria-hidden="true" />
          Open-Source · The IFA Internet · IFABOK
        </div>

        <h1 className="hero__title">
          <span className="hero__title-ifa">IfaNote</span>
          {' '}
          <span className="hero__title-note">for Everything</span>
        </h1>

        <p className="hero__tagline">
          IFA Note — <strong>I</strong>fa <strong>F</strong>or <strong>A</strong>ll Note
        </p>

        <p style={{ fontSize:'0.8rem', letterSpacing:'0.06em', color:'#c4953a', margin:'-10px 0 20px', fontStyle:'italic', opacity:0.82 }}>
          ✦ Òṣùṣù Odù (Òṣùṣodù) — Ẹ̀rọfá ✦
        </p>

        <p className="hero__motto">
          <span className="m-think">Think Everything.</span>{' '}
          <span className="m-code">Code Everything.</span>{' '}
          <span className="m-know">Know Everything.</span>
        </p>

        <p className="hero__sub">
          The open-source Consciousness Notebook and Ifacomputational Environment for study,
          modelling, simulation, and rendering <strong>all fields of knowledge</strong> in
          the mathematical, interdisciplinary, polymathic Language of Ifa &amp; Orisa.
          Where every field becomes deeply mathematical, unified, and universal in nature.
        </p>

        <div className="hero__actions">
          <a className="btn-primary"   href="#components">Explore IfaNote</a>
          <button className="btn-watch-intro" onClick={onWatchIntro}>
            <span className="play-ring" aria-hidden="true">▶</span>
            Watch Intro
          </button>
          <a className="btn-secondary" href="#roadmap">View Roadmap</a>
          <a className="btn-ghost"     href="https://ifainternet.org" target="_blank" rel="noopener">IFA Internet</a>
        </div>

        <div className="hero__names" aria-label="Also known as">
          {['IfaNoteBook','IFA Note','Consciousness Notebook','ToE NoteBook','ToE Note',
            'ToENote','IFABOK Notebook','The Notebook for Everything (NotoE)','Energy-Based Notebook',
            'Orisa Note','OrisaNote','Orisa NoteBook','OrisaNoteBook',
            'IfaPad','Ifa Pad','Orisa Pad','OrisaPad','ToE Pad','Ifa Tablet','IfaTab','Orisa Tablet','OrisaTab',
            'Ifa Notepad','Orisa Notepad','IFABOK Journal','IFA Internet Journal',
          ].map(n => (
            <span className="hero__name-pill" key={n}>{n}</span>
          ))}
        </div>
      </div>

      <NotebookWindow />
    </section>
  );
}

/* ── About Section ──────────────────────────────────────────────────────────── */
function AboutSection() {
  const ABOUT_CARDS = [
    {
      icon: '⚛', title: 'Ifacomputational Engine', accent: 'var(--amber)',
      body: 'IfaNote is more than a notebook — it is an Ifacomputer. A computing environment that treats every field of knowledge as a computable, mathematical, and deeply unified system rooted in the axiomatic structure of the 256 Odu Ifa.',
    },
    {
      icon: '🌐', title: 'The IFABOK Environment', accent: 'var(--electric)',
      body: 'IfaNote is the native environment of the IFABOK — the IFA Body of Knowledge — and the Theory of Everything (TOE). Every notebook you write is a contribution to the universal knowledge graph of the IFA Internet.',
    },
    {
      icon: '📚', title: 'Polymathic by Design', accent: 'var(--jade)',
      body: 'Most tools specialise. IfaNote universalises. Write physics equations beside Yoruba proverbs, run simulations alongside Odu divination logic, connect economics to quantum field theory — all in one reactive notebook.',
    },
    {
      icon: '🧒', title: 'Built for Every Mind', accent: 'var(--violet-lt)',
      body: 'From a child discovering IfaLang for the first time, to a researcher unifying quantum mechanics and Ifa metaphysics — IfaNote grows with you, using interactive visuals, guided cells, and multilingual support at every level.',
    },
  ];

  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="grad-divider" style={{ marginBottom:'72px' }} />

      {/* Giant IFA letters */}
      <p className="section__eyebrow">What does IFA stand for?</p>
      <div className="ifa-big" aria-label="IFA = Ifa For All">
        <span className="ifa-big__letter ifa-big__letter--i">I</span>
        <span className="ifa-big__letter ifa-big__letter--f">F</span>
        <span className="ifa-big__letter ifa-big__letter--a">A</span>
      </div>

      <div className="ifa-cards">
        {[
          { v:'i', letter:'I', word:'Ifa',
            desc:'The axiomatic, polymathic knowledge system of the Yoruba — a mathematical, spiritual, and scientific framework encoding the Theory of Everything in 256 Odu Ifa.' },
          { v:'f', letter:'F', word:'For',
            desc:'For everyone. For every field. For every age. IFA Note is universal — built for thinkers, polymaths, scientists, artists, kids, and geniuses across all disciplines.' },
          { v:'a', letter:'A', word:'All',
            desc:'All fields of knowledge. All human languages. All dimensions of reality. Science, philosophy, arts, technology, Orisa studies — all unified in one notebook.' },
        ].map(item => (
          <div className={`ifa-card ifa-card--${item.v}`} key={item.v}>
            <div className="ifa-card__letter">{item.letter}</div>
            <div className="ifa-card__word">{item.word}</div>
            <div className="ifa-card__desc">{item.desc}</div>
          </div>
        ))}
      </div>

      <p className="section__sub" style={{ marginBottom:'36px' }}>
        IfaNote is the Unified &amp; Integrated Notebook Environment of the IFA Internet —
        the living IFABOK (IFA Body of Knowledge) and Theory of Everything (TOE).
        Every field becomes mathematical. Every mind becomes a polymath.
      </p>

      <div className="about-grid">
        {ABOUT_CARDS.map(card => (
          <div className="about-card" key={card.title} style={{ '--accent': card.accent }}>
            <span className="about-card__icon" aria-hidden="true">{card.icon}</span>
            <h3 className="about-card__title">{card.title}</h3>
            <p className="about-card__body">{card.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── IfaShell & IfaKernel Section ──────────────────────────────────────────── */
function IfaShellKernelSection() {
  const [tab, setTab] = useState('natural');

  useEffect(() => {
    if (document.getElementById('isk-kf')) return;
    const s = document.createElement('style');
    s.id = 'isk-kf';
    s.textContent = `
      @keyframes isk-ring-expand {
        0%   { transform: scale(0.5); opacity: 0.78; }
        100% { transform: scale(2.8); opacity: 0; }
      }
      @keyframes isk-core-pulse {
        0%, 100% { transform: scale(1);    opacity: 0.95; }
        50%       { transform: scale(1.32); opacity: 0.58; }
      }
      @keyframes isk-shell-breathe {
        0%, 100% { opacity: 1; }
        50%       { opacity: 0.70; }
      }
      @keyframes isk-outer-spin {
        from { transform: rotate(0deg); }
        to   { transform: rotate(360deg); }
      }
      @keyframes isk-float-in {
        from { opacity: 0; transform: translateY(10px); }
        to   { opacity: 1; transform: translateY(0); }
      }
    `;
    document.head.appendChild(s);
  }, []);

  const isNatural = tab === 'natural';
  const isShell   = tab === 'shell';
  const isKernel  = tab === 'kernel';
  const shellColor  = isShell  ? '#14d4f4' : '#c4853a';
  const kernelColor = isKernel ? '#f0920c' : '#f5c518';

  const TABS = [
    { key:'natural', label:'🌿 Ìkin Ifá',    color:'#c4853a' },
    { key:'shell',   label:'⬡ IfaShell',     color:'#14d4f4' },
    { key:'kernel',  label:'⚙ IfaKernel',    color:'#f0920c' },
  ];

  return (
    <section id="ifa-shell-kernel" className="section section--wide"
             aria-labelledby="isk-title">
      <div className="grad-divider" style={{ marginBottom:'72px' }} />

      <p className="section__eyebrow">Ifa Architecture of Natural Computing</p>
      <h2 className="section__title" id="isk-title">IfaShell &amp; IfaKernel</h2>
      <p className="section__sub" style={{ maxWidth:'680px', margin:'0 auto 52px' }}>
        In the Natural Computing of Odu Ifa, Ọrúnmìlà encoded the Architecture of the Ikin Ifá —
        Ìkara (Shell) wrapping Kórókin (the Seed or Kernel) — a computing Principle at the heart of every
        modern operating system, rediscovered millennia later.
      </p>

      <div style={{
        display:'flex', gap:'52px', alignItems:'flex-start',
        flexWrap:'wrap', justifyContent:'center', maxWidth:'1000px', margin:'0 auto'
      }}>

        {/* ── Left: Animated Ikin Ifá SVG ─────────────────────────────────────── */}
        <div style={{ flex:'0 0 auto', display:'flex', flexDirection:'column', alignItems:'center', gap:'18px' }}>

          <svg viewBox="0 0 160 210" width="188" height="248" overflow="visible"
               aria-label="Ìkara (Shell) wrapping Kórókin (Seed) — Ikin Ifa cross-section"
               style={{ filter:`drop-shadow(0 0 22px ${kernelColor}44)` }}>
            <defs>
              <radialGradient id="isk-shell-g" cx="36%" cy="28%">
                <stop offset="0%"   stopColor="#7a4a1a"/>
                <stop offset="55%"  stopColor="#3c1a06"/>
                <stop offset="100%" stopColor="#100500"/>
              </radialGradient>
              <radialGradient id="isk-seed-g" cx="40%" cy="32%">
                <stop offset="0%"   stopColor={kernelColor}/>
                <stop offset="65%"  stopColor="#8a6000"/>
                <stop offset="100%" stopColor="#3a2000"/>
              </radialGradient>
              <radialGradient id="isk-glow-g" cx="50%" cy="50%">
                <stop offset="0%"   stopColor={kernelColor} stopOpacity="0.88"/>
                <stop offset="100%" stopColor={kernelColor} stopOpacity="0"/>
              </radialGradient>
              <filter id="isk-blur4"><feGaussianBlur stdDeviation="4"/></filter>
              <filter id="isk-blur2"><feGaussianBlur stdDeviation="1.8"/></filter>
            </defs>

            {/* Spinning outer orbit */}
            <ellipse cx="80" cy="105" rx="76" ry="98"
              fill="none" stroke={shellColor} strokeWidth="0.5"
              strokeDasharray="5 5" opacity="0.18"
              style={{ transformBox:'fill-box', transformOrigin:'center',
                       animation:'isk-outer-spin 18s linear infinite' }}/>

            {/* ── SHELL (Ìkara) ──────────────────────────────────────────────── */}
            <ellipse cx="80" cy="105" rx="56" ry="78"
              fill="url(#isk-shell-g)"
              style={isShell ? { transformBox:'fill-box', transformOrigin:'center',
                animation:'isk-shell-breathe 2.2s ease-in-out infinite' } : {}}/>
            {/* Highlight */}
            <ellipse cx="62" cy="74" rx="10" ry="20"
              fill="rgba(180,110,50,0.16)" transform="rotate(-14 62 74)"/>
            {/* Grain lines */}
            <line x1="67" y1="32" x2="65" y2="174" stroke="rgba(0,0,0,0.24)" strokeWidth="0.7"/>
            <line x1="80" y1="30" x2="80" y2="176" stroke="rgba(0,0,0,0.16)" strokeWidth="0.5"/>
            <line x1="93" y1="32" x2="95" y2="174" stroke="rgba(0,0,0,0.24)" strokeWidth="0.7"/>

            {/* Inner void */}
            <ellipse cx="80" cy="105" rx="40" ry="56" fill="#080300" opacity="0.75"/>

            {/* ── SEED / KÓRÓKIN ─────────────────────────────────────────────── */}
            {/* Glow halo */}
            <ellipse cx="80" cy="105" rx="28" ry="40"
              fill="url(#isk-glow-g)" filter="url(#isk-blur4)" opacity="0.76"/>
            {/* Seed body */}
            <ellipse cx="80" cy="105" rx="22" ry="32"
              fill="url(#isk-seed-g)"
              style={isKernel ? { transformBox:'fill-box', transformOrigin:'center',
                animation:'isk-shell-breathe 1.7s ease-in-out infinite' } : {}}/>
            {/* Seed highlight */}
            <ellipse cx="72" cy="90" rx="5" ry="9"
              fill="rgba(255,220,80,0.22)" transform="rotate(-8 72 90)"/>

            {/* Pulsing rings from core */}
            {[0, 0.8, 1.6].map((delay, i) => (
              <ellipse key={i} cx="80" cy="105" rx="18" ry="26"
                fill="none" stroke={kernelColor}
                strokeWidth={1.2 - i * 0.3} opacity="0.72"
                style={{ transformBox:'fill-box', transformOrigin:'center',
                         animation:`isk-ring-expand 2.5s ease-out ${delay}s infinite` }}/>
            ))}

            {/* Core pulse dot */}
            <circle cx="80" cy="105" r="5.5"
              fill={kernelColor} opacity="0.92" filter="url(#isk-blur2)"
              style={{ transformBox:'fill-box', transformOrigin:'center',
                       animation:'isk-core-pulse 2s ease-in-out infinite' }}/>
            <circle cx="80" cy="105" r="2.4" fill="white" opacity="0.78"/>

            {/* Ìkin eyes at tip */}
            <circle cx="80" cy="170" r="4.2" fill="#060201" stroke="rgba(150,80,20,0.45)" strokeWidth="0.9"/>
            <circle cx="70" cy="163" r="3.4" fill="#060201" stroke="rgba(150,80,20,0.40)" strokeWidth="0.7"/>
            <circle cx="90" cy="163" r="3.4" fill="#060201" stroke="rgba(150,80,20,0.40)" strokeWidth="0.7"/>

            {/* ── Labels ─────────────────────────────────────────────────────── */}
            {/* Shell bracket — left */}
            <line x1="21" y1="68"  x2="23" y2="68"  stroke={shellColor} strokeWidth="1"   opacity="0.6"/>
            <line x1="23" y1="68"  x2="23" y2="112" stroke={shellColor} strokeWidth="0.7" opacity="0.38"/>
            <line x1="21" y1="112" x2="23" y2="112" stroke={shellColor} strokeWidth="1"   opacity="0.6"/>
            <text x="19" y="93" fontSize="7.5" fill={shellColor} opacity="0.88"
              fontStyle="italic" textAnchor="end">
              {isShell ? 'IfaShell' : 'Ìkara'}
            </text>

            {/* Kernel label — below seed */}
            <line x1="80" y1="138" x2="80" y2="147" stroke={kernelColor} strokeWidth="0.8" opacity="0.55"/>
            <text x="80" y="157" fontSize="7.5" fill={kernelColor} opacity="0.88"
              fontStyle="italic" textAnchor="middle">
              {isKernel ? 'IfaKernel' : 'Kórókin'}
            </text>

          </svg>

          <div style={{ textAlign:'center' }}>
            <div style={{ fontSize:'0.76rem', color:'#c4853a', letterSpacing:'0.05em', marginBottom:'3px' }}>
              Ikin Ifá — Cross-Section
            </div>
            <div style={{ fontSize:'0.68rem', color:'#505869' }}>
              Ìkara (Shell) · Kórókin (Seed)
            </div>
          </div>
        </div>

        {/* ── Right: Tabs + Content ─────────────────────────────────────────────── */}
        <div style={{ flex:'1 1 320px', minWidth:'280px' }}>

          {/* Tab buttons */}
          <div style={{ display:'flex', gap:'8px', marginBottom:'26px', flexWrap:'wrap' }}>
            {TABS.map(t => (
              <button key={t.key}
                onClick={() => setTab(t.key)}
                style={{
                  padding:'7px 16px', borderRadius:'22px', border:'1px solid',
                  fontSize:'0.74rem', cursor:'pointer', letterSpacing:'0.03em',
                  fontFamily:'inherit', transition:'all 0.22s',
                  borderColor: tab === t.key ? t.color : 'rgba(255,255,255,0.1)',
                  background:  tab === t.key ? `${t.color}1a` : 'transparent',
                  color:       tab === t.key ? t.color : '#6e7e9a',
                  fontWeight:  tab === t.key ? 600 : 400,
                }}>
                {t.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div key={tab} style={{ animation:'isk-float-in 0.28s ease both' }}>

            {isNatural && (
              <div>
                <h3 style={{ color:'#c4853a', fontSize:'1.05rem', marginBottom:'14px',
                             fontWeight:600, lineHeight:1.4 }}>
                  Ìkara &amp; Kórókin — The Ifa Architecture
                </h3>
                <p style={{ color:'#8892aa', lineHeight:1.78, fontSize:'0.91rem', marginBottom:'13px' }}>
                  In the Natural Computing of Odu Ifa, <strong style={{color:'#e0c080'}}>Ìkara</strong> —
                  the Shell of Ikin Ifá, the Ifa Palm Nut — wraps around{' '}
                  <strong style={{color:'#f5c518'}}>Kórókin</strong> (the Seed/Kernel). This ancient Ifa
                  Architecture, an invention of Ọrúnmìlà, encodes the foundational computing Principle
                  that the modern world rediscovered millennia later.
                </p>
                <p style={{ color:'#8892aa', lineHeight:1.78, fontSize:'0.91rem', marginBottom:'13px' }}>
                  In modern computing, the core of the operating system is called the{' '}
                  <strong style={{color:'#f0920c'}}>kernel</strong> because it acts as the "seed" —
                  the essential innermost core from which the rest of the system grows. A computer{' '}
                  <strong style={{color:'#14d4f4'}}>shell</strong> is so named because it wraps around
                  the kernel — exactly as Ìkara wraps Kórókin.
                </p>
                <div style={{ padding:'14px 16px', background:'rgba(196,133,58,0.07)',
                              borderLeft:'2px solid rgba(196,133,58,0.38)', borderRadius:'5px' }}>
                  <div style={{ fontSize:'0.71rem', color:'#c4953a',
                                letterSpacing:'0.07em', marginBottom:'10px' }}>
                    CORE SUBJECTS IN IFA-BASED COMPUTING
                  </div>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:'7px' }}>
                    {[
                      { label:'IfaShell Computing',    c:'#14d4f4' },
                      { label:'OrisaShell Computing',  c:'#14d4f4' },
                      { label:'IfaKernel Computing',   c:'#f0920c' },
                      { label:'OrisaKernel Computing', c:'#f0920c' },
                    ].map(s => (
                      <span key={s.label} style={{
                        padding:'4px 12px', borderRadius:'14px', fontSize:'0.72rem',
                        background:`${s.c}12`, border:`1px solid ${s.c}28`, color:s.c,
                      }}>{s.label}</span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {isShell && (
              <div>
                <h3 style={{ color:'#14d4f4', fontSize:'1.05rem', marginBottom:'14px',
                             fontWeight:600, lineHeight:1.4 }}>
                  IfaShell — Ìkara in Modern Computing
                </h3>
                <p style={{ color:'#8892aa', lineHeight:1.78, fontSize:'0.91rem', marginBottom:'13px' }}>
                  A computer <strong style={{color:'#14d4f4'}}>shell</strong> is called a "shell" because
                  it acts as an outer layer that wraps around the kernel — exactly as{' '}
                  <strong style={{color:'#e0c080'}}>Ìkara</strong>, the Shell of Ikin Ifá, wraps{' '}
                  <strong style={{color:'#f5c518'}}>Kórókin</strong> (the Seed). This is the Ifa
                  Architecture of Ọrúnmìlà, rediscovered by modern computer science.
                </p>
                <p style={{ color:'#8892aa', lineHeight:1.78, fontSize:'0.91rem', marginBottom:'16px' }}>
                  <strong style={{color:'#14d4f4'}}>IfaShell Computing</strong> and{' '}
                  <strong style={{color:'#14d4f4'}}>OrisaShell Computing</strong> study this shell layer —
                  the user-facing interface that wraps the IfaKernel — grounded in the Ìkara principle
                  of Odu Ifa.
                </p>
                {[
                  { ifa:'Ìkara — Shell of Ikin Ifá',   mod:'OS Shell / IfaShell'      },
                  { ifa:'Outer protective layer',        mod:'User-facing interface'    },
                  { ifa:'Wraps the Kórókin (Seed)',      mod:'Wraps the OS Kernel'      },
                  { ifa:'Mediates Ìkin ↔ world',         mod:'Mediates user ↔ kernel'   },
                ].map(row => (
                  <div key={row.ifa} style={{
                    display:'flex', gap:'10px', alignItems:'center',
                    marginBottom:'7px', fontSize:'0.79rem',
                    padding:'5px 0', borderBottom:'1px solid rgba(255,255,255,0.04)',
                  }}>
                    <span style={{ color:'#c4853a', flex:'1' }}>{row.ifa}</span>
                    <span style={{ color:'rgba(20,212,244,0.38)', fontSize:'0.9em' }}>→</span>
                    <span style={{ color:'#14d4f4', flex:'1' }}>{row.mod}</span>
                  </div>
                ))}
              </div>
            )}

            {isKernel && (
              <div>
                <h3 style={{ color:'#f0920c', fontSize:'1.05rem', marginBottom:'14px',
                             fontWeight:600, lineHeight:1.4 }}>
                  IfaKernel — Kórókin in Modern Computing
                </h3>
                <p style={{ color:'#8892aa', lineHeight:1.78, fontSize:'0.91rem', marginBottom:'13px' }}>
                  In modern computing, the <strong style={{color:'#f0920c'}}>kernel</strong> is the
                  innermost core of the operating system — named after the seed because it is the
                  essential foundation from which all system processes grow. This directly mirrors{' '}
                  <strong style={{color:'#f5c518'}}>Kórókin</strong>, the Seed of Ikin Ifá — the
                  Ifa Architecture of Ọrúnmìlà.
                </p>
                <p style={{ color:'#8892aa', lineHeight:1.78, fontSize:'0.91rem', marginBottom:'16px' }}>
                  <strong style={{color:'#f0920c'}}>IfaKernel Computing</strong> and{' '}
                  <strong style={{color:'#f0920c'}}>OrisaKernel Computing</strong> study the kernel
                  layer — the Kórókin — the computational core from which all Ifa-based systems grow
                  and operate.
                </p>
                {[
                  { ifa:"Kórókin — Seed of Ikin Ifá",  mod:'OS Kernel / IfaKernel'       },
                  { ifa:'Innermost life-core',           mod:'Core of the OS'              },
                  { ifa:"Source of Ìkin's growth",       mod:'Foundation of all processes' },
                  { ifa:'Wrapped by Ìkara (Shell)',       mod:'Wrapped by the OS Shell'     },
                ].map(row => (
                  <div key={row.ifa} style={{
                    display:'flex', gap:'10px', alignItems:'center',
                    marginBottom:'7px', fontSize:'0.79rem',
                    padding:'5px 0', borderBottom:'1px solid rgba(255,255,255,0.04)',
                  }}>
                    <span style={{ color:'#f5c518', flex:'1' }}>{row.ifa}</span>
                    <span style={{ color:'rgba(240,146,12,0.38)', fontSize:'0.9em' }}>→</span>
                    <span style={{ color:'#f0920c', flex:'1' }}>{row.mod}</span>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}

/* ── IfaKernel (Kórókin) Demo ──────────────────────────────────────────────── */
function IfaKernelDemo() {
  const [mode, setMode] = useState('bridge');

  const isExec    = mode === 'execute';
  const isBridge  = mode === 'bridge';
  const isConnect = mode === 'connect';
  const modeColor = isExec ? '#f0920c' : isBridge ? '#3b9eff' : '#00c87c';

  const EXEC_LINES = [
    { t: 'in',  s: '›', txt: 'odu = Ogbe.meji()' },
    { t: 'in',  s: '›', txt: 'kernel.eval(ase, field)' },
    { t: 'in',  s: '›', txt: 'bridge(physical, spirit)' },
    { t: 'out', s: '►', txt: 'Unified field resolved ✓' },
  ];

  const BRIDGE_ROWS = [
    { left: 'Physical (Àiyé)',    right: 'Non-Physical (Ọ̀run)' },
    { left: "Nature's Hardware",  right: "Nature's Software"     },
    { left: 'OS Hardware Layer',  right: 'OS Software Layer'     },
  ];

  const CONNECT_FIELDS = ['Mathematics','Ifa Science','Physics','Economics','Philosophy','Technology'];

  // 6 nodes on outer ring (rx=48, ry=70) starting from top (-90°)
  const NODES = [0,1,2,3,4,5].map(i => {
    const a = (i * 60 - 90) * Math.PI / 180;
    return { x: +(55 + 48 * Math.cos(a)).toFixed(1), y: +(85 + 70 * Math.sin(a)).toFixed(1) };
  });

  return (
    <div className="ikernel-demo">

      {/* ── Left: Ìkin Ifá SVG ────────────────────────────────────────────────── */}
      <div className="ikernel-demo__left">
        <svg className="ikernel-svg" viewBox="0 0 110 170" width="82" height="123"
          aria-label="IfaKernel — Kórókin (Ìkin Ifá)">
          <defs>
            <radialGradient id="iknBody" cx="36%" cy="28%">
              <stop offset="0%"   stopColor="#6b3a12"/>
              <stop offset="50%"  stopColor="#3a1a06"/>
              <stop offset="100%" stopColor="#0e0603"/>
            </radialGradient>
            <radialGradient id="iknGlow" cx="50%" cy="50%">
              <stop offset="0%"  stopColor={modeColor} stopOpacity="0.72"/>
              <stop offset="100%" stopColor={modeColor} stopOpacity="0"/>
            </radialGradient>
            <filter id="iknBlur2"><feGaussianBlur stdDeviation="2.8"/></filter>
            <filter id="iknBlur1"><feGaussianBlur stdDeviation="1.3"/></filter>
          </defs>

          {/* Outer spinning ring */}
          <ellipse cx="55" cy="85" rx="51" ry="78"
            fill="none" stroke={modeColor} strokeWidth="0.75"
            strokeDasharray="5 4" opacity="0.35"
            className="ikernel-ring--outer"/>

          {/* Mid counter-spinning ring */}
          <ellipse cx="55" cy="85" rx="38" ry="60"
            fill="none" stroke={modeColor} strokeWidth="0.55"
            strokeDasharray="3 5" opacity="0.22"
            className="ikernel-ring--mid"/>

          {/* Glow halo behind nut */}
          <ellipse cx="55" cy="85" rx="28" ry="46"
            fill="url(#iknGlow)" filter="url(#iknBlur2)" opacity="0.80"/>

          {/* Nut body (Ìkin Ifá) */}
          <ellipse cx="55" cy="85" rx="23" ry="42" fill="url(#iknBody)"/>

          {/* Surface highlight */}
          <ellipse cx="46" cy="64" rx="6" ry="12"
            fill="rgba(160,80,20,0.20)" transform="rotate(-10 46 64)"/>

          {/* Grain lines */}
          <line x1="44" y1="46" x2="43" y2="122" stroke="rgba(0,0,0,0.28)" strokeWidth="0.5"/>
          <line x1="55" y1="44" x2="55" y2="124" stroke="rgba(0,0,0,0.18)" strokeWidth="0.4"/>
          <line x1="66" y1="46" x2="67" y2="122" stroke="rgba(0,0,0,0.28)" strokeWidth="0.5"/>

          {/* ── "Eyes" (Ìkin Ifá characteristic holes) at bottom tip */}
          <circle cx="55" cy="118" r="3.2" fill="#090402" stroke="rgba(160,80,20,0.45)" strokeWidth="0.8"/>
          <circle cx="47" cy="113" r="2.7" fill="#090402" stroke="rgba(160,80,20,0.40)" strokeWidth="0.7"/>
          <circle cx="63" cy="113" r="2.7" fill="#090402" stroke="rgba(160,80,20,0.40)" strokeWidth="0.7"/>
          <circle cx="55" cy="107" r="2.0" fill="#090402" stroke="rgba(160,80,20,0.35)" strokeWidth="0.6"/>

          {/* Kernel core glow rings */}
          <ellipse cx="55" cy="80" rx="9" ry="13"
            fill="none" stroke={modeColor} strokeWidth="0.7" opacity="0.35"/>
          <ellipse cx="55" cy="80" rx="5" ry="8"
            fill={modeColor} opacity="0.12"/>

          {/* Core pulse dot */}
          <circle cx="55" cy="80" r="3.2" fill={modeColor} opacity="0.88"
            filter="url(#iknBlur1)" className="ikernel-core-pulse"/>

          {/* EXECUTE mode: 4 converging rays */}
          {isExec && [0,90,180,270].map((deg, i) => {
            const a = deg * Math.PI / 180;
            return (
              <line key={i}
                x1={+(55 + 50 * Math.cos(a)).toFixed(1)} y1={+(85 + 76 * Math.sin(a)).toFixed(1)}
                x2={+(55 + 25 * Math.cos(a)).toFixed(1)} y2={+(85 + 43 * Math.sin(a)).toFixed(1)}
                stroke={modeColor} strokeWidth="0.8" opacity="0.42"
                strokeDasharray="2 3" className="ikernel-exec-ray"/>
            );
          })}

          {/* BRIDGE mode: horizontal double-arrow through centre */}
          {isBridge && (
            <g className="ikernel-bridge-ray">
              <line x1="4"  y1="80" x2="32"  y2="80"
                stroke={modeColor} strokeWidth="1.0" opacity="0.62" strokeDasharray="3 2"/>
              <line x1="78" y1="80" x2="106" y2="80"
                stroke={modeColor} strokeWidth="1.0" opacity="0.62" strokeDasharray="3 2"/>
              <polygon points="32,77 32,83 39,80" fill={modeColor} opacity="0.62"/>
              <polygon points="78,77 78,83 71,80" fill={modeColor} opacity="0.62"/>
            </g>
          )}

          {/* CONNECT mode: 6 field-nodes on outer ring */}
          {isConnect && NODES.map((n, i) => (
            <g key={i}>
              <line x1={n.x} y1={n.y} x2="55" y2="80"
                stroke={modeColor} strokeWidth="0.5" opacity="0.28" strokeDasharray="2 2"/>
              <circle cx={n.x} cy={n.y} r="4.2" fill={modeColor} opacity="0.72"
                className="ikernel-connect-dot"/>
            </g>
          ))}
        </svg>

        <div className="ikernel-demo__label">
          <div className="ikernel-demo__en">IfaKernel</div>
          <div className="ikernel-demo__yo">Kórókin</div>
          <div className="ikernel-demo__src">Ìkin Ifá</div>
        </div>
      </div>

      {/* ── Right: Interactive panel ───────────────────────────────────────────── */}
      <div className="ikernel-demo__right">

        {/* Mode tabs */}
        <div className="ikernel-demo__modes">
          {[
            { key: 'execute', sym: 'Ψ', lbl: 'Execute', clr: '#f0920c' },
            { key: 'bridge',  sym: '⟺', lbl: 'Bridge',  clr: '#3b9eff' },
            { key: 'connect', sym: '⟳', lbl: 'Connect', clr: '#00c87c' },
          ].map(m => (
            <button key={m.key}
              className={'ikernel-mode-btn' + (mode === m.key ? ' ikernel-mode-btn--active' : '')}
              style={{ '--km-color': m.clr }}
              onClick={() => setMode(m.key)}>
              <span className="ikernel-mode-btn__sym">{m.sym}</span>
              <span className="ikernel-mode-btn__lbl">{m.lbl}</span>
            </button>
          ))}
        </div>

        {/* Display pad — key={mode} replays animations on switch */}
        <div className="ikernel-demo__pad" key={mode} style={{ '--km-color': modeColor }}>
          <div className="ikernel-pad__hdr">
            <span className="ikernel-pad__dot"
              style={{ background: modeColor, boxShadow: `0 0 6px ${modeColor}` }}/>
            {isExec    && 'Execute — IfaLang Kernel Processing'}
            {isBridge  && 'Bridge — Physical ↔ Non-Physical'}
            {isConnect && 'Connect — All Fields as One'}
          </div>

          <div className="ikernel-pad__body">

            {/* EXECUTE panel */}
            {isExec && (
              <div className="ikernel-exec">
                {EXEC_LINES.map((l, i) => (
                  <div key={i} className={'ikernel-exec__line ikernel-exec__line--' + l.t}
                    style={{ animationDelay: `${i * 0.18}s` }}>
                    <span className="ikernel-exec__prompt">{l.s}</span>
                    <span className="ikernel-exec__txt">{l.txt}</span>
                    {i === EXEC_LINES.length - 1 && <span className="ikernel-exec__ok">✓</span>}
                  </div>
                ))}
                <div className="ikernel-exec__badge-row" style={{ animationDelay: '0.76s' }}>
                  <span className="ikernel-cbadge ikernel-cbadge--ifa">IfaLang</span>
                  <span className="ikernel-cbadge ikernel-cbadge--kern">Kórókin</span>
                  <span className="ikernel-cbadge ikernel-cbadge--meta">kernel.exec</span>
                </div>
              </div>
            )}

            {/* BRIDGE panel */}
            {isBridge && (
              <div className="ikernel-bridge-panel">
                {BRIDGE_ROWS.map((row, i) => (
                  <div key={i} className="ikernel-bridge-row"
                    style={{ animationDelay: `${i * 0.14}s` }}>
                    <span className="ikernel-bridge-side ikernel-bridge-side--left">{row.left}</span>
                    <span className="ikernel-bridge-icon">⟺</span>
                    <span className="ikernel-bridge-side ikernel-bridge-side--right">{row.right}</span>
                  </div>
                ))}
                <div className="ikernel-bridge-caption" style={{ animationDelay: '0.46s' }}>
                  IfaKernel (Kórókin) bridges all realms as One
                </div>
                <div className="ikernel-bridge-sub" style={{ animationDelay: '0.60s' }}>
                  <span className="ikernel-cbadge ikernel-cbadge--ifa">Ìkin Ifá</span>
                  <span className="ikernel-cbadge ikernel-cbadge--kern">OS Kernel analogue</span>
                  <span className="ikernel-cbadge ikernel-cbadge--meta">IFA Computer</span>
                </div>
              </div>
            )}

            {/* CONNECT panel */}
            {isConnect && (
              <div className="ikernel-connect-panel">
                {CONNECT_FIELDS.map((f, i) => (
                  <div key={i} className="ikernel-connect-row"
                    style={{ animationDelay: `${i * 0.10}s` }}>
                    <span className="ikernel-connect-dot"
                      style={{ background: modeColor, boxShadow: `0 0 4px ${modeColor}88` }}/>
                    <span className="ikernel-connect-field">{f}</span>
                    <span className="ikernel-connect-arrow">→ IfaKernel</span>
                  </div>
                ))}
                <div className="ikernel-connect-result" style={{ animationDelay: '0.65s' }}>
                  ⟳ All Fields = One Unified Knowledge
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Kernel layers legend */}
        <div className="ikernel-demo__layers">
          {[
            { label: 'Core (Kórókin)',  color: '#f0920c' },
            { label: 'IfaLang Runtime', color: '#3b9eff' },
            { label: 'Fields Bridge',   color: '#00c87c' },
            { label: 'OS / System',     color: '#8b5cf6' },
          ].map((l, i) => (
            <div key={i} className="ikernel-layer">
              <span className="ikernel-layer__dot"
                style={{ background: l.color, boxShadow: `0 0 4px ${l.color}88` }}/>
              <span className="ikernel-layer__label">{l.label}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

/* ── IfaPen (Gégéfà) Demo ──────────────────────────────────────────────────── */
const ORISA_COLORS = [
  { name: 'Ọrúnmìlà', c: '#f0920c' },
  { name: 'Ọbàtálá',  c: '#e8e8f0' },
  { name: 'Ọṣun',     c: '#ffd700' },
  { name: 'Ṣàngó',    c: '#dc2626' },
  { name: 'Yemọja',   c: '#1d4ed8' },
  { name: 'Ọgun',     c: '#2a5c1a' },
  { name: 'Ẹṣù',     c: '#7f1d1d' },
];

const IFA_COLORS = [
  { name: 'Ifa Green',    c: '#2a7a2a' },
  { name: 'Odu Brown',    c: '#8b5c2a' },
  { name: 'Forest Green', c: '#1a5a20' },
  { name: 'Earth Brown',  c: '#a07030' },
  { name: 'Bark Green',   c: '#3a6a1a' },
  { name: 'Deep Brown',   c: '#6b3a12' },
];

function IfaPenDemo() {
  const [mode, setMode] = useState('ogbe');
  const [colorScheme, setColorScheme] = useState('orisa');
  const isOgbe = mode === 'ogbe';
  const colors = colorScheme === 'orisa' ? ORISA_COLORS : IFA_COLORS;
  const gripClrs = colorScheme === 'orisa'
    ? ['#f0920c','#dc2626','#1d4ed8','#e8e8f0','#ffd700','#2a5c1a']
    : ['#2a7a2a','#8b5c2a','#1a5a20','#a07030','#3a6a1a','#6b3a12'];
  const gripY = [138,147,156,165,174,183];
  return (
    <div className="ipen-demo">
      {/* Pen SVG */}
      <div className="ipen-demo__left">
        <svg className="ipen-svg" viewBox="0 0 60 226" width="52" height="195" aria-label="IfaPen — Gégéfà">
          <defs>
            <linearGradient id="ipSpk" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%"   stopColor="#fdebd0"/>
              <stop offset="55%"  stopColor="#c9984a"/>
              <stop offset="100%" stopColor="#8b5c2a"/>
            </linearGradient>
            <linearGradient id="ipFig" x1="0" y1="0" x2="0.6" y2="1">
              <stop offset="0%"   stopColor="#9a5a28"/>
              <stop offset="100%" stopColor="#4a2008"/>
            </linearGradient>
            <linearGradient id="ipGrp" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"   stopColor="#0e0603"/>
              <stop offset="45%"  stopColor="#3a1a08"/>
              <stop offset="100%" stopColor="#0e0603"/>
            </linearGradient>
            <linearGradient id="ipBnd" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"   stopColor="#1a0a03"/>
              <stop offset="50%"  stopColor="#5a2c08"/>
              <stop offset="100%" stopColor="#1a0a03"/>
            </linearGradient>
            <radialGradient id="ipGA" cx="50%" cy="80%">
              <stop offset="0%"   stopColor="#f0920c" stopOpacity="0.9"/>
              <stop offset="100%" stopColor="#f0920c" stopOpacity="0"/>
            </radialGradient>
            <radialGradient id="ipGV" cx="50%" cy="80%">
              <stop offset="0%"   stopColor="#8b5cf6" stopOpacity="0.9"/>
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0"/>
            </radialGradient>
            <filter id="ipGF">
              <feGaussianBlur stdDeviation="1.8" result="b"/>
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>
          {/* Ìrọ́kẹ́ spike */}
          <path d="M30 3 C31.5 22 35 46 37 70 L23 70 C25 46 28.5 22 30 3 Z" fill="url(#ipSpk)"/>
          <line x1="29" y1="18" x2="31" y2="18" stroke="rgba(140,90,30,0.40)" strokeWidth="0.6"/>
          <line x1="28" y1="34" x2="32" y2="34" stroke="rgba(140,90,30,0.35)" strokeWidth="0.6"/>
          <line x1="27" y1="51" x2="33" y2="51" stroke="rgba(140,90,30,0.30)" strokeWidth="0.6"/>
          <line x1="26" y1="63" x2="34" y2="63" stroke="rgba(140,90,30,0.22)" strokeWidth="0.6"/>
          {/* Top ring */}
          <rect x="22" y="70" width="16" height="5" rx="1.5" fill="url(#ipBnd)"/>
          {/* Head */}
          <ellipse cx="30" cy="83" rx="7" ry="7.5" fill="url(#ipFig)"/>
          <ellipse cx="27.2" cy="82" rx="1.7" ry="2" fill="#f0920c" opacity="0.85"/>
          <ellipse cx="32.8" cy="82" rx="1.7" ry="2" fill="#f0920c" opacity="0.85"/>
          <circle cx="27.2" cy="82" r="0.7" fill="#1a0800"/>
          <circle cx="32.8" cy="82" r="0.7" fill="#1a0800"/>
          <path d="M28 88.5 Q30 90.5 32 88.5" stroke="rgba(200,120,20,0.7)" strokeWidth="0.8" fill="none" strokeLinecap="round"/>
          {/* Body */}
          <path d="M23 90 Q22 102 23 116 L37 116 Q38 102 37 90 Z" fill="url(#ipFig)"/>
          <path d="M23 95 Q18 100 20 108" stroke="#7a3510" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
          <path d="M37 95 Q42 100 40 108" stroke="#7a3510" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
          <path d="M25 92 Q30 94.5 35 92" stroke="rgba(240,146,12,0.50)" strokeWidth="1.2" fill="none"/>
          <line x1="28" y1="100" x2="28" y2="112" stroke="rgba(240,146,12,0.25)" strokeWidth="0.8"/>
          <line x1="32" y1="100" x2="32" y2="112" stroke="rgba(240,146,12,0.25)" strokeWidth="0.8"/>
          {/* Mid ring */}
          <rect x="22" y="116" width="16" height="5" rx="1.5" fill="url(#ipBnd)"/>
          {/* Ifa pattern band */}
          <rect x="23" y="121" width="14" height="14" rx="1" fill="rgba(240,146,12,0.05)"/>
          <line x1="27" y1="124" x2="27" y2="133" stroke="rgba(240,146,12,0.55)" strokeWidth="1"/>
          <line x1="30" y1="124" x2="30" y2="133" stroke="rgba(240,146,12,0.55)" strokeWidth="1"/>
          <line x1="33" y1="124" x2="33" y2="133" stroke="rgba(240,146,12,0.55)" strokeWidth="1"/>
          {/* Grip */}
          <rect x="24" y="135" width="12" height="58" rx="4" fill="url(#ipGrp)"/>
          {/* Color bar — Orisa or Ifa scheme */}
          {gripClrs.map((c, i) => (
            <rect key={i} x="24" y={gripY[i]} width="2" height="7" rx="1" fill={c}/>
          ))}
          {/* Tech accent stripes */}
          <rect x="25" y="155" width="11" height="1.5" rx="0.7" fill="rgba(59,158,255,0.28)"/>
          <line x1="26" y1="148" x2="36" y2="148" stroke="rgba(59,158,255,0.10)" strokeWidth="0.6"/>
          <line x1="26" y1="162" x2="36" y2="162" stroke="rgba(59,158,255,0.10)" strokeWidth="0.6"/>
          <line x1="26" y1="176" x2="36" y2="176" stroke="rgba(59,158,255,0.10)" strokeWidth="0.6"/>
          <line x1="26" y1="188" x2="36" y2="188" stroke="rgba(59,158,255,0.10)" strokeWidth="0.6"/>
          {/* Bottom ring */}
          <rect x="22" y="193" width="16" height="4" rx="1.5" fill="url(#ipBnd)"/>
          {/* Dual tip housing */}
          <rect x="23" y="196" width="14" height="8" rx="2" fill="#0e0603"/>
          {/* RTL: Oyeku || tips on LEFT, Ogbe | tip on RIGHT */}
          {/* Ogbe — single | nib, right side; pointed nib shape */}
          <path d="M30.5 204 L30.5 218 L32.5 221 L34.5 218 L34.5 204 Z"
            fill="#f0920c"
            opacity={isOgbe ? 1 : 0}
            filter={isOgbe ? 'url(#ipGF)' : undefined}/>
          {/* Oyeku — double || nibs, left side */}
          <path d="M23.5 204 L23.5 218 L25 221 L26.5 218 L26.5 204 Z"
            fill="#8b5cf6"
            opacity={!isOgbe ? 1 : 0}
            filter={!isOgbe ? 'url(#ipGF)' : undefined}/>
          <path d="M27.5 204 L27.5 218 L29 221 L30.5 218 L30.5 204 Z"
            fill="#8b5cf6"
            opacity={!isOgbe ? 1 : 0}
            filter={!isOgbe ? 'url(#ipGF)' : undefined}/>
          {/* Active glow halo */}
          {isOgbe  && <ellipse cx="32.5" cy="220" rx="5"   ry="2" fill="url(#ipGA)" opacity="0.9"/>}
          {!isOgbe && <ellipse cx="27.0" cy="220" rx="6.5" ry="2" fill="url(#ipGV)" opacity="0.9"/>}
        </svg>
        <div className="ipen-demo__label">
          <div className="ipen-demo__en">IfaPen</div>
          <div className="ipen-demo__yo">Gégéfà</div>
          <div className="ipen-demo__src">Ìrọ́kẹ́ Ifá</div>
        </div>
      </div>

      {/* Right: Writing Pad + Controls */}
      <div className="ipen-demo__right">
        <div className="ipen-demo__modes">
          <button className={'ipen-mode-btn' + (!isOgbe ? ' ipen-mode-btn--oyeku' : '')}
            onClick={() => setMode('oyeku')}>
            <span className="ipen-mode-btn__sym">||</span>
            <span className="ipen-mode-btn__lbl">Oyeku Tip</span>
          </button>
          <button className={'ipen-mode-btn' + (isOgbe ? ' ipen-mode-btn--ogbe' : '')}
            onClick={() => setMode('ogbe')}>
            <span className="ipen-mode-btn__sym">|</span>
            <span className="ipen-mode-btn__lbl">Ogbe Tip</span>
          </button>
        </div>

        <div className="ipen-demo__pad" key={mode}>
          <div className="ipen-pad__hdr">
            <span className="ipen-pad__dot"
              style={{background: isOgbe ? '#f0920c' : '#8b5cf6',
                      boxShadow: `0 0 6px ${isOgbe ? '#f0920c' : '#8b5cf6'}`}}/>
            {isOgbe ? 'Ogbe Mode — Single Mark  |' : 'Oyeku Mode — Double Mark  ||'}
          </div>
          <div className="ipen-pad__body">
            {isOgbe ? (
              <>
                <div className="ipen-pad__marks-area ipen-pad__marks-area--ogbe">
                  <div className="ipen-marks-col">
                    {[0,1,2,3].map(i => (
                      <span key={i} className="ipen-pad__mk"
                        style={{animationDelay:`${i*0.10}s`}}>|</span>
                    ))}
                  </div>
                  <div className="ipen-marks-info">
                    <span className="ipen-pad__sep">→</span>
                    <span className="ipen-pad__tag">Ogbè Méjì</span>
                  </div>
                </div>
                <div className="ipen-pad__line ipen-pad__line--code">
                  <span>odu = Ogbe.meji()</span><span className="ipen-pad__csr"/>
                </div>
                <div className="ipen-pad__line ipen-pad__line--comms">
                  <span className="ipen-cbadge ipen-cbadge--ifa">IfaComms</span>
                  <span className="ipen-cbadge ipen-cbadge--meta">meta-write</span>
                </div>
              </>
            ) : (
              <>
                <div className="ipen-pad__marks-area ipen-pad__marks-area--oyeku">
                  <div className="ipen-marks-col">
                    {[0,1,2,3].map(i => (
                      <span key={i} className="ipen-pad__mk"
                        style={{animationDelay:`${i*0.10}s`}}>||</span>
                    ))}
                  </div>
                  <div className="ipen-marks-info">
                    <span className="ipen-pad__sep">→</span>
                    <span className="ipen-pad__tag">Ọ̀yẹ̀kú Méjì</span>
                  </div>
                </div>
                <div className="ipen-pad__line ipen-pad__line--code" style={{color:'#c4b5fd'}}>
                  <span>odu = Oyeku.meji()</span>
                  <span className="ipen-pad__csr" style={{borderColor:'#8b5cf6'}}/>
                  <span className="ipen-pad__csr" style={{borderColor:'#8b5cf6', marginLeft:'2px'}}/>
                </div>
                <div className="ipen-pad__line ipen-pad__line--comms">
                  <span className="ipen-cbadge ipen-cbadge--orisa">OrisaComms</span>
                  <span className="ipen-cbadge ipen-cbadge--meta">meta-code</span>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="ipen-demo__color-scheme">
          <div className="ipen-scheme-toggle">
            <button
              className={'ipen-scheme-btn' + (colorScheme === 'orisa' ? ' ipen-scheme-btn--active' : '')}
              onClick={() => setColorScheme('orisa')}>
              Orisa
            </button>
            <button
              className={'ipen-scheme-btn' + (colorScheme === 'ifa' ? ' ipen-scheme-btn--active' : '')}
              onClick={() => setColorScheme('ifa')}>
              Ifa
            </button>
          </div>
          <div className="ipen-demo__color-row">
            {colors.map(c => (
              <div key={c.name} className="ipen-cdot" title={c.name}
                style={{background: c.c, boxShadow: `0 0 4px ${c.c}88`}}/>
            ))}
          </div>
        </div>

        <div className="ipen-demo__comms-row">
          <span className="ipen-cbadge ipen-cbadge--ifa">IfaComms</span>
          <span className="ipen-cbadge ipen-cbadge--orisa">OrisaComms</span>
          <span className="ipen-cbadge ipen-cbadge--meta">MetaComms</span>
          <span className="ipen-cbadge ipen-cbadge--code">meta-coding</span>
        </div>
      </div>
    </div>
  );
}

/* ── IfaLight (Ináfá) Demo ─────────────────────────────────────────────────── */

// 16 Oju Odu Ifa — each a distinct light, color, domain, and field of knowledge
const INAIFA_ODU = [
  { name:'Ogbè',       latin:'Ogbe',      num:1,  color:'#f5c518', domain:'Light · Creation',     field:'Mathematics',  code:'1111' },
  { name:'Ọ̀yẹ̀kú',    latin:'Oyeku',     num:2,  color:'#a78bfa', domain:'Void · Transition',    field:'Philosophy',   code:'0000' },
  { name:'Ìwòrì',     latin:'Iwori',     num:3,  color:'#3b9eff', domain:'Vision · Self',         field:'Physics',      code:'0110' },
  { name:'Òdí',       latin:'Odi',       num:4,  color:'#10b981', domain:'Birth · Gestation',     field:'Biology',      code:'1001' },
  { name:'Ìrosún',    latin:'Irosun',    num:5,  color:'#f43f5e', domain:'Blood · Sacrifice',     field:'Medicine',     code:'1100' },
  { name:'Ọ̀wọ́nrín',  latin:'Owonrin',   num:6,  color:'#f97316', domain:'Chaos · Revolution',    field:'Engineering',  code:'0011' },
  { name:'Ọ̀bárà',    latin:'Obara',     num:7,  color:'#f59e0b', domain:'Royalty · Expansion',   field:'Economics',    code:'1000' },
  { name:'Ọ̀kànràn',  latin:'Okanran',   num:8,  color:'#ec4899', domain:'Conflict · Resolve',    field:'Governance',   code:'0001' },
  { name:'Ògúndá',    latin:'Ogunda',    num:9,  color:'#dc2626', domain:'Iron · Justice',        field:'Law',          code:'1110' },
  { name:'Ọ̀sá',      latin:'Osa',       num:10, color:'#818cf8', domain:'Speed · Surprise',      field:'Technology',   code:'0111' },
  { name:'Ìká',       latin:'Ika',       num:11, color:'#14b8a6', domain:'Wealth · Wisdom',       field:'Finance',      code:'0100' },
  { name:'Òtúrúpọ̀n', latin:'Oturupon',  num:12, color:'#84cc16', domain:'Covenant · Ground',     field:'Architecture', code:'0010' },
  { name:'Òtúrá',     latin:'Otura',     num:13, color:'#06b6d4', domain:'Creation · Olódumàre', field:'Astronomy',    code:'1011' },
  { name:'Ìrẹtẹ̀',    latin:'Irete',     num:14, color:'#f472b6', domain:'Destiny · Firmness',    field:'History',      code:'1101' },
  { name:'Ọ̀ṣẹ́',      latin:'Ose',       num:15, color:'#c084fc', domain:'Prosperity · Beauty',   field:'Arts & Music', code:'1010' },
  { name:'Òfún',      latin:'Ofun',      num:16, color:'#cbd5e1', domain:'Death · Rebirth',       field:'Metaphysics',  code:'0101' },
];

// ── IfaNotebook helpers ────────────────────────────────────────────────────────
// Match an array of 4 bits (1=single|, 0=double||) to an Odu figure
function codeToOdu(marks) {
  const code = marks.join('');
  return INAIFA_ODU.find(o => o.code === code) || null;
}

// Run JS in a safe sandbox, capturing console output
function runJSCell(src) {
  const logs = [];
  const con = {
    log:   (...a) => logs.push(a.map(x => typeof x==='object'?JSON.stringify(x,null,2):String(x)).join(' ')),
    error: (...a) => logs.push('⚠ '+a.map(String).join(' ')),
    warn:  (...a) => logs.push('⚠ '+a.map(String).join(' ')),
    info:  (...a) => logs.push(a.map(String).join(' ')),
  };
  try {
    /* jshint ignore:start */
    const fn = new Function('console', src);
    /* jshint ignore:end */
    const ret = fn(con);
    if (logs.length === 0 && ret !== undefined) logs.push(String(ret));
    return { ok: true, lines: logs };
  } catch(e) {
    return { ok: false, lines: ['Error: ' + e.message] };
  }
}

let _nbId = 0;
function newNbCell(type, extra) {
  return Object.assign(
    { id: ++_nbId, type, input: '', output: null, right: [1,1,1,1], left: [1,1,1,1] },
    extra || {}
  );
}

// Precomputed SVG positions: 16 lights in a circle, center (68,58), radius 42
const _LCX = 68, _LCY = 58, _LR = 42;
const LAMP_POS = INAIFA_ODU.map((_, i) => {
  const a = (-i * 360 / 16 - 90) * Math.PI / 180;
  return { x: _LCX + _LR * Math.cos(a), y: _LCY + _LR * Math.sin(a) };
});

function IfaLightDemo() {
  const [activeOdu, setActiveOdu] = useState(0);
  const [mode,      setMode]      = useState('lights');
  const [autoSpin,  setAutoSpin]  = useState(true);

  const ao      = INAIFA_ODU[activeOdu];
  const lampClr = ao.color;

  // Auto-cycle through the 16 Odu lights
  useEffect(() => {
    if (!autoSpin) return;
    const id = setInterval(() => setActiveOdu(a => (a + 1) % 16), 1400);
    return () => clearInterval(id);
  }, [autoSpin]);

  const selectOdu = (i) => { setAutoSpin(false); setActiveOdu(i); };

  return (
    <div className="ilight-demo">

      {/* ── Left: Ináfá Lamp SVG ──────────────────────────────────────────────── */}
      <div className="ilight-demo__left">
        <svg
          className="ilight-svg"
          viewBox="0 0 136 120"
          width="136" height="120"
          aria-label="IfaLight Ináfá — 16 Oju Odu Ifa lights arranged as a luminous ring"
        >
          <defs>
            <radialGradient id="ilCoreFill" cx="50%" cy="50%">
              <stop offset="0%"   stopColor={lampClr} stopOpacity="0.92"/>
              <stop offset="55%"  stopColor={lampClr} stopOpacity="0.28"/>
              <stop offset="100%" stopColor={lampClr} stopOpacity="0"/>
            </radialGradient>
            <radialGradient id="ilBg" cx="50%" cy="50%">
              <stop offset="0%"   stopColor={lampClr} stopOpacity="0.12"/>
              <stop offset="100%" stopColor={lampClr} stopOpacity="0"/>
            </radialGradient>
            <filter id="ilGlow" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="2.2" result="b"/>
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <filter id="ilCoreGlow" x="-120%" y="-120%" width="340%" height="340%">
              <feGaussianBlur stdDeviation="6" result="b"/>
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <filter id="ilDotGlow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="2" result="b"/>
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>

          {/* Ambient background halo */}
          <circle cx={_LCX} cy={_LCY} r="52" fill="url(#ilBg)"/>

          {/* Outer ring guide */}
          <circle cx={_LCX} cy={_LCY} r={_LR}
            fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.4"/>

          {/* Middle dashed ring */}
          <circle cx={_LCX} cy={_LCY} r="22"
            fill="none" stroke={lampClr} strokeWidth="0.4"
            opacity="0.22" strokeDasharray="2.5 3.5"/>

          {/* 16 rays — active ray glows */}
          {INAIFA_ODU.map((odu, i) => {
            const p = LAMP_POS[i];
            const on = i === activeOdu;
            return (
              <line key={i}
                x1={_LCX} y1={_LCY} x2={p.x} y2={p.y}
                stroke={odu.color}
                strokeWidth={on ? 1.5 : 0.5}
                opacity={on ? 0.72 : 0.18}/>
            );
          })}

          {/* 16 light dots */}
          {INAIFA_ODU.map((odu, i) => {
            const p = LAMP_POS[i];
            const on = i === activeOdu;
            return (
              <circle key={i}
                cx={p.x} cy={p.y}
                r={on ? 4.8 : 2.8}
                fill={odu.color}
                opacity={on ? 0.96 : 0.38}
                filter={on ? 'url(#ilDotGlow)' : undefined}
                className={on ? 'ilight-dot--pulse' : ''}/>
            );
          })}

          {/* Core ambient halo */}
          <circle cx={_LCX} cy={_LCY} r="20"
            fill="url(#ilCoreFill)" filter="url(#ilCoreGlow)"/>

          {/* Core ring */}
          <circle cx={_LCX} cy={_LCY} r="13"
            fill="none" stroke={lampClr} strokeWidth="0.7" opacity="0.45"/>

          {/* Opon Ifa cross */}
          <line x1={_LCX} y1={_LCY-14} x2={_LCX} y2={_LCY+14}
            stroke={lampClr} strokeWidth="0.45" opacity="0.28"/>
          <line x1={_LCX-14} y1={_LCY} x2={_LCX+14} y2={_LCY}
            stroke={lampClr} strokeWidth="0.45" opacity="0.28"/>

          {/* Core inner orb */}
          <circle cx={_LCX} cy={_LCY} r="6.5"
            fill={lampClr} opacity="0.90" filter="url(#ilGlow)"
            className="ilight-core--pulse"/>

          {/* Active Odu number in core */}
          <text x={_LCX} y={_LCY + 2.2} textAnchor="middle"
            fontSize="5.5" fontWeight="bold" fontFamily="serif"
            fill={activeOdu < 2 ? '#000' : '#000'} opacity="0.85">
            {ao.num}
          </text>
        </svg>

        <div className="ilight-demo__label">
          <div className="ilight-demo__en">IfaLight</div>
          <div className="ilight-demo__yo">Ináfá</div>
          <div className="ilight-demo__odu" style={{ color: lampClr }}>{ao.name}</div>
        </div>
      </div>

      {/* ── Right: Interactive panel ───────────────────────────────────────────── */}
      <div className="ilight-demo__right">

        {/* Mode tabs */}
        <div className="ilight-demo__modes">
          {[
            { key:'lights', sym:'✦', lbl:'16 Lights', clr:'#f5c518' },
            { key:'fields', sym:'◎', lbl:'Fields',    clr:'#10b981' },
            { key:'render', sym:'⬡', lbl:'Render',    clr:'#3b9eff' },
          ].map(m => (
            <button key={m.key}
              className={'ilight-mode-btn' + (mode === m.key ? ' ilight-mode-btn--active' : '')}
              style={{ '--il-color': m.clr }}
              onClick={() => setMode(m.key)}>
              <span className="ilight-mode-btn__sym">{m.sym}</span>
              <span className="ilight-mode-btn__lbl">{m.lbl}</span>
            </button>
          ))}
        </div>

        {/* Display pad — key=mode re-animates on tab switch */}
        <div className="ilight-demo__pad" key={mode} style={{ '--il-color': lampClr }}>
          <div className="ilight-pad__hdr">
            <span className="ilight-pad__dot"
              style={{ background:lampClr, boxShadow:`0 0 6px ${lampClr}` }}/>
            {mode === 'lights' && `16 Lights — ${ao.name} · ${ao.domain}`}
            {mode === 'fields' && `Fields — ${ao.name} illuminates ${ao.field}`}
            {mode === 'render' && 'Render — IfaLight Output Types'}
          </div>

          <div className="ilight-pad__body">

            {/* ── LIGHTS panel ── */}
            {mode === 'lights' && (
              <div className="ilight-lights-panel">

                {/* 4 × 4 grid of 16 Odu lights */}
                <div className="ilight-odu-grid">
                  {INAIFA_ODU.map((odu, i) => (
                    <button key={i}
                      className={'ilight-odu-cell' + (i === activeOdu ? ' ilight-odu-cell--active' : '')}
                      style={{ '--odu-color': odu.color, animationDelay:`${i * 0.04}s` }}
                      onClick={() => selectOdu(i)}
                      title={`${odu.name} (${odu.latin}) — ${odu.domain}`}>
                      <span className="ilight-odu-dot"
                        style={{ background: odu.color,
                          boxShadow: i === activeOdu ? `0 0 8px ${odu.color}` : 'none' }}/>
                      <span className="ilight-odu-num">{odu.num}</span>
                      <span className="ilight-odu-nm">{odu.name}</span>
                    </button>
                  ))}
                </div>

                {/* Active Odu detail card */}
                <div className="ilight-odu-detail" key={activeOdu}
                  style={{ borderColor: `${lampClr}30` }}>
                  <div className="ilight-detail-name" style={{ color: lampClr }}>{ao.name}</div>
                  <div className="ilight-detail-latin">{ao.latin} · Odu {ao.num} of 16</div>
                  <div className="ilight-detail-domain">{ao.domain}</div>
                  <div className="ilight-detail-field">
                    Illuminates: <strong style={{ color: lampClr }}>{ao.field}</strong>
                  </div>
                </div>

                {/* Auto-spin toggle */}
                <button
                  className={'ilight-spin-btn' + (autoSpin ? ' ilight-spin-btn--on' : '')}
                  onClick={() => setAutoSpin(s => !s)}>
                  <span>{autoSpin ? '⏸' : '▶'}</span>
                  {autoSpin ? 'Auto-cycling all 16 Odu · click to pause'
                            : 'Paused · click to resume auto-cycle'}
                </button>
              </div>
            )}

            {/* ── FIELDS panel ── */}
            {mode === 'fields' && (
              <div className="ilight-fields-panel">
                <div className="ilight-fields-intro">
                  IfaLight illuminates all unknown areas of knowledge. Click any Odu:
                </div>
                <div className="ilight-fields-grid" key={activeOdu}>
                  {INAIFA_ODU.map((odu, i) => (
                    <div key={i}
                      className={'ilight-field-row' + (i === activeOdu ? ' ilight-field-row--active' : '')}
                      style={{ '--odu-color': odu.color, animationDelay:`${i * 0.04}s` }}
                      onClick={() => selectOdu(i)}>
                      <span className="ilight-field-dot"
                        style={{ background: odu.color,
                          boxShadow: i === activeOdu ? `0 0 7px ${odu.color}` : 'none' }}/>
                      <span className="ilight-field-nm"
                        style={{ color: i === activeOdu ? odu.color : undefined }}>
                        {odu.name}
                      </span>
                      <span className="ilight-field-arrow">→</span>
                      <span className="ilight-field-name">{odu.field}</span>
                      {i === activeOdu && (
                        <span className="ilight-field-active-tag">● lit</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── RENDER panel ── */}
            {mode === 'render' && (
              <div className="ilight-render-panel">
                <div className="ilight-render-title">IfaLight renders any knowledge expression as:</div>
                {[
                  { sym:'◉', label:'Odu Mark Diagram',   clr:'#f5c518', detail:'IFABit notation · Ọtún & Òsì columns · 8 marks',   delay:'0.00s' },
                  { sym:'∿', label:'Mathematical Plot',   clr:'#3b9eff', detail:'Functions, integrals, IfaWave forms, eigenvalues',  delay:'0.08s' },
                  { sym:'⬡', label:'Knowledge Graph',     clr:'#10b981', detail:'Odu axiom networks · semantic links · IFABOK',     delay:'0.16s' },
                  { sym:'☯', label:'IFABit State Map',    clr:'#a78bfa', detail:'256 Odu states · binary light/dark map',           delay:'0.24s' },
                  { sym:'♫', label:'Multimedia Output',   clr:'#ec4899', detail:'Audio · video · 3D · animation · simulation',      delay:'0.32s' },
                  { sym:'✦', label:'Àṣẹ Flow Diagram',   clr:'#f59e0b', detail:'Energy exchange · IfaWave Function · Ebo chains',  delay:'0.40s' },
                ].map((r, i) => (
                  <div key={i} className="ilight-render-row"
                    style={{ animationDelay: r.delay }}>
                    <span className="ilight-render-sym" style={{ color: r.clr }}>{r.sym}</span>
                    <div className="ilight-render-info">
                      <span className="ilight-render-label" style={{ color: r.clr }}>{r.label}</span>
                      <span className="ilight-render-detail">{r.detail}</span>
                    </div>
                    <span className="ilight-render-bar"
                      style={{ '--bar-color': r.clr, animationDelay: r.delay }}/>
                  </div>
                ))}
                <div className="ilight-render-note">
                  ⟳ All outputs are reactive — change any value, IfaLight re-renders instantly.
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Legend */}
        <div className="ilight-demo__legend">
          {[
            { label:'16 Oju Odu',   color:'#f5c518' },
            { label:'All Fields',   color:'#10b981' },
            { label:'Live Render',  color:'#3b9eff' },
            { label:'IFA Internet', color:'#a78bfa' },
          ].map((l, i) => (
            <div key={i} className="ilight-legend-item">
              <span className="ilight-legend-dot"
                style={{ background:l.color, boxShadow:`0 0 4px ${l.color}88` }}/>
              <span className="ilight-legend-label">{l.label}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

/* ── IfaBook (Ìwéfá) Demo ──────────────────────────────────────────────────── */
const IBOOK_PAGES = [
  {
    odu: 'Ogbè Méjì',  yo: 'Ogbè Méjì',
    marks: ['|','|','|','|', '|','|','|','|'],
    color: '#f5c518',  num: '١',
    verse: 'Àṣẹ flows from pure light. All creation begins here.',
    latin: 'Ogbe Meji',  aeb: 'Ogbè-Ogbè',
  },
  {
    odu: 'Ọ̀yẹ̀kú Méjì', yo: 'Ọ̀yẹ̀kú Méjì',
    marks: ['||','||','||','||', '||','||','||','||'],
    color: '#a78bfa',  num: '٢',
    verse: 'In the void, infinite potential. Endings birth beginnings.',
    latin: 'Oyeku Meji', aeb: 'Ọ̀yẹ̀kú-Ọ̀yẹ̀kú',
  },
  {
    odu: 'Ìwòrì Méjì', yo: 'Ìwòrì Méjì',
    marks: ['||','|','|','||', '||','|','|','||'],
    color: '#3b9eff',  num: '٣',
    verse: 'Look within the mirror of self. The answer lives in you.',
    latin: 'Iwori Meji', aeb: 'Ìwòrì-Ìwòrì',
  },
  {
    odu: 'Òdí Méjì',   yo: 'Òdí Méjì',
    marks: ['|','||','||','|', '|','||','||','|'],
    color: '#38e8a0',  num: '٤',
    verse: 'From the sacred womb of possibility, all forms emerge.',
    latin: 'Odi Meji',   aeb: 'Òdí-Òdí',
  },
];

function IfaBookDemo() {
  const [mode,     setMode]     = useState('pages');
  const [page,     setPage]     = useState(0);
  const [flipping, setFlipping] = useState(false);
  const [cellA,    setCellA]    = useState(4);

  const pg       = IBOOK_PAGES[page];
  const bookClr  = '#8b5cf6';
  const cellB    = cellA * 3;
  const cellC    = cellA + cellB;

  const goTo = (dir) => {
    if (flipping) return;
    setFlipping(true);
    setTimeout(() => {
      setPage(p => (p + dir + IBOOK_PAGES.length) % IBOOK_PAGES.length);
      setFlipping(false);
    }, 340);
  };

  // SVG mark positions on the right page (x=70-122)
  const OTU_X = 108;   // Ọtún column (right — read first in RTL)
  const OSI_X =  95;   // Òsì  column (left of Ọtún)
  const ROWS  = [29, 41, 53, 65];

  const Mark = ({ m, x, y, clr, delay }) => m === '|' ? (
    <line x1={x} y1={y} x2={x} y2={y+9}
      stroke={clr} strokeWidth="1.6" strokeLinecap="round"
      opacity="0.90" className="ibook-mark-line"
      style={{ animationDelay: delay }} />
  ) : (
    <g className="ibook-mark-line" style={{ animationDelay: delay }}>
      <line x1={x-2.5} y1={y} x2={x-2.5} y2={y+9}
        stroke={clr} strokeWidth="1.6" strokeLinecap="round" opacity="0.90"/>
      <line x1={x+2.5} y1={y} x2={x+2.5} y2={y+9}
        stroke={clr} strokeWidth="1.6" strokeLinecap="round" opacity="0.90"/>
    </g>
  );

  return (
    <div className="ibook-demo">

      {/* ── Left: Open Book SVG ───────────────────────────────────────────────── */}
      <div className="ibook-demo__left">
        <svg
          className={'ibook-svg' + (flipping ? ' ibook-svg--flip' : '')}
          viewBox="0 0 145 108"
          width="136" height="101"
          aria-label="IfaBook — Ìwéfá — open Odu Ifa notebook, spine on right (RTL)"
        >
          <defs>
            <radialGradient id="ibGlow" cx="50%" cy="50%">
              <stop offset="0%"   stopColor="#8b5cf6" stopOpacity="0.50"/>
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0"/>
            </radialGradient>
            <radialGradient id="ibMarkGlow" cx="50%" cy="50%">
              <stop offset="0%"   stopColor={pg.color} stopOpacity="0.55"/>
              <stop offset="100%" stopColor={pg.color} stopOpacity="0"/>
            </radialGradient>
            <linearGradient id="ibLeftPg" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"   stopColor="#06040f"/>
              <stop offset="100%" stopColor="#0b0818"/>
            </linearGradient>
            <linearGradient id="ibRightPg" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"   stopColor="#0a061a"/>
              <stop offset="100%" stopColor="#0d0920"/>
            </linearGradient>
            <linearGradient id="ibSpine" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"   stopColor="#1e0d40"/>
              <stop offset="50%"  stopColor="#3d1a78"/>
              <stop offset="100%" stopColor="#150930"/>
            </linearGradient>
            <linearGradient id="ibFold" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"   stopColor="rgba(139,92,246,0)"/>
              <stop offset="50%"  stopColor="rgba(139,92,246,0.28)"/>
              <stop offset="100%" stopColor="rgba(139,92,246,0)"/>
            </linearGradient>
            <filter id="ibShadow"><feGaussianBlur stdDeviation="3.5"/></filter>
            <filter id="ibGF">
              <feGaussianBlur stdDeviation="0.8" result="b"/>
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>

          {/* Drop shadow */}
          <ellipse cx="72" cy="108" rx="60" ry="5"
            fill="rgba(0,0,0,0.60)" filter="url(#ibShadow)"/>

          {/* Unread page-edge stack (right of spine, showing remaining pages) */}
          {[4,3,2,1,0].map(i => (
            <rect key={i}
              x={133 + i*1.5} y={5 + i*0.6}
              width={6 - i*0.7} height={96 - i*1.0}
              fill={`rgba(${18+i*3},${10+i*2},${38+i*4},${0.96-i*0.10})`}
              stroke="rgba(100,60,200,0.12)" strokeWidth="0.3" rx="0.4"/>
          ))}

          {/* Left page */}
          <rect x="6" y="4" width="60" height="97" rx="1.5"
            fill="url(#ibLeftPg)"
            stroke="rgba(139,92,246,0.16)" strokeWidth="0.5"/>

          {/* Left page — Foreign Script identity */}
          <text x="9" y="11" fontSize="3.1" fill="rgba(255,255,255,0.20)"
            fontFamily="serif" fontStyle="italic">Foreign Script</text>
          <text x="9" y="15" fontSize="2.5" fill="rgba(139,92,246,0.22)"
            fontFamily="monospace">{pg.latin} · Latin</text>

          {/* Left page — Opon Ifa decorative circle (center of the page) */}
          <circle cx="36" cy="52" r="22"
            fill="none" stroke="rgba(139,92,246,0.11)" strokeWidth="0.7"/>
          <circle cx="36" cy="52" r="14"
            fill="none" stroke="rgba(139,92,246,0.08)" strokeWidth="0.5"/>
          <circle cx="36" cy="52" r="6"
            fill="rgba(139,92,246,0.07)" stroke="rgba(139,92,246,0.15)" strokeWidth="0.5"/>
          {/* Cross dividers on Opon */}
          <line x1="36" y1="30" x2="36" y2="74"
            stroke="rgba(139,92,246,0.07)" strokeWidth="0.4"/>
          <line x1="14" y1="52" x2="58" y2="52"
            stroke="rgba(139,92,246,0.07)" strokeWidth="0.4"/>
          {/* Cardinal dots */}
          {[[36,30],[36,74],[14,52],[58,52]].map(([cx,cy],i) => (
            <circle key={i} cx={cx} cy={cy} r="1.2"
              fill="rgba(167,139,250,0.30)"/>
          ))}

          {/* Left page — faint horizontal ruled lines */}
          {[16,23,30,37,44,62,69,76,83,90].map((y,i) => (
            <line key={i} x1="10" y1={y} x2="62" y2={y}
              stroke="rgba(139,92,246,0.05)" strokeWidth="0.4"/>
          ))}

          {/* Left page — RTL indicator */}
          <text x="61" y="97" textAnchor="end"
            fontSize="3.5" fill="rgba(139,92,246,0.30)"
            fontFamily="monospace">← RTL</text>

          {/* Left page number */}
          <text x="36" y="97" textAnchor="middle"
            fontSize="4.5" fill="rgba(139,92,246,0.25)"
            fontFamily="serif">— {page + 1} —</text>

          {/* Center fold */}
          <rect x="66" y="4" width="5" height="97"
            fill="url(#ibFold)"/>
          <line x1="68.5" y1="4" x2="68.5" y2="101"
            stroke="rgba(139,92,246,0.32)" strokeWidth="0.6"/>

          {/* Right page */}
          <rect x="71" y="4" width="59" height="97" rx="1.5"
            fill="url(#ibRightPg)"
            stroke="rgba(139,92,246,0.16)" strokeWidth="0.5"/>

          {/* Right page — inner border frame */}
          <rect x="73" y="6" width="55" height="93" rx="1"
            fill="none" stroke="rgba(139,92,246,0.09)" strokeWidth="0.4"/>

          {/* Right page — Native Script identity */}
          <text x="122" y="11" textAnchor="end" fontSize="3.1" fill="rgba(255,255,255,0.20)"
            fontFamily="serif" fontStyle="italic">Native Scripts</text>
          <text x="122" y="15" textAnchor="end" fontSize="2.5" fill={`${pg.color}88`}
            fontFamily="monospace">Odu Ifa · Aebajiogbe</text>

          {/* Right page — Odu name (right-aligned, RTL) */}
          <text x="122" y="17" textAnchor="end"
            fontSize="4.5" fontWeight="bold"
            fill={pg.color} fontFamily="monospace"
            filter="url(#ibGF)">
            {pg.yo}
          </text>

          {/* Right page — subtitle */}
          <text x="122" y="23" textAnchor="end"
            fontSize="3" fill="rgba(255,255,255,0.18)"
            fontFamily="monospace">{pg.odu}</text>

          {/* Right page — divider under header */}
          <line x1="74" y1="26" x2="122" y2="26"
            stroke={pg.color} strokeWidth="0.4" opacity="0.35"/>

          {/* Column labels (Ọtún = right, Òsì = left — RTL order) */}
          <text x={OTU_X} y="78" textAnchor="middle"
            fontSize="3.2" fill="rgba(255,255,255,0.22)"
            fontFamily="monospace">Ọtún</text>
          <text x={OSI_X} y="78" textAnchor="middle"
            fontSize="3.2" fill="rgba(255,255,255,0.22)"
            fontFamily="monospace">Òsì</text>

          {/* Sub-divider below labels */}
          <line x1="83" y1="79" x2="117" y2="79"
            stroke={pg.color} strokeWidth="0.3" opacity="0.25"/>

          {/* Mark glow halo */}
          <ellipse cx="101" cy="52" rx="18" ry="24"
            fill="url(#ibMarkGlow)" opacity="0.35"/>

          {/* Odu Marks — Ọtún column (right, marks 0-3) */}
          {pg.marks.slice(0,4).map((m, i) => (
            <Mark key={`otu-${i}-${page}`}
              m={m} x={OTU_X} y={ROWS[i]}
              clr={pg.color} delay={`${i*0.08}s`}/>
          ))}

          {/* Odu Marks — Òsì column (left, marks 4-7) */}
          {pg.marks.slice(4,8).map((m, i) => (
            <Mark key={`osi-${i}-${page}`}
              m={m} x={OSI_X} y={ROWS[i]}
              clr={pg.color} delay={`${(i+4)*0.08}s`}/>
          ))}

          {/* Right page number (RTL: numeral on left = page end) */}
          <text x="74" y="97" textAnchor="start"
            fontSize="5" fill="rgba(139,92,246,0.28)"
            fontFamily="serif">{pg.num}</text>

          {/* Spine */}
          <rect x="130" y="4" width="11" height="97" rx="2"
            fill="url(#ibSpine)"/>
          <line x1="133" y1="14" x2="133" y2="91"
            stroke="rgba(167,139,250,0.22)" strokeWidth="0.5"/>
          <line x1="138" y1="14" x2="138" y2="91"
            stroke="rgba(167,139,250,0.14)" strokeWidth="0.4"/>
          {/* Spine title — vertical */}
          <text x="135.5" y="52" textAnchor="middle"
            fontSize="3.5" fill="rgba(167,139,250,0.50)"
            fontFamily="serif"
            transform="rotate(-90 135.5 52)">Ìwéfá</text>

          {/* Spine top/bottom caps */}
          <rect x="130" y="4"  width="11" height="4" rx="2"
            fill="rgba(80,30,160,0.55)"/>
          <rect x="130" y="97" width="11" height="4" rx="2"
            fill="rgba(80,30,160,0.55)"/>
        </svg>

        <div className="ibook-demo__label">
          <div className="ibook-demo__en">IfaBook</div>
          <div className="ibook-demo__yo">Ìwéfá</div>
          <div className="ibook-demo__src">Ìwé Ifá</div>
        </div>
      </div>

      {/* ── Right: Interactive panel ───────────────────────────────────────────── */}
      <div className="ibook-demo__right">

        {/* Mode tabs */}
        <div className="ibook-demo__modes">
          {[
            { key:'pages',    sym:'📖', lbl:'Pages',    clr:'#8b5cf6' },
            { key:'script',   sym:'✦',  lbl:'Script',   clr:'#f0920c' },
            { key:'reactive', sym:'⟳',  lbl:'Reactive', clr:'#00c87c' },
            { key:'network',  sym:'🌐', lbl:'Network',  clr:'#3b9eff' },
          ].map(m => (
            <button key={m.key}
              className={'ibook-mode-btn' + (mode === m.key ? ' ibook-mode-btn--active' : '')}
              style={{ '--bk-color': m.clr }}
              onClick={() => setMode(m.key)}>
              <span className="ibook-mode-btn__sym">{m.sym}</span>
              <span className="ibook-mode-btn__lbl">{m.lbl}</span>
            </button>
          ))}
        </div>

        {/* Display pad — key=mode re-animates on tab switch */}
        <div className="ibook-demo__pad" key={mode} style={{ '--bk-color': bookClr }}>
          <div className="ibook-pad__hdr">
            <span className="ibook-pad__dot"
              style={{ background: bookClr, boxShadow: `0 0 6px ${bookClr}` }}/>
            {mode === 'pages'    && `Pages — RTL Odu Ifa Codes · ${page+1} / ${IBOOK_PAGES.length}`}
            {mode === 'script'   && 'Script — Dual Writing System · Native & Foreign'}
            {mode === 'reactive' && 'Reactive — Live Cell Dependency Graph'}
            {mode === 'network'  && 'Network — Publish to IFA Internet'}
          </div>

          <div className="ibook-pad__body">

            {/* ── PAGES panel ── */}
            {mode === 'pages' && (
              <div className="ibook-pages-panel" key={page}>
                {/* Odu header */}
                <div className="ibook-odu-header" style={{ animationDelay:'0s' }}>
                  <span className="ibook-odu-name" style={{ color: pg.color }}>{pg.yo}</span>
                  <span className="ibook-rtl-badge">← RTL</span>
                </div>

                {/* Marks grid: Ọtún (right) | Òsì (left) — RTL order */}
                <div className="ibook-marks-display" style={{ animationDelay:'0.08s' }}>
                  <div className="ibook-marks-group">
                    <div className="ibook-marks-col-label" style={{ color: pg.color }}>Ọtún</div>
                    <div className="ibook-marks-col">
                      {pg.marks.slice(0,4).map((m, i) => (
                        <span key={i} className="ibook-mark-char"
                          style={{ color: pg.color, animationDelay:`${i*0.07}s` }}>
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="ibook-marks-sep">|</div>
                  <div className="ibook-marks-group">
                    <div className="ibook-marks-col-label" style={{ color: pg.color }}>Òsì</div>
                    <div className="ibook-marks-col">
                      {pg.marks.slice(4,8).map((m, i) => (
                        <span key={i} className="ibook-mark-char"
                          style={{ color: pg.color, animationDelay:`${(i+4)*0.07}s` }}>
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Verse */}
                <div className="ibook-verse" style={{ animationDelay:'0.32s' }}>
                  "{pg.verse}"
                </div>

                {/* Dual Writing System indicator */}
                <div className="ibook-dual-row" style={{ animationDelay:'0.38s' }}>
                  <span className="ibook-dual-tag">Latin · Foreign</span>
                  <span className="ibook-dual-arrow">◄ RTL ►</span>
                  <span className="ibook-dual-tag ibook-dual-tag--native" style={{ color:pg.color }}>
                    Odu Ifa · Aebajiogbe-Oduduwa
                  </span>
                </div>

                {/* Navigation (RTL convention: → = previous, ← = next) */}
                <div className="ibook-nav" style={{ animationDelay:'0.44s' }}>
                  <button className="ibook-nav-btn" onClick={() => goTo(-1)}
                    title="Previous Odu (→ in RTL)">→</button>
                  <div className="ibook-nav-dots">
                    {IBOOK_PAGES.map((_, i) => (
                      <span key={i}
                        className={'ibook-nav-dot' + (i===page?' ibook-nav-dot--active':'')}
                        style={i===page
                          ? { background:pg.color, boxShadow:`0 0 6px ${pg.color}` }
                          : {}}
                        onClick={() => { if (!flipping) setPage(i); }}
                      />
                    ))}
                  </div>
                  <button className="ibook-nav-btn" onClick={() => goTo(1)}
                    title="Next Odu (← in RTL)">←</button>
                </div>

                {/* Odu index badge */}
                <div className="ibook-odu-badges" style={{ animationDelay:'0.55s' }}>
                  <span className="ikernel-cbadge ikernel-cbadge--ifa">{pg.odu}</span>
                  <span className="ikernel-cbadge ikernel-cbadge--meta">RTL · Spine Right</span>
                </div>
              </div>
            )}

            {/* ── SCRIPT panel ── */}
            {mode === 'script' && (
              <div className="ibook-script-panel">

                {/* RTL direction banner */}
                <div className="ibook-script-dir">
                  <span className="ibook-script-arrow-sym">→</span>
                  <span className="ibook-script-dir-lbl">Reads Right to Left (RTL)</span>
                  <span className="ibook-script-arrow-sym">←</span>
                </div>

                {/* Open-book two-page split */}
                <div className="ibook-script-split" key={page}>
                  {/* Left page — Foreign Script */}
                  <div className="ibook-script-pg ibook-script-pg--left">
                    <div className="ibook-script-pg-tag">← Left Page</div>
                    <div className="ibook-script-pg-type">Foreign Script</div>
                    <div className="ibook-script-latin-name">{pg.latin}</div>
                    <div className="ibook-script-verse-snip">"{pg.verse.slice(0,42)}…"</div>
                    <div className="ibook-script-sys">Latin Script</div>
                  </div>

                  {/* Spine divider */}
                  <div className="ibook-script-spinediv">
                    <span className="ibook-script-spinetxt">Ìwéfá</span>
                  </div>

                  {/* Right page — Native Scripts */}
                  <div className="ibook-script-pg ibook-script-pg--right">
                    <div className="ibook-script-pg-tag">Right Page →</div>
                    <div className="ibook-script-pg-type" style={{ color:pg.color }}>Native Scripts</div>
                    <div className="ibook-script-yo" style={{ color:pg.color }}>{pg.yo}</div>
                    <div className="ibook-script-aeb">{pg.aeb}</div>
                    <div className="ibook-script-marks-row">
                      {pg.marks.slice(0,4).map((m,i) => (
                        <span key={i} className="ibook-script-mark" style={{ color:pg.color }}>{m}</span>
                      ))}
                    </div>
                    <div className="ibook-script-sys">Odu Ifa · Aebajiogbe-Oduduwa</div>
                  </div>
                </div>

                {/* Script comparison table */}
                <div className="ibook-script-table">
                  <div className="ibook-script-tr ibook-script-tr--hd">
                    <span>Script System</span><span>Page</span><span>Direction</span>
                  </div>
                  {[
                    { sys:'Odu Ifa',            pg:'Right', dir:'RTL ←', clr:pg.color },
                    { sys:'Aebajiogbe-Oduduwa', pg:'Right', dir:'RTL ←', clr:pg.color },
                    { sys:'Latin (& others)',   pg:'Left',  dir:'LTR →', clr:'rgba(255,255,255,0.48)' },
                  ].map((r,i) => (
                    <div key={i} className="ibook-script-tr"
                      style={{ animationDelay:`${i*0.08}s` }}>
                      <span style={{ color:r.clr }}>{r.sys}</span>
                      <span>{r.pg}</span>
                      <span className="ibook-script-dir-cell">{r.dir}</span>
                    </div>
                  ))}
                </div>

                {/* Badges */}
                <div className="ibook-script-badges">
                  <span className="ikernel-cbadge ikernel-cbadge--ifa">Odu Ifa</span>
                  <span className="ikernel-cbadge ikernel-cbadge--kern">Aebajiogbe-Oduduwa</span>
                  <span className="ikernel-cbadge ikernel-cbadge--meta">Latin Script</span>
                </div>

              </div>
            )}

            {/* ── REACTIVE panel ── */}
            {mode === 'reactive' && (
              <div className="ibook-reactive-panel">
                {[
                  { id:'A', label:'Odu Index',  value:cellA,  color:'#f5c518', formula:null },
                  { id:'B', label:'Àṣẹ Weight', value:cellB,  color:'#00c87c', formula:`= A × 3 → ${cellB}` },
                  { id:'C', label:'IFABit',     value:cellC,  color:'#8b5cf6', formula:`= A + B → ${cellC}` },
                ].map((cell, i) => (
                  <div key={cell.id} className="ibook-cell"
                    style={{ animationDelay:`${i*0.10}s` }}>
                    <div className="ibook-cell__row">
                      <span className="ibook-cell__id" style={{ color: cell.color }}>{cell.id}</span>
                      <span className="ibook-cell__label">{cell.label}</span>
                      {cell.formula && (
                        <span className="ibook-cell__formula">{cell.formula}</span>
                      )}
                      <span className="ibook-cell__value" style={{ color: cell.color }}>
                        {cell.value}
                      </span>
                    </div>
                    {cell.id === 'A' && (
                      <div className="ibook-cell__controls">
                        <button className="ibook-ctrl-btn"
                          onClick={() => setCellA(v => Math.max(1, v-1))}>−</button>
                        <span className="ibook-ctrl-val">{cellA}</span>
                        <button className="ibook-ctrl-btn"
                          onClick={() => setCellA(v => Math.min(16, v+1))}>+</button>
                      </div>
                    )}
                    {i < 2 && <div className="ibook-cell__arrow">↓ reactive update</div>}
                  </div>
                ))}
                <div className="ibook-reactive-note" style={{ animationDelay:'0.38s' }}>
                  ⟳ Change A — B and C update instantly across all notebooks
                </div>
              </div>
            )}

            {/* ── NETWORK panel ── */}
            {mode === 'network' && (
              <div className="ibook-network-panel">
                <div className="ibook-net-self" style={{ animationDelay:'0s' }}>
                  <span className="ibook-net-self-dot"
                    style={{ background:bookClr, boxShadow:`0 0 8px ${bookClr}` }}/>
                  <span className="ibook-net-self-label">This IfaBook (.ifa file)</span>
                </div>
                {[
                  { label:'IFABOK Library',    clr:'#f0920c', delay:'0.10s', sym:'◉' },
                  { label:'Odu Axiom Graph',   clr:'#3b9eff', delay:'0.20s', sym:'∞' },
                  { label:'IFA Internet',      clr:'#8b5cf6', delay:'0.30s', sym:'🌐' },
                  { label:'Global Notebooks',  clr:'#38e8a0', delay:'0.40s', sym:'⟳' },
                ].map((n, i) => (
                  <div key={i} className="ibook-net-row"
                    style={{ animationDelay: n.delay }}>
                    <span className="ibook-net-connector"/>
                    <span className="ibook-net-node"
                      style={{ borderColor: n.clr, color: n.clr }}>
                      <span className="ibook-net-sym">{n.sym}</span>
                      {n.label}
                    </span>
                  </div>
                ))}
                <div className="ibook-net-badges" style={{ animationDelay:'0.54s' }}>
                  <span className="ikernel-cbadge ikernel-cbadge--ifa">IFABOK</span>
                  <span className="ikernel-cbadge ikernel-cbadge--kern">plain-text .ifa</span>
                  <span className="ikernel-cbadge ikernel-cbadge--meta">offline-first</span>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Legend */}
        <div className="ibook-demo__legend">
          {[
            { label:'RTL · Spine Right',   color:'#8b5cf6' },
            { label:'Native Scripts',       color:'#f0920c' },
            { label:'Dual Writing System', color:'#f5c518' },
            { label:'IFA Internet',        color:'#3b9eff' },
          ].map((l, i) => (
            <div key={i} className="ibook-legend-item">
              <span className="ibook-legend-dot"
                style={{ background:l.color, boxShadow:`0 0 4px ${l.color}88` }}/>
              <span className="ibook-legend-label">{l.label}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

/* ── IfaNotebook Environment ─────────────────────────────────────────────────── */

// Single Odu figure: 4 clickable mark buttons displayed vertically
function OduMarkFigure({ marks, label, color, onChange }) {
  const odu = codeToOdu(marks);
  return (
    <div className="nb-odu-figure">
      <div className="nb-odu-fig-label" style={{ color }}>{label}</div>
      <div className="nb-odu-marks">
        {marks.map((m, i) => (
          <button
            key={i}
            className={'nb-mark-btn' + (m === 1 ? ' nb-mark-btn--single' : ' nb-mark-btn--double')}
            onClick={e => {
              e.stopPropagation();
              const next = [...marks];
              next[i] = next[i] === 1 ? 0 : 1;
              onChange(next);
            }}
            title={m === 1 ? 'Single mark | — click to toggle' : 'Double mark || — click to toggle'}
          >
            <span className="nb-mark-bar" />
            {m === 0 && <span className="nb-mark-bar" />}
          </button>
        ))}
      </div>
      {odu && (
        <div className="nb-odu-fig-name" style={{ color: odu.color }}>{odu.name}</div>
      )}
    </div>
  );
}

// Two-figure Odu input + result display
function OduMarkInput({ right, left, onChangeRight, onChangeLeft }) {
  const rightOdu = codeToOdu(right);
  const leftOdu  = codeToOdu(left);
  return (
    <div className="nb-odu-input">
      <div className="nb-odu-figures">
        <OduMarkFigure marks={left}  label="Òsì (Left)"   color="#3b9eff"  onChange={onChangeLeft}  />
        <div className="nb-odu-sep">·</div>
        <OduMarkFigure marks={right} label="Ọtún (Right)" color="#f0920c" onChange={onChangeRight} />
      </div>
      {rightOdu && leftOdu && (
        <div className="nb-odu-result">
          <span className="nb-odu-result__name">
            <span style={{ color: rightOdu.color }}>{rightOdu.name}</span>
            {' '}
            <span style={{ color: leftOdu.color }}>{leftOdu.name}</span>
          </span>
          <span className="nb-odu-result__badge">#{rightOdu.num}–{leftOdu.num}</span>
          {rightOdu.num === leftOdu.num && (
            <span className="nb-odu-result__meji">Méjì ✦</span>
          )}
          <span className="nb-odu-result__domain">{rightOdu.domain}</span>
        </div>
      )}
    </div>
  );
}

// Individual notebook cell
function NbCell({ cell, idx, active, onFocus, onRun, onDelete, onMoveUp, onMoveDown, onChange, isFirst, isLast }) {
  const CLR = { code: '#f0920c', odu: '#10b981', text: '#3b9eff' };
  const clr = CLR[cell.type] || '#888';

  return (
    <div
      className={'nb-cell nb-cell--' + cell.type + (active ? ' nb-cell--active' : '')}
      style={{ '--nb-clr': clr }}
      onClick={onFocus}
    >
      {/* Gutter */}
      <div className="nb-cell__gutter">
        <span className="nb-cell__num">[{idx + 1}]</span>
        <button
          className="nb-cell__run-gutter"
          onClick={e => { e.stopPropagation(); onRun(); }}
          title="Run cell"
          aria-label="Run cell"
        >▶</button>
      </div>

      {/* Body */}
      <div className="nb-cell__body">
        {/* Header bar */}
        <div className="nb-cell__hdr">
          <span className="nb-cell__type-badge">{cell.type.toUpperCase()}</span>
          {cell.type === 'odu' && (
            <span className="nb-cell__hdr-note">Click marks to toggle | ↔ ||</span>
          )}
          <div className="nb-cell__controls">
            <button className="nb-ctrl-btn" onClick={e => { e.stopPropagation(); onMoveUp(); }}   disabled={isFirst} title="Move up"   aria-label="Move cell up">↑</button>
            <button className="nb-ctrl-btn" onClick={e => { e.stopPropagation(); onMoveDown(); }} disabled={isLast}  title="Move down" aria-label="Move cell down">↓</button>
            <button className="nb-ctrl-btn nb-ctrl-btn--del" onClick={e => { e.stopPropagation(); onDelete(); }} title="Delete cell" aria-label="Delete cell">×</button>
          </div>
        </div>

        {/* Code input */}
        {cell.type === 'code' && (
          <textarea
            className="nb-code-input"
            value={cell.input}
            onChange={e => onChange({ input: e.target.value, output: null })}
            onFocus={onFocus}
            placeholder="// JavaScript — IfaLang kernel coming soon"
            rows={Math.max(3, (cell.input.match(/\n/g)||[]).length + 2)}
            spellCheck={false}
          />
        )}

        {/* Text input */}
        {cell.type === 'text' && (
          <textarea
            className="nb-text-input"
            value={cell.input}
            onChange={e => onChange({ input: e.target.value })}
            onFocus={onFocus}
            placeholder="Notes, ideas, IfaLang expressions, Markdown…"
            rows={Math.max(2, (cell.input.match(/\n/g)||[]).length + 2)}
          />
        )}

        {/* Odu mark input */}
        {cell.type === 'odu' && (
          <OduMarkInput
            right={cell.right}
            left={cell.left}
            onChangeRight={r => onChange({ right: r })}
            onChangeLeft={l  => onChange({ left: l })}
          />
        )}

        {/* Code / text output */}
        {cell.output && cell.type !== 'odu' && (
          <div className={'nb-cell__output' + (cell.output.ok === false ? ' nb-cell__output--err' : '')}>
            {cell.type === 'code' && cell.output.lines && cell.output.lines.map((line, i) => (
              <div key={i} className="nb-out-line">{line || '\u00A0'}</div>
            ))}
            {cell.type === 'text' && (
              <div className="nb-text-preview">{cell.input}</div>
            )}
          </div>
        )}

        {/* Run button (code + text only) */}
        {cell.type !== 'odu' && (
          <button className="nb-run-btn" onClick={e => { e.stopPropagation(); onRun(); }}>
            ▶ Run
          </button>
        )}
      </div>
    </div>
  );
}

// Export cells as a .ifa plain-text file
function exportIfa(cells) {
  const lines = cells.map((c, i) => {
    const hdr = `[Cell ${i+1} | ${c.type.toUpperCase()}]`;
    if (c.type === 'odu') {
      const r = codeToOdu(c.right);
      const l = codeToOdu(c.left);
      return `${hdr}\nOdu: ${r?r.latin:'?'} ${l?l.latin:'?'}\nRight IFABit: [${c.right.join(',')}]\nLeft  IFABit: [${c.left.join(',')}]\n`;
    }
    return `${hdr}\n${c.input}\n`;
  });
  const blob = new Blob([lines.join('\n')], { type: 'text/plain' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href = url; a.download = 'notebook.ifa'; a.click();
  URL.revokeObjectURL(url);
}

function IfaNotebookSection() {
  const [cells, setCells] = useState(() => [
    newNbCell('text', { input: 'Welcome to IfaNote — The Notebook for Everything.\nCombine code, Odu Ifa wisdom, and universal knowledge in one reactive environment.' }),
    newNbCell('code', { input: 'const wave = (x) => Math.sin(x) * Math.cos(x / 2);\nfor (let i = 0; i < 4; i++) {\n  console.log(`Ψ(${i}) = ${wave(i).toFixed(4)}`);\n}' }),
    newNbCell('odu',  { right: [1,1,1,1], left: [1,1,1,1] }),
  ]);
  const [active, setActive] = useState(null);

  function updateCell(id, patch) {
    setCells(cs => cs.map(c => c.id === id ? { ...c, ...patch } : c));
  }

  function runCell(id) {
    const cell = cells.find(c => c.id === id);
    if (!cell) return;
    if (cell.type === 'code') {
      updateCell(id, { output: runJSCell(cell.input) });
    } else if (cell.type === 'text') {
      updateCell(id, { output: { ok: true, lines: [] } });
    }
    // Odu cells have live output — no run needed
  }

  function runAll() {
    setCells(cs => cs.map(c => {
      if (c.type === 'code') return { ...c, output: runJSCell(c.input) };
      if (c.type === 'text') return { ...c, output: { ok: true, lines: [] } };
      return c;
    }));
  }

  function addCell(type) {
    setCells(cs => [...cs, newNbCell(type)]);
  }

  function deleteCell(id) {
    setCells(cs => cs.filter(c => c.id !== id));
  }

  function moveCell(id, dir) {
    setCells(cs => {
      const idx  = cs.findIndex(c => c.id === id);
      const next = idx + dir;
      if (idx < 0 || next < 0 || next >= cs.length) return cs;
      const arr = [...cs];
      [arr[idx], arr[next]] = [arr[next], arr[idx]];
      return arr;
    });
  }

  return (
    <div className="section--alt" style={{ padding:'1px 0' }}>
      <section className="section nb-section" id="try-ifanote" aria-labelledby="nb-title">
        <div className="grad-divider" style={{ marginBottom:'56px' }} />
        <p className="section__eyebrow">Live Preview</p>
        <h2 className="section__title" id="nb-title">Try IfaNote</h2>
        <p className="section__sub">
          Experience the IfaNote environment — add code, Odu Ifa mark, and text cells. Run JavaScript,
          cast Odu marks to identify the 256 Odu Ifa, and export your notebook.
        </p>

        <div className="nb-env">
          {/* Toolbar */}
          <div className="nb-toolbar">
            <div className="nb-toolbar__brand">
              <span className="nb-toolbar__icon" aria-hidden="true">📓</span>
              <span className="nb-toolbar__name">Untitled IfaNote</span>
            </div>
            <div className="nb-toolbar__center">
              <button className="nb-add-btn nb-add-btn--code" onClick={() => addCell('code')}>＋ Code</button>
              <button className="nb-add-btn nb-add-btn--odu"  onClick={() => addCell('odu')}>＋ Odu</button>
              <button className="nb-add-btn nb-add-btn--text" onClick={() => addCell('text')}>＋ Text</button>
            </div>
            <div className="nb-toolbar__right">
              <button className="nb-run-all-btn" onClick={runAll} title="Run all code and text cells">▶▶ Run All</button>
              <button className="nb-export-btn"  onClick={() => exportIfa(cells)} title="Download as .ifa file">↓ .ifa</button>
            </div>
          </div>

          {/* Cells */}
          <div className="nb-cells" role="list" aria-label="Notebook cells">
            {cells.map((cell, idx) => (
              <NbCell
                key={cell.id}
                cell={cell}
                idx={idx}
                active={active === cell.id}
                onFocus={() => setActive(cell.id)}
                onRun={() => runCell(cell.id)}
                onDelete={() => deleteCell(cell.id)}
                onMoveUp={() => moveCell(cell.id, -1)}
                onMoveDown={() => moveCell(cell.id, 1)}
                onChange={patch => updateCell(cell.id, patch)}
                isFirst={idx === 0}
                isLast={idx === cells.length - 1}
              />
            ))}
          </div>

          {/* Add row */}
          <div className="nb-add-row">
            <button className="nb-add-inline nb-add-inline--code" onClick={() => addCell('code')}>+ Code Cell</button>
            <button className="nb-add-inline nb-add-inline--odu"  onClick={() => addCell('odu')}>+ Odu Cell</button>
            <button className="nb-add-inline nb-add-inline--text" onClick={() => addCell('text')}>+ Text Cell</button>
          </div>

          <div className="nb-footer-note">
            <span>⚡ JS runs in your browser</span>
            <span>·</span>
            <span>✦ Odu marks identify all 256 Odu Ifa</span>
            <span>·</span>
            <span>↓ Export as .ifa file</span>
            <span>·</span>
            <span>🐍 Python via IfaKernel — coming in Phase II</span>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ── Components Section ─────────────────────────────────────────────────────── */
function ComponentsSection() {
  return (
    <div className="section--alt" style={{ padding:'1px 0' }}>
      <section className="section section--wide" id="components" aria-labelledby="comp-title">
        <div className="grad-divider" style={{ marginBottom:'72px' }} />
        <p className="section__eyebrow">Core Architecture</p>
        <h2 className="section__title" id="comp-title">The Four Elements of IfaNote</h2>
        <p className="section__sub">
          Like the four cardinal directions on the Opon Ifa board, IfaNote is built on four
          interconnected elements — each named in both English and Yoruba, reflecting the
          bilingual, universal nature of the IFA Internet.
        </p>

        <div className="components-grid">
          {COMPONENTS.map(comp => (
            <article
              className={`component-card component-card--${comp.variant}`}
              key={comp.key}
              aria-labelledby={`comp-${comp.key}-name`}
            >
              {/* Colored top band */}
              <div className="component-card__band" aria-hidden="true" />
              <div className="component-card__header">
                <div className="component-card__icon-wrap" aria-hidden="true">
                  {comp.icon}
                </div>
                <div className="component-card__names">
                  <div className="component-card__name-en" id={`comp-${comp.key}-name`}>
                    {comp.nameEn}
                  </div>
                  <div className="component-card__name-yo">{comp.nameYo}</div>
                </div>
              </div>
              <p className="component-card__body">{comp.body}</p>
              {comp.key === 'kernel' ? (
                <div className="component-card__demo component-card__demo--live"
                  aria-label="IfaKernel Kórókin — Interactive Demo">
                  <IfaKernelDemo />
                </div>
              ) : comp.key === 'pen' ? (
                <div className="component-card__demo component-card__demo--live"
                  aria-label="IfaPen Gégéfà — Interactive Demo">
                  <IfaPenDemo />
                </div>
              ) : comp.key === 'light' ? (
                <div className="component-card__demo component-card__demo--live"
                  aria-label="IfaLight Ináfá — Interactive Demo">
                  <IfaLightDemo />
                </div>
              ) : comp.key === 'book' ? (
                <div className="component-card__demo component-card__demo--live"
                  aria-label="IfaBook Ìwéfá — Interactive Demo">
                  <IfaBookDemo />
                </div>
              ) : (
                <div className="component-card__demo" aria-label={`${comp.demoText} — Demo coming soon`}>
                  <span className="component-card__demo-label">Demo</span>
                  <span className="component-card__demo-text">
                    [ {comp.demoText} ] — Animation / Demo Coming Soon
                  </span>
                </div>
              )}
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

/* ── Features Section ───────────────────────────────────────────────────────── */
function FeaturesSection() {
  return (
    <section className="section" id="features" aria-labelledby="feat-title">
      <div className="grad-divider" style={{ marginBottom:'72px' }} />
      <p className="section__eyebrow">Capabilities</p>
      <h2 className="section__title" id="feat-title">Key Features of IfaNote</h2>
      <p className="section__sub">
        Designed for the full depth and breadth of human knowledge — from the sub-atomic to
        the cosmic, from ancient Ifa wisdom to modern AI — all in one reactive environment.
      </p>

      <div className="features-grid">
        {FEATURES.map(f => (
          <div
            className="feature-card"
            key={f.title}
            style={{ '--fc': f.fc, '--fc-glow': f.fcg, '--fi': f.fi }}
          >
            <span className="feature-card__icon" aria-hidden="true">{f.icon}</span>
            <h3 className="feature-card__title">{f.title}</h3>
            <p className="feature-card__body">{f.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── Fields Section ─────────────────────────────────────────────────────────── */
function FieldsSection() {
  const byCategory = FIELDS.reduce((acc, f) => {
    (acc[f.cat] = acc[f.cat] || []).push(f);
    return acc;
  }, {});

  return (
    <div className="section--alt" style={{ padding:'1px 0' }}>
      <section className="section" id="fields" aria-labelledby="fields-title">
        <div className="grad-divider" style={{ marginBottom:'72px' }} />
        <p className="section__eyebrow">Universal Coverage</p>
        <h2 className="section__title" id="fields-title">Every Field of Knowledge</h2>
        <p className="section__sub">
          IfaNote is the Notebook for Everything — not a subject-specific tool, but a universal
          environment where every field becomes mathematical, polymathic, and deeply connected
          to all other fields through the axiomatic framework of the 256 Odu Ifa.
        </p>

        {Object.entries(byCategory).map(([cat, items]) => {
          const meta = CAT_META[cat] || { label: cat, css: '' };
          return (
            <div className="fields-group" key={cat}>
              <div className="fields-group-label" style={{ [meta.css.split(':')[0].slice(2)]: meta.css.split(':')[1] }}>
                <div style={{ width:'12px', height:'2px', borderRadius:'1px', background: meta.color, flexShrink:0 }} />
                {meta.label}
              </div>
              <div className="fields-row">
                {items.map(f => (
                  <span className={`field-tag field-tag--${f.cat}`} key={f.label}>{f.label}</span>
                ))}
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}

/* ── Audience Section ───────────────────────────────────────────────────────── */
function AudienceSection() {
  return (
    <section className="section" id="audience" aria-labelledby="aud-title">
      <div className="grad-divider" style={{ marginBottom:'72px' }} />
      <p className="section__eyebrow">Who is IfaNote for?</p>
      <h2 className="section__title" id="aud-title">
        The Notebook for Thinkers, Polymaths,<br/>and Geniuses in Every Field
      </h2>
      <p className="section__sub">
        IfaNote's motto:{' '}
        <strong style={{ color:'var(--amber)' }}>"Think Everything. Code Everything. Know Everything."</strong>
        <br/>Built for minds that refuse to be boxed into one discipline.
      </p>
      <div className="audience-grid">
        {AUDIENCE.map(a => (
          <div className="audience-card" key={a.label}>
            <span className="audience-card__sym" aria-hidden="true">{a.sym}</span>
            <span className="audience-card__label">{a.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── Roadmap Section ────────────────────────────────────────────────────────── */
function RoadmapSection() {
  return (
    <div className="section--alt" style={{ padding:'1px 0' }}>
      <section className="section" id="roadmap" aria-labelledby="road-title">
        <div className="grad-divider" style={{ marginBottom:'72px' }} />
        <p className="section__eyebrow">Development Roadmap</p>
        <h2 className="section__title" id="road-title">IfaNote is Built in Phases</h2>
        <p className="section__sub">
          Like the Odu Ifa — deep, layered, and progressively revealed. IfaNote is developed
          in four phases, each expanding the depth and universality of the environment.
        </p>

        <div className="timeline">
          {PHASES.map(p => (
            <div className="timeline-item" key={p.num}>
              <div className="timeline-item__header">
                <span className="timeline-item__badge">{p.num}</span>
                <span className="timeline-item__title">{p.title}</span>
              </div>
              <div className="timeline-item__body">{p.body}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

/* ── CTA Banner ─────────────────────────────────────────────────────────────── */
function CTABanner() {
  return (
    <div className="cta-banner">
      <div className="cta-banner__inner">
        <h2 className="cta-banner__title">
          Join the IfaNote Community
        </h2>
        <p className="cta-banner__sub">
          IfaNote is open-source and built by the global community of thinkers, polymaths,
          and geniuses who believe every field of knowledge deserves to be mathematical,
          universal, and deeply unified. Be part of the most ambitious notebook ever built.
        </p>
        <div className="cta-banner__actions">
          <a className="btn-primary" href="https://ifainternet.org" target="_blank" rel="noopener">
            Visit IFA Internet
          </a>
          <a className="btn-secondary" href="#roadmap">View Roadmap</a>
          <a className="btn-ghost" href="#about">Learn More</a>
        </div>
      </div>
    </div>
  );
}

/* ── Footer ─────────────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="footer-wrap">
      <div className="footer">
        <div>
          <div className="footer__brand">IfaNote</div>
          <div className="footer__tagline">IFA = Ifa For All — The Notebook for Everything</div>
          <div className="footer__copy">© 2025 CENProject · The IFA Internet</div>
        </div>
        <ul className="footer__links">
          <li><a href="https://ifainternet.org"                                          target="_blank" rel="noopener">IFA Internet</a></li>
          <li><a href="https://playifagames.org/ayo-oloponfa/"                             target="_blank" rel="noopener">Ayo Oloponfa Platform</a></li>
          <li><a href="https://ifainternet.org/ifa-computing/"                           target="_blank" rel="noopener">Ifa Computing</a></li>
          <li><a href="https://toe.cenproject.org"                                        target="_blank" rel="noopener">TOE</a></li>
        </ul>
      </div>
      <div className="footer__bottom">
        <span className="footer__aka">Also known as:</span>
        {['IfaNoteBook','Consciousness Notebook','ToE NoteBook','IFABOK Notebook',
          'The Notebook for Everything (NotoE)','Energy-Based Notebook','ToENote',
          'Orisa Note','OrisaNote','Orisa NoteBook','OrisaNoteBook',
          'IfaPad','Ifa Pad','Orisa Pad','OrisaPad','ToE Pad','Ifa Tablet','IfaTab','Orisa Tablet','OrisaTab',
          'Ifa Notepad','Orisa Notepad','IFABOK Journal','IFA Internet Journal',
        ].map(n => (
          <span className="footer__pill" key={n}>{n}</span>
        ))}
      </div>
    </footer>
  );
}

/* ── Platform Preview Section ────────────────────────────────────────────────── */
function PlatformPreview({ onWatchIntro, sectionRef }) {
  return (
    <section id="preview" className="preview-section" ref={sectionRef} aria-labelledby="preview-title">
      <div className="grad-divider" style={{ marginBottom: '72px' }} />
      <div className="preview-section__eyebrow">
        <span className="preview-section__dot" aria-hidden="true" />
        Platform Walkthrough
      </div>
      <h2 className="preview-section__title" id="preview-title">
        See IfaNote <span className="preview-title-grad">in Action</span>
      </h2>
      <p className="preview-section__sub">
        A 4-minute animated walkthrough through all 20 scenes of the platform — no reading required.
        Watch it, then explore at your own pace.
      </p>

      <div
        className="preview-card"
        onClick={onWatchIntro}
        role="button"
        tabIndex={0}
        onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onWatchIntro()}
        aria-label="Watch IfaNote intro video — click to play"
      >
        <video
          className="preview-card__video"
          src="./video/ifanote-intro.mp4"
          preload="metadata"
          muted
          playsInline
        />
        <div className="preview-card__overlay" aria-hidden="true" />
        <div className="preview-card__play-btn" aria-hidden="true">
          <span className="preview-card__play-ring" />
          <span className="preview-card__play-ring preview-card__play-ring--2" />
          <span className="preview-card__play-icon">▶</span>
        </div>
        <div className="preview-card__caption" aria-hidden="true">
          <span className="preview-card__cap-title">IfaNote — The Notebook for Everything</span>
          <span className="preview-card__cap-sub">4 min · 20 scenes · HD</span>
        </div>
      </div>

      <div className="preview-stats">
        <span className="preview-stat preview-stat--amber">✦ 20 Scenes</span>
        <span className="preview-stat preview-stat--electric">⏱ 4 Minutes</span>
        <span className="preview-stat preview-stat--jade">∞ All Fields</span>
      </div>
      <p className="preview-skip">
        Or <a href="#about" className="preview-skip__link">browse the platform below ↓</a>
      </p>
    </section>
  );
}

/* ── Intro Lightbox ──────────────────────────────────────────────────────────── */
function IntroLightbox({ onClose }) {
  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="intro-lb"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label="IfaNote intro video"
    >
      <div className="intro-lb__frame">
        <button className="intro-lb__close" onClick={onClose} aria-label="Close intro video">✕</button>
        <iframe
          src="./video/ifanote-intro.html"
          title="IfaNote Introduction"
          allow="autoplay"
          className="intro-lb__iframe"
        />
      </div>
    </div>
  );
}

/* ── Sticky Float Tab ────────────────────────────────────────────────────────── */
function IntroFloatTab({ visible, onWatchIntro }) {
  return (
    <button
      className={'intro-float' + (visible ? ' intro-float--show' : '')}
      onClick={onWatchIntro}
      aria-label="Watch IfaNote intro video"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
    >
      <span className="intro-float__ring" aria-hidden="true" />
      <span className="intro-float__icon" aria-hidden="true">▶</span>
      <span className="intro-float__label">Intro</span>
    </button>
  );
}

/* ── App Root ───────────────────────────────────────────────────────────────── */
function App() {
  const [showIntro, setShowIntro] = useState(false);
  const [floatShow, setFloatShow] = useState(false);
  const previewRef = useRef(null);

  useEffect(() => {
    const el = previewRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const obs = new IntersectionObserver(
      ([entry]) => setFloatShow(!entry.isIntersecting),
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const openIntro  = () => {
    // position:fixed inside an iframe is broken on mobile browsers (iOS Safari especially).
    // The standalone URL works fine, so on touch devices open it in a new tab instead.
    const isTouchDevice = ('ontouchstart' in window) || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      window.open('./video/ifanote-intro.html', '_blank', 'noopener');
    } else {
      setShowIntro(true);
    }
  };
  const closeIntro = () => setShowIntro(false);

  return (
    <div className="page">
      <Navbar />
      <main>
        <Hero onWatchIntro={openIntro} />
        <PlatformPreview onWatchIntro={openIntro} sectionRef={previewRef} />
        <AboutSection />
        <IfaShellKernelSection />
        <ComponentsSection />
        <IfaNotebookSection />
        <FeaturesSection />
        <FieldsSection />
        <AudienceSection />
        <RoadmapSection />
        <CTABanner />
      </main>
      <Footer />
      {showIntro && <IntroLightbox onClose={closeIntro} />}
      <IntroFloatTab visible={floatShow} onWatchIntro={openIntro} />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
