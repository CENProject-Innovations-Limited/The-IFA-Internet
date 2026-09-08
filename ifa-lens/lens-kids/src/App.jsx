/* ─────────────────────────────────────────────────────────────
   IfaLens Kids & Teens — The Lens of Everything (Beginners)
   LensoE · Simplified Edition for Young Learners
   IFA Academy of Polymaths · The IFA Internet
   React 18 + JSX via Babel Standalone · no build step
   CENProject · ifainternet.org/ifa-lens/lens-kids/
───────────────────────────────────────────────────────────── */

const { useState, useEffect } = React;

/* ── SIDECHRX — 8 Super Lenses ── */
const SUPER_LENSES = [
  { id:'S', icon:'⬡', name:'Symmetry',     kidName:'Spot the Pattern!',    color:'#4aa3ff',
    desc:'Look for things that match, repeat, or balance — like a butterfly\'s wings or a song\'s rhythm. Patterns are hidden everywhere!',
    fact:'Snowflakes have 6-fold symmetry — every arm is a perfect mirror of the others.' },
  { id:'I', icon:'∞', name:'Invariance',   kidName:'What Never Changes?',  color:'#00d9b8',
    desc:'Find the rules that stay true no matter what changes around them. Some truths are universal — they work everywhere, always.',
    fact:'1 + 1 = 2 everywhere in the universe, in every language. That\'s invariance!' },
  { id:'D', icon:'⇌', name:'Duality',      kidName:'Find the Opposite!',   color:'#f5c518',
    desc:'Everything has a partner or an opposite. Hot & cold. Light & dark. Question & answer. Day & night. Find the other side!',
    fact:'Every force in physics has an equal and opposite force — Newton\'s 3rd Law!' },
  { id:'E', icon:'↑', name:'Emergence',    kidName:'Big Grows from Small!', color:'#e9498a',
    desc:'When tiny things work together they create something amazing — something none of them could do alone. The whole is greater than its parts!',
    fact:'86 billion neurons in your brain work together to create your thoughts, feelings, and memories!' },
  { id:'C', icon:'⊕', name:'Composition',  kidName:'Mix & Connect!',       color:'#a855f7',
    desc:'Combine two different subjects or ideas and create something entirely new! That\'s how new sciences and art forms are born.',
    fact:'Biology + Chemistry = Biochemistry — the science that unlocked the secrets of DNA!' },
  { id:'H', icon:'◎', name:'Holism',       kidName:'The Big Picture!',     color:'#00c87c',
    desc:'Sometimes you need to zoom OUT to truly understand something. A single puzzle piece makes no sense alone — but 1,000 pieces make a picture!',
    fact:'You can\'t understand a forest by studying just one tree, or a symphony by hearing just one note.' },
  { id:'R', icon:'↓', name:'Reductionism', kidName:'Break It Down!',       color:'#ff8c35',
    desc:'To understand something huge, break it into its smallest pieces. Then you\'ll understand every level — from the biggest to the tiniest.',
    fact:'Scientists broke matter down: solids → molecules → atoms → protons → quarks!' },
  { id:'X', icon:'◈', name:'eXpansion',    kidName:'Go Further!',          color:'#8892a4',
    desc:'Take what you already know and push it into new territory. Ask: What if? What next? What\'s beyond? Great explorers always go further.',
    fact:'Maths expanded: counting → fractions → algebra → calculus → quantum mathematics!' },
];

/* ── STEAMSEX — 8 Worlds of Knowledge ── */
const KNOWLEDGE_WORLDS = [
  { id:'S1', icon:'⚗', name:'Natural Science', kidName:'How Nature Works',  color:'#4aa3ff',
    subjects:['Physics','Chemistry','Biology','Geology','Astronomy','Neuroscience'],
    desc:'Discover the laws that govern everything in the universe — from atoms to galaxies, from bacteria to black holes!' },
  { id:'T',  icon:'⌬', name:'Technology',      kidName:'How Tools Work',    color:'#00d9b8',
    subjects:['AI','Robotics','Biotech','Nanotech','Computing','Energy Tech'],
    desc:'Learn how humans build the tools and systems that power our world — and how to design the tools of tomorrow!' },
  { id:'E1', icon:'⚙', name:'Engineering',      kidName:'How to Build',      color:'#f5c518',
    subjects:['Mechanical','Civil','Chemical','Computer','Aerospace','Bioengineering'],
    desc:'Design and build solutions to real problems — bridges, rockets, hospitals, computers, and much more!' },
  { id:'A',  icon:'✦', name:'Arts',             kidName:'How to Create',     color:'#e9498a',
    subjects:['Visual Arts','Music','Literature','Film','Philosophy','Architecture'],
    desc:'Express ideas, emotions, and stories through creativity, beauty, and imagination in all their forms!' },
  { id:'M',  icon:'∑', name:'Mathematics',      kidName:'How Numbers Work',  color:'#a855f7',
    subjects:['Arithmetic','Algebra','Geometry','Calculus','Statistics','Logic'],
    desc:'The universal language of patterns, quantity, and structure — found in every corner of existence!' },
  { id:'S2', icon:'⊛', name:'Social Science',   kidName:'How People Live',   color:'#00c87c',
    subjects:['Sociology','Economics','Psychology','History','Politics','Anthropology'],
    desc:'Understand human behaviour, communities, cultures, and how billions of people live together on Earth!' },
  { id:'E2', icon:'⬡', name:'Education',        kidName:'How We Learn',      color:'#ff8c35',
    subjects:['Pedagogy','Curriculum','Learning Theory','Linguistics','Communication'],
    desc:'Discover the science and art of teaching, learning, and sharing knowledge across generations!' },
  { id:'X',  icon:'◈', name:'Others',           kidName:'Everything Else!',  color:'#8892a4',
    subjects:['Spirituality','Culture','Sports','Indigenous Knowledge','Fashion','Philosophy'],
    desc:'The vast world of human experience that goes beyond traditional academic categories!' },
];

/* ── Ifascopes — 5 types, kid-friendly ── */
const KID_SCOPES = [
  { icon:'🔬', name:'Microscopy Lens',     color:'#4aa3ff',
    desc:'Zoom into the invisible world — cells, bacteria, atoms, DNA, and the building blocks of ALL living things!' },
  { icon:'🔭', name:'Telescopy Lens',      color:'#a855f7',
    desc:'Look billions of light-years away — stars, planets, galaxies, black holes, and the edges of the universe!' },
  { icon:'🌈', name:'Spectroscopy Lens',   color:'#f5c518',
    desc:'Split light into a rainbow to discover what ANYTHING is made of — even stars millions of miles away!' },
  { icon:'🧠', name:'Consciousness Lens',  color:'#e9498a',
    desc:'Explore how thinking, feeling, and awareness work. The greatest mystery is YOUR own mind!' },
  { icon:'⚡', name:'Energy Lens',         color:'#00d9b8',
    desc:'See how energy flows through everything — your body, machines, weather systems, ecosystems, and the cosmos!' },
];

/* ── Polymathic Skills ── */
const KID_SKILLS = [
  { icon:'🔍', name:'Curiosity',            color:'#4aa3ff',
    desc:'Always ask WHY and HOW. Great scientists never stop wondering — and neither should you!' },
  { icon:'🔗', name:'Connection Making',    color:'#a855f7',
    desc:'Spot hidden links between subjects. Physics connects to Music. Maths connects to Art. Everything connects!' },
  { icon:'⬡',  name:'Pattern Spotting',    color:'#f5c518',
    desc:'Find patterns hiding in nature, data, music, and everyday life — they are the secret language of the universe.' },
  { icon:'🌐', name:'Big-Picture Thinking', color:'#00c87c',
    desc:'Zoom out to see the whole picture, not just the parts. Great thinkers always see how everything fits together.' },
  { icon:'⚗',  name:'Experimenting',       color:'#e9498a',
    desc:'Try new ideas, test them boldly, and learn from every single result — even the failed ones!' },
  { icon:'✦',  name:'Creative Thinking',   color:'#ff8c35',
    desc:'See problems from fresh, surprising angles and dream up brand-new solutions nobody thought of before.' },
];

/* ── IfaView Principle — Everything is Energy ── */
const ENERGY_FACTS = [
  { icon:'🌍', label:'Everything',  body:'Every subject you study — Science, Art, Maths, Sport — is a form of energy interaction.' },
  { icon:'👁',  label:'IfaView',    body:'IfaView is the Ifa way of seeing: every subject is viewed through the lens of Consciousness-Energy (CEN).' },
  { icon:'∞',  label:'Connected',  body:'Because everything is energy, ALL subjects are connected to each other. That\'s the Ifa secret!' },
];

/* ── Header ── */
function LensKidsHeader() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return (
    <header className={`lk-header${scrolled ? ' lk-header--scrolled' : ''}`}>
      <div className="lk-header__inner">
        <div className="lk-header__brand">
          <a href="../" className="lk-header__back">← IfaLens</a>
          <span className="lk-header__sep">/</span>
          <span className="lk-header__title">
            <span className="lk-header__ifa">Ifa</span>Lens
          </span>
          <span className="lk-header__badge">Kids &amp; Teens</span>
        </div>
        <nav className="lk-header__nav">
          <a href="../playground-kids/" className="lk-header__link">Playground ✦</a>
          <a href="../" className="lk-header__cta">Full IfaLens →</a>
        </nav>
      </div>
    </header>
  );
}

/* ── Animated Lens SVG ── */
function LensSVG() {
  return (
    <svg width="240" height="240" viewBox="0 0 240 240" aria-hidden="true" className="lk-lens-svg">
      <defs>
        <radialGradient id="lk-glow" cx="50%" cy="44%" r="55%">
          <stop offset="0%"   stopColor="#a855f7" stopOpacity="0.40"/>
          <stop offset="55%"  stopColor="#4aa3ff" stopOpacity="0.18"/>
          <stop offset="100%" stopColor="#00d9b8" stopOpacity="0.06"/>
        </radialGradient>
        <radialGradient id="lk-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#e9498a" stopOpacity="0.75"/>
          <stop offset="100%" stopColor="#a855f7" stopOpacity="0.20"/>
        </radialGradient>
      </defs>
      {/* Rings */}
      <circle cx="120" cy="120" r="108" fill="none" stroke="#4aa3ff"  strokeWidth="1"   strokeOpacity="0.22" className="lk-ring lk-ring--1"/>
      <circle cx="120" cy="120" r="90"  fill="none" stroke="#a855f7"  strokeWidth="1.5" strokeOpacity="0.30" className="lk-ring lk-ring--2"/>
      <circle cx="120" cy="120" r="70"  fill="url(#lk-glow)"/>
      <circle cx="120" cy="120" r="36"  fill="url(#lk-core)" className="lk-core-pulse"/>
      {/* Eye / Lens symbol */}
      <text x="120" y="129" textAnchor="middle" fontSize="28" fill="white" fillOpacity="0.88">👁</text>
      {/* 8 dimension dots on outer ring */}
      {SUPER_LENSES.map((sl, i) => {
        const a = (i * 45 - 90) * Math.PI / 180;
        const x = 120 + 108 * Math.cos(a);
        const y = 120 + 108 * Math.sin(a);
        return (
          <g key={sl.id}>
            <circle cx={x} cy={y} r="5" fill={sl.color} fillOpacity="0.85"/>
            <text x={x} y={y + 4} textAnchor="middle" fontSize="7" fill={sl.color} fontWeight="700">{sl.id}</text>
          </g>
        );
      })}
    </svg>
  );
}

/* ── Hero ── */
function HeroSection() {
  return (
    <section className="lk-hero">
      <div className="lk-hero__inner">
        <div className="lk-hero__text">
          <div className="lk-hero__eyebrow">IFA Academy · Beginners Edition · Ages 8 and up</div>
          <h1 className="lk-hero__title">
            See <span className="lk-ac lk-ac--violet">Everything</span><br/>
            Through <span className="lk-ac lk-ac--teal">Ifa's</span><br/>
            <span className="lk-ac lk-ac--gold">Magic Lens</span>
          </h1>
          <p className="lk-hero__sub">
            IfaLens is your superpower for learning <strong>every subject on Earth</strong> — Science, Art, Maths, Technology, and more — all through the ancient wisdom of Ifa.
          </p>
          <div className="lk-hero__pills">
            <span className="lk-pill" style={{'--pc':'#4aa3ff'}}>⚗ Science</span>
            <span className="lk-pill" style={{'--pc':'#e9498a'}}>✦ Arts</span>
            <span className="lk-pill" style={{'--pc':'#a855f7'}}>∑ Maths</span>
            <span className="lk-pill" style={{'--pc':'#00d9b8'}}>⌬ Tech</span>
            <span className="lk-pill" style={{'--pc':'#f5c518'}}>⚙ Engineering</span>
            <span className="lk-pill" style={{'--pc':'#00c87c'}}>⊛ Social</span>
          </div>
          <div className="lk-hero__ctas">
            <a href="#super-lenses" className="lk-btn lk-btn--primary">Start Exploring ↓</a>
            <a href="../playground-kids/" className="lk-btn lk-btn--ghost">Try the Playground →</a>
          </div>
        </div>
        <div className="lk-hero__visual">
          <LensSVG />
        </div>
      </div>
    </section>
  );
}

/* ── What is IfaLens? ── */
function IntroSection() {
  const cards = [
    { icon:'🌍', color:'#a855f7', title:'Ancient African Wisdom',
      body:'IfaLens is built on 256 ancient knowledge codes called Odu Ifa — discovered by Yoruba scholars thousands of years ago and still unrivalled today.' },
    { icon:'🔗', color:'#4aa3ff', title:'Connect All Subjects',
      body:'Instead of learning Physics, Art, and History in separate boxes, IfaLens shows you how EVERY subject is connected to every other subject.' },
    { icon:'🌟', color:'#00c87c', title:'For Every Learner',
      body:'Whether you love stories, sports, science, or music — IfaLens gives you a unique lens to explore anything your way. You are already a polymath!' },
  ];
  return (
    <section className="lk-section lk-section--alt" id="intro">
      <div className="lk-container">
        <div className="lk-eyebrow">What is IfaLens?</div>
        <h2 className="lk-title">Your Magic Glasses for <span className="lk-ac lk-ac--violet">All Knowledge</span></h2>
        <p className="lk-subtitle">IfaLens (LensoE — the Lens of Everything) is a polymathic learning tool from the IFA Internet.</p>
        <div className="lk-grid3">
          {cards.map((c, i) => (
            <div key={i} className="lk-intro-card" style={{'--cc': c.color}}>
              <div className="lk-intro-card__icon">{c.icon}</div>
              <h3 className="lk-intro-card__title">{c.title}</h3>
              <p className="lk-intro-card__body">{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── IfaView: Everything is Energy ── */
function IfaViewSection() {
  return (
    <section className="lk-section lk-section--energy" id="ifaview">
      <div className="lk-container">
        <div className="lk-eyebrow">IfaView · The Big Idea</div>
        <h2 className="lk-title">Everything Is <span className="lk-ac lk-ac--teal">Energy</span></h2>
        <p className="lk-subtitle">This is the most important idea in IfaLens — and it changes how you see every subject.</p>
        <div className="lk-energy-banner">
          <div className="lk-energy-formula">
            <span className="lk-ef__part lk-ef__part--a">Physics</span>
            <span className="lk-ef__op">+</span>
            <span className="lk-ef__part lk-ef__part--b">Art</span>
            <span className="lk-ef__op">+</span>
            <span className="lk-ef__part lk-ef__part--c">Music</span>
            <span className="lk-ef__op">=</span>
            <span className="lk-ef__result">Energy ∞</span>
          </div>
          <p className="lk-energy-caption">All subjects are different forms of the same thing — Energy.</p>
        </div>
        <div className="lk-grid3">
          {ENERGY_FACTS.map((f, i) => (
            <div key={i} className="lk-energy-card">
              <div className="lk-energy-card__icon">{f.icon}</div>
              <div className="lk-energy-card__label">{f.label}</div>
              <p className="lk-energy-card__body">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Super Lenses (SIDECHRX) ── */
function SuperLensCard({ lens, active, onToggle }) {
  return (
    <div
      className={`lk-lens-card${active ? ' lk-lens-card--open' : ''}`}
      style={{'--lc': lens.color}}
      onClick={onToggle}
      role="button"
      tabIndex={0}
      onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onToggle()}
      aria-expanded={active}
    >
      <div className="lk-lens-card__top">
        <div className="lk-lens-card__icon">{lens.icon}</div>
        <div className="lk-lens-card__info">
          <div className="lk-lens-card__id">{lens.id}</div>
          <div className="lk-lens-card__name">{lens.name}</div>
          <div className="lk-lens-card__kid">{lens.kidName}</div>
        </div>
        <div className="lk-lens-card__arrow">{active ? '▲' : '▼'}</div>
      </div>
      {active && (
        <div className="lk-lens-card__body">
          <p className="lk-lens-card__desc">{lens.desc}</p>
          <div className="lk-lens-card__fact">
            <span className="lk-lens-card__fact-lbl">💡 Did you know?</span>
            <span className="lk-lens-card__fact-txt">{lens.fact}</span>
          </div>
        </div>
      )}
    </div>
  );
}

function SuperLensesSection() {
  const [active, setActive] = useState(null);
  return (
    <section className="lk-section" id="super-lenses">
      <div className="lk-container">
        <div className="lk-eyebrow">SIDECHRX · 8 Dimensions</div>
        <h2 className="lk-title">Your 8 <span className="lk-ac lk-ac--violet">Super Lenses</span></h2>
        <p className="lk-subtitle">Each lens is a different way of looking at any subject. Use all 8 together and you can understand anything in the universe. Tap each one!</p>
        <div className="lk-lenses-grid">
          {SUPER_LENSES.map(lens => (
            <SuperLensCard
              key={lens.id}
              lens={lens}
              active={active === lens.id}
              onToggle={() => setActive(a => a === lens.id ? null : lens.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Knowledge Worlds (STEAMSEX) ── */
function WorldCard({ world, active, onToggle }) {
  return (
    <div
      className={`lk-world-card${active ? ' lk-world-card--open' : ''}`}
      style={{'--wc': world.color}}
      onClick={onToggle}
      role="button"
      tabIndex={0}
      onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onToggle()}
    >
      <div className="lk-world-card__icon">{world.icon}</div>
      <div className="lk-world-card__name">{world.name}</div>
      <div className="lk-world-card__kid">{world.kidName}</div>
      {active && (
        <div className="lk-world-card__expand">
          <p className="lk-world-card__desc">{world.desc}</p>
          <div className="lk-world-card__tags">
            {world.subjects.map(s => <span key={s} className="lk-world-tag">{s}</span>)}
          </div>
        </div>
      )}
    </div>
  );
}

function KnowledgeWorldsSection() {
  const [active, setActive] = useState(null);
  return (
    <section className="lk-section lk-section--alt" id="worlds">
      <div className="lk-container">
        <div className="lk-eyebrow">STEAMSEX · 8 Categories</div>
        <h2 className="lk-title">8 Worlds of <span className="lk-ac lk-ac--teal">Knowledge</span></h2>
        <p className="lk-subtitle">All human knowledge fits into 8 worlds. IfaLens explores ALL of them — and shows how they connect to each other. Tap any world to explore!</p>
        <div className="lk-worlds-grid">
          {KNOWLEDGE_WORLDS.map(w => (
            <WorldCard
              key={w.id}
              world={w}
              active={active === w.id}
              onToggle={() => setActive(a => a === w.id ? null : w.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Ifascopes ── */
function ScopesSection() {
  return (
    <section className="lk-section" id="scopes">
      <div className="lk-container">
        <div className="lk-eyebrow">Ifascopes · Types of Lenses</div>
        <h2 className="lk-title">Ways to <span className="lk-ac lk-ac--gold">Look Deeper</span></h2>
        <p className="lk-subtitle">Different Ifascopes zoom into different layers of reality. Scientists, artists, and engineers all use different lenses. Which one is yours?</p>
        <div className="lk-scopes-row">
          {KID_SCOPES.map((s, i) => (
            <div key={i} className="lk-scope-card" style={{'--sc': s.color}}>
              <div className="lk-scope-card__icon">{s.icon}</div>
              <div className="lk-scope-card__name">{s.name}</div>
              <p className="lk-scope-card__desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Polymathic Skills ── */
function SkillsSection() {
  return (
    <section className="lk-section lk-section--alt" id="skills">
      <div className="lk-container">
        <div className="lk-eyebrow">Polymathic Skills · Your Superpowers</div>
        <h2 className="lk-title">Build Your <span className="lk-ac lk-ac--violet">Superpowers</span></h2>
        <p className="lk-subtitle">IfaLens helps you grow the 6 skills that ALL great learners, scientists, artists, and engineers share. You probably already have some!</p>
        <div className="lk-skills-grid">
          {KID_SKILLS.map((sk, i) => (
            <div key={i} className="lk-skill-card" style={{'--skc': sk.color}}>
              <div className="lk-skill-card__icon">{sk.icon}</div>
              <div className="lk-skill-card__name">{sk.name}</div>
              <p className="lk-skill-card__desc">{sk.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── CTA: Explore More ── */
function ExploreCTA() {
  const links = [
    { icon:'🎮', label:'IfaLens Playground',   sub:'Kids & Teens Edition',  href:'../playground-kids/', color:'#a855f7' },
    { icon:'👁',  label:'Full IfaLens',         sub:'Advanced version',      href:'../',                  color:'#4aa3ff' },
    { icon:'⚛',  label:'IfaQuantum',           sub:'Quantum science',       href:'../../ifa-quantum/',   color:'#00d9b8' },
    { icon:'🎲', label:'IFA Games',             sub:'PlayIfa Games',         href:'https://www.playifagames.org/', color:'#f5c518', ext:true },
  ];
  return (
    <section className="lk-section" id="explore">
      <div className="lk-container">
        <div className="lk-eyebrow">Keep Learning · Explore the IFA Internet</div>
        <h2 className="lk-title">Ready to <span className="lk-ac lk-ac--gold">Go Further?</span></h2>
        <p className="lk-subtitle">IfaLens is just the beginning. The IFA Internet is a whole universe of knowledge waiting for you!</p>
        <div className="lk-cta-grid">
          {links.map((l, i) => (
            <a
              key={i}
              href={l.href}
              className="lk-cta-card"
              style={{'--ctac': l.color}}
              target={l.ext ? '_blank' : undefined}
              rel={l.ext ? 'noopener noreferrer' : undefined}
            >
              <div className="lk-cta-card__icon">{l.icon}</div>
              <div className="lk-cta-card__label">{l.label}</div>
              <div className="lk-cta-card__sub">{l.sub}</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Footer ── */
function Footer() {
  return (
    <footer className="lk-footer">
      <div className="lk-footer__inner">
        <div className="lk-footer__brand">
          <a href="../" className="lk-footer__link">IfaLens</a>
          <span> · </span>
          <a href="../playground-kids/" className="lk-footer__link">Kids Playground</a>
          <span> · </span>
          <a href="../../" className="lk-footer__link">IFA Internet</a>
          <span> · </span>
          <a href="https://cenproject.org/" target="_blank" rel="noopener noreferrer" className="lk-footer__link">CENProject</a>
        </div>
        <p className="lk-footer__note">
          IfaLens Kids &amp; Teens · LensoE — The Lens of Everything · Beginners Edition · IFA Academy of Polymaths
        </p>
      </div>
    </footer>
  );
}

/* ── App ── */
function App() {
  return (
    <>
      <LensKidsHeader />
      <HeroSection />
      <IntroSection />
      <IfaViewSection />
      <SuperLensesSection />
      <KnowledgeWorldsSection />
      <ScopesSection />
      <SkillsSection />
      <ExploreCTA />
      <Footer />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
