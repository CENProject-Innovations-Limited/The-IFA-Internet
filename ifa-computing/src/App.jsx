/* ─────────────────────────────────────────────────────────────
   Ifa Computing — ComputoE · The Computer for Everything
   The IFA Internet · CENProject · toe.cenproject.org
───────────────────────────────────────────────────────────── */

const { useState, useEffect, useRef } = React;

// ── OgbeSymbol (SymboE — Ogbe Energy Symbol canvas) ──────────
function OgbeSymbol({ size = 44 }) {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const s = size;
    canvas.width  = s;
    canvas.height = s;
    const ctx = canvas.getContext('2d');
    const cx = s / 2, cy = s / 2, r = s * 0.36;
    const gold = '#f5c518';
    ctx.clearRect(0, 0, s, s);
    const draw = (alpha, lineW) => {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = gold;
      ctx.lineWidth   = lineW;
      ctx.lineCap     = 'round';
      for (let rot = 0; rot < 2; rot++) {
        ctx.beginPath();
        for (let t = 0; t <= Math.PI * 2; t += 0.01) {
          const scale = Math.cos(2 * t) >= 0 ? Math.sqrt(Math.cos(2 * t)) : 0;
          const x = cx + (rot === 0 ? 1 : 0) * r * scale * Math.cos(t) +
                         (rot === 1 ? 1 : 0) * r * scale * Math.sin(t);
          const y = cy + (rot === 0 ? 1 : 0) * r * scale * Math.sin(t) +
                         (rot === 1 ? 1 : 0) * r * scale * Math.cos(t);
          t < 0.02 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      ctx.restore();
    };
    draw(0.12, s * 0.22);
    draw(0.22, s * 0.13);
    draw(0.55, s * 0.055);
    draw(1.00, s * 0.022);
  }, [size]);
  return React.createElement('canvas', { ref, width: size, height: size,
    style: { display: 'block', flexShrink: 0, marginTop: '1px' } });
}

// ── OyekuSymbol (SymboN — Oyeku Anergy Symbol canvas) ─────────
function OyekuSymbol({ size = 44 }) {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const s = size;
    canvas.width  = s;
    canvas.height = s;
    const ctx = canvas.getContext('2d');
    const cx = s / 2, cy = s / 2, r = s * 0.36;
    const gold = '#f5c518';
    ctx.clearRect(0, 0, s, s);
    const drawLobes = (alpha, lineW) => {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = gold;
      ctx.lineWidth   = lineW;
      ctx.lineCap     = 'round';
      for (let rot = 0; rot < 2; rot++) {
        ctx.beginPath();
        for (let t = 0; t <= Math.PI * 2; t += 0.01) {
          const scale = Math.cos(2 * t) >= 0 ? Math.sqrt(Math.cos(2 * t)) : 0;
          const x = cx + (rot === 0 ? 1 : 0) * r * scale * Math.cos(t) +
                         (rot === 1 ? 1 : 0) * r * scale * Math.sin(t);
          const y = cy + (rot === 0 ? 1 : 0) * r * scale * Math.sin(t) +
                         (rot === 1 ? 1 : 0) * r * scale * Math.cos(t);
          t < 0.02 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      ctx.restore();
    };
    drawLobes(0.12, s * 0.22);
    drawLobes(0.22, s * 0.13);
    drawLobes(0.55, s * 0.055);
    drawLobes(1.00, s * 0.022);
    const ext = s * 0.30;
    const diag = [[cx + ext, cy - ext], [cx - ext, cy + ext]];
    const drawDiag = (alpha, lineW, blur) => {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = gold;
      ctx.lineWidth   = lineW;
      ctx.lineCap     = 'round';
      ctx.shadowColor = gold;
      ctx.shadowBlur  = blur;
      ctx.beginPath();
      ctx.moveTo(diag[0][0], diag[0][1]);
      ctx.lineTo(diag[1][0], diag[1][1]);
      ctx.stroke();
      ctx.restore();
    };
    drawDiag(0.03, s * 0.20, s * 0.12);
    drawDiag(0.07, s * 0.12, s * 0.08);
    drawDiag(0.16, s * 0.07, s * 0.05);
    drawDiag(0.34, s * 0.03, s * 0.03);
    drawDiag(0.62, s * 0.014, s * 0.015);
    drawDiag(0.90, s * 0.007, s * 0.007);
    drawDiag(0.95, s * 0.003, s * 0.003);
  }, [size]);
  return React.createElement('canvas', { ref, width: size, height: size,
    style: { display: 'block', flexShrink: 0, marginTop: '1px' } });
}

// ── MetaCircleCanvas (IfaZero / IfaOne Metarepresentation) ─────
function MetaCircleCanvas({ gold = true, size = 44 }) {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const DPR = window.devicePixelRatio || 1;
    canvas.width        = size * DPR;
    canvas.height       = size * DPR;
    canvas.style.width  = size + 'px';
    canvas.style.height = size + 'px';
    const ctx = canvas.getContext('2d');
    ctx.scale(DPR, DPR);
    const cx = size / 2, cy = size / 2;
    const R   = size * 0.360;   /* circle radius  */
    const ARR = size * 0.135;   /* arrowhead size */

    /* Full-circle glow layers */
    const circL = gold
      ? [[2.2,'rgba(245,197,24,0.15)',5],[1.0,'rgba(245,197,24,0.58)',2.5],[0.5,'rgba(255,248,210,0.92)',1]]
      : [[2.2,'rgba(225,35,65,0.18)', 4],[1.0,'rgba(235,55,80,0.65)', 2.5],[0.5,'rgba(255,120,140,0.88)',1]];
    for (const [lw, color, blur] of circL) {
      ctx.save();
      ctx.strokeStyle = color; ctx.lineWidth = lw;
      ctx.shadowColor = color; ctx.shadowBlur = blur;
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, 2 * Math.PI); ctx.stroke();
      ctx.restore();
    }

    /* Arrowhead: IfaZero tip at right (cx+R, cy); IfaOne tip at left (cx-R, cy); both angle π/2 (↓) */
    const tipX = gold ? cx + R : cx - R;
    const angle = Math.PI / 2;
    const arrL = gold
      ? [['rgba(245,197,24,0.42)',7],['rgba(255,248,210,0.92)',1.5]]
      : [['rgba(225,35,65,0.44)', 6],['rgba(255,120,140,0.90)',1.5]];
    for (const [color, blur] of arrL) {
      ctx.save();
      ctx.translate(tipX, cy); ctx.rotate(angle);
      ctx.shadowColor = color; ctx.shadowBlur = blur; ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(-ARR, -ARR * 0.44);
      ctx.lineTo(-ARR,  ARR * 0.44);
      ctx.closePath(); ctx.fill();
      ctx.restore();
    }

    /* Centre dot */
    const dotColor = gold ? 'rgba(245,197,24,1)'  : 'rgba(230,40,65,1)';
    const dotFill  = gold ? 'rgba(255,248,210,1)' : 'rgba(255,170,185,1)';
    ctx.save();
    ctx.shadowColor = dotColor; ctx.shadowBlur = 7;
    ctx.fillStyle = dotFill;
    ctx.beginPath(); ctx.arc(cx, cy, 1.8, 0, 2 * Math.PI); ctx.fill();
    ctx.restore();
  }, [gold, size]);
  return React.createElement('canvas', { ref,
    style: { display:'block', flexShrink:0, marginTop:'1px' } });
}

// ── Five Pillars of Ifa Computing ─────────────────────────────
const PILLARS = [
  {
    id: 'ifabit',
    name: 'IfaBit',
    abbr: 'TOEBit · CENBit · EnergyBit',
    icon: '⬡',
    accent: '#00d9b8',
    url: 'https://toe.cenproject.org/ifabit-overview/',
    desc: 'The fundamental building block of all information — unifying classical bits, qubits, and all computational units within the IFA Binary System. Nature\'s own instruction set.',
  },
  {
    id: 'info',
    name: 'Ifa Information',
    abbr: 'InfoE · Information for Everything',
    icon: '◈',
    accent: '#4361ee',
    url: 'https://toe.cenproject.org/ifa-information/',
    desc: 'The Grand Unified Theory of Information Science — container of all theories, models, and systems of information, from classical Shannon theory to quantum to consciousness-based InfoE.',
  },
  {
    id: 'algo',
    name: 'Ifa Algorithm',
    abbr: 'Ifalgo · AlgoE · TOE Algorithm',
    icon: '⟳',
    accent: '#f5c518',
    url: 'https://toe.cenproject.org/ifa-algorithm/',
    desc: 'The Algorithm for Everything — the foundational framework unifying all algorithms across computer science, engineering, mathematics, and every field of knowledge through the 16 Odu Axioms.',
  },
  {
    id: 'prog',
    name: 'Ifa Programming',
    abbr: 'IfaProg · Energy Programming',
    icon: '⌥',
    accent: '#e9498a',
    url: 'https://toe.cenproject.org/ifa-algorithm/',
    desc: 'Programming through Ifa principles — writing algorithms, designing systems, and engineering software using the 256 Odu Ifa as the universal programming matrix and design pattern library.',
  },
  {
    id: 'lang',
    name: 'Ifa Language',
    abbr: 'IfaLang · IfaPL · Language for Everything',
    icon: '⌘',
    accent: '#7c4dff',
    url: 'https://toe.cenproject.org/ifa-language/',
    desc: 'The Language for Everything — one meta-language unifying all programming languages, formal systems, and natural languages through the single IfaLine: Energy (CEN).',
  },
];

// ── IfaBit: Four Computational Unit Types ─────────────────────
const BIT_TYPES = [
  {
    name: 'Classical Bit',
    symbol: '0 | 1',
    states: '2',
    framework: 'Binary Logic',
    accent: '#8b92a8',
    desc: 'The traditional binary unit — encodes information as either 0 or 1. The foundation of all classical computing, from transistors to modern supercomputers.',
  },
  {
    name: 'Qubit',
    symbol: '|ψ⟩',
    states: '∞ (superposed)',
    framework: 'Quantum Mechanics',
    accent: '#0099ff',
    desc: 'The quantum bit — exists in superposition of 0 and 1 simultaneously until measured. Enables exponential computational power for specific classes of problems.',
  },
  {
    name: 'IFABit',
    symbol: 'O · |',
    states: '256 (Odu-complete)',
    framework: 'IFA Binary System',
    accent: '#00d9b8',
    desc: 'The Ifa bit — the universal computational unit encoding all possible information states through the Ogbe–Oyeku (O·|) pair. Unifies classical, quantum, and all computational paradigms into one.',
  },
  {
    name: 'N-it',
    symbol: 'Nₙ',
    states: 'N (base-N)',
    framework: 'IfaComputer',
    accent: '#ff6b35',
    desc: 'The generalized N-base unit — bridges classical and quantum systems, enabling computation in any base or dimensional framework through the IFABit superstructure.',
  },
];

// ── Ifa Information Components ─────────────────────────────────
const INFO_COMPONENTS = [
  {
    name: 'The Dafa',
    icon: '◎',
    accent: '#00d9b8',
    desc: 'Data encoded in IfaLang — information formatted within the Ifa Information System for efficient processing and universal representation across all fields.',
  },
  {
    name: 'InfoE Theory',
    icon: '◈',
    accent: '#4361ee',
    desc: 'The universe of all information theories — classical Shannon information, quantum information, and consciousness-based InfoE unified under one axiomatic framework.',
  },
  {
    name: 'IfaInfo',
    icon: '◉',
    accent: '#f5c518',
    desc: 'Output from an Ifa Computer — analyzed, contextualized, and processed through IfaLang. Structured intelligence produced by Ifa-based computational systems.',
  },
  {
    name: 'IfaComms',
    icon: '◌',
    accent: '#e9498a',
    desc: 'Grand Unified Theory of Communications — unifying all communication technologies, protocols, and management systems under the Ifa Information framework.',
  },
  {
    name: 'InfoE Algebras',
    icon: '⊕',
    accent: '#7c4dff',
    desc: 'Foundational mathematical structures expressed as IFAGebras — the algebraic backbone of Ifa Information Science, connecting all information theories mathematically.',
  },
  {
    name: 'Ẹ̀là Unit',
    icon: '⊛',
    accent: '#ff6b35',
    desc: 'The measurement standard for Ifa\'s internetworking and integration capabilities — the quantum of connectivity binding the IFA Internet together.',
  },
];

// ── Ifalgorithm: Five Core Principles ─────────────────────────
const ALGO_PRINCIPLES = [
  {
    n: '01',
    title: 'Comprehensive Framework',
    accent: '#00d9b8',
    desc: 'Integrates algorithms from all fields — computer science, engineering, mathematics, life sciences — into one robust, unified structure built on the 16 Odu Ifa as natural axioms.',
  },
  {
    n: '02',
    title: 'Advanced Scalability',
    accent: '#4361ee',
    desc: 'Adapts seamlessly across scales — from micro-algorithms governing subatomic processes to macro-algorithms governing cosmic systems and societal structures.',
  },
  {
    n: '03',
    title: 'Cross-Disciplinary Insight',
    accent: '#f5c518',
    desc: 'Bridges computer science, engineering, biology, economics, and beyond — revealing the universal algorithmic intelligence underlying all fields through Ifa principles.',
  },
  {
    n: '04',
    title: 'Unified Approach',
    accent: '#e9498a',
    desc: 'One cohesive framework for all algorithmic solutions — eliminating fragmentation between disciplines by grounding every algorithm in Ifa Mathematics (IfaGebra).',
  },
  {
    n: '05',
    title: 'Future-Focused Design',
    accent: '#7c4dff',
    desc: 'Accommodates emerging technologies and innovations — designed to evolve with the frontier of computation, quantum systems, and AI without requiring foundational redesign.',
  },
];

// ── Ifa Language Computing Features ───────────────────────────
const LANG_FEATURES = [
  {
    name: 'IfaPL',
    subtitle: 'Programming Language for Everything',
    icon: '{ }',
    accent: '#00d9b8',
    desc: 'Energy (CEN) — the single Matrix uniting all programming languages as One. IfaPL treats every programming paradigm as a dialect of the universal IfaLang meta-grammar.',
  },
  {
    name: 'IfaScript',
    subtitle: 'Command-Line Access · System Integration',
    icon: '$ _',
    accent: '#4361ee',
    desc: 'Command-line access to IfaLang for software integration — enabling system-level interaction and technical implementation across all Ifa Computing platforms and environments.',
  },
  {
    name: 'IfaLens',
    subtitle: 'Sensor for Everything',
    icon: '◎',
    accent: '#f5c518',
    desc: 'A Sensor for Everything — builds complex linguistic structures for knowledge integration, treating all domains as queryable, computable, and cross-referenceable information systems.',
  },
  {
    name: 'XaaL Model',
    subtitle: 'X-as-a-Language',
    icon: '⟺',
    accent: '#e9498a',
    desc: 'Any field as a Language — engineering, economics, medicine, physics each become a language with grammar, syntax, and semantics fully computable through IfaLang.',
  },
  {
    name: 'Orisa Languages',
    subtitle: 'Domain Specializations',
    icon: '⬡',
    accent: '#7c4dff',
    desc: 'OgunLang (engineering), EsuLang (networking/logic), SangoLang (electrical systems) — specialized computational dialects embodying each Orisa\'s architectural intelligence.',
  },
  {
    name: 'IfaComms Protocol',
    subtitle: 'Grand Unified Communications',
    icon: '⊸',
    accent: '#ff6b35',
    desc: 'The communication backbone of the IFA Internet — a unified protocol framework encoding all networking, signaling, and data exchange standards within the IfaLang meta-system.',
  },
];

// ── Computer Types ─────────────────────────────────────────────
const COMPUTER_TYPES = [
  { name: 'Ifa Computer',       bits: '256-iBit', system: 'Odu Ifa (256)',       accent: '#f5c518' },
  { name: 'Oosa Computer',      bits: '16-iBit',  system: 'Erindinlogun (16)',    accent: '#e9498a' },
  { name: 'I Ching System',     bits: '64-iBit',  system: 'I Ching (64)',         accent: '#4361ee' },
  { name: 'Classical Computer', bits: 'Bit',      system: 'Binary (0|1)',         accent: '#8b92a8' },
  { name: 'Quantum Computer',   bits: 'Qubit',    system: 'Superposition',        accent: '#0099ff' },
];

// ── Kids Platform Promo ────────────────────────────────────────
function KidsPromoSection() {
  return (
    <section id="kids" className="kids-promo">
      <div className="container">
        <div className="kids-promo__card">
          <div className="kids-promo__blobs" aria-hidden="true">
            <div className="kids-promo__blob kids-promo__blob--1" />
            <div className="kids-promo__blob kids-promo__blob--2" />
          </div>
          <div className="kids-promo__inner">
            <div className="kids-promo__badge">🌟 Ifa Computer for Kids &amp; Teens</div>
            <h2 className="kids-promo__title">
              <span style={{ color: '#f5c518' }}>Learn.</span>{' '}
              <span style={{ color: '#00d9b8' }}>Think.</span>{' '}
              <span style={{ color: '#7c4dff' }}>Build.</span>
            </h2>
            <p className="kids-promo__desc">
              Master Ifa Matrix Math using cowrie shells, sacred palm nuts, kolanut &amp; Opele seeds —
              or your favourite shapes. Build matrices, compute results, and become a thinker and
              polymath in any career you choose!
            </p>
            <div className="kids-promo__features">
              {['Ifa Matrix Playground', 'Yoruba Native Items', 'Add · Subtract · Multiply', '2×2 &amp; 3×3 Matrices'].map((f, i) => (
                <span key={i} className="kids-promo__feat">{f}</span>
              ))}
            </div>
            <a href="kids/" className="kids-promo__cta">
              Open Ifa Computer for Kids 🚀
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Header ─────────────────────────────────────────────────────
function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <header className={`header${scrolled ? ' header--scrolled' : ''}`}>
      <div className="header__inner">
        <a href="https://ifainternet.org" className="header__back" target="_blank" rel="noopener noreferrer">
          <span className="header__back-arrow">←</span>
          <span>The IFA Internet</span>
        </a>
        <div className="header__brand">
          <span className="header__brand-icon">⬡</span>
          <span className="header__brand-name">IFA Computing</span>
        </div>
        <nav className="header__nav">
          <a className="nav-link" href="#pillars">Pillars</a>
          <a className="nav-link" href="#ifabit">IfaBit</a>
          <a className="nav-link" href="#information">Information</a>
          <a className="nav-link" href="#algorithm">Algorithm</a>
          <a className="nav-link" href="#language">Language</a>
          <a className="nav-link" href="kids/">Kids 🌟</a>
          <a
            className="nav-link nav-link--cta"
            href="https://toe.cenproject.org/ifa-computer/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ifa Computer →
          </a>
        </nav>
      </div>
    </header>
  );
}

// ── Hero ───────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="hero">
      <div className="hero__bg">
        <div className="hero__circuit-grid" />
        <div className="hero__glow hero__glow--teal" />
        <div className="hero__glow hero__glow--blue" />
      </div>

      {/* Animated circuit nodes */}
      <div className="hero__nodes" aria-hidden="true">
        {[...Array(14)].map((_, i) => (
          <div
            key={i}
            className="hero__node"
            style={{
              '--nx': `${[8,18,30,42,55,67,78,88,14,35,50,65,80,92][i]}%`,
              '--ny': `${[15,72,28,60,18,80,35,55,45,85,10,65,90,40][i]}%`,
              '--nd': `${i * 0.45}s`,
              '--ns': `${2.5 + (i % 4) * 0.6}s`,
            }}
          />
        ))}
      </div>

      {/* Odu binary stream — O and | */}
      <div className="hero__stream" aria-hidden="true">
        {['O|OO||O|', '||O|OO||', 'OO||O|OO', '|OO||OO|', 'O||OO||O'].map((s, i) => (
          <div
            key={i}
            className="hero__stream-col"
            style={{ '--sc-delay': `${i * 1.3}s`, '--sc-left': `${i * 20 + 2}%` }}
          >
            {s.split('').map((c, j) => (
              <span key={j} className="hero__stream-char" style={{ '--char-delay': `${j * 0.15}s` }}>{c}</span>
            ))}
          </div>
        ))}
      </div>

      {/* IfaLine stream — I and II */}
      <div className="hero__stream hero__stream--ifaline" aria-hidden="true">
        {[
          ['|','||','|','||','|','||','|','||'],
          ['||','|','||','|','||','|','||','|'],
          ['|','|','||','||','|','|','||','||'],
          ['||','||','|','|','||','||','|','|'],
          ['|','||','||','|','|','||','|','||'],
        ].map((col, i) => (
          <div
            key={i}
            className="hero__stream-col hero__stream-col--ifaline"
            style={{ '--sc-delay': `${i * 1.7 + 0.6}s`, '--sc-left': `${i * 20 + 12}%` }}
          >
            {col.map((c, j) => (
              <span key={j} className="hero__stream-char hero__stream-char--ifaline" style={{ '--char-delay': `${j * 0.2}s` }}>{c}</span>
            ))}
          </div>
        ))}
      </div>

      <div className="hero__inner">
        <div className="hero__eyebrow">
          <span className="hero__eyebrow-dot" />
          The IFA Internet · iTOE Platform
        </div>

        <h1 className="hero__title">
          <span className="hero__title-ifa">Ifa</span>
          <span className="hero__title-main">Computing</span>
        </h1>

        <p className="hero__subtitle">ComputoE — The Computer for Everything</p>

        <p className="hero__desc">
          Redefining computation through the Energy-based principles of Ifa and Orisa.
          The 256 Odu Ifa as the universal instruction set — encoding every possible
          computational state of Consciousness-Energy (CEN).
        </p>

        <div className="hero__stats">
          {[
            { v: '256', l: 'IFABit States' },
            { v: '16',  l: 'Ifa Axioms' },
            { v: '16',  l: 'Core Pillars' },
            { v: '∞',   l: 'Computations' },
          ].map(s => (
            <div key={s.l} className="hero__stat">
              <div className="hero__stat-value">{s.v}</div>
              <div className="hero__stat-label">{s.l}</div>
            </div>
          ))}
        </div>

        <div className="hero__ctas">
          <a className="btn btn--primary" href="#pillars">Explore IFA Computing ↓</a>
          <a
            className="btn btn--ghost"
            href="https://toe.cenproject.org/ifa-computer/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ifa Computer →
          </a>
        </div>
      </div>
    </section>
  );
}

// ── Pillars Section ────────────────────────────────────────────
function PillarsSection() {
  return (
    <section id="pillars" className="section">
      <div className="container">
        <div className="section__header">
          <span className="section__eyebrow" style={{ color: '#00d9b8' }}>16 Pillars · One Unified Framework</span>
          <h2 className="section__title">What is <span style={{ color: '#00d9b8' }}>Ifa Computing</span>?</h2>
          <p className="section__desc">
            Ifa Computing (ComputoE) redefines what a computer is, what computation means, and what
            information can be — grounded in the 256 Odu Ifa as the universe's original instruction set.
            256 interconnected Pillars (Odufa) form the complete science of Ifa-based computation.
          </p>
        </div>

        <div className="pillars-grid">
          {PILLARS.map(p => (
            <a
              key={p.id}
              href={p.url}
              className="pillar-card"
              style={{ '--pc-accent': p.accent }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="pillar-card__top" />
              <div className="pillar-card__icon">{p.icon}</div>
              <div className="pillar-card__name">{p.name}</div>
              <div className="pillar-card__abbr">{p.abbr}</div>
              <p className="pillar-card__desc">{p.desc}</p>
              <div className="pillar-card__cta">Explore →</div>
            </a>
          ))}
        </div>

        {/* Computer types comparison strip */}
        <div className="comp-types">
          <div className="comp-types__label">Ifa Computer Systems</div>
          <div className="comp-types__row">
            {COMPUTER_TYPES.map((c, i) => (
              <div key={i} className="comp-type" style={{ '--ct-accent': c.accent }}>
                <div className="comp-type__name">{c.name}</div>
                <div className="comp-type__bits">{c.bits}</div>
                <div className="comp-type__system">{c.system}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── IfaBit Section ─────────────────────────────────────────────
function IfaBitSection() {
  const [active, setActive] = useState(2); // default to IFABit

  const bit = BIT_TYPES[active];

  return (
    <section id="ifabit" className="section section--alt">
      <div className="container">
        <div className="section__header">
          <span className="section__eyebrow" style={{ color: '#00d9b8' }}>IfaBit · TOEBit · CENBit · EnergyBit</span>
          <h2 className="section__title">The <span style={{ color: '#00d9b8' }}>Universal Bit</span></h2>
          <p className="section__desc">
            IFABit is Nature's own information unit — the fundamental building block of all computation.
            It unifies classical bits, quantum bits, and generalized N-its within the IFA Binary System,
            grounded in the Ogbe–Oyeku pair: the primal duality of all information.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="bit-tabs">
          {BIT_TYPES.map((b, i) => (
            <button
              key={i}
              className={`bit-tab${active === i ? ' bit-tab--active' : ''}`}
              style={{ '--bt-accent': b.accent }}
              onClick={() => setActive(i)}
            >
              <div className="bit-tab__symbol">{b.symbol}</div>
              <div className="bit-tab__name">{b.name}</div>
            </button>
          ))}
        </div>

        {/* Active bit detail */}
        <div className="bit-detail" style={{ '--bd-accent': bit.accent }}>
          <div className="bit-detail__left">
            <div className="bit-detail__symbol-large">{bit.symbol}</div>
            <div className="bit-detail__meta-grid">
              <div className="bit-detail__meta-item">
                <div className="bit-detail__meta-label">States</div>
                <div className="bit-detail__meta-val" style={{ color: bit.accent }}>{bit.states}</div>
              </div>
              <div className="bit-detail__meta-item">
                <div className="bit-detail__meta-label">Framework</div>
                <div className="bit-detail__meta-val" style={{ color: bit.accent }}>{bit.framework}</div>
              </div>
            </div>
          </div>
          <div className="bit-detail__right">
            <div className="bit-detail__name">{bit.name}</div>
            <p className="bit-detail__desc">{bit.desc}</p>
          </div>
        </div>

        {/* Ogbe–Oyeku pair */}
        <div className="odu-pair">
          <div className="odu-pair__side" style={{ '--op-col': '#f5c518' }}>
            <div className="odu-pair__glyph">O</div>
            <div className="odu-pair__name">Ogbe</div>
            <div className="odu-pair__tags">
              <span>Energy</span><span>IfaZero</span><span>0</span>
            </div>
          </div>
          <div className="odu-pair__divider">
            <div className="odu-pair__line" />
            <div className="odu-pair__label">IFABit Pair</div>
            <div className="odu-pair__arrow">⟷</div>
            <div className="odu-pair__line" />
          </div>
          <div className="odu-pair__side" style={{ '--op-col': '#e8ecf5' }}>
            <div className="odu-pair__glyph">|</div>
            <div className="odu-pair__name">Oyeku</div>
            <div className="odu-pair__tags">
              <span>Anergy</span><span>IfaOne</span><span>1</span>
            </div>
          </div>
        </div>

        <div className="section__cta-row">
          <a
            href="https://toe.cenproject.org/ifabit-overview/"
            className="btn btn--outline"
            target="_blank"
            rel="noopener noreferrer"
            style={{ '--btn-col': '#00d9b8' }}
          >
            Full IfaBit Overview →
          </a>
        </div>
      </div>
    </section>
  );
}

// ── Ifa Binary Encoding Scheme ────────────────────────────────
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
                  <OgbeSymbol size={44} />
                  <div className="ifa-binary__meta-text">
                    <strong>DuoInfinity · InfinitoE</strong>
                    <p>Ifa Infinity — crossed with ∞; renders circling. The Infinity for Everything.</p>
                  </div>
                </li>
                <li className="ifa-binary__meta">
                  <MetaCircleCanvas gold={true} size={44} />
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
                  <OyekuSymbol size={44} />
                  <div className="ifa-binary__meta-text">
                    <strong>DuoInfinity · NinfinitoE</strong>
                    <p>Ifa Ninfinity — DuoInfinity with "J" dash. NanInfinity. Dual of Infinity.</p>
                  </div>
                </li>
                <li className="ifa-binary__meta">
                  <MetaCircleCanvas gold={false} size={44} />
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

// ── Computing Systems SVGs & Section ────────────────────────────

function IkinSVG() {
  return (
    <svg viewBox="0 0 155 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="cs-ik-bg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1a1205" />
          <stop offset="100%" stopColor="#06080e" />
        </radialGradient>
        <radialGradient id="cs-ik-n" cx="35%" cy="30%" r="60%">
          <stop offset="0%" stopColor="#3d1e0a" />
          <stop offset="100%" stopColor="#0d0804" />
        </radialGradient>
      </defs>
      <rect width="155" height="100" fill="url(#cs-ik-bg)" />
      {/* Nut 1 */}
      <ellipse cx="38" cy="52" rx="9" ry="6.5" fill="url(#cs-ik-n)" />
      <ellipse cx="34" cy="49" rx="2.5" ry="1.8" fill="rgba(255,220,100,0.08)" />
      <circle cx="36" cy="50" r="1.1" fill="#060402" /><circle cx="39" cy="49" r="1.1" fill="#060402" /><circle cx="37" cy="53" r="1.1" fill="#060402" /><circle cx="40" cy="53" r="1.1" fill="#060402" />
      {/* Nut 2 */}
      <ellipse cx="55" cy="42" rx="9" ry="6.5" fill="url(#cs-ik-n)" />
      <ellipse cx="51" cy="39" rx="2.5" ry="1.8" fill="rgba(255,220,100,0.08)" />
      <circle cx="53" cy="40" r="1.1" fill="#060402" /><circle cx="56" cy="39" r="1.1" fill="#060402" /><circle cx="54" cy="44" r="1.1" fill="#060402" /><circle cx="57" cy="44" r="1.1" fill="#060402" />
      {/* Nut 3 */}
      <ellipse cx="46" cy="63" rx="9" ry="6.5" fill="url(#cs-ik-n)" />
      <ellipse cx="42" cy="60" rx="2.5" ry="1.8" fill="rgba(255,220,100,0.08)" />
      <circle cx="44" cy="61" r="1.1" fill="#060402" /><circle cx="47" cy="60" r="1.1" fill="#060402" /><circle cx="45" cy="65" r="1.1" fill="#060402" /><circle cx="48" cy="65" r="1.1" fill="#060402" />
      {/* Nut 4 */}
      <ellipse cx="65" cy="55" rx="9" ry="6.5" fill="url(#cs-ik-n)" />
      <ellipse cx="61" cy="52" rx="2.5" ry="1.8" fill="rgba(255,220,100,0.08)" />
      <circle cx="63" cy="53" r="1.1" fill="#060402" /><circle cx="66" cy="52" r="1.1" fill="#060402" /><circle cx="64" cy="57" r="1.1" fill="#060402" /><circle cx="67" cy="57" r="1.1" fill="#060402" />
      {/* Nut 5 */}
      <ellipse cx="30" cy="68" rx="9" ry="6.5" fill="url(#cs-ik-n)" />
      <ellipse cx="26" cy="65" rx="2.5" ry="1.8" fill="rgba(255,220,100,0.08)" />
      <circle cx="28" cy="66" r="1.1" fill="#060402" /><circle cx="31" cy="65" r="1.1" fill="#060402" /><circle cx="29" cy="70" r="1.1" fill="#060402" /><circle cx="32" cy="70" r="1.1" fill="#060402" />
      {/* Nut 6 */}
      <ellipse cx="60" cy="72" rx="9" ry="6.5" fill="url(#cs-ik-n)" />
      <ellipse cx="56" cy="69" rx="2.5" ry="1.8" fill="rgba(255,220,100,0.08)" />
      <circle cx="58" cy="70" r="1.1" fill="#060402" /><circle cx="61" cy="69" r="1.1" fill="#060402" /><circle cx="59" cy="74" r="1.1" fill="#060402" /><circle cx="62" cy="74" r="1.1" fill="#060402" />
      {/* Nut 7 */}
      <ellipse cx="44" cy="38" rx="9" ry="6.5" fill="url(#cs-ik-n)" />
      <ellipse cx="40" cy="35" rx="2.5" ry="1.8" fill="rgba(255,220,100,0.08)" />
      <circle cx="42" cy="36" r="1.1" fill="#060402" /><circle cx="45" cy="35" r="1.1" fill="#060402" /><circle cx="43" cy="40" r="1.1" fill="#060402" /><circle cx="46" cy="40" r="1.1" fill="#060402" />
      {/* Nut 8 */}
      <ellipse cx="72" cy="42" rx="9" ry="6.5" fill="url(#cs-ik-n)" />
      <ellipse cx="68" cy="39" rx="2.5" ry="1.8" fill="rgba(255,220,100,0.08)" />
      <circle cx="70" cy="40" r="1.1" fill="#060402" /><circle cx="73" cy="39" r="1.1" fill="#060402" /><circle cx="71" cy="44" r="1.1" fill="#060402" /><circle cx="74" cy="44" r="1.1" fill="#060402" />
      {/* Nut 9 */}
      <ellipse cx="75" cy="65" rx="9" ry="6.5" fill="url(#cs-ik-n)" />
      <ellipse cx="71" cy="62" rx="2.5" ry="1.8" fill="rgba(255,220,100,0.08)" />
      <circle cx="73" cy="63" r="1.1" fill="#060402" /><circle cx="76" cy="62" r="1.1" fill="#060402" /><circle cx="74" cy="67" r="1.1" fill="#060402" /><circle cx="77" cy="67" r="1.1" fill="#060402" />
      {/* Nut 10 */}
      <ellipse cx="36" cy="82" rx="9" ry="6.5" fill="url(#cs-ik-n)" />
      <ellipse cx="32" cy="79" rx="2.5" ry="1.8" fill="rgba(255,220,100,0.08)" />
      <circle cx="34" cy="80" r="1.1" fill="#060402" /><circle cx="37" cy="79" r="1.1" fill="#060402" /><circle cx="35" cy="84" r="1.1" fill="#060402" /><circle cx="38" cy="84" r="1.1" fill="#060402" />
      {/* Nut 11 */}
      <ellipse cx="58" cy="84" rx="9" ry="6.5" fill="url(#cs-ik-n)" />
      <ellipse cx="54" cy="81" rx="2.5" ry="1.8" fill="rgba(255,220,100,0.08)" />
      <circle cx="56" cy="82" r="1.1" fill="#060402" /><circle cx="59" cy="81" r="1.1" fill="#060402" /><circle cx="57" cy="86" r="1.1" fill="#060402" /><circle cx="60" cy="86" r="1.1" fill="#060402" />
      {/* Nut 12 */}
      <ellipse cx="72" cy="79" rx="9" ry="6.5" fill="url(#cs-ik-n)" />
      <ellipse cx="68" cy="76" rx="2.5" ry="1.8" fill="rgba(255,220,100,0.08)" />
      <circle cx="70" cy="77" r="1.1" fill="#060402" /><circle cx="73" cy="76" r="1.1" fill="#060402" /><circle cx="71" cy="81" r="1.1" fill="#060402" /><circle cx="74" cy="81" r="1.1" fill="#060402" />
      {/* Binary output marks — right side */}
      <line x1="107" y1="34" x2="107" y2="58" stroke="rgba(245,197,24,0.82)" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="117" y1="34" x2="117" y2="58" stroke="rgba(245,197,24,0.45)" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="127" y1="34" x2="127" y2="58" stroke="rgba(245,197,24,0.45)" strokeWidth="2.2" strokeLinecap="round" />
      <text x="100" y="72" fontFamily="'Courier New',monospace" fontSize="7.5" fill="rgba(245,197,24,0.55)" letterSpacing="0.5">| = Ogbe</text>
      <text x="100" y="83" fontFamily="'Courier New',monospace" fontSize="7.5" fill="rgba(245,197,24,0.35)" letterSpacing="0.5">|| = Oyeku</text>
      {/* Label */}
      <text x="6" y="13" fontFamily="'Courier New',monospace" fontSize="7.5" fill="rgba(245,197,24,0.72)" letterSpacing="0.8">16 IKIN</text>
    </svg>
  );
}

function OpeleSVG() {
  const seeds = [9, 28, 47, 66, 85, 104, 123, 142];
  return (
    <svg viewBox="0 0 155 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="cs-op-bg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#18110a" />
          <stop offset="100%" stopColor="#06080e" />
        </radialGradient>
        <radialGradient id="cs-op-s" cx="35%" cy="28%" r="60%">
          <stop offset="0%" stopColor="#3a2008" />
          <stop offset="100%" stopColor="#0e0804" />
        </radialGradient>
      </defs>
      <rect width="155" height="100" fill="url(#cs-op-bg)" />
      {/* Wavy cord */}
      <path d="M4,32 C14,28 18,36 28,32 C38,28 42,36 52,32 C62,28 66,36 76,32 C86,28 90,36 100,32 C110,28 114,36 124,32 C134,28 138,36 148,32" fill="none" stroke="rgba(232,160,48,0.55)" strokeWidth="1.4" strokeLinecap="round" />
      {seeds.map((x, i) => {
        const tilt = i % 2 === 0 ? 9 : -9;
        return (
          <g key={i} transform={`translate(${x},0)`}>
            {/* Bead on cord */}
            <circle cx="0" cy="32" r="3.2" fill="#1a0e06" stroke="rgba(232,160,48,0.45)" strokeWidth="0.8" />
            {/* String to seed */}
            <line x1="0" y1="35" x2="0" y2="54" stroke="rgba(232,160,48,0.35)" strokeWidth="0.9" />
            {/* Seed */}
            <g transform={`translate(0,67) rotate(${tilt})`}>
              <ellipse cx="0" cy="0" rx="7.5" ry="13" fill="url(#cs-op-s)" />
              <ellipse cx="-2" cy="-4" rx="3" ry="5" fill="rgba(255,200,100,0.07)" />
            </g>
          </g>
        );
      })}
      <text x="18" y="10" fontFamily="'Courier New',monospace" fontSize="7" fill="rgba(232,160,48,0.70)" letterSpacing="0.6">8 SEEDS · 1 THROW</text>
    </svg>
  );
}

function ErindinlogunSVG() {
  const shells = [];
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      const cx = 18 + col * 32 + (row % 2) * 5;
      const cy = 13 + row * 22;
      const mouthUp = (row + col) % 2 === 0;
      shells.push({ cx, cy, mouthUp, key: row * 4 + col });
    }
  }
  return (
    <svg viewBox="0 0 155 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="cs-er-bg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#081414" />
          <stop offset="100%" stopColor="#06080e" />
        </radialGradient>
        <radialGradient id="cs-er-sh" cx="40%" cy="30%" r="60%">
          <stop offset="0%" stopColor="#e8e0cc" />
          <stop offset="100%" stopColor="#b8ac90" />
        </radialGradient>
      </defs>
      <rect width="155" height="100" fill="url(#cs-er-bg)" />
      {shells.map(({ cx, cy, mouthUp, key }) => (
        <g key={key}>
          <ellipse cx={cx} cy={cy} rx="11" ry="7.5" fill="url(#cs-er-sh)" />
          <ellipse cx={cx - 1} cy={cy - 2} rx="7" ry="4" fill="rgba(255,255,240,0.55)" />
          {mouthUp ? (
            <>
              <ellipse cx={cx} cy={cy + 1} rx="6.5" ry="2.5" fill="#0c0a06" />
              <line x1={cx - 4} y1={cy + 1} x2={cx - 4} y2={cy + 4.5} stroke="rgba(180,160,100,0.55)" strokeWidth="0.7" />
              <line x1={cx - 2} y1={cy + 1} x2={cx - 2} y2={cy + 4.5} stroke="rgba(180,160,100,0.55)" strokeWidth="0.7" />
              <line x1={cx} y1={cy + 1} x2={cx} y2={cy + 4.5} stroke="rgba(180,160,100,0.55)" strokeWidth="0.7" />
              <line x1={cx + 2} y1={cy + 1} x2={cx + 2} y2={cy + 4.5} stroke="rgba(180,160,100,0.55)" strokeWidth="0.7" />
              <line x1={cx + 4} y1={cy + 1} x2={cx + 4} y2={cy + 4.5} stroke="rgba(180,160,100,0.55)" strokeWidth="0.7" />
            </>
          ) : (
            <ellipse cx={cx} cy={cy + 1} rx="6" ry="2" fill="none" stroke="rgba(120,100,60,0.28)" strokeWidth="0.8" />
          )}
        </g>
      ))}
      <text x="113" y="87" fontFamily="'Courier New',monospace" fontSize="11" fill="rgba(0,212,255,0.80)" fontWeight="700">16</text>
      <text x="104" y="96" fontFamily="'Courier New',monospace" fontSize="7" fill="rgba(0,212,255,0.60)" letterSpacing="0.4">COWRIES</text>
    </svg>
  );
}

function AgbigbaSVG() {
  const xs = [22, 52, 82, 112];
  return (
    <svg viewBox="0 0 155 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="cs-ag-bg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#100a18" />
          <stop offset="100%" stopColor="#06080e" />
        </radialGradient>
        <radialGradient id="cs-ag-n" cx="32%" cy="28%" r="60%">
          <stop offset="0%" stopColor="#2d1c09" />
          <stop offset="100%" stopColor="#0e0804" />
        </radialGradient>
      </defs>
      <rect width="155" height="100" fill="url(#cs-ag-bg)" />
      {/* Horizontal cords */}
      <line x1="10" y1="32" x2="132" y2="32" stroke="rgba(155,127,212,0.38)" strokeWidth="1.2" />
      <line x1="10" y1="72" x2="132" y2="72" stroke="rgba(155,127,212,0.38)" strokeWidth="1.2" />
      {/* Vertical connectors */}
      {xs.map(x => (
        <line key={x} x1={x} y1="40" x2={x} y2="62" stroke="rgba(155,127,212,0.22)" strokeWidth="0.9" />
      ))}
      {/* Row 1 nuts */}
      {xs.map(x => (
        <g key={'r1-' + x}>
          <ellipse cx={x} cy="32" rx="13" ry="8.5" fill="url(#cs-ag-n)" />
          <ellipse cx={x} cy="32" rx="9" ry="5" fill="none" stroke="rgba(155,127,212,0.22)" strokeWidth="0.8" />
          <ellipse cx={x - 4} cy="28" rx="3" ry="1.8" fill="rgba(245,197,24,0.12)" />
          <ellipse cx={x} cy="39.5" rx="4.5" ry="2.5" fill="#0e0804" stroke="rgba(155,127,212,0.18)" strokeWidth="0.7" />
        </g>
      ))}
      {/* Row 2 nuts */}
      {xs.map(x => (
        <g key={'r2-' + x}>
          <ellipse cx={x} cy="72" rx="13" ry="8.5" fill="url(#cs-ag-n)" />
          <ellipse cx={x} cy="72" rx="9" ry="5" fill="none" stroke="rgba(155,127,212,0.22)" strokeWidth="0.8" />
          <ellipse cx={x - 4} cy="68" rx="3" ry="1.8" fill="rgba(245,197,24,0.12)" />
          <ellipse cx={x} cy="79.5" rx="4.5" ry="2.5" fill="#0e0804" stroke="rgba(155,127,212,0.18)" strokeWidth="0.7" />
        </g>
      ))}
      {/* Metal rod */}
      <rect x="137" y="10" width="5" height="82" rx="2.5" fill="#1a1a22" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" />
      <rect x="136" y="8" width="7" height="5" rx="1.5" fill="#252530" />
      <text x="6" y="10" fontFamily="'Courier New',monospace" fontSize="7" fill="rgba(155,127,212,0.72)" letterSpacing="0.5">4+4 PARALLEL</text>
    </svg>
  );
}

function LaptopSVG() {
  const bits = [1, 0, 1, 1, 0, 0, 1, 0];
  const cols = [40, 62, 84, 106];
  const rows = [33, 59];
  return (
    <svg viewBox="0 0 155 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="cs-lp-bg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#14110a" />
          <stop offset="100%" stopColor="#06080e" />
        </radialGradient>
        <linearGradient id="cs-lp-bd" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1e1c14" />
          <stop offset="100%" stopColor="#0e0c08" />
        </linearGradient>
      </defs>
      <rect width="155" height="100" fill="url(#cs-lp-bg)" />
      {/* Screen body */}
      <rect x="22" y="6" width="111" height="74" rx="7" fill="url(#cs-lp-bd)" stroke="rgba(245,197,24,0.45)" strokeWidth="1.2" />
      {/* Screen inner */}
      <rect x="27" y="11" width="101" height="64" rx="4" fill="#030508" />
      {/* Bits */}
      {rows.map((ry, ri) =>
        cols.map((cx, ci) => {
          const bit = bits[ri * 4 + ci];
          return (
            <text key={ri * 4 + ci} x={cx} y={ry}
              fontFamily="'Courier New',monospace" fontSize="14" fontWeight="700"
              textAnchor="middle"
              fill={bit === 1 ? 'rgba(245,197,24,0.92)' : 'rgba(67,97,238,0.50)'}>
              {bit}
            </text>
          );
        })
      )}
      {/* Screen label */}
      <text x="77.5" y="68" fontFamily="'Courier New',monospace" fontSize="6.5" fill="rgba(245,197,24,0.35)" textAnchor="middle" letterSpacing="0.8">CLASSICAL BITS</text>
      {/* Laptop base */}
      <rect x="14" y="80" width="127" height="15" rx="4" fill="url(#cs-lp-bd)" stroke="rgba(245,197,24,0.18)" strokeWidth="0.9" />
      {/* Trackpad */}
      <rect x="57" y="83" width="41" height="9" rx="2" fill="rgba(245,197,24,0.04)" stroke="rgba(245,197,24,0.14)" strokeWidth="0.7" />
      {/* Keyboard keys left */}
      {[18, 24, 30, 36, 42, 48].map(kx => (
        <g key={'kl-' + kx}>
          <rect x={kx} y="83" width="3.5" height="3" rx="0.6" fill="rgba(245,197,24,0.12)" />
          <rect x={kx} y="89" width="3.5" height="3" rx="0.6" fill="rgba(245,197,24,0.12)" />
        </g>
      ))}
      {/* Keyboard keys right */}
      {[103, 109, 115, 121, 127, 133].map(kx => (
        <g key={'kr-' + kx}>
          <rect x={kx} y="83" width="3.5" height="3" rx="0.6" fill="rgba(245,197,24,0.12)" />
          <rect x={kx} y="89" width="3.5" height="3" rx="0.6" fill="rgba(245,197,24,0.12)" />
        </g>
      ))}
    </svg>
  );
}

function QuantumSVG() {
  return (
    <svg viewBox="0 0 155 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="cs-qm-bg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#120d22" />
          <stop offset="100%" stopColor="#06080e" />
        </radialGradient>
        <radialGradient id="cs-qm-core" cx="38%" cy="32%" r="60%">
          <stop offset="0%" stopColor="#d0aeff" />
          <stop offset="100%" stopColor="#6030c8" />
        </radialGradient>
        <radialGradient id="cs-qm-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(155,100,240,0.22)" />
          <stop offset="100%" stopColor="rgba(155,100,240,0)" />
        </radialGradient>
      </defs>
      <rect width="155" height="100" fill="url(#cs-qm-bg)" />
      {/* Outer glow */}
      <circle cx="77" cy="48" r="34" fill="url(#cs-qm-glow)" />
      {/* Orbital ellipses */}
      <ellipse cx="77" cy="48" rx="46" ry="16" fill="none" stroke="rgba(155,100,240,0.32)" strokeWidth="1.1" transform="rotate(-35,77,48)" />
      <ellipse cx="77" cy="48" rx="46" ry="16" fill="none" stroke="rgba(155,100,240,0.32)" strokeWidth="1.1" transform="rotate(35,77,48)" />
      <ellipse cx="77" cy="48" rx="46" ry="16" fill="none" stroke="rgba(155,100,240,0.32)" strokeWidth="1.1" transform="rotate(90,77,48)" />
      {/* Core glow ring */}
      <circle cx="77" cy="48" r="16" fill="rgba(155,100,240,0.07)" stroke="rgba(155,100,240,0.18)" strokeWidth="0.9" />
      {/* Inner ring */}
      <circle cx="77" cy="48" r="9" fill="rgba(155,100,240,0.12)" stroke="rgba(155,100,240,0.28)" strokeWidth="0.8" />
      {/* Center qubit sphere */}
      <circle cx="77" cy="48" r="5.5" fill="url(#cs-qm-core)" stroke="rgba(255,245,255,0.70)" strokeWidth="0.9" />
      <circle cx="75" cy="46" r="1.5" fill="rgba(255,255,255,0.55)" />
      {/* Orbiting particles */}
      <circle cx="123" cy="48" r="3.2" fill="#c8a8f8" stroke="rgba(255,255,255,0.25)" strokeWidth="0.7" />
      <circle cx="24" cy="22" r="3.2" fill="#c8a8f8" stroke="rgba(255,255,255,0.25)" strokeWidth="0.7" />
      <circle cx="50" cy="88" r="3.2" fill="#c8a8f8" stroke="rgba(255,255,255,0.25)" strokeWidth="0.7" />
      {/* Labels */}
      <text x="44" y="16" fontFamily="'Courier New',monospace" fontSize="9.5" fill="rgba(155,100,240,0.80)">|0⟩ + |1⟩</text>
      <text x="77" y="96" fontFamily="'Courier New',monospace" fontSize="7" fill="rgba(155,100,240,0.65)" textAnchor="middle" letterSpacing="1">QUBIT</text>
    </svg>
  );
}

function ComputingSystemsSection() {
  const [panel, setPanel] = useState(0);

  const ANCIENT = [
    { id:'ikin', name:'Ikin Ifá Computing', alt:'Ikinfá Computing',
      color:'#f5c518', bit:'ikin ifabit', bitAlt:'ikinfabit',
      desc:'16 sacred palm nuts rapidly passed between hands — one or two remain per throw, yielding a single binary mark. Eight throws build one complete Ifa sign from 256 possible Odù.',
      spec:[['Input','16 palm nuts'],['Output','| or || mark'],['Throws/Sign','8 throws'],['Base','Binary (Base-2)']],
      Svg: IkinSVG },
    { id:'opele', name:'Ọ̀pẹ̀lẹ̀ Computing', alt:null,
      color:'#e8a030', bit:'ọ̀pẹ̀lẹ̀bit', bitAlt:null,
      desc:'8 seed-halves strung on a chain — one toss reads all 8 faces simultaneously, producing a complete Ifa sign in a single instant. The portable, high-speed Ifa computer.',
      spec:[['Input','1 chain, 8 halves'],['Output','Full sign, 1 throw'],['Speed','Instant'],['Base','Binary (Base-2)']],
      Svg: OpeleSVG },
    { id:'erindinlogun', name:'Ẹ́rìndínlógún Computing', alt:'Ifa Hexadecimal Computing · IfaHex Computing',
      color:'#00d4ff', bit:'ẹ́rìndínlógúnbit', bitAlt:null,
      desc:'16 sacred cowrie shells cast onto a mat — counted by how many land mouth-up, yielding 17 possible values (0–16). The most widely used Ifa computing system in West Africa.',
      spec:[['Input','16 cowrie shells'],['Output','0–16 mouth-up'],['Throws','1 throw'],['Base','Hexadecimal+']],
      Svg: ErindinlogunSVG },
    { id:'agbigba', name:'Agbigba Computing', alt:null,
      color:'#9b7fd4', bit:'agbigbabit', bitAlt:null,
      desc:'Multiple marker-strung cords cast simultaneously — each cord reads 4 markers at once, computing 4 Odù in parallel in a single motion. The ancient prototype of parallel computing.',
      spec:[['Input','Multiple cords'],['Output','4 Odù per throw'],['Processing','Parallel'],['Base','Quaternary+ (parallel)']],
      Svg: AgbigbaSVG },
  ];

  const MODERN = [
    { id:'classical', name:'Classical Computer', color:'#f5c518',
      bit:'classical bit', bitNote:'4 bits = 1 nibble · 8 bits = 1 byte',
      desc:'Processes all information in binary — each bit is exactly 0 or 1. Billions of these bits, combined in circuits running at billions of cycles per second, power every phone, laptop, and server on Earth.',
      spec:[['Unit','Bit (0 or 1)'],['Nibble','4 bits'],['Byte','8 bits'],['Speed','GHz range']],
      Svg: LaptopSVG },
    { id:'quantum', name:'Quantum Computer', color:'#9b7fd4',
      bit:'qubit', bitNote:'4 qubits → 16 states · 8 qubits → 256 states',
      desc:'A qubit can be 0, 1, or both simultaneously (superposition). Entangled qubits explore enormous solution spaces at once — the same parallel logic ancient Agbigba pioneered millennia ago.',
      spec:[['Unit','Qubit (0, 1, both)'],['4 Qubits','16 states at once'],['8 Qubits','256 states at once'],['Style','Superposition']],
      Svg: QuantumSVG },
  ];

  const items = panel === 0 ? ANCIENT : MODERN;

  return (
    <section id="computing-systems" className="section section--alt">
      <div className="container">
        <div className="section__header">
          <span className="section__eyebrow" style={{ color:'#00d9b8' }}>
            IFA Computing · From Ancient to Modern
          </span>
          <h2 className="section__title">
            Ancient &amp; Modern{' '}
            <span style={{ color:'#00d9b8' }}>Computing Systems</span>
          </h2>
          <p className="section__desc">
            Every modern computer has a direct Ifa ancestor. The same binary logic that powers
            today's laptops and quantum machines was first encoded in sacred Yoruba divination
            instruments — millennia before the first electronic circuit was built.
          </p>
        </div>

        {/* Panel toggle */}
        <div className="cs-toggle" role="tablist">
          <button role="tab" aria-selected={panel===0}
            className={'cs-toggle__btn'+(panel===0?' cs-toggle__btn--on':'')}
            onClick={() => setPanel(0)}>
            <span aria-hidden="true">🌿</span> Ancient IFA Computing
          </button>
          <button role="tab" aria-selected={panel===1}
            className={'cs-toggle__btn'+(panel===1?' cs-toggle__btn--on':'')}
            onClick={() => setPanel(1)}>
            <span aria-hidden="true">💻</span> Modern Computing
          </button>
        </div>

        {/* Bit info ribbon */}
        <div className="cs-ribbon">
          {panel === 0 ? (
            <>
              <div className="cs-ribbon__cell">
                <span className="cs-ribbon__num">1</span>
                <span className="cs-ribbon__tag">IfaBit</span>
                <span className="cs-ribbon__sub">InfiniteBit</span>
              </div>
              <span className="cs-ribbon__arr" aria-hidden="true">→</span>
              <div className="cs-ribbon__cell">
                <span className="cs-ribbon__num">4</span>
                <span className="cs-ribbon__tag">ifabits</span>
                <span className="cs-ribbon__sub">= 1 ifanibble</span>
              </div>
              <span className="cs-ribbon__arr" aria-hidden="true">→</span>
              <div className="cs-ribbon__cell">
                <span className="cs-ribbon__num">8</span>
                <span className="cs-ribbon__tag">ifabits</span>
                <span className="cs-ribbon__sub">= 1 ifabyte</span>
              </div>
              <span className="cs-ribbon__div" aria-hidden="true" />
              <div className="cs-ribbon__law">
                Governed by <em>Oju Odufa Merindinlogun</em> — the 16 Ifa Laws of Nature
              </div>
            </>
          ) : (
            <>
              <div className="cs-ribbon__cell">
                <span className="cs-ribbon__num">1</span>
                <span className="cs-ribbon__tag">Bit</span>
                <span className="cs-ribbon__sub">0 or 1</span>
              </div>
              <span className="cs-ribbon__arr" aria-hidden="true">→</span>
              <div className="cs-ribbon__cell">
                <span className="cs-ribbon__num">4</span>
                <span className="cs-ribbon__tag">Bits</span>
                <span className="cs-ribbon__sub">= 1 Nibble</span>
              </div>
              <span className="cs-ribbon__arr" aria-hidden="true">→</span>
              <div className="cs-ribbon__cell">
                <span className="cs-ribbon__num">8</span>
                <span className="cs-ribbon__tag">Bits</span>
                <span className="cs-ribbon__sub">= 1 Byte</span>
              </div>
              <span className="cs-ribbon__div" aria-hidden="true" />
              <div className="cs-ribbon__law">
                Classical &amp; Quantum computing systems
              </div>
            </>
          )}
        </div>

        {/* Cards grid */}
        <div className={'cs-grid cs-grid--'+(panel===0?'ancient':'modern')}>
          {items.map(sys => {
            const Svg = sys.Svg;
            return (
              <div key={sys.id} className="cs-card" style={{ '--cs-c': sys.color }}>
                <div className="cs-card__vis">
                  <Svg />
                  <div className="cs-card__badge">
                    <span className="cs-card__bit">{sys.bit}</span>
                    {sys.bitAlt && <span className="cs-card__bit-alt"> · {sys.bitAlt}</span>}
                    {sys.bitNote && <span className="cs-card__bit-note">{sys.bitNote}</span>}
                  </div>
                </div>
                <div className="cs-card__body">
                  <h3 className="cs-card__name">{sys.name}</h3>
                  {sys.alt && <div className="cs-card__alt">{sys.alt}</div>}
                  <p className="cs-card__desc">{sys.desc}</p>
                  <div className="cs-card__specs">
                    {sys.spec.map(([k,v],j) => (
                      <div key={j} className="cs-card__spec">
                        <span className="cs-card__sk">{k}</span>
                        <span className="cs-card__sv">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Connection bridge */}
        <div className="cs-bridge">
          <span className="cs-bridge__ey">THE CONNECTION</span>
          <p className="cs-bridge__tx">
            <strong>IfaBits are InfiniteBits</strong> — governed by <em>Oju Odufa Merindinlogun</em>,
            the 16 Ifa Laws of Nature. Unlike classical bits (finite, exactly 0 or 1), IfaBits encode
            infinite-dimensional information states. Every classical bit and every quantum qubit is a
            special case of an IFABit — making IFABit the most fundamental unit of computation across
            all systems, ancient and modern.
          </p>

          {/* Bridge diagram */}
          <div className="cs-bridge__diagram">
            <svg viewBox="0 0 520 80" xmlns="http://www.w3.org/2000/svg" className="cs-bridge__svg" aria-hidden="true">

              {/* Left label */}
              <text x="4" y="48" fontFamily="'Courier New', monospace" fontSize="13" fontWeight="700" fill="#8892aa">The Ancient</text>

              {/* Right label */}
              <text x="380" y="48" fontFamily="'Courier New', monospace" fontSize="13" fontWeight="700" fill="#8892aa">The Modern</text>

              {/* Shaft */}
              <line x1="122" y1="44" x2="336" y2="44" stroke="#f5c518" strokeWidth="2" opacity="0.9" />

              {/* Left arrowhead (pointing left) */}
              <polygon points="122,38 108,44 122,50" fill="#f5c518" opacity="0.9" />

              {/* Right arrowhead (pointing right) */}
              <polygon points="336,38 350,44 336,50" fill="#f5c518" opacity="0.9" />

              {/* "Ifa" above midpoint */}
              <text x="238" y="28" textAnchor="middle" fontFamily="'Courier New', monospace" fontSize="14" fontWeight="700" fill="#f5c518" letterSpacing="1">Ifa</text>
            </svg>
            <p className="cs-bridge__caption">
              The IFA Internet: Odu Ifa Is the Bridge That Connects Ancient African Sciences with Modern Western Sciences.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

// ── Ifa Information Section ────────────────────────────────────
function InformationSection() {
  return (
    <section id="information" className="section">
      <div className="container">
        <div className="section__header">
          <span className="section__eyebrow" style={{ color: '#4361ee' }}>InfoE · Information for Everything</span>
          <h2 className="section__title">Ifa <span style={{ color: '#4361ee' }}>Information</span></h2>
          <p className="section__desc">
            Ifa Information (InfoE) is the container and fundamental building block of all theories and
            models of information science — from classical to quantum to consciousness-based information.
            The CEN Matrix connects every information theory under one unified Ifa framework.
          </p>
        </div>

        <div className="info-grid">
          {INFO_COMPONENTS.map((c, i) => (
            <div key={i} className="info-card" style={{ '--ic-accent': c.accent }}>
              <div className="info-card__icon">{c.icon}</div>
              <div className="info-card__name">{c.name}</div>
              <p className="info-card__desc">{c.desc}</p>
            </div>
          ))}
        </div>

        <div className="section__cta-row">
          <a
            href="https://toe.cenproject.org/ifa-information/"
            className="btn btn--outline"
            target="_blank"
            rel="noopener noreferrer"
            style={{ '--btn-col': '#4361ee' }}
          >
            Explore Ifa Information →
          </a>
        </div>
      </div>
    </section>
  );
}

// ── Ifa Algorithm + Programming Section ───────────────────────
function AlgorithmSection() {
  return (
    <section id="algorithm" className="section section--alt">
      <div className="container">
        <div className="section__header">
          <span className="section__eyebrow" style={{ color: '#f5c518' }}>Ifalgo · AlgoE · TOE Algorithm · CEN Algorithm</span>
          <h2 className="section__title">Ifa Algorithm <span style={{ color: '#f5c518' }}>&amp; Programming</span></h2>
          <p className="section__desc">
            The Ifalgorithm (Ifalgo) is the Algorithm for Everything — the foundational integration tool
            within IFA Mathematics that unifies all algorithms across every field. Ifa Programming applies
            these principles to write software, design systems, and engineer solutions through IfaLogic and OrisaLogic.
          </p>
        </div>

        <div className="algo-layout">
          <div className="algo-principles">
            {ALGO_PRINCIPLES.map((p, i) => (
              <div key={i} className="algo-principle" style={{ '--ap-accent': p.accent }}>
                <div className="algo-principle__num">{p.n}</div>
                <div className="algo-principle__body">
                  <div className="algo-principle__title">{p.title}</div>
                  <p className="algo-principle__desc">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="algo-aside">
            <div className="algo-aside__card">
              <div className="algo-aside__label">Core Foundation</div>
              <div className="algo-aside__val">16 Major Odu Ifa</div>
              <p className="algo-aside__sub">The 16 natural laws serving as axiomatic constants for all algorithmic reasoning</p>
            </div>
            <div className="algo-aside__card">
              <div className="algo-aside__label">Technical Methods</div>
              <div className="algo-aside__val">AlgoEs · IfaGebra</div>
              <p className="algo-aside__sub">Energy-based transformations powering all Ifa algorithmic computations</p>
            </div>
            <div className="algo-aside__card">
              <div className="algo-aside__label">Applications</div>
              <div className="algo-aside__val">Ifa Technologies</div>
              <p className="algo-aside__sub">Ifa Networks, Ifa Engineering, and all implementation strategies across the IFA Internet</p>
            </div>
            <div className="algo-aside__cta-block">
              <a
                href="https://toe.cenproject.org/ifa-algorithm/"
                className="btn btn--outline"
                target="_blank"
                rel="noopener noreferrer"
                style={{ '--btn-col': '#f5c518' }}
              >
                Ifa Algorithm →
              </a>
              <a
                href="https://toe.cenproject.org/ifa-algorithm/"
                className="btn btn--outline"
                target="_blank"
                rel="noopener noreferrer"
                style={{ '--btn-col': '#e9498a' }}
              >
                Ifa Programming →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Ifa Language Section ───────────────────────────────────────
function LanguageSection() {
  return (
    <section id="language" className="section">
      <div className="container">
        <div className="section__header">
          <span className="section__eyebrow" style={{ color: '#7c4dff' }}>IfaLang · IfaPL · Language for Everything</span>
          <h2 className="section__title">Ifa <span style={{ color: '#7c4dff' }}>Language</span></h2>
          <p className="section__desc">
            IfaLang is the Language for Everything — one meta-language built on a single foundational
            symbol: Energy (the IfaLine). Every programming language, formal system, and natural language
            is a dialect of this universal grammar. Code is consciousness expressed as structure.
          </p>
        </div>

        <div className="lang-grid">
          {LANG_FEATURES.map((f, i) => (
            <div key={i} className="lang-card" style={{ '--lc-accent': f.accent }}>
              <div className="lang-card__icon">{f.icon}</div>
              <div className="lang-card__name">{f.name}</div>
              <div className="lang-card__sub">{f.subtitle}</div>
              <p className="lang-card__desc">{f.desc}</p>
            </div>
          ))}
        </div>

        <blockquote className="comp-axiom">
          "IfaLang represents all fields of knowledge, systems, technologies, formulas, languages,
          data, graphics, and code — through the single unified Energy framework: CEN (Ogbe)."
          <cite>— Ifa Language · IfaPL · The IFA Internet</cite>
        </blockquote>

        <div className="section__cta-row">
          <a
            href="https://toe.cenproject.org/ifa-language/"
            className="btn btn--outline"
            target="_blank"
            rel="noopener noreferrer"
            style={{ '--btn-col': '#7c4dff' }}
          >
            Explore Ifa Language →
          </a>
        </div>
      </div>
    </section>
  );
}

// ── CTA / Ifa Computer Section ─────────────────────────────────
function ComputerCTASection() {
  return (
    <section className="section section--cta">
      <div className="container">
        <div className="cta-block">
          <div className="cta-block__bg" />
          <div className="cta-block__inner">
            <div className="cta-block__eyebrow">The Ifa Computer · ComputoE · TOE Computer</div>
            <h2 className="cta-block__title">The Computer of Energy<br />(ComputoE)</h2>
            <p className="cta-block__desc">
              The Ifa Computer redefines meta-computation — a universal computational system
              built on the 256 Odu Ifa as its instruction Set, unifying classical computers,
              quantum computers, and all other computational paradigms into one coherent Structure.
            </p>
            <div className="cta-block__actions">
              <a
                href="https://toe.cenproject.org/ifa-computer/"
                className="btn btn--primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Explore the Ifa Computer →
              </a>
              <a
                href="https://toe.cenproject.org"
                className="btn btn--ghost"
                target="_blank"
                rel="noopener noreferrer"
              >
                The IFA Internet
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Footer ─────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__inner">
          <div className="footer__brand">
            <div className="footer__logo">
              <span className="footer__logo-icon">⬡</span>
              <span className="footer__logo-name">IFA Computing</span>
            </div>
            <p className="footer__tagline">ComputoE — The Computer for Everything</p>
            <p className="footer__tagline" style={{ marginTop: 4, fontSize: '0.8rem' }}>
              Part of{' '}
              <a href="https://ifainternet.org" style={{ color: 'var(--gold)' }}>The IFA Internet</a>
              {' · '}
              <a href="https://cenproject.org" style={{ color: 'var(--gold)' }}>CENProject</a>
            </p>
          </div>
          <nav className="footer__links">
            <a href="https://ifainternet.org" className="footer__link" target="_blank" rel="noopener noreferrer">← IFA Internet</a>
            <a href="https://toe.cenproject.org/ifa-computer/" className="footer__link" target="_blank" rel="noopener noreferrer">Ifa Computer</a>
            <a href="https://toe.cenproject.org/ifabit-overview/" className="footer__link" target="_blank" rel="noopener noreferrer">IfaBit</a>
            <a href="https://toe.cenproject.org/ifa-information/" className="footer__link" target="_blank" rel="noopener noreferrer">Ifa Information</a>
            <a href="https://toe.cenproject.org/ifa-algorithm/" className="footer__link" target="_blank" rel="noopener noreferrer">Ifa Algorithm</a>
            <a href="https://toe.cenproject.org/ifa-language/" className="footer__link" target="_blank" rel="noopener noreferrer">Ifa Language</a>
          </nav>
        </div>
        <div className="footer__bottom">
          <span className="footer__copy">© CENProject — toe.cenproject.org</span>
          <span className="footer__axiom">"Consciousness-Energy (CEN) is everything that really exists."</span>
        </div>
      </div>
    </footer>
  );
}

// ── App ────────────────────────────────────────────────────────
function App() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <PillarsSection />
        <IfaBitSection />
        <ComputingSystemsSection />
        <IfaBinaryEncoding />
        <InformationSection />
        <AlgorithmSection />
        <LanguageSection />
        <KidsPromoSection />
        <ComputerCTASection />
      </main>
      <Footer />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
