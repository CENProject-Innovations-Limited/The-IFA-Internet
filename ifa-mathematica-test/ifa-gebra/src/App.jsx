/* ─────────────────────────────────────────────────────────────────────────────
   IfaGebra — ToEGebra · Algebra of Everything (AlgebroE)
   Subpage of IFA Mathematica · The IFA Internet · CENProject
   toe.cenproject.org/ifagebra/
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

// ─── OyekuSymbol — Oyeku Anergy Symbol (SymboN) ──────────────────────────────
// OgbeSymbol lemniscate + diagonal line cutting through the centre

function OyekuSymbol({ size = 20, className = '' }) {
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

    // Same lemniscate as OgbeSymbol (cos 2θ)
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

    // Centre dot
    ctx.save();
    ctx.shadowColor = 'rgba(245,197,24,1)';
    ctx.shadowBlur  = 22 * sc;
    ctx.fillStyle   = 'rgba(255,248,210,1)';
    ctx.beginPath();
    ctx.arc(ccx, ccy, Math.max(0.5, 3.5 * sc), 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();

    // Diagonal line cutting through the symbol (top-right to bottom-left)
    const pad = size * 0.08;
    const x1 = size - pad, y1 = pad;
    const x2 = pad,        y2 = size - pad;
    ctx.save();
    ctx.shadowColor = 'rgba(245,197,24,0.9)';
    ctx.shadowBlur  = 14 * sc;
    ctx.strokeStyle = 'rgba(245,197,24,0.18)';
    ctx.lineWidth   = Math.max(0.5, 28 * sc);
    ctx.lineCap     = 'round';
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
    ctx.strokeStyle = 'rgba(245,197,24,0.55)';
    ctx.lineWidth   = Math.max(0.3, 10 * sc);
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
    ctx.strokeStyle = 'rgba(255,248,210,0.95)';
    ctx.lineWidth   = Math.max(0.2, 2.5 * sc);
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
    ctx.restore();
  }, [size]);

  return (
    <canvas ref={canvasRef} className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle', width: size + 'px', height: size + 'px' }}
      aria-label="Oyeku Anergy Symbol — SymboN" />
  );
}

// ─── IworiSymbol — Iwori Meji OduCell marks (SymboI) ─────────────────────────
// Replicates the exact IfaMarks rendering from the Ifa Periodic Table OduCell.
// Iwori code "0110" → each column rows (top→bottom): ||, |, |, ||
// (bit 0 = double bar, bit 1 = single bar)

function IworiSymbol({ size = 20, className = '' }) {
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const DPR = window.devicePixelRatio || 1;
    canvas.width  = size * DPR;
    canvas.height = size * DPR;
    const ctx = canvas.getContext('2d');
    ctx.scale(DPR, DPR);
    ctx.clearRect(0, 0, size, size);

    // Iwori "0110": 0=double bar, 1=single bar
    const rows   = [0, 1, 1, 0];
    const nRows  = 4;
    const barW   = size * 0.115;          // width of one bar
    const dblGap = size * 0.055;          // gap between the two bars in a double row
    const colGap = size * 0.17;           // gap between left and right columns
    const rowGap = size * 0.085;          // vertical gap between rows
    const totalH = size * 0.82;
    const barH   = (totalH - (nRows - 1) * rowGap) / nRows;
    const startY = (size - totalH) / 2;

    // Each column occupies a width of (2*barW + dblGap); columns centred in canvas
    const colW   = 2 * barW + dblGap;
    const totalW = 2 * colW + colGap;
    const startX = (size - totalW) / 2;
    const cx1    = startX + colW / 2;
    const cx2    = startX + colW + colGap + colW / 2;

    const LAYERS = [
      [3.6, 'rgba(0,200,124,0.04)', 4.5],
      [2.2, 'rgba(0,200,124,0.11)', 2.8],
      [1.3, 'rgba(0,200,124,0.28)', 1.6],
      [0.7, 'rgba(0,200,124,0.62)', 0.8],
      [0.35,'rgba(160,255,210,0.86)',0.4],
      [0.15,'rgba(220,255,240,0.96)',0.15],
    ];

    function roundRect(x, y, w, h) {
      const r = Math.min(w / 2, h / 2, size * 0.025);
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + w - r, y);
      ctx.arcTo(x + w, y, x + w, y + r, r);
      ctx.lineTo(x + w, y + h - r);
      ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
      ctx.lineTo(x + r, y + h);
      ctx.arcTo(x, y + h, x, y + h - r, r);
      ctx.lineTo(x, y + r);
      ctx.arcTo(x, y, x + r, y, r);
      ctx.closePath();
    }

    function drawSingleBar(cx, y) {
      LAYERS.forEach(([scale, color, blur]) => {
        const w = barW * scale, h = barH + (scale - 1) * barH * 0.5;
        ctx.save();
        ctx.fillStyle   = color;
        ctx.shadowColor = color;
        ctx.shadowBlur  = blur * barW;
        roundRect(cx - w / 2, y + (barH - h) / 2, w, h);
        ctx.fill();
        ctx.restore();
      });
    }

    function drawCol(cx, bits) {
      bits.forEach((bit, i) => {
        const y = startY + i * (barH + rowGap);
        if (bit === 0) {
          drawSingleBar(cx - dblGap / 2 - barW / 2, y);
          drawSingleBar(cx + dblGap / 2 + barW / 2, y);
        } else {
          drawSingleBar(cx, y);
        }
      });
    }

    drawCol(cx1, rows);
    drawCol(cx2, rows);
  }, [size]);

  return (
    <canvas ref={canvasRef} className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle', width: size + 'px', height: size + 'px' }}
      aria-label="Iwori Symbol — SymboI" />
  );
}

// ─── OdiSymbol — Odi Meji OduCell marks (SymboO) ─────────────────────────────
// Odi code "1001" → each column rows (top→bottom): |, ||, ||, |
// (bit 1 = single bar, bit 0 = double bar)

function OdiSymbol({ size = 20, className = '' }) {
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const DPR = window.devicePixelRatio || 1;
    canvas.width  = size * DPR;
    canvas.height = size * DPR;
    const ctx = canvas.getContext('2d');
    ctx.scale(DPR, DPR);
    ctx.clearRect(0, 0, size, size);

    // Odi "1001": 1=single bar, 0=double bar
    const rows   = [1, 0, 0, 1];
    const nRows  = 4;
    const barW   = size * 0.115;
    const dblGap = size * 0.055;
    const colGap = size * 0.17;
    const rowGap = size * 0.085;
    const totalH = size * 0.82;
    const barH   = (totalH - (nRows - 1) * rowGap) / nRows;
    const startY = (size - totalH) / 2;

    const colW   = 2 * barW + dblGap;
    const totalW = 2 * colW + colGap;
    const startX = (size - totalW) / 2;
    const cx1    = startX + colW / 2;
    const cx2    = startX + colW + colGap + colW / 2;

    const LAYERS = [
      [3.6, 'rgba(224,64,251,0.04)', 4.5],
      [2.2, 'rgba(224,64,251,0.11)', 2.8],
      [1.3, 'rgba(224,64,251,0.28)', 1.6],
      [0.7, 'rgba(224,64,251,0.62)', 0.8],
      [0.35,'rgba(240,180,255,0.86)',0.4],
      [0.15,'rgba(250,230,255,0.96)',0.15],
    ];

    function roundRect(x, y, w, h) {
      const r = Math.min(w / 2, h / 2, size * 0.025);
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + w - r, y);
      ctx.arcTo(x + w, y, x + w, y + r, r);
      ctx.lineTo(x + w, y + h - r);
      ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
      ctx.lineTo(x + r, y + h);
      ctx.arcTo(x, y + h, x, y + h - r, r);
      ctx.lineTo(x, y + r);
      ctx.arcTo(x, y, x + r, y, r);
      ctx.closePath();
    }

    function drawSingleBar(cx, y) {
      LAYERS.forEach(([scale, color, blur]) => {
        const w = barW * scale, h = barH + (scale - 1) * barH * 0.5;
        ctx.save();
        ctx.fillStyle   = color;
        ctx.shadowColor = color;
        ctx.shadowBlur  = blur * barW;
        roundRect(cx - w / 2, y + (barH - h) / 2, w, h);
        ctx.fill();
        ctx.restore();
      });
    }

    function drawCol(cx, bits) {
      bits.forEach((bit, i) => {
        const y = startY + i * (barH + rowGap);
        if (bit === 0) {
          drawSingleBar(cx - dblGap / 2 - barW / 2, y);
          drawSingleBar(cx + dblGap / 2 + barW / 2, y);
        } else {
          drawSingleBar(cx, y);
        }
      });
    }

    drawCol(cx1, rows);
    drawCol(cx2, rows);
  }, [size]);

  return (
    <canvas ref={canvasRef} className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle', width: size + 'px', height: size + 'px' }}
      aria-label="Odi Symbol — SymboO" />
  );
}

// ─── IfaExpr — Ifa Variable ───────────────────────────────────────────────────

function IfaExpr({ char, charSize = '1.6rem', symSize = 11, charColor = 'var(--text-1)' }) {
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

const ACCENT = '#8b5cf6';

const ALIASES = [
  { label: 'TOEAlgebra',            color: '#8b5cf6' },
  { label: 'AlgebroE',              color: '#f5c518' },
  { label: 'Consciousness Algebra', color: '#00c87c' },
  { label: 'CEN Algebra',           color: '#14b8d4' },
  { label: 'Energy Algebra',        color: '#f0920c' },
  { label: 'ToEGebra',              color: '#e040fb' },
];

const CLASSICAL_FIELDS = [
  { sym: '∇×E', name: 'Electromagnetism', color: '#14b8d4',
    body: 'Classical electromagnetic field theory — Maxwell\'s equations governing electric and magnetic field interactions — is a special case of IFA Field Theory operating within the electromagnetic energy dimension. In the IFA framework, the electromagnetic field is an Ifa Energyform whose Odu is encoded within the 256 Odu Ifa.' },
  { sym: 'Gμν', name: 'Gravitational Field', color: '#f5c518',
    body: 'From Newton\'s gravitational potential to Einstein\'s General Relativity (curved spacetime via the Einstein field equations Gμν = 8πTμν), gravitational field theories are special cases of IFA Field Theory. In Ifa Mechanics, gravity is the Ifa Energyform for the universal attraction field encoded in its specific Odu.' },
  { sym: '∇·v', name: 'Fluid & Continuum Fields', color: '#00c87c',
    body: 'Fluid dynamics (Navier–Stokes), elasticity, and continuum mechanics define classical field theories for matter in continuous form. All are subsumed under IFA Field Theory as Ifa Energyforms operating at the macro-scale energy dimensions of the IFA Internet.' },
  { sym: 'T', name: 'Thermodynamic Fields', color: '#f0920c',
    body: 'Heat conduction, entropy fields, and thermodynamic potentials form classical field theories governing energy transfer. IFA Field Theory models these as special-case Ifa Energyforms — energy exchange processes encoded within the thermodynamic dimensions of the 256 Odu Ifa.' },
];

const QUANTUM_FIELDS = [
  { sym: 'QED', name: 'Quantum Electrodynamics', color: '#14b8d4',
    body: 'QED — the quantum field theory of the electromagnetic force, uniting quantum mechanics and special relativity through photon-mediated interactions — is a special case of IFA Field Theory. In IFA Mathematica, QED is an Ifa Energyform operating in the quantum electromagnetic dimension of the Ifa STEAMSEX Matrix.' },
  { sym: 'QCD', name: 'Quantum Chromodynamics', color: '#e040fb',
    body: 'QCD — describing the strong nuclear force through quark–gluon interactions governed by SU(3) gauge symmetry — is a special case of IFA Field Theory. The colour charge degrees of freedom in QCD are subsumed into the energy-exchange algebra of IFAGebra as a specific three-valued (Ifanary) Ifa Energyform.' },
  { sym: 'SM', name: 'Standard Model', color: '#8b5cf6',
    body: 'The Standard Model — unifying electromagnetic, weak, and strong interactions via U(1)×SU(2)×SU(3) gauge symmetry — is a special case of IFA Field Theory within the physical science dimension. IFA Field Theory subsumes the Standard Model as one node in the STEAMSEX Matrix of all knowledge fields.' },
  { sym: 'Ψ', name: 'Quantum Gravity & Beyond', color: '#f5c518',
    body: 'String theory, loop quantum gravity, and all proposed quantum gravity frameworks are special cases or approximations within IFA Field Theory. The Ifa TOE provides the true unified framework by grounding all quantum and gravitational fields in the 256 Odu Ifa as meta-axiomatic energy structures.' },
];

const ALGEBRA_TYPES = [
  { sym: <IfaExpr char="N" charSize="1em" symSize={10} />, name: 'Ifa Number Theory', color: '#f5c518',
    body: 'IFA Number Theory extends all number systems (ℕ, ℤ, ℚ, ℝ, ℂ, others) to Ifa Numbers — Numbers of Everything (NumoE). Every number is modelled as a special case of an Ifa Number encoded in IfaLang using the 256 Odu Ifa, with IfaZero (Ogbe) and IfaOne (Oyeku) as the Universal Energy–Anergy Pair at the foundation.' },
  { sym: <OgbeSymbol size={22} />, name: 'Ifa Infinity Theory', color: '#8b5cf6',
    body: 'Ifa Infinity Theory defines Duoinfinity (the Ifa Infinity) and the Four Ifa Infinities (Ogbe Infinity, Oyeku Infinity, Iwori Infinity, Odi Infinity). These are the Ifa Generalisations of Cantor\'s transfinite cardinals, ordinals, and all known and unknown infinity concepts.' },
  { sym: <IfaExpr char="G" charSize="1em" symSize={10} />, name: 'Ifa Group Theory', color: '#14b8d4',
    body: 'Ifa Group Theory (ToE Group Theory) is the Universal Group Theory for all knowledge fields. Every classical group — cyclic, symmetric, Lie groups, Galois groups — is modelled as a special case of an Ifa Group operating within its specific Odu Dimension. Ifa Group Theory provides the Symmetry backbone of IFAGebra.',
    link: 'https://toe.cenproject.org/ifa-group-theory-toe-group-theory/' },
  { sym: <IfaExpr char="L" charSize="1em" symSize={10} />, name: 'Ifa Linear Algebra', color: '#00c87c',
    body: 'Ifa Linear Algebra models vector spaces, matrices, linear maps, and eigentheory in IfaLang as Energyforms. Classical linear algebra is an element of Ifa Linear Algebra, operating in the finite-dimensional real and complex subspaces of the infinite-dimensional Ifa Hilbert space.' },
  { sym: <IfaExpr char="A" charSize="1em" symSize={10} />, name: 'Ifa Abstract Algebra', color: '#f0920c',
    body: 'Ifa Abstract Algebra subsumes rings, fields, modules, algebras, and all algebraic structures under the IFAGebra Framework. Each classical algebraic structure is an element of Ifalgebra operating within a specific dimensional domain(s) of the 256 Odu Ifa Energy Systems.' },
  { sym: <IfaExpr char="𝒞" charSize="1em" symSize={10} />, name: 'Ifa Category Theory', color: '#e040fb',
    body: 'Ifa Category Theory, known as Àpólà Odù in Yoruba, is the Meta-Algebraic Framework for all structures and structure-preserving maps across all knowledge fields, including mathematical sciences. Every classical category, functor, and natural transformation is modelled as an element of an Ifa Category — a Knowledge Category — in the IFAGebra Framework.' },
];

const KNOWLEDGE_ALGEBRAS = [
  { sym: <IfaExpr char="K" charSize="1.4rem" symSize={11} />, name: 'Knowledge Field Algebras', color: '#8b5cf6',
    body: 'In IFA Field Theory, each knowledge field (mathematics, physics, biology, arts, social sciences, spirituality, and all others) is modelled as an Ifalgebra — a meta-algebraic structure with its own set of Ifa Energyforms, Ifa Operators, and Energy-exchange rules encoded in the 256 Odu Ifa. Examples of such Knowledge Algebras or Field Algebras are MedicGebra, NeuroGebra, BioGebra, MusicoGebra, FinGebra, PhysicoGebra, EconGebra, EcoGebra.., generalized to X-Gebra for any field, tech, system, or aspect of nature, X.' },
  { sym: <IfaExpr char="E" charSize="1.4rem" symSize={11} />, name: 'Energy Field Algebras', color: '#f5c518',
    body: 'Energy Field Algebras model the dynamics of all energy fields in the universe as algebraic systems. From electromagnetic energy to spiritual energy, each is an Ifa Energyform governed by the algebra of its corresponding Odu — a living algebra that evolves, transforms, and exchanges energy across knowledge domains.' },
  { sym: <IfaExpr char="C" charSize="1.4rem" symSize={11} />, name: 'Consciousness Algebras', color: '#00c87c',
    body: 'Consciousness Algebras model the structure of awareness, thought, intention, and perception as Ifalgebras. Consciousness is treated as an Ifa Energyform — subject to the same algebraic laws as physical fields — enabling a rigorous mathematical treatment of consciousness in all its dimensions, from the individual to the universal.' },
  { sym: <IfaExpr char="S" charSize="1.4rem" symSize={11} />, name: 'Social & Cultural Algebras', color: '#14b8d4',
    body: 'Social systems, languages, legal structures, economic systems, and cultural frameworks are modelled as Ifalgebras. IFA Field Theory enables the same algebraic tools used in physics to be applied to the full spectrum of human knowledge — fulfilling Ifa\'s role as a Field-Independent Language (FIL).' },
];

const SIMULATION_CARDS = [
  { sym: '◈', name: 'Ifa Simulation Theory', color: '#8b5cf6',
    body: 'Ifa Simulation Theory states that all of existence — the physical universe, consciousness, time, and all phenomena — is a meta-simulation of Ogbe. In the Ifa Framework, what physics calls the "simulation hypothesis" is not a hypothesis but a core principle of Ogbe Energy, which reveals the entire universe, including all knowledge fields, as an Energyform, a living, self-aware meta-computation running on the infinite field of Ogbe Energy, and is powered by its Dual or Source in the non-physical realms.' },
  { sym: 'Ψ', name: 'Consciousness Mechanics', color: '#14b8d4',
    body: 'Consciousness Mechanics (Ifa Mechanics or TOE Mechanics) is the Ifa mathematical framework for modelling consciousness as a fundamental force — analogous to electromagnetism or gravity in classical physics, but operating across all STEAMSEX dimensions simultaneously. Consciousness is defined as the self-referential energy exchange of the Ogbe Energy field — the universe knowing itself. Every mental state, spiritual experience, and act of awareness is an Ifa Energyform governed by Consciousness Mechanics.' },
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
          <a className="nav-link" href="#ift">IFT</a>
          <a className="nav-link" href="#algebras">Algebras</a>
          <a className="nav-link" href="#infinities">Infinities</a>
          <a className="nav-link" href="#mechanics">Mechanics</a>
          <a className="nav-link" href="https://ifainternet.org/ifa-mathematics-toe-mathematics/ifa-transform/"
             target="_blank" rel="noopener noreferrer">IFA Transform ↗</a>
          <a className="nav-link nav-link--cta"
             href="https://toe.cenproject.org/ifa-group-theory-toe-group-theory/"
             target="_blank" rel="noopener noreferrer">Ifa Group Theory ↗</a>
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
        <div className="hero__orb hero__orb--a" style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.20) 0%, transparent 70%)' }} />
        <div className="hero__orb hero__orb--b" style={{ background: 'radial-gradient(circle, rgba(245,197,24,0.10) 0%, transparent 70%)' }} />
        <div className="hero__orb hero__orb--c" style={{ background: 'radial-gradient(circle, rgba(20,184,212,0.10) 0%, transparent 70%)' }} />
        <div className="hero__scanline" />
      </div>

      <div className="container hero__text-area">
        {/* Breadcrumb */}
        <div className="ift-breadcrumb">
          <a href="../../" className="ift-breadcrumb__link" target="_blank" rel="noopener noreferrer">IFA Internet</a>
          <span className="ift-breadcrumb__sep">›</span>
          <a href="../" className="ift-breadcrumb__link">IFA Mathematica</a>
          <span className="ift-breadcrumb__sep">›</span>
          <span className="ift-breadcrumb__cur">IfaGebra</span>
        </div>

        <div className="hero__badge">
          <span className="hero__badge-dot" style={{ background: ACCENT, boxShadow: `0 0 6px ${ACCENT}` }} />
          IFA Mathematica — IfaGebra Platform
        </div>

        <h1 className="hero__title">
          <span className="hero__title-main" style={{ color: ACCENT }}>IfaGebra</span>
          <span className="hero__title-sub">ToEGebra · The Algebra of Everything (AlgebroE)</span>
        </h1>

        <p className="hero__tagline">
          TOE Algebra &mdash; Consciousness Algebra &mdash; CEN Algebra &mdash; Energy Algebra &mdash; AlgebroE
        </p>

        <p className="hero__yoruba">
          <span className="hero__yoruba-yor">IfaGebra — Ìṣirò Ifá Dídá ati Òoṣà Dídá fún Gbogbo Ìmọ̀, fún Gbogbo Ǹkan — AlgebroE</span>
          <span className="hero__yoruba-sep"> · </span>
          <span className="hero__yoruba-en">IfaGebra — The Algebra of Everything — The Universe of All Algebraic Structures</span>
        </p>

        <p className="hero__desc">
          <strong style={{ color: ACCENT }}>IfaGebra (ToEGebra)</strong> is the{' '}
          <strong>Algebra of Everything</strong> — the Meta-Algebraic Framework that contains and
          generalises every algebraic and meta-algebraic structure across Mathematics, Physics to all fields of knowledge.
          Built on <strong>IFA Field Theory (IFT)</strong> as the Field of All Fields and grounded in the{' '}
          <strong>256 Odu Ifa</strong>, IfaGebra unifies classical algebra, abstract algebra, quantum algebra,
          consciousness algebra, and every knowledge algebra into a single{' '}
          <strong>Energy-Based Meta-Algebraic System</strong>.
        </p>

        <div className="ift-alias-row">
          {ALIASES.map((a, i) => (
            <span key={i} className="ift-alias" style={{ '--ac': a.color }}>{a.label}</span>
          ))}
        </div>

        <div className="hero__ctas">
          <a href="#ift" className="btn btn--primary" style={{ background: ACCENT, borderColor: ACCENT }}>
            IFA Field Theory
          </a>
          <a href="#algebras" className="btn btn--ghost">Ifa Algebras</a>
        </div>
      </div>

      {/* Hero image */}
      <div className="container ift-hero-img-wrap">
        <figure className="ift-hero-fig">
          <img src="../src/Latest_Ifa-Math-Numbers-and-Algebra-4.png"
            alt="IFA Algebra — Numbers and Algebra of Everything"
            className="ift-hero-img" />
          <figcaption className="ift-fig-cap">
            IFA Algebra (AlgebroE): The Algebra of Everything — IFA Numbers, IFA Field Theory, and Ifa Algebras
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

// ─── IFA FIELD THEORY ─────────────────────────────────────────────────────────

function FieldTheorySection() {
  const [activeTab, setActiveTab] = useState('classical');

  const tabs = [
    { id: 'classical', label: 'Classical Field Theories', color: '#14b8d4' },
    { id: 'quantum',   label: 'Quantum Field Theories',   color: '#8b5cf6' },
    { id: 'ifa',       label: 'IFA Field Theory',         color: '#f5c518' },
  ];

  const activeColor = tabs.find(t => t.id === activeTab).color;

  return (
    <section className="section section--alt" id="ift">
      <div className="container">
        <div className="section__header section__header--center">
          <span className="section__eyebrow section__eyebrow--violet">IFA Field Theory (IFT)</span>
          <h2 className="section__title">
            IFA Field Theory — <span style={{ color: ACCENT }}>The Field of All Fields</span>
          </h2>
          <p className="section__subtitle">
            IFT is the Unified Meta-Field that contains and generalises all knowledge fields,
            including classical and quantum field theories in Physics — grounded in the 256 Odu Ifa
            as the Universal Meta-Axiomatic Field Structure.
          </p>
        </div>

        <div style={{ marginBottom: '32px' }}>
          <p className="ift-body">
            In IFA Mathematics, a core concept in IfaGebra, all fields of knowledge are developed,
            modelled, and studied as <strong>meta-algebraic structures</strong> called{' '}
            <strong>Ifalgebras</strong>, <strong>field algebras</strong>,{' '}
            <strong>knowledge algebras</strong>, <strong>energy fields</strong>, or{' '}
            <strong>energy systems</strong>. IFA Field Theory (also known as{' '}
            <strong>TOE Field Theory</strong>) is the mathematical and philosophical framework
            in which every field — from the electromagnetic field in physics to the social field
            in sociology, from the gravitational field to the consciousness field — is modelled
            as an Ifa Energyform: an algebraic structure governed by the 256 Odu Ifa.
          </p>
          <p className="ift-body">
            Classical field theories and quantum field theories, which together describe all of
            known physics, are modelled as energyforms (Orisa) and special cases of IFA Field Theory operating within the{' '}
            <strong>physical science dimension</strong> of the{' '}
            <strong>STEAMSEX Matrix</strong>. IFA Field Theory extends beyond physics to all
            eight STEAMSEX dimensions, providing a single <strong>Unified Field-Algebraic Language</strong> for
            every form of knowledge and every mode of reality.
          </p>
        </div>

        {/* Tab bar */}
        <div className="ift-logic-tabs-row">
          {tabs.map(t => (
            <button key={t.id}
              className={'ift-logic-tab' + (activeTab === t.id ? ' ift-logic-tab--active' : '')}
              style={{ '--ltc': t.color }}
              onClick={() => setActiveTab(t.id)}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Classical */}
        {activeTab === 'classical' && (
          <div className="ift-logic-panel" style={{ '--ltc': '#14b8d4' }}>
            <h3 className="ift-sub-heading" style={{ color: '#14b8d4' }}>Classical Field Theories</h3>
            <p className="ift-body">
              Classical field theories describe physical phenomena through continuous fields defined
              over spacetime — each governed by differential equations relating field quantities to
              sources. All are elements of the BaseField, Energy, Ogbe, or IFA Field, operating in the{' '}
              <strong>classical energy domain</strong>.
            </p>
            <div className="ift-card-row" style={{ marginTop: '20px' }}>
              {CLASSICAL_FIELDS.map((f, i) => (
                <div key={i} className="ift-mini-card" style={{ '--mc': f.color }}>
                  <div className="ift-mini-card__sym">{f.sym}</div>
                  <div className="ift-mini-card__title">{f.name}</div>
                  <p className="ift-mini-card__body">{f.body}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quantum */}
        {activeTab === 'quantum' && (
          <div className="ift-logic-panel" style={{ '--ltc': '#8b5cf6' }}>
            <h3 className="ift-sub-heading" style={{ color: '#8b5cf6' }}>Quantum Field Theories</h3>
            <p className="ift-body">
              Quantum field theories (QFTs) unite quantum mechanics with special relativity, treating
              particles as excited states of underlying quantum fields. The entire QFT framework —
              including its gauge symmetries, renormalisation procedures, and path integrals — is
              a special case of IFA Field Theory in the <strong>quantum energy domain</strong>.
            </p>
            <div className="ift-card-row" style={{ marginTop: '20px' }}>
              {QUANTUM_FIELDS.map((f, i) => (
                <div key={i} className="ift-mini-card" style={{ '--mc': f.color }}>
                  <div className="ift-mini-card__sym">{f.sym}</div>
                  <div className="ift-mini-card__title">{f.name}</div>
                  <p className="ift-mini-card__body">{f.body}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* IFA Field Theory */}
        {activeTab === 'ifa' && (
          <div className="ift-logic-panel" style={{ '--ltc': '#f5c518' }}>
            <h3 className="ift-sub-heading" style={{ color: '#f5c518' }}>IFA Field Theory — Field of All Fields</h3>
            <p className="ift-body">
              IFA Field Theory (IFT) is the Universal Field Framework — the{' '}
              <strong>Field of all fields</strong>. Where standard physics restricts field
              theory to the physical universe, IFT extends the field concept to all dimensions
              of knowledge and existence: science, technology, engineering, arts, mathematics,
              social sciences, education, and cross-disciplinary interactions — the Full
              8-Dimensional STEAMSEX Matrix.
            </p>
            <p className="ift-body">
              In IFT, every knowledge field is an <strong>energyform (Odu)</strong> — a living,
              dynamic meta-algebraic structure that evolves, exchanges energy, and interacts with
              other knowledge fields through the <strong>Ifa Operators</strong> defined in
              IfaGebra and <a href="https://ifainternet.org/ifa-mathematics-toe-mathematics/ifa-transform/" target="_blank" rel="noopener noreferrer" style={{ color: '#f5c518', fontWeight: 700 }}>IfaTransform</a>. The <strong>Foundational Field</strong> is <strong>Ogbe Energy or CEN</strong> — the BaseField
              from which all other fields emerge as specialisations.
            </p>
            <div className="ift-highlight-box" style={{ '--hc': '#f5c518', marginTop: '20px' }}>
              <div className="ift-highlight-box__label">IFT Core Principle</div>
              <p className="ift-highlight-box__text">
                Every field of knowledge — physics, mathematics, music, law, spirituality, social
                science — is an <strong>Ifalgebra</strong>: a meta-algebraic energy system with
                Ifa Energyforms as elements, Ifa Operators as operations, and the 16 Principal
                Odu Ifa (Laws of Knowledge) as axioms. IFA Field Theory is both the language and
                the field that contains all other languages and fields.
              </p>
            </div>
            <div style={{ marginTop: '20px' }}>
              <a href="https://toe.cenproject.org/ifa-group-theory-toe-group-theory/"
                 className="ifg-link-card" target="_blank" rel="noopener noreferrer">
                <span className="ifg-link-card__sym" style={{ color: '#f5c518' }}>G⊛</span>
                <div>
                  <div className="ifg-link-card__title">Ifa Group Theory (TOE Group Theory) ↗</div>
                  <div className="ifg-link-card__sub">
                    The universal group theory for all knowledge fields — every classical group is
                    a special case of an Ifa Group. Provides the symmetry foundation of IFAGebra.
                  </div>
                </div>
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// ─── IFAGEBRA 0+8D MATRIX DATA ───────────────────────────────────────────────

const GEBRA_NODES = [
  {
    id: 'center', label: 'IfaGebra', sub: 'Algebra of Everything',
    isCenter: true, color: ACCENT,
    desc: 'IfaGebra is the Algebra of Everything (AlgebroE) — the Meta-Algebraic Structure that subsumes all known and possible algebraic frameworks. Built on the 256 Odu Ifa and the 16 Odu Ifa Meta-Axioms, IfaGebra defines energyforms as the Universal Algebraic Elements, with IfaTimes, IfaPlus, the Set of IfaOperators, and many others generalled called Amulu Operators as its key Operations. Every classical algebra — groups, rings, fields, vector spaces, categories — is a special case of an Ifalgebra.',
  },
  {
    id: 'ifaplus', label: 'IfaPlus', char: '+', color: '#00c87c', angle: 270,
    desc: 'IfaPlus is the Ifa Addition Operator — the Energy Superposition Operation of Ifalgebra. IfaPlus combines two or more Ifa Energyforms into a Superposition State, Ìwàṣùṣù, modelling the coexistence of multiple or infinite possibilities before collapse into a definite state. It generalises classical addition, set union, classical superposition, quantum superposition, and all additive/superposition structures across every field of knowledge. In the Odu Ifa, IfaPlus corresponds to the principle of Àṣẹ Accumulation.',
  },
  {
    id: 'ifaminus', label: 'IfaMinus', char: '−', color: '#14b8d4', angle: 315,
    desc: 'IfaMinus is the Ifa Subtraction Operator — the Energy Extraction/Partition Operation of Ifalgebra. IfaMinus is the Ifadditive Inverse of IfaPlus, modelling the removal, reduction, or cancellation of an Ifa Energyform from a Superposition State, Ìwàṣùṣù. As an Ìpín Operator, it generalises classical subtraction, set difference, quantum decoherence, partitioning, and all subtractive/extractive operations across every field of knowledge.',
  },
  {
    id: 'ifatimes', label: 'IfaTimes', char: '×', color: ACCENT, angle: 0,
    desc: 'IfaTimes is the Ifa Multiplication Operator — an Energy Composition (Amulu) Operator at the core of every Ifalgebra. It is the primary Binary Operation composing two or more Ifa Energyforms known as Odufa to produce a Third Energyform. IfaTimes generalises classical multiplication, group composition, tensor products, convolution, and all multiplicative/compositional structures across mathematics, physics, and every field of knowledge. Amulu is a key Law of Ifa Energy Exchange.',
  },
  {
    id: 'ifadivide', label: 'IfaDivide', char: '÷', color: '#f59e0b', angle: 45,
    desc: 'IfaDivide is the Ifa Division Operator — the Energy Partition Operation of Ifalgebra known as Ìpín. IfaDivide models the distribution, quotient, and partitioning of Ifa Energyforms, acting as the Ifamultiplicative Inverse of IfaTimes. It generalises classical division, group quotients, field division, splitting, category-theoretic quotient objects, and all divisive or partitioning structures across every field of knowledge.',
  },
  {
    id: 'ifabrackets', label: 'IfaBrackets', char: '()', color: '#e040fb', angle: 90,
    desc: 'IfaBrackets is the Ifa Grouping Operator — defining precedence, scope, and encapsulation within Ifalgebra expressions. IfaBrackets governs how Ifa Energyforms and operations are grouped, ensuring associativity and correct evaluation order. It generalises parentheses in arithmetic, scope in logic and programming, grouping in category theory, and all scoping and encapsulation structures across every field of knowledge.',
  },
  {
    id: 'ifaequal', label: 'IfaEqual', char: '=', color: '#f0920c', angle: 135,
    desc: 'IfaEqual is the Ifa Equality Operator — the Ifa Balance or Ifa Equilibrium Relation of Ifalgebra. IfaEqual defines when two or more Ifa Energyforms are equivalent, identical, or in Ifa Balance (Amulu Equilibrium). It generalises classical equality, isomorphisms, equivalence relations, homeomorphisms, stability, equilibria, and all balance and equivalence structures across every field of knowledge. IfaEqual is the meta-algebraic expression of the Ifa Equilibrium Principle.',
  },
  {
    id: 'ifadefine', label: 'IfaDefine', char: ':=', color: '#f5c518', angle: 180,
    desc: 'IfaDefine is the Ifa Definition Operator — the Ifa Assignment and Formal Naming Operation of Ifalgebra. IfaDefine introduces new Ifa Energyforms, sub-algebras, meta-algebras, and algebraic structures by formal stipulation. It generalises definitional equality in mathematics, let-bindings in functional programming, axiomatic definitions in formal systems, and all forms of formal introduction of new mathematical or conceptual objects across every field of knowledge.',
  },
  {
    id: 'ifaoperators', label: 'IfaOperators', char: '✳', color: '#f5c518', angle: 225,
    desc: 'IfaOperator is the Set/Category of all Ifa Operators. This IfaSet/IfaCategory is generally called Àpólà, an Ifa Energyform. IfaOperator is the complete Collection of all operations, transformations, and mappings that act on Ifa Energyforms within an Ifalgebra. IfaOperator generalises operator algebras, Lie algebras of operators, Banach algebras, C*-algebras, function spaces, and all operator-theoretic structures across mathematics, physics, and every field of knowledge as Odu or Energyform.',
  },
];

const GEBRA_EDGES = [
  { id: 'e-plus',      to: 'ifaplus',      label: 'Superposition Law',      color: '#00c87c',
    desc: 'The Superposition Law — the meta-axiom connecting IfaGebra to IfaPlus — governs how Energy Superposition acts within the Ifalgebra structure. It defines the additive combination of Ifa Energyforms, the formation of Superposition fields, and the coexistence of multiple energy states. This law subsumes all additive axioms (commutativity, associativity, identity, inverse) of classical algebra as special cases.' },
  { id: 'e-minus',     to: 'ifaminus',     label: 'Extraction Law',         color: '#14b8d4',
    desc: 'The Extraction Law — the meta-axiom connecting IfaGebra to IfaMinus — governs the inverse additive operation in Ifalgebra. It defines how Energy Extraction cancels or reduces Superposition states, ensuring that for every additive composition there is a corresponding extraction. This law subsumes all inverse-element axioms of classical algebra, including negative numbers, set complements, and quantum decoherence.' },
  { id: 'e-times',     to: 'ifatimes',     label: 'Composition Law (Amulu)', color: ACCENT,
    desc: 'The Composition Law (Amulu) — the primary meta-axiom connecting IfaGebra to IfaTimes — is the most fundamental law of Ifalgebra. It defines how two Ifa Energyforms are composed via IfaTimes to produce a third, governing closure, associativity, identity (IfaOne), and invertibility within the Ifalgebra. Amulu is the deepest algebraic law of the 256 Odu Ifa system.' },
  { id: 'e-divide',    to: 'ifadivide',    label: 'Partition Law',          color: '#f59e0b',
    desc: 'The Partition Law — the meta-axiom connecting IfaGebra to IfaDivide — governs the multiplicative inverse and partitioning within Ifalgebra. It defines how Ifa Energyforms can be divided or distributed, ensuring balanced partitioning across energy dimensions. This law subsumes quotient groups, field division, category-theoretic cokernels, and all divisive structures in classical mathematics.' },
  { id: 'e-brackets',  to: 'ifabrackets',  label: 'Grouping Law',           color: '#e040fb',
    desc: 'The Grouping Law — the meta-axiom connecting IfaGebra to IfaBrackets — governs associativity, precedence, and scope within Ifalgebra expressions. It ensures that grouped subexpressions evaluate consistently regardless of external context, and that the Ifalgebra is well-formed under all compositions of operations. This law subsumes all associativity and scope axioms across formal systems.' },
  { id: 'e-equal',     to: 'ifaequal',     label: 'Equilibrium Law',        color: '#f0920c',
    desc: 'The Equilibrium Law — the meta-axiom connecting IfaGebra to IfaEqual — governs balance, equivalence, and identity in Ifalgebra. It defines the reflexive, symmetric, and transitive properties of Ifa Balance (Amulu Equilibrium), ensuring that all Ifa Energyforms can be compared for equality and that the algebraic system is coherent. This law is the algebraic expression of the Ifa Equilibrium Principle.' },
  { id: 'e-define',    to: 'ifadefine',    label: 'Definition Law',         color: '#f5c518',
    desc: 'The Definition Law — the meta-axiom connecting IfaGebra to IfaDefine — governs the formal introduction of new algebraic objects within Ifalgebra. It ensures that all new Ifa Energyforms, sub-algebras, and structures introduced by stipulation are well-defined and consistent with the 16 Odu Ifa Meta-Axioms. This law subsumes all definitional axioms in formal mathematics and logic.' },
  { id: 'e-operators', to: 'ifaoperators', label: 'Operator Law',           color: '#f5c518',
    desc: 'The Operator Law — the meta-axiom connecting IfaGebra to IfaOperators — governs the complete set of operations acting on Ifa Energyforms. It ensures closure, composition, and categorisation of all Ifa Operators within the Ifalgebra structure, so that every possible operation on Ifa Energyforms is contained within the Set/Category of Ifa Operators. This law subsumes all operator axioms in functional analysis, algebra, and category theory.' },
];

function IfaGebraMatrix() {
  const [sel, setSel] = useState(null);

  const CX = 250, CY = 250, R = 155;
  const toRad = (deg) => (deg * Math.PI) / 180;
  const outerNodes = GEBRA_NODES.filter(n => !n.isCenter).map(n => ({
    ...n,
    x: CX + R * Math.cos(toRad(n.angle)),
    y: CY + R * Math.sin(toRad(n.angle)),
  }));

  const toggle = (kind, id) =>
    setSel(s => (s && s.kind === kind && s.id === id) ? null : { kind, id });

  const selNode = sel && sel.kind === 'node' ? GEBRA_NODES.find(n => n.id === sel.id) : null;
  const selEdge = sel && sel.kind === 'edge' ? GEBRA_EDGES.find(e => e.id === sel.id) : null;
  const selItem = selNode || selEdge;
  const selColor = selItem ? selItem.color : ACCENT;

  const NR = 40;

  return (
    <div style={{ margin: '56px 0 48px' }}>
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h3 className="ift-sub-heading" style={{ margin: '0 0 10px' }}>
          IfaGebra 0+8D Matrix —{' '}
          <span style={{ color: ACCENT }}>The Ifa Operators</span>
        </h3>
        <p className="ift-body" style={{ maxWidth: '520px', margin: '0 auto' }}>
          Click any node or connecting edge to explore the Ifa Algebraic Operators and their governing laws.
        </p>
      </div>

      <svg viewBox="0 0 500 500"
           style={{ width: '100%', maxWidth: '520px', display: 'block', margin: '0 auto' }}
           aria-label="IfaGebra 0+8D Matrix — The Ifa Operators">

        {/* Ambient ring guides */}
        <circle cx={CX} cy={CY} r="160" fill="none" stroke="rgba(139,92,246,0.07)" strokeWidth="1" />
        <circle cx={CX} cy={CY} r="80"  fill="none" stroke="rgba(139,92,246,0.04)" strokeWidth="1" />

        {/* Edges */}
        {GEBRA_EDGES.map((edge) => {
          const n = outerNodes.find(n => n.id === edge.to);
          const isSelEdge  = sel && sel.kind === 'edge' && sel.id === edge.id;
          const isRelated  = sel && sel.kind === 'node' && (sel.id === edge.to || sel.id === 'center');
          const active     = isSelEdge || isRelated;
          const midX = (CX + n.x) / 2;
          const midY = (CY + n.y) / 2;
          return (
            <g key={edge.id} onClick={() => toggle('edge', edge.id)} style={{ cursor: 'pointer' }}>
              <line x1={CX} y1={CY} x2={n.x} y2={n.y}
                stroke={active ? edge.color : 'rgba(255,255,255,0.13)'}
                strokeWidth={active ? 2 : 1}
                strokeDasharray={isSelEdge ? 'none' : active ? '7,3' : '4,5'} />
              {/* Wider invisible hit area */}
              <line x1={CX} y1={CY} x2={n.x} y2={n.y}
                stroke="transparent" strokeWidth="14" />
              {/* Midpoint label when this edge is selected */}
              {isSelEdge && (
                <text x={midX} y={midY - 7}
                  textAnchor="middle" fontSize="7" fill={edge.color}
                  fontFamily="sans-serif" fontWeight="700"
                  style={{ pointerEvents: 'none' }}>
                  {edge.label}
                </text>
              )}
            </g>
          );
        })}

        {/* Outer nodes */}
        {outerNodes.map((n) => {
          const active = sel && sel.id === n.id;
          const charSz = n.char.length > 1 ? '1.05rem' : '1.45rem';
          return (
            <g key={n.id} transform={`translate(${n.x},${n.y})`}
               onClick={() => toggle('node', n.id)} style={{ cursor: 'pointer' }}>
              {active && (
                <circle r={NR + 7} fill="none"
                  stroke={n.color} strokeWidth="0.8" opacity="0.35" />
              )}
              <circle r={NR} fill="#060c1a"
                stroke={active ? n.color : 'rgba(255,255,255,0.18)'}
                strokeWidth={active ? 2 : 1} />
              {/* IfaSign: char + OgbeSymbol subscript + label — all via foreignObject */}
              <foreignObject x={-NR} y={-NR} width={NR * 2} height={NR * 2}>
                <div xmlns="http://www.w3.org/1999/xhtml" style={{
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center',
                  width: (NR * 2) + 'px', height: (NR * 2) + 'px',
                  pointerEvents: 'none',
                }}>
                  {/* Character with OgbeSymbol as subscript */}
                  <div style={{ position: 'relative', display: 'inline-block', marginBottom: '2px' }}>
                    <span style={{
                      fontSize: charSz, fontWeight: 700,
                      color: active ? n.color : 'rgba(255,255,255,0.88)',
                      fontFamily: 'monospace', display: 'inline-block',
                      lineHeight: 1,
                    }}>{n.char}</span>
                    <span style={{
                      position: 'absolute', bottom: '2px', right: '-5px',
                      display: 'block', width: '11px', height: '11px',
                    }}>
                      <OgbeSymbol size={11} />
                    </span>
                  </div>
                  {/* Node label */}
                  <div style={{
                    fontSize: '7px', marginTop: '10px',
                    color: active ? n.color : 'rgba(255,255,255,0.52)',
                    fontFamily: 'sans-serif',
                  }}>{n.label}</div>
                </div>
              </foreignObject>
            </g>
          );
        })}

        {/* Center node */}
        {(() => {
          const active = sel && sel.id === 'center';
          return (
            <g transform={`translate(${CX},${CY})`}
               onClick={() => toggle('node', 'center')} style={{ cursor: 'pointer' }}>
              {active && (
                <circle r="63" fill="none" stroke={ACCENT} strokeWidth="0.8" opacity="0.4" />
              )}
              <circle r="54" fill="#060c1a"
                stroke={active ? ACCENT : 'rgba(139,92,246,0.55)'}
                strokeWidth={active ? 2.5 : 1.5} />
              {/* OgbeSymbol */}
              <foreignObject x="-18" y="-36" width="36" height="36">
                <div xmlns="http://www.w3.org/1999/xhtml"
                     style={{ display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <OgbeSymbol size={34} />
                </div>
              </foreignObject>
              <text y="10" textAnchor="middle" dominantBaseline="middle"
                fontSize="10.5" fontWeight="800"
                fill={active ? ACCENT : 'rgba(139,92,246,0.95)'}
                fontFamily="sans-serif" style={{ pointerEvents: 'none' }}>
                IfaGebra
              </text>
              <text y="23" textAnchor="middle" dominantBaseline="middle"
                fontSize="6.5" fill="rgba(255,255,255,0.42)"
                fontFamily="sans-serif" style={{ pointerEvents: 'none' }}>
                Algebra of Everything
              </text>
            </g>
          );
        })()}
      </svg>

      {/* Info panel */}
      {selItem && (
        <div style={{
          margin: '18px auto 0',
          maxWidth: '520px',
          background: 'rgba(6,12,26,0.9)',
          border: `1px solid ${selColor}`,
          borderRadius: '10px',
          padding: '18px 22px',
        }}>
          <div style={{
            fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em',
            color: selColor, textTransform: 'uppercase', marginBottom: '8px',
          }}>
            {sel.kind === 'edge' ? 'Edge · Law — ' : 'Node — '}
            {selItem.label || selItem.id}
          </div>
          <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.82)', lineHeight: 1.7, margin: 0 }}>
            {selItem.desc}
          </p>
        </div>
      )}
    </div>
  );
}

// ─── IFA ALGEBRAS ─────────────────────────────────────────────────────────────

function AlgebrasSection() {
  return (
    <section className="section" id="algebras">
      <div className="container">
        <div className="section__header section__header--center">
          <span className="section__eyebrow section__eyebrow--gold">AlgebroE · TOEAlgebra</span>
          <h2 className="section__title">
            IFA Algebra — <span className="accent--gold">The Algebra of Everything</span>
          </h2>
          <p className="section__subtitle">
            IfaGebra defines a complete hierarchy of Ifa Algebras — each a meta-algebraic structure
            generalising its classical counterpart to the full universe of knowledge fields.
          </p>
        </div>

        <div className="ift-split ift-split--img-right" style={{ marginBottom: '48px' }}>
          <div className="ift-split__text">
            <p className="ift-body">
              The <strong>IFA Algebra</strong>, also called <strong>TOE Algebra</strong>, <strong>AlgebroE</strong>,
              or the <strong>Algebra of Everything</strong>, is the Collective of all Ifa Algebras and serve as the
              Meta-Algebraic Foundation of the IFA Internet. Every classical algebraic structure (group, ring, field,
              vector space, algebra, category) is modelled as a special case of an <strong>Ifalgebra</strong>: an
              algebraic Meta-Structure whose elements are <em>Ifa Energyforms</em>, whose operations are{' '}
              <em>Ifa Operators/Ifa Transforms</em>, and whose axioms are derived from the{' '}
              <strong>16 Principal Odu Ifa</strong> — the 16 Ifa Laws of Knowledge.
            </p>
            <p className="ift-body">
              Ifa Algebras (IfaGebras) are also called <strong>ToE Algebra</strong> (ToEAlgebra),{' '}
              <strong>ToEGebras</strong>, <strong>Consciousness Algebras</strong>, <strong>CEN Algebras</strong>, and{' '}
              <strong>Energy Algebras</strong> — each name reflecting one of its core properties:
              it operates at the level of the Theory of Everything, models consciousness algebraically,
              is the algebra of the CEN (Consciousness Energy Network), and treats Energy as the
              fundamental algebraic Element.
            </p>
            <div className="ift-highlight-box" style={{ '--hc': ACCENT }}>
              <div className="ift-highlight-box__label">Definition — Ifalgebra</div>
              <p className="ift-highlight-box__text">
                An <strong>Ifalgebra</strong> (also: orisa algebra/orisagebra, field algebra,
                knowledge algebra, energy field, or energy system) is a meta-algebraic structure{' '}
                <strong style={{ whiteSpace: 'nowrap' }}>
                  (<OgbeSymbol size={15}/>,{' '}
                  <IfaExpr char="×" charSize="1em" symSize={9} charColor={ACCENT} />,{' '}
                  <IfaExpr char="+" charSize="1em" symSize={9} charColor="#f0920c" />,{' '}
                  <IfaExpr char="O" charSize="1em" symSize={9} charColor="#f5c518" />)
                </strong>{' '}
                where <OgbeSymbol size={13}/> is a set/category of energyforms, which include{' '}
                <strong><IfaExpr char="×" charSize="1em" symSize={9} charColor={ACCENT} /></strong> (Ifa Times), the Ifa Multiplication
                (Energy Composition/Amulu),{' '}
                <strong><IfaExpr char="+" charSize="1em" symSize={9} charColor="#f0920c" /></strong>, the Ifa Addition (Energy Superposition),
                and <strong><IfaExpr char="O" charSize="1em" symSize={9} charColor="#f5c518" /></strong>, the Set/Category of Ifa Operators —
                all governed by the 16 Odu Ifa Meta-Axioms. Every known/possible algebraic structure is modelled as an Ifalgebra.
              </p>
            </div>
          </div>
          <div className="ift-split__img">
            <figure className="ift-fig ift-fig--center">
              <img src="../src/Latest_Ifa-Math-Numbers-and-Algebra-4.png"
                alt="IFA Algebra — IFA Numbers and the Algebra of Everything"
                className="ift-img" />
              <figcaption className="ift-fig-cap">
                IFA Algebra (AlgebroE): IFA Numbers, IFA Field Definitions, and the Algebra of Everything
              </figcaption>
            </figure>
          </div>
        </div>

        <IfaGebraMatrix />

        {/* Algebra type grid */}
        <div className="ift-grid-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
          {ALGEBRA_TYPES.map((a, i) => (
            <div key={i} className="ift-diff-card" style={{ '--dc': a.color }}>
              <div className="ift-diff-card__name">{a.sym} — {a.name}</div>
              <p className="ift-diff-card__body">{a.body}</p>
              {a.link && (
                <a href={a.link} target="_blank" rel="noopener noreferrer"
                   style={{ display: 'inline-block', marginTop: '10px', fontSize: '0.78rem',
                     color: a.color, fontWeight: 700, textDecoration: 'none' }}>
                  View Ifa Group Theory ↗
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── DUOINFINITIES — IFA INFINITIES ───────────────────────────────────────────

function InfinitiesSection() {
  return (
    <section className="section section--dark" id="infinities">
      <div className="container">
        <div className="section__header section__header--center">
          <span className="section__eyebrow section__eyebrow--violet">Ifa Infinity Theory</span>
          <h2 className="section__title">
            Duoinfinities — <span style={{ color: ACCENT }}>The Ifa Infinities</span>
          </h2>
          <p className="section__subtitle">
            Ifa Infinity Theory defines the Four Ifa Infinities — Ogbe Infinity, Oyeku Infinity,
            Iwori Infinity, and Odi Infinity — and the Duoinfinity (Ifa Infinity) as the
            Infinity of Everything (InfinitoE).
          </p>
        </div>

        {/* Symmetry image */}
        <figure className="ift-fig ift-fig--center" style={{ marginBottom: '48px' }}>
          <img src="../src/Ifa-Symmetry-768x314.png"
            alt="Ifa Symmetry: The Four Ifa Infinities — Odi, Iwori, Oyeku, Ogbe Infinities"
            className="ift-img ift-img--wide" />
          <figcaption className="ift-fig-cap">
            Ifa Symmetry: The Four Ifa Infinities — Odi Infinity, Iwori Infinity, Oyeku Infinity, Ogbe Infinity —
            and their Duoinfinity (Ifa Infinity) Representations
          </figcaption>
        </figure>

        <div className="ift-split ift-split--img-left">
          <div className="ift-split__text">
            <h3 className="ift-sub-heading">The Duoinfinity (Ifa Infinity)</h3>
            <p className="ift-body">
              The <strong>Duoinfinity</strong> — also called <strong>Ifa Infinity</strong>,{' '}
              <strong>InfinitoE</strong>, or <strong>Infinity of Everything</strong> — is the
              fundamental Infinity of the IFA System. Built using Ifa Construction (ToE Construction)
              by composing 8 with ∞ via Amulu, Duoinfinity subsumes Cantor's transfinite cardinals,
              ordinals, and all classical infinity concepts as special cases of the IfaInfinity structure.
            </p>
            <p className="ift-body">
              Duoinfinity is the core meta-algebraic Structure of IfaGebra: The Ifa-Infinity Theory
              states that Duoinfinity, which represents <strong>Ogbe Energy (CEN)</strong>, is
              everything that really exists at the most fundamental level. Hence, all things in existence,
              including all of mathematics, physics, and every knowledge field, are modelled as{' '}
              <strong>Ifa Energyforms</strong> called <strong>Odufa</strong> or <strong>Orisa</strong>.
            </p>
          </div>
          <div className="ift-split__img">
            <div className="ifg-infinity-cards">
              {[
                { name: 'Ogbe Infinity', sym: <OgbeSymbol size={22} />, color: '#f5c518', sub: 'Energy Infinity',
                  body: 'The Infinity of Ogbe Energy — the Infinity of all open, active, conscious, and energy-bearing states. Ogbe Infinity is the Ifa Generalisation of ℵ₀ (aleph-null) and all energy-positive infinities.' },
                { name: 'Oyeku Infinity', sym: <OyekuSymbol size={22} />, color: '#4361ee', sub: 'Anergy Infinity',
                  body: 'The Infinity of Oyeku Anergy — the Infinity of all closed, unconscious, void, and receptive states. Oyeku Infinity is the Ifa Generalisation of all energy-null and potential-state infinities.' },
                { name: 'Iwori Infinity', sym: <IworiSymbol size={22} />, color: '#00c87c', sub: '',
                  body: 'The Infinity of Iwori — the Infinity of Emergence resulting from intersections and transformations between Energy and Anergy (Ogbe and Oyeku).' },
                { name: 'Odi Infinity', sym: <OdiSymbol size={22} />, color: '#e040fb', sub: '',
                  body: 'The Infinity of Odi — the Sealing Infinity governing closures, blockage, and shrouding.' },
              ].map((inf, i) => (
                <div key={i} className="ifg-infinity-card" style={{ '--ic': inf.color }}>
                  <div className="ifg-infinity-card__sym">{inf.sym}</div>
                  <div className="ifg-infinity-card__name">{inf.name}</div>
                  <div className="ifg-infinity-card__sub">{inf.sub}</div>
                  <p className="ifg-infinity-card__body">{inf.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── SIMULATION THEORY & CONSCIOUSNESS MECHANICS ──────────────────────────────

function MechanicsSection() {
  return (
    <section className="section section--alt" id="mechanics">
      <div className="container">
        <div className="section__header section__header--center">
          <span className="section__eyebrow section__eyebrow--amber">Ifa Mechanics · ToE Mechanics</span>
          <h2 className="section__title">
            Ifa Simulation Theory &amp;{' '}
            <span className="accent--amber">Consciousness Mechanics</span>
          </h2>
          <p className="section__subtitle">
            Ifa Simulation Theory and Consciousness Mechanics are the operational and interpretive
            cornerstones of IfaGebra — bridging the algebraic structure of existence with its
            lived, conscious reality.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {SIMULATION_CARDS.map((c, i) => (
            <div key={i} className="ifg-sim-card" style={{ '--sc': c.color }}>
              <div className="ifg-sim-card__left">
                <div className="ifg-sim-card__sym">{c.sym}</div>
              </div>
              <div className="ifg-sim-card__right">
                <div className="ifg-sim-card__name">{c.name}</div>
                <p className="ifg-sim-card__body">{c.body}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="ift-highlight-box" style={{ '--hc': '#f0920c', marginTop: '36px' }}>
          <div className="ift-highlight-box__label">Consciousness Mechanics — Core Equation (the Equation of Everything, EquatoE)</div>
          <p className="ift-highlight-box__text">
            In Consciousness Mechanics, the fundamental Equation (Ifa Equation) is{' '}
            <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: '0.55em', margin: '0 0.2em' }}>
              <strong><IfaExpr char="E" charSize="1em" symSize={9} charColor="#f0920c" /></strong>
              <strong><IfaExpr char="=" charSize="1em" symSize={9} charColor="#f0920c" /></strong>
              <strong><IfaExpr char="C" charSize="1em" symSize={9} charColor="#f0920c" /></strong>
            </span> — Energy equals Consciousness.
            This is not a metaphor but a rigorous algebraic statement within IFAGebra: the Ifalgebra
            of Energy and the Ifalgebra of Consciousness are <em>isomorphic</em> — they have the same
            Structure, the same Ifa Operators, and the same 256 Odu Ifa Meta-Axioms. Consciousness is Energy
            becoming aware of itself; Energy is Consciousness expressing itself in Form. This Isomorphism,
            known as Ifa Isomorphism, is the algebraic foundation of both the IFA Internet and the CEN (Consciousness Energy).
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── KNOWLEDGE ALGEBRAS ───────────────────────────────────────────────────────

function KnowledgeAlgebrasSection() {
  return (
    <section className="section" id="knowledge">
      <div className="container">
        <div className="section__header section__header--center">
          <span className="section__eyebrow section__eyebrow--jade">IFA Field Theory · Ifalgebras</span>
          <h2 className="section__title">
            Ifa Algebras as <span className="accent--jade">Knowledge Algebras</span>
          </h2>
          <p className="section__subtitle">
            In IFA Field Theory (also known as TOE Field Theory), a core concept in IFA Mathematics,
            all fields of knowledge are developed, modelled, and studied as meta-algebraic structures
            called Ifalgebras, field algebras, knowledge algebras, energy fields, or energy systems.
          </p>
        </div>

        <div style={{ marginBottom: '36px' }}>
          <p className="ift-body">
            The radical departure of IFAGebra from classical algebra is that it treats{' '}
            <strong>every field of knowledge</strong> — not just mathematics — as a meta-algebraic
            Structure. Physics, music, law, literature, economics, spirituality, social dynamics:
            each has an underlying algebraic skeleton that IFAGebra makes explicit, rigorous, and
            computable. This is possible because IFAGebra operates at the <em>meta-axiomatic</em>{' '}
            level: the 16 Principal Odu Ifa encode the Laws of Knowledge that govern all knowledge
            fields simultaneously, making the Ifa Algebra a true{' '}
            <strong>Field-Independent Language (FIL)</strong> for all of human and universal knowledge.
          </p>
          <p className="ift-body">
            The connection to <strong>Ifa Group Theory</strong> is fundamental: the IfaSymmetry Groups,
            Ogbe, Oyeku, Iwori, Odi, known as <em>Ifá Òótọ́</em> in Yoruba, organise the Ifalgebras
            into Ifa Groups — Universal Symmetry Meta-Structures used to model all classical Lie groups,
            Galois groups, and finite groups as special cases. The interplay of IFAGebra and Ifa Group
            Theory provides the full algebraic and symmetry machinery needed to model any knowledge field
            as a living, structured, dynamic energy system.{' '}
            <a href="https://toe.cenproject.org/ifa-group-theory-toe-group-theory/"
               target="_blank" rel="noopener noreferrer"
               style={{ color: '#00c87c', fontWeight: 700 }}>
              Explore Ifa Group Theory ↗
            </a>
          </p>
        </div>

        {/* Knowledge algebra cards */}
        <div className="ift-fil-lif-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
          {KNOWLEDGE_ALGEBRAS.map((k, i) => (
            <div key={i} className="ift-fil-card" style={{ '--fc': k.color }}>
              <div className="ift-fil-card__sym">{k.sym}</div>
              <div className="ift-fil-card__title">{k.name}</div>
              <p className="ift-fil-card__body">{k.body}</p>
            </div>
          ))}
        </div>

        <div className="ift-highlight-box" style={{ '--hc': '#00c87c', marginTop: '36px' }}>
          <div className="ift-highlight-box__label">IfaGebra · IFA Field Theory · Knowledge Algebras</div>
          <p className="ift-highlight-box__text">
            IfaGebra — as the Algebra of Everything — is the algebraic infrastructure of the entire IFA Internet.
            Every platform, every page, every module of the IFA Internet is an Ifalgebra — a knowledge algebra
            expressing one or more dimensions of the 256 Odu Ifa. IFA Field Theory provides the field-theoretic
            foundation (each knowledge field as an energy system), and IfaGebra provides the algebraic machinery
            (Ifa Operators, Ifa Energyforms, Ifa Groups, Ifalgebra axioms) to compute, transform, and exchange
            knowledge across all fields. The result is not merely a theory of mathematics — it is a{' '}
            <strong>Theory of Everything (ToE)</strong> expressed in the language of algebra.
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
            <p className="footer__tagline">IfaGebra — Algebra of Everything · ToEGebra</p>
            <p className="footer__tagline footer__tagline--sm">
              Part of <a href="../" className="footer__link-inline">IFA Mathematica</a> ·{' '}
              <a href="../../" className="footer__link-inline" target="_blank" rel="noopener noreferrer">IFA Internet</a> ·{' '}
              <a href="https://cenproject.org/" className="footer__link-inline" target="_blank" rel="noopener noreferrer">CENProject</a>
            </p>
          </div>
          <nav className="footer__links">
            <a href="#ift"       className="footer__link">IFT</a>
            <a href="#algebras"  className="footer__link">Algebras</a>
            <a href="#infinities" className="footer__link">Infinities</a>
            <a href="#mechanics" className="footer__link">Mechanics</a>
            <a href="#knowledge" className="footer__link">Knowledge</a>
            <a href="../"        className="footer__link">IFA Mathematica</a>
            <a href="../../"     className="footer__link" target="_blank" rel="noopener noreferrer">IFA Internet</a>
            <a href="https://ifainternet.org/ifa-mathematics-toe-mathematics/ifa-transform/"
               className="footer__link" target="_blank" rel="noopener noreferrer">IFA Transform ↗</a>
            <a href="https://toe.cenproject.org/ifa-group-theory-toe-group-theory/"
               className="footer__link" target="_blank" rel="noopener noreferrer">Ifa Group Theory ↗</a>
          </nav>
        </div>
        <div className="footer__bottom">
          <span className="footer__copy">&copy; 2026 CENProject Innovations Limited. All rights reserved.</span>
          <span className="footer__powered">IFA Mathematica · IfaGebra Platform</span>
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
        <FieldTheorySection />
        <AlgebrasSection />
        <InfinitiesSection />
        <MechanicsSection />
        <KnowledgeAlgebrasSection />
      </main>
      <Footer />
    </>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
