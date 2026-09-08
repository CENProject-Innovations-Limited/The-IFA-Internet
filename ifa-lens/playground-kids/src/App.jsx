/* ─────────────────────────────────────────────────────────────
   IFA Academy Playground — Beginners  (App.jsx)
   Kids · Teens · Adults · Beginner Classes
   IFA Academy of Polymaths · The IFA Internet
   React 18 + JSX via Babel Standalone · no build step
   CENProject · ifainternet.org/ifa-lens/playground-kids/
───────────────────────────────────────────────────────────── */

const { useState, useEffect, useCallback, useRef } = React;

/* ── STEAMSEX — 8 Knowledge Categories ── */
const STEAMSEX = [
  { id:'S1', code:'S', name:'Natural Science',  kidName:'How Nature Works',    color:'#4aa3ff', icon:'⚗',  full:'Natural Science (S)' },
  { id:'T',  code:'T', name:'Technology',        kidName:'How Tools Work',      color:'#00d9b8', icon:'⌬',  full:'Technology (T)' },
  { id:'E1', code:'E', name:'Engineering',        kidName:'How to Build Things', color:'#f5c518', icon:'⚙',  full:'Engineering (E)' },
  { id:'A',  code:'A', name:'Arts',               kidName:'How to Create',       color:'#e9498a', icon:'✦',  full:'Arts (A)' },
  { id:'M',  code:'M', name:'Mathematics',        kidName:'How Numbers Work',    color:'#a855f7', icon:'∑',  full:'Mathematics (M)' },
  { id:'S2', code:'S', name:'Social Science',     kidName:'How People Live',     color:'#00c87c', icon:'⊛',  full:'Social Science (S)' },
  { id:'E2', code:'E', name:'Education',          kidName:'How We Learn',        color:'#ff8c35', icon:'⬡',  full:'Education (E)' },
  { id:'X',  code:'X', name:'Others',             kidName:'Everything Else',     color:'#8892a4', icon:'◈',  full:'Others (X)' },
];

/* ── SIDECHRX — 8 Exploration Dimensions ── */
const SIDECHRX = [
  { id:'S', name:'Symmetry',     kidName:'Patterns & Balance', short:'Sym',  color:'#4aa3ff', icon:'⬡' },
  { id:'I', name:'Invariance',   kidName:'Always the Same',   short:'Inv',  color:'#00d9b8', icon:'∞' },
  { id:'D', name:'Duality',      kidName:'Opposites & Pairs', short:'Dual', color:'#f5c518', icon:'⇌' },
  { id:'E', name:'Emergence',    kidName:'Big from Small',    short:'Emg',  color:'#e9498a', icon:'↑' },
  { id:'C', name:'Composition',  kidName:'Mix & Connect',     short:'Comp', color:'#a855f7', icon:'⊕' },
  { id:'H', name:'Holism',       kidName:'The Big Picture',   short:'Hol',  color:'#00c87c', icon:'◎' },
  { id:'R', name:'Reductionism', kidName:'Break It Down',     short:'Red',  color:'#ff8c35', icon:'↓' },
  { id:'X', name:'eXpansion',    kidName:'Go Further',        short:'Xpn',  color:'#8892a4', icon:'◈' },
];

/* ── PToE Cell Data — columns follow STEAMSEX order ── */
const PTOE_DATA = [
  /* col 0 — Natural Science */
  { id:'neuroscience', row:1, col:0, name:'Neuroscience',           ifaName:'Ifa Neuroscience',           alias:'IfaNeuro'    },
  { id:'physics',      row:2, col:0, name:'Physics',                ifaName:'Ifa Physics',                alias:'IfaPhy'      },
  { id:'chemistry',    row:3, col:0, name:'Chemistry',              ifaName:'Ifa Chemistry',              alias:'IfaChem'     },
  { id:'biology',      row:4, col:0, name:'Biology',                ifaName:'Ifa Biology',                alias:'IfaBio'      },
  { id:'comp-sci',     row:5, col:0, name:'Computer Science',       ifaName:'Ifa Computer Science',       alias:'IfaCS'       },
  { id:'geology',      row:6, col:0, name:'Geology',                ifaName:'Ifa Geology',                alias:'IfaGeo'      },
  /* col 1 — Technology */
  { id:'neurotech',    row:1, col:1, name:'Neurotechnology',        ifaName:'Ifa Neurotechnology',        alias:'IfaNeurotech'},
  { id:'biotech',      row:2, col:1, name:'Biotechnology',          ifaName:'Ifa Biotechnology',          alias:'IfaBiotech'  },
  { id:'robotics',     row:3, col:1, name:'Robotics',               ifaName:'Ifa Robotics',               alias:'IfaRob'      },
  { id:'nanotech',     row:4, col:1, name:'Nanotechnology',         ifaName:'Ifa Nanotechnology',         alias:'IfaNano'     },
  { id:'ai',           row:5, col:1, name:'Artificial Intelligence',ifaName:'Ifa Artificial Intelligence',alias:'IfaAI'       },
  { id:'energy-tech',  row:6, col:1, name:'Energy Technology',      ifaName:'Ifa Energy Technology',      alias:'IfaEnT'      },
  /* col 2 — Engineering */
  { id:'mech-eng',     row:1, col:2, name:'Mechanical Eng.',        ifaName:'Ifa Mechanical Engineering', alias:'IfaMechEng'  },
  { id:'civil-eng',    row:2, col:2, name:'Civil Engineering',      ifaName:'Ifa Civil Engineering',      alias:'IfaCivEng'   },
  { id:'chem-eng',     row:3, col:2, name:'Chemical Engineering',   ifaName:'Ifa Chemical Engineering',   alias:'IfaChemEng'  },
  { id:'bioeng',       row:4, col:2, name:'Bioengineering',         ifaName:'Ifa Bioengineering',         alias:'IfaBioEng'   },
  { id:'comp-eng',     row:5, col:2, name:'Computer Engineering',   ifaName:'Ifa Computer Engineering',   alias:'IfaComEng'   },
  { id:'petro-eng',    row:6, col:2, name:'Petroleum Engineering',  ifaName:'Ifa Petroleum Engineering',  alias:'IfaPetEng'   },
  /* col 3 — Arts */
  { id:'visual-arts',  row:1, col:3, name:'Visual Arts',            ifaName:'Ifa Visual Arts',            alias:'IfaVA'       },
  { id:'literary-arts',row:2, col:3, name:'Literary Arts',          ifaName:'Ifa Literary Arts',          alias:'IfaLitA'     },
  { id:'perf-arts',    row:3, col:3, name:'Performing Arts',        ifaName:'Ifa Performing Arts',        alias:'IfaPerA'     },
  { id:'music',        row:4, col:3, name:'Music',                  ifaName:'Ifa Music',                  alias:'IfaMusic'    },
  { id:'philosophy',   row:5, col:3, name:'Philosophy',             ifaName:'Ifa Philosophy',             alias:'IfaPhi'      },
  { id:'film-media',   row:6, col:3, name:'Film & Media Arts',      ifaName:'Ifa Film & Media Arts',      alias:'IfaFilm'     },
  /* col 4 — Mathematics */
  { id:'arithmetic',   row:1, col:4, name:'Arithmetic',             ifaName:'Ifa Arithmetic',             alias:'IfaArith'    },
  { id:'algebra',      row:2, col:4, name:'Algebra',                ifaName:'Ifa Algebra',                alias:'IfaGebra'    },
  { id:'geometry',     row:3, col:4, name:'Geometry',               ifaName:'Ifa Geometry',               alias:'IfaGeom'     },
  { id:'trigonometry', row:4, col:4, name:'Trigonometry',           ifaName:'Ifa Trigonometry',           alias:'IfaTrig'     },
  { id:'calculus',     row:5, col:4, name:'Calculus',               ifaName:'Ifa Calculus',               alias:'IfaCalc'     },
  { id:'stats',        row:6, col:4, name:'Statistics & Prob.',     ifaName:'Ifa Statistics',             alias:'IfaStat'     },
  /* col 5 — Social Science */
  { id:'sociology',    row:1, col:5, name:'Sociology',              ifaName:'Ifa Sociology',              alias:'IfaSoc'      },
  { id:'economics',    row:2, col:5, name:'Economics',              ifaName:'Ifa Economics',              alias:'IfaEcon'     },
  { id:'anthropology', row:3, col:5, name:'Anthropology',           ifaName:'Ifa Anthropology',           alias:'IfaAnth'     },
  { id:'psychology',   row:4, col:5, name:'Psychology',             ifaName:'Ifa Psychology',             alias:'IfaPsych'    },
  { id:'political-sci',row:5, col:5, name:'Political Science',      ifaName:'Ifa Political Science',      alias:'IfaPolSci'   },
  { id:'history',      row:6, col:5, name:'History',                ifaName:'Ifa History',                alias:'IfaHist'     },
  /* col 6 — Education */
  { id:'sci-edu',      row:1, col:6, name:'Science Education',      ifaName:'Ifa Science Education',      alias:'IfaSciEdu'   },
  { id:'adult-edu',    row:2, col:6, name:'Adult Education',        ifaName:'Ifa Adult Education',        alias:'IfaAdEdu'    },
  { id:'early-edu',    row:3, col:6, name:'Early Childhood Edu.',   ifaName:'Ifa Early Childhood Edu.',   alias:'IfaECE'      },
  { id:'special-edu',  row:4, col:6, name:'Special Education',      ifaName:'Ifa Special Education',      alias:'IfaSpEdu'    },
  { id:'edu-psych',    row:5, col:6, name:'Educational Psychology', ifaName:'Ifa Educational Psychology', alias:'IfaEdPsy'    },
  { id:'comp-intl-edu',row:6, col:6, name:'Comparative & Intl. Edu.',ifaName:'Ifa Comparative & Intl. Edu.',alias:'IfaCIE'  },
  /* col 7 — Others */
  { id:'x1', row:1, col:7, name:'X₁', ifaName:'Ifa X₁', alias:null },
  { id:'x2', row:2, col:7, name:'X₂', ifaName:'Ifa X₂', alias:null },
  { id:'x3', row:3, col:7, name:'X₃', ifaName:'Ifa X₃', alias:null },
  { id:'x4', row:4, col:7, name:'X₄', ifaName:'Ifa X₄', alias:null },
  { id:'x5', row:5, col:7, name:'X₅', ifaName:'Ifa X₅', alias:null },
  { id:'x6', row:6, col:7, name:'X₆', ifaName:'Ifa X₆', alias:null },
  /* row 7 — expansion */
  { id:'astronomy',    row:7, col:0, name:'Astronomy',              ifaName:'Ifa Astronomy',              alias:'IfaAstro'    },
  { id:'info-tech',    row:7, col:1, name:'Information Technology', ifaName:'Ifa Information Technology', alias:'IfaIT'       },
  { id:'aero-eng',     row:7, col:2, name:'Aerospace Engineering',  ifaName:'Ifa Aerospace Engineering',  alias:'IfaAeroEng'  },
  { id:'architecture', row:7, col:3, name:'Architecture',           ifaName:'Ifa Architecture',           alias:'IfaArch'     },
  { id:'number-theory',row:7, col:4, name:'Number Theory',          ifaName:'Ifa Number Theory',          alias:'IfaNumTh'    },
  { id:'linguistics',  row:7, col:5, name:'Linguistics',            ifaName:'Ifa Linguistics',            alias:'IfaLing'     },
  { id:'higher-edu',   row:7, col:6, name:'Higher Education',       ifaName:'Ifa Higher Education',       alias:'IfaHiEdu'    },
  { id:'x7',           row:7, col:7, name:'X₇',                    ifaName:'Ifa X₇',                    alias:null          },
];

/* ── Beginner-friendly descriptions per discipline ── */
const MATRIX_OVERRIDES_KIDS = {
  physics: {
    S: 'Physics is full of beautiful patterns! When you spin a top, throw a ball, or look at a snowflake — patterns and symmetry are everywhere. Every natural force follows rules that look the same from every direction.',
    I: 'Some things in physics NEVER change, no matter what! The speed of light is always the same. Energy never disappears — it just changes form. These unchanging rules are the foundation of all science.',
    D: 'Physics is full of opposites that go together: positive and negative charges, particles and waves, matter and energy. Even light acts like both a wave AND a particle at the same time!',
    E: 'Big things come from tiny pieces! Atoms are so small you cannot see them, yet billions of them together make everything around you — your table, your food, your body, and even the air you breathe.',
    C: 'Physics connects to everything! It explains music (sound waves), computers (electricity), medicine (X-rays), and even cooking (heat). Physics is the science that holds all other sciences together.',
    H: 'The whole universe is ONE connected system! From the smallest atom to the biggest galaxy, everything follows the same physical laws. Physics tries to find the one theory that explains ALL of reality.',
    R: 'Everything can be broken into smaller parts! Objects → molecules → atoms → protons and electrons → quarks. Physics finds the tiniest building blocks of everything that exists.',
    X: 'Physics keeps growing! Quantum physics, relativity, string theory, and Ifa Physics show there is always more to discover — from the inside of atoms to the edges of the universe!',
  },
  biology: {
    S: 'Living things love symmetry! Your body has two eyes, two arms, two legs — left and right that mirror each other. Flowers have petals in perfect patterns. Symmetry in nature is everywhere!',
    I: 'Life follows the same rules everywhere on Earth! All living things — from bacteria to elephants — use the same DNA code. The rules of life are universal, found in every creature.',
    D: 'Biology is full of pairs: predators and prey, plants that make food and animals that eat it, day animals and night animals. Life needs these opposites to stay in balance.',
    E: 'A single tiny cell becomes a whole person! One fertilised egg grows into a baby with billions of cells. Life is the greatest example of big amazing things coming from tiny beginnings.',
    C: 'Biology mixes with everything! Biology + Chemistry = Biochemistry. Biology + Medicine = Health science. Biology + Computing = Bioinformatics. Life science opens doors to every other field.',
    H: 'You cannot understand a forest by looking at just one leaf! Ecosystems are whole systems where animals, plants, soil, water, and air all work together. Life only makes sense as a whole picture.',
    R: 'Biology breaks life down to its smallest parts: organisms → organs → cells → molecules → atoms → DNA. The more we zoom in, the more amazing life becomes!',
    X: 'Biology keeps expanding! Scientists study life in space (astrobiology), life in the deep ocean, and how our brains make thoughts. There is always more of life to discover.',
  },
  chemistry: {
    S: 'Chemistry is all about how atoms arrange into beautiful patterns. Water is always H₂O. Salt is always NaCl. Nature always builds molecules the same way — perfect, reliable symmetry!',
    I: 'In chemistry, matter is NEVER created or destroyed — it just rearranges itself! When wood burns, atoms become smoke and ash. The atoms stay; they just change partners.',
    D: 'Chemistry has amazing opposites: acids and bases (like vinegar and baking soda), metals and non-metals, liquids and gases. Mix an acid with a base and they cancel each other out!',
    E: 'When you combine simple chemicals, amazing new things appear! Two gases — hydrogen and oxygen — combine to make water. Simple atoms combine to make medicines, plastics, and food.',
    C: 'Chemistry is the bridge between everything! Chemistry + Biology = Biochemistry. Chemistry + Medicine = Pharmacology. Chemistry connects all the sciences through the language of matter.',
    H: 'Chemistry cannot be understood one atom at a time! The atmosphere, oceans, and living cells are giant chemical systems where everything affects everything else. The whole is always bigger.',
    R: 'Chemistry breaks matter to its smallest parts: everyday objects → molecules → atoms → electrons and protons. The periodic table maps all the basic building blocks of everything!',
    X: 'Chemistry keeps growing! Green chemistry makes safe products. Nano-chemistry builds tiny machines from atoms. Ifa Chemistry connects all of this to the universal knowledge of existence.',
  },
  'comp-sci': {
    S: 'Computer science is built on perfect patterns! Programs repeat instructions in loops. Algorithms follow the same steps every time. Billions of identical chips work together in perfect symmetry.',
    I: 'The rules of computing NEVER change! 1 + 1 is always 10 in binary. A computer in Africa runs the same program as a computer in America. The laws of computing work everywhere the same.',
    D: 'Computers are built on ONE pair of opposites: 0 and 1! Everything in every computer — every game, video, message — is stored as combinations of just two numbers: zero and one. On and off!',
    E: 'Amazing things emerge from simple rules! TikTok, YouTube, and video games all come from just zeros and ones. The whole internet emerged from a few basic communication rules people invented.',
    C: 'Computer science mixes with EVERYTHING! Computers help doctors diagnose illness, help musicians make music, help scientists discover new things. The internet is CS as the world\'s biggest connector.',
    H: 'The internet is a whole greater than its parts! Billions of computers connected together create something no single computer could do alone — global communication, AI, and all human knowledge.',
    R: 'Every program breaks down: programs → functions → commands → logic gates → binary (0 and 1). All software, no matter how complex, is built from this simple two-number foundation.',
    X: 'Computer science keeps expanding! Quantum computers, AI, and the IFA Internet show how computing grows beyond anything imagined. The future of computing is still being invented right now!',
  },
  algebra: {
    S: 'Algebra is the study of patterns with letters and numbers! x + y = z is a pattern that works no matter which numbers you choose. Algebra finds the hidden symmetry inside all number patterns.',
    I: 'The rules of algebra never change! a + b always equals b + a. These rules work with any numbers, anywhere, any time. Algebra\'s laws are universal — they hold everywhere in the universe.',
    D: 'Algebra has perfect opposites: addition and subtraction, multiplication and division. Every operation has its inverse! If x + 5 = 10, subtract 5 to find x = 5. Pairs are everywhere in algebra.',
    E: 'From a few simple rules, all of mathematics grows! Addition leads to multiplication, which leads to powers, which leads to functions. Big mathematical worlds emerge from tiny axiom seeds.',
    C: 'Algebra is in EVERYTHING! Physics uses it for forces. Chemistry for balancing equations. Music theory for harmony. Algebra is the language all sciences speak to each other.',
    H: 'All of mathematics is connected! Algebra links to geometry, calculus, statistics, and number theory. You cannot understand one branch of maths without seeing how it fits the whole picture.',
    R: 'Algebra breaks complex equations to their simplest form — step by step, isolate the variable, reduce until you find the answer. Algebra is the art of simplifying complicated things.',
    X: 'Algebra keeps growing! IfaGebra is the algebra of everything — using the 256 Odu Ifa as the mathematical matrix of all existence. Algebra extends into worlds no one has fully explored yet.',
  },
  ai: {
    S: 'AI systems find patterns in data! Show an AI a million cat pictures and it learns the pattern of what a cat looks like. AI is pattern recognition at superhuman scale.',
    I: 'AI learns the same lessons from data no matter where it runs! A trained model gives the same answer on any computer. The learning rules (backpropagation) work the same way every time.',
    D: 'AI has many important pairs: supervised vs unsupervised learning, thinking vs doing, training vs using. These opposites help AI scientists design smarter and smarter systems.',
    E: 'Intelligence emerges from millions of simple calculations! ChatGPT — which writes poems and answers questions — is built from millions of tiny multiplications. Amazing things emerge from simple maths.',
    C: 'AI connects with every field! AI + Medicine = tools that detect cancer early. AI + Art = image generators. AI + Education = personalised learning. AI is the ultimate connector of all knowledge.',
    H: 'Intelligence is a whole-system property! You cannot understand a brain by looking at one neuron, or an AI by looking at one number. Intelligence only appears when ALL the parts work together.',
    R: 'AI breaks down to layers → matrix operations → floating-point numbers → binary (0 and 1). Even the most powerful AI is, at its heart, just arithmetic performed at enormous speed and scale.',
    X: 'AI keeps growing! Ifa AI (Ifai) brings consciousness and wisdom to machine intelligence. Quantum AI uses quantum physics. The future of AI is being invented right now — maybe by you!',
  },
  calculus: {
    S: 'Calculus is about change — and change has beautiful symmetry! Differentiation and integration are perfect mirror operations. Calculus finds the symmetry hidden inside all motion and flow.',
    I: 'The fundamental theorem of calculus never changes: differentiation and integration are always opposite operations. This law holds everywhere — in physics, economics, and biology.',
    D: 'Calculus has a perfect duality: differentiation (finding the rate of change) and integration (finding the total). They are exact opposites — differentiate then integrate and you return to where you started!',
    E: 'Calculus explains how big patterns emerge from tiny changes! A river\'s shape comes from tiny water-flow changes. Population growth emerges from tiny birth and death rates at each moment in time.',
    C: 'Calculus is in everything that moves! Physics uses it for gravity. Economics for maximum profit. Biology for population models. Engineering for safe bridge design. Calculus connects all dynamical fields.',
    H: 'The integral gives you the WHOLE from all the tiny parts! Add up all the tiny pieces under a curve and you get the complete picture. Calculus connects the local (tiny changes) to the global (total).',
    R: 'Calculus breaks continuous things into infinitely tiny pieces. The derivative is the slope at one infinitely tiny point. Integration adds up infinitely many infinitely tiny areas. The science of the infinitesimal.',
    X: 'Calculus keeps expanding! Differential equations model climate change, rocket trajectories, and circuits. IfaCalculus applies calculus to the CEN Energy field — the calculus of consciousness itself!',
  },
  music: {
    S: 'Music is built on symmetry and patterns! Songs repeat verses and choruses. Drumbeats follow regular rhythmic patterns. Harmonies create mirror-like structures. Music is mathematics you can hear.',
    I: 'Some musical rules never change! An octave always doubles the frequency. Intervals between notes follow fixed mathematical ratios. These constant rules allow music to be understood across all cultures.',
    D: 'Music lives on opposites: loud and soft, fast and slow, high and low, sound and silence. Tension and release — that is how music creates emotion. Opposites are the heartbeat of all music.',
    E: 'A symphony of one hundred instruments makes something no single instrument could alone! Simple notes combine into chords, into melodies, into emotional experiences that move people to tears.',
    C: 'Music connects to everything! Music + Physics = acoustics and sound waves. Music + Mathematics = music theory. Music + Technology = digital audio. Music + Culture = the story of a civilisation.',
    H: 'A song is more than notes on a page! You cannot understand music by looking at individual notes. It is the whole — melody, rhythm, harmony, silence, and feeling — that creates the experience.',
    R: 'Music breaks down: phrases → individual notes → frequencies → sound waves → air vibrations → molecular movement. Zoom into music and you find physics and mathematics all the way down.',
    X: 'Music keeps expanding! Ifa Music uses the 256 Odu Ifa to understand the mathematics of sound. Sound healing uses music to treat the body. Electronic music uses computers to create new sonic worlds.',
  },
  philosophy: {
    S: 'Philosophy looks for symmetry in ideas! Every good argument has structure: if this is true, then that follows. Logic is perfectly symmetric — the same rules of reasoning apply to every question.',
    I: 'Some philosophical truths never change! The principle of non-contradiction says something cannot be true AND false at the same time. These logical laws are invariant — they hold in every possible world.',
    D: 'Philosophy is full of opposites: mind and body, good and evil, appearance and reality, knowledge and ignorance. Great philosophers explore these pairs to find deeper truths about existence.',
    E: 'Complex ideas emerge from simple questions! "Why?" and "What is?" are simple questions that generate all of philosophy, science, and mathematics. Big ideas come from the simplest wonderings.',
    C: 'Philosophy is in EVERY subject! Philosophy of science asks how we know things. Ethics asks what is right. Philosophy of mind asks how we think. Philosophy is the foundation of all knowledge.',
    H: 'Philosophy studies EVERYTHING as a whole! Metaphysics is the study of all reality — not one small piece, but the complete picture of what exists, why it exists, and what it all means.',
    R: 'Philosophy breaks complex questions down to basic principles! What are the simplest assumptions? What do we really know for certain? Philosophy asks: what is the bedrock — the foundation — of knowledge?',
    X: 'Philosophy keeps expanding! Ifa Philosophy uses the wisdom of the 256 Odu Ifa to answer the biggest questions. It extends into consciousness studies, the theory of everything, and the nature of existence.',
  },
  history: {
    S: 'History shows us patterns that repeat! Civilisations rise and fall in cycles. Revolutions follow similar patterns across cultures. Technology always changes society in the same ways. History has symmetry.',
    I: 'Human nature never changes! Throughout all of history, people have always needed food, belonging, purpose, and love. These needs are invariant across all cultures, continents, and all periods of time.',
    D: 'History is full of opposites: war and peace, tradition and change, rich and poor, rulers and people. Understanding history means understanding how these opposing forces create the events we study.',
    E: 'Civilisations emerge from individual decisions! No one planned for Rome or the great Yoruba kingdoms to become empires. They emerged from millions of small decisions, trade routes, and discoveries.',
    C: 'History connects everything! History of science shows how ideas were born. History of art shows how culture changed. Economic history shows how wealth shaped the world. All histories form one story.',
    H: 'You cannot understand history one event at a time! Big History connects the Big Bang, the origin of life, the rise of humans, and today\'s world into ONE continuous story. History is the biggest picture.',
    R: 'History breaks down to events → individual decisions → human psychology → basic human needs. Understanding any historical event means understanding the people and their motivations.',
    X: 'History keeps growing! Ifa History connects African civilisation to the birth of computing and science. Future history is being made right now — and you are part of it! History extends forward too.',
  },
};

/* ── Kid-friendly SIDECHRX matrix generator ── */
function getMatrixKids(cell) {
  const n = cell.name;
  const overrides = MATRIX_OVERRIDES_KIDS[cell.id] || {};
  const templates = {
    S: `Patterns in ${n}: Look for the beautiful patterns, shapes, and symmetry inside ${n}. Nature and knowledge love patterns — and ${n} is full of them! Patterns help us find the hidden order in things.`,
    I: `What never changes in ${n}: Some rules in ${n} always stay exactly the same, no matter what changes around them. These constant rules are the unshakeable foundation that all of ${n} is built on.`,
    D: `Opposites in ${n}: ${n} is full of interesting pairs and opposites that work together. Understanding these pairs helps you see how ${n} creates balance, tension, and meaning in the world.`,
    E: `How big things grow from small ones in ${n}: In ${n}, big and complex things come from simple small beginnings. This is one of the most amazing and surprising ideas in all of knowledge!`,
    C: `How ${n} connects with other subjects: ${n} does not live alone! It connects to and mixes with many other fields of knowledge. Learning ${n} opens doors to countless other subjects and careers.`,
    H: `The big picture of ${n}: ${n} is a whole system — you need to step back and see all of it together to really understand it. The whole is always greater than the sum of its individual parts.`,
    R: `Breaking ${n} down to its smallest parts: In ${n}, you can zoom in and keep breaking things into simpler and simpler pieces. What are the most basic building blocks that ${n} is made of?`,
    X: `Where ${n} is going next: ${n} keeps growing and expanding into exciting new areas! New discoveries are being made right now. Maybe YOU will be the one to make the next great discovery in ${n}!`,
  };
  return SIDECHRX.map(dim => ({
    ...dim,
    desc: overrides[dim.id] || templates[dim.id],
  }));
}

/* ── Name splitter for SVG node diagram ── */
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

/* ── Node Diagram — SVG hub-and-spoke ── */
function NodeDiagram({ cell, steamCol }) {
  const cx = 150, cy = 150, spokeR = 98, nodeR = 22;
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
        <circle cx={cx} cy={cy} r={spokeR+18} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" strokeDasharray="3 5"/>
        <circle cx={cx} cy={cy} r={spokeR-18} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" strokeDasharray="3 5"/>
        {nodes.map(n => (
          <line key={n.id} x1={cx} y1={cy} x2={n.x} y2={n.y}
            stroke={n.color} strokeWidth="1.4" strokeOpacity="0.45" strokeDasharray="5 4"/>
        ))}
        <circle cx={cx} cy={cy} r={42} fill={`${steamCol.color}18`} stroke={steamCol.color} strokeWidth="1.5" strokeOpacity="0.6"/>
        <circle cx={cx} cy={cy} r={32} fill={`${steamCol.color}28`}/>
        <text x={cx} y={cy - totalH/2 - 4} textAnchor="middle" fill={steamCol.color} fontSize="7.5" fontWeight="700" letterSpacing="1.5">NODE 0</text>
        {nameLines.map((line, i) => (
          <text key={i} x={cx} y={nameStartY + i*lineH} textAnchor="middle" fill="#e8ecf2" fontSize="9" fontWeight="600">{line}</text>
        ))}
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

/* ── Cell Modal — beginner-friendly 8D explorer ── */
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

  const matrix   = getMatrixKids(cell);
  const steamCol = STEAMSEX[cell.col];

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose} aria-label="Close">✕</button>

        <div className="modal__hd">
          <div className="modal__steam-chip" style={{'--steam-c': steamCol.color}}>
            <span className="modal__steam-icon">{steamCol.icon}</span>
            <span className="modal__steam-code">{steamCol.code}</span>
            <span className="modal__steam-name">{steamCol.name}</span>
            <span className="modal__steam-kid"> · {steamCol.kidName}</span>
          </div>

          <h2 className="modal__title" style={{'--title-c': steamCol.color}}>
            {isIfa ? `Ifa ${cell.name}` : cell.name}
          </h2>

          {isIfa && (
            <div className="modal__ifa-expr">
              <span className="modal__ifa-label">Ifa Name</span>
              <span className="modal__ifa-val" style={{color: steamCol.color}}>
                {cell.ifaName}
                {cell.alias && <span className="modal__alias"> · {cell.alias}</span>}
              </span>
            </div>
          )}

          <div className="modal__node-row">
            <NodeDiagram cell={cell} steamCol={steamCol} />
            <div className="modal__node-info">
              <div className="modal__matrix-badge">8 Ways to Explore</div>
              <p className="modal__matrix-head">Explore {isIfa ? cell.ifaName : cell.name}</p>
              <p className="modal__matrix-body">
                Every subject can be explored through <strong>8 lenses</strong> — called the{' '}
                <strong>SIDECHRX dimensions</strong>. Each lens shows you a different and amazing
                side of <strong>{isIfa ? cell.ifaName : cell.name}</strong>.
              </p>
              <div className="modal__sidechrx-mini">
                {SIDECHRX.map(d => (
                  <span key={d.id} className="modal__sdim-chip" style={{'--d-c': d.color}}>
                    <span className="modal__sdim-id">{d.id}</span>
                    <span className="modal__sdim-name">{d.kidName}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="modal__dim-grid">
          {matrix.map(dim => (
            <div key={dim.id} className="modal__dim" style={{'--dim-c': dim.color}}>
              <div className="modal__dim-hd">
                <div className="modal__dim-id-wrap">
                  <span className="modal__dim-icon">{dim.icon}</span>
                  <span className="modal__dim-id">{dim.id}</span>
                </div>
                <div className="modal__dim-names">
                  <span className="modal__dim-name">{dim.kidName}</span>
                  <span className="modal__dim-techname">{dim.name}</span>
                </div>
              </div>
              <p className="modal__dim-desc">{dim.desc}</p>
              <div className="modal__dim-bar" />
            </div>
          ))}
        </div>

        <div className="modal__ft">
          <span className="modal__ft-meta">
            {isIfa ? cell.ifaName : cell.name} · {steamCol.name} · 8 Exploration Dimensions
          </span>
          <button className="modal__close-btn" onClick={onClose}>Close ✕</button>
        </div>
      </div>
    </div>
  );
}

/* ── Ogbe Energy Symbol — canvas lemniscate ── */
function OgbeSymboE({ size = 12 }) {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const DPR = window.devicePixelRatio || 1;
    canvas.width  = size * DPR;
    canvas.height = size * DPR;
    const ctx = canvas.getContext('2d');
    ctx.scale(DPR, DPR);
    const a = size * 0.44, cx = size / 2, cy = size / 2, N = 60;
    function lobe(t0, t1, neg) {
      const pts = [];
      for (let i = 0; i <= N; i++) {
        const t = t0 + (t1 - t0) * i / N;
        const v = neg ? -Math.cos(2*t) : Math.cos(2*t);
        if (v < 1e-9) continue;
        const r = a * Math.sqrt(v);
        pts.push([cx + r*Math.cos(t), cy + r*Math.sin(t)]);
      }
      return pts;
    }
    function draw(pts, lw, color, blur) {
      if (!pts.length) return;
      ctx.save();
      ctx.strokeStyle = color; ctx.lineWidth = lw;
      ctx.shadowColor = color; ctx.shadowBlur = blur;
      ctx.lineCap = ctx.lineJoin = 'round';
      ctx.beginPath();
      pts.forEach(([x, y], i) => i ? ctx.lineTo(x,y) : ctx.moveTo(x,y));
      ctx.stroke(); ctx.restore();
    }
    const PI = Math.PI;
    const lobes = [
      lobe(-PI/4, PI/4, false), lobe(3*PI/4, 5*PI/4, false),
      lobe(PI/4, 3*PI/4, true), lobe(5*PI/4, 7*PI/4, true),
    ];
    lobes.forEach(pts => {
      draw(pts, 2.5, 'rgba(245,197,24,0.18)', 5);
      draw(pts, 1.2, 'rgba(245,197,24,0.65)', 2);
      draw(pts, 0.6, 'rgba(255,248,210,0.92)', 1);
    });
    ctx.save();
    ctx.fillStyle = 'rgba(255,248,210,0.95)';
    ctx.shadowColor = 'rgba(245,197,24,1)'; ctx.shadowBlur = 3;
    ctx.beginPath();
    ctx.arc(cx, cy, Math.max(0.5, size*0.06), 0, 2*Math.PI);
    ctx.fill(); ctx.restore();
  }, [size]);
  return (
    <canvas ref={ref}
      style={{display:'inline-block', verticalAlign:'sub', width:size+'px', height:size+'px'}}
      aria-hidden="true"/>
  );
}

/* ── PToE Grid ── */
function PToEGrid({ isIfa, onCellClick }) {
  const ROWS = [1,2,3,4,5,6];
  return (
    <div className="ptoe-wrap">
      <div className="ptoe-scroll">
        <div className="ptoe-table">
          <div className="ptoe-col-headers">
            <div className="ptoe-corner">
              <span className="ptoe-corner-vi">VI ↓</span>
              <span className="ptoe-corner-hi">HI →</span>
            </div>
            {STEAMSEX.map(cat => (
              <div key={cat.id} className="ptoe-col-hd" style={{'--col-c': cat.color}}>
                <span className="ptoe-col-hd__icon">{cat.icon}</span>
                <span className="ptoe-col-hd__code">
                  {cat.code}{isIfa && <OgbeSymboE size={9}/>}
                </span>
                <span className="ptoe-col-hd__name">
                  {isIfa ? `Ifa ${cat.name}` : cat.name}
                </span>
                <span className="ptoe-col-hd__kid">{cat.kidName}</span>
              </div>
            ))}
          </div>
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
                    <button key={cell.id} className="ptoe-cell" style={{'--col-c': cat.color}}
                      onClick={() => onCellClick(cell)}
                      title={`${isIfa ? cell.ifaName : cell.name} — click to explore`}>
                      {isIfa ? (
                        <>
                          <span className="ptoe-cell__ifa-expr">Ifa</span>
                          <span className="ptoe-cell__name">{cell.name}</span>
                          {cell.alias && <span className="ptoe-cell__alias">{cell.alias}</span>}
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
          <div className="ptoe-row ptoe-row--others">
            <div className="ptoe-row-hd">
              <span className="ptoe-row-hd__r">…</span>
              <span className="ptoe-row-hd__vi">VI</span>
            </div>
            {STEAMSEX.map(cat => (
              <div key={cat.id} className="ptoe-cell ptoe-cell--others" style={{'--col-c': cat.color}}>
                <span className="ptoe-cell__name">Others</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="ptoe-axes">
        <div className="ptoe-axis ptoe-axis--hi"><span>→</span><strong>HI</strong> — Subjects side by side (Horizontal)</div>
        <div className="ptoe-axis ptoe-axis--vi"><span>↓</span><strong>VI</strong> — Deeper within each subject (Vertical)</div>
      </div>
    </div>
  );
}

/* ── IfaCircle Matrix ── */
function IfaCircleMatrix({ onCellClick }) {
  const [activeCatId, setActiveCatId] = useState(null);
  const CX = 400, CY = 400;
  const IFA_R  = 68, CAT_R  = 192, DISC_R = 120, CAT_NR = 22, DISC_NR = 22;

  const catNodes = STEAMSEX.map((cat, i) => {
    const angle = (i * 45 - 90) * Math.PI / 180;
    return { ...cat, x: CX + CAT_R*Math.cos(angle), y: CY + CAT_R*Math.sin(angle), angle, colIndex: i };
  });
  const activeCat = catNodes.find(c => c.id === activeCatId) ?? null;
  const discCells = activeCat
    ? [...PTOE_DATA.filter(d => d.col === activeCat.colIndex),
       { id:`${activeCat.id}-others`, row:8, col:activeCat.colIndex,
         name:'Others', ifaName:`Ifa ${activeCat.name} — Others`, alias:null, isOthers:true }]
    : [];
  const discNodes = discCells.map((disc, i) => {
    const count = discCells.length;
    const spread = (240 * Math.PI) / 180;
    const startA = activeCat.angle - spread / 2;
    const a = count > 1 ? startA + (i / (count-1)) * spread : activeCat.angle;
    return { ...disc, x: activeCat.x + DISC_R*Math.cos(a), y: activeCat.y + DISC_R*Math.sin(a), angle: a };
  });
  const handleCatClick = id => setActiveCatId(p => p === id ? null : id);
  const tx = CX + IFA_R, ty = CY, ts = 10;

  return (
    <div className="ifacm">
      {activeCat && (
        <div className="ifacm__legend" style={{'--lc': activeCat.color}}>
          <span className="ifacm__legend-icon">{activeCat.icon}</span>
          <strong className="ifacm__legend-name">{activeCat.name}</strong>
          <span className="ifacm__legend-kid">— {activeCat.kidName}</span>
          <span className="ifacm__legend-hint">· click any subject to explore it</span>
          <button className="ifacm__back" onClick={() => setActiveCatId(null)}>← All</button>
        </div>
      )}
      <div className="ifacm__wrap">
        <svg viewBox="0 0 800 800" className="ifacm__svg"
          aria-label="IfaCircle — click a category to see its subjects">
          <defs>
            <filter id="icm-g"  x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="5" result="b"/>
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <filter id="icm-xl" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="14" result="b"/>
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>
          <circle cx={CX} cy={CY} r={CAT_R} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" strokeDasharray="4 8"/>
          {catNodes.map(n => (
            <line key={`spk-${n.id}`} x1={CX} y1={CY} x2={n.x} y2={n.y}
              stroke={activeCatId===n.id ? n.color : 'rgba(255,255,255,0.07)'}
              strokeWidth={activeCatId===n.id ? 1.5 : 0.8} strokeDasharray="4 6"/>
          ))}
          {activeCat && discNodes.map(d => (
            <line key={`dl-${d.id}`} x1={activeCat.x} y1={activeCat.y} x2={d.x} y2={d.y}
              stroke={activeCat.color} strokeWidth="1" strokeOpacity="0.2" strokeDasharray="3 4"/>
          ))}
          <circle cx={CX} cy={CY} r={IFA_R} fill="none" stroke="#f5c518" strokeWidth="26" strokeOpacity="0.06" filter="url(#icm-xl)"/>
          <circle cx={CX} cy={CY} r={IFA_R} fill="none" stroke="#f5c518" strokeWidth="10" strokeOpacity="0.5"  filter="url(#icm-g)"/>
          <circle cx={CX} cy={CY} r={IFA_R} fill="none" stroke="#f5c518" strokeWidth="4"/>
          <circle cx={CX} cy={CY} r={IFA_R} fill="none" stroke="#fff9c4" strokeWidth="1.2" strokeOpacity="0.4"/>
          <circle cx={CX} cy={CY} r={IFA_R - 9} fill="rgba(245,197,24,0.025)"/>
          <circle cx={CX} cy={CY} r={5} fill="#fffff0" filter="url(#icm-g)"/>
          <polygon points={`${tx-ts},${ty-ts} ${tx+ts},${ty-ts} ${tx},${ty+ts}`}
            fill="#f5c518" fillOpacity="0.9" filter="url(#icm-g)"/>
          <text x={CX} y={CY-10} textAnchor="middle" fill="#f5c518" fontSize="7" fontWeight="700"
            letterSpacing="2" fontFamily="'Courier New',monospace">NODE 0</text>
          <text x={CX} y={CY+4}  textAnchor="middle" fill="#f5c518" fontSize="6.5" opacity="0.6">Ogbe · CEN</text>
          <text x={CX} y={CY+17} textAnchor="middle" fill="#f5c518" fontSize="5.5" opacity="0.38">IfaCircle · All Knowledge</text>
          {catNodes.map(n => {
            const isActive = activeCatId === n.id;
            const isOther  = activeCatId && !isActive;
            const ca = Math.cos(n.angle), sa = Math.sin(n.angle);
            const OFF = CAT_NR + 17;
            const lx = n.x + OFF*ca, ly = n.y + OFF*sa;
            const anchor = ca > 0.4 ? 'start' : ca < -0.4 ? 'end' : 'middle';
            const words = n.name.split(' ');
            const lineH = 11, totalH = (words.length-1)*lineH;
            return (
              <g key={n.id} onClick={() => handleCatClick(n.id)} style={{cursor:'pointer'}} opacity={isOther ? 0.22 : 1}>
                {isActive && <circle cx={n.x} cy={n.y} r={CAT_NR+18} fill={n.color} fillOpacity="0.1" filter="url(#icm-xl)"/>}
                <circle cx={n.x} cy={n.y} r={CAT_NR}
                  fill={isActive ? `${n.color}28` : `${n.color}15`}
                  stroke={n.color} strokeWidth={isActive ? 2.5 : 1.4}/>
                <text x={n.x} y={n.y+5} textAnchor="middle" fill={n.color} fontSize="14" fontWeight="800">{n.icon}</text>
                {words.map((w, wi) => (
                  <text key={wi} x={lx} y={ly - totalH/2 + wi*lineH + 4}
                    textAnchor={anchor}
                    fill={isActive ? n.color : 'rgba(232,236,242,0.72)'}
                    fontSize="8.5" fontWeight={isActive ? '700' : '400'}>{w}</text>
                ))}
              </g>
            );
          })}
          {activeCat && discNodes.map(d => {
            const da = Math.cos(d.angle), dsin = Math.sin(d.angle);
            const OFF = DISC_NR + 17;
            const lx = d.x + OFF*da, ly = d.y + OFF*dsin;
            const anchor = da > 0.4 ? 'start' : da < -0.4 ? 'end' : 'middle';
            const dwords = d.name.split(' ');
            const lineH = 11, totalH = (dwords.length-1)*lineH;
            const shortLabel = d.alias ? d.alias.replace('Ifa','') : (d.name.length<=6 ? d.name : d.name.slice(0,5));
            return (
              <g key={d.id} onClick={() => onCellClick(d)} style={{cursor:'pointer'}}>
                <circle cx={d.x} cy={d.y} r={DISC_NR}
                  fill={`${activeCat.color}15`} stroke={activeCat.color} strokeWidth="1.4"/>
                <text x={d.x} y={d.y+5} textAnchor="middle" fill={activeCat.color} fontSize="7" fontWeight="800">{shortLabel}</text>
                {dwords.map((w, wi) => (
                  <text key={wi} x={lx} y={ly - totalH/2 + wi*lineH + 4}
                    textAnchor={anchor} fill="rgba(232,236,242,0.72)" fontSize="8.5">{w}</text>
                ))}
              </g>
            );
          })}
        </svg>
      </div>
      {!activeCat && (
        <p className="ifacm__hint">
          Click any category circle to reveal its subjects · Click a subject to explore its 8 Dimensions
        </p>
      )}
    </div>
  );
}

/* ── Playground Header ── */
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
            <span>←</span><span>IfaLens</span>
          </a>
          <span className="pg-header__sep">/</span>
          <span className="pg-header__title">
            <span className="pg-header__ifa">IFA Academy</span> Playground
          </span>
          <span className="pg-header__badge pg-header__badge--academy">BEGINNERS</span>
        </div>
        <nav className="pg-header__nav">
          <a href="/" className="pg-header__link">IFA Internet</a>
          <a href="../playground/" className="pg-header__link">Advanced →</a>
          <a href="/ifa-lms/ifa-academy/#" className="pg-header__cta">IFA Academy →</a>
        </nav>
      </div>
    </header>
  );
}

/* ── Ifa Import Tab data ── */
const IMPORT_EXAMPLES = [
  { fieldA:'Mathematics', fieldB:'Physics',     colorA:'#a855f7', colorB:'#4aa3ff', result:'Mathematical Physics',  dual:'Physicomathematics' },
  { fieldA:'Economics',   fieldB:'Physics',     colorA:'#00c87c', colorB:'#4aa3ff', result:'Econophysics',           dual:'Physicoeconomics'   },
  { fieldA:'Biology',     fieldB:'Chemistry',   colorA:'#e9498a', colorB:'#00d9b8', result:'Biochemistry',           dual:'Chemobiology'       },
  { fieldA:'Biology',     fieldB:'Physics',     colorA:'#e9498a', colorB:'#4aa3ff', result:'Biophysics',             dual:'Physicobiology'     },
  { fieldA:'Biology',     fieldB:'Mathematics', colorA:'#e9498a', colorB:'#a855f7', result:'Biomathematics',         dual:'Mathobiology'       },
  { fieldA:'Psychology',  fieldB:'Physics',     colorA:'#ff8c35', colorB:'#4aa3ff', result:'Psychophysics',          dual:'Physicopsychology'  },
];

const IMPORT_FIELD_GROUPS = [
  { label:'Natural Science', fields:[
    {name:'Astronomy',color:'#4aa3ff'},{name:'Biology',color:'#4aa3ff'},
    {name:'Chemistry',color:'#4aa3ff'},{name:'Computer Science',color:'#4aa3ff'},
    {name:'Geology',color:'#4aa3ff'},{name:'Neuroscience',color:'#4aa3ff'},
    {name:'Physics',color:'#4aa3ff'},
  ]},
  { label:'Technology', fields:[
    {name:'Artificial Intelligence',color:'#00d9b8'},{name:'Biotechnology',color:'#00d9b8'},
    {name:'Energy Technology',color:'#00d9b8'},{name:'Information Technology',color:'#00d9b8'},
    {name:'Nanotechnology',color:'#00d9b8'},{name:'Neurotechnology',color:'#00d9b8'},
    {name:'Robotics',color:'#00d9b8'},
  ]},
  { label:'Engineering', fields:[
    {name:'Aerospace Engineering',color:'#f5c518'},{name:'Bioengineering',color:'#f5c518'},
    {name:'Chemical Engineering',color:'#f5c518'},{name:'Civil Engineering',color:'#f5c518'},
    {name:'Computer Engineering',color:'#f5c518'},{name:'Mechanical Engineering',color:'#f5c518'},
    {name:'Petroleum Engineering',color:'#f5c518'},
  ]},
  { label:'Arts', fields:[
    {name:'Architecture',color:'#e9498a'},{name:'Film & Media Arts',color:'#e9498a'},
    {name:'Literary Arts',color:'#e9498a'},{name:'Music',color:'#e9498a'},
    {name:'Performing Arts',color:'#e9498a'},{name:'Philosophy',color:'#e9498a'},
    {name:'Visual Arts',color:'#e9498a'},
  ]},
  { label:'Mathematics', fields:[
    {name:'Algebra',color:'#a855f7'},{name:'Arithmetic',color:'#a855f7'},
    {name:'Calculus',color:'#a855f7'},{name:'Geometry',color:'#a855f7'},
    {name:'Mathematics',color:'#a855f7'},{name:'Number Theory',color:'#a855f7'},
    {name:'Statistics',color:'#a855f7'},{name:'Trigonometry',color:'#a855f7'},
  ]},
  { label:'Social Science', fields:[
    {name:'Anthropology',color:'#00c87c'},{name:'Economics',color:'#00c87c'},
    {name:'History',color:'#00c87c'},{name:'Linguistics',color:'#00c87c'},
    {name:'Political Science',color:'#00c87c'},{name:'Psychology',color:'#00c87c'},
    {name:'Sociology',color:'#00c87c'},
  ]},
  { label:'Education', fields:[
    {name:'Early Childhood Education',color:'#ff8c35'},
    {name:'Educational Psychology',color:'#ff8c35'},
    {name:'Higher Education',color:'#ff8c35'},
    {name:'Science Education',color:'#ff8c35'},
    {name:'Special Education',color:'#ff8c35'},
  ]},
];

const IMPORT_FIELDS = IMPORT_FIELD_GROUPS.flatMap(g => g.fields);

const FIELD_COMB = {
  'Astronomy':['Astro','astronomy'],'Biology':['Bio','biology'],
  'Chemistry':['Chemo','chemistry'],'Computer Science':['Computational','computing'],
  'Geology':['Geo','geology'],'Neuroscience':['Neuro','neuroscience'],
  'Physics':['Physico','physics'],'Artificial Intelligence':['AI-','artificial intelligence'],
  'Biotechnology':['Biotech','biotechnology'],'Energy Technology':['Energo','energy technology'],
  'Information Technology':['Info','information technology'],
  'Nanotechnology':['Nano','nanotechnology'],'Neurotechnology':['Neurotech','neurotechnology'],
  'Robotics':['Robo','robotics'],'Aerospace Engineering':['Aero','aerospace engineering'],
  'Bioengineering':['Bioeng','bioengineering'],'Chemical Engineering':['ChemEng','chemical engineering'],
  'Civil Engineering':['Civilo','civil engineering'],'Computer Engineering':['Computo','computer engineering'],
  'Mechanical Engineering':['Mechano','mechanical engineering'],
  'Petroleum Engineering':['Petrolo','petroleum engineering'],
  'Architecture':['Architecto','architecture'],'Film & Media Arts':['Filmo','film & media arts'],
  'Literary Arts':['Litero','literary arts'],'Music':['Musico','music'],
  'Performing Arts':['Perfo','performing arts'],'Philosophy':['Philosopho','philosophy'],
  'Visual Arts':['Visuo','visual arts'],'Algebra':['Algebro','algebra'],
  'Arithmetic':['Arithmo','arithmetic'],'Calculus':['Calculo','calculus'],
  'Geometry':['Geometro','geometry'],'Mathematics':['Mathematico','mathematics'],
  'Number Theory':['Numbero','number theory'],'Statistics':['Statisto','statistics'],
  'Trigonometry':['Trigono','trigonometry'],'Anthropology':['Anthropo','anthropology'],
  'Economics':['Econo','economics'],'History':['Historio','history'],
  'Linguistics':['Linguo','linguistics'],'Political Science':['Politico','political science'],
  'Psychology':['Psycho','psychology'],'Sociology':['Socio','sociology'],
  'Early Childhood Education':['EarlyEdu','early childhood education'],
  'Educational Psychology':['EduPsycho','educational psychology'],
  'Higher Education':['HiEdu','higher education'],
  'Science Education':['SciEdu','science education'],
  'Special Education':['SpecialEdu','special education'],
};

function buildInterdisciplName(a, b) {
  const [ap = a.split(' ')[0]] = FIELD_COMB[a] || [];
  const [, bs = b.toLowerCase()] = FIELD_COMB[b] || [];
  return ap + bs;
}

const EOFX_EXAMPLES = [
  { field:'Physics',  color:'#4aa3ff', desc:'Ifa Physics studies the physical nature of Energy — applying Ifa Field Theory to mass, force, motion, and spacetime. It asks: what is everything made of, and how does it move?' },
  { field:'Medicine', color:'#e9498a', desc:'Ifa Medicine studies the medical nature of Energy — applying IFABOK to health, healing, and the body as an energy system. It asks: what is health, and how do we restore it?' },
  { field:'Music',    color:'#a855f7', desc:'Ifa Music studies the musical nature of Energy — sound, vibration, rhythm, and harmony. It asks: what is beauty in sound, and why does music move us emotionally?' },
  { field:'Economics',color:'#00c87c', desc:'Ifa Economics studies the economic nature of Energy — value, exchange, and resource flow. It asks: how do we share what we have, and how does wealth move through society?' },
  { field:'Art',      color:'#ff8c35', desc:'Ifa Art studies the artistic nature of Energy — form, beauty, and creative expression. It asks: what is beauty, how do we create it, and what does it tell us about ourselves?' },
];

function EnergyLine() {
  return (
    <div className="iimport-eline" aria-hidden="true">
      <span className="iimport-eline__arr">◄</span>
      <div className="iimport-eline__track">
        <span className="iimport-eline__lbl">Energy</span>
      </div>
      <span className="iimport-eline__arr">►</span>
    </div>
  );
}

function EnergyBridgeCard({ fieldA, fieldB, result, dual, colorA, colorB }) {
  return (
    <div className="iimport-card">
      <div className="iimport-row">
        <span className="iimport-fname" style={{color:colorA}}>{fieldA}</span>
        <EnergyLine/>
        <span className="iimport-fname" style={{color:colorB}}>{fieldB}</span>
        <span className="iimport-paren">(<strong className="iimport-result-name">{result}</strong>)</span>
      </div>
      <div className="iimport-dual-row">
        <span className="iimport-dual-tag">Dual</span>
        <span className="iimport-fname iimport-fname--sm" style={{color:colorB}}>{fieldB}</span>
        <EnergyLine/>
        <span className="iimport-fname iimport-fname--sm" style={{color:colorA}}>{fieldA}</span>
        <span className="iimport-paren iimport-paren--sm">(<strong className="iimport-result-name">{dual}</strong>)</span>
      </div>
    </div>
  );
}

function IfaImportTab() {
  const [fa, setFa] = useState('Mathematics');
  const [fb, setFb] = useState('Physics');
  const [eofxField, setEofxField] = useState('');
  const fAdata = IMPORT_FIELDS.find(f => f.name === fa) || IMPORT_FIELDS[0];
  const fBdata = IMPORT_FIELDS.find(f => f.name === fb) || IMPORT_FIELDS[1];
  const customResult = fa !== fb ? buildInterdisciplName(fa, fb) : null;
  const customDual   = fa !== fb ? buildInterdisciplName(fb, fa) : null;
  return (
    <div className="iimport-tab">
      <div className="iimport-hd">
        <div className="pg-badge">Ifa Import · Subject Connector · IFABOK Tool</div>
        <h1 className="iimport-title">IfaImport: Connect Any Two Subjects</h1>
        <p className="iimport-lead">
          <strong>Ifa Import</strong> is one of the most powerful ideas in the IFA Academy.
          It shows you how to <strong>borrow tools and ideas from one subject and use them
          in another subject</strong> — creating entirely new fields of knowledge!
        </p>
        <hr className="ifaview-tab__divider"/>
        <p className="iimport-lead">
          When you connect any two subjects through <strong>Energy</strong> (Ogbe), you create
          a new interdisciplinary field. This is how biophysics, biochemistry, econophysics,
          and thousands of other combined subjects were born.
        </p>
      </div>

      <div className="iimport-concept">
        <div className="iimport-concept__ogbe">Ogbe</div>
        <p className="iimport-concept__text">
          The universal connector between any two subjects is <strong>Energy</strong> — called{' '}
          <strong>Ogbe</strong> or CEN in the IFA Academy. Because <em>everything is Energy</em>,
          any subject can share tools and ideas with any other subject through their shared
          Energy foundation. That is why a physicist can do economics — and vice versa!
        </p>
      </div>

      <div className="iimport-section-hd">
        <h2 className="iimport-section-title">Energy Bridge — Subject Connections</h2>
        <p className="iimport-section-sub">
          Two subjects joined by the Energy Bridge produce a new combined subject.
          Reversing the direction gives its <strong>Dual</strong> — the same connection
          from the second subject's perspective.
        </p>
      </div>

      <div className="iimport-examples">
        {IMPORT_EXAMPLES.map((ex, i) => <EnergyBridgeCard key={i} {...ex}/>)}
      </div>

      <div className="iimport-builder">
        <div className="iimport-builder__hd">
          <h3 className="iimport-builder__title">Build Your Own Energy Bridge</h3>
          <p className="iimport-builder__sub">Select any two subjects to connect them via Energy (Ogbe)</p>
        </div>
        <div className="iimport-selectors">
          <div className="iimport-sel-wrap">
            <label className="iimport-sel-label">Subject A</label>
            <select className="iimport-sel" value={fa} onChange={e => setFa(e.target.value)}>
              {IMPORT_FIELD_GROUPS.map(g => (
                <optgroup key={g.label} label={g.label}>
                  {g.fields.map(f => <option key={f.name}>{f.name}</option>)}
                </optgroup>
              ))}
            </select>
          </div>
          <div className="iimport-sel-sep">◄─ Energy ─►</div>
          <div className="iimport-sel-wrap">
            <label className="iimport-sel-label">Subject B</label>
            <select className="iimport-sel" value={fb} onChange={e => setFb(e.target.value)}>
              {IMPORT_FIELD_GROUPS.map(g => (
                <optgroup key={g.label} label={g.label}>
                  {g.fields.map(f => <option key={f.name}>{f.name}</option>)}
                </optgroup>
              ))}
            </select>
          </div>
        </div>
        {fa !== fb ? (
          <EnergyBridgeCard fieldA={fa} fieldB={fb}
            colorA={fAdata.color} colorB={fBdata.color}
            result={customResult} dual={customDual}/>
        ) : (
          <p className="iimport-builder__same">Select two different subjects to see the Energy Bridge.</p>
        )}
      </div>

      <div className="iimport-eofx">
        <div className="iimport-section-hd">
          <h3 className="iimport-section-title">
            Energy of the Form X <span className="iimport-tag">EoFX</span>
          </h3>
          <p className="iimport-section-sub">Express any subject as a mathematical energyform</p>
        </div>
        <p className="iimport-lead">
          <strong>EoFX</strong> is a simple but powerful idea: every subject <em>X</em> is a
          different <strong>form of Energy</strong>. So <strong>Ifa X</strong> (or{' '}
          <strong>ToE X</strong>) means: studying the <em>X-nature of Energy</em>.
          Every subject, when studied through the IFA Academy, becomes an expression of the
          one universal Energy — Ogbe (CEN).
        </p>
        <div className="iimport-eofx__formula">
          <span className="iimport-eofx__lhs">Ifa <em>X</em></span>
          <span className="iimport-eofx__eq">=</span>
          <span className="iimport-eofx__rhs">Energy of the form, <em>X</em></span>
        </div>
        <div className="iimport-eofx__examples">
          {EOFX_EXAMPLES.map(ex => (
            <div key={ex.field} className="iimport-eofx__card">
              <div className="iimport-eofx__card-top">
                <span className="iimport-eofx__ifa" style={{color:ex.color}}>Ifa {ex.field}</span>
                <span className="iimport-eofx__eq2">=</span>
                <span className="iimport-eofx__energy">Energy of the form, <em style={{color:ex.color}}>{ex.field}</em></span>
              </div>
              <p className="iimport-eofx__desc">{ex.desc}</p>
            </div>
          ))}
        </div>
        <div className="iimport-eofx__builder">
          <label className="iimport-eofx__builder-lbl">
            Generate any <strong>Ifa X</strong> — enter any subject <em>X</em>:
          </label>
          <div className="iimport-eofx__builder-row">
            <input className="iimport-eofx__input" type="text"
              placeholder="e.g. Law, Sports, Architecture, Football…"
              value={eofxField} onChange={e => setEofxField(e.target.value)} maxLength={60}/>
          </div>
          {eofxField.trim() && (
            <div className="iimport-eofx__result">
              <div className="iimport-eofx__result-line">
                <span className="iimport-eofx__result-ifa">Ifa {eofxField.trim()}</span>
                <span className="iimport-eofx__result-eq"> = </span>
                <span className="iimport-eofx__result-energy">
                  Energy of the form, <em>{eofxField.trim()}</em>
                </span>
              </div>
              <p className="iimport-eofx__result-desc">
                An IFA Academy program that studies <strong>{eofxField.trim()}</strong> as a
                form of Energy — asking: what is the <em>{eofxField.trim()}-nature of Energy</em>?
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── ANALOGIES data ── */
const ANALOGIES = [
  {
    id: 'atom-solar',
    dim: 'S',
    fieldA: 'Physics',      colorA: '#4aa3ff',
    fieldB: 'Astronomy',    colorB: '#8892a4',
    conceptA: 'The Atom',
    conceptB: 'The Solar System',
    bridge: 'Orbiting Structure',
    explain: 'An atom has a nucleus in the middle with electrons orbiting around it — just like the Solar System has the Sun at the centre with planets orbiting around it! Both follow the same pattern: a heavy core with lighter things spinning around it.',
    pairs: [
      ['Nucleus', 'The Sun'],
      ['Electrons', 'Planets'],
      ['Electromagnetic force', 'Gravity'],
      ['Atomic radius', 'Orbital distance'],
    ],
  },
  {
    id: 'dna-code',
    dim: 'I',
    fieldA: 'Biology',          colorA: '#e9498a',
    fieldB: 'Computer Science', colorB: '#4aa3ff',
    conceptA: 'DNA',
    conceptB: 'Source Code',
    bridge: 'Blueprint of Instructions',
    explain: 'DNA is the instruction manual that tells every cell how to build and run your body — just like source code is the instruction manual that tells a computer what to do! Both use a tiny alphabet of symbols to store incredibly complex instructions.',
    pairs: [
      ['DNA strand', 'Program file'],
      ['Nucleotides (A, T, G, C)', 'Characters (0, 1, letters)'],
      ['Gene', 'Function / subroutine'],
      ['Protein produced', 'Program output'],
    ],
  },
  {
    id: 'brain-computer',
    dim: 'C',
    fieldA: 'Neuroscience',     colorA: '#00d9b8',
    fieldB: 'Computer Science', colorB: '#4aa3ff',
    conceptA: 'The Human Brain',
    conceptB: 'A Computer',
    bridge: 'Information Processing System',
    explain: 'Your brain and a computer are both machines for processing information! They store memories, run programs, communicate through signals, and can learn new things — using very different technology but exactly the same big idea.',
    pairs: [
      ['Neurons', 'Transistors'],
      ['Synapses', 'Connections / wires'],
      ['Long-term memory', 'Hard drive (storage)'],
      ['Short-term memory', 'RAM (working memory)'],
      ['Sleep (memory consolidation)', 'Saving / backup'],
    ],
  },
  {
    id: 'evolution-software',
    dim: 'R',
    fieldA: 'Biology',    colorA: '#e9498a',
    fieldB: 'Technology', colorB: '#00d9b8',
    conceptA: 'Evolution by Natural Selection',
    conceptB: 'Software Development',
    bridge: 'Survival of the Best Version',
    explain: 'In nature, animals best adapted to their environment survive and reproduce — bad traits die out over time. Software works the same way: developers test their code, remove what does not work, and keep improving what does. Both are driven by selecting the fittest version!',
    pairs: [
      ['Organism', 'Software version / build'],
      ['Mutation', 'Code change / update'],
      ['Natural selection', 'User testing / feedback'],
      ['Survival of the fittest', 'Best version is shipped'],
      ['Extinction', 'Deprecated / deleted code'],
    ],
  },
  {
    id: 'chemistry-cooking',
    dim: 'C',
    fieldA: 'Chemistry', colorA: '#00d9b8',
    fieldB: 'Arts',      colorB: '#e9498a',
    conceptA: 'A Chemical Reaction',
    conceptB: 'A Cooking Recipe',
    bridge: 'Combining Ingredients to Make Something New',
    explain: 'When you cook, you mix ingredients in the right amounts and apply heat to create something completely new — that is exactly what chemists do with chemicals! Cooking IS chemistry, and every kitchen is a chemistry laboratory.',
    pairs: [
      ['Reactants (starting chemicals)', 'Ingredients'],
      ['Catalyst', 'Heat / the oven'],
      ['Chemical equation', 'The recipe'],
      ['Product (result)', 'The finished dish'],
      ['Exothermic reaction', 'Baking / grilling (gives off heat)'],
    ],
  },
  {
    id: 'newtons-3rd-history',
    dim: 'D',
    fieldA: 'Physics',        colorA: '#4aa3ff',
    fieldB: 'Social Science', colorB: '#00c87c',
    conceptA: "Newton's 3rd Law",
    conceptB: 'Cause & Effect in History',
    bridge: 'Every Action Has a Reaction',
    explain: "Newton's 3rd Law says: for every action, there is an equal and opposite reaction. History works exactly the same way! Every major event (action) produces a response from people and nations (reaction). The patterns of physics and history mirror each other perfectly.",
    pairs: [
      ['Force applied', 'Historical action / event'],
      ['Equal opposite reaction', 'Historical response / consequence'],
      ['Two objects interacting', 'Two nations or groups in conflict'],
      ['Balanced forces', 'Peace / equilibrium'],
      ['Unbalanced forces', 'Revolution or war'],
    ],
  },
  {
    id: 'note-fraction',
    dim: 'S',
    fieldA: 'Music',       colorA: '#a855f7',
    fieldB: 'Mathematics', colorB: '#a855f7',
    conceptA: 'Musical Rhythm & Notes',
    conceptB: 'Fractions & Patterns',
    bridge: 'Dividing Time into Equal Parts',
    explain: 'Music IS mathematics you can hear! A whole note lasts 4 beats. A half note lasts 2. A quarter note lasts 1 beat. These are the same as fractions ½ and ¼. When musicians write a time signature like 4/4, they are literally writing a fraction!',
    pairs: [
      ['Whole note (4 beats)', '1 (one whole)'],
      ['Half note (2 beats)', '½ (one half)'],
      ['Quarter note (1 beat)', '¼ (one quarter)'],
      ['Time signature (4/4)', 'A fraction'],
      ['The beat / pulse', 'The common denominator'],
    ],
  },
  {
    id: 'ecosystem-economy',
    dim: 'H',
    fieldA: 'Biology',   colorA: '#e9498a',
    fieldB: 'Economics', colorB: '#00c87c',
    conceptA: 'An Ecosystem',
    conceptB: 'An Economy',
    bridge: 'Interconnected Systems of Exchange',
    explain: 'A forest ecosystem works just like an economy! Plants make energy (like factories), herbivores eat plants (like consumers), carnivores eat herbivores. Remove one player and the whole system changes. Both are living networks of exchange that need balance to survive.',
    pairs: [
      ['Producers (plants)', 'Manufacturers / factories'],
      ['Consumers (animals)', 'Consumers (people buying)'],
      ['Decomposers (fungi)', 'Recycling / waste management'],
      ['Food web', 'Supply chain'],
      ['Energy flow', 'Money / value flow'],
    ],
  },
  {
    id: 'grammar-syntax',
    dim: 'I',
    fieldA: 'Linguistics',      colorA: '#8892a4',
    fieldB: 'Computer Science', colorB: '#4aa3ff',
    conceptA: 'Language Grammar',
    conceptB: 'Programming Syntax',
    bridge: 'Rules That Make Communication Possible',
    explain: 'Every language has grammar rules that tell you how to put words together correctly. Every programming language has syntax rules telling you how to write code correctly. Break the grammar rules and people cannot understand you — break the syntax rules and the computer refuses to run your code!',
    pairs: [
      ['Grammar rules', 'Syntax rules'],
      ['Sentence', 'Statement / line of code'],
      ['Noun', 'Variable / object'],
      ['Verb', 'Function / method'],
      ['Punctuation (. , !)', 'Semicolons, brackets { } ;'],
    ],
  },
  {
    id: 'gravity-markets',
    dim: 'E',
    fieldA: 'Physics',   colorA: '#4aa3ff',
    fieldB: 'Economics', colorB: '#00c87c',
    conceptA: 'Gravity',
    conceptB: 'Market Attraction',
    bridge: 'Invisible Forces That Pull Things Together',
    explain: 'Gravity is an invisible force that pulls objects toward each other — the bigger the object, the stronger the pull. Markets work the same way! Big cities attract more businesses and workers. Wealthy customers attract more products. Both are invisible yet enormously powerful forces that shape the world.',
    pairs: [
      ['Mass', 'Wealth / purchasing power'],
      ['Gravitational pull', 'Market demand'],
      ['Orbit (stable path)', 'Market equilibrium'],
      ['Escape velocity', 'Breaking out of poverty / debt'],
      ['Black hole', 'Monopoly (everything gets pulled in)'],
    ],
  },
  {
    id: 'cell-city',
    dim: 'C',
    fieldA: 'Biology',       colorA: '#e9498a',
    fieldB: 'Social Science', colorB: '#00c87c',
    conceptA: 'A Living Cell',
    conceptB: 'A City',
    bridge: 'A Complex System with Specialised Parts',
    explain: 'A single cell is like a tiny city! It has a control centre, power plants, factories, a transport network, and a boundary wall. Both a cell and a city are self-organising systems where many specialised parts work together to keep the whole thing alive and functioning.',
    pairs: [
      ['Nucleus (control centre)', 'City hall / government'],
      ['Mitochondria (power plant)', 'Power stations'],
      ['Ribosomes (protein factories)', 'Factories / manufacturing'],
      ['Cell membrane (boundary)', 'City walls / borders'],
      ['Endoplasmic reticulum (transport)', 'Roads / transport network'],
    ],
  },
  {
    id: 'light-sound',
    dim: 'D',
    fieldA: 'Physics', colorA: '#4aa3ff',
    fieldB: 'Music',   colorB: '#a855f7',
    conceptA: 'Light Waves',
    conceptB: 'Sound Waves',
    bridge: 'Waves Carrying Information',
    explain: 'Light and sound are both waves — but light travels through empty space and sound needs air to travel. Both have frequency (how fast they vibrate) and amplitude (how loud/bright they are). A high-frequency sound is a high pitch; a high-frequency light is a colour towards violet. They are perfect mirrors of each other!',
    pairs: [
      ['Frequency (of light)', 'Frequency (of sound / pitch)'],
      ['Amplitude (brightness)', 'Amplitude (volume / loudness)'],
      ['Colour (wavelength)', 'Musical note (wavelength)'],
      ['Electromagnetic spectrum', 'Musical spectrum (audible range)'],
      ['Interference (light patterns)', 'Harmony & dissonance (sound)'],
    ],
  },
];

/* ── Ifa Map data ── */
const _R2D = Math.PI / 180;
const mp = (r, deg) => [+(r*Math.cos(deg*_R2D)).toFixed(1), +(r*Math.sin(deg*_R2D)).toFixed(1)];

const STEAM_RING = [
  { id:'ms-sci',  label:'Natural\nScience', short:'Science',    icon:'⚗', color:'#4aa3ff', angle:-90  },
  { id:'ms-tech', label:'Technology',       short:'Technology', icon:'⌬', color:'#00d9b8', angle:-45  },
  { id:'ms-eng',  label:'Engineering',      short:'Eng.',       icon:'⚙', color:'#f5c518', angle:0    },
  { id:'ms-arts', label:'Arts',             short:'Arts',       icon:'✦', color:'#e9498a', angle:45   },
  { id:'ms-math', label:'Mathematics',      short:'Math',       icon:'∑', color:'#a855f7', angle:90   },
  { id:'ms-soc',  label:'Social\nScience',  short:'Social',     icon:'⊛', color:'#00c87c', angle:135  },
  { id:'ms-edu',  label:'Education',        short:'Education',  icon:'⬡', color:'#ff8c35', angle:180  },
  { id:'ms-x',    label:'Others (X)',       short:'Others',     icon:'◈', color:'#8892a4', angle:-135 },
].map(n => { const [x,y]=mp(185,n.angle); return {...n,x,y,r:22,ring:1}; });

const DISC_RING = [
  { pid:'ms-sci',  id:'d-physics',   label:'Physics',     alias:'IfaPhy',     ao:-18, color:'#4aa3ff',
    title:'Ifa Physics', body:'The Physics of Everything — IfaPhysics unifies quantum, classical, and relativistic physics through the 16 Principal Ifa Codes and the CEN Unified Field.', href:'../ifa-physics-test/' },
  { pid:'ms-sci',  id:'d-bio',       label:'Biology',     alias:'IfaBio',     ao:0,   color:'#4aa3ff',
    title:'Ifa Biology', body:'Life as CEN Energy in motion. IfaBiology studies all living systems — from single cells to the biosphere — through the 256 Odu Ifa as the universal matrix of life.', href:null },
  { pid:'ms-sci',  id:'d-chem',      label:'Chemistry',   alias:'IfaChem',    ao:18,  color:'#4aa3ff',
    title:'Ifa Chemistry', body:'Matter transformation as energy exchange. IfaChemistry maps every molecular interaction to Odu-encoded energy configurations, grounding all chemistry in CEN principles.', href:null },
  { pid:'ms-tech', id:'d-ai',        label:'Ifai · AI',   alias:'IfaAI',      ao:-18, color:'#00d9b8',
    title:'Ifa AI — Ifai', body:'Consciousness AI — IfaAI models machine intelligence as CEN Energy in action, grounding artificial intelligence in the 256 Odu knowledge structures.', href:'../ifai/' },
  { pid:'ms-tech', id:'d-biotech',   label:'Biotech',     alias:'IfaBiotech', ao:0,   color:'#00d9b8',
    title:'Ifa Biotechnology', body:'The technology of life — applying CEN Energy principles and Odu Ifa wisdom to biological engineering, synthetic biology, and the advancement of living systems.', href:null },
  { pid:'ms-tech', id:'d-computing', label:'Computing',   alias:'IfaCS',      ao:18,  color:'#00d9b8',
    title:'Ifa Computing', body:'The axiomatic computing framework of the IFA Internet — IfaBit, OduByte, and CEN Computing. Computation grounded in the binary wisdom of Ogbe (I) and Oyeku (II).', href:'../ifa-computing/' },
  { pid:'ms-eng',  id:'d-mecheng',   label:'Mech. Eng.',  alias:'IfaMechEng', ao:-18, color:'#f5c518',
    title:'Ifa Mechanical Engineering', body:'Forces, motion, and energy systems through the Odu Ifa mechanical principles — grounding all mechanical science in CEN Energy exchange dynamics.', href:null },
  { pid:'ms-eng',  id:'d-civeng',    label:'Civil Eng.',  alias:'IfaCivEng',  ao:0,   color:'#f5c518',
    title:'Ifa Civil Engineering', body:'Infrastructure and structural design as Ifa Composition — building CEN Energy into the physical world through the axiomatic principles of the 256 Odu Ifa.', href:null },
  { pid:'ms-eng',  id:'d-bioeng',    label:'Bioeng.',     alias:'IfaBioEng',  ao:18,  color:'#f5c518',
    title:'Ifa Bioengineering', body:'The engineering of living systems — fusing biology and engineering through Ifa principles to create technologies that work in harmony with the CEN field.', href:null },
  { pid:'ms-arts', id:'d-va',        label:'Visual Arts', alias:'IfaVA',      ao:-18, color:'#e9498a',
    title:'Ifa Visual Arts', body:'Image, form, and colour as CEN Energy expression. IfaVisual Arts is grounded in Ifa aesthetics — the visual language of the Odu Ifa as the universal grammar of beauty.', href:'../ifa-art-test/' },
  { pid:'ms-arts', id:'d-music',     label:'Music',       alias:'IfaMusic',   ao:0,   color:'#e9498a',
    title:'Ifa Music', body:'Sound and rhythm as CEN Energy vibration — every musical scale, mode, and harmonic series reflects the deep mathematical structure of the Odu Ifa and consciousness.', href:null },
  { pid:'ms-arts', id:'d-phi',       label:'Philosophy',  alias:'IfaPhi',     ao:18,  color:'#e9498a',
    title:'Ifa Philosophy', body:'The love of wisdom through Odu Ifa — consciousness examining itself through the lens of the Theory of Everything, from ontology to epistemology to the CEN field.', href:null },
  { pid:'ms-math', id:'d-algebra',   label:'IfaGebra',    alias:'IfaGebra',   ao:-18, color:'#a855f7',
    title:'Ifa Algebra — IfaGebra', body:'The axiomatic algebra of the IFA Internet — IfaGebra encodes the 256 Odu Ifa as algebraic structures, forming the mathematical DNA of all existence.', href:'../ifa-mathematica-test/' },
  { pid:'ms-math', id:'d-calc',      label:'IfaCalc',     alias:'IfaCalc',    ao:0,   color:'#a855f7',
    title:'Ifa Calculus — IfaCalc', body:'The mathematics of continuous change and accumulation — IfaCalc expresses CEN Energy flows, wave dynamics, and exchange rates through differential and integral calculus.', href:'../ifa-mathematica-test/' },
  { pid:'ms-math', id:'d-numth',     label:'Number Th.',  alias:'IfaNumTh',   ao:18,  color:'#a855f7',
    title:'Ifa Number Theory', body:'The deep mathematics of integers, primes, and number structure — grounded in the 256 Odu Ifa as the universal number matrix encoding all discrete patterns of reality.', href:'../ifa-number/' },
  { pid:'ms-soc',  id:'d-econ',      label:'Economics',   alias:'IfaEcon',    ao:-18, color:'#00c87c',
    title:'Ifa Economics — Eboconomics', body:'Economic systems grounded in energy exchange — every transaction is a CEN Energy flow. Eboconomics bridges energy science with economic meta-models.', href:'../ebology-the-field-of-energy-exchange/' },
  { pid:'ms-soc',  id:'d-psych',     label:'Psychology',  alias:'IfaPsych',   ao:0,   color:'#00c87c',
    title:'Ifa Psychology', body:'The science of consciousness and behaviour grounded in the CEN field — mapping psychological archetypes to the 256 Odu Ifa as the axiomatic matrix of human experience.', href:null },
  { pid:'ms-soc',  id:'d-hist',      label:'History',     alias:'IfaHist',    ao:18,  color:'#00c87c',
    title:'Ifa History', body:'The temporal record of CEN Energy manifestations across human civilisation — encoded in the Odu Ifa narrative tradition and the living memory of the IFA Internet.', href:null },
  { pid:'ms-edu',  id:'d-sciedu',    label:'Sci. Edu.',   alias:'IfaSciEdu',  ao:-18, color:'#ff8c35',
    title:'Ifa Science Education', body:'Teaching science through the IFABOK framework — making the Theory of Everything accessible to learners of all ages through immersive IFA Internet tools.', href:null },
  { pid:'ms-edu',  id:'d-academy',   label:'IFA Academy', alias:'IFABOK',     ao:0,   color:'#ff8c35',
    title:'IFA Academy of Polymaths', body:'The institution of polymathic education — the IFA Academy trains students across all STEAMSEX dimensions using the full IFABOK curriculum.', href:'https://ifainternet.org/ifa-lms/ifa-academy/#' },
  { pid:'ms-edu',  id:'d-higheredu', label:'Higher Edu.', alias:'IfaHiEdu',   ao:18,  color:'#ff8c35',
    title:'Ifa Higher Education', body:'University-level IFABOK education — the full depth of the Theory of Everything delivered at academic standard across all STEAMSEX knowledge fields.', href:null },
  { pid:'ms-x',    id:'d-ling',      label:'IfaLang',     alias:'IfaLang',    ao:-18, color:'#8892a4',
    title:'Ifa Language — IfaLang', body:'The Language of Everything — IfaLang is the formal language system of the IFA Internet, encoding knowledge across all dimensions of reality.', href:'../ifa-lang/' },
  { pid:'ms-x',    id:'d-arch',      label:'Architecture',alias:'IfaArch',    ao:0,   color:'#8892a4',
    title:'Ifa Architecture', body:'Design and structure as CEN Energy expression — the Architecture of Everything, grounding spatial design, urban planning, and structure in Odu Ifa principles.', href:'../ifa-architecture/' },
  { pid:'ms-x',    id:'d-astro',     label:'Astronomy',   alias:'IfaAstro',   ao:18,  color:'#8892a4',
    title:'Ifa Astronomy', body:'The study of celestial CEN Energy patterns — mapping the cosmos through the 256 Odu Ifa, from planetary motion to galactic structure.', href:null },
].map(d => {
  const par = STEAM_RING.find(n => n.id === d.pid);
  const [x,y] = mp(315, par.angle + d.ao);
  return {...d, x, y, r:14, ring:2};
});

const MAP_CENTER_NODE = {
  id:'cen', label:'CEN', sub:'Ogbe · NODE 0', color:'#f5c518', r:36, ring:0, x:0, y:0,
  title:'CEN — Consciousness Energy',
  body:'Ogbe (CEN) is the single Unified Field underlying all of existence. Consciousness Energy — the Primal Energy that forms the Foundation of the Odu Ifa and all knowledge domains. Every subject on this Map is a unique expression of CEN.',
  alias:'Ogbe · CEN Field · NODE 0 · The Source · IfaNode',
  href:null,
};

const ALL_NODES = [MAP_CENTER_NODE, ...STEAM_RING, ...DISC_RING];

const IMAP_EDGES = [
  ...STEAM_RING.map(n => ({from:'cen', to:n.id, color:n.color, w:1.4})),
  ...DISC_RING.map(d  => ({from:d.pid, to:d.id, color:d.color, w:0.9})),
  {from:'d-physics', to:'d-algebra',   color:'rgba(168,85,247,0.45)',  w:0.8},
  {from:'d-physics', to:'d-calc',      color:'rgba(168,85,247,0.45)',  w:0.8},
  {from:'d-physics', to:'d-astro',     color:'rgba(138,146,164,0.4)',  w:0.7},
  {from:'d-bio',     to:'d-biotech',   color:'rgba(0,217,184,0.4)',    w:0.7},
  {from:'d-bio',     to:'d-bioeng',    color:'rgba(245,197,24,0.4)',   w:0.7},
  {from:'d-chem',    to:'d-biotech',   color:'rgba(0,217,184,0.4)',    w:0.7},
  {from:'d-ai',      to:'d-computing', color:'rgba(0,217,184,0.4)',    w:0.7},
  {from:'d-ai',      to:'d-psych',     color:'rgba(0,200,124,0.4)',    w:0.7},
  {from:'d-ai',      to:'d-algebra',   color:'rgba(168,85,247,0.4)',   w:0.7},
  {from:'d-econ',    to:'d-psych',     color:'rgba(0,200,124,0.4)',    w:0.7},
  {from:'d-algebra', to:'d-computing', color:'rgba(0,217,184,0.4)',    w:0.7},
  {from:'d-phi',     to:'d-psych',     color:'rgba(0,200,124,0.4)',    w:0.7},
  {from:'d-ling',    to:'d-phi',       color:'rgba(233,73,138,0.4)',   w:0.7},
  {from:'d-arch',    to:'d-civeng',    color:'rgba(245,197,24,0.4)',   w:0.7},
  {from:'d-arch',    to:'d-va',        color:'rgba(233,73,138,0.4)',   w:0.7},
  {from:'d-music',   to:'d-physics',   color:'rgba(74,163,255,0.35)',  w:0.6},
  {from:'d-numth',   to:'d-physics',   color:'rgba(74,163,255,0.35)',  w:0.6},
  {from:'d-hist',    to:'d-arch',      color:'rgba(138,146,164,0.35)', w:0.6},
  {from:'d-academy', to:'cen',         color:'rgba(255,140,53,0.4)',   w:0.8},
  {from:'d-mecheng', to:'d-physics',   color:'rgba(74,163,255,0.3)',   w:0.6},
  {from:'ms-sci',    to:'ms-math',     color:'rgba(255,255,255,0.07)', w:0.6},
  {from:'ms-tech',   to:'ms-sci',      color:'rgba(255,255,255,0.07)', w:0.6},
  {from:'ms-eng',    to:'ms-sci',      color:'rgba(255,255,255,0.07)', w:0.6},
  {from:'ms-arts',   to:'ms-soc',      color:'rgba(255,255,255,0.07)', w:0.6},
  {from:'ms-edu',    to:'ms-soc',      color:'rgba(255,255,255,0.07)', w:0.6},
  {from:'ms-x',      to:'ms-arts',     color:'rgba(255,255,255,0.07)', w:0.6},
];

const IMAP_USE_CASES = [
  { icon:'🧠', color:'#f5c518', title:'See the Big Picture',
    desc:'Visualise how every subject of human knowledge — from quantum physics to music to economics — comes from the same source. The Map of Everything in one view!' },
  { icon:'🔬', color:'#4aa3ff', title:'Become a Polymath',
    desc:'A polymath knows many subjects! IfaMap shows you hidden connections between subjects so you can use ideas from one field to solve problems in another.' },
  { icon:'🤖', color:'#00d9b8', title:'IfaMachine Intelligence',
    desc:'Use the IfaMachine to trace pathways between subjects, discover amazing analogies, and see how any two or more subjects are linked through the 256 Odu Ifa.' },
  { icon:'📍', color:'#00c87c', title:'Track Your Learning',
    desc:'IFA Academy students track which subjects they have studied, set learning goals, and monitor their polymath journey across all 8 STEAMSEX knowledge areas.' },
  { icon:'🚀', color:'#a855f7', title:'Launch Your Projects',
    desc:'Start and monitor your IfaProjects from the map. Place your project in its knowledge field and instantly see all related subjects, tools, and platforms.' },
  { icon:'🎓', color:'#ff8c35', title:'Navigate Your Courses',
    desc:'IFA Academy students use IfaMap to navigate the full IFABOK curriculum — each course node lights up as you progress through the Theory of Everything.' },
];

const IMAP_ALT_NAMES = [
  {label:'IfaMap',                      color:'#f5c518'},
  {label:'ToE Map',                      color:'#4aa3ff'},
  {label:'Consciousness Map (ConMap)',   color:'#a855f7'},
  {label:'Energy-Based Map',            color:'#00d9b8'},
  {label:'Map of Everything (MapoE)',   color:'#00c87c'},
];

/* ── IfaMapTab ── */
function IfaMapTab() {
  const [selected,  setSelected]  = useState(null);
  const [hovered,   setHovered]   = useState(null);
  const [catFilter, setCatFilter] = useState('all');
  const [zoom, setZoom] = useState(() => window.innerWidth < 480 ? 0.52 : 0.78);
  const [pan,  setPan]  = useState({x:0, y:0});
  const dragging  = useRef(false);
  const dragStart = useRef({mx:0, my:0, px:0, py:0});
  const svgRef    = useRef(null);
  const selNode   = ALL_NODES.find(n => n.id === selected);

  useEffect(() => {
    const el = svgRef.current; if (!el) return;
    const onWheel = e => { e.preventDefault(); setZoom(z => Math.max(0.3, Math.min(2.2, z + (e.deltaY < 0 ? 0.08 : -0.08)))); };
    el.addEventListener('wheel', onWheel, {passive:false});
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  const onMD = e => { if (e.target.closest('[data-node]')) return; dragging.current = true; dragStart.current = {mx:e.clientX, my:e.clientY, px:pan.x, py:pan.y}; };
  const onMM = e => { if (!dragging.current) return; setPan({x: dragStart.current.px + e.clientX - dragStart.current.mx, y: dragStart.current.py + e.clientY - dragStart.current.my}); };
  const onMU = () => { dragging.current = false; };
  const onTS = e => { if (e.touches.length!==1||e.target.closest('[data-node]')) return; dragging.current=true; dragStart.current={mx:e.touches[0].clientX, my:e.touches[0].clientY, px:pan.x, py:pan.y}; };
  const onTM = e => { if (!dragging.current||e.touches.length!==1) return; setPan({x: dragStart.current.px+e.touches[0].clientX-dragStart.current.mx, y: dragStart.current.py+e.touches[0].clientY-dragStart.current.my}); };
  const onTE = () => { dragging.current = false; };

  const getNodeOp = n => {
    if (selected) {
      if (n.id===selected) return 1;
      const linked = IMAP_EDGES.some(e=>(e.from===selected&&e.to===n.id)||(e.to===selected&&e.from===n.id));
      return linked ? 0.78 : 0.15;
    }
    if (catFilter==='all') return 1;
    if (n.ring===0) return 1;
    if (n.ring===1) return n.id===catFilter ? 1 : 0.15;
    if (n.ring===2) return n.pid===catFilter ? 1 : 0.15;
    return 1;
  };
  const getEdgeOp = e => {
    if (selected) return (e.from===selected||e.to===selected) ? 0.65 : 0.05;
    if (catFilter==='all') return 0.28;
    const fN=ALL_NODES.find(n=>n.id===e.from), tN=ALL_NODES.find(n=>n.id===e.to);
    const rel=[fN,tN].some(n=>n&&(n.id==='cen'||n.id===catFilter||n.pid===catFilter));
    return rel ? 0.5 : 0.04;
  };
  const connIds = selected
    ? IMAP_EDGES.filter(e=>e.from===selected||e.to===selected)
        .map(e=>e.from===selected?e.to:e.from).filter((id,i,a)=>a.indexOf(id)===i)
    : [];

  return (
    <div className="imap-tab">
      <div className="imap-hero">
        <div className="imap-hero__glow" aria-hidden="true"/>
        <div className="pg-badge">IfaMap · Map of Everything · Knowledge Navigator</div>
        <h1 className="imap-title">
          The Map of Everything
          <span className="imap-title-sub">IfaMap — See How All Subjects Connect</span>
        </h1>
        <p className="imap-lead">
          <strong>Become a polymath — someone who knows many subjects!</strong>{' '}
          The <strong className="imap-accent-gold">IfaMap</strong> shows you how{' '}
          <strong>every subject</strong> — from science to music to history — is connected
          to every other subject. Students of the{' '}
          <strong>IFA Academy of Polymaths</strong> use IfaMap to explore knowledge,
          track their learning progress, and discover the amazing hidden threads that
          connect all fields of human knowledge.
        </p>
        <div className="imap-altnames">
          {IMAP_ALT_NAMES.map(n => (
            <span key={n.label} className="imap-altname" style={{'--ac':n.color}}>{n.label}</span>
          ))}
        </div>
      </div>

      <div className="imap-uses-grid">
        {IMAP_USE_CASES.map((u,i) => (
          <div key={i} className="imap-use" style={{'--uc':u.color}}>
            <span className="imap-use__icon">{u.icon}</span>
            <div className="imap-use__title">{u.title}</div>
            <p className="imap-use__desc">{u.desc}</p>
          </div>
        ))}
      </div>

      <div className="imap-area">
        <div className="imap-bar">
          <div className="imap-bar__left">
            <span className="imap-bar__label">IfaMap · Interactive Knowledge Map · All Subjects</span>
            <div className="imap-filters">
              <button className={`imap-f${catFilter==='all'?' imap-f--on':''}`}
                      onClick={()=>{setCatFilter('all');setSelected(null);}}>All Subjects</button>
              {STEAM_RING.map(n => (
                <button key={n.id}
                        className={`imap-f${catFilter===n.id?' imap-f--on':''}`}
                        style={{'--fc':n.color}}
                        onClick={()=>{setCatFilter(catFilter===n.id?'all':n.id);setSelected(null);}}>
                  <span aria-hidden="true">{n.icon}</span>{n.short}
                </button>
              ))}
            </div>
          </div>
          <div className="imap-zoom">
            <button onClick={()=>setZoom(z=>Math.min(2.2,+(z+0.12).toFixed(2)))}>＋</button>
            <span>{Math.round(zoom*100)}%</span>
            <button onClick={()=>setZoom(z=>Math.max(0.3,+(z-0.12).toFixed(2)))}>－</button>
            <button title="Reset view" onClick={()=>{setZoom(0.78);setPan({x:0,y:0});}}>⟲</button>
          </div>
        </div>

        <div className="imap-canvas">
          <svg ref={svgRef} className="imap-svg" viewBox="-460 -390 920 780"
               onMouseDown={onMD} onMouseMove={onMM} onMouseUp={onMU} onMouseLeave={onMU}
               onTouchStart={onTS} onTouchMove={onTM} onTouchEnd={onTE}
               style={{cursor:'grab'}}>
            <defs>
              <radialGradient id="im-bg-g" cx="50%" cy="50%" r="50%">
                <stop offset="0%"   stopColor="#f5c518" stopOpacity="0.07"/>
                <stop offset="50%"  stopColor="#4aa3ff" stopOpacity="0.02"/>
                <stop offset="100%" stopColor="transparent"/>
              </radialGradient>
              <radialGradient id="im-cen-g" cx="50%" cy="50%" r="50%">
                <stop offset="0%"   stopColor="#f5c518" stopOpacity="0.45"/>
                <stop offset="100%" stopColor="#f5c518" stopOpacity="0"/>
              </radialGradient>
              <filter id="im-gl" x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur stdDeviation="6" result="b"/>
                <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
              <filter id="im-gm" x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur stdDeviation="3.5" result="b"/>
                <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
              <filter id="im-gs" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="2" result="b"/>
                <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            </defs>
            <g transform={`translate(${pan.x},${pan.y}) scale(${zoom})`}>
              <ellipse cx="0" cy="0" rx="430" ry="390" fill="url(#im-bg-g)"/>
              <circle cx="0" cy="0" r="90"  fill="none" stroke="rgba(245,197,24,0.09)"  strokeWidth="0.6" strokeDasharray="3 9"/>
              <circle cx="0" cy="0" r="185" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.6" strokeDasharray="4 10"/>
              <circle cx="0" cy="0" r="315" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 12"/>
              <circle cx="0" cy="0" r="415" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.4" strokeDasharray="2 14"/>
              {IMAP_EDGES.map((e,i) => {
                const fN=ALL_NODES.find(n=>n.id===e.from), tN=ALL_NODES.find(n=>n.id===e.to);
                if (!fN||!tN) return null;
                return <line key={i} x1={fN.x} y1={fN.y} x2={tN.x} y2={tN.y}
                  stroke={e.color} strokeWidth={e.w} opacity={getEdgeOp(e)} style={{transition:'opacity 0.3s'}}/>;
              })}
              <circle cx="0" cy="0" r="72" fill="url(#im-cen-g)"/>
              {ALL_NODES.map(n => {
                const isSel=selected===n.id, isHov=hovered===n.id&&!isSel;
                const sc=isSel?1.22:isHov?1.10:1, op=getNodeOp(n), sw=isSel?2.5:isHov?2:n.ring===0?2:1.5;
                const lines = n.label ? n.label.split('\n') : [];
                return (
                  <g key={n.id} data-node="1"
                     transform={`translate(${n.x},${n.y})`} opacity={op}
                     filter={n.ring===0?'url(#im-gl)':n.ring===1?'url(#im-gm)':'url(#im-gs)'}
                     style={{cursor:'pointer',transition:'opacity 0.3s'}}
                     onClick={()=>setSelected(selected===n.id?null:n.id)}
                     onMouseEnter={()=>setHovered(n.id)} onMouseLeave={()=>setHovered(null)}>
                    <g style={{transform:`scale(${sc})`,transformOrigin:'0 0',transition:'transform 0.2s'}}>
                      {isSel && <circle cx="0" cy="0" r={n.r+10} fill="none" stroke={n.color} strokeWidth="1.2" strokeDasharray="3 5" opacity="0.65" className="imap-pulse-ring"/>}
                      {isHov && <circle cx="0" cy="0" r={n.r+5}  fill="none" stroke={n.color} strokeWidth="0.8" opacity="0.35"/>}
                      <circle cx="0" cy="0" r={n.r}
                        fill={n.ring===0?`${n.color}28`:n.ring===1?`${n.color}1a`:`${n.color}14`}
                        stroke={n.color} strokeWidth={sw}/>
                      {n.ring===0 && <>
                        <text x="0" y="-4" textAnchor="middle" fill={n.color} fontSize="11" fontWeight="900" fontFamily="monospace">CEN</text>
                        <text x="0" y="9"  textAnchor="middle" fill={n.color} fontSize="6" opacity="0.7">Ogbe · NODE 0</text>
                      </>}
                      {n.ring===1 && lines.map((ln,li) => (
                        <text key={li} x="0" y={lines.length===2?(li===0?-3:8):3}
                          textAnchor="middle" fill={n.color} fontSize="7" fontWeight="700">{ln}</text>
                      ))}
                      {n.ring===2 && <text x="0" y="3" textAnchor="middle" fill={n.color} fontSize="5.5" fontWeight="600">{n.label}</text>}
                    </g>
                  </g>
                );
              })}
            </g>
          </svg>
          {selNode && (
            <div className="imap-panel" key={selNode.id} style={{'--pc':selNode.color}}>
              <button className="imap-panel__close" onClick={()=>setSelected(null)}>✕</button>
              <div className="imap-panel__ring">
                {selNode.ring===0?'NODE 0 · CEN · The Source':
                 selNode.ring===1?'Knowledge Category':'Subject · Discipline'}
              </div>
              <div className="imap-panel__name">{selNode.title}</div>
              {selNode.alias && <div className="imap-panel__alias">{selNode.alias}</div>}
              <p className="imap-panel__body">{selNode.body}</p>
              {connIds.length > 0 && <>
                <div className="imap-panel__conn-hd">Connected Subjects ({connIds.length})</div>
                <div className="imap-panel__conns">
                  {connIds.map(cid => {
                    const cn = ALL_NODES.find(x=>x.id===cid);
                    return cn ? (
                      <button key={cid} className="imap-conn" style={{'--cc':cn.color}} onClick={()=>setSelected(cid)}>
                        {cn.title||cn.label}
                      </button>
                    ) : null;
                  })}
                </div>
              </>}
              {selNode.href && (
                <a href={selNode.href} className="imap-panel__visit" target="_blank" rel="noopener noreferrer">
                  Visit Platform ↗
                </a>
              )}
            </div>
          )}
        </div>
        <p className="imap-hint">Drag or swipe to pan · Scroll or ＋/－ to zoom · Tap any node to explore · Tap again to deselect</p>
      </div>

      <div className="imap-machine">
        <div className="imap-machine__inner">
          <div className="imap-machine__icon" aria-hidden="true">⚡</div>
          <div>
            <div className="imap-machine__name">The IfaMachine</div>
            <p className="imap-machine__desc">
              The IfaMachine is the intelligence layer of the IFA Internet — it traces connections
              across all 256 Odu Ifa knowledge codes, reveals hidden pathways between subjects,
              and powers the IfaMap's ability to show how all things are connected. Every
              cross-subject link on the map is an IfaMachine discovery. Use the IfaMachine to
              learn any subject faster, see the big picture, and become a true polymath.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Analogy Card ── */
function AnalogyCard({ a }) {
  const dim = SIDECHRX.find(d => d.id === a.dim);
  return (
    <div className="ianalogy-card" style={{ '--ac': dim ? dim.color : '#f5c518' }}>
      <div className="ianalogy-card__dim">
        <span className="ianalogy-card__dim-id">{dim?.id}</span>
        <span className="ianalogy-card__dim-icon">{dim?.icon}</span>
        <span className="ianalogy-card__dim-name">{dim?.kidName}</span>
      </div>

      <div className="ianalogy-card__fields">
        <div className="ianalogy-card__field" style={{ '--fc': a.colorA }}>
          <div className="ianalogy-card__subject">{a.fieldA}</div>
          <div className="ianalogy-card__concept">{a.conceptA}</div>
        </div>
        <div className="ianalogy-card__mid">
          <div className="ianalogy-card__bridge-sym">⇌</div>
          <div className="ianalogy-card__bridge-lbl">{a.bridge}</div>
        </div>
        <div className="ianalogy-card__field" style={{ '--fc': a.colorB }}>
          <div className="ianalogy-card__subject">{a.fieldB}</div>
          <div className="ianalogy-card__concept">{a.conceptB}</div>
        </div>
      </div>

      <p className="ianalogy-card__explain">{a.explain}</p>

      <div className="ianalogy-card__pairs">
        {a.pairs.map(([pA, pB], i) => (
          <div key={i} className="ianalogy-pair">
            <span className="ianalogy-pair__a" style={{ color: a.colorA }}>{pA}</span>
            <span className="ianalogy-pair__arrow">≈</span>
            <span className="ianalogy-pair__b" style={{ color: a.colorB }}>{pB}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Ifanalogy Tab ── */
function IfanalogyTab() {
  const [dimFilter, setDimFilter] = useState('all');
  const filtered = dimFilter === 'all'
    ? ANALOGIES
    : ANALOGIES.filter(a => a.dim === dimFilter);

  return (
    <div className="ifanalogy-tab">
      <div className="ifanalogy-hd">
        <div className="pg-badge">Ifanalogy · Cross-Subject Connections · IFABOK Tool</div>
        <h1 className="ifanalogy-title">
          Ifanalogy — Find the Same Pattern in Different Subjects
          <span className="ifanalogy-title-sub">When Physics Mirrors History · When Biology Mirrors Computing</span>
        </h1>
        <p className="ifanalogy-lead">
          <strong>Ifanalogy</strong> is the art of spotting <strong>the same hidden pattern</strong> in
          two completely different subjects. When you see that an atom looks like a solar system, or
          that DNA works like source code — you instantly understand <em>both subjects better</em>.
          That is the power of analogy!
        </p>
        <hr className="ifaview-tab__divider"/>
        <p className="ifanalogy-lead">
          Every analogy has a <strong>Bridge</strong> — the shared idea connecting two fields.
          The IFA Academy teaches you to find these bridges across all knowledge, training you to
          think like a <strong>polymath</strong> who sees the same deep patterns everywhere.
        </p>
      </div>

      <div className="ifanalogy-filters">
        <span className="ifanalogy-filters__label">Filter by Exploration Lens</span>
        <div className="ifanalogy-filter-row">
          <button
            className={`ifanalogy-f${dimFilter === 'all' ? ' ifanalogy-f--active' : ''}`}
            onClick={() => setDimFilter('all')}>
            All ({ANALOGIES.length})
          </button>
          {SIDECHRX.map(d => {
            const count = ANALOGIES.filter(a => a.dim === d.id).length;
            if (!count) return null;
            return (
              <button
                key={d.id}
                className={`ifanalogy-f${dimFilter === d.id ? ' ifanalogy-f--active' : ''}`}
                style={{ '--df': d.color }}
                onClick={() => setDimFilter(d.id)}>
                <span className="ifanalogy-f__icon">{d.icon}</span>
                {d.id} — {d.kidName}
                <span className="ifanalogy-f__count">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {dimFilter !== 'all' && (
        <div className="ifanalogy-dim-info" style={{ '--dc': SIDECHRX.find(d=>d.id===dimFilter)?.color || '#f5c518' }}>
          <span className="ifanalogy-dim-info__id">{dimFilter}</span>
          <div>
            <strong className="ifanalogy-dim-info__name">{SIDECHRX.find(d=>d.id===dimFilter)?.name}</strong>
            {' — '}
            <span className="ifanalogy-dim-info__kid">{SIDECHRX.find(d=>d.id===dimFilter)?.kidName}</span>
          </div>
        </div>
      )}

      <div className="ianalogy-count">
        Showing <strong>{filtered.length}</strong> {filtered.length === 1 ? 'analogy' : 'analogies'}
      </div>

      <div className="ianalogy-grid">
        {filtered.map(a => <AnalogyCard key={a.id} a={a} />)}
      </div>

      <div className="ifanalogy-cta">
        <div className="ifanalogy-cta__icon" aria-hidden="true">🔗</div>
        <div>
          <div className="ifanalogy-cta__title">The IfaMachine finds thousands more analogies!</div>
          <p className="ifanalogy-cta__desc">
            The IFA Academy's <strong>IfaMachine</strong> can trace analogy pathways across all
            256 Odu Ifa — finding hidden structural connections between any two subjects you choose.
            The 12 analogies above are just the beginning. Every pair of subjects in the PToE
            can be connected through one or more of the 8 SIDECHRX bridges.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Tab Bar ── */
function TabBar({ activeTab, onTab }) {
  const TABS = [
    { id:'ifaview',          label:'IfaView',      sub:'The Knowledge Grid · All Subjects',    soon:false },
    { id:'ifa-map',          label:'Ifa Map',       sub:'Map of Everything · Subject Navigator', soon:false },
    { id:'ifa-import',       label:'Ifa Import',    sub:'Connect Any Two Subjects',             soon:false },
    { id:'ifanalogy',        label:'Ifanalogy',     sub:'Cross-Subject Connections · Bridges',   soon:false },
    { id:'ifa-connections',  label:'Connections',   sub:'Coming Soon',                          soon:true  },
    { id:'frame-lab',        label:'Frame Lab',     sub:'Coming Soon',                          soon:true  },
    { id:'ifa-matrix',       label:'IFA Matrix',    sub:'Coming Soon',                          soon:true  },
    { id:'ifa-transform',    label:'Transform',     sub:'Coming Soon',                          soon:true  },
  ];
  return (
    <div className="pg-tabs">
      <div className="pg-tabs__inner">
        {TABS.map(t => (
          <button key={t.id}
            className={`pg-tab${t.id===activeTab?' pg-tab--active':''}${t.soon?' pg-tab--soon':''}`}
            onClick={() => !t.soon && onTab(t.id)}
            disabled={t.soon}>
            <span className="pg-tab__label">{t.label}</span>
            <span className="pg-tab__sub">{t.sub}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── IfaView Tab ── */
function IfaViewTab() {
  const [system,   setSystem]   = useState(1);
  const [selected, setSelected] = useState(null);
  const closeModal = useCallback(() => setSelected(null), []);

  return (
    <div className="ifaview-tab">
      <div className="ifaview-tab__hd">
        <div className="pg-badge">The Knowledge Grid · IFA Academy Beginners · IFABOK</div>
        <h1 className="ifaview-tab__title">
          The Ifa Periodic Table of Everything
          <span className="ifaview-tab__title-sub">PToE — Every Subject in One Grid</span>
        </h1>
        <p className="ifaview-tab__lead">
          Just like the chemistry periodic table organises all the elements, the{' '}
          <strong>Ifa Periodic Table of Everything</strong> (PToE) organises{' '}
          <strong>every subject of human knowledge</strong> into one beautiful grid.
        </p>
        <hr className="ifaview-tab__divider"/>
        <p className="ifaview-tab__lead">
          Subjects are arranged in 8 columns called{' '}
          <strong className="accent-steam">STEAMSEX</strong> — the 8 great areas of
          knowledge: Science, Technology, Engineering, Arts, Mathematics, Social Science,
          Education, and Others (X).
        </p>
        <hr className="ifaview-tab__divider"/>
        <p className="ifaview-tab__lead">
          Click any subject in the grid to open its{' '}
          <strong className="accent-lens">8-Dimension Explorer</strong> — and see that
          subject through 8 amazing lenses: Patterns, Constants, Opposites, Emergence,
          Connections, Big Picture, Building Blocks, and Expansion.
        </p>
      </div>

      <div className="system-toggle">
        <button className={`sys-btn${system===1?' sys-btn--active':''}`} onClick={() => setSystem(1)}>
          <span className="sys-btn__num">01</span>
          <div className="sys-btn__text">
            <span className="sys-btn__label">Standard Grid</span>
            <span className="sys-btn__sub">All subjects in one table</span>
          </div>
        </button>
        <button className={`sys-btn${system===2?' sys-btn--active':''}`} onClick={() => setSystem(2)}>
          <span className="sys-btn__num">02</span>
          <div className="sys-btn__text">
            <span className="sys-btn__label">Ifa Names</span>
            <span className="sys-btn__sub">Ifa Expressions · IfaLang</span>
          </div>
        </button>
        <button className={`sys-btn${system===3?' sys-btn--active':''}`} onClick={() => setSystem(3)}>
          <span className="sys-btn__num">03</span>
          <div className="sys-btn__text">
            <span className="sys-btn__label">IfaCircle</span>
            <span className="sys-btn__sub">Radial knowledge map</span>
          </div>
        </button>
      </div>

      <div className={`sys-desc sys-desc--${system}`}>
        {system === 1 ? (
          <>
            <strong>Grid 1 — The Standard Knowledge Table:</strong> Every subject arranged by
            its STEAMSEX category column and its depth within that field. Click any cell to
            open its <strong>8-Dimension Explorer</strong> — seeing that subject through
            8 different, fascinating lenses!
          </>
        ) : system === 2 ? (
          <>
            <strong>Grid 2 — Ifa Names:</strong> Every subject is expressed as an{' '}
            <em>Ifa Expression</em> — written in{' '}
            <strong>IfaLang</strong> with the <strong>Ogbe Energy Symbol</strong>{' '}
            (SymboE){' '}<OgbeSymboE size={13}/>{' '}as subscript to each STEAMSEX letter —{' '}
            S<OgbeSymboE size={10}/>{' '}
            T<OgbeSymboE size={10}/>{' '}
            E<OgbeSymboE size={10}/>{' '}
            A<OgbeSymboE size={10}/>{' '}
            M<OgbeSymboE size={10}/>{' '}
            S<OgbeSymboE size={10}/>{' '}
            E<OgbeSymboE size={10}/>{' '}
            X<OgbeSymboE size={10}/>{' '}
            — transforming each subject into an expression of Ifa knowledge.
          </>
        ) : (
          <>
            <strong>Grid 3 — IfaCircle:</strong> All knowledge arranged in a radial circle.
            The <em>IfaCircle (NODE 0)</em> sits at the centre — representing Ogbe, the
            source of all knowledge. The 8 STEAMSEX categories orbit around it. Click any
            category to reveal its subjects, then click any subject to explore it!
          </>
        )}
      </div>

      {system === 3 ? (
        <IfaCircleMatrix onCellClick={setSelected}/>
      ) : (
        <>
          <div className="steamsex-legend">
            <span className="legend-label">STEAMSEX</span>
            {STEAMSEX.map(cat => (
              <div key={cat.id} className="steam-chip" style={{'--cc': cat.color}}>
                <span className="steam-chip__icon">{cat.icon}</span>
                <span className="steam-chip__code">{cat.code}</span>
                <span className="steam-chip__name">{cat.name}</span>
              </div>
            ))}
          </div>
          <div className="sidechrx-legend">
            <span className="legend-label">8 Lenses</span>
            {SIDECHRX.map(d => (
              <div key={d.id} className="sidechrx-chip" style={{'--cc': d.color}}>
                <span className="sidechrx-chip__id">{d.id}</span>
                <span className="sidechrx-chip__name">{d.kidName}</span>
              </div>
            ))}
          </div>
          <PToEGrid isIfa={system === 2} onCellClick={setSelected}/>
          <div className="ptoe-info">
            <div className="ptoe-info__icon">◈</div>
            <div className="ptoe-info__text">
              <strong>8 Ways to Explore:</strong> Click any subject cell to open its
              8-Dimension Explorer. You will see that subject through 8 lenses —
              Patterns & Balance, Always the Same, Opposites & Pairs, Big from Small,
              Mix & Connect, The Big Picture, Break It Down, and Go Further.
              Each lens reveals a different, fascinating side of that subject!
            </div>
          </div>
        </>
      )}

      <CellModal cell={selected} isIfa={system === 2} onClose={closeModal}/>
    </div>
  );
}

/* ── App ── */
function App() {
  const [tab, setTab] = useState('ifaview');
  return (
    <>
      <PlaygroundHeader/>
      <TabBar activeTab={tab} onTab={setTab}/>
      <main className="pg-main">
        {tab === 'ifaview'    && <IfaViewTab/>}
        {tab === 'ifa-import' && <IfaImportTab/>}
        {tab === 'ifa-map'    && <IfaMapTab/>}
        {tab === 'ifanalogy'  && <IfanalogyTab/>}
      </main>
      <footer className="pg-footer">
        <div className="pg-footer__inner">
          <div className="pg-footer__brand">
            <a href="../" className="pg-footer__link">IfaLens</a>
            <span> · </span>
            <a href="/" className="pg-footer__link">IFA Internet</a>
            <span> · </span>
            <a href="https://cenproject.org/" target="_blank" rel="noopener noreferrer" className="pg-footer__link">CENProject</a>
            <span> · </span>
            <a href="../playground/" className="pg-footer__link">Advanced Playground</a>
          </div>
          <p className="pg-footer__note">
            IFA Academy Playground — Beginners · Knowledge Grid · 8-Dimension Explorer ·
            Ifa Periodic Table of Everything · IFA Academy of Polymaths
          </p>
        </div>
      </footer>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
