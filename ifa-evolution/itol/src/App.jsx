/* ─────────────────────────────────────────────────────────────────────────────
   Igi Ìyè Ifá — The Ifa Tree of Life (iToL) Explorer
   The IFA Internet · CENProject
───────────────────────────────────────────────────────────────────────────── */

const { useState } = React;

// ─── ODU 16 ──────────────────────────────────────────────────────────────────

const ODU_16 = [
  { n:'01', name:'Ogbé',      letter:'S',  type:'O', color:'#f0920c', code:'1111' },
  { n:'02', name:'Òyèkú',    letter:'I',  type:'I', color:'#6366f1', code:'0000' },
  { n:'03', name:'Ìwòrì',    letter:'D',  type:'O', color:'#14b8d4', code:'0110' },
  { n:'04', name:'Òdí',      letter:'E',  type:'I', color:'#00c87c', code:'1001' },
  { n:'05', name:'Ìrosùn',   letter:'C',  type:'O', color:'#ef4444', code:'1100' },
  { n:'06', name:'Òwónrín',  letter:'H',  type:'I', color:'#8b5cf6', code:'0011' },
  { n:'07', name:'Òbàrà',    letter:'R',  type:'O', color:'#3b9eff', code:'1000' },
  { n:'08', name:'Òkànràn',  letter:'X',  type:'I', color:'#ec4899', code:'0001' },
  { n:'09', name:'Ògúndá',   letter:'S′', type:'O', color:'#f0920c', code:'1110' },
  { n:'10', name:'Òsá',      letter:'I′', type:'I', color:'#6366f1', code:'0111' },
  { n:'11', name:'Ìká',      letter:'D′', type:'O', color:'#14b8d4', code:'0100' },
  { n:'12', name:'Òtúrúpòn', letter:'E′', type:'I', color:'#00c87c', code:'0010' },
  { n:'13', name:'Òtúrá',    letter:'C′', type:'O', color:'#ef4444', code:'1011' },
  { n:'14', name:'Ìrètè',    letter:'H′', type:'I', color:'#8b5cf6', code:'1101' },
  { n:'15', name:'Òsè',      letter:'R′', type:'O', color:'#3b9eff', code:'1010' },
  { n:'16', name:'Òfún',     letter:'X′', type:'I', color:'#ec4899', code:'0101' },
];

// ─── ODU 256 ─────────────────────────────────────────────────────────────────

const ODU_256 = ODU_16.map((p, i) => ({
  ...p,
  id: `oju-${i}`,
  children: ODU_16.map((c, j) => ({
    id: `odu-${i}-${j}`,
    num: `${p.n}:${c.n}`,
    name: i === j ? `${p.name} Méjì` : `${p.name} ${c.name}`,
    fullCode: p.code + c.code,
    parentColor: p.color,
    childColor: c.color,
    isMeji: i === j,
    parentName: p.name,
    childName: c.name,
  })),
}));

// ─── IFABIT MARK ─────────────────────────────────────────────────────────────

function IFABitMark({ bits, color, size }) {
  return (
    <div className={`ifabit-mark${size ? ' ifabit-mark--' + size : ''}`}
         style={{ '--mark-color': color }}>
      {bits.split('').map((bit, idx) => (
        <div key={idx} className="ifabit-mark__row">
          {bit === '1'
            ? <div className="ifabit-mark__line" />
            : <>
                <div className="ifabit-mark__line ifabit-mark__line--h" />
                <div className="ifabit-mark__line ifabit-mark__line--h" />
              </>
          }
        </div>
      ))}
    </div>
  );
}

// ─── DATA ────────────────────────────────────────────────────────────────────

const CAPABILITIES = [
  { num:'01', sym:'⬡', title:'Evolutionary Mapping', color:'#00e676',
    body:'Visualise the relationships among diverse life forms across the full Ifa Tree of Life. Evolutionary Mapping in iToL applies the Ifa Tree Dafa Structure to render the complete web of evolutionary connections — from the earliest common ancestor to all living and extinct organisms — encoded in the 16 Ifa Binary Codes.' },
  { num:'02', sym:'◉', title:'Interdisciplinary Insights', color:'#8b5cf6',
    body:'Integrate data from biology, archaeology, anthropology, genetics, paleontology, and all related sciences into a unified iToL framework. Interdisciplinary Insights reflects Ifa Evolution\'s core position that the Tree of Life cannot be understood through any single lens — it requires the full spectrum of the 256 Odu Ifa as the integrating matrix.' },
  { num:'03', sym:'Ψ', title:'Consciousness Studies', color:'#f0920c',
    body:'Explore the origins and mechanisms of awareness, intelligence, and consciousness as they emerge across the evolutionary Tree of Life. Consciousness Studies in iToL applies the CEN field (Consciousness-Energy-Nature) to evolutionary science — tracing how consciousness has evolved from the first proto-cells to complex sentient beings.' },
  { num:'04', sym:'⊕', title:'Genetic Lineage Tracing', color:'#f5c518',
    body:'Track hereditary connections across species, populations, and evolutionary lineages using the Ifa Tree Dafa Structure. Genetic Lineage Tracing maps the molecular and genomic evidence for evolutionary relationships into the iToL — aligning the findings of modern genomics (including tools like BEAST, IQ-TREE, and BOLD) with the axiomatic Ifa framework.' },
  { num:'05', sym:'⧖', title:'Geological Contextualization', color:'#14b8d4',
    body:'Examine life\'s evolution through the geological layers of Earth — connecting fossil evidence, stratigraphic data, and deep-time chronologies with the iToL. Geological Contextualization uses resources like the Paleobiology Database and TimeTree of Life to situate each branch of Igi Ìyè Ifá within its proper moment in deep evolutionary time.' },
];

const TOOL_CATEGORIES = [
  {
    title: 'Databases & Taxonomies',
    color: '#00e676',
    tools: [
      { name:'Ewé',               desc:'Yoruba herbal & Isese plant/animal knowledge',    url:'https://www.ewe.com.ng/' },
      { name:'Open Tree of Life', desc:'2.3M species from 2,000+ published phylogenies', url:'https://tree.opentreeoflife.org/' },
      { name:'NCBI Taxonomy',     desc:'160,000+ organisms with molecular data',         url:'https://www.ncbi.nlm.nih.gov/Taxonomy/' },
      { name:'TimeTree (TToL5)',  desc:'Divergence times for 137,306 species',           url:'https://timetree.org/' },
      { name:'GTDB',              desc:'Genome taxonomy for 900K+ bacterial genomes',    url:'https://gtdb.ecogenomic.org/' },
      { name:'Paleobiology DB',   desc:'1.38M+ fossil occurrences, 373,000+ taxa',       url:'https://www.paleobiodb.org/' },
      { name:'BOLD',              desc:'1.7M+ DNA barcodes for species ID',              url:'https://boldsystems.org/' },
    ],
  },
  {
    title: 'Inference Software',
    color: '#8b5cf6',
    tools: [
      { name:'IQ-TREE 2',   desc:'Fast maximum likelihood phylogenetic inference',    url:'https://iqtree.github.io/' },
      { name:'BEAST',       desc:'Bayesian framework with molecular clock analysis',   url:'http://beast.bio.ed.ac.uk/' },
      { name:'RAxML',       desc:'Large-scale maximum likelihood for HPC',             url:'https://cme.h-its.org/exelixis/web/software/raxml/' },
      { name:'MrBayes',     desc:'Bayesian inference with posterior probability trees', url:'https://nbisweden.github.io/MrBayes/' },
      { name:'MEGA',        desc:'User-friendly multi-method phylogenetics',            url:'https://www.megasoftware.net/' },
    ],
  },
  {
    title: 'Visualisation Tools',
    color: '#f0920c',
    tools: [
      { name:'iTOL',        desc:'Browser-based annotation and display platform',    url:'https://itol.embl.de/' },
      { name:'OneZoom',     desc:'Fractal deep-zoom explorer, 1.5M+ tips',          url:'https://www.onezoom.org/' },
      { name:'Lifemap',     desc:'OpenStreetMap-style 800K–2.2M species explorer',  url:'https://lifemap.univ-lyon1.fr/' },
      { name:'FigTree',     desc:'Publication-quality desktop tree visualisation',   url:'http://tree.bio.ed.ac.uk/software/figtree/' },
      { name:'Dendroscope', desc:'Optimised for hundreds of thousands of taxa',      url:'https://software.sanger.ac.uk/dendroscope/' },
    ],
  },
  {
    title: 'Research Initiatives',
    color: '#f5c518',
    tools: [
      { name:'Earth BioGenome Project', desc:'Sequencing all 1.67M eukaryotic species',         url:'https://www.earthbiogenome.org/' },
      { name:'1000 Genomes Project',    desc:'Reference genomes across phylogenetic lineages',   url:'https://www.1000genomes.org/' },
      { name:'BIOSCAN / iBOL',          desc:'DNA barcoding 2.5M species, 25+ nations',         url:'https://ibol.org/' },
      { name:'iNaturalist',             desc:'200M+ citizen science biodiversity observations',  url:'https://www.inaturalist.org/' },
      { name:'Periodic Table of Life (NASA)', desc:'AI framework applying biological principles to system design', url:'https://software.nasa.gov/software/LEW-19879-1' },
    ],
  },
  {
    title: 'Consciousness & Origin of Life',
    color: '#14b8d4',
    tools: [
      { name:'UAL Framework',             desc:'Maps consciousness onto phylogenetic trees (Ginsburg & Jablonka)', url:'https://link.springer.com/article/10.1007/s10539-020-09772-0' },
      { name:'BioConsciousness Program',  desc:'Links origin of life to origin of consciousness',                 url:'https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2025.1636473/full' },
      { name:'Evolution of Consciousness',desc:'Neuroscience + phylogeny — traces consciousness emergence',       url:'https://www.ncbi.nlm.nih.gov/books/NBK231624/' },
      { name:'Origin of Life Early-career Network', desc:'Global network for early-career origin-of-life researchers', url:'https://oolen.org/' },
    ],
  },
];

const IFABINARIES = [
  { code:'11111111', odu:'Ogbé' },
  { code:'00000000', odu:'Òyèkú' },
  { code:'11001100', odu:'Ìwòrì' },
  { code:'00110011', odu:'Òdí' },
  { code:'11001100', odu:'Ìrosùn' },
  { code:'00110011', odu:'Òwónrín' },
  { code:'11110000', odu:'Òbàrà' },
  { code:'00001111', odu:'Òkànràn' },
  { code:'11111100', odu:'Ògúndá' },
  { code:'00000011', odu:'Òsá' },
  { code:'11000011', odu:'Ìká' },
  { code:'00111100', odu:'Òtúrúpòn' },
  { code:'11100001', odu:'Òtúrá' },
  { code:'00011110', odu:'Ìrètè' },
  { code:'11010101', odu:'Òsè' },
  { code:'00101010', odu:'Òfún' },
];

const STEPS = [
  { num:'01', title:'Initiate Inquiry', color:'#00e676',
    body:'Begin by accessing the Ifa Tree of Life framework — setting the foundation for exploring evolutionary relationships and scientific data integration through the Igi Ìyè Ifá Meta-Data Structure.' },
  { num:'02', title:'Analytical Exploration', color:'#8b5cf6',
    body:'Delve into comparative analyses of biological and geological data, utilising the iToL\'s five capabilities to deepen understanding of life\'s origins and evolutionary pathways.' },
  { num:'03', title:'Synthesise Findings', color:'#f0920c',
    body:'Consolidate discoveries to generate coherent models of evolutionary pathways — enhancing understanding of life\'s complex history through the axiomatic lens of the 256 Odu Ifa.' },
];

function toIfaMarks(code4) {
  // | = Ogbé (1, single mark)  ‖ = Oyeku (0, double mark)
  return code4.split('').map(b => b === '1' ? '|' : '‖').join(' ');
}

// ─── RADIAL DIAGRAM ───────────────────────────────────────────────────────────

function IToLRadial() {
  const nodeLabels = [
    'Evolutionary\nMapping',
    'Interdisciplinary\nInsights',
    'Consciousness\nStudies',
    'Genetic\nLineage',
    'Geological\nContext',
  ];
  return (
    <div className="itol-radial" aria-hidden="true">
      <div className="itol-radial__ring itol-radial__ring--1" />
      <div className="itol-radial__ring itol-radial__ring--2" />
      <div className="itol-radial__ring itol-radial__ring--3" />
      <div className="itol-radial__arc itol-radial__arc--1" />
      <div className="itol-radial__arc itol-radial__arc--2" />
      {nodeLabels.map((label, i) => (
        <div key={i} className={`itol-radial__node itol-radial__node--${i}`}>
          <div className="itol-radial__node-dot" style={{animationDelay: `${i * 0.4}s`}} />
          <div className="itol-radial__node-text">{label}</div>
        </div>
      ))}
      <div className="itol-radial__core">
        <span className="itol-radial__core-label">iToL</span>
        <span className="itol-radial__core-sub">Explorer</span>
      </div>
    </div>
  );
}

// ─── IFA TREE GRAPHIC ─────────────────────────────────────────────────────────

function IfaTreeGraphic() {
  const CX = 260;
  const TY = 415;

  const CROWNS = [
    { x: 260, y: 55,  odu: 'Ogbé',      c: '#f5d020' },
    { x: 155, y: 126, odu: 'Ìwòrì',     c: '#a3e635' },
    { x: 260, y: 120, odu: 'Òyèkú',     c: '#a3e635' },
    { x: 365, y: 126, odu: 'Òdí',       c: '#a3e635' },
    { x: 62,  y: 198, odu: 'Ìrosùn',    c: '#14b8d4' },
    { x: 182, y: 191, odu: 'Òwónrín',   c: '#14b8d4' },
    { x: 338, y: 191, odu: 'Òbàrà',     c: '#14b8d4' },
    { x: 458, y: 198, odu: 'Òkànràn',   c: '#14b8d4' },
    { x: 95,  y: 266, odu: 'Ògúndá',    c: '#a78bfa' },
    { x: 210, y: 260, odu: 'Òsá',       c: '#a78bfa' },
    { x: 310, y: 260, odu: 'Ìká',       c: '#a78bfa' },
    { x: 425, y: 266, odu: 'Òtúrúpòn',  c: '#a78bfa' },
    { x: 52,  y: 334, odu: 'Òtúrá',     c: '#f0920c' },
    { x: 178, y: 328, odu: 'Ìrètè',     c: '#f0920c' },
    { x: 342, y: 328, odu: 'Òsè',       c: '#f0920c' },
    { x: 468, y: 334, odu: 'Òfún',      c: '#f0920c' },
  ];

  function makeFronds(cx, cy, col, r) {
    const els = [];
    for (let i = 0; i < 9; i++) {
      const a = (i / 9) * 2 * Math.PI - Math.PI / 2;
      const droop = r * 0.38;
      const ex = cx + Math.cos(a) * r;
      const ey = cy + Math.sin(a) * r + droop;
      const cpx = cx + Math.cos(a) * r * 0.52;
      const cpy = cy + Math.sin(a) * r * 0.52 + droop * 0.42;
      els.push(
        <path key={i}
          d={`M${cx},${cy} Q${cpx.toFixed(1)},${cpy.toFixed(1)} ${ex.toFixed(1)},${ey.toFixed(1)}`}
          stroke={col} strokeWidth="1.9" fill="none" strokeLinecap="round" opacity="0.88"
        />
      );
    }
    return els;
  }

  function branchD(cx, cy) {
    const mx = CX * 0.35 + cx * 0.65;
    const my = TY - 28;
    return `M${CX},${TY} C${CX},${TY - 80} ${mx.toFixed(1)},${my} ${cx},${cy}`;
  }

  return (
    <div style={{width:'100%',maxWidth:'520px',margin:'0 auto'}}>
      <svg viewBox="0 0 520 595" style={{width:'100%',height:'auto',display:'block'}}
        aria-label="Igi Ìyè Ifá — The Ifa Tree of Life with 16 Odu Heads">
        <defs>
          <radialGradient id="ift-bg" cx="50%" cy="40%">
            <stop offset="0%" stopColor="#071a12"/>
            <stop offset="100%" stopColor="#020b06"/>
          </radialGradient>
          <linearGradient id="ift-trunk" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="#2b1506"/>
            <stop offset="45%"  stopColor="#5e3410"/>
            <stop offset="55%"  stopColor="#6a3c12"/>
            <stop offset="100%" stopColor="#2b1506"/>
          </linearGradient>
        </defs>

        {/* Background */}
        <rect width="520" height="595" fill="url(#ift-bg)" rx="10"/>

        {/* Ground glow */}
        <ellipse cx="260" cy="550" rx="95" ry="11" fill="#14b8d4" opacity="0.07"/>
        <line x1="130" y1="550" x2="390" y2="550" stroke="#1a3525" strokeWidth="1" opacity="0.38"/>

        {/* Roots */}
        <path d="M251,543 Q199,536 160,550" stroke="#3a1e07" strokeWidth="7"   fill="none" strokeLinecap="round" opacity="0.70"/>
        <path d="M253,544 Q226,539 207,548" stroke="#3a1e07" strokeWidth="4.5" fill="none" strokeLinecap="round" opacity="0.58"/>
        <path d="M259,545 Q259,549 257,558" stroke="#3a1e07" strokeWidth="8"   fill="none" strokeLinecap="round" opacity="0.48"/>
        <path d="M267,544 Q293,539 313,548" stroke="#3a1e07" strokeWidth="4.5" fill="none" strokeLinecap="round" opacity="0.58"/>
        <path d="M269,543 Q321,536 360,550" stroke="#3a1e07" strokeWidth="7"   fill="none" strokeLinecap="round" opacity="0.70"/>

        {/* Trunk */}
        <path
          d={`M248,543 C246,486 244,454 ${CX-12},${TY} L${CX+12},${TY} C${CX+16},454 ${CX+16},486 272,543 Z`}
          fill="url(#ift-trunk)"
        />
        {/* Ring marks (leaf scars) */}
        {[432,452,471,490,509,527].map((y,i) => (
          <ellipse key={i} cx={CX} cy={y} rx={13 - i * 0.3} ry="2.1"
            stroke="#1c0e05" strokeWidth="0.8" fill="none" opacity="0.42"/>
        ))}
        {/* Trunk highlight */}
        <path d={`M254,535 C253,478 252,448 ${CX-5},${TY+2}`}
          stroke="#8a5520" strokeWidth="1.5" fill="none" opacity="0.22" strokeLinecap="round"/>

        {/* Branches */}
        {CROWNS.map((c,i) => (
          <path key={`b${i}`} d={branchD(c.x, c.y)}
            stroke="#3a1e07" strokeWidth={i===0 ? 3 : 1.7}
            fill="none" strokeLinecap="round" opacity="0.80"/>
        ))}

        {/* Crown glow halos */}
        {CROWNS.map((c,i) => (
          <circle key={`g${i}`} cx={c.x} cy={c.y} r="20" fill={c.c} opacity="0.07"/>
        ))}

        {/* Palm fronds */}
        {CROWNS.map((c,i) => (
          <g key={`f${i}`}>{makeFronds(c.x, c.y, c.c, 22)}</g>
        ))}

        {/* Crown nodes */}
        {CROWNS.map((c,i) => (
          <circle key={`n${i}`} cx={c.x} cy={c.y} r={i===0 ? 5 : 3.1}
            fill={c.c} opacity="0.92"/>
        ))}

        {/* Odu labels */}
        {CROWNS.map((c,i) => (
          <text key={`l${i}`} x={c.x} y={c.y + 34}
            textAnchor="middle" fill={c.c}
            fontSize="8" fontFamily="system-ui,sans-serif"
            opacity="0.72" letterSpacing="0.2">
            {c.odu}
          </text>
        ))}

        {/* Caption */}
        <text x="260" y="572" textAnchor="middle"
          fill="#14b8d4" fontSize="10.5" fontFamily="system-ui,sans-serif"
          fontWeight="600" letterSpacing="3" opacity="0.80">
          IGI IYE IFA
        </text>
        <text x="260" y="585" textAnchor="middle"
          fill="#3a5545" fontSize="7.5" fontFamily="system-ui,sans-serif"
          letterSpacing="0.8">
          The Ifa Tree of Life · 16 Odu Heads
        </text>
      </svg>
    </div>
  );
}

// ─── HEADER ──────────────────────────────────────────────────────────────────

function Header() {
  return (
    <header className="header">
      <div className="header__inner">
        <a href="../" className="header__brand">
          <img src="../../src/assets/itoe_logo.png" alt="iTOE" className="header__logo" />
          <div>
            <div className="header__site">Ifa Evolution</div>
            <div className="header__name">Igi Ìyè Ifá · iToL Explorer</div>
          </div>
        </a>
        <a href="../" className="header__back">&larr; Ifa Evolution</a>
        <nav className="header__nav">
          <a className="nav-link" href="#definition">Definition</a>
          <a className="nav-link" href="#capabilities">Capabilities</a>
          <a className="nav-link" href="#tools">Tools</a>
          <a className="nav-link" href="#structure">Structure</a>
          <a className="nav-link" href="#path">Path</a>
        </nav>
      </div>
    </header>
  );
}

// ─── MOBILE BAR ──────────────────────────────────────────────────────────────

function MobileBar() {
  const items = [
    { sym: '⌂',  label: 'Home',         href: '../../' },
    { sym: '∞',  label: 'Ifa Evol',     href: '../' },
    { sym: '⬡',  label: 'Capabilities', href: '#capabilities' },
    { sym: '⊕',  label: 'Tools',        href: '#tools' },
    { sym: '⧜',  label: 'Structure',    href: '#structure' },
  ];
  return (
    <nav className="mobile-bar" aria-label="Mobile navigation">
      <div className="mobile-bar__row">
        {items.map(it => (
          <a key={it.label} className="mobile-bar__item" href={it.href}>
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
  const chips = [
    'Evolutionary Mapping',
    'Interdisciplinary Insights',
    'Consciousness Studies',
    'Genetic Lineage Tracing',
    'Geological Contextualization',
  ];
  const heroStats = [
    { sym:'⬡', label:'Evolutionary Mapping',     sub:'Full iToL Navigation' },
    { sym:'◉', label:'Interdisciplinary',         sub:'All Fields Integrated' },
    { sym:'Ψ', label:'Consciousness Studies',     sub:'CEN Field Applied' },
    { sym:'⊕', label:'Genetic Lineage',           sub:'Molecular Tracing' },
    { sym:'⧖', label:'Geological Context',        sub:'Deep Time Mapping' },
  ];
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
            The IFA Internet &mdash; iToL Explorer
          </div>

          <h1 className="hero__title">
            <span className="hero__title-main">Igi Ìyè Ifá</span>
            <span className="hero__title-sub">The Ifa Tree of Life (iToL) Explorer</span>
          </h1>

          <p className="hero__tagline">
            Ifa Life Sciences &middot; Evolutionary Research &middot; 256 Odu Ifa
          </p>

          <p className="hero__desc">
            Ọ̀pẹ̀-Níkin Olórí Mẹ́rìndínlógún, the <strong>Igi Ìyè Ifá</strong> (iToL) Explorer is the dedicated research environment for mapping all evolutionary relationships through the <strong>Ifa Tree Dafa Structure</strong> — integrating biology, genetics, consciousness studies, geology, and interdisciplinary insights into the universal Tree of Life grounded in the 256 Odu Ifa.
          </p>

          <div className="hero__chips">
            {chips.map((c, i) => (
              <span key={i} className="hero__chip">{c}</span>
            ))}
          </div>

          <div className="hero__ctas">
            <a href="#capabilities" className="btn btn--primary">Explore Capabilities</a>
            <a href="../" className="btn btn--ghost">&larr; Ifa Evolution</a>
          </div>
        </div>

        <div className="hero__right" aria-hidden="true">
          <IfaTreeGraphic />
          <p style={{textAlign:'center',color:'#14b8d4',fontSize:'0.82rem',letterSpacing:'0.04em',marginTop:'8px',opacity:0.75}}>
            The IfaTree: Igi Ọ̀pẹ̀ Àgùnká
          </p>
        </div>
      </div>

      <div className="hero__stats-bar">
        <div className="container">
          <div className="hero__stats">
            {heroStats.map((s, i) => (
              <div key={i} className="hero__stat">
                <div className="hero__stat-sym">{s.sym}</div>
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

// ─── DEFINITION SECTION ──────────────────────────────────────────────────────

function DefinitionSection() {
  return (
    <section className="section" id="definition">
      <div className="container">
        <div className="def-grid">
          <div className="def-text">
            <div className="section__header">
              <span className="section__eyebrow section__eyebrow--teal">What is iToL</span>
              <h2 className="section__title">
                Igi Ìyè Ifá &mdash; <span className="accent--teal">The Ifa Tree of Life</span>
              </h2>
              <p className="section__subtitle">
                The Igi Ìyè Ifá is the universal hierarchical structure encoding all evolutionary relationships — built on the Ifa Tree Dafa Structure and the Ọ̀pẹ̀tẹ́ẹrẹ́ Principle of Ìwòrì Méjì.
              </p>
            </div>
            <div className="def-blocks">
              <div className="def-block">
                <div className="def-block__icon">🌳</div>
                <div className="def-block__content">
                  <div className="def-block__label">Igi Ìyè Ifá</div>
                  <p className="def-block__body">
                    Igi Ìyè Ifá — the "Tree of Life of Ifa" — is the IFA Internet's framework for the universal Tree of Life. It encodes all evolutionary relationships from the Ifa Root downward through every known and unknown organism, aligned with the 256 Odu Ifa as the axiomatic evolutionary matrix.
                  </p>
                </div>
              </div>
              <div className="def-block">
                <div className="def-block__icon">⧜</div>
                <div className="def-block__content">
                  <div className="def-block__label">Ọ̀pẹ̀tẹ́ẹrẹ́ Principle</div>
                  <p className="def-block__body">
                    The Ọ̀pẹ̀tẹ́ẹrẹ́ Principle (Ìwòrì Méjì) governs hierarchical structure and branching relationships across all Ifa Data, i.e, the Dafa. It is the foundational law establishing how all life, knowledge, and existence is organised into the universal tree — from the Ifa Root to the furthest leaf node.
                  </p>
                </div>
              </div>
              <div className="def-block">
                <div className="def-block__icon">⬡</div>
                <div className="def-block__content">
                  <div className="def-block__label">Ifa Tree Dafa Structure</div>
                  <p className="def-block__body">
                    The Ifa Tree Dafa Structure (IfaTree) is the structural principle governing all Ifa Data (Dafa) on the IFA Web. It is a hierarchical parent–child system built from the 16 Ifa Binary Codes — every field, concept, and entity on the IFA Internet is a node within this universal tree.
                  </p>
                </div>
              </div>
              <div className="def-block">
                <div className="def-block__icon">🌐</div>
                <div className="def-block__content">
                  <div className="def-block__label">ToE Tree</div>
                  <p className="def-block__body">
                    The Ifa-Tree is also known as ToE Tree, Energy-Based Tree, Consciousness Tree (the Consciousness of all tree structures), or the Tree for Everything (TreeoE). The IfaTree is used to model, analyze, and study all tree structures, models, and frameworks, and unify them together.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="def-visual" aria-hidden="true">
            <div className="tree-diagram">
              <div className="tree-diagram__title">Ifa Tree Dafa Structure</div>
              <div className="tree-node">
                <div className="tree-node__item tree-node__item--root">
                  <div className="tree-node__dot tree-node__dot--amber" />
                  Ifa Root
                </div>
                <div className="tree-node__connector" />
                <div className="tree-children">
                  <div className="tree-child">
                    <div className="tree-node__item">
                      <div className="tree-node__dot" />
                      Ogbé
                    </div>
                    <div className="tree-node__connector" />
                    <div className="tree-node__item" style={{fontSize:'0.68rem', padding:'5px 8px'}}>
                      <div className="tree-node__dot" style={{width:'5px',height:'5px'}} />
                      Ogbé Méjì
                    </div>
                  </div>
                  <div className="tree-child">
                    <div className="tree-node__item">
                      <div className="tree-node__dot" />
                      Òyèkú
                    </div>
                    <div className="tree-node__connector" />
                    <div className="tree-node__item" style={{fontSize:'0.68rem', padding:'5px 8px'}}>
                      <div className="tree-node__dot" style={{width:'5px',height:'5px'}} />
                      Òyèkú Méjì
                    </div>
                  </div>
                </div>
                <div className="tree-node__connector" />
                <div style={{
                  fontSize:'0.68rem', color:'var(--text-3)',
                  textAlign:'center', letterSpacing:'0.05em', paddingTop:'4px'
                }}>
                  ··· 254 more Odu nodes ···
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── IGI GALLERY SECTION ─────────────────────────────────────────────────────

function IgiGallerySection() {
  return (
    <section className="section igi-section" id="igi-gallery">
      <div className="container">
        <div className="section__header section__header--center">
          <span className="section__eyebrow section__eyebrow--bio">Visual Reference</span>
          <h2 className="section__title">Igi Ìyè Ifá</h2>
          <p className="section__subtitle">
            Visual representations of the universal evolutionary hierarchy encoded in the Ifa Tree Dafa Structure — from the common Ifa Root to all branches of life.
          </p>
        </div>
        <div className="igi-section__grid">
          <figure className="igi-section__fig">
            <div className="igi-section__img-wrap">
              <img src="../src/Igi-Iyefa-768x490.png"
                   alt="Igi Ìyè Ifá — The Ifa Tree of Life" loading="lazy" />
            </div>
            <figcaption className="igi-section__caption">
              <span className="igi-section__caption-title">Igi Ìyè Ifá</span>
              <span className="igi-section__caption-sub">The Ifa Tree of Life</span>
            </figcaption>
          </figure>
          <figure className="igi-section__fig">
            <div className="igi-section__img-wrap">
              <img src="../src/Igi-Iyefa1-1-768x314.png"
                   alt="Igi Ìyè Ifá — Ifa Evolutionary Lineage" loading="lazy" />
            </div>
            <figcaption className="igi-section__caption">
              <span className="igi-section__caption-title">Igi Ìyè Ifá</span>
              <span className="igi-section__caption-sub">Ifa Evolutionary Lineage</span>
            </figcaption>
          </figure>
        </div>
        <p className="igi-section__note">
          These Ifa Charts are developed actively based on ancient data in Odu Ifa (Dafa), other African Indigenous Knowledge Systems (AIKS), and modern databases. The Ifa Tree of Life (iToL) Explorer is a living Platform and will be regularly updated based on the latest research findings in AIKS and modern systems.
        </p>
      </div>
    </section>
  );
}

// ─── IGI ỌPẸ̀ ÀGÙNKÁ — INTERACTIVE IFA TREE ─────────────────────────────────

function IgiTreeSection() {
  return (
    <section className="section igi-tree-section" id="igi-tree">
      <div className="container">

        <div className="section__header section__header--center">
          <span className="section__eyebrow section__eyebrow--bio">Interactive Explorer</span>
          <h2 className="section__title">
            Igi Ọ̀pẹ̀ Àgùnká &mdash; <span className="accent--bio">The Living Ifa Tree</span>
          </h2>
          <p className="section__subtitle">
            A live, searchable, and clickable 256-Odu explorer of the Igi Ìyè Ifá — transforming the static Ifa Charts into an interactive Tree of Life experience.
          </p>
        </div>

        <div className="igt-wip">
          <div className="igt-wip__icon" aria-hidden="true">
            <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="32" cy="32" r="30" stroke="#14b8d4" strokeWidth="2" strokeDasharray="6 4" opacity="0.35"/>
              <circle cx="32" cy="32" r="20" stroke="#14b8d4" strokeWidth="1.5" opacity="0.18"/>
              <circle cx="32" cy="32" r="5" fill="#14b8d4" opacity="0.7"/>
              <path d="M32 12 L32 8" stroke="#f0920c" strokeWidth="2" strokeLinecap="round"/>
              <path d="M32 56 L32 52" stroke="#f0920c" strokeWidth="2" strokeLinecap="round"/>
              <path d="M12 32 L8 32" stroke="#f0920c" strokeWidth="2" strokeLinecap="round"/>
              <path d="M56 32 L52 32" stroke="#f0920c" strokeWidth="2" strokeLinecap="round"/>
              <path d="M19.5 19.5 L16.7 16.7" stroke="#8b5cf6" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M44.5 44.5 L47.3 47.3" stroke="#8b5cf6" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M44.5 19.5 L47.3 16.7" stroke="#8b5cf6" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M19.5 44.5 L16.7 47.3" stroke="#8b5cf6" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <div className="igt-wip__badge">Development in Progress</div>
          <h3 className="igt-wip__title">Coming Soon</h3>
          <p className="igt-wip__body">
            The Igi Ọ̀pẹ̀ Àgùnká interactive explorer is actively under development — being built to bring the full 256-Odu Ifa Tree of Life to life as a searchable, clickable, and data-rich platform.
          </p>
          <div className="igt-wip__stats">
            {[['256','Odu Ifa'],['16','Oju Odu'],['2','Polarities'],['∞','Evolutionary Paths']].map(([num, lbl]) => (
              <div key={lbl} className="igt-wip__stat">
                <span className="igt-wip__stat-num">{num}</span>
                <span className="igt-wip__stat-lbl">{lbl}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

// ─── CAPABILITIES SECTION ─────────────────────────────────────────────────────

function CapabilitiesSection() {
  return (
    <section className="section section--alt" id="capabilities">
      <div className="container">
        <div className="section__header section__header--center">
          <span className="section__eyebrow section__eyebrow--teal">Five Core Capabilities</span>
          <h2 className="section__title">The iToL Research Capabilities</h2>
          <p className="section__subtitle">
            Five interconnected research capabilities through which the Igi Ìyè Ifá Explorer integrates evolutionary science with the axiomatic structure of the 256 Odu Ifa.
          </p>
        </div>

        <div className="capabilities-grid">
          {CAPABILITIES.map(c => (
            <div key={c.num} className="cap-card" style={{ '--cap-color': c.color }}>
              <div className="cap-card__bar" />
              <div className="cap-card__header">
                <div className="cap-card__sym">{c.sym}</div>
                <div className="cap-card__meta">
                  <div className="cap-card__num">{c.num}</div>
                  <div className="cap-card__title">{c.title}</div>
                </div>
              </div>
              <p className="cap-card__body">{c.body}</p>
              <div className="cap-card__glow" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── TOOLS SECTION ────────────────────────────────────────────────────────────

function ToolCategory({ cat }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`tool-category${open ? ' tool-category--open' : ''}`}
      style={{ '--cat-color': cat.color }}
    >
      <div className="tool-category__header" onClick={() => setOpen(!open)}>
        <div className="tool-category__left">
          <div className="tool-category__dot" />
          <div className="tool-category__title">{cat.title}</div>
          <div className="tool-category__count">{cat.tools.length} tools</div>
        </div>
        <div className="tool-category__chevron">▾</div>
      </div>
      <div className="tool-category__body">
        <div className="tools-list">
          {cat.tools.map((t, i) => (
            <div key={i} className="tool-item">
              <div className="tool-item__name">{t.name}</div>
              <div className="tool-item__desc">{t.desc}</div>
              {t.url && (
                <a href={t.url} className="tool-item__link"
                   target="_blank" rel="noopener noreferrer">
                  Visit
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ToolsSection() {
  return (
    <section className="section section--dark" id="tools">
      <div className="container">
        <div className="section__header section__header--center">
          <span className="section__eyebrow section__eyebrow--bio">Scientific Toolkit</span>
          <h2 className="section__title">iToL Research Tools &amp; Databases</h2>
          <p className="section__subtitle">
            The leading scientific tools, databases, and research initiatives supporting the Igi Ìyè Ifá Explorer — organised across five categories.
          </p>
        </div>

        <div className="tools-categories">
          {TOOL_CATEGORIES.map((cat, i) => (
            <ToolCategory key={i} cat={cat} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── IFA STRUCTURE SECTION ────────────────────────────────────────────────────

function IfaStructureSection() {
  return (
    <section className="section section--alt" id="structure">
      <div className="container">
        <div className="section__header section__header--center">
          <span className="section__eyebrow section__eyebrow--teal">Ifa Framework</span>
          <h2 className="section__title">The Ifa Tree Dafa Structure</h2>
          <p className="section__subtitle">
            The hierarchical knowledge organisation system underlying all iToL exploration — built from the 16 Ifa Binary Codes and the parent–child Odu Ifa relationship.
          </p>
        </div>

        <div className="structure-layout">
          <div className="structure-blocks">
            <div className="structure-block">
              <div className="structure-block__title">Ifa Nodes</div>
              <p className="structure-block__body">
                Every entity, concept, organism, and relationship on the IFA Internet is an <strong>Ifa Node</strong> — a point within the universal Ifa Tree Dafa Structure. In iToL, each species, clade, or evolutionary lineage is an Ifa Node positioned within its correct location in the Igi Ìyè Ifá — with a parent Odu Ifa governing its relationship to all adjacent nodes.
              </p>
            </div>
            <div className="structure-block">
              <div className="structure-block__title">Ifa Root</div>
              <p className="structure-block__body">
                The <strong>Ifa Root</strong> is the origin node of the entire Ifa Tree — the first common ancestor of all life, all knowledge, and all existence within the IFA Internet. In iToL, the Ifa Root corresponds to the Last Universal Common Ancestor (LUCA) of all biological life — the single point from which all branches of the Igi Ìyè Ifá descend.
              </p>
            </div>
            <div className="structure-block">
              <div className="structure-block__title">Ifa Binaries — 16 Codes</div>
              <p className="structure-block__body">
                The <strong>16 Ifa Binary Codes</strong> are the foundational structural codes from which all 256 Odu Ifa are generated. Each code is a unique binary pattern governing a specific mode of existence, transformation, and relationship — forming the axiomatic basis from which the entire Ifa Tree Dafa Structure is constructed. Each node in iToL is ultimately encoded by one of these 16 primordial patterns.
              </p>
            </div>
            <div className="structure-block">
              <div className="structure-block__title">Parent–Child Relationship</div>
              <p className="structure-block__body">
                The Ifa Tree Dafa Structure operates on a strict <strong>parent–child hierarchical relationship</strong> — where every Ifa Node has exactly one parent (except the Ifa Root) and potentially many children. In iToL, this maps directly to phylogenetic relationships: each ancestral taxon is a parent node, each derived lineage is a child node, building the complete Igi Ìyè Ifá from root to leaf.
              </p>
            </div>
          </div>

          <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
            <a href="https://ifainternet.org/ifa-periodic-table/"
               target="_blank" rel="noopener noreferrer"
               className="btn btn--primary"
               style={{fontSize:'1rem',padding:'14px 28px'}}>
              Explore the Ifa Periodic Table →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── ODU IFA NETWORK — IFAGRAM ───────────────────────────────────────────────

function OjuOduNetworkSection() {
  const [active, setActive] = useState(ODU_16[0]);

  function getSpokes(odu) {
    const idx = parseInt(odu.n, 10);
    const first7 = ODU_16.slice(0, 7).filter(o => o.n !== odu.n);
    if (idx <= 7) {
      return [
        odu,
        ...first7,
        { n: 'others', name: 'Others (08–16)', color: '#ec4899' },
      ];
    }
    return [
      odu,
      ...first7.slice(0, 6),
      { n: 'others', name: 'Obara + Others', color: '#3b9eff' },
    ];
  }

  const spokes = getSpokes(active);
  const K = 0.707;
  const SC = [
    [280,        142,        280,  70,  280,  42,  280,  56, 'middle'],
    [280+110*K,  210-68*K,   455,  78,  459,  73,  459,  87, 'start' ],
    [390,        210,        515, 210,  518, 206,  518, 220, 'start' ],
    [280+110*K,  210+68*K,   455, 342,  459, 340,  459, 354, 'start' ],
    [280,        278,        280, 330,  280, 348,  280, 362, 'middle'],
    [280-110*K,  210+68*K,   105, 342,  101, 340,  101, 354, 'end'   ],
    [170,        210,         45, 210,   41, 206,   41, 220, 'end'   ],
    [280-110*K,  210-68*K,   105,  78,  101,  73,  101,  87, 'end'   ],
  ];

  return (
    <section className="section section--d8" id="oju-odu-network">
      <div className="container">

        <div className="section__header section__header--center">
          <span className="section__eyebrow section__eyebrow--amber">Odu Ifa Network — Ifagram</span>
          <h2 className="section__title">
            The <span className="accent--amber">16 Oju Odu</span> — <span className="accent--violet">Odu Ifa Network Map</span>
          </h2>
          <p className="section__subtitle">
            Select any of the 16 Ojú Odù Ifá to reveal its Odu Network — the Ifagram of how that Odu connects across the full 16 Oju Odu space.
            <br /><span style={{ fontSize: '0.82em', color: 'var(--text-3)' }}>
              Each node connects to itself first, then the first 7 Odu in order, then Others — 8 edges total.
            </span>
          </p>
        </div>

        <div className="d8-ifagram-note">
          <div className="d8-ifagram-note__label">Ifagram — Ifa Diagram</div>
          <p className="d8-ifagram-note__text">
            Each Diagram is an <strong>Ifagram</strong>: a Visual Meta-Structure for Diagrammatic Reasoning with Ifa and network theory.
            The central Node (Ifa Circle) is the selected Ojú Odù. Spokes connect it to 8 outer positions: itself (N),
            followed by the other Oju Odu in order, then Others — forming the complete Odu Ifa Network across all 16 Oju Odu.
          </p>
        </div>

        <div className="d8-layout">

          <div className="d8-grid-col">
            <div className="d8-grid-label">Ojú Odù Ifá Mẹrindínlógún — Hover to Explore</div>
            <div className="d8-odu-grid">
              {ODU_16.map(o => (
                <div
                  key={o.n}
                  className={`d8-odu-cell${active.n === o.n ? ' d8-odu-cell--active' : ''}`}
                  style={{ '--c': o.color }}
                  onMouseEnter={() => setActive(o)}
                  onClick={() => setActive(o)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => e.key === 'Enter' && setActive(o)}
                >
                  <div className="d8-odu-cell__n">{o.n}</div>
                  <div className="d8-odu-cell__name">{o.name}</div>
                  <div className={`d8-odu-cell__badge d8-odu-cell__badge--${o.type}`}>{o.type === 'O' ? 'P' : 'Inv'}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="d8-panel" style={{ '--c': active.color }}>
            <div className="d8-panel__head">
              <div className="d8-panel__odu-row">
                <span className="d8-panel__num">{active.n}</span>
                <div className="d8-panel__meta">
                  <div className="d8-panel__name">{active.name}</div>
                  <div className="d8-panel__sub">
                    <span className="d8-panel__letter" style={{ color: active.color }}>{active.letter}</span>
                    <span className={`d8-panel__badge d8-panel__badge--${active.type}`}>
                      {active.type === 'O' ? 'Principal Odu' : 'Inverse Odu'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="d8-panel__tag">16 Odu</div>
            </div>

            <svg viewBox="0 0 560 420" overflow="visible" width="100%"
              style={{ display:'block', maxWidth:'min(460px, calc(100vw - 40px))', margin:'0 auto 22px', fontFamily:'inherit' }}>
              <defs>
                {spokes.map((p, i) => (
                  <marker key={i} id={`on-arr-${i}-${active.n}`} markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
                    <polygon points="0 1, 0 7, 8 4" fill={p.color} fillOpacity={i === 0 ? 1 : 0.7}/>
                  </marker>
                ))}
                <marker id={`on-ifa-c-${active.n}`} markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
                  <polygon points="0 1, 0 7, 8 4" fill={active.color}/>
                </marker>
              </defs>

              {SC.map(([ex, ey, tx, ty], idx) => {
                const p = spokes[idx];
                const isSelf = idx === 0;
                return (
                  <line key={idx}
                    x1={ex} y1={ey} x2={tx} y2={ty}
                    stroke={p.color}
                    strokeWidth={isSelf ? 2.5 : 1.2}
                    strokeOpacity={isSelf ? 1 : 0.45}
                    markerEnd={`url(#on-arr-${idx}-${active.n})`}
                  />
                );
              })}

              <ellipse cx="280" cy="210" rx="110" ry="68"
                fill="#111827" stroke={active.color} strokeWidth="2.5"/>
              <path d="M 387.6,195.9 A 110,68 0 0,1 387.6,224.1"
                fill="none" stroke={active.color} strokeWidth="3"
                markerEnd={`url(#on-ifa-c-${active.n})`}/>
              <text x="280" y="200" textAnchor="middle" fontSize="16"
                fontWeight="800" fill={active.color}>{active.name}</text>
              <text x="280" y="216" textAnchor="middle" fontSize="11"
                fill="rgba(255,255,255,0.38)">{active.n}</text>
              <text x="280" y="232" textAnchor="middle" fontSize="11" fontWeight="700"
                fill={active.type === 'O' ? '#f0920c' : '#8b5cf6'}>
                {active.type === 'O' ? 'Principal' : 'Inverse'}
              </text>

              {SC.map(([ex, ey, tx, ty, lx, ly, nx, ny, anc], idx) => {
                const p = spokes[idx];
                const isSelf = idx === 0;
                return (
                  <g key={idx}>
                    <text x={lx} y={ly} textAnchor={anc} fontSize="13" fontWeight="800"
                      fill={p.color} fillOpacity={isSelf ? 1 : 0.7}>
                      {p.n === 'others' ? '08–16' : p.n}
                    </text>
                    <text x={nx} y={ny} textAnchor={anc} fontSize="11"
                      fontWeight={isSelf ? 700 : 400}
                      fill={isSelf ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.45)'}>
                      {p.name}
                    </text>
                  </g>
                );
              })}
            </svg>

            <div style={{ textAlign:'center', fontSize:'0.7rem', color:'var(--text-3)', letterSpacing:'0.08em', marginBottom:'12px', fontWeight:600 }}>
              IFAGRAM &nbsp;·&nbsp; Ifa Diagram — Odu Ifa Network
            </div>

            <div className="d8-dims-list">
              {spokes.map((p, i) => (
                <div key={i} className="d8-dim-row" style={{ '--dc': p.color }}>
                  <span className="d8-dim-row__letter">{p.n === 'others' ? '08–16' : p.n}</span>
                  <span className="d8-dim-row__text">{i === 0 ? `${p.name} — Self` : p.name}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// ─── PATH SECTION ─────────────────────────────────────────────────────────────

function PathSection() {
  return (
    <section className="section section--dark" id="path">
      <div className="container">
        <div className="section__header section__header--center">
          <span className="section__eyebrow section__eyebrow--amber">Research Journey</span>
          <h2 className="section__title">Your iToL Research Journey</h2>
          <p className="section__subtitle">
            Three foundational steps for engaging with the Igi Ìyè Ifá Explorer — from initiating inquiry to synthesising evolutionary findings.
          </p>
        </div>

        <div className="path-steps">
          {STEPS.map((s, i) => (
            <div key={i} className="path-step" style={{ '--step-color': s.color }}>
              <div className="path-step__left">
                <div className="path-step__num">{s.num}</div>
                {i < STEPS.length - 1 && <div className="path-step__connector" />}
              </div>
              <div className="path-step__card">
                <h3 className="path-step__title">{s.title}</h3>
                <p className="path-step__body">{s.body}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="path-cta">
          <a href="../" className="btn btn--primary">
            &larr; Back to Ifa Evolution
          </a>
          <a href="https://toe.cenproject.org/igi-iye-ifa-the-ifa-tree-of-life-itol-explorer/"
             target="_blank" rel="noopener noreferrer"
             className="btn btn--ghost">
            Igi Ìyè Ifá Article
          </a>
          <a href="https://toe.cenproject.org/ifa-mathematics-toe-mathematics/"
             target="_blank" rel="noopener noreferrer"
             className="btn btn--ghost">
            IFA Mathematica
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
              <img src="../../src/assets/itoe_logo.png" alt="iTOE" className="footer__logo-mark" />
              <span>The IFA Internet</span>
            </div>
            <p className="footer__tagline">
              Igi Ìyè Ifá — The Ifa Tree of Life (iToL) Explorer
            </p>
            <p className="footer__tagline footer__tagline--sm">
              Part of <a href="../" className="footer__link-inline">Ifa Evolution</a> on the <a href="../../" className="footer__link-inline">IFA Internet</a>. A <a href="https://cenproject.org/" className="footer__link-inline">CENProject</a> initiative.
            </p>
          </div>
          <nav className="footer__links">
            <a href="#definition" className="footer__link">What is iToL</a>
            <a href="#igi-tree" className="footer__link">Living Ifa Tree</a>
            <a href="#capabilities" className="footer__link">Capabilities</a>
            <a href="#tools" className="footer__link">Tools</a>
            <a href="#structure" className="footer__link">Ifa Structure</a>
            <a href="#path" className="footer__link">Research Path</a>
            <a href="../" className="footer__link">Ifa Evolution</a>
            <a href="../../" className="footer__link">IFA Internet</a>
          </nav>
        </div>
        <div className="footer__bottom">
          <span className="footer__copy">
            &copy; 2026 CENProject Innovations Limited. All rights reserved.
          </span>
          <span className="footer__powered">
            The IFA Internet &mdash; Igi Ìyè Ifá iToL Explorer
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
        <DefinitionSection />
        <IgiGallerySection />
        <IgiTreeSection />
        <CapabilitiesSection />
        <ToolsSection />
        <IfaStructureSection />
        <OjuOduNetworkSection />
        <PathSection />
      </main>
      <Footer />
      <MobileBar />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
