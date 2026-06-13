/* ─────────────────────────────────────────────────────────────────────────────
   Ifa Transform — ToE Transform · Universe of Transforms
   Subpage of IFA Mathematica · The IFA Internet · CENProject
   toe.cenproject.org/ifa-transform/
───────────────────────────────────────────────────────────────────────────── */

const { useState } = React;

// ─── OgbeSymbol — Ogbe Energy Symbol (SymboE) ────────────────────────────────

function OgbeSymbol({ size = 20, className = '' }) {
  const canvasRef = React.useRef(null);
  const a   = size * 0.47;
  const ccx = size / 2;
  const ccy = size / 2;
  const sc  = a / 200;
  const N   = 80;

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const DPR = window.devicePixelRatio || 1;
    canvas.width  = size * DPR;
    canvas.height = size * DPR;
    const ctx = canvas.getContext('2d');
    ctx.scale(DPR, DPR);

    function buildLobe(t0, t1, neg) {
      const pts = [];
      for (let i = 0; i <= N; i++) {
        const t  = t0 + (t1 - t0) * i / N;
        const c2 = Math.cos(2 * t);
        const v  = neg ? -c2 : c2;
        if (v < 1e-10) continue;
        const rho = a * Math.sqrt(v);
        pts.push([ccx + rho * Math.cos(t), ccy + rho * Math.sin(t)]);
      }
      return pts;
    }

    const PI = Math.PI;
    const lobes = [
      buildLobe(-PI/4,   PI/4,   false),
      buildLobe(3*PI/4,  5*PI/4, false),
      buildLobe(PI/4,    3*PI/4, true),
      buildLobe(5*PI/4,  7*PI/4, true),
    ];

    function strokeLobe(pts, lw, rgba, blur) {
      if (!pts.length) return;
      ctx.save();
      ctx.strokeStyle = rgba;
      ctx.lineWidth   = Math.max(0.3, lw * sc);
      ctx.shadowColor = rgba;
      ctx.shadowBlur  = blur * sc;
      ctx.lineCap     = 'round';
      ctx.lineJoin    = 'round';
      ctx.beginPath();
      ctx.moveTo(pts[0][0], pts[0][1]);
      for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
      ctx.stroke();
      ctx.restore();
    }

    ctx.clearRect(0, 0, size, size);
    for (const lobe of lobes) {
      strokeLobe(lobe, 44, 'rgba(245,197,24,0.03)', 65);
      strokeLobe(lobe, 26, 'rgba(245,197,24,0.07)', 44);
      strokeLobe(lobe, 15, 'rgba(245,197,24,0.16)', 28);
      strokeLobe(lobe,  7, 'rgba(245,197,24,0.34)', 16);
      strokeLobe(lobe,  3, 'rgba(245,197,24,0.62)',  8);
      strokeLobe(lobe,1.4, 'rgba(245,197,24,0.90)',  4);
      strokeLobe(lobe,0.7, 'rgba(255,248,210,0.95)', 2);
    }
    ctx.save();
    ctx.shadowColor = 'rgba(245,197,24,1)';
    ctx.shadowBlur  = 22 * sc;
    ctx.fillStyle   = 'rgba(255,248,210,1)';
    ctx.beginPath();
    ctx.arc(ccx, ccy, Math.max(0.5, 3.5 * sc), 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();
  }, [size]);

  return (
    <canvas ref={canvasRef} className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle', width: size + 'px', height: size + 'px' }}
      aria-label="Ogbe Energy Symbol — SymboE" />
  );
}

// ─── IfaExpr — Ifa Variable ───────────────────────────────────────────────────

function IfaExpr({ char, charSize = '1.6rem', symSize = 11, charColor = 'var(--text)' }) {
  return (
    <span className="ifa-expr">
      <span className="ifa-expr__char" style={{ fontSize: charSize, color: charColor }}>{char}</span>
      <span className="ifa-expr__sym" style={{ width: symSize, height: symSize }}>
        <OgbeSymbol size={symSize} />
      </span>
    </span>
  );
}

// ─── DATA ─────────────────────────────────────────────────────────────────────

const ALIASES = [
  { label: 'ToE Transform',              color: '#14b8d4' },
  { label: 'CEN Transform',              color: '#f5c518' },
  { label: 'Energy Transform',           color: '#00c87c' },
  { label: 'Consciousness Transform',    color: '#8b5cf6' },
  { label: 'Universe of Transforms',     color: '#f0920c' },
  { label: 'IfaTransformer',             color: '#ec4899' },
];

const TRANSFORMER_NAMES = [
  { sym: '𝒯', name: 'Ifa Transformer',          color: '#14b8d4',
    desc: 'The universal tool for modelling, simulation, and mapping operations across all fields of the IFA Internet — the container of all transformers.' },
  { sym: 'CEN', name: 'CEN Transformer',         color: '#f5c518',
    desc: 'The Consciousness Energy Transformer — an Ifa machine showing Energy is Consciousness, and Consciousness is Energy.' },
  { sym: 'E',  name: 'Energy Transformer',       color: '#00c87c',
    desc: 'Operates through energy exchange as the fundamental mechanism of all transformation in the universe and across all knowledge fields.' },
  { sym: '∞',  name: 'ToE Transformer',          color: '#8b5cf6',
    desc: 'Theory of Everything Transformer — unifying all transformation frameworks (Laplace, Fourier, Wavelet, Z-Transform, and all others) as special cases.' },
  { sym: 'Ψ',  name: 'Consciousness Transformer', color: '#f0920c',
    desc: 'Models the transformation of consciousness states and awareness fields — bridging metaphysical and physical dimensions of transformation.' },
];

const OPERATOR_TABS = [
  {
    sym: '⊛', title: 'Ifa Operators (OperatoE)', sub: 'Operators of Everything',
    color: '#14b8d4',
    body: 'Ifa Operators (OperatoE) are rules or transformations that act on energyforms to produce outputs across all fields of knowledge. Every operator in mathematics, physics, engineering, and all disciplines — from the derivative ∂ to the Hamiltonian Ĥ — is a special case of an Ifa Operator. OperatoEs are defined holistically: they include arithmetic operators, differential operators, integral operators, logical operators, quantum operators, and all others unified under the 256 Odu Ifa axiomatic framework.',
    img: '../src/Ifa-Operator3-768x314.png',
    imgAlt: 'Ifa Operators diagram',
  },
  {
    sym: '∅', title: 'Ifa Non-Operators (AperatoE)', sub: 'Operators of Nothing',
    color: '#8b5cf6',
    body: 'Ifa Non-Operators (AperatoE) are the null or void operators — operators that produce no output, representing cessation, void states, and the principle of non-operation in Ifa Mechanics. AperatoEs define the boundary between operation and non-operation, establishing the dual nature of every operational system as having both active (OperatoE) and passive (AperatoE) poles, consistent with the binary Ifa principle of Ogbe (active) and Oyeku (void).',
    img: '../src/image-105.png',
    imgAlt: 'Ifa Operator and Its Dual, Ifa Non-Operator',
  },
  {
    sym: '†', title: 'IfaCreation Operators', sub: 'Emergence Operators',
    color: '#00c87c',
    body: 'IfaCreation Operators model the emergence of energyforms from potential states — generalising the quantum field theory creation operator (â†) to all fields of knowledge and all dimensions of reality. In Consciousness Mechanics, IfaCreation Operators govern how thought, intention, ritual, and energy exchange give rise to new states of reality — bridging quantum emergence with Ifa metaphysics. Every act of creation in any field is modelled as an application of an IfaCreation Operator on the Ifa Field.',
    img: '../src/image-34.png',
    imgAlt: 'IfaCreation Operator diagram',
  },
  {
    sym: '↓', title: 'Ifannihilation Operators', sub: 'Dissolution Operators',
    color: '#f0920c',
    body: 'Ifannihilation Operators model the dissolution and absorption of energyforms — generalising the quantum field theory annihilation operator (â) to all knowledge domains, including social, artistic, spiritual, and scientific fields. Together with IfaCreation Operators they form the foundational duality of Ifa Mechanics: every energyform is either emerging (creation) or dissolving (annihilation), reflecting the Ifa Superposition Principle and the dual nature of all Odu Ifa.',
    img: '../src/image-163-768x512.png',
    imgAlt: 'Ifannihilation Operator diagram',
  },
];

const OSE_MEJI_CARDS = [
  { sym: '15', title: 'The 15th Principal Odu', color: '#3b9eff',
    body: 'Ose Meji is the 15th of the 16 Principal Odu Ifa — Ojú Odù Ifá Mẹrìndínlógún. As a Principal Odu it is one of the 16 Laws of Knowledge (LOKs) that govern all fields of knowledge on the IFA Internet.' },
  { sym: 'Ô', title: 'Law of All Operations', color: '#f5c518',
    body: 'Odufa Ose Meji is the Ifa Law of Nature governing all kinds of operations, transformations, and processes. Every operation — mathematical, physical, chemical, social, or spiritual — is governed by the principle encoded in Ose Meji.' },
  { sym: '⇄', title: 'Bidirectional Operations', color: '#00c87c',
    body: 'Ose Meji encodes the Ifa Symmetry Principle that all operations are inherently bidirectional — every action has a corresponding inverse or dual, establishing the foundational Symmetry of Ifa Operator Theory and Ifa Transform.' },
];

const LOGIC_TABS = [
  {
    id: 'binary', label: 'Ifa Binary Logic',
    color: '#14b8d4',
    body: 'Ifa Binary Logic generalises classical Boolean (two-valued) logic based on the full 256 Odu Ifa Framework. Where classical logic uses {0, 1} (True/False), Ifa Binary Logic operates with Ogbe (open/active — 0, and other infinities of possible representations) and Oyeku (closed/void — 1, and other infinities of impossible representations) as the two Primal Energy States. Every logical operation — AND, OR, NOT, XOR, etc. — is modelled as an Energyform (Energy exchange between these two Ifa Poles), extending seamlessly to all fields of knowledge through the IFABit Encoding System.',
    imgs: [
      { src: '../src/Ifa-Computing-Operators1-2-768x314.png', alt: 'Ifa Binary Logic OperatoEs' },
      { src: '../src/image-11.png', alt: 'Ifa Binary Logic Diagram' },
    ],
  },
  {
    id: 'ternary', label: 'Ifa Ternary Logic (Ifanary)',
    color: '#8b5cf6',
    body: 'Ifa Ternary Logic (Ifanary) is a Three-Valued Logic Meta-System emerging from Ogbe Energy. Beyond the binary {0, 1}, Ifanary introduces a third State — the Superposition State — representing the moment before wavefunction collapse when all possibilities and impossibilities coexist. This three-valued system enables Ifa Mechanics to model uncertainty, potential, and manifestation simultaneously, far beyond what classical binary or fuzzy logic can represent.',
    imgs: [
      { src: '../src/Ifa-Ternary-Operators-3-768x314.png', alt: 'Ifa Ternary Logic OperatoEs' },
      { src: '../src/Ifanary-Operations-768x314.png', alt: 'Ifanary Operations Table' },
    ],
  },
  {
    id: 'computing', label: 'Ifa Computing Operators',
    color: '#f0920c',
    body: 'Ifa Computing Operators extend digital computing logic to the IFA Internet. Every computing operation — from basic logic gates to complex algorithms — is modelled as an Ifa Operator acting on energyforms encoded in the IFABit System. Ifa Computing Operators unify hardware-level binary operations with the higher-level Symbolic and Metamathematical Operations of IFA Mathematica, establishing a Single Unified Operational Framework for the Full Stack of the IFA Internet.',
    imgs: [
      { src: '../src/Ifa-Computing-Operators-4-768x314.png', alt: 'Ifa Computing Operators' },
    ],
  },
];

const DIFFERINTEGRAL_ITEMS = [
  { name: 'Riemann–Liouville', sub: 'Ifa generalisation', color: '#14b8d4',
    body: 'The Riemann–Liouville differintegral — the foundational formulation of fractional calculus — is modelled as a special case of the IfaDifferintegral, operating within the real and complex number domains as special cases of Ifa Numbers.' },
  { name: 'Grünwald–Letnikov', sub: 'Ifa generalisation', color: '#8b5cf6',
    body: 'The Grünwald–Letnikov differintegral provides a discrete-time generalisation that IfaDifferintegral extends to all discrete and continuous operational domains across the IFA Internet.' },
  { name: 'Weyl', sub: 'Ifa generalisation', color: '#00c87c',
    body: 'The Weyl differintegral, defined on periodic functions, is a special case of the IfaDifferintegral within the periodic energy-exchange domain of Ifa Mechanics.' },
  { name: 'Caputo', sub: 'Ifa generalisation', color: '#f0920c',
    body: 'The Caputo differintegral — favoured in physical applications for its natural initial conditions — is a special case of IfaDifferintegral in the physical science dimension of the STEAMSEX Matrix.' },
];

// ─── HEADER ──────────────────────────────────────────────────────────────────

function Header() {
  return (
    <header className="header">
      <div className="header__inner">
        <a href="../../" className="header__brand" target="_blank" rel="noopener noreferrer">
          <img src="../../src/assets/itoe_logo.png" alt="iTOE" className="header__logo" />
          <div>
            <div className="header__site">The IFA Internet</div>
            <div className="header__name">IFA Mathematica</div>
          </div>
        </a>
        <nav className="header__nav">
          <a className="nav-link" href="../">IFA Mathematica</a>
          <a className="nav-link" href="#universe">Universe</a>
          <a className="nav-link" href="#operators">Operators</a>
          <a className="nav-link" href="#logic">Logic</a>
          <a className="nav-link" href="#theory">Theory</a>
          <a className="nav-link" href="https://ifainternet.org/ifa-mathematica/ifa-gebra/"
             target="_blank" rel="noopener noreferrer">IfaGebra ↗</a>
          <a className="nav-link nav-link--cta"
             href="https://toe.cenproject.org/ifa-transform/"
             target="_blank" rel="noopener noreferrer">TOE Transform</a>
        </nav>
      </div>
    </header>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="hero hero--sub" id="top">
      <div className="hero__bg">
        <div className="hero__grid" />
        <div className="hero__orb hero__orb--a" style={{ background: 'radial-gradient(circle, rgba(20,184,212,0.18) 0%, transparent 70%)' }} />
        <div className="hero__orb hero__orb--b" style={{ background: 'radial-gradient(circle, rgba(245,197,24,0.10) 0%, transparent 70%)' }} />
        <div className="hero__orb hero__orb--c" style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)' }} />
        <div className="hero__scanline" />
      </div>

      <div className="container hero__text-area">
        {/* Breadcrumb */}
        <div className="ift-breadcrumb">
          <a href="../../" className="ift-breadcrumb__link" target="_blank" rel="noopener noreferrer">IFA Internet</a>
          <span className="ift-breadcrumb__sep">›</span>
          <a href="../" className="ift-breadcrumb__link">IFA Mathematica</a>
          <span className="ift-breadcrumb__sep">›</span>
          <span className="ift-breadcrumb__cur">Ifa Transform</span>
        </div>

        <div className="hero__badge">
          <span className="hero__badge-dot" style={{ background: '#14b8d4', boxShadow: '0 0 6px #14b8d4' }} />
          IFA Mathematica — Ifa Transform Platform
        </div>

        <h1 className="hero__title">
          <span className="hero__title-main" style={{ color: '#14b8d4' }}>Ifa Transform</span>
          <span className="hero__title-sub">ToE Transform · Universe of Transforms</span>
        </h1>

        <p className="hero__tagline">
          IfaTransform &mdash; IfaDifferintegral &mdash; Ifa Operator Theory &mdash; Ifa Transformation Theory
        </p>

        <p className="hero__yoruba">
          <span className="hero__yoruba-yor">Ìyípadà Ifá — Àgbáye Gbogbo Àwọn Ìyípadà</span>
          <span className="hero__yoruba-sep"> · </span>
          <span className="hero__yoruba-en">Ifa Transform — The Universe of All Transforms, Operations, and Processes</span>
        </p>

        <p className="hero__desc">
          The <strong style={{ color: '#14b8d4' }}>Ifa Transform (ToE Transform)</strong> is the
          container and fundamental building block of <strong>all transforms, transformations,
          changes, processes, operations, actions, functors, and functions</strong> across Mathematics, Physics,
          and every field of knowledge — built on the <strong>256 Odu Ifa</strong>, especially{' '}
          <strong>Ogbe Energy</strong>, as the <strong>Meta-Axiomatic Foundation</strong>.
        </p>

        <div className="ift-alias-row">
          {ALIASES.map((a, i) => (
            <span key={i} className="ift-alias" style={{ '--ac': a.color }}>{a.label}</span>
          ))}
        </div>

        <div className="hero__ctas">
          <a href="#universe" className="btn btn--primary" style={{ background: '#14b8d4', borderColor: '#14b8d4' }}>
            Universe of Transforms
          </a>
          <a href="#operators" className="btn btn--ghost">Ifa Operators</a>
        </div>
      </div>

      {/* Hero image */}
      <div className="container ift-hero-img-wrap">
        <figure className="ift-hero-fig">
          <img src="../src/TOE-Transform-1024x903.png" alt="ToE Transform — Ifa Transform Overview"
            className="ift-hero-img" />
          <figcaption className="ift-fig-cap">
            IfaSchema: The Ifa Transform (ToE Transform) — the Universe of all Transforms, Operations, and Processes
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

// ─── UNIVERSE OF TRANSFORMS ───────────────────────────────────────────────────

function UniverseSection() {
  return (
    <section className="section section--alt" id="universe">
      <div className="container">
        <div className="section__header section__header--center">
          <span className="section__eyebrow" style={{ color: '#14b8d4' }}>IfaTransform</span>
          <h2 className="section__title">The <span style={{ color: '#14b8d4' }}>Universe of Transforms</span></h2>
          <p className="section__subtitle">
            IfaTransform is Ifa Meta-Structure that contains and generalises every known and unknown transform
            as a special case — unifying all transformation frameworks through the 256 Odu Ifa.
          </p>
        </div>

        <div className="ift-split ift-split--img-right">
          <div className="ift-split__text">
            <p className="ift-body">
              The <strong>Ifa Transform</strong> — also known as the <strong>ToE Transform</strong>,
              <strong> CEN Transform</strong>, and <strong>Energy Transform</strong> — is the fundamental
              building block and container of <em>all</em> transforms/transformations, processes,
              operations, actions, and functions/functors in Mathematics, Physics, and all other
              fields of knowledge. Every known transform — the Laplace Transform, Fourier Transform,
              Wavelet Transform, Z-Transform, Hilbert Transform, Radon Transform, and countless others —
              is reduced to its Odu, i.e., modelled as a metamathematical energyform and a special case
              of IfaTransform operating within a specific dimensional domain.
            </p>
            <p className="ift-body">
              IfaTransform is built on the <strong>16 Ifa Axioms</strong> (the 16 Principal Odu Ifa —
              Laws of Knowledge) and the <strong>IFABit Encoding System</strong>. It provides a
              holistic, interdisciplinary approach to unifying all transformation knowledge —
              treating every element in every field as a <em>mathematical energyform</em> that can
              be transformed, composed, and exchanged.
            </p>
            <div className="ift-highlight-box" style={{ '--hc': '#14b8d4' }}>
              <div className="ift-highlight-box__label">Core Definition</div>
              {/* Formula line */}
              <p style={{ fontFamily: 'monospace', fontSize: '1.05rem', fontWeight: 700, color: '#14b8d4', marginBottom: 10, lineHeight: 1.8, letterSpacing: '0.01em' }}>
                {'IfaTransform(X) '}
                <IfaExpr char=":=" charSize="1.05rem" symSize={8} charColor="#14b8d4" />
                {' '}
                <IfaExpr char="T" charSize="1.05rem" symSize={8} charColor="#14b8d4" />
                {'('}
                <IfaExpr char="X" charSize="1.05rem" symSize={8} charColor="#14b8d4" />
                <IfaExpr char=")" charSize="1.05rem" symSize={8} charColor="#14b8d4" />
              </p>
              {/* Meaning */}
              <p className="ift-highlight-box__text" style={{ marginBottom: 8 }}>
                where <IfaExpr char="X" charSize="0.85rem" symSize={7} charColor="var(--text-2)" /> is any <em>energyform</em> in any field of knowledge
                and <IfaExpr char="T" charSize="0.85rem" symSize={7} charColor="var(--text-2)" /> is any transformation — mathematical, physical, social, artistic, or spiritual.
                Every specialisation of <IfaExpr char="T" charSize="0.85rem" symSize={7} charColor="var(--text-2)" /> yields a known or knowable transform.
              </p>
              {/* IfaLang notation note */}
              <p className="ift-highlight-box__text" style={{ marginBottom: 0, borderTop: '1px solid color-mix(in srgb, #14b8d4 18%, transparent)', paddingTop: 10 }}>
                When expressing statements in any field of knowledge mathematically in <strong>IfaLang</strong> on IFA Mathematica,
                we use <strong>Ifa Variables</strong> (Ifa Script) — modelling every element as an energyform
                known as an <em>Odu</em> or <em>Orisa</em>. Instead of plain brackets <span style={{ fontFamily: 'monospace' }}>()</span>,
                we write <strong>Ifa Brackets</strong> — a bracket pair carrying one SymboE subscript:{' '}
                {'('}
                <IfaExpr char=")" charSize="0.85rem" symSize={7} charColor="#14b8d4" />.
                {' '}Similarly, <IfaExpr char="T" charSize="0.85rem" symSize={7} charColor="#14b8d4" /> is <strong>Ifa T</strong> and{' '}
                <IfaExpr char="X" charSize="0.85rem" symSize={7} charColor="#14b8d4" /> is <strong>Ifa X</strong>.
              </p>
            </div>
          </div>
          <div className="ift-split__img">
            <figure className="ift-fig">
              <img src="../src/image-1-1024x683.png" alt="IfaTransform — Universe of Transforms" className="ift-img" />
              <figcaption className="ift-fig-cap">IfaTransform: The container of all transforms across all fields of knowledge</figcaption>
            </figure>
          </div>
        </div>

        {/* Quick-ref cards */}
        <div className="ift-card-row" style={{ marginTop: '40px' }}>
          {[
            { sym: '∫∂', title: 'All Differintegrals', color: '#14b8d4', body: 'IfaTransform contains all fractional and integer-order differintegrals as special operational cases.' },
            { sym: '𝓕', title: 'All Spectral Transforms', color: '#f5c518', body: 'Fourier, Laplace, Z-Transform, Wavelet — all spectral and frequency-domain transforms are special cases.' },
            { sym: '⊗', title: 'All Algebraic Ops', color: '#8b5cf6', body: 'Every algebraic operation, composition, convolution, and tensor product is an IfaTransform special case.' },
            { sym: 'Ψ', title: 'All Quantum Operators', color: '#00c87c', body: 'Hamiltonian, momentum, position, and all quantum mechanical operators emerge as IfaTransform instances.' },
          ].map((c, i) => (
            <div key={i} className="ift-mini-card" style={{ '--mc': c.color }}>
              <div className="ift-mini-card__sym">{c.sym}</div>
              <div className="ift-mini-card__title">{c.title}</div>
              <p className="ift-mini-card__body">{c.body}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '32px' }}>
          <a href="https://ifainternet.org/ifa-mathematica/ifa-gebra/"
             className="ifg-link-card" target="_blank" rel="noopener noreferrer">
            <span className="ifg-link-card__sym" style={{ color: '#8b5cf6' }}>⊗</span>
            <div>
              <div className="ifg-link-card__title">IfaGebra — Algebra of Everything (AlgebroE) ↗</div>
              <div className="ifg-link-card__sub">
                The Meta-Algebraic Framework underlying IfaTransform — every algebraic operation,
                Ifa Operator, and energy-exchange rule is defined within IfaGebra and its Ifalgebras.
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── IFA DIFFERINTEGRAL ───────────────────────────────────────────────────────

function DifferintegralSection() {
  return (
    <section className="section section--dark" id="differintegral">
      <div className="container">
        <div className="section__header section__header--center">
          <span className="section__eyebrow" style={{ color: '#3b9eff' }}>IfaDifferintegral</span>
          <h2 className="section__title">The <span style={{ color: '#3b9eff' }}>World of Differintegrals</span></h2>
          <p className="section__subtitle">
            IfaDifferintegral is the Ifa generalisation of fractional calculus — the meta-structure
            containing all known differintegrals as special cases, unified through Energy (
            <OgbeSymbol size={16} />) as the Universal Field.
          </p>
        </div>

        <div className="ift-split ift-split--img-left" style={{ marginBottom: '40px' }}>
          <div className="ift-split__img">
            <figure className="ift-fig">
              <img src="../src/image-105.png" alt="IfaDifferintegral formulas and framework" className="ift-img" />
              <figcaption className="ift-fig-cap">IfaDifferintegral: the Ifa generalisation of all fractional and integer-order calculus operations</figcaption>
            </figure>
          </div>
          <div className="ift-split__text">
            <p className="ift-body">
              <strong>IfaDifferintegral</strong> is the World of Differintegrals — the Ifa meta-structure
              that contains and generalises all differintegrals in fractional calculus and beyond.
              A differintegral unifies differentiation and integration into a single operator parametrised
              by a real or complex order α. IfaDifferintegral extends this concept to all fields of
              knowledge: every operation that blends analysis and synthesis — in science, engineering,
              art, music, social science — is modelled as an Ifa Differintegral of some order.
            </p>
            <p className="ift-body">
              The Unifying Principle is <strong>Energy</strong> (<OgbeSymbol size={14} /> — Ogbe/CEN):
              every differintegral operation is an Energy-based process governed by the Odu Ifa
              corresponding to its operational domain. The order α of the differintegral maps to
              the Ifa Energy State of the knowledge field under study.
            </p>
          </div>
        </div>

        <div className="ift-grid-4">
          {DIFFERINTEGRAL_ITEMS.map((d, i) => (
            <div key={i} className="ift-diff-card" style={{ '--dc': d.color }}>
              <div className="ift-diff-card__name">{d.name}</div>
              <div className="ift-diff-card__sub">{d.sub}</div>
              <p className="ift-diff-card__body">{d.body}</p>
            </div>
          ))}
        </div>

        <figure className="ift-fig ift-fig--center" style={{ marginTop: '36px' }}>
          <img src="../src/Ifa-Function-2-768x314.png" alt="Ifa Function — generalized transform function" className="ift-img ift-img--wide" />
          <figcaption className="ift-fig-cap">Ifa Function (FunctoE): the Generalised Transform Meta-Function underlying IfaDifferintegral and all Ifa Operations</figcaption>
        </figure>
      </div>
    </section>
  );
}

// ─── THE IFA TRANSFORMER ──────────────────────────────────────────────────────

function TransformerSection() {
  const [active, setActive] = useState(0);
  const t = TRANSFORMER_NAMES[active];
  return (
    <section className="section" id="transformer">
      <div className="container">
        <div className="section__header section__header--center">
          <span className="section__eyebrow section__eyebrow--gold">The Ifa Transformer</span>
          <h2 className="section__title">The <span className="accent--gold">Ifa Transformer</span> &amp; Its Names</h2>
          <p className="section__subtitle">
            The Ifa Transformer is the tool for modelling, simulation, mapping, and all
            unification and integration operations on the IFA Internet — known by many names
            across the fields it serves.
          </p>
        </div>

        <div className="ift-split ift-split--img-right">
          <div className="ift-split__text">
            <p className="ift-body">
              The <strong>Ifa Transformer</strong> is the operational instantiation of IfaTransform —
              the active tool through which the Universe of Transforms is applied to real knowledge
              problems across all fields of the IFA Internet. It serves as a modelling engine,
              simulation framework, and cross-field mapping instrument, enabling practitioners to
              apply Ifa Transform principles across Science, Technology, Engineering, Arts,
              Mathematics, Social Science, Education, and all unknown fields (STEAMSEX).
            </p>
            <p className="ift-body">
              Like all Ifa concepts, the Ifa Transformer carries multiple names — each emphasising
              a different dimension of its operation. Select a name below to explore its specific
              emphasis and role.
            </p>

            <div className="ift-transformer-tabs">
              {TRANSFORMER_NAMES.map((tn, i) => (
                <button key={i}
                  className={`ift-tab-btn${active === i ? ' ift-tab-btn--active' : ''}`}
                  style={{ '--tc': tn.color }}
                  onClick={() => setActive(i)}>
                  <span className="ift-tab-btn__sym">{tn.sym}</span>
                  <span>{tn.name}</span>
                </button>
              ))}
            </div>

            <div className="ift-tab-detail" style={{ '--tc': t.color }}>
              <div className="ift-tab-detail__name">{t.name}</div>
              <p className="ift-tab-detail__body">{t.desc}</p>
            </div>
          </div>

          <div className="ift-split__img">
            <figure className="ift-fig">
              <img src="../src/image-107.png" alt="Ifa Transformer diagram" className="ift-img" />
              <figcaption className="ift-fig-cap">Odufa Ose Meji (Odù 15): the Ifa Law governing all operations and transformations</figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── IFA OPERATOR THEORY ──────────────────────────────────────────────────────

function OperatorTheorySection() {
  const [active, setActive] = useState(0);
  const op = OPERATOR_TABS[active];

  return (
    <section className="section section--alt" id="operators">
      <div className="container">
        <div className="section__header section__header--center">
          <span className="section__eyebrow section__eyebrow--violet">Ifa Operator Theory</span>
          <h2 className="section__title">The Theory of <span className="accent--violet">Operators in Ifa</span></h2>
          <p className="section__subtitle">
            Ifa Operator Theory extends classical operator theory to all fields of knowledge —
            modelling every rule of transformation as an Ifa Operator acting on energyforms
            across the full STEAMSEX Matrix.
          </p>
        </div>

        <div className="ift-split ift-split--img-right" style={{ marginBottom: '48px' }}>
          <div className="ift-split__text">
            <div className="ift-highlight-box" style={{ '--hc': '#8b5cf6' }}>
              <div className="ift-highlight-box__label">Operator vs Operation</div>
              <p className="ift-highlight-box__text">
                An <strong>Operator</strong> is the rule or transformation that acts on
                something to produce a result. An <strong>Operation</strong> is the actual
                process of performing that transformation. The Ifa distinction: the Operator
                is the <em>energyform of the rule</em>; the Operation is the <em>energyform of the act</em>.
              </p>
            </div>
            <p className="ift-body" style={{ marginTop: '16px' }}>
              In Ifa Operator Theory, operators are classified not by their mathematical form
              alone but by their <strong>Energy Patterns or Vibrations</strong> called the <strong>Odufa</strong>.
              Every operator — from simple arithmetic (+, −, ×, ÷) to advanced quantum operators
              (Ĥ, p̂, x̂) and beyond — carries an Ifa Encoding called Odu that reveals its place in the
              256 Odu Ifa Knowledge Matrix. Ifa Operators that produce outputs belong to the Class,{' '}
              <strong>OperatoE</strong>; their Duals are Ifa Operators that produce void, which belong to <strong>AperatoE</strong>.
            </p>
          </div>
          <div className="ift-split__img">
            <figure className="ift-fig">
              <img src="../src/image-172.png" alt="Ifa Operator Theory framework" className="ift-img" />
              <figcaption className="ift-fig-cap">Ifa Operator Theory: operators classified based on their Ifa Energy Signatures or Patterns, Odu Ifa</figcaption>
            </figure>
          </div>
        </div>

        {/* Operator mapping diagram */}
        <figure className="ift-fig ift-fig--center" style={{ margin: '32px auto 0', maxWidth: '700px', paddingBottom: '14px' }}>
          <img src="../src/image-162.png" alt="Ifa Operator mapping: Tₑ : Xₑ → Yₑ" className="ift-img" />
          <figcaption className="ift-fig-cap">
            Ifa Operator Mapping — every Ifa Operator maps an energyform{' '}
            <IfaExpr char="X" charSize="0.73rem" symSize={5} charColor="var(--text-3)" />{' '}
            to an output{' '}
            <IfaExpr char="Y" charSize="0.73rem" symSize={5} charColor="var(--text-3)" />
          </figcaption>
        </figure>

        {/* Tabbed operator types */}
        <div className="principles-layout">
          <div className="principles-tabs">
            {OPERATOR_TABS.map((o, i) => (
              <button key={i}
                className={`principle-tab${i === active ? ' principle-tab--active' : ''}`}
                style={{ '--pt-color': o.color }}
                onClick={() => setActive(i)}>
                <span className="principle-tab__sym">{o.sym}</span>
                <span className="principle-tab__name">{o.title}</span>
                <span className="principle-tab__arrow">›</span>
              </button>
            ))}
          </div>

          <div className="principle-detail" style={{ '--pd-color': op.color }}>
            <div className="principle-detail__bg" />
            <div className="principle-detail__sym">{op.sym}</div>
            <h3 className="principle-detail__title">{op.title}</h3>
            <div className="principle-detail__sub">{op.sub}</div>
            <p className="principle-detail__body">{op.body}</p>
            {op.img && (
              <figure className="ift-fig" style={{ marginTop: '20px' }}>
                <img src={op.img} alt={op.imgAlt} className="ift-img ift-img--wide" />
                <figcaption className="ift-fig-cap">{op.imgAlt}</figcaption>
              </figure>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── ODUFA OSE MEJI ───────────────────────────────────────────────────────────

function OseMejiSection() {
  return (
    <section className="section section--dark" id="ose-meji">
      <div className="container">
        <div className="section__header section__header--center">
          <span className="section__eyebrow" style={{ color: '#3b9eff' }}>Odufa Ose Meji</span>
          <h2 className="section__title">The <span style={{ color: '#3b9eff' }}>Ifa Law of Nature</span> Governing All Operations</h2>
          <p className="section__subtitle">
            Odufa Ose Meji — the 15th Principal Odu Ifa — is the Ifa Law of Nature that governs
            all kinds of operations, changes, transformations, functions/functors, actions, and processes across every dimension of existence.
          </p>
        </div>

        <div className="ift-split ift-split--img-left" style={{ marginBottom: '40px' }}>
          <div className="ift-split__img">
            <figure className="ift-fig">
              <img src="../src/image-169.png" alt="Odufa Ose Meji — 15th Principal Odu Ifa" className="ift-img" />
              <figcaption className="ift-fig-cap">The Ifa Notations: IfaSigma OperatoE for the Integration and Unification of Everything (UIoE)</figcaption>
            </figure>
          </div>
          <div className="ift-split__text">
            <p className="ift-body">
              <strong>Odufa Ose Meji</strong> is the 15th of the 16 Principal Odu Ifa and serves
              as the Ifa Law of Nature governing <em>all kinds of operations</em>. In Ifa Operator
              Theory, Ose Meji encodes the <strong>Fundamental Principle</strong> that every operation — whether
              mathematical, physical, chemical, biological, social, artistic, or spiritual — has a Superpartner
              called <strong>Ìpọ̀nrí</strong> or <strong>Ẹnìkejì</strong> in the non-physical dimensions and follows
              the <strong>Energy-exchange</strong> pattern revealed in this Odu.
            </p>
            <p className="ift-body">
              Ose Meji's governing <strong>Principle</strong> establishes that all operations are inherently
              <strong> bidirectional and energetic</strong>: every act of transformation expends
              the Energy, Ogbe, and produces a corresponding result, and for every operation there exist
              a Dual in the unphysical realms and an inverse in the anti-physical dimensions — a Principle
              that underpins the entire <strong>Architecture</strong> of Ifa Transform,
              IfaDifferintegral, and Ifa Operator Theory.
            </p>
          </div>
        </div>

        <div className="ift-card-row">
          {OSE_MEJI_CARDS.map((c, i) => (
            <div key={i} className="ift-ose-card" style={{ '--oc': c.color }}>
              <div className="ift-ose-card__sym">{c.sym}</div>
              <div className="ift-ose-card__title">{c.title}</div>
              <p className="ift-ose-card__body">{c.body}</p>
            </div>
          ))}
        </div>

        <div className="ift-img-row" style={{ marginTop: '36px' }}>
          <figure className="ift-fig ift-fig--half">
            <img src="../src/image-167.png" alt="Ose Meji energy diagram" className="ift-img" />
            <figcaption className="ift-fig-cap">Ose Meji: the Energy Pattern of all operations in modern fields</figcaption>
          </figure>
          <figure className="ift-fig ift-fig--half">
            <img src="../src/image-173.png" alt="Ifa operations governed by Ose Meji" className="ift-img" />
            <figcaption className="ift-fig-cap">All operations as governed by Odufa Ose Meji across the STEAMSEX Matrix</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

// ─── PLUS-OR-MINUS & PLUS-AND-MINUS OPERATORS ─────────────────────────────────

function PlusMinusSection() {
  return (
    <section className="section" id="pm-operators">
      <div className="container">
        <div className="section__header section__header--center">
          <span className="section__eyebrow section__eyebrow--amber">Ifa Operator Innovation</span>
          <h2 className="section__title">Plus-or-Minus &amp; the New <span className="accent--amber">Plus-and-Minus Operator</span></h2>
          <p className="section__subtitle">
            Ifa Mechanics introduces a fundamental distinction between the classical Plus-or-Minus operator
            and the new Plus-and-Minus operator — and reveals its dual, establishing a richer operational
            framework than classical mathematics provides.
          </p>
        </div>

        {/* Plus-or-Minus */}
        <div className="ift-op-section">
          <div className="ift-op-header" style={{ '--opc': '#f5c518' }}>
            <span className="ift-op-header__sym">±</span>
            <div>
              <div className="ift-op-header__title">Plus-or-Minus Operator (±)</div>
              <div className="ift-op-header__sub">Classical — one or the other</div>
            </div>
          </div>
          <div className="ift-split ift-split--img-right">
            <div className="ift-split__text">
              <p className="ift-body">
                The classical <strong>Plus-or-Minus operator (±)</strong> means <em>either</em> addition
                or subtraction — one of the two alternatives applies, but not both simultaneously.
                It is widely used in mathematics (e.g., the quadratic formula x = (−b ± √D) / 2a)
                to represent a binary choice between two outcomes.
              </p>
              <p className="ift-body">
                In Ifa Mechanics, the Plus-or-Minus operator is classified as a <strong>classical
                disjunctive operator</strong> — it belongs to the domain of Ifa Binary Logic (Ogbe
                or Oyeku — one or the other). It is a special case of the Ifa Operator governed by
                Odufa Ose Meji, operating in the Ifa exclusive-or (IfaXOR) Energy domain.
              </p>
              {/* IfaXOR operator notation */}
              <p style={{ fontFamily: 'monospace', fontSize: '1.05rem', fontWeight: 700, color: '#f5c518', marginTop: 16, lineHeight: 2, letterSpacing: '0.01em' }}>
                {'IfaXOR: (XOR'}
                <IfaExpr char=")" charSize="1.05rem" symSize={8} charColor="#f5c518" />
              </p>
            </div>
            <div className="ift-split__img">
              <figure className="ift-fig">
                <img src="../src/Ifa-Operator4-768x314.png" alt="Plus-or-Minus operator in Ifa framework" className="ift-img" />
                <figcaption className="ift-fig-cap">The Plus-or-Minus (±) operator as an Ifa Operator: classical disjunctive operation</figcaption>
              </figure>
            </div>
          </div>
        </div>

        {/* Plus-and-Minus */}
        <div className="ift-op-section" style={{ marginTop: '48px' }}>
          <div className="ift-op-header" style={{ '--opc': '#14b8d4' }}>
            <span className="ift-op-header__sym" style={{ display: 'inline-block', transform: 'rotate(-180deg) scaleY(-1) rotate(90deg)' }}>±</span>
            <div>
              <div className="ift-op-header__title">Plus-and-Minus Operator (new)</div>
              <div className="ift-op-header__sub">Ifa — both simultaneously · Superposition</div>
            </div>
          </div>
          <div className="ift-split ift-split--img-left">
            <div className="ift-split__img">
              <figure className="ift-fig">
                <img src="../src/Ifa-Emergence-3-768x314.png" alt="Plus-and-Minus operator emergence" className="ift-img" />
                <figcaption className="ift-fig-cap">The new Plus-and-Minus operator: simultaneous addition and subtraction — Superposition</figcaption>
              </figure>
            </div>
            <div className="ift-split__text">
              <p className="ift-body">
                The new <strong>Plus-and-Minus operator</strong> introduced in Ifa Mechanics is
                fundamentally different from ±: it means <em>both</em> addition <em>and</em> subtraction
                simultaneously, not as a choice between alternatives but as a genuine superposition
                of both operations occurring at once. This corresponds directly to the Ifa Superposition
                Principle and the Doubly Infinite nature of Odu Ifa.
              </p>
              <p className="ift-body">
                Its <strong>dual in Ifa Mechanics</strong> — the <em>Minus-and-Plus operator</em> —
                represents the simultaneous subtraction-and-addition in the complementary energy
                direction, together forming a conjugate pair that models energy exchange in both
                directions of the Ifa Field simultaneously.
              </p>
            </div>
          </div>

          <figure className="ift-fig ift-fig--center" style={{ marginTop: '28px', maxWidth: '860px', margin: '28px auto 0' }}>
            <img src="../src/Amulu-Matrix-768x314.png" alt="The 8 Amulu Operator Symbols" className="ift-img" />
            <figcaption className="ift-fig-cap">The 8 Amulu Operator Symbols — the AND OperatoE (Energy Intersection) is the Plus-and-Minus Meta-Operator in IFALang</figcaption>
          </figure>

          <figure className="ift-fig ift-fig--center" style={{ marginTop: '28px' }}>
            <img src="../src/Plus-and-Minus-Use-Cases-768x314.png" alt="Plus-and-Minus operator use cases" className="ift-img ift-img--wide" />
            <figcaption className="ift-fig-cap">Use cases of the Plus-and-Minus Operator across mathematics, physics, and the IFA Internet</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

// ─── IFA OPERATIONS (OpoE) & AMULU MATRIX ────────────────────────────────────

function OpoESection() {
  return (
    <section className="section section--alt" id="opoe">
      <div className="container">
        <div className="section__header section__header--center">
          <span className="section__eyebrow" style={{ color: '#00c87c' }}>OpoE · Operations of Everything</span>
          <h2 className="section__title">Ifa Operations &amp; the <span style={{ color: '#00c87c' }}>Amulu Matrix</span></h2>
          <p className="section__subtitle">
            Ifa Operations (OpoE) are the Operations of Everything — every act of applying an
            Ifa Operator to an energyform. The Amulu Matrix organises all Ifa compositions
            into a unified operational framework.
          </p>
        </div>

        <div className="ift-split ift-split--img-right" style={{ marginBottom: '40px' }}>
          <div className="ift-split__text">
            <p className="ift-body">
              <strong>Ifa Operations (OpoE)</strong> are the Operations of Everything — the actual
              process of applying an Ifa Operator to one or more energyforms. Where an Ifa Operator
              is the <em>rule</em>, an Ifa Operation is the <em>act</em>. Every operation in every
              field — integration, differentiation, multiplication, rotation, permutation, translation,
              convolution, logical evaluation, quantum measurement — is an Ifa Operation (OpoE).
            </p>
            <p className="ift-body">
              OpoE extends the concept of operations to all dimensions of reality, including
              non-physical operations: artistic composition, ritual performance, social interaction,
              and spiritual exchange are all modelled as Ifa Operations governed by the Odu Ifa
              corresponding to their energy-exchange type.
            </p>
            <div className="ift-highlight-box" style={{ '--hc': '#00c87c' }}>
              <div className="ift-highlight-box__label">Amulu — Ifa Composition</div>
              <p className="ift-highlight-box__text">
                <strong>Amulu</strong> (Yoruba: composition/union) is the Ifa principle of operation
                and composition — the energy act of combining two or more energyforms. The
                <strong> Amulu Matrix</strong> is the complete table of all pairwise Ifa compositions,
                analogous to a Cayley table in group theory but extended to all 256 Odu Ifa.
              </p>
            </div>
          </div>
          <div className="ift-split__img">
            <figure className="ift-fig">
              <img src="../src/Amulu-Matrix-768x314.png" alt="The Amulu Matrix — Ifa composition table" className="ift-img" />
              <figcaption className="ift-fig-cap">The Amulu Matrix: the Complete Table of all Ifa Compositions or Operations for Everything (OpoE)</figcaption>
            </figure>
          </div>
        </div>

        <figure className="ift-fig ift-fig--center">
          <img src="../src/Ifanary-Operations-768x314.png" alt="Ifanary Operations — Ifa ternary operation table" className="ift-img ift-img--wide" />
          <figcaption className="ift-fig-cap">Ifanary Operations: ternary Ifa Operations extending OpoE to three-valued logic and Consciousness Mechanics</figcaption>
        </figure>
      </div>
    </section>
  );
}

// ─── IFA BINARY LOGIC & IFA TERNARY LOGIC ────────────────────────────────────

function LogicSection() {
  const [active, setActive] = useState(0);
  const tab = LOGIC_TABS[active];

  return (
    <section className="section section--dark" id="logic">
      <div className="container">
        <div className="section__header section__header--center">
          <span className="section__eyebrow section__eyebrow--violet">IfaLogic Systems: Energy-Based Logic Systems</span>
          <h2 className="section__title">Ifa <span className="accent--violet">Binary</span> Logic &amp; Ifa <span className="accent--violet">Ternary</span> Logic</h2>
          <p className="section__subtitle">
            Ifa Logic extends classical Boolean logic through Ifa Binary Logic and introduces the
            new three-valued Ifa Ternary Logic — together modelling key logical operations
            in the universe.
          </p>
        </div>

        <div className="ift-logic-tabs-row">
          {LOGIC_TABS.map((t, i) => (
            <button key={i}
              className={`ift-logic-tab${active === i ? ' ift-logic-tab--active' : ''}`}
              style={{ '--ltc': t.color }}
              onClick={() => setActive(i)}>
              {t.label}
            </button>
          ))}
        </div>

        <div className="ift-logic-panel" style={{ '--ltc': tab.color }}>
          <p className="ift-body">{tab.body}</p>
          <div className="ift-img-row" style={{ marginTop: '28px' }}>
            {tab.imgs.map((img, i) => (
              <figure key={i} className={`ift-fig ${tab.imgs.length === 1 ? 'ift-fig--center' : 'ift-fig--flex'}`}>
                <img src={img.src} alt={img.alt} className="ift-img" />
                <figcaption className="ift-fig-cap">{img.alt}</figcaption>
              </figure>
            ))}
          </div>
        </div>

        {/* Ifa Truth Table */}
        <div style={{ marginTop: '48px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-1)', marginBottom: '6px', textAlign: 'center' }}>
            The Ifa Truth Table: The ToE Truth Table
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-3)', textAlign: 'center', marginBottom: '20px' }}>
            IfaLang Representation of every logical operator using Ifa Brackets (Brackets for Everything, BracktoE/ToE Brackets)
          </p>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #14b8d4' }}>
                  <th style={{ textAlign: 'left', padding: '10px 16px', color: '#14b8d4', fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', fontSize: '0.72rem' }}>Logical Operator</th>
                  <th style={{ textAlign: 'left', padding: '10px 16px', color: '#14b8d4', fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', fontSize: '0.72rem' }}>IfaLang Representation</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { op: 'OR',   name: 'IfaOR'   },
                  { op: 'AND',  name: 'IfaAND'  },
                  { op: 'NOT',  name: 'IfaNOT'  },
                  { op: 'XOR',  name: 'IfaXOR'  },
                  { op: 'NAND', name: 'IfaNAND' },
                  { op: 'NOR',  name: 'IfaNOR'  },
                  { op: 'XNOR', name: 'IfaXNOR' },
                ].map(({ op, name }, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid color-mix(in srgb, #14b8d4 12%, transparent)', background: i % 2 === 0 ? 'color-mix(in srgb, #14b8d4 4%, var(--bg-card))' : 'transparent' }}>
                    <td style={{ padding: '12px 16px', color: 'var(--text-1)', fontWeight: 600 }}>{op}</td>
                    <td style={{ padding: '12px 16px', fontFamily: 'monospace', color: '#14b8d4', fontWeight: 700, fontSize: '1rem', lineHeight: 1.8, paddingBottom: '18px' }}>
                      {'(' + op}
                      <IfaExpr char=")" charSize="1rem" symSize={7} charColor="#14b8d4" />
                      {'\u00a0\u00a0'}
                      <span style={{ color: 'var(--text-2)', fontSize: '0.82rem', fontFamily: 'inherit', fontWeight: 400 }}>({name})</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── IFA PARTICLE PHYSICS & MODELING INTERDISCIPLINARY FORCES ─────────────────

function ParticlePhysicsSection() {
  return (
    <section className="section" id="particle-physics">
      <div className="container">
        <div className="section__header section__header--center">
          <span className="section__eyebrow" style={{ color: '#ec4899' }}>Ifa Particle Physics</span>
          <h2 className="section__title">General Symbol of <span style={{ color: '#ec4899' }}>Oniums</span> &amp; Modeling Interdisciplinary Forces</h2>
          <p className="section__subtitle">
            Ifa Particle Physics generalises the particle physics framework to all fields of knowledge bringing about the interdisciplinary field of IfaParticle Field —
            introducing IfaParticles as the general particle class for all knowledge fields and using them to study, model interdisciplinary forces
            through the Amulu of Oniums (Ifa Oniums), Ifa Transform.
          </p>
        </div>

        <div className="ift-split ift-split--img-left">
          <div className="ift-split__img">
            <figure className="ift-fig">
              <img src="../src/IFA-Transformation-Theory-1-768x512.png" alt="Ifa Transformation Theory — Base Field and Particle Physics" className="ift-img" />
              <figcaption className="ift-fig-cap">Ifa Transformation Theory: the Base Field, Oniums, and interdisciplinary forces</figcaption>
            </figure>
          </div>
          <div className="ift-split__text">
            <p className="ift-body">
              In Ifa Particle Physics, the concept of a <strong>particle</strong> is generalised
              to an <strong>energyform</strong> — any entity in any field that carries, stores,
              or exchanges the Energy of Ogbe. The General Class of the Composite Form (Amulu) of such entities is called <strong>IfaOniums</strong>:
              Composite Particles of knowledge, consciousness, culture, biology, physics, and all other domains.
            </p>
            <p className="ift-body">
              Just as particle physics models the forces between physical particles (gravitational,
              electromagnetic, strong, weak), <strong>Ifa particles and Ifa oniums</strong> model the
              forces — or <em>energy-exchange interactions</em> — across interdisciplinary
              boundaries. This enables rigorous modelling of cross-field phenomena: how a concept
              in mathematics interacts with one in music, or how a social structure relates to a
              physical law.
            </p>
            <div className="ift-highlight-box" style={{ '--hc': '#ec4899' }}>
              <div className="ift-highlight-box__label">Onium — General Particle Symbol</div>
              <p className="ift-highlight-box__text">
                The general symbol for an Onium is <strong>X</strong> (or <IfaExpr char="X" charSize="1rem" symSize={10} charColor="#ec4899" />
                {' '}in Ifa Script Notation) — where X represents any energyform in any field, consistent
                with the SIDECHRX Framework encoded in the 16 Principal Odu Ifa.
              </p>
            </div>
            <figure className="ift-fig ift-fig--center" style={{ marginTop: '28px', maxWidth: '860px', margin: '28px auto 0' }}>
              <img src="../src/Ifa-Computing-Operators1-2-768x314.png" alt="Ifa Computing Operators" className="ift-img" />
              <figcaption className="ift-fig-cap">The Symbol for Everything (SymboE): Ifa-Infinity, the Ifa Symbol for Ogbe Energy</figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── IFA TRANSFORMATION THEORY — BASE FIELD & DOUBLY INFINITE WELL ────────────

function TransformationTheorySection() {
  return (
    <section className="section section--alt" id="theory">
      <div className="container">
        <div className="section__header section__header--center">
          <span className="section__eyebrow" style={{ color: '#14b8d4' }}>The Ifa Transformation Theory</span>
          <h2 className="section__title">The Base Field, <span style={{ color: '#14b8d4' }}>Energy</span>, &amp; the Doubly Infinite Well</h2>
          <p className="section__subtitle">
            The Ifa Transformation Theory establishes Energy (represented by SymboE —{' '}
            <OgbeSymbol size={16} />) as the Base Field of all transforms — and introduces the
            Ifa Doubly Infinite Well as the generalisation of the quantum Infinite Square Well.
          </p>
        </div>

        {/* Base Field */}
        <div className="ift-split ift-split--img-right" style={{ marginBottom: '48px' }}>
          <div className="ift-split__text">
            <h3 className="ift-sub-heading">The Base Field — Energy (<OgbeSymbol size={18} />)</h3>
            <p className="ift-body">
              The <strong>Ifa Transformation Theory</strong> is based on <strong>Energy</strong>{' '}
              (represented by the SymboE or Ifa Infinity — <OgbeSymbol size={14} />)
              as the Base Field of all knowledge fields and transforms.
            </p>
          </div>
          <div className="ift-split__img">
            <figure className="ift-fig">
              <img src="../src/Ifa-Infinity-768x286.png" alt="Ifa Infinity — the Doubly Infinite field" className="ift-img" />
              <figcaption className="ift-fig-cap">Ifa Infinity — the Doubly Infinite nature of the Ifa Field: possibilities and impossibilities</figcaption>
            </figure>
          </div>
        </div>

        {/* Doubly Infinite Well */}
        <div className="ift-split ift-split--img-left" style={{ marginBottom: '40px' }}>
          <div className="ift-split__img">
            <figure className="ift-fig">
              <img src="../src/image-107%20(1).png" alt="Ifa Doubly Infinite Well vs Quantum Infinite Square Well" className="ift-img" />
              <figcaption className="ift-fig-cap">The Ifa Doubly Infinite Well: compared with the quantum mechanical Infinite Square Well</figcaption>
            </figure>
          </div>
          <div className="ift-split__text">
            <h3 className="ift-sub-heading">The Ifa Doubly Infinite Well in Consciousness Mechanics (Ifa Mechanics)</h3>
            <p className="ift-body">
              The <strong>Ifa Doubly Infinite Well</strong> is the ifamechanical generalisation of
              the <em>Infinite Square Well</em> (particle in a box) in Quantum Mechanics.
              Where the quantum infinite square well confines a particle between two infinite
              potential walls in one spatial dimension, the Ifa Doubly Infinite Well extends this
              to a <strong>doubly infinite</strong> potential Structure, Ogbe Energy — infinite in both directions
              of the Ifa Field — modelling the confinement of any energyform within the
              Doubly Infinite Ocean of Knowledge in Odu Ifa.
            </p>
            <p className="ift-body">
              This Doubly Infinite Structure directly reflects the <strong>Ifa Superposition Principle</strong>:
              just as the quantum particle in a box exists in a superposition of energy eigenstates,
              every Odu Ifa exists as a superposition of infinite possibilities <em>and</em> infinite
              impossibilities — the Double Infinity of IfaInfinity. The Doubly Infinite Well provides
              the consciousness mechanical model for this profound Ifa Principle.
            </p>
          </div>
        </div>

        {/* Comparison panel */}
        <div className="ift-compare-row">
          <div className="ift-compare-card" style={{ '--cc': '#3b9eff' }}>
            <div className="ift-compare-card__label">Quantum Mechanics</div>
            <div className="ift-compare-card__title">Infinite Square Well</div>
            <ul className="ift-compare-card__list">
              <li>Particle confined between two walls at x = 0 and x = L</li>
              <li>Infinite potential outside the well; zero inside</li>
              <li>Discrete energy levels: Eₙ = n²π²ℏ²/2mL²</li>
              <li>Particle exists in superposition of eigenstates within well</li>
              <li>Applies to physical particles in physical space</li>
            </ul>
          </div>
          <div className="ift-compare-arrow">⟺</div>
          <div className="ift-compare-card" style={{ '--cc': '#14b8d4' }}>
            <div className="ift-compare-card__label">Consciousness Mechanics</div>
            <div className="ift-compare-card__title">Ifa Doubly Infinite Well</div>
            <ul className="ift-compare-card__list">
              <li>Energyform confined in the Doubly Infinite Ocean of Knowledge (Odu Ifa)</li>
              <li>Infinite potential in both directions of the Ifa Field: Ogbe and Oyeku Infinities</li>
              <li>Discrete and Non-Discrete Energy States: Odu Ifa Encodings of all knowledge fields modelled as energyforms</li>
              <li>Energyform in Superposition of infinite possibilities AND impossibilities</li>
              <li>Represents everything in existence and every field of knowledge as energyforms</li>
            </ul>
          </div>
        </div>

        <figure className="ift-fig ift-fig--center" style={{ marginTop: '36px' }}>
          <img src="../src/image-108.png" alt="The Doubly Infinite Ocean of Knowledge in Odu Ifa" className="ift-img ift-img--wide" />
          <figcaption className="ift-fig-cap">The Doubly Infinite Ocean of Ifa Knowledge: Odu Ifa as the field of infinite possibilities and infinite impossibilities — the Ifa Superposition Principle</figcaption>
        </figure>
      </div>
    </section>
  );
}

// ─── TOE 0+8D MATRIX ─────────────────────────────────────────────────────────

const TOE_DIMS = [
  { letter:'S', name:'ToE Science',        short:'Science',       color:'#14b8d4',
    desc:'ToE Science is the Theory of Everything Science — the systematic study of the natural world modelled through the Energy-Based Approaches of Ifa and the 256 Odu Ifa.' },
  { letter:'T', name:'ToE Technology',     short:'Technology',    color:'#f59e0b',
    desc:'ToE Technology is the Theory of Everything Technology — the creation and application of tools, systems, and techniques modelled through the Energy-Based Approaches of Ifa and the 256 Odu Ifa.' },
  { letter:'E', name:'ToE Engineering',    short:'Engineering',   color:'#10b981',
    desc:'ToE Engineering is the Theory of Everything Engineering — the design and building of systems and structures modelled through the Energy-Based Approaches of Ifa and the 256 Odu Ifa.' },
  { letter:'A', name:'ToE Arts',           short:'Arts',          color:'#ec4899',
    desc:'ToE Arts is the Theory of Everything Arts — creative and expressive human endeavour modelled through the Energy-Based Approaches of Ifa and the 256 Odu Ifa.' },
  { letter:'M', name:'ToE Mathematics',    short:'Mathematics',   color:'#8b5cf6',
    desc:'ToE Mathematics is the Theory of Everything Mathematics — the formal study of structure, quantity, and transformation modelled through the Energy-Based Approaches of Ifa and the 256 Odu Ifa.' },
  { letter:'S', name:'ToE Social Science', short:'Social Sci.',   color:'#f97316',
    desc:'ToE Social Science is the Theory of Everything Social Science — the study of human society and relationships modelled through the Energy-Based Approaches of Ifa and the 256 Odu Ifa.' },
  { letter:'E', name:'ToE Education',      short:'Education',     color:'#06b6d4',
    desc:'ToE Education is the Theory of Everything Education — the transmission of knowledge, values, and skills across generations modelled through the Energy-Based Approaches of Ifa and the 256 Odu Ifa.' },
  { letter:'X', name:'ToE Others',         short:'Unknowns',      color:'#a78bfa',
    desc:'ToE Others is the Theory of Everything Others — all fields, disciplines, and phenomena not yet named or classified, modelled through the Energy-Based Approaches of Ifa and the 256 Odu Ifa.' },
];

function ToeSteamsexDiagram() {
  const [active, setActive]         = React.useState(false);
  const [hoveredDim, setHoveredDim] = React.useState(null);
  const [pinnedDim, setPinnedDim]   = React.useState(null);

  const cx = 390, cy = 310, nodeR = 220, centerR = 60, dimR = 40;
  const accentColor = '#f0920c';
  const isTouch = React.useMemo(
    () => typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0),
    []
  );

  const dims = TOE_DIMS.map((d, i) => {
    const angle = (i / 8) * 2 * Math.PI - Math.PI / 2;
    return { ...d, x: cx + nodeR * Math.cos(angle), y: cy + nodeR * Math.sin(angle), angle };
  });

  const hovDim = pinnedDim !== null ? dims[pinnedDim] : hoveredDim !== null ? dims[hoveredDim] : null;

  const handleToggle   = () => { setActive(v => !v); setHoveredDim(null); setPinnedDim(null); };
  const handleDimClick = (i) => { if (!active) return; setPinnedDim(p => p === i ? null : i); };

  return (
    <div className="stx-diagram" style={{ marginBottom: '48px' }}>
      <div className="stx-diagram__graph-wrap">
        <div className="stx-diagram__title">The Ifa TOE 0+8D Matrix · Ifa Transform</div>
        <div className="stx-diagram__hint">
          {!active
            ? <>{isTouch ? 'Tap' : 'Click'} <strong style={{ color: accentColor }}>Ifa TOE</strong> to explore the 8 STEAMSEX Dimensions →</>
            : isTouch
              ? <span style={{ color: accentColor, fontSize: '0.68rem' }}>◈ Matrix open — tap a node to pin its description</span>
              : <span style={{ color: accentColor, fontSize: '0.68rem' }}>◈ Matrix open — hover a node, click to pin its description</span>
          }
        </div>

        <svg viewBox="0 0 780 620" className="stx-svg">
          <defs>
            <radialGradient id="toe-cg" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={accentColor} stopOpacity="0.38" />
              <stop offset="100%" stopColor={accentColor} stopOpacity="0" />
            </radialGradient>
            <radialGradient id="toe-bg" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0d1320" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#050810" stopOpacity="0" />
            </radialGradient>
            {dims.map((d, i) => (
              <clipPath key={'cp'+i} id={'toe-clip-'+i}>
                <circle cx={d.x} cy={d.y} r={dimR - 2} />
              </clipPath>
            ))}
          </defs>

          {/* Soft background halo */}
          <circle cx={cx} cy={cy} r={nodeR + 36} fill="url(#toe-bg)" />

          {/* Orbit ring */}
          <circle cx={cx} cy={cy} r={nodeR} fill="none"
            stroke="rgba(255,255,255,0.045)" strokeWidth="1" strokeDasharray="3 7" />

          {/* Ring label */}
          <text
            opacity={active ? 1 : 0}
            style={{ transition: 'opacity 0.65s ease 0.5s' }}
            fill="rgba(255,255,255,0.13)" fontSize="7" letterSpacing="2.5" fontFamily="monospace">
            <textPath startOffset="3%" href="#toe-arc">
              {'S · T · E · A · M · S · E · X · IFA TOE MATRIX · 0+8D ·'}
            </textPath>
          </text>
          <defs>
            <path id="toe-arc"
              d={'M ' + cx + ',' + (cy - nodeR - 20) +
                 ' A ' + (nodeR + 20) + ',' + (nodeR + 20) +
                 ' 0 1 1 ' + (cx - 0.01) + ',' + (cy - nodeR - 20)} />
          </defs>

          {/* Edges */}
          {dims.map((d, i) => {
            const sx = cx + (centerR + 6) * Math.cos(d.angle);
            const sy = cy + (centerR + 6) * Math.sin(d.angle);
            const ex = cx + (nodeR - dimR - 4) * Math.cos(d.angle);
            const ey = cy + (nodeR - dimR - 4) * Math.sin(d.angle);
            const len = Math.hypot(ex - sx, ey - sy).toFixed(1);
            const delay = active ? i * 52 : 0;
            return (
              <line key={i}
                x1={sx} y1={sy} x2={ex} y2={ey}
                stroke={d.color} strokeWidth="1.5"
                strokeDasharray={len}
                strokeDashoffset={active ? 0 : len}
                opacity={active ? 0.72 : 0}
                style={{ transition: 'stroke-dashoffset 0.55s ease ' + delay + 'ms, opacity 0.3s ease ' + delay + 'ms' }}
              />
            );
          })}

          {/* Dimension nodes */}
          {dims.map((d, i) => {
            const isPin = pinnedDim === i;
            const isHov = hoveredDim === i || isPin;
            const delay = active ? i * 52 + 180 : 0;
            return (
              <g key={i}>
                <circle cx={d.x} cy={d.y} r={dimR + 4} fill={d.color}
                  opacity={active ? (isHov ? 0.22 : 0.08) : 0}
                  style={{ transition: 'opacity 0.4s ease ' + delay + 'ms' }} />
                <circle cx={d.x} cy={d.y} r={dimR}
                  fill="var(--bg-3)" stroke={d.color}
                  strokeWidth={isPin ? 3.5 : isHov ? 2.5 : 1.5}
                  opacity={active ? 1 : 0}
                  style={{ transition: 'opacity 0.4s ease ' + delay + 'ms, stroke-width 0.18s' }} />
                <g clipPath={'url(#toe-clip-'+i+')'}
                   opacity={active ? 1 : 0}
                   style={{ transition: 'opacity 0.45s ease ' + (delay + 80) + 'ms' }}>
                  <text x={d.x} y={d.y - 5} textAnchor="middle"
                    fill={d.color} fontSize="20" fontWeight="800" fontFamily="monospace"
                    dominantBaseline="auto">
                    {d.letter}
                  </text>
                  <text x={d.x} y={d.y + 19} textAnchor="middle"
                    fill={d.color} fontSize="11" fontFamily="sans-serif"
                    opacity="0.9" dominantBaseline="auto">
                    {d.short}
                  </text>
                </g>
                <circle cx={d.x} cy={d.y} r={dimR + 10} fill="transparent"
                  style={{ cursor: active ? 'pointer' : 'default' }}
                  onMouseEnter={() => active && setHoveredDim(i)}
                  onMouseLeave={() => setHoveredDim(null)}
                  onClick={() => handleDimClick(i)} />
              </g>
            );
          })}

          {/* Center node — Ifa TOE */}
          <g onClick={handleToggle} style={{ cursor: 'pointer' }}>
            <circle cx={cx} cy={cy} r="70" fill="none"
              stroke={accentColor} strokeWidth="1.2" className="stx-pulse" />
            <circle cx={cx} cy={cy} r={centerR + 14} fill="url(#toe-cg)" />
            <circle cx={cx} cy={cy} r={centerR}
              fill="var(--bg-3)" stroke={accentColor} strokeWidth="2.5" />
            <text x={cx} y={cy - 9} textAnchor="middle"
              fill={accentColor} fontSize="17" fontWeight="900"
              letterSpacing="1" fontFamily="monospace">Ifa</text>
            <text x={cx} y={cy + 11} textAnchor="middle"
              fill={accentColor} fontSize="17" fontWeight="900"
              letterSpacing="1" fontFamily="monospace">TOE</text>
            <text x={cx} y={cy + 26} textAnchor="middle"
              fill={accentColor} fontSize="7.5" opacity="0.7">
              {active ? '◈ CLICK TO CLOSE' : '↓ CLICK TO OPEN'}
            </text>
          </g>
        </svg>

        {/* Dimension info panel */}
        <div style={{ minHeight: 90, flexShrink: 0 }}>
          {hovDim ? (
            <div className="stx-dim-info" style={{ '--c': hovDim.color }}>
              <div className="stx-dim-info__letter">{hovDim.letter}</div>
              <div className="stx-dim-info__content">
                <div className="stx-dim-info__name">
                  {hovDim.name}
                  {pinnedDim !== null && <span className="stx-dim-info__pin">◈ pinned · {isTouch ? 'tap' : 'click'} to release</span>}
                </div>
                <p className="stx-dim-info__desc">{hovDim.desc}</p>
              </div>
            </div>
          ) : active ? (
            <div className="stx-dim-hint">{isTouch ? 'Tap a node to pin its description' : 'Hover a node to preview · click to pin its description'} · {TOE_DIMS.length} dimensions active</div>
          ) : null}
        </div>
      </div>
      <figcaption className="ift-fig-cap" style={{ padding: '8px 16px 16px', textAlign: 'center' }}>
        The Ifa TOE 0+8D Matrix — Ifa's All-Encompassing Approach to the Theory of Everything for all Fields of Knowledge
      </figcaption>
    </div>
  );
}

// ─── REDEFINING THE TOE & FIL / LIF ──────────────────────────────────────────

function TOESection() {
  return (
    <section className="section section--dark" id="toe-fil-lif">
      <div className="container">
        <div className="section__header section__header--center">
          <span className="section__eyebrow section__eyebrow--gold">The Ifa Theory of Everything (iTOE): The Universal TOE. Ifa's All-Encompassing Approaches</span>
          <h2 className="section__title">Redefining the <span className="accent--gold">TOE</span> · FIL &amp; LIF</h2>
          <p className="section__subtitle">
            Ifa Transform provides the mathematical and philosophical Foundation for redefining the
            Theory of Everything — through Field-Independent Language (FIL) and Language-Independent
            Field (LIF).
          </p>
        </div>

        {/* TOE Redefining */}
        <div style={{ marginBottom: '32px' }}>
          <h3 className="ift-sub-heading">Redefining the TOE Using Ifa's All-Encompassing Approaches</h3>
          <p className="ift-body">
            Physics defines the <strong>Theory of Everything (TOE)</strong> as a
            hypothetical single unified theory that fully explains and links together all physical
            aspects of the universe. Ifa's approach radically expands this definition for all knowledge fields: the true
            TOE is an entire field on its own and must account for <em>all fields of knowledge</em> — not just physics — including
            arts, humanities, social science, spirituality, and every unknown field.
          </p>
          <p className="ift-body">
            Using Ifa Transform as the operational framework, the <strong>Ifa TOE</strong> redefines
            the Theory of Everything as the <strong>Standard and General Model of the Totality of Existence (TOE)</strong>{' '}
            or the Base Field, Ogbe Energy. The TOE in Ifa's Energy-Based Approach is also known as
            the <strong>IFA Internet</strong> or the <strong>IFA Body of Knowledge</strong>.
          </p>
        </div>
        <ToeSteamsexDiagram />

        {/* FIL and LIF */}
        <div className="section__header section__header--center" style={{ marginBottom: '28px' }}>
          <h3 className="section__title" style={{ fontSize: '1.6rem' }}>
            Field-Independent Language (FIL) &amp; Language-Independent Field (LIF)
          </h3>
        </div>

        <div className="ift-fil-lif-grid">
          <div className="ift-fil-card" style={{ '--fc': '#14b8d4' }}>
            <div className="ift-fil-card__sym">FIL</div>
            <div className="ift-fil-card__title">Field-Independent Language</div>
            <p className="ift-fil-card__body">
              A <strong>Field-Independent Language (FIL)</strong> is a Meta-language — whether formal
              (mathematical), natural, or Ifa-based — whose structure and grammar are valid and
              applicable across <em>all</em> fields of knowledge without modification. In IfaLang
              (IFA Language), as FIL, its Odu Ifa grammar applies equally to physics,
              music, law, art, and every other field. FIL enables true interdisciplinary communication by providing
              a universal syntactic and semantic <strong>Framework</strong> that transcends disciplinary boundaries.
            </p>
            <p className="ift-fil-card__body" style={{ marginTop: '8px' }}>
              IfaTransform, when applied to a FIL expression, produces a transform that is itself
              field-independent — the transformed expression retains its cross-field validity,
              enabling knowledge to be carried from any domain to any other through a single
              operational <strong>Framework</strong>.
            </p>
          </div>

          <div className="ift-fil-card" style={{ '--fc': '#8b5cf6' }}>
            <div className="ift-fil-card__sym">LIF</div>
            <div className="ift-fil-card__title">Language-Independent Field</div>
            <p className="ift-fil-card__body">
              A <strong>Language-Independent Field (LIF)</strong> is a <strong>Field of Knowledge</strong> whose
              structure, laws, and phenomena can be expressed in <em>any</em> language — formal,
              natural, or Ifa-based — without loss of meaning. In Ifa's framework, all 256 Odu
              Ifa encode LIFs: the <strong>Knowledge</strong> in each Odu can be expressed in any language
              in the world without any loss in meaning.
            </p>
            <p className="ift-fil-card__body" style={{ marginTop: '8px' }}>
              The duality of FIL and LIF — Field-Independent Language and Language-Independent
              Field — establishes the complete bidirectional <strong>Invariance</strong> that makes IfaTransform
              the true universal <strong>Transformer</strong>: apply any <strong>Language</strong> to any field and the Ifa Transform
              carries meaning faithfully across the bridge.
            </p>
          </div>
        </div>

        <div className="ift-highlight-box" style={{ '--hc': '#f5c518', marginTop: '36px' }}>
          <div className="ift-highlight-box__label">FIL + LIF = Universal Knowledge Exchange</div>
          <p className="ift-highlight-box__text">
            The combination of Field-Independent Language and Language-Independent Field provides
            the theoretical foundation for the IFA Internet: a <strong>Network</strong> where any piece of knowledge
            can be expressed in any language (FIL) and applied to any field (LIF), with IfaTransform
            as the universal operational <strong>Bridge</strong>. This is how Ifa's All-Encompassing Approach
            genuinely unifies all fields of knowledge into a single, internetworked <strong>Whole</strong>.
          </p>
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
              <img src="../../src/assets/itoe_logo.png" alt="iTOE" className="footer__logo-mark" />
              <span>The IFA Internet</span>
            </div>
            <p className="footer__tagline">Ifa Transform — Universe of Transforms · ToE Transform</p>
            <p className="footer__tagline footer__tagline--sm">
              Part of <a href="../../" className="footer__link-inline" target="_blank" rel="noopener noreferrer">IFA Mathematica</a> ·{' '}
              <a href="https://cenproject.org/" className="footer__link-inline" target="_blank" rel="noopener noreferrer">CENProject</a>
            </p>
          </div>
          <nav className="footer__links">
            <a href="#universe" className="footer__link">Universe</a>
            <a href="#differintegral" className="footer__link">Differintegral</a>
            <a href="#operators" className="footer__link">Operators</a>
            <a href="#logic" className="footer__link">Logic</a>
            <a href="#theory" className="footer__link">Theory</a>
            <a href="../" className="footer__link">IFA Mathematica</a>
            <a href="https://ifainternet.org/ifa-mathematica/ifa-gebra/"
               className="footer__link" target="_blank" rel="noopener noreferrer">IfaGebra ↗</a>
            <a href="../../" className="footer__link" target="_blank" rel="noopener noreferrer">IFA Internet</a>
          </nav>
        </div>
        <div className="footer__bottom">
          <span className="footer__copy">&copy; 2026 CENProject Innovations Limited. All rights reserved.</span>
          <span className="footer__powered">IFA Mathematica · Ifa Transform Platform</span>
        </div>
      </div>
    </footer>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────

function App() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <UniverseSection />
        <DifferintegralSection />
        <TransformerSection />
        <OperatorTheorySection />
        <OseMejiSection />
        <PlusMinusSection />
        <OpoESection />
        <LogicSection />
        <ParticlePhysicsSection />
        <TransformationTheorySection />
        <TOESection />
      </main>
      <Footer />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
