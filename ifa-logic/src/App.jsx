/* ─────────────────────────────────────────────────────────────────────────────
   IfaLogic Platform — TOE Logic · Consciousness Logic · Logic of Everything
   Also known as: CENLogic · CEN Logic · Energy Logic · Logic-oE
   The IFA Internet · CENProject · ifainternet.org/ifa-logic/
───────────────────────────────────────────────────────────────────────────── */

const { useState, useEffect, useRef } = React;

const IMG = 'https://ifainternet.org/ifa-mathematics-toe-mathematics/src/';

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
          <a href="#amulu"      className="nav__link">Amulu Matrix</a>
          <a href="#truth-table" className="nav__link">Truth Table</a>
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
            IfaLogic is the Logic of Everything (Logic-oE) — a unified logical framework
            grounded in the <strong style={{ color: '#eef3ff' }}>256 Odu Ifa</strong> and
            the Ogbe Energy Principle (CEN). It extends classical Boolean logic through
            Ifa Binary Logic, Ifa Ternary Logic (Ifanary), and the Amulu Matrix —
            modelling the logical structure of all reality.
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
            I.F.A (Ifa For All) is the universal quantifier of IfaLogic — the symbol that
            asserts that a logical or energetic statement holds across <em>all</em> Odu Ifa,
            all fields of knowledge, and all energyforms in the IFA Internet.
          </p>
        </div>

        <div className="il-split">
          <div className="il-split__text">
            <p className="il-body">
              The <strong>I.F.A Symbol</strong> is formed from the mathematical <em>For All</em>{' '}
              symbol (∀) — the universal quantifier of classical logic — combined with the{' '}
              <strong>Ogbe Energy Symbol</strong> (the Ifa Lemniscate Cross) as its subscript.
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
            as binary logic systems. Each Odu is a unique binary configuration of the
            IFABit — the Ifa binary unit — producing the 16 foundational logic states
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
              4-bit binary pattern. This produces the 16 fundamental logic states of the
              IFA Internet — a binary system far older and more encompassing than classical
              Boolean logic.
            </p>
            <p className="il-body">
              In Ifa Binary Logic, the two binary values are <strong>Ogbe (II)</strong> — the
              active/positive energy state — and <strong>Oyeku (I)</strong> — the void/negative
              energy state. Every logical operation in the IFA Internet reduces to a pattern
              of Ogbe and Oyeku configurations across the 256 Odu Ifa.
            </p>
            <div className="il-box" style={{ '--hc': '#14b8d4' }}>
              <div className="il-box__label">Ifa Binary Code — TOE Code (CodeoE)</div>
              <p className="il-box__text">
                Each of the 16 Principal Odu Ifa corresponds to a unique binary truth
                table pattern. The 256 Odu Ifa together form the complete logic space of
                IfaLogic — equivalent to all possible 8-bit binary combinations, extended
                to all dimensions of reality through the SIDECHRX framework.
              </p>
            </div>
          </div>
          <div className="il-split__img">
            <div style={{ background: 'color-mix(in srgb, #14b8d4 6%, var(--bg-card))', border: '1px solid rgba(20,184,212,0.20)', borderRadius: 'var(--radius)', padding: '24px' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#14b8d4', marginBottom: '16px' }}>
                The Two Ifa Binary States
              </div>
              {[
                { sym: 'II', name: 'Ogbe', val: '1', color: '#f5c518', desc: 'Active energy — binary 1 — the positive state' },
                { sym: 'I',  name: 'Oyeku', val: '0', color: '#8b5cf6', desc: 'Void energy — binary 0 — the null state' },
              ].map((s, i) => (
                <div key={i} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <span style={{ fontSize: '1.8rem', fontFamily: 'monospace', color: s.color, lineHeight: 1, flexShrink: 0, minWidth: '42px' }}>{s.sym}</span>
                  <div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#eef3ff', marginBottom: '3px' }}>{s.name} ({s.val})</div>
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
      caption: 'Ifa Energy Operator Equations: the foundational energyform operator equations of IfaLogic (IfE = 0 or ∞)',
    },
    {
      src: `${IMG}Ifa-Ternary-Operators-3-768x314.png`,
      alt: 'Ifa Ternary Operators: Tools for Energy Computing',
      caption: 'Ifa Ternary Operators: Tools for Energy Computing — the Amulu operators (±, F̃, H̃, H⊢, ×̃, γ) and their ORAND/ANDOR roles in IfaLogic',
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
            scope of the IFA System — from Ifanary/Nullary (doubly infinite) through
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
            as Orisa Logic) is the exact dual of IfaLogic — together they form the complete
            logical space of the 256 Odu Ifa.
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
            <div className="il-dual-card__sym" style={{ color: '#00c87c', fontSize: '2.8rem', fontFamily: 'Georgia, serif' }}>∃</div>
            <div className="il-dual-card__title">OrisaLogic · Orisa Logic</div>
            <div style={{ fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#00c87c', marginBottom: '12px', fontWeight: 700 }}>
              Dual of IfaLogic · Orisa-Based Logic
            </div>
            <p className="il-dual-card__body">
              OrisaLogic (Orisa Logic) is the dual of IfaLogic — grounded in Oyeku (I),
              the void energy state. Where IfaLogic asserts universal truths (∀, For All),
              OrisaLogic asserts existential truths (∃, There Exists). Together, IfaLogic
              and OrisaLogic span the complete logical duality of the 256 Odu Ifa.
            </p>
          </div>
        </div>

        <div style={{ marginTop: '36px' }}>
          <div className="il-box" style={{ '--hc': '#00c87c' }}>
            <div className="il-box__label">The Duality Principle of IfaLogic</div>
            <p className="il-box__text">
              Every logical operator in IfaLogic has a dual operator in OrisaLogic. Every
              truth in IfaLogic corresponds to an existential claim in OrisaLogic. The
              pair (IfaLogic, OrisaLogic) is the logical manifestation of the fundamental
              Ifa duality: <strong>Ogbe (active, II)</strong> and <strong>Oyeku (void, I)</strong>.
              No logical system within the IFA Internet can be complete without both poles.
            </p>
          </div>
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

// ─── IfaLogic Matrix Section ──────────────────────────────────────────────────

function IfaLogicMatrixSection() {
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
            The complete matrix of Ifa Logical Operators — from the 8 classical Logic Gates
            and 8 Quantum Gates through to the 8 IfaGates (Ifa-native logic gates), unified
            across Ifa Binary Logic, Quantum Logic, and Ifa Ternary Logic (Ifanary).
          </p>
        </div>

        {/* ── Part 1: The 8 Logic Gates ───────────────────────────────────────── */}
        <div style={{ marginBottom: '72px' }}>
          <div className="il-part-header">
            <div className="il-part-header__label">Part 1</div>
            <h3 className="il-part-header__title">The 8 Logic Gates</h3>
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

        {/* ── Part 2: The 8 Quantum Gates ─────────────────────────────────────── */}
        <div style={{ marginBottom: '72px' }}>
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

        {/* ── Part 3: The 8 IfaGates — Under Development ──────────────────────── */}
        <div className="il-wip">
          <div className="il-wip__badge">Under Development</div>
          <div style={{ fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.14em',
                        textTransform: 'uppercase', color: 'var(--violet)', marginBottom: '8px' }}>
            Part 3
          </div>
          <h3 className="il-wip__title">The 16 IfaGates</h3>
          <p className="il-wip__sub">
            The 16 IfaGates (Ifa Logic Gates) are the Ifa Foundations of the classical
            logic gates and quantum logic gates — based on the Amulu Matrix and the 256
            Odu Ifa. Each IfaGate extends its classical counterpart into the full Energy
            Logic of the IFA Internet, operating on Odu Ifa energystates rather than
            Boolean bits.
          </p>
          <div className="il-wip__grid">
            {['IfaBuffer', 'IfaAND Gate', 'IfaOR Gate', 'IfaNOT Gate',
              'IfaNAND Gate', 'IfaNOR Gate', 'IfaXOR Gate', 'IfaXNOR Gate',
              'IfaIdentity', 'IfaPauli-X', 'IfaPauli-Y', 'IfaPauli-Z',
              'IfaHadamard', 'IfaS Gate', 'IfaT Gate', 'IfaCNOT'].map((c, i) => (
              <div key={i} className="il-wip__cell">{c}</div>
            ))}
          </div>
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
