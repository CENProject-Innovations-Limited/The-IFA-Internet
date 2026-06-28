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

// Small Odu circle for the art grid
function OduMiniCircle({ odu }) {
  const code  = ODU_CODES[odu.num - 1];
  const isOdd = (odu.num - 1) % 2 === 1;
  return (
    <div className="odu-mini-circ" style={{ '--mc': odu.color }}>
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
      <span className="odu-mini-label">{odu.name}</span>
    </div>
  );
}

function ChallengeSection() {
  const [accepted, setAccepted] = useState(false);
  const [rippling, setRippling] = useState(false);
  const [litLamps, setLitLamps] = useState(new Set());
  const [switchOn, setSwitchOn] = useState(false);
  const [isIlluminating, setIsIlluminating] = useState(false);

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

        {/* Right — Odu circles */}
        <div className="challenge-art-panel">
          <p className="challenge-art-caption">Ayò Ọlọ́pọ́nfá Olójú Mẹ́rìndínlógún</p>
          <p className="challenge-art-sub">The 16-Pot Ifa Game Board</p>
          <div className="challenge-odu-board">
            <div className="challenge-odu-row">
              {p1Row.map(odu => <OduMiniCircle key={odu.id} odu={odu} />)}
            </div>
            <div className="challenge-odu-row">
              {p2Row.map(odu => <OduMiniCircle key={odu.id} odu={odu} />)}
            </div>
          </div>
          <p className="challenge-art-tagline">
            16 Odu · 256 Combinations<br />The Ifa Computer · ComputoE
          </p>
        </div>

      </div>

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
            You have accepted the Ayò Ọlọ́pọ́nfá Challenge. Play Ayò Oníkáà Mérìndínlógún
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
  const aiTimerRef   = useRef(null);
  const animTimerRef = useRef([]);  // animation step timers (cleared on new game / remount)


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
    setMessage('Player 1 — choose a pit to sow');
    setMsgType('p1');
  }

  useEffect(() => () => {
    clearTimeout(aiTimerRef.current);
    clearAnimTimers();
  }, []);

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

          {/* P2 side label */}
          <div className="board-side-label board-side-label--p2">
            {oracleName.split(' · ').map((part, i) => (
              <span key={i} className="board-side-name">{part}</span>
            ))}
            <span className="board-side-dir">↑</span>
          </div>

          {/* P2 Pits — top row, displayed [15…8] L→R */}
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

          {/* Center divider */}
          <div className="board-divider" />

          {/* P1 side label */}
          <div className="board-side-label board-side-label--p1">
            <span className="board-side-name">Player 1</span>
            <span className="board-side-dir">↓</span>
          </div>

          {/* P1 Pits — bottom row, displayed [7…0] L→R (RTL Ifa ordering) */}
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
          <div className="odu-row-label" style={{ color:'rgba(232,119,42,0.6)' }}>Odu 16 → 9 · Player 2 Side · (read right → left: 9 → 16)</div>
          <div className="odu-row">{p2Visual.map(o => <OduPit key={o.id} odu={o} />)}</div>
          <div className="odu-row">{p1Row.map(o => <OduPit key={o.id} odu={o} />)}</div>
          <div className="odu-row-label" style={{ color:'rgba(201,162,39,0.6)' }}>Odu 8 → 1 · Player 1 Side · (read right → left: 1 → 8)</div>
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
          {['Ayò Ọlọ́pọ́nfá Olójú Mẹ́rìndínlógún','Awale Mechanics Build','8 Seeds · 16 Pots','Chain Capture','Grand Slam Cancel','Starvation Rule','The Ifa Computer','ComputoE','240 Combinations','Play IFA Games','CENProject'].flatMap((t,i) => [
            <span key={`a${i}`} className={i === 0 ? 'yoruba' : undefined}>{t}</span>, <span key={`s${i}`} className="sep">·</span>
          ])}
          {['Ayò Ọlọ́pọ́nfá Olójú Mẹ́rìndínlógún','Awale Mechanics Build','8 Seeds · 16 Pots','Chain Capture','Grand Slam Cancel','Starvation Rule','The Ifa Computer','ComputoE','240 Combinations','Play IFA Games','CENProject'].flatMap((t,i) => [
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
            <button className="mode-btn mode-btn--dev" disabled>
              ✦ Story Mode <span className="mode-btn__dev-tag">Under Development</span>
            </button>
            <button className="mode-btn mode-btn--dev" disabled>
              ⬡ Building Mode <span className="mode-btn__dev-tag">Under Development</span>
            </button>
          </div>
        </div>

        {/* Game / Learning area */}
        <div className="game-area">
          {mode === 'play' ? (
            <>
              <div className="section-header" style={{ marginBottom:'28px' }}>
                <p className="section-eyebrow">Playing Mode · Awale Mechanics</p>
                <h2 className="section-title">Ifa Mancala of the 16 Pots</h2>
                <p className="section-desc">
                  8 seeds per Odu Pit, displayed as the Odu Ifa 2-Column Mark Pattern in the IfaMancala.
                  Capture with Awale rules based on IfaLogic: chain capture, grand slam cancel, starvation rule.
                </p>
              </div>
              <PlayingMode />
            </>
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

      <footer className="site-footer">
        <p className="footer-logo">Ayò Ọlọ́pọ́nfá · Play IFA Games</p>
        <p className="footer-text">Part of the IFA Internet · CENProject · Isese Technology</p>
        <p className="footer-note">Ayò Ọlọ́pọ́nfá is also known as Ayò Oníkáà Mérìndínlógún (the 16-Compartment Ayo Game)</p>
        <nav className="footer-links">
          <a href="../index.html"       className="footer-link">Play IFA Games</a>
          <a href="../../index.html"    className="footer-link">IFA Internet</a>
          <a href="https://cenproject.org/" className="footer-link" target="_blank" rel="noopener noreferrer">CENProject</a>
        </nav>
      </footer>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
