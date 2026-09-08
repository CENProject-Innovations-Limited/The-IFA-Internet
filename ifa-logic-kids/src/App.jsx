/* ─────────────────────────────────────────────────────────────────────────────
   IfaLogic System — Kids & Teen Version
   Learn Logic the Ifa Way: Classical Logic · Quantum Logic · Ifa System
   African Indigenous Knowledge Systems (AIKS) · Natural Computation
   The IFA Internet · CENProject · ifainternet.org/ifa-logic-kids/
───────────────────────────────────────────────────────────────────────────── */
const { useState, useEffect, useRef } = React;

/* ── useWindowWidth ─────────────────────────────────────────────────────── */
function useWindowWidth() {
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return width;
}

/* ── OgbeSymbol ─────────────────────────────────────────────────────────── */
function OgbeSymbol({ size = 20 }) {
  const canvasRef = useRef(null);
  const a = size * 0.46, ccx = size / 2, ccy = size / 2, sc = a / 200, N = 80;
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const DPR = window.devicePixelRatio || 1;
    canvas.width = size * DPR; canvas.height = size * DPR;
    const ctx = canvas.getContext('2d'); ctx.scale(DPR, DPR);
    function buildLobe(t0, t1, neg) {
      const pts = [];
      for (let i = 0; i <= N; i++) {
        const t = t0 + (t1 - t0) * i / N, c2 = Math.cos(2 * t), v = neg ? -c2 : c2;
        if (v < 1e-10) continue;
        const rho = a * Math.sqrt(v);
        pts.push([ccx + rho * Math.cos(t), ccy + rho * Math.sin(t)]);
      }
      return pts;
    }
    const PI = Math.PI;
    const lobes = [buildLobe(-PI/4,PI/4,false),buildLobe(3*PI/4,5*PI/4,false),buildLobe(PI/4,3*PI/4,true),buildLobe(5*PI/4,7*PI/4,true)];
    function strokeLobe(pts, lw, rgba, blur) {
      if (!pts.length) return;
      ctx.save(); ctx.strokeStyle=rgba; ctx.lineWidth=Math.max(0.3,lw*sc);
      ctx.shadowColor=rgba; ctx.shadowBlur=blur*sc; ctx.lineCap='round'; ctx.lineJoin='round';
      ctx.beginPath(); ctx.moveTo(pts[0][0],pts[0][1]);
      for (let i=1;i<pts.length;i++) ctx.lineTo(pts[i][0],pts[i][1]);
      ctx.stroke(); ctx.restore();
    }
    ctx.clearRect(0,0,size,size);
    for (const lobe of lobes) {
      strokeLobe(lobe,44,'rgba(245,197,24,0.03)',65); strokeLobe(lobe,26,'rgba(245,197,24,0.07)',44);
      strokeLobe(lobe,15,'rgba(245,197,24,0.16)',28); strokeLobe(lobe,7,'rgba(245,197,24,0.34)',16);
      strokeLobe(lobe,3,'rgba(245,197,24,0.62)',8); strokeLobe(lobe,1.4,'rgba(245,197,24,0.90)',4);
      strokeLobe(lobe,0.7,'rgba(255,248,210,0.95)',2);
    }
    ctx.save(); ctx.shadowColor='rgba(245,197,24,1)'; ctx.shadowBlur=22*sc;
    ctx.fillStyle='rgba(255,248,210,1)'; ctx.beginPath();
    ctx.arc(ccx,ccy,Math.max(0.5,3.5*sc),0,2*Math.PI); ctx.fill(); ctx.restore();
  }, [size]);
  return <canvas ref={canvasRef} style={{display:'inline-block',verticalAlign:'bottom',width:size+'px',height:size+'px'}} aria-label="Ogbe Energy Symbol" />;
}

/* ── OyekuSymbol ─────────────────────────────────────────────────────────── */
function OyekuSymbol({ size = 20 }) {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const s = size; canvas.width = s; canvas.height = s;
    const ctx = canvas.getContext('2d');
    const cx = s/2, cy = s/2, r = s*0.36, gold = '#f5c518';
    ctx.clearRect(0,0,s,s);
    const drawLobes = (alpha, lineW) => {
      ctx.save(); ctx.globalAlpha=alpha; ctx.strokeStyle=gold; ctx.lineWidth=lineW; ctx.lineCap='round';
      for (let rot=0; rot<2; rot++) {
        ctx.beginPath();
        for (let t=0; t<=Math.PI*2; t+=0.01) {
          const scale = Math.cos(2*t)>=0 ? Math.sqrt(Math.cos(2*t)) : 0;
          const x = cx + (rot===0?1:0)*r*scale*Math.cos(t) + (rot===1?1:0)*r*scale*Math.sin(t);
          const y = cy + (rot===0?1:0)*r*scale*Math.sin(t) + (rot===1?1:0)*r*scale*Math.cos(t);
          t<0.02 ? ctx.moveTo(x,y) : ctx.lineTo(x,y);
        }
        ctx.stroke();
      }
      ctx.restore();
    };
    drawLobes(0.12, s*0.22); drawLobes(0.22, s*0.13); drawLobes(0.55, s*0.055); drawLobes(1.00, s*0.022);
    const ext = s*0.30;
    const diag = [[cx+ext,cy-ext],[cx-ext,cy+ext]];
    const drawDiag = (alpha,lineW,blur) => {
      ctx.save(); ctx.globalAlpha=alpha; ctx.strokeStyle=gold; ctx.lineWidth=lineW; ctx.lineCap='round';
      ctx.shadowColor=gold; ctx.shadowBlur=blur;
      ctx.beginPath(); ctx.moveTo(diag[0][0],diag[0][1]); ctx.lineTo(diag[1][0],diag[1][1]); ctx.stroke();
      ctx.restore();
    };
    drawDiag(0.03,s*0.20,s*0.12); drawDiag(0.07,s*0.12,s*0.08); drawDiag(0.16,s*0.07,s*0.05);
    drawDiag(0.34,s*0.03,s*0.03); drawDiag(0.62,s*0.014,s*0.015); drawDiag(0.90,s*0.007,s*0.007);
    drawDiag(0.95,s*0.003,s*0.003);
  }, [size]);
  return <canvas ref={ref} width={size} height={size}
    style={{display:'inline-block',verticalAlign:'middle',width:size+'px',height:size+'px'}} aria-label="Oyeku Anergy Symbol" />;
}

/* ── GateSVG ─────────────────────────────────────────────────────────────── */
function GateSVG({ type, color, inlineH }) {
  const lp = { stroke: color, strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' };
  const bp = { ...lp, fill: 'none' };
  const svgStyle = inlineH
    ? { height: inlineH, width: 'auto', display: 'inline', overflow: 'visible', verticalAlign: 'middle' }
    : { width: '100%', height: 'auto', display: 'block', overflow: 'visible' };
  switch (type) {
    case 'Buffer': return <svg viewBox="0 0 60 34" style={svgStyle}><line x1="0" y1="17" x2="14" y2="17" {...lp}/><polygon points="14,4 14,30 46,17" {...bp}/><line x1="46" y1="17" x2="60" y2="17" {...lp}/></svg>;
    case 'NOT': return <svg viewBox="0 0 66 34" style={svgStyle}><line x1="0" y1="17" x2="14" y2="17" {...lp}/><polygon points="14,4 14,30 43,17" {...bp}/><circle cx="46" cy="17" r="3" {...bp}/><line x1="49" y1="17" x2="66" y2="17" {...lp}/></svg>;
    case 'AND': return <svg viewBox="0 0 64 34" style={svgStyle}><line x1="0" y1="11" x2="15" y2="11" {...lp}/><line x1="0" y1="23" x2="15" y2="23" {...lp}/><path d="M15,4 L15,30 L28,30 Q45,30 45,17 Q45,4 28,4 Z" {...bp}/><line x1="45" y1="17" x2="64" y2="17" {...lp}/></svg>;
    case 'NAND': return <svg viewBox="0 0 68 34" style={svgStyle}><line x1="0" y1="11" x2="15" y2="11" {...lp}/><line x1="0" y1="23" x2="15" y2="23" {...lp}/><path d="M15,4 L15,30 L27,30 Q42,30 42,17 Q42,4 27,4 Z" {...bp}/><circle cx="45" cy="17" r="3" {...bp}/><line x1="48" y1="17" x2="68" y2="17" {...lp}/></svg>;
    case 'OR': return <svg viewBox="0 0 64 34" style={svgStyle}><line x1="0" y1="11" x2="13" y2="11" {...lp}/><line x1="0" y1="23" x2="13" y2="23" {...lp}/><path d="M13,4 L30,4 Q48,4 48,17 Q48,30 30,30 L13,30 Q20,17 13,4 Z" {...bp}/><line x1="48" y1="17" x2="64" y2="17" {...lp}/></svg>;
    case 'NOR': return <svg viewBox="0 0 68 34" style={svgStyle}><line x1="0" y1="11" x2="13" y2="11" {...lp}/><line x1="0" y1="23" x2="13" y2="23" {...lp}/><path d="M13,4 L28,4 Q45,4 45,17 Q45,30 28,30 L13,30 Q20,17 13,4 Z" {...bp}/><circle cx="48" cy="17" r="3" {...bp}/><line x1="51" y1="17" x2="68" y2="17" {...lp}/></svg>;
    case 'XOR': return <svg viewBox="0 0 68 34" style={svgStyle}><line x1="0" y1="11" x2="15" y2="11" {...lp}/><line x1="0" y1="23" x2="15" y2="23" {...lp}/><path d="M9,4 Q16,17 9,30" {...bp}/><path d="M15,4 L30,4 Q48,4 48,17 Q48,30 30,30 L15,30 Q22,17 15,4 Z" {...bp}/><line x1="48" y1="17" x2="68" y2="17" {...lp}/></svg>;
    default: return null;
  }
}

/* ── DATA ARRAYS ─────────────────────────────────────────────────────────── */
const KIDS_GATES = [
  { type:'AND',  name:'AND Gate',  emoji:'🤝', color:'#4ade80',
    analogy:'Like needing BOTH a key AND a password to unlock a safe.',
    rule:'Output YES only when BOTH inputs are YES.',
    odu:'Iwori Meji', inputs:2,
    table:[[0,0,0],[0,1,0],[1,0,0],[1,1,1]] },
  { type:'OR',   name:'OR Gate',   emoji:'🚪', color:'#fb923c',
    analogy:"A door that opens with a key OR a code — either one works!",
    rule:'Output YES when AT LEAST ONE input is YES.',
    odu:'Odi Meji', inputs:2,
    table:[[0,0,0],[0,1,1],[1,0,1],[1,1,1]] },
  { type:'NOT',  name:'NOT Gate',  emoji:'🔄', color:'#22d3ee',
    analogy:"Like a light switch — ON becomes OFF, and OFF becomes ON.",
    rule:'Flips YES to NO, and NO to YES.',
    odu:'Irosun Meji', inputs:1,
    table:[[0,1],[1,0]] },
  { type:'NAND', name:'NAND Gate', emoji:'⚡', color:'#f472b6',
    analogy:'Opposite of AND — says NO only when BOTH inputs are YES.',
    rule:'Output NO only when BOTH inputs are YES — otherwise YES.',
    odu:'Owonrin Meji', inputs:2,
    table:[[0,0,1],[0,1,1],[1,0,1],[1,1,0]] },
  { type:'NOR',  name:'NOR Gate',  emoji:'🌙', color:'#a78bfa',
    analogy:'Opposite of OR — only YES when everything is quiet (both NO).',
    rule:'Output YES only when BOTH inputs are NO.',
    odu:'Obara Meji', inputs:2,
    table:[[0,0,1],[0,1,0],[1,0,0],[1,1,0]] },
  { type:'XOR',  name:'XOR Gate',  emoji:'🎭', color:'#60a5fa',
    analogy:'The "exclusive" gate — exactly ONE must say YES, not both.',
    rule:'Output YES when inputs are DIFFERENT from each other.',
    odu:'Okanran Meji', inputs:2,
    table:[[0,0,0],[0,1,1],[1,0,1],[1,1,0]] },
];

const ODU_PATTERNS = [
  { name:'Ejiogbe',       rows:['II','II','II','II'], color:'#fbbf24', gate:'Ejiogbe Gate',  meaning:'All Energy — the fullest YES' },
  { name:'Oyeku Meji',    rows:['I','I','I','I'],     color:'#94a3b8', gate:'Oyeku Gate',    meaning:'All Void — the total NO' },
  { name:'Iwori Meji',    rows:['I','II','II','I'],   color:'#4ade80', gate:'AND Gate',      meaning:'Both together — Conjunction' },
  { name:'Odi Meji',      rows:['II','I','I','II'],   color:'#fb923c', gate:'OR Gate',       meaning:'Either one — Disjunction' },
  { name:'Irosun Meji',   rows:['II','II','I','I'],   color:'#22d3ee', gate:'NOT Gate',      meaning:'The flip — Negation' },
  { name:'Owonrin Meji',  rows:['I','I','II','II'],   color:'#f472b6', gate:'NAND Gate',     meaning:'Not-Both — Non-Conjunction' },
  { name:'Obara Meji',    rows:['II','I','I','I'],    color:'#a78bfa', gate:'NOR Gate',      meaning:'Neither — Non-Disjunction' },
  { name:'Okanran Meji',  rows:['I','I','I','II'],    color:'#60a5fa', gate:'XOR Gate',      meaning:'One or the other — Exclusive' },
  { name:'Ogunda Meji',   rows:['II','II','II','I'],  color:'#38bdf8', gate:'Quantum-X',     meaning:'The quantum flip gate' },
  { name:'Osa Meji',      rows:['I','II','II','II'],  color:'#e879f9', gate:'Quantum-Y',     meaning:'The quantum phase gate' },
  { name:'Ika Meji',      rows:['I','II','I','I'],    color:'#c084fc', gate:'Quantum-Z',     meaning:'The quantum Z gate' },
  { name:'Oturupon Meji', rows:['I','I','II','I'],    color:'#fbbf24', gate:'Hadamard',      meaning:'The quantum balance gate' },
  { name:'Otura Meji',    rows:['II','I','II','II'],  color:'#34d399', gate:'S-Gate',        meaning:'The quantum phase shift' },
  { name:'Irete Meji',    rows:['II','II','I','II'],  color:'#fb923c', gate:'T-Gate',        meaning:'The quantum T gate' },
  { name:'Ose Meji',      rows:['II','I','II','I'],   color:'#d8b4fe', gate:'IfaX Gate',     meaning:'The universal energy gate' },
  { name:'Ofun Meji',     rows:['I','II','I','II'],   color:'#c4b5fd', gate:'IfaX Dual',     meaning:'The universal dual gate' },
];

const AIKS_SYSTEMS = [
  { name:'Ifa Divination', region:'Nigeria & Benin Republic', color:'#fbbf24', emoji:'🌟',
    desc:'The most complex African divination system. Ifa uses 16 primary Odu combined to make 256 sacred patterns — a binary system that predates modern computers by centuries.',
    fact:'' },
  { name:'Fa / Fà Divination', region:'Benin, Togo & Ghana', color:'#fb923c', emoji:'🔥',
    desc:'The West African cousin of Ifa. Used by the Fon, Ewe, and related peoples. Fa shares the same 256-pattern binary structure as Ifa and is practiced across coastal West Africa.',
    fact:'' },
  { name:'Sikidy / Vintana', region:'Madagascar', color:'#4ade80', emoji:'⭐',
    desc:'A remarkable binary divination system from Madagascar, transmitted by Arabized Africans. Sikidy generates patterns using binary column arithmetic — a complete binary computing system.',
    fact:'' },
  { name:'Sand Divination / Geomancy', region:'Across Africa & the World', color:'#22d3ee', emoji:'🏜️',
    desc:'Ancient sand divination spread from Africa across the Arab world and into Europe. Binary YES/NO marks drawn in sand are decoded into patterns — the same principle as modern computers.',
    fact:'' },
  { name:'Bamana Dà (Sand Divination)', region:'Mali & West Africa', color:'#f472b6', emoji:'🎭',
    desc:"The Bamana and Mande peoples of Mali use binary sand marks in a system called Dà. This sophisticated geomantic system uses the same mathematical structure as binary computing.",
    fact:'' },
];

const QUIZ_QUESTIONS = [
  { q:'What does an AND gate output?',
    options:['YES if at least ONE input is YES','YES only if BOTH inputs are YES','Always YES','The opposite of the input'],
    ans:1, color:'#4ade80',
    fact:'AND is like needing BOTH a key AND a password — both conditions must be true to get a YES!' },
  { q:'In Ifa, which symbol means Energy, YES, or 1?',
    options:['Oyeku (two marks)','Odi','Ogbe (one mark)','Iwori'],
    ans:2, color:'#fbbf24',
    fact:'Ogbe (a single mark) represents Energy, YES, and the number 1 — the active creative force!' },
  { q:'How many complete Odu Ifa patterns are there?',
    options:['16','64','256','512'],
    ans:2, color:'#a78bfa',
    fact:'16 × 16 = 256 Odu! Each pair of the 16 primary Odu creates one of the 256 complete patterns — like 8-bit binary has 256 possible values (2⁸ = 256)!' },
  { q:'What does a NOT gate do?',
    options:['Combines two inputs together','Flips YES to NO and NO to YES','Outputs YES only when both inputs agree','Makes the signal stronger'],
    ans:1, color:'#22d3ee',
    fact:'NOT is the logical flip — like a light switch: ON becomes OFF, and OFF becomes ON!' },
  { q:'Which continent is the homeland of Ifa divination?',
    options:['Asia','Europe','South America','Africa'],
    ans:3, color:'#fb923c',
    fact:"Ifa was born in Yorubaland, West Africa — in modern-day Nigeria and Benin Republic. It is one of humanity's oldest knowledge systems!" },
  { q:'What is the Yoruba word for Logic?',
    options:['Amulu','Àrògún','Ogbe','Oyeku'],
    ans:1, color:'#fbbf24',
    fact:'Àrògún is the Yoruba word for Logic! IfaLogic is called Àrògúnfá and OrisaLogic is Àrògúnòòṣà in Yoruba.' },
  { q:'An XOR gate outputs YES when...',
    options:['Both inputs are YES','Both inputs are NO','Inputs are DIFFERENT from each other','All inputs are the same'],
    ans:2, color:'#60a5fa',
    fact:"XOR means \"eXclusive OR\" — exactly ONE input must be YES, but NOT both. If they're the same (both YES or both NO), the output is NO!" },
  { q:'What is OrisaLogic?',
    options:['The same as IfaLogic','The Dual (opposite) of IfaLogic','A type of mathematics','An unrelated system'],
    ans:1, color:'#4ade80',
    fact:'OrisaLogic is the exact dual of IfaLogic — like day and night, energy and void. Together they form the complete logical universe of the 256 Odu Ifa!' },
];

/* ── OduRowMark ──────────────────────────────────────────────────────────── */
function OduRowMark({ row, color }) {
  if (row === 'II') {
    // Ogbe — ONE mark bar, bright color
    return (
      <div className="k-pattern-row">
        <span className="k-mark" style={{ background: color, boxShadow: `0 0 6px ${color}55` }} />
      </div>
    );
  }
  // Oyeku — TWO mark bars side by side, muted gray
  return (
    <div className="k-pattern-row">
      <span className="k-mark" style={{ background: '#475569' }} />
      <span className="k-mark" style={{ background: '#475569' }} />
    </div>
  );
}

/* ── GateSimulator ───────────────────────────────────────────────────────── */
function computeGate(type, inputs) {
  const [a, b] = inputs;
  switch (type) {
    case 'AND':  return (a === 1 && b === 1) ? 1 : 0;
    case 'OR':   return (a === 1 || b === 1) ? 1 : 0;
    case 'NOT':  return a === 1 ? 0 : 1;
    case 'NAND': return (a === 1 && b === 1) ? 0 : 1;
    case 'NOR':  return (a === 1 || b === 1) ? 0 : 1;
    case 'XOR':  return a !== b ? 1 : 0;
    default:     return 0;
  }
}

function GateSimulator({ gate }) {
  const initInputs = gate.inputs === 1 ? [0] : [0, 0];
  const [inputs, setInputs] = useState(initInputs);
  const output = computeGate(gate.type, inputs);

  function toggleInput(idx) {
    setInputs(prev => prev.map((v, i) => i === idx ? (v === 0 ? 1 : 0) : v));
  }

  const labels = ['A', 'B'];

  return (
    <div>
      <div className="k-gate-card__rule">{gate.rule}</div>
      <div className="k-gate-card__analogy">{gate.analogy}</div>
      <div className="k-sim">
        <div className="k-sim__inputs">
          {inputs.map((val, idx) => (
            <button
              key={idx}
              className={`k-sim__in-btn${val === 1 ? ' active' : ''}`}
              style={val === 1 ? { borderColor: gate.color, color: gate.color } : {}}
              onClick={() => toggleInput(idx)}
            >
              <span className="k-sim__in-label">{labels[idx]}</span>
              <span>{val}</span>
            </button>
          ))}
        </div>
        <div className="k-sim__diagram">
          <GateSVG type={gate.type} color={gate.color} />
        </div>
        <span className="k-sim__arrow">→</span>
        <div className={`k-sim__output${output === 1 ? ' on' : ''}`}
          style={output === 1 ? { borderColor: gate.color, color: gate.color, boxShadow: `0 0 14px ${gate.color}55` } : {}}>
          {output}
        </div>
      </div>
      <table className="k-gate-card__truth">
        <thead>
          <tr>
            {gate.inputs === 2 && <th>A</th>}
            <th>{gate.inputs === 2 ? 'B' : 'IN'}</th>
            <th>OUT</th>
          </tr>
        </thead>
        <tbody>
          {gate.table.map((row, ri) => (
            <tr key={ri}>
              {gate.inputs === 2 && (
                <td className={row[0] === 1 ? 'td-one' : 'td-zero'}>{row[0]}</td>
              )}
              <td className={row[gate.inputs === 2 ? 1 : 0] === 1 ? 'td-one' : 'td-zero'}>
                {row[gate.inputs === 2 ? 1 : 0]}
              </td>
              <td className={row[row.length - 1] === 1 ? 'td-one' : 'td-zero'}>
                {row[row.length - 1]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ── KidsNav ─────────────────────────────────────────────────────────────── */
function KidsNav() {
  return (
    <nav className="k-nav">
      <a href="#top" className="k-nav__brand">
        <span className="acc-violet">IfaLogic</span>{' '}
        <span style={{ color: '#f0f4ff' }}>System</span>
      </a>
      <span className="k-nav__badge">Students · Ages 8+</span>
      <div className="k-nav__links">
        <a href="#what-is-logic" className="k-nav__link">Logic</a>
        <a href="#two-powers"    className="k-nav__link">Ogbe & Oyeku</a>
        <a href="#gates"         className="k-nav__link">Gates</a>
        <a href="#patterns"      className="k-nav__link">Odu</a>
        <a href="#africa"        className="k-nav__link">Africa</a>
        <a href="#aiks"          className="k-nav__link">AIKS</a>
        <a href="#quiz"          className="k-nav__link">Quiz</a>
      </div>
      <a href="/ifa-logic/" className="k-nav__back">← IfaLogic</a>
    </nav>
  );
}

/* ── KidsHero ────────────────────────────────────────────────────────────── */
function KidsHero() {
  function scrollTo(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <section className="k-hero" id="top">
      <div className="k-hero__bg">
        <div className="k-hero__blob k-hero__blob--1" />
        <div className="k-hero__blob k-hero__blob--2" />
        <div className="k-hero__blob k-hero__blob--3" />
      </div>
      <div className="k-hero__inner">
        <div className="k-hero__symbol-col">
          <div className="k-hero__symbol-wrap">
            <div className="k-hero__symbol-glow" />
            <OgbeSymbol size={200} />
          </div>
        </div>
        <div className="k-hero__text">
          <div className="k-hero__eyebrow">IfaLogic System · The IFA Internet</div>
          <h1 className="k-hero__title">
            Learn Logic the{' '}
            <span className="acc-gold">Ifa Way</span>
          </h1>
          <p className="k-hero__sub">
            Discover ancient African logic — where Ifa wisdom meets modern computer science.
            From simple YES/NO to quantum gates, explore the logic of everything.
          </p>
          <div className="k-hero__tags">
            <span className="k-hero__tag">For Students · Ages 8+</span>
            <span className="k-hero__tag">Interactive Learning</span>
            <span className="k-hero__tag">African Science</span>
            <span className="k-hero__tag">Ifa & Orisa</span>
          </div>
          <div className="k-hero__btns">
            <button className="k-btn k-btn--primary" onClick={() => scrollTo('what-is-logic')}>
              Start Learning →
            </button>
            <button className="k-btn k-btn--outline" onClick={() => scrollTo('quiz')}>
              Take the Quiz
            </button>
          </div>
          <div className="k-hero__floats">
            <div className="k-hero__float">
              <span className="k-hero__float-icon">🔣</span>
              <span>Logic Gates</span>
            </div>
            <div className="k-hero__float">
              <span className="k-hero__float-icon">🌍</span>
              <span>Ifa System</span>
            </div>
            <div className="k-hero__float">
              <span className="k-hero__float-icon">💻</span>
              <span>Computing</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── WhatIsLogicSection ──────────────────────────────────────────────────── */
function WhatIsLogicSection() {
  const cards = [
    {
      icon: '🤔',
      title: 'Making Decisions',
      text: "Logic is how we decide YES or NO. Every day you use logic: 'If it's raining, take an umbrella.' That's an IF-THEN rule."
    },
    {
      icon: '💻',
      title: 'How Computers Think',
      text: 'Every computer — from your phone to a supercomputer — runs on logic gates. AND, OR, NOT — these simple rules control ALL of computing.'
    },
    {
      icon: '🌍',
      title: 'Ancient African Science',
      text: 'Long before modern computers, Ifa priests in West Africa used a binary YES/NO system to encode all human knowledge — a remarkable feat of logical science.'
    },
  ];

  return (
    <section className="k-section" id="what-is-logic">
      <div className="k-section__inner">
        <div className="k-section__header">
          <span className="k-section__eyebrow k-section__eyebrow--violet">What is Logic?</span>
          <h2 className="k-section__title">Thinking Clearly — the Power of Logic</h2>
        </div>
        <div className="k-concept-grid">
          {cards.map((c, i) => (
            <div className="k-concept-card" key={i}>
              <div className="k-concept-card__icon">{c.icon}</div>
              <div className="k-concept-card__title">{c.title}</div>
              <p className="k-concept-card__text">{c.text}</p>
            </div>
          ))}
        </div>
        <div className="k-fact-box">
          🌟 <strong>Did You Know?</strong> The binary system (0s and 1s) that powers ALL modern computers
          was found in African divination systems <strong>BEFORE</strong> Leibniz invented binary arithmetic
          in 1679!
        </div>
      </div>
    </section>
  );
}

/* ── TwoPowersSection ────────────────────────────────────────────────────── */
function TwoPowersSection() {
  const ogbeTags = ['Energy', 'YES', '1', 'ON', 'Light', 'Active'];
  const oyekuTags = ['Void', 'NO', '0', 'OFF', 'Dark', 'Rest'];

  return (
    <section className="k-section--alt" id="two-powers">
      <div className="k-section__inner">
        <div className="k-section__header">
          <span className="k-section__eyebrow k-section__eyebrow--gold">The Two Fundamental Powers</span>
          <h2 className="k-section__title">Ogbe & Oyeku — YES and NO</h2>
        </div>
        <div className="k-powers-row">
          <div className="k-power-card k-power-card--ogbe">
            <OgbeSymbol size={90} />
            <div className="k-power-card__name acc-gold">Ogbe</div>
            <div className="k-power-card__tags">
              {ogbeTags.map(t => (
                <span key={t} className="k-power-card__tag" style={{ borderColor: 'rgba(251,191,36,0.25)', color: '#fbbf24' }}>{t}</span>
              ))}
            </div>
            <p className="k-power-card__desc">
              Ogbe is the Energy state — the positive, active force of Ifa. In logic, Ogbe represents
              YES (true, 1). In a computer, it's the ON state — current flowing. In nature, it's
              light, movement, and creation.
            </p>
          </div>
          <div className="k-power-card k-power-card--oyeku">
            <OyekuSymbol size={90} />
            <div className="k-power-card__name" style={{ background: 'linear-gradient(135deg, #94a3b8, #64748b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Oyeku</div>
            <div className="k-power-card__tags">
              {oyekuTags.map(t => (
                <span key={t} className="k-power-card__tag">{t}</span>
              ))}
            </div>
            <p className="k-power-card__desc">
              Oyeku is the Void state — the restful, receptive force of Ifa. In logic, Oyeku represents
              NO (false, 0). In a computer, it's the OFF state — no current. In nature, it's night,
              silence, and potential.
            </p>
          </div>
        </div>
        <div className="k-powers-bridge">
          🔗 <strong>Together: The Foundation of All Logic</strong> — Just like computers use only 0 and 1
          to express ALL information, Ifa uses only Ogbe and Oyeku to encode ALL wisdom. This is the
          power of binary thinking!
        </div>
      </div>
    </section>
  );
}

/* ── InteractiveGatesSection ─────────────────────────────────────────────── */
function InteractiveGatesSection() {
  return (
    <section className="k-section" id="gates">
      <div className="k-section__inner">
        <div className="k-section__header">
          <span className="k-section__eyebrow k-section__eyebrow--lime">The 6 Classical Logic Gates</span>
          <h2 className="k-section__title">Try the Gates — Click to Toggle!</h2>
          <p className="k-section__sub">
            Click the A and B input buttons to toggle between 0 (NO) and 1 (YES).
            Watch the output change!
          </p>
        </div>
        <div className="k-gates-grid">
          {KIDS_GATES.map((gate, i) => (
            <div className="k-gate-card" key={i} style={{ borderColor: `${gate.color}28` }}>
              <div className="k-gate-card__header" style={{ borderBottomColor: `${gate.color}18` }}>
                <span className="k-gate-card__emoji">{gate.emoji}</span>
                <span className="k-gate-card__hname" style={{ color: gate.color }}>{gate.name}</span>
                <span className="k-gate-card__odu">{gate.odu}</span>
              </div>
              <div className="k-gate-card__body">
                <GateSimulator gate={gate} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── OduPatternsSection ──────────────────────────────────────────────────── */
function OduPatternsSection() {
  return (
    <section className="k-section--dark" id="patterns">
      <div className="k-section__inner">
        <div className="k-section__header">
          <span className="k-section__eyebrow k-section__eyebrow--violet">The 16 Odu Ifa Patterns</span>
          <h2 className="k-section__title">The 16 Sacred Patterns of Logic</h2>
          <p className="k-section__sub">
            In Ifa, these 16 primary patterns (called Odu) combine to make 256 complete patterns —
            just like 16 binary digits can encode 256 unique values.
          </p>
        </div>
        <div className="k-patterns-grid">
          {ODU_PATTERNS.map((p, i) => (
            <div className="k-pattern-card" key={i} style={{ borderColor: `${p.color}28` }}>
              <div className="k-pattern-marks">
                {p.rows.map((row, ri) => (
                  <OduRowMark key={ri} row={row} color={p.color} />
                ))}
              </div>
              <div className="k-pattern-card__name" style={{ color: p.color }}>{p.name}</div>
              <div className="k-pattern-card__gate">{p.gate}</div>
              <div className="k-pattern-card__meaning">{p.meaning}</div>
            </div>
          ))}
        </div>
        <div className="k-patterns-info">
          <strong>The Math of 256:</strong> 16 primary Odu × 16 = 256 total Odu Ifa. In binary:
          4 binary digits can make 16 values (2⁴ = 16). Combine two 4-bit patterns → 8-bit →
          256 values (2⁸ = 256). <strong>The same math!</strong>
        </div>
      </div>
    </section>
  );
}

/* ── AfricaComputerSection ───────────────────────────────────────────────── */
function AfricaComputerSection() {
  const steps = [
    { num: '1', title: '4 Binary Marks', desc: 'Each Odu row is either Ogbe (1) or Oyeku (0) — a single binary digit' },
    { num: '2', title: '4 Rows = 16 Patterns', desc: '4 binary digits create 2⁴ = 16 primary Odu' },
    { num: '3', title: 'Pair Two Odu', desc: 'Combining two primary Odu creates one complete Odu' },
    { num: '4', title: '16 × 16 = 256', desc: '256 complete Odu Ifa — the complete library of knowledge' },
  ];

  return (
    <section className="k-section--alt" id="africa">
      <div className="k-section__inner">
        <div className="k-section__header">
          <span className="k-section__eyebrow k-section__eyebrow--gold">Africa's Ancient Computer</span>
          <h2 className="k-section__title">Ifa — The World's Oldest Computing System</h2>
        </div>
        <div className="k-africa-cols">
          <div className="k-africa-text">
            <p>
              Thousands of years before the first electronic computer, the Yoruba people of West Africa
              developed Ifa — a sophisticated knowledge and computation system that uses the exact same
              mathematical principles as modern binary computers.
            </p>
            <p>
              Ifa priests (called Babaláwo — 'Father of Secrets') memorize the 256 Odu Ifa, each
              containing hundreds of verses. The divination process uses binary random number generation
              to select the relevant Odu — exactly like a computer's random access memory!
            </p>
            <div className="k-africa-banner">
              🏆 <strong>African First:</strong> The Yoruba binary system uses 4 rows of YES/NO marks
              (like 4 binary digits) to generate 16 patterns, combined into 256 Odu —
              preceding modern computing by millennia.
            </div>
          </div>
          <div className="k-africa-timeline">
            {steps.map((s, i) => (
              <div className="k-africa-step" key={i}>
                <div className="k-africa-step__num">{s.num}</div>
                <div className="k-africa-step__body">
                  <div className="k-africa-step__title">{s.title}</div>
                  <div className="k-africa-step__desc">{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── AfricanSystemsSection ───────────────────────────────────────────────── */
function AfricanSystemsSection() {
  return (
    <section className="k-section--dark" id="aiks">
      <div className="k-section__inner">
        <div className="k-section__header">
          <span className="k-section__eyebrow k-section__eyebrow--orange">African Knowledge Systems (AIKS)</span>
          <h2 className="k-section__title">Africa's Natural Computing Systems</h2>
          <p className="k-section__sub">
            Long before electronic computers, African cultures developed sophisticated binary-based
            knowledge systems — proving that the logic of computing is a universal African science.
          </p>
        </div>
        <div className="k-aiks-grid">
          {AIKS_SYSTEMS.map((sys, i) => (
            <div className="k-aiks-card" key={i} style={{ borderColor: `${sys.color}28` }}>
              <div className="k-aiks-card__emoji">{sys.emoji}</div>
              <div className="k-aiks-card__name" style={{ color: sys.color }}>{sys.name}</div>
              <div className="k-aiks-card__region">{sys.region}</div>
              <p className="k-aiks-card__desc">{sys.desc}</p>
              {sys.fact && (
                <div className="k-aiks-card__fact" style={{ borderLeftColor: sys.color }}>
                  {sys.fact}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="k-leibniz-box">
          <div className="k-leibniz-box__icon">🔗</div>
          <div className="k-leibniz-box__body">
            <div className="k-leibniz-box__title">The Leibniz Connection — Africa Invented Binary Computing</div>
            <p className="k-leibniz-box__text">
              In 1703, Gottfried Leibniz published his famous binary arithmetic paper — but he credited
              Chinese scholars even though Odu Ifa's Binary System is millenia older. Every time you
              use a computer, smartphone, or any digital device, you are using mathematics that traces
              directly back to African knowledge systems.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── OrisaLogicSection ───────────────────────────────────────────────────── */
function OrisaLogicSection() {
  return (
    <section className="k-section--alt" id="orisa">
      <div className="k-section__inner">
        <div className="k-section__header">
          <span className="k-section__eyebrow k-section__eyebrow--violet">The Dual System</span>
          <h2 className="k-section__title">IfaLogic & OrisaLogic — Two Sides of the Same Truth</h2>
        </div>
        <div className="k-dual-row">
          <div className="k-dual-card k-dual-card--ifa">
            <div className="k-dual-card__symbol acc-violet">∀</div>
            <div className="k-dual-card__title acc-violet">IfaLogic · Àrògúnfá</div>
            <div className="k-dual-card__sub">TOE Logic · The Logic of Everything</div>
            <p className="k-dual-card__text">
              IfaLogic is grounded in Ogbe (Energy) — the active YES state. Its universal symbol
              is ∀ ('For All'). IfaLogic covers all logical operations from the perspective of energy
              and truth. It asks: 'What is always true?'
            </p>
          </div>
          <div className="k-dual-card k-dual-card--orisa">
            <div className="k-dual-card__symbol acc-lime">∃</div>
            <div className="k-dual-card__title acc-lime">OrisaLogic · Àrògúnòòṣà</div>
            <div className="k-dual-card__sub">The Dual of IfaLogic · Existential Logic</div>
            <p className="k-dual-card__text">
              OrisaLogic is grounded in Oyeku (Void) — the receptive NO state. Its universal symbol
              is ∃ ('There Exists'). OrisaLogic is the exact dual of IfaLogic. It asks:
              'What can possibly be true?'
            </p>
          </div>
        </div>
        <div className="k-dual-bridge">
          🌀 <strong>The Duality Principle</strong> — Every truth in IfaLogic has a dual truth in
          OrisaLogic. Just like day and night, energy and void, 1 and 0 — IfaLogic and OrisaLogic
          together form the complete logical universe of the 256 Odu Ifa.
        </div>
      </div>
    </section>
  );
}

/* ── QuizSection ─────────────────────────────────────────────────────────── */
function QuizSection() {
  const [phase, setPhase] = useState('intro');   // 'intro' | 'playing' | 'done'
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null); // index of selected option
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);     // array of chosen indices

  const LETTERS = ['A', 'B', 'C', 'D'];
  const total = QUIZ_QUESTIONS.length;

  function startQuiz() {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setAnswers([]);
    setPhase('playing');
  }

  function handleSelect(optIdx) {
    if (selected !== null) return; // already answered
    setSelected(optIdx);
    const q = QUIZ_QUESTIONS[current];
    const isCorrect = optIdx === q.ans;
    if (isCorrect) setScore(prev => prev + 1);
    setAnswers(prev => [...prev, optIdx]);
  }

  function handleNext() {
    if (current + 1 >= total) {
      setPhase('done');
    } else {
      setCurrent(prev => prev + 1);
      setSelected(null);
    }
  }

  function getResultData(sc) {
    if (sc === 8) return { trophy: '🏆', title: 'Logic Master! 🏆', desc: "Perfect score! You have mastered the basics of logic, Ifa, and African computing. You're a true IfaLogic System graduate!" };
    if (sc >= 6) return { trophy: '🌟', title: 'Logic Star! 🌟', desc: "Excellent work! You understand logic gates, Ifa patterns, and African knowledge systems really well. Keep it up!" };
    if (sc >= 4) return { trophy: '📚', title: 'Logic Learner! 📚', desc: "Good effort! You're learning the foundations of logic and Ifa. Review the sections and try again — you're getting there!" };
    return { trophy: '💪', title: 'Keep Going! 💪', desc: "Don't give up! Logic takes practice. Go back through the lessons, try the gate simulators, and come back to ace this quiz!" };
  }

  function scrollToTop() {
    const el = document.getElementById('top');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  const progress = phase === 'playing' ? ((current) / total) * 100 : 0;

  return (
    <section className="k-section--dark" id="quiz">
      <div className="k-section__inner">
        <div className="k-section__header">
          <span className="k-section__eyebrow k-section__eyebrow--pink">Logic Quiz</span>
          <h2 className="k-section__title">Test Your Knowledge!</h2>
        </div>

        {phase === 'intro' && (
          <div className="k-quiz-wrap">
            <div className="k-quiz-intro">
              <div className="k-quiz-intro__icon">🧠</div>
              <div className="k-quiz-intro__title">Ready for the Logic Quiz?</div>
              <p className="k-quiz-intro__sub">
                8 questions about logic gates, Ifa systems, and African computing.
                See how much you've learned!
              </p>
              <button className="k-btn k-btn--primary" onClick={startQuiz}>
                Start Quiz →
              </button>
            </div>
          </div>
        )}

        {phase === 'playing' && (
          <div className="k-quiz-wrap">
            <div className="k-quiz-progress">
              <div
                className="k-quiz-progress__fill"
                style={{ width: `${((current + (selected !== null ? 1 : 0)) / total) * 100}%` }}
              />
            </div>
            <div className="k-quiz-card">
              <div className="k-quiz-card__qnum">Question {current + 1} of {total}</div>
              <div className="k-quiz-card__q">{QUIZ_QUESTIONS[current].q}</div>
              <div className="k-quiz-options">
                {QUIZ_QUESTIONS[current].options.map((opt, oi) => {
                  let cls = 'k-quiz-option';
                  if (selected !== null) {
                    if (oi === QUIZ_QUESTIONS[current].ans) cls += ' k-quiz-option--correct';
                    else if (oi === selected && oi !== QUIZ_QUESTIONS[current].ans) cls += ' k-quiz-option--wrong';
                  }
                  return (
                    <button
                      key={oi}
                      className={cls}
                      disabled={selected !== null}
                      onClick={() => handleSelect(oi)}
                    >
                      <span className="k-quiz-letter">{LETTERS[oi]}</span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>
              {selected !== null && (
                <div className="k-quiz-fact">
                  <strong>
                    {selected === QUIZ_QUESTIONS[current].ans ? '✅ Correct! ' : '❌ Not quite — '}
                  </strong>
                  {QUIZ_QUESTIONS[current].fact}
                </div>
              )}
            </div>
            {selected !== null && (
              <div className="k-quiz-next">
                <button className="k-btn k-btn--primary" onClick={handleNext}>
                  {current + 1 >= total ? 'See Results →' : 'Next Question →'}
                </button>
              </div>
            )}
          </div>
        )}

        {phase === 'done' && (
          <div className="k-quiz-wrap">
            {(() => {
              const rd = getResultData(score);
              return (
                <div className="k-quiz-result">
                  <div className="k-quiz-result__trophy">{rd.trophy}</div>
                  <div className="k-quiz-result__score">{score}/{total}</div>
                  <div className="k-quiz-result__label">Correct Answers</div>
                  <div className="k-quiz-result__title">{rd.title}</div>
                  <p className="k-quiz-result__desc">{rd.desc}</p>
                  <div className="k-quiz-result__btns">
                    <button className="k-btn k-btn--outline" onClick={startQuiz}>
                      Try Again
                    </button>
                    <button className="k-btn k-btn--primary" onClick={scrollToTop}>
                      Back to Top →
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </div>
    </section>
  );
}

/* ── KidsFooter ──────────────────────────────────────────────────────────── */
function KidsFooter() {
  return (
    <footer className="k-footer">
      <div className="k-footer__inner">
        <div>
          <div className="k-footer__brand">
            <span className="acc-violet">IfaLogic</span>{' '}
            <span style={{ color: '#f0f4ff' }}>System</span>
          </div>
          <div className="k-footer__copy">
            © 2026 The IFA Internet · CENProject · ifainternet.org
          </div>
        </div>
        <div className="k-footer__links">
          <a href="/ifa-logic/" className="k-footer__link">IfaLogic (Main)</a>
          <a href="https://ifainternet.org" className="k-footer__link">ifainternet.org</a>
        </div>
      </div>
    </footer>
  );
}

/* ── App ─────────────────────────────────────────────────────────────────── */
function App() {
  return (
    <div>
      <KidsNav />
      <KidsHero />
      <WhatIsLogicSection />
      <TwoPowersSection />
      <InteractiveGatesSection />
      <OduPatternsSection />
      <AfricaComputerSection />
      <AfricanSystemsSection />
      <OrisaLogicSection />
      <QuizSection />
      <KidsFooter />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
