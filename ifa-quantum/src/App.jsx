/* ─────────────────────────────────────────────────────────────────────────────
   IfaQuantum Platform — App.jsx
   The IFA Internet · CENProject · ifainternet.org/ifa-quantum/
   Theoretical foundation: toe.cenproject.org/ifa-physics/
───────────────────────────────────────────────────────────────────────────── */

const { useState } = React;

// ── Bloch Sphere (qubit state visualization) ────────────────────────────────
function BlochSphere({ color = '#00d4ff', angle = 32 }) {
  const rad = angle * Math.PI / 180;
  const tx = 60 + 32 * Math.sin(rad);
  const ty = 60 - 32 * Math.cos(rad);
  return (
    <svg viewBox="0 0 120 120" className="iq-qubit-svg" aria-hidden="true">
      <defs>
        <radialGradient id={`qb-${color.replace('#','')}`} cx="50%" cy="38%" r="52%">
          <stop offset="0%" stopColor={color} stopOpacity="0.18"/>
          <stop offset="100%" stopColor="#030608" stopOpacity="0"/>
        </radialGradient>
      </defs>
      <ellipse cx="60" cy="60" rx="50" ry="50" fill="none" stroke={color} strokeWidth="0.8" strokeOpacity="0.22"/>
      <ellipse cx="60" cy="60" rx="50" ry="15" fill="none" stroke={color} strokeWidth="0.6" strokeDasharray="3,2" strokeOpacity="0.16"/>
      <line x1="60" y1="10" x2="60" y2="110" stroke={color} strokeWidth="0.6" strokeOpacity="0.2"/>
      <line x1="10" y1="60" x2="110" y2="60" stroke={color} strokeWidth="0.6" strokeOpacity="0.12"/>
      <line x1="60" y1="60" x2={tx} y2={ty} stroke={color} strokeWidth="2" strokeLinecap="round" strokeOpacity="0.9"/>
      <circle cx={tx} cy={ty} r="3.5" fill={color} fillOpacity="0.9"/>
      <circle cx="60" cy="10" r="3" fill="rgba(240,146,12,0.85)"/>
      <circle cx="60" cy="110" r="3" fill="rgba(139,92,246,0.6)"/>
      <ellipse cx="60" cy="60" rx="50" ry="50" fill={`url(#qb-${color.replace('#','')})`}/>
      <text x="60" y="7" textAnchor="middle" fontSize="5.5" fill="rgba(240,146,12,0.85)" fontFamily="monospace">|0⟩</text>
      <text x="60" y="119" textAnchor="middle" fontSize="5.5" fill="rgba(139,92,246,0.7)" fontFamily="monospace">|1⟩</text>
    </svg>
  );
}

// ── Entanglement SVG (two linked qubits) ───────────────────────────────────
function EntanglementSVG() {
  return (
    <svg viewBox="0 0 240 80" style={{width:'100%',maxWidth:'240px',display:'block'}} aria-hidden="true">
      <defs>
        <radialGradient id="eq-ga" cx="30%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.3"/>
          <stop offset="100%" stopColor="#030608" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="eq-gb" cx="70%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3"/>
          <stop offset="100%" stopColor="#030608" stopOpacity="0"/>
        </radialGradient>
      </defs>
      <ellipse cx="60" cy="40" rx="38" ry="38" fill="url(#eq-ga)" stroke="#00d4ff" strokeWidth="0.8" strokeOpacity="0.35"/>
      <ellipse cx="180" cy="40" rx="38" ry="38" fill="url(#eq-gb)" stroke="#8b5cf6" strokeWidth="0.8" strokeOpacity="0.35"/>
      <path d="M 98 30 C 120 20, 120 60, 142 50" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.2" strokeDasharray="3,2"/>
      <path d="M 98 50 C 120 40, 120 20, 142 30" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.2" strokeDasharray="3,2"/>
      <circle cx="60" cy="40" r="6" fill="#00d4ff" fillOpacity="0.85"/>
      <circle cx="180" cy="40" r="6" fill="#8b5cf6" fillOpacity="0.85"/>
      <text x="60" y="72" textAnchor="middle" fontSize="7" fill="rgba(0,212,255,0.7)" fontFamily="monospace">IfaQubit</text>
      <text x="180" y="72" textAnchor="middle" fontSize="7" fill="rgba(139,92,246,0.7)" fontFamily="monospace">OrisaQubit</text>
    </svg>
  );
}

// ── Odu / 16 Laws data ──────────────────────────────────────────────────────
const ODU = [
  { n:'Ogbè',     en:'Opening · Beginnings'  },
  { n:'Òyèkú',    en:'Closure · Transition'  },
  { n:'Ìwòrì',    en:'Inner Vision'           },
  { n:'Òdí',      en:'Concealment · Depth'   },
  { n:'Ìròsùn',   en:'Flow · Life Force'     },
  { n:'Ọ̀wọ́nrín',  en:'Emergence · Surprise'  },
  { n:'Òbàrà',    en:'Kingship · Expansion'  },
  { n:'Ọ̀kàràn',   en:'Conflict · Resolution' },
  { n:'Ògúndá',   en:'Pathfinding · Action'  },
  { n:'Ọ̀sá',     en:'Speed · Disruption'    },
  { n:'Ìká',      en:'Numbers · Cleverness'  },
  { n:'Òtùrúpọ̀n', en:'Reversal · Healing'    },
  { n:'Òtúrá',    en:'Pact · Alignment'      },
  { n:'Ìrẹtẹ̀',    en:'Patience · Foundation' },
  { n:'Ọ̀sẹ̀',     en:'Prosperity · Growth'   },
  { n:'Òfún',     en:'Light · Completion'    },
];

// ── Pillars data ────────────────────────────────────────────────────────────
const PILLARS = [
  { icon:'🌍', label:'Quantum in African Languages', body:'Learn, teach, and research quantum science in Yoruba and African languages — in your tongue, from your cosmology.' },
  { icon:'⚡', label:'Ifa & Orisa AIKS', body:'Quantum fields, technologies, and systems developed using African Indigenous Knowledge Systems — Ifa, Orisa, African Philosophies.' },
  { icon:'Ψ',  label:'IfaLang · OrisaLang', body:'Study and develop quantum fields and technologies formally in Ifa Language (IfaLang) and Orisa Language (OrisaLang).' },
  { icon:'⊕',  label:'Global Integration', body:'Integrate ancient African science with Western, Eastern, and other modern scientific traditions into a unified quantum framework.' },
  { icon:'📡', label:'Quantum STEM', body:'Science, Technology, Engineering, and Mathematics — all disciplines, all taught and researched in Yoruba and African languages.' },
  { icon:'∞',  label:'Meta-system', body:'IfaQuantum: a meta-system extending quantum mechanics to every field of study — towards a general theory of all fields.' },
  { icon:'⚛',  label:'IfaQuantum · OrisaQuantum · Irunmole', body:'The three-tier advanced metascience of Ifa/Orisa — from quantum science to the frontier of consciousness-energy physics.' },
  { icon:'⋈',  label:'Ifa Generalization', body:'Ifa X: studying any field X using the 16 Ifa Laws. OrisaX is its dual. IfaQuantum is the quantum instance of this universal framework.' },
];

// ── Integration nodes ───────────────────────────────────────────────────────
const INTEGRATIONS = [
  { icon:'🌿', name:'African AIKS', sub:'Ifa · Orisa · Ubuntu', color:'#22c55e', border:'rgba(34,197,94,0.3)', bg:'rgba(34,197,94,0.08)' },
  { icon:'⚛',  name:'Quantum Physics', sub:'QM · QFT · QG', color:'#00d4ff', border:'rgba(0,212,255,0.3)', bg:'rgba(0,212,255,0.08)' },
  { icon:'🔬', name:'Western Science', sub:'Classical · Modern', color:'#60a5fa', border:'rgba(96,165,250,0.3)', bg:'rgba(96,165,250,0.08)' },
  { icon:'☯',  name:'Eastern Science', sub:'Taoism · Vedanta', color:'#f0920c', border:'rgba(240,146,12,0.3)', bg:'rgba(240,146,12,0.08)' },
  { icon:'✦',  name:'IfaQuantum', sub:'The Synthesis', color:'#8b5cf6', border:'rgba(139,92,246,0.3)', bg:'rgba(139,92,246,0.08)' },
];

// ═══════════════════════════════════════════════════════════════════════════
// COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════

function Nav() {
  return (
    <nav className="iq-nav">
      <a className="iq-nav__logo" href="../">
        <span className="iq-nav__logo-prefix">IFA Internet · </span>
        IfaQuantum
        <span className="iq-nav__dot" />
      </a>
      <div className="iq-nav__links">
        <a className="iq-nav__link" href="#framework">Framework</a>
        <a className="iq-nav__link" href="#computing">Computing</a>
        <a className="iq-nav__link" href="#pillars">Pillars</a>
        <a className="iq-nav__link" href="#generalization">Ifa X</a>
        <a className="iq-nav__link" href="#laws">16 Laws</a>
        <a className="iq-nav__link" href="#atlas">Atlas</a>
        <a className="iq-nav__link iq-nav__link--cta" href="https://toe.cenproject.org/ifa-physics/" target="_blank" rel="noopener noreferrer">Ifa Physics ↗</a>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="iq-hero">
      <div className="iq-hero__inner">

        {/* Left — text */}
        <div className="iq-hero__left">
          <div className="iq-hero__eyebrow">IFA Internet · CENProject · Ifa Physics</div>
          <h1 className="iq-hero__title">
            <span className="iq-hero__title--ifa">Ifa</span>
            <span className="iq-hero__title--q">Quantum</span>
          </h1>
          <p className="iq-hero__subtitle">The Quantum of Everything — Through Ifa</p>
          <p className="iq-hero__body">
            Meta-science and meta-technology unifying quantum mechanics with African Indigenous Knowledge Systems,
            IfaLang, OrisaLang, and the 16 Ifa Laws of Nature — <em>Oju Odu Ifa Merindinlogun</em>.
          </p>
          <div className="iq-pills">
            {['IfaLang','OrisaLang','Yorùbá','AIKS','16 Ifa Laws','IfaQM · IfaQFT · IfaQG','Ifaquantization'].map(p => (
              <span key={p} className="iq-pill">{p}</span>
            ))}
          </div>
          <div className="iq-hero__ctas">
            <a href="#framework" className="iq-btn iq-btn--primary">Explore Framework</a>
            <a href="https://toe.cenproject.org/ifa-physics/" target="_blank" rel="noopener noreferrer" className="iq-btn iq-btn--ghost">Ifa Physics ↗</a>
          </div>
        </div>

        {/* Right — image + qubit */}
        <div className="iq-hero__right">
          <div className="iq-hero__img-wrap">
            <img src="./src/Ifa-Quantum.png" alt="IfaQuantum — The Quantum of Everything Through Ifa" className="iq-hero__img" />
            <div className="iq-hero__img-glow" />
          </div>
          <div className="iq-qubit-row">
            <div className="iq-bloch-mini">
              <div className="iq-hero__eq-label">IfaQubit</div>
              <BlochSphere color="#00d4ff" angle={38} />
              <div className="iq-hero__eq">α|0⟩ + β|1⟩</div>
            </div>
            <div style={{width:'16px', flexShrink:0}}>
              <EntanglementSVG />
            </div>
            <div className="iq-bloch-mini">
              <div className="iq-hero__eq-label">OrisaQubit</div>
              <BlochSphere color="#8b5cf6" angle={-52} />
              <div className="iq-hero__eq" style={{color:'rgba(139,92,246,0.75)'}}>Ψ|Ọ̀rún⟩</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ImageGallery() {
  const images = [
    { src:'./src/Ifa-Quantum1-1-768x314.png', label:'IfaQuantum · I',   sub:'The Quantum through Ifa' },
    { src:'./src/Ifa-Quantum2-768x314.png',   label:'IfaQuantum · II',  sub:'OrisaQuantum' },
    { src:'./src/Ifa-Quantum3-768x314.png',   label:'IfaQuantum · III', sub:'Irunmole Metascience' },
    { src:'./src/Ifa-Quantum4-768x314.png',   label:'IfaQuantum · IV',  sub:'16 Ifa Laws · SIDECHRX' },
  ];
  return (
    <section className="iq-gallery">
      <div className="iq-gallery__grid">
        {images.map((img, i) => (
          <div key={i} className="iq-gallery__item">
            <img src={img.src} alt={img.label} className="iq-gallery__img" loading="lazy" />
            <div className="iq-gallery__caption">
              <span className="iq-gallery__label">{img.label}</span>
              <span className="iq-gallery__sub">{img.sub}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Framework() {
  const tiers = [
    {
      id: 'IfaQuantum',
      color: '#00d4ff',
      border: 'rgba(0,212,255,0.22)',
      bg: 'rgba(0,212,255,0.05)',
      icon: '⚛',
      tagline: 'Primary Framework',
      body: 'Quantum science and technology studied and developed through the lens of Ifa — using the 16 Ifa Laws of Nature (Oju Odu Ifa Merindinlogun) as the deepest axioms.',
      tags: ['IfaQM','IfaQFT','IfaQG','Ifaquantization','IfaLang'],
    },
    {
      id: 'OrisaQuantum',
      color: '#8b5cf6',
      border: 'rgba(139,92,246,0.22)',
      bg: 'rgba(139,92,246,0.05)',
      icon: '🌀',
      tagline: 'Dual Framework',
      body: 'The dual of IfaQuantum. Quantum reality approached through the energy-personality of each Orisa — OrisaQM, OrisaQFT, and OrisaLang as the medium.',
      tags: ['OrisaQM','OrisaQFT','OrisaLang','Orisa X','Ọ̀rúnmìlà'],
    },
    {
      id: 'Irunmole',
      color: '#ec4899',
      border: 'rgba(236,72,153,0.22)',
      bg: 'rgba(236,72,153,0.05)',
      icon: '✦',
      tagline: 'Advanced Metascience',
      body: 'Beyond IfaQuantum and OrisaQuantum — the apex metascience where consciousness, energy, and quantum converge through iTOE and the CEN framework.',
      tags: ['iTOE','CEN','Olodumare Frame','Ọ̀rún','PoE'],
    },
  ];

  return (
    <section id="framework" className="iq-section">
      <div className="iq-container">
        <div className="iq-eyebrow">Core Architecture</div>
        <h2 className="iq-section-title">Three-Tier Framework</h2>
        <p className="iq-section-sub">
          IfaQuantum operates across three nested tiers — from quantum science through Ifa to the metascience of everything.
        </p>
        <div className="iq-framework-grid">
          {tiers.map(t => (
            <div key={t.id} className="iq-tier-card"
              style={{borderColor:t.border, background:`linear-gradient(160deg,${t.bg} 0%,rgba(3,6,8,0) 100%)`}}>
              <div className="iq-tier-card__glow"
                style={{background:`radial-gradient(ellipse at top, ${t.bg} 0%, transparent 65%)`}}/>
              <div className="iq-tier-card__icon" style={{color:t.color}}>{t.icon}</div>
              <div className="iq-tier-card__id"   style={{color:t.color}}>{t.id}</div>
              <div className="iq-tier-card__tagline">{t.tagline}</div>
              <p   className="iq-tier-card__body">{t.body}</p>
              <div className="iq-tier-card__tags">
                {t.tags.map(tag => (
                  <span key={tag} className="iq-tag" style={{color:t.color, borderColor:t.border}}>{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pillars() {
  return (
    <section id="pillars" className="iq-section iq-section--alt">
      <div className="iq-container">
        <div className="iq-eyebrow">IfaQuantum Pillars</div>
        <h2 className="iq-section-title">Eight Pillars</h2>
        <p className="iq-section-sub">The foundational dimensions of IfaQuantum — what it does, who it is for, and how it works.</p>
        <div className="iq-pillars-grid">
          {PILLARS.map((p, i) => (
            <div key={i} className="iq-pillar">
              <div className="iq-pillar__num">{String(i+1).padStart(2,'0')}</div>
              <div className="iq-pillar__icon">{p.icon}</div>
              <div className="iq-pillar__label">{p.label}</div>
              <p   className="iq-pillar__body">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function IfaGeneralization() {
  const examples = [
    { x:'IfaQuantum', c:'#00d4ff' },
    { x:'IfaPhysics',  c:'#22c55e' },
    { x:'IfaNumber',   c:'#f0920c' },
    { x:'IfaLang',     c:'#8b5cf6' },
    { x:'IfaComputing',c:'#00d4ff' },
    { x:'IfaMath',     c:'#ec4899' },
    { x:'IfaBiology',  c:'#22c55e' },
    { x:'IfaArt',      c:'#f0920c' },
    { x:'OrisaQuantum',c:'#8b5cf6' },
    { x:'OrisaPhysics',c:'#ec4899' },
  ];
  return (
    <section id="generalization" className="iq-section">
      <div className="iq-container">
        <div className="iq-eyebrow">Universal Framework</div>
        <h2 className="iq-section-title">Ifa Generalization</h2>
        <p className="iq-section-sub">
          IfaQuantum is a specific instance of a universal principle.
          Any field of knowledge becomes an <em>Ifa Field</em> when studied through the 16 Ifa Laws.
        </p>
        <div className="iq-gen-block">
          <div className="iq-gen-eq">
            <span className="iq-gen-eq__term iq-gen-eq__term--ifa">Ifa</span>
            <span className="iq-gen-eq__x">X</span>
            <span className="iq-gen-eq__def"> ≡ studying and developing any field X using the 16 Ifa Laws of Nature</span>
          </div>
          <hr className="iq-gen-sep"/>
          <div className="iq-gen-eq">
            <span className="iq-gen-eq__term iq-gen-eq__term--orisa">Orisa</span>
            <span className="iq-gen-eq__x">X</span>
            <span className="iq-gen-eq__def"> ≡ the dual: field X studied through Orisa principles — OrisaX is the dual of IFaX</span>
          </div>
        </div>
        <div className="iq-gen-examples">
          {examples.map(e => (
            <span key={e.x} className="iq-gen-tag" style={{color:e.c, borderColor:`${e.c}33`}}>{e.x}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Integration() {
  return (
    <section className="iq-integration">
      <div className="iq-container">
        <div className="iq-eyebrow" style={{justifyContent:'center', marginBottom:'32px'}}>Global Scientific Integration</div>
        <div className="iq-integration__inner">
          {INTEGRATIONS.map((node, i) => (
            <React.Fragment key={node.name}>
              <div className="iq-integ-node">
                <div className="iq-integ-node__icon"
                  style={{borderColor:node.border, background:node.bg, color:node.color}}>
                  {node.icon}
                </div>
                <div className="iq-integ-node__name" style={{color:node.color}}>{node.name}</div>
                <div className="iq-integ-node__sub">{node.sub}</div>
              </div>
              {i < INTEGRATIONS.length - 1 && (
                <div className="iq-integ-arrow">→</div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

function SixteenLaws() {
  return (
    <section id="laws" className="iq-section iq-section--alt">
      <div className="iq-container">
        <div className="iq-eyebrow">Oju Odu Ifa Merindinlogun · SIDECHRX Principles</div>
        <h2 className="iq-section-title">The 16 Ifa Laws of Nature</h2>
        <p className="iq-section-sub">
          Deeper and more fundamental than any known laws of modern science. In IfaQuantum, each Odu functions
          as a meta-axiom governing a class of quantum phenomena and fields.
        </p>
        <div className="iq-laws-grid">
          {ODU.map((o, i) => (
            <div key={i} className="iq-law-cell">
              <div className="iq-law-cell__num">ODU {String(i+1).padStart(2,'0')}</div>
              <div className="iq-law-cell__name">{o.n}</div>
              <div className="iq-law-cell__en">{o.en}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Languages() {
  const langs = [
    { name:'IfaLang', desc:'The formal language of Ifa — the Language of Everything (LangE). All of IfaQuantum is expressible in IfaLang.', color:'#00d4ff' },
    { name:'OrisaLang', desc:'Language of Orisa — dual to IfaLang. OrisaQuantum maps Orisa principles to quantum fields through OrisaLang.', color:'#8b5cf6' },
    { name:'Yorùbá', desc:'Ancestral language of Ifa and Orisa. Learn and teach quantum science in Yorùbá — the living mother tongue of this knowledge.', color:'#f0920c' },
    { name:'African Languages', desc:'IfaQuantum is for all African peoples. Quantum education, research, and development — in your language, from your cosmology.', color:'#22c55e' },
  ];
  return (
    <section id="languages" className="iq-section">
      <div className="iq-container">
        <div className="iq-eyebrow">Language · Linguistics · STEM</div>
        <h2 className="iq-section-title">Quantum in African Languages</h2>
        <p className="iq-section-sub">
          Every concept in IfaQuantum is teachable, researchable, and developable in Yorùbá and African languages.
          STEM — in your tongue, from your cosmology.
        </p>
        <div className="iq-lang-grid">
          {langs.map(l => (
            <div key={l.name} className="iq-lang-card" style={{borderColor:`${l.color}28`}}>
              <div className="iq-lang-card__dot" style={{background:l.color}}/>
              <div className="iq-lang-card__name" style={{color:l.color}}>{l.name}</div>
              <p className="iq-lang-card__desc">{l.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function IfaQuantumComputing() {
  const features = [
    { icon:'⚛',  label:'IfaQubits',           desc:'Qubits defined and operated through Ifa Laws and binary Odu encoding.' },
    { icon:'🌀', label:'OrisaQubits',          desc:'Qubit states as Orisa energy signatures — the dual quantum system.' },
    { icon:'⊞',  label:'IfaCircuits',          desc:'Quantum circuits designed using Ifa combinatorial principles.' },
    { icon:'⊗',  label:'IfaGates',             desc:'Quantum logic gates derived from Odu Ifa transformations.' },
    { icon:'∑',  label:'IfaAlgorithms',        desc:'Quantum algorithms structured using the 16 Ifa Laws as meta-heuristics.' },
    { icon:'📡', label:'IfaQuantum Internet',  desc:'Quantum communication networks modeled on Ifa cosmological structures.' },
  ];
  return (
    <section id="computing" className="iq-section iq-section--alt">
      <div className="iq-container">
        <div className="iq-eyebrow">Quantum Hardware &amp; Software · AIKS</div>
        <h2 className="iq-section-title">IfaQuantum Computing</h2>
        <p className="iq-section-sub">
          Quantum computing architectures, algorithms, and systems developed through Ifa and Orisa principles —
          IfaQubits, OrisaQubits, IfaCircuits, and IfaAlgorithms operating under the 16 Ifa Laws of Nature.
        </p>
        <div className="iq-dev-banner">
          <span className="iq-dev-dot" />
          <span>Under Development</span>
        </div>
        <div className="iq-computing-card">
          <div className="iq-computing-card__vis">
            <BlochSphere color="#00d4ff" angle={28} />
            <div className="iq-computing-card__eq">IfaQubit<br/>α|Ọ̀rún⟩ + β|Àiyé⟩</div>
            <div className="iq-computing-card__eq" style={{color:'rgba(139,92,246,0.65)',marginTop:'18px'}}>OrisaQubit<br/>Ψ|Ọ̀ṣun⟩ ⊗ |Ògún⟩</div>
            <BlochSphere color="#8b5cf6" angle={-45} />
          </div>
          <div className="iq-computing-grid">
            {features.map((f, i) => (
              <div key={i} className="iq-computing-feat">
                <span className="iq-computing-feat__icon">{f.icon}</span>
                <div>
                  <div className="iq-computing-feat__label">{f.label}</div>
                  <p className="iq-computing-feat__desc">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function IfaQuantumAtlas() {
  const features = [
    { icon:'🔬', label:'IfaSims',              desc:'Quantum simulations in Yoruba and African languages — experience quantum phenomena through Ifa cosmology.' },
    { icon:'🎬', label:'IfaAnimations',        desc:'Animated explanations of quantum fields, particles, and entanglement through Ifa and Orisa imagery.' },
    { icon:'📖', label:'IfaComics',            desc:'Comics teaching quantum science via Orisa characters and AIKS narratives — for all ages.' },
    { icon:'🎮', label:'IfaDemos',             desc:'Interactive demonstrations of quantum experiments and their Ifa correlations.' },
    { icon:'🗺', label:'IfaMaps',              desc:'Visual maps of IfaQuantum concepts — from Odu to quantum fields, made explorable.' },
    { icon:'🌍', label:'African Language STEM',desc:'Every simulation and demo available in Yoruba, Igbo, Swahili, and other African languages.' },
  ];
  return (
    <section id="atlas" className="iq-section">
      <div className="iq-container">
        <div className="iq-eyebrow">Education · Media · STEM in African Languages</div>
        <h2 className="iq-section-title">IfaQuantum Atlas</h2>
        <p className="iq-section-sub">
          A creative platform for simulations, demos, animations, and comics that teach quantum science and technology
          in Yoruba and African languages — grounded in Ifa, Orisa, and African Indigenous Knowledge Systems.
        </p>
        <div className="iq-dev-banner">
          <span className="iq-dev-dot" />
          <span>Under Development</span>
        </div>
        <div className="iq-atlas-grid">
          {features.map((f, i) => (
            <div key={i} className="iq-atlas-card">
              <div className="iq-atlas-card__icon">{f.icon}</div>
              <div className="iq-atlas-card__label">{f.label}</div>
              <p className="iq-atlas-card__desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function IfaPhysicsCTA() {
  const tags = ['IfaQM','IfaQFT','IfaQG','Ifaquantization','CEN','iTOE','IQF','SIDECHRX'];
  return (
    <section className="iq-cta-section">
      <div className="iq-cta-card">
        <div className="iq-cta-card__glow"/>
        <div className="iq-eyebrow" style={{color:'#00d4ff'}}>Theoretical Foundation · CENProject</div>
        <h2 className="iq-cta-card__title">Ifa Physics</h2>
        <p className="iq-cta-card__body">
          The theoretical foundation of IfaQuantum. <strong>Ifa Physics</strong> — the Physics of Everything (PoE) —
          frames quantum mechanics, consciousness, and energy through the 16 Ifa Laws. Discover IfaQM, IfaQFT,
          IfaQG, the Ifa Quantum Field (IQF), Ifaquantization, the CEN framework, and the Olodumare Frame.
        </p>
        <div className="iq-cta-card__tags">
          {tags.map(t => (
            <span key={t} className="iq-tag" style={{color:'#00d4ff', borderColor:'rgba(0,212,255,0.28)'}}>{t}</span>
          ))}
        </div>
        <a href="https://toe.cenproject.org/ifa-physics/" target="_blank" rel="noopener noreferrer"
          className="iq-btn iq-btn--primary">
          Explore Ifa Physics ↗
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="iq-footer">
      <div className="iq-footer__inner">
        <div className="iq-footer__logo">IfaQuantum</div>
        <div className="iq-footer__sub">
          Part of the <a href="https://ifainternet.org">IFA Internet</a> — the Internet Model of the Theory of Everything (iTOE)
          · <a href="https://toe.cenproject.org">CENProject</a>
          · <a href="https://toe.cenproject.org/ifa-physics/">Ifa Physics</a>
        </div>
        <div className="iq-footer__links">
          <a href="../">IFA Internet</a>
          <a href="../ifa-number/">IFA Number</a>
          <a href="../ifa-computing/">IFA Computing</a>
          <a href="../ifa-periodic-table/">IFA Periodic Table</a>
          <a href="https://toe.cenproject.org/ifa-physics/" target="_blank" rel="noopener noreferrer">Ifa Physics ↗</a>
        </div>
      </div>
    </footer>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// APP
// ═══════════════════════════════════════════════════════════════════════════
function App() {
  return (
    <>
      <Nav />
      <Hero />
      <ImageGallery />
      <Framework />
      <IfaQuantumComputing />
      <Pillars />
      <IfaGeneralization />
      <Integration />
      <SixteenLaws />
      <Languages />
      <IfaQuantumAtlas />
      <IfaPhysicsCTA />
      <Footer />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
