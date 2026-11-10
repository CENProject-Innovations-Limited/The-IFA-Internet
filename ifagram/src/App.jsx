/* ─────────────────────────────────────────────────────────────────────────────
   IfaDiagram — Ifa Diagram · DiagroE
   The IFA Internet · CENProject
   ifainternet.org/ifagram-ifa-diagram-diagroe/
───────────────────────────────────────────────────────────────────────────── */

const { useRef, useEffect, useState } = React;

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
 * Return the available width inside the canvas element's parent,
 * capped at `defaultSz`. Used to make canvases container-aware on mobile.
 */
function availWidth(ref, defaultSz) {
  if (!ref.current) return defaultSz;
  const p = ref.current.parentElement;
  const w = p ? p.clientWidth : 0;
  return w > 0 ? Math.min(defaultSz, Math.floor(w)) : defaultSz;
}

/**
 * Draw an Ọpọ́n Ifá (Ifa divination board) disc on the canvas.
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} cx  — disc centre x
 * @param {number} cy  — disc centre y
 * @param {number} R   — disc radius
 * @param {number} rot — rotation offset for the carved-figure ring
 */
function drawOponIfa(ctx, cx, cy, R, rot) {
  const TAU = 2 * PI;

  // 1) Outer wood body — warm carved-wood radial gradient
  const grad = ctx.createRadialGradient(cx - R * 0.22, cy - R * 0.28, R * 0.08, cx, cy, R);
  grad.addColorStop(0,    '#c98440');
  grad.addColorStop(0.60, '#8b5520');
  grad.addColorStop(0.88, '#5a3010');
  grad.addColorStop(1,    '#3a1c06');
  ctx.save();
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(cx, cy, R, 0, TAU);
  ctx.fill();
  ctx.restore();

  // 2) Outer rim highlight
  ctx.save();
  ctx.strokeStyle = 'rgba(210,160,80,0.45)';
  ctx.lineWidth   = R * 0.030;
  ctx.beginPath();
  ctx.arc(cx, cy, R - R * 0.018, 0, TAU);
  ctx.stroke();
  ctx.restore();

  // 3) Inner carving surface (the divination area)
  const INNER = R * 0.58;
  const iGrad = ctx.createRadialGradient(cx - R*0.10, cy - R*0.12, 0, cx, cy, INNER);
  iGrad.addColorStop(0,    '#d8aa60');
  iGrad.addColorStop(0.50, '#b87c32');
  iGrad.addColorStop(0.85, '#8a5018');
  iGrad.addColorStop(1,    '#5c300a');
  ctx.save();
  ctx.fillStyle = iGrad;
  ctx.beginPath();
  ctx.arc(cx, cy, INNER, 0, TAU);
  ctx.fill();
  ctx.restore();

  // 4) Divination sand/powder glow at centre
  const sandGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, INNER * 0.50);
  sandGrad.addColorStop(0,   'rgba(240,215,150,0.30)');
  sandGrad.addColorStop(0.7, 'rgba(195,145,60,0.08)');
  sandGrad.addColorStop(1,   'rgba(155,100,30,0.00)');
  ctx.save();
  ctx.fillStyle = sandGrad;
  ctx.beginPath();
  ctx.arc(cx, cy, INNER * 0.50, 0, TAU);
  ctx.fill();
  ctx.restore();

  // 5) Groove separating rim band from inner surface
  ctx.save();
  ctx.strokeStyle = 'rgba(35,15,3,0.75)';
  ctx.lineWidth   = R * 0.022;
  ctx.beginPath();
  ctx.arc(cx, cy, INNER + (R - INNER) * 0.06, 0, TAU);
  ctx.stroke();
  ctx.restore();

  // 6) Carved figures in the rim band — 8 Yoruba ancestral/Orisa silhouettes
  const N   = 8;
  const RMD = (R * 0.86 + INNER) / 2;   // midline of rim band
  const FH  = (R - INNER) * 0.74;        // figure height
  const FW  = FH * 0.58;                 // figure width

  for (let i = 0; i < N; i++) {
    const ang = rot + (TAU * i / N);
    const fx  = cx + RMD * Math.cos(ang);
    const fy  = cy + RMD * Math.sin(ang);

    ctx.save();
    ctx.translate(fx, fy);
    ctx.rotate(ang + PI / 2);   // figures face outward (away from disc centre)

    ctx.fillStyle = 'rgba(28,12,2,0.88)';

    // Head — large oval (Yoruba sculptural proportion)
    ctx.beginPath();
    ctx.ellipse(0, -FH * 0.40, FW * 0.31, FH * 0.32, 0, 0, TAU);
    ctx.fill();

    // Neck
    ctx.fillRect(-FW * 0.09, -FH * 0.10, FW * 0.18, FH * 0.09);

    // Torso — trapezoidal body
    ctx.beginPath();
    ctx.moveTo(-FW * 0.27, -FH * 0.01);
    ctx.lineTo( FW * 0.27, -FH * 0.01);
    ctx.lineTo( FW * 0.20,  FH * 0.27);
    ctx.lineTo(-FW * 0.20,  FH * 0.27);
    ctx.closePath();
    ctx.fill();

    // Left arm
    ctx.save();
    ctx.translate(-FW * 0.27, FH * 0.03);
    ctx.rotate(-0.38);
    ctx.fillRect(-FH * 0.16, -FW * 0.07, FH * 0.16, FW * 0.12);
    ctx.restore();

    // Right arm
    ctx.save();
    ctx.translate(FW * 0.27, FH * 0.03);
    ctx.rotate(0.38);
    ctx.fillRect(0, -FW * 0.07, FH * 0.16, FW * 0.12);
    ctx.restore();

    ctx.restore();
  }

  // 7) Centre motif — small circle + crosshairs (Ifa mark)
  ctx.save();
  ctx.strokeStyle = 'rgba(70,35,8,0.52)';
  ctx.lineWidth   = R * 0.015;
  ctx.lineCap     = 'round';
  ctx.beginPath();
  ctx.arc(cx, cy, R * 0.20, 0, TAU);
  ctx.stroke();
  ctx.lineWidth = R * 0.011;
  ctx.beginPath(); ctx.moveTo(cx - R*0.12, cy);        ctx.lineTo(cx + R*0.12, cy);        ctx.stroke();
  ctx.beginPath(); ctx.moveTo(cx,          cy - R*0.12); ctx.lineTo(cx,          cy + R*0.12); ctx.stroke();
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
    const d  = availWidth(ref, sz);
    const ctx = setupCanvas(ref, d);
    if (!ctx) return;
    const cx = d / 2, cy = d / 2, a = d * 0.357, s = a / 200;
    for (const lobe of allLobes(a, cx, cy)) gLobe(ctx, lobe, s);
    if (diagonal) {
      const ext = a * 0.85;
      gLobe(ctx, [[cx + ext, cy - ext], [cx - ext, cy + ext]], s);
    }
    centreNode(ctx, cx, cy, 3.5 * s);
  }, [sz, diagonal]);
  return <canvas ref={ref} className="ifagram-canvas" />;
}

function FractalCanvas({ sz = 280 }) {
  const ref = useRef(null);
  useEffect(() => {
    const d   = availWidth(ref, sz);
    const ctx = setupCanvas(ref, d, '#01050f');
    if (!ctx) return;
    const cx = d / 2, cy = d / 2;
    const A_MAX = d * 0.382, A_MIN = d * 0.005, NC = 16;

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

    centreNode(ctx, cx, cy, d * 0.006, false);
  }, [sz]);
  return <canvas ref={ref} className="ifagram-canvas" />;
}

function MetaCanvas({ sz = 220, gold = true }) {
  const ref = useRef(null);
  useEffect(() => {
    const d   = availWidth(ref, sz);
    const ctx = setupCanvas(ref, d);
    if (!ctx) return;
    const cx   = d / 2;
    const cy   = d / 2;
    const MRAD = d * 0.361;
    const MARR = d * 0.061;

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

    centreNode(ctx, cx, cy, d * 0.016, gold);
  }, [sz, gold]);
  return <canvas ref={ref} className="ifagram-canvas" />;
}

function HeroLemniscate() {
  const canvasRef = useRef(null);
  const wrapRef   = useRef(null);
  useEffect(() => {
    const SZ  = wrapRef.current
      ? Math.min(440, Math.floor(wrapRef.current.clientWidth))
      : 440;
    const ctx = setupCanvas(canvasRef, SZ, '#04070f');
    if (!ctx) return;
    const cx = SZ / 2, cy = SZ / 2;
    const a  = Math.round(SZ * (155 / 440));
    const s  = a / 200;
    // extra outer glow pass before main lobes
    for (const lobe of allLobes(a, cx, cy)) {
      sPts(ctx, lobe, 60 * s, 'rgba(245,197,24,0.012)', 80 * s);
    }
    for (const lobe of allLobes(a, cx, cy)) gLobe(ctx, lobe, s);
    centreNode(ctx, cx, cy, 4 * s);
  }, []);
  return (
    <div ref={wrapRef} style={{ width: '100%', maxWidth: '440px' }}>
      <canvas ref={canvasRef} className="hero-lemniscate" aria-hidden="true" />
    </div>
  );
}

function SquaketLemniscate() {
  const ref = useRef(null);
  useEffect(() => {
    const SZ  = 180;
    const d   = availWidth(ref, SZ);
    const ctx = setupCanvas(ref, d);
    if (!ctx) return;
    const cx = d / 2, cy = d / 2, a = d * (64 / 180), s = a / 200;
    for (const lobe of allLobes(a, cx, cy)) gLobe(ctx, lobe, s);
    centreNode(ctx, cx, cy, 2.2 * s);
  }, []);
  return <canvas ref={ref} className="ifagram-canvas" style={{ alignSelf: 'center' }} />;
}

function OrisaLemniscateCanvas({ sz = 280 }) {
  const ref = useRef(null);
  useEffect(() => {
    const d   = availWidth(ref, sz);
    const ctx = setupCanvas(ref, d, '#04070f');
    if (!ctx) return;
    const cx = d / 2, cy = d / 2, a = d * 0.357, s = a / 200;
    for (const lobe of allLobes(a, cx, cy)) rLobe(ctx, lobe, s);
    // Diagonal axis — the defining mark of the Ninifinity (Non-Infinity)
    const ext = a * 0.85;
    rLobe(ctx, [[cx + ext, cy - ext], [cx - ext, cy + ext]], s);
    centreNode(ctx, cx, cy, 3.5 * s, false);
  }, [sz]);
  return <canvas ref={ref} className="ifagram-canvas" />;
}

function OponIfaInfinityCanvas({ sz = 280 }) {
  const ref = useRef(null);
  useEffect(() => {
    const d   = availWidth(ref, sz);
    const ctx = setupCanvas(ref, d, '#020408');
    if (!ctx) return;
    const cx = d / 2, cy = d / 2;
    const a  = d * 0.357;
    const s  = a / 200;

    // Build the four lemniscate lobe outlines (same as the standard lemniscate)
    const lobes = allLobes(a, cx, cy);

    // Each Ọpọ́n Ifá disc must fill its lobe from the centre point to the outer tip.
    // R > DC so the disc extends past (cx,cy), covering the full lobe with no gap.
    const R  = a * 0.56;   // disc radius — overshoots both ends; clipping shapes it
    const DC = a * 0.50;   // disc centre offset — closer to centre so inner gap closes

    // Auto-detect each lobe's direction from its outermost point (pts mid-index).
    // This avoids any confusion between canvas y-axis and polar angle conventions.
    const rotBase = [PI * 0.08, PI * 0.58, PI * 1.08, PI * 1.58];
    const lobeData = lobes.map((pts, i) => {
      const mid = pts[Math.floor(pts.length / 2)];
      if (!mid) return { pts, ox: 0, oy: 0, rot: rotBase[i] };
      const dx = mid[0] - cx, dy = mid[1] - cy;
      const len = Math.sqrt(dx * dx + dy * dy) || 1;
      return { pts, ox: (dx / len) * DC, oy: (dy / len) * DC, rot: rotBase[i] };
    });

    // 1. Clip each lobe region, fill with Ọpọ́n Ifá board appearance
    for (const { pts, ox, oy, rot } of lobeData) {
      if (!pts.length) continue;
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(pts[0][0], pts[0][1]);
      for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
      ctx.closePath();
      ctx.clip();
      // Opon Ifa board fills this lobe — wood grain, rim, carved figures, centre motif
      drawOponIfa(ctx, cx + ox, cy + oy, R, rot);
      ctx.restore();
    }

    // 2. Golden lemniscate curves on top — the glowing rim edge of each Ọpọ́n Ifá lobe
    for (const lobe of lobes) gLobe(ctx, lobe, s);

    // 3. Centre node — crosspoint where all four Ọpọ́n Ifá lobes converge
    centreNode(ctx, cx, cy, 4 * s);
  }, [sz]);
  return <canvas ref={ref} className="ifagram-canvas" />;
}

// ═══════════════════════════════════════════════════════════════════════════════
// C. SVG COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════════

function IfaSigmaSVG() {
  return (
    <svg
      viewBox="0 0 320 340"
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
    desc: 'The IfaSigma is the Amulu (Composition) of the integral ∫ and the summation Σ — the unified summation-integration operator of Ifa Calculus and the IFA Internet.',
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
  {
    sym: '🎨',
    title: 'Ifa Art',
    color: '#f0920c',
    href: 'https://ifainternet.org/ifa-art/',
    body: 'Ifa Art — the visual art platform of the IFA Internet. Ifarts, OrisaArts, and IfaDesigns grounded in the Ifa Graphical Language System and the 256 Odu Ifa.',
  },
  {
    sym: '⊙',
    title: 'Ifa Art Playground',
    color: '#a855f7',
    href: 'https://ifainternet.org/ifa-art/playground/',
    body: 'The Ifa Art Playground — an interactive creative space for exploring Ifa-Orisa visual art, IfaDesigns, and the full DiagroE graphical language system.',
  },
  {
    sym: '🌟',
    title: 'Ifagrams for Kids & Teens',
    color: '#f0920c',
    href: './kids/',
    body: 'IfaLab For Children — Yoruba cultural designs, Orisa characters, Ifa STEAM education, sounds, and animations (Ifanimations, Orisanimations) for kids and teens aged 4+.',
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
          <a href="#oponifa"      className="nav-link">Ọpọ́nfá</a>
          <a href="#orisagram"     className="nav-link">Orisagram</a>
          <a
            href="../ifa-script-the-script-of-everything-scriptoe/ifa-lab/"
            className="nav-link"
          >
            IfaLab
          </a>
          <a href="https://ifainternet.org/ifa-art/" className="nav-link">Ifa Art</a>
          <a href="./kids/" className="nav-link">Kids &amp; Teens</a>
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
          Diagram
        </a>
        <a href="#ifagrams"     className="mobile-bar__item">
          <span className="mobile-bar__sym">◉</span>
          Ifagrams
        </a>
        <a href="#system"       className="mobile-bar__item">
          <span className="mobile-bar__sym">Σ</span>
          System
        </a>
        <a href="#oponifa"      className="mobile-bar__item">
          <span className="mobile-bar__sym">⊙</span>
          Ọpọ́nfá
        </a>
        <a href="#orisagram"    className="mobile-bar__item">
          <span className="mobile-bar__sym">◈</span>
          Orisa
        </a>
        <a href="../ifa-script-the-script-of-everything-scriptoe/ifa-lab/" className="mobile-bar__item">
          <span className="mobile-bar__sym">⚗</span>
          IfaLab
        </a>
        <a href="./kids/" className="mobile-bar__item">
          <span className="mobile-bar__sym">🌟</span>
          Kids
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

          <p className="hero__subtitle">
            <span className="hero__subtitle-yor">Gbàgede Iṣẹ́ Ọnà</span>
            <span className="hero__subtitle-play">Ifa-Orisa Playground</span>
            <span className="hero__subtitle-sep"> — </span>
            <span className="hero__subtitle-arts">Ifarts &amp; Orisarts and IfaDesigns &amp; OrisaDesigns</span>
          </p>

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

// ── Ọ̀ṣẹ́ Odu Display ─────────────────────────────────────────────────────────
function OsheOduDisplay() {
  const rows = [
    { count: 1, color: 'gold'   },
    { count: 2, color: 'violet' },
    { count: 1, color: 'gold'   },
    { count: 2, color: 'violet' },
  ];
  return (
    <div className="oshe-display">
      <div className="oshe-odu" aria-label="Odu Ifa Ọ̀ṣẹ́">
        {rows.map((row, i) => (
          <div
            key={i}
            className={`oshe-row oshe-row--${row.color}`}
            style={{ animationDelay: `${i * 0.14}s` }}
          >
            {Array.from({ length: row.count }).map((_, j) => (
              <span key={j} className="oshe-mark" />
            ))}
          </div>
        ))}
      </div>
      <div className="oshe-label-wrap">
        <div className="oshe-name">Ọ̀ṣẹ́</div>
        <div className="oshe-desc">
          Ọnà Ọ̀ṣẹ́: Energy Patterns (IfaLaw of Nature) Governing the Field and Practice of Iṣẹ́ Ọnà
        </div>
      </div>
    </div>
  );
}

// ── Ọpọ́nfá Infinity Gallery ──────────────────────────────────────────────────
function OponIfaGallery() {
  const [osheMode, setOsheMode] = useState(false);
  return (
    <div className="oponifa-gallery">
      <div className="oponifa-gallery__eyebrow">IfaGeometry · Sacred Design</div>
      <div className="oponifa-gallery__heading">
        Ọpọ́nfá Infinity — <span>IfaBoard Design Reference</span>
      </div>
      <div className="oponifa-gallery__toggle-wrap">
        <button
          className={'oponifa-gallery__toggle' + (osheMode ? ' oponifa-gallery__toggle--active' : '')}
          onClick={() => setOsheMode(function(m) { return !m; })}
        >
          {osheMode ? 'Back to Gallery' : 'Transform \u2192 Ọ\u0300ṣẹ\u0301'}
        </button>
        <div className="oponifa-gallery__toggle-subtitle">
          <span className="oponifa-gallery__toggle-subtitle-main">Ìṣiròjìnlẹ̀ Iṣẹ́ Ọnà</span>
          <span className="oponifa-gallery__toggle-subtitle-sep">:</span>
          <span className="oponifa-gallery__toggle-subtitle-sec">Iṣẹ́ Ọnà Mechanics</span>
        </div>
      </div>
      {osheMode ? (
        <OsheOduDisplay />
      ) : (
        <div>
          <div className="oponifa-gallery__row">
            <figure className="oponifa-gallery__fig oponifa-gallery__fig--solid">
              <img
                src="./src/Opon_Ifa_Infinity.png"
                alt="Ọpọ́nfá Infinity — Ifa Divination Board Infinity design"
                className="oponifa-gallery__img"
              />
            </figure>
            <figure className="oponifa-gallery__fig oponifa-gallery__fig--solid">
              <img
                src="./src/Oponfa_Ninfinity_Oyekunergy_Non-Glow.png"
                alt="Ọpọ́nfá Ninfinity — Oyekunergy Non-Glow design"
                className="oponifa-gallery__img"
              />
              <div className="oponifa-gallery__cap-wrap">
                <div className="oponifa-gallery__cap">Àtẹ Òrìṣà (OrisaBoard). Four-Lobe Formation Crossed by a Carved Log</div>
              </div>
            </figure>
          </div>
          <div className="oponifa-gallery__row">
            <figure className="oponifa-gallery__fig oponifa-gallery__fig--glow">
              <img
                src="./src/Opon_Ifa_Infinity_transparent.png"
                alt="Ọpọ́nfá Infinity — transparent field design"
                className="oponifa-gallery__img"
              />
              <div className="oponifa-gallery__cap-wrap">
                <div className="oponifa-gallery__cap-sub">Ọpọ́nfá Infinity: Ogbenergy. Glow · IfaGeometry</div>
              </div>
            </figure>
            <figure className="oponifa-gallery__fig oponifa-gallery__fig--glow">
              <img
                src="./src/Oponfa_Ninfinity_Oyekunergy_Non-Glow_transparent.png"
                alt="Ọpọ́nfá Ninfinity — Oyekunergy design on transparent field"
                className="oponifa-gallery__img"
              />
              <div className="oponifa-gallery__cap-wrap">
                <div className="oponifa-gallery__cap">Ọpọ́nfá Ninfinity: Oyekunergy · Non-Glow · OrisaGeometry</div>
              </div>
            </figure>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Ọpọ́nfá Infinity Section ──────────────────────────────────────────────────
function OponIfaSection() {
  return (
    <section className="section" id="oponifa">
      <div className="container">
        <div className="def-grid">
          <div className="def-text">
            <div className="section__header">
              <span className="section__eyebrow section__eyebrow--gold">Ifa Divination Board Infinity</span>
              <h2 className="section__title">
                The Ifa Infinity{' '}
                <span className="accent--gold">(Ọpọ́n Ifá Infinity)</span>
              </h2>
              <p className="section__subtitle">
                Also known as <strong>Ọpọ́nfá Infinity</strong> — the Ifa Infinity expressed
                through the Sacred Geometry of the Ọpọ́n Ifá (Ifa Divination Board), i.e., IfaGeometry. Each
                of the four lobes of the Ifa Infinity is a sacred Ọpọ́n Ifá — four divination
                boards arranged in the cardinal directions of the Axiomatic Odù Structure,
                unified by the Ogbenergy.
              </p>
            </div>

            <div className="def-blocks">
              <div className="def-block">
                <div className="def-block__icon" aria-hidden="true">◉</div>
                <div className="def-block__content">
                  <div className="def-block__label">Ọpọ́n Ifá — The Sacred Divination Board</div>
                  <div className="def-block__body">
                    The Ọpọ́n Ifá is the sacred circular tray of Ifá divination — the instrument
                    through which Ọrúnmìlà's wisdom is consulted. Carved with ancestral and Orisa
                    figures around its rim, with a flat centre surface for Iyẹrẹ Ifá (divination
                    powder), it is the original DiagroE — the Diagram for Everything in Ifa Tradition.
                  </div>
                </div>
              </div>

              <div className="def-block">
                <div className="def-block__icon" aria-hidden="true">∞</div>
                <div className="def-block__content">
                  <div className="def-block__label">Ọpọ́nfá Infinity — Four Boards, One Infinity</div>
                  <div className="def-block__body">
                    In the Ọpọ́nfá Infinity, the four lobes of the Ifa Infinity — East,
                    West, North, South — each become an Ọpọ́n Ifá. The Ogbenergy, also known as Ogbergy (in short), connects them as the eternal flow of Àṣẹ across all 256 Odu Ifa
                    and all realms of existence. The IfaBoards face outward — their carved
                    ancestral Figures witnessing the Infinite Field of Potentiality (IfaPotentiality).
                  </div>
                </div>
              </div>

              <div className="def-block">
                <div className="def-block__icon" aria-hidden="true">⊕</div>
                <div className="def-block__content">
                  <div className="def-block__label">The Original Diagram for Everything</div>
                  <div className="def-block__body">
                    The Ọpọ́nfá Infinity reveals that the Ọpọ́n Ifá is itself a DiagroE.
                    Its circular form, carved ancestral figures, and divination centre
                    encode the full structure of Ifa knowledge — the 256 Odu Ifa, the Orisa
                    Field, and the Totality of Existence (TOE) — unified in the Geometry
                    of the Ifa Infinity.
                  </div>
                </div>
              </div>
            </div>

            {/* ── IfaConstruction subsection ── */}
            <div className="subsection" id="ifaconstruction">
              <h3 className="subsection__title">IfaConstruction</h3>
              <p className="subsection__body">
                The 256 Ọpọ́nfá Infinities — one for each Odù Ifá — are built through
                the <strong>Àmúlù Operation</strong>, also called <strong>IfaComposition</strong>.
              </p>
              <p className="subsection__body">
                The process begins with the <strong>Ọpọ́n Ifá</strong> itself, or equivalently
                the <strong>IfaZero (IfaCircle)</strong>, which represents{' '}
                <strong>Ogbe Energy (Ogbenergy)</strong> — the Primal, Undivided Circle of Àṣẹ.
              </p>
              <p className="subsection__body">
                Four such Ọpọ́n Ifá structures are composed together through the Àmúlù
                Operation, producing the <strong>Òbìrìkìtí</strong> (Dual:{' '}
                <strong>Òkìtìbìrí</strong>) — the Ifa Infinity, meaning Immense Energy.
              </p>
              <p className="subsection__body">
                In modern mathematics, a related form appears as the{' '}
                <a
                  href="https://en.wikipedia.org/wiki/Lemniscate"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-link"
                >
                  Lemniscate of Bernoulli
                </a>{' '}
                — constructed by taking the inverse (geometric inversion) of a hyperbola, or
                equivalently as the locus of points whose product of distances from two fixed
                foci equals the square of half the distance between them. Its equation is
                given in Cartesian form as{' '}
                <span className="ifa-equation">(x² + y²)² = 2a²(x² − y²)</span>, or in polar
                form as{' '}
                <span className="ifa-equation">r² = 2a² cos(2θ)</span>.
              </p>
              <p className="subsection__body">
                However, the Òbìrìkìtí and its Dual Òkìtìbìrí are far older and carry a
                deeper ontology: they are not merely geometric curves but Expressions of the
                Composition of Ogbe Energy and Oyeku Anergy (Oyekunergy/Oyekergy) across the
                Four Cardinal Axes of Odù Ifá System.
              </p>
            </div>
          </div>

          <div className="def-visual">
            <OponIfaInfinityCanvas sz={280} />
            <div className="def-visual__label">Ọpọ́nfá Infinity</div>
            <div className="def-visual__sub">
              Ọpọ́n Ifá · Four-Lobe Infinity Formation · The Ifa Divination Board Infinity
            </div>
          </div>
        </div>

        {/* ── Ọpọ́nfá Infinity Design Gallery ── */}
        <OponIfaGallery />
      </div>
    </section>
  );
}

// ── Òrìṣà Ọnà Banner ─────────────────────────────────────────────────────────
function OrisaOnaBanner() {
  return (
    <div className="ona-banner" aria-label="Òrìṣà Ọnà — See, Hear, and Feel the Energy">
      <div className="ona-banner__rays" aria-hidden="true">
        <div className="ona-banner__ray ona-banner__ray--1" />
        <div className="ona-banner__ray ona-banner__ray--2" />
        <div className="ona-banner__ray ona-banner__ray--3" />
        <div className="ona-banner__ray ona-banner__ray--4" />
      </div>
      <div className="ona-banner__content">
        <div className="ona-banner__title">Òrìṣà Ọnà</div>
        <div className="ona-banner__paren">Ọnà as Spirit (Energy) of Patterns, Arts, and Designs</div>
        <div className="ona-banner__divider" aria-hidden="true" />
        <p className="ona-banner__phrase">
          <span className="ona-banner__see">See,</span>{' '}
          <span className="ona-banner__hear">Hear,</span>{' '}
          <span className="ona-banner__and">and</span>{' '}
          <span className="ona-banner__feel">Feel</span>{' '}
          the Energy Patterns within Every Language, Every Knowledge
        </p>
        <div className="ona-banner__portal-wrap">
          <a
            href="https://ifainternet.org/ifa-script-the-script-of-everything-scriptoe/ifa-lab/"
            target="_blank"
            rel="noopener noreferrer"
            className="ona-banner__portal"
            aria-label="Enter IfaLab — See, Hear, and Feel the Energy"
          >
            <span className="ona-banner__portal-orbs" aria-hidden="true">
              <span className="ona-banner__portal-orb ona-banner__portal-orb--see" />
              <span className="ona-banner__portal-orb ona-banner__portal-orb--hear" />
              <span className="ona-banner__portal-orb ona-banner__portal-orb--feel" />
            </span>
            <span className="ona-banner__portal-label">Enter IfaLab</span>
            <span className="ona-banner__portal-sub">
              <span className="ona-banner__see">See</span>
              {' · '}
              <span className="ona-banner__hear">Hear</span>
              {' · '}
              <span className="ona-banner__feel">Feel</span>
              {' the Energy'}
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}

// ── Orisagram Section ─────────────────────────────────────────────────────────
function OrisagramSection() {
  return (
    <section className="section section--dark" id="orisagram">
      <div className="container">
        <div className="def-grid">
          <div className="def-text">
            <div className="section__header">
              <span className="section__eyebrow section__eyebrow--red">The Dual of Ifagram</span>
              <h2 className="section__title">
                Orisagram —{' '}
                <span className="accent--red">Orisa Diagram</span>
              </h2>
              <p className="section__subtitle">
                Also written as <strong>OrisaDiagram</strong> (Orisa Diagram). Orisagram is
                the Dual of Ifagram — the diagrammatic System grounded in Orisa Principles,
                mirror to IfaDiagram's Ifa-grounded Foundation. Together they form the
                complete DiagroE System.
              </p>
            </div>

            <div className="def-blocks">
              <div className="def-block">
                <div className="def-block__icon" style={{ color: 'var(--red)' }} aria-hidden="true">◈</div>
                <div className="def-block__content">
                  <div className="def-block__label">Diagrammatic Reasoning with Orisa</div>
                  <div className="def-block__body">
                    <em>Orisagram: Diagrammatic Reasoning with Orisa</em> is the Dual of{' '}
                    <em>Ifagram: Diagrammatic Reasoning with Ifa</em>. Where Ifagram encodes
                    knowledge through the Ifa Infinity, the Àpólà Odù Ifa, and the 256 Odu
                    Ifa, Orisagram encodes its Dual — the Orisa Field Structure — through
                    the Orisa Infinity and the Àpólà Odù Orisa.
                  </div>
                </div>
              </div>

              <div className="def-block">
                <div className="def-block__icon" style={{ color: 'var(--red)' }} aria-hidden="true">∞</div>
                <div className="def-block__content">
                  <div className="def-block__label">IfaCategory &amp; OrisaCategory</div>
                  <div className="def-block__body">
                    Ifagram and Orisagram define the Dual Categorical Structures —{' '}
                    <strong>IfaCategory</strong> and <strong>OrisaCategory</strong> —
                    grounded in Category Theory, Ifa-Orisa Category Theory (Category Theory
                    in Ifa-Orisa Language), Higher Category Theory, Infinity Category Theory.
                    Their unified Framework is{' '}
                    <strong>Ifa Infinity Category Theory (Duoinfinity Category Theory)</strong>:
                    the Category Theory of Ifa and Orisa in Duality.
                  </div>
                </div>
              </div>

              <div className="def-block">
                <div className="def-block__icon" style={{ color: 'var(--red)', fontSize: '1.0rem', marginTop: '4px' }} aria-hidden="true">Àpólà</div>
                <div className="def-block__content">
                  <div className="def-block__label">Àpólà Odù: Category Theory in Ifa-OrisaLang</div>
                  <div className="def-block__body">
                    The <strong>Àpólà Odù</strong> are the 256 Odu Ifa and the 16 Odu
                    Orisa, General Category Theory for every field of knowledge. Orisagram
                    provides the diagrammatic Language for Àpólà Odù, encoding Orisa Field
                    relationships and Dual operations within the full IFA Internet Knowledge
                    System.
                  </div>
                </div>
              </div>
            </div>
            <div className="orisagram-tags" aria-label="Keywords">
              {[
                'The Ifa Infinity (Ọpọ́n Ifá Infinity)',
                'Ọpọ́nfá Infinity',
              ].map((tag) => (
                <span key={tag} className="orisagram-tag">{tag}</span>
              ))}
            </div>
          </div>

          <div className="def-visual">
            <OrisaLemniscateCanvas sz={220} />
            <div className="def-visual__label" style={{ color: 'var(--red)' }}>The Orisa Infinity (Ifa Ninifinity)</div>
            <div className="def-visual__sub">Non-Infinity · Dual of the Ifa Infinity · OrisaDiagram Foundation</div>
          </div>
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
            <a href="#oponifa"       className="footer__link">Ọpọ́nfá Infinity</a>
            <a href="#orisagram"     className="footer__link">Orisagram · Orisa Diagram</a>
            <a href="../ifa-script-the-script-of-everything-scriptoe/ifa-lab/" className="footer__link">IfaLab · OrisaLab</a>
            <a href="https://ifainternet.org/ifa-art/" className="footer__link">Ifa Art</a>
            <a href="https://ifainternet.org/ifa-art/playground/" className="footer__link">Ifa Art Playground</a>
            <a href="./kids/"        className="footer__link">Ifagrams for Kids &amp; Teens</a>
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
        <OponIfaSection />
        <OrisaOnaBanner />
        <OrisagramSection />
      </main>
      <Footer />
      <MobileBar />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
