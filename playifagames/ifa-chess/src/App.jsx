const { useState, useEffect, useRef, useCallback, useMemo } = React;

// ─── DATA ────────────────────────────────────────────────────────────────────

const ODU = [
  { id:'ogbe',     num:1,  name:'Ogbe',     yoruba:'Ẹ̀jì Ogbè',       color:'#f0c840', field:'Physics & Energy' },
  { id:'oyeku',    num:2,  name:'Oyeku',    yoruba:'Oyẹkú Mẹ́jì',     color:'#8892a4', field:'Mathematics' },
  { id:'iwori',    num:3,  name:'Iwori',    yoruba:'Ìwòrì Mẹ́jì',     color:'#a855f7', field:'Neuroscience' },
  { id:'odi',      num:4,  name:'Odi',      yoruba:'Odí Mẹ́jì',       color:'#00c87c', field:'Biology' },
  { id:'irosun',   num:5,  name:'Irosun',   yoruba:'Ìrosùn Mẹ́jì',    color:'#e9498a', field:'Chemistry' },
  { id:'owonrin',  num:6,  name:'Owonrin',  yoruba:'Òwọ́nrín Mẹ́jì',  color:'#00d9b8', field:'Engineering' },
  { id:'obara',    num:7,  name:'Obara',    yoruba:'Òbàrà Mẹ́jì',     color:'#f5c518', field:'Arts' },
  { id:'okanran',  num:8,  name:'Okanran',  yoruba:'Òkànràn Mẹ́jì',   color:'#4aa3ff', field:'Technology' },
  { id:'ogunda',   num:9,  name:'Ogunda',   yoruba:'Ògúndá Mẹ́jì',    color:'#e8772a', field:'Law' },
  { id:'osa',      num:10, name:'Osa',      yoruba:'Òsá Mẹ́jì',       color:'#ff4d6d', field:'Education' },
  { id:'ika',      num:11, name:'Ika',      yoruba:'Ìká Mẹ́jì',       color:'#00b4a6', field:'Economics' },
  { id:'oturupon', num:12, name:'Oturupon', yoruba:'Òtúrúpọ̀n Mẹ́jì', color:'#6b7280', field:'Earth Science' },
  { id:'otura',    num:13, name:'Otura',    yoruba:'Òtúrá Mẹ́jì',     color:'#c084fc', field:'Philosophy' },
  { id:'irete',    num:14, name:'Irete',    yoruba:'Ìrẹ̀tẹ̀ Mẹ́jì',   color:'#34d399', field:'Medicine' },
  { id:'ose',      num:15, name:'Ose',      yoruba:'Òsẹ́ Mẹ́jì',      color:'#fb923c', field:'Language' },
  { id:'ofun',     num:16, name:'Ofun',     yoruba:'Òfún Mẹ́jì',      color:'#818cf8', field:'Cosmos' },
];

const PIECES = {
  oba:       { name:'Ọba',              yoruba:'Ọba',              symbol:'◉', role:'King',        color:'#f0c840',
    desc:'The King. Moves 1 step in any of 8 directions. Capture the enemy Ọba to win.',
    moves:'1-step · all 8 directions', special:'Royal Command: once per game, reveal any hidden Odu power' },
  olori:     { name:'Olorì',            yoruba:'Olorì',            symbol:'♦', role:'Queen',       color:'#e9498a',
    desc:'Queen of the Kingdom. Flows in all 8 directions any number of squares. The most powerful piece.',
    moves:'Unlimited · all 8 directions', special:'Royal Grace: can move through 1 friendly piece once' },
  asoluu:    { name:'Aṣọ́lùú',          yoruba:'Aṣọ́lùú',          symbol:'▲', role:'Rook',        color:'#e8ecf2',
    desc:'The Fortress. Moves horizontally and vertically any number of squares.',
    moves:'Unlimited · horizontal & vertical', special:'Iron Gate: immune to first capture attempt' },
  babalawo:  { name:'Babalawo',         yoruba:'Babalawo',         symbol:'⚡', role:'Bishop',      color:'#fb923c',
    desc:'The Diviner of Ifa. Strikes diagonally any number of squares.',
    moves:'Unlimited · diagonal', special:'Ifa Sight: can capture on the square before its target' },
  balogun:   { name:'Balógun',          yoruba:'Balógun',          symbol:'⚔', role:'Knight',      color:'#e8772a',
    desc:'The War General. Leaps in an extended L-shape: 3 squares + 1. Jumps over all pieces.',
    moves:'3+1 L-shape · jumps over pieces', special:'Iron Will: can move twice if capturing' },
  iyalade:   { name:'Ìyálóde',          yoruba:'Ìyálóde',          symbol:'✦', role:'Diplomat',    color:'#c084fc',
    desc:'Leader of Women. Moves like a standard Knight (2+1) OR 1 step in any direction. Unpredictable and agile.',
    moves:'2+1 L-shape OR 1-step any direction', special:'Crossroads: swap positions with any friendly piece once' },
  iya_oloja: { name:'Ìyá Ọlọ́jà',       yoruba:'Ìyá Ọlọ́jà',       symbol:'≋', role:'Merchant',    color:'#00d9b8',
    desc:'Mother of the Market. Moves up to 4 squares in any of 8 directions. Swift and sweeping.',
    moves:'Up to 4 steps · all 8 directions', special:'Market Wind: move and a friendly piece 1 step in the same turn once' },
  iya_oba:   { name:'Ìyá Ọba',          yoruba:'Ìyá Ọba',          symbol:'∿', role:'Queen Mother', color:'#4aa3ff',
    desc:'Queen Mother. Moves up to 6 squares horizontally or vertically. Cannot capture — blocks and protects.',
    moves:'Up to 6 steps · horizontal & vertical · no capture', special:'Royal Shield: adjacent friendly pieces get +1 defense' },
  iya_oloosa:{ name:'Ìyá Olóoṣà Ìlú',  yoruba:'Ìyá Olóoṣà Ìlú',  symbol:'○', role:'Priestess',   color:'#34d399',
    desc:'Mother of the Town\'s Devotees. Moves up to 3 squares in any direction. Cannot capture — she blesses and shields.',
    moves:'Up to 3 steps · all 8 directions · no capture', special:'Town Blessing: restore 1 captured Ẹrú Ọba to the board once' },
};

const ODU_PAWN_POWERS = {
  ogbe:    'Sunlight — if this pawn promotes, the promoted piece gains +1 range',
  oyeku:   'Void — this pawn can sacrifice itself to freeze an adjacent enemy for 1 turn',
  iwori:   'Mind — see all valid moves for any enemy piece once',
  odi:     'Womb — if captured, leaves behind a "seed" that blocks the square for 1 turn',
  irosun:  'Blood — gains 1 extra forward step after capturing',
  owonrin: 'Storm — can move 2 squares diagonally on its first move',
  obara:   'Royalty — adjacent friendly pieces get +1 to their movement range once',
  okanran: 'Innovation — can move like Esu (1+2) once per game instead of forward',
  ogunda:  'Justice — captures forward as well as diagonally',
  osa:     'Change — each turn can choose to move backward instead of forward',
  ika:     'Exchange — can swap with any friendly pawn once',
  oturupon:'Earth — immovable for 1 turn if standing on the center Odu zone',
  otura:   'Philosophy — has 2 lives; revives once on the same square after first capture',
  irete:   'Medicine — heals 1 adjacent friendly piece back from captured to active once',
  ose:     'Language — upon promotion, opponent must announce their next move',
  ofun:    'Cosmos — upon reaching back rank, becomes Olorì automatically',
};

// ─── SOUND ENGINE ─────────────────────────────────────────────────────────────
const SoundEngine = (() => {
  let ctx = null;
  let _enabled = true;
  function getCtx() {
    if (!ctx) {
      try { ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch(e) { return null; }
    }
    return ctx;
  }
  function tone(freq, type, start, dur, vol, fade) {
    const c = getCtx(); if (!c) return;
    const osc = c.createOscillator(), g = c.createGain();
    osc.connect(g); g.connect(c.destination);
    osc.type = type;
    osc.frequency.setValueAtTime(freq, c.currentTime + start);
    g.gain.setValueAtTime(vol, c.currentTime + start);
    if (fade) g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + start + dur);
    osc.start(c.currentTime + start);
    osc.stop(c.currentTime + start + dur);
  }
  return {
    get enabled() { return _enabled; },
    set enabled(v) { _enabled = v; },
    play(sound) {
      if (!_enabled) return;
      const c = getCtx(); if (!c) return;
      if (c.state === 'suspended') c.resume();
      try {
        switch(sound) {
          case 'select':
            tone(660,'sine',0,0.07,0.15,true); break;
          case 'move':
            tone(220,'triangle',0,0.08,0.28,false);
            tone(175,'triangle',0.06,0.1,0.18,true); break;
          case 'capture':
            tone(140,'sawtooth',0,0.05,0.5,false);
            tone(100,'sawtooth',0.04,0.18,0.38,true); break;
          case 'check':
            tone(440,'square',0,0.09,0.28,true);
            tone(550,'square',0.1,0.22,0.28,true); break;
          case 'checkmate':
            [0,0.18,0.38,0.58].forEach((s,i) => tone(330+i*110,'sine',s,0.55,0.38,true)); break;
          case 'promote':
            [0,0.13,0.26].forEach((s,i) => tone(660+i*110,'sine',s,0.3,0.32,true)); break;
          case 'ai_move':
            tone(300,'sine',0,0.08,0.18,true);
            tone(240,'sine',0.08,0.12,0.14,true); break;
          case 'invalid':
            tone(110,'square',0,0.08,0.1,true); break;
          case 'start':
            [0,0.15,0.3].forEach((s,i) => tone(330+i*82,'sine',s,0.25,0.28,true)); break;
        }
      } catch(e) {}
    }
  };
})();

// ─── AI ENGINE ────────────────────────────────────────────────────────────────
const PIECE_VALUES = {
  oba:100000, olori:900, asoluu:500, babalawo:330, balogun:320,
  iyalade:280, iya_oloja:250, iya_oba:150, iya_oloosa:100, odu:100
};

function evaluateBoard(board, aiPlayer) {
  let score = 0;
  for (let r = 0; r < 16; r++) {
    for (let c = 0; c < 16; c++) {
      const p = board[r][c]; if (!p) continue;
      const val = PIECE_VALUES[p.type] || 0;
      const mine = p.player === aiPlayer;
      score += mine ? val : -val;
      if (p.type === 'odu') {
        const adv = aiPlayer === 'black' ? (15 - r) : r;
        score += mine ? adv * 3 : -adv * 3;
      }
      const cd = Math.abs(r - 7.5) + Math.abs(c - 7.5);
      score += mine ? (15 - cd) * 0.08 : -(15 - cd) * 0.08;
    }
  }
  return score;
}

function getAllMoves(board, player) {
  const moves = [];
  for (let r = 0; r < 16; r++)
    for (let c = 0; c < 16; c++) {
      const p = board[r][c];
      if (!p || p.player !== player) continue;
      getValidMoves(board, r, c).forEach(m =>
        moves.push({ fromRow:r, fromCol:c, toRow:m.row, toCol:m.col })
      );
    }
  return moves;
}

function minimax(board, depth, alpha, beta, isMax, aiPlayer) {
  if (depth === 0) return evaluateBoard(board, aiPlayer);
  const cur = isMax ? aiPlayer : (aiPlayer === 'black' ? 'white' : 'black');
  const moves = getAllMoves(board, cur);
  if (!moves.length) return isInCheck(board, cur) ? (isMax ? -90000 : 90000) : 0;
  // captures first
  moves.sort((a,b) => (board[b.toRow][b.toCol]?1:0) - (board[a.toRow][a.toCol]?1:0));
  if (isMax) {
    let best = -Infinity;
    for (const m of moves) {
      best = Math.max(best, minimax(simulateMove(board,m.fromRow,m.fromCol,m.toRow,m.toCol), depth-1, alpha, beta, false, aiPlayer));
      alpha = Math.max(alpha, best);
      if (beta <= alpha) break;
    }
    return best;
  } else {
    let best = Infinity;
    for (const m of moves) {
      best = Math.min(best, minimax(simulateMove(board,m.fromRow,m.fromCol,m.toRow,m.toCol), depth-1, alpha, beta, true, aiPlayer));
      beta = Math.min(beta, best);
      if (beta <= alpha) break;
    }
    return best;
  }
}

function getAIMove(board, player, difficulty) {
  const moves = getAllMoves(board, player);
  if (!moves.length) return null;
  if (difficulty === 'easy') {
    const caps = moves.filter(m => board[m.toRow][m.toCol]);
    const pool = caps.length && Math.random() > 0.45 ? caps : moves;
    return pool[Math.floor(Math.random() * pool.length)];
  }
  const depth = difficulty === 'hard' ? 3 : 2;
  moves.sort((a,b) => (board[b.toRow][b.toCol]?1:0) - (board[a.toRow][a.toCol]?1:0));
  let bestScore = -Infinity, bestMoves = [];
  for (const m of moves) {
    const s = minimax(simulateMove(board,m.fromRow,m.fromCol,m.toRow,m.toCol), depth-1, -Infinity, Infinity, false, player);
    if (s > bestScore) { bestScore = s; bestMoves = [m]; }
    else if (s === bestScore) bestMoves.push(m);
  }
  return bestMoves[Math.floor(Math.random() * bestMoves.length)];
}

// ─── BOARD SETUP ─────────────────────────────────────────────────────────────

function createInitialBoard() {
  const board = Array.from({length:16}, () => Array(16).fill(null));

  const backRow = [
    'asoluu','balogun','babalawo','iya_oloja','iyalade','iya_oloosa','iya_oba','olori',
    'oba','iya_oba','iya_oloosa','iyalade','iya_oloja','babalawo','balogun','asoluu'
  ];

  backRow.forEach((type, col) => {
    board[0][col] = { type, player:'white', moved:false };
  });

  ODU.forEach((odu, col) => {
    board[1][col] = { type:'odu', player:'white', oduid: odu.id, moved:false };
  });

  ODU.forEach((odu, col) => {
    board[14][col] = { type:'odu', player:'black', oduid: odu.id, moved:false };
  });

  backRow.forEach((type, col) => {
    board[15][col] = { type, player:'black', moved:false };
  });

  return board;
}

// ─── MOVE VALIDATION ─────────────────────────────────────────────────────────

function inBounds(r, c) {
  return r >= 0 && r < 16 && c >= 0 && c < 16;
}

function slideDir(board, row, col, dr, dc, maxSteps, canCapture) {
  const piece = board[row][col];
  const moves = [];
  let r = row + dr;
  let c = col + dc;
  let steps = 0;
  while (inBounds(r, c) && steps < maxSteps) {
    const target = board[r][c];
    if (target) {
      if (canCapture && target.player !== piece.player) {
        moves.push({row:r, col:c});
      }
      break;
    }
    moves.push({row:r, col:c});
    r += dr;
    c += dc;
    steps++;
  }
  return moves;
}

function getRawMoves(board, row, col) {
  const piece = board[row][col];
  if (!piece) return [];

  const { type, player } = piece;
  const moves = [];

  const addIfValid = (r, c) => {
    if (!inBounds(r, c)) return;
    const target = board[r][c];
    if (target && target.player === player) return;
    moves.push({row:r, col:c});
  };

  const dirs8 = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
  const dirs4HV = [[-1,0],[1,0],[0,-1],[0,1]];
  const dirs4D = [[-1,-1],[-1,1],[1,-1],[1,1]];

  if (type === 'oba') {
    dirs8.forEach(([dr,dc]) => addIfValid(row+dr, col+dc));

  } else if (type === 'olori') {
    dirs8.forEach(([dr,dc]) => {
      slideDir(board, row, col, dr, dc, 16, true).forEach(m => moves.push(m));
    });

  } else if (type === 'asoluu') {
    dirs4HV.forEach(([dr,dc]) => {
      slideDir(board, row, col, dr, dc, 16, true).forEach(m => moves.push(m));
    });

  } else if (type === 'babalawo') {
    dirs4D.forEach(([dr,dc]) => {
      slideDir(board, row, col, dr, dc, 16, true).forEach(m => moves.push(m));
    });

  } else if (type === 'balogun') {
    // 3+1 L-shape: 8 combinations of (±3,±1) and (±1,±3)
    const jumps = [
      [3,1],[3,-1],[-3,1],[-3,-1],
      [1,3],[1,-3],[-1,3],[-1,-3]
    ];
    jumps.forEach(([dr,dc]) => addIfValid(row+dr, col+dc));

  } else if (type === 'iyalade') {
    // 2+1 knight jumps OR 1-step any direction
    const knightJumps = [
      [2,1],[2,-1],[-2,1],[-2,-1],
      [1,2],[1,-2],[-1,2],[-1,-2]
    ];
    knightJumps.forEach(([dr,dc]) => addIfValid(row+dr, col+dc));
    dirs8.forEach(([dr,dc]) => addIfValid(row+dr, col+dc));

  } else if (type === 'iya_oloja') {
    // Up to 4 steps all 8 directions
    dirs8.forEach(([dr,dc]) => {
      slideDir(board, row, col, dr, dc, 4, true).forEach(m => moves.push(m));
    });

  } else if (type === 'iya_oba') {
    // Up to 6 steps horizontal & vertical, cannot capture
    dirs4HV.forEach(([dr,dc]) => {
      slideDir(board, row, col, dr, dc, 6, false).forEach(m => moves.push(m));
    });

  } else if (type === 'iya_oloosa') {
    // Up to 3 steps all 8 directions, cannot capture
    dirs8.forEach(([dr,dc]) => {
      slideDir(board, row, col, dr, dc, 3, false).forEach(m => moves.push(m));
    });

  } else if (type === 'odu') {
    const dir = player === 'white' ? 1 : -1;
    const startRow = player === 'white' ? 1 : 14;

    // Forward 1
    const r1 = row + dir;
    if (inBounds(r1, col) && !board[r1][col]) {
      moves.push({row:r1, col});
      // Forward 2 on first move
      if (!piece.moved) {
        const r2 = row + dir * 2;
        if (inBounds(r2, col) && !board[r2][col]) {
          moves.push({row:r2, col});
        }
      }
    }

    // Diagonal captures
    [-1, 1].forEach(dc => {
      const r = row + dir;
      const c = col + dc;
      if (inBounds(r, c) && board[r][c] && board[r][c].player !== player) {
        moves.push({row:r, col:c});
      }
    });
  }

  return moves;
}

// ─── CHECK / CHECKMATE HELPERS ────────────────────────────────────────────────

function simulateMove(board, fromRow, fromCol, toRow, toCol) {
  const b = board.map(r => r.map(c => c ? {...c} : null));
  b[toRow][toCol] = {...b[fromRow][fromCol]};
  b[fromRow][fromCol] = null;
  return b;
}

function isInCheck(board, player) {
  let obaRow = -1, obaCol = -1;
  outer: for (let r = 0; r < 16; r++) {
    for (let c = 0; c < 16; c++) {
      const p = board[r][c];
      if (p && p.type === 'oba' && p.player === player) {
        obaRow = r; obaCol = c;
        break outer;
      }
    }
  }
  if (obaRow === -1) return false;
  const enemy = player === 'white' ? 'black' : 'white';
  for (let r = 0; r < 16; r++) {
    for (let c = 0; c < 16; c++) {
      const p = board[r][c];
      if (p && p.player === enemy) {
        const moves = getRawMoves(board, r, c);
        if (moves.some(m => m.row === obaRow && m.col === obaCol)) return true;
      }
    }
  }
  return false;
}

function getValidMoves(board, row, col) {
  const piece = board[row][col];
  if (!piece) return [];
  return getRawMoves(board, row, col).filter(move => {
    const sim = simulateMove(board, row, col, move.row, move.col);
    return !isInCheck(sim, piece.player);
  });
}

function hasAnyValidMove(board, player) {
  for (let r = 0; r < 16; r++) {
    for (let c = 0; c < 16; c++) {
      const p = board[r][c];
      if (p && p.player === player && getValidMoves(board, r, c).length > 0) return true;
    }
  }
  return false;
}

// ─── PIECE SVG COMPONENTS ────────────────────────────────────────────────────

// Ifa marks for each Odu: 1=single bar (Ogbe/Energy), 0=double bar (Oyeku/Anergy)
const ODU_BITS = {
  ogbe:[1,1,1,1], oyeku:[0,0,0,0], iwori:[0,1,1,0], odi:[1,0,0,1],
  irosun:[1,1,0,0], owonrin:[0,0,1,1], obara:[1,0,0,0], okanran:[0,0,0,1],
  ogunda:[1,1,1,0], osa:[0,1,1,1], ika:[0,1,0,0], oturupon:[0,0,1,0],
  otura:[1,0,1,1], irete:[1,1,0,1], ose:[1,0,1,0], ofun:[0,1,0,1],
};

function PieceSVG({ type, oduid }) {

  // Ọba (King) — Ade: conical Yoruba crown, beaded veil strands, bird at apex
  if (type === 'oba') return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="16" cy="4" rx="2.5" ry="1.5" fill="currentColor"/>
      <path d="M18,3.5 L22,2 L20,5.5" fill="currentColor"/>
      <path d="M8,22 L16,5 L24,22 Z" fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <line x1="10.5" y1="14" x2="21.5" y2="14" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
      <line x1="9.5" y1="18" x2="22.5" y2="18" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
      <rect x="7" y="21" width="18" height="2.5" rx="1.25" fill="currentColor"/>
      <line x1="9" y1="23.5" x2="8" y2="30" stroke="currentColor" strokeWidth="1"/>
      <line x1="12" y1="23.5" x2="11.5" y2="30" stroke="currentColor" strokeWidth="1"/>
      <line x1="16" y1="23.5" x2="16" y2="30" stroke="currentColor" strokeWidth="1"/>
      <line x1="20" y1="23.5" x2="20.5" y2="30" stroke="currentColor" strokeWidth="1"/>
      <line x1="23" y1="23.5" x2="24" y2="30" stroke="currentColor" strokeWidth="1"/>
      <circle cx="8.5" cy="27" r="1.2" fill="currentColor"/>
      <circle cx="11.8" cy="27" r="1.2" fill="currentColor"/>
      <circle cx="16" cy="27" r="1.2" fill="currentColor"/>
      <circle cx="20.2" cy="27" r="1.2" fill="currentColor"/>
      <circle cx="23.5" cy="27" r="1.2" fill="currentColor"/>
    </svg>
  );

  // Olorì (Queen) — Regal 3-pointed crown with gems
  if (type === 'olori') return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5,26 L5,16 L10,21 L16,9 L22,21 L27,16 L27,26 Z"
            fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <rect x="5" y="24" width="22" height="3" rx="1.5" fill="currentColor"/>
      <path d="M16,14 L19,18 L16,22 L13,18 Z" fill="currentColor"/>
      <circle cx="9" cy="22" r="1.5" fill="currentColor" opacity="0.75"/>
      <circle cx="23" cy="22" r="1.5" fill="currentColor" opacity="0.75"/>
    </svg>
  );

  // Aṣọ́lùú (Rook) — Local dane gun: barrel, stock, flintlock hammer
  if (type === 'asoluu') return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="9" y="13" width="19" height="3.5" rx="1" fill="currentColor"/>
      <path d="M28,12.5 L31,14.75 L28,17" fill="currentColor" opacity="0.7"/>
      <rect x="11" y="16" width="8" height="5" rx="1" fill="currentColor" opacity="0.5" stroke="currentColor" strokeWidth="1"/>
      <path d="M18,16 L21,12 L22.5,13.5 L19,16.5" fill="currentColor"/>
      <path d="M15,21 Q16.5,25 20,21" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M9,14 Q4,16 3,21 Q4,27 8,27 L12,22 L9,16.5" fill="currentColor" opacity="0.4"/>
    </svg>
  );

  // Babalawo (Bishop) — Opon Ifa: circular tray, Esu horns at top, Ifa marks inside
  if (type === 'babalawo') return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="18" r="11" fill="none" stroke="currentColor" strokeWidth="2"/>
      <circle cx="16" cy="18" r="8" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.5"/>
      <circle cx="16" cy="8" r="2.5" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="14.5" y1="6" x2="13" y2="4" stroke="currentColor" strokeWidth="1.2"/>
      <line x1="17.5" y1="6" x2="19" y2="4" stroke="currentColor" strokeWidth="1.2"/>
      <line x1="13" y1="14" x2="13" y2="22" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="19" y1="14" x2="19" y2="22" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="13" cy="17" r="1.3" fill="currentColor" opacity="0.35"/>
      <circle cx="19" cy="20" r="1.3" fill="currentColor" opacity="0.35"/>
    </svg>
  );

  // Balógun (Knight) — Crossed swords with shield at centre
  if (type === 'balogun') return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="4" y1="4" x2="28" y2="28" stroke="currentColor" strokeWidth="2"/>
      <line x1="28" y1="4" x2="4" y2="28" stroke="currentColor" strokeWidth="2"/>
      <line x1="8" y1="24" x2="14" y2="18" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      <line x1="24" y1="8" x2="18" y2="14" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      <path d="M16,9 L22,13 L22,19 L16,23 L10,19 L10,13 Z"
            fill="currentColor" opacity="0.3" stroke="currentColor" strokeWidth="1.2"/>
    </svg>
  );

  // Ìyálóde — Ceremonial abebe fan with beaded handle
  if (type === 'iyalade') return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6,18 A10,10 0 0 1 26,18" fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="2"/>
      <line x1="16" y1="18" x2="16" y2="8" stroke="currentColor" strokeWidth="1"/>
      <line x1="16" y1="18" x2="7" y2="11.5" stroke="currentColor" strokeWidth="1"/>
      <line x1="16" y1="18" x2="25" y2="11.5" stroke="currentColor" strokeWidth="1"/>
      <line x1="16" y1="18" x2="6.3" y2="16" stroke="currentColor" strokeWidth="1"/>
      <line x1="16" y1="18" x2="25.7" y2="16" stroke="currentColor" strokeWidth="1"/>
      <rect x="14.5" y="18" width="3" height="12" rx="1.5" fill="currentColor"/>
      <circle cx="16" cy="22" r="2" fill="currentColor" opacity="0.45"/>
      <circle cx="16" cy="27" r="2" fill="currentColor" opacity="0.45"/>
    </svg>
  );

  // Ìyá Ọlọ́jà — Woven market basket with handle and produce
  if (type === 'iya_oloja') return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10,14 Q16,5 22,14" fill="none" stroke="currentColor" strokeWidth="2"/>
      <path d="M7,14 L9,28 Q16,31 23,28 L25,14 Z"
            fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="8" y1="19" x2="24" y2="19" stroke="currentColor" strokeWidth="0.8" opacity="0.6"/>
      <line x1="9" y1="24" x2="23" y2="24" stroke="currentColor" strokeWidth="0.8" opacity="0.6"/>
      <circle cx="12" cy="16.5" r="1.5" fill="currentColor" opacity="0.8"/>
      <circle cx="16" cy="15.5" r="2" fill="currentColor" opacity="0.8"/>
      <circle cx="20" cy="16.5" r="1.5" fill="currentColor" opacity="0.8"/>
    </svg>
  );

  // Ìyá Ọba — Mother embracing child: protective motherhood symbol
  if (type === 'iya_oba') return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="6.5" r="3.5" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M10,10 Q8,19 10,28 L22,28 Q24,19 22,10 Q19,13 16,13 Q13,13 10,10Z"
            fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="16" cy="18" r="1.8" fill="currentColor" opacity="0.7"/>
      <circle cx="16" cy="22.5" r="3" fill="currentColor" opacity="0.45"/>
      <path d="M10,15 Q8,22 13,24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M22,15 Q24,22 19,24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );

  // Ìyá Olóoṣà Ìlú — Osun ritual staff: top disk, two crossbars with orb finials, base
  if (type === 'iya_oloosa') return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="16" y1="4" x2="16" y2="30" stroke="currentColor" strokeWidth="2"/>
      <circle cx="16" cy="5" r="4" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="16" cy="5" r="1.5" fill="currentColor"/>
      <line x1="9" y1="13" x2="23" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="9" cy="13" r="1.8" fill="currentColor"/>
      <circle cx="23" cy="13" r="1.8" fill="currentColor"/>
      <line x1="11" y1="21" x2="21" y2="21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="11" cy="21" r="1.4" fill="currentColor"/>
      <circle cx="21" cy="21" r="1.4" fill="currentColor"/>
      <line x1="12" y1="30" x2="20" y2="30" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );

  // Odu piece — Ifa marks: 4 rows × 2 columns showing the Odu binary code
  if (type === 'odu') {
    const bits = ODU_BITS[oduid] || [0,0,0,0];
    // Layout: barH=4, rowGap=3.5 → total 26.5px centred in 32px → startY≈3
    const barH = 4, rowGap = 3.5, startY = 3;
    const cx1 = 9, cx2 = 23;
    const sW = 5, dW = 2, dGap = 1.5;
    const rects = [];
    bits.forEach((bit, ri) => {
      const y = startY + ri * (barH + rowGap);
      [cx1, cx2].forEach((cx, ci) => {
        if (bit === 0) {
          rects.push(<rect key={`${ri}-${ci}-a`} x={cx - dW - dGap / 2} y={y} width={dW} height={barH} rx="0.5" fill="currentColor" />);
          rects.push(<rect key={`${ri}-${ci}-b`} x={cx + dGap / 2}      y={y} width={dW} height={barH} rx="0.5" fill="currentColor" />);
        } else {
          rects.push(<rect key={`${ri}-${ci}`}   x={cx - sW / 2}        y={y} width={sW} height={barH} rx="0.5" fill="currentColor" />);
        }
      });
    });
    return (
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        {rects}
      </svg>
    );
  }

  return null;
}

// ─── PIECE COMPONENT ─────────────────────────────────────────────────────────

function PieceComponent({ piece }) {
  if (!piece) return null;
  const { type, player, oduid } = piece;

  let color = '#c9a227';
  let bg = player === 'white' ? 'rgba(201,162,39,0.18)' : 'rgba(0,180,166,0.18)';
  let borderColor = player === 'white' ? '#c9a227' : '#00b4a6';
  let glowColor = player === 'white' ? 'rgba(201,162,39,0.35)' : 'rgba(0,180,166,0.35)';

  if (type === 'odu' && oduid) {
    const odu = ODU.find(o => o.id === oduid);
    if (odu) {
      color = odu.color;
      bg = `${odu.color}30`;
      borderColor = `${odu.color}88`;
      glowColor = `${odu.color}55`;
    }
  } else if (PIECES[type]) {
    const pColor = PIECES[type].color;
    bg = player === 'white' ? `${pColor}28` : 'rgba(0,180,166,0.18)';
    borderColor = player === 'white' ? pColor : '#00b4a6';
    glowColor = player === 'white' ? `${pColor}44` : 'rgba(0,180,166,0.35)';
    color = player === 'white' ? pColor : '#00d9b8';
  }

  return (
    <div
      className={`ic-piece ic-piece--${player}`}
      style={{
        background: bg,
        border: `1.5px solid ${borderColor}`,
        boxShadow: `0 0 8px ${glowColor}, inset 0 0 4px ${glowColor}`,
        color: color,
      }}
    >
      <PieceSVG type={type} oduid={oduid} />
    </div>
  );
}

// ─── BOARD CELL ──────────────────────────────────────────────────────────────

function Cell({ row, col, piece, isSelected, isValidMove, isLastMoved, onClick }) {
  const isDark = (row + col) % 2 === 0;
  const odu = ODU[col];
  const oduTint = odu ? odu.color : '#ffffff';

  let cellClass = `ic-cell ${isDark ? 'ic-cell--dark' : 'ic-cell--light'}`;
  if (isSelected) cellClass += ' ic-cell--selected';
  if (isValidMove) cellClass += ' ic-cell--valid-move';
  if (isLastMoved) cellClass += ' ic-cell--last-moved';

  return (
    <div
      className={cellClass}
      style={{ '--odu-c': oduTint }}
      onClick={onClick}
      title={piece ? `${piece.player} ${piece.type}${piece.oduid ? ' ('+piece.oduid+')' : ''}` : ''}
    >
      <div className="ic-odu-tint" />
      {isValidMove && !piece && <div className="ic-valid-dot" />}
      {piece && <PieceComponent piece={piece} />}
    </div>
  );
}

// ─── BOARD COMPONENT ─────────────────────────────────────────────────────────

function BoardComponent({ board, selected, validMoves, lastMove, onCellClick }) {
  const validSet = useMemo(() => {
    const s = new Set();
    validMoves.forEach(m => s.add(`${m.row},${m.col}`));
    return s;
  }, [validMoves]);

  const lastSet = useMemo(() => {
    const s = new Set();
    if (lastMove) {
      s.add(`${lastMove.from.row},${lastMove.from.col}`);
      s.add(`${lastMove.to.row},${lastMove.to.col}`);
    }
    return s;
  }, [lastMove]);

  // Render rows top to bottom: row 0 at top (rank 1), row 15 at bottom (rank 16)
  // Columns right to left: col 15 (Ofun) on left, col 0 (Ogbe) on right — Ifa RTL logic
  const rows = [];
  for (let r = 0; r < 16; r++) {
    const cells = [];
    for (let c = 15; c >= 0; c--) {
      cells.push(
        <Cell
          key={`${r}-${c}`}
          row={r}
          col={c}
          piece={board[r][c]}
          isSelected={selected && selected.row === r && selected.col === c}
          isValidMove={validSet.has(`${r},${c}`)}
          isLastMoved={lastSet.has(`${r},${c}`)}
          onClick={() => onCellClick(r, c)}
        />
      );
    }
    // Rank label on RIGHT
    cells.push(
      <div key="rank" className="ic-rank-label">{r + 1}</div>
    );
    rows.push(
      <div key={r} className="ic-board-row">
        {cells}
      </div>
    );
  }

  // File labels row (bottom) — Ofun on left, Ogbe on right (Ifa RTL order)
  const fileLabels = (
    <div className="ic-file-labels-row">
      {[...ODU].reverse().map((odu) => (
        <div
          key={odu.id}
          className="ic-file-label"
          style={{ '--odu-c': odu.color, color: odu.color }}
          title={odu.yoruba}
        >
          {odu.name.substring(0, 3)}
        </div>
      ))}
      <div className="ic-rank-label-spacer" />
    </div>
  );

  return (
    <div className="ic-board-wrap">
      <div className="ic-board-inner">
        {rows}
        {fileLabels}
      </div>
    </div>
  );
}

// ─── PIECE SVG ROSTER ICON ────────────────────────────────────────────────────

function RosterIcon({ type, color }) {
  return (
    <div
      className="ic-roster-icon"
      style={{
        background: `${color}22`,
        border: `1.5px solid ${color}66`,
        color: color,
        boxShadow: `0 0 6px ${color}33`,
      }}
    >
      <PieceSVG type={type} />
    </div>
  );
}

// ─── LEFT SIDEBAR: ORISA ROSTER ──────────────────────────────────────────────

function OrisaRoster({ selectedPiece, onClose }) {
  const selectedType = selectedPiece ? selectedPiece.type : null;

  return (
    <div className="ic-sidebar ic-sidebar--left">
      <div className="ic-sidebar-header">
        <span className="ic-sidebar-title">Orisa Roster</span>
        <button className="ic-sidebar-close-btn" onClick={onClose} title="Hide Roster" aria-label="Hide Roster">‹</button>
      </div>
      <div className="ic-roster-list">
        {Object.entries(PIECES).map(([key, p]) => (
          <div
            key={key}
            className={`ic-roster-item${selectedType === key ? ' ic-roster-item--active' : ''}`}
            style={{ '--piece-c': p.color }}
          >
            <RosterIcon type={key} color={p.color} />
            <div className="ic-roster-info">
              <div className="ic-roster-name-row">
                <span className="ic-roster-name">{p.name}</span>
                <span className="ic-roster-role" style={{ background: `${p.color}33`, color: p.color }}>
                  {p.role}
                </span>
              </div>
              <div className="ic-roster-yoruba">{p.yoruba}</div>
              <div className="ic-roster-moves">{p.moves}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── MOVE LOG ────────────────────────────────────────────────────────────────

function MoveLog({ moveHistory }) {
  const logRef = useRef(null);

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [moveHistory]);

  function formatMove(entry, index) {
    const pName = entry.piece.type === 'odu'
      ? `${entry.piece.oduid ? ODU.find(o=>o.id===entry.piece.oduid)?.name : 'Odu'} Ẹrú Ọba`
      : PIECES[entry.piece.type]?.name || entry.piece.type;
    const from = `${ODU[entry.from.col]?.name.substring(0,3)}${entry.from.row + 1}`;
    const to   = `${ODU[entry.to.col]?.name.substring(0,3)}${entry.to.row + 1}`;
    const cap = entry.captured
      ? ` ✕ ${entry.captured.type === 'odu' ? 'Pawn' : PIECES[entry.captured.type]?.name || entry.captured.type}`
      : '';
    const playerDot = entry.piece.player === 'white' ? '●' : '○';
    return (
      <div key={index} className="ic-move-entry">
        <span className="ic-move-num">{index + 1}.</span>
        <span className={`ic-move-dot ic-move-dot--${entry.piece.player}`}>{playerDot}</span>
        <span className="ic-move-text">{pName} {from}→{to}{cap}</span>
      </div>
    );
  }

  return (
    <div className="ic-move-log" ref={logRef}>
      {moveHistory.length === 0
        ? <div className="ic-empty-log">No moves yet. White goes first.</div>
        : moveHistory.map((entry, i) => formatMove(entry, i))
      }
    </div>
  );
}

// ─── RULES PANEL ─────────────────────────────────────────────────────────────

function RulesPanel() {
  return (
    <div className="ic-rules-panel">
      <h3 className="ic-rules-title">IfáChess Rules</h3>
      <div className="ic-rules-section">
        <h4>Objective</h4>
        <p>Capture your opponent's <strong>Ọba</strong> (King) to win. There is no check — simply capture the Ọba.</p>
      </div>
      <div className="ic-rules-section">
        <h4>The Board</h4>
        <p>16×16 grid = 256 Ifa squares. Each of the 16 columns is an <strong>Odu file</strong>, named after one of the 16 principal Odu Ifa. White starts at rows 1–2; Black at rows 15–16.</p>
      </div>
      <div className="ic-rules-section">
        <h4>Pieces</h4>
        <p>Each side has 16 pieces on the back row (Ọba, Olorì, 2 Aṣọ́lùú, 2 Babalawo, 2 Balógun, 2 Ìyálóde, 2 Ìyá Ọlọ́jà, 2 Ìyá Ọba, 2 Ìyá Olóoṣà Ìlú) and 16 Ẹrú Ọba pawns on row 2.</p>
      </div>
      <div className="ic-rules-section">
        <h4>Ẹrú Ọba (Pawns)</h4>
        <p>Move forward 1 square (or 2 on first move). Capture diagonally forward. Each pawn carries a unique Odu power (see Odu tab). Promote to <strong>Olorì</strong> upon reaching the far rank.</p>
      </div>
      <div className="ic-rules-section">
        <h4>Special Movement</h4>
        <ul>
          <li><strong>Balógun</strong> jumps in a 3+1 L-shape (not 2+1).</li>
          <li><strong>Ìyálóde</strong> moves like a standard knight (2+1) OR 1 step in any direction.</li>
          <li><strong>Ìyá Ọba</strong> and <strong>Ìyá Olóoṣà Ìlú</strong> cannot capture — they block and protect only.</li>
          <li><strong>Olorì</strong> is the most powerful, sliding all 8 directions without limit.</li>
        </ul>
      </div>
      <div className="ic-rules-section">
        <h4>Check</h4>
        <p>When your <strong>Ọba</strong> is under attack you are in <strong>check</strong>. You must immediately make a move that removes the threat — move the Ọba, block the attacking piece, or capture it. You cannot make any move that leaves your own Ọba in check.</p>
      </div>
      <div className="ic-rules-section">
        <h4>Checkmate</h4>
        <p>If you are in check and have no legal move to escape, you are in <strong>checkmate</strong> and lose the game immediately.</p>
      </div>
      <div className="ic-rules-section">
        <h4>Win Condition</h4>
        <p>Put the enemy <strong>Ọba</strong> in checkmate — in check with no escape. Capturing the Ọba directly also wins. There is no stalemate rule — if you have no moves but are not in check, pass.</p>
      </div>
    </div>
  );
}

// ─── ODU PANEL ───────────────────────────────────────────────────────────────

function OduPanel() {
  return (
    <div className="ic-odu-panel">
      <h3 className="ic-rules-title">16 Odu Files</h3>
      {ODU.map((odu) => (
        <div key={odu.id} className="ic-odu-entry" style={{ '--odu-c': odu.color }}>
          <div className="ic-odu-num" style={{ color: odu.color }}>{odu.num}</div>
          <div className="ic-odu-details">
            <div className="ic-odu-name" style={{ color: odu.color }}>{odu.name}</div>
            <div className="ic-odu-yoruba">{odu.yoruba}</div>
            <div className="ic-odu-field">{odu.field}</div>
            <div className="ic-odu-power">{ODU_PAWN_POWERS[odu.id]}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── CAPTURED PIECES ─────────────────────────────────────────────────────────

function CapturedPieces({ pieces, label }) {
  if (pieces.length === 0) return null;
  return (
    <div className="ic-captured-group">
      <div className="ic-captured-label">{label} captured:</div>
      <div className="ic-captured-list">
        {pieces.map((p, i) => {
          const color = p.type === 'odu'
            ? (ODU.find(o => o.id === p.oduid)?.color || '#7a7298')
            : (PIECES[p.type]?.color || '#7a7298');
          return (
            <div
              key={i}
              className="ic-captured-piece"
              title={p.type === 'odu' ? `${p.oduid} Ẹrú Ọba` : PIECES[p.type]?.name}
              style={{ color, border: `1px solid ${color}44`, background: `${color}18` }}
            >
              <PieceSVG type={p.type} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── RIGHT SIDEBAR ────────────────────────────────────────────────────────────

function RightSidebar({ moveHistory, capturedWhite, capturedBlack, onClose }) {
  const [tab, setTab] = useState('log');

  return (
    <div className="ic-sidebar ic-sidebar--right">
      <div className="ic-sidebar-header">
        <span className="ic-sidebar-title">Game Info</span>
        <button className="ic-sidebar-close-btn ic-sidebar-close-btn--right" onClick={onClose} title="Hide Panel" aria-label="Hide Panel">›</button>
      </div>
      <div className="ic-captured-section">
        <CapturedPieces pieces={capturedBlack} label="Black" />
        <CapturedPieces pieces={capturedWhite} label="White" />
      </div>
      <div className="ic-tabs">
        {[['log','Move Log'],['rules','Rules'],['odu','Odu Files']].map(([id, label]) => (
          <button
            key={id}
            className={`ic-tab${tab === id ? ' ic-tab--active' : ''}`}
            onClick={() => setTab(id)}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="ic-tab-content">
        {tab === 'log'   && <MoveLog moveHistory={moveHistory} />}
        {tab === 'rules' && <RulesPanel />}
        {tab === 'odu'   && <OduPanel />}
      </div>
    </div>
  );
}

// ─── WINNER MODAL ─────────────────────────────────────────────────────────────

function WinnerModal({ winner, onReset, onSetup }) {
  return (
    <div className="ic-winner-overlay">
      <div className="ic-winner-modal">
        <div className="ic-winner-marks">
          <span className="ic-ifa-mark">|  |</span>
          <span className="ic-ifa-mark">|  O</span>
          <span className="ic-ifa-mark">O  |</span>
          <span className="ic-ifa-mark">O  O</span>
        </div>
        <div className="ic-winner-yoruba">Ẹni tó ṣẹgun!</div>
        <div className="ic-winner-title">{winner === 'white' ? 'White' : 'Black'} Wins!</div>
        <div className="ic-winner-sub">
          The Ọba of {winner === 'white' ? 'Black' : 'White'} has been captured.<br/>
          Wisdom and strategy prevail.
        </div>
        <div className="ic-winner-marks ic-winner-marks--bottom">
          <span className="ic-ifa-mark">|  O</span>
          <span className="ic-ifa-mark">O  |</span>
        </div>
        <button className="ic-play-again-btn" onClick={onReset}>
          Play Again
        </button>
        <button className="ic-new-game-btn" onClick={onSetup}>
          New Game Setup
        </button>
        <a href="../index.html" className="ic-back-btn-small">← Back to Play IFA Games</a>
      </div>
    </div>
  );
}

// ─── SETUP SCREEN ─────────────────────────────────────────────────────────────
function SetupScreen({ onStart }) {
  const [opponent,   setOpponent]   = useState('human');
  const [difficulty, setDifficulty] = useState('medium');

  function handleBegin() {
    SoundEngine.play('start');
    onStart(opponent, difficulty);
  }

  return (
    <div className="ic-setup-overlay">
      <div className="ic-bg-nebula" />
      <div className="ic-setup-modal">
        <div className="ic-winner-marks" style={{ marginBottom:'16px' }}>
          <span className="ic-ifa-mark">|  |</span><span className="ic-ifa-mark">|  O</span>
          <span className="ic-ifa-mark">O  |</span><span className="ic-ifa-mark">O  O</span>
        </div>
        <h1 className="ic-setup-title">IfáChess</h1>
        <p className="ic-setup-sub">Ṣẹ́ẹ̀sì ní Èdè Ifá · 16×16 · 256 Sacred Squares</p>

        <div className="ic-setup-section">
          <div className="ic-setup-label">Play Against</div>
          <div className="ic-setup-opts ic-setup-opts--2">
            {[
              ['human','👤','vs Human','Local 2-player'],
              ['ai',   '⚡','vs Ifa AI','Ifa Intelligence'],
            ].map(([val,icon,label,sub]) => (
              <button key={val}
                className={`ic-setup-opt${opponent===val?' ic-setup-opt--active':''}`}
                onClick={() => setOpponent(val)}>
                <span className="ic-setup-opt-icon">{icon}</span>
                <span className="ic-setup-opt-name">{label}</span>
                <span className="ic-setup-opt-sub">{sub}</span>
              </button>
            ))}
          </div>
        </div>

        {opponent === 'ai' && (
          <div className="ic-setup-section">
            <div className="ic-setup-label">Difficulty</div>
            <div className="ic-setup-opts ic-setup-opts--3">
              {[
                ['easy',  '🌿','Easy',  'Àbẹ̀lẹ̀ — Random moves'],
                ['medium','🔥','Medium','Àárín — 2-ply search'],
                ['hard',  '⚡','Hard',  'Àgbára — 3-ply search'],
              ].map(([val,icon,label,sub]) => (
                <button key={val}
                  className={`ic-setup-opt${difficulty===val?' ic-setup-opt--active':''}`}
                  onClick={() => setDifficulty(val)}>
                  <span className="ic-setup-opt-icon">{icon}</span>
                  <span className="ic-setup-opt-name">{label}</span>
                  <span className="ic-setup-opt-sub">{sub}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        <button className="ic-play-again-btn" style={{ marginTop:'28px' }} onClick={handleBegin}>
          Begin Game
        </button>
        <a href="../index.html" className="ic-back-btn-small">← Back to Play IFA Games</a>
      </div>
    </div>
  );
}

// ─── MOBILE TOGGLE BUTTONS ───────────────────────────────────────────────────

function MobileToggles({ showLeft, showRight, onToggleLeft, onToggleRight }) {
  return (
    <div className="ic-mobile-toggles">
      <button className={`ic-mobile-btn${showLeft ? ' ic-mobile-btn--active' : ''}`} onClick={onToggleLeft}>
        Roster
      </button>
      <button className={`ic-mobile-btn${showRight ? ' ic-mobile-btn--active' : ''}`} onClick={onToggleRight}>
        Info
      </button>
    </div>
  );
}

// ─── SELECTED PIECE INFO ─────────────────────────────────────────────────────

function SelectedPieceInfo({ piece }) {
  if (!piece) return null;
  const isOdu = piece.type === 'odu';
  const odu = isOdu && piece.oduid ? ODU.find(o => o.id === piece.oduid) : null;
  const p = !isOdu ? PIECES[piece.type] : null;

  const color = isOdu ? (odu?.color || '#7a7298') : (p?.color || '#c9a227');
  const name  = isOdu ? `${odu?.name || piece.oduid} Ẹrú Ọba` : (p?.name || piece.type);
  const yoruba = isOdu ? odu?.yoruba : p?.yoruba;
  const desc  = isOdu ? ODU_PAWN_POWERS[piece.oduid] : p?.desc;
  const moves = isOdu ? 'Forward 1 (or 2 first move) · diagonal capture' : p?.moves;

  return (
    <div className="ic-selected-info" style={{ '--piece-c': color, borderColor: `${color}44` }}>
      <div className="ic-selected-header">
        <span className="ic-selected-name" style={{ color }}>{name}</span>
        <span className="ic-selected-player">{piece.player}</span>
      </div>
      {yoruba && <div className="ic-selected-yoruba">{yoruba}</div>}
      {desc && <div className="ic-selected-desc">{desc}</div>}
      {moves && <div className="ic-selected-moves"><em>Movement:</em> {moves}</div>}
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────

function App() {
  // ── mode / settings ──────────────────────────────────────────────────────────
  const [gameMode,   setGameMode]   = useState('setup');
  const [opponent,   setOpponent]   = useState('human');
  const [difficulty, setDifficulty] = useState('medium');
  const [soundOn,    setSoundOn]    = useState(true);
  const [aiThinking, setAiThinking] = useState(false);

  // ── game state ────────────────────────────────────────────────────────────────
  const [board,         setBoard]         = useState(() => createInitialBoard());
  const [turn,          setTurn]          = useState('white');
  const [selected,      setSelected]      = useState(null);
  const [capturedWhite, setCapturedWhite] = useState([]);
  const [capturedBlack, setCapturedBlack] = useState([]);
  const [winner,        setWinner]        = useState(null);
  const [moveHistory,   setMoveHistory]   = useState([]);
  const [lastMove,      setLastMove]      = useState(null);
  const [inCheck,       setInCheck]       = useState(null);
  const [showLeft,      setShowLeft]      = useState(false);
  const [showRight,     setShowRight]     = useState(false);
  const [deskLeft,      setDeskLeft]      = useState(true);
  const [deskRight,     setDeskRight]     = useState(true);

  // Refs so AI effect always sees latest values without re-triggering
  const boardRef      = useRef(board);
  const opponentRef   = useRef(opponent);
  const difficultyRef = useRef(difficulty);
  useEffect(() => { boardRef.current = board; },           [board]);
  useEffect(() => { opponentRef.current = opponent; },     [opponent]);
  useEffect(() => { difficultyRef.current = difficulty; }, [difficulty]);
  useEffect(() => { SoundEngine.enabled = soundOn; },      [soundOn]);

  // ── valid moves ───────────────────────────────────────────────────────────────
  const validMoves = useMemo(() => {
    if (!selected) return [];
    const piece = board[selected.row][selected.col];
    if (!piece || piece.player !== turn) return [];
    return getValidMoves(board, selected.row, selected.col);
  }, [board, selected, turn]);

  const selectedPiece = selected ? board[selected.row][selected.col] : null;

  // ── AI turn ───────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (gameMode !== 'playing' || opponentRef.current !== 'ai' || turn !== 'black' || winner) return;
    setAiThinking(true);
    const delay = difficultyRef.current === 'hard' ? 900 : difficultyRef.current === 'medium' ? 650 : 420;
    const timer = setTimeout(() => {
      const move = getAIMove(boardRef.current, 'black', difficultyRef.current);
      if (move) doMoveCore(boardRef.current, move.fromRow, move.fromCol, move.toRow, move.toCol, true);
      setAiThinking(false);
    }, delay + Math.random() * 180);
    return () => clearTimeout(timer);
  }, [turn, winner, gameMode]);

  // ── core move logic ───────────────────────────────────────────────────────────
  function doMoveCore(currentBoard, fromRow, fromCol, toRow, toCol, isAiMove) {
    const newBoard = currentBoard.map(r => r.map(c => c ? {...c} : null));
    const movingPiece = {...newBoard[fromRow][fromCol]};
    const targetPiece = newBoard[toRow][toCol];

    let newWinner = null;
    if (targetPiece && targetPiece.type === 'oba') newWinner = movingPiece.player;

    if (targetPiece) {
      if (targetPiece.player === 'white') setCapturedWhite(p => [...p, targetPiece]);
      else                                setCapturedBlack(p => [...p, targetPiece]);
    }

    movingPiece.moved = true;
    let promoted = false;
    if (movingPiece.type === 'odu') {
      if ((movingPiece.player === 'white' && toRow === 15) || (movingPiece.player === 'black' && toRow === 0)) {
        movingPiece.type = 'olori'; delete movingPiece.oduid; promoted = true;
      }
    }

    newBoard[toRow][toCol] = movingPiece;
    newBoard[fromRow][fromCol] = null;

    const historyEntry = { from:{row:fromRow,col:fromCol}, to:{row:toRow,col:toCol}, piece:{...movingPiece}, captured:targetPiece||null };

    const nextTurn = movingPiece.player === 'white' ? 'black' : 'white';
    let finalWinner = newWinner;
    let nextInCheck = false;
    if (!finalWinner) {
      nextInCheck = isInCheck(newBoard, nextTurn);
      if (nextInCheck && !hasAnyValidMove(newBoard, nextTurn)) { finalWinner = movingPiece.player; }
    }

    // Sound
    if (finalWinner)     SoundEngine.play('checkmate');
    else if (nextInCheck) SoundEngine.play('check');
    else if (promoted)   SoundEngine.play('promote');
    else if (targetPiece) SoundEngine.play('capture');
    else                  SoundEngine.play(isAiMove ? 'ai_move' : 'move');

    setBoard(newBoard);
    setMoveHistory(p => [...p, historyEntry]);
    setLastMove(historyEntry);
    setSelected(null);

    if (finalWinner) { setWinner(finalWinner); setInCheck(null); }
    else             { setTurn(nextTurn); setInCheck(nextInCheck ? nextTurn : null); }
  }

  function handleCellClick(row, col) {
    if (winner || aiThinking) return;
    if (opponent === 'ai' && turn !== 'white') return;
    const piece = board[row][col];

    if (selected) {
      const isValid = validMoves.some(m => m.row === row && m.col === col);
      if (isValid) { doMoveCore(board, selected.row, selected.col, row, col, false); return; }
      if (piece && piece.player === turn) { SoundEngine.play('select'); setSelected({row,col}); return; }
      setSelected(null); return;
    }
    if (piece && piece.player === turn) { SoundEngine.play('select'); setSelected({row,col}); }
  }

  function resetGame() {
    setBoard(createInitialBoard());
    setTurn('white'); setSelected(null);
    setCapturedWhite([]); setCapturedBlack([]);
    setWinner(null); setInCheck(null);
    setMoveHistory([]); setLastMove(null);
    setAiThinking(false);
  }

  function handleStart(opp, diff) {
    setOpponent(opp); setDifficulty(diff);
    opponentRef.current = opp; difficultyRef.current = diff;
    resetGame();
    setGameMode('playing');
    SoundEngine.play('start');
  }

  function handlePlayAgain() { resetGame(); }
  function handleNewSetup()  { resetGame(); setGameMode('setup'); }

  if (gameMode === 'setup') return <SetupScreen onStart={handleStart} />;

  return (
    <div className="ic-app">
      <div className="ic-bg-nebula" />

      <header className="ic-header">
        <a href="../index.html" className="ic-back-link">← Play IFA Games</a>
        <div className="ic-header-center">
          <h1 className="ic-title">IfáChess: Ṣẹ́ẹ̀sì ní Èdè Ifá</h1>
          <div className="ic-subtitle">
            Ifa/Orisa Strategy · 16×16 · 256 Ifa Squares
            {opponent === 'ai' && <span className="ic-mode-badge"> · vs AI ({difficulty})</span>}
          </div>
        </div>
        <div className="ic-header-right">
          {aiThinking && (
            <div className="ic-ai-thinking">
              <span className="ic-ai-dot" /><span className="ic-ai-dot" /><span className="ic-ai-dot" />
              <span className="ic-ai-label">Ifa thinks…</span>
            </div>
          )}
          <div className={`ic-turn-indicator${inCheck ? ' ic-turn-indicator--check' : ''}`}>
            <span className={`ic-turn-dot ic-turn-dot--${turn}`} />
            <span className="ic-turn-text">{turn === 'white' ? 'White' : 'Black'}'s Turn</span>
            {inCheck && <span className="ic-check-badge">⚠ Check!</span>}
          </div>
          <button className="ic-sound-btn" onClick={() => setSoundOn(v => !v)}
            title={soundOn ? 'Mute' : 'Unmute'} aria-label={soundOn ? 'Mute' : 'Unmute'}>
            {soundOn ? '🔊' : '🔇'}
          </button>
        </div>
      </header>

      <MobileToggles
        showLeft={showLeft} showRight={showRight}
        onToggleLeft={()  => { setShowLeft(v => !v); setShowRight(false); }}
        onToggleRight={() => { setShowRight(v => !v); setShowLeft(false); }}
      />

      <div className={`ic-layout${!deskLeft?' ic-layout--no-left':''}${!deskRight?' ic-layout--no-right':''}`}>
        <div className={`ic-sidebar-wrapper ic-sidebar-wrapper--left${showLeft?' ic-sidebar-wrapper--open':''}${!deskLeft?' ic-sidebar-wrapper--collapsed':''}`}>
          <OrisaRoster selectedPiece={selectedPiece} onClose={() => setDeskLeft(false)} />
        </div>

        <div className="ic-board-area">
          {(!deskLeft || !deskRight) && (
            <div className="ic-panel-restore-bar">
              {!deskLeft  && <button className="ic-restore-btn" onClick={() => setDeskLeft(true)}>▶ Roster</button>}
              {!deskRight && <button className="ic-restore-btn" onClick={() => setDeskRight(true)}>Info ◀</button>}
            </div>
          )}
          {selectedPiece && <SelectedPieceInfo piece={selectedPiece} />}
          <div className={`ic-board-frame${aiThinking?' ic-board-frame--thinking':''}`}>
            <BoardComponent board={board} selected={selected} validMoves={validMoves}
              lastMove={lastMove} onCellClick={handleCellClick} />
          </div>
          {aiThinking && (
            <div className="ic-ai-board-msg">Ifa Intelligence is thinking…</div>
          )}
        </div>

        <div className={`ic-sidebar-wrapper ic-sidebar-wrapper--right${showRight?' ic-sidebar-wrapper--open':''}${!deskRight?' ic-sidebar-wrapper--collapsed':''}`}>
          <RightSidebar moveHistory={moveHistory} capturedWhite={capturedWhite}
            capturedBlack={capturedBlack} onClose={() => setDeskRight(false)} />
        </div>
      </div>

      <footer className="ic-footer">
        <div className="ic-footer-line1">IfáChess — 16 Odu · 256 Sacred Squares · IfaLogic · OrisaLogic · ToE Logic</div>
        <div className="ic-footer-line2">A subgame of Play IFA Games · playifagames.org</div>
      </footer>

      {winner && <WinnerModal winner={winner} onReset={handlePlayAgain} onSetup={handleNewSetup} />}
    </div>
  );
}

ReactDOM.render(React.createElement(App), document.getElementById('root'));
