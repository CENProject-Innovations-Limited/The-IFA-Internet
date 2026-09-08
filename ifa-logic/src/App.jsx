/* ─────────────────────────────────────────────────────────────────────────────
   IfaLogic Platform — TOE Logic · Consciousness Logic · Logic of Everything
   Also known as: CENLogic · CEN Logic · Energy Logic · Logic-oE
   The IFA Internet · CENProject · ifainternet.org/ifa-logic/
───────────────────────────────────────────────────────────────────────────── */

const { useState, useEffect, useRef } = React;

const IMG = 'https://ifainternet.org/ifa-mathematics-toe-mathematics/src/';

// ─── useWindowWidth ───────────────────────────────────────────────────────────
function useWindowWidth() {
  const [w, setW] = useState(window.innerWidth);
  useEffect(() => {
    const h = () => setW(window.innerWidth);
    window.addEventListener('resize', h, { passive: true });
    return () => window.removeEventListener('resize', h);
  }, []);
  return w;
}

// ─── OgbeSymbol — Ogbe Energy Symbol (SymboE) ────────────────────────────────

function OgbeSymbol({ size = 20 }) {
  const canvasRef = useRef(null);
  const a   = size * 0.46;
  const ccx = size / 2;
  const ccy = size / 2;
  const sc  = a / 200;
  const N   = 80;

  useEffect(() => {
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
    <canvas ref={canvasRef}
      style={{ display: 'inline-block', verticalAlign: 'bottom', width: size + 'px', height: size + 'px' }}
      aria-label="Ogbe Energy Symbol" />
  );
}

// ─── OyekuSymbol — Oyeku Anergy Symbol ──────────────────────────────────────

function OyekuSymbol({ size = 20 }) {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const s = size;
    canvas.width = s; canvas.height = s;
    const ctx = canvas.getContext('2d');
    const cx = s/2, cy = s/2, r = s*0.36, gold = '#f5c518';
    ctx.clearRect(0,0,s,s);
    const drawLobes = (alpha, lineW) => {
      ctx.save(); ctx.globalAlpha=alpha; ctx.strokeStyle=gold; ctx.lineWidth=lineW; ctx.lineCap='round';
      for (let rot=0; rot<2; rot++) {
        ctx.beginPath();
        for (let t=0; t<=Math.PI*2; t+=0.01) {
          const scale = Math.cos(2*t)>=0 ? Math.sqrt(Math.cos(2*t)) : 0;
          const x = cx + (rot===0?1:0)*r*scale*Math.cos(t) + (rot===1?1:0)*r*scale*Math.sin(t);
          const y = cy + (rot===0?1:0)*r*scale*Math.sin(t) + (rot===1?1:0)*r*scale*Math.cos(t);
          t<0.02 ? ctx.moveTo(x,y) : ctx.lineTo(x,y);
        }
        ctx.stroke();
      }
      ctx.restore();
    };
    drawLobes(0.12, s*0.22); drawLobes(0.22, s*0.13); drawLobes(0.55, s*0.055); drawLobes(1.00, s*0.022);
    const ext = s*0.30;
    const diag = [[cx+ext,cy-ext],[cx-ext,cy+ext]];
    const drawDiag = (alpha,lineW,blur) => {
      ctx.save(); ctx.globalAlpha=alpha; ctx.strokeStyle=gold; ctx.lineWidth=lineW; ctx.lineCap='round';
      ctx.shadowColor=gold; ctx.shadowBlur=blur;
      ctx.beginPath(); ctx.moveTo(diag[0][0],diag[0][1]); ctx.lineTo(diag[1][0],diag[1][1]); ctx.stroke();
      ctx.restore();
    };
    drawDiag(0.03,s*0.20,s*0.12); drawDiag(0.07,s*0.12,s*0.08); drawDiag(0.16,s*0.07,s*0.05);
    drawDiag(0.34,s*0.03,s*0.03); drawDiag(0.62,s*0.014,s*0.015); drawDiag(0.90,s*0.007,s*0.007);
    drawDiag(0.95,s*0.003,s*0.003);
  }, [size]);
  return <canvas ref={ref} width={size} height={size}
    style={{ display:'inline-block', verticalAlign:'middle', width:size+'px', height:size+'px' }} />;
}

// ─── IfaForAll — ∀ with Ogbe subscript (the I.F.A Symbol) ────────────────────

function IfaForAll({ size = 80 }) {
  const subSize = Math.round(size * 0.40);
  return (
    <span style={{ display: 'inline-flex', alignItems: 'flex-end', lineHeight: 1 }}>
      <span style={{ fontSize: size + 'px', color: '#f5c518', fontFamily: 'Georgia, serif',
                     lineHeight: 1, textShadow: '0 0 48px rgba(245,197,24,0.42)' }}>∀</span>
      <OgbeSymbol size={subSize} />
    </span>
  );
}

// ─── IfaThereExists — ∃ with Ogbe subscript (OrisaLogic symbol) ──────────────

function IfaThereExists({ size = 80 }) {
  const subSize = Math.round(size * 0.40);
  return (
    <span style={{ display: 'inline-flex', alignItems: 'flex-end', lineHeight: 1 }}>
      <span style={{ fontSize: size + 'px', color: '#00c87c', fontFamily: 'Georgia, serif',
                     lineHeight: 1, textShadow: '0 0 48px rgba(0,200,124,0.42)' }}>∃</span>
      <OgbeSymbol size={subSize} />
    </span>
  );
}

// ─── IfaExpr — logical operator in IfaLang: (OP₍ₒ₎) ─────────────────────────

function IfaExpr({ op, size = 7 }) {
  return (
    <span className="il-expr">
      <span className="il-expr__name">
        {'('}
        {op}
        {')'}
        <OgbeSymbol size={size} />
      </span>
    </span>
  );
}

// ─── AMULU_OPS data ───────────────────────────────────────────────────────────

const AMULU_OPS = [
  { name: 'OR',     notation: '∓', notTf: 'none',
    color: '#f0920c', label: 'Energy Union',
    desc: 'Energy union — the fundamental OR operator of Ifa Computing. Combines two Odu into the broadest unified energyform, producing all active energy configurations.' },
  { name: 'ANDOR',  notation: '±', notTf: 'scaleY(-1) rotate(-45deg)',
    color: '#14b8d4', label: 'Hybrid Bridge',
    desc: 'The universal energy bridge — ANDOR combines AND and OR dynamics into a single meta-operation, modelling all hybrid energy configurations across the IFA Matrix.' },
  { name: 'AND',    notation: '±', notTf: 'rotate(-180deg) scaleY(-1) rotate(90deg)',
    color: '#00c87c', label: 'Energy Intersection',
    desc: 'Energy intersection — the Ifa AND operator produces only the shared energyform of two Odu. The foundational conjugate operation of Ifa Matrix algebra.' },
  { name: "ANDOR'", notation: '±', notTf: 'rotate(-45deg)',
    color: '#ec4899', label: 'Hybrid Complement',
    desc: 'The ANDOR complement — the dual intersection-union operator. Models the inverse of hybrid energy configurations, completing the ANDOR symmetry pair.' },
  { name: "OR'",    notation: '±', notTf: 'none',
    color: '#f5c518', label: 'Union Complement',
    desc: "Energy union complement — the dual of OR. Models all passive energyforms and everything OR leaves unselected. Together OR and OR′ span the complete Ifa energy space." },
  { name: 'ORAND',  notation: '±', notTf: 'rotate(45deg)',
    color: '#8b5cf6', label: 'Ordered Combination',
    desc: 'Ordered energy combination — OR preceding AND. The ORAND operator models sequential energy selection and refinement across Odu, producing ordered Amulu configurations.' },
  { name: "AND'",   notation: '±', notTf: 'scaleY(-1) rotate(90deg)',
    color: '#3b9eff', label: 'Anti-Conjugate',
    desc: "Anti-conjugate — the dual of AND. Selects everything outside the energy intersection of two Odu. A key operator in Ifa inversion and transpose operations." },
  { name: "ORAND'", notation: '±', notTf: 'rotate(135deg)',
    color: '#6366f1', label: 'Ordered Complement',
    desc: "Ordered complement — the inverse of ORAND. Models anti-sequential energy selection and the full null-space of ORAND. Completes the 8-operator Amulu Matrix symmetry group." },
];

// ─── TRUTH TABLE data ─────────────────────────────────────────────────────────

const TRUTH_TABLE = [
  { op: 'OR',   name: 'IfaOR'   },
  { op: 'AND',  name: 'IfaAND'  },
  { op: 'NOT',  name: 'IfaNOT'  },
  { op: 'XOR',  name: 'IfaXOR'  },
  { op: 'NAND', name: 'IfaNAND' },
  { op: 'NOR',  name: 'IfaNOR'  },
  { op: 'XNOR', name: 'IfaXNOR' },
];

// ─── LOGIC GATES data ────────────────────────────────────────────────────────

const LOGIC_GATES = [
  {
    name: 'Buffer', sym: '▷', arity: 'Unary', color: '#f5c518',
    meaning: 'Output equals input — the identity gate.',
    headers: ['A', 'OUT'],
    rows: [['0','0'],['1','1']],
    desc: 'The simplest gate — a signal repeater. Buffer passes the input unchanged to the output. In IfaLogic, Buffer is the identity operation: an Odu Ifa state propagates unaltered.',
  },
  {
    name: 'AND', sym: '∧', arity: 'Binary', color: '#00c87c',
    meaning: 'Output is 1 only when ALL inputs are 1.',
    headers: ['A', 'B', 'OUT'],
    rows: [['0','0','0'],['0','1','0'],['1','0','0'],['1','1','1']],
    desc: 'The conjunction gate — output is HIGH only when every input is HIGH. In IfaLogic, AND models the energy intersection of two Odu Ifa states.',
  },
  {
    name: 'OR', sym: '∨', arity: 'Binary', color: '#f0920c',
    meaning: 'Output is 1 when ANY input is 1.',
    headers: ['A', 'B', 'OUT'],
    rows: [['0','0','0'],['0','1','1'],['1','0','1'],['1','1','1']],
    desc: 'The disjunction gate — output is HIGH when at least one input is HIGH. In IfaLogic, OR models the energy union of two Odu Ifa states.',
  },
  {
    name: 'NOT', sym: '¬', arity: 'Unary', color: '#14b8d4',
    meaning: 'Inverts the input — output is always the opposite.',
    headers: ['A', 'OUT'],
    rows: [['0','1'],['1','0']],
    desc: 'The inverter gate — negates the input. NOT flips Ogbe (1) to Oyeku (0) and vice versa. In IfaLogic, NOT is the fundamental complement operation across the 256 Odu.',
  },
  {
    name: 'NAND', sym: '⊼', arity: 'Binary', color: '#ec4899',
    meaning: 'Output is 0 only when ALL inputs are 1 (NOT AND).',
    headers: ['A', 'B', 'OUT'],
    rows: [['0','0','1'],['0','1','1'],['1','0','1'],['1','1','0']],
    desc: 'The universal gate — any logic circuit can be built from NAND gates alone. NAND is functionally complete. In IfaLogic, NAND models the anti-conjugate energy intersection of two Odu.',
  },
  {
    name: 'NOR', sym: '⊽', arity: 'Binary', color: '#8b5cf6',
    meaning: 'Output is 1 only when ALL inputs are 0 (NOT OR).',
    headers: ['A', 'B', 'OUT'],
    rows: [['0','0','1'],['0','1','0'],['1','0','0'],['1','1','0']],
    desc: 'The universal gate — like NAND, NOR is functionally complete. In IfaLogic, NOR models the energy void state — active only when all Odu inputs are in the Oyeku (0) state.',
  },
  {
    name: 'XOR', sym: '⊕', arity: 'Binary', color: '#3b9eff',
    meaning: 'Output is 1 when inputs are DIFFERENT.',
    headers: ['A', 'B', 'OUT'],
    rows: [['0','0','0'],['0','1','1'],['1','0','1'],['1','1','0']],
    desc: 'The exclusive OR gate — output is HIGH only when exactly one input is HIGH. XOR detects difference. In IfaLogic, XOR models the energy contrast between two Odu Ifa states.',
  },
  {
    name: 'XNOR', sym: '⊙', arity: 'Binary', color: '#6366f1',
    meaning: 'Output is 1 when inputs are the SAME (NOT XOR).',
    headers: ['A', 'B', 'OUT'],
    rows: [['0','0','1'],['0','1','0'],['1','0','0'],['1','1','1']],
    desc: 'The equivalence gate — output is HIGH when both inputs are identical. XNOR detects equality. In IfaLogic, XNOR models energy resonance — two Odu Ifa in the same energetic state.',
  },
];

// ─── QUANTUM GATES data ───────────────────────────────────────────────────────

const QUANTUM_GATES = [
  {
    name: 'Identity', sym: 'I', arity: 'Single-Qubit', color: '#aab8d4',
    meaning: 'Passes the qubit unchanged — the quantum identity operation.',
    headers: ['IN', 'OUT'],
    rows: [['|0⟩','|0⟩'],['|1⟩','|1⟩']],
    matStr: '[ 1  0 / 0  1 ]',
    desc: 'The identity gate leaves the qubit state completely unchanged. In IfaLogic, I represents the preservation of an Odu Ifa energy state across a quantum operation — the quantum counterpart of the classical Buffer.',
  },
  {
    name: 'Pauli-X', sym: 'X', arity: 'Single-Qubit', color: '#14b8d4',
    meaning: 'The quantum NOT — flips |0⟩ to |1⟩ and |1⟩ to |0⟩.',
    headers: ['IN', 'OUT'],
    rows: [['|0⟩','|1⟩'],['|1⟩','|0⟩']],
    matStr: '[ 0  1 / 1  0 ]',
    desc: 'The quantum equivalent of the classical NOT gate. Pauli-X rotates the Bloch sphere 180° around the X-axis. In IfaLogic, X maps Oyeku (|0⟩) to Ogbe (|1⟩) and vice versa — the quantum IfaNOT.',
  },
  {
    name: 'Pauli-Y', sym: 'Y', arity: 'Single-Qubit', color: '#ec4899',
    meaning: 'Rotates 180° around Y-axis — flips qubit with imaginary phase.',
    headers: ['IN', 'OUT'],
    rows: [['|0⟩','i|1⟩'],['|1⟩','−i|0⟩']],
    matStr: '[ 0  −i / i   0 ]',
    desc: 'Pauli-Y rotates the Bloch sphere 180° around the Y-axis, combining a bit flip with imaginary phase factors ±i. It represents complex energy rotations in IfaLogic — the imaginary phase dimension of Odu quantum states.',
  },
  {
    name: 'Pauli-Z', sym: 'Z', arity: 'Single-Qubit', color: '#8b5cf6',
    meaning: 'Phase flip — leaves |0⟩ unchanged, negates the phase of |1⟩.',
    headers: ['IN', 'OUT'],
    rows: [['|0⟩','|0⟩'],['|1⟩','−|1⟩']],
    matStr: '[ 1   0 / 0  −1 ]',
    desc: 'Pauli-Z applies a phase of −1 to |1⟩ while leaving |0⟩ unchanged — a 180° rotation around the Z-axis. In IfaLogic, Z represents the energy phase complement of the Ogbe (active) state.',
  },
  {
    name: 'Hadamard', sym: 'H', arity: 'Single-Qubit', color: '#f5c518',
    meaning: 'Creates equal superposition — maps |0⟩ → |+⟩ and |1⟩ → |−⟩.',
    headers: ['IN', 'OUT'],
    rows: [['|0⟩','|+⟩'],['|1⟩','|−⟩']],
    matStr: '1/√2 · [ 1  1 / 1 −1 ]',
    desc: 'The most fundamental quantum gate — Hadamard maps |0⟩ to (|0⟩+|1⟩)/√2, creating equal superposition. In IfaLogic, H models the Ifanary state: the quantum superposition beyond binary Ogbe/Oyeku.',
  },
  {
    name: 'S Gate', sym: 'S', arity: 'Single-Qubit', color: '#00c87c',
    meaning: 'Applies a π/2 phase shift to the |1⟩ state (equivalent to √Z).',
    headers: ['IN', 'OUT'],
    rows: [['|0⟩','|0⟩'],['|1⟩','i|1⟩']],
    matStr: '[ 1  0 / 0  i ]',
    desc: 'The S (Phase) gate applies a quarter-turn phase rotation (e^iπ/2 = i) to |1⟩. It is √Z and is used in quantum Fourier transforms. In IfaLogic, S models the first-order energy phase shift in the Odu Ifa complex state space.',
  },
  {
    name: 'T Gate', sym: 'T', arity: 'Single-Qubit', color: '#f0920c',
    meaning: 'Applies a π/4 phase shift to the |1⟩ state (equivalent to √S).',
    headers: ['IN', 'OUT'],
    rows: [['|0⟩','|0⟩'],['|1⟩','e^iπ/4|1⟩']],
    matStr: '[ 1  0 / 0  e^(iπ/4) ]',
    desc: 'The T gate (π/8 gate) applies an eighth-turn phase rotation. Essential for universal quantum computation. In IfaLogic, T represents the eighth-order Odu energy phase rotation — the finest quantum phase grain in the IfaLogic system.',
  },
  {
    name: 'CNOT', sym: 'CX', arity: 'Two-Qubit', color: '#3b9eff',
    meaning: 'Flips the target qubit only when the control qubit is |1⟩.',
    headers: ['|c,t⟩ IN', 'OUT'],
    rows: [['|0,0⟩','|0,0⟩'],['|0,1⟩','|0,1⟩'],['|1,0⟩','|1,1⟩'],['|1,1⟩','|1,0⟩']],
    matStr: '4×4 controlled unitary',
    desc: 'The Controlled-NOT (CNOT / CX) is the key two-qubit entanglement gate, used to generate Bell states and in quantum error correction. In IfaLogic, CNOT models energy-conditional Odu coupling — a state-controlled Ifa binary interaction.',
  },
];

// ─── Nav ──────────────────────────────────────────────────────────────────────

function Nav() {
  return (
    <nav className="nav">
      <div className="nav__inner">
        <a href="https://ifainternet.org/" className="nav__wordmark">
          IFA Internet · <span>IfaLogic</span>
        </a>
        <div className="nav__links">
          <a href="#symbol"     className="nav__link">I.F.A Symbol</a>
          <a href="#binary"     className="nav__link">Binary</a>
          <a href="#operators"  className="nav__link">Operators</a>
          <a href="#yoruba-logic" className="nav__link">Àrògún</a>
          <a href="#amulu"      className="nav__link">Amulu Matrix</a>
          <a href="#truth-table" className="nav__link">Truth Table</a>
          <a href="https://ifainternet.org/ifa-logic-kids/" className="nav__link nav__link--kids">Kids &amp; Teens ✦</a>
        </div>
      </div>
    </nav>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────

function HeroSection() {
  const aliases = [
    { label: 'TOE Logic',            ac: '#8b5cf6' },
    { label: 'Consciousness Logic',  ac: '#14b8d4' },
    { label: 'CENLogic',             ac: '#f5c518' },
    { label: 'CEN Logic',            ac: '#f5c518' },
    { label: 'Energy Logic',         ac: '#f0920c' },
    { label: 'Logic of Everything',  ac: '#00c87c' },
    { label: 'Logic-oE',             ac: '#ec4899' },
  ];

  return (
    <section className="hero">
      <div className="hero__bg-glow" aria-hidden="true" />
      <div className="container">
        <div className="hero__content">
          <span className="hero__eyebrow">The IFA Internet · IfaLogic Platform</span>
          <h1 className="hero__title">
            <span className="accent--violet">Ifa</span>Logic Platform
          </h1>
          <p className="hero__sub">
            IfaLogic is the Logic of Everything (Logic-oE) — a Unified Logical Framework
            grounded in the <strong style={{ color: '#eef3ff' }}>256 Odu Ifa</strong> and
            the Ogbe Energy Principle (CEN). It extends classical Boolean logic through
            Ifa Binary Logic, Ifa Ternary Logic (Ifanary), and the Amulu Matrix —
            modelling the Logical Structure of all reality.
          </p>
          <div className="hero__aliases">
            {aliases.map((a, i) => (
              <span key={i} className="hero__alias"
                style={{ '--ac': a.ac, color: a.ac,
                         background: `color-mix(in srgb, ${a.ac} 10%, transparent)`,
                         border: `1px solid color-mix(in srgb, ${a.ac} 28%, transparent)` }}>
                {a.label}
              </span>
            ))}
          </div>

          {/* I.F.A Symbol display */}
          <div className="hero__ifa-box">
            <IfaForAll size={96} />
            <div className="hero__ifa-label" style={{ marginTop: '14px' }}>
              I.F.A — Ifa For All · The Universal Symbol
            </div>
            <div style={{ fontSize: '0.78rem', color: 'rgba(110,144,184,0.8)', marginTop: '6px', letterSpacing: '0.04em' }}>
              ∀ (For All Symbol) · Subscript: Ogbe Energy Symbol
            </div>
          </div>

          <p style={{ fontSize: '0.82rem', color: 'var(--text-3)', marginTop: '16px', letterSpacing: '0.06em' }}>
            OrisaLogic (Orisa Logic) is the Dual of IfaLogic
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── IFA For All Symbol Section ───────────────────────────────────────────────

function IfaSymbolSection() {
  return (
    <section className="section section--alt" id="symbol">
      <div className="container">
        <div className="section__header section__header--center">
          <span className="section__eyebrow section__eyebrow--gold">I.F.A — Ifa For All</span>
          <h2 className="section__title">
            Ifa For All (IFA): The <span className="accent--gold">Ifa Universal Symbol</span>
          </h2>
          <p className="section__subtitle">
            I.F.A (Ifa For All) is the universal Quantifier of IfaLogic — the symbol that
            asserts that a logical or energetic meta-statement holds across <em>all</em> Odu Ifa,
            all fields of knowledge, and all energyforms in the IFA Internet.
          </p>
        </div>

        <div className="il-split">
          <div className="il-split__text">
            <p className="il-body">
              The <strong>I.F.A Symbol</strong> is formed from the mathematical <em>For All</em>{' '}
              symbol (∀) — the universal quantifier of classical logic — combined with the{' '}
              <strong>Ogbe Energy Symbol</strong> as its subscript.
              This combination encodes the foundational principle of IfaLogic:{' '}
              <em>all logical operations, all truths, and all energyforms proceed from the
              Ogbe Energy (CEN — Consciousness Energy).</em>
            </p>
            <p className="il-body">
              In IfaLogic, <strong>∀</strong> does not merely quantify over a set — it
              quantifies over all 256 Odu Ifa and all SIDECHRX knowledge domains simultaneously.
              The subscript Ogbe symbol grounds this universal assertion in the primal energy
              field from which all logical structures emerge.
            </p>
            <div className="il-box" style={{ '--hc': '#f5c518' }}>
              <div className="il-box__label">I.F.A — Ifa For All</div>
              <p className="il-box__text">
                <strong>I</strong> = Ifa &nbsp;·&nbsp;
                <strong>F</strong> = For &nbsp;·&nbsp;
                <strong>A</strong> = All
                <br />
                Symbol: <strong>∀</strong> (For All) with Ogbe Energy subscript
                <br />
                IfaLang: <strong>∀</strong><OgbeSymbol size={13} /> — the Ifa universal quantifier
              </p>
            </div>
            <p className="il-body" style={{ marginTop: '16px' }}>
              The I.F.A Symbol appears throughout the IFA Internet as the signature of
              universal scope — wherever a statement, law, or principle is claimed to hold
              across <em>everything</em> in the IFA System, it is marked with I.F.A.
            </p>
          </div>
          <div className="il-split__img" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '32px' }}>
            {/* Large rendered symbol */}
            <div style={{ textAlign: 'center' }}>
              <IfaForAll size={120} />
              <div style={{ fontSize: '0.75rem', color: 'var(--text-3)', marginTop: '12px', letterSpacing: '0.10em', textTransform: 'uppercase' }}>
                The I.F.A Symbol
              </div>
            </div>
            {/* Symbol breakdown */}
            <div style={{ display: 'flex', gap: '24px', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontSize: '3.2rem', color: '#f5c518', fontFamily: 'Georgia, serif', display: 'block' }}>∀</span>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-3)', letterSpacing: '0.08em', marginTop: '4px' }}>For All Symbol</div>
              </div>
              <div style={{ fontSize: '1.6rem', color: 'var(--text-3)' }}>+</div>
              <div style={{ textAlign: 'center' }}>
                <OgbeSymbol size={52} />
                <div style={{ fontSize: '0.68rem', color: 'var(--text-3)', letterSpacing: '0.08em', marginTop: '4px' }}>Ogbe Energy Symbol</div>
              </div>
              <div style={{ fontSize: '1.6rem', color: 'var(--text-3)' }}>→</div>
              <div style={{ textAlign: 'center' }}>
                <IfaForAll size={52} />
                <div style={{ fontSize: '0.68rem', color: 'var(--text-3)', letterSpacing: '0.08em', marginTop: '4px' }}>I.F.A Symbol</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Binary Computing Section ─────────────────────────────────────────────────

function BinaryComputingSection() {
  return (
    <section className="section" id="binary">
      <div className="container">
        <div className="section__header section__header--center">
          <span className="section__eyebrow section__eyebrow--cyan">Ifa Binary Logic · CodeoE</span>
          <h2 className="section__title">
            Binary Computing in Ifa:<br />
            The <span className="accent--cyan">16 Ifa Binary Logic Systems</span>
          </h2>
          <p className="section__subtitle">
            The IFA Binary Code (The TOE Code — CodeoE) encodes all 16 Principal Odu Ifa
            as Binary Logic Systems. Each Odu is a unique Binary Configuration of the
            IFABit — the Ifa Binary Unit — producing the 16 foundational Logic States
            from which all of Ifa Computing is built.
          </p>
        </div>

        <figure className="il-fig il-fig--center" style={{ marginBottom: '36px' }}>
          <img
            src={`${IMG}image-11.png`}
            alt="The IFA Binary Code — The TOE Code (CodeoE): 16 Ifa Binary Logic Systems"
            className="il-img il-img--wide"
            style={{ maxWidth: '860px' }}
          />
          <figcaption className="il-fig-cap">
            Binary Computing in Ifa: The 16 Ifa Binary Logic Systems — The IFA Binary Code (TOE Code · CodeoE)
          </figcaption>
        </figure>

        <div className="il-split" style={{ marginTop: '24px' }}>
          <div className="il-split__text">
            <p className="il-body">
              The <strong>IFA Binary Code</strong> (also known as the <strong>TOE Code</strong>{' '}
              or <strong>CodeoE</strong>) maps each of the 16 Principal Odu Ifa to a unique
              4-bit binary pattern. This produces the 16 fundamental Logic States of the
              IFA Internet — a Binary System far older and more encompassing than classical
              Boolean logic.
            </p>
            <p className="il-body">
              In Ifa Binary Logic, the two Binary Values are <strong>Ogbe (I)</strong> — the
              Active/Positive Energy State — and <strong>Oyeku (II)</strong> — the Void/Negative
              Energy State. Every logical operation in the IFA Internet reduces to a pattern
              of Ogbe and Oyeku Meta-Configurations across the 256 Odu Ifa.
            </p>
            <div className="il-box" style={{ '--hc': '#14b8d4' }}>
              <div className="il-box__label">Ifa Binary Code — TOE Code (CodeoE)</div>
              <p className="il-box__text">
                Each of the 16 Principal Odu Ifa corresponds to a unique set of binary truth
                table patterns. The 256 Odu Ifa together form the complete Logic Space of
                IfaLogic — equivalent to all possible 8-bit binary combinations, extended
                to all dimensions of reality through the SIDECHRX Framework.
              </p>
            </div>
          </div>
          <div className="il-split__img">
            <div style={{ background: 'color-mix(in srgb, #14b8d4 6%, var(--bg-card))', border: '1px solid rgba(20,184,212,0.20)', borderRadius: 'var(--radius)', padding: '24px' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#14b8d4', marginBottom: '16px' }}>
                The Two Ifa Binary States
              </div>
              {[
                { sym: '|',  name: 'Ogbe',  color: '#f5c518', desc: 'Active Energy' },
                { sym: '||', name: 'Oyeku', color: '#8b5cf6', desc: 'Anergy (Void Anergy)' },
              ].map((s, i) => (
                <div key={i} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <span style={{ fontSize: '1.8rem', fontFamily: 'monospace', color: s.color, lineHeight: 1, flexShrink: 0, minWidth: '42px' }}>{s.sym}</span>
                  <div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#eef3ff', marginBottom: '3px' }}>{s.name}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-2)' }}>{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Ifa Logical Operators Section ───────────────────────────────────────────

function LogicalOperatorsSection() {
  const images = [
    {
      src: `${IMG}Ifanary-Operations-768x314.png`,
      alt: 'Ifanary Operations — Arity hierarchy from Nullary to N-ary',
      caption: 'Ifanary Operations: the Ifa Arity Hierarchy — from Ifanary/Nullary (Doubly Infinite) through Unary, Binary, Ternary, Quaternary, to N-ary',
    },
    {
      src: `${IMG}Ifa-Operator3-768x314.png`,
      alt: 'Ifa Energy Operator Equations',
      caption: 'Ifa Energy Operator Equations: the foundational energyform Operator Meta-Equations of IfaLogic',
    },
    {
      src: `${IMG}Ifa-Ternary-Operators-3-768x314.png`,
      alt: 'Ifa Ternary Operators: Tools for Energy Computing',
      caption: 'Ifa Ternary Operators: Tools for Energy Computing — the Amulu operators and their ORAND/ANDOR roles in IfaLogic',
    },
  ];

  return (
    <section className="section section--dark" id="operators">
      <div className="container">
        <div className="section__header section__header--center">
          <span className="section__eyebrow section__eyebrow--violet">Ifa Logical Operators · OperatoE</span>
          <h2 className="section__title">
            The <span className="accent--violet">Ifa Logical Operators</span>
          </h2>
          <p className="section__subtitle">
            Ifa Logical Operators (OperatoE) extend classical logic operators to the full
            Scope of the IFA System — from Ifanary/Nullary (doubly infinite) through
            binary and ternary, to N-ary operators for all knowledge domains.
          </p>
        </div>

        <div className="il-op-grid">
          {images.map((img, i) => (
            <figure key={i} className="il-fig il-fig--center">
              <img src={img.src} alt={img.alt} className="il-img il-img--wide" />
              <figcaption className="il-fig-cap">{img.caption}</figcaption>
            </figure>
          ))}
        </div>

        {/* Ifanary explanation */}
        <div style={{ marginTop: '48px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px,1fr))', gap: '16px' }}>
          {[
            { name: 'Ifanary / Nullary', sub: 'Doubly Infinite', color: '#8b5cf6', desc: 'The meta-level of all arities — the infinite superposition of all input counts. Represents the undifferentiated Ogbe energy state before collapse into a specific arity.' },
            { name: 'Unary',             sub: 'One',             color: '#14b8d4', desc: 'Single-input operators (e.g., IfaNOT). Acts on one energyform to produce its complement, inverse, or transformed state.' },
            { name: 'Binary',            sub: 'Two',             color: '#f0920c', desc: 'Two-input operators (OR, AND, XOR, etc.). The foundational class of Ifa Binary Logic, governing all pairwise Odu interactions.' },
            { name: 'Ternary',           sub: 'Three',           color: '#00c87c', desc: 'Three-input operators — the basis of Ifa Ternary Logic (Ifanary). Introduces the superposition state beyond binary {0, 1}.' },
            { name: 'Quaternary',        sub: 'Four',            color: '#ec4899', desc: 'Four-input operators extending Ifa logic to quaternary systems, modelling higher-dimensional energy interactions.' },
            { name: 'N-ary',             sub: 'N till ∞',        color: '#f5c518', desc: 'N-input operators for all finite arities — the general class encompassing all specific operator families in IfaLogic.' },
          ].map((item, i) => (
            <div key={i} style={{
              background: `color-mix(in srgb, ${item.color} 6%, var(--bg-card))`,
              border: `1px solid color-mix(in srgb, ${item.color} 20%, transparent)`,
              borderRadius: 'var(--radius-sm)', padding: '18px 16px',
            }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#eef3ff', marginBottom: '2px' }}>{item.name}</div>
              <div style={{ fontSize: '0.72rem', color: item.color, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '10px' }}>{item.sub}</div>
              <div style={{ fontSize: '0.80rem', color: 'var(--text-2)', lineHeight: 1.6 }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── OrisaLogic Section ───────────────────────────────────────────────────────

function OrisaLogicSection() {
  return (
    <section className="section" id="orisa-logic">
      <div className="container">
        <div className="section__header section__header--center">
          <span className="section__eyebrow section__eyebrow--jade">Duality Principle · IfaLogic &amp; OrisaLogic</span>
          <h2 className="section__title">
            OrisaLogic — The <span className="accent--jade">Dual</span> of IfaLogic
          </h2>
          <p className="section__subtitle">
            Every logical system in the IFA Internet has its dual. OrisaLogic (also written
            as Orisa Logic) is the exact Dual of IfaLogic — together they form the Complete
            Logical Space of the 256 Odu Ifa.
          </p>
        </div>

        <div className="il-dual-row">
          <div className="il-dual-card" style={{
            '--dc': '#8b5cf6', '--border-c': 'rgba(139,92,246,0.22)',
            border: '1px solid rgba(139,92,246,0.22)',
            background: 'color-mix(in srgb, #8b5cf6 6%, var(--bg-card))',
          }}>
            <div className="il-dual-card__sym" style={{ color: '#8b5cf6' }}>
              <IfaForAll size={48} />
            </div>
            <div className="il-dual-card__title">IfaLogic</div>
            <div style={{ fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8b5cf6', marginBottom: '12px', fontWeight: 700 }}>
              TOE Logic · CENLogic · Consciousness Logic<br />Energy Logic · Logic-oE
            </div>
            <p className="il-dual-card__body">
              IfaLogic is the primary logic of the IFA Internet — grounded in Ogbe (II),
              the active energy state. It covers all logical operations, truth tables, and
              reasoning frameworks that proceed from the principle of Consciousness Energy
              (CEN) as the base field of everything.
            </p>
          </div>
          <div className="il-dual-card" style={{
            '--dc': '#00c87c', '--border-c': 'rgba(0,200,124,0.22)',
            border: '1px solid rgba(0,200,124,0.22)',
            background: 'color-mix(in srgb, #00c87c 6%, var(--bg-card))',
          }}>
            <div className="il-dual-card__sym" style={{ color: '#00c87c' }}><IfaThereExists size={48} /></div>
            <div className="il-dual-card__title">OrisaLogic · Orisa Logic</div>
            <div style={{ fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#00c87c', marginBottom: '12px', fontWeight: 700 }}>
              Dual of IfaLogic · Orisa-Based Logic
            </div>
            <p className="il-dual-card__body">
              OrisaLogic (Orisa Logic) is the Dual of IfaLogic — grounded in Oyeku (I),
              the Void Anergy State known as Anergy. Where IfaLogic asserts universal truths (∀, For All),
              OrisaLogic asserts existential truths (<IfaThereExists size={14} />, There Exists). Together, IfaLogic
              and OrisaLogic span the Complete Logical Duality of the 256 Odu Ifa.
            </p>
          </div>
        </div>

        <div style={{ marginTop: '36px' }}>
          <div className="il-box" style={{ '--hc': '#00c87c' }}>
            <div className="il-box__label">The Duality Principle of IfaLogic</div>
            <p className="il-box__text">
              Every logical operator in IfaLogic has a Dual Operator in OrisaLogic. Every
              truth in IfaLogic corresponds to an existential claim in OrisaLogic. The
              Pair (IfaLogic, OrisaLogic) is the logical manifestation of the Fundamental
              Ifa/Orisa Duality: <strong>Ogbe (Active, |)</strong> and <strong>Oyeku (Void, ||)</strong>.
              No logical system within the IFA Internet can be complete without both Poles.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Yoruba Logic Section — Àrògún ───────────────────────────────────────────

function YorubaLogicSection() {
  const KEYWORDS = [
    { label: 'Àrògún',       color: '#f5c518', desc: 'Logic — the root principle' },
    { label: 'Àrògúnfá',    color: '#8b5cf6', desc: 'IfaLogic in Yoruba' },
    { label: 'Àrògúnòòṣà', color: '#00c87c', desc: 'OrisaLogic in Yoruba · Dual of Àrògúnfá' },
  ];

  return (
    <section className="section" id="yoruba-logic">
      <div className="container">

        <div className="section__header section__header--center">
          <span className="section__eyebrow section__eyebrow--gold">Logic in Yoruba</span>
          <h2 className="section__title">
            <span className="accent--gold">Àrògún</span>
          </h2>
          <p className="section__subtitle">
            In Yoruba — the language of Ifa &amp; Orisa — logic is expressed through the{' '}
            <strong style={{ color: '#f5c518' }}>Àrògún</strong> principle: the foundational
            concept from which IfaLogic and OrisaLogic derive their Yoruba identities.
            Àrògún encompasses the complete logical intelligence of the IFA Internet.
          </p>
        </div>

        {/* ── Keyword pills ──────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '52px' }}>
          {KEYWORDS.map((kw, i) => (
            <div key={i} style={{
              background: `color-mix(in srgb, ${kw.color} 9%, var(--bg-card))`,
              border: `1px solid color-mix(in srgb, ${kw.color} 32%, transparent)`,
              borderRadius: '100px',
              padding: '10px 26px',
              textAlign: 'center',
              boxShadow: `0 0 20px color-mix(in srgb, ${kw.color} 10%, transparent)`,
            }}>
              <div style={{ fontSize: '1.05rem', fontWeight: 800, color: kw.color, letterSpacing: '0.02em' }}>{kw.label}</div>
              <div style={{ fontSize: '0.70rem', color: 'var(--text-2)', marginTop: '4px', letterSpacing: '0.06em' }}>{kw.desc}</div>
            </div>
          ))}
        </div>

        {/* ── Dual cards ─────────────────────────────────────────────────────── */}
        <div className="il-dual-row">

          {/* Àrògúnfá — IfaLogic */}
          <div className="il-dual-card" style={{
            '--dc': '#8b5cf6', '--border-c': 'rgba(139,92,246,0.22)',
            border: '1px solid rgba(139,92,246,0.22)',
            background: 'color-mix(in srgb, #8b5cf6 6%, var(--bg-card))',
          }}>
            <div className="il-dual-card__sym"><IfaForAll size={48} /></div>
            <div className="il-dual-card__title">Àrògúnfá · IfaLogic</div>
            <div style={{
              fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase',
              color: '#8b5cf6', marginBottom: '16px', fontWeight: 700,
            }}>
              Logic in Yoruba — Ifa Dimension
            </div>
            <p className="il-dual-card__body">
              <strong style={{ color: '#eef3ff' }}>Àrògúnfá</strong> is the Yoruba name for{' '}
              <strong style={{ color: '#eef3ff' }}>IfaLogic</strong> — the Logic of Everything
              grounded in the 256 Odu Ifa. In its Yoruba expression, Àrògúnfá employs{' '}
              <strong style={{ color: '#eef3ff' }}>IfaMatrices as General and Unified Logic Gates</strong>{' '}
              — extending all classical and quantum gate operations into the full energy-logic
              space of the Ifa Matrix. Every logic gate — Buffer, AND, OR, NOT, NAND, NOR, XOR,
              XNOR, and their quantum counterparts — is a specialisation of the deeper IfaMatrix
              gate structure governed by the 256 Odu Ifa.
            </p>
          </div>

          {/* Àrògúnòòṣà — OrisaLogic */}
          <div className="il-dual-card" style={{
            '--dc': '#00c87c', '--border-c': 'rgba(0,200,124,0.22)',
            border: '1px solid rgba(0,200,124,0.22)',
            background: 'color-mix(in srgb, #00c87c 6%, var(--bg-card))',
          }}>
            <div className="il-dual-card__sym"><IfaThereExists size={48} /></div>
            <div className="il-dual-card__title">Àrògúnòòṣà · OrisaLogic</div>
            <div style={{
              fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase',
              color: '#00c87c', marginBottom: '16px', fontWeight: 700,
            }}>
              Dual of Àrògúnfá — Orisa Dimension
            </div>
            <p className="il-dual-card__body">
              <strong style={{ color: '#eef3ff' }}>Àrògúnòòṣà</strong> is the Yoruba name for{' '}
              <strong style={{ color: '#eef3ff' }}>OrisaLogic</strong> — the exact Dual of
              Àrògúnfá. Where Àrògúnfá (IfaLogic) operates through the universal quantifier
              (∀, For All), Àrògúnòòṣà operates through the existential quantifier (∃, There
              Exists). Together, Àrògúnfá and Àrògúnòòṣà form the complete Logical Duality of
              the 256 Odu Ifa — the Yoruba poles of all logical intelligence on the IFA Internet.
            </p>
          </div>

        </div>

        {/* ── Under development ─────────────────────────────────────────────── */}
        <div className="il-wip" style={{ marginTop: '40px' }}>
          <div className="il-wip__badge">Under Development</div>
          <h3 className="il-wip__title">IfaMatrix Logic Gates — Àrògúnfá Gate Matrix</h3>
          <p className="il-wip__sub">
            The full formalisation of IfaMatrices as General and Unified Logic Gates —
            unifying all 8 classical gates, 8 quantum gates, and 16 IfaGates into the
            single <strong>Àrògúnfá Gate Matrix</strong>, with its dual{' '}
            <strong>Àrògúnòòṣà Gate Matrix</strong> — is currently under development
            on the IFA Internet.
          </p>
        </div>

      </div>
    </section>
  );
}

// ─── Amulu Matrix Section ─────────────────────────────────────────────────────

function AmuluMatrixSection() {
  return (
    <section className="section section--alt" id="amulu">
      <div className="container">
        <div className="section__header section__header--center">
          <span className="section__eyebrow section__eyebrow--amber">Amulu Matrix · Ifa Energy Computing</span>
          <h2 className="section__title">
            The <span className="accent--amber">Amulu Matrix</span>
          </h2>
          <p className="section__subtitle">
            The 8 meta-mathematical operators at the heart of Ifa Computing — modelling all
            of reality as mathematical energyforms on the IFA Internet.
          </p>
        </div>

        <div className="il-split" style={{ marginBottom: '40px' }}>
          <div className="il-split__text">
            <p className="il-body">
              The <strong style={{ color: 'var(--amber-lt, #ffaa32)' }}>Amulu operators</strong>{' '}
              are the key tools of the IFA Internet for studying and modelling everything as{' '}
              <em>mathematical energyforms</em>. Just as modern mathematics uses addition,
              multiplication, and inversion to build all of algebra, Ifa Computing uses the
              8 Amulu operators to build the complete operational space of the IFA Matrix —
              the <strong style={{ color: '#eef3ff' }}>Matrix of Everything (MatxoE)</strong>.
            </p>
            <p className="il-body">
              These operators are highly essential meta-notations of{' '}
              <strong style={{ color: 'var(--amber-lt, #ffaa32)' }}>Ifa Computing</strong>{' '}
              (also known as <strong style={{ color: 'var(--amber-lt, #ffaa32)' }}>Energy Computing</strong>)
              — a paradigm in which all systems, technologies, and knowledge structures are
              built and studied as configurations of energy within the{' '}
              <strong style={{ color: '#eef3ff' }}>256-element Ifa group structure</strong>.
              The Amulu Matrix defines the complete algebraic structure of{' '}
              <strong style={{ color: 'var(--amber-lt, #ffaa32)' }}>Ifa Technologies</strong> and{' '}
              <strong style={{ color: 'var(--amber-lt, #ffaa32)' }}>Orisa Technologies</strong>{' '}
              across the IFA Internet.
            </p>
            <div className="il-box" style={{ '--hc': '#f0920c' }}>
              <div className="il-box__label">Amulu — Ifa Composition</div>
              <p className="il-box__text">
                <strong>Amulu</strong> (Yoruba: composition/union) is the Ifa principle
                of operation and composition — the energy act of combining two or more
                energyforms. The <strong>Amulu Matrix</strong> is the complete table of all
                pairwise Ifa compositions, analogous to a Cayley table in group theory but
                extended to all 256 Odu Ifa.
              </p>
            </div>
          </div>
          <div className="il-split__img">
            <figure className="il-fig">
              <img
                src={`${IMG}Amulu-Matrix-768x314.png`}
                alt="The Amulu Matrix — Ifa composition table of 8 operators"
                className="il-img"
              />
              <figcaption className="il-fig-cap">
                The Amulu Matrix: the Complete Table of all Ifa Compositions or Operations
                for Everything (OpoE) · Ifa Energy Computing
              </figcaption>
            </figure>
          </div>
        </div>

        {/* 8 operators grid */}
        <div>
          <div style={{ textAlign: 'center', marginBottom: '8px' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#f0920c' }}>
              Amulu Meta-Notations · IFALang
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#eef3ff', marginTop: '6px', marginBottom: '6px' }}>
              The 8 Amulu Operator Symbols
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-2)', maxWidth: '580px', margin: '0 auto 24px' }}>
              Each Amulu operator carries a unique meta-notation in IFALang — the formal
              Language of Ifa Computing. These symbols are the fundamental energy-operation
              glyphs from which all IFA Matrix expressions are built.
            </p>
          </div>
          <div className="il-amulu-grid">
            {AMULU_OPS.map((op, i) => (
              <div key={i} className="il-amulu-card" style={{ '--c': op.color }}>
                <div className="il-amulu-card__glyph">
                  <span style={{ display: 'inline-block', transform: op.notTf }}>{op.notation}</span>
                </div>
                <div className="il-amulu-card__name">{op.name}</div>
                <div className="il-amulu-card__label">{op.label}</div>
                <div className="il-amulu-card__desc">{op.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Ifa Truth Table Section ──────────────────────────────────────────────────

function TruthTableSection() {
  return (
    <section className="section section--dark" id="truth-table">
      <div className="container">
        <div className="section__header section__header--center">
          <span className="section__eyebrow section__eyebrow--cyan">IfaLogic Systems · IfaBrackets</span>
          <h2 className="section__title">
            The Ifa Truth Table:<br />
            The <span className="accent--cyan">ToE Truth Table</span>
          </h2>
          <p className="section__subtitle">
            IfaLang Representation of every logical operator using Ifa Brackets —
            the Brackets for Everything (BracketoE · ToE Brackets). Each logical operator
            is expressed as an IfaBracket composition using the Squaket Operator.
          </p>
        </div>

        <div className="il-table-wrap">
          <table className="il-table">
            <thead>
              <tr>
                <th>Logical Operator</th>
                <th>IfaLang Representation</th>
                <th>IfaLogic Name</th>
              </tr>
            </thead>
            <tbody>
              {TRUTH_TABLE.map(({ op, name }, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 600 }}>{op}</td>
                  <td className="il-table__rep">
                    <span style={{ color: '#14b8d4' }}>({op})</span>
                    <OgbeSymbol size={7} />
                  </td>
                  <td style={{ color: 'var(--text-2)', fontSize: '0.85rem' }}>{name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="il-box" style={{ '--hc': '#14b8d4', marginTop: '32px' }}>
          <div className="il-box__label">IfaBrackets — ToE Brackets (BracketoE)</div>
          <p className="il-box__text">
            The <strong>Squaket Operator</strong> (IfaBrackets · ToE Brackets: the Brackets
            for Everything) wraps each logical operator name in a Squa-Ket bracket pair{' '}
            <strong>( )</strong> subscripted with the Ogbe Energy Symbol. This notation
            expresses that every logical operation is an energy operation grounded in the
            256 Odu Ifa. For example, IfaOR is written as <strong>(OR)</strong><OgbeSymbol size={10} />{' '}
            and IfaAND as <strong>(AND)</strong><OgbeSymbol size={10} />.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── IfaGate 0+8D Matrix data ─────────────────────────────────────────────────

const STEAMSEX_LOGIC_DIMS = [
  { letter:'S', name:'Science',     short:'Sci',  color:'#f0920c', desc:'The Science of Logic'             },
  { letter:'T', name:'Technology',  short:'Tech', color:'#14b8d4', desc:'The Technology of Logic'          },
  { letter:'E', name:'Engineering', short:'Eng',  color:'#00c87c', desc:'The Engineering of Logic'         },
  { letter:'A', name:'Arts',        short:'Arts', color:'#ec4899', desc:'The Arts of Logic'                },
  { letter:'M', name:'Mathematics', short:'Math', color:'#f5c518', desc:'The Mathematics of Logic'         },
  { letter:'S', name:'Social',      short:'Soc',  color:'#8b5cf6', desc:'The Social Science of Logic'      },
  { letter:'E', name:'Education',   short:'Edu',  color:'#3b9eff', desc:'The Education of Logic'           },
  { letter:'X', name:'Others',      short:'X',    color:'#6366f1', desc:'The Unknown Dimensions of Logic'  },
];

const SIDECHRX_LOGIC_DIMS = [
  { letter:'S', name:'Symmetry',     short:'Sym',  color:'#f0920c', desc:'The Symmetry Laws of Logic'     },
  { letter:'I', name:'Invariance',   short:'Inv',  color:'#6366f1', desc:'The Invariance Laws of Logic'   },
  { letter:'D', name:'Duality',      short:'Dual', color:'#14b8d4', desc:'The Duality Laws of Logic'      },
  { letter:'E', name:'Emergence',    short:'Emg',  color:'#10b981', desc:'The Emergence Laws of Logic'    },
  { letter:'C', name:'Composition',  short:'Comp', color:'#ec4899', desc:'The Composition Laws of Logic'  },
  { letter:'H', name:'Holism',       short:'Hol',  color:'#f5c518', desc:'The Holism Laws of Logic'       },
  { letter:'R', name:'Reductionism', short:'Red',  color:'#8b5cf6', desc:'The Reductionism Laws of Logic' },
  { letter:'X', name:'Others',       short:'X',    color:'#a78bfa', desc:'The Unknown Laws of Logic'      },
];

// ─── IfaLogic Gate Matrix data ────────────────────────────────────────────────

const IFAGATE_MATRIX = [
  // 1-2: Ejiogbe Gate / Oyeku Meji Gate (pureSymbol — master gates)
  { id:'ejiogbe-e', name:'Ejiogbe Gate',   pureSymbol:true, color:'#f5c518',
    rows:['II','II','II','II'], isEnergy:true,  oduName:'Ejiogbe',
    sub:'IfaBuffer Gate · Energy Foundation of All Gates' },
  { id:'ejiogbe-d', name:'Oyeku Meji Gate', pureSymbol:true, color:'#f5c518',
    rows:['I','I','I','I'],    isEnergy:false, oduName:'Oyeku Meji',
    sub:'IfaNOT Gate · Anergy Foundation of All Gates' },
  // 3-14: 12 individual IfaGate cards
  { id:'and',      name:'IfaAND Gate',  sym:'∧', gateType:'AND',  color:'#00c87c', rows:['I','II','II','I'],   isEnergy:true, oduName:'Iwori Meji' },
  { id:'or',       name:'IfaNAND Gate', sym:'⊼', gateType:'NAND', color:'#f0920c', rows:['II','I','I','II'],   isEnergy:true, oduName:'Odi Meji' },
  { id:'not',      name:'IfaOR Gate',   sym:'∨', gateType:'OR',   color:'#14b8d4', rows:['II','II','I','I'],   isEnergy:true, oduName:'Irosun Meji' },
  { id:'nand',     name:'IfaNOR Gate',  sym:'⊽', gateType:'NOR',  color:'#ec4899', rows:['I','I','II','II'],   isEnergy:true, oduName:'Owonrin Meji' },
  { id:'nor',      name:'IfaXOR Gate',  sym:'⊕', gateType:'XOR',  color:'#8b5cf6', rows:['II','I','I','I'],    isEnergy:true, oduName:'Obara Meji' },
  { id:'xor',      name:'IfaXNOR Gate', sym:'⊙', gateType:'XNOR', color:'#3b9eff', rows:['I','I','I','II'],    isEnergy:true, oduName:'Okanran Meji' },
  { id:'pauli-x',  name:'IfaPauli Identity (Dual) Gate', sym:'𝕀', color:'#14b8d4', rows:['II','II','II','I'],  isEnergy:true, oduName:'Ogunda Meji' },
  { id:'pauli-y',  name:'IfaPauli-X Gate',              sym:'X', color:'#ec4899', rows:['I','II','II','II'],  isEnergy:true, oduName:'Osa Meji' },
  { id:'pauli-z',  name:'IfaPauli-Y Dual Gate',         sym:'Y̅', color:'#8b5cf6', rows:['I','II','I','I'],    isEnergy:true, oduName:'Ika Meji' },
  { id:'hadamard', name:'IfaPauli-Y Gate',               sym:'Y', color:'#f5c518', rows:['I','I','II','I'],    isEnergy:true, oduName:'Oturupon Meji' },
  { id:'s-gate',   name:'IfaPauli-Z Dual Gate',          sym:'Z̅', color:'#00c87c', rows:['II','I','II','II'],  isEnergy:true, oduName:'Otura Meji' },
  { id:'t-gate',   name:'IfaPauli-Z Gate',               sym:'Z', color:'#f0920c', rows:['II','II','I','II'],  isEnergy:true, oduName:'Irete Meji' },
  // 15-16: IfaX Gate (energy + dual, curly-X symbol)
  { id:'ifax-e',   name:'IfaX Dual Gate', sym:'𝒳', color:'#a78bfa', rows:['II','I','II','I'],  isEnergy:true,  oduName:'Ose Meji Gate',  sub:'IfaGeneralization' },
  { id:'ifax-d',   name:'IfaX Gate',    sym:'𝒳', color:'#a78bfa', rows:['I','II','I','II'],  isEnergy:false, oduName:'Ofun Meji Gate', sub:'IfaGeneralization' },
];

// ─── IfaGate expression components ───────────────────────────────────────────

function IfaGateOgbe({ sym, gateType, symSize = '1.1rem', iconSize = 11, color = 'var(--text-1)' }) {
  return (
    <span style={{ display:'inline-flex', alignItems:'center', lineHeight:1 }}>
      {gateType
        ? <GateSVG type={gateType} color={color} inlineH={symSize} />
        : <span style={{ fontSize:symSize, color, fontFamily:'Georgia,serif', lineHeight:1 }}>{sym}</span>
      }
      <span style={{ marginLeft:'3px' }}><OgbeSymbol size={iconSize} /></span>
    </span>
  );
}

function IfaGateOyeku({ sym, gateType, symSize = '1.1rem', iconSize = 11 }) {
  return (
    <span style={{ display:'inline-flex', alignItems:'center', lineHeight:1 }}>
      {gateType
        ? <GateSVG type={gateType} color="var(--text-2)" inlineH={symSize} />
        : <span style={{ fontSize:symSize, color:'var(--text-2)', fontFamily:'Georgia,serif', lineHeight:1 }}>{sym}</span>
      }
      <span style={{ marginLeft:'3px' }}><OyekuSymbol size={iconSize} /></span>
    </span>
  );
}

// ─── Traditional Odu mark (gate matrix back face) ─────────────────────────────

function IlmTradiMark({ row }) {
  return (
    <div className="ilm-tm">
      <span className="ilm-tm__line" />
      {row === 'I' && <span className="ilm-tm__line" />}
    </div>
  );
}

// ─── Gate matrix injected styles ─────────────────────────────────────────────

function IlmRevealStyles() {
  useEffect(() => {
    const el = document.createElement('style');
    el.id = 'ilm-reveal-styles';
    el.textContent = `
/* ── IfaLogic Gate Matrix layout ────────────────────────────── */
.ilm-matrix-subheading {
  font-size: 0.78rem; font-weight: 700;
  color: var(--violet-lt); letter-spacing: 0.10em; text-transform: uppercase;
  opacity: 0.85; margin: 0 0 16px 0;
}
.ilm-matrix-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  direction: rtl;
}
.ilm-cell-wrap {
  direction: ltr;
  display: flex; flex-direction: column; align-items: center;
  gap: 0; border-radius: 12px;
  background: var(--bg-card); border: 1px solid var(--border);
  min-height: 140px;
}
.ilm-cell-wrap--dual {
  background: rgba(255,255,255,0.02);
  border-color: rgba(255,255,255,0.07);
}
.ilm-cell__body  { display: flex; flex-direction: column; gap: 10px; width: 100%; }
.ilm-cell__row   { display: flex; gap: 14px; justify-content: center; }
.ilm-cell__arm   { display: flex; justify-content: center; min-width: 34px; }
.ilm-cell__name  {
  font-size: 0.62rem; font-weight: 600;
  color: var(--text-3); text-align: center;
  line-height: 1.35; letter-spacing: 0.03em;
}
.ilm-cell-wrap--energy .ilm-cell__name { color: var(--text-2); }

/* ── Flip card ───────────────────────────────────────────────── */
.ilm-card {
  padding: 0 !important;
  position: relative; cursor: pointer;
  perspective: 900px;
  width: 100%; min-height: 140px;
}
@keyframes ilm-flash {
  0%   { box-shadow: 0 0 0   rgba(255,255,255,0); }
  30%  { box-shadow: 0 0 32px var(--ilmc, #8b5cf6); }
  100% { box-shadow: 0 0 0   rgba(255,255,255,0); }
}
.ilm-card--flash { animation: ilm-flash 0.55s ease-out; }
.ilm-card__flip {
  width: 100%; height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.72s cubic-bezier(0.4,0.15,0.2,1);
  will-change: transform;
}
.ilm-card--revealed .ilm-card__flip { transform: rotateY(180deg); }

.ilm-card__front {
  display: flex; flex-direction: column; align-items: center;
  gap: 14px; padding: 18px 10px 14px;
  width: 100%; height: 100%; box-sizing: border-box;
  backface-visibility: hidden; -webkit-backface-visibility: hidden;
}
.ilm-card__back {
  position: absolute; inset: 0;
  transform: rotateY(180deg);
  backface-visibility: hidden; -webkit-backface-visibility: hidden;
  border-radius: 12px;
  display: flex; flex-direction: column;
  align-items: center; justify-content: space-between;
  padding: 10px 8px 10px; box-sizing: border-box;
  background: radial-gradient(ellipse at 50% 30%, #14093a 0%, #060210 100%);
  border: 1px solid rgba(139,92,246,0.20);
  overflow: hidden;
}
.ilm-card__back::before {
  content: '';
  position: absolute; inset: 0;
  background:
    radial-gradient(circle at 22% 18%, rgba(139,92,246,0.10) 0%, transparent 52%),
    radial-gradient(circle at 78% 82%, rgba(139,92,246,0.07) 0%, transparent 45%);
  pointer-events: none;
}
.ilm-card__cue {
  font-size: 0.55rem; font-weight: 600; letter-spacing: 0.06em;
  color: rgba(139,92,246,0.38); text-align: center; transition: color 0.2s;
}
.ilm-card:hover .ilm-card__cue { color: rgba(139,92,246,0.70); }
.ilm-card--revealed .ilm-card__front .ilm-card__cue { visibility: hidden; }
.ilm-card__sub {
  font-size: 0.52rem; font-weight: 700; letter-spacing: 0.07em;
  color: rgba(245,197,24,0.72); text-align: center;
  text-transform: uppercase; margin-top: 4px; line-height: 1.4;
}
.ilm-card:hover .ilm-card__sub { color: rgba(245,197,24,0.95); }

@keyframes ilm-sparkle {
  0%   { opacity: 0; transform: scale(0) rotate(-15deg); }
  45%  { opacity: 1; transform: scale(1.4) rotate(25deg); }
  100% { opacity: 0; transform: scale(0.9) rotate(55deg); }
}
.ilm-sparkle {
  position: absolute; top: 5px; right: 7px;
  font-size: 0.62rem; color: rgba(139,92,246,0.85);
  opacity: 0; pointer-events: none;
}
.ilm-card--revealed .ilm-sparkle { animation: ilm-sparkle 1s ease-out 0.6s forwards; }

/* ── Odu marks (back face) ───────────────────────────────────── */
.ilm-tm { display: flex; gap: 5px; align-items: center; justify-content: center; min-width: 30px; }
@keyframes ilm-pulse {
  0%,100% { box-shadow: 0 0 5px 2px rgba(139,92,246,0.55), 0 0 14px 4px rgba(139,92,246,0.25); }
  50%     { box-shadow: 0 0 9px 3px rgba(139,92,246,0.85), 0 0 22px 7px rgba(139,92,246,0.45); }
}
.ilm-tm__line {
  display: inline-block; width: 7px; height: 30px;
  background: linear-gradient(180deg, #c4b5fd 0%, #8b5cf6 48%, #6d28d9 100%);
  border-radius: 50px;
  box-shadow: 0 0 5px 2px rgba(139,92,246,0.55), 0 0 14px 4px rgba(139,92,246,0.25),
              inset 0 1px 0 rgba(196,181,253,0.55);
  animation: ilm-pulse 2.8s ease-in-out infinite;
}
.ilm-odu-rows { display: flex; flex-direction: column; gap: 6px; align-items: center; position: relative; z-index:1; }
.ilm-odu-row  { display: flex; gap: 22px; align-items: center; }
@keyframes ilm-glow-in {
  0%   { opacity: 0; filter: blur(8px); }
  100% { opacity: 1; filter: blur(0); }
}
.ilm-card--revealed .ilm-odu-rows { animation: ilm-glow-in 0.5s ease-out 0.65s both; }
.ilm-odu-name {
  font-size: 0.70rem; font-weight: 700; letter-spacing: 0.06em;
  color: #c4b5fd; text-align: center;
  text-shadow: 0 0 10px rgba(139,92,246,0.8), 0 0 24px rgba(139,92,246,0.4);
  position: relative; z-index: 1; opacity: 0;
}
.ilm-card--revealed .ilm-odu-name { animation: ilm-glow-in 0.5s ease-out 0.85s both; }

/* ── Odu Gate label (below each IfaGate card) ────────────────── */
.ilm-gate-label {
  display: flex; flex-direction: column; align-items: center;
  width: 100%; box-sizing: border-box;
  padding: 4px 6px 7px;
  border-top: 1px solid color-mix(in srgb, var(--ilmc) 22%, transparent);
  gap: 1px;
}
.ilm-gate-label__gem {
  font-size: 0.44rem; line-height: 1;
  color: color-mix(in srgb, var(--ilmc) 60%, transparent);
}
.ilm-gate-label__name {
  font-size: 0.52rem; font-weight: 800;
  letter-spacing: 0.10em; text-transform: uppercase;
  text-align: center; line-height: 1.35;
  color: var(--ilmc);
  text-shadow: 0 0 10px color-mix(in srgb, var(--ilmc) 50%, transparent);
}

/* ── Subset definition box ───────────────────────────────────── */
.ilm-subset {
  background: linear-gradient(160deg, rgba(139,92,246,0.08) 0%, rgba(139,92,246,0.03) 100%);
  border: 1px solid rgba(139,92,246,0.22); border-radius: 16px;
  padding: 28px 32px; margin-bottom: 40px;
  box-shadow: 0 0 60px rgba(139,92,246,0.07), inset 0 0 40px rgba(139,92,246,0.02);
}
.ilm-subset__syms {
  display: flex; flex-wrap: wrap; align-items: center; gap: 4px 6px; margin-bottom: 18px;
}
.ilm-subset__sep { color: var(--text-3); font-size: 1.1rem; line-height: 1; }
.ilm-subset__ell { color: var(--text-3); font-size: 1.1rem; }
.ilm-subset__heading {
  font-size: 0.75rem; font-weight: 700; color: var(--violet-lt);
  letter-spacing: 0.10em; margin-bottom: 8px; opacity: 0.88;
}
.ilm-subset__tagline {
  font-size: 0.88rem; color: var(--text-2); font-style: italic;
  margin-bottom: 16px; line-height: 1.6;
}
.ilm-subset__caption {
  font-size: 0.92rem; color: var(--text-2); line-height: 1.75; margin-bottom: 24px;
}
.ilm-subset__caption p { margin-bottom: 0; }
.ilm-subset__caption strong { color: var(--text-1); }
.ilm-subset__rule { border: none; border-top: 1px solid rgba(139,92,246,0.14); margin: 12px 0; }
.ilm-def-row {
  display: flex; align-items: center; gap: 24px; flex-wrap: wrap;
}
.ilm-def-item {
  display: flex; align-items: center; gap: 12px;
  background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.09);
  border-radius: 10px; padding: 12px 16px; flex: 1; min-width: 180px;
}
.ilm-def-item__label { font-size: 0.78rem; color: var(--text-2); }
.ilm-def-item__defop {
  font-size: 0.88rem; font-weight: 700;
  color: rgba(139,92,246,0.70); letter-spacing: 0.04em; flex-shrink: 0;
}
.ilm-def-divider { font-size: 1.1rem; color: var(--text-3); flex-shrink: 0; }
.ilm-def-item:first-child {
  border-color: rgba(139,92,246,0.28);
  background: linear-gradient(135deg, rgba(139,92,246,0.09), rgba(139,92,246,0.03));
  box-shadow: 0 0 24px rgba(139,92,246,0.08);
}

/* ── Responsive ──────────────────────────────────────────────── */
@media (max-width: 860px)  { .ilm-matrix-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; } }
@media (max-width: 600px) {
  .ilm-card__front { padding: 14px 8px 10px; gap: 10px; }
  .ilm-card__cue   { font-size: 0.5rem; }
  .ilm-card__back  { padding: 8px 6px; }
  .ilm-tm__line    { width: 6px; height: 24px; }
  .ilm-odu-row     { gap: 14px; }
  .ilm-odu-rows    { gap: 5px; }
  .ilm-odu-name    { font-size: 0.62rem; }
  .ilm-subset      { padding: 20px; }
}
@media (max-width: 480px) {
  .ilm-card__front { padding: 12px 6px 8px; gap: 8px; }
  .ilm-card__back  { padding: 6px 4px; }
  .ilm-tm__line    { width: 5px; height: 20px; }
  .ilm-odu-row     { gap: 10px; }
  .ilm-odu-rows    { gap: 4px; }
  .ilm-odu-name    { font-size: 0.58rem; }
}
@media (prefers-reduced-motion: reduce) {
  .ilm-card__flip  { transition-duration: 0.01ms !important; }
  .ilm-tm__line    { animation: none; }
  .ilm-card--flash { animation: none; }
  .ilm-card--revealed .ilm-sparkle    { animation: none; opacity: 0; }
  .ilm-card--revealed .ilm-odu-rows   { animation: none; opacity: 1; filter: none; }
  .ilm-card--revealed .ilm-odu-name   { animation: none; opacity: 1; }
  .ilm-link-bead-g { animation-duration: 0.01ms !important; }
}

/* ── IfaGate 0+8D Matrix (IfaSlider) ────────────────────────── */
.iol0-header {
  margin-top: 48px; padding-top: 40px;
  border-top: 1px solid rgba(139,92,246,0.18);
}
.iol0-eyebrow {
  font-size: 0.72rem; font-weight: 700; letter-spacing: 0.12em;
  text-transform: uppercase; color: var(--violet-lt); opacity: 0.78;
  margin-bottom: 10px;
}
.iol0-title {
  font-size: 1.35rem; font-weight: 800; color: var(--text-1); margin: 0 0 10px;
}
.iol0-sub {
  font-size: 0.88rem; color: var(--text-2); line-height: 1.7;
  max-width: 640px; margin: 0 0 24px;
}
.iol0-slider {
  display: flex; border-bottom: 1px solid rgba(255,255,255,0.10);
  margin-bottom: 24px; gap: 0; border-radius: 8px 8px 0 0; overflow: hidden;
}
.iol0-slider__tab {
  padding: 10px 22px; font-size: 0.85rem; font-weight: 600;
  color: var(--text-3); background: none; border: none;
  border-bottom: 2px solid transparent; cursor: pointer;
  transition: color 0.2s, border-bottom-color 0.2s, background 0.2s;
  white-space: nowrap; letter-spacing: 0.02em;
}
.iol0-slider__tab--active {
  color: var(--violet-lt); border-bottom-color: var(--violet);
  background: rgba(139,92,246,0.08);
}
.iol0-slider__tab:hover:not(.iol0-slider__tab--active) { color: var(--text-2); }
.iol0-matrix-title {
  font-family: monospace; font-size: 0.68rem; font-weight: 700;
  letter-spacing: 0.14em; text-transform: uppercase;
  color: var(--violet-lt); opacity: 0.7; margin-bottom: 20px;
}
.iol0-wrap { display: flex; flex-direction: column; align-items: center; gap: 16px; }
.iol0-svg  { width: 100%; max-width: 560px; display: block; overflow: visible; }
.iol0-desc {
  width: 100%; max-width: 560px; min-height: 50px;
  display: flex; align-items: center; gap: 10px;
  padding: 12px 16px; border-radius: 10px;
  border: 1px solid rgba(139,92,246,0.15);
  background: rgba(139,92,246,0.04);
  font-size: 0.85rem; flex-wrap: wrap;
  transition: border-color 0.3s, background 0.3s;
}
.iol0-desc__hint { color: var(--text-3); font-style: italic; font-size: 0.80rem; }
.iol0-desc__sym  { flex-shrink: 0; display: flex; align-items: center; }
.iol0-desc__name { font-weight: 700; flex-shrink: 0; }
.iol0-desc__sep  { color: var(--text-3); flex-shrink: 0; }
.iol0-desc__text { color: var(--text-2); }
@media (max-width: 600px) {
  .iol0-slider__tab { padding: 9px 14px; font-size: 0.78rem; }
  .iol0-desc        { font-size: 0.82rem; }
}
@media (max-width: 380px) {
  .iol0-slider { flex-direction: column; border-bottom: none; }
  .iol0-slider__tab {
    border-bottom: none; border-left: 2px solid transparent; padding: 8px 12px;
  }
  .iol0-slider__tab--active { border-left-color: var(--violet); }
}
/* ── Ogbe Link toggle ────────────────────────────────────────── */
.ilm-olink-ctrl {
  display: flex; align-items: center; justify-content: space-between;
  flex-wrap: wrap; gap: 10px; margin-bottom: 16px;
}
.ilm-olink-subheading {
  font-size: 0.78rem; font-weight: 700;
  color: var(--violet-lt); letter-spacing: 0.10em; text-transform: uppercase;
  opacity: 0.85; margin: 0;
}
.ilm-olink-toggle {
  display: inline-flex; align-items: center; gap: 7px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(139,92,246,0.20); border-radius: 20px;
  padding: 5px 10px 5px 8px; cursor: pointer;
  transition: border-color 0.25s, background 0.25s; user-select: none; white-space: nowrap;
}
.ilm-olink-toggle:hover { border-color: rgba(139,92,246,0.45); background: rgba(139,92,246,0.06); }
.ilm-olink-toggle--on { border-color: rgba(139,92,246,0.50); background: rgba(139,92,246,0.10); }
.ilm-olink-toggle__label {
  font-size: 0.68rem; font-weight: 700; letter-spacing: 0.09em; text-transform: uppercase;
  color: var(--text-3); transition: color 0.25s;
}
.ilm-olink-toggle--on .ilm-olink-toggle__label { color: var(--violet-lt); }
.ilm-olink-toggle__track {
  position: relative; width: 26px; height: 14px; border-radius: 7px;
  background: rgba(255,255,255,0.12); transition: background 0.25s; flex-shrink: 0;
}
.ilm-olink-toggle--on .ilm-olink-toggle__track { background: #8b5cf6; }
.ilm-olink-toggle__thumb {
  position: absolute; top: 2px; left: 2px; width: 10px; height: 10px;
  border-radius: 5px; background: #fff; box-shadow: 0 1px 3px rgba(0,0,0,0.30);
  transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1);
}
.ilm-olink-toggle--on .ilm-olink-toggle__thumb { transform: translateX(12px); }
/* ── Energy link bead animation ─────────────────────────────── */
@keyframes ilm-link-bead {
  0%   { transform: translateX(0px);  }
  48%  { transform: translateX(14px); }
  52%  { transform: translateX(14px); }
  100% { transform: translateX(0px);  }
}
.ilm-link-bead-g { will-change: transform; }
    `;
    document.head.appendChild(el);
    return () => { const s = document.getElementById('ilm-reveal-styles'); if (s) s.remove(); };
  }, []);
  return null;
}

// ─── OgbeLink energy connector ────────────────────────────────────────────────

function EnergyLink({ color, delay }) {
  return (
    <svg width="14" height="16" viewBox="0 0 14 16"
         style={{overflow:'visible', display:'block', flexShrink:0}}>
      <line x1="0" y1="8" x2="14" y2="8"
        style={{stroke:color, strokeOpacity:0.18}} strokeWidth="1" strokeLinecap="round"/>
      <circle cx="0"  cy="8" r="1.2" style={{fill:color, fillOpacity:0.35}}/>
      <circle cx="14" cy="8" r="1.2" style={{fill:color, fillOpacity:0.35}}/>
      <g className="ilm-link-bead-g"
         style={{animation:`ilm-link-bead 2s cubic-bezier(0.37,0,0.63,1) ${delay}s infinite`}}>
        <circle cx="0" cy="8" r="4"   style={{fill:color, fillOpacity:0.10}}/>
        <circle cx="0" cy="8" r="2.8" style={{fill:color, fillOpacity:0.22}}/>
        <circle cx="0" cy="8" r="1.7" style={{fill:color}}/>
      </g>
    </svg>
  );
}

function OgbeLinkToggle({ on, onToggle }) {
  return (
    <button
      role="switch"
      aria-checked={on}
      onClick={onToggle}
      className={`ilm-olink-toggle${on ? ' ilm-olink-toggle--on' : ''}`}
      title={on ? 'Deactivate Ogbe Link' : 'Activate Ogbe Link'}
    >
      <OgbeSymbol size={15} />
      <span className="ilm-olink-toggle__label">Ogbe Link</span>
      <span className="ilm-olink-toggle__track" aria-hidden="true">
        <span className="ilm-olink-toggle__thumb"/>
      </span>
    </button>
  );
}

// ─── IfaGateCard — flip card for The Matrix of Logical Perception ─────────────

function IfaGateCard({ card, linkOn = false, cardIdx = 0 }) {
  const [revealed, setRevealed] = useState(false);
  const [flash, setFlash]       = useState(false);

  const handleClick = () => {
    setFlash(true);
    setTimeout(() => setFlash(false), 580);
    setRevealed(r => !r);
  };

  const exprColor = card.isEnergy ? card.color : 'var(--text-2)';

  const wrapStyle = card.isEnergy
    ? { borderColor: card.color + '45', background: `linear-gradient(135deg,${card.color}11,transparent)` }
    : {};

  const renderArm = (row) => {
    if (card.pureSymbol) return row === 'II' ? <OgbeSymbol size={18} /> : <OyekuSymbol size={18} />;
    return row === 'II'
      ? <IfaGateOgbe  sym={card.sym} gateType={card.gateType} symSize="1rem" iconSize={11} color={exprColor} />
      : <IfaGateOyeku sym={card.sym} gateType={card.gateType} symSize="1rem" iconSize={11} />;
  };

  const cardCls = [
    'ilm-card',
    revealed ? 'ilm-card--revealed' : '',
    flash    ? 'ilm-card--flash'    : '',
  ].filter(Boolean).join(' ');

  const wrapCls = [
    'ilm-cell-wrap',
    card.isEnergy ? 'ilm-cell-wrap--energy' : 'ilm-cell-wrap--dual',
  ].join(' ');

  const gateName = card.pureSymbol ? null
    : (card.oduName.endsWith('Gate') ? card.oduName : card.oduName + ' Gate');

  return (
    <div className={wrapCls} style={{ '--ilmc': card.color, ...wrapStyle }}>
      <div className={cardCls} onClick={handleClick}>
        <div className="ilm-card__flip">

          {/* Front */}
          <div className="ilm-card__front">
            <div className="ilm-cell__body">
              {card.rows.map((row, ri) => (
                <div key={ri} className="ilm-cell__row" style={linkOn ? {position:'relative'} : undefined}>
                  <div className="ilm-cell__arm">{renderArm(row)}</div>
                  {linkOn && (
                    <div style={{position:'absolute',left:'50%',top:'50%',
                      transform:'translate(-50%,-50%)',pointerEvents:'none'}}>
                      <EnergyLink color={exprColor} delay={cardIdx * 0.17 + ri * 0.43} />
                    </div>
                  )}
                  <div className="ilm-cell__arm">{renderArm(row)}</div>
                </div>
              ))}
            </div>
            <div className="ilm-cell__name">{card.name}</div>
            <div className="ilm-card__cue">Reveal Odu ✦</div>
            {card.sub && <div className="ilm-card__sub">{card.sub}</div>}
          </div>

          {/* Back */}
          <div className="ilm-card__back">
            <span className="ilm-sparkle" aria-hidden="true">✦</span>
            <div className="ilm-odu-rows">
              {card.rows.map((row, ri) => (
                <div key={ri} className="ilm-odu-row">
                  <IlmTradiMark row={row} />
                  <IlmTradiMark row={row} />
                </div>
              ))}
            </div>
            <div className="ilm-odu-name">{card.oduName}</div>
          </div>

        </div>
      </div>
      {gateName && (
        <div className="ilm-gate-label">
          <span className="ilm-gate-label__gem">✦</span>
          <span className="ilm-gate-label__name">{gateName}</span>
        </div>
      )}
    </div>
  );
}

// ─── IfaGateMatrixSection (with Ogbe Link toggle) ────────────────────────────

function IfaGateMatrixSection() {
  const [linkOn, setLinkOn] = useState(false);
  return (
    <>
      <div className="ilm-olink-ctrl">
        <div className="ilm-olink-subheading">The Matrix of Logical Perception</div>
        <OgbeLinkToggle on={linkOn} onToggle={() => setLinkOn(l => !l)} />
      </div>
      <div className="ilm-matrix-grid">
        {IFAGATE_MATRIX.map((card, ci) => (
          <IfaGateCard key={card.id} card={card} linkOn={linkOn} cardIdx={ci} />
        ))}
      </div>
    </>
  );
}

// ─── IfaGate 0+8D Radial Matrix ──────────────────────────────────────────────

function IfaGateRadialMatrix({ dims, variant }) {
  const [activeIdx, setActiveIdx] = useState(null);
  const ww = useWindowWidth();
  const sm  = ww < 520;
  const W   = sm ? 340 : 560;
  const H   = sm ? 292 : 480;
  const cx  = W / 2, cy = H / 2;
  const orbitR = sm ? 102 : 165;
  const nodeR  = sm ?  19  : 30;
  const isEllipse = variant === 'sidechrx';
  const cRx = sm ? (isEllipse ? 40 : 31) : (isEllipse ? 68 : 52);
  const cRy = sm ? (isEllipse ? 27 : 31) : (isEllipse ? 44 : 52);
  const lOff  = sm ? nodeR + 8  : nodeR + 12;
  const lFsz  = sm ? 7 : 8.5;
  const foW   = sm ? 38 : 66,  foH  = sm ? 22 : 34;
  const nfoW  = sm ? 24 : 38,  nfoH = sm ? 18 : 28;
  const gradId = `iol0g-${variant}`;

  const positions = dims.map((_, i) => {
    const a = (i / 8) * 2 * Math.PI - Math.PI / 2;
    const ca = Math.cos(a), sa = Math.sin(a);
    const cRim = isEllipse
      ? (cRx * cRy) / Math.sqrt((cRy * ca) ** 2 + (cRx * sa) ** 2)
      : cRx;
    return {
      nx: cx + orbitR * ca,               ny: cy + orbitR * sa,
      sx: cx + (cRim + 5) * ca,           sy: cy + (cRim + 5) * sa,
      ex: cx + (orbitR - nodeR - 4) * ca, ey: cy + (orbitR - nodeR - 4) * sa,
      lx: cx + (orbitR + lOff) * ca,      ly: cy + (orbitR + lOff) * sa,
      a,
    };
  });

  const anchors   = ['middle','start','start','start','middle','end','end','end'];
  const dBaseline = ['auto','middle','middle','middle','hanging','middle','middle','middle'];
  const toggle = i => setActiveIdx(ai => ai === i ? null : i);
  const active = activeIdx !== null ? dims[activeIdx] : null;

  return (
    <div className="iol0-wrap">
      <svg viewBox={`0 0 ${W} ${H}`} className="iol0-svg">
        <defs>
          <radialGradient id={gradId}>
            <stop offset="0%"   stopColor="#8b5cf6" stopOpacity="0.18"/>
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0"/>
          </radialGradient>
        </defs>

        {/* Orbit ring */}
        <circle cx={cx} cy={cy} r={orbitR} fill="none"
          stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="3 8"/>

        {/* Spokes */}
        {positions.map((p, i) => (
          <line key={i} x1={p.sx} y1={p.sy} x2={p.ex} y2={p.ey}
            stroke={activeIdx === i ? dims[i].color : 'rgba(255,255,255,0.13)'}
            strokeWidth={activeIdx === i ? 2 : 1}
            style={{transition:'stroke 0.3s, stroke-width 0.3s'}}/>
        ))}

        {/* Center glow */}
        {isEllipse
          ? <ellipse cx={cx} cy={cy} rx={cRx+14} ry={cRy+14} fill={`url(#${gradId})`}/>
          : <circle  cx={cx} cy={cy} r={cRx+14}              fill={`url(#${gradId})`}/>}

        {/* Center node */}
        {isEllipse
          ? <ellipse cx={cx} cy={cy} rx={cRx} ry={cRy}
              fill="#04080f" stroke="#8b5cf6" strokeWidth="2"/>
          : <circle  cx={cx} cy={cy} r={cRx}
              fill="#04080f" stroke="#8b5cf6" strokeWidth="2"/>}

        {/* Center IfaGate energy-form symbol via foreignObject */}
        <foreignObject x={cx - foW/2} y={cy - foH/2} width={foW} height={foH}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'center',
            width:'100%',height:'100%'}}>
            <IfaGateOgbe sym="𝒳" symSize={sm ? '0.85rem' : '1.2rem'}
              iconSize={sm ? 9 : 12} color="#8b5cf6"/>
          </div>
        </foreignObject>

        {/* Outer dimension nodes */}
        {positions.map((p, i) => {
          const d = dims[i];
          const isA = activeIdx === i;
          return (
            <g key={i} onClick={() => toggle(i)} style={{cursor:'pointer'}}>
              <circle cx={p.nx} cy={p.ny} r={nodeR+10}
                fill={d.color} fillOpacity={isA ? 0.12 : 0}
                style={{transition:'fill-opacity 0.3s'}}/>
              <circle cx={p.nx} cy={p.ny} r={nodeR}
                fill="#060c18"
                stroke={isA ? d.color : 'rgba(255,255,255,0.18)'}
                strokeWidth={isA ? 2.2 : 1.5}
                style={{transition:'stroke 0.3s, stroke-width 0.3s'}}/>
              <foreignObject x={p.nx - nfoW/2} y={p.ny - nfoH/2} width={nfoW} height={nfoH}>
                <div style={{display:'flex',alignItems:'center',justifyContent:'center',
                  width:'100%',height:'100%'}}>
                  <IfaGateOgbe sym={d.letter}
                    symSize={sm ? '0.7rem' : '0.85rem'} iconSize={sm ? 6 : 8}
                    color={isA ? d.color : 'rgba(200,210,235,0.65)'}/>
                </div>
              </foreignObject>
              <text x={p.lx} y={p.ly}
                textAnchor={anchors[i]} dominantBaseline={dBaseline[i]}
                fontSize={lFsz} fontFamily="system-ui,sans-serif"
                fill={isA ? d.color : 'rgba(136,146,170,0.72)'}
                style={{transition:'fill 0.3s',pointerEvents:'none'}}>
                {sm ? d.short : d.name}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Description panel */}
      <div className="iol0-desc"
        style={active ? {borderColor:active.color+'44',background:active.color+'0d'} : {}}>
        {active ? (
          <>
            <span className="iol0-desc__sym">
              <IfaGateOgbe sym={active.letter} symSize="1rem" iconSize={10} color={active.color}/>
            </span>
            <span className="iol0-desc__name" style={{color:active.color}}>{active.name}</span>
            <span className="iol0-desc__sep">—</span>
            <span className="iol0-desc__text">{active.desc}</span>
          </>
        ) : (
          <span className="iol0-desc__hint">Click a node to explore</span>
        )}
      </div>
    </div>
  );
}

// ─── IfaGate 0+8D Section (IfaSlider) ────────────────────────────────────────

function IfaGate0Plus8DSection() {
  const [slide, setSlide] = useState(0);
  const labels = ['IfaGate STEAMSEX Matrix', 'IfaGate SIDECHRX Matrix'];
  return (
    <div className="iol0-header">
      <div className="iol0-eyebrow">IfaGate 0+8D Matrix · IfaSlider · IfaLogic</div>
      <h3 className="iol0-title">The IfaLogic Matrix (Featuring IfaSlider)</h3>
      <p className="iol0-sub">
        The IfaGate{' '}
        <IfaGateOgbe sym="𝒳" symSize="1rem" iconSize={10} color="var(--text-1)"/>{' '}
        at the Centre, with its 8 Dimensions radiating outward.
        Use the <strong>IfaSlider</strong> to switch between the two 0+8D Matrices.
        Click any Node to explore its Dimension.
      </p>
      <div className="iol0-slider">
        {labels.map((label, i) => (
          <button key={i}
            className={`iol0-slider__tab${slide === i ? ' iol0-slider__tab--active' : ''}`}
            onClick={() => setSlide(i)}>
            {label}
          </button>
        ))}
      </div>
      <div className="iol0-matrix-title">{labels[slide]}</div>
      {slide === 0
        ? <IfaGateRadialMatrix key="steamsex" dims={STEAMSEX_LOGIC_DIMS} variant="steamsex"/>
        : <IfaGateRadialMatrix key="sidechrx" dims={SIDECHRX_LOGIC_DIMS} variant="sidechrx"/>}
    </div>
  );
}

// ─── IfaLogic Matrix Section ──────────────────────────────────────────────────

// ─── GateSVG — ANSI circuit-diagram symbol for each classical logic gate ──────

function GateSVG({ type, color, inlineH }) {
  const lp = { stroke: color, strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' };
  const bp = { ...lp, fill: 'none' };
  const svgStyle = inlineH
    ? { height: inlineH, width: 'auto', display: 'inline', overflow: 'visible', verticalAlign: 'middle' }
    : { width: '100%', height: 'auto', display: 'block', overflow: 'visible' };

  switch (type) {
    case 'Buffer':
      return (
        <svg viewBox="0 0 60 34" style={svgStyle} aria-label="Buffer gate symbol">
          <line x1="0" y1="17" x2="14" y2="17" {...lp} />
          <polygon points="14,4 14,30 46,17" {...bp} />
          <line x1="46" y1="17" x2="60" y2="17" {...lp} />
        </svg>
      );
    case 'NOT':
      return (
        <svg viewBox="0 0 66 34" style={svgStyle} aria-label="NOT gate symbol">
          <line x1="0" y1="17" x2="14" y2="17" {...lp} />
          <polygon points="14,4 14,30 43,17" {...bp} />
          <circle cx="46" cy="17" r="3" {...bp} />
          <line x1="49" y1="17" x2="66" y2="17" {...lp} />
        </svg>
      );
    case 'AND':
      return (
        <svg viewBox="0 0 64 34" style={svgStyle} aria-label="AND gate symbol">
          <line x1="0" y1="11" x2="15" y2="11" {...lp} />
          <line x1="0" y1="23" x2="15" y2="23" {...lp} />
          <path d="M15,4 L15,30 L28,30 Q45,30 45,17 Q45,4 28,4 Z" {...bp} />
          <line x1="45" y1="17" x2="64" y2="17" {...lp} />
        </svg>
      );
    case 'NAND':
      return (
        <svg viewBox="0 0 68 34" style={svgStyle} aria-label="NAND gate symbol">
          <line x1="0" y1="11" x2="15" y2="11" {...lp} />
          <line x1="0" y1="23" x2="15" y2="23" {...lp} />
          <path d="M15,4 L15,30 L27,30 Q42,30 42,17 Q42,4 27,4 Z" {...bp} />
          <circle cx="45" cy="17" r="3" {...bp} />
          <line x1="48" y1="17" x2="68" y2="17" {...lp} />
        </svg>
      );
    case 'OR':
      return (
        <svg viewBox="0 0 64 34" style={svgStyle} aria-label="OR gate symbol">
          <line x1="0" y1="11" x2="13" y2="11" {...lp} />
          <line x1="0" y1="23" x2="13" y2="23" {...lp} />
          <path d="M13,4 L30,4 Q48,4 48,17 Q48,30 30,30 L13,30 Q20,17 13,4 Z" {...bp} />
          <line x1="48" y1="17" x2="64" y2="17" {...lp} />
        </svg>
      );
    case 'NOR':
      return (
        <svg viewBox="0 0 68 34" style={svgStyle} aria-label="NOR gate symbol">
          <line x1="0" y1="11" x2="13" y2="11" {...lp} />
          <line x1="0" y1="23" x2="13" y2="23" {...lp} />
          <path d="M13,4 L28,4 Q45,4 45,17 Q45,30 28,30 L13,30 Q20,17 13,4 Z" {...bp} />
          <circle cx="48" cy="17" r="3" {...bp} />
          <line x1="51" y1="17" x2="68" y2="17" {...lp} />
        </svg>
      );
    case 'XOR':
      return (
        <svg viewBox="0 0 68 34" style={svgStyle} aria-label="XOR gate symbol">
          <line x1="0" y1="11" x2="15" y2="11" {...lp} />
          <line x1="0" y1="23" x2="15" y2="23" {...lp} />
          <path d="M9,4 Q16,17 9,30" {...bp} />
          <path d="M15,4 L30,4 Q48,4 48,17 Q48,30 30,30 L15,30 Q22,17 15,4 Z" {...bp} />
          <line x1="48" y1="17" x2="68" y2="17" {...lp} />
        </svg>
      );
    case 'XNOR':
      return (
        <svg viewBox="0 0 72 34" style={svgStyle} aria-label="XNOR gate symbol">
          <line x1="0" y1="11" x2="15" y2="11" {...lp} />
          <line x1="0" y1="23" x2="15" y2="23" {...lp} />
          <path d="M9,4 Q16,17 9,30" {...bp} />
          <path d="M15,4 L28,4 Q45,4 45,17 Q45,30 28,30 L15,30 Q22,17 15,4 Z" {...bp} />
          <circle cx="48" cy="17" r="3" {...bp} />
          <line x1="51" y1="17" x2="72" y2="17" {...lp} />
        </svg>
      );
    default: return null;
  }
}

// ─── IfaLogicMatrixSection ────────────────────────────────────────────────────

function IfaLogicMatrixSection() {
  const [activePart, setActivePart] = React.useState(0);

  const TABS = [
    { label: 'Part 1', title: 'The 8 Logic Gates: Àwọn Ìlàrògún Mẹ́jọ',   color: '#8b5cf6' },
    { label: 'Part 2', title: 'The 8 Quantum Gates', color: '#14b8d4' },
    { label: 'Part 3', title: 'The 16 IfaGates',     color: '#8b5cf6' },
  ];

  // Classical gate card — colours last col green/dim based on '1'/'0'
  function ClassicGateCard({ gate }) {
    return (
      <div className="il-gate-card" style={{ '--gc': gate.color }}>
        <div className="il-gate-card__top">
          <span className="il-gate-card__sym">{gate.sym}</span>
          <div>
            <div className="il-gate-card__name">{gate.name}</div>
            <span className="il-gate-card__arity"
              style={{ color: gate.color, borderColor: gate.color + '55' }}>
              {gate.arity}
            </span>
          </div>
        </div>
        <div className="il-gate-card__schematic">
          <GateSVG type={gate.name} color={gate.color} />
        </div>
        <div className="il-gate-card__meaning">{gate.meaning}</div>
        <table className="il-mini-table">
          <thead>
            <tr>{gate.headers.map((h, j) => <th key={j}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {gate.rows.map((row, j) => (
              <tr key={j}>
                {row.map((cell, k) => (
                  <td key={k}
                    style={k === row.length - 1
                      ? { color: cell === '1' ? '#00c87c' : 'var(--text-3)', fontWeight: 700 }
                      : {}}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="il-gate-card__desc">{gate.desc}</div>
      </div>
    );
  }

  // Quantum gate card — output col uses the gate's accent colour; shows matrix notation
  function QuantumGateCard({ gate }) {
    return (
      <div className="il-gate-card" style={{ '--gc': gate.color }}>
        <div className="il-gate-card__top">
          <span className="il-gate-card__sym">{gate.sym}</span>
          <div>
            <div className="il-gate-card__name">{gate.name}</div>
            <span className="il-gate-card__arity"
              style={{ color: gate.color, borderColor: gate.color + '55' }}>
              {gate.arity}
            </span>
          </div>
        </div>
        <div className="il-gate-card__meaning">{gate.meaning}</div>
        <div className="il-mat-str">{gate.matStr}</div>
        <table className="il-mini-table">
          <thead>
            <tr>{gate.headers.map((h, j) => <th key={j}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {gate.rows.map((row, j) => (
              <tr key={j}>
                {row.map((cell, k) => (
                  <td key={k}
                    style={k === row.length - 1
                      ? { color: gate.color, fontWeight: 700, fontFamily: 'monospace' }
                      : { fontFamily: 'monospace', color: 'var(--text-2)' }}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="il-gate-card__desc">{gate.desc}</div>
      </div>
    );
  }

  return (
    <section className="section" id="ifaLogic-matrix">
      <div className="container">

        {/* Section header */}
        <div className="section__header section__header--center">
          <span className="section__eyebrow section__eyebrow--violet">IfaLogic Matrix · Logic Gates · Quantum Gates · 16 IfaGates</span>
          <h2 className="section__title">
            The <span className="accent--violet">IfaLogic Matrix</span>
          </h2>
          <p className="section__subtitle">
            The Complete Matrix of Ifa Logical Operators — from the 8 classical logic gates
            and 8 quantum gates through to the 8 IfaGates (Ifa-Native Logic Gates), unified
            across Ifa Binary Logic, Quantum Logic, Ifa Ternary Logic, and others.
          </p>
        </div>

        {/* ── Tab switcher ────────────────────────────────────────────────────── */}
        <div className="il-tabs">
          {TABS.map((t, i) => (
            <button key={i}
              className={'il-tab' + (activePart === i ? ' il-tab--active' : '')}
              style={{ '--tc': t.color }}
              onClick={() => setActivePart(i)}>
              <span className="il-tab__label">{t.label}</span>
              <span className="il-tab__title">{t.title}</span>
            </button>
          ))}
        </div>

        {/* ── Panel ───────────────────────────────────────────────────────────── */}
        <div className="il-panel" key={activePart}>

          {activePart === 0 && (
            <div>
              <div className="il-part-header">
                <div className="il-part-header__label">Part 1</div>
                <h3 className="il-part-header__title">The 8 Logic Gates: Àwọn Ìlàrògún Mẹ́jọ</h3>
                <p className="il-part-header__sub">
                  The 8 classical logic gates are the foundational building blocks of digital
                  logic and computing. Each gate processes one or more binary inputs to produce
                  a single binary output based on its Boolean function — forming the basis
                  from which all of IfaLogic Binary Computing is derived.
                </p>
              </div>
              <div className="il-gate-grid">
                {LOGIC_GATES.map((gate, i) => <ClassicGateCard key={i} gate={gate} />)}
              </div>
            </div>
          )}

          {activePart === 1 && (
            <div>
              <div className="il-part-header">
                <div className="il-part-header__label" style={{ color: '#14b8d4' }}>Part 2</div>
                <h3 className="il-part-header__title">The 8 Quantum Gates</h3>
                <p className="il-part-header__sub">
                  The 8 fundamental quantum gates operate on qubits — quantum bits that can exist
                  in superposition of |0⟩ and |1⟩. Unlike classical gates, quantum gates are
                  reversible unitary operations described by matrices, forming the basis of
                  quantum computing and Ifa Quantum Logic (IfaQuantum).
                </p>
              </div>
              <div className="il-gate-grid">
                {QUANTUM_GATES.map((gate, i) => <QuantumGateCard key={i} gate={gate} />)}
              </div>
            </div>
          )}

          {activePart === 2 && (
            <>
              <IlmRevealStyles />
              <div>
                <div className="il-part-header">
                  <div className="il-part-header__label" style={{ color: 'var(--violet)' }}>Part 3</div>
                  <h3 className="il-part-header__title">The 16 IfaGates</h3>
                  <h4 className="il-part-header__subheading">IfaDevices</h4>
                  <p className="il-part-header__sub">
                    As Ifa Devices or Ifa-Based Devices, the 16 IfaGates (Ifa Logic Gates) are the Ifa Foundations of the classical logic
                    gates and quantum logic gates — based on the Amulu Matrix and the 256 Odu Ifa.
                  </p>
                  <hr className="il-part-header__rule" />
                  <p className="il-part-header__sub">
                    An IfaGate is any logic gate 𝒳 (classical, quantum, etc.) that is expressed,
                    computed, constructed, or viewed using the 16 Ifa Laws of Nature,
                    Oju Odufa Merindinlogun — the SIDECHRX Principles.
                  </p>
                  <hr className="il-part-header__rule" />
                  <p className="il-part-header__sub">
                    Click each gate to reveal an underlying Odu.
                  </p>
                </div>

                {/* ── IfaGate definition box ───────────────────────────────────── */}
                <div className="ilm-subset">
                  <div className="ilm-subset__syms">
                    {[
                      {sym:'∧',gateType:'AND', color:'#00c87c'},{sym:'∨',gateType:'OR',  color:'#f0920c'},{sym:'¬',gateType:'NOT', color:'#14b8d4'},
                      {sym:'⊼',gateType:'NAND',color:'#ec4899'},{sym:'⊽',gateType:'NOR', color:'#8b5cf6'},{sym:'⊕',gateType:'XOR', color:'#3b9eff'},
                      {sym:'H',color:'#f5c518'},{sym:'𝒳',color:'#a78bfa'},
                    ].map((g, i, arr) => (
                      <React.Fragment key={i}>
                        <IfaGateOgbe sym={g.sym} gateType={g.gateType} symSize="1.35rem" iconSize={12} color={g.color} />
                        {i < arr.length - 1 && <span className="ilm-subset__sep">,</span>}
                      </React.Fragment>
                    ))}
                    <span className="ilm-subset__ell">, …</span>
                  </div>
                  <h3 className="ilm-subset__heading">Ifa Definition (IfaDef): ToE Definition (ToE Def)</h3>
                  <p className="ilm-subset__tagline"><em>Àwọn ìlà àrògún tí a lèfi ṣe gbogbo ǹkàn (the Logic Gates for Everything, GateoE).</em></p>
                  <div className="ilm-subset__caption">
                    <p>An <strong>IfaGate</strong> is any logic gate, 𝒳, that is expressed, computed, constructed, or viewed using the 16 Ifa Laws of Nature, <strong>Oju Odufa Merindinlogun</strong> — the <strong>SIDECHRX Principles</strong>.</p>
                    <hr className="ilm-subset__rule" />
                    <p>IfaGates are the <strong>GateoEs</strong> or <strong>ToE Logic Gates</strong> used to model, compute, and analyse logical operations across all 16 <strong>STEAMSEX Dimensions</strong> — all fields of knowledge and reality.</p>
                    <hr className="ilm-subset__rule" />
                    <p>An Ifa Expression for any logic gate uses the symbol of that logic gate, 𝒳, with the <strong>Ogbe Energy Symbol</strong> attached as subscript for the energy form, and the <strong>Oyeku Anergy Symbol</strong> for its dual. These are <em>IfaConstructions</em>, i.e., Constructions in IfaLang.</p>
                  </div>
                  <div className="ilm-def-row">
                    <div className="ilm-def-item">
                      <IfaGateOgbe sym="𝒳" symSize="1.5rem" iconSize={14} color="#8b5cf6" />
                      <span className="ilm-def-item__defop">:=</span>
                      <OgbeSymbol size={22} />
                      <span className="ilm-def-item__label">IfaGate — Energy form</span>
                    </div>
                    <div className="ilm-def-divider">⟷</div>
                    <div className="ilm-def-item">
                      <IfaGateOyeku sym="𝒳" symSize="1.5rem" iconSize={14} />
                      <span className="ilm-def-item__defop">:=</span>
                      <OyekuSymbol size={22} />
                      <span className="ilm-def-item__label">Dual IfaGate — Anergy form</span>
                    </div>
                  </div>
                </div>

                {/* ── 4×4 matrix grid ─────────────────────────────────────────── */}
                <IfaGateMatrixSection />

                {/* ── IfaGate 0+8D Matrix (IfaSlider) ────────────────────────── */}
                <IfaGate0Plus8DSection />

              </div>
            </>
          )}

        </div>

      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p className="footer__text">
          IfaLogic Platform · TOE Logic · CENLogic · Logic of Everything (Logic-oE)<br />
          <a href="https://ifainternet.org/" className="footer__link">The IFA Internet</a>
          {' · '}
          <a href="https://ifainternet.org/ifa-mathematics-toe-mathematics/ifa-transform/" className="footer__link">IFA Mathematica</a>
          {' · '}
          <a href="https://ifainternet.org/ifa-matrix/" className="footer__link">IFA Matrix</a>
          {' · '}
          <a href="https://ifainternet.org/ifagram/" className="footer__link">IfaGram</a>
          {' · '}
          <a href="https://ifainternet.org/ifa-logic-kids/" className="footer__link" style={{color:'var(--gold)'}}>IfaLogic Academy (Kids &amp; Teens)</a>
        </p>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

function App() {
  return (
    <>
      <Nav />
      <main>
        <HeroSection />
        <IfaSymbolSection />
        <BinaryComputingSection />
        <LogicalOperatorsSection />
        <OrisaLogicSection />
        <YorubaLogicSection />
        <AmuluMatrixSection />
        <TruthTableSection />
        <IfaLogicMatrixSection />
      </main>
      <Footer />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
