/* ─────────────────────────────────────────────────────────────
   IfaLens · LensoE — The Lens of Everything
   Polymathic viewing platform of the IFA Internet
   React 18 + JSX via Babel Standalone · no build step
   CENProject · toe.cenproject.org/ifalens/
───────────────────────────────────────────────────────────── */

const { useState, useEffect, useRef } = React;

// ── Auth — reads live IfaLMS user data from shared localStorage ─
// IfaLMS stores its state in 'ifaLMS_v2' on the same origin (ifainternet.org),
// so IfaLens can validate against exactly the same accounts and passwords.
const LMS_STORAGE_KEY  = 'ifaLMS_v2';
const LENS_SESSION_KEY = 'ifalens_user';

// Fallback seed students — used if IfaLMS data isn't in localStorage yet
const SEED_STUDENTS = [
  { username: 'adewale',  password: 'student123', name: 'Adewale Okafor'  },
  { username: 'chiamaka', password: 'student123', name: 'Chiamaka Nwosu'  },
  { username: 'tayo',     password: 'student123', name: 'Tayo Adeleke'    },
  { username: 'emeka',    password: 'student123', name: 'Emeka Obi'       },
  { username: 'ngozi',    password: 'student123', name: 'Ngozi Adeyemi'   },
];

function getLmsUsers() {
  try {
    const raw = localStorage.getItem(LMS_STORAGE_KEY);
    if (raw) {
      const state = JSON.parse(raw);
      if (Array.isArray(state.users)) return state.users;
    }
  } catch (e) {}
  return SEED_STUDENTS;
}

function getLensSession() {
  try {
    const raw = localStorage.getItem(LENS_SESSION_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return null;
}

function SubscriptionGate({ onUnlock }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState(false);
  const [shake, setShake]       = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const users = getLmsUsers();
    const user = users.find(
      u => u.role === 'student' && u.username === username.trim() && u.password === password
    );
    if (user) {
      localStorage.setItem(LENS_SESSION_KEY, JSON.stringify({ username: user.username, name: user.name }));
      onUnlock(user.name);
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 600);
    }
  }

  return (
    <div className="sub-gate">
      <div className="sub-gate__bg" aria-hidden="true">
        <div className="sub-gate__grid" />
        <div className="sub-gate__orb sub-gate__orb--a" />
        <div className="sub-gate__orb sub-gate__orb--b" />
        <div className="sub-gate__orb sub-gate__orb--c" />
      </div>

      <div className={`sub-gate__card${shake ? ' sub-gate__card--shake' : ''}`}>
        <div className="sub-gate__logo" aria-label="IfaLens">
          <span className="sub-gate__logo-ifa">Ifa</span>
          <span className="sub-gate__logo-rest">Lens</span>
          <span className="sub-gate__logo-dot">·</span>
          <span className="sub-gate__logo-tag">LensoE</span>
        </div>

        <div className="sub-gate__icon" aria-hidden="true">◎</div>

        <h1 className="sub-gate__title">Student Login</h1>
        <p className="sub-gate__desc">
          IfaLens is available exclusively to students of the{' '}
          <strong>IFA Academy of Polymaths</strong>.
          Sign in with your <a href="https://ifainternet.org/ifa-lms/" target="_blank" rel="noopener noreferrer" className="sub-gate__join-link">IfaLMS</a> username and password.
        </p>

        <form onSubmit={handleSubmit} className="sub-gate__form">
          <input
            type="text"
            className={`sub-gate__input${error ? ' sub-gate__input--error' : ''}`}
            placeholder="Username"
            value={username}
            onChange={e => { setUsername(e.target.value); setError(false); }}
            autoComplete="username"
            spellCheck={false}
            aria-label="Username"
          />
          <input
            type="password"
            className={`sub-gate__input${error ? ' sub-gate__input--error' : ''}`}
            placeholder="Password"
            value={password}
            onChange={e => { setPassword(e.target.value); setError(false); }}
            autoComplete="current-password"
            aria-label="Password"
          />
          <button type="submit" className="sub-gate__btn">
            Sign in to IfaLens <span className="sub-gate__btn-arrow">→</span>
          </button>
        </form>

        {error && (
          <p className="sub-gate__error" role="alert">
            ⊗ Invalid username or password — use your IfaLMS login details.
          </p>
        )}

        <div className="sub-gate__divider" />

        <p className="sub-gate__join">
          Not yet a student?{' '}
          <a
            href="https://toe.cenproject.org/ifa-academy-of-polymaths/"
            target="_blank"
            rel="noopener noreferrer"
            className="sub-gate__join-link"
          >
            Join the IFA Academy of Polymaths →
          </a>
        </p>

        <div className="sub-gate__footer">
          <a href="/" className="sub-gate__home">← IFA Internet</a>
          <span className="sub-gate__tag">The IFA Internet · CENProject</span>
        </div>
      </div>
    </div>
  );
}

// ── Ogbe Symbol (DuoInfinity / lemniscate canvas glyph) ───────
function OgbeSymbol({ size = 20, className = '' }) {
  const canvasRef = useRef(null);
  const a   = size * 0.47;
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
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle', width: size + 'px', height: size + 'px' }}
      aria-label="Ogbe Energy Symbol" />
  );
}

// ── Data ──────────────────────────────────────────────────────

const LENS_SYMBOLS = [
  '◎','⊙','◉','≋','⊛','∞','≡','⬡','⊕','⊗','∑','Ψ','Ω','λ','∇','∂','⌁','⬟','φ','◈',
];

const STATS = [
  { value: '256',  label: 'Odu Ifa',      sub: 'Polymathic Viewing Codes'  },
  { value: <OgbeSymbol size={36} />, label: 'Disciplines',  sub: 'All Fields of Knowledge'   },
  { value: '16',   label: 'Ifascope Types', sub: 'Universal Imaging Modes' },
  { value: 'CEN',  label: 'Energy Lens',  sub: 'Consciousness-Energy'      },
];

const IFASCOPES = [
  {
    id: 'optical-micro',
    name: 'Optical Microscopy',
    category: 'Microscopy',
    icon: '◎',
    accent: '#8b5cf6',
    sub: ['Visible Light', 'Fluorescence', 'Phase Contrast', 'Dark Field'],
    desc: 'Visible-light imaging of microscale structures — the classical lens-based window into the micro-world of biological and material science.',
  },
  {
    id: 'electron-micro',
    name: 'Electron Microscopy',
    category: 'Microscopy',
    icon: '⌁',
    accent: '#4361ee',
    sub: ['TEM', 'SEM', 'STEM', 'Cryo-EM'],
    desc: 'Electron beam imaging surpassing visible light limits — revealing nanoscale and atomic-level structures across materials and biology.',
  },
  {
    id: 'xray-micro',
    name: 'X-ray Microscopy',
    category: 'Microscopy',
    icon: '✕',
    accent: '#e63946',
    sub: ['X-ray CT', 'Synchrotron', 'Phase Contrast', 'Tomography'],
    desc: 'High-energy electromagnetic penetration — mapping internal structures, chemical compositions, and material densities without destruction.',
  },
  {
    id: 'uv-ir-micro',
    name: 'UV & Infrared Microscopy',
    category: 'Microscopy',
    icon: '≋',
    accent: '#ff6b35',
    sub: ['UV Fluorescence', 'IR Absorption', 'Near-IR', 'Thermal Imaging'],
    desc: 'Extending optical microscopy beyond visible light — revealing molecular bonds, thermal states, and fluorescent biomarkers.',
  },
  {
    id: 'probe-micro',
    name: 'Scanning Probe Microscopy',
    category: 'Microscopy',
    icon: '◉',
    accent: '#00d9b8',
    sub: ['AFM', 'STM', 'Atomic Resolution', 'Force Mapping'],
    desc: 'Atomic-scale sensing via physical probe interaction — reaching the fundamental fabric of matter at sub-angstrom resolution.',
  },
  {
    id: 'optical-tele',
    name: 'Optical Telescopy',
    category: 'Telescopy',
    icon: '⊙',
    accent: '#f5c518',
    sub: ['Refracting', 'Reflecting', 'Catadioptric', 'Adaptive Optics'],
    desc: 'Visible-light observation of celestial objects — from galactic structures and nebulae to planetary surfaces and stellar physics.',
  },
  {
    id: 'radio-tele',
    name: 'Radio Telescopy',
    category: 'Telescopy',
    icon: '◎',
    accent: '#e9498a',
    sub: ['Single Dish', 'Interferometry', 'VLBI', 'Pulsar Timing'],
    desc: 'Long-wavelength electromagnetic detection — mapping cosmic radio sources, pulsars, quasars, and the cosmic microwave background.',
  },
  {
    id: 'space-tele',
    name: 'Space Telescopy',
    category: 'Telescopy',
    icon: '⊛',
    accent: '#a855f7',
    sub: ['Hubble', 'James Webb', 'Multi-Wavelength', 'Deep Field'],
    desc: 'Above-atmosphere observation removing distortion — accessing the full electromagnetic spectrum from gamma rays to radio waves.',
  },
  {
    id: 'spectroscopy',
    name: 'Spectroscopy',
    category: 'Spectroscopy',
    icon: '≡',
    accent: '#06b6d4',
    sub: ['Absorption', 'Emission', 'Raman', 'NMR', 'Mass Spec'],
    desc: 'Energy signature analysis — reading chemical composition, quantum states, molecular identity, and elemental abundance across all scales.',
  },
  {
    id: 'medical-imaging',
    name: 'Medical Imaging',
    category: 'Medical',
    icon: '⬡',
    accent: '#00e07c',
    sub: ['MRI', 'CT Scan', 'Ultrasound', 'PET / SPECT', 'Direct Visual'],
    desc: 'Structural and functional imaging of biological systems — mapping the body as an energy landscape across anatomical and physiological dimensions.',
  },
  {
    id: 'codar',
    name: 'CODAR Technology',
    category: 'Consciousness',
    icon: '⬟',
    accent: '#f5c518',
    sub: ['CEN Detection', 'Consciousness Sensing', 'IfaWave Ranging', 'Ogbe Field Mapping'],
    desc: 'Consciousness Detecting and Ranging — IfaTech for sensing, ranging, and mapping Consciousness Energy fields beyond conventional physical instruments.',
  },
];

const SCOPE_CATS = ['All', 'Microscopy', 'Telescopy', 'Spectroscopy', 'Medical', 'Consciousness'];

const FRAME_PAIRS = [
  {
    from: 'Physics',
    to: 'Mathematics',
    fromAccent: '#4361ee',
    toAccent: '#f5c518',
    desc: 'Every physical law maps to a mathematical structure. IfaLens reveals the Consciousness-Energy equivalence between force and transformation, energy and functional norm.',
    translations: [
      { source: 'Force', lens: 'Energy (Ogbe)', target: 'Linear Map / Morphism' },
      { source: 'Energy', lens: 'Energy (Ogbe)', target: 'Functional Norm' },
      { source: 'Momentum', lens: 'Energy (Ogbe)', target: 'Gradient / Derivative' },
      { source: 'Wave Function (Ψ)', lens: 'Energy (Ogbe)', target: 'Fourier Basis Element' },
    ],
  },
  {
    from: 'Music',
    to: 'Physics',
    fromAccent: '#e9498a',
    toAccent: '#00d9b8',
    desc: 'Music is physics in experiential form. IfaLens shows how every musical element corresponds to a physical phenomenon — all are expressions of CEN Energy in oscillation.',
    translations: [
      { source: 'Rhythm', lens: 'Energy (Ogbe)', target: 'Oscillation / Frequency' },
      { source: 'Harmony', lens: 'Energy (Ogbe)', target: 'Wave Superposition' },
      { source: 'Melody', lens: 'Energy (Ogbe)', target: 'Signal Envelope' },
      { source: 'Chord', lens: 'Energy (Ogbe)', target: 'Coupled Oscillators' },
    ],
  },
  {
    from: 'Finance',
    to: 'Information Theory',
    fromAccent: '#00e07c',
    toAccent: '#a855f7',
    desc: 'Markets are information systems. IfaLens translates financial structures into information-theoretic equivalents — both are energy flowing through network channels.',
    translations: [
      { source: 'Price Signal', lens: 'Energy (Ogbe)', target: 'Shannon Entropy' },
      { source: 'Risk', lens: 'Energy (Ogbe)', target: 'Kolmogorov Complexity' },
      { source: 'Portfolio', lens: 'Energy (Ogbe)', target: 'Error-Correcting Code' },
      { source: 'Market', lens: 'Energy (Ogbe)', target: 'Channel Capacity' },
    ],
  },
  {
    from: 'Linguistics',
    to: 'Computing',
    fromAccent: '#ff6b35',
    toAccent: '#38bdf8',
    desc: 'Language and computation share deep structural roots. IfaLens maps linguistic forms to computational equivalents via IfaLang — the Language of Everything.',
    translations: [
      { source: 'Grammar', lens: 'Energy (Ogbe)', target: 'Context-Free Grammar' },
      { source: 'Semantics', lens: 'Energy (Ogbe)', target: 'Type System / Semantics' },
      { source: 'Phoneme', lens: 'Energy (Ogbe)', target: 'Bit / Token' },
      { source: 'Discourse', lens: 'Energy (Ogbe)', target: 'Program Execution' },
    ],
  },
];

const IFA_TECH = [
  {
    name: 'Ifa Sensors',
    subtitle: 'SensoEs — Sensors for Everything',
    icon: '◉',
    accent: '#00d9b8',
    desc: 'Universal sensing instruments that detect, measure, and encode all phenomena across all energy states into IFABit form. From quantum sensors to consciousness detectors spanning every scale of existence.',
    chips: ['CEN Sensing', 'IFABit Encoding', 'Quantum Sensors', 'Energy Detection', 'Universal Measurement'],
  },
  {
    name: 'Ifa Glasses',
    subtitle: 'Vision Extension Technology',
    icon: '◎',
    accent: '#8b5cf6',
    desc: 'Vision extension instruments operating beyond the visible light spectrum — infrared, ultraviolet, radio, and consciousness wave bands — for augmented polymathic perception of all energy states.',
    chips: ['Beyond Visible Light', 'Infrared Vision', 'UV Extension', 'CEN Augmentation', 'Spectral Range'],
  },
  {
    name: 'Ifa Approach',
    subtitle: 'Consciousness & Perception Mechanics',
    icon: '⬡',
    accent: '#f5c518',
    desc: 'The systematic study of consciousness and perception mechanics as an energyform within IFABOK — how the observer interacts with, transforms, and is transformed by the observed phenomenon.',
    chips: ['Consciousness Science', 'Perception Mechanics', 'Observer Effect', 'CEN Approach', 'IFABOK'],
  },
  {
    name: 'Ifa Systems',
    subtitle: 'Advanced Observational & Modeling Systems',
    icon: '⊞',
    accent: '#4361ee',
    desc: 'Integrated observational and modeling frameworks combining all Ifa Technologies — from CODAR networks to Ifa Mechanics systems for universal knowledge mapping and civilisation-scale modeling.',
    chips: ['CODAR Networks', 'Ifa Mechanics', 'Universal Modeling', 'Knowledge Mapping', 'CEN Systems'],
  },
];

const ENERGY_PIPELINE = [
  {
    step: '01', label: 'CEN Energy', icon: '⊛',
    desc: 'All phenomena originate as Consciousness-Energy (CEN) — the fundamental substrate of the IFA Internet. Ogbe (I) = Energy; Oyeku (II) = Anergy. Every field of knowledge is a CEN manifestation.',
    accent: '#f5c518',
  },
  {
    step: '02', label: 'Ifascope Detection', icon: '◎',
    desc: 'Universal viewing instruments (ẹ̀rọ ìfigbogbo-ara-ríran) detect energy signatures across all frequency bands and scales — from atomic to cosmic, visible to conscious.',
    accent: '#8b5cf6',
  },
  {
    step: '03', label: 'IfaView Transformation', icon: '≋',
    desc: 'Frame-of-reference transformation — the detected energy is re-expressed in a target discipline\'s language, revealing the hidden equivalences across all knowledge fields.',
    accent: '#00d9b8',
  },
  {
    step: '04', label: 'IFABit Encoding', icon: '⬡',
    desc: 'The transformed energy is encoded as IFABits — the universal binary representation of all states of existence, grounded in the 256 Odu Ifa knowledge architecture.',
    accent: '#4361ee',
  },
  {
    step: '05', label: 'Polymathic Perception', icon: '◈',
    desc: 'The polymathic observer perceives integrated knowledge — seeing all disciplines as one unified energyform through the IfaLens. Everything becomes One CEN Energy.',
    accent: '#00e07c',
  },
];

const POLYMATHIC_LINKS = [
  { name: 'IFA Mathematics', subtitle: 'TOE Mathematics', url: 'https://toe.cenproject.org/ifa-mathematics-toe-mathematics/', accent: '#f5c518', icon: '∑', desc: '16 Ifa Axioms — the mathematical laws governing all knowledge fields.' },
  { name: 'IfaGebra', subtitle: 'AlgebroE · TOEGebra', url: 'https://toe.cenproject.org/ifagebra-overview/', accent: '#7c4dff', icon: '⊕', desc: 'The Algebra of Everything — Ogbe energy fields spanning all domains.' },
  { name: 'Ifa Matrix', subtitle: 'MatrixoE', url: '/ifa-matrix/', accent: '#4361ee', icon: '⊞', desc: '8 SIDECHRX Principles mapping all knowledge fields and structures.' },
  { name: 'Ifa Mechanics', subtitle: 'MechoE', url: '/ifa-mechanics/', accent: '#e9498a', icon: '◎', desc: 'Consciousness Mechanics — all disciplines as energyforms in IFA Binary.' },
  { name: 'Ifa Polymathy', subtitle: 'Polymathic Engine', url: 'https://toe.cenproject.org/ifa-polymathy-toe-polymathy/', accent: '#00d9b8', icon: '⬡', desc: 'Official polymathic engine — the Polymathic Arsenal of the IFA Internet.' },
  { name: 'IFA Analysis', subtitle: 'AnalysoE', url: '/ifa-analysis/', accent: '#f0920c', icon: '∫', desc: 'Unified analytical engine — meta-analysis across 256 Odu Ifa codes.' },
];

// ── IfaNugget — Ayò Ọlọ́pọ́nfá Wisdom Cards ──────────────────
const ATTITUDES = [
  { num: '01', sym: '🌱', name: 'SOWING',      sub: 'Plant with Intention',    color: '#f0920c', desc: 'Every seed placed in the wrong pot costs you the game. Ayò teaches deliberate, purposeful action — never move without thought.' },
  { num: '02', sym: '◉',  name: 'VISION',      sub: 'See Ahead',               color: '#8b5cf6', desc: 'The master looks 7 moves deep. Real Ayò players must read the board\'s future, not just its present state.' },
  { num: '03', sym: '⚖',  name: 'BALANCE',     sub: 'Leave Room for All',      color: '#00d9b8', desc: 'The starvation rule forbids emptying your opponent\'s side. Ifa teaches: never take so much that you destroy the ecosystem of exchange.' },
  { num: '04', sym: '⟳',  name: 'RHYTHM',      sub: 'Move with the Cycle',     color: '#6366f1', desc: 'Seeds flow counterclockwise without pause. Ayò teaches you to move in harmony with natural cycles, not against them.' },
  { num: '05', sym: '⚡', name: 'OPPORTUNITY', sub: 'Capture the Chain',       color: '#f5c518', desc: 'Chain captures reward the attentive mind. Success belongs to those who recognise a sequence of opportunities and act swiftly.' },
  { num: '06', sym: '▲',  name: 'PROGRESSION', sub: 'Rise Through the Levels', color: '#00c87c', desc: 'From Òpè to Àgbà-Ọ̀ta. True mastery is a journey of deliberate, incremental growth — one level at a time.' },
  { num: '07', sym: '⬡',  name: 'KNOWLEDGE',   sub: 'Know Your 16 Fields',     color: '#e040fb', desc: 'Each of the 16 Pots maps to an Odu. The polymathic player — versed in all 16 — holds the deepest advantage.' },
  { num: '08', sym: '◎',  name: 'HARMONY',     sub: 'Two Players, One Board',  color: '#3b9eff', desc: 'Ayò is not merely conquest — it is a meta-model of Ifa exchange. True victory is the elevation of both players through the game.' },
];

const POLYMATH_SKILLS = [
  { sym: '∞',  name: 'Polymathic Vision',          color: '#8b5cf6', desc: 'See all 16 fields of knowledge as one unified system — the board as the universe, every move a cross-disciplinary insight.' },
  { sym: '∑',  name: 'Mathematical Reasoning',     color: '#f0920c', desc: 'Apply Ifa mathematical methods across all disciplines. Every seed sown is an equation; every capture is a proof.' },
  { sym: '⊕',  name: 'Interdisciplinary Thinking', color: '#00d9b8', desc: 'Cross knowledge boundaries as seeds cross pots. True insight lives at the intersection of all disciplines.' },
  { sym: '⬡',  name: 'Systems Thinking',           color: '#6366f1', desc: 'The board is a living system. Every action ripples across the whole — think in systems, act in systems.' },
  { sym: '⚡', name: 'Opportunity Intelligence',   color: '#f5c518', desc: 'Where others see empty pots, you see chain captures. Transform every obstacle into a sequence of advantages.' },
  { sym: '⚖',  name: 'Ethics & Safety',            color: '#00c87c', desc: 'The starvation rule is law. Operate with the conviction that balance, fairness, and safety are non-negotiable in every field.' },
  { sym: '◉',  name: 'Pattern Recognition',        color: '#e040fb', desc: 'Read the board across 256 Odu states. The master player sees the pattern before it fully forms.' },
  { sym: 'Ẹ',  name: 'Deep Play',                  color: '#3b9eff', desc: 'Ayò means Joy. The deepest learning happens through play — engage fully, learn joyfully, grow continuously.' },
  { sym: '⧖',  name: 'Strategic Patience',         color: '#ff6b35', desc: 'Know when to wait and when to act. Timing is the hidden variable in every equation — mastering it is mastery itself.' },
  { sym: '⊛',  name: 'Wisdom in Action',           color: '#f472b6', desc: 'Translate insight into real-world impact. The game is preparation; the world is the board that truly matters.' },
];

// ── IfaNugget SVG helpers ─────────────────────────────────────
function nuggetWrapSVG(text, x, y, maxW, fontSize, fill, lineH) {
  const cpl = Math.floor(maxW / (fontSize * 0.57));
  const words = text.split(' ');
  const lines = [];
  let cur = '';
  words.forEach(w => {
    if ((cur + w).length > cpl && cur) { lines.push(cur.trim()); cur = w + ' '; }
    else cur += w + ' ';
  });
  if (cur.trim()) lines.push(cur.trim());
  const lh = lineH || (fontSize + 3);
  return lines.slice(0, 5).map((l, i) =>
    `<text x="${x}" y="${y + i * lh}" fill="${fill}" font-size="${fontSize}" font-family="'Segoe UI',system-ui,sans-serif">${l.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}</text>`
  ).join('');
}

function nuggetGridSVG(W, H, step) {
  const s = step || 60;
  const lines = [];
  for (let x = 0; x <= W; x += s) lines.push(`<line x1="${x}" y1="0" x2="${x}" y2="${H}" stroke="rgba(255,255,255,0.03)" stroke-width="1"/>`);
  for (let y = 0; y <= H; y += s) lines.push(`<line x1="0" y1="${y}" x2="${W}" y2="${y}" stroke="rgba(255,255,255,0.03)" stroke-width="1"/>`);
  return lines.join('');
}

function buildAttitudesSVG() {
  const W = 1200, H = 930;
  const cols = 4, cw = 258, ch = 295, gap = 15;
  const gridW = cols * cw + (cols - 1) * gap;
  const gx = Math.round((W - gridW) / 2);
  const gy = 220;

  const potsSVG = ATTITUDES.flatMap((att, i) => [
    `<circle cx="${120 + i * 122}" cy="172" r="18" fill="none" stroke="${att.color}" stroke-width="1.5" opacity="0.55"/>`,
    `<circle cx="${120 + i * 122}" cy="172" r="7" fill="${att.color}" opacity="0.4"/>`,
    `<circle cx="${120 + i * 122}" cy="197" r="16" fill="none" stroke="${att.color}" stroke-width="1" opacity="0.35"/>`,
    `<circle cx="${120 + i * 122}" cy="197" r="5" fill="${att.color}" opacity="0.25"/>`,
  ]).join('');

  const cardsSVG = ATTITUDES.map((att, i) => {
    const col = i % cols, row = Math.floor(i / cols);
    const x = gx + col * (cw + gap), y = gy + row * (ch + gap);
    return `
      <g>
        <rect x="${x}" y="${y}" width="${cw}" height="${ch}" rx="12" fill="#0a0f1a" stroke="${att.color}" stroke-width="1.5" stroke-opacity="0.5"/>
        <rect x="${x}" y="${y}" width="4" height="${ch}" rx="2" fill="${att.color}"/>
        <text x="${x + cw - 14}" y="${y + 22}" text-anchor="end" fill="${att.color}" font-size="10" font-family="monospace" font-weight="700" opacity="0.65">${att.num}</text>
        <text x="${x + 18}" y="${y + 58}" fill="${att.color}" font-size="28" font-family="sans-serif">${att.sym}</text>
        <text x="${x + 18}" y="${y + 92}" fill="#e8ecf2" font-size="15" font-family="'Segoe UI',system-ui,sans-serif" font-weight="800">${att.name}</text>
        <rect x="${x + 18}" y="${y + 100}" width="36" height="2" rx="1" fill="${att.color}" opacity="0.7"/>
        <text x="${x + 18}" y="${y + 120}" fill="${att.color}" font-size="10.5" font-family="'Segoe UI',system-ui,sans-serif">${att.sub}</text>
        ${nuggetWrapSVG(att.desc, x + 18, y + 144, cw - 30, 11.5, '#6e90b8', 17)}
      </g>`;
  }).join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs><radialGradient id="bg1" cx="50%" cy="50%" r="65%"><stop offset="0%" stop-color="#0d1322"/><stop offset="100%" stop-color="#06080e"/></radialGradient></defs>
  <rect width="${W}" height="${H}" fill="url(#bg1)"/>
  ${nuggetGridSVG(W, H)}
  <text x="${W/2}" y="46" text-anchor="middle" fill="#f0920c" font-size="10.5" font-family="'Segoe UI',system-ui,sans-serif" font-weight="700" letter-spacing="3">IFA ACADEMY OF POLYMATHS · IFANUGGET · IFANIMATION</text>
  <text x="${W/2}" y="86" text-anchor="middle" fill="#e8ecf2" font-size="27" font-family="'Segoe UI',system-ui,sans-serif" font-weight="800">8 ATTITUDES YOU CAN LEARN FROM AYÒ IFÁ GAME</text>
  <text x="${W/2}" y="114" text-anchor="middle" fill="#6e90b8" font-size="13" font-family="'Segoe UI',system-ui,sans-serif">Ayò Ọlọ́pọ́nfá · The 16-Pot Ifa Game · IfaLens Platform · ifainternet.org/ifa-lens</text>
  <line x1="120" y1="134" x2="${W-120}" y2="134" stroke="rgba(240,146,12,0.22)" stroke-width="1"/>
  ${potsSVG}
  ${cardsSVG}
  <text x="${W/2}" y="${H-16}" text-anchor="middle" fill="#1c2b3a" font-size="10" font-family="'Segoe UI',system-ui,sans-serif">ifainternet.org/ifa-lens · IFA Academy of Polymaths · Ayò Ọlọ́pọ́nfá · © CENProject Innovations Limited 2026</text>
</svg>`;
}

function buildPolymathSVG() {
  const W = 1200, H = 980;
  const hx = 600, hy = 500, r = 310;
  const n = POLYMATH_SKILLS.length;
  const cw = 168, ch = 118;

  const positions = POLYMATH_SKILLS.map((_, i) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI / n);
    return { x: Math.round(hx + r * Math.cos(a)), y: Math.round(hy + r * Math.sin(a)) };
  });

  const linesSVG = positions.map((pos, i) =>
    `<line x1="${hx}" y1="${hy}" x2="${pos.x}" y2="${pos.y}" stroke="${POLYMATH_SKILLS[i].color}" stroke-width="1" stroke-opacity="0.22" stroke-dasharray="5 5"/>`
  ).join('');

  const cardsSVG = positions.map((pos, i) => {
    const sk = POLYMATH_SKILLS[i];
    const x = pos.x - cw / 2, y = pos.y - ch / 2;
    return `
      <g>
        <rect x="${x}" y="${y}" width="${cw}" height="${ch}" rx="10" fill="#0a0f1a" stroke="${sk.color}" stroke-width="1.5" stroke-opacity="0.5"/>
        <text x="${pos.x}" y="${y + 26}" text-anchor="middle" fill="${sk.color}" font-size="18" font-family="sans-serif">${sk.sym}</text>
        ${nuggetWrapSVG(sk.name, x + 10, y + 46, cw - 20, 10, '#e8ecf2', 13)}
        ${nuggetWrapSVG(sk.desc, x + 10, y + 66, cw - 20, 9, '#6e90b8', 12)}
      </g>`;
  }).join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs><radialGradient id="bg2" cx="50%" cy="48%" r="60%"><stop offset="0%" stop-color="#0d1322"/><stop offset="100%" stop-color="#06080e"/></radialGradient></defs>
  <rect width="${W}" height="${H}" fill="url(#bg2)"/>
  ${nuggetGridSVG(W, H)}
  <text x="${W/2}" y="44" text-anchor="middle" fill="#8b5cf6" font-size="10.5" font-family="'Segoe UI',system-ui,sans-serif" font-weight="700" letter-spacing="3">IFA ACADEMY OF POLYMATHS · IFANUGGET · IFANIMATION</text>
  <text x="${W/2}" y="82" text-anchor="middle" fill="#e8ecf2" font-size="25" font-family="'Segoe UI',system-ui,sans-serif" font-weight="800">THE POLYMATHIC MIND — WHAT AYÒ IFÁ TEACHES</text>
  <text x="${W/2}" y="108" text-anchor="middle" fill="#6e90b8" font-size="13" font-family="'Segoe UI',system-ui,sans-serif">10 Polymathic Skills · IFA Academy of Polymaths · IfaLens Platform · ifainternet.org/ifa-lens</text>
  <line x1="120" y1="128" x2="${W-120}" y2="128" stroke="rgba(139,92,246,0.2)" stroke-width="1"/>
  <circle cx="${hx}" cy="${hy}" r="${r}" fill="none" stroke="rgba(139,92,246,0.07)" stroke-width="1"/>
  ${linesSVG}
  ${cardsSVG}
  <circle cx="${hx}" cy="${hy}" r="100" fill="#0d1322" stroke="rgba(139,92,246,0.45)" stroke-width="2"/>
  <circle cx="${hx}" cy="${hy}" r="82" fill="#0a0f1a" stroke="rgba(139,92,246,0.25)" stroke-width="1"/>
  <text x="${hx}" y="${hy - 22}" text-anchor="middle" fill="#8b5cf6" font-size="26" font-family="sans-serif">⬡</text>
  <text x="${hx}" y="${hy + 8}" text-anchor="middle" fill="#e8ecf2" font-size="12" font-family="'Segoe UI',system-ui,sans-serif" font-weight="800">Ayò Ọlọ́pọ́nfá</text>
  <text x="${hx}" y="${hy + 24}" text-anchor="middle" fill="#6e90b8" font-size="10" font-family="'Segoe UI',system-ui,sans-serif">16-Pot Ifa Game</text>
  <text x="${hx}" y="${hy + 40}" text-anchor="middle" fill="#6366f1" font-size="9" font-family="'Segoe UI',system-ui,sans-serif" letter-spacing="1">POLYMATHIC SKILLS</text>
  <text x="${W/2}" y="${H-16}" text-anchor="middle" fill="#1c2b3a" font-size="10" font-family="'Segoe UI',system-ui,sans-serif">ifainternet.org/ifa-lens · IFA Academy of Polymaths · Ayò Ọlọ́pọ́nfá · © CENProject Innovations Limited 2026</text>
</svg>`;
}

function nuggetDownload(designNum, format) {
  const svg = designNum === 1 ? buildAttitudesSVG() : buildPolymathSVG();
  const W = 1200, H = designNum === 1 ? 930 : 980;
  const filename = designNum === 1 ? 'ayo-8-attitudes' : 'ayo-polymathic-skills';

  const svgBlob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
  const svgUrl = URL.createObjectURL(svgBlob);

  if (format === 'svg') {
    const a = document.createElement('a');
    a.href = svgUrl; a.download = filename + '.svg';
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(svgUrl), 1200);
  } else {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = W * 2; canvas.height = H * 2;
      const ctx = canvas.getContext('2d');
      ctx.scale(2, 2);
      ctx.drawImage(img, 0, 0, W, H);
      canvas.toBlob(pngBlob => {
        const pngUrl = URL.createObjectURL(pngBlob);
        const a = document.createElement('a');
        a.href = pngUrl; a.download = filename + '.png';
        document.body.appendChild(a); a.click(); document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(pngUrl), 1200);
      }, 'image/png');
      URL.revokeObjectURL(svgUrl);
    };
    img.src = svgUrl;
  }
}

// ── Header ────────────────────────────────────────────────────
function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return (
    <header className={`site-header${scrolled ? ' site-header--scrolled' : ''}`}>
      <div className="header__inner">
        <a href="/" className="header__logo">
          <span className="header__logo-ifa">Ifa</span>
          <span className="header__logo-rest">Lens</span>
          <span className="header__logo-sep">·</span>
          <span className="header__logo-tag">LensoE</span>
        </a>
        <nav className="header__nav">
          <a href="#ifaview"   className="header__link">IfaView</a>
          <a href="#ifascopes" className="header__link">Ifascopes</a>
          <a href="#frame-ref" className="header__link">Frame-Ref</a>
          <a href="#ifa-tech"  className="header__link">Technologies</a>
          <a href="#energy"    className="header__link">CEN Energy</a>
          <a href="#about"     className="header__link">About</a>
          <a href="https://toe.cenproject.org/ifalens/" target="_blank" className="header__cta">
            Open Platform →
          </a>
        </nav>
      </div>
    </header>
  );
}

// ── Hero ──────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="hero">
      <div className="hero__grid" aria-hidden="true" />
      <div className="hero__symbols" aria-hidden="true">
        {LENS_SYMBOLS.map((sym, i) => (
          <span
            key={i}
            className="hero__sym"
            style={{
              '--sx':  `${(i * 5.3 + 4) % 96}%`,
              '--sy':  `${(i * 11.7 + 8) % 88}%`,
              '--sd':  `${i * 0.6}s`,
              '--ss':  `${4 + (i % 6) * 0.7}s`,
              '--sop': `${0.05 + (i % 5) * 0.03}`,
            }}
          >
            {sym}
          </span>
        ))}
      </div>

      <div className="hero__content">
        <div className="hero__badge">ẹ̀rọ ìfigbogbo-ara-ríran · LensoE · ToELens</div>
        <h1 className="hero__title">
          <span className="hero__title-ifa">Ifa</span>
          <span className="hero__title-rest">Lens</span>
          <br />
          <span className="hero__title-sub">The Lens of Everything</span>
        </h1>
        <p className="hero__lead">
          A polymathic Tool for learning all fields and examining all issues from every
          angle possible and impossible — using the <strong>IFA System</strong>, <strong>256 Odu Ifa</strong>,
          and <strong>Consciousness Energy</strong> as the universal Lens.
        </p>

        <div className="hero__stats">
          {STATS.map(s => (
            <div key={s.label} className="hero__stat">
              <span className="hero__stat-val">{s.value}</span>
              <span className="hero__stat-label">{s.label}</span>
              <span className="hero__stat-sub">{s.sub}</span>
            </div>
          ))}
        </div>

        <div className="hero__actions">
          <a href="#ifascopes" className="hero__btn hero__btn--primary">Explore Ifascopes →</a>
          <a href="./playground/" className="hero__btn hero__btn--view">
            IfaView Playground ◎
          </a>
          <a href="https://toe.cenproject.org/ifalens/" target="_blank" className="hero__btn hero__btn--ghost">
            Full Platform
          </a>
        </div>
      </div>

      <div className="hero__lens" aria-hidden="true">
        <div className="lens__ring lens__ring--1" />
        <div className="lens__ring lens__ring--2" />
        <div className="lens__ring lens__ring--3" />
        <div className="lens__core">◎</div>
      </div>
    </section>
  );
}

// ── IfaLens 0+8D Viewing Matrix ───────────────────────────────
function IfaLensMatrix() {
  const [active, setActive] = useState(false);
  const [hovered, setHovered] = useState(null);

  const cx = 310, cy = 270, nodeR = 172, centerR = 60, dimR = 32;
  const accent = '#00d9b8';

  const VIEWS = [
    { label: 'Scientific View',      line1: 'Scientific',      line2: 'View', letter: 'Sc', color: '#00d9b8' },
    { label: 'Technological View',   line1: 'Technological',   line2: 'View', letter: 'Tc', color: '#8b5cf6' },
    { label: 'Engineering View',     line1: 'Engineering',     line2: 'View', letter: 'En', color: '#3b9eff' },
    { label: 'Artistic View',        line1: 'Artistic',        line2: 'View', letter: 'Ar', color: '#ec4899' },
    { label: 'Mathematical View',    line1: 'Mathematical',    line2: 'View', letter: 'Ma', color: '#f0920c' },
    { label: 'Socioscientific View', line1: 'Socioscientific', line2: 'View', letter: 'Ss', color: '#00c87c' },
    { label: 'Educational View',     line1: 'Educational',     line2: 'View', letter: 'Ed', color: '#a78bfa' },
    { label: 'Others',               line1: 'Others',          line2: null,   letter: 'Ot', color: '#6366f1' },
  ];

  const dims = VIEWS.map((v, i) => {
    const angle = (i / 8) * 2 * Math.PI - Math.PI / 2;
    return { ...v, angle, x: cx + nodeR * Math.cos(angle), y: cy + nodeR * Math.sin(angle) };
  });

  const hovDim = hovered !== null ? dims[hovered] : null;

  const getAnchor = (angle) => {
    const cosA = Math.cos(angle);
    return Math.abs(cosA) < 0.25 ? 'middle' : cosA > 0 ? 'start' : 'end';
  };

  return (
    <div className="ilm">
      <div className="ilm__label">
        {!active
          ? <>Click <strong style={{ color: accent }}>Energy: Knowledge</strong> to open the 0+8D Viewing Matrix →</>
          : <span style={{ color: accent }}>◈ 0+8D Matrix open — hover any view node to explore</span>
        }
      </div>

      <svg viewBox="0 0 620 540" className="ilm__svg">
        <defs>
          <radialGradient id="ilm-cg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={accent} stopOpacity="0.3" />
            <stop offset="100%" stopColor={accent} stopOpacity="0" />
          </radialGradient>
          <radialGradient id="ilm-bg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0d1320" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#050810" stopOpacity="0" />
          </radialGradient>
          <marker id="ilm-arrow" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
            <polygon points="0 1, 0 6, 7 3.5" fill={accent} />
          </marker>
          <path id="ilm-arc"
            d={`M ${cx},${cy - nodeR - 22} A ${nodeR + 22},${nodeR + 22} 0 1 1 ${cx - 0.01},${cy - nodeR - 22}`} />
        </defs>

        {/* Background halo */}
        <circle cx={cx} cy={cy} r={nodeR + 55} fill="url(#ilm-bg)" />

        {/* Dashed orbit ring */}
        <circle cx={cx} cy={cy} r={nodeR} fill="none"
          stroke="rgba(255,255,255,0.045)" strokeWidth="1" strokeDasharray="3 8" />

        {/* Orbital ring text — fades in when active */}
        <text fill="rgba(255,255,255,0.13)" fontSize="7" letterSpacing="2.5" fontFamily="monospace"
          opacity={active ? 1 : 0}
          style={{ transition: 'opacity 0.7s ease 0.5s' }}>
          <textPath startOffset="3%" href="#ilm-arc">
            {'Sc · Tc · En · Ar · Ma · Ss · Ed · Ot · 0+8D VIEWING MATRIX · IFA LENS ·'}
          </textPath>
        </text>

        {/* Spokes — draw outward from center, with outward arrow */}
        {dims.map((d, i) => {
          const sx = cx + (centerR + 9) * Math.cos(d.angle);
          const sy = cy + (centerR + 9) * Math.sin(d.angle);
          const ex = cx + (nodeR - dimR - 7) * Math.cos(d.angle);
          const ey = cy + (nodeR - dimR - 7) * Math.sin(d.angle);
          const len = Math.hypot(ex - sx, ey - sy).toFixed(1);
          const delay = active ? i * 58 : 0;
          return (
            <line key={i} x1={sx} y1={sy} x2={ex} y2={ey}
              stroke={d.color} strokeWidth="2"
              strokeDasharray={len}
              strokeDashoffset={active ? 0 : len}
              markerEnd="url(#ilm-arrow)"
              opacity={active ? 0.65 : 0}
              style={{ transition: `stroke-dashoffset 0.62s cubic-bezier(.4,0,.2,1) ${delay}ms, opacity 0.28s ease ${delay}ms` }}
            />
          );
        })}

        {/* Outer nodes + floating labels */}
        {dims.map((d, i) => {
          const isHov = hovered === i;
          const delay = active ? i * 58 + 210 : 0;
          const labelR = nodeR + dimR + 20;
          const lx = cx + labelR * Math.cos(d.angle);
          const ly = cy + labelR * Math.sin(d.angle);
          const anchor = getAnchor(d.angle);
          const sinA = Math.sin(d.angle);
          const dy1 = sinA < -0.25 ? -10 : sinA > 0.25 ? 5 : -5;
          const dy2 = dy1 + 12;
          return (
            <g key={i} opacity={active ? 1 : 0}
              style={{ transition: `opacity 0.42s ease ${delay}ms` }}>
              {/* Glow halo */}
              <circle cx={d.x} cy={d.y} r={isHov ? 50 : 40} fill={d.color}
                opacity={isHov ? 0.22 : 0.08}
                style={{ transition: 'opacity 0.2s' }} />
              {/* Node circle */}
              <circle cx={d.x} cy={d.y} r={dimR}
                fill="#0c1218" stroke={d.color}
                strokeWidth={isHov ? 3.5 : 2.2}
                style={{ transition: 'stroke-width 0.18s' }} />
              {/* Letter code */}
              <text x={d.x} y={d.y + 6} textAnchor="middle"
                fill={d.color} fontSize="17" fontWeight="800" fontFamily="monospace">
                {d.letter}
              </text>
              {/* External floating label — line 1 */}
              <text x={lx} y={ly + dy1} textAnchor={anchor}
                fill={d.color} fontSize="8.5" fontWeight="600" opacity="0.92">
                {d.line1}
              </text>
              {/* External floating label — line 2 */}
              {d.line2 && (
                <text x={lx} y={ly + dy2} textAnchor={anchor}
                  fill={d.color} fontSize="7.5" opacity="0.58">
                  {d.line2}
                </text>
              )}
              {/* Invisible hit area */}
              <circle cx={d.x} cy={d.y} r={dimR + 14} fill="transparent"
                style={{ cursor: 'pointer' }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)} />
            </g>
          );
        })}

        {/* Center node — Ifa Circle */}
        <g onClick={() => { setActive(v => !v); setHovered(null); }} style={{ cursor: 'pointer' }}>
          {/* Pulse ring */}
          <circle cx={cx} cy={cy} r="88" fill="none"
            stroke={accent} strokeWidth="1.5" className="ilm__pulse" />
          {/* Glow halo */}
          <circle cx={cx} cy={cy} r={centerR + 24} fill="url(#ilm-cg)" />
          {/* Main circle body */}
          <circle cx={cx} cy={cy} r={centerR}
            fill="#0c1218" stroke={accent} strokeWidth="3" />
          {/* Ifa Circle — clockwise arc arrow at east rim */}
          <path d={`M ${cx + centerR},${cy - 9} A ${centerR},${centerR} 0 0,1 ${cx + centerR},${cy + 9}`}
            fill="none" stroke={accent} strokeWidth="2.5"
            markerEnd="url(#ilm-arrow)" />
          {/* Node text */}
          <text x={cx} y={cy - 9} textAnchor="middle"
            fill={accent} fontSize="13.5" fontWeight="900" letterSpacing="0.5" fontFamily="monospace">
            Energy:
          </text>
          <text x={cx} y={cy + 11} textAnchor="middle"
            fill={accent} fontSize="13.5" fontWeight="900" letterSpacing="0.5" fontFamily="monospace">
            Knowledge
          </text>
          <text x={cx} y={cy + 32} textAnchor="middle"
            fill={accent} fontSize="8.5" opacity="0.55">
            {active ? '◈ CLICK TO CLOSE' : '↓ CLICK TO OPEN'}
          </text>
        </g>
      </svg>

      {hovDim ? (
        <div className="ilm__info">
          <span className="ilm__info-key" style={{ color: hovDim.color }}>{hovDim.letter}</span>
          <span className="ilm__info-label" style={{ color: hovDim.color }}>{hovDim.label}</span>
        </div>
      ) : active ? (
        <div className="ilm__hint-act">Hover any view node to explore · 8 Knowledge Views active</div>
      ) : (
        <div style={{ height: '28px' }} />
      )}
    </div>
  );
}

// ── OrisaMatrix (Dual 0+8D Anti-Knowledge Matrix) ────────────
function OrisaMatrix() {
  const [active, setActive] = useState(false);
  const [hovered, setHovered] = useState(null);

  const cx = 310, cy = 270, nodeR = 172, centerR = 60, dimR = 32;
  const accent = '#e63946';

  const ANTI_VIEWS = [
    { label: 'Anti-Scientific View',      line1: 'Anti-Scientific',      line2: 'View/Approach', letter: '¬Sc', color: '#ff6b6b' },
    { label: 'Anti-Technological View',   line1: 'Anti-Technological',   line2: 'View/Approach', letter: '¬Tc', color: '#ff8c42' },
    { label: 'Anti-Engineering View',     line1: 'Anti-Engineering',     line2: 'View/Approach', letter: '¬En', color: '#ffbe3f' },
    { label: 'Anti-Artistic View',        line1: 'Anti-Artistic',        line2: 'View/Approach', letter: '¬Ar', color: '#e040fb' },
    { label: 'Anti-Mathematical View',    line1: 'Anti-Mathematical',    line2: 'View/Approach', letter: '¬Ma', color: '#ff4f79' },
    { label: 'Anti-Socioscientific View', line1: 'Anti-Socioscientific', line2: 'View/Approach', letter: '¬Ss', color: '#ff6e9c' },
    { label: 'Anti-Educational View',     line1: 'Anti-Educational',     line2: 'View/Approach', letter: '¬Ed', color: '#ff7043' },
    { label: 'Anti-Others',               line1: 'Anti-Others',          line2: null,             letter: '¬Ot', color: '#c44fce' },
  ];

  const dims = ANTI_VIEWS.map((v, i) => {
    const angle = (i / 8) * 2 * Math.PI - Math.PI / 2;
    return { ...v, angle, x: cx + nodeR * Math.cos(angle), y: cy + nodeR * Math.sin(angle) };
  });

  const hovDim = hovered !== null ? dims[hovered] : null;

  const getAnchor = (angle) => {
    const cosA = Math.cos(angle);
    return Math.abs(cosA) < 0.25 ? 'middle' : cosA > 0 ? 'start' : 'end';
  };

  return (
    <div className="ilm orm">
      <div className="ilm__label">
        {!active
          ? <>Click <strong style={{ color: accent }}>Anergy: Anti-Knowledge</strong> to open the OrisaMatrix →</>
          : <span style={{ color: accent }}>⊗ OrisaMatrix open — hover any anti-view node to explore</span>
        }
      </div>

      <svg viewBox="0 0 620 540" className="ilm__svg">
        <defs>
          <radialGradient id="orm-cg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={accent} stopOpacity="0.3" />
            <stop offset="100%" stopColor={accent} stopOpacity="0" />
          </radialGradient>
          <radialGradient id="orm-bg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1a0505" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#0a0202" stopOpacity="0" />
          </radialGradient>
          <marker id="orm-arrow" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
            <polygon points="0 1, 0 6, 7 3.5" fill={accent} />
          </marker>
          <path id="orm-arc"
            d={`M ${cx},${cy - nodeR - 22} A ${nodeR + 22},${nodeR + 22} 0 1 1 ${cx - 0.01},${cy - nodeR - 22}`} />
        </defs>

        {/* Background halo */}
        <circle cx={cx} cy={cy} r={nodeR + 55} fill="url(#orm-bg)" />

        {/* Dashed orbit ring */}
        <circle cx={cx} cy={cy} r={nodeR} fill="none"
          stroke="rgba(230,57,70,0.06)" strokeWidth="1" strokeDasharray="3 8" />

        {/* Orbital ring text */}
        <text fill="rgba(230,57,70,0.15)" fontSize="7" letterSpacing="2.5" fontFamily="monospace"
          opacity={active ? 1 : 0}
          style={{ transition: 'opacity 0.7s ease 0.5s' }}>
          <textPath startOffset="3%" href="#orm-arc">
            {'¬Sc · ¬Tc · ¬En · ¬Ar · ¬Ma · ¬Ss · ¬Ed · ¬Ot · ORISA MATRIX · ANTI-KNOWLEDGE ·'}
          </textPath>
        </text>

        {/* Spokes — REVERSED: inward arrows (start at outer node, end near center) */}
        {dims.map((d, i) => {
          const nearCenter = { x: cx + (centerR + 9) * Math.cos(d.angle), y: cy + (centerR + 9) * Math.sin(d.angle) };
          const nearOuter  = { x: cx + (nodeR - dimR - 7) * Math.cos(d.angle), y: cy + (nodeR - dimR - 7) * Math.sin(d.angle) };
          const len = Math.hypot(nearOuter.x - nearCenter.x, nearOuter.y - nearCenter.y).toFixed(1);
          const delay = active ? i * 58 : 0;
          return (
            <line key={i}
              x1={nearOuter.x} y1={nearOuter.y}
              x2={nearCenter.x} y2={nearCenter.y}
              stroke={d.color} strokeWidth="2"
              strokeDasharray={len}
              strokeDashoffset={active ? 0 : len}
              markerEnd="url(#orm-arrow)"
              opacity={active ? 0.65 : 0}
              style={{ transition: `stroke-dashoffset 0.62s cubic-bezier(.4,0,.2,1) ${delay}ms, opacity 0.28s ease ${delay}ms` }}
            />
          );
        })}

        {/* Outer nodes + floating labels */}
        {dims.map((d, i) => {
          const isHov = hovered === i;
          const delay = active ? i * 58 + 210 : 0;
          const labelR = nodeR + dimR + 20;
          const lx = cx + labelR * Math.cos(d.angle);
          const ly = cy + labelR * Math.sin(d.angle);
          const anchor = getAnchor(d.angle);
          const sinA = Math.sin(d.angle);
          const dy1 = sinA < -0.25 ? -10 : sinA > 0.25 ? 5 : -5;
          const dy2 = dy1 + 12;
          return (
            <g key={i} opacity={active ? 1 : 0}
              style={{ transition: `opacity 0.42s ease ${delay}ms` }}>
              <circle cx={d.x} cy={d.y} r={isHov ? 50 : 40} fill={d.color}
                opacity={isHov ? 0.22 : 0.08}
                style={{ transition: 'opacity 0.2s' }} />
              <circle cx={d.x} cy={d.y} r={dimR}
                fill="#180c0c" stroke={d.color}
                strokeWidth={isHov ? 3.5 : 2.2}
                style={{ transition: 'stroke-width 0.18s' }} />
              <text x={d.x} y={d.y + 6} textAnchor="middle"
                fill={d.color} fontSize="14" fontWeight="800" fontFamily="monospace">
                {d.letter}
              </text>
              <text x={lx} y={ly + dy1} textAnchor={anchor}
                fill={d.color} fontSize="8.5" fontWeight="600" opacity="0.92">
                {d.line1}
              </text>
              {d.line2 && (
                <text x={lx} y={ly + dy2} textAnchor={anchor}
                  fill={d.color} fontSize="7.5" opacity="0.58">
                  {d.line2}
                </text>
              )}
              <circle cx={d.x} cy={d.y} r={dimR + 14} fill="transparent"
                style={{ cursor: 'pointer' }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)} />
            </g>
          );
        })}

        {/* Center node — Oyeku / Anergy style */}
        <g onClick={() => { setActive(v => !v); setHovered(null); }} style={{ cursor: 'pointer' }}>
          <circle cx={cx} cy={cy} r="88" fill="none"
            stroke={accent} strokeWidth="1.5" className="orm__pulse" />
          <circle cx={cx} cy={cy} r={centerR + 24} fill="url(#orm-cg)" />
          <circle cx={cx} cy={cy} r={centerR}
            fill="#180c0c" stroke={accent} strokeWidth="3" />
          {/* Counter-clockwise arc arrow at west rim — dual of Ifa Circle */}
          <path d={`M ${cx - centerR},${cy - 9} A ${centerR},${centerR} 0 0,0 ${cx - centerR},${cy + 9}`}
            fill="none" stroke={accent} strokeWidth="2.5"
            markerEnd="url(#orm-arrow)" />
          <text x={cx} y={cy - 9} textAnchor="middle"
            fill={accent} fontSize="13.5" fontWeight="900" letterSpacing="0.5" fontFamily="monospace">
            Anergy:
          </text>
          <text x={cx} y={cy + 11} textAnchor="middle"
            fill={accent} fontSize="11" fontWeight="900" letterSpacing="0.3" fontFamily="monospace">
            Anti-Knowledge
          </text>
          <text x={cx} y={cy + 30} textAnchor="middle"
            fill={accent} fontSize="8.5" opacity="0.55">
            {active ? '⊗ CLICK TO CLOSE' : '↓ CLICK TO OPEN'}
          </text>
        </g>
      </svg>

      {hovDim ? (
        <div className="ilm__info">
          <span className="ilm__info-key" style={{ color: hovDim.color }}>{hovDim.letter}</span>
          <span className="ilm__info-label" style={{ color: hovDim.color }}>{hovDim.label}</span>
        </div>
      ) : active ? (
        <div className="ilm__hint-act" style={{ color: accent }}>Hover any anti-view node · OrisaMatrix active · Anti-Knowledge</div>
      ) : (
        <div style={{ height: '28px' }} />
      )}
    </div>
  );
}

// ── IfaView Section ───────────────────────────────────────────
function IfaViewSection() {
  const PRINCIPLES = [
    { icon: '⊛', label: 'CEN is Everything', desc: 'Consciousness-Energy is the single substrate of all phenomena across every discipline and field of knowledge.' },
    { icon: '◎', label: 'The Observer is the Lens', desc: 'The observer, the observation, and the observed are one energyform — IfaView unifies the knower and the known.' },
    { icon: '≋', label: 'Fields are Translations', desc: 'Every academic discipline is a translation of CEN Energy into a specialized vocabulary and notation system.' },
    { icon: '∞', label: '256 Viewing Angles', desc: '256 Odu Ifa provide 256 distinct polymathic viewing angles on any phenomenon, idea, or field.' },
  ];

  return (
    <section className="ifaview" id="ifaview">
      <div className="section__inner">
        <div className="ifaview__content">
          <div className="section__badge" style={{'--badge-c': '#00d9b8'}}>IfaView · CEN Foundation</div>
          <h2 className="ifaview__title">Everything is Viewed as Energy</h2>
          <p className="ifaview__lead">
            Also known as ToE View, IfaView is the foundational Axiom of IfaLens: everything in existence
            and every phenomenon — physical, mathematical, biological, cultural, artistic, and others — is
            a manifestation of <strong>Ogbe</strong>, Consciousness Energy (CEN). The IfaLens reframes
            every field of knowledge through this single, universal Lens.
          </p>
          <p className="ifaview__body">
            At the core of the IFA Internet, <strong>Ogbe</strong> (I) represents pure Energy and{' '}
            <strong>Oyeku</strong> (II) represents Anergy — together forming the IFABit Encoding System
            that encodes all of existence and all knowledge field. IfaView applies this principle
            polymathically: whether you look at a mathematical proof, a musical composition, a financial
            market, or a biological cell — you are observing CEN in different forms, states or types.
          </p>
          <div className="ifaview__principles">
            {PRINCIPLES.map(p => (
              <div key={p.label} className="ifaview__principle">
                <span className="ifaview__principle-icon">{p.icon}</span>
                <div>
                  <strong className="ifaview__principle-label">{p.label}</strong>
                  <p className="ifaview__principle-desc">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="ilm-pair">
          <div className="ilm-pair__col">
            <div className="ilm-pair__head">
              <span className="ilm-pair__name">IfaMatrix</span>
              <span className="ilm-pair__sub">0+8D Viewing Matrix · Energy: Knowledge</span>
            </div>
            <IfaLensMatrix />
          </div>

          <div className="ilm-pair__vsep">
            <div className="ilm-pair__vsep-line" />
            <span className="ilm-pair__vsep-label">⊗ Dual</span>
            <div className="ilm-pair__vsep-line" />
          </div>

          <div className="ilm-pair__col">
            <div className="ilm-pair__head">
              <span className="ilm-pair__name orm-name">OrisaMatrix</span>
              <span className="ilm-pair__sub">0+8D Anti-Knowledge · Anergy</span>
            </div>
            <OrisaMatrix />
          </div>
        </div>

        <div className="ilm-playground-gate">
          <div className="ilm-pg__glow" aria-hidden="true" />
          <p className="ilm-pg__prompt">
            You've seen how <strong>Energy: Knowledge</strong> and <strong>Anergy: Anti-Knowledge</strong> mirror each other
            through the 0+8D Dual Structure. Now step inside the living System —
          </p>
          <a href="./playground/" className="ilm-pg__btn">
            <span className="ilm-pg__btn-icon">◎</span>
            Enter IfaLens Playground
            <span className="ilm-pg__btn-arrow">→</span>
          </a>
          <p className="ilm-pg__hint">Interact with the IfaMatrix · Apply any Ifascope · Translate across fields</p>
        </div>
      </div>
    </section>
  );
}

// ── Ifascopes Section ─────────────────────────────────────────
function IfascopesSection() {
  const [cat, setCat] = useState('All');
  const filtered = cat === 'All' ? IFASCOPES : IFASCOPES.filter(s => s.category === cat);

  return (
    <section className="scopes" id="ifascopes">
      <div className="section__inner">
        <div className="section__head">
          <div className="section__badge" style={{'--badge-c': '#8b5cf6'}}>Ifascopy · ToEScopy</div>
          <h2 className="section__title">
            Ifascopes — <span className="section__title-yoruba">ẹ̀rọ ìfigbogbo-ara-ríran</span>
          </h2>
          <p className="section__lead">
            Universal Viewing Instruments — the Ifascopy framework unifying all imaging and sensing
            technologies under the IFA System. An interdisciplinary field of IFABOK that cuts across
            every field of knowledge, operating at fundamental energy levels.
          </p>
        </div>

        <div className="scopes__pipeline">
          {[['⊛','Energy'], ['≋','Transformation'], ['◉','Perception']].map(([icon, label], i) => (
            <React.Fragment key={label}>
              <div className="pipeline__step">
                <span className="pipeline__icon">{icon}</span>
                <span className="pipeline__label">{label}</span>
              </div>
              {i < 2 && <span className="pipeline__arrow">→</span>}
            </React.Fragment>
          ))}
        </div>

        <div className="scopes__cats">
          {SCOPE_CATS.map(c => (
            <button
              key={c}
              className={`scope-cat${cat === c ? ' scope-cat--active' : ''}`}
              onClick={() => setCat(c)}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="scopes__grid">
          {filtered.map(scope => (
            <div key={scope.id} className="scope-card">
              <div className="scope-card__top">
                <span className="scope-card__icon" style={{color: scope.accent}}>{scope.icon}</span>
                <span className="scope-card__cat">{scope.category}</span>
              </div>
              <h3 className="scope-card__name">{scope.name}</h3>
              <p className="scope-card__desc">{scope.desc}</p>
              <div className="scope-card__chips">
                {scope.sub.map(s => (
                  <span key={s} className="scope-chip" style={{'--cc': scope.accent}}>{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* IfaLang Key Vocabulary: narrowscope vs IfaScope */}
        <div className="ifalang-vocab">
          <div className="ifalang-vocab__label">IfaLang · Key Vocabulary</div>

          <div className="ifalang-vocab__grid">

            {/* narrowscope */}
            <div className="ifalang-vocab__card ifalang-vocab__card--narrow">
              <div className="ifalang-vocab__card-header">
                <span className="ifalang-vocab__icon">⊟</span>
                <div>
                  <h3 className="ifalang-vocab__term">narrowscope</h3>
                  <span className="ifalang-vocab__pron">pron. /ˈnarəʊskōp/ — like <em>microscope</em> or <em>horoscope</em></span>
                </div>
              </div>
              <p className="ifalang-vocab__def">
                The siloed or fragmented approach to knowledge prevalent in modern (Western) education
                systems — where each field is studied in isolation, cut off from the whole. Narrowscope
                produces specialists who see their silo deeply but cannot see the connections between
                all fields that constitute the full landscape of knowledge.
              </p>
              <div className="ifalang-vocab__chips">
                <span className="ifalang-vocab__chip">fragmented knowledge</span>
                <span className="ifalang-vocab__chip">siloed disciplines</span>
                <span className="ifalang-vocab__chip">Western education model</span>
              </div>
            </div>

            {/* IfaScope / OrisaScope */}
            <div className="ifalang-vocab__card ifalang-vocab__card--ifa">
              <div className="ifalang-vocab__card-header">
                <span className="ifalang-vocab__icon">◉</span>
                <div>
                  <h3 className="ifalang-vocab__term">IfaScope <span className="ifalang-vocab__aka">· OrisaScope</span></h3>
                  <span className="ifalang-vocab__pron">also: <em>polyscope</em> — a polymathic scope</span>
                </div>
              </div>
              <p className="ifalang-vocab__def">
                The polymathic, unified scope of knowledge rooted in Ifa — seeing all fields of
                knowledge as One and interweaving them together. IfaScope / OrisaScope recognises that
                every discipline is a translation of the same underlying Consciousness-Energy (CEN),
                and that true understanding requires holding all fields simultaneously in view.
              </p>
              <div className="ifalang-vocab__chips">
                <span className="ifalang-vocab__chip ifalang-vocab__chip--ifa">unified knowledge</span>
                <span className="ifalang-vocab__chip ifalang-vocab__chip--ifa">polymathic</span>
                <span className="ifalang-vocab__chip ifalang-vocab__chip--ifa">polyscope</span>
                <span className="ifalang-vocab__chip ifalang-vocab__chip--ifa">IFA Internet</span>
              </div>
            </div>

          </div>

          {/* contrast bar */}
          <div className="ifalang-vocab__contrast">
            <div className="ifalang-vocab__contrast-side ifalang-vocab__contrast-side--narrow">
              <span className="ifalang-vocab__contrast-label">narrowscope</span>
              <span className="ifalang-vocab__contrast-sub">Fragmented · Siloed · Finite</span>
            </div>
            <div className="ifalang-vocab__contrast-vs">
              <svg viewBox="0 0 60 24" width="60" height="24" aria-hidden="true">
                <polygon points="0,6 14,12 0,18" fill="#8b5cf6" opacity="0.7"/>
                <line x1="14" y1="12" x2="46" y2="12" stroke="#8b5cf6" strokeWidth="1.5" opacity="0.5"/>
                <polygon points="60,6 46,12 60,18" fill="#8b5cf6" opacity="0.7"/>
              </svg>
              <span>vs</span>
            </div>
            <div className="ifalang-vocab__contrast-side ifalang-vocab__contrast-side--ifa">
              <span className="ifalang-vocab__contrast-label">IfaScope · OrisaScope</span>
              <span className="ifalang-vocab__contrast-sub">Unified · Polymathic · Infinite</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

// ── Frame-of-Reference Transformer ───────────────────────────
function FrameTransformerSection() {
  const [active, setActive] = useState(0);
  const pair = FRAME_PAIRS[active];

  return (
    <section className="frame-ref" id="frame-ref">
      <div className="section__inner">
        <div className="section__head">
          <div className="section__badge" style={{'--badge-c': '#00e07c'}}>IFA Translation Layer · IfaLens Tool</div>
          <h2 className="section__title">Frame-of-Reference Transformer</h2>
          <p className="section__lead">
            IfaLens translates any concept from one discipline into the vocabulary of another —
            revealing deep equivalences hidden within Consciousness-Energy across all fields of knowledge.
          </p>
        </div>

        <div className="frame__tabs">
          {FRAME_PAIRS.map((p, i) => (
            <button
              key={i}
              className={`frame__tab${active === i ? ' frame__tab--active' : ''}`}
              onClick={() => setActive(i)}
            >
              <span style={{color: p.fromAccent}}>{p.from}</span>
              <span className="frame__tab-arrow">↔</span>
              <span style={{color: p.toAccent}}>{p.to}</span>
            </button>
          ))}
        </div>

        <div className="frame__body">
          <p className="frame__desc">{pair.desc}</p>

          <div className="frame__header-row">
            <div className="frame__col-head" style={{color: pair.fromAccent}}>{pair.from}</div>
            <div className="frame__col-head frame__col-head--center">IfaLens Translation</div>
            <div className="frame__col-head frame__col-head--right" style={{color: pair.toAccent}}>{pair.to}</div>
          </div>

          {pair.translations.map((t, i) => (
            <div key={i} className="frame__row">
              <div className="frame__cell frame__cell--from">{t.source}</div>
              <div className="frame__cell frame__cell--lens">
                <span className="frame__lens-icon">◎</span>
                {t.lens}
              </div>
              <div className="frame__cell frame__cell--to">{t.target}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Ifa Transformation Theory Section ────────────────────────
function IfaTransformSection() {
  const PILLARS = [
    {
      icon: '⊛',
      accent: '#f0920c',
      title: 'ToE Transform',
      sub: 'TransformoE · CEN Transform',
      desc: 'The meta-transform that contains all transforms in mathematics, physics, and every knowledge field — Fourier, Laplace, Wavelet, Z-Transform, and beyond, all as special cases.',
    },
    {
      icon: '∫̈',
      accent: '#00d9b8',
      title: 'IfaDifferintegral',
      sub: 'Fractional Calculus',
      desc: 'Generalizes differentiation and integration beyond integer orders — unifying Riemann–Liouville, Grünwald–Letnikov, Weyl, and Caputo differintegrals under one CEN framework.',
    },
    {
      icon: '⊗',
      accent: '#8b5cf6',
      title: 'OperatoE / AperatoE',
      sub: 'Ifa Operator Theory · Ose Meji',
      desc: 'Operators of Everything (OperatoE) paired with Non-Operators of Anergy (AperatoE) — the Dual Operator Structure governed by Ose Meji, the Ifa Law of all operations.',
    },
    {
      icon: '⌖',
      accent: '#4361ee',
      title: 'IFABit Encoding',
      sub: '16 Ifa Axioms',
      desc: 'All transformations encoded through the IFABit system — Ogbe (Energy · I) and Oyeku (Anergy · II) form the binary substrate of every transform kernel across all fields.',
    },
  ];

  const SUBSUMED = [
    { name: 'Fourier',     sym: 'ℱ', c: '#f0920c', url: 'https://en.wikipedia.org/wiki/Fourier_transform' },
    { name: 'Laplace',     sym: 'ℒ', c: '#00d9b8', url: 'https://en.wikipedia.org/wiki/Laplace_transform' },
    { name: 'Wavelet',     sym: '𝒲', c: '#8b5cf6', url: 'https://en.wikipedia.org/wiki/Wavelet_transform' },
    { name: 'Z-Transform', sym: 'ℤ', c: '#4361ee', url: 'https://en.wikipedia.org/wiki/Z-transform' },
    { name: 'Hilbert',     sym: 'ℋ', c: '#e63946', url: 'https://en.wikipedia.org/wiki/Hilbert_transform' },
    { name: 'Mellin',      sym: 'ℳ', c: '#f5c518', url: 'https://en.wikipedia.org/wiki/Mellin_transform' },
    { name: 'Radon',       sym: 'ℛ', c: '#00e07c', url: 'https://en.wikipedia.org/wiki/Radon_transform' },
    { name: 'Hankel',      sym: 'H',  c: '#ff6b6b', url: 'https://en.wikipedia.org/wiki/Hankel_transform' },
  ];

  return (
    <section className="ifa-transform" id="ifa-transform">
      <div className="section__inner">

        {/* Header */}
        <div className="section__head">
          <div className="section__badge" style={{'--badge-c': '#f0920c'}}>TransformoE · The Field of Transformations</div>
          <h2 className="section__title">Ifa Transformation Theory</h2>
          <p className="section__lead">
            Also called the <strong>Temic Transformation Theory</strong>, this meta-theory of
            Consciousness Mechanics (Ifa Mechanics) states that all fields and disciplines of knowledge
            generally involve studying the single System, Energy, <strong>Ogbe</strong>, or CEN —
            the <strong>BaseField</strong>.
          </p>
          <p className="ift__lead-body">
            In other words, all kinds of knowledge are <em>energyforms</em>, forms of Energy, or{' '}
            <em>energystates</em>, states of Energy. When disciplines or fields are seen this way and
            modelled as mathematical energyforms in the Ifagrams, the disciplines or fields are Energy
            transformations (transformations of energyforms or energystates). Therefore, all kinds of
            knowledge, disciplines, and fields are Energy transformations.
          </p>
          <p className="ift__lead-body">
            At the most fundamental level, all fields and disciplines are actually the same — which is
            Energy or Ogbe — and the disciplinary boundaries in modern schools and education systems are
            artificial, not an inherent property of knowledge or nature.
          </p>
          <p className="ift__lead-body">
            This is the Ifa Transformation Theory and is of paramount importance in developing the{' '}
            <strong>Grand Unified Theory (GUT)</strong> of any discipline or field, be it Physics,
            Mathematics, Finance, Psychology, Arts, any discipline at all, and consequently constructing
            the TOE, i.e., the <strong>IFA Internet</strong>.
          </p>
          <p className="ift__lead-body ift__lead-body--note">
            Ifa Transformation Theory is a more general form of <strong>Dirac transformation theory</strong> in
            Quantum Mechanics. Also known as the <em>Dirac–Jordan transformation theory</em>, it was
            developed independently by Paul Dirac and Pascual Jordan around 1927.
          </p>
        </div>

        {/* Formula label → image → subsumed transforms */}
        <div className="ift__formula-block">
          <div className="ift__formula-label">
            <span className="ift__fl-dot" />
            Core Ifa Transformation Formula
          </div>

          {/* Diagram */}
          <div className="ift__image-frame">
            <img
              src="./src/IFA-Transformation-Theory-1-768x512.png"
              alt="Ifa Transformation Theory — The Field of Transformations"
              className="ift__image"
            />
            <div className="ift__image-overlay">
              <span className="ift__image-tag">TransformoE · IFA Internet</span>
            </div>
          </div>
          <p className="ift__image-caption">
            All fields and disciplines generate and hold transformations through Logic, Vectors, Forms,
            and CEN IFABit Fields — the Ifa Transformation Theory generalises these to Quantum Mechanics
            across all fields.
          </p>

          {/* Subsumed transforms */}
          <div className="ift__subsumes">
            <div className="ift__subsumes-label">Subsumes all classical transforms</div>
            <div className="ift__subsumes-row">
              {SUBSUMED.map(t => (
                <a
                  key={t.name}
                  href={t.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ift__chip"
                  style={{'--tc': t.c}}
                >
                  <span className="ift__chip-sym">{t.sym}</span>
                  <span className="ift__chip-name">{t.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Pillars */}
        <div className="ift__pillars">
          {PILLARS.map(p => (
            <div key={p.title} className="ift__pillar" style={{'--pt-color': p.accent}}>
              <div className="ift__pillar-icon">{p.icon}</div>
              <h3 className="ift__pillar-title">{p.title}</h3>
              <div className="ift__pillar-sub">{p.sub}</div>
              <p className="ift__pillar-desc">{p.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="ift__cta">
          <a
            href="https://toe.cenproject.org/ifa-transform/"
            target="_blank"
            rel="noopener noreferrer"
            className="ift__cta-btn"
          >
            Explore Full Ifa Transformation Theory
            <span className="ift__cta-arrow">→</span>
          </a>
        </div>

      </div>
    </section>
  );
}

// ── Ifa Technologies Section ──────────────────────────────────
function IfaTechSection() {
  return (
    <section className="ifa-tech" id="ifa-tech">
      <div className="section__inner">
        <div className="section__head">
          <div className="section__badge" style={{'--badge-c': '#4361ee'}}>TechoE — Technologies for Everything</div>
          <h2 className="section__title">Ifa Technologies</h2>
          <p className="section__lead">
            The technological infrastructure of IfaLens — instruments, systems, and frameworks
            for detecting, extending, and transforming consciousness and energy perception.
          </p>
        </div>

        <div className="tech__grid">
          {IFA_TECH.map(t => (
            <div key={t.name} className="tech-card">
              <div className="tech-card__icon" style={{color: t.accent}}>{t.icon}</div>
              <div className="tech-card__content">
                <h3 className="tech-card__name">{t.name}</h3>
                <p className="tech-card__sub">{t.subtitle}</p>
                <p className="tech-card__desc">{t.desc}</p>
                <div className="tech-card__chips">
                  {t.chips.map(c => (
                    <span key={c} className="tech-chip" style={{'--tc': t.accent}}>{c}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="codar__spotlight">
          <div className="codar__icon">⊛</div>
          <div className="codar__text">
            <h3 className="codar__title">CODAR Technology</h3>
            <p className="codar__subtitle">Consciousness Detecting and Ranging</p>
            <p className="codar__desc">
              The most advanced Ifa sensing technology — analogous to RADAR and SONAR but operating
              on CEN Energy fields. CODAR systems detect, range, and map consciousness-energy phenomena
              that lie beyond the reach of conventional physical instruments, enabling direct study of
              the Ogbe field — the foundational substrate of all existence in the IFA Internet.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── CEN Energy Pipeline ───────────────────────────────────────
function EnergySection() {
  return (
    <section className="energy" id="energy">
      <div className="section__inner">
        <div className="section__head">
          <div className="section__badge" style={{'--badge-c': '#f5c518'}}>CEN · Consciousness-Energy</div>
          <h2 className="section__title">The CEN Energy Lens Pipeline</h2>
          <p className="section__lead">
            From raw Consciousness-Energy to integrated polymathic knowledge —
            the complete IfaLens perception pathway through the 256 Odu Ifa.
          </p>
        </div>

        <div className="energy__pipeline">
          {ENERGY_PIPELINE.map((step, i) => (
            <div key={step.step} className="energy__step-wrapper">
              <div className="energy__step">
                <div className="energy__step-left">
                  <div className="energy__step-num" style={{'--ec': step.accent}}>{step.step}</div>
                </div>
                <div className="energy__step-body">
                  <div className="energy__step-icon" style={{color: step.accent}}>{step.icon}</div>
                  <div>
                    <h3 className="energy__step-label">{step.label}</h3>
                    <p className="energy__step-desc">{step.desc}</p>
                  </div>
                </div>
              </div>
              {i < ENERGY_PIPELINE.length - 1 && (
                <div className="energy__connector" />
              )}
            </div>
          ))}
        </div>

        <div className="energy__legend">
          <div className="energy__bit">
            <span className="energy__bit-sym energy__bit-ogbe">I</span>
            <div>
              <strong>Ogbe = Energy</strong>
              <p>The positive, active energyform — the "I" in IFABit encoding. The foundational CEN Energy state.</p>
            </div>
          </div>
          <div className="energy__bit">
            <span className="energy__bit-sym energy__bit-oyeku">II</span>
            <div>
              <strong>Oyeku = Anergy</strong>
              <p>The complementary, potential energyform — the "II" in IFABit encoding. The dual of Ogbe.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Polymathic Arsenal ────────────────────────────────────────
function PolymathicArsenalSection() {
  return (
    <section className="arsenal" id="arsenal">
      <div className="section__inner">
        <div className="section__head">
          <div className="section__badge" style={{'--badge-c': '#00d9b8'}}>Polymathic Arsenal · IFA Internet</div>
          <h2 className="section__title">IfaLens in the Polymathic Arsenal</h2>
          <p className="section__lead">
            IfaLens is part of a broader polymathic ecosystem. Explore the full
            Polymathic Arsenal of the IFA Internet — all fields unified through CEN Energy.
          </p>
        </div>

        <div className="arsenal__grid">
          {POLYMATHIC_LINKS.map(link => (
            <a
              key={link.name}
              href={link.url}
              className="arsenal-card"
              target={link.url.startsWith('http') ? '_blank' : undefined}
              rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              <span className="arsenal-card__icon" style={{color: link.accent}}>{link.icon}</span>
              <div className="arsenal-card__content">
                <h3 className="arsenal-card__name">{link.name}</h3>
                <p className="arsenal-card__sub">{link.subtitle}</p>
                <p className="arsenal-card__desc">{link.desc}</p>
              </div>
              <span className="arsenal-card__arrow">→</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── About Section ─────────────────────────────────────────────
function AboutSection() {
  const ABOUT_STATS = [
    { val: '256', label: 'Odu Ifa',          desc: 'Polymathic viewing codes'      },
    { val: '11',  label: 'Ifascope Types',   desc: 'Microscopy, Telescopy & more'  },
    { val: '4',   label: 'Ifa Technologies', desc: 'Sensors, Glasses, Approach, Systems' },
    { val: <OgbeSymbol size={32} />, label: 'Disciplines',      desc: 'All knowledge, one CEN Lens'   },
  ];
  return (
    <section className="about" id="about">
      <div className="section__inner">
        <div className="about__layout">
          <div className="about__content">
            <div className="section__badge" style={{'--badge-c': '#8b5cf6'}}>About IfaLens</div>
            <h2 className="about__title">The Polymathic Lens of the IFA Internet</h2>
            <p className="about__body">
              IfaLens (LensoE — The Lens of Everything) is a core platform in the{' '}
              <a href="/" className="about__link">IFA Internet</a> — the Internet Model of the
              Theory of Everything (iTOE) developed by{' '}
              <a href="https://cenproject.org/" className="about__link" target="_blank" rel="noopener noreferrer">CENProject</a>.
            </p>
            <p className="about__body">
              Rooted in the <strong>256 Odu Ifa</strong> ancient knowledge framework developed by
              Ọrúnmìlà and Ọ̀ṣun of Ifẹ̀, IfaLens applies the IFA System to provide polymathic
              viewing of all knowledge fields through Ifascope instruments
              (<em>ẹ̀rọ ìfigbogbo-ara-ríran</em>) and the IfaView principle that
              <em> everything is Consciousness-Energy</em>.
            </p>
            <p className="about__body">
              The platform integrates the complete Ifascopy framework (Microscopy, Telescopy,
              Spectroscopy, Medical Imaging, CODAR Technology), the interactive Frame-of-Reference
              Transformer, and the four Ifa Technologies — forming the most comprehensive polymathic
              viewing and knowledge translation system in the IFA Internet.
            </p>
            <div className="about__actions">
              <a href="https://toe.cenproject.org/ifalens/" target="_blank" rel="noopener noreferrer" className="about__btn about__btn--primary">
                Full IfaLens Platform →
              </a>
              <a href="/" className="about__btn about__btn--ghost">IFA Internet Home</a>
            </div>
          </div>
          <div className="about__stats">
            {ABOUT_STATS.map((s, i) => (
              <div key={i} className="about__stat">
                <span className="about__stat-val">{s.val}</span>
                <span className="about__stat-label">{s.label}</span>
                <span className="about__stat-desc">{s.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── IfaNugget Section ─────────────────────────────────────────
function IfaNuggetSection() {
  const [design, setDesign] = useState(0);
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="ifanugget" id="ifanugget" ref={sectionRef}>
      <div className="section__inner">
        <div className="section__head">
          <div className="section__badge" style={{'--badge-c': '#f0920c'}}>
            IfaNugget · Ifanimation · Ayò Ọlọ́pọ́nfá
          </div>
          <h2 className="section__title">
            Wisdom from the{' '}
            <span className="section__title-yoruba">16-Pot Ifa Game</span>
          </h2>
          <p className="section__lead">
            Animated knowledge nuggets for polymathic learners — drawn from the ancient intelligence
            of Ayò Ọlọ́pọ́nfá and the 256 Odu Ifa. For students of the IFA Academy of Polymaths:
            kids, teens, adults, and professionals.
          </p>
        </div>

        <div className="ifanugget__tabs">
          <button
            className={`ifanugget__tab${design === 0 ? ' ifanugget__tab--active' : ''}`}
            onClick={() => setDesign(0)}
          >
            <span className="ifanugget__tab-sym">⬡</span>
            8 Attitudes of Ayò Ifá
          </button>
          <button
            className={`ifanugget__tab${design === 1 ? ' ifanugget__tab--active' : ''}`}
            onClick={() => setDesign(1)}
          >
            <span className="ifanugget__tab-sym">∞</span>
            The Polymathic Mind
          </button>
        </div>

        {design === 0 && <AttitudesDisplay visible={visible} />}
        {design === 1 && <PolymathDisplay  visible={visible} />}

        <div className="ifanugget__actions">
          <span className="ifanugget__dl-label">
            Download Design {design + 1}:
          </span>
          <button
            className="ifanugget__dl-btn ifanugget__dl-btn--png"
            onClick={() => nuggetDownload(design + 1, 'png')}
          >
            ↓ PNG (2×)
          </button>
          <button
            className="ifanugget__dl-btn ifanugget__dl-btn--svg"
            onClick={() => nuggetDownload(design + 1, 'svg')}
          >
            ↓ SVG
          </button>
        </div>
      </div>
    </section>
  );
}

function AttitudesDisplay({ visible }) {
  return (
    <div className={`nugget-d1${visible ? ' nugget--in' : ''}`}>
      <div className="nugget-d1__seeds" aria-hidden="true">
        {ATTITUDES.map((att, i) => (
          <div key={i} className="nugget-seed"
               style={{ '--sc': att.color, '--sx': `${6 + i * 11.5}%`, '--sd': `${i * 0.7}s` }}/>
        ))}
      </div>

      <div className="nugget-d1__head">
        <div className="nugget-d1__pots" aria-hidden="true">
          {[...ATTITUDES, ...ATTITUDES].map((att, i) => (
            <div key={i} className="nugget-pot"
                 style={{ '--pc': att.color, animationDelay: `${i * 0.15}s` }}/>
          ))}
        </div>
        <div className="nugget-d1__eyebrow">IfaNugget · Ifanimation</div>
        <h3 className="nugget-d1__title">
          8 Attitudes You Can Learn from Ayò Ifá Game
        </h3>
        <p className="nugget-d1__sub">
          Ayò Ọlọ́pọ́nfá · The 16-Pot Ifa Game · IFA Academy of Polymaths
        </p>
      </div>

      <div className="nugget-d1__grid">
        {ATTITUDES.map((att, i) => (
          <div key={i} className="att-card"
               style={{ '--ac': att.color, animationDelay: `${i * 0.09}s` }}>
            <div className="att-card__top">
              <span className="att-card__num">{att.num}</span>
              <span className="att-card__sym">{att.sym}</span>
            </div>
            <div className="att-card__name">{att.name}</div>
            <div className="att-card__rule"/>
            <div className="att-card__sub">{att.sub}</div>
            <p className="att-card__desc">{att.desc}</p>
            <div className="att-card__glow"/>
          </div>
        ))}
      </div>

      <div className="nugget-d1__footer">
        <span>ifainternet.org/ifa-lens</span>
        <span className="nugget-sep">·</span>
        <span>IFA Academy of Polymaths</span>
        <span className="nugget-sep">·</span>
        <span>© CENProject 2026</span>
      </div>
    </div>
  );
}

function PolymathDisplay({ visible }) {
  const HX = 450, HY = 360, RAD = 260;
  const n  = POLYMATH_SKILLS.length;

  const positions = POLYMATH_SKILLS.map((_, i) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI / n);
    return {
      x: Math.round(HX + RAD * Math.cos(a)),
      y: Math.round(HY + RAD * Math.sin(a)),
    };
  });

  return (
    <div className={`nugget-d2${visible ? ' nugget--in' : ''}`}>
      <div className="nugget-d1__head">
        <div className="nugget-d1__eyebrow" style={{color: 'var(--lens)'}}>
          IfaNugget · Ifanimation
        </div>
        <h3 className="nugget-d1__title" style={{color: 'var(--lens)'}}>
          The Polymathic Mind — What Ayò Ifá Teaches
        </h3>
        <p className="nugget-d1__sub">
          10 Polymathic Skills · IFA Academy of Polymaths · IfaLens
        </p>
      </div>

      {/* Hub-and-Spoke canvas (desktop) */}
      <div className="nugget-d2__canvas">
        <svg className="nugget-d2__svg"
             viewBox="0 0 900 720"
             preserveAspectRatio="xMidYMid meet"
             aria-hidden="true">
          <circle cx={HX} cy={HY} r={RAD}
                  fill="none" stroke="rgba(139,92,246,0.08)" strokeWidth="1"/>
          {positions.map((pos, i) => (
            <line key={i}
              x1={HX} y1={HY} x2={pos.x} y2={pos.y}
              stroke={POLYMATH_SKILLS[i].color}
              strokeWidth="1.2" strokeOpacity="0.28"
              strokeDasharray="5 5"/>
          ))}
        </svg>

        <div className="nugget-hub" style={{ left: HX, top: HY }}>
          <div className="nugget-hub__ring nugget-hub__ring--3"/>
          <div className="nugget-hub__ring nugget-hub__ring--2"/>
          <div className="nugget-hub__ring nugget-hub__ring--1"/>
          <div className="nugget-hub__core">
            <div className="nugget-hub__sym">⬡</div>
            <div className="nugget-hub__name">Ayò Ọlọ́pọ́nfá</div>
            <div className="nugget-hub__sub">16-Pot Ifa Game</div>
          </div>
        </div>

        {POLYMATH_SKILLS.map((skill, i) => (
          <div key={i} className="skill-card"
               style={{
                 '--sc': skill.color,
                 left: positions[i].x,
                 top:  positions[i].y,
                 animationDelay: `${0.25 + i * 0.08}s`,
               }}>
            <div className="skill-card__icon">{skill.sym}</div>
            <div className="skill-card__name">{skill.name}</div>
            <p className="skill-card__desc">{skill.desc}</p>
            <div className="skill-card__glow"/>
          </div>
        ))}
      </div>

      {/* Mobile grid fallback */}
      <div className="nugget-d2__mgrid">
        {POLYMATH_SKILLS.map((skill, i) => (
          <div key={i} className="skill-card skill-card--mg"
               style={{ '--sc': skill.color, animationDelay: `${i * 0.07}s` }}>
            <div className="skill-card__icon">{skill.sym}</div>
            <div className="skill-card__name">{skill.name}</div>
            <p className="skill-card__desc">{skill.desc}</p>
          </div>
        ))}
      </div>

      <div className="nugget-d1__footer" style={{marginTop: '28px'}}>
        <span>ifainternet.org/ifa-lens</span>
        <span className="nugget-sep">·</span>
        <span>IFA Academy of Polymaths</span>
        <span className="nugget-sep">·</span>
        <span>© CENProject 2026</span>
      </div>
    </div>
  );
}

// ── Footer ────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <span className="footer__logo">
            <span style={{color: 'var(--lens)'}}>Ifa</span>Lens
          </span>
          <p className="footer__tagline">LensoE — The Lens of Everything · Part of the IFA Internet</p>
        </div>
        <nav className="footer__links">
          <a href="/">IFA Internet</a>
          <a href="https://toe.cenproject.org/ifalens/" target="_blank" rel="noopener noreferrer">Full Platform</a>
          <a href="/ifa-analysis/">IFA Analysis</a>
          <a href="/ifa-mechanics/">IFA Mechanics</a>
          <a href="/ifa-matrix/">IFA Matrix</a>
          <a href="https://cenproject.org/" target="_blank" rel="noopener noreferrer">CENProject</a>
        </nav>
        <p className="footer__copy">© CENProject — toe.cenproject.org · IFA Internet</p>
      </div>
    </footer>
  );
}

// ── App ───────────────────────────────────────────────────────
function App() {
  const [unlocked, setUnlocked] = useState(() => getLensSession() !== null);

  if (!unlocked) {
    return <SubscriptionGate onUnlock={() => setUnlocked(true)} />;
  }

  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <IfaViewSection />
        <IfascopesSection />
        <FrameTransformerSection />
        <IfaTransformSection />
        <IfaTechSection />
        <EnergySection />
        <PolymathicArsenalSection />
        <IfaNuggetSection />
        <AboutSection />
      </main>
      <Footer />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
