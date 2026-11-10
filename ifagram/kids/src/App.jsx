/* ─────────────────────────────────────────────────────────────────────────────
   Ifagrams for Kids & Teens — IfaLab For Children
   The IFA Internet · CENProject
   ifainternet.org
───────────────────────────────────────────────────────────────────────────── */

const { useState, useEffect, useRef, useCallback } = React;

// ═══════════════════════════════════════════════════════════════════════════════
// A. AUDIO ENGINE — Web Audio API (no audio files, all programmatic)
// ═══════════════════════════════════════════════════════════════════════════════

let _actx = null;

function getCtx() {
  if (!_actx) _actx = new (window.AudioContext || window.webkitAudioContext)();
  if (_actx.state === 'suspended') _actx.resume();
  return _actx;
}

function tone(freq, type = 'sine', dur = 0.5, vol = 0.22, delay = 0) {
  const ctx  = getCtx();
  const osc  = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type    = type;
  osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);
  gain.gain.setValueAtTime(vol, ctx.currentTime + delay);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + dur);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(ctx.currentTime + delay);
  osc.stop(ctx.currentTime + delay + dur + 0.05);
}

function sweep(f0, f1, type, dur, vol, delay = 0) {
  const ctx  = getCtx();
  const osc  = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(f0, ctx.currentTime + delay);
  osc.frequency.exponentialRampToValueAtTime(f1, ctx.currentTime + delay + dur);
  gain.gain.setValueAtTime(vol, ctx.currentTime + delay);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + dur);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(ctx.currentTime + delay);
  osc.stop(ctx.currentTime + delay + dur + 0.05);
}

const SOUNDS = {
  sango: () => {
    tone(55,   'sawtooth', 0.6, 0.28, 0);
    tone(880,  'square',   0.15, 0.18, 0.1);
    tone(440,  'sawtooth', 0.3, 0.12, 0.08);
  },
  osun: () => {
    [523, 659, 784, 1047].forEach((f, i) => tone(f, 'sine', 0.28, 0.20, i * 0.18));
  },
  ogun: () => {
    tone(220, 'sawtooth', 0.4, 0.22, 0);
    tone(440, 'triangle', 0.3, 0.16, 0.05);
  },
  obatala: () => {
    tone(880,  'sine', 0.9, 0.18, 0);
    tone(1109, 'sine', 0.7, 0.12, 0.05);
  },
  oya: () => {
    sweep(80, 800, 'sawtooth', 0.6, 0.22, 0);
  },
  esu: () => {
    [523, 659, 523, 784, 523].forEach((f, i) => tone(f, 'triangle', 0.18, 0.18, i * 0.12));
  },
  tap: () => {
    tone(784, 'sine', 0.12, 0.18, 0);
  },
  spin: () => {
    [392, 523, 659, 784, 1047].forEach((f, i) => tone(f, 'sine', 0.22, 0.18, i * 0.08));
  },
  number: (n) => {
    const scale = [261, 294, 330, 349, 392, 440, 494, 523, 587, 659, 698, 784];
    const freq  = scale[(n - 1) % scale.length] || 392;
    tone(freq, 'sine', 0.4, 0.22, 0);
  },
  greeting: (freq) => {
    tone(freq, 'sine', 0.35, 0.20, 0);
    tone(freq * 1.25, 'sine', 0.25, 0.10, 0.1);
  }
};

// ═══════════════════════════════════════════════════════════════════════════════
// B. DATA
// ═══════════════════════════════════════════════════════════════════════════════

const ORISA = [
  {
    id: 'sango',
    name: 'Ṣàngó',
    title: 'Orisa of Thunder & Lightning',
    emoji: '⚡',
    color: '#e63946',
    bgColor: 'rgba(230,57,70,0.13)',
    soundKey: 'sango',
    steamSubject: 'Science',
    steamLetter: 'S',
    yorubaPhrase: 'Ṣàngó ó!',
    animType: 'lightning',
    desc: 'Ṣàngó is the mighty Orisa of thunder, lightning, and storms! He rides the clouds and sends lightning to show his power.',
    funFact: 'Thunder is the sound that follows lightning — it travels slower than light!'
  },
  {
    id: 'osun',
    name: 'Ọ̀ṣun',
    title: 'Orisa of Rivers & Love',
    emoji: '💛',
    color: '#f5c518',
    bgColor: 'rgba(245,197,24,0.13)',
    soundKey: 'osun',
    steamSubject: 'Science',
    steamLetter: 'S',
    yorubaPhrase: 'Ọ̀ṣun yeyé!',
    animType: 'wave',
    desc: 'Ọ̀ṣun is the beautiful Orisa of sweet water, rivers, love, and abundance. She flows with grace and brings joy!',
    funFact: 'Rivers carry water from mountains all the way to the ocean — just like energy flows!'
  },
  {
    id: 'ogun',
    name: 'Ògún',
    title: 'Orisa of Iron & Creativity',
    emoji: '🔧',
    color: '#457b9d',
    bgColor: 'rgba(69,123,157,0.13)',
    soundKey: 'ogun',
    steamSubject: 'Engineering',
    steamLetter: 'E',
    yorubaPhrase: 'Ògún onílé!',
    animType: 'pulse',
    desc: 'Ògún is the strong Orisa of iron, tools, and hard work. He teaches us to build things and work with our hands!',
    funFact: 'Iron is one of the most useful metals on Earth — it makes bridges, buildings, and tools!'
  },
  {
    id: 'obatala',
    name: 'Ọbàtálá',
    title: 'Orisa of Wisdom & Creation',
    emoji: '⭐',
    color: '#e8f1ff',
    bgColor: 'rgba(241,245,249,0.10)',
    soundKey: 'obatala',
    steamSubject: 'Mathematics',
    steamLetter: 'M',
    yorubaPhrase: 'Ọbàtálá bàbá!',
    animType: 'twinkle',
    desc: 'Ọbàtálá is the wise Orisa dressed in pure white. He shapes human beings with love and teaches patience and truth.',
    funFact: 'Stars in the sky are giant balls of fire — the nearest one is our own Sun!'
  },
  {
    id: 'oya',
    name: 'Ọya',
    title: 'Orisa of Wind & Change',
    emoji: '🌪️',
    color: '#9d4edd',
    bgColor: 'rgba(157,78,221,0.13)',
    soundKey: 'oya',
    steamSubject: 'Science',
    steamLetter: 'S',
    yorubaPhrase: 'Ọya àsà!',
    animType: 'spin',
    desc: 'Ọya is the fierce and free Orisa of wind, storms, and transformation. She brings change and new beginnings!',
    funFact: 'Wind is moving air — it carries seeds, shapes clouds, and powers wind turbines!'
  },
  {
    id: 'esu',
    name: 'Ẹṣù',
    title: 'Orisa of Crossroads & Communication',
    emoji: '🎭',
    color: '#00b4d8',
    bgColor: 'rgba(0,180,216,0.13)',
    soundKey: 'esu',
    steamSubject: 'Technology',
    steamLetter: 'T',
    yorubaPhrase: 'Ẹṣù Ọdàrà!',
    animType: 'bounce',
    desc: 'Ẹṣù is the playful and clever Orisa of crossroads, messages, and technology. He connects everything to everything!',
    funFact: 'Crossroads are where paths meet — the internet is a giant digital crossroads connecting the whole world!'
  }
];

const STEAM_CARDS = [
  {
    letter: 'S',
    subject: 'Science',
    color: '#e63946',
    orisaName: 'Ṣàngó & Ọya',
    title: 'Ifa Science — Energy & Nature',
    body: 'Ifa teaches us to observe the natural world deeply. Ṣàngó shows us electricity and plasma. Ọya teaches us meteorology — the science of weather and atmospheric energy.',
    activity: 'Activity: Watch a storm safely from inside. Count the seconds between lightning and thunder — every 3 seconds means the lightning is 1 kilometre away!'
  },
  {
    letter: 'T',
    subject: 'Technology',
    color: '#00b4d8',
    orisaName: 'Ẹṣù',
    title: 'Ifa Technology — Networks & Connection',
    body: 'Ẹṣù is the Orisa of communication and digital networks. The IFA Internet itself is a Technology project — connecting ancient Ifa wisdom with modern computing!',
    activity: 'Activity: Draw your own "crossroads" map showing how your home, school, and favourite places are all connected like a network!'
  },
  {
    letter: 'E',
    subject: 'Engineering',
    color: '#457b9d',
    orisaName: 'Ògún',
    title: 'Ifa Engineering — Build & Create',
    body: 'Ògún inspires engineering — the art of building and making. From traditional iron-working to modern construction, engineering shapes the physical world around us.',
    activity: 'Activity: Build a small bridge using only 10 sticks and tape. Test how much weight it can hold — that\'s structural engineering!'
  },
  {
    letter: 'A',
    subject: 'Art',
    color: '#f5c518',
    orisaName: 'Ọ̀ṣun',
    title: 'Ifa Art — Beauty & Expression',
    body: 'Ọ̀ṣun is the Orisa of art, beauty, and expression. Ifa itself is an art form — the patterns of Odu Ifa are visual art, and the oral poems (Ese Ifa) are literary art.',
    activity: 'Activity: Draw your favourite Orisa using only 3 colours. What colours feel right for each one? Colour is a language!'
  },
  {
    letter: 'M',
    subject: 'Mathematics',
    color: '#e8f1ff',
    orisaName: 'Ọbàtálá',
    title: 'Ifa Mathematics — Patterns & Order',
    body: 'Ọbàtálá is the Orisa of perfection and order. The 256 Odu Ifa are built from binary patterns — just like computer code! Ifa is one of humanity\'s oldest mathematical systems.',
    activity: 'Activity: Write numbers 1–8 in binary (ones and twos). Notice how 256 = 2⁸? The 256 Odu Ifa are 8 binary digits!'
  }
];

const YORUBA_NUMBERS = [
  { n: 1,  word: 'Ọ̀kan',        color: '#e63946' },
  { n: 2,  word: 'Èjì',          color: '#f5c518' },
  { n: 3,  word: 'Ẹ̀ta',         color: '#06d6a0' },
  { n: 4,  word: 'Ẹ̀rin',        color: '#118ab2' },
  { n: 5,  word: 'Àrún',         color: '#9d4edd' },
  { n: 6,  word: 'Ẹ̀fà',         color: '#ff006e' },
  { n: 7,  word: 'Èje',          color: '#ff6b35' },
  { n: 8,  word: 'Ẹ̀jọ',         color: '#00b4d8' },
  { n: 9,  word: 'Ẹ̀sàn',        color: '#a8dadc' },
  { n: 10, word: 'Ẹ̀wá',         color: '#f5c518' },
  { n: 16, word: 'Ẹrìndínlógún', color: '#e63946' }
];

const YORUBA_GREETINGS = [
  { phrase: 'Ẹ káàárọ̀',  english: 'Good morning',    emoji: '🌅', freq: 523 },
  { phrase: 'Ẹ káàsán',   english: 'Good afternoon',   emoji: '☀️', freq: 659 },
  { phrase: 'Ẹ káalẹ̀',   english: 'Good evening',     emoji: '🌙', freq: 440 },
  { phrase: 'Báwo ni?',    english: 'How are you?',     emoji: '👋', freq: 784 },
  { phrase: 'Mo wà dáadáa', english: 'I am fine',       emoji: '😊', freq: 523 },
  { phrase: 'Ẹ ṣéun',     english: 'Thank you',        emoji: '🙏', freq: 880 }
];

const ODU_PATTERNS = [
  {
    name: 'Ogbe',
    marks: [1, 1, 1, 1],
    color: '#f5c518',
    desc: 'The first Odu — pure light, beginnings, and the dawn of all things.'
  },
  {
    name: 'Oyeku',
    marks: [2, 2, 2, 2],
    color: '#9d4edd',
    desc: 'The night, endings, and transformation — the shadow side of creation.'
  },
  {
    name: 'Iwori',
    marks: [2, 1, 1, 2],
    color: '#00b4d8',
    desc: 'Inner vision and self-knowledge — looking deeply within yourself.'
  },
  {
    name: 'Odi',
    marks: [1, 2, 2, 1],
    color: '#ff006e',
    desc: 'The womb of creation — hidden things, secrets, and deep mystery.'
  },
  {
    name: 'Irosun',
    marks: [1, 1, 2, 2],
    color: '#e63946',
    desc: 'Blood and life force — the vital energy that flows through all living things.'
  },
  {
    name: 'Owonrin',
    marks: [2, 2, 1, 1],
    color: '#ff6b35',
    desc: 'Chaos and creativity — the energy of sudden change and new possibilities.'
  },
  {
    name: 'Obara',
    marks: [1, 2, 2, 2],
    color: '#f5c518',
    desc: 'Royalty and leadership — the power to rule with wisdom and courage.'
  },
  {
    name: 'Okanran',
    marks: [2, 2, 2, 1],
    color: '#06d6a0',
    desc: 'Conflict and resolution — the dance between opposing forces finding balance.'
  },
  {
    name: 'Ogunda',
    marks: [1, 1, 1, 2],
    color: '#2d9e6b',
    desc: 'The force that clears the path — iron, roads, and the warrior energy that cuts through obstacles.'
  },
  {
    name: 'Osa',
    marks: [2, 1, 1, 1],
    color: '#c77dff',
    desc: 'Swift and unpredictable wind — sudden events and transformations that arrive without warning.'
  },
  {
    name: 'Ika',
    marks: [2, 1, 2, 2],
    color: '#5e72b4',
    desc: 'The clever one who sees around corners — cunning intelligence and protection through wit.'
  },
  {
    name: 'Oturupon',
    marks: [2, 2, 1, 2],
    color: '#a07855',
    desc: 'The forge of character — constraint and difficult trials that build true strength and wisdom.'
  },
  {
    name: 'Otura',
    marks: [1, 2, 1, 1],
    color: '#38b2ac',
    desc: 'The sacred creative word — divine communication and the power of speech to shape reality.'
  },
  {
    name: 'Irete',
    marks: [1, 1, 2, 1],
    color: '#22c55e',
    desc: 'Deep roots and endurance — patience, long life, and the wisdom that grows through perseverance.'
  },
  {
    name: 'Ose',
    marks: [1, 2, 1, 2],
    color: '#f97316',
    desc: 'Abundance and sweetness — fertility, prosperity, and all forms of flourishing and increase.'
  },
  {
    name: 'Ofun',
    marks: [2, 1, 2, 1],
    color: '#e2e8f0',
    desc: 'Cosmic completion and universal law — every ending is an initiation into something new.'
  }
];

// ═══════════════════════════════════════════════════════════════════════════════
// C. COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════════

// ── StarField ────────────────────────────────────────────────────────────────
function StarField() {
  const stars = useRef(
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      top:   Math.random() * 100,
      left:  Math.random() * 100,
      size:  1 + Math.random() * 2.5,
      delay: Math.random() * 4,
      dur:   2 + Math.random() * 3
    }))
  );
  return (
    <div className="starfield" aria-hidden="true">
      {stars.current.map(s => (
        <div
          key={s.id}
          className="starfield__star"
          style={{
            top:                `${s.top}%`,
            left:               `${s.left}%`,
            width:              `${s.size}px`,
            height:             `${s.size}px`,
            animationDelay:     `${s.delay}s`,
            animationDuration:  `${s.dur}s`
          }}
        />
      ))}
    </div>
  );
}

// ── Ifa Infinity Mini Canvas ──────────────────────────────────────────────────
function IfaInfinityMini({ sz = 72 }) {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width  = sz * dpr;
    canvas.height = sz * dpr;
    canvas.style.width  = sz + 'px';
    canvas.style.height = sz + 'px';
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, sz, sz);

    const PI = Math.PI;
    const cx = sz / 2, cy = sz / 2;
    const a  = sz * 0.357;
    const s  = a / 200;

    function hLobe(t0, t1) {
      const pts = [];
      for (let i = 0; i <= 2000; i++) {
        const t = t0 + (t1 - t0) * i / 2000;
        const c2 = Math.cos(2 * t);
        if (c2 < 1e-10) continue;
        const r = a * Math.sqrt(c2);
        pts.push([cx + r * Math.cos(t), cy + r * Math.sin(t)]);
      }
      return pts;
    }
    function vLobe(t0, t1) {
      const pts = [];
      for (let i = 0; i <= 2000; i++) {
        const t = t0 + (t1 - t0) * i / 2000;
        const mc2 = -Math.cos(2 * t);
        if (mc2 < 1e-10) continue;
        const r = a * Math.sqrt(mc2);
        pts.push([cx + r * Math.cos(t), cy + r * Math.sin(t)]);
      }
      return pts;
    }
    function stroke(pts, lw, rgba, blur) {
      if (!pts || !pts.length) return;
      ctx.save();
      ctx.strokeStyle = rgba; ctx.lineWidth = lw;
      ctx.shadowColor = rgba; ctx.shadowBlur = blur;
      ctx.lineCap = 'round'; ctx.lineJoin = 'round';
      ctx.beginPath();
      ctx.moveTo(pts[0][0], pts[0][1]);
      for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
      ctx.stroke();
      ctx.restore();
    }
    function glow(pts) {
      stroke(pts, 44*s, 'rgba(245,197,24,0.03)', 65*s);
      stroke(pts, 26*s, 'rgba(245,197,24,0.07)', 44*s);
      stroke(pts, 15*s, 'rgba(245,197,24,0.16)', 28*s);
      stroke(pts,  7*s, 'rgba(245,197,24,0.34)', 16*s);
      stroke(pts,  3*s, 'rgba(245,197,24,0.62)',  8*s);
      stroke(pts, 1.4*s,'rgba(245,197,24,0.90)',  4*s);
      stroke(pts, 0.7*s,'rgba(255,248,210,0.95)', 2*s);
    }

    const lobes = [
      hLobe(-PI/4,    PI/4),
      hLobe(3*PI/4, 5*PI/4),
      vLobe(  PI/4, 3*PI/4),
      vLobe(5*PI/4, 7*PI/4),
    ];
    for (const lobe of lobes) glow(lobe);

    ctx.save();
    ctx.shadowColor = 'rgba(245,197,24,1)';
    ctx.shadowBlur  = 22 * s;
    ctx.fillStyle   = 'rgba(255,248,210,1)';
    ctx.beginPath();
    ctx.arc(cx, cy, 3.5 * s, 0, 2 * PI);
    ctx.fill();
    ctx.restore();
  }, [sz]);
  return (
    <canvas
      ref={ref}
      style={{ display: 'block', background: 'transparent' }}
      aria-hidden="true"
    />
  );
}

// ── SpinningBoard ────────────────────────────────────────────────────────────
function SpinningBoard() {
  const [spinning, setSpinning]       = useState(false);
  const [shownOdu, setShownOdu]       = useState(null);
  const [spinCount, setSpinCount]     = useState(0);

  const rimDots = Array.from({ length: 8 }, (_, i) => i);

  function handleSpin() {
    if (spinning) return;
    SOUNDS.spin();
    setSpinning(true);
    setShownOdu(null);
    setSpinCount(c => c + 1);
    setTimeout(() => {
      setSpinning(false);
      setShownOdu(ODU_PATTERNS[Math.floor(Math.random() * ODU_PATTERNS.length)]);
    }, 1050);
  }

  return (
    <div className="spin-board-wrap">
      <button
        className={`spin-board${spinning ? ' spin-board--spinning' : ''}`}
        onClick={handleSpin}
        aria-label="Spin the Ifa board"
        title="Click to spin!"
        key={spinCount}
      >
        {rimDots.map(i => (
          <span
            key={i}
            className="spin-board__dot"
            style={{ '--dot-angle': `${i * 45}deg` }}
            aria-hidden="true"
          />
        ))}
        <div className="spin-board__center" aria-hidden="true"><IfaInfinityMini sz={72} /></div>
      </button>
      <p className="spin-board__label">
        {shownOdu
          ? <><strong style={{ color: shownOdu.color }}>{shownOdu.name}</strong><span> — {shownOdu.desc.split('—')[0].trim()}</span></>
          : <span>Tap to spin the Ifa board! ✨</span>
        }
      </p>
    </div>
  );
}

// ── OrisaCard ────────────────────────────────────────────────────────────────
function OrisaCard({ orisa }) {
  const [active, setActive] = useState(false);

  function handlePlay(e) {
    e.stopPropagation();
    SOUNDS[orisa.soundKey]();
    setActive(a => !a);
    setTimeout(() => setActive(false), 2200);
  }

  const sparkles = [0, 60, 120, 180, 240, 300];

  return (
    <article
      className={`orisa-card${active ? ' orisa-card--active' : ''}`}
      style={{ '--oc': orisa.color, '--oc-bg': orisa.bgColor }}
      onClick={handlePlay}
      role="button"
      tabIndex={0}
      aria-label={`${orisa.name} — ${orisa.title}. Tap to hear sound.`}
      onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && handlePlay(e)}
    >
      <div className="orisa-card__circle-wrap">
        <div className={`orisa-card__circle orisa-char--${orisa.animType}`}>
          <span className="orisa-card__emoji" role="img" aria-label={orisa.name}>{orisa.emoji}</span>
        </div>
        {sparkles.map(deg => (
          <span
            key={deg}
            className="orisa-card__sparkle"
            style={{ '--sp-deg': `${deg}deg` }}
            aria-hidden="true"
          />
        ))}
      </div>
      <h3 className="orisa-card__name">{orisa.name}</h3>
      <p className="orisa-card__title">{orisa.title}</p>
      <span className="orisa-card__badge" style={{ background: orisa.color }}>
        {orisa.steamLetter} · {orisa.steamSubject}
      </span>
      <p className="orisa-card__desc">{orisa.desc}</p>
      <p className="orisa-card__fact">
        <span className="orisa-card__fact-label">Fun Fact</span>
        {orisa.funFact}
      </p>
      <button className="orisa-card__btn" onClick={handlePlay} aria-label={`Hear ${orisa.name} sound`}>
        Tap to Hear! 🔊
      </button>
    </article>
  );
}

// ── STEAMCard ────────────────────────────────────────────────────────────────
function STEAMCard({ card }) {
  const actText = card.activity.replace(/^Activity:\s*/i, '');
  return (
    <article className="steam-card" style={{ '--sc': card.color }}>
      <div className="steam-card__header">
        <div className="steam-card__orb steam-card__orb--lg" aria-hidden="true" />
        <div className="steam-card__orb steam-card__orb--sm" aria-hidden="true" />
        <div className="steam-card__letter-badge">{card.letter}</div>
        <div className="steam-card__header-info">
          <div className="steam-card__subject">{card.subject}</div>
          <div className="steam-card__orisa-tag">{card.orisaName}</div>
        </div>
      </div>
      <div className="steam-card__body-wrap">
        <h3 className="steam-card__title">{card.title}</h3>
        <p className="steam-card__body">{card.body}</p>
        <div className="steam-card__activity">
          <span className="steam-card__act-label">✨ Try it!</span>
          <span className="steam-card__act-text">{actText}</span>
        </div>
      </div>
    </article>
  );
}

// ── NumberCard ───────────────────────────────────────────────────────────────
function NumberCard({ item }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  function handleClick() {
    SOUNDS.number(item.n);
  }

  const dots = Array.from({ length: Math.min(item.n, 10) });

  return (
    <button
      className="number-card"
      style={{ '--nc': item.color }}
      onClick={handleClick}
      aria-label={`Number ${item.n} — ${item.word} in Yoruba. Click to hear.`}
    >
      <span className="number-card__digit" style={{ color: item.color }}>{item.n}</span>
      <span className="number-card__word">{item.word}</span>
      <div className="number-card__dots" aria-hidden="true">
        {dots.map((_, i) => (
          <span
            key={i}
            className="number-card__dot"
            style={{
              background:         item.color,
              transitionDelay:    mounted ? `${i * 60}ms` : '0ms',
              opacity:            mounted ? 1 : 0,
              transform:          mounted ? 'scale(1)' : 'scale(0)'
            }}
          />
        ))}
      </div>
    </button>
  );
}

// ── OduPatternCard ───────────────────────────────────────────────────────────
function OduPatternCard({ odu }) {
  return (
    <article className="odu-card" style={{ '--odu-c': odu.color }}>
      <div className="odu-card__marks">
        {odu.marks.map((m, row) => (
          <div key={row} className="odu-card__row">
            {m === 1 ? (
              <span className="odu-card__mark odu-card__mark--single" style={{ background: odu.color }} />
            ) : (
              <>
                <span className="odu-card__mark odu-card__mark--double" style={{ background: odu.color }} />
                <span className="odu-card__mark odu-card__mark--double" style={{ background: odu.color }} />
              </>
            )}
          </div>
        ))}
      </div>
      <div className="odu-card__info">
        <h4 className="odu-card__name" style={{ color: odu.color }}>{odu.name}</h4>
        <p className="odu-card__desc">{odu.desc}</p>
      </div>
    </article>
  );
}

// ── GreetingCard ─────────────────────────────────────────────────────────────
function GreetingCard({ g }) {
  function handleClick() {
    SOUNDS.greeting(g.freq);
  }

  return (
    <button className="greeting-card" onClick={handleClick} aria-label={`${g.phrase} — ${g.english}. Click to hear tone.`}>
      <span className="greeting-card__emoji" role="img" aria-label={g.english}>{g.emoji}</span>
      <span className="greeting-card__phrase">{g.phrase}</span>
      <span className="greeting-card__english">{g.english}</span>
    </button>
  );
}

// ── IfanimationTheater ───────────────────────────────────────────────────────
function IfanimationTheater() {
  return (
    <div className="ifanim-theater">

      <div className="ifanim-card ifanim-card--sango">
        <div className="ifanim-card__aura ifanim-aura--sango" aria-hidden="true">
          <span className="ifanim-ray ifanim-ray--1" aria-hidden="true" />
          <span className="ifanim-ray ifanim-ray--2" aria-hidden="true" />
          <span className="ifanim-ray ifanim-ray--3" aria-hidden="true" />
          <span className="ifanim-ray ifanim-ray--4" aria-hidden="true" />
        </div>
        <div className="ifanim-char ifanim-char--lightning" role="img" aria-label="Ṣàngó">⚡</div>
        <div className="ifanim-label">
          <strong>Ṣàngó</strong>
          <span>Ifanimation · Orisanimation</span>
        </div>
      </div>

      <div className="ifanim-card ifanim-card--osun">
        <div className="ifanim-card__aura ifanim-aura--osun" aria-hidden="true">
          <span className="ifanim-ring ifanim-ring--1" aria-hidden="true" />
          <span className="ifanim-ring ifanim-ring--2" aria-hidden="true" />
          <span className="ifanim-ring ifanim-ring--3" aria-hidden="true" />
        </div>
        <div className="ifanim-char ifanim-char--wave" role="img" aria-label="Ọ̀ṣun">💛</div>
        <div className="ifanim-label">
          <strong>Ọ̀ṣun</strong>
          <span>Ifanimation · Orisanimation</span>
        </div>
      </div>

      <div className="ifanim-card ifanim-card--oya">
        <div className="ifanim-card__aura ifanim-aura--oya" aria-hidden="true">
          <span className="ifanim-orbit-ring" aria-hidden="true" />
        </div>
        <div className="ifanim-char ifanim-char--spin" role="img" aria-label="Ọya">🌪️</div>
        <div className="ifanim-label">
          <strong>Ọya</strong>
          <span>Ifanimation · Orisanimation</span>
        </div>
      </div>

      <div className="ifanim-card ifanim-card--esu">
        <div className="ifanim-card__aura ifanim-aura--esu" aria-hidden="true">
          <span className="ifanim-orbit ifanim-orbit--1" aria-hidden="true" />
          <span className="ifanim-orbit ifanim-orbit--2" aria-hidden="true" />
          <span className="ifanim-orbit ifanim-orbit--3" aria-hidden="true" />
        </div>
        <div className="ifanim-char ifanim-char--bounce" role="img" aria-label="Ẹṣù">🎭</div>
        <div className="ifanim-label">
          <strong>Ẹṣù</strong>
          <span>Ifanimation · Orisanimation</span>
        </div>
      </div>

    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// D. SECTIONS
// ═══════════════════════════════════════════════════════════════════════════════

// ── Header ───────────────────────────────────────────────────────────────────
function Header({ onLogout }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="kids-header">
      <div className="kids-header__inner">
        <a href="../" className="kids-header__brand" aria-label="Back to IfaDiagram">
          <img src="../../src/assets/itoe_logo.png" alt="IFA Internet logo" className="kids-header__logo" />
          <span className="kids-header__label">IfaLab For Children</span>
        </a>
        <button
          className={`kids-header__burger${open ? ' open' : ''}`}
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen(o => !o)}
        >
          <span /><span /><span />
        </button>
        <nav className={`kids-header__nav${open ? ' kids-header__nav--open' : ''}`} aria-label="Main navigation">
          <a href="../"     onClick={() => setOpen(false)}>IfaDiagram</a>
          <a href="../../"  onClick={() => setOpen(false)}>IFA Internet</a>
          <a href="#orisa"  onClick={() => setOpen(false)}>Orisa</a>
          <a href="#steam"  onClick={() => setOpen(false)}>STEAM</a>
          <a href="#count"  onClick={() => setOpen(false)}>Count</a>
          <a href="#patterns" onClick={() => setOpen(false)}>Odu</a>
          <a href="#animations" onClick={() => setOpen(false)}>Animations</a>
          <button className="kids-header__logout" onClick={() => { setOpen(false); onLogout(); }}>Log Out</button>
        </nav>
      </div>
    </header>
  );
}

// ── HeroSection ──────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="kids-hero">
      <StarField />
      <div className="kids-hero__orb kids-hero__orb--1" aria-hidden="true" />
      <div className="kids-hero__orb kids-hero__orb--2" aria-hidden="true" />
      <div className="kids-hero__orb kids-hero__orb--3" aria-hidden="true" />
      <div className="kids-hero__content">
        <div className="kids-hero__text">
          <span className="kids-hero__eyebrow">IfaLab For Children ✨</span>
          <h1 className="kids-hero__title">
            <span className="kids-hero__title-line kids-hero__title-line--1">Ifagrams</span>
            <span className="kids-hero__title-line kids-hero__title-line--2">for Kids</span>
            <span className="kids-hero__title-line kids-hero__title-line--3">&amp; Teens</span>
          </h1>
          <div className="kids-hero__badge">Ages 4+ · STEAM Learning · Yoruba Culture</div>
          <p className="kids-hero__desc">
            Explore the ancient wisdom of Ifa through fun animations, music, and activities!
            Meet the Orisa, count in Yoruba, discover Odu Ifa patterns, and learn STEAM
            the Ifa way — where culture and science come alive together!
          </p>
          <div className="kids-hero__ctas">
            <a href="#orisa" className="kids-btn kids-btn--primary">Meet the Orisa 🌟</a>
            <a href="#steam" className="kids-btn kids-btn--secondary">Start Learning! 📚</a>
          </div>
        </div>
        <div className="kids-hero__board">
          <SpinningBoard />
        </div>
      </div>
    </section>
  );
}

// ── MeetOrisaSection ─────────────────────────────────────────────────────────
function MeetOrisaSection() {
  return (
    <section className="kids-section" id="orisa">
      <div className="kids-section__inner">
        <p className="kids-section__eyebrow">Ifa Animations · Ifanimations</p>
        <h2 className="kids-section__title">Meet the Orisa!</h2>
        <p className="kids-section__sub">Click on each Orisa to hear their sound! 🔊</p>
        <div className="orisa-grid">
          {ORISA.map(o => <OrisaCard key={o.id} orisa={o} />)}
        </div>
      </div>
    </section>
  );
}

// ── IfaSTEAMSection ───────────────────────────────────────────────────────────
function IfaSTEAMSection() {
  return (
    <section className="kids-section kids-section--steam" id="steam">
      <div className="kids-section__inner">
        <h2 className="kids-section__title kids-section__title--steam">Ifa STEAM Learning</h2>
        <p className="kids-section__sub">
          Science, Technology, Engineering, Art &amp; Mathematics — the Ifa way!
        </p>
        <div className="steam-grid">
          {STEAM_CARDS.map(c => <STEAMCard key={c.letter} card={c} />)}
        </div>
      </div>
    </section>
  );
}

// ── CountLearnSection ─────────────────────────────────────────────────────────
function CountLearnSection() {
  return (
    <section className="kids-section" id="count">
      <div className="kids-section__inner">
        <h2 className="kids-section__title">Count in Yoruba! 🔢</h2>
        <p className="kids-section__sub">Click a number to hear it in Yoruba!</p>
        <div className="number-grid">
          {YORUBA_NUMBERS.map(item => <NumberCard key={item.n} item={item} />)}
        </div>
        <div className="ifa-code-box">
          <h3 className="ifa-code-box__title">The Ifa Code 🔵</h3>
          <div className="ifa-code-box__row">
            <div className="ifa-code-box__item">
              <div className="ifa-code-mark ifa-code-mark--single" aria-label="Single mark" />
              <p><strong>1 mark (ı)</strong><br />Odd — Yang energy</p>
            </div>
            <div className="ifa-code-box__item">
              <div className="ifa-code-mark ifa-code-mark--double" aria-label="Double mark">
                <span /><span />
              </div>
              <p><strong>2 marks (॥)</strong><br />Even — Yin energy</p>
            </div>
            <div className="ifa-code-box__item ifa-code-box__item--wide">
              <p>
                Every Odu Ifa pattern is 4 rows of these marks — just like binary code uses 0 and 1.
                That means <strong style={{ color: '#f5c518' }}>256 Odu Ifa = 2⁸</strong> possibilities!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── OduPatternsSection ────────────────────────────────────────────────────────
function OduPatternsSection() {
  return (
    <section className="kids-section kids-section--dark" id="patterns">
      <div className="kids-section__inner">
        <h2 className="kids-section__title">Ifa Patterns — The Odu Ifa</h2>
        <p className="kids-section__sub">
          The 256 Odu Ifa begin with these 16 patterns. Can you spot the difference?
        </p>
        <div className="odu-grid">
          {ODU_PATTERNS.map(o => <OduPatternCard key={o.name} odu={o} />)}
        </div>
      </div>
    </section>
  );
}

// ── IfanimationsSection ───────────────────────────────────────────────────────
function IfanimationsSection() {
  return (
    <section className="kids-section" id="animations">
      <div className="kids-section__inner">
        <h2 className="kids-section__title">Ifanimations &amp; Orisanimations 🎭</h2>
        <p className="kids-section__sub">Watch the Orisa come alive!</p>
        <IfanimationTheater />
      </div>
    </section>
  );
}

// ── GreetingsSection ──────────────────────────────────────────────────────────
function GreetingsSection() {
  return (
    <section className="kids-section kids-section--greet" id="greetings">
      <div className="kids-section__inner">
        <h2 className="kids-section__title">Say Hello in Yoruba! 👋</h2>
        <p className="kids-section__sub">Click a greeting to hear it!</p>
        <div className="greeting-grid">
          {YORUBA_GREETINGS.map(g => <GreetingCard key={g.phrase} g={g} />)}
        </div>
      </div>
    </section>
  );
}

// ── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="kids-footer">
      <div className="kids-footer__inner">
        <p className="kids-footer__copy">
          &copy; 2026 <a href="../../">The IFA Internet</a> · <a href="../../">CENProject</a>
        </p>
        <nav className="kids-footer__nav" aria-label="Footer navigation">
          <a href="../">IfaDiagram</a>
          <a href="../../">IFA Internet</a>
          <a href="#orisa">Orisa</a>
          <a href="#steam">STEAM</a>
          <a href="#greetings">Greetings</a>
        </nav>
        <p className="kids-footer__tagline">
          Ifa wisdom for the next generation 🌍
        </p>
      </div>
    </footer>
  );
}

// ── MobileBar ─────────────────────────────────────────────────────────────────
function MobileBar({ onLogout }) {
  const items = [
    { href: '#orisa',      emoji: '✨', label: 'Orisa'  },
    { href: '#steam',      emoji: '🔬', label: 'STEAM'  },
    { href: '#count',      emoji: '🔢', label: 'Count'  },
    { href: '#patterns',   emoji: '🔵', label: 'Odu'    },
    { href: '#animations', emoji: '🎭', label: 'Animate'}
  ];
  return (
    <nav className="mobile-bar" aria-label="Quick navigation">
      {items.map(it => (
        <a key={it.href} href={it.href} className="mobile-bar__item">
          <span className="mobile-bar__emoji" aria-hidden="true">{it.emoji}</span>
          <span className="mobile-bar__label">{it.label}</span>
        </a>
      ))}
      <button className="mobile-bar__item mobile-bar__logout" onClick={onLogout}>
        <span className="mobile-bar__emoji" aria-hidden="true">🔒</span>
        <span className="mobile-bar__label">Log Out</span>
      </button>
    </nav>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// E. APP ROOT
// ═══════════════════════════════════════════════════════════════════════════════
// AUTH GATE — login with IfaLMS credentials
// ═══════════════════════════════════════════════════════════════════════════════

// Fallback credentials (mirrors IfaLMS SEED_USERS). The live source of truth is
// always ifaLMS_v2 in localStorage — this list only applies on devices that have
// never loaded IfaLMS yet.
const KIDS_FALLBACK_USERS = [
  { id: 'u0', username: 'admin',    password: 'OrisaIfa22233.',    role: 'admin',   status: 'approved' },
  { id: 'u1', username: 'adewale',  password: 'student123', role: 'student', status: 'approved' },
  { id: 'u2', username: 'chiamaka', password: 'student123', role: 'student', status: 'pending'  },
  { id: 'u3', username: 'tayo',     password: 'student123', role: 'student', status: 'approved' },
  { id: 'u4', username: 'emeka',    password: 'student123', role: 'student', status: 'pending'  },
  { id: 'u5', username: 'ngozi',    password: 'student123', role: 'student', status: 'approved' },
];

const KIDS_SESSION_KEY = 'ifakids_session';

function getUsers() {
  try {
    const lms = JSON.parse(localStorage.getItem('ifaLMS_v2') || '{}');
    if (Array.isArray(lms.users) && lms.users.length) return lms.users;
  } catch (e) {}
  return KIDS_FALLBACK_USERS;
}

function checkKidsSession() {
  try {
    const raw = localStorage.getItem(KIDS_SESSION_KEY);
    if (!raw) return false;
    const { userId } = JSON.parse(raw);
    const user = getUsers().find(u => u.id === userId);
    if (!user) return false;
    return user.role === 'admin' || user.status === 'approved';
  } catch (e) { return false; }
}

function tryLogin(username, password) {
  const user = getUsers().find(u => u.username === username && u.password === password);
  if (!user) return { ok: false, msg: 'Incorrect username or password.' };
  if (user.status === 'pending') return { ok: false, msg: 'Your account is pending approval. Please contact your IFA Academy instructor.' };
  try { localStorage.setItem(KIDS_SESSION_KEY, JSON.stringify({ userId: user.id, ts: Date.now() })); } catch (e) {}
  return { ok: true };
}

function LoginGate({ onSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);
  const [showPw, setShowPw]     = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setTimeout(() => {
      const result = tryLogin(username.trim(), password);
      setLoading(false);
      if (result.ok) onSuccess();
      else setError(result.msg);
    }, 480); // brief simulated delay so it doesn't feel instant
  }

  return (
    <div className="ag-wrap">
      <div className="ag-orb ag-orb--a" />
      <div className="ag-orb ag-orb--b" />
      <div className="ag-card">
        <div className="ag-lock" aria-hidden="true">
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="8" y="22" width="32" height="22" rx="5" fill="#f0920c" fillOpacity="0.18" stroke="#f0920c" strokeWidth="2.2"/>
            <path d="M15 22V15a9 9 0 0 1 18 0v7" stroke="#f0920c" strokeWidth="2.4" strokeLinecap="round"/>
            <circle cx="24" cy="33" r="3.5" fill="#f0920c"/>
            <line x1="24" y1="36.5" x2="24" y2="40" stroke="#f0920c" strokeWidth="2.2" strokeLinecap="round"/>
          </svg>
        </div>
        <div className="ag-badge">IFA Academy Students Only</div>
        <h1 className="ag-title">Ifagrams for Kids &amp; Teens</h1>
        <p className="ag-sub">Sign in with your Ifacodemy account to continue.</p>

        <form className="ag-form" onSubmit={handleSubmit}>
          <div className="ag-field">
            <label className="ag-label" htmlFor="ag-username">Username</label>
            <input
              id="ag-username"
              className="ag-input"
              type="text"
              autoComplete="username"
              placeholder="Enter your username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              disabled={loading}
            />
          </div>
          <div className="ag-field">
            <label className="ag-label" htmlFor="ag-password">Password</label>
            <div className="ag-pw-wrap">
              <input
                id="ag-password"
                className="ag-input"
                type={showPw ? 'text' : 'password'}
                autoComplete="current-password"
                placeholder="Enter your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                disabled={loading}
              />
              <button
                type="button"
                className="ag-pw-toggle"
                onClick={() => setShowPw(v => !v)}
                aria-label={showPw ? 'Hide password' : 'Show password'}
              >
                {showPw ? '🙈' : '👁'}
              </button>
            </div>
          </div>
          {error && <div className="ag-error">{error}</div>}
          <button
            className="ag-btn"
            type="submit"
            disabled={loading || !username || !password}
          >
            {loading ? <span className="ag-spinner" /> : 'Sign In to Ifacodemy'}
          </button>
        </form>

        <a className="ag-back" href="../">← Back to Ifagram</a>
      </div>
    </div>
  );
}

function App() {
  const [loggedIn, setLoggedIn] = useState(null); // null = checking

  useEffect(() => {
    setLoggedIn(checkKidsSession());
  }, []);

  if (loggedIn === null) return null; // suppress flash on initial check

  function handleLogout() {
    try { localStorage.removeItem(KIDS_SESSION_KEY); } catch (e) {}
    setLoggedIn(false);
  }

  if (!loggedIn) return <LoginGate onSuccess={() => setLoggedIn(true)} />;

  return (
    <>
      <Header onLogout={handleLogout} />
      <main>
        <HeroSection />
        <MeetOrisaSection />
        <IfaSTEAMSection />
        <CountLearnSection />
        <OduPatternsSection />
        <IfanimationsSection />
        <GreetingsSection />
      </main>
      <Footer />
      <MobileBar onLogout={handleLogout} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
