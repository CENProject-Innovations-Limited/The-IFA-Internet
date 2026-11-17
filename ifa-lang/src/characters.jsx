/* ─────────────────────────────────────────────────────────────
   IfaLang · The 16 Characters (Meta-Characters) · interactive demo
   Ifa-Orisa Communications and Networking · CENProject · IFA Internet
   A line | becomes a dot •, a double line || becomes a double dot ••.
   Read right to left, from Ogbè to Òfún, as Ifá is read.
   Exposes window.IfaCharactersLab for App.jsx.
───────────────────────────────────────────────────────────── */
(function () {
  const { useState, useEffect, useRef, useMemo, useCallback } = React;

  // ── Data: the 16 principal Odù in order of seniority. 1 = single mark (I), 2 = double mark (II), top → bottom
  const ODU = [
    { n: 'Ogbè', m: [1, 1, 1, 1] }, { n: 'Ọ̀yẹ̀kú', m: [2, 2, 2, 2] },
    { n: 'Ìwòrì', m: [2, 1, 1, 2] }, { n: 'Òdí', m: [1, 2, 2, 1] },
    { n: 'Ìrosùn', m: [1, 1, 2, 2] }, { n: 'Ọ̀wọ́nrín', m: [2, 2, 1, 1] },
    { n: 'Ọ̀bàrà', m: [1, 2, 2, 2] }, { n: 'Ọ̀kànràn', m: [2, 2, 2, 1] },
    { n: 'Ògúndá', m: [1, 1, 1, 2] }, { n: 'Ọ̀sá', m: [2, 1, 1, 1] },
    { n: 'Ìká', m: [2, 1, 2, 2] }, { n: 'Òtúúrúpọ̀n', m: [2, 2, 1, 2] },
    { n: 'Òtúrá', m: [1, 2, 1, 1] }, { n: 'Ìrẹtẹ̀', m: [1, 1, 2, 1] },
    { n: 'Ọ̀ṣẹ́', m: [1, 2, 1, 2] }, { n: 'Òfún', m: [2, 1, 2, 1] },
  ];
  const key = m => m.join('');
  const BY_KEY = {}; ODU.forEach((o, i) => { BY_KEY[key(o.m)] = i; });
  const idxOf = m => BY_KEY[key(m)];
  const nameOf = i => ODU[i].n;
  const invert = m => m.map(x => (x === 1 ? 2 : 1));
  const reverse = m => m.slice().reverse();
  const isPal = m => key(m) === key(reverse(m));
  // The paired Odù (ẹnìkejì): a symmetric Odù pairs with its inverse; any other pairs with itself turned upside down.
  const partnerRule = m => (isPal(m) ? 'invert' : 'reverse');
  const partner = m => (isPal(m) ? invert(m) : reverse(m));
  // As on this site: Ogbè is IfaZero (O) and Ọ̀yẹ̀kú is IfaOne (I). A single mark counts as O, a double mark as I.
  const bits = m => m.map(x => (x === 1 ? 0 : 1));
  const oi = m => bits(m).map(b => (b ? 'I' : 'O')).join('');
  const valOf = m => bits(m).reduce((a, b) => a * 2 + b, 0);
  const fromVal = v => [8, 4, 2, 1].map(b => (v & b ? 2 : 1));
  const mejiName = i => (i === 0 ? 'Èjì Ogbè' : `${nameOf(i)} Méjì`);
  const compositeName = (r, l) => (r === l ? mejiName(r) : `${nameOf(r)} ${nameOf(l)}`);
  const PAIRS = [0, 2, 4, 6, 8, 10, 12, 14].map(s => [s, s + 1]);

  const store = {
    get(k, d) { try { const v = localStorage.getItem('ifalang.chars.' + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem('ifalang.chars.' + k, JSON.stringify(v)); } catch (e) { /* storage unavailable */ } },
  };

  // ── Sound: a soft talking-drum voice. Single mark = one high stroke, double mark = two low strokes.
  let AC = null;
  function stroke(t, f0, f1, gain) {
    const o = AC.createOscillator(), g = AC.createGain();
    o.type = 'sine';
    o.frequency.setValueAtTime(f0, t);
    o.frequency.exponentialRampToValueAtTime(f1, t + 0.16);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(gain, t + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.28);
    o.connect(g).connect(AC.destination); o.start(t); o.stop(t + 0.3);
  }
  function playMarks(m, on) {
    if (!on) return;
    try {
      AC = AC || new (window.AudioContext || window.webkitAudioContext)();
      if (AC.state === 'suspended') AC.resume();
      let t = AC.currentTime + 0.02;
      m.forEach(x => {
        if (x === 1) stroke(t, 330, 230, 0.32);
        else { stroke(t, 200, 140, 0.3); stroke(t + 0.07, 190, 130, 0.24); }
        t += 0.16;
      });
    } catch (e) { /* audio unavailable */ }
  }

  // ── Drawing ─────────────────────────────────────────────────
  const ROWS = [16, 46, 76, 106];
  // style: 'lines' (Odù marks) | 'dots' | 'ink-lines' | 'ink-dots'
  function Glyph({ marks, kind = 'dots', h = 120, onRow, title, tone }) {
    const dots = kind.endsWith('dots');
    const off = dots ? 13 : 9;
    return (
      <svg className={'ilc-glyph ilc-glyph--' + kind + (tone ? ' ilc-glyph--' + tone : '')} viewBox="0 0 60 122"
        height={h} width={h * 60 / 122} role="img" aria-label={title || ''}>
        {marks.map((x, r) => {
          const d = x === 1 ? 0 : off, y = ROWS[r];
          const tr = dx => ({ transform: `translate(${30 + dx}px, ${y}px)`, transitionDelay: `${r * 70}ms` });
          const shape = dots
            ? <circle r="7.6" cx="0" cy="0" />
            : <rect x="-3.4" y="-10" width="6.8" height="20" rx="3.4" />;
          return (
            <g key={r} className={'ilc-row' + (onRow ? ' ilc-row--hit' : '')} onClick={onRow ? () => onRow(r) : undefined}>
              {onRow && <rect className="ilc-row__hit" x="0" y={y - 15} width="60" height="30" />}
              <g className="ilc-mk" style={tr(-d)}>{shape}</g>
              <g className="ilc-mk" style={tr(d)}>{shape}</g>
            </g>
          );
        })}
      </svg>
    );
  }

  // O / I symbol, as in the IfaLang symbol sheets: per leg a single mark is written O and a double mark I,
  // read right to left (the top mark is the rightmost letter). Ogbè is one O and Ọ̀yẹ̀kú one solid bar.
  const STEP = { OO: 10.2, OI: 6.7, IO: 6.7, II: 6.5 };
  function ring(cx) {
    const e = (a, b) => `M${(cx - a).toFixed(2)} 0a${a} ${b} 0 1 0 ${2 * a} 0a${a} ${b} 0 1 0 ${-2 * a} 0Z`;
    return <path key={'o' + cx} d={e(6.9, 10) + e(3.85, 7.9)} fillRule="evenodd" />;
  }
  function bar(cx) {
    return (
      <g key={'i' + cx}>
        <rect x={cx - 1.7} y="-10" width="3.4" height="20" />
        <rect x={cx - 4.3} y="-10" width="8.6" height="1.9" />
        <rect x={cx - 4.3} y="8.1" width="8.6" height="1.9" />
      </g>
    );
  }
  function Symbol({ marks, h = 40 }) {
    let body, w;
    if (marks.every(x => x === 1)) { body = ring(0); w = 16; }
    else if (marks.every(x => x === 2)) { body = <rect x="-3.1" y="-11" width="6.2" height="22" rx="0.8" />; w = 10; }
    else {
      const s = marks.slice().reverse().map(x => (x === 1 ? 'O' : 'I'));
      const xs = [0];
      for (let i = 1; i < s.length; i++) xs.push(xs[i - 1] + STEP[s[i - 1] + s[i]]);
      const half = c => (c === 'O' ? 6.9 : 4.3);
      const lo = xs[0] - half(s[0]), hi = xs[xs.length - 1] + half(s[s.length - 1]);
      const off = -(lo + hi) / 2;
      w = hi - lo + 2;
      body = s.map((c, i) => (c === 'O' ? ring(xs[i] + off) : bar(xs[i] + off)));
    }
    return (
      <svg className="ilc-symbol" viewBox={`${-w / 2} -12 ${w} 24`} height={h} width={h * w / 24} aria-hidden="true">{body}</svg>
    );
  }

  // Meta-Character card, after the sheet: Odù marks on a gold tile + dots on a navy tile, read in the chosen direction
  function MetaCard({ i, marks, dir, onRow, size = 'lg', label, glow }) {
    const m = marks || ODU[i].m;
    const idx = idxOf(m);
    const h = size === 'lg' ? 150 : 96;
    const lines = <div className="ilc-tile ilc-tile--gold"><Glyph marks={m} kind="lines" h={h} onRow={onRow} /></div>;
    const dots = <div className="ilc-tile ilc-tile--navy"><Glyph marks={m} kind="dots" h={h} onRow={onRow} /></div>;
    return (
      <div dir="ltr" className={'ilc-card ilc-card--' + size + (glow ? ' ilc-card--glow' : '')}>
        <div className={'ilc-card__head' + (dir === 'rtl' ? ' is-rtl' : '')}>
          <span className="ilc-card__num">{String(idx + 1).padStart(2, '0')}</span>
          <span className="ilc-card__name">{nameOf(idx)}</span>
        </div>
        {label && <div className="ilc-card__label">{label}</div>}
        <div className="ilc-card__pair">{dir === 'rtl' ? <>{dots}{lines}</> : <>{lines}{dots}</>}</div>
        <div className="ilc-card__foot">
          <Symbol marks={m} h={size === 'lg' ? 34 : 26} />
          <span className="ilc-card__bits" title="IfaBits: O = single mark (IfaZero, Ogbè) · I = double mark (IfaOne, Ọ̀yẹ̀kú)">{oi(m)}</span>
        </div>
      </div>
    );
  }

  function Seg({ value, onChange, options, label }) {
    return (
      <div className="ilc-seg" role="group" aria-label={label}>
        {options.map(([v, t]) => (
          <button key={v} className={'ilc-seg__btn' + (value === v ? ' is-on' : '')} onClick={() => onChange(v)} aria-pressed={value === v}>{t}</button>
        ))}
      </div>
    );
  }

  // Picker of the 16 Meta-Characters, in reading order
  function Picker({ value, onPick, dir, kind, small }) {
    return (
      <div className={'ilc-picker' + (small ? ' ilc-picker--sm' : '')} dir={dir}>
        {ODU.map((o, i) => (
          <button key={i} className={'ilc-pick' + (value === i ? ' is-on' : '')} onClick={() => onPick(i)} title={o.n} dir="ltr">
            <Glyph marks={o.m} kind={'ink-' + kind} h={small ? 34 : 44} />
            {!small && <span>{o.n}</span>}
          </button>
        ))}
      </div>
    );
  }

  const OPS = {
    partner: { t: 'Generate partner', y: 'Ẹnìkejì', d: 'The paired Odù: a symmetric Character is inverted, any other is turned upside down.' },
    invert: { t: 'Invert', y: 'Light ⇄ darkness', d: 'Every single mark becomes double and every double becomes single.' },
    reverse: { t: 'Turn upside down', y: 'Top ⇄ bottom', d: 'The four rows are read from the bottom up.' },
    both: { t: 'Invert + turn', y: 'Both', d: 'Invert every mark, then turn the Character upside down.' },
  };

  // ── 1 · Generator ───────────────────────────────────────────
  function Generator({ dir, sound }) {
    const [cur, setCur] = useState(1);              // start from Ọ̀yẹ̀kú, so the first move generates Ogbè
    const [prev, setPrev] = useState(null);
    const [lastOp, setLastOp] = useState(null);
    const [chain, setChain] = useState([{ i: 1, op: null }]);
    const apply = useCallback((op, rowArg) => {
      const m = ODU[cur].m;
      let n;
      if (op === 'partner') n = partner(m);
      else if (op === 'invert') n = invert(m);
      else if (op === 'reverse') n = reverse(m);
      else if (op === 'both') n = reverse(invert(m));
      else if (op === 'row') n = m.map((x, r) => (r === rowArg ? (x === 1 ? 2 : 1) : x));
      const j = idxOf(n);
      const rule = op === 'partner' ? partnerRule(m) : op;
      setPrev(cur); setCur(j); setLastOp({ op, rule, row: rowArg });
      setChain(c => [...c.slice(-11), { i: j, op: op === 'row' ? `row ${rowArg + 1}` : op === 'partner' ? 'partner' : OPS[op].t.toLowerCase() }]);
      playMarks(n, sound);
    }, [cur, sound]);
    const pick = i => { setPrev(null); setLastOp(null); setCur(i); setChain([{ i, op: null }]); playMarks(ODU[i].m, sound); };

    let explain = 'Pick a Meta-Character, then generate a new one from it. Tap any row of the result to flip that one mark.';
    if (lastOp && prev != null) {
      const a = nameOf(prev), b = nameOf(cur);
      if (lastOp.op === 'row') explain = `Flipping row ${lastOp.row + 1} of ${a} gives ${b}.`;
      else if (lastOp.op === 'partner') explain = lastOp.rule === 'invert'
        ? `${a} reads the same both ways, so its partner is its inverse: every mark flips, and ${a} becomes ${b}.`
        : `${a} is not symmetric, so its partner is ${a} turned upside down: ${b}.`;
      else if (prev === cur) explain = `${OPS[lastOp.op].t} leaves ${a} unchanged: it is its own image under this move.`;
      else explain = `${OPS[lastOp.op].t}: ${a} → ${b}.`;
    }
    const arrow = dir === 'rtl' ? '←' : '→';
    const from = prev != null ? <MetaCard i={prev} dir={dir} size="md" label="From" /> : null;
    const to = <MetaCard i={cur} dir={dir} size="lg" label={prev != null ? 'Generated' : 'Selected'} onRow={r => apply('row', r)} glow={prev != null} />;
    return (
      <section className="ilc-sec" id="ilc-generate">
        <div className="ilc-sec__head">
          <span className="ilc-kicker">01 · Generator</span>
          <h2>Generate one Character from another</h2>
          <p>Ogbè from Ọ̀yẹ̀kú, Ìwòrì from Òdí, Ìrosùn from Ọ̀wọ́nrín… Every Meta-Character is a pattern of light and darkness, so each one can be generated from another by a simple move.</p>
        </div>
        <Picker value={cur} onPick={pick} dir={dir} kind="dots" />
        <div className={'ilc-gen' + (prev == null ? ' is-single' : '')} dir={dir}>
          {from}
          {from && <div className="ilc-gen__arrow" aria-hidden="true"><span>{arrow}</span><small>{lastOp ? (lastOp.op === 'row' ? `flip row ${lastOp.row + 1}` : lastOp.op === 'partner' ? (lastOp.rule === 'invert' ? 'partner · invert' : 'partner · turn') : OPS[lastOp.op].t.toLowerCase()) : ''}</small></div>}
          {to}
        </div>
        <div className="ilc-ops">
          {Object.entries(OPS).map(([k, o]) => (
            <button key={k} className={'ilc-op' + (k === 'partner' ? ' ilc-op--main' : '')} onClick={() => apply(k)} title={o.d}>
              <b>{o.t}</b><small>{o.y}</small>
            </button>
          ))}
        </div>
        <p className="ilc-explain" aria-live="polite">{explain}</p>
        <div className="ilc-chain" dir={dir}>
          {chain.map((c, k) => (
            <React.Fragment key={k}>
              {k > 0 && <span className="ilc-chain__op" dir="ltr">{arrow} {c.op} {arrow}</span>}
              <button className="ilc-chain__chip" dir="ltr" onClick={() => pick(c.i)}>
                <Glyph marks={ODU[c.i].m} kind="ink-dots" h={26} /> {nameOf(c.i)}
              </button>
            </React.Fragment>
          ))}
        </div>
      </section>
    );
  }

  // ── 2 · The 8 pairs ─────────────────────────────────────────
  function PairCard({ pair, dir, sound, flipped, onFlip }) {
    const [s, j] = pair;
    const shown = flipped ? s : j;
    const rule = partnerRule(ODU[j].m);
    return (
      <div className={'ilc-pair' + (flipped ? ' is-flipped' : '')}>
        <div className="ilc-pair__names" dir={dir}>
          <span className={flipped ? 'is-on' : ''}>{nameOf(s)}</span>
          <i>⇄</i>
          <span className={!flipped ? 'is-on' : ''}>{nameOf(j)}</span>
        </div>
        <div className="ilc-pair__glyphs">
          <div className="ilc-tile ilc-tile--gold"><Glyph marks={ODU[shown].m} kind="lines" h={92} /></div>
          <div className="ilc-tile ilc-tile--navy"><Glyph marks={ODU[shown].m} kind="dots" h={92} /></div>
        </div>
        <div className="ilc-pair__rule">{rule === 'invert' ? 'Invert every mark' : 'Turn upside down'}</div>
        <button className="ilc-btn ilc-btn--sm" onClick={() => { onFlip(); playMarks(ODU[flipped ? j : s].m, sound); }}>
          {flipped ? `Back to ${nameOf(j)}` : `Generate ${nameOf(s)}`}
        </button>
      </div>
    );
  }
  function Pairs({ dir, sound }) {
    const [flip, setFlip] = useState(Array(8).fill(false));
    const timers = useRef([]);
    useEffect(() => () => timers.current.forEach(clearTimeout), []);
    const playAll = () => {
      timers.current.forEach(clearTimeout); timers.current = [];
      const target = !flip.every(Boolean);
      PAIRS.forEach((p, k) => {
        timers.current.push(setTimeout(() => {
          setFlip(f => f.map((v, q) => (q === k ? target : v)));
          playMarks(ODU[target ? p[0] : p[1]].m, sound);
        }, k * 520));
      });
    };
    return (
      <section className="ilc-sec ilc-sec--alt" id="ilc-pairs">
        <div className="ilc-sec__head">
          <span className="ilc-kicker">02 · The eight pairs</span>
          <h2>Sixteen Characters, eight pairs</h2>
          <p>Each senior Odù has a partner. Ogbè and Ọ̀yẹ̀kú, Ìwòrì and Òdí, and Ọ̀ṣẹ́ and Òfún are mirror inverses; the others are each other turned upside down.</p>
          <button className="ilc-btn" onClick={playAll}>{flip.every(Boolean) ? 'Return all to the junior Odù' : 'Generate all eight senior Odù'}</button>
        </div>
        <div className="ilc-pairs" dir={dir}>
          {PAIRS.map((p, k) => (
            <PairCard key={k} pair={p} dir={dir} sound={sound} flipped={flip[k]} onFlip={() => setFlip(f => f.map((v, q) => (q === k ? !v : v)))} />
          ))}
        </div>
      </section>
    );
  }

  // ── 3 · Two Meta-Characters → 256 Odù, with an Ọ̀pẹ̀lẹ̀ cast ──
  function Opele({ right, left, dir }) {
    // two strands of four pods; a pod showing its open (concave) face = single mark, its back = double mark
    const pod = (x, y, open, k) => (
      <g key={k} transform={`translate(${x},${y})`} className={'ilc-pod' + (open ? ' is-open' : '')}>
        <ellipse rx="15" ry="21" className="ilc-pod__shell" />
        <ellipse rx="9.5" ry="15" className="ilc-pod__face" />
        <path d="M0 -13 Q4 0 0 13" className="ilc-pod__seam" />
      </g>
    );
    const strand = (m, x) => m.map((v, r) => pod(x, 40 + r * 54, v === 1, x + '-' + r));
    const R = dir === 'rtl' ? 150 : 50, L = dir === 'rtl' ? 50 : 150;
    return (
      <svg className="ilc-opele" viewBox="0 0 200 250" aria-label="Ọ̀pẹ̀lẹ̀ divining chain">
        <path d={`M${L} 18 Q100 -10 ${R} 18`} className="ilc-opele__cord" />
        <path d={`M${L} 18 L${L} 220 M${R} 18 L${R} 220`} className="ilc-opele__cord" />
        {strand(right, R)}{strand(left, L)}
        <text x={R} y="246" textAnchor="middle">right</text>
        <text x={L} y="246" textAnchor="middle">left</text>
      </svg>
    );
  }
  function Composer({ dir, sound }) {
    const [r, setR] = useState(2), [l, setL] = useState(1);
    const [casting, setCasting] = useState(false);
    const iv = useRef(null);
    useEffect(() => () => clearInterval(iv.current), []);
    const cast = () => {
      if (casting) return;
      setCasting(true);
      let n = 0;
      iv.current = setInterval(() => {
        const a = Math.floor(Math.random() * 16), b = Math.floor(Math.random() * 16);
        setR(a); setL(b); n++;
        if (n >= 12) { clearInterval(iv.current); setCasting(false); playMarks([...ODU[a].m, ...ODU[b].m], sound); }
      }, 70);
    };
    const byte = valOf(ODU[r].m) * 16 + valOf(ODU[l].m);
    const legR = <div className="ilc-leg"><Glyph marks={ODU[r].m} kind="ink-dots" h={150} /><span>right leg · {nameOf(r)}</span></div>;
    const legL = <div className="ilc-leg"><Glyph marks={ODU[l].m} kind="ink-dots" h={150} /><span>left leg · {nameOf(l)}</span></div>;
    return (
      <section className="ilc-sec" id="ilc-compose">
        <div className="ilc-sec__head">
          <span className="ilc-kicker">03 · Composer</span>
          <h2>Two Meta-Characters write any of the 256 Odù</h2>
          <p>Set two Characters side by side, as the two legs are marked on the Opọ́n: the right leg on the right, the left leg on the left. Eight marks, 256 patterns: the same count as one digital byte.</p>
        </div>
        <div className="ilc-compose">
          <div className="ilc-compose__pickers">
            <div><h4>Right leg</h4><Picker value={r} onPick={setR} dir={dir} kind="dots" small /></div>
            <div><h4>Left leg</h4><Picker value={l} onPick={setL} dir={dir} kind="dots" small /></div>
            <button className="ilc-btn ilc-btn--gold" onClick={cast} disabled={casting}>{casting ? 'Casting…' : 'Cast the Ọ̀pẹ̀lẹ̀'}</button>
          </div>
          <div className={'ilc-compose__out' + (casting ? ' is-casting' : '')}>
            <div className="ilc-legs">{legL}{legR}</div>
            <div className="ilc-compose__name">{compositeName(r, l)}</div>
            <div className="ilc-compose__facts">
              <span><b>{oi(ODU[r].m)} {oi(ODU[l].m)}</b> IfaBits</span>
              <span><b>{byte}</b> of 0–255</span>
              <span><b>0x{byte.toString(16).toUpperCase().padStart(2, '0')}</b> hex</span>
            </div>
          </div>
          <Opele right={ODU[r].m} left={ODU[l].m} dir="rtl" />
        </div>
      </section>
    );
  }

  // ── 4 · Write with Meta-Characters (text ⇄ IfaLang) ─────────
  const enc = new TextEncoder(), dec = new TextDecoder('utf-8', { fatal: false });
  function Writer({ dir, kind, sound }) {
    const [text, setText] = useState('Ifá');
    const [typed, setTyped] = useState([]);       // keyboard: a list of nibble values
    const [copied, setCopied] = useState(false);
    const bytes = useMemo(() => Array.from(enc.encode(text)).slice(0, 96), [text]);
    const names = bytes.map(b => compositeName(idxOf(fromVal(b >> 4)), idxOf(fromVal(b & 15)))).join(' · ');
    const copy = () => {
      try { navigator.clipboard.writeText(names).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1400); }); } catch (e) { /* clipboard unavailable */ }
    };
    const typedBytes = [];
    for (let k = 0; k + 1 < typed.length; k += 2) typedBytes.push(typed[k] * 16 + typed[k + 1]);
    const decoded = dec.decode(new Uint8Array(typedBytes));
    const press = i => { setTyped(t => [...t, valOf(ODU[i].m)].slice(-128)); playMarks(ODU[i].m, sound); };
    const presets = [['Ifá', 'Ifá'], ['Àṣẹ', 'Àṣẹ'], ['Ilé-Ifẹ̀', 'Ilé-Ifẹ̀'], ['IFA Internet', 'IFA Internet']];
    return (
      <section className="ilc-sec ilc-sec--alt" id="ilc-write">
        <div className="ilc-sec__head">
          <span className="ilc-kicker">04 · Write</span>
          <h2>Write any message in Meta-Characters</h2>
          <p>Each letter is stored as bytes, and each byte is one of the 256 Odù: two Meta-Characters, read right to left. Type a message to encode it, or tap the keyboard to write Odù and read the message back.</p>
        </div>
        <div className="ilc-write">
          <div className="ilc-panel">
            <h4>Encode</h4>
            <input className="ilc-input" value={text} onChange={e => setText(e.target.value)} maxLength={48} aria-label="Message to encode" />
            <div className="ilc-presets">{presets.map(([v, t]) => <button key={v} className="ilc-chip" onClick={() => setText(v)}>{t}</button>)}</div>
            <div className="ilc-script" dir={dir}>
              {bytes.map((b, k) => (
                <span key={k} className="ilc-script__byte" title={compositeName(idxOf(fromVal(b >> 4)), idxOf(fromVal(b & 15)))} dir={dir}>
                  <Glyph marks={fromVal(b >> 4)} kind={'ink-' + kind} h={44} />
                  <Glyph marks={fromVal(b & 15)} kind={'ink-' + kind} h={44} />
                </span>
              ))}
            </div>
            <div className="ilc-names">{bytes.length} Odù: {names}</div>
            <button className="ilc-btn ilc-btn--sm" onClick={copy}>{copied ? 'Copied' : 'Copy Odù names'}</button>
          </div>
          <div className="ilc-panel">
            <h4>IfaLang keyboard</h4>
            <div className="ilc-kbd" dir={dir}>
              {ODU.map((o, i) => (
                <button key={i} className="ilc-key" onClick={() => press(i)} title={o.n} dir="ltr">
                  <Glyph marks={o.m} kind={'ink-' + kind} h={38} /><span>{o.n}</span>
                </button>
              ))}
            </div>
            <div className="ilc-typed" dir={dir}>
              {typed.length === 0 && <span className="ilc-muted" dir="ltr">Tap two keys for each letter (right leg, then left leg). Try Òtúrá, Ìwòrì · Òdí, Òdí · Òdí, Ògúndá to spell “Ifa”.</span>}
              {typed.map((v, k) => <Glyph key={k} marks={fromVal(v)} kind={'ink-' + kind} h={30} tone={k % 2 ? 'b' : 'a'} />)}
            </div>
            <div className="ilc-decoded"><span>Reads:</span> <b>{decoded || '…'}</b>{typed.length % 2 === 1 && <em> (waiting for the left leg)</em>}</div>
            <div className="ilc-row-btns">
              <button className="ilc-btn ilc-btn--sm" onClick={() => setTyped(t => t.slice(0, -1))}>Delete</button>
              <button className="ilc-btn ilc-btn--sm" onClick={() => setTyped([])}>Clear</button>
              <button className="ilc-btn ilc-btn--sm" onClick={() => setTyped(bytes.flatMap(b => [b >> 4, b & 15]))}>Load the encoded message</button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ── 5 · Quiz ────────────────────────────────────────────────
  function shuffle(a) { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; }
  function newQ(mode) {
    const ans = Math.floor(Math.random() * 16);
    const opts = shuffle([ans, ...shuffle([...Array(16).keys()].filter(x => x !== ans)).slice(0, 3)]);
    const src = mode === 'partner' ? idxOf(partner(ODU[ans].m)) : ans;
    return { ans, opts, src };
  }
  function Quiz({ kind, sound }) {
    const [mode, setMode] = useState('name');
    const [q, setQ] = useState(() => newQ('name'));
    const [picked, setPicked] = useState(null);
    const [score, setScore] = useState({ right: 0, total: 0 });
    const [best, setBest] = useState(() => store.get('best', 0));
    const [streak, setStreak] = useState(0);
    const next = (m = mode) => { setQ(newQ(m)); setPicked(null); };
    const choose = i => {
      if (picked != null) return;
      setPicked(i);
      const ok = i === q.ans;
      setScore(s => ({ right: s.right + (ok ? 1 : 0), total: s.total + 1 }));
      const st = ok ? streak + 1 : 0; setStreak(st);
      if (st > best) { setBest(st); store.set('best', st); }
      if (ok) playMarks(ODU[q.ans].m, sound);
    };
    return (
      <section className="ilc-sec" id="ilc-quiz">
        <div className="ilc-sec__head">
          <span className="ilc-kicker">05 · Practice</span>
          <h2>{mode === 'name' ? 'Name that Character' : 'Find the partner'}</h2>
          <Seg value={mode} onChange={m => { setMode(m); next(m); }} label="Quiz mode" options={[['name', 'Name it'], ['partner', 'Find the partner']]} />
        </div>
        <div className="ilc-quiz">
          <div className="ilc-quiz__q">
            {mode === 'partner' && <p className="ilc-muted">Which Odù is the partner of <b>{nameOf(q.src)}</b>?</p>}
            <div className="ilc-tile ilc-tile--navy ilc-tile--big"><Glyph marks={ODU[q.src].m} kind={kind === 'lines' ? 'lines' : 'dots'} h={170} /></div>
          </div>
          <div className="ilc-quiz__opts">
            {q.opts.map(i => {
              const st = picked == null ? '' : i === q.ans ? ' is-right' : i === picked ? ' is-wrong' : ' is-dim';
              return (
                <button key={i} className={'ilc-opt' + st} onClick={() => choose(i)}>
                  {mode === 'partner' && <Glyph marks={ODU[i].m} kind="ink-dots" h={40} />}
                  <span>{nameOf(i)}</span>
                </button>
              );
            })}
            <div className="ilc-quiz__bar">
              <span>Score <b>{score.right}/{score.total}</b></span>
              <span>Streak <b>{streak}</b></span>
              <span>Best <b>{best}</b></span>
              <button className="ilc-btn ilc-btn--gold" onClick={() => next()} disabled={picked == null}>Next</button>
            </div>
            {picked != null && (
              <p className="ilc-explain">
                {picked === q.ans ? 'Correct. ' : `It is ${nameOf(q.ans)}. `}
                {mode === 'partner' ? `${nameOf(q.src)} ${partnerRule(ODU[q.src].m) === 'invert' ? 'inverted' : 'turned upside down'} gives ${nameOf(q.ans)}.` : `Marks ${bits(ODU[q.ans].m).map(b => (b ? 'I' : 'II')).join(' · ')}.`}
              </p>
            )}
          </div>
        </div>
      </section>
    );
  }

  // ── 6 · The sixteen, and downloads ──────────────────────────
  function AllSixteen({ dir }) {
    return (
      <section className="ilc-sec ilc-sec--alt" id="ilc-all">
        <div className="ilc-sec__head">
          <span className="ilc-kicker">06 · Reference</span>
          <h2>The 16 Meta-Characters</h2>
          <p>{dir === 'rtl' ? 'Read right to left, from Ogbè to Òfún, as Ifá is read.' : 'Shown left to right, from Ogbè to Òfún.'}</p>
        </div>
        <div className="ilc-grid" dir={dir}>
          {ODU.map((o, i) => <div key={i} dir="ltr"><MetaCard i={i} dir={dir} size="md" /></div>)}
        </div>
        <div className="ilc-sizes">
          {[32, 20, 14].map(px => (
            <div key={px} className="ilc-sizes__row" dir={dir}><small dir="ltr">{px} px</small>{ODU.map((o, i) => <Glyph key={i} marks={o.m} kind="ink-dots" h={px} />)}</div>
          ))}
        </div>
      </section>
    );
  }
  const SHEETS = [
    ['ifalang-characters-rtl.jpg', 'The 16 Characters · right to left'],
    ['ifalang-characters-ltr.jpg', 'The 16 Characters · left to right'],
    ['ifalang-symbols-lines.jpg', 'IfaLang symbols · Odù marks'],
    ['ifalang-symbols-dots.jpg', 'IfaLang symbols · dots'],
  ];
  function Downloads() {
    return (
      <section className="ilc-sec" id="ilc-downloads">
        <div className="ilc-sec__head">
          <span className="ilc-kicker">07 · Downloads</span>
          <h2>The design sheets</h2>
        </div>
        <div className="ilc-sheets">
          {SHEETS.map(([f, t]) => (
            <a key={f} className="ilc-sheet" href={'./images/characters/' + f} download>
              <img src={'./images/characters/thumb-' + f} alt={t} loading="lazy" />
              <span>{t}</span><small>JPG · download</small>
            </a>
          ))}
        </div>
        <p className="ilc-keywords"><span>Keywords</span> Ifa-Orisa Metacharacter · IfaLang · Èdè Ọ̀pẹ̀</p>
      </section>
    );
  }

  // ── The lab ─────────────────────────────────────────────────
  function IfaCharactersLab() {
    const [dir, setDir] = useState(() => store.get('dir', 'rtl'));
    const [kind, setKind] = useState(() => store.get('kind', 'dots'));
    const [sound, setSound] = useState(() => store.get('sound', false));
    useEffect(() => store.set('dir', dir), [dir]);
    useEffect(() => store.set('kind', kind), [kind]);
    useEffect(() => store.set('sound', sound), [sound]);
    const og = ODU[0].m, oy = ODU[1].m;
    const rootRef = useRef(null);
    useEffect(() => {
      // keep the toolbar just below the site's sticky header
      const fit = () => {
        const h = document.querySelector('.header');
        const top = h && getComputedStyle(h).position === 'sticky' ? h.getBoundingClientRect().height : 0;
        if (rootRef.current) rootRef.current.style.setProperty('--ilc-top', Math.round(top) + 'px');
      };
      fit(); window.addEventListener('resize', fit);
      return () => window.removeEventListener('resize', fit);
    }, []);
    return (
      <div className="ilc" ref={rootRef}>
        <header className="ilc-hero">
          <div className="ilc-hero__logos">
            <img src="./images/characters/cen-key.png" alt="CENProject" />
            <div className="ilc-hero__itoe"><img src="./images/characters/itoe-key.png" alt="IFA Internet" /><span>IFA Internet</span></div>
          </div>
          <img className="ilc-hero__logo" src="./images/ifalang-logo-light.svg" alt="IfaLang" />
          <h1>The 16 Characters of the <span>Ifa Language (IfaLang)</span></h1>
          <p className="ilc-hero__sub">Ifa-Orisa Communications and Networking</p>
          <div className="ilc-hero__orn" dir="rtl"><Glyph marks={og} kind="ink-dots" h={34} /><Glyph marks={oy} kind="ink-dots" h={34} /></div>
          <div className="ilc-rules">
            <div className="ilc-rule"><b>A line becomes a dot</b><span>A single mark | is written as one dot •</span></div>
            <div className="ilc-rule"><b>A double line becomes a double dot</b><span>A double mark || is written as two dots ••</span></div>
            <div className="ilc-rule"><b>Read from right to left</b><span>Each Meta-Character reads top to bottom; they run right to left, from Ogbè to Òfún, as Ifá is read.</span></div>
          </div>
        </header>
        <div className="ilc-bar">
          <nav className="ilc-bar__nav">
            {[['generate', 'Generator'], ['pairs', 'Pairs'], ['compose', '256 Odù'], ['write', 'Write'], ['quiz', 'Practice'], ['all', 'All 16'], ['downloads', 'Downloads']].map(([id, t]) => (
              <a key={id} href={'#ilc-' + id} onClick={e => { e.preventDefault(); const el = document.getElementById('ilc-' + id); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}>{t}</a>
            ))}
          </nav>
          <div className="ilc-bar__ctl">
            <Seg value={kind} onChange={setKind} label="Script style" options={[['dots', 'Dots'], ['lines', 'Lines']]} />
            <Seg value={dir} onChange={setDir} label="Direction" options={[['rtl', 'R → L'], ['ltr', 'L → R']]} />
            <button className={'ilc-seg__btn ilc-sound' + (sound ? ' is-on' : '')} onClick={() => { setSound(s => !s); if (!sound) playMarks(og, true); }} aria-pressed={sound}>
              Sound {sound ? 'on' : 'off'}
            </button>
          </div>
        </div>
        <Generator dir={dir} sound={sound} />
        <Pairs dir={dir} sound={sound} />
        <Composer dir={dir} sound={sound} />
        <Writer dir={dir} kind={kind} sound={sound} />
        <Quiz kind={kind} sound={sound} />
        <AllSixteen dir={dir} />
        <Downloads />
      </div>
    );
  }

  window.IfaCharactersLab = IfaCharactersLab;
})();
