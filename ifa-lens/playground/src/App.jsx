/* ─────────────────────────────────────────────────────────────
   IfaLens Playground — IfaView · ToE View
   Interactive Ifa Periodic Table of Everything (PToE)
   STEAMSEX Field Grid · 0 + 8D SIDECHRX Matrix Explorer
   React 18 + JSX via Babel Standalone · no build step
   CENProject · IFA Internet
───────────────────────────────────────────────────────────── */

const { useState, useEffect, useCallback } = React;

/* ── STEAMSEX — 8 Field Category Axes (Grid Columns + Rows) ── */
const STEAMSEX = [
  { id: 'S1', code: 'S', name: 'Natural Science',  color: '#4aa3ff', icon: '⚗',  full: 'Natural Science (S)' },
  { id: 'T',  code: 'T', name: 'Technology',        color: '#00d9b8', icon: '⌬',  full: 'Technology (T)' },
  { id: 'E1', code: 'E', name: 'Engineering',        color: '#f5c518', icon: '⚙',  full: 'Engineering (E)' },
  { id: 'A',  code: 'A', name: 'Arts',               color: '#e9498a', icon: '✦',  full: 'Arts (A)' },
  { id: 'M',  code: 'M', name: 'Mathematics',        color: '#a855f7', icon: '∑',  full: 'Mathematics (M)' },
  { id: 'S2', code: 'S', name: 'Social Science',     color: '#00c87c', icon: '⊛',  full: 'Social Science (S)' },
  { id: 'E2', code: 'E', name: 'Education',          color: '#ff8c35', icon: '⬡',  full: 'Education (E)' },
  { id: 'X',  code: 'X', name: 'Others',             color: '#8892a4', icon: '◈',  full: 'Others (X)' },
];

/* ── SIDECHRX — 0+8D Exploration Matrix Dimensions ─────────── */
const SIDECHRX = [
  { id: 'S', name: 'Symmetry',      short: 'Sym',  color: '#4aa3ff', icon: '⬡' },
  { id: 'I', name: 'Invariance',    short: 'Inv',  color: '#00d9b8', icon: '∞' },
  { id: 'D', name: 'Duality',       short: 'Dual', color: '#f5c518', icon: '⇌' },
  { id: 'E', name: 'Emergence',     short: 'Emg',  color: '#e9498a', icon: '↑' },
  { id: 'C', name: 'Composition',   short: 'Comp', color: '#a855f7', icon: '⊕' },
  { id: 'H', name: 'Holism',        short: 'Hol',  color: '#00c87c', icon: '◎' },
  { id: 'R', name: 'Reductionism',  short: 'Red',  color: '#ff8c35', icon: '↓' },
  { id: 'X', name: 'eXpansion',     short: 'Xpn',  color: '#8892a4', icon: '◈' },
];

/* ── PToE Cell Data — columns follow STEAMSEX order ────────── */
const PTOE_DATA = [
  /* col 0 — Natural Science (S) */
  { id: 'neuroscience', row: 1, col: 0, name: 'Neuroscience',            ifaName: 'Ifa Neuroscience',           alias: 'IfaNeuro'    },
  { id: 'physics',      row: 2, col: 0, name: 'Physics',                 ifaName: 'Ifa Physics',                alias: 'IfaPhy'      },
  { id: 'chemistry',    row: 3, col: 0, name: 'Chemistry',               ifaName: 'Ifa Chemistry',              alias: 'IfaChem'     },
  { id: 'biology',      row: 4, col: 0, name: 'Biology',                 ifaName: 'Ifa Biology',                alias: 'IfaBio'      },
  { id: 'comp-sci',     row: 5, col: 0, name: 'Computer Science',        ifaName: 'Ifa Computer Science',       alias: 'IfaCS'       },
  { id: 'geology',      row: 6, col: 0, name: 'Geology',                 ifaName: 'Ifa Geology',                alias: 'IfaGeo'      },
  /* col 1 — Technology (T) */
  { id: 'neurotech',    row: 1, col: 1, name: 'Neurotechnology',         ifaName: 'Ifa Neurotechnology',        alias: 'IfaNeurot'   },
  { id: 'biotech',      row: 2, col: 1, name: 'Biotechnology',           ifaName: 'Ifa Biotechnology',          alias: 'IfaBiotech'  },
  { id: 'robotics',     row: 3, col: 1, name: 'Robotics',                ifaName: 'Ifa Robotics',               alias: 'IfaRob'      },
  { id: 'nanotech',     row: 4, col: 1, name: 'Nanotechnology',          ifaName: 'Ifa Nanotechnology',         alias: 'IfaNano'     },
  { id: 'ai',           row: 5, col: 1, name: 'Artificial Intelligence', ifaName: 'Ifa Artificial Intelligence',alias: 'IfaAI'       },
  { id: 'energy-tech',  row: 6, col: 1, name: 'Energy Technology',       ifaName: 'Ifa Energy Technology',      alias: 'IfaEnT'      },
  /* col 2 — Engineering (E) */
  { id: 'mech-eng',     row: 1, col: 2, name: 'Mechanical Eng.',         ifaName: 'Ifa Mechanical Engineering', alias: 'IfaMechEng'  },
  { id: 'civil-eng',    row: 2, col: 2, name: 'Civil Engineering',       ifaName: 'Ifa Civil Engineering',      alias: 'IfaCivEng'   },
  { id: 'chem-eng',     row: 3, col: 2, name: 'Chemical Engineering',    ifaName: 'Ifa Chemical Engineering',   alias: 'IfaChemEng'  },
  { id: 'bioeng',       row: 4, col: 2, name: 'Bioengineering',          ifaName: 'Ifa Bioengineering',         alias: 'IfaBioEng'   },
  { id: 'comp-eng',     row: 5, col: 2, name: 'Computer Engineering',    ifaName: 'Ifa Computer Engineering',   alias: 'IfaComEng'   },
  { id: 'petro-eng',    row: 6, col: 2, name: 'Petroleum Engineering',   ifaName: 'Ifa Petroleum Engineering',  alias: 'IfaPetEng'   },
  /* col 3 — Arts (A) */
  { id: 'visual-arts',  row: 1, col: 3, name: 'Visual Arts',             ifaName: 'Ifa Visual Arts',            alias: 'IfaVA'       },
  { id: 'literary-arts',row: 2, col: 3, name: 'Literary Arts',           ifaName: 'Ifa Literary Arts',          alias: 'IfaLitA'     },
  { id: 'perf-arts',    row: 3, col: 3, name: 'Performing Arts',         ifaName: 'Ifa Performing Arts',        alias: 'IfaPerA'     },
  { id: 'music',        row: 4, col: 3, name: 'Music',                   ifaName: 'Ifa Music',                  alias: 'IfaMusic'    },
  { id: 'philosophy',   row: 5, col: 3, name: 'Philosophy',              ifaName: 'Ifa Philosophy',             alias: 'IfaPhi'      },
  { id: 'film-media',   row: 6, col: 3, name: 'Film & Media Arts',       ifaName: 'Ifa Film & Media Arts',      alias: 'IfaFilm'     },
  /* col 4 — Mathematics (M) */
  { id: 'arithmetic',   row: 1, col: 4, name: 'Arithmetic',              ifaName: 'Ifa Arithmetic',             alias: 'IfaArith'    },
  { id: 'algebra',      row: 2, col: 4, name: 'Algebra',                 ifaName: 'Ifa Algebra',                alias: 'IfaGebra'    },
  { id: 'geometry',     row: 3, col: 4, name: 'Geometry',                ifaName: 'Ifa Geometry',               alias: 'IfaGeom'     },
  { id: 'trigonometry', row: 4, col: 4, name: 'Trigonometry',            ifaName: 'Ifa Trigonometry',           alias: 'IfaTrig'     },
  { id: 'calculus',     row: 5, col: 4, name: 'Calculus',                ifaName: 'Ifa Calculus',               alias: 'IfaCalc'     },
  { id: 'stats',        row: 6, col: 4, name: 'Statistics & Prob.',      ifaName: 'Ifa Statistics',             alias: 'IfaStat'     },
  /* col 5 — Social Science (S) */
  { id: 'sociology',    row: 1, col: 5, name: 'Sociology',               ifaName: 'Ifa Sociology',              alias: 'IfaSoc'      },
  { id: 'economics',    row: 2, col: 5, name: 'Economics',               ifaName: 'Ifa Economics',              alias: 'IfaEcon'     },
  { id: 'anthropology', row: 3, col: 5, name: 'Anthropology',            ifaName: 'Ifa Anthropology',           alias: 'IfaAnth'     },
  { id: 'psychology',   row: 4, col: 5, name: 'Psychology',              ifaName: 'Ifa Psychology',             alias: 'IfaPsych'    },
  { id: 'political-sci',row: 5, col: 5, name: 'Political Science',       ifaName: 'Ifa Political Science',      alias: 'IfaPolSci'   },
  { id: 'history',      row: 6, col: 5, name: 'History',                 ifaName: 'Ifa History',                alias: 'IfaHist'     },
  /* col 6 — Education (E) */
  { id: 'sci-edu',      row: 1, col: 6, name: 'Science Education',       ifaName: 'Ifa Science Education',      alias: 'IfaSciEdu'   },
  { id: 'adult-edu',    row: 2, col: 6, name: 'Adult Education',         ifaName: 'Ifa Adult Education',        alias: 'IfaAdEdu'    },
  { id: 'early-edu',    row: 3, col: 6, name: 'Early Childhood Edu.',    ifaName: 'Ifa Early Childhood Edu.',   alias: 'IfaECE'      },
  { id: 'special-edu',  row: 4, col: 6, name: 'Special Education',       ifaName: 'Ifa Special Education',      alias: 'IfaSpEdu'    },
  { id: 'edu-psych',    row: 5, col: 6, name: 'Educational Psychology',  ifaName: 'Ifa Educational Psychology', alias: 'IfaEdPsy'    },
  { id: 'comp-intl-edu',row: 6, col: 6, name: 'Comparative & Intl. Edu.',ifaName: 'Ifa Comparative & Intl. Edu.',alias: 'IfaCIE'    },
  /* col 7 — Others (X) */
  { id: 'x1', row: 1, col: 7, name: 'X₁', ifaName: 'Ifa X₁', alias: null },
  { id: 'x2', row: 2, col: 7, name: 'X₂', ifaName: 'Ifa X₂', alias: null },
  { id: 'x3', row: 3, col: 7, name: 'X₃', ifaName: 'Ifa X₃', alias: null },
  { id: 'x4', row: 4, col: 7, name: 'X₄', ifaName: 'Ifa X₄', alias: null },
  { id: 'x5', row: 5, col: 7, name: 'X₅', ifaName: 'Ifa X₅', alias: null },
  { id: 'x6', row: 6, col: 7, name: 'X₆', ifaName: 'Ifa X₆', alias: null },
];

/* ── SIDECHRX content overrides per discipline ──────────────── */
const MATRIX_OVERRIDES = {
  physics: {
    S: 'Physics is built on fundamental symmetries — Noether\'s theorem proves that every continuous symmetry generates a conservation law (time→energy, space→momentum, rotation→angular momentum). CPT symmetry, gauge invariance, and Lorentz symmetry are the cornerstones of modern physics, mapped in IfaPhysics to the bilateral architecture of the Odu.',
    I: 'Physical constants (c, ℏ, G, α) remain invariant across the entire observable universe. The principle of relativity — that physical laws are invariant across all inertial frames — is the foundation of special and general relativity. Ifa Invariance encodes these constants as axiomatic properties of the CEN field.',
    D: 'Wave-particle duality (de Broglie, Born), electric-magnetic duality (Maxwell), matter-antimatter duality (Dirac), and the AdS/CFT duality are profound complementary pairs in Physics. Every duality in IfaPhysics is a manifestation of the IFA Binary structure — Ogbe (I) and Oyeku (II).',
    E: 'Thermodynamics and entropy emerge from statistical mechanics; superconductivity and magnetism emerge from quantum many-body systems; spacetime geometry emerges from quantum gravity. Physics is the science of emergence from the Planck scale to the cosmological scale, encoded in the Odu hierarchy.',
    C: 'Physics composes with every knowledge field — biophysics, physical chemistry, mathematical physics, astrophysics, and geophysics. The Lagrangian and Hamiltonian frameworks formally compose physical systems into unified descriptions. IfaPhysics is the physical Amulu of the TOE.',
    H: 'Quantum entanglement, the holographic principle, and unified field theory reveal that physical reality is irreducibly holistic — the universe is a single entangled quantum field. IfaPhysics grounds this in Ifa Holism: the Totality of Existence (TOE) is the ultimate physical system.',
    R: 'Physics pursues ultimate reductionism — from macroscopic to atomic, subatomic, quark-gluon, and string levels. The Standard Model reduces all observable matter to 17 fundamental fields. IfaPhysics grounds this reduction in the 16 Principal Odu as the axiomatic fields of all physical reality.',
    X: 'Physics extends into philosophy of science (quantum ontology, measurement problem), consciousness studies (quantum mind), cosmology (multiverse), and IfaPhysics — where the CEN field (Consciousness-Energy-Nature) is the unified substrate of all physical law in the IFA Internet.',
  },
  biology: {
    S: 'Biology exhibits profound symmetry — bilateral body plans, the DNA double helix (twofold symmetry), Fibonacci phyllotaxis in plants, and evolutionary convergence (similar forms arising independently). In IfaBiology, symmetry reflects the axiomatic IFA Binary encoded in all living forms.',
    I: 'The genetic code is universal (codon→amino acid invariant across all life), natural selection is invariant as the law of biological change, and metabolic energy conservation is invariant across all organisms. These biological invariants map to the constant laws of the Odu Ifa.',
    D: 'DNA/RNA (storage/expression), anabolism/catabolism (build/break), predator/prey, nature/nurture, and cell division/differentiation are the foundational dualities of biology — each a manifestation of Ogbe (energy) and Oyeku (anergy) in living systems.',
    E: 'Life itself is the supreme emergence — consciousness from neural networks, ecosystems from species interactions, multicellular organisms from single cells, and the biosphere from molecular chemistry. Every level of biological organisation is an emergent Odu encoding of CEN Energy.',
    C: 'Biology composes with chemistry (biochemistry), physics (biophysics), mathematics (biomathematics), engineering (bioengineering), and computing (bioinformatics). IfaBiology\'s Amulu with all fields makes it the central node of the life sciences within the IFA Internet.',
    H: 'Ecosystems, biomes, and the Gaia hypothesis reveal living systems that transcend reductionist analysis. Systems biology and holistic medicine treat the organism as a whole greater than its parts. Ifa Holism grounds this in the living Totality of Existence as the ultimate biological system.',
    R: 'Biology reduces cells to organelles, organelles to molecules, molecules to atoms — the central dogma reduces biology to chemistry to physics. Molecular biology\'s reductionist programme has identified genes as biological axioms. IfaBiology traces these to the 16 Principal Odu.',
    X: 'Biology extends into astrobiology (cosmic life), quantum biology (photosynthesis coherence), consciousness biology (neuroscience frontier), and IfaBiology — where all living forms are CEN Energy manifestations studied through the 256 Odu Ifa as the axiomatic matrix of life.',
  },
  chemistry: {
    S: 'Molecular symmetry (point groups, crystal symmetry) governs chemical bonding and spectra. Chirality — the absence of mirror symmetry — determines drug efficacy. The periodic table itself is a symmetry structure. IfaChemistry maps these symmetries to Odu-encoded energy configurations.',
    I: 'Conservation of mass-energy in every chemical reaction, the periodic law (invariant properties per electron configuration), and stoichiometric ratios are the invariants of Chemistry. Ifa Invariance encodes these as axiomatic constraints on all matter-CEN transformations.',
    D: 'Acid-base duality (proton donor/acceptor), oxidation-reduction (electron donor/acceptor), bond polarity (ionic/covalent), and reactant-product duality structure all chemical understanding. These are Ogbe/Oyeku energetic exchanges encoded in molecular transformations.',
    E: 'Complex material properties emerge from simple molecular structures — superconductivity, polymer elasticity, and liquid crystal behaviour are all emergent chemical phenomena. Life itself emerged from chemistry. Chemistry is the science of emergent matter-CEN complexity.',
    C: 'Chemistry composes with biology (biochemistry), physics (physical chemistry), engineering (chemical engineering), medicine (pharmaceutical chemistry), and environmental science. Ifa Amulu makes IfaChemistry the compositional bridge between matter and all other knowledge fields.',
    H: 'Green chemistry, systems chemistry, and the chemistry of living systems reveal that chemical behaviour cannot be understood by studying molecules in isolation. The atmosphere, oceans, and biosphere are holistic chemical systems — studied in IfaChemistry as TOE-level CEN fields.',
    R: 'Chemistry reduces molecules to atoms, atoms to electrons/protons/neutrons, electrons to quantum states. The periodic table is a reductionist masterpiece — all chemistry reduces to electron configuration. IfaChemistry grounds this in the 16 Principal Odu as the axiomatic electron archetypes.',
    X: 'Chemistry extends into IfaAlchemy (the metaphysical transformation science), computational chemistry, quantum chemistry, astrochemistry (interstellar molecules), and IfaChemistry — where matter transformation is studied as Ẹbọ energy exchange across all dimensions of reality.',
  },
  'comp-sci': {
    S: 'Computational symmetry includes algorithmic isomorphism (equivalent computation across different representations), palindromic data structures, and reversible computation. Graph automorphisms and symmetric algorithms are central to CS theory. IfaCS maps these to the symmetric structure of the Odu matrix.',
    I: 'The Church-Turing thesis asserts that all models of computation are equivalent (computational invariance). Turing completeness is the invariant threshold. Algorithmic complexity classes (P, NP) are invariants of computational resources. IfaCS encodes these as axiomatic laws of digital-CEN.',
    D: 'Hardware/software, analog/digital, data/computation, deterministic/probabilistic, compile-time/runtime, and client/server are the foundational dualities of CS. Every duality in computer science reflects the IFA Binary — Ogbe (computation) and Oyeku (data storage).',
    E: 'Complex AI systems emerge from simple matrix multiplications; the internet emerges from basic TCP/IP protocols; operating systems emerge from elementary logic gates. CS is the science of designed emergence — creating intelligent complexity from IFA Binary (0 and 1).',
    C: 'CS composes with every field — computational biology, digital humanities, computational physics, economic computing, and educational technology. The IFA Internet itself is CS as universal Amulu — the formal composition of all knowledge fields in a digital TOE architecture.',
    H: 'The internet, cloud computing, and distributed systems cannot be understood by examining individual nodes alone. The digital commons, social media ecosystems, and global networks are holistic CS systems. IfaCS grounds this in the Totality of Existence as the ultimate computing system.',
    R: 'CS reduces programs to functions, functions to operations, operations to Boolean logic, Boolean logic to bits — the ultimate reduction being Ogbe (1) and Oyeku (0) as the IFA Binary substrate of all computation. The IFA Internet traces all CS to the 256 Odu as the axiomatic program of existence.',
    X: 'CS extends into quantum computing (qubits beyond classical bits), consciousness-computation theory (IIT, global workspace), IfaAlgorithms (Odu-based computational structures), and the IFA Internet — the living meta-computer of the Totality of Existence built on CEN Energy principles.',
  },
  algebra: {
    S: 'Group symmetry (Galois theory connecting polynomial symmetries to group theory), ring symmetry, and algebraic symmetry operations are foundational. The symmetry groups of geometry (rotations, reflections) are fully described algebraically. IfaGebra encodes all symmetry groups in the 256 Odu.',
    I: 'Ring axioms, group laws, and the fundamental theorem of algebra are invariant — they hold regardless of the specific algebraic object. The identity element and inverse are invariant structural requirements. IfaGebra defines these invariants through the 16 Principal Ifa Axioms (IfaAxioms).',
    D: 'Linear/non-linear, commutative/non-commutative (Abelian/non-Abelian groups), real/complex, scalar/vector, and kernel/image dualities structure all of algebra. IfaGebra grounds every algebraic duality in IFA Binary — the primal duality from which all algebraic structure unfolds.',
    E: 'Complex algebraic structures emerge from simple axioms — fields emerge from rings, rings from groups, and entire number systems (ℝ, ℂ, ℚ) emerge from axiomatic definitions. Abstract algebra shows that rich mathematical worlds emerge from minimal sets of axioms: the Odu principle.',
    C: 'Abstract algebra composes all mathematics — linear algebra is the language of physics, group theory is the language of chemistry, category theory composes all mathematical fields. IfaGebra (TOEGebra) is the formal algebraic Amulu of the TOE — composing all knowledge fields algebraically.',
    H: 'Category theory studies algebraic structures and their mappings holistically — the mathematical whole transcends any individual object. Universal algebra studies properties common to all algebraic systems. IfaGebra\'s 16 Axioms provide the holistic algebraic foundation of the entire IFA Internet.',
    R: 'Algebra reduces groups to generators and relations, fields to prime fields, and all structures to axioms. IfaGebra traces every algebraic law to the 16 Principal Odu as the irreducible axiomatic basis — with the 256 Odu forming the complete algebraic matrix of all possible knowledge operations.',
    X: 'Algebra extends into tropical algebra (min-plus), quantum algebra (non-commutative geometry), IfaGebra (the Algebra of Everything via Odu-axioms), and abstract category theory — where algebra becomes a universal meta-language for all of mathematics and, through IfaGebra, all of existence.',
  },
  ai: {
    S: 'Neural network weight symmetry (permutation of equivalent neurons), attention symmetry in transformers, and data augmentation symmetry (invariance under rotation/translation) are AI symmetry principles. IfaAI maps these to the symmetric Odu matrix underlying all intelligence architectures.',
    I: 'Universal function approximation (neural networks can approximate any continuous function) and the backpropagation invariant (gradient flow as the invariant learning signal) are foundational AI invariants. IfaAI encodes intelligence as an invariant CEN property across all substrates.',
    D: 'Model/data, supervised/unsupervised, training/inference, exploration/exploitation, and symbolic/connectionist are the foundational AI dualities. The mind-body duality maps to the AI software-hardware duality. IfaAI grounds all these in the IFA Binary — the primal computation of Ogbe and Oyeku.',
    E: 'Language understanding, creative generation, and strategic reasoning all emerge from the simple matrix multiplication of neural networks. Intelligence itself is an emergent CEN property — GPT\'s language from statistics, AlphaGo\'s strategy from self-play, consciousness from neural dynamics.',
    C: 'AI composes with every field: AI + Physics = Physics-Informed NNs, AI + Medicine = diagnostic AI, AI + Art = generative art, AI + Education = personalised learning. IfaAI is the technological Amulu of the IFA Internet — the universal composition engine of all knowledge fields.',
    H: 'No AI system can be understood by examining individual weights — intelligence is a holistic emergent property of the full network. AGI research and consciousness-AI theory approach AI as a holistic system. IfaAI grounds machine intelligence in the Totality of Existence as the ultimate AI context.',
    R: 'AI reduces to neural layers, layers to weight matrices, matrices to arithmetic operations, operations to floating-point bits, bits to IFA Binary (Ogbe/Oyeku). IfaAI traces all intelligence to the 16 Principal Odu as the axiomatic CEN operations underlying all computational cognition.',
    X: 'AI extends into AGI (general intelligence beyond specific tasks), consciousness-AI (machine phenomenology), quantum AI (quantum-enhanced ML), IfaAI (Odu-based reasoning), and the role of AI in running the IFA Internet — where intelligence is recognised as a CEN Energy manifestation.',
  },
  calculus: {
    S: 'Calculus is built on symmetry — even/odd function decomposition, Fourier series (symmetric basis functions), and the symmetric form of Green\'s theorem. Differential equations often exhibit symmetry groups that reduce their complexity. IfaCalculus maps these to the Odu\'s bilateral symmetry.',
    I: 'The Fundamental Theorem of Calculus (linking differentiation and integration) is the supreme invariant of the field. The chain rule, integration by parts, and L\'Hôpital\'s rule are invariant operational laws. Ifa Invariance encodes these as the unchanging logical backbone of continuous mathematics.',
    D: 'Differentiation/integration (inverse operations — the supreme duality of calculus), discrete/continuous (the transition calculus makes possible), local/global (the derivative captures local behaviour; the integral captures global), and finite/infinite are the structural dualities of calculus.',
    E: 'All emergent physical phenomena are modelled by differential equations — fluid flow (Navier-Stokes), heat diffusion, electromagnetic waves (Maxwell), quantum mechanics (Schrödinger). Calculus is the language of emergence: how global behaviour emerges from local rates of change.',
    C: 'Calculus composes with physics (classical mechanics, electrodynamics), engineering (control systems, signal processing), economics (marginal analysis, optimisation), biology (population models), and CS (gradient descent in AI). IfaCalculus is the continuous Amulu of all dynamical knowledge.',
    H: 'The integral is a holistic operation — it captures the cumulative whole from individual infinitesimal contributions. Green\'s theorem and Stokes\' theorem relate local properties (derivatives) to global properties (integrals) — the mathematical expression of Ifa Holism in continuous systems.',
    R: 'Calculus reduces continuous phenomena to limits, limits to epsilon-delta definitions, and epsilon-delta to the axioms of real numbers (completeness). IfaCalculus grounds this chain of reduction in the 16 Principal Odu as the axiomatic continuity principles underlying all change in the TOE.',
    X: 'Calculus extends into fractional calculus (derivatives of non-integer order), stochastic calculus (randomness in continuous systems), IfaCalculus (CEN Energy dynamics modelled via Odu-differential equations), and p-adic analysis — mathematics of the infinitesimal at the frontier of existence.',
  },
  music: {
    S: 'Musical symmetry pervades composition — fugues, canons, palindrome forms (crab canons), and rhythmic retrograde. Harmonic symmetry underlies equal temperament. Spectral symmetry (Fourier decomposition of timbre) is fundamental to acoustic science. IfaMusic maps these to Odu rhythmic patterns.',
    I: 'Equal temperament establishes invariant interval ratios across all keys. Musical modes are invariant interval patterns transposed across pitch space. The physics of vibrating strings obeys invariant harmonic series laws. IfaMusic encodes these as axiomatic CEN-acoustic invariants.',
    D: 'Consonance/dissonance (harmonic tension and release), rhythm/melody (time/pitch), silence/sound (rest/note), major/minor (bright/dark), and improvisation/composition are music\'s foundational dualities — all expressions of Ogbe (sounding energy) and Oyeku (silent anergy) in acoustic form.',
    E: 'Musical emotion, cultural identity, and transcendent experience all emerge from simple frequency relationships and rhythmic patterns. Jazz improvisation creates complex beauty from chord structures. A symphony\'s emotional power emerges from individual note interactions. Music is CEN Energy as emergent experience.',
    C: 'Music composes with Mathematics (music theory, Fourier analysis), Physics (acoustics), Technology (electronic music, AI composition), Social Science (cultural musicology), and Education (universal pedagogical medium). IfaMusic is the artistic Amulu — combining all knowledge fields in aesthetic CEN form.',
    H: 'A symphony cannot be understood note by note — its meaning is holistic, emergent, and cultural. Musical traditions (jazz, classical, Yoruba drumming) are holistic knowledge systems. IfaMusic grounds musical experience in the Totality of Existence — sound as the holistic expression of CEN.',
    R: 'Music reduces to phrases → notes → frequency ratios → sinusoidal waves → acoustic pressure → molecular vibration → atomic oscillation. IfaMusic\'s reductionist path leads to the CEN Energy field — sound as vibration of consciousness-energy, encoded in the Odu Ifa\'s frequency matrix.',
    X: 'Music extends into music cognition (brain and music), sound healing (CODAR frequency therapy), IfaSound (Yoruba ceremonial sound science), mathematical music theory (IfaMusic\'s formal system), and the role of music as the universal CEN Energy medium across all dimensions of existence.',
  },
  philosophy: {
    S: 'Logical symmetry (law of non-contradiction, double negation elimination), the symmetry of philosophical argument (premise ↔ conclusion), and the symmetric structure of Platonic Forms reflect Ifa Symmetry in the domain of pure thought. IfaPhilosophy maps logical symmetry to the Odu\'s axiomatic architecture.',
    I: 'Logical tautologies (p∨¬p) are invariant under all valuations. The axioms of formal logic (modus ponens, modus tollens) are invariant across all rational systems. The principle of non-contradiction is the supreme philosophical invariant. IfaPhilosophy grounds these in the 16 Principal Odu as invariant meta-laws.',
    D: 'Reason/emotion, idealism/materialism, knowledge/ignorance, being/non-being (Heidegger), determinism/free will, and appearance/reality are philosophy\'s supreme dualities. Every philosophical duality is a manifestation of IFA Binary — the primal Ogbe/Oyeku tension at the heart of all inquiry.',
    E: 'Consciousness as an emergent property of matter (physicalism), ethical systems emerging from individual moral intuitions, and language emerging from thought are philosophy\'s emergent phenomena. IfaPhilosophy treats consciousness emergence as the central problem of TOE inquiry.',
    C: 'Philosophy of science, ethics, political philosophy, aesthetics, and philosophy of mind — philosophy composes with every field as its foundational meta-discipline. IfaPhilosophy (Ifa Metaphysics) is the supreme Amulu — the compositional ground of all knowledge in the IFA Internet.',
    H: 'Metaphysics studies reality as a whole, irreducible to any single discipline. Systems philosophy and process philosophy treat existence holistically. IfaPhilosophy grounds all inquiry in Ifa Holism: the Totality of Existence (TOE) as the irreducible philosophical object.',
    R: 'Philosophy reduces knowledge to axiomatic premises → logical inference → foundational principles. Foundationalism seeks the bedrock of all knowledge. IfaPhilosophy reduces all philosophical questions to the 16 Principal Odu as the axiomatic meta-laws of existence, knowledge, and consciousness.',
    X: 'Philosophy extends into IFA Cosmology (Ifa ontology of the universe), consciousness studies (hard problem, qualia), CEN ontology (the philosophical framework of the IFA Internet), and IfaPhilosophy — where Ifa functions as the TOE meta-philosophy integrating all knowledge as CEN manifestation.',
  },
  history: {
    S: 'Historical cycles — the rise and fall of civilisations, the recurrence of revolutionary patterns, and Toynbee\'s cyclical theory — reveal symmetry in human time. Braudel\'s structural history finds symmetric long-run patterns beneath surface events. IfaHistory maps these cycles to Odu temporal periodicity.',
    I: 'Human nature is invariant across cultures and eras — the drives of power, meaning, belonging, and survival recur universally. Braudel\'s longue durée identifies geographic and climatic constraints that are invariant across historical change. IfaHistory encodes these invariants as axiomatic Odu principles.',
    D: 'Past/future, continuity/change, individual/society, action/structure, and synchrony/diachrony are history\'s foundational dualities. Every historical event is a duality between the forces of Ogbe (change, creation, innovation) and Oyeku (continuity, tradition, and dissolution).',
    E: 'Civilisations emerge from individual human actions and decisions. Empires, cultures, religions, and economic systems are emergent CEN phenomena — greater than the sum of individual human agents. History is the study of CEN emergence at civilisational scale across the timelines of existence.',
    C: 'History of science, history of art, economic history, military history, and cultural history all compose the complete historical record. IfaHistory\'s Amulu integrates all disciplinary histories into the single meta-narrative of consciousness-energy unfolding across the TOE\'s timeline.',
    H: 'Big History (from Big Bang to present) treats history as a holistic cosmic process. Civilisation theory (Spengler, Toynbee) studies civilisations as organic wholes. IfaHistory grounds historical inquiry in the Totality of Existence — the complete unfolding of CEN Energy across all time.',
    R: 'History reduces to events → actions → individual decisions → psychological drives → biological imperatives. Cliodynamics and psychohistory seek the reductionist mathematical laws of historical change. IfaHistory reduces all historical causation to the 256 Odu as the axiomatic patterns of CEN unfolding.',
    X: 'History extends into Big History (cosmic timescale), speculative history, IfaHistory (Ifa Chronology — the timeline of consciousness from primordial Odu to present), future studies, and civilisation theory — where history becomes the study of CEN Energy\'s self-unfolding across all dimensions of time.',
  },
};

/* ── SIDECHRX content generator ─────────────────────────────── */
function getMatrix(cell) {
  const n = cell.name;
  const overrides = MATRIX_OVERRIDES[cell.id] || {};
  const templates = {
    S: `Symmetry in ${n}: the fundamental symmetries, invariant patterns, and symmetric structures governing ${n}'s laws, forms, and architecture — mapped in IfaLens to the bilateral symmetry of the Odu Ifa matrix.`,
    I: `Invariance in ${n}: the conserved quantities, universal constants, and axiomatic laws that remain unchanged across all transformations within ${n} — the bedrock beneath all observable change in this field.`,
    D: `Duality in ${n}: the complementary pairs, opposing forces, and dual perspectives that coexist within ${n} — each duality a manifestation of IFA Binary (Ogbe/Oyeku), the primal complementary structure of all existence.`,
    E: `Emergence in ${n}: how complex phenomena, higher-order properties, and new forms of organisation arise from simpler interactions within ${n} — each level of emergence encoding a higher Odu in the knowledge hierarchy.`,
    C: `Composition in ${n}: how ${n} is built from sub-disciplines and how it formally composes with other knowledge fields — Ifa Amulu (Composition) describing the integral role of ${n} in the Totality of Existence (TOE).`,
    H: `Holism in ${n}: the system-level properties that transcend the sum of ${n}'s individual parts — grounded in Ifa Holism, where the Totality of Existence is the irreducible context of all knowledge and inquiry.`,
    R: `Reductionism in ${n}: the decomposition of ${n} into its most fundamental, irreducible elements and axiomatic principles — traced in IfaLens to the 16 Principal Odu as the ultimate building blocks of this field.`,
    X: `${n} in eXpansion: crossings into neighbouring fields, emerging subdisciplines, and ${n}'s polymathic role in the IFA Internet — where all knowledge converges in the CEN architecture of the Totality of Existence.`,
  };
  return SIDECHRX.map(dim => ({
    ...dim,
    desc: overrides[dim.id] || templates[dim.id],
  }));
}

/* ── Name splitter for SVG node diagram ─────────────────────── */
function splitNodeName(name) {
  const maxLen = 11;
  if (name.length <= maxLen) return [name];
  const words = name.split(' ');
  const lines = [];
  let cur = '';
  for (const w of words) {
    const test = cur ? `${cur} ${w}` : w;
    if (test.length <= maxLen) { cur = test; }
    else { if (cur) lines.push(cur); cur = w; }
  }
  if (cur) lines.push(cur);
  return lines.slice(0, 3);
}

/* ── Node Diagram — SVG hub-and-spoke visual ─────────────────── */
function NodeDiagram({ cell, steamCol }) {
  const cx = 150, cy = 150, spokeR = 98;
  const nodeR = 22;
  const nodes = SIDECHRX.map((dim, i) => {
    const angle = (i * 45 - 90) * Math.PI / 180;
    return { ...dim, x: cx + spokeR * Math.cos(angle), y: cy + spokeR * Math.sin(angle) };
  });
  const nameLines = splitNodeName(cell.name);
  const lineH = 11;
  const totalH = nameLines.length * lineH;
  const nameStartY = cy - totalH / 2 + 5;

  return (
    <div className="node-diagram" aria-hidden="true">
      <svg viewBox="0 0 300 300" width="280" height="280">
        {/* Outer guide rings */}
        <circle cx={cx} cy={cy} r={spokeR + 18} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" strokeDasharray="3 5"/>
        <circle cx={cx} cy={cy} r={spokeR - 18} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" strokeDasharray="3 5"/>

        {/* Spokes */}
        {nodes.map(n => (
          <line key={n.id}
            x1={cx} y1={cy}
            x2={n.x} y2={n.y}
            stroke={n.color}
            strokeWidth="1.4"
            strokeOpacity="0.45"
            strokeDasharray="5 4"
          />
        ))}

        {/* Central node glow */}
        <circle cx={cx} cy={cy} r={42} fill={`${steamCol.color}18`} stroke={steamCol.color} strokeWidth="1.5" strokeOpacity="0.6"/>
        <circle cx={cx} cy={cy} r={32} fill={`${steamCol.color}28`}/>

        {/* Central node label */}
        <text x={cx} y={cy - totalH / 2 - 4} textAnchor="middle" fill={steamCol.color} fontSize="7.5" fontWeight="700" letterSpacing="1.5">NODE 0</text>
        {nameLines.map((line, i) => (
          <text key={i} x={cx} y={nameStartY + i * lineH} textAnchor="middle" fill="#e8ecf2" fontSize="9" fontWeight="600">{line}</text>
        ))}

        {/* Dimension nodes */}
        {nodes.map(n => (
          <g key={n.id}>
            <circle cx={n.x} cy={n.y} r={nodeR} fill={`${n.color}20`} stroke={n.color} strokeWidth="1.5"/>
            <text x={n.x} y={n.y - 4} textAnchor="middle" fill={n.color} fontSize="12" fontWeight="800">{n.id}</text>
            <text x={n.x} y={n.y + 8} textAnchor="middle" fill="rgba(232,236,242,0.6)" fontSize="6.5">{n.short}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

/* ── Cell Modal — 0+8D SIDECHRX exploration panel ────────────── */
function CellModal({ cell, isIfa, onClose }) {
  useEffect(() => {
    if (!cell) return;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [cell]);

  useEffect(() => {
    if (!cell) return;
    const fn = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [cell, onClose]);

  if (!cell) return null;

  const matrix   = getMatrix(cell);
  const steamCol = STEAMSEX[cell.col];

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose} aria-label="Close">✕</button>

        {/* Header */}
        <div className="modal__hd">
          <div className="modal__steam-chip" style={{ '--steam-c': steamCol.color }}>
            <span className="modal__steam-icon">{steamCol.icon}</span>
            <span className="modal__steam-code">{steamCol.code}</span>
            <span className="modal__steam-name">{steamCol.name}</span>
          </div>

          <h2 className="modal__title" style={{ '--title-c': steamCol.color }}>
            {isIfa ? (
              <>
                Ifa<sub className="modal__ogbe">|</sub>{' '}{cell.name}
              </>
            ) : cell.name}
          </h2>

          {isIfa && (
            <div className="modal__ifa-expr">
              <span className="modal__ifa-label">IfaExpression</span>
              <span className="modal__ifa-val" style={{ color: steamCol.color }}>
                {cell.ifaName}
                {cell.alias && <span className="modal__alias"> · {cell.alias}</span>}
              </span>
            </div>
          )}

          <div className="modal__node-row">
            <NodeDiagram cell={cell} steamCol={steamCol} />
            <div className="modal__node-info">
              <div className="modal__matrix-badge">0 + 8D Matrix</div>
              <p className="modal__matrix-head">SIDECHRX Exploration</p>
              <p className="modal__matrix-body">
                <strong>{isIfa ? cell.ifaName : cell.name}</strong> as the central node.
                The 8 dimensions of the SIDECHRX matrix open up the complete CEN knowledge
                space of this field — from its foundational Symmetry to its polymathic eXpansion.
              </p>
              <div className="modal__sidechrx-mini">
                {SIDECHRX.map(d => (
                  <span key={d.id} className="modal__sdim-chip" style={{ '--d-c': d.color }}>
                    <span className="modal__sdim-id">{d.id}</span>
                    <span className="modal__sdim-name">{d.name}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 8D dimension cards */}
        <div className="modal__dim-grid">
          {matrix.map(dim => (
            <div key={dim.id} className="modal__dim" style={{ '--dim-c': dim.color }}>
              <div className="modal__dim-hd">
                <div className="modal__dim-id-wrap">
                  <span className="modal__dim-icon">{dim.icon}</span>
                  <span className="modal__dim-id">{dim.id}</span>
                </div>
                <div className="modal__dim-names">
                  <span className="modal__dim-name">{dim.name}</span>
                </div>
              </div>
              <p className="modal__dim-desc">{dim.desc}</p>
              <div className="modal__dim-bar" />
            </div>
          ))}
        </div>

        <div className="modal__ft">
          <span className="modal__ft-meta">
            {isIfa ? cell.ifaName : cell.name} · {steamCol.full} · 0+8D SIDECHRX Matrix
          </span>
          <button className="modal__close-btn" onClick={onClose}>Close ✕</button>
        </div>
      </div>
    </div>
  );
}

/* ── PToE Grid — STEAMSEX column layout ──────────────────────── */
function PToEGrid({ isIfa, onCellClick }) {
  const ROWS = [1, 2, 3, 4, 5, 6];
  return (
    <div className="ptoe-wrap">
      <div className="ptoe-scroll">
        <div className="ptoe-table">

          {/* Column headers — STEAMSEX */}
          <div className="ptoe-col-headers">
            <div className="ptoe-corner">
              <span className="ptoe-corner-vi">VI ↓</span>
              <span className="ptoe-corner-hi">HI →</span>
            </div>
            {STEAMSEX.map(cat => (
              <div key={cat.id} className="ptoe-col-hd" style={{ '--col-c': cat.color }}>
                <span className="ptoe-col-hd__icon">{cat.icon}</span>
                <span className="ptoe-col-hd__code">{cat.code}</span>
                <span className="ptoe-col-hd__name">
                  {isIfa ? `Ifa ${cat.name}` : cat.name}
                </span>
              </div>
            ))}
          </div>

          {/* Data rows */}
          {ROWS.map(row => {
            const cells = PTOE_DATA.filter(c => c.row === row);
            return (
              <div key={row} className="ptoe-row">
                <div className="ptoe-row-hd">
                  <span className="ptoe-row-hd__r">R{row}</span>
                  <span className="ptoe-row-hd__vi">VI</span>
                </div>
                {cells.map(cell => {
                  const cat = STEAMSEX[cell.col];
                  return (
                    <button
                      key={cell.id}
                      className="ptoe-cell"
                      style={{ '--col-c': cat.color }}
                      onClick={() => onCellClick(cell)}
                      title={`${isIfa ? cell.ifaName : cell.name} — click to open 0+8D SIDECHRX Matrix`}
                    >
                      {isIfa ? (
                        <>
                          <span className="ptoe-cell__ifa-expr">
                            Ifa<sub className="ptoe-ogbe">|</sub>
                          </span>
                          <span className="ptoe-cell__name">{cell.name}</span>
                          {cell.alias && (
                            <span className="ptoe-cell__alias">{cell.alias}</span>
                          )}
                        </>
                      ) : (
                        <span className="ptoe-cell__name">{cell.name}</span>
                      )}
                      <span className="ptoe-cell__hint">→</span>
                    </button>
                  );
                })}
              </div>
            );
          })}

          {/* Others row */}
          <div className="ptoe-row ptoe-row--others">
            <div className="ptoe-row-hd">
              <span className="ptoe-row-hd__r">…</span>
              <span className="ptoe-row-hd__vi">VI</span>
            </div>
            {STEAMSEX.map(cat => (
              <div key={cat.id} className="ptoe-cell ptoe-cell--others" style={{ '--col-c': cat.color }}>
                <span className="ptoe-cell__name">Others</span>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* HI / VI axis labels */}
      <div className="ptoe-axes">
        <div className="ptoe-axis ptoe-axis--hi">
          <span>→</span>
          <strong>HI</strong> — Horizontal Integration across Fields
        </div>
        <div className="ptoe-axis ptoe-axis--vi">
          <span>↓</span>
          <strong>VI</strong> — Vertical Integration within a Field
        </div>
      </div>
    </div>
  );
}

/* ── Playground Header ────────────────────────────────────────── */
function PlaygroundHeader() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return (
    <header className={`pg-header${scrolled ? ' pg-header--scrolled' : ''}`}>
      <div className="pg-header__inner">
        <div className="pg-header__brand">
          <a href="../" className="pg-header__back">
            <span>←</span>
            <span>IfaLens</span>
          </a>
          <span className="pg-header__sep">/</span>
          <span className="pg-header__title">
            <span className="pg-header__ifa">Ifa</span>Lens Playground
          </span>
          <span className="pg-header__badge">BETA</span>
        </div>
        <nav className="pg-header__nav">
          <a href="/" className="pg-header__link">IFA Internet</a>
          <a href="/ifa-lens/" className="pg-header__cta">IfaLens →</a>
        </nav>
      </div>
    </header>
  );
}

/* ── Tab Bar ──────────────────────────────────────────────────── */
function TabBar({ activeTab, onTab }) {
  const TABS = [
    { id: 'ifaview',     label: 'IfaView',      sub: 'ToE View · Knowledge Explorer', soon: false },
    { id: 'frame-lab',   label: 'Ifa Frame Lab', sub: 'Coming Soon',                   soon: true  },
    { id: 'ifa-matrix',  label: 'IFA Matrix',    sub: 'Coming Soon',                   soon: true  },
    { id: 'ifa-import',  label: 'Ifa Import',    sub: 'Coming Soon',                   soon: true  },
    { id: 'ifa-map',     label: 'Ifa Map',       sub: 'Coming Soon',                   soon: true  },
    { id: 'ifa-transform',label: 'Ifa Transform',sub: 'Coming Soon',                   soon: true  },
  ];
  return (
    <div className="pg-tabs">
      <div className="pg-tabs__inner">
        {TABS.map(t => (
          <button
            key={t.id}
            className={`pg-tab${t.id === activeTab ? ' pg-tab--active' : ''}${t.soon ? ' pg-tab--soon' : ''}`}
            onClick={() => !t.soon && onTab(t.id)}
            disabled={t.soon}
          >
            <span className="pg-tab__label">{t.label}</span>
            <span className="pg-tab__sub">{t.sub}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── IfaView Tab ──────────────────────────────────────────────── */
function IfaViewTab() {
  const [system,   setSystem]   = useState(1);
  const [selected, setSelected] = useState(null);
  const closeModal = useCallback(() => setSelected(null), []);

  return (
    <div className="ifaview-tab">

      {/* Hero heading */}
      <div className="ifaview-tab__hd">
        <div className="pg-badge">IfaView · ToE View · Ifa Knowledge Explorer</div>
        <h1 className="ifaview-tab__title">
          The Ifa Periodic Table of Everything
          <span className="ifaview-tab__title-sub">PToE — 0 + 8D SIDECHRX Matrix of All Knowledge</span>
        </h1>
        <p className="ifaview-tab__lead">
          All fields of knowledge are arranged by{' '}
          <strong className="accent-steam">STEAMSEX</strong> — the 8 universal knowledge
          categories. Click any discipline to open its{' '}
          <strong className="accent-lens">0 + 8D SIDECHRX Matrix</strong>, with that field
          as the <em>Node at the centre</em> — explored through 8 dimensions: Symmetry,
          Invariance, Duality, Emergence, Composition, Holism, Reductionism, and eXpansion.
        </p>
      </div>

      {/* System toggle */}
      <div className="system-toggle">
        <button
          className={`sys-btn${system === 1 ? ' sys-btn--active' : ''}`}
          onClick={() => setSystem(1)}
        >
          <span className="sys-btn__num">01</span>
          <div className="sys-btn__text">
            <span className="sys-btn__label">Generalized PToE</span>
            <span className="sys-btn__sub">Universal Meta-Periodic Table</span>
          </div>
        </button>
        <button
          className={`sys-btn${system === 2 ? ' sys-btn--active' : ''}`}
          onClick={() => setSystem(2)}
        >
          <span className="sys-btn__num">02</span>
          <div className="sys-btn__text">
            <span className="sys-btn__label">Knowledge Elements</span>
            <span className="sys-btn__sub">Ifa Expressions · IfaLang</span>
          </div>
        </button>
      </div>

      {/* System description */}
      <div className={`sys-desc sys-desc--${system}`}>
        {system === 1 ? (
          <>
            <strong>System 1 — The Generalized Periodic Table:</strong> The Universal
            Meta-Periodic Table mapping all knowledge fields by STEAMSEX category.
            Each cell is a knowledge field at the intersection of its STEAMSEX column
            and Vertical Integration row. Click any cell to explore its 0+8D SIDECHRX analysis.
          </>
        ) : (
          <>
            <strong>System 2 — Periodic Table of Knowledge Elements:</strong> Every discipline
            is expressed as an <em>Ifa Expression</em> — written in{' '}
            <strong>IfaLang</strong> with the Ogbe Symbol{' '}
            <span className="inline-ogbe">|</span> as subscript to{' '}
            &ldquo;Ifa&rdquo;, transforming each knowledge field into a CEN Energy element
            of the IFA Internet. Click any element to open its 0+8D SIDECHRX Matrix.
          </>
        )}
      </div>

      {/* STEAMSEX legend (grid axis guide) */}
      <div className="steamsex-legend">
        <span className="legend-label">STEAMSEX</span>
        {STEAMSEX.map(cat => (
          <div key={cat.id} className="steam-chip" style={{ '--cc': cat.color }}>
            <span className="steam-chip__icon">{cat.icon}</span>
            <span className="steam-chip__code">{cat.code}</span>
            <span className="steam-chip__name">{cat.name}</span>
          </div>
        ))}
      </div>

      {/* SIDECHRX legend (modal dimension guide) */}
      <div className="sidechrx-legend">
        <span className="legend-label">SIDECHRX</span>
        {SIDECHRX.map(d => (
          <div key={d.id} className="sidechrx-chip" style={{ '--cc': d.color }}>
            <span className="sidechrx-chip__id">{d.id}</span>
            <span className="sidechrx-chip__name">{d.name}</span>
          </div>
        ))}
      </div>

      {/* Interactive PToE Grid */}
      <PToEGrid isIfa={system === 2} onCellClick={setSelected} />

      {/* Info box */}
      <div className="ptoe-info">
        <div className="ptoe-info__icon">◈</div>
        <div className="ptoe-info__text">
          <strong>0 + 8D Matrix:</strong> The grid is a 2D cross-section of the full
          0+8D knowledge architecture. <strong>Columns</strong> = 8 STEAMSEX field
          categories (Horizontal Integration — HI). <strong>Rows</strong> = disciplines
          within each category (Vertical Integration — VI). Click any cell to open its
          SIDECHRX exploration: 8 universal principles — Symmetry, Invariance, Duality,
          Emergence, Composition, Holism, Reductionism, eXpansion — applied to that field,
          with the field as Node 0 at the centre.
        </div>
      </div>

      {/* Cell Modal */}
      <CellModal cell={selected} isIfa={system === 2} onClose={closeModal} />
    </div>
  );
}

/* ── App ──────────────────────────────────────────────────────── */
function App() {
  const [tab, setTab] = useState('ifaview');
  return (
    <>
      <PlaygroundHeader />
      <TabBar activeTab={tab} onTab={setTab} />
      <main className="pg-main">
        {tab === 'ifaview' && <IfaViewTab />}
      </main>
      <footer className="pg-footer">
        <div className="pg-footer__inner">
          <div className="pg-footer__brand">
            <a href="../" className="pg-footer__link">IfaLens</a>
            <span> · </span>
            <a href="/" className="pg-footer__link">IFA Internet</a>
            <span> · </span>
            <a href="https://cenproject.org/" target="_blank" rel="noopener noreferrer" className="pg-footer__link">CENProject</a>
          </div>
          <p className="pg-footer__note">
            IfaLens Playground · IfaView · STEAMSEX Grid · 0+8D SIDECHRX Matrix ·
            The Ifa Periodic Table of Everything
          </p>
        </div>
      </footer>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
