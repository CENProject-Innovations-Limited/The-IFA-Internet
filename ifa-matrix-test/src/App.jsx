/* ─────────────────────────────────────────────────────────────────────────────
   IFA Matrix Platform
   The IFA Internet · CENProject
   ifainternet.org/ifa-matrix/
───────────────────────────────────────────────────────────────────────────── */

const { useState, useEffect } = React;

// ─── DATA ─────────────────────────────────────────────────────────────────────

const ODU_16 = [
  { n:'01', name:'Ogbé',      letter:'S',  type:'O', color:'#f0920c' },
  { n:'02', name:'Òyèkú',    letter:'I',  type:'I', color:'#6366f1' },
  { n:'03', name:'Ìwòrì',    letter:'D',  type:'I', color:'#14b8d4' },
  { n:'04', name:'Òdí',      letter:'E',  type:'O', color:'#00c87c' },
  { n:'05', name:'Ìrosùn',   letter:'C',  type:'I', color:'#ef4444' },
  { n:'06', name:'Òwónrín',  letter:'H',  type:'O', color:'#8b5cf6' },
  { n:'07', name:'Òbàrà',    letter:'R',  type:'O', color:'#3b9eff' },
  { n:'08', name:'Òkànràn',  letter:'X',  type:'O', color:'#ec4899' },
  { n:'09', name:'Ògúndá',   letter:'S′', type:'O', color:'#f0920c' },
  { n:'10', name:'Òsá',      letter:'I′', type:'O', color:'#6366f1' },
  { n:'11', name:'Ìká',      letter:'D′', type:'I', color:'#14b8d4' },
  { n:'12', name:'Òtúrúpòn', letter:'E′', type:'O', color:'#00c87c' },
  { n:'13', name:'Òtúrá',    letter:'C′', type:'O', color:'#ef4444' },
  { n:'14', name:'Ìrètè',    letter:'H′', type:'I', color:'#8b5cf6' },
  { n:'15', name:'Òsè',      letter:'R′', type:'O', color:'#3b9eff' },
  { n:'16', name:'Òfún',     letter:'X′', type:'O', color:'#ec4899' },
];

const SIDECHRX = [
  {
    letter: 'S',
    name: 'Symmetry',
    odu: 'Ogbé',
    type: 'O',
    color: '#f0920c',
    symbol: '⊛',
    subtitle: 'The Base-Field Symmetry',
    tagline: 'The fundamental principle that all Ifa transformations preserve the structure of reality.',
    description: 'Symmetry is the first and most fundamental principle of the IFA Matrix — arising directly from Ogbé, the Base-Field and Whole of Existence in Ifa Field Theory (IFT). Ogbé represents the maximally symmetric state from which all 255 other Odu emerge through symmetry-breaking transformations. Every fundamental interaction in nature, every conservation law, every structural regularity across all fields of knowledge is a manifestation of a deeper Ifa Symmetry. The SIDECHRX Principle Set itself is an expression of Ifa Symmetry: eight primary laws paired with eight anti-laws, balanced around the Ogbé-Òyèkú axis.',
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
    tagline: 'The principle that certain Ifa quantities remain unchanged under every transformation in G_IFA.',
    description: 'Invariance is governed by Òyèkú — the Superpartner and Dual of Ogbé. While Symmetry (Ogbé) describes the transformations that preserve structure, Invariance (Òyèkú) identifies the quantities that remain unchanged under those transformations. Òyèkú is the "constant" in the equation of existence — the baseline against which all change is measured. In physics, conservation laws are invariance theorems. In Ifa, Òyèkú encodes the Ifa Invariants: the constants of nature at every scale, dimension, and field of knowledge. The Ogbé–Òyèkú pairing is the master invariance: whatever Ogbé generates, Òyèkú conserves.',
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
    subtitle: 'The Master Duality — Ogbé and Òyèkú',
    tagline: 'Every entity in the IFA Matrix has a dual — its Superpartner in the 256-Odu space.',
    description: 'Duality is the governing principle of Ìwòrì — the Odu that encodes the relationship between every entity and its complement. The Ogbé–Òyèkú Duality is the master duality of the IFA Matrix: the interaction between the Base-Field (Ogbé) and its Superpartner (Òyèkú) generates all 256 Odu through the Amulu operation. Ifa Duality generalises wave-particle duality, matter-antimatter duality, Yin-Yang, and all binary oppositions into a single unified mathematical framework within IfaGebra. In Ifa Field Theory, every Odu X has a unique dual X* such that X ⊕ X* = Ogbé — the identity. This makes the 256 Odu a self-dual group.',
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
    subtitle: 'Complexity Arising from Ifa Simplicity',
    tagline: 'How the 16 Oju Odu Ifa generate all complexity in the universe through the Amulu operation.',
    description: 'Emergence is governed by Òdí — the Odu that encodes the appearance of new, irreducible properties at higher levels of Ifa Composition. The 256 Odu Ifa are not 256 isolated laws: they are an emergent structure arising from the 16 Oju Odu through the Amulu operation. At each level of composition, new properties emerge that cannot be predicted from — or reduced to — the properties of the component Odu alone. Life emerges from chemistry; consciousness from biology; civilisations from individuals; the IFA Internet from individual knowledge fields. All emergence follows the Ifa Emergence Principle of Òdí: the whole is always more than any sum can capture.',
    math: [
      { label: 'Emergence Inequality',  expr: 'Ẽ(A ⊕ B) > Ẽ(A) + Ẽ(B)' },
      { label: 'Odu Emergence Chain',   expr: 'Oju-Odu (16) →[Amulu]→ Odu (256) →[Amulu]→ ∞' },
      { label: 'Ifa Phase Transition',  expr: 'At critical Odu-density ρ_c: new property P emerges' },
    ],
    applications: [
      { field: 'Biology',       detail: 'Life emerges from chemistry; consciousness from neural networks — irreducible Ifa Emergence events governed by Òdí.' },
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
    subtitle: 'The Amulu Operation — 16 × 16 = 256',
    tagline: 'The binary operation at the heart of the IFA Matrix that generates all 256 Odu from 16.',
    description: 'Composition — the Amulu Operation — is the engine of the IFA Matrix. Governed by Ìrosùn, the Amulu is the Ifa Composition binary operation (⊕) that takes any two Odu and produces a third. Through Amulu, the 16 Oju Odu generate all 256 Odu: 16 ⊕ 16 = 256. The 256 Odu form a closed group under Amulu with Ogbé as the identity element (Ogbé ⊕ X = X for all X). The Amulu is both the mathematical foundation of IfaGebra and the practical tool for all Ifa Modelling, Orisa Modelling, and knowledge integration across the IFA Matrix Platform. Every composition in science, music, architecture, and code is an instance of Ifa Amulu.',
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
    subtitle: 'The Whole Exceeds Its Parts',
    tagline: 'The IFA Matrix as a holistic system — irreducible to any proper subset of its 256 Odu.',
    description: 'Holism is governed by Òwónrín — the Odu that encodes the irreducible wholeness of any complete Ifa system. The IFA Matrix as a whole is more than the sum of its 256 Odu; Ifa Field Theory asserts that the Ogbé Base-Field is the Whole of Existence from which all parts are perspectives, projections, and sub-configurations. Ifa Holism provides the necessary counterweight to Reductionism (Òbàrà): both are essential for complete knowledge. Holism prevents false decomposition, honours emergent properties, and ensures that knowledge systems retain their living Ifa integrity. The Ifa Holographic Principle — that the information of the whole is encoded in each Odu — is the mathematical expression of Òwónrín.',
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
    subtitle: 'The First Principles of All Knowledge',
    tagline: 'Reducing any field of knowledge to its Odu Ifa foundations — the 256 base axioms of existence.',
    description: 'Reductionism is governed by Òbàrà — the Odu that encodes the power of first-principles analysis. Ifa Reductionism holds that any knowledge system, any natural phenomenon, any field of enquiry can be decomposed into its constituent Odu Ifa. The 256 Odu are the ultimate base: every equation in physics, every gene in biology, every axiom in mathematics, every economic model corresponds to an Odu or a composition of Odu. Ifa Reductionism is the analytic complement to Ifa Holism (Òwónrín): together they define the complete range of Ifa knowledge method — analysis and synthesis, decomposition and integration, reduction and holism in balanced Ifa Duality.',
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
    name: 'Simulation',
    odu: 'Òkànràn',
    type: 'O',
    color: '#ec4899',
    symbol: '◈',
    subtitle: 'Reality as BaseField Simulation',
    tagline: 'All existence is an Ifa Simulation running on the Ogbé BaseField — and the IFA Matrix is its code.',
    description: 'Simulation — the "X" of Others — is governed by Òkànràn, the Odu of the unexpected, the beyond-category, and the unknown that contains all unknowns. Ifa Simulation Theory holds that all physical, biological, social, and mental reality is a simulation running on the Ogbé BaseField, executing Odu update rules through the Amulu operation. This generalises and supersedes conventional simulation hypotheses: in the IFA Matrix, the simulation is not a conjecture but the definitional structure of existence. The IFA Matrix Platform enables direct engineering of this simulation through Ifa Technologies — writing Odu code to shape fields of reality across all disciplines.',
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

// ─── SHARED COMPONENTS ─────────────────────────────────────────────────────────

function IfaSigil({ label, sub, color, single }) {
  return (
    <div className="ifa-sigil" style={{ '--sigil-color': color }}>
      <div className="ifa-sigil__marks">
        {[0,1,2,3].map(i => (
          <div key={i} className={`ifa-mark ifa-mark--${single ? 'single' : 'double'}`}>
            {single
              ? <div className="ifa-mark__bar" />
              : <><div className="ifa-mark__bar" /><div className="ifa-mark__bar" /></>
            }
          </div>
        ))}
      </div>
      <div className="ifa-sigil__label">{label}</div>
      {sub && <div className="ifa-sigil__sub">{sub}</div>}
    </div>
  );
}

// ─── HEADER ────────────────────────────────────────────────────────────────────

function Header({ onHome, onPortal, currentView }) {
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
              <a className="nav-link" href="#foundation">Foundation</a>
              <a className="nav-link" href="#portals">SIDECHRX</a>
              <a className="nav-link" href="#applications">Applications</a>
              <a className="nav-link" href="https://toe.cenproject.org/ifa-matrix/"
                 target="_blank" rel="noopener noreferrer">IFA Matrix (TOE)</a>
              <a className="nav-link" href="https://toe.cenproject.org/ifagebra-overview/"
                 target="_blank" rel="noopener noreferrer">IfaGebra</a>
              <a className="nav-link nav-link--cta" href="../" >IFA Internet</a>
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
            The <strong>IFA Matrix</strong> is the Matrix of Everything (MatxoE) — the STEAMSEX Matrix, CEN Matrix, and Amulu Matrix unified. Grounded in the <strong>256 Odu Ifa</strong> and the Ogbé–Òyèkú interaction, the IFA Matrix Platform provides the modelling, simulation, design, and engineering tools for all fields of knowledge on the IFA Internet.
          </p>

          <div className="hero__ctas">
            <a href="#portals" className="btn btn--primary">Explore SIDECHRX Portals</a>
            <a href="#foundation" className="btn btn--ghost">The Mathematical Foundation</a>
          </div>
        </div>

        <div className="hero__right" aria-hidden="true">
          <div className="matrix-dual">
            <div className="matrix-dual__top">
              <IfaSigil label="Ogbé" sub="Base-Field" color="#f0920c" single={true} />
              <div className="matrix-dual__op">
                <div className="matrix-dual__op-sym">⊕</div>
                <div className="matrix-dual__op-label">Amulu</div>
              </div>
              <IfaSigil label="Òyèkú" sub="Superpartner" color="#6366f1" single={false} />
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

// ─── FOUNDATION SECTION ────────────────────────────────────────────────────────

function FoundationSection() {
  return (
    <section className="section section--alt" id="foundation">
      <div className="container">
        <div className="section__header section__header--center">
          <span className="section__eyebrow section__eyebrow--amber">Mathematical Foundation</span>
          <h2 className="section__title">
            The <span className="accent--amber">16 Oju Odu</span> and the <span className="accent--violet">256 IFA Matrix</span>
          </h2>
          <p className="section__subtitle">
            The 16 Principal Ifa Codes are the foundational axioms of all knowledge. Through the Amulu (⊕) composition operation, they generate the full 256-dimensional IFA Matrix — the standard model of all existence.
          </p>
        </div>

        <div className="foundation-layout">
          <div className="foundation-text">
            <h3>Ogbé and Òyèkú — The Master Interaction</h3>
            <p>
              All meta-structures of the IFA Matrix are based on the interaction between the <strong>IFA Matrix</strong>, Ogbé — the Base-Field, the Whole of Existence — and its Superpartner Dual, <strong>Òyèkú</strong>. Ogbé is the identity element of the Amulu group; Òyèkú is its complement. Their interaction, governed by the Amulu operation, generates the full 16-dimensional Oju Odu space.
            </p>

            <div className="amulu-formula">
              <div className="amulu-formula__label">The Amulu Operation</div>
              <div className="amulu-formula__expr">Odu_i ⊕ Odu_j = Odu_k</div>
              <div className="amulu-formula__note">where ⊕ is the Ifa Composition (Amulu) binary operation</div>
            </div>

            <div className="amulu-formula">
              <div className="amulu-formula__label">IFA Matrix Generation</div>
              <div className="amulu-formula__expr">16 Oju Odu ×[Amulu]× 16 = 256 Odu</div>
              <div className="amulu-formula__note">The Ojú Odù Ifá Mẹrindínlógún generating the full matrix</div>
            </div>

            <h3>The SIDECHRX Principle Set</h3>
            <p>
              The SIDECHRX Principle Set arises naturally when the 16 Oju Odu are studied mathematically, scientifically, and philosophically. The first 8 Oju Odu — Ogbé through Òkànràn — map to the 8 primary meta-laws. The remaining 8 — Ògúndá through Òfún — are their Anti-Laws, forming the complete 16-law system governing all fields.
            </p>

            <div className="foundation-pills">
              <span className="fpill fpill--amber">Ogbé = S (Symmetry)</span>
              <span className="fpill fpill--violet">Òyèkú = I (Invariance)</span>
              <span className="fpill fpill--cyan">Ìwòrì = D (Duality)</span>
              <span className="fpill fpill--jade">Òdí = E (Emergence)</span>
            </div>
          </div>

          <div>
            <div style={{ marginBottom: '10px', fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-3)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Ojú Odù Ifá Mẹrindínlógún — The 16 Principal Ifa Codes
            </div>
            <div className="odu-grid">
              {ODU_16.map(o => (
                <div key={o.n} className="odu-cell" style={{ '--c': o.color }}>
                  <div className="odu-cell__num">{o.n}</div>
                  <div className="odu-cell__letter">{o.letter}</div>
                  <div className="odu-cell__name">{o.name}</div>
                  <div className={`odu-cell__type odu-cell__type--${o.type}`}>{o.type}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '12px', display: 'flex', gap: '12px', fontSize: '0.68rem', color: 'var(--text-3)' }}>
              <span><span style={{ color: 'var(--amber)', fontWeight: 700 }}>O</span> = Ogbe-type (open)</span>
              <span><span style={{ color: 'var(--violet)', fontWeight: 700 }}>I</span> = Iyere-type (inverse)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── PORTALS SECTION ───────────────────────────────────────────────────────────

function PortalsSection({ onOpenPortal }) {
  return (
    <section className="section" id="portals">
      <div className="container">
        <div className="section__header section__header--center">
          <span className="section__eyebrow section__eyebrow--violet">SIDECHRX Principle Set</span>
          <h2 className="section__title">
            The <span className="accent--amber">8 Primary Portals</span> of the IFA Matrix
          </h2>
          <p className="section__subtitle">
            Each portal opens the full framework for Ifa Modelling, Orisa Modelling, Simulation, Design, and Technology development through the lens of one of the 8 primary meta-laws of Ifa.
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
              <div className="portal-card__odu-row">
                <span className="portal-card__odu-name">Odu: {p.odu}</span>
                <span className={`portal-card__type portal-card__type--${p.type}`}>{p.type}</span>
              </div>
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

function ApplicationsSection() {
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
        <div style={{
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flexShrink: 0 }}>
            <a href="https://toe.cenproject.org/ifagebra-overview/" target="_blank" rel="noopener noreferrer" className="btn btn--primary">
              Explore IfaGebra
            </a>
            <a href="https://toe.cenproject.org/ifa-matrix/" target="_blank" rel="noopener noreferrer" className="btn btn--ghost">
              IFA Matrix (TOE)
            </a>
          </div>
        </div>
      </div>
    </section>
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
            <div className="portal-hero__odu-pill">{p.odu}</div>
            <div className={`portal-hero__type-pill portal-hero__type-pill--${p.type}`}>{p.type}</div>
          </div>
          <div className="portal-hero__meta">
            <div className="portal-hero__eyebrow" style={{ color: p.color }}>
              SIDECHRX Portal · Ojú Odù Ifá Mẹrindínlógún
            </div>
            <h1 className="portal-hero__title">{p.name}</h1>
            <div className="portal-hero__subtitle">{p.subtitle}</div>
            <div className="portal-hero__tagline" style={{ color: p.color }}>"{p.tagline}"</div>
            <p className="portal-hero__desc">{p.description}</p>
          </div>
        </div>
      </div>

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
              Part of the <a href="https://cenproject.org/" className="footer__link-inline">CENProject</a> — Consciousness-Energy Research.
            </p>
          </div>
          <nav className="footer__links">
            <a href="#foundation"  className="footer__link">Mathematical Foundation</a>
            <a href="#portals"     className="footer__link">SIDECHRX Portals</a>
            <a href="#applications" className="footer__link">Applications</a>
            <a href="https://toe.cenproject.org/ifa-matrix/"          target="_blank" rel="noopener noreferrer" className="footer__link">IFA Matrix (TOE)</a>
            <a href="https://toe.cenproject.org/ifagebra-overview/"   target="_blank" rel="noopener noreferrer" className="footer__link">IfaGebra</a>
            <a href="../" className="footer__link">IFA Internet</a>
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
  const [view, setView] = useState(null); // null = home, or letter string = portal

  const openPortal = (letter) => {
    setView(letter);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const goHome = () => {
    setView(null);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // Listen for inter-portal navigation from PortalPage bottom bar
  useEffect(() => {
    const handler = (e) => openPortal(e.detail);
    window.addEventListener('ifa-portal', handler);
    return () => window.removeEventListener('ifa-portal', handler);
  }, []);

  const principle = SIDECHRX.find(p => p.letter === view);

  return (
    <>
      <Header onHome={goHome} onPortal={openPortal} currentView={view} />
      {view === null ? (
        <main>
          <HeroSection />
          <FoundationSection />
          <PortalsSection onOpenPortal={openPortal} />
          <ApplicationsSection />
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
