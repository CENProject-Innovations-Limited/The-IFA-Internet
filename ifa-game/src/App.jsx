/* ─────────────────────────────────────────────────────────────
   IfaGames · Know the Odu
   React 18 + JSX via Babel Standalone · no build step
   CENProject · toe.cenproject.org/ifa-game/
───────────────────────────────────────────────────────────── */

const { useState, useEffect, useRef, useCallback } = React;

const HISCORE_KEY  = 'ifagame-quiz-best';
const BESTMOV_KEY  = 'ifagame-match-best';
const ARC_KEY      = 'ifagame-arc-best';
const AYO_KEY      = 'ifagame-ayo-best';
const BIN_KEY         = 'ifagame-bin-best';
const BIN_ROUNDS      = 10;
const BIN_TIME        = 20;   // seconds per round
const ORISA_QUIZ_KEY  = 'ifagame-orisa-quiz-best';
const ORISA_MATCH_KEY = 'ifagame-orisa-match-best';
const ORISA_Q_TIME    = 18;   // seconds per Orisa question
const ORISA_MATCH_N   = 8;    // pairs in Orisa match game
const GATES_KEY       = 'ifagame-gates-best';
const GATES_ROUNDS    = 10;
const GATES_TIME      = 18;   // seconds per Gates question
const MOD_KEY         = 'ifagame-mod-best';
const MOD_ROUNDS      = 10;
const MOD_TIME        = 20;   // seconds per Mod question
const Q_COUNT  = 10;
const Q_TIME   = 15;   // seconds per question
const LIVES    = 3;
const MATCH_N  = 8;    // pairs in match game

// ── IfaASCII constants ──
const ASCII_KEY    = 'ifagame-ascii-best';
const ASCII_ROUNDS = 10;
const ASCII_TIME   = 20;

// ── IfaUnicode constants ──
const UNICODE_KEY    = 'ifagame-unicode-best';
const UNICODE_ROUNDS = 10;
const UNICODE_TIME   = 20;

// ── Ayo Olopon board constants ──
const AYO_N      = 16;          // total pits
const AYO_SEEDS  = 8;           // seeds per pit at start
const OGBE_PITS  = [0,1,2,3,4,5,6,7];       // player row
const OYEKU_PITS = [8,9,10,11,12,13,14,15]; // AI row

// ════════════════════════════════════════════════════════════
// UTILS
// ════════════════════════════════════════════════════════════

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function primaryGlyph(code) {
  if (code === '1111') return 'O';
  if (code === '0000') return '|';
  return code.split('').map(b => b === '1' ? 'O' : 'I').join('');
}

const CAT_COLOR = {
  primordial: '#c9a227', cognitive: '#4361ee', vital:      '#e63946',
  social:     '#daa520', active:    '#2d9e6b', strategic:  '#5e72b4',
  sacred:     '#7c4dff', abundant:  '#e9498a',
};

const ORISA_COLOR = {
  'Ogun':        '#2d7a40',
  'Sango':       '#c0392b',
  'Osun':        '#c9922a',
  'Orunmila':    '#5a9e2f',
  'Obatala':     '#8ba8b5',
  'Esu':         '#7b1fa2',
  'Yemoja':      '#1565c0',
  'Oya':         '#6a1b9a',
  'Osanyin':     '#388e3c',
  'Soponna':     '#6d4c41',
  'Ibeji':       '#e53935',
  'Erinle':      '#0288d1',
  'Aganju':      '#bf360c',
  'Nana Buruku': '#4527a0',
  'Oduduwa':     '#c8960a',
  'Ori':         '#78909c',
};

function fmtTime(s) {
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

// ════════════════════════════════════════════════════════════
// QUESTION GENERATION
// ════════════════════════════════════════════════════════════

function buildQuestion(type, odu, odus) {
  const others = shuffle(odus.filter(o => o.id !== odu.id));

  if (type === 'symbol') {
    const choices = shuffle([odu, ...others.slice(0, 3)]);
    return {
      type, odu,
      prompt: 'Which Odu is shown?',
      display: 'glyph',
      choices: choices.map(o => ({ label: o.name, value: o.id })),
      answer: odu.id,
      reveal: `${odu.name} · ${odu.element} · ${odu.category}`,
    };
  }

  if (type === 'domain') {
    const domain = shuffle(odu.domains)[0];
    const choices = shuffle([odu, ...others.slice(0, 3)]);
    return {
      type, odu,
      prompt: `Which Odu governs "${domain}"?`,
      display: null,
      choices: choices.map(o => ({ label: o.name, value: o.id })),
      answer: odu.id,
      reveal: `${odu.name} rules: ${odu.domains.join(', ')}`,
    };
  }

  if (type === 'element') {
    const pool = shuffle([...new Set(odus.map(o => o.element))]);
    const choices = shuffle([odu.element, ...pool.filter(e => e !== odu.element).slice(0, 3)]);
    return {
      type, odu,
      prompt: `What element does ${odu.name} rule?`,
      display: 'name',
      choices: choices.map(e => ({ label: e, value: e })),
      answer: odu.element,
      reveal: `${odu.name} → ${odu.element}`,
    };
  }

  if (type === 'category') {
    const pool = shuffle([...new Set(odus.map(o => o.category))]);
    const choices = shuffle([odu.category, ...pool.filter(c => c !== odu.category).slice(0, 3)]);
    return {
      type, odu,
      prompt: `Which category is ${odu.name} in?`,
      display: 'name',
      choices: choices.map(c => ({ label: c[0].toUpperCase() + c.slice(1), value: c })),
      answer: odu.category,
      reveal: `${odu.name} is in the ${odu.category} category`,
    };
  }

  if (type === 'dual') {
    const dual = odus.find(o => o.id === odu.dual);
    if (!dual) return null;
    const choices = shuffle([dual, ...others.filter(o => o.id !== dual.id).slice(0, 3)]);
    return {
      type, odu,
      prompt: `What is the complementary Odu of ${odu.name}?`,
      display: 'name',
      choices: choices.map(o => ({ label: o.name, value: o.id })),
      answer: dual.id,
      reveal: `${odu.name} ↔ ${dual.name}`,
    };
  }

  if (type === 'planet') {
    const pool = shuffle([...new Set(odus.map(o => o.planet))]);
    const choices = shuffle([odu.planet, ...pool.filter(p => p !== odu.planet).slice(0, 3)]);
    return {
      type, odu,
      prompt: `What planet rules ${odu.name}?`,
      display: 'name',
      choices: choices.map(p => ({ label: p, value: p })),
      answer: odu.planet,
      reveal: `${odu.name} is ruled by ${odu.planet}`,
    };
  }

  return null;
}

function makeQuestions(odus, count) {
  const types = ['symbol', 'domain', 'element', 'category', 'dual', 'planet'];
  const specs = [];
  odus.forEach(odu => {
    types.forEach(type => {
      if (type === 'dual' && !odu.dual) return;
      specs.push({ type, odu });
    });
  });
  return shuffle(specs)
    .slice(0, count)
    .map(({ type, odu }) => buildQuestion(type, odu, odus))
    .filter(Boolean);
}

// ════════════════════════════════════════════════════════════
// MATCH CARD SETUP
// ════════════════════════════════════════════════════════════

function makeMatchCards(odus) {
  const selected = shuffle(odus).slice(0, MATCH_N);
  const cards = [];
  selected.forEach((odu, i) => {
    cards.push({ id: `n${i}`, pairId: i, face: 'name',  odu });
    cards.push({ id: `g${i}`, pairId: i, face: 'glyph', odu });
  });
  return shuffle(cards);
}

// ════════════════════════════════════════════════════════════
// ORISA DATA
// ════════════════════════════════════════════════════════════

const ORISA = [
  { id:1,  name:'Ogun',        yoruba:'Ògún',       odu:'Ogunda',
    domains:['Iron','War','Labor','Roads','Hunting','Technology'],
    element:'Iron',         color:'Green & Black',   symbol:'Machete (Ada)',
    nature:'The warrior-blacksmith who forges iron and clears all paths forward' },
  { id:2,  name:'Sango',       yoruba:'Ṣàngó',       odu:'Okanran',
    domains:['Thunder','Lightning','Fire','Justice','Royalty','Drums'],
    element:'Lightning',    color:'Red & White',     symbol:'Double axe (Oshe)',
    nature:'The royal Orisa of thunder who dispenses lightning and cosmic justice' },
  { id:3,  name:'Osun',        yoruba:'Òṣun',        odu:'Ose',
    domains:['Love','Fertility','Rivers','Beauty','Medicine','Sweetness'],
    element:'Sweet Water',  color:'Yellow & Gold',   symbol:'Brass mirror (Abebe)',
    nature:'The golden river Orisa of love, beauty, and healing abundance' },
  { id:4,  name:'Orunmila',    yoruba:'Ọrúnmìlà',   odu:'Ogbe',
    domains:['Wisdom','Divination','Destiny','Knowledge','Ifa','Truth'],
    element:'Earth',        color:'Green & Yellow',  symbol:'Divination tray (Opon Ifa)',
    nature:'Witness of all creation, keeper of destiny and the Ifa oracle' },
  { id:5,  name:'Obatala',     yoruba:'Obàtálá',     odu:'Ofun',
    domains:['Purity','Creation','Morality','Peace','White Cloth','Justice'],
    element:'White Clay',   color:'White',           symbol:'White staff (Opasoro)',
    nature:'The serene sculptor of human bodies who governs purity and moral order' },
  { id:6,  name:'Esu',         yoruba:'Èṣù',         odu:'Ogbe',
    domains:['Crossroads','Communication','Fate','Trickery','Markets','Beginnings'],
    element:'Ash',          color:'Black & Red',     symbol:'Hooked staff (Ogo)',
    nature:'The divine messenger who opens every crossroads and guards every beginning' },
  { id:7,  name:'Yemoja',      yoruba:'Yemọja',      odu:'Osa',
    domains:['Ocean','Motherhood','Children','Water','Dreams','Protection'],
    element:'Salt Water',   color:'Blue & White',    symbol:'Cowrie shells',
    nature:'The great mother of waters who protects all children and guides dreams' },
  { id:8,  name:'Oya',         yoruba:'Ọya',         odu:'Osa',
    domains:['Wind','Storms','Change','Marketplace','Ancestors','Rebirth'],
    element:'Wind',         color:'Purple & Maroon', symbol:'Nine copper bracelets',
    nature:'The fierce storm Orisa who guards the gates of change and transformation' },
  { id:9,  name:'Osanyin',     yoruba:'Òṣanyìn',     odu:'Ika',
    domains:['Herbs','Medicine','Forest','Healing','Plants','Secrets'],
    element:'Leaves',       color:'Green',           symbol:'Iron bird staff',
    nature:'The one-legged herbalist keeper of all plant medicine in the forest' },
  { id:10, name:'Soponna',     yoruba:'Ṣọpọna',      odu:'Oturupon',
    domains:['Earth','Disease','Healing','Karma','Smallpox','Transformation'],
    element:'Earth',        color:'Purple & Brown',  symbol:'Broom (Saara)',
    nature:'The earth Orisa of disease, healing, and karmic balance' },
  { id:11, name:'Ibeji',       yoruba:'Ìbejì',       odu:'Ose',
    domains:['Twins','Children','Joy','Good Fortune','Play','Abundance'],
    element:'Air',          color:'Red & Blue',      symbol:'Twin wooden figures (Ere Ibeji)',
    nature:'The divine twins who bring double blessings, joy, and good fortune' },
  { id:12, name:'Erinle',      yoruba:'Ẹrinlẹ',      odu:'Irete',
    domains:['Hunting','Rivers','Forest','Medicine','Fish','Abundance'],
    element:'Fresh Water',  color:'Blue & Yellow',   symbol:'Fish and arrow',
    nature:'The hunter-healer who dwells where the river meets the forest' },
  { id:13, name:'Aganju',      yoruba:'Agànjù',       odu:'Okanran',
    domains:['Volcano','Wilderness','Earth','Desert','Strength','Passage'],
    element:'Fire & Earth', color:'Red & Brown',     symbol:'Staff of fire',
    nature:'The volcano Orisa of raw earth-force, wilderness, and difficult passages' },
  { id:14, name:'Nana Buruku', yoruba:'Nàná Búùkù',  odu:'Oyeku',
    domains:['Primordial Water','Earth','Death','Wisdom','Ancestors','Swamps'],
    element:'Still Water',  color:'Purple & White',  symbol:'Broom without a handle',
    nature:'The ancient grandmother of still waters, deep earth, and ancestral wisdom' },
  { id:15, name:'Oduduwa',     yoruba:'Odùduwà',      odu:'Ogbe',
    domains:['Creation','Ancestry','Earth','Kingship','Origins','Foundation'],
    element:'White Clay',   color:'White & Gold',    symbol:'Iron chain (Ileke)',
    nature:'The primordial ancestor who descended from above to shape the earth' },
  { id:16, name:'Ori',         yoruba:'Orí',          odu:'Iwori',
    domains:['Destiny','Inner Self','Consciousness','Luck','Prayer','Identity'],
    element:'Spirit',       color:'White',           symbol:'Personal shrine (Ile Ori)',
    nature:'Your personal divine essence — the inner head that holds your true destiny' },
];

// ════════════════════════════════════════════════════════════
// IFAGATES DATA — Logic Gate Training
// ════════════════════════════════════════════════════════════

const GATES = [
  { id:'AND',  inputs:2, name:'AND',  label:'AND Gate',
    color:'#00e676',
    desc: 'Output is 1 only when ALL inputs are 1',
    rule: 'ALL inputs must be 1 → output = 1',
    table:[{a:0,b:0,out:0},{a:0,b:1,out:0},{a:1,b:0,out:0},{a:1,b:1,out:1}] },
  { id:'OR',   inputs:2, name:'OR',   label:'OR Gate',
    color:'#ffab40',
    desc: 'Output is 1 when ANY input is 1',
    rule: 'ANY input being 1 → output = 1',
    table:[{a:0,b:0,out:0},{a:0,b:1,out:1},{a:1,b:0,out:1},{a:1,b:1,out:1}] },
  { id:'NOT',  inputs:1, name:'NOT',  label:'NOT Gate',
    color:'#ff4081',
    desc: 'Output is the OPPOSITE of the input (inverter)',
    rule: 'Flips 0 → 1 and 1 → 0',
    table:[{a:0,out:1},{a:1,out:0}] },
  { id:'NAND', inputs:2, name:'NAND', label:'NAND Gate',
    color:'#69f0ae',
    desc: 'Output is 0 only when ALL inputs are 1 (NOT AND)',
    rule: 'Output is 0 only if ALL inputs are 1 — otherwise 1',
    table:[{a:0,b:0,out:1},{a:0,b:1,out:1},{a:1,b:0,out:1},{a:1,b:1,out:0}] },
  { id:'NOR',  inputs:2, name:'NOR',  label:'NOR Gate',
    color:'#ff6e40',
    desc: 'Output is 1 only when ALL inputs are 0 (NOT OR)',
    rule: 'Output is 1 only if ALL inputs are 0 — otherwise 0',
    table:[{a:0,b:0,out:1},{a:0,b:1,out:0},{a:1,b:0,out:0},{a:1,b:1,out:0}] },
  { id:'XOR',  inputs:2, name:'XOR',  label:'XOR Gate',
    color:'#40c4ff',
    desc: 'Output is 1 when inputs are DIFFERENT',
    rule: 'Output is 1 only when the two inputs differ',
    table:[{a:0,b:0,out:0},{a:0,b:1,out:1},{a:1,b:0,out:1},{a:1,b:1,out:0}] },
  { id:'XNOR', inputs:2, name:'XNOR', label:'XNOR Gate',
    color:'#ea80fc',
    desc: 'Output is 1 when inputs are the SAME',
    rule: 'Output is 1 only when both inputs match',
    table:[{a:0,b:0,out:1},{a:0,b:1,out:0},{a:1,b:0,out:0},{a:1,b:1,out:1}] },
];

const GATE_MAP = Object.fromEntries(GATES.map(g => [g.id, g]));

// ── Odu names in order (mod-16 circle) ──
const ODU_NAMES = [
  'Ogbe', 'Oyeku', 'Iwori', 'Odi', 'Irosun', 'Owonrin', 'Obara', 'Okanran',
  'Ogunda', 'Osa', 'Ika', 'Oturupon', 'Otura', 'Irete', 'Ose', 'Ofun',
];

// ════════════════════════════════════════════════════════════
// QUESTION GENERATION — ORISA QUIZ
// ════════════════════════════════════════════════════════════

function makeOrisaQuestion(type, orisa, all) {
  const others = shuffle(all.filter(o => o.id !== orisa.id));

  if (type === 'domain') {
    const domain  = shuffle(orisa.domains)[0];
    const choices = shuffle([orisa, ...others.slice(0, 3)]);
    return {
      type, orisa, display: null,
      prompt: `Which Orisa governs "${domain}"?`,
      choices: choices.map(o => ({ label: o.name, value: o.id })),
      answer:  orisa.id,
      reveal:  `${orisa.name} rules: ${orisa.domains.join(', ')}`,
    };
  }
  if (type === 'element') {
    const pool    = shuffle([...new Set(all.map(o => o.element))]);
    const choices = shuffle([orisa.element, ...pool.filter(e => e !== orisa.element).slice(0, 3)]);
    return {
      type, orisa, display: 'orisa',
      prompt:  `What element or force does ${orisa.name} control?`,
      choices: choices.map(e => ({ label: e, value: e })),
      answer:  orisa.element,
      reveal:  `${orisa.name} → ${orisa.element}`,
    };
  }
  if (type === 'color') {
    const pool    = shuffle([...new Set(all.map(o => o.color))]);
    const choices = shuffle([orisa.color, ...pool.filter(c => c !== orisa.color).slice(0, 3)]);
    return {
      type, orisa, display: 'orisa',
      prompt:  `What colors are sacred to ${orisa.name}?`,
      choices: choices.map(c => ({ label: c, value: c })),
      answer:  orisa.color,
      reveal:  `${orisa.name}'s sacred colors: ${orisa.color}`,
    };
  }
  if (type === 'symbol') {
    const pool    = shuffle([...new Set(all.map(o => o.symbol))]);
    const choices = shuffle([orisa.symbol, ...pool.filter(s => s !== orisa.symbol).slice(0, 3)]);
    return {
      type, orisa, display: 'orisa',
      prompt:  `What is the sacred symbol of ${orisa.name}?`,
      choices: choices.map(s => ({ label: s, value: s })),
      answer:  orisa.symbol,
      reveal:  `${orisa.name}'s symbol: ${orisa.symbol}`,
    };
  }
  if (type === 'nature') {
    const choices = shuffle([orisa, ...others.slice(0, 3)]);
    return {
      type, orisa, display: null,
      prompt:  orisa.nature,
      choices: choices.map(o => ({ label: o.name, value: o.id })),
      answer:  orisa.id,
      reveal:  `${orisa.name} (${orisa.yoruba}) — ${orisa.domains.slice(0, 3).join(', ')}`,
    };
  }
  if (type === 'odu') {
    const pool    = shuffle([...new Set(all.map(o => o.odu))]);
    const choices = shuffle([orisa.odu, ...pool.filter(d => d !== orisa.odu).slice(0, 3)]);
    return {
      type, orisa, display: 'orisa',
      prompt:  `Which Odu in Ifa is associated with ${orisa.name}?`,
      choices: choices.map(d => ({ label: d, value: d })),
      answer:  orisa.odu,
      reveal:  `${orisa.name} is linked to Odu ${orisa.odu}`,
    };
  }
  return null;
}

function makeOrisaQuestions(count) {
  const types = ['domain', 'element', 'color', 'symbol', 'nature', 'odu'];
  const specs  = [];
  ORISA.forEach(orisa => types.forEach(type => specs.push({ type, orisa })));
  return shuffle(specs)
    .slice(0, count)
    .map(({ type, orisa }) => makeOrisaQuestion(type, orisa, ORISA))
    .filter(Boolean);
}

// ════════════════════════════════════════════════════════════
// MATCH CARD SETUP — ORISA MATCH
// ════════════════════════════════════════════════════════════

function makeOrisaMatchCards() {
  const selected = shuffle(ORISA).slice(0, ORISA_MATCH_N);
  const cards = [];
  selected.forEach((orisa, i) => {
    cards.push({ id: `on${i}`, pairId: i, face: 'name',   orisa });
    cards.push({ id: `od${i}`, pairId: i, face: 'domain', orisa });
  });
  return shuffle(cards);
}

// ════════════════════════════════════════════════════════════
// QUESTION GENERATION — IFAGATES
// ════════════════════════════════════════════════════════════

function makeGatesQuestion(type) {
  const gate   = GATES[Math.floor(Math.random() * GATES.length)];
  const others = shuffle(GATES.filter(g => g.id !== gate.id));

  if (type === 'output') {
    const row = gate.table[Math.floor(Math.random() * gate.table.length)];
    return {
      type: 'output', gateId: gate.id,
      inputs: gate.inputs === 1 ? { a: row.a } : { a: row.a, b: row.b },
      prompt: gate.inputs === 1
        ? `The ${gate.label} has input A = ${row.a}. What is the output?`
        : `The ${gate.label} has A = ${row.a}, B = ${row.b}. What is the output?`,
      choices: ['0', '1'],
      answer:  String(row.out),
      explain: `${gate.label}: ${gate.rule}`,
    };
  }

  if (type === 'identify') {
    // Show a truth-table row; player names the gate that produces it
    const twoIn = GATES.filter(g => g.inputs === 2);
    const tg    = twoIn[Math.floor(Math.random() * twoIn.length)];
    const row   = tg.table[Math.floor(Math.random() * tg.table.length)];
    const wrong = shuffle(twoIn.filter(g => {
      if (g.id === tg.id) return false;
      const r = g.table.find(r => r.a === row.a && r.b === row.b);
      return r && r.out !== row.out;
    })).slice(0, 3);
    if (wrong.length < 2) return makeGatesQuestion('symbol');
    return {
      type: 'identify', gateId: tg.id,
      inputs: { a: row.a, b: row.b },
      showOut: row.out,
      prompt: `A gate has A = ${row.a}, B = ${row.b} → Output = ${row.out}. Which gate is this?`,
      choices: shuffle([tg.label, ...wrong.map(g => g.label)]).slice(0, 4),
      answer:  tg.label,
      explain: tg.rule,
    };
  }

  if (type === 'symbol') {
    return {
      type: 'symbol', gateId: gate.id,
      inputs: {},
      prompt: 'Which logic gate symbol is shown?',
      choices: shuffle([gate.label, ...others.slice(0, 3).map(g => g.label)]),
      answer:  gate.label,
      explain: gate.desc,
    };
  }

  if (type === 'concept') {
    const pool = [
      { prompt:'Which gate outputs 1 only when ALL inputs are 1?',                  answer:'AND'  },
      { prompt:'Which gate outputs 1 when ANY input is 1?',                         answer:'OR'   },
      { prompt:'Which gate FLIPS its input — 0 becomes 1, and 1 becomes 0?',       answer:'NOT'  },
      { prompt:'Which gate is like AND, but with the output inverted?',             answer:'NAND' },
      { prompt:'Which gate is like OR, but with the output inverted?',              answer:'NOR'  },
      { prompt:'Which gate outputs 1 when its two inputs are DIFFERENT?',           answer:'XOR'  },
      { prompt:'Which gate outputs 1 when its two inputs are EXACTLY the SAME?',   answer:'XNOR' },
      { prompt:'Which gate is also called the "exclusive OR" gate?',                answer:'XOR'  },
      { prompt:'Which gate is sometimes called the "universal gate"?',              answer:'NAND' },
      { prompt:'Which single-input gate acts as a logical inverter?',               answer:'NOT'  },
      { prompt:'AND + NOT combined in one gate gives which gate?',                  answer:'NAND' },
      { prompt:'OR + NOT combined in one gate gives which gate?',                   answer:'NOR'  },
    ];
    const cq    = pool[Math.floor(Math.random() * pool.length)];
    const cg    = GATE_MAP[cq.answer];
    const cwrng = shuffle(GATES.filter(g => g.id !== cq.answer)).slice(0, 3);
    return {
      type: 'concept', gateId: cg.id,
      inputs: {},
      prompt: cq.prompt,
      choices: shuffle([cg.label, ...cwrng.map(g => g.label)]),
      answer:  cg.label,
      explain: cg.desc,
    };
  }

  return makeGatesQuestion('output');
}

// ════════════════════════════════════════════════════════════
// QUESTION GENERATION — IFAMOD (Modular Arithmetic)
// ════════════════════════════════════════════════════════════

function makeModQuestion(type, roundIdx) {
  const level = roundIdx < 4 ? 0 : roundIdx < 8 ? 1 : 2;

  if (type === 'basic') {
    const MODS = [[2, 3, 4], [4, 6, 8, 10], [8, 10, 12, 16]][level];
    const N    = MODS[Math.floor(Math.random() * MODS.length)];
    const X    = N + 1 + Math.floor(Math.random() * N * (level === 0 ? 4 : level === 1 ? 8 : 14));
    const R    = X % N;
    const pool = Array.from({ length: N }, (_, i) => i).filter(v => v !== R);
    return {
      type: 'basic',
      prompt: `What is ${X} mod ${N}?`,
      display: { X, N, R },
      choices: shuffle([R, ...shuffle(pool).slice(0, 3)]).map(String),
      answer:  String(R),
      explain: `${X} ÷ ${N} = ${Math.floor(X / N)} with remainder ${R}. So ${X} mod ${N} = ${R}.`,
    };
  }

  if (type === 'odu') {
    const startIdx = Math.floor(Math.random() * 16);
    const jump     = 1 + Math.floor(Math.random() * 14);
    const endIdx   = (startIdx + jump) % 16;
    const startName = ODU_NAMES[startIdx];
    const endName   = ODU_NAMES[endIdx];
    const pool      = ODU_NAMES.filter((_, i) => i !== endIdx);
    return {
      type: 'odu',
      prompt: `${startName} is Odu #${startIdx + 1}. Count ${jump} steps forward in the 16-Odu circle. Which Odu do you land on?`,
      display: { startIdx, endIdx, jump },
      choices: shuffle([endName, ...shuffle(pool).slice(0, 3)]),
      answer:  endName,
      explain: `Odu circle: start at #${startIdx + 1} (${startName}), count ${jump} forward, wrap at 16 → land on #${endIdx + 1} (${endName}).`,
    };
  }

  if (type === 'clock') {
    const H      = 1 + Math.floor(Math.random() * 12);
    const K      = 1 + Math.floor(Math.random() * 11);
    const result = (H + K) % 12 || 12;
    const pool   = shuffle(Array.from({ length: 12 }, (_, i) => i + 1).filter(v => v !== result));
    return {
      type: 'clock',
      prompt: `The clock shows ${H}:00. You add ${K} hours. What time is it now?`,
      display: { H, K, result },
      choices: shuffle([result, ...pool.slice(0, 3)]).map(v => `${v}:00`),
      answer:  `${result}:00`,
      explain: `(${H} + ${K}) mod 12 = ${result}. Clock times cycle every 12 hours — that's modular arithmetic!`,
    };
  }

  if (type === 'equiv') {
    const MODS = [[2, 3, 4], [4, 6, 8], [6, 8, 10, 12]][level];
    const N    = MODS[Math.floor(Math.random() * MODS.length)];
    const X    = N * 2 + Math.floor(Math.random() * (N * 3));
    const R    = X % N;
    // Build pool of numbers ≡ R (mod N), excluding X
    const corrPool = [];
    for (let k = 0; k * N + R <= N * 7; k++) {
      const y = k * N + R;
      if (y !== X) corrPool.push(y);
    }
    const correct = corrPool[Math.floor(Math.random() * corrPool.length)];
    // Distractors: different remainders
    const diffRems = shuffle(Array.from({ length: N }, (_, i) => i).filter(r => r !== R));
    const wrongs   = diffRems.slice(0, 3).map(wr => wr + N * (1 + Math.floor(Math.random() * 2)));
    return {
      type: 'equiv',
      prompt: `Which number has the SAME remainder as ${X} when divided by ${N}?`,
      display: { X, N, R },
      choices: shuffle([correct, ...wrongs]).map(String),
      answer:  String(correct),
      explain: `${X} mod ${N} = ${R}. We need a number where (number mod ${N}) also equals ${R}. That's ${correct}!`,
    };
  }

  return makeModQuestion('basic', roundIdx);
}

function makeModQuestions(n) {
  const typePool = shuffle([
    'basic', 'basic', 'basic',
    'odu',   'odu',   'odu',
    'clock', 'clock',
    'equiv', 'equiv',
  ]);
  return Array.from({ length: n }, (_, i) => makeModQuestion(typePool[i % typePool.length], i));
}

function makeGatesQuestions(n) {
  const pool = shuffle([
    'output','output','output','output',
    'symbol','symbol','symbol',
    'identify','identify',
    'concept',
  ]);
  return Array.from({ length: n }, (_, i) => makeGatesQuestion(pool[i % pool.length]));
}

// ════════════════════════════════════════════════════════════
// IFASCII — DATA & QUESTION GENERATION
// ════════════════════════════════════════════════════════════

const ASCII_CHARS = [
  // Control characters
  { code:  0, char: 'NUL', hex: '00', cat: 'Control',   desc: 'Null — the start of all codes' },
  { code:  8, char: 'BS',  hex: '08', cat: 'Control',   desc: 'Backspace' },
  { code:  9, char: 'TAB', hex: '09', cat: 'Control',   desc: 'Horizontal Tab' },
  { code: 10, char: 'LF',  hex: '0A', cat: 'Control',   desc: 'Line Feed (newline)' },
  { code: 13, char: 'CR',  hex: '0D', cat: 'Control',   desc: 'Carriage Return' },
  { code: 27, char: 'ESC', hex: '1B', cat: 'Control',   desc: 'Escape' },
  { code:127, char: 'DEL', hex: '7F', cat: 'Control',   desc: 'Delete' },
  // Symbols & Punctuation
  { code: 32, char: '(SP)',hex: '20', cat: 'Symbol',    desc: 'Space' },
  { code: 33, char: '!',   hex: '21', cat: 'Symbol',    desc: 'Exclamation Mark' },
  { code: 35, char: '#',   hex: '23', cat: 'Symbol',    desc: 'Hash / Number Sign' },
  { code: 36, char: '$',   hex: '24', cat: 'Symbol',    desc: 'Dollar Sign' },
  { code: 37, char: '%',   hex: '25', cat: 'Symbol',    desc: 'Percent' },
  { code: 42, char: '*',   hex: '2A', cat: 'Symbol',    desc: 'Asterisk' },
  { code: 43, char: '+',   hex: '2B', cat: 'Symbol',    desc: 'Plus Sign' },
  { code: 45, char: '-',   hex: '2D', cat: 'Symbol',    desc: 'Hyphen / Minus' },
  { code: 47, char: '/',   hex: '2F', cat: 'Symbol',    desc: 'Slash / Solidus' },
  { code: 60, char: '<',   hex: '3C', cat: 'Symbol',    desc: 'Less-Than Sign' },
  { code: 61, char: '=',   hex: '3D', cat: 'Symbol',    desc: 'Equals Sign' },
  { code: 62, char: '>',   hex: '3E', cat: 'Symbol',    desc: 'Greater-Than Sign' },
  { code: 63, char: '?',   hex: '3F', cat: 'Symbol',    desc: 'Question Mark' },
  { code: 64, char: '@',   hex: '40', cat: 'Symbol',    desc: 'At Sign / Commercial At' },
  // Digits
  { code: 48, char: '0',   hex: '30', cat: 'Digit',     desc: 'Digit Zero' },
  { code: 49, char: '1',   hex: '31', cat: 'Digit',     desc: 'Digit One' },
  { code: 50, char: '2',   hex: '32', cat: 'Digit',     desc: 'Digit Two' },
  { code: 57, char: '9',   hex: '39', cat: 'Digit',     desc: 'Digit Nine' },
  // Uppercase Letters
  { code: 65, char: 'A',   hex: '41', cat: 'Uppercase', desc: 'Latin Capital Letter A' },
  { code: 66, char: 'B',   hex: '42', cat: 'Uppercase', desc: 'Latin Capital Letter B' },
  { code: 70, char: 'F',   hex: '46', cat: 'Uppercase', desc: 'Latin Capital Letter F' },
  { code: 73, char: 'I',   hex: '49', cat: 'Uppercase', desc: 'Latin Capital Letter I' },
  { code: 79, char: 'O',   hex: '4F', cat: 'Uppercase', desc: 'Latin Capital Letter O' },
  { code: 85, char: 'U',   hex: '55', cat: 'Uppercase', desc: 'Latin Capital Letter U' },
  { code: 90, char: 'Z',   hex: '5A', cat: 'Uppercase', desc: 'Latin Capital Letter Z' },
  // Lowercase Letters
  { code: 97,  char: 'a',  hex: '61', cat: 'Lowercase', desc: 'Latin Small Letter A' },
  { code: 98,  char: 'b',  hex: '62', cat: 'Lowercase', desc: 'Latin Small Letter B' },
  { code: 102, char: 'f',  hex: '66', cat: 'Lowercase', desc: 'Latin Small Letter F' },
  { code: 105, char: 'i',  hex: '69', cat: 'Lowercase', desc: 'Latin Small Letter I' },
  { code: 111, char: 'o',  hex: '6F', cat: 'Lowercase', desc: 'Latin Small Letter O' },
  { code: 117, char: 'u',  hex: '75', cat: 'Lowercase', desc: 'Latin Small Letter U' },
  { code: 122, char: 'z',  hex: '7A', cat: 'Lowercase', desc: 'Latin Small Letter Z' },
];

function asciiToIfaBits(code) {
  return code.toString(2).padStart(8, '0').split('').map(b => b === '1' ? 'O' : '|').join(' ');
}

function makeAsciiQuestion(type, entries) {
  const entry  = shuffle(entries)[0];
  const others = shuffle(entries.filter(e => e.code !== entry.code));
  const disp   = entry.char;

  if (type === 'char-to-dec') {
    const choices = shuffle([entry.code, ...others.slice(0, 3).map(e => e.code)]).map(String);
    return { type, prompt: 'What is the ASCII decimal code for:', display: disp,
      choices, answer: String(entry.code),
      explain: `"${disp}" = ASCII ${entry.code} (hex: 0x${entry.hex})`,
      ifaNote: `IFABit / Opele pattern: ${asciiToIfaBits(entry.code)}` };
  }
  if (type === 'dec-to-char') {
    const choices = shuffle([disp, ...others.slice(0, 3).map(e => e.char)]);
    return { type, prompt: `ASCII code ${entry.code} represents which character?`, display: String(entry.code),
      choices, answer: disp,
      explain: `ASCII ${entry.code} = "${disp}" — ${entry.desc}`,
      ifaNote: `Binary: ${entry.code.toString(2).padStart(8,'0')} — 8-bit, just like the IFABit / Opele system` };
  }
  if (type === 'char-to-hex') {
    const choices = shuffle([entry.hex, ...others.slice(0, 3).map(e => e.hex)]).map(h => `0x${h}`);
    return { type, prompt: 'What is the hex (base-16) ASCII code for:', display: disp,
      choices, answer: `0x${entry.hex}`,
      explain: `"${disp}" = 0x${entry.hex} = decimal ${entry.code}`,
      ifaNote: `Ifa has 16 Odu — the 16 hex digits (0–F). Every hex code is an Odu path!` };
  }
  if (type === 'ifa-bit') {
    const bits    = asciiToIfaBits(entry.code);
    const choices = shuffle([disp, ...others.slice(0, 3).map(e => e.char)]);
    return { type, prompt: 'This IFABit (Opele) pattern encodes which ASCII character?', display: bits,
      choices, answer: disp,
      explain: `${bits} = binary ${entry.code.toString(2).padStart(8,'0')} = ${entry.code} = "${disp}"`,
      ifaNote: `The Opele chain has 8 seeds — Ogbe (O) = 1, Oyeku (|) = 0. Same as 8-bit ASCII!` };
  }
}

function makeAsciiQuestions(n) {
  const typePool = shuffle([
    'char-to-dec','char-to-dec','char-to-dec',
    'dec-to-char','dec-to-char','dec-to-char',
    'char-to-hex','char-to-hex',
    'ifa-bit',    'ifa-bit',
  ]);
  return Array.from({ length: n }, (_, i) => makeAsciiQuestion(typePool[i % typePool.length], ASCII_CHARS));
}

// ════════════════════════════════════════════════════════════
// IFA-UNICODE — DATA & QUESTION GENERATION
// ════════════════════════════════════════════════════════════

// 16 principal Odu → 4-bit codes → hexadecimal digits 0–F
const ODU_HEX_MAP = [
  { hex: '0', val:  0, odu: 'Oyeku',    code: '0000', yoruba: 'Ọyẹkú'    },
  { hex: '1', val:  1, odu: 'Obara',    code: '0001', yoruba: 'Ọbàrà'    },
  { hex: '2', val:  2, odu: 'Ose',      code: '0010', yoruba: 'Òṣé'      },
  { hex: '3', val:  3, odu: 'Irosun',   code: '0011', yoruba: 'Ìrósùn'   },
  { hex: '4', val:  4, odu: 'Otura',    code: '0100', yoruba: 'Òtúrá'    },
  { hex: '5', val:  5, odu: 'Ika',      code: '0101', yoruba: 'Ìká'      },
  { hex: '6', val:  6, odu: 'Iwori',    code: '0110', yoruba: 'Ìwòrì'    },
  { hex: '7', val:  7, odu: 'Ogunda',   code: '0111', yoruba: 'Ògúndá'   },
  { hex: '8', val:  8, odu: 'Okanran',  code: '1000', yoruba: 'Ọkànràn'  },
  { hex: '9', val:  9, odu: 'Odi',      code: '1001', yoruba: 'Òdí'      },
  { hex: 'A', val: 10, odu: 'Oturupun', code: '1010', yoruba: 'Òtúrúpọ̀n' },
  { hex: 'B', val: 11, odu: 'Irete',    code: '1011', yoruba: 'Ìrẹtẹ̀'    },
  { hex: 'C', val: 12, odu: 'Owonrin',  code: '1100', yoruba: 'Ọwọnrín'  },
  { hex: 'D', val: 13, odu: 'Ofun',     code: '1101', yoruba: 'Òfún'     },
  { hex: 'E', val: 14, odu: 'Osa',      code: '1110', yoruba: 'Òṣà'      },
  { hex: 'F', val: 15, odu: 'Ogbe',     code: '1111', yoruba: 'Ogbè'     },
];

const UNICODE_CHARS = [
  // Basic Latin
  { cp: 0x0041, char: 'A',    name: 'Latin Capital Letter A',                block: 'Basic Latin' },
  { cp: 0x0061, char: 'a',    name: 'Latin Small Letter A',                  block: 'Basic Latin' },
  { cp: 0x0030, char: '0',    name: 'Digit Zero',                            block: 'Basic Latin' },
  { cp: 0x0020, char: '(SP)', name: 'Space',                                 block: 'Basic Latin' },
  // Latin-1 Supplement
  { cp: 0x00A9, char: '©',    name: 'Copyright Sign',                        block: 'Latin-1 Supplement' },
  { cp: 0x00AE, char: '®',    name: 'Registered Sign',                       block: 'Latin-1 Supplement' },
  { cp: 0x00B0, char: '°',    name: 'Degree Sign',                           block: 'Latin-1 Supplement' },
  { cp: 0x00A3, char: '£',    name: 'Pound Sign',                            block: 'Latin-1 Supplement' },
  { cp: 0x00B1, char: '±',    name: 'Plus-Minus Sign',                       block: 'Latin-1 Supplement' },
  // Currency
  { cp: 0x20AC, char: '€',    name: 'Euro Sign',                             block: 'Currency Symbols' },
  { cp: 0x20A6, char: '₦',    name: 'Naira Sign',                            block: 'Currency Symbols' },
  // Mathematical
  { cp: 0x221E, char: '∞',    name: 'Infinity',                              block: 'Mathematical Operators' },
  { cp: 0x2211, char: '∑',    name: 'N-Ary Summation (Sigma)',               block: 'Mathematical Operators' },
  // Greek
  { cp: 0x03C0, char: 'π',    name: 'Greek Small Letter Pi',                 block: 'Greek and Coptic' },
  { cp: 0x03A9, char: 'Ω',    name: 'Greek Capital Letter Omega',            block: 'Greek and Coptic' },
  // Yoruba / African script
  { cp: 0x1EB9, char: 'ẹ',    name: 'Latin Small Letter E with Dot Below',   block: 'Latin Extended Additional', yoruba: true },
  { cp: 0x1ECD, char: 'ọ',    name: 'Latin Small Letter O with Dot Below',   block: 'Latin Extended Additional', yoruba: true },
  { cp: 0x1E63, char: 'ṣ',    name: 'Latin Small Letter S with Dot Below',   block: 'Latin Extended Additional', yoruba: true },
  // Miscellaneous Symbols
  { cp: 0x2605, char: '★',    name: 'Black Star',                            block: 'Miscellaneous Symbols' },
  { cp: 0x2764, char: '❤',    name: 'Heavy Black Heart',                     block: 'Dingbats' },
  { cp: 0x2600, char: '☀',    name: 'Black Sun with Rays',                   block: 'Miscellaneous Symbols' },
  { cp: 0x263A, char: '☺',    name: 'White Smiling Face',                    block: 'Miscellaneous Symbols' },
  // Arrows
  { cp: 0x2192, char: '→',    name: 'Rightwards Arrow',                      block: 'Arrows' },
  { cp: 0x21D2, char: '⇒',    name: 'Rightwards Double Arrow',               block: 'Arrows' },
];

function fmtCP(cp) { return 'U+' + cp.toString(16).toUpperCase().padStart(4, '0'); }

function makeUnicodeQuestion(type, entries) {
  if (type === 'ifa-hex') {
    const odu = shuffle(ODU_HEX_MAP)[0];
    const others = shuffle(ODU_HEX_MAP.filter(o => o.hex !== odu.hex));
    const choices = shuffle([odu.odu, ...others.slice(0, 3).map(o => o.odu)]);
    return { type, prompt: `In the IFA-Unicode system, which Odu maps to hex digit ${odu.hex} (value ${odu.val})?`,
      display: odu.hex,
      choices, answer: odu.odu,
      explain: `${odu.odu} (${odu.yoruba}) — IFABit: ${odu.code} = decimal ${odu.val} = hex ${odu.hex}`,
      ifaNote: `The 16 Odu of Ifa are the 16 hex digits (0–F). Every Unicode U+XXXX is a 4-Odu path!` };
  }
  const entry  = shuffle(entries)[0];
  const others = shuffle(entries.filter(e => e.cp !== entry.cp));
  const cpStr  = fmtCP(entry.cp);

  if (type === 'char-to-point') {
    const choices = shuffle([cpStr, ...others.slice(0, 3).map(e => fmtCP(e.cp))]);
    return { type, prompt: 'What is the Unicode code point for:', display: entry.char,
      choices, answer: cpStr,
      explain: `"${entry.char}" = ${cpStr} — ${entry.name}`,
      ifaNote: `${cpStr}: The 4 hex digits are 4 Odu. ${entry.name} has its own unique Ifa path!` };
  }
  if (type === 'point-to-char') {
    const choices = shuffle([entry.char, ...others.slice(0, 3).map(e => e.char)]);
    return { type, prompt: `Which character is at Unicode code point ${cpStr}?`, display: cpStr,
      choices, answer: entry.char,
      explain: `${cpStr} = "${entry.char}" — ${entry.name} (${entry.block})`,
      ifaNote: entry.yoruba
        ? `"${entry.char}" is used in Yoruba, the sacred language of the Ifa tradition`
        : `Block: ${entry.block}` };
  }
  if (type === 'block-identify') {
    const blocks = [...new Set(entries.map(e => e.block))];
    const choices = shuffle([entry.block, ...shuffle(blocks.filter(b => b !== entry.block)).slice(0, 3)]);
    return { type, prompt: 'Which Unicode block does this character belong to?', display: entry.char,
      choices, answer: entry.block,
      explain: `"${entry.char}" (${cpStr}) is in the ${entry.block} block`,
      ifaNote: `Unicode groups all characters into named blocks — as Ifa groups all wisdom into Odu` };
  }
}

function makeUnicodeQuestions(n) {
  const typePool = shuffle([
    'char-to-point','char-to-point','char-to-point',
    'point-to-char','point-to-char','point-to-char',
    'block-identify','block-identify',
    'ifa-hex',       'ifa-hex',
  ]);
  return Array.from({ length: n }, (_, i) => makeUnicodeQuestion(typePool[i % typePool.length], UNICODE_CHARS));
}

// ════════════════════════════════════════════════════════════
// QUESTION GENERATION — IFARCADIA
// ════════════════════════════════════════════════════════════

function buildArcQuestion(type, odu, odus) {
  const others = shuffle(odus.filter(o => o.id !== odu.id));

  if (type === 'arc-identify') {
    // Show Yoruba name → choose English name
    const choices = shuffle([odu, ...others.slice(0, 3)]);
    return {
      type, odu,
      prompt: 'Which Odu is written here?',
      display: 'yoruba',
      choices: choices.map(o => ({ label: o.name, value: o.id })),
      answer: odu.id,
      reveal: `${odu.yoruba} = ${odu.name}`,
    };
  }

  if (type === 'arc-write') {
    // Show English name + glyph → choose Yoruba name
    const choices = shuffle([odu, ...others.slice(0, 3)]);
    return {
      type, odu,
      prompt: `Choose the Yoruba name for ${odu.name}`,
      display: 'glyph',
      choices: choices.map(o => ({ label: o.yoruba, value: o.id })),
      answer: odu.id,
      reveal: `${odu.name} → ${odu.yoruba}`,
    };
  }

  if (type === 'arc-meji') {
    // Show Meji (full) name → choose Yoruba name
    const choices = shuffle([odu, ...others.slice(0, 3)]);
    return {
      type, odu,
      prompt: `Which Odu is known as "${odu.meji}"?`,
      display: null,
      choices: choices.map(o => ({ label: o.yoruba, value: o.id })),
      answer: odu.id,
      reveal: `${odu.meji} → ${odu.yoruba} (${odu.name})`,
    };
  }

  if (type === 'arc-domain') {
    // Show domain keyword → choose Yoruba name
    const domain = shuffle(odu.domains)[0];
    const choices = shuffle([odu, ...others.slice(0, 3)]);
    return {
      type, odu,
      prompt: `Which Odu governs "${domain}"?`,
      display: null,
      choices: choices.map(o => ({ label: o.yoruba, value: o.id })),
      answer: odu.id,
      reveal: `${odu.yoruba} (${odu.name}) — ${odu.domains.slice(0, 3).join(', ')}`,
    };
  }

  return null;
}

function makeArcQuestions(odus, count) {
  const types = ['arc-identify', 'arc-write', 'arc-meji', 'arc-domain'];
  const specs  = [];
  odus.forEach(odu => types.forEach(type => specs.push({ type, odu })));
  return shuffle(specs)
    .slice(0, count)
    .map(({ type, odu }) => buildArcQuestion(type, odu, odus))
    .filter(Boolean);
}

// ════════════════════════════════════════════════════════════
// AYO OLOPON — BOARD LOGIC
// ════════════════════════════════════════════════════════════

function ayoInit() { return Array(AYO_N).fill(AYO_SEEDS); }

function ayoSow(board, from) {
  const b = [...board];
  let seeds = b[from];
  if (!seeds) return { b, last: from };
  b[from] = 0;
  let cur = from;
  while (seeds > 0) {
    cur = (cur + 1) % AYO_N;
    if (cur === from) continue; // skip starting pit
    b[cur]++;
    seeds--;
  }
  return { b, last: cur };
}

function ayoCapture(board, last, playerMove) {
  const b = [...board];
  let captured = 0;
  const oppPits = playerMove ? OYEKU_PITS : OGBE_PITS;
  let cur = last;
  while (oppPits.includes(cur) && (b[cur] === 4 || b[cur] === 8)) {
    captured += b[cur];
    b[cur] = 0;
    cur = (cur - 1 + AYO_N) % AYO_N;
  }
  return { b, captured };
}

function ayoValidMoves(board, isPlayer) {
  const mine = isPlayer ? OGBE_PITS : OYEKU_PITS;
  const opp  = isPlayer ? OYEKU_PITS : OGBE_PITS;
  const moveable = mine.filter(p => board[p] > 0);
  if (opp.some(p => board[p] > 0)) return moveable;
  // Must feed opponent if any move can do so (starvation rule)
  const feeding = moveable.filter(p => {
    const { b } = ayoSow(board, p);
    return opp.some(q => b[q] > 0);
  });
  return feeding.length ? feeding : moveable;
}

function ayoAI(board) {
  const moves = ayoValidMoves(board, false);
  if (!moves.length) return -1;
  let best = moves[0], bestCap = -1;
  for (const m of moves) {
    const { b, last } = ayoSow(board, m);
    const { captured } = ayoCapture(b, last, false);
    if (captured > bestCap) { bestCap = captured; best = m; }
  }
  return best;
}

// ════════════════════════════════════════════════════════════
// IFABIN — BINARY GAME HELPERS
// ════════════════════════════════════════════════════════════

function getBinDifficulty(r) {
  return r < 3 ? 'Baby Bits' : r < 7 ? 'Coder' : 'Hacker';
}

function binTarget(r) {
  if (r < 3) return Math.floor(Math.random() * 14) + 2;    // 2–15  (4-bit)
  if (r < 7) return Math.floor(Math.random() * 55) + 8;    // 8–62  (6-bit)
  return Math.floor(Math.random() * 200) + 55;              // 55–254 (8-bit)
}

function bitsToDecimal(bits) {
  return bits.reduce((acc, b, i) => acc + b * (1 << (7 - i)), 0);
}

function getRoundType(subMode, roundIdx) {
  if (subMode === 'b2d')    return 'b2d';
  if (subMode === 'mix')    return roundIdx % 2 === 0 ? 'd2b' : 'b2d';
  if (subMode === 'opele')  return 'opele';
  if (subMode === 'obi')    return 'obi';
  if (subMode === 'cowrie') return 'cowrie';
  if (subMode === 'odu4')   return 'odu4';
  return 'd2b';
}

// 4-bit codes for the 16 principal Odu (parallel to ODU_NAMES)
const ODU_CODES = [
  '1111','0000','0110','1001','0011','1100','0001','1000',
  '0111','1110','0010','0100','1101','1011','0101','1010',
];

// Convert a 4-element bits array to decimal
function bits4ToDecimal(bits) {
  return bits.reduce((acc, b, i) => acc + b * (1 << (3 - i)), 0);
}

// Build an MCQ question for Odu pattern recognition
function makeOdu4Q(oduIdx) {
  const correct = ODU_NAMES[oduIdx];
  const pool    = shuffle(ODU_NAMES.filter((_, i) => i !== oduIdx));
  const choices = shuffle([correct, ...pool.slice(0, 3)]);
  return { oduIdx, code: ODU_CODES[oduIdx], answerName: correct, choices };
}

// ════════════════════════════════════════════════════════════
// SHARED DISPLAY COMPONENTS
// ════════════════════════════════════════════════════════════

function IfaGlyph({ code, size = 'md', color }) {
  const g = primaryGlyph(code);
  return (
    <span className={`glyph glyph--${size}`} style={color ? { color } : {}}>
      {g.split('').map((ch, i) => {
        const next = g[i + 1];
        const mr = !next ? '0'
          : (ch === 'I' && next === 'I') ? '-0.08em'
          : '-0.22em';
        return <span key={i} style={{ marginRight: mr }}>{ch}</span>;
      })}
    </span>
  );
}

// ── Opele Ifa seed pod (open = Ogbe/IfaZero = 0, closed = Oyeku/IfaOne = 1) ──
function OpelePod({ open, onClick, locked, idx }) {
  const weight = 1 << (7 - idx); // 128, 64, 32, 16, 8, 4, 2, 1
  return (
    <div className="opele-pod-col">
      <span className="opele-pod__weight">{weight}</span>
      <button
        className={`opele-pod opele-pod--${open ? 'open' : 'closed'}${locked ? ' opele-pod--locked' : ''}`}
        onClick={() => !locked && onClick && onClick()}
        disabled={locked}
        title={open ? `Ogbe — open · IfaZero · bit ${weight}` : `Oyeku — closed · IfaOne · bit ${weight}`}
      >
        <svg viewBox="0 0 44 72" width="36" height="58" style={{display:'block',overflow:'visible'}}>
          {open ? (
            // Open pod — Ogbe (0): warm hollow cavity facing up
            <>
              <ellipse cx="22" cy="36" rx="20" ry="34" fill="#2c1a08" stroke="#6b3c12" strokeWidth="1.8"/>
              <ellipse cx="22" cy="36" rx="15" ry="26" fill="#7a3c0c" stroke="#b56518" strokeWidth="1"/>
              <ellipse cx="22" cy="36" rx="10" ry="19" fill="#c48510"/>
              <ellipse cx="22" cy="36" rx="6" ry="13" fill="#e6b030" opacity="0.95"/>
              <ellipse cx="20" cy="28" rx="4" ry="7" fill="rgba(255,245,170,0.5)"/>
              {/* Ogbe mark — open circle */}
              <circle cx="22" cy="37" r="5" fill="none" stroke="rgba(255,242,180,0.9)" strokeWidth="2"/>
            </>
          ) : (
            // Closed pod — Oyeku (1): dark convex back, wood grain
            <>
              <ellipse cx="22" cy="36" rx="20" ry="34" fill="#0d0702" stroke="#38200a" strokeWidth="1.8"/>
              <ellipse cx="22" cy="36" rx="16" ry="27" fill="none" stroke="#261507" strokeWidth="1.1" opacity="0.65"/>
              <ellipse cx="22" cy="36" rx="11" ry="20" fill="none" stroke="#1c1006" strokeWidth="0.7" opacity="0.45"/>
              <ellipse cx="22" cy="36" rx="6"  ry="12" fill="none" stroke="#150d05" strokeWidth="0.5" opacity="0.3"/>
              {/* Center seam ridge */}
              <line x1="22" y1="3" x2="22" y2="69" stroke="#190e04" strokeWidth="2.2" strokeLinecap="round"/>
              {/* Oyeku mark — vertical bar */}
              <rect x="20" y="27" width="4" height="18" rx="2" fill="#4a2b09" opacity="0.95"/>
              {/* 3-D highlight sheen */}
              <ellipse cx="16" cy="25" rx="4.5" ry="9" fill="rgba(255,255,255,0.042)" transform="rotate(-14 16 25)"/>
            </>
          )}
        </svg>
        <span className="opele-pod__lbl">{open ? 'Ogbe' : 'Oyeku'}</span>
        <span className="opele-pod__bit">{open ? '0' : '1'}</span>
      </button>
    </div>
  );
}

// ── Obi Siso kola-nut lobe (face-up = 1, face-down = 0) ──
function KolaLobe({ up, onClick, locked, idx }) {
  const weight = 1 << (3 - idx); // 8, 4, 2, 1
  return (
    <div className="kola-col">
      <span className="kola-col__weight">{weight}</span>
      <button
        className={`kola-lobe kola-lobe--${up ? 'up' : 'down'}${locked ? ' kola-lobe--locked' : ''}`}
        onClick={() => !locked && onClick && onClick()}
        disabled={locked}
        title={`Lobe ${idx + 1}: ${up ? 'face-up · 1 · bit ' + weight : 'face-down · 0 · bit ' + weight}`}
      >
        <svg viewBox="0 0 62 78" width="54" height="68" style={{display:'block',overflow:'visible'}}>
          {up ? (
            // Face-up (1) — red Obi interior: flat face, central vein, warm inner highlight
            <>
              {/* Outer lobe skin */}
              <ellipse cx="31" cy="39" rx="28" ry="36" fill="#7a1818" stroke="#591010" strokeWidth="1.6"/>
              {/* Flesh layers */}
              <ellipse cx="31" cy="39" rx="22" ry="29" fill="#a02222"/>
              <ellipse cx="31" cy="39" rx="16" ry="22" fill="#c03232"/>
              <ellipse cx="31" cy="39" rx="10" ry="14" fill="#d44040" opacity="0.85"/>
              {/* Central vein ridge */}
              <line x1="31" y1="6"  x2="31" y2="72" stroke="#7a1818" strokeWidth="2.2" strokeLinecap="round" opacity="0.75"/>
              {/* Lateral veins */}
              <line x1="31" y1="29" x2="16" y2="45" stroke="#7a1818" strokeWidth="1.1" strokeLinecap="round" opacity="0.45"/>
              <line x1="31" y1="29" x2="46" y2="45" stroke="#7a1818" strokeWidth="1.1" strokeLinecap="round" opacity="0.45"/>
              <line x1="31" y1="49" x2="19" y2="60" stroke="#7a1818" strokeWidth="0.8" strokeLinecap="round" opacity="0.3"/>
              <line x1="31" y1="49" x2="43" y2="60" stroke="#7a1818" strokeWidth="0.8" strokeLinecap="round" opacity="0.3"/>
              {/* Inner highlight glow */}
              <ellipse cx="24" cy="26" rx="9" ry="7" fill="rgba(255,160,140,0.25)" transform="rotate(-22 24 26)"/>
              {/* Binary 1 mark */}
              <text x="31" y="46" textAnchor="middle" fill="rgba(255,210,200,0.9)" fontSize="15" fontWeight="900" fontFamily="monospace">1</text>
            </>
          ) : (
            // Face-down (0) — dark maroon convex back
            <>
              {/* Outer body */}
              <ellipse cx="31" cy="39" rx="28" ry="36" fill="#380a0a" stroke="#4e1010" strokeWidth="1.6"/>
              {/* Dome layers */}
              <ellipse cx="31" cy="39" rx="22" ry="29" fill="#451010"/>
              <ellipse cx="31" cy="37" rx="16" ry="22" fill="#501414"/>
              <ellipse cx="31" cy="36" rx="10" ry="14" fill="#5c1818" opacity="0.8"/>
              {/* Back seam ridge */}
              <line x1="31" y1="4"  x2="31" y2="74" stroke="#260606" strokeWidth="2.8" strokeLinecap="round" opacity="0.7"/>
              {/* Glossy sheen highlight */}
              <ellipse cx="22" cy="24" rx="8" ry="7" fill="rgba(255,120,100,0.07)" transform="rotate(-22 22 24)"/>
              <ellipse cx="22" cy="21" rx="5" ry="4" fill="rgba(255,180,160,0.05)" transform="rotate(-22 22 21)"/>
              {/* Binary 0 mark */}
              <text x="31" y="46" textAnchor="middle" fill="rgba(120,40,40,0.75)" fontSize="15" fontWeight="900" fontFamily="monospace">0</text>
            </>
          )}
        </svg>
        <span className="kola-lobe__lbl">{up ? 'Face-up' : 'Face-dn'}</span>
      </button>
      <span className={`kola-col__bit kola-col__bit--${up ? 'one' : 'zero'}`}
            style={{color: up ? '#d44040' : 'rgba(100,30,30,0.6)'}}>{up ? '1' : '0'}</span>
    </div>
  );
}

// ── Erindinlogun cowrie shell (open mouth-up = 1, closed back-up = 0) ──
function CowrieShell({ open, onClick, locked, idx }) {
  return (
    <button
      className={`cowrie-shell cowrie-shell--${open ? 'open' : 'closed'}${locked ? ' cowrie-shell--locked' : ''}`}
      onClick={() => !locked && onClick && onClick()}
      disabled={locked}
      title={`Shell ${idx + 1}: ${open ? 'mouth-up · open · counts' : 'back-up · silent'}`}
    >
      <svg viewBox="0 0 56 38" width="62" height="42" style={{display:'block',overflow:'visible'}}>
        {open ? (
          <>
            {/* Shell body — warm ivory */}
            <ellipse cx="28" cy="19" rx="26" ry="17" fill="#ddd0a2" stroke="#b8943a" strokeWidth="1.3"/>
            {/* Surface sheen highlight */}
            <ellipse cx="20" cy="12" rx="13" ry="7" fill="rgba(255,248,225,0.52)" transform="rotate(-8 20 12)"/>
            {/* Dark central mouth slit */}
            <ellipse cx="28" cy="19" rx="18" ry="6" fill="#1a0d04"/>
            {/* Serrated teeth along mouth rim */}
            <path d="M10,19 Q11,13.5 13.5,13.5 Q15,13.5 16,15 Q17,13.5 19.5,13.5 Q21,13.5 22,15 Q23,13.5 25.5,13.5 Q27,13.5 28,15 Q29,13.5 31.5,13.5 Q33,13.5 34,15 Q35,13.5 37.5,13.5 Q39,13.5 40,15 Q41,13.5 43.5,13.5 Q46,13.5 46,19"
                  fill="none" stroke="#c4a050" strokeWidth="1.3" opacity="0.72" strokeLinejoin="round"/>
            {/* Inner mouth depth */}
            <ellipse cx="28" cy="19" rx="13" ry="4" fill="#100802" opacity="0.92"/>
            {/* Mouth rim outline */}
            <ellipse cx="28" cy="19" rx="18" ry="6" fill="none" stroke="#c8a855" strokeWidth="0.8" opacity="0.5"/>
            {/* Small interior gleam */}
            <ellipse cx="22" cy="18" rx="4" ry="1.8" fill="rgba(255,235,180,0.12)"/>
          </>
        ) : (
          <>
            {/* Shell body — smooth ivory dome */}
            <ellipse cx="28" cy="19" rx="26" ry="17" fill="#ece3c4" stroke="#c0aa68" strokeWidth="1.3"/>
            {/* Dome highlight */}
            <ellipse cx="20" cy="12" rx="14" ry="7.5" fill="rgba(255,252,238,0.62)" transform="rotate(-8 20 12)"/>
            {/* Central spine ridge */}
            <ellipse cx="28" cy="19" rx="24" ry="3.5" fill="none" stroke="#c8b570" strokeWidth="2" opacity="0.3"/>
            <ellipse cx="28" cy="19" rx="22" ry="2" fill="none" stroke="#e0ca8a" strokeWidth="0.9" opacity="0.2"/>
            {/* Subtle edge shadow */}
            <ellipse cx="28" cy="23" rx="23" ry="12" fill="none" stroke="#a08040" strokeWidth="2.5" opacity="0.1"/>
          </>
        )}
      </svg>
    </button>
  );
}

function LivesRow({ lives }) {
  return (
    <div className="lives-row">
      {Array.from({ length: LIVES }).map((_, i) => (
        <span key={i} className={`heart ${i < lives ? 'heart--on' : 'heart--off'}`}>♥</span>
      ))}
    </div>
  );
}

function ProgressStrip({ current, total }) {
  return (
    <div className="progress-strip">
      <div className="progress-strip__fill" style={{ width: `${(current / total) * 100}%` }} />
    </div>
  );
}

function TimerArc({ seconds, total = Q_TIME }) {
  const pct   = (seconds / total) * 100;
  const r     = 15.9;
  const circ  = 2 * Math.PI * r;
  const dash  = (pct / 100) * circ;
  const urgent = seconds <= 5;
  return (
    <div className={`timer-arc ${urgent ? 'timer-arc--urgent' : ''}`}>
      <svg viewBox="0 0 36 36" className="timer-arc__svg">
        <circle cx="18" cy="18" r={r} className="timer-arc__track" />
        <circle
          cx="18" cy="18" r={r}
          className="timer-arc__ring"
          strokeDasharray={`${dash} ${circ}`}
          strokeDashoffset={circ * 0.25}
          style={urgent ? { stroke: '#e63946' } : {}}
        />
      </svg>
      <span className={`timer-arc__num ${urgent ? 'timer-arc__num--urgent' : ''}`}>{seconds}</span>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// ABOUT MODAL
// ════════════════════════════════════════════════════════════

function AboutModal({ onClose }) {
  return (
    <div className="about-modal" onClick={onClose}>
      <div className="about-card" onClick={e => e.stopPropagation()}>
        <button className="about-close" onClick={onClose}>×</button>

        <div className="about-arc-logo">Ifarcadia</div>
        <div className="about-subtitle">
          Building Ifa STEAM Literacy<br />Using a Gamified Approach
        </div>

        <div className="about-divider" />

        <div className="about-section">
          <div className="about-section__title">About Ifarcadia</div>
          <p className="about-section__body">
            Ifarcadia is a gamified tool designed to develop literacy in both the
            Ifa tradition and the Aebajogbe (Oduduwa) Script — a Yoruba native
            writing system. Play to read, recognise, and learn the Yoruba names
            of the 16 principal Odu.
          </p>
        </div>

        <div className="about-section">
          <div className="about-section__title">The Aebajogbe · Oduduwa Script</div>
          <p className="about-section__body">
            A native writing system for the Yoruba language, created to preserve
            and transmit Ifa knowledge in its original cultural context.
            Ifarcadia trains script recognition through gameplay.
          </p>
        </div>

        <div className="about-credit">
          <div className="about-credit__label">Script Inventor &amp; Developer</div>
          <div className="about-credit__name">Oluye Tolulase Oguntosi</div>
        </div>

        <div className="about-footer">CENProject · playifagames.org</div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// QUIZ GAME
// ════════════════════════════════════════════════════════════

function QuizGame({ odus, onEnd }) {
  const qsRef      = useRef(makeQuestions(odus, Q_COUNT));
  const timerRef   = useRef(null);
  const revealRef  = useRef(null);

  // Mutable game state — kept in refs so interval callbacks read fresh values
  const S = useRef({ qi: 0, lives: LIVES, score: 0, streak: 0, timeLeft: Q_TIME, phase: 'asking' });

  // React state (display only)
  const [qi,       setQi]       = useState(0);
  const [lives,    setLives]    = useState(LIVES);
  const [score,    setScore]    = useState(0);
  const [streak,   setStreak]   = useState(0);
  const [timeLeft, setTimeLeft] = useState(Q_TIME);
  const [phase,    setPhase]    = useState('asking'); // 'asking' | 'reveal'
  const [chosen,   setChosen]   = useState(null);

  // Sync display state → ref after every render
  useEffect(() => {
    S.current = { qi, lives, score, streak, timeLeft, phase };
  });

  // Start timer whenever a new question begins
  useEffect(() => {
    clearInterval(timerRef.current);
    S.current.timeLeft = Q_TIME;
    setTimeLeft(Q_TIME);

    timerRef.current = setInterval(() => {
      if (S.current.phase !== 'asking') { clearInterval(timerRef.current); return; }
      const t = S.current.timeLeft - 1;
      S.current.timeLeft = t;
      setTimeLeft(t);
      if (t <= 0) {
        clearInterval(timerRef.current);
        submitAnswer(null);
      }
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [qi]); // re-run for each new question index

  // Cleanup on unmount
  useEffect(() => () => {
    clearInterval(timerRef.current);
    clearTimeout(revealRef.current);
  }, []);

  function submitAnswer(value) {
    const s = S.current;
    if (s.phase !== 'asking') return;
    clearInterval(timerRef.current);

    const q       = qsRef.current[s.qi];
    const correct = value !== null && value === q.answer;

    let { lives: lv, score: sc, streak: sk } = s;

    if (correct) {
      const tBonus = Math.floor((s.timeLeft / Q_TIME) * 50);
      const mult   = sk >= 3 ? 2 : sk >= 2 ? 1.5 : 1;
      sc += Math.floor((100 + tBonus) * mult);
      sk++;
    } else {
      lv--;
      sk = 0;
    }

    // Update ref immediately so next reads are correct
    S.current = { ...s, lives: lv, score: sc, streak: sk, phase: 'reveal' };
    setLives(lv);
    setScore(sc);
    setStreak(sk);
    setChosen(value ?? 'timeout');
    setPhase('reveal');

    const nextQi = s.qi + 1;
    const over   = lv <= 0 || nextQi >= qsRef.current.length;

    revealRef.current = setTimeout(() => {
      if (over) {
        onEnd({ score: sc });
      } else {
        S.current = { ...S.current, qi: nextQi, phase: 'asking', timeLeft: Q_TIME };
        setQi(nextQi);
        setChosen(null);
        setPhase('asking');
        // useEffect[qi] restarts the timer
      }
    }, 1700);
  }

  const q = qsRef.current[qi];
  if (!q) return null;

  const catColor  = CAT_COLOR[q.odu.category] || '#8b92a5';
  const isReveal  = phase === 'reveal';
  const gotRight  = isReveal && chosen === q.answer;

  return (
    <div className="quiz">

      {/* HUD */}
      <div className="quiz__hud">
        <LivesRow lives={lives} />
        <div className="hud__score">
          <span className="hud__pts">{score.toLocaleString()}</span>
          {streak >= 2 && (
            <span className="hud__streak">🔥 {streak}×</span>
          )}
        </div>
        <TimerArc seconds={timeLeft} />
      </div>

      <ProgressStrip current={qi} total={Q_COUNT} />

      {/* Question card */}
      <div
        className={`q-card${isReveal ? (gotRight ? ' q-card--ok' : ' q-card--no') : ''}`}
        style={{ '--cat': catColor }}
      >
        <div className="q-card__label">Q {qi + 1} / {Q_COUNT}</div>

        {q.display === 'glyph' && (
          <div className="q-display q-display--glyph">
            <IfaGlyph code={q.odu.code} size="xl" color={catColor} />
          </div>
        )}

        {q.display === 'name' && (
          <div className="q-display q-display--name">
            <IfaGlyph code={q.odu.code} size="lg" color={catColor} />
            <span className="q-display__name">{q.odu.name}</span>
          </div>
        )}

        <p className="q-prompt">{q.prompt}</p>

        {isReveal && (
          <div className={`q-feedback ${gotRight ? 'q-feedback--ok' : 'q-feedback--no'}`}>
            {gotRight
              ? <><span className="fb-icon">✓</span> Correct!</>
              : <><span className="fb-icon">✗</span> {q.choices.find(c => c.value === q.answer)?.label}</>
            }
            <span className="fb-hint">{q.reveal}</span>
            <span className="fb-yoruba">{q.odu.yoruba}</span>
          </div>
        )}
      </div>

      {/* Choices */}
      <div className="choices">
        {q.choices.map(({ label, value }) => {
          let mod = '';
          if (isReveal) {
            if (value === q.answer) mod = ' choice--ok';
            else if (value === chosen) mod = ' choice--no';
            else mod = ' choice--dim';
          }
          return (
            <button
              key={String(value)}
              className={`choice${mod}`}
              onClick={() => !isReveal && submitAnswer(value)}
              disabled={isReveal}
            >
              {label}
            </button>
          );
        })}
      </div>

    </div>
  );
}

// ════════════════════════════════════════════════════════════
// MATCH GAME
// ════════════════════════════════════════════════════════════

function MatchGame({ odus, onEnd }) {
  const [cards,   setCards]   = useState(() => makeMatchCards(odus));
  const [flipped, setFlipped] = useState([]);   // card ids currently face-up (max 2)
  const [matched, setMatched] = useState(new Set());
  const [moves,   setMoves]   = useState(0);
  const [time,    setTime]    = useState(0);
  const lockRef  = useRef(false);
  const timerRef = useRef(null);

  // Game timer
  useEffect(() => {
    timerRef.current = setInterval(() => setTime(t => t + 1), 1000);
    return () => clearInterval(timerRef.current);
  }, []);

  // Win detection
  useEffect(() => {
    if (matched.size === MATCH_N) {
      clearInterval(timerRef.current);
      setTimeout(() => onEnd({ moves, time }), 800);
    }
  }, [matched.size]);

  function flipCard(card) {
    if (lockRef.current) return;
    if (matched.has(card.pairId)) return;
    if (flipped.includes(card.id)) return;
    if (flipped.length >= 2) return;

    const next = [...flipped, card.id];
    setFlipped(next);

    if (next.length === 2) {
      setMoves(m => m + 1);
      lockRef.current = true;
      const [a, b] = next.map(id => cards.find(c => c.id === id));

      if (a.pairId === b.pairId) {
        setTimeout(() => {
          setMatched(prev => new Set([...prev, a.pairId]));
          setFlipped([]);
          lockRef.current = false;
        }, 500);
      } else {
        setTimeout(() => {
          setFlipped([]);
          lockRef.current = false;
        }, 1000);
      }
    }
  }

  return (
    <div className="match">

      <div className="match__hud">
        <div className="match__stat">
          <span className="stat-lbl">Moves</span>
          <span className="stat-val">{moves}</span>
        </div>
        <div className="match__stat">
          <span className="stat-lbl">Pairs</span>
          <span className="stat-val">{matched.size}<span className="stat-total">/{MATCH_N}</span></span>
        </div>
        <div className="match__stat">
          <span className="stat-lbl">Time</span>
          <span className="stat-val">{fmtTime(time)}</span>
        </div>
      </div>

      <div className="match__grid">
        {cards.map(card => {
          const isUp      = flipped.includes(card.id) || matched.has(card.pairId);
          const isMatched = matched.has(card.pairId);
          const catColor  = CAT_COLOR[card.odu.category];

          return (
            <div
              key={card.id}
              className={`mc${isUp ? ' mc--up' : ''}${isMatched ? ' mc--matched' : ''}`}
              onClick={() => flipCard(card)}
              role="button"
              aria-label={isUp ? card.odu.name : 'Hidden card'}
            >
              <div className="mc__inner">
                {/* Back face */}
                <div className="mc__back">
                  <IfaGlyph code="1111" size="sm" />
                </div>
                {/* Front face */}
                <div className="mc__front" style={{ '--cat': catColor }}>
                  {card.face === 'glyph'
                    ? <IfaGlyph code={card.odu.code} size="lg" color={catColor} />
                    : <>
                        <span className="mc__name">{card.odu.name}</span>
                        <span className="mc__yoruba">{card.odu.yoruba}</span>
                      </>
                  }
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}

// ════════════════════════════════════════════════════════════
// ORISA QUIZ GAME
// ════════════════════════════════════════════════════════════

function OrisaQuizGame({ onEnd }) {
  const qsRef     = useRef(makeOrisaQuestions(Q_COUNT));
  const timerRef  = useRef(null);
  const revealRef = useRef(null);

  const S = useRef({ qi: 0, lives: LIVES, score: 0, streak: 0, timeLeft: ORISA_Q_TIME, phase: 'asking' });

  const [qi,       setQi]       = useState(0);
  const [lives,    setLives]    = useState(LIVES);
  const [score,    setScore]    = useState(0);
  const [streak,   setStreak]   = useState(0);
  const [timeLeft, setTimeLeft] = useState(ORISA_Q_TIME);
  const [phase,    setPhase]    = useState('asking');
  const [chosen,   setChosen]   = useState(null);

  useEffect(() => {
    S.current = { qi, lives, score, streak, timeLeft, phase };
  });

  useEffect(() => {
    clearInterval(timerRef.current);
    S.current.timeLeft = ORISA_Q_TIME;
    setTimeLeft(ORISA_Q_TIME);

    timerRef.current = setInterval(() => {
      if (S.current.phase !== 'asking') { clearInterval(timerRef.current); return; }
      const t = S.current.timeLeft - 1;
      S.current.timeLeft = t;
      setTimeLeft(t);
      if (t <= 0) { clearInterval(timerRef.current); submitAnswer(null); }
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [qi]);

  useEffect(() => () => {
    clearInterval(timerRef.current);
    clearTimeout(revealRef.current);
  }, []);

  function submitAnswer(value) {
    const s = S.current;
    if (s.phase !== 'asking') return;
    clearInterval(timerRef.current);

    const q       = qsRef.current[s.qi];
    const correct = value !== null && value === q.answer;
    let { lives: lv, score: sc, streak: sk } = s;

    if (correct) {
      const tBonus = Math.floor((s.timeLeft / ORISA_Q_TIME) * 50);
      const mult   = sk >= 3 ? 2 : sk >= 2 ? 1.5 : 1;
      sc += Math.floor((100 + tBonus) * mult);
      sk++;
    } else {
      lv--;
      sk = 0;
    }

    S.current = { ...s, lives: lv, score: sc, streak: sk, phase: 'reveal' };
    setLives(lv); setScore(sc); setStreak(sk);
    setChosen(value ?? 'timeout');
    setPhase('reveal');

    const nextQi = s.qi + 1;
    const over   = lv <= 0 || nextQi >= qsRef.current.length;

    revealRef.current = setTimeout(() => {
      if (over) {
        onEnd({ score: sc });
      } else {
        S.current = { ...S.current, qi: nextQi, phase: 'asking', timeLeft: ORISA_Q_TIME };
        setQi(nextQi);
        setChosen(null);
        setPhase('asking');
      }
    }, 1700);
  }

  const q = qsRef.current[qi];
  if (!q) return null;
  const isReveal    = phase === 'reveal';
  const gotRight    = isReveal && chosen === q.answer;
  const accentColor = ORISA_COLOR[q.orisa.name] || '#c9922a';

  return (
    <div className="quiz">

      <div className="quiz__hud">
        <LivesRow lives={lives} />
        <div className="hud__score">
          <span className="hud__pts">{score.toLocaleString()}</span>
          {streak >= 2 && <span className="hud__streak">🔥 {streak}×</span>}
        </div>
        <TimerArc seconds={timeLeft} total={ORISA_Q_TIME} />
      </div>

      <ProgressStrip current={qi} total={Q_COUNT} />

      <div
        className={`q-card orisa-q-card${isReveal ? (gotRight ? ' q-card--ok' : ' q-card--no') : ''}`}
        style={{ '--cat': accentColor }}
      >
        <div className="q-card__label">Q {qi + 1} / {Q_COUNT} · Orisa</div>

        {q.display === 'orisa' && (
          <div className="orisa-q-display">
            <div className="orisa-q-display__name" style={{ color: accentColor }}>{q.orisa.name}</div>
            <div className="orisa-q-display__yoruba">{q.orisa.yoruba}</div>
          </div>
        )}

        <p className="q-prompt">{q.prompt}</p>

        {isReveal && (
          <div className={`q-feedback ${gotRight ? 'q-feedback--ok' : 'q-feedback--no'}`}>
            {gotRight
              ? <><span className="fb-icon">✓</span> Correct!</>
              : <><span className="fb-icon">✗</span> {q.choices.find(c => c.value === q.answer)?.label}</>
            }
            <span className="fb-hint">{q.reveal}</span>
            <span className="fb-yoruba">{q.orisa.yoruba}</span>
          </div>
        )}
      </div>

      <div className="choices">
        {q.choices.map(({ label, value }) => {
          let mod = '';
          if (isReveal) {
            if (value === q.answer)  mod = ' choice--ok';
            else if (value === chosen) mod = ' choice--no';
            else mod = ' choice--dim';
          }
          return (
            <button
              key={String(value)}
              className={`choice${mod}`}
              onClick={() => !isReveal && submitAnswer(value)}
              disabled={isReveal}
            >
              {label}
            </button>
          );
        })}
      </div>

    </div>
  );
}

// ════════════════════════════════════════════════════════════
// ORISA MATCH GAME
// ════════════════════════════════════════════════════════════

function OrisaMatchGame({ onEnd }) {
  const [cards,   setCards]   = useState(() => makeOrisaMatchCards());
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState(new Set());
  const [moves,   setMoves]   = useState(0);
  const [time,    setTime]    = useState(0);
  const lockRef  = useRef(false);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => setTime(t => t + 1), 1000);
    return () => clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    if (matched.size === ORISA_MATCH_N) {
      clearInterval(timerRef.current);
      setTimeout(() => onEnd({ moves, time }), 800);
    }
  }, [matched.size]);

  function flipCard(card) {
    if (lockRef.current) return;
    if (matched.has(card.pairId)) return;
    if (flipped.includes(card.id)) return;
    if (flipped.length >= 2) return;

    const next = [...flipped, card.id];
    setFlipped(next);

    if (next.length === 2) {
      setMoves(m => m + 1);
      lockRef.current = true;
      const [a, b] = next.map(id => cards.find(c => c.id === id));

      if (a.pairId === b.pairId) {
        setTimeout(() => {
          setMatched(prev => new Set([...prev, a.pairId]));
          setFlipped([]);
          lockRef.current = false;
        }, 500);
      } else {
        setTimeout(() => {
          setFlipped([]);
          lockRef.current = false;
        }, 1000);
      }
    }
  }

  return (
    <div className="match orisa-match">

      <div className="match__hud">
        <div className="match__stat">
          <span className="stat-lbl">Moves</span>
          <span className="stat-val">{moves}</span>
        </div>
        <div className="match__stat">
          <span className="stat-lbl">Pairs</span>
          <span className="stat-val">{matched.size}<span className="stat-total">/{ORISA_MATCH_N}</span></span>
        </div>
        <div className="match__stat">
          <span className="stat-lbl">Time</span>
          <span className="stat-val">{fmtTime(time)}</span>
        </div>
      </div>

      <div className="match__grid orisa-match__grid">
        {cards.map(card => {
          const isUp        = flipped.includes(card.id) || matched.has(card.pairId);
          const isMatched   = matched.has(card.pairId);
          const accentColor = ORISA_COLOR[card.orisa.name] || '#c9922a';

          return (
            <div
              key={card.id}
              className={`mc orisa-mc${isUp ? ' mc--up' : ''}${isMatched ? ' mc--matched' : ''}`}
              onClick={() => flipCard(card)}
              role="button"
              aria-label={isUp ? card.orisa.name : 'Hidden card'}
            >
              <div className="mc__inner">
                <div className="mc__back">
                  <span className="orisa-mc__back-icon">🌟</span>
                </div>
                <div className="mc__front" style={{ '--cat': accentColor }}>
                  {card.face === 'name'
                    ? <>
                        <span className="orisa-mc__name">{card.orisa.name}</span>
                        <span className="mc__yoruba">{card.orisa.yoruba}</span>
                      </>
                    : <>
                        <span className="orisa-mc__domain">{card.orisa.domains[0]}</span>
                        <span className="orisa-mc__domain-sub">{card.orisa.domains.slice(1, 3).join(' · ')}</span>
                      </>
                  }
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}

// ════════════════════════════════════════════════════════════
// IFARCADIA GAME
// ════════════════════════════════════════════════════════════

const ARC_COLOR = '#7c4dff';

function IfarcadiaGame({ odus, onEnd }) {
  const qsRef     = useRef(makeArcQuestions(odus, Q_COUNT));
  const timerRef  = useRef(null);
  const revealRef = useRef(null);

  const S = useRef({ qi: 0, lives: LIVES, score: 0, streak: 0, timeLeft: Q_TIME, phase: 'asking' });

  const [qi,       setQi]       = useState(0);
  const [lives,    setLives]    = useState(LIVES);
  const [score,    setScore]    = useState(0);
  const [streak,   setStreak]   = useState(0);
  const [timeLeft, setTimeLeft] = useState(Q_TIME);
  const [phase,    setPhase]    = useState('asking');
  const [chosen,   setChosen]   = useState(null);

  useEffect(() => {
    S.current = { qi, lives, score, streak, timeLeft, phase };
  });

  useEffect(() => {
    clearInterval(timerRef.current);
    S.current.timeLeft = Q_TIME;
    setTimeLeft(Q_TIME);
    timerRef.current = setInterval(() => {
      if (S.current.phase !== 'asking') { clearInterval(timerRef.current); return; }
      const t = S.current.timeLeft - 1;
      S.current.timeLeft = t;
      setTimeLeft(t);
      if (t <= 0) { clearInterval(timerRef.current); submitAnswer(null); }
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [qi]);

  useEffect(() => () => {
    clearInterval(timerRef.current);
    clearTimeout(revealRef.current);
  }, []);

  function submitAnswer(value) {
    const s = S.current;
    if (s.phase !== 'asking') return;
    clearInterval(timerRef.current);

    const q       = qsRef.current[s.qi];
    const correct = value !== null && value === q.answer;
    let { lives: lv, score: sc, streak: sk } = s;

    if (correct) {
      const tBonus = Math.floor((s.timeLeft / Q_TIME) * 50);
      const mult   = sk >= 3 ? 2 : sk >= 2 ? 1.5 : 1;
      sc += Math.floor((100 + tBonus) * mult);
      sk++;
    } else {
      lv--;
      sk = 0;
    }

    S.current = { ...s, lives: lv, score: sc, streak: sk, phase: 'reveal' };
    setLives(lv);
    setScore(sc);
    setStreak(sk);
    setChosen(value ?? 'timeout');
    setPhase('reveal');

    const nextQi = s.qi + 1;
    const over   = lv <= 0 || nextQi >= qsRef.current.length;

    revealRef.current = setTimeout(() => {
      if (over) {
        onEnd({ score: sc });
      } else {
        S.current = { ...S.current, qi: nextQi, phase: 'asking', timeLeft: Q_TIME };
        setQi(nextQi);
        setChosen(null);
        setPhase('asking');
      }
    }, 1700);
  }

  const q = qsRef.current[qi];
  if (!q) return null;

  const isReveal = phase === 'reveal';
  const gotRight = isReveal && chosen === q.answer;

  return (
    <div className="quiz arc-game">

      {/* Ifarcadia banner */}
      <div className="arc-banner">
        <span className="arc-banner__name">Ifarcadia</span>
        <span className="arc-banner__sub">Aebajogbe · Yoruba Script Literacy</span>
      </div>

      {/* HUD */}
      <div className="quiz__hud">
        <LivesRow lives={lives} />
        <div className="hud__score">
          <span className="hud__pts">{score.toLocaleString()}</span>
          {streak >= 2 && (
            <span className="hud__streak arc-streak">✦ {streak}×</span>
          )}
        </div>
        <TimerArc seconds={timeLeft} />
      </div>

      <ProgressStrip current={qi} total={Q_COUNT} />

      {/* Question card */}
      <div className={`q-card arc-card${isReveal ? (gotRight ? ' q-card--ok' : ' q-card--no') : ''}`}>
        <div className="q-card__label">Q {qi + 1} / {Q_COUNT}</div>

        {q.display === 'yoruba' && (
          <div className="q-display q-display--yoruba">
            <div className="arc-script">{q.odu.yoruba}</div>
            <div className="arc-script__tag">Oduduwa Script</div>
          </div>
        )}

        {q.display === 'glyph' && (
          <div className="q-display q-display--name">
            <IfaGlyph code={q.odu.code} size="lg" color={ARC_COLOR} />
            <span className="q-display__name" style={{ color: ARC_COLOR }}>{q.odu.name}</span>
          </div>
        )}

        <p className="q-prompt">{q.prompt}</p>

        {isReveal && (
          <div className={`q-feedback ${gotRight ? 'q-feedback--ok' : 'q-feedback--no'}`}>
            {gotRight
              ? <><span className="fb-icon">✓</span> Correct!</>
              : <><span className="fb-icon">✗</span> {q.choices.find(c => c.value === q.answer)?.label}</>
            }
            <span className="fb-hint">{q.reveal}</span>
          </div>
        )}
      </div>

      {/* Choices */}
      <div className="choices">
        {q.choices.map(({ label, value }) => {
          let mod = '';
          if (isReveal) {
            if (value === q.answer) mod = ' choice--ok';
            else if (value === chosen) mod = ' choice--no';
            else mod = ' choice--dim';
          }
          return (
            <button
              key={String(value)}
              className={`choice arc-choice${mod}`}
              onClick={() => !isReveal && submitAnswer(value)}
              disabled={isReveal}
            >
              {label}
            </button>
          );
        })}
      </div>

    </div>
  );
}

// ════════════════════════════════════════════════════════════
// AYO OLOPON GAME (Ifáayò)
// ════════════════════════════════════════════════════════════

function AyoSeeds({ count, side }) {
  const show = Math.min(count, 12);
  return (
    <div className="ayo__seeds">
      {Array.from({ length: show }).map((_, i) => (
        <span key={i} className={`ayo__seed ayo__seed--${side}`} />
      ))}
      {count > 12 && <span className="ayo__seed-extra">+{count - 12}</span>}
    </div>
  );
}

function AyoGame({ onEnd }) {
  const [board,       setBoard]       = useState(ayoInit);
  const [playerScore, setPlayerScore] = useState(0);
  const [aiScore,     setAiScore]     = useState(0);
  const [turn,        setTurn]        = useState('player');
  const [animPit,     setAnimPit]     = useState(null);
  const [msg,         setMsg]         = useState('Choose a pit to sow');
  const aiRef = useRef(null);

  // Game-over detection
  useEffect(() => {
    if (turn === 'over') return;
    const pm = ayoValidMoves(board, true);
    const am = ayoValidMoves(board, false);
    if (pm.length === 0 || am.length === 0) {
      const extraP = OGBE_PITS.reduce((s, p) => s + board[p], 0);
      const extraA = OYEKU_PITS.reduce((s, p) => s + board[p], 0);
      const fp = playerScore + extraP;
      const fa = aiScore + extraA;
      setPlayerScore(fp);
      setAiScore(fa);
      setTurn('over');
      const verdict = fp > fa ? 'You win!' : fp < fa ? 'Oyeku wins!' : 'Draw!';
      setMsg(verdict);
      setTimeout(() => onEnd({ playerScore: fp, aiScore: fa, won: fp > fa }), 2000);
    }
  }, [board, turn]);

  function applyMove(pit, isPlayer, curBoard, ps, as) {
    const { b: b1, last } = ayoSow(curBoard, pit);
    const { b: b2, captured } = ayoCapture(b1, last, isPlayer);
    return {
      board: b2,
      playerScore: isPlayer ? ps + captured : ps,
      aiScore:     isPlayer ? as : as + captured,
      capMsg: captured > 0
        ? (isPlayer ? `You captured ${captured} seeds!` : `Oyeku captured ${captured} seeds!`)
        : '',
    };
  }

  function handlePlayerMove(pit) {
    if (turn !== 'player') return;
    if (!ayoValidMoves(board, true).includes(pit)) return;
    setAnimPit(pit);
    setTimeout(() => {
      const res = applyMove(pit, true, board, playerScore, aiScore);
      setBoard(res.board);
      setPlayerScore(res.playerScore);
      setAiScore(res.aiScore);
      setAnimPit(null);
      setMsg(res.capMsg || 'Oyeku is thinking…');
      setTurn('ai');
    }, 300);
  }

  // AI turn
  useEffect(() => {
    if (turn !== 'ai') return;
    aiRef.current = setTimeout(() => {
      const move = ayoAI(board);
      if (move === -1) { setTurn('player'); setMsg('Choose a pit to sow'); return; }
      setAnimPit(move);
      setTimeout(() => {
        const res = applyMove(move, false, board, playerScore, aiScore);
        setBoard(res.board);
        setPlayerScore(res.playerScore);
        setAiScore(res.aiScore);
        setAnimPit(null);
        setMsg(res.capMsg || 'Choose a pit to sow');
        setTurn('player');
      }, 400);
    }, 800);
    return () => clearTimeout(aiRef.current);
  }, [turn]);

  useEffect(() => () => clearTimeout(aiRef.current), []);

  const validMoves = turn === 'player' ? ayoValidMoves(board, true) : [];
  // Top row: Oyeku pits displayed right-to-left so pit 15 sits above pit 0
  const topRow    = [15, 14, 13, 12, 11, 10, 9, 8];
  const bottomRow = [0, 1, 2, 3, 4, 5, 6, 7];

  return (
    <div className="ayo">

      <div className="ayo__banner">
        <div className="ayo__logo-orb">
          <IfaGlyph code="1111" size="md" color="#3d1f00" />
        </div>
        <div className="ayo__banner-text">
          <span className="ayo__title">Ifáayò-Ọlọ́pọ́n</span>
          <span className="ayo__sub">Ayo Olopon · Seed Sowing · Ogbe vs Oyeku</span>
        </div>
      </div>

      {/* Scoreboard */}
      <div className="ayo__scores">
        <div className={`ayo__score ayo__score--oyeku${turn === 'ai' ? ' ayo__score--active' : ''}`}>
          <div className="ayo__score-side">Oyeku</div>
          <div className="ayo__score-val">{aiScore}</div>
        </div>
        <div className="ayo__score-mid">captured seeds</div>
        <div className={`ayo__score ayo__score--ogbe${turn === 'player' ? ' ayo__score--active' : ''}`}>
          <div className="ayo__score-side">Ogbe · You</div>
          <div className="ayo__score-val">{playerScore}</div>
        </div>
      </div>

      {/* Board */}
      <div className="ayo__board">
        <div className="ayo__row-lbl ayo__row-lbl--oyeku">Oyeku ▲</div>

        <div className="ayo__row ayo__row--oyeku">
          {topRow.map(pit => (
            <div key={pit}
              className={`ayo__pit ayo__pit--oyeku${animPit === pit ? ' ayo__pit--anim' : ''}`}
            >
              <AyoSeeds count={board[pit]} side="oyeku" />
              <div className="ayo__count">{board[pit]}</div>
            </div>
          ))}
        </div>

        <div className="ayo__divider" />

        <div className="ayo__row ayo__row--ogbe">
          {bottomRow.map(pit => {
            const valid = validMoves.includes(pit);
            return (
              <div key={pit}
                className={`ayo__pit ayo__pit--ogbe${valid ? ' ayo__pit--valid' : ''}${animPit === pit ? ' ayo__pit--anim' : ''}`}
                onClick={() => valid && handlePlayerMove(pit)}
                role={valid ? 'button' : undefined}
              >
                <AyoSeeds count={board[pit]} side="ogbe" />
                <div className="ayo__count">{board[pit]}</div>
              </div>
            );
          })}
        </div>

        <div className="ayo__row-lbl ayo__row-lbl--ogbe">▼ Ogbe · You</div>
      </div>

      <div className="ayo__msg">{msg}</div>

      <div className="ayo__rules">
        Capture when last seed lands in opponent's pit with 4 or 8 seeds.
        Chains continue backward.
      </div>

    </div>
  );
}

// ════════════════════════════════════════════════════════════
// IFABIN — BINARY CODING GAME
// ════════════════════════════════════════════════════════════

function BinGame({ onEnd }) {
  const targetsRef = useRef(
    Array.from({ length: BIN_ROUNDS }, (_, i) => binTarget(i))
  );

  // Mutable ref — timer reads fresh values without stale closures
  const S = useRef({
    round: 0, lives: LIVES, score: 0, streak: 0,
    timeLeft: BIN_TIME, phase: 'asking',
    bits: Array(8).fill(0), target: 0,
    subMode: null, roundType: 'd2b', playerDecimal: '',
    shortBits: Array(4).fill(0),    // obi (4 kola lobes)
    cowrieBits: Array(16).fill(0),  // cowrie (16 shells)
    picked: null,                   // odu4 MCQ selection
    odu4Q: null,                    // odu4 question object
  });

  const [subMode,       setSubMode]       = useState(null);  // null = show picker
  const [round,         setRound]         = useState(0);
  const [lives,         setLives]         = useState(LIVES);
  const [score,         setScore]         = useState(0);
  const [streak,        setStreak]        = useState(0);
  const [timeLeft,      setTimeLeft]      = useState(BIN_TIME);
  const [phase,         setPhase]         = useState('asking');
  const [bits,          setBits]          = useState(() => Array(8).fill(0));
  const [target,        setTarget]        = useState(() => targetsRef.current[0]);
  const [roundType,     setRoundType]     = useState('d2b');
  const [playerDecimal, setPlayerDecimal] = useState('');
  const [shortBits,     setShortBits]     = useState(() => Array(4).fill(0));
  const [cowrieBits,    setCowrieBits]    = useState(() => Array(16).fill(0));
  const [picked,        setPicked]        = useState(null);
  const [odu4Q,         setOdu4Q]         = useState(null);

  const timerRef  = useRef(null);
  const revealRef = useRef(null);

  // Sync display state → ref after every render
  useEffect(() => {
    S.current = { round, lives, score, streak, timeLeft, phase, bits, target,
                  subMode, roundType, playerDecimal,
                  shortBits, cowrieBits, picked, odu4Q };
  });

  // New round: reset bits/input, set target, restart timer
  useEffect(() => {
    const sm = S.current.subMode;
    if (sm === null) return; // wait for sub-mode selection
    clearInterval(timerRef.current);

    // Target range varies by ancient sub-mode
    let t = targetsRef.current[round];
    if (sm === 'obi')    t = t % 16;               // 0–15 (4-bit)
    if (sm === 'cowrie') t = (t % 16) + 1;         // 1–16 (count of open shells)
    if (sm === 'odu4')   t = t % 16;               // Odu index 0–15

    const b  = Array(8).fill(0);
    const sb = Array(4).fill(0);
    const cb = Array(16).fill(0);
    const rt = getRoundType(sm, round);
    const q4 = sm === 'odu4' ? makeOdu4Q(t) : null;

    S.current.timeLeft      = BIN_TIME;
    S.current.bits          = b;
    S.current.target        = t;
    S.current.phase         = 'asking';
    S.current.roundType     = rt;
    S.current.playerDecimal = '';
    S.current.shortBits     = sb;
    S.current.cowrieBits    = cb;
    S.current.picked        = null;
    S.current.odu4Q         = q4;
    setTimeLeft(BIN_TIME);
    setBits(b);
    setTarget(t);
    setRoundType(rt);
    setPlayerDecimal('');
    setShortBits(sb);
    setCowrieBits(cb);
    setPicked(null);
    setOdu4Q(q4);

    timerRef.current = setInterval(() => {
      if (S.current.phase !== 'asking') { clearInterval(timerRef.current); return; }
      const tLeft = S.current.timeLeft - 1;
      S.current.timeLeft = tLeft;
      setTimeLeft(tLeft);
      if (tLeft <= 0) { clearInterval(timerRef.current); doSubmit(); }
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [round, subMode]);

  useEffect(() => () => {
    clearInterval(timerRef.current);
    clearTimeout(revealRef.current);
  }, []);

  function chooseSubMode(sm) {
    S.current.subMode = sm;
    setSubMode(sm);
  }

  function toggleBit(i) {
    if (S.current.phase !== 'asking') return;
    const nb = [...S.current.bits];
    nb[i] ^= 1;
    S.current.bits = nb;
    setBits(nb);
  }

  function handleDecimalKey(key) {
    if (S.current.phase !== 'asking') return;
    let val = S.current.playerDecimal;
    if (key === 'back')       { val = val.slice(0, -1); }
    else if (key === 'clear') { val = ''; }
    else {
      if (val.length >= 3) return; // max 3 digits (0–255)
      val = val + key;
    }
    S.current.playerDecimal = val;
    setPlayerDecimal(val);
  }

  function toggleShortBit(i) {
    if (S.current.phase !== 'asking') return;
    const nb = [...S.current.shortBits];
    nb[i] ^= 1;
    S.current.shortBits = nb;
    setShortBits(nb);
  }

  function toggleCowrie(i) {
    if (S.current.phase !== 'asking') return;
    const nb = [...S.current.cowrieBits];
    nb[i] ^= 1;
    S.current.cowrieBits = nb;
    setCowrieBits(nb);
  }

  function handlePickOdu4(name) {
    if (S.current.phase !== 'asking') return;
    S.current.picked = name;
    setPicked(name);
    doSubmit();
  }

  function doSubmit() {
    const s = S.current;
    if (s.phase !== 'asking') return;
    clearInterval(timerRef.current);

    let correct;
    if (s.roundType === 'b2d') {
      correct = parseInt(s.playerDecimal || '-1', 10) === s.target;
    } else if (s.roundType === 'obi') {
      correct = bits4ToDecimal(s.shortBits) === s.target;
    } else if (s.roundType === 'cowrie') {
      correct = s.cowrieBits.reduce((a, b) => a + b, 0) === s.target;
    } else if (s.roundType === 'odu4') {
      correct = s.picked === s.odu4Q.answerName;
    } else {
      // 'd2b' or 'opele' — both use 8-bit bits array
      correct = bitsToDecimal(s.bits) === s.target;
    }

    let { lives: lv, score: sc, streak: sk } = s;
    if (correct) {
      const tBonus = Math.floor((s.timeLeft / BIN_TIME) * 60);
      const mult   = sk >= 3 ? 2 : sk >= 2 ? 1.5 : 1;
      sc += Math.floor((100 + tBonus) * mult);
      sk++;
    } else {
      lv--;
      sk = 0;
    }

    S.current = { ...s, lives: lv, score: sc, streak: sk, phase: 'reveal' };
    setLives(lv);
    setScore(sc);
    setStreak(sk);
    setPhase('reveal');

    const nextRound = s.round + 1;
    const over = lv <= 0 || nextRound >= BIN_ROUNDS;

    revealRef.current = setTimeout(() => {
      if (over) {
        onEnd({ score: sc });
      } else {
        S.current = { ...S.current, round: nextRound, phase: 'asking', timeLeft: BIN_TIME };
        setRound(nextRound);
        setPhase('asking');
      }
    }, 1900);
  }

  // ── Sub-mode picker ──────────────────────────────────────────
  if (subMode === null) {
    return (
      <div className="bin">
        {/* ── Hero banner ── */}
        <div className="bin__banner">
          <div className="bin__logo-chip">
            <span className="bin__chip-0">O</span>
            <span className="bin__chip-1">|</span>
          </div>
          <div className="bin__banner-text">
            <span className="bin__title">IfaBin · IfaBinary Code</span>
            <span className="bin__sub">Binary · Computing · Odu Ifa · Odu Oosa · Isese · STEM</span>
          </div>
        </div>

        {/* ── Cultural bridge tagline ── */}
        <div className="bin__tagline">
          <span className="bin__tagline__badge">STEM</span>
          <span className="bin__tagline__text">
            The same <strong>0</strong> and <strong>1</strong> powering every computer have lived in Yoruba sacred knowledge for millennia — as <strong>Ogbe</strong> and <strong>Oyeku</strong>.
          </span>
          <span className="bin__tagline__badge bin__tagline__badge--ifa">Isese</span>
        </div>

        {/* ── Modern Binary section ── */}
        <div className="bin__pick-section">
          <div className="bin__pick-heading">
            <span className="bin__pick-chip">0 1</span>
            <span className="bin__pick-heading-text">
              <span className="bin__pick-heading-main">Modern Binary</span>
              <span className="bin__pick-heading-sub">Leibniz · 1679 CE · Computing · STEM</span>
            </span>
          </div>
          <div className="bin__submode-pick">
            <button className="bin__submode-card bin__submode-card--d2b" onClick={() => chooseSubMode('d2b')}>
              <div className="bin__submode-icon">
                <span className="bin__smc-num">42</span>
                <span className="bin__smc-arr">→</span>
                <span className="bin__smc-bits">00101010</span>
              </div>
              <div className="bin__submode-name">Decimal → Binary</div>
              <div className="bin__submode-desc">
                See a decimal number · Toggle 8 bits to encode it in binary
              </div>
              <div className="bin__submode-tag">8-bit · STEM · Computing</div>
            </button>
            <button className="bin__submode-card bin__submode-card--b2d" onClick={() => chooseSubMode('b2d')}>
              <div className="bin__submode-icon">
                <span className="bin__smc-bits">00101010</span>
                <span className="bin__smc-arr">→</span>
                <span className="bin__smc-num">42</span>
              </div>
              <div className="bin__submode-name">Binary → Decimal</div>
              <div className="bin__submode-desc">
                Read 8 bits · Add the weights · Dial in the decimal value
              </div>
              <div className="bin__submode-tag">bit weights · STEM · Computing</div>
            </button>
            <button className="bin__submode-card bin__submode-card--mix" onClick={() => chooseSubMode('mix')}>
              <div className="bin__submode-icon">
                <span className="bin__smc-bits">01</span>
                <span className="bin__smc-arr">⇄</span>
                <span className="bin__smc-num">10</span>
              </div>
              <div className="bin__submode-name">Mixed Challenge</div>
              <div className="bin__submode-desc">
                Both directions · Alternating rounds · Master-level challenge!
              </div>
              <div className="bin__submode-tag">master level · STEM</div>
            </button>
          </div>
        </div>

        {/* ── Ancient Binary · Ifa section ── */}
        <div className="bin__pick-section bin__pick-section--anc">
          <div className="bin__pick-heading bin__pick-heading--anc">
            <span className="bin__pick-chip bin__pick-chip--anc">O |</span>
            <span className="bin__pick-heading-text">
              <span className="bin__pick-heading-main">Ancient Binary · Ifa</span>
              <span className="bin__pick-heading-sub">Yoruba · Isese · Odu Ifa · Odu Oosa</span>
            </span>
          </div>
          <div className="bin__submode-pick bin__submode-pick--anc">
            <button className="bin__submode-card bin__submode-card--opele" onClick={() => chooseSubMode('opele')}>
              <div className="bin__submode-icon bin__submode-icon--anc bin__submode-icon--opele">
                O | O | O | O |
              </div>
              <div className="bin__submode-name">Opele Ifa</div>
              <div className="bin__submode-desc">
                8 Opele seeds · Ogbe (O) = open · Oyeku (|) = closed<br/>The original 8-bit binary system
              </div>
              <div className="bin__submode-tag bin__submode-tag--gold">Odu Ifa · 8-bit</div>
            </button>
            <button className="bin__submode-card bin__submode-card--obi" onClick={() => chooseSubMode('obi')}>
              <div className="bin__submode-icon bin__submode-icon--anc bin__submode-icon--obi">
                | || | ||
              </div>
              <div className="bin__submode-name">Obi Siso</div>
              <div className="bin__submode-desc">
                4 kola-nut lobes · face-up = 1 · face-down = 0<br/>Sacred 4-bit computation
              </div>
              <div className="bin__submode-tag bin__submode-tag--red">Odu Oosa · 4-bit</div>
            </button>
            <button className="bin__submode-card bin__submode-card--cowrie" onClick={() => chooseSubMode('cowrie')}>
              <div className="bin__submode-icon bin__submode-icon--anc bin__submode-icon--cowrie">
                Aje · 16
              </div>
              <div className="bin__submode-name">Erindinlogun</div>
              <div className="bin__submode-desc">
                16 Aje cowries · mouth-up = open · back-up = silent<br/>Ancestor of hexadecimal
              </div>
              <div className="bin__submode-tag bin__submode-tag--ivory">Odu Oosa · count</div>
            </button>
            <button className="bin__submode-card bin__submode-card--odu4" onClick={() => chooseSubMode('odu4')}>
              <div className="bin__submode-icon bin__submode-icon--anc bin__submode-icon--odu4">
                O | O |
              </div>
              <div className="bin__submode-name">Odu Ifa Codes</div>
              <div className="bin__submode-desc">
                Read the 4-bit Odu mark pattern · Identify the Odu<br/>Ikin · Opele · Agbigba
              </div>
              <div className="bin__submode-tag bin__submode-tag--gold">Odu Ifa · 4-bit MCQ</div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Game render ──────────────────────────────────────────────
  const playerVal = bitsToDecimal(bits);
  const isReveal  = phase === 'reveal';

  // Correctness for all round types (used in banner and feedback)
  const isCorrect = isReveal && (() => {
    if (roundType === 'b2d')    return parseInt(playerDecimal || '-1', 10) === target;
    if (roundType === 'obi')    return bits4ToDecimal(shortBits) === target;
    if (roundType === 'cowrie') return cowrieBits.reduce((a, b) => a + b, 0) === target;
    if (roundType === 'odu4')   return picked === (odu4Q && odu4Q.answerName);
    return playerVal === target; // d2b / opele
  })();

  const isMatch = !isReveal && (() => {
    if (roundType === 'b2d')    return parseInt(playerDecimal || '-1', 10) === target;
    if (roundType === 'obi')    return bits4ToDecimal(shortBits) === target;
    if (roundType === 'cowrie') return cowrieBits.reduce((a, b) => a + b, 0) === target;
    return playerVal === target; // d2b / opele (odu4 has no isMatch — auto-submits)
  })();

  const breakdown       = bits.map((b, i) => b ? (1 << (7 - i)) : 0).filter(v => v > 0);
  const revealBreakdown = Array.from(target.toString(2).padStart(8, '0'))
    .map((b, i) => b === '1' ? (1 << (7 - i)) : 0).filter(v => v > 0);
  const targetBits = target.toString(2).padStart(8, '0').split('').map(Number);
  const b2dWeights = targetBits.map((b, i) => b ? (1 << (7 - i)) : 0).filter(v => v > 0);
  const dirLabel   = roundType === 'b2d' ? 'Convert to Decimal' : 'Convert to Binary';

  // Ancient-system computed helpers
  const shortVal   = bits4ToDecimal(shortBits);
  const cowrieOpen = cowrieBits.reduce((a, b) => a + b, 0);
  const targetBits4 = target.toString(2).padStart(4, '0').split('').map(Number);

  return (
    <div className="bin">

      {/* Banner */}
      <div className="bin__banner">
        <div className="bin__logo-chip">
          <span className="bin__chip-0">0</span>
          <span className="bin__chip-1">1</span>
        </div>
        <div className="bin__banner-text">
          <span className="bin__title">IfaBin - IfaBinary Code</span>
          <span className="bin__sub">IfaBinary Code · Learn · Play · Master</span>
        </div>
        <div className="bin__diff-badge">{getBinDifficulty(round)}</div>
      </div>

      {/* HUD */}
      <div className="quiz__hud bin__hud">
        <LivesRow lives={lives} />
        <div className="hud__score">
          <span className="hud__pts">{score.toLocaleString()}</span>
          {streak >= 2 && (
            <span className="hud__streak bin__streak">⚡ {streak}×</span>
          )}
        </div>
        <TimerArc seconds={timeLeft} total={BIN_TIME} />
      </div>

      <ProgressStrip current={round} total={BIN_ROUNDS} />

      {/* ── DECIMAL → BINARY section ── */}
      {roundType === 'd2b' && (
        <>
          <div className={`bin__card${isReveal ? (isCorrect ? ' bin__card--ok' : ' bin__card--no') : ''}`}>
            <div className="bin__card-label">Round {round + 1} / {BIN_ROUNDS} · {dirLabel}</div>
            <div className="bin__challenge">
              <div className="bin__target-num">{target}</div>
              <div className="bin__target-sub">encode this number in binary</div>
            </div>
            {isReveal && (
              <div className={`q-feedback ${isCorrect ? 'q-feedback--ok' : 'q-feedback--no'}`}>
                {isCorrect
                  ? <><span className="fb-icon">✓</span> Perfect!</>
                  : <><span className="fb-icon">✗</span> Correct answer:</>
                }
                <span className="bin__reveal-bits">
                  {target.toString(2).padStart(8, '0').split('').map((b, i) => (
                    <span key={i} className={`bin__reveal-bit bin__reveal-bit--${b === '1' ? 'on' : 'off'}`}>{b}</span>
                  ))}
                </span>
                {revealBreakdown.length > 0 && (
                  <span className="fb-hint">{revealBreakdown.join(' + ')} = {target}</span>
                )}
              </div>
            )}
          </div>

          <div className="bin__weights">
            {[128, 64, 32, 16, 8, 4, 2, 1].map((w, i) => (
              <div key={w} className={`bin__weight${bits[i] ? ' bin__weight--on' : ''}`}>{w}</div>
            ))}
          </div>

          <div className="bin__bits">
            {bits.map((b, i) => (
              <button
                key={i}
                className={`bin__bit${b ? ' bin__bit--on' : ' bin__bit--off'}${isReveal ? ' bin__bit--locked' : ''}`}
                onClick={() => !isReveal && toggleBit(i)}
                disabled={isReveal}
                aria-label={`Bit ${7 - i}, value ${1 << (7 - i)}, ${b ? 'on' : 'off'}`}
              >
                {b}
              </button>
            ))}
          </div>

          <div className="bin__running">
            {breakdown.length > 0
              ? <>
                  <span className="bin__breakdown">{breakdown.join(' + ')}</span>
                  <span className="bin__eq"> = </span>
                  <span className={`bin__running-val${isMatch ? ' bin__running-val--match' : ''}`}>{playerVal}</span>
                </>
              : <span className="bin__running-hint">Click the bits above to start encoding</span>
            }
          </div>

          {!isReveal && (
            <button
              className={`btn bin__submit${isMatch ? ' bin__submit--ready' : ''}`}
              onClick={doSubmit}
            >
              {isMatch ? '✓ Submit Answer' : 'Check Answer'}
            </button>
          )}
        </>
      )}

      {/* ── BINARY → DECIMAL section ── */}
      {roundType === 'b2d' && (
        <>
          <div className={`bin__card${isReveal ? (isCorrect ? ' bin__card--ok' : ' bin__card--no') : ''}`}>
            <div className="bin__card-label">Round {round + 1} / {BIN_ROUNDS} · {dirLabel}</div>
            <div className="bin__challenge bin__challenge--b2d">
              <div className="bin__target-sub">Read the bits — what decimal number is this?</div>
            </div>

            <div className="bin__weights">
              {[128, 64, 32, 16, 8, 4, 2, 1].map((w, i) => (
                <div key={w} className={`bin__weight${targetBits[i] ? ' bin__weight--on' : ''}`}>{w}</div>
              ))}
            </div>

            <div className="bin__bits bin__bits--fixed">
              {targetBits.map((b, i) => (
                <div
                  key={i}
                  className={`bin__bit bin__bit--fixed ${b ? 'bin__bit--on' : 'bin__bit--off'}`}
                >
                  {b}
                </div>
              ))}
            </div>

            <div className="bin__b2d-hint">
              {b2dWeights.length > 0
                ? <>
                    <span className="bin__breakdown">{b2dWeights.join(' + ')}</span>
                    <span className="bin__eq"> = ?</span>
                  </>
                : <span className="bin__running-hint">All bits are zero — the value is 0</span>
              }
            </div>

            {isReveal && (
              <div className={`q-feedback ${isCorrect ? 'q-feedback--ok' : 'q-feedback--no'}`}>
                {isCorrect
                  ? <><span className="fb-icon">✓</span> Correct! The answer is {target}.</>
                  : <><span className="fb-icon">✗</span> The answer was <strong>{target}</strong>.</>
                }
                {!isCorrect && b2dWeights.length > 0 && (
                  <span className="fb-hint">{b2dWeights.join(' + ')} = {target}</span>
                )}
              </div>
            )}
          </div>

          {!isReveal && (
            <div className="bin__decimal-wrap">
              <div className={`bin__decimal-display${isMatch ? ' bin__decimal-display--match' : ''}`}>
                {playerDecimal !== ''
                  ? playerDecimal
                  : <span className="bin__decimal-placeholder">_ _ _</span>
                }
              </div>
              <div className="bin__numpad">
                {['7','8','9','4','5','6','1','2','3','clear','0','back'].map(k => (
                  <button
                    key={k}
                    className={`bin__numpad-btn${k === 'clear' ? ' bin__numpad-btn--clear' : k === 'back' ? ' bin__numpad-btn--back' : ''}`}
                    onClick={() => handleDecimalKey(k)}
                  >
                    {k === 'back' ? '⌫' : k === 'clear' ? 'C' : k}
                  </button>
                ))}
              </div>
              <button
                className={`btn bin__submit${isMatch ? ' bin__submit--ready' : ''}`}
                onClick={doSubmit}
                disabled={!playerDecimal}
              >
                {isMatch ? '✓ Submit Answer' : 'Check Answer'}
              </button>
            </div>
          )}
        </>
      )}

      {/* ── OPELE IFA section (8 pods, same 8-bit logic as d2b) ── */}
      {roundType === 'opele' && (
        <>
          <div className={`bin__card anc-card${isReveal ? (isCorrect ? ' bin__card--ok' : ' bin__card--no') : ''}`}>
            <div className="bin__card-label anc-card__lbl">Round {round + 1} / {BIN_ROUNDS} · Opele Ifa — 8-bit encoding</div>
            <div className="anc-card__intro">
              Cast the Opele chain — arrange the seeds to encode this number
            </div>
            <div className="bin__challenge">
              <div className="bin__target-num">{target}</div>
              <div className="bin__target-sub">arrange the 8 Opele seeds below · open = Ogbe (IfaZero) · closed = Oyeku (IfaOne)</div>
            </div>
            {isReveal && (
              <div className={`q-feedback ${isCorrect ? 'q-feedback--ok' : 'q-feedback--no'}`}>
                {isCorrect
                  ? <><span className="fb-icon">✓</span> Àṣẹ! Correct.</>
                  : <><span className="fb-icon">✗</span> Correct pattern:</>
                }
                <span className="opele-reveal">
                  {targetBits.map((b, i) => (
                    <span key={i} className={`opele-reveal__pod opele-reveal__pod--${b ? 'open' : 'closed'}`}>
                      {b ? 'O' : '|'}
                    </span>
                  ))}
                </span>
                {revealBreakdown.length > 0 && (
                  <span className="fb-hint">{revealBreakdown.join(' + ')} = {target}</span>
                )}
              </div>
            )}
          </div>

          <div className="opele-chain-wrap">
            <div className="opele-chain-header">
              <span className="opele-chain-header__line"/>
              <span className="opele-chain-header__label">Opele Ifa · 8-bit Binary Chain</span>
              <span className="opele-chain-header__line"/>
            </div>
            <div className="opele-chain">
              {bits.map((b, i) => (
                <OpelePod key={i} idx={i} open={b === 1} locked={isReveal} onClick={() => toggleBit(i)} />
              ))}
            </div>
            <div className="opele-bitrow">
              {bits.map((b, i) => (
                <span key={i} className={`opele-bitrow__cell opele-bitrow__cell--${b ? 'one' : 'zero'}`}>{b}</span>
              ))}
            </div>
            <div className="opele-odu-row">
              <span className="opele-odu-row__label">Odu Ifa →</span>
              <span className="opele-odu-row__code">{bits.join('')}</span>
              <span className="opele-odu-row__eq">= {bitsToDecimal(bits)}<sub>10</sub></span>
            </div>
          </div>

          <div className="bin__running">
            {breakdown.length > 0
              ? <>
                  <span className="bin__breakdown">{breakdown.join(' + ')}</span>
                  <span className="bin__eq"> = </span>
                  <span className={`bin__running-val${isMatch ? ' bin__running-val--match' : ''}`}>{playerVal}</span>
                </>
              : <span className="bin__running-hint">Tap seeds above to start encoding</span>
            }
          </div>

          {!isReveal && (
            <button
              className={`btn bin__submit anc-submit${isMatch ? ' bin__submit--ready' : ''}`}
              onClick={doSubmit}
            >
              {isMatch ? '✓ Submit Cast' : 'Check Cast'}
            </button>
          )}
        </>
      )}

      {/* ── OBI SISO section (4 kola lobes, 4-bit) ── */}
      {roundType === 'obi' && (
        <>
          <div className={`bin__card anc-card${isReveal ? (isCorrect ? ' bin__card--ok' : ' bin__card--no') : ''}`}>
            <div className="bin__card-label anc-card__lbl">Round {round + 1} / {BIN_ROUNDS} · Obi Siso — 4-bit Kola Nut</div>
            <div className="anc-card__intro">
              Cast the kola nut — flip each lobe to encode this value
            </div>
            <div className="bin__challenge">
              <div className="bin__target-num">{target}</div>
              <div className="bin__target-sub">flip the 4 kola lobes · face-up = 1 · face-down = 0</div>
            </div>
            {isReveal && (
              <div className={`q-feedback ${isCorrect ? 'q-feedback--ok' : 'q-feedback--no'}`}>
                {isCorrect
                  ? <><span className="fb-icon">✓</span> Àṣẹ! Correct.</>
                  : <><span className="fb-icon">✗</span> Correct: {targetBits4.join(' ')} = {target}</>
                }
              </div>
            )}
          </div>

          <div className="obi-wrap">
            <div className="obi-header">
              <span className="obi-header__line"/>
              <span className="obi-header__label">Obi Siso · 4-bit Divination Cast</span>
              <span className="obi-header__line"/>
            </div>
            <div className="obi-lobes">
              {shortBits.map((b, i) => (
                <KolaLobe key={i} up={b === 1} locked={isReveal} idx={i} onClick={() => toggleShortBit(i)} />
              ))}
            </div>
            {/* Wooden bowl SVG beneath the lobes */}
            <svg className="obi-bowl-svg" viewBox="0 0 320 48" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <linearGradient id="bowl-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#7a4e20"/>
                  <stop offset="100%" stopColor="#3e2508"/>
                </linearGradient>
              </defs>
              {/* Bowl rim */}
              <ellipse cx="160" cy="8" rx="155" ry="10" fill="none" stroke="#9b6530" strokeWidth="3"/>
              {/* Bowl body */}
              <path d="M 5,8 Q 160,90 315,8" fill="none" stroke="url(#bowl-grad)" strokeWidth="5"/>
              {/* Bowl shadow */}
              <ellipse cx="160" cy="8" rx="155" ry="10" fill="rgba(0,0,0,0.18)"/>
            </svg>
            <div className="obi-bitrow">
              {shortBits.map((b, i) => (
                <span key={i} className={`obi-bitrow__cell obi-bitrow__cell--${b ? 'one' : 'zero'}`}>{b}</span>
              ))}
            </div>
            <div className="obi-odu-row">
              <span className="obi-odu-row__label">Odu Oosa →</span>
              <span className="obi-odu-row__code">{shortBits.join('')}</span>
              <span className="obi-odu-row__eq">= {shortVal}<sub>10</sub></span>
            </div>
          </div>

          <div className="bin__running">
            {shortBits.some(b => b) ? (
              <>
                <span className="bin__breakdown">
                  {shortBits.map((b, i) => b ? (1 << (3 - i)) : 0).filter(v => v > 0).join(' + ')}
                </span>
                <span className="bin__eq"> = </span>
                <span className={`bin__running-val${isMatch ? ' bin__running-val--match' : ''}`}>{shortVal}</span>
              </>
            ) : <span className="bin__running-hint">Flip lobes above to start</span>}
          </div>

          {!isReveal && (
            <button
              className={`btn bin__submit anc-submit${isMatch ? ' bin__submit--ready' : ''}`}
              onClick={doSubmit}
            >
              {isMatch ? '✓ Submit Cast' : 'Check Cast'}
            </button>
          )}
        </>
      )}

      {/* ── ERINDINLOGUN section (16 cowries, count open = target) ── */}
      {roundType === 'cowrie' && (
        <>
          <div className={`bin__card anc-card${isReveal ? (isCorrect ? ' bin__card--ok' : ' bin__card--no') : ''}`}>
            <div className="bin__card-label anc-card__lbl">Round {round + 1} / {BIN_ROUNDS} · Erindinlogun — 16 Cowrie Shells</div>
            <div className="anc-card__intro">
              Toss the shells — tap exactly this many to land mouth-up
            </div>
            <div className="bin__challenge">
              <div className="bin__target-num">{target}</div>
              <div className="bin__target-sub">open mouth-up shells must equal {target}</div>
            </div>
            {isReveal && (
              <div className={`q-feedback ${isCorrect ? 'q-feedback--ok' : 'q-feedback--no'}`}>
                {isCorrect
                  ? <><span className="fb-icon">✓</span> Àṣẹ! {target} shells open.</>
                  : <><span className="fb-icon">✗</span> You had {cowrieOpen} open — needed {target}.</>
                }
              </div>
            )}
          </div>

          <div className="cowrie-wrap">
            <div className="cowrie-header">
              <span className="cowrie-header__line"/>
              <span className="cowrie-header__label">Erindinlogun · 16 Aje Cowries</span>
              <span className="cowrie-header__line"/>
            </div>
            <div className="cowrie-score-row">
              <span className={`cowrie-score__val${isMatch ? ' cowrie-score__val--match' : ''}`}>{cowrieOpen}</span>
              <span className="cowrie-score__sep"> / </span>
              <span className="cowrie-score__target">{target}</span>
              <span className="cowrie-score__lbl"> mouth-up</span>
            </div>
            <div className="cowrie-mat">
              <div className="cowrie-grid">
                {cowrieBits.map((b, i) => (
                  <CowrieShell key={i} open={b === 1} locked={isReveal} idx={i} onClick={() => toggleCowrie(i)} />
                ))}
              </div>
            </div>
            <div className="cowrie-odu-row">
              <span className="cowrie-odu-row__label">Odu Oosa →</span>
              <span className="cowrie-odu-row__count">{cowrieOpen} open</span>
              <span className="cowrie-odu-row__eq">= {cowrieOpen}<sub>10</sub></span>
            </div>
          </div>

          {!isReveal && (
            <button
              className={`btn bin__submit anc-submit${isMatch ? ' bin__submit--ready' : ''}`}
              onClick={doSubmit}
            >
              {isMatch ? '✓ Submit Toss' : 'Check Count'}
            </button>
          )}
        </>
      )}

      {/* ── ODU IFA CODES section (4-bit pattern MCQ) ── */}
      {roundType === 'odu4' && odu4Q && (
        <>
          <div className={`bin__card anc-card${isReveal ? (isCorrect ? ' bin__card--ok' : ' bin__card--no') : ''}`}>
            <div className="bin__card-label anc-card__lbl">Round {round + 1} / {BIN_ROUNDS} · Odu Ifa — 4-bit Sacred Code</div>
            <div className="anc-card__intro">
              This binary pattern is the mark of which Odu?
            </div>

            <div className="odu4-code">
              {odu4Q.code.split('').map((b, i) => (
                <span key={i} className={`odu4-code__mark odu4-code__mark--${b === '1' ? 'ogbe' : 'oyeku'}`}>
                  <span className="odu4-code__sym">{b === '1' ? 'O' : '|'}</span>
                  <span className="odu4-code__bit">{b}</span>
                </span>
              ))}
            </div>
            <div className="odu4-code__hint">
              O = OgbeBit (IfaZero) · | = OyekuBit (IfaOne) · binary: {parseInt(odu4Q.code, 2)} in decimal
            </div>

            {/* ── Alternative encoding: | = 0 = Ogbe (IfaZero), || = 1 = Oyeku (IfaOne) ── */}
            <div className="odu4-marks-sep">
              <span className="odu4-marks-sep__line"/>
              <span className="odu4-marks-sep__lbl">Ifa tray marks</span>
              <span className="odu4-marks-sep__line"/>
            </div>
            <div className="odu4-marks">
              {odu4Q.code.split('').map((b, i) => (
                <span key={i} className={`odu4-mark odu4-mark--${b === '1' ? 'ogbe' : 'oyeku'}`}>
                  <svg className="odu4-mark__svg"
                       viewBox={b === '1' ? '0 0 18 40' : '0 0 28 40'}
                       width={b === '1' ? '13' : '21'} height="32"
                       style={{display:'block', overflow:'visible'}}>
                    {b === '1' ? (
                      <line x1="9" y1="2" x2="9" y2="38" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round"/>
                    ) : (
                      <>
                        <line x1="7"  y1="2" x2="7"  y2="38" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round"/>
                        <line x1="21" y1="2" x2="21" y2="38" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round"/>
                      </>
                    )}
                  </svg>
                  <span className="odu4-mark__lbl">{b === '1' ? 'OgbeBit' : 'OyekuBit'}</span>
                  <span className="odu4-mark__bit">{b}</span>
                </span>
              ))}
            </div>
            <div className="odu4-marks__hint">
              O = | · OgbeBit (IfaZero) &nbsp;·&nbsp; I = || · OyekuBit (IfaOne)
            </div>

            {isReveal && (
              <div className={`q-feedback ${isCorrect ? 'q-feedback--ok' : 'q-feedback--no'}`}>
                {isCorrect
                  ? <><span className="fb-icon">✓</span> Àṣẹ! That is {odu4Q.answerName}.</>
                  : <><span className="fb-icon">✗</span> That was <strong>{odu4Q.answerName}</strong> · code {odu4Q.code}</>
                }
              </div>
            )}
          </div>

          <div className="odu4-choices">
            {odu4Q.choices.map(name => {
              const isPicked  = picked === name;
              const isAnswer  = name === odu4Q.answerName;
              let cls = 'odu4-choice';
              if (isReveal) cls += isAnswer ? ' odu4-choice--correct' : isPicked ? ' odu4-choice--wrong' : ' odu4-choice--dim';
              return (
                <button
                  key={name}
                  className={cls}
                  onClick={() => !isReveal && handlePickOdu4(name)}
                  disabled={isReveal}
                >
                  {name}
                </button>
              );
            })}
          </div>
        </>
      )}

    </div>
  );
}

// ════════════════════════════════════════════════════════════
// GATE SVG — logic gate symbol renderer
// ════════════════════════════════════════════════════════════

function GateSVG({ gateId, inputs, showLabel, size }) {
  const scale = (size || 90) / 80;
  const gate  = GATE_MAP[gateId];
  const col   = (gate && gate.color) || '#00e676';
  const sw    = 2.5;
  const ia    = (inputs && inputs.a !== undefined) ? String(inputs.a) : null;
  const ib    = (inputs && inputs.b !== undefined) ? String(inputs.b) : null;

  // All coordinates in a 140×80 viewBox.
  // AND/NAND: flat left at x=35, semicircle arc center (55,40) r=25, tip at (80,40)
  // OR/NOR  : concave-left Q-bezier, tip at (80,40)
  // NOT     : triangle, tip at x=86, bubble at x=92
  // XOR/XNOR: shifted OR body + extra left arc
  const SP = {
    AND:  { body:'M 35 15 L 35 65 L 55 65 A 25 25 0 0 1 55 15 Z',
            wA:[0,28,35,28], wB:[0,52,35,52], wOut:[80,40,140,40] },
    NAND: { body:'M 35 15 L 35 65 L 55 65 A 25 25 0 0 1 55 15 Z',
            bubble:[85,40,5],
            wA:[0,28,35,28], wB:[0,52,35,52], wOut:[90,40,140,40] },
    OR:   { body:'M 25 15 Q 43 40 25 65 Q 60 58 80 40 Q 60 22 25 15 Z',
            wA:[0,28,31,28], wB:[0,52,31,52], wOut:[80,40,140,40] },
    NOR:  { body:'M 25 15 Q 43 40 25 65 Q 60 58 80 40 Q 60 22 25 15 Z',
            bubble:[85,40,5],
            wA:[0,28,31,28], wB:[0,52,31,52], wOut:[90,40,140,40] },
    NOT:  { body:'M 28 12 L 28 68 L 86 40 Z',
            bubble:[92,40,6],
            wA:[0,40,28,40], wOut:[98,40,140,40], single:true },
    XOR:  { body:'M 33 15 Q 51 40 33 65 Q 68 58 88 40 Q 68 22 33 15 Z',
            xtra:'M 25 15 Q 43 40 25 65',
            wA:[0,28,39,28], wB:[0,52,39,52], wOut:[88,40,140,40] },
    XNOR: { body:'M 33 15 Q 51 40 33 65 Q 68 58 88 40 Q 68 22 33 15 Z',
            xtra:'M 25 15 Q 43 40 25 65',
            bubble:[93,40,5],
            wA:[0,28,39,28], wB:[0,52,39,52], wOut:[98,40,140,40] },
  };

  const sp = SP[gateId] || SP.AND;
  const w  = Math.round(140 * scale);
  const h  = Math.round(80  * scale);

  return (
    <svg viewBox="0 0 140 80" width={w} height={h} style={{overflow:'visible',display:'block'}}>
      {sp.xtra && (
        <path d={sp.xtra} fill="none" stroke={col} strokeWidth={sw} strokeLinecap="round" />
      )}
      <path d={sp.body} fill={col} fillOpacity="0.1" stroke={col}
            strokeWidth={sw} strokeLinejoin="round" strokeLinecap="round" />
      {sp.bubble && (
        <circle cx={sp.bubble[0]} cy={sp.bubble[1]} r={sp.bubble[2]}
                fill={col} fillOpacity="0.1" stroke={col} strokeWidth={sw} />
      )}
      {sp.wA && (
        <line x1={sp.wA[0]} y1={sp.wA[1]} x2={sp.wA[2]} y2={sp.wA[3]}
              stroke={col} strokeWidth={sw} strokeLinecap="round" />
      )}
      {sp.wB && (
        <line x1={sp.wB[0]} y1={sp.wB[1]} x2={sp.wB[2]} y2={sp.wB[3]}
              stroke={col} strokeWidth={sw} strokeLinecap="round" />
      )}
      <line x1={sp.wOut[0]} y1={sp.wOut[1]} x2={sp.wOut[2]} y2={sp.wOut[3]}
            stroke={col} strokeWidth={sw} strokeLinecap="round" />
      {sp.wA && (
        <text x={2} y={sp.wA[1]+5} fontSize="14" fontWeight="900" fill={col}
              fontFamily="'Courier New',monospace" opacity={ia !== null ? 1 : 0.4}>
          {ia !== null ? ia : 'A'}
        </text>
      )}
      {sp.wB && (
        <text x={2} y={sp.wB[1]+5} fontSize="14" fontWeight="900" fill={col}
              fontFamily="'Courier New',monospace" opacity={ib !== null ? 1 : 0.4}>
          {ib !== null ? ib : 'B'}
        </text>
      )}
      {showLabel !== false && (
        <text x="70" y="76" fontSize="11" fontWeight="700" fill={col}
              textAnchor="middle" fontFamily="'Courier New',monospace" opacity="0.7">
          {gateId}
        </text>
      )}
    </svg>
  );
}

// ════════════════════════════════════════════════════════════
// IFAGATES GAME
// ════════════════════════════════════════════════════════════

function GatesGame({ onEnd }) {
  const questionsRef = useRef(makeGatesQuestions(GATES_ROUNDS));

  const S = useRef({
    round: 0, lives: LIVES, score: 0, streak: 0,
    timeLeft: GATES_TIME, phase: 'asking',
  });

  const [round,    setRound]    = useState(0);
  const [lives,    setLives]    = useState(LIVES);
  const [score,    setScore]    = useState(0);
  const [streak,   setStreak]   = useState(0);
  const [timeLeft, setTimeLeft] = useState(GATES_TIME);
  const [phase,    setPhase]    = useState('asking');
  const [chosen,   setChosen]   = useState(null);

  const timerRef  = useRef(null);
  const revealRef = useRef(null);

  // Keep mutable ref in sync with display state after every render
  useEffect(() => {
    S.current = { round, lives, score, streak, timeLeft, phase };
  });

  // Start/restart timer on each new round
  useEffect(() => {
    clearInterval(timerRef.current);
    S.current.timeLeft = GATES_TIME;
    S.current.phase    = 'asking';
    setTimeLeft(GATES_TIME);
    setPhase('asking');
    setChosen(null);

    timerRef.current = setInterval(() => {
      if (S.current.phase !== 'asking') { clearInterval(timerRef.current); return; }
      const tl = S.current.timeLeft - 1;
      S.current.timeLeft = tl;
      setTimeLeft(tl);
      if (tl <= 0) { clearInterval(timerRef.current); handleAnswer(null); }
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [round]);

  useEffect(() => () => {
    clearInterval(timerRef.current);
    clearTimeout(revealRef.current);
  }, []);

  function handleAnswer(picked) {
    const s = S.current;
    if (s.phase !== 'asking') return;
    clearInterval(timerRef.current);
    S.current.phase = 'reveal';
    setPhase('reveal');
    setChosen(picked);

    const q       = questionsRef.current[s.round];
    const correct = picked === q.answer;
    let newLives  = s.lives;
    let newScore  = s.score;
    let newStreak = s.streak;

    if (correct) {
      newStreak = s.streak + 1;
      newScore  = s.score + 100 * Math.max(1, newStreak);
    } else {
      newLives  = s.lives - 1;
      newStreak = 0;
    }

    S.current.lives  = newLives;
    S.current.score  = newScore;
    S.current.streak = newStreak;
    setLives(newLives);
    setScore(newScore);
    setStreak(newStreak);

    if (newLives <= 0) {
      revealRef.current = setTimeout(() => onEnd({ score: newScore }), 1400);
      return;
    }
    const nextRound = s.round + 1;
    if (nextRound >= GATES_ROUNDS) {
      revealRef.current = setTimeout(() => onEnd({ score: newScore }), 1400);
      return;
    }
    revealRef.current = setTimeout(() => {
      S.current.round = nextRound;
      setRound(nextRound);
    }, 1400);
  }

  const q = questionsRef.current[round];

  return (
    <div className="gates">

      {/* Banner */}
      <div className="gates__banner">
        <div className="gates__logo-chip">
          <span className="gates__chip-sym gates__chip-sym--a">∧</span>
          <span className="gates__chip-sym gates__chip-sym--o">∨</span>
        </div>
        <div className="gates__banner-text">
          <div className="gates__title">IfaGates</div>
          <div className="gates__sub">Logic Gate Training</div>
        </div>
        <div className="gates__diff-badge">{round + 1} / {GATES_ROUNDS}</div>
      </div>

      {/* HUD */}
      <div className="quiz__hud gates__hud">
        <LivesRow lives={lives} />
        <div className="hud__score">
          <span className="hud__pts">{score.toLocaleString()}</span>
          {streak > 1 && (
            <span className="hud__streak gates__streak">×{streak}</span>
          )}
        </div>
        <TimerArc timeLeft={timeLeft} total={GATES_TIME} />
      </div>

      {/* Progress strip */}
      <ProgressStrip current={round} total={GATES_ROUNDS} />

      {/* Question card */}
      <div className={`gates__card${
        phase === 'reveal'
          ? (chosen === q.answer ? ' gates__card--ok' : ' gates__card--no')
          : ''
      }`}>
        <div className="q-card__label">
          {q.type === 'output'   && 'Calculate the Output'}
          {q.type === 'identify' && 'Identify the Gate'}
          {q.type === 'symbol'   && 'Name this Gate'}
          {q.type === 'concept'  && 'Know Your Gates'}
        </div>

        {/* Gate SVG — shown for output (with input labels) and symbol (no labels) */}
        {(q.type === 'output' || q.type === 'symbol') && (
          <div className="gates__svg-wrap">
            <GateSVG
              gateId={q.gateId}
              inputs={q.type === 'output' ? q.inputs : {}}
              showLabel={q.type === 'output'}
              size={96}
            />
          </div>
        )}

        {/* Truth-table row — shown for identify questions */}
        {q.type === 'identify' && (
          <div className="gates__truth-display">
            <div className="gates__td-row">
              <span className="gates__td-cell">A = <strong>{q.inputs.a}</strong></span>
              <span className="gates__td-cell">B = <strong>{q.inputs.b}</strong></span>
              <span className="gates__td-arrow">→</span>
              <span className="gates__td-out">Out = <strong>{q.showOut}</strong></span>
            </div>
            <div className="gates__td-hint">Which gate produces this output?</div>
          </div>
        )}

        {/* Concept icon — decorative for concept questions */}
        {q.type === 'concept' && (
          <div className="gates__concept-icon">⚡</div>
        )}

        {/* Question prompt */}
        <div className="q-prompt">{q.prompt}</div>

        {/* Reveal feedback */}
        {phase === 'reveal' && (
          <div className={`q-feedback ${chosen === q.answer ? 'q-feedback--ok' : 'q-feedback--no'}`}>
            <span className="fb-icon">{chosen === q.answer ? '✓' : '✗'}</span>
            {chosen === q.answer ? 'Correct!' : `Answer: ${q.answer}`}
            <div className="fb-hint">{q.explain}</div>
          </div>
        )}

        {/* Choice buttons */}
        <div className="choices">
          {q.choices.map((c, i) => {
            let cls = 'choice gates__choice';
            if (phase === 'reveal') {
              if (c === q.answer)    cls += ' choice--ok';
              else if (c === chosen) cls += ' choice--no';
              else                   cls += ' choice--dim';
            }
            return (
              <button key={i} className={cls} disabled={phase !== 'asking'}
                      onClick={() => handleAnswer(c)}>
                {c}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// IFAMOD — VISUAL HELPERS
// ════════════════════════════════════════════════════════════

function ClockFace({ hour, size, dim }) {
  size = size || 90;
  const cx = size / 2, cy = size / 2, r = size / 2 - 6;
  const a  = ((hour % 12) / 12) * 2 * Math.PI - Math.PI / 2;
  const hx = cx + r * 0.52 * Math.cos(a);
  const hy = cy + r * 0.52 * Math.sin(a);
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={cx} cy={cy} r={r}
        fill="rgba(15,8,35,0.85)"
        stroke={dim ? 'rgba(124,77,255,0.2)' : 'rgba(124,77,255,0.55)'}
        strokeWidth="2" />
      {Array.from({ length: 12 }, (_, i) => {
        const ta = (i / 12) * 2 * Math.PI - Math.PI / 2;
        const tx = cx + (r - 11) * Math.cos(ta);
        const ty = cy + (r - 11) * Math.sin(ta);
        return (
          <text key={i} x={tx} y={ty} textAnchor="middle" dominantBaseline="middle"
            fontSize={size * 0.085}
            fill={dim ? 'rgba(180,150,255,0.3)' : 'rgba(200,170,255,0.72)'}>
            {i === 0 ? 12 : i}
          </text>
        );
      })}
      {!dim ? (
        <>
          <line x1={cx} y1={cy} x2={hx} y2={hy}
            stroke="#aa66ff" strokeWidth={Math.max(2, size * 0.038)} strokeLinecap="round" />
          <circle cx={cx} cy={cy} r={size * 0.042} fill="#aa66ff" />
        </>
      ) : (
        <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle"
          fontSize={size * 0.22} fill="rgba(180,150,255,0.35)">?</text>
      )}
    </svg>
  );
}

function OduCircle({ startIdx, endIdx, phase, size }) {
  size = size || 120;
  const cx = size / 2, cy = size / 2, r = size / 2 - 14;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={cx} cy={cy} r={r} fill="none"
        stroke="rgba(124,77,255,0.12)" strokeWidth="1" />
      {Array.from({ length: 16 }, (_, i) => {
        const a      = (i / 16) * 2 * Math.PI - Math.PI / 2;
        const x      = cx + r * Math.cos(a);
        const y      = cy + r * Math.sin(a);
        const isStart = i === startIdx;
        const isEnd   = phase === 'reveal' && i === endIdx;
        const dotR    = isStart || isEnd ? 5 : 2.5;
        const fill    = isStart ? '#7c4dff' : isEnd ? '#ea80fc' : 'rgba(160,130,220,0.22)';
        return (
          <g key={i}>
            <circle cx={x} cy={y} r={dotR} fill={fill} />
            {isStart && (
              <text x={x} y={y - 9} textAnchor="middle" dominantBaseline="middle"
                fontSize="7.5" fill="rgba(200,175,255,0.88)">
                {ODU_NAMES[i].slice(0, 3)}
              </text>
            )}
            {isEnd && phase === 'reveal' && (
              <text x={x} y={y + 10} textAnchor="middle" dominantBaseline="middle"
                fontSize="7" fill="rgba(234,128,252,0.9)">
                {ODU_NAMES[i].slice(0, 3)}
              </text>
            )}
          </g>
        );
      })}
      <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle"
        fontSize="8.5" fill="rgba(180,150,255,0.42)">mod 16</text>
    </svg>
  );
}

function ModViz({ q, phase }) {
  if (q.type === 'basic') {
    const { X, N, R } = q.display;
    return (
      <div className="mod-viz mod-viz--basic">
        <span className="mod-viz__num">{X}</span>
        <span className="mod-viz__kw">mod</span>
        <span className="mod-viz__mod">{N}</span>
        <span className="mod-viz__eq">=</span>
        <span className={`mod-viz__ans${phase === 'reveal' ? ' mod-viz__ans--shown' : ''}`}>
          {phase === 'reveal' ? R : '?'}
        </span>
      </div>
    );
  }

  if (q.type === 'equiv') {
    const { X, N, R } = q.display;
    return (
      <div className="mod-viz mod-viz--equiv">
        <div className="mod-viz__equiv-row">
          <span className="mod-viz__num">{X}</span>
          <span className="mod-viz__kw">mod</span>
          <span className="mod-viz__mod">{N}</span>
          <span className="mod-viz__eq">=</span>
          <span className="mod-viz__rem">{R}</span>
        </div>
        <div className="mod-viz__equiv-sym">≡</div>
        <div className="mod-viz__equiv-row">
          <span className="mod-viz__ans mod-viz__ans--q">?</span>
          <span className="mod-viz__kw">mod</span>
          <span className="mod-viz__mod">{N}</span>
        </div>
      </div>
    );
  }

  if (q.type === 'clock') {
    const { H, K, result } = q.display;
    return (
      <div className="mod-viz mod-viz--clock">
        <div className="mod-viz__clock-col">
          <ClockFace hour={H} size={80} />
          <div className="mod-viz__clock-lbl">{H}:00</div>
        </div>
        <div className="mod-viz__clock-op">+{K}h</div>
        <div className="mod-viz__clock-col">
          <ClockFace hour={phase === 'reveal' ? result : 0} size={80} dim={phase !== 'reveal'} />
          <div className="mod-viz__clock-lbl">{phase === 'reveal' ? `${result}:00` : '?'}</div>
        </div>
      </div>
    );
  }

  if (q.type === 'odu') {
    const { startIdx, endIdx, jump } = q.display;
    return (
      <div className="mod-viz mod-viz--odu">
        <OduCircle startIdx={startIdx} endIdx={endIdx} phase={phase} size={118} />
        <div className="mod-viz__odu-lbl">+{jump} steps (mod 16)</div>
      </div>
    );
  }

  return null;
}

// ════════════════════════════════════════════════════════════
// IFAMOD GAME
// ════════════════════════════════════════════════════════════

function ModGame({ onEnd }) {
  const questionsRef = useRef(makeModQuestions(MOD_ROUNDS));

  const S = useRef({
    round: 0, lives: LIVES, score: 0, streak: 0,
    timeLeft: MOD_TIME, phase: 'asking',
  });

  const [round,    setRound]    = useState(0);
  const [lives,    setLives]    = useState(LIVES);
  const [score,    setScore]    = useState(0);
  const [streak,   setStreak]   = useState(0);
  const [timeLeft, setTimeLeft] = useState(MOD_TIME);
  const [phase,    setPhase]    = useState('asking');
  const [chosen,   setChosen]   = useState(null);

  const timerRef  = useRef(null);
  const revealRef = useRef(null);

  useEffect(() => {
    S.current = { round, lives, score, streak, timeLeft, phase };
  });

  useEffect(() => {
    clearInterval(timerRef.current);
    S.current.timeLeft = MOD_TIME;
    S.current.phase    = 'asking';
    setTimeLeft(MOD_TIME);
    setPhase('asking');
    setChosen(null);

    timerRef.current = setInterval(() => {
      if (S.current.phase !== 'asking') { clearInterval(timerRef.current); return; }
      const tl = S.current.timeLeft - 1;
      S.current.timeLeft = tl;
      setTimeLeft(tl);
      if (tl <= 0) { clearInterval(timerRef.current); handleAnswer(null); }
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [round]);

  useEffect(() => () => {
    clearInterval(timerRef.current);
    clearTimeout(revealRef.current);
  }, []);

  function handleAnswer(picked) {
    const s = S.current;
    if (s.phase !== 'asking') return;
    clearInterval(timerRef.current);
    S.current.phase = 'reveal';
    setPhase('reveal');
    setChosen(picked);

    const q       = questionsRef.current[s.round];
    const correct = picked === q.answer;
    let newLives  = s.lives;
    let newScore  = s.score;
    let newStreak = s.streak;

    if (correct) {
      newStreak = s.streak + 1;
      newScore  = s.score + 100 * Math.max(1, newStreak);
    } else {
      newLives  = s.lives - 1;
      newStreak = 0;
    }

    S.current.lives  = newLives;
    S.current.score  = newScore;
    S.current.streak = newStreak;
    setLives(newLives);
    setScore(newScore);
    setStreak(newStreak);

    if (newLives <= 0 || s.round + 1 >= MOD_ROUNDS) {
      revealRef.current = setTimeout(() => onEnd({ score: newScore }), 1400);
      return;
    }
    revealRef.current = setTimeout(() => {
      S.current.round = s.round + 1;
      setRound(s.round + 1);
    }, 1400);
  }

  const q = questionsRef.current[round];

  const typeLabel = {
    basic:  'Calculate the Remainder',
    odu:    'Odu Circle — Mod 16',
    clock:  'Clock Arithmetic — Mod 12',
    equiv:  'Find the Equivalent',
  }[q.type];

  return (
    <div className="mod">

      {/* Banner */}
      <div className="mod__banner">
        <div className="mod__logo-chip">
          <span className="mod__chip-sym">%</span>
        </div>
        <div className="mod__banner-text">
          <div className="mod__title">IfaMod</div>
          <div className="mod__sub">Modular Arithmetic</div>
        </div>
        <div className="mod__diff-badge">{round + 1} / {MOD_ROUNDS}</div>
      </div>

      {/* HUD */}
      <div className="quiz__hud mod__hud">
        <LivesRow lives={lives} />
        <div className="hud__score">
          <span className="hud__pts">{score.toLocaleString()}</span>
          {streak > 1 && <span className="hud__streak mod__streak">×{streak}</span>}
        </div>
        <TimerArc seconds={timeLeft} total={MOD_TIME} />
      </div>

      <ProgressStrip current={round} total={MOD_ROUNDS} />

      {/* Question card */}
      <div className={`mod__card${
        phase === 'reveal'
          ? (chosen === q.answer ? ' mod__card--ok' : ' mod__card--no')
          : ''
      }`}>
        <div className="q-card__label">{typeLabel}</div>

        <div className="mod__viz-wrap">
          <ModViz q={q} phase={phase} />
        </div>

        <div className="q-prompt">{q.prompt}</div>

        {phase === 'reveal' && (
          <div className={`q-feedback ${chosen === q.answer ? 'q-feedback--ok' : 'q-feedback--no'}`}>
            <span className="fb-icon">{chosen === q.answer ? '✓' : '✗'}</span>
            {chosen === q.answer ? 'Correct!' : `Answer: ${q.answer}`}
            <div className="fb-hint">{q.explain}</div>
          </div>
        )}

        <div className="choices">
          {q.choices.map((c, i) => {
            let cls = 'choice';
            if (phase === 'reveal') {
              if (c === q.answer)    cls += ' choice--ok';
              else if (c === chosen) cls += ' choice--no';
              else                   cls += ' choice--dim';
            }
            return (
              <button key={i} className={cls} disabled={phase !== 'asking'}
                      onClick={() => handleAnswer(c)}>
                {c}
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
}

// ════════════════════════════════════════════════════════════
// IFASCII GAME
// ════════════════════════════════════════════════════════════

function AsciiGame({ onEnd }) {
  const questionsRef = useRef(makeAsciiQuestions(ASCII_ROUNDS));
  const S = useRef({ round: 0, lives: LIVES, score: 0, streak: 0, timeLeft: ASCII_TIME, phase: 'asking' });
  const [round,    setRound]    = useState(0);
  const [lives,    setLives]    = useState(LIVES);
  const [score,    setScore]    = useState(0);
  const [streak,   setStreak]   = useState(0);
  const [timeLeft, setTimeLeft] = useState(ASCII_TIME);
  const [phase,    setPhase]    = useState('asking');
  const [chosen,   setChosen]   = useState(null);
  const timerRef  = useRef(null);
  const revealRef = useRef(null);

  useEffect(() => { S.current = { round, lives, score, streak, timeLeft, phase }; });

  useEffect(() => {
    clearInterval(timerRef.current);
    S.current.timeLeft = ASCII_TIME; S.current.phase = 'asking';
    setTimeLeft(ASCII_TIME); setPhase('asking'); setChosen(null);
    timerRef.current = setInterval(() => {
      if (S.current.phase !== 'asking') { clearInterval(timerRef.current); return; }
      const tl = S.current.timeLeft - 1;
      S.current.timeLeft = tl; setTimeLeft(tl);
      if (tl <= 0) { clearInterval(timerRef.current); handleAnswer(null); }
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [round]);

  useEffect(() => () => { clearInterval(timerRef.current); clearTimeout(revealRef.current); }, []);

  function handleAnswer(picked) {
    const s = S.current;
    if (s.phase !== 'asking') return;
    clearInterval(timerRef.current);
    S.current.phase = 'reveal'; setPhase('reveal'); setChosen(picked);
    const q = questionsRef.current[s.round];
    const correct = picked === q.answer;
    let newLives = s.lives, newScore = s.score, newStreak = s.streak;
    if (correct) { newStreak = s.streak + 1; newScore = s.score + 100 * Math.max(1, newStreak); }
    else         { newLives  = s.lives - 1;  newStreak = 0; }
    S.current.lives = newLives; S.current.score = newScore; S.current.streak = newStreak;
    setLives(newLives); setScore(newScore); setStreak(newStreak);
    if (newLives <= 0 || s.round + 1 >= ASCII_ROUNDS) {
      revealRef.current = setTimeout(() => onEnd({ score: newScore }), 1400); return;
    }
    revealRef.current = setTimeout(() => { S.current.round = s.round + 1; setRound(s.round + 1); }, 1400);
  }

  const q = questionsRef.current[round];
  const typeLabel = { 'char-to-dec': 'Decimal Code', 'dec-to-char': 'Which Character?',
                      'char-to-hex': 'Hex Code', 'ifa-bit': 'IFABit Pattern → ASCII' }[q.type];
  return (
    <div className="ascii-game">
      <div className="ascii__banner">
        <div className="ascii__logo-chip"><span className="ascii__chip-sym">Aa</span></div>
        <div className="ascii__banner-text">
          <div className="ascii__title">IfaASCII · Ifascii</div>
          <div className="ascii__sub">ASCII · Computing · IFABit · STEM</div>
        </div>
        <div className="ascii__diff-badge">{round + 1} / {ASCII_ROUNDS}</div>
      </div>
      <div className="quiz__hud ascii__hud">
        <LivesRow lives={lives} />
        <div className="hud__score">
          <span className="hud__pts">{score.toLocaleString()}</span>
          {streak > 1 && <span className="hud__streak ascii__streak">×{streak}</span>}
        </div>
        <TimerArc seconds={timeLeft} total={ASCII_TIME} />
      </div>
      <ProgressStrip current={round} total={ASCII_ROUNDS} />
      <div className={`ascii__card${phase==='reveal' ? (chosen===q.answer ? ' ascii__card--ok' : ' ascii__card--no') : ''}`}>
        <div className="q-card__label">{typeLabel}</div>
        <div className="q-prompt">{q.prompt}</div>
        <div className={`ascii__display${q.type==='ifa-bit' ? ' ascii__display--bits' : ''}`}>{q.display}</div>
        {phase === 'reveal' && (
          <div className={`q-feedback ${chosen===q.answer ? 'q-feedback--ok' : 'q-feedback--no'}`}>
            <span className="fb-icon">{chosen===q.answer ? '✓' : '✗'}</span>
            {chosen===q.answer ? 'Correct!' : `Answer: ${q.answer}`}
            <div className="fb-hint">{q.explain}</div>
            <div className="ascii__ifa-note">✦ Ifa ↔ ASCII: {q.ifaNote}</div>
          </div>
        )}
        <div className="choices">
          {q.choices.map((c, i) => {
            let cls = 'choice';
            if (phase === 'reveal') {
              if (c === q.answer) cls += ' choice--ok';
              else if (c === chosen) cls += ' choice--no';
              else cls += ' choice--dim';
            }
            return <button key={i} className={cls} disabled={phase !== 'asking'} onClick={() => handleAnswer(c)}>{c}</button>;
          })}
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// IFA-UNICODE GAME
// ════════════════════════════════════════════════════════════

function UnicodeGame({ onEnd }) {
  const questionsRef = useRef(makeUnicodeQuestions(UNICODE_ROUNDS));
  const S = useRef({ round: 0, lives: LIVES, score: 0, streak: 0, timeLeft: UNICODE_TIME, phase: 'asking' });
  const [round,    setRound]    = useState(0);
  const [lives,    setLives]    = useState(LIVES);
  const [score,    setScore]    = useState(0);
  const [streak,   setStreak]   = useState(0);
  const [timeLeft, setTimeLeft] = useState(UNICODE_TIME);
  const [phase,    setPhase]    = useState('asking');
  const [chosen,   setChosen]   = useState(null);
  const timerRef  = useRef(null);
  const revealRef = useRef(null);

  useEffect(() => { S.current = { round, lives, score, streak, timeLeft, phase }; });

  useEffect(() => {
    clearInterval(timerRef.current);
    S.current.timeLeft = UNICODE_TIME; S.current.phase = 'asking';
    setTimeLeft(UNICODE_TIME); setPhase('asking'); setChosen(null);
    timerRef.current = setInterval(() => {
      if (S.current.phase !== 'asking') { clearInterval(timerRef.current); return; }
      const tl = S.current.timeLeft - 1;
      S.current.timeLeft = tl; setTimeLeft(tl);
      if (tl <= 0) { clearInterval(timerRef.current); handleAnswer(null); }
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [round]);

  useEffect(() => () => { clearInterval(timerRef.current); clearTimeout(revealRef.current); }, []);

  function handleAnswer(picked) {
    const s = S.current;
    if (s.phase !== 'asking') return;
    clearInterval(timerRef.current);
    S.current.phase = 'reveal'; setPhase('reveal'); setChosen(picked);
    const q = questionsRef.current[s.round];
    const correct = picked === q.answer;
    let newLives = s.lives, newScore = s.score, newStreak = s.streak;
    if (correct) { newStreak = s.streak + 1; newScore = s.score + 100 * Math.max(1, newStreak); }
    else         { newLives  = s.lives - 1;  newStreak = 0; }
    S.current.lives = newLives; S.current.score = newScore; S.current.streak = newStreak;
    setLives(newLives); setScore(newScore); setStreak(newStreak);
    if (newLives <= 0 || s.round + 1 >= UNICODE_ROUNDS) {
      revealRef.current = setTimeout(() => onEnd({ score: newScore }), 1400); return;
    }
    revealRef.current = setTimeout(() => { S.current.round = s.round + 1; setRound(s.round + 1); }, 1400);
  }

  const q = questionsRef.current[round];
  const typeLabel = { 'char-to-point': 'Code Point', 'point-to-char': 'Which Character?',
                      'block-identify': 'Unicode Block', 'ifa-hex': 'IFA × Unicode — Odu Hex' }[q.type];
  return (
    <div className="unicode-game">
      <div className="unicode__banner">
        <div className="unicode__logo-chip"><span className="unicode__chip-sym">U+</span></div>
        <div className="unicode__banner-text">
          <div className="unicode__title">IfaUnicode · Ifa-Unicode</div>
          <div className="unicode__sub">Unicode · Odu Hex · Global Scripts · STEM</div>
        </div>
        <div className="unicode__diff-badge">{round + 1} / {UNICODE_ROUNDS}</div>
      </div>
      <div className="quiz__hud unicode__hud">
        <LivesRow lives={lives} />
        <div className="hud__score">
          <span className="hud__pts">{score.toLocaleString()}</span>
          {streak > 1 && <span className="hud__streak unicode__streak">×{streak}</span>}
        </div>
        <TimerArc seconds={timeLeft} total={UNICODE_TIME} />
      </div>
      <ProgressStrip current={round} total={UNICODE_ROUNDS} />
      <div className={`unicode__card${phase==='reveal' ? (chosen===q.answer ? ' unicode__card--ok' : ' unicode__card--no') : ''}`}>
        <div className="q-card__label">{typeLabel}</div>
        <div className="q-prompt">{q.prompt}</div>
        <div className={`unicode__display${q.type==='ifa-hex' ? ' unicode__display--hex' : ''}`}>{q.display}</div>
        {phase === 'reveal' && (
          <div className={`q-feedback ${chosen===q.answer ? 'q-feedback--ok' : 'q-feedback--no'}`}>
            <span className="fb-icon">{chosen===q.answer ? '✓' : '✗'}</span>
            {chosen===q.answer ? 'Correct!' : `Answer: ${q.answer}`}
            <div className="fb-hint">{q.explain}</div>
            <div className="unicode__ifa-note">✦ Ifa ↔ Unicode: {q.ifaNote}</div>
          </div>
        )}
        <div className="choices">
          {q.choices.map((c, i) => {
            let cls = 'choice';
            if (phase === 'reveal') {
              if (c === q.answer) cls += ' choice--ok';
              else if (c === chosen) cls += ' choice--no';
              else cls += ' choice--dim';
            }
            return <button key={i} className={cls} disabled={phase !== 'asking'} onClick={() => handleAnswer(c)}>{c}</button>;
          })}
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// RESULT SCREEN
// ════════════════════════════════════════════════════════════

function ResultScreen({ mode, result, hiScore, bestMoves, arcBest, ayoBest, binBest, orisaQuizBest, orisaMatchBest, gatesBest, modBest, asciiBest, unicodeBest, onReplay, onMenu }) {
  const isRecord = mode === 'quiz'
    ? result.score >= hiScore
    : mode === 'ifarcadia'
      ? result.score >= arcBest
      : mode === 'ayo'
        ? result.playerScore >= ayoBest
        : mode === 'bin'
          ? result.score >= binBest
          : mode === 'orisa-quiz'
            ? result.score >= orisaQuizBest
            : mode === 'orisa-match'
              ? result.moves <= orisaMatchBest
              : mode === 'gates'
                ? result.score >= gatesBest
                : mode === 'mod'
                  ? result.score >= modBest
                  : mode === 'ascii'
                    ? result.score >= asciiBest
                    : mode === 'unicode'
                      ? result.score >= unicodeBest
                      : result.moves <= bestMoves;

  const trophy = isRecord ? '🏆'
    : mode === 'quiz'        ? '⚡'
    : mode === 'ifarcadia'   ? '📜'
    : mode === 'ayo'         ? '🌱'
    : mode === 'bin'         ? '💻'
    : mode === 'orisa-quiz'  ? '🌟'
    : mode === 'orisa-match' ? '🔮'
    : mode === 'gates'       ? '⚡'
    : mode === 'mod'         ? '🔢'
    : mode === 'ascii'       ? '🔤'
    : mode === 'unicode'     ? '🌐'
    : '🎴';

  return (
    <div className="result">
      <div className="result__trophy">{trophy}</div>
      {mode === 'ifarcadia'   && <div className="result__arc-tag">Ifarcadia</div>}
      {mode === 'ayo'         && <div className="result__ayo-tag">Ifáayò · Ayo Olopon</div>}
      {mode === 'bin'         && <div className="result__bin-tag">IfaBin - IfaBinary Code</div>}
      {mode === 'orisa-quiz'  && <div className="result__orisa-tag">OrisaQuiz · Know the Orisa</div>}
      {mode === 'orisa-match' && <div className="result__orisa-tag">OrisaMatch · Orisa Pairs</div>}
      {mode === 'gates'       && <div className="result__gates-tag">IfaGates · Logic Gate Training</div>}
      {mode === 'mod'         && <div className="result__mod-tag">IfaMod · Modular Arithmetic</div>}
      {mode === 'ascii'       && <div className="result__ascii-tag">IfaASCII · Ifascii</div>}
      {mode === 'unicode'     && <div className="result__unicode-tag">IfaUnicode · Ifa-Unicode</div>}
      <div className="result__title">
        {mode === 'ayo'
          ? (result.won ? 'You Win!' : result.playerScore === result.aiScore ? 'Draw!' : 'Oyeku Wins!')
          : (isRecord ? 'New Record!' : 'Game Over')}
      </div>

      {(mode === 'quiz' || mode === 'ifarcadia') && (
        <div className="result__body">
          <div className="result__big">{result.score.toLocaleString()}</div>
          <div className="result__sub">points</div>
          {!isRecord && (mode === 'quiz' ? hiScore : arcBest) > 0 && (
            <div className="result__prev">
              Best: {(mode === 'quiz' ? hiScore : arcBest).toLocaleString()} pts
            </div>
          )}
        </div>
      )}

      {mode === 'match' && (
        <div className="result__body">
          <div className="result__big">{result.moves}</div>
          <div className="result__sub">moves · {fmtTime(result.time)}</div>
          {!isRecord && bestMoves < Infinity && (
            <div className="result__prev">Best: {bestMoves} moves</div>
          )}
        </div>
      )}

      {mode === 'ayo' && (
        <div className="result__body">
          <div className="result__ayo-scores">
            <div className="result__ayo-half">
              <div className="result__ayo-side">You · Ogbe</div>
              <div className="result__big result__big--sm">{result.playerScore}</div>
            </div>
            <div className="result__ayo-vs">vs</div>
            <div className="result__ayo-half">
              <div className="result__ayo-side">Oyeku</div>
              <div className="result__big result__big--sm">{result.aiScore}</div>
            </div>
          </div>
          <div className="result__sub">seeds captured</div>
          {isRecord && <div className="result__prev">New best: {result.playerScore} seeds!</div>}
        </div>
      )}

      {mode === 'bin' && (
        <div className="result__body">
          <div className="result__big">{result.score.toLocaleString()}</div>
          <div className="result__sub">points · Binary Coder</div>
          {!isRecord && binBest > 0 && (
            <div className="result__prev">Best: {binBest.toLocaleString()} pts</div>
          )}
        </div>
      )}

      {mode === 'orisa-quiz' && (
        <div className="result__body">
          <div className="result__big">{result.score.toLocaleString()}</div>
          <div className="result__sub">points · Orisa Scholar</div>
          {!isRecord && orisaQuizBest > 0 && (
            <div className="result__prev">Best: {orisaQuizBest.toLocaleString()} pts</div>
          )}
        </div>
      )}

      {mode === 'orisa-match' && (
        <div className="result__body">
          <div className="result__big">{result.moves}</div>
          <div className="result__sub">moves · {fmtTime(result.time)}</div>
          {!isRecord && orisaMatchBest < Infinity && (
            <div className="result__prev">Best: {orisaMatchBest} moves</div>
          )}
        </div>
      )}

      {mode === 'gates' && (
        <div className="result__body">
          <div className="result__big">{result.score.toLocaleString()}</div>
          <div className="result__sub">points · Circuit Coder</div>
          {!isRecord && gatesBest > 0 && (
            <div className="result__prev">Best: {gatesBest.toLocaleString()} pts</div>
          )}
        </div>
      )}

      {mode === 'mod' && (
        <div className="result__body">
          <div className="result__big">{result.score.toLocaleString()}</div>
          <div className="result__sub">points · Mod Master</div>
          {!isRecord && modBest > 0 && (
            <div className="result__prev">Best: {modBest.toLocaleString()} pts</div>
          )}
        </div>
      )}

      {mode === 'ascii' && (
        <div className="result__body">
          <div className="result__big">{result.score.toLocaleString()}</div>
          <div className="result__sub">points · ASCII Coder</div>
          {!isRecord && asciiBest > 0 && <div className="result__prev">Best: {asciiBest.toLocaleString()} pts</div>}
        </div>
      )}

      {mode === 'unicode' && (
        <div className="result__body">
          <div className="result__big">{result.score.toLocaleString()}</div>
          <div className="result__sub">points · Unicode Scholar</div>
          {!isRecord && unicodeBest > 0 && <div className="result__prev">Best: {unicodeBest.toLocaleString()} pts</div>}
        </div>
      )}

      <div className="result__actions">
        <button className="btn btn--gold" onClick={onReplay}>Play Again</button>
        <button className="btn btn--ghost" onClick={onMenu}>Menu</button>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// MENU
// ════════════════════════════════════════════════════════════

function Menu({ onStart, onAbout, hiScore, bestMoves, arcBest, ayoBest, binBest, orisaQuizBest, orisaMatchBest, gatesBest, modBest, asciiBest, unicodeBest }) {
  return (
    <div className="menu">
      <div className="menu__hero">
        <div className="menu__logo">IfaGames<span className="menu__logo-dot">.</span> OrisaGames</div>
        <div className="menu__tagline">Learn STEAM the Ifa &amp; Orisa Way by Playing Games</div>
      </div>

      <div className="menu__modes">
        <button className="mode-card mode-card--quiz" onClick={() => onStart('quiz')}>
          <div className="mode-card__icon">⚡</div>
          <div className="mode-card__name">IfaQuiz</div>
          <div className="mode-card__desc">
            10 questions · 3 lives · 15 s timer
            <br />
            Domains, symbols, elements &amp; more
          </div>
          {hiScore > 0 && (
            <div className="mode-card__best">Best: {hiScore.toLocaleString()} pts</div>
          )}
        </button>

        <button className="mode-card mode-card--match" onClick={() => onStart('match')}>
          <div className="mode-card__icon">🎴</div>
          <div className="mode-card__name">IfaMatch</div>
          <div className="mode-card__desc">
            Flip cards to pair Odu symbols
            <br />
            with their names — fewest moves wins
          </div>
          {bestMoves < Infinity && (
            <div className="mode-card__best">Best: {bestMoves} moves</div>
          )}
        </button>

        <button className="mode-card mode-card--arc" onClick={() => onStart('ifarcadia')}>
          <div className="mode-card__icon">📜</div>
          <div className="mode-card__name">Ifarcadia</div>
          <div className="mode-card__desc">
            Read &amp; recognise Aebajogbe · Yoruba script names for the 16 Odu
            <br />
            Building Ifa &amp; Oduduwa Script literacy — gamified
          </div>
          {arcBest > 0 && (
            <div className="mode-card__best">Best: {arcBest.toLocaleString()} pts</div>
          )}
        </button>

        <button className="mode-card mode-card--ayo" onClick={() => onStart('ayo')}>
          <div className="mode-card__icon">🌱</div>
          <div className="mode-card__name">Ifáayò · Ayo Olopon</div>
          <div className="mode-card__desc">
            Seed-sowing strategy game · Ogbe vs Oyeku
            <br />
            Capture on 4 or 8 seeds — chain captures win the board
          </div>
          {ayoBest > 0 && (
            <div className="mode-card__best">Best: {ayoBest} seeds captured</div>
          )}
        </button>

        <button className="mode-card mode-card--bin" onClick={() => onStart('bin')}>
          <div className="mode-card__icon">💻</div>
          <div className="mode-card__body">
            <div className="mode-card__name">IfaBin - IfaBinary Code</div>
            <div className="mode-card__desc">
              Convert decimal numbers to binary by toggling bits
              <br />
              Baby Bits → Coder → Hacker · 10 rounds · 20 s timer
            </div>
            {binBest > 0 && (
              <div className="mode-card__best">Best: {binBest.toLocaleString()} pts</div>
            )}
          </div>
        </button>

        <button className="mode-card mode-card--orisa-quiz" onClick={() => onStart('orisa-quiz')}>
          <div className="mode-card__icon">🌟</div>
          <div className="mode-card__name">OrisaQuiz</div>
          <div className="mode-card__desc">
            Test your knowledge of the Yoruba Orisa in Ifa
            <br />
            Domains, symbols, colors, sacred tools &amp; linked Odu
          </div>
          {orisaQuizBest > 0 && (
            <div className="mode-card__best">Best: {orisaQuizBest.toLocaleString()} pts</div>
          )}
        </button>

        <button className="mode-card mode-card--orisa-match" onClick={() => onStart('orisa-match')}>
          <div className="mode-card__icon">🔮</div>
          <div className="mode-card__name">OrisaMatch</div>
          <div className="mode-card__desc">
            Flip cards to match each Orisa with their sacred domain
            <br />
            16 Orisas · fewest moves wins
          </div>
          {orisaMatchBest < Infinity && (
            <div className="mode-card__best">Best: {orisaMatchBest} moves</div>
          )}
        </button>

        <button className="mode-card mode-card--gates" onClick={() => onStart('gates')}>
          <div className="mode-card__icon">⚡</div>
          <div className="mode-card__body">
            <div className="mode-card__name">IfaGates</div>
            <div className="mode-card__desc">
              AND · OR · NOT · NAND · NOR · XOR · XNOR
              <br />
              Output puzzles, symbol recognition &amp; logic concepts
            </div>
            {gatesBest > 0 && (
              <div className="mode-card__best">Best: {gatesBest.toLocaleString()} pts</div>
            )}
          </div>
        </button>

        <button className="mode-card mode-card--mod" onClick={() => onStart('mod')}>
          <div className="mode-card__icon">🔢</div>
          <div className="mode-card__body">
            <div className="mode-card__name">IfaMod</div>
            <div className="mode-card__desc">
              Remainders · Clock arithmetic · Odu circle (mod 16)
              <br />
              Learn modular math through Ifa — for kids &amp; teens
            </div>
            {modBest > 0 && (
              <div className="mode-card__best">Best: {modBest.toLocaleString()} pts</div>
            )}
          </div>
        </button>

        <button className="mode-card mode-card--ascii" onClick={() => onStart('ascii')}>
          <div className="mode-card__icon">🔤</div>
          <div className="mode-card__body">
            <div className="mode-card__name">IfaASCII · Ifascii</div>
            <div className="mode-card__desc">
              Decimal codes · Hex codes · IFABit patterns<br />
              ASCII 0–127 through the lens of Ifa — for kids, teens &amp; adults
            </div>
            {asciiBest > 0 && <div className="mode-card__best">Best: {asciiBest.toLocaleString()} pts</div>}
          </div>
        </button>

        <button className="mode-card mode-card--unicode" onClick={() => onStart('unicode')}>
          <div className="mode-card__icon">🌐</div>
          <div className="mode-card__body">
            <div className="mode-card__name">IfaUnicode · Ifa-Unicode</div>
            <div className="mode-card__desc">
              Code points · Unicode blocks · Yoruba scripts · Odu Hex<br />
              The 16 Odu are the 16 hex digits — U+ is an Ifa path!
            </div>
            {unicodeBest > 0 && <div className="mode-card__best">Best: {unicodeBest.toLocaleString()} pts</div>}
          </div>
        </button>

        <button className="mode-card mode-card--comic" onClick={() => onStart('comic')}>
          <div className="mode-card__icon">🎨</div>
          <div className="mode-card__body">
            <div className="mode-card__name">IfaComic</div>
            <div className="mode-card__desc">
              Draw &amp; colour Logic Gates, Switches &amp; the 16 Odu Ifa<br/>
              STEM artwork for kids &amp; teens · Hand-drawing coloring pages
            </div>
          </div>
        </button>
      </div>

      <button className="menu__about-btn" onClick={onAbout}>
        ℹ About Ifarcadia &amp; the Aebajogbe Script
      </button>

      <div className="menu__links">
        <a href="../ifa-periodic-table/" className="menu__link">Periodic Table</a>
        <span className="menu__dot">·</span>
        <a href="../ifai/" className="menu__link">Oracle</a>
        <span className="menu__dot">·</span>
        <a href="../ifa-lang/" className="menu__link">Language</a>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// HEADER
// ════════════════════════════════════════════════════════════

function Header({ screen, onMenu }) {
  return (
    <header className="header">
      <div className="header__brand">
        <span className="header__logo">IfaGames</span>
        <span className="header__sub">CENProject</span>
      </div>
      {screen !== 'menu' && (
        <button className="btn btn--ghost btn--sm" onClick={onMenu}>← Menu</button>
      )}
    </header>
  );
}

// ════════════════════════════════════════════════════════════
// ROOT APP
// ════════════════════════════════════════════════════════════

function App() {
  const [odus,      setOdus]      = useState([]);
  const [screen,    setScreen]    = useState(window.__IFA_INIT__ || 'menu');
  const [mode,      setMode]      = useState(window.__IFA_INIT__ || null);
  const goMenu = () => { if (window.__IFA_HOME__) window.location.href = window.__IFA_HOME__; else setScreen('menu'); };
  const [result,    setResult]    = useState(null);
  const [gameKey,   setGameKey]   = useState(0);
  const [showAbout, setShowAbout] = useState(false);

  const [hiScore,   setHiScore]   = useState(() => parseInt(localStorage.getItem(HISCORE_KEY) || '0', 10));
  const [bestMoves, setBestMoves] = useState(() => {
    const v = localStorage.getItem(BESTMOV_KEY);
    return v ? parseInt(v, 10) : Infinity;
  });
  const [arcBest,        setArcBest]        = useState(() => parseInt(localStorage.getItem(ARC_KEY) || '0', 10));
  const [ayoBest,        setAyoBest]        = useState(() => parseInt(localStorage.getItem(AYO_KEY) || '0', 10));
  const [binBest,        setBinBest]        = useState(() => parseInt(localStorage.getItem(BIN_KEY) || '0', 10));
  const [orisaQuizBest,  setOrisaQuizBest]  = useState(() => parseInt(localStorage.getItem(ORISA_QUIZ_KEY) || '0', 10));
  const [orisaMatchBest, setOrisaMatchBest] = useState(() => {
    const v = localStorage.getItem(ORISA_MATCH_KEY);
    return v ? parseInt(v, 10) : Infinity;
  });
  const [gatesBest,   setGatesBest]   = useState(() => parseInt(localStorage.getItem(GATES_KEY)   || '0', 10));
  const [modBest,     setModBest]     = useState(() => parseInt(localStorage.getItem(MOD_KEY)     || '0', 10));
  const [asciiBest,   setAsciiBest]   = useState(() => parseInt(localStorage.getItem(ASCII_KEY)   || '0', 10));
  const [unicodeBest, setUnicodeBest] = useState(() => parseInt(localStorage.getItem(UNICODE_KEY) || '0', 10));

  useEffect(() => {
    fetch('./data/odu.json')
      .then(r => r.json())
      .then(d => setOdus(d.odu));
  }, []);

  function startGame(m) {
    setMode(m);
    setGameKey(k => k + 1);
    setScreen(m);
  }

  function handleQuizEnd(res) {
    if (res.score > hiScore) {
      setHiScore(res.score);
      localStorage.setItem(HISCORE_KEY, String(res.score));
    }
    setResult(res);
    setScreen('result');
  }

  function handleMatchEnd(res) {
    if (res.moves < bestMoves) {
      setBestMoves(res.moves);
      localStorage.setItem(BESTMOV_KEY, String(res.moves));
    }
    setResult(res);
    setScreen('result');
  }

  function handleArcEnd(res) {
    if (res.score > arcBest) {
      setArcBest(res.score);
      localStorage.setItem(ARC_KEY, String(res.score));
    }
    setResult(res);
    setScreen('result');
  }

  function handleAyoEnd(res) {
    if (res.playerScore > ayoBest) {
      setAyoBest(res.playerScore);
      localStorage.setItem(AYO_KEY, String(res.playerScore));
    }
    setResult(res);
    setScreen('result');
  }

  function handleBinEnd(res) {
    if (res.score > binBest) {
      setBinBest(res.score);
      localStorage.setItem(BIN_KEY, String(res.score));
    }
    setResult(res);
    setScreen('result');
  }

  function handleOrisaQuizEnd(res) {
    if (res.score > orisaQuizBest) {
      setOrisaQuizBest(res.score);
      localStorage.setItem(ORISA_QUIZ_KEY, String(res.score));
    }
    setResult(res);
    setScreen('result');
  }

  function handleOrisaMatchEnd(res) {
    if (res.moves < orisaMatchBest) {
      setOrisaMatchBest(res.moves);
      localStorage.setItem(ORISA_MATCH_KEY, String(res.moves));
    }
    setResult(res);
    setScreen('result');
  }

  function handleGatesEnd(res) {
    if (res.score > gatesBest) {
      setGatesBest(res.score);
      localStorage.setItem(GATES_KEY, String(res.score));
    }
    setResult(res);
    setScreen('result');
  }

  function handleModEnd(res) {
    if (res.score > modBest) {
      setModBest(res.score);
      localStorage.setItem(MOD_KEY, String(res.score));
    }
    setResult(res);
    setScreen('result');
  }

  function handleAsciiEnd(res) {
    if (res.score > asciiBest) {
      setAsciiBest(res.score);
      localStorage.setItem(ASCII_KEY, String(res.score));
    }
    setResult(res);
    setScreen('result');
  }

  function handleUnicodeEnd(res) {
    if (res.score > unicodeBest) {
      setUnicodeBest(res.score);
      localStorage.setItem(UNICODE_KEY, String(res.score));
    }
    setResult(res);
    setScreen('result');
  }

  if (!odus.length) {
    return (
      <div className="splash">
        <IfaGlyph code="1111" size="xl" />
        <span className="splash__txt">Loading…</span>
      </div>
    );
  }

  return (
    <div className="app">
      <Header screen={screen} onMenu={goMenu} />

      {showAbout && <AboutModal onClose={() => setShowAbout(false)} />}

      <main className="main">
        {screen === 'menu' && (
          <Menu
            onStart={startGame}
            onAbout={() => setShowAbout(true)}
            hiScore={hiScore}
            bestMoves={bestMoves}
            arcBest={arcBest}
            ayoBest={ayoBest}
            binBest={binBest}
            orisaQuizBest={orisaQuizBest}
            orisaMatchBest={orisaMatchBest}
            gatesBest={gatesBest}
            modBest={modBest}
            asciiBest={asciiBest}
            unicodeBest={unicodeBest}
          />
        )}

        {screen === 'quiz' && (
          <QuizGame key={gameKey} odus={odus} onEnd={handleQuizEnd} />
        )}

        {screen === 'match' && (
          <MatchGame key={gameKey} odus={odus} onEnd={handleMatchEnd} />
        )}

        {screen === 'ifarcadia' && (
          <IfarcadiaGame key={gameKey} odus={odus} onEnd={handleArcEnd} />
        )}

        {screen === 'ayo' && (
          <AyoGame key={gameKey} onEnd={handleAyoEnd} />
        )}

        {screen === 'bin' && (
          <BinGame key={gameKey} onEnd={handleBinEnd} />
        )}

        {screen === 'orisa-quiz' && (
          <OrisaQuizGame key={gameKey} onEnd={handleOrisaQuizEnd} />
        )}

        {screen === 'orisa-match' && (
          <OrisaMatchGame key={gameKey} onEnd={handleOrisaMatchEnd} />
        )}

        {screen === 'gates' && (
          <GatesGame key={gameKey} onEnd={handleGatesEnd} />
        )}

        {screen === 'mod' && (
          <ModGame key={gameKey} onEnd={handleModEnd} />
        )}

        {screen === 'ascii' && (
          <AsciiGame key={gameKey} onEnd={handleAsciiEnd} />
        )}

        {screen === 'unicode' && (
          <UnicodeGame key={gameKey} onEnd={handleUnicodeEnd} />
        )}

        {screen === 'comic' && (
          <ComicScreen onMenu={goMenu} />
        )}

        {screen === 'result' && (
          <ResultScreen
            mode={mode}
            result={result}
            hiScore={hiScore}
            bestMoves={bestMoves}
            arcBest={arcBest}
            ayoBest={ayoBest}
            binBest={binBest}
            orisaQuizBest={orisaQuizBest}
            orisaMatchBest={orisaMatchBest}
            gatesBest={gatesBest}
            modBest={modBest}
            asciiBest={asciiBest}
            unicodeBest={unicodeBest}
            onReplay={() => startGame(mode)}
            onMenu={goMenu}
          />
        )}
      </main>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// IFACOMIC — STEM COLORING & DRAWING PAGES
// ════════════════════════════════════════════════════════════

function GateSymbol({ type, size = 90 }) {
  const h = Math.round(size * 0.625);
  const body = { stroke: '#1a1a1a', strokeWidth: 3.5, fill: '#fff' };
  const line = { stroke: '#1a1a1a', strokeWidth: 3, fill: 'none' };
  const bubble = { stroke: '#1a1a1a', strokeWidth: 3, fill: '#fff' };
  const extra = { stroke: '#1a1a1a', strokeWidth: 3.5, fill: 'none' };
  switch (type) {
    case 'and': return (
      <svg viewBox="0 0 80 50" width={size} height={h} style={{display:'block',overflow:'visible'}}>
        <path d="M 20,8 L 20,42 L 42,42 A 17,17 0 0 0 42,8 Z" {...body}/>
        <line x1="0" y1="16" x2="20" y2="16" {...line}/>
        <line x1="0" y1="34" x2="20" y2="34" {...line}/>
        <line x1="59" y1="25" x2="80" y2="25" {...line}/>
      </svg>
    );
    case 'or': return (
      <svg viewBox="0 0 80 50" width={size} height={h} style={{display:'block',overflow:'visible'}}>
        <path d="M 12,8 Q 22,25 12,42 Q 42,42 58,25 Q 42,8 12,8 Z" {...body}/>
        <line x1="0" y1="16" x2="15" y2="16" {...line}/>
        <line x1="0" y1="34" x2="15" y2="34" {...line}/>
        <line x1="58" y1="25" x2="80" y2="25" {...line}/>
      </svg>
    );
    case 'not': return (
      <svg viewBox="0 0 80 50" width={size} height={h} style={{display:'block',overflow:'visible'}}>
        <path d="M 14,8 L 14,42 L 54,25 Z" {...body}/>
        <circle cx="58" cy="25" r="4" {...bubble}/>
        <line x1="0" y1="25" x2="14" y2="25" {...line}/>
        <line x1="62" y1="25" x2="80" y2="25" {...line}/>
      </svg>
    );
    case 'nand': return (
      <svg viewBox="0 0 80 50" width={size} height={h} style={{display:'block',overflow:'visible'}}>
        <path d="M 14,8 L 14,42 L 36,42 A 17,17 0 0 0 36,8 Z" {...body}/>
        <circle cx="57" cy="25" r="4" {...bubble}/>
        <line x1="0" y1="16" x2="14" y2="16" {...line}/>
        <line x1="0" y1="34" x2="14" y2="34" {...line}/>
        <line x1="61" y1="25" x2="80" y2="25" {...line}/>
      </svg>
    );
    case 'nor': return (
      <svg viewBox="0 0 80 50" width={size} height={h} style={{display:'block',overflow:'visible'}}>
        <path d="M 12,8 Q 22,25 12,42 Q 42,42 58,25 Q 42,8 12,8 Z" {...body}/>
        <circle cx="62" cy="25" r="4" {...bubble}/>
        <line x1="0" y1="16" x2="15" y2="16" {...line}/>
        <line x1="0" y1="34" x2="15" y2="34" {...line}/>
        <line x1="66" y1="25" x2="80" y2="25" {...line}/>
      </svg>
    );
    case 'xor': return (
      <svg viewBox="0 0 80 50" width={size} height={h} style={{display:'block',overflow:'visible'}}>
        <path d="M 16,8 Q 26,25 16,42 Q 46,42 62,25 Q 46,8 16,8 Z" {...body}/>
        <path d="M 8,8 Q 18,25 8,42" {...extra}/>
        <line x1="0" y1="16" x2="18" y2="16" {...line}/>
        <line x1="0" y1="34" x2="18" y2="34" {...line}/>
        <line x1="62" y1="25" x2="80" y2="25" {...line}/>
      </svg>
    );
    case 'xnor': return (
      <svg viewBox="0 0 80 50" width={size} height={h} style={{display:'block',overflow:'visible'}}>
        <path d="M 12,8 Q 22,25 12,42 Q 38,42 54,25 Q 38,8 12,8 Z" {...body}/>
        <path d="M 5,8 Q 15,25 5,42" {...extra}/>
        <circle cx="58" cy="25" r="4" {...bubble}/>
        <line x1="0" y1="16" x2="14" y2="16" {...line}/>
        <line x1="0" y1="34" x2="14" y2="34" {...line}/>
        <line x1="62" y1="25" x2="80" y2="25" {...line}/>
      </svg>
    );
    case 'buf': return (
      <svg viewBox="0 0 80 50" width={size} height={h} style={{display:'block',overflow:'visible'}}>
        <path d="M 14,8 L 14,42 L 57,25 Z" {...body}/>
        <line x1="0" y1="25" x2="14" y2="25" {...line}/>
        <line x1="57" y1="25" x2="80" y2="25" {...line}/>
      </svg>
    );
    default: return null;
  }
}

// ── Page 1: Logic Gate Heroes ─────────────────────────────

const COMIC_GATES = [
  { type: 'and',  name: 'AND',    yoruba: 'ATI',       color: '#f0920c', io: '1·1→1  |  1·0→0',  fun: 'Both ON = YES!' },
  { type: 'or',   name: 'OR',     yoruba: 'TABI',      color: '#2d9e6b', io: '1+0→1  |  0+0→0',  fun: 'One ON = YES!' },
  { type: 'not',  name: 'NOT',    yoruba: 'KO',        color: '#e63946', io: '1→0  |  0→1',       fun: 'Flip it!' },
  { type: 'nand', name: 'NAND',   yoruba: 'Ko-ATI',    color: '#4361ee', io: '1·1→0  |  1·0→1',  fun: 'AND flipped!' },
  { type: 'nor',  name: 'NOR',    yoruba: 'Ko-TABI',   color: '#7c4dff', io: '0+0→1  |  1+0→0',  fun: 'OR flipped!' },
  { type: 'xor',  name: 'XOR',    yoruba: 'Kan-TABI',  color: '#e9498a', io: '1+0→1  |  1+1→0',  fun: 'Different = YES!' },
  { type: 'xnor', name: 'XNOR',   yoruba: 'Ko-Kan',    color: '#c9a227', io: '1+1→1  |  1+0→0',  fun: 'Same = YES!' },
  { type: 'buf',  name: 'Buffer', yoruba: 'IRU',       color: '#1a9ecc', io: '1→1  |  0→0',       fun: 'Pass it on!' },
];

function ComicPageGates() {
  return (
    <div className="comic-page">
      <div className="comic-page__header">
        <div className="comic-page__badge">🎨 IfaComic · STEM Artwork · IfaGames</div>
        <h2 className="comic-page__title">⚡ Meet the Logic Gate Heroes!</h2>
        <p className="comic-page__sub">IfaLogic · Tàn&nbsp;=&nbsp;1&nbsp;(ON) &nbsp;·&nbsp; Pa&nbsp;=&nbsp;0&nbsp;(OFF)</p>
        <p className="comic-page__instruction">✏️ Draw &amp; colour each hero below. Label in English AND Yoruba!</p>
      </div>

      <div className="comic-gates-grid">
        {COMIC_GATES.map(g => (
          <div key={g.type} className="comic-gate" style={{'--gc': g.color}}>
            <div className="comic-gate__header">
              <span className="comic-gate__name">{g.name}</span>
              <span className="comic-gate__yoruba">{g.yoruba}</span>
            </div>
            <div className="comic-gate__symbol">
              <GateSymbol type={g.type} size={88} />
            </div>
            <div className="comic-gate__io">{g.io}</div>
            <div className="comic-gate__fun">✨ {g.fun}</div>
          </div>
        ))}
      </div>

      <div className="comic-ifa-note">
        <span className="comic-ifa-note__label">Ifa + Electronics = IfaLogic</span>
        <span>The 256 Odu Ifa encode all logic combinations · Tàn (O) = 1 · Pa (I) = 0</span>
      </div>
      <div className="comic-page__footer">
        <span>playifagames.org</span><span>CENProject · Ifa &amp; Orisa STEM</span>
      </div>
    </div>
  );
}

// ── Page 2: Pa & Tàn — The Magic Switch ──────────────────

function ComicPageSwitch() {
  const sunRays = [0,45,90,135,180,225,270,315].map(deg => {
    const r = Math.PI * deg / 180;
    return { x1: 60+33*Math.cos(r), y1: 60+33*Math.sin(r), x2: 60+47*Math.cos(r), y2: 60+47*Math.sin(r) };
  });

  return (
    <div className="comic-page">
      <div className="comic-page__header">
        <div className="comic-page__badge">🎨 IfaComic · Yoruba Digital Science</div>
        <h2 className="comic-page__title">🔆 Pa &amp; Tàn — The Magic Switch!</h2>
        <p className="comic-page__sub">Yoruba words for OFF &amp; ON · The Language of Computers &amp; the Universe</p>
        <p className="comic-page__instruction">✏️ Colour the OFF side cool blue/grey · Colour the ON side golden yellow!</p>
      </div>

      <div className="comic-switch-layout">

        {/* LEFT — Pa / OFF / 0 */}
        <div className="comic-switch-side comic-switch-side--off">
          <div className="comic-switch-big-label">Pa</div>
          <div className="comic-switch-bit comic-switch-bit--0">0</div>
          <div className="comic-switch-word">OFF</div>
          <svg viewBox="0 0 120 120" width={118} height={118} className="comic-switch-svg">
            <circle cx="60" cy="60" r="46" fill="none" stroke="#2a3a5a" strokeWidth="4"/>
            <path d="M 60,14 A 46,46 0 1 0 60,106 A 30,30 0 1 1 60,14 Z" fill="none" stroke="#2a3a5a" strokeWidth="3.5"/>
            <text x="78" y="34" fontSize="13" fill="#2a3a5a" fontWeight="bold">★</text>
            <text x="30" y="44" fontSize="9"  fill="#2a3a5a">★</text>
            <text x="88" y="82" fontSize="7"  fill="#2a3a5a">★</text>
            <text x="22" y="78" fontSize="11" fill="#2a3a5a">★</text>
            <text x="60" y="68" textAnchor="middle" fontSize="10" fill="#2a3a5a" fontStyle="italic">sleeping…</text>
          </svg>
          <div className="comic-switch-desc">Circuit open<br/>Nothing flows<br/>🌙 Sleeping moon</div>
        </div>

        {/* CENTRE — switch diagram + power button */}
        <div className="comic-switch-center">
          <svg viewBox="0 0 160 230" width={148} height={213} style={{display:'block',margin:'0 auto'}}>
            {/* section label */}
            <text x="80" y="18" textAnchor="middle" fontSize="12" fontWeight="800" fill="#333">Iyipada = Switch</text>

            {/* OFF diagram */}
            <text x="80" y="40" textAnchor="middle" fontSize="10" fill="#666">Pa (0) · OFF · Open</text>
            <line x1="16" y1="58" x2="50" y2="58" stroke="#555" strokeWidth="3"/>
            <circle cx="53" cy="58" r="4" fill="none" stroke="#555" strokeWidth="2.5"/>
            <line x1="56" y1="54" x2="80" y2="46" stroke="#555" strokeWidth="3"/>
            <circle cx="83" cy="58" r="4" fill="none" stroke="#555" strokeWidth="2.5"/>
            <line x1="86" y1="58" x2="144" y2="58" stroke="#555" strokeWidth="3"/>

            {/* ON diagram */}
            <text x="80" y="102" textAnchor="middle" fontSize="10" fill="#c06800">Tàn (1) · ON · Closed</text>
            <line x1="16" y1="118" x2="50" y2="118" stroke="#c06800" strokeWidth="3.5"/>
            <circle cx="53" cy="118" r="4" fill="none" stroke="#c06800" strokeWidth="2.5"/>
            <line x1="57" y1="118" x2="80" y2="118" stroke="#c06800" strokeWidth="3.5"/>
            <circle cx="83" cy="118" r="4" fill="none" stroke="#c06800" strokeWidth="2.5"/>
            <line x1="87" y1="118" x2="144" y2="118" stroke="#c06800" strokeWidth="3.5"/>

            {/* Power button */}
            <text x="80" y="152" textAnchor="middle" fontSize="10" fill="#555">Bọtini Agbara = Power Button</text>
            <rect x="44" y="160" width="72" height="44" rx="10" fill="none" stroke="#333" strokeWidth="3"/>
            <text x="67" y="189" fontSize="22" fontWeight="900" fill="#c06800" textAnchor="middle">I</text>
            <text x="97" y="189" fontSize="22" fontWeight="900" fill="#333" textAnchor="middle">O</text>
            <line x1="80" y1="160" x2="80" y2="204" stroke="#999" strokeWidth="1.5" strokeDasharray="3,3"/>

            <text x="67" y="218" fontSize="9" textAnchor="middle" fill="#888">Tàn</text>
            <text x="97" y="218" fontSize="9" textAnchor="middle" fill="#888">Pa</text>
          </svg>
        </div>

        {/* RIGHT — Tàn / ON / 1 */}
        <div className="comic-switch-side comic-switch-side--on">
          <div className="comic-switch-big-label">Tàn</div>
          <div className="comic-switch-bit comic-switch-bit--1">1</div>
          <div className="comic-switch-word">ON</div>
          <svg viewBox="0 0 120 120" width={118} height={118} className="comic-switch-svg">
            <circle cx="60" cy="60" r="28" fill="none" stroke="#c06800" strokeWidth="4"/>
            {sunRays.map((ray,i) => (
              <line key={i} x1={ray.x1} y1={ray.y1} x2={ray.x2} y2={ray.y2} stroke="#c06800" strokeWidth="3.5"/>
            ))}
            <circle cx="52" cy="54" r="3.5" fill="#c06800"/>
            <circle cx="68" cy="54" r="3.5" fill="#c06800"/>
            <path d="M 50,65 Q 60,74 70,65" fill="none" stroke="#c06800" strokeWidth="3"/>
          </svg>
          <div className="comic-switch-desc">Circuit closed<br/>Energy flows!<br/>☀️ Shining sun</div>
        </div>
      </div>

      {/* IfaBit connection row */}
      <div className="comic-ifabit-row">
        <div className="comic-ifabit-row__title">⚡ IfaBit — Binary inside the Odu Ifa</div>
        <div className="comic-ifabit-row__cells">
          <div className="comic-ifabit-cell comic-ifabit-cell--1"><span className="cib-mark">O</span><span>= Tàn = 1 = ON</span></div>
          <div className="comic-ifabit-cell comic-ifabit-cell--0"><span className="cib-mark">I</span><span>= Pa = 0 = OFF</span></div>
          <div className="comic-ifabit-cell"><span className="cib-code">OOOO</span><span>= Ogbe = 1111</span></div>
          <div className="comic-ifabit-cell"><span className="cib-code">IIII</span><span>= Oyeku = 0000</span></div>
        </div>
      </div>

      <div className="comic-page__footer">
        <span>Pa = OFF · Tàn = ON · Iyipada = Switch · Agbara = Power · Bọtini = Button</span>
        <span>playifagames.org · CENProject</span>
      </div>
    </div>
  );
}

// ── Page 3: The 16 Principal Odu Ifa ─────────────────────

const COMIC_ODU = [
  { num:  1, name: 'Ogbe',     yoruba: 'Ogbè',    code: '1111', color: '#c9a227', el: 'Light' },
  { num:  2, name: 'Oyeku',    yoruba: 'Ọyẹkú',   code: '0000', color: '#555',    el: 'Void' },
  { num:  3, name: 'Iwori',    yoruba: 'Ìwòrì',   code: '0110', color: '#4361ee', el: 'Air' },
  { num:  4, name: 'Odi',      yoruba: 'Odí',      code: '1001', color: '#e63946', el: 'Earth' },
  { num:  5, name: 'Irosun',   yoruba: 'Ìrosùn',  code: '0011', color: '#c0392b', el: 'Water' },
  { num:  6, name: 'Owonrin',  yoruba: 'Òwónrín', code: '1100', color: '#2d9e6b', el: 'Lightning' },
  { num:  7, name: 'Obara',    yoruba: 'Òbàrà',   code: '0001', color: '#daa520', el: 'Gold' },
  { num:  8, name: 'Okanran',  yoruba: 'Òkànràn', code: '1000', color: '#e9498a', el: 'Fire' },
  { num:  9, name: 'Ogunda',   yoruba: 'Ògúndá',  code: '0111', color: '#2d7a40', el: 'Iron' },
  { num: 10, name: 'Osa',      yoruba: 'Òsá',     code: '1110', color: '#e74c3c', el: 'Wind' },
  { num: 11, name: 'Ika',      yoruba: 'Ìká',     code: '0010', color: '#8e44ad', el: 'Ether' },
  { num: 12, name: 'Oturupon', yoruba: 'Otúrúpọ̀n',code: '0100', color: '#1565c0', el: 'Dense Earth' },
  { num: 13, name: 'Otura',    yoruba: 'Òtúrá',   code: '1101', color: '#0288d1', el: 'Sound' },
  { num: 14, name: 'Irete',    yoruba: 'Ìrètè',   code: '1011', color: '#388e3c', el: 'Wood' },
  { num: 15, name: 'Ose',      yoruba: 'Òsé',     code: '0101', color: '#d4830f', el: 'Honey' },
  { num: 16, name: 'Ofun',     yoruba: 'Òfún',    code: '1010', color: '#5e72b4', el: 'White Clay' },
];

function ComicPageOdu() {
  return (
    <div className="comic-page">
      <div className="comic-page__header">
        <div className="comic-page__badge">🎨 IfaComic · Sacred Codes · IfaGames</div>
        <h2 className="comic-page__title">🌀 The 16 Principal Odu Ifa</h2>
        <p className="comic-page__sub">Sacred Binary Codes of the Universe · 4-Bit IfaCodes · Yoruba &amp; I&nbsp;Ching cousins</p>
        <p className="comic-page__instruction">✏️ Draw the IfaBit marks for each Odu.&nbsp; O&nbsp;=&nbsp;Tàn&nbsp;(1)&nbsp;&nbsp;·&nbsp;&nbsp;I&nbsp;=&nbsp;Pa&nbsp;(0)</p>
      </div>

      <div className="comic-odu-grid">
        {COMIC_ODU.map(o => (
          <div key={o.num} className="comic-odu-cell" style={{'--oc': o.color}}>
            <div className="comic-odu-cell__num">{String(o.num).padStart(2,'0')}</div>
            <div className="comic-odu-cell__marks">
              {o.code.split('').map((b,i) => (
                <span key={i} className={`comic-odu-mark comic-odu-mark--${b}`}>{b==='1'?'O':'I'}</span>
              ))}
            </div>
            <div className="comic-odu-cell__name">{o.name}</div>
            <div className="comic-odu-cell__yoruba">{o.yoruba}</div>
            <div className="comic-odu-cell__code">{o.code}</div>
            <div className="comic-odu-cell__el">{o.el}</div>
          </div>
        ))}
      </div>

      <div className="comic-odu-compare">
        <div className="comic-odu-compare__col">
          <div className="comic-odu-compare__head">🌍 Odu Ifa (Yoruba)</div>
          <div className="comic-odu-compare__body">16 Principal Odu · 4-bit codes<br/>256 combinations = 16 × 16<br/>Tàn (O) = 1 · Pa (I) = 0</div>
        </div>
        <div className="comic-odu-compare__equals">🔗<br/>Binary<br/>Cousins</div>
        <div className="comic-odu-compare__col">
          <div className="comic-odu-compare__head">🀄 I Ching (Chinese)</div>
          <div className="comic-odu-compare__body">64 hexagrams · 6-bit codes<br/>16 base trigram pairs<br/>Yang (—) = 1 · Yin (- -) = 0</div>
        </div>
      </div>

      <div className="comic-odu-note">
        Both ancient systems discovered the same digital truth: reality is built from <strong>pairs</strong>.
        &nbsp;<strong>Tàn &amp; Pa · 1 &amp; 0 · Yin &amp; Yang · On &amp; Off</strong>.
        The universe speaks in binary — and the Odu Ifa encoded it first.
      </div>

      <div className="comic-page__footer">
        <span>256 Odu Ifa = 16 × 16 combinations · The Axiomatic Matrix of Reality</span>
        <span>playifagames.org · CENProject</span>
      </div>
    </div>
  );
}

// ── ComicScreen wrapper ───────────────────────────────────

const COMIC_PAGES = [
  { id: 'gates',  label: '⚡ Logic Gates',  Component: ComicPageGates  },
  { id: 'switch', label: '🔆 Pa & Tàn',     Component: ComicPageSwitch },
  { id: 'odu',    label: '🌀 16 Odu Ifa',   Component: ComicPageOdu    },
];

function ComicScreen({ onMenu }) {
  const [page, setPage] = useState(0);
  const { Component } = COMIC_PAGES[page];
  return (
    <div className="comic-screen">
      <div className="comic-screen__nav">
        {COMIC_PAGES.map((p, i) => (
          <button
            key={p.id}
            className={`comic-nav-btn${i === page ? ' comic-nav-btn--active' : ''}`}
            onClick={() => setPage(i)}
          >{p.label}</button>
        ))}
      </div>
      <div className="comic-screen__body">
        <Component />
      </div>
      <div className="comic-screen__controls">
        <button className="comic-ctrl" onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0}>← Prev</button>
        <span className="comic-ctrl-count">Page {page + 1} / {COMIC_PAGES.length}</span>
        <button className="comic-ctrl" onClick={() => setPage(p => Math.min(COMIC_PAGES.length - 1, p + 1))} disabled={page === COMIC_PAGES.length - 1}>Next →</button>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
