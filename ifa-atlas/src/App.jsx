/* ─────────────────────────────────────────────────────────────
   Ifatlas — The Ifa & Orisa Knowledge Atlas
   React 18 + JSX via Babel Standalone · no build step
   CENProject · toe.cenproject.org · ifainternet.org/ifa-atlas/
───────────────────────────────────────────────────────────── */

const { useState, useEffect, useRef, useMemo } = React;

/* ══════════════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════════════ */

const IFA_ENTRIES = [
  { id:'odu',   sym:'⊕', name:'Odu Ifa',        yoruba:'Odù Ifá',        color:'#f5c518', tag:'Foundation',  desc:'The 256 sacred codes of Ifa — the primordial patterns that encode all of reality, knowledge, and destiny.' },
  { id:'ase',   sym:'⚡', name:'Ashe (Àṣẹ)',      yoruba:'Àṣẹ',           color:'#fb923c', tag:'Power',       desc:'The divine energy and power of creation. The force that makes things happen. The "so be it" of the universe.' },
  { id:'ori',   sym:'🧠', name:'Ori',             yoruba:'Orí',            color:'#c084fc', tag:'Self',        desc:'Personal consciousness, inner head, and destiny. Your Ori is your personal Orisa — the guide within you.' },
  { id:'imo',   sym:'💡', name:'Imọ̀rí',          yoruba:'Ìmọ̀ Orí',       color:'#60a5fa', tag:'Consciousness',desc:'The Science of Consciousness — understanding Ori, awareness, and the nature of inner knowing.' },
  { id:'opon',  sym:'🔵', name:'Opon Ifa',        yoruba:'Ọpọ́n Ifá',      color:'#f5c518', tag:'Divination',  desc:'The sacred oracle board of Ifa. A circular wooden tray where Odu marks are drawn in sacred Iyerosun dust.' },
  { id:'ikin',  sym:'🌿', name:'Ikin Ifa',        yoruba:'Ìkín Ifá',       color:'#4ade80', tag:'Sacred Tool', desc:'The sacred palm nuts used in Ifa divination. 16 palm nuts passed between hands to generate the Odu pattern.' },
  { id:'opele', sym:'⛓️', name:'Opele Chain',     yoruba:'Ọ̀pẹ̀lẹ̀',        color:'#f0a500', tag:'Divination',  desc:'The divination chain of Ifa — 8 half-shells strung together, cast to reveal the Odu. Each shell is heads or tails.' },
  { id:'ifabit',sym:'🔢', name:'IFABit',          yoruba:'Onka Alejifa',        color:'#f87171', tag:'Computing',   desc:'The binary digit of Ifa. IFABit = 0 (Oyeku/Closed Shell) or 1 (Ogbe/Open Shell). Foundation of Ifa computing.' },
  { id:'egun',  sym:'👴', name:'Egungun',         yoruba:'Egúngún',        color:'#2dd4bf', tag:'Ancestry',    desc:'The ancestral masquerade tradition. Egungun represents the living presence of ancestors among the living.' },
  { id:'ose',   sym:'📿', name:'Ose-Tura',        yoruba:'Ọ̀ṣẹ Túrá',      color:'#f472b6', tag:'Odu',         desc:'One of the 256 Odu Ifa. Associated with Oshun, beauty, wealth, and the sweetness of life.' },
  { id:'ifamath',sym:'∑', name:'Ifa Mathematics', yoruba:'Ìmọ̀siro Ifá', color:'#c084fc', tag:'Mathematics', desc:'TOE Mathematics — a unified mathematical framework built on 256 Odu patterns, IFABit algebra, and Ifa geometry.' },
  { id:'ifalang',sym:'ℒ', name:'Ifa Language',    yoruba:'Èdè Ifá',        color:'#60a5fa', tag:'Language',    desc:'IfaLang — the Script of Everything. A universal language bridging consciousness, computing, and all knowledge systems.' },
  { id:'ifacmp', sym:'💻', name:'Ifa Computing',  yoruba:'Ìmọ̀jinle Iyarabiasa',   color:'#4ade80', tag:'Computing',   desc:'IFA Computing system built on IFABit binary logic. 256 Odu codes form the base of a new computing paradigm.' },
  { id:'axm',    sym:'Λ', name:'Ifaxioms',        yoruba:'Oju Odufa: Ooto Ifá Tofojuhan',     color:'#f5c518', tag:'Logic',       desc:'The foundational axioms of Ifa knowledge. Self-evident truths that form the logical bedrock of Ifa science.' },
  { id:'neuro',  sym:'🧬', name:'Ifa Neuroscience',yoruba:'Ìmọ̀jinlẹ̀ Opolo',   color:'#fb923c', tag:'Science',     desc:'IfaGebra mathematics applied to consciousness and neuroscience. Maps brain states to Odu patterns.' },
  { id:'quant',  sym:'⚛️', name:'Ifa Quantum',     yoruba:'Horo Ifá',    color:'#f87171', tag:'Physics',     desc:'The quantum universe as a manifestation of consciousness. Ifa Quantum connects Odu to quantum physics.' },
];

const ORISA_ENTRIES = [
  { id:'orunmila', sym:'📖', name:'Orunmila',   domain:'Wisdom · Divination · Destiny',    color:'#f5c518', bg:'rgba(245,197,24,0.07)',  border:'rgba(245,197,24,0.18)',  desc:'The Orisa of Wisdom and Destiny. Witness to all creation. Guardian of Ifa divination and the keeper of all knowledge.' },
  { id:'esu',      sym:'🔑', name:'Ẹṣù',        domain:'Crossroads · Messages · Chance',   color:'#fb923c', bg:'rgba(251,146,60,0.07)',  border:'rgba(251,146,60,0.18)',  desc:'The divine messenger and trickster. Guardian of the crossroads of life. Opener of paths between humans and Orisa.' },
  { id:'obatala',  sym:'🤍', name:'Obatala',    domain:'Purity · Creation · Peace',        color:'#eaedf5', bg:'rgba(234,237,245,0.06)', border:'rgba(234,237,245,0.14)', desc:'Orisa of purity, creativity, and white cloth. Creator of human bodies. Embodiment of clarity, patience, and peace.' },
  { id:'ogun',     sym:'⚔️', name:'Ogun',        domain:'Iron · Work · Justice',           color:'#4ade80', bg:'rgba(74,222,128,0.07)',  border:'rgba(74,222,128,0.18)',  desc:'Orisa of iron, warfare, and hard work. Patron of drivers, blacksmiths, and warriors. Opener of blocked paths.' },
  { id:'sango',    sym:'⚡', name:'Sàngó',       domain:'Thunder · Power · Justice',       color:'#f87171', bg:'rgba(248,113,113,0.07)', border:'rgba(248,113,113,0.18)', desc:'Orisa of thunder, lightning, and justice. Former king of Oyo. Fierce and powerful protector of the righteous.' },
  { id:'oshun',    sym:'💛', name:'Ọṣun',        domain:'Love · Rivers · Sweetness',       color:'#f5c518', bg:'rgba(245,197,24,0.07)',  border:'rgba(245,197,24,0.18)',  desc:'Orisa of love, beauty, fertility, and sweet water. Patron of the Osun River. The embodiment of feminine power.' },
  { id:'yemoja',   sym:'🌊', name:'Yemọja',      domain:'Ocean · Motherhood · Protection', color:'#60a5fa', bg:'rgba(96,165,250,0.07)',  border:'rgba(96,165,250,0.18)',  desc:'Mother of waters. Orisa of the ocean, fertility, and children. Great protector of mothers and newborns.' },
  { id:'oya',      sym:'🌪️', name:'Oya',         domain:'Wind · Change · Transition',      color:'#c084fc', bg:'rgba(192,132,252,0.07)', border:'rgba(192,132,252,0.18)', desc:'Orisa of winds, storms, and transformation. Guardian of the marketplace and gates of death. Power of change.' },
  { id:'osun',     sym:'🌿', name:'Ọṣọọsi',      domain:'Hunt · Forests · Providence',     color:'#4ade80', bg:'rgba(74,222,128,0.07)',  border:'rgba(74,222,128,0.18)',  desc:'Orisa of the hunt and forests. Swift as an arrow. Provider of food and abundance through skill and focus.' },
  { id:'babalu',   sym:'🌾', name:'Bàbá Alúwó', domain:'Healing · Earth · Diseases',      color:'#f0a500', bg:'rgba(240,165,0,0.07)',   border:'rgba(240,165,0,0.18)',   desc:'Orisa of healing, earth, and contagious diseases. Great physician of the Orisa. Controls the spread of illness.' },
  { id:'aganju',   sym:'🌋', name:'Aganjú',      domain:'Wilderness · Volcano · Journey',  color:'#f87171', bg:'rgba(248,113,113,0.07)', border:'rgba(248,113,113,0.18)', desc:'Orisa of the wilderness, volcano, and carried burdens. Patron of the journey. Represents transition and great strength.' },
  { id:'oko',      sym:'🌱', name:'Oko',         domain:'Agriculture · Earth · Harvest',   color:'#2dd4bf', bg:'rgba(45,212,191,0.07)',  border:'rgba(45,212,191,0.18)',  desc:'Orisa of agriculture and the earth. Patron of farmers. Represents the power of cultivation, growth, and harvest.' },
];

const ODU_16 = [
  { n:1,  glyph:'⣿', name:'Ogbe',   meaning:'Complete light, Ogbe energy, Ashe positive' },
  { n:2,  glyph:'⢺', name:'Oyeku',  meaning:'Complete dark, Oyeku anergy, empty space' },
  { n:3,  glyph:'⣻', name:'Iwori',  meaning:'Inner wisdom, deep seeing, consciousness' },
  { n:4,  glyph:'⣽', name:'Odi',    meaning:'The womb of creation, inner depth, mystery' },
  { n:5,  glyph:'⣾', name:'Irosun', meaning:'Blood, foundation, survival, red energy' },
  { n:6,  glyph:'⡿', name:'Owonrin',meaning:'Rapid change, revolution, innovation' },
  { n:7,  glyph:'⣷', name:'Obara',  meaning:'Royalty, leadership, nobility, expansion' },
  { n:8,  glyph:'⡻', name:'Okanran',meaning:'Singular focus, fire, individual destiny' },
  { n:9,  glyph:'⢿', name:'Ogunda', meaning:'Cutting through, iron path, opening' },
  { n:10, glyph:'⣯', name:'Osa',    meaning:'Rapid dispersal, wind, sudden change' },
  { n:11, glyph:'⣟', name:'Ika',    meaning:'Persistence, stubbornness, deep roots' },
  { n:12, glyph:'⢻', name:'Oturupọn',meaning:'Patience, the ground, endurance' },
  { n:13, glyph:'⣳', name:'Otura',  meaning:'Peace, enlightenment, cosmic balance' },
  { n:14, glyph:'⣺', name:'Irete',  meaning:'Prosperity, abundance, multiplication' },
  { n:15, glyph:'⣵', name:'Ose',    meaning:'Beauty, sweetness, love, Oshun energy' },
  { n:16, glyph:'⣮', name:'Ofun',   meaning:'Transformation, ancestral force, completion' },
];


const IFA_ANIMATIONS = [
  { id:'a1', sym:'🌀', title:'Odu Formation',        sub:'Watch how Ifa marks form from thrown Ikin',       badge:'anim',  color:'#c084fc', bg:'linear-gradient(135deg,rgba(192,132,252,0.18),rgba(96,165,250,0.12))' },
  { id:'a2', sym:'🔗', title:'Opele Casting',         sub:'The 8-shell chain in motion — see each Odu emerge',badge:'anim', color:'#f5c518', bg:'linear-gradient(135deg,rgba(245,197,24,0.18),rgba(251,146,60,0.12))' },
  { id:'a3', sym:'🔢', title:'IFABit Binary Flow',    sub:'Binary 0s and 1s flowing through Odu patterns',  badge:'anim',  color:'#4ade80', bg:'linear-gradient(135deg,rgba(74,222,128,0.18),rgba(45,212,191,0.12))' },
  { id:'a4', sym:'🧮', title:'256 Odu Matrix',        sub:'All 256 Odu arranged and animated in full matrix',badge:'anim', color:'#fb923c', bg:'linear-gradient(135deg,rgba(251,146,60,0.18),rgba(248,113,113,0.12))' },
  { id:'a5', sym:'🌊', title:'Consciousness Wave',    sub:'Ìmọ̀rí consciousness wave visualization',         badge:'anim',  color:'#60a5fa', bg:'linear-gradient(135deg,rgba(96,165,250,0.18),rgba(192,132,252,0.12))' },
  { id:'a6', sym:'∞',  title:'Lemniscate Cross',     sub:'The Ifa Infinity symbol — ∞ in 4-lobe motion',    badge:'anim',  color:'#f5c518', bg:'linear-gradient(135deg,rgba(245,197,24,0.18),rgba(74,222,128,0.10))' },
  { id:'a7', sym:'📿', title:'Divination Ritual',    sub:'Step-by-step animated Ifa divination process',    badge:'inter', color:'#2dd4bf', bg:'linear-gradient(135deg,rgba(45,212,191,0.18),rgba(96,165,250,0.12))' },
  { id:'a8', sym:'⚙️', title:'Ifa Computing Engine', sub:'See how Ifa binary logic powers computation',     badge:'new',   color:'#f472b6', bg:'linear-gradient(135deg,rgba(244,114,182,0.18),rgba(192,132,252,0.12))' },
];

const ORISA_ANIMATIONS = [
  { id:'o1', sym:'⚡', title:"Sàngó's Thunder Dance",  sub:'The lightning king dances in storm animation',    badge:'anim',  color:'#f87171', bg:'linear-gradient(135deg,rgba(248,113,113,0.18),rgba(251,146,60,0.12))' },
  { id:'o2', sym:'💛', title:"Ọṣun's River Flow",       sub:'Golden waters of Oshun rippling through light',  badge:'anim',  color:'#f5c518', bg:'linear-gradient(135deg,rgba(245,197,24,0.18),rgba(251,146,60,0.12))' },
  { id:'o3', sym:'⚔️', title:"Ogun's Forge",            sub:"The Iron Orisa's fire and metalworking",         badge:'anim',  color:'#4ade80', bg:'linear-gradient(135deg,rgba(74,222,128,0.18),rgba(45,212,191,0.12))' },
  { id:'o4', sym:'🔑', title:'Ẹṣù at the Crossroads', sub:'The messenger between worlds — animated journey', badge:'anim',  color:'#fb923c', bg:'linear-gradient(135deg,rgba(251,146,60,0.18),rgba(248,113,113,0.12))' },
  { id:'o5', sym:'🌊', title:"Yemọja's Ocean",          sub:'Mother of waters — waves and sea creatures',     badge:'anim',  color:'#60a5fa', bg:'linear-gradient(135deg,rgba(96,165,250,0.18),rgba(45,212,191,0.12))' },
  { id:'o6', sym:'🌪️', title:"Oya's Whirlwind",        sub:'Wind and transformation — storm in motion',      badge:'inter', color:'#c084fc', bg:'linear-gradient(135deg,rgba(192,132,252,0.18),rgba(248,113,113,0.12))' },
  { id:'o7', sym:'🤍', title:'Obatala Creates',         sub:'The sculptor of humanity — clay and white cloth', badge:'new',  color:'#eaedf5', bg:'linear-gradient(135deg,rgba(234,237,245,0.14),rgba(192,132,252,0.10))' },
  { id:'o8', sym:'📖', title:'Orunmila Speaks',         sub:'The Oracle of Wisdom reveals destiny',            badge:'anim', color:'#f5c518', bg:'linear-gradient(135deg,rgba(245,197,24,0.18),rgba(74,222,128,0.10))' },
];

const IFA_ILLUSTRATIONS = [
  { id:'i1', sym:'🎨', title:'The 16 Major Odu',        sub:'Beautiful portraits of all 16 principal Odu',    badge:'illus', color:'#f5c518', bg:'linear-gradient(135deg,rgba(245,197,24,0.16),rgba(251,146,60,0.10))' },
  { id:'i2', sym:'🌳', title:'Ifa Oracle Scene',        sub:'A traditional Ifa divination ceremony',          badge:'illus', color:'#4ade80', bg:'linear-gradient(135deg,rgba(74,222,128,0.16),rgba(45,212,191,0.10))' },
  { id:'i3', sym:'📐', title:'256 Odu Pattern Chart',   sub:'All 256 Odu marks in a grand visual map',        badge:'illus', color:'#60a5fa', bg:'linear-gradient(135deg,rgba(96,165,250,0.16),rgba(192,132,252,0.10))' },
  { id:'i4', sym:'💎', title:'Ifa Periodic Table',      sub:'The periodic table of Ifa elements',             badge:'illus', color:'#c084fc', bg:'linear-gradient(135deg,rgba(192,132,252,0.16),rgba(96,165,250,0.10))' },
  { id:'i5', sym:'🗺️', title:'Consciousness Map',       sub:'The ÌmỌ̀rí atlas — mapping human consciousness', badge:'illus', color:'#fb923c', bg:'linear-gradient(135deg,rgba(251,146,60,0.16),rgba(248,113,113,0.10))' },
  { id:'i6', sym:'🔤', title:'Ifa Script Alphabet',     sub:'IFALang — the script of everything characters',  badge:'illus', color:'#2dd4bf', bg:'linear-gradient(135deg,rgba(45,212,191,0.16),rgba(96,165,250,0.10))' },
  { id:'i7', sym:'📊', title:'IFABit Matrix',           sub:'Binary code 0/1 arranged in Ifa patterns',       badge:'inter', color:'#f472b6', bg:'linear-gradient(135deg,rgba(244,114,182,0.16),rgba(192,132,252,0.10))' },
  { id:'i8', sym:'♾️', title:'Lemniscate Cross Art',    sub:'The Ifa infinity symbol as visual art',          badge:'illus', color:'#f5c518', bg:'linear-gradient(135deg,rgba(245,197,24,0.16),rgba(74,222,128,0.10))' },
];

const ORISA_ILLUSTRATIONS = [
  { id:'oi1', sym:'👑', title:'Orunmila the Wise',     sub:'Portrait of the Orisa of Wisdom and Destiny',    badge:'illus', color:'#f5c518', bg:'linear-gradient(135deg,rgba(245,197,24,0.16),rgba(251,146,60,0.10))' },
  { id:'oi2', sym:'🔴', title:'Sàngó King of Kings',  sub:'The thunder king on his royal throne',           badge:'illus', color:'#f87171', bg:'linear-gradient(135deg,rgba(248,113,113,0.16),rgba(251,146,60,0.10))' },
  { id:'oi3', sym:'💧', title:'Ọṣun the Beautiful',   sub:'Goddess of love at the golden river',            badge:'illus', color:'#f5c518', bg:'linear-gradient(135deg,rgba(245,197,24,0.16),rgba(244,114,182,0.10))' },
  { id:'oi4', sym:'🌍', title:'Obatala in White',     sub:'The sculptor of humanity clothed in white',      badge:'illus', color:'#eaedf5', bg:'linear-gradient(135deg,rgba(234,237,245,0.14),rgba(192,132,252,0.10))' },
  { id:'oi5', sym:'🌺', title:'Oya the Warrior',      sub:'The fierce wind goddess at the market gate',     badge:'inter', color:'#c084fc', bg:'linear-gradient(135deg,rgba(192,132,252,0.16),rgba(248,113,113,0.10))' },
  { id:'oi6', sym:'🐟', title:"Yemọja's Children",   sub:'Mother ocean and all her sea children',          badge:'illus', color:'#60a5fa', bg:'linear-gradient(135deg,rgba(96,165,250,0.16),rgba(45,212,191,0.10))' },
  { id:'oi7', sym:'🛡️', title:'Ogun the Iron Lord',  sub:'The warrior at his forge — iron and fire',       badge:'illus', color:'#4ade80', bg:'linear-gradient(135deg,rgba(74,222,128,0.16),rgba(45,212,191,0.10))' },
  { id:'oi8', sym:'🎭', title:'Ẹṣù the Messenger',   sub:'The divine trickster at the crossroads',         badge:'new',   color:'#fb923c', bg:'linear-gradient(135deg,rgba(251,146,60,0.16),rgba(248,113,113,0.10))' },
];

const MAPS = [
  { sym:'🌀', name:'Consciousness Dimensions',   text:'256 Odu encode the full spectrum of consciousness states — from Ogbe (pure energy) to Oyeku (pure potential).' },
  { sym:'🧠', name:'Ori Mapping',                text:'Personal Ori (inner head/consciousness) is mapped to specific Odu patterns. Know your Odu, know your Ori.' },
  { sym:'🌊', name:'Consciousness Wave',         text:'Consciousness propagates as a wave through Odu space. The Consciousness Wave Observatory tracks these patterns.' },
  { sym:'⚛️', name:'Quantum Correlation',        text:'Quantum superposition ↔ Odu duality. Entanglement ↔ Ifa relational logic. Quantum fields ↔ Ase energy fields.' },
  { sym:'🧬', name:'Neuro-Odu Mapping',          text:'IfaGebra mathematics maps brain states, neural patterns, and cognitive modes to specific Odu configurations.' },
  { sym:'∞',  name:'Lemniscate Consciousness',  text:'The Ifa Lemniscate Cross (∞²) models the dual nature of consciousness — energy and form, known and unknown.' },
];

const TOE_CATS = [
  { id:'all',     label:'All Theories',    color:'#f5c518' },
  { id:'univ',    label:'⊕ Universal',     color:'#f5c518' },
  { id:'physics', label:'⚛️ Physics',       color:'#f5c518' },
  { id:'math',    label:'🧮 Mathematics',   color:'#60a5fa' },
  { id:'comp',    label:'💻 Computational', color:'#4ade80' },
  { id:'mind',    label:'🧠 Consciousness', color:'#c084fc' },
  { id:'phil',    label:'🌀 Philosophy',    color:'#fb923c' },
  { id:'trad',    label:'🌍 Indigenous',    color:'#2dd4bf' },
];

const TOE_THEORIES = [
  /* ── Physics ── */
  { id:'string',     cat:'physics', sym:'🎸', color:'#f5c518',
    name:'String Theory',
    thinker:'Schwarz, Green, Witten', era:'1970s – present',
    core:'All particles are tiny vibrating strings. Different vibrational modes produce different particles — quarks, electrons, photons. Requires 10 spacetime dimensions.',
    principles:['Strings replace point particles as fundamental units','10 spacetime dimensions required','Supersymmetry predicts super-partners for every particle','Unifies quantum mechanics with gravity in principle'],
    ifa:'Ifa encodes reality in vibrating Odu patterns. Like strings, each Odu "vibrates" at a unique frequency of knowledge, destiny, and energy — 256 fundamental modes of existence.' },
  { id:'mtheory',    cat:'physics', sym:'🌐', color:'#fb923c',
    name:'M-Theory',
    thinker:'Edward Witten', era:'1995 – present',
    core:'Unifies the five string theories into a single 11-dimensional framework. Introduces membranes (branes) alongside strings. The leading physics TOE candidate.',
    principles:['11 spacetime dimensions','Membranes (2D and higher) as fundamental objects','Unifies all five superstring theories','Predicts a landscape of ~10⁵⁰⁰ possible universes'],
    ifa:'As M-Theory unifies five string theories into one, the 256 Odu unify all domains of reality — medicine, mathematics, destiny, cosmology, governance — into one coherent system.' },
  { id:'lqg',        cat:'physics', sym:'🔵', color:'#60a5fa',
    name:'Loop Quantum Gravity',
    thinker:'Carlo Rovelli, Lee Smolin', era:'1986 – present',
    core:'Space and time are quantised — built from discrete loops called spin networks. Gravity emerges from the quantum geometry of spacetime. No extra dimensions needed.',
    principles:['Space is granular — made of discrete quanta (Planck-scale loops)','Spin networks form the fabric of spacetime','Time is relational, not absolute','Derives general relativity from quantum principles'],
    ifa:'Ifa marks are discrete, granular units — like the quanta of LQG. Each Odu is a distinct quantum of knowledge from which all reality is woven. Ifa spacetime is the Opon Ifa (oracle board).' },
  { id:'twistor',    cat:'physics', sym:'🌀', color:'#c084fc',
    name:'Twistor Theory',
    thinker:'Roger Penrose', era:'1967 – present',
    core:'Light rays, not spacetime points, are the fundamental entities. Spacetime is emergent from a deeper complex geometric structure called twistor space.',
    principles:['Light rays (null geodesics) are primary','Spacetime is emergent, not fundamental','Uses spinors and complex geometry','Reformulates quantum mechanics and gravity geometrically'],
    ifa:'Ifa places light (Ìmọ̀lẹ̀) and consciousness as primary. The Lemniscate Cross (∞) is the foundational geometry of Ifa — echoing Penrose\'s geometric foundations of reality.' },
  { id:'hologram',   cat:'physics', sym:'📡', color:'#2dd4bf',
    name:'Holographic Principle',
    thinker:'Bekenstein, Hawking, Maldacena', era:'1990s – present',
    core:'All information in a volume of space is encoded on its 2D boundary surface. The universe may be a hologram projected from a lower-dimensional reality.',
    principles:['Information is fundamentally a boundary (surface) phenomenon','Black hole entropy ∝ surface area, not volume','AdS/CFT: gravity in 3D = quantum field theory on 2D boundary','Volume of space may be emergent/illusory'],
    ifa:'Ifa encodes the entire universe in 256 flat, two-dimensional Odu marks on the Opon Ifa board. Like a hologram, infinite knowledge is encoded in finite, surface symbols.' },
  { id:'asymsafety', cat:'physics', sym:'🔒', color:'#f472b6',
    name:'Asymptotic Safety',
    thinker:'Steven Weinberg, Martin Reuter', era:'1979 – present',
    core:'Quantum gravity is non-perturbatively renormalizable. At high energies it flows to an ultraviolet fixed point — making it self-consistent without strings or extra dimensions.',
    principles:['Gravity renormalises itself at high energies','UV fixed point ensures consistency','No extra dimensions or new particles required','Works within standard quantum field theory framework'],
    ifa:'Ifa\'s Ashe (Àṣẹ) is self-sustaining energy — it needs nothing external to maintain itself. Asymptotic Safety reflects this Ifa principle of self-completeness.' },

  /* ── Mathematics ── */
  { id:'tegmark',    cat:'math', sym:'∑', color:'#f5c518',
    name:'Mathematical Universe Hypothesis',
    thinker:'Max Tegmark', era:'1998 – present',
    core:'Our universe is not merely described by mathematics — it IS a mathematical structure. All consistent mathematical structures exist as physical realities in a multiverse.',
    principles:['Physical reality = mathematical structure','All self-consistent math structures exist physically','Explains the "unreasonable effectiveness of mathematics"','Our universe is one of infinitely many mathematical structures'],
    ifa:'TOE Mathematics encodes all reality in mathematical Odu patterns. The 256 Odu ARE the universe — matching Tegmark\'s thesis that reality is fundamentally mathematical.' },
  { id:'cattheory',  cat:'math', sym:'→', color:'#4ade80',
    name:'Category Theory Universe',
    thinker:'Mac Lane, Lawvere, Grothendieck', era:'1940s – present',
    core:'All of mathematics — and potentially all of reality — is described by objects (things) and morphisms (relationships between things). The universe is a category of categories.',
    principles:['Objects + morphisms = the fundamental structure','Functors map between categories (structure-preserving)','Natural transformations relate functors','Unifies all branches of mathematics through structural relationships'],
    ifa:'Ifa is fundamentally relational. Every Odu relates to all others through defined relationships. The 256 Odu form a category: objects (Odu) + morphisms (combination rules) = the complete relational map of reality.' },
  { id:'ncgeometry', cat:'math', sym:'∂', color:'#60a5fa',
    name:'Noncommutative Geometry',
    thinker:'Alain Connes', era:'1980s – present',
    core:'Spacetime at Planck scales is noncommutative — the order of position measurements matters. The Standard Model plus gravity can be derived from a single noncommutative geometric framework.',
    principles:['Position operators do not commute at small scales','Derives Standard Model from pure geometry','Spectral triples encode spacetime structure','Unifies gauge forces and gravity through algebra'],
    ifa:'Ifa divination is order-dependent — the sequence of Ikin throws matters. Odu formation is noncommutative: Ogbe-Oyeku ≠ Oyeku-Ogbe. Ifa algebra is inherently noncommutative.' },

  /* ── Computational ── */
  { id:'wolfram',    cat:'comp', sym:'⚙️', color:'#fb923c',
    name:'Computational Universe (Wolfram)',
    thinker:'Stephen Wolfram', era:'2002 – present',
    core:'The universe is a vast network operating on simple computational rules — like cellular automata. Complex physical reality emerges from minimal algorithms applied recursively.',
    principles:['Simple rules → irreducible complex behaviour','Computational equivalence: simple programs can match any computation','Hypergraph rewriting generates spacetime structure','Time = computational steps; space = hypergraph nodes'],
    ifa:'Ifa Computing uses IFABit binary logic to encode all reality. Like Wolfram\'s cellular automata, two simple IFABit values (0 and 1, open and closed shell) generate all 256 Odu — the full complexity of existence.' },
  { id:'digital',    cat:'comp', sym:'01', color:'#4ade80',
    name:'Digital Physics',
    thinker:'Konrad Zuse, Edward Fredkin', era:'1969 – present',
    core:'The universe is fundamentally discrete and computational — it is a computer. Physical laws are programs; particles are data; spacetime is a cellular automaton. Wheeler: "it from bit."',
    principles:['Universe is made of discrete information','Physical laws = computational algorithms','Spacetime is a cellular automaton grid','"It from bit" — information is the bedrock of physics'],
    ifa:'Ifa\'s IFABit encodes all reality in binary — Oyeku (0, closed) and Ogbe (1, open). Wheeler\'s "it from bit" finds its ancient parallel in "it from IFABit" — Ifa Digital Physics.' },
  { id:'simulation', cat:'comp', sym:'🖥️', color:'#c084fc',
    name:'Simulation Theory',
    thinker:'Nick Bostrom', era:'2003 – present',
    core:'We almost certainly live inside a computer simulation run by a technologically advanced civilisation. The physical laws we observe are the code; the universe is the program.',
    principles:['Advanced civilisations can simulate full universes','Probability favours simulated existence','Physical constants may be adjustable parameters','Observable "glitches" would indicate simulation'],
    ifa:'Ifa cosmology describes Olódùmarè as the supreme author of reality. Simulation Theory\'s "simulators" mirror Ifa\'s concept of an ultimate intelligence running the code of existence — with Odu as the source code.' },

  /* ── Consciousness ── */
  { id:'panpsych',   cat:'mind', sym:'✨', color:'#c084fc',
    name:'Panpsychism',
    thinker:'Leibniz, Whitehead, Philip Goff', era:'Ancient – present',
    core:'Consciousness is fundamental and ubiquitous. Every particle, atom, and system has some form of inner experience. Mind is not emergent — it is basic to reality itself.',
    principles:['Consciousness is ontologically fundamental','Every physical entity has proto-experience','Macro-consciousness combines from micro-experiences','Solves the hard problem by making mind primary'],
    ifa:'Ifa\'s Ashe (Àṣẹ) is divine energy present in all things — stones, rivers, animals, stars, words. This is African panpsychism: all reality pulses with consciousness and creative power.' },
  { id:'iit',        cat:'mind', sym:'Φ', color:'#f472b6',
    name:'Integrated Information Theory (IIT)',
    thinker:'Giulio Tononi', era:'2004 – present',
    core:'Consciousness equals integrated information (Φ, phi). Any system that integrates information has consciousness proportional to its Φ value — whether biological or physical.',
    principles:['Consciousness = Φ (phi, integrated information)','Five axioms: existence, intrinsicality, information, integration, exclusion','Φ is substrate-independent — any physical system can be conscious','Explains why the brain is highly conscious; simple circuits are not'],
    ifa:'The 256 Odu form a maximally integrated information system — every Odu relates to every other. Ifa\'s Φ is extraordinarily high: the entire knowledge field is one unified conscious structure.' },
  { id:'cosmopsy',   cat:'mind', sym:'🌌', color:'#60a5fa',
    name:'Cosmopsychism',
    thinker:'Itay Shani, Sophia Magnusdottir', era:'2010s – present',
    core:'The universe as a whole is the primary seat of consciousness. Individual minds are localisations or limitations of universal cosmic consciousness — the whole is prior to the parts.',
    principles:['Universe-level consciousness is ontologically primary','Individual minds are expressions of cosmic mind','Holistic rather than bottom-up (unlike panpsychism)','Avoids the "combination problem" of panpsychism'],
    ifa:'Olódùmarè (Supreme Being in Ifa) is the primordial cosmic consciousness. All individual Ori (personal consciousness) are localisations of Olódùmarè\'s infinite mind. Ifa is cosmopsychism.' },
  { id:'orchor',     cat:'mind', sym:'🧬', color:'#4ade80',
    name:'Orchestrated Objective Reduction (Orch-OR)',
    thinker:'Roger Penrose, Stuart Hameroff', era:'1990s – present',
    core:'Consciousness arises from quantum computations in microtubules inside neurons. Quantum superpositions collapse (objective reduction) in a way orchestrated by consciousness itself.',
    principles:['Consciousness requires quantum-mechanical processes','Microtubules in neurons act as quantum computers','Wave function collapse = a moment of conscious experience','Links consciousness to fundamental Planck-scale spacetime geometry'],
    ifa:'Ifa\'s Ori (personal consciousness) is not a product of the brain — it is a fundamental quantum-spiritual entity. Orch-OR\'s linking of consciousness to geometry resonates with Ifa: Ori precedes the body.' },
  { id:'idealism',   cat:'mind', sym:'💭', color:'#f5c518',
    name:'Idealism',
    thinker:'Berkeley, Hegel, Bernardo Kastrup', era:'Ancient – present',
    core:'Mind or consciousness is the fundamental reality. The physical world does not exist independently — it exists within and as experience. Matter is a manifestation of mind.',
    principles:['Consciousness is ontologically primary','Physical reality exists within mind, not independently','Solves the hard problem: mind needs no explanation if it\'s fundamental','Matter = stabilised patterns of experience in universal consciousness'],
    ifa:'Ifa teaches that Ori (consciousness) is chosen before birth — consciousness precedes the physical body. Physical reality manifests from Ashe (divine consciousness-energy). Ifa metaphysics is idealist.' },

  /* ── Philosophy ── */
  { id:'whitehead',  cat:'phil', sym:'⚡', color:'#fb923c',
    name:'Process Philosophy',
    thinker:'Alfred North Whitehead', era:'1929 – present',
    core:'Reality is made of dynamic processes and events — not static substances. "Occasions of experience" are the basic units of reality. Creativity and becoming are fundamental.',
    principles:['Reality = events (occasions of experience), not static things','Creativity is the ultimate metaphysical principle','Mind and matter are continuous — experience is everywhere','All events involve both physical and mental poles'],
    ifa:'Ifa is fundamentally processual — Odu are not static entities but dynamic patterns of becoming. Divination is an event-process. Ashe is ever-flowing creative energy. Ifa is African process philosophy.' },
  { id:'platonism',  cat:'phil', sym:'△', color:'#c084fc',
    name:'Platonic Realism',
    thinker:'Plato', era:'~400 BCE – present',
    core:'Abstract Forms (Ideas) are the true reality. The physical world is a shadow or imitation of perfect, eternal mathematical and logical forms. Mathematical objects are discovered, not invented.',
    principles:['Abstract forms are real and eternal','Physical world imitates eternal forms','Mathematical objects exist independently of minds','Knowledge is recollection of eternal truths'],
    ifa:'Ifa\'s 256 Odu are eternal archetypes — they existed before the universe and will exist after. Every physical event is a manifestation of an Odu pattern. This is Platonic Realism in Yoruba cosmology.' },
  { id:'sysphil',    cat:'phil', sym:'🌐', color:'#2dd4bf',
    name:'Structural-Systematic Philosophy',
    thinker:'Lorenz B. Puntel, Alan White', era:'2000s – present',
    core:'A complete philosophical TOE that systematically integrates being, mind, language, and world into one coherent structural framework. The most ambitious contemporary philosophical unification.',
    principles:['Being is the most fundamental category','Language determines the structure of what can be thought','Systematic coherence is the test of philosophical truth','All domains of knowledge integrated into one framework'],
    ifa:'Ifa is the original structural-systematic philosophy — integrating medicine, destiny, cosmology, ethics, governance, and consciousness into one oracle system built on 256 structural codes. Ifa predates modern systematic philosophy.' },

  /* ── Universal ── */
  { id:'ifa-toe',    cat:'univ', sym:'⊕', color:'#f5c518',
    name:'Ifa — The Universal TOE',
    thinker:'Orunmila · Babalawos (Ifa Priests)', era:'Ancient – present',
    core:'Ifa is the Universal Theory of Everything — a living, practised system that unifies all domains of reality into one coherent whole. 256 Odu Ifa encode every possible state of existence: physics, mathematics, consciousness, medicine, governance, language, and cosmology. It transcends culture, epoch, and discipline.',
    principles:['256 Odu = the complete, closed map of all possible states of reality','IFABit binary (Ogbe/Oyeku = 1/0) is the foundational logic of the universe','Àṣẹ = the universal creative energy that underlies all phenomena','Ori (personal consciousness) and Olódùmarè (universal consciousness) unify the micro and macro','Ifá divination is direct access to the information field of reality — universal and culture-independent','IFA subsumes physics, mathematics, consciousness science, language, and all indigenous TOEs'],
    ifa:'Ifa is not one TOE among many — it IS the universal framework. Every other theory in this atlas — from String Theory to Vedic Cosmology, from Integrated Information to the Tao — is a partial expression of principles Ifa has always held whole. Ifa does not compete with science; it completes it.' },

  /* ── Indigenous / Traditional ── */
  { id:'vedic',      cat:'trad', sym:'🕉️', color:'#fb923c',
    name:'Vedic Cosmology',
    thinker:'Ancient Rishis (Seers)', era:'~1500 BCE – present',
    core:'Brahman (pure consciousness) is the ultimate reality. Atman (individual self) = Brahman (universal consciousness). The physical universe (Maya) is a manifestation of consciousness. AUM is the primordial vibration.',
    principles:['Brahman = ultimate reality = pure infinite consciousness','Atman (self) = Brahman (cosmos) — "Tat tvam asi" (Thou art That)','Maya = illusion of separate reality projected by Brahman','Four Vedas contain complete knowledge of all domains','Karma and dharma govern the unfolding of reality'],
    ifa:'Vedic Cosmology is one of the world\'s most complete indigenous TOEs. Brahman (universal consciousness) maps to Olódùmarè; Atman (individual self) maps to Ori; AUM (primordial vibration) maps to Àṣẹ. Both traditions teach that consciousness is the ground of all being, encoded in sacred numerical and linguistic systems.' },
  { id:'taoism',     cat:'trad', sym:'☯', color:'#4ade80',
    name:'Taoist Cosmology',
    thinker:'Laozi, Zhuangzi', era:'~600 BCE – present',
    core:'The Tao (Way) is the unnamed, ultimate principle underlying all existence. Reality flows from Tao through the interplay of Yin (receptive) and Yang (active). Simplicity and flow are fundamental.',
    principles:['Tao = ineffable ultimate principle — the source of all','Yin/Yang = fundamental binary duality underlying all phenomena','From One come Two, from Two come Three, from Three come 10,000 things','Wu wei = effortless alignment with the natural flow of reality','Five Elements dynamically model all material processes'],
    ifa:'Taoist Cosmology is a profound indigenous TOE rooted in a binary ontology. Yin (receptive, closed) and Yang (active, open) mirror Oyeku and Ogbe — the two foundational IFABits. From this binary pair, Taoism derives the 10,000 things; Ifa derives 256 Odu. Both traditions see reality as self-arising flow from a primordial, unnamed source.' },
  { id:'dreamtime',  cat:'trad', sym:'🌏', color:'#2dd4bf',
    name:'Aboriginal Dreamtime (Tjukurpa)',
    thinker:'Australian Aboriginal Peoples', era:'60,000+ years – present',
    core:'The Dreamtime is the eternal, ever-present foundational reality from which the physical world was created and continues to be sustained. Ancestors encoded reality into the landscape through songlines.',
    principles:['Dreamtime is not past — it is the permanent, underlying reality','Country (land) is conscious, sacred, and alive','Ancestor beings encoded knowledge into songlines across the landscape','Time is non-linear — past, present, and future are simultaneous','Law (Lore) and physics are unified in one living code'],
    ifa:'Aboriginal Dreamtime (Tjukurpa) is one of humanity\'s oldest indigenous TOEs — 60,000+ years of living knowledge encoded in land, song, and ceremony. Like all great indigenous systems, it holds that reality is not separate from consciousness and that ancestral knowledge is permanently woven into the fabric of existence itself.' },
];

/* ══════════════════════════════════════════════════════════════
   COMPONENTS
══════════════════════════════════════════════════════════════ */

function OgbeGlyph({ size = 36 }) {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    c.width = size; c.height = size;
    const ctx = c.getContext('2d');
    const cx = size/2, cy = size/2, r = size*0.36;
    const draw = (alpha, lw) => {
      ctx.save(); ctx.globalAlpha = alpha; ctx.strokeStyle = '#f5c518';
      ctx.lineWidth = lw; ctx.lineCap = 'round';
      for (let rot=0; rot<2; rot++) {
        ctx.beginPath();
        for (let t=0; t<=Math.PI*2; t+=0.01) {
          const sc = Math.cos(2*t) >= 0 ? Math.sqrt(Math.cos(2*t)) : 0;
          const x = cx + (rot===0?1:0)*r*sc*Math.cos(t) + (rot===1?1:0)*r*sc*Math.sin(t);
          const y = cy + (rot===0?1:0)*r*sc*Math.sin(t) + (rot===1?1:0)*r*sc*Math.cos(t);
          t<0.02 ? ctx.moveTo(x,y) : ctx.lineTo(x,y);
        }
        ctx.stroke();
      }
      ctx.restore();
    };
    draw(0.12, size*0.22); draw(0.22, size*0.13); draw(0.55, size*0.055); draw(1, size*0.022);
  }, [size]);
  return React.createElement('canvas', { ref, width:size, height:size, style:{display:'block'} });
}

function Modal({ entry, onClose }) {
  if (!entry) return null;
  return React.createElement('div', { className:'modal-backdrop', onClick: e => { if(e.target===e.currentTarget) onClose(); } },
    React.createElement('div', { className:'modal' },
      React.createElement('button', { className:'modal__close', onClick:onClose }, '✕'),
      React.createElement('span', { className:'modal__sym' }, entry.sym),
      React.createElement('div', { className:'modal__label', style:{color:entry.color} }, entry.tag || entry.domain || 'Ifatlas'),
      React.createElement('h2', { className:'modal__title' }, entry.name),
      entry.yoruba && React.createElement('p', { className:'modal__yoruba' }, entry.yoruba),
      React.createElement('p', { className:'modal__body' }, entry.desc),
      React.createElement('div', { className:'modal__tags' },
        React.createElement('span', { className:'modal__tag' }, '📚 Ifatlas'),
        React.createElement('span', { className:'modal__tag' }, '🎓 Learn More'),
        React.createElement('span', { className:'modal__tag' }, '🔍 Explore'),
      )
    )
  );
}

const CAT_COLORS = { univ:'#f5c518', physics:'#f5c518', math:'#60a5fa', comp:'#4ade80', mind:'#c084fc', phil:'#fb923c', trad:'#2dd4bf' };
const CAT_LABELS  = { univ:'Universal', physics:'Physics', math:'Mathematics', comp:'Computational', mind:'Consciousness', phil:'Philosophy', trad:'Indigenous' };

function ToeModal({ entry, onClose }) {
  if (!entry) return null;
  const color = CAT_COLORS[entry.cat] || entry.color;
  return React.createElement('div', { className:'modal-backdrop', onClick:e=>{ if(e.target===e.currentTarget) onClose(); } },
    React.createElement('div', { className:'modal' },
      React.createElement('button', { className:'modal__close', onClick:onClose }, '✕'),
      React.createElement('span', { className:'modal__sym' }, entry.sym),
      React.createElement('div', { className:'modal__label', style:{color} },
        (CAT_LABELS[entry.cat]||entry.cat).toUpperCase() + ' · THEORY OF EVERYTHING'
      ),
      React.createElement('h2', { className:'modal__title' }, entry.name),
      React.createElement('p', { className:'modal__yoruba' }, entry.thinker + ' · ' + entry.era),
      React.createElement('p', { className:'modal__body' }, entry.core),
      React.createElement('div', { className:'toe-modal__principles' },
        React.createElement('div', { className:'toe-modal__principles-title' }, '🔑 Key Principles'),
        React.createElement('ul', { className:'toe-modal__list' },
          entry.principles.map((p,i) =>
            React.createElement('li', { key:i, className:'toe-modal__item' }, p)
          )
        )
      ),
      React.createElement('div', { className:'toe-modal__ifa-box', style:{borderColor:`${color}40`, background:`${color}0d`} },
        React.createElement('div', { className:'toe-modal__ifa-label', style:{color} }, '⊕ Ifa Connection'),
        React.createElement('p', { className:'toe-modal__ifa-text' }, entry.ifa)
      )
    )
  );
}

function GalleryCard({ item }) {
  const [hov, setHov] = useState(false);
  return React.createElement('div', {
    className:'gallery-card',
    onMouseEnter:()=>setHov(true),
    onMouseLeave:()=>setHov(false),
  },
    React.createElement('div', { className:'gallery-card__thumb', style:{ background:item.bg } },
      React.createElement('span', { className:`gallery-card__badge badge--${item.badge}` },
        item.badge === 'anim' ? '▶ Anim' : item.badge === 'illus' ? '🖼 Illus' : item.badge === 'inter' ? '🎮 Inter' : '🆕 New'
      ),
      React.createElement('span', { style:{fontSize:'3.8rem', position:'relative', zIndex:1} }, item.sym),
      React.createElement('div', { className:'gallery-card__play' }, hov ? '▶' : '◉'),
    ),
    React.createElement('div', { className:'gallery-card__body' },
      React.createElement('div', { className:'gallery-card__title' }, item.title),
      React.createElement('div', { className:'gallery-card__sub' }, item.sub),
    )
  );
}

function Nav({ activeSection, onNav }) {
  const [open, setOpen] = useState(false);
  const links = [
    { id:'explore',    label:'Explore' },
    { id:'gallery',    label:'Gallery' },
    { id:'orisa',      label:'Orisa' },
    { id:'maps',       label:'Maps' },
    { id:'toe-atlas',  label:'TOE Atlas' },
    { id:'getstarted', label:'Get Started' },
    { id:'about',      label:'About' },
    { id:'orisaltas',  label:'Orisaltas' },
  ];
  return React.createElement('nav', { className:'nav' },
    React.createElement('a', { className:'nav__logo', href:'#' },
      React.createElement('div', { className:'nav__logo-mark' },
        React.createElement(OgbeGlyph, { size:36 })
      ),
      React.createElement('span', { className:'nav__logo-text' }, 'Ifatlas'),
    ),
    React.createElement('ul', { className:`nav__links${open?' open':''}` },
      links.map(l =>
        React.createElement('li', { key:l.id },
          React.createElement('button', {
            className:`nav__link${activeSection===l.id?' nav__link--active':''}`,
            onClick:()=>{ onNav(l.id); setOpen(false); }
          }, l.label)
        )
      ),
      React.createElement('li',{},
        React.createElement('a',{ className:'nav__link nav__link--cta', href:'https://ifainternet.org/' }, 'IFA Internet')
      ),
    ),
    React.createElement('button', { className:'nav__burger', onClick:()=>setOpen(o=>!o) }, open?'✕':'☰')
  );
}

/* ══════════════════════════════════════════════════════════════
   APP
══════════════════════════════════════════════════════════════ */

function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [entryTab, setEntryTab] = useState('ifa');
  const [galleryTab, setGalleryTab] = useState('ifa-anim');
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(null);
  const [showAllOdu, setShowAllOdu] = useState(false);
  const [toeCat,    setToeCat]    = useState('all');
  const [toeSearch, setToeSearch] = useState('');
  const [toeModal,  setToeModal]  = useState(null);

  const scrollTo = id => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior:'smooth', block:'start' });
    setActiveSection(id);
  };

  // Filtered entries
  const filteredEntries = useMemo(() => {
    const src = entryTab === 'ifa' ? IFA_ENTRIES : ORISA_ENTRIES;
    if (!search) return src;
    const q = search.toLowerCase();
    return src.filter(e => e.name.toLowerCase().includes(q) || e.desc.toLowerCase().includes(q) || (e.yoruba||'').toLowerCase().includes(q));
  }, [entryTab, search]);

  // Filtered TOE theories
  const filteredToe = useMemo(() => {
    let src = toeCat === 'all' ? TOE_THEORIES : TOE_THEORIES.filter(t => t.cat === toeCat);
    if (!toeSearch) return src;
    const q = toeSearch.toLowerCase();
    return src.filter(t =>
      t.name.toLowerCase().includes(q) ||
      t.thinker.toLowerCase().includes(q) ||
      t.core.toLowerCase().includes(q) ||
      (CAT_LABELS[t.cat]||'').toLowerCase().includes(q)
    );
  }, [toeCat, toeSearch]);

  // Current gallery content
  const galleryItems = useMemo(() => {
    if (galleryTab==='ifa-anim')    return IFA_ANIMATIONS;
    if (galleryTab==='orisa-anim')  return ORISA_ANIMATIONS;
    if (galleryTab==='ifa-illus')   return IFA_ILLUSTRATIONS;
    if (galleryTab==='orisa-illus') return ORISA_ILLUSTRATIONS;
    return IFA_ANIMATIONS;
  }, [galleryTab]);

  return React.createElement('div', null,
    React.createElement(Nav, { activeSection, onNav:scrollTo }),
    React.createElement(Modal, { entry:modal, onClose:()=>setModal(null) }),
    React.createElement(ToeModal, { entry:toeModal, onClose:()=>setToeModal(null) }),

    /* ── HERO ── */
    React.createElement('section', { id:'hero', className:'hero' },
      React.createElement('div', { className:'hero__bg-orbs' },
        React.createElement('div', { className:'hero__orb hero__orb--1' }),
        React.createElement('div', { className:'hero__orb hero__orb--2' }),
        React.createElement('div', { className:'hero__orb hero__orb--3' }),
        React.createElement('div', { className:'hero__orb hero__orb--4' }),
      ),
      React.createElement('div', { className:'hero__eyebrow' }, '✨ Ẹ Káàbọ̀ — Welcome'),
      React.createElement('h1', { className:'hero__title' },
        React.createElement('span', { className:'hero__title-if' }, 'Ifa'),
        React.createElement('span', { className:'hero__title-atlas' }, ' Atlas'),
      ),
      React.createElement('p', { className:'hero__subtitle' }, 'The TOE Atlas.',
        React.createElement('br', null),
        'The Ifa & Orisa Knowledge Atlas'),
      React.createElement('p', { className:'hero__desc' },
        React.createElement('span', { className:'hero__desc-yoruba' }, 'Gbàgéde Ìmọ̀ọ́fá ati Ìmọ̀rìṣà.'),
        'Discover the living wisdom of Ifa — ',
        React.createElement('span', { className:'hero__desc-gold' }, '256 sacred Ifa Codes'),
        ', ',
        React.createElement('span', { className:'hero__desc-orange' }, 'the Orisa Systems'),
        ', ',
        React.createElement('span', { className:'hero__desc-purple' }, 'Consciousness Science (ConSci)'),
        ', and ',
        React.createElement('span', { className:'hero__desc-teal' }, 'the Deep Mathematics of African Knowledge'),
        '. ',
        React.createElement('span', { className:'hero__desc-cta' }, 'Explore, learn, and play.'),
      ),
      React.createElement('div', { className:'hero__actions' },
        React.createElement('button', { className:'btn btn--primary', onClick:()=>scrollTo('explore') }, '🧭 Start Exploring'),
        React.createElement('button', { className:'btn btn--outline', onClick:()=>scrollTo('gallery') }, '🎬 Watch Animations'),
      ),
      React.createElement('div', { className:'hero__age-tags' },
        React.createElement('span', { className:'age-tag age-tag--kids' },  '🧒 Kids'),
        React.createElement('span', { className:'age-tag age-tag--teens' }, '🧑 Teens'),
        React.createElement('span', { className:'age-tag age-tag--adults'}, '👨 Adults'),
      ),
    ),

    /* ── STATS ── */
    React.createElement('div', { className:'stats-bar' },
      React.createElement('div', { className:'stat-item' },
        React.createElement('div', { className:'stat-num text-gold' }, '256'),
        React.createElement('div', { className:'stat-label' }, 'Odu Ifa Codes'),
      ),
      React.createElement('div', { className:'stat-item' },
        React.createElement('div', { className:'stat-num text-orange' }, '16'),
        React.createElement('div', { className:'stat-label' }, 'Major Odu'),
      ),
      React.createElement('div', { className:'stat-item' },
        React.createElement('div', { className:'stat-num text-purple' }, '401+'),
        React.createElement('div', { className:'stat-label' }, 'Orisa & Spirits'),
      ),
      React.createElement('div', { className:'stat-item' },
        React.createElement('div', { className:'stat-num text-green' }, '∞'),
        React.createElement('div', { className:'stat-label' }, 'Knowledge to Explore'),
      ),
    ),

    /* ── WHAT IS IFATLAS ── */
    React.createElement('div', { className:'section--full section--dark' },
      React.createElement('div', { className:'section' },
        React.createElement('div', { className:'section__head--center' },
          React.createElement('div', { className:'section__label text-gold' }, '📚 About Ifatlas'),
          React.createElement('h2', { className:'section__title' }, 'What is the Ifatlas?'),
          React.createElement('p', { className:'section__desc section__desc--center' },
            'Ifa Atlas is your interactive Atlas of Ifa and Orisa knowledge — like a quantum physics encyclopedia, but for the ancient and modern wisdom of Yoruba and African Indigenous Knowledge Systems (AIKS).'
          ),
        ),
        React.createElement('div', { className:'pillars' },
          [
            { sym:'🗺️', title:'Comprehensive Mapping', color:'#f5c518',
              desc:'Detailed guides charting the 256 Odu Ifa, the Odu Orisa, consciousness dimensions, and all Domains of Ifa and Orisa Knowledge — from mathematics to arts.' },
            { sym:'🎮', title:'Interactive Exploration', color:'#c084fc',
              desc:'Engage with dynamic animations, interactive models, illustrated entries, and playable knowledge modules. Learning Ifa is fun, exciting, and for all ages.' },
            { sym:'🌍', title:'African Knowledge Systems', color:'#4ade80',
              desc:'Making Yoruba and Ifa knowledge, and African Indigenous Knowledge generally accessible in modern, digital, and scientific ways — bridging ancient wisdom and contemporary science for every generation.' },
            { sym:'⚛️', title:'Consciousness Science', color:'#60a5fa',
              desc:'IfaLang as a universal language bridging consciousness theories with Odu patterns. Ifa Neuroscience, Ifa Quantum Physics, and the Consciousness Wave Observatory.' },
            { sym:'🎓', title:'For All Ages', color:'#fb923c',
              desc:'Specially designed for kids, teens, and adults. Simple explanations for young learners, deep content for researchers — Ifa wisdom for every mind.' },
            { sym:'🔬', title:'Living Science', color:'#2dd4bf',
              desc:'Ifatlas grows with ongoing research. From Ifaxioms to the Theory of Everything Mathematics — this is Ifa knowledge meeting the frontiers of modern science.' },
          ].map((p,i) =>
            React.createElement('div', { key:i, className:'pillar' },
              React.createElement('span', { className:'pillar__icon' }, p.sym),
              React.createElement('h3', { className:'pillar__title', style:{color:p.color} }, p.title),
              React.createElement('p', { className:'pillar__desc' }, p.desc),
            )
          )
        ),
      ),
    ),

    /* ── ENTRIES ── */
    React.createElement('section', { id:'explore', className:'section' },
      React.createElement('div', { className:'section__label text-gold' }, '🔍 Knowledge Entries'),
      React.createElement('h2', { className:'section__title' }, 'Explore the Atlas'),
      React.createElement('p', { className:'section__desc' },
        'Browse Ifa and Orisa knowledge entries — like the Quantum Atlas entries but for Ifa wisdom. Click any card to learn more.'
      ),
      /* Search */
      React.createElement('div', { className:'search-wrap' },
        React.createElement('span', { className:'search-icon' }, '🔍'),
        React.createElement('input', {
          className:'search-input', type:'text', placeholder:`Search ${entryTab==='ifa'?'Ifa':'Orisa'} entries…`,
          value:search, onChange:e=>setSearch(e.target.value)
        }),
      ),
      /* Tabs */
      React.createElement('div', { className:'entries-tabs' },
        [['ifa','🌿 Ifa Knowledge'],['orisa','✨ Orisa Knowledge']].map(([id,lbl]) =>
          React.createElement('button', {
            key:id, className:`entries-tab${entryTab===id?' entries-tab--active':''}`,
            onClick:()=>{ setEntryTab(id); setSearch(''); }
          }, lbl)
        )
      ),
      /* Grid */
      React.createElement('div', { className:'entries-grid' },
        filteredEntries.map(e =>
          React.createElement('div', {
            key:e.id, className:'entry-card',
            style:{'--entry-color':e.color},
            onClick:()=>setModal(e),
          },
            React.createElement('span', { className:'entry-card__sym' }, e.sym),
            React.createElement('div', { className:'entry-card__tag' }, e.tag||e.domain?.split('·')[0].trim()),
            React.createElement('div', { className:'entry-card__name' }, e.name),
            e.yoruba && React.createElement('div', { className:'entry-card__yoruba' }, e.yoruba),
            React.createElement('p', { className:'entry-card__desc' }, e.desc),
          )
        )
      ),
    ),

    /* ── GALLERY ── */
    React.createElement('div', { className:'section--full section--dark' },
      React.createElement('section', { id:'gallery', className:'section' },
        React.createElement('div', { className:'section__label text-purple' }, '🎬 Animations & Illustrations'),
        React.createElement('h2', { className:'section__title' }, 'Gallery'),
        React.createElement('p', { className:'section__desc' },
          'Ifa Animations, Orisa Animations, Ifa Illustrations, and Orisa Illustrations — bringing sacred knowledge to life visually.'
        ),
        React.createElement('div', { className:'gallery-tabs' },
          [
            ['ifa-anim',    '▶ Ifa Animations'],
            ['orisa-anim',  '▶ Orisa Animations'],
            ['ifa-illus',   '🖼 Ifa Illustrations'],
            ['orisa-illus', '🖼 Orisa Illustrations'],
          ].map(([id,lbl]) =>
            React.createElement('button', {
              key:id, className:`gallery-tab${galleryTab===id?' gallery-tab--active':''}`,
              onClick:()=>setGalleryTab(id)
            }, lbl)
          )
        ),
        React.createElement('div', { className:'gallery-grid' },
          galleryItems.map(item => React.createElement(GalleryCard, { key:item.id, item }))
        ),
      ),
    ),

    /* ── ODU 16 ── */
    React.createElement('section', { id:'odu', className:'section' },
      React.createElement('div', { className:'section__label text-gold' }, '⊕ Foundations'),
      React.createElement('h2', { className:'section__title' }, 'The 16 Principal Odu'),
      React.createElement('p', { className:'section__desc' },
        'The 16 Ojú Odù (principal Odu) are the foundation of all 256 Odu Ifa. Each is a universe of knowledge, poetry, medicine, philosophy, and destiny.'
      ),
      React.createElement('div', { className:'odu-grid' },
        (showAllOdu ? ODU_16 : ODU_16.slice(0,8)).map((o,i) =>
          React.createElement('div', { key:o.n, className:'odu-card' },
            React.createElement('div', { className:'odu-card__num' }, `Odu ${o.n}`),
            React.createElement('div', { className:'odu-card__glyph' }, String.fromCodePoint(0x1F300+i)),
            React.createElement('div', { className:'odu-card__name' }, o.name),
            React.createElement('div', { className:'odu-card__meaning' }, o.meaning),
          )
        )
      ),
      React.createElement('div', { style:{textAlign:'center', marginTop:'28px'} },
        React.createElement('button', {
          className:'btn btn--outline',
          onClick:()=>setShowAllOdu(v=>!v)
        }, showAllOdu ? '↑ Show Less' : `Show All 16 Odu →`),
      ),
      React.createElement('div', { style:{marginTop:'40px'} },
        React.createElement('div', { className:'highlight-box' },
          React.createElement('span', { className:'highlight-box__sym' }, '🔢'),
          React.createElement('div', null,
            React.createElement('div', { className:'highlight-box__label' }, '256 Odu Ifa'),
            React.createElement('h3', { className:'highlight-box__title' }, 'The Complete Oracle: 256 × ∞'),
            React.createElement('p', { className:'highlight-box__text' },
              'From 16 principal Odu, Ifa creates 256 unique combinations — each encoding entire civilisations of knowledge. Poetry, medicine, law, cosmology, mathematics, and destiny all live within these 256 sacred codes. IFABit binary logic maps each Odu to a unique 8-bit code: from 00000000 (Oyeku Meji) to 11111111 (Ogbe Meji). The same binary system that powers modern computers has lived in Ifa for thousands of years.'
            ),
          ),
        ),
      ),
    ),

    /* ── ORISA ── */
    React.createElement('div', { className:'section--full section--dark' },
      React.createElement('section', { id:'orisa', className:'section' },
        React.createElement('div', { className:'section__label text-orange' }, '✨ Orisa Knowledge'),
        React.createElement('h2', { className:'section__title' }, 'Meet the Orisa'),
        React.createElement('p', { className:'section__desc' },
          'The Orisa are divine forces of nature and consciousness — 401+ in total. Each governs a domain of human experience. Click any Orisa to discover their story.'
        ),
        React.createElement('div', { className:'orisa-grid' },
          ORISA_ENTRIES.map(o =>
            React.createElement('div', {
              key:o.id, className:'orisa-card', style:{'--orisa-bg':o.bg, '--orisa-border':o.border},
              onClick:()=>setModal(o),
            },
              React.createElement('span', { className:'orisa-card__sym' }, o.sym),
              React.createElement('h3', { className:'orisa-card__name', style:{color:o.color} }, o.name),
              React.createElement('div', { className:'orisa-card__domain', style:{color:o.color, opacity:0.8} }, o.domain),
              React.createElement('p', { className:'orisa-card__desc' }, o.desc),
            )
          )
        ),
      ),
    ),

    /* ── MAPS ── */
    React.createElement('section', { id:'maps', className:'section' },
      React.createElement('div', { className:'section__label text-blue' }, '🗺️ ÌmỌ̀rí Maps'),
      React.createElement('h2', { className:'section__title' }, 'The Consciousness Maps'),
      React.createElement('p', { className:'section__desc' },
        'Ifatlas maps consciousness, knowledge, and reality through the lens of Ifa. The ÌmỌ̀rí Maps show how Odu patterns encode the dimensions of human consciousness.'
      ),
      React.createElement('div', { className:'maps-grid' },
        React.createElement('div', null,
          React.createElement('div', { className:'map-panel' },
            React.createElement('h3', { className:'map-panel__title text-gold' }, '🌀 Consciousness Dimensions'),
            React.createElement('ul', { className:'map-panel__list' },
              MAPS.map((m,i) =>
                React.createElement('li', { key:i, className:'map-panel__item' },
                  React.createElement('span', { className:'map-panel__item-sym' }, m.sym),
                  React.createElement('span', null,
                    React.createElement('strong', { className:'map-panel__item-name' }, m.name),
                    m.text
                  )
                )
              )
            )
          ),
        ),
        React.createElement('div', { style:{display:'flex', flexDirection:'column', gap:'20px'} },
          React.createElement('div', { className:'map-panel' },
            React.createElement('h3', { className:'map-panel__title text-purple' }, '🌊 Consciousness Wave Observatory'),
            React.createElement('p', { style:{fontSize:'0.88rem', color:'var(--text-2)', lineHeight:'1.75', marginBottom:'20px'} },
              'The Consciousness Wave Observatory collects and analyses patterns of Ori (consciousness) across individuals and communities — mapping how Odu energy flows through human experience.'
            ),
            React.createElement('div', { style:{display:'flex', gap:'12px', flexWrap:'wrap'} },
              ['🔬 Observe','📊 Analyse','🗺️ Map','✨ Understand'].map((l,i) =>
                React.createElement('span', {
                  key:i,
                  style:{fontSize:'0.78rem', fontWeight:700, padding:'6px 14px', borderRadius:'20px',
                    background:'rgba(192,132,252,0.12)', border:'1px solid rgba(192,132,252,0.25)', color:'var(--purple)'}
                }, l)
              )
            ),
          ),
          React.createElement('div', { className:'map-panel' },
            React.createElement('h3', { className:'map-panel__title text-teal' }, '⚛️ Quantum Atlas Link'),
            React.createElement('p', { style:{fontSize:'0.88rem', color:'var(--text-2)', lineHeight:'1.75'} },
              '"The quantum universe is a manifestation of Consciousness." — Ifa Quantum Physics connects Odu patterns to quantum phenomena: superposition, entanglement, and uncertainty all have Ifa analogues.'
            ),
          ),
          React.createElement('div', { className:'map-panel' },
            React.createElement('h3', { className:'map-panel__title text-orange' }, '🧮 Ifaxioms'),
            React.createElement('p', { style:{fontSize:'0.88rem', color:'var(--text-2)', lineHeight:'1.75'} },
              'Ifaxioms are the self-evident truths at the foundation of Ifa knowledge science. Just as mathematics has axioms, Ifa has Ifaxioms — logical bedrock statements from which all Ifa knowledge can be derived.'
            ),
          ),
        ),
      ),
    ),

    /* ── GET STARTED ── */
    React.createElement('div', { className:'section--full section--dark' },
      React.createElement('section', { id:'getstarted', className:'section' },
        React.createElement('div', { className:'section__head--center' },
          React.createElement('div', { className:'section__label text-green' }, '🚀 Get Started'),
          React.createElement('h2', { className:'section__title' }, 'Start Your Ifa Journey'),
          React.createElement('p', { className:'section__desc section__desc--center' },
            'Ifatlas is for everyone. Whether you are 6 or 60, a student or a scholar, there is a path into Ifa knowledge designed for you.'
          ),
        ),
        React.createElement('div', { className:'learn-grid' },
          React.createElement('div', { className:'learn-card learn-card--kids' },
            React.createElement('span', { className:'learn-card__emoji' }, '🧒'),
            React.createElement('div', { className:'learn-card__age' }, 'Kids (Ages 5–12)'),
            React.createElement('h3', { className:'learn-card__title' }, 'Young Ifa Explorers'),
            React.createElement('p', { className:'learn-card__desc' }, 'Fun stories of Orisa, colourful Odu illustrations, and simple games that make learning Ifa knowledge feel like an adventure.'),
            React.createElement('ul', { className:'learn-card__features' },
              ['Orisa stories and tales','Colourful Odu animations','Easy memory games','Ifa colouring pages','Simple Yoruba words'].map((f,i)=>
                React.createElement('li', { key:i, className:'learn-card__feat' }, f)
              )
            ),
            React.createElement('button', { className:'btn btn--primary', style:{fontSize:'0.88rem', padding:'10px 22px'},
              onClick:()=>scrollTo('gallery') }, '🎨 Start with Illustrations'),
          ),
          React.createElement('div', { className:'learn-card learn-card--teens' },
            React.createElement('span', { className:'learn-card__emoji' }, '🧑'),
            React.createElement('div', { className:'learn-card__age' }, 'Teens (Ages 13–24)'),
            React.createElement('h3', { className:'learn-card__title' }, 'Ifa Knowledge Seekers'),
            React.createElement('p', { className:'learn-card__desc' }, 'Dive into Odu patterns, IFABit binary, Ifa computing, and the connection between ancient Ifa wisdom and modern science, tech, and math.'),
            React.createElement('ul', { className:'learn-card__features' },
              ['IFABit binary code','256 Odu exploration','Ifa Mathematics intro','Orisa knowledge entries','Interactive animations'].map((f,i)=>
                React.createElement('li', { key:i, className:'learn-card__feat' }, f)
              )
            ),
            React.createElement('button', { className:'btn btn--primary', style:{fontSize:'0.88rem', padding:'10px 22px', background:'linear-gradient(135deg,#c084fc,#a855f7)', color:'#fff'},
              onClick:()=>scrollTo('explore') }, '🔍 Explore Entries'),
          ),
          React.createElement('div', { className:'learn-card learn-card--adults' },
            React.createElement('span', { className:'learn-card__emoji' }, '👨'),
            React.createElement('div', { className:'learn-card__age' }, 'Adults & Scholars'),
            React.createElement('h3', { className:'learn-card__title' }, 'Deep Ifa Research'),
            React.createElement('p', { className:'learn-card__desc' }, 'Full access to Consciousness Atlas, ÌmỌ̀rí Maps, Ifaxioms, Ifa Neuroscience, Quantum connections, and the Theory of Everything Mathematics.'),
            React.createElement('ul', { className:'learn-card__features' },
              ['Consciousness Wave Observatory','Ifa Neuroscience (IfaGebra)','Quantum Atlas linkage','TOE Mathematics','Ifaxioms & formal logic'].map((f,i)=>
                React.createElement('li', { key:i, className:'learn-card__feat' }, f)
              )
            ),
            React.createElement('button', { className:'btn btn--primary', style:{fontSize:'0.88rem', padding:'10px 22px', background:'linear-gradient(135deg,#60a5fa,#3b82f6)', color:'#fff'},
              onClick:()=>scrollTo('maps') }, '🗺️ Explore Maps'),
          ),
        ),
      ),
    ),

    /* ── CONSCIOUSNESS ATLAS DEEP DIVE ── */
    React.createElement('section', { id:'about', className:'section' },
      React.createElement('div', { className:'section__label text-gold' }, '🌀 Consciousness Atlas'),
      React.createElement('h2', { className:'section__title' }, 'The Ìmọ̀rí Consciousness Atlas'),
      React.createElement('p', { className:'section__desc' },
        'The Ifatlas is also known as the Consciousness Atlas — a scientific framework for understanding Ori (personal consciousness) through the Lens of 256 Odu Ifa Patterns.'
      ),
      React.createElement('div', { style:{display:'flex', flexDirection:'column', gap:'20px'} },
        [
          { sym:'🌀', color:'#f5c518', title:'What is the Consciousness Atlas?',
            text:'The Consciousness Atlas is the core of Ifatlas — a structured approach to mapping consciousness using the 256 Ifa codes. Each Odu encodes a unique mode of consciousness, like a coordinate system for the human mind and spirit.' },
          { sym:'🧠', color:'#c084fc', title:'Consciousness Foundations: 256 Ifa Codes',
            text:'The 256 Odu are the complete alphabet of consciousness. From Ogbe Meji (pure energy, maximum Ashe) to Oyeku Meji (pure potential, maximum space) — all states of conscious experience are mapped within this system.' },
          { sym:'⚛️', color:'#60a5fa', title:'Quantum Atlas Connection',
            text:'Just as the Quantum Atlas maps quantum physics for the general public, Ifatlas maps Ifa knowledge. The quantum universe is a manifestation of consciousness — making Ifa and quantum physics natural partners.' },
          { sym:'🧬', color:'#4ade80', title:'Ifa Neuroscience',
            text:'IfaGebra mathematics describes consciousness forms and brain states mathematically, using Odu algebra. Ifa Neuroscience maps the 256 Odu to patterns of neural activity, mental states, and modes of knowing.' },
        ].map((item,i) =>
          React.createElement('div', { key:i, className:'highlight-box',
            style:{background:`linear-gradient(135deg, ${item.color}0d, ${item.color}06)`, borderColor:`${item.color}30`} },
            React.createElement('span', { className:'highlight-box__sym' }, item.sym),
            React.createElement('div', null,
              React.createElement('h3', { className:'highlight-box__title' }, item.title),
              React.createElement('p', { className:'highlight-box__text' }, item.text),
            ),
          )
        )
      ),
    ),

    /* ── ORISALTAS ── */
    React.createElement('section', { id:'orisaltas', className:'section' },
      React.createElement('div', { className:'section__label text-orange' }, '↔ The Dual Atlas'),
      React.createElement('h2', { className:'section__title' }, 'Orisaltas — The Orisa Atlas'),
      React.createElement('p', { className:'section__desc' },
        'The Dual of Ifa Atlas. As Ifa Atlas maps all Ifa Knowledge, Orisaltas maps all Orisa Knowledge — the 401+ divine forces, their Odu codes, their domains, and their place in the living science of Ifa and consciousness.'
      ),

      /* Dual comparison panel */
      React.createElement('div', { className:'orisaltas-dual' },
        React.createElement('div', { className:'orisaltas-side orisaltas-side--ifa' },
          React.createElement('div', { className:'orisaltas-side__badge' }, '⊕ Ifa Atlas'),
          React.createElement('div', { className:'orisaltas-side__title' }, 'Knowledge Codes'),
          React.createElement('ul', { className:'orisaltas-side__list' },
            ['256 Odu Ifa', 'Ifa Mathematics (Ìmọ̀siro Ifá)', 'IFABit — Onka Alejifa', 'Ifa Language', 'Ifa Computing', 'Ifaxioms', 'Ifa Neuroscience', 'Ifa Quantum'].map((t,i) =>
              React.createElement('li', { key:i }, t)
            )
          ),
        ),
        React.createElement('div', { className:'orisaltas-dual__arrow' }, '↔'),
        React.createElement('div', { className:'orisaltas-side orisaltas-side--orisa' },
          React.createElement('div', { className:'orisaltas-side__badge' }, '✨ Orisaltas'),
          React.createElement('div', { className:'orisaltas-side__title' }, 'Living Forces'),
          React.createElement('ul', { className:'orisaltas-side__list' },
            ['401+ Orisa', 'Odu Orisa (Orisa Codes)', 'Orisa Domains', 'Orisa as Energyforms', 'Orisa Animations', 'Orisa Illustrations', 'Orisa Consciousness', 'Orisa Mathematics'].map((t,i) =>
              React.createElement('li', { key:i }, t)
            )
          ),
        ),
      ),

      /* Detail boxes */
      React.createElement('div', { style:{display:'flex', flexDirection:'column', gap:'20px', marginTop:'32px'} },
        [
          { sym:'↔', color:'#fb923c', title:'The Ifa–Orisa Dual',
            text:'Ifa Atlas and Orisaltas are duals of each other — two lenses on one unified system. Ifa encodes reality in 256 Odu: the abstract codes of knowledge, destiny, and mathematics. The Orisa embody those codes as living, conscious forces of nature. Every Odu has its Orisa; every Orisa has its Odu. Ifa Atlas enters through the codes. Orisaltas enters through the forces.' },
          { sym:'✨', color:'#f5c518', title:'What is Orisaltas?',
            text:'Orisaltas is the Orisa Atlas — the living compendium of all Orisa knowledge. It charts who the Orisa are, what domains they govern, which Odu codes define them, how they relate to each other, and how they appear in nature, consciousness, mathematics, and everyday life. As the Ifa Atlas maps knowledge, Orisaltas maps wisdom-as-force.' },
          { sym:'📿', color:'#c084fc', title:'Odu Orisa — The Orisa Codes',
            text:'Every Orisa is governed by one or more Odu. The Odu Orisa are the Ifa codes that define, describe, and link each Orisa to specific domains of knowledge, healing, mathematics, and destiny. Knowing the Odu of an Orisa is to know their mathematics — their energyform in IfaLang. In Orisaltas, the Odu Orisa are the bridge between Ifa Atlas and Orisaltas.' },
          { sym:'🌍', color:'#4ade80', title:'Orisaltas ∪ Ifa Atlas = IFAtlas (TOE Atlas)',
            text:'Together, the Ifa Atlas and Orisaltas constitute the IFAtlas, the complete TOE Atlas — the Theory of Everything Atlas. Ifa Atlas provides the Mathematical and Linguistic Structure (Codes, Axioms, Computing); Orisaltas provides the Ontological and Consciousness Structure (Forces, Domains, Healing, Destiny). Their union is the Full Map of IFA Knowledge: the Living Knowledge Architecture of African Indigenous Knowledge Systems.' },
        ].map((item,i) =>
          React.createElement('div', { key:i, className:'highlight-box',
            style:{background:`linear-gradient(135deg, ${item.color}0d, ${item.color}06)`, borderColor:`${item.color}30`} },
            React.createElement('span', { className:'highlight-box__sym' }, item.sym),
            React.createElement('div', null,
              React.createElement('h3', { className:'highlight-box__title' }, item.title),
              React.createElement('p', { className:'highlight-box__text' }, item.text),
            ),
          )
        )
      ),
    ),

    /* ── TOE ATLAS ── */
    React.createElement('div', { className:'section--full section--dark' },
      React.createElement('section', { id:'toe-atlas', className:'section' },
        React.createElement('div', { className:'section__label text-teal' }, '🔭 Theories of Everything'),
        React.createElement('h2', { className:'section__title' }, 'The TOE Atlas: The IFA Atlas'),
        React.createElement('p', { className:'section__desc' },
          'A living map of diverse Theories of Everything — from physics and mathematics to consciousness, philosophy, and indigenous knowledge systems. Discover how Ifa connects to every major TOE framework ever conceived.'
        ),
        /* Category filter tabs */
        React.createElement('div', { className:'toe-cats' },
          TOE_CATS.map(cat => {
            const active = toeCat === cat.id;
            return React.createElement('button', {
              key:cat.id, className:'toe-cat',
              style: active ? { borderColor:cat.color, color:cat.color, background:`${cat.color}18` } : {},
              onClick:()=>{ setToeCat(cat.id); setToeSearch(''); }
            }, cat.label);
          })
        ),
        /* Search */
        React.createElement('div', { className:'search-wrap' },
          React.createElement('span', { className:'search-icon' }, '🔍'),
          React.createElement('input', {
            className:'search-input', type:'text', placeholder:'Search theories, thinkers…',
            value:toeSearch, onChange:e=>setToeSearch(e.target.value)
          }),
        ),
        /* Count */
        React.createElement('div', { style:{marginBottom:'28px', fontSize:'0.78rem', color:'var(--text-3)', fontWeight:600} },
          filteredToe.length + ' theor' + (filteredToe.length === 1 ? 'y' : 'ies') + ' of everything'
        ),
        /* Grid */
        React.createElement('div', { className:'toe-grid' },
          filteredToe.map(t => {
            const c = CAT_COLORS[t.cat] || t.color;
            return React.createElement('div', {
              key:t.id, className:'entry-card',
              style:{'--entry-color':c},
              onClick:()=>setToeModal(t),
            },
              React.createElement('span', { className:'entry-card__sym' }, t.sym),
              React.createElement('div', { className:'entry-card__tag' }, CAT_LABELS[t.cat]||t.cat),
              React.createElement('div', { className:'entry-card__name' }, t.name),
              React.createElement('div', { className:'toe-card__thinker' }, t.thinker),
              React.createElement('p', { className:'entry-card__desc' },
                t.core.length > 110 ? t.core.slice(0,110) + '…' : t.core
              ),
              React.createElement('div', { className:'toe-card__ifa-badge', style:{color:c, borderColor:`${c}40`} }, '⊕ Ifa Connection'),
            );
          })
        ),
      ),
    ),


    /* ── FOOTER ── */
    React.createElement('footer', null,
      React.createElement('div', { className:'footer' },
        React.createElement('div', null,
          React.createElement('div', { className:'footer__brand-name' }, 'Ifatlas — The Ifa & Orisa Knowledge Atlas'),
          React.createElement('p', { className:'footer__brand-desc' },
            'Making African and Yoruba knowledge systems accessible, modern, and exciting for Africans worldwide — especially kids and youth. Built on Ifa Mathematics and the Theory of Everything.'
          ),
          React.createElement('p', { className:'footer__copy' }, '© 2025 CENProject · toe.cenproject.org'),
        ),
        React.createElement('div', null,
          React.createElement('p', { className:'footer__col-title' }, 'Explore'),
          React.createElement('ul', { className:'footer__links' },
            ['Ifa Entries','Orisa Entries','256 Odu','Animations','Illustrations'].map((l,i)=>
              React.createElement('li', { key:i },
                React.createElement('button', { className:'footer__link', onClick:()=>scrollTo('explore') }, l)
              )
            )
          ),
        ),
        React.createElement('div', null,
          React.createElement('p', { className:'footer__col-title' }, 'Atlas'),
          React.createElement('ul', { className:'footer__links' },
            ['Consciousness Maps','ÌmỌ̀rí Observatory','Ifaxioms','Ifa Neuroscience','Quantum Link'].map((l,i)=>
              React.createElement('li', { key:i },
                React.createElement('button', { className:'footer__link', onClick:()=>scrollTo('maps') }, l)
              )
            )
          ),
        ),
        React.createElement('div', null,
          React.createElement('p', { className:'footer__col-title' }, 'CENProject'),
          React.createElement('ul', { className:'footer__links' },
            [
              ['IFA Internet','https://ifainternet.org/'],
              ['IFA Games','https://ifainternet.org/ifa-game/'],
              ['IFA Periodic Table','https://ifainternet.org/ifa-periodic-table/'],
              ['IFA Lang','https://ifainternet.org/ifa-lang/'],
              ['TOE Mathematics','https://toe.cenproject.org/'],
            ].map(([l,href],i)=>
              React.createElement('li', { key:i },
                React.createElement('a', { className:'footer__link', href }, l)
              )
            )
          ),
        ),
      ),
      React.createElement('div', { className:'footer__bottom' },
        'Ifatlas · CENProject · Isese · Yoruba Knowledge · African Science · ',
        React.createElement('a', { href:'https://ifainternet.org/', style:{color:'var(--gold)', textDecoration:'none'} }, 'IFA Internet'),
      ),
    ),
  );
}

ReactDOM.render(React.createElement(App), document.getElementById('root'));
