/* ─────────────────────────────────────────────────────────────
   IFA Periodic Table — Kids & Teens Edition
   The 16 Principal Odu Ifa · Interactive · Sound · RTL
   CENProject · ifainternet.org/ifa-periodic-table/kids/
───────────────────────────────────────────────────────────── */

const { useState, useEffect, useMemo, useCallback } = React;

// ════════════════════════════════════════════════════════════
// 16 PRINCIPAL ODU DATA
// ════════════════════════════════════════════════════════════
const ODU = [
  {
    id: 1, name: 'Ogbe Meji', yoruba: 'Ogbè', meji: 'Ejiogbe', bitName: 'OgbeBit',
    code: '0000', category: 'primordial',
    element: 'Light', planet: 'Sun', emoji: '☀️',
    domains: ['Energy', 'Light', 'Creation', 'Consciousness'],
    kid_desc: 'The FIRST and most powerful Odu! Ogbe is pure light and energy — like the sun turned up to maximum brightness. Everything in the universe begins with Ogbe. When Ogbe speaks, the whole cosmos listens!'
  },
  {
    id: 2, name: 'Oyeku Meji', yoruba: 'Ọyẹkú', meji: 'Oyeku Meji', bitName: 'OyekuBit',
    code: '1111', category: 'primordial',
    element: 'Void', planet: 'Saturn', emoji: '🌑',
    domains: ['Void', 'Night', 'Ancestors', 'Transformation'],
    kid_desc: 'The keeper of deep cosmic secrets! Oyeku is the night sky full of stars — mysterious, infinite, and filled with hidden wisdom. Every ending holds a spectacular new beginning!'
  },
  {
    id: 3, name: 'Iwori Meji', yoruba: 'Ìwòrì', meji: 'Iwori Meji', bitName: 'IworiBit',
    code: '1001', category: 'cognitive',
    element: 'Air (Thought)', planet: 'Mercury', emoji: '👁️',
    domains: ['Wisdom', 'Mind', 'Intuition', 'Inner Eye'],
    kid_desc: 'The inner eye that sees EVERYTHING! Iwori is the power of your mind when you think deeply and discover something amazing. The ultimate Odu for brilliant thinkers and problem-solvers!'
  },
  {
    id: 4, name: 'Odi Meji', yoruba: 'Òdí', meji: 'Odi Meji', bitName: 'OdiBit',
    code: '0110', category: 'cognitive',
    element: 'Earth (Womb)', planet: 'Moon', emoji: '🌹',
    domains: ['Mystery', 'Hidden', 'Gestation', 'Female Energy'],
    kid_desc: 'The guardian of hidden treasures! Like a seed underground ready to sprout, Odi teaches that the most powerful things are invisible — until exactly the right moment arrives to reveal them!'
  },
  {
    id: 5, name: 'Irosun Meji', yoruba: 'Ìrósùn', meji: 'Irosun Meji', bitName: 'IrosunBit',
    code: '0011', category: 'vital',
    element: 'Water (Blood)', planet: 'Venus', emoji: '💎',
    domains: ['Blood', 'Healing', 'Medicine', 'Life Force'],
    kid_desc: 'The healing force of life! Irosun flows like a river of vital energy through everything that lives. It is the power of medicine, renewal, and making wounded things whole and strong again!'
  },
  {
    id: 6, name: 'Owonrin Meji', yoruba: 'Ọwọnrín', meji: 'Owonrin Meji', bitName: 'OwonrinBit',
    code: '1100', category: 'vital',
    element: 'Lightning', planet: 'Uranus', emoji: '⚡',
    domains: ['Lightning', 'Change', 'Revolution', 'Innovation'],
    kid_desc: 'LIGHTNING BOLT! Owonrin is pure electric energy — sudden, wild, and totally unstoppable! It is the Odu of invention, technology, and earth-shaking change. When Owonrin arrives, nothing stays the same!'
  },
  {
    id: 7, name: 'Obara Meji', yoruba: 'Ọbàrà', meji: 'Obara Meji', bitName: 'ObaraBit',
    code: '0111', category: 'social',
    element: 'Gold', planet: 'Jupiter', emoji: '👑',
    domains: ['Royalty', 'Leadership', 'Dignity', 'Authority'],
    kid_desc: 'The royal Odu of kings and queens! Obara walks with dignity and leads with wisdom and generosity. Learn from Obara how to carry yourself like royalty — because true leaders lift everyone around them!'
  },
  {
    id: 8, name: 'Okanran Meji', yoruba: 'Ọkànràn', meji: 'Okanran Meji', bitName: 'OkanranBit',
    code: '1110', category: 'social',
    element: 'Fire', planet: 'Mars', emoji: '🔥',
    domains: ['Fire', 'Courage', 'Conflict', 'Sudden Change'],
    kid_desc: 'The SPARK OF FIRE! Okanran strikes like a match on stone — sudden, bright, and impossible to ignore. The ultimate Odu of courage and bold action that breaks through every obstacle in its path!'
  },
  {
    id: 9, name: 'Ogunda Meji', yoruba: 'Ògúndá', meji: 'Ogunda Meji', bitName: 'OgundaBit',
    code: '0001', category: 'active',
    element: 'Iron', planet: 'Mars', emoji: '⚔️',
    domains: ['Iron', 'Roads', 'Technology', 'Progress'],
    kid_desc: 'The PATH-OPENER! Ogunda is the iron that builds roads and breaks every barrier. Sacred to Ogun — master of technology and iron — Ogunda clears the way to the future for all who follow!'
  },
  {
    id: 10, name: 'Osa Meji', yoruba: 'Ọsà', meji: 'Osa Meji', bitName: 'OsaBit',
    code: '1000', category: 'active',
    element: 'Wind', planet: 'Mercury', emoji: '🌪️',
    domains: ['Wind', 'Speed', 'Storms', 'Rapid Change'],
    kid_desc: 'The WHIRLWIND strikes! Osa moves faster than the wind and changes everything in an instant. Master of storms and surprise — no one can predict Osa\'s next move. Speed is its superpower!'
  },
  {
    id: 11, name: 'Ika Meji', yoruba: 'Ìká', meji: 'Ika Meji', bitName: 'IkaBit',
    code: '1011', category: 'strategic',
    element: 'Ether (Mind)', planet: 'Mercury', emoji: '🦊',
    domains: ['Cunning', 'Strategy', 'Intelligence', 'Protection'],
    kid_desc: 'The CLEVER strategist! Ika thinks ten steps ahead of everyone else. The smartest Odu — using wit, strategy, and pure intelligence to solve any puzzle or problem. Outsmarting, not overpowering!'
  },
  {
    id: 12, name: 'Oturupon Meji', yoruba: 'Òtúrúpọn', meji: 'Oturupon Meji', bitName: 'OturuponBit',
    code: '1101', category: 'strategic',
    element: 'Earth (Dense)', planet: 'Saturn', emoji: '🗿',
    domains: ['Trials', 'Strength', 'Testing', 'Endurance'],
    kid_desc: 'The test that makes you STRONGER! Like a diamond formed under pressure, Oturupon\'s challenges forge true strength of character. Every difficulty is secretly training you to become extraordinary!'
  },
  {
    id: 13, name: 'Otura Meji', yoruba: 'Òtúrá', meji: 'Otura Meji', bitName: 'OturaBit',
    code: '0100', category: 'sacred',
    element: 'Sound (Vibration)', planet: 'Neptune', emoji: '🔮',
    domains: ['Sacred Word', 'Creation', 'Communication', 'Orunmila'],
    kid_desc: 'The MAGIC of the sacred word! Otura holds the power of creation through language — where words shape reality itself. One of Orunmila\'s personal Odu, it teaches that what you say becomes what you create!'
  },
  {
    id: 14, name: 'Irete Meji', yoruba: 'Ìrẹtẹ', meji: 'Irete Meji', bitName: 'IreteBit',
    code: '0010', category: 'sacred',
    element: 'Wood (Deep Roots)', planet: 'Earth', emoji: '🌳',
    domains: ['Patience', 'Longevity', 'Deep Roots', 'Steadiness'],
    kid_desc: 'Deep roots, lasting strength! Like the ancient Iroko tree whose roots run deeper than any river, Irete teaches that patience and steady persistence build the greatest and most lasting achievements!'
  },
  {
    id: 15, name: 'Ose Meji', yoruba: 'Ọṣẹ', meji: 'Ose Meji', bitName: 'OseBit',
    code: '0101', category: 'abundant',
    element: 'Honey (Sweet Water)', planet: 'Venus', emoji: '🌺',
    domains: ['Abundance', 'Prosperity', 'Sweetness', 'Fertility'],
    kid_desc: 'ABUNDANCE overflows! Ose is honey, flowers, and everything beautiful — the Odu of prosperity, joy, and endless blessings. With Ose\'s energy, everything multiplies and sweetness fills every corner!'
  },
  {
    id: 16, name: 'Ofun Meji', yoruba: 'Òfún', meji: 'Ofun Meji', bitName: 'OfunBit',
    code: '1010', category: 'abundant',
    element: 'White Clay (Purity)', planet: 'Pluto', emoji: '✨',
    domains: ['Completion', 'Cosmic Law', 'Totality', 'Obatala'],
    kid_desc: 'The COSMIC COMPLETION! Ofun is the grand finale that contains ALL the other Odu within it. It is the universal law governing everything — the most complete Odu of all, where every ending becomes a new beginning!'
  },
];

// ════════════════════════════════════════════════════════════
// CATEGORY THEMES
// ════════════════════════════════════════════════════════════
const CATEGORIES = {
  primordial: { label: 'Symmetry',      color: '#ffd700', glow: 'rgba(255,215,0,0.5)',    bg: 'rgba(255,215,0,0.1)' },
  cognitive:  { label: 'Invariance',    color: '#4da6ff', glow: 'rgba(77,166,255,0.5)',   bg: 'rgba(77,166,255,0.1)' },
  vital:      { label: 'Duality',       color: '#ff6b6b', glow: 'rgba(255,107,107,0.5)',  bg: 'rgba(255,107,107,0.1)' },
  social:     { label: 'Emergence',     color: '#ffa040', glow: 'rgba(255,160,64,0.5)',   bg: 'rgba(255,160,64,0.1)' },
  active:     { label: 'Composition',   color: '#40e080', glow: 'rgba(64,224,128,0.5)',   bg: 'rgba(64,224,128,0.1)' },
  strategic:  { label: 'Holism',        color: '#b388ff', glow: 'rgba(179,136,255,0.5)',  bg: 'rgba(179,136,255,0.1)' },
  sacred:     { label: 'Reductionism',  color: '#ee66ff', glow: 'rgba(238,102,255,0.5)',  bg: 'rgba(238,102,255,0.1)' },
  abundant:   { label: 'Structuralism', color: '#ff80c0', glow: 'rgba(255,128,192,0.5)',  bg: 'rgba(255,128,192,0.1)' },
};

// ════════════════════════════════════════════════════════════
// SOUND SYSTEM — Web Audio API
// ════════════════════════════════════════════════════════════
let _audioCtx = null;

function getAudioCtx() {
  if (!_audioCtx) {
    try {
      _audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) { return null; }
  }
  if (_audioCtx.state === 'suspended') _audioCtx.resume();
  return _audioCtx;
}

// Each Odu gets a distinct root frequency (Hz)
const ROOT_FREQS = [
  523.25,  //  1 Ogbe     — C5  (bright, solar, pure)
  130.81,  //  2 Oyeku    — C3  (deep, cosmic void)
  659.25,  //  3 Iwori    — E5  (mental, clear, crisp)
  392.00,  //  4 Odi      — G4  (earthy, warm, hidden)
  440.00,  //  5 Irosun   — A4  (vital, resonant, healing)
  987.77,  //  6 Owonrin  — B5  (electric, bright, sharp)
  587.33,  //  7 Obara    — D5  (noble, expansive, golden)
  329.63,  //  8 Okanran  — E4  (fiery, energetic)
  293.66,  //  9 Ogunda   — D4  (iron-strong, forward)
  783.99,  // 10 Osa      — G5  (airy, swift, wind)
  880.00,  // 11 Ika      — A5  (clever, quick, bright)
  1174.66, // 12 Oturupon — D6  (dense, testing, structured)
  1318.51, // 13 Otura    — E6  (sacred, ethereal, magical)
  1046.50, // 14 Irete    — C6  (patient, rooted, steady)
  1568.00, // 15 Ose      — G6  (abundant, sweet, full)
  2093.00, // 16 Ofun     — C7  (cosmic, complete, highest)
];

function playOduSound(oduId) {
  try {
    const ctx = getAudioCtx();
    if (!ctx) return;
    const now  = ctx.currentTime;
    const root = ROOT_FREQS[oduId - 1];

    // Three-note arpeggio: root → perfect 5th → octave
    // Plus a shimmer echo copy at half-volume for a magical reverb feel
    const notes = [root, root * 1.5, root * 2];
    notes.forEach((freq, i) => {
      const t = now + i * 0.1;

      // Primary attack
      const osc  = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = (i === 0 && (oduId === 6 || oduId === 8)) ? 'square' : (i === 2 ? 'triangle' : 'sine');
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.22 / (i * 0.4 + 1), t + 0.018);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 1.4);
      osc.start(t);
      osc.stop(t + 1.5);

      // Shimmer echo (quiet, delayed)
      const osc2  = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.type = 'sine';
      osc2.frequency.value = freq * 2;
      const t2 = t + 0.07;
      gain2.gain.setValueAtTime(0, t2);
      gain2.gain.linearRampToValueAtTime(0.06 / (i + 1), t2 + 0.015);
      gain2.gain.exponentialRampToValueAtTime(0.001, t2 + 0.9);
      osc2.start(t2);
      osc2.stop(t2 + 1.0);
    });
  } catch (e) { /* silent fail */ }
}

// ════════════════════════════════════════════════════════════
// IFANIMATION SOUND ENGINE
// Each scene gets a distinct, thematic audio sting using the
// shared Web Audio context.  All tones fade-out gracefully.
// ════════════════════════════════════════════════════════════
function playIfanimSound(scene) {
  try {
    const ctx = getAudioCtx();
    if (!ctx) return;
    const base = ctx.currentTime;

    function tone(freq, t, dur, vol, type = 'sine') {
      const osc  = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, base + t);
      gain.gain.setValueAtTime(0,   base + t);
      gain.gain.linearRampToValueAtTime(vol, base + t + 0.022);
      gain.gain.setValueAtTime(vol, base + t + dur * 0.55);
      gain.gain.exponentialRampToValueAtTime(0.001, base + t + dur);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(base + t);
      osc.stop(base + t + dur + 0.06);
    }

    if (scene === 0) {
      // The Beginning — cosmic sunrise: deep rumble → rising golden arpeggio
      tone(55,    0,    1.6, 0.08, 'sine');
      tone(82.5,  0.1,  1.4, 0.06, 'sine');
      [261.63, 329.63, 392, 523.25, 659.25, 783.99].forEach((f, i) =>
        tone(f, 0.35 + i * 0.16, 0.9, 0.10, 'triangle'));
    }
    else if (scene === 1) {
      // The Foundation — Oyeku's deep mystery meets Ejiogbe's bright light
      [55, 82.5, 110].forEach((f, i) => tone(f, i * 0.08, 1.5, 0.07, 'sine'));
      [880, 1108.73, 1318.51].forEach((f, i) => tone(f, 0.18 + i * 0.12, 1.0, 0.08, 'triangle'));
      [440, 659.25, 880].forEach((f, i) => tone(f, 0.85 + i * 0.06, 1.0, 0.09, 'sine'));
    }
    else if (scene === 2) {
      // 16 Odu Emerge — cascading fountain of 16 magical chimes
      const notes = [261.63, 293.66, 329.63, 369.99, 392, 440, 493.88, 523.25,
                     587.33, 659.25, 739.99, 783.99, 880, 987.77, 1046.5, 1174.66];
      notes.forEach((f, i) => tone(f, i * 0.1, 0.72, 0.09, 'triangle'));
      tone(2093, 1.62, 0.5, 0.06, 'sine');
    }
    else if (scene === 3) {
      // 256 Atoms — rapid sparkle cluster builds to a shimmer
      [0,2,4,5,7,9,11,12,14,16].forEach((st, i) =>
        tone(523.25 * Math.pow(2, st / 12), i * 0.075, 0.5, 0.085, 'sine'));
      [523.25, 659.25, 783.99, 1046.5].forEach((f, i) =>
        tone(f, 0.78 + i * 0.06, 1.0, 0.09, 'triangle'));
    }
    else if (scene === 4) {
      // House of Ifa — grand triumphant fanfare with bold ascending melody
      [196, 246.94, 293.66].forEach((f, i) => tone(f, i * 0.03, 0.4, 0.09, 'square'));
      [392, 440, 493.88, 523.25, 587.33, 659.25, 783.99].forEach((f, i) =>
        tone(f, 0.32 + i * 0.13, 0.55, 0.09, 'triangle'));
      [196, 392, 587.33, 783.99].forEach((f, i) =>
        tone(f, 1.25 + i * 0.04, 1.3, 0.10, 'triangle'));
    }
    else if (scene === 5) {
      // All Fields — cosmic swirling orbit melody with sparkling overtones
      [523.25, 659.25, 783.99, 880, 1046.5, 880, 783.99, 659.25,
       523.25, 659.25, 783.99, 1046.5].forEach((f, i) =>
        tone(f, i * 0.14, 0.55, 0.08, 'sine'));
      [1318.51, 1567.98, 2093].forEach((f, i) =>
        tone(f, 0.5 + i * 0.22, 0.4, 0.05, 'sine'));
    }
    else if (scene === 6) {
      // YOU — exciting ta-da! quick stab → rising run → big triumphant finale
      [523.25, 659.25, 783.99].forEach((f, i) => tone(f, i * 0.04, 0.18, 0.12, 'triangle'));
      [523.25, 587.33, 659.25, 698.46, 783.99, 880, 987.77, 1046.5].forEach((f, i) =>
        tone(f, 0.18 + i * 0.09, 0.45, 0.09, 'triangle'));
      [261.63, 329.63, 392, 523.25, 659.25, 783.99].forEach((f, i) =>
        tone(f, 0.95 + i * 0.04, 1.7, 0.10, 'triangle'));
      [1046.5, 1318.51, 1567.98, 2093].forEach((f, i) =>
        tone(f, 1.15 + i * 0.1, 0.8, 0.06, 'sine'));
    }
  } catch (e) { /* silent fail */ }
}

// ════════════════════════════════════════════════════════════
// ODU MARKS COMPONENT
// bit = 0 → single bar (OgbeBit)
// bit = 1 → double bar (OyekuBit)
// Two-column display; for Meji both columns use the same code.
// ════════════════════════════════════════════════════════════
function OduMarks({ code, color, size = 'md' }) {
  const bits = code.split('').map(Number);

  const cfg = size === 'lg'
    ? { barW: 11, barH: 28, radius: 5, barGap: 6, colGap: 20, rowGap: 9 }
    : size === 'sm'
    ? { barW: 6,  barH: 14, radius: 3, barGap: 3, colGap: 10, rowGap: 5 }
    : { barW: 8,  barH: 20, radius: 4, barGap: 4, colGap: 14, rowGap: 7 };

  const barStyle = {
    display: 'inline-block',
    width:   cfg.barW + 'px',
    height:  cfg.barH + 'px',
    borderRadius: cfg.radius + 'px',
    background: color,
    boxShadow: `0 0 8px ${color}, 0 0 16px ${color}55`,
    flexShrink: 0,
  };

  const rowStyle = {
    display: 'flex',
    gap: cfg.barGap + 'px',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: (cfg.barW * 2 + cfg.barGap + 2) + 'px',
    height: cfg.barH + 'px',
  };

  const colStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: cfg.rowGap + 'px',
    alignItems: 'center',
  };

  const renderCol = () => (
    <div style={colStyle}>
      {bits.map((bit, i) => (
        <div key={i} style={rowStyle}>
          {bit === 1
            ? <><span style={barStyle}/><span style={barStyle}/></>
            : <span style={barStyle}/>
          }
        </div>
      ))}
    </div>
  );

  return (
    <div style={{ display: 'flex', gap: cfg.colGap + 'px', alignItems: 'flex-start' }}>
      {renderCol()} {/* LEFT column  — secondary Odu (Meji: same) */}
      {renderCol()} {/* RIGHT column — principal Odu */}
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// SPARKLE — tiny decorative animated element
// ════════════════════════════════════════════════════════════
function Sparkle({ x, y, size, delay, color }) {
  return (
    <div
      className="sparkle"
      style={{
        left: x + '%',
        top:  y + '%',
        width:  size + 'px',
        height: size + 'px',
        background: color,
        animationDelay: delay + 's',
        boxShadow: `0 0 ${size * 2}px ${color}`,
      }}
    />
  );
}

// ════════════════════════════════════════════════════════════
// ODU CARD
// ════════════════════════════════════════════════════════════
function OduCard({ odu, onClick }) {
  const cat = CATEGORIES[odu.category];
  const [tapped, setTapped] = useState(false);

  function handleClick() {
    setTapped(true);
    setTimeout(() => setTapped(false), 300);
    playOduSound(odu.id);
    onClick(odu);
  }

  return (
    <div
      className={`odu-card${tapped ? ' odu-card--tap' : ''}`}
      style={{
        '--cat-color': cat.color,
        '--cat-glow':  cat.glow,
        '--cat-bg':    cat.bg,
      }}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && handleClick()}
      aria-label={`Odu ${odu.id}: ${odu.name}`}
    >
      {/* Number badge */}
      <div className="odu-card__num">{odu.id}</div>

      {/* Emoji */}
      <div className="odu-card__emoji">{odu.emoji}</div>

      {/* IFA marks */}
      <div className="odu-card__marks">
        <OduMarks code={odu.code} color={cat.color} size="sm" />
      </div>

      {/* Name */}
      <div className="odu-card__name">{odu.name}</div>
      <div className="odu-card__yoruba">{odu.yoruba}</div>

      {/* Code */}
      <div className="odu-card__code">{odu.bitName} · {odu.code}</div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// ODU MODAL
// ════════════════════════════════════════════════════════════
function OduModal({ odu, onClose }) {
  const cat = CATEGORIES[odu.category];

  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-card"
        style={{ '--cat-color': cat.color, '--cat-glow': cat.glow, '--cat-bg': cat.bg }}
        onClick={e => e.stopPropagation()}
      >
        {/* Close */}
        <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>

        {/* Header */}
        <div className="modal-header">
          <div className="modal-emoji">{odu.emoji}</div>
          <div className="modal-header__text">
            <div className="modal-num">Odu #{odu.id}</div>
            <h2 className="modal-name">{odu.name}</h2>
            <div className="modal-yoruba">{odu.yoruba}</div>
            <div className="modal-meji">✦ {odu.meji}</div>
          </div>
        </div>

        {/* Marks + code */}
        <div className="modal-marks-wrap">
          <OduMarks code={odu.code} color={cat.color} size="lg" />
          <div className="modal-marks-label">
            <div className="modal-code-label">IFABit Code</div>
            <div className="modal-code">{odu.bitName} · {odu.code}</div>
          </div>
        </div>

        {/* Description */}
        <p className="modal-desc">{odu.kid_desc}</p>

        {/* Domains */}
        <div className="modal-domains">
          {odu.domains.map(d => (
            <span key={d} className="modal-domain" style={{ borderColor: cat.color, color: cat.color }}>
              {d}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <span className="modal-cat" style={{ background: cat.bg, color: cat.color, border: `1px solid ${cat.color}` }}>
            {cat.label}
          </span>
          <span className="modal-planet">🪐 {odu.planet}</span>
          <span className="modal-element">⊕ {odu.element}</span>
          <button
            className="modal-sound-btn"
            onClick={() => playOduSound(odu.id)}
            style={{ borderColor: cat.color, color: cat.color, boxShadow: `0 0 12px ${cat.glow}` }}
          >
            🔊 Play Sound
          </button>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// IFANIMATION — 7-scene cinematic story of Ifa
// ════════════════════════════════════════════════════════════

const IFANIM_FIELDS = [
  { label: 'Physics',      emoji: '⚛️',  col: '#4da6ff' },
  { label: 'Mathematics',  emoji: '∞',   col: '#ffd700' },
  { label: 'Biology',      emoji: '🧬',  col: '#40e080' },
  { label: 'Chemistry',    emoji: '⚗️',  col: '#ff6b6b' },
  { label: 'Astronomy',    emoji: '🔭',  col: '#b388ff' },
  { label: 'Music',        emoji: '🎵',  col: '#ffa040' },
  { label: 'Art',          emoji: '🎨',  col: '#ee66ff' },
  { label: 'Language',     emoji: '📖',  col: '#40e0d0' },
  { label: 'Philosophy',   emoji: '🦉',  col: '#ffd700' },
  { label: 'History',      emoji: '🏛️',  col: '#c8a870' },
  { label: 'Engineering',  emoji: '⚙️',  col: '#aaaaaa' },
  { label: 'Medicine',     emoji: '💊',  col: '#ff80c0' },
  { label: 'Economics',    emoji: '💹',  col: '#40e080' },
  { label: 'Psychology',   emoji: '🧠',  col: '#ff6b6b' },
  { label: 'Spirituality', emoji: '✨',  col: '#ffd700' },
  { label: 'Nature',       emoji: '🌿',  col: '#66dd66' },
];

const IFANIM_COLORS = [
  '#ffd700','#9988ff','#4da6ff','#40e0d0','#ff6b6b','#ffaa22',
  '#ffa040','#ff4444','#40e080','#80ffdd','#b388ff','#ee99ff',
  '#ee66ff','#88cc44','#ff80c0','#ffffff',
];

const IFANIM_NAMES = ['The Beginning','The Foundation','16 Odu Emerge','256 Ifa Atoms','House of Ifa','All Fields','You'];
const IFANIM_DURS  = [3400, 5600, 5000, 5400, 5600, 5800, 5200];

function AnimMarkCol({ code, color, barH, barW }) {
  const bits = (code || '0000').split('').map(Number);
  const gap = Math.round(barH * 0.22);
  const dblGap = Math.round(barW * 0.6);
  return (
    <div style={{ display:'flex', flexDirection:'column', gap, alignItems:'center' }}>
      {bits.map((bit, i) => (
        <div key={i} style={{ display:'flex', gap: dblGap }}>
          <div style={{ width:barW, height:barH, borderRadius:barW/2,
            background:color, boxShadow:`0 0 ${barW}px ${color}, 0 0 ${barW*2.5}px ${color}66`, flexShrink:0 }} />
          {bit === 1 && (
            <div style={{ width:barW, height:barH, borderRadius:barW/2,
              background:color, boxShadow:`0 0 ${barW}px ${color}, 0 0 ${barW*2.5}px ${color}66`, flexShrink:0 }} />
          )}
        </div>
      ))}
    </div>
  );
}

/* ── Scene 0 — THE BEGINNING ── */
function IfaScene0() {
  return (
    <div className="ifas ifas-0">
      <div className="ifas-0__ifa">IFA</div>
      <div className="ifas-0__main">The Structure of Everything</div>
      <div className="ifas-0__dots" aria-hidden="true">
        {IFANIM_COLORS.map((c,i) => (
          <span key={i} className="ifas-0__dot"
            style={{ background:c, boxShadow:`0 0 14px ${c}`, animationDelay:(i*0.09)+'s' }} />
        ))}
      </div>
      <div className="ifas-0__sub">All fields · All existence · One Single Structure</div>
    </div>
  );
}

/* ── Scene 1 — THE FOUNDATION ── */
function IfaScene1() {
  return (
    <div className="ifas ifas-1">
      <div className="ifas-1__top">In the beginning…</div>
      <div className="ifas-1__pair">
        <div className="ifas-1__block ifas-1__oyeku">
          <div className="ifas-1__cols">
            <AnimMarkCol code="1111" color="#9988ff" barH={50} barW={12} />
            <AnimMarkCol code="1111" color="#9988ff" barH={50} barW={12} />
          </div>
          <div className="ifas-1__mname" style={{color:'#9988ff'}}>Oyeku Meji</div>
          <div className="ifas-1__mrole">The Void · The Dark · The End</div>
        </div>
        <div className="ifas-1__plus">+</div>
        <div className="ifas-1__block ifas-1__ogbe">
          <div className="ifas-1__cols">
            <AnimMarkCol code="0000" color="#ffd700" barH={50} barW={12} />
            <AnimMarkCol code="0000" color="#ffd700" barH={50} barW={12} />
          </div>
          <div className="ifas-1__mname" style={{color:'#ffd700'}}>Ejiogbe</div>
          <div className="ifas-1__mrole">The Light · The Day · The Beginning</div>
        </div>
      </div>
      <div className="ifas-1__fbar" />
      <div className="ifas-1__flabel">THE FOUNDATION OF ALL KNOWLEDGE AND ALL EXISTENCE</div>
    </div>
  );
}

/* ── Scene 2 — 16 ODU EMERGE ── */
function IfaScene2() {
  return (
    <div className="ifas ifas-2">
      <div className="ifas-2__top">From Ogbe &amp; Oyeku, 16 Principal Odu emerge…</div>
      <div className="ifas-2__grid">
        {ODU.map((o, i) => (
          <div key={o.id} className="ifas-2__odu"
            style={{ '--c': IFANIM_COLORS[i], animationDelay:(i*0.11)+'s' }}>
            <span className="ifas-2__num">{o.id}</span>
            <span className="ifas-2__name">{o.name}</span>
          </div>
        ))}
      </div>
      <div className="ifas-2__sub">16 Forces · 16 Principles · 16 Dimensions of Reality</div>
    </div>
  );
}

/* ── Scene 3 — 256 IFA ATOMS ── */
function IfaScene3() {
  return (
    <div className="ifas ifas-3">
      <div className="ifas-3__eq">
        <span style={{color:'#ffd700'}}>16</span>
        <span className="ifas-3__op">×</span>
        <span style={{color:'#b388ff'}}>16</span>
        <span className="ifas-3__op">=</span>
        <span style={{color:'#40e080'}}>256</span>
        <span> Odu Ifa</span>
      </div>
      <div className="ifas-3__grid">
        {Array.from({length:256}, (_,i) => (
          <div key={i} className="ifas-3__atom"
            style={{ background:IFANIM_COLORS[i%16],
              boxShadow:`0 0 4px ${IFANIM_COLORS[i%16]}`,
              animationDelay:(i*0.011)+'s' }} />
        ))}
      </div>
      <div className="ifas-3__sub">The Ifa Atoms — Building Blocks of ALL Fields and ALL Existence</div>
    </div>
  );
}

/* ── Scene 4 — THE HOUSE OF IFA (redesigned) ── */
function IfaScene4() {
  function wallBrick(side, i) {
    const col = i % 10, row = Math.floor(i / 10);
    const bw = 14, bh = 11, bg = 2;
    const x = (side === 'L' ? 42 : 302) + col * (bw + bg);
    const y = 150 + row * (bh + bg);
    const c = IFANIM_COLORS[(i + (side === 'L' ? 0 : 5)) % 16];
    return (
      <rect key={side+i} x={x} y={y} width={bw} height={bh} rx={2}
        fill={c} opacity={0.86}
        style={{ animation:'ifanim-block 0.28s ease both',
          animationDelay:((side==='L' ? 0 : 0.18) + i*0.022)+'s',
          filter:`drop-shadow(0 0 4px ${c})` }} />
    );
  }
  return (
    <div className="ifas ifas-4">
      <div className="ifas-4__top">Ifa — The House of Knowledge</div>
      <div className="ifas-4__wrap">
        <svg className="ifas-4__svg" viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg">

          {/* ── Background apex glow ── */}
          <defs>
            <radialGradient id="s4bg" cx="50%" cy="8%" r="45%">
              <stop offset="0%" stopColor="#ffd700" stopOpacity="0.18"/>
              <stop offset="100%" stopColor="#ffd700" stopOpacity="0"/>
            </radialGradient>
          </defs>
          <rect x={0} y={0} width={500} height={300} fill="url(#s4bg)" />

          {/* ── Step pyramid — 3 layers ── */}
          <polygon points="250,14 494,142 6,142"
            fill="rgba(255,215,0,0.04)" stroke="#ffd700" strokeWidth="2.8"
            style={{filter:'drop-shadow(0 0 16px #ffd700)'}} />
          <polygon points="250,38 470,142 30,142"
            fill="rgba(255,215,0,0.055)" stroke="rgba(255,215,0,0.4)" strokeWidth="1.2" />
          <polygon points="250,62 446,142 54,142"
            fill="rgba(255,215,0,0.075)" stroke="rgba(255,215,0,0.25)" strokeWidth="1" />

          {/* ── Coloured roof bands ── */}
          {Array.from({length:11}, (_,i) => {
            const y = 78 + i*5.8, hw = 12 + i*22, c = IFANIM_COLORS[i%16];
            return <line key={'rb'+i} x1={250-hw} y1={y} x2={250+hw} y2={y}
              stroke={c} strokeWidth={2.8} opacity={0.58}
              style={{ animation:'ifanim-block 0.26s ease both',
                animationDelay:(i*0.06)+'s',
                filter:`drop-shadow(0 0 5px ${c})` }} />;
          })}

          {/* ── Left pillar ── */}
          <rect x={8} y={142} width={30} height={138} rx={4}
            fill="rgba(255,215,0,0.05)" stroke="#ffd700" strokeWidth="1.5" opacity={0.7}
            style={{animation:'ifanim-fade-up 0.6s 0.85s ease both'}} />
          <rect x={2} y={132} width={42} height={15} rx={3} fill="#ffd700" opacity={0.78}
            style={{filter:'drop-shadow(0 0 12px #ffd700)',animation:'ifanim-pop 0.4s 0.95s ease both'}} />
          {/* Right pillar */}
          <rect x={462} y={142} width={30} height={138} rx={4}
            fill="rgba(255,215,0,0.05)" stroke="#ffd700" strokeWidth="1.5" opacity={0.7}
            style={{animation:'ifanim-fade-up 0.6s 0.85s ease both'}} />
          <rect x={456} y={132} width={42} height={15} rx={3} fill="#ffd700" opacity={0.78}
            style={{filter:'drop-shadow(0 0 12px #ffd700)',animation:'ifanim-pop 0.4s 0.95s ease both'}} />

          {/* ── Wall bricks — left & right ── */}
          {Array.from({length:100}, (_,i) => wallBrick('L', i))}
          {Array.from({length:100}, (_,i) => wallBrick('R', i))}

          {/* ── Central arch door ── */}
          <rect x={200} y={150} width={100} height={130} fill="rgba(3,1,26,0.88)" />
          <path d="M209,280 L209,196 Q209,158 250,158 Q291,158 291,196 L291,280"
            fill="none" stroke="#ffd700" strokeWidth="2.2"
            style={{filter:'drop-shadow(0 0 12px #ffd700)',animation:'ifanim-pop 0.5s 1.7s ease both'}} />
          {/* Outer ring */}
          <circle cx={250} cy={188} r={28} fill="none"
            stroke="rgba(255,215,0,0.22)" strokeWidth="8"
            style={{filter:'drop-shadow(0 0 10px rgba(255,215,0,0.5))',animation:'ifanim-atom-in 0.5s 2s ease both'}} />
          {/* Inner ring */}
          <circle cx={250} cy={188} r={16} fill="none"
            stroke="rgba(153,136,255,0.5)" strokeWidth="4.5"
            style={{filter:'drop-shadow(0 0 8px rgba(153,136,255,0.6))',animation:'ifanim-atom-in 0.5s 2.1s ease both'}} />
          {/* Core */}
          <circle cx={250} cy={188} r={8} fill="rgba(255,215,0,0.25)"
            style={{filter:'drop-shadow(0 0 16px #ffd700)',animation:'ifanim-pop 0.4s 2.2s ease both'}} />
          <text x={250} y={193} textAnchor="middle" fill="#ffd700"
            fontSize={8.5} fontWeight="bold" fontFamily="Nunito,sans-serif" letterSpacing="2"
            style={{filter:'drop-shadow(0 0 6px #ffd700)'}}>IFA</text>
          <text x={250} y={248} textAnchor="middle"
            fill="rgba(255,215,0,0.48)" fontSize={6.8} fontFamily="Nunito,sans-serif">256 ODU IFA</text>

          {/* ── Foundation bar ── */}
          <rect x={4} y={281} width={492} height={17} rx={4} fill="#ffd700"
            style={{filter:'drop-shadow(0 0 24px #ffd700cc)',animation:'ifanim-pop 0.5s 2.6s ease both'}} />
          <text x={250} y={294} textAnchor="middle" fill="#07050f"
            fontSize={9} fontWeight="bold" fontFamily="Nunito,sans-serif">
            EJIOGBE + OYEKU MEJI — THE FOUNDATION
          </text>

          {/* ── Floating atom particles ── */}
          {[
            {cx:72,  cy:88,  r:4.5, c:IFANIM_COLORS[0]},
            {cx:178, cy:114, r:3.5, c:IFANIM_COLORS[3]},
            {cx:322, cy:108, r:4,   c:IFANIM_COLORS[7]},
            {cx:432, cy:92,  r:4.5, c:IFANIM_COLORS[11]},
            {cx:138, cy:68,  r:3.5, c:IFANIM_COLORS[5]},
            {cx:366, cy:74,  r:4,   c:IFANIM_COLORS[13]},
            {cx:250, cy:52,  r:3,   c:IFANIM_COLORS[1]},
            {cx:204, cy:108, r:3,   c:IFANIM_COLORS[9]},
          ].map((p,i) => (
            <circle key={'fp'+i} cx={p.cx} cy={p.cy} r={p.r} fill={p.c} opacity={0.82}
              style={{ filter:`drop-shadow(0 0 7px ${p.c})` }} />
          ))}

          {/* ── Apex star ── */}
          <text x={250} y={23} textAnchor="middle" fill="#ffd700"
            fontSize={20} fontFamily="serif"
            style={{filter:'drop-shadow(0 0 22px #ffd700)'}}>✦</text>

        </svg>
      </div>
      <div className="ifas-4__sub">One Single Structure — containing all of existence</div>
    </div>
  );
}

/* ── Scene 5 — ALL FIELDS ── */
function IfaScene5() {
  return (
    <div className="ifas ifas-5">
      <div className="ifas-5__top">Every Field. Every Subject. Every Reality.</div>
      <div className="ifas-5__arena">
        <div className="ifas-5__hub">
          <div className="ifas-5__hub-glyph">✦</div>
          <div className="ifas-5__hub-name">IFA</div>
        </div>
        {IFANIM_FIELDS.map((f, i) => {
          const angle = (i / IFANIM_FIELDS.length) * 2 * Math.PI - Math.PI / 2;
          const r = 40;
          const cx = 50 + r * Math.cos(angle);
          const cy = 50 + r * Math.sin(angle);
          return (
            <div key={f.label} className="ifas-5__field"
              style={{ left:cx+'%', top:cy+'%', color:f.col,
                borderColor:f.col, boxShadow:`0 0 10px ${f.col}55`,
                animationDelay:(0.1+i*0.19)+'s' }}>
              {f.emoji} {f.label}
            </div>
          );
        })}
      </div>
      <div className="ifas-5__sub">All branches of the ONE Tree — the single Structure called Ifa</div>
    </div>
  );
}

/* ── Scene 6 — YOU ── */
function IfaScene6() {
  return (
    <div className="ifas ifas-6">
      <div className="ifas-6__marks">
        <AnimMarkCol code="1111" color="#9988ff" barH={26} barW={7} />
        <AnimMarkCol code="1111" color="#9988ff" barH={26} barW={7} />
        <div style={{width:18}} />
        <AnimMarkCol code="0000" color="#ffd700" barH={26} barW={7} />
        <AnimMarkCol code="0000" color="#ffd700" barH={26} barW={7} />
      </div>
      <div className="ifas-6__you">YOU</div>
      <div className="ifas-6__main">are learning the building blocks of</div>
      <div className="ifas-6__everything">EVERYTHING</div>
      <div className="ifas-6__dots">
        {IFANIM_COLORS.map((c,i) => (
          <div key={i} className="ifas-6__dot"
            style={{ background:c, boxShadow:`0 0 9px ${c}`, animationDelay:(i*0.08)+'s' }} />
        ))}
      </div>
      <div className="ifas-6__caption">
        256 Odu Ifa · The Ifa Atoms · Building Blocks of All Knowledge and All Existence
      </div>
    </div>
  );
}

function renderIfaScene(s) {
  switch(s) {
    case 0: return <IfaScene0 />;
    case 1: return <IfaScene1 />;
    case 2: return <IfaScene2 />;
    case 3: return <IfaScene3 />;
    case 4: return <IfaScene4 />;
    case 5: return <IfaScene5 />;
    case 6: return <IfaScene6 />;
    default: return null;
  }
}

function Ifanimation() {
  const [scene,   setScene]   = useState(-1);
  const [akey,    setAkey]    = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing || scene < 0) return;
    if (scene >= IFANIM_DURS.length - 1) { setPlaying(false); return; }
    const t = setTimeout(() => setScene(s => s + 1), IFANIM_DURS[scene]);
    return () => clearTimeout(t);
  }, [playing, scene]);

  // Play a themed audio sting whenever the active scene changes
  useEffect(() => {
    if (scene >= 0) playIfanimSound(scene);
  }, [scene]);

  function start()       { setScene(0); setAkey(k=>k+1); setPlaying(true); }
  function goPrev()      { setScene(s=>Math.max(0,s-1)); setAkey(k=>k+1); setPlaying(false); }
  function goNext()      { setScene(s=>Math.min(6,s+1)); setAkey(k=>k+1); setPlaying(false); }
  function goTo(i)       { setScene(i); setAkey(k=>k+1); setPlaying(false); }
  function togglePlay()  {
    if (scene < 0 || (scene >= 6 && !playing)) { start(); return; }
    setPlaying(p => !p);
  }

  return (
    <section className="ifanim-section">
      <div className="ifanim-hd">
        <h2 className="ifanim-hd__title">
          Ifa Animation<span className="ifanim-hd__sep"> · </span>
          <span className="ifanim-hd__sub">Ifanimation</span>
        </h2>
        <p className="ifanim-hd__desc">
          Watch how all fields of knowledge and existence form a single Structure called <strong>Ifa</strong> —
          built from <strong>256 Odu Ifa</strong>, all emerging from two primordial Foundations:
          <strong> Ogbe</strong> and <strong>Oyeku</strong>.
        </p>
      </div>

      <div className="ifanim-theatre">
        {/* SCREEN */}
        <div className="ifanim-screen">
          {scene < 0 && (
            <div className="ifanim-splash" onClick={start}>
              <div className="ifanim-splash__glyph">✦</div>
              <div className="ifanim-splash__title">Ifanimation</div>
              <div className="ifanim-splash__sub">The Story of Ifa — The Structure of Everything</div>
              <div className="ifanim-splash__btn" role="button">▶ Watch Now</div>
            </div>
          )}
          {scene >= 0 && (
            <div key={akey} className="ifanim-scene-wrap">
              {renderIfaScene(scene)}
            </div>
          )}
          {scene >= 0 && (
            <div className="ifanim-scene-tag">{IFANIM_NAMES[scene]}</div>
          )}
        </div>

        {/* PROGRESS DOTS */}
        {scene >= 0 && (
          <div className="ifanim-progress">
            {IFANIM_NAMES.map((name, i) => (
              <button key={i} title={name}
                className={'ifanim-dot'+(scene===i?' ifanim-dot--on':scene>i?' ifanim-dot--done':'')}
                onClick={() => goTo(i)} />
            ))}
          </div>
        )}

        {/* CONTROLS */}
        <div className="ifanim-controls">
          {scene < 0 ? (
            <button className="ifanim-btn ifanim-btn--main" onClick={start}>▶ Play Animation</button>
          ) : (
            <>
              <button className="ifanim-btn" onClick={goPrev} disabled={scene<=0}>‹ Prev</button>
              <button className="ifanim-btn ifanim-btn--main" onClick={togglePlay}>
                {playing ? '⏸ Pause' : scene>=6 ? '↺ Replay' : '▶ Play'}
              </button>
              <button className="ifanim-btn" onClick={goNext} disabled={scene>=6}>Next ›</button>
            </>
          )}
        </div>

        {/* DOWNLOAD */}
        <div className="ifanim-dl">
          <a
            href="./ifanimation.mp4"
            download="Ifanimation-Ifa-Periodic-Table-Kids.mp4"
            className="ifanim-dl__btn"
          >
            ⬇ Download Video
          </a>
          <span className="ifanim-dl__info">
            MP4 · HD · Share on WhatsApp &amp; Social Media
          </span>
        </div>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════
// APP
// ════════════════════════════════════════════════════════════
function App() {
  const [selected, setSelected] = useState(null);

  // Deterministic pseudo-random stars (no RNG — consistent on re-renders)
  const stars = useMemo(() => Array.from({ length: 70 }, (_, i) => ({
    id:    i,
    x:     ((Math.sin(i * 137.5 + 1) * 50) + 50),
    y:     ((Math.cos(i * 97.3  + 2) * 50) + 50),
    size:  (Math.abs(Math.sin(i * 43.7)) * 2.5 + 0.8).toFixed(1),
    delay: (Math.abs(Math.sin(i * 21.1)) * 5).toFixed(2),
    dur:   (Math.abs(Math.sin(i * 67.9)) * 3 + 2).toFixed(1),
    color: ['#ffd700', '#ff80c0', '#4da6ff', '#40e080', '#b388ff', '#ffa040'][i % 6],
  })), []);

  // RTL arrangement: Ogbe (id=1) appears on the right
  // The grid uses direction:rtl, so DOM order 1→16 renders Ogbe at top-right
  const handleCardClick = useCallback(odu => setSelected(odu), []);
  const handleClose     = useCallback(() => setSelected(null),  []);

  return (
    <div className="kids-app">

      {/* ── Background Stars ── */}
      <div className="stars-layer" aria-hidden="true">
        {stars.map(s => (
          <div
            key={s.id}
            className="star"
            style={{
              left:            s.x + '%',
              top:             s.y + '%',
              width:           s.size + 'px',
              height:          s.size + 'px',
              background:      s.color,
              boxShadow:       `0 0 ${+s.size * 2}px ${s.color}`,
              animationDelay:  s.delay + 's',
              animationDuration: s.dur + 's',
            }}
          />
        ))}
      </div>

      {/* ── Header ── */}
      <header className="kids-header">
        <div className="kids-header__top">
          <a href="/ifa-periodic-table/" className="kids-back">← Full Table</a>
          <div className="kids-edition-badge">Kids &amp; Teens Edition</div>
        </div>
        <div className="kids-header__inner">
          <div className="kids-header__glyph" aria-hidden="true">✦</div>
          <h1 className="kids-title">
            <span className="kids-title__main">Ifa Periodic Table</span>
          </h1>
          <p className="kids-subtitle">
            Discover the 16 Principal Odu Ifa — the building blocks of ALL knowledge in the universe!
          </p>
          <div className="kids-stats">
            <div className="kids-stat">
              <span className="kids-stat__num">16</span>
              <span className="kids-stat__lbl">Odu</span>
            </div>
            <div className="kids-stat__div">×</div>
            <div className="kids-stat">
              <span className="kids-stat__num">16</span>
              <span className="kids-stat__lbl">Periods</span>
            </div>
            <div className="kids-stat__div">=</div>
            <div className="kids-stat">
              <span className="kids-stat__num">256</span>
              <span className="kids-stat__lbl">Ifatoms</span>
            </div>
          </div>
          <p className="kids-tap-hint">👆 Tap any Odu card to hear its sound and learn more!</p>
        </div>
      </header>

      {/* ── RTL Label ── */}
      <div className="rtl-label" aria-label="Read right to left">
        <span className="rtl-label__text">← Read Right to Left in Ifa Tradition →</span>
        <span className="rtl-label__sub">Ogbe (1) is on the RIGHT · Ofun (16) is on the LEFT. IFA Binary Digit (IFABit) Representation and Modern Bit Representation</span>
      </div>

      {/* ── Odu Grid (direction: rtl → Ogbe at top-right) ── */}
      <section className="odu-section">
        <div className="odu-grid">
          {ODU.map(odu => (
            <OduCard key={odu.id} odu={odu} onClick={handleCardClick} />
          ))}
        </div>
      </section>

      {/* ── Category Legend ── */}
      <section className="legend-section">
        <h2 className="legend-title">Odu Categories</h2>
        <div className="legend-grid">
          {Object.entries(CATEGORIES).map(([key, cat]) => (
            <div key={key} className="legend-item" style={{ '--cat-color': cat.color, '--cat-bg': cat.bg }}>
              <span className="legend-dot" style={{ background: cat.color, boxShadow: `0 0 8px ${cat.color}` }} />
              <span className="legend-name">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
              <span className="legend-label">{cat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Ifanimation ── */}
      <Ifanimation />

      {/* ── Footer ── */}
      <footer className="kids-footer">
        <a href="/ifa-periodic-table/" className="kids-footer__link">← Back to Full Ifa Periodic Table</a>
        <div className="kids-footer__brand">
          IFA Internet · CENProject · ifainternet.org
        </div>
      </footer>

      {/* ── Modal ── */}
      {selected && <OduModal odu={selected} onClose={handleClose} />}

    </div>
  );
}

// ════════════════════════════════════════════════════════════
// MOUNT
// ════════════════════════════════════════════════════════════
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
