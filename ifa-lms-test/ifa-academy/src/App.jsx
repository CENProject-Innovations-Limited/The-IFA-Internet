/* ─────────────────────────────────────────────────────────────────────────────
   IFA Academy of Polymaths — Ifacodemy
   A subpage of IfaLMS · CENProject
───────────────────────────────────────────────────────────────────────────── */

const { useState } = React;

/* ── DATA ──────────────────────────────────────────────────────────────────── */

const STATS = [
  { value: '8+',  label: 'Courses',           sub: 'Across Ifa STEAM fields' },
  { value: '4',   label: 'Learning Tracks',   sub: 'Kids · Adults · Professionals' },
  { value: '256', label: 'Odu Ifa',           sub: 'The Axiomatic Knowledge Matrix' },
  { value: '∞',   label: 'Disciplines',       sub: 'Unified through Ifa' },
];

const AUDIENCE = [
  {
    icon: '🎓', label: 'Adults', color: '#f0920c',
    desc: 'Programs designed for high school students, undergraduates, graduates, and lifelong learners seeking to expand knowledge and innovate through the Ifa/Orisa Model of Learning.',
  },
  {
    icon: '🌱', label: 'Kids', color: '#f5c518',
    desc: 'Programs designed for children and teens to explore science, technology, engineering, art and design, and mathematics (STEAM) through playful coding and games using the Principles of Ifa Education.',
  },
  {
    icon: '⚡', label: 'Professionals', color: '#8b5cf6',
    desc: 'Programs designed for entrepreneurs, educators, and innovators to apply Ifa-based problem-solving and consciousness mechanics in real-world systems.',
  },
];

const POLYMATH_PILLARS = [
  {
    num: '01', title: 'Breadth', sym: '⊕', color: '#f0920c',
    desc: 'Explore knowledge across radically non-adjacent fields — just as the 256 Odu Ifa encode all domains of reality without separation. A polymath does not choose one path; they traverse all paths.',
  },
  {
    num: '02', title: 'Depth', sym: '∫', color: '#00c87c',
    desc: 'Go deep into IFA Mathematics, Consciousness Science, and IFA Computing — building genuine expertise, not surface familiarity. Ifa demands mastery at every level of inquiry.',
  },
  {
    num: '03', title: 'Synthesis', sym: '⊛', color: '#8b5cf6',
    desc: 'The critical third dimension — missing from traditional education. The IFA Model of Education reveals the patterns, relationships, and universal laws that unify all knowledge into one living system.',
  },
];

const POLYMATH_DISCIPLINES = [
  { sym: 'Ψ',  label: 'Consciousness Science', color: '#f0920c' },
  { sym: '∫',  label: 'IFA Mathematics',       color: '#00c87c' },
  { sym: '⊕',  label: 'IFA Computing',         color: '#8b5cf6' },
  { sym: 'Ẹ',  label: 'Ebology',               color: '#3b9eff' },
  { sym: '⊛',  label: 'IFA Physics',           color: '#f5c518' },
  { sym: '𝓣',  label: 'TransformoE',           color: '#e9498a' },
];

const IFA_LAWS = [
  { law: 'Symmetry (S)',               ope: 'Ogbè (O)',       accent: '#f0920c' },
  { law: 'Invariance (I)',             ope: 'Ọ̀yẹ̀kú (I)',    accent: '#00c87c' },
  { law: 'Duality (D)',               ope: 'Ìwòrì (I)',      accent: '#8b5cf6' },
  { law: 'Emergence (E)',             ope: 'Òdí (O)',         accent: '#3b9eff' },
  { law: 'Composition (C)',           ope: 'Ìrosùn (I)',     accent: '#f5c518' },
  { law: 'Holism (H)',                ope: 'Ọ̀wọnrín (O)',   accent: '#e9498a' },
  { law: 'Reductionism (R)',          ope: 'Ọ̀bàrà (O)',     accent: '#f0920c' },
  { law: 'Others (X): Simulation',   ope: 'Ọ̀kànràn (O)',   accent: '#00c87c' },
  { law: 'Anti-symmetry',             ope: 'Ògúndá (O)',     accent: '#8b5cf6' },
  { law: 'Anti-invariance',           ope: 'Ọ̀sá (O)',       accent: '#3b9eff' },
  { law: 'Anti-duality',              ope: 'Ìká (I)',        accent: '#f5c518' },
  { law: 'Anti-emergence',            ope: 'Òtúrúpọ̀n (O)', accent: '#e9498a' },
  { law: 'Anti-composition',          ope: 'Òtúrá (O)',      accent: '#f0920c' },
  { law: 'Anti-holism',               ope: 'Ìrẹtẹ̀ (I)',    accent: '#00c87c' },
  { law: 'Anti-reductionism',         ope: 'Ọ̀ṣẹ́ (O)',     accent: '#8b5cf6' },
  { law: 'Anti-others (anti-simulation)', ope: 'Òfún (O)',  accent: '#3b9eff' },
];

const WHY_FEATURES = [
  { icon: '🌍', title: 'Rooted in Ancient Intelligence',       desc: 'Built on the timeless wisdom of the Ifa Model of Education for deeper, holistic understanding.',                                              color: '#f0920c' },
  { icon: '🧠', title: 'Powered by Conscious Learning',        desc: 'Integrates science, spirituality, and logic to awaken creative intelligence in every learner.',                                               color: '#00c87c' },
  { icon: '∞',  title: 'Universal Learning Framework',         desc: 'Learn all subjects and disciplines using a unified, consciousness-based model.',                                                             color: '#8b5cf6' },
  { icon: '🌱', title: 'African Solutions to Global Problems', desc: 'Reviving indigenous African knowledge to inspire innovation and sustainable development worldwide.',                                           color: '#3b9eff' },
  { icon: '🤝', title: 'Inclusive for All Ages',               desc: 'Designed for children, students, professionals, and lifelong learners seeking transformative education.',                                     color: '#f5c518' },
  { icon: '🚀', title: 'Future-Focused Mindset',               desc: 'Prepares learners to thrive in evolving scientific, technological, and spiritual ecosystems.',                                               color: '#e9498a' },
];

const KIDS_COURSES = [
  {
    title: 'The Basics of the IFA Body of Knowledge (IFABOK)', duration: '4 Months', price: '₦40,000/Month',
    desc: 'A gentle introduction to the IFA Body of Knowledge — exploring the basics of science, technology, philosophy, and logic through the Lens of Ifa/Orisa. Learn foundational STEAM principles using consciousness-based methods and bilingual instruction in Yoruba and English, preparing you for advanced levels of IFA learning.',
  },
  {
    title: 'IFABOK 1', duration: '4 Months', price: '₦40,000/Month',
    desc: "Explore the foundations of IFA Mathematics — from IfaBits and symbols to numbers and patterns at the elementary level. Learn basic Ifa STEAM using modern techniques and dual-language instruction in Yoruba and English, bridging ancient logic with today's analytical thinking.",
  },
  {
    title: 'The IFA Model of Education and Learning', duration: '4 Months', price: '₦40,000/Month',
    desc: 'Elementary IFA Simulation Theory: The IFA Model of Education is based on the IFA Simulation Theory, where all subjects are generated mathematically as simulations of Ogbe, the Base-Field. Explore Ifa STEAM in Yoruba and English.',
  },
];

const ADULTS_COURSES = [
  {
    title: 'Introduction to the IFA Body of Knowledge (IFABOK)\nIFABOK 0', duration: '3 Months', price: '₦60,000/Month',
    desc: 'Introduction to IFA Coding — a unique learning model discovered in the Odu Ifa, where the 256 Ifa Codes encode knowledge across all fields and subjects. Learn STEAM through consciousness-based principles in Yoruba and English.',
  },
  {
    title: 'IFABOK 1', duration: '3 Months', price: '₦60,000/Month',
    desc: 'Explore the universes of knowledge within IFABOK, i.e., IFA Mathematics, modelling all fields as mathematical objects within the Universal System — the Theory of Everything (TOE). Ifa STEAM in Yoruba and English.',
  },
  {
    title: 'Introduction to Consciousness Science', duration: '3 Months', price: '₦60,000/Month',
    desc: 'Study consciousness scientifically — breaking it into measurable components called IfaBits. Explore how Ifa Science bridges spirit, mind, and matter through logical discovery and the principles of Ifa Metascience.',
  },
  {
    title: 'IFA Technology Projects', duration: '3 Months', price: '₦60,000/Month',
    desc: 'Apply IFA Coding to build technologies and solutions for global and continental challenges. Develop CEN Technologies (TechoE) — innovations that merge African intelligence with modern science for sustainability, health, and digital systems.',
  },
  {
    title: 'Advanced IFA Mathematics', duration: '3 Months', price: '₦60,000/Month',
    desc: 'Dive deeper into complex concepts and universal laws in IFA Mathematics and Consciousness Science. Apply Ifa logic and symbolic reasoning to scientific analysis, technology, and creative innovation within Ifa STEAM frameworks.',
  },
  {
    title: 'The IFA Model of Education and Learning', duration: '3 Months', price: '₦60,000/Month',
    desc: 'The Odu Ifa Model of Education is founded on IFA Simulation Theory — all knowledge fields generated mathematically as simulations of the Base-Field (OmniField/CEN). Connect modern STEAM education to its Yoruba and African scientific origins.',
  },
];

const LEARNING_MODELS = [
  { icon: '💻', title: 'Virtual Classes',    desc: 'Participate from anywhere in the world through guided online sessions.',                                                                       color: '#3b9eff' },
  { icon: '🏛️', title: 'Physical Classes',   desc: 'Engage in in-person classes for direct mentorship and collaborative learning.',      badge: 'Coming Soon',                                  color: '#f0920c' },
  { icon: '⚡', title: 'Weekend Bootcamps',  desc: 'Join intensive weekend programs for accelerated learning, practical projects, and group innovation challenges.',                               color: '#8b5cf6' },
];

const RESEARCH_CLAIMS = [
  {
    claim: 'Polymaths as systems thinkers', source: 'Cross-disciplinary research',
    detail: 'Learners who study multiple non-adjacent disciplines develop superior pattern recognition and problem-solving capabilities — a core outcome of the Ifa Model.',
  },
  {
    claim: 'Disciplinary diversification protects against disruption', source: 'Economic & cognitive science',
    detail: 'Polymathic education provides resilience in rapidly changing professional landscapes by building transferable meta-skills across all domains.',
  },
  {
    claim: 'Integration is the critical third component', source: 'Polymath.org research foundation',
    detail: "Beyond breadth and depth, synthesis — the IFA Model's greatest strength — is what produces genuine innovation and universal insight.",
  },
  {
    claim: 'Ancient knowledge systems encode modern science', source: 'Ifa Metascience tradition',
    detail: 'The 256 Odu Ifa were recognised by UNESCO as Intangible Cultural Heritage — encoding the complete axiomatic framework of all human knowledge.',
  },
];

const PROBLEMS = [
  {
    icon: '🏛️',
    headline: 'The world does not need more narrow specialists',
    body: 'Organisations across every sector struggle to find talent that blends concrete skills with human capacities — curiosity, creativity, critical thinking. Traditional education produces narrow specialists. Ifacodemy produces polymaths.',
    color: '#f0920c',
  },
  {
    icon: '🌍',
    headline: 'The hardest problems don\'t stay inside one subject',
    body: 'Climate, health, governance, technology — none of today\'s critical challenges live within a single discipline. They demand minds that can connect ecology with economics, code with culture, physics with philosophy.',
    color: '#00c87c',
  },
  {
    icon: '🔄',
    headline: 'Lifelong learning is no longer optional',
    body: '60% of the global workforce will need to re-skill by 2027. Over 85 million jobs will be radically reshaped by automation. The future belongs to those who learn — and keep learning — across all boundaries.',
    color: '#8b5cf6',
  },
];

const REAL_WORLD = [
  {
    field: 'Medicine · Design · Psychology',
    title: 'Reimagining the MRI Experience',
    body: 'Doug Dietz, a GE engineer, drastically reduced the need for sedation in children\'s MRI scans — not through engineering, but by redesigning the entire patient experience using insights from theatre, psychology, and industrial design.',
    color: '#f0920c', sym: '⊕',
  },
  {
    field: 'Biology · Architecture · Fluid Dynamics',
    title: 'Buildings Cooled by Termite Logic',
    body: 'Architect Mick Pearce slashed a building\'s energy consumption by over 90% by studying how termites construct their mounds — combining entomology, architecture, and fluid dynamics into one elegant solution.',
    color: '#00c87c', sym: '∫',
  },
  {
    field: 'Music · Neuroscience · Medicine',
    title: 'Rhythm as a Path to Recovery',
    body: 'Michael Thaut discovered that rhythmic musical patterns could rewire the brain and restore walking in stroke patients — a breakthrough born at the intersection of music, neuroscience, and rehabilitation medicine.',
    color: '#8b5cf6', sym: '⊛',
  },
  {
    field: 'Ornithology · Aerospace · Engineering',
    title: 'Flight Efficiency Through Bird Wings',
    body: 'Akira Azuma transformed aircraft design by applying the mechanics of bird wings to aerospace engineering — a discovery that required simultaneous mastery of ornithology, fluid dynamics, and structural engineering.',
    color: '#3b9eff', sym: '𝓣',
  },
];

const RESEARCH_CITATIONS = [
  {
    authors: 'Vojak, Price & Griffin',
    work: 'Serial Innovators',
    quote: 'Polymaths are described as having a high tolerance for ambiguity and as systems thinkers. They can connect disparate pieces of information in new ways, making them highly effective at innovative problem solving.',
    color: '#f0920c',
  },
  {
    authors: 'Michael E. Araki',
    work: 'Polymathy: A New Outlook',
    quote: 'The quality of being polymathic entails three components: breadth, depth and integration. Integration involves the capacity of connecting, articulating, or synthesizing different sets of knowledge and different ways of thinking.',
    color: '#00c87c',
  },
  {
    authors: 'Hanks, Jiang, Qian, Wang & Weinberg',
    work: 'Do Double Majors Face Less Risk?',
    quote: 'Students who diversify their academic disciplines experience substantial protection against earnings shocks. The protection is more pronounced when their majors are more distantly related.',
    color: '#8b5cf6',
  },
  {
    authors: 'Angela J. Cotellessa',
    work: 'In Pursuit of Polymaths',
    quote: 'Polymaths think creatively and strategically, and juggle their many interests and obligations through effective time management. Polymathy develops due to a combination of nature and nurture.',
    color: '#3b9eff',
  },
];

const ALL_COURSES = [
  'The Basics of the IFA Body of Knowledge (IFABOK) (Kids)',
  'Introduction to IFA Mathematics (Kids)',
  'The IFA Model of Education and Learning (Kids)',
  'Introduction to the IFA Body of Knowledge (IFABOK) (Adults)',
  'IFABOK 1 (Adults)',
  'Introduction to Consciousness Science (Adults)',
  'IFA Technology Projects (Adults)',
  'Advanced IFA Mathematics (Adults)',
  'The IFA Model of Education and Learning (Adults)',
];

/* ── COMPONENTS ─────────────────────────────────────────────────────────────── */

function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a href="../" className="site-header__back">
          <span className="site-header__back-arrow">←</span>
          <span>IfaLMS</span>
        </a>
        <div className="site-header__brand">
          <span className="site-header__brand-name">IFA Academy of Polymaths</span>
          <span className="site-header__brand-sub">Ifacodemy</span>
        </div>
        <a href="#enroll" className="btn btn--primary btn--sm">Enroll Now</a>
      </div>
    </header>
  );
}

function HeroSection() {
  return (
    <section className="hero">
      <div className="hero__grid-bg" aria-hidden="true" />
      <div className="hero__glow" aria-hidden="true" />
      <div className="hero__glow-b" aria-hidden="true" />
      <div className="hero__inner">
        <div className="hero__eyebrow">
          <span className="hero__ey-dot" aria-hidden="true" />
          <span className="hero__badge">IFA Academy of Polymaths · Ifacodemy</span>
          <span className="hero__ey-dot" aria-hidden="true" />
        </div>
        <div className="hero__ifa-symbols" aria-hidden="true">
          <span>⊕</span><span className="hero__ifs-line" /><span>Ψ</span><span className="hero__ifs-line" /><span>⊛</span><span className="hero__ifs-line" /><span>∫</span><span className="hero__ifs-line" /><span>𝓣</span>
        </div>
        <h1 className="hero__headline">
          <span className="hero__hl-1">Achieving Polymathy</span>
          <span className="hero__hl-2">through the Mathematical &amp; Holistic</span>
          <span className="hero__hl-3">Approaches of <strong className="hero__hl-strong">Ifa &amp; Orisa</strong></span>
        </h1>
        <p className="hero__desc">
          A CENProject initiative transforming education through the Ifa Model of Education and Learning — where millennia of ancestral intelligence evolve into modern science.
          Explore every field of study through IfaBits (IFA Binary System). Master cross-disciplinary problem-solving with Ifa and Orisa Systems. Become a polymath.
        </p>
        <div className="hero__ctas">
          <a href="#enroll" className="btn btn--primary btn--lg">Enroll Now</a>
          <a href="#courses" className="btn btn--ghost btn--lg">Explore Courses</a>
        </div>
      </div>
    </section>
  );
}

function StatsBar() {
  return (
    <div className="stats-bar">
      <div className="stats-bar__inner">
        {STATS.map((s) => (
          <div className="stats-bar__item" key={s.label}>
            <span className="stats-bar__value">{s.value}</span>
            <span className="stats-bar__label">{s.label}</span>
            <span className="stats-bar__sub">{s.sub}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AudienceSection() {
  return (
    <section className="section section--alt">
      <div className="section__inner">
        <div className="section__header">
          <span className="section__badge">Who Is Ifacodemy For?</span>
          <h2 className="section__title">Learning for Every Stage of Life</h2>
        </div>
        <div className="audience-grid">
          {AUDIENCE.map((a) => (
            <div className="audience-card" key={a.label} style={{ '--ac': a.color }}>
              <div className="audience-card__icon">{a.icon}</div>
              <h3 className="audience-card__title">{a.label}</h3>
              <p className="audience-card__desc">{a.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PolymathSection() {
  return (
    <section className="section">
      <div className="section__inner">
        <div className="section__header">
          <span className="section__badge">The Polymath Approach</span>
          <h2 className="section__title">16 Dimensions of Polymathic Learning</h2>
          <p className="section__lead">
            At Ifacodemy, we follow the research-proven framework that the greatest learners in history — polymaths — shared three essential qualities: breadth, depth, and synthesis.
            The IFA Model of Education is the only system in the world that natively encodes all three.
          </p>
        </div>

        <div className="pillar-grid">
          {POLYMATH_PILLARS.map((p) => (
            <div className="pillar-card" key={p.title} style={{ '--pc': p.color }}>
              <div className="pillar-card__num">{p.num}</div>
              <div className="pillar-card__sym">{p.sym}</div>
              <h3 className="pillar-card__title">{p.title}</h3>
              <p className="pillar-card__desc">{p.desc}</p>
            </div>
          ))}
        </div>

        <div className="disciplines">
          <p className="disciplines__label">Master disciplines across all fields</p>
          <div className="disciplines__grid">
            {POLYMATH_DISCIPLINES.map((d) => (
              <div className="discipline-badge" key={d.label} style={{ '--dc': d.color }}>
                <span className="discipline-badge__sym">{d.sym}</span>
                <span className="discipline-badge__label">{d.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="ifalaws">
          <div className="ifalaws__header">
            <p className="ifalaws__title-yo">Ẹkọ Kíkọ Ní Ìlàna Ifá &amp; Òrìṣà</p>
            <p className="ifalaws__title-en">Ifa &amp; Orisa Methods of Learning All Fields</p>
            <p className="ifalaws__subtitle-yo">Ojú Odù Ifá Mẹrìndínlógún</p>
            <p className="ifalaws__subtitle-en">The 16 Laws of Ifa Governing All Fields</p>
          </div>

          <div className="ifalaws__body">
            <div className="ifalaws__note">
              <p><strong>Note:</strong> The meta-laws of Ifa in the left column help simplify the <strong>Ojú Odù Ifá (the 16 Ifa Energy Vibrations/Patterns)</strong> on the right and are not English translations.</p>
              <p className="ifalaws__mnemonic">
                <strong>Ifa Mnemonic (Shortcut to Remember Them):</strong><br />
                <span className="ifalaws__mnemonic-code">SIDECHRX/Obiri-ìlà</span><br />
                <em>Pronounced 'sidekrics'</em>
              </p>
            </div>

            <div className="ifalaws__table-wrap">
              <table className="ifalaws__table">
                <thead>
                  <tr>
                    <th>IfaLaw in Modern Language</th>
                    <th>IfaLaw in the Ancient Language of Òpẹ (Èdè Òpẹ)</th>
                  </tr>
                </thead>
                <tbody>
                  {IFA_LAWS.map((row) => (
                    <tr key={row.law} style={{ '--la': row.accent }}>
                      <td className="ifalaws__td-law">{row.law}</td>
                      <td className="ifalaws__td-ope">{row.ope}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <p className="ifalaws__caption">
            <strong>FIGURE</strong> — These Meta Laws Are the General Tools of Ifa for Modeling Concepts, Phenomena, Laws, Principles, Theories, and Models in All Fields.
          </p>
        </div>
      </div>
    </section>
  );
}

function WhySection() {
  return (
    <section className="section section--alt">
      <div className="section__inner">
        <div className="section__header">
          <span className="section__badge">Knowledge & Culture Meets Innovation</span>
          <h2 className="section__title">Why the IFA Academy of Polymaths?</h2>
        </div>
        <div className="why-grid">
          {WHY_FEATURES.map((f) => (
            <div className="why-card" key={f.title} style={{ '--wc': f.color }}>
              <div className="why-card__icon">{f.icon}</div>
              <h3 className="why-card__title">{f.title}</h3>
              <p className="why-card__desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ApplicationsSection() {
  return (
    <section className="section">
      <div className="section__inner">
        <div className="applications-grid">
          <div className="applications-block">
            <span className="section__badge">Conscious Coding & STEAM Systems</span>
            <h3 className="applications-block__title">From Ifa Wisdom to STEAM Innovation</h3>
            <p className="applications-block__body">
              Students apply IfaBits to build software systems, model physical phenomena, design algorithms and integrate coding with engineering disciplines — bridging the Ifa Model of Education with modern STEAM practice.
            </p>
          </div>
          <div className="applications-block">
            <span className="section__badge">Global Challenges, African-Rooted Solutions</span>
            <h3 className="applications-block__title">Using indigenous knowledge to solve 21st-century problems</h3>
            <p className="applications-block__body">
              Learners explore how ancient Ifa intelligence underpins technologies and frameworks (like the universal language, new computing paradigms, sensors) and translate that into real-world tools for space science, health tech, art, environment and society.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ManifestoSection() {
  return (
    <div className="manifesto">
      <div className="manifesto__glow" aria-hidden="true" />
      <div className="manifesto__inner">
        <p className="manifesto__statement">
          The world's most demanding problems do not honour subject boundaries —
          <span className="manifesto__statement-em"> and neither do the minds built to meet them.</span>
        </p>
        <div className="manifesto__rule" />
        <p className="manifesto__body">
          Every great challenge in human history has crossed every traditional line of discipline, skill, and culture.
          The people who rose to meet those challenges were never narrow specialists — they were connected thinkers,
          systems seers, and polymaths who could hold the whole picture at once. At Ifacodemy, we train those minds.
        </p>
        <div className="manifesto__four-cs">
          {['Curiosity', 'Creativity', 'Critical Thinking', 'Community'].map((c, i, arr) => (
            <React.Fragment key={c}>
              <span className="manifesto__c">{c}</span>
              {i < arr.length - 1 && <span className="manifesto__dot">·</span>}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProblemSection() {
  return (
    <section className="section section--alt">
      <div className="section__inner">
        <div className="section__header">
          <span className="section__badge">Why Polymathic Education?</span>
          <h2 className="section__title">The World Demands Connected Thinkers</h2>
          <p className="section__lead">
            Traditional education was built for a world that no longer exists. Today's most urgent challenges
            do not live inside a single department — and neither should the people solving them.
          </p>
        </div>
        <div className="problem-grid">
          {PROBLEMS.map((p) => (
            <div className="problem-card" key={p.headline} style={{ '--prc': p.color }}>
              <div className="problem-card__icon">{p.icon}</div>
              <h3 className="problem-card__headline">{p.headline}</h3>
              <p className="problem-card__body">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BelongSection() {
  return (
    <div className="belong">
      <div className="belong__inner">
        <p className="belong__statement">
          "If you have always been drawn to too many things to choose just one —
          <em> that is exactly why you belong here.</em>"
        </p>
        <p className="belong__sub">
          Ifacodemy was built for the curious, the cross-disciplinary, and the unconventional. For people who see
          connections where others see walls — and who refuse to be confined to a single lane of knowledge.
          Our graduates go on to found companies, drive policy, and build careers that did not yet exist when they enrolled.
        </p>
        <a href="#enroll" className="btn btn--primary btn--lg">Find Your Place →</a>
      </div>
    </div>
  );
}

function RealWorldSection() {
  return (
    <section className="section">
      <div className="section__inner">
        <div className="section__header">
          <span className="section__badge">Making it Real</span>
          <h2 className="section__title">When Knowledge Connects, Breakthroughs Follow</h2>
          <p className="section__lead">
            The greatest advances in human history came from people who refused to stay inside one field.
            This is what happens when knowledge flows freely across disciplinary boundaries.
          </p>
        </div>
        <div className="real-world-grid">
          {REAL_WORLD.map((r) => (
            <div className="real-card" key={r.title} style={{ '--rc': r.color }}>
              <div className="real-card__sym">{r.sym}</div>
              <div className="real-card__field">{r.field}</div>
              <h4 className="real-card__title">{r.title}</h4>
              <p className="real-card__body">{r.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ResearchSection() {
  return (
    <section className="section section--alt">
      <div className="section__inner">
        <div className="section__header">
          <span className="section__badge">The Foundational Science</span>
          <h2 className="section__title">Polymathic Learning Backed by Research</h2>
          <div className="research-lead">
            <p className="research-lead__p">
              Our approach is grounded in cross-disciplinary science and rooted in Ifa —
              the world's oldest complete Knowledge System.
            </p>
            <p className="research-lead__p">
              Africa has always been home to polymaths. <strong>Orunmila</strong>, the Orisa of Wisdom,
              encoded cosmology, medicine, philosophy, and mathematics into the 256 Odu Ifa —
              a unified map of all reality. <strong>Osun</strong>, the Orisa of Rivers and Artistry,
              embodied the seamless union of healing, science, creativity, and diplomacy.
            </p>
            <p className="research-lead__p">
              In the modern era, <strong>Cheikh Anta Diop</strong> bridged physics, history, linguistics,
              and political philosophy. <strong>Wole Soyinka</strong> moved fluidly between poetry, drama,
              theory, and activism. Both carried the same ancient fire.
            </p>
            <p className="research-lead__p research-lead__p--cta">
              The IFA Academy of Polymaths exists to pass it to you.
            </p>
          </div>
        </div>
        <div className="citation-grid">
          {RESEARCH_CITATIONS.map((c) => (
            <div className="citation-card" key={c.authors} style={{ '--cic': c.color }}>
              <p className="citation-card__quote">"{c.quote}"</p>
              <div className="citation-card__attribution">
                <span className="citation-card__authors">{c.authors}</span>
                <span className="citation-card__work">{c.work}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CourseCard({ course, accentColor }) {
  return (
    <div className="course-card" style={{ '--cc': accentColor }}>
      <div className="course-card__head">
        <h4 className="course-card__title" style={{whiteSpace:'pre-line'}}>{course.title}</h4>
        <div className="course-card__meta">
          <span className="course-card__duration">{course.duration}</span>
          <span className="course-card__price">{course.price}</span>
        </div>
      </div>
      <p className="course-card__desc">{course.desc}</p>
      <a href="#enroll" className="course-card__cta">Join Class →</a>
    </div>
  );
}

function CourseCatalog() {
  const [tab, setTab] = useState('kids');

  return (
    <section className="section" id="courses">
      <div className="section__inner">
        <div className="section__header">
          <span className="section__badge">Flexible Learning Path, Same Quality</span>
          <h2 className="section__title">Course Catalogue</h2>
        </div>

        <div className="course-tabs">
          <button
            className={`course-tab${tab === 'kids' ? ' course-tab--active' : ''}`}
            onClick={() => setTab('kids')}
          >
            Kids Program
          </button>
          <button
            className={`course-tab${tab === 'adults' ? ' course-tab--active' : ''}`}
            onClick={() => setTab('adults')}
          >
            Adults Program
          </button>
        </div>

        {tab === 'kids' && (
          <div className="course-tab-content">
            <p className="course-pricing-note">
              Cohort of 3–5 students at <strong>₦10,000/hour</strong> · 4 sessions monthly + 30 min free extension · Concludes with a hands-on project
            </p>
            <div className="course-grid">
              {KIDS_COURSES.map((c) => (
                <CourseCard key={c.title} course={c} accentColor="#f5c518" />
              ))}
            </div>
          </div>
        )}

        {tab === 'adults' && (
          <div className="course-tab-content">
            <p className="course-pricing-note">
              Cohort of 5–10 learners at <strong>₦15,000/hour</strong> · 4 sessions monthly + 30 min free extension · Concludes with a practical project
            </p>
            <div className="course-grid">
              {ADULTS_COURSES.map((c) => (
                <CourseCard key={c.title} course={c} accentColor="#f0920c" />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function LearningModels() {
  return (
    <section className="section section--alt">
      <div className="section__inner">
        <div className="section__header">
          <span className="section__badge">Flexible Learning Path, Same Quality</span>
          <h2 className="section__title">Learning Models That Fit Your Schedule</h2>
        </div>
        <div className="models-grid">
          {LEARNING_MODELS.map((m) => (
            <div className="model-card" key={m.title} style={{ '--mc': m.color }}>
              <div className="model-card__icon">{m.icon}</div>
              {m.badge && <span className="model-card__badge">{m.badge}</span>}
              <h3 className="model-card__title">{m.title}</h3>
              <p className="model-card__desc">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ScholarshipSection() {
  return (
    <section className="section scholarship-section">
      <div className="section__inner">
        <div className="scholarship-inner">
          <span className="section__badge">Scholarships Available</span>
          <h2 className="scholarship__title">Empowering Access Through Merit and Partnerships</h2>
          <p className="scholarship__sub">Financial support to foster equitable participation</p>
          <p className="scholarship__body">
            Scholarships and company sponsorships are open for qualifying candidates — and with every paid enrollment,
            one Nigeria-based student learns for free.
          </p>
          <a href="#enroll" className="btn btn--ghost btn--lg">Apply for Scholarship →</a>
        </div>
      </div>
    </section>
  );
}

function FounderSection() {
  return (
    <section className="section section--alt">
      <div className="section__inner">
        <div className="founder">
          <span className="section__badge">Founder's Message</span>
          <p className="founder__name">Abiodun Adedeji — Founder, CENProject</p>
          <blockquote className="founder__quote">
            <span className="founder__quote-mark">"</span>
            <div className="founder__quote-text">
              <p>I founded this initiative with a simple but transformative belief: every human being — child, youth, or adult — has the potential to become a creator, a thinker, and a polymath capable of shaping the world in meaningful ways. What we often lack is a learning system that nurtures curiosity, builds confidence, and connects knowledge across disciplines.</p>
              <p>At CENProject, we teach STEM/STEAM as a unified language of nature. Our holistic model shows learners how mathematics weaves the fabric of reality, how information flows through every system, and how creativity drives invention. This approach empowers both children and adults to think like polymaths — people who can see patterns across fields, connect ideas, and innovate beyond the limits of traditional specialization.</p>
              <p>We work with children aged 8–13, giving them the foundational tools to explore science and creativity with confidence. But our mission extends further. We also train adults and professionals from all backgrounds — artists, mathematicians, doctors, scientists, engineers, writers, educators — to cultivate polymathic thinking within their existing professions.</p>
              <p>Because in the modern world, every field can become a polymathic field.</p>
              <p>There are polymathic artists; polymathic mathematicians; polymathic doctors; polymathic technologists/engineers; polymathic scientists; polymathic writers; polymathic leaders — all using integrative thinking to expand what is possible.</p>
              <p>Whether you are a child discovering science for the first time or a professional seeking to expand your mind, we invite you to join us. Together, we are building a future where knowledge is unified, creativity is limitless, and polymaths lead the way.</p>
            </div>
          </blockquote>
          <div className="founder__ctas">
            <a href="#enroll" className="btn btn--primary btn--lg">Apply Now</a>
            <a href="IFA-Academy-of-Polymaths-Syllabus.pdf" download="IFA-Academy-of-Polymaths-Syllabus.pdf" className="btn btn--ghost btn--lg">Download Brochure</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function EnrollSection() {
  const INIT = {
    fullName: '', dob: '', course: '', gender: '', plan: '',
    country: '', email: '', phone: '', consent: false,
  };
  const [form, setForm] = useState(INIT);
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section className="section enroll-section" id="enroll">
      <div className="section__inner">
        <div className="section__header">
          <h2 className="section__title">Enroll in the IFA Academy of Polymaths</h2>
          <p className="section__lead">Begin your journey to mastering ancient intelligence for modern innovation.</p>
        </div>

        {submitted ? (
          <div className="enroll-success">
            <div className="enroll-success__icon">✓</div>
            <h3 className="enroll-success__title">Enrollment Received!</h3>
            <p className="enroll-success__msg">
              Thank you! Your enrollment has been received. We'll contact you via WhatsApp/Email within 48 hours.
            </p>
            <p className="enroll-success__contact">
              WhatsApp: <a href="https://wa.me/2347082862897">+2347082862897</a>
            </p>
            <button className="btn btn--ghost" onClick={() => { setForm(INIT); setSubmitted(false); }}>
              Submit Another
            </button>
          </div>
        ) : (
          <form className="enroll-form" onSubmit={handleSubmit}>
            <div className="enroll-form__grid">
              <div className="form-group">
                <label className="form-label">Full Name <span className="form-req">*</span></label>
                <input className="form-input" type="text" name="fullName" value={form.fullName} onChange={handleChange} placeholder="Your full name" required />
              </div>

              <div className="form-group">
                <label className="form-label">Date of Birth <span className="form-req">*</span></label>
                <input className="form-input" type="date" name="dob" value={form.dob} onChange={handleChange} required />
              </div>

              <div className="form-group form-group--full">
                <label className="form-label">Preferred Course <span className="form-req">*</span></label>
                <select className="form-input" name="course" value={form.course} onChange={handleChange} required>
                  <option value="">Select a course...</option>
                  {ALL_COURSES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Gender</label>
                <select className="form-input" name="gender" value={form.gender} onChange={handleChange}>
                  <option value="">Select...</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Payment Plan</label>
                <select className="form-input" name="plan" value={form.plan} onChange={handleChange}>
                  <option value="">Select plan...</option>
                  <option value="kids-monthly">Kids Monthly — ₦40,000</option>
                  <option value="kids-full">Kids Full 3-Months — ₦110,000</option>
                  <option value="adults-monthly">Adults Monthly — ₦60,000</option>
                  <option value="adults-full">Adults Full 3-Months — ₦170,000</option>
                </select>
              </div>

              <div className="form-group form-group--full">
                <label className="form-label">Nationality / Country of Residence <span className="form-req">*</span></label>
                <input className="form-input" type="text" name="country" value={form.country} onChange={handleChange} placeholder="e.g. Nigeria" required />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address <span className="form-req">*</span></label>
                <input className="form-input" type="email" name="email" value={form.email} onChange={handleChange} placeholder="your@email.com" required />
              </div>

              <div className="form-group">
                <label className="form-label">Phone / WhatsApp Number <span className="form-req">*</span></label>
                <input className="form-input" type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+234..." required />
              </div>

              <div className="form-group form-group--full">
                <label className="form-label form-label--check">
                  <input type="checkbox" name="consent" checked={form.consent} onChange={handleChange} required />
                  <span>Yes, I agree with <a href="https://cenproject.org/ifa-coding-academy-ifacodemy-enrollment-agreement-and-terms-of-learning/" target="_blank" rel="noopener noreferrer">the privacy policy and terms of enrollment</a></span>
                </label>
              </div>
            </div>

            <div className="enroll-form__footer">
              <button type="submit" className="btn btn--primary btn--lg">Enroll Now →</button>
              <p className="enroll-form__contact">
                Questions? WhatsApp us: <a href="https://wa.me/2347082862897">+2347082862897</a>
              </p>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <span className="site-footer__name">IFA Academy of Polymaths · Ifacodemy</span>
          <span className="site-footer__tagline">Ancient Intelligence. Modern Polymaths. Infinite Possibility.</span>
        </div>
        <nav className="site-footer__nav">
          <a href="../">IfaLMS</a>
          <a href="../../">IFA Internet</a>
          <a href="https://cenproject.org" target="_blank" rel="noopener noreferrer">CENProject</a>
        </nav>
        <div className="site-footer__contact">
          <a href="https://wa.me/2347082862897">WhatsApp: +2347082862897</a>
        </div>
        <p className="site-footer__copy">© 2026 CENProject. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

/* ── APP ROOT ──────────────────────────────────────────────────────────────── */

function App() {
  return (
    <div className="app">
      <SiteHeader />
      <main>
        <HeroSection />
        <ManifestoSection />
        <StatsBar />
        <AudienceSection />
        <ProblemSection />
        <PolymathSection />
        <BelongSection />
        <WhySection />
        <ApplicationsSection />
        <RealWorldSection />
        <ResearchSection />
        <CourseCatalog />
        <LearningModels />
        <ScholarshipSection />
        <FounderSection />
        <EnrollSection />
      </main>
      <SiteFooter />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
