/* ─────────────────────────────────────────────────────────────────────────────
   The Ifart & Orisart Playground
   Ifa Art · Orisa Art · IFA Internet · CENProject
───────────────────────────────────────────────────────────────────────────── */

const { useState, useEffect, useRef } = React;

// ─── PLAYGROUND ZONES ────────────────────────────────────────────────────────

const ZONES = [
  {
    id:'ifa-sim',      title:'Ifa Simulations',   yoruba:'Àṣà Ifá Ìmọ̀',
    color:'#f0920c',   grad:['#f0920c','#ffd166'], icon:'⊕',
    desc:'Interactive simulations of Ifa divination, Odu energy patterns, and the 256-dimensional wisdom matrix of the IFA Internet.',
    anchor:'#divination',
  },
  {
    id:'orisa-sim',    title:'Orisa Simulations',  yoruba:'Àṣà Òrìṣà Ìmọ̀',
    color:'#8b5cf6',   grad:['#7c3aed','#c084fc'], icon:'⊗',
    desc:'Dynamic simulations of Orisa energy fields and cosmic pathways — experience the living Àṣẹ of each Orisa.',
    anchor:'#orisa-gallery',
  },
  {
    id:'ifa-design',   title:'Ifa Designs',        yoruba:'Àwòrán Ifá',
    color:'#14b8d4',   grad:['#0891b2','#22d3ee'], icon:'◈',
    desc:'Generative Ifa-inspired geometric and sacred pattern designs rooted in the mathematical structure of the 256 Odu.',
    anchor:'#pattern-studio',
  },
  {
    id:'orisa-design', title:'Orisa Designs',      yoruba:'Àwòrán Òrìṣà',
    color:'#ec4899',   grad:['#be185d','#f43f5e'], icon:'✦',
    desc:'Orisa-themed artistic designs in the symbolic visual languages of each Orisa — color, form, and sacred geometry.',
    anchor:'#orisa-gallery',
  },
  {
    id:'ifartworks',   title:'Ifartworks',         yoruba:'Iṣẹ́ọnà Ifá',
    color:'#10b981',   grad:['#047857','#34d399'], icon:'⬡',
    desc:'Original artworks inspired by Ifa knowledge, the 256 Odu Ifa, and the living cosmology of the IFA Internet.',
    anchor:'#pattern-studio',
  },
  {
    id:'orisartworks', title:'Orisartworks',       yoruba:'Iṣẹ́ọnà Òrìṣà',
    color:'#f59e0b',   grad:['#b45309','#fbbf24'], icon:'⬢',
    desc:'Artistic works celebrating the Orisa — their sacred colors, forms, symbols, and living energies.',
    anchor:'#orisa-gallery',
  },
  {
    id:'ifa-poems',    title:'IfaPoems',           yoruba:'Ewì Ifá',
    color:'#ffd166',   grad:['#d97706','#fde68a'], icon:'✦',
    desc:'Ifa-inspired poetry and spoken word — Ewì rooted in the wisdom and language of the 256 Odu Ifa.',
    anchor:'#poetry',
  },
  {
    id:'orisa-poems',  title:'OrisaPoems',         yoruba:'Oríkì / Ewì Òrìṣà',
    color:'#a78bfa',   grad:['#6d28d9','#c4b5fd'], icon:'♪',
    desc:'Orisa praise poetry and Oríkì — the living literary tradition through which Orisa identities are activated.',
    anchor:'#poetry',
  },
  {
    id:'ifa-plays',    title:'IfaPlays',           yoruba:'Eré Ifá',
    color:'#06b6d4',   grad:['#0369a1','#38bdf8'], icon:'▷',
    desc:'Interactive theatrical scenarios guided by Ifa wisdom — choice-based narratives where you consult the Odu.',
    anchor:'#ifa-play',
  },
  {
    id:'orisa-plays',  title:'OrisaPlays',         yoruba:'Eré Òrìṣà',
    color:'#c084fc',   grad:['#7e22ce','#e879f9'], icon:'◎',
    desc:'Orisa-themed interactive plays and theatrical art — where the Orisa become guides of living narrative.',
    anchor:'#ifa-play',
  },
];

// ─── ODU DATA WITH POEMS ──────────────────────────────────────────────────────

const ODU = [
  { num:1,  id:'ogbe',     name:'Ogbe',     meji:'Eji Ogbe',      color:'#f0c840', code:'1111',
    field:'Energy & Light',        tagline:'The Primal Light',
    poem:'I am the first ray before the sun was born,\nThe word that was spoken before the world was drawn.\nIn my hand I hold the origin of all light —\nWhat begins with me burns permanently bright.\n\nOgbe speaks: Begin. Again. Always.' },
  { num:2,  id:'oyeku',    name:'Oyeku',    meji:'Oyeku Meji',    color:'#9ca3af', code:'0000',
    field:'Void & Potential',      tagline:'The Sacred Void',
    poem:'I am the silence deeper than all sound,\nThe space of infinite possibility unbound.\nEvery end is cradled gently in my embrace —\nZero is the holiest and most sacred place.\n\nOyeku whispers: Rest. Release. Return.' },
  { num:3,  id:'iwori',    name:'Iwori',    meji:'Iwori Meji',    color:'#a855f7', code:'0110',
    field:'Mind & Intelligence',   tagline:'The Inner Eye',
    poem:'I turn the eye inward where true knowledge lives,\nTo wisdom that only the inner witness gives.\nThe mind that sees its own illumined face\nHas entered the most sacred, secret place.\n\nIwori knows: Look within. Truth is already there.' },
  { num:4,  id:'odi',      name:'Odi',      meji:'Odi Meji',      color:'#00c87c', code:'1001',
    field:'Mystery & Life',        tagline:'The Hidden Deep',
    poem:'I hold the mystery that no tongue can name,\nThe secret fire inside every life-flame.\nLife blooms in darkness, cradled deep in earth —\nThe womb of silence precedes every birth.\n\nOdi teaches: The unseen is more real than the seen.' },
  { num:5,  id:'irosun',   name:'Irosun',   meji:'Irosun Meji',   color:'#e9498a', code:'1100',
    field:'Energy Exchange',       tagline:'The Red Energy',
    poem:'Red is the language spoken by the living body,\nThe flow of life that makes the ordinary holy.\nI am the cost of things and I am the gain —\nExchange is the lifeblood; life itself is flame.\n\nIrosun sings: Give to receive. Exchange is sacred.' },
  { num:6,  id:'owonrin',  name:'Owonrin',  meji:'Owonrin Meji',  color:'#00d9b8', code:'0011',
    field:'Innovation & Chaos',    tagline:'The Dynamic Force',
    poem:'I tear open paths where no path has ever been,\nI disrupt the plans of the comfortable and serene.\nFrom chaos springs the architecture of the new —\nThe road that bends most wildly still leads through.\n\nOwonrin declares: Shake what is settled.' },
  { num:7,  id:'obara',    name:'Obara',    meji:'Obara Meji',    color:'#f5c518', code:'1000',
    field:'Mastery & Royalty',     tagline:'The Golden King',
    poem:'I wear the gold of mastery earned through devotion,\nMy kingdom is built on a creative ocean.\nExcellence is the only crown worth wearing —\nRoyalty is a quality of daring.\n\nObara commands: Create with pride and vision.' },
  { num:8,  id:'okanran',  name:'Okanran',  meji:'Okanran Meji',  color:'#4aa3ff', code:'0001',
    field:'Breakthrough & Spark',  tagline:'The Lightning Spark',
    poem:'A single spark is enough to light the whole dark,\nOne sudden word can find its irreversible mark.\nConflict is the sharpened edge where growth is born —\nThe seed that breaks its shell must first be torn.\n\nOkanran flares: Break through. The way opens.' },
  { num:9,  id:'ogunda',   name:'Ogunda',   meji:'Ogunda Meji',   color:'#e8772a', code:'1110',
    field:'Justice & Path',        tagline:'The Pathclearer',
    poem:'I clear the road with hands forged from righteous iron,\nWhere law has failed the blade of truth keeps trying.\nEvery just path is a road that I have made —\nMy work is never finished, never staying stayed.\n\nOgunda marches: Open every door. Justice moves.' },
  { num:10, id:'osa',      name:'Osa',      meji:'Osa Meji',      color:'#ff4d6d', code:'0111',
    field:'Change & Wind',         tagline:'The Wind of Change',
    poem:'I ride the wind that rearranges everything known,\nI am the turning before the seed is sown.\nTransformation is the deepest of all arts —\nI rearrange the landscape of stalled hearts.\n\nOsa spins: Evolve or remain. The choice is yours.' },
  { num:11, id:'ika',      name:'Ika',      meji:'Ika Meji',      color:'#00b4a6', code:'0100',
    field:'Craft & Value',         tagline:'The Value Web',
    poem:'I weave the great web where value circulates and flows,\nEach thread of skill connects what the wise one knows.\nCraft and mastery are acts of living prayer —\nThe hand that creates brings beauty everywhere.\n\nIka crafts: Your work is your most sacred art.' },
  { num:12, id:'oturupon', name:'Oturupon', meji:'Oturupon Meji', color:'#6b7280', code:'0010',
    field:'Earth & Ecology',       tagline:'The Deep Earth',
    poem:'I am the ground that holds all living things,\nThe deep root memory that silence brings.\nThe earth speaks in a register most quiet —\nHer ancient wisdom needs no loudspeaker riot.\n\nOturupon grounds: Return to earth. She remembers.' },
  { num:13, id:'otura',    name:'Otura',    meji:'Otura Meji',    color:'#c084fc', code:'1011',
    field:'Philosophy & Cosmos',   tagline:'The Elder Wisdom',
    poem:'I have witnessed the first law before the first word,\nThe original truth that the beginning heard.\nPhilosophy is not only a tongue\'s clever art —\nIt is the morning song encoded in the heart.\n\nOtura reveals: Wisdom is the oldest living thing.' },
  { num:14, id:'irete',    name:'Irete',    meji:'Irete Meji',    color:'#34d399', code:'1101',
    field:'Healing & Medicine',    tagline:'The Healer',
    poem:'I am the herb that speaks to what the body knows,\nThe wholeness that beneath all wounding shows.\nMedicine is knowledge given its living form —\nHealing is the universe\'s deepest norm.\n\nIrete restores: You were whole before the wound.' },
  { num:15, id:'ose',      name:'Ose',      meji:'Ose Meji',      color:'#fb923c', code:'1010',
    field:'Language & Abundance',  tagline:'The Eloquent Flow',
    poem:'Words flow from my depths like a river of ancient grace,\nAbundance pours into every open and waiting space.\nTo speak with beauty is to nourish and to feed —\nThe living language is the most generous of seeds.\n\nOse flows: Let the beautiful words arise.' },
  { num:16, id:'ofun',     name:'Ofun',     meji:'Ofun Meji',     color:'#818cf8', code:'0101',
    field:'Cosmos & Completion',   tagline:'The Cosmic Totality',
    poem:'I am the last and I am also the very first,\nI hold the universe\'s final and its original thirst.\nCompletion is not the end of all living things —\nThe cosmos that completes itself then sings.\n\nOfun closes: All is complete. All begins again.' },
];

// ─── ORISA DATA WITH POEMS ───────────────────────────────────────────────────

const ORISA = [
  {
    id:'esu',      name:'Eṣù / Elegba',        sub:'Orisa of the Crossroads',
    symbol:'✕',   color:'#f97316',             bgColor:'rgba(249,115,22,0.12)',
    domains:['Crossroads','Communication','Fate','Beginnings','Trickster'],
    praise:'Laroye · Ẹlẹ́gbára · Ọnà-ọ̀sọ̀rọ̀',
    poem:'Eṣù of the crossroads, trickster and true guide,\nWhere all roads converge, Laroye waits inside.\nThe key and the gate are both one in you —\nSpeak first to Eṣù, or no prayer passes through.\n\nElegba opens: Nothing moves without your blessing.',
    artForm:'Communication & Invocation Art',
  },
  {
    id:'ogun',     name:'Ògún',                sub:'Orisa of Iron & Justice',
    symbol:'⚔',   color:'#ef4444',             bgColor:'rgba(239,68,68,0.12)',
    domains:['Iron','War','Justice','Technology','Forest','Labour'],
    praise:'Ògún Onírè · Ògún Alára · Lakaayé',
    poem:'Ògún clears the road with hands forged from righteous iron,\nThe forest echoes with his ancient and still-present trying.\nWhere false law fails, the blade of truth must speak —\nThe justice that the strong ones seek has an edge unique.\n\nÒgún forges: Truth itself has a cutting edge.',
    artForm:'Ìjálá — Hunters\' Oral Art',
  },
  {
    id:'sango',    name:'Ṣàngó',               sub:'Orisa of Thunder & Kingship',
    symbol:'⚡',   color:'#f59e0b',             bgColor:'rgba(245,158,11,0.12)',
    domains:['Thunder','Lightning','Kingship','Fire','Power','Drums'],
    praise:'Ọba Kòso · Àrèmú Ọjá · Jakutà',
    poem:'Ṣàngó speaks in thunder and the sound of living fire,\nThe king whose single voice lifts every spirit higher.\nLightning is the royal pen with which he writes —\nHis law is recorded in illuminating lights.\n\nṢàngó thunders: Let the world hear what is true.',
    artForm:'Royal Drumming & Fire Art',
  },
  {
    id:'oshun',    name:'Ọṣun',                sub:'Orisa of Rivers & Love',
    symbol:'≋',   color:'#fbbf24',             bgColor:'rgba(251,191,36,0.12)',
    domains:['Rivers','Love','Beauty','Fertility','Sweetness','Healing'],
    praise:'Yèyé Ìdọ̀ · Ìyáàlọde · Àpárà',
    poem:'Ọṣun flows like honey warming everything she meets,\nWhere rivers run her presence is the sweetness that completes.\nBeauty is not vanity — it is the vessel of the wise —\nLove is the most truthful thing that never, ever dies.\n\nỌṣun flows: Love is the source of all abundance.',
    artForm:'Sacred Dance & River Art',
  },
  {
    id:'yemoja',   name:'Yemọja',              sub:'Orisa of the Ocean',
    symbol:'◎',   color:'#3b82f6',             bgColor:'rgba(59,130,246,0.12)',
    domains:['Ocean','Motherhood','Children','Protection','Water','Birth'],
    praise:'Àgbàdo-mọ̀jú · Ìyá Omi · Àṣàbì',
    poem:'Yemọja holds the weight and depth of all the sea,\nEvery child born has passed through her gate to be free.\nThe ocean holds the memory of every distant shore —\nA mother\'s love is always infinitely more.\n\nYemọja embraces: You are held. You belong here.',
    artForm:'Ocean Song & Water Art',
  },
  {
    id:'obatala',  name:'Obàtálá',             sub:'Orisa of Creation & Purity',
    symbol:'○',   color:'#e2e8f0',             bgColor:'rgba(226,232,240,0.10)',
    domains:['Creation','Purity','Wisdom','Peace','Form','White Cloth'],
    praise:'Ọrìṣà Ńlá · Àlàáfin · Ọbàlùwàiyé',
    poem:'Obàtálá forms in stillness every human face,\nIn the architecture of silence lives the highest grace.\nWhite is the gathered color of all other hues —\nClarity of spirit is the one truth none can lose.\n\nObàtálá creates: Be still, then make the world.',
    artForm:'Sacred White Art & Sculpture',
  },
  {
    id:'oya',      name:'Ọya',                 sub:'Orisa of Wind & Transformation',
    symbol:'∿',   color:'#8b5cf6',             bgColor:'rgba(139,92,246,0.12)',
    domains:['Wind','Change','Cemetery','Lightning','Markets','Ancestors'],
    praise:'Ọya Àjèré · Yànsàn · Àjàlú',
    poem:'Ọya whirls through marketplace and through the sacred grave,\nShe honors in her turning both the fearless and the brave.\nWhere the wind turns, the unwritten future also turns —\nIn the center of her storm the searching spirit learns.\n\nỌya transforms: Let go of what was. New comes.',
    artForm:'Dance of the Wind & Ancestral Art',
  },
];

// ─── IFA PLAY SCENARIO ───────────────────────────────────────────────────────

const IFA_PLAY = {
  title:'The Crossroads of Àṣẹ',
  subtitle:'An Interactive Ifa Wisdom Play',
  opening:'You stand at a forest crossroads where four paths meet. The air hums with the sound of distant drumming. Eṣù sits at the center, watching you with ancient, knowing eyes.\n\n"Stranger," he says, "the road you seek is one of these four. What will you do before you choose your path?"',
  choices:[
    {
      id:'A', color:'#f0920c', oduIdx:0,
      text:'Offer palm oil and give thanks before choosing',
      orisa:'Eṣù smiles broadly and points to the right path. "The one who gives thanks before receiving shall always find the way open before them."',
      verse:'Ogbe speaks from the light: The path of gratitude opens all roads. Begin with thanksgiving and the universe conspires for your arrival.',
      lesson:'Gratitude is the key that opens all crossroads.',
    },
    {
      id:'B', color:'#e8772a', oduIdx:8,
      text:'Step boldly forward without ceremony',
      orisa:'Ògún rises from the forest with his machete gleaming. "Courage without wisdom is a machete without a handle." He clears the path — but at a cost of hard labor.',
      verse:'Ogunda speaks: Every path requires effort. The one who walks without asking must carry what others receive as a gift. But true courage still clears every road.',
      lesson:'Initiative is strength, but wisdom saves labor.',
    },
    {
      id:'C', color:'#a855f7', oduIdx:2,
      text:'Sit quietly at the crossroads and observe first',
      orisa:"Ọya's wind carries a leaf that lands at your feet — it points to the left path. \"The one who observes receives what the rushing one forever misses.\"",
      verse:'Iwori speaks from within: The one who looks before stepping finds what is hidden to all others. Inner knowing is the deepest compass available to any traveler.',
      lesson:'Stillness and observation are the roots of wise action.',
    },
    {
      id:'D', color:'#14b8d4', oduIdx:14,
      text:'Ask Eṣù directly which path leads home',
      orisa:'Eṣù laughs with genuine delight. "One who knows how to ask with respect is already halfway home." He gives you a sacred sign pointing the straight path forward.',
      verse:'Ose speaks in flowing words: The one who asks with respect receives the clearest answer. Communication is the highest art of finding the way through any crossroads.',
      lesson:'Asking is wisdom. The one who asks well always finds the way.',
    },
  ],
};

// ─── IFA DANCE METADATA ───────────────────────────────────────────────────────

const DANCE_META = {
  ogbe:     { dur:'3.2s', ease:'ease-in-out', delay:'0s',    label:'Radiates the Primal Light' },
  oyeku:    { dur:'5s',   ease:'ease-in-out', delay:'0.4s',  label:'Fades into the Sacred Void' },
  iwori:    { dur:'6s',   ease:'linear',      delay:'0.8s',  label:'Spirals the Inner Eye Inward' },
  odi:      { dur:'4.2s', ease:'ease-in-out', delay:'0.5s',  label:'Throbs with Hidden Mystery' },
  irosun:   { dur:'1.7s', ease:'ease-in-out', delay:'0.2s',  label:'Pulses the Red Heartbeat' },
  owonrin:  { dur:'1.3s', ease:'linear',      delay:'0.1s',  label:'Shakes with Dynamic Chaos' },
  obara:    { dur:'4s',   ease:'ease-in-out', delay:'0.6s',  label:'Rises in Royal Mastery' },
  okanran:  { dur:'2.2s', ease:'ease-in-out', delay:'0.3s',  label:'Strikes with Lightning Speed' },
  ogunda:   { dur:'3.5s', ease:'ease-in-out', delay:'0.7s',  label:'Marches the Path of Justice' },
  osa:      { dur:'2.6s', ease:'ease-in-out', delay:'0.2s',  label:'Whirls the Wind of Change' },
  ika:      { dur:'4s',   ease:'ease-in-out', delay:'0.9s',  label:'Weaves the Value Web' },
  oturupon: { dur:'6.5s', ease:'ease-in-out', delay:'1.1s',  label:'Trembles with Deep Earth' },
  otura:    { dur:'8s',   ease:'linear',      delay:'0.3s',  label:'Orbits the Cosmic Totality' },
  irete:    { dur:'3.2s', ease:'ease-in-out', delay:'0.6s',  label:'Waves the Healing Frequency' },
  ose:      { dur:'2.4s', ease:'ease-in-out', delay:'0.4s',  label:'Flows with Eloquent Abundance' },
  ofun:     { dur:'5s',   ease:'linear',      delay:'0.8s',  label:'Traces the Infinite Cycle' },
};

// ─── HEADER ──────────────────────────────────────────────────────────────────

function PlaygroundHeader() {
  return (
    <header className="pg-header">
      <div className="pg-header__inner">
        <a href="../" className="pg-header__back">
          <span className="pg-header__back-arrow">←</span>
          <img src="../../src/assets/itoe_logo.png" alt="iTOE" className="pg-header__logo" />
          <span className="pg-header__back-label">Ifa Art</span>
        </a>
        <div className="pg-header__title">
          <span className="pg-header__badge">Playground</span>
          <span className="pg-header__name">Ifart &amp; Orisart</span>
        </div>
        <a href="https://ifainternet.org" className="pg-header__ifa" target="_blank" rel="noopener noreferrer">
          IFA Internet
        </a>
      </div>
    </header>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────

function PlaygroundHero() {
  return (
    <section className="pg-hero">
      <div className="pg-hero__bg">
        <div className="pg-hero__orb pg-hero__orb--a" />
        <div className="pg-hero__orb pg-hero__orb--b" />
        <div className="pg-hero__orb pg-hero__orb--c" />
        <div className="pg-hero__orb pg-hero__orb--d" />
        <div className="pg-hero__orb pg-hero__orb--e" />
        <div className="pg-hero__grid" />
      </div>
      <div className="pg-hero__content">
        <div className="pg-hero__eyebrow">
          <span className="pg-hero__dot" />
          Ifa Art &amp; Orisa Art · The IFA Internet
        </div>
        <h1 className="pg-hero__title">
          <span className="pg-hero__title-line">Ifart &amp; Orisart</span>
          <span className="pg-hero__title-sub">Playground</span>
        </h1>
        <p className="pg-hero__desc">
          A living creative studio for Ifa Art and Orisa Art — where simulations, designs,
          poems, plays, and artworks rooted in the <strong>256 Odu Ifa</strong> come to life.
          Build, explore, create, and experience the axiomatic art matrix of the IFA Internet.
        </p>
        <div className="pg-hero__zone-pills">
          {['Ifa Simulations','Orisa Simulations','Ifa Designs','Ifartworks','IfaPoems','OrisaPoems','IfaPlays','OrisaPlays'].map((z, i) => (
            <span key={i} className="pg-hero__zone-pill">{z}</span>
          ))}
        </div>
        <div className="pg-hero__ctas">
          <a href="#zones" className="pg-btn pg-btn--primary">Explore All Zones</a>
          <a href="#divination" className="pg-btn pg-btn--ghost">Ifa Divination ↓</a>
          <a href="#poetry" className="pg-btn pg-btn--ghost">Poetry ↓</a>
          <a href="./ilu-ilu/" className="pg-btn pg-btn--ilu">🥁 Ìlú-Ìlù — City of Drum</a>
        </div>
      </div>

      <div className="pg-hero__stats">
        {[
          { v:'10', l:'Playground Zones',  s:'Ifa & Orisa Art' },
          { v:'256',l:'Odu Ifa',           s:'Axiomatic Matrix' },
          { v:'16', l:'Ifa Poems',         s:'Ewì for Each Odu' },
          { v:'7',  l:'Orisa',             s:'Oríkì Gallery' },
        ].map((s,i) => (
          <div key={i} className="pg-hero__stat">
            <div className="pg-hero__stat-v">{s.v}</div>
            <div className="pg-hero__stat-l">{s.l}</div>
            <div className="pg-hero__stat-s">{s.s}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── PLAYGROUND ZONES SECTION ─────────────────────────────────────────────────

function PlaygroundZonesSection() {
  return (
    <section className="pg-section" id="zones">
      <div className="pg-container">
        <div className="pg-section-header">
          <span className="pg-eyebrow">The Playground</span>
          <h2 className="pg-section-title">Ten Creative Zones</h2>
          <p className="pg-section-sub">
            Each zone is a creative field of Ifart and Orisart — from interactive simulations
            to poetry, generative art, and theatrical play. All rooted in the 256 Odu Ifa.
          </p>
        </div>
        <div className="pg-zones-grid">
          {ZONES.map(z => (
            <a key={z.id} href={z.anchor} className="pg-zone-card" style={{'--zc':z.color,'--zg1':z.grad[0],'--zg2':z.grad[1]}}>
              <div className="pg-zone-card__top">
                <span className="pg-zone-card__icon">{z.icon}</span>
                <span className="pg-zone-card__num" />
              </div>
              <div className="pg-zone-card__body">
                <div className="pg-zone-card__title">{z.title}</div>
                <div className="pg-zone-card__yoruba">{z.yoruba}</div>
                <p className="pg-zone-card__desc">{z.desc}</p>
              </div>
              <div className="pg-zone-card__footer">
                <span className="pg-zone-card__enter">Enter Zone →</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── DIVINATION SIMULATOR ─────────────────────────────────────────────────────

function DivinationSimulator() {
  const [result, setResult]   = useState(null);
  const [casting, setCasting] = useState(false);
  const [nuts, setNuts]       = useState([]);

  function cast() {
    if (casting) return;
    setCasting(true);
    setResult(null);

    // Scatter nuts
    const n = Array.from({length:16}, (_, i) => ({
      id:i,
      x: 30 + Math.random() * 40,
      y: Math.random() * 80,
      delay: i * 40,
    }));
    setNuts(n);

    setTimeout(() => {
      const odu = ODU[Math.floor(Math.random() * ODU.length)];
      setResult(odu);
      setCasting(false);
    }, 900);
  }

  const bits = result ? result.code.split('') : [];

  return (
    <section className="pg-section pg-section--alt" id="divination">
      <div className="pg-container">
        <div className="pg-section-header">
          <span className="pg-eyebrow pg-eyebrow--amber">Ifa Simulation</span>
          <h2 className="pg-section-title">The IfaSimulator</h2>
          <p className="pg-section-sub">
            IfaCompute an art by casting the sacred palm nuts (Ikin Ifá) and let the Odu reveal itself.
            Each cast draws from the 256-Node Ifa Matrix of the IFA Internet.
          </p>
        </div>

        <div className="div-sim">
          {/* Palm nuts visualization */}
          <div className="div-sim__nuts-area">
            <div className={`div-sim__nuts${casting ? ' div-sim__nuts--casting' : ''}`}>
              {Array.from({length:16}, (_, i) => (
                <div key={i} className={`div-sim__nut${result ? ' div-sim__nut--settled' : ''}`}
                     style={{
                       background: result ? result.color : '#8892aa',
                       animationDelay: `${i * 50}ms`,
                       '--nut-x': `${20 + (i % 8) * 10}%`,
                       '--nut-y': `${i < 8 ? 20 : 60}%`,
                     }} />
              ))}
            </div>
            {!result && !casting && (
              <div className="div-sim__prompt">
                <div className="div-sim__prompt-icon">⊕</div>
                <div className="div-sim__prompt-text">Ikin Ifá — 16 Sacred Palm Nuts</div>
                <div className="div-sim__prompt-sub">Click below to cast and reveal your Odu</div>
              </div>
            )}
            {casting && (
              <div className="div-sim__casting-msg">Casting Ikin Ifá…</div>
            )}
          </div>

          <button className={`div-sim__btn${casting ? ' div-sim__btn--active' : ''}`} onClick={cast} disabled={casting}>
            {casting ? 'Casting…' : result ? 'Cast Again' : 'Cast the Sacred Palm Nuts'}
          </button>

          {result && (
            <div className="div-sim__result" style={{'--odu-color': result.color}}>
              <div className="div-sim__odu-header">
                <div className="div-sim__odu-num">{String(result.num).padStart(2,'0')}</div>
                <div className="div-sim__odu-info">
                  <div className="div-sim__odu-name">{result.meji}</div>
                  <div className="div-sim__odu-field">{result.field}</div>
                </div>
                <div className="div-sim__odu-code">
                  {bits.map((b, i) => (
                    <span key={i} className={`div-sim__bit div-sim__bit--${b === '1' ? 'on' : 'off'}`}>{b === '1' ? '○' : '|'}</span>
                  ))}
                </div>
              </div>
              <div className="div-sim__odu-tagline">{result.tagline}</div>
              <div className="div-sim__poem">
                {result.poem.split('\n').map((line, i) => (
                  <p key={i} className={line === '' ? 'div-sim__poem-gap' : 'div-sim__poem-line'}>{line || '\u00a0'}</p>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── POETRY CORNER ───────────────────────────────────────────────────────────

function PoetryCorner() {
  const [tab, setTab]           = useState('ifa');
  const [selectedOdu, setOdu]   = useState(ODU[0]);
  const [selectedOrisa, setOrisa] = useState(ORISA[0]);

  return (
    <section className="pg-section" id="poetry">
      <div className="pg-container">
        <div className="pg-section-header">
          <span className="pg-eyebrow pg-eyebrow--violet">IfaPoems · OrisaPoems</span>
          <h2 className="pg-section-title">The Poetry Corner</h2>
          <p className="pg-section-sub">
            IfaPoems — Ewì for each of the 16 Odu Ifa. OrisaPoems — Oríkì praise poetry for the Orisa.
            Select an Odu or Orisa to hear their verse.
          </p>
        </div>

        {/* Tabs */}
        <div className="poetry-tabs">
          <button className={`poetry-tab${tab==='ifa' ? ' poetry-tab--active' : ''}`} onClick={() => setTab('ifa')} style={{'--tc':'#f0920c'}}>
            IfaPoems — Ewì Ifá
          </button>
          <button className={`poetry-tab${tab==='orisa' ? ' poetry-tab--active' : ''}`} onClick={() => setTab('orisa')} style={{'--tc':'#8b5cf6'}}>
            OrisaPoems — Oríkì
          </button>
        </div>

        {tab === 'ifa' ? (
          <div className="poetry-panel">
            {/* Odu selector */}
            <div className="poetry-odu-grid">
              {ODU.map(odu => (
                <button key={odu.id}
                  className={`poetry-odu-btn${selectedOdu.id === odu.id ? ' poetry-odu-btn--active' : ''}`}
                  style={{'--oc': odu.color}}
                  onClick={() => setOdu(odu)}>
                  <span className="poetry-odu-btn__num">{odu.num}</span>
                  <span className="poetry-odu-btn__name">{odu.name}</span>
                </button>
              ))}
            </div>
            {/* Poem display */}
            <div className="poetry-display" style={{'--pc': selectedOdu.color}}>
              <div className="poetry-display__header">
                <div className="poetry-display__num">{String(selectedOdu.num).padStart(2,'0')}</div>
                <div className="poetry-display__info">
                  <div className="poetry-display__title">{selectedOdu.meji}</div>
                  <div className="poetry-display__field">{selectedOdu.field} · {selectedOdu.tagline}</div>
                </div>
                <div className="poetry-display__code">
                  {selectedOdu.code.split('').map((b, i) => (
                    <span key={i} className="poetry-bit">{b === '1' ? '○' : '|'}</span>
                  ))}
                </div>
              </div>
              <div className="poetry-display__type">Ewì Ifá — Ifa Poetry</div>
              <div className="poetry-display__poem">
                {selectedOdu.poem.split('\n').map((l, i) => (
                  <p key={i} className={l === '' ? 'poetry-gap' : 'poetry-line'}>{l || '\u00a0'}</p>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="poetry-panel">
            {/* Orisa selector */}
            <div className="poetry-orisa-grid">
              {ORISA.map(o => (
                <button key={o.id}
                  className={`poetry-orisa-btn${selectedOrisa.id === o.id ? ' poetry-orisa-btn--active' : ''}`}
                  style={{'--oc': o.color}}
                  onClick={() => setOrisa(o)}>
                  <span className="poetry-orisa-btn__sym">{o.symbol}</span>
                  <span className="poetry-orisa-btn__name">{o.name.split(' ')[0]}</span>
                </button>
              ))}
            </div>
            {/* Orisa poem display */}
            <div className="poetry-display" style={{'--pc': selectedOrisa.color}}>
              <div className="poetry-display__header">
                <div className="poetry-orisa-sym">{selectedOrisa.symbol}</div>
                <div className="poetry-display__info">
                  <div className="poetry-display__title">{selectedOrisa.name}</div>
                  <div className="poetry-display__field">{selectedOrisa.sub}</div>
                </div>
              </div>
              <div className="poetry-display__type">Oríkì — Orisa Praise Poetry</div>
              <div className="poetry-display__praise">{selectedOrisa.praise}</div>
              <div className="poetry-display__poem">
                {selectedOrisa.poem.split('\n').map((l, i) => (
                  <p key={i} className={l === '' ? 'poetry-gap' : 'poetry-line'}>{l || '\u00a0'}</p>
                ))}
              </div>
              <div className="poetry-display__art-form">Art Form: {selectedOrisa.artForm}</div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// ─── GENERATIVE PATTERN STUDIO ───────────────────────────────────────────────

function PatternStudio() {
  const [seed, setSeed] = useState(0.42);

  const cx = 200, cy = 200;
  const rot1 = (seed * 360) % 360;
  const rot2 = (seed * 540 + 22.5) % 360;
  const rot3 = (seed * 270 + 45) % 360;

  // Pick 4 dominant colors from seed
  const c0 = ODU[Math.floor(seed * 16) % 16].color;
  const c1 = ODU[Math.floor(seed * 11 + 3) % 16].color;
  const c2 = ODU[Math.floor(seed * 7 + 7) % 16].color;
  const c3 = ODU[Math.floor(seed * 13 + 1) % 16].color;

  return (
    <section className="pg-section pg-section--alt" id="pattern-studio">
      <div className="pg-container">
        <div className="pg-section-header">
          <span className="pg-eyebrow pg-eyebrow--teal">Ifa Designs · Ifartworks</span>
          <h2 className="pg-section-title">Generative Ifa Pattern Studio</h2>
          <p className="pg-section-sub">
            Each click generates a unique Ifa-inspired mandala using the structural logic of the 256 Odu —
            sacred geometry, 16-fold symmetry, and the color matrix of the Odu Ifa.
          </p>
        </div>

        <div className="pattern-studio">
          <div className="pattern-studio__canvas">
            <svg viewBox="0 0 400 400" className="pattern-studio__svg" aria-label="Generative Ifa mandala pattern">
              <defs>
                <radialGradient id="ps-bg" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor={c0} stopOpacity="0.18"/>
                  <stop offset="60%" stopColor={c1} stopOpacity="0.06"/>
                  <stop offset="100%" stopColor="#020408" stopOpacity="1"/>
                </radialGradient>
                <filter id="ps-glow" x="-40%" y="-40%" width="180%" height="180%">
                  <feGaussianBlur stdDeviation="4" result="b"/>
                  <feComposite in="SourceGraphic" in2="b" operator="over"/>
                </filter>
              </defs>

              {/* Background */}
              <circle cx={cx} cy={cy} r="196" fill="#040810"/>
              <circle cx={cx} cy={cy} r="196" fill="url(#ps-bg)"/>

              {/* Outer boundary ring */}
              <circle cx={cx} cy={cy} r="185" fill="none" stroke="rgba(240,146,12,0.08)" strokeWidth="0.5" strokeDasharray="3 9"/>

              {/* 16 spokes — colored by Odu */}
              {ODU.map((odu, i) => {
                const a = (i * 22.5 + rot1) * Math.PI / 180;
                return (
                  <line key={i}
                    x1={cx + 28 * Math.cos(a)} y1={cy + 28 * Math.sin(a)}
                    x2={cx + 175 * Math.cos(a)} y2={cy + 175 * Math.sin(a)}
                    stroke={odu.color} strokeWidth="0.8" strokeOpacity="0.30"/>
                );
              })}

              {/* Outer ring: 16 diamonds */}
              {ODU.map((odu, i) => {
                const a = (i * 22.5 + rot1) * Math.PI / 180;
                const x = cx + 165 * Math.cos(a);
                const y = cy + 165 * Math.sin(a);
                const s = 5;
                return (
                  <polygon key={i}
                    points={`${x},${y-s} ${x+s},${y} ${x},${y+s} ${x-s},${y}`}
                    fill={odu.color} opacity="0.75"
                    transform={`rotate(${rot1 + i*22.5}, ${x}, ${y})`}/>
                );
              })}

              {/* Outer ring circle */}
              <circle cx={cx} cy={cy} r="165" fill="none" stroke={c0} strokeWidth="0.6" strokeOpacity="0.25" strokeDasharray="1 7"/>

              {/* Middle ring: 8 filled circles */}
              {[0,2,4,6,8,10,12,14].map((idx, i) => {
                const a = (i * 45 + rot2) * Math.PI / 180;
                const x = cx + 120 * Math.cos(a);
                const y = cy + 120 * Math.sin(a);
                return (
                  <circle key={i} cx={x} cy={y} r="13"
                    fill={ODU[idx].color} opacity="0.60"
                    stroke="rgba(255,255,255,0.08)" strokeWidth="0.5"
                    filter="url(#ps-glow)"/>
                );
              })}

              {/* Middle ring: 8 open circles offset */}
              {[1,3,5,7,9,11,13,15].map((idx, i) => {
                const a = (i * 45 + rot2 + 22.5) * Math.PI / 180;
                const x = cx + 120 * Math.cos(a);
                const y = cy + 120 * Math.sin(a);
                return (
                  <circle key={i} cx={x} cy={y} r="8"
                    fill="none" stroke={ODU[idx].color} strokeWidth="1.5" opacity="0.55"/>
                );
              })}

              <circle cx={cx} cy={cy} r="120" fill="none" stroke={c1} strokeWidth="0.5" strokeOpacity="0.18" strokeDasharray="2 10"/>

              {/* Inner ring: 4 ellipses */}
              {[0,4,8,12].map((idx, i) => {
                const a = (i * 90 + rot3) * Math.PI / 180;
                const x = cx + 68 * Math.cos(a);
                const y = cy + 68 * Math.sin(a);
                return (
                  <ellipse key={i} cx={x} cy={y} rx="18" ry="9"
                    fill={ODU[idx].color} opacity="0.65"
                    transform={`rotate(${i * 90 + rot3}, ${x}, ${y})`}
                    filter="url(#ps-glow)"/>
                );
              })}

              {/* Inner ring: 4 triangles between ellipses */}
              {[2,6,10,14].map((idx, i) => {
                const a = (i * 90 + rot3 + 45) * Math.PI / 180;
                const x = cx + 68 * Math.cos(a);
                const y = cy + 68 * Math.sin(a);
                const s = 9;
                return (
                  <polygon key={i}
                    points={`${x},${y-s} ${x+s*0.87},${y+s*0.5} ${x-s*0.87},${y+s*0.5}`}
                    fill={ODU[idx].color} opacity="0.55"
                    transform={`rotate(${i * 90 + rot3}, ${x}, ${y})`}/>
                );
              })}

              <circle cx={cx} cy={cy} r="68" fill="none" stroke={c2} strokeWidth="0.5" strokeOpacity="0.20" strokeDasharray="2 8"/>

              {/* Binary marks ring: 4 Ifa marks */}
              {['○○○○','○||○','||○|','○|○|'].map((mark, i) => {
                const a = (i * 90 + rot3 + 22.5) * Math.PI / 180;
                const x = cx + 46 * Math.cos(a);
                const y = cy + 46 * Math.sin(a);
                return (
                  <text key={i} x={x} y={y} textAnchor="middle" dominantBaseline="middle"
                    fill={c3} fontSize="6" opacity="0.55"
                    fontFamily="monospace">{mark}</text>
                );
              })}

              {/* Center glow rings */}
              <circle cx={cx} cy={cy} r="32" fill="none" stroke={c0} strokeWidth="1" strokeOpacity="0.35" strokeDasharray="4 4"/>
              <circle cx={cx} cy={cy} r="26" fill="#04080f" stroke={c0} strokeWidth="1.8" filter="url(#ps-glow)"/>
              <circle cx={cx} cy={cy} r="20" fill="#020508"/>

              {/* Center symbol */}
              <text x={cx} y={cy + 1} textAnchor="middle" dominantBaseline="middle"
                fill={c0} fontSize="18" fontWeight="900" opacity="0.95">⊕</text>
            </svg>
          </div>

          <div className="pattern-studio__controls">
            <button className="pattern-studio__btn" onClick={() => setSeed(Math.random())}>
              ↻ &nbsp; Generate New Pattern
            </button>
            <p className="pattern-studio__hint">
              Each pattern is uniquely generated from the 16-fold symmetry of the Odu Ifa —
              no two patterns are the same.
            </p>
            <div className="pattern-studio__palette">
              {ODU.map(odu => (
                <span key={odu.id} className="pattern-studio__swatch" style={{background: odu.color}} title={odu.name}/>
              ))}
            </div>
            <p className="pattern-studio__palette-label">16 Odu · 16 Colors · 256 Combinations</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── ORISA CARD GALLERY ──────────────────────────────────────────────────────

function OrisaCard({ orisa }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div className={`orisa-card${flipped ? ' orisa-card--flipped' : ''}`}
         style={{'--cc': orisa.color, '--cb': orisa.bgColor}}
         onClick={() => setFlipped(f => !f)}
         role="button" aria-pressed={flipped} tabIndex={0}
         onKeyDown={e => e.key === 'Enter' && setFlipped(f => !f)}>
      <div className="orisa-card__inner">
        {/* Front */}
        <div className="orisa-card__face orisa-card__face--front">
          <div className="orisa-card__glow" />
          <div className="orisa-card__symbol">{orisa.symbol}</div>
          <div className="orisa-card__name">{orisa.name}</div>
          <div className="orisa-card__sub">{orisa.sub}</div>
          <div className="orisa-card__flip-hint">Tap to reveal Oríkì</div>
        </div>
        {/* Back */}
        <div className="orisa-card__face orisa-card__face--back">
          <div className="orisa-card__back-name">{orisa.name}</div>
          <div className="orisa-card__praise">{orisa.praise}</div>
          <div className="orisa-card__domains">
            {orisa.domains.map((d, i) => (
              <span key={i} className="orisa-card__domain">{d}</span>
            ))}
          </div>
          <div className="orisa-card__poem-snippet">
            {orisa.poem.split('\n').slice(0, 4).map((l, i) => (
              <p key={i} className="orisa-card__poem-line">{l}</p>
            ))}
          </div>
          <div className="orisa-card__art-form">{orisa.artForm}</div>
        </div>
      </div>
    </div>
  );
}

function OrisaCardGallery() {
  const [selected, setSelected] = useState(null);
  return (
    <section className="pg-section" id="orisa-gallery">
      <div className="pg-container">
        <div className="pg-section-header">
          <span className="pg-eyebrow pg-eyebrow--violet">Orisa Simulations · Orisa Designs · Orisartworks</span>
          <h2 className="pg-section-title">Orisa Card Gallery</h2>
          <p className="pg-section-sub">
            Seven Orisa — each a living field of energy, art, and knowledge.
            Tap a card to flip it and reveal the Oríkì, praise names, domains, and art form.
          </p>
        </div>
        <div className="orisa-gallery">
          {ORISA.map(o => <OrisaCard key={o.id} orisa={o} />)}
        </div>

        {/* Expanded poem panel */}
        <div className="orisa-gallery__poem-panel">
          <div className="pg-section-header" style={{marginTop:'2rem'}}>
            <span className="pg-eyebrow pg-eyebrow--violet">OrisaPoems — Full Oríkì</span>
          </div>
          <div className="poetry-orisa-grid">
            {ORISA.map(o => (
              <button key={o.id}
                className={`poetry-orisa-btn${selected?.id === o.id ? ' poetry-orisa-btn--active' : ''}`}
                style={{'--oc': o.color}}
                onClick={() => setSelected(prev => prev?.id === o.id ? null : o)}>
                <span className="poetry-orisa-btn__sym">{o.symbol}</span>
                <span className="poetry-orisa-btn__name">{o.name.split(' ')[0]}</span>
              </button>
            ))}
          </div>
          {selected && (
            <div className="poetry-display" style={{'--pc': selected.color}}>
              <div className="poetry-display__header">
                <div className="poetry-orisa-sym">{selected.symbol}</div>
                <div className="poetry-display__info">
                  <div className="poetry-display__title">{selected.name}</div>
                  <div className="poetry-display__field">{selected.sub}</div>
                </div>
              </div>
              <div className="poetry-display__type">Oríkì — Orisa Praise Poetry</div>
              <div className="poetry-display__praise">{selected.praise}</div>
              <div className="poetry-display__poem">
                {selected.poem.split('\n').map((l, i) => (
                  <p key={i} className={l === '' ? 'poetry-gap' : 'poetry-line'}>{l || '\u00a0'}</p>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── IFA PLAY SECTION ────────────────────────────────────────────────────────

function IfaPlaySection() {
  const [chosen, setChosen] = useState(null);
  const [revealed, setRevealed] = useState(false);

  function choose(choice) {
    setChosen(choice);
    setTimeout(() => setRevealed(true), 400);
  }

  function reset() {
    setChosen(null);
    setRevealed(false);
  }

  const odu = chosen ? ODU[chosen.oduIdx] : null;

  return (
    <section className="pg-section pg-section--alt" id="ifa-play">
      <div className="pg-container">
        <div className="pg-section-header">
          <span className="pg-eyebrow pg-eyebrow--teal">IfaPlays · OrisaPlays</span>
          <h2 className="pg-section-title">{IFA_PLAY.title}</h2>
          <p className="pg-section-sub">{IFA_PLAY.subtitle}</p>
        </div>

        <div className="ifa-play">
          {/* Opening narrative */}
          <div className="ifa-play__narrative">
            {IFA_PLAY.opening.split('\n\n').map((para, i) => (
              <p key={i} className="ifa-play__para">{para}</p>
            ))}
          </div>

          {!chosen && (
            <div className="ifa-play__choices">
              <div className="ifa-play__choices-label">Choose your action:</div>
              <div className="ifa-play__choices-grid">
                {IFA_PLAY.choices.map(c => (
                  <button key={c.id}
                    className="ifa-play__choice"
                    style={{'--cc': c.color}}
                    onClick={() => choose(c)}>
                    <span className="ifa-play__choice-id">{c.id}</span>
                    <span className="ifa-play__choice-text">{c.text}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {chosen && odu && (
            <div className={`ifa-play__outcome${revealed ? ' ifa-play__outcome--in' : ''}`}
                 style={{'--cc': chosen.color, '--oc': odu.color}}>
              {/* Choice echo */}
              <div className="ifa-play__chosen">
                <span className="ifa-play__chosen-id" style={{color: chosen.color}}>{chosen.id}</span>
                <span className="ifa-play__chosen-text">{chosen.text}</span>
              </div>

              {/* Orisa response */}
              <div className="ifa-play__orisa-resp">
                <div className="ifa-play__orisa-icon">⊕</div>
                <p className="ifa-play__orisa-text">{chosen.orisa}</p>
              </div>

              {/* Odu reveal */}
              <div className="ifa-play__odu-reveal" style={{'--oc': odu.color}}>
                <div className="ifa-play__odu-label">The Odu Speaks —</div>
                <div className="ifa-play__odu-name">{odu.meji}</div>
                <div className="ifa-play__odu-code">
                  {odu.code.split('').map((b, i) => (
                    <span key={i} className="ifa-play__bit">{b === '1' ? '○' : '|'}</span>
                  ))}
                </div>
                <p className="ifa-play__verse">{chosen.verse}</p>
                <div className="ifa-play__lesson">
                  <span className="ifa-play__lesson-label">Lesson:</span>
                  {chosen.lesson}
                </div>
              </div>

              <button className="ifa-play__replay" onClick={reset}>↺ Play Again</button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── AYO-OLOPONFA GAME SPOTLIGHT ─────────────────────────────────────────────

function AyoGameSpotlight() {
  const SEEDS = [8,8,8,8,8,8,8,8, 8,8,8,8,8,8,8,8];
  const [seeds, setSeeds] = useState(SEEDS);
  const [active, setActive] = useState(null);
  const [caption, setCaption] = useState('A 5,000+ year-old Yoruba strategy game — now playable on the IFA Internet.');

  function pickHole(idx) {
    if (idx > 7) return; // only bottom row (0–7) for demo
    const s = [...seeds];
    if (s[idx] === 0) return;
    const count = s[idx];
    s[idx] = 0;
    let cur = idx;
    for (let i = 0; i < count; i++) {
      cur = (cur + 1) % 16;
      if (cur === idx) cur = (cur + 1) % 16;
      s[cur]++;
    }
    setSeeds(s);
    setActive(cur);
    const msgs = [
      'Each seed sown is a decision made — wisdom grows from deliberate action.',
      'In Ayo, strategy is patience shaped by timing. The board reveals the mind.',
      'The ancient game of the Yoruba — move and counter-move, life in miniature.',
      'Ayo-Oloponfa: where mathematics meets tradition. Every move counts.',
      '16 holes, 128 seeds — the board mirrors the 16 principal Odu Ifa.',
      'Sow with wisdom. The seeds return what you give, multiplied by patience.',
    ];
    setCaption(msgs[Math.floor(Math.random() * msgs.length)]);
    setTimeout(() => setActive(null), 600);
  }

  function resetBoard() { setSeeds(SEEDS); setCaption('A 5,000+ year-old Yoruba strategy game — now playable on the IFA Internet.'); }

  return (
    <section className="ayo-spotlight" id="ayo-game">
      <div className="ayo-spotlight__glow-a" />
      <div className="ayo-spotlight__glow-b" />
      <div className="pg-container" style={{position:'relative',zIndex:1}}>
        <div className="ayo-spotlight__inner">

          {/* Left: text + CTA */}
          <div className="ayo-spotlight__copy">
            <div className="ayo-spotlight__badge">
              <span className="ayo-spotlight__badge-dot" />
              Now Live on Play IFA Games
            </div>
            <h2 className="ayo-spotlight__title">
              Ayo-Oloponfa
            </h2>
            <p className="ayo-spotlight__yoruba">Ayò Ọlọ́pọ́n Ifá</p>
            <p className="ayo-spotlight__desc">
              The sacred strategy game of the Yoruba — one of humanity's oldest board games,
              now alive on the IFA Internet. 16 holes, 128 seeds, infinite wisdom.
              Rooted in the mathematics of Odu Ifa and the spirit of play.
            </p>
            <div className="ayo-spotlight__tags">
              {['Strategy Game','Yoruba Heritage','16 Holes · 128 Seeds','2 Players','IFA Internet'].map((t,i) => (
                <span key={i} className="ayo-spotlight__tag">{t}</span>
              ))}
            </div>
            <div className="ayo-spotlight__ctas">
              <a href="https://www.playifagames.org/ayo-oloponfa/"
                 target="_blank" rel="noopener noreferrer"
                 className="ayo-spotlight__play-btn">
                <span className="ayo-spotlight__play-icon">▶</span>
                Play Ayo-Oloponfa
                <span className="ayo-spotlight__play-arrow">↗</span>
              </a>
              <a href="https://www.playifagames.org/ayo-oloponfa/"
                 target="_blank" rel="noopener noreferrer"
                 className="ayo-spotlight__site-link">
                playifagames.org ↗
              </a>
            </div>
          </div>

          {/* Right: mini interactive board preview */}
          <div className="ayo-spotlight__board-wrap">
            <div className="ayo-spotlight__board-label">Mini Board Preview</div>
            <div className="ayo-board">
              {/* Top row (opponent) — left to right = holes 15..8 */}
              <div className="ayo-board__row ayo-board__row--top">
                {[15,14,13,12,11,10,9,8].map(i => (
                  <div key={i} className={`ayo-hole${active===i?' ayo-hole--active':''}`}>
                    <div className="ayo-hole__pit">
                      {Array.from({length: Math.min(seeds[i],6)}, (_,k) => (
                        <span key={k} className="ayo-seed" />
                      ))}
                      {seeds[i] > 6 && <span className="ayo-hole__count">+{seeds[i]-6}</span>}
                    </div>
                    <div className="ayo-hole__num">{seeds[i]}</div>
                  </div>
                ))}
              </div>
              {/* Mid divider */}
              <div className="ayo-board__divider">
                <span className="ayo-board__divider-text">Ayo-Oloponfa · Àgò</span>
              </div>
              {/* Bottom row (player) — left to right = holes 0..7 */}
              <div className="ayo-board__row ayo-board__row--bottom">
                {[0,1,2,3,4,5,6,7].map(i => (
                  <button key={i}
                    className={`ayo-hole ayo-hole--playable${active===i?' ayo-hole--active':''}${seeds[i]===0?' ayo-hole--empty':''}`}
                    onClick={() => pickHole(i)}
                    title={`Hole ${i+1}: ${seeds[i]} seeds`}>
                    <div className="ayo-hole__pit">
                      {Array.from({length: Math.min(seeds[i],6)}, (_,k) => (
                        <span key={k} className="ayo-seed ayo-seed--player" />
                      ))}
                      {seeds[i] > 6 && <span className="ayo-hole__count">+{seeds[i]-6}</span>}
                    </div>
                    <div className="ayo-hole__num">{seeds[i]}</div>
                  </button>
                ))}
              </div>
              <button className="ayo-board__reset" onClick={resetBoard}>Reset Board</button>
            </div>
            <p className="ayo-spotlight__board-caption">{caption}</p>
            <p className="ayo-spotlight__board-hint">Tap bottom holes to sow seeds · <a href="https://www.playifagames.org/ayo-oloponfa/" target="_blank" rel="noopener noreferrer">Play the full game ↗</a></p>
          </div>

        </div>
      </div>
    </section>
  );
}

// ─── IFA DANCE SECTION ────────────────────────────────────────────────────────

function IfaDanceSpotlight({ solo, onClose }) {
  const m = DANCE_META[solo.id];
  return (
    <div className="ifd-spotlight" style={{'--dc': solo.color}}>
      <div className="ifd-spotlight__stage">
        <div className="ifd-spotlight__beam" />
        <div className="ifd-spotlight__ring ifd-spotlight__ring--outer" />
        <div className="ifd-spotlight__ring ifd-spotlight__ring--inner" />
        <div
          className={`ifd-spotlight__figure ifd-dancer--${solo.id}`}
          style={{
            '--dc': solo.color,
            animationDuration: m.dur,
            animationTimingFunction: m.ease,
          }}
        >
          <div className="ifd-marks-lg">
            {solo.code.split('').map((b, j) => (
              <div key={j} className="ifd-marks-lg__row">
                <span className={`ifd-mark-lg ifd-mark-lg--${b === '1' ? 'on' : 'off'}`} />
                <span className={`ifd-mark-lg ifd-mark-lg--${b === '1' ? 'on' : 'off'}`} />
              </div>
            ))}
          </div>
          <div className="ifd-spotlight__figure-name">{solo.meji}</div>
        </div>
      </div>
      <div className="ifd-spotlight__info">
        <div className="ifd-spotlight__num">{String(solo.num).padStart(2,'0')}</div>
        <div className="ifd-spotlight__meji">{solo.meji}</div>
        <div className="ifd-spotlight__tagline">{solo.tagline}</div>
        <div className="ifd-spotlight__field">{solo.field}</div>
        <div className="ifd-spotlight__dance-label">
          <span className="ifd-spotlight__note">♪</span>
          {m.label}
        </div>
        <div className="ifd-spotlight__poem">
          {solo.poem.split('\n').slice(0, 4).map((l, i) => (
            l ? <p key={i} className="ifd-spotlight__poem-line">{l}</p> : null
          ))}
        </div>
        <button className="ifd-spotlight__close" onClick={onClose}>✕ Exit Spotlight</button>
      </div>
    </div>
  );
}

function IfaDanceSection() {
  const [solo, setSolo] = useState(null);

  function toggleSolo(odu) {
    setSolo(prev => prev?.id === odu.id ? null : odu);
  }

  return (
    <section className="pg-section" id="ifa-dance">
      <div className="pg-container">
        <div className="pg-section-header">
          <span className="pg-eyebrow pg-eyebrow--amber">Ifa Art · Creative Movement</span>
          <h2 className="pg-section-title">The IfaDance</h2>
          <p className="pg-section-sub">
            All 16 Odu Ifa in perpetual motion — each dancing its own unique creative expression,
            choreographed to the energy, field, and living essence of that Odu.
            Click any dancer to bring it into the spotlight.
          </p>
        </div>

        {/* Stage */}
        <div className="ifd-stage">
          <div className="ifd-stage__glow ifd-stage__glow--l" />
          <div className="ifd-stage__glow ifd-stage__glow--r" />
          <div className="ifd-stage__glow ifd-stage__glow--c" />
          <div className="ifd-grid">
            {ODU.map(odu => {
              const m = DANCE_META[odu.id];
              const isSolo = solo?.id === odu.id;
              return (
                <button
                  key={odu.id}
                  className={`ifd-dancer ifd-dancer--${odu.id}${isSolo ? ' ifd-dancer--solo' : ''}`}
                  style={{
                    '--dc': odu.color,
                    animationDuration: m.dur,
                    animationTimingFunction: m.ease,
                    animationDelay: m.delay,
                  }}
                  onClick={() => toggleSolo(odu)}
                  title={`${odu.meji} — ${odu.tagline}`}
                >
                  <div className="ifd-marks">
                    {odu.code.split('').map((b, j) => (
                      <div key={j} className="ifd-marks__row">
                        <span className={`ifd-mark ifd-mark--${b === '1' ? 'on' : 'off'}`} />
                        <span className={`ifd-mark ifd-mark--${b === '1' ? 'on' : 'off'}`} />
                      </div>
                    ))}
                  </div>
                  <div className="ifd-dancer__num">{String(odu.num).padStart(2,'0')}</div>
                  <div className="ifd-dancer__name">{odu.meji}</div>
                  <div className="ifd-dancer__label">{m.label}</div>
                  <div className="ifd-dancer__glow" />
                </button>
              );
            })}
          </div>
          <p className="ifd-hint">Click any Odu to spotlight · All 16 dancing simultaneously</p>
        </div>

        {/* Spotlight */}
        {solo && <IfaDanceSpotlight solo={solo} onClose={() => setSolo(null)} />}
      </div>
    </section>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────

function PlaygroundFooter() {
  return (
    <footer className="pg-footer">
      <div className="pg-footer__inner">
        <div className="pg-footer__brand">
          <strong>Ifart &amp; Orisart Playground</strong><br/>
          A creative studio of <strong>Ifa Art &amp; Orisa Art</strong> on the IFA Internet<br/>
          <span style={{color:'#505869'}}>iTOE by CENProject · 256 Odu Ifa</span>
        </div>
        <div className="pg-footer__links">
          <a href="../" className="pg-footer__link">← Ifa Art</a>
          <a href="../../" className="pg-footer__link">IFA Internet</a>
          <a href="../../ebology-test/" className="pg-footer__link">Ebology</a>
          <a href="./ilu-ilu/" className="pg-footer__link pg-footer__link--ilu">🥁 Ìlú-Ìlù</a>
          <a href="https://www.playifagames.org/ayo-oloponfa/" target="_blank" rel="noopener noreferrer" className="pg-footer__link pg-footer__link--game">▶ Ayo-Oloponfa</a>
          <a href="https://ifainternet.org" target="_blank" rel="noopener noreferrer" className="pg-footer__link">ifainternet.org ↗</a>
          <a href="https://toe.cenproject.org" target="_blank" rel="noopener noreferrer" className="pg-footer__link">ToE ↗</a>
        </div>
      </div>
    </footer>
  );
}

// ─── APP ROOT ────────────────────────────────────────────────────────────────

function App() {
  return (
    <>
      <PlaygroundHeader />
      <main>
        <PlaygroundHero />
        <PlaygroundZonesSection />
        <DivinationSimulator />
        <IfaDanceSection />
        <PoetryCorner />
        <PatternStudio />
        <OrisaCardGallery />
        <IfaPlaySection />
        <AyoGameSpotlight />
      </main>
      <PlaygroundFooter />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
