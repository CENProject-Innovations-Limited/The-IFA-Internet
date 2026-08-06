/* ─────────────────────────────────────────────────────────────────────────────
   IfaLearn — The Ifa Digital Learning Ecosystem
   The IFA Internet · CENProject
   toe.cenproject.org/the-ifa-learn/
───────────────────────────────────────────────────────────────────────────── */

const { useState } = React;

// ─── DATA ────────────────────────────────────────────────────────────────────

const ALIASES = [
  { label: 'Ifa Digital Learning Ecosystem',                color: '#14b8d4' },
  { label: 'Ifa Academy of Polymaths — Ifacodemy',          color: '#7c3aed' },
  { label: 'Indigenous-African STEAM Learning Platform',    color: '#00c87c' },
  { label: 'Ifa Educational Technology Platform',           color: '#f0920c' },
  { label: 'Ifa Knowledge-Based Learning System',           color: '#f5c518' },
];

const STATS = [
  { value: '256',   label: 'Odu Ifa',         sub: 'The Axiomatic Knowledge Matrix'   },
  { value: '9+',    label: 'Core Platforms',  sub: 'Integrated Learning Technologies' },
  { value: 'STEAM', label: 'Education Model', sub: 'Holistic · Bilingual · Gamified'  },
  { value: 'Ifa',   label: 'Dual',            sub: 'The Dual of OrisaLearn'           },
];

const FEATURES = [
  {
    sym: '⊞',
    title: 'IfaLMS',
    sub: 'Ifa Learning Management System',
    color: '#14b8d4',
    href: '/ifa-lms/',
    body: 'The core learning infrastructure of IfaLearn — a full-featured digital platform for delivering, tracking, and managing Ifa-centered education. IfaLMS provides structured courses, assessments, progress tracking, and personalized learning paths grounded in the 256 Odu Ifa curriculum.',
  },
  {
    sym: '◈',
    title: 'Ifa Games',
    sub: 'Gamified Learning Through Odu',
    color: '#f0920c',
    href: 'https://www.playifagames.org/',
    body: 'Ifa Games brings the 256 Odu Ifa to life through interactive, gamified learning experiences. From knowledge challenges and Odu matching to immersive role-play simulations, Ifa Games turns deep indigenous learning into joyful, engaging gameplay.',
  },
  {
    sym: 'Ψ',
    title: 'Ifa AI',
    sub: 'Ifa Artificial Intelligence Learning',
    color: '#7c3aed',
    href: '/ifai/',
    body: 'Powered by Ifa Intelligence (IfaI), the AI layer of IfaLearn personalizes every learner\'s journey — adapting content, pacing, and assessments using the Ifa Knowledge System as its epistemological foundation. Ifa AI brings the wisdom of the 256 Odu into intelligent, adaptive education.',
  },
  {
    sym: '⬡',
    title: 'Ifa Social Learning',
    sub: 'Collaborative Knowledge Exchange',
    color: '#ec4899',
    body: 'Ifa Social Learning integrates peer learning, mentorship, and community knowledge exchange into the digital ecosystem. Learners connect across IfaHubs, collaborative study groups, and shared knowledge spaces — applying the Ifa principle that wisdom grows through exchange.',
  },
  {
    sym: '◎',
    title: 'Ifa Analytics',
    sub: 'Learning Intelligence & Insight',
    color: '#00c87c',
    href: '/ifa-analysis/',
    body: 'Ifa Analytics provides deep learning intelligence — tracking progress, identifying patterns, and generating insights across the IfaLearn ecosystem. Grounded in the 256 Odu as the analytical matrix, Ifa Analytics empowers educators and learners with data-driven wisdom.',
  },
  {
    sym: '⊛',
    title: 'Ifa Virtual Labs',
    sub: 'IfaLabs — Digital Experimentation',
    color: '#f5c518',
    href: '/ifa-labs/',
    body: 'IfaLabs is the virtual laboratory platform of IfaLearn — providing hands-on digital experimentation across all STEAM disciplines, including Ifa Physics, Ifa Chemistry, Ifa Computing, and Ifa Mathematics. Learners explore and test knowledge through guided virtual experiments rooted in Ifa principles.',
  },
  {
    sym: '⟳',
    title: 'Ifa Communities',
    sub: 'Ifa Networks & IfaHubs',
    color: '#14b8d4',
    body: 'Ifa Communities are the living social layer of IfaLearn — structured networks and hubs where learners, teachers, elders, and scholars gather for knowledge exchange, mentorship, and collaborative inquiry. IfaHubs serve as local and global nodes in the Ifa learning network.',
  },
  {
    sym: '∇',
    title: 'Ifa Creator Tools',
    sub: 'Build & Share Ifa Knowledge',
    color: '#f0920c',
    body: 'Ifa Creator Tools empower educators, scholars, and learners to design, publish, and share original courses, simulations, media, and knowledge resources — expanding the IfaLearn content ecosystem using the Odu Ifa as the authoring framework and knowledge scaffold.',
  },
  {
    sym: '☰',
    title: 'Ifa Mobile Apps',
    sub: 'Learning Anywhere, Anytime',
    color: '#7c3aed',
    body: 'Ifa Mobile Apps extend the full IfaLearn ecosystem to smartphones and tablets — bringing Ifa-centered STEAM education, gamified learning, AI tutoring, and community access to learners wherever they are. Mobile-first and multilingual, Ifa Mobile Apps serve both connected and low-connectivity environments.',
  },
];

const MODEL_NAMES = [
  { label: 'Ifa Model of Education',                color: '#14b8d4', desc: 'The foundational name for the Ifa-centered approach to holistic learning and knowledge development.' },
  { label: 'Ifa Holistic Education Model',          color: '#7c3aed', desc: 'Emphasizes the whole-person formation aspect — intellectual, spiritual, physical, creative, and communal.' },
  { label: 'ToE Education',                          color: '#00c87c', desc: 'The Theory of Everything Education. Positions the model within Science, Technology, Engineering, Arts, and Mathematics — enriched by indigenous knowledge.' },
  { label: 'Ifa Polymathic Education',              color: '#f0920c', desc: 'Focuses on the Ifacodemy goal of forming deep, multi-disciplinary thinkers across all fields of knowledge.' },
  { label: 'Ifa Bilingual Learning System',         color: '#f5c518', desc: 'Highlights the bilingual instruction dimension — Yoruba and global language integration in every learning context.' },
  { label: 'Indigenous-African Learning Ecosystem', color: '#ec4899', desc: 'Situates the model within African indigenous epistemology and knowledge sovereignty frameworks.' },
  { label: 'Ifa Digital Pedagogy',                  color: '#14b8d4', desc: 'The digital-first, technology-powered expression of the Ifa educational philosophy on the IFA Internet.' },
  { label: 'OrisaLearn (the Dual)',                 color: '#7c3aed', desc: "Learning needs in alignment with one\u2019s Or\u00ed (personal divinity). The complementary system \u2014 IfaLearn and OrisaLearn together form the complete Ifa-Orisa Learning Ecosystem." },
];

const PILLARS = [
  {
    num: '01',
    sym: '◎',
    title: 'Holistic Education',
    color: '#14b8d4',
    body: 'IfaLearn forms the whole person — intellectual, spiritual, emotional, physical, artistic, and communal dimensions of being. Grounded in the 256 Odu Ifa, every course of study cultivates both knowledge and character, embodying the Yoruba ideal of Ọmọlúwàbí — one who is complete in wisdom and virtue.',
  },
  {
    num: '02',
    sym: '◈',
    title: 'Gamified Learning',
    color: '#f0920c',
    body: 'The Ifa tradition is inherently dynamic and interactive. IfaLearn applies gamification throughout — from Odu knowledge challenges and interactive simulations to reward structures and learning quests — making deep indigenous and STEAM learning intrinsically motivating and joyful.',
  },
  {
    num: '03',
    sym: '⟳',
    title: 'Bilingual Instruction',
    color: '#00c87c',
    body: 'IfaLearn teaches in both Yoruba and global languages (English, etc.), centering an African language as the primary medium of indigenous knowledge. Bilingual instruction preserves linguistic heritage, sharpens cognitive flexibility, and ensures Ifa knowledge is transmitted in its most authentic form.',
  },
  {
    num: '04',
    sym: 'Ψ',
    title: 'AI-Powered Personalization',
    color: '#7c3aed',
    body: 'Ifa AI adapts the learning journey to each learner — analyzing progress, identifying knowledge gaps, and recommending next steps rooted in the 256 Odu Ifa as the epistemological map. Every learner receives a path uniquely shaped by their own knowledge state and learning profile.',
  },
  {
    num: '05',
    sym: '⊛',
    title: 'Odu Ifa Curriculum',
    color: '#f5c518',
    body: 'The 256 Odu Ifa serves as the axiomatic curriculum matrix of IfaLearn — organizing all fields of knowledge, skills, and character formation around the 256 Chapters of Reality. Every subject, from mathematics to philosophy, is mapped to the universal knowledge structure of the Odu.',
  },
  {
    num: '06',
    sym: '⬡',
    title: 'Community & Network Learning',
    color: '#ec4899',
    body: 'Learning in the Ifa tradition is communal. IfaLearn builds networked learning communities through IfaHubs — where learners, mentors, elders, and scholars engage in collaborative inquiry, shared practice, and knowledge exchange across the full IFA Internet ecosystem.',
  },
];


// ─── LEARNING ORB VISUAL ──────────────────────────────────────────────────────

function LearningOrb() {
  return (
    <div className="learning-orb" aria-hidden="true">
      <div className="learning-orb__ring learning-orb__ring--3" />
      <div className="learning-orb__ring learning-orb__ring--2" />
      <div className="learning-orb__ring learning-orb__ring--1" />
      <div className="learning-orb__arc learning-orb__arc--1" />
      <div className="learning-orb__arc learning-orb__arc--2" />
      <div className="learning-orb__arc learning-orb__arc--3" />
      <div className="learning-orb__node learning-orb__node--1" />
      <div className="learning-orb__node learning-orb__node--2" />
      <div className="learning-orb__node learning-orb__node--3" />
      <div className="learning-orb__node learning-orb__node--4" />
      <div className="learning-orb__node learning-orb__node--5" />
      <div className="learning-orb__core">
        <div className="learning-orb__core-glow" />
        <span className="learning-orb__char">Ifa</span>
        <span className="learning-orb__label">Learn</span>
      </div>
    </div>
  );
}

// ─── HEADER ──────────────────────────────────────────────────────────────────

function Header() {
  return (
    <header className="header">
      <div className="header__inner">
        <a href="../" className="header__brand" target="_blank" rel="noopener noreferrer">
          <img src="../src/assets/itoe_logo.png" alt="iTOE" className="header__logo" />
          <div>
            <div className="header__site">The IFA Internet</div>
            <div className="header__name">IfaLearn</div>
          </div>
        </a>
        <nav className="header__nav">
          <a className="nav-link" href="#about">About</a>
          <a className="nav-link" href="#model">Model</a>
          <a className="nav-link" href="#oddn">ODDNs</a>
          <a className="nav-link" href="#features">Platforms</a>
          <a className="nav-link" href="#ifacodemy">Ifacodemy</a>
          <a className="nav-link" href="#isise">Ìṣísẹ̀ Ifá</a>
          <a className="nav-link nav-link--cta"
             href="https://toe.cenproject.org/the-ifa-learn/"
             target="_blank" rel="noopener noreferrer">IfaLearn on TOE</a>
        </nav>
      </div>
    </header>
  );
}

// ─── MOBILE BAR ──────────────────────────────────────────────────────────────

function MobileBar() {
  const items = [
    { sym: '⌂',  label: 'Home',      href: '../' },
    { sym: '◎',  label: 'About',     href: '#about' },
    { sym: '⊞',  label: 'Model',     href: '#model' },
    { sym: 'Ψ',  label: 'ODDNs',     href: '#oddn' },
    { sym: '◈',  label: 'Platforms', href: '#features' },
    { sym: '⬡',  label: 'Ifacodemy', href: '#ifacodemy' },
    { sym: '∿',  label: 'Ìṣísẹ̀',   href: '#isise' },
  ];
  return (
    <nav className="mobile-bar" aria-label="Mobile navigation">
      <div className="mobile-bar__row">
        {items.map(it => (
          <a key={it.label} className="mobile-bar__item" href={it.href}
             target={it.href.startsWith('#') ? undefined : '_blank'}
             rel={it.href.startsWith('#') ? undefined : 'noopener noreferrer'}>
            <span className="mobile-bar__sym">{it.sym}</span>
            <span>{it.label}</span>
          </a>
        ))}
      </div>
    </nav>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="hero">
      <div className="hero__bg">
        <div className="hero__grid" />
        <div className="hero__orb hero__orb--a" />
        <div className="hero__orb hero__orb--b" />
        <div className="hero__orb hero__orb--c" />
        <div className="hero__scanline" />
      </div>
      <div className="container hero__layout">
        <div className="hero__left">
          <div className="hero__badge">
            <span className="hero__badge-dot" />
            The IFA Internet &mdash; IfaLearn Platform
          </div>

          <h1 className="hero__title">
            <span className="hero__title-main">IfaLearn</span>
            <span className="hero__title-sub">The Ifa Digital Learning Ecosystem</span>
          </h1>

          <p className="hero__tagline">
            Ifa Academy of Polymaths &mdash; Indigenous-African STEAM Education
          </p>

          <p className="hero__desc">
            IfaLearn is the <strong>Digital Learning Ecosystem of the IFA Internet</strong> and
            the <strong>Ifa Academy of Polymaths (Ifacodemy)</strong> — an Indigenous-African
            STEAM Learning Ecosystem powered by the Ifa Knowledge System, combining holistic
            education, mathematical methods of learning, gamified learning, bilingual instruction, and modern digital technologies.
            Its Dual is <strong>OrisaLearn</strong>.
          </p>

          <div className="hero__aliases">
            {ALIASES.map((a, i) => (
              <span key={i} className="hero__alias" style={{ '--alias-color': a.color }}>
                {a.label}
              </span>
            ))}
          </div>

          <div className="hero__ctas">
            <a href="#about" className="btn btn--primary">Explore IfaLearn</a>
            <a href="#features" className="btn btn--ghost">The Platforms</a>
          </div>
        </div>

        <div className="hero__right" aria-hidden="true">
          <LearningOrb />
        </div>
      </div>

      <div className="hero__stats-bar">
        <div className="container">
          <div className="hero__stats">
            {STATS.map((s, i) => (
              <div key={i} className="hero__stat">
                <div className="hero__stat-value">{s.value}</div>
                <div className="hero__stat-label">{s.label}</div>
                <div className="hero__stat-sub">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── ABOUT SECTION ────────────────────────────────────────────────────────────

function AboutSection() {
  return (
    <section className="section" id="about">
      <div className="container">
        <div className="def-grid">
          <div className="def-text">
            <div className="section__header">
              <span className="section__eyebrow section__eyebrow--teal">What is IfaLearn</span>
              <h2 className="section__title">
                The <span className="accent--teal">Digital Learning Ecosystem</span> of the IFA Internet
              </h2>
              <p className="section__subtitle">
                IfaLearn is an Ifa-centered learning system and educational technology platform
                for holistic STEAM education — bringing together digital tools, indigenous knowledge,
                and community learning to form polymaths rooted in the wisdom of the 256 Odu Ifa.
              </p>
            </div>

            <div className="def-blocks">
              <div className="def-block">
                <div className="def-block__icon">Ifa</div>
                <div className="def-block__content">
                  <div className="def-block__label">Ifa Knowledge System</div>
                  <p className="def-block__body">
                    The Ifa Knowledge System — organized around the 256 Odu Ifa — is the epistemic
                    foundation of IfaLearn. Every curriculum, course, and learning path is grounded
                    in the 256 Chapters of Reality as the universal knowledge matrix.
                  </p>
                </div>
              </div>
              <div className="def-block">
                <div className="def-block__icon">⊕</div>
                <div className="def-block__content">
                  <div className="def-block__label">Ifa Model of Education</div>
                  <p className="def-block__body">
                    The Ifa Model of Education is a holistic, multi-dimensional approach to learning
                    that mathematically integrates indigenous African wisdom, all knowledge fields (STEAM disciplines),
                    gamification, bilingual instruction, and AI-powered personalization into a unified pedagogical Framework.
                  </p>
                </div>
              </div>
              <div className="def-block">
                <div className="def-block__icon">⬡</div>
                <div className="def-block__content">
                  <div className="def-block__label">IFA Internet Integration</div>
                  <p className="def-block__body">
                    IfaLearn is deeply integrated with the full IFA Internet ecosystem — drawing on
                    IfaLang, Ifa Computing, Ifa Mechanics, Ifa Analytics, and all platforms to deliver
                    an interconnected, cross-disciplinary learning experience.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="def-visual">
            <div className="ifalear-symbol">
              <div className="ifalear-symbol__ring ifalear-symbol__ring--outer" />
              <div className="ifalear-symbol__ring ifalear-symbol__ring--mid" />
              <div className="ifalear-symbol__arc ifalear-symbol__arc--1" />
              <div className="ifalear-symbol__arc ifalear-symbol__arc--2" />
              <div className="ifalear-symbol__core">
                <span className="ifalear-symbol__char">Ifa</span>
                <span className="ifalear-symbol__sub-char">Learn</span>
              </div>
              <div className="ifalear-symbol__label">The Digital Learning Ecosystem</div>
              <div className="ifalear-symbol__sub">Ifacodemy · STEAM · 256 Odu</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── IFA MODEL OF EDUCATION — ALTERNATIVE NAMES ──────────────────────────────

function ModelNamesSection() {
  return (
    <section className="section section--alt" id="model">
      <div className="container">
        <div className="section__header section__header--center">
          <span className="section__eyebrow section__eyebrow--violet">Ifa Model of Education</span>
          <h2 className="section__title">Alternative Names &amp; Dimensions</h2>
          <p className="section__subtitle">
            The Ifa Model of Education is known by many names — each capturing a distinct dimension
            of its holistic, multi-disciplinary, and technology-powered approach to learning.
          </p>
        </div>

        <div className="model-names-grid">
          {MODEL_NAMES.map((m, i) => (
            <div key={i} className="model-name-card" style={{ '--mn-color': m.color }}>
              <div className="model-name-card__bar" />
              <div className="model-name-card__label">{m.label}</div>
              <p className="model-name-card__desc">{m.desc}</p>
              <div className="model-name-card__glow" />
            </div>
          ))}
        </div>

        <div className="model-pillars-wrap">
          <div className="section__header section__header--center" style={{ marginTop: '80px' }}>
            <span className="section__eyebrow section__eyebrow--teal">Core Principles</span>
            <h2 className="section__title">Pillars of the Ifa Model of Education</h2>
          </div>
          <div className="pillars-grid">
            {PILLARS.map((p, i) => (
              <div key={i} className="pillar-card" style={{ '--pt-color': p.color }}>
                <div className="pillar-card__header">
                  <span className="pillar-card__sym">{p.sym}</span>
                  <span className="pillar-card__num">{p.num}</span>
                </div>
                <h3 className="pillar-card__title">{p.title}</h3>
                <p className="pillar-card__body">{p.body}</p>
                <div className="pillar-card__glow" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── ODDN SECTION ────────────────────────────────────────────────────────────

function OddnSection() {
  return (
    <section className="section section--dark" id="oddn">
      <div className="container">

        {/* ── Part 1: Orunmila Deep Learning Principle ── */}
        <div className="section__header section__header--center">
          <span className="section__eyebrow section__eyebrow--violet">Orunmila Deep Learning</span>
          <h2 className="section__title">
            Orunmila Deep Learning Principle &amp;{' '}
            <span className="accent--violet">Networks</span>
          </h2>
          <p className="section__subtitle">
            The Orunmila Deep Learning Principle establishes that true knowledge emerges from
            the structured interaction between the <strong>inner universe</strong> and the
            <strong> outer universe</strong> — bridged by the Principle of{' '}
            <strong>Fọ́ránòwúkanṣoṣo</strong>.
          </p>
        </div>

        <div className="oddn-grid">
          <div className="oddn-card oddn-card--inner">
            <div className="oddn-card__sym">☽</div>
            <h3 className="oddn-card__title">Inner Universe</h3>
            <div className="oddn-card__sub">Consciousness · Mind · Spirit</div>
            <p className="oddn-card__body">
              The inner universe is the learner's interior world — the realm of consciousness,
              intuition, memory, spiritual knowing, and the seat of Ìwà (character). In the
              Orunmila Deep Learning Principle, the inner universe is not a passive receiver
              of knowledge but an active Field — a living Network through which Ifa wisdom
              is received, processed, and transformed into personal understanding.
              Orunmila, as Ẹ̀lẹ́ẹrí Ìpín — Witness to Creation — teaches that all knowledge
              already resides within; deep learning is the act of remembering.
            </p>
          </div>

          <div className="oddn-bridge">
            <div className="oddn-bridge__line" />
            <div className="oddn-bridge__node">
              <div className="oddn-bridge__sym">Fọ́rán</div>
              <div className="oddn-bridge__label">IfaBridge</div>
            </div>
            <div className="oddn-bridge__line" />
          </div>

          <div className="oddn-card oddn-card--outer">
            <div className="oddn-card__sym">☀</div>
            <h3 className="oddn-card__title">Outer Universe</h3>
            <div className="oddn-card__sub">Nature · Society · Cosmos</div>
            <p className="oddn-card__body">
              The outer universe is the external world of nature, community, technology,
              history, and the cosmos — the theatre in which knowledge is tested, applied,
              and validated. The 256 Odu Ifa map the outer universe as a structured field
              of reality: every force, relationship, and phenomenon in the external world
              has its axiomatic address within the Odu matrix. Deep learning requires
              continuous dialogue between what one knows within and what one encounters without.
            </p>
          </div>
        </div>

        {/* Fọ́ránòwúkanṣoṣo + Ìṣísẹ̀ */}
        <div className="oddn-concepts">
          <div className="oddn-concept">
            <div className="oddn-concept__icon">
              <span>Fọ́rán</span>
            </div>
            <div className="oddn-concept__content">
              <h4 className="oddn-concept__title">
                Fọ́ránòwúkanṣoṣo — IfaString · IfaLink · IfaBridge
              </h4>
              <p className="oddn-concept__body">
                <strong>Fọ́ránòwúkanṣoṣo</strong> (literally: "the String that links all things into One")
                is the fundamental connective Principle of Orunmila Deep Learning Networks (ODDNs) —
                the IfaString, IfaLink, or IfaBridge that ties the inner universe to the outer universe,
                one field of knowledge to another, one learner to the broader network.
                In ODDNs, Fọ́ránòwúkanṣoṣo operates as the underlying Architecture: the invisible
                Thread through which every lesson, concept, and experience is connected to every other —
                making all learning holistic, mathematical, relational, and cumulative rather than fragmented.
                It is the reason that in the Ifa Knowledge System, nothing is learned in isolation.
              </p>
            </div>
          </div>

          <div className="oddn-concept">
            <div className="oddn-concept__icon">
              <span>Iṣẹ́ Àmúṣe</span>
            </div>
            <div className="oddn-concept__content">
              <h4 className="oddn-concept__title">Iṣẹ́ Àmúṣe — The Work of Deep Learning</h4>
              <p className="oddn-concept__body">
                <strong>Iṣẹ́ Àmúṣe</strong> is the operational dimension of Orunmila Deep Learning —
                the sacred work, effort, and practice through which deep learning is actualized.
                It is not passive study but active engagement: the sustained, purposeful application
                of knowledge across both the inner and outer universes. In ODDNs, Iṣẹ́ Àmúṣe manifests
                as problem-based inquiry, creative synthesis, community contribution, and ritual
                attention to the learning process itself. True deep learning is always work — Iṣẹ́ Àmúṣe —
                and that work is what transforms information into wisdom, and wisdom into Ìwà (character).
              </p>
            </div>
          </div>
        </div>

        {/* ODDN diagram */}
        <div className="oddn-network">
          <div className="oddn-network__label">Orunmila Deep Learning Networks (ODDN)</div>
          <div className="oddn-network__nodes">
            {[
              { sym: '☽', label: 'Inner Universe',    color: '#7c3aed' },
              { sym: 'Fọ́rán', label: 'IfaBridge',   color: '#14b8d4' },
              { sym: '256',  label: 'Odu Matrix',      color: '#f5c518' },
              { sym: 'Iṣẹ́ Àmúṣe', label: 'Deep Work',   color: '#00c87c' },
              { sym: '☀',   label: 'Outer Universe',   color: '#f0920c' },
              { sym: 'Ifa', label: 'Mathematics',       color: '#ec4899' },
            ].map((n, i) => (
              <div key={i} className="oddn-net-node" style={{ '--nn-color': n.color }}>
                <div className="oddn-net-node__sym">{n.sym}</div>
                <div className="oddn-net-node__label">{n.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Part 2: IFA Mathematics on ODDNs ── */}
        <div className="oddn-math">
          <div className="oddn-math__header">
            <span className="section__eyebrow section__eyebrow--teal">Universal Language</span>
            <h2 className="section__title">
              IFA Mathematics — the Universal Language of All Kinds of Knowledge on ODDNs
            </h2>
            <p className="section__subtitle">
              On Orunmila Deep Learning Networks, IFA Mathematics serves as the universal
              language — the axiomatic system through which all fields of knowledge
              are expressed, connected, and understood.
            </p>
          </div>
          <div className="oddn-math-cards">
            {[
              {
                sym: '∀',
                color: '#14b8d4',
                title: 'Universal Axioms',
                body: 'IFA Mathematics provides the 256 Odu Ifa as 256 universal axioms — the Laws of Knowledge that govern all fields of reality. On ODDNs, every course, every experiment, and every insight can be traced back to one or more of these axiomatic laws, creating a unified knowledge architecture that spans all disciplines.',
              },
              {
                sym: '⟷',
                color: '#7c3aed',
                title: 'Cross-Domain Translation',
                body: 'IFA Mathematics on ODDNs acts as the translation layer between disciplines — allowing a principle discovered in Ifa Physics to be expressed in the language of Ifa Economics, or an insight from Ifa Philosophy to be formalized in Ifa Computing. The same mathematical grammar underlies every field of knowledge.',
              },
              {
                sym: '∞',
                color: '#00c87c',
                title: 'IfaInfinity & IfaNinfinity',
                body: 'The IFA Mathematics Binary Principle, IfaInfinity-IfaNinfinity, encompassing both infinite possibilities and infinite impossibilities, gives ODDNs their depth. Learners are trained to think not just in finite models but in the full infinite-dimensional space of knowledge that the Odu Ifa maps.',
              },
              {
                sym: '⊕',
                color: '#f5c518',
                title: 'Amulu — Knowledge Composition',
                body: 'The Amulu principle of IFA Mathematics (knowledge composition) means that on ODDNs, learning is always additive and integrative — every new field composed with prior knowledge creates a richer whole. Deep learning networks grow by Amulu, not mere accumulation.',
              },
            ].map((c, i) => (
              <div key={i} className="oddn-math-card" style={{ '--om-color': c.color }}>
                <div className="oddn-math-card__sym">{c.sym}</div>
                <h4 className="oddn-math-card__title">{c.title}</h4>
                <p className="oddn-math-card__body">{c.body}</p>
                <div className="oddn-math-card__glow" />
              </div>
            ))}
          </div>
        </div>

        {/* ── Part 3: Ifa Interdisciplinary Approach ── */}
        <div className="oddn-interdisciplinary">

          <div className="oddn-interdis__header">
            <span className="section__eyebrow section__eyebrow--amber">Ifa Interdisciplinary Approach</span>
            <h2 className="section__title">
              Breaking Silos — Unifying All Knowledge Under{' '}
              <span className="accent--amber">IFA Mathematics</span>
            </h2>
          </div>

          <div className="oddn-quote">
            <div className="oddn-quote__mark">&ldquo;</div>
            <blockquote className="oddn-quote__text">
              Ọ̀sá wòó; Ìwòrì wòó; òún a bá jìjọ wo, gígùn níì gún
            </blockquote>
            <div className="oddn-quote__attr">
              — Odù Ifá Ọ̀sá Ìwòrì on Interdisciplinary Approach to Learning
            </div>
          </div>

          <div className="oddn-interdis-blocks">
            {[
              { icon: '⊗', color: '#f0920c', title: 'Breaking Down Silos',
                body: 'The Ifa Interdisciplinary Approach dismantles the artificial walls between academic disciplines. Just as Orunmila sees all of creation as one interconnected system — mapped by the 256 Odu Ifa — IfaLearn organizes all fields of knowledge under a single unifying framework: IFA Mathematics. A student of Ifa Physics is simultaneously learning Ifa Philosophy; a student of Ifa Computing is simultaneously learning Ifa Language. Knowledge is never siloed — it is always part of the larger whole.' },
              { icon: '⚛', color: '#14b8d4', title: 'Akin to the Standard Model of Particle Physics',
                body: 'Just as Physics unites the fundamental forces of nature under the Standard Model of Particle Physics — a single theoretical framework that explains electromagnetic, weak, and strong interactions through a unified mathematical language — IFA Mathematics unites all fields of knowledge under the 256 Odu Ifa. Every discipline from Economics to Biology, from Engineering to Ethics, finds its axiomatic grounding in the Odu — and insights from one field directly reinforce understanding in another, because they share the same underlying mathematical grammar.' },
              { icon: '◈', color: '#00c87c', title: 'Problem-Based Learning (PBL) at Continental & Planetary Scale',
                body: 'IfaLearn adopts a Problem-Based Learning (PBL) approach — designing courses not around abstract syllabi but around real problems facing a continent or a planet. Courses are built to tackle specific challenges: food security in Africa, climate resilience, linguistic preservation, digital sovereignty, public health infrastructure. Learners do not merely study knowledge — they deploy it. Iṣẹ́ Àmúṣe (deep work) is applied to real-world problems, forming the next generation of Ifa Polymaths who are problem-solvers of planetary consequence.' },
              { icon: '⬡', color: '#7c3aed', title: 'Individual Interdisciplinary Pathways',
                body: 'IfaLearn encourages every learner to forge their own connections across domains — arts, sciences, ethics, technology, language, philosophy, and beyond — designing individual learning pathways that reflect both their personal interests and the societal needs of their community. Guided by Ifa AI and the Ifacodemy polymath framework, each learner\'s path is unique, dynamic, and purposefully cross-disciplinary. No two polymaths follow the same road through the 256 Odu — yet all roads lead to the same unified knowledge.' },
            ].map((b, i) => (
              <div key={i} className="oddn-interdis-card" style={{ '--idc-color': b.color }}>
                <div className="oddn-interdis-card__num">0{i + 1}</div>
                <div className="oddn-interdis-card__icon">{b.icon}</div>
                <h4 className="oddn-interdis-card__title">{b.title}</h4>
                <p className="oddn-interdis-card__body">{b.body}</p>
                <div className="oddn-interdis-card__glow" />
              </div>
            ))}
          </div>

          {/* ── Knowledge images — full-width showcase ── */}
          <div className="oddn-knowledge-showcase">
            <div className="oddn-knowledge-panel oddn-knowledge-panel--a">
              <div className="oddn-knowledge-panel__frame">
                <img src="./src/IfaKnowledge.png" alt="Ifa Knowledge" className="oddn-knowledge-panel__img" />
              </div>
            </div>
            <div className="oddn-knowledge-panel oddn-knowledge-panel--b">
              <div className="oddn-knowledge-panel__frame">
                <img src="./src/IfaKnowledge1.png" alt="Ifa Knowledge Management and Its Dual" className="oddn-knowledge-panel__img" />
              </div>
              <p className="oddn-knowledge-panel__caption">
                <span className="oddn-knowledge-panel__caption-label">Figure</span>
                Ifa Knowledge Management and Its Dual, Orisa Knowledge Management: Ifa Knowledge Management entails using the tools of Òwe, Àlọ́, Oríkì, and others to conduct the systematic process of identifying, capturing, organizing, preserving/storing, sharing, and applying indigenous knowledge.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

// ─── FEATURES SECTION ─────────────────────────────────────────────────────────

function FeaturesSection() {
  return (
    <section className="section section--dark" id="features">
      <div className="container">
        <div className="section__header section__header--center">
          <span className="section__eyebrow section__eyebrow--teal">The IfaLearn Ecosystem</span>
          <h2 className="section__title">Integrated Learning Platforms</h2>
          <p className="section__subtitle">
            IfaLearn combines a wide range of interconnected digital platforms into a unified learning Ecosystem —
            each powered by the Ifa Knowledge System and designed for holistic, STEAM, and lifelong learning.
          </p>
        </div>

        <div className="features-grid">
          {FEATURES.map((f, i) => (
            <div key={i} className="feature-card" style={{ '--fc-color': f.color }}>
              <div className="feature-card__top">
                <div className="feature-card__sym">{f.sym}</div>
                <span className="feature-card__num">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <h3 className="feature-card__title">{f.title}</h3>
              <div className="feature-card__sub">{f.sub}</div>
              <p className="feature-card__body">{f.body}</p>
              {f.href && (
                <a
                  href={f.href}
                  className="feature-card__link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit platform →
                </a>
              )}
              <div className="feature-card__glow" />
            </div>
          ))}
        </div>

        <div className="features-ecosystem">
          <div className="features-ecosystem__label">IfaLearn Ecosystem</div>
          <div className="features-ecosystem__nodes">
            {FEATURES.map((f, i) => (
              <div key={i} className="eco-node" style={{ '--ec-color': f.color }}>
                <div className="eco-node__sym">{f.sym}</div>
                <div className="eco-node__name">{f.title}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── COMPARE SECTION ─────────────────────────────────────────────────────────

// ─── IFACODEMY SECTION ────────────────────────────────────────────────────────

function IfacodemySection() {
  return (
    <section className="section section--alt" id="ifacodemy">
      <div className="container">
        <div className="ifacodemy-grid">
          <div className="ifacodemy-text">
            <div className="section__header">
              <span className="section__eyebrow section__eyebrow--violet">The Ifa Academy</span>
              <h2 className="section__title">
                Ifacodemy — The <span className="accent--violet">Ifa Academy of Polymaths</span>
              </h2>
              <p className="section__subtitle">
                Ifacodemy is the academy model at the heart of IfaLearn — dedicated to the formation
                of Ifa Polymaths: learners who achieve deep mastery across multiple fields of knowledge,
                unified by the 256 Odu Ifa as the axiomatic map of all reality.
              </p>
            </div>

            <div className="ifacodemy-points">
              {[
                {
                  sym: '◎',
                  title: 'Polymath Formation',
                  body: 'Ifacodemy trains learners to transcend specialization — cultivating broad, deep, and integrated mastery across science, technology, arts, mathematics, philosophy, and indigenous knowledge systems.',
                },
                {
                  sym: '⊕',
                  title: '256 Odu Curriculum',
                  body: 'Every subject in Ifacodemy is organized mathematically around the 256 Odu Ifa — the complete axiomatic structure of knowledge. The Odu Ifa does not just inform curriculum; it is the curriculum architecture.',
                },
                {
                  sym: 'Ψ',
                  title: 'Ifai Learning Assistant',
                  body: 'Each learner is guided by Ifa AI — an intelligent companion that models the learner\'s knowledge state against the 256 Odu and continuously shapes their polymath journey.',
                },
                {
                  sym: '⬡',
                  title: 'Global Ifa Network',
                  body: 'Ifacodemy learners are connected globally through IfaHubs — living nodes of the Ifa Academy network where scholars, mentors, and polymaths-in-training exchange knowledge and co-create the future.',
                },
              ].map((pt, i) => (
                <div key={i} className="ifacodemy-point">
                  <div className="ifacodemy-point__sym">{pt.sym}</div>
                  <div>
                    <div className="ifacodemy-point__title">{pt.title}</div>
                    <p className="ifacodemy-point__body">{pt.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="ifacodemy-visual">
            <div className="ifacodemy-card">
              <div className="ifacodemy-card__header">
                <div className="ifacodemy-card__badge">Ifacodemy</div>
                <div className="ifacodemy-card__sub">Ifa Academy of Polymaths</div>
              </div>
              <div className="ifacodemy-card__odu">
                <div className="ifacodemy-card__odu-num">256</div>
                <div className="ifacodemy-card__odu-label">Odu Ifa</div>
                <div className="ifacodemy-card__odu-desc">Fields of Knowledge</div>
              </div>
              <div className="ifacodemy-card__tracks">
                {['Ifa STEAM', 'Ifa Philosophy', 'Ifa Technology', 'Ifa Arts', 'Ifa Language', 'Ifa Science'].map((t, i) => (
                  <div key={i} className="ifacodemy-card__track">{t}</div>
                ))}
              </div>
              <div className="ifacodemy-card__dual">
                <span className="ifacodemy-card__dual-label">Dual System:</span>
                <span className="ifacodemy-card__dual-a">IfaLearn</span>
                <span className="ifacodemy-card__dual-sep">⟷</span>
                <span className="ifacodemy-card__dual-b">OrisaLearn</span>
              </div>
              <div className="ifacodemy-card__motto">
                <span className="ifacodemy-card__motto-sym" aria-hidden="true">◈</span>
                <span className="ifacodemy-card__motto-text">Where Ifa inspires innovation across every field.</span>
                <span className="ifacodemy-card__motto-sym" aria-hidden="true">◈</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── ÌṢÍSẸ̀ IFÁ SECTION ──────────────────────────────────────────────────────

function IsiseSection() {
  return (
    <section className="section section--alt" id="isise">
      <div className="container">
        <div className="section__header section__header--center">
          <span className="section__eyebrow section__eyebrow--gold">Orunmila Dialogue</span>
          <h2 className="section__title">Ìṣísẹ̀ Ifá</h2>
          <p className="section__subtitle">
            The compendium of declarations of Ọ̀rúnmìlà across the entire 256 Odu —
            direct words of wisdom spoken from sober, contemplative consciousness,
            before any divination begins.
          </p>
        </div>

        <div className="isise-desc">
            <p>
              Unlike the responsive, consultative nature of Ifá divination, Ìṣísẹ̀ Ifá does
              not cast for anyone or anything. It simply speaks — and in that speaking, it
              illuminates. Each of the 256 Odu carries such a declaration: a contemplative,
              meditative utterance that distils the entire energetic signature of that Odu
              into words of profound import.
            </p>
          </div>
      </div>
    </section>
  );
}

// ─── DUAL SECTION ─────────────────────────────────────────────────────────────

function DualSection() {
  return (
    <section className="section section--dark" id="dual">
      <div className="container">
        <div className="section__header section__header--center">
          <span className="section__eyebrow section__eyebrow--violet">The Dual System</span>
          <h2 className="section__title">
            IfaLearn &amp; <span className="accent--violet">OrisaLearn</span>
          </h2>
          <p className="section__subtitle">
            In the IFA Knowledge System, every platform has a Dual. IfaLearn and OrisaLearn together
            constitute the complete Ifa-Orisa Learning Ecosystem — two complementary, inseparable
            dimensions of Ifa-centered education.
          </p>
          <p className="section__subtitle">
            In this System, the Odu Ifa and Odu Oosa are used to develop &amp; model all knowledge
            fields mathematically, revealing knowledge about knowledge (meta-knowledge), and aiding
            learning about learning (meta-learning).
          </p>
        </div>

        <div className="dual-display">
          <div className="dual-side dual-side--ifa">
            <div className="dual-side__sym">Ifa</div>
            <h3 className="dual-side__name">IfaLearn</h3>
            <p className="dual-side__desc">
              The Ifa-centered dimension — organizing learning mathematically through the Ifa Knowledge System,
              the 256 Odu Ifa, and the Ifacodemy polymath model. IfaLearn is the knowledge-structure
              side of the Learning Ecosystem.
            </p>
            <ul className="dual-side__list">
              <li>Ifa Knowledge Matrix (256 Odu Ifa)</li>
              <li>Ifa STEAM Curriculum</li>
              <li>Ifa AI Personalization</li>
              <li>Ifacodemy Polymath Tracks</li>
              <li>IfaLMS, IfaLabs, Ifa Games</li>
            </ul>
          </div>

          <div className="dual-center">
            <div className="dual-center__op">⟷</div>
            <div className="dual-center__label">Dual</div>
            <div className="dual-center__connector" />
          </div>

          <div className="dual-side dual-side--orisa">
            <div className="dual-side__sym">Orisa</div>
            <h3 className="dual-side__name">OrisaLearn</h3>
            <p className="dual-side__desc">
              The Orisa-centered dimension — organizing learning through the energy exchange view,
              ritual knowledge, and the complementary Orisa pedagogy. OrisaLearn is the energy-practice
              side of the Learning Ecosystem.
            </p>
            <ul className="dual-side__list">
              <li>Orisa Knowledge Framework (16 Odu Orisa)</li>
              <li>Orisa Ritual &amp; Practice</li>
              <li>Energy Exchange Pedagogy</li>
              <li>OrisaModel Tracks</li>
              <li>Orisa Apps &amp; Communities</li>
            </ul>
          </div>
        </div>

        {/* ── Ifa Meta Laws Diagram ── */}
        <figure className="dual-laws-figure">
          <div className="dual-laws-figure__frame">
            <div className="dual-laws-figure__glow dual-laws-figure__glow--tl" />
            <div className="dual-laws-figure__glow dual-laws-figure__glow--br" />
            <div className="dual-laws-figure__corner dual-laws-figure__corner--tl" />
            <div className="dual-laws-figure__corner dual-laws-figure__corner--tr" />
            <div className="dual-laws-figure__corner dual-laws-figure__corner--bl" />
            <div className="dual-laws-figure__corner dual-laws-figure__corner--br" />
            <img
              src="./src/Ifa-laws.png"
              alt="Ifa Meta Laws — General Tools for Modeling All Fields of Knowledge"
              className="dual-laws-figure__img"
            />
            <div className="dual-laws-figure__scan" aria-hidden="true" />
          </div>
          <figcaption className="dual-laws-figure__caption">
            <span className="dual-laws-figure__caption-label">Figure</span>
            These Meta Laws Are the General Tools of Ifa for Modeling Concepts, Phenomena,
            Laws, Principles, Theories, and Models in All Fields.
          </figcaption>
        </figure>

      </div>
    </section>
  );
}

// ─── PATH / CTA SECTION ───────────────────────────────────────────────────────

function PathSection() {
  return (
    <section className="section" id="path">
      <div className="container">
        <div className="section__header section__header--center">
          <span className="section__eyebrow section__eyebrow--teal">Begin Your Journey</span>
          <h2 className="section__title">Your Path in IfaLearn</h2>
          <p className="section__subtitle">
            Three foundational steps to entering the IfaLearn ecosystem — from foundational
            Ifa knowledge to full Ifacodemy polymath formation.
          </p>
        </div>

        <div className="path-steps">
          {[
            {
              num: '01',
              title: 'Foundations of Ifa Knowledge',
              body: 'Begin with the Ifa Knowledge System — exploring the 256 Odu Ifa, the CEN framework, and the Ifa Model of Education. Establish the axiomatic foundation from which all learning in IfaLearn flows.',
              color: '#14b8d4',
            },
            {
              num: '02',
              title: 'STEAM Learning Through Odu',
              body: 'Enter the full STEAM curriculum — Ifa Mathematics, Ifa Computing, Ifa Physics, Ifa Language, Ifa Arts — each organized through the Odu Ifa matrix, delivered through IfaLMS, Ifa Games, and IfaLabs.',
              color: '#7c3aed',
            },
            {
              num: '03',
              title: 'Ifacodemy Polymath Formation',
              body: 'Join the Ifa Academy of Polymaths — pursuing multi-disciplinary mastery across all fields of knowledge, mentored by Ifa AI, connected through IfaHubs, and recognized as an Ifa Polymath of the IFA Internet.',
              color: '#00c87c',
            },
          ].map((s, i, arr) => (
            <div key={i} className="path-step" style={{ '--step-color': s.color }}>
              <div className="path-step__left">
                <div className="path-step__num">{s.num}</div>
                {i < arr.length - 1 && <div className="path-step__connector" />}
              </div>
              <div className="path-step__card">
                <h3 className="path-step__title">{s.title}</h3>
                <p className="path-step__body">{s.body}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="path-cta">
          <a href="https://toe.cenproject.org/the-ifa-learn/"
             target="_blank" rel="noopener noreferrer"
             className="btn btn--primary">
            Explore IfaLearn on TOE
          </a>
          <a href="../" className="btn btn--ghost" target="_blank" rel="noopener noreferrer">
            Back to IFA Internet
          </a>
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
              <img src="../src/assets/itoe_logo.png" alt="iTOE" className="footer__logo-mark" />
              <span>The IFA Internet</span>
            </div>
            <p className="footer__tagline">
              IfaLearn — The Ifa Digital Learning Ecosystem
            </p>
            <p className="footer__tagline footer__tagline--sm">
              Part of the <a href="https://cenproject.org/" className="footer__link-inline">CENProject</a> — Consciousness-Energy Research.
            </p>
          </div>
          <nav className="footer__links">
            <a href="#about" className="footer__link">About IfaLearn</a>
            <a href="#model" className="footer__link">Ifa Model</a>
            <a href="#features" className="footer__link">Platforms</a>
            <a href="#ifacodemy" className="footer__link">Ifacodemy</a>
            <a href="#isise" className="footer__link">Ìṣísẹ̀ Ifá</a>
            <a href="#dual" className="footer__link">OrisaLearn</a>
            <a href="/ifa-lms/ifa-academy/" className="footer__link">Ifa Academy</a>
            <a href="../" className="footer__link" target="_blank" rel="noopener noreferrer">IFA Internet</a>
          </nav>
        </div>
        <div className="footer__bottom">
          <span className="footer__copy">
            &copy; 2026 CENProject Innovations Limited. All rights reserved.
          </span>
          <span className="footer__powered">
            IfaLearn &mdash; Ifa Academy of Polymaths (Ifacodemy)
          </span>
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
        <AboutSection />
        <ModelNamesSection />
        <OddnSection />
        <FeaturesSection />
        <IfacodemySection />
        <IsiseSection />
        <DualSection />
        <PathSection />
      </main>
      <Footer />
      <MobileBar />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
