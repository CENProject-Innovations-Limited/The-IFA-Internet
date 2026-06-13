/* ─────────────────────────────────────────────────────────────
   Ifa Medicine — ToE Medicine · The Medicine for Everything
   The IFA Internet · CENProject · toe.cenproject.org
───────────────────────────────────────────────────────────── */

const { useState, useEffect } = React;

// ── OgbeSymbol (Lemniscate of Bernoulli — Ogbe Energy Symbol) ──
function OgbeSymbol({ size = 20 }) {
  const canvasRef = React.useRef(null);
  const a = size * 0.47, ccx = size / 2, ccy = size / 2, sc = a / 200, N = 80;
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const DPR = window.devicePixelRatio || 1;
    canvas.width = size * DPR; canvas.height = size * DPR;
    const ctx = canvas.getContext('2d');
    ctx.scale(DPR, DPR);
    const PI = Math.PI;
    function buildLobe(t0, t1, neg) {
      const pts = [];
      for (let i = 0; i <= N; i++) {
        const t = t0 + (t1 - t0) * i / N;
        const c2 = Math.cos(2 * t), v = neg ? -c2 : c2;
        if (v < 1e-10) continue;
        const rho = a * Math.sqrt(v);
        pts.push([ccx + rho * Math.cos(t), ccy + rho * Math.sin(t)]);
      }
      return pts;
    }
    const lobes = [
      buildLobe(-PI/4, PI/4, false), buildLobe(3*PI/4, 5*PI/4, false),
      buildLobe(PI/4, 3*PI/4, true), buildLobe(5*PI/4, 7*PI/4, true),
    ];
    function stroke(pts, lw, rgba, blur) {
      if (!pts.length) return;
      ctx.save(); ctx.shadowBlur = blur * sc * 200; ctx.shadowColor = rgba;
      ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]);
      pts.slice(1).forEach(p => ctx.lineTo(p[0], p[1]));
      ctx.strokeStyle = rgba; ctx.lineWidth = lw * sc * 200; ctx.stroke(); ctx.restore();
    }
    [[28,'rgba(245,197,24,0.07)',35],[16,'rgba(245,197,24,0.18)',22],
     [8,'rgba(245,197,24,0.52)',12],[3.5,'rgba(255,235,120,0.82)',5],
     [1.5,'rgba(255,248,210,0.96)',2]].forEach(([lw,c,b]) =>
      lobes.forEach(l => stroke(l, lw, c, b)));
  }, [size]);
  return <canvas ref={canvasRef} style={{ width: size, height: size, display: 'inline-block', verticalAlign: 'middle' }} />;
}

// ── OgbeSymbol SVG (pure SVG — works inside <svg> without foreignObject) ──
function OgbeSymbolSVG({ cx = 0, cy = 0, size = 32 }) {
  const a = size * 0.47, N = 80, PI = Math.PI;
  function buildLobe(t0, t1, neg) {
    const pts = [];
    for (let i = 0; i <= N; i++) {
      const t = t0 + (t1 - t0) * i / N;
      const c2 = Math.cos(2 * t), v = neg ? -c2 : c2;
      if (v < 1e-10) continue;
      const rho = a * Math.sqrt(v);
      pts.push(`${cx + rho * Math.cos(t)},${cy + rho * Math.sin(t)}`);
    }
    return pts.join(' ');
  }
  const lobes = [
    buildLobe(-PI/4, PI/4, false), buildLobe(3*PI/4, 5*PI/4, false),
    buildLobe(PI/4, 3*PI/4, true), buildLobe(5*PI/4, 7*PI/4, true),
  ];
  return (
    <g>
      <defs>
        <filter id="ogbe-med-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1.8" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      {lobes.map((pts, i) => (
        <polyline key={`og${i}`} points={pts} fill="none"
          stroke="rgba(245,197,24,0.45)" strokeWidth="3"
          filter="url(#ogbe-med-glow)" strokeLinecap="round" />
      ))}
      {lobes.map((pts, i) => (
        <polyline key={`oc${i}`} points={pts} fill="none"
          stroke="rgba(255,248,210,0.93)" strokeWidth="0.9"
          strokeLinecap="round" />
      ))}
    </g>
  );
}

// ── MedicGebra Matrix Data ─────────────────────────────────────
const MG_ACCENT = '#00c57a';
const MEDIC_NODES = [
  { id: 'center', label: 'MedicGebra', sub: 'Medicine Algebra', isCenter: true, color: MG_ACCENT,
    desc: 'MedicGebra (Medicine Algebra) is the Algebraic Framework of Ifa Medicine — derived from IfaGebra (AlgebroE), the Algebra of Everything. It models the entire field of Medicine as a rigorous Axiomatic Algebra governed by the 256 Odu Ifa Meta-Axioms and the Ifa Operators. MedicGebra is the Central Node of the 0+8D Matrix of Ifa Medicine, connecting all 8 medical dimensions through the IFAlgebra and the Ifa Energy-Based Approach developed and modelled on the IFA Internet.' },
  { id: 'internal', label: 'Internal Medicine', char: 'IM', color: '#00c57a', angle: 270,
    desc: 'Internal Medicine in the Ifa Framework (ÀṣẹBody Medicine) is modelled as the Ifalgebra of systemic body energyforms — organs, systems, and processes treated as algebraic elements governed by Odu Ifa energy principles. On the IFA Internet, Internal Medicine is studied through the Ifa Energy-Based Approach (EBMed), mapping each internal condition to its Odu Ifa Vibration/Signature and prescribing remedies through Akose Ifa (Ifa Herbal Medicine), Odu Diagnosis, and Consciousness Medicine (ConMed).' },
  { id: 'surgery', label: 'Surgery', char: 'Sx', color: '#00b4d8', angle: 315,
    desc: 'Surgery in the Ifa Framework is studied and modelled using mathematical methods via the 256 Odu Ifa.' },
  { id: 'pediatrics', label: 'Pediatrics', char: 'Ped', color: '#f5c518', angle: 0,
    desc: 'Pediatrics in the Ifa Framework treats the developing body and consciousness of children as sacred energyforms known as Òrìṣà Kórì Elements, in accordance to Ori (personal destiny) and Odu Ifa Energetic Blueprint.' },
  { id: 'obgyn', label: 'OB/GYN', char: 'OB', color: '#e9498a', angle: 45,
    desc: 'Obstetrics and Gynecology in the Ifa Framework is centred on Orisa, such as Osun, Oya, Yemoja, Orisa Oko (Oṣó) — which are the Orisa governing transitions, birth, transformation, and the female life-force — as the primary energetic principle of female reproductive health. On the IFA Internet, OB/GYN Medicine is studied through the Ifa Energy-Based Approach (EBMed), integrating Odu Ifa diagnostic insights into fertility, pregnancy, childbirth, and reproductive wellness. Each phase of the female reproductive cycle is modelled as a meta-algebraic state.' },
  { id: 'psychiatry', label: 'Psychiatry', char: 'Psy', color: '#7c4dff', angle: 90,
    desc: 'Psychiatry in the Ifa Framework is rooted in Consciousness Medicine (ConMed) — the meta-science of the mind as an Ifa Energyform. Mental health is modelled as the algebraic coherence of the mind\'s IFAlgebra: mental illness is a disruption of this coherence, and healing is its restoration through Ifa and Orisa Energy-Based Approaches. On the IFA Internet, Ifa Psychiatry is developed through IfaNeuroTech, Odu Ifa-based therapy (Ifá Dídá and Òrìṣà Dídá), Consciousness Wave (ConWave) therapy, and Ifa Brain Computer Interface (IfaBCI) technologies. Every psychiatric condition has a corresponding Odu signature and an Ifa Energy-Based remedy.' },
  { id: 'emergency', label: 'Emergency Medicine', char: 'EM', color: '#ff6b35', angle: 135,
    desc: 'Emergency Medicine in the Ifa Framework models acute crises as sudden algebraic collapses of the body\'s IFAlgebra — states requiring immediate energetic and physical restoration. On the IFA Internet, Ifa Emergency Medicine is developed through the Ifa Energy-Based Approach (EBMed), integrating rapid Odu Ifa triage (identifying the Odu governing the crisis), Àṣẹ-stabilisation techniques, and Consciousness Medicine interventions alongside conventional emergency care. The Ifa Framework recognises that every medical emergency has both a physical and an energetic dimension — full recovery requires addressing both within the IFAlgebra.' },
  { id: 'pathology', label: 'Pathology', char: 'Path', color: '#8b5cf6', angle: 180,
    desc: 'Pathology in the Ifa Framework is done in IfaLang, where the 16 Ifa\'s Law of Knowledge are used to study, model, and analyze diseases within the body.' },
  { id: 'others', label: 'Others', char: '+', color: '#94a3b8', angle: 225,
    desc: 'The "Others" dimension of MedicGebra encompasses all remaining medical specialties — Dermatology, Ophthalmology, Orthopaedics, Oncology, Cardiology, Neurology, Radiology, Anaesthesiology, and others — modelled as meta-algebras within MedicGebra. On the IFA Internet, every medical specialty is studied, developed, and modelled through the Ifa Energy-Based Approach (EBMed): each specialty maps to one or more of the 256 Odu Ifa, has its own Odu Signature System, and is governed by the same 256 Odu Ifa Meta-Axioms and Ifa Operators that form the foundation of all Ifa Medicine.' },
];
const MEDIC_EDGES = [
  { id: 'e-internal',   to: 'internal',   color: '#00c57a',
    desc: 'The connection between MedicGebra and Internal Medicine — the sub-algebra of systemic body energyforms, modelled through Odu Ifa diagnostic principles and Ifa Energy-Based approaches on the IFA Internet.' },
  { id: 'e-surgery',    to: 'surgery',    color: '#00b4d8',
    desc: 'The connection between MedicGebra and Surgery — surgical intervention modelled as direct operations on the body\'s IFAlgebra, integrated with Odu pre/post-operative diagnostics and Àṣẹ-restoration protocols.' },
  { id: 'e-pediatrics', to: 'pediatrics', color: '#f5c518',
    desc: 'The connection between MedicGebra and Pediatrics — the developing body as an emerging Ifalgebra, studied through Odu Ifa constitutional diagnostics, Akose Ifa remedies, and Consciousness Medicine for child development.' },
  { id: 'e-obgyn',      to: 'obgyn',      color: '#e9498a',
    desc: 'The connection between MedicGebra and OB/GYN — female reproductive health governed by Oya energy principles, modelled through Odu Ifa reproductive diagnostics and Ifa Energy-Based healing approaches.' },
  { id: 'e-psychiatry', to: 'psychiatry', color: '#7c4dff',
    desc: 'The connection between MedicGebra and Psychiatry — mental health as algebraic coherence of the mind\'s IFAlgebra, developed through Consciousness Medicine (ConMed), IfaNeuroTech, and Odu Ifa-based therapy.' },
  { id: 'e-emergency',  to: 'emergency',  color: '#ff6b35',
    desc: 'The connection between MedicGebra and Emergency Medicine — acute crises as algebraic collapses of the body\'s IFAlgebra, addressed through rapid Odu triage and Àṣẹ-stabilisation techniques.' },
  { id: 'e-pathology',  to: 'pathology',  color: '#8b5cf6',
    desc: 'The connection between MedicGebra and Pathology — disease as algebraic disruption of body energyforms, studied through Odu Diagnosis and classified by Odu Ifa signature within the IFAlgebra.' },
  { id: 'e-others',     to: 'others',     color: '#94a3b8',
    desc: 'The connection between MedicGebra and all other medical specialties — each modelled as a sub-algebra of the body\'s IFAlgebra, studied on the IFA Internet through the Ifa Energy-Based Approach (EBMed).' },
];

function MedicGebraMatrix() {
  const [sel, setSel] = useState(null);
  const CX = 250, CY = 250, R = 158;
  const toRad = deg => (deg * Math.PI) / 180;
  const outerNodes = MEDIC_NODES.filter(n => !n.isCenter).map(n => ({
    ...n, x: CX + R * Math.cos(toRad(n.angle)), y: CY + R * Math.sin(toRad(n.angle)),
  }));
  const toggle = (kind, id) =>
    setSel(s => s && s.kind === kind && s.id === id ? null : { kind, id });
  const selNode = sel && sel.kind === 'node' ? MEDIC_NODES.find(n => n.id === sel.id) : null;
  const selEdge = sel && sel.kind === 'edge' ? MEDIC_EDGES.find(e => e.id === sel.id) : null;
  const selItem = selNode || selEdge;
  const selColor = selItem ? selItem.color : MG_ACCENT;
  const NR = 40;
  return (
    <div style={{ margin: '56px 0 48px' }}>
      <div style={{ textAlign: 'center', marginBottom: '8px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-1, #f1f5f9)', margin: '0 0 8px' }}>
          MedicGebra 0+8D Matrix —{' '}
          <span style={{ color: MG_ACCENT }}>The 8 Dimensions of Medicine Algebra</span>
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-2, #94a3b8)', maxWidth: '520px', margin: '0 auto 4px', lineHeight: 1.6 }}>
          Click any node or connecting edge to explore the 8 dimensions of Medic Algebra.
        </p>
        <p style={{ fontSize: '0.72rem', color: 'var(--text-3, #64748b)', margin: 0, fontStyle: 'italic' }}>
          IfaDiagram (Ifagram): Diagrammatic Reasoning with Ifa
        </p>
      </div>

      <svg viewBox="0 0 500 500"
           style={{ width: '100%', maxWidth: '520px', display: 'block', margin: '0 auto' }}
           aria-label="MedicGebra 0+8D Matrix — The 8 Dimensions of Medicine Algebra">

        {/* Ambient rings */}
        <circle cx={CX} cy={CY} r="165" fill="none" stroke="rgba(0,197,122,0.07)" strokeWidth="1" />
        <circle cx={CX} cy={CY} r="82"  fill="none" stroke="rgba(0,197,122,0.04)" strokeWidth="1" />

        {/* Edges */}
        {MEDIC_EDGES.map(edge => {
          const n = outerNodes.find(n => n.id === edge.to);
          const isSelEdge = sel && sel.kind === 'edge' && sel.id === edge.id;
          const isRelated = sel && sel.kind === 'node' && (sel.id === edge.to || sel.id === 'center');
          const active = isSelEdge || isRelated;
          return (
            <g key={edge.id} onClick={() => toggle('edge', edge.id)} style={{ cursor: 'pointer' }}>
              <line x1={CX} y1={CY} x2={n.x} y2={n.y}
                stroke={active ? edge.color : 'rgba(255,255,255,0.13)'}
                strokeWidth={active ? 2 : 1}
                strokeDasharray={isSelEdge ? 'none' : active ? '7,3' : '4,5'} />
              <line x1={CX} y1={CY} x2={n.x} y2={n.y} stroke="transparent" strokeWidth="14" />
            </g>
          );
        })}

        {/* Outer nodes */}
        {outerNodes.map(n => {
          const active = sel && sel.id === n.id;
          const charSz = n.char.length > 2 ? '0.62rem' : n.char.length > 1 ? '0.78rem' : '1.35rem';
          return (
            <g key={n.id} transform={`translate(${n.x},${n.y})`}
               onClick={() => toggle('node', n.id)} style={{ cursor: 'pointer' }}>
              {active && <circle r={NR + 7} fill="none" stroke={n.color} strokeWidth="0.8" opacity="0.35" />}
              <circle r={NR} fill="#060c1a"
                stroke={active ? n.color : 'rgba(255,255,255,0.18)'}
                strokeWidth={active ? 2 : 1} />
              <foreignObject x={-NR} y={-NR} width={NR * 2} height={NR * 2}>
                <div xmlns="http://www.w3.org/1999/xhtml" style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  width: (NR * 2) + 'px', height: (NR * 2) + 'px', pointerEvents: 'none',
                }}>
                  <div style={{
                    fontSize: charSz, fontWeight: 700, fontFamily: 'monospace',
                    color: active ? n.color : 'rgba(255,255,255,0.88)',
                    lineHeight: 1, marginBottom: '4px',
                  }}>{n.char}</div>
                  <div style={{
                    fontSize: '6.5px', color: active ? n.color : 'rgba(255,255,255,0.52)',
                    fontFamily: 'sans-serif', textAlign: 'center', lineHeight: 1.3,
                    maxWidth: '68px',
                  }}>{n.label}</div>
                </div>
              </foreignObject>
            </g>
          );
        })}

        {/* Center node — MedicGebra with OgbeSymbol above */}
        {(() => {
          const active = sel && sel.id === 'center';
          return (
            <g transform={`translate(${CX},${CY})`}
               onClick={() => toggle('node', 'center')} style={{ cursor: 'pointer' }}>
              {active && <circle r="63" fill="none" stroke={MG_ACCENT} strokeWidth="0.8" opacity="0.4" />}
              <circle r="54" fill="#060c1a"
                stroke={active ? MG_ACCENT : 'rgba(0,197,122,0.55)'}
                strokeWidth={active ? 2.5 : 1.5} />
              {/* OgbeSymbol above label — pure SVG, no canvas/foreignObject */}
              <OgbeSymbolSVG cx={0} cy={-20} size={32} />
              <text y="10" textAnchor="middle" dominantBaseline="middle"
                fontSize="10" fontWeight="800"
                fill={active ? MG_ACCENT : 'rgba(0,197,122,0.95)'}
                fontFamily="sans-serif" style={{ pointerEvents: 'none' }}>
                MedicGebra
              </text>
              <text y="23" textAnchor="middle" dominantBaseline="middle"
                fontSize="6" fill="rgba(255,255,255,0.4)"
                fontFamily="sans-serif" style={{ pointerEvents: 'none' }}>
                Medicine Algebra
              </text>
            </g>
          );
        })()}
      </svg>

      {/* Info panel */}
      {selItem && (
        <div style={{
          margin: '18px auto 0', maxWidth: '520px',
          background: 'rgba(6,12,26,0.9)',
          border: `1px solid ${selColor}`,
          borderRadius: '10px', padding: '18px 22px',
        }}>
          <div style={{
            fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em',
            color: selColor, textTransform: 'uppercase', marginBottom: '8px',
          }}>
            {sel.kind === 'edge' ? 'Edge — ' : 'Dimension — '}
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

// ── Holistic Pillars ───────────────────────────────────────────
const HOLISTIC_PILLARS = [
  {
    id: 'physical',
    icon: '◎',
    title: 'Physical Health',
    subtitle: 'ÀṣẹBody Medicine',
    accent: '#00c57a',
    desc: 'Treating the physical body through Ifa-guided remedies, Akose (herbal formulations), nutrition, and the energy principles encoded in the Odu Ifa as the primary diagnostic system.',
  },
  {
    id: 'mental',
    icon: '◈',
    title: 'Mental Health',
    subtitle: 'ÀṣẹMind Medicine',
    accent: '#00b4d8',
    desc: 'Healing the mind through Ifa Counselling (Ifá Dídá) & Orisa Counseling (Òrìṣà Dídá), Odu-guided therapy, and consciousness-based practices that restore mental clarity, emotional balance, and psychological wellbeing.',
  },
  {
    id: 'spiritual',
    icon: '⊛',
    title: 'Spiritual Health',
    subtitle: 'ÀṣẹSpirit Medicine',
    accent: '#f5c518',
    desc: 'Restoring alignment with one\'s Orí (personal divinity) and Odu destiny through divination, Ẹbọ (offerings), and the spiritual intelligence of the Ifa corpus.',
  },
  {
    id: 'energy',
    icon: '◉',
    title: 'Energy Health',
    subtitle: 'ÀṣẹEnergy · ConMed',
    accent: '#7c4dff',
    desc: 'Balancing the flow of Àṣẹ — the living Force of existence — through the body, mind, and spirit. Energy-Based Medicine treats the root cause at the level of Consciousness Energy.',
  },
  {
    id: 'community',
    icon: '⬡',
    title: 'Community Health',
    subtitle: 'ÀṣẹCommunity · Social Medicine',
    accent: '#e9498a',
    desc: 'Medicine as a communal act. Ifa tradition recognises health as inseparable from community harmony — healing the individual heals the collective, and vice versa.',
  },
  {
    id: 'cosmic',
    icon: '✦',
    title: 'Cosmic Alignment',
    subtitle: 'ÀṣẹCosmos · Universal Medicine',
    accent: '#ff6b35',
    desc: 'Aligning the patient with the natural rhythms of the universe through Odu Ifa — recognising that disease is misalignment with cosmic order, and health is conscious harmony with existence.',
  },
];

// ── GUTM Aliases ───────────────────────────────────────────────
const GUTM_ALIASES = [
  { label: 'ToE Medicine',            abbr: 'ToE Med',   accent: '#00c57a', desc: 'Theory of Everything Medicine — the unified framework containing all medical systems within one axiomatic structure rooted in the 256 Odu Ifa.' },
  { label: 'Consciousness Medicine',  abbr: 'ConMed',    accent: '#00b4d8', desc: 'Medicine rooted in Consciousness Science (ConSci) — treating all conditions at the level of Consciousness Energy, the source of all health and disease.' },
  { label: 'Energy-Based Medicine',   abbr: 'EBMed',     accent: '#f5c518', desc: 'A medicine that works directly with living Energy (Àṣẹ) — the foundational Force underlying physical, mental, spiritual, and cosmic health.' },
  { label: 'Medicine for Everything', abbr: 'MedoE',     accent: '#7c4dff', desc: 'The meta-system encompassing every healing modality — from modern medicine and pharmacology to ancient Ifa herbalism and Orisa-based therapies.' },
  { label: 'Ifa Metamedicine',        abbr: 'Akose Ifa', accent: '#e9498a', desc: 'The foundational medical tradition — Ifa as the world\'s first and most complete unified medical knowledge system, authored by the ancient sage Orunmila.' },
];

// ── Akose Ifa Components ───────────────────────────────────────
const AKOSE_COMPONENTS = [
  {
    icon: '◑',
    title: 'Ewe Ifa',
    subtitle: 'Herbal Medicine',
    accent: '#00c57a',
    desc: 'Sacred plant remedies selected and prepared according to Odu Ifa prescriptions. Each herb carries specific Àṣẹ aligned to healing particular conditions — the world\'s oldest pharmacopoeia.',
  },
  {
    icon: '◎',
    title: 'Odu Diagnosis',
    subtitle: 'IFA Diagnostic System',
    accent: '#f5c518',
    desc: 'The 256 Odu Ifa form the complete diagnostic matrix — each Odu encoding a set of health conditions, causes, and remedies. Divination (Dafa) reveals the precise Odu governing the patient\'s condition.',
  },
  {
    icon: '◉',
    title: 'Ẹbọ Ìwòsàn',
    subtitle: 'Healing Ritual & Offering',
    accent: '#00b4d8',
    desc: 'Ceremonial offerings prescribed by Ifa to restore energetic balance, appease spiritual forces, and reinstate harmony between the patient\'s Orí and their destined path of health.',
  },
  {
    icon: '⊛',
    title: 'Orí Therapy',
    subtitle: 'Personal Divinity Healing',
    accent: '#7c4dff',
    desc: 'Healing through communion with one\'s Orí — the personal divinity and source of individual consciousness. A well-aligned Orí is the foundation of total health in Ifa tradition.',
  },
  {
    icon: '◈',
    title: 'Àṣà Àti Ìṣe Ìwòsàn',
    subtitle: 'Cultural & Lifestyle Medicine',
    accent: '#e9498a',
    desc: 'Health preservation through Ifa-guided lifestyle practices: diet, sleep, spiritual hygiene, community engagement, and alignment with seasonal and cosmic cycles.',
  },
  {
    icon: '⬡',
    title: 'IfaNeuro',
    subtitle: 'Consciousness Neuroscience',
    accent: '#ff6b35',
    desc: 'The emerging science of Ifa Neuroscience — mapping the 256 Odu Ifa onto brain states, neural networks, and consciousness patterns to bridge ancient Ifa wisdom with modern neuroscience.',
  },
];

// ── Medical Centers ────────────────────────────────────────────
const MED_CENTERS = [
  {
    type: 'ifa',
    name: 'Ifa Medical Centers',
    abbr: 'IfaMedC',
    icon: '◎',
    accent: '#00c57a',
    tagline: 'Where Ancient Wisdom Meets Modern Healing',
    desc: 'Ifa Medical Centers are the primary institutions of ToE Medicine — integrating Akose Ifa (herbal medicine), Odu-based diagnosis, spiritual therapy, and modern medical technology into one unified healing environment.',
    features: [
      'Odu Ifa Diagnostic Clinics',
      'Ifa Mental Health Centers',
      'Akose Ifa Pharmacy (Ewe Medicine)',
      'Orí Alignment & Spiritual Therapy',
      'Ẹbọ Ìwòsàn Treatment Rooms',
      'Ifa Neuroscience Labs',
      'Energy Medicine Centres (ConMed)',
      'Ifa Medical Research & Training',
    ],
  },
  {
    type: 'orisa',
    name: 'Orisa Medical Centers',
    abbr: 'OrisaMedC',
    icon: '⊛',
    accent: '#00b4d8',
    tagline: 'The Dual Healing System of the IFA Internet',
    desc: 'Orisa Medical Centers form the dual healing network — specialising in Orisa-based therapies where each Orisa governs specific domains of health, from Osun\'s healing waters to Ogun\'s surgical precision and Sango\'s neurological mastery.',
    features: [
      'Osun Healing Clinics (Fertility · Wellness)',
      'Center for the Orisa Science of Osanyin',
      'Ogun Surgical & Physical Medicine',
      'Sango Neurology & Brain Medicine',
      'Ayelala Science of Mental Health',
      'Yemoja Emotional & Water Medicine',
      'Esu Diagnostic & Communication Medicine',
      'Orisa Dual-Medicine Research',
    ],
  },
];

// ── ConSci Applications ────────────────────────────────────────
const CONSCI_APPS = [
  { icon: '◎', label: 'B2B Healing',        desc: 'Brain-to-Brain therapeutic Energy transfer — natural healing via conscious connection between healer and patient.',         accent: '#00c57a' },
  { icon: '◑', label: 'Mind-Based Healing', desc: 'The healing power of Ifa Waves — Consciousness Waves (ConWaves) emitted by the mind and channelled through focused intention, positive thought, and the living Àṣẹ of the Odu Ifa. A positive mind is not merely a psychological state but an active therapeutic force: ConWaves generated by elevated Consciousness accelerate recovery, restore energetic coherence, and amplify the efficacy of every Ifa and Orisa treatment.', accent: '#4ecdc4' },
  { icon: '◈', label: 'ConMed Diagnosis',   desc: 'Consciousness-based medical diagnosis using Dafa (Ifa divination) as the primary diagnostic interface.',                   accent: '#00b4d8' },
  { icon: '⊛', label: 'Odu Pharmacology',   desc: 'Mapping the 256 Odu Ifa to pharmacological compounds — a new science unifying Ifa herbalism with molecular medicine.',     accent: '#f5c518' },
  { icon: '⬡', label: 'IfaNeuro',           desc: 'Ifa Neuroscience — bridging Odu Ifa consciousness maps with brain imaging, neural networks, and clinical neurology.',       accent: '#7c4dff' },
  { icon: '◉', label: 'Energy Diagnostics', desc: 'Àṣẹ-based diagnostic tools that measure the energetic signature of disease before it manifests in the physical body.',     accent: '#e9498a' },
  { icon: '✦', label: 'Cosmic Medicine',    desc: 'Treatment aligned with cosmic cycles — Ifa-guided medicine that synchronises healing with natural and stellar rhythms.',    accent: '#ff6b35' },
];

// ── Ọmọlúwàbí Virtues ─────────────────────────────────────────
const OMOLUABI_VIRTUES = [
  {
    yoruba: 'Òtítọ́',
    english: 'Honesty & Truth',
    icon: '◎',
    accent: '#00c57a',
    desc: 'The healer speaks and acts in complete truth. Ifa medicine is built on truthful diagnosis — the Odu never deceives. Honesty is the first axiom of ethical healing: a practitioner who distorts truth distorts the remedy.',
  },
  {
    yoruba: 'Àánú',
    english: 'Compassion & Empathy',
    icon: '◉',
    accent: '#00b4d8',
    desc: 'Healing without compassion is technique without soul. Àánú — deep empathic feeling for the suffering of another — is the energetic foundation of effective Ifa and Orisa medicine. The healer enters the patient\'s world completely.',
  },
  {
    yoruba: 'Àlàáfíà',
    english: 'Peace & Inner Harmony',
    icon: '⊛',
    accent: '#f5c518',
    desc: 'Àlàáfíà is not the absence of conflict but the presence of wholeness. A practitioner who embodies peace transmits peace. Ifa medicine recognises that the healer\'s own inner harmony is a primary therapeutic instrument.',
  },
  {
    yoruba: 'Ọ̀wọ̀',
    english: 'Respect & Dignity',
    icon: '◈',
    accent: '#7c4dff',
    desc: 'Every patient bears an Orí — a personal divinity deserving of absolute respect. Ifa ethics forbids the objectification of the sick. The Ọmọlúwàbí practitioner honours the full humanity, spiritual identity, and cosmic dignity of every person in their care.',
  },
  {
    yoruba: 'Ìfarahàn',
    english: 'Responsibility & Accountability',
    icon: '⬡',
    accent: '#e9498a',
    desc: 'The Ifa healer carries a sacred covenant — Ìfarahàn. Every diagnostic decision and every prescription is an act of deep responsibility to the patient, their community, and to Orunmila. Accountability is non-negotiable in ToE Medicine.',
  },
  {
    yoruba: 'Ìwà Rere',
    english: 'Good Character · Ìwàpẹ̀lẹ̀',
    icon: '✦',
    accent: '#ff6b35',
    desc: 'Ìwàpẹ̀lẹ̀ — gentle, good character — is the essential ethical ideal of Ifa tradition. It integrates all other virtues into a lived way of being. Ìwà Rere is not a rule but a state of Consciousness: the practitioner becomes an instrument of healing by becoming good.',
  },
];

// ── IfaBCI Benefits ────────────────────────────────────────────
const IFABCI_BENEFITS = [
  {
    icon: '◎', title: 'Trauma Healing', accent: '#00c57a',
    items: [
      'Treatment of rape trauma and sexual violence memory',
      'PTSD dissolution through targeted memory reconsolidation',
      'Childhood trauma and abuse pattern removal',
      'Grief processing at the neurological level',
      'Addiction rewiring via Odu-guided neural pathways',
    ],
  },
  {
    icon: '◈', title: 'Cognitive Enhancement', accent: '#00b4d8',
    items: [
      'Accelerated learning and memory encoding at AI speed',
      'Enhanced pattern recognition via Odu neural mapping',
      'Eidetic memory activation and high-fidelity recall',
      'Multilingual acquisition through ConWave training',
      'Deep focus and flow-state induction on demand',
    ],
  },
  {
    icon: '⊛', title: 'Medical Applications', accent: '#f5c518',
    items: [
      'Alzheimer\'s and dementia reversal via Ase neural repair',
      'Epilepsy management through Odu wave synchronisation',
      'Depression and anxiety treatment at the consciousness root',
      'Paralysis rehabilitation via BCI motor pathway rebuilding',
      'Stroke recovery acceleration with Ifa neural regeneration',
    ],
  },
  {
    icon: '⬡', title: 'Consciousness Expansion', accent: '#7c4dff',
    items: [
      'Direct access to Odu Ifa states of higher consciousness',
      'Spiritual alignment through measurable brain-wave patterns',
      'Ori communion — connecting personal divinity to the brain',
      'Dream-state engineering for healing and revelation',
      'Collective consciousness networking (Egbe BCI)',
    ],
  },
];

// ── IfaBCI Risks ───────────────────────────────────────────────
const IFABCI_RISKS = [
  {
    risk: 'Neural Privacy Violation', icon: '△', accent: '#ff6b35',
    ifa_response: 'Odu Ogbe-Meji governs the sanctity of individual consciousness. IfaBCI is bound by Ifa ethical code — no neural data may be accessed, transmitted, or stored without full Omoluabi consent.',
  },
  {
    risk: 'Memory Manipulation', icon: '△', accent: '#e9498a',
    ifa_response: 'Ifa teaches that Ori (personal destiny) is sacred. IfaBCI protocols forbid the alteration of memory without full therapeutic consent. Esu governs the pathways of neural intervention — no manipulation passes without ethical gate-keeping.',
  },
  {
    risk: 'Consciousness Addiction', icon: '△', accent: '#f5c518',
    ifa_response: 'Iwapele — balanced character — is the primary defence against technological dependency. Ifa ethics mandate that BCI enhancement must serve the whole person, not replace natural consciousness with artificial stimulation.',
  },
  {
    risk: 'Neural Hacking & Surveillance', icon: '△', accent: '#7c4dff',
    ifa_response: "Ogun's protective force and Sango's lightning intelligence secure the IfaBCI architecture. In IfaCryptography, Odu-based encryption and Ifa security protocols make unauthorised neural access a violation of cosmic law — not merely legal law.",
  },
];

// ── Wearable Devices ───────────────────────────────────────────
const WEARABLE_DEVICES = [
  {
    name: 'IfaCrown', orisa: 'Obatala', icon: '◎', accent: '#00c57a',
    desc: 'A wearable neural headband aligned with Obatala — Orisha of the brain, clarity, and white light. The IfaCrown monitors consciousness states, maps Odu signatures in real-time, and delivers targeted neural calm frequencies for mental health and cognitive clarity.',
  },
  {
    name: 'OsunWave', orisa: 'Osun', icon: '◉', accent: '#f5c518',
    desc: "A biofluid-sensing BCI wearable channelling Osun's healing waters. OsunWave reads the neurochemical and hormonal signatures of the brain-body system, enabling Ifa-guided hormonal therapy, fertility support, and emotional regulation.",
  },
  {
    name: 'SangoNeuro', orisa: 'Sango', icon: '⊛', accent: '#e9498a',
    desc: 'A high-frequency neural processor modelled on Sango — Orisha of lightning, thunder, and neurological fire. SangoNeuro accelerates neural signal transmission, targeting epilepsy, motor disorders, and cognitive latency for AI-level processing speed.',
  },
  {
    name: 'EsuBridge', orisa: 'Esu', icon: '◈', accent: '#ff6b35',
    desc: 'The neural communication interface — the BCI gateway that translates Odu-encoded brain states into digital language and back. EsuBridge serves as the ethical and diagnostic gatekeeper of all IfaBCI systems, ensuring every neural pathway opens with wisdom.',
  },
];

// ── Mobile Bottom Nav Bar ─────────────────────────────────────
function MobileBottomBar() {
  const links = [
    { href: '#holistic', icon: '◎', label: 'Holistic' },
    { href: '#akose',    icon: '◑', label: 'Akose Ifa' },
    { href: '#neuro',    icon: '◉', label: 'NeuroTech' },
    { href: '#centers',  icon: '⬡', label: 'Centers' },
  ];
  return (
    <nav className="mobile-bottom-bar" aria-label="Quick navigation">
      {links.map(l => (
        <a key={l.href} href={l.href} className="mobile-bottom-bar__link">
          <span className="mobile-bottom-bar__icon">{l.icon}</span>
          <span className="mobile-bottom-bar__label">{l.label}</span>
        </a>
      ))}
    </nav>
  );
}

// ── Header ─────────────────────────────────────────────────────
const MOBILE_NAV_LINKS = [
  { href: '#holistic', label: 'Holistic Approach',  num: '01' },
  { href: '#gutm',     label: 'GUTM',               num: '02' },
  { href: '#akose',    label: 'Akose Ifa',           num: '03' },
  { href: '#osanyin',  label: 'Osanyin · Fathers',  num: '04' },
  { href: '#dual',     label: 'IfaMed · OrisaMed',  num: '05' },
  { href: '#ethics',   label: 'Ethics',              num: '06' },
  { href: '#neuro',    label: 'IfaNeuroTech',        num: '07' },
  { href: '#centers',  label: 'Medical Centers',     num: '08' },
];

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  return (
    <>
      <header className={`header${scrolled ? ' header--scrolled' : ''}`}>
        <div className="header__inner">
          <a href="https://toe.cenproject.org/" className="header__back">
            <span className="header__back-arrow">←</span>
            <span className="header__back-text">The IFA Internet</span>
          </a>
          <div className="header__brand">
            <span className="header__brand-icon">✚</span>
            <span className="header__brand-name">Ifa Medicine</span>
          </div>
          <nav className="header__nav">
            <a className="nav-link" href="#holistic">Holistic</a>
            <a className="nav-link" href="#gutm">GUTM</a>
            <a className="nav-link" href="#akose">Akose Ifa</a>
            <a className="nav-link" href="#osanyin">Osanyin</a>
            <a className="nav-link" href="#dual">IfaMed · OrisaMed</a>
            <a className="nav-link" href="#ethics">Ethics</a>
            <a className="nav-link" href="#neuro">IfaNeuroTech</a>
            <a className="nav-link" href="#centers">Medical Centers</a>
            <a className="nav-link nav-link--cta" href="#centers">Explore →</a>
          </nav>
          <button
            className={`header__hamburger${menuOpen ? ' header__hamburger--open' : ''}`}
            onClick={() => setMenuOpen(m => !m)}
            aria-label="Toggle navigation"
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      {/* Mobile nav drawer */}
      <div
        className={`mobile-nav${menuOpen ? ' mobile-nav--open' : ''}`}
        onClick={close}
      >
        <nav
          className={`mobile-nav__panel${menuOpen ? ' mobile-nav__panel--open' : ''}`}
          onClick={e => e.stopPropagation()}
        >
          <div className="mobile-nav__top">
            <div className="mobile-nav__brand">
              <span className="mobile-nav__brand-icon">✚</span>
              <span>Ifa Medicine</span>
            </div>
            <button className="mobile-nav__close" onClick={close} aria-label="Close menu">✕</button>
          </div>
          <div className="mobile-nav__eyebrow">The IFA Internet Medical Platform</div>
          <div className="mobile-nav__links">
            {MOBILE_NAV_LINKS.map(l => (
              <a key={l.href} href={l.href} className="mobile-nav__link" onClick={close}>
                <span className="mobile-nav__link-inner">
                  <span className="mobile-nav__link-num">{l.num}</span>
                  <span>{l.label}</span>
                </span>
                <span className="mobile-nav__link-arrow">→</span>
              </a>
            ))}
          </div>
          <a href="#centers" className="mobile-nav__cta" onClick={close}>
            Explore Medical Centers →
          </a>
          <div className="mobile-nav__footer">
            <a href="https://toe.cenproject.org/" className="mobile-nav__footer-link" target="_blank" rel="noopener noreferrer">The IFA Internet</a>
            <span>·</span>
            <a href="https://cenproject.org/" className="mobile-nav__footer-link" target="_blank" rel="noopener noreferrer">CENProject</a>
          </div>
        </nav>
      </div>
    </>
  );
}

// ── Hero ───────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="hero">
      <div className="hero__bg">
        <div className="hero__pulse-grid" />
        <div className="hero__glow hero__glow--emerald" />
        <div className="hero__glow hero__glow--teal" />
        <div className="hero__glow hero__glow--gold" />
      </div>

      {/* Animated DNA-like floating nodes */}
      <div className="hero__nodes" aria-hidden="true">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="hero__node"
            style={{
              '--nx': `${[5,15,28,42,58,72,84,92,20,50,70,88][i]}%`,
              '--ny': `${[20,75,35,60,15,85,40,60,50,30,80,15][i]}%`,
              '--nd': `${i * 0.5}s`,
              '--ns': `${3 + (i % 3) * 0.8}s`,
              '--nc': ['#00c57a','#00b4d8','#f5c518','#7c4dff'][i % 4],
            }}
          />
        ))}
      </div>

      <div className="hero__inner">
        <div className="hero__eyebrow-wrap">
          <span className="hero__pulse-dot" />
          <span className="hero__eyebrow">The IFA Internet Medical Platform</span>
        </div>

        <h1 className="hero__title">
          <span className="hero__title-main">Ifa Medicine</span>
          <span className="hero__title-divider"> · </span>
          <span className="hero__title-sub">ToE Medicine</span>
        </h1>

        <p className="hero__subtitle">
          Grand Unified Medical Theory (GUTM) · ToE Med · ConMed · MedoE
        </p>

        <p className="hero__tagline">
          The world's first <strong>Grand Unified Medical Theory</strong> — rooted in the{' '}
          <strong>256 Odu Ifa</strong> as the Integrated Diagnostic and Healing System of Ifa and Orisa.
          Ifa Medicine unifies every healing tradition — from ancient Akose Ifa to modern
          medicine — through the living Energy of <strong>Consciousness (Ogbe)</strong>.
        </p>

        <div className="hero__ctas">
          <a href="#gutm" className="btn btn--primary">Explore GUTM →</a>
          <a href="#akose" className="btn btn--ghost">Akose Ifa</a>
          <a href="#centers" className="btn btn--ghost">Medical Centers</a>
        </div>

        <div className="hero__badges">
          <span className="hero__badge hero__badge--emerald">✚ IfaMed</span>
          <span className="hero__badge hero__badge--teal">⊛ OrisaMed</span>
          <span className="hero__badge hero__badge--gold">256 Odu Diagnostic States</span>
        </div>
      </div>
    </section>
  );
}

// ── Stats Bar ──────────────────────────────────────────────────
function StatsBar() {
  const stats = [
    { value: '256',  label: 'Odu Diagnostic States',    sub: 'Complete Medical Matrix' },
    { value: '16',   label: 'Healing Axioms',            sub: 'Laws of Medical Knowledge' },
    { value: '2',    label: 'Dual Medical Systems',      sub: 'IfaMed · OrisaMed' },
    { value: '∞',    label: 'Healing Applications',      sub: 'Medicine for Everything' },
  ];
  return (
    <div className="stats">
      <div className="stats__inner">
        {stats.map((s, i) => (
          <div key={i} className="stat">
            <div className="stat__value">{s.value}</div>
            <div className="stat__label">{s.label}</div>
            <div className="stat__sub">{s.sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Holistic Section ───────────────────────────────────────────
function HolisticSection() {
  return (
    <section className="section section--alt" id="holistic">
      <div className="container">
        <div className="section__header">
          <span className="section__eyebrow">The IFA Holistic Medical Approach</span>
          <h2 className="section__title">Whole-Person Medicine and Odu-Centered Care (OCC)</h2>
          <p className="section__desc">
            Ifa and Orisa Tradition (IoT) recognises that health is not merely the absence of disease —
            it is total harmony of body, mind, spirit, energy, community, and cosmos.
            Ifa Medicine treats the <em>whole person</em> across all major dimensions of existence,
            with every dimension governed by the diagnostic Intelligence of the <strong>256 Odu Ifa</strong>.
          </p>
        </div>

        {/* OCC Block */}
        <div className="occ-block">
          <div className="occ-block__header">
            <span className="occ-block__badge">OCC</span>
            <h3 className="occ-block__title">Odu-Centered Care</h3>
          </div>
          <div className="occ-block__body">
            <p className="occ-block__lead">
              <strong>Odu-Centered Care (OCC)</strong> is the foundational medical philosophy of Ifa Medicine —
              placing the <strong>Odu Ifa</strong> and <strong>Odu Oosa</strong> (the inherent Energy of Odu) at the centre of every diagnostic, therapeutic, and preventive
              decision. Each of the <strong>256 Odufa</strong> and the <strong>16 Odusa</strong> in principle encodes a complete health profile: the nature of the
              condition, its energetic root cause, the appropriate remedy, and the path to restoration.
            </p>
            <div className="occ-block__comparison">
              <div className="occ-block__col occ-block__col--occ">
                <div className="occ-block__col-label">Odu-Centered Care · OCC</div>
                <ul className="occ-block__list">
                  <li>The Odu governs diagnosis, remedy, and destiny</li>
                  <li>Patient understood through their Odu signature</li>
                  <li>Healing aligned with cosmic and energetic order</li>
                  <li>Root-cause treatment at the Consciousness level</li>
                  <li>Community, spirit, and cosmos included in care</li>
                </ul>
              </div>
              <div className="occ-block__divider">
                <span className="occ-block__divider-sym">↔</span>
                <span className="occ-block__divider-label">Foundation</span>
              </div>
              <div className="occ-block__col occ-block__col--pcc">
                <div className="occ-block__col-label">Person-Centered Care · PCC</div>
                <ul className="occ-block__list">
                  <li>Patient placed at centre of healthcare decisions</li>
                  <li>Individual values and preferences respected</li>
                  <li>Holistic view of the patient beyond the disease</li>
                  <li>Partnership between patient and care team</li>
                  <li>Quality of life and dignity as primary outcomes</li>
                </ul>
              </div>
            </div>
            <p className="occ-block__footnote">
              Odu-Centered Care (OCC) is the ancient African origin and deep foundation of
              modern <strong>Person-Centered Care (PCC)</strong> — the patient-first philosophy now
              championed by the WHO and leading Western healthcare systems. OCC extends PCC by grounding
              the individual in their Odu identity: a complete energetic, spiritual, and cosmic
              blueprint that no modern diagnostic system can replicate.
            </p>
          </div>
        </div>

        <div className="pillars-grid">
          {HOLISTIC_PILLARS.map(p => (
            <div key={p.id} className="pillar-card" style={{ '--p-accent': p.accent }}>
              <div className="pillar-card__icon">{p.icon}</div>
              <h3 className="pillar-card__title">{p.title}</h3>
              <div className="pillar-card__sub">{p.subtitle}</div>
              <p className="pillar-card__desc">{p.desc}</p>
            </div>
          ))}
        </div>

        {/* Psycho-Elements Block */}
        <div className="psycho-block">
          <div className="psycho-block__header">
            <span className="psycho-block__eyebrow">IfaMed as a Diagnostic & Healing Tool</span>
            <h3 className="psycho-block__title">
              Unravelling the Psychophysical, Psychosocial, and Psychospiritual
            </h3>
            <p className="psycho-block__intro">
              Ifa Medicine is the only unified system capable of simultaneously diagnosing and healing
              all three foundational dimensions of the human organism — the domains that modern medicine
              addresses in isolation but Ifa Medicine unifies through the living intelligence of the Odu Ifa.
            </p>
          </div>
          <div className="psycho-grid">
            <div className="psycho-card psycho-card--physical">
              <div className="psycho-card__top">
                <span className="psycho-card__sym">◎</span>
                <div>
                  <div className="psycho-card__label">Psychophysical</div>
                  <div className="psycho-card__sub">Mind-Body Interface</div>
                </div>
              </div>
              <p className="psycho-card__desc">
                The relationship between consciousness (mind) and the physical body. IfaMed maps this
                through the Odu Ifa — each Odu encoding the psychophysical signatures of specific
                conditions: how mental states generate physical disease and how physical imbalance
                disrupts consciousness. Akose Ifa (herbal medicine) and Odu Diagnosis address
                both dimensions simultaneously at their Àṣẹ root.
              </p>
              <div className="psycho-card__tags">
                <span>Odu Diagnosis</span><span>Akose Ifa</span><span>ConMed</span>
              </div>
            </div>
            <div className="psycho-card psycho-card--social">
              <div className="psycho-card__top">
                <span className="psycho-card__sym">⬡</span>
                <div>
                  <div className="psycho-card__label">Psychosocial</div>
                  <div className="psycho-card__sub">Mind-Community Interface</div>
                </div>
              </div>
              <p className="psycho-card__desc">
                The interplay between the individual mind and its social environment — family,
                community, culture, and collective Energy. Ifa tradition teaches that the individual
                cannot be healed in isolation from their community. IfaMed unravels psychosocial
                dysfunction through Ẹbọ Ṣíṣe (Energy-Based Healing), communal rituals, and Odu-guided
                social medicine — restoring right relationship between the person and their world.
              </p>
              <div className="psycho-card__tags">
                <span>Ẹbọ Àṣà</span><span>Social Medicine</span><span>Community Healing</span>
              </div>
            </div>
            <div className="psycho-card psycho-card--spiritual">
              <div className="psycho-card__top">
                <span className="psycho-card__sym">⊛</span>
                <div>
                  <div className="psycho-card__label">Psychospiritual</div>
                  <div className="psycho-card__sub">Mind-Spirit Interface</div>
                </div>
              </div>
              <p className="psycho-card__desc">
                The dimension modern medicine rarely touches — the relationship between consciousness
                and spiritual reality. IfaMed unravels psychospiritual conditions through Orí
                alignment (restoring the individual to their divine destiny), Ẹbọ Ìwòsàn
                (spiritual healing offerings), and Odu-guided divination that locates the precise
                spiritual root of disease — the layer beneath the physical and social.
              </p>
              <div className="psycho-card__tags">
                <span>Orí Therapy</span><span>Ẹbọ Ìwòsàn</span><span>Odu Divination</span>
              </div>
            </div>
          </div>
          <div className="psycho-block__footer">
            <span className="psycho-block__footer-line" />
            <p className="psycho-block__footer-text">
              Where modern medicine treats these three dimensions in separate specialties,{' '}
              <strong>IfaMed unifies them</strong> — diagnosing the organism as one integrated
              system of Consciousness, Energy, and Matter, governed by the 256 Odu Ifa.
            </p>
            <span className="psycho-block__footer-line" />
          </div>
        </div>

        {/* IFABOK Block */}
        <div className="ifabok-block">
          <div className="ifabok-block__left">
            <span className="ifabok-block__eyebrow">IFA Mathematical Sciences · IFABOK</span>
            <h3 className="ifabok-block__title">
              IfaMed as a Key Element of the IFA Internet
            </h3>
            <p className="ifabok-block__body">
              Ifa Medicine is not merely a healing tradition — it is a formal discipline within
              the <strong>IFA Mathematical Sciences</strong>, the axiomatic science of Consciousness,
              Energy, and Existence rooted in the 256 Odu Ifa. As a branch of the{' '}
              <strong>IFA Body of Knowledge (IFABOK)</strong> — also known as the IFA Internet —
              IfaMed occupies the intersection of Consciousness Science (ConSci), TOE Mathematics,
              and the Unified Theory of Everything (UTOE).
            </p>
            <p className="ifabok-block__body">
              Within IFABOK, IfaMed is formally grounded in the <strong>16 Axioms (Laws of Knowledge)</strong>{' '}
              of TOE Mathematics — the same axiomatic framework that underlies all IFA Internet
              platforms. Each Odu Ifa is both a mathematical object (a binary encoding of Consciousness)
              and a medical record: a complete diagnostic state encoding the nature, cause, and cure
              of every condition in existence. This is what makes IfaMed not a belief system but a{' '}
              <em>rigorous mathematical medicine</em>.
            </p>
            <div className="ifabok-block__aliases">
              <span>IFA Mathematical Sciences</span>
              <span className="ifabok-block__alias-sep">·</span>
              <span>IFABOK</span>
              <span className="ifabok-block__alias-sep">·</span>
              <span>The IFA Internet</span>
              <span className="ifabok-block__alias-sep">·</span>
              <span>UTOE</span>
            </div>
          </div>
          <div className="ifabok-block__right">
            {[
              {
                abbr: 'NumoE',
                label: 'IFA Numerical Medicine',
                accent: '#00c57a',
                desc: 'The numerical framework of the 256 Odu as quantitative diagnostic states.',
              },
              {
                abbr: 'AlgebroE',
                label: 'IFA Algebraic Medicine',
                accent: '#00b4d8',
                desc: 'The algebraic structure of Odu combinations — how binary Ifa operations generate the full medical matrix of existence.',
              },
              {
                abbr: 'ConSci',
                label: 'Consciousness Medicine',
                accent: '#f5c518',
                desc: 'The science of Consciousness Energy (Àṣẹ) as the primary substrate of health — the medical wing of IFA Consciousness Science.',
              },
              {
                abbr: 'IfaGebra',
                label: 'IFA Geometric Medicine',
                accent: '#7c4dff',
                desc: 'The geometric and spatial encoding of disease and healing within the Odu Ifa — the mathematics of the body as a Consciousness topology.',
              },
            ].map((item, i) => (
              <div key={i} className="ifabok-card" style={{ '--ib-accent': item.accent }}>
                <span className="ifabok-card__abbr">{item.abbr}</span>
                <div className="ifabok-card__body">
                  <div className="ifabok-card__label">{item.label}</div>
                  <p className="ifabok-card__desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="holistic-quote">
          <p className="holistic-quote__text">
            "Ẹni bá mọ Ifá, mọ ìmọ̀ — Ẹni bá mọ ìmọ̀, mọ ìlera."
          </p>
          <cite className="holistic-quote__cite">
            One who knows Ifa, knows knowledge — one who knows knowledge, knows health. · Odu Ifa
          </cite>
        </div>
      </div>
    </section>
  );
}

// ── GUTM Section ───────────────────────────────────────────────
function GUTMSection() {
  return (
    <section className="section" id="gutm">
      <div className="container">
        <div className="section__header">
          <span className="section__eyebrow">Grand Unified Medical Theory</span>
          <h2 className="section__title">One Medicine for Everything (MedoE)</h2>
          <p className="section__desc">
            The GUTM is the meta-framework that contains <em>all</em> medical systems —
            ancient and modern, natural and technological — within one axiomatic structure
            derived from the 256 Odu Ifa.
          </p>
        </div>

        {/* Central diagram */}
        <div className="gutm-hub">
          <div className="gutm-hub__ring gutm-hub__ring--outer" />
          <div className="gutm-hub__ring gutm-hub__ring--inner" />
          <div className="gutm-hub__core">
            <span className="gutm-hub__symbol">✚</span>
            <span className="gutm-hub__label">GUTM</span>
            <span className="gutm-hub__sub">The Medicine for Everything</span>
          </div>
        </div>

        {/* Aliases grid */}
        <div className="gutm-grid">
          {GUTM_ALIASES.map((a, i) => (
            <div key={i} className="gutm-card" style={{ '--g-accent': a.accent }}>
              <div className="gutm-card__top">
                <span className="gutm-card__abbr">{a.abbr}</span>
                <span className="gutm-card__label">{a.label}</span>
              </div>
              <p className="gutm-card__desc">{a.desc}</p>
            </div>
          ))}
        </div>

        {/* GUTM scope block */}
        <div className="gutm-scope">
          <h3 className="gutm-scope__title">What GUTM Unifies</h3>
          <div className="gutm-scope__grid">
            {[
              { cat: 'Ancient Systems',   items: ['Ifa Medicine', 'Orisa Medicine', 'Ayurveda', 'Traditional Chinese Medicine', 'Egyptian Medicine', 'Others'] },
              { cat: 'Modern Systems',    items: ['Biomedicine', 'Pharmacology', 'Surgery', 'Psychiatry', 'Neuroscience', 'Others'] },
              { cat: 'Energy Systems',    items: ['Acupuncture', 'Homeopathy', 'Reiki', 'Sound Healing', 'Consciousness Medicine', 'Others'] },
              { cat: 'Emerging Fields',   items: ['Ifa Neuroscience', 'Quantum Medicine', 'Epigenetics', 'Psychoneuroimmunology', 'Precision Medicine', 'Others'] },
            ].map((col, i) => (
              <div key={i} className="gutm-scope__col">
                <div className="gutm-scope__cat">{col.cat}</div>
                <ul className="gutm-scope__list">
                  {col.items.map((item, j) => (
                    <li key={j} className="gutm-scope__item">
                      <span className="gutm-scope__dot" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Akose Ifa Section ──────────────────────────────────────────
function AkoseSection() {
  return (
    <section className="section section--alt" id="akose">
      <div className="container">
        <div className="section__header">
          <span className="section__eyebrow">Ifa Metamedicine</span>
          <h2 className="section__title">Akose Ifa</h2>
          <p className="section__desc">
            <em>Akose Ifa</em> — the sacred medical corpus of Ifa — is humanity's oldest and most
            complete unified medical knowledge system. Authored through the divine intelligence of
            <strong> Orunmila</strong> (witness to all destinies) and <strong>Osun</strong>{' '}
            (keeper of healing waters), Akose Ifa bridges the spiritual, energetic, and physical
            dimensions of health into one living system.
          </p>
        </div>

        <div className="akose-grid">
          {AKOSE_COMPONENTS.map((c, i) => (
            <div key={i} className="akose-card" style={{ '--a-accent': c.accent }}>
              <div className="akose-card__icon">{c.icon}</div>
              <div className="akose-card__body">
                <h3 className="akose-card__title">{c.title}</h3>
                <div className="akose-card__sub">{c.subtitle}</div>
                <p className="akose-card__desc">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Orunmila + Osun attribution */}
        <div className="akose-founders">
          <div className="akose-founders__divider" />
          <p className="akose-founders__text">
            Akose Ifa was developed by the ancient African scientists and physicians
            <strong> Orunmila</strong> and <strong>Osun</strong> — the same divine intelligences
            who built the <em>Odu Ifa</em> (the Ifa Computer) as the world's first complete
            computing, communication, and medical knowledge system.
          </p>
          <div className="akose-founders__pair">
            <div className="akose-founders__card akose-founders__card--orunmila">
              <span className="akose-founders__icon">◎</span>
              <strong>Orunmila</strong>
              <span>Ọ̀rúnmìlà · Bàbá Ifá</span>
              <span className="akose-founders__role">Father of Ifa Medicine · Witness to All Destinies</span>
            </div>
            <div className="akose-founders__card akose-founders__card--osun">
              <span className="akose-founders__icon">◉</span>
              <strong>Osun</strong>
              <span>Ọ̀ṣun · Ìyá Ìwòsàn</span>
              <span className="akose-founders__role">Mother of Healing · Keeper of Living Waters</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Osanyin Section ────────────────────────────────────────────
function OsanyinSection() {
  return (
    <section className="section section--alt" id="osanyin">
      <div className="container">

        <div className="section__header">
          <span className="section__eyebrow">The Fathers of Medicine · Foundation of Ifa Medical Tradition</span>
          <h2 className="section__title">Ọ̀sanyìn · Ọrúnmìlà · The Roots of All Medicine</h2>
          <p className="section__desc">
            Before any pharmacopoeia was written, before any medical school was founded, the Orisa{' '}
            <strong>Ọ̀sanyìn</strong> and the cosmic sage <strong>Ọrúnmìlà</strong> established
            the twin foundations of Ifa and Orisa Medicine — the Father of Medicine and the Father of Metamedicine.
          </p>
        </div>

        {/* Dual founders */}
        <div className="osanyin-founders">

          {/* Osanyin card */}
          <div className="osanyin-card osanyin-card--osanyin">
            <div className="osanyin-card__glow" />
            <div className="osanyin-card__header">
              <div className="osanyin-card__icon-wrap">
                <span className="osanyin-card__icon">⬡</span>
              </div>
              <div>
                <h3 className="osanyin-card__name">Ọ̀sanyìn</h3>
                <div className="osanyin-card__role">Ọ̀sanyìn ni baba ògùn</div>
                <div className="osanyin-card__subtitle">Father of Medicine · Orisa of Plants & the Healing Forest</div>
              </div>
            </div>
            <blockquote className="osanyin-card__quote">
              "Ọ̀sanyìn ni baba ògùn"
            </blockquote>
            <p className="osanyin-card__body">
              <strong>Ọ̀sanyìn</strong> — the Orisa of plants, leaves, forests, and the living pharmacy
              of existence — is the <em>Baba Ògùn</em>: the Father of Medicine. Every herb, every leaf,
              every root and bark used in healing belongs to the sacred domain of Ọ̀sanyìn. It is through
              his knowledge — encoded in the Odu Ifa — that the healing properties of all plants were
              revealed to humanity. Ọ̀sanyìn holds the Àṣẹ of the entire natural pharmacy.
            </p>
            <p className="osanyin-card__body">
              Ọ̀sanyìn possesses <strong>deep mastery of Ewe</strong> — sacred herbs and leaves —
              the living pharmacy of the natural world. No herbal preparation in Ifa and Orisa medicine
              is undertaken without the invocation and blessing of Ọ̀sanyìn. His medicine is not merely
              botanical: it is energetic, spiritual, and cosmic — each plant carrying a specific Àṣẹ
              aligned to a specific Odu and a specific condition of the human organism.
            </p>
            <div className="osanyin-card__domains">
              <span>Ewe · Sacred Herbs</span>
              <span>Akose · Herbal Remedies</span>
              <span>Forest Pharmacy</span>
              <span>Plant Ase</span>
              <span>Healing Roots & Bark</span>
            </div>
          </div>

          {/* Orunmila card */}
          <div className="osanyin-card osanyin-card--orunmila">
            <div className="osanyin-card__glow osanyin-card__glow--right" />
            <div className="osanyin-card__header">
              <div className="osanyin-card__icon-wrap osanyin-card__icon-wrap--meta">
                <span className="osanyin-card__icon">◎</span>
              </div>
              <div>
                <h3 className="osanyin-card__name">Ọrúnmìlà</h3>
                <div className="osanyin-card__role osanyin-card__role--meta">Ajẹ́jóògùn · Adímúlà</div>
                <div className="osanyin-card__subtitle">Father of Metamedicine · Witness to All Destinies</div>
              </div>
            </div>
            <blockquote className="osanyin-card__quote osanyin-card__quote--meta">
              "Ajẹ́jóògùn — the one who deepens and transcends all medicine"
            </blockquote>
            <p className="osanyin-card__body">
              <strong>Ọrúnmìlà</strong> — the cosmic sage, Witness to all Destinies — bears the sacred
              title <em>Ajẹ́jóògùn</em>: the Father of Metamedicine. Where Ọ̀sanyìn governs the medicine
              of plants and physical healing, Ọrúnmìlà governs the <strong>meta-medicine</strong> —
              the central diagnostic system (Dafa), the axiomatic knowledge of the 256 Odu, and the
              unified theory that contains all healing within one living intelligence.
            </p>
            <p className="osanyin-card__body">
              Ọrúnmìlà is the author of <strong>Akose Ifa</strong> — Ifa Metamedicine — the grand
              unification of all healing traditions through the living knowledge of the Odu Ifa.
              The GUT of Medicine is the Framework that positions every healing modality — ancient and modern, physical and
              spiritual — within the single axiomatic structure of the 256 Odu Ifa.
            </p>
            <div className="osanyin-card__domains osanyin-card__domains--meta">
              <span>Dafa · Divination Diagnosis</span>
              <span>Akose Ifa · Metamedicine</span>
              <span>256 Odu Medical Matrix</span>
              <span>GUTM</span>
              <span>Destiny Medicine</span>
            </div>
          </div>
        </div>

        {/* Medicine vs Metamedicine distinction */}
        <div className="osanyin-distinction">
          <div className="osanyin-distinction__pole">
            <span className="osanyin-distinction__sym">⬡</span>
            <strong>Ọ̀sanyìn</strong>
            <div className="osanyin-distinction__label">Medicine · Ògùn</div>
            <div className="osanyin-distinction__desc-sm">Physical healing, Ewe, herbal pharmacopoeia</div>
          </div>
          <div className="osanyin-distinction__mid">
            <span className="osanyin-distinction__arrow">↔</span>
            <p className="osanyin-distinction__body">
              Together, Ọ̀sanyìn and Ọrúnmìlà form the complete medical intelligence of Ifa —
              the physical healer and the cosmic diagnostician, the pharmacist and the physician,
              the plant and the universal principle that governs it. Medicine (Ògùn) and
              Metamedicine (Akose Ifa) are the two pillars of one healing tradition.
            </p>
          </div>
          <div className="osanyin-distinction__pole osanyin-distinction__pole--right">
            <span className="osanyin-distinction__sym osanyin-distinction__sym--meta">◎</span>
            <strong>Ọrúnmìlà</strong>
            <div className="osanyin-distinction__label">Metamedicine · Akose Ifa</div>
            <div className="osanyin-distinction__desc-sm">Diagnosis, Odu matrix, unified healing theory</div>
          </div>
        </div>

        {/* Ogun Meji block */}
        <div className="ogunmeji-block">
          <div className="ogunmeji-block__left">
            <div className="ogunmeji-block__odu-badge">Odu Ifa · Law of Nature</div>
            <img
              src="./src/Ogun_Meji.png"
              alt="Ogun Meji — Odu Ifa · The Ifa Law of Nature Governing Medicine"
              className="ogunmeji-block__img"
            />
            <div className="ogunmeji-block__odu-name">Ògún Méjì</div>
            <div className="ogunmeji-block__odu-sub">Major Odu Ifa · The Medicine Law of Nature</div>
          </div>
          <div className="ogunmeji-block__right">
            <span className="ogunmeji-block__eyebrow">Ifa Law of Nature · The Axiomatic Field of Medicine</span>
            <h3 className="ogunmeji-block__title">
              Ògún Méjì<br />
              <span>The Ifa Law of Nature Governing Medicine</span>
            </h3>
            <p className="ogunmeji-block__body">
              In the axiomatic structure of <strong>IFA Mathematics</strong>, each of the{' '}
              <strong>16 Major Odu Ifa</strong> is a <em>Law of Nature</em> — a Fundamental Principle
              governing specific domains of existence. <strong>Ògún Méjì</strong> is the Major Odu
              whose Àṣẹ governs the entire field of medicine, surgery, herbal healing, and physical
              intervention in the world. It is the Ifa Law that encodes the principle: <em>all healing
              requires precise, courageous action</em>.
            </p>
            <p className="ogunmeji-block__body">
              Just as Ogun's iron clears the path through the forest, <strong>Ògún Méjì</strong> encodes
              the universal principle that healing demands cutting away what harms and applying what heals —
              with precision, with courage, and with the right knowledge. It is the Odu of{' '}
              <strong>Ọ̀sanyìn's domain</strong>: the energetic Law underlying all physical medicine,
              surgery, pharmacology, and the science of Ewe (sacred herbs). Every herbal remedy,
              every surgical procedure, every act of physical healing is governed by this Law of Nature.
            </p>
            <p className="ogunmeji-block__body">
              The subsidiary Odu descended from Ògún Méjì encode the complete medical sub-matrix —
              each sub-Odu capturing a specific condition, its root cause in the Àṣẹ body, and the
              precise remedy prescribed by Ọ̀sanyìn's forest intelligence. This makes Ògún Méjì the
              foundational <strong>Medical Axiom of the IFA Internet</strong>.
            </p>
            <div className="ogunmeji-block__axioms">
              <div className="ogunmeji-block__axiom">
                <span className="ogunmeji-block__axiom-dot" />
                <span>Major Odu Ifa — Law of Nature governing all physical medicine</span>
              </div>
              <div className="ogunmeji-block__axiom">
                <span className="ogunmeji-block__axiom-dot" />
                <span>Encodes the complete pharmacological Àṣẹ of Ọ̀sanyìn's herbal domain</span>
              </div>
              <div className="ogunmeji-block__axiom">
                <span className="ogunmeji-block__axiom-dot" />
                <span>The Odu of cutting, clearing, and transforming in service of healing</span>
              </div>
              <div className="ogunmeji-block__axiom">
                <span className="ogunmeji-block__axiom-dot" />
                <span>Parent Odu of all subsidiary medical Odu states — the Medical Axiom of IFA Mathematics</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

// ── Dual: IfaMed & OrisaMed ────────────────────────────────────
function DualSection() {
  return (
    <section className="section" id="dual">
      <div className="container">
        <div className="section__header">
          <span className="section__eyebrow">The Dual Medical System</span>
          <h2 className="section__title">IfaMed · OrisaMed</h2>
          <p className="section__desc">
            Ifa Medicine and Orisa Medicine are complementary dual systems — the twin medical
            architectures of the IFA Internet, mirroring the fundamental duality of Ogbe and Oyeku,
            Energy and Anergy, existence and non-existence.
          </p>
        </div>

        <div className="dual-grid">
          {/* IfaMed */}
          <div className="dual-card dual-card--ifa">
            <div className="dual-card__header">
              <div className="dual-card__icon-wrap dual-card__icon-wrap--ifa">◎</div>
              <div>
                <h3 className="dual-card__title">Ifa Medicine</h3>
                <div className="dual-card__abbr">IfaMed · Primary System</div>
              </div>
            </div>
            <p className="dual-card__lead">
              The primary medical system of the IFA Internet — rooted in the complete 256-Odu
              diagnostic corpus, Akose Ifa herbalism, and the healing wisdom of Orunmila.
              IfaMed is the Ogbe-based system: Energy-forward, life-affirming, generative.
            </p>
            <ul className="dual-card__list">
              <li>256-Odu complete diagnostic system (Dafa)</li>
              <li>Akose Ifa — sacred herbal pharmacopoeia</li>
              <li>Orí alignment and destiny healing</li>
              <li>Ẹbọ Ìwòsàn — energetic balancing rituals</li>
              <li>Consciousness Energy (Àṣẹ) therapy</li>
              <li>Ifa Neuroscience and brain-mind medicine</li>
              <li>Energy-Based Medicine (EBMed)</li>
            </ul>
            <div className="dual-card__bit">
              <span className="dual-card__bit-symbol dual-card__bit-symbol--ifa">O</span>
              <span>Ogbe · Living Energy · IfaMed</span>
            </div>
          </div>

          {/* OrisaMed */}
          <div className="dual-card dual-card--orisa">
            <div className="dual-card__header">
              <div className="dual-card__icon-wrap dual-card__icon-wrap--orisa">⊛</div>
              <div>
                <h3 className="dual-card__title">Orisa Medicine</h3>
                <div className="dual-card__abbr">OrisaMed · Dual System</div>
              </div>
            </div>
            <p className="dual-card__lead">
              The dual healing system — where each of the 256 Orisa governs a specific domain
              of health. OrisaMed is Oyeku-based: receptive, transformative, restorative.
              The complementary mirror of IfaMed within the GUTM.
            </p>
            <ul className="dual-card__list">
              <li>Osun Medicine — fertility, wellness, water healing</li>
              <li>Ogun Medicine — surgery, physical trauma, iron</li>
              <li>Sango Medicine — neurology, electricity, the heart</li>
              <li>Obatala Medicine — mental clarity, bones, purity</li>
              <li>Yemoja Medicine — emotional health, fluids, birth</li>
              <li>Esu Medicine — diagnostics, pathways, intervention</li>
              <li>Orisa-specific pharmacology and ritual medicine</li>
            </ul>
            <div className="dual-card__bit">
              <span className="dual-card__bit-symbol dual-card__bit-symbol--orisa">|</span>
              <span>Oyeku · Transformative Anergy · OrisaMed</span>
            </div>
          </div>
        </div>

        {/* Duality axiom */}
        <div className="dual-axiom">
          <div className="dual-axiom__line dual-axiom__line--left" />
          <p className="dual-axiom__text">
            IfaMed ↔ OrisaMed · Two systems, one medicine · The IFA Internet Medical Architecture
          </p>
          <div className="dual-axiom__line dual-axiom__line--right" />
        </div>
      </div>
    </section>
  );
}

// ── IfaNeuroTech Section ───────────────────────────────────────
const NEURO_AI_CARDS = [
  { label: 'Neural Latency Reduction', icon: '◎', accent: '#00c57a', desc: 'IfaBCI reduces neural signal latency through ConWave optimisation — compressing the time between thought, decision, and action to near-instantaneous response, approaching the speed of electronic circuits.' },
  { label: 'Parallel Processing',      icon: '◈', accent: '#00b4d8', desc: 'Odu-guided neural training unlocks parallel cognitive processing — the brain learning to run multiple complex operations simultaneously, mirroring multi-threaded AI computation using the full 256-Odu state space.' },
  { label: 'Ifa–AI Symbiosis',         icon: '⊛', accent: '#f5c518', desc: 'IfaBCI creates a real-time symbiosis between the human brain and AI systems — the human provides Consciousness, wisdom, and ethical guidance; AI provides computational power and pattern recognition.' },
  { label: 'Infinite Memory Access',   icon: '⬡', accent: '#7c4dff', desc: 'Neural-cloud integration via IfaBCI — extending biological memory with Odu-indexed digital memory banks, giving the brain access to effectively unlimited information storage and high-precision recall.' },
];

const MEMORY_ROWS = [
  { odu: 'Ogbe Meji',   type: 'Core Memory',   status: 'stable',  bar: 94 },
  { odu: 'Oyeku Meji',  type: 'Shadow Memory', status: 'flagged', bar: 67 },
  { odu: 'Iwori Meji',  type: 'Insight',       status: 'stable',  bar: 88 },
  { odu: 'Odi Meji',    type: 'Trauma Layer',  status: 'healing', bar: 41 },
  { odu: 'Irosun Meji', type: 'Emotional Mem', status: 'stable',  bar: 79 },
];

function IfaNeuroTechSection() {
  return (
    <section className="section section--alt" id="neuro">
      <div className="container">

        {/* Header */}
        <div className="section__header">
          <span className="section__eyebrow">IfaNeuroTech · Consciousness Neuroscience · The Brain</span>
          <h2 className="section__title">IfaNeuroTech: The Brain</h2>
          <p className="section__desc">
            The convergence of <strong>Ifa Wisdom</strong>, <strong>Neuroscience</strong>,{' '}
            <strong>Artificial Intelligence</strong>, and <strong>Biology</strong> — redefining
            what the human brain is, what it can become, and how the 256 Odu Ifa map every
            dimension of neural consciousness into a unified science of mind and healing.
          </p>
        </div>

        {/* Animated brain visualization */}
        <div className="neuro-brain">
          <div className="neuro-brain__rings" aria-hidden="true">
            <div className="neuro-brain__ring neuro-brain__ring--1" />
            <div className="neuro-brain__ring neuro-brain__ring--2" />
            <div className="neuro-brain__ring neuro-brain__ring--3" />
            <div className="neuro-brain__ring neuro-brain__ring--4" />
          </div>
          <div className="neuro-brain__nodes" aria-hidden="true">
            {[...Array(16)].map((_, i) => (
              <div key={i} className="neuro-brain__node" style={{
                '--bn-x': `${[50,30,70,20,80,15,85,40,60,25,75,45,55,35,65,50][i]}%`,
                '--bn-y': `${[10,25,25,50,50,70,70,15,15,40,40,60,60,80,80,90][i]}%`,
                '--bn-d': `${i * 0.3}s`,
                '--bn-s': `${3 + (i % 3) * 0.8}s`,
                '--bn-c': ['#00c57a','#00b4d8','#f5c518','#7c4dff','#e9498a'][i % 5],
              }} />
            ))}
          </div>
          <div className="neuro-brain__core">
            <div className="neuro-brain__core-sym">◉</div>
            <div className="neuro-brain__core-label">IfaNeuroTech</div>
            <div className="neuro-brain__core-sub">Brain · AI · Odu Ifa · Biology</div>
          </div>
          <div className="neuro-brain__tags">
            {[
              { label: 'Neuroscience',  c: '#00c57a' },
              { label: 'Odu Ifa',       c: '#00b4d8' },
              { label: 'AI',            c: '#f5c518' },
              { label: 'Biology',       c: '#7c4dff' },
              { label: 'ConSci',        c: '#e9498a' },
            ].map((t, i) => (
              <span key={i} style={{ '--nt-c': t.c }}>{t.label}</span>
            ))}
          </div>
        </div>

        {/* IfaBCI Intro */}
        <div className="ifabci-intro">
          <div className="ifabci-intro__badge">IfaBCI · Ifa Brain Computer Interface</div>
          <h3 className="ifabci-intro__title">Ifa Brain Computer Interface Technology</h3>
          <p className="ifabci-intro__body">
            <strong>IfaBCI</strong> — Ifa Brain Computer Interface — is the next frontier of ToE Medicine:
            direct neural-digital interfacing guided by the axiomatic wisdom of the 256 Odu Ifa.
            Where conventional BCI technology reads only electrical signals,{' '}
            <strong>IfaBCI reads Consciousness itself</strong> — mapping the brain's Odu signature,
            its Ase flow, and its alignment with the patient's Ori destiny. IfaBCI does not
            merely connect the brain to a computer; it connects the brain to the living intelligence
            of Ifa — enabling healing, enhancement, and transformation at the deepest layer of being.
          </p>
          <div className="ifabci-intro__pillars">
            {[
              { sym: '◎', label: 'Odu Mapping',     desc: 'Reading the brain\'s 256 Odu signature states in real-time — the world\'s most complete neural atlas.' },
              { sym: '◈', label: 'Ase Sensing',      desc: 'Measuring living Consciousness Energy flow across neural networks — beyond electrical, into energetic.' },
              { sym: '⊛', label: 'Ori Alignment',    desc: 'Calibrating the brain\'s neural architecture to the individual\'s Ori — their divine destiny blueprint.' },
              { sym: '◉', label: 'ConWave Therapy',  desc: 'Delivering targeted Consciousness Waves (ConWaves) directly into neural tissue for root-level healing.' },
            ].map((p, i) => (
              <div key={i} className="ifabci-intro__pillar">
                <span className="ifabci-intro__pillar-sym">{p.sym}</span>
                <strong>{p.label}</strong>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Memory viewer */}
        <div className="neuro-memory">
          <div className="neuro-memory__left">
            <span className="neuro-memory__eyebrow">Neural Memory Architecture</span>
            <h3 className="neuro-memory__title">
              Viewing Brain Memories<br />
              <span>Like Computer Files</span>
            </h3>
            <p className="neuro-memory__body">
              Just as a computer stores data as binary sequences of 0s and 1s, the brain encodes
              memory as binary Odu states — patterns of <strong>Ogbe (O)</strong> and{' '}
              <strong>Oyeku (|)</strong> expressed through neural firing sequences.{' '}
              <strong>IfaBCI Memory Technology</strong> decodes this Odu-binary language,
              enabling memories to be accessed, replayed, organised, and — with Ifa-guided
              ethics — therapeutically reconsolidated.
            </p>
            <p className="neuro-memory__body">
              This opens the possibility of <strong>viewing traumatic memories from an observer
              perspective</strong> — removing their emotional charge without erasing the learning.
              Grief memories can be honoured rather than suppressed. Joyful memories can be
              re-experienced in full fidelity for healing. The Odu Ifa provides the complete
              ethical map for every intervention in the sacred architecture of human memory.
            </p>
            <div className="neuro-memory__tags">
              <span>Memory Reconsolidation</span>
              <span>Odu-Binary Decoding</span>
              <span>Trauma Dissolution</span>
            </div>
          </div>
          <div className="neuro-memory__right">
            <div className="neuro-memory__screen">
              <div className="neuro-memory__screen-bar">
                <span /><span /><span />
                <div className="neuro-memory__screen-title">IfaBCI · Memory Interface v1.0</div>
              </div>
              <div className="neuro-memory__screen-body">
                {MEMORY_ROWS.map((row, i) => (
                  <div key={i} className="neuro-memory__row">
                    <span className="neuro-memory__row-odu">{row.odu}</span>
                    <span className="neuro-memory__row-type">{row.type}</span>
                    <div className="neuro-memory__row-bar-wrap">
                      <div className="neuro-memory__row-bar" style={{
                        '--mb': `${row.bar}%`,
                        '--mc': row.status === 'flagged' ? '#e9498a' : row.status === 'healing' ? '#f5c518' : '#00c57a',
                      }} />
                    </div>
                    <span className={`neuro-memory__row-status neuro-memory__row-status--${row.status}`}>{row.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Brain–AI Convergence */}
        <div className="neuro-ai">
          <div className="neuro-ai__header">
            <span className="neuro-ai__eyebrow">Human Brain · AI Convergence</span>
            <h3 className="neuro-ai__title">Making the Human Brain Work at AI Speed</h3>
            <p className="neuro-ai__sub">
              The human brain operates at approximately 120 metres per second (neural transmission speed). Advanced AI systems
              operate at near-light-speed silicon circuits.{' '}
              <strong>IfaNeuroTech bridges this gap</strong> — not by replacing the human brain,
              but by harmonising it with AI intelligence through Odu-guided neural enhancement.
            </p>
          </div>
          <div className="neuro-ai__grid">
            {NEURO_AI_CARDS.map((item, i) => (
              <div key={i} className="neuro-ai__card" style={{ '--nai-accent': item.accent }}>
                <span className="neuro-ai__card-icon">{item.icon}</span>
                <strong className="neuro-ai__card-label">{item.label}</strong>
                <p className="neuro-ai__card-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="ifabci-benefits">
          <h3 className="ifabci-benefits__title">IfaBCI Benefits</h3>
          <p className="ifabci-benefits__sub">
            Transformative applications spanning trauma healing, medical therapy, and the expansion of human potential
          </p>
          <div className="ifabci-benefits__grid">
            {IFABCI_BENEFITS.map((b, i) => (
              <div key={i} className="bci-benefit-card" style={{ '--bb-accent': b.accent }}>
                <div className="bci-benefit-card__top">
                  <span className="bci-benefit-card__icon">{b.icon}</span>
                  <h4 className="bci-benefit-card__title">{b.title}</h4>
                </div>
                <ul className="bci-benefit-card__list">
                  {b.items.map((item, j) => (
                    <li key={j}>
                      <span className="bci-benefit-card__dot" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Wearable Tech */}
        <div className="neuro-wearable">
          <div className="neuro-wearable__header">
            <span className="neuro-wearable__eyebrow">Wearable Technology</span>
            <h3 className="neuro-wearable__title">Wearable Ifa & Orisa BCI Tech</h3>
            <p className="neuro-wearable__sub">
              Four flagship IfaBCI wearable devices — each anchored in an Orisa whose domain
              precisely governs the neural function the device addresses.
            </p>
          </div>
          <div className="neuro-wearable__grid">
            {WEARABLE_DEVICES.map((d, i) => (
              <div key={i} className="wearable-card" style={{ '--wc-accent': d.accent }}>
                <div className="wearable-card__header">
                  <span className="wearable-card__icon">{d.icon}</span>
                  <div>
                    <div className="wearable-card__name">{d.name}</div>
                    <div className="wearable-card__orisa">Anchored in {d.orisa}</div>
                  </div>
                </div>
                <p className="wearable-card__desc">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Risks & Ethics */}
        <div className="ifabci-risks">
          <div className="ifabci-risks__header">
            <span className="ifabci-risks__eyebrow">Ethics · Iwapele · Omoluabi</span>
            <h3 className="ifabci-risks__title">IfaBCI Risks & Ifa Ethical Response</h3>
            <p className="ifabci-risks__sub">
              The power of IfaBCI demands the full weight of Ifa Ethics (EthicoE). Every risk is
              met with a corresponding Ifa wisdom principle — because technology without Iwapele
              is a weapon, not a medicine.
            </p>
          </div>
          <div className="ifabci-risks__grid">
            {IFABCI_RISKS.map((r, i) => (
              <div key={i} className="risk-card" style={{ '--rc-accent': r.accent }}>
                <div className="risk-card__top">
                  <span className="risk-card__icon">{r.icon}</span>
                  <strong className="risk-card__risk">{r.risk}</strong>
                </div>
                <div className="risk-card__divider" />
                <div className="risk-card__response-label">Ifa Response</div>
                <p className="risk-card__response">{r.ifa_response}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Closing axiom */}
        <div className="neuro-axiom">
          <div className="neuro-axiom__inner">
            <span className="neuro-axiom__sym">◉</span>
            <p className="neuro-axiom__quote">
              "Orí mi, jẹ́ kí ọpọlọ míi ṣiṣẹ́ bí Ifá Àti Òrìṣà — My Ori, let my mind work with the intelligence of Ifa and Orisa."
            </p>
            <cite className="neuro-axiom__cite">
              IfaNeuroTech · Consciousness Neuroscience · The IFA Internet
            </cite>
          </div>
        </div>

      </div>
    </section>
  );
}

// ── Ethics Section ─────────────────────────────────────────────
function EthicsSection() {
  return (
    <section className="section section--alt" id="ethics">
      <div className="container">
        <div className="section__header">
          <span className="section__eyebrow">Ifa Ethics · ToE Ethics · EthicoE</span>
          <h2 className="section__title">Ethics of Ifa and Orisa Medicine</h2>
          <p className="section__desc">
            Ifa and Orisa Medicine is inseparable from <strong>a Ethics (EthicoE)</strong>.
            Ethic-oE is the Ethics for Everything, the universal ethical framework rooted in the
            256 Odu Ifa and the living philosophy of <strong>ỌmọLúwàbí</strong> (a child of
            Lúàbí, the great philosopher, moralist, and ethicist of Alẹ̀ Ufẹ̀/Ilé Ifẹ̀ that lived
            thousands of years before Socrates). Every Ifa and Orisa practitioner is bound by the
            ethical code of <em>Ìwàpẹ̀lẹ̀</em> — gentle, good, and honourable character — as the
            key foundation of healing practice.
          </p>
        </div>

        {/* Ìwàpẹ̀lẹ̀ intro block */}
        <div className="ethics-intro">
          <div className="ethics-intro__left">
            <div className="ethics-intro__symbol">Ọ</div>
          </div>
          <div className="ethics-intro__right">
            <h3 className="ethics-intro__title">Ọmọlúwàbí · Ìwàpẹ̀lẹ̀</h3>
            <p className="ethics-intro__body">
              <strong>Ọmọlúwàbí</strong> — literally "a child born with good character" — is the ethical ideal of Ifa and Yoruba civilisation. It describes the person
              who has fully integrated virtue into their being: not as performance, but as Consciousness.
              In Ifa Medicine, the practitioner must first be a <em>living Ọmọlúwàbí</em> before they
              can effectively heal others.
            </p>
            <p className="ethics-intro__body">
              <strong>Ìwàpẹ̀lẹ̀</strong> — gentle, patient, and balanced character — is the highest
              expression of this ideal. Anchored by <strong>Lúwàbí</strong>, the Orisha of Wisdom,
              Ethics, and Morality, Ìwàpẹ̀lẹ̀ is both the goal of personal development and the
              ethical standard by which all Ifa and Orisa medical practice is measured.
            </p>
            <div className="ethics-intro__anchor">
              <span className="ethics-intro__anchor-icon">⊛</span>
              <span>Anchored in <strong>Lúàbí</strong> — Orisha of Wisdom, Ethics, and Morality</span>
            </div>
          </div>
        </div>

        {/* Virtue cards */}
        <div className="virtues-grid">
          {OMOLUABI_VIRTUES.map((v, i) => (
            <div key={i} className="virtue-card" style={{ '--v-accent': v.accent }}>
              <div className="virtue-card__top">
                <span className="virtue-card__icon">{v.icon}</span>
                <div>
                  <div className="virtue-card__yoruba">{v.yoruba}</div>
                  <div className="virtue-card__english">{v.english}</div>
                </div>
              </div>
              <p className="virtue-card__desc">{v.desc}</p>
            </div>
          ))}
        </div>

        {/* Ethics axiom */}
        <div className="ethics-axiom">
          <div className="ethics-axiom__inner">
            <span className="ethics-axiom__quote">
              "Ìwà lẹwà — Character is beauty."
            </span>
            <cite className="ethics-axiom__cite">
              Odu Ifa · The key axiom of Ọmọlúwàbí ethics
            </cite>
            <p className="ethics-axiom__body">
              In Ifa Medicine, character is not a secondary virtue — it is the <em>first medicine</em>.
              The inner quality of the healer shapes the healing. Ifa Ethics (EthicoE) holds that
              no diagnostic system, however sophisticated, can substitute for the moral integrity
              of the practitioner who wields it.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Medical Centers Section ────────────────────────────────────
function MedicalCentersSection() {
  return (
    <section className="section section--alt" id="centers">
      <div className="container">
        <div className="section__header">
          <span className="section__eyebrow">Key Applications of ToE Medicine</span>
          <h2 className="section__title">Medical Centers</h2>
          <p className="section__desc">
            Ifa Medical Centers and Orisa Medical Centers are the flagship institutions of
            the Grand Unified Medical Theory — physical and virtual healing environments
            where ToE Medicine is practised as a living, integrated science.
          </p>
        </div>

        <div className="centers-grid">
          {MED_CENTERS.map(c => (
            <div key={c.type} className="center-card" style={{ '--c-accent': c.accent }}>
              <div className="center-card__header">
                <div className="center-card__icon">{c.icon}</div>
                <div>
                  <h3 className="center-card__name">{c.name}</h3>
                  <div className="center-card__abbr">{c.abbr}</div>
                </div>
              </div>
              <p className="center-card__tagline">"{c.tagline}"</p>
              <p className="center-card__desc">{c.desc}</p>
              <div className="center-card__features">
                <div className="center-card__feat-label">Key Facilities & Services</div>
                <ul className="center-card__feat-list">
                  {c.features.map((f, i) => (
                    <li key={i} className="center-card__feat-item">
                      <span className="center-card__feat-dot" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* ConSci Applications */}
        <div className="consci-section">
          <h3 className="consci-section__title">Key ConSci Applications</h3>
          <p className="consci-section__sub">
            Consciousness Science (ConSci) applications driving the future of ToE Medicine
          </p>
          <div className="consci-grid">
            {CONSCI_APPS.map((a, i) => (
              <div key={i} className="consci-card" style={{ '--ca-accent': a.accent }}>
                <span className="consci-card__icon">{a.icon}</span>
                <strong className="consci-card__label">{a.label}</strong>
                <p className="consci-card__desc">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── IfaGebra Medicine Section ──────────────────────────────────
function IfaGebraMedicineSection() {
  return (
    <section className="section" id="ifagebra-medicine">
      <div className="container">
        <div className="section__header">
          <span className="section__eyebrow">IfaGebra · AlgebroE · MedicGebra · Algebra of Medicine</span>
          <h2 className="section__title">IfaGebra: Medicine Algebra (MedicGebra)</h2>
          <p className="section__desc">
            <strong>MedicGebra</strong> — Medicine Algebra — is the Algebraic Framework derived from{' '}
            <a href="https://ifainternet.org/ifa-mathematics-toe-mathematics/ifa-gebra/"
               target="_blank" rel="noopener noreferrer" style={{ color: '#00c57a', fontWeight: 700 }}>
              IfaGebra (AlgebroE)
            </a>{' '}
            that models the field of Medicine as a whole as a rigorous Axiomatic Algebra. Every aspect of health, disease,
            diagnosis, and healing is expressed in IfaLang as an energyform within the{' '}
            <strong>IFAlgebra</strong> — a living Algebraic Structure governed by the{' '}
            <strong>256 Odu Ifa Meta-Axioms</strong> and the <strong>Ifa Operators</strong>..
          </p>
        </div>
        <MedicGebraMatrix />
      </div>
    </section>
  );
}

// ── IFA Mathematica Section (Medicine) ─────────────────────────
function IfaMathematicaMedSection() {
  return (
    <section className="section section--alt" id="ifa-mathematica-medicine">
      <div className="container">
        <div className="section__header">
          <span className="section__eyebrow">IFA Mathematica · ToE Mathematics · Mathematical Medicine</span>
          <h2 className="section__title">IFA Mathematica</h2>
          <p className="section__desc">
            <strong>IFA Mathematica</strong> is the complete Meta-mathematical Framework of the IFA Internet —
            the Mathematics for Everything (MatoE). Ifa Medicine is an Element of IFA Mathematica, providing the rigorous
            Mathematical Infrastructure for understanding the body, consciousness, and healing as
            meta-structures and energyforms. Every branch of IFA Mathematica has direct medical applications,
            from the algebra of biological systems (BioGebra) to the calculus of healing processes
            and the topology of consciousness energy fields.
          </p>
        </div>

        <div style={{
          marginTop: '48px', display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center',
        }}>
          {[
            { label: 'IFA Mathematica', href: 'https://ifainternet.org/ifa-mathematics-toe-mathematics/', color: '#8b5cf6' },
            { label: 'IfaGebra', href: 'https://ifainternet.org/ifa-mathematics-toe-mathematics/ifa-gebra/', color: '#00c57a' },
            { label: 'Ifa Transform', href: 'https://ifainternet.org/ifa-mathematics-toe-mathematics/ifa-transform/', color: '#00b4d8' },
          ].map((l, i) => (
            <a key={i} href={l.href} target="_blank" rel="noopener noreferrer" style={{
              display: 'inline-block',
              padding: '10px 24px',
              borderRadius: '24px',
              border: `1px solid color-mix(in srgb, ${l.color} 35%, transparent)`,
              background: `color-mix(in srgb, ${l.color} 8%, transparent)`,
              color: l.color,
              fontWeight: 700, fontSize: '0.88rem',
              textDecoration: 'none',
              transition: 'border-color 0.2s, transform 0.2s',
            }}>
              {l.label} →
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── CTA Section ────────────────────────────────────────────────
function CTASection() {
  return (
    <section className="cta-section">
      <div className="cta-section__glow" />
      <div className="container">
        <div className="cta-section__inner">
          <div className="cta-section__icon">✚</div>
          <h2 className="cta-section__title">
            The Medicine<br />
            <span>for Everything</span>
          </h2>
          <p className="cta-section__desc">
            Ifa Medicine is not a supplement to modern medicine — it is its foundation and
            grand unification. The 256 Odu Ifa contain every disease, every remedy, every
            principle of health ever known or yet to be discovered.
            <strong> GUTM is the future of medicine.</strong>
          </p>
          <div className="cta-section__ctas">
            <a href="#gutm"    className="btn btn--primary">Explore GUTM →</a>
            <a href="#akose"   className="btn btn--ghost">Akose Ifa</a>
            <a href="#centers" className="btn btn--ghost">Medical Centers</a>
          </div>
          <div className="cta-section__tags">
            <span>ToE Med</span><span>ConMed</span><span>IfaMed</span>
            <span>OrisaMed</span><span>MedoE</span><span>GUTM</span>
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
              <span className="footer__logo-icon">✚</span>
              <div>
                <div className="footer__logo-name">Ifa Medicine · ToE Medicine</div>
                <div className="footer__logo-sub">The Medicine for Everything</div>
              </div>
            </div>
            <p className="footer__tagline">
              Grand Unified Theory of Medicine · GUTM · IfaMed · OrisaMed
            </p>
            <p className="footer__tagline" style={{ marginTop: 6 }}>
              Part of{' '}
              <a href="https://toe.cenproject.org/" style={{ color: 'var(--emerald)' }}>
                The IFA Internet
              </a>{' '}
              ·{' '}
              <a href="https://cenproject.org/" style={{ color: 'var(--gold)' }}>
                CENProject
              </a>{' '}
              — Consciousness-Energy Research
            </p>
          </div>

          <nav className="footer__links">
            {[
              { label: 'The IFA Internet',     href: 'https://toe.cenproject.org/' },
              { label: 'Ifa Holistic Approach', href: '#holistic' },
              { label: 'GUTM',                  href: '#gutm' },
              { label: 'Akose Ifa',             href: '#akose' },
              { label: 'IfaMed · OrisaMed',     href: '#dual' },
              { label: 'Ethics · Ọmọlúwàbí',   href: '#ethics' },
              { label: 'Medical Centers',       href: '#centers' },
              { label: 'CENProject',            href: 'https://cenproject.org/' },
            ].map(l => (
              <a
                key={l.label}
                href={l.href}
                className="footer__link"
                target={l.href.startsWith('http') ? '_blank' : undefined}
                rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="footer__bottom">
          <span>© 2025 CENProject · Ifa Medicine — ToE Medicine · The IFA Internet</span>
          <span className="footer__bottom-tag">The Medicine for Everything · GUTM</span>
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
      <MobileBottomBar />
      <main>
        <HeroSection />
        <StatsBar />
        <HolisticSection />
        <GUTMSection />
        <AkoseSection />
        <OsanyinSection />
        <DualSection />
        <EthicsSection />
        <IfaNeuroTechSection />
        <MedicalCentersSection />
        <IfaGebraMedicineSection />
        <IfaMathematicaMedSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
