/* ─────────────────────────────────────────────────────────────────────────────
   Ìlú-Ìlù — The City of Drum
   Ìlù ń'sọ̀rọ̀ — The Drum Talks · Èdè Ìlú · Ifa Simulation
   IFA Internet · CENProject
───────────────────────────────────────────────────────────────────────────── */

const { useState, useEffect, useRef } = React;

// ─── ODU IFA DATA ────────────────────────────────────────────────────────────

const ODU_IFA = [
  { num:1,  id:'ogbe',     yoruba:'Ògbè',      marks:[1,1,1,1], color:'#fbbf24', glow:'rgba(251,191,36,0.45)',   energy:'Light · New Beginnings',    essence:'Ògbè is the first light — the dawn of creation. Pure radiant energy. When Ogbe dances, the cosmos opens its eyes.' },
  { num:2,  id:'oyeku',    yoruba:'Òyẹ̀kú',     marks:[2,2,2,2], color:'#818cf8', glow:'rgba(129,140,248,0.4)',   energy:'Darkness · Transition',     essence:'Òyẹ̀kú holds all endings and all beginnings. The ancestor speaks through silence and shadow.' },
  { num:3,  id:'iwori',    yoruba:'Ìwòrì',      marks:[2,1,1,2], color:'#a78bfa', glow:'rgba(167,139,250,0.4)',   energy:'Inner Vision · Mind',       essence:'Ìwòrì turns inward. The journey here is consciousness itself — the eye that sees without seeing.' },
  { num:4,  id:'odi',      yoruba:'Òdí',        marks:[1,2,2,1], color:'#f472b6', glow:'rgba(244,114,182,0.4)',   energy:'Womb · Mystery',            essence:'Òdí is the sacred womb — the hidden place of all creation. Mystery moves here in circles.' },
  { num:5,  id:'irosun',   yoruba:'Ìròsùn',     marks:[1,1,2,2], color:'#f87171', glow:'rgba(248,113,113,0.4)',   energy:'Blood · Life Force',        essence:'Ìròsùn is the blood of existence — the red heat of sacrifice, medicine, and raw power.' },
  { num:6,  id:'owonrin',  yoruba:'Òwónrín',    marks:[2,2,1,1], color:'#2dd4bf', glow:'rgba(45,212,191,0.4)',    energy:'Chaos · Wind · Creativity', essence:'Òwónrín is the trickster wind — wild creative chaos that breaks old forms to birth new ones.' },
  { num:7,  id:'obara',    yoruba:'Òbàrà',      marks:[1,2,2,2], color:'#c084fc', glow:'rgba(192,132,252,0.4)',   energy:'Royalty · Kingship',        essence:'Òbàrà carries the crown. Sovereign, proud, and generous — the king\'s stride marks divine order.' },
  { num:8,  id:'okanran',  yoruba:'Òkànràn',    marks:[2,2,2,1], color:'#fb923c', glow:'rgba(251,146,60,0.4)',    energy:'Conflict · Sharp Truth',    essence:'Òkànràn is the flash of lightning — sharp, sudden, cutting straight to the truth of a thing.' },
  { num:9,  id:'ogunda',   yoruba:'Ògúndá',     marks:[1,1,1,2], color:'#94a3b8', glow:'rgba(148,163,184,0.35)',  energy:'Iron · Clearing Paths',     essence:'Ògúndá opens all roads. The force of iron and will — no obstacle survives Ogunda\'s advance.' },
  { num:10, id:'osa',      yoruba:'Òṣá',        marks:[2,1,1,1], color:'#4ade80', glow:'rgba(74,222,128,0.4)',    energy:'Disruption · Birds',        essence:'Òṣá moves like a startled flock of birds — sudden, scattered, and beautiful in its disorder.' },
  { num:11, id:'ika',      yoruba:'Ìká',        marks:[2,1,2,2], color:'#38bdf8', glow:'rgba(56,189,248,0.4)',    energy:'Serpent · Transformation',  essence:'Ìká is the serpent shedding its skin — constant metamorphosis, the cycle of death and renewal.' },
  { num:12, id:'oturupon', yoruba:'Òtúrúpọ̀n',  marks:[2,2,1,2], color:'#d97706', glow:'rgba(217,119,6,0.4)',    energy:'Earth · Foundation',        essence:'Òtúrúpọ̀n is the ancestral earth — deep roots, unshakeable foundation, the weight of ages.' },
  { num:13, id:'otura',    yoruba:'Òtúrá',      marks:[1,2,1,1], color:'#e2e8f0', glow:'rgba(226,232,240,0.3)',   energy:'God\'s Path · Expansion',   essence:'Òtúrá walks the path of Ọlọrun — the great expansion, arms wide open to embrace the infinite.' },
  { num:14, id:'irete',    yoruba:'Ìrẹtẹ̀',     marks:[1,1,2,1], color:'#fde047', glow:'rgba(253,224,71,0.4)',    energy:'Patience · Longevity',      essence:'Ìrẹtẹ̀ is the wisdom of time — patient, enduring, moving with the slow certainty of rivers.' },
  { num:15, id:'ose',      yoruba:'Òṣé',        marks:[1,2,1,2], color:'#34d399', glow:'rgba(52,211,153,0.4)',    energy:'Medicine · Prosperity',     essence:'Òṣé overflows — abundance, healing, and joy. The dance of Ose is a celebration of fullness.' },
  { num:16, id:'ofun',     yoruba:'Òfún',       marks:[2,1,2,1], color:'#e879f9', glow:'rgba(232,121,249,0.4)',   energy:'Completion · Rebirth',      essence:'Òfún is the end that is also a beginning — the full cycle completed, the wheel turning again.' },
];

// ─── DRUM DATA ────────────────────────────────────────────────────────────────

const DRUMS = [
  {
    id: 'gangan',   name: 'Ìlù Gangan',    english: 'Talking Drum',
    orisa: 'Eṣù · Ṣàngó',      color: '#f97316',  glow: 'rgba(249,115,22,0.35)',
    shape: 'hourglass',
    desc: 'The iconic Yoruba hourglass tension drum. Squeeze its strings to bend the pitch — mimicking the three tones of Yoruba speech. This drum literally TALKS.',
    fact: 'A skilled Gangan player can recite entire proverbs. It was the original telecommunications network of Yorubaland — royal messages carried across kingdoms without a single word.',
    phrase: 'K\'á gbé ìlù — Let us lift the drum!',
    sound: 'talking',
  },
  {
    id: 'dundun',   name: 'Ìlù Dùndún',    english: 'Master Drum Ensemble',
    orisa: 'Ẹgúngún · Ancestors',  color: '#dc2626',  glow: 'rgba(220,38,38,0.35)',
    shape: 'cylinder-tall',
    desc: 'The complete talking drum orchestra — a family led by the Ìyáàlù (Mother Drum). The voice of kings and ancestors, the deepest bass in the city.',
    fact: 'Dundun ensembles broadcast royal edicts across Yorubaland. The lead drummer holds the title of Alagba Ilu — Elder of the Drum.',
    phrase: 'Ìlù ń\'sọ̀rọ̀ — The drum speaks.',
    sound: 'bass',
  },
  {
    id: 'bata',     name: 'Ìlù Bàtá',      english: 'Sacred Triple Drum',
    orisa: 'Ṣàngó · Ọya · Ẹgún', color: '#a855f7',  glow: 'rgba(168,85,247,0.35)',
    shape: 'conical',
    desc: 'Three sacred conical drums — Ìyá (Mother), Omele meta, Kónkolo — consecrated to Sango and Oya. Not mere instruments: they are divine living bodies.',
    fact: 'Bata drums undergo a sacred consecration (àṣẹ) that transforms them from wood into Orisa presences. They must be housed, fed, and respected.',
    phrase: 'Bàtá ń\'pè Ṣàngó — Bata calls Sango.',
    sound: 'sharp',
  },
  {
    id: 'sekere',   name: 'Ìlù Sèkèrè',    english: 'Beaded Gourd Rattle',
    orisa: 'Ọṣun · Yemọja',      color: '#eab308',  glow: 'rgba(234,179,8,0.35)',
    shape: 'gourd',
    desc: 'A sacred gourd wrapped in a net of cowrie shells and glass beads. The rattle-voice of Oshun and Yemoja — rhythm of rivers and the sweetness of life.',
    fact: 'In many Oshun ceremonies, Sekere is played exclusively by women. It is both musical instrument and sacred offering.',
    phrase: 'Ọṣun gbẹ́ sèkèrè — Oshun shakes the sekere.',
    sound: 'rattle',
  },
  {
    id: 'agogo',    name: 'Ìlù Agogo',      english: 'Sacred Iron Bell',
    orisa: 'Ògún · Ọbàtálá',     color: '#94a3b8',  glow: 'rgba(148,163,184,0.35)',
    shape: 'bell',
    desc: 'The ancient iron percussion bell — divine and timeless. Where iron meets iron, Ogun speaks. The rhythmic spine of every Orisa ceremony.',
    fact: 'The word "Agogo" spread through many African language groups meaning "bell" and "clock" (time). It is one of the oldest percussion instruments known.',
    phrase: 'Agogo ń\'dọ́ àkókò — The bell marks time.',
    sound: 'bell',
  },
  {
    id: 'omele',    name: 'Ìlù Omele',      english: 'Companion Drum',
    orisa: 'Community · All Orisa', color: '#22c55e', glow: 'rgba(34,197,94,0.35)',
    shape: 'small-round',
    desc: 'The companion/support drum — mid-range, steady, unwavering. The Omele player holds the rhythmic spine of every ensemble. The art of the Omele is perfect support.',
    fact: '"The support column never dances alone." An Omele player\'s mastery is invisible — when they play perfectly, you feel the group, not the individual.',
    phrase: 'Omele gbé ìpìlẹ̀ — Omele holds the foundation.',
    sound: 'mid',
  },
  {
    id: 'bembe',    name: 'Ìlù Bẹ̀mbẹ̀',    english: 'Community Gathering Drum',
    orisa: 'All Orisa · Ìlú',     color: '#14b8a6',  glow: 'rgba(20,184,166,0.35)',
    shape: 'cylinder',
    desc: 'The cylindrical community drum — deep, resonant, all-inclusive. When Bẹ̀mbẹ̀ sounds, every member of the city is called. All Orisa are invited to attend.',
    fact: 'A "Bẹ̀mbẹ̀" is also the name of the sacred overnight feast where all Orisa are collectively invoked through music, dance, and offerings.',
    phrase: 'Bẹ̀mbẹ̀ pè àwọn gbogbo — Bembe calls everyone.',
    sound: 'deep',
  },
  {
    id: 'igbin',    name: 'Ìlù Ìgbìn',      english: 'Sacred Snail Drum',
    orisa: 'Ọbàtálá · Ọrúnmìlà', color: '#e2e8f0',  glow: 'rgba(226,232,240,0.25)',
    shape: 'igbin',
    desc: 'The most sacred percussion of all — pure white, consecrated to Obatala, the Sky Father. Igbin speaks in whispers that carry the weight of cosmic truth.',
    fact: 'Igbin drums may only be played during Obatala ceremonies. Players must maintain strict ritual purity — no salt, no pepper, no alcohol. Their sound is white silence.',
    phrase: 'Ìgbìn sọ̀rọ̀ ọ̀tọ̀ — Igbin speaks of uniqueness.',
    sound: 'hollow',
  },
  {
    id: 'ashiko',   name: 'Ìlù Aṣíkò',     english: 'Rhythmic Support Drum',
    orisa: 'Eṣù · Crossroads',   color: '#f59e0b',  glow: 'rgba(245,158,11,0.35)',
    shape: 'tapered',
    desc: 'A cylindrical or slightly tapered drum that plays conversational counter-rhythms with the lead drummer. Ashiko holds the crossroads between lead and foundation.',
    fact: 'The Ashiko\'s conversational role represents Esu at the crossroads — mediating between all other drums, translating the lead\'s speech into ensemble rhythm.',
    phrase: 'Aṣíkò ń\'sọ̀rọ̀ pẹ̀lú ìlù — Ashiko dialogues with the drum.',
    sound: 'mid',
  },
  {
    id: 'apinti',   name: 'Ìlù Apinti',     english: 'Thunder Drum',
    orisa: 'Ṣàngó · Ọya',       color: '#e879f9',  glow: 'rgba(232,121,249,0.35)',
    shape: 'large-barrel',
    desc: 'The mighty rope-tension drum — booming and majestic, calling divine forces. When Apinti plays, the thunder comes. The sky itself answers.',
    fact: 'Apinti drums are played at the most powerful Sango ceremonies. Their deep reverberant boom is said to be the physical echo of Sango\'s thunderbolt.',
    phrase: 'Apinti pè àárọ̀ — Apinti calls the storm.',
    sound: 'bass',
  },
];

// ─── CHARACTER DATA ───────────────────────────────────────────────────────────

const CHARACTERS = [
  {
    id: 'agba',   name: 'Àgbà Ìlù',    role: 'Elder Drummer',     color: '#f97316',
    says: [
      'Ìlù ń\'sọ̀rọ̀ — The drum talks. I have listened to its voice for seventy years.',
      'Before the written word, the drum was our library. Every beat is a chapter of Ifa.',
      'When I play, I speak to both the living and the ancestors. They always answer.',
    ],
    drums: ['gangan', 'dundun'], dance: 'sway',
  },
  {
    id: 'iya',    name: 'Ìyá Sèkèrè', role: 'Mother of Rhythms',  color: '#ec4899',
    says: [
      'My hands speak the tongue of Oshun. The river flows through every shake of the sekere.',
      'Rhythm is the mother tongue. Before speech, before fire — there was rhythm.',
      'The Sekere holds sweetness. Shake it and you are calling the honey of life itself.',
    ],
    drums: ['sekere', 'bembe'], dance: 'flow',
  },
  {
    id: 'omo',    name: 'Ọmọ Ìlú',    role: 'Young Apprentice',   color: '#22c55e',
    says: [
      'I am still learning the words of the drum! Each day brings one new phrase.',
      'The Gangan told me: "Patience is also a rhythm — it has its own perfect timing."',
      'The whole city is alive with beats! Every corner speaks a different language!',
    ],
    drums: ['gangan', 'omele'], dance: 'bounce',
  },
  {
    id: 'egun',   name: 'Àgọ Ẹ̀gún',  role: 'Ancestor Voice',     color: '#6366f1',
    says: [
      'I come from where time has no boundary. The Dundun carries my voice between worlds.',
      'We never left. Listen carefully — every sunrise is drummed by those who came before.',
      'The ancestors speak through the drum. We make the invisible visible through sound.',
    ],
    drums: ['dundun', 'igbin'], dance: 'float',
  },
  {
    id: 'sango',  name: 'Baba Ṣàngó', role: 'Thunder Keeper',     color: '#dc2626',
    says: [
      'Bàtá ń\'pè orúkọ mi — Bata drums my name in lightning and fire!',
      'Do not fear the thunder. It is the Bata and Apinti announcing my royal arrival.',
      'I am the original sound system. Before speakers — the sky was my dance floor.',
    ],
    drums: ['bata', 'apinti'], dance: 'thunder',
  },
  {
    id: 'itan',   name: 'Ìtàn Ìlú',  role: 'City Historian',     color: '#0ea5e9',
    says: [
      'This city was built from drum language. Every street name is a rhythm pattern.',
      'Ìlú-Ìlù has stood for over three thousand years. The Igbin drums still tell the founding story.',
      '"Ìlú tí kò lù ìlù kì í gbádùn ìgbésí-ayé" — A town without drums does not enjoy life.',
    ],
    drums: ['igbin', 'agogo'], dance: 'nod',
  },
];

// ─── ILU LANGUAGE DATA ───────────────────────────────────────────────────────

const ILU_PHRASES = [
  { yoruba: 'Ìlù ń\'sọ̀rọ̀',       english: 'The drum talks',        drum: '◆◇◆◆',         meaning: 'The founding phrase of Èdè Ìlú — the Drum Language itself' },
  { yoruba: 'E káàárọ̀',           english: 'Good morning',          drum: '◆◇◆ · ◆◆◇',    meaning: 'Morning greeting (high-low-high · high-high-low)' },
  { yoruba: 'Gbogbo ẹ̀ ó dára',    english: 'All will be well',      drum: '◆◆◆ · ◇◇◆ · ◆◆◆', meaning: 'Blessing phrase — three high-tone clusters' },
  { yoruba: 'Ẹbọ àṣẹ',            english: 'Sacred offering / power', drum: '◇◆◆ · ◆◇◆',  meaning: 'Used in Ebo ceremonies — low-high-high · high-low-high' },
  { yoruba: 'Ìdílé mi',            english: 'My family',             drum: '◇◆◇◆ · ◆◇',    meaning: 'Calling one\'s lineage — alternating tones' },
  { yoruba: 'Ọba ń bọ̀',           english: 'The king approaches',   drum: '◆◆◆◆ · ◇ · ◆◆◆', meaning: 'Royal announcement — four highs + pause + three highs' },
  { yoruba: 'Àṣẹ ó ṣe',           english: 'So it shall be',        drum: '◆◇◆ · ◇◆◇',    meaning: 'Closing affirmation of prayer — the Amen of Ifa' },
  { yoruba: 'Ìlú ń jó',           english: 'The city dances',       drum: '◇◆◆ · ◇ · ◆◇◆', meaning: 'Celebration call — when all drums play together in joy' },
];

// ─── DRUM PAD ROWS ────────────────────────────────────────────────────────────

const PAD_ROWS = [
  { id:'gangan',  name:'Gangan',  color:'#f97316', sound:'talking' },
  { id:'dundun',  name:'Dùndún', color:'#dc2626', sound:'bass'    },
  { id:'bata',    name:'Bàtá',   color:'#a855f7', sound:'sharp'   },
  { id:'agogo',   name:'Agogo',  color:'#94a3b8', sound:'bell'    },
  { id:'sekere',  name:'Sèkèrè', color:'#eab308', sound:'rattle'  },
  { id:'bembe',   name:'Bẹ̀mbẹ̀',  color:'#14b8a6', sound:'deep'    },
];

// ─── PRESET RHYTHMS ───────────────────────────────────────────────────────────

const PRESET_RHYTHMS = [
  {
    name: 'Ẹgbẹ́ Ọjọ́ — Community Pulse',
    pattern: [
      [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0],
      [1,0,0,0, 0,0,1,0, 1,0,0,0, 0,0,1,0],
      [0,0,1,0, 0,0,1,0, 0,0,1,0, 0,0,1,0],
      [1,0,1,0, 1,0,1,0, 1,0,1,0, 1,0,1,0],
      [0,1,0,0, 0,1,0,0, 0,1,0,0, 0,1,0,0],
      [0,0,0,1, 0,0,0,1, 0,0,0,1, 0,0,0,1],
    ],
  },
  {
    name: 'Ìlù Ṣàngó — Thunder Pattern',
    pattern: [
      [1,0,1,0, 1,1,0,0, 1,0,1,0, 0,1,0,0],
      [1,0,0,1, 0,0,1,0, 1,0,0,1, 0,0,0,0],
      [1,0,1,1, 0,1,0,1, 1,0,1,1, 0,1,0,0],
      [0,1,0,1, 0,1,0,1, 0,1,0,1, 0,1,0,1],
      [1,0,0,0, 1,0,0,0, 1,0,0,0, 0,0,1,0],
      [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0],
    ],
  },
  {
    name: 'Ọṣun Gbé — Oshun Dance',
    pattern: [
      [0,1,0,1, 0,0,1,0, 0,1,0,1, 0,0,1,0],
      [1,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0],
      [0,0,0,0, 0,1,0,0, 0,0,0,0, 0,1,0,0],
      [1,0,1,0, 1,0,1,0, 1,0,1,0, 1,0,1,0],
      [1,1,0,1, 1,0,1,1, 0,1,1,0, 1,1,0,1],
      [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0],
    ],
  },
];

// ─── AUDIO ENGINE ─────────────────────────────────────────────────────────────

function useAudioEngine() {
  const ctxRef = useRef(null);

  function getCtx() {
    if (!ctxRef.current) {
      ctxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (ctxRef.current.state === 'suspended') ctxRef.current.resume();
    return ctxRef.current;
  }

  function noise(ac, now, dur, filterType, freq, Q, vol) {
    try {
      const size = Math.ceil(ac.sampleRate * dur);
      const buf = ac.createBuffer(1, size, ac.sampleRate);
      const d = buf.getChannelData(0);
      for (let i = 0; i < size; i++) d[i] = Math.random() * 2 - 1;
      const src = ac.createBufferSource(); src.buffer = buf;
      const flt = ac.createBiquadFilter();
      flt.type = filterType; flt.frequency.value = freq; flt.Q.value = Q;
      const g = ac.createGain();
      g.gain.setValueAtTime(vol, now);
      g.gain.exponentialRampToValueAtTime(0.001, now + dur);
      src.connect(flt); flt.connect(g); g.connect(ac.destination);
      src.start(now); src.stop(now + dur + 0.05);
    } catch(e) {}
  }

  function osc(ac, now, type, f0, f1, dur, vol) {
    try {
      const o = ac.createOscillator(); o.type = type;
      o.frequency.setValueAtTime(f0, now);
      if (f1 && f1 !== f0) o.frequency.exponentialRampToValueAtTime(f1, now + dur * 0.85);
      const g = ac.createGain();
      g.gain.setValueAtTime(0.01, now);
      g.gain.linearRampToValueAtTime(vol, now + 0.006);
      g.gain.exponentialRampToValueAtTime(0.001, now + dur);
      o.connect(g); g.connect(ac.destination);
      o.start(now); o.stop(now + dur + 0.06);
    } catch(e) {}
  }

  function play(soundType, variant = 0) {
    try {
      const ac = getCtx();
      const now = ac.currentTime;
      switch (soundType) {
        case 'talking': {
          const hi = variant === 0;
          osc(ac, now, 'sawtooth', hi ? 520 : 260, hi ? 300 : 150, 0.3, 0.45);
          noise(ac, now, 0.04, 'bandpass', 1800, 3, 0.3);
          break;
        }
        case 'bass': {
          osc(ac, now, 'sine', 75, 35, 0.55, 0.85);
          noise(ac, now, 0.04, 'lowpass', 600, 1, 0.5);
          break;
        }
        case 'sharp': {
          noise(ac, now, 0.06, 'highpass', 2000, 2, 0.7);
          osc(ac, now, 'sine', 320, 140, 0.18, 0.5);
          break;
        }
        case 'rattle': {
          noise(ac, now, 0.18, 'highpass', 4000, 0.4, 0.5);
          noise(ac, now + 0.06, 0.1, 'highpass', 5000, 0.3, 0.3);
          break;
        }
        case 'bell': {
          osc(ac, now, 'sine', 900, 900, 1.4, 0.6);
          osc(ac, now, 'sine', 1350, 1350, 0.9, 0.3);
          osc(ac, now, 'triangle', 2250, 2250, 0.4, 0.12);
          noise(ac, now, 0.015, 'highpass', 6000, 1, 0.7);
          break;
        }
        case 'mid': {
          osc(ac, now, 'sine', 260, 110, 0.3, 0.7);
          noise(ac, now, 0.05, 'bandpass', 1200, 2, 0.35);
          break;
        }
        case 'deep': {
          osc(ac, now, 'sine', 58, 35, 0.85, 0.9);
          noise(ac, now, 0.06, 'lowpass', 250, 1, 0.45);
          break;
        }
        case 'hollow': {
          osc(ac, now, 'triangle', 210, 95, 0.22, 0.6);
          noise(ac, now, 0.055, 'bandpass', 700, 6, 0.45);
          break;
        }
      }
    } catch (e) { console.warn('Audio error:', e); }
  }

  function playWelcome() {
    try {
      const ac = getCtx();
      const t = ac.currentTime;
      // ── Agogo bell call — three tings: "Attention!" ──
      osc(ac, t + 0.00, 'sine', 900, 900, 1.6, 0.55);
      osc(ac, t + 0.00, 'sine', 1360, 1360, 1.0, 0.25);
      noise(ac, t + 0.00, 0.012, 'highpass', 6000, 1, 0.6);
      osc(ac, t + 0.28, 'sine', 900, 900, 1.3, 0.45);
      osc(ac, t + 0.28, 'sine', 1360, 1360, 0.8, 0.2);
      noise(ac, t + 0.28, 0.012, 'highpass', 6000, 1, 0.5);
      osc(ac, t + 0.50, 'sine', 900, 900, 1.1, 0.38);
      noise(ac, t + 0.50, 0.012, 'highpass', 6000, 1, 0.45);
      // ── Gangan talking phrase — "Ìlú bọ̀!" high-low-high ──
      osc(ac, t + 0.72, 'sawtooth', 540, 300, 0.32, 0.45);
      noise(ac, t + 0.72, 0.04, 'bandpass', 1800, 3, 0.28);
      osc(ac, t + 1.00, 'sawtooth', 240, 140, 0.30, 0.40);
      noise(ac, t + 1.00, 0.04, 'bandpass', 1200, 3, 0.22);
      osc(ac, t + 1.26, 'sawtooth', 560, 320, 0.28, 0.42);
      noise(ac, t + 1.26, 0.04, 'bandpass', 1900, 3, 0.25);
      // ── Dundun deep bass — the city's heartbeat ──
      osc(ac, t + 1.55, 'sine', 75, 32, 0.65, 0.90);
      noise(ac, t + 1.55, 0.06, 'lowpass', 550, 1, 0.55);
      // ── Bata sacred crack ──
      noise(ac, t + 1.70, 0.07, 'highpass', 2200, 2, 0.72);
      osc(ac, t + 1.70, 'sine', 300, 130, 0.18, 0.48);
      // ── Sekere celebration burst ──
      noise(ac, t + 1.85, 0.20, 'highpass', 4200, 0.4, 0.52);
      noise(ac, t + 2.00, 0.12, 'highpass', 5200, 0.3, 0.30);
      // ── Final long agogo ring — the gates open ──
      osc(ac, t + 2.15, 'sine', 900, 900, 2.8, 0.60);
      osc(ac, t + 2.15, 'sine', 1360, 1360, 2.0, 0.28);
      osc(ac, t + 2.15, 'triangle', 2250, 2250, 1.0, 0.10);
      noise(ac, t + 2.15, 0.014, 'highpass', 6200, 1, 0.65);
      // ── Closing dundun + gangan together ──
      osc(ac, t + 2.50, 'sine', 72, 30, 0.80, 0.85);
      noise(ac, t + 2.50, 0.07, 'lowpass', 480, 1, 0.45);
      osc(ac, t + 2.65, 'sawtooth', 520, 280, 0.35, 0.38);
    } catch (e) { console.warn('Welcome audio error:', e); }
  }

  function playOdu(odu) {
    try {
      const ac = getCtx();
      const t = ac.currentTime;
      switch(odu.id) {
        case 'ogbe':
          osc(ac,t,'sine',900,900,1.8,0.6); osc(ac,t,'sine',1350,1350,1.1,0.3); noise(ac,t,0.012,'highpass',6000,1,0.65);
          osc(ac,t+.35,'sine',1050,1050,1.4,0.5); osc(ac,t+.65,'sine',1200,1200,1.2,0.45);
          break;
        case 'oyeku':
          osc(ac,t,'sine',55,28,2.2,0.95); noise(ac,t,0.08,'lowpass',150,0.7,0.55);
          osc(ac,t+.6,'sine',65,30,1.8,0.65); osc(ac,t+1.1,'triangle',110,55,1.2,0.4);
          break;
        case 'iwori':
          osc(ac,t,'sawtooth',480,340,0.35,0.45); noise(ac,t,0.035,'bandpass',1400,3,0.25);
          osc(ac,t+.28,'sawtooth',320,220,0.32,0.4); osc(ac,t+.55,'sawtooth',420,300,0.3,0.38);
          break;
        case 'odi':
          noise(ac,t,0.06,'bandpass',800,2,0.35);
          for(let i=0;i<4;i++) osc(ac,t+i*0.22,'sine',230+i*12,175,0.26,0.5);
          break;
        case 'irosun':
          noise(ac,t,0.06,'highpass',2500,2.5,0.8); osc(ac,t,'sine',90,40,0.6,0.9);
          noise(ac,t+.18,0.06,'highpass',2800,2,0.65); osc(ac,t+.38,'sine',80,35,0.5,0.8);
          break;
        case 'owonrin':
          noise(ac,t,0.3,'bandpass',2200,1.5,0.4);
          for(let i=0;i<6;i++) osc(ac,t+i*0.1,'sawtooth',180+i*65,120+i*40,0.18,0.32);
          break;
        case 'obara':
          osc(ac,t,'sine',85,40,0.7,0.9); noise(ac,t,0.05,'lowpass',500,1,0.5);
          osc(ac,t+.42,'sine',95,45,0.6,0.85); osc(ac,t+.78,'sawtooth',480,300,0.3,0.4);
          break;
        case 'okanran':
          noise(ac,t,0.04,'highpass',3000,3,0.85); osc(ac,t,'triangle',380,180,0.15,0.6);
          noise(ac,t+.22,0.04,'highpass',3200,3,0.7); osc(ac,t+.38,'sawtooth',580,280,0.2,0.55);
          break;
        case 'ogunda':
          osc(ac,t,'sine',65,28,0.8,0.95); noise(ac,t,0.06,'lowpass',300,1,0.6);
          osc(ac,t+.42,'sine',60,25,0.7,0.9); noise(ac,t+.42,0.06,'lowpass',280,1,0.55);
          osc(ac,t+.78,'sine',70,30,0.65,0.85);
          break;
        case 'osa':
          noise(ac,t,0.22,'highpass',4500,0.3,0.55); noise(ac,t+.12,0.18,'highpass',5000,0.3,0.45);
          osc(ac,t,'triangle',620,580,0.35,0.4); osc(ac,t+.28,'triangle',680,640,0.3,0.35);
          break;
        case 'ika':
          osc(ac,t,'sawtooth',250,440,0.6,0.55); osc(ac,t,'sine',180,340,0.6,0.4);
          noise(ac,t,0.08,'bandpass',1000,4,0.3); osc(ac,t+.5,'sawtooth',440,280,0.55,0.45);
          break;
        case 'oturupon':
          osc(ac,t,'sine',48,24,1.4,0.98); noise(ac,t,0.08,'lowpass',120,0.6,0.6);
          osc(ac,t+.55,'sine',52,26,1.2,0.85);
          break;
        case 'otura':
          osc(ac,t,'sine',400,650,0.5,0.55); osc(ac,t,'sine',600,900,0.5,0.35);
          noise(ac,t,0.015,'highpass',5000,1,0.5);
          osc(ac,t+.42,'sine',800,1000,0.45,0.5); osc(ac,t+.8,'sine',900,900,1.4,0.55);
          break;
        case 'irete':
          osc(ac,t,'sine',180,90,0.55,0.7); noise(ac,t,0.06,'bandpass',600,2,0.4);
          osc(ac,t+.58,'sine',200,100,0.5,0.65); osc(ac,t+1.1,'sine',190,95,0.48,0.6);
          break;
        case 'ose':
          noise(ac,t,0.2,'highpass',4000,0.4,0.6); noise(ac,t+.1,0.15,'highpass',5000,0.3,0.45);
          osc(ac,t+.22,'sine',900,900,1.2,0.5); osc(ac,t+.22,'sine',1350,1350,0.8,0.25);
          noise(ac,t+.22,0.012,'highpass',6000,1,0.6); noise(ac,t+.55,0.18,'highpass',4200,0.4,0.45);
          break;
        case 'ofun':
          osc(ac,t,'sine',72,32,0.85,0.9); noise(ac,t,0.06,'lowpass',500,1,0.5);
          noise(ac,t+.32,0.05,'highpass',2200,2,0.65); osc(ac,t+.32,'sine',280,120,0.2,0.5);
          noise(ac,t+.62,0.18,'highpass',4000,0.4,0.5);
          osc(ac,t+.95,'sine',900,900,1.8,0.55); osc(ac,t+.95,'sine',1350,1350,1.2,0.28);
          noise(ac,t+.95,0.012,'highpass',6000,1,0.6);
          break;
      }
    } catch(e) { console.warn('Odu audio error:', e); }
  }

  return { play, playWelcome, playOdu };
}

// ─── WELCOME GATE ────────────────────────────────────────────────────────────

const GATE_WORDS = ['ìlù','ìlú','àṣẹ','ọ̀rọ̀','sọ̀rọ̀','ìjó','bàtá','gangan','dùndún','sèkèrè'];

function WelcomeGate({ onEnter }) {
  const [leaving, setLeaving] = useState(false);
  function handleEnter() {
    onEnter();
    setLeaving(true);
  }
  return (
    <div className={`welcome-gate${leaving ? ' welcome-gate--out' : ''}`} role="dialog" aria-modal="true" aria-label="Welcome to Ìlú-Ìlù">
      {/* Floating drum words */}
      {GATE_WORDS.map((w, i) => (
        <div key={i} className="wg-float" style={{
          left: `${5 + i * 9.5}%`,
          animationDuration: `${5 + (i % 4) * 1.3}s`,
          animationDelay: `${i * 0.55}s`,
        }}>{w}</div>
      ))}
      {/* Ripple rings */}
      <div className="wg-rings" aria-hidden="true">
        <div className="wg-ring wg-ring--1" />
        <div className="wg-ring wg-ring--2" />
        <div className="wg-ring wg-ring--3" />
      </div>
      <div className="wg-inner">
        <div className="wg-eyebrow">Ifa Simulation · IFA Internet</div>
        <div className="wg-drum-icon" aria-hidden="true">
          <svg viewBox="0 0 80 100" width="80" height="100">
            <polygon points="4,4 76,4 52,48 28,48" fill="#f97316" opacity="0.92"/>
            <polygon points="28,52 52,52 76,96 4,96" fill="#f97316" opacity="0.75"/>
            <ellipse cx="40" cy="4" rx="36" ry="9" fill="#f97316" opacity="0.55"/>
            <ellipse cx="40" cy="96" rx="36" ry="9" fill="#f97316" opacity="0.55"/>
            <ellipse cx="40" cy="50" rx="12" ry="5" fill="#f97316" opacity="0.65"/>
            {[1,2,3,4,5].map(i => (
              <line key={i} x1="34" y1={`${4 + i * 8.5}`} x2="46" y2={`${4 + i * 8.5}`}
                stroke="rgba(255,200,100,0.22)" strokeWidth="1"/>
            ))}
          </svg>
        </div>
        <h1 className="wg-title">Ìlú-Ìlù</h1>
        <p className="wg-subtitle">City of Drum</p>
        <p className="wg-phrase">Ìlù ń'sọ̀rọ̀ — The Drum Talks</p>
        <button className="wg-enter-btn" onClick={handleEnter}>
          <span className="wg-enter-btn__icon">🥁</span>
          <span>Enter the City</span>
        </button>
        <p className="wg-hint">Click to hear the drums welcome you</p>
      </div>
    </div>
  );
}

// ─── HEADER ──────────────────────────────────────────────────────────────────

function IluHeader() {
  return (
    <header className="ilu-header">
      <div className="ilu-header__inner">
        <a href="../" className="ilu-header__back">
          <span>←</span>
          <span>Playground</span>
        </a>
        <div className="ilu-header__brand">
          <span className="ilu-header__name">Ìlú-Ìlù</span>
          <span className="ilu-header__sep">·</span>
          <span className="ilu-header__sub">City of Drum</span>
        </div>
        <a href="https://ifainternet.org" className="ilu-header__ifa" target="_blank" rel="noopener noreferrer">
          IFA Internet
        </a>
      </div>
    </header>
  );
}

// ─── CITY SCENE ──────────────────────────────────────────────────────────────

const FIREFLIES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: 5 + (i * 4.7 + Math.sin(i * 1.3) * 8) % 90,
  y: 30 + (i * 3.1 + Math.cos(i * 0.9) * 10) % 45,
  size: 1.5 + (i % 4) * 0.5,
  dur: 2.5 + (i % 5) * 0.8,
  del: (i * 0.6) % 5,
  dx: ((i % 5) - 2) * 7,
  dy: ((i % 3) - 1) * 5,
}));

const STARS = Array.from({ length: 70 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 70,
  size: 0.6 + Math.random() * 1.8,
  dur: 2 + Math.random() * 4,
  del: Math.random() * 6,
}));

const CITY_WORDS = ['ìlù', 'sọ̀rọ̀', 'àṣẹ', 'ìlú', 'ọ̀rọ̀', 'ìjó'];

function CityScene() {
  return (
    <div className="city-scene" aria-hidden="true">
      {/* Sky layer */}
      <div className="city-sky">
        {STARS.map(s => (
          <span key={s.id} className="city-star" style={{
            left: `${s.x}%`, top: `${s.y}%`,
            width: `${s.size}px`, height: `${s.size}px`,
            animationDuration: `${s.dur}s`, animationDelay: `${s.del}s`,
          }} />
        ))}
        <div className="city-moon" />
        <div className="city-moon-glow" />
        {/* Floating drum words */}
        {CITY_WORDS.map((w, i) => (
          <div key={i} className="city-float-word"
            style={{ left: `${8 + i * 15}%`, animationDelay: `${i * 1.4}s`, animationDuration: `${6 + i * 0.7}s` }}>
            {w}
          </div>
        ))}
        {/* Sound waves from city */}
        <div className="city-wave city-wave--1" />
        <div className="city-wave city-wave--2" />
        <div className="city-wave city-wave--3" />
        {/* Fireflies */}
        {FIREFLIES.map(f => (
          <div key={f.id} className="city-firefly" style={{
            left: `${f.x}%`,
            top: `${f.y}%`,
            width: `${f.size}px`,
            height: `${f.size}px`,
            animationDuration: `${f.dur}s`,
            animationDelay: `${f.del}s`,
            '--ffx': `${f.dx}px`,
            '--ffy': `${f.dy}px`,
          }}/>
        ))}
      </div>

      {/* Buildings */}
      <div className="city-buildings">
        <div className="city-bldg city-bldg--a" />
        <div className="city-bldg city-bldg--b" />
        <div className="city-bldg city-bldg--c city-bldg--hut" />
        <div className="city-bldg city-bldg--d" />
        <div className="city-bldg city-bldg--e city-bldg--hut" />
        <div className="city-bldg city-bldg--f" />
        <div className="city-bldg city-bldg--g city-bldg--hut" />
        <div className="city-bldg city-bldg--h" />
        <div className="city-bldg city-bldg--i" />
      </div>

      {/* Trees */}
      <div className="city-trees">
        {[8, 22, 42, 63, 78, 92].map((x, i) => (
          <div key={i} className="city-tree" style={{ left: `${x}%`, animationDelay: `${i * 0.6}s` }}>
            <div className="city-tree__fronds" />
            <div className="city-tree__trunk" />
          </div>
        ))}
      </div>

      {/* Ground / street */}
      <div className="city-ground">
        {/* Torches */}
        <div className="city-torch city-torch--1"><div className="ct-flame"/></div>
        <div className="city-torch city-torch--2"><div className="ct-flame"/></div>
        <div className="city-torch city-torch--3"><div className="ct-flame"/></div>
        <div className="city-torch city-torch--4"><div className="ct-flame"/></div>

        {/* Walking stick figures */}
        {[
          { cl:'city-walker--1', col:'#f97316', spd:'22s', del:'0s',   dir: 1 },
          { cl:'city-walker--2', col:'#a855f7', spd:'28s', del:'-8s',  dir: 1 },
          { cl:'city-walker--3', col:'#22c55e', spd:'18s', del:'-4s',  dir: 1 },
          { cl:'city-walker--4', col:'#eab308', spd:'32s', del:'-14s', dir: 1 },
        ].map((w, i) => (
          <div key={i} className={`city-walker ${w.cl}`}
            style={{ '--wc': w.col, animationDuration: w.spd, animationDelay: w.del }}>
            <div className="cw-head" />
            <div className="cw-body">
              <div className="cw-arm cw-arm--l" />
              <div className="cw-arm cw-arm--r" />
            </div>
            <div className="cw-legs">
              <div className="cw-leg" />
              <div className="cw-leg" />
            </div>
          </div>
        ))}

        {/* Drum circles on ground */}
        <div className="city-drum-circle city-drum-circle--1">🥁</div>
        <div className="city-drum-circle city-drum-circle--2">🥁</div>
      </div>
    </div>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────

function IluHero() {
  return (
    <section className="ilu-hero">
      <CityScene />
      <div className="ilu-hero__content">
        <div className="ilu-hero__eyebrow">Ifa Simulation · IFA Internet</div>
        <h1 className="ilu-hero__title">
          <span className="ilu-hero__t-main">Ìlú-Ìlù</span>
          <span className="ilu-hero__t-sub">The City of Drum</span>
        </h1>
        <p className="ilu-hero__phrase">
          <span className="ilu-hero__p-yor">Ìlù ń'sọ̀rọ̀</span>
          <span className="ilu-hero__p-en"> — The Drum Talks</span>
        </p>
        <p className="ilu-hero__desc">
          An Ifa Simulation where the inhabitants speak <strong>Èdè Ìlù</strong>, Ìlù Language — the Drum Language (IluLang).
          Beat 16 sacred drums, converse with the city's inhabitants, compose rhythms on the
          ÌlùPad, and explore the living science &amp; art of Yoruba talking drums.
        </p>
        <p className="ilu-hero__desc">
          Use Ìlù Simulations to learn and model all fields, from the sciences to the non-sciences.
        </p>
        <div className="ilu-hero__tags">
          {['Ìlù Gangan','Ìlù Dùndún','Ìlù Bàtá','Sèkèrè','Agogo','Bẹ̀mbẹ̀','Ìgbìn','Aṣíkò','Apinti'].map((t, i) => (
            <span key={i} className="ilu-hero-tag">{t}</span>
          ))}
        </div>
        <div className="ilu-hero__ctas">
          <a href="#drums" className="ilu-btn ilu-btn--primary">Beat the Drums ↓</a>
          <a href="#inhabitants" className="ilu-btn ilu-btn--ghost">Meet Inhabitants ↓</a>
          <a href="#drum-pad" className="ilu-btn ilu-btn--ghost">Compose ↓</a>
          <a href="#ifa-dance" className="ilu-btn ilu-btn--ghost">IfaDance ↓</a>
        </div>
      </div>
    </section>
  );
}

// ─── INTRO ────────────────────────────────────────────────────────────────────

function IluIntro() {
  return (
    <section className="ilu-intro">
      <div className="ilu-container">
        <div className="ilu-intro__grid">
          <div className="ilu-intro-card">
            <div className="ilu-intro-card__icon" style={{ color:'#f97316' }}>🥁</div>
            <h3 className="ilu-intro-card__title">Ìlù as Orisa</h3>
            <p className="ilu-intro-card__text">
              The drum is not merely an instrument — it is a divine body. Every Bàtá drum is
              consecrated, housed, and fed. The Ìgbìn may only be present in Obatala's ceremonies.
              Ìlù has <em>àṣẹ</em> — sacred power — and speaks directly to the Orisa.
            </p>
          </div>
          <div className="ilu-intro-card">
            <div className="ilu-intro-card__icon" style={{ color:'#a855f7' }}>🏛️</div>
            <h3 className="ilu-intro-card__title">Ìlú as Orisa</h3>
            <p className="ilu-intro-card__text">
              The City is also sacred. Ìlú-Ìlù — the City of Drum — is a living entity with
              its own Àṣẹ. Every crossroads, market, and compound has its drum language.
              To live in the city is to be part of its rhythm. The town <em>IS</em> the drum.
            </p>
          </div>
          <div className="ilu-intro-card">
            <div className="ilu-intro-card__icon" style={{ color:'#14b8a6' }}>💬</div>
            <h3 className="ilu-intro-card__title">Èdè Ìlù — Ìlù Language (IluLang)</h3>
            <p className="ilu-intro-card__text">
              Yoruba Gangan and Dùndún talking drums replicate the three tones of spoken Yoruba
              (high ◆, mid ●, low ◇). A master drummer recites proverbs, announces kings,
              mourns the dead, and celebrates births — all without a single spoken word.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── DRUM SVG ICON ────────────────────────────────────────────────────────────

function DrumIcon({ shape, color }) {
  switch (shape) {
    case 'hourglass':
      return (
        <svg width="54" height="70" viewBox="0 0 54 70" fill="none">
          <defs>
            <linearGradient id={`dg-hourglass`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="white" stopOpacity="0.15"/>
              <stop offset="100%" stopColor="black" stopOpacity="0.25"/>
            </linearGradient>
          </defs>
          {/* Shadow */}
          <ellipse cx="27" cy="68" rx="22" ry="4" fill="rgba(0,0,0,0.4)"/>
          {/* Body */}
          <polygon points="3,3 51,3 35,34 19,34" fill={color} opacity="0.9"/>
          <polygon points="19,36 35,36 51,67 3,67" fill={color} opacity="0.75"/>
          <ellipse cx="27" cy="3" rx="24" ry="6" fill={color} opacity="0.5"/>
          <ellipse cx="27" cy="67" rx="24" ry="6" fill={color} opacity="0.5"/>
          <ellipse cx="27" cy="35" rx="8" ry="3.5" fill={color} opacity="0.6"/>
          {/* Membrane texture */}
          <ellipse cx="27" cy="3" rx="18" ry="3.5" fill="rgba(255,255,255,0.18)"/>
          {/* Tension strings top */}
          {[0,1,2,3,4,5].map(i => <line key={i} x1={10+i*7} y1="10" x2={13+i*7} y2="30" stroke="rgba(255,255,255,0.18)" strokeWidth="0.9"/>)}
          {/* Tension strings bottom */}
          {[0,1,2,3,4,5].map(i => <line key={i} x1={13+i*7} y1="30" x2={16+i*7} y2="58" stroke="rgba(255,255,255,0.18)" strokeWidth="0.9"/>)}
          {/* 3D shading overlay */}
          <polygon points="3,3 51,3 35,34 19,34" fill="url(#dg-hourglass)" opacity="0.6"/>
          <polygon points="19,36 35,36 51,67 3,67" fill="url(#dg-hourglass)" opacity="0.4"/>
        </svg>
      );
    case 'cylinder-tall':
      return (
        <svg width="54" height="70" viewBox="0 0 54 70" fill="none">
          <defs>
            <linearGradient id={`dg-cylinder-tall`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="white" stopOpacity="0.15"/>
              <stop offset="100%" stopColor="black" stopOpacity="0.25"/>
            </linearGradient>
          </defs>
          {/* Shadow */}
          <ellipse cx="27" cy="67" rx="21" ry="4" fill="rgba(0,0,0,0.4)"/>
          <ellipse cx="27" cy="11" rx="21" ry="8" fill={color} opacity="0.5"/>
          <rect x="6" y="11" width="42" height="48" fill={color} opacity="0.8"/>
          <ellipse cx="27" cy="59" rx="21" ry="8" fill={color} opacity="0.95"/>
          {/* Membrane texture */}
          <ellipse cx="27" cy="11" rx="14" ry="4.5" fill="rgba(255,255,255,0.2)"/>
          <line x1="6" y1="28" x2="48" y2="28" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5"/>
          <line x1="6" y1="43" x2="48" y2="43" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5"/>
          {/* Tension strings */}
          {[0,1,2,3,4,5].map(i => <line key={i} x1={10+i*6} y1="11" x2={10+i*6} y2="59" stroke="rgba(255,255,255,0.1)" strokeWidth="0.9"/>)}
          {/* 3D shading */}
          <rect x="6" y="11" width="42" height="48" fill="url(#dg-cylinder-tall)" opacity="0.5"/>
        </svg>
      );
    case 'conical':
      return (
        <svg width="54" height="70" viewBox="0 0 54 70" fill="none">
          <defs>
            <linearGradient id={`dg-conical`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="white" stopOpacity="0.15"/>
              <stop offset="100%" stopColor="black" stopOpacity="0.25"/>
            </linearGradient>
          </defs>
          {/* Shadow */}
          <ellipse cx="27" cy="68" rx="26" ry="4" fill="rgba(0,0,0,0.4)"/>
          <polygon points="3,8 15,8 13,60 5,60" fill={color} opacity="0.6"/>
          <ellipse cx="9" cy="8" rx="6" ry="3" fill={color} opacity="0.9"/>
          <polygon points="17,3 37,3 35,67 19,67" fill={color} opacity="0.9"/>
          <ellipse cx="27" cy="3" rx="10" ry="4" fill={color}/>
          <polygon points="39,8 51,8 49,60 41,60" fill={color} opacity="0.6"/>
          <ellipse cx="45" cy="8" rx="6" ry="3" fill={color} opacity="0.9"/>
          {/* Membrane textures */}
          <ellipse cx="27" cy="3" rx="7" ry="2.5" fill="rgba(255,255,255,0.22)"/>
          <ellipse cx="9" cy="8" rx="4" ry="1.8" fill="rgba(255,255,255,0.2)"/>
          <ellipse cx="45" cy="8" rx="4" ry="1.8" fill="rgba(255,255,255,0.2)"/>
          {/* 3D shading */}
          <polygon points="17,3 37,3 35,67 19,67" fill="url(#dg-conical)" opacity="0.5"/>
        </svg>
      );
    case 'gourd':
      return (
        <svg width="54" height="70" viewBox="0 0 54 70" fill="none">
          <defs>
            <linearGradient id={`dg-gourd`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="white" stopOpacity="0.15"/>
              <stop offset="100%" stopColor="black" stopOpacity="0.25"/>
            </linearGradient>
          </defs>
          {/* Shadow */}
          <ellipse cx="27" cy="68" rx="22" ry="4" fill="rgba(0,0,0,0.4)"/>
          <circle cx="27" cy="43" r="24" fill={color} opacity="0.8"/>
          <circle cx="27" cy="15" r="11" fill={color} opacity="0.75"/>
          <rect x="25" y="26" width="4" height="8" fill={color} opacity="0.6"/>
          {[0,1,2,3,4].map(i => <circle key={i} cx={15+i*6} cy={38} r="2.2" fill="rgba(255,255,255,0.55)"/>)}
          {[0,1,2,3,4].map(i => <circle key={i} cx={15+i*6} cy={48} r="1.8" fill="rgba(255,255,255,0.4)"/>)}
          {[0,1,2,3].map(i => <circle key={i} cx={18+i*6} cy={58} r="1.6" fill="rgba(255,255,255,0.3)"/>)}
          {/* Membrane texture on top of gourd */}
          <circle cx="27" cy="15" r="7" fill="rgba(255,255,255,0.18)"/>
          {/* 3D shading */}
          <circle cx="27" cy="43" r="24" fill="url(#dg-gourd)" opacity="0.45"/>
        </svg>
      );
    case 'bell':
      return (
        <svg width="54" height="70" viewBox="0 0 54 70" fill="none">
          <defs>
            <linearGradient id={`dg-bell`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="white" stopOpacity="0.15"/>
              <stop offset="100%" stopColor="black" stopOpacity="0.25"/>
            </linearGradient>
          </defs>
          {/* Shadow */}
          <ellipse cx="27" cy="67" rx="16" ry="3.5" fill="rgba(0,0,0,0.4)"/>
          <path d="M10 8 Q28 22 27 42 Q26 60 14 64 Q5 60 7 40 Q9 20 10 8Z" fill={color} opacity="0.85"/>
          <path d="M44 8 Q26 22 27 42 Q28 60 40 64 Q49 60 47 40 Q45 20 44 8Z" fill={color} opacity="0.75"/>
          <line x1="10" y1="8" x2="44" y2="8" stroke={color} strokeWidth="4.5" strokeLinecap="round"/>
          <line x1="27" y1="3" x2="27" y2="10" stroke={color} strokeWidth="4.5" strokeLinecap="round"/>
          <circle cx="14" cy="64" r="3.5" fill={color} opacity="0.9"/>
          <circle cx="40" cy="64" r="3.5" fill={color} opacity="0.9"/>
          {/* 3D shading */}
          <path d="M10 8 Q28 22 27 42 Q26 60 14 64 Q5 60 7 40 Q9 20 10 8Z" fill="url(#dg-bell)" opacity="0.5"/>
        </svg>
      );
    case 'small-round':
      return (
        <svg width="54" height="70" viewBox="0 0 54 70" fill="none">
          <defs>
            <linearGradient id={`dg-small-round`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="white" stopOpacity="0.15"/>
              <stop offset="100%" stopColor="black" stopOpacity="0.25"/>
            </linearGradient>
          </defs>
          {/* Shadow */}
          <ellipse cx="27" cy="68" rx="20" ry="3.5" fill="rgba(0,0,0,0.4)"/>
          <ellipse cx="27" cy="32" rx="21" ry="15" fill={color} opacity="0.85"/>
          <rect x="6" y="32" width="42" height="18" fill={color} opacity="0.75"/>
          <ellipse cx="27" cy="50" rx="21" ry="8" fill={color} opacity="0.9"/>
          <line x1="27" y1="58" x2="27" y2="67" stroke={color} strokeWidth="4.5" strokeLinecap="round"/>
          {/* Membrane texture */}
          <ellipse cx="27" cy="32" rx="14" ry="8" fill="rgba(255,255,255,0.18)"/>
          {/* Tension strings */}
          {[0,1,2,3,4,5].map(i => <line key={i} x1={9+i*6} y1="32" x2={9+i*6} y2="50" stroke="rgba(255,255,255,0.1)" strokeWidth="0.9"/>)}
          {/* 3D shading */}
          <rect x="6" y="32" width="42" height="18" fill="url(#dg-small-round)" opacity="0.45"/>
        </svg>
      );
    case 'cylinder':
      return (
        <svg width="54" height="70" viewBox="0 0 54 70" fill="none">
          <defs>
            <linearGradient id={`dg-cylinder`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="white" stopOpacity="0.15"/>
              <stop offset="100%" stopColor="black" stopOpacity="0.25"/>
            </linearGradient>
          </defs>
          {/* Shadow */}
          <ellipse cx="27" cy="67" rx="22" ry="4" fill="rgba(0,0,0,0.4)"/>
          <ellipse cx="27" cy="15" rx="23" ry="9" fill={color} opacity="0.45"/>
          <rect x="4" y="15" width="46" height="44" fill={color} opacity="0.8"/>
          <ellipse cx="27" cy="59" rx="23" ry="9" fill={color} opacity="0.95"/>
          {/* Membrane texture */}
          <ellipse cx="27" cy="15" rx="15" ry="5" fill="rgba(255,255,255,0.2)"/>
          {[25,37,49].map((y,i) => <line key={i} x1="4" y1={y} x2="50" y2={y} stroke="rgba(255,255,255,0.1)" strokeWidth="1.5"/>)}
          {/* Tension strings */}
          {[0,1,2,3,4,5].map(i => <line key={i} x1={9+i*6} y1="15" x2={9+i*6} y2="59" stroke="rgba(255,255,255,0.09)" strokeWidth="0.9"/>)}
          {/* 3D shading */}
          <rect x="4" y="15" width="46" height="44" fill="url(#dg-cylinder)" opacity="0.45"/>
        </svg>
      );
    case 'igbin':
      return (
        <svg width="54" height="70" viewBox="0 0 54 70" fill="none">
          <defs>
            <linearGradient id={`dg-igbin`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="white" stopOpacity="0.15"/>
              <stop offset="100%" stopColor="black" stopOpacity="0.25"/>
            </linearGradient>
          </defs>
          {/* Shadow */}
          <ellipse cx="27" cy="68" rx="20" ry="3.5" fill="rgba(0,0,0,0.35)"/>
          <ellipse cx="27" cy="44" rx="22" ry="22" fill={color} opacity="0.18"/>
          <path d="M27 18 Q44 18 46 36 Q48 54 33 60 Q18 64 13 50 Q8 36 18 30 Q25 26 28 34 Q32 42 26 44"
            stroke={color} strokeWidth="5.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="27" cy="18" r="5.5" fill={color} opacity="0.9"/>
          {/* Membrane texture */}
          <circle cx="27" cy="18" r="3" fill="rgba(255,255,255,0.25)"/>
          {/* 3D shading overlay on main body */}
          <ellipse cx="27" cy="44" rx="22" ry="22" fill="url(#dg-igbin)" opacity="0.3"/>
        </svg>
      );
    case 'tapered':
      return (
        <svg width="54" height="70" viewBox="0 0 54 70" fill="none">
          <defs>
            <linearGradient id={`dg-tapered`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="white" stopOpacity="0.15"/>
              <stop offset="100%" stopColor="black" stopOpacity="0.25"/>
            </linearGradient>
          </defs>
          {/* Shadow */}
          <ellipse cx="27" cy="67" rx="13" ry="3.5" fill="rgba(0,0,0,0.4)"/>
          <polygon points="10,6 44,6 38,64 16,64" fill={color} opacity="0.8"/>
          <ellipse cx="27" cy="6" rx="17" ry="6" fill={color} opacity="0.9"/>
          <ellipse cx="27" cy="64" rx="11" ry="5" fill={color} opacity="0.6"/>
          {/* Membrane texture */}
          <ellipse cx="27" cy="6" rx="11" ry="3.5" fill="rgba(255,255,255,0.2)"/>
          <line x1="10" y1="24" x2="44" y2="24" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5"/>
          <line x1="13" y1="42" x2="41" y2="42" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5"/>
          {/* Tension strings */}
          {[0,1,2,3,4,5].map(i => <line key={i} x1={12+i*5} y1="6" x2={18+i*4} y2="64" stroke="rgba(255,255,255,0.1)" strokeWidth="0.9"/>)}
          {/* 3D shading */}
          <polygon points="10,6 44,6 38,64 16,64" fill="url(#dg-tapered)" opacity="0.45"/>
        </svg>
      );
    case 'large-barrel':
      return (
        <svg width="54" height="70" viewBox="0 0 54 70" fill="none">
          <defs>
            <linearGradient id={`dg-large-barrel`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="white" stopOpacity="0.15"/>
              <stop offset="100%" stopColor="black" stopOpacity="0.25"/>
            </linearGradient>
          </defs>
          {/* Shadow */}
          <ellipse cx="27" cy="69" rx="24" ry="4" fill="rgba(0,0,0,0.45)"/>
          <ellipse cx="27" cy="12" rx="24" ry="9" fill={color} opacity="0.5"/>
          <rect x="3" y="12" width="48" height="50" fill={color} opacity="0.8"/>
          <ellipse cx="27" cy="62" rx="24" ry="9" fill={color} opacity="0.95"/>
          {/* Membrane texture */}
          <ellipse cx="27" cy="12" rx="16" ry="5" fill="rgba(255,255,255,0.2)"/>
          {[20,30,40,50].map((y,i) => <line key={i} x1="3" y1={y} x2="51" y2={y} stroke={color} strokeWidth="2" opacity="0.2"/>)}
          {/* Rope tension lines */}
          <line x1="12" y1="12" x2="12" y2="62" stroke="rgba(255,255,255,0.15)" strokeWidth="2" strokeDasharray="4,3"/>
          <line x1="42" y1="12" x2="42" y2="62" stroke="rgba(255,255,255,0.15)" strokeWidth="2" strokeDasharray="4,3"/>
          {/* Extra tension zigzags */}
          {[0,1,2,3,4,5].map(i => <line key={i} x1={8+i*7} y1="12" x2={11+i*7} y2="37" stroke="rgba(255,255,255,0.12)" strokeWidth="0.9"/>)}
          {[0,1,2,3,4,5].map(i => <line key={i} x1={11+i*7} y1="37" x2={8+i*7} y2="62" stroke="rgba(255,255,255,0.12)" strokeWidth="0.9"/>)}
          {/* 3D shading */}
          <rect x="3" y="12" width="48" height="50" fill="url(#dg-large-barrel)" opacity="0.45"/>
        </svg>
      );
    default:
      return <div style={{ width:54, height:70, background:color, borderRadius:10, opacity:0.8 }} />;
  }
}

// ─── DRUM CARD ────────────────────────────────────────────────────────────────

function DrumCard({ drum, audio }) {
  const [beating, setBeating] = useState(false);
  const [ripples, setRipples] = useState([]);
  const [open, setOpen] = useState(false);

  function beat(variant = 0) {
    audio.play(drum.sound, variant);
    setBeating(true);
    const id = Date.now() + Math.random();
    setRipples(r => [...r, id]);
    setTimeout(() => setBeating(false), 380);
    setTimeout(() => setRipples(r => r.filter(x => x !== id)), 900);
  }

  return (
    <div className={`drum-card${beating ? ' drum-card--beating' : ''}`}
      style={{ '--dc': drum.color, '--dg': drum.glow }}>

      <div className="drum-card__top">
        <div className="drum-card__orisa">{drum.orisa}</div>
        <button className="drum-card__info" onClick={() => setOpen(o => !o)} title="Drum history & fact">
          {open ? '✕' : 'ℹ'}
        </button>
      </div>

      <button className="drum-card__icon" onClick={() => beat(0)} title={`Beat the ${drum.name}`}>
        <DrumIcon shape={drum.shape} color={drum.color} />
        {ripples.map(id => <span key={id} className="drum-ripple" />)}
      </button>

      <div className="drum-card__body">
        <div className="drum-card__name">{drum.name}</div>
        <div className="drum-card__eng">{drum.english}</div>
        <p className="drum-card__desc">{drum.desc}</p>
      </div>

      {open && (
        <div className="drum-card__fact">
          <span className="drum-card__fact-label">◆ Did you know?</span>
          <p>{drum.fact}</p>
          <div className="drum-card__phrase">{drum.phrase}</div>
        </div>
      )}

      <div className="drum-card__beats">
        <button className="dbeat-btn dbeat-btn--hi" onClick={() => beat(0)}>
          <span>◆</span> High
        </button>
        <button className="dbeat-btn dbeat-btn--lo" onClick={() => beat(1)}>
          <span>◇</span> Low
        </button>
      </div>
    </div>
  );
}

// ─── DRUM STATIONS SECTION ────────────────────────────────────────────────────

function DrumStations({ audio }) {
  return (
    <section className="ilu-section" id="drums">
      <div className="ilu-container">
        <div className="ilu-section-hd">
          <span className="ilu-eyebrow">The Drums of Ìlúùlù</span>
          <h2 className="ilu-section-title">Àwọn Ìlù Ìlú</h2>
          <p className="ilu-section-sub">
            Ìlù Ìlú (City Drum) is Dual of Ìlú Ìlù (Drum City). 16 sacred drums — each a voice, each with its own Orisa connection.
            Click the drum face or press High ◆ / Low ◇ to hear them speak.
            Press <strong>ℹ</strong> to discover each drum's sacred history.
          </p>
        </div>
        <div className="drum-grid">
          {DRUMS.map(d => <DrumCard key={d.id} drum={d} audio={audio} />)}
        </div>
      </div>
    </section>
  );
}

// ─── CHARACTER FIGURE ─────────────────────────────────────────────────────────

function CharBody({ char, isActive }) {
  switch (char.id) {

    case 'agba': return (
      <g>
        {/* Shadow */}
        <ellipse cx="25" cy="92" rx="18" ry="3.5" fill="rgba(0,0,0,0.45)"/>
        {/* Sandals */}
        <ellipse cx="16" cy="89" rx="6" ry="2.2" fill="#5c3310"/>
        <ellipse cx="34" cy="89" rx="6" ry="2.2" fill="#5c3310"/>
        {/* Trousers */}
        <path d="M17,68 L13,88 L19,88 L25,74 L31,88 L37,88 L33,68 Z" fill="#d4cfc0"/>
        {/* Wide Agbada */}
        <path d="M5,33 Q2,52 4,66 Q12,70 25,70 Q38,70 46,66 Q48,52 45,33 Z" fill="#f9f3e8"/>
        {/* Left sleeve */}
        <path d="M5,33 Q0,42 3,52 Q8,56 14,50 Q10,44 8,36 Z" fill="#f9f3e8"/>
        {/* Right sleeve */}
        <path d="M45,33 Q50,42 47,52 Q42,56 36,50 Q40,44 42,36 Z" fill="#f9f3e8"/>
        {/* Orange collar embroidery */}
        <path d="M18,33 Q25,38 32,33" stroke="#f97316" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
        <path d="M20,36 Q25,40 30,36" stroke="#f97316" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
        {/* Left hand */}
        <ellipse cx="4" cy="53" rx="3" ry="2.2" fill="#6b3320"/>
        {/* Right hand */}
        <ellipse cx="46" cy="53" rx="3" ry="2.2" fill="#6b3320"/>
        {/* Neck */}
        <rect x="22" y="27" width="6" height="6" rx="2" fill="#6b3320"/>
        {/* Head */}
        <ellipse cx="25" cy="15" rx="11" ry="12" fill="#6b3320"/>
        {/* Grey beard */}
        <path d="M16,20 Q14,28 18,32 Q22,36 25,35 Q28,36 32,32 Q36,28 34,20" fill="#b0aaa5" opacity="0.85"/>
        {/* White Fila cap */}
        <ellipse cx="25" cy="8" rx="11" ry="5" fill="#f9f3e8"/>
        <rect x="14" y="4" width="22" height="7" rx="3" fill="#f9f3e8"/>
        {/* Eyebrows */}
        <path d="M19,13 Q21,11.5 23,13" stroke="#3a1a08" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
        <path d="M27,13 Q29,11.5 31,13" stroke="#3a1a08" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
        {/* Eyes */}
        <ellipse cx="21" cy="15" rx="2.2" ry="2" fill="#1a0800"/>
        <circle cx="22" cy="14.2" r="0.7" fill="rgba(255,255,255,0.7)"/>
        <ellipse cx="29" cy="15" rx="2.2" ry="2" fill="#1a0800"/>
        <circle cx="30" cy="14.2" r="0.7" fill="rgba(255,255,255,0.7)"/>
        {/* Nose */}
        <path d="M24,17 Q25,19 26,17" stroke="#3a1a08" strokeWidth="0.9" fill="none"/>
        {/* Mouth / smile */}
        <path d="M21,22 Q25,25 29,22" stroke="#3a1a08" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
        {/* Accessory: walking staff */}
        <line x1="46" y1="52" x2="48" y2="88" stroke="#7a5230" strokeWidth="2.5" strokeLinecap="round"/>
        <circle cx="47" cy="52" r="3" fill="#c8a430"/>
        {/* Active glow */}
        {isActive && <ellipse cx="25" cy="15" rx="15" ry="16" fill="none" stroke={char.color} strokeWidth="2" opacity="0.5"/>}
      </g>
    );

    case 'iya': return (
      <g>
        {/* Shadow */}
        <ellipse cx="25" cy="92" rx="18" ry="3.5" fill="rgba(0,0,0,0.45)"/>
        {/* Sandals */}
        <ellipse cx="17" cy="89" rx="6" ry="2.2" fill="#8b5a28"/>
        <ellipse cx="33" cy="89" rx="6" ry="2.2" fill="#8b5a28"/>
        {/* Iro skirt — wide trapezoid */}
        <path d="M12,52 L8,88 L42,88 L38,52 Z" fill="#e879a0"/>
        {/* White Buba blouse */}
        <path d="M13,33 Q10,45 12,52 L38,52 Q40,45 37,33 Z" fill="#f9f9f9"/>
        {/* Left arm */}
        <path d="M13,35 Q6,44 5,54" stroke="#7b4528" strokeWidth="5" fill="none" strokeLinecap="round"/>
        {/* Right arm */}
        <path d="M37,35 Q44,44 45,54" stroke="#7b4528" strokeWidth="5" fill="none" strokeLinecap="round"/>
        {/* Left hand */}
        <ellipse cx="5" cy="55" rx="3" ry="2.5" fill="#7b4528"/>
        {/* Right hand holding Sekere */}
        <ellipse cx="45" cy="55" rx="3" ry="2.5" fill="#7b4528"/>
        {/* Sekere rattle */}
        <ellipse cx="46" cy="62" rx="5" ry="7" fill="#eab308" opacity="0.9"/>
        <circle cx="43" cy="58" r="1.2" fill="rgba(255,255,255,0.7)"/>
        <circle cx="49" cy="60" r="1.0" fill="rgba(255,255,255,0.7)"/>
        <circle cx="44" cy="65" r="1.1" fill="rgba(255,255,255,0.7)"/>
        <circle cx="48" cy="67" r="1.0" fill="rgba(255,255,255,0.7)"/>
        {/* Gold bead necklace */}
        {[0,1,2,3,4,5,6,7].map(i => (
          <circle key={i} cx={17 + i*1.8} cy={33} r="1.4" fill="#c8a430"/>
        ))}
        {/* Neck */}
        <rect x="22" y="27" width="6" height="6" rx="2" fill="#7b4528"/>
        {/* Head */}
        <ellipse cx="25" cy="15" rx="11" ry="12" fill="#7b4528"/>
        {/* Large pink Gele headwrap */}
        <path d="M12,12 Q15,4 25,3 Q35,4 38,12 Q36,8 25,7 Q14,8 12,12 Z" fill="#e879a0"/>
        <path d="M12,12 Q10,16 13,18 Q18,6 25,5 Q32,6 37,18 Q40,16 38,12 Q35,4 25,3 Q15,4 12,12 Z" fill="#ec4899"/>
        {/* Gele tail/fold */}
        <path d="M37,10 Q44,6 46,12 Q42,14 38,12 Z" fill="#e879a0"/>
        {/* Pink eyeshadow */}
        <path d="M18,13 Q21,11 24,13" stroke="#e879a0" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
        <path d="M26,13 Q29,11 32,13" stroke="#e879a0" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
        {/* Eyebrows */}
        <path d="M19,12 Q21,10.5 23,12" stroke="#3a1a08" strokeWidth="1" fill="none" strokeLinecap="round"/>
        <path d="M27,12 Q29,10.5 31,12" stroke="#3a1a08" strokeWidth="1" fill="none" strokeLinecap="round"/>
        {/* Eyes */}
        <ellipse cx="21" cy="15" rx="2.2" ry="2" fill="#1a0800"/>
        <circle cx="22" cy="14.2" r="0.7" fill="rgba(255,255,255,0.7)"/>
        <ellipse cx="29" cy="15" rx="2.2" ry="2" fill="#1a0800"/>
        <circle cx="30" cy="14.2" r="0.7" fill="rgba(255,255,255,0.7)"/>
        {/* Nose */}
        <path d="M24,17 Q25,19 26,17" stroke="#5a2810" strokeWidth="0.9" fill="none"/>
        {/* Smile */}
        <path d="M21,21 Q25,24.5 29,21" stroke="#5a2810" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
        {/* Active glow */}
        {isActive && <ellipse cx="25" cy="15" rx="15" ry="16" fill="none" stroke={char.color} strokeWidth="2" opacity="0.5"/>}
      </g>
    );

    case 'omo': return (
      <g>
        {/* Shadow */}
        <ellipse cx="25" cy="92" rx="17" ry="3.5" fill="rgba(0,0,0,0.4)"/>
        {/* Feet */}
        <ellipse cx="17" cy="89" rx="5.5" ry="2.2" fill="#6b3d18"/>
        <ellipse cx="33" cy="89" rx="5.5" ry="2.2" fill="#6b3d18"/>
        {/* Green Sokoto trousers */}
        <path d="M16,62 L12,88 L22,88 L25,72 L28,88 L38,88 L34,62 Z" fill="#16a34a"/>
        {/* Green Buba torso */}
        <path d="M14,33 Q11,46 16,62 L34,62 Q39,46 36,33 Z" fill="#22c55e"/>
        {/* Left arm — down */}
        <path d="M14,36 Q8,46 7,58" stroke="#8b5a30" strokeWidth="5" fill="none" strokeLinecap="round"/>
        {/* Right arm — raised/eager */}
        <path d="M36,36 Q44,26 46,18" stroke="#8b5a30" strokeWidth="5" fill="none" strokeLinecap="round"/>
        {/* Left hand */}
        <ellipse cx="7" cy="59" rx="3" ry="2.5" fill="#8b5a30"/>
        {/* Right hand */}
        <ellipse cx="46" cy="18" rx="3" ry="2.5" fill="#8b5a30"/>
        {/* Neck */}
        <rect x="22" y="27" width="6" height="6" rx="2" fill="#8b5a30"/>
        {/* Head */}
        <ellipse cx="25" cy="15" rx="11" ry="12" fill="#8b5a30"/>
        {/* Natural Afro */}
        <ellipse cx="25" cy="10" rx="14" ry="11" fill="#1a0c04"/>
        <ellipse cx="15" cy="13" rx="7" ry="8" fill="#1a0c04"/>
        <ellipse cx="35" cy="13" rx="7" ry="8" fill="#1a0c04"/>
        <ellipse cx="25" cy="5" rx="10" ry="7" fill="#221004"/>
        {/* Eyebrows */}
        <path d="M19,13 Q21,11.5 23,13" stroke="#1a0800" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
        <path d="M27,13 Q29,11.5 31,13" stroke="#1a0800" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
        {/* Eyes */}
        <ellipse cx="21" cy="15.5" rx="2.2" ry="2" fill="#1a0800"/>
        <circle cx="22" cy="14.7" r="0.7" fill="rgba(255,255,255,0.75)"/>
        <ellipse cx="29" cy="15.5" rx="2.2" ry="2" fill="#1a0800"/>
        <circle cx="30" cy="14.7" r="0.7" fill="rgba(255,255,255,0.75)"/>
        {/* Nose */}
        <path d="M24,17 Q25,19.5 26,17" stroke="#4a2410" strokeWidth="0.9" fill="none"/>
        {/* Big smile with tooth hint */}
        <path d="M19,21 Q25,27 31,21" stroke="#4a2410" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
        <path d="M22,22.5 Q25,25 28,22.5" fill="rgba(255,255,255,0.6)" stroke="none"/>
        {/* Active glow */}
        {isActive && <ellipse cx="25" cy="15" rx="15" ry="16" fill="none" stroke={char.color} strokeWidth="2" opacity="0.5"/>}
      </g>
    );

    case 'egun': return (
      <g>
        {/* Shadow — ethereal/faint */}
        <ellipse cx="25" cy="92" rx="18" ry="3" fill="rgba(99,102,241,0.3)"/>
        {/* Layered cloth bands — bottom dark */}
        <path d="M8,68 Q10,75 12,88 L38,88 Q40,75 42,68 Z" fill="#1e1b4b"/>
        {/* Hanging cloth strands at waist */}
        {[0,1,2,3,4,5,6,7].map(i => (
          <line key={i} x1={11+i*4} y1="68" x2={10+i*4} y2="78" stroke="#312e81" strokeWidth="1.8" strokeLinecap="round"/>
        ))}
        {/* Mid layer */}
        <path d="M10,50 Q8,60 8,68 L42,68 Q42,60 40,50 Z" fill="#3730a3"/>
        {/* Top cloth layer */}
        <path d="M12,33 Q8,42 10,50 L40,50 Q42,42 38,33 Z" fill="#4f46e5"/>
        {/* Floating spirit hands */}
        <ellipse cx="4" cy="50" rx="4" ry="3" fill="#6366f1" opacity="0.6"/>
        <ellipse cx="46" cy="50" rx="4" ry="3" fill="#6366f1" opacity="0.6"/>
        <path d="M1,48 Q3,44 7,48" stroke="#818cf8" strokeWidth="1" fill="none" strokeLinecap="round"/>
        <path d="M43,48 Q47,44 49,48" stroke="#818cf8" strokeWidth="1" fill="none" strokeLinecap="round"/>
        {/* Neck — hidden under mask */}
        <rect x="22" y="27" width="6" height="6" rx="2" fill="#312e81"/>
        {/* Masquerade mask head — NO visible skin */}
        <ellipse cx="25" cy="15" rx="12" ry="13" fill="#1e1b4b"/>
        {/* Crown spikes */}
        {[0,1,2,3,4,5,6].map(i => (
          <polygon key={i}
            points={`${13+i*4},8 ${15+i*4},0 ${17+i*4},8`}
            fill={i%2===0 ? '#4f46e5' : '#7c3aed'}/>
        ))}
        {/* Mask face — glowing slit eyes only */}
        <ellipse cx="20" cy="16" rx="3.5" ry="1.5" fill="#0d0b2a"/>
        <ellipse cx="20" cy="16" rx="2.5" ry="0.9" fill="#6366f1" opacity="0.7"/>
        <ellipse cx="30" cy="16" rx="3.5" ry="1.5" fill="#0d0b2a"/>
        <ellipse cx="30" cy="16" rx="2.5" ry="0.9" fill="#6366f1" opacity="0.7"/>
        {/* Active glow */}
        {isActive && <ellipse cx="25" cy="15" rx="16" ry="17" fill="none" stroke={char.color} strokeWidth="2" opacity="0.55"/>}
      </g>
    );

    case 'sango': return (
      <g>
        {/* Shadow */}
        <ellipse cx="25" cy="92" rx="20" ry="3.5" fill="rgba(0,0,0,0.55)"/>
        {/* Sandals */}
        <ellipse cx="15" cy="89" rx="7" ry="2.5" fill="#3d1a08"/>
        <ellipse cx="35" cy="89" rx="7" ry="2.5" fill="#3d1a08"/>
        {/* Trousers */}
        <path d="M15,65 L10,88 L20,88 L25,73 L30,88 L40,88 L35,65 Z" fill="#7f1d1d"/>
        {/* Wide warrior tunic */}
        <path d="M6,30 Q3,48 6,65 L44,65 Q47,48 44,30 Z" fill="#dc2626"/>
        {/* Ose Sango axe on chest — gold */}
        <line x1="25" y1="33" x2="25" y2="62" stroke="#c8a430" strokeWidth="2.5"/>
        <path d="M20,38 Q16,43 20,48 Q25,44 25,43 Z" fill="#c8a430"/>
        <path d="M30,38 Q34,43 30,48 Q25,44 25,43 Z" fill="#c8a430"/>
        {/* Wide powerful left arm */}
        <path d="M6,32 Q-1,44 2,57" stroke="#3d1a08" strokeWidth="7" fill="none" strokeLinecap="round"/>
        {/* Wide powerful right arm */}
        <path d="M44,32 Q51,44 48,57" stroke="#3d1a08" strokeWidth="7" fill="none" strokeLinecap="round"/>
        {/* Hands */}
        <ellipse cx="2" cy="58" rx="4" ry="3" fill="#3d1a08"/>
        <ellipse cx="48" cy="58" rx="4" ry="3" fill="#3d1a08"/>
        {/* Gold bead necklace */}
        {[0,1,2,3,4,5,6,7,8].map(i => (
          <circle key={i} cx={16 + i*1.7} cy={31} r="1.5" fill="#c8a430"/>
        ))}
        {/* Neck */}
        <rect x="22" y="26" width="6" height="5" rx="2" fill="#3d1a08"/>
        {/* Head — very dark */}
        <ellipse cx="25" cy="14" rx="11" ry="12" fill="#3d1a08"/>
        {/* Royal Ade crown — red trapezoid base */}
        <path d="M13,10 L14,4 L36,4 L37,10 Z" fill="#dc2626"/>
        {/* Crown points */}
        {[0,1,2,3,4].map(i => (
          <polygon key={i} points={`${15+i*5},10 ${17+i*5},1 ${20+i*5},10`} fill="#dc2626"/>
        ))}
        {/* Crown gems */}
        <circle cx="18" cy="7" r="2" fill="#c8a430"/>
        <circle cx="25" cy="6" r="2" fill="#c8a430"/>
        <circle cx="32" cy="7" r="2" fill="#c8a430"/>
        {/* Strong eyebrows */}
        <path d="M18,13 Q21,10.5 24,13" stroke="#1a0800" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
        <path d="M26,13 Q29,10.5 32,13" stroke="#1a0800" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
        {/* Eyes — intense */}
        <ellipse cx="21" cy="15.5" rx="2.4" ry="2.2" fill="#0d0400"/>
        <circle cx="22" cy="14.5" r="0.8" fill="rgba(255,255,255,0.6)"/>
        <ellipse cx="29" cy="15.5" rx="2.4" ry="2.2" fill="#0d0400"/>
        <circle cx="30" cy="14.5" r="0.8" fill="rgba(255,255,255,0.6)"/>
        {/* Nose */}
        <path d="M23,17 Q25,20 27,17" stroke="#1a0800" strokeWidth="1.1" fill="none"/>
        {/* Firm mouth */}
        <path d="M20,22 Q25,24 30,22" stroke="#1a0800" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        {/* Active glow */}
        {isActive && <ellipse cx="25" cy="14" rx="15" ry="16" fill="none" stroke={char.color} strokeWidth="2.2" opacity="0.55"/>}
      </g>
    );

    case 'itan': return (
      <g>
        {/* Shadow */}
        <ellipse cx="25" cy="92" rx="17" ry="3.5" fill="rgba(0,0,0,0.4)"/>
        {/* Sandals */}
        <ellipse cx="17" cy="89" rx="5.5" ry="2.2" fill="#1e3a5f"/>
        <ellipse cx="33" cy="89" rx="5.5" ry="2.2" fill="#1e3a5f"/>
        {/* Blue Sokoto */}
        <path d="M16,62 L12,88 L22,88 L25,73 L28,88 L38,88 L34,62 Z" fill="#1d4ed8"/>
        {/* Blue Buba tunic */}
        <path d="M14,33 Q11,47 16,62 L34,62 Q39,47 36,33 Z" fill="#2563eb"/>
        {/* Left arm holding scroll */}
        <path d="M14,36 Q7,46 6,58" stroke="#7b4528" strokeWidth="5" fill="none" strokeLinecap="round"/>
        {/* Right arm raised/gesturing */}
        <path d="M36,36 Q44,28 45,20" stroke="#7b4528" strokeWidth="5" fill="none" strokeLinecap="round"/>
        {/* Left hand */}
        <ellipse cx="6" cy="59" rx="3" ry="2.5" fill="#7b4528"/>
        {/* Scroll in left hand */}
        <rect x="1" y="62" width="12" height="10" rx="1" fill="#f9f3e8"/>
        <line x1="3" y1="65" x2="11" y2="65" stroke="#a89060" strokeWidth="0.8"/>
        <line x1="3" y1="67" x2="11" y2="67" stroke="#a89060" strokeWidth="0.8"/>
        <line x1="3" y1="69" x2="11" y2="69" stroke="#a89060" strokeWidth="0.8"/>
        <ellipse cx="1" cy="67" rx="2" ry="5" fill="#c8b068"/>
        <ellipse cx="13" cy="67" rx="2" ry="5" fill="#c8b068"/>
        {/* Right hand */}
        <ellipse cx="45" cy="20" rx="3" ry="2.5" fill="#7b4528"/>
        {/* Neck */}
        <rect x="22" y="27" width="6" height="6" rx="2" fill="#7b4528"/>
        {/* Head */}
        <ellipse cx="25" cy="15" rx="11" ry="12" fill="#7b4528"/>
        {/* Blue scholar cap */}
        <ellipse cx="25" cy="8" rx="12" ry="5" fill="#1d4ed8"/>
        <rect x="13" y="5" width="24" height="6" rx="3" fill="#2563eb"/>
        {/* Gold tassel */}
        <line x1="35" y1="5" x2="38" y2="1" stroke="#c8a430" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="38" cy="1" r="2" fill="#c8a430"/>
        <line x1="38" y1="1" x2="40" y2="4" stroke="#c8a430" strokeWidth="0.9" strokeLinecap="round"/>
        <line x1="38" y1="1" x2="41" y2="2" stroke="#c8a430" strokeWidth="0.9" strokeLinecap="round"/>
        {/* Eyebrows */}
        <path d="M19,13 Q21,11.5 23,13" stroke="#3a1a08" strokeWidth="1.1" fill="none" strokeLinecap="round"/>
        <path d="M27,13 Q29,11.5 31,13" stroke="#3a1a08" strokeWidth="1.1" fill="none" strokeLinecap="round"/>
        {/* Eyes */}
        <ellipse cx="21" cy="15" rx="2.2" ry="2" fill="#1a0800"/>
        <circle cx="22" cy="14.2" r="0.7" fill="rgba(255,255,255,0.7)"/>
        <ellipse cx="29" cy="15" rx="2.2" ry="2" fill="#1a0800"/>
        <circle cx="30" cy="14.2" r="0.7" fill="rgba(255,255,255,0.7)"/>
        {/* Nose */}
        <path d="M24,17 Q25,19 26,17" stroke="#3a1a08" strokeWidth="0.9" fill="none"/>
        {/* Thoughtful slight smile */}
        <path d="M21,22 Q25,24.5 29,22" stroke="#3a1a08" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
        {/* Active glow */}
        {isActive && <ellipse cx="25" cy="15" rx="15" ry="16" fill="none" stroke={char.color} strokeWidth="2" opacity="0.5"/>}
      </g>
    );

    default: return <g/>;
  }
}

function CharFigure({ char, isActive, isAnimating, onClick }) {
  return (
    <button
      className={`ilu-char${isActive ? ' ilu-char--active' : ''}${isAnimating ? ` ilu-char--${char.dance}` : ''}`}
      style={{ '--cc': char.color }}
      onClick={onClick}
      title={`Talk to ${char.name}`}
    >
      <svg width="50" height="94" viewBox="0 0 50 94" className="ilu-char__svg">
        <CharBody char={char} isActive={isActive} />
      </svg>
      <div className="ilu-char__label">
        <div className="ilu-char__name">{char.name}</div>
        <div className="ilu-char__role">{char.role}</div>
      </div>
    </button>
  );
}

// ─── INHABITANTS SECTION ──────────────────────────────────────────────────────

function IluInhabitants({ audio }) {
  const [active, setActive] = useState(null);
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [animating, setAnimating] = useState(false);

  function selectChar(char) {
    if (active && active.id === char.id) {
      nextPhrase(char, phraseIdx);
    } else {
      setActive(char);
      setPhraseIdx(0);
      triggerSpeak(char, 0);
    }
  }

  function triggerSpeak(char, idx) {
    setAnimating(true);
    const drum = DRUMS.find(d => d.id === char.drums[0]);
    if (drum) {
      audio.play(drum.sound, 0);
      setTimeout(() => audio.play(drum.sound, 1), 220);
      setTimeout(() => audio.play(drum.sound, 0), 420);
    }
    setTimeout(() => setAnimating(false), 700);
  }

  function nextPhrase(char, idx) {
    const next = (idx + 1) % char.says.length;
    setPhraseIdx(next);
    triggerSpeak(char, next);
  }

  return (
    <section className="ilu-section ilu-section--dark" id="inhabitants">
      <div className="ilu-container">
        <div className="ilu-section-hd">
          <span className="ilu-eyebrow">The People of Ìlúùlù</span>
          <h2 className="ilu-section-title">Àwọn Ará Ìlú</h2>
          <p className="ilu-section-sub">
            Meet the inhabitants of the City of Drum. Click any character to hear them speak
            in <strong>Èdè Ìlú</strong> — the Drum Language. Click again for more of their wisdom.
          </p>
        </div>

        {/* City ground line with characters */}
        <div className="chars-scene">
          <div className="chars-ground" />
          <div className="chars-row">
            {CHARACTERS.map(char => (
              <CharFigure
                key={char.id}
                char={char}
                isActive={active?.id === char.id}
                isAnimating={animating && active?.id === char.id}
                onClick={() => selectChar(char)}
              />
            ))}
          </div>
        </div>

        {/* Speech panel */}
        {active ? (
          <div className="ilu-speech" style={{ '--cc': active.color }}>
            <div className="ilu-speech__hd">
              <div className="ilu-speech__avatar" style={{ background: active.color }}>
                {active.name.slice(0, 2)}
              </div>
              <div>
                <div className="ilu-speech__name">{active.name}</div>
                <div className="ilu-speech__role">{active.role}</div>
              </div>
              <div className="ilu-speech__drum-tags">
                {active.drums.map(id => {
                  const d = DRUMS.find(x => x.id === id);
                  return d ? (
                    <span key={id} className="ilu-speech__dtag" style={{ color: d.color, borderColor: d.glow }}>
                      {d.name}
                    </span>
                  ) : null;
                })}
              </div>
            </div>
            <div className="ilu-speech__bubble">
              <p className="ilu-speech__text">"{active.says[phraseIdx]}"</p>
            </div>
            <div className="ilu-speech__ft">
              <span className="ilu-speech__counter">{phraseIdx + 1} / {active.says.length}</span>
              <button className="ilu-btn ilu-btn--sm ilu-btn--color" style={{ '--bc': active.color }}
                onClick={() => nextPhrase(active, phraseIdx)}>
                Next ▶
              </button>
              <button className="ilu-btn ilu-btn--sm" onClick={() => setActive(null)}>Close</button>
            </div>
          </div>
        ) : (
          <div className="chars-prompt">
            ↑ Click any inhabitant above to hear them speak in the Drum Language
          </div>
        )}
      </div>
    </section>
  );
}

// ─── DRUM PAD ─────────────────────────────────────────────────────────────────

const STEPS = 16;

function DrumPad({ audio }) {
  const [grid, setGrid] = useState(() => PAD_ROWS.map(() => Array(STEPS).fill(false)));
  const [playing, setPlaying] = useState(false);
  const [step, setStep]       = useState(-1);
  const [bpm, setBpm]         = useState(110);
  const [activePreset, setActivePreset] = useState(null);

  const gridRef   = useRef(grid);
  const stepRef   = useRef(-1);
  const timerRef  = useRef(null);
  useEffect(() => { gridRef.current = grid; }, [grid]);

  function toggle(ri, si) {
    setGrid(g => { const n = g.map(r => [...r]); n[ri][si] = !n[ri][si]; return n; });
    setActivePreset(null);
  }

  function clearGrid() {
    setGrid(PAD_ROWS.map(() => Array(STEPS).fill(false)));
    setActivePreset(null);
  }

  function loadPreset(p, idx) {
    setGrid(PAD_ROWS.map((_, ri) => (p.pattern[ri] || Array(STEPS).fill(0)).map(v => !!v)));
    setActivePreset(idx);
  }

  useEffect(() => {
    if (playing) {
      const ms = (60 / bpm / 4) * 1000;
      timerRef.current = setInterval(() => {
        stepRef.current = (stepRef.current + 1) % STEPS;
        setStep(stepRef.current);
        gridRef.current.forEach((row, ri) => {
          if (row[stepRef.current]) audio.play(PAD_ROWS[ri].sound, ri % 2);
        });
      }, ms);
    } else {
      clearInterval(timerRef.current);
      setStep(-1);
      stepRef.current = -1;
    }
    return () => clearInterval(timerRef.current);
  }, [playing, bpm]);

  return (
    <section className="ilu-section" id="drum-pad">
      <div className="ilu-container">
        <div className="ilu-section-hd">
          <span className="ilu-eyebrow">Create Rhythms</span>
          <h2 className="ilu-section-title">Ìlù Pad — Drum Composer</h2>
          <p className="ilu-section-sub">
            Build your own Ìlú-Ìlù rhythm using the IluPad. Toggle any step on or off,
            set your BPM, and press Play. Or load a classic Yoruba rhythm pattern.
          </p>
        </div>

        {/* Presets */}
        <div className="dp-presets">
          {PRESET_RHYTHMS.map((p, i) => (
            <button key={i}
              className={`dp-preset${activePreset === i ? ' dp-preset--on' : ''}`}
              onClick={() => loadPreset(p, i)}>
              {p.name}
            </button>
          ))}
        </div>

        {/* Transport */}
        <div className="dp-transport">
          <button className={`dp-play${playing ? ' dp-play--stop' : ''}`} onClick={() => setPlaying(p => !p)}>
            {playing ? '⏹ Stop' : '▶ Play'}
          </button>
          <div className="dp-bpm-wrap">
            <span className="dp-bpm-label">BPM: <strong>{bpm}</strong></span>
            <input type="range" min="60" max="200" value={bpm} className="dp-slider"
              onChange={e => setBpm(+e.target.value)} />
          </div>
          <button className="dp-clear" onClick={clearGrid}>✕ Clear</button>
        </div>

        {/* Grid */}
        <div className="dp-grid">
          {PAD_ROWS.map((row, ri) => (
            <div key={row.id} className="dp-row">
              <div className="dp-row__label" style={{ color: row.color }}>{row.name}</div>
              <div className="dp-row__cells">
                {Array.from({ length: STEPS }, (_, si) => (
                  <button key={si}
                    className={`dp-cell
                      ${grid[ri][si]  ? ' dp-cell--on'    : ''}
                      ${step === si   ? ' dp-cell--play'  : ''}
                      ${si % 4 === 0  ? ' dp-cell--beat'  : ''}
                    `}
                    style={{ '--rc': row.color }}
                    onClick={() => toggle(ri, si)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Beat markers */}
        <div className="dp-beat-markers">
          {[1,2,3,4].map(b => <div key={b} className="dp-beat-marker">{b}</div>)}
        </div>
      </div>
    </section>
  );
}

// ─── ILU LANGUAGE PANEL ───────────────────────────────────────────────────────

function IluLangPanel({ audio }) {
  function playPhrase(phrase) {
    const tones = phrase.drum.replace(/[^◆◇]/g, '').split('');
    tones.forEach((t, i) => {
      setTimeout(() => audio.play('talking', t === '◆' ? 0 : 1), i * 270);
    });
  }

  return (
    <section className="ilu-section ilu-section--dark" id="ilu-lang">
      <div className="ilu-container">
        <div className="ilu-section-hd">
          <span className="ilu-eyebrow">The Language of Drums</span>
          <h2 className="ilu-section-title">Èdè Ìlù — Ìlù Language (IluLang)</h2>
          <p className="ilu-section-sub">
            The Gangan/Dùndún replicate the tonal patterns of Yoruba speech.
            <strong> ◆ = High tone</strong> · <strong>◇ = Low tone</strong> ·
            Press <strong>▶</strong> to hear any phrase played on the Gangan.
          </p>
        </div>
        <div className="lang-grid">
          {ILU_PHRASES.map((p, i) => (
            <div key={i} className="lang-card">
              <button className="lang-card__play" onClick={() => playPhrase(p)} title="Play on drum">▶</button>
              <div className="lang-card__yor">{p.yoruba}</div>
              <div className="lang-card__en">{p.english}</div>
              <div className="lang-card__drum">{p.drum}</div>
              <div className="lang-card__note">{p.meaning}</div>
            </div>
          ))}
        </div>
        <div className="lang-legend">
          <span><strong>◆</strong> High tone (gún)</span>
          <span>·</span>
          <span><strong>◇</strong> Low tone (gbà)</span>
          <span>·</span>
          <span><strong>·</strong> Pause / rest</span>
          <span>·</span>
          <span>Click <strong>▶</strong> to hear on the Gangan</span>
        </div>
      </div>
    </section>
  );
}

// ─── ODU MARKS ───────────────────────────────────────────────────────────────

function OduMarks({ marks, color, large, vertical, rtl }) {
  const cls = [
    'odu-marks',
    large    ? 'odu-marks--lg'   : '',
    vertical ? 'odu-marks--vert' : '',
    rtl      ? 'odu-marks--rtl'  : '',
  ].filter(Boolean).join(' ');
  return (
    <div className={cls}>
      {marks.map((m, i) => (
        <div key={i} className="odu-marks__col">
          {m === 1 ? (
            <div className="odu-mark odu-mark--single" style={{ background: color }}/>
          ) : (
            <>
              <div className="odu-mark odu-mark--pair" style={{ background: color }}/>
              <div className="odu-mark odu-mark--pair" style={{ background: color }}/>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── ODU DANCER ──────────────────────────────────────────────────────────────

function OduDancer({ odu }) {
  const c = odu.color;
  const pose = ['ogbe','otura','ose','obara'].includes(odu.id) ? 'wide' :
               ['okanran','ogunda','owonrin','osa'].includes(odu.id) ? 'raised' :
               ['iwori','odi','ika','ofun'].includes(odu.id) ? 'low' : 'neutral';
  const armL = { wide:'M39,72 Q22,48 10,30', raised:'M39,72 Q30,52 26,34', low:'M39,72 Q24,82 10,92', neutral:'M39,72 Q22,60 10,46' }[pose];
  const armR = { wide:'M61,72 Q78,48 90,30', raised:'M61,72 Q78,60 90,46', low:'M61,72 Q76,82 90,92', neutral:'M61,72 Q78,60 90,46' }[pose];
  const handLx = { wide:8, raised:24, low:8, neutral:8 }[pose];
  const handLy = { wide:28, raised:32, low:94, neutral:44 }[pose];
  const handRx = { wide:92, raised:92, low:92, neutral:92 }[pose];
  const handRy = { wide:28, raised:44, low:94, neutral:44 }[pose];
  return (
    <div className={`odu-stage-dancer dance-${odu.id}`} style={{ '--oc': c, '--og': odu.glow }}>
      <svg viewBox="0 0 100 190" className="odu-dancer-svg" aria-label={`${odu.yoruba} dancer`}>
        <defs>
          <radialGradient id={`rg-${odu.id}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={c} stopOpacity="0.22"/>
            <stop offset="100%" stopColor={c} stopOpacity="0"/>
          </radialGradient>
        </defs>
        {/* Aura */}
        <ellipse cx="50" cy="95" rx="52" ry="82" fill={`url(#rg-${odu.id})`}/>
        {/* Outer ring */}
        <circle cx="50" cy="90" r="55" stroke={c} strokeWidth="0.6" opacity="0.2" fill="none"/>
        {/* Ground shadow */}
        <ellipse cx="50" cy="180" rx="24" ry="6" fill="rgba(0,0,0,0.35)"/>
        {/* Left leg */}
        <path d="M44,122 Q38,145 30,172" stroke={c} strokeWidth="9" fill="none" strokeLinecap="round" opacity="0.88"/>
        {/* Right leg */}
        <path d="M56,122 Q62,145 70,172" stroke={c} strokeWidth="9" fill="none" strokeLinecap="round" opacity="0.88"/>
        {/* Torso */}
        <rect x="37" y="62" width="26" height="65" rx="11" fill={c} opacity="0.85"/>
        {/* Belt detail */}
        <rect x="37" y="108" width="26" height="5" rx="2" fill="rgba(255,255,255,0.15)"/>
        {/* Left arm */}
        <path d={armL} stroke={c} strokeWidth="8" fill="none" strokeLinecap="round" opacity="0.88"/>
        {/* Left hand */}
        <circle cx={handLx} cy={handLy} r="6.5" fill={c} opacity="0.82"/>
        {/* Right arm */}
        <path d={armR} stroke={c} strokeWidth="8" fill="none" strokeLinecap="round" opacity="0.88"/>
        {/* Right hand */}
        <circle cx={handRx} cy={handRy} r="6.5" fill={c} opacity="0.82"/>
        {/* Neck */}
        <rect x="44" y="52" width="12" height="14" rx="4" fill={c} opacity="0.88"/>
        {/* Head */}
        <circle cx="50" cy="35" r="20" fill={c} opacity="0.92"/>
        {/* Head highlight */}
        <circle cx="45" cy="30" r="9" fill="rgba(255,255,255,0.13)"/>
        {/* Eyes */}
        <circle cx="44" cy="32" r="3.2" fill="rgba(0,0,0,0.7)"/>
        <circle cx="56" cy="32" r="3.2" fill="rgba(0,0,0,0.7)"/>
        <circle cx="45.2" cy="30.8" r="1.3" fill="rgba(255,255,255,0.9)"/>
        <circle cx="57.2" cy="30.8" r="1.3" fill="rgba(255,255,255,0.9)"/>
        {/* Smile */}
        <path d="M44,40 Q50,44 56,40" stroke="rgba(0,0,0,0.55)" strokeWidth="1.6" fill="none" strokeLinecap="round"/>
        {/* Odu facial mark */}
        <path d="M35,32 Q32,28 35,24" stroke={c} strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.55"/>
        <path d="M65,32 Q68,28 65,24" stroke={c} strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.55"/>
      </svg>
    </div>
  );
}

// ─── ODU TILE ────────────────────────────────────────────────────────────────

function OduTile({ odu, isActive, onClick }) {
  const isOdd   = odu.num % 2 === 1;
  const danceLabel = odu.id.charAt(0).toUpperCase() + odu.id.slice(1) + (isOdd ? 'Column' : 'Row');
  const rtlMarks   = !isOdd && odu.num >= 6;
  return (
    <button
      className={`odu-tile${isActive ? ' odu-tile--active' : ''}`}
      style={{ '--oc': odu.color, '--og': odu.glow }}
      onClick={onClick}
      title={`${odu.yoruba} — ${odu.energy}`}
    >
      <div className="odu-tile__num">{odu.num}</div>
      <OduMarks marks={odu.marks} color={odu.color} vertical={isOdd} rtl={rtlMarks} />
      <div className="odu-tile__name">{odu.yoruba}</div>
      <div className="odu-tile__dance">{danceLabel}</div>
    </button>
  );
}

// ─── IFA DANCE SECTION ───────────────────────────────────────────────────────

function IfaDance({ audio }) {
  const [activeOdu, setActiveOdu] = useState(null);

  function selectOdu(odu) {
    setActiveOdu(odu);
    audio.playOdu(odu);
  }

  function navigate(dir) {
    if (!activeOdu) return;
    const idx = ODU_IFA.findIndex(o => o.id === activeOdu.id);
    selectOdu(ODU_IFA[(idx + dir + 16) % 16]);
  }

  return (
    <section className="ilu-section ilu-section--dark" id="ifa-dance">
      <div className="ilu-container">

        <div className="ilu-section-hd">
          <span className="ilu-eyebrow">The IfaDance</span>
          <h2 className="ilu-section-title">16 Odu · 16 Dances</h2>
          <p className="ilu-section-sub">
            Each of the 16 Odu Ifa, an IfaMatrix, produces a unique drum sound — each dancing its own unique
            creative expression, choreographed to the energy, field, and living essence of that Odu.
            Click any Odu to bring it into the spotlight and expore the 16 Ifa Matrices.
          </p>
        </div>

        {/* Performance Stage */}
        <div className={`odu-stage${activeOdu ? ' odu-stage--on' : ''}`}
          style={activeOdu ? { '--oc': activeOdu.color, '--og': activeOdu.glow } : undefined}>
          {activeOdu ? (
            <div className="odu-stage__layout">
              {/* Info */}
              <div className="odu-stage__info">
                <div className="odu-stage__badge">Odu {activeOdu.num} · of 16</div>
                <div className="odu-stage__yoruba">{activeOdu.yoruba}</div>
                <div className="odu-stage__energy">{activeOdu.energy}</div>
                <OduMarks marks={activeOdu.marks} color={activeOdu.color} large vertical={activeOdu.num % 2 === 1} rtl={activeOdu.num % 2 === 0 && activeOdu.num >= 6} />
                <p className="odu-stage__essence">{activeOdu.essence}</p>
                <button className="odu-replay-btn" onClick={() => audio.playOdu(activeOdu)}>
                  ▶ Replay Sound
                </button>
              </div>
              {/* Dancer */}
              <div className="odu-stage__center">
                <OduDancer odu={activeOdu} />
              </div>
              {/* Nav */}
              <div className="odu-stage__nav">
                <button className="odu-nav-btn" onClick={() => navigate(-1)}>◀ Prev</button>
                <button className="odu-nav-btn" onClick={() => navigate(1)}>Next ▶</button>
              </div>
            </div>
          ) : (
            <div className="odu-stage__prompt">
              ↓ Click any Odu below to enter its dance
            </div>
          )}
        </div>

        {/* Odu Grid 4×4 */}
        <div className="odu-grid">
          {ODU_IFA.map(odu => (
            <OduTile
              key={odu.id}
              odu={odu}
              isActive={activeOdu?.id === odu.id}
              onClick={() => selectOdu(odu)}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

// ─── ÀGBÁ ÌLÙ — GIANT DRUM ORISANIMATION ────────────────────────────────────

function AgbaIluAnim({ audio }) {
  const [beating,   setBeating]   = useState(false);
  const [ripples,   setRipples]   = useState([]);
  const [flashes,   setFlashes]   = useState([]);
  const [beatCount, setBeatCount] = useState(0);
  const [combo,     setCombo]     = useState(0);
  const [lastBeat,  setLastBeat]  = useState(0);
  const rippleId = useRef(0);
  const flashId  = useRef(0);
  const [bellAnim, setBellAnim] = useState(0);
  const [hovered, setHovered]   = useState(false);

  function playAgbaSound(intensity) {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const now = ctx.currentTime;
      // Master compressor + gain — big bass without clipping
      const comp = ctx.createDynamicsCompressor();
      comp.threshold.value = -10; comp.knee.value = 4;
      comp.ratio.value = 10; comp.attack.value = 0.001; comp.release.value = 0.2;
      comp.connect(ctx.destination);
      const master = ctx.createGain();
      master.gain.value = 1.7 + intensity * 0.8;
      master.connect(comp);
      function tone(sf, ef, t, dur, vol, type) {
        type = type || 'sine';
        var o = ctx.createOscillator(); var g = ctx.createGain();
        o.type = type;
        o.frequency.setValueAtTime(sf, now + t);
        if (ef !== sf) o.frequency.exponentialRampToValueAtTime(ef, now + t + dur * 0.75);
        g.gain.setValueAtTime(0.001, now + t);
        g.gain.linearRampToValueAtTime(vol, now + t + 0.005);
        g.gain.exponentialRampToValueAtTime(0.001, now + t + dur);
        o.connect(g); g.connect(master); o.start(now + t); o.stop(now + t + dur + 0.05);
      }
      // Sub-bass rumble (physically felt)
      tone(38 + intensity * 10, 20, 0, 1.8, 1.5, 'sine');
      // Deep boom fundamental
      tone(58 + intensity * 18, 30, 0, 1.3, 1.2, 'sine');
      // Mid-bass punch
      tone(110 + intensity * 35, 55, 0, 0.65, 0.9, 'triangle');
      // Bass attack brightness
      tone(145 + intensity * 40, 72, 0, 0.38, 0.75, 'sine');
      // Body resonance harmonic
      tone(85 + intensity * 20, 42, 0.01, 0.95, 0.7, 'sine');
      // Barrel cavity resonance
      tone(44 + intensity * 6, 28, 0.005, 2.4, 0.6, 'sine');
      // Skin membrane noise burst (shaped exponential decay — the "thwack")
      var nLen = Math.ceil(ctx.sampleRate * 0.22);
      var buf = ctx.createBuffer(1, nLen, ctx.sampleRate);
      var d = buf.getChannelData(0);
      for (var i = 0; i < nLen; i++) d[i] = (Math.random() * 2 - 1) * Math.exp(-i / (nLen * 0.09));
      var src = ctx.createBufferSource(); src.buffer = buf;
      var lp = ctx.createBiquadFilter(); lp.type = 'lowpass';
      lp.frequency.value = 620 + intensity * 280; lp.Q.value = 1.2;
      var hp = ctx.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 35;
      var ng = ctx.createGain();
      ng.gain.setValueAtTime(2.4 + intensity * 0.9, now);
      ng.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      src.connect(hp); hp.connect(lp); lp.connect(ng); ng.connect(master);
      src.start(now); src.stop(now + 0.25);
      // Strike click transient
      tone(440 + intensity * 120, 110, 0, 0.07, 0.55, 'square');
    } catch(e) {}
  }

  function beat() {
    if (beating) return;
    const now = Date.now();
    const sinceLastBeat = now - lastBeat;
    const newCombo = sinceLastBeat < 900 ? Math.min(combo + 1, 16) : 0;
    const intensity = Math.min(newCombo / 8, 1);

    setBeating(true);
    setBeatCount(c => c + 1);
    setCombo(newCombo);
    setLastBeat(now);
    playAgbaSound(intensity);
    setBellAnim(n => n + 1);

    const id = rippleId.current++;
    setRipples(r => [...r, { id, color: newCombo > 6 ? '#a78bfa' : '#f59e0b', cx: 175, cy: 180 }]);
    const fid = flashId.current++;
    setFlashes(f => [...f, fid]);

    setTimeout(() => setBeating(false), 180);
    setTimeout(() => setRipples(r => r.filter(x => x.id !== id)), 800);
    setTimeout(() => setFlashes(f => f.filter(x => x !== fid)), 400);
  }

  const comboColor = combo > 10 ? '#a78bfa' : combo > 5 ? '#fb923c' : '#f59e0b';

  return (
    <div className="agba-stage">
      {/* ── Name tag ── */}
      <div>
        <div className="agba-name-tag">
          <span className="agba-name-tag__yor">Àgbá Ìlù</span>
          <span className="agba-name-tag__en">Giant Drum · Sacred Bass Drum of Yorubaland</span>
        </div>
      </div>

      {/* ── Interactive drum canvas ── */}
      <div className="agba-canvas-wrap" onClick={beat} role="button"
           aria-label="Beat the Àgbá Ìlù drum" tabIndex={0}
           onKeyDown={e => (e.key === ' ' || e.key === 'Enter') && beat()}
           onTouchStart={e => { e.preventDefault(); beat(); }}
           onMouseEnter={() => setHovered(true)}
           onMouseLeave={() => setHovered(false)}>

        {/* Flash overlays */}
        {flashes.map(fid => <div key={fid} className="agba-flash" />)}

        {/* Beat counter */}
        {beatCount > 0 && (
          <div className="agba-beat-badge" style={{ color: comboColor }}>
            {combo > 1 ? `✦ ×${combo} combo` : `${beatCount} beat${beatCount>1?'s':''}`}
          </div>
        )}

        <svg className="agba-svg" viewBox="0 0 520 360" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* Barrel wood — horizontal gradient, lit from left */}
            <linearGradient id="ag-barrel" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"   stopColor="#b86030"/>
              <stop offset="10%"  stopColor="#8a4520"/>
              <stop offset="32%"  stopColor="#4a2210"/>
              <stop offset="68%"  stopColor="#2a1408"/>
              <stop offset="100%" stopColor="#110804"/>
            </linearGradient>
            {/* Barrel vertical shading — top highlight, bottom shadow (cylindrical curvature) */}
            <linearGradient id="ag-barrel-v" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="rgba(255,200,140,0.24)"/>
              <stop offset="22%"  stopColor="rgba(255,180,80,0.07)"/>
              <stop offset="60%"  stopColor="rgba(0,0,0,0.03)"/>
              <stop offset="100%" stopColor="rgba(0,0,0,0.58)"/>
            </linearGradient>
            {/* Barrel top-edge highlight */}
            <linearGradient id="ag-barrel-top" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"   stopColor="#c07840"/>
              <stop offset="50%"  stopColor="#f0a058"/>
              <stop offset="100%" stopColor="#784020"/>
            </linearGradient>
            {/* Front face — animal hide */}
            <radialGradient id="ag-face" cx="36%" cy="30%" r="70%">
              <stop offset="0%"   stopColor="#faf3d8"/>
              <stop offset="18%"  stopColor="#ead99a"/>
              <stop offset="48%"  stopColor="#c4a055"/>
              <stop offset="75%"  stopColor="#9a6c30"/>
              <stop offset="100%" stopColor="#6a4418"/>
            </radialGradient>
            {/* Beat flash */}
            <radialGradient id="ag-face-beat" cx="50%" cy="46%" r="55%">
              <stop offset="0%"   stopColor="#ffffff"    stopOpacity="1"/>
              <stop offset="28%"  stopColor="#fef08a"    stopOpacity="0.92"/>
              <stop offset="68%"  stopColor="#f59e0b"    stopOpacity="0.30"/>
              <stop offset="100%" stopColor="#f59e0b"    stopOpacity="0"/>
            </radialGradient>
            {/* Impact glow at mallet strike point */}
            <radialGradient id="ag-impact" cx="50%" cy="50%" r="50%">
              <stop offset="0%"   stopColor="rgba(255,255,220,0.95)"/>
              <stop offset="45%"  stopColor="rgba(255,210,80,0.55)"/>
              <stop offset="100%" stopColor="rgba(245,158,11,0)"/>
            </radialGradient>
            {/* Back face */}
            <radialGradient id="ag-backface" cx="40%" cy="35%" r="65%">
              <stop offset="0%"   stopColor="#c8a870"/>
              <stop offset="100%" stopColor="#4a3018"/>
            </radialGradient>
            {/* Front rim wood */}
            <linearGradient id="ag-rim-wood" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#b07038"/>
              <stop offset="40%"  stopColor="#784820"/>
              <stop offset="100%" stopColor="#3e2008"/>
            </linearGradient>
            {/* Gold rim */}
            <linearGradient id="ag-rim-gold" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#e8bc50"/>
              <stop offset="45%"  stopColor="#f8d860"/>
              <stop offset="100%" stopColor="#9a7028"/>
            </linearGradient>
            {/* Strap */}
            <linearGradient id="ag-strap" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#2a1208"/>
              <stop offset="45%"  stopColor="#160804"/>
              <stop offset="100%" stopColor="#2a1208"/>
            </linearGradient>
            {/* Bell */}
            <radialGradient id="ag-bell" cx="28%" cy="20%" r="70%">
              <stop offset="0%"   stopColor="#fce060"/>
              <stop offset="45%"  stopColor="#c09028"/>
              <stop offset="100%" stopColor="#7a5a10"/>
            </radialGradient>
            <radialGradient id="ag-clapper" cx="40%" cy="30%" r="60%">
              <stop offset="0%"   stopColor="#a07820"/>
              <stop offset="100%" stopColor="#4a3610"/>
            </radialGradient>
            {/* Stick */}
            <linearGradient id="ag-stick-shaft" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%"   stopColor="#c89040"/>
              <stop offset="50%"  stopColor="#daa855"/>
              <stop offset="100%" stopColor="#8a5820"/>
            </linearGradient>
            <radialGradient id="ag-mallet" cx="30%" cy="26%" r="65%">
              <stop offset="0%"   stopColor="#f4dc88"/>
              <stop offset="100%" stopColor="#9a6a28"/>
            </radialGradient>
            {/* Ambient glow */}
            <radialGradient id="ag-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%"   stopColor="rgba(245,158,11,0.38)"/>
              <stop offset="100%" stopColor="rgba(245,158,11,0)"/>
            </radialGradient>
            {/* Cowrie */}
            <radialGradient id="ag-cowrie" cx="34%" cy="28%" r="62%">
              <stop offset="0%"  stopColor="#fffef0"/>
              <stop offset="100%" stopColor="#c8b870"/>
            </radialGradient>
            {/* Cloth bands */}
            <linearGradient id="ag-band-red" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#d02020"/>
              <stop offset="100%" stopColor="#801010"/>
            </linearGradient>
            <linearGradient id="ag-band-blue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#1e4cb0"/>
              <stop offset="100%" stopColor="#102870"/>
            </linearGradient>
            <linearGradient id="ag-band-gold" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#d09820"/>
              <stop offset="100%" stopColor="#806010"/>
            </linearGradient>
          </defs>

          {/* Ground shadow */}
          <ellipse cx="290" cy="352" rx="210" ry="11" fill="rgba(0,0,0,0.65)"/>

          {/* Atmospheric glow */}
          <ellipse cx="280" cy="182" rx="248" ry="205"
            fill="url(#ag-glow)"
            opacity={beating ? 1 : 0.40}
            style={{transition:'opacity 0.14s ease'}}/>

          {/* ── CARRYING STRAP (behind drum) ── */}
          <path d="M 55 98 C 88 28, 242 -6, 396 150"
            stroke="url(#ag-strap)" strokeWidth="32" fill="none" strokeLinecap="round"/>
          <path d="M 55 98 C 88 28, 242 -6, 396 150"
            stroke="rgba(255,190,110,0.13)" strokeWidth="11" fill="none" strokeLinecap="round"/>
          {/* Cross-stitch texture */}
          {Array.from({length:14}, (_, i) => {
            const t=(i+0.5)/14, mt=1-t;
            const sx=mt*mt*mt*55+3*mt*mt*t*88+3*mt*t*t*242+t*t*t*396;
            const sy=mt*mt*mt*98+3*mt*mt*t*28+3*mt*t*t*(-6)+t*t*t*150;
            const dxdt=3*(mt*mt*(88-55)+2*mt*t*(242-88)+t*t*(396-242));
            const dydt=3*(mt*mt*(28-98)+2*mt*t*(-6-28)+t*t*(150-(-6)));
            const len=Math.sqrt(dxdt*dxdt+dydt*dydt)||1;
            const nx=-dydt/len*13; const ny=dxdt/len*13;
            return <line key={`sw${i}`} x1={sx-nx} y1={sy-ny} x2={sx+nx} y2={sy+ny}
              stroke="rgba(180,120,50,0.22)" strokeWidth="1.2"/>;
          })}
          {/* Buckle */}
          <rect x="240" y="-1" width="20" height="14" rx="6"
            fill="#2e1608" stroke="rgba(255,210,100,0.55)" strokeWidth="1.4"/>
          <rect x="245" y="2" width="10" height="8" rx="3"
            fill="rgba(255,210,100,0.62)"/>

          {/* ── DRUM BODY (shakes on beat, rises on hover) ── */}
          <g className={`agba-drum-body${beating?' beating':''}${hovered?' hovered':''}`}>

            {/* === 3D BARREL — curved bezier paths for cylinder illusion === */}
            {/* Main barrel surface */}
            <path d="M 175 28 C 295 10, 408 110, 420 162 L 420 200 C 408 252, 295 352, 175 334 Z"
              fill="url(#ag-barrel)"/>
            {/* Vertical cylindrical shading overlay */}
            <path d="M 175 28 C 295 10, 408 110, 420 162 L 420 200 C 408 252, 295 352, 175 334 Z"
              fill="url(#ag-barrel-v)" opacity="0.90"/>

            {/* Top curved edge — lit rim of cylinder */}
            <path d="M 175 28 C 295 8, 408 110, 420 162"
              fill="none" stroke="url(#ag-barrel-top)" strokeWidth="7" strokeLinecap="round"/>
            <path d="M 175 28 C 295 8, 408 110, 420 162"
              fill="none" stroke="rgba(255,255,255,0.28)" strokeWidth="2.2" strokeLinecap="round"/>

            {/* Bottom curved edge — in deep shadow */}
            <path d="M 175 334 C 295 354, 408 252, 420 200"
              fill="none" stroke="rgba(0,0,0,0.65)" strokeWidth="5" strokeLinecap="round"/>

            {/* Specular highlight strip along upper barrel */}
            <path d="M 175 62 C 295 42, 406 122, 418 166"
              fill="none" stroke="rgba(255,210,130,0.32)" strokeWidth="30" strokeLinecap="round"/>
            <path d="M 175 62 C 295 42, 406 122, 418 166"
              fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="10" strokeLinecap="round"/>

            {/* Wood grain lines — follow barrel curvature */}
            {Array.from({length:10}, (_,i) => {
              const t=(i+1)/11, mt=1-t;
              const xt=mt*mt*mt*175+3*mt*mt*t*295+3*mt*t*t*408+t*t*t*420;
              const ytT=mt*mt*mt*28+3*mt*mt*t*10+3*mt*t*t*110+t*t*t*162;
              const ytB=mt*mt*mt*334+3*mt*mt*t*354+3*mt*t*t*252+t*t*t*200;
              return <line key={`wg${i}`} x1={xt} y1={ytT+3} x2={xt} y2={ytB-3}
                stroke="rgba(255,255,255,0.018)" strokeWidth="1.5"/>;
            })}

            {/* === DECORATIVE CLOTH BANDS (follow barrel curvature) === */}
            {[
              {t1:0.08, t2:0.16, grad:'url(#ag-band-red)'},
              {t1:0.26, t2:0.34, grad:'url(#ag-band-gold)'},
              {t1:0.44, t2:0.58, grad:'url(#ag-band-blue)'},
              {t1:0.68, t2:0.76, grad:'url(#ag-band-gold)'},
              {t1:0.84, t2:0.93, grad:'url(#ag-band-red)'},
            ].map(({t1,t2,grad},bi) => {
              const mt1=1-t1, mt2=1-t2;
              const x1=mt1*mt1*mt1*175+3*mt1*mt1*t1*295+3*mt1*t1*t1*408+t1*t1*t1*420;
              const yT1=mt1*mt1*mt1*28+3*mt1*mt1*t1*10+3*mt1*t1*t1*110+t1*t1*t1*162;
              const yB1=mt1*mt1*mt1*334+3*mt1*mt1*t1*354+3*mt1*t1*t1*252+t1*t1*t1*200;
              const x2=mt2*mt2*mt2*175+3*mt2*mt2*t2*295+3*mt2*t2*t2*408+t2*t2*t2*420;
              const yT2=mt2*mt2*mt2*28+3*mt2*mt2*t2*10+3*mt2*t2*t2*110+t2*t2*t2*162;
              const yB2=mt2*mt2*mt2*334+3*mt2*mt2*t2*354+3*mt2*t2*t2*252+t2*t2*t2*200;
              return <path key={`band${bi}`}
                d={`M ${x1} ${yT1} L ${x2} ${yT2} L ${x2} ${yB2} L ${x1} ${yB1} Z`}
                fill={grad} opacity="0.70"/>;
            })}

            {/* === ROPE LACING — zigzag X-pattern, 18 pairs === */}
            {Array.from({length:18}, (_,i) => {
              const ang=(i/18)*Math.PI*2;
              const ang2=((i+0.5)/18)*Math.PI*2;
              const fx=175+130*Math.cos(ang), fy=181+140*Math.sin(ang);
              const bx=420+22*Math.cos(ang2), by=181+38*Math.sin(ang2);
              return <line key={`rl${i}`} x1={fx} y1={fy} x2={bx} y2={by}
                stroke="#c8a050" strokeWidth="2.2" strokeLinecap="round" opacity="0.62"/>;
            })}
            {Array.from({length:18}, (_,i) => {
              const ang=((i+0.5)/18)*Math.PI*2;
              const ang2=((i+1)/18)*Math.PI*2;
              const fx=175+130*Math.cos(ang), fy=181+140*Math.sin(ang);
              const bx=420+22*Math.cos(ang2), by=181+38*Math.sin(ang2);
              return <line key={`rl2${i}`} x1={bx} y1={by} x2={fx} y2={fy}
                stroke="#a07830" strokeWidth="1.5" strokeLinecap="round" opacity="0.44"/>;
            })}

            {/* === BACK FACE === */}
            <ellipse cx="420" cy="181" rx="22" ry="38" fill="url(#ag-backface)"/>
            <ellipse cx="420" cy="181" rx="22" ry="38"
              fill="none" stroke="#3e2008" strokeWidth="4.5"/>
            <ellipse cx="420" cy="181" rx="28" ry="46"
              fill="url(#ag-rim-wood)" opacity="0.55" stroke="#1e0e04" strokeWidth="2"/>

            {/* === FRONT FACE === */}

            {/* Outer wood rim */}
            <ellipse cx="175" cy="181" rx="132" ry="142"
              fill="url(#ag-rim-wood)" stroke="rgba(0,0,0,0.45)" strokeWidth="2.5"/>

            {/* 12 tension lug bolts */}
            {Array.from({length:12}, (_,i) => {
              const ang=(i/12)*Math.PI*2;
              const hx=175+142*Math.cos(ang), hy=181+153*Math.sin(ang);
              return (
                <g key={`hw${i}`}>
                  <ellipse cx={hx} cy={hy} rx="4.5" ry="6.5"
                    fill="#4c2808" stroke="rgba(195,158,55,0.62)" strokeWidth="1.1"
                    transform={`rotate(${ang*180/Math.PI+90},${hx},${hy})`}/>
                  <circle cx={hx} cy={hy} r="2.2" fill="rgba(220,185,75,0.60)"/>
                </g>
              );
            })}

            {/* Cowrie shells on outer rim */}
            {Array.from({length:12}, (_,i) => {
              const ang=(i/12)*Math.PI*2 - Math.PI/24;
              const cx2=175+155*Math.cos(ang), cy2=181+167*Math.sin(ang);
              return (
                <g key={`cw${i}`} transform={`translate(${cx2},${cy2}) rotate(${ang*180/Math.PI+90})`}>
                  <ellipse cx="0" cy="0" rx="4" ry="7.5"
                    fill="url(#ag-cowrie)" stroke="rgba(160,130,50,0.5)" strokeWidth="0.8"/>
                  <line x1="-3" y1="0" x2="3" y2="0"
                    stroke="rgba(130,100,30,0.5)" strokeWidth="0.7"/>
                </g>
              );
            })}

            {/* Gold/brass accent ring */}
            <ellipse cx="175" cy="181" rx="126" ry="135"
              fill="none" stroke="url(#ag-rim-gold)" strokeWidth="8.5"/>
            <ellipse cx="175" cy="181" rx="126" ry="135"
              fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="1.8"/>

            {/* Membrane — expands on beat */}
            <ellipse cx="175" cy="181"
              rx={beating ? 119 : 116} ry={beating ? 128 : 124}
              fill="url(#ag-face)"
              style={{transition:'all 0.05s ease'}}/>

            {/* Skin texture rings */}
            {[22, 44, 66, 90, 110].map((r2,i) => (
              <ellipse key={`sk${i}`} cx="175" cy="181"
                rx={r2} ry={Math.round(r2*1.07)}
                fill="none" stroke="rgba(138,98,40,0.07)" strokeWidth="1.2"/>
            ))}

            {/* Radial tension lines */}
            {[0,30,60,90,120,150].map(deg => (
              <line key={`rad${deg}`}
                x1={175+12*Math.cos(deg*Math.PI/180)} y1={181+12*Math.sin(deg*Math.PI/180)}
                x2={175+110*Math.cos(deg*Math.PI/180)} y2={181+118*Math.sin(deg*Math.PI/180)}
                stroke="rgba(148,108,48,0.05)" strokeWidth="1"/>
            ))}

            {/* Center mark */}
            <ellipse cx="175" cy="181" rx="15" ry="16" fill="rgba(0,0,0,0.07)"/>
            <circle cx="175" cy="181" r="3.2" fill="rgba(138,98,40,0.30)"/>

            {/* Beat flash */}
            {beating && (
              <ellipse cx="175" cy="181" rx="117" ry="126"
                fill="url(#ag-face-beat)" opacity="0.95"/>
            )}

            {/* Specular highlight on skin */}
            <ellipse cx="148" cy="155" rx="52" ry="42"
              fill="rgba(255,255,255,0.09)" transform="rotate(-15,148,155)"/>

            {/* Inner rim shadow */}
            <ellipse cx="175" cy="181" rx="119" ry="128"
              fill="none" stroke="rgba(70,40,12,0.52)" strokeWidth="2.8"/>

            {/* Impact glow at mallet strike point (shown on beat) */}
            {beating && (
              <ellipse cx="175" cy="162" rx="38" ry="32"
                fill="url(#ag-impact)" opacity="0.72"
                className="agba-impact-glow"/>
            )}

            {/* === 5 HANGING BELLS === */}
            {[62, 84, 102, 120, 142].map((deg, i) => {
              const rad = deg * Math.PI / 180;
              const bx = 175 + 126 * Math.cos(rad);
              const by = 181 + 134 * Math.sin(rad);
              return (
                <g key={`bell${i}`} transform={`translate(${bx},${by})`}>
                  <g key={`bellinner${i}-${bellAnim}`} className="agba-bell">
                    <line x1="0" y1="-3" x2="0" y2="7"
                      stroke="rgba(200,160,60,0.75)" strokeWidth="1.5"/>
                    <path d="M -6 7 Q -9 15 -7.5 23 Q -6 30 0 31 Q 6 30 7.5 23 Q 9 15 6 7 Z"
                      fill="url(#ag-bell)" stroke="rgba(0,0,0,0.25)" strokeWidth="0.8"/>
                    <ellipse cx="0" cy="7" rx="6" ry="2.8"
                      fill="rgba(255,220,90,0.58)"/>
                    <ellipse cx="-3" cy="15" rx="2.2" ry="4.5"
                      fill="rgba(255,250,210,0.38)" transform="rotate(-15,-3,15)"/>
                    <circle cx="0" cy="33" r="3.2" fill="url(#ag-clapper)"/>
                    <line x1="-5" y1="5" x2="-11" y2="-5"
                      stroke="rgba(200,160,60,0.45)" strokeWidth="1.1"/>
                    <line x1="5" y1="5" x2="11" y2="-5"
                      stroke="rgba(200,160,60,0.45)" strokeWidth="1.1"/>
                  </g>
                </g>
              );
            })}
          </g>{/* end agba-drum-body */}

          {/* ── DRUMSTICK ── */}
          <g className={`agba-stick-group${beating ? ' beating' : ''}${hovered ? ' hovered' : ''}`}>
            {/* Shadow */}
            <g transform="translate(5,6)" opacity="0.22">
              <line x1="442" y1="24" x2="178" y2="166"
                stroke="#000" strokeWidth="16" strokeLinecap="round"/>
            </g>
            <line x1="442" y1="24" x2="178" y2="166"
              stroke="url(#ag-stick-shaft)" strokeWidth="12" strokeLinecap="round"/>
            <line x1="442" y1="24" x2="178" y2="166"
              stroke="rgba(255,255,255,0.16)" strokeWidth="3.5" strokeLinecap="round"/>
            {/* Wrapping bands */}
            {[
              {t:0.64, c:'#dc2626'},
              {t:0.71, c:'#fbbf24'},
              {t:0.78, c:'#dc2626'},
              {t:0.85, c:'#1d4ed8'},
              {t:0.92, c:'#fbbf24'},
            ].map(({t,c},i) => {
              const wx=442-264*t, wy=24+142*t;
              return <line key={i} x1={wx-3.5} y1={wy-6.5} x2={wx+3.5} y2={wy+6.5}
                stroke={c} strokeWidth="5.5" strokeLinecap="round" opacity="0.94"/>;
            })}
            {/* Mallet head */}
            <circle cx="178" cy="166" r="19"
              fill="url(#ag-mallet)" stroke="rgba(255,202,82,0.65)" strokeWidth="2.5"/>
            <circle cx="172" cy="159" r="9" fill="rgba(255,255,255,0.25)"/>
          </g>

          <text x="460" y="18" fontSize="9" fill="rgba(251,191,36,0.72)"
            fontFamily="sans-serif" fontWeight="700" textAnchor="middle">Ọpá Ìlù</text>
          <line x1="454" y1="21" x2="442" y2="24"
            stroke="rgba(251,191,36,0.28)" strokeWidth="0.9"/>

          {/* ── Combo fire particles ── */}
          {combo > 5 && Array.from({length:8}, (_,i) => {
            const ang = (i/8)*Math.PI*2 + beatCount*0.28;
            const comboColors = ['#fbbf24','#fb923c','#ef4444','#a78bfa','#34d399'];
            return (
              <circle key={`fi${i}`}
                cx={175 + Math.cos(ang)*144}
                cy={181 + Math.sin(ang)*154}
                r={3.5 + (combo-5)*0.65}
                fill={comboColors[i%5]} opacity="0.76"
                style={{ animation:`agba-ripple 0.55s ease-out infinite`, animationDelay:`${i*0.10}s` }}/>
            );
          })}
        </svg>

        {/* Ripple SVG overlay */}
        <svg className="agba-ripples" viewBox="0 0 520 360"
          style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none' }}>
          {ripples.map(rpl => (
            <circle key={rpl.id} cx={rpl.cx} cy={rpl.cy} r="18"
              fill="none" stroke={rpl.color} strokeWidth="3"
              className="agba-ripple-circle"/>
          ))}
        </svg>
      </div>

      {/* ── Hint ── */}
      <p className="agba-hint">
        <strong>Click / tap the drum</strong> — or press <strong>Space / Enter</strong> — to beat the Àgbá Ìlù
        {combo > 3 ? <span style={{color:comboColor}}> · ×{combo} combo!</span> : null}
      </p>

      {/* ── Stats ── */}
      {beatCount > 0 && (
        <div className="agba-stats">
          <div className="agba-stat">
            <div className="agba-stat__num" style={{color:comboColor}}>{beatCount}</div>
            <div className="agba-stat__label">Beats</div>
          </div>
          <div className="agba-stat">
            <div className="agba-stat__num" style={{color:combo>5?'#a78bfa':'#f59e0b'}}>{combo}</div>
            <div className="agba-stat__label">Combo</div>
          </div>
          <div className="agba-stat">
            <div className="agba-stat__num">{combo > 10 ? '🔥' : combo > 5 ? '⚡' : '🥁'}</div>
            <div className="agba-stat__label">
              {combo > 10 ? 'Possessed!' : combo > 5 ? 'In the groove' : 'Ìlù'}
            </div>
          </div>
        </div>
      )}

      {/* ── Ifa/Orisa Relativity Quote ── */}
      <div className="agba-quote-wrap">
        <div className="agba-quote">
          <p className="agba-quote__text">
            <em>Ọ̀rọ̀ ilé ayé bí ìlù gángan ni</em>;{' '}
            tóbá kọjú s<em>ẹ́nìkan</em>, ẹ̀yìn ló kọ s<em>ẹ́lòmíràn</em>
          </p>
          <div className="agba-quote__attr">— Ifá / Òrìṣà Relativity</div>
          <div className="agba-quote__drum-icons">
            {Array.from({length:9}, (_,i) => <div key={i} className="agba-quote__drum-dot"/>)}
          </div>
          <p style={{fontSize:'0.84rem',color:'var(--sub)',marginTop:14,fontStyle:'italic',lineHeight:1.65}}>
            "The affairs of the world are like the gángan drum — when its face turns toward one person, its back turns to another." — Every perspective is simultaneously a front and a back; what is revealed to one is concealed from another.
          </p>
        </div>
      </div>

      {/* ── Orisanimation Description ── */}
      <div className="agba-desc-wrap">
        <div className="agba-desc-hd">Àgbá Ìlù as Orisanimation — Modeling Relativity</div>
        <p className="agba-desc-body">
          This interactive animation of the <strong>Àgbá Ìlù</strong> (Giant Drum) is an{' '}
          <strong>Orisanimation</strong> — a class of animated model within the IFA Internet framework
          that uses Orisa forms, symbols, and dynamics to <strong>model, study, teach, and learn</strong>{' '}
          principles across all fields of knowledge. The Àgbá Ìlù Orisanimation encodes{' '}
          <strong>Ifá/Òrìṣà Relativity</strong>: just as the drum's two faces are permanently{' '}
          opposed — each membrane always facing away from the other — every observer in the universe
          occupies a relative position. What is front (face, present, visible, experienced) for one
          is simultaneously back (other side, unseen, differently experienced) for another.
          This principle models <strong>Special and General Relativity in Physics</strong>, frame-of-reference
          problems in philosophy and epistemology, perspective theory in art, and the relational nature
          of knowledge in every field of existence — all embedded in the ancient Yoruba proverb of the drum.
          In Ìlú-Ìlù (City of Drum), the Àgbá Ìlù is both an instrument and a living cosmological model.
        </p>
      </div>
    </div>
  );
}

function AgbaIluSection({ audio }) {
  return (
    <section className="ilu-section agba-section" id="agba-ilu">
      <div className="ilu-container">
        <div className="ilu-section-hd">
          <span className="ilu-eyebrow">Orisanimation · Ifanimation</span>
          <h2 className="ilu-section-title">
            Ifa Animation (Ifanimation) &amp; Orisa Animation (Orisanimation)
          </h2>
          <p className="ilu-section-sub">
            Interactive animated models of Ifa and Orisa forms — used to study, simulate, teach,
            and learn the deep laws of Ifa and Orisa across every field of knowledge and existence.
          </p>
        </div>
        <AgbaIluAnim audio={audio} />
      </div>
    </section>
  );
}

// ─── IFA INNOVATIONS SECTION ─────────────────────────────────────────────────

const IFA_INNOVATIONS = [
  { label: 'Opón Ifá',    desc: 'The Sacred Divination Tray — the first interface between human intelligence and the 256 Odu Ifa.' },
  { label: 'Ọpẹlẹ',       desc: 'The Divination Chain — a precision instrument encoding the 16 Principal Codes in a single cast.' },
  { label: 'Àgbìgbà',     desc: 'An Ifa Divination System — the original binary computational device.' },
  { label: 'Ìrokẹ Ifá',   desc: 'The Divination Tapper — used to summon Orunmila\'s presence and activate the Ifa field.' },
  { label: 'Èdè Yorùbá',  desc: 'The Yoruba Language — a structured tonal language encoding the laws of existence in its very grammar and naming system.' },
  { label: 'Odu Ifa',     desc: 'The 256 Odu — the universal codex; the axiomatic body of all knowledge governing every field of existence.' },
  { label: 'Ìkín Ifá',   desc: 'The Sacred Palm Nuts — the primary binary divination instrument through which Ọrúnmìlà\'s voice is heard and the Odu Ifa are cast.' },
  { label: 'Others',      desc: 'Ọrúnmìlà\'s innovations span every field of existence — his contributions to language, mathematics, medicine, cosmology, and governance are encoded across the 256 Odu Ifa.' },
];

function IluInnovations() {
  return (
    <section className="ilu-section ilu-section--dark" id="innovations">
      <div className="ilu-container">

        <div className="ilu-section-hd">
          <span className="ilu-eyebrow">IfaLang · OrisaLang</span>
          <h2 className="ilu-section-title">
            Ifa Innovations &amp; Orisa Innovations
          </h2>
          <p className="ilu-section-sub">
            Creating Innovations in <strong>IfaLang</strong> and <strong>OrisaLang</strong> —
            the science and art of applying the 16 Universal Laws of Ifa to generate
            breakthrough inventions across every field and dimension of existence.
          </p>
        </div>

        {/* ── Innovator Types ── */}
        <div className="innov-duo">

          <div className="innov-card innov-card--ifa">
            <div className="innov-card__badge">Ifa Innovation</div>
            <div className="innov-card__word">afìmọ̀fádárà</div>
            <h3 className="innov-card__title">
              Ifá Innovator <span className="innov-card__aka">(Ifannovator)</span>
            </h3>
            <p className="innov-card__body">
              An <strong>Ifa Innovation (IfaInnovation)</strong> is any innovation created
              by applying the <strong>16 Universal Laws or Principles of Ifa</strong> — the
              axiomatic laws governing every field of knowledge and the whole of existence.
              The Ifannovator (afìmọ̀fádárà) is the creator of such innovations: one who
              synthesises the living knowledge of the 256 Odu Ifa to produce new tools,
              systems, languages, technologies, and frameworks in any domain of reality.
            </p>
          </div>

          <div className="innov-card innov-card--orisa">
            <div className="innov-card__badge">Orisa Innovation</div>
            <div className="innov-card__word">afìmọ̀ṣàdárà</div>
            <h3 className="innov-card__title">
              Òrìṣà Innovator <span className="innov-card__aka">(Orisannovator)</span>
            </h3>
            <p className="innov-card__body">
              An <strong>Orisa Innovation (OrisaInnovation)</strong> is an invention
              originating from the Orisa and Irunmole — the divine forces through whom the
              creative principles of existence are made manifest. The Orisannovator
              (afìmọ̀ṣàdárà) channels the specific àṣẹ of a particular Orisa to generate
              innovations in their domain: Ọgun's metallurgy, Ọṣun's art and medicine,
              Ṣàngó's power systems, Ọbàtálá's forms and structures, and many more.
            </p>
          </div>
        </div>

        {/* ── Orunmila: First Ifannovator ── */}
        <div className="innov-founder">
          <div className="innov-founder__left">
            <div className="innov-founder__eyebrow">The First Ifannovator</div>
            <h3 className="innov-founder__name">Ọrúnmìlà</h3>
            <p className="innov-founder__body">
              Ọrúnmìlà is the foremost Ifannovator — the Orisa of Wisdom, the Witness to
              Creation, and the custodian of the 256 Odu Ifa. His innovations are not merely
              tools: they are complete <em>systems of knowledge</em>, each one encoding
              the axiomatic laws of existence in a different medium. Through his innovations,
              the invisible structure of reality was made accessible to human beings.
            </p>
            <p className="innov-founder__body">
              His inventions include the world's first binary computation system, the first
              tonal language grounded in cosmic law, and the first complete divination
              interface between human and universal intelligence. The breadth of Ọrúnmìlà's
              innovation defines what it means to be an Ifannovator.
            </p>
          </div>

          <div className="innov-founder__right">
            <div className="innov-list-label">Selected Ifa Innovations of Ọrúnmìlà</div>
            <ul className="innov-list">
              {IFA_INNOVATIONS.map((item, i) => (
                <li key={i} className="innov-list__item">
                  <span className="innov-list__label">{item.label}</span>
                  <span className="innov-list__desc">{item.desc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Orisa Innovations ── */}
        <div className="innov-orisa-note">
          <div className="innov-orisa-note__icon">⊛</div>
          <div>
            <h4 className="innov-orisa-note__title">The Many Orisa Innovations</h4>
            <p className="innov-orisa-note__body">
              The Orisa Innovations are equally vast — the inventions, discoveries, and
              creative contributions of the many Orisa and Irunmole, each governing their
              own domain of existence. Ọgun gave humanity iron and metallurgy; Ọbàtálá
              gave form and architecture; Ṣàngó mastered thunder and power; Ọṣun brought
              medicine, art, and the science of rivers; Yemọja gave the laws of the deep
              waters; Eṣù invented crossroads, communication, and the science of
              probability. Every Orisa is an Orisannovator (afìmọ̀ṣàdárà) — a divine
              innovator whose inventions continue to shape every dimension of human reality.
            </p>
          </div>
        </div>

        {/* ── Keywords ── */}
        <div className="innov-keywords">
          <div className="innov-keywords__label">Keywords</div>
          <div className="innov-kw innov-kw--ifa">
            <div className="innov-kw__term">
              Ifa innovate <span className="innov-kw__aka">(ifannovate)</span>
            </div>
            <div className="innov-kw__alts">Also written as: Ifa-innovate · Ifainnovate</div>
            <p className="innov-kw__def">
              This term means to apply the deep knowledge in the 256 Odufa and modern
              fields to create innovations and problem-solve.
            </p>
          </div>
          <div className="innov-kw innov-kw--orisa">
            <div className="innov-kw__term">
              Orisa innovate <span className="innov-kw__aka">(orisannovate)</span>
            </div>
            <div className="innov-kw__alts">Also written as: Orisa-innovate · Orisainnovate</div>
            <p className="innov-kw__def">
              This term means to apply the deep knowledge in the 16 Odu Orisa and modern
              fields to create innovations and problem-solve.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────

function IluFooter() {
  return (
    <footer className="ilu-footer">
      <div className="ilu-footer__inner">
        <div className="ilu-footer__left">
          <div className="ilu-footer__brand">Ìlú-Ìlù — City of Drum</div>
          <div className="ilu-footer__sub">Ìlù ń'sọ̀rọ̀ · Èdè Ìlú · IfaSimulation</div>
          <div className="ilu-footer__note">Ifart &amp; Orisart Playground · IFA Internet · CENProject</div>
        </div>
        <div className="ilu-footer__links">
          <a href="../" className="ilu-footer__link">← Playground</a>
          <a href="../../" className="ilu-footer__link">← Ifa Art</a>
          <a href="../../../" className="ilu-footer__link">IFA Internet</a>
          <a href="https://ifainternet.org" className="ilu-footer__link" target="_blank" rel="noopener noreferrer">ifainternet.org ↗</a>
        </div>
        <div className="ilu-footer__orisa">
          Ìlù as Orisa · Ìlú as Orisa<br/>
          <span>Àṣẹ ó ṣe</span>
        </div>
      </div>
    </footer>
  );
}

// ─── APP ROOT ────────────────────────────────────────────────────────────────

function App() {
  const audio = useAudioEngine();
  const [entered, setEntered] = useState(false);
  function handleEnter() {
    audio.playWelcome();
    setTimeout(() => setEntered(true), 2800);
  }
  return (
    <>
      {!entered && <WelcomeGate onEnter={handleEnter} />}
      <IluHeader />
      <main>
        <IluHero />
        <IluIntro />
        <DrumStations audio={audio} />
        <IluInhabitants audio={audio} />
        <DrumPad audio={audio} />
        <IluLangPanel audio={audio} />
        <IfaDance audio={audio} />
        <AgbaIluSection audio={audio} />
        <IluInnovations />
      </main>
      <IluFooter />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
