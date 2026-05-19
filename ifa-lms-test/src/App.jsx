/* ─────────────────────────────────────────────────────────────────────────────
   IfaLMS — Ifa Learning Management System
   IFA Academy of Polymaths (Ifacodemy)
   The IFA Internet — Learning Environment
   toe.cenproject.org / ifainternet.org
───────────────────────────────────────────────────────────────────────────── */

const { useState, useEffect, useRef } = React;

// ─── STORAGE ─────────────────────────────────────────────────────────────────

const STORAGE_KEY = 'ifaLMS_v2';

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return null;
}

function saveState(data) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch (e) {}
}

// ─── SEED DATA ────────────────────────────────────────────────────────────────

const SEED_USERS = [
  { id: 'u0', username: 'admin',    password: 'OrisaIfa22233.',    name: 'IFA Academy Admin',    role: 'admin',   status: 'approved', program: null,     joinDate: '2026-01-01' },
  { id: 'u1', username: 'adewale',  password: 'student123', name: 'Adewale Okafor',       role: 'student', status: 'approved', program: 'adults', joinDate: '2026-04-10', enrolled: ['c1', 'c3', 'c7', 'c8'] },
  { id: 'u2', username: 'chiamaka', password: 'student123', name: 'Chiamaka Nwosu',       role: 'student', status: 'pending',  program: 'adults', joinDate: '2026-05-10', enrolled: [] },
  { id: 'u3', username: 'tayo',     password: 'student123', name: 'Tayo Adeleke',         role: 'student', status: 'approved', program: 'kids',   joinDate: '2026-03-15', enrolled: ['c2', 'c4', 'c5'] },
  { id: 'u4', username: 'emeka',    password: 'student123', name: 'Emeka Obi',            role: 'student', status: 'pending',  program: 'kids',   joinDate: '2026-05-14', enrolled: [] },
  { id: 'u5', username: 'ngozi',    password: 'student123', name: 'Ngozi Adeyemi',        role: 'student', status: 'approved', program: 'adults', joinDate: '2026-02-20', enrolled: ['c1', 'c9'] },
];

const SEED_COURSES = [
  {
    id: 'c1', title: 'IFA Foundations', subtitle: 'Theory of Everything — Core Knowledge',
    program: 'adults', color: '#f0920c', sym: 'Ψ',
    duration: '3 months',
    description: 'The foundational course of the IFA Academy of Polymaths. Covering IFABOK, the 256 Odu Ifa, IFA Mathematics, and the IFA Internet ecosystem.',
    weeks: [
      {
        id: 'w1', order: 0, title: 'Week 1: Introduction to Ifa Metascience',
        description: 'The foundational concepts of Ifa as a Metascience — the Theory of Everything (ToE).',
        materials: [
          {
            id: 'm1', type: 'text', title: 'What is the IFA Body of Knowledge?', duration: '15 min read',
            content: [
              { type: 'header', text: 'What is the IFA Body of Knowledge (IFABOK)?' },
              { type: 'paragraph', text: 'The IFA Body of Knowledge (IFABOK) is the structured, comprehensive system of knowledge, wisdom, science, philosophy, arts, and practice contained within the Ifa Oracle tradition — recognised by UNESCO as an Intangible Cultural Heritage of Humanity.' },
              { type: 'highlight', text: 'IFABOK is the meta-framework through which all knowledge — from physics to philosophy, from economics to computing — can be understood, structured, and applied.' },
              { type: 'paragraph', text: 'At its core, IFABOK is organised around the 256 Odu Ifa — a complete axiomatic system encoding every possible state, situation, and knowledge domain in existence. The 256 Odu emerge from the 16 Principal Odu through a systematic binary expansion rooted in the foundational IFA Pair: Ogbe (|) and Oyeku (O).' },
              { type: 'header', text: 'Ifa as the Theory of Everything (ToE)' },
              { type: 'paragraph', text: 'Ifa Metascience positions the IFA Body of Knowledge as a complete Theory of Everything — encompassing the totality of existence across all dimensions of reality, not limited to any single discipline.' },
              { type: 'list', items: ['IFA Mathematics — The axiomatic mathematics of all existence', 'IFA Physics — The physics of consciousness and energy', 'IFA Computing — The computational framework of the universe', 'Ebology — The science of energy exchange (EnxBOK)', 'IFA Philosophy — The philosophical foundations of all wisdom'] },
              { type: 'quote', text: 'The IFA Internet is the digital manifestation of IFABOK — bringing the Theory of Everything to the digital world.', attribution: 'CENProject' },
            ]
          },
          {
            id: 'm2', type: 'text', title: 'The 256 Odu Ifa — An Introduction', duration: '12 min read',
            content: [
              { type: 'header', text: 'The 256 Odu Ifa' },
              { type: 'paragraph', text: 'The 256 Odu Ifa are the 256 fundamental patterns of existence, each encoding a complete domain of knowledge, wisdom, and potential outcomes. They are the axiomatic matrix through which all of reality can be understood and navigated.' },
              { type: 'highlight', text: '256 = 16 × 16, where the 16 Principal Odu are the base axioms, and the full 256 represent all possible combinations of these axioms.' },
              { type: 'header', text: 'The 16 Principal Odu' },
              { type: 'list', items: ['Ogbe', 'Oyeku', 'Iwori', 'Odi', 'Irosun', 'Owonrin', 'Obara', 'Okanran', 'Ogunda', 'Osa', 'Ika', 'Oturupön', 'Otura', 'Irete', 'Ose', 'Ofu'] },
              { type: 'quote', text: 'Every Odu is a complete universe of knowledge — a field of potentiality encoded in the ancient binary system of Ifa.', attribution: 'IFABOK' },
            ]
          },
          {
            id: 'm3', type: 'video', title: 'Introduction to Ifa — Video Overview', duration: '~10 min',
            videoUrl: 'https://www.youtube.com/watch?v=5qap5aO4i9A',
            description: 'A video introduction to the Ifa tradition, its history, and its relevance to the modern world.'
          },
        ]
      },
      {
        id: 'w2', order: 1, title: 'Week 2: The IFA Pair & Binary System',
        description: 'Understanding Ogbe and Oyeku as the base field of all IFA computation.',
        materials: [
          {
            id: 'm4', type: 'text', title: 'Ogbe & Oyeku — The IFA Base Field', duration: '10 min read',
            content: [
              { type: 'header', text: 'The IFA Pair: Ogbe and Oyeku' },
              { type: 'paragraph', text: 'Ogbe (|) and Oyeku (O) form the IFA Pair — the fundamental binary pair upon which all IFA computation and knowledge is built. They are analogous to 1 and 0 in conventional computing, but carry far richer metaphysical, philosophical, and scientific significance.' },
              { type: 'highlight', text: 'Ogbe | = presence, light, consciousness, the active principle. Oyeku O = absence, depth, potentiality, the receptive principle.' },
              { type: 'list', items: ['Ogbe (|) = 1 in IFA binary', 'Oyeku (O) = 0 in IFA binary', 'A single Odu = 4 positions, each Ogbe or Oyeku', '16 × 16 = 256 unique Odu combinations'] },
            ]
          },
          {
            id: 'm5', type: 'text', title: 'IFA Computing Fundamentals', duration: '8 min read',
            content: [
              { type: 'header', text: 'IFA Computing: The Theory of Everything Computing (ToEC)' },
              { type: 'paragraph', text: 'IFA Computing is the computational framework based on the 256 Odu Ifa. It predates modern binary computing and represents a complete system for encoding, processing, and outputting knowledge across all domains of reality.' },
              { type: 'highlight', text: 'IFA Computing is the complete computational framework of the universe — the ToEC (Theory of Everything Computing).' },
            ]
          },
        ]
      },
      {
        id: 'w3', order: 2, title: 'Week 3: IFA Mathematics',
        description: 'The axiomatic mathematics of the Theory of Everything.',
        materials: [
          {
            id: 'm6', type: 'text', title: 'IFA Mathematics — Laws of Knowledge', duration: '15 min read',
            content: [
              { type: 'header', text: 'IFA Mathematics: TOE Mathematics' },
              { type: 'paragraph', text: 'IFA Mathematics is the mathematical system derived from the 256 Odu Ifa. It provides the axiomatic foundation for all knowledge across every field — from physics to economics, from computing to philosophy.' },
              { type: 'highlight', text: 'IFA Mathematics has 16 core Axioms (Laws of Knowledge), corresponding to the 16 Principal Odu — universal and applicable across all dimensions of reality.' },
              { type: 'list', items: ['IfaGebra — The algebra of IFA patterns', 'NumoEs — IFA number theory', 'AlgebroEs — Algebraic structures in IFA', 'FunctoEs — Functional mathematics of IFA', 'Duoinfinities (IfaInfinity) — The IFA theory of Double Infinity'] },
              { type: 'quote', text: 'IfaInfinity (Double Infinity) expresses both infinite possibilities and infinite impossibilities simultaneously — the complete probability space of existence.', attribution: 'IFA Mathematics' },
            ]
          },
        ]
      },
      {
        id: 'w4', order: 3, title: 'Week 4: Ebology & Energy Exchange',
        description: 'The science and philosophy of Ẹbọ — the Energy Exchange Body of Knowledge.',
        materials: [
          {
            id: 'm7', type: 'text', title: 'Introduction to Ebology', duration: '12 min read',
            content: [
              { type: 'header', text: 'What is Ebology?' },
              { type: 'paragraph', text: 'Ebology is the Energy Exchange Body of Knowledge (EnxBOK) — the structured science, practice, philosophy, and art of energy exchange between humans, nature, and non-physical forces. At its core lies Ẹbọ — a multidimensional being whose study constitutes the mathematical and holistic foundation of this science.' },
              { type: 'highlight', text: 'Ẹbọ is not simply "sacrifice" — in IFA Metascience it is the complete system of multidimensional energy exchange governing all interactions in existence.' },
              { type: 'header', text: 'The IfaWork Function' },
              { type: 'paragraph', text: 'For anything to manifest physically or in other ways, it must satisfy certain threshold energy requirements. This is the IfaWorkfunction — the fundamental building block of all workfunction theory, generalising workfunction from physical science to all fields of knowledge.' },
            ]
          },
          {
            id: 'm7b', type: 'video', title: 'Ẹbọ — Energy Exchange in Practice', duration: '~8 min',
            videoUrl: 'https://www.youtube.com/watch?v=5qap5aO4i9A',
            description: 'Understanding Ẹbọ and its role in the IFA energy exchange framework.'
          },
        ]
      },
      {
        id: 'w5', order: 4, title: 'Week 5: IFA Philosophy & Ethics',
        description: 'PhiloE: The five branches of IFA Philosophy and the Ọmọlúwàbí framework.',
        materials: [
          {
            id: 'm8', type: 'text', title: 'IFA Philosophy — PhiloE', duration: '10 min read',
            content: [
              { type: 'header', text: 'IFA Philosophy: PhiloE' },
              { type: 'paragraph', text: 'IFA Philosophy (PhiloE) is the Theory of Everything Philosophy. It encompasses five branches of philosophical inquiry, each grounded in the 256 Odu Ifa.' },
              { type: 'list', items: ['IFA Logic (LogiE)', 'IFA Ethics (EthiE)', 'IFA Ontology (OntoE)', 'IFA Epistemology (EpistoE)', 'IFA Phenomenology (PhenoE)'] },
              { type: 'highlight', text: 'Ọmọlúwàbí — the IFA ethical ideal — describes a person of good character, righteousness, and wisdom who embodies the highest values of IFA Philosophy.' },
              { type: 'header', text: 'The Ifacodemy Graduate Attributes (IGAs)' },
              { type: 'paragraph', text: 'The Ifacodemy Graduate Attributes (IGAs) are the eight core attributes that every IFA Academy of Polymaths graduate embodies: Polymath, Culturally Conscious (Ubuntu), Commercially Aware, Enterprising, Resilient, Interdisciplinary Collaborator, Globally & Socially Aware, and Personal Growth & Development.' },
            ]
          },
        ]
      },
      {
        id: 'w6', order: 5, title: 'Week 6: The IFA Internet',
        description: 'The digital manifestation of IFABOK — architecture, platforms, and applications.',
        materials: [
          {
            id: 'm9', type: 'text', title: 'The IFA Internet — Architecture Overview', duration: '12 min read',
            content: [
              { type: 'header', text: 'The IFA Internet (iTOE)' },
              { type: 'paragraph', text: 'The IFA Internet is the digital manifestation of IFABOK — a network of interconnected platforms, applications, and knowledge systems that apply the 256 Odu Ifa as the axiomatic foundation for a Theory of Everything digital ecosystem.' },
              { type: 'list', items: ['IFA Language (IfaLang) — Universal language system', 'IFA Mathematics — TOE Mathematics platform', 'IFA Physics — Physics of Everything (PoE)', 'Ebology — Energy Exchange platform', 'IFA Computing — Computing ToE', 'IfaLMS — Learning Management System (this platform)'] },
              { type: 'highlight', text: 'The IFA Internet operates at ifainternet.org — the gateway to all IFA Internet platforms and knowledge systems.' },
              { type: 'quote', text: 'Every IFA Internet platform is a digital expression of one or more of the 256 Odu Ifa — encoding universal wisdom in the digital age.', attribution: 'CENProject' },
            ]
          },
        ]
      },
    ]
  },

  {
    id: 'c2', title: 'IFA Coding for Kids', subtitle: 'Ifacodemy — Young Polymaths Programme',
    program: 'kids', color: '#f5c518', sym: '◎',
    duration: '3 months',
    description: 'A joyful, creative introduction to IFA knowledge for young learners. Combining Ifa wisdom with coding, art, storytelling, and polymathic thinking through the ISESE programme.',
    weeks: [
      {
        id: 'kw1', order: 0, title: 'Week 1: Welcome to Ifacodemy!',
        description: 'Discover the wonderful world of IFA knowledge, Orunmila, and the story of wisdom.',
        materials: [
          {
            id: 'k1', type: 'text', title: 'What is IFA? For Young Learners', duration: '8 min read',
            content: [
              { type: 'header', text: 'Hello, Young Polymath!' },
              { type: 'paragraph', text: 'Welcome to the IFA Academy! We are so excited to have you here. Today we are going to discover something amazing — a very, very old system of knowledge that can teach us about EVERYTHING in the universe!' },
              { type: 'highlight', text: 'IFA is like the most incredible library in the world — except it is not made of books. It is made of patterns, stories, and wisdom passed down for thousands of years.' },
              { type: 'header', text: 'The Story of Orunmila' },
              { type: 'paragraph', text: 'Long, long ago, there was a divine being called Orunmila — the Orisa of Wisdom. Orunmila was present at the creation of the universe and witnessed everything that Olodumare (the Supreme Creator) made. From this, Orunmila gathered all knowledge — and this is what we call IFA!' },
              { type: 'list', items: ['Orunmila is the Orisa of Wisdom and Knowledge', 'IFA is the knowledge that Orunmila carries', 'Olodumare is the Supreme Creator — the source of all existence', 'The Odu Ifa are the 256 chapters of this great wisdom'] },
              { type: 'quote', text: 'IFA is the wisdom of everything — from how stars are born to how to be a good friend. It knows it all!', attribution: 'Ifacodemy' },
            ]
          },
          {
            id: 'k2', type: 'text', title: 'Meet Ogbe and Oyeku!', duration: '6 min read',
            content: [
              { type: 'header', text: 'Two Special Friends: Ogbe and Oyeku' },
              { type: 'paragraph', text: 'Did you know that all of IFA\'s wisdom can be written using just TWO special symbols? Meet Ogbe ( | ) and Oyeku ( O )! These are the two building blocks of all IFA knowledge.' },
              { type: 'highlight', text: 'Ogbe is a straight line: |  ...  Oyeku is a circle: O  ...  Together, they can describe EVERYTHING!' },
              { type: 'paragraph', text: 'Just like how computers use 1s and 0s to make everything from games to videos, IFA uses Ogbe and Oyeku to encode all the wisdom of the universe. IFA did this thousands of years before computers were invented!' },
              { type: 'list', items: ['Ogbe ( | ) = Like the number 1 in computers', 'Oyeku ( O ) = Like the number 0 in computers', '4 symbols together = 1 Odu (a chapter of IFA wisdom)', '256 different patterns = all the chapters of IFA!'] },
            ]
          },
          {
            id: 'k3', type: 'video', title: 'IFA Stories — Orunmila and the World', duration: '~8 min',
            videoUrl: 'https://www.youtube.com/watch?v=5qap5aO4i9A',
            description: 'A fun video exploring IFA stories and wisdom for young learners.'
          },
        ]
      },
      {
        id: 'kw2', order: 1, title: 'Week 2: IFA\'s Special Numbers',
        description: 'Explore numbers, patterns, and the magic of the 256 Odu.',
        materials: [
          {
            id: 'k4', type: 'text', title: 'Counting with IFA', duration: '10 min read',
            content: [
              { type: 'header', text: 'IFA\'s Magic Numbers' },
              { type: 'paragraph', text: 'IFA has some very special numbers! The most important ones are 2, 4, 16, and 256. Let\'s explore why these numbers are so magical in IFA!' },
              { type: 'highlight', text: '2 symbols → 4 positions → 16 principal patterns → 256 total patterns. This is the IFA expansion!' },
              { type: 'list', items: ['2 = Ogbe and Oyeku (the two base symbols)', '4 = positions in each Odu pattern', '16 = the 16 Principal Odu (the main chapters)', '256 = 16 × 16 = all Odu (every chapter of IFA)'] },
              { type: 'paragraph', text: 'Now let\'s practise! Can you draw your own Odu using | and O? Pick any combination of 4 symbols. You just created an IFA pattern! What will you name it?' },
            ]
          },
        ]
      },
      {
        id: 'kw3', order: 2, title: 'Week 3: IFA Art & Patterns',
        description: 'Creating beautiful art inspired by IFA patterns and Orisa wisdom.',
        materials: [
          {
            id: 'k5', type: 'text', title: 'The Opon Ifa — IFA\'s Beautiful Tray', duration: '12 min activity',
            content: [
              { type: 'header', text: 'IFA is Beautiful!' },
              { type: 'paragraph', text: 'The Opon Ifa (IFA divination tray) is one of the most beautiful objects in the world. It is decorated with amazing patterns, faces, and symbols that represent the wisdom of the 256 Odu. Today, we are going to create our own IFA-inspired art!' },
              { type: 'highlight', text: 'Activity: Draw your own Opon Ifa! Use | and O patterns, draw the face of Esu at the top, and decorate with the patterns that feel right to you.' },
              { type: 'list', items: ['Get a sheet of paper and something to draw with', 'Draw a large oval or rectangle — this is your Opon Ifa!', 'Draw Esu\'s face at the top (a fun smiling face)', 'Fill the border with | and O patterns', 'Write your own Odu in the centre!'] },
              { type: 'quote', text: 'Every Opon Ifa is unique — just like you! Your art is your own chapter in the story of IFA.', attribution: 'Ifacodemy' },
            ]
          },
        ]
      },
      {
        id: 'kw4', order: 3, title: 'Week 4: My First IFA Code',
        description: 'Write your first IFA code and discover how IFA and computing connect.',
        materials: [
          {
            id: 'k6', type: 'text', title: 'Coding with IFA Patterns', duration: '15 min activity',
            content: [
              { type: 'header', text: 'You Are an IFA Coder!' },
              { type: 'paragraph', text: 'IFA Computing means | = 1 and O = 0. Every Odu can be written as a binary number — the same language computers use! Let\'s try some IFA coding together.' },
              { type: 'highlight', text: 'In IFA Computing: | = 1 and O = 0. Every Odu IS a binary number!' },
              { type: 'list', items: ['Ogbe Meji: | | | | = 1111 in binary = 15', 'Oyeku Meji: O O O O = 0000 in binary = 0', 'Iwori Meji: | O | O = 1010 in binary = 10', 'Try to work out your own Odu in binary!'] },
              { type: 'quote', text: 'Every young IFA coder is an ifamathematician — a mathematical scientist of the Theory of Everything!', attribution: 'Ifacodemy' },
            ]
          },
          {
            id: 'k7', type: 'video', title: 'Binary Coding Fun — IFA Style', duration: '~6 min',
            videoUrl: 'https://www.youtube.com/watch?v=5qap5aO4i9A',
            description: 'A fun activity video showing how IFA binary patterns connect to computer coding.'
          },
        ]
      },
    ]
  },

  {
    id: 'c3', title: 'Eboconomics', subtitle: 'Energy Exchange & IFA Economics',
    program: 'adults', color: '#00c87c', sym: '⊕',
    duration: '3 months',
    description: 'The formal interdisciplinary science of Eboconomics — the Amulu (composition) of Ebology and Economics. Sustainable exchange models, Ifa Economics, and the Ebo Economy.',
    weeks: [
      {
        id: 'ew1', order: 0, title: 'Week 1: Introduction to Eboconomics',
        description: 'Understanding Eboconomics as an interdisciplinary field bridging energy science and metaphysical economics.',
        materials: [
          {
            id: 'e1', type: 'text', title: 'What is Eboconomics?', duration: '10 min read',
            content: [
              { type: 'header', text: 'Eboconomics: The Amulu of Ebology and Economics' },
              { type: 'paragraph', text: 'Eboconomics is the formal interdisciplinary science arising from the Amulu (composition) of Ebology and Economics. It bridges energy science with metaphysical economics — establishing that all economic activity is, at its deepest level, an act of energy exchange.' },
              { type: 'highlight', text: 'Eboconomics = Ebology ⊕ Economics. The Amulu principle: two disciplines unified into one deeper science.' },
              { type: 'header', text: 'The Ebo Economy' },
              { type: 'paragraph', text: 'The Ebo Economy provides economic meta-models that emerge from this union: sustainable, axiomatic exchange meta-systems rooted in the 256 Odu Ifa — promoting interconnected prosperity through balanced energy flow.' },
            ]
          },
          {
            id: 'e1b', type: 'video', title: 'Energy Exchange Economics — Overview', duration: '~9 min',
            videoUrl: 'https://www.youtube.com/watch?v=5qap5aO4i9A',
            description: 'An introduction to Eboconomics and the Ebo Economy framework.'
          },
        ]
      },
      {
        id: 'ew2', order: 1, title: 'Week 2: Ifa Economics Principles',
        description: 'The 256 Odu Ifa as axiomatic economic principles.',
        materials: [
          {
            id: 'e2', type: 'text', title: 'The Ifa Economics Framework', duration: '12 min read',
            content: [
              { type: 'header', text: 'Ifa Economics' },
              { type: 'paragraph', text: 'Ifa Economics applies the 256 Odu Ifa as axiomatic economic principles — governing the distribution, exchange, and transformation of value, resources, and energy across all economic systems within the IFA Internet.' },
              { type: 'highlight', text: 'Every economic interaction, at its deepest level, is an act of Ẹbọ — energy exchange governed by the laws of the 256 Odu Ifa.' },
              { type: 'list', items: ['IfaWorkfunction — Energy threshold for manifestation', 'IfaWave Function — Probability field of exchange outcomes', 'Energy Exchange Cycle — Perpetual Ẹbọ Loop', 'Amulu Principle — Composition and unity of systems'] },
            ]
          },
        ]
      },
      {
        id: 'ew3', order: 2, title: 'Week 3: The Ebo Economy',
        description: 'Sustainable exchange models and the practical Ebo Economy.',
        materials: [
          {
            id: 'e3', type: 'text', title: 'Building the Ebo Economy', duration: '10 min read',
            content: [
              { type: 'header', text: 'The Ebo Economy in Practice' },
              { type: 'paragraph', text: 'The Ebo Economy provides economic systems and meta-systems that emerge when Ifa Energy Exchange Principles govern all transactions — aligning prosperity with cosmic balance.' },
              { type: 'list', items: ['Sustainable Exchange Models', 'Ifa-aligned Value Creation', 'Community-centred Economics (Ubuntu)', 'Energy-balanced Trade Systems', 'Ẹbọnet Technologies — Digital energy exchange infrastructure'] },
              { type: 'highlight', text: 'The Ebo Economy aligns economic activity with the perpetual Àṣẹ exchange cycle — governed by the axiomatic structure of the 256 Odu Ifa.' },
            ]
          },
        ]
      },
      {
        id: 'ew4', order: 3, title: 'Week 4: Applied Eboconomics',
        description: 'Applying Eboconomics across all knowledge fields and economic systems.',
        materials: [
          {
            id: 'e4', type: 'text', title: 'Eboconomics in the Real World', duration: '15 min read',
            content: [
              { type: 'header', text: 'Applied Eboconomics' },
              { type: 'paragraph', text: 'Eboconomics applies across every dimension of economic life — from personal finance to global trade, from business strategy to community development. The 256 Odu Ifa provide an inexhaustible axiomatic resource for improving all economic systems.' },
              { type: 'highlight', text: 'Ẹbọnet Technologies bring Eboconomics into the digital world — applying energy exchange principles across the full IFA Internet ecosystem.' },
              { type: 'quote', text: 'In the Ebo Economy, every transaction is an act of Ẹbọ — every exchange is an opportunity for balanced, conscious energy flow.', attribution: 'Ebology Platform' },
            ]
          },
        ]
      },
    ]
  },

  // ── KIDS' COURSES (from IFA Coding Academy) ──────────────────────────────

  {
    id: 'c4', title: 'The Basics of IFA Coding', subtitle: 'Gentle Introduction — IFA STEAM for Young Learners',
    program: 'kids', color: '#ff6b35', sym: '⟁',
    level: 'Introductory', duration: '3 months', price: '₦40,000/month',
    priceNote: '₦110,000 for 3 months | ₦10,000/hr · 4 sessions/month',
    description: 'A gentle introduction to IFA Coding for young learners — exploring science, technology, philosophy, and art through Ifa principles. Bilingual instruction in Yoruba and English.',
    weeks: [
      {
        id: 'bc_w1', order: 0, title: 'Week 1: What is IFA Coding?',
        description: 'Discovering IFA as the original coding system of the universe.',
        materials: [
          {
            id: 'bc1', type: 'text', title: 'IFA — The Original Code of Everything', duration: '10 min read',
            content: [
              { type: 'header', text: 'IFA: The World\'s First Coding System' },
              { type: 'paragraph', text: 'Long before computers were invented, the Ifa tradition gave us something even more powerful — a complete coding system for understanding the entire universe! This system, built on two simple symbols, can describe every situation, every feeling, every idea, and every part of nature.' },
              { type: 'highlight', text: 'IFA Coding uses just two symbols — Ogbe ( | ) and Oyeku ( O ) — to encode the knowledge of the entire universe. That is how amazing it is!' },
              { type: 'header', text: 'Why is IFA Called Coding?' },
              { type: 'paragraph', text: 'Just like how a coder writes instructions that a computer can understand, an IFA coder uses Ogbe and Oyeku symbols to encode knowledge, wisdom, and guidance. When you arrange these symbols in different patterns, you get a new Odu — a chapter of universal wisdom!' },
              { type: 'list', items: ['IFA has 256 Odu — 256 chapters of universal knowledge', 'Each Odu = 4 symbols in a column', 'Only 2 symbols needed: | and O', 'Used for thousands of years before computers existed!'] },
              { type: 'quote', text: 'IFA is the world\'s first and greatest coding system — created by Orunmila, the Orisa of Wisdom!', attribution: 'Ifacodemy' },
            ]
          },
          {
            id: 'bc2', type: 'text', title: 'Ẹni tó bá mọ Ifá, mọ ohun gbogbo — Knowing IFA Means Knowing Everything', duration: '8 min read',
            content: [
              { type: 'header', text: 'A Yorùbá Proverb About Wisdom' },
              { type: 'paragraph', text: 'This Yorùbá proverb teaches us that IFA is not just a subject — it is the gateway to all subjects! When you learn IFA, you are learning science, maths, philosophy, art, language, and life — all at once.' },
              { type: 'highlight', text: 'In IFA, learning is called ẸKỌ — and those who love learning are called POLYMATHS. A polymath is someone who knows many things!' },
              { type: 'list', items: ['POLYMATH = someone who loves all knowledge', 'IFA STEAM = Science, Technology, Engineering, Arts, Mathematics through IFA', 'Yorùbá + English = bilingual wisdom', 'Every lesson connects to real life!'] },
              { type: 'paragraph', text: 'In this course, we will use Yorùbá and English together — because IFA wisdom is best understood in the language it was given to the world!' },
            ]
          },
          {
            id: 'bc3', type: 'video', title: 'Introduction to IFA Coding — For Young Learners', duration: '~8 min',
            videoUrl: 'https://www.youtube.com/watch?v=5qap5aO4i9A',
            description: 'A fun animated introduction to IFA Coding for children — discover the symbols, patterns, and magic of IFA!'
          },
        ]
      },
      {
        id: 'bc_w2', order: 1, title: 'Week 2: Learning Ogbe and Oyeku',
        description: 'Getting to know the two foundation symbols of all IFA knowledge.',
        materials: [
          {
            id: 'bc4', type: 'text', title: 'Meet the Two Heroes of IFA: Ogbe and Oyeku', duration: '10 min activity',
            content: [
              { type: 'header', text: 'Ogbe: The Line of Light' },
              { type: 'paragraph', text: 'Ogbe is drawn as a straight vertical line: |. In IFA, Ogbe represents light, presence, action, and the power of YES. It is the active symbol — full of energy and life.' },
              { type: 'highlight', text: 'Ogbe ( | ) = Light · Presence · YES · Action · The number 1 in IFA coding' },
              { type: 'header', text: 'Oyeku: The Circle of Possibility' },
              { type: 'paragraph', text: 'Oyeku is drawn as a circle: O. In IFA, Oyeku represents depth, rest, mystery, and the power of NOT YET. It is the receptive symbol — full of potential and possibility.' },
              { type: 'highlight', text: 'Oyeku ( O ) = Depth · Rest · Possibility · The number 0 in IFA coding' },
              { type: 'list', items: ['Activity 1: Draw 10 Ogbe lines on your paper', 'Activity 2: Draw 10 Oyeku circles on your paper', 'Activity 3: Arrange 4 symbols (| or O) in a column — that is YOUR Odu!', 'Activity 4: Give your Odu a name!'] },
            ]
          },
          {
            id: 'bc5', type: 'text', title: 'My First IFA Code — Writing an Odu', duration: '12 min activity',
            content: [
              { type: 'header', text: 'Writing Your First Odu' },
              { type: 'paragraph', text: 'An Odu is made of 4 symbols stacked on top of each other in a column. Use | and O in any combination you like. Every arrangement is a real Odu with real meaning!' },
              { type: 'highlight', text: 'Try writing: | O | O — this is IWORI MEJI, the Odu of inner wisdom and self-knowledge!' },
              { type: 'list', items: ['| | | | = Ogbe Meji (light and beginnings)', 'O O O O = Oyeku Meji (mystery and depth)', '| O | O = Iwori Meji (inner wisdom)', 'O | O | = Odi Meji (the hidden and unseen)'] },
              { type: 'paragraph', text: 'Each of the 256 Odu has its own stories, wisdom, guidance, and teachings. The more Odu you learn, the more wisdom you carry!' },
            ]
          },
        ]
      },
      {
        id: 'bc_w3', order: 2, title: 'Week 3: IFA and Nature — The STEAM Connection',
        description: 'Discovering how IFA connects to science, art, and everything around us.',
        materials: [
          {
            id: 'bc6', type: 'text', title: 'IFA in Nature — Spotting Patterns', duration: '10 min activity',
            content: [
              { type: 'header', text: 'Ifa Patterns Are Everywhere!' },
              { type: 'paragraph', text: 'Once you learn to see IFA patterns, you will notice them everywhere in nature — in leaves, shells, rivers, stars, and even in the way animals move. Nature itself is written in IFA code!' },
              { type: 'list', items: ['Spirals in shells → Oyeku (circular patterns)', 'Straight tree trunks → Ogbe (line patterns)', 'River currents → flowing Odu patterns', 'Night and day → Oyeku (night) and Ogbe (day)', 'Breathing in and out → IFA binary rhythm'] },
              { type: 'highlight', text: 'STEAM Activity: Go outside and find 3 things in nature that remind you of Ogbe ( | ) and 3 things that remind you of Oyeku ( O ).' },
              { type: 'quote', text: 'The whole world is a giant Odu — waiting to be read by those who have learned to see with IFA eyes.', attribution: 'Ifacodemy' },
            ]
          },
          {
            id: 'bc7', type: 'video', title: 'IFA Patterns in Nature — STEAM Exploration', duration: '~7 min',
            videoUrl: 'https://www.youtube.com/watch?v=5qap5aO4i9A',
            description: 'A visual journey through nature finding IFA patterns — spirals, lines, circles, and binary rhythms all around us.'
          },
        ]
      },
    ]
  },

  {
    id: 'c5', title: 'Introduction to IFA Mathematics', subtitle: 'IFA STEAM — Numbers, Patterns & IfaBits for Kids',
    program: 'kids', color: '#8b5cf6', sym: '∑',
    level: 'Elementary', duration: '3 months', price: '₦40,000/month',
    priceNote: '₦110,000 for 3 months · Bilingual (Yorùbá/English)',
    description: 'Foundational exploration of IfaBits, symbols, numbers, and patterns. Basic Ifa STEAM bridging ancestral logic with analytical thinking. Bilingual instruction in Yorùbá and English.',
    weeks: [
      {
        id: 'im_w1', order: 0, title: 'Week 1: IFA Numbers and Patterns',
        description: 'Discovering the magic numbers of IFA and how patterns work.',
        materials: [
          {
            id: 'im1', type: 'text', title: 'The 4 Magic Numbers of IFA', duration: '10 min read',
            content: [
              { type: 'header', text: 'IFA\'s Most Important Numbers: 2, 4, 16, 256' },
              { type: 'paragraph', text: 'In IFA Mathematics, four numbers hold the key to understanding the whole universe. These numbers show us how IFA knowledge is built, layer by layer, like a beautiful tower of wisdom.' },
              { type: 'highlight', text: '2 → 4 → 16 → 256: This is the IFA expansion! Every step multiplies by itself.' },
              { type: 'list', items: ['2 = The IFA Pair (Ogbe and Oyeku)', '4 = Positions in each Odu', '16 = The 16 Principal Odu (16 = 4 × 4)', '256 = All Odu (256 = 16 × 16)'] },
              { type: 'paragraph', text: 'Notice: 2² = 4, 4² = 16, 16² = 256. IFA Mathematics uses the power of squaring to expand from 2 symbols to 256 complete knowledge fields. This is mathematical genius!' },
              { type: 'quote', text: 'IFA Mathematics is not just about numbers — it is about understanding the structure of existence itself.', attribution: 'IFA Mathematics' },
            ]
          },
          {
            id: 'im2', type: 'text', title: 'IfaBits — The Building Blocks of IFA Knowledge', duration: '8 min read',
            content: [
              { type: 'header', text: 'What is an IfaBit?' },
              { type: 'paragraph', text: 'An IfaBit is the smallest unit of IFA knowledge — a single Ogbe ( | ) or Oyeku ( O ) symbol. Just like a computer works with bits (0 and 1), IFA works with IfaBits (| and O). But IfaBits carry much more meaning than computer bits!' },
              { type: 'highlight', text: 'IfaBit: the basic unit of IFA knowledge. Every Odu is made of 4 IfaBits. 256 Odu × 4 IfaBits = 1,024 IfaBits of universal wisdom.' },
              { type: 'list', items: ['IfaBit O = Oyeku = potential, rest, receptive', 'IfaBit | = Ogbe = active, present, expressive', '4 IfaBits = 1 Odu = 1 knowledge field', '256 Odu = the complete knowledge universe'] },
            ]
          },
          {
            id: 'im3', type: 'video', title: 'Counting with IFA — Fun Mathematics', duration: '~9 min',
            videoUrl: 'https://www.youtube.com/watch?v=5qap5aO4i9A',
            description: 'A fun maths video exploring IFA numbers, patterns, and how 256 is the most magical number in mathematics.'
          },
        ]
      },
      {
        id: 'im_w2', order: 1, title: 'Week 2: Shapes, Symmetry and IFA Art',
        description: 'Finding mathematical patterns in IFA art and nature.',
        materials: [
          {
            id: 'im4', type: 'text', title: 'Symmetry in IFA Patterns', duration: '10 min activity',
            content: [
              { type: 'header', text: 'Mathematics is Beautiful!' },
              { type: 'paragraph', text: 'IFA Mathematics is full of beautiful patterns and symmetries. The 256 Odu can be arranged in a 16 × 16 grid — a perfect square of wisdom. Every row, every column has mathematical meaning.' },
              { type: 'highlight', text: 'Activity: Draw a 4×4 grid. Fill each box with an Ogbe ( | ) or an Oyeku ( O ). Count how many different patterns you can make!' },
              { type: 'list', items: ['A 4×4 grid has 16 boxes', 'Each box can be | or O (2 choices)', '16 possible positions = the 16 Principal Odu', 'The 16 Principal Odu arranged in a 16×16 matrix = all 256 Odu'] },
              { type: 'paragraph', text: 'This is IFA geometry — mathematics and wisdom united in a perfect system.' },
            ]
          },
        ]
      },
      {
        id: 'im_w3', order: 2, title: 'Week 3: IFA Logic — True, False, and Everything',
        description: 'Learning how IFA logic works and how it connects to everyday thinking.',
        materials: [
          {
            id: 'im5', type: 'text', title: 'IFA Logic for Kids', duration: '10 min read',
            content: [
              { type: 'header', text: 'Logic: Making Sense of the World' },
              { type: 'paragraph', text: 'Logic is the science of thinking clearly. IFA Logic (called LogiE) teaches us how to tell what is true, what is false, and how to figure things out step by step. It is one of the most important skills a polymath can have!' },
              { type: 'highlight', text: 'In IFA Logic: Ogbe ( | ) often represents TRUE and Oyeku ( O ) represents the potential for CHANGE. Together they help us reason about every situation.' },
              { type: 'list', items: ['Ask: Is this true or false?', 'Ask: What do I know for sure?', 'Ask: What could change?', 'Ask: What comes next?'] },
              { type: 'quote', text: 'A good thinker asks good questions. IFA Logic is the science of asking the right questions.', attribution: 'IFA Academy' },
            ]
          },
          {
            id: 'im6', type: 'video', title: 'IFA Logic — Thinking Like a Polymath', duration: '~8 min',
            videoUrl: 'https://www.youtube.com/watch?v=5qap5aO4i9A',
            description: 'A fun exploration of logic and reasoning through IFA stories and patterns.'
          },
        ]
      },
    ]
  },

  {
    id: 'c6', title: 'The IFA Model of Education', subtitle: 'Elementary IFA Simulation Theory — Young Polymaths',
    program: 'kids', color: '#14b8d4', sym: '⧖',
    level: 'Elementary', duration: '3 months', price: '₦40,000/month',
    priceNote: '₦110,000 for 3 months · Bilingual (Yorùbá/English)',
    description: 'Elementary IFA Simulation Theory based on mathematical simulations of the Base-Field (OmniField). A comprehensive Ifa STEAM approach to education and learning.',
    weeks: [
      {
        id: 'me_w1', order: 0, title: 'Week 1: How Do We Learn? The IFA Way',
        description: 'Discovering the IFA model of how knowledge is created and learned.',
        materials: [
          {
            id: 'me1', type: 'text', title: 'The IFA Model of Education', duration: '10 min read',
            content: [
              { type: 'header', text: 'How Does IFA Teach Us to Learn?' },
              { type: 'paragraph', text: 'IFA has its own special model for how learning works — and it is very different from ordinary school! In the IFA model, learning is not just about memorising facts. It is about UNDERSTANDING patterns, CONNECTING ideas, and BECOMING a polymath who knows many things!' },
              { type: 'highlight', text: 'The IFA Model of Education is based on the OmniField — the universal field from which all knowledge emerges. Learning means connecting to this field!' },
              { type: 'list', items: ['Polymathic learning = learning many subjects at once', 'Pattern recognition = seeing connections between different fields', 'Odu as curriculum = each Odu teaches a different knowledge field', 'Community learning = sharing knowledge with others (Ubuntu)'] },
              { type: 'quote', text: 'In IFA, the best student is not the one who memorises the most — it is the one who sees the most connections!', attribution: 'Ifacodemy' },
            ]
          },
          {
            id: 'me2', type: 'text', title: 'The OmniField — Where All Knowledge Comes From', duration: '8 min read',
            content: [
              { type: 'header', text: 'What is the OmniField?' },
              { type: 'paragraph', text: 'In IFA Simulation Theory, the OmniField (also called the Base-Field) is the infinite source from which all knowledge, energy, and existence emerges. Think of it like a giant ocean of potential — and every Odu Ifa is a wave rising from that ocean!' },
              { type: 'highlight', text: 'OmniField = the infinite source of all IFA knowledge. Every Odu is a simulation drawn from the OmniField.' },
              { type: 'list', items: ['OmniField = infinite potential (like Oyeku)', 'Odu = specific patterns from the OmniField (like waves)', 'Learning = drawing wisdom from the OmniField', 'Education = helping students connect to the OmniField'] },
            ]
          },
          {
            id: 'me3', type: 'video', title: 'Learning the IFA Way — A Different Kind of School', duration: '~7 min',
            videoUrl: 'https://www.youtube.com/watch?v=5qap5aO4i9A',
            description: 'Discover how the IFA model of education creates polymaths — learners who are curious about everything!'
          },
        ]
      },
      {
        id: 'me_w2', order: 1, title: 'Week 2: The 8 Ifacodemy Graduate Attributes (IGAs)',
        description: 'Learning the 8 qualities that every IFA Academy graduate develops.',
        materials: [
          {
            id: 'me4', type: 'text', title: 'The 8 IGA Qualities — Who Do You Want to Be?', duration: '12 min read',
            content: [
              { type: 'header', text: 'What Makes an Ifacodemy Graduate Special?' },
              { type: 'paragraph', text: 'The IFA Academy of Polymaths (Ifacodemy) has 8 special qualities — called Ifacodemy Graduate Attributes (IGAs) — that every student works to develop. These are not just school skills. They are life skills!' },
              { type: 'list', items: ['◈ Polymath: loves learning many subjects', '◎ Culturally Conscious (Ubuntu): respects culture and community', '🐚 Commercially Aware: understands how value is created', '⚡ Enterprising: turns ideas into action', '⊛ Resilient: bounces back from challenges', '⬡ Interdisciplinary Collaborator: works with others across subjects', '⊕ Globally & Socially Aware: understands the world', '⟳ Personal Growth & Development: always improving'] },
              { type: 'highlight', text: 'Activity: Which of the 8 IGAs do you feel strongest in right now? Which do you most want to develop?' },
            ]
          },
        ]
      },
    ]
  },

  // ── ADULTS' COURSES (from IFA Coding Academy) ────────────────────────────

  {
    id: 'c7', title: 'Introduction to IFA Coding', subtitle: 'The 256 Ifa Codes — STEAM & Consciousness',
    program: 'adults', color: '#e9498a', sym: '⌬',
    level: 'Introductory', duration: '3 months', price: '₦60,000/month',
    priceNote: '₦170,000 for 3 months | ₦15,000/hr · 5–10 learners/cohort',
    description: 'Introduces the 256 Ifa Codes encoding knowledge across disciplines. A modern STEAM approach combining consciousness-based principles with rigorous analytical frameworks.',
    weeks: [
      {
        id: 'ic_w1', order: 0, title: 'Week 1: The 256 Ifa Codes as a Knowledge System',
        description: 'Understanding how the 256 Odu Ifa encode all knowledge across all disciplines.',
        materials: [
          {
            id: 'ic1', type: 'text', title: 'The 256 Ifa Codes — An Analytical Framework', duration: '15 min read',
            content: [
              { type: 'header', text: 'Understanding the 256 Ifa Codes' },
              { type: 'paragraph', text: 'The 256 Ifa Codes (Odu Ifa) represent a complete axiomatic knowledge system — a meta-framework through which any discipline can be understood, structured, and applied. Each Odu encodes a distinct knowledge field, providing guidance on human experience, scientific principles, and philosophical insight simultaneously.' },
              { type: 'highlight', text: 'The 256 Odu are a complete combinatorial system: 2⁸ = 256. Each is a unique binary signature of 8 IfaBits — two stacked columns of 4 Ogbe/Oyeku symbols.' },
              { type: 'header', text: 'IFA as a STEAM Framework' },
              { type: 'paragraph', text: 'IFA Coding applies the 256 Odu to all STEAM disciplines — Science, Technology, Engineering, Arts, and Mathematics. Each Odu maps to one or more knowledge domains, creating a unified inter-disciplinary encoding system.' },
              { type: 'list', items: ['Science: Odu as models of natural phenomena', 'Technology: IFA Computing framework (ToEC)', 'Engineering: Amulu Principle — composition and integration', 'Arts: Opon Ifa symbolism, Oriki, visual codes', 'Mathematics: IFA Mathematics — 16 axioms, 256 fields'] },
              { type: 'quote', text: 'The 256 Odu are not merely divination codes — they are the complete scientific and philosophical meta-framework of the universe.', attribution: 'IFABOK' },
            ]
          },
          {
            id: 'ic2', type: 'text', title: 'From Binary to 256 — The IFA Expansion', duration: '12 min read',
            content: [
              { type: 'header', text: 'The Mathematical Structure of IFA Coding' },
              { type: 'paragraph', text: 'The 256 Odu emerge through a precise mathematical expansion from the fundamental IFA Pair. This expansion mirrors the most powerful structures in modern mathematics and computing — predating them by millennia.' },
              { type: 'highlight', text: 'IFA Pair → 16 Principal Odu → 256 Full Odu. This is a binary field expansion: each stage doubles the combinatorial space.' },
              { type: 'list', items: ['Stage 1: 2 symbols (Ogbe, Oyeku)', 'Stage 2: 4 positions = 2⁴ = 16 patterns (the 16 Principal Odu)', 'Stage 3: 16 × 16 = 256 Odu (full Odu matrix)', 'Every Odu is a unique 8-bit binary signature'] },
            ]
          },
          {
            id: 'ic3', type: 'video', title: 'Introduction to IFA Coding — The 256 Knowledge Fields', duration: '~12 min',
            videoUrl: 'https://www.youtube.com/watch?v=5qap5aO4i9A',
            description: 'A comprehensive overview of the 256 Ifa Codes as an analytical and cross-disciplinary knowledge encoding system.'
          },
        ]
      },
      {
        id: 'ic_w2', order: 1, title: 'Week 2: Consciousness-Based Principles in IFA',
        description: 'Understanding how IFA integrates consciousness as a primary variable in all knowledge fields.',
        materials: [
          {
            id: 'ic4', type: 'text', title: 'Consciousness as a First Principle in IFA', duration: '14 min read',
            content: [
              { type: 'header', text: 'IFA Consciousness Science' },
              { type: 'paragraph', text: 'Unlike Western scientific paradigms that treat consciousness as an emergent by-product of matter, IFA positions consciousness as a primary principle — the Àṣẹ (divine energy-word) from which all material and non-material reality emerges. IFA Coding therefore always includes consciousness as a variable in its knowledge models.' },
              { type: 'highlight', text: 'In IFA: Consciousness → Energy (Àṣẹ) → Matter. This inversion of the Western model is foundational to all IFA STEAM disciplines.' },
              { type: 'list', items: ['Àṣẹ = divine energy-word = consciousness in action', 'Ori = personal consciousness field', 'Ìwà = character = the expression of consciousness', 'Ọmọlúwàbí = the consciousness ideal — good character'] },
            ]
          },
          {
            id: 'ic5', type: 'text', title: 'Applying IFA Coding Across Disciplines', duration: '10 min read',
            content: [
              { type: 'header', text: 'Cross-Disciplinary IFA Applications' },
              { type: 'paragraph', text: 'IFA Coding is not a single-domain skill. Its power lies in cross-disciplinary application — using the 256 Odu as a universal encoding system that bridges all fields of knowledge. This is what makes Ifacodemy graduates true polymaths.' },
              { type: 'list', items: ['Economics: Eboconomics — energy exchange economics', 'Medicine: Ifa Health — consciousness-based healing', 'Engineering: Ifa Technology Projects — applied IFA innovation', 'Philosophy: PhiloE — 5-branch IFA philosophy', 'Computing: ToEC — Theory of Everything Computing'] },
              { type: 'highlight', text: 'Each Odu provides a unique lens through which to analyse, solve, and innovate across any field. The 256 Odu = 256 analytical lenses.' },
            ]
          },
        ]
      },
      {
        id: 'ic_w3', order: 2, title: 'Week 3: IFA Computing — ToEC Foundations',
        description: 'Introduction to IFA Computing as the Theory of Everything Computing framework.',
        materials: [
          {
            id: 'ic6', type: 'text', title: 'IFA Computing (ToEC) — Foundations', duration: '12 min read',
            content: [
              { type: 'header', text: 'IFA Computing: The Theory of Everything Computing' },
              { type: 'paragraph', text: 'IFA Computing (ToEC) is the computational framework that emerged from the 256 Odu Ifa. It predates modern binary computing by millennia and represents a complete meta-computational system — capable of encoding, processing, and outputting knowledge across all domains of reality.' },
              { type: 'highlight', text: 'IFA Computing = the original binary computing system. Ogbe = 1, Oyeku = 0. The 256 Odu = 256 computational instructions.' },
              { type: 'list', items: ['ToEC = Theory of Everything Computing', 'IfaBit = basic unit of IFA computation', 'Odu = computational instruction (256 total)', 'Àṣẹ = computational energy = consciousness energy'] },
              { type: 'quote', text: 'IFA Computing is the universe\'s own programming language — and every Odu Ifa is a complete software module.', attribution: 'IFA Computing' },
            ]
          },
        ]
      },
    ]
  },

  {
    id: 'c8', title: 'Introduction to IFA Mathematics', subtitle: 'Modelling Universal Fields — TOE Mathematics',
    program: 'adults', color: '#8b5cf6', sym: 'Ω',
    level: 'Introductory', duration: '3 months', price: '₦60,000/month',
    priceNote: '₦170,000 for 3 months · Bilingual (Yorùbá/English)',
    description: 'Explores knowledge universes within IFA Mathematics, modelling fields as mathematical structures. Ifa STEAM with universal insight focus.',
    weeks: [
      {
        id: 'am_w1', order: 0, title: 'Week 1: The 16 Axioms — Laws of Knowledge',
        description: 'The foundational axioms of IFA Mathematics and their universal applications.',
        materials: [
          {
            id: 'am1', type: 'text', title: 'IFA Mathematics — The 16 Laws of Knowledge', duration: '15 min read',
            content: [
              { type: 'header', text: 'IFA Mathematics: TOE Mathematics' },
              { type: 'paragraph', text: 'IFA Mathematics (TOE Mathematics) is the mathematical system derived from the 256 Odu Ifa. Its 16 core Axioms — corresponding to the 16 Principal Odu — provide the universal mathematical laws governing all fields of knowledge, from physics to economics, from computing to philosophy.' },
              { type: 'highlight', text: '16 Axioms (Laws of Knowledge) = the foundational mathematical laws of all existence. Each axiom corresponds to one of the 16 Principal Odu.' },
              { type: 'list', items: ['IfaGebra — The algebra of IFA patterns and fields', 'NumoEs — IFA number theory and numerical fields', 'AlgebroEs — Abstract algebraic structures in IFA', 'FunctoEs — Functional and mapping mathematics', 'OpoEs — Operational mathematics', 'Duoinfinities — The IFA theory of double infinity'] },
              { type: 'quote', text: 'IFA Mathematics is the mathematics of everything — it is not limited to any single domain but applicable to all knowledge fields simultaneously.', attribution: 'IFA Mathematics' },
            ]
          },
          {
            id: 'am2', type: 'text', title: 'Duoinfinities — The IFA Theory of Infinity', duration: '12 min read',
            content: [
              { type: 'header', text: 'IfaInfinity: Double Infinity' },
              { type: 'paragraph', text: 'One of the most unique and powerful concepts in IFA Mathematics is Duoinfinities (IfaInfinity) — the theory of double infinity. Unlike conventional mathematics which recognises a single infinity, IFA Mathematics posits two distinct infinite dimensions: the infinity of possibilities and the infinity of impossibilities.' },
              { type: 'highlight', text: 'Duoinfinity: ∞⁺ (infinite possibilities) AND ∞⁻ (infinite impossibilities). Together they constitute the complete probability space of existence.' },
              { type: 'paragraph', text: 'This concept has profound implications across mathematics, physics, consciousness science, and philosophy — enabling IFA Mathematics to model aspects of reality that conventional mathematics cannot reach.' },
              { type: 'list', items: ['Ogbe-infinity: ∞⁺ = the infinity of presence, possibility, and existence', 'Oyeku-infinity: ∞⁻ = the infinity of absence, impossibility, and non-existence', 'Together they define the complete field of all that is and is not', 'Applied in IfaWave Function, Consciousness Mechanics, Eboconomics'] },
            ]
          },
          {
            id: 'am3', type: 'video', title: 'IFA Mathematics — Universal Laws in Action', duration: '~11 min',
            videoUrl: 'https://www.youtube.com/watch?v=5qap5aO4i9A',
            description: 'An introduction to the 16 Laws of Knowledge in IFA Mathematics and how they apply across all fields of reality.'
          },
        ]
      },
      {
        id: 'am_w2', order: 1, title: 'Week 2: Modelling Knowledge Fields',
        description: 'Using IFA Mathematics to model any knowledge domain as a mathematical field.',
        materials: [
          {
            id: 'am4', type: 'text', title: 'Knowledge Fields in IFA Mathematics', duration: '12 min read',
            content: [
              { type: 'header', text: 'What is a Knowledge Field?' },
              { type: 'paragraph', text: 'In IFA Mathematics, a Knowledge Field is any domain of knowledge that can be modelled mathematically using the 256 Odu as its axiomatic basis. Every academic discipline, every practical skill, every aspect of human experience constitutes a Knowledge Field that IFA Mathematics can formally represent.' },
              { type: 'highlight', text: 'IFA Mathematics principle: every Knowledge Field has a corresponding Odu signature — its unique binary representation within the 256 Odu matrix.' },
              { type: 'list', items: ['Physics → IFA Physics Field (IFA Mechanics, IfaWave, etc.)', 'Economics → Eboconomics Field (Ebo Economy, IfaWorkfunction)', 'Computing → IFA Computing Field (ToEC, IfaBit structures)', 'Philosophy → PhiloE Field (LogiE, EthiE, OntoE, EpistoE, PhenoE)', 'Language → IfaLang Field (universal language structures)'] },
            ]
          },
        ]
      },
      {
        id: 'am_w3', order: 2, title: 'Week 3: IfaGebra and NumoEs',
        description: 'Algebra and number theory through the IFA Mathematics framework.',
        materials: [
          {
            id: 'am5', type: 'text', title: 'IfaGebra — The Algebra of IFA Patterns', duration: '14 min read',
            content: [
              { type: 'header', text: 'IfaGebra: Algebra Rooted in Odu Patterns' },
              { type: 'paragraph', text: 'IfaGebra is the algebraic branch of IFA Mathematics. It studies the structural patterns of the 256 Odu, the algebraic relationships between Odu, and the transformational rules that govern how knowledge fields interact and combine.' },
              { type: 'highlight', text: 'IfaGebra: the algebra of the 256 Odu — how Odu combine, transform, and interact as algebraic structures.' },
              { type: 'list', items: ['Amulu = composition operator (combining two Odu into a new field)', 'Iwa = character function (the transformational property of an Odu)', 'Ase = operational energy (applied to transform one field into another)', 'Group theory analogues: 256 Odu form a finite mathematical group'] },
            ]
          },
          {
            id: 'am6', type: 'video', title: 'IfaGebra in Practice — Algebraic Patterns of the Odu', duration: '~10 min',
            videoUrl: 'https://www.youtube.com/watch?v=5qap5aO4i9A',
            description: 'Visual exploration of IfaGebra — seeing the algebraic structure within the 256 Odu matrix.'
          },
        ]
      },
    ]
  },

  {
    id: 'c9', title: 'Introduction to Consciousness Science', subtitle: 'IFA Principles — Spirit, Mind and Matter',
    program: 'adults', color: '#3b9eff', sym: '◉',
    level: 'Introductory', duration: '3 months', price: '₦60,000/month',
    priceNote: '₦170,000 for 3 months',
    description: 'Studies consciousness scientifically using IFA principles, breaking concepts into measurable IfaBits components. Bridges spirit, mind, and matter into a unified science.',
    weeks: [
      {
        id: 'cs_w1', order: 0, title: 'Week 1: Consciousness as a Scientific Subject',
        description: 'Why consciousness must be studied scientifically and how IFA provides the framework.',
        materials: [
          {
            id: 'cs1', type: 'text', title: 'The Science of Consciousness — IFA\'s Approach', duration: '15 min read',
            content: [
              { type: 'header', text: 'Why Study Consciousness Scientifically?' },
              { type: 'paragraph', text: 'Consciousness is the most fundamental phenomenon in existence — and the most poorly understood in conventional science. The "hard problem of consciousness" has puzzled Western science for centuries. IFA provides not just an answer, but a complete scientific framework: Consciousness Mechanics (ConMeche).' },
              { type: 'highlight', text: 'IFA Consciousness Science: consciousness is not produced by the brain — it IS the primary field from which brain activity, matter, and reality emerge.' },
              { type: 'header', text: 'Consciousness Mechanics (ConMeche)' },
              { type: 'paragraph', text: 'Consciousness Mechanics is the branch of IFA Physics that formally studies consciousness as a physical and meta-physical field — measurable, structured, and expressible in terms of IfaBit components.' },
              { type: 'list', items: ['Consciousness = primary field (not emergent from matter)', 'Àṣẹ = consciousness energy = creative force', 'Ori = individual consciousness field', 'Consciousness Mechanics = formal scientific study of these fields'] },
              { type: 'quote', text: 'IFA has always known what modern science is only now beginning to suspect: consciousness is not a product of matter — matter is a product of consciousness.', attribution: 'IFA Consciousness Science' },
            ]
          },
          {
            id: 'cs2', type: 'text', title: 'Àṣẹ — The Consciousness Energy', duration: '12 min read',
            content: [
              { type: 'header', text: 'What is Àṣẹ?' },
              { type: 'paragraph', text: 'Àṣẹ is one of the most important concepts in IFA — and in consciousness science. It is the divine creative energy that flows through all of existence, manifesting as thought, speech, action, and physical reality. In IFA, Àṣẹ is the primary mechanism by which consciousness creates and transforms reality.' },
              { type: 'highlight', text: 'Àṣẹ (Ah-shay) = "So be it" = the power of the spoken word to create reality = consciousness energy in action.' },
              { type: 'list', items: ['Àṣẹ is released through speech (Oriki, prayer, affirmation)', 'Àṣẹ is amplified through Ẹbọ (ritual energy exchange)', 'Àṣẹ accumulates through good character (Ọmọlúwàbí)', 'Àṣẹ is the IFA analogue of quantum field excitation'] },
            ]
          },
          {
            id: 'cs3', type: 'video', title: 'Consciousness Science — IFA Foundations', duration: '~13 min',
            videoUrl: 'https://www.youtube.com/watch?v=5qap5aO4i9A',
            description: 'A scientific introduction to IFA Consciousness Science — exploring Àṣẹ, Ori, and the consciousness field framework.'
          },
        ]
      },
      {
        id: 'cs_w2', order: 1, title: 'Week 2: Measuring Consciousness — IfaBits and the Consciousness Field',
        description: 'How IFA breaks consciousness into measurable components.',
        materials: [
          {
            id: 'cs4', type: 'text', title: 'IfaBits as Units of Consciousness', duration: '12 min read',
            content: [
              { type: 'header', text: 'Quantifying Consciousness with IfaBits' },
              { type: 'paragraph', text: 'One of IFA\'s most powerful innovations is its ability to decompose consciousness into measurable units — IfaBits. Just as information is measured in bits, and energy in joules, IFA Consciousness Science measures states of consciousness in terms of IfaBit configurations — the specific Ogbe/Oyeku patterns of a consciousness field.' },
              { type: 'highlight', text: 'A consciousness state can be encoded as an Odu — a specific IfaBit configuration. Consciousness diagnosis in IFA = determining which Odu governs a current state.' },
              { type: 'list', items: ['Each Odu encodes a distinct consciousness state', 'Divination = diagnosing the Odu governing a situation', 'Ebo = correcting or enhancing a consciousness state', 'The 256 Odu = complete consciousness state map'] },
            ]
          },
        ]
      },
      {
        id: 'cs_w3', order: 2, title: 'Week 3: Spirit, Mind, Matter — The IFA Trinity',
        description: 'Understanding the IFA model of the three dimensions of consciousness.',
        materials: [
          {
            id: 'cs5', type: 'text', title: 'The IFA Trinity: Ori, Ẹmí, and Ara', duration: '14 min read',
            content: [
              { type: 'header', text: 'Three Dimensions of Consciousness in IFA' },
              { type: 'paragraph', text: 'IFA recognises three distinct but interpenetrating dimensions of conscious being — analogous to spirit, mind, and body in other traditions, but with far more scientific precision.' },
              { type: 'list', items: ['Ori = personal consciousness / higher self (the spiritual head)', 'Ẹmí = vital energy / breath / animating force (the life force)', 'Ara = physical body (the material dimension of consciousness)'] },
              { type: 'highlight', text: 'In IFA: Ori (spirit) governs Ẹmí (mind-energy), which governs Ara (body). Health and success come from aligning all three dimensions.' },
              { type: 'paragraph', text: 'IFA Consciousness Science studies the interactions between these three dimensions — developing the science of how spiritual states manifest as mental states and ultimately as physical realities.' },
              { type: 'quote', text: 'To heal the body, first align the Ori. To align the Ori, live by Ọmọlúwàbí. This is the complete IFA medicine of consciousness.', attribution: 'IFA Consciousness Science' },
            ]
          },
          {
            id: 'cs6', type: 'video', title: 'The IFA Trinity — Spirit, Mind, Body in Science', duration: '~11 min',
            videoUrl: 'https://www.youtube.com/watch?v=5qap5aO4i9A',
            description: 'Exploring the scientific framework of Ori, Ẹmí, and Ara — the three dimensions of consciousness in IFA.'
          },
        ]
      },
    ]
  },

  {
    id: 'c10', title: 'IFA Technology Projects', subtitle: 'Applied IFA Innovation — Global Challenges',
    program: 'adults', color: '#38e8a0', sym: '⚙',
    level: 'Applied', duration: '3 months', price: '₦60,000/month',
    priceNote: '₦170,000 for 3 months',
    description: 'Practical application of IFA and CEN Technologies to address global challenges in sustainability, health, digital systems, and more. Hands-on IFA innovation.',
    weeks: [
      {
        id: 'tp_w1', order: 0, title: 'Week 1: IFA Technology Principles',
        description: 'The principles underlying IFA-based technology development.',
        materials: [
          {
            id: 'tp1', type: 'text', title: 'IFA Technology — Principles of CEN Innovation', duration: '12 min read',
            content: [
              { type: 'header', text: 'What is IFA Technology?' },
              { type: 'paragraph', text: 'IFA Technology is the application of IFA principles — the 256 Odu, Consciousness Mechanics, Eboconomics, and the complete IFABOK — to the development of technologies that address real-world challenges. CENProject Innovations Limited leads this effort through the IFA Internet ecosystem.' },
              { type: 'highlight', text: 'IFA Technology = IFABOK-grounded innovation. Every technology is developed in alignment with the 256 Odu — ensuring it serves humanity\'s deepest needs.' },
              { type: 'header', text: 'The CEN Technology Stack' },
              { type: 'list', items: ['IFA Internet — The Theory of Everything digital ecosystem', 'IfaLMS — Learning management platform (this system!)', 'IfaLang — Universal language technology', 'IFA Periodic Table — 256 Odu interactive platform', 'Ebology Platform — Energy exchange science system', 'IfaGame — Gamified IFA learning'] },
            ]
          },
          {
            id: 'tp2', type: 'video', title: 'CENProject — Building IFA Technologies for the World', duration: '~10 min',
            videoUrl: 'https://www.youtube.com/watch?v=5qap5aO4i9A',
            description: 'An overview of CENProject\'s technology development philosophy and the IFA Internet ecosystem.'
          },
        ]
      },
      {
        id: 'tp_w2', order: 1, title: 'Week 2: Addressing Global Challenges with IFA',
        description: 'Applying IFA frameworks to sustainability, health, and development.',
        materials: [
          {
            id: 'tp3', type: 'text', title: 'IFA Solutions for Global Challenges', duration: '14 min read',
            content: [
              { type: 'header', text: 'Global Problems, IFA Solutions' },
              { type: 'paragraph', text: 'The 256 Odu Ifa, applied through IFA Technology, offer systematic solutions to humanity\'s most pressing challenges. Each Odu encodes wisdom relevant to a specific class of human challenges — from environmental sustainability to mental health, from economic inequality to digital division.' },
              { type: 'list', items: ['Sustainability: Ebo Economy — energy-balanced economic systems', 'Health: IFA Consciousness Science — spirit-mind-body medicine', 'Digital: IFA Internet — decentralised knowledge ecosystem', 'Education: Ifacodemy — polymathic education model', 'Economics: Eboconomics — ethical energy exchange systems'] },
              { type: 'highlight', text: 'Project challenge: Choose a global problem. Identify the Odu most relevant to it. Design an IFA Technology intervention using IFABOK principles.' },
            ]
          },
        ]
      },
      {
        id: 'tp_w3', order: 2, title: 'Week 3: Your IFA Technology Project',
        description: 'Designing and beginning your own IFA Technology project.',
        materials: [
          {
            id: 'tp4', type: 'text', title: 'Project Design — IFA Technology Brief', duration: '15 min activity',
            content: [
              { type: 'header', text: 'Designing Your IFA Technology Project' },
              { type: 'paragraph', text: 'In this module you will design your own IFA Technology project — a technology solution grounded in IFABOK, addressing a real challenge in your community, country, or the world.' },
              { type: 'list', items: ['Step 1: Identify a problem (local, national, or global)', 'Step 2: Select the relevant Odu(s) from the 256', 'Step 3: Apply IFA principles to the problem domain', 'Step 4: Design a technology solution using CEN methodology', 'Step 5: Present your project brief to the cohort'] },
              { type: 'highlight', text: 'Your IFA Technology project is your contribution to the IFA Internet — the digital manifestation of IFABOK for the modern world.' },
              { type: 'quote', text: 'Every great technology begins with a great question. IFA gives you 256 frameworks for asking the greatest questions.', attribution: 'IFA Technology Projects' },
            ]
          },
        ]
      },
    ]
  },

  {
    id: 'c11', title: 'Advanced IFA Mathematics', subtitle: 'Complex Concepts, Universal Laws & Scientific Analysis',
    program: 'adults', color: '#f5c518', sym: '∞',
    level: 'Advanced', duration: '3 months', price: '₦60,000/month',
    priceNote: '₦170,000 for 3 months',
    description: 'Explores complex concepts and universal laws in IFA Mathematics. Applies Ifa logic to scientific analysis, creative innovation, and cross-disciplinary problem solving.',
    weeks: [
      {
        id: 'adm_w1', order: 0, title: 'Week 1: Advanced IfaGebra and Field Theory',
        description: 'Advanced algebraic structures and field theory in IFA Mathematics.',
        materials: [
          {
            id: 'adm1', type: 'text', title: 'Advanced IfaGebra — Field Structures', duration: '16 min read',
            content: [
              { type: 'header', text: 'IfaGebra at the Advanced Level' },
              { type: 'paragraph', text: 'Advanced IfaGebra extends beyond basic algebraic structures to explore how the 256 Odu form complete mathematical fields, rings, and lattices. These structures provide the formal mathematical foundation for all IFA cross-disciplinary analysis.' },
              { type: 'highlight', text: 'The 256 Odu under the Amulu operation form a finite algebraic structure with properties analogous to those of classical group theory — but with additional consciousness-field dimensions.' },
              { type: 'list', items: ['Amulu Group: the 256 Odu as a finite group under composition', 'Iwa Fields: Odu character functions as field automorphisms', 'Odu Lattices: hierarchical ordering of knowledge fields', 'Cross-field morphisms: how one Knowledge Field maps to another'] },
              { type: 'quote', text: 'Advanced IFA Mathematics is not about complexity for its own sake — it is about achieving the precision needed to model the full depth of existence.', attribution: 'IFA Mathematics' },
            ]
          },
          {
            id: 'adm2', type: 'text', title: 'The 16 Universal Laws — Deep Analysis', duration: '14 min read',
            content: [
              { type: 'header', text: 'The 16 Axioms at the Advanced Level' },
              { type: 'paragraph', text: 'The 16 Axioms of IFA Mathematics are not mere abstract laws — each corresponds to a Principal Odu and encodes a universal principle that operates across all Knowledge Fields simultaneously. Advanced IFA Mathematics develops the ability to apply these axioms formally to any domain.' },
              { type: 'list', items: ['Axiom 1 (Ogbe): Primacy of Presence — existence precedes essence in all fields', 'Axiom 2 (Oyeku): Potentiality Principle — all fields carry non-actualised states', 'Axiom 3 (Iwori): Reflexivity Law — every field models itself', 'Axiom 16 (Ofu): Completeness Principle — the field of fields is complete'] },
              { type: 'highlight', text: 'Formal application: for any Knowledge Field F, the 16 Axioms generate a complete axiomatic system F₁₆ from which all theorems within F can be derived.' },
            ]
          },
        ]
      },
      {
        id: 'adm_w2', order: 1, title: 'Week 2: Consciousness Mechanics — Mathematical Formalism',
        description: 'The mathematical formalism behind IFA Consciousness Mechanics.',
        materials: [
          {
            id: 'adm3', type: 'text', title: 'Consciousness Mechanics — Formal Framework', duration: '16 min read',
            content: [
              { type: 'header', text: 'Mathematical Formalism of Consciousness Mechanics' },
              { type: 'paragraph', text: 'Consciousness Mechanics (ConMeche) is the branch of IFA Physics that provides the formal mathematical framework for studying consciousness fields. It applies the full apparatus of IFA Mathematics — IfaGebra, FunctoEs, OpoEs, and Duoinfinities — to model consciousness states, transitions, and interactions.' },
              { type: 'highlight', text: 'ConMeche uses IfaWave Functions — Odu-indexed probability fields — to model the superposition of consciousness states, analogous to quantum wave functions but with greater scope.' },
              { type: 'list', items: ['IfaWave Function Ψ(Odu): probability amplitude over the 256 Odu states', 'Consciousness collapse: selecting a specific Odu from the superposition (divination)', 'Àṣẹ operator: the transformational operator shifting consciousness states', 'Ebo functional: the integral of all Àṣẹ applied over a consciousness path'] },
            ]
          },
        ]
      },
      {
        id: 'adm_w3', order: 2, title: 'Week 3: Applied Advanced IFA Analysis',
        description: 'Applying advanced IFA Mathematics to scientific and creative problem solving.',
        materials: [
          {
            id: 'adm4', type: 'text', title: 'Advanced IFA Analysis — Cross-Domain Applications', duration: '15 min read',
            content: [
              { type: 'header', text: 'Advanced Analysis Across All Knowledge Fields' },
              { type: 'paragraph', text: 'The mastery of Advanced IFA Mathematics enables the analyst to apply rigorous mathematical tools to any Knowledge Field. This is the hallmark of the advanced IFA polymath — the ability to bring the full power of IFA Mathematics to bear on any problem, in any domain.' },
              { type: 'list', items: ['Scientific Analysis: applying IfaWave Functions to model physical phenomena', 'Economic Analysis: using Eboconomics field equations for market modelling', 'Philosophical Analysis: applying the 16 Axioms to metaphysical questions', 'Creative Innovation: using Odu lattices to generate novel cross-disciplinary solutions', 'Educational Design: building curricula from the 256 Knowledge Fields'] },
              { type: 'highlight', text: 'Advanced IFA Mathematics graduation standard: the ability to formally model any domain as an IFA Knowledge Field using IfaGebra, and derive actionable insights from the Odu structure.' },
              { type: 'quote', text: 'At the advanced level, IFA Mathematics is no longer a subject — it is a way of seeing. The universe reveals itself as a perfectly ordered 256-field mathematical structure.', attribution: 'Advanced IFA Mathematics' },
            ]
          },
          {
            id: 'adm5', type: 'video', title: 'Advanced IFA Mathematics — Cross-Domain Mastery', duration: '~14 min',
            videoUrl: 'https://www.youtube.com/watch?v=5qap5aO4i9A',
            description: 'A deep dive into advanced IFA mathematical techniques and their application across science, philosophy, and innovation.'
          },
        ]
      },
    ]
  },

  {
    id: 'c13', title: 'IFA Professional Certification', subtitle: 'Ifacodemy — Applied IFA Knowledge for Professionals',
    program: 'professionals', color: '#7c3aed', sym: '✦',
    level: 'Professional', duration: '3 months', price: '₦80,000/month',
    priceNote: '₦220,000 for 3 months',
    description: 'A professional-grade certification programme for practitioners, leaders, researchers, and executives seeking to integrate IFA Metascience into their professional fields. Covers advanced IFABOK applications, IFA governance models, and Eboconomic strategy.',
    weeks: [
      {
        id: 'pro_w1', order: 0, title: 'Week 1: IFABOK in Professional Practice',
        description: 'Applying the IFA Body of Knowledge to professional, organisational, and leadership contexts.',
        materials: [
          {
            id: 'pro1', type: 'text', title: 'IFABOK as a Professional Framework', duration: '14 min read',
            content: [
              { type: 'header', text: 'Why Professionals Need IFABOK' },
              { type: 'paragraph', text: 'The IFA Body of Knowledge (IFABOK) is not merely an academic or spiritual system — it is a complete practical framework for professional decision-making, governance, strategy, and innovation. Its 256 Odu provide a proven meta-system for navigating complexity across any professional domain.' },
              { type: 'highlight', text: 'IFABOK in Professional Practice: the 256 Odu as a decision matrix, risk framework, and strategic knowledge system for modern professionals.' },
              { type: 'header', text: 'The Polymath Professional' },
              { type: 'paragraph', text: 'The Ifacodemy Professionals Programme produces Polymath Professionals — practitioners who combine deep IFA knowledge with professional expertise to create breakthrough innovations, lead ethically, and navigate complexity with precision.' },
              { type: 'list', items: ['Strategic decision-making grounded in the 256 Odu', 'IFA Ethics (Ọmọlúwàbí) as a professional code of conduct', 'Eboconomic thinking for sustainable value creation', 'IFA Simulation Theory for scenario modelling and risk analysis'] },
              { type: 'quote', text: 'The Polymath Professional does not specialise to the exclusion of everything else — they go deep into one field while remaining conversant with all fields. That is the Ifa way.', attribution: 'Ifacodemy Professionals Programme' },
            ]
          },
          {
            id: 'pro2', type: 'text', title: 'IFA Governance — Leadership through the 256 Odu', duration: '12 min read',
            content: [
              { type: 'header', text: 'IFA Governance Models' },
              { type: 'paragraph', text: 'IFA Governance applies the 256 Odu Ifa as a comprehensive leadership and organisational framework. It draws on thousands of years of governance wisdom encoded in the Odu — wisdom about power, responsibility, community, resource allocation, and long-term thinking.' },
              { type: 'highlight', text: 'IFA Governance is not autocratic or purely democratic — it is consultative, consensus-based, and rooted in Ọmọlúwàbí ethics: governance as the ethical stewardship of the community\'s energy resources.' },
              { type: 'list', items: ['Odu-based decision frameworks for governance and policy', 'The role of Ifa consultation in strategic planning', 'Community-centred (Ubuntu) leadership models', 'Checks and balances: the Ifa council model applied to modern organisations'] },
            ]
          },
          {
            id: 'pro3', type: 'video', title: 'IFABOK in Professional Leadership — Overview', duration: '~12 min',
            videoUrl: 'https://www.youtube.com/watch?v=5qap5aO4i9A',
            description: 'A professional introduction to applying IFABOK in organisational leadership, strategic decision-making, and professional practice.'
          },
        ]
      },
      {
        id: 'pro_w2', order: 1, title: 'Week 2: Eboconomic Strategy for Professionals',
        description: 'Applying Eboconomics to professional organisations, value chains, and sustainability frameworks.',
        materials: [
          {
            id: 'pro4', type: 'text', title: 'Eboconomics in Organisational Strategy', duration: '13 min read',
            content: [
              { type: 'header', text: 'The Ebo Economy and Your Organisation' },
              { type: 'paragraph', text: 'Eboconomics — the union of Ebology and Economics — provides a powerful new lens for professional strategists. It reframes all value creation, exchange, and distribution as energy exchange governed by the principles of the 256 Odu. From supply chains to HR policy, Eboconomics reveals the energetic dynamics underlying organisational performance.' },
              { type: 'highlight', text: 'Eboconomic audit: every transaction in your organisation is an energy exchange — some build positive Ẹbọ cycles, others deplete them. The professional\'s task is to design organisations that build more than they deplete.' },
              { type: 'list', items: ['Eboconomic value mapping: tracking energy exchange across the value chain', 'The IfaWork Function: minimum viable energy investment per outcome', 'Sustainable Ebo Economy models for corporate strategy', 'ESG through an Eboconomic lens: social and environmental energy accounting'] },
            ]
          },
        ]
      },
      {
        id: 'pro_w3', order: 2, title: 'Week 3: IFA Research Methods & Knowledge Synthesis',
        description: 'Advanced IFA research methodologies for scholars, consultants, and policy professionals.',
        materials: [
          {
            id: 'pro5', type: 'text', title: 'IFA Research Methodology', duration: '15 min read',
            content: [
              { type: 'header', text: 'Research Through the IFA Lens' },
              { type: 'paragraph', text: 'IFA Research Methodology offers a rigorous, holistic framework for knowledge production that integrates empirical, philosophical, artistic, and spiritual dimensions of inquiry. It is a genuine alternative to purely Western scientific methodology — not in opposition to it, but as a complementary and often deeper framework for understanding complex, multi-dimensional phenomena.' },
              { type: 'list', items: ['Odu-based knowledge mapping: positioning any research topic within the 256-field knowledge space', 'IFA epistemology (EpistoE) as a research philosophy', 'Triangulation: integrating quantitative, qualitative, and Ifa oracle methodologies', 'Synthesis: producing knowledge that serves the community (Ọmọlúwàbí research ethics)'] },
              { type: 'highlight', text: 'The IFA researcher is also an Ifa practitioner: research is not merely observation — it is participation in the knowledge field. The researcher changes the field by studying it.' },
              { type: 'quote', text: 'The most important research question is not "what is true?" but "what is wise?" — and wisdom always serves life, community, and the next generation.', attribution: 'IFA Research Methodology' },
            ]
          },
          {
            id: 'pro6', type: 'video', title: 'IFA Knowledge Synthesis — Research Workshop', duration: '~14 min',
            videoUrl: 'https://www.youtube.com/watch?v=5qap5aO4i9A',
            description: 'A workshop on integrating IFA research methods with professional knowledge synthesis — for consultants, policy-makers, and academic researchers.'
          },
        ]
      },
    ]
  },

  {
    id: 'c12', title: 'The IFA Model of Education', subtitle: 'IFA Simulation Theory — Odu Ifa Curriculum Design',
    program: 'adults', color: '#14b8d4', sym: '⧠',
    level: 'Advanced', duration: '3 months', price: '₦60,000/month',
    priceNote: '₦170,000 for 3 months',
    description: 'Founded on IFA Simulation Theory, examining how the Odu Ifa Model of Education generates knowledge fields mathematically from the Base-Field (OmniField). Advanced curriculum theory.',
    weeks: [
      {
        id: 'ame_w1', order: 0, title: 'Week 1: IFA Simulation Theory',
        description: 'The foundational theory of how reality and knowledge are simulated from the OmniField.',
        materials: [
          {
            id: 'ame1', type: 'text', title: 'IFA Simulation Theory — The OmniField Framework', duration: '16 min read',
            content: [
              { type: 'header', text: 'IFA Simulation Theory' },
              { type: 'paragraph', text: 'IFA Simulation Theory posits that all of observable reality — physical, mental, and spiritual — is a mathematical simulation generated from the OmniField (Base-Field): the infinite undifferentiated consciousness that precedes all existence. The 256 Odu are the simulation parameters — the 256 fundamental patterns through which the OmniField generates specific reality fields.' },
              { type: 'highlight', text: 'IFA Simulation Theory: Reality = OmniField.simulate(256 Odu). Every situation, experience, and phenomenon is an instantiation of one or more Odu from the OmniField.' },
              { type: 'header', text: 'Implications for Education' },
              { type: 'paragraph', text: 'If reality is simulated from the OmniField via the 256 Odu, then the purpose of education is to give students access to all 256 simulation parameters — enabling them to read, navigate, and contribute to the simulation of reality.' },
              { type: 'list', items: ['OmniField = infinite unstructured knowledge', '256 Odu = knowledge field generators (simulation parameters)', 'Learning = activating new Odu within the student\'s consciousness field', 'Education = structured activation of the full 256-field knowledge space'] },
              { type: 'quote', text: 'The purpose of IFA education is not to fill an empty vessel — it is to activate the 256-field simulation already latent within every student\'s Ori.', attribution: 'IFA Model of Education' },
            ]
          },
          {
            id: 'ame2', type: 'text', title: 'The Odu Ifa Curriculum Architecture', duration: '14 min read',
            content: [
              { type: 'header', text: 'Designing Curriculum from the 256 Odu' },
              { type: 'paragraph', text: 'The Odu Ifa Model of Education provides a curriculum architecture unlike any other — organising knowledge not by conventional academic disciplines, but by the 256 Odu that generate those disciplines. Each curriculum unit corresponds to a specific Odu (or Odu cluster) in the 256-field knowledge space.' },
              { type: 'highlight', text: 'Odu-based curriculum design: every learning unit is derived from a specific Odu, ensuring the curriculum is grounded in IFABOK and covers the complete 256-field knowledge space.' },
              { type: 'list', items: ['16 Principal Odu = 16 core curriculum domains', '256 Full Odu = complete curriculum space', 'Each Odu-unit contains science, philosophy, art, and practice components', 'Learning progression = sequential Odu activation (Ogbe → Oyeku → … → Ofu)'] },
            ]
          },
          {
            id: 'ame3', type: 'video', title: 'IFA Simulation Theory in Education', duration: '~13 min',
            videoUrl: 'https://www.youtube.com/watch?v=5qap5aO4i9A',
            description: 'A deep exploration of IFA Simulation Theory and its application to educational design — creating curricula from the 256 Odu.'
          },
        ]
      },
      {
        id: 'ame_w2', order: 1, title: 'Week 2: The Polymathic Education Model',
        description: 'How Ifacodemy implements polymathic education using the IFA model.',
        materials: [
          {
            id: 'ame4', type: 'text', title: 'Polymathic Education — Beyond Specialisation', duration: '14 min read',
            content: [
              { type: 'header', text: 'The Case for Polymathic Education' },
              { type: 'paragraph', text: 'The IFA Model of Education is fundamentally polymathic — it trains students to master not one discipline but many, understanding the deep connections between all fields. This stands in deliberate contrast to the hyper-specialised education model dominant in the 20th century, which produced experts in narrow domains but not polymaths capable of synthesising across fields.' },
              { type: 'highlight', text: 'The polymath crisis: the world\'s greatest challenges require cross-disciplinary synthesis. IFA education produces the polymaths needed to address them.' },
              { type: 'list', items: ['Renaissance education: IFA as the original liberal arts curriculum', 'Odu integration: each lesson integrates science, art, philosophy, and practice', 'IGAs: the 8 graduate attributes ensure holistic development', 'Community of inquiry: Ubuntu-based collaborative learning environment'] },
            ]
          },
        ]
      },
      {
        id: 'ame_w3', order: 2, title: 'Week 3: Implementing the IFA Education Model',
        description: 'Practical implementation of IFA education principles in real teaching contexts.',
        materials: [
          {
            id: 'ame5', type: 'text', title: 'Implementing IFA Education — Practitioner\'s Guide', duration: '16 min read',
            content: [
              { type: 'header', text: 'From Theory to Practice: The IFA Education Practitioner' },
              { type: 'paragraph', text: 'The advanced practitioner of the IFA Model of Education is equipped to design, deliver, and evaluate Odu-based curricula — whether in formal schools, community learning spaces, corporate training environments, or digital platforms like Ifacodemy.' },
              { type: 'list', items: ['Curriculum mapping: identifying which Odu each lesson unit activates', 'Assessment design: measuring Odu activation across the 8 IGAs', 'Facilitation methods: Ubuntu-centred discussion, Ifa storytelling, binary pattern activities', 'Digital implementation: using the IFA Internet platforms as learning environments'] },
              { type: 'highlight', text: 'Practitioner certification standard: ability to design a complete 3-month IFA curriculum module from a single Odu, integrating all 5 STEAM domains and all 8 IGAs.' },
              { type: 'quote', text: 'The finest IFA teacher is also the finest IFA student — learning from every student, every lesson, every Odu activated in the room.', attribution: 'IFA Model of Education' },
            ]
          },
          {
            id: 'ame6', type: 'video', title: 'IFA Education in Practice — Curriculum Design Workshop', duration: '~12 min',
            videoUrl: 'https://www.youtube.com/watch?v=5qap5aO4i9A',
            description: 'A practical workshop on designing IFA-based curriculum units, assessing IGA development, and facilitating polymathic learning.'
          },
        ]
      },
    ]
  },
];

const SEED_PROGRESS = {
  u1: { completedMaterials: { m1: true, m2: true, m3: true, m4: true, m5: true } },
  u3: { completedMaterials: { k1: true, k2: true, k3: true } },
  u5: { completedMaterials: { m1: true, m2: true } },
};

const DEFAULT_DATA = { users: SEED_USERS, courses: SEED_COURSES, progress: SEED_PROGRESS };

// ─── CLASS CODE HANDLER ───────────────────────────────────────────────────────
// Each device has its own localStorage. The admin copies a single "class code"
// (encoding all student accounts) and shares it with the class once. Students
// paste it on the login screen to register all accounts on their device, then
// sign in normally with their username and password every time after that.

function applyClassCode(code) {
  try {
    const decoded = JSON.parse(decodeURIComponent(escape(atob(code.trim()))));
    if (!decoded || decoded.type !== 'ifacodemy-class' || !Array.isArray(decoded.students)) return false;
    const raw = localStorage.getItem(STORAGE_KEY);
    const state = raw ? JSON.parse(raw) : { users: DEFAULT_DATA.users.slice(), courses: DEFAULT_DATA.courses.slice(), progress: {} };
    if (!Array.isArray(state.users)) state.users = DEFAULT_DATA.users.slice();
    if (!state.progress || typeof state.progress !== 'object') state.progress = {};
    decoded.students.forEach(s => {
      if (!s.username || !s.password) return;
      const idx = state.users.findIndex(u => u.username === s.username);
      if (idx === -1) state.users.push(s);
      else state.users[idx] = { ...state.users[idx], ...s };
    });
    if (decoded.progress && typeof decoded.progress === 'object') {
      Object.entries(decoded.progress).forEach(([uid, uProg]) => {
        if (!state.progress[uid]) {
          state.progress[uid] = uProg;
        } else {
          const existingMats = (state.progress[uid] && state.progress[uid].completedMaterials) || {};
          const incomingMats = (uProg && uProg.completedMaterials) || {};
          state.progress[uid] = { ...state.progress[uid], ...uProg, completedMaterials: { ...existingMats, ...incomingMats } };
        }
      });
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    return true;
  } catch (e) { return false; }
}

// ─── ANNOUNCEMENTS ────────────────────────────────────────────────────────────

const ANNOUNCEMENTS = [
  { id: 'a1', type: 'new',     title: 'Week 3 IFA Mathematics materials now live',                          tag: 'New Content',   date: '2026-05-15' },
  { id: 'a2', type: 'info',    title: 'Ifacodemy Kids Programme open enrolment — June 2026',               tag: 'Announcement',  date: '2026-05-10' },
  { id: 'a3', type: 'notice',  title: 'Platform maintenance: 20 May 02:00–04:00 WAT',                      tag: 'Maintenance',   date: '2026-05-01' },
];

// ─── IGA ATTRIBUTES ───────────────────────────────────────────────────────────

const IGAs = [
  { id: 'polymath',          label: 'Polymath',                          color: '#f0920c', sym: '◈', desc: 'You are a curious learner who connects ideas and knowledge across many subjects and disciplines.' },
  { id: 'ubuntu',            label: 'Culturally Conscious (Ubuntu)',     color: '#00c87c', sym: '◎', desc: 'You respect culture and tradition, valuing interconnectedness, community, and shared humanity.' },
  { id: 'commercial',        label: 'Commercially Aware',                color: '#f5c518', sym: '🐚', desc: 'You understand how businesses create value, operate sustainably, and generate profit ethically.' },
  { id: 'enterprising',      label: 'Enterprising',                      color: '#8b5cf6', sym: '⚡', desc: 'You are self-motivated, resourceful, and proactive in turning ideas into action.' },
  { id: 'resilient',         label: 'Resilient',                         color: '#3b9eff', sym: '⊛', desc: 'You adapt to challenges, learn from failure, and recover with determination.' },
  { id: 'interdisciplinary', label: 'Interdisciplinary Collaborator',    color: '#e9498a', sym: '⬡', desc: 'You work across disciplines to collaborate with others, integrate knowledge, and solve complex problems.' },
  { id: 'global',            label: 'Globally & Socially Aware',         color: '#14b8d4', sym: '⊕', desc: 'You understand global, social, economic, and environmental interconnections.' },
  { id: 'growth',            label: 'Personal Growth & Development',     color: '#38e8a0', sym: '⟳', desc: 'You reflect, set goals, build skills, and continually improve yourself.' },
];

// ─── UTILITIES ────────────────────────────────────────────────────────────────

function toEmbedUrl(url) {
  const m = (url || '').match(/(?:v=|youtu\.be\/)([A-Za-z0-9_-]{11})/);
  return m ? `https://www.youtube.com/embed/${m[1]}` : url;
}

function fileIcon(fileType) {
  if (fileType === 'pdf')  return '📕';
  if (fileType === 'ppt')  return '📊';
  if (fileType === 'word') return '📝';
  return '📎';
}
function fileLabel(fileType) {
  if (fileType === 'pdf')  return 'PDF';
  if (fileType === 'ppt')  return 'PowerPoint';
  if (fileType === 'word') return 'Word Doc';
  return 'File';
}

function getCompletedMaterials(progress, userId) {
  return (progress[userId] && progress[userId].completedMaterials) || {};
}

function isWeekUnlocked(weekIndex, course, completedMats) {
  if (weekIndex === 0) return true;
  const prev = course.weeks[weekIndex - 1];
  return prev.materials.every(m => completedMats[m.id]);
}

function isWeekComplete(week, completedMats) {
  return week.materials.length > 0 && week.materials.every(m => completedMats[m.id]);
}

function getCourseProgress(course, completedMats) {
  const total = course.weeks.reduce((s, w) => s + w.materials.length, 0);
  if (total === 0) return 0;
  const done = course.weeks.reduce((s, w) => s + w.materials.filter(m => completedMats[m.id]).length, 0);
  return Math.round((done / total) * 100);
}

function getOverallProgress(courses, completedMats) {
  const total = courses.reduce((s, c) => s + c.weeks.reduce((ss, w) => ss + w.materials.length, 0), 0);
  if (total === 0) return 0;
  const done = courses.reduce((s, c) => s + c.weeks.reduce((ss, w) => ss + w.materials.filter(m => completedMats[m.id]).length, 0), 0);
  return Math.round((done / total) * 100);
}

function fmtDate(str) {
  if (!str) return '—';
  const d = new Date(str);
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

function genId() { return 'x' + Math.random().toString(36).slice(2, 9); }

// ─── BLOCK RENDERER ───────────────────────────────────────────────────────────

function BlockRenderer({ block }) {
  switch (block.type) {
    case 'header':    return <h3 className="blk-header">{block.text}</h3>;
    case 'paragraph': return <p className="blk-para">{block.text}</p>;
    case 'highlight': return <div className="blk-highlight"><span className="blk-highlight__icon">◈</span>{block.text}</div>;
    case 'list':      return <ul className="blk-list">{(block.items || []).map((it, i) => <li key={i}>{it}</li>)}</ul>;
    case 'quote':     return <blockquote className="blk-quote"><span className="blk-quote__text">"{block.text}"</span>{block.attribution && <cite className="blk-quote__attr">— {block.attribution}</cite>}</blockquote>;
    default:          return null;
  }
}

// ─── IGA RING (CIRCULAR PROGRESS) ────────────────────────────────────────────

function IgaRing({ score, color, size = 72 }) {
  const r = (size - 10) / 2;
  const circ = 2 * Math.PI * r;
  const fill = Math.max(0, (score / 100) * circ);
  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} className="iga-ring-svg">
      <circle cx={size / 2} cy={size / 2} r={r}
        fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="5" />
      <circle cx={size / 2} cy={size / 2} r={r}
        fill="none" stroke={color} strokeWidth="5" strokeLinecap="round"
        strokeDasharray={`${fill.toFixed(2)} ${(circ - fill).toFixed(2)}`}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ transition: 'stroke-dasharray 0.7s ease' }} />
    </svg>
  );
}

// ─── CONTINUE LEARNING CARD ───────────────────────────────────────────────────

function ContinueLearning({ courses, completedMats, setStudentView, setSelectedCourse, setSelectedMaterial }) {
  let found = null;
  for (const course of courses) {
    for (let wi = 0; wi < course.weeks.length; wi++) {
      if (!isWeekUnlocked(wi, course, completedMats)) continue;
      for (const mat of course.weeks[wi].materials) {
        if (!completedMats[mat.id]) {
          found = { course, week: course.weeks[wi], mat };
          break;
        }
      }
      if (found) break;
    }
    if (found) break;
  }

  if (!found) return (
    <div className="continue-card continue-card--complete">
      <span className="continue-card__done-sym">◈</span>
      <div>
        <div className="continue-card__done-title">All caught up!</div>
        <div className="continue-card__done-sub">Check with your administrator for new content.</div>
      </div>
    </div>
  );

  const weekLabel = found.week.title.replace(/^Week \d+:\s*/, '');
  return (
    <div className="continue-card" style={{ '--cc-color': found.course.color }}
      onClick={() => { setSelectedCourse(found.course.id); setSelectedMaterial(found.mat.id); setStudentView('material'); }}>
      <div className="continue-card__track" />
      <div className="continue-card__left">
        <div className="continue-card__eyebrow">Continue Learning</div>
        <h3 className="continue-card__title">{found.mat.title}</h3>
        <div className="continue-card__meta">
          <span className="continue-card__course">{found.course.title}</span>
          <span className="continue-card__sep">·</span>
          <span>{weekLabel}</span>
          <span className="continue-card__sep">·</span>
          <span>{found.mat.duration}</span>
        </div>
      </div>
      <div className="continue-card__right">
        <div className="continue-card__type-badge">
          {found.mat.type === 'video' ? '▶ Video' : found.mat.type === 'file' ? (fileIcon(found.mat.fileType) + ' ' + fileLabel(found.mat.fileType)) : '📖 Reading'}
        </div>
        <div className="continue-card__cta">Start →</div>
      </div>
      <div className="continue-card__glow" />
    </div>
  );
}

// ─── ANNOUNCEMENTS PANEL ─────────────────────────────────────────────────────

function AnnouncementsPanel() {
  return (
    <div className="notices-panel">
      <div className="notices-panel__head">
        <h3 className="s-section-title" style={{ margin: 0 }}>Academy Notices</h3>
        <span className="notices-panel__count">{ANNOUNCEMENTS.length}</span>
      </div>
      <div className="notice-list">
        {ANNOUNCEMENTS.map(a => (
          <div key={a.id} className={`notice notice--${a.type}`}>
            <div className="notice__dot" />
            <div className="notice__body">
              <span className={`notice__tag notice__tag--${a.type}`}>{a.tag}</span>
              <div className="notice__title">{a.title}</div>
            </div>
            <div className="notice__date">{fmtDate(a.date)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── LOGIN PAGE ───────────────────────────────────────────────────────────────

function LoginPage({ onLogin, loginError }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [classCode, setClassCode] = useState('');
  const [codeMsg, setCodeMsg] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin(username.trim(), password);
    }, 650);
  }

  function handleClassCode() {
    const ok = applyClassCode(classCode);
    if (!ok) { setCodeMsg('Invalid code. Ask your admin for the current class code.'); return; }
    setCodeMsg('✓ Accounts loaded! Signing you in…');
    setTimeout(() => window.location.reload(), 1200);
  }

  return (
    <div className="login-page">

      {/* ── Left brand panel ── */}
      <div className="lbp">
        <div className="lbp__bg">
          <div className="lbp__orb lbp__orb--a" />
          <div className="lbp__orb lbp__orb--b" />
          <div className="lbp__orb lbp__orb--c" />
          <div className="lbp__grid" />
        </div>
        <div className="lbp__content">
          <div className="lbp__brand">
            <img src="../src/assets/itoe_logo.png" alt="iTOE" className="lbp__logo" />
            <div>
              <div className="lbp__site">The IFA Internet</div>
              <div className="lbp__sub">Powered by IFABOK · CENProject</div>
            </div>
          </div>
          <div className="lbp__badge">IFA Academy of Polymaths</div>
          <h1 className="lbp__title">Ifacodemy</h1>
          <p className="lbp__tagline">
            The Learning Environment of the IFA Internet — polymathic education rooted in the 256 Odu Ifa.
          </p>
          <ul className="lbp__features">
            {[
              { sym: '◈', text: 'Polymathic Curriculum & IFABOK' },
              { sym: 'Ψ',  text: 'IFA Foundations, Mathematics & Philosophy' },
              { sym: '⊕',  text: 'Eboconomics & Energy Exchange' },
              { sym: '⬡',  text: 'IGA-based Graduate Attributes Tracker' },
              { sym: '◎',  text: 'Adults & Young Polymaths (Kids) Programmes' },
            ].map((f, i) => (
              <li key={i} className="lbp__feature">
                <span className="lbp__feature-sym">{f.sym}</span>
                <span>{f.text}</span>
              </li>
            ))}
          </ul>
          <div className="lbp__stats">
            <div className="lbp__stat"><div className="lbp__stat-val">256</div><div className="lbp__stat-lbl">Odu Ifa</div></div>
            <div className="lbp__stat"><div className="lbp__stat-val">8</div><div className="lbp__stat-lbl">IGAs</div></div>
            <div className="lbp__stat"><div className="lbp__stat-val">12</div><div className="lbp__stat-lbl">Courses</div></div>
          </div>
        </div>
      </div>

      {/* ── Right form panel ── */}
      <div className="login-panel">
        <div className="login-panel__bg">
          <div className="login-panel__orb login-panel__orb--a" />
          <div className="login-panel__orb login-panel__orb--b" />
          <div className="login-panel__grid" />
        </div>
        <div className="login-card">
          <div className="login-card__top">
            <img src="../src/assets/itoe_logo.png" alt="iTOE" className="login-logo" />
            <div className="login-brand">
              <div className="login-brand__site">The IFA Internet</div>
              <div className="login-brand__name">IfaLMS</div>
            </div>
          </div>
          <div className="login-card__head">
            <div className="login-card__badge">Sign in to continue</div>
            <h2 className="login-card__title">Welcome back</h2>
            <p className="login-card__sub">Enter your Ifacodemy credentials below</p>
          </div>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="login-field">
              <label className="login-label">Username</label>
              <input className="login-input" type="text" placeholder="Enter username"
                value={username} onChange={e => setUsername(e.target.value)} autoComplete="username" />
            </div>
            <div className="login-field">
              <label className="login-label">Password</label>
              <input className="login-input" type="password" placeholder="Enter password"
                value={password} onChange={e => setPassword(e.target.value)} autoComplete="current-password" />
            </div>
            {loginError && <div className="login-error">{loginError}</div>}
            <button className="login-btn" type="submit" disabled={loading || !username || !password}>
              {loading ? <span className="login-btn__spinner" /> : 'Sign In to Ifacodemy'}
            </button>
          </form>
          <div className="class-code-section">
            {!showCode
              ? <button type="button" className="class-code-toggle" onClick={() => setShowCode(true)}>
                  First time on this device? Enter class code
                </button>
              : <>
                  <label className="login-label" style={{ marginBottom: '0.35rem', display: 'block' }}>Class Code</label>
                  <textarea className="class-code-input"
                    placeholder="Paste the class code from your admin here…"
                    value={classCode} onChange={e => { setClassCode(e.target.value); setCodeMsg(''); }} />
                  {codeMsg && <div className={`class-code-msg${codeMsg.startsWith('✓') ? ' class-code-msg--ok' : ' class-code-msg--err'}`}>{codeMsg}</div>}
                  <div className="class-code-actions">
                    <button type="button" className="class-code-btn" onClick={handleClassCode} disabled={!classCode.trim()}>
                      Activate
                    </button>
                    <button type="button" className="class-code-cancel" onClick={() => { setShowCode(false); setClassCode(''); setCodeMsg(''); }}>
                      Cancel
                    </button>
                  </div>
                </>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── PENDING PAGE ─────────────────────────────────────────────────────────────

function PendingPage({ user, onLogout }) {
  return (
    <div className="pending-page">
      <div className="pending-card">
        <div className="pending-icon">⧖</div>
        <h2 className="pending-title">Access Pending</h2>
        <p className="pending-body">
          Welcome, <strong>{user.name}</strong>. Your account has been created and is awaiting admin approval.<br /><br />
          Once your enrolment and payment are confirmed, an administrator will activate your access. You will be able to sign in and begin your programme immediately after activation.
        </p>
        <div className="pending-info">
          <div className="pending-info__row"><span>Programme</span><span>{user.program === 'kids' ? 'Kids — Ifacodemy' : user.program === 'professionals' ? 'Professionals — Certification' : 'Adults — Polymaths'}</span></div>
          <div className="pending-info__row"><span>Joined</span><span>{fmtDate(user.joinDate)}</span></div>
          <div className="pending-info__row"><span>Status</span><span className="badge badge--pending">Pending Approval</span></div>
        </div>
        <button className="btn btn--ghost" onClick={onLogout}>Sign Out</button>
      </div>
    </div>
  );
}

// ─── MATERIAL VIEWER ──────────────────────────────────────────────────────────

function MaterialViewer({ material, isCompleted, onComplete, onBack }) {
  const [readPct, setReadPct] = useState(0);

  useEffect(() => {
    setReadPct(0);
    const el = document.querySelector('.app-main');
    if (!el) return;
    el.scrollTop = 0;
    function onScroll() {
      const max = el.scrollHeight - el.clientHeight;
      setReadPct(max > 0 ? Math.min(100, Math.round((el.scrollTop / max) * 100)) : 0);
    }
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [material.id]);

  function handleComplete() {
    onComplete(material.id);
  }

  return (
    <div className="material-viewer">
      {/* Reading progress bar */}
      <div className="read-progress">
        <div className="read-progress__fill" style={{ width: readPct + '%' }} />
      </div>

      <div className="material-viewer__bar">
        <button className="mv-back" onClick={onBack}>‹ Back to Week</button>
        <div className="mv-meta">
          <span className={`badge ${material.type === 'video' ? 'badge--video' : material.type === 'file' ? 'badge--file' : 'badge--text'}`}>
            {material.type === 'video' ? '▶ Video' : material.type === 'file' ? (fileIcon(material.fileType) + ' ' + fileLabel(material.fileType)) : '📄 Reading'}
          </span>
          <span className="mv-dur">{material.duration}</span>
          {material.type === 'text' && (
            <span className="mv-scroll-pct">{readPct}% read</span>
          )}
        </div>
      </div>

      <div className="material-viewer__body">
        <h2 className="mv-title">{material.title}</h2>

        {material.type === 'video' && (
          <div className="mv-video-wrap">
            <div className="mv-video-desc">{material.description}</div>
            <div className="mv-iframe-wrap">
              <iframe
                src={toEmbedUrl(material.videoUrl)}
                title={material.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="mv-iframe"
              />
            </div>
          </div>
        )}

        {material.type === 'text' && (
          <div className="mv-content">
            {(material.content || []).map((block, i) => (
              <BlockRenderer key={i} block={block} />
            ))}
          </div>
        )}

        {material.type === 'file' && (
          <div className="mv-file-wrap">
            {material.description && (
              <div className="mv-video-desc">{material.description}</div>
            )}
            <div className="mv-file-card">
              <div className="mv-file-card__icon">{fileIcon(material.fileType)}</div>
              <div className="mv-file-card__info">
                <div className="mv-file-card__name">{material.title}</div>
                <div className="mv-file-card__type">{fileLabel(material.fileType)}</div>
              </div>
              <a className="btn btn--primary" href={material.fileUrl} target="_blank" rel="noopener noreferrer">
                Open / Download
              </a>
            </div>
          </div>
        )}

        <div className="mv-footer">
          {isCompleted ? (
            <div className="mv-done">
              <span className="mv-done__icon">✓</span>
              Completed
            </div>
          ) : (
            <button className="btn btn--primary btn--lg" onClick={handleComplete}>
              Mark as Complete ✓
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── MOBILE BOTTOM NAV ────────────────────────────────────────────────────────

function MobileStudentNav({ activeView, setStudentView, onLogout }) {
  const nav = [
    { id: 'home',    label: 'Home',    sym: '⌂' },
    { id: 'courses', label: 'Courses', sym: '◈' },
    { id: 'iga',     label: 'IGA',     sym: '⬡' },
    { id: 'profile', label: 'Profile', sym: '◉' },
  ];
  return (
    <nav className="mobile-nav">
      {nav.map(n => (
        <button key={n.id}
          className={`mobile-nav__item${activeView === n.id ? ' mobile-nav__item--active' : ''}`}
          onClick={() => setStudentView(n.id)}>
          <span className="mobile-nav__sym">{n.sym}</span>
          <span className="mobile-nav__label">{n.label}</span>
        </button>
      ))}
      <button className="mobile-nav__item" onClick={onLogout}>
        <span className="mobile-nav__sym">⏻</span>
        <span className="mobile-nav__label">Sign out</span>
      </button>
    </nav>
  );
}

function MobileAdminNav({ activeView, setAdminView, onLogout, pendingCount }) {
  const nav = [
    { id: 'overview',  label: 'Overview', sym: '◈' },
    { id: 'students',  label: 'Students', sym: '◯' },
    { id: 'courses',   label: 'Courses',  sym: '⬡' },
    { id: 'analytics', label: 'Stats',    sym: '∿' },
    { id: 'settings',  label: 'Settings', sym: '⚙' },
  ];
  return (
    <nav className="mobile-nav mobile-nav--admin">
      {nav.map(n => (
        <button key={n.id}
          className={`mobile-nav__item${activeView === n.id ? ' mobile-nav__item--active mobile-nav__item--admin-active' : ''}`}
          onClick={() => setAdminView(n.id)}>
          <span className="mobile-nav__sym">{n.sym}</span>
          <span className="mobile-nav__label">{n.label}</span>
          {n.id === 'students' && pendingCount > 0 && (
            <span className="mobile-nav__badge">{pendingCount}</span>
          )}
        </button>
      ))}
      <button className="mobile-nav__item" onClick={onLogout}>
        <span className="mobile-nav__sym">⏻</span>
        <span className="mobile-nav__label">Sign out</span>
      </button>
    </nav>
  );
}

// ─── STUDENT SIDEBAR ──────────────────────────────────────────────────────────

function StudentSidebar({ activeView, setStudentView, user, onLogout }) {
  const nav = [
    { id: 'home',    label: 'Dashboard',   sym: '⌂' },
    { id: 'courses', label: 'My Courses',  sym: '◈' },
    { id: 'iga',     label: 'IGA Tracker', sym: '⬡' },
    { id: 'profile', label: 'Profile',     sym: '◉' },
  ];
  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <img src="../src/assets/itoe_logo.png" alt="iTOE" className="sidebar__logo" />
        <div>
          <div className="sidebar__site">IfaLMS</div>
          <div className="sidebar__sub">Ifacodemy</div>
        </div>
      </div>
      <nav className="sidebar__nav">
        {nav.map(n => (
          <button key={n.id}
            className={`sidebar__item${activeView === n.id ? ' sidebar__item--active' : ''}`}
            onClick={() => setStudentView(n.id)}>
            <span className="sidebar__sym">{n.sym}</span>
            <span>{n.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar__platforms">
        <div className="sidebar__platforms-label">IFA Platforms</div>
        <a className="sidebar__platform-link"
           href="https://www.playifagames.org" target="_blank" rel="noopener noreferrer">
          <span className="sidebar__platform-sym">⬡</span>
          <span>Ifa Game</span>
          <span className="sidebar__platform-ext">↗</span>
        </a>
        <a className="sidebar__platform-link"
           href={user.program === 'kids' ? 'https://ifainternet.org/ifa-periodic-table/kids/' : 'https://ifainternet.org/ifa-periodic-table/'}
           target="_blank" rel="noopener noreferrer">
          <span className="sidebar__platform-sym">◎</span>
          <span>Ifa Periodic Table</span>
          <span className="sidebar__platform-ext">↗</span>
        </a>
      </div>

      <div className="sidebar__user">
        <div className="sidebar__avatar">{user.name.charAt(0)}</div>
        <div className="sidebar__info">
          <div className="sidebar__name">{user.name}</div>
          <div className="sidebar__prog">{user.program === 'kids' ? 'Kids Programme' : user.program === 'professionals' ? 'Professionals Programme' : 'Adults Programme'}</div>
        </div>
        <button className="sidebar__logout" onClick={onLogout} title="Sign out">⏻</button>
      </div>
    </aside>
  );
}

// ─── STUDENT HOME ─────────────────────────────────────────────────────────────

function StudentHome({ user, courses, completedMats, setStudentView, setSelectedCourse, setSelectedMaterial }) {
  const enrolled = courses.filter(c => (user.enrolled || []).includes(c.id));
  const overall = getOverallProgress(enrolled, completedMats);

  return (
    <div className="s-home">
      {/* Greeting */}
      <div className="s-home__greeting">
        <div>
          <h2 className="s-home__title">
            Welcome back, <span className="accent--amber">{user.name.split(' ')[0]}</span>
          </h2>
          <p className="s-home__sub">Continue your polymathic journey through the IFA Body of Knowledge.</p>
        </div>
        <div className="s-home__badge">
          <div className="s-home__pct">{overall}%</div>
          <div className="s-home__pct-label">Overall</div>
        </div>
      </div>

      {/* Continue Learning */}
      {enrolled.length > 0 && (
        <ContinueLearning
          courses={enrolled}
          completedMats={completedMats}
          setStudentView={setStudentView}
          setSelectedCourse={setSelectedCourse}
          setSelectedMaterial={setSelectedMaterial}
        />
      )}

      {/* Course Cards */}
      <h3 className="s-section-title">Your Courses</h3>
      {enrolled.length === 0 ? (
        <div className="empty-state">No courses enrolled yet. Contact your administrator.</div>
      ) : (
        <div className="course-cards">
          {enrolled.map(c => {
            const pct = getCourseProgress(c, completedMats);
            const doneWeeks = c.weeks.filter(w => isWeekComplete(w, completedMats)).length;
            return (
              <div key={c.id} className="course-card" style={{ '--cc-color': c.color }}
                onClick={() => { setSelectedCourse(c.id); setStudentView('course'); }}>
                <div className="course-card__top">
                  <span className="course-card__sym">{c.sym}</span>
                  <div className="course-card__badges">
                    <span className={`badge ${c.program === 'kids' ? 'badge--kids' : c.program === 'professionals' ? 'badge--professionals' : 'badge--adults'}`}>
                      {c.program === 'kids' ? 'Kids' : c.program === 'professionals' ? 'Professionals' : 'Adults'}
                    </span>
                    {c.level && <span className="badge badge--level">{c.level}</span>}
                  </div>
                </div>
                <h4 className="course-card__title">{c.title}</h4>
                <p className="course-card__sub">{c.subtitle}</p>
                {c.price && <div className="course-card__price">{c.price}</div>}
                <div className="progress-bar">
                  <div className="progress-bar__fill" style={{ width: pct + '%', background: c.color }} />
                </div>
                <div className="course-card__footer">
                  <span>{pct}% complete</span>
                  <span>⏱ {c.duration || c.weeks.length + ' wks'}</span>
                </div>
                <div className="course-card__glow" />
              </div>
            );
          })}
        </div>
      )}

      {/* IGA Mini Grid */}
      <h3 className="s-section-title" style={{ marginTop: '2rem' }}>IGA Progress</h3>
      <div className="iga-mini-grid">
        {IGAs.map((iga, i) => {
          const score = Math.min(100, Math.round(overall * (0.8 + (i % 3) * 0.1)));
          return (
            <div key={iga.id} className="iga-mini" style={{ '--ig-color': iga.color }}>
              <div className="iga-mini__top">
                <IgaRing score={score} color={iga.color} size={44} />
                <div className="iga-mini__info">
                  <div className="iga-mini__sym">{iga.sym}</div>
                  <div className="iga-mini__label">{iga.label}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Announcements */}
      <AnnouncementsPanel />
    </div>
  );
}

// ─── STUDENT COURSES LIST ─────────────────────────────────────────────────────

function StudentCourseList({ user, courses, completedMats, setStudentView, setSelectedCourse }) {
  const [filter, setFilter] = useState('all');
  const enrolled = courses.filter(c => (user.enrolled || []).includes(c.id));
  const filtered = filter === 'all' ? enrolled : enrolled.filter(c => c.program === filter);

  return (
    <div className="s-courses">
      <div className="s-courses__header">
        <h2 className="s-page-title">My Courses</h2>
        <div className="filter-tabs">
          {['all', 'adults', 'professionals', 'kids'].map(f => (
            <button key={f} className={`filter-tab${filter === f ? ' filter-tab--active' : ''}`}
              onClick={() => setFilter(f)}>
              {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">No courses found for this filter.</div>
      ) : (
        <div className="course-list">
          {filtered.map(c => {
            const pct = getCourseProgress(c, completedMats);
            const doneWeeks = c.weeks.filter(w => isWeekComplete(w, completedMats)).length;
            return (
              <div key={c.id} className="course-row" style={{ '--cc-color': c.color }}
                onClick={() => { setSelectedCourse(c.id); setStudentView('course'); }}>
                <div className="course-row__sym">{c.sym}</div>
                <div className="course-row__info">
                  <div className="course-row__title">{c.title}</div>
                  <div className="course-row__sub">{c.subtitle}</div>
                  <div className="progress-bar course-row__bar">
                    <div className="progress-bar__fill" style={{ width: pct + '%', background: c.color }} />
                  </div>
                </div>
                <div className="course-row__meta">
                  <div className="course-row__pct">{pct}%</div>
                  <div className="course-row__weeks">⏱ {c.duration || c.weeks.length + ' wks'}</div>
                  <span className={`badge ${c.program === 'kids' ? 'badge--kids' : c.program === 'professionals' ? 'badge--professionals' : 'badge--adults'}`}>
                    {c.program === 'kids' ? 'Kids' : c.program === 'professionals' ? 'Professionals' : 'Adults'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── STUDENT COURSE DETAIL ────────────────────────────────────────────────────

function StudentCourseDetail({ course, completedMats, setStudentView, setSelectedWeek, setSelectedMaterial, onBack }) {
  const [openWeek, setOpenWeek] = useState(null);
  const pct = getCourseProgress(course, completedMats);

  return (
    <div className="s-course-detail">
      <button className="back-btn" onClick={onBack}>‹ My Courses</button>
      <div className="s-course-detail__header" style={{ '--cc-color': course.color }}>
        <div className="s-course-detail__sym">{course.sym}</div>
        <div>
          <h2 className="s-course-detail__title">{course.title}</h2>
          <p className="s-course-detail__sub">{course.subtitle}</p>
          {(course.level || course.duration || course.price) && (
            <div className="s-course-detail__meta">
              {course.level    && <span className="course-meta-tag course-meta-tag--level">{course.level}</span>}
              {course.duration && <span className="course-meta-tag course-meta-tag--dur">⏱ {course.duration}</span>}
              {course.price    && <span className="course-meta-tag course-meta-tag--price">{course.price}</span>}
            </div>
          )}
          <p className="s-course-detail__desc">{course.description}</p>
          {course.priceNote && <p className="s-course-detail__price-note">{course.priceNote}</p>}
        </div>
        <div className="s-course-detail__pct">
          <svg viewBox="0 0 36 36" className="circle-chart">
            <circle className="circle-chart__bg" cx="18" cy="18" r="15.9" />
            <circle className="circle-chart__fill" cx="18" cy="18" r="15.9"
              style={{ stroke: course.color, strokeDasharray: `${pct} ${100 - pct}` }} />
          </svg>
          <span className="circle-chart__label">{pct}%</span>
        </div>
      </div>

      <div className="week-list">
        {course.weeks.map((week, idx) => {
          const unlocked = isWeekUnlocked(idx, course, completedMats);
          const complete = isWeekComplete(week, completedMats);
          const isOpen = openWeek === week.id;

          return (
            <div key={week.id} className={`week-item${!unlocked ? ' week-item--locked' : ''}${complete ? ' week-item--done' : ''}`}>
              <div className="week-item__head" onClick={() => unlocked && setOpenWeek(isOpen ? null : week.id)}>
                <div className="week-item__left">
                  <div className="week-item__num" style={{ background: unlocked ? course.color : undefined }}>
                    {complete ? '✓' : !unlocked ? '🔒' : idx + 1}
                  </div>
                  <div>
                    <div className="week-item__title">{week.title}</div>
                    <div className="week-item__desc">{week.description}</div>
                  </div>
                </div>
                <div className="week-item__right">
                  <span className="week-item__count">{week.materials.length} item{week.materials.length !== 1 ? 's' : ''}</span>
                  {unlocked && <span className="week-item__toggle">{isOpen ? '▲' : '▼'}</span>}
                  {!unlocked && <span className="week-item__lock-label">Complete previous week to unlock</span>}
                </div>
              </div>

              {isOpen && unlocked && (
                <div className="week-item__materials">
                  {week.materials.map(mat => {
                    const done = !!completedMats[mat.id];
                    return (
                      <div key={mat.id} className={`material-row${done ? ' material-row--done' : ''}`}
                        onClick={() => { setSelectedMaterial(mat.id); setStudentView('material'); }}>
                        <div className="material-row__type">
                          {mat.type === 'video' ? '▶' : mat.type === 'file' ? fileIcon(mat.fileType) : '📄'}
                        </div>
                        <div className="material-row__info">
                          <div className="material-row__title">{mat.title}</div>
                          <div className="material-row__dur">{mat.duration}</div>
                        </div>
                        <div className="material-row__status">
                          {done ? <span className="done-badge">✓ Done</span> : <span className="start-badge">Start →</span>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── IGA TRACKER ─────────────────────────────────────────────────────────────

function IGATracker({ courses, completedMats, user }) {
  const enrolled = courses.filter(c => (user.enrolled || []).includes(c.id));
  const overall = getOverallProgress(enrolled, completedMats);

  return (
    <div className="iga-tracker">
      <h2 className="s-page-title">IGA Tracker</h2>
      <p className="iga-tracker__sub">
        The Ifacodemy Graduate Attributes (IGAs) — eight core attributes of the IFA Academy of Polymaths graduate, rooted in the Ọmọlúwàbí ideal.
      </p>
      <div className="iga-grid">
        {IGAs.map((iga, i) => {
          const score = Math.min(100, Math.round(overall * (0.75 + (i % 3) * 0.1)));
          return (
            <div key={iga.id} className="iga-card" style={{ '--ig-color': iga.color }}>
              <div className="iga-card__top">
                <div className="iga-card__ring-wrap">
                  <IgaRing score={score} color={iga.color} size={72} />
                  <span className="iga-card__ring-pct">{score}%</span>
                </div>
                <span className="iga-card__sym">{iga.sym}</span>
              </div>
              <h4 className="iga-card__name">{iga.label}</h4>
              <p className="iga-card__desc">{iga.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── STUDENT PROFILE ──────────────────────────────────────────────────────────

function StudentProfile({ user, courses, completedMats }) {
  const enrolled = courses.filter(c => (user.enrolled || []).includes(c.id));
  const overall = getOverallProgress(enrolled, completedMats);
  const totalDone = Object.keys(completedMats).length;
  const [showSync, setShowSync] = useState(false);
  const [syncCode, setSyncCode] = useState('');
  const [syncMsg,  setSyncMsg]  = useState('');

  function handleSync() {
    const ok = applyClassCode(syncCode);
    if (!ok) { setSyncMsg('Invalid code. Ask your admin for the latest class code.'); return; }
    setSyncMsg('✓ Data synced! Reloading…');
    setTimeout(() => window.location.reload(), 1200);
  }

  return (
    <div className="s-profile">
      <h2 className="s-page-title">My Profile</h2>
      <div className="profile-card">
        <div className="profile-avatar">{user.name.charAt(0)}</div>
        <h3 className="profile-name">{user.name}</h3>
        <div className="profile-role">{user.program === 'kids' ? 'Kids — Ifacodemy' : user.program === 'professionals' ? 'Professionals — IFA Certification' : 'Adults — IFA Academy of Polymaths'}</div>
        <div className="profile-stats">
          <div className="profile-stat"><div className="profile-stat__val">{overall}%</div><div className="profile-stat__label">Overall Progress</div></div>
          <div className="profile-stat"><div className="profile-stat__val">{enrolled.length}</div><div className="profile-stat__label">Courses Enrolled</div></div>
          <div className="profile-stat"><div className="profile-stat__val">{totalDone}</div><div className="profile-stat__label">Materials Completed</div></div>
        </div>
        <div className="profile-info">
          <div className="profile-info__row"><span>Username</span><span>{user.username}</span></div>
          <div className="profile-info__row"><span>Programme</span><span>{user.program === 'kids' ? 'Young Polymaths (Kids)' : user.program === 'professionals' ? 'Professionals Certification' : 'Adult Polymaths'}</span></div>
          <div className="profile-info__row"><span>Joined</span><span>{fmtDate(user.joinDate)}</span></div>
          <div className="profile-info__row"><span>Status</span><span className="badge badge--approved">Active</span></div>
        </div>
      </div>

      <div className="sync-card">
        <div className="sync-card__header" onClick={() => { setShowSync(v => !v); setSyncCode(''); setSyncMsg(''); }}>
          <span className="sync-card__title">↻ Sync My Data</span>
          <span className="sync-card__hint">Got a new class code from your admin? Paste it here to update your courses and progress on this device.</span>
          <span className="sync-card__chevron">{showSync ? '▲' : '▼'}</span>
        </div>
        {showSync && (
          <div className="sync-card__body">
            <textarea
              className="class-code-input"
              placeholder="Paste the class code from your admin here…"
              value={syncCode}
              onChange={e => { setSyncCode(e.target.value); setSyncMsg(''); }}
            />
            {syncMsg && (
              <div className={`class-code-msg ${syncMsg.startsWith('✓') ? 'class-code-msg--ok' : 'class-code-msg--err'}`}>
                {syncMsg}
              </div>
            )}
            <div className="class-code-actions">
              <button className="class-code-btn" onClick={handleSync} disabled={!syncCode.trim()}>Sync Now</button>
              <button className="class-code-cancel" onClick={() => { setShowSync(false); setSyncCode(''); setSyncMsg(''); }}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── STUDENT APP ──────────────────────────────────────────────────────────────

function StudentApp({ user, onLogout, courses, setCourses, progress, setProgress, saveAll }) {
  const [studentView, setStudentView] = useState('home');
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [selectedMaterialId, setSelectedMaterialId] = useState(null);

  const completedMats = getCompletedMaterials(progress, user.id);
  const selectedCourse = courses.find(c => c.id === selectedCourseId) || null;
  const selectedMaterial = selectedCourse
    ? selectedCourse.weeks.flatMap(w => w.materials).find(m => m.id === selectedMaterialId)
    : null;

  function markComplete(matId) {
    const newProgress = {
      ...progress,
      [user.id]: { ...progress[user.id], completedMaterials: { ...completedMats, [matId]: true } }
    };
    setProgress(newProgress);
    saveAll(null, null, newProgress);
  }

  function navTo(v) { setStudentView(v); setSelectedCourseId(null); setSelectedMaterialId(null); }

  return (
    <div className="app-shell">
      <StudentSidebar activeView={studentView} setStudentView={navTo} user={user} onLogout={onLogout} />
      <main className="app-main">
        {studentView === 'home' && (
          <StudentHome user={user} courses={courses} completedMats={completedMats}
            setStudentView={setStudentView}
            setSelectedCourse={setSelectedCourseId}
            setSelectedMaterial={setSelectedMaterialId} />
        )}
        {studentView === 'courses' && !selectedCourseId && (
          <StudentCourseList user={user} courses={courses} completedMats={completedMats}
            setStudentView={setStudentView} setSelectedCourse={setSelectedCourseId} />
        )}
        {studentView === 'course' && selectedCourse && !selectedMaterialId && (
          <StudentCourseDetail course={selectedCourse} completedMats={completedMats}
            setStudentView={setStudentView} setSelectedWeek={() => {}} setSelectedMaterial={setSelectedMaterialId}
            onBack={() => { setSelectedCourseId(null); setStudentView('courses'); }} />
        )}
        {studentView === 'material' && selectedMaterial && (
          <MaterialViewer material={selectedMaterial}
            isCompleted={!!completedMats[selectedMaterial.id]}
            onComplete={markComplete}
            onBack={() => { setSelectedMaterialId(null); setStudentView('course'); }} />
        )}
        {studentView === 'iga' && (
          <IGATracker courses={courses} completedMats={completedMats} user={user} />
        )}
        {studentView === 'profile' && (
          <StudentProfile user={user} courses={courses} completedMats={completedMats} />
        )}
      </main>
      <MobileStudentNav activeView={studentView} setStudentView={navTo} onLogout={onLogout} />
    </div>
  );
}

// ─── ADMIN SIDEBAR ────────────────────────────────────────────────────────────

function AdminSidebar({ activeView, setAdminView, onLogout, pendingCount }) {
  const nav = [
    { id: 'overview',  label: 'Overview',  sym: '◈' },
    { id: 'students',  label: 'Students',  sym: '◯' },
    { id: 'courses',   label: 'Courses',   sym: '⬡' },
    { id: 'analytics', label: 'Analytics', sym: '∿' },
    { id: 'settings',  label: 'Settings',  sym: '⚙' },
  ];
  return (
    <aside className="sidebar sidebar--admin">
      <div className="sidebar__brand">
        <img src="../src/assets/itoe_logo.png" alt="iTOE" className="sidebar__logo" />
        <div>
          <div className="sidebar__site">IfaLMS</div>
          <div className="sidebar__sub">Admin Panel</div>
        </div>
      </div>
      <nav className="sidebar__nav">
        {nav.map(n => (
          <button key={n.id}
            className={`sidebar__item${activeView === n.id ? ' sidebar__item--active sidebar__item--admin-active' : ''}`}
            onClick={() => setAdminView(n.id)}>
            <span className="sidebar__sym">{n.sym}</span>
            <span>{n.label}</span>
            {n.id === 'students' && pendingCount > 0 && (
              <span className="sidebar__badge">{pendingCount}</span>
            )}
          </button>
        ))}
      </nav>

      <div className="sidebar__platforms">
        <div className="sidebar__platforms-label">IFA Platforms</div>
        <a className="sidebar__platform-link"
           href="https://www.playifagames.org" target="_blank" rel="noopener noreferrer">
          <span className="sidebar__platform-sym">⬡</span>
          <span>Ifa Game</span>
          <span className="sidebar__platform-ext">↗</span>
        </a>
        <a className="sidebar__platform-link"
           href="https://ifainternet.org/ifa-periodic-table/" target="_blank" rel="noopener noreferrer">
          <span className="sidebar__platform-sym">◎</span>
          <span>Ifa Periodic Table</span>
          <span className="sidebar__platform-ext">↗</span>
        </a>
      </div>

      <div className="sidebar__user">
        <div className="sidebar__avatar sidebar__avatar--admin">A</div>
        <div className="sidebar__info">
          <div className="sidebar__name">Admin</div>
          <div className="sidebar__prog">IFA Academy</div>
        </div>
        <button className="sidebar__logout" onClick={onLogout} title="Sign out">⏻</button>
      </div>
    </aside>
  );
}

// ─── ADMIN OVERVIEW ───────────────────────────────────────────────────────────

function AdminOverview({ users, courses }) {
  const students = users.filter(u => u.role === 'student');
  const approved = students.filter(u => u.status === 'approved');
  const pending = students.filter(u => u.status === 'pending');
  const totalMats = courses.reduce((s, c) => s + c.weeks.reduce((ss, w) => ss + w.materials.length, 0), 0);

  const stats = [
    { label: 'Total Students',   value: students.length, color: '#f0920c', sym: '◯' },
    { label: 'Active Students',  value: approved.length, color: '#00c87c', sym: '✓' },
    { label: 'Pending Approval', value: pending.length,  color: '#f5c518', sym: '⧖' },
    { label: 'Total Courses',    value: courses.length,  color: '#8b5cf6', sym: '⬡' },
    { label: 'Total Materials',  value: totalMats,       color: '#3b9eff', sym: '◈' },
    { label: 'Programmes',       value: 3,               color: '#e9498a', sym: '⊕' },
  ];

  return (
    <div className="admin-overview">
      <div className="admin-page-header">
        <h2 className="admin-page-title">Overview</h2>
        <span className="admin-page-sub">IFA Academy of Polymaths — Dashboard</span>
      </div>
      <div className="stat-grid">
        {stats.map((s, i) => (
          <div key={i} className="stat-card" style={{ '--sc-color': s.color }}>
            <div className="stat-card__accent" />
            <div className="stat-card__sym">{s.sym}</div>
            <div className="stat-card__val">{s.value}</div>
            <div className="stat-card__label">{s.label}</div>
            <div className="stat-card__glow" />
          </div>
        ))}
      </div>

      <div className="admin-overview__sections">
        <div className="admin-panel">
          <h3 className="admin-panel__title">Recent Pending Students</h3>
          {pending.length === 0 ? <div className="empty-state">No pending approvals</div> : (
            <div className="mini-table">
              {pending.map(s => (
                <div key={s.id} className="mini-table__row">
                  <div className="mini-table__name">{s.name}</div>
                  <div className="mini-table__meta">{s.program === 'kids' ? 'Kids' : s.program === 'professionals' ? 'Professionals' : 'Adults'} · Joined {fmtDate(s.joinDate)}</div>
                  <span className="badge badge--pending">Pending</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="admin-panel">
          <h3 className="admin-panel__title">Courses Overview</h3>
          <div className="mini-table">
            {courses.map(c => (
              <div key={c.id} className="mini-table__row" style={{ '--cc-color': c.color }}>
                <div className="mini-table__sym">{c.sym}</div>
                <div className="mini-table__name">{c.title}</div>
                <div className="mini-table__meta">{c.weeks.length} weeks · {c.program}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── ADMIN STUDENTS ───────────────────────────────────────────────────────────

function AdminStudents({ users, setUsers, saveAll, courses, progress, setProgress }) {
  const [filter, setFilter] = useState('all');
  const [showAdd, setShowAdd] = useState(false);
  const [addForm, setAddForm] = useState({ name: '', username: '', password: '', program: 'adults' });
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState(null);
  const [codeCopied, setCodeCopied] = useState(false);
  const editPanelRef = useRef(null);

  useEffect(() => {
    if (editingId && editPanelRef.current) {
      editPanelRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [editingId]);

  function copyClassCode() {
    const studentList = users.filter(u => u.role === 'student');
    const studentProgress = {};
    studentList.forEach(s => { if (progress[s.id]) studentProgress[s.id] = progress[s.id]; });
    const payload = JSON.stringify({
      type: 'ifacodemy-class',
      students: studentList.map(s => ({
        id: s.id, username: s.username, password: s.password || '',
        name: s.name, role: 'student', status: s.status,
        program: s.program || 'adults', joinDate: s.joinDate || '',
        enrolled: s.enrolled || []
      })),
      progress: studentProgress
    });
    const code = btoa(unescape(encodeURIComponent(payload)));
    function fallback() {
      const el = document.createElement('textarea');
      el.value = code; el.style.position = 'fixed'; el.style.opacity = '0';
      document.body.appendChild(el); el.select();
      try { document.execCommand('copy'); } catch (_) {}
      document.body.removeChild(el);
    }
    if (navigator.clipboard) navigator.clipboard.writeText(code).catch(fallback);
    else fallback();
    setCodeCopied(true);
    setTimeout(() => setCodeCopied(false), 2500);
  }

  const students = users.filter(u => u.role === 'student');
  const filtered = filter === 'all' ? students
    : filter === 'pending' ? students.filter(u => u.status === 'pending')
    : students.filter(u => u.status === 'approved');

  function approve(id) {
    const updated = users.map(u => u.id === id ? { ...u, status: 'approved', enrolled: u.enrolled && u.enrolled.length > 0 ? u.enrolled : ['c1'] } : u);
    setUsers(updated); saveAll(updated);
  }
  function revoke(id) {
    const updated = users.map(u => u.id === id ? { ...u, status: 'pending' } : u);
    setUsers(updated); saveAll(updated);
  }
  function remove(id) {
    if (!confirm('Remove this student? This cannot be undone.')) return;
    const updated = users.filter(u => u.id !== id);
    setUsers(updated); saveAll(updated);
  }
  function toggleCourse(userId, courseId) {
    const updated = users.map(u => {
      if (u.id !== userId) return u;
      const enrolled = u.enrolled || [];
      return { ...u, enrolled: enrolled.includes(courseId) ? enrolled.filter(id => id !== courseId) : [...enrolled, courseId] };
    });
    setUsers(updated); saveAll(updated);
  }
  function addStudent() {
    const { name, username, password, program } = addForm;
    if (!name.trim() || !username.trim() || !password.trim()) return;
    const newUser = {
      id: genId(), role: 'student', status: 'pending', enrolled: [],
      joinDate: new Date().toISOString().slice(0, 10),
      name: name.trim(), username: username.trim(), password: password.trim(), program,
    };
    const updated = [...users, newUser];
    setUsers(updated); saveAll(updated);
    setShowAdd(false);
    setAddForm({ name: '', username: '', password: '', program: 'adults' });
  }
  function startEdit(s) {
    setEditingId(s.id);
    setEditForm({ name: s.name, username: s.username, password: s.password || '', program: s.program || 'adults', joinDate: s.joinDate || '', status: s.status, enrolled: s.enrolled || [] });
  }
  function cancelEdit() { setEditingId(null); setEditForm(null); }
  function saveEdit() {
    if (!editForm.name.trim() || !editForm.username.trim()) return;
    const updated = users.map(u => u.id !== editingId ? u : {
      ...u,
      name: editForm.name.trim(),
      username: editForm.username.trim(),
      ...(editForm.password.trim() ? { password: editForm.password.trim() } : {}),
      program: editForm.program,
      joinDate: editForm.joinDate,
      status: editForm.status,
      enrolled: editForm.enrolled,
    });
    setUsers(updated); saveAll(updated);
    setEditingId(null); setEditForm(null);
  }
  function toggleEditCourse(courseId) {
    setEditForm(f => {
      const enrolled = f.enrolled || [];
      return { ...f, enrolled: enrolled.includes(courseId) ? enrolled.filter(id => id !== courseId) : [...enrolled, courseId] };
    });
  }
  function resetStudentProgress(userId) {
    if (!confirm('Reset this student\'s course progress and IGA trackers to 0%? This cannot be undone.')) return;
    const newProgress = { ...progress };
    delete newProgress[userId];
    setProgress(newProgress);
  }
  function resetAllProgress() {
    if (!confirm('Reset ALL students\' course progress and IGA trackers to 0%? This cannot be undone.')) return;
    setProgress({});
  }

  return (
    <div className="admin-students">
      <div className="admin-page-header">
        <h2 className="admin-page-title">Students</h2>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <div className="filter-tabs">
            {[['all', 'All'], ['approved', 'Active'], ['pending', 'Pending']].map(([val, lbl]) => (
              <button key={val} className={`filter-tab${filter === val ? ' filter-tab--active' : ''}`}
                onClick={() => setFilter(val)}>{lbl}</button>
            ))}
          </div>
          <button className="btn btn--primary" onClick={() => setShowAdd(v => !v)}>
            {showAdd ? '✕ Cancel' : '+ Add Student'}
          </button>
          <button className={`btn${codeCopied ? ' btn--copied' : ' btn--code'}`} onClick={copyClassCode}
            title="Copy a single class code encoding all student accounts — share it with your class once">
            {codeCopied ? '✓ Class Code Copied' : '⬡ Copy Class Code'}
          </button>
          <button className="btn btn--danger" onClick={resetAllProgress} title="Reset all students' progress and IGA trackers to 0%">
            Reset All Progress
          </button>
        </div>
      </div>

      {showAdd && (
        <div className="add-student-form">
          <div className="add-student-form__field">
            <label className="add-student-form__label">Full Name</label>
            <input className="editor-input" placeholder="e.g. Ade Okafor"
              value={addForm.name} onChange={e => setAddForm({ ...addForm, name: e.target.value })} />
          </div>
          <div className="add-student-form__field">
            <label className="add-student-form__label">Username</label>
            <input className="editor-input" placeholder="e.g. ade123"
              value={addForm.username} onChange={e => setAddForm({ ...addForm, username: e.target.value })} />
          </div>
          <div className="add-student-form__field">
            <label className="add-student-form__label">Password</label>
            <input className="editor-input" type="password" placeholder="Initial password"
              value={addForm.password} onChange={e => setAddForm({ ...addForm, password: e.target.value })} />
          </div>
          <div className="add-student-form__field">
            <label className="add-student-form__label">Programme</label>
            <select className="editor-input" value={addForm.program} onChange={e => setAddForm({ ...addForm, program: e.target.value })}>
              <option value="adults">Adults — Polymaths</option>
              <option value="professionals">Professionals — Certification</option>
              <option value="kids">Kids — Ifacodemy</option>
            </select>
          </div>
          <div className="add-student-form__actions">
            <button className="btn btn--primary" onClick={addStudent}
              disabled={!addForm.name.trim() || !addForm.username.trim() || !addForm.password.trim()}>
              Create Student
            </button>
          </div>
        </div>
      )}

      <div className="student-table">
        <div className="student-table__head">
          <div>Student</div><div>Programme</div><div>Joined</div><div>Courses</div><div>Status</div><div>Actions</div>
        </div>
        {filtered.length === 0 && <div className="empty-state">No students found.</div>}
        {filtered.map(s => (
          <div key={s.id} className="student-table__entry">
            <div className={`student-table__row${editingId === s.id ? ' student-table__row--editing' : ''}`}>
              <div className="student-table__student">
                <div className="student-table__avatar">{s.name.charAt(0)}</div>
                <div>
                  <div className="student-table__name">{s.name}</div>
                  <div className="student-table__user">@{s.username}</div>
                </div>
              </div>
              <div><span className={`badge ${s.program === 'kids' ? 'badge--kids' : s.program === 'professionals' ? 'badge--professionals' : 'badge--adults'}`}>{s.program === 'kids' ? 'Kids' : s.program === 'professionals' ? 'Professionals' : 'Adults'}</span></div>
              <div className="student-table__date">{fmtDate(s.joinDate)}</div>
              <div className="student-table__courses">
                {courses.map(c => (
                  <button key={c.id}
                    className={`course-toggle${(s.enrolled || []).includes(c.id) ? ' course-toggle--on' : ''}`}
                    style={{ '--cc-color': c.color }}
                    onClick={() => toggleCourse(s.id, c.id)} title={c.title}>
                    {c.sym}
                  </button>
                ))}
              </div>
              <div><span className={`badge ${s.status === 'approved' ? 'badge--approved' : 'badge--pending'}`}>{s.status === 'approved' ? 'Active' : 'Pending'}</span></div>
              <div className="student-table__actions">
                <button className={`tbl-btn tbl-btn--edit${editingId === s.id ? ' tbl-btn--active' : ''}`}
                  onClick={() => editingId === s.id ? cancelEdit() : startEdit(s)}>
                  {editingId === s.id ? '✕' : 'Edit'}
                </button>
                {s.status === 'pending'
                  ? <button className="tbl-btn tbl-btn--approve" onClick={() => approve(s.id)}>Approve</button>
                  : <button className="tbl-btn tbl-btn--revoke"  onClick={() => revoke(s.id)}>Revoke</button>}
                <button className="tbl-btn tbl-btn--remove" onClick={() => remove(s.id)}>Remove</button>
              </div>
            </div>
            {editingId === s.id && editForm && (
              <div className="student-edit-panel" ref={editPanelRef}>
                <div className="student-edit-panel__grid">
                  <div className="add-student-form__field">
                    <label className="add-student-form__label">Full Name</label>
                    <input className="editor-input" value={editForm.name}
                      onChange={e => setEditForm({ ...editForm, name: e.target.value })} />
                  </div>
                  <div className="add-student-form__field">
                    <label className="add-student-form__label">Username</label>
                    <input className="editor-input" value={editForm.username}
                      onChange={e => setEditForm({ ...editForm, username: e.target.value })} />
                  </div>
                  <div className="add-student-form__field">
                    <label className="add-student-form__label">Password</label>
                    <input className="editor-input" type="text" value={editForm.password}
                      placeholder="Leave blank to keep current"
                      onChange={e => setEditForm({ ...editForm, password: e.target.value })} />
                  </div>
                  <div className="add-student-form__field">
                    <label className="add-student-form__label">Programme</label>
                    <select className="editor-input" value={editForm.program}
                      onChange={e => setEditForm({ ...editForm, program: e.target.value })}>
                      <option value="adults">Adults — Polymaths</option>
                      <option value="professionals">Professionals — Certification</option>
                      <option value="kids">Kids — Ifacodemy</option>
                    </select>
                  </div>
                  <div className="add-student-form__field">
                    <label className="add-student-form__label">Join Date</label>
                    <input className="editor-input" type="date" value={editForm.joinDate}
                      onChange={e => setEditForm({ ...editForm, joinDate: e.target.value })} />
                  </div>
                  <div className="add-student-form__field">
                    <label className="add-student-form__label">Status</label>
                    <select className="editor-input" value={editForm.status}
                      onChange={e => setEditForm({ ...editForm, status: e.target.value })}>
                      <option value="approved">Active</option>
                      <option value="pending">Pending</option>
                    </select>
                  </div>
                </div>
                <div className="student-edit-panel__section">
                  <div className="add-student-form__label">Enrolled Courses</div>
                  <div className="student-edit-courses">
                    {courses.map(c => {
                      const on = (editForm.enrolled || []).includes(c.id);
                      return (
                        <button key={c.id}
                          className={`s-course-pill${on ? ' s-course-pill--on' : ''}`}
                          style={{ '--cc': c.color }}
                          onClick={() => toggleEditCourse(c.id)}
                          title={on ? `Remove from ${c.title}` : `Enrol in ${c.title}`}>
                          <span className="s-course-pill__sym">{c.sym}</span>
                          <span className="s-course-pill__title">{c.title}</span>
                          <span className="s-course-pill__state">{on ? '✓' : '+'}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div className="student-edit-panel__actions">
                  <button className="btn btn--primary" onClick={saveEdit}
                    disabled={!editForm.name.trim() || !editForm.username.trim()}>
                    Save Changes
                  </button>
                  <button className="btn btn--ghost" onClick={cancelEdit}>Cancel</button>
                  <button className="btn btn--danger" style={{ marginLeft: 'auto' }}
                    onClick={() => resetStudentProgress(s.id)}
                    title="Reset this student's course progress and IGA trackers to 0%">
                    Reset Progress
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── ADMIN COURSE EDITOR ──────────────────────────────────────────────────────

function AdminCourseEditor({ course, courses, setCourses, saveAll, onBack }) {
  const [local, setLocal] = useState(() => JSON.parse(JSON.stringify(course)));

  // Add-material form state
  const [addingMat, setAddingMat] = useState(null); // weekId
  const [newMat, setNewMat] = useState({ type: 'text', title: '', videoUrl: '', fileUrl: '', fileType: 'pdf', description: '', duration: '', content: [] });
  const [newBlockType, setNewBlockType] = useState('paragraph');
  const [newBlockText, setNewBlockText] = useState('');

  // Edit-material state
  const [editingMat, setEditingMat] = useState(null); // { weekId, matId }
  const [editMat, setEditMat] = useState(null);
  const [editBlockType, setEditBlockType] = useState('paragraph');
  const [editBlockText, setEditBlockText] = useState('');

  // Inline block editing state
  const [editingBlockIdx, setEditingBlockIdx] = useState(null);
  const [editBlockContent, setEditBlockContent] = useState(null);

  // ── Save ──────────────────────────────────────────────────────────────────
  function save() {
    const updated = courses.map(c => c.id === local.id ? local : c);
    setCourses(updated); saveAll(null, updated); onBack();
  }

  // ── Week helpers ──────────────────────────────────────────────────────────
  function addWeek() {
    setLocal(l => ({ ...l, weeks: [...l.weeks, { id: genId(), order: l.weeks.length, title: `Week ${l.weeks.length + 1}: New Week`, description: '', materials: [] }] }));
  }
  function removeWeek(weekId) {
    setLocal(l => ({ ...l, weeks: l.weeks.filter(w => w.id !== weekId) }));
  }
  function updateWeek(weekId, field, val) {
    setLocal(l => ({ ...l, weeks: l.weeks.map(w => w.id === weekId ? { ...w, [field]: val } : w) }));
  }

  // ── Add-material helpers ──────────────────────────────────────────────────
  function addNewBlock() {
    if (!newBlockText.trim()) return;
    const block = newBlockType === 'list'
      ? { type: 'list', items: newBlockText.split('\n').map(s => s.trim()).filter(Boolean) }
      : { type: newBlockType, text: newBlockText };
    setNewMat(m => ({ ...m, content: [...m.content, block] }));
    setNewBlockText('');
  }
  function removeNewBlock(i) { setNewMat(m => ({ ...m, content: m.content.filter((_, j) => j !== i) })); }
  function addMaterial(weekId) {
    if (!newMat.title.trim()) return;
    const mat = {
      id: genId(), type: newMat.type,
      title: newMat.title.trim(),
      duration: newMat.duration.trim() || (newMat.type === 'video' ? '~10 min' : newMat.type === 'file' ? '~5 min' : '~10 min read'),
      ...(newMat.type === 'video'
        ? { videoUrl: newMat.videoUrl.trim(), description: newMat.description.trim() || newMat.title.trim() }
        : newMat.type === 'file'
        ? { fileUrl: newMat.fileUrl.trim(), fileType: newMat.fileType, description: newMat.description.trim() }
        : { content: newMat.content }
      )
    };
    setLocal(l => ({ ...l, weeks: l.weeks.map(w => w.id === weekId ? { ...w, materials: [...w.materials, mat] } : w) }));
    setNewMat({ type: 'text', title: '', videoUrl: '', fileUrl: '', fileType: 'pdf', description: '', duration: '', content: [] });
    setNewBlockText(''); setAddingMat(null);
  }
  function removeMaterial(weekId, matId) {
    setLocal(l => ({ ...l, weeks: l.weeks.map(w => w.id === weekId ? { ...w, materials: w.materials.filter(m => m.id !== matId) } : w) }));
  }

  // ── Edit-material helpers ─────────────────────────────────────────────────
  function startEdit(weekId, mat) {
    setEditingMat({ weekId, matId: mat.id });
    setEditMat(JSON.parse(JSON.stringify(mat)));
    setEditBlockText(''); setEditBlockType('paragraph');
    setAddingMat(null);
  }
  function cancelEdit() { setEditingMat(null); setEditMat(null); setEditingBlockIdx(null); setEditBlockContent(null); }
  function saveEdit() {
    setLocal(l => ({ ...l, weeks: l.weeks.map(w =>
      w.id === editingMat.weekId
        ? { ...w, materials: w.materials.map(m => m.id === editingMat.matId ? editMat : m) }
        : w
    )}));
    setEditingMat(null); setEditMat(null); setEditingBlockIdx(null); setEditBlockContent(null);
  }
  function addEditBlock() {
    if (!editBlockText.trim()) return;
    const block = editBlockType === 'list'
      ? { type: 'list', items: editBlockText.split('\n').map(s => s.trim()).filter(Boolean) }
      : { type: editBlockType, text: editBlockText };
    setEditMat(m => ({ ...m, content: [...(m.content || []), block] }));
    setEditBlockText('');
  }
  function removeEditBlock(i) { setEditMat(m => ({ ...m, content: m.content.filter((_, j) => j !== i) })); }
  function moveEditBlock(i, dir) {
    const content = [...editMat.content];
    const j = i + dir;
    if (j < 0 || j >= content.length) return;
    [content[i], content[j]] = [content[j], content[i]];
    setEditMat(m => ({ ...m, content }));
  }
  function startEditBlock(i) {
    setEditingBlockIdx(i);
    setEditBlockContent(JSON.parse(JSON.stringify(editMat.content[i])));
  }
  function cancelEditBlock() { setEditingBlockIdx(null); setEditBlockContent(null); }
  function saveEditBlock() {
    setEditMat(m => ({ ...m, content: m.content.map((b, j) => j === editingBlockIdx ? editBlockContent : b) }));
    setEditingBlockIdx(null); setEditBlockContent(null);
  }

  // ── Block preview text ────────────────────────────────────────────────────
  function blockPreview(b) {
    if (b.type === 'list') return `List: ${(b.items || []).slice(0, 2).join(' / ')}${(b.items || []).length > 2 ? ' …' : ''}`;
    const t = b.text || '';
    return t.length > 80 ? t.slice(0, 80) + '…' : t;
  }

  return (
    <div className="admin-editor">
      <div className="admin-page-header">
        <button className="back-btn" onClick={onBack}>‹ Courses</button>
        <h2 className="admin-page-title">Edit Course</h2>
        <button className="btn btn--primary" onClick={save}>Save Changes</button>
      </div>

      {/* ── Course meta ── */}
      <div className="editor-meta">
        <div className="editor-field">
          <label>Course Title</label>
          <input className="editor-input" value={local.title} onChange={e => setLocal(l => ({ ...l, title: e.target.value }))} />
        </div>
        <div className="editor-field">
          <label>Subtitle</label>
          <input className="editor-input" value={local.subtitle || ''} onChange={e => setLocal(l => ({ ...l, subtitle: e.target.value }))} placeholder="Short subtitle" />
        </div>
        <div className="editor-field">
          <label>Description</label>
          <textarea className="editor-input editor-textarea" value={local.description} onChange={e => setLocal(l => ({ ...l, description: e.target.value }))} />
        </div>
        <div className="editor-field">
          <label>Duration</label>
          <input className="editor-input" value={local.duration || ''} onChange={e => setLocal(l => ({ ...l, duration: e.target.value }))} placeholder="e.g. 3 months" style={{ maxWidth: '220px' }} />
        </div>
      </div>

      {/* ── Weeks ── */}
      <h3 className="editor-section-title">Weeks &amp; Materials</h3>
      {local.weeks.map((week) => (
        <div key={week.id} className="editor-week">
          <div className="editor-week__head">
            <div className="editor-week__fields">
              <input className="editor-input editor-week__title-input"
                placeholder="Week title" value={week.title}
                onChange={e => updateWeek(week.id, 'title', e.target.value)} />
              <input className="editor-input"
                placeholder="Week description (optional)" value={week.description || ''}
                onChange={e => updateWeek(week.id, 'description', e.target.value)} />
            </div>
            <button className="tbl-btn tbl-btn--remove" onClick={() => removeWeek(week.id)}>Remove Week</button>
          </div>

          <div className="editor-week__materials">
            {week.materials.map(mat => {
              const isEditing = editingMat && editingMat.weekId === week.id && editingMat.matId === mat.id;
              return (
                <div key={mat.id} className="editor-mat-wrap">
                  {!isEditing ? (
                    /* ── Summary row ── */
                    <div className="editor-mat">
                      <span className="editor-mat__type">{mat.type === 'video' ? '▶' : mat.type === 'file' ? fileIcon(mat.fileType) : '📄'}</span>
                      <div className="editor-mat__info">
                        <span className="editor-mat__title">{mat.title}</span>
                        {mat.type === 'video' && mat.videoUrl && (
                          <span className="editor-mat__url">{mat.videoUrl.length > 55 ? mat.videoUrl.slice(0, 55) + '…' : mat.videoUrl}</span>
                        )}
                        {mat.type === 'file' && (
                          <span className="editor-mat__url">{fileLabel(mat.fileType)}{mat.fileUrl ? ' · ' + (mat.fileUrl.length > 45 ? mat.fileUrl.slice(0, 45) + '…' : mat.fileUrl) : ''}</span>
                        )}
                        {mat.type === 'text' && (
                          <span className="editor-mat__blocks">{(mat.content || []).length} block{(mat.content || []).length !== 1 ? 's' : ''}</span>
                        )}
                      </div>
                      <button className="tbl-btn tbl-btn--edit" onClick={() => startEdit(week.id, mat)}>Edit</button>
                      <button className="tbl-btn tbl-btn--remove" onClick={() => removeMaterial(week.id, mat.id)}>✕</button>
                    </div>
                  ) : (
                    /* ── Inline material editor ── */
                    <div className="editor-mat-edit">
                      <div className="editor-mat-edit__header">
                        <span className="editor-mat-edit__type-badge">{editMat.type === 'video' ? '▶ Video' : editMat.type === 'file' ? (fileIcon(editMat.fileType) + ' ' + fileLabel(editMat.fileType)) : '📄 Text'}</span>
                        <span className="editor-mat-edit__label">Editing Material</span>
                      </div>

                      <div className="editor-mat-edit__row">
                        <div className="editor-field" style={{ flex: 2 }}>
                          <label>Title</label>
                          <input className="editor-input" value={editMat.title}
                            onChange={e => setEditMat(m => ({ ...m, title: e.target.value }))} />
                        </div>
                        <div className="editor-field" style={{ flex: 1 }}>
                          <label>Duration</label>
                          <input className="editor-input" value={editMat.duration || ''}
                            onChange={e => setEditMat(m => ({ ...m, duration: e.target.value }))}
                            placeholder="e.g. ~10 min" />
                        </div>
                      </div>

                      {editMat.type === 'video' && (
                        <>
                          <div className="editor-field">
                            <label>YouTube URL</label>
                            <input className="editor-input" value={editMat.videoUrl || ''}
                              onChange={e => setEditMat(m => ({ ...m, videoUrl: e.target.value }))}
                              placeholder="https://www.youtube.com/watch?v=..." />
                          </div>
                          <div className="editor-field">
                            <label>Video Description</label>
                            <textarea className="editor-input editor-textarea" value={editMat.description || ''}
                              onChange={e => setEditMat(m => ({ ...m, description: e.target.value }))}
                              rows={2} placeholder="Shown above the video player" />
                          </div>
                        </>
                      )}

                      {editMat.type === 'file' && (
                        <>
                          <div className="editor-mat-edit__row">
                            <div className="editor-field" style={{ maxWidth: '170px' }}>
                              <label>File Type</label>
                              <select className="editor-input" value={editMat.fileType || 'pdf'} onChange={e => setEditMat(m => ({ ...m, fileType: e.target.value }))}>
                                <option value="pdf">PDF</option>
                                <option value="ppt">PowerPoint</option>
                                <option value="word">Word Doc</option>
                                <option value="other">Other</option>
                              </select>
                            </div>
                            <div className="editor-field" style={{ flex: 1 }}>
                              <label>File URL (Google Drive, Dropbox, OneDrive…)</label>
                              <input className="editor-input" value={editMat.fileUrl || ''}
                                onChange={e => setEditMat(m => ({ ...m, fileUrl: e.target.value }))}
                                placeholder="https://drive.google.com/file/..." />
                            </div>
                          </div>
                          <div className="editor-field">
                            <label>Description (optional)</label>
                            <textarea className="editor-input editor-textarea" value={editMat.description || ''}
                              onChange={e => setEditMat(m => ({ ...m, description: e.target.value }))}
                              rows={2} placeholder="Shown to students above the download button" />
                          </div>
                        </>
                      )}

                      {editMat.type === 'text' && (
                        <div className="editor-content-section">
                          <div className="editor-content-section__label">Content Blocks</div>
                          {(editMat.content || []).length === 0 && (
                            <div className="editor-content-empty">No content blocks yet — add blocks below.</div>
                          )}
                          {(editMat.content || []).map((block, i) => (
                            <div key={i} className="editor-block-wrap">
                              {editingBlockIdx === i && editBlockContent ? (
                                <div className="editor-block-edit">
                                  <div className="editor-block-edit__type">{editBlockContent.type}</div>
                                  {editBlockContent.type === 'list' ? (
                                    <textarea className="editor-input editor-textarea"
                                      rows={Math.max(3, (editBlockContent.items || []).length + 1)}
                                      value={(editBlockContent.items || []).join('\n')}
                                      onChange={e => setEditBlockContent(b => ({ ...b, items: e.target.value.split('\n') }))}
                                      placeholder="One item per line" />
                                  ) : (
                                    <>
                                      <textarea className="editor-input editor-textarea" rows={4}
                                        value={editBlockContent.text || ''}
                                        onChange={e => setEditBlockContent(b => ({ ...b, text: e.target.value }))} />
                                      {editBlockContent.type === 'quote' && (
                                        <input className="editor-input" value={editBlockContent.attribution || ''}
                                          onChange={e => setEditBlockContent(b => ({ ...b, attribution: e.target.value }))}
                                          placeholder="Attribution (e.g. IFABOK)"
                                          style={{ marginTop: '4px' }} />
                                      )}
                                    </>
                                  )}
                                  <div className="editor-block-edit__actions">
                                    <button className="btn btn--primary" style={{ fontSize: '0.78rem', padding: '5px 14px' }} onClick={saveEditBlock}>Save Block</button>
                                    <button className="btn btn--ghost" style={{ fontSize: '0.78rem', padding: '5px 14px' }} onClick={cancelEditBlock}>Cancel</button>
                                  </div>
                                </div>
                              ) : (
                                <div className="editor-block">
                                  <span className="editor-block__type">{block.type}</span>
                                  <span className="editor-block__text">{blockPreview(block)}</span>
                                  <div className="editor-block__actions">
                                    <button className="tbl-btn" onClick={() => moveEditBlock(i, -1)} disabled={i === 0} title="Move up">↑</button>
                                    <button className="tbl-btn" onClick={() => moveEditBlock(i, 1)} disabled={i === (editMat.content || []).length - 1} title="Move down">↓</button>
                                    <button className="tbl-btn tbl-btn--edit" onClick={() => startEditBlock(i)} title="Edit block content">✎</button>
                                    <button className="tbl-btn tbl-btn--remove" onClick={() => removeEditBlock(i)} title="Remove">✕</button>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                          <div className="editor-content-builder">
                            <div className="editor-content-builder__row">
                              <select className="editor-input" style={{ maxWidth: '160px' }} value={editBlockType} onChange={e => { setEditBlockType(e.target.value); setEditBlockText(''); }}>
                                <option value="paragraph">Paragraph</option>
                                <option value="header">Header</option>
                                <option value="highlight">Highlight</option>
                                <option value="quote">Quote</option>
                                <option value="list">List (one item per line)</option>
                              </select>
                              {editBlockType === 'list'
                                ? <textarea className="editor-input editor-textarea" placeholder="One list item per line&#10;Item one&#10;Item two" value={editBlockText} onChange={e => setEditBlockText(e.target.value)} rows={3} />
                                : <input className="editor-input" placeholder="Block text…" value={editBlockText} onChange={e => setEditBlockText(e.target.value)} />
                              }
                              <button className="tbl-btn tbl-btn--approve" onClick={addEditBlock}>+ Add</button>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="editor-add-mat__actions">
                        <button className="btn btn--primary" onClick={saveEdit}>Save Material</button>
                        <button className="btn btn--ghost" onClick={cancelEdit}>Cancel</button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* ── Add Material form ── */}
          {addingMat === week.id ? (
            <div className="editor-add-mat">
              <div className="editor-add-mat__row">
                <select className="editor-input" style={{ maxWidth: '180px' }} value={newMat.type} onChange={e => setNewMat(m => ({ ...m, type: e.target.value, content: [] }))}>
                  <option value="text">Text / Reading</option>
                  <option value="video">Video</option>
                  <option value="file">File (PDF / PPT / Word)</option>
                </select>
                <input className="editor-input" placeholder="Material title" value={newMat.title}
                  onChange={e => setNewMat(m => ({ ...m, title: e.target.value }))} />
                <input className="editor-input" placeholder="Duration (e.g. ~10 min)" value={newMat.duration}
                  onChange={e => setNewMat(m => ({ ...m, duration: e.target.value }))} style={{ maxWidth: '170px' }} />
              </div>
              {newMat.type === 'video' && (
                <>
                  <input className="editor-input" placeholder="YouTube URL (https://www.youtube.com/watch?v=...)" value={newMat.videoUrl}
                    onChange={e => setNewMat(m => ({ ...m, videoUrl: e.target.value }))} />
                  <textarea className="editor-input editor-textarea" placeholder="Video description (optional)" value={newMat.description}
                    onChange={e => setNewMat(m => ({ ...m, description: e.target.value }))} rows={2} />
                </>
              )}
              {newMat.type === 'file' && (
                <>
                  <div className="editor-mat-edit__row">
                    <select className="editor-input" style={{ maxWidth: '150px' }} value={newMat.fileType} onChange={e => setNewMat(m => ({ ...m, fileType: e.target.value }))}>
                      <option value="pdf">PDF</option>
                      <option value="ppt">PowerPoint</option>
                      <option value="word">Word Doc</option>
                      <option value="other">Other</option>
                    </select>
                    <input className="editor-input" placeholder="File URL (Google Drive, Dropbox, OneDrive…)" value={newMat.fileUrl}
                      onChange={e => setNewMat(m => ({ ...m, fileUrl: e.target.value }))} />
                  </div>
                  <textarea className="editor-input editor-textarea" placeholder="File description (optional)" value={newMat.description}
                    onChange={e => setNewMat(m => ({ ...m, description: e.target.value }))} rows={2} />
                </>
              )}
              {newMat.type === 'text' && (
                <div className="editor-content-builder">
                  <div className="editor-content-builder__row">
                    <select className="editor-input" style={{ maxWidth: '160px' }} value={newBlockType} onChange={e => { setNewBlockType(e.target.value); setNewBlockText(''); }}>
                      <option value="paragraph">Paragraph</option>
                      <option value="header">Header</option>
                      <option value="highlight">Highlight</option>
                      <option value="quote">Quote</option>
                      <option value="list">List (one item per line)</option>
                    </select>
                    {newBlockType === 'list'
                      ? <textarea className="editor-input editor-textarea" placeholder="One list item per line&#10;Item one&#10;Item two" value={newBlockText} onChange={e => setNewBlockText(e.target.value)} rows={3} />
                      : <input className="editor-input" placeholder="Text content…" value={newBlockText} onChange={e => setNewBlockText(e.target.value)} />
                    }
                    <button className="tbl-btn tbl-btn--approve" onClick={addNewBlock}>+ Add Block</button>
                  </div>
                  {newMat.content.length > 0 && (
                    <div className="content-preview">
                      {newMat.content.map((b, i) => (
                        <div key={i} className="content-preview__item">
                          <span className="content-preview__type">{b.type}</span>
                          <span>{blockPreview(b)}</span>
                          <button className="tbl-btn tbl-btn--remove" onClick={() => removeNewBlock(i)}>✕</button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
              <div className="editor-add-mat__actions">
                <button className="btn btn--primary" onClick={() => addMaterial(week.id)}>Add Material</button>
                <button className="btn btn--ghost" onClick={() => { setAddingMat(null); setNewMat({ type: 'text', title: '', videoUrl: '', description: '', duration: '', content: [] }); setNewBlockText(''); }}>Cancel</button>
              </div>
            </div>
          ) : (
            <button className="editor-add-btn" onClick={() => { setAddingMat(week.id); if (editingMat) cancelEdit(); }}>+ Add Material</button>
          )}
        </div>
      ))}
      <button className="editor-add-btn editor-add-btn--week" onClick={addWeek}>+ Add Week</button>
    </div>
  );
}

// ─── ADMIN COURSES ────────────────────────────────────────────────────────────

function AdminCourses({ courses, setCourses, saveAll }) {
  const [editingId, setEditingId] = useState(null);
  if (editingId) {
    const course = courses.find(c => c.id === editingId);
    return <AdminCourseEditor course={course} courses={courses} setCourses={setCourses} saveAll={saveAll} onBack={() => setEditingId(null)} />;
  }
  return (
    <div className="admin-courses">
      <div className="admin-page-header">
        <h2 className="admin-page-title">Courses</h2>
      </div>
      <div className="admin-course-list">
        {courses.map(c => (
          <div key={c.id} className="admin-course-row" style={{ '--cc-color': c.color }}>
            <div className="admin-course-row__sym">{c.sym}</div>
            <div className="admin-course-row__info">
              <div className="admin-course-row__title">{c.title}</div>
              <div className="admin-course-row__sub">{c.subtitle}</div>
              <div className="admin-course-row__meta">
                <span className={`badge ${c.program === 'kids' ? 'badge--kids' : c.program === 'professionals' ? 'badge--professionals' : 'badge--adults'}`}>{c.program}</span>
                <span className="admin-course-row__count">{c.weeks.length} weeks</span>
                <span className="admin-course-row__count">{c.weeks.reduce((s, w) => s + w.materials.length, 0)} materials</span>
              </div>
            </div>
            <button className="tbl-btn tbl-btn--edit" onClick={() => setEditingId(c.id)}>Edit</button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── ADMIN ANALYTICS ─────────────────────────────────────────────────────────

function AdminAnalytics({ users, courses, progress }) {
  const students = users.filter(u => u.role === 'student' && u.status === 'approved');
  return (
    <div className="admin-analytics">
      <div className="admin-page-header">
        <h2 className="admin-page-title">Analytics</h2>
        <span className="admin-page-sub">Student progress across all courses</span>
      </div>
      <div className="analytics-table">
        <div className="analytics-table__head">
          <div>Student</div>
          {courses.map(c => <div key={c.id}>{c.title}</div>)}
          <div>Overall</div>
        </div>
        {students.map(s => {
          const completedMats = getCompletedMaterials(progress, s.id);
          const enrolled = courses.filter(c => (s.enrolled || []).includes(c.id));
          const overall = getOverallProgress(enrolled, completedMats);
          return (
            <div key={s.id} className="analytics-table__row">
              <div className="analytics-table__student">
                <div className="mini-avatar">{s.name.charAt(0)}</div>
                <span>{s.name}</span>
              </div>
              {courses.map(c => {
                if (!(s.enrolled || []).includes(c.id)) return <div key={c.id} className="analytics-cell analytics-cell--na">—</div>;
                const pct = getCourseProgress(c, completedMats);
                return (
                  <div key={c.id} className="analytics-cell">
                    <div className="analytics-bar"><div className="analytics-bar__fill" style={{ width: pct + '%', background: c.color }} /></div>
                    <span className="analytics-pct">{pct}%</span>
                  </div>
                );
              })}
              <div className="analytics-cell analytics-cell--overall"><strong>{overall}%</strong></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── ADMIN SETTINGS ──────────────────────────────────────────────────────────

function AdminSettings({ users, setUsers, saveAll }) {
  const [current, setCurrent]   = useState('');
  const [newPw,   setNewPw]     = useState('');
  const [confirm, setConfirm]   = useState('');
  const [msg,     setMsg]       = useState(null); // { ok: bool, text: string }
  const [showCur, setShowCur]   = useState(false);
  const [showNew, setShowNew]   = useState(false);
  const [showCon, setShowCon]   = useState(false);

  function handleSave(e) {
    e.preventDefault();
    setMsg(null);
    const admin = users.find(u => u.role === 'admin');
    const seedAdmin = SEED_USERS.find(u => u.role === 'admin');
    const activePassword = (admin && admin.password) || seedAdmin.password;
    if (current !== activePassword) { setMsg({ ok: false, text: 'Current password is incorrect.' }); return; }
    if (newPw.length < 6)           { setMsg({ ok: false, text: 'New password must be at least 6 characters.' }); return; }
    if (newPw !== confirm)          { setMsg({ ok: false, text: 'New passwords do not match.' }); return; }
    const updated = users.map(u => u.role === 'admin' ? { ...u, password: newPw } : u);
    setUsers(updated); saveAll(updated);
    setCurrent(''); setNewPw(''); setConfirm('');
    setMsg({ ok: true, text: 'Password updated successfully.' });
  }

  return (
    <div className="admin-settings">
      <div className="admin-page-header">
        <h2 className="admin-page-title">Settings</h2>
      </div>
      <div className="settings-card">
        <h3 className="settings-card__title">Change Admin Password</h3>
        <p className="settings-card__sub">Update the password used to sign in to the admin account.</p>
        <form className="settings-form" onSubmit={handleSave}>
          <div className="settings-field">
            <label className="settings-label">Current Password</label>
            <div className="settings-pw-wrap">
              <input className="settings-input" type={showCur ? 'text' : 'password'}
                value={current} onChange={e => setCurrent(e.target.value)} placeholder="Enter current password" />
              <button type="button" className="settings-pw-eye" onClick={() => setShowCur(v => !v)}>{showCur ? '🙈' : '👁'}</button>
            </div>
          </div>
          <div className="settings-field">
            <label className="settings-label">New Password</label>
            <div className="settings-pw-wrap">
              <input className="settings-input" type={showNew ? 'text' : 'password'}
                value={newPw} onChange={e => setNewPw(e.target.value)} placeholder="Enter new password (min 6 chars)" />
              <button type="button" className="settings-pw-eye" onClick={() => setShowNew(v => !v)}>{showNew ? '🙈' : '👁'}</button>
            </div>
          </div>
          <div className="settings-field">
            <label className="settings-label">Confirm New Password</label>
            <div className="settings-pw-wrap">
              <input className="settings-input" type={showCon ? 'text' : 'password'}
                value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="Repeat new password" />
              <button type="button" className="settings-pw-eye" onClick={() => setShowCon(v => !v)}>{showCon ? '🙈' : '👁'}</button>
            </div>
          </div>
          {msg && <div className={`settings-msg${msg.ok ? ' settings-msg--ok' : ' settings-msg--err'}`}>{msg.text}</div>}
          <button className="btn btn--primary settings-save" type="submit"
            disabled={!current || !newPw || !confirm}>
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── ADMIN APP ────────────────────────────────────────────────────────────────

function AdminApp({ onLogout, users, setUsers, courses, setCourses, progress, setProgress, saveAll }) {
  const [adminView, setAdminView] = useState('overview');
  const pendingCount = users.filter(u => u.role === 'student' && u.status === 'pending').length;

  return (
    <div className="app-shell">
      <AdminSidebar activeView={adminView} setAdminView={setAdminView} onLogout={onLogout} pendingCount={pendingCount} />
      <main className="app-main">
        {adminView === 'overview'  && <AdminOverview users={users} courses={courses} />}
        {adminView === 'students'  && <AdminStudents users={users} setUsers={setUsers} courses={courses} progress={progress} setProgress={setProgress} saveAll={saveAll} />}
        {adminView === 'courses'   && <AdminCourses courses={courses} setCourses={setCourses} saveAll={saveAll} />}
        {adminView === 'analytics' && <AdminAnalytics users={users} courses={courses} progress={progress} />}
        {adminView === 'settings'  && <AdminSettings users={users} setUsers={setUsers} saveAll={saveAll} />}
      </main>
      <MobileAdminNav activeView={adminView} setAdminView={setAdminView} onLogout={onLogout} pendingCount={pendingCount} />
    </div>
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────

function App() {
  const [data]    = useState(() => loadState() || DEFAULT_DATA);
  const [users,   setUsersRaw]    = useState(data.users);
  const [courses, setCoursesRaw]  = useState(data.courses);
  const [progress, setProgressRaw] = useState(data.progress);
  const [currentUser, setCurrentUser] = useState(null);
  const [loginError, setLoginError]   = useState('');

  function saveAll(newUsers, newCourses, newProgress) {
    saveState({ users: newUsers || users, courses: newCourses || courses, progress: newProgress || progress });
  }
  function setUsers(u)    { setUsersRaw(u);    saveAll(u, null, null); }
  function setCourses(c)  { setCoursesRaw(c);  saveAll(null, c, null); }
  function setProgress(p) { setProgressRaw(p); saveAll(null, null, p); }

  function handleLogin(username, password) {
    // Check localStorage users first — covers admin password changes
    const found = users.find(u => u.username === username && u.password === password);
    if (found) { setCurrentUser(found); setLoginError(''); return; }
    // Fallback: seed admin credentials in case localStorage was wiped
    const seedAdmin = SEED_USERS.find(u => u.role === 'admin');
    if (username === seedAdmin.username && password === seedAdmin.password) {
      setCurrentUser(seedAdmin); setLoginError(''); return;
    }
    setLoginError('Invalid username or password.');
  }

  function handleLogout() { setCurrentUser(null); setLoginError(''); }

  if (!currentUser) return <LoginPage onLogin={handleLogin} loginError={loginError} />;

  if (currentUser.role === 'admin') {
    return <AdminApp onLogout={handleLogout} users={users} setUsers={setUsers}
      courses={courses} setCourses={setCourses} progress={progress} setProgress={setProgress} saveAll={saveAll} />;
  }

  if (currentUser.status === 'pending') return <PendingPage user={currentUser} onLogout={handleLogout} />;

  const freshUser = users.find(u => u.id === currentUser.id) || currentUser;
  return <StudentApp user={freshUser} onLogout={handleLogout}
    courses={courses} setCourses={setCourses} progress={progress} setProgress={setProgress} saveAll={saveAll} />;
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
