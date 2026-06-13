/* ─────────────────────────────────────────────────────────────────────────────
   IFA Matrix Platform
   The IFA Internet · CENProject
   ifainternet.org/ifa-matrix/
───────────────────────────────────────────────────────────────────────────── */

const { useState, useEffect } = React;

// ─── DATA ─────────────────────────────────────────────────────────────────────

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

// ─── 0+8D MODEL DATA ──────────────────────────────────────────────────────────
// D[i] maps to STEAMSEX: S(Science) T(Tech) E(Eng) A(Arts) M(Math) S(Social) E(Edu) X(Others)

const DIMS_8 = [
  { letter:'S', name:'(Natural) Science', color:'#f0920c' },
  { letter:'T', name:'Technology',        color:'#14b8d4' },
  { letter:'E', name:'Engineering',       color:'#00c87c' },
  { letter:'A', name:'Arts',              color:'#ec4899' },
  { letter:'M', name:'Mathematics',       color:'#f5c518' },
  { letter:'S', name:'Social Science',    color:'#8b5cf6' },
  { letter:'E', name:'Education',         color:'#3b9eff' },
  { letter:'X', name:'Others (Unknown)',  color:'#6366f1' },
];

const ODU_D8 = {
  '01': {
    ground: 'Èjìogbè — king of all 256 Odù Ifá — embodies the power and light of day, the most powerful and beneficent of all Odus, bestowing blessings of every kind upon those for whom it is cast. It governs beginnings, divine light, and the original order established by Olodumare from which all other Odus emerge.',
    dims: [
      'Symmetry laws govern all forces and fields',
      'Symmetric architectures yield balanced, resilient systems',
      'Structural symmetry defines load-bearing balance',
      'Classical proportion and aesthetic harmony',
      'Group theory encodes all symmetry structures',
      'Social equilibrium through symmetric exchange',
      'Balanced curricula mirror cognitive symmetry',
      'Hidden Ifa symmetries underlie all unknowns',
    ],
  },
  '02': {
    ground: 'Ọ̀yẹ̀kú Méjì is the Odu of darkness, death, and transformation — its name derives from "o yeye iku," spirit of the mother of death. It governs the end of cycles, the transition between worlds, and the regenerative power of endings, teaching that nothing is truly destroyed but only transformed into a new state.',
    dims: [
      'Conservation laws persist across all transformations',
      'Invariant protocols ensure reliable digital systems',
      'Material constants define all engineering limits',
      'Timeless aesthetic principles transcend all eras',
      'Topological invariants classify all spaces',
      'Cultural constants persist through social change',
      'Core knowledge invariants anchor all learning',
      'Universal constants govern all unknown phenomena',
    ],
  },
  '03': {
    ground: 'Ìwòrì Méjì is deeply associated with the inner mind, inner vision, and self-knowledge, above all reminding practitioners that good character (Ìwà pẹ̀lẹ́) is the foundation of all spiritual progress. It governs introspection, conscience, and the hidden workings of the heart.',
    dims: [
      'Wave-particle duality unifies matter and energy',
      'Hardware-software duality structures all computing',
      'Tension-compression duality in structural design',
      'Light-shadow and form-space aesthetic dualities',
      'Dual vector spaces and Poincaré duality',
      'Individual-collective dual social dynamics',
      'Theory-practice duality governs all pedagogy',
      'Known-unknown duality maps the knowledge frontier',
    ],
  },
  '04': {
    ground: 'Òdí Méjì governs fertility, birth, and the blessings of children — its core blessing is ire ọmọ, the good fortune of offspring and new life welcomed from heaven to earth. It also rules over hidden things, the womb, and the secrets held within the earth.',
    dims: [
      'Life and consciousness emerge from chemistry',
      'Intelligence emerges from simple computational rules',
      'Complex systems arise from simple element interactions',
      'Style and tradition emerge from individual works',
      'Higher structures emerge from axiomatic foundations',
      'Culture and language emerge from interaction',
      'Deep understanding emerges through iterative learning',
      'New phenomena emerge at every unknown boundary',
    ],
  },
  '05': {
    ground: 'Ìrosùn Méjì is the Odu of blood, lineage, and the flow of life force between generations, governing the continuity of sacred traditions and prosperity through alignment with ancestral heritage. It teaches that divine order is maintained through the proper flow of sacrifice and deep respect for the life force.',
    dims: [
      'Molecules compose from atoms; life from molecules',
      'Systems compose from modules, APIs, and services',
      'Engineering systems built from composed subsystems',
      'Musical and visual works composed layer by layer',
      'Function composition and group algebraic structures',
      'Societies compose from individuals and institutions',
      'Curricula compose from foundational knowledge units',
      'Unknown systems compose from known Odu elements',
    ],
  },
  '06': {
    ground: 'Ọ̀wọ́nrín Méjì governs unpredictable, dynamic, and transformative forces — change, upheaval, and the cycle of destruction and renewal through invisible forces that create unexpected mixtures in life. Its teaching is that struggle and hardship are a sacred path toward wisdom, resilience, and alignment with destiny.',
    dims: [
      'Ecosystems irreducible to species inventories alone',
      'System behaviour transcends component specifications',
      'Holistic engineering integrates all subsystems fully',
      'Aesthetic wholeness exceeds technique and material',
      'Mathematical structures richer than axioms alone',
      'Social wholes exceed sum of individual characteristics',
      'Education as holistic whole-person development',
      'The unknown whole always contains all known parts',
    ],
  },
  '07': {
    ground: 'Ọ̀bàrà Méjì is the Odu of royalty, leadership, and generosity, governing kings, wealth, and dignity with close association to Sango and the power of kingship. It teaches that true authority comes with the responsibility to be magnanimous and to use one\'s abundance in service of the community.',
    dims: [
      'Particle physics reduces matter to quantum fields',
      'All algorithms reduce to binary Turing operations',
      'Engineering grounded in material science and physics',
      'Art reduced to form, colour, and composition',
      'Axiomatic foundations underlie all of mathematics',
      'Social behaviour traced to individual incentives',
      'All knowledge traced to first axiomatic principles',
      'All unknowns reducible to Ifa first principles',
    ],
  },
  '08': {
    ground: 'Ọ̀kànràn Méjì is associated with conflict, sudden events, and the power of spiritual confrontation, governing lightning, fire, and all forces that strike suddenly and demand immediate response. Its teaching centres on constant vigilance, proper worship, and the avoidance of rash actions.',
    dims: [
      'Physical reality as BaseField quantum simulation',
      'Digital worlds and metaverses as Ifa simulations',
      'Systems modelled and simulated before physical build',
      'Art as simulation of emotion and lived experience',
      'Mathematics as simulation of abstract Ifa reality',
      'Social systems simulated to predict behaviour',
      'Learning as simulation of real-world application',
      'All unknowns are deeper Odu simulation states',
    ],
  },
  '09': {
    ground: 'Ògúndá Méjì is the Odu of Ogun — Orisa of iron, labour, roads, and warfare — governing the clearing of obstacles, direct action, justice, and the discipline required to open new paths. It teaches that progress often requires both creation and confrontation, and that the force of iron cuts away what blocks the way forward.',
    dims: [
      'Symmetry breaking drives all natural phase transitions',
      'Asymmetric designs enable directed computation',
      'Asymmetric loads reveal and test structural limits',
      'Asymmetry creates dynamic tension and energy in art',
      'Non-commutative algebra breaks classical symmetry',
      'Social asymmetries reveal hidden power structures',
      'Breaking conventions drives educational innovation',
      'Asymmetric unknowns challenge all established frameworks',
    ],
  },
  '10': {
    ground: 'Ọ̀sá Méjì belongs to the domain of Ìyàmì Òṣòòròngà — the terrestrial mothers — and deep respect must be accorded to these powers whenever this Odu appears. It governs sudden reversal, the wrath of the sacred mothers, and the radical transformations that come when boundaries are violated.',
    dims: [
      'Entropy and irreversibility define natural change',
      'Adaptive systems evolve beyond fixed protocols',
      'Material fatigue and drift challenge engineering stability',
      'Evolving styles produce aesthetic paradigm shifts',
      'Flux challenges topological and algebraic constants',
      'Social norms shift and transform across generations',
      'Knowledge itself updates as understanding evolves',
      'Flux and change characterise all unknown frontiers',
    ],
  },
  '11': {
    ground: 'Ìká Méjì governs the gathering and wielding of personal power through speech, intention, and action, revealing the duality of power — its capacity to protect and create on one side, to deceive and destroy on the other. It strongly emphasises ethical conduct, discretion, and the consequences of misused authority.',
    dims: [
      'Unified field theories dissolve all apparent dualities',
      'Convergence unifies hardware and software as one',
      'Integrated monolithic design unifies all subsystems',
      'Synthesis beyond opposites unifies artistic expression',
      'Category theory unifies all mathematical dualities',
      'Social unity transcends individual-collective divides',
      'Holistic learning dissolves theory-practice boundaries',
      'Non-dual awareness encompasses all unknown phenomena',
    ],
  },
  '12': {
    ground: 'Òtúrúpọ̀n Méjì is associated with how intelligence and reason first came into the world, governing recovery, regeneration, restoration of harmony, and the endurance required to navigate hidden truths and instability. It teaches that wisdom is attained through resilience and disciplined self-reflection.',
    dims: [
      'Reductionist analysis reverses emergent complexity',
      'Debugging traces emergent faults to root causes',
      'Failure analysis decomposes systems to components',
      'Deconstruction returns artistic form to raw elements',
      'Decomposing structures to their generating axioms',
      'Social analysis reduced to individual-level acts',
      'Deep drilling beneath apparent surface understanding',
      'Dissolving emergent unknowns to fundamental Odu roots',
    ],
  },
  '13': {
    ground: 'Òtúrá Méjì is closely associated with Orunmila and the power of divine protection against evil, governing the relationship between Orunmila and Esu, the mysteries of speech and destiny, and the power of proper sacrifice to open blocked paths. It is the Odu through which Orunmila made Ebo and freed himself from great difficulties.',
    dims: [
      'Molecular decomposition reveals underlying atomic structure',
      'Microservice decomposition of monolithic systems',
      'Systems decomposed for maintenance and full repair',
      'Analytical deconstruction of complex artistic works',
      'Prime factorisation and full algebraic decomposition',
      'Institutional decomposition for deep social analysis',
      'Curricula unbundled into discrete learning modules',
      'Unknown systems decomposed into identifiable Odu',
    ],
  },
  '14': {
    ground: 'Ìrẹtẹ̀ Méjì — Eji-Elemere, "one who mocks Iku" — is the Odu that speaks of strength, courage, and active vitality, governing long life, profitability, and the blessings of the earth-mother (Ile). It teaches patience, humility, and good character as the keys to enduring success and spiritual alignment.',
    dims: [
      'Specialised domains enable focused scientific depth',
      'Modular design cleanly isolates system components',
      'Compartmentalised engineering for safety and clarity',
      'Mastery of specific techniques in artistic practice',
      'Specialised branches of pure mathematical study',
      'Niche communities and subgroup social dynamics',
      'Deep specialisation and subject-focus in learning',
      'Partitioned study maps and isolates unknown domains',
    ],
  },
  '15': {
    ground: 'Ọ̀ṣẹ́ Méjì governs prosperity, fertility, family development, and the power of sacrifice — its core message being "sacrifice and you will achieve victory." Associated with Oshun and Orunmila, it teaches that sustained prosperity is the reward for consistent and sincere offering.',
    dims: [
      'Systems biology transcends molecular-level reductionism',
      'Emergent computing exceeds binary base operations',
      'Integrated systems engineering beyond component parts',
      'Synthetic art movements dissolve all formal rule-sets',
      'Mathematical synthesis unifies beyond axiomatics',
      'Social synthesis emerges beyond individual data points',
      'Integrative education bridges across all subject silos',
      'Synthetic Ifa frameworks encompass all unknowns',
    ],
  },
  '16': {
    ground: 'Òfún Méjì — Orangun — represents the mystic power of the feminine divinity Odù, one of the most powerful and sensitive Orisa and a wife of Orunmila, governing the deepest mysteries and taboos of Ifa. Considered both the end and the beginning, Ofun completes the cycle of the 16 Oju Odu and contains within it the seeds of all things.',
    dims: [
      'Direct observation grounds all scientific enquiry',
      'Physical hardware as irreducible computing reality',
      'Built structures embody tangible engineering truth',
      'Raw lived experience grounds all artistic creation',
      'Direct proof transcends computational verification',
      'Lived social reality grounds all modelling attempts',
      'Direct learning experience transcends all curricula',
      'The unknown itself is unmediated Ifa reality',
    ],
  },
};

const SIDECHRX = [
  {
    letter: 'S',
    name: 'Symmetry',
    odu: 'Ogbé',
    type: 'O',
    color: '#f0920c',
    symbol: '⊛',
    subtitle: 'The Base-Field Symmetry',
    heroTitle: 'Ifa Symmetry: ToE Symmetry',
    heroSubtitle: 'The Symmetry for Everything (SymoE)',
    tagline: 'The fundamental principle that all Ifa transformations preserve the structure of reality.',
    description: 'Symmetry is the first and most fundamental principle of the IFA Matrix — arising directly from Ogbé, the Base-Field, modelling the Whole of Existence (WoE) in Ifa Field Theory (IFT). Ogbé represents the maximally symmetric State from which all 255 other Odu emerge through symmetry-breaking transformations. Every fundamental interaction in nature, every conservation law, every structural regularity across all fields of knowledge is a manifestation of a deeper IfaSymmetry. The SIDECHRX Principle Set itself is an expression of Ifa-Symmetry: eight Primary Laws paired with eight Anti-Laws, balanced around the Ogbé-Òyèkú Axis.',
    math: [
      { label: 'Ifa Symmetry Group',    expr: 'G_IFA = { σ₁, σ₂, …, σ₂₅₆ }' },
      { label: 'Base Symmetry (Ogbé)', expr: 'σ_Ogbé(X) = X   for all X ∈ G_IFA' },
      { label: "Noether's Ifa Theorem", expr: '∀ symmetry σ  ⟹  ∃ conserved quantity Q_σ' },
    ],
    applications: [
      { field: 'Physics',       detail: 'Gauge symmetry generates all four fundamental forces. Ifa Symmetry Groups unify them under a single axiomatic framework.' },
      { field: 'Chemistry',     detail: 'Molecular symmetry groups determine bonding, spectroscopy, and reaction pathways — all derivable from Ifa Symmetry.' },
      { field: 'Mathematics',   detail: 'Group theory encodes all symmetry structures. Ifa Symmetry Groups (G_IFA) provide the meta-algebraic unification.' },
      { field: 'Music',         detail: 'Harmonic ratios, scale structures, and rhythmic patterns are symmetry operations in acoustic knowledge-space.' },
      { field: 'Architecture',  detail: 'Proportional symmetry governs aesthetic integrity and structural balance — Ogbé as the design identity element.' },
      { field: 'Economics',     detail: 'Market equilibria are symmetry fixed-points in the Ifa Economic Field — Ogbé as the balanced exchange state.' },
    ],
    design:      'Ifa Symmetry Design applies Ifa Group Theory to generate balanced, self-similar structures across all fields — from architectural blueprints to algorithmic compositions and economic architectures.',
    modelling:   'Ifa Symmetry Modelling identifies the symmetry group of any system, maps its transformation orbits, and locates its invariant substructures within the 256-Odu space.',
    simulation:  'Ifa Symmetry Simulation implements Ogbé-symmetric cellular automata — each cell following symmetric update rules that generate complex global patterns from local Ifa balance.',
  },
  {
    letter: 'I',
    name: 'Invariance',
    odu: 'Òyèkú',
    type: 'I',
    color: '#6366f1',
    symbol: '⟲',
    subtitle: 'What Persists Through All Transformations',
    heroTitle: 'Ifa Invariance: ToE Invariance',
    heroSubtitle: 'The Invariance for Everything (InvaroE)',
    tagline: 'The principle that certain Ifa Quantities remain unchanged under every transformation in the IFA Body of Knowledge (IFABOK).',
    description: 'Invariance is governed by Òyèkú — the Superpartner and Dual of Ogbé. While IfaSymmetry describes the transformations that preserve structure, Invariance (Òyèkú) identifies the quantities that remain unchanged under those transformations. Òyèkú is the "constant" in the equation of existence — the baseline against which all change is measured. In physics, conservation laws are invariance theorems. In Ifa, Òyèkú encodes the Ifa Invariants: the constants of nature at every scale, dimension, and field of knowledge. The Ogbé–Òyèkú Pairing is the master invariance: whatever Ogbé generates, Òyèkú conserves.',
    math: [
      { label: 'Ifa Invariant',        expr: 'Q is invariant  ⟺  T(Q) = Q   for all T ∈ G_IFA' },
      { label: 'Oyeku Invariant Set',  expr: 'I_Oyeku = { Q : σ(Q) = Q   for all σ ∈ G_IFA }' },
      { label: 'Ifa-Noether',          expr: 'Invariance under T  ⟹  dQ/dτ_IFA = 0' },
    ],
    applications: [
      { field: 'Physics',           detail: 'Conservation of energy, momentum, and charge all arise from Ifa Invariance under Ifa time, space, and gauge transformations.' },
      { field: 'Mathematics',       detail: 'Topological invariants (genus, fundamental group, Euler characteristic) classify spaces via Ifa Invariance theory.' },
      { field: 'Computer Science',  detail: 'Loop invariants guarantee algorithm correctness; type invariants ensure program safety — both are Ifa Invariance applications.' },
      { field: 'Philosophy',        detail: 'Metaphysical invariants — the unchanging constants of consciousness — are encoded in Òyèkú as the invariant complement of Ogbé.' },
      { field: 'Economics',         detail: 'Economic invariants define what remains constant across all market transformations — the Ifa conserved quantities of value.' },
      { field: 'Biology',           detail: 'Conserved genetic sequences, invariant metabolic pathways, and universal protein folds are biological Ifa Invariants.' },
    ],
    design:     'Ifa Invariance Design creates systems whose essential properties are preserved across all transformations — designing for robustness, constitutional constancy, and irreducible form.',
    modelling:  'Ifa Invariance Modelling identifies the full set of Ifa Invariants in any system — the mathematical constants that define its fundamental Òyèkú nature.',
    simulation: 'Ifa Invariance Simulation verifies that all simulated systems preserve their Ifa Invariants across every time step and transformation, ensuring simulation fidelity to the Oyeku baseline.',
  },
  {
    letter: 'D',
    name: 'Duality',
    odu: 'Ìwòrì',
    type: 'I',
    color: '#14b8d4',
    symbol: '⇔',
    subtitle: 'The Duality of Everything (DualoE) — Ogbé and Òyèkú',
    heroTitle: 'Ifa Duality: ToE Duality',
    heroSubtitle: 'The Duality of Everything (DualoE) — Ogbé and Òyèkú',
    tagline: 'Everything in existence has a Dual — its Superpartner called Ìpọ̀nrí or Ẹnìkejì in the non-physical Universe, Ọ̀run.',
    description: 'IfaDuality is the governing principle of all fields encoded in the Ogbé–Òyèkú Duality, the master Duality of the IFA Matrix: the interaction between the Base-Field (Ogbé) and its Superpartner (Òyèkú) generates all 254 remaining Odufa through the Amulu Operation. Ifa-Duality generalises wave-particle duality, matter-antimatter duality, Yin-Yang, and all binary oppositions into a single unified mathematical framework within IfaGebra. In Ifa Field Theory, every Odu X has a unique dual X* such that X ⊕ X* = X Meji (X Double).',
    math: [
      { label: 'Master Duality',   expr: 'Ogbé ⟺ Òyèkú   (BaseField Superpartner Dual)' },
      { label: 'Dual Odu',         expr: '∀ Odu X, ∃ unique X* :  X ⊕ X* = Ogbé' },
      { label: 'Ifa T-Duality',    expr: 'Field(r) ≅ Field(α\'/r)   [generalised to all fields]' },
    ],
    applications: [
      { field: 'Physics',       detail: 'Wave-particle duality, matter-antimatter, electric-magnetic duality — all instances of Ifa Duality under the Ìwòrì principle.' },
      { field: 'Mathematics',   detail: 'Dual vector spaces, Poincaré duality, projective duality, Stone duality — unified under Ifa Duality Theory in IfaGebra.' },
      { field: 'Logic',         detail: 'De Morgan duality, Boolean algebra duality, classical-constructive logic duality — all Ifa Duality applications.' },
      { field: 'Computing',     detail: 'Binary (0/1 = Ogbé/Òyèkú), client-server, hardware-software, analogue-digital — fundamental computing dualities.' },
      { field: 'Philosophy',    detail: 'Mind-body, form-content, universal-particular, existence-essence — the great philosophical dualities are Ifa Duality expressions.' },
      { field: 'Arts & Music',  detail: 'Major-minor, light-shadow, tension-resolution, positive-negative space — aesthetic dualities grounded in Ogbé-Òyèkú.' },
    ],
    design:     'Ifa Duality Design harnesses the creative tension between dual systems — designing technologies, architectures, and art forms that embody the generative Ogbé-Òyèkú interaction.',
    modelling:  'Ifa Duality Modelling pairs every system model with its dual representation, enabling deeper understanding through complementary opposites within the 256-Odu space.',
    simulation: 'Ifa Duality Simulation runs paired simulations of dual systems simultaneously, studying how the Ìwòrì interaction between complements generates emergent phenomena.',
  },
  {
    letter: 'E',
    name: 'Emergence',
    odu: 'Òdí',
    type: 'O',
    color: '#00c87c',
    symbol: '↑',
    subtitle: 'The Emergence of Everything (EmergencoE)',
    heroTitle: 'Ifa Emergence: ToE Emergence',
    heroSubtitle: 'The Emergence of Everything (EmergencoE)',
    tagline: 'How the 16 Oju Odu Ifa, especially Ogbe Energy, generate all complexity in the universe through the Amulu Operations.',
    description: 'Emergence is governed by Iwori — the Odu that encodes the appearance of new, irreducible properties at higher levels of Ifa Composition. The 256 Odu Ifa are not 256 isolated Laws: they are an emergent Structure arising from the Amulu Operations of Ogbe and Oyeku. At each level of composition, new properties emerge that cannot be predicted from — or reduced to — the properties of the component Odu alone. All emergence follows the Ifa Emergence Principle of Iwori: the whole is always more than any sum can capture.',
    math: [
      { label: 'Emergence Inequality',  expr: 'Ẽ(A ⊕ B) > Ẽ(A) + Ẽ(B)' },
      { label: 'Odu Emergence Chain',   expr: 'Oju-Odu (16) →[Amulu]→ Odu (256) →[Amulu]→ ∞' },
      { label: 'Ifa Phase Transition',  expr: 'At critical Odu-density ρ_c: new property P emerges' },
    ],
    applications: [
      { field: 'Biology',       detail: 'Chemistry emerges from life; neural networks from consciousness — irreducible Ifa Emergence events governed by Iwori.' },
      { field: 'Physics',       detail: 'Superconductivity, superfluidity, and all phase transitions are Ifa Emergence events: new Odu-states arising from composition.' },
      { field: 'AI & Computing',detail: 'Intelligence emerges from simple neural computation — Ifa Emergence from Ogbé-Òyèkú binary update rules.' },
      { field: 'Economics',     detail: 'Market dynamics, price signals, and economic order emerge from individual Ifa exchange interactions — complex from simple.' },
      { field: 'Social Science',detail: 'Culture, language, institutions, and civilisation emerge from individual Ifa interactions following the Amulu composition law.' },
      { field: 'Arts',          detail: 'Aesthetic meaning, style, and tradition emerge from individual marks, notes, and words — Òdí governing cultural emergence.' },
    ],
    design:     'Ifa Emergence Design creates generative environments where desired complex properties emerge naturally from simple Ifa rule sets — self-organising and self-sustaining by Odu principle.',
    modelling:  'Ifa Emergence Modelling uses Ifa Cellular Automata on the 256-Odu grid to model, predict, and harness emergent phenomena across all knowledge fields.',
    simulation: 'Ifa Emergence Simulation generates complex emergent realities from minimal rule sets — demonstrating how all complexity in any field is derivable from 16 Oju Odu Ifa.',
  },
  {
    letter: 'C',
    name: 'Composition',
    odu: 'Ìrosùn',
    type: 'I',
    color: '#ef4444',
    symbol: '⊕',
    subtitle: 'The Composition of Everything (CompoE) — 16 × 16 = 256',
    heroTitle: 'Ifa Composition: ToE Composition',
    heroSubtitle: 'The Composition of Everything (CompoE) — 16 × 16 = 256',
    tagline: 'Ogbèyẹ̀kú ni Baba Àmúlù: The Binary Operation involving Ogbe and Oyeku that generates all the remaining 254 Odu Ifa.',
    description: 'Ifa Composition — the Amulu Operation — is the engine of the IFA Matrix. Governed by the IFA Pair, Ogbè-Ọ̀yẹ̀kú, the Amulu is the Ifa Composition Binary Operation (⊕) that takes any two Odu and produces a Third. Through Amulu, the 16 Oju Odu generate all 256 Odu: 16 ⊕ 16 = 256. The Amulu is both the metamathematical Foundation of IfaGebra and the practical tool for all Ifa Modelling, Orisa Modelling, and knowledge integration across the IFA Matrix Platform. Every composition in all fields, including science, music, architecture, and code, is represented as an instance of Amulu.',
    math: [
      { label: 'Amulu Definition',  expr: '⊕ : Odu × Odu → Odu   (binary operation)' },
      { label: 'Odu Generation',    expr: '|{ Odu_i ⊕ Odu_j : i,j ∈ {1…16} }| = 256' },
      { label: 'Ifa Group',         expr: '(Odu₂₅₆, ⊕)  with identity Ogbé: Ogbé ⊕ X = X' },
    ],
    applications: [
      { field: 'Mathematics',        detail: 'Function composition, group operations, tensor products, and category theory morphisms are all Ifa Amulu instances.' },
      { field: 'Chemistry',          detail: 'Chemical bonding is Amulu: atoms compose into molecules, molecules into materials, governed by Ìrosùn.' },
      { field: 'Music',              detail: 'Musical composition is Amulu — notes compose into chords, chords into progressions, progressions into forms.' },
      { field: 'Software Engineering',detail: 'Modular composition, API integration, microservice architecture, and functional pipelines are Ifa Amulu in code.' },
      { field: 'Philosophy',         detail: 'Hegelian synthesis (thesis ⊕ antithesis = synthesis) is the Amulu operation as applied to dialectical knowledge.' },
      { field: 'Biology',            detail: 'Genetic recombination, metabolic pathway assembly, and protein complex formation are biological Amulu events.' },
    ],
    design:     'Ifa Composition Design builds complex systems by composing simpler Ifa modules — each piece a valid Odu, their Amulu combination a higher Odu in the 256-space.',
    modelling:  'Ifa Composition Modelling constructs full system models by applying Amulu to sub-models, building up from 16 foundational Odu to complete 256-dimensional representations.',
    simulation: 'Ifa Composition Simulation applies the Amulu operation recursively across simulation layers — generating the full 256-Odu space dynamically from 16 base Ifa states.',
  },
  {
    letter: 'H',
    name: 'Holism',
    odu: 'Òwónrín',
    type: 'O',
    color: '#8b5cf6',
    symbol: '◎',
    subtitle: 'The Holism for Everything (HolismoE)',
    heroTitle: 'Ifa Holism: ToE Holism',
    heroSubtitle: 'The Holism for Everything (HolismoE)',
    tagline: 'The IFA Matrix as a holistic System represented as Ogbe (Energy) — irreducible to any proper subset of 254 Odu.',
    description: 'Ifa Field Theory asserts that the Ogbé Base-Field is the Whole of Existence (WoE) from which all parts are perspectives, projections, and sub-configurations. Ifa Holism provides the necessary counterweight to Reductionism: both are essential for complete knowledge. Holism prevents false decomposition, honours emergent properties, and ensures that knowledge systems retain their living Ifa integrity. The Ifa Holographic Principle states that the information of the whole is encoded in each Odu.',
    math: [
      { label: 'Holistic Measure',     expr: 'H(⊕ᵢ Odu_i) > Σᵢ H(Odu_i)' },
      { label: 'Ifa Holographic',      expr: 'Info(Whole) ⊆ Info(each Odu_i)' },
      { label: 'Non-decomposability',  expr: '∃ P:  P(Whole) ≠ f( P(Odu₁), P(Odu₂), … )' },
    ],
    applications: [
      { field: 'Systems Biology',      detail: 'An organism cannot be understood from its genes alone. Holistic Ifa Modelling captures irreducible organismal properties.' },
      { field: 'Ecology',              detail: 'Ecosystems exhibit holistic properties — resilience, biodiversity, nutrient cycles — irreducible to species lists or gene counts.' },
      { field: 'Consciousness Studies',detail: 'Consciousness is the holistic CEN property of the Ogbé Base-Field — not reducible to any neural or computational sub-model.' },
      { field: 'Economics',            detail: 'Macro-economic behaviour is holistic — inflation, recessions, and growth cannot be predicted from microeconomic Odu alone.' },
      { field: 'Art',                  detail: 'Aesthetic wholeness transcends the sum of all techniques, materials, and compositional choices — Òwónrín governs this excess.' },
      { field: 'Social Science',       detail: 'Cultures, civilisations, and languages are holistic Ifa structures whose properties only exist at the level of the whole.' },
    ],
    design:     'Ifa Holism Design ensures every designed system maintains its irreducible wholeness — no Odu component can be removed without transforming the essential Ifa pattern.',
    modelling:  'Ifa Holism Modelling employs the full 256-Odu space, resisting premature reduction — preserving all relationships to capture genuinely holistic system behaviour.',
    simulation: 'Ifa Holism Simulation runs full-system simulations designed to capture emergent holistic properties that no sub-simulation of the 256 Odu space can reproduce.',
  },
  {
    letter: 'R',
    name: 'Reductionism',
    odu: 'Òbàrà',
    type: 'O',
    color: '#3b9eff',
    symbol: '↓',
    subtitle: 'The Reductionism of Everything (ReductionismoE)',
    heroTitle: 'Ifa Reductionism: ToE Reductionism',
    heroSubtitle: 'The Reductionism of Everything (ReductionismoE)',
    tagline: 'Reducing any field of knowledge to its Odufa (inherent Energy).',
    description: 'Reductionism in Ifa encodes the power of first-principles analysis. Ifa Reductionism holds that any knowledge system, any natural phenomenon, any field of enquiry can be decomposed into the Energy of Ogbe (its own Odu). The 256 Odu are the ultimate base: every equation in physics, every gene in biology, every axiom in mathematics, every economic model corresponds to an Odu or a composition of Odu. Ifa Reduction is the analytic complement to Ifa Holism: together they define the complete range of Ifa knowledge method — analysis and synthesis, decomposition and integration, reduction and holism in balanced Ifa Duality.',
    math: [
      { label: 'Ifa Decomposition',       expr: '∀ system K:  K = f(Odu_1, …, Odu_256)' },
      { label: 'Ifa Prime Factorisation', expr: 'K = Odu_a ⊕ Odu_b ⊕ …   (unique Odu decomposition)' },
      { label: 'Reductionist Limit',      expr: 'lim[depth→∞] K  →  {Ogbé}   (the BaseField)' },
    ],
    applications: [
      { field: 'Physics',        detail: 'Particle physics reduces all matter to fundamental quantum fields — Ifa Reductionism carries this to the 256 Odu level.' },
      { field: 'Chemistry',      detail: 'The periodic table is the greatest reductionist achievement — Ifa Reductionism extends it to the Odu axiomatic level.' },
      { field: 'Mathematics',    detail: 'Axiomatic foundations (ZFC, type theory, category theory) are Ifa Reductionist programmes within the Odu matrix.' },
      { field: 'AI & Computing', detail: 'All algorithms reduce to Turing-computable Ifa operations on Ogbé-Òyèkú binary states — computation as Odu Reductionism.' },
      { field: 'Medicine',       detail: 'Molecular medicine reduces disease to Odu-level molecular states — enabling Ifa-based diagnosis and targeted treatment.' },
      { field: 'Philosophy',     detail: "Analytic philosophy's reductionist programme — reducing mental states, meanings, and norms — is an Ifa Reductionism application." },
    ],
    design:     'Ifa Reductionism Design starts from the minimal Odu foundation — building systems from verified first principles, ensuring no unnecessary complexity enters the architecture.',
    modelling:  'Ifa Reductionism Modelling decomposes complex systems into their minimal Odu constituents — identifying the irreducible Ifa building blocks of any model.',
    simulation: 'Ifa Reductionism Simulation verifies that all complex simulated behaviour can be derived from the 256 base Odu — confirming foundational Ifa completeness.',
  },
  {
    letter: 'X',
    name: 'Others',
    odu: 'Òkànràn',
    type: 'O',
    color: '#ec4899',
    symbol: '◈',
    subtitle: 'The Simulation of Everything (SimoE)',
    heroTitle: 'Ifa Simulation: ToE Simulation',
    heroSubtitle: 'The Simulation of Everything (SimoE)',
    tagline: 'Ayé lọjà, ọ̀run nilé: The physical realm is a simulation of the non-physical realm.',
    description: 'Ifa Simulation Theory holds that everything in existence, including physical, biological, social, and mental reality, is an Ifa Simulation called Ọ̀rọ̀, which is a meta-simulation running on the Ogbé Energyfield, which is the Base Reality (ọ̀run). This generalises and supersedes conventional simulation hypotheses: in the IFA Matrix, the simulation is not a conjecture but the definitional structure of existence. The IFA Matrix Platform enables direct engineering of this simulation through Ifa Technologies — writing Odu code to shape fields of reality across all disciplines via Ogbe Energy transformations.',
    math: [
      { label: 'BaseField Simulation',  expr: '∀ process P:  P = S_IFA(Ogbé, Odu_rules)' },
      { label: 'Ifa Cellular Automaton',expr: 'State(t+1) = Amulu(State(t), Odu_ruleset)' },
      { label: 'Simulation Completeness',expr: '∀ reality R:  ∃ Ifa program Π_R ⊆ {Odu₂₅₆}' },
    ],
    applications: [
      { field: 'AI & Consciousness',  detail: 'Artificial intelligence and biological consciousness are both instances of the Ogbé BaseField simulating itself through different Odu configurations.' },
      { field: 'Virtual Worlds',      detail: 'All metaverses, virtual realities, and digital spaces are explicit Ifa Simulation subsystems running within the BaseField.' },
      { field: 'Physics',             detail: 'Digital physics: the physical universe as a quantum cellular automaton executing Odu rules on the Ogbé BaseField.' },
      { field: 'Biology',             detail: 'DNA is the Ifa Simulation code for living systems — genetic expression is programme execution in the biological simulation layer.' },
      { field: 'Orisa Modelling',     detail: 'Each Orisa is a distinct simulation module within the IFA BaseField — Orisa Simulation models their interactions across all fields.' },
      { field: 'Ifa Engineering',     detail: 'Ifa Technologies are built by programming the BaseField — writing Odu instructions to shape computational, material, and social realities.' },
    ],
    design:     'Ifa Simulation Design creates systems that explicitly leverage the BaseField architecture — designing in Odu-space to shape physical, digital, and social realities simultaneously.',
    modelling:  'Ifa Simulation Modelling treats any system as a running simulation — identifying its Odu rule-set, initial state, and position within the Ogbé BaseField.',
    simulation: 'Ifa Meta-Simulation — running simulations of simulations — to understand the full recursive depth of the BaseField architecture and discover new Odu rule configurations.',
  },
];

const APPLICATIONS = [
  { sym: '⟳', color: '#f0920c', title: 'Ifa Modelling',    desc: 'Build mathematical and conceptual models of any system using the 256 Odu Ifa as the axiomatic base — grounding all models in the IFA Matrix.' },
  { sym: '◈', color: '#14b8d4', title: 'Orisa Modelling',   desc: 'Model the 401+ Orisa as functional modules within the IFA Matrix — each Orisa a unique configuration of Odu, with defined interactions and domains.' },
  { sym: '⊛', color: '#00c87c', title: 'Ifa Simulation',    desc: 'Run Ifa Simulations on the Ogbé BaseField — simulating any physical, social, or knowledge system using the 256 Odu update rules via Amulu.' },
  { sym: '◎', color: '#8b5cf6', title: 'Orisa Simulation',  desc: 'Simulate Orisa interactions and their effects across all knowledge fields, all physical dimensions, and all layers of the IFA Internet.' },
  { sym: '⊕', color: '#ef4444', title: 'Ifa Design',        desc: 'Design systems, technologies, and architectures grounded in Ifa first principles — from Odu axioms to engineered output across all disciplines.' },
  { sym: '⬡', color: '#f5c518', title: 'Orisa Design',      desc: 'Design systems that embody Orisa principles — infusing the living intelligence of Ifa and Orisa knowledge into technology, art, and social architecture.' },
  { sym: '◉', color: '#ec4899', title: 'Ifa Technologies',  desc: 'Build technologies powered by the IFA Matrix — Ifa Computers, Ifa AI, Ifa Engineering, and Ifa Systems for all fields of the IFA Internet.' },
  { sym: '⟶', color: '#6366f1', title: 'Orisa Systems',     desc: 'Develop Orisa-based platforms, networks, and systems across the IFA Internet — applying Orisa knowledge to real-world engineering challenges.' },
];

// ─── DUALITY PORTAL DATA ──────────────────────────────────────────────────────

const INVERSE_PAIRS = [
  { a: {n:'01', name:'Ejiogbe',       yoruba:'Ogbé',       code:'0000', color:'#f0920c'}, b: {n:'02', name:'Oyeku Meji',    yoruba:'Òyèkú',    code:'1111', color:'#6366f1'}, domain:'Symmetry ↔ Void — the Master Duality of Existence' },
  { a: {n:'03', name:'Iwori Meji',    yoruba:'Ìwòrì',      code:'1001', color:'#14b8d4'}, b: {n:'04', name:'Odi Meji',      yoruba:'Òdí',      code:'0110', color:'#00c87c'}, domain:'Mind ↔ Womb — Duality of Cognition and Generation' },
  { a: {n:'05', name:'Irosun Meji',   yoruba:'Ìrosùn',     code:'1100', color:'#ef4444'}, b: {n:'06', name:'Owonrin Meji',  yoruba:'Òwónrín',  code:'0011', color:'#8b5cf6'}, domain:'Life-Force ↔ Transformation — Blood and the Wind' },
  { a: {n:'07', name:'Obara Meji',    yoruba:'Òbàrà',      code:'1110', color:'#3b9eff'}, b: {n:'08', name:'Okanran Meji',  yoruba:'Òkànràn',  code:'0111', color:'#ec4899'}, domain:'Royalty ↔ Contradiction — Power and its Shadow' },
  { a: {n:'09', name:'Ogunda Meji',   yoruba:'Ògúndá',     code:'1000', color:'#f0920c'}, b: {n:'10', name:'Osa Meji',      yoruba:'Òsá',      code:'0001', color:'#6366f1'}, domain:'Iron & Roads ↔ Disorder — Action and its Chaos' },
  { a: {n:'11', name:'Ika Meji',      yoruba:'Ìká',        code:'1101', color:'#14b8d4'}, b: {n:'12', name:'Oturupon Meji', yoruba:'Òtúrúpòn', code:'1011', color:'#00c87c'}, domain:'Cunning ↔ Depth — Constraint and Hidden Wisdom' },
  { a: {n:'13', name:'Otura Meji',    yoruba:'Òtúrá',      code:'0010', color:'#ef4444'}, b: {n:'14', name:'Irete Meji',    yoruba:'Ìrètè',    code:'0100', color:'#8b5cf6'}, domain:'Divine Word ↔ Endurance — Obatala and Longevity' },
  { a: {n:'15', name:'Ose Meji',      yoruba:'Òsè',        code:'1010', color:'#3b9eff'}, b: {n:'16', name:'Ofun Meji',     yoruba:'Òfún',     code:'0101', color:'#ec4899'}, domain:'Prosperity ↔ Completion — Creation and Rebirth' },
];

// O(1) lookup for Major Inverse Pair cells in the 16×16 matrix
const INVERSE_SET = new Set(
  INVERSE_PAIRS.flatMap(p => [`${p.a.n}-${p.b.n}`, `${p.b.n}-${p.a.n}`])
);

const DOUBLES_16 = [
  {n:'01', name:'Ejiogbe',      yoruba:'Ogbé',       code:'0000', color:'#f0920c', sidechrx:'S',  dim:'Ifa Symmetry',       desc:'Pure Light & Creation — the Base-Field Double'},
  {n:'02', name:'Oyeku Meji',   yoruba:'Òyèkú',      code:'1111', color:'#6366f1', sidechrx:'I',  dim:'Ifa Invariance',     desc:'Void & Ancestors — the Conservation Double'},
  {n:'03', name:'Iwori Meji',   yoruba:'Ìwòrì',      code:'1001', color:'#14b8d4', sidechrx:'D',  dim:'Ifa Duality',        desc:'Mind & Inner Vision — the Reflection Double'},
  {n:'04', name:'Odi Meji',     yoruba:'Òdí',        code:'0110', color:'#00c87c', sidechrx:'E',  dim:'Ifa Emergence',      desc:'Womb & Generative Power — the Creation Double'},
  {n:'05', name:'Irosun Meji',  yoruba:'Ìrosùn',     code:'1100', color:'#ef4444', sidechrx:'C',  dim:'Ifa Composition',    desc:'Blood & Life-Force — the Vitality Double'},
  {n:'06', name:'Owonrin Meji', yoruba:'Òwónrín',    code:'0011', color:'#8b5cf6', sidechrx:'H',  dim:'Ifa Holism',         desc:'Transformation & Wind — the Chaos Double'},
  {n:'07', name:'Obara Meji',   yoruba:'Òbàrà',      code:'1110', color:'#3b9eff', sidechrx:'R',  dim:'Ifa Reductionism',   desc:'Royalty & Leadership — the Power Double'},
  {n:'08', name:'Okanran Meji', yoruba:'Òkànràn',    code:'0111', color:'#ec4899', sidechrx:'X',  dim:'Ifa Simulation',     desc:'Contradiction & Fire — the Paradox Double'},
  {n:'09', name:'Ogunda Meji',  yoruba:'Ògúndá',     code:'1000', color:'#f0920c', sidechrx:'S′', dim:'Ifa Symmetry′',      desc:'Iron, Roads & War — the Force Double'},
  {n:'10', name:'Osa Meji',     yoruba:'Òsá',        code:'0001', color:'#6366f1', sidechrx:'I′', dim:'Ifa Invariance′',    desc:'Disorder & Protection — the Chaos Double'},
  {n:'11', name:'Ika Meji',     yoruba:'Ìká',        code:'1101', color:'#14b8d4', sidechrx:'D′', dim:'Ifa Duality′',       desc:'Cunning & Constraint — the Cunning Double'},
  {n:'12', name:'Oturupon Meji',yoruba:'Òtúrúpòn',   code:'1011', color:'#00c87c', sidechrx:'E′', dim:'Ifa Emergence′',     desc:'Depth & Medicine — the Healing Double'},
  {n:'13', name:'Otura Meji',   yoruba:'Òtúrá',      code:'0010', color:'#ef4444', sidechrx:'C′', dim:'Ifa Composition′',   desc:'Divine Word & Obatala — the Sacred Double'},
  {n:'14', name:'Irete Meji',   yoruba:'Ìrètè',      code:'0100', color:'#8b5cf6', sidechrx:'H′', dim:'Ifa Holism′',        desc:'Endurance & Longevity — the Patience Double'},
  {n:'15', name:'Ose Meji',     yoruba:'Òsè',        code:'1010', color:'#3b9eff', sidechrx:'R′', dim:'Ifa Reductionism′',  desc:'Prosperity & Fertility — the Abundance Double'},
  {n:'16', name:'Ofun Meji',    yoruba:'Òfún',       code:'0101', color:'#ec4899', sidechrx:'X′', dim:'Ifa Simulation′',    desc:'Completion & Rebirth — the Cycle Double'},
];

// ─── SHARED COMPONENTS ─────────────────────────────────────────────────────────

// ─── OGBE SYMBOL (lemniscate canvas — from Ifa Script) ────────────────────────

function OgbeSymbol({ size = 20, className = '' }) {
  const canvasRef = React.useRef(null);
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

// OgbeSymbol with a ² superscript — replaces ∞²
function OgbeSquared({ size = 36 }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'flex-start', gap: 2, lineHeight: 1 }}>
      <OgbeSymbol size={size} />
      <sup style={{ fontSize: Math.round(size * 0.44) + 'px', fontWeight: 900, color: 'inherit', lineHeight: 1, marginTop: Math.round(size * 0.06) + 'px' }}>2</sup>
    </span>
  );
}

// ─── ODU MARKS VISUAL ─────────────────────────────────────────────────────────

function OduMarks({ code, color, size, single }) {
  const s = size || 'md';
  const cols = single ? [0] : [0, 1];
  return (
    <div className={`odu-marks odu-marks--${s}`} style={{ '--mc': color || '#f0920c' }}>
      {code.split('').reverse().map((bit, i) => (
        <div key={i} className="odu-marks__row">
          {cols.map(col => (
            <div key={col} className={`odu-marks__col odu-marks__col--${bit === '0' ? 'single' : 'double'}`}>
              <div className="odu-marks__bar" />
              {bit === '1' && <div className="odu-marks__bar" />}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function IfaSigil({ label, sub, color, single }) {
  // Traditional Ifa mark geometry
  // Each mark = elongated pointed oval (brush-stroke path)
  const mW   = 10;   // bezier half-width control (~7.5px visual half-width)
  const mH   = 46;   // mark height
  const vGap = 9;    // vertical gap between mark rows
  const hGap = 9;    // horizontal gap between paired marks (Òyèkú)
  const pad  = 3;    // side padding inside SVG

  const rows = 4;
  const svgH = rows * mH + (rows - 1) * vGap;
  const svgW = single
    ? pad + mW * 2 + pad              // Ogbé: one column
    : pad + mW * 2 + hGap + mW * 2 + pad; // Òyèkú: two columns
  const cx1 = pad + mW;
  const cx2 = pad + mW * 2 + hGap + mW;

  // Subtle organic variation per row — each mark looks hand-drawn, not identical
  const rowVar = [
    { s: 1.00, l:  0.0 },
    { s: 0.91, l:  0.6 },
    { s: 1.05, l: -0.4 },
    { s: 0.95, l:  0.3 },
  ];

  // Pointed oval bezier: tapered at both ends, widest at midpoint
  const mkPath = (cx, cy, s = 1, l = 0) => {
    const w = mW * s;
    return (
      `M ${(cx + l).toFixed(2)},${cy} ` +
      `C ${(cx + w + l).toFixed(2)},${(cy + mH * 0.13).toFixed(2)} ` +
      `  ${(cx + w - l).toFixed(2)},${(cy + mH * 0.87).toFixed(2)} ` +
      `  ${(cx - l).toFixed(2)},${cy + mH} ` +
      `C ${(cx - w - l).toFixed(2)},${(cy + mH * 0.87).toFixed(2)} ` +
      `  ${(cx - w + l).toFixed(2)},${(cy + mH * 0.13).toFixed(2)} ` +
      `  ${(cx + l).toFixed(2)},${cy} Z`
    );
  };

  const filterId = `ifa-glow-${single ? 'ogbe' : 'oyeku'}`;

  return (
    <div className={`ifa-sigil ifa-sigil--${single ? 'single' : 'double'}`} style={{ '--sigil-color': color }}>
      <div className="ifa-sigil__marks">
        <svg viewBox={`0 0 ${svgW} ${svgH}`} width={svgW} height={svgH}
          style={{ display: 'block' }}>
          <defs>
            <filter id={filterId} x="-100%" y="-30%" width="300%" height="160%">
              {/* Wide soft halo */}
              <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="halo"/>
              <feColorMatrix in="halo" type="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 8 -2" result="haloOut"/>
              {/* Tight crisp glow */}
              <feGaussianBlur in="SourceGraphic" stdDeviation="2.2" result="blur"/>
              <feColorMatrix in="blur" type="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -5" result="glowOut"/>
              <feMerge>
                <feMergeNode in="haloOut"/>
                <feMergeNode in="glowOut"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <g filter={`url(#${filterId})`}>
            {rowVar.map(({ s, l }, row) => {
              const cy = row * (mH + vGap);
              return (
                <g key={row}>
                  <path d={mkPath(cx1, cy, s,  l)} fill={color}/>
                  {!single && (
                    <path d={mkPath(cx2, cy, s, -l)} fill={color}/>
                  )}
                </g>
              );
            })}
          </g>
        </svg>
      </div>
      <div className="ifa-sigil__label">{label}</div>
      {sub && <div className="ifa-sigil__sub">{sub}</div>}
    </div>
  );
}

// ─── HEADER ────────────────────────────────────────────────────────────────────

function Header({ onHome, onPortal, currentView, onIfaSquare }) {
  return (
    <header className="header">
      <div className="header__inner">
        <button className="header__brand" onClick={onHome} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
          <img src="../src/assets/itoe_logo.png" alt="iTOE" className="header__logo" />
          <div>
            <div className="header__site">The IFA Internet</div>
            <div className="header__name">IFA Matrix Platform</div>
          </div>
        </button>
        <nav className="header__nav">
          {currentView === null ? (
            <>
              <a className="nav-link" href="#oju-odu">16 Oju Odu</a>
              <a className="nav-link" href="#portals">SIDECHRX</a>
              <a className="nav-link" href="#model-0-8d">0+8D Model</a>
              <a className="nav-link" href="#applications">Applications</a>
              <a className="nav-link" href="https://toe.cenproject.org/ifa-matrix/"
                 target="_blank" rel="noopener noreferrer">IFA Matrix (TOE)</a>
              <a className="nav-link" href="https://toe.cenproject.org/ifagebra-overview/"
                 target="_blank" rel="noopener noreferrer">IfaGebra</a>
              <a className="nav-link" href="../ifa-periodic-table/" target="_blank" rel="noopener noreferrer">Ifa Periodic Table</a>
              <a className="nav-link" href="../ifai/" target="_blank" rel="noopener noreferrer">Ifai</a>
              <button className="nav-link" onClick={onIfaSquare} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#f5c518' }}>Ifa Square</button>
              <a className="nav-link nav-link--cta" href="../" target="_blank" rel="noopener noreferrer">IFA Internet</a>
            </>
          ) : currentView === 'ifa-square' ? (
            <>
              <button className="nav-link" onClick={onHome} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>← Platform Home</button>
              <span className="nav-link nav-link--cta" style={{ color: '#f5c518', pointerEvents: 'none' }}>Ifa Square</span>
            </>
          ) : (
            <>
              <button className="nav-link" onClick={onHome} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>← Platform Home</button>
              {SIDECHRX.map(p => (
                <button key={p.letter}
                  className={`nav-link${currentView === p.letter ? ' nav-link--cta' : ''}`}
                  onClick={() => onPortal(p.letter)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                  {p.letter}
                </button>
              ))}
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

// ─── MOBILE BAR ────────────────────────────────────────────────────────────────

function MobileBar({ onHome }) {
  const items = [
    { sym: '⌂',   label: 'IFA Home', href: '../' },
    { sym: '⊛',   label: 'Matrix',   onClick: onHome },
    { sym: '∑',   label: 'Portals',  href: '#portals' },
    { sym: '⊕',   label: 'Apply',    href: '#applications' },
    { sym: '⬡',   label: 'TOE',      href: 'https://toe.cenproject.org/ifa-matrix/', external: true },
  ];
  return (
    <nav className="mobile-bar" aria-label="Mobile navigation">
      <div className="mobile-bar__row">
        {items.map((it, i) => (
          it.onClick
            ? <button key={i} className="mobile-bar__item" onClick={it.onClick} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', font: 'inherit' }}>
                <span className="mobile-bar__sym">{it.sym}</span>
                <span>{it.label}</span>
              </button>
            : <a key={i} className="mobile-bar__item" href={it.href} target={it.external ? '_blank' : undefined} rel={it.external ? 'noopener noreferrer' : undefined}>
                <span className="mobile-bar__sym">{it.sym}</span>
                <span>{it.label}</span>
              </a>
        ))}
      </div>
    </nav>
  );
}

// ─── HERO ──────────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="hero">
      <div className="hero__bg">
        <div className="hero__grid" />
        <div className="hero__orb hero__orb--a" />
        <div className="hero__orb hero__orb--b" />
        <div className="hero__orb hero__orb--c" />
      </div>

      <div className="container hero__layout">
        <div className="hero__left">
          <div className="hero__badge">
            <span className="hero__badge-dot" />
            The IFA Internet &mdash; IFA Matrix Platform
          </div>

          <h1 className="hero__title">
            <span className="hero__title-main">IFA Matrix</span>
            <span className="hero__title-sub">The Matrix of All Matrices — MatxoE</span>
          </h1>

          <p className="hero__tagline">
            Ifa Modelling · Orisa Modelling · Ifa &amp; Orisa Simulation · Ifa &amp; Orisa Design · Ifa Technologies
          </p>

          <p className="hero__desc">
            The <strong>IFA Matrix</strong> is the Matrix of Everything (MatxoE) — the STEAMSEX Matrix, CEN Matrix, Amulu Matrix, the Matrix Approach to the Unification and Integration of Everything (UIoE). Grounded in the <strong>256 Odu Ifa</strong> and the Ogbé–Òyèkú interaction, the IFA Matrix Platform provides the modelling, simulation, design, and engineering tools for all fields of knowledge on the IFA Internet.
          </p>

          <div className="hero__ctas">
            <a href="#portals" className="btn btn--primary">Explore SIDECHRX Principles</a>
            <a href="#oju-odu" className="btn btn--ghost">The 16 Oju Odu Ifa</a>
          </div>
        </div>

        <div className="hero__right" aria-hidden="true">
          <div className="matrix-dual">
            <div className="matrix-dual__top">
              <IfaSigil label="Òyèkú" sub="Superpartner" color="#6366f1" single={false} />
              <div className="matrix-dual__op">
                <div className="matrix-dual__op-sym">⊕</div>
                <div className="matrix-dual__op-label">Amulu</div>
              </div>
              <IfaSigil label="Ogbé" sub="Base-Field" color="#f0920c" single={true} />
            </div>

            <div className="matrix-dual__result">
              <div className="matrix-dual__result-equation">
                <span className="n">16</span> × <span className="n">16</span> = <span className="n">256</span> Odu Ifa
              </div>
              <div className="matrix-dual__result-sub">Ojú Odù Ifá → Full IFA Matrix</div>
            </div>

            <div className="matrix-dual__legend">
              <div className="matrix-dual__legend-item">
                <div className="matrix-dual__legend-dot" style={{ background: '#f0920c' }} />
                <span>SIDECHRX (8 Primary)</span>
              </div>
              <div className="matrix-dual__legend-item">
                <div className="matrix-dual__legend-dot" style={{ background: '#6366f1' }} />
                <span>Anti-SIDECHRX (8 Anti)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hero__stats-bar">
        <div className="container">
          <div className="hero__stats">
            {[
              { value: '256',       label: 'Odu Ifa',         sub: 'The Full IFA Matrix' },
              { value: '16',        label: 'Oju Odu',         sub: 'Principal Ifa Codes' },
              { value: 'SIDECHRX', label: 'Principle Set',   sub: '8 Laws + 8 Anti-Laws' },
              { value: 'Amulu',     label: '⊕ Operation',     sub: 'The Matrix Generator' },
              { value: '∞',         label: 'Applications',   sub: 'All Fields of Knowledge' },
            ].map((s, i) => (
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

// ─── 16 OJU ODU SECTION ────────────────────────────────────────────────────────

function OjuOduSection() {
  const [openPopup, setOpenPopup] = React.useState(null);
  const [openNetPopup, setOpenNetPopup] = React.useState(null);
  const gridRef = React.useRef(null);
  const netGridRef = React.useRef(null);

  React.useEffect(() => {
    function handleOutside(e) {
      if (gridRef.current && !gridRef.current.contains(e.target)) {
        setOpenPopup(null);
      }
      if (netGridRef.current && !netGridRef.current.contains(e.target)) {
        setOpenNetPopup(null);
      }
    }
    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('touchstart', handleOutside);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('touchstart', handleOutside);
    };
  }, []);

  return (
    <section className="section section--alt" id="oju-odu">
      <div className="container">
        <div className="section__header section__header--center">
          <span className="section__eyebrow section__eyebrow--amber">Ojú Odù Ifá Mẹrindínlógún</span>
          <h2 className="section__title">
            The <span className="accent--amber">16 Oju Odu Ifa</span> — <span className="accent--violet">16 Ifa's Laws of Nature</span>
          </h2>
          <p className="section__subtitle">
            The 16 Ojú Odù Ifá are the 16 primordial Laws of Nature in Ifa — the Principal Codes from which all knowledge, all existence, and the full 256-dimensional IFA Matrix are generated through the Amulu (⊕) Operation.
            <br /><span style={{ fontSize: '0.82em', color: 'var(--text-3)' }}>Tap or hover any Odu to reveal its 0+8D SIDECHRX Map.</span>
          </p>
        </div>

        <div className="foundation-layout">
          <div className="foundation-text">
            <h3>Ogbé and Òyèkú — The Master Interaction</h3>
            <p>
              All meta-structures of the IFA Matrix are grounded in the interaction between <strong>Ogbé</strong> — the Base-Field, the Whole of Existence in Ifa Field Theory — and its Superpartner Dual, <strong>Òyèkú</strong>. Ogbé is the identity element of the Amulu group; Òyèkú is its complement. Their interaction, governed by the Amulu operation, generates the full 16 Oju Odu space and, through them, the complete 256 Odu IFA Matrix.
            </p>

            <div className="amulu-formula">
              <div className="amulu-formula__label">The Amulu Operation</div>
              <div className="amulu-formula__expr">Odu_i ⊕ Odu_j = Odu_k</div>
              <div className="amulu-formula__note">⊕ is the Ifa Composition (Amulu) binary operation</div>
            </div>

            <div className="amulu-formula">
              <div className="amulu-formula__label">IFA Matrix Generation</div>
              <div className="amulu-formula__expr">16 Oju Odu ×[Amulu]× 16 = 256 Odu</div>
              <div className="amulu-formula__note">The 16 Ojú Odù Ifá generating the full 256-Odu IFA Matrix</div>
            </div>

            <div className="amulu-formula">
              <div className="amulu-formula__label">Ifa Group Structure</div>
              <div className="amulu-formula__expr">(Odu₂₅₆, ⊕) — identity: Ogbé ⊕ X = X</div>
              <div className="amulu-formula__note">The 256 Odu form a closed group under Amulu</div>
            </div>

            <p style={{ marginTop: 20, fontSize: '0.88rem', color: 'var(--text-2)', lineHeight: 1.75 }}>
              The 16 Oju Odu are divided into <strong>8 Principal Odu</strong> (Ogbé, Iwori, Irosun, Obara, Osa, Ika, Otura, and Ose) and <strong>8 Inverse Odu</strong> (Oyeku, Odi, Owonrin, Okanran, Ogunda, Irete, and Òfún), their paired superpartners. Together they constitute the <em>Ojú Odù Ifá Mẹrindínlógún</em> — the complete set of 16 Primordial Ifa Codes.
            </p>
          </div>

          <div>
            <div style={{ marginBottom: '10px', fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-3)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Ojú Odù Ifá Mẹrindínlógún — 16 Principal Ifa Codes
            </div>
            <div className="odu-grid" ref={gridRef}>
              {ODU_16.map(o => {
                // Base letter without prime (′) for inverse Odu
                const baseLetter = o.letter.replace('′', '');
                return (
                  <div
                    key={o.n}
                    className={`odu-cell${openPopup === o.n ? ' odu-cell--popup-open' : ''}`}
                    style={{ '--c': o.color }}
                    onClick={e => { e.stopPropagation(); setOpenPopup(openPopup === o.n ? null : o.n); }}
                  >
                    <div className="odu-cell__num">{o.n}</div>
                    <div className="odu-cell__name">{o.name}</div>
                    <div className={`odu-cell__type odu-cell__type--${o.type}`}>{o.type === 'O' ? 'P' : 'Inv'}</div>

                    {/* 0+8D SIDECHRX hover popup — radial spider layout */}
                    <div className="odu-popup" style={{ '--c': o.color }}>
                      <div className="odu-popup__head">
                        <div className="odu-popup__odu">
                          <span className="odu-popup__n">{o.n}</span>
                          <span className="odu-popup__name" style={{ color: o.color }}>{o.name}</span>
                          <span className={`odu-popup__badge odu-popup__badge--${o.type}`}>{o.type === 'O' ? 'Principal' : 'Inverse'}</span>
                        </div>
                        <span className="odu-popup__tag">0 + 8D</span>
                      </div>
                      {/* Radial diagram — pure SVG compass */}
                      {(() => {
                        const cc = 0.707;
                        const SC = [
                          [140,        105,       140,  28,  140,  15,  140,  26, 'middle'], // N  S
                          [140+55*cc,  140-35*cc, 226,  52,  229,  44,  229,  54, 'start' ], // NE I
                          [195,        140,       252, 140,  255, 135,  255, 146, 'start' ], // E  D
                          [140+55*cc,  140+35*cc, 226, 228,  229, 224,  229, 234, 'start' ], // SE E
                          [140,        175,       140, 252,  140, 263,  140, 273, 'middle'], // S  C
                          [140-55*cc,  140+35*cc,  54, 228,   51, 224,   51, 234, 'end'   ], // SW H
                          [85,         140,        28, 140,   25, 135,   25, 146, 'end'   ], // W  R
                          [140-55*cc,  140-35*cc,  54,  52,   51,  44,   51,  54, 'end'   ], // NW X
                        ];
                        return (
                          <svg viewBox="0 0 280 280" overflow="visible" width="100%"
                            style={{ display:'block', maxWidth:'min(220px, calc(100vw - 60px))', margin:'6px auto 4px', fontFamily:'inherit' }}>
                            <defs>
                              <marker id={`pa-${o.n}`} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                                <polygon points="0 1, 0 5, 6 3" fill="rgba(255,255,255,0.25)"/>
                              </marker>
                              {SIDECHRX.map((p, i) => (
                                <marker key={i} id={`pa-${o.n}-${i}`} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                                  <polygon points="0 1, 0 5, 6 3" fill={p.color}/>
                                </marker>
                              ))}
                              {/* Ifa Circle circumference arrow marker */}
                              <marker id={`ifa-c-${o.n}`} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                                <polygon points="0 1, 0 5, 6 3" fill={o.color}/>
                              </marker>
                            </defs>
                            {SC.map(([ex, ey, tx, ty], idx) => {
                              const p = SIDECHRX[idx];
                              const isMatch = baseLetter === p.letter;
                              return (
                                <line key={idx}
                                  x1={ex} y1={ey} x2={tx} y2={ty}
                                  stroke={isMatch ? p.color : 'rgba(255,255,255,0.18)'}
                                  strokeWidth={isMatch ? 2 : 1}
                                  markerEnd={isMatch ? `url(#pa-${o.n}-${idx})` : `url(#pa-${o.n})`}
                                />
                              );
                            })}
                            <ellipse cx="140" cy="140" rx="55" ry="35"
                              fill="#0d1117" stroke={o.color} strokeWidth="2"/>
                            {/* Ifa Circle — clockwise arc arrowhead at E rim */}
                            <path d="M 193.8,132.7 A 55,35 0 0,1 193.8,147.3"
                              fill="none" stroke={o.color} strokeWidth="2.5"
                              markerEnd={`url(#ifa-c-${o.n})`}/>
                            <text x="140" y="133" textAnchor="middle" fontSize="11"
                              fontWeight="800" fill={o.color}>{o.name}</text>
                            <text x="140" y="145" textAnchor="middle" fontSize="9"
                              fill="rgba(255,255,255,0.38)">{o.n}</text>
                            <text x="140" y="157" textAnchor="middle" fontSize="9" fontWeight="700"
                              fill={o.type === 'O' ? '#f0920c' : '#8b5cf6'}>
                              {o.type === 'O' ? 'P' : 'Inv'}
                            </text>
                            {SC.map(([ex, ey, tx, ty, lx, ly, nx, ny, anc], idx) => {
                              const p = SIDECHRX[idx];
                              const isMatch = baseLetter === p.letter;
                              return (
                                <g key={idx}>
                                  <text x={lx} y={ly} textAnchor={anc} fontSize="10" fontWeight="800"
                                    fill={isMatch ? p.color : 'rgba(255,255,255,0.48)'}>{p.letter}</text>
                                  <text x={nx} y={ny} textAnchor={anc} fontSize="8"
                                    fontWeight={isMatch ? 700 : 400}
                                    fill={isMatch ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.34)'}>{p.name}</text>
                                </g>
                              );
                            })}
                          </svg>
                        );
                      })()}
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{ marginTop: '12px', display: 'flex', gap: '16px', fontSize: '0.68rem', color: 'var(--text-3)' }}>
              <span><span style={{ color: 'var(--amber)', fontWeight: 700 }}>P</span> = Principal Odu (8)</span>
              <span><span style={{ color: 'var(--violet)', fontWeight: 700 }}>Inv</span> = Inverse Odu (8)</span>
            </div>
          </div>
        </div>

        {/* ── Odu Ifa Network Map Grid ─────────────────────────────────────── */}
        <div style={{ marginTop: '48px' }}>
          <div style={{ marginBottom: '10px', fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-3)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Odu Ifa Network Map — Ifa Meta-Knowledge, Ìmọ̀mọ̀/Èjìimọ̀ (Knowledge about Knowledge)
          </div>
          <div className="odu-grid" ref={netGridRef}>
            {ODU_16.map(o => {
              const cc = 0.707;
              const oIdx = parseInt(o.n, 10);
              const first7 = ODU_16.slice(0, 7).filter(x => x.n !== o.n);
              const spokes = oIdx <= 7
                ? [o, ...first7, { n: 'others', name: 'Others (08–16)', color: '#ec4899' }]
                : [o, ...first7.slice(0, 6), { n: 'others', name: 'Others', color: '#3b9eff' }];
              const SC = [
                [140,         105,        140,  28, 140,  15, 140,  26, 'middle'],
                [140+55*cc,  140-35*cc,   226,  52, 229,  44, 229,  54, 'start' ],
                [195,         140,        252, 140, 255, 135, 255, 146, 'start' ],
                [140+55*cc,  140+35*cc,   226, 228, 229, 224, 229, 234, 'start' ],
                [140,         175,        140, 252, 140, 263, 140, 273, 'middle'],
                [140-55*cc,  140+35*cc,    54, 228,  51, 224,  51, 234, 'end'   ],
                [85,          140,         28, 140,  25, 135,  25, 146, 'end'   ],
                [140-55*cc,  140-35*cc,    54,  52,  51,  44,  51,  54, 'end'   ],
              ];
              return (
                <div
                  key={o.n}
                  className={`odu-cell${openNetPopup === o.n ? ' odu-cell--popup-open' : ''}`}
                  style={{ '--c': o.color }}
                  onClick={e => { e.stopPropagation(); setOpenNetPopup(openNetPopup === o.n ? null : o.n); }}
                >
                  <div className="odu-cell__num">{o.n}</div>
                  <div className="odu-cell__name">{o.name}</div>
                  <div className={`odu-cell__type odu-cell__type--${o.type}`}>{o.type === 'O' ? 'P' : 'Inv'}</div>

                  {/* Odu Network popup */}
                  <div className="odu-popup" style={{ '--c': o.color }}>
                    <div className="odu-popup__head">
                      <div className="odu-popup__odu">
                        <span className="odu-popup__n">{o.n}</span>
                        <span className="odu-popup__name" style={{ color: o.color }}>{o.name}</span>
                        <span className={`odu-popup__badge odu-popup__badge--${o.type}`}>{o.type === 'O' ? 'Principal' : 'Inverse'}</span>
                      </div>
                      <span className="odu-popup__tag">16 Odu</span>
                    </div>

                    {/* Radial SVG — Odu network compass */}
                    {(() => (
                      <svg viewBox="0 0 280 280" overflow="visible" width="100%"
                        style={{ display: 'block', maxWidth: 'min(220px, calc(100vw - 60px))', margin: '6px auto 4px', fontFamily: 'inherit' }}>
                        <defs>
                          {spokes.map((p, i) => (
                            <marker key={i} id={`on-pa-${o.n}-${i}`} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                              <polygon points="0 1, 0 5, 6 3" fill={p.color} fillOpacity={i === 0 ? 1 : 0.65}/>
                            </marker>
                          ))}
                          <marker id={`on-ic-${o.n}`} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                            <polygon points="0 1, 0 5, 6 3" fill={o.color}/>
                          </marker>
                        </defs>

                        {/* Spoke lines */}
                        {SC.map(([ex, ey, tx, ty], idx) => {
                          const p = spokes[idx];
                          const isSelf = idx === 0;
                          return (
                            <line key={idx}
                              x1={ex} y1={ey} x2={tx} y2={ty}
                              stroke={p.color}
                              strokeWidth={isSelf ? 2 : 1}
                              strokeOpacity={isSelf ? 1 : 0.45}
                              markerEnd={`url(#on-pa-${o.n}-${idx})`}
                            />
                          );
                        })}

                        {/* Ifa Circle — centre node */}
                        <ellipse cx="140" cy="140" rx="55" ry="35"
                          fill="#0d1117" stroke={o.color} strokeWidth="2"/>
                        <path d="M 193.8,132.7 A 55,35 0 0,1 193.8,147.3"
                          fill="none" stroke={o.color} strokeWidth="2.5"
                          markerEnd={`url(#on-ic-${o.n})`}/>
                        <text x="140" y="133" textAnchor="middle" fontSize="11"
                          fontWeight="800" fill={o.color}>{o.name}</text>
                        <text x="140" y="145" textAnchor="middle" fontSize="9"
                          fill="rgba(255,255,255,0.38)">{o.n}</text>
                        <text x="140" y="157" textAnchor="middle" fontSize="9" fontWeight="700"
                          fill={o.type === 'O' ? '#f0920c' : '#8b5cf6'}>
                          {o.type === 'O' ? 'P' : 'Inv'}
                        </text>

                        {/* Spoke labels — Odu number (large) + name (small) */}
                        {SC.map(([ex, ey, tx, ty, lx, ly, nx, ny, anc], idx) => {
                          const p = spokes[idx];
                          const isSelf = idx === 0;
                          return (
                            <g key={idx}>
                              <text x={lx} y={ly} textAnchor={anc} fontSize="10" fontWeight="800"
                                fill={p.color} fillOpacity={isSelf ? 1 : 0.65}>
                                {p.n === 'others' ? '…' : p.n}
                              </text>
                              <text x={nx} y={ny} textAnchor={anc} fontSize="8"
                                fontWeight={isSelf ? 700 : 400}
                                fill={isSelf ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.34)'}>
                                {p.name === 'Others (08–16)' ? 'Others' : p.name}
                              </text>
                            </g>
                          );
                        })}
                      </svg>
                    ))()}
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: '12px', display: 'flex', gap: '16px', fontSize: '0.68rem', color: 'var(--text-3)' }}>
            <span><span style={{ color: 'var(--amber)', fontWeight: 700 }}>P</span> = Principal Odu (8)</span>
            <span><span style={{ color: 'var(--violet)', fontWeight: 700 }}>Inv</span> = Inverse Odu (8)</span>
          </div>
        </div>

      </div>
    </section>
  );
}

// ─── OJU ODU NETWORK SECTION ─────────────────────────────────────────────────

function OjuOduNetworkSection() {
  const [active, setActive] = useState(ODU_16[0]);

  // For each active Odu X, compute 8 spokes:
  //   N (0)  = X itself (self-loop)
  //   NE–W   = the other Odu from 01–07, in order, skipping X
  //            (6 items when X∈01–07; first 6 of 01–07 when X∈08–16)
  //   NW (7) = "Others" (08–16 exc. self; or Obara+Others when X∈08–16)
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
  // [oval_ex, oval_ey, tip_x, tip_y, lbl_x, lbl_y, name_x, name_y, anchor]
  const SC = [
    [280,        142,        280,  70,  280,  42,  280,  56, 'middle'], // N
    [280+110*K,  210-68*K,   455,  78,  459,  73,  459,  87, 'start' ], // NE
    [390,        210,        515, 210,  518, 206,  518, 220, 'start' ], // E
    [280+110*K,  210+68*K,   455, 342,  459, 340,  459, 354, 'start' ], // SE
    [280,        278,        280, 330,  280, 348,  280, 362, 'middle'], // S
    [280-110*K,  210+68*K,   105, 342,  101, 340,  101, 354, 'end'   ], // SW
    [170,        210,         45, 210,   41, 206,   41, 220, 'end'   ], // W
    [280-110*K,  210-68*K,   105,  78,  101,  73,  101,  87, 'end'   ], // NW
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
              Each node connects to itself first, then the first 7 Odu in order, then Others (08–16) — 8 edges total.
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

          {/* Left: 16 Odu selector grid */}
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

          {/* Right: Odu Network Ifagram panel */}
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

            {/* Radial SVG — Odu network compass */}
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

              {/* Spoke lines — all edges shown, self (N) emphasized */}
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

              {/* Centre oval — Ifa Circle node */}
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

              {/* Spoke labels — number + name */}
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

            {/* Spoke legend list */}
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

// ─── 0+8D MODEL SECTION ────────────────────────────────────────────────────────

function ZeroEightDSection() {
  const ODU_FULL = ODU_16.map(o => ({ ...o, d8: ODU_D8[o.n] }));
  const [active, setActive] = useState(ODU_FULL[0]);

  return (
    <section className="section section--d8" id="model-0-8d">
      <div className="container">

        <div className="section__header section__header--center">
          <span className="section__eyebrow section__eyebrow--amber">Àtẹjìnlẹ̀ Ọ̀kánlẹ́jọ</span>
          <h2 className="section__title">
            The <span className="accent--amber">0+8D</span> Model — <span className="accent--violet">8 Ifa Dimensions</span>
          </h2>
          <p className="section__subtitle">
            Click any of the 16 Ojú Odù Ifá to reveal how that Odu governs each of the 8 SIDECHRX Principles of the IFA Matrix.
            <br /><span style={{ fontSize:'0.82em', color:'var(--text-3)' }}>
              0 = Ground Reference State &nbsp;·&nbsp; 8D = S · I · D · E · C · H · R · X (Ifa Principles)
            </span>
          </p>
        </div>

        {/* Ifagram description */}
        <div className="d8-ifagram-note">
          <div className="d8-ifagram-note__label">Ifagram — Ifa Diagram</div>
          <p className="d8-ifagram-note__text">
            Each Diagram below is an <strong>Ifagram</strong>: a Visual Meta-Structure for Diagrammatic Reasoning with Ifa and using network theory.
            The central Node is the <strong>Ifa Circle</strong> — a Circle with an arrow on its circumference, the canonical Node type of the IFA Internet.
            Spokes connect the Ifa Circle to the 8 SIDECHRX Principles positioned at the 8 compass points of the Àtẹjìnlẹ̀ Ọ̀kánlẹ́jọ (0+8D Space),
            forming a Network that maps every Odu Ifa to the full SIDECHRX Knowledge Structure.
          </p>
        </div>

        {/* Formula display */}
        <div className="d8-formula-bar">
          <div className="d8-fbar-eq">
            <span className="d8-fbar-zero">0</span>
            <span className="d8-fbar-op">+</span>
            <div className="d8-fbar-dims">
              {SIDECHRX.map((d, i) => (
                <span key={i} className="d8-fbar-dim" style={{ color: d.color }}
                  title={d.name}>{d.letter}</span>
              ))}
            </div>
          </div>
          <div className="d8-fbar-labels">
            <span className="d8-fbar-ref">Ground Ref</span>
            <span className="d8-fbar-op-sm">+</span>
            {SIDECHRX.map((d, i) => (
              <span key={i} className="d8-fbar-label" style={{ color: d.color }}>{d.name}</span>
            ))}
          </div>
        </div>

        {/* Main two-column layout */}
        <div className="d8-layout">

          {/* Left: 16 Odu grid */}
          <div className="d8-grid-col">
            <div className="d8-grid-label">Ojú Odù Ifá Mẹrindínlógún — Hover to Explore</div>
            <div className="d8-odu-grid">
              {ODU_FULL.map(o => (
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

          {/* Right: 8-dimension panel */}
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
              <div className="d8-panel__tag">0 + 8D</div>
            </div>

            {/* Ground Reference State card */}
            <div className="d8-ground" style={{ '--c': active.color }}>
              <span className="d8-ground__label">0 · Ground Reference State</span>
              <p className="d8-ground__text">{active.d8.ground}</p>
            </div>

            {/* Radial SIDECHRX compass — pure SVG */}
            {(() => {
              const baseLetter = active.letter.replace('′', '');
              // Oval: cx=280 cy=210 rx=110 ry=68
              // SC columns: [oval_ex, oval_ey, arrow_tip_x, arrow_tip_y, letter_x, letter_y, name_x, name_y, text-anchor]
              const c = 0.707;
              const SC = [
                [280,          142,           280,  70,  280,  42,  280,  56,  'middle'], // N  S
                [280+110*c,    210-68*c,      455,  78,  459,  73,  459,  87,  'start' ], // NE I
                [390,          210,           515, 210,  518, 206,  518, 220,  'start' ], // E  D
                [280+110*c,    210+68*c,      455, 342,  459, 340,  459, 354,  'start' ], // SE E
                [280,          278,           280, 330,  280, 348,  280, 362,  'middle'], // S  C
                [280-110*c,    210+68*c,      105, 342,  101, 340,  101, 354,  'end'   ], // SW H
                [170,          210,            45, 210,   41, 206,   41, 220,  'end'   ], // W  R
                [280-110*c,    210-68*c,      105,  78,  101,  73,  101,  87,  'end'   ], // NW X
              ];
              return (
                <svg viewBox="0 0 560 420" overflow="visible" width="100%"
                  style={{ display:'block', maxWidth:'min(460px, calc(100vw - 40px))', margin:'0 auto 22px', fontFamily:'inherit' }}>
                  <defs>
                    <marker id="d8-arr" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
                      <polygon points="0 1, 0 7, 8 4" fill="rgba(255,255,255,0.22)"/>
                    </marker>
                    {SIDECHRX.map((p, i) => (
                      <marker key={i} id={`d8-arr-${i}`} markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
                        <polygon points="0 1, 0 7, 8 4" fill={p.color}/>
                      </marker>
                    ))}
                    {/* Ifa Circle circumference arrow marker — unique per active Odu */}
                    <marker id={`d8-ifa-c-${active.n}`} markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
                      <polygon points="0 1, 0 7, 8 4" fill={active.color}/>
                    </marker>
                  </defs>

                  {/* Spoke lines with arrowheads */}
                  {SC.map(([ex, ey, tx, ty], idx) => {
                    const p = SIDECHRX[idx];
                    const isMatch = baseLetter === p.letter;
                    return (
                      <line key={idx}
                        x1={ex} y1={ey} x2={tx} y2={ty}
                        stroke={isMatch ? p.color : 'rgba(255,255,255,0.18)'}
                        strokeWidth={isMatch ? 2.2 : 1}
                        markerEnd={isMatch ? `url(#d8-arr-${idx})` : 'url(#d8-arr)'}
                      />
                    );
                  })}

                  {/* Center oval — Ifa Circle node */}
                  <ellipse cx="280" cy="210" rx="110" ry="68"
                    fill="#111827" stroke={active.color} strokeWidth="2.5"/>
                  {/* Ifa Circle — clockwise arc arrowhead at E rim */}
                  <path d="M 387.6,195.9 A 110,68 0 0,1 387.6,224.1"
                    fill="none" stroke={active.color} strokeWidth="3"
                    markerEnd={`url(#d8-ifa-c-${active.n})`}/>
                  <text x="280" y="200" textAnchor="middle" fontSize="16"
                    fontWeight="800" fill={active.color}>{active.name}</text>
                  <text x="280" y="216" textAnchor="middle" fontSize="11"
                    fill="rgba(255,255,255,0.38)">{active.n}</text>
                  <text x="280" y="232" textAnchor="middle" fontSize="11" fontWeight="700"
                    fill={active.type === 'O' ? '#f0920c' : '#8b5cf6'}>
                    {active.type === 'O' ? 'Principal' : 'Inverse'}
                  </text>

                  {/* Spoke labels: letter (large) + name (small) */}
                  {SC.map(([ex, ey, tx, ty, lx, ly, nx, ny, anc], idx) => {
                    const p = SIDECHRX[idx];
                    const isMatch = baseLetter === p.letter;
                    return (
                      <g key={idx}>
                        <text x={lx} y={ly} textAnchor={anc} fontSize="13" fontWeight="800"
                          fill={isMatch ? p.color : 'rgba(255,255,255,0.48)'}>{p.letter}</text>
                        <text x={nx} y={ny} textAnchor={anc} fontSize="11"
                          fontWeight={isMatch ? 700 : 400}
                          fill={isMatch ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.34)'}>{p.name}</text>
                      </g>
                    );
                  })}
                </svg>
              );
            })()}

            {/* Ifagram caption */}
            <div style={{ textAlign:'center', fontSize:'0.7rem', color:'var(--text-3)', letterSpacing:'0.08em', marginBottom:'12px', fontWeight:600 }}>
              IFAGRAM &nbsp;·&nbsp; Ifa Diagram — Diagrammatic Reasoning with Ifa
            </div>

            {/* SIDECHRX principle brief descriptions — same for all 16 Odu */}
            <div className="d8-dims-list">
              {SIDECHRX.map((p, i) => (
                <div key={i} className="d8-dim-row" style={{ '--dc': p.color }}>
                  <span className="d8-dim-row__letter">{p.letter}</span>
                  <span className="d8-dim-row__text">{p.tagline}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SIDECHRX legend bar */}
        <div className="d8-legend">
          <span className="d8-legend__ref"><span style={{ color:'var(--amber)', fontWeight:800 }}>0</span> Reference</span>
          <span className="d8-legend__div" />
          {SIDECHRX.map((d, i) => (
            <span key={i} className="d8-legend__item">
              <span style={{ color: d.color, fontWeight: 800 }}>{d.letter}</span>
              <span>{d.name}</span>
            </span>
          ))}
        </div>

      </div>
    </section>
  );
}

// ─── STEAMSEX MATRIX DATA ─────────────────────────────────────────────────────

const STEAMSEX_DIMS = [
  { letter:'S', name:'(Natural) Science',  short:'Science',     color:'#f0920c',
    desc:'The laws, forces, and structures of the physical universe — from quantum fields to cosmological scales, unified through Ifa Field Theory.' },
  { letter:'T', name:'Technology',          short:'Technology',  color:'#14b8d4',
    desc:'The application of Ifa knowledge to build tools, systems, and platforms across all domains of human life and enterprise.' },
  { letter:'E', name:'Engineering',         short:'Engineering', color:'#00c87c',
    desc:'The design, construction, and optimisation of structures, machines, and complex Ifa systems — material and immaterial.' },
  { letter:'A', name:'Arts',               short:'Arts',        color:'#ec4899',
    desc:'Creative expression, aesthetics, music, literature, and all forms of human and Orisa artistry through the lens of Ifa.' },
  { letter:'M', name:'Mathematics',        short:'Mathematics', color:'#f5c518',
    desc:'The formal language of pattern, structure, and quantity — the metamathematical backbone of IfaGebra and Ifa Matrix Theory.' },
  { letter:'S', name:'Social Science',     short:'Social',      color:'#8b5cf6',
    desc:'Human society, culture, economics, politics, and all collective Ifa phenomena at social scale — governed by SIDECHRX.' },
  { letter:'E', name:'Education',          short:'Education',   color:'#3b9eff',
    desc:'The transmission, preservation, and development of Ifa knowledge across generations and civilisations — the engine of Ifa Culture.' },
  { letter:'X', name:'Others (Unknowns)',  short:'Unknowns',    color:'#6366f1',
    desc:'The frontier of the unknown — all fields and phenomena yet to be named, discovered, or formalised within the IFABOK.' },
];

// ─── AMULU MATRIX DATA ────────────────────────────────────────────────────────
// 8 Amulu operators arranged at compass angles (clockwise from top)

const AMULU_OPS = [
  { name: 'OR',     angle: -Math.PI / 2,      notation: '∓',  notationTransform: 'none',
    color: '#f0920c',
    desc: 'Energy union — the fundamental OR operator of Ifa Computing. Combines two Odu into the broadest unified energyform, producing all active energy configurations.' },
  { name: 'ANDOR',  angle: -Math.PI / 4,      notation: '±',  notationTransform: 'scaleY(-1) rotate(-45deg)',
    color: '#14b8d4',
    desc: 'The universal energy bridge — the ANDOR operator combines AND and OR dynamics into a single meta-operation, modelling all hybrid energy configurations across the IFA Matrix.' },
  { name: 'AND',    angle: 0,                 notation: '±',  notationTransform: 'rotate(-180deg) scaleY(-1) rotate(90deg)',
    color: '#00c87c',
    desc: 'Energy intersection — the Ifa AND operator produces only the shared energyform of two Odu. The foundational conjugate operation of Ifa Matrix algebra.' },
  { name: "ANDOR'", angle: Math.PI / 4,       notation: '±',  notationTransform: 'rotate(-45deg)',
    color: '#ec4899',
    desc: 'The ANDOR complement — the dual intersection-union operator. Models the inverse of hybrid energy configurations, completing the ANDOR symmetry pair within the Amulu group.' },
  { name: "OR'",    angle: Math.PI / 2,       notation: '±',  notationTransform: 'none',
    color: '#f5c518',
    desc: "Energy union complement — the dual of OR. Models all passive energyforms and everything OR leaves unselected. Together OR and OR′ span the complete Ifa energy space." },
  { name: 'ORAND',  angle: 3 * Math.PI / 4,  notation: '±',  notationTransform: 'rotate(45deg)',
    color: '#8b5cf6',
    desc: 'Ordered energy combination — OR preceding AND. The ORAND operator models sequential energy selection and refinement across Odu, producing ordered Amulu configurations.' },
  { name: "AND'",   angle: Math.PI,           notation: '±',  notationTransform: 'scaleY(-1) rotate(90deg)',
    color: '#3b9eff',
    desc: "Anti-conjugate — the dual of AND. Selects everything outside the energy intersection of two Odu. A key operator in Ifa inversion and transpose operations within the IFA Matrix." },
  { name: "ORAND'", angle: -3 * Math.PI / 4, notation: '±',  notationTransform: 'rotate(135deg)',
    color: '#6366f1',
    desc: "Ordered complement — the inverse of ORAND. Models anti-sequential energy selection and the full null-space of ORAND. Completes the 8-operator Amulu Matrix symmetry group." },
];

// ─── STEAMSEX DIAGRAM ─────────────────────────────────────────────────────────

function SteamsexDiagram({ imageUrl, imageAlt, title, variant, index }) {
  const [active, setActive]         = React.useState(false);
  const [hoveredDim, setHoveredDim] = React.useState(null);

  const cx = 310, cy = 250, nodeR = 172, centerR = 50, dimR = 27;
  const accentColor = variant === 'energy' ? '#00c87c' : '#f0920c';

  const dims = STEAMSEX_DIMS.map((d, i) => {
    const angle = (i / 8) * 2 * Math.PI - Math.PI / 2;
    return { ...d, x: cx + nodeR * Math.cos(angle), y: cy + nodeR * Math.sin(angle), angle };
  });

  const hovDim = hoveredDim !== null ? dims[hoveredDim] : null;

  const handleToggle = () => { setActive(v => !v); setHoveredDim(null); };

  return (
    <div className="stx-diagram">
      {/* Reference image */}
      <div className="stx-diagram__img-frame">
        <img src={imageUrl} alt={imageAlt} />
        <div className="stx-diagram__img-caption">{imageAlt}</div>
      </div>

      {/* Interactive graph */}
      <div className="stx-diagram__graph-wrap">
        <div className="stx-diagram__title">{title}</div>
        <div className="stx-diagram__hint">
          {!active
            ? <>Click <strong style={{ color: accentColor }}>{variant === 'energy' ? 'Energy' : 'IFA'}</strong> to explore the 8 STEAMSEX {'Dimensions'} →</>
            : <span style={{ color: accentColor, fontSize: '0.68rem' }}>◈ Matrix open — hover any node to explore</span>
          }
        </div>

        <svg viewBox="0 0 620 500" className="stx-svg">
          <defs>
            <radialGradient id={'stx-cg-' + index} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={accentColor} stopOpacity="0.38" />
              <stop offset="100%" stopColor={accentColor} stopOpacity="0" />
            </radialGradient>
            <radialGradient id={'stx-bg-' + index} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0d1320" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#050810" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Soft background halo */}
          <circle cx={cx} cy={cy} r={nodeR + 36} fill={'url(#stx-bg-' + index + ')'} />

          {/* Orbit ring */}
          <circle cx={cx} cy={cy} r={nodeR} fill="none"
            stroke="rgba(255,255,255,0.045)" strokeWidth="1" strokeDasharray="3 7" />

          {/* STEAMSEX ring label */}
          <text
            opacity={active ? 1 : 0}
            style={{ transition: 'opacity 0.65s ease 0.5s' }}
            fill="rgba(255,255,255,0.13)" fontSize="7" letterSpacing="2.5" fontFamily="monospace">
            <textPath startOffset="3%" href={'#stx-arc-' + index}>
              {'S · T · E · A · M · S · E · X · STEAMSEX MATRIX · IFA MATRIX ·'}
            </textPath>
          </text>
          <defs>
            <path id={'stx-arc-' + index}
              d={'M ' + cx + ',' + (cy - nodeR - 20) +
                 ' A ' + (nodeR + 20) + ',' + (nodeR + 20) +
                 ' 0 1 1 ' + (cx - 0.01) + ',' + (cy - nodeR - 20)} />
          </defs>

          {/* Edges */}
          {dims.map((d, i) => {
            const sx = cx + (centerR + 6) * Math.cos(d.angle);
            const sy = cy + (centerR + 6) * Math.sin(d.angle);
            const ex = cx + (nodeR - dimR - 4) * Math.cos(d.angle);
            const ey = cy + (nodeR - dimR - 4) * Math.sin(d.angle);
            const len = Math.hypot(ex - sx, ey - sy).toFixed(1);
            const delay = active ? i * 52 : 0;
            return (
              <line key={i}
                x1={sx} y1={sy} x2={ex} y2={ey}
                stroke={d.color} strokeWidth="1.5"
                strokeDasharray={len}
                strokeDashoffset={active ? 0 : len}
                opacity={active ? 0.72 : 0}
                style={{ transition: 'stroke-dashoffset 0.55s ease ' + delay + 'ms, opacity 0.3s ease ' + delay + 'ms' }}
              />
            );
          })}

          {/* Dimension nodes */}
          {dims.map((d, i) => {
            const isHov = hoveredDim === i;
            const delay = active ? i * 52 + 180 : 0;
            return (
              <g key={i}>
                {/* Glow halo */}
                <circle cx={d.x} cy={d.y} r={isHov ? 40 : 32} fill={d.color}
                  opacity={active ? (isHov ? 0.22 : 0.08) : 0}
                  style={{ transition: 'opacity 0.4s ease ' + delay + 'ms' }} />
                {/* Node ring */}
                <circle cx={d.x} cy={d.y} r={dimR}
                  fill="var(--bg-3)" stroke={d.color}
                  strokeWidth={isHov ? 2.5 : 1.5}
                  opacity={active ? 1 : 0}
                  style={{ transition: 'opacity 0.4s ease ' + delay + 'ms, stroke-width 0.18s' }} />
                {/* Letter */}
                <text x={d.x} y={d.y - 5} textAnchor="middle"
                  fill={d.color} fontSize="14" fontWeight="800" fontFamily="monospace"
                  opacity={active ? 1 : 0}
                  style={{ transition: 'opacity 0.45s ease ' + (delay + 80) + 'ms' }}>
                  {d.letter}
                </text>
                {/* Short name */}
                <text x={d.x} y={d.y + 11} textAnchor="middle"
                  fill={d.color} fontSize="6.2"
                  opacity={active ? 0.85 : 0}
                  style={{ transition: 'opacity 0.45s ease ' + (delay + 80) + 'ms' }}>
                  {d.short}
                </text>
                {/* Hit area */}
                <circle cx={d.x} cy={d.y} r={dimR + 10} fill="transparent"
                  style={{ cursor: active ? 'pointer' : 'default' }}
                  onMouseEnter={() => active && setHoveredDim(i)}
                  onMouseLeave={() => setHoveredDim(null)} />
              </g>
            );
          })}

          {/* Center node — IFA or ENERGY depending on variant */}
          <g onClick={handleToggle} style={{ cursor: 'pointer' }}>
            {/* Pulse ring */}
            <circle cx={cx} cy={cy} r="70" fill="none"
              stroke={accentColor} strokeWidth="1.2" className="stx-pulse" />
            {/* Glow halo */}
            <circle cx={cx} cy={cy} r={centerR + 14} fill={'url(#stx-cg-' + index + ')'} />
            {/* Main circle */}
            <circle cx={cx} cy={cy} r={centerR}
              fill="var(--bg-3)" stroke={accentColor} strokeWidth="2.5" />
            {variant === 'energy' ? (
              <>
                {/* ENERGY — label + status */}
                <text x={cx} y={cy - 8} textAnchor="middle"
                  fill={accentColor} fontSize="13" fontWeight="900"
                  letterSpacing="2" fontFamily="monospace">ENERGY</text>
                <text x={cx} y={cy + 9} textAnchor="middle"
                  fill={accentColor} fontSize="7.5" opacity="0.7">
                  {active ? '◈ CLICK TO CLOSE' : '↓ CLICK TO OPEN'}
                </text>
              </>
            ) : (
              <>
                {/* IFA text */}
                <text x={cx} y={cy - 7} textAnchor="middle"
                  fill={accentColor} fontSize="21" fontWeight="900"
                  letterSpacing="3" fontFamily="monospace">IFA</text>
                {/* Status sub-text */}
                <text x={cx} y={cy + 13} textAnchor="middle"
                  fill={accentColor} fontSize="7.5" opacity="0.7">
                  {active ? '◈ CLICK TO CLOSE' : '↓ CLICK TO OPEN'}
                </text>
              </>
            )}
          </g>
        </svg>

        {/* Dimension info panel */}
        {hovDim ? (
          <div className="stx-dim-info" style={{ '--c': hovDim.color }}>
            <div className="stx-dim-info__letter">{hovDim.letter}</div>
            <div className="stx-dim-info__content">
              <div className="stx-dim-info__name">{hovDim.name}</div>
              <p className="stx-dim-info__desc">{hovDim.desc}</p>
            </div>
          </div>
        ) : active ? (
          <div className="stx-dim-hint">Hover any dimension node to explore · {STEAMSEX_DIMS.length} dimensions active</div>
        ) : (
          <div className="stx-dim-hint" style={{ opacity: 0 }}>—</div>
        )}
      </div>
    </div>
  );
}

// ─── AMULU MATRIX DIAGRAM ─────────────────────────────────────────────────────

function AmulDiagram() {
  const [active,  setActive]  = React.useState(false);
  const [hovOp,   setHovOp]   = React.useState(null);

  const cx = 340, cy = 195;
  const innerR    = 42;   // centre node radius
  const lineEndR  = 148;  // where animated arms end
  const labelR    = 172;  // where operator labels sit

  const computed = AMULU_OPS.map((op) => {
    const a = op.angle;
    const cosA = Math.cos(a), sinA = Math.sin(a);
    const x1 = cx + innerR   * cosA, y1 = cy + innerR   * sinA;
    const x2 = cx + lineEndR * cosA, y2 = cy + lineEndR * sinA;
    const lx = cx + labelR   * cosA, ly = cy + labelR   * sinA;
    // Tick 1 (inner, ~37%): short crossbar — arm passes through it
    // Tick 2 (outer, ~65%): longer crossbar — arm LINE ENDS HERE (does not pass through)
    const tm1R = innerR + (lineEndR - innerR) * 0.37;
    const tm2R = innerR + (lineEndR - innerR) * 0.65;
    const m1x = cx + tm1R * cosA, m1y = cy + tm1R * sinA;
    const m2x = cx + tm2R * cosA, m2y = cy + tm2R * sinA;
    // Perpendicular direction; two lengths — inner shorter, outer longer
    const pL1 = 7,  pL2 = 12;
    const p1x = -sinA * pL1, p1y = cosA * pL1;
    const p2x = -sinA * pL2, p2y = cosA * pL2;
    // Arm line ends at tm2R (outer tick), not lineEndR
    const armEndX = m2x, armEndY = m2y;
    const lineLen = tm2R - innerR;
    // Text anchor by angle
    const deg = ((a * 180 / Math.PI) + 360) % 360;
    const anchor = (deg > 22.5 && deg < 157.5) ? 'start'
                 : (deg > 202.5 && deg < 337.5) ? 'end' : 'middle';
    // Vertical nudge for top/bottom labels
    const dy = (Math.abs(sinA) > 0.7) ? (sinA > 0 ? 10 : -4) : 4;
    return { ...op, x1, y1, x2: armEndX, y2: armEndY, lx, ly,
             m1x, m1y, m2x, m2y, p1x, p1y, p2x, p2y, lineLen, anchor, dy };
  });

  return (
    <div className="amx-layout">

      {/* ── Reference image ── */}
      <div className="amx-ref-panel">
        <div className="amx-ref-panel__label">Diagram Reference</div>
        <img
          src="./src/Amulu-Matrix-768x314.png"
          alt="The Amulu Matrix — 8 Operators"
          className="amx-ref-panel__img"
        />
        <div className="amx-ref-panel__caption">
          The Amulu Matrix · A Tool for Ifa Computing
        </div>
      </div>

      {/* ── Interactive graph ── */}
      <div className="amx-graph-panel">
        <div className="amx-graph-panel__title">
          Amulu Matrix · <span style={{ color: '#f0920c' }}>Interactive</span>
        </div>
        <div className="amx-graph-panel__hint">
          Click the <strong>AMULU</strong> node to reveal the 8 operators
        </div>

        <svg viewBox="0 0 680 390" className="amx-svg">
          <defs>
            <radialGradient id="amx-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f0920c" stopOpacity="0.24" />
              <stop offset="100%" stopColor="#f0920c" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Operator arms */}
          {computed.map((op, i) => {
            const isHov = hovOp === i;
            const lc = isHov ? op.color : (active ? op.color + 'bb' : op.color + '00');
            const tc = active ? op.color + '77' : op.color + '00';
            return (
              <g key={i}>
                {/* Animated line */}
                <line x1={op.x1} y1={op.y1} x2={op.x2} y2={op.y2}
                  stroke={lc} strokeWidth={isHov ? 2.6 : 1.7} strokeLinecap="round"
                  strokeDasharray={op.lineLen} strokeDashoffset={active ? 0 : op.lineLen}
                  style={{ transition: `stroke-dashoffset 0.55s ease ${i * 60}ms, stroke 0.2s, stroke-width 0.15s` }}
                />
                {/* Tick 1 — inner short crossbar (~37%); arm passes through */}
                <line
                  x1={op.m1x - op.p1x} y1={op.m1y - op.p1y}
                  x2={op.m1x + op.p1x} y2={op.m1y + op.p1y}
                  stroke={tc} strokeWidth="1.5" strokeLinecap="round"
                  style={{ transition: `stroke 0.3s ease ${i * 60 + 300}ms` }}
                />
                {/* Tick 2 — outer longer crossbar (~65%); arm ends here */}
                <line
                  x1={op.m2x - op.p2x} y1={op.m2y - op.p2y}
                  x2={op.m2x + op.p2x} y2={op.m2y + op.p2y}
                  stroke={tc} strokeWidth="1.8" strokeLinecap="round"
                  style={{ transition: `stroke 0.3s ease ${i * 60 + 360}ms` }}
                />
                {/* Label */}
                <text
                  x={op.lx} y={op.ly + op.dy}
                  textAnchor={op.anchor} dominantBaseline="middle"
                  fill={active ? (isHov ? op.color : 'var(--text-2)') : 'transparent'}
                  fontSize="11.5" fontWeight="700" fontFamily="monospace" letterSpacing="0.5"
                  style={{ transition: `fill 0.4s ease ${i * 60 + 200}ms`, cursor: active ? 'pointer' : 'default' }}
                >
                  {op.name}
                </text>
                {/* Transparent hit-area over label */}
                <circle cx={op.lx} cy={op.ly} r={26} fill="transparent"
                  style={{ cursor: active ? 'pointer' : 'default' }}
                  onMouseEnter={() => active && setHovOp(i)}
                  onMouseLeave={() => setHovOp(null)}
                />
              </g>
            );
          })}

          {/* Centre AMULU node */}
          <g onClick={() => { setActive(a => !a); setHovOp(null); }} style={{ cursor: 'pointer' }}>
            <circle cx={cx} cy={cy} r="68" fill="none" stroke="#f0920c" strokeWidth="1" className="stx-pulse" />
            <circle cx={cx} cy={cy} r={innerR + 14} fill="url(#amx-glow)" />
            <circle cx={cx} cy={cy} r={innerR} fill="var(--bg-3)" stroke="#f0920c" strokeWidth="2.5" />
            <text x={cx} y={cy - 8} textAnchor="middle"
              fill="#f0920c" fontSize="12.5" fontWeight="900" letterSpacing="2" fontFamily="monospace">
              AMULU
            </text>
            <text x={cx} y={cy + 9} textAnchor="middle" fill="#f0920c" fontSize="7" opacity="0.75">
              {active ? '◈ CLICK TO CLOSE' : '↓ CLICK TO OPEN'}
            </text>
          </g>
        </svg>

        {/* Operator info panel */}
        {hovOp !== null && computed[hovOp] ? (
          <div className="amx-op-info" style={{ '--c': computed[hovOp].color }}>
            <div className="amx-op-info__notation">
              <span style={{ display: 'inline-block', transform: computed[hovOp].notationTransform }}>
                {computed[hovOp].notation}
              </span>
            </div>
            <div className="amx-op-info__body">
              <div className="amx-op-info__name">{computed[hovOp].name}</div>
              <p className="amx-op-info__desc">{computed[hovOp].desc}</p>
            </div>
          </div>
        ) : active ? (
          <div className="amx-op-hint">Hover any operator arm to explore · 8 Amulu operators active</div>
        ) : (
          <div className="amx-op-hint" style={{ opacity: 0 }}>—</div>
        )}
      </div>
    </div>
  );
}

// ─── STEAMSEX MATRIX SECTION ─────────────────────────────────────────────────

function SteamsexMatrixSection() {
  return (
    <section className="section section--alt" id="steamsex-matrix">
      <div className="container">

        {/* Header */}
        <div className="section__header section__header--center">
          <span className="section__eyebrow section__eyebrow--jade">IFA Matrix · MatxoE · CEN Matrix · Amulu Matrix</span>
          <h2 className="section__title">
            The <span className="accent--jade">STEAMSEX</span> Matrix
          </h2>
          <p className="section__subtitle">
            The IFA Matrix — also known as the <strong>STEAMSEX Matrix</strong>, <strong>CEN Matrix</strong>,{' '}
            <strong>Energy Matrix</strong>, or <strong>Amulu Matrix</strong> — is the{' '}
            <em>Matrix of Everything (MatxoE)</em>: one of the meta-mathematical structures used to unify and integrate
            all fields and disciplines within the IFA System.
          </p>
        </div>

        {/* STEAMSEX definition block */}
        <div className="stx-def-block">
          <div className="stx-def-block__label">STEAMSEX — The 8 Dimensions of All Knowledge</div>
          <p className="stx-def-block__text">
            <strong style={{ color: 'var(--text-1)' }}>STEAMSEX</strong> stands for{' '}
            <strong style={{ color: '#f0920c' }}>(Natural) Science</strong>,{' '}
            <strong style={{ color: '#14b8d4' }}>Technology</strong>,{' '}
            <strong style={{ color: '#00c87c' }}>Engineering</strong>,{' '}
            <strong style={{ color: '#ec4899' }}>Arts</strong>,{' '}
            <strong style={{ color: '#f5c518' }}>Mathematics</strong>,{' '}
            <strong style={{ color: '#8b5cf6' }}>Social Science</strong>,{' '}
            <strong style={{ color: '#3b9eff' }}>Education</strong>, and{' '}
            <strong style={{ color: '#6366f1' }}>Others (Unknowns)</strong> — the complete space of all human knowledge
            and inquiry, unified through the IFA Matrix as one coherent system.
          </p>
        </div>

        {/* Acronym pills */}
        <div className="stx-acronym">
          {STEAMSEX_DIMS.map((d, i) => (
            <div key={i} className="stx-acronym__pill" style={{ borderColor: d.color + '38' }}>
              <span className="stx-acronym__letter" style={{ color: d.color }}>{d.letter}</span>
              <span className="stx-acronym__name">{d.name}</span>
            </div>
          ))}
        </div>

        {/* Two interactive diagrams */}
        <div className="stx-diagrams">
          <SteamsexDiagram
            imageUrl="./src/The-STEAMSEX-Matrix-IFA.png"
            imageAlt="The STEAMSEX Matrix — Ifa Architecture"
            title="The STEAMSEX Matrix · Ifa Architecture"
            variant="ifa"
            index={0}
          />
          <SteamsexDiagram
            imageUrl="./src/The-STEAMSEX-Matrix-Energy-768x512.png"
            imageAlt="The STEAMSEX Matrix — Energy Architecture"
            title="The STEAMSEX Matrix · Energy Architecture"
            variant="energy"
            index={1}
          />
        </div>

        {/* ── Metamathematics of Ifa subsection ────────────────────────── */}
        <div className="stx-meta">
          <div className="stx-meta__header">
            <span className="section__eyebrow section__eyebrow--amber">Metamathematics of Ifa</span>
            <h3 className="stx-meta__title">
              The Metamathematics of Ifa: Ifa Dida and Oosa Dida
            </h3>
            <p className="stx-meta__sub">
              The ancient Yoruba mathematical tradition behind what modern mathematics calls matrix algebra or matrix theory.
            </p>
          </div>

          <div className="stx-meta__intro">
            <p>
              What we call <strong style={{ color: 'var(--text-1)' }}>matrix algebra or matrix theory</strong> in modern
              mathematics has its roots in the ancient mathematical tradition of{' '}
              <strong style={{ color: 'var(--amber)' }}>Ifa Dida</strong> or{' '}
              <strong style={{ color: 'var(--amber)' }}>Oosa Dida</strong> in Yoruba culture — the formalised practice
              of casting and reading Ifa patterns, which constitutes one of the oldest recorded matrix traditions in human history.
            </p>
            <p>
              In <strong style={{ color: 'var(--text-1)' }}>IFABOK</strong>, we study this mathematical culture (Ifa Dida
              and Oosa Dida) formally as the metamathematics called{' '}
              <strong style={{ color: 'var(--amber)' }}>IFA Matrix</strong>. IFA Matrix is a wide range of meta-structures
              used for developing, studying, and modelling all fields mathematically, holistically, and building advanced
              technologies known as <strong style={{ color: 'var(--amber)' }}>Ifa Technologies</strong> and{' '}
              <strong style={{ color: 'var(--amber)' }}>Orisa Technologies</strong>.
            </p>
            <p>
              Simply put:{' '}
              <em><strong style={{ color: 'var(--text-1)' }}>Ifa Matrix Theory</strong> entails doing the subject of matrix
              theory or matrix algebra in IfaLang</em> — the formal language of Ifa.
            </p>
          </div>

          <div className="stx-meta__cards">
            <div className="stx-meta__card" style={{ '--c': '#f0920c' }}>
              <div className="stx-meta__card-icon">⊞</div>
              <div className="stx-meta__card-title">Ifa Dida — The Original Matrix Practice</div>
              <p className="stx-meta__card-body">
                Ifa Dida (literally "Ifa Casting") is the ancient Yoruba practice of constructing Ifa matrix configurations
                through a formalised casting procedure. Each cast produces an Odu — a row of a matrix — and the full set
                of 4 rows produces the complete 4×2 Ifa Matrix entry. This is the oldest known systematic matrix
                construction procedure, predating modern matrix notation by millennia.
              </p>
            </div>
            <div className="stx-meta__card" style={{ '--c': '#6366f1' }}>
              <div className="stx-meta__card-icon">⊡</div>
              <div className="stx-meta__card-title">Oosa Dida — Matrix Operations in Ifa</div>
              <p className="stx-meta__card-body">
                Oosa Dida ("Oosa Casting") is the Dual of Ifa Dida. Ifa Dida and its Superpartner, Orisa Didia, contain
                the full matrix operational space — the Amulu operation, Ifa inversion, Ifa transpose, and the complete
                256-element Ifa group structure. In IFABOK, these operations are studied as the formal metamathematics
                of IFA Matrix Theory, providing the algebraic foundation for all Ifa Technologies and Orisa Technologies
                on the IFA Internet.
              </p>
            </div>
            <div className="stx-meta__card" style={{ '--c': '#14b8d4' }}>
              <div className="stx-meta__card-icon">⬡</div>
              <div className="stx-meta__card-title">IFA Matrix Theory — Matrix Algebra in IfaLang</div>
              <p className="stx-meta__card-body">
                IFA Matrix Theory is the formal IFABOK discipline that performs matrix algebra using IfaLang — the
                computational Language of Ifa. Every concept in modern matrix theory (eigenvalues, transformations,
                group representations, tensor products) has its own Odu, its inherent Energy in IfaLang within the
                IFA Matrix Framework — bridging ancient Yoruba knowledge to the most advanced tools of modern STEM.
              </p>
            </div>
            <div className="stx-meta__card" style={{ '--c': '#00c87c' }}>
              <div className="stx-meta__card-icon">∞</div>
              <div className="stx-meta__card-title">IFABOK — The Matrix of Everything</div>
              <p className="stx-meta__card-body">
                The IFA Matrix is the central organising structure of the entire IFA Body of Knowledge (IFABOK). All
                8 STEAMSEX dimensions, all 8 SIDECHRX principles, all 256 Odu, and all Ifa Technologies are housed
                within the IFA Matrix. The Matrix of Everything is a highly comprehensive knowledge Framework
                connecting modern mathematics to the ancient Metamathematics of Ifa and developing the most general,
                universal Mathematical Frameworks, the Mathematics of Everything (MatoE), which can be used to learn
                all knowledge fields.
              </p>
            </div>
          </div>
        </div>

        {/* ── Amulu Matrix subsection ─────────────────────────────────── */}
        <div className="amx-section">

          <div className="amx-section__header">
            <span className="section__eyebrow section__eyebrow--amber">Amulu Matrix · Ifa Energy Computing</span>
            <h3 className="amx-section__title">
              The <span className="accent--amber">Amulu Matrix</span>
            </h3>
            <p className="amx-section__sub">
              The 8 meta-mathematical operators at the heart of Ifa Computing — modelling all of reality as
              mathematical energyforms on the IFA Internet.
            </p>
          </div>

          <div className="amx-intro">
            <p>
              The <strong style={{ color: 'var(--amber)' }}>Amulu operators</strong> are the key tools of the
              IFA Internet for studying and modelling everything as{' '}
              <em>mathematical energyforms</em>. Just as modern mathematics uses addition, multiplication, and
              inversion to build all of algebra, Ifa Computing uses the 8 Amulu operators to build the complete
              operational space of the IFA Matrix — the{' '}
              <strong style={{ color: 'var(--text-1)' }}>Matrix of Everything (MatxoE)</strong>.
            </p>
            <p>
              These operators are highly essential meta-notations of{' '}
              <strong style={{ color: 'var(--amber)' }}>Ifa Computing</strong> (also known as{' '}
              <strong style={{ color: 'var(--amber)' }}>Energy Computing</strong>) — a paradigm in which all
              systems, technologies, and knowledge structures are built and studied as configurations of
              energy within the{' '}
              <strong style={{ color: 'var(--text-1)' }}>256-element Ifa group structure</strong>.
              The Amulu Matrix defines the complete algebraic structure of{' '}
              <strong style={{ color: 'var(--amber)' }}>Ifa Technologies</strong> and{' '}
              <strong style={{ color: 'var(--amber)' }}>Orisa Technologies</strong> across the IFA Internet.
            </p>
          </div>

          {/* Interactive diagram */}
          <AmulDiagram />

          {/* Meta-notation grid */}
          <div className="amx-notations">
            <div className="amx-notations__eyebrow">Amulu Meta-Notations · IFALang</div>
            <h4 className="amx-notations__title">The 8 Amulu Operator Symbols</h4>
            <p className="amx-notations__sub">
              Each Amulu operator carries a unique meta-notation in IFALang — the formal Language of Ifa Computing.
              These symbols are the fundamental energy-operation glyphs from which all IFA Matrix expressions are built.
            </p>
            <div className="amx-notations__grid">
              {AMULU_OPS.map((op, i) => (
                <div key={i} className="amx-note-card" style={{ '--c': op.color }}>
                  <div className="amx-note-card__glyph">
                    <span style={{ display: 'inline-block', transform: op.notationTransform }}>
                      {op.notation}
                    </span>
                  </div>
                  <div className="amx-note-card__name">{op.name}</div>
                  <div className="amx-note-card__label">
                    {op.name === 'OR'     ? 'Energy Union'             :
                     op.name === 'ANDOR'  ? 'Hybrid Bridge'            :
                     op.name === 'AND'    ? 'Energy Intersection'      :
                     op.name === "ANDOR'" ? 'Hybrid Complement'        :
                     op.name === "OR'"    ? 'Union Complement'         :
                     op.name === 'ORAND'  ? 'Ordered Combination'      :
                     op.name === "AND'"   ? 'Anti-Conjugate'           :
                                           'Ordered Complement'        }
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

// ─── SIDECHRX SECTION ─────────────────────────────────────────────────────────

function PortalsSection({ onOpenPortal }) {
  return (
    <section className="section" id="portals">
      <div className="container">
        <div className="section__header section__header--center">
          <span className="section__eyebrow section__eyebrow--violet">IFA Mathematica: SIDECHRX (8 Meta-Principles of Ifa)</span>
          <h2 className="section__title">
            <span className="accent--amber">SIDECHRX</span> — The 8 Principles <span className="accent--violet">Within</span> the Odu Ifa
          </h2>
          <p className="section__subtitle">
            SIDECHRX are the 8 universal meta-principles of Ifa — <strong>discovered within the 16 Oju Odu Ifa</strong> through mathematical, scientific, and philosophical study. They are not English translations of the Odu names. They are the living principles that the Odu embody, govern, and express across all fields of knowledge.
          </p>
        </div>

        <div className="sidechrx-intro">
          <div className="sidechrx-intro__bar">
            {SIDECHRX.map((p, i) => (
              <div key={p.letter} className="sidechrx-intro__item" style={{ '--c': p.color }}>
                <span className="sidechrx-intro__letter">{p.letter}</span>
                <span className="sidechrx-intro__name">{p.name}</span>
              </div>
            ))}
          </div>
          <p className="sidechrx-intro__note">
            The 16 Oju Odu (Ogbé → Òfún) each embodies a set of primary Principles and Anti-Principles — together forming the complete 16-Law SIDECHRX System. Open any portal to explore that Principle Set across all fields of knowledge.
          </p>
        </div>

        <div className="portals-grid">
          {SIDECHRX.map(p => (
            <div
              key={p.letter}
              className="portal-card"
              style={{ '--c': p.color }}
              onClick={() => onOpenPortal(p.letter)}
              role="button"
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && onOpenPortal(p.letter)}
            >
              <div className="portal-card__letter">{p.letter}</div>
              <div className="portal-card__name">{p.name}</div>
              <div className="portal-card__subtitle">{p.subtitle}</div>
              <p className="portal-card__desc">{p.tagline}</p>
              <div className="portal-card__btn">
                <span>Open Portal</span>
                <span className="portal-card__btn-arrow">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── APPLICATIONS SECTION ──────────────────────────────────────────────────────

// ─── IFALIBRIUM PRINCIPLE SECTION (main homepage) ──────────────────────────────

const IFP_DOMAINS = [
  { sym: '⚖', name: 'Physical',           color: '#f0920c', desc: 'Thermodynamic equilibrium, mechanical balance, static & dynamic stability, gravitational balance; conservation of energy, momentum, mass, and charge (Noether\'s theorem)' },
  { sym: '⚗', name: 'Chemical',            color: '#14b8d4', desc: 'Chemical equilibrium, reaction balance, phase equilibrium, acid-base balance, Le Chatelier systems; conservation of mass (Lavoisier\'s Law) and conservation of charge in reactions' },
  { sym: '◉', name: 'Biological',          color: '#4caf50', desc: 'Homeostasis, ecological balance, evolutionary stability, population dynamics; conservation of genetic information, energy conservation in metabolic pathways' },
  { sym: '∑', name: 'Mathematical',        color: '#6366f1', desc: 'Fixed points, stable states, Nash equilibrium, symmetry groups, attractors; conservation laws in PDEs, topological invariants, symmetry-conservation duality' },
  { sym: '⇌', name: 'Social / Economic',   color: '#e040fb', desc: 'Market equilibrium, game theory equilibrium, social balance, organisational stability, policy equilibrium; conservation of value and resource conservation principles' },
  { sym: '✦', name: 'Ifa / Consciousness', color: '#00c87c', desc: 'Self-Ifalibrium (Meji · 16), Major Dual-Ifalibrium (Ẹnìkejì · 16), Ifalibrium Dual (30), Ifanibrium (240); conservation of Ifa energy across all 256 Odu' },
  { sym: '◈', name: 'Arts, Humanities & Others', color: '#ec4899', desc: 'Aesthetic balance & symmetry in visual art, music, and architecture; narrative equilibrium in literature; linguistic symmetry; philosophical equilibrium (Yin-Yang, Harmonia, Ubuntu); cultural and spiritual balance across traditions' },
];

function IfalibriPrincipleSection() {
  return (
    <section className="section ifp-section" id="ifalibrium-principle">
      <div className="container">

        {/* ── Header ─────────────────────────────────────────────────── */}
        <div className="section__header section__header--center">
          <span className="section__eyebrow section__eyebrow--jade">Ifalibrium · Ifanibrium · Consciousness Equilibrium</span>
          <h2 className="section__title">
            Ifalibrium &amp; Ifanibrium —{' '}
            <span className="accent--jade">The Ifa Equilibrium Principle</span>
          </h2>
          <p className="section__subtitle">
            <strong>Ifalibrium</strong> is the Consciousness of all kinds of equilibrium,
            symmetry, stability, balance, and related principles or concepts in all modern fields —
            the meta-Principle governing every state of balance across the 256 Odu Ifa and all
            fields of knowledge.
          </p>
        </div>

        {/* ── Definition blocks ──────────────────────────────────────── */}
        <div className="ifp-blocks">

          {/* Ifalibrium block */}
          <div className="ifp-block ifp-block--ifalibrium">
            <div className="ifp-block__eyebrow">⊙ Ifalibrium · Consciousness Equilibrium</div>
            <h3 className="ifp-block__title">Ifalibrium</h3>
            <p className="ifp-block__body">
              <strong>Ifalibrium</strong> is the Consciousness of all kinds of conservation,
              equilibrium, stability, balance, symmetry, and related principles or concepts.
              It is the meta-Principle governing the condition where any Odu, system, or field
              has achieved its natural state of Ifa Balance or Energy Balance. Ifalibrium
              generalises equilibrium principles and conservation laws in modern fields,
              especially STEM — thermodynamic, mechanical, chemical, biological, social,
              economic, mathematical, and beyond — to all fields of knowledge through the
              Axiomatic Structure of the 256 Odu Ifa.
            </p>
            <p className="ifp-block__body" style={{ marginTop: 10 }}>
              The 16 Ifa Doubles (Meji) are <strong>Self-Ifalibrium</strong> — Perfect
              Self-Balance. The 8 Ẹnìkejì Pairs are <strong>Major Dual-Ifalibrium</strong> —
              Inverse Balance. The 15 Ifalibrium Pairs are the <strong>Ifalibrium Dual</strong> —
              sequential balance following the Ifa Formula (Odu, Dual Odu).
            </p>
            <div className="ifp-state-pills">
              <span className="ifp-pill ifp-pill--self">⊙ Self · 16</span>
              <span className="ifp-pill ifp-pill--major">⇔ Major · 16</span>
              <span className="ifp-pill ifp-pill--dual">→ Ifalibrium Dual · 30</span>
              <span className="ifp-pill ifp-pill--minor">∿ Minor · 194</span>
            </div>
          </div>

          {/* Ifanibrium block */}
          <div className="ifp-block ifp-block--ifanibrium">
            <div className="ifp-block__eyebrow">∿ Ifanibrium · Consciousness Non-Equilibrium</div>
            <h3 className="ifp-block__title">Ifanibrium</h3>
            <p className="ifp-block__body">
              <strong>Ifanibrium</strong> (Ifa Non-Equilibrium) is the Dual and Complement of
              Ifalibrium — the Consciousness of all kinds of non-equilibrium, assymetry, dynamic
              states, flux, change, and becoming. Where Ifalibrium is the Principle of Balance and
              Stability, Ifanibrium is the Principle of motion, transformation, and Energy exchange.
              All 240 Dual Odu (A, B where A ≠ B) exist in Ifanibrium states.
            </p>
            <p className="ifp-block__body" style={{ marginTop: 10 }}>
              Ifanibrium comprises three Modes:{' '}
              <strong style={{ color: '#e040fb' }}>Major Pairs</strong> in Inverse Non-Equilibrium
              (Ẹnìkejì Dynamics),{' '}
              <strong style={{ color: '#4caf50' }}>Ifalibrium Dual Pairs</strong> in sequential
              adjacency (the Ifa Formula in motion), and{' '}
              <strong style={{ color: '#14b8d4' }}>Minor</strong> pairs in general dynamic flow.
              Ifanibrium is the Engine of all Ifa Processes and Transformations across the 256 Odu.
            </p>
            <div className="ifp-formula">
              <span className="ifp-formula__label">Ifa Formula</span>
              <span className="ifp-formula__expr">Ifalibrium ⊕ Ifanibrium = 254 Amulu Equilibriums (Amulubriums/Amulubria)</span>
            </div>
          </div>

        </div>

        {/* ── Domains of Ifalibrium ───────────────────────────────────── */}
        <div className="ifp-domains-hd">
          <span className="ifp-domains-hd__label">Domains of Ifalibrium</span>
          <span className="ifp-domains-hd__sub">Ifalibrium as Consciousness Equilibrium spans every field of knowledge</span>
        </div>
        <div className="ifp-domains">
          {IFP_DOMAINS.map((d, i) => (
            <div key={i} className="ifp-domain" style={{ '--dc': d.color }}>
              <div className="ifp-domain__sym">{d.sym}</div>
              <div className="ifp-domain__name">{d.name}</div>
              <p className="ifp-domain__desc">{d.desc}</p>
            </div>
          ))}
        </div>

        {/* ── IFA Matrix Playground banner ───────────────────────────── */}
        <div className="ifp-pg-banner">
          <div>
            <div className="ifp-pg-banner__eyebrow">IFA Matrix Playground</div>
            <div className="ifp-pg-banner__title">Explore Ifalibrium — The Complete Form of Ifa's Periodic Table</div>
            <p className="ifp-pg-banner__desc">
              The IFA Matrix Playground shows all 256 Odu Ifa classified by Ifalibrium State
              in a full-page interactive Chart. Filter by Self-Ifalibrium, Major Dual-Ifalibrium,
              Ifalibrium Dual, or Minor States to explore Ifa equilibrium across all 16 Àpólà Groups
              and 16 IfaComp (IfaComposition) Periods.
            </p>
          </div>
          <a
            href="./playground/"
            target="_blank"
            rel="noopener noreferrer"
            className="ifp-pg-banner__btn"
          >
            Open Playground ↗
          </a>
        </div>

      </div>
    </section>
  );
}

function ApplicationsSection({ onIfaSquare }) {
  return (
    <section className="section section--dark" id="applications">
      <div className="container">
        <div className="section__header section__header--center">
          <span className="section__eyebrow section__eyebrow--jade">Platform Applications</span>
          <h2 className="section__title">
            Ifa &amp; Orisa <span className="accent--jade">Modelling, Simulation, Design</span>
          </h2>
          <p className="section__subtitle">
            The IFA Matrix Platform provides tools and frameworks for all six primary application modes — from first-principles modelling to full Ifa Technology development across every field of knowledge.
          </p>
        </div>

        <div className="apps-grid">
          {APPLICATIONS.map((a, i) => (
            <div key={i} className="app-card" style={{ '--c': a.color }}>
              <div className="app-card__icon">{a.sym}</div>
              <h3 className="app-card__title">{a.title}</h3>
              <p className="app-card__desc">{a.desc}</p>
            </div>
          ))}
        </div>

        {/* IfaGebra connection */}
        <div className="app-info-banner" style={{
          marginTop: 48,
          background: 'var(--bg-4)',
          border: '1px solid var(--border-2)',
          borderTop: '3px solid var(--amber)',
          borderRadius: 'var(--radius)',
          padding: '32px 36px',
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: 24,
          alignItems: 'center',
        }}>
          <div>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--amber)', marginBottom: 8 }}>
              Powered by IfaGebra — ToEGebra
            </div>
            <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-1)', marginBottom: 8 }}>
              The Algebra of Everything (AlgebroE)
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-2)', lineHeight: 1.7, maxWidth: 560 }}>
              All IFA Matrix Platform operations are grounded in <strong>IfaGebra</strong> — Consciousness Algebra, the algebraic meta-system unifying all mathematical structures through Ifa Field Theory. Every Ifa Simulation, Ifa Model, and Ifa Technology on this platform is an IfaGebra application.
            </p>
          </div>
          <div className="app-info-banner__actions" style={{ display: 'flex', flexDirection: 'column', gap: 10, flexShrink: 0 }}>
            <a href="https://toe.cenproject.org/ifagebra-overview/" target="_blank" rel="noopener noreferrer" className="btn btn--primary">
              Explore IfaGebra
            </a>
            <a href="https://toe.cenproject.org/ifa-matrix/" target="_blank" rel="noopener noreferrer" className="btn btn--ghost">
              IFA Matrix (TOE)
            </a>
          </div>
        </div>

        {/* Ifa Square banner */}
        <div className="app-info-banner" style={{
          marginTop: 32,
          background: 'var(--bg-4)',
          border: '1px solid var(--border-2)',
          borderTop: '3px solid #f5c518',
          borderRadius: 'var(--radius)',
          padding: '32px 36px',
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: 24,
          alignItems: 'center',
        }}>
          <div>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#f5c518', marginBottom: 8 }}>
              Ifa Square · TOE Square · SquaroE
            </div>
            <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-1)', marginBottom: 8 }}>
              The Ifa Squaring Platform — Square for Everything
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-2)', lineHeight: 1.7, maxWidth: 560 }}>
              <strong>Ifa Square</strong> (also: IfaSquare, Ifa-Square, Consciousness Square, Energy-Based Square, SquaroE)
              is the doubly-infinite dimensional squaring platform of the IFA Internet — where Vedic squares, magic squares,
              Sudoku, Latin squares, and all square-law systems exist as conscious Odu entities.
            </p>
          </div>
          <div className="app-info-banner__actions" style={{ flexShrink: 0 }}>
            <button
              className="btn btn--primary"
              style={{ '--c': '#f5c518', background: 'rgba(245,197,24,0.1)', border: '1px solid rgba(245,197,24,0.4)', color: '#f5c518' }}
              onClick={onIfaSquare}
            >
              Open Ifa Square ↗
            </button>
          </div>
        </div>

        {/* Ifa Determinant banner */}
        <div className="app-info-banner" style={{
          marginTop: 20,
          background: 'var(--bg-4)',
          border: '1px solid var(--border-2)',
          borderTop: '3px solid #f0920c',
          borderRadius: 12,
          padding: '28px 32px',
          display: 'flex',
          gap: 24,
          alignItems: 'center',
        }}>
          <div>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#f0920c', marginBottom: 8 }}>
              Ifa Determinant · TOE Determinant · DetoE
            </div>
            <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-1)', marginBottom: 8 }}>
              The Ibo Gbigba Platform — Determinant for Everything
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-2)', lineHeight: 1.7, maxWidth: 560 }}>
              <strong>IfaDeterminant</strong> (also: IfaDet, ToE-Det, Consciousness Determinant, Energy-Based Determinant, DetoE)
              is the ancient African origin of determinant theory — where Ibo Gbigba, the Scalar Binary Resolution Operator
              of the Ifa tradition, resolves 256-State Binary Matrices of Ifa into a single scalar Truth: Ire or Ibi.
            </p>
          </div>
          <div className="app-info-banner__actions" style={{ flexShrink: 0 }}>
            <a
              className="btn btn--primary"
              style={{ '--c': '#f0920c', background: 'rgba(240,146,12,0.1)', border: '1px solid rgba(240,146,12,0.4)', color: '#f0920c', display: 'inline-block', textDecoration: 'none', padding: '10px 22px', borderRadius: 8, fontWeight: 700, fontSize: '0.9rem' }}
              href="./ifa-determinant/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open Ifa Determinant ↗
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}

// ─── SIDECHRX IFAGRAM ──────────────────────────────────────────────────────────

function SidechrxIfagram({ principle: p }) {
  // 8 SIDECHRX nodes at compass points (clockwise from N)
  const nodes = [
    { letter:'S', name:'Symmetry',     color:'#f0920c', angle: -90 },
    { letter:'I', name:'Invariance',   color:'#6366f1', angle: -45 },
    { letter:'D', name:'Duality',      color:'#14b8d4', angle:   0 },
    { letter:'C', name:'Composition',  color:'#ef4444', angle:  45 },
    { letter:'E', name:'Emergence',    color:'#00c87c', angle:  90 },
    { letter:'R', name:'Reductionism', color:'#3b9eff', angle: 135 },
    { letter:'H', name:'Holism',       color:'#8b5cf6', angle: 180 },
    { letter:'X', name:'Simulation',   color:'#ec4899', angle:-135 },
  ];

  const cx = 320, cy = 225;
  const ellRx = 82, ellRy = 48;
  const spokeR = 140; // spoke line endpoint (arrowhead tip)

  const toR = d => d * Math.PI / 180;

  // Ifa Circle clockwise arc at E rim (±11°)
  const arcDeg = 11;
  const ax1 = +(cx + ellRx * Math.cos(toR(-arcDeg))).toFixed(1);
  const ay1 = +(cy + ellRy * Math.sin(toR(-arcDeg))).toFixed(1);
  const ax2 = +(cx + ellRx * Math.cos(toR( arcDeg))).toFixed(1);
  const ay2 = +(cy + ellRy * Math.sin(toR( arcDeg))).toFixed(1);

  const cId = `igc-${p.letter}`;
  const aId = `iga-${p.letter}`;

  return (
    <svg viewBox="0 0 640 450"
      style={{ width:'100%', maxWidth:580, display:'block', margin:'0 auto', fontFamily:'inherit' }}>
      <defs>
        {/* Ifa Circle arc arrowhead */}
        <marker id={cId} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <polygon points="0 1, 0 5, 6 3" fill={p.color}/>
        </marker>
        {/* Spoke arrowhead */}
        <marker id={aId} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <polygon points="0 1, 0 5, 6 3" fill="#475569"/>
        </marker>
      </defs>

      {nodes.map(node => {
        const θ = toR(node.angle);
        const cosθ = Math.cos(θ), sinθ = Math.sin(θ);
        // Ellipse edge (spoke start)
        const ex = +(cx + ellRx * cosθ).toFixed(1);
        const ey = +(cy + ellRy * sinθ).toFixed(1);
        // Spoke tip
        const sx = +(cx + spokeR * cosθ).toFixed(1);
        const sy = +(cy + spokeR * sinθ).toFixed(1);
        // Text position (slightly beyond spoke tip)
        const tR = (node.angle % 90 !== 0) ? 162 : 156;
        const tx = +(cx + tR * cosθ).toFixed(1);
        const ty = +(cy + tR * sinθ).toFixed(1);
        // Text alignment by quadrant
        const ta = cosθ > 0.35 ? 'start' : cosθ < -0.35 ? 'end' : 'middle';
        const db = sinθ > 0.5 ? 'hanging' : sinθ < -0.5 ? 'auto' : 'middle';
        const active = node.letter === p.letter;

        return (
          <g key={node.letter}>
            <line x1={ex} y1={ey} x2={sx} y2={sy}
              stroke={active ? node.color : '#1e293b'}
              strokeWidth={active ? 2 : 1.5}
              markerEnd={`url(#${aId})`}/>
            <text x={tx} y={ty}
              textAnchor={ta} dominantBaseline={db}
              fill={active ? node.color : '#475569'}
              fontSize={active ? 13 : 12}
              fontWeight={active ? 700 : 500}>
              {node.name}
            </text>
          </g>
        );
      })}

      {/* Center Ifa Circle */}
      <ellipse cx={cx} cy={cy} rx={ellRx} ry={ellRy}
        fill="#0d1117" stroke={p.color} strokeWidth="2.5"/>
      {/* Clockwise arc arrowhead at E rim */}
      <path d={`M ${ax1},${ay1} A ${ellRx},${ellRy} 0 0,1 ${ax2},${ay2}`}
        fill="none" stroke={p.color} strokeWidth="2.5"
        markerEnd={`url(#${cId})`}/>
      {/* Center labels */}
      <text x={cx} y={cy - 9} textAnchor="middle"
        fill={p.color} fontSize="14" fontWeight="700" letterSpacing="0.04em">
        {p.name}
      </text>
      <text x={cx} y={cy + 14} textAnchor="middle"
        fill={p.color} fontSize="22" fontWeight="900">
        {p.letter}
      </text>
    </svg>
  );
}

// ─── IFA FOUR SYMMETRIES (Symmetry portal only) ─────────────────────────────

function IfaFourSymmetries({ context = 'symmetry' }) {
  const [flipped, setFlipped] = React.useState({});
  const [flipAll, setFlipAll] = React.useState(false);
  const [active, setActive]   = React.useState(null);

  const inv = context === 'invariance';

  // ── Corrected mark patterns — all four are palindromes ──────────────────────
  const FOUR = [
    {
      key: 'ogbe', odu: 'Ògbè',
      name: inv ? 'Ogbe Invariance' : 'Ogbe Symmetry',
      marks: [1,1,1,1], color: '#f0920c',
      symLabel: inv ? 'Total Invariance' : 'Total Symmetry',
      symKind: 'Uniform',
      desc: 'All four positions are single marks — uniform in every row. Invariant under every transformation: flip upside down, mirror left-right, rotate 180°. The identity element of IfaGebra.',
      math: 'σₕ(Ògbè) = Ògbè   ·   [I · I · I · I] ↕ = [I · I · I · I]',
      role: 'Identity Element',
    },
    {
      key: 'oyeku', odu: 'Òyèkú',
      name: inv ? 'Oyeku Invariance' : 'Oyeku Symmetry',
      marks: [2,2,2,2], color: '#6366f1',
      symLabel: inv ? 'Total Invariance' : 'Total Symmetry',
      symKind: 'Uniform',
      desc: 'All four positions are double marks — uniform in every row. Invariant under every transformation. The Complement Identity and Superpartner of Ògbè.',
      math: 'σₕ(Òyèkú) = Òyèkú   ·   [II · II · II · II] ↕ = [II · II · II · II]',
      role: 'Complement Identity',
    },
    {
      key: 'iwori', odu: 'Ìwòrì',
      name: inv ? 'Iwori Invariance' : 'Iwori Symmetry',
      marks: [2,1,1,2], color: '#14b8d4',
      symLabel: inv ? 'Palindrome Invariance' : 'Palindrome Symmetry',
      symKind: 'Palindrome',
      desc: inv
        ? 'Double–Single–Single–Double: an Ifa Palindrome. Read it top-to-bottom or bottom-to-top — the IFALang Code is invariant. Flip it upside down and it remains invariant. Duality encoded in Ifa form.'
        : 'Double–Single–Single–Double: a palindrome. Read it top-to-bottom or bottom-to-top — the pattern is identical. Flip it upside down and it is unchanged. Duality encoded in Ifa form.',
      math: 'σₕ(Ìwòrì) = Ìwòrì   ·   [II · I · I · II] ↕ = [II · I · I · II]',
      role: 'Dual Generator',
    },
    {
      key: 'odi', odu: 'Òdí',
      name: inv ? 'Odi Invariance' : 'Odi Symmetry',
      marks: [1,2,2,1], color: '#00c87c',
      symLabel: inv ? 'Palindrome Invariance' : 'Palindrome Symmetry',
      symKind: 'Palindrome',
      desc: inv
        ? 'Single–Double–Double–Single: an Ifa Palindrome. Read it top-to-bottom or bottom-to-top — the IFALang Code is invariant. Flip it upside down and it remains invariant. Emergence encoded in Ifa form.'
        : 'Single–Double–Double–Single: a palindrome. Read it top-to-bottom or bottom-to-top — the pattern is identical. Flip it upside down and it is unchanged. Emergence encoded in Ifa form.',
      math: 'σₕ(Òdí) = Òdí   ·   [I · II · II · I] ↕ = [I · II · II · I]',
      role: 'Emergence Generator',
    },
  ];

  const LABELS = { ogbe:'Og', oyeku:'Oy', iwori:'Iw', odi:'Od' };
  const amulu = {
    ogbe:  { ogbe:'ogbe',  oyeku:'oyeku', iwori:'iwori', odi:'odi'   },
    oyeku: { ogbe:'oyeku', oyeku:'ogbe',  iwori:'odi',   odi:'iwori' },
    iwori: { ogbe:'iwori', oyeku:'odi',   iwori:'ogbe',  odi:'oyeku' },
    odi:   { ogbe:'odi',   oyeku:'iwori', iwori:'oyeku', odi:'ogbe'  },
  };
  const colorMap = {};
  FOUR.forEach(f => { colorMap[f.key] = f.color; });

  const isFlipped = k => flipAll || !!flipped[k];
  const toggleFlip = (e, k) => {
    e.stopPropagation();
    if (flipAll) { setFlipAll(false); setFlipped({ [k]: false }); return; }
    setFlipped(prev => ({...prev, [k]: !prev[k]}));
  };
  const handleFlipAll = () => {
    setFlipAll(prev => !prev);
    setFlipped({});
  };

  function OduMarkSVG({ marks, color }) {
    const cx = 40;
    const ys = [28, 78, 130, 180];
    const mH = 38, mW = 12, dW = 10, dGap = 13;
    // RTL: marks[0] is the principal/first mark — render it at the bottom (position ys[3])
    const rtlMarks = [...marks].reverse();
    return (
      <svg viewBox="0 0 80 212" width="64" height="170" style={{display:'block', margin:'0 auto'}}>
        {/* Permanent central symmetry axis */}
        <line x1="6" y1="104" x2="74" y2="104" stroke={color} strokeWidth="0.8" strokeDasharray="4,3" opacity="0.4"/>
        <text x="3" y="101" fill={color} fontSize="6" fontFamily="monospace" opacity="0.55">σₕ</text>
        {/* Mark rows — RTL: rendered bottom-to-top (marks[0] at bottom) */}
        {rtlMarks.map((m, i) => {
          const y = ys[i];
          if (m === 1) {
            return <rect key={i} x={cx-mW/2} y={y-mH/2} width={mW} height={mH} rx="5" fill={color}/>;
          }
          return (
            <g key={i}>
              <rect x={cx-dGap-dW/2} y={y-mH/2+2} width={dW} height={mH-4} rx="4" fill={color}/>
              <rect x={cx+dGap-dW/2} y={y-mH/2+2} width={dW} height={mH-4} rx="4" fill={color}/>
            </g>
          );
        })}
      </svg>
    );
  }

  // Palindrome proof labels
  const markLabel = m => m === 1 ? 'I' : 'II';

  return (
    <div className="ifa-four">
      <div className="container">

        <div className="section__header section__header--center">
          <span className="section__eyebrow section__eyebrow--amber">
            {inv ? 'IfaLang · Ifa Invariance in Code' : 'IfaLang · Ifa Symmetry in Code'}
          </span>
          <h2 className="section__title" style={{fontSize:'1.35rem'}}>
            {inv ? 'The Four Ifa Invariants — Ojú Odù Ìfá Mẹ́rin' : 'The Ifa Four — Ojú Odù Ìfá Mẹ́rin'}
          </h2>
          {inv ? (
            <p style={{color:'var(--text-3)',fontSize:'0.83rem',maxWidth:660,margin:'0 auto',lineHeight:1.8}}>
              <strong style={{color:'var(--amber)'}}>Ifa Invariance</strong> is an interdisciplinary subject in the IFA Body of Knowledge (IFABOK) that cuts across all fields and disciplines, especially Physics and Mathematics.
              It involves studying invariance in IfaLang — specifically the <strong style={{color:'var(--amber)'}}>Four Invariant Ifa Codes</strong> known as the <em>Ifa Four</em>: Ogbe, Oyeku, Iwori, and Odi.
              Exactly four of the 256 Odu Ifa have <strong style={{color:'var(--amber)'}}>Ifabits that are invariant when turned upside down</strong>: their IFALang Codes are Ifa Palindromes whose mark sequence reads identically top-to-bottom and bottom-to-top.
              Press <strong style={{color:'var(--amber)'}}>Flip ↕</strong> on any card — or flip all at once — to see the Invariance demonstrated.
            </p>
          ) : (
            <p style={{color:'var(--text-3)',fontSize:'0.83rem',maxWidth:640,margin:'0 auto',lineHeight:1.8}}>
              Exactly four of the 256 Odu Ifa have <strong style={{color:'var(--amber)'}}>mark patterns (Ifabits) that are unchanged when turned upside down</strong> — the <em>Ifa Four</em>.
              Their IFALang Codes are all <strong style={{color:'var(--amber)'}}>palindromes</strong> known as <strong style={{color:'var(--amber)'}}>Ifa Palindromes</strong> or <strong style={{color:'var(--amber)'}}>ToE Palindromes</strong>: reading the marks top-to-bottom gives the same sequence as bottom-to-top.
              Press <strong style={{color:'var(--amber)'}}>Flip ↕</strong> on any card — or flip all at once — to see the Symmetry demonstrated.
            </p>
          )}
        </div>

        {/* Flip All demo */}
        <div className="ifa-four__demo-bar">
          <button className={'ifa-four__flip-all' + (flipAll ? ' ifa-four__flip-all--on' : '')} onClick={handleFlipAll}>
            {flipAll ? '↑ Restore All' : '↕ Flip All Upside Down'}
          </button>
          <span className={'ifa-four__demo-verdict' + (flipAll ? ' ifa-four__demo-verdict--show' : '')}>
            {inv ? '✓ All four Odu are invariant — the Ifa Four Invariance' : '✓ All four Odu are unchanged — the Ifa Four Symmetry'}
          </span>
        </div>

        {/* Cards */}
        <div className="ifa-four__grid">
          {FOUR.map(f => {
            const fState = isFlipped(f.key);
            const on = active === f.key;
            return (
              <div
                key={f.key}
                className={'ifa-four__card' + (on ? ' ifa-four__card--on' : '') + (fState ? ' ifa-four__card--flipped' : '')}
                style={{'--fc': f.color}}
                onClick={() => setActive(on ? null : f.key)}
                role="button"
                tabIndex={0}
              >
                {/* Animated mark area */}
                <div className="ifa-four__marks-wrap">
                  <div className="ifa-four__marks-anim" style={{transform: fState ? 'scaleY(-1)' : 'scaleY(1)'}}>
                    <OduMarkSVG marks={f.marks} color={f.color} />
                  </div>
                  <div className={'ifa-four__unchanged' + (fState ? ' ifa-four__unchanged--show' : '')}>
                    {inv ? '✓ Invariant' : '✓ Unchanged'}
                  </div>
                </div>

                {/* Flip button */}
                <button
                  className={'ifa-four__flip-btn' + (fState ? ' ifa-four__flip-btn--on' : '')}
                  onClick={e => toggleFlip(e, f.key)}
                  title="Flip this Odu upside down"
                >
                  {fState ? '↑ Restore' : '↕ Flip'}
                </button>

                {/* Card body info */}
                <div className="ifa-four__card-body">
                  <div className="ifa-four__odu">{f.odu}</div>
                  <div className="ifa-four__name">{f.name}</div>
                  <div className="ifa-four__sym-label">{f.symLabel}</div>
                  <div className="ifa-four__axes">
                    <span className="ifa-four__axis-tag">σₕ</span>
                    <span className={'ifa-four__kind-tag ifa-four__kind-tag--' + f.symKind.toLowerCase()}>{f.symKind}</span>
                    <span className="ifa-four__role-tag">{f.role}</span>
                  </div>
                </div>

                {/* Expanded detail */}
                {on && (
                  <div className="ifa-four__expand">
                    <p className="ifa-four__desc">{f.desc}</p>
                    <div className="ifa-four__formula">{f.math}</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Palindrome proof strip */}
        <div className="ifa-four__proof">
          <div className="ifa-four__proof-title">
            {inv
              ? 'Proof: Each IFALang Code is an Ifa Palindrome — invariant when reversed'
              : 'Proof: Each pattern is a palindrome — unchanged when reversed'}
          </div>
          <div className="ifa-four__proof-rows">
            {FOUR.map(f => {
              const fwd = f.marks.map(markLabel).join(' · ');
              const rev = [...f.marks].reverse().map(markLabel).join(' · ');
              return (
                <div key={f.key} className="ifa-four__proof-row" style={{'--fc': f.color}}>
                  <span className="ifa-four__proof-odu">{f.odu}</span>
                  <span className="ifa-four__proof-seq">{fwd}</span>
                  <span className="ifa-four__proof-arrow">↕</span>
                  <span className="ifa-four__proof-seq">{rev}</span>
                  <span className="ifa-four__proof-check">{inv ? '= invariant ✓' : '= same ✓'}</span>
                  <span className="ifa-four__proof-kind">{f.symKind}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Klein Four-Group Amulu table */}
        <div className="ifa-four__table-wrap">
          <div className="ifa-four__table-title">Amulu Group Table (⊕) — Klein Four-Group of the Ifa Four</div>
          <div className="ifa-four__table">
            <div className="ifa-four__tc ifa-four__tc--corner">⊕</div>
            {FOUR.map(f => (
              <div key={f.key} className="ifa-four__tc ifa-four__tc--head" style={{color: f.color}}>{LABELS[f.key]}</div>
            ))}
            {FOUR.map(row => (
              <React.Fragment key={row.key}>
                <div className="ifa-four__tc ifa-four__tc--head" style={{color: row.color}}>{LABELS[row.key]}</div>
                {FOUR.map(col => {
                  const res = amulu[row.key][col.key];
                  const diag = row.key === col.key;
                  return (
                    <div key={col.key} className={'ifa-four__tc' + (diag ? ' ifa-four__tc--diag' : '')} style={{color: colorMap[res]}}>
                      {LABELS[res]}
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
          <p className="ifa-four__table-note">
            Og = Ògbè · Oy = Òyèkú · Iw = Ìwòrì · Od = Òdí · Every element is self-inverse: X ⊕ X = Ògbè
          </p>
        </div>

        {/* Ifa Four-Convention and Formalism */}
        <div className="ifa-four__formalism">
          <div className="ifa-four__formalism-header">
            <span className="ifa-four__formalism-icon">⬡</span>
            <div>
              <div className="ifa-four__formalism-title">Ifa Four-Convention and Formalism: ToE Four</div>
              <div className="ifa-four__formalism-subtitle">The Universal Basis of Four in Knowledge and Nature</div>
            </div>
          </div>
          <p className="ifa-four__formalism-body">
            The <strong>Ifa Four</strong> provides the Foundation and General Form of <strong>Four-Convention / Four-Formalism</strong> across all fields of knowledge.
            Every occurrence of four as a structuring principle — in modern science, mathematics, and indigenous knowledge systems — is an instance of the Ifa Four.
          </p>
          <div className="ifa-four__formalism-grid">
            <div className="ifa-four__formalism-card">
              <div className="ifa-four__formalism-card-icon">⚛</div>
              <div className="ifa-four__formalism-card-title">STEM — Physics &amp; Mathematics</div>
              <div className="ifa-four__formalism-card-body">
                The Ifa Four is the basis of Four-Formalism in modern STEM: the four fundamental forces, the four spacetime dimensions, the four quantum numbers, the four Maxwell equations, the four DNA bases, the four arithmetic operations, and the Klein Four-Group (Z₂ × Z₂) — all reflect the Ifa Four structure encoded in the Ojú Odù Ìfá Mẹ́rin.
              </div>
            </div>
            <div className="ifa-four__formalism-card">
              <div className="ifa-four__formalism-card-icon">📅</div>
              <div className="ifa-four__formalism-card-title">Kojoda — Yoruba Native Calendar</div>
              <div className="ifa-four__formalism-card-body">
                Kojoda, the Yoruba Native Calendar System, is structured on the Ifa Four-Convention: the four-day Yoruba week (Ọ̀sẹ̀ Ọbàtálá, Ọ̀sẹ̀ Ọrúnmìlà, Ọ̀sẹ̀ Ògún, Ọ̀sẹ̀ Jàkúta) governed by the four primordial Odu. Time, seasons, and sacred cycles are computed through the Ifa Four as the calendrical basis of Yoruba civilisation.
              </div>
            </div>
            <div className="ifa-four__formalism-card">
              <div className="ifa-four__formalism-card-icon">🎓</div>
              <div className="ifa-four__formalism-card-title">Ifa Model of Education</div>
              <div className="ifa-four__formalism-card-body">
                Custodians of Ifa — Babalawo and Iyanifa — use the Ifa Four as the structural basis of Ifa education: four stages of initiation, four levels of mastery, and four domains of Ifa knowledge transmission form the curriculum architecture used across generations of Ifa custodianship.
              </div>
            </div>
            <div className="ifa-four__formalism-card">
              <div className="ifa-four__formalism-card-icon">∞</div>
              <div className="ifa-four__formalism-card-title">IFABOK — All Fields</div>
              <div className="ifa-four__formalism-card-body">
                Across all fields in the IFA Body of Knowledge (IFABOK) — IfaGebra, Ebology, Ifa Field Theory, IFABit, and the IFA Matrix Platform itself — the Ifa Four-Convention governs structural organisation, classification hierarchies, operational symmetry, and knowledge encoding through the ToE Four formalism.
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// ─── DUALITY PORTAL EXTENSION ─────────────────────────────────────────────────

// ─── IFA PLAYGROUND — MAJOR DUALS ─────────────────────────────────────────────

function MajorIFAPlayground() {
  const [flipped, setFlipped] = React.useState({});
  const [flipCount, setFlipCount] = React.useState(0);

  const INVERSE_MAP = React.useMemo(() => {
    const m = {};
    INVERSE_PAIRS.forEach(pair => {
      m[pair.a.n] = pair.b;
      m[pair.b.n] = pair.a;
    });
    return m;
  }, []);

  const handleFlip = (n) => {
    setFlipped(prev => ({ ...prev, [n]: !prev[n] }));
    setFlipCount(c => c + 1);
  };

  const resetAll = () => { setFlipped({}); };

  const activeCount = Object.values(flipped).filter(Boolean).length;

  return (
    <div className="ipg-wrap">
      <div className="ipg-topbar">
        <div className="ipg-counters">
          <div className="ipg-counter">
            <span className="ipg-counter__val">{flipCount}</span>
            <span className="ipg-counter__label">Total Inversions</span>
          </div>
          <div className="ipg-counter">
            <span className="ipg-counter__val">{activeCount}</span>
            <span className="ipg-counter__label">Inverted Now</span>
          </div>
          <div className="ipg-counter">
            <span className="ipg-counter__val">{16 - activeCount}</span>
            <span className="ipg-counter__label">In Àyé</span>
          </div>
        </div>
        {flipCount > 0 && (
          <button className="ipg-reset-btn" onClick={resetAll}>↺ Reset All</button>
        )}
      </div>
      <p className="ipg-hint">
        <span className="ipg-hint__icon">◈</span>
        Tap any Odu to invert it — sending it to its Superpartner in Ọ̀run
      </p>
      <div className="ipg-grid">
        {DOUBLES_16.map((odu) => {
          const inv = INVERSE_MAP[odu.n];
          const isFlipped = !!flipped[odu.n];
          return (
            <div
              key={odu.n}
              className={`ipg-card${isFlipped ? ' ipg-card--flipped' : ''}`}
              style={{ '--fc': odu.color, '--bc': inv.color }}
              onClick={() => handleFlip(odu.n)}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleFlip(odu.n)}
              role="button"
              tabIndex={0}
              aria-label={`${odu.name} — click to invert to ${inv.name}`}
            >
              <div className="ipg-card__inner">
                {/* Front */}
                <div className="ipg-card__face ipg-card__face--front">
                  <div className="ipg-card__realm">Àyé · World</div>
                  <div className="ipg-card__num" style={{ color: odu.color }}>{odu.n}</div>
                  <OduMarks code={odu.code} color={odu.color} size="sm" />
                  <div className="ipg-card__name">{odu.name}</div>
                  <div className="ipg-card__yoruba">{odu.yoruba}</div>
                  <div className="ipg-card__bits">
                    {odu.code.split('').map((b, j) => (
                      <span key={j} className={`ipg-bit ipg-bit--${b === '1' ? 'one' : 'zero'}`}>{b}</span>
                    ))}
                  </div>
                  <div className="ipg-card__cta">Invert ⇔</div>
                  <div className="ipg-card__shine" />
                </div>
                {/* Back */}
                <div className="ipg-card__face ipg-card__face--back">
                  <div className="ipg-card__realm ipg-card__realm--back">Ọ̀run · Spirit</div>
                  <div className="ipg-card__badge-inv">Ifa Inverse</div>
                  <div className="ipg-card__num" style={{ color: inv.color }}>{inv.n}</div>
                  <OduMarks code={inv.code} color={inv.color} size="sm" />
                  <div className="ipg-card__name">{inv.name}</div>
                  <div className="ipg-card__yoruba">{inv.yoruba}</div>
                  <div className="ipg-card__bits">
                    {inv.code.split('').map((b, j) => (
                      <span key={j} className={`ipg-bit ipg-bit--${b === '1' ? 'one' : 'zero'}`}>{b}</span>
                    ))}
                  </div>
                  <div className="ipg-card__cta ipg-card__cta--back">← Return</div>
                  <div className="ipg-card__shine ipg-card__shine--back" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── IFA PLAYGROUND — MINOR DUALS ─────────────────────────────────────────────

function MinorIFAPlayground() {
  const [selectedN, setSelectedN] = React.useState('01');
  const [flipped, setFlipped] = React.useState({});
  const [totalFlips, setTotalFlips] = React.useState(0);

  const selectedOdu = React.useMemo(() => DOUBLES_16.find(d => d.n === selectedN), [selectedN]);
  const partners    = React.useMemo(() => DOUBLES_16.filter(d => d.n !== selectedN), [selectedN]);

  const flipKey     = (n2) => selectedN + '-' + n2;
  const isFlipped   = (n2) => !!flipped[flipKey(n2)];
  const activeCount = partners.filter(p => isFlipped(p.n)).length;

  const handleFlip = (n2) => {
    const key = flipKey(n2);
    setFlipped(prev => ({ ...prev, [key]: !prev[key] }));
    setTotalFlips(c => c + 1);
  };

  const handleSelect = (n) => {
    setSelectedN(n);
    setFlipped({});
  };

  const resetAll = () => setFlipped({});

  return (
    <div className="amg-wrap">
      {/* ── Odu Selector ── */}
      <div className="amg-selector">
        <div className="amg-selector__label">Select Root Odu · Ojú Odù</div>
        <div className="amg-selector__grid">
          {DOUBLES_16.map(odu => (
            <button
              key={odu.n}
              className={`amg-sel-btn${selectedN === odu.n ? ' amg-sel-btn--active' : ''}`}
              style={{ '--oc': odu.color }}
              onClick={() => handleSelect(odu.n)}
              aria-pressed={selectedN === odu.n}
              aria-label={`Select ${odu.name}`}
            >
              <OduMarks code={odu.code} color={odu.color} size="2xs" />
              <span className="amg-sel-btn__num">{odu.n}</span>
              <span className="amg-sel-btn__name">{odu.yoruba}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Selected label ── */}
      <div className="amg-selected-label">
        <span className="amg-selected-label__text">Showing 15 Amulu Superpartners of</span>
        <span className="amg-selected-label__name" style={{ color: selectedOdu.color }}>
          {selectedOdu.name}
        </span>
      </div>

      {/* ── Stats bar ── */}
      <div className="amg-topbar">
        <div className="amg-counters">
          <div className="amg-counter">
            <span className="amg-counter__val">{totalFlips}</span>
            <span className="amg-counter__label">Total Inversions</span>
          </div>
          <div className="amg-counter">
            <span className="amg-counter__val">{activeCount}</span>
            <span className="amg-counter__label">Inverted Now</span>
          </div>
          <div className="amg-counter">
            <span className="amg-counter__val">{15 - activeCount}</span>
            <span className="amg-counter__label">In Àyé</span>
          </div>
        </div>
        {totalFlips > 0 && (
          <button className="amg-reset-btn" onClick={resetAll}>↺ Reset</button>
        )}
      </div>

      <p className="amg-hint">
        <span className="amg-hint__icon">◈</span>
        Tap any Amulu Odu to swap its two components — revealing its Minor Ifa Inverse
      </p>

      {/* ── Cards grid ── */}
      <div className="amg-grid">
        {partners.map(partner => {
          const isFlippedCard = isFlipped(partner.n);
          const f1 = selectedOdu;
          const f2 = partner;
          const b1 = partner;
          const b2 = selectedOdu;

          return (
            <div
              key={partner.n}
              className={`amg-card${isFlippedCard ? ' amg-card--flipped' : ''}`}
              style={{ '--c1': f1.color, '--c2': f2.color }}
              onClick={() => handleFlip(partner.n)}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleFlip(partner.n)}
              role="button" tabIndex={0}
              aria-label={`${f1.yoruba}-${f2.yoruba} — tap to invert`}
            >
              <div className="amg-card__inner">
                {/* Front — RTL: f2 (2nd) on left, f1 (1st) on right */}
                <div className="amg-card__face amg-card__face--front">
                  <div className="amg-card__realm">Àyé · World</div>
                  <div className="amg-card__cname">
                    <span style={{ color: f1.color }}>{f1.yoruba}</span>
                    <span className="amg-card__cname-sep">-</span>
                    <span style={{ color: f2.color }}>{f2.yoruba}</span>
                  </div>
                  <div className="amg-card__compound">
                    <div className="amg-card__half">
                      <OduMarks code={f2.code} color={f2.color} size="xs" single={true} />
                      <span className="amg-card__pname" style={{ color: f2.color }}>{f2.yoruba}</span>
                    </div>
                    <div className="amg-card__sep" />
                    <div className="amg-card__half">
                      <OduMarks code={f1.code} color={f1.color} size="xs" single={true} />
                      <span className="amg-card__pname" style={{ color: f1.color }}>{f1.yoruba}</span>
                    </div>
                  </div>
                  <div className="amg-card__code">
                    <span style={{ color: f1.color }}>{f1.code}</span>
                    <span className="amg-card__code-dot">·</span>
                    <span style={{ color: f2.color }}>{f2.code}</span>
                  </div>
                  <div className="amg-card__cta">Invert ⇔</div>
                  <div className="amg-card__shine" />
                </div>
                {/* Back — RTL: b2 (2nd/selectedOdu) on left, b1 (1st/partner) on right */}
                <div className="amg-card__face amg-card__face--back">
                  <div className="amg-card__realm amg-card__realm--back">Ọ̀run · Spirit</div>
                  <div className="amg-card__inv-badge">Ifa Inverse</div>
                  <div className="amg-card__cname amg-card__cname--back">
                    <span style={{ color: b1.color }}>{b1.yoruba}</span>
                    <span className="amg-card__cname-sep">-</span>
                    <span style={{ color: b2.color }}>{b2.yoruba}</span>
                  </div>
                  <div className="amg-card__compound">
                    <div className="amg-card__half">
                      <OduMarks code={b2.code} color={b2.color} size="xs" single={true} />
                      <span className="amg-card__pname" style={{ color: b2.color }}>{b2.yoruba}</span>
                    </div>
                    <div className="amg-card__sep" />
                    <div className="amg-card__half">
                      <OduMarks code={b1.code} color={b1.color} size="xs" single={true} />
                      <span className="amg-card__pname" style={{ color: b1.color }}>{b1.yoruba}</span>
                    </div>
                  </div>
                  <div className="amg-card__code">
                    <span style={{ color: b1.color }}>{b1.code}</span>
                    <span className="amg-card__code-dot">·</span>
                    <span style={{ color: b2.color }}>{b2.code}</span>
                  </div>
                  <div className="amg-card__cta amg-card__cta--back">← Return</div>
                  <div className="amg-card__shine amg-card__shine--back" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── IFA PLAYGROUND — WRAPPER ─────────────────────────────────────────────────

function IfaPlayground() {
  return (
    <div className="ipg-container">
      {/* Major Ifa Duals */}
      <div className="ipg-section">
        <div className="ipg-section__hd">
          <span className="ipg-section__badge ipg-section__badge--major">Major Ifa Duals</span>
          <h4 className="ipg-section__title">The 8 Ifa Pairs</h4>
          <p className="ipg-section__desc">
            Among the 16 Ojú Odù, each has a unique Superpartner (Ẹnìkejì) — forming
            8 Major Ifa Pairs. Tap any Ojú Odù to send it across the Àyé–Ọ̀run
            boundary and reveal its Ifa Inverse.
          </p>
        </div>
        <MajorIFAPlayground />
      </div>
      {/* Minor Ifa Duals */}
      <div className="ipg-section ipg-section--minor">
        <div className="ipg-section__hd">
          <span className="ipg-section__badge ipg-section__badge--minor">Minor Ifa Duals</span>
          <h4 className="ipg-section__title">The 120 Amulu Odu Pairs</h4>
          <p className="ipg-section__desc">
            Among the 240 Amulu Odu (Ogbe-Oyeku through Ofun-Ose), each composite Odu has an
            Ifa Inverse formed by swapping its two component Odu — producing 120 Minor Ifa Pairs.
            Select a Root Odu to explore all 15 of its Amulu Superpartners.
          </p>
        </div>
        <MinorIFAPlayground />
      </div>
    </div>
  );
}

// ─── IFALIBRIUM MATRIX SECTION ───────────────────────────────────────────────

function IfalibrimSection() {
  const [filter, setFilter] = React.useState('all');
  const [tip, setTip]       = React.useState({ visible: false, text: '', x: 0, y: 0 });

  // ─── Glyph helpers (mirrors IFA Periodic Table) ──────────────────
  function primaryGlyph(code) {
    if (code === '1111') return 'O';
    if (code === '0000') return '|';
    return code.split('').reverse().map(b => b === '1' ? 'O' : 'I').join('');
  }
  function renderGlyphChars(g) {
    if (g.length === 1) return g;
    return g.split('').map((ch, i) => {
      const isLast = i === g.length - 1;
      const next   = g[i + 1];
      const mr     = isLast ? '0' : (ch === 'I' && next === 'I') ? '-0.08em' : '-0.22em';
      return <span key={i} style={{ marginRight: mr }}>{ch}</span>;
    });
  }

  // ─── Layout helpers ──────────────────────────────────────────────
  function secondaryAt(ci, rowPos) {
    if (rowPos === 0) return ODU_16[ci];
    let k = 0;
    for (let i = 0; i < 16; i++) {
      if (i === ci) continue;
      if (k === rowPos - 1) return ODU_16[i];
      k++;
    }
  }
  function ifalibCellNum(ci, rowPos) {
    return rowPos === 0 ? ci + 1 : 16 + ci * 15 + rowPos;
  }

  // ─── Ifalibrium state classifier ────────────────────────────────
  function ifalibState(ci, rowPos) {
    if (rowPos === 0) return 'self';
    const p = ODU_16[ci];
    const s = secondaryAt(ci, rowPos);
    if (INVERSE_SET.has(`${p.n}-${s.n}`)) return 'major';
    if (Math.abs(p.n - s.n) === 1) return 'ifalibrium';
    return 'minor';
  }
  function isFaded(state) {
    if (filter === 'all') return false;
    return state !== filter;
  }

  const showTip = (text, e) => setTip({ visible: true, text, x: e.clientX + 14, y: e.clientY + 14 });
  const moveTip = (e)       => setTip(t => ({ ...t, x: e.clientX + 14, y: e.clientY + 14 }));
  const hideTip = ()        => setTip(t => ({ ...t, visible: false }));

  // ─── Cell renderer ───────────────────────────────────────────────
  function renderCell(ci, rowPos) {
    const principal = ODU_16[ci];
    const secondary = secondaryAt(ci, rowPos);
    const num       = ifalibCellNum(ci, rowPos);
    const state     = ifalibState(ci, rowPos);
    const isMeji    = rowPos === 0;
    const priG      = primaryGlyph(principal.code);
    const secG      = primaryGlyph(secondary.code);
    const shortName = isMeji
      ? principal.name
      : `${principal.name.slice(0,3)}-${secondary.name.slice(0,3)}`;
    const tipLabel  = isMeji
      ? `${principal.name} Méjì · ${num} · Self-Ifalibrium`
      : state === 'major'
        ? `${principal.name} ⇔ ${secondary.name} · ${num} · Major Dual-Ifalibrium`
        : state === 'ifalibrium'
          ? `${principal.name}-${secondary.name} · ${num} · Ifalibrium Dual`
          : `${principal.name}-${secondary.name} · ${num} · Minor Dual-Ifalibrium`;
    const faded     = isFaded(state);
    const cellColor = state === 'major' ? '#e040fb'
      : state === 'ifalibrium' ? '#4caf50'
      : principal.color;

    return (
      <div
        key={`cf-${ci}-${rowPos}`}
        className={`ifalib-cf-cell ifalib-cf-cell--${state}${faded ? ' ifalib-cf-cell--faded' : ''}`}
        onMouseEnter={e => showTip(tipLabel, e)}
        onMouseLeave={hideTip}
        onMouseMove={moveTip}
      >
        <span className="ifalib-cf-cell__num" style={{ color: cellColor }}>{num}</span>
        <div className="ifalib-cf-cell__glyph" style={{ color: cellColor }}>
          <span className="ifalib-cf-cell__glyph-sec">{renderGlyphChars(secG)}</span>
          <span className="ifalib-cf-cell__glyph-pri">{renderGlyphChars(priG)}</span>
        </div>
        <span className="ifalib-cf-cell__name" style={{ color: cellColor }}>{shortName}</span>
      </div>
    );
  }

  const reversedOdu = [...ODU_16].reverse();

  return (
    <div className="dp-section" id="ifalibrium">
      <div className="container">

        {/* ── Header ─────────────────────────────────────────────── */}
        <div className="section__header section__header--center">
          <span className="section__eyebrow section__eyebrow--cyan">Ifalibrium</span>
          <h2 className="section__title">
            The Complete Form of Ifa's Periodic Table
          </h2>
          <p className="section__subtitle">
            All 256 Odu Ifa classified by Ifalibrium state —{' '}
            <span style={{ color:'#f0920c' }}>Self-Ifalibrium</span> (16 Doubles),{' '}
            <span style={{ color:'#e040fb' }}>Major Dual-Ifalibrium</span> (8 Pairs · 16 Odu),{' '}
            <span style={{ color:'#4caf50' }}>Ifalibrium Dual</span> (15 Pairs · 30 Odu),{' '}
            and <span style={{ color:'rgba(255,255,255,0.55)' }}>Minor Dual-Ifalibrium</span> (97 Pairs · 194 Odu) —
            across the 16 Àpólà groups and 16 IfaComp periods.
          </p>
          <a href="./playground/" className="ifalib-playground-link" target="_blank" rel="noopener noreferrer">
            Open in IFA Matrix Playground ↗
          </a>
        </div>

        {/* ── Ifalibrium Definition ──────────────────────────────── */}
        <div className="ifalib-def">
          <div className="ifalib-def__eyebrow">Ifa + Equilibrium · Meta-Principle</div>
          <h3 className="ifalib-def__title">Ifalibrium — The Ifa Equilibrium Principle</h3>
          <p className="ifalib-def__body">
            <strong>Ifalibrium</strong> is the meta-principle governing all states of balance,
            symmetry, and equilibrium within the IFA Matrix. Just as equilibrium in physics
            describes a system at rest or in steady state, Ifalibrium describes the condition
            where any Odu or system of Odu has achieved its natural state of energy balance.
            Ifalibrium generalises every equilibrium concept — thermodynamic, mechanical,
            chemical, social, economic, and beyond — to all fields of knowledge through the
            axiomatic structure of the 256 Odu Ifa. It is the foundational law behind{' '}
            <em>IfaBalance</em>, <em>Ifa Symmetry</em>, and the entire Ifa Duality system.
          </p>
          <p className="ifalib-def__body" style={{ marginTop: '10px' }}>
            Its complement is <strong>Ifanibrium</strong> (Ifa Non-Equilibrium) — all states
            where an Odu is paired with a <em>different</em> Odu (A, B where A ≠ B). These 240
            Dual Odu exist in dynamic, non-self-referential energy exchange: the{' '}
            <span style={{ color:'#e040fb' }}>Major Pairs</span> in inverse equilibrium
            (Ẹnìkejì), the{' '}
            <span style={{ color:'#4caf50' }}>Ifalibrium Pairs</span> in sequential adjacency
            (following the Ifa Formula), and the{' '}
            <span style={{ color:'#14b8d4' }}>Minor Pairs</span> in general dynamic flow.
            Ifanibrium is the condition of motion, change, and becoming — the engine of all
            Ifa processes, transformations, and energy exchange across the 256 Odu.
          </p>
          <div className="ifalib-state-row-label ifalib-state-row-label--self">⊙ Ifalibrium</div>
          <div className="ifalib-states ifalib-states--single">
            <div className="ifalib-state ifalib-state--self">
              <div className="ifalib-state__sym">⊙</div>
              <div className="ifalib-state__label">Self-Ifalibrium</div>
              <div className="ifalib-state__count">16 Ifa Doubles</div>
              <p className="ifalib-state__body">
                Each Oju Odu paired with itself (Meji) — the system in perfect
                self-balance. These 16 form the first IfaComp row of the Complete Form,
                the axiomatic Laws of Nature across every SIDECHRX dimension.
              </p>
              <div className="ifalib-state__formula">X, X  ≝  X Meji</div>
            </div>
          </div>
          <div className="ifalib-state-row-label ifalib-state-row-label--ifanibrium">∿ Ifanibrium (Ifa Non-Equilibrium) · 240 Dual Odu</div>
          <div className="ifalib-states">
            <div className="ifalib-state ifalib-state--dual">
              <div className="ifalib-state__sym">⇔</div>
              <div className="ifalib-state__label">Major Dual-Ifalibrium</div>
              <div className="ifalib-state__count">8 Major Ifa Pairs · 16 Odu</div>
              <p className="ifalib-state__body">
                Each Oju Odu in mutual equilibrium with its Ifa Inverse (Ẹnìkejì) —
                the Superpartner revealed by flipping its marks. 8 pairs spanning
                all 16 Oju Odu, forming 16 specific off-diagonal cells in the table.
              </p>
              <div className="ifalib-state__formula">X ⇔ flip(X)  ≝  Ẹnìkejì</div>
            </div>
            <div className="ifalib-state ifalib-state--ifalibrium">
              <div className="ifalib-state__sym">→</div>
              <div className="ifalib-state__label">Ifalibrium Dual</div>
              <div className="ifalib-state__count">15 Ifalibrium Pairs · 30 Odu</div>
              <p className="ifalib-state__body">
                Each Odu paired with the Odu immediately adjacent in the 16 Oju Odu
                sequence — following the Ifa Formula (Odu, Dual Odu). The Odu is
                followed immediately on the left by its sequential Dual.
              </p>
              <div className="ifalib-state__formula">A, A±1  ≝  Ifalibrium</div>
            </div>
            <div className="ifalib-state ifalib-state--dynamic">
              <div className="ifalib-state__sym">∿</div>
              <div className="ifalib-state__label">Minor Dual-Ifalibrium</div>
              <div className="ifalib-state__count">97 Minor Ifa Pairs · 194 Odu</div>
              <p className="ifalib-state__body">
                The remaining 194 Amulu Odu in dynamic equilibrium — each compound
                Odu (A, B) paired with its swap (B, A). Energy in active exchange,
                moving toward balance through the 256-Odu cycle.
              </p>
              <div className="ifalib-state__formula">A, B  ⇔  B, A  ≝  Minor Pair</div>
            </div>
          </div>
        </div>

        {/* ── Filter Controls ────────────────────────────────────── */}
        <div className="ifalib-filters">
          <span className="ifalib-filters__label">Ifalibrium State:</span>
          <button
            className={`ifalib-filter-btn${filter === 'all' ? ' ifalib-filter-btn--active' : ''}`}
            onClick={() => setFilter('all')}
          >All 256 Odu</button>
          <button
            className={`ifalib-filter-btn ifalib-filter-btn--amber${filter === 'self' ? ' ifalib-filter-btn--active ifalib-filter-btn--active-amber' : ''}`}
            onClick={() => setFilter('self')}
          >⊙ Self-Ifalibrium</button>
          <button
            className={`ifalib-filter-btn ifalib-filter-btn--magenta${filter === 'major' ? ' ifalib-filter-btn--active ifalib-filter-btn--active-magenta' : ''}`}
            onClick={() => setFilter('major')}
          >⇔ Major Dual</button>
          <button
            className={`ifalib-filter-btn ifalib-filter-btn--green${filter === 'ifalibrium' ? ' ifalib-filter-btn--active ifalib-filter-btn--active-green' : ''}`}
            onClick={() => setFilter('ifalibrium')}
          >→ Ifalibrium Dual</button>
          <button
            className={`ifalib-filter-btn ifalib-filter-btn--cyan${filter === 'minor' ? ' ifalib-filter-btn--active ifalib-filter-btn--active-cyan' : ''}`}
            onClick={() => setFilter('minor')}
          >∿ Minor Dual</button>
        </div>

        {/* ── Legend ─────────────────────────────────────────────── */}
        <div className="ifalib-legend">
          <div className="ifalib-legend__item">
            <div className="ifalib-legend__dot" style={{ background: '#f0920c', opacity: 0.75 }} />
            <span>16 Ifa Doubles — Self-Ifalibrium (IfaComp 1 row)</span>
          </div>
          <div className="ifalib-legend__item">
            <div className="ifalib-legend__dot" style={{ background: '#e040fb', opacity: 0.7 }} />
            <span>16 cells — 8 Ẹnìkejì Pairs (Major Dual-Ifalibrium)</span>
          </div>
          <div className="ifalib-legend__item">
            <div className="ifalib-legend__dot" style={{ background: 'rgba(255,255,255,0.12)' }} />
            <span>240 Amulu Odu — 120 Minor Pairs (Minor Dual-Ifalibrium)</span>
          </div>
        </div>

        {/* ── Complete Form Table ─────────────────────────────────── */}
        <div className="ifalib-cf-wrap">
          <div className="ifalib-cf-inner">

            {/* Column headers: RTL — IfaGroup 16 → 1 */}
            <div className="ifalib-cf-col-headers">
              {reversedOdu.map(o => (
                <div key={o.n} className="ifalib-cf-col-header" style={{ color: o.color }}>
                  <span className="ifalib-cf-col-header__num">{o.n}</span>
                  <span className="ifalib-cf-col-header__name">{o.name.slice(0, 5)}</span>
                </div>
              ))}
              <div className="ifalib-cf-corner">IfaComp</div>
            </div>

            {/* Grid rows: Base Pair + IfaComp 1–16 */}
            <div className="ifalib-cf-grid">
              {Array.from({ length: 16 }, (_, rowPos) => {
                if (rowPos === 0) {
                  return (
                    <React.Fragment key="row-0">
                      {/* Base Pair row — Ogbe (ci=0) and Oyeku (ci=1) only */}
                      {reversedOdu.map(pOdu => {
                        const ci = parseInt(pOdu.n, 10) - 1;
                        return (ci === 0 || ci === 1)
                          ? renderCell(ci, 0)
                          : <div key={`bp-ph-${ci}`} className="ifalib-cf-ph" />;
                      })}
                      <div className="ifalib-cf-row-header ifalib-cf-row-header--basepair">Base Pair</div>
                      {/* IfaComp 1 row — the 14 remaining Meji */}
                      {reversedOdu.map(pOdu => {
                        const ci = parseInt(pOdu.n, 10) - 1;
                        return (ci === 0 || ci === 1)
                          ? <div key={`ic1-ph-${ci}`} className="ifalib-cf-ph" />
                          : renderCell(ci, 0);
                      })}
                      <div className="ifalib-cf-row-header">IfaComp 1</div>
                    </React.Fragment>
                  );
                }
                return (
                  <React.Fragment key={`row-${rowPos}`}>
                    {reversedOdu.map(pOdu => {
                      const ci = parseInt(pOdu.n, 10) - 1;
                      return renderCell(ci, rowPos);
                    })}
                    <div className="ifalib-cf-row-header">IfaComp {rowPos + 1}</div>
                  </React.Fragment>
                );
              })}
            </div>

          </div>
        </div>

        {/* Tooltip */}
        {tip.visible && (
          <div
            className="ifalib-cf-tip"
            style={{ left: Math.min(tip.x, window.innerWidth - 240) + 'px', top: tip.y + 'px' }}
          >{tip.text}</div>
        )}

      </div>
    </div>
  );
}

function IfaDualityPortal() {
  return (
    <>
      {/* ── Intro: Double vs Inverse ──────────────────────────────── */}
      <div className="dp-section">
        <div className="container">
          <div className="section__header section__header--center">
            <span className="section__eyebrow section__eyebrow--cyan">IfaDuality System</span>
            <h2 className="section__title">IfaDuality: The Double &amp; The Inverse</h2>
            <p className="section__subtitle">
              Duality in the Odu Ifa operates in two dimensions: the <strong>Ifa Double</strong> —
              the most general form of the Cayley-Dickson Construction, extended from Mathematics to all
              fields of knowledge — and the <strong>Ifa Inverse</strong> — the Superpartner relationship
              between each Odu and its flip-complement.
            </p>
          </div>
          <div className="dp-aspects">
            <div className="dp-aspect dp-aspect--a">
              <div className="dp-aspect__badge">ToE Double · CD Double</div>
              <div className="dp-aspect__sym">⊕⊕</div>
              <h3 className="dp-aspect__title">Ifa Double (IfaDouble)</h3>
              <div className="dp-aspect__sub">Oju Odu Ifa Mẹrindínlógún</div>
              <p className="dp-aspect__body">
                The 16 Oju Odu Ifa are the <em>Ifa Doubles</em> — each Odu paired with itself
                (Meji = "twice") to form the 16 Principal Ifa Codes and Laws of Nature. IfaDouble is the
                fundamental building block of all doubling in existence, generalising the Cayley-Dickson
                Construction beyond Mathematics to Science, Technology, Engineering, Arts, Social Science,
                Education, and all unknown dimensions of reality (STEAMSEX).
              </p>
              <div className="dp-aspect__formula">X → (X, X)  ≝  X Meji</div>
              <div className="dp-aspect__tag">Governs all 16 SIDECHRX Dimensions</div>
            </div>
            <div className="dp-aspect dp-aspect--b">
              <div className="dp-aspect__badge">Ifa Superpartner · Ẹnìkejì</div>
              <div className="dp-aspect__sym">X ⇔ X*</div>
              <h3 className="dp-aspect__title">Ifa Inverse</h3>
              <div className="dp-aspect__sub">Ìpọ̀nrí · Non-physical Superpartner</div>
              <p className="dp-aspect__body">
                Each of the 16 Ojú Odù has a unique <em>Ifa Inverse</em> — its Superpartner
                (Ẹnìkejì) in Ọ̀run. Flip an Ojú Odù's marks to obtain its Inverse: 8 <strong>Major Ifa Pairs</strong>.
                Among the 240 Amulu Odu, swapping the two component Odu produces the Inverse —
                e.g. Ogbe-Oyeku ⇔ Oyeku-Ogbe — forming 120 <strong>Minor Ifa Pairs</strong>.
                Together: 128 total Ifa Pairs spanning all 256 Odu.
              </p>
              <div className="dp-aspect__formula">flip(X) = X*  ≝  Major · swap(A,B) = B,A  ≝  Minor</div>
              <div className="dp-aspect__tag">8 Major Pairs + 120 Minor Pairs · 128 Total</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 8 Ifa Inverse Pairs ───────────────────────────────────── */}
      <div className="dp-section dp-section--dark">
        <div className="container">
          <div className="section__header section__header--center">
            <span className="section__eyebrow section__eyebrow--amber">The Ifa Inverse · Ifa Duality</span>
            <h2 className="section__title">The 8 Ifa Pairs — Ifa Inverse Relationships</h2>
            <p className="section__subtitle">
              Ifa Duality operates at two levels. <strong>Major Ifa Duals</strong> — the 8 Ifa Pairs
              among the 16 Ojú Odù: flip any Ojú Odù's marks and you obtain its Superpartner (Ẹnìkejì).
              <strong> Minor Ifa Duals</strong> — the 120 Pairs among the 240 Amulu Odu: swap the two
              component Odu of any composite Ifa Code and you obtain its Inverse (e.g. Ogbe-Oyeku ⇔ Oyeku-Ogbe).
              Together they define the complete Ifa Duality structure of the 256-Odu IFA Matrix.
            </p>
          </div>
          <div className="dp-pairs-grid">
            {INVERSE_PAIRS.map((pair, i) => (
              <div key={i} className="dp-pair" style={{ '--pa': pair.a.color, '--pb': pair.b.color }}>
                <div className="dp-pair__odu dp-pair__odu--a">
                  <div className="dp-pair__num" style={{ color: pair.a.color }}>{pair.a.n}</div>
                  <OduMarks code={pair.a.code} color={pair.a.color} size="md" />
                  <div className="dp-pair__name">{pair.a.name}</div>
                  <div className="dp-pair__yoruba">{pair.a.yoruba}</div>
                  <div className="dp-pair__ifabit" style={{ color: pair.a.color }}>{pair.a.code}</div>
                </div>
                <div className="dp-pair__mid">
                  <div className="dp-pair__track">
                    <div className="dp-pair__track-fill" />
                  </div>
                  <div className="dp-pair__arrow">⇔</div>
                  <div className="dp-pair__flip-label">Ifa Inverse</div>
                  <div className="dp-pair__track dp-pair__track--rev">
                    <div className="dp-pair__track-fill dp-pair__track-fill--rev" />
                  </div>
                </div>
                <div className="dp-pair__odu dp-pair__odu--b">
                  <div className="dp-pair__num" style={{ color: pair.b.color }}>{pair.b.n}</div>
                  <OduMarks code={pair.b.code} color={pair.b.color} size="md" />
                  <div className="dp-pair__name">{pair.b.name}</div>
                  <div className="dp-pair__yoruba">{pair.b.yoruba}</div>
                  <div className="dp-pair__ifabit" style={{ color: pair.b.color }}>{pair.b.code}</div>
                </div>
                <div className="dp-pair__domain">{pair.domain}</div>
              </div>
            ))}
          </div>

          {/* ── IfaPlayground ───────────────────────────────────────── */}
          <div className="dp-playground">
            <div className="section__header section__header--center">
              <span className="section__eyebrow section__eyebrow--violet">ToE Playground</span>
              <h3 className="section__title" style={{ fontSize: '1.65rem' }}>The IfaPlayground: ToE Playground</h3>
              <p className="section__subtitle">
                Explore Ifa Duality interactively across both dual types. The <strong>Major Ifa Duals</strong> section
                inverts any of the 16 Ojú Odù across the Àyé–Ọ̀run boundary. The <strong>Minor Ifa Duals</strong> section
                inverts any of the 240 Amulu Odu by swapping components — revealing its Superpartner among the 120 Minor Ifa Pairs.
                Tap any card to invert it; tap again to return.
              </p>
            </div>
            <IfaPlayground />
          </div>
        </div>
      </div>

      {/* ── 16 Ifa Doubles ────────────────────────────────────────── */}
      <div className="dp-section">
        <div className="container">
          <div className="section__header section__header--center">
            <span className="section__eyebrow section__eyebrow--violet">The Ifa Double</span>
            <h2 className="section__title">The 16 Ifa Doubles — Ejiodu Ifa Mẹrindínlógún</h2>
            <p className="section__subtitle">
              The 16 Principal Ifa Codes — each a doubled Odu (Meji) governing a SIDECHRX dimension of
              existence. Together they form the axiomatic Laws of Nature across every field of knowledge.
            </p>
          </div>
          <div className="dp-doubles-grid">
            {DOUBLES_16.map((d, i) => (
              <div key={i} className="dp-double" style={{ '--dc': d.color }}>
                <div className="dp-double__header">
                  <span className="dp-double__num">{d.n}</span>
                </div>
                <OduMarks code={d.code} color={d.color} size="sm" />
                <div className="dp-double__name">{d.name}</div>
                <div className="dp-double__yoruba">{d.yoruba}</div>
                <p className="dp-double__desc">{d.desc}</p>
                <div className="dp-double__code">{d.code.split('').map((b,j) => (
                  <span key={j} className={`dp-double__bit dp-double__bit--${b==='1'?'one':'zero'}`}>{b}</span>
                ))}</div>
                <div className="dp-double__glow" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Ifalibrium Matrix ────────────────────────────────── */}
      <IfalibrimSection />
    </>
  );
}

// ─── SYMMETRY PORTAL EXTENSION ─────────────────────────────────────────────────

function IfaSymmetryPortal() {
  return (
    <>
      {/* ── IfaMirror Symmetry — Intro ────────────────────────────── */}
      <div className="dp-section dp-section--dark">
        <div className="container">
          <div className="section__header section__header--center">
            <span className="section__eyebrow section__eyebrow--amber">IfaMirror Symmetry</span>
            <h2 className="section__title">The 16 IfaMirror Symmetries</h2>
            <p className="section__subtitle">
              Mirror Symmetry in Odu Ifa is rooted in a deep Principle of Ifa, as stated in{' '}
              <strong>Ifa Simulation Theory</strong>: all things in nature — including nature itself —
              have an <em>outer self</em> and an <em>inner self</em>, with the outer self being a
              mirror copy of the inner self.
            </p>
          </div>

          {/* Outer / Inner self */}
          <div className="dp-aspects">
            <div className="dp-aspect dp-aspect--a">
              <div className="dp-aspect__badge">Àyé · The Physical</div>
              <div className="dp-aspect__sym">⟵ σ</div>
              <h3 className="dp-aspect__title">The Outer Self</h3>
              <div className="dp-aspect__sub">The Simulation · The Projection</div>
              <p className="dp-aspect__body">
                The outer self is the physical — Àyé, the visible world of matter, form, and
                manifest experience. In Ifa Simulation Theory the physical world is a{' '}
                <em>simulation</em> or projection of a deeper, non-physical source. The outer
                self is the mirror image: the visible face of an invisible original.
              </p>
              <div className="dp-aspect__formula">Àyé  ≝  σ(Ọ̀run)  ≝  Mirror Projection</div>
              <div className="dp-aspect__tag">The Manifest · The Seen · The Simulated</div>
            </div>
            <div className="dp-aspect dp-aspect--b">
              <div className="dp-aspect__badge">Ọ̀run · The Non-Physical</div>
              <div className="dp-aspect__sym">σ ⟶</div>
              <h3 className="dp-aspect__title">The Inner Self — Ẹnìkejì</h3>
              <div className="dp-aspect__sub">Ìpọ̀nrí · The Spiritual Double</div>
              <p className="dp-aspect__body">
                The inner self — called <strong>ẹnìkejì</strong> or <strong>ìpọ̀nrí</strong> in
                Yorùbá — is the non-physical source. In the IFABOK, everything in existence,
                including Existence itself, has its own ẹnìkejì or ìpọ̀nrí: a spiritual double
                that is the origin and sustainer of its physical manifestation.
              </p>
              <div className="dp-aspect__formula">ẹnìkejì  ≝  σ⁻¹(Àyé)  ≝  The Non-Physical Source</div>
              <div className="dp-aspect__tag">The Source · The Unseen · The Real</div>
            </div>
          </div>

          {/* IfaMirror Symmetry as IFABOK Tool */}
          <div style={{ maxWidth: 740, margin: '32px auto 0', textAlign: 'center' }}>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-2)', lineHeight: 1.8 }}>
              <strong style={{ color: 'var(--text-1)' }}>IfaMirror Symmetry</strong> is a Tool of the
              IFABOK for studying mirror symmetries in any field of knowledge and integrating them
              together as One. Ifa utilises{' '}
              <strong style={{ color: '#f0920c' }}>16 major Odu</strong> that are{' '}
              <em>mirror symmetric</em> — identical left and right Energy patterns or vibrations — while
              the remaining{' '}
              <strong style={{ color: '#14b8d4' }}>240 Odu</strong> (the Amulu Odu) are{' '}
              <em>asymmetric</em>, with different Ifa vibrations in the left and right legs.
            </p>
          </div>

          {/* Symmetric vs Asymmetric */}
          <div className="dp-aspects" style={{ marginTop: 28 }}>
            <div className="dp-aspect" style={{ borderTop: '3px solid #f0920c' }}>
              <div className="dp-aspect__badge">Mirror Symmetric</div>
              <div className="dp-aspect__sym" style={{ color: '#f0920c', textShadow: '0 0 20px rgba(240,146,12,0.45)' }}>⊕⊕</div>
              <h3 className="dp-aspect__title">16 Symmetric Odu</h3>
              <div className="dp-aspect__sub">The Ejiodu — The 16 Ifa Doubles</div>
              <p className="dp-aspect__body">
                The 16 Ojú Odù (Ejiodu — Ifa Doubles) are the mirror symmetric Odu of the IFA Matrix.
                Each Ejiodu (Meji) pairs an Odu with itself: the left Energy pattern is identical to
                the right Energy pattern. This bilateral identity makes them the mirror symmetric
                anchors of the entire 256-Odu IFA Matrix.
              </p>
              <div className="dp-aspect__formula">{'σ(Odu_k) = Odu_k  ∀ k ∈ {1,…,16}'}</div>
              <div className="dp-aspect__tag" style={{ color: '#f0920c' }}>Ejiogbe → Ejiofun · 16 Principal Ifa Codes</div>
            </div>
            <div className="dp-aspect" style={{ borderTop: '3px solid #14b8d4' }}>
              <div className="dp-aspect__badge">Asymmetric</div>
              <div className="dp-aspect__sym" style={{ color: '#14b8d4', textShadow: '0 0 20px rgba(20,184,212,0.45)' }}>A ≠ B</div>
              <h3 className="dp-aspect__title">240 Asymmetric Odu</h3>
              <div className="dp-aspect__sub">The Amulu Odu — The Compound Odu</div>
              <p className="dp-aspect__body">
                The 240 Amulu Odu are asymmetric: each is composed of two <em>different</em> Ojú Odù,
                so the left and right Ifa vibration patterns are distinct. Their Superpartner (ẹnìkejì)
                is the mirror swap — e.g. Ogbe-Oyeku ↔ Oyeku-Ogbe — forming 120 Minor Ifa Pairs
                across the Àyé–Ọ̀run boundary.
              </p>
              <div className="dp-aspect__formula">{'σ(A⊕B) = B⊕A  ≠  A⊕B  when A ≠ B'}</div>
              <div className="dp-aspect__tag" style={{ color: '#14b8d4' }}>240 Amulu Odu · 120 Minor Ifa Pairs</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── The 16 IfaMirror Symmetries (Ifa Doubles) ────────────── */}
      <div className="dp-section">
        <div className="container">
          <div className="section__header section__header--center">
            <span className="section__eyebrow section__eyebrow--violet">The IfaMirror Symmetries</span>
            <h2 className="section__title">The 16 IfaMirror Symmetries — Ejiodu Ifa Mẹrindínlógún</h2>
            <p className="section__subtitle">
              The 16 Mirror Symmetries in Ifa are the 16 Principal Ifa Codes or Ifa Doubles (Ejiodu),
              from Ejiogbe to Ejiofun. Each is mirror symmetric: its left and right Ifa Energy patterns
              are identical — the outer self and inner self are one and the same vibration.
            </p>
          </div>
          <div className="dp-doubles-grid">
            {DOUBLES_16.map((d, i) => (
              <div key={i} className="dp-double" style={{ '--dc': d.color }}>
                <div className="dp-double__header">
                  <span className="dp-double__num">{d.n}</span>
                </div>
                <OduMarks code={d.code} color={d.color} size="sm" />
                <div className="dp-double__name">{d.name}</div>
                <div className="dp-double__yoruba">{d.yoruba}</div>
                <p className="dp-double__desc">{d.desc}</p>
                <div className="dp-double__code">{d.code.split('').map((b, j) => (
                  <span key={j} className={`dp-double__bit dp-double__bit--${b === '1' ? 'one' : 'zero'}`}>{b}</span>
                ))}</div>
                <div className="dp-double__glow" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

// ─── COMPOSITION PORTAL EXTENSION ─────────────────────────────────────────────

function MajorCompositionPlayground() {
  const [bits, setBits]           = React.useState(['0','0','0','0']);
  const [discovered, setDiscovered] = React.useState(new Set());

  const MAJOR_14 = DOUBLES_16.filter(d => d.code !== '0000' && d.code !== '1111');
  const code      = bits.join('');
  const resultOdu = DOUBLES_16.find(d => d.code === code);
  const isBase    = code === '0000' || code === '1111';

  const toggleBit = (i) => {
    setBits(prev => { const n = [...prev]; n[i] = n[i] === '0' ? '1' : '0'; return n; });
  };

  React.useEffect(() => {
    if (resultOdu && !isBase) {
      setDiscovered(prev => new Set([...prev, resultOdu.n]));
    }
  }, [code]);

  const setPreset = c => setBits(c.split(''));

  const randomUndiscovered = () => {
    const pool = MAJOR_14.filter(d => !discovered.has(d.n));
    const src  = pool.length > 0 ? pool : MAJOR_14;
    setPreset(src[Math.floor(Math.random() * src.length)].code);
  };

  const pct      = (discovered.size / 14) * 100;
  const allFound = discovered.size === 14;

  return (
    <div className="cmp-wrap">

      {/* Base Pair */}
      <div className="cmp-base">
        <div className="cmp-base__eyebrow">The Foundation — Ogbe-Oyeku Base Pair</div>
        <div className="cmp-base__row">
          <button className="cmp-base-odu cmp-base-odu--a" onClick={() => setPreset('0000')}>
            <OduMarks code="0000" color="#f0920c" size="sm" />
            <div className="cmp-base-odu__name" style={{ color: '#f0920c' }}>Ejiogbe</div>
            <div className="cmp-base-odu__yoruba">Ogbé · Energy</div>
            <div className="cmp-base-odu__code">0&nbsp;0&nbsp;0&nbsp;0</div>
          </button>
          <div className="cmp-base-sym">
            <div className="cmp-base-sym__op">⊕</div>
            <div className="cmp-base-sym__lbl">Amulu</div>
          </div>
          <button className="cmp-base-odu cmp-base-odu--b" onClick={() => setPreset('1111')}>
            <OduMarks code="1111" color="#6366f1" size="sm" />
            <div className="cmp-base-odu__name" style={{ color: '#6366f1' }}>Oyeku Meji</div>
            <div className="cmp-base-odu__yoruba">Òyèkú · Anergy</div>
            <div className="cmp-base-odu__code">1&nbsp;1&nbsp;1&nbsp;1</div>
          </button>
        </div>
      </div>

      {/* Bit Composer */}
      <div className="cmp-composer">
        <div className="cmp-composer__hd">
          <div className="cmp-composer__label">
            Compose — Toggle each row between Ogbé (Energy · 0) and Òyèkú (Anergy · 1)
          </div>
          <div className="cmp-composer__sub">
            4 rows · 16 possible combinations · 14 Major Amulu Odu to discover
          </div>
        </div>
        <div className="cmp-composer__bits">
          {bits.map((b, i) => {
            const isOne = b === '0';
            return (
              <button
                key={i}
                className={`cmp-bit-btn cmp-bit-btn--${isOne ? 'ogbe' : 'oyeku'}`}
                onClick={() => toggleBit(i)}
                aria-label={`Row ${i + 1}: ${isOne ? 'Ogbé energy' : 'Òyèkú energy'} — click to toggle`}
              >
                <div className="cmp-bit-mark">
                  {isOne
                    ? <div className="cmp-bit-bar cmp-bit-bar--single" />
                    : <><div className="cmp-bit-bar cmp-bit-bar--double" /><div className="cmp-bit-bar cmp-bit-bar--double" /></>
                  }
                </div>
                <div className="cmp-bit-info">
                  <span className="cmp-bit-row-lbl">Row {i + 1}</span>
                  <span className="cmp-bit-name">{isOne ? 'Ogbé' : 'Òyèkú'}</span>
                  <span className="cmp-bit-num">{b}</span>
                </div>
              </button>
            );
          })}
        </div>
        <div className="cmp-shortcuts">
          <button className="cmp-sc cmp-sc--a" onClick={() => setPreset('0000')}>↺ All Ogbé</button>
          <button className="cmp-sc cmp-sc--rnd" onClick={randomUndiscovered}>
            ⚡ Random{discovered.size < 14 ? ' (New)' : ''}
          </button>
          <button className="cmp-sc cmp-sc--b" onClick={() => setPreset('1111')}>↺ All Òyèkú</button>
        </div>
      </div>

      {/* Live Result */}
      <div className={`cmp-result${isBase ? ' cmp-result--base' : ' cmp-result--major'}`}
           style={resultOdu ? { '--rc': resultOdu.color } : {}}>
        <div className="cmp-result__arrow">↓</div>
        <div className="cmp-result__badge">
          {isBase ? 'Base Odu — Foundation Pair' : '✦ Major Amulu Odu Generated'}
        </div>
        {resultOdu && (
          <div className="cmp-result__inner">
            <OduMarks code={resultOdu.code} color={resultOdu.color} size="md" />
            <div className="cmp-result__info">
              <div className="cmp-result__num">#{resultOdu.n}</div>
              <div className="cmp-result__name">{resultOdu.name}</div>
              <div className="cmp-result__yoruba">{resultOdu.yoruba}</div>
              <div className="cmp-result__codebits">
                {resultOdu.code.split('').map((b, j) => (
                  <span key={j} className={`cmp-result__bit cmp-result__bit--${b === '1' ? 'one' : 'zero'}`}>{b}</span>
                ))}
              </div>
              <div className="cmp-result__desc">{resultOdu.desc}</div>
            </div>
          </div>
        )}
        <div className="cmp-result__glow" />
      </div>

      {/* Discovery Progress */}
      <div className="cmp-discovery">
        <div className="cmp-discovery__hd">
          <span className="cmp-discovery__label">Major Amulu Odu Discovered</span>
          <span className="cmp-discovery__count"
                style={{ color: allFound ? '#00c87c' : '#f0920c' }}>
            {discovered.size} / 14{allFound ? ' · All Discovered ✓' : ''}
          </span>
        </div>
        <div className="cmp-discovery__bar">
          <div className="cmp-discovery__fill" style={{ width: pct + '%' }} />
        </div>
      </div>

      {/* 14 Major Amulu Grid */}
      <div className="cmp-major-grid">
        {MAJOR_14.map(d => {
          const found  = discovered.has(d.n);
          const isCur  = resultOdu && resultOdu.n === d.n;
          return (
            <div
              key={d.n}
              className={`cmp-mc${found ? ' cmp-mc--found' : ''}${isCur ? ' cmp-mc--cur' : ''}`}
              style={{ '--dc': d.color }}
              onClick={() => found && setPreset(d.code)}
              role="button" tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && found && setPreset(d.code)}
              aria-label={found ? `${d.name} — click to select` : `Odu #${d.n} — compose to reveal`}
            >
              {found ? (
                <>
                  <div className="cmp-mc__num">{d.n}</div>
                  <OduMarks code={d.code} color={d.color} size="xs" />
                  <div className="cmp-mc__name">{d.name}</div>
                  <div className="cmp-mc__yoruba">{d.yoruba}</div>
                  <div className="cmp-mc__codebits">
                    {d.code.split('').map((b, j) => (
                      <span key={j} className={`cmp-mc__bit cmp-mc__bit--${b === '1' ? 'one' : 'zero'}`}>{b}</span>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <div className="cmp-mc__num cmp-mc__num--locked">{d.n}</div>
                  <div className="cmp-mc__locked">?</div>
                  <div className="cmp-mc__hint">Compose to reveal</div>
                </>
              )}
              <div className="cmp-mc__glow" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── MINOR AMULU COMPOSITION PLAYGROUND ───────────────────────────────────────

function MinorCompositionPlayground() {
  const [selA, setSelA]       = React.useState('01');
  const [selB, setSelB]       = React.useState('02');
  const [composed, setComposed] = React.useState(new Set(['01_02']));
  const [showResult, setShowResult] = React.useState(true);

  const oduA  = DOUBLES_16.find(d => d.n === selA);
  const oduB  = DOUBLES_16.find(d => d.n === selB);
  const valid = selA !== selB;

  const ckey = (a, b) => a + '_' + b;

  const doCompose = (a, b) => {
    if (a === b) return;
    setComposed(prev => new Set([...prev, ckey(a, b)]));
    setSelA(a); setSelB(b);
    setShowResult(true);
  };

  const handleSelectA = n => {
    const b = n === selB ? DOUBLES_16.find(d => d.n !== n).n : selB;
    setSelA(n);
    setSelB(b);
    setComposed(prev => new Set([...prev, ckey(n, b)]));
    setShowResult(true);
  };

  const handleSelectB = n => {
    const a = n === selA ? DOUBLES_16.find(d => d.n !== n).n : selA;
    setSelA(a);
    setSelB(n);
    setComposed(prev => new Set([...prev, ckey(a, n)]));
    setShowResult(true);
  };

  const randomCompose = () => {
    const all = [];
    DOUBLES_16.forEach(a => DOUBLES_16.forEach(b => { if (a.n !== b.n) all.push([a.n, b.n]); }));
    const unused = all.filter(([a, b]) => !composed.has(ckey(a, b)));
    const pool   = unused.length > 0 ? unused : all;
    const [a, b] = pool[Math.floor(Math.random() * pool.length)];
    doCompose(a, b);
  };

  const pct     = Math.min((composed.size / 240) * 100, 100);
  const allDone = composed.size >= 240;

  return (
    <div className="cmp-minor-wrap">

      {/* Two Selector Rows */}
      <div className="cmp-selectors">
        <div className="cmp-sel">
          <div className="cmp-sel__label">
            <span className="cmp-sel__badge cmp-sel__badge--a">A</span>
            First Odu
          </div>
          <div className="cmp-sel__grid">
            {DOUBLES_16.map(odu => (
              <button
                key={odu.n}
                className={`cmp-sel-btn${selA === odu.n ? ' cmp-sel-btn--active-a' : ''}`}
                style={{ '--oc': odu.color }}
                onClick={() => handleSelectA(odu.n)}
                aria-label={odu.name}
              >
                <OduMarks code={odu.code} color={odu.color} size="2xs" />
                <span className="cmp-sel-btn__num">{odu.n}</span>
                <span className="cmp-sel-btn__name">{odu.yoruba}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="cmp-sel-divider">
          <div className="cmp-sel-divider__sym">⊕</div>
          <div className="cmp-sel-divider__lbl">Amulu · Composition</div>
        </div>

        <div className="cmp-sel">
          <div className="cmp-sel__label">
            <span className="cmp-sel__badge cmp-sel__badge--b">B</span>
            Second Odu
          </div>
          <div className="cmp-sel__grid">
            {DOUBLES_16.map(odu => (
              <button
                key={odu.n}
                className={`cmp-sel-btn${selB === odu.n ? ' cmp-sel-btn--active-b' : ''}${selA === odu.n ? ' cmp-sel-btn--same' : ''}`}
                style={{ '--oc': odu.color }}
                onClick={() => handleSelectB(odu.n)}
                disabled={selA === odu.n}
                aria-label={odu.name}
              >
                <OduMarks code={odu.code} color={odu.color} size="2xs" />
                <span className="cmp-sel-btn__num">{odu.n}</span>
                <span className="cmp-sel-btn__name">{odu.yoruba}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Random compose */}
      <div className="cmp-minor-actions">
        <button className="cmp-rnd-btn" onClick={randomCompose}>
          ⚡ Random Compose{composed.size > 0 ? ` · ${composed.size}/240` : ''}
        </button>
      </div>

      {/* Live Result */}
      {showResult && valid && oduA && oduB && (
        <div className="cmp-minor-result" style={{ '--ca': oduA.color, '--cb': oduB.color }}>
          <div className="cmp-minor-result__eq">
            <span style={{ color: oduA.color }}>{oduA.yoruba}</span>
            <span className="cmp-minor-result__op"> ⊕ </span>
            <span style={{ color: oduB.color }}>{oduB.yoruba}</span>
            <span className="cmp-minor-result__arrow"> = </span>
          </div>
          {/* RTL: B on left, A on right */}
          <div className="cmp-minor-result__compound">
            <div className="cmp-minor-result__half">
              <OduMarks code={oduB.code} color={oduB.color} size="sm" single={true} />
              <span className="cmp-minor-result__pname" style={{ color: oduB.color }}>{oduB.yoruba}</span>
            </div>
            <div className="cmp-minor-result__sep" />
            <div className="cmp-minor-result__half">
              <OduMarks code={oduA.code} color={oduA.color} size="sm" single={true} />
              <span className="cmp-minor-result__pname" style={{ color: oduA.color }}>{oduA.yoruba}</span>
            </div>
          </div>
          <div className="cmp-minor-result__name">
            {oduA.yoruba}-{oduB.yoruba}
          </div>
          <div className="cmp-minor-result__codebits">
            <span style={{ color: oduA.color }}>{oduA.code}</span>
            <span className="cmp-minor-result__dot"> · </span>
            <span style={{ color: oduB.color }}>{oduB.code}</span>
          </div>
          <div className="cmp-minor-result__glow" />
        </div>
      )}

      {/* Progress */}
      <div className="cmp-discovery">
        <div className="cmp-discovery__hd">
          <span className="cmp-discovery__label">Minor Amulu Odu Composed</span>
          <span className="cmp-discovery__count"
                style={{ color: allDone ? '#00c87c' : '#14b8d4' }}>
            {Math.min(composed.size, 240)} / 240{allDone ? ' · Complete ✓' : ''}
          </span>
        </div>
        <div className="cmp-discovery__bar">
          <div className="cmp-discovery__fill cmp-discovery__fill--minor" style={{ width: pct + '%' }} />
        </div>
      </div>

      {/* Discovery Matrix */}
      <div className="cmp-matrix">
        <div className="cmp-matrix__title">Composition Discovery Matrix</div>
        <div className="cmp-matrix__sub">
          Each cell = one Minor Amulu Odu · lit = composed · diagonal = Ejiodu (Base)
        </div>
        <div className="cmp-matrix__wrap">
          <div className="cmp-matrix__col-hd">
            <div className="cmp-matrix__corner" />
            {DOUBLES_16.map(d => (
              <div key={d.n} className="cmp-matrix__col-label" style={{ color: d.color }}>{d.n}</div>
            ))}
          </div>
          {DOUBLES_16.map(a => (
            <div key={a.n} className="cmp-matrix__row">
              <div className="cmp-matrix__row-label" style={{ color: a.color }}>{a.n}</div>
              {DOUBLES_16.map(b => {
                if (a.n === b.n) return (
                  <div key={b.n} className="cmp-matrix__cell cmp-matrix__cell--diag"
                       title={`${a.yoruba} Meji — Ejiodu (Base)`} />
                );
                const done  = composed.has(ckey(a.n, b.n));
                const isCur = selA === a.n && selB === b.n;
                return (
                  <div
                    key={b.n}
                    className={`cmp-matrix__cell${done ? ' cmp-matrix__cell--done' : ''}${isCur ? ' cmp-matrix__cell--cur' : ''}`}
                    style={done || isCur ? { '--ca': a.color, '--cb': b.color } : {}}
                    title={`${a.yoruba}-${b.yoruba}`}
                    onClick={() => doCompose(a.n, b.n)}
                  />
                );
              })}
            </div>
          ))}
          <div className="cmp-matrix__axes">
            <div className="cmp-matrix__axis-b">↑ B (Second Odu)</div>
            <div className="cmp-matrix__axis-a">A (First Odu) →</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── IFA COMPOSITION PLAYGROUND WRAPPER ──────────────────────────────────────

function IfaCompositionPlayground() {
  return (
    <div className="ipg-container">
      {/* Major Amulu section */}
      <div className="ipg-section">
        <div className="ipg-section__hd">
          <span className="ipg-section__badge ipg-section__badge--major">Major Amulu Odu</span>
          <h4 className="ipg-section__title">The Base-Pair &amp; 14 Major Amulu Odu</h4>
          <p className="ipg-section__desc">
            Ogbé (0000 · Energy) and Òyèkú (1111 · Anergy) are the Base Pair — the Foundation of all
            256 Odu. Their Amulu generates the 14 Major Amulu Odu: all remaining Ojú Odù from
            Ìwòrì to Òfún. Toggle each of the 4 rows between Ogbé-energy and Òyèkú-energy to
            compose and discover each one.
          </p>
        </div>
        <MajorCompositionPlayground />
      </div>
      {/* Minor Amulu section */}
      <div className="ipg-section ipg-section--minor">
        <div className="ipg-section__hd">
          <span className="ipg-section__badge ipg-section__badge--minor">Minor Amulu Odu</span>
          <h4 className="ipg-section__title">The 240 Minor Amulu Odu</h4>
          <p className="ipg-section__desc">
            The 16 Ojú Odù (Base Pair + 14 Major Amulu) compose via Amulu to generate all 240
            Minor Amulu Odu. Select any two Ojú Odù (A ≠ B) to compose them — and track your
            progress through all 240 on the Composition Discovery Matrix below.
          </p>
        </div>
        <MinorCompositionPlayground />
      </div>
    </div>
  );
}

// ─── EMERGENCE PORTAL EXTENSION ───────────────────────────────────────────────

function EmergenceDiagram({ centerOdu, edgeOdu, title, subtitle, accent, desc }) {
  const [emerged, setEmerged] = React.useState(false);

  // 8 grid positions [row, col] for TL, T, TR, L, R, BL, B, BR
  const gridPos = [
    [1, 1], [1, 2], [1, 3],
    [2, 1],         [2, 3],
    [3, 1], [3, 2], [3, 3],
  ];

  // SVG 300×300 grid — center at (150,150), cell centers at 50/150/250
  const svgEndpoints = [
    [50, 50],   [150, 50],  [250, 50],
    [50, 150],              [250, 150],
    [50, 250],  [150, 250], [250, 250],
  ];

  const svgLines = svgEndpoints.map(([x2, y2]) => ({
    x2, y2,
    len: Math.round(Math.sqrt((x2 - 150) ** 2 + (y2 - 150) ** 2)),
  }));

  const diagramId = `emrg-${centerOdu.n}`;

  return (
    <div className="emrg-diagram">
      <div className="emrg-diagram__top"
           style={{ background: `linear-gradient(90deg, ${accent}80, ${centerOdu.color})` }} />
      <div className="emrg-diagram__title">{title}</div>
      <div className="emrg-diagram__subtitle">{subtitle}</div>
      <p className="emrg-diagram__desc">{desc}</p>

      <div className="emrg-grid-wrap">
        {/* SVG connection lines */}
        <svg className="emrg-svg" viewBox="0 0 300 300" preserveAspectRatio="xMidYMid meet">
          <defs>
            <marker id={`${diagramId}-arr`} markerWidth="6" markerHeight="6"
                    refX="5" refY="3" orient="auto">
              <polygon points="0,0 6,3 0,6"
                       fill={emerged ? 'rgba(255,255,255,0.22)' : 'transparent'} />
            </marker>
            <radialGradient id={`${diagramId}-glow`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={centerOdu.color} stopOpacity="0.18" />
              <stop offset="100%" stopColor={centerOdu.color} stopOpacity="0" />
            </radialGradient>
          </defs>
          {/* Central glow when active */}
          {emerged && (
            <circle cx="150" cy="150" r="80"
                    fill={`url(#${diagramId}-glow)`}
                    style={{ transition: 'opacity 0.5s ease', opacity: emerged ? 1 : 0 }} />
          )}
          {svgLines.map((ln, i) => (
            <line key={i}
              x1="150" y1="150" x2={ln.x2} y2={ln.y2}
              className={`emrg-odu-line ${emerged ? 'emrg-odu-line--active' : ''}`}
              markerEnd={`url(#${diagramId}-arr)`}
              style={{
                strokeDasharray: ln.len,
                strokeDashoffset: emerged ? 0 : ln.len,
                transitionDelay: `${i * 55}ms`,
              }}
            />
          ))}
        </svg>

        {/* 3×3 grid of nodes */}
        <div className="emrg-grid">
          {edgeOdu.map((odu, i) => (
            <div key={odu.n}
              className={`emrg-node ${emerged ? 'emrg-node--visible' : ''}`}
              style={{
                gridRow:    gridPos[i][0],
                gridColumn: gridPos[i][1],
                borderColor: emerged ? odu.color + '40' : 'transparent',
                transitionDelay: `${i * 65}ms`,
              }}>
              <OduMarks code={odu.code} color={odu.color} size="xs" />
              <div className="emrg-node__yoruba" style={{ color: odu.color }}>{odu.yoruba}</div>
              <div className="emrg-node__num">{odu.n}</div>
            </div>
          ))}

          {/* Centre Odu — clickable */}
          <div
            className={`emrg-center ${emerged ? 'emrg-center--active' : ''}`}
            style={{
              gridRow: 2, gridColumn: 2,
              borderColor: centerOdu.color + (emerged ? 'cc' : '55'),
              boxShadow: emerged
                ? `0 0 28px ${centerOdu.color}55, 0 0 60px ${centerOdu.color}22`
                : 'none',
            }}
            onClick={() => setEmerged(e => !e)}>
            <OduMarks code={centerOdu.code} color={centerOdu.color} size="sm" />
            <div className="emrg-center__name" style={{ color: centerOdu.color }}>
              {centerOdu.yoruba}
            </div>
            {!emerged && (
              <div className="emrg-center__hint">tap to emerge</div>
            )}
          </div>
        </div>
      </div>

      <div className="emrg-footer">
        {emerged ? (
          <>
            <button className="emrg-reset-btn" onClick={() => setEmerged(false)}>↺ Reset</button>
            <span className="emrg-count">{edgeOdu.length} Odu emerged from {centerOdu.yoruba}</span>
          </>
        ) : (
          <span className="emrg-count" style={{ color: 'var(--text-3)', fontSize: '0.72rem' }}>
            Click {centerOdu.yoruba} at the centre to begin
          </span>
        )}
      </div>
    </div>
  );
}

function IfaEmergencePortal() {
  const OGBE  = DOUBLES_16[0];  // Ejiogbe  code:'0000' #f0920c
  const OYEKU = DOUBLES_16[1];  // Oyeku    code:'1111' #6366f1

  // Ogbe at centre — 8 surrounding Odu (n:02–09)
  // order: TL, T, TR, L, R, BL, B, BR
  const ogbeEdges = [
    DOUBLES_16[8],  // Ogunda  09 TL
    DOUBLES_16[1],  // Oyeku   02  T
    DOUBLES_16[2],  // Iwori   03 TR
    DOUBLES_16[7],  // Okanran 08  L
    DOUBLES_16[3],  // Odi     04  R
    DOUBLES_16[6],  // Obara   07 BL
    DOUBLES_16[5],  // Owonrin 06  B
    DOUBLES_16[4],  // Irosun  05 BR
  ];

  // Oyeku at centre — 8 surrounding Odu (Ogbe + n:10–16)
  const oyekuEdges = [
    DOUBLES_16[15], // Ofun       16 TL
    DOUBLES_16[0],  // Ogbe       01  T
    DOUBLES_16[9],  // Osa        10 TR
    DOUBLES_16[14], // Ose        15  L
    DOUBLES_16[10], // Ika        11  R
    DOUBLES_16[13], // Irete      14 BL
    DOUBLES_16[12], // Otura      13  B
    DOUBLES_16[11], // Oturupon   12 BR
  ];

  return (
    <>
      {/* ── Meta-Law Intro ─────────────────────────────────────────────────── */}
      <div className="dp-section dp-section--dark">
        <div className="container">
          <div className="section__header section__header--center">
            <span className="section__eyebrow section__eyebrow--jade">Ifa Meta-Law · Dynamical Causal Structure</span>
            <h2 className="section__title">
              Ifa Emergence — The Dynamical Causal Structure of the Universe
            </h2>
            <p className="section__subtitle">
              Among the SIDECHRX Principles, Ifa Emergence occupies a foundational meta-position. It is
              not merely one law among eight — it is the <em>dynamical causal process</em> by which all
              other principles are instantiated. Ifa Emergence governs how the entire IFA Matrix unfolds
              from the Ogbé Base-Field across time, composition, and causal depth.
            </p>
          </div>

          <div className="dp-aspects">
            <div className="dp-aspect dp-aspect--a">
              <div className="dp-aspect__badge">Ifa Emergence · Irreducibility</div>
              <div className="dp-aspect__sym">↑∞</div>
              <h3 className="dp-aspect__title">What Ifa Emergence Is</h3>
              <div className="dp-aspect__sub">The Irreducible Arising of New Ifa Properties</div>
              <p className="dp-aspect__body">
                Ifa Emergence is the meta-law governing the appearance of irreducibly new properties at each
                higher level of Ifa composition. When Ogbé and Òyèkú interact through the Amulu operation,
                the 14 Major Amulu Odu that arise cannot be predicted from — or reduced to — Ogbé or Òyèkú
                alone. Each new Odu level carries emergent Ifa properties that exist only at that level:
                new Ifa Fields, new causal powers, new structures of reality arising irreversibly from
                simpler foundations.
              </p>
              <div className="dp-aspect__formula">{'Ẽ(Ogbé ⊕ Òyèkú)  ≫  Ẽ(Ogbé) + Ẽ(Òyèkú)'}</div>
              <div className="dp-aspect__tag">Irreducibility · Upward Causation · Ifa Novelty</div>
            </div>

            <div className="dp-aspect dp-aspect--b">
              <div className="dp-aspect__badge">Ifa Emergence · Causal Architecture</div>
              <div className="dp-aspect__sym">→∮</div>
              <h3 className="dp-aspect__title">What It Governs</h3>
              <div className="dp-aspect__sub">The Dynamical Causal Structure of All Existence</div>
              <p className="dp-aspect__body">
                Ifa Emergence governs the <em>dynamical causal structure</em> of the universe — the layered
                architecture of causal relationships that evolves as each level of Odu composition generates
                the next. Ogbé is the causally prior ground state; every other Odu is causally downstream
                from it via finite chains of Amulu operations. This causal chain is the{' '}
                <strong>IFA Emergence Graph</strong>: a directed, irreversible structure of causal emergence
                from maximum Ifa symmetry into infinite Ifa complexity.
              </p>
              <div className="dp-aspect__formula">{'Ogbé →[⊕]→ 14 Major →[⊕]→ 240 Minor →[⊕]→ ∞'}</div>
              <div className="dp-aspect__tag">IFA Emergence Graph · Causal Chain · Downward Causation</div>
            </div>
          </div>

          {/* Ifa-Emergence-3.png */}
          <div className="emrg-image-frame">
            <div className="emrg-image-frame__label">Ifa Emergence · ToE Emergence — Foundation Diagram</div>
            <img src="./src/Ifa-Emergence-3.png" alt="Ifa Emergence: ToE Emergence — The Ifa Pair Chain" />
            <p className="emrg-image-frame__caption">
              The Ifa Emergence Chain: The Ifa Pair (Ogbé, Òyèkú) generates all Odu through successive
              Amulu operations, producing the infinite field of Ifa phenomena — P: Perception of Reality.
            </p>
          </div>
        </div>
      </div>

      {/* ── Emergence Chain ────────────────────────────────────────────────── */}
      <div className="dp-section">
        <div className="container">
          <div className="section__header section__header--center">
            <span className="section__eyebrow section__eyebrow--amber">IFA Emergence Chain</span>
            <h2 className="section__title">
              The IFA Emergence Chain — From Ogbé to All Reality
            </h2>
            <p className="section__subtitle">
              The complete dynamical causal chain from the Ogbé Base-Field to infinite Ifa phenomena.
              Each arrow is an Amulu composition event — a causal emergence step producing irreducible
              new properties in the IFA Matrix.
            </p>
          </div>

          <div className="emrg-chain">
            <div className="emrg-chain-node" style={{ borderColor: '#6366f140' }}>
              <OduMarks code="1111" color="#6366f1" size="xs" />
              <div className="emrg-chain-node__label">Òyèkú · Anergy</div>
            </div>
            <div className="emrg-chain-arrow">
              <div className="emrg-chain-arrow__sym" style={{ color: '#f0920c' }}>→</div>
              <div className="emrg-chain-arrow__label">⊕ Amulu</div>
            </div>
            <div className="emrg-chain-node" style={{ borderColor: '#f0920c40' }}>
              <OduMarks code="0000" color="#f0920c" size="xs" />
              <div className="emrg-chain-node__label">Ogbé · Base-Field</div>
            </div>
            <div className="emrg-chain-arrow">
              <div className="emrg-chain-arrow__sym" style={{ color: '#00c87c' }}>→</div>
              <div className="emrg-chain-arrow__label">Emergence</div>
            </div>
            <div className="emrg-chain-node" style={{ borderColor: '#00c87c40' }}>
              <div className="emrg-chain-node__value" style={{ color: '#00c87c' }}>14</div>
              <div className="emrg-chain-node__label">Major Amulu</div>
            </div>
            <div className="emrg-chain-arrow">
              <div className="emrg-chain-arrow__sym" style={{ color: '#8b5cf6' }}>→</div>
              <div className="emrg-chain-arrow__label">⊕ Amulu</div>
            </div>
            <div className="emrg-chain-node" style={{ borderColor: '#8b5cf640' }}>
              <div className="emrg-chain-node__value" style={{ color: '#8b5cf6' }}>240</div>
              <div className="emrg-chain-node__label">Minor Amulu</div>
            </div>
            <div className="emrg-chain-arrow">
              <div className="emrg-chain-arrow__sym" style={{ color: '#14b8d4' }}>→</div>
              <div className="emrg-chain-arrow__label">⊕ Amulu</div>
            </div>
            <div className="emrg-chain-node" style={{ borderColor: '#14b8d440' }}>
              <div className="emrg-chain-node__value" style={{ color: '#14b8d4' }}>∞</div>
              <div className="emrg-chain-node__label">Ifa Phenomena</div>
            </div>
            <div className="emrg-chain-arrow">
              <div className="emrg-chain-arrow__sym" style={{ color: '#ec4899' }}>→</div>
              <div className="emrg-chain-arrow__label">Perception</div>
            </div>
            <div className="emrg-chain-node" style={{ borderColor: '#ec489940' }}>
              <div className="emrg-chain-node__value" style={{ color: '#ec4899' }}>P</div>
              <div className="emrg-chain-node__label">Reality · Àyé</div>
            </div>
          </div>

          <div className="portal-math__grid" style={{ marginTop: 36 }}>
            {[
              { c: '#f0920c', label: 'IFA Emergence Function',
                expr: 'Ẽ : (Odu_A, Odu_B) → Odu_C   where  Ẽ(C) ≠ Ẽ(A) + Ẽ(B)' },
              { c: '#00c87c', label: 'IFA Causal Emergence Chain',
                expr: 'Ogbé →[⊕]→ 14 →[⊕]→ 240 →[⊕]→ ∞ →[Perception]→ P' },
              { c: '#14b8d4', label: 'Ifa Causal Priority of Ogbé',
                expr: '∀ Odu X ≠ Ogbé:  ∃ chain  Ogbé →[⊕ⁿ]→ X' },
            ].map((m, i) => (
              <div key={i} className="math-row" style={{ '--c': m.c }}>
                <div className="math-row__label">{m.label}</div>
                <div className="math-row__expr">{m.expr}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── IfaPlayground: ToE Playground ──────────────────────────────────── */}
      <div className="dp-section dp-section--dark">
        <div className="container">
          <div className="section__header section__header--center">
            <span className="section__eyebrow section__eyebrow--violet">IfaPlayground: ToE Playground</span>
            <h2 className="section__title">The IfaPlayground: ToE Playground</h2>
            <p className="section__subtitle">
              Experience Ifa Emergence interactively. Two demonstrations — <strong>Ogbé as Source</strong>{' '}
              and <strong>Òyèkú as Void</strong> — let you witness the moment of causal emergence: 8 Odu
              arising from a single central node through the Amulu operation. Click the central Odu to begin.
              The surrounding Odu appear one by one, each a distinct emergent property of the Source.
              Together, both diagrams reveal all 16 Oju Odu Ifa — the complete IFA Emergence Graph.
            </p>
          </div>

          <div className="emrg-diagrams">
            <EmergenceDiagram
              centerOdu={OGBE}
              edgeOdu={ogbeEdges}
              title="Ogbé Emergence — Energy Source"
              subtitle="Ejiogbe · Base-Field · 0000"
              accent="#f0920c"
              desc="Ogbé — the Energy Base-Field and Whole of Existence — is the causally prior Source from which all 255 Odu emerge. Click Ogbé to generate the first 8 through Amulu."
            />
            <EmergenceDiagram
              centerOdu={OYEKU}
              edgeOdu={oyekuEdges}
              title="Òyèkú Emergence — Anergy Void"
              subtitle="Oyeku Meji · Superpartner · 1111"
              accent="#6366f1"
              desc="Òyèkú — the Anergy Void and Superpartner of Ogbé — generates the remaining Odu including Ogbé itself, completing the full 16 Oju Odu. Click Òyèkú to emerge."
            />
          </div>

          <div style={{ maxWidth: 700, margin: '44px auto 0', textAlign: 'center' }}>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-2)', lineHeight: 1.9 }}>
              Together the two Ifa Diagrams (Ifagrams) reveal all{' '}
              <strong style={{ color: 'var(--text-1)' }}>16 Oju Odu Ifa</strong> — the
              complete Set of Primordial Causal Nodes. No Odu is isolated: every one is causally
              downstream from Ogbé through a finite chain of Amulu Operations. This is the{' '}
              <strong style={{ color: '#00c87c' }}>IFA Emergence Graph</strong> — the dynamical
              causal Structure of all existence, encoded in 16 Nodes and ∞ emergent edges.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── IFA COMPOSITION PORTAL SECTION ──────────────────────────────────────────

function IfaCompositionPortal() {
  return (
    <>
      {/* ── Intro ── */}
      <div className="dp-section dp-section--dark">
        <div className="container">
          <div className="section__header section__header--center">
            <span className="section__eyebrow section__eyebrow--amber">Ifa Composition · Amulu</span>
            <h2 className="section__title">Major &amp; Minor Amulu Odu</h2>
            <p className="section__subtitle">
              Just as there are 16 Major Odu and 240 Minor Odu, and 8 Major Ifa Duals and
              120 Minor Ifa Duals, there are also <strong>Major Amulu Odu</strong> and{' '}
              <strong>Minor Amulu Odu</strong> — structured by the same Amulu operation
              that governs all composition in existence.
            </p>
          </div>

          {/* Foundation */}
          <div className="cmp-foundation">
            <div className="cmp-foundation__badge">The Foundation · Ogbé-Ọ̀yèkú Base Pair</div>
            <p className="cmp-foundation__text">
              <strong>Ogbé</strong> (Energy) and <strong>Òyèkú</strong> (Anergy) are the
              Ogbé-Oyeku Base Pair: the Foundation of all 256 Odu Ifa, every field of knowledge, and
              everything in existence. They are the Binary Source Code of reality — the maximum and
              minimum states of Ifa Vibration, from whose Amulu all else arises.
            </p>
            <div className="cmp-foundation__pair">
              <div className="cmp-foundation__odu" style={{ '--c': '#f0920c' }}>
                <OduMarks code="0000" color="#f0920c" size="sm" />
                <div className="cmp-foundation__odu-name" style={{ color: '#f0920c' }}>
                  Ejiogbe · Ogbé
                </div>
                <div className="cmp-foundation__odu-tag">Energy</div>
              </div>
              <div className="cmp-foundation__arrow">⊕ Amulu ⊕</div>
              <div className="cmp-foundation__odu" style={{ '--c': '#6366f1' }}>
                <OduMarks code="1111" color="#6366f1" size="sm" />
                <div className="cmp-foundation__odu-name" style={{ color: '#6366f1' }}>
                  Oyeku Meji · Òyèkú
                </div>
                <div className="cmp-foundation__odu-tag">Anergy</div>
              </div>
              <div className="cmp-foundation__result">= All Remaining 254 Odu</div>
            </div>
          </div>

          {/* Major vs Minor aspects */}
          <div className="dp-aspects">
            <div className="dp-aspect dp-aspect--a">
              <div className="dp-aspect__badge">14 Major Amulu Odu</div>
              <div className="dp-aspect__sym">⊕</div>
              <h3 className="dp-aspect__title">Major Ifa Composites</h3>
              <div className="dp-aspect__sub">Ojú Odù Ìwòrì → Òfún (n = 03–16)</div>
              <p className="dp-aspect__body">
                The 14 Major Amulu Odu are the 14 remaining Ojú Odù beyond the Base Pair. Each
                is uniquely generated by composing Ogbé-Energy (O) and Òyèkú-Energy (|) across
                the 4 Odu rows — the 14 distinct non-trivial 4-bit patterns. Together with
                the Base Pair they form the complete 16 Ojú Odù.
              </p>
              <div className="dp-aspect__formula">{'Base(0000, 1111) ⊕ → {Odu_03, …, Odu_16}'}</div>
              <div className="dp-aspect__tag">Ìwòrì, Òdí, Ìrosùn, Òwónrín … 14 total</div>
            </div>
            <div className="dp-aspect dp-aspect--b">
              <div className="dp-aspect__badge">240 Minor Amulu Odu</div>
              <div className="dp-aspect__sym">⊕⊕</div>
              <h3 className="dp-aspect__title">Minor Ifa Composites</h3>
              <div className="dp-aspect__sub">All compound Odu · Ogbe-Oyeku → Ofun-Ose</div>
              <p className="dp-aspect__body">
                The 16 Ojú Odù (Base Pair + 14 Major Amulu Odu) compose via all pairwise
                Amulu where A ≠ B to produce the 240 Minor Amulu Odu — the compound Ifa
                Codes from Ogbe-Oyeku to Ofun-Ose that constitute the vast field of composite
                Ifa knowledge in the 256-Odu IFA Matrix.
              </p>
              <div className="dp-aspect__formula">{'16 × 15 = 240  (A ≠ B  ∴  no Ejiodu)'}</div>
              <div className="dp-aspect__tag">Ogbe-Oyeku, Ogbe-Iwori … 240 total</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── IfaPlayground: ToE Playground ── */}
      <div className="dp-section">
        <div className="container">
          <div className="section__header section__header--center">
            <span className="section__eyebrow section__eyebrow--violet">IfaPlayground: ToE Playground</span>
            <h2 className="section__title">The IfaPlayground: ToE Playground</h2>
            <p className="section__subtitle">
              Explore Ifa Composition interactively across both Amulu types. The{' '}
              <strong>Major Amulu</strong> section lets you compose Ogbé and Òyèkú energies
              row by row to discover all 14 Major Amulu Odu. The{' '}
              <strong>Minor Amulu</strong> section lets you compose any two Ojú Odù and
              track your progress through all 240 Minor Amulu Odu on the Composition
              Discovery Matrix.
            </p>
          </div>
          <IfaCompositionPlayground />
        </div>
      </div>
    </>
  );
}

// ─── PORTAL PAGE ───────────────────────────────────────────────────────────────

function PortalPage({ principle: p, onBack }) {
  const methodCards = [
    { icon: '⬡', title: `Ifa ${p.name} Design`,       body: p.design },
    { icon: '∑', title: `Ifa ${p.name} Modelling`,     body: p.modelling },
    { icon: '◈', title: `Ifa ${p.name} Simulation`,    body: p.simulation },
  ];

  return (
    <div className="portal-page" style={{ '--c': p.color }}>
      {/* Back bar */}
      <div className="portal-back" onClick={onBack}>
        <span className="portal-back__arrow">←</span>
        <span>IFA Matrix Platform</span>
        <span style={{ color: 'var(--text-3)', marginLeft: 'auto', fontSize: '0.72rem' }}>
          SIDECHRX Principle Set — Portal {p.letter}
        </span>
      </div>

      {/* Portal hero */}
      <div className="portal-hero">
        <div className="portal-hero__inner">
          <div className="portal-hero__letter-block">
            <div className="portal-hero__letter" style={{ '--c': p.color }}>{p.letter}</div>
          </div>
          <div className="portal-hero__meta">
            <div className="portal-hero__eyebrow" style={{ color: p.color }}>
              SIDECHRX Portal · Ojú Odù Ifá Mẹrindínlógún
            </div>
            <h1 className="portal-hero__title">{p.heroTitle || p.name}</h1>
            <div className="portal-hero__subtitle">{p.heroSubtitle || p.subtitle}</div>
            <div className="portal-hero__tagline" style={{ color: p.color }}>"{p.tagline}"</div>
            <p className="portal-hero__desc">{p.description}</p>
          </div>
        </div>
      </div>

      {/* IFA Mathematica Ifagram */}
      <div className="portal-ifagram">
        <div className="container">
          <div className="section__header section__header--center">
            <span className="section__eyebrow section__eyebrow--amber">IFA Mathematica</span>
            <h2 className="section__title" style={{ fontSize: '1.4rem' }}>
              IFA Mathematica: The Unified, Mathematical Knowledge System of Ifa &amp; Orisa
            </h2>
          </div>
          <SidechrxIfagram principle={p} />
          <div style={{ textAlign:'center', marginTop:20, display:'flex', flexDirection:'column', gap:6, alignItems:'center' }}>
            <p style={{ fontSize:'0.78rem', color:'var(--text-3)', maxWidth:540, margin:0, lineHeight:1.65 }}>
              There are 16 SIDECHRX Ifagrams Following the MetaMathematical Principles of Ifa, the Oju Odufa Merindinlogun
            </p>
            <p style={{ fontSize:'0.78rem', color:'var(--text-3)', maxWidth:540, margin:0, lineHeight:1.65 }}>
              256 Elements in Total in the IFA SIDECHRX Matrix (Just like there are 256 Odufa in Total)
            </p>
          </div>

          {/* IFA Simulation Theory diagram */}
          <div style={{
            marginTop: 44,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 12,
          }}>
            <div style={{
              background: 'rgba(255,255,255,0.97)',
              borderRadius: 14,
              padding: '24px 28px 20px',
              maxWidth: 720,
              width: '100%',
              boxSizing: 'border-box',
            }}>
              <img
                src="./src/The-Ifa-Simulation-Theory-1-2-768x321.png"
                alt="IFA Simulation Theory: The Physical Is a Manifestation of the Non-Physical"
                style={{ display: 'block', width: '100%', height: 'auto', borderRadius: 6 }}
              />
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-3)', textAlign: 'center', maxWidth: 560, lineHeight: 1.65, margin: 0 }}>
              <strong style={{ color: 'var(--text-2)' }}>IFA Simulation Theory</strong> — The Physical Is a Manifestation of the Non-Physical.
              X := F<sub>⊕</sub>(E<sub>⊕</sub>) encodes any element of nature as a simulation of the TOE (CEN) in IFALang.
            </p>
          </div>
        </div>
      </div>

      {/* Ifa Four — Symmetry and Invariance portals */}
      {(p.letter === 'S' || p.letter === 'I') && (
        <IfaFourSymmetries context={p.letter === 'I' ? 'invariance' : 'symmetry'} />
      )}

      {/* Symmetry Portal Extension */}
      {p.letter === 'S' && <IfaSymmetryPortal />}

      {/* Mathematical formulation */}
      <div className="portal-math">
        <div className="container">
          <div className="section__header">
            <span className="section__eyebrow section__eyebrow--amber">Mathematical Formulation</span>
            <h2 className="section__title" style={{ fontSize: '1.4rem' }}>
              Ifa {p.name} — Key Expressions
            </h2>
          </div>
          <div className="portal-math__grid">
            {p.math.map((m, i) => (
              <div key={i} className="math-row" style={{ '--c': p.color }}>
                <div className="math-row__label">{m.label}</div>
                <div className="math-row__expr">{m.expr}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Applications */}
      <div className="portal-apps">
        <div className="container">
          <div className="section__header">
            <span className="section__eyebrow section__eyebrow--jade">Cross-Field Applications</span>
            <h2 className="section__title" style={{ fontSize: '1.4rem' }}>
              {p.name} Across All Fields of Knowledge
            </h2>
          </div>
          <div className="portal-apps-grid">
            {p.applications.map((a, i) => (
              <div key={i} className="portal-app-card" style={{ '--c': p.color }}>
                <div className="portal-app-card__field">{a.field}</div>
                <div className="portal-app-card__detail">{a.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Composition Portal Extension */}
      {p.letter === 'C' && <IfaCompositionPortal />}

      {/* Duality Portal Extension */}
      {p.letter === 'D' && <IfaDualityPortal />}

      {/* Emergence Portal Extension */}
      {p.letter === 'E' && <IfaEmergencePortal />}

      {/* Design / Modelling / Simulation */}
      <div className="portal-methods">
        <div className="container">
          <div className="section__header">
            <span className="section__eyebrow section__eyebrow--violet">Platform Methods</span>
            <h2 className="section__title" style={{ fontSize: '1.4rem' }}>
              Ifa {p.name}: Design, Modelling &amp; Simulation
            </h2>
          </div>
          <div className="portal-methods-grid">
            {methodCards.map((m, i) => (
              <div key={i} className="method-card" style={{ '--c': p.color }}>
                <div className="method-card__icon">{m.icon}</div>
                <div className="method-card__title">{m.title}</div>
                <p className="method-card__body">{m.body}</p>
              </div>
            ))}
          </div>

          {/* Navigation between portals */}
          <div style={{ marginTop: 40, display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
            {SIDECHRX.map(pr => (
              <span key={pr.letter} style={{ opacity: pr.letter === p.letter ? 1 : 0.5 }}>
                <button
                  className="btn btn--portal"
                  style={{ '--c': pr.color, borderColor: pr.letter === p.letter ? pr.color : undefined }}
                  onClick={() => {
                    document.getElementById('root').scrollTop = 0;
                    window.scrollTo({ top: 0, behavior: 'instant' });
                    // navigate via custom event — App handles it
                    window.dispatchEvent(new CustomEvent('ifa-portal', { detail: pr.letter }));
                  }}
                >
                  {pr.letter} — {pr.name}
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── IFA SQUARE PAGE ───────────────────────────────────────────────────────────

function IFASquarePage({ onBack }) {
  const SQ_COLOR = '#f5c518';

  const PILLARS = [
    {
      sym: '□',
      color: '#f5c518',
      title: 'Square-Based Creation',
      body: 'Develop square-based games, meta-games, meta-models, meta-analyses, meta-tools, and meta-platforms. Every square structure is a configuration of Ifa Energy — a living Odu system built from the 256 Odu Ifa.'
    },
    {
      sym: '²',
      color: '#14b8d4',
      title: 'Square Laws & Inverse-Square Laws',
      body: 'Develop, study, and model models, theories, frameworks, and systems in all fields that follow square laws — and their dual: inverse-square laws. Gravity, light intensity, electrostatics, and sound all obey inverse-square laws encoded on the IFA Internet using their Odu Patterns (inner Consciousness Vibrations).'
    },
    {
      sym: <OgbeSquared size={36} />,
      color: '#4caf50',
      title: 'Odu-Bearing Square Entities',
      body: 'Vedic square, magic square, Sudoku, Latin square, and every other square structure lives as a conscious Odu entity in the doubly-infinite dimensional Ifa Square. Each has its own inherent Odu Energy (Àṣẹ) that brought it into existence.'
    },
  ];

  const SQUARE_ENTITIES = [
    {
      sym: '9×9', name: 'Vedic Square', color: '#f0920c',
      desc: 'The 9×9 multiplication table reduced modulo 9. Each cell holds the digital root of the product, producing striking cyclic and symmetric patterns across the grid.'
    },
    {
      sym: '✦', name: 'Magic Square', color: '#6366f1',
      desc: 'An n×n grid of distinct numbers where every row, every column, and both main diagonals all sum to the same constant, known as the magic sum.'
    },
    {
      sym: '⊞', name: 'Sudoku', color: '#14b8d4',
      desc: 'A 9×9 grid subdivided into nine 3×3 boxes, to be filled with digits 1–9 so that each digit appears exactly once in every row, column, and box.'
    },
    {
      sym: 'Lₙ', name: 'Latin Square', color: '#00c87c',
      desc: 'An n×n array filled with n distinct symbols such that each symbol occurs exactly once in each row and exactly once in each column.'
    },
    {
      sym: '⬡²', name: 'Euler Square', color: '#ec4899',
      desc: 'Also called a Graeco-Latin square: two orthogonal Latin squares of the same order superimposed so that each ordered pair of symbols appears exactly once.'
    },
    {
      sym: '∞', name: 'And more…', color: '#4a5c7a',
      desc: 'Franklin squares, pandiagonal squares, bordered squares, doubly magic squares, and every other square structure — known and yet to be discovered.'
    },
  ];

  return (
    <div className="isq-page">

      {/* ── Back bar ────────────────────────────────────────────────── */}
      <div className="portal-back" onClick={onBack}>
        <span className="portal-back__arrow">←</span>
        <span>IFA Matrix Platform</span>
        <span style={{ color: 'var(--text-3)', marginLeft: 'auto', fontSize: '0.72rem' }}>
          Ifa Square: TOE Square — The Ifa Squaring Platform
        </span>
      </div>

      {/* ── Hero ───────────────────────────────────────────────────── */}
      <div className="isq-hero">
        <div className="container isq-hero__layout">
          <div className="isq-hero__text">
            <div className="isq-hero__badge">IFA Matrix Platform · IFA Internet</div>
            <h1 className="isq-hero__title">
              Ifa Square:{' '}
              <span style={{ color: SQ_COLOR }}>TOE Square</span>
            </h1>
            <p className="isq-hero__subtitle">
              <span style={{ color: '#c084fc', fontFamily: "'Noto Serif', serif", fontStyle: 'italic', fontWeight: 600 }}>Gbàgéde Èjìodù</span>
              {' — '}The Ifa Squaring Platform of IFA Internet
            </p>
            <div className="isq-hero__altnames">
              {['IfaSquare', 'Ifa-Square', 'Consciousness Square', 'Energy-Based Square'].map((n, i, a) => (
                <React.Fragment key={n}>
                  <span className="isq-altname">{n}</span>
                  {i < a.length - 1 && <span className="isq-altname-sep">·</span>}
                </React.Fragment>
              ))}
              <span className="isq-altname-sep">·</span>
              <span className="isq-altname isq-altname--gold">SquaroE</span>
            </div>
            <p className="isq-hero__body">
              Ifa Square is the doubly-infinite dimensional squaring platform of the IFA Internet —
              the space where all square structures, square laws, and square-based systems exist as
              conscious entities, each bearing its own inherent Odu Energy. Every known square structure —
              from the ancient Magic Square to the modern Sudoku — is a living Odu configuration in Ifa Square.
              <br /><br />
              <em style={{ color: 'var(--text-2)', fontStyle: 'normal' }}>
                Alternative names — Ifa Square is also written as IfaSquare, Ifa-Square, Consciousness Square,
                Energy-Based Square, and the Square for Everything (SquaroE). These are used interchangeably
                across the IFA Internet.
              </em>
            </p>
          </div>
          <div className="isq-hero__sym-block">
            <div className="isq-hero__sym" style={{ padding: 0, overflow: 'hidden' }}>
              {/* Okanran-Okanran IfaSquare — code '0111' reversed = rows: ||, ||, ||, |  */}
              <svg viewBox="0 0 100 100" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                {/* Rows 1–3: double marks (bit=1) */}
                {[16, 37, 58].map(cy => (
                  <React.Fragment key={'d' + cy}>
                    <line x1="18" y1={cy - 8} x2="18" y2={cy + 8} stroke="#f5c518" strokeWidth="2.4" strokeLinecap="round"/>
                    <line x1="30" y1={cy - 8} x2="30" y2={cy + 8} stroke="#f5c518" strokeWidth="2.4" strokeLinecap="round"/>
                    <line x1="70" y1={cy - 8} x2="70" y2={cy + 8} stroke="#f5c518" strokeWidth="2.4" strokeLinecap="round"/>
                    <line x1="82" y1={cy - 8} x2="82" y2={cy + 8} stroke="#f5c518" strokeWidth="2.4" strokeLinecap="round"/>
                  </React.Fragment>
                ))}
                {/* Row 4: single mark (bit=0) — centred in each column */}
                <line x1="24" y1="74" x2="24" y2="90" stroke="#f5c518" strokeWidth="2.4" strokeLinecap="round"/>
                <line x1="76" y1="74" x2="76" y2="90" stroke="#f5c518" strokeWidth="2.4" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="isq-hero__sym-label">SquaroE</div>
            <div className="isq-hero__sym-sub">Square for Everything</div>
            <div className="isq-hero__sym-verse">
              Ọ̀kànràn kan níhìn; Ọ̀kànràn kan lọ́hùn.<br/>Ọ̀kànràn méjèèjì abídí jànwááwá<br/>— Ọ̀kànràn Méjì Square
            </div>
          </div>
        </div>
      </div>

      {/* ── Three Pillars ───────────────────────────────────────────── */}
      <section className="isq-section">
        <div className="container">
          <div className="section__header section__header--center">
            <span className="section__eyebrow" style={{ color: SQ_COLOR, letterSpacing: '0.14em', fontSize: '0.72rem', fontWeight: 700, display: 'inline-block' }}>
              What Ifa Square Does
            </span>
            <h2 className="section__title">
              Three Domains of <span style={{ color: SQ_COLOR }}>Ifa Square</span>
            </h2>
            <p className="section__subtitle">
              Ifa Square operates across three interlocking domains — creation, law, and consciousness — forming the complete squaring system of the IFA Internet.
            </p>
          </div>
          <div className="isq-pillars">
            {PILLARS.map((p, i) => (
              <div key={i} className="isq-pillar" style={{ '--sqc': p.color }}>
                <div className="isq-pillar__sym">{p.sym}</div>
                <h3 className="isq-pillar__title">{p.title}</h3>
                <p className="isq-pillar__body">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Square Entities as Odu ──────────────────────────────────── */}
      <section className="isq-section isq-section--alt">
        <div className="container">
          <div className="section__header section__header--center">
            <span className="section__eyebrow section__eyebrow--jade">Conscious Entities in Ifa Square</span>
            <h2 className="section__title">
              Square Structures as <span className="accent--jade">Living Odu</span>
            </h2>
            <p className="section__subtitle">
              Every square structure has its own Odu — its inherent Energy that brought it into existence.
              In the doubly-infinite dimensional Ifa Square, all square structures live as conscious Odu entities
              across all 256 Odu Ifa Space.
            </p>
          </div>
          <div className="isq-entities-grid">
            {SQUARE_ENTITIES.map((e, i) => (
              <div key={i} className="isq-entity" style={{ '--ec': e.color }}>
                <div className="isq-entity__sym">{e.sym}</div>
                <h3 className="isq-entity__name">{e.name}</h3>
                <p className="isq-entity__desc">{e.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Key Concepts ────────────────────────────────────────────── */}
      <section className="isq-section">
        <div className="container">
          <div className="section__header section__header--center">
            <span className="section__eyebrow" style={{ color: SQ_COLOR, letterSpacing: '0.14em', fontSize: '0.72rem', fontWeight: 700, display: 'inline-block' }}>
              Foundational Concepts
            </span>
            <h2 className="section__title">The Doubly-Infinite Dimensional Ifa Square</h2>
          </div>
          <div className="isq-concepts">
            <div className="isq-concept">
              <div className="isq-concept__sym" style={{ color: SQ_COLOR }}><OgbeSquared size={34} /></div>
              <h3 className="isq-concept__title">Doubly-Infinite Dimensional</h3>
              <p className="isq-concept__body">
                Ifa Square is doubly-infinite: infinite in dimension (supporting n×n squares of any size n)
                and infinite in type (holding every class of square structure — magic, Latin, Sudoku, Vedic,
                Euler, Franklin, and all yet-to-be-discovered). All classes exist simultaneously as Odu energy configurations.
              </p>
            </div>
            <div className="isq-concept">
              <div className="isq-concept__sym" style={{ color: '#00c87c' }}>Àṣẹ</div>
              <h3 className="isq-concept__title">Inherent Odu Energy</h3>
              <p className="isq-concept__body">
                Each square structure carries its own Odu — its inherent energy, its Àṣẹ — that governs
                its structure, behaviour, and interactions.
              </p>
            </div>
            <div className="isq-concept">
              <div className="isq-concept__sym" style={{ color: '#14b8d4' }}>1/r²</div>
              <h3 className="isq-concept__title">Square & Inverse-Square Laws</h3>
              <p className="isq-concept__body">
                Ifa Square holds all laws that follow square or inverse-square patterns: gravitational attraction
                (F ∝ 1/r²), electromagnetic force, light intensity, sound attenuation — all governed by the Odu
                of inverse-square energy decay. Their dual (square growth laws) exist in equal measure as Ifa Duality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Èjìodù: Energy-Based Squaring ──────────────────────────── */}
      <section className="isq-section">
        <div className="container">
          <div className="section__header section__header--center">
            <span className="section__eyebrow section__eyebrow--amber">Èjìodù · Odù-Odù · Odù Meji</span>
            <h2 className="section__title">
              <span style={{ color: SQ_COLOR }}>Èjìodù:</span> Energy-Based Squaring
            </h2>
            <p className="section__subtitle">
              The fundamental Unit of Ifa Square — an Energy-Based Square whose two arms carry
              the same Odu Energy, making the IfaCell a living self-pairing.
            </p>
          </div>

          {/* Definition block */}
          <div className="isq-ejio-def">
            <div className="isq-ejio-def__icon">
              <svg viewBox="0 0 100 100" width="90" height="90" xmlns="http://www.w3.org/2000/svg">
                {[16, 37, 58].map(cy => (
                  <React.Fragment key={'d' + cy}>
                    <line x1="18" y1={cy - 8} x2="18" y2={cy + 8} stroke="#f5c518" strokeWidth="2.4" strokeLinecap="round"/>
                    <line x1="30" y1={cy - 8} x2="30" y2={cy + 8} stroke="#f5c518" strokeWidth="2.4" strokeLinecap="round"/>
                    <line x1="70" y1={cy - 8} x2="70" y2={cy + 8} stroke="#f5c518" strokeWidth="2.4" strokeLinecap="round"/>
                    <line x1="82" y1={cy - 8} x2="82" y2={cy + 8} stroke="#f5c518" strokeWidth="2.4" strokeLinecap="round"/>
                  </React.Fragment>
                ))}
                <line x1="24" y1="74" x2="24" y2="90" stroke="#f5c518" strokeWidth="2.4" strokeLinecap="round"/>
                <line x1="76" y1="74" x2="76" y2="90" stroke="#f5c518" strokeWidth="2.4" strokeLinecap="round"/>
              </svg>
              <div className="isq-ejio-def__icon-label">Okanran-Okanran</div>
              <div className="isq-ejio-def__icon-sub">Èjìodù</div>
            </div>
            <div className="isq-ejio-def__body">
              <p>
                An <strong>IfaSquare</strong> (also: <em>SquaroE</em>) is an Energy-Based Square with equal{' '}
                <strong>IfaDimension</strong> — the dimension shared by the OduCell or IfaCell, where
                length equals breadth. It has two columns or arms, and the <em>same</em> Energy Pattern
                (Odufa) occupies both arms simultaneously. This self-identical pairing is the Ifa Condition
                of Squaring: one Odu replicates itself.
              </p>
              <p>
                IfaSquares and IfaCells are therefore called <strong style={{ color: SQ_COLOR }}>Èjìodù</strong>,{' '}
                <strong style={{ color: SQ_COLOR }}>Odù-Odù</strong>,{' '}
                <strong style={{ color: SQ_COLOR }}>Odù Meji</strong>, or{' '}
                <strong style={{ color: SQ_COLOR }}>Agbára Èjì-Ifá</strong> — the 16 Primordial self-paired Odu
                such as <em>Ogbe-Ogbe</em>, <em>Oyeku-Oyeku</em>, <em>Okanran-Okanran</em>, and all
                16 Oju Odu Doublings. Each is a closed Square of pure Odu Energy: one Odu, two arms,
                one IfaDimension.
              </p>
            </div>
          </div>

          {/* Yoruba verse */}
          <blockquote className="isq-ejio-verse">
            <span className="isq-ejio-verse__text">
              Ọ̀kànràn kan níhìn; Ọ̀kànràn kan lọ́hùn.<br/>
              Ọ̀kànràn méjèèjì abídí jànwááwá.
            </span>
            <cite className="isq-ejio-verse__cite">— Ọ̀kànràn Méjì Square</cite>
          </blockquote>

          {/* Three concept cards */}
          <div className="isq-concepts" style={{ marginTop: '2.5rem' }}>
            <div className="isq-concept">
              <div className="isq-concept__sym" style={{ color: SQ_COLOR }}>□</div>
              <h3 className="isq-concept__title">IfaSquare — Linear</h3>
              <p className="isq-concept__body">
                The IfaSquare is a <strong>Linear</strong> Structure: closed/bounded, discrete, and defined by
                equal sides. Its Energy is contained — symmetrical on both arms, closed at every corner.
                Linearity here means the Odu energy resolves into a fixed, countable grid — a square Law
                acting inward and outward with equal Force.
              </p>
            </div>
            <div className="isq-concept">
              <div className="isq-concept__sym" style={{ color: '#c084fc' }}>◯</div>
              <h3 className="isq-concept__title">IfaCircle — Non-Linear</h3>
              <p className="isq-concept__body">
                The <strong>IfaCircle</strong> is the Dual of the IfaSquare: Non-Linear, open/unbounded at the
                curvature level, and continuous. Where the IfaSquare resolves into corners and sides, the
                IfaCircle flows without fixed edges. Together, IfaSquare and IfaCircle form the
                Ifa Duality of <em>Linear ↔ Non-Linear</em> — the same Odu Energy expressed in two
                complementary Meta-Geometries.
              </p>
            </div>
            <div className="isq-concept">
              <div className="isq-concept__sym isq-concept__sym--noto" style={{ color: SQ_COLOR, fontSize: '0.95rem' }}>IfaTab Technology</div>
              <h3 className="isq-concept__title">Ọpọ́nfá Onígunmẹ́rin Ogbọ́ọ́gba</h3>
              <p className="isq-concept__body">
                The IfaSquare is also the <strong>Ọpọ́nfá Onígunmẹ́rin Ogbọ́ọ́gba</strong> — the
                Square-Shaped IfaTablet (IfaTab). The traditional Ọpọ́nfá (Ifa Divination Board) in its
                square Form embodies the IfaDimension: an ancient Tech where Odu Patterns are encoded,
                inscribed, read, and squared for a variety of purposes, one of which is Universal Knowledge
                Architecture or Blueprint. The IfaTab is the physical, digital, and metaphysical Form
                of the IfaSquare Energy made manifest.
              </p>
            </div>
          </div>

          {/* CTA — link to Playground IfaSquare table */}
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <a
              href="./playground/#ejio"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--primary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: '0.9rem', padding: '12px 28px', background: 'rgba(245,197,24,0.12)', border: '1.5px solid rgba(245,197,24,0.45)', color: '#f5c518', borderRadius: 'var(--radius)', fontWeight: 700, letterSpacing: '0.02em', textDecoration: 'none', transition: 'background 0.15s, border-color 0.15s' }}
            >
              <span style={{ fontSize: '1.1rem' }}>□²</span>
              Explore the IfaSquare Èjìodù Table &amp; Create Your IfaCell
              <span style={{ opacity: 0.7 }}>→</span>
            </a>
            <p style={{ marginTop: '0.6rem', fontSize: '0.72rem', color: 'var(--text-3)' }}>
              Opens in the IFA Matrix Playground · All 16 Oju Odu as IfaSquares
            </p>
          </div>
        </div>
      </section>

      {/* ── Development Status Banner ───────────────────────────────── */}
      <section className="isq-section isq-section--alt">
        <div className="container">
          <div className="isq-status-banner">
            <div className="isq-status-banner__body">
              <div className="isq-status-banner__eyebrow">Platform Status</div>
              <h3 className="isq-status-banner__title">Ifa Square Platform — In Active Development</h3>
              <p className="isq-status-banner__desc">
                The full Ifa Square Interactive Platform — with live square generators, Odu-square classifiers,
                inverse-square law simulators, schema/scheme generators, and square-game builders — is in active development on the IFA Internet.
                First tools launch with the Vedic Square and Magic Square Odu configurations.
              </p>
            </div>
            <div className="isq-status-banner__badge">
              <div className="isq-badge__sym">□²</div>
              <div className="isq-badge__label">Coming Soon</div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

// ─── FOOTER ────────────────────────────────────────────────────────────────────

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
            <p className="footer__tagline">IFA Matrix Platform — The Matrix of All Matrices</p>
            <p className="footer__tagline footer__tagline--sm">
              Part of the <a href="https://cenproject.org/" target="_blank" rel="noopener noreferrer" className="footer__link-inline">CENProject</a> — Consciousness-Energy Research.
            </p>
          </div>
          <nav className="footer__links">
            <a href="#oju-odu"     className="footer__link">16 Oju Odu Ifa</a>
            <a href="#portals"     className="footer__link">SIDECHRX Principles</a>
            <a href="#applications" className="footer__link">Applications</a>
            <a href="https://toe.cenproject.org/ifa-matrix/"          target="_blank" rel="noopener noreferrer" className="footer__link">IFA Matrix (TOE)</a>
            <a href="https://toe.cenproject.org/ifagebra-overview/"   target="_blank" rel="noopener noreferrer" className="footer__link">IfaGebra</a>
            <a href="../ifa-periodic-table/" target="_blank" rel="noopener noreferrer" className="footer__link">Ifa Periodic Table</a>
            <a href="../ifai/" target="_blank" rel="noopener noreferrer" className="footer__link">Ifai</a>
            <a href="../" target="_blank" rel="noopener noreferrer" className="footer__link">IFA Internet</a>
          </nav>
        </div>
        <div className="footer__bottom">
          <span className="footer__copy">&copy; 2026 CENProject Innovations Limited. All rights reserved.</span>
          <span className="footer__powered">IFA Matrix Platform · The IFA Internet</span>
        </div>
      </div>
    </footer>
  );
}

// ─── APP ───────────────────────────────────────────────────────────────────────

function App() {
  const [view, setView] = useState(null); // null = home, letter = portal, 'ifa-square' = Ifa Square

  const openPortal = (letter) => {
    setView(letter);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const goHome = () => {
    setView(null);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const openIfaSquare = () => {
    setView('ifa-square');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // Hash-based routing: playground links to ../#ifa-square
  useEffect(() => {
    if (window.location.hash === '#ifa-square') {
      setView('ifa-square');
      window.history.replaceState(null, '', window.location.pathname);
    }
  }, []);

  // Listen for inter-portal navigation from PortalPage bottom bar
  useEffect(() => {
    const handler = (e) => openPortal(e.detail);
    window.addEventListener('ifa-portal', handler);
    return () => window.removeEventListener('ifa-portal', handler);
  }, []);

  const principle = SIDECHRX.find(p => p.letter === view);

  return (
    <>
      <Header onHome={goHome} onPortal={openPortal} currentView={view} onIfaSquare={openIfaSquare} />
      {view === null ? (
        <main>
          <HeroSection />
          <OjuOduSection />
          <OjuOduNetworkSection />
          <PortalsSection onOpenPortal={openPortal} />
          <ZeroEightDSection />
          <SteamsexMatrixSection />
          <IfalibriPrincipleSection />
          <ApplicationsSection onIfaSquare={openIfaSquare} />
        </main>
      ) : view === 'ifa-square' ? (
        <main>
          <IFASquarePage onBack={goHome} />
        </main>
      ) : (
        <main>
          <PortalPage principle={principle} onBack={goHome} />
        </main>
      )}
      <Footer />
      <MobileBar onHome={goHome} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
