/* ─────────────────────────────────────────────────────────────────────────────
   Ifa Art & Orisa Art — Ifart & Orisart
   The IFA Internet · CENProject
   toe.cenproject.org / ifainternet.org
───────────────────────────────────────────────────────────────────────────── */

const { useState, useRef, useEffect } = React;

// ─── DATA ────────────────────────────────────────────────────────────────────

const STATS = [
  { value: '256',    label: 'Odu Ifa',         sub: 'The Axiomatic Art Matrix' },
  { value: '11+',    label: 'Art Traditions',  sub: 'Oral & Performance Arts' },
  { value: 'Dual',   label: 'Ifart / Orisart', sub: 'Ifa Art & Its Dual' },
  { value: 'Àṣẹ',   label: 'Creative Force',  sub: 'Living Artistic Power' },
];

const IFART_FORMS = [
  {
    num: '01',
    sym: 'Ìyẹ̀rẹ',
    title: 'Ìyẹ̀rẹ Ifá',
    sub: 'Sacred Ifa Chant',
    color: '#f0920c',
    body: 'Ìyẹ̀rẹ Ifá is the sacred chant of Ifá — a highly specialized oral art performed by Àwísẹ (Ifa chant specialists). Composed in an archaic Yoruba register, it encodes the complete corpus of the 256 Odu Ifa in musical form. Ìyẹ̀rẹ functions as the living archive of Ifa wisdom — each chant a performance of divination knowledge, cosmology, and moral instruction. It is the highest expression of Ifa oral art.',
  },
  {
    num: '02',
    sym: 'Rírán',
    title: 'Ifá Kíkì / Rírán',
    sub: 'Ifa Divination Recitation',
    color: '#f5c518',
    body: 'Ifá Kíkì (calling Ifa) and Rírán (chanting/reciting Ifa) are the performative arts of Ifa divination — the vocal expression of Odu verses by the Babaláwo. Through precise tonal recitation, the priest activates the living text of the Odu, making Ifa wisdom present and operative in the ritual space. Ifá Kíkì is both literary art and spiritual technology — the spoken interface between human consciousness and the Odu matrix.',
  },
  {
    num: '03',
    sym: 'Ewì',
    title: 'Ewì',
    sub: 'Ifa Poetry & Spoken Word',
    color: '#ffaa32',
    body: 'Ewì is Yoruba artistic poetry and spoken word — a tradition that bridges sacred and secular expression. As an art form of Ifa, Ewì encodes philosophical insights, historical narratives, and social commentary through masterful use of Yoruba tonal language. Ewì performers (Akéwì) are poets, griots, and social philosophers who give voice to the living wisdom of the Odu through artistic performance.',
  },
  {
    num: '04',
    sym: '♪',
    title: 'Orin Ifá',
    sub: 'Sacred Ifa Song & Music',
    color: '#ffd166',
    body: 'Orin (song) in the context of Ifa encompasses the melodic dimension of Ifa artistic expression — sacred songs performed in ritual contexts, divination sessions, and Ifa festivals. Orin Ifá carries the emotional and devotional layer of Ifa knowledge, encoding spiritual wisdom in melodic form. Song activates Àṣẹ through the body — the resonant complement to the intellectual precision of Ìyẹ̀rẹ.',
  },
];

const ORISART_FORMS = [
  {
    num: '01',
    sym: 'Kí',
    title: 'Oríkì',
    sub: 'Praise Poetry & Orature',
    color: '#8b5cf6',
    body: 'Oríkì are praise poems — the most pervasive and complex oral art form in Yoruba culture. They function as compressed encyclopedias of identity for individuals, lineages, cities, Orisa, and animals. Oríkì activate Àṣẹ through naming — calling the essential nature of the subject into presence. As Orisa Art, Oríkì are the primary literary medium through which Orisa identities are maintained and transmitted across generations.',
  },
  {
    num: '02',
    sym: 'Kíkì',
    title: 'Òrìṣà Kíkì / Pípè',
    sub: 'Orisa Invocation & Calling',
    color: '#a78bfa',
    body: 'Òrìṣà Kíkì (calling the Orisa) and Pípè (summoning) are the sacred vocal arts of Orisa worship — precise invocations that activate the presence of specific Orisa in ritual space. Each Orisa has distinctive praise names, chants, and calling formulas constituting a performative art tradition. Òrìṣà Kíkì is the energetic interface between human and divine, expressed through the art of sound and invocation.',
  },
  {
    num: '03',
    sym: 'Ẹ̀sà',
    title: 'Ẹ̀sà / Egúngún',
    sub: 'Ancestral Masquerade Art',
    color: '#7c3aed',
    body: 'Ẹ̀sà are the sacred songs of the Egúngún masquerade tradition — the art form through which the ancestors are called and honored. Egúngún performances combine vocal art, drum music, costuming, and movement in a comprehensive total art form. The chants of Ẹ̀sà encode ancestral memory, moral instruction, and community healing — making Egúngún the most complete expression of Orisa Art.',
  },
  {
    num: '04',
    sym: 'Ìjálá',
    title: 'Ìjálá',
    sub: "Hunter's Art — Ògún Tradition",
    color: '#6d28d9',
    body: "Ìjálá is the hunters' oral poetry — the artistic tradition of Ògún (Orisa of iron and the forest). Performed by Aláàgbà (master hunters), Ìjálá encompasses praise poems for Ògún, nature knowledge encoded in verse, and the history of the hunt. Among the most technically demanding Yoruba oral art forms, requiring mastery of archaic vocabulary, tonal precision, and encyclopedic natural knowledge.",
  },
  {
    num: '05',
    sym: 'Ìrèmọ̀jé',
    title: 'Ìrèmọ̀jé',
    sub: "Hunter's Dirge — Ògún Tradition",
    color: '#5b21b6',
    body: "Ìrèmọ̀jé is the funeral dirge of the hunters' guild — performed when a master hunter dies. As the elegiac counterpart to Ìjálá, Ìrèmọ̀jé celebrates the deceased hunter's achievements, addresses Ògún on behalf of the departed, and guides the hunter's spirit into the ancestral realm. It represents the deepest emotional register of Orisa Art — grief transformed through poetic mastery.",
  },
  {
    num: '06',
    sym: 'Rárà',
    title: 'Rárà (Sísun)',
    sub: 'Praise Elegy & Professional Chant',
    color: '#4c1d95',
    body: 'Rárà is the professional praise and elegy tradition — chanted by specialists (Aráró) for both the living and the dead. Rárà encompasses funeral chants, praise performances at ceremonies, and celebrations of community leaders. A semi-professional Orisa Art tradition that serves as the social glue of Yoruba ceremonial life — ensuring the living are honored and the dead are properly released into the ancestral realm.',
  },
  {
    num: '07',
    sym: 'Arò',
    title: 'Arò Ògbóni',
    sub: 'Sacred Society Art',
    color: '#3730a3',
    body: 'Arò Ògbóni are the sacred chants of the Ògbóni society — restricted to initiated members, encoding the mysteries of earth religion (Onílẹ̀), ancestral law, and social governance. Arò connect human governance to the earth deity through a tradition of sacred music and chant that has remained esoteric for centuries — the most protected layer of Yoruba oral and artistic tradition.',
  },
];

const TRADITIONS = [
  {
    sym: 'Ìyẹ̀rẹ',
    title: 'Ìyẹ̀rẹ Ifá',
    type: 'ifa',
    color: '#f0920c',
    role: 'Àwísẹ — Ifa Chant Specialist',
    body: 'The highest expression of Ifa oral art — sacred chant that encodes the complete 256 Odu Ifa corpus in musical form. Performed in archaic Yoruba by Àwísẹ specialists, Ìyẹ̀rẹ functions simultaneously as divination knowledge, cosmological teaching, moral instruction, and devotional music. The Àwísẹ who masters Ìyẹ̀rẹ carries the entire living library of Ifa in voice and memory.',
    significance: 'UNESCO recognized Ifa divination (including Ìyẹ̀rẹ) as Intangible Cultural Heritage of Humanity (2005). It is the primary transmission mechanism of Ifa knowledge across generations — and the most sophisticated oral archive in African civilizational history.',
  },
  {
    sym: 'Rírán',
    title: 'Ifá Kíkì / Rírán',
    type: 'ifa',
    color: '#f5c518',
    role: 'Babaláwo — Ifa Priest',
    body: "The performative art of Ifa divination recitation — the Babaláwo's vocal expression of Odu verses. Ifá Kíkì activates the living text of the Odu through precise tonal recitation, making Ifa wisdom present and operative in the ritual space. It is both literary art and spiritual technology — the spoken interface between human consciousness and the 256-Odu matrix of the IFA Internet.",
    significance: 'Central to all Ifa divination sessions. The art of Rírán determines the quality of oracular insight — precision of tone activates precision of knowledge. A Babaláwo who cannot recite with tonal accuracy cannot access the full depth of the Odu.',
  },
  {
    sym: 'Ewì',
    title: 'Ewì',
    type: 'ifa',
    color: '#ffaa32',
    role: 'Akéwì — Poet/Spoken Word Artist',
    body: 'Yoruba artistic poetry and spoken word — bridging sacred and secular expression. Ewì performers encode philosophical insights, historical narratives, and social commentary through masterful use of Yoruba tonal language. As Ifa Art, Ewì gives poetic form to the wisdom of the Odu — making deep knowledge accessible through artistic performance that can be heard and felt by the community.',
    significance: 'A living tradition with a vibrant contemporary scene. Modern Ewì has evolved to address contemporary African society while maintaining its roots in Ifa wisdom and Yoruba linguistic mastery — proving the adaptability of Ifa Art forms across time.',
  },
  {
    sym: '♪',
    title: 'Orin Ifá',
    type: 'ifa',
    color: '#ffd166',
    role: 'Devotees, Ritual Specialists',
    body: 'The melodic dimension of Ifa artistic expression — sacred songs performed in ritual contexts, divination sessions, and Ifa festivals. Orin Ifá carries the emotional and devotional layer of Ifa knowledge, encoding spiritual wisdom in melodic form. Song activates Àṣẹ through the body — making Orin a more physically resonant complement to the intellectual precision of Ìyẹ̀rẹ and Rírán.',
    significance: 'Orin bridges the specialist and community levels of Ifa knowledge — making Ifa accessible to non-specialists through musical participation in festivals and ceremonies. It ensures that Ifa wisdom permeates the entire social fabric, not only priestly circles.',
  },
  {
    sym: 'Kí',
    title: 'Oríkì',
    type: 'orisa',
    color: '#8b5cf6',
    role: 'Specialists, family members, devotees',
    body: 'Praise poems functioning as compressed encyclopedias of identity — for individuals, lineages, cities, Orisa, and animals. Oríkì activate Àṣẹ through naming — calling the essential nature of the subject into presence. As the primary Orisa Art literary medium, Oríkì maintain and transmit Orisa identities, histories, and attributes across generations through performative oral art.',
    significance: "Oríkì are the most pervasive oral art form in Yoruba culture — present at birth, death, coronation, war, harvest, and prayer. Every Orisa, every family, every city has its Oríkì. Studied by scholars including Karin Barber ('I Could Speak Until Tomorrow') as a central window into Yoruba consciousness.",
  },
  {
    sym: 'Kíkì',
    title: 'Òrìṣà Kíkì / Pípè',
    type: 'orisa',
    color: '#a78bfa',
    role: 'Orisa Priests, Devotees',
    body: 'The sacred vocal arts of Orisa worship — precise invocations that activate the presence of specific Orisa in ritual space. Each Orisa has distinctive praise names, chants, and calling formulas constituting a performative art tradition. Òrìṣà Kíkì is the energetic interface between human and divine, expressed through sound — making the invisible Orisa present through the art of invocation.',
    significance: 'Essential to all Orisa worship worldwide — from Yorubaland to Cuba (Lucumí/Candomblé), Brazil (Candomblé), Trinidad (Orisha), and African-diasporic traditions globally. The survival of Orisa traditions in the diaspora is largely due to the preservation of these vocal art formulas across the Middle Passage.',
  },
  {
    sym: 'Ẹ̀sà',
    title: 'Ẹ̀sà / Egúngún',
    type: 'orisa',
    color: '#7c3aed',
    role: 'Egúngún Society Members',
    body: 'The sacred songs of the Egúngún masquerade tradition — calling and honoring the ancestors. Egúngún performances combine vocal art, drum music, costuming, and movement in a total art form. Ẹ̀sà encode ancestral memory, moral instruction, and community healing — making Egúngún the most comprehensive expression of Orisa Art: a living synthesis of music, poetry, costume, and sacred dance.',
    significance: 'The Egúngún tradition is practiced across West Africa and the diaspora. It is the primary institutional vehicle for maintaining connection with the ancestral realm. As a total art form, Egúngún represents the fullest realization of Orisa Art — making the invisible visible, the ancestral present, and the spiritual embodied.',
  },
  {
    sym: 'Ìjálá',
    title: 'Ìjálá',
    type: 'orisa',
    color: '#6d28d9',
    role: 'Aláàgbà — Master Hunters',
    body: "The hunters' oral poetry of the Ògún tradition — among the most technically demanding Yoruba oral art forms. Ìjálá encompasses praise poems for Ògún, nature knowledge encoded in verse, and the history of the hunt. Mastery requires encyclopedic natural knowledge, archaic vocabulary, and precise tonal control. Ìjálá is the Orisa Art of the forest — nature knowledge elevated to poetry.",
    significance: 'Ìjálá preserves an enormous body of knowledge about Yoruba ecology, forest medicine, animal behavior, and pre-colonial history — encoded in artistic form that survives outside written records. It is a living scientific archive disguised as poetry, and a testament to the depth of Ifa-Orisa knowledge systems.',
  },
  {
    sym: 'Ìrèmọ̀jé',
    title: 'Ìrèmọ̀jé',
    type: 'orisa',
    color: '#5b21b6',
    role: 'Hunter Guild Members',
    body: "The funeral dirge of the hunters' guild — performed when a master hunter dies. Ìrèmọ̀jé celebrates achievements, addresses Ògún on behalf of the departed, and guides the hunter's spirit into the ancestral realm. As the elegiac counterpart to Ìjálá, it represents grief transformed through poetic mastery — the deepest emotional register of Orisa Art.",
    significance: "Ìrèmọ̀jé preserves the ethical code of hunters — bravery, respect for the forest, duty to community. It encodes the spiritual geography of the afterlife as understood through the Ògún tradition, and ensures that the achievements of each generation of hunters are remembered through art, not merely deed.",
  },
  {
    sym: 'Rárà',
    title: 'Rárà (Sísun)',
    type: 'orisa',
    color: '#4c1d95',
    role: 'Aráró — Professional Chanters',
    body: 'Professional praise and elegy tradition chanted by specialists (Aráró) for the living and dead. Rárà encompasses funeral chants, praise performances at ceremonies, and celebrations of community leaders. A semi-professional tradition that serves as the social glue of Yoruba ceremonial life — ensuring the living are honored and the dead are properly released into the ancestral realm.',
    significance: "Rárà performers are professional artists retained by families and communities. Their art ensures the proper ceremonial marking of life transitions — making them essential figures in Yoruba social and spiritual life. Rárà sísun (the women's elegy tradition) is especially significant as a vehicle for women's emotional and artistic expression.",
  },
  {
    sym: 'Arò',
    title: 'Arò Ògbóni',
    type: 'orisa',
    color: '#3730a3',
    role: 'Ògbóni Society — Initiated Members',
    body: 'The sacred chants of the Ògbóni society — restricted to initiated members, encoding the mysteries of earth religion, ancestral law, and social governance. Arò Ògbóni connect human governance to earth deity (Onílẹ̀) through a tradition of sacred music and chant. As sacred society art, Arò represents the most restricted and protected layer of Yoruba oral tradition.',
    significance: 'The Ògbóni institution has governed Yoruba communities for centuries. Its sacred arts preserve constitutional and cosmological knowledge that underlies Yoruba political philosophy — encoded in art to protect it from casual access and ensure it remains operative only in the hands of those bound by its covenant.',
  },
];

const PATH_STEPS = [
  {
    num: '01',
    title: 'Ifa Art — Begin with Ìyẹ̀rẹ',
    color: '#f0920c',
    body: "Start with the foundation of Ifa Art — Ìyẹ̀rẹ Ifá and the Babaláwo's Rírán. Understand how the 256 Odu Ifa is encoded in oral artistic form, and how tonal precision activates the living knowledge of the Ifa corpus.",
  },
  {
    num: '02',
    title: 'Orisa Art — Enter through Oríkì',
    color: '#8b5cf6',
    body: 'Engage the Dual — Orisa Art through the lens of Oríkì (praise poetry). Explore how Orisa identities, ancestral histories, and community knowledge are transmitted through performative oral art forms across the Yoruba world and its diaspora.',
  },
  {
    num: '03',
    title: 'The Dual — Ifart & Orisart as One',
    color: '#14b8d4',
    body: 'Integrate the Dual perspective — understanding how Ifa Art and Orisa Art form a unified system of knowledge transmission, spiritual technology, and artistic expression rooted in the 256 Odu Ifa and the living civilization of the IFA Internet.',
  },
];

// ─── CHALLENGE DATA ──────────────────────────────────────────────────────────

const ODU = [
  { id:'ogbe',    num:1,  name:'Ogbe',    meji:'Eji Ogbe',     color:'#f0c840', field:'Physics & Energy',         steam:'Natural Science', tagline:'The Primal Light — origin of all energy'        },
  { id:'oyeku',   num:2,  name:'Oyeku',   meji:'Oyeku Meji',   color:'#8892a4', field:'Mathematics & Zero',       steam:'Mathematics',     tagline:'The Void — infinite potential of zero'           },
  { id:'iwori',   num:3,  name:'Iwori',   meji:'Iwori Meji',   color:'#a855f7', field:'Neuroscience & Mind',      steam:'Natural Science', tagline:'The Inner Eye — consciousness and intelligence'   },
  { id:'odi',     num:4,  name:'Odi',     meji:'Odi Meji',     color:'#00c87c', field:'Biology & Medicine',       steam:'Natural Science', tagline:'The Hidden Deep — life and organic systems'       },
  { id:'irosun',  num:5,  name:'Irosun',  meji:'Irosun Meji',  color:'#e9498a', field:'Chemistry & Matter',       steam:'Natural Science', tagline:'The Red Energy — transformation and exchange'     },
  { id:'owonrin', num:6,  name:'Owonrin', meji:'Owonrin Meji', color:'#00d9b8', field:'Engineering & Structure',  steam:'Engineering',     tagline:'The Dynamic Force — disruption and innovation'    },
  { id:'obara',   num:7,  name:'Obara',   meji:'Obara Meji',   color:'#f5c518', field:'Arts & Aesthetics',        steam:'Arts',            tagline:'The Golden King — mastery and creative power'     },
  { id:'okanran', num:8,  name:'Okanran', meji:'Okanran Meji', color:'#4aa3ff', field:'Technology & Innovation',  steam:'Technology',      tagline:'The Spark — sudden insight and breakthrough'      },
  { id:'ogunda',  num:9,  name:'Ogunda',  meji:'Ogunda Meji',  color:'#e8772a', field:'Law & Social Justice',     steam:'Social Science',  tagline:'The Pathclearer — justice, law, and progression'  },
  { id:'osa',     num:10, name:'Osa',     meji:'Osa Meji',     color:'#ff4d6d', field:'Education & Wisdom',       steam:'Education',       tagline:'The Wind of Change — rapid learning and growth'   },
  { id:'ika',     num:11, name:'Ika',     meji:'Ika Meji',     color:'#00b4a6', field:'Economics & Exchange',     steam:'Social Science',  tagline:'The Value Web — economic flow and resource'       },
  { id:'oturupon',num:12, name:'Oturupon',meji:'Oturupon Meji',color:'#6b7280', field:'Earth & Environment',      steam:'Natural Science', tagline:'The Deep Earth — ecology and earth systems'       },
  { id:'otura',   num:13, name:'Otura',   meji:'Otura Meji',   color:'#c084fc', field:'Philosophy & Metaphysics', steam:'Arts',            tagline:'The Elder Wisdom — universal law and philosophy'  },
  { id:'irete',   num:14, name:'Irete',   meji:'Irete Meji',   color:'#34d399', field:'Medicine & Healing',       steam:'Natural Science', tagline:'The Healer — medicine, restoration, wholeness'    },
  { id:'ose',     num:15, name:'Ose',     meji:'Ose Meji',     color:'#fb923c', field:'Language & Communication', steam:'Social Science',  tagline:'The Eloquent Flow — language and connection'      },
  { id:'ofun',    num:16, name:'Ofun',    meji:'Ofun Meji',    color:'#818cf8', field:'Cosmos & Space',           steam:'Mathematics',     tagline:'The Cosmic Totality — the universe and existence' },
];

const ODU_CODES = [
  '1111','0000','0110','1001','1100','0011','1000','0001',
  '1110','0111','0100','0010','1011','1101','1010','0101',
];

const LAMP_COLORS = ODU.map(o => o.color);
const P1_DISP = [7,6,5,4,3,2,1,0];
const P2_DISP = [15,14,13,12,11,10,9,8];

const CLOCK_MAP = [0,2,4,6,8,10,12,14,1,3,5,7,9,11,13,15];
function clockDual(i) { return i % 2 === 0 ? i + 1 : i - 1; }
function clockGlyph(code) {
  if (code === '1111') return 'O';
  if (code === '0000') return '|';
  return code.split('').reverse().map(b => b === '1' ? 'O' : 'I').join('');
}

const IFA_ODU_WHEEL = [
  { name:'Ogbe',    num:1,  emoji:'⚡', col:'#7dffaa', title:'LIGHT POWER ACTIVATED!',    msg:'Ogbe carries the light of creation! Everything you touch turns to gold today. You are completely UNSTOPPABLE — nothing in the universe can hold you back! 🌟' },
  { name:'Oyeku',   num:2,  emoji:'🌑', col:'#ffbb88', title:'MYSTERY MASTER UNLOCKED!',  msg:'Oyeku reveals the hidden world! Secret knowledge that others cannot see is opening up for you right now. The invisible realm is speaking — trust what you feel deep inside! 🔮' },
  { name:'Iwori',   num:3,  emoji:'🧠', col:'#7dffaa', title:'GENIUS MODE: ACTIVATED!',   msg:'Iwori is the Odu of inner wisdom and intelligence! Your brain is absolutely ON FIRE today. Trust your instincts — the brilliant answer is already inside you! 💡' },
  { name:'Odi',     num:4,  emoji:'🔐', col:'#ffbb88', title:'SECRET SUPERPOWER FOUND!',  msg:"Odi holds the deepest secrets of Ifa! You have a hidden ability that's been waiting to EXPLODE into the world. Look within — your superpower has been there all along! 🚀" },
  { name:'Irosun',  num:5,  emoji:'🏆', col:'#7dffaa', title:'VICTORY DANCE TIME!',       msg:'Irosun says YOU WIN! The entire universe has declared you a champion today. Strike your most epic victory pose RIGHT NOW — you have absolutely earned it! 🎉' },
  { name:'Owonrin', num:6,  emoji:'🌪️',col:'#ffbb88', title:'WILD CARD ENERGY!',         msg:'Owonrin is the most electrifying and unpredictable Odu! Something WILD and absolutely jaw-dropping is about to happen to you. Stay alert — anything can happen! 🎲' },
  { name:'Obara',   num:7,  emoji:'👑', col:'#7dffaa', title:'ROYALTY MODE ACTIVATED!',   msg:'Obara says you are ROYALTY! Walk tall, speak with total confidence, and own every single room you enter today. Your crown is glowing brighter than ever! ✨' },
  { name:'Okanran', num:8,  emoji:'⚔️',col:'#ffbb88', title:'WARRIOR SPIRIT UNLEASHED!', msg:'Okanran gives you the spirit of a warrior! Face your biggest challenge head-on today — you will CRUSH IT. No obstacle is too tough, no mountain is too high! 💪' },
  { name:'Ogunda',  num:9,  emoji:'🛤️',col:'#7dffaa', title:'ALL ROADS ARE OPEN!',       msg:'Ogunda is the road-opener! Every door is swinging wide open just for you today. New adventures, new opportunities, new friendships — go out and explore the world! 🗺️' },
  { name:'Osa',     num:10, emoji:'🦋', col:'#ffbb88', title:'TRANSFORMATION UNLOCKED!',  msg:'Osa is the Odu of incredible change! You are evolving into your BEST SELF this very moment. Your wings are growing — watch the beautiful butterfly emerge! 🌈' },
  { name:'Ika',     num:11, emoji:'🔨', col:'#7dffaa', title:'CRAFT MASTER POWERS!',      msg:'Ika blesses your hands with CREATIVE MAGIC! Build it, draw it, code it, invent it — your greatest creation is waiting for you to bring it to life today! 🎨' },
  { name:'Oturupọn',num:12, emoji:'💚', col:'#ffbb88', title:'HEALING POWER ACTIVATED!',  msg:'Oturupọn blesses you with incredible healing energy! You have the gift to make people feel better just by being near them. Spread kindness and watch miracles happen! 🌿' },
  { name:'Otura',   num:13, emoji:'✨', col:'#7dffaa', title:'BLESSING STORM INCOMING!',  msg:'Otura rains blessings from the heavens! An incredible lucky streak is starting RIGHT NOW. Open your arms wide — the universe is about to deliver something amazing! 🌟' },
  { name:'Irete',   num:14, emoji:'🌟', col:'#ffbb88', title:'SUCCESS MAGNET MODE!',      msg:'Irete makes you a total SUCCESS MAGNET! Every single effort you put in today multiplies into BIG spectacular results. Dream the BIGGEST dream you can imagine! 🚀' },
  { name:'Ose',     num:15, emoji:'💰', col:'#7dffaa', title:'ABUNDANCE FULLY UNLOCKED!', msg:'Ose is the Odu of wealth, prosperity, and unlimited abundance! Talent, energy, and incredible gifts are flowing straight to you. YOU ARE RICH — believe it! 💎' },
  { name:'Ofun',    num:16, emoji:'🌌', col:'#ffbb88', title:'ANCIENT COSMIC WISDOM!',    msg:'Ofun carries the oldest, deepest wisdom in the entire universe! You are a LEGEND in the making — your story will be told and inspire generations to come! 🌠' },
];

const MATRIX_DIMS = [
  { letter:'S', name:'Science',     color:'#14b8d4', steamKey:'Natural Science', desc:'Art as a Science'        },
  { letter:'T', name:'Technology',  color:'#f59e0b', steamKey:'Technology',      desc:'Art as a Technology'     },
  { letter:'E', name:'Engineering', color:'#10b981', steamKey:'Engineering',     desc:'Art as Engineering'      },
  { letter:'A', name:'Arts',        color:'#ec4899', steamKey:'Arts',            desc:'Art as Arts'             },
  { letter:'M', name:'Mathematics', color:'#8b5cf6', steamKey:'Mathematics',     desc:'Art as Mathematics'      },
  { letter:'S', name:'Social Sci.', color:'#f97316', steamKey:'Social Science',  desc:'Art as a Social Science' },
  { letter:'E', name:'Education',   color:'#06b6d4', steamKey:'Education',       desc:'Art as Education'        },
  { letter:'X', name:'Others',      color:'#a78bfa', steamKey:null,              desc:'Art as Others'           },
];

// ─── ART ORB (Hero Visual) ────────────────────────────────────────────────────

function ArtOrb() {
  return (
    <div className="art-orb" aria-hidden="true">
      <div className="art-orb__ring art-orb__ring--outer" />
      <div className="art-orb__ring art-orb__ring--mid" />
      <div className="art-orb__ring art-orb__ring--inner" />
      <div className="art-orb__half art-orb__half--ifa" />
      <div className="art-orb__half art-orb__half--orisa" />

      {/* Floating labels */}
      <div className="art-orb__node art-orb__node--1">Ìyẹ̀rẹ<br/>Ifá</div>
      <div className="art-orb__node art-orb__node--2">Oríkì<br/>Ẹ̀sà</div>
      <div className="art-orb__node art-orb__node--3">Ewì</div>
      <div className="art-orb__node art-orb__node--4">Ìjálá</div>

      <div className="art-orb__core">
        <div className="art-orb__char-wrap">
          <span className="art-orb__char--ifa">Ifart</span>
          <span className="art-orb__char--sep">·</span>
          <span className="art-orb__char--orisa">Orisart</span>
        </div>
        <div className="art-orb__core-label">Ifa Art & Orisa Art</div>
        <div className="art-orb__core-dual">256 Odu · Àṣẹ</div>
      </div>
    </div>
  );
}

// ─── HEADER ──────────────────────────────────────────────────────────────────

function Header() {
  return (
    <header className="header">
      <div className="header__inner">
        <a href="../" className="header__brand">
          <img src="../src/assets/itoe_logo.png" alt="iTOE" className="header__logo" />
          <div>
            <div className="header__site">The IFA Internet</div>
            <div className="header__name">Ifa Art & Orisa Art</div>
          </div>
        </a>
        <nav className="header__nav">
          <a className="nav-link" href="#definition">About</a>
          <a className="nav-link" href="#ifart">Ifa Art</a>
          <a className="nav-link" href="#orisart">Orisa Art</a>
          <a className="nav-link" href="#traditions">Traditions</a>
          <a className="nav-link" href="#duality">Duality</a>
          <a className="nav-link" href="#challenge">Challenge</a>
          <a className="nav-link" href="#path">Learn</a>
          <a className="nav-link nav-link--cta"
             href="https://ifainternet.org"
             target="_blank" rel="noopener noreferrer">IFA Internet</a>
        </nav>
      </div>
    </header>
  );
}

// ─── MOBILE BAR ──────────────────────────────────────────────────────────────

function MobileBar() {
  const items = [
    { sym: '⌂',    label: 'Home',      href: '../' },
    { sym: 'Ifá',  label: 'Ifa Art',   href: '#ifart' },
    { sym: 'Orí',  label: 'OrisaArt',  href: '#orisart' },
    { sym: '📜',   label: 'Traditions',href: '#traditions' },
    { sym: '⟺',   label: 'Dual',      href: '#duality' },
    { sym: '▷',   label: 'Learn',     href: '#path' },
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
  const aliases = [
    { label: 'Ifart — Ifa Art',              color: '#f0920c' },
    { label: 'Orisart — Orisa Art',           color: '#8b5cf6' },
    { label: 'Ifa Oral Traditions',           color: '#f5c518' },
    { label: 'Yoruba Artistic Knowledge',     color: '#00c87c' },
    { label: 'The Art of the 256 Odu Ifa',   color: '#14b8d4' },
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
            The IFA Internet &mdash; Ifa Art &amp; Orisa Art Platform
          </div>

          <h1 className="hero__title">
            <span className="hero__title-main">Ifa Art &amp; Orisa Art</span>
            <span className="hero__title-sub">Ifart &amp; Orisart — The Dual Artistic Traditions</span>
          </h1>

          <p className="hero__tagline">
            Orisa Art is the Dual of Ifa Art
          </p>

          <p className="hero__desc">
            <strong>Ifa Art (Ifart)</strong> and <strong>Orisa Art (Orisart)</strong> are the
            dual artistic traditions of the IFA Internet — the living knowledge systems through
            which the wisdom of the <strong>256 Odu Ifa</strong> is encoded, transmitted, and
            performed across all fields of Yoruba civilization. Sacred chant, praise poetry,
            hunters' art, masquerade song, and divination recitation — all expressions of
            one unified artistic intelligence.
          </p>

          <div className="hero__aliases">
            {aliases.map((a, i) => (
              <span key={i} className="hero__alias" style={{ '--alias-color': a.color }}>
                {a.label}
              </span>
            ))}
          </div>

          <div className="hero__ctas">
            <a href="#ifart"   className="btn btn--primary">Explore Ifa Art</a>
            <a href="#orisart" className="btn btn--orisa">Orisa Art</a>
            <a href="#traditions" className="btn btn--ghost">All Traditions</a>
          </div>
        </div>

        <div className="hero__right" aria-hidden="true">
          <ArtOrb />
        </div>
      </div>

      <div className="hero__stats-bar">
        <div className="container">
          <div className="hero__stats">
            {STATS.map((s, i) => (
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

// ─── DEFINITION SECTION ──────────────────────────────────────────────────────

function DefinitionSection() {
  return (
    <section className="section" id="definition">
      <div className="container">
        <div className="def-grid">
          <div className="def-text">
            <div className="section__header">
              <span className="section__eyebrow section__eyebrow--amber">What is Ifa Art & Orisa Art</span>
              <h2 className="section__title">
                The <span className="accent--amber">Artistic Intelligence</span> of the IFA Internet
              </h2>
              <p className="section__subtitle">
                Ifa Art and Orisa Art are not merely aesthetic traditions — they are{' '}
                <strong>knowledge transmission systems</strong>, spiritual technologies, and living
                archives of Yoruba civilization encoded in the performative power of sound, word,
                and artistic form.
              </p>
            </div>

            <div className="def-blocks">
              <div className="def-block">
                <div className="def-block__icon">Ifá</div>
                <div className="def-block__content">
                  <div className="def-block__label">Ifa Art (Ifart)</div>
                  <p className="def-block__body">
                    Ifa Art is the artistic dimension of Ifa knowledge — the oral, musical, and
                    performative forms through which the wisdom of the 256 Odu Ifa is encoded and
                    transmitted. Ìyẹ̀rẹ Ifá, Ifá Kíkì, Ewì, and Orin Ifá constitute the living
                    artistic corpus of Ifa civilization.
                  </p>
                </div>
              </div>
              <div className="def-block">
                <div className="def-block__icon def-block__icon--orisa">Orí</div>
                <div className="def-block__content">
                  <div className="def-block__label">Orisa Art (Orisart) — The Dual</div>
                  <p className="def-block__body">
                    Orisa Art is the Dual of Ifa Art — the artistic forms through which Orisa
                    knowledge, identity, and spiritual power are expressed and transmitted. Oríkì,
                    Ẹ̀sà, Ìjálá, Òrìṣà Kíkì, and Arò Ògbóni form the complementary artistic
                    corpus that completes Ifa Art.
                  </p>
                </div>
              </div>
              <div className="def-block">
                <div className="def-block__icon">Àṣẹ</div>
                <div className="def-block__content">
                  <div className="def-block__label">Àṣẹ — The Creative Force</div>
                  <p className="def-block__body">
                    Both Ifa Art and Orisa Art are unified by <strong>Àṣẹ</strong> — the divine
                    creative force that is activated through artistic performance. In Ifa-Orisa
                    tradition, art is not decorative but operative: it activates, transmits,
                    and sustains the living intelligence of the Odu Ifa.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="def-visual">
            <div className="dual-symbol">
              <div className="dual-symbol__half dual-symbol__half--ifa" />
              <div className="dual-symbol__half dual-symbol__half--orisa" />
              <div className="dual-symbol__divider" />
              <div className="dual-symbol__label-ifa">
                <span className="dual-symbol__name dual-symbol__ifa-name">Ifart</span>
                <span className="dual-symbol__sub">Ifa Art</span>
              </div>
              <div className="dual-symbol__label-orisa">
                <span className="dual-symbol__name dual-symbol__orisa-name">Orisart</span>
                <span className="dual-symbol__sub">Orisa Art</span>
              </div>
              <div className="dual-symbol__center-node">Dual</div>
            </div>
            <p className="dual-caption">
              IfaSchema: Orisa Art is the Dual of Ifa Art —<br/>
              both are expressions of one unified artistic intelligence
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── IFA ART SECTION ─────────────────────────────────────────────────────────

function IfartSection() {
  return (
    <section className="section section--alt" id="ifart">
      <div className="container">
        <div className="section__header section__header--center">
          <span className="section__eyebrow section__eyebrow--amber">Ifart</span>
          <h2 className="section__title">
            Ifa Art — <span className="accent--amber">The Forms of Ifart</span>
          </h2>
          <p className="section__subtitle">
            The oral, musical, and performative artistic traditions through which the wisdom of
            the 256 Odu Ifa is encoded and transmitted — from sacred chant to spoken word poetry.
          </p>
        </div>

        <div className="ifart-grid">
          {IFART_FORMS.map(f => (
            <div key={f.num} className="ifart-card" style={{ '--ia-color': f.color }}>
              <div className="ifart-card__bar" />
              <div className="ifart-card__top">
                <span className="ifart-card__sym">{f.sym}</span>
                <span className="ifart-card__num">{f.num}</span>
              </div>
              <h3 className="ifart-card__title">{f.title}</h3>
              <div className="ifart-card__sub">{f.sub}</div>
              <p className="ifart-card__body">{f.body}</p>
              <div className="ifart-card__glow" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── ORISA ART SECTION ───────────────────────────────────────────────────────

function OrisartSection() {
  return (
    <section className="section section--dark" id="orisart">
      <div className="container">
        <div className="section__header section__header--center">
          <span className="section__eyebrow section__eyebrow--violet">Orisart — The Dual</span>
          <h2 className="section__title">
            Orisa Art — <span className="accent--orisa">The Forms of Orisart</span>
          </h2>
          <p className="section__subtitle">
            The artistic traditions of Orisa knowledge — praise poetry, sacred invocation,
            ancestral masquerade song, and hunters' art. Orisa Art is the Dual of Ifa Art.
          </p>
        </div>

        <div className="dual-label-strip">
          <div className="dual-label-strip__pill dual-label-strip__pill--ifa">
            <span>Ifa Art — Ifart</span>
            <span>↑</span>
          </div>
          <span className="dual-label-strip__sep">⟺</span>
          <div className="dual-label-strip__pill dual-label-strip__pill--orisa">
            <span>↓</span>
            <span>Orisa Art — Orisart</span>
          </div>
        </div>

        <div className="orisart-grid">
          {ORISART_FORMS.map(f => (
            <div key={f.num} className="orisart-card" style={{ '--oa-color': f.color }}>
              <div className="orisart-card__bar" />
              <div className="orisart-card__top">
                <span className="orisart-card__sym">{f.sym}</span>
                <span className="orisart-card__num">{f.num}</span>
              </div>
              <h3 className="orisart-card__title">{f.title}</h3>
              <div className="orisart-card__sub">{f.sub}</div>
              <p className="orisart-card__body">{f.body}</p>
              <div className="orisart-card__glow" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── TRADITIONS SECTION ──────────────────────────────────────────────────────

function TraditionsSection() {
  const [active, setActive] = useState(0);
  const t = TRADITIONS[active];

  // Helper: derive a rough RGB from a hex string for CSS custom property
  function hexToRgb(hex) {
    const r = parseInt(hex.slice(1,3),16);
    const g = parseInt(hex.slice(3,5),16);
    const b = parseInt(hex.slice(5,7),16);
    return `${r},${g},${b}`;
  }

  return (
    <section className="section" id="traditions">
      <div className="container">
        <div className="section__header section__header--center">
          <span className="section__eyebrow section__eyebrow--teal">Living Oral Traditions</span>
          <h2 className="section__title">The 11 Traditions of Ifart &amp; Orisart</h2>
          <p className="section__subtitle">
            Eleven living oral and performative traditions of Yoruba civilization — each a
            distinct art form encoding a specific dimension of Ifa-Orisa knowledge.
          </p>
        </div>

        <div className="traditions-layout">
          <div className="traditions-tabs">
            {TRADITIONS.map((tr, i) => (
              <button
                key={i}
                className={`tradition-tab${i === active ? ' tradition-tab--active' : ''}`}
                style={{ '--tt-color': tr.color, '--tt-rgb': hexToRgb(tr.color) }}
                onClick={() => setActive(i)}
              >
                <span className="tradition-tab__sym">{tr.sym}</span>
                <span className="tradition-tab__name">{tr.title}</span>
                <span className={`tradition-tab__type-pill tradition-tab__type-pill--${tr.type}`}>
                  {tr.type === 'ifa' ? 'Ifart' : 'Orisart'}
                </span>
              </button>
            ))}
          </div>

          <div
            className="tradition-detail"
            style={{ '--td-color': t.color, '--td-rgb': hexToRgb(t.color) }}
          >
            <div className="tradition-detail__bg" />
            <div className={`tradition-detail__type-badge tradition-detail__type-badge--${t.type}`}>
              {t.type === 'ifa' ? 'Ifa Art — Ifart' : 'Orisa Art — Orisart'}
            </div>
            <div className="tradition-detail__header">
              <div className="tradition-detail__sym">{t.sym}</div>
              <div className="tradition-detail__meta">
                <div className="tradition-detail__title">{t.title}</div>
                <div className="tradition-detail__yoruba">{t.title}</div>
                <div className="tradition-detail__role">{t.role}</div>
              </div>
            </div>
            <p className="tradition-detail__body">{t.body}</p>
            <div className="tradition-detail__significance">
              <div className="tradition-detail__sig-label">Cultural Significance</div>
              <p className="tradition-detail__sig-body">{t.significance}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── DUALITY SECTION ─────────────────────────────────────────────────────────

function DualitySection() {
  return (
    <section className="section section--alt" id="duality">
      <div className="container">
        <div className="section__header section__header--center">
          <span className="section__eyebrow section__eyebrow--teal">The Principle of Duality</span>
          <h2 className="section__title">
            Ifart &amp; Orisart as <span className="accent--teal">One Unified System</span>
          </h2>
          <p className="section__subtitle">
            Orisa Art is not separate from Ifa Art — it is its Dual. Together, Ifart and Orisart
            constitute the complete artistic intelligence of the IFA Internet, grounded in the
            Duality principle of the 256 Odu Ifa.
          </p>
        </div>

        <div className="duality-grid">
          {/* Ifa Art column */}
          <div className="duality-card duality-card--ifa">
            <span className="duality-card__badge">Ifa Art</span>
            <div className="duality-card__title">Ifart</div>
            <div className="duality-card__aka">Also written: Ifa Art</div>
            <p className="duality-card__body">
              Ifa Art is the artistic dimension of Ifa knowledge — oral, musical, and performative
              traditions through which the 256 Odu Ifa is encoded and transmitted. Ifart is
              characterized by its <strong>precision</strong>: tonal exactness activates the
              correct Odu, making art a form of knowledge technology. It is fundamentally
              intellectual, oracular, and archival.
            </p>
            <ul className="duality-card__traits">
              {['Ìyẹ̀rẹ Ifá — Sacred Ifa Chant', 'Ifá Kíkì / Rírán — Divination Recitation', 'Ewì — Poetry & Spoken Word', 'Orin Ifá — Sacred Song'].map((t, i) => (
                <li key={i} className="duality-card__trait">
                  <span className="duality-card__trait-dot" />
                  {t}
                </li>
              ))}
            </ul>
            <div className="duality-card__glow" />
          </div>

          {/* Divider */}
          <div className="duality-divider">
            <div className="duality-divider__line" />
            <div className="duality-divider__node">Dual<br/>⟺</div>
            <div className="duality-divider__line" />
          </div>

          {/* Orisa Art column */}
          <div className="duality-card duality-card--orisa">
            <span className="duality-card__badge">Orisa Art — The Dual</span>
            <div className="duality-card__title">Orisart</div>
            <div className="duality-card__aka">Also written: Orisa Art</div>
            <p className="duality-card__body">
              Orisa Art is the Dual of Ifa Art — the artistic forms through which Orisa knowledge,
              identity, and spiritual power are expressed and transmitted. Orisart is characterized
              by its <strong>presence</strong>: through invocation, praise, and embodiment, Orisa
              are made present in the human world. It is fundamentally devotional, communal, and
              embodied.
            </p>
            <ul className="duality-card__traits">
              {['Oríkì — Praise Poetry & Orature', 'Òrìṣà Kíkì / Pípè — Orisa Invocation', 'Ẹ̀sà / Egúngún — Ancestral Masquerade', 'Ìjálá / Ìrèmọ̀jé — Hunters\' Art', 'Rárà — Praise Elegy', 'Arò Ògbóni — Sacred Society Art'].map((t, i) => (
                <li key={i} className="duality-card__trait">
                  <span className="duality-card__trait-dot" />
                  {t}
                </li>
              ))}
            </ul>
            <div className="duality-card__glow" />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── PATH / LEARN SECTION ────────────────────────────────────────────────────

function PathSection() {
  return (
    <section className="section section--dark" id="path">
      <div className="container">
        <div className="section__header section__header--center">
          <span className="section__eyebrow section__eyebrow--amber">Learning Path</span>
          <h2 className="section__title">Engaging Ifa Art &amp; Orisa Art</h2>
          <p className="section__subtitle">
            A structured approach to entering the artistic knowledge systems of the IFA Internet —
            from Ifa Art foundations to Orisa Art mastery and the unified Dual perspective.
          </p>
        </div>
        <div className="path-steps">
          {PATH_STEPS.map((s, i) => (
            <div key={i} className="path-step" style={{ '--ps-color': s.color }}>
              <div className="path-step__num">{s.num}</div>
              <div className="path-step__title">{s.title}</div>
              <p className="path-step__body">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CHALLENGE COMPONENTS ────────────────────────────────────────────────────

function PitArrow() {
  const arrowX = 100, arrowY = 50, arrowLen = 13;
  return (
    <svg viewBox="0 0 100 100" style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',overflow:'visible',pointerEvents:'none',color:'var(--odu-color)',opacity:0.95}} aria-hidden="true">
      <line x1={arrowX} y1={arrowY-arrowLen*0.5} x2={arrowX} y2={arrowY+arrowLen*0.5} stroke="currentColor" strokeWidth={3} strokeLinecap="round"/>
      <polyline points={`${arrowX-arrowLen*0.42},${arrowY+arrowLen*0.1} ${arrowX},${arrowY+arrowLen*0.56} ${arrowX+arrowLen*0.42},${arrowY+arrowLen*0.1}`} fill="none" stroke="currentColor" strokeWidth={3} strokeLinejoin="round" strokeLinecap="round"/>
    </svg>
  );
}

function OyekuPitArrow() {
  const arrowX = 0, arrowY = 50, arrowLen = 13;
  return (
    <svg viewBox="0 0 100 100" style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',overflow:'visible',pointerEvents:'none',color:'var(--odu-color)',opacity:0.95}} aria-hidden="true">
      <line x1={arrowX} y1={arrowY-arrowLen*0.5} x2={arrowX} y2={arrowY+arrowLen*0.5} stroke="currentColor" strokeWidth={3} strokeLinecap="round"/>
      <polyline points={`${arrowX-arrowLen*0.42},${arrowY+arrowLen*0.1} ${arrowX},${arrowY+arrowLen*0.56} ${arrowX+arrowLen*0.42},${arrowY+arrowLen*0.1}`} fill="none" stroke="currentColor" strokeWidth={3} strokeLinejoin="round" strokeLinecap="round"/>
    </svg>
  );
}

function IrokeSVG() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 52" width="9" height="30" aria-hidden="true">
      <polygon points="7,0 5,10 9,10" fill="#f0d5a0"/>
      <line x1="7" y1="0" x2="5" y2="10" stroke="#c8a060" strokeWidth="0.4"/>
      <line x1="7" y1="0" x2="9" y2="10" stroke="#c8a060" strokeWidth="0.4"/>
      <ellipse cx="7" cy="18" rx="5.2" ry="7.5" fill="#e8c882" stroke="#c8a060" strokeWidth="0.4"/>
      <path d="M4,13.5 Q7,12 10,13.5" stroke="#a07840" strokeWidth="0.7" fill="none"/>
      <ellipse cx="5.2" cy="15.8" rx="1.1" ry="1.3" fill="#1a0a00"/>
      <ellipse cx="5.2" cy="15.4" rx="0.4" ry="0.4" fill="#fff8e0" opacity="0.5"/>
      <ellipse cx="8.8" cy="15.8" rx="1.1" ry="1.3" fill="#1a0a00"/>
      <ellipse cx="8.8" cy="15.4" rx="0.4" ry="0.4" fill="#fff8e0" opacity="0.5"/>
      <path d="M7,17.5 L6.2,20 L7,20.5 L7.8,20 Z" fill="#c09050"/>
      <path d="M5.5,22 Q7,23.5 8.5,22" stroke="#1a0a00" strokeWidth="0.7" fill="none" strokeLinecap="round"/>
      <path d="M5,24 Q7,26.5 9,24" stroke="#c8a060" strokeWidth="0.4" fill="none"/>
      <rect x="5" y="25.5" width="4" height="2.5" rx="1" fill="#d4a427" stroke="#a07820" strokeWidth="0.3"/>
      <rect x="5.8" y="28" width="2.4" height="15" rx="1" fill="#f0d5a0" stroke="#c8a060" strokeWidth="0.3"/>
      <rect x="5.2" y="34" width="3.6" height="2" rx="0.6" fill="#d4a427" stroke="#a07820" strokeWidth="0.3"/>
      <line x1="7" y1="36.5" x2="7" y2="43" stroke="#c8a060" strokeWidth="0.3" strokeDasharray="1,1.5"/>
      <ellipse cx="7" cy="44" rx="6" ry="2.8" fill="#e8c882" stroke="#c8a060" strokeWidth="0.4"/>
      <ellipse cx="7" cy="46" rx="4.5" ry="2" fill="#d4a050" stroke="#a07820" strokeWidth="0.3"/>
    </svg>
  );
}

function ClockOduGlyph({ code, color, nr }) {
  const g = clockGlyph(code);
  const isCompound = g.length > 1;
  const fontSize = isCompound ? nr * 0.56 : nr * 0.78;
  return (
    <text textAnchor="middle" dominantBaseline="central"
      fontFamily="Georgia, 'Times New Roman', serif" fontWeight="700"
      fontSize={fontSize} letterSpacing={isCompound ? '-0.20em' : '0'} fill={color}>
      {g}
    </text>
  );
}

function FlameBowl({ x, y, idx, isLit, onToggle }) {
  const d1 = `${(0.65 + (idx % 6) * 0.09).toFixed(2)}s`;
  const d2 = `${(0.55 + (idx % 5) * 0.08).toFixed(2)}s`;
  const beg = `${(idx * 0.07).toFixed(2)}s`;
  const color = LAMP_COLORS[idx];
  const name = ODU[idx].name;
  const oryBase = isLit ? 11 : 8;
  const ory1 = isLit ? [11,9,12,10,11] : [8,6.5,8.5,7,8];
  const iry1 = isLit ? [7.5,6,8,7,7.5] : [5,4,5.5,4.5,5];
  return (
    <g onClick={onToggle} style={{cursor:'pointer'}} role="button" aria-label={`${name} lamp — ${isLit ? 'lit' : 'unlit'}`}>
      <ellipse cx={x} cy={y-8} rx={26} ry={34} fill="transparent"/>
      {isLit && <>
        <ellipse cx={x} cy={y-6} rx={38} ry={48} fill={color} opacity={0.10} filter="url(#ch-blur-soft)"/>
        <ellipse cx={x} cy={y-5} rx={22} ry={28} fill={color} opacity={0.20} filter="url(#ch-blur)"/>
        <ellipse cx={x} cy={y-4} rx={12} ry={15} fill={color} opacity={0.40} filter="url(#ch-blur)"/>
      </>}
      <ellipse cx={x} cy={y-4} rx={9} ry={11} fill={isLit ? color : '#e8772a'} opacity={isLit ? 0.28 : 0.15} filter="url(#ch-blur)"/>
      <circle cx={x} cy={y-7} r={15} fill="none" stroke={color} strokeWidth={isLit ? 1.5 : 0.8} opacity={isLit ? 0.55 : 0.22} strokeDasharray={isLit ? 'none' : '3 4'}/>
      <path d={`M ${x-5},${y+2} Q ${x},${y+7} ${x+5},${y+2}`} fill="none" stroke={isLit ? color : '#8b6914'} strokeWidth={2}/>
      <line x1={x-5} y1={y+2} x2={x+5} y2={y+2} stroke={isLit ? color : '#8b6914'} strokeWidth={2.2}/>
      <ellipse cx={x} cy={y-6} rx={isLit ? 5.5 : 4} ry={oryBase} fill={isLit ? color : '#e8772a'}>
        <animate attributeName="ry" values={ory1.join(';')} dur={d1} begin={beg} repeatCount="indefinite"/>
        <animate attributeName="cy" values={`${y-6};${y-7.5};${y-5};${y-7};${y-6}`} dur={d1} begin={beg} repeatCount="indefinite"/>
      </ellipse>
      <ellipse cx={x} cy={y-9} rx={2.2} ry={isLit ? 7 : 5} fill={isLit ? 'rgba(255,250,220,0.95)' : '#fde060'}>
        <animate attributeName="ry" values={iry1.join(';')} dur={d2} begin={beg} repeatCount="indefinite"/>
        <animate attributeName="cy" values={`${y-9};${y-11};${y-8};${y-10};${y-9}`} dur={d2} begin={beg} repeatCount="indefinite"/>
      </ellipse>
      <ellipse cx={x} cy={y-14} rx={isLit ? 1.5 : 1} ry={isLit ? 3 : 2} fill="rgba(255,252,220,0.92)"/>
      {isLit && (
        <text x={x} y={y+18} textAnchor="middle" fontSize={7.5} fontFamily="'Space Grotesk', sans-serif" fill={color} opacity={0.88} fontWeight="600" style={{pointerEvents:'none',userSelect:'none'}}>{name}</text>
      )}
    </g>
  );
}

function AtupaSVG({ litLamps, onToggleLamp }) {
  const W = 290, H = 410;
  const cx = W / 2;
  const baseY = H - 46;
  const topY = 22;
  const poleH = baseY - topY;
  const levels = Array.from({length:8}, (_, i) => ({
    y:   Math.round(topY + poleH * (0.04 + i * 0.122)),
    len: Math.round(110 - i * 12),
  }));
  const litCount = litLamps.size;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="atupa-svg"
      style={{width:'100%',height:'auto',display:'block',margin:'0 auto',overflow:'visible',touchAction:'manipulation',WebkitTapHighlightColor:'transparent'}}
      aria-label="Àtùpà Olójú Mẹ́rìndínlógún — 16-Point Lamp Stand">
      <defs>
        <radialGradient id="ch-glow" cx="50%" cy="50%">
          <stop offset="0%"   stopColor={`rgba(240,150,12,${0.12 + litCount * 0.04})`}/>
          <stop offset="65%"  stopColor={`rgba(232,100,0,${0.04 + litCount * 0.015})`}/>
          <stop offset="100%" stopColor="transparent"/>
        </radialGradient>
        <linearGradient id="ch-pole" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#9a7820"/>
          <stop offset="38%"  stopColor="#f0c840"/>
          <stop offset="62%"  stopColor="#f0c840"/>
          <stop offset="100%" stopColor="#9a7820"/>
        </linearGradient>
        <filter id="ch-blur" x="-120%" y="-120%" width="340%" height="340%">
          <feGaussianBlur stdDeviation="3.5"/>
        </filter>
        <filter id="ch-blur-soft" x="-200%" y="-200%" width="500%" height="500%">
          <feGaussianBlur stdDeviation="9"/>
        </filter>
      </defs>
      <ellipse cx={cx} cy={H * 0.40} rx={135} ry={H * 0.43} fill="url(#ch-glow)"/>
      <rect x={cx-26} y={baseY}    width={52} height={10} rx={5} fill="#6b4f10"/>
      <rect x={cx-15} y={baseY-9}  width={30} height={10} rx={3} fill="#8b6514"/>
      <rect x={cx-6}  y={baseY-17} width={12} height={9}  rx={2} fill="#a87c1e"/>
      <rect x={cx-3} y={topY} width={6} height={poleH} rx={3} fill="url(#ch-pole)"/>
      {levels.map((lv, li) => {
        const idxL = li * 2 + 1;
        const idxR = li * 2;
        return (
          <g key={li}>
            <line x1={cx-2} y1={lv.y} x2={cx-lv.len} y2={lv.y} stroke={litLamps.has(idxL) ? LAMP_COLORS[idxL] : '#c9a227'} strokeWidth={1.8} strokeLinecap="round" style={{transition:'stroke 0.4s'}}/>
            <line x1={cx+2} y1={lv.y} x2={cx+lv.len} y2={lv.y} stroke={litLamps.has(idxR) ? LAMP_COLORS[idxR] : '#c9a227'} strokeWidth={1.8} strokeLinecap="round" style={{transition:'stroke 0.4s'}}/>
            <FlameBowl x={cx-lv.len} y={lv.y} idx={idxL} isLit={litLamps.has(idxL)} onToggle={() => onToggleLamp(idxL)}/>
            <FlameBowl x={cx+lv.len} y={lv.y} idx={idxR} isLit={litLamps.has(idxR)} onToggle={() => onToggleLamp(idxR)}/>
          </g>
        );
      })}
      <circle cx={cx} cy={topY-10} r={9}   fill="#c9a227"/>
      <circle cx={cx} cy={topY-10} r={5.5} fill="#f0c840"/>
      <circle cx={cx} cy={topY-10} r={2}   fill="rgba(255,252,200,0.95)"/>
    </svg>
  );
}

function OduMiniCircle({ odu, isFlipped, isFlipping, isPulsing, onFlip }) {
  const dualNum = odu.num % 2 === 1 ? odu.num + 1 : odu.num - 1;
  const dispOdu = isFlipped ? ODU[dualNum - 1] : odu;
  const code = ODU_CODES[dispOdu.num - 1];
  const isOdd = (dispOdu.num - 1) % 2 === 1;
  let cls = 'odu-mini-circ';
  if (isFlipping) cls += ' odu-mini-circ--flipping';
  if (isFlipped)  cls += ' odu-mini-circ--flipped';
  if (isPulsing)  cls += ' odu-mini-circ--pulse';
  return (
    <div className={cls} style={{'--mc': dispOdu.color}} onClick={() => onFlip && onFlip(odu.num)}>
      <div className="odu-mini-ring">
        {isOdd ? <OyekuPitArrow/> : <PitArrow/>}
        <div className="odu-mini-dots">
          {code.split('').map((b, ri) => (
            <div key={ri} className="odu-mini-dotrow">
              {[0,1].map(col => (
                <span key={col} className={`odu-mini-dot odu-mini-dot--${b === '1' ? 'on' : 'off'}`}/>
              ))}
            </div>
          ))}
        </div>
      </div>
      <span className="odu-mini-label">{dispOdu.name} Meji</span>
    </div>
  );
}

function IfaClockArt() {
  const [flipped,   setFlipped]   = useState(new Set());
  const [spinning,  setSpinning]  = useState(null);
  const [burst,     setBurst]     = useState(null);
  const [activePos, setActivePos] = useState(null);
  const [mobile,    setMobile]    = useState(
    typeof window !== 'undefined' && window.matchMedia('(max-width: 519px)').matches
  );
  const busy = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 519px)');
    const handler = e => setMobile(e.matches);
    mq.addEventListener('change', handler);
    setMobile(mq.matches);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const SZ      = mobile ? 380 : 480;
  const CX      = SZ / 2, CY = SZ / 2;
  const R_RING  = mobile ? 149 : 188;
  const R_ORBIT = mobile ? 120 : 152;
  const R_NODE  = mobile ? 22  : 27;
  const R_MED   = mobile ? 52  : 66;
  const R_HIT   = mobile ? R_NODE + 16 : R_NODE + 6;

  const pAngle = p => (-90 + p * 22.5) * Math.PI / 180;

  function handleClockClick(pos, e) {
    e.stopPropagation();
    if (busy.current) return;
    busy.current = true;
    setSpinning(pos);
    setBurst({pos, key: Date.now()});
    setActivePos(pos);
    setTimeout(() => {
      setFlipped(prev => {
        const n = new Set(prev);
        n.has(pos) ? n.delete(pos) : n.add(pos);
        return n;
      });
    }, 290);
    setTimeout(() => { setSpinning(null); busy.current = false; }, 580);
    setTimeout(() => setBurst(null), 720);
  }

  function oduAt(pos) {
    const orig = CLOCK_MAP[pos];
    const idx  = flipped.has(pos) ? clockDual(orig) : orig;
    return { odu: ODU[idx], code: ODU_CODES[idx], idx, orig, isDual: flipped.has(pos) };
  }

  const apd   = activePos !== null ? oduAt(activePos) : null;
  const aOrig = activePos !== null ? ODU[CLOCK_MAP[activePos]] : null;
  const aDual = aOrig ? ODU[clockDual(CLOCK_MAP[activePos])] : null;

  return (
    <div className="ifa-clock-art-wrap" onClick={() => setActivePos(null)}>
      <p className="challenge-art-caption">Ọpọ́n Ifa Olójú Mẹ́rìndínlógún · The Ifa Clock</p>
      <p className="challenge-art-sub">Tap any Odu glyph to flip it to its Ifa dual · 8 dual pairs · 16 Odu</p>

      <svg viewBox={`0 0 ${SZ} ${SZ}`} className="ifa-clock-svg"
           aria-label="Ifa Clock — 16 Odu in a circle, dual pairs face each other">
        <defs>
          <radialGradient id="clk-bg" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#140f04"/>
            <stop offset="100%" stopColor="#060a10"/>
          </radialGradient>
        </defs>

        <circle cx={CX} cy={CY} r={R_RING} fill="url(#clk-bg)"/>
        <circle cx={CX} cy={CY} r={R_RING} fill="none" stroke="#c9a227" strokeWidth={3}/>
        <circle cx={CX} cy={CY} r={R_RING-16} fill="none" stroke="rgba(201,162,39,0.13)" strokeWidth={1} strokeDasharray="2 7"/>

        {Array.from({length:16}, (_, p) => {
          const a = pAngle(p);
          return <line key={p} x1={CX+(R_RING-4)*Math.cos(a)} y1={CY+(R_RING-4)*Math.sin(a)} x2={CX+(R_RING-14)*Math.cos(a)} y2={CY+(R_RING-14)*Math.sin(a)} stroke="rgba(201,162,39,0.48)" strokeWidth={2} strokeLinecap="round"/>;
        })}

        {Array.from({length:8}, (_, i) => {
          const a1=pAngle(i), a2=pAngle(i+8);
          const hot = activePos !== null && (activePos === i || activePos === i+8);
          return <line key={i} x1={CX+R_ORBIT*Math.cos(a1)} y1={CY+R_ORBIT*Math.sin(a1)} x2={CX+R_ORBIT*Math.cos(a2)} y2={CY+R_ORBIT*Math.sin(a2)} stroke={hot ? "#d4a427" : "rgba(201,162,39,0.08)"} strokeWidth={hot ? 1.5 : 0.6} strokeDasharray="3 6" className={hot ? 'ifa-clk-pair--hot' : ''} style={{transition:'stroke 0.4s, stroke-width 0.4s'}}/>;
        })}

        {burst && (() => {
          const a = pAngle(burst.pos);
          const bx = CX + R_ORBIT * Math.cos(a);
          const by = CY + R_ORBIT * Math.sin(a);
          const { odu } = oduAt(burst.pos);
          return [0,1,2].map(ri => (
            <circle key={`${burst.key}-${ri}`} cx={bx} cy={by} r={R_NODE} fill="none" stroke={odu.color} strokeWidth={2.5 - ri * 0.6} className="ifa-clk-burst" style={{animationDelay:`${ri * 88}ms`}}/>
          ));
        })()}

        {Array.from({length:16}, (_, pos) => {
          const angle = pAngle(pos);
          const nx = CX + R_ORBIT * Math.cos(angle);
          const ny = CY + R_ORBIT * Math.sin(angle);
          const { odu, code, isDual } = oduAt(pos);
          const isSpin = spinning === pos;
          const hot = activePos !== null && (pos === activePos || pos === (activePos + 8) % 16);
          return (
            <g key={pos} transform={`translate(${nx},${ny})`} onClick={e => handleClockClick(pos, e)} style={{cursor:'pointer'}} aria-label={`${odu.name}${isDual ? ' (dual)' : ''} — tap to flip`}>
              <circle r={R_HIT} fill="transparent"/>
              <g className={isSpin ? 'ifa-clk-glyph--spin' : ''} style={{transformBox:'fill-box',transformOrigin:'center'}}>
                <ClockOduGlyph code={code} color={odu.color} nr={R_NODE}/>
              </g>
            </g>
          );
        })}

        <circle cx={CX} cy={CY} r={R_MED} fill="url(#clk-bg)" stroke="rgba(201,162,39,0.38)" strokeWidth={1.5}/>
        <circle cx={CX} cy={CY} r={R_MED-8} fill="none" stroke="rgba(201,162,39,0.10)" strokeWidth={1} strokeDasharray="2 5"/>

        {!apd && (
          <g>
            <text x={CX} y={mobile ? CY+2 : CY+5} textAnchor="middle" dominantBaseline="middle" fontSize={mobile ? 22 : 26} fill="rgba(201,162,39,0.26)" fontFamily="serif">◎</text>
            <text x={CX} y={mobile ? CY+20 : CY+27} textAnchor="middle" dominantBaseline="middle" fontSize={mobile ? 9 : 7} fill="rgba(201,162,39,0.20)" fontFamily="'Space Grotesk',system-ui,sans-serif" letterSpacing="0.12em">16 ODU</text>
          </g>
        )}

        {apd && (
          <g key={`ctr-${apd.idx}-${apd.isDual}`} className="ifa-clk-ctr-text">
            <text x={CX} y={mobile ? CY-10 : CY-22} textAnchor="middle" dominantBaseline="middle" fontSize={mobile ? 14 : 11} fontWeight="800" fontFamily="'Space Grotesk',system-ui,sans-serif" fill={apd.odu.color}>{apd.odu.name}</text>
            <text x={CX} y={mobile ? CY+8 : CY-8} textAnchor="middle" dominantBaseline="middle" fontSize={mobile ? 9.5 : 7.5} fontFamily="sans-serif" fill="rgba(201,162,39,0.55)">{apd.isDual ? `↩ ${aOrig.name}` : `→ ${aDual.name}`}</text>
            {!mobile && <>
              <text x={CX} y={CY+6} textAnchor="middle" dominantBaseline="middle" fontSize={6.5} fontFamily="sans-serif" fill="#4a5565">{apd.odu.field}</text>
              <text x={CX} y={CY+19} textAnchor="middle" dominantBaseline="middle" fontSize={5.5} fontFamily="'Space Grotesk',system-ui,sans-serif" fill="rgba(201,162,39,0.22)" letterSpacing="0.06em">{apd.odu.meji.toUpperCase()}</text>
            </>}
          </g>
        )}
      </svg>

      <div className={`ifa-clock-panel${apd ? ' ifa-clock-panel--open' : ''}`}>
        {apd && (
          <div className="ifa-clock-panel-inner" style={{borderColor: apd.odu.color + '99'}}>
            <div className="ifa-clock-ph">
              <span className="ifa-clock-ph-meji" style={{color: apd.odu.color}}>{apd.odu.meji}</span>
              {apd.isDual && aOrig && (
                <span className="ifa-clock-ph-badge" style={{borderColor: aOrig.color + '55', color: aOrig.color}}>dual of {aOrig.name}</span>
              )}
            </div>
            <p className="ifa-clock-p-tagline">"{apd.odu.tagline}"</p>
            <p className="ifa-clock-p-field">{apd.odu.field}</p>
            <p className="ifa-clock-p-hint">tap again to restore · tap outside to close</p>
          </div>
        )}
      </div>
    </div>
  );
}

function IfaWheelPanel() {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const [highlightVisible, setHighlight] = useState(false);
  const [btnText, setBtnText] = useState('🎯 TUNE THE IFA ANTENNA');
  const [specsOpen, setSpecsOpen] = useState(false);
  const rotorRef = useRef(null);
  const angleRef = useRef(0);
  const audioRef = useRef(null);

  function getAudioCtx() {
    if (!audioRef.current) audioRef.current = new (window.AudioContext || window.webkitAudioContext)();
    return audioRef.current;
  }

  function playWheelSpinSound() {
    try {
      const ctx = getAudioCtx(), now = ctx.currentTime, dur = 4.4;
      const whirOsc = ctx.createOscillator(), whirFilt = ctx.createBiquadFilter(), whirGain = ctx.createGain();
      whirOsc.type = 'sawtooth'; whirOsc.frequency.setValueAtTime(320, now); whirOsc.frequency.exponentialRampToValueAtTime(48, now + dur);
      whirFilt.type = 'lowpass'; whirFilt.frequency.setValueAtTime(900, now); whirFilt.frequency.exponentialRampToValueAtTime(180, now + dur); whirFilt.Q.value = 2.5;
      whirGain.gain.setValueAtTime(0, now); whirGain.gain.linearRampToValueAtTime(0.13, now + 0.08); whirGain.gain.setValueAtTime(0.13, now + dur - 0.5); whirGain.gain.linearRampToValueAtTime(0, now + dur);
      whirOsc.connect(whirFilt); whirFilt.connect(whirGain); whirGain.connect(ctx.destination); whirOsc.start(now); whirOsc.stop(now + dur + 0.1);
      for (let i = 0; i < 32; i++) {
        (function(idx) {
          const t = now + dur * Math.pow(idx / 32, 0.45);
          const len = Math.floor(ctx.sampleRate * 0.022);
          const buf = ctx.createBuffer(1, len, ctx.sampleRate);
          const d = buf.getChannelData(0);
          for (let s = 0; s < len; s++) d[s] = (Math.random()*2-1) * Math.exp(-s/(len*0.25));
          const src = ctx.createBufferSource(), filt = ctx.createBiquadFilter(), gain = ctx.createGain();
          src.buffer = buf; filt.type = 'bandpass'; filt.frequency.value = 900 + idx*18; filt.Q.value = 5; gain.gain.value = 0.28 - idx*0.004;
          src.connect(filt); filt.connect(gain); gain.connect(ctx.destination); src.start(t);
        })(i);
      }
    } catch(e) {}
  }

  function spin() {
    if (spinning) return;
    setSpinning(true); setResult(null); setHighlight(false); setBtnText('🌀 Tuning...');
    const idx = Math.floor(Math.random() * 16);
    const fullSpins = (5 + Math.floor(Math.random() * 4)) * 360;
    const targetAngle = (348.75 - idx * 22.5 + 360) % 360;
    const currentMod = angleRef.current % 360;
    let delta = (targetAngle - currentMod + 360) % 360;
    if (delta < 45) delta += 360;
    angleRef.current += delta + fullSpins;
    rotorRef.current.style.transition = 'transform 4.5s cubic-bezier(0.17,0.67,0.12,0.99)';
    rotorRef.current.style.transform = `rotate(${angleRef.current}deg)`;
    playWheelSpinSound();
    setTimeout(() => {
      setSpinning(false); setHighlight(true);
      setTimeout(() => { setResult(IFA_ODU_WHEEL[idx]); setBtnText('🎯 TUNE AGAIN!'); }, 900);
    }, 4600);
  }

  function spinAgain() { setResult(null); setHighlight(false); setTimeout(spin, 60); }

  return (
    <div className="challenge-wheel-panel">
      <p className="challenge-art-caption">Ọpọ́n Ifá — IFA Wheel</p>
      <p className="challenge-art-sub">Ọpọ́n Ifá Olójú Mẹ́rìndínlógún · Spin to reveal your Odu</p>

      <div className="challenge-wheel-art">
        <div className="wheel-pointer-wrap" aria-hidden="true">
          <div className="wheel-pointer-label">▼ YOUR ODU ▼</div>
          <div className="wheel-pointer-tri"></div>
        </div>

        <div className="wheel-rotor" ref={rotorRef}>
          <svg className="ifa-wheel-svg" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ọpọn Ifá — Ifa Wheel Spinner with 16 Sacred Odu Divisions">
            <defs>
              <radialGradient id="chlWhlCG" cx="50%" cy="50%" r="50%">
                <stop offset="0%"   stopColor="#f0d060"/>
                <stop offset="50%"  stopColor="#b8860b"/>
                <stop offset="100%" stopColor="#6b4a0a"/>
              </radialGradient>
              <radialGradient id="chlWhlBG" cx="50%" cy="50%" r="50%">
                <stop offset="0%"   stopColor="#0d2e10"/>
                <stop offset="100%" stopColor="#040b05"/>
              </radialGradient>
            </defs>
            <circle cx="200" cy="200" r="199" fill="url(#chlWhlBG)"/>
            <path d="M200,200 L200,8      A192,192,0,0,1,273.5,22.6  Z" fill="#1a5e28"/>
            <path d="M200,200 L273.5,22.6  A192,192,0,0,1,335.8,64.2  Z" fill="#7a2e0c"/>
            <path d="M200,200 L335.8,64.2  A192,192,0,0,1,377.4,126.5 Z" fill="#1e6b2e"/>
            <path d="M200,200 L377.4,126.5 A192,192,0,0,1,392,200     Z" fill="#6b2808"/>
            <path d="M200,200 L392,200     A192,192,0,0,1,377.4,273.5 Z" fill="#1a5e28"/>
            <path d="M200,200 L377.4,273.5 A192,192,0,0,1,335.8,335.8 Z" fill="#7a2e0c"/>
            <path d="M200,200 L335.8,335.8 A192,192,0,0,1,273.5,377.4 Z" fill="#1e6b2e"/>
            <path d="M200,200 L273.5,377.4 A192,192,0,0,1,200,392     Z" fill="#6b2808"/>
            <path d="M200,200 L200,392     A192,192,0,0,1,126.5,377.4 Z" fill="#1a5e28"/>
            <path d="M200,200 L126.5,377.4 A192,192,0,0,1,64.2,335.8  Z" fill="#7a2e0c"/>
            <path d="M200,200 L64.2,335.8  A192,192,0,0,1,22.6,273.5  Z" fill="#1e6b2e"/>
            <path d="M200,200 L22.6,273.5  A192,192,0,0,1,8,200       Z" fill="#6b2808"/>
            <path d="M200,200 L8,200       A192,192,0,0,1,22.6,126.5  Z" fill="#1a5e28"/>
            <path d="M200,200 L22.6,126.5  A192,192,0,0,1,64.2,64.2   Z" fill="#7a2e0c"/>
            <path d="M200,200 L64.2,64.2   A192,192,0,0,1,126.5,22.6  Z" fill="#1e6b2e"/>
            <path d="M200,200 L126.5,22.6  A192,192,0,0,1,200,8       Z" fill="#6b2808"/>
            <circle cx="200" cy="200" r="135" fill="none" stroke="#d4a427" strokeWidth="2.2" opacity="0.85"/>
            <circle cx="200" cy="200" r="142" fill="none" stroke="rgba(212,164,39,0.25)" strokeWidth="0.8"/>
            <g stroke="#d4a427" strokeWidth="1.4" opacity="0.88">
              <line x1="200" y1="200" x2="200"   y2="8"/>
              <line x1="200" y1="200" x2="273.5" y2="22.6"/>
              <line x1="200" y1="200" x2="335.8" y2="64.2"/>
              <line x1="200" y1="200" x2="377.4" y2="126.5"/>
              <line x1="200" y1="200" x2="392"   y2="200"/>
              <line x1="200" y1="200" x2="377.4" y2="273.5"/>
              <line x1="200" y1="200" x2="335.8" y2="335.8"/>
              <line x1="200" y1="200" x2="273.5" y2="377.4"/>
              <line x1="200" y1="200" x2="200"   y2="392"/>
              <line x1="200" y1="200" x2="126.5" y2="377.4"/>
              <line x1="200" y1="200" x2="64.2"  y2="335.8"/>
              <line x1="200" y1="200" x2="22.6"  y2="273.5"/>
              <line x1="200" y1="200" x2="8"     y2="200"/>
              <line x1="200" y1="200" x2="22.6"  y2="126.5"/>
              <line x1="200" y1="200" x2="64.2"  y2="64.2"/>
              <line x1="200" y1="200" x2="126.5" y2="22.6"/>
            </g>
            <g fill="#d4a427">
              <circle cx="200"   cy="8"     r="3.2"/><circle cx="273.5" cy="22.6"  r="3.2"/><circle cx="335.8" cy="64.2"  r="3.2"/>
              <circle cx="377.4" cy="126.5" r="3.2"/><circle cx="392"   cy="200"   r="3.2"/><circle cx="377.4" cy="273.5" r="3.2"/>
              <circle cx="335.8" cy="335.8" r="3.2"/><circle cx="273.5" cy="377.4" r="3.2"/><circle cx="200"   cy="392"   r="3.2"/>
              <circle cx="126.5" cy="377.4" r="3.2"/><circle cx="64.2"  cy="335.8" r="3.2"/><circle cx="22.6"  cy="273.5" r="3.2"/>
              <circle cx="8"     cy="200"   r="3.2"/><circle cx="22.6"  cy="126.5" r="3.2"/><circle cx="64.2"  cy="64.2"  r="3.2"/>
              <circle cx="126.5" cy="22.6"  r="3.2"/>
            </g>
            <circle cx="200" cy="200" r="193" fill="none" stroke="#d4a427" strokeWidth="2.8"/>
            <circle cx="200" cy="200" r="186" fill="none" stroke="rgba(212,164,39,0.22)" strokeWidth="0.8"/>
            <g fontSize="13" fontWeight="900" fontFamily="Georgia,'Times New Roman',serif" textAnchor="middle" dominantBaseline="middle">
              <text x="231.2" y="43.1"  fill="#ffffff" transform="rotate(-78.75,231.2,43.1)">1</text>
              <text x="288.9" y="67.0"  fill="#f5e8c0" transform="rotate(-56.25,288.9,67.0)">2</text>
              <text x="333.0" y="111.1" fill="#ffffff" transform="rotate(-33.75,333.0,111.1)">3</text>
              <text x="356.9" y="168.8" fill="#f5e8c0" transform="rotate(-11.25,356.9,168.8)">4</text>
              <text x="356.9" y="231.2" fill="#ffffff" transform="rotate(11.25,356.9,231.2)">5</text>
              <text x="333.0" y="288.9" fill="#f5e8c0" transform="rotate(33.75,333.0,288.9)">6</text>
              <text x="288.9" y="333.0" fill="#ffffff" transform="rotate(56.25,288.9,333.0)">7</text>
              <text x="231.2" y="356.9" fill="#f5e8c0" transform="rotate(78.75,231.2,356.9)">8</text>
              <text x="168.8" y="356.9" fill="#ffffff" transform="rotate(-78.75,168.8,356.9)">9</text>
              <text x="111.1" y="333.0" fill="#f5e8c0" transform="rotate(-56.25,111.1,333.0)">10</text>
              <text x="67.0"  y="288.9" fill="#ffffff" transform="rotate(-33.75,67.0,288.9)">11</text>
              <text x="43.1"  y="231.2" fill="#f5e8c0" transform="rotate(-11.25,43.1,231.2)">12</text>
              <text x="43.1"  y="168.8" fill="#ffffff" transform="rotate(11.25,43.1,168.8)">13</text>
              <text x="67.0"  y="111.1" fill="#f5e8c0" transform="rotate(33.75,67.0,111.1)">14</text>
              <text x="111.1" y="67.0"  fill="#ffffff" transform="rotate(56.25,111.1,67.0)">15</text>
              <text x="168.8" y="43.1"  fill="#f5e8c0" transform="rotate(78.75,168.8,43.1)">16</text>
            </g>
            <g fontSize="7.5" fontFamily="Georgia,'Times New Roman',serif" textAnchor="middle" dominantBaseline="middle" letterSpacing="0.4">
              <text x="221.5" y="92.1"  fill="rgba(210,255,210,0.92)" transform="rotate(-78.75,221.5,92.1)">Ogbe</text>
              <text x="261.1" y="108.5" fill="rgba(255,235,175,0.92)" transform="rotate(-56.25,261.1,108.5)">Oyeku</text>
              <text x="291.5" y="138.9" fill="rgba(210,255,210,0.92)" transform="rotate(-33.75,291.5,138.9)">Iwori</text>
              <text x="307.9" y="178.5" fill="rgba(255,235,175,0.92)" transform="rotate(-11.25,307.9,178.5)">Odi</text>
              <text x="307.9" y="221.5" fill="rgba(210,255,210,0.92)" transform="rotate(11.25,307.9,221.5)">Irosun</text>
              <text x="291.5" y="261.1" fill="rgba(255,235,175,0.92)" transform="rotate(33.75,291.5,261.1)">Owonrin</text>
              <text x="261.1" y="291.5" fill="rgba(210,255,210,0.92)" transform="rotate(56.25,261.1,291.5)">Obara</text>
              <text x="221.5" y="307.9" fill="rgba(255,235,175,0.92)" transform="rotate(78.75,221.5,307.9)">Okanran</text>
              <text x="178.5" y="307.9" fill="rgba(210,255,210,0.92)" transform="rotate(-78.75,178.5,307.9)">Ogunda</text>
              <text x="138.9" y="291.5" fill="rgba(255,235,175,0.92)" transform="rotate(-56.25,138.9,291.5)">Osa</text>
              <text x="108.5" y="261.1" fill="rgba(210,255,210,0.92)" transform="rotate(-33.75,108.5,261.1)">Ika</text>
              <text x="92.1"  y="221.5" fill="rgba(255,235,175,0.92)" transform="rotate(-11.25,92.1,221.5)">Oturupọn</text>
              <text x="92.1"  y="178.5" fill="rgba(210,255,210,0.92)" transform="rotate(11.25,92.1,178.5)">Otura</text>
              <text x="108.5" y="138.9" fill="rgba(255,235,175,0.92)" transform="rotate(33.75,108.5,138.9)">Irete</text>
              <text x="138.9" y="108.5" fill="rgba(210,255,210,0.92)" transform="rotate(56.25,138.9,108.5)">Ose</text>
              <text x="178.5" y="92.1"  fill="rgba(255,235,175,0.92)" transform="rotate(78.75,178.5,92.1)">Ofun</text>
            </g>
            <circle cx="200" cy="200" r="56" fill="url(#chlWhlCG)" stroke="#d4a427" strokeWidth="2.5"/>
            <circle cx="200" cy="200" r="48" fill="none" stroke="rgba(255,240,160,0.4)" strokeWidth="1"/>
            <g fill="rgba(255,240,160,0.55)">
              <circle cx="200" cy="150" r="2.2"/><circle cx="250" cy="200" r="2.2"/>
              <circle cx="200" cy="250" r="2.2"/><circle cx="150" cy="200" r="2.2"/>
            </g>
            <text x="200" y="190" textAnchor="middle" dominantBaseline="middle" fill="#fff8e0" fontSize="9.5" fontWeight="900" fontFamily="Georgia,'Times New Roman',serif" letterSpacing="1">Ọpọn Ifá</text>
            <text x="200" y="203" textAnchor="middle" dominantBaseline="middle" fill="rgba(255,240,170,0.88)" fontSize="8" fontFamily="Georgia,'Times New Roman',serif">Ifa Wheel</text>
            <text x="200" y="215" textAnchor="middle" dominantBaseline="middle" fill="rgba(255,240,170,0.7)" fontSize="7" fontFamily="Georgia,'Times New Roman',serif">16 Sacred Odu</text>
            <circle cx="200" cy="200" r="4" fill="#e8c040"/>
          </svg>
        </div>

        <svg className={`ifa-win-highlight${highlightVisible ? ' visible' : ''}`} viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M 200 200 L 163.9 18.6 A 185 185 0 0 1 236.1 18.6 Z" fill="rgba(212,164,39,0.22)"/>
          <path d="M 162.4 10.7 A 193 193 0 0 1 237.6 10.7" fill="none" stroke="#d4a427" strokeWidth="5" strokeLinecap="round"/>
        </svg>

        <div className="iroke-tuner-badge" aria-label="Ìrokẹ́-Ifá — Ifa Antenna">
          <IrokeSVG/>
          <span>Ìrokẹ́-Ifá &bull; Ifa Antenna</span>
        </div>

        <button className="wheel-spin-btn" onClick={spin} disabled={spinning} aria-label="Spin the Ifa Wheel">
          {btnText}
        </button>
      </div>

      {result && (
        <div className="challenge-wheel-result">
          <div className="cwr-emoji">{result.emoji}</div>
          <div className="cwr-odu">✦ {result.name} — Odu #{result.num} ✦</div>
          <div className="cwr-title" style={{color: result.col}}>{result.title}</div>
          <div className="cwr-msg">{result.msg}</div>
          <button className="ifa-spin-again-btn" onClick={spinAgain}>🔮 Spin Again!</button>
        </div>
      )}

      <div className="challenge-wheel-specs">
        <button className={`wheel-specs-btn${specsOpen ? ' open' : ''}`} onClick={() => setSpecsOpen(o => !o)} aria-expanded={specsOpen}>
          <span className="iroke-icon-wrap" title="Ìrokẹ́-Ifá: The Ifantenna"><IrokeSVG/></span>
          How to draw this wheel
        </button>
        {specsOpen && (
          <div className="wheel-specs-note">
            <div className="wheel-specs-title">✏️ Ọpọ́n Ifá — Drawing Specifications</div>
            <ul className="wheel-specs-list">
              <li><span className="specs-label">Shape</span> Perfect circle (Ọpọ́n Ifá)</li>
              <li><span className="specs-label">Diameter</span> 16 cm · 16 m · 16 km <em>(scale freely — always 16)</em></li>
              <li><span className="specs-label">Divisions</span> 16 equal parts / slices · each slice = <strong>22.5°</strong></li>
              <li><span className="specs-label">Slice width</span> Arc = diameter × π ÷ 16</li>
              <li><span className="specs-label">Centre dot</span> Gold circle, diameter = 1/16 of total diameter</li>
              <li><span className="specs-label">Primary colour</span> <span className="specs-swatch specs-green"></span> Green</li>
              <li><span className="specs-label">Secondary colour</span> <span className="specs-swatch specs-brown"></span> Brown</li>
              <li><span className="specs-label">Alternating fill</span> Green ↔ Brown — one per slice, alternating</li>
              <li><span className="specs-label">Label each slice</span> Number 1–16 (Odu name optional)</li>
              <li><span className="specs-label">Outer ring</span> Thin border in gold/brown, width = 1/32 of diameter</li>
            </ul>
            <div className="specs-note-footer">The number 16 governs every dimension — the sacred count of the Principal Odu Ifa.</div>
          </div>
        )}
      </div>
    </div>
  );
}

function IfartMatrix() {
  const [pinnedDim, setPinnedDim] = useState(null);
  const [hoveredDim, setHoveredDim] = useState(null);
  const CX = 240, CY = 240, R_ORBIT = 158, R_NODE = 36, R_CENTER = 54;
  const isTouch = React.useMemo(
    () => typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0), []
  );
  const activeDim = pinnedDim !== null ? pinnedDim : hoveredDim;
  const activeData = activeDim !== null ? MATRIX_DIMS[activeDim] : null;

  function handleNodeClick(i, e) { e.stopPropagation(); setPinnedDim(prev => prev === i ? null : i); setHoveredDim(null); }
  function handleCenterClick(e) { e.stopPropagation(); setPinnedDim(null); }
  function handleNodeEnter(i) { if (!isTouch) setHoveredDim(i); }
  function handleNodeLeave()  { if (!isTouch) setHoveredDim(null); }

  return (
    <div className="challenge-matrix-wrap" onClick={() => { setPinnedDim(null); setHoveredDim(null); }}>
      <p className="challenge-art-caption">Ifa TOE 0+8D Matrix · Ifa Transform</p>
      <p className="challenge-art-sub">Ifart &amp; Orisart — Using the Polymathic Approach of Ifa/Orisa to Learn the Arts</p>

      <svg viewBox="0 0 480 480" className="ifart-matrix-svg" aria-label="Ifa TOE 0+8D Matrix centred on Ifart/Orisart">
        <defs>
          <radialGradient id="ifm-cgrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#fde68a"/>
            <stop offset="55%"  stopColor="#f0920c"/>
            <stop offset="100%" stopColor="#c06800"/>
          </radialGradient>
          <filter id="ifm-blur" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="5"/>
          </filter>
        </defs>

        <circle cx={CX} cy={CY} r={R_ORBIT} fill="none"
          stroke={activeDim !== null ? 'rgba(240,146,12,0.22)' : 'rgba(240,146,12,0.12)'}
          strokeWidth={1} strokeDasharray="3 5" style={{transition:'stroke 0.4s'}}/>

        {MATRIX_DIMS.map((d, i) => {
          const a = (i * 45 - 90) * Math.PI / 180;
          const isActive = activeDim === i;
          const isDimmed = activeDim !== null && !isActive;
          return (
            <line key={i}
              x1={CX + (R_CENTER + 4) * Math.cos(a)} y1={CY + (R_CENTER + 4) * Math.sin(a)}
              x2={CX + (R_ORBIT - R_NODE - 2) * Math.cos(a)} y2={CY + (R_ORBIT - R_NODE - 2) * Math.sin(a)}
              stroke={d.color} strokeWidth={isActive ? 2 : 1.2} strokeDasharray={isActive ? '0' : '3 4'}
              style={{opacity: isActive ? 0.9 : isDimmed ? 0.08 : 0.35, transition:'opacity 0.35s'}}/>
          );
        })}

        {MATRIX_DIMS.map((d, i) => {
          const a = (i * 45 - 90) * Math.PI / 180;
          const nx = CX + R_ORBIT * Math.cos(a);
          const ny = CY + R_ORBIT * Math.sin(a);
          const isActive = activeDim === i;
          const isDimmed = activeDim !== null && !isActive;
          return (
            <g key={i} onClick={e => handleNodeClick(i, e)} onMouseEnter={() => handleNodeEnter(i)} onMouseLeave={handleNodeLeave} style={{cursor:'pointer'}}>
              <circle cx={nx} cy={ny} r={isActive ? R_NODE + 16 : R_NODE + 9} fill={d.color} filter="url(#ifm-blur)"
                style={{opacity: isActive ? 0.32 : isDimmed ? 0.03 : 0.13, transition:'opacity 0.35s'}}/>
              {isActive && <circle cx={nx} cy={ny} r={R_NODE + 3} fill="none" stroke={d.color} strokeWidth={1} opacity={0.45} strokeDasharray="4 3"/>}
              <circle cx={nx} cy={ny} r={R_NODE} fill="rgba(4,8,15,0.92)" stroke={d.color}
                strokeWidth={isActive ? 2.6 : 1.8} style={{opacity: isDimmed ? 0.28 : 1, transition:'opacity 0.35s'}}/>
              <text x={nx} y={ny - 7} textAnchor="middle" dominantBaseline="middle"
                fontSize={isActive ? 20 : 17} fontWeight="800"
                fontFamily="'Space Grotesk',system-ui,sans-serif" fill={d.color}
                style={{opacity: isDimmed ? 0.28 : 1, transition:'opacity 0.35s'}}>{d.letter}</text>
              <text x={nx} y={ny + 13} textAnchor="middle" dominantBaseline="middle"
                fontSize={8} fontWeight="600"
                fontFamily="'Space Grotesk',system-ui,sans-serif" fill={d.color}
                style={{opacity: isDimmed ? 0.18 : 0.88, transition:'opacity 0.35s'}}>{d.name}</text>
            </g>
          );
        })}

        <circle cx={CX} cy={CY} r={R_CENTER + 18} fill="url(#ifm-cgrad)" opacity={0.18} filter="url(#ifm-blur)"/>
        <circle cx={CX} cy={CY} r={R_CENTER + 8}  fill="url(#ifm-cgrad)" opacity={0.10}/>

        <g onClick={handleCenterClick} style={{cursor: pinnedDim !== null ? 'pointer' : 'default'}}>
          <circle cx={CX} cy={CY} r={R_CENTER} fill="rgba(4,8,15,0.96)" stroke="url(#ifm-cgrad)" strokeWidth={2.2}/>
          <text x={CX} y={CY - 10} textAnchor="middle" dominantBaseline="middle" fontSize={15} fontWeight="900" fontFamily="'Space Grotesk',system-ui,sans-serif" fill="#fde68a">Ifart</text>
          <text x={CX} y={CY + 9}  textAnchor="middle" dominantBaseline="middle" fontSize={12} fontWeight="700" fontFamily="'Space Grotesk',system-ui,sans-serif" fill="#f0920c">/Orisart</text>
          <text x={CX} y={CY + 26} textAnchor="middle" dominantBaseline="middle" fontSize={8}  fontFamily="'Space Grotesk',system-ui,sans-serif" fill="#f0920c" opacity={0.55}>0+8D</text>
        </g>
      </svg>

      <div className={`ifart-dim-panel${activeData ? ' active' : ''}`}>
        {activeData && (
          <div className="ifart-dim-panel-inner" style={{borderColor: activeData.color + 'aa'}}>
            <div className="ifart-dim-header">
              <span className="ifart-dim-letter" style={{color: activeData.color, textShadow: `0 0 28px ${activeData.color}99`}}>{activeData.letter}</span>
              <div className="ifart-dim-meta">
                <span className="ifart-dim-name" style={{color: activeData.color}}>{activeData.name}</span>
                <span className="ifart-dim-desc">{activeData.desc}</span>
              </div>
            </div>
            <p className="ifart-dim-hint">tap node again · tap centre · or tap outside to close</p>
          </div>
        )}
      </div>
    </div>
  );
}

function ChallengeSection() {
  const [accepted, setAccepted] = useState(false);
  const [rippling, setRippling] = useState(false);
  const [litLamps, setLitLamps] = useState(new Set());
  const [switchOn, setSwitchOn] = useState(false);
  const [isIlluminating, setIsIlluminating] = useState(false);
  const [flippedOdu, setFlippedOdu]   = useState(new Set());
  const [flippingNow, setFlippingNow] = useState(null);
  const [pulsingNow,  setPulsingNow]  = useState(null);

  function handlePitFlip(oduNum) {
    if (flippingNow !== null) return;
    setFlippingNow(oduNum);
    setTimeout(() => {
      setFlippedOdu(prev => {
        const next = new Set(prev);
        if (next.has(oduNum)) next.delete(oduNum); else next.add(oduNum);
        return next;
      });
    }, 330);
    setTimeout(() => {
      setFlippingNow(null);
      setPulsingNow(oduNum);
      setTimeout(() => setPulsingNow(null), 500);
    }, 700);
  }

  function toggleLamp(idx) {
    setLitLamps(prev => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx); else next.add(idx);
      return next;
    });
  }

  function handleMasterSwitch() {
    if (!switchOn) {
      setSwitchOn(true); setIsIlluminating(true);
      const order = [14,15,12,13,10,11,8,9,6,7,4,5,2,3,0,1];
      order.forEach((idx, i) => {
        setTimeout(() => setLitLamps(prev => new Set([...prev, idx])), i * 55);
      });
      setTimeout(() => setIsIlluminating(false), order.length * 55 + 700);
    } else {
      setSwitchOn(false); setLitLamps(new Set());
    }
  }

  function handleAccept() {
    if (accepted || rippling) return;
    setRippling(true);
    setTimeout(() => { setRippling(false); setAccepted(true); }, 1300);
  }

  const p2Row = P2_DISP.map(i => ODU[i]);
  const p1Row = P1_DISP.map(i => ODU[i]);

  return (
    <section className="challenge-section" id="challenge">

      <div className="challenge-header">
        <span className="challenge-eyebrow">Ayò Ọlọ́pọ́nfá Challenge</span>
        <h2 className="challenge-title">Ifa Art &amp; Orisa Art</h2>
        <p className="challenge-subtitle">
          Àtùpà Olójú Mẹ́rìndínlógún &amp; Ayò Ọlọ́pọ́nfá Olójú Mẹ́rìndínlógún
        </p>
      </div>

      <div className="challenge-art-grid">
        <div className="challenge-art-panel">
          <p className="challenge-art-caption">Àtùpà Olójú Mẹ́rìndínlógún</p>
          <p className="challenge-art-sub">The 16-Point Lamp Stand · 16 Flames</p>
          <div className={`atupa-switch-row${isIlluminating ? ' atupa-illuminating' : ''}`}>
            <AtupaSVG litLamps={litLamps} onToggleLamp={toggleLamp}/>
            <div className="atupa-switch-wrap">
              <button
                className={`atupa-master-switch${switchOn ? ' atupa-master-switch--on' : ''}`}
                onClick={handleMasterSwitch}
                aria-label={switchOn ? 'Switch off all 16 lamps' : 'Switch on all 16 lamps'}
                aria-pressed={switchOn}>
                <span className="atupa-switch-knob"/>
              </button>
              <span className="atupa-switch-label">Switch<br/>(Èlò-Tànpa)</span>
            </div>
          </div>
          <div className="atupa-lamp-counter">
            {litLamps.size === 0
              ? <span className="atupa-hint">Touch a flame to light it</span>
              : <>
                  <span className="atupa-lit-count">{litLamps.size}</span>
                  <span className="atupa-lit-label">
                    {litLamps.size === 16 ? '· All 16 Flames Lit · Olójú Mẹ́rìndínlógún' : `of 16 flame${litLamps.size > 1 ? 's' : ''} lit`}
                  </span>
                </>
            }
          </div>
          <p className="challenge-art-tagline">Sixteen flames · Sixteen Odu<br/>Sixteen hours · Sixteen days</p>
        </div>

        <div className="challenge-art-panel">
          <p className="challenge-art-caption">Ayò Ọlọ́pọ́nfá Olójú Mẹ́rìndínlógún</p>
          <p className="challenge-art-sub">The 16-Pot Ifa Game Board</p>
          <div className="challenge-odu-board">
            <div className="challenge-odu-row">
              {p1Row.map(odu => (
                <OduMiniCircle key={odu.id} odu={odu}
                  isFlipped={flippedOdu.has(odu.num)} isFlipping={flippingNow === odu.num}
                  isPulsing={pulsingNow === odu.num} onFlip={handlePitFlip}/>
              ))}
            </div>
            <div className="challenge-odu-row">
              {p2Row.map(odu => (
                <OduMiniCircle key={odu.id} odu={odu}
                  isFlipped={flippedOdu.has(odu.num)} isFlipping={flippingNow === odu.num}
                  isPulsing={pulsingNow === odu.num} onFlip={handlePitFlip}/>
              ))}
            </div>
          </div>
          <p className="challenge-art-tagline">16 Odu · 256 Combinations<br/>The Ifa Computer · ComputoE</p>
        </div>
      </div>

      <IfaClockArt/>
      <IfaWheelPanel/>
      <IfartMatrix/>

      <div className="challenge-poetry">
        <div className="challenge-verse">
          <p className="challenge-line">Ṣé o letá Ayò Ọlọ́pọ́nfá Olójú Mẹ́rìndínlógún</p>
          <p className="challenge-line">Pẹ̀lú Àtùpà Olójú Mẹ́rìndínlógún</p>
          <p className="challenge-line">Fun Ọgọ́jú (Wákàtí) Mẹ́rìndínlógún</p>
          <p className="challenge-line">Fun Ọjọ́ Mẹ́rìndínlógún?</p>
        </div>
        <div className="challenge-verse-divider" aria-hidden="true">· · ·</div>
        <p className="challenge-line-en">
          Can you play the 16-Pot Ifa Game using the 16-Point Lamp Stand<br/>
          for 16 hours and 16 days?
        </p>
      </div>

      <div className="challenge-cta">
        <button
          className={['challenge-btn', accepted ? 'challenge-btn--accepted' : '', rippling ? 'challenge-btn--ripple' : ''].filter(Boolean).join(' ')}
          onClick={handleAccept} disabled={accepted} aria-live="polite"
          aria-label="Accept the Ayò Ọlọ́pọ́nfá Challenge">
          {accepted ? (
            <span className="challenge-btn-inner">✦ &nbsp; Ìdíje Tidi Ṣíṣe — Challenge Accepted &nbsp; ✦</span>
          ) : (
            <span className="challenge-btn-inner">
              <span className="challenge-btn-fire" aria-hidden="true">🔥</span>
              &nbsp; Accept the Challenge and Set A New Guinness World Record &nbsp;
              <span className="challenge-btn-fire" aria-hidden="true">🔥</span>
            </span>
          )}
        </button>
        {accepted && (
          <p className="challenge-accepted-msg">
            You have accepted the Ayò Ọlọ́pọ́nfá Challenge. Play Ayò Oníkáà Mẹ́rìndínlógún
            (the 16-Compartment Ayo Game) for Ọgọ́jú (Wákàtí) Mẹ́rìndínlógún — 16 × 60-minute periods
            — for Ọjọ́ Mẹ́rìndínlógún (16 days) with the Àtùpà Olójú Mẹ́rìndínlógún.
          </p>
        )}
      </div>

      <div className="challenge-keywords">
        <span className="challenge-kw-label">Keywords</span>
        <div className="challenge-kw-tags">
          {[
            { w:'Ọgọ́jú',              n:'Ọgọ́ta ìṣẹ́jú — sixty minutes' },
            { w:'Wákàtí',              n:"ọ̀rọ̀ àyálò — loan word for 'hour'" },
            { w:'Olójú Mẹ́rìndínlógún', n:'16-eyed · 16 pots · 16 points' },
            { w:'Àtùpà',               n:'traditional oil lamp stand' },
            { w:'Ọjọ́ Mẹ́rìndínlógún', n:'sixteen days' },
            { w:'Ifart',               n:'Ifa Art — sacred creative expression' },
            { w:'Orisart',             n:'Orisa Art — art of the Orisa tradition' },
          ].map(k => (
            <span key={k.w} className="challenge-kw-tag">
              <span className="challenge-kw-word">{k.w}</span>
              <span className="challenge-kw-note">{k.n}</span>
            </span>
          ))}
        </div>
      </div>

    </section>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <strong>Ifa Art &amp; Orisa Art</strong> — Ifart &amp; Orisart<br/>
          Part of the <strong>IFA Internet</strong> — iTOE by CENProject
        </div>
        <div className="footer__links">
          <a className="footer__link" href="../">IFA Internet</a>
          <a className="footer__link" href="../ebology-test/">Ebology</a>
          <a className="footer__link" href="https://toe.cenproject.org" target="_blank" rel="noopener noreferrer">ToE</a>
          <a className="footer__link" href="https://ifainternet.org" target="_blank" rel="noopener noreferrer">ifainternet.org</a>
        </div>
      </div>
    </footer>
  );
}

// ─── APP ROOT ────────────────────────────────────────────────────────────────

function App() {
  return (
    <>
      <Header />
      <MobileBar />
      <main>
        <HeroSection />
        <DefinitionSection />
        <IfartSection />
        <OrisartSection />
        <TraditionsSection />
        <DualitySection />
        <ChallengeSection />
        <PathSection />
      </main>
      <Footer />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
