// Ayò Ọlọ́pọ́nfá Olójú Mẹ́rìndínlógún — TEST BUILD
// Awale/Oware mechanics: 8 seeds, 2×4 Odu pattern, chain capture, starvation rule
// Play IFA Games · CENProject
// ============================================================

const { useState, useCallback, useEffect, useRef } = React;

// ── 16 Odu Data ──────────────────────────────────────────────
const ODU = [
  // P1 side (pits 0-7, left→right)
  { id:'ogbe',     num:1,  name:'Ogbe',     meji:'Eji Ogbe',      color:'#f0c840', field:'Physics & Energy',         steam:'Natural Science',  sidechrx:'Symmetry',     tagline:'The Primal Light — origin of all energy',        meta:'Energy field models, wave functions, quantum states'        },
  { id:'oyeku',    num:2,  name:'Oyeku',    meji:'Oyeku Meji',     color:'#8892a4', field:'Mathematics & Zero',       steam:'Mathematics',      sidechrx:'Invariance',   tagline:'The Void — infinite potential of zero',           meta:'Set theory, null space, probability distributions'         },
  { id:'iwori',    num:3,  name:'Iwori',    meji:'Iwori Meji',     color:'#a855f7', field:'Neuroscience & Mind',      steam:'Natural Science',  sidechrx:'Emergence',    tagline:'The Inner Eye — consciousness and intelligence',   meta:'Neural network models, cognitive architectures'            },
  { id:'odi',      num:4,  name:'Odi',      meji:'Odi Meji',       color:'#00c87c', field:'Biology & Medicine',       steam:'Natural Science',  sidechrx:'Composition',  tagline:'The Hidden Deep — life and organic systems',       meta:'Biological system models, epidemiological simulations'     },
  { id:'irosun',   num:5,  name:'Irosun',   meji:'Irosun Meji',    color:'#e9498a', field:'Chemistry & Matter',       steam:'Natural Science',  sidechrx:'Duality',      tagline:'The Red Energy — transformation and exchange',     meta:'Reaction kinetics, material property models'               },
  { id:'owonrin',  num:6,  name:'Owonrin',  meji:'Owonrin Meji',   color:'#00d9b8', field:'Engineering & Structure',  steam:'Engineering',      sidechrx:'Reductionism', tagline:'The Dynamic Force — disruption and innovation',    meta:'Structural analysis, chaos and complexity models'          },
  { id:'obara',    num:7,  name:'Obara',    meji:'Obara Meji',     color:'#f5c518', field:'Arts & Aesthetics',        steam:'Arts',             sidechrx:'Holism',       tagline:'The Golden King — mastery and creative power',     meta:'Aesthetic models, creative pattern simulations'           },
  { id:'okanran',  num:8,  name:'Okanran',  meji:'Okanran Meji',   color:'#4aa3ff', field:'Technology & Innovation',  steam:'Technology',       sidechrx:'Others',       tagline:'The Spark — sudden insight and breakthrough',      meta:'Innovation diffusion, technology adoption models'          },
  // P2 side (pits 8-15)
  { id:'ogunda',   num:9,  name:'Ogunda',   meji:'Ogunda Meji',    color:'#e8772a', field:'Law & Social Justice',     steam:'Social Science',   sidechrx:'Symmetry',     tagline:'The Pathclearer — justice, law, and progression',  meta:'Legal system models, social justice simulations'           },
  { id:'osa',      num:10, name:'Osa',      meji:'Osa Meji',       color:'#ff4d6d', field:'Education & Wisdom',       steam:'Education',        sidechrx:'Emergence',    tagline:'The Wind of Change — rapid learning and growth',   meta:'Learning curve models, educational simulations'           },
  { id:'ika',      num:11, name:'Ika',      meji:'Ika Meji',       color:'#00b4a6', field:'Economics & Exchange',     steam:'Social Science',   sidechrx:'Composition',  tagline:'The Value Web — economic flow and resource',       meta:'Economic network models, market simulations'              },
  { id:'oturupon', num:12, name:'Oturupon', meji:'Oturupon Meji',  color:'#6b7280', field:'Earth & Environment',      steam:'Natural Science',  sidechrx:'Holism',       tagline:'The Deep Earth — ecology and earth systems',       meta:'Climate models, ecological system simulations'            },
  { id:'otura',    num:13, name:'Otura',    meji:'Otura Meji',     color:'#c084fc', field:'Philosophy & Metaphysics', steam:'Arts',             sidechrx:'Invariance',   tagline:'The Elder Wisdom — universal law and philosophy',  meta:'Philosophical framework models, ontological maps'         },
  { id:'irete',    num:14, name:'Irete',    meji:'Irete Meji',     color:'#34d399', field:'Medicine & Healing',       steam:'Natural Science',  sidechrx:'Reductionism', tagline:'The Healer — medicine, restoration, wholeness',    meta:'Healthcare models, healing protocol simulations'          },
  { id:'ose',      num:15, name:'Ose',      meji:'Ose Meji',       color:'#fb923c', field:'Language & Communication', steam:'Social Science',   sidechrx:'Duality',      tagline:'The Eloquent Flow — language and connection',      meta:'Communication network models, language spread simulations' },
  { id:'ofun',     num:16, name:'Ofun',     meji:'Ofun Meji',      color:'#818cf8', field:'Cosmos & Space',           steam:'Mathematics',      sidechrx:'Symmetry',     tagline:'The Cosmic Totality — the universe and existence', meta:'Cosmological models, space-time simulations'              },
];

// ── IFA Matrix Node Data ──────────────────────────────────────
const STEAMSEX_NODES = [
  { letter:'S', name:'Science',     full:'Natural Science', steamKey:'Natural Science', desc:'Natural phenomena & physical laws'   },
  { letter:'T', name:'Technology',  full:'Technology',      steamKey:'Technology',      desc:'Applied tools & digital systems'     },
  { letter:'E', name:'Engineering', full:'Engineering',     steamKey:'Engineering',     desc:'Structure, design & built systems'   },
  { letter:'A', name:'Arts',        full:'Arts & Design',   steamKey:'Arts',            desc:'Creativity, aesthetics & expression' },
  { letter:'M', name:'Mathematics', full:'Mathematics',     steamKey:'Mathematics',     desc:'Pattern, number & formal logic'      },
  { letter:'S', name:'Social',      full:'Social Sciences', steamKey:'Social Science',  desc:'Society, culture & human systems'    },
  { letter:'E', name:'Education',   full:'Education',       steamKey:'Education',       desc:'Learning, pedagogy & knowledge'      },
  { letter:'X', name:'Others',      full:'Others',          steamKey:null,              desc:'Cross-domain & emergent fields'      },
];

const SIDECHRX_NODES = [
  { letter:'S', name:'Symmetry',     full:'Symmetry',     desc:'Balance, conservation & invariant form'  },
  { letter:'I', name:'Invariance',   full:'Invariance',   desc:'Constants, universals & stable truths'   },
  { letter:'D', name:'Duality',      full:'Duality',      desc:'Polarity, complementarity & opposition'  },
  { letter:'E', name:'Emergence',    full:'Emergence',    desc:'New order arising from complexity'        },
  { letter:'C', name:'Composition',  full:'Composition',  desc:'Assembly, hierarchy & structured parts'  },
  { letter:'H', name:'Holism',       full:'Holism',       desc:'Unity, integration & irreducible wholes' },
  { letter:'R', name:'Reductionism', full:'Reductionism', desc:'Analysis, decomposition & root causes'   },
  { letter:'X', name:'Others',       full:'Others',       desc:'Boundary-crossing & trans-categorical'   },
];

const MATRIX_GRID = [7, 0, 1, 6, null, 2, 5, 4, 3];

// ═══════════════════════════════════════════════════════════════
// ── AWALE GAME LOGIC (Oware/PlayAwale rules) ──────────────────
// Board: 16 pits, no stores
//   Pits 0-7:  Player 1 (bottom row, left→right)
//   Pits 8-15: Player 2 (top row; displayed right→left as [15..8])
// Sowing: counterclockwise (0→1→…→15→0), skip starting pit
// Capture: last seed lands in opponent pit with 2 or 3 seeds
//   Chain:  continue backward through consecutive opp pits with 2-3
//   Grand slam cancel: if capture would empty ALL opponent pits → void
// Starvation: cannot leave opponent with 0 seeds (if avoidable)
// ═══════════════════════════════════════════════════════════════

const P1_POTS  = [0,1,2,3,4,5,6,7];
const P2_POTS  = [8,9,10,11,12,13,14,15];
const P2_DISP  = [15,14,13,12,11,10,9,8]; // display order top-row  L→R (RTL: Odu 9→16)
const P1_DISP  = [7,6,5,4,3,2,1,0];     // display order bottom-row L→R (RTL: Odu 1→8)

// ── Difficulty Levels ─────────────────────────────────────────
const LEVELS = [
  { id: 'ope1',    label: 'Òpè I',      sub: 'Beginner',     color: '#00c87c', oracleName: 'Oracle · Beginner'    },
  { id: 'ope2',    label: 'Òpè II',     sub: 'Intermediate', color: '#f0c840', oracleName: 'Oracle · Intermediate'},
  { id: 'ota',     label: 'Ọ̀ta',       sub: 'Expert',       color: '#e8772a', oracleName: 'Oracle · Expert'      },
  { id: 'agbaota', label: 'Àgbà-Ọ̀ta', sub: 'Veteran',      color: '#c084fc', oracleName: 'Oracle · Veteran', dormant: true },
];

// ═══════════════════════════════════════════════════════════════
// ── SOUND ENGINE — Web Audio API, no external files ───────────
// All sounds procedurally synthesised. Designed for Ayò Ọlọ́pọ́nfá:
// Caesalpinia bonduc seed acoustics on carved hardwood Opon Ifa.
// ═══════════════════════════════════════════════════════════════
const SoundEngine = (() => {
  let _ctx = null;
  let _muted = false;

  function getCtx() {
    if (!_ctx) _ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (_ctx.state === 'suspended') _ctx.resume();
    return _ctx;
  }

  // ── Raw noise burst (uses absolute Web Audio time t) ─────────
  // Exponential-decay shaped white noise → bandpass → gain envelope
  function _noise(c, t, freq, Q, dur, gain, decay) {
    const sr  = c.sampleRate;
    const buf = c.createBuffer(1, Math.ceil(sr * dur), sr);
    const d   = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++)
      d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / d.length, decay);
    const src = c.createBufferSource();
    src.buffer = buf;
    const bpf = c.createBiquadFilter();
    bpf.type = 'bandpass'; bpf.frequency.value = freq; bpf.Q.value = Q;
    const g = c.createGain();
    g.gain.setValueAtTime(gain, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    src.connect(bpf); bpf.connect(g); g.connect(c.destination);
    src.start(t);
  }

  // ── Oscillator tone (uses absolute Web Audio time t) ──────────
  function _tone(c, t, freq, dur, gain, type = 'sine') {
    const osc = c.createOscillator();
    const g   = c.createGain();
    osc.type  = type;
    osc.frequency.value = freq;
    g.gain.setValueAtTime(gain, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    osc.connect(g); g.connect(c.destination);
    osc.start(t); osc.stop(t + dur + 0.05);
  }

  // ── Single seed impact — three timbres ───────────────────────
  //   isScoop=true  : hard dry inter-seed rattle (pickup from pit)
  //   isEmpty=true  : hollow woody tok (seed into empty carved pit)
  //   isEmpty=false : muted dense clink (seed onto cushion of seeds)
  //   isEmpty=null  : generic click (same as seeded)
  function seedClick(delay = 0, pitchMult = 1, isEmpty = null, isScoop = false) {
    if (_muted) return;
    try {
      const c = getCtx();
      const t = c.currentTime + delay;
      if (isScoop) {
        // Two-layer dry knock — hard Caesalpinia bonduc seeds colliding during pickup
        _noise(c, t,         1050 * pitchMult, 1.5, 0.020, 0.44, 5.5);
        _noise(c, t + 0.004, 660  * pitchMult, 2.2, 0.018, 0.20, 4.0);
      } else if (isEmpty) {
        // Three-layer hollow tok — seed strikes empty carved wooden pit:
        //   1. Sharp transient (hard seed hitting the wood floor)
        //   2. Resonant body bloom (hollow chamber amplification)
        //   3. Sub-frequency ring (wood body resonance of the pit)
        _noise(c, t,         490 * pitchMult, 3.2, 0.028, 0.62, 3.0);
        _noise(c, t + 0.006, 330 * pitchMult, 5.8, 0.062, 0.36, 1.5);
        _tone( c, t + 0.010, 280 * pitchMult, 0.068, 0.065);
      } else {
        // Two-layer muted clink — seed lands on pile of existing seeds:
        //   1. Impact transient (harder, higher pitch = seed-on-seed)
        //   2. Soft settle (mass shifting, lower register)
        _noise(c, t,         790 * pitchMult, 2.0, 0.022, 0.52, 5.2);
        _noise(c, t + 0.005, 540 * pitchMult, 2.8, 0.028, 0.20, 3.8);
      }
    } catch (e) { /* silently ignore if audio unavailable */ }
  }

  // ── Sow: pickup rattle + staggered per-pit drops ─────────────
  // steps (optional): [{pit, board}] — board = state AFTER seed placed.
  //   board[pit] === 1 → pit was empty before → hollow tok timbre.
  // More seeds in hand = denser scoop rattle (mass of seeds shifts).
  function sow(seedCount, steps) {
    if (_muted) return 0;
    const interval = 0.38;  // seconds between drops — natural hand-sowing pace
    const base     = 0.05;  // 50ms head-start matches animation BASE constant
    const n = Math.min(seedCount, 16);

    // Scoop rattle: seeds slide & knock as they leave the source pit.
    // Up to 5 overlapping micro-clicks; denser for larger handfuls.
    const sc = Math.min(n, 5);
    const massOffset = sc > 3 ? 0.06 : 0; // heavier handful → slightly lower pitch
    for (let i = 0; i < sc; i++) {
      const dt = 0.004 + i * (0.026 + Math.random() * 0.012);
      const pm = (1.05 + Math.random() * 0.28) * (1 - massOffset);
      seedClick(dt, pm, null, true);
    }

    // Per-pit drops with ±12ms natural jitter and pit-aware timbre
    for (let i = 0; i < n; i++) {
      const jitter  = (Math.random() - 0.5) * 0.024;
      const isEmpty = steps ? (steps[i]?.board[steps[i]?.pit] === 1) : null;
      const pitPm   = 0.82 + Math.random() * 0.42; // slight acoustic variation pit-to-pit
      seedClick(base + i * interval + jitter, pitPm, isEmpty, false);
    }

    return (base + n * interval) * 1000; // ms (for timing reference)
  }

  // ── Capture: fast sweep + warm collect tone ───────────────────
  function capture(seedCount) {
    if (_muted) return;
    try {
      const c  = getCtx();
      const t0 = c.currentTime;
      const n  = Math.min(seedCount, 8);
      // Ascending pitch sweep (excited grab — rising energy)
      for (let i = 0; i < n; i++)
        seedClick(i * 0.046, 1.10 + i * 0.08, false);
      // Warm collect tone — fundamental + sub-harmonic
      _tone(c, t0 + n * 0.046 + 0.055, 528, 0.65, 0.14);
      _tone(c, t0 + n * 0.046 + 0.055, 264, 0.45, 0.05);
    } catch (e) {}
  }

  // ── Grand Slam cancel — descending "no" tone ──────────────────
  function cancel() {
    if (_muted) return;
    try {
      const c  = getCtx();
      const t0 = c.currentTime;
      const osc = c.createOscillator();
      const g   = c.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(340, t0);
      osc.frequency.exponentialRampToValueAtTime(150, t0 + 0.30);
      g.gain.setValueAtTime(0.10, t0);
      g.gain.exponentialRampToValueAtTime(0.001, t0 + 0.30);
      osc.connect(g); g.connect(c.destination);
      osc.start(t0); osc.stop(t0 + 0.32);
    } catch (e) {}
  }

  // ── Win — Ifa-flavored pentatonic ascent + seed cascade ───────
  function win() {
    if (_muted) return;
    try {
      const c  = getCtx();
      const t0 = c.currentTime;
      // Ascending pentatonic arpeggio with octave shimmer on each note
      [392, 523, 659, 784, 1047].forEach((f, i) => {
        _tone(c, t0 + i * 0.18,        f,     0.42, 0.20, 'triangle');
        _tone(c, t0 + i * 0.18 + 0.01, f * 2, 0.26, 0.06, 'sine');
      });
      // Celebratory seed cascade — hollow and seeded pits alternating
      for (let i = 0; i < 5; i++)
        seedClick(0.95 + i * 0.055, 0.88 + Math.random() * 0.50, i % 2 === 0);
    } catch (e) {}
  }

  // ── Draw — balanced suspension ────────────────────────────────
  function draw() {
    if (_muted) return;
    try {
      const c  = getCtx();
      const t0 = c.currentTime;
      [440, 415, 440, 415].forEach((f, i) =>
        _tone(c, t0 + i * 0.22, f, 0.32, 0.11, 'sine'));
    } catch (e) {}
  }

  // ── New Game — seed-pour cascade then ready chime ─────────────
  // Simulates 128 seeds poured back onto the board and settling
  // into all 16 pits (pitch descends as seeds spread and settle).
  function startNewGame() {
    if (_muted) return;
    try {
      const c  = getCtx();
      const t0 = c.currentTime;
      // Rapid cascade: 14 grains, pitch descends 1.5× → 0.7×
      for (let i = 0; i < 14; i++) {
        const dt = 0.012 + i * (0.030 + Math.random() * 0.010);
        _noise(c, t0 + dt, 920 * (1.5 - i * 0.052), 1.8, 0.018, Math.max(0.04, 0.40 - i * 0.017), 5.0);
      }
      // Two hollow thuds — last seeds dropping into pits
      seedClick(0.58, 0.60, true);
      seedClick(0.68, 0.52, true);
      // Ready chime — gentle awakening (perfect fifth)
      _tone(c, t0 + 0.88, 440, 0.85, 0.09);
      _tone(c, t0 + 0.88, 660, 0.55, 0.05);
    } catch (e) {}
  }

  // ── Level select — tonal identity per difficulty ──────────────
  //   Ope I    (Beginner)    : gentle 2-note ascent — welcoming
  //   Ope II   (Intermediate): confident 3-note major — ready
  //   Ota      (Expert)      : minor-flavoured triad + seed — tense
  //   Àgbà-Ọ̀ta (Veteran)   : deep drone + bell + thud — ceremonial
  function levelSelect(levelId) {
    if (_muted) return;
    try {
      const c  = getCtx();
      const t0 = c.currentTime + 0.03;
      switch (levelId) {
        case 'ope1':
          _tone(c, t0,        523, 0.30, 0.15, 'triangle'); // C5
          _tone(c, t0 + 0.20, 659, 0.36, 0.13, 'triangle'); // E5
          break;
        case 'ope2':
          _tone(c, t0,        523, 0.22, 0.14, 'triangle'); // C5
          _tone(c, t0 + 0.17, 659, 0.22, 0.13, 'triangle'); // E5
          _tone(c, t0 + 0.34, 784, 0.34, 0.16, 'triangle'); // G5
          break;
        case 'ota':
          _tone(c, t0,        523, 0.20, 0.14, 'sawtooth'); // C5
          _tone(c, t0 + 0.14, 622, 0.22, 0.13, 'sawtooth'); // Eb5 (minor 3rd — tension)
          _tone(c, t0 + 0.28, 784, 0.32, 0.15, 'sawtooth'); // G5
          seedClick(0.46, 0.92, false);                       // sharp punctuation
          break;
        case 'agbaota':
          _tone(c, t0,        110,  0.90, 0.13, 'sine');     // A2 — deep drone
          _tone(c, t0 + 0.06, 220,  0.75, 0.08, 'sine');     // A3 — sub-harmonic
          _tone(c, t0 + 0.16, 880,  0.62, 0.19, 'triangle'); // A5 — bell strike
          _tone(c, t0 + 0.28, 1174, 0.42, 0.08, 'sine');     // D6 — overtone shimmer
          seedClick(0.42, 0.50, true);                        // heavy ceremonial thud
          break;
      }
    } catch (e) {}
  }

  // ── Mode select — 1P Oracle vs 2P ────────────────────────────
  //   Oracle (1P): descending contemplative tones — inward/spiritual
  //   2 Players  : two voices rising in harmony — social/playful
  function modeSelect(isSinglePlayer) {
    if (_muted) return;
    try {
      const c  = getCtx();
      const t0 = c.currentTime + 0.03;
      if (isSinglePlayer) {
        // Three descending sine tones — entering the oracle's space
        _tone(c, t0,        440, 0.55, 0.12, 'sine'); // A4
        _tone(c, t0 + 0.25, 392, 0.58, 0.11, 'sine'); // G4
        _tone(c, t0 + 0.52, 330, 0.62, 0.10, 'sine'); // E4
      } else {
        // Two voices in parallel harmonic pairs, rising — two players joining
        _tone(c, t0,        392, 0.40, 0.13, 'triangle'); // G4 voice 1
        _tone(c, t0,        523, 0.40, 0.11, 'triangle'); // C5 voice 2
        _tone(c, t0 + 0.30, 523, 0.40, 0.13, 'triangle'); // C5 ascend
        _tone(c, t0 + 0.30, 659, 0.40, 0.11, 'triangle'); // E5 ascend
      }
    } catch (e) {}
  }

  // ── Prime: unlock AudioContext on first user gesture ──────────
  // Ensures context is 'running' before AI sounds fire in setTimeout.
  function prime() {
    if (_muted) return;
    try { getCtx(); } catch (e) {}
  }

  // ── Challenge Accept — ceremonial proclamation sound ──────────
  // Deep bass pulse → rising horn tones → 16-seed cascade (Olójú Mẹ́rìndínlógún)
  // → triumphant held chord. Runs ~5 seconds.
  function challengeAccept() {
    if (_muted) return;
    try {
      const c  = getCtx();
      const t0 = c.currentTime;
      // Deep ceremonial bass drum — resonant wooden strike
      _noise(c, t0,        85,  0.35, 1.0, 0.55, 2.8);
      _noise(c, t0 + 0.12, 65,  0.28, 0.8, 0.30, 2.2);
      // Rising proclamation tones (sawtooth — horn-like)
      _tone(c, t0 + 0.18, 196, 0.70, 0.14, 'sawtooth');  // G3
      _tone(c, t0 + 0.48, 247, 0.60, 0.14, 'sawtooth');  // B3
      _tone(c, t0 + 0.78, 330, 0.52, 0.16, 'sawtooth');  // E4
      _tone(c, t0 + 1.08, 440, 0.44, 0.18, 'sawtooth');  // A4
      // 16-seed cascade (one per Odu pit — Olójú Mẹ́rìndínlógún)
      for (let i = 0; i < 16; i++)
        seedClick(1.55 + i * 0.11, 0.62 + Math.random() * 0.76, i % 3 === 0);
      // Triumphant final chord — A major with shimmer
      _tone(c, t0 + 3.45, 220, 2.2, 0.12, 'triangle');  // A3
      _tone(c, t0 + 3.45, 330, 2.2, 0.09, 'triangle');  // E4
      _tone(c, t0 + 3.45, 440, 2.2, 0.11, 'triangle');  // A4
      _tone(c, t0 + 3.45, 660, 2.0, 0.07, 'triangle');  // E5
      _tone(c, t0 + 3.50, 880, 1.6, 0.04, 'sine');      // A5 shimmer
    } catch (e) {}
  }

  return {
    sow, capture, cancel, win, draw, prime,
    startNewGame, levelSelect, modeSelect, challengeAccept,
    setMuted: (v) => { _muted = v; },
    isMuted:  ()  => _muted,
  };
})();

function initBoard() {
  return Array(16).fill(8);
}

// ── Àgbà-Ọ̀ta (Veteran): Odu-encoded initial board ───────────
// 4-bit IFABit code per Odu (bit '1' = OgbeBit = | = 1 ayo seed present;
// bit '0' = OyekuBit = || = absence of seed). Seeds = count of '1' bits.
// Ogbe='1111'→4, Oyeku='0000'→0, etc. Total = 32 seeds (vs 128 normal).
const ODU_CODES = [
  '1111', // 0  Ogbe      → 4 seeds
  '0000', // 1  Oyeku     → 0 seeds
  '0110', // 2  Iwori     → 2 seeds
  '1001', // 3  Odi       → 2 seeds
  '1100', // 4  Irosun    → 2 seeds
  '0011', // 5  Owonrin   → 2 seeds
  '1000', // 6  Obara     → 1 seed
  '0001', // 7  Okanran   → 1 seed
  '1110', // 8  Ogunda    → 3 seeds
  '0111', // 9  Osa       → 3 seeds
  '0100', // 10 Ika       → 1 seed
  '0010', // 11 Oturupon  → 1 seed
  '1011', // 12 Otura     → 3 seeds
  '1101', // 13 Irete     → 3 seeds
  '1010', // 14 Ose       → 2 seeds
  '0101', // 15 Ofun      → 2 seeds
];

function initBoardVeteran() {
  // 2-column display: each OgbeBit ('1') mark = 2 seeds (one per column); OyekuBit ('0') = 0
  return ODU_CODES.map(code => code.split('').filter(b => b === '1').length * 2);
}

function ownerOf(idx) {
  return idx < 8 ? 1 : 2;
}

// Sow all seeds from fromIdx counterclockwise; skip starting pit on full lap
function sowAyo(board, fromIdx) {
  const b = [...board];
  let seeds = b[fromIdx];
  b[fromIdx] = 0;
  let i = fromIdx;
  while (seeds > 0) {
    i = (i + 1) % 16;
    if (i === fromIdx) continue; // skip origin pit
    b[i]++;
    seeds--;
  }
  return { b, lastIdx: i };
}

// Return the step-by-step sowing sequence as [{pit, board}] pairs.
// Each entry is one seed landing and the resulting board state.
// Source pit is already zeroed in the first entry's board.
function getSowSteps(fromBoard, fromIdx) {
  const b = [...fromBoard];
  let seeds = b[fromIdx];
  b[fromIdx] = 0;
  let i = fromIdx;
  const steps = [];
  while (seeds > 0) {
    i = (i + 1) % 16;
    if (i === fromIdx) continue;
    b[i]++;
    seeds--;
    steps.push({ pit: i, board: [...b] });
  }
  return steps;
}

// After sowing completes, resolve captures on finalBoard for player.
// Returns { b2, capSeeds, chain, cancelled }.
function captureFrom(finalBoard, lastIdx, player) {
  const isOpp = idx => ownerOf(idx) !== player;
  let b2 = [...finalBoard], capSeeds = 0, chain = [], cancelled = false;
  if (isOpp(lastIdx)) {
    chain = getCapChain(finalBoard, lastIdx, player);
    if (chain.length > 0) {
      const opp      = player === 1 ? P2_POTS : P1_POTS;
      const oppTotal = opp.reduce((s, p) => s + finalBoard[p], 0);
      const chainSeed = chain.reduce((s, p) => s + finalBoard[p], 0);
      if (chainSeed >= oppTotal) {
        cancelled = true;
      } else {
        chain.forEach(p => { capSeeds += b2[p]; b2[p] = 0; });
      }
    }
  }
  return { b2, capSeeds, chain, cancelled };
}

// Collect pots eligible for chain capture, starting from lastIdx going backward.
// Continues while pot is on opponent's side AND contains exactly 2 or 3 seeds.
function getCapChain(board, lastIdx, player) {
  const isOpp = idx => ownerOf(idx) !== player;
  const chain = [];
  let i = lastIdx;
  while (isOpp(i) && (board[i] === 2 || board[i] === 3)) {
    chain.push(i);
    i = (i - 1 + 16) % 16;
  }
  return chain;
}

// ── Àgbà-Ọ̀ta (Veteran) capture rules ──────────────────────────
// Rule 1: Capture only on EXACTLY 4 seeds (scaled from 2 for the doubled-seed board) — precision over volume.
// Rule 2: Grand Slam is NOT voided — capture proceeds even if it empties all opponent pits.
function getCapChainVeteran(board, lastIdx, player) {
  const isOpp = idx => ownerOf(idx) !== player;
  const chain = [];
  let i = lastIdx;
  while (isOpp(i) && board[i] === 4) { // exact 4 only
    chain.push(i);
    i = (i - 1 + 16) % 16;
  }
  return chain;
}

function captureFromVeteran(finalBoard, lastIdx, player) {
  const isOpp = idx => ownerOf(idx) !== player;
  let b2 = [...finalBoard], capSeeds = 0, chain = [], cancelled = false;
  if (isOpp(lastIdx)) {
    chain = getCapChainVeteran(finalBoard, lastIdx, player);
    if (chain.length > 0) {
      // No grand slam protection — the veteran plays without safety nets
      chain.forEach(p => { capSeeds += b2[p]; b2[p] = 0; });
    }
  }
  return { b2, capSeeds, chain, cancelled };
}

// True if sowing from fromIdx would leave the opponent with 0 seeds
function wouldStarve(board, fromIdx, player) {
  const { b } = sowAyo(board, fromIdx);
  const opp = player === 1 ? P2_POTS : P1_POTS;
  return opp.every(p => b[p] === 0);
}

// Get all legal moves for player under Awale starvation rule
function getValidMoves(board, player) {
  const my  = player === 1 ? P1_POTS : P2_POTS;
  const opp = player === 1 ? P2_POTS : P1_POTS;
  const total    = board.reduce((a, v) => a + v, 0);
  const oppTotal = opp.reduce((s, p) => s + board[p], 0);
  const nonEmpty = my.filter(p => board[p] > 0);

  if (nonEmpty.length === 0) return [];
  if (total <= 6) return nonEmpty; // starvation rule suspended under 6 seeds

  if (oppTotal === 0) {
    // Must choose a move that seeds the opponent's side if possible
    const feeders = nonEmpty.filter(p => !wouldStarve(board, p, player));
    return feeders.length > 0 ? feeders : nonEmpty;
  }

  // Normal: exclude moves that would starve opponent
  const safe = nonEmpty.filter(p => !wouldStarve(board, p, player));
  return safe.length > 0 ? safe : nonEmpty;
}

// Pure synchronous move simulation (for AI lookahead — no animation)
function simulateMove(board, cap, fromIdx, player) {
  const { b: b1, lastIdx } = sowAyo(board, fromIdx);
  const { b2, capSeeds }   = captureFrom(b1, lastIdx, player);
  const newCap = [cap[0], cap[1]];
  newCap[player - 1] += capSeeds;
  return { b2, newCap };
}

// ── AI: Beginner (Òpè I) — pure random valid move ─────────────
function aiPickBeginner(board) {
  const valid = getValidMoves(board, 2);
  if (!valid.length) return null;
  return valid[Math.floor(Math.random() * valid.length)];
}

// ── AI: Intermediate (Òpè II) — prioritise chain captures > single captures > random ─
function aiPick(board) {
  const valid = getValidMoves(board, 2);
  if (!valid.length) return null;

  // Priority 1: chain capture (≥2 pots)
  for (const i of valid) {
    const { b, lastIdx } = sowAyo(board, i);
    if (ownerOf(lastIdx) === 1) {
      const chain = getCapChain(b, lastIdx, 2);
      if (chain.length >= 2) {
        const oppTotal  = P1_POTS.reduce((s, p) => s + b[p], 0);
        const chainSeeds = chain.reduce((s, p) => s + b[p], 0);
        if (chainSeeds < oppTotal) return i; // not a grand slam
      }
    }
  }
  // Priority 2: any single capture
  for (const i of valid) {
    const { b, lastIdx } = sowAyo(board, i);
    if (ownerOf(lastIdx) === 1) {
      const chain = getCapChain(b, lastIdx, 2);
      if (chain.length >= 1) {
        const oppTotal  = P1_POTS.reduce((s, p) => s + b[p], 0);
        const chainSeeds = chain.reduce((s, p) => s + b[p], 0);
        if (chainSeeds < oppTotal) return i;
      }
    }
  }
  // Priority 3: random valid move
  return valid[Math.floor(Math.random() * valid.length)];
}

// ── AI: Expert (Ọ̀ta) — minimax with alpha-beta pruning, depth 4 ─
// Heuristic: captured seed differential (Oracle advantage) weighted 3×,
// plus board seed differential (seeds on each side), to prefer both
// aggressive capture and controlling more of the board.
function evalBoard(board, cap) {
  const p2Board = P2_POTS.reduce((s, p) => s + board[p], 0);
  const p1Board = P1_POTS.reduce((s, p) => s + board[p], 0);
  return (cap[1] - cap[0]) * 3 + (p2Board - p1Board);
}

function minimaxAyo(board, cap, depth, isMaximizing, alpha, beta) {
  const player = isMaximizing ? 2 : 1;
  const valid  = getValidMoves(board, player);
  if (depth === 0 || valid.length === 0) return evalBoard(board, cap);

  if (isMaximizing) {
    let best = -Infinity;
    for (const move of valid) {
      const { b2, newCap } = simulateMove(board, cap, move, 2);
      best  = Math.max(best, minimaxAyo(b2, newCap, depth - 1, false, alpha, beta));
      alpha = Math.max(alpha, best);
      if (beta <= alpha) break;
    }
    return best;
  } else {
    let best = Infinity;
    for (const move of valid) {
      const { b2, newCap } = simulateMove(board, cap, move, 1);
      best = Math.min(best, minimaxAyo(b2, newCap, depth - 1, true, alpha, beta));
      beta = Math.min(beta, best);
      if (beta <= alpha) break;
    }
    return best;
  }
}

function aiPickExpert(board, cap) {
  const valid = getValidMoves(board, 2);
  if (!valid.length) return null;
  let bestScore = -Infinity, bestMove = valid[0];
  for (const move of valid) {
    const { b2, newCap } = simulateMove(board, cap, move, 2);
    const score = minimaxAyo(b2, newCap, 4, false, -Infinity, Infinity);
    if (score > bestScore) { bestScore = score; bestMove = move; }
  }
  return bestMove;
}

// ── Àgbà-Ọ̀ta (Veteran) AI — minimax depth 7 with veteran rules ─
// Uses captureFromVeteran (exact-4, grand slam allowed) + strongest eval.
function simulateVeteranMove(board, cap, fromIdx, player) {
  const { b: b1, lastIdx } = sowAyo(board, fromIdx);
  const { b2, capSeeds }   = captureFromVeteran(b1, lastIdx, player);
  const newCap = [cap[0], cap[1]];
  newCap[player - 1] += capSeeds;
  return { b2, newCap };
}

function evalBoardVeteran(board, cap) {
  const p2Board = P2_POTS.reduce((s, p) => s + board[p], 0);
  const p1Board = P1_POTS.reduce((s, p) => s + board[p], 0);
  // Strongest weights: capture lead 6×, board control 3×
  return (cap[1] - cap[0]) * 6 + (p2Board - p1Board) * 3;
}

function minimaxVeteran(board, cap, depth, isMaximizing, alpha, beta) {
  const player = isMaximizing ? 2 : 1;
  const valid  = getValidMoves(board, player);
  if (depth === 0 || valid.length === 0) return evalBoardVeteran(board, cap);
  if (isMaximizing) {
    let best = -Infinity;
    for (const move of valid) {
      const { b2, newCap } = simulateVeteranMove(board, cap, move, 2);
      best  = Math.max(best, minimaxVeteran(b2, newCap, depth - 1, false, alpha, beta));
      alpha = Math.max(alpha, best);
      if (beta <= alpha) break;
    }
    return best;
  } else {
    let best = Infinity;
    for (const move of valid) {
      const { b2, newCap } = simulateVeteranMove(board, cap, move, 1);
      best = Math.min(best, minimaxVeteran(b2, newCap, depth - 1, true, alpha, beta));
      beta = Math.min(beta, best);
      if (beta <= alpha) break;
    }
    return best;
  }
}

function aiPickVeteran(board, cap) {
  const valid = getValidMoves(board, 2);
  if (!valid.length) return null;
  let bestScore = -Infinity, bestMove = valid[0];
  for (const move of valid) {
    const { b2, newCap } = simulateVeteranMove(board, cap, move, 2);
    const score = minimaxVeteran(b2, newCap, 7, false, -Infinity, Infinity);
    if (score > bestScore) { bestScore = score; bestMove = move; }
  }
  return bestMove;
}

// ── Level dispatcher ──────────────────────────────────────────
function aiPickForLevel(board, cap, level) {
  if (level === 'ope1')    return aiPickBeginner(board);
  if (level === 'ota')     return aiPickExpert(board, cap);
  if (level === 'agbaota') return aiPickVeteran(board, cap);
  return aiPick(board); // 'ope2' — intermediate
}

// ── IfaZero SVG ───────────────────────────────────────────────
function IfaZero({ size = 90, className = '', showText = true }) {
  const r  = size / 2;
  const cx = r, cy = r;
  const cr = r * 0.72;
  const arrowX   = cx + cr;
  const arrowY   = cy;
  const arrowLen = r * 0.22;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}
      className={`ifazero--pulse ${className}`} aria-label="IfaZero — Ogbe Energy">
      <circle cx={cx} cy={cy} r={cr + r * 0.08} fill="none"
        stroke="rgba(201,162,39,0.12)" strokeWidth={1.5} />
      <defs>
        <radialGradient id="ifazero-fill" cx="38%" cy="38%">
          <stop offset="0%"   stopColor="rgba(201,162,39,0.22)" />
          <stop offset="100%" stopColor="rgba(8,6,21,0.96)" />
        </radialGradient>
      </defs>
      <circle cx={cx} cy={cy} r={cr} fill="url(#ifazero-fill)"
        stroke="#c9a227" strokeWidth={size > 60 ? 2 : 1.5} />
      <line x1={arrowX} y1={arrowY - arrowLen * 0.5}
            x2={arrowX} y2={arrowY + arrowLen * 0.5}
            stroke="#f0c840" strokeWidth={2} strokeLinecap="round" />
      <polyline
        points={`${arrowX - arrowLen * 0.45},${arrowY + arrowLen * 0.1} ${arrowX},${arrowY + arrowLen * 0.55} ${arrowX + arrowLen * 0.45},${arrowY + arrowLen * 0.1}`}
        fill="none" stroke="#f0c840" strokeWidth={2}
        strokeLinejoin="round" strokeLinecap="round" />
      {showText && size >= 72 && (
        <>
          <text x={cx} y={cy - 8}  textAnchor="middle" fill="#c9a227"
            fontFamily="'Cinzel Decorative', serif" fontSize={size * 0.115} fontWeight="700">Ogbe</text>
          <text x={cx} y={cy + 7}  textAnchor="middle" fill="rgba(201,162,39,0.7)"
            fontFamily="'Space Grotesk', monospace" fontSize={size * 0.085}>Energy</text>
          <text x={cx} y={cy + 20} textAnchor="middle" fill="rgba(201,162,39,0.45)"
            fontFamily="'Space Grotesk', monospace" fontSize={size * 0.075}>(CEN)</text>
        </>
      )}
    </svg>
  );
}

// ── Pit Arrow SVG ─────────────────────────────────────────────
// Ogbe Circle: arrow on the RIGHT, chevron pointing DOWN (clockwise direction)
function PitArrow() {
  const arrowX = 100, arrowY = 50, arrowLen = 13;
  return (
    <svg viewBox="0 0 100 100" style={{
      position:'absolute', top:0, left:0, width:'100%', height:'100%',
      overflow:'visible', pointerEvents:'none', color:'var(--odu-color)', opacity:0.95,
    }} aria-hidden="true">
      <line x1={arrowX} y1={arrowY - arrowLen * 0.5} x2={arrowX} y2={arrowY + arrowLen * 0.5}
        stroke="currentColor" strokeWidth={3} strokeLinecap="round" />
      <polyline
        points={`${arrowX - arrowLen * 0.42},${arrowY + arrowLen * 0.1} ${arrowX},${arrowY + arrowLen * 0.56} ${arrowX + arrowLen * 0.42},${arrowY + arrowLen * 0.1}`}
        fill="none" stroke="currentColor" strokeWidth={3}
        strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

// Oyeku Circle: arrow on the LEFT, chevron pointing DOWN (counterclockwise direction)
function OyekuPitArrow() {
  const arrowX = 0, arrowY = 50, arrowLen = 13;
  return (
    <svg viewBox="0 0 100 100" style={{
      position:'absolute', top:0, left:0, width:'100%', height:'100%',
      overflow:'visible', pointerEvents:'none', color:'var(--odu-color)', opacity:0.95,
    }} aria-hidden="true">
      <line x1={arrowX} y1={arrowY - arrowLen * 0.5} x2={arrowX} y2={arrowY + arrowLen * 0.5}
        stroke="currentColor" strokeWidth={3} strokeLinecap="round" />
      <polyline
        points={`${arrowX - arrowLen * 0.42},${arrowY + arrowLen * 0.1} ${arrowX},${arrowY + arrowLen * 0.56} ${arrowX + arrowLen * 0.42},${arrowY + arrowLen * 0.1}`}
        fill="none" stroke="currentColor" strokeWidth={3}
        strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

// ── Odu Mark Pattern — Àgbà-Ọ̀ta (Veteran) pit display ──────
// Shows the Odu's 4-bit IFABit code as vertical marks inside the pit:
//   '1' bit → OgbeBit  = filled circle (seed present)
//   '0' bit → OyekuBit = hollow circle (seed absent)
function OduMarkPattern({ code, color }) {
  return (
    <div className="odu-mark-pattern" aria-hidden="true">
      {code.split('').map((b, i) => (
        <div key={i} className="odu-mark-row">
          {[0, 1].map(col => (
            <span
              key={col}
              className={`odu-mark-dot odu-mark-dot--${b === '1' ? 'ogbe' : 'oyeku'}`}
              style={b === '1' ? { background: color, boxShadow: `0 0 4px ${color}88` } : {}}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

// ── Odu Stroke Pattern — Learning Mode hole interior ─────────
// Traditional Ifa marks: '1' = single stroke |, '0' = double strokes ||
// Layout: 2 columns × 4 rows
function OduStrokePattern({ code, color }) {
  return (
    <div className="odu-stroke-pattern" aria-hidden="true">
      {code.split('').map((b, i) => (
        <div key={i} className="odu-stroke-row">
          {[0, 1].map(col => (
            <span key={col} className={`odu-stroke-cell odu-stroke-cell--${b === '1' ? 'ogbe' : 'oyeku'}`}>
              {b === '0' && <span className="odu-stroke-line" style={{ background: color }} />}
              <span className="odu-stroke-line" style={{ background: color }} />
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

// ── Seed Grid — 2×4 Odu Ifa pattern ──────────────────────────
// 8 dots arranged in 2 columns × 4 rows (column-first fill).
// Mirrors the mark arrangement on Opon Ifa.
function SeedGrid({ count, player }) {
  const SLOTS = 8;
  const filled = Math.min(count, SLOTS);
  const overflow = count > SLOTS ? count - SLOTS : 0;
  return (
    <div className={`seed-odu-grid seed-odu-grid--p${player}`}>
      {Array.from({ length: SLOTS }, (_, i) => (
        <div key={i}
          className={`seed-odu ${i < filled ? 'seed-odu--on' : 'seed-odu--off'}`}
        />
      ))}
      {overflow > 0 && (
        <div className="seed-odu-overflow">+{overflow}</div>
      )}
    </div>
  );
}

// ── Pit Cell ──────────────────────────────────────────────────
function PitCell({ odu, count, onClick, disabled, isLastMoved, currentPlayer, owner,
                   isValidMove, isChained, isReceiving, veteranCode, pitIdx }) {
  const clickable  = !disabled && isValidMove;
  // Opponent pits belong to the other player — visible but never interactive
  const isOpponent = owner !== currentPlayer;
  // In Veteran level, alternate Ogbe Circle (even idx) and Oyeku Circle (odd idx)
  const useOyeku = veteranCode && pitIdx % 2 === 1;
  const cls = [
    'pit-cell',
    isOpponent   ? 'pit-cell--opponent' : '',
    !isOpponent && (!isValidMove || disabled) ? 'pit-cell--disabled' : '',
    isLastMoved  ? 'pit-cell--last-moved'  : '',
    isValidMove && !disabled ? 'pit-cell--valid' : '',
    isChained    ? 'pit-cell--chained'     : '',
    isReceiving  ? 'pit-cell--receiving'   : '',
    veteranCode  ? 'pit-cell--veteran'     : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={cls} style={{ '--odu-color': odu.color }}
      onClick={clickable ? onClick : undefined}
      title={`${odu.meji} · ${count} seed${count !== 1 ? 's' : ''}`}
      role="button"
      aria-label={`${odu.name}, ${count} seeds`}
      aria-disabled={!clickable}>
      <div className="pit-hole">
        {useOyeku ? <OyekuPitArrow /> : <PitArrow />}
        {veteranCode
          ? <OduMarkPattern code={veteranCode} color={odu.color} />
          : <SeedGrid count={count} player={owner} />}
        {/* Seed count badge — always shown in veteran mode since marks show pattern not count */}
        {veteranCode && count > 0 && (
          <span className="vet-seed-count">{count}</span>
        )}
        {/* Brief count flash when this pit receives a seed — key restarts animation */}
        {isReceiving && (
          <span key={count} className="pit-count-flash">{count}</span>
        )}
        {/* Seed count badge — inside pit-hole so it can float above the circle on mobile */}
        <span className="pit-count-badge">{count}</span>
      </div>
      <span className="pit-odu-name">{odu.name}</span>
      <span className="pit-odu-num">#{odu.num}</span>
    </div>
  );
}

// ── Ifa Computer Section ──────────────────────────────────────
const COMPUTER_CARDS = [
  { icon:'⚡', title:'The Computer of Everything',  sub:'ComputoE',           desc:'A universal Computational Matrix encoding all knowledge domains through the 256 Odufa Patterns, which are the Patterns for Everything (PatternoE).',        accent:'#f0c840' },
  { icon:'○',  title:'The Computer of Energy',      sub:'ComputoE · IfaZero', desc:'Ogbe Energy as the Base Unit of Computation — the Building Block of Everything (BBoE) and Primal Bit.', accent:'#c9a227' },
  { icon:'◈',  title:'Knowledge Computer',          sub:'Meta-Model Engine',  desc:'Each of the 16 Odu maps to a field of knowledge or a set of fields. Their 240 Combinations generate all meta-models and knowledge fields.',     accent:'#00b4a6' },
  { icon:'∞',  title:'Computing All Fields',        sub:'Pan-Domain Intelligence', desc:'From physics to philosophy, biology to economics — the Ifa Computer encodes all human knowledge.',   accent:'#7c4dff' },
];

function IfaComputerSection() {
  return (
    <section className="ifa-computer-section">
      <div className="section-header">
        <p className="section-eyebrow">The Ifa Computer</p>
        <h2 className="section-title"><em>ComputoE</em> — Computing All Knowledge</h2>
        <p className="section-desc">
          Ayò Ọlọ́pọ́nfá is not merely a game — it is a meta-model machine built on the
          Computational Architecture of the 256 Odu Ifa and 16 Odu Orisa.
        </p>
      </div>
      <div className="computer-grid">
        {COMPUTER_CARDS.map(c => (
          <div key={c.sub} className="computer-card" style={{ '--card-accent': c.accent }}>
            <span className="computer-card-icon" style={{ color: c.accent }}>{c.icon}</span>
            <h3 className="computer-card-title">{c.title}</h3>
            <p className="computer-card-sub">{c.sub}</p>
            <p className="computer-card-desc">{c.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}


// ═══════════════════════════════════════════════════════════════
// ── Ọpọ́n Ifá — IFA Wheel (Challenge Section spinner) ─────────
// ═══════════════════════════════════════════════════════════════

const IFA_ODU_WHEEL = [
  { name:'Ogbe',     num:1,  emoji:'⚡',  col:'#7dffaa', title:'LIGHT POWER ACTIVATED!',    msg:"Ogbe carries the light of creation! Everything you touch turns to gold today. You are completely UNSTOPPABLE — nothing in the universe can hold you back! 🌟" },
  { name:'Oyeku',    num:2,  emoji:'🌑',  col:'#ffbb88', title:'MYSTERY MASTER UNLOCKED!',  msg:"Oyeku reveals the hidden world! Secret knowledge that others cannot see is opening up for you right now. The invisible realm is speaking — trust what you feel deep inside! 🔮" },
  { name:'Iwori',    num:3,  emoji:'🧠',  col:'#7dffaa', title:'GENIUS MODE: ACTIVATED!',   msg:"Iwori is the Odu of inner wisdom and intelligence! Your brain is absolutely ON FIRE today. Trust your instincts — the brilliant answer is already inside you! 💡" },
  { name:'Odi',      num:4,  emoji:'🔐',  col:'#ffbb88', title:'SECRET SUPERPOWER FOUND!',  msg:"Odi holds the deepest secrets of Ifa! You have a hidden ability that's been waiting to EXPLODE into the world. Look within — your superpower has been there all along! 🚀" },
  { name:'Irosun',   num:5,  emoji:'🏆',  col:'#7dffaa', title:'VICTORY DANCE TIME!',       msg:"Irosun says YOU WIN! The entire universe has declared you a champion today. Strike your most epic victory pose RIGHT NOW — you have absolutely earned it! 🎉" },
  { name:'Owonrin',  num:6,  emoji:'🌪️', col:'#ffbb88', title:'WILD CARD ENERGY!',         msg:"Owonrin is the most electrifying and unpredictable Odu! Something WILD and absolutely jaw-dropping is about to happen to you. Stay alert — anything can happen! 🎲" },
  { name:'Obara',    num:7,  emoji:'👑',  col:'#7dffaa', title:'ROYALTY MODE ACTIVATED!',   msg:"Obara says you are ROYALTY! Walk tall, speak with total confidence, and own every single room you enter today. Your crown is glowing brighter than ever! ✨" },
  { name:'Okanran',  num:8,  emoji:'⚔️', col:'#ffbb88', title:'WARRIOR SPIRIT UNLEASHED!', msg:"Okanran gives you the spirit of a warrior! Face your biggest challenge head-on today — you will CRUSH IT. No obstacle is too tough, no mountain is too high! 💪" },
  { name:'Ogunda',   num:9,  emoji:'🛤️', col:'#7dffaa', title:'ALL ROADS ARE OPEN!',       msg:"Ogunda is the road-opener! Every door is swinging wide open just for you today. New adventures, new opportunities, new friendships — go out and explore the world! 🗺️" },
  { name:'Osa',      num:10, emoji:'🦋',  col:'#ffbb88', title:'TRANSFORMATION UNLOCKED!',  msg:"Osa is the Odu of incredible change! You are evolving into your BEST SELF this very moment. Your wings are growing — watch the beautiful butterfly emerge! 🌈" },
  { name:'Ika',      num:11, emoji:'🔨',  col:'#7dffaa', title:'CRAFT MASTER POWERS!',      msg:"Ika blesses your hands with CREATIVE MAGIC! Build it, draw it, code it, invent it — your greatest creation is waiting for you to bring it to life today! 🎨" },
  { name:'Oturupọn', num:12, emoji:'💚',  col:'#ffbb88', title:'HEALING POWER ACTIVATED!',  msg:"Oturupọn blesses you with incredible healing energy! You have the gift to make people feel better just by being near them. Spread kindness and watch miracles happen! 🌿" },
  { name:'Otura',    num:13, emoji:'✨',  col:'#7dffaa', title:'BLESSING STORM INCOMING!',  msg:"Otura rains blessings from the heavens! An incredible lucky streak is starting RIGHT NOW. Open your arms wide — the universe is about to deliver something amazing! 🌟" },
  { name:'Irete',    num:14, emoji:'🌟',  col:'#ffbb88', title:'SUCCESS MAGNET MODE!',      msg:"Irete makes you a total SUCCESS MAGNET! Every single effort you put in today multiplies into BIG spectacular results. Dream the BIGGEST dream you can imagine! 🚀" },
  { name:'Ose',      num:15, emoji:'💰',  col:'#7dffaa', title:'ABUNDANCE FULLY UNLOCKED!', msg:"Ose is the Odu of wealth, prosperity, and unlimited abundance! Talent, energy, and incredible gifts are flowing straight to you. YOU ARE RICH — believe it! 💎" },
  { name:'Ofun',     num:16, emoji:'🌌',  col:'#ffbb88', title:'ANCIENT COSMIC WISDOM!',    msg:"Ofun carries the oldest, deepest wisdom in the entire universe! You are a LEGEND in the making — your story will be told and inspire generations to come! 🌠" },
];

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

function IfaWheelPanel() {
  const [spinning, setSpinning]           = useState(false);
  const [result, setResult]               = useState(null);
  const [highlightVisible, setHighlight]  = useState(false);
  const [btnText, setBtnText]             = useState('🎯 TUNE THE IFA ANTENNA');
  const [specsOpen, setSpecsOpen]         = useState(false);
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
      whirOsc.type = 'sawtooth';
      whirOsc.frequency.setValueAtTime(320, now);
      whirOsc.frequency.exponentialRampToValueAtTime(48, now + dur);
      whirFilt.type = 'lowpass'; whirFilt.frequency.setValueAtTime(900, now);
      whirFilt.frequency.exponentialRampToValueAtTime(180, now + dur); whirFilt.Q.value = 2.5;
      whirGain.gain.setValueAtTime(0, now); whirGain.gain.linearRampToValueAtTime(0.13, now + 0.08);
      whirGain.gain.setValueAtTime(0.13, now + dur - 0.5); whirGain.gain.linearRampToValueAtTime(0, now + dur);
      whirOsc.connect(whirFilt); whirFilt.connect(whirGain); whirGain.connect(ctx.destination);
      whirOsc.start(now); whirOsc.stop(now + dur + 0.1);
      for (let i = 0; i < 32; i++) {
        (function(idx) {
          const t = now + dur * Math.pow(idx / 32, 0.45);
          const len = Math.floor(ctx.sampleRate * 0.022);
          const buf = ctx.createBuffer(1, len, ctx.sampleRate);
          const d = buf.getChannelData(0);
          for (let s = 0; s < len; s++) d[s] = (Math.random()*2-1) * Math.exp(-s/(len*0.25));
          const src = ctx.createBufferSource(), filt = ctx.createBiquadFilter(), gain = ctx.createGain();
          src.buffer = buf; filt.type = 'bandpass'; filt.frequency.value = 900 + idx*18;
          filt.Q.value = 5; gain.gain.value = 0.28 - idx*0.004;
          src.connect(filt); filt.connect(gain); gain.connect(ctx.destination); src.start(t);
        })(i);
      }
    } catch(e) {}
  }

  function playOduRevealSound() {
    try {
      const ctx = getAudioCtx(), now = ctx.currentTime;
      const gOsc = ctx.createOscillator(), gGain = ctx.createGain();
      gOsc.type = 'sine'; gOsc.frequency.setValueAtTime(110, now); gOsc.frequency.exponentialRampToValueAtTime(72, now+2.8);
      gGain.gain.setValueAtTime(0.55, now); gGain.gain.exponentialRampToValueAtTime(0.001, now+2.8);
      gOsc.connect(gGain); gGain.connect(ctx.destination); gOsc.start(now); gOsc.stop(now+2.9);
      const g2 = ctx.createOscillator(), g2g = ctx.createGain();
      g2.type = 'sine'; g2.frequency.setValueAtTime(275, now); g2.frequency.exponentialRampToValueAtTime(180, now+2.2);
      g2g.gain.setValueAtTime(0.22, now); g2g.gain.exponentialRampToValueAtTime(0.001, now+2.2);
      g2.connect(g2g); g2g.connect(ctx.destination); g2.start(now); g2.stop(now+2.3);
      const sh = ctx.createOscillator(), shg = ctx.createGain();
      sh.type = 'triangle'; sh.frequency.setValueAtTime(220, now+0.05); sh.frequency.exponentialRampToValueAtTime(880, now+0.6);
      shg.gain.setValueAtTime(0, now+0.05); shg.gain.linearRampToValueAtTime(0.18, now+0.2); shg.gain.linearRampToValueAtTime(0, now+0.65);
      sh.connect(shg); shg.connect(ctx.destination); sh.start(now+0.05); sh.stop(now+0.7);
      [1320,1760,2200,2640,3300].forEach(function(freq, i) {
        const sp = ctx.createOscillator(), spg = ctx.createGain();
        sp.type = 'sine'; sp.frequency.value = freq;
        const t = now + 0.08 + i*0.07;
        spg.gain.setValueAtTime(0, t); spg.gain.linearRampToValueAtTime(0.1-i*0.01, t+0.015); spg.gain.exponentialRampToValueAtTime(0.001, t+0.5);
        sp.connect(spg); spg.connect(ctx.destination); sp.start(t); sp.stop(t+0.55);
      });
    } catch(e) {}
  }

  function spin() {
    if (spinning) return;
    setSpinning(true); setResult(null); setHighlight(false); setBtnText('🌀 Tuning...');
    const idx = Math.floor(Math.random() * 16);
    const fullSpins     = (5 + Math.floor(Math.random() * 4)) * 360;
    // CCW rotation needed to bring Odu[idx] to top = its CW position from top
    const targetCCW     = (348.75 - idx * 22.5 + 360) % 360;
    const currentCCWMod = ((-angleRef.current) % 360 + 360) % 360;
    let delta = (targetCCW - currentCCWMod + 360) % 360;
    if (delta < 45) delta += 360;
    angleRef.current -= delta + fullSpins;            // negative = anti-clockwise
    rotorRef.current.style.transition = 'transform 4.5s cubic-bezier(0.17,0.67,0.12,0.99)';
    rotorRef.current.style.transform  = `rotate(${angleRef.current}deg)`;
    playWheelSpinSound();
    setTimeout(() => {
      setSpinning(false); playOduRevealSound();
      setHighlight(true);                           // Step 1: illuminate winning slice
      setTimeout(() => {
        setResult(IFA_ODU_WHEEL[idx]); setBtnText('🎯 TUNE AGAIN!');
      }, 900);                                      // Step 2: show Odu details
    }, 4600);
  }

  function spinAgain() { setResult(null); setHighlight(false); setTimeout(spin, 60); }

  return (
    <div className="challenge-wheel-panel">
      <p className="challenge-art-caption">Ọpọ́n Ifá — IFA Wheel</p>
      <p className="challenge-art-sub">Ọpọ́n Ifá Olójú Mẹ́rìndínlógún · Spin to reveal your Odu</p>

      <div className="challenge-wheel-art">

        {/* ── Pointer ── */}
        <div className="wheel-pointer-wrap" aria-hidden="true">
          <div className="wheel-pointer-label">▼ YOUR ODU ▼</div>
          <div className="wheel-pointer-tri"></div>
        </div>

        {/* ── Rotating wheel ── */}
        <div className="wheel-rotor" ref={rotorRef}>
          <svg className="ifa-wheel-svg" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg"
               role="img" aria-label="Ọpọn Ifá — Ifa Wheel Spinner with 16 Sacred Odu Divisions">
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
              <circle cx="200"   cy="8"     r="3.2"/>
              <circle cx="273.5" cy="22.6"  r="3.2"/>
              <circle cx="335.8" cy="64.2"  r="3.2"/>
              <circle cx="377.4" cy="126.5" r="3.2"/>
              <circle cx="392"   cy="200"   r="3.2"/>
              <circle cx="377.4" cy="273.5" r="3.2"/>
              <circle cx="335.8" cy="335.8" r="3.2"/>
              <circle cx="273.5" cy="377.4" r="3.2"/>
              <circle cx="200"   cy="392"   r="3.2"/>
              <circle cx="126.5" cy="377.4" r="3.2"/>
              <circle cx="64.2"  cy="335.8" r="3.2"/>
              <circle cx="22.6"  cy="273.5" r="3.2"/>
              <circle cx="8"     cy="200"   r="3.2"/>
              <circle cx="22.6"  cy="126.5" r="3.2"/>
              <circle cx="64.2"  cy="64.2"  r="3.2"/>
              <circle cx="126.5" cy="22.6"  r="3.2"/>
            </g>
            <circle cx="200" cy="200" r="193" fill="none" stroke="#d4a427" strokeWidth="2.8"/>
            <circle cx="200" cy="200" r="186" fill="none" stroke="rgba(212,164,39,0.22)" strokeWidth="0.8"/>
            <g fontSize="13" fontWeight="900" fontFamily="Georgia,'Times New Roman',serif" textAnchor="middle" dominantBaseline="middle">
              <text x="231.2" y="43.1"  fill="#ffffff" transform="rotate(-78.75,231.2,43.1)">16</text>
              <text x="288.9" y="67.0"  fill="#f5e8c0" transform="rotate(-56.25,288.9,67.0)">15</text>
              <text x="333.0" y="111.1" fill="#ffffff" transform="rotate(-33.75,333.0,111.1)">14</text>
              <text x="356.9" y="168.8" fill="#f5e8c0" transform="rotate(-11.25,356.9,168.8)">13</text>
              <text x="356.9" y="231.2" fill="#ffffff" transform="rotate(11.25,356.9,231.2)">12</text>
              <text x="333.0" y="288.9" fill="#f5e8c0" transform="rotate(33.75,333.0,288.9)">11</text>
              <text x="288.9" y="333.0" fill="#ffffff" transform="rotate(56.25,288.9,333.0)">10</text>
              <text x="231.2" y="356.9" fill="#f5e8c0" transform="rotate(78.75,231.2,356.9)">9</text>
              <text x="168.8" y="356.9" fill="#ffffff" transform="rotate(-78.75,168.8,356.9)">8</text>
              <text x="111.1" y="333.0" fill="#f5e8c0" transform="rotate(-56.25,111.1,333.0)">7</text>
              <text x="67.0"  y="288.9" fill="#ffffff" transform="rotate(-33.75,67.0,288.9)">6</text>
              <text x="43.1"  y="231.2" fill="#f5e8c0" transform="rotate(-11.25,43.1,231.2)">5</text>
              <text x="43.1"  y="168.8" fill="#ffffff" transform="rotate(11.25,43.1,168.8)">4</text>
              <text x="67.0"  y="111.1" fill="#f5e8c0" transform="rotate(33.75,67.0,111.1)">3</text>
              <text x="111.1" y="67.0"  fill="#ffffff" transform="rotate(56.25,111.1,67.0)">2</text>
              <text x="168.8" y="43.1"  fill="#f5e8c0" transform="rotate(78.75,168.8,43.1)">1</text>
            </g>
            <g fontSize="7.5" fontFamily="Georgia,'Times New Roman',serif" textAnchor="middle" dominantBaseline="middle" letterSpacing="0.4">
              <text x="221.5" y="92.1"  fill="rgba(210,255,210,0.92)" transform="rotate(-78.75,221.5,92.1)">Ofun</text>
              <text x="261.1" y="108.5" fill="rgba(255,235,175,0.92)" transform="rotate(-56.25,261.1,108.5)">Ose</text>
              <text x="291.5" y="138.9" fill="rgba(210,255,210,0.92)" transform="rotate(-33.75,291.5,138.9)">Irete</text>
              <text x="307.9" y="178.5" fill="rgba(255,235,175,0.92)" transform="rotate(-11.25,307.9,178.5)">Otura</text>
              <text x="307.9" y="221.5" fill="rgba(210,255,210,0.92)" transform="rotate(11.25,307.9,221.5)">Oturupọn</text>
              <text x="291.5" y="261.1" fill="rgba(255,235,175,0.92)" transform="rotate(33.75,291.5,261.1)">Ika</text>
              <text x="261.1" y="291.5" fill="rgba(210,255,210,0.92)" transform="rotate(56.25,261.1,291.5)">Osa</text>
              <text x="221.5" y="307.9" fill="rgba(255,235,175,0.92)" transform="rotate(78.75,221.5,307.9)">Ogunda</text>
              <text x="178.5" y="307.9" fill="rgba(210,255,210,0.92)" transform="rotate(-78.75,178.5,307.9)">Okanran</text>
              <text x="138.9" y="291.5" fill="rgba(255,235,175,0.92)" transform="rotate(-56.25,138.9,291.5)">Obara</text>
              <text x="108.5" y="261.1" fill="rgba(210,255,210,0.92)" transform="rotate(-33.75,108.5,261.1)">Owonrin</text>
              <text x="92.1"  y="221.5" fill="rgba(255,235,175,0.92)" transform="rotate(-11.25,92.1,221.5)">Irosun</text>
              <text x="92.1"  y="178.5" fill="rgba(210,255,210,0.92)" transform="rotate(11.25,92.1,178.5)">Odi</text>
              <text x="108.5" y="138.9" fill="rgba(255,235,175,0.92)" transform="rotate(33.75,108.5,138.9)">Iwori</text>
              <text x="138.9" y="108.5" fill="rgba(210,255,210,0.92)" transform="rotate(56.25,138.9,108.5)">Oyeku</text>
              <text x="178.5" y="92.1"  fill="rgba(255,235,175,0.92)" transform="rotate(78.75,178.5,92.1)">Ogbe</text>
            </g>
            <circle cx="200" cy="200" r="56" fill="url(#chlWhlCG)" stroke="#d4a427" strokeWidth="2.5"/>
            <circle cx="200" cy="200" r="48" fill="none" stroke="rgba(255,240,160,0.4)" strokeWidth="1"/>
            <g fill="rgba(255,240,160,0.55)">
              <circle cx="200" cy="150" r="2.2"/>
              <circle cx="250" cy="200" r="2.2"/>
              <circle cx="200" cy="250" r="2.2"/>
              <circle cx="150" cy="200" r="2.2"/>
            </g>
            <text x="200" y="190" textAnchor="middle" dominantBaseline="middle"
                  fill="#fff8e0" fontSize="9.5" fontWeight="900" fontFamily="Georgia,'Times New Roman',serif" letterSpacing="1">Ọpọn Ifá</text>
            <text x="200" y="203" textAnchor="middle" dominantBaseline="middle"
                  fill="rgba(255,240,170,0.88)" fontSize="8" fontFamily="Georgia,'Times New Roman',serif">Ifa Wheel</text>
            <text x="200" y="215" textAnchor="middle" dominantBaseline="middle"
                  fill="rgba(255,240,170,0.7)" fontSize="7" fontFamily="Georgia,'Times New Roman',serif">16 Sacred Odu</text>
            <circle cx="200" cy="200" r="4" fill="#e8c040"/>
          </svg>
        </div>

        {/* ── Winning Slice Highlight (fixed overlay — winning slice always at 12 o'clock) ── */}
        <svg className={`ifa-win-highlight${highlightVisible ? ' visible' : ''}`}
             viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M 200 200 L 163.9 18.6 A 185 185 0 0 1 236.1 18.6 Z" fill="rgba(212,164,39,0.22)"/>
          <path d="M 162.4 10.7 A 193 193 0 0 1 237.6 10.7" fill="none" stroke="#d4a427" strokeWidth="5" strokeLinecap="round"/>
        </svg>

        {/* ── Ìrokẹ́-Ifá Tuner Badge ── */}
        <div className="iroke-tuner-badge" aria-label="Ìrokẹ́-Ifá — Ifa Antenna">
          <IrokeSVG />
          <span>Ìrokẹ́-Ifá &bull; Ifa Antenna</span>
        </div>

        {/* ── Spin button ── */}
        <button className="wheel-spin-btn" onClick={spin} disabled={spinning}
                aria-label="Spin the Ifa Wheel">
          {btnText}
        </button>

      </div>

      {/* ── Odu result panel ── */}
      {result && (
        <div className="challenge-wheel-result">
          <div className="cwr-emoji">{result.emoji}</div>
          <div className="cwr-odu">✦ {result.name} — Odu #{result.num} ✦</div>
          <div className="cwr-title" style={{ color: result.col }}>{result.title}</div>
          <div className="cwr-msg">{result.msg}</div>
          <button className="ifa-spin-again-btn" onClick={spinAgain}>🔮 Spin Again!</button>
        </div>
      )}

      {/* ── Drawing specs toggle ── */}
      <div className="challenge-wheel-specs">
        <button className={`wheel-specs-btn${specsOpen ? ' open' : ''}`}
                onClick={() => setSpecsOpen(o => !o)}
                aria-expanded={specsOpen}>
          <span className="iroke-icon-wrap" title="Ìrokẹ́-Ifá: The Ifantenna"><IrokeSVG /></span>
          How to draw this wheel
        </button>
        {specsOpen && (
          <div className="wheel-specs-note">
            <div className="wheel-specs-title">✏️ Ọpọ́n Ifá — Drawing Specifications</div>
            <ul className="wheel-specs-list">
              <li><span className="specs-label">Shape</span> Perfect circle (Ọpọ́n Ifá)</li>
              <li><span className="specs-label">Diameter</span> 16 cm &nbsp;·&nbsp; 16 m &nbsp;·&nbsp; 16 km <em>(scale freely — always 16)</em></li>
              <li><span className="specs-label">Divisions</span> 16 equal parts / slices &nbsp;·&nbsp; each slice = <strong>22.5°</strong></li>
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

// ═══════════════════════════════════════════════════════════════
// ── Ifa TOE 0+8D Matrix — Ifart/Orisart at centre ─────────────
// ═══════════════════════════════════════════════════════════════

const MATRIX_DIMS = [
  { letter:'S', name:'Science',       color:'#14b8d4', steamKey:'Natural Science', desc:'Art as a Science'       },
  { letter:'T', name:'Technology',    color:'#f59e0b', steamKey:'Technology',      desc:'Art as a Technology'    },
  { letter:'E', name:'Engineering',   color:'#10b981', steamKey:'Engineering',     desc:'Art as Engineering'     },
  { letter:'A', name:'Arts',          color:'#ec4899', steamKey:'Arts',            desc:'Art as Arts'            },
  { letter:'M', name:'Mathematics',   color:'#8b5cf6', steamKey:'Mathematics',     desc:'Art as Mathematics'     },
  { letter:'S', name:'Social Sci.',   color:'#f97316', steamKey:'Social Science',  desc:'Art as a Social Science'},
  { letter:'E', name:'Education',     color:'#06b6d4', steamKey:'Education',       desc:'Art as Education'       },
  { letter:'X', name:'Others',        color:'#a78bfa', steamKey:null,              desc:'Art as Others'          },
];

// ── Ifa Clock Art ────────────────────────────────────────────────
// Dual pairs sit exactly opposite each other (180° / 8 positions apart).
// Reading CLOCKWISE from Ogbe (top) gives the traditional Ifa Odu sequence:
//   Ogbe → Iwori → Irosun → Obara → Ogunda → Ika → Otura → Ose → Oyeku
//   → Odi → Owonrin → Okanran → Osa → Oturupon → Irete → Ofun → (back to Ogbe)
// Clockwise positions 0–7:  Ogbe, Iwori, Irosun, Obara, Ogunda, Ika, Otura, Ose
// Clockwise positions 8–15: Oyeku, Odi, Owonrin, Okanran, Osa, Oturupon, Irete, Ofun
const CLOCK_MAP = [0,2,4,6,8,10,12,14, 1,3,5,7,9,11,13,15];
function clockDual(i) { return i % 2 === 0 ? i + 1 : i - 1; }

// Builds the Ifa glyph string exactly as the Ifa Periodic Table does:
//   Ogbe  (1111) → 'O'  (Ifa Circle)
//   Oyeku (0000) → '|'  (standalone Ifa Line)
//   Others      → reversed code, 1→'O', 0→'I' (serifed I = Ifa Connector / Oyeku mark)
// Reading is RTL: code[3], code[2], code[1], code[0].
function clockGlyph(code) {
  if (code === '1111') return 'O';
  if (code === '0000') return '|';
  return code.split('').reverse().map(b => b === '1' ? 'O' : 'I').join('');
}

function ClockOduGlyph({ code, color, nr }) {
  const g = clockGlyph(code);
  // Single-char glyphs ('O' or '|'): large, fills the node nicely.
  // 4-char compound glyphs ('IOOI', 'IIOO', …): smaller with tight letter-spacing.
  const isCompound = g.length > 1;
  const fontSize   = isCompound ? nr * 0.56 : nr * 0.78;

  return (
    <text
      textAnchor="middle"
      dominantBaseline="central"
      fontFamily="Georgia, 'Times New Roman', serif"
      fontWeight="700"
      fontSize={fontSize}
      letterSpacing={isCompound ? '-0.20em' : '0'}
      fill={color}
    >
      {g}
    </text>
  );
}

function IfaClockArt() {
  const [flipped,   setFlipped]   = useState(new Set());
  const [spinning,  setSpinning]  = useState(null);
  const [burst,     setBurst]     = useState(null); // {pos, key}
  const [activePos, setActivePos] = useState(null);
  const [mobile,    setMobile]    = useState(
    typeof window !== 'undefined' && window.matchMedia('(max-width: 519px)').matches
  );
  const busy = React.useRef(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 519px)');
    const handler = e => setMobile(e.matches);
    mq.addEventListener('change', handler);
    setMobile(mq.matches);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Mobile-responsive layout: smaller viewBox (380) so each element renders
  // proportionally larger in physical pixels on narrow screens.
  const SZ      = mobile ? 380 : 480;
  const CX      = SZ / 2, CY = SZ / 2;
  const R_RING  = mobile ? 149 : 188;
  const R_ORBIT = mobile ? 120 : 152;
  const R_NODE  = mobile ? 22  : 27;
  const R_MED   = mobile ? 52  : 66;
  // Transparent tap target — extends beyond the visual node for easier touch
  const R_HIT   = mobile ? R_NODE + 16 : R_NODE + 6;

  const pAngle = p => (-90 + p * 22.5) * Math.PI / 180;

  function handleClockClick(pos, e) {
    e.stopPropagation();
    if (busy.current) return;
    busy.current = true;
    setSpinning(pos);
    setBurst({ pos, key: Date.now() });
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

        {/* Background disc */}
        <circle cx={CX} cy={CY} r={R_RING} fill="url(#clk-bg)"/>

        {/* Outer clock ring */}
        <circle cx={CX} cy={CY} r={R_RING} fill="none" stroke="#c9a227" strokeWidth={3}/>
        {/* Inner dashed ring */}
        <circle cx={CX} cy={CY} r={R_RING-16} fill="none"
          stroke="rgba(201,162,39,0.13)" strokeWidth={1} strokeDasharray="2 7"/>
        {/* 16 tick marks */}
        {Array.from({length:16}, (_, p) => {
          const a = pAngle(p);
          return (
            <line key={p}
              x1={CX+(R_RING-4) *Math.cos(a)} y1={CY+(R_RING-4) *Math.sin(a)}
              x2={CX+(R_RING-14)*Math.cos(a)} y2={CY+(R_RING-14)*Math.sin(a)}
              stroke="rgba(201,162,39,0.48)" strokeWidth={2} strokeLinecap="round"/>
          );
        })}

        {/* Dual-pair connection lines */}
        {Array.from({length:8}, (_, i) => {
          const a1=pAngle(i), a2=pAngle(i+8);
          const hot = activePos !== null && (activePos === i || activePos === i+8);
          return (
            <line key={i}
              x1={CX+R_ORBIT*Math.cos(a1)} y1={CY+R_ORBIT*Math.sin(a1)}
              x2={CX+R_ORBIT*Math.cos(a2)} y2={CY+R_ORBIT*Math.sin(a2)}
              stroke={hot ? "#d4a427" : "rgba(201,162,39,0.08)"}
              strokeWidth={hot ? 1.5 : 0.6} strokeDasharray="3 6"
              className={hot ? 'ifa-clk-pair--hot' : ''}
              style={{transition:'stroke 0.4s, stroke-width 0.4s'}}/>
          );
        })}

        {/* Burst rings on click */}
        {burst && (() => {
          const a  = pAngle(burst.pos);
          const bx = CX + R_ORBIT * Math.cos(a);
          const by = CY + R_ORBIT * Math.sin(a);
          const { odu } = oduAt(burst.pos);
          return [0, 1, 2].map(ri => (
            <circle key={`${burst.key}-${ri}`} cx={bx} cy={by} r={R_NODE}
              fill="none" stroke={odu.color} strokeWidth={2.5 - ri * 0.6}
              className="ifa-clk-burst"
              style={{animationDelay:`${ri * 88}ms`}}/>
          ));
        })()}

        {/* 16 Odu glyph nodes */}
        {Array.from({length:16}, (_, pos) => {
          const angle = pAngle(pos);
          const nx = CX + R_ORBIT * Math.cos(angle);
          const ny = CY + R_ORBIT * Math.sin(angle);
          const { odu, code, isDual } = oduAt(pos);
          const isAct  = activePos === pos;
          const isPair = activePos !== null && (pos === activePos || pos === (activePos + 8) % 16);
          const isSpin = spinning === pos;

          return (
            <g key={pos} transform={`translate(${nx},${ny})`}
               onClick={e => handleClockClick(pos, e)}
               style={{cursor:'pointer'}}
               aria-label={`${odu.name}${isDual ? ' (dual)' : ''} — tap to flip`}>
              {/* Enlarged invisible tap target for comfortable mobile touch */}
              <circle r={R_HIT} fill="transparent"/>
              {/* Glyph marks — spin animation wrapper */}
              <g className={isSpin ? 'ifa-clk-glyph--spin' : ''}
                 style={{transformBox:'fill-box', transformOrigin:'center'}}>
                <ClockOduGlyph code={code} color={odu.color} nr={R_NODE}/>
              </g>
            </g>
          );
        })}

        {/* Centre medallion */}
        <circle cx={CX} cy={CY} r={R_MED} fill="url(#clk-bg)"
          stroke="rgba(201,162,39,0.38)" strokeWidth={1.5}/>
        <circle cx={CX} cy={CY} r={R_MED-8} fill="none"
          stroke="rgba(201,162,39,0.10)" strokeWidth={1} strokeDasharray="2 5"/>

        {/* Centre idle */}
        {!apd && (
          <g>
            <text x={CX} y={mobile ? CY+2 : CY+5} textAnchor="middle" dominantBaseline="middle"
              fontSize={mobile ? 22 : 26} fill="rgba(201,162,39,0.26)" fontFamily="serif">◎</text>
            <text x={mobile ? CX : CX} y={mobile ? CY+20 : CY+27} textAnchor="middle" dominantBaseline="middle"
              fontSize={mobile ? 9 : 7} fill="rgba(201,162,39,0.20)"
              fontFamily="'Space Grotesk',system-ui,sans-serif" letterSpacing="0.12em">16 ODU</text>
          </g>
        )}

        {/* Centre active — on mobile show only name + dual info (larger text);
            on desktop show all four lines */}
        {apd && (
          <g key={`ctr-${apd.idx}-${apd.isDual}`} className="ifa-clk-ctr-text">
            <text x={CX} y={mobile ? CY-10 : CY-22} textAnchor="middle" dominantBaseline="middle"
              fontSize={mobile ? 14 : 11} fontWeight="800"
              fontFamily="'Space Grotesk',system-ui,sans-serif" fill={apd.odu.color}>
              {apd.odu.name}
            </text>
            <text x={CX} y={mobile ? CY+8 : CY-8} textAnchor="middle" dominantBaseline="middle"
              fontSize={mobile ? 9.5 : 7.5} fontFamily="sans-serif" fill="rgba(201,162,39,0.55)">
              {apd.isDual ? `↩ ${aOrig.name}` : `→ ${aDual.name}`}
            </text>
            {!mobile && <>
              <text x={CX} y={CY+6} textAnchor="middle" dominantBaseline="middle"
                fontSize={6.5} fontFamily="sans-serif" fill="#4a5565">
                {apd.odu.field}
              </text>
              <text x={CX} y={CY+19} textAnchor="middle" dominantBaseline="middle"
                fontSize={5.5} fontFamily="'Space Grotesk',system-ui,sans-serif"
                fill="rgba(201,162,39,0.22)" letterSpacing="0.06em">
                {apd.odu.meji.toUpperCase()}
              </text>
            </>}
          </g>
        )}
      </svg>

      {/* Detail panel below SVG */}
      <div className={`ifa-clock-panel${apd ? ' ifa-clock-panel--open' : ''}`}>
        {apd && (
          <div className="ifa-clock-panel-inner" style={{borderColor: apd.odu.color + '99'}}>
            <div className="ifa-clock-ph">
              <span className="ifa-clock-ph-meji" style={{color: apd.odu.color}}>{apd.odu.meji}</span>
              {apd.isDual && aOrig && (
                <span className="ifa-clock-ph-badge"
                  style={{borderColor: aOrig.color + '55', color: aOrig.color}}>
                  dual of {aOrig.name}
                </span>
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

function IfartMatrix() {
  const [pinnedDim, setPinnedDim] = useState(null);
  const [hoveredDim, setHoveredDim] = useState(null);

  const CX = 240, CY = 240, R_ORBIT = 158, R_NODE = 36, R_CENTER = 54;

  const isTouch = React.useMemo(
    () => typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0),
    []
  );

  const activeDim = pinnedDim !== null ? pinnedDim : hoveredDim;
  const activeData = activeDim !== null ? MATRIX_DIMS[activeDim] : null;

  const relatedOdu = React.useMemo(() => {
    if (activeDim === null) return [];
    const d = MATRIX_DIMS[activeDim];
    if (d.steamKey) return ODU.filter(o => o.steam === d.steamKey);
    const mainKeys = ['Natural Science','Technology','Engineering','Arts','Mathematics','Social Science','Education'];
    return ODU.filter(o => !mainKeys.includes(o.steam));
  }, [activeDim]);

  function handleNodeClick(i, e) {
    e.stopPropagation();
    setPinnedDim(prev => prev === i ? null : i);
    setHoveredDim(null);
  }

  function handleCenterClick(e) {
    e.stopPropagation();
    setPinnedDim(null);
  }

  function handleNodeEnter(i) { if (!isTouch) setHoveredDim(i); }
  function handleNodeLeave()  { if (!isTouch) setHoveredDim(null); }

  return (
    <div className="challenge-matrix-wrap"
         onClick={() => { setPinnedDim(null); setHoveredDim(null); }}>
      <p className="challenge-art-caption">Ifa TOE 0+8D Matrix · Ifa Transform</p>
      <p className="challenge-art-sub">Ifart &amp; Orisart — Using the Polymathic Approach of Ifa/Orisa to Learn the Arts</p>

      <svg viewBox="0 0 480 480" className="ifart-matrix-svg"
           aria-label="Ifa TOE 0+8D Matrix centred on Ifart/Orisart">
        <defs>
          <radialGradient id="ifm-cgrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#fde68a" />
            <stop offset="55%"  stopColor="#f0920c" />
            <stop offset="100%" stopColor="#c06800" />
          </radialGradient>
          <filter id="ifm-blur" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="5" />
          </filter>
        </defs>

        {/* Orbit ring — brightens when something active */}
        <circle cx={CX} cy={CY} r={R_ORBIT} fill="none"
          stroke={activeDim !== null ? 'rgba(240,146,12,0.22)' : 'rgba(240,146,12,0.12)'}
          strokeWidth={1} strokeDasharray="3 5"
          style={{ transition: 'stroke 0.4s' }} />

        {/* Connector lines */}
        {MATRIX_DIMS.map((d, i) => {
          const a = (i * 45 - 90) * Math.PI / 180;
          const isActive = activeDim === i;
          const isDimmed = activeDim !== null && !isActive;
          return (
            <line key={i}
              x1={CX + (R_CENTER + 4) * Math.cos(a)}
              y1={CY + (R_CENTER + 4) * Math.sin(a)}
              x2={CX + (R_ORBIT - R_NODE - 2) * Math.cos(a)}
              y2={CY + (R_ORBIT - R_NODE - 2) * Math.sin(a)}
              stroke={d.color}
              strokeWidth={isActive ? 2 : 1.2}
              strokeDasharray={isActive ? '0' : '3 4'}
              style={{ opacity: isActive ? 0.9 : isDimmed ? 0.08 : 0.35,
                       transition: 'opacity 0.35s' }} />
          );
        })}

        {/* Outer nodes */}
        {MATRIX_DIMS.map((d, i) => {
          const a = (i * 45 - 90) * Math.PI / 180;
          const nx = CX + R_ORBIT * Math.cos(a);
          const ny = CY + R_ORBIT * Math.sin(a);
          const isActive = activeDim === i;
          const isDimmed = activeDim !== null && !isActive;
          return (
            <g key={i}
               onClick={e => handleNodeClick(i, e)}
               onMouseEnter={() => handleNodeEnter(i)}
               onMouseLeave={handleNodeLeave}
               style={{ cursor: 'pointer' }}>
              {/* Outer glow halo */}
              <circle cx={nx} cy={ny}
                r={isActive ? R_NODE + 16 : R_NODE + 9}
                fill={d.color} filter="url(#ifm-blur)"
                style={{ opacity: isActive ? 0.32 : isDimmed ? 0.03 : 0.13,
                         transition: 'opacity 0.35s' }} />
              {/* Accent ring when active */}
              {isActive && (
                <circle cx={nx} cy={ny} r={R_NODE + 3}
                  fill="none" stroke={d.color} strokeWidth={1}
                  opacity={0.45} strokeDasharray="4 3" />
              )}
              {/* Node body */}
              <circle cx={nx} cy={ny} r={R_NODE}
                fill="rgba(4,8,15,0.92)" stroke={d.color}
                strokeWidth={isActive ? 2.6 : 1.8}
                style={{ opacity: isDimmed ? 0.28 : 1, transition: 'opacity 0.35s' }} />
              {/* Dimension letter */}
              <text x={nx} y={ny - 7} textAnchor="middle" dominantBaseline="middle"
                fontSize={isActive ? 20 : 17} fontWeight="800"
                fontFamily="'Space Grotesk',system-ui,sans-serif" fill={d.color}
                style={{ opacity: isDimmed ? 0.28 : 1, transition: 'opacity 0.35s' }}>
                {d.letter}
              </text>
              {/* Dimension name */}
              <text x={nx} y={ny + 13} textAnchor="middle" dominantBaseline="middle"
                fontSize={8} fontWeight="600"
                fontFamily="'Space Grotesk',system-ui,sans-serif" fill={d.color}
                style={{ opacity: isDimmed ? 0.18 : 0.88, transition: 'opacity 0.35s' }}>
                {d.name}
              </text>
            </g>
          );
        })}

        {/* Centre halos */}
        <circle cx={CX} cy={CY} r={R_CENTER + 18}
          fill="url(#ifm-cgrad)" opacity={0.18} filter="url(#ifm-blur)" />
        <circle cx={CX} cy={CY} r={R_CENTER + 8}
          fill="url(#ifm-cgrad)" opacity={0.10} />

        {/* Centre node — tap to deselect */}
        <g onClick={handleCenterClick}
           style={{ cursor: pinnedDim !== null ? 'pointer' : 'default' }}>
          <circle cx={CX} cy={CY} r={R_CENTER}
            fill="rgba(4,8,15,0.96)" stroke="url(#ifm-cgrad)" strokeWidth={2.2} />
          <text x={CX} y={CY - 10} textAnchor="middle" dominantBaseline="middle"
            fontSize={15} fontWeight="900"
            fontFamily="'Space Grotesk',system-ui,sans-serif" fill="#fde68a">
            Ifart
          </text>
          <text x={CX} y={CY + 9} textAnchor="middle" dominantBaseline="middle"
            fontSize={12} fontWeight="700"
            fontFamily="'Space Grotesk',system-ui,sans-serif" fill="#f0920c">
            /Orisart
          </text>
          <text x={CX} y={CY + 26} textAnchor="middle" dominantBaseline="middle"
            fontSize={8} fontFamily="'Space Grotesk',system-ui,sans-serif"
            fill="#f0920c" opacity={0.55}>
            0+8D
          </text>
        </g>
      </svg>

      {/* Dimension reveal panel */}
      <div className={`ifart-dim-panel${activeData ? ' active' : ''}`}>
        {activeData && (
          <div className="ifart-dim-panel-inner" style={{ borderColor: activeData.color + 'aa' }}>
            <div className="ifart-dim-header">
              <span className="ifart-dim-letter"
                style={{ color: activeData.color, textShadow: `0 0 28px ${activeData.color}99` }}>
                {activeData.letter}
              </span>
              <div className="ifart-dim-meta">
                <span className="ifart-dim-name" style={{ color: activeData.color }}>{activeData.name}</span>
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

// ═══════════════════════════════════════════════════════════════
// ── Ayò Ọlọ́pọ́nfán Challenge Section ─────────────────────────
// Àtùpà Olójú Mẹ́rìndínlógún × Ayò Ọlọ́pọ́nfá Olójú Mẹ́rìndínlógún
// ═══════════════════════════════════════════════════════════════

// 16 lamp colours — one per Odu (Ogbe → Ofun)
const LAMP_COLORS = ODU.map(o => o.color);

// Single animated flame + bowl, called once per lamp arm
function FlameBowl({ x, y, idx, isLit, onToggle }) {
  const d1    = `${(0.65 + (idx % 6) * 0.09).toFixed(2)}s`;
  const d2    = `${(0.55 + (idx % 5) * 0.08).toFixed(2)}s`;
  const beg   = `${(idx * 0.07).toFixed(2)}s`;
  const color = LAMP_COLORS[idx];
  const name  = ODU[idx].name;

  // Flame size scales up when lit
  const oryBase = isLit ? 11 : 8;
  const ory1    = isLit ? [11,9,12,10,11] : [8,6.5,8.5,7,8];
  const iry1    = isLit ? [7.5,6,8,7,7.5] : [5,4,5.5,4.5,5];

  return (
    <g onClick={onToggle} style={{ cursor: 'pointer' }} role="button"
       aria-label={`${name} lamp — ${isLit ? 'lit' : 'unlit'}`}>

      {/* Clickable hit zone (transparent) — enlarged for touch targets */}
      <ellipse cx={x} cy={y-8} rx={26} ry={34} fill="transparent" />

      {/* ── Glow layers (only when lit) ── */}
      {isLit && <>
        {/* Outer soft halo */}
        <ellipse cx={x} cy={y-6} rx={38} ry={48} fill={color} opacity={0.10} filter="url(#ch-blur-soft)" />
        {/* Mid bloom */}
        <ellipse cx={x} cy={y-5} rx={22} ry={28} fill={color} opacity={0.20} filter="url(#ch-blur)" />
        {/* Inner bloom */}
        <ellipse cx={x} cy={y-4} rx={12} ry={15} fill={color} opacity={0.40} filter="url(#ch-blur)" />
      </>}

      {/* Base bloom (always present, dim) */}
      <ellipse cx={x} cy={y-4} rx={9} ry={11}
        fill={isLit ? color : '#e8772a'}
        opacity={isLit ? 0.28 : 0.15}
        filter="url(#ch-blur)" />

      {/* Hover ring — faint circle users see on hover */}
      <circle cx={x} cy={y-7} r={15} fill="none"
        stroke={color} strokeWidth={isLit ? 1.5 : 0.8}
        opacity={isLit ? 0.55 : 0.22}
        strokeDasharray={isLit ? 'none' : '3 4'} />

      {/* Oil bowl */}
      <path d={`M ${x-5},${y+2} Q ${x},${y+7} ${x+5},${y+2}`}
        fill="none" stroke={isLit ? color : '#8b6914'} strokeWidth={2} />
      <line x1={x-5} y1={y+2} x2={x+5} y2={y+2}
        stroke={isLit ? color : '#8b6914'} strokeWidth={2.2} />

      {/* Outer flame */}
      <ellipse cx={x} cy={y-6} rx={isLit ? 5.5 : 4} ry={oryBase}
        fill={isLit ? color : '#e8772a'}>
        <animate attributeName="ry" values={ory1.join(';')} dur={d1} begin={beg} repeatCount="indefinite" />
        <animate attributeName="cy" values={`${y-6};${y-7.5};${y-5};${y-7};${y-6}`} dur={d1} begin={beg} repeatCount="indefinite" />
      </ellipse>

      {/* Inner flame — warm white when lit, gold when unlit */}
      <ellipse cx={x} cy={y-9} rx={2.2} ry={isLit ? 7 : 5}
        fill={isLit ? 'rgba(255,250,220,0.95)' : '#fde060'}>
        <animate attributeName="ry" values={iry1.join(';')} dur={d2} begin={beg} repeatCount="indefinite" />
        <animate attributeName="cy" values={`${y-9};${y-11};${y-8};${y-10};${y-9}`} dur={d2} begin={beg} repeatCount="indefinite" />
      </ellipse>

      {/* White-hot tip */}
      <ellipse cx={x} cy={y-14} rx={isLit ? 1.5 : 1} ry={isLit ? 3 : 2}
        fill="rgba(255,252,220,0.92)" />

      {/* Odu name tag — appears when lit */}
      {isLit && (
        <text x={x} y={y+18} textAnchor="middle"
          fontSize={7.5} fontFamily="'Space Grotesk', sans-serif"
          fill={color} opacity={0.88} fontWeight="600"
          style={{ pointerEvents: 'none', userSelect: 'none' }}>
          {name}
        </text>
      )}
    </g>
  );
}

// Àtùpà Olójú Mẹ́rìndínlógún — animated 16-flame lamp stand SVG
function AtupaSVG({ litLamps, onToggleLamp }) {
  const W = 290, H = 410;
  const cx = W / 2;
  const baseY = H - 46;
  const topY  = 22;
  const poleH = baseY - topY;
  // 8 levels, arm length tapering from widest at bottom to narrowest at top
  const levels = Array.from({ length: 8 }, (_, i) => ({
    y:   Math.round(topY + poleH * (0.04 + i * 0.122)),
    len: Math.round(110 - i * 12),
  }));
  // How many lamps are currently lit — drives ambient glow intensity
  const litCount = litLamps.size;

  return (
    <svg viewBox={`0 0 ${W} ${H}`}
      className="atupa-svg"
      style={{ width:'100%', height:'auto', display:'block', margin:'0 auto', overflow:'visible',
               touchAction:'manipulation', WebkitTapHighlightColor:'transparent' }}
      aria-label="Àtùpà Olójú Mẹ́rìndínlógún — 16-Point Lamp Stand">
      <defs>
        <radialGradient id="ch-glow" cx="50%" cy="50%">
          <stop offset="0%"   stopColor={`rgba(240,150,12,${0.12 + litCount * 0.04})`} />
          <stop offset="65%"  stopColor={`rgba(232,100,0,${0.04 + litCount * 0.015})`} />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <linearGradient id="ch-pole" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#9a7820" />
          <stop offset="38%"  stopColor="#f0c840" />
          <stop offset="62%"  stopColor="#f0c840" />
          <stop offset="100%" stopColor="#9a7820" />
        </linearGradient>
        <filter id="ch-blur" x="-120%" y="-120%" width="340%" height="340%">
          <feGaussianBlur stdDeviation="3.5" />
        </filter>
        <filter id="ch-blur-soft" x="-200%" y="-200%" width="500%" height="500%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
      </defs>

      {/* Ambient background glow — brightens as more lamps are lit */}
      <ellipse cx={cx} cy={H * 0.40} rx={135} ry={H * 0.43} fill="url(#ch-glow)" />

      {/* Stand base — three-tier */}
      <rect x={cx-26} y={baseY}    width={52} height={10} rx={5} fill="#6b4f10" />
      <rect x={cx-15} y={baseY-9}  width={30} height={10} rx={3} fill="#8b6514" />
      <rect x={cx-6}  y={baseY-17} width={12} height={9}  rx={2} fill="#a87c1e" />

      {/* Central pole */}
      <rect x={cx-3} y={topY} width={6} height={poleH} rx={3} fill="url(#ch-pole)" />

      {/* Arms + flames for each of the 8 levels */}
      {levels.map((lv, li) => {
        const idxL = li * 2 + 1;
        const idxR = li * 2;
        return (
          <g key={li}>
            <line x1={cx-2} y1={lv.y} x2={cx-lv.len} y2={lv.y}
              stroke={litLamps.has(idxL) ? LAMP_COLORS[idxL] : '#c9a227'}
              strokeWidth={1.8} strokeLinecap="round"
              style={{ transition: 'stroke 0.4s' }} />
            <line x1={cx+2} y1={lv.y} x2={cx+lv.len} y2={lv.y}
              stroke={litLamps.has(idxR) ? LAMP_COLORS[idxR] : '#c9a227'}
              strokeWidth={1.8} strokeLinecap="round"
              style={{ transition: 'stroke 0.4s' }} />
            <FlameBowl x={cx-lv.len} y={lv.y} idx={idxL}
              isLit={litLamps.has(idxL)} onToggle={() => onToggleLamp(idxL)} />
            <FlameBowl x={cx+lv.len} y={lv.y} idx={idxR}
              isLit={litLamps.has(idxR)} onToggle={() => onToggleLamp(idxR)} />
          </g>
        );
      })}

      {/* Top finial */}
      <circle cx={cx} cy={topY-10} r={9}   fill="#c9a227" />
      <circle cx={cx} cy={topY-10} r={5.5} fill="#f0c840" />
      <circle cx={cx} cy={topY-10} r={2}   fill="rgba(255,252,200,0.95)" />
    </svg>
  );
}

// Small Odu circle for the art grid — supports dual-flip interaction
function OduMiniCircle({ odu, isFlipped, isFlipping, isPulsing, onFlip }) {
  // Each Odu's dual: odd num→num+1, even num→num-1 (Ogbe↔Oyeku, Iwori↔Odi, etc.)
  const dualNum  = odu.num % 2 === 1 ? odu.num + 1 : odu.num - 1;
  const dispOdu  = isFlipped ? ODU[dualNum - 1] : odu;
  const code     = ODU_CODES[dispOdu.num - 1];
  const isOdd    = (dispOdu.num - 1) % 2 === 1;

  let cls = 'odu-mini-circ';
  if (isFlipping) cls += ' odu-mini-circ--flipping';
  if (isFlipped)  cls += ' odu-mini-circ--flipped';
  if (isPulsing)  cls += ' odu-mini-circ--pulse';

  return (
    <div className={cls} style={{ '--mc': dispOdu.color }} onClick={() => onFlip && onFlip(odu.num)}>
      <div className="odu-mini-ring">
        {isOdd ? <OyekuPitArrow /> : <PitArrow />}
        <div className="odu-mini-dots">
          {code.split('').map((b, ri) => (
            <div key={ri} className="odu-mini-dotrow">
              {[0, 1].map(col => (
                <span key={col} className={`odu-mini-dot odu-mini-dot--${b === '1' ? 'on' : 'off'}`} />
              ))}
            </div>
          ))}
        </div>
      </div>
      <span className="odu-mini-label">{dispOdu.name} Meji</span>
    </div>
  );
}

// ── Opon Ifa Mini Board — Alternative Art Design ──────────────
// SVG-based authentic Opon Ifa divination board with real Odu marks
// Eshu face always at 12 o'clock · Meji form (left + right column same Odu)
function OponIfaBoardSVG({ code, color, num }) {
  const cx = 100, cy = 100;
  const uid = `opon${num}`;

  // 8 carved figure positions around the rim (degrees from 12 o'clock)
  const figAngles = [0, 45, 90, 135, 180, 225, 270, 315];
  const rimCR = 80; // radial center for carved figures

  const marks = code.split('');

  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ display:'block', width:'100%', height:'100%' }}>
      <defs>
        <filter id={`${uid}-mg`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3.5" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <radialGradient id={`${uid}-rim`} cx="38%" cy="30%" r="75%">
          <stop offset="0%"   stopColor="#52320e"/>
          <stop offset="50%"  stopColor="#301d08"/>
          <stop offset="100%" stopColor="#120a03"/>
        </radialGradient>
        <radialGradient id={`${uid}-inn`} cx="42%" cy="36%" r="68%">
          <stop offset="0%"  stopColor="#0f0c1e"/>
          <stop offset="100%" stopColor="#06040f"/>
        </radialGradient>
        <radialGradient id={`${uid}-halo`} cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor={color} stopOpacity="0.22"/>
          <stop offset="65%"  stopColor={color} stopOpacity="0.07"/>
          <stop offset="100%" stopColor={color} stopOpacity="0"/>
        </radialGradient>
      </defs>

      {/* Outer ambient halo */}
      <circle cx={cx} cy={cy} r={100} fill={`url(#${uid}-halo)`}/>

      {/* Board rim body */}
      <circle cx={cx} cy={cy} r={96} fill={`url(#${uid}-rim)`}/>

      {/* Outer edge rings */}
      <circle cx={cx} cy={cy} r={96} fill="none" stroke={color} strokeWidth="1.3" strokeOpacity="0.5"/>
      <circle cx={cx} cy={cy} r={92} fill="none" stroke="rgba(201,162,39,0.16)" strokeWidth="0.7"/>
      <circle cx={cx} cy={cy} r={87} fill="none" stroke="rgba(201,162,39,0.12)" strokeWidth="0.6"/>

      {/* Carved figures around rim — 8 positions */}
      {figAngles.map((angle, i) => {
        const rad = (angle - 90) * Math.PI / 180;
        const fx = cx + rimCR * Math.cos(rad);
        const fy = cy + rimCR * Math.sin(rad);
        const isEshu = i === 0;

        if (isEshu) {
          return (
            <g key="eshu" transform={`translate(${fx},${fy})`} filter={`url(#${uid}-mg)`}>
              <circle r={10.5} fill="#120a03"/>
              <circle r={10}   fill="none" stroke="#c9a227" strokeWidth="1.4"/>
              <circle r={8.5}  fill="#c9a227" fillOpacity="0.9"/>
              <circle r={7}    fill="#3a2208"/>
              <circle cx={-2.3} cy={-2} r={1.5} fill="#c9a227"/>
              <circle cx={ 2.3} cy={-2} r={1.5} fill="#c9a227"/>
              <circle cx={-2.3} cy={-2} r={0.7} fill="#120a03"/>
              <circle cx={ 2.3} cy={-2} r={0.7} fill="#120a03"/>
              <line x1={0} y1={-0.5} x2={0} y2={1} stroke="rgba(201,162,39,0.45)" strokeWidth="0.8" strokeLinecap="round"/>
              <path d="M -2.6 3 Q 0 5.5 2.6 3" fill="none" stroke="#c9a227" strokeWidth="1.1" strokeLinecap="round"/>
              <path d="M -4 -5.5 L -2.5 -9 L 0 -7.2 L 2.5 -9 L 4 -5.5" fill="none" stroke="#f0c840" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx={-2.5} cy={-9} r={1.1} fill="#f0c840"/>
              <circle cx={ 2.5} cy={-9} r={1.1} fill="#f0c840"/>
              <circle cx={0}    cy={-7.2} r={1.4} fill="#f0c840"/>
            </g>
          );
        }

        return (
          <g key={i} transform={`translate(${fx},${fy})`}>
            <circle r={7}   fill="#1e1208" stroke="rgba(201,162,39,0.38)" strokeWidth="0.9"/>
            <circle r={5.2} fill="#2c1a0a"/>
            <circle cx={-1.9} cy={-1.6} r={0.95} fill="rgba(201,162,39,0.42)"/>
            <circle cx={ 1.9} cy={-1.6} r={0.95} fill="rgba(201,162,39,0.42)"/>
            <path d="M -2.2 2.4 Q 0 4.2 2.2 2.4" fill="none" stroke="rgba(201,162,39,0.3)" strokeWidth="0.8" strokeLinecap="round"/>
          </g>
        );
      })}

      {/* Inner gold boundary ring */}
      <circle cx={cx} cy={cy} r={71.5} fill="none" stroke={color} strokeWidth="2.2" strokeOpacity="0.78"/>
      <circle cx={cx} cy={cy} r={69}   fill="none" stroke={color} strokeWidth="0.6" strokeOpacity="0.28"/>

      {/* Divination surface */}
      <circle cx={cx} cy={cy} r={68} fill={`url(#${uid}-inn)`}/>
      <circle cx={cx} cy={cy} r={68} fill={color} fillOpacity="0.035"/>

      {/* Concentric texture rings */}
      <circle cx={cx} cy={cy} r={56} fill="none" stroke="rgba(255,255,255,0.025)" strokeWidth="0.8"/>
      <circle cx={cx} cy={cy} r={40} fill="none" stroke="rgba(255,255,255,0.018)" strokeWidth="0.8"/>

      {/* Odu number — top inner board */}
      <text x={cx} y={cy-50} textAnchor="middle"
        fill={color} fillOpacity="0.52"
        fontFamily="'Space Grotesk', monospace"
        fontSize="9" fontWeight="700" letterSpacing="0.14em"
      >{String(num).padStart(2,'0')}</text>

      {/* Odu Marks — Meji form: left column + right column (identical) */}
      <g filter={`url(#${uid}-mg)`}>
        {[cx - 18, cx + 18].map((colX, ci) =>
          marks.map((bit, ri) => {
            const baseY = cy - 24 + ri * 16;
            if (bit === '1') {
              return (
                <line key={`${ci}-${ri}`}
                  x1={colX} y1={baseY - 7}
                  x2={colX} y2={baseY + 7}
                  stroke={color} strokeWidth="2.6" strokeLinecap="round"
                />
              );
            }
            return (
              <g key={`${ci}-${ri}`}>
                <line x1={colX - 3.5} y1={baseY - 7} x2={colX - 3.5} y2={baseY + 7}
                  stroke={color} strokeWidth="2.1" strokeLinecap="round"/>
                <line x1={colX + 3.5} y1={baseY - 7} x2={colX + 3.5} y2={baseY + 7}
                  stroke={color} strokeWidth="2.1" strokeLinecap="round"/>
              </g>
            );
          })
        )}
      </g>

      {/* Meji centre divider */}
      <line x1={cx} y1={cy - 36} x2={cx} y2={cy + 36}
        stroke="rgba(255,255,255,0.065)"
        strokeWidth="0.8" strokeLinecap="round" strokeDasharray="2.5 4"/>

      {/* MEJI label — bottom inner board */}
      <text x={cx} y={cy + 56} textAnchor="middle"
        fill={color} fillOpacity="0.65"
        fontFamily="'Space Grotesk', monospace"
        fontSize="8.5" fontWeight="600" letterSpacing="0.1em"
      >MEJI</text>
    </svg>
  );
}

// OponIfa mini: click → board fades+shrinks out → dual Odu fades+grows in
function OponIfaMiniCircle({ odu, dualOdu, onClick }) {
  const [visible, setVisible] = useState(true);
  const [showingDual, setShowingDual] = useState(false);
  const busy = useRef(false);

  const shown = showingDual ? dualOdu : odu;
  const code  = ODU_CODES[shown.num - 1];

  function handleClick() {
    if (busy.current) return;
    busy.current = true;
    setVisible(false);
    setTimeout(() => {
      setShowingDual(d => !d);
      setVisible(true);
      onClick();
      setTimeout(() => { busy.current = false; }, 420);
    }, 340);
  }

  return (
    <div
      className={`opon-mini${visible ? '' : ' opon-mini--hidden'}`}
      style={{ '--oc': shown.color, '--pulse-delay': `${(shown.num - 1) * 0.2}s` }}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && handleClick()}
      aria-label={`${shown.name} Meji — click to reveal dual Odu`}
    >
      <OponIfaBoardSVG code={code} color={shown.color} num={shown.num} />
      <span className="opon-mini-label" style={{ color: shown.color }}>{shown.name} Meji</span>
    </div>
  );
}

function ChallengeSection() {
  const [accepted, setAccepted] = useState(false);
  const [rippling, setRippling] = useState(false);
  const [litLamps, setLitLamps] = useState(new Set());
  const [switchOn, setSwitchOn] = useState(false);
  const [isIlluminating, setIsIlluminating] = useState(false);

  // Dual-flip state for the Odu board art
  const [flippedOdu, setFlippedOdu]   = useState(new Set()); // Set of original odu.num values
  const [flippingNow, setFlippingNow] = useState(null);       // odu.num currently mid-animation
  const [pulsingNow,  setPulsingNow]  = useState(null);       // odu.num showing reveal pulse

  function handlePitFlip(oduNum) {
    if (flippingNow !== null) return; // block concurrent flips
    setFlippingNow(oduNum);
    // Swap content at midpoint — when ring is edge-on (rotateY≈90°)
    setTimeout(() => {
      setFlippedOdu(prev => {
        const next = new Set(prev);
        if (next.has(oduNum)) next.delete(oduNum); else next.add(oduNum);
        return next;
      });
    }, 330);
    // Animation complete → brief reveal pulse
    setTimeout(() => {
      setFlippingNow(null);
      setPulsingNow(oduNum);
      setTimeout(() => setPulsingNow(null), 500);
    }, 700);
  }

  function toggleLamp(idx) {
    setLitLamps(prev => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  }

  function handleMasterSwitch() {
    if (!switchOn) {
      setSwitchOn(true);
      setIsIlluminating(true);
      // Cascade from the base (bottom pair) up to the crown (top pair)
      const order = [14,15,12,13,10,11,8,9,6,7,4,5,2,3,0,1];
      order.forEach((idx, i) => {
        setTimeout(() => {
          setLitLamps(prev => new Set([...prev, idx]));
        }, i * 55);
      });
      setTimeout(() => setIsIlluminating(false), order.length * 55 + 700);
    } else {
      setSwitchOn(false);
      setLitLamps(new Set());
    }
  }

  function handleAccept() {
    if (accepted || rippling) return;
    SoundEngine.prime();
    SoundEngine.challengeAccept();
    setRippling(true);
    setTimeout(() => { setRippling(false); setAccepted(true); }, 1300);
  }

  const p2Row = P2_DISP.map(i => ODU[i]);
  const p1Row = P1_DISP.map(i => ODU[i]);

  return (
    <section className="challenge-section">

      {/* ── Header ── */}
      <div className="challenge-header">
        <span className="challenge-eyebrow">Ayò Ọlọ́pọ́nfá Challenge</span>
        <h2 className="challenge-title">Ifa Art &amp; Orisa Art</h2>
        <p className="challenge-subtitle">
          Àtùpà Olójú Mẹ́rìndínlógún &amp; Ayò Ọlọ́pọ́nfá Olójú Mẹ́rìndínlógún
        </p>
      </div>

      {/* ── Art Grid ── */}
      <div className="challenge-art-grid">

        {/* Left — Àtùpà */}
        <div className="challenge-art-panel">
          <p className="challenge-art-caption">Àtùpà Olójú Mẹ́rìndínlógún</p>
          <p className="challenge-art-sub">The 16-Point Lamp Stand · 16 Flames</p>
          <div className={`atupa-switch-row${isIlluminating ? ' atupa-illuminating' : ''}`}>
            <AtupaSVG litLamps={litLamps} onToggleLamp={toggleLamp} />
            <div className="atupa-switch-wrap">
              <button
                className={`atupa-master-switch${switchOn ? ' atupa-master-switch--on' : ''}`}
                onClick={handleMasterSwitch}
                aria-label={switchOn ? 'Switch off all 16 lamps' : 'Switch on all 16 lamps'}
                aria-pressed={switchOn}
              >
                <span className="atupa-switch-knob" />
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
          <p className="challenge-art-tagline">
            Sixteen flames · Sixteen Odu<br />Sixteen hours · Sixteen days
          </p>
        </div>

        {/* Right — Odu circles + Opon Ifa boards */}
        <div className="challenge-art-panel">
          <p className="challenge-art-caption">Ayò Ọlọ́pọ́nfá Olójú Mẹ́rìndínlógún</p>
          <p className="challenge-art-sub">The 16-Pot Ifa Game Board</p>
          <div className="challenge-odu-board">
            <div className="challenge-odu-row">
              {p1Row.map(odu => (
                <OduMiniCircle key={odu.id} odu={odu}
                  isFlipped={flippedOdu.has(odu.num)}
                  isFlipping={flippingNow === odu.num}
                  isPulsing={pulsingNow === odu.num}
                  onFlip={handlePitFlip} />
              ))}
            </div>
            <div className="challenge-odu-row">
              {p2Row.map(odu => (
                <OduMiniCircle key={odu.id} odu={odu}
                  isFlipped={flippedOdu.has(odu.num)}
                  isFlipping={flippingNow === odu.num}
                  isPulsing={pulsingNow === odu.num}
                  onFlip={handlePitFlip} />
              ))}
            </div>
          </div>
          <p className="challenge-art-caption" style={{ marginTop: '16px' }}>Opon Ifa Olójú Mẹ́rìndínlógún</p>
          <p className="challenge-art-sub">The 16 IfaBoards</p>
          <div className="opon-ifa-board">
            <div className="opon-ifa-row">
              {P1_DISP.map(i => (
                <OponIfaMiniCircle key={i} odu={ODU[i]}
                  dualOdu={ODU[i % 2 === 0 ? i + 1 : i - 1]}
                  onClick={() => {}} />
              ))}
            </div>
            <div className="opon-ifa-row">
              {P2_DISP.map(i => (
                <OponIfaMiniCircle key={i} odu={ODU[i]}
                  dualOdu={ODU[i % 2 === 0 ? i + 1 : i - 1]}
                  onClick={() => {}} />
              ))}
            </div>
          </div>
          <p className="challenge-art-tagline">
            16 Odu · 256 Combinations<br />The Ifa Computer · ComputoE
          </p>
        </div>

      </div>

      {/* ── Ifa Clock Art ── */}
      <IfaClockArt />

      {/* ── Ifa Wheel ── */}
      <IfaWheelPanel />

      {/* ── Ifa TOE 0+8D Matrix ── */}
      <IfartMatrix />

      {/* ── Poetry ── */}
      <div className="challenge-poetry">
        <div className="challenge-verse">
          <p className="challenge-line">Ṣé o letá Ayò Ọlọ́pọ́nfá Olójú Mẹ́rìndínlógún</p>
          <p className="challenge-line">Pẹ̀lú Àtùpà Olójú Mẹ́rìndínlógún</p>
          <p className="challenge-line">Fun Ọgọ́jú (Wákàtí) Mẹ́rìndínlógún</p>
          <p className="challenge-line">Fun Ọjọ́ Mẹ́rìndínlógún?</p>
        </div>
        <div className="challenge-verse-divider" aria-hidden="true">· · ·</div>
        <p className="challenge-line-en">
          Can you play the 16-Pot Ifa Game using the 16-Point Lamp Stand<br />
          for 16 hours and 16 days?
        </p>
      </div>

      {/* ── Accept CTA ── */}
      <div className="challenge-cta">
        <button
          className={[
            'challenge-btn',
            accepted  ? 'challenge-btn--accepted' : '',
            rippling  ? 'challenge-btn--ripple'   : '',
          ].filter(Boolean).join(' ')}
          onClick={handleAccept}
          disabled={accepted}
          aria-live="polite"
          aria-label="Accept the Ayò Ọlọ́pọ́nfá Challenge">
          {accepted ? (
            <span className="challenge-btn-inner">
              ✦ &nbsp; Ìdíje Tidi Ṣíṣe — Challenge Accepted &nbsp; ✦
            </span>
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

      {/* ── Keywords ── */}
      <div className="challenge-keywords">
        <span className="challenge-kw-label">Keywords</span>
        <div className="challenge-kw-tags">
          {[
            { w: 'Ọgọ́jú',             n: 'Ọgọ́ta ìṣẹ́jú — sixty minutes' },
            { w: 'Wákàtí',             n: 'ọ̀rọ̀ àyálò — loan word for "hour"' },
            { w: 'Olójú Mẹ́rìndínlógún', n: '16-eyed · 16 pots · 16 points' },
            { w: 'Àtùpà',              n: 'traditional oil lamp stand' },
            { w: 'Ọjọ́ Mẹ́rìndínlógún', n: 'sixteen days' },
            { w: 'Ifart',              n: 'Ifa Art — sacred creative expression' },
            { w: 'Orisart',            n: 'Orisa Art — art of the Orisa tradition' },
            { w: 'Ifa Machine',        n: 'Awale Mechanics · 8 Seeds · 16 Pots · Chain Capture · Starvation Rule · The Ifa Computer' },
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

// ── Playing Mode — Awale Mechanics ───────────────────────────
function PlayingMode() {
  const [board, setBoard]               = useState(initBoard);
  const [currentPlayer, setCP]          = useState(1);
  const [captured, setCaptured]         = useState([0, 0]);
  const [gameOver, setGameOver]         = useState(false);
  const [message, setMessage]           = useState('Player 1 — choose a pit to sow');
  const [msgType, setMsgType]           = useState('p1');
  const [lastPos, setLastPos]           = useState(null);
  const [singlePlayer, setSinglePlayer] = useState(true);
  const [level, setLevel]               = useState('ope2');   // 'ope1' | 'ope2' | 'ota' | 'agbaota'
  const [aiThinking, setAiThinking]     = useState(false);
  const [chainPots, setChainPots]       = useState([]);
  const [soundOn, setSoundOn]           = useState(true);
  const [animating, setAnimating]       = useState(false);   // true while seeds are being sown step-by-step
  const [lastSown, setLastSown]         = useState(null);    // pit index that most recently received a seed
  const [timeLeft, setTimeLeft]         = useState(20);      // countdown seconds per turn
  const [gameStarted, setGameStarted]   = useState(false);   // true after first human sow
  const aiTimerRef    = useRef(null);
  const animTimerRef  = useRef([]);  // animation step timers (cleared on new game / remount)
  const turnTimerRef  = useRef(null); // setInterval for the 20s turn countdown
  const handleMoveRef = useRef(null); // always-current handleMove (avoids stale closure in timer)
  const validMovesRef = useRef([]);   // always-current validMoves


  function clearAnimTimers() {
    animTimerRef.current.forEach(clearTimeout);
    animTimerRef.current = [];
  }

  // Valid moves — frozen to [] during animation so pit highlights don't flicker
  const validMoves = (gameOver || animating) ? [] : getValidMoves(board, currentPlayer);

  // Flash captured pots then clear
  function flashChain(chain) {
    setChainPots(chain);
    setTimeout(() => setChainPots([]), 1300);
  }

  // Core: resolve one sow+capture move, return updated state or null
  function resolveMove(b0, cap0, fromIdx, player) {
    // Sow
    const { b: b1, lastIdx } = sowAyo(b0, fromIdx);

    // Capture attempt
    let b2 = b1, capSeeds = 0, chain = [], cancelled = false;
    if (ownerOf(lastIdx) !== player) {
      chain = getCapChain(b1, lastIdx, player);
      if (chain.length > 0) {
        const opp       = player === 1 ? P2_POTS : P1_POTS;
        const oppTotal  = opp.reduce((s, p) => s + b1[p], 0);
        const chainSeed = chain.reduce((s, p) => s + b1[p], 0);
        if (chainSeed >= oppTotal) {
          cancelled = true; // Grand Slam — void the capture
        } else {
          b2 = [...b1];
          chain.forEach(p => { capSeeds += b2[p]; b2[p] = 0; });
        }
      }
    }

    const newCap = [cap0[0], cap0[1]];
    newCap[player - 1] += capSeeds;

    return { b2, newCap, capSeeds, chain, cancelled, lastIdx };
  }

  // Check game-over after a move; collect remaining seeds if so
  function checkGameOver(b2, newCap, nextPlayer) {
    const nextValid = getValidMoves(b2, nextPlayer);
    if (nextValid.length === 0) {
      const p1r = P1_POTS.reduce((s, p) => s + b2[p], 0);
      const p2r = P2_POTS.reduce((s, p) => s + b2[p], 0);
      return { over: true, finalCap: [newCap[0] + p1r, newCap[1] + p2r] };
    }
    return { over: false, finalCap: newCap };
  }

  const currentLevel = LEVELS.find(l => l.id === level) || LEVELS[1];
  const oracleName   = singlePlayer ? currentLevel.oracleName : 'Player 2';

  function buildMsg(capSeeds, chain, cancelled, nextPlayer) {
    let msg = '';
    if (cancelled)      msg = '⚡ Grand Slam voided — capture cancelled (would empty all opponent pits)';
    else if (capSeeds)  msg = `✓ ${chain.length > 1 ? `Chain capture! ` : ''}Captured ${capSeeds} seed${capSeeds > 1 ? 's' : ''}`;
    const turn = nextPlayer === 1 ? 'Player 1' : oracleName;
    return msg ? `${msg} · ${turn}'s turn` : `${turn} — choose a pit to sow`;
  }

  const handleMove = useCallback((fromIdx) => {
    if (gameOver || aiThinking || animating) return;
    if (!getValidMoves(board, currentPlayer).includes(fromIdx)) return;

    // Mark game as started on first human sow
    setGameStarted(true);

    // Unlock AudioContext on this user gesture so AI sounds also work
    SoundEngine.prime();

    const seedCount = board[fromIdx];
    const steps     = getSowSteps(board, fromIdx);
    if (!steps.length) return;

    // Start animating
    setAnimating(true);
    clearAnimTimers();

    // Empty source pit immediately
    const bEmpty = [...board];
    bEmpty[fromIdx] = 0;
    setBoard(bEmpty);

    // Play sow sounds (timed to match animation steps)
    SoundEngine.sow(seedCount, steps);

    // Animate one seed per step
    const INTERVAL = 380; // ms per seed — natural hand-sowing rhythm
    const BASE     = 50;  // ms head-start — matches sound base delay

    steps.forEach(({ pit, board: stepBoard }, idx) => {
      const tid = setTimeout(() => {
        setBoard(stepBoard);
        setLastSown(pit);
      }, BASE + idx * INTERVAL);
      animTimerRef.current.push(tid);
    });

    // After all seeds sown: resolve captures and advance turn
    const lastStep = steps[steps.length - 1];
    const doneAt   = BASE + (steps.length - 1) * INTERVAL + 220;

    const tid = setTimeout(() => {
      setLastSown(null);
      setAnimating(false);

      const lastIdx    = lastStep.pit;
      const finalBoard = lastStep.board;
      const captureFunc = level === 'agbaota' ? captureFromVeteran : captureFrom;
      const { b2, capSeeds, chain, cancelled } = captureFunc(finalBoard, lastIdx, currentPlayer);

      if (chain.length > 0 && !cancelled) flashChain(chain);

      const newCap = [...captured];
      newCap[currentPlayer - 1] += capSeeds;

      const nextPlayer = currentPlayer === 1 ? 2 : 1;
      const { over, finalCap } = checkGameOver(b2, newCap, nextPlayer);

      setLastPos(fromIdx);

      if (capSeeds > 0 && !cancelled) {
        setTimeout(() => SoundEngine.capture(capSeeds), 50);
      } else if (cancelled) {
        setTimeout(() => SoundEngine.cancel(), 50);
      }

      if (over) {
        setCaptured(finalCap);
        setBoard(Array(16).fill(0));
        setGameOver(true);
        const w  = finalCap[0] > finalCap[1] ? 1 : finalCap[1] > finalCap[0] ? 2 : 0;
        const wn = w === 0 ? 'Draw!' : `${w === 1 ? 'Player 1' : oracleName} wins!`;
        setMessage(`Game Over — ${wn} (P1: ${finalCap[0]}  |  ${oracleName}: ${finalCap[1]})`);
        setMsgType('over');
        setTimeout(() => { if (w === 0) SoundEngine.draw(); else SoundEngine.win(); }, 350);
        return;
      }

      setBoard(b2);
      setCaptured(newCap);
      setCP(nextPlayer);
      setMessage(buildMsg(capSeeds, chain, cancelled, nextPlayer));
      setMsgType(cancelled ? 'cancel' : capSeeds ? 'capture' : (nextPlayer === 1 ? 'p1' : 'ai'));

      if (singlePlayer && nextPlayer === 2) {
        scheduleAi(b2, newCap, level);
      }
    }, doneAt);
    animTimerRef.current.push(tid);
  }, [board, currentPlayer, captured, gameOver, aiThinking, animating, singlePlayer, level]);
  handleMoveRef.current = handleMove; // always-current ref for turn timer

  function scheduleAi(b0, cap0, lvl) {
    setAiThinking(true);
    clearTimeout(aiTimerRef.current);
    aiTimerRef.current = setTimeout(() => {
      const pick = aiPickForLevel(b0, cap0, lvl);
      if (pick === null) { setAiThinking(false); return; }

      const seedCount = b0[pick];
      const steps     = getSowSteps(b0, pick);

      // Play Oracle's sow sounds
      SoundEngine.sow(seedCount, steps);

      // Empty Oracle's source pit immediately
      const bEmpty = [...b0];
      bEmpty[pick] = 0;
      setBoard(bEmpty);

      // Animate one seed per step
      const INTERVAL = 380; // ms per seed — natural hand-sowing rhythm
      const BASE     = 50;

      steps.forEach(({ pit, board: stepBoard }, idx) => {
        const tid = setTimeout(() => {
          setBoard(stepBoard);
          setLastSown(pit);
        }, BASE + idx * INTERVAL);
        animTimerRef.current.push(tid);
      });

      // After all seeds sown: resolve captures and return turn to Player 1
      const lastStep = steps[steps.length - 1];
      const doneAt   = BASE + (steps.length - 1) * INTERVAL + 220;

      const tid = setTimeout(() => {
        setLastSown(null);
        setAiThinking(false);

        const lastIdx    = lastStep.pit;
        const finalBoard = lastStep.board;
        const captureFunc = lvl === 'agbaota' ? captureFromVeteran : captureFrom;
        const { b2, capSeeds, chain, cancelled } = captureFunc(finalBoard, lastIdx, 2);

        if (chain.length > 0 && !cancelled) flashChain(chain);

        const newCap = [...cap0];
        newCap[1] += capSeeds;

        const { over, finalCap } = checkGameOver(b2, newCap, 1);
        setLastPos(pick);

        if (capSeeds > 0 && !cancelled) {
          setTimeout(() => SoundEngine.capture(capSeeds), 50);
        } else if (cancelled) {
          setTimeout(() => SoundEngine.cancel(), 50);
        }

        if (over) {
          setCaptured(finalCap);
          setBoard(Array(16).fill(0));
          setGameOver(true);
          const w  = finalCap[0] > finalCap[1] ? 1 : finalCap[1] > finalCap[0] ? 2 : 0;
          const wn = w === 0 ? 'Draw!' : `${w === 1 ? 'Player 1' : 'Oracle'} wins!`;
          setMessage(`Game Over — ${wn} (P1: ${finalCap[0]}  |  Oracle: ${finalCap[1]})`);
          setMsgType('over');
          setTimeout(() => { if (w === 0) SoundEngine.draw(); else SoundEngine.win(); }, 350);
          return;
        }

        setBoard(b2);
        setCaptured(newCap);
        setCP(1);
        setMessage(buildMsg(capSeeds, chain, cancelled, 1));
        setMsgType(cancelled ? 'cancel' : capSeeds ? 'capture' : 'p1');
      }, doneAt);
      animTimerRef.current.push(tid);
    }, 900);
  }

  function newGame(lvl) {
    const activeLvl = lvl !== undefined ? lvl : level;
    clearTimeout(aiTimerRef.current);
    clearAnimTimers();
    setBoard(activeLvl === 'agbaota' ? initBoardVeteran() : initBoard());
    setCP(1);
    setCaptured([0, 0]);
    setGameOver(false);
    setLastPos(null);
    setAiThinking(false);
    setAnimating(false);
    setLastSown(null);
    setChainPots([]);
    setTimeLeft(20);
    setGameStarted(false);
    setMessage('Player 1 — choose a pit to sow');
    setMsgType('p1');
  }

  useEffect(() => () => {
    clearTimeout(aiTimerRef.current);
    clearAnimTimers();
    clearInterval(turnTimerRef.current);
  }, []);

  // ── Turn countdown timer (20 s) ───────────────────────────────
  const TURN_SECS = 20;
  // Active on human turns: P1 always; P2 only in 2-player mode
  const isHumanTurn = !gameOver && !animating && !aiThinking &&
                      !(singlePlayer && currentPlayer === 2);

  // Keep refs current so the interval callback always sees the latest values
  validMovesRef.current = (gameOver || animating) ? [] : getValidMoves(board, currentPlayer);

  useEffect(() => {
    clearInterval(turnTimerRef.current);
    if (!isHumanTurn || !gameStarted) { setTimeLeft(TURN_SECS); return; }
    setTimeLeft(TURN_SECS);
    turnTimerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(turnTimerRef.current);
          // Time's up — auto-sow a random valid pit
          const moves = validMovesRef.current;
          if (moves.length > 0) {
            const pick = moves[Math.floor(Math.random() * moves.length)];
            handleMoveRef.current(pick);
          }
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(turnTimerRef.current);
  }, [currentPlayer, gameOver, animating, aiThinking, singlePlayer, gameStarted]); // eslint-disable-line

  const totalSeeds = board.reduce((a, v) => a + v, 0);

  return (
    <div className="game-landscape-wrap">
      {/* Mode toggle */}
      <div className="player-toggle">
        <span className="player-toggle-label">Mode</span>
        <div className="player-toggle-switch">
          <button className={`toggle-opt ${singlePlayer  ? 'toggle-opt--active' : ''}`}
            onClick={() => { SoundEngine.prime(); SoundEngine.modeSelect(true);  setSinglePlayer(true);  newGame(); }}>1 Player vs Oracle</button>
          <button className={`toggle-opt ${!singlePlayer ? 'toggle-opt--active' : ''}`}
            onClick={() => { SoundEngine.prime(); SoundEngine.modeSelect(false); setSinglePlayer(false); newGame(); }}>2 Players</button>
        </div>
        <button
          className={`sound-toggle ${soundOn ? 'sound-toggle--on' : 'sound-toggle--off'}`}
          onClick={() => {
            const next = !soundOn;
            setSoundOn(next);
            SoundEngine.setMuted(!next);
          }}
          title={soundOn ? 'Mute sounds' : 'Unmute sounds'}
          aria-label={soundOn ? 'Mute sounds' : 'Unmute sounds'}>
          {soundOn ? '🔊' : '🔇'}
        </button>
      </div>

      {/* Level selector — only in 1-player mode */}
      {singlePlayer && (
        <div className="level-selector">
          <span className="level-selector-label">Difficulty</span>
          <div className="level-selector-opts">
            {LEVELS.map(lv => (
              <button key={lv.id}
                className={`level-opt ${level === lv.id ? 'level-opt--active' : ''} ${lv.dormant ? 'level-opt--dormant' : ''}`}
                style={{ '--lv-color': lv.color }}
                onClick={lv.dormant ? undefined : () => { SoundEngine.prime(); SoundEngine.levelSelect(lv.id); setLevel(lv.id); newGame(lv.id); }}
                disabled={lv.dormant}
                title={lv.dormant ? `${lv.label} — Coming Soon` : `${lv.label} — ${lv.sub}`}>
                <span className="level-opt-label">{lv.label}</span>
                <span className="level-opt-sub">{lv.sub}</span>
                {lv.dormant && <span className="level-opt-soon">Soon</span>}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Message bar */}
      <div className={`message-bar message-bar--${msgType}`}>
        {aiThinking && <span className="ai-dot">◌</span>}
        {message}
        {aiThinking && <span className="ai-thinking">thinking…</span>}
      </div>

      {/* Score bar */}
      <div className="score-display">
        <div className={`score-player ${currentPlayer === 1 && !gameOver ? 'score-player--active' : ''}`}>
          <span className="score-player-name">Player 1</span>
          <span className="score-player-count score-player-count--p1">{captured[0]}</span>
          <span className="score-player-label">captured</span>
        </div>
        <div className="score-center">
          {/* Circular countdown timer */}
          {(() => {
            const R = 20, CIRC = 2 * Math.PI * R;
            const timerActive = isHumanTurn && gameStarted;
            const col = !timerActive ? 'rgba(201,162,39,0.22)'
              : timeLeft > 10 ? '#c9a227'
              : timeLeft > 5  ? '#e8772a'
              : '#e74c3c';
            const offset = timerActive ? CIRC * (1 - timeLeft / TURN_SECS) : CIRC;
            return (
              <svg width="52" height="52" viewBox="0 0 52 52" className="score-timer-svg"
                   aria-label={timerActive ? `${timeLeft} seconds remaining` : 'Timer inactive'}>
                {/* Track */}
                <circle cx="26" cy="26" r={R} fill="none"
                  stroke="rgba(255,255,255,0.08)" strokeWidth="3.5"/>
                {/* Arc */}
                <circle cx="26" cy="26" r={R} fill="none"
                  stroke={col} strokeWidth="3.5"
                  strokeDasharray={CIRC} strokeDashoffset={offset}
                  strokeLinecap="round" transform="rotate(-90 26 26)"
                  style={{transition: timeLeft === TURN_SECS ? 'none' : 'stroke-dashoffset 0.97s linear, stroke 0.35s'}}/>
                {/* Label */}
                <text x="26" y="26" textAnchor="middle" dominantBaseline="central"
                  fontSize="14" fontWeight="700" fill={col}
                  fontFamily="'Space Grotesk',system-ui,sans-serif">
                  {timerActive ? timeLeft : '◎'}
                </text>
              </svg>
            );
          })()}
          <div className="score-remaining">{totalSeeds}</div>
          <div className="score-remaining-label">in play</div>
        </div>
        <div className={`score-player ${currentPlayer === 2 && !gameOver ? 'score-player--active' : ''}`}>
          <span className="score-player-name">{oracleName}</span>
          <span className="score-player-count score-player-count--p2">{captured[1]}</span>
          <span className="score-player-label">captured</span>
        </div>
      </div>

      {/* Board */}
      <div className="mancala-wrapper">
        <div className="mancala-board mancala-board--awale">

          {/* P1 side label */}
          <div className="board-side-label board-side-label--p1">
            <span className="board-side-name">Player 1</span>
            <span className="board-side-dir">↓</span>
          </div>

          {/* P1 Pits — top row, displayed [7…0] L→R (RTL Ifa ordering) */}
          <div className="pits-row pits-row--p1">
            {P1_DISP.map(idx => (
              <PitCell key={idx} odu={ODU[idx]} count={board[idx]}
                onClick={() => handleMove(idx)}
                disabled={gameOver || aiThinking || animating}
                isLastMoved={lastPos === idx}
                currentPlayer={currentPlayer} owner={1}
                isValidMove={validMoves.includes(idx)}
                isChained={chainPots.includes(idx)}
                isReceiving={lastSown === idx}
                veteranCode={level === 'agbaota' ? ODU_CODES[idx] : null}
                pitIdx={idx}
              />
            ))}
          </div>

          {/* Center divider */}
          <div className="board-divider" />

          {/* P2 side label */}
          <div className="board-side-label board-side-label--p2">
            {oracleName.split(' · ').map((part, i) => (
              <span key={i} className="board-side-name">{part}</span>
            ))}
            <span className="board-side-dir">↑</span>
          </div>

          {/* P2 Pits — bottom row, displayed [15…8] L→R */}
          <div className="pits-row pits-row--p2">
            {P2_DISP.map(idx => (
              <PitCell key={idx} odu={ODU[idx]} count={board[idx]}
                onClick={() => handleMove(idx)}
                disabled={gameOver || aiThinking || animating || (singlePlayer && currentPlayer === 2)}
                isLastMoved={lastPos === idx}
                currentPlayer={currentPlayer} owner={2}
                isValidMove={validMoves.includes(idx)}
                isChained={chainPots.includes(idx)}
                isReceiving={lastSown === idx}
                veteranCode={level === 'agbaota' ? ODU_CODES[idx] : null}
                pitIdx={idx}
              />
            ))}
          </div>

        </div>
      </div>

      {/* New game */}
      <button className="new-game-btn" onClick={() => { SoundEngine.prime(); SoundEngine.startNewGame(); newGame(); }}>New Game</button>

      {/* Awale rules reference */}
      <div className={`awale-rules${level === 'agbaota' ? ' awale-rules--veteran' : ''}`}>
        <p className="awale-rules__title">
          {level === 'agbaota' ? '⬡ Àgbà-Ọ̀ta · Veteran Rules' : 'Game Rules'}
        </p>
        {level === 'agbaota' ? (
          <ul className="awale-rules__list">
            <li><strong>Seeds per pot</strong> set by the Odu Ifa marks — <em>each OgbeBit (|) = 2 seeds · each OyekuBit (||) = 0 seeds</em> — 64 seeds total across 16 pots</li>
            <li><strong>Sow</strong> counterclockwise; skip your starting pit on full laps</li>
            <li><strong>Capture</strong>: last seed lands in opponent pit with <strong>exactly 4 seeds only</strong> — precision is everything</li>
            <li><strong>Chain capture</strong>: extends backward through consecutive opponent pots with exactly 4 seeds</li>
            <li><strong>Grand Slam is ALLOWED</strong> — capture proceeds even if it would empty ALL opponent pots</li>
            <li><strong>Starvation rule</strong>: cannot leave opponent with 0 seeds (if avoidable); suspended when ≤6 seeds remain</li>
            <li><strong>Win</strong>: most seeds captured when a player has no legal moves (remaining seeds go to each player's own side)</li>
          </ul>
        ) : (
          <ul className="awale-rules__list">
            <li><strong>8 seeds per pot</strong> at start — displayed as 2-column × 4-row Odu Ifa pattern</li>
            <li><strong>Sow</strong> counterclockwise; skip your starting pit on full laps</li>
            <li><strong>Capture</strong>: last seed lands in opponent pit with exactly <strong>2 or 3</strong> seeds</li>
            <li><strong>Chain capture</strong>: extends backward through consecutive opponent pots with 2–3 seeds</li>
            <li><strong>Grand Slam voided</strong>: if capture would empty ALL opponent pots, the entire capture is cancelled</li>
            <li><strong>Starvation rule</strong>: cannot leave opponent with 0 seeds (if avoidable); suspended when ≤6 seeds remain</li>
            <li><strong>Win</strong>: most seeds captured when a player has no legal moves (remaining seeds distributed to each player's own side)</li>
          </ul>
        )}
      </div>
      <ChallengeSection />
    </div>
  );
}

// ── Matrix Node ───────────────────────────────────────────────
function MatrixNode({ node, isPrimary, oduColor, animDelay }) {
  return (
    <div className={`ifa-matrix-node${isPrimary ? ' ifa-matrix-node--primary' : ''}`}
      style={{
        ...(isPrimary ? { '--node-color': oduColor } : {}),
        animationDelay: `${animDelay}ms`,
      }}>
      <span className="ifa-matrix-letter">{node.letter}</span>
      <span className="ifa-matrix-node-name">{node.name}</span>
    </div>
  );
}

// Delay map: center=0ms, adjacent (top/left/right/bottom)=125ms, corners=250ms
const MATRIX_ANIM_DELAYS = [250, 125, 250, 125, 0, 125, 250, 125, 250];

// ── Matrix Spokes SVG ─────────────────────────────────────────
// Parametric: works for any cellSize/gap combination.
// Renders 8 lines from the center node to each surrounding node center.
function MatrixSpokes({ oduColor, cellSize = 86, gap = 8 }) {
  const stride = cellSize + gap;
  const half   = cellSize / 2;
  const total  = 3 * cellSize + 2 * gap;
  const cx     = half + stride;   // center of middle column
  const cy     = half + stride;   // center of middle row
  const pts = [
    [half,             half            ],  // TL
    [cx,               half            ],  // TM
    [half + 2 * stride, half           ],  // TR
    [half,             cy              ],  // ML
    [half + 2 * stride, cy             ],  // MR
    [half,             half + 2*stride ],  // BL
    [cx,               half + 2*stride ],  // BM
    [half + 2 * stride, half + 2*stride],  // BR
  ];
  return (
    <svg className="ifa-matrix-spokes" viewBox={`0 0 ${total} ${total}`}
      style={{ '--spoke-color': oduColor }}
      xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {pts.map(([x, y], i) => (
        <line key={i} x1={cx} y1={cy} x2={x} y2={y} className="ifa-spoke" />
      ))}
    </svg>
  );
}

function IFAMatrix({ odu, nodes, acronym, subtitle, matrixNum, checkPrimary, isOyeku }) {
  return (
    <div className="ifa-matrix-section">
      <div className="ifa-matrix-header">
        <span className="ifa-matrix-label">Ifa Matrix {matrixNum}</span>
        <div>
          <h3 className="ifa-matrix-title">0 + 8D {acronym} Matrix</h3>
          <p className="ifa-matrix-subtitle">{subtitle}</p>
        </div>
      </div>
      <div className="ifa-matrix-grid-wrap">
        <MatrixSpokes oduColor={odu.color} />
        <div className="ifa-matrix-grid">
          {MATRIX_GRID.map((nodeIdx, i) =>
            nodeIdx === null ? (
              <div key="center" className="ifa-matrix-center"
                style={{ '--odu-color': odu.color, animationDelay: '0ms' }}>
                {isOyeku ? <OyekuPitArrow /> : <PitArrow />}
                <OduStrokePattern code={ODU_CODES[odu.num - 1]} color={odu.color} />
                <span className="ifa-matrix-center-name" style={{ color: odu.color }}>{odu.name}</span>
              </div>
            ) : (
              <MatrixNode key={i} node={nodes[nodeIdx]}
                isPrimary={checkPrimary(nodes[nodeIdx])} oduColor={odu.color}
                animDelay={MATRIX_ANIM_DELAYS[i]} />
            )
          )}
        </div>
      </div>
    </div>
  );
}

// ── Pit Hover Matrix (Learning Mode — fixed tooltip, circular) ──
// cellSize=54, gap=7 → grid total = 3×54 + 2×7 = 176px (fits inside 196px tooltip)
function PitHoverMatrix({ odu, pos }) {
  const isOyeku = (odu.num - 1) % 2 === 1;
  return (
    <div className="pit-hover-matrix"
      style={{ '--odu-color': odu.color, top: pos.y, left: pos.x }}>
      <div className="pit-hover-matrix-head">
        <span className="pit-hover-matrix-badge">Ifa Matrix I</span>
        <span className="pit-hover-matrix-title">0 + 8D STEAMSEX</span>
      </div>
      <div className="pit-hover-grid-wrap">
        <MatrixSpokes oduColor={odu.color} cellSize={54} gap={7} />
        <div className="pit-hover-matrix-grid">
          {MATRIX_GRID.map((nodeIdx, i) =>
            nodeIdx === null ? (
              <div key="center" className="pit-hover-center"
                style={{ '--odu-color': odu.color }}>
                {isOyeku ? <OyekuPitArrow /> : <PitArrow />}
                <OduStrokePattern code={ODU_CODES[odu.num - 1]} color={odu.color} />
                <span className="pit-hover-center-name" style={{ color: odu.color }}>{odu.name}</span>
              </div>
            ) : (
              <div key={i}
                className={`pit-hover-node${STEAMSEX_NODES[nodeIdx].steamKey === odu.steam ? ' pit-hover-node--primary' : ''}`}
                style={STEAMSEX_NODES[nodeIdx].steamKey === odu.steam ? { '--node-color': odu.color } : {}}>
                <span className="pit-hover-node-letter">{STEAMSEX_NODES[nodeIdx].letter}</span>
                <span className="pit-hover-node-name">{STEAMSEX_NODES[nodeIdx].name}</span>
              </div>
            )
          )}
        </div>
      </div>
      <div className="pit-hover-sub">Science · Tech · Engineering · Arts · Mathematics · Social · Education · Others</div>
    </div>
  );
}

// ── Odu Detail Panel ──────────────────────────────────────────
function OduDetailPanel({ odu, onClose }) {
  if (!odu) return null;
  const isOyeku = (odu.num - 1) % 2 === 1;
  return (
    <div className="odu-detail-backdrop" onClick={onClose}>
      <div className="odu-detail-panel" style={{ '--panel-color': odu.color }}
        onClick={e => e.stopPropagation()}>
        <button className="odu-detail-close" onClick={onClose} aria-label="Close">×</button>
        <div className="odu-detail-header">
          <div className="odu-detail-ifazero"><IfaZero size={60} showText={false} /></div>
          <div className="odu-detail-title-block">
            <p className="odu-detail-num">Odu #{odu.num} of 16</p>
            <h2 className="odu-detail-name" style={{ color: odu.color }}>{odu.name}</h2>
            <p className="odu-detail-meji">{odu.meji}</p>
          </div>
        </div>
        <p className="odu-detail-tagline">{odu.tagline}</p>
        <IFAMatrix odu={odu} nodes={STEAMSEX_NODES} acronym="STEAMSEX"
          subtitle="Science · Technology · Engineering · Arts & Design · Mathematics · Social Sciences · Education · Others"
          matrixNum="I" checkPrimary={n => n.steamKey === odu.steam} isOyeku={isOyeku} />
        <IFAMatrix odu={odu} nodes={SIDECHRX_NODES} acronym="SIDECHRX"
          subtitle="Symmetry · Invariance · Duality · Emergence · Composition · Holism · Reductionism · Others"
          matrixNum="II" checkPrimary={n => n.full === odu.sidechrx} isOyeku={isOyeku} />
        <p className="odu-combos-note">
          This Odu combines with all 16 to generate{' '}
          <strong>16 meta-models</strong>. The full board generates{' '}
          <strong>256 Odu combinations</strong>.
        </p>
      </div>
    </div>
  );
}

// ── Learning Mode ─────────────────────────────────────────────
function LearningMode() {
  const [selectedOdu, setSelectedOdu] = useState(null);
  const [hoveredOdu,  setHoveredOdu]  = useState(null);
  const [hoverPos,    setHoverPos]    = useState({ x: 0, y: 0 });
  const p2Visual = P2_DISP.map(i => ODU[i]);
  const p1Row    = P1_DISP.map(i => ODU[i]);

  const OduPit = ({ odu }) => {
    const oduIdx = odu.num - 1;
    const isOyeku = oduIdx % 2 === 1;
    return (
      <div className={`odu-pit ${selectedOdu && selectedOdu.id === odu.id ? 'odu-pit--selected' : ''}`}
        style={{ '--odu-color': odu.color }}
        onClick={() => setSelectedOdu(odu)} role="button" tabIndex={0}
        aria-label={`${odu.name} — ${odu.field}`}
        onKeyDown={e => e.key === 'Enter' && setSelectedOdu(odu)}
        onMouseEnter={e => {
          const r = e.currentTarget.getBoundingClientRect();
          setHoveredOdu(odu);
          setHoverPos({ x: r.left + r.width / 2, y: r.top });
        }}
        onMouseLeave={() => setHoveredOdu(null)}>
        <div className="odu-hole">
          {isOyeku ? <OyekuPitArrow /> : <PitArrow />}
          <OduStrokePattern code={ODU_CODES[oduIdx]} color={odu.color} />
        </div>
        <span className="odu-hole-name">{odu.name} Meji</span>
      </div>
    );
  };

  return (
    <div>
      <div className="learning-header">
        <p style={{ color:'var(--text-secondary)', fontSize:'14px', marginBottom:'8px' }}>
          Click any Odu hole to explore its knowledge domain and meta-model space.
        </p>
        <span className="learning-stat">
          Meta-Model Space: 16 × 16 = <strong style={{ color:'var(--gold)', marginLeft:'4px' }}>256 Odu Combinations</strong>
        </span>
      </div>
      <div className="odu-board">
        <div className="odu-board-grid">
          <div className="odu-row-label" style={{ color:'rgba(201,162,39,0.6)' }}>Odu 8 → 1 · Player 1 Side · (read right → left: 1 → 8)</div>
          <div className="odu-row">{p1Row.map(o => <OduPit key={o.id} odu={o} />)}</div>
          <div className="odu-row">{p2Visual.map(o => <OduPit key={o.id} odu={o} />)}</div>
          <div className="odu-row-label" style={{ color:'rgba(232,119,42,0.6)' }}>Odu 16 → 9 · Player 2 Side · (read right → left: 9 → 16)</div>
        </div>
      </div>
      <div className="odu-grid-summary">
        {ODU.map(odu => (
          <div key={odu.id} onClick={() => setSelectedOdu(odu)} style={{
            background:'var(--bg-card)', borderRadius:'10px', padding:'12px 14px',
            cursor:'pointer', transition:'var(--transition)',
            border:`1px solid ${selectedOdu && selectedOdu.id === odu.id ? odu.color : 'rgba(255,255,255,0.07)'}`,
            borderLeft:`3px solid ${odu.color}`,
          }}>
            <div style={{ display:'flex', alignItems:'baseline', gap:'8px', marginBottom:'4px' }}>
              <span style={{ fontFamily:'var(--font-mono)', fontSize:'10px', color:'var(--text-muted)', letterSpacing:'0.1em' }}>#{odu.num}</span>
              <span style={{ fontFamily:'var(--font-title)', fontSize:'14px', fontWeight:700, color:odu.color }}>{odu.name}</span>
            </div>
            <p style={{ fontFamily:'var(--font-mono)', fontSize:'10px', color:'var(--text-muted)', letterSpacing:'0.06em' }}>{odu.field}</p>
          </div>
        ))}
      </div>
      {selectedOdu && <OduDetailPanel odu={selectedOdu} onClose={() => setSelectedOdu(null)} />}
      {hoveredOdu && !selectedOdu && <PitHoverMatrix odu={hoveredOdu} pos={hoverPos} />}
    </div>
  );
}

// ── App Root ──────────────────────────────────────────────────
// ── Cover Board — Veteran-style intro overlay ─────────────────
// Static, non-interactive. Sits above everything. Click to dismiss.
function CoverPitCell({ idx }) {
  const odu = ODU[idx];
  const isOyeku = idx % 2 === 1;
  return (
    <div className="cover-pit" style={{ '--odu-color': odu.color, '--cover-delay': `${idx * 52}ms` }}>
      <div className="cover-pit-hole">
        {isOyeku ? <OyekuPitArrow /> : <PitArrow />}
        <OduMarkPattern code={ODU_CODES[idx]} color={odu.color} />
      </div>
      <span className="cover-pit-name">{odu.meji}</span>
    </div>
  );
}

function CoverBoard({ onDismiss }) {
  const [dismissing, setDismissing] = React.useState(false);
  const isTouch = typeof window !== 'undefined' &&
    ('ontouchstart' in window || navigator.maxTouchPoints > 0);

  const handleClick = () => {
    if (dismissing) return;
    setDismissing(true);
    // wait for last pit (idx 15) to finish: 15*52ms delay + 520ms anim = ~1300ms
    // then bg fades 400ms → total 1500ms safe margin
    setTimeout(onDismiss, 1500);
  };

  return (
    <div
      className={`cover-overlay${dismissing ? ' cover-overlay--dismissing' : ''}`}
      onClick={handleClick}
      role="button"
      aria-label={isTouch ? 'Tap to begin playing' : 'Click to begin playing'}
    >
      <div className="cover-header">
        <p className="cover-eyebrow">Play IFA Games · CENProject</p>
        <h1 className="cover-title">Ayò Ọlọ́pọ́nfá</h1>
        <p className="cover-subtitle">Olójú Mẹ́rìndínlógún · The 16-Pot Ifa Game</p>
      </div>

      <div className="cover-board">
        {/* P1 row — top, displayed [7…0] L→R (Odu 1–8: Ogbe → Okanran) */}
        <div className="cover-row">
          {P1_DISP.map(idx => <CoverPitCell key={idx} idx={idx} />)}
        </div>
        <div className="cover-divider" />
        {/* P2 row — bottom, displayed [15…8] L→R (Odu 9–16: Ogunda → Ofun) */}
        <div className="cover-row">
          {P2_DISP.map(idx => <CoverPitCell key={idx} idx={idx} />)}
        </div>
      </div>

      <p className="cover-hint">· {isTouch ? 'tap' : 'click'} anywhere to begin ·</p>
    </div>
  );
}

/* ── Erélayé: The IfaGame of Life ──────────────────────────────────────────── */
const ERELAYE_COLS = 16, ERELAYE_ROWS = 16;

function erelayeNextGen(grid) {
  const R = grid.length, C = grid[0].length;
  return grid.map((row, r) => row.map((alive, c) => {
    let n = 0;
    for (let dr = -1; dr <= 1; dr++) for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue;
      if (grid[(r + dr + R) % R][(c + dc + C) % C]) n++;
    }
    return n === 3 || (alive && n === 2);
  }));
}

function erelayeSeed() {
  const g = Array.from({ length: ERELAYE_ROWS }, () => Array(ERELAYE_COLS).fill(false));
  const s = (r, c) => { if (r >= 0 && r < ERELAYE_ROWS && c >= 0 && c < ERELAYE_COLS) g[r][c] = true; };
  // R-pentomino (long chaotic evolution) — center
  [[0,1],[0,2],[1,0],[1,1],[2,1]].forEach(([dr,dc]) => s(6+dr, 6+dc));
  // Glider — top-left
  [[0,1],[1,2],[2,0],[2,1],[2,2]].forEach(([dr,dc]) => s(1+dr, 1+dc));
  // Glider — top-right (mirrored)
  [[0,2],[1,0],[1,2],[2,1],[2,2]].forEach(([dr,dc]) => s(1+dr, 11+dc));
  // Beacon oscillator — bottom-left
  [[0,0],[0,1],[1,0],[2,3],[3,2],[3,3]].forEach(([dr,dc]) => s(11+dr, 3+dc));
  // Blinker — bottom-right
  [[0,0],[0,1],[0,2]].forEach(([dr,dc]) => s(13+dr, 12+dc));
  // Block (stable) — scattered
  [[0,0],[0,1],[1,0],[1,1]].forEach(([dr,dc]) => s(2+dr, 12+dc));
  [[0,0],[0,1],[1,0],[1,1]].forEach(([dr,dc]) => s(12+dr, 10+dc));
  // Lightweight spaceship
  [[0,1],[0,4],[1,0],[2,0],[2,4],[3,0],[3,1],[3,2],[3,3]].forEach(([dr,dc]) => s(4+dr, 6+dc));
  return g;
}

const ERELAYE_TAGS = [
  "Ifa's Game of Life", "Orunmila", "Odu-Based Game of Life",
  "Conway's Game of Life", "Ifa Modelling", "Ifa Analysis",
  "Ifa Mechanics", "Energy-Based Ifa/Orisa Methods", "Ifa Computer",
  "Ayò Ọlọ́pọ́nfá", "Odu Ifa", "IFABOK", "The IFA Internet",
  "Ifa Simulation", "IfaSimulation",
];

function ErelayeGrid() {
  const [cells, setCells] = useState(erelayeSeed);
  const [gen, setGen]     = useState(0);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => {
      setCells(prev => erelayeNextGen(prev));
      setGen(g => g + 1);
    }, 550);
    return () => clearInterval(t);
  }, [running]);

  const CELL = 20;
  const W = ERELAYE_COLS * CELL, H = ERELAYE_ROWS * CELL;

  return (
    <div className="erelaye-grid-wrap">
      <div className="erelaye-grid-bar">
        <span className="erelaye-gen">GEN <strong>{gen.toString().padStart(4,'0')}</strong></span>
        <span className="erelaye-grid-title">Erélayé · Odu Cellular Field</span>
        <div className="erelaye-grid-controls">
          <button className="erelaye-ctrl" onClick={() => { setCells(erelayeSeed()); setGen(0); setRunning(true); }}>↺ Reset</button>
          <button className="erelaye-ctrl" onClick={() => setRunning(r => !r)}>{running ? '⏸' : '▶'}</button>
        </div>
      </div>
      <div className="erelaye-svg-wrap">
        <svg className="erelaye-svg" viewBox={`0 0 ${W} ${H}`} width="100%" preserveAspectRatio="xMidYMid meet">
          <defs>
            <radialGradient id="eg-alive" cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor="#f0c840" stopOpacity="1" />
              <stop offset="100%" stopColor="#c9a227" stopOpacity="0.7" />
            </radialGradient>
            <radialGradient id="eg-dim" cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor="#1a1535" stopOpacity="1" />
              <stop offset="100%" stopColor="#0f0c1e" stopOpacity="1" />
            </radialGradient>
            <filter id="eg-glow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>
          <rect width={W} height={H} fill="#080615" />
          {Array.from({length: ERELAYE_ROWS+1}, (_,i) =>
            <line key={`h${i}`} x1={0} y1={i*CELL} x2={W} y2={i*CELL} stroke="rgba(201,162,39,0.07)" strokeWidth="0.5"/>
          )}
          {Array.from({length: ERELAYE_COLS+1}, (_,i) =>
            <line key={`v${i}`} x1={i*CELL} y1={0} x2={i*CELL} y2={H} stroke="rgba(201,162,39,0.07)" strokeWidth="0.5"/>
          )}
          {cells.map((row,r) => row.map((alive,c) => !alive ? (
            <rect key={`d${r}-${c}`} x={c*CELL+1} y={r*CELL+1} width={CELL-2} height={CELL-2} rx="2" fill="url(#eg-dim)" />
          ) : null))}
          {cells.map((row,r) => row.map((alive,c) => alive ? (
            <g key={`a${r}-${c}`} filter="url(#eg-glow)">
              <rect x={c*CELL+2} y={r*CELL+2} width={CELL-4} height={CELL-4} rx="3" fill="url(#eg-alive)" />
              <circle cx={c*CELL+CELL/2} cy={r*CELL+CELL/2} r="2.5" fill="#fff8e0" opacity="0.75"/>
            </g>
          ) : null))}
        </svg>
        <div className="erelaye-svg-scanline" aria-hidden="true"/>
      </div>
    </div>
  );
}

function BuildingMode() {
  return (
    <div className="erelaye">
      <div className="erelaye-dev-badge">
        <span className="erelaye-dev-pulse" />
        <span className="erelaye-dev-text">Development In Progress</span>
      </div>
      <div className="erelaye-header">
        <p className="erelaye-eyebrow">⬡ Building Mode · Ifa Cellular Automaton · Odu-Field Simulation</p>
        <h1 className="erelaye-title">Erélayé</h1>
        <p className="erelaye-subtitle">The IfaGame of Life</p>
        <div className="erelaye-divider">
          {[...Array(16)].map((_,i) => <span key={i} className="erelaye-divider-tick"/>)}
        </div>
        <div className="erelaye-dual-block">
          <span className="erelaye-dual-label">Its Dual ·</span>
          <span className="erelaye-dual-name">Erékọ́layé</span>
          <span className="erelaye-dual-desc">The Ifa Non-Game of Life</span>
        </div>
      </div>
      <ErelayeGrid />
      <div className="erelaye-concept">
        <div className="erelaye-concept-inner">
          <p className="erelaye-concept-title">◈ Concept</p>
          <p className="erelaye-concept-body">
            Erélayé is an <strong>Odu-Based Cellular Automaton</strong> — Ifa's Parallel to Conway's Game of Life.
            Each Cell on the 16 × 16 IfaField encodes an Odu Energy State based on the <strong>256 Odù Ifá</strong> and 16 Odu Orisa.
            Alive cells pulse with Ifa Energy; each Generation evolves by the <strong>16 Ojú Odù Ifá</strong> —
            the Laws of Ifa governing all fields. Life, death, emergence, stasis, and others arise from the
            Interaction of Ògbè's Symmetry, Ọ̀yẹ̀kú's Invariance, Ìwòrì's Duality, and the Full
            Spectrum of 256 Ifa Energy Vibrations/Patterns. <em>Erélayé</em> models the emergence of consciousness,
            all knowledge, and reality from pure Ifa Mechanics.
          </p>
          <p className="erelaye-concept-body" style={{marginTop:'0.8rem'}}>
            Its dual, <strong>Erékọ́layé</strong>, models the non-game — serious approach, the field of potentiality before
            manifestation, governed by the anti-Laws of Ifa: Ọ̀sá's Anti-Symmetry through Òfún's
            Anti-Simulation. Together they form the Complete <strong>IFABOK Simulation Engine</strong>.
          </p>
        </div>
      </div>
      <div className="erelaye-tags-wrap">
        <p className="erelaye-tags-label">// tags</p>
        <div className="erelaye-tags">
          {ERELAYE_TAGS.map(tag => <span key={tag} className="erelaye-tag">{tag}</span>)}
        </div>
      </div>
      <div className="erelaye-hex-row" aria-hidden="true">
        {[...Array(16)].map((_,i) => (
          <div key={i} className="erelaye-hex" style={{animationDelay:`${i*0.12}s`}}>
            <span className="erelaye-hex-num">{(i+1).toString().padStart(2,'0')}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Ìtànlayé: Ifa Stories & Ifa Plays ────────────────────────────────────── */
const ITANLAYE_TAGS = [
  "Ifa's Game of Life", "Orunmila", "IfaPlays", "OrisaPlays",
  "Odu-Based Arts", "Ifa/Orisa Filmmaking", "Ifa Theater Arts", "Orisa Theater Arts",
  "IfaStory", "OrisaStory", "Ifa Modelling", "Ifa Analysis",
  "Ifa Mechanics", "Energy-Based Ifa/Orisa Methods", "Ifa Computer",
  "Ayò Ọlọ́pọ́nfá", "Odu Ifa", "IFABOK", "The IFA Internet",
];

function StoryMode() {
  return (
    <div className="itanlaye">
      {/* Dev badge */}
      <div className="itanlaye-dev-badge">
        <span className="itanlaye-dev-pulse" />
        <span className="itanlaye-dev-text">Development In Progress</span>
      </div>

      {/* Film strip top */}
      <div className="itanlaye-filmstrip" aria-hidden="true">
        {[...Array(24)].map((_,i) => <span key={i} className="itanlaye-sprocket"/>)}
      </div>

      {/* Header */}
      <div className="itanlaye-header">
        <p className="itanlaye-eyebrow">✦ Story Mode · Ifa Narrative Arts · Odu-Based Theater &amp; Film</p>
        <div className="itanlaye-marquee-frame" aria-hidden="true">
          {[...Array(14)].map((_,i) => <span key={i} className="itanlaye-marquee-bulb" style={{animationDelay:`${i*0.15}s`}}/>)}
        </div>
        <h1 className="itanlaye-title">Ìtànlayé</h1>
        <p className="itanlaye-subtitle">Ifa Stories &amp; Ifa Plays</p>
        <div className="itanlaye-divider">
          {[...Array(16)].map((_,i) => <span key={i} className="itanlaye-divider-tick"/>)}
        </div>
        <div className="itanlaye-dual-block">
          <span className="itanlaye-dual-label">Its Dual ·</span>
          <span className="itanlaye-dual-name">Ìtànkọ́layé</span>
          <span className="itanlaye-dual-desc">The Ifa Non-Story/Play Platform — Orisa Stories &amp; Orisa Plays</span>
        </div>
        <div className="itanlaye-marquee-frame" aria-hidden="true">
          {[...Array(14)].map((_,i) => <span key={i} className="itanlaye-marquee-bulb" style={{animationDelay:`${(i*0.15)+0.08}s`}}/>)}
        </div>
      </div>

      {/* Stage visual */}
      <div className="itanlaye-stage" aria-hidden="true">
        <div className="itanlaye-curtain itanlaye-curtain--left"/>
        <div className="itanlaye-curtain itanlaye-curtain--right"/>
        <div className="itanlaye-spotlight itanlaye-spotlight--1"/>
        <div className="itanlaye-spotlight itanlaye-spotlight--2"/>
        <div className="itanlaye-spotlight itanlaye-spotlight--3"/>
        <div className="itanlaye-stage-floor"/>
        <p className="itanlaye-stage-text">◈ Coming Soon</p>
      </div>

      {/* Concept */}
      <div className="itanlaye-concept">
        <div className="itanlaye-concept-inner">
          <p className="itanlaye-concept-title">◈ Concept</p>
          <p className="itanlaye-concept-body">
            Ìtànlayé is an <strong>Odu-Based Narrative Platform</strong> — the Ifa Machine for theater, cinema, and storytelling.
            Every Story and Play on Ìtànlayé is generated from and governed by <strong>Odu Ifá</strong> — the 256 Cosmic Archetypes
            that encode all human experience, drama, wisdom, and transformation. Characters, plots, and conflicts emerge
            from the <strong>16 Ojú Odù Ifá</strong>, the Fundamental Laws governing all narrative fields:
            rise and fall, love and loss, creation and destruction, wisdom and folly.
          </p>
          <p className="itanlaye-concept-body" style={{marginTop:'0.8rem'}}>
            Its dual, <strong>Ìtànkọ́layé</strong>, is the non-story platform — the Space of Orisa Energy and Potentiality before it
            manifests as narrative. Orisa Stories and Orisa Plays arise from the anti-Laws of Ifa,
            modeling the field of potentiality behind all drama. Together they form the Complete
            <strong> IFABOK Narrative Engine</strong>.
          </p>
        </div>
      </div>

      {/* Tags */}
      <div className="itanlaye-tags-wrap">
        <p className="itanlaye-tags-label">// tags</p>
        <div className="itanlaye-tags">
          {ITANLAYE_TAGS.map(tag => <span key={tag} className="itanlaye-tag">{tag}</span>)}
        </div>
      </div>

      {/* Hex row */}
      <div className="itanlaye-hex-row" aria-hidden="true">
        {[...Array(16)].map((_,i) => (
          <div key={i} className="itanlaye-hex" style={{animationDelay:`${i*0.12}s`}}>
            <span className="itanlaye-hex-num">{(i+1).toString().padStart(2,'0')}</span>
          </div>
        ))}
      </div>

      {/* Film strip bottom */}
      <div className="itanlaye-filmstrip" aria-hidden="true">
        {[...Array(24)].map((_,i) => <span key={i} className="itanlaye-sprocket"/>)}
      </div>
    </div>
  );
}

function App() {
  const [mode, setMode] = useState('play');
  const [showCover, setShowCover] = useState(true);

  return (
    <>
      {/* Intro cover — Veteran board as splash screen */}
      {showCover && <CoverBoard onDismiss={() => setShowCover(false)} />}

      {/* Ticker */}
      <div className="announce-bar" aria-hidden="true">
        <div className="announce-track">
          {['Ayò Ọlọ́pọ́nfá Olójú Mẹ́rìndínlógún','Awale Mechanics Build','8 Seeds · 16 Pots','Chain Capture','Grand Slam Cancel','Starvation Rule','The Ifa Computer','ComputoE','240 Combinations','Play IFA Games','CENProject','Ajemiposi Africa'].flatMap((t,i) => [
            <span key={`a${i}`} className={i === 0 ? 'yoruba' : undefined}>{t}</span>, <span key={`s${i}`} className="sep">·</span>
          ])}
          {['Ayò Ọlọ́pọ́nfá Olójú Mẹ́rìndínlógún','Awale Mechanics Build','8 Seeds · 16 Pots','Chain Capture','Grand Slam Cancel','Starvation Rule','The Ifa Computer','ComputoE','240 Combinations','Play IFA Games','CENProject','Ajemiposi Africa'].flatMap((t,i) => [
            <span key={`b${i}`} className={i === 0 ? 'yoruba' : undefined}>{t}</span>, <span key={`r${i}`} className="sep">·</span>
          ])}
        </div>
      </div>

      {/* Header */}
      <header className="site-header">
        <div className="header-left">
          <a href="../index.html" className="back-link">← Play IFA Games</a>
          <span className="header-logo">Ayò Ọlọ́pọ́nfá <span>· Olójú Mẹ́rìndínlógún</span></span>
        </div>
        <nav className="header-nav">
          <a href="https://ifainternet.org/ifa-computing/" className="nav-badge nav-badge--link" target="_blank" rel="noopener noreferrer">The Ifa Computer</a>
          <a href="https://cenproject.org/" className="nav-badge nav-badge--link" target="_blank" rel="noopener noreferrer">CENProject</a>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-bg" aria-hidden="true" />
          <div className="hero-content">
            <div className="ifazero-hero-wrap">
              <div className="ifazero-container">
                <IfaZero size={110} showText={true} />
                <span className="ifazero-label">IfaZero · Ogbe Energy</span>
              </div>
            </div>
            <p className="hero-eyebrow">Play IFA Games · CENProject</p>
            <h1 className="hero-title" id="hero-title">Ayò Ọlọ́pọ́nfá</h1>
            <p className="hero-subtitle">Olójú Mẹ́rìndínlógún — The 16-Pot Ifa Game</p>
            <p className="hero-tagline">
              According to Ifa, Ayò is a Native of Alẹ̀ Ufẹ̀. Ayò Ọlọ́pọ́nfá is a Yoruba mancala built
              using the Logic of Ifa/Orisa — a gaming environment and a machine for developing
              meta-models across all fields of knowledge.
            </p>
            <div className="hero-badges">
              <span className="hero-badge hero-badge--gold">Awale Mechanics</span>
              <span className="hero-badge">8 Seeds · 16 Pots</span>
              <span className="hero-badge">Chain Capture</span>
              <span className="hero-badge">Starvation Rule</span>
              <span className="hero-badge">The Ifa Computer</span>
            </div>
          </div>
        </section>

        <div className="section-divider" style={{ margin:'0 auto 64px' }} aria-hidden="true" />
        <IfaComputerSection />
        <div className="section-divider" style={{ margin:'0 auto 48px' }} aria-hidden="true" />

        {/* Mode selector */}
        <div className="mode-selector">
          <p className="mode-label">Select Mode</p>
          <div className="mode-buttons" role="tablist">
            <button className={`mode-btn ${mode === 'play'  ? 'mode-btn--active-play'  : ''}`}
              onClick={() => setMode('play')}  role="tab" aria-selected={mode === 'play'}>♟ Playing Mode</button>
            <button className={`mode-btn ${mode === 'learn' ? 'mode-btn--active-learn' : ''}`}
              onClick={() => setMode('learn')} role="tab" aria-selected={mode === 'learn'}>◈ Learning Mode</button>
            <button className={`mode-btn ${mode === 'build' ? 'mode-btn--active-build' : ''}`}
              onClick={() => setMode('build')} role="tab" aria-selected={mode === 'build'}>
              ⬡ Building Mode <span className="mode-btn__dev-tag">Erélayé</span>
            </button>
            <button className={`mode-btn ${mode === 'story' ? 'mode-btn--active-story' : ''}`}
              onClick={() => setMode('story')} role="tab" aria-selected={mode === 'story'}>
              ✦ Story Mode <span className="mode-btn__dev-tag">Ìtànlayé</span>
            </button>
          </div>
        </div>

        {/* Game / Learning area */}
        <div className="game-area">
          {mode === 'play' ? (
            <>
              <div className="section-header" style={{ marginBottom:'28px' }}>
                <p className="section-eyebrow">Playing Mode · Awale Mechanics</p>
                <h2 className="section-title">Ayòfá: Ifa Mancala of the 16 Pots</h2>
                <p className="section-desc">
                  8 seeds per Odu Pit, displayed as the Odu Ifa 2-Column Mark Pattern in the IfaMancala.
                  Capture with Awale rules based on IfaLogic: chain capture, grand slam cancel, starvation rule.
                </p>
              </div>
              <PlayingMode />
            </>
          ) : mode === 'build' ? (
            <BuildingMode />
          ) : mode === 'story' ? (
            <StoryMode />
          ) : (
            <>
              <div className="section-header" style={{ marginBottom:'28px' }}>
                <p className="section-eyebrow">Learning Mode</p>
                <h2 className="section-title">The 16 Odu Knowledge Map</h2>
                <p className="section-desc">
                  Explore each of the 16 principal Odu — their fields of knowledge,
                  STEAM categories, and meta-model spaces.
                </p>
              </div>
              <LearningMode />
            </>
          )}
        </div>
      </main>

      {/* Credits */}
      <section className="credits-section" aria-labelledby="credits-title">
        <div className="credits-inner">
          <p className="credits-eyebrow">The Team</p>
          <h2 className="credits-title" id="credits-title">Built by</h2>
          <div className="credits-grid">
            <div className="credits-card">
              <span className="credits-mark" aria-hidden="true">✦</span>
              <p className="credits-name">Olorunosenkanti Abiodun Adedeji</p>
            </div>
            <div className="credits-card">
              <span className="credits-mark" aria-hidden="true">✦</span>
              <p className="credits-name">Agboola Kolawole Tijani Quadri</p>
            </div>
            <div className="credits-card">
              <span className="credits-mark" aria-hidden="true">✦</span>
              <p className="credits-name">Babalawo Ajetumobi Obakolawole Esubiyi</p>
            </div>
            <div className="credits-card">
              <span className="credits-mark" aria-hidden="true">✦</span>
              <p className="credits-name">Taiwo Oyenike</p>
            </div>
            <div className="credits-card">
              <span className="credits-mark" aria-hidden="true">✦</span>
              <p className="credits-name">Kehinde Oyenike</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <p className="footer-logo">Ayò Ọlọ́pọ́nfá · Play IFA Games</p>
        <p className="footer-text">Part of the IFA Internet · CENProject · Isese Technology</p>
        <p className="footer-note">Ayò Ọlọ́pọ́nfá is also known as Ayò Oníkáà Mérìndínlógún (the 16-Compartment Ayo Game)</p>
        <nav className="footer-links">
          <a href="../index.html"       className="footer-link">Play IFA Games</a>
          <a href="https://ifainternet.org/#" className="footer-link">IFA Internet</a>
          <a href="https://cenproject.org/" className="footer-link" target="_blank" rel="noopener noreferrer">CENProject</a>
        </nav>
      </footer>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
