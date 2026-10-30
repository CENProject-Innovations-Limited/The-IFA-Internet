/* ─────────────────────────────────────────────────────────────────────────────
   IfaDiagram — Ifa Diagram · DiagroE
   The IFA Internet · CENProject
   ifainternet.org/ifagram-ifa-diagram-diagroe/
───────────────────────────────────────────────────────────────────────────── */

const { useRef, useEffect } = React;

// ═══════════════════════════════════════════════════════════════════════════════
// A. LEMNISCATE MATH UTILITIES
// ═══════════════════════════════════════════════════════════════════════════════

const PI = Math.PI;

/**
 * Build a horizontal lemniscate lobe arc from angle t0 to t1
 * using the polar equation r = a * sqrt(cos(2θ)).
 */
function buildHLobe(t0, t1, a, cx, cy, N = 3000) {
  const pts = [];
  for (let i = 0; i <= N; i++) {
    const t  = t0 + (t1 - t0) * i / N;
    const c2 = Math.cos(2 * t);
    if (c2 < 1e-10) continue;
    const rho = a * Math.sqrt(c2);
    pts.push([cx + rho * Math.cos(t), cy + rho * Math.sin(t)]);
  }
  return pts;
}

/**
 * Build a vertical lemniscate lobe arc from angle t0 to t1
 * using the polar equation r = a * sqrt(-cos(2θ)).
 */
function buildVLobe(t0, t1, a, cx, cy, N = 3000) {
  const pts = [];
  for (let i = 0; i <= N; i++) {
    const t   = t0 + (t1 - t0) * i / N;
    const mc2 = -Math.cos(2 * t);
    if (mc2 < 1e-10) continue;
    const rho = a * Math.sqrt(mc2);
    pts.push([cx + rho * Math.cos(t), cy + rho * Math.sin(t)]);
  }
  return pts;
}

/**
 * Stroke a polyline with glow using canvas context.
 */
function sPts(ctx, pts, lw, rgba, blur) {
  if (!pts || !pts.length) return;
  ctx.save();
  ctx.strokeStyle = rgba;
  ctx.lineWidth   = lw;
  ctx.shadowColor = rgba;
  ctx.shadowBlur  = blur;
  ctx.lineCap     = 'round';
  ctx.lineJoin    = 'round';
  ctx.beginPath();
  ctx.moveTo(pts[0][0], pts[0][1]);
  for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
  ctx.stroke();
  ctx.restore();
}

/**
 * Draw a lemniscate lobe with gold glow — 7 layered passes.
 * All line widths and blur values scale by s = a/200.
 */
function gLobe(ctx, pts, s) {
  sPts(ctx, pts, 44 * s, 'rgba(245,197,24,0.03)',  65 * s);
  sPts(ctx, pts, 26 * s, 'rgba(245,197,24,0.07)',  44 * s);
  sPts(ctx, pts, 15 * s, 'rgba(245,197,24,0.16)',  28 * s);
  sPts(ctx, pts,  7 * s, 'rgba(245,197,24,0.34)',  16 * s);
  sPts(ctx, pts,  3 * s, 'rgba(245,197,24,0.62)',   8 * s);
  sPts(ctx, pts, 1.4* s, 'rgba(245,197,24,0.90)',   4 * s);
  sPts(ctx, pts, 0.7* s, 'rgba(255,248,210,0.95)',  2 * s);
}

/**
 * Draw a lemniscate lobe with red glow — 6 layered passes.
 * All line widths and blur values scale by s = a/200.
 */
function rLobe(ctx, pts, s) {
  sPts(ctx, pts, 22 * s, 'rgba(180,10,30,0.025)',  55 * s);
  sPts(ctx, pts, 12 * s, 'rgba(200,15,40,0.07)',   32 * s);
  sPts(ctx, pts,  6 * s, 'rgba(210,20,50,0.18)',   16 * s);
  sPts(ctx, pts, 2.4* s, 'rgba(225,35,65,0.42)',    8 * s);
  sPts(ctx, pts, 1.2* s, 'rgba(235,55,80,0.72)',    4 * s);
  sPts(ctx, pts, 0.6* s, 'rgba(255,110,130,0.88)', 1.5* s);
}

/**
 * Build all 4 lobes (2 horizontal + 2 vertical) of the Lemniscate Cross.
 * Returns [rightLobe, leftLobe, topLobe, bottomLobe].
 */
function allLobes(a, cx, cy) {
  return [
    buildHLobe(-PI / 4,      PI / 4,  a, cx, cy),
    buildHLobe( 3*PI / 4, 5*PI / 4,   a, cx, cy),
    buildVLobe(   PI / 4, 3*PI / 4,   a, cx, cy),
    buildVLobe( 5*PI / 4, 7*PI / 4,   a, cx, cy),
  ];
}

/**
 * Draw a small glowing centre node at (cx, cy).
 */
function centreNode(ctx, cx, cy, r, gold = true) {
  const color = gold ? 'rgba(245,197,24,1)'   : 'rgba(230,40,65,1)';
  const fill  = gold ? 'rgba(255,248,210,1)'  : 'rgba(255,170,185,1)';
  ctx.save();
  ctx.shadowColor = color;
  ctx.shadowBlur  = 22;
  ctx.fillStyle   = fill;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, 2 * PI);
  ctx.fill();
  ctx.restore();
}

/**
 * Set up a DPR-aware canvas and return the 2D context.
 */
function setupCanvas(ref, sz, bg = '#020408') {
  const canvas = ref.current;
  if (!canvas) return null;
  const dpr = window.devicePixelRatio || 1;
  canvas.width  = sz * dpr;
  canvas.height = sz * dpr;
  canvas.style.width  = sz + 'px';
  canvas.style.height = sz + 'px';
  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, sz, sz);
  return ctx;
}

// ═══════════════════════════════════════════════════════════════════════════════
// B. CANVAS COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════════

function LemniscateCanvas({ sz = 280, diagonal = false }) {
  const ref = useRef(null);
  useEffect(() => {
    const ctx = setupCanvas(ref, sz);
    if (!ctx) return;
    const cx = sz / 2, cy = sz / 2, a = sz * 0.357, s = a / 200;
    for (const lobe of allLobes(a, cx, cy)) gLobe(ctx, lobe, s);
    if (diagonal) {
      const ext = a * 0.85;
      const pts = [
        [cx + ext, cy - ext],
        [cx - ext, cy + ext],
      ];
      gLobe(ctx, pts, s);
    }
    centreNode(ctx, cx, cy, 3.5 * s);
  }, [sz, diagonal]);
  return <canvas ref={ref} className="ifagram-canvas" />;
}

function FractalCanvas({ sz = 280 }) {
  const ref = useRef(null);
  useEffect(() => {
    const ctx = setupCanvas(ref, sz, '#01050f');
    if (!ctx) return;
    const cx = sz / 2, cy = sz / 2;
    const A_MAX = sz * 0.382, A_MIN = sz * 0.005, NC = 16;

    for (let i = 0; i < NC; i++) {
      const a = A_MIN + (A_MAX - A_MIN) * i / (NC - 1);
      for (const lobe of allLobes(a, cx, cy)) {
        sPts(ctx, lobe, 1.4, 'rgba(210,25,55,0.28)', 2.5);
        sPts(ctx, lobe, 0.6, 'rgba(240,70,90,0.45)', 0.8);
      }
    }

    // bright outer edge at A_MAX with 4 glow passes
    for (const lobe of allLobes(A_MAX, cx, cy)) {
      sPts(ctx, lobe,  6,   'rgba(200,20,50,0.12)',  18);
      sPts(ctx, lobe,  3,   'rgba(220,40,65,0.35)',   9);
      sPts(ctx, lobe,  1.4, 'rgba(235,60,80,0.80)',   4);
      sPts(ctx, lobe,  0.7, 'rgba(255,120,140,0.95)', 1.5);
    }

    centreNode(ctx, cx, cy, sz * 0.006, false);
  }, [sz]);
  return <canvas ref={ref} className="ifagram-canvas" />;
}

function MetaCanvas({ sz = 220, gold = true }) {
  const ref = useRef(null);
  useEffect(() => {
    const ctx = setupCanvas(ref, sz);
    if (!ctx) return;
    const cx   = sz / 2;
    const cy   = sz / 2;
    const MRAD = sz * 0.361;
    const MARR = sz * 0.061;

    // Draw circle with multi-pass glow
    if (gold) {
      const layers = [
        [44, 'rgba(245,197,24,0.03)',  65],
        [26, 'rgba(245,197,24,0.07)',  44],
        [15, 'rgba(245,197,24,0.16)',  28],
        [ 7, 'rgba(245,197,24,0.34)',  16],
        [ 3, 'rgba(245,197,24,0.62)',   8],
        [1.4,'rgba(245,197,24,0.90)',   4],
        [0.7,'rgba(255,248,210,0.95)',  2],
      ];
      for (const [lw, color, blur] of layers) {
        ctx.save();
        ctx.strokeStyle = color;
        ctx.lineWidth   = lw;
        ctx.shadowColor = color;
        ctx.shadowBlur  = blur;
        ctx.beginPath();
        ctx.arc(cx, cy, MRAD, 0, 2 * PI);
        ctx.stroke();
        ctx.restore();
      }
    } else {
      const layers = [
        [22, 'rgba(180,10,30,0.025)', 55],
        [12, 'rgba(200,15,40,0.07)',  32],
        [ 6, 'rgba(210,20,50,0.18)',  16],
        [2.4,'rgba(225,35,65,0.42)',   8],
        [1.2,'rgba(235,55,80,0.72)',   4],
        [0.6,'rgba(255,110,130,0.88)',1.5],
      ];
      for (const [lw, color, blur] of layers) {
        ctx.save();
        ctx.strokeStyle = color;
        ctx.lineWidth   = lw;
        ctx.shadowColor = color;
        ctx.shadowBlur  = blur;
        ctx.beginPath();
        ctx.arc(cx, cy, MRAD, 0, 2 * PI);
        ctx.stroke();
        ctx.restore();
      }
    }

    // Draw arrowhead
    // gold: arrowhead at (cx+MRAD, cy), angle=PI/2 (tip points down, CW)
    // red:  arrowhead at (cx-MRAD, cy), angle=PI/2 (tip points down, CCW dual)
    const tipX = gold ? cx + MRAD : cx - MRAD;
    const tipY = cy;
    const angle = PI / 2;
    const size  = MARR;

    const arrowLayers = gold
      ? [['rgba(245,197,24,0.12)', 24], ['rgba(245,197,24,0.45)', 12], ['rgba(245,197,24,0.82)', 5], ['rgba(255,248,210,0.95)', 2]]
      : [['rgba(200,20,50,0.12)',  24], ['rgba(220,35,65,0.45)',  12], ['rgba(235,55,80,0.86)',  5], ['rgba(255,120,140,0.95)', 2]];

    for (const [color, blur] of arrowLayers) {
      ctx.save();
      ctx.translate(tipX, tipY);
      ctx.rotate(angle);
      ctx.shadowColor = color;
      ctx.shadowBlur  = blur;
      ctx.fillStyle   = color;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(-size, -size * 0.44);
      ctx.lineTo(-size,  size * 0.44);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    centreNode(ctx, cx, cy, sz * 0.016, gold);
  }, [sz, gold]);
  return <canvas ref={ref} className="ifagram-canvas" />;
}

function HeroLemniscate() {
  const ref = useRef(null);
  useEffect(() => {
    const SZ  = 440;
    const ctx = setupCanvas(ref, SZ, '#04070f');
    if (!ctx) return;
    const cx = SZ / 2, cy = SZ / 2, a = 155, s = a / 200;

    // extra outer glow pass before main lobes
    for (const lobe of allLobes(a, cx, cy)) {
      sPts(ctx, lobe, 60 * s, 'rgba(245,197,24,0.012)', 80 * s);
    }
    for (const lobe of allLobes(a, cx, cy)) gLobe(ctx, lobe, s);
    centreNode(ctx, cx, cy, 4 * s);
  }, []);
  return <canvas ref={ref} className="hero-lemniscate" aria-hidden="true" />;
}

function SquaketLemniscate() {
  const ref = useRef(null);
  useEffect(() => {
    const ctx = setupCanvas(ref, 180);
    if (!ctx) return;
    const cx = 90, cy = 90, a = 64, s = a / 200;
    for (const lobe of allLobes(a, cx, cy)) gLobe(ctx, lobe, s);
    centreNode(ctx, cx, cy, 2.2 * s);
  }, []);
  return <canvas ref={ref} className="ifagram-canvas" style={{ alignSelf: 'center' }} />;
}

// ═══════════════════════════════════════════════════════════════════════════════
// C. SVG COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════════

function IfaSigmaSVG() {
  return (
    <svg
      viewBox="0 0 320 340"
      width="220"
      height="234"
      className="ifagram-svg"
      style={{ overflow: 'visible', background: 'transparent' }}
      aria-label="Ifa Sigma — Temic Sigma"
    >
      <defs>
        <path
          id="sp-ig"
          d="M 292,96 L 292,32 L 70,32 L 70,290 C 70,308 34,318 34,302 M 70,262 L 242,262 C 280,262 296,248 296,202"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="miter"
        />
      </defs>
      <use href="#sp-ig" stroke="rgba(245,197,24,0.03)"  strokeWidth="44"  strokeLinecap="round" strokeLinejoin="round" />
      <use href="#sp-ig" stroke="rgba(245,197,24,0.07)"  strokeWidth="26"  strokeLinecap="round" strokeLinejoin="round" />
      <use href="#sp-ig" stroke="rgba(245,197,24,0.16)"  strokeWidth="15"  strokeLinecap="round" strokeLinejoin="round" />
      <use href="#sp-ig" stroke="rgba(245,197,24,0.34)"  strokeWidth="7"   strokeLinecap="round" strokeLinejoin="round" />
      <use href="#sp-ig" stroke="rgba(245,197,24,0.62)"  strokeWidth="3"   strokeLinecap="round" strokeLinejoin="round" />
      <use href="#sp-ig" stroke="rgba(245,197,24,0.90)"  strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="miter" />
      <use href="#sp-ig" stroke="rgba(255,248,210,0.95)" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="miter" />
    </svg>
  );
}

function SquaketSVG() {
  return (
    <div className="squaket-display">
      <div className="squaket-row">
        {/* Squa bracket */}
        <svg
          viewBox="-14 0 124 352"
          width="72"
          height="240"
          style={{ display: 'block', overflow: 'visible' }}
          aria-label="Squa operator"
        >
          <defs>
            <path
              id="sq-squa-ig"
              d="M 96,8 L 52,8 C 0,108 0,244 52,344 L 96,344"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </defs>
          <use href="#sq-squa-ig" stroke="rgba(168,85,247,0.03)"  strokeWidth="44" />
          <use href="#sq-squa-ig" stroke="rgba(168,85,247,0.07)"  strokeWidth="26" />
          <use href="#sq-squa-ig" stroke="rgba(168,85,247,0.16)"  strokeWidth="15" />
          <use href="#sq-squa-ig" stroke="rgba(168,85,247,0.34)"  strokeWidth="7"  />
          <use href="#sq-squa-ig" stroke="rgba(168,85,247,0.62)"  strokeWidth="3"  />
          <use href="#sq-squa-ig" stroke="rgba(168,85,247,0.90)"  strokeWidth="1.4"/>
          <use href="#sq-squa-ig" stroke="rgba(220,180,255,0.95)" strokeWidth="0.7"/>
        </svg>

        {/* Centre lemniscate */}
        <SquaketLemniscate />

        {/* Ket bracket */}
        <svg
          viewBox="-6 0 120 352"
          width="72"
          height="240"
          style={{ display: 'block', overflow: 'visible' }}
          aria-label="Ket operator"
        >
          <defs>
            <path
              id="sq-ket-ig"
              d="M 6,8 L 50,8 C 102,108 102,244 50,344 L 6,344"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </defs>
          <use href="#sq-ket-ig" stroke="rgba(168,85,247,0.03)"  strokeWidth="44" />
          <use href="#sq-ket-ig" stroke="rgba(168,85,247,0.07)"  strokeWidth="26" />
          <use href="#sq-ket-ig" stroke="rgba(168,85,247,0.16)"  strokeWidth="15" />
          <use href="#sq-ket-ig" stroke="rgba(168,85,247,0.34)"  strokeWidth="7"  />
          <use href="#sq-ket-ig" stroke="rgba(168,85,247,0.62)"  strokeWidth="3"  />
          <use href="#sq-ket-ig" stroke="rgba(168,85,247,0.90)"  strokeWidth="1.4"/>
          <use href="#sq-ket-ig" stroke="rgba(220,180,255,0.95)" strokeWidth="0.7"/>
        </svg>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// D. DATA
// ═══════════════════════════════════════════════════════════════════════════════

const ALIASES = [
  { label: 'DiagroE — Diagram for Everything', color: '#f5c518' },
  { label: 'ToE Diagram',                       color: '#a855f7' },
  { label: 'Energy-Based Diagram',              color: '#14b8d4' },
  { label: 'Consciousness Diagram',             color: '#e03050' },
  { label: 'Ifa Visual Language System',        color: '#00c87c' },
  { label: 'Orisa Diagram System',              color: '#f0920c' },
];

const IFAGRAMS = [
  {
    id: 'lemn',
    type: 'lemniscate',
    title: 'The Ifa Infinity (ToE Infinity)',
    formula: '',
    sub: '',
    color: '#f5c518',
    desc: 'The foundational Ifa Diagram — the Ifa Infinity encodes the four-Lobe Axiomatic Structure of the 256 Odu Ifa and the dimensional matrix of all knowledge on the IFA Internet.',
  },
  {
    id: 'lemn-d',
    type: 'lemniscate-d',
    title: 'The Ifa Ninifinity (Non-Infinity)',
    formula: '',
    sub: 'The Dual of Ifa Infinity',
    color: '#f5c518',
    desc: 'The Ifa Infinity extended with a diagonal axis — representing additional dimensional planes and expanded field intersections within the Ifa knowledge framework.',
  },
  {
    id: 'fractal',
    type: 'fractal',
    title: 'Ifa Fractal (ToE Fractal)',
    formula: '',
    sub: 'Self-Similar Ifa Infinity',
    color: '#e03050',
    desc: 'The Ifa Fractal demonstrates self-similarity across all scales — encoding the recursive, nested structure of Ifa knowledge and reality (nature) where every part contains and reflects the whole.',
  },
  {
    id: 'zero',
    type: 'meta-gold',
    title: 'IfaZero',
    formula: 'Circle · Clockwise · Right',
    sub: 'Metarepresentation — 0',
    color: '#f5c518',
    desc: 'IfaZero is the Metarepresentation of 0 in IfaLang — a clockwise circle with arrowhead at right. It encodes potentiality, the unmanifest origin field, and the state of infinite possibility.',
  },
  {
    id: 'one',
    type: 'meta-red',
    title: 'IfaOne',
    formula: 'Circle · Counterclockwise · Left',
    sub: 'Metarepresentation — 1',
    color: '#e03050',
    desc: 'IfaOne is the Metarepresentation of 1 in IfaLang — a counterclockwise circle with arrowhead at left. The chiral dual of IfaZero, encoding manifestation, actuality, and emergence.',
  },
  {
    id: 'sigma',
    type: 'sigma',
    title: 'Ifa Sigma · Temic Sigma',
    formula: 'Amulu(∫, Σ)',
    sub: 'Ifa Script Summation Operator',
    color: '#f5c518',
    desc: 'The Ifa Sigma (Temic Sigma) is the Amulu (Composition) of the integral ∫ and the summation Σ — the unified summation-integration operator of Ifa Calculus and the IFA Internet.',
  },
  {
    id: 'squa',
    type: 'squaket',
    title: 'Squaket Operator · IfaBrackets',
    formula: 'Squa( · )Ket',
    sub: 'ToE Brackets — BracketoE',
    color: '#a855f7',
    desc: 'The Squaket Operator — IfaBrackets — is the Composition Operation notation. The Squa and Ket brackets generalise quantum bracket notation to all fields of knowledge in the IFA Internet.',
    wide: true,
  },
];

const FEATURES = [
  {
    sym: '∞',
    title: 'Energy-Based Foundation',
    color: '#f5c518',
    body: 'Every IfaDiagram is grounded in the Ogbenergy Symbol — encoding the 256 Odu Ifa, the Binary Structure of Knowledge, and the intersection of all dimensional planes of Existence.',
  },
  {
    sym: 'Σ',
    title: 'Ifa Graphical Language',
    color: '#a855f7',
    body: 'IfaDiagram serves as the Graphical Language System of the IFA Internet — providing standardised symbols, operators, and diagram types for visual communication across all knowledge fields.',
  },
  {
    sym: '⊕',
    title: 'Composition & Notation',
    color: '#14b8d4',
    body: 'Through the Squaket Operator, Ifa Sigma, and IfaBrackets, IfaDiagram provides visual notation for Composition Operations, summation, and integration across all of Ifa Calculus.',
  },
];

const APPLICATIONS = [
  {
    sym: '∫',
    title: 'Ifa Calculus',
    color: '#f5c518',
    href: 'https://toe.cenproject.org/ifa-calculus-toe-calculus/',
    body: 'DiagroEs are a core instrument of Ifa Calculus — ToE Calculus. The Ifa Sigma, Squaket Operator, and Ifa Infinity provide the visual framework for all calculus operations.',
  },
  {
    sym: '∿',
    title: 'Ifa Analysis',
    color: '#a855f7',
    href: 'https://ifainternet.org/ifa-analysis/',
    body: 'Ifa Diagram provides the graphical language for Ifa Analysis — ToE Analysis. Visual diagrams encode analytical structures, transformations, and energy-field relationships.',
  },
  {
    sym: '◉',
    title: 'IFA Body of Knowledge',
    color: '#14b8d4',
    href: '../',
    body: 'As the Diagram for Everything, IfaDiagram is a core instrument across the full IFA Body of Knowledge (IFABOK) — the IFA Internet. Every platform uses DiagroEs.',
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// E. IFAGRAM DISPLAY HELPER
// ═══════════════════════════════════════════════════════════════════════════════

function IfagramDisplay({ type }) {
  switch (type) {
    case 'lemniscate':   return <LemniscateCanvas sz={280} />;
    case 'lemniscate-d': return <LemniscateCanvas sz={280} diagonal={true} />;
    case 'fractal':      return <FractalCanvas sz={280} />;
    case 'meta-gold':    return <MetaCanvas sz={220} gold={true} />;
    case 'meta-red':     return <MetaCanvas sz={220} gold={false} />;
    case 'sigma':        return <IfaSigmaSVG />;
    case 'squaket':      return <SquaketSVG />;
    default:             return null;
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// F. SECTIONS
// ═══════════════════════════════════════════════════════════════════════════════

// ── Header ────────────────────────────────────────────────────────────────────
function Header() {
  return (
    <header className="header">
      <div className="header__inner">
        <a href="../" className="header__brand">
          <img
            src="../src/assets/itoe_logo.png"
            alt="The IFA Internet"
            className="header__logo"
          />
          <div className="header__site">
            <span className="header__name">The IFA Internet</span>
            <span className="header__name header__name--main">IfaDiagram</span>
          </div>
        </a>
        <nav className="header__nav" aria-label="Main navigation">
          <a href="#definition"    className="nav-link">IfaDiagram</a>
          <a href="#ifagrams"      className="nav-link">Key Ifagrams</a>
          <a href="#system"        className="nav-link">Language System</a>
          <a href="#applications"  className="nav-link">Applications</a>
          <a
            href="https://toe.cenproject.org/ifa-calculus-toe-calculus/"
            className="nav-link nav-link--cta"
            target="_blank"
            rel="noopener"
          >
            Ifa Calculus
          </a>
        </nav>
      </div>
    </header>
  );
}

// ── Mobile Bar ────────────────────────────────────────────────────────────────
function MobileBar() {
  return (
    <nav className="mobile-bar" aria-label="Mobile navigation">
      <div className="mobile-bar__row">
        <a href="../"            className="mobile-bar__item">
          <span className="mobile-bar__sym">⌂</span>
          Home
        </a>
        <a href="#definition"   className="mobile-bar__item">
          <span className="mobile-bar__sym">∞</span>
          IfaDiagram
        </a>
        <a href="#ifagrams"     className="mobile-bar__item">
          <span className="mobile-bar__sym">◉</span>
          Ifagrams
        </a>
        <a href="#system"       className="mobile-bar__item">
          <span className="mobile-bar__sym">Σ</span>
          System
        </a>
        <a href="#applications" className="mobile-bar__item">
          <span className="mobile-bar__sym">⊕</span>
          Apply
        </a>
      </div>
    </nav>
  );
}

// ── Hero Section ──────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="hero">
      <div className="hero__bg">
        <div className="hero__grid" aria-hidden="true" />
        <div className="hero__orb--a" aria-hidden="true" />
        <div className="hero__orb--b" aria-hidden="true" />
        <div className="hero__scanline" aria-hidden="true" />
      </div>

      <div className="hero__layout">
        <div className="hero__left">
          <div className="hero__badge">
            <span className="hero__badge-dot" aria-hidden="true" />
            The IFA Internet — IfaDiagram Platform
          </div>

          <h1 className="hero__title">
            <span className="hero__title-main">IfaDiagram</span>
            <span className="hero__title-alt">Ifa Diagram</span>
            <span className="hero__title-sub">The Diagram for Everything</span>
          </h1>

          <p className="hero__tagline">DiagroE — Ifa Graphical &amp; Visual Language System</p>

          <p className="hero__desc">
            <strong>IfaDiagram</strong> (Ifagram) is the <strong>DiagroE</strong> — the
            Diagram for Everything. Also known as <strong>ToE Diagram</strong>,{' '}
            <strong>Energy-Based Diagram</strong>, and <strong>Consciousness Diagram</strong>,
            Ifa-Diagram is the general Graphical and Visual Language System of the IFA Internet —
            the core Instrument of Ifa Calculus, Ifa Analysis, and the IFA Body of Knowledge
            (IFABOK) as a whole.
          </p>

          <div className="hero__aliases" aria-label="Also known as">
            {ALIASES.map((a) => (
              <span
                key={a.label}
                className="hero__alias"
                style={{ '--alias-color': a.color }}
              >
                {a.label}
              </span>
            ))}
          </div>

          <div className="hero__ctas">
            <a href="#ifagrams" className="btn btn--primary">Explore Ifagrams</a>
            <a href="#definition" className="btn btn--ghost">What is IfaDiagram</a>
          </div>
        </div>

        <div className="hero__right">
          <HeroLemniscate />
          <div className="hero__diagram-label">The Ifa Infinity</div>
        </div>
      </div>
    </section>
  );
}

// ── Definition Section ────────────────────────────────────────────────────────
function DefinitionSection() {
  return (
    <section className="section section--alt" id="definition">
      <div className="container">
        <div className="def-grid">
          <div className="def-text">
            <div className="section__header">
              <span className="section__eyebrow section__eyebrow--gold">What is IfaDiagram</span>
              <h2 className="section__title">
                The Diagram for Everything{' '}
                <span className="accent--gold">(DiagroE)</span>
              </h2>
              <p className="section__subtitle">
                IfaDiagram — ToE Diagram — is the Graphical Language System of the IFA Internet.
                DiagroE provides the universal diagrammatic toolkit for all knowledge fields,
                grounded in the Ifa Infinity and the 256 Odu Ifa.
              </p>
            </div>

            <div className="def-blocks">
              <div className="def-block">
                <div className="def-block__icon" aria-hidden="true">DiagroE</div>
                <div className="def-block__content">
                  <div className="def-block__label">Diagram for Everything</div>
                  <div className="def-block__body">
                    DiagroE is the universal diagrammatic system of the IFA Internet — a
                    single, unified visual language capable of representing any field of
                    knowledge, from physics and mathematics to consciousness and culture.
                    Every IfaDiagram is a DiagroE.
                  </div>
                </div>
              </div>

              <div className="def-block">
                <div className="def-block__icon" aria-hidden="true">∞</div>
                <div className="def-block__content">
                  <div className="def-block__label">Energy-Based Foundation</div>
                  <div className="def-block__body">
                    Representing the Ogbe Energy (Ogbenergy), the Ifa Infinity, the Infinity
                    for Everything (InfinitoE), is the infinity symbol ∞ composed with its
                    Dual 8 forming the foundation of all IfaDiagrams. It is a core
                    meta-Structure used to encode the 256 Odu Ifa and the complete dimensional
                    Matrix of Knowledge on the IFA Internet.
                  </div>
                </div>
              </div>

              <div className="def-block">
                <div className="def-block__icon" aria-hidden="true">⊕</div>
                <div className="def-block__content">
                  <div className="def-block__label">Ifa &amp; Orisa Graphical Languages</div>
                  <div className="def-block__body">
                    IfaDiagram provides the complete toolkit for both Ifa-based and
                    Orisa-based graphical languages — encompassing symbolic operators,
                    compositional notation (Squaket), summation-integration (Ifa Sigma),
                    and metarepresentation (IfaZero, IfaOne).
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="def-visual">
            <IfaSigmaSVG />
            <div className="def-visual__label">Ifa Sigma — Temic Sigma</div>
            <div className="def-visual__sub">Modified Σ · Ifa Script summation operator</div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Key Ifagrams Section ──────────────────────────────────────────────────────
function KeyIfagramsSection() {
  return (
    <section className="section" id="ifagrams">
      <div className="container">
        <div className="section__header--center">
          <span className="section__eyebrow section__eyebrow--gold">The Diagram Library</span>
          <h2 className="section__title">
            Key <span className="accent--gold">Ifagrams</span>
          </h2>
          <p className="section__subtitle">
            The essential IfaDiagrams (DiagroEs) of the IFA Internet — from the foundational
            Ifa Infinity to the Ifa Sigma and the Squaket Operator.
          </p>
        </div>

        <div className="ifagram-grid">
          {IFAGRAMS.map((ig) => (
            <div
              key={ig.id}
              className={`ifagram-card${ig.wide ? ' ifagram-card--wide' : ''}`}
              style={{ '--ig-color': ig.color }}
            >
              <div className="ifagram-card__canvas-wrap">
                <IfagramDisplay type={ig.type} />
              </div>
              <div className="ifagram-card__info">
                {ig.formula && <div className="ifagram-card__formula">{ig.formula}</div>}
                <h3 className="ifagram-card__title">{ig.title}</h3>
                {ig.sub && <div className="ifagram-card__sub">{ig.sub}</div>}
                <p className="ifagram-card__desc">{ig.desc}</p>
              </div>
              <div className="ifagram-card__glow" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── System Section ────────────────────────────────────────────────────────────
function SystemSection() {
  return (
    <section className="section section--dark" id="system">
      <div className="container">
        <div className="section__header--center">
          <span className="section__eyebrow section__eyebrow--violet">Graphical Language</span>
          <h2 className="section__title">
            Ifa Visual <span className="accent--gold">Language System</span>
          </h2>
          <p className="section__subtitle">
            IfaDiagram is the Graphical Language System of the IFA Internet — a standardised,
            universal set of visual symbols and operators for all knowledge fields.
          </p>
        </div>

        <div className="features-grid">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="feature-card"
              style={{ '--fc-color': f.color }}
            >
              <div className="feature-card__sym" aria-hidden="true">{f.sym}</div>
              <h3 className="feature-card__title">{f.title}</h3>
              <p className="feature-card__body">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Applications Section ──────────────────────────────────────────────────────
function ApplicationsSection() {
  return (
    <section className="section section--alt" id="applications">
      <div className="container">
        <div className="section__header--center">
          <span className="section__eyebrow section__eyebrow--jade">DiagroE in Action</span>
          <h2 className="section__title">
            Applications of <span className="accent--gold">IfaDiagram</span>
          </h2>
          <p className="section__subtitle">
            IfaDiagram (DiagroE) is a core instrument across the full IFA Internet — from
            Ifa Calculus and Ifa Analysis to the entire IFA Body of Knowledge (IFABOK).
          </p>
        </div>

        <div className="app-cards">
          {APPLICATIONS.map((app) => (
            <a
              key={app.title}
              href={app.href}
              className="app-card"
              target={app.href.startsWith('http') ? '_blank' : undefined}
              rel={app.href.startsWith('http') ? 'noopener' : undefined}
            >
              <div className="app-card__sym" style={{ color: app.color }} aria-hidden="true">
                {app.sym}
              </div>
              <h3 className="app-card__title">{app.title}</h3>
              <p className="app-card__body">{app.body}</p>
              <div className="app-card__arrow">Explore →</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Footer ─────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="footer">
      <div className="footer__energy-line" aria-hidden="true" />
      <div className="footer__inner">
        <div className="footer__brand">
          <div className="footer__logo">
            <img
              src="../src/assets/itoe_logo.png"
              alt="The IFA Internet"
              className="footer__logo-mark"
            />
            <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-2)' }}>
              The IFA Internet
            </span>
          </div>
          <div className="footer__tagline">IfaDiagram — Ifa Diagram · DiagroE</div>
          <div className="footer__tagline--sm">
            The Diagram for Everything. Part of the IFA Internet &amp; the IFA Body of Knowledge
            (IFABOK).<br />
            A{' '}
            <a href="https://cenproject.org" className="footer__link-inline" target="_blank" rel="noopener">
              CENProject
            </a>{' '}
            initiative.
          </div>
        </div>

        <div>
          <div className="footer__links-title">IfaDiagram</div>
          <div className="footer__links">
            <a href="#definition"    className="footer__link">What is IfaDiagram</a>
            <a href="#ifagrams"      className="footer__link">Key Ifagrams</a>
            <a href="#system"        className="footer__link">Language System</a>
            <a href="#applications"  className="footer__link">Applications</a>
            <a href="../"            className="footer__link">IFA Internet</a>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="footer__copy">
          © 2026 IfaDiagram · The IFA Internet · CENProject
        </div>
        <div className="footer__powered">
          Powered by{' '}
          <a href="https://cenproject.org" target="_blank" rel="noopener">CENProject</a>
        </div>
      </div>
    </footer>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// G. APP ROOT
// ═══════════════════════════════════════════════════════════════════════════════

function App() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <DefinitionSection />
        <KeyIfagramsSection />
        <SystemSection />
        <ApplicationsSection />
      </main>
      <Footer />
      <MobileBar />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
