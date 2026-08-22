/* ─────────────────────────────────────────────────────────────────────────────
   IfaQuantum Platform — App.jsx
   The IFA Internet · CENProject · ifainternet.org/ifa-quantum/
───────────────────────────────────────────────────────────────────────────── */

const { useState, useEffect } = React;

// ── useWindowWidth ──────────────────────────────────────────────────────────
function useWindowWidth() {
  const [w, setW] = useState(window.innerWidth);
  useEffect(() => {
    const h = () => setW(window.innerWidth);
    window.addEventListener('resize', h, { passive: true });
    return () => window.removeEventListener('resize', h);
  }, []);
  return w;
}

// ── BlochSphere ─────────────────────────────────────────────────────────────
function BlochSphere({ color = '#00d4ff', angle = 32 }) {
  const rad = angle * Math.PI / 180;
  const tx = 60 + 32 * Math.sin(rad);
  const ty = 60 - 32 * Math.cos(rad);
  return (
    <svg viewBox="0 0 120 120" className="iq-qubit-svg" aria-hidden="true">
      <defs>
        <radialGradient id={`qb-${color.replace('#','')}`} cx="50%" cy="38%" r="52%">
          <stop offset="0%" stopColor={color} stopOpacity="0.18"/>
          <stop offset="100%" stopColor="#030608" stopOpacity="0"/>
        </radialGradient>
      </defs>
      <ellipse cx="60" cy="60" rx="50" ry="50" fill="none" stroke={color} strokeWidth="0.8" strokeOpacity="0.22"/>
      <ellipse cx="60" cy="60" rx="50" ry="15" fill="none" stroke={color} strokeWidth="0.6" strokeDasharray="3,2" strokeOpacity="0.16"/>
      <line x1="60" y1="10" x2="60" y2="110" stroke={color} strokeWidth="0.6" strokeOpacity="0.2"/>
      <line x1="10" y1="60" x2="110" y2="60" stroke={color} strokeWidth="0.6" strokeOpacity="0.12"/>
      <line x1="60" y1="60" x2={tx} y2={ty} stroke={color} strokeWidth="2" strokeLinecap="round" strokeOpacity="0.9"/>
      <circle cx={tx} cy={ty} r="3.5" fill={color} fillOpacity="0.9"/>
      <circle cx="60" cy="10" r="3" fill="rgba(240,146,12,0.85)"/>
      <circle cx="60" cy="110" r="3" fill="rgba(139,92,246,0.6)"/>
      <ellipse cx="60" cy="60" rx="50" ry="50" fill={`url(#qb-${color.replace('#','')})`}/>
      <text x="60" y="7" textAnchor="middle" fontSize="5.5" fill="rgba(240,146,12,0.85)" fontFamily="monospace">|0⟩</text>
      <text x="60" y="119" textAnchor="middle" fontSize="5.5" fill="rgba(139,92,246,0.7)" fontFamily="monospace">|1⟩</text>
    </svg>
  );
}

// ── EntanglementSVG ─────────────────────────────────────────────────────────
function EntanglementSVG() {
  return (
    <svg viewBox="0 0 240 80" style={{width:'100%',maxWidth:'240px',display:'block'}} aria-hidden="true">
      <defs>
        <radialGradient id="eq-ga" cx="30%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.3"/>
          <stop offset="100%" stopColor="#030608" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="eq-gb" cx="70%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3"/>
          <stop offset="100%" stopColor="#030608" stopOpacity="0"/>
        </radialGradient>
      </defs>
      <ellipse cx="60" cy="40" rx="38" ry="38" fill="url(#eq-ga)" stroke="#00d4ff" strokeWidth="0.8" strokeOpacity="0.35"/>
      <ellipse cx="180" cy="40" rx="38" ry="38" fill="url(#eq-gb)" stroke="#8b5cf6" strokeWidth="0.8" strokeOpacity="0.35"/>
      <path d="M 98 30 C 120 20, 120 60, 142 50" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.2" strokeDasharray="3,2"/>
      <path d="M 98 50 C 120 40, 120 20, 142 30" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.2" strokeDasharray="3,2"/>
      <circle cx="60" cy="40" r="6" fill="#00d4ff" fillOpacity="0.85"/>
      <circle cx="180" cy="40" r="6" fill="#8b5cf6" fillOpacity="0.85"/>
      <text x="60" y="72" textAnchor="middle" fontSize="7" fill="rgba(0,212,255,0.7)" fontFamily="monospace">IfaQubit</text>
      <text x="180" y="72" textAnchor="middle" fontSize="7" fill="rgba(139,92,246,0.7)" fontFamily="monospace">OrisaQubit</text>
    </svg>
  );
}

// ── OgbeSymbol (canvas lemniscate) ──────────────────────────────────────────
function OgbeSymbol({ size = 20 }) {
  const canvasRef = React.useRef(null);
  const a = size * 0.47, ccx = size / 2, ccy = size / 2, N = 80, sc = (size * 0.47) / 200;
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
      strokeLobe(lobe,3,'rgba(245,197,24,0.62)',8);   strokeLobe(lobe,1.4,'rgba(245,197,24,0.90)',4);
      strokeLobe(lobe,0.7,'rgba(255,248,210,0.95)',2);
    }
    ctx.save(); ctx.shadowColor='rgba(245,197,24,1)'; ctx.shadowBlur=22*sc;
    ctx.fillStyle='rgba(255,248,210,1)'; ctx.beginPath();
    ctx.arc(ccx,ccy,Math.max(0.5,3.5*sc),0,2*Math.PI); ctx.fill(); ctx.restore();
  }, [size]);
  return <canvas ref={canvasRef} style={{display:'inline-block',verticalAlign:'middle',width:size+'px',height:size+'px'}} aria-label="Ogbe Energy Symbol"/>;
}

// ── OyekuSymbol ─────────────────────────────────────────────────────────────
function OyekuSymbol({ size = 20 }) {
  const ref = React.useRef(null);
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const s = size; canvas.width=s; canvas.height=s;
    const ctx = canvas.getContext('2d');
    const cx=s/2, cy=s/2, r=s*0.36, gold='#f5c518';
    ctx.clearRect(0,0,s,s);
    const drawLobes = (alpha, lineW) => {
      ctx.save(); ctx.globalAlpha=alpha; ctx.strokeStyle=gold; ctx.lineWidth=lineW; ctx.lineCap='round';
      for (let rot=0;rot<2;rot++) {
        ctx.beginPath();
        for (let t=0;t<=Math.PI*2;t+=0.01) {
          const scale = Math.cos(2*t)>=0 ? Math.sqrt(Math.cos(2*t)) : 0;
          const x = cx+(rot===0?1:0)*r*scale*Math.cos(t)+(rot===1?1:0)*r*scale*Math.sin(t);
          const y = cy+(rot===0?1:0)*r*scale*Math.sin(t)+(rot===1?1:0)*r*scale*Math.cos(t);
          t<0.02 ? ctx.moveTo(x,y) : ctx.lineTo(x,y);
        }
        ctx.stroke();
      }
      ctx.restore();
    };
    drawLobes(0.12,s*0.22); drawLobes(0.22,s*0.13); drawLobes(0.55,s*0.055); drawLobes(1.00,s*0.022);
    const ext=s*0.30, diag=[[cx+ext,cy-ext],[cx-ext,cy+ext]];
    const drawDiag = (alpha,lineW,blur) => {
      ctx.save(); ctx.globalAlpha=alpha; ctx.strokeStyle=gold; ctx.lineWidth=lineW; ctx.lineCap='round';
      ctx.shadowColor=gold; ctx.shadowBlur=blur;
      ctx.beginPath(); ctx.moveTo(diag[0][0],diag[0][1]); ctx.lineTo(diag[1][0],diag[1][1]);
      ctx.stroke(); ctx.restore();
    };
    drawDiag(0.03,s*0.20,s*0.12); drawDiag(0.07,s*0.12,s*0.08); drawDiag(0.16,s*0.07,s*0.05);
    drawDiag(0.34,s*0.03,s*0.03); drawDiag(0.62,s*0.014,s*0.015); drawDiag(0.90,s*0.007,s*0.007);
    drawDiag(0.95,s*0.003,s*0.003);
  }, [size]);
  return React.createElement('canvas',{ref,width:size,height:size,style:{display:'inline-block',verticalAlign:'middle',width:size+'px',height:size+'px'}});
}

// ── IfaNum expression components ────────────────────────────────────────────
function IfaNumOgbe({ sym, symSize='1.2rem', iconSize=11, color='var(--t1)' }) {
  return (
    <span className="inm-expr">
      <span className="inm-expr__char" style={{fontSize:symSize,color}}>{sym}</span>
      <span className="inm-expr__sub"><OgbeSymbol size={iconSize}/></span>
    </span>
  );
}
function IfaNumOyeku({ sym, symSize='1.2rem', iconSize=11, color='var(--t2)' }) {
  return (
    <span className="inm-expr">
      <span className="inm-expr__char" style={{fontSize:symSize,color}}>{sym}</span>
      <span className="inm-expr__sub"><OyekuSymbol size={iconSize}/></span>
    </span>
  );
}

// ── TradiMark ───────────────────────────────────────────────────────────────
function TradiMark({ row }) {
  return (
    <div className="inm-tm">
      <span className="inm-tm__line"/>
      {row === 'I' && <span className="inm-tm__line"/>}
    </div>
  );
}

// ── InmRevealStyles (flip-card CSS injected at mount) ───────────────────────
function InmRevealStyles() {
  useEffect(() => {
    if (document.getElementById('inm-reveal-styles')) return;
    const el = document.createElement('style');
    el.id = 'inm-reveal-styles';
    el.textContent = `
.inm-cell { padding:0!important; gap:0!important; position:relative; cursor:pointer; perspective:900px; }
@keyframes inm-cell-flash {
  0%  { box-shadow:0 0 0 rgba(255,255,255,0); }
  30% { box-shadow:0 0 32px var(--inmc,#f5c518); }
  100%{ box-shadow:0 0 0 rgba(255,255,255,0); }
}
.inm-cell--flash { animation:inm-cell-flash 0.55s ease-out; }
.inm-cell__flip { width:100%; position:relative; transform-style:preserve-3d;
  transition:transform 0.72s cubic-bezier(0.4,0.15,0.2,1); will-change:transform; }
.inm-cell--revealed .inm-cell__flip { transform:rotateY(180deg); }
.inm-cell__front { display:flex; flex-direction:column; align-items:center;
  gap:14px; padding:18px 10px 14px; width:100%; box-sizing:border-box;
  backface-visibility:hidden; -webkit-backface-visibility:hidden; }
.inm-cell__back { position:absolute; inset:0; transform:rotateY(180deg);
  backface-visibility:hidden; -webkit-backface-visibility:hidden; border-radius:12px;
  display:flex; flex-direction:column; align-items:center; justify-content:space-between;
  padding:10px 8px; box-sizing:border-box;
  background:radial-gradient(ellipse at 50% 30%,#14093a 0%,#060210 100%);
  border:1px solid rgba(245,197,24,0.20); overflow:hidden; }
.inm-cell__back::before { content:''; position:absolute; inset:0;
  background:radial-gradient(circle at 22% 18%,rgba(245,197,24,0.10) 0%,transparent 52%),
             radial-gradient(circle at 78% 82%,rgba(245,197,24,0.07) 0%,transparent 45%);
  pointer-events:none; }
.inm-cell__cue { font-size:0.55rem; font-weight:600; letter-spacing:0.06em;
  color:rgba(245,197,24,0.38); text-align:center; transition:color 0.2s; }
.inm-cell:hover .inm-cell__cue { color:rgba(245,197,24,0.70); }
.inm-cell--revealed .inm-cell__front .inm-cell__cue { visibility:hidden; }
@keyframes inm-sparkle {
  0%  { opacity:0; transform:scale(0) rotate(-15deg); }
  45% { opacity:1; transform:scale(1.4) rotate(25deg); }
  100%{ opacity:0; transform:scale(0.9) rotate(55deg); }
}
.inm-odu-sparkle { position:absolute; top:5px; right:7px;
  font-size:0.62rem; color:rgba(245,197,24,0.85); opacity:0; pointer-events:none; }
.inm-cell--revealed .inm-odu-sparkle { animation:inm-sparkle 1s ease-out 0.6s forwards; }
.inm-tm { display:flex; gap:5px; align-items:center; justify-content:center; min-width:30px; }
@keyframes inm-mark-pulse {
  0%,100%{ box-shadow:0 0 5px 2px rgba(245,197,24,0.55),0 0 14px 4px rgba(245,197,24,0.25); }
  50%    { box-shadow:0 0 9px 3px rgba(245,197,24,0.85),0 0 22px 7px rgba(245,197,24,0.45); }
}
.inm-tm__line { display:inline-block; width:7px; height:30px;
  background:linear-gradient(180deg,#ffe566 0%,#f5c518 48%,#c9960c 100%); border-radius:50px;
  box-shadow:0 0 5px 2px rgba(245,197,24,0.55),0 0 14px 4px rgba(245,197,24,0.25),inset 0 1px 0 rgba(255,240,140,0.55);
  animation:inm-mark-pulse 2.8s ease-in-out infinite; }
.inm-odu-rows { display:flex; flex-direction:column; gap:6px; align-items:center; position:relative; z-index:1; }
.inm-odu-row  { display:flex; gap:22px; align-items:center; }
@keyframes inm-glow-in { 0%{opacity:0;filter:blur(8px);} 100%{opacity:1;filter:blur(0);} }
.inm-cell--revealed .inm-odu-rows { animation:inm-glow-in 0.5s ease-out 0.65s both; }
.inm-odu-name { font-size:0.70rem; font-weight:700; letter-spacing:0.06em; color:#f5c518;
  text-align:center; text-shadow:0 0 10px rgba(245,197,24,0.8),0 0 24px rgba(245,197,24,0.4);
  position:relative; z-index:1; opacity:0; }
.inm-cell--revealed .inm-odu-name { animation:inm-glow-in 0.5s ease-out 0.85s both; }
@media(max-width:600px){
  .inm-cell__front{padding:14px 8px 10px;gap:10px;} .inm-tm__line{width:6px;height:24px;}
  .inm-odu-row{gap:14px;} .inm-odu-rows{gap:5px;} .inm-odu-name{font-size:0.62rem;}
}
@media(max-width:480px){
  .inm-cell__front{padding:12px 6px 8px;gap:8px;} .inm-tm__line{width:5px;height:20px;}
  .inm-odu-row{gap:10px;} .inm-odu-rows{gap:4px;} .inm-odu-name{font-size:0.58rem;}
}
@media(prefers-reduced-motion:reduce){
  .inm-cell__flip{transition-duration:0.01ms!important;} .inm-tm__line{animation:none;}
  .inm-cell--flash{animation:none;}
  .inm-cell--revealed .inm-odu-sparkle{animation:none;opacity:0;}
  .inm-cell--revealed .inm-odu-rows{animation:none;opacity:1;filter:none;}
  .inm-cell--revealed .inm-odu-name{animation:none;opacity:1;}
}`;
    document.head.appendChild(el);
    return () => { const s=document.getElementById('inm-reveal-styles'); if(s) s.remove(); };
  }, []);
  return null;
}

// ── IfaMatrix flip card ──────────────────────────────────────────────────────
function IfaMatrix({ name, sym, displayRows, isEnergy, color, pureSymbol, oduName }) {
  const [revealed, setRevealed] = useState(false);
  const [flash, setFlash] = useState(false);
  const handleClick = () => { setFlash(true); setTimeout(()=>setFlash(false),580); setRevealed(r=>!r); };
  const exprColor = isEnergy ? color : 'var(--t2)';
  const cellStyle = isEnergy ? { borderColor:color+'45', background:`linear-gradient(135deg,${color}11,transparent)` } : {};
  const renderArm = row => {
    if (pureSymbol) return row==='II' ? <OgbeSymbol size={18}/> : <OyekuSymbol size={18}/>;
    return row==='II'
      ? <IfaNumOgbe sym={sym} symSize="1rem" iconSize={11} color={exprColor}/>
      : <IfaNumOyeku sym={sym} symSize="1rem" iconSize={11}/>;
  };
  const cls = ['inm-cell', isEnergy?'inm-cell--energy':'inm-cell--dual',
    revealed?'inm-cell--revealed':'', flash?'inm-cell--flash':''].filter(Boolean).join(' ');
  return (
    <div className={cls} style={{'--inmc':color,...cellStyle}} onClick={handleClick}>
      <div className="inm-cell__flip">
        <div className="inm-cell__front">
          <div className="inm-cell__body">
            {displayRows.map((row,ri) => (
              <div key={ri} className="inm-cell__row">
                <div className="inm-cell__arm">{renderArm(row)}</div>
                <div className="inm-cell__arm">{renderArm(row)}</div>
              </div>
            ))}
          </div>
          <div className="inm-cell__name">{name}</div>
          <div className="inm-cell__cue">Reveal Odu ✦</div>
        </div>
        <div className="inm-cell__back">
          <span className="inm-odu-sparkle" aria-hidden="true">✦</span>
          <div className="inm-odu-rows">
            {displayRows.map((row,ri) => (
              <div key={ri} className="inm-odu-row">
                <TradiMark row={row}/><TradiMark row={row}/>
              </div>
            ))}
          </div>
          <div className="inm-odu-name">{oduName}</div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────

const ODU = [
  { n:'Ogbè',     en:'Opening · Beginnings'  },
  { n:'Òyèkú',    en:'Closure · Transition'  },
  { n:'Ìwòrì',    en:'Inner Vision'           },
  { n:'Òdí',      en:'Concealment · Depth'   },
  { n:'Ìròsùn',   en:'Flow · Life Force'     },
  { n:'Ọ̀wọ́nrín',  en:'Emergence · Surprise'  },
  { n:'Òbàrà',    en:'Kingship · Expansion'  },
  { n:'Ọ̀kàràn',   en:'Conflict · Resolution' },
  { n:'Ògúndá',   en:'Pathfinding · Action'  },
  { n:'Ọ̀sá',     en:'Speed · Disruption'    },
  { n:'Ìká',      en:'Numbers · Cleverness'  },
  { n:'Òtùrúpọ̀n', en:'Reversal · Healing'    },
  { n:'Òtúrá',    en:'Pact · Alignment'      },
  { n:'Ìrẹtẹ̀',    en:'Patience · Foundation' },
  { n:'Ọ̀sẹ̀',     en:'Prosperity · Growth'   },
  { n:'Òfún',     en:'Light · Completion'    },
];

const PILLARS = [
  { icon:'🌍', label:'Quantum in African Languages', body:'Learn, teach, and research quantum science in Yoruba and African languages — in your tongue, from your cosmology.' },
  { icon:'⚡', label:'Ifa & Orisa AIKS', body:'Quantum fields, technologies, and systems developed using African Indigenous Knowledge Systems — Ifa, Orisa, African Philosophies.' },
  { icon:'Ψ',  label:'IfaLang · OrisaLang', body:'Study and develop quantum fields and technologies formally in Ifa Language (IfaLang) and Orisa Language (OrisaLang).' },
  { icon:'⊕',  label:'Global Integration', body:'Integrate ancient African science with Western, Eastern, and other modern scientific traditions into a unified quantum framework.' },
  { icon:'📡', label:'Quantum STEM', body:'Science, Technology, Engineering, and Mathematics — all disciplines, all taught and researched in Yoruba and African languages.' },
  { icon:'∞',  label:'Meta-system', body:'IfaQuantum: a meta-system extending quantum mechanics to every field of study — towards a general theory of all fields.' },
  { icon:'⚛',  label:'IfaQuantum · OrisaQuantum · Irunmole', body:'The three-tier advanced metascience of Ifa/Orisa — from quantum science to the frontier of consciousness-energy physics.' },
  { icon:'⋈',  label:'Ifa Generalization', body:'Ifa X: studying any field X using the 16 Ifa Laws. OrisaX is its dual. IfaQuantum is the quantum instance of this universal framework.' },
];

const INTEGRATIONS = [
  { icon:'🌿', name:'African AIKS',    sub:'Ifa · Orisa · Ubuntu', color:'#22c55e', border:'rgba(34,197,94,0.3)',   bg:'rgba(34,197,94,0.08)'   },
  { icon:'⚛',  name:'Quantum Physics', sub:'QM · QFT · QG',        color:'#00d4ff', border:'rgba(0,212,255,0.3)',   bg:'rgba(0,212,255,0.08)'   },
  { icon:'🔬', name:'Western Science', sub:'Classical · Modern',    color:'#60a5fa', border:'rgba(96,165,250,0.3)', bg:'rgba(96,165,250,0.08)' },
  { icon:'☯',  name:'Eastern Science', sub:'Taoism · Vedanta',      color:'#f0920c', border:'rgba(240,146,12,0.3)', bg:'rgba(240,146,12,0.08)' },
  { icon:'✦',  name:'IfaQuantum',      sub:'The Synthesis',         color:'#8b5cf6', border:'rgba(139,92,246,0.3)', bg:'rgba(139,92,246,0.08)' },
];

const IFANUM_MATRIX = [
  { id:'ejiogbe',   energyName:'Ejiogbe Matrix',        dualName:'Oyeku Meji Matrix',        energyOdu:'Ejiogbe',    dualOdu:'Oyeku Meji',    sym:'n',  pureSymbol:true, color:'#f5c518', rows:['II','II','II','II'] },
  { id:'natural',   energyName:'IfaNatural Matrix',      dualName:'IfaNatural Dual Matrix',   energyOdu:'Iwori Meji', dualOdu:'Odi Meji',      sym:'ℕ',  color:'#f0920c', rows:['I','II','II','I'] },
  { id:'reals',     energyName:'IfaReals Matrix',        dualName:'IfaReals Dual Matrix',     energyOdu:'Irosun Meji',dualOdu:'Owonrin Meji',  sym:'ℝ',  color:'#14b8d4', energyRows:['II','II','I','I'],  dualRows:['I','I','II','II'] },
  { id:'quaternion',energyName:'IfaComplex Matrix',      dualName:'IfaComplex Dual Matrix',   energyOdu:'Obara Meji', dualOdu:'Okanran Meji',  sym:'ℍ',  color:'#ec4899', energyRows:['II','I','I','I'],   dualRows:['I','I','I','II'] },
  { id:'complex',   energyName:'IfaQuaternion Matrix',   dualName:'IfaQuaternion Dual Matrix',energyOdu:'Ogunda Meji',dualOdu:'Osa Meji',      sym:'ℂ',  color:'#8b5cf6', energyRows:['II','II','II','I'], dualRows:['I','II','II','II'] },
  { id:'sedenion',  energyName:'IfaSedenion Matrix',     dualName:'IfaSedenion Dual Matrix',  energyOdu:'Otura Meji', dualOdu:'Irete Meji',    sym:'𝕊',  color:'#4caf50', energyRows:['I','II','I','I'],   dualRows:['I','I','II','I'] },
  { id:'octonion',  energyName:'IfaOctonion Matrix',     dualName:'IfaOctonion Dual Matrix',  energyOdu:'Ika Meji',   dualOdu:'Oturupon Meji', sym:'𝕆',  color:'#ef4444', energyRows:['II','I','II','II'], dualRows:['II','II','I','II'] },
  { id:'ifax',      energyName:'IfaX Matrix',            dualName:'IfaGeneralization',        energyOdu:'Ose Meji',   dualOdu:'Ofun Meji',     sym:'X',  color:'#a78bfa', energyRows:['II','I','II','I'],  dualRows:['I','II','I','II'] },
];

const STEAMSEX_DIMS = [
  { letter:'S', name:'Science',      short:'Sci',  color:'#f0920c', desc:'The Science of Numbers'            },
  { letter:'T', name:'Technology',   short:'Tech', color:'#14b8d4', desc:'The Technology of Numbers'         },
  { letter:'E', name:'Engineering',  short:'Eng',  color:'#00c87c', desc:'The Engineering of Numbers'        },
  { letter:'A', name:'Arts',         short:'Arts', color:'#ec4899', desc:'The Arts of Numbers'               },
  { letter:'M', name:'Mathematics',  short:'Math', color:'#f5c518', desc:'The Mathematics of Numbers'        },
  { letter:'S', name:'Social',       short:'Soc',  color:'#8b5cf6', desc:'The Social Science of Numbers'     },
  { letter:'E', name:'Education',    short:'Edu',  color:'#3b9eff', desc:'The Education of Numbers'          },
  { letter:'X', name:'Others',       short:'X',    color:'#6366f1', desc:'The Unknown Dimensions of Numbers' },
];

const SIDECHRX_DIMS = [
  { letter:'S', name:'Symmetry',     short:'Sym',  color:'#f0920c', desc:'The Symmetry Laws of Numbers'     },
  { letter:'I', name:'Invariance',   short:'Inv',  color:'#6366f1', desc:'The Invariance Laws of Numbers'   },
  { letter:'D', name:'Duality',      short:'Dual', color:'#14b8d4', desc:'The Duality Laws of Numbers'      },
  { letter:'E', name:'Emergence',    short:'Emg',  color:'#10b981', desc:'The Emergence Laws of Numbers'    },
  { letter:'C', name:'Composition',  short:'Comp', color:'#ec4899', desc:'The Composition Laws of Numbers'  },
  { letter:'H', name:'Holism',       short:'Hol',  color:'#f5c518', desc:'The Holism Laws of Numbers'       },
  { letter:'R', name:'Reductionism', short:'Red',  color:'#8b5cf6', desc:'The Reductionism Laws of Numbers' },
  { letter:'X', name:'Others',       short:'X',    color:'#a78bfa', desc:'The Unknown Laws of Numbers'      },
];

// ─────────────────────────────────────────────────────────────────────────────
// PORTED MATRIX COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

function IfaNumMatrixInner() {
  const SUBSET_SYMS = [
    {s:'ℕ'},{s:'ℤ'},{s:'ℝ'},{s:'ℂ'},{s:'ℍ'},{s:'𝕆'},{s:'𝕊'},
  ];
  return (
    <>
      <div className="inm-matrix-intro">
        <p className="inm-intro-para">Ifa Number Matrix — Every classical number system expressed as an Ifanum subset.</p>
        <p className="inm-intro-para">At the most fundamental level, what we mean by a Matrix here are the 256 Odu Ifa and the 16 Odu Orisa. They are universal meta-matrices.</p>
        <p className="inm-intro-para">At an emergent level, we refer to matrices in modern math and STEM.</p>
        <p className="inm-intro-para">Also, in Consciousness Science and related fields, matrix also means the matrix that we perceive as reality or nature.</p>
      </div>

      <div className="inm-subset">
        <div className="inm-subset__syms">
          {SUBSET_SYMS.map((s,i) => (
            <React.Fragment key={i}>
              <IfaNumOgbe sym={s.s} symSize="1.35rem" iconSize={12} color="#eef1fb"/>
              {i < SUBSET_SYMS.length-1 && <span className="inm-subset__sep">,</span>}
            </React.Fragment>
          ))}
          <span className="inm-subset__ell">, …</span>
        </div>
        <h4 className="inm-subset__heading">Ifa Definition (IfaDef) · ToE Definition (ToE Def)</h4>
        <p className="inm-subset__tagline"><em>Àwọn ònkà tí a lèfi ṣe gbogbo ǹkàn (the Numbers for Everything, NumoE).</em></p>
        <div className="inm-subset__caption">
          <p>An <strong>Ifanum</strong> (IfaNum) is any kind of number, <em>n</em>, expressed, computed, constructed, or viewed using the 16 Ifa Laws of Nature, <strong>Oju Odufa Merindinlogun</strong> — the <strong>SIDECHRX Principles</strong>.</p>
          <hr className="inm-subset__rule"/>
          <p>Ifanums are the <strong>NumoEs</strong> or <strong>ToE Numbers</strong> used to do advanced studies, metamodelling, meta-simulations, and meta-analyses across the 16 <strong>STEAMSEX Dimensions</strong> — all fields of knowledge.</p>
          <hr className="inm-subset__rule"/>
          <p>They are <strong>Tools for the Unification and Integration of Everything</strong> (UIoE) — a core program of the IFA Internet for building the Universal Model of any field in IfaLang.</p>
          <hr className="inm-subset__rule"/>
          <p>Ifanums are numbers in IfaLang with the <strong>Ogbe Energy Symbol</strong> (the SymboE — Symbol of Everything) as subscript. Its dual is <em>n</em> with the <strong>Oyeku Anergy Symbol</strong> as subscript.</p>
        </div>
        <div className="inm-def-row">
          <div className="inm-def-item">
            <IfaNumOgbe sym="n" symSize="1.5rem" iconSize={14} color="#f5c518"/>
            <span className="inm-def-item__defop">:=</span>
            <OgbeSymbol size={22}/>
            <span className="inm-def-item__label">Ifanum — Energy form</span>
          </div>
          <div className="inm-def-divider">⟷</div>
          <div className="inm-def-item">
            <IfaNumOyeku sym="n" symSize="1.5rem" iconSize={14}/>
            <span className="inm-def-item__defop">:=</span>
            <OyekuSymbol size={22}/>
            <span className="inm-def-item__label">Dual Ifanum — Anergy form</span>
          </div>
        </div>
      </div>

      <h4 className="inm-matrix-subheading">The Matrix of Number Perception</h4>

      <div className="inm-matrix-grid">
        {IFANUM_MATRIX.flatMap(data => {
          const eRows = data.energyRows || data.rows;
          const dRows = data.dualRows   || data.rows.map(r => r==='II'?'I':'II');
          return [
            <IfaMatrix key={data.id+'-e'} name={data.energyName} sym={data.sym}
              displayRows={eRows} isEnergy={true}  color={data.color} pureSymbol={data.pureSymbol} oduName={data.energyOdu}/>,
            <IfaMatrix key={data.id+'-d'} name={data.dualName}   sym={data.sym}
              displayRows={dRows} isEnergy={false} color={data.color} pureSymbol={data.pureSymbol} oduName={data.dualOdu}/>,
          ];
        })}
      </div>
    </>
  );
}

function IfaNumRadialMatrix({ dims, variant }) {
  const [activeIdx, setActiveIdx] = useState(null);
  const ww = useWindowWidth();
  const sm = ww < 520;
  const W = sm?340:560, H = sm?292:480, cx=W/2, cy=H/2;
  const orbitR = sm?102:165, nodeR = sm?19:30;
  const isEllipse = variant==='sidechrx';
  const cRx = sm?(isEllipse?40:31):(isEllipse?68:52);
  const cRy = sm?(isEllipse?27:31):(isEllipse?44:52);
  const lOff=sm?nodeR+8:nodeR+12, lFsz=sm?7:8.5;
  const foW=sm?30:56, foH=sm?18:30, nfoW=sm?22:34, nfoH=sm?16:24;
  const gradId=`iqinm0g-${variant}`;

  const positions = dims.map((_,i) => {
    const a=(i/8)*2*Math.PI-Math.PI/2, ca=Math.cos(a), sa=Math.sin(a);
    const cRim=isEllipse?(cRx*cRy)/Math.sqrt((cRy*ca)**2+(cRx*sa)**2):cRx;
    return {
      nx:cx+orbitR*ca, ny:cy+orbitR*sa,
      sx:cx+(cRim+5)*ca, sy:cy+(cRim+5)*sa,
      ex:cx+(orbitR-nodeR-4)*ca, ey:cy+(orbitR-nodeR-4)*sa,
      lx:cx+(orbitR+lOff)*ca, ly:cy+(orbitR+lOff)*sa, a,
    };
  });

  const anchors  =['middle','start','start','start','middle','end','end','end'];
  const dBase    =['auto','middle','middle','middle','hanging','middle','middle','middle'];
  const toggle   = i => setActiveIdx(ai=>ai===i?null:i);
  const active   = activeIdx!==null ? dims[activeIdx] : null;

  return (
    <div className="inm0-wrap">
      <svg viewBox={`0 0 ${W} ${H}`} className="inm0-svg">
        <defs>
          <radialGradient id={gradId}>
            <stop offset="0%"   stopColor="#f5c518" stopOpacity="0.18"/>
            <stop offset="100%" stopColor="#f5c518" stopOpacity="0"/>
          </radialGradient>
        </defs>
        <circle cx={cx} cy={cy} r={orbitR} fill="none"
          stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="3 8"/>
        {positions.map((p,i)=>(
          <line key={i} x1={p.sx} y1={p.sy} x2={p.ex} y2={p.ey}
            stroke={activeIdx===i?dims[i].color:'rgba(255,255,255,0.13)'}
            strokeWidth={activeIdx===i?2:1}
            style={{transition:'stroke 0.3s,stroke-width 0.3s'}}/>
        ))}
        {isEllipse
          ?<ellipse cx={cx} cy={cy} rx={cRx+14} ry={cRy+14} fill={`url(#${gradId})`}/>
          :<circle  cx={cx} cy={cy} r={cRx+14}              fill={`url(#${gradId})`}/>}
        {isEllipse
          ?<ellipse cx={cx} cy={cy} rx={cRx} ry={cRy} fill="#04080f" stroke="#f5c518" strokeWidth="2"/>
          :<circle  cx={cx} cy={cy} r={cRx}              fill="#04080f" stroke="#f5c518" strokeWidth="2"/>}
        <foreignObject x={cx-foW/2} y={cy-foH/2} width={foW} height={foH}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'center',width:'100%',height:'100%'}}>
            <IfaNumOgbe sym="n" symSize={sm?"0.85rem":"1.2rem"} iconSize={sm?9:12} color="#f5c518"/>
          </div>
        </foreignObject>
        {positions.map((p,i)=>{
          const d=dims[i], isA=activeIdx===i;
          return (
            <g key={i} onClick={()=>toggle(i)} style={{cursor:'pointer'}}>
              <circle cx={p.nx} cy={p.ny} r={nodeR+10} fill={d.color} fillOpacity={isA?0.12:0}
                style={{transition:'fill-opacity 0.3s'}}/>
              <circle cx={p.nx} cy={p.ny} r={nodeR} fill="#060c18"
                stroke={isA?d.color:'rgba(255,255,255,0.18)'}
                strokeWidth={isA?2.2:1.5}
                style={{transition:'stroke 0.3s,stroke-width 0.3s'}}/>
              <foreignObject x={p.nx-nfoW/2} y={p.ny-nfoH/2} width={nfoW} height={nfoH}>
                <div style={{display:'flex',alignItems:'center',justifyContent:'center',width:'100%',height:'100%'}}>
                  <IfaNumOgbe sym={d.letter} symSize={sm?"0.7rem":"0.85rem"} iconSize={sm?6:8}
                    color={isA?d.color:'rgba(200,210,235,0.65)'}/>
                </div>
              </foreignObject>
              <text x={p.lx} y={p.ly} textAnchor={anchors[i]} dominantBaseline={dBase[i]}
                fontSize={lFsz} fontFamily="system-ui,sans-serif"
                fill={isA?d.color:'rgba(136,146,170,0.72)'}
                style={{transition:'fill 0.3s',pointerEvents:'none'}}>
                {sm?d.short:d.name}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="inm0-desc"
        style={active?{borderColor:active.color+'44',background:active.color+'0d'}:{}}>
        {active ? (
          <>
            <span className="inm0-desc__sym"><IfaNumOgbe sym={active.letter} symSize="1rem" iconSize={10} color={active.color}/></span>
            <span className="inm0-desc__name" style={{color:active.color}}>{active.name}</span>
            <span className="inm0-desc__sep">—</span>
            <span className="inm0-desc__text">{active.desc}</span>
          </>
        ) : (
          <span className="inm0-desc__hint">Click a node to explore</span>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// NAV
// ─────────────────────────────────────────────────────────────────────────────
function Nav() {
  return (
    <nav className="iq-nav">
      <a className="iq-nav__logo" href="../">
        <span className="iq-nav__logo-prefix">IFA Internet · </span>
        IfaQuantum
        <span className="iq-nav__dot"/>
      </a>
      <div className="iq-nav__links">
        <a className="iq-nav__link" href="#framework">Framework</a>
        <a className="iq-nav__link" href="#computing">Computing</a>
        <a className="iq-nav__link" href="#pillars">Pillars</a>
        <a className="iq-nav__link" href="#foundations">Foundations</a>
        <a className="iq-nav__link" href="#laws">16 Laws</a>
        <a className="iq-nav__link" href="#atlas">Atlas</a>
        <a className="iq-nav__link iq-nav__link--cta" href="https://toe.cenproject.org/ifa-physics/" target="_blank" rel="noopener noreferrer">Ifa Physics ↗</a>
      </div>
    </nav>
  );
}

// ── Odu mark data ─────────────────────────────────────────────────────────────
// Ọ̀sá marks top→bottom: double,double,single,single
// Ọṣẹ́ marks top→bottom: single,single,double,double
// Ọ̀sáṣẹ́: I II / II I / I I / II I  (left=[1,2,1,2], right=[2,1,1,1])
// Ọ̀ṣẹ́sá: II I / I II / I I / I II  (left=[2,1,1,1], right=[1,2,1,2])
const OSASA_M = { left:[1,2,1,2], right:[2,1,1,1] }; // Ọ̀sáṣẹ́
const OSESA_M = { left:[2,1,1,1], right:[1,2,1,2] }; // Ọ̀ṣẹ́sá

// ── OduBlock (green brick marks) ─────────────────────────────────────────────
function OduBlock({ marks }) {
  return (
    <div className="iq-odu-block">
      <div className="iq-odu-block__col">
        {marks.left.map((n,i)=>(
          <div key={i} className="iq-odu-block__row">
            {[...Array(n)].map((_,j)=><div key={j} className="iq-odu-block__mark"/>)}
          </div>
        ))}
      </div>
      <div className="iq-odu-block__col">
        {marks.right.map((n,i)=>(
          <div key={i} className="iq-odu-block__row">
            {[...Array(n)].map((_,j)=><div key={j} className="iq-odu-block__mark"/>)}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── CowrieSVGEl (single cowrie shell element, used inside CowrieOdu SVG) ─────
function CowrieSVGEl({ cx, cy, scale=1 }) {
  return (
    <g transform={`translate(${cx},${cy}) scale(${scale})`}>
      {/* drop shadow */}
      <ellipse rx="13" ry="8.5" fill="rgba(0,0,0,0.20)" transform="translate(0.8,2)"/>
      {/* main shell body */}
      <ellipse rx="12.5" ry="8" fill="#f0ece2" stroke="#c0b49a" strokeWidth="0.7"/>
      {/* side bulge bumps */}
      <ellipse cx="-7.5" cy="0" rx="5" ry="6" fill="rgba(195,180,155,0.45)"/>
      <ellipse cx="7.5" cy="0" rx="5" ry="6" fill="rgba(195,180,155,0.45)"/>
      {/* central dark slit */}
      <ellipse rx="5.5" ry="2.6" fill="#2d1e12"/>
      {/* serration inside slit */}
      <path d="M-4.5 0 Q-3.5-1.3-2.5 0 Q-1.5 1.3-.5 0 Q.5-1.3 1.5 0 Q2.5 1.3 3.5 0 Q4-.8 4.5 0"
            fill="none" stroke="#5a3820" strokeWidth="0.7" strokeLinecap="round"/>
      {/* highlight */}
      <ellipse cx="-3" cy="-2.5" rx="5" ry="3" fill="rgba(255,255,255,0.40)" transform="rotate(-10,-3,-2.5)"/>
    </g>
  );
}

// ── CowrieOdu (Odu pattern rendered as cowrie shells) ─────────────────────────
function CowrieOdu({ marks }) {
  const ROW_H=44, W=164, H=4*ROW_H+16, CL=36, CR=126;
  function rowShells(n, cx, ri) {
    const cy = 8 + ri * ROW_H + ROW_H / 2;
    return n === 1
      ? [<CowrieSVGEl key={`${cx}-${ri}`} cx={cx} cy={cy}/>]
      : [<CowrieSVGEl key={`${cx}-${ri}-a`} cx={cx-16} cy={cy} scale={0.95}/>,
         <CowrieSVGEl key={`${cx}-${ri}-b`} cx={cx+16} cy={cy} scale={0.95}/>];
  }
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="iq-cowrie-svg" aria-label="Cowrie shell Odu marks">
      {marks.left.flatMap((n,i)=>rowShells(n, CL, i))}
      {marks.right.flatMap((n,i)=>rowShells(n, CR, i))}
    </svg>
  );
}

// ── OduBitCard (interactive 3D flip card) ─────────────────────────────────────
function OduBitCard({ label, oduName, color, front, back, faceTag, backFaceTag, blochColor, blochAngle, eq }) {
  const [flipped, setFlipped] = useState(false);
  const toggle = () => setFlipped(f => !f);
  return (
    <div className="iq-bit-card" style={{'--bc':color,'--bca':color+'26'}}>
      <div className="iq-bit-card__hd">
        <span className="iq-bit-card__lbl">{label}</span>
        <span className="iq-bit-card__odu" style={{color}}>{oduName}</span>
      </div>
      <div className="iq-bit-card__fp" onClick={toggle} role="button" tabIndex={0}
           onKeyDown={e=>(e.key==='Enter'||e.key===' ')&&toggle()}>
        <div className={`iq-bit-card__fi${flipped?' iq-bit-flip':''}`}>
          <div className="iq-bit-card__face iq-bit-card__face--fr">
            {front}
            <span className="iq-bit-card__face-tag">{faceTag}</span>
          </div>
          <div className="iq-bit-card__face iq-bit-card__face--bk">
            {back}
            <span className="iq-bit-card__face-tag" style={{color:'rgba(240,146,12,0.92)'}}>{backFaceTag}</span>
          </div>
        </div>
        <div className="iq-bit-card__hint">{flipped?'↩ flip back':'↻ tap · reveal dual'}</div>
      </div>
      <div className="iq-bit-card__qvis">
        <BlochSphere color={blochColor} angle={blochAngle}/>
        <div className="iq-hero__eq" style={{color:blochColor+'bb'}}>{eq}</div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="iq-hero">
      <div className="iq-hero__inner">
        <div className="iq-hero__left">
          <div className="iq-hero__eyebrow">IFA Internet · CENProject · Ifa Physics</div>
          <h1 className="iq-hero__title">
            <span className="iq-hero__title--ifa">Ifa</span>
            <span className="iq-hero__title--q">Quantum</span>
          </h1>
          <p className="iq-hero__subtitle">The Quantum of Everything (QuantoE): Exploring the Quantum Through Ifa Lens</p>
          <p className="iq-hero__body">
            Meta-science and meta-technology unifying quantum mechanics with African Indigenous Knowledge Systems,
            IfaLang, OrisaLang, and the 16 Ifa Laws of Nature — <em>Oju Odu Ifa Merindinlogun</em>.
          </p>
          <div className="iq-pills">
            {['IfaLang','OrisaLang','Yorùbá','AIKS','16 Ifa Laws','IfaQM · IfaQFT · IfaQG','Ifaquantization'].map(p=>(
              <span key={p} className="iq-pill">{p}</span>
            ))}
          </div>
          <div className="iq-hero__ctas">
            <a href="#framework" className="iq-btn iq-btn--primary">Explore Framework</a>
            <a href="#foundations" className="iq-btn iq-btn--ghost">Foundations ↓</a>
          </div>
        </div>
        <div className="iq-hero__right">
          <div className="iq-hero__img-wrap">
            <div className="iq-hero__img-titlebar">
              <div className="iq-hero__img-dots">
                <span style={{background:'rgba(239,68,68,0.6)'}}/>
                <span style={{background:'rgba(245,197,24,0.6)'}}/>
                <span style={{background:'rgba(34,197,94,0.6)'}}/>
              </div>
              <span className="iq-hero__img-wintitle">IfaQuantum · Representation Theory</span>
              <span className="iq-hero__img-badge">CENProject</span>
            </div>
            <div className="iq-hero__img-body">
              <img src="./src/Ifa-Quantum.png" alt="IfaQuantum — The Quantum of Everything Through Ifa" className="iq-hero__img"/>
              <div className="iq-hero__img-scan"/>
              <div className="iq-hero__img-glow"/>
            </div>
            <div className="iq-hero__img-strip">
              {['IfaRepresentation','Éjiwapò Symbol','Classical → Quantum → Ifa'].map((t,i,arr)=>(
                <React.Fragment key={t}>
                  <span className="iq-hero__img-strip__tag">{t}</span>
                  {i<arr.length-1&&<span className="iq-hero__img-strip__sep">·</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="iq-bit-section">
            <div className="iq-bit-pair">
              <OduBitCard
                label="IfaBit: IfaQubit"
                oduName="Ọ̀sáṣẹ́"
                color="#00d4ff"
                faceTag="Ọ̀sáṣẹ́"
                backFaceTag="Ọ̀ṣẹ́sá · dual"
                blochColor="#00d4ff"
                blochAngle={38}
                eq="α|0⟩ + β|1⟩"
                front={<OduBlock marks={OSASA_M}/>}
                back={<OduBlock marks={OSESA_M}/>}
              />
              <div className="iq-bit-pair__conn">
                <div className="iq-bit-pair__conn-ln"/>
                <svg viewBox="0 0 32 32" className="iq-bit-pair__conn-ico" aria-hidden="true">
                  <circle cx="16" cy="16" r="7" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1.2"/>
                  <circle cx="16" cy="16" r="2.5" fill="rgba(255,255,255,0.28)"/>
                  <line x1="16" y1="4" x2="16" y2="9" stroke="rgba(255,255,255,0.14)" strokeWidth="1"/>
                  <line x1="16" y1="23" x2="16" y2="28" stroke="rgba(255,255,255,0.14)" strokeWidth="1"/>
                  <line x1="4" y1="16" x2="9" y2="16" stroke="rgba(255,255,255,0.14)" strokeWidth="1"/>
                  <line x1="23" y1="16" x2="28" y2="16" stroke="rgba(255,255,255,0.14)" strokeWidth="1"/>
                </svg>
                <div className="iq-bit-pair__conn-ln"/>
              </div>
              <OduBitCard
                label="OrisaBit: OrisaQubit"
                oduName="Ọ̀ṣẹ́sá"
                color="#8b5cf6"
                faceTag="Ọ̀ṣẹ́sá"
                backFaceTag="Ọ̀sáṣẹ́ · dual"
                blochColor="#8b5cf6"
                blochAngle={-52}
                eq="Ψ|Ọ̀rún⟩"
                front={<CowrieOdu marks={OSESA_M}/>}
                back={<CowrieOdu marks={OSASA_M}/>}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ImageGallery() {
  const images = [
    {
      src:'./src/Ifa-Quantum1-1-768x314.png', num:'I',
      topic:'Éjiwapò · Ifa Superposition & Duality',
      sub:'The Quantum through Ifa',
      tags:['IfaSuperposition','IfaDuality','Éjiwapò Symbol'],
      color:'#00d4ff',
    },
    {
      src:'./src/Ifa-Quantum2-768x314.png', num:'II',
      topic:'IfaQuantum Computing in IfaLang',
      sub:'OrisaQuantum',
      tags:['IfaLang','OnkaLang','Quantum Computing'],
      color:'#8b5cf6',
    },
    {
      src:'./src/Ifa-Quantum3-768x314.png', num:'III',
      topic:'ToE Quantum Computing',
      sub:'Irunmole Metascience',
      tags:['ToE Quantum','IfaQubits','Ifa Mechanics'],
      color:'#f0920c',
    },
    {
      src:'./src/Ifa-Quantum4-768x314.png', num:'IV',
      topic:'IfaQuantum: ToE Quantum',
      sub:'16 Ifa Laws · SIDECHRX',
      tags:['ToE Quantum','IfaKet','Perception'],
      color:'#ec4899',
    },
  ];
  return (
    <section className="iq-gallery">
      <div className="iq-gallery__head">
        <div className="iq-eyebrow" style={{justifyContent:'center'}}>CENProject · IfaQuantum · Technical Diagrams</div>
        <h2 className="iq-gallery__title">IfaQuantum Technical Gallery</h2>
        <p className="iq-gallery__desc">
          Four foundational Ifa Diagrams (Ifagrams) — Ifa Superposition, IfaQuantum Computing in IfaLang,
          ToE Quantum Computing, and the IfaBraKet Formalism (Squaket Notation).
        </p>
      </div>
      <div className="iq-gallery__grid">
        {images.map((img,i)=>(
          <div key={i} className="iq-gallery__item"
            style={{'--gc':img.color,'--gc14':img.color+'24','--gc0d':img.color+'0d'}}>
            <div className="iq-gallery__item-glow"/>
            {/* header bar */}
            <div className="iq-gallery__item-bar">
              <span className="iq-gallery__item-num">{img.num}</span>
              <div className="iq-gallery__item-meta">
                <span className="iq-gallery__item-topic">{img.topic}</span>
                <span className="iq-gallery__item-sub">{img.sub}</span>
              </div>
              <span className="iq-gallery__item-live"/>
            </div>
            {/* image */}
            <div className="iq-gallery__img-frame">
              <img src={img.src} alt={`IfaQuantum · ${img.num}`} className="iq-gallery__img" loading="lazy"/>
              <div className="iq-gallery__img-shine"/>
            </div>
            {/* footer */}
            <div className="iq-gallery__item-foot">
              <span className="iq-gallery__item-id">IfaQuantum · {img.num}</span>
              <div className="iq-gallery__tags">
                {img.tags.map(t=>(
                  <span key={t} className="iq-gallery__tag">{t}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Framework() {
  const tiers = [
    { id:'IfaQuantum',   color:'#00d4ff', border:'rgba(0,212,255,0.22)',   bg:'rgba(0,212,255,0.05)',   icon:'⚛', tagline:'Primary Framework',      body:'Quantum science studied and developed through the lens of Ifa — using the 16 Ifa Laws of Nature as the deepest axioms.', tags:['IfaQM','IfaQFT','IfaQG','Ifaquantization','IfaLang'] },
    { id:'OrisaQuantum', color:'#8b5cf6', border:'rgba(139,92,246,0.22)', bg:'rgba(139,92,246,0.05)', icon:'🌀', tagline:'Dual Framework',          body:'The dual of IfaQuantum. Quantum reality approached through the energy-personality of each Orisa — OrisaQM, OrisaQFT, and OrisaLang.', tags:['OrisaQM','OrisaQFT','OrisaLang','Orisa X','Ọ̀rúnmìlà'] },
    { id:'Irunmole',     color:'#ec4899', border:'rgba(236,72,153,0.22)',  bg:'rgba(236,72,153,0.05)', icon:'✦', tagline:'Advanced Metascience',    body:'Beyond IfaQuantum — the apex metascience where consciousness, energy, and quantum converge through iTOE and the CEN framework.', tags:['iTOE','CEN','Olodumare Frame','Ọ̀rún','PoE'] },
  ];
  return (
    <section id="framework" className="iq-section">
      <div className="iq-container">
        <div className="iq-eyebrow">Core Architecture</div>
        <h2 className="iq-section-title">Three-Tier Framework</h2>
        <p className="iq-section-sub">IfaQuantum operates across three nested tiers — from quantum science through Ifa to the metascience of everything.</p>
        <div className="iq-framework-grid">
          {tiers.map(t=>(
            <div key={t.id} className="iq-tier-card" style={{borderColor:t.border,background:`linear-gradient(160deg,${t.bg} 0%,rgba(3,6,8,0) 100%)`}}>
              <div className="iq-tier-card__glow" style={{background:`radial-gradient(ellipse at top,${t.bg} 0%,transparent 65%)`}}/>
              <div className="iq-tier-card__icon"    style={{color:t.color}}>{t.icon}</div>
              <div className="iq-tier-card__id"      style={{color:t.color}}>{t.id}</div>
              <div className="iq-tier-card__tagline">{t.tagline}</div>
              <p   className="iq-tier-card__body"   >{t.body}</p>
              <div className="iq-tier-card__tags">
                {t.tags.map(tag=><span key={tag} className="iq-tag" style={{color:t.color,borderColor:t.border}}>{tag}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pillars() {
  return (
    <section id="pillars" className="iq-section iq-section--alt">
      <div className="iq-container">
        <div className="iq-eyebrow">IfaQuantum Pillars</div>
        <h2 className="iq-section-title">Eight Pillars</h2>
        <p className="iq-section-sub">The foundational dimensions of IfaQuantum — what it does, who it is for, and how it works.</p>
        <div className="iq-pillars-grid">
          {PILLARS.map((p,i)=>(
            <div key={i} className="iq-pillar">
              <div className="iq-pillar__num">{String(i+1).padStart(2,'0')}</div>
              <div className="iq-pillar__icon">{p.icon}</div>
              <div className="iq-pillar__label">{p.label}</div>
              <p   className="iq-pillar__body">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function IfaGeneralization() {
  const examples = [
    {x:'IfaQuantum',c:'#00d4ff'},{x:'IfaPhysics',c:'#22c55e'},{x:'IfaNumber',c:'#f0920c'},
    {x:'IfaLang',c:'#8b5cf6'},{x:'IfaComputing',c:'#00d4ff'},{x:'IfaMath',c:'#ec4899'},
    {x:'IfaBiology',c:'#22c55e'},{x:'IfaArt',c:'#f0920c'},{x:'OrisaQuantum',c:'#8b5cf6'},{x:'OrisaPhysics',c:'#ec4899'},
  ];
  return (
    <section id="generalization" className="iq-section">
      <div className="iq-container">
        <div className="iq-eyebrow">Universal Framework</div>
        <h2 className="iq-section-title">Ifa Generalization</h2>
        <p className="iq-section-sub">IfaQuantum is a specific instance of a universal principle. Any field of knowledge becomes an <em>Ifa Field</em> when studied through the 16 Ifa Laws.</p>
        <div className="iq-gen-block">
          <div className="iq-gen-eq">
            <span className="iq-gen-eq__term iq-gen-eq__term--ifa">Ifa</span>
            <span className="iq-gen-eq__x">X</span>
            <span className="iq-gen-eq__def"> ≡ studying and developing any field X using the 16 Ifa Laws of Nature</span>
          </div>
          <hr className="iq-gen-sep"/>
          <div className="iq-gen-eq">
            <span className="iq-gen-eq__term iq-gen-eq__term--orisa">Orisa</span>
            <span className="iq-gen-eq__x">X</span>
            <span className="iq-gen-eq__def"> ≡ the dual: field X studied through Orisa principles — OrisaX is the dual of IfaX</span>
          </div>
        </div>
        <div className="iq-gen-examples">
          {examples.map(e=><span key={e.x} className="iq-gen-tag" style={{color:e.c,borderColor:`${e.c}33`}}>{e.x}</span>)}
        </div>
      </div>
    </section>
  );
}

function Integration() {
  return (
    <section className="iq-integration">
      <div className="iq-container">
        <div className="iq-eyebrow" style={{justifyContent:'center',marginBottom:'32px'}}>Global Scientific Integration</div>
        <div className="iq-integration__inner">
          {INTEGRATIONS.map((node,i)=>(
            <React.Fragment key={node.name}>
              <div className="iq-integ-node">
                <div className="iq-integ-node__icon" style={{borderColor:node.border,background:node.bg,color:node.color}}>{node.icon}</div>
                <div className="iq-integ-node__name" style={{color:node.color}}>{node.name}</div>
                <div className="iq-integ-node__sub">{node.sub}</div>
              </div>
              {i<INTEGRATIONS.length-1 && <div className="iq-integ-arrow">→</div>}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

function SixteenLaws() {
  return (
    <section id="laws" className="iq-section iq-section--alt">
      <div className="iq-container">
        <div className="iq-eyebrow">Oju Odu Ifa Merindinlogun · SIDECHRX Principles</div>
        <h2 className="iq-section-title">The 16 Ifa Laws of Nature</h2>
        <p className="iq-section-sub">Deeper and more fundamental than any known laws of modern science. In IfaQuantum, each Odu functions as a meta-axiom governing a class of quantum phenomena.</p>
        <div className="iq-laws-grid">
          {ODU.map((o,i)=>(
            <div key={i} className="iq-law-cell">
              <div className="iq-law-cell__num">ODU {String(i+1).padStart(2,'0')}</div>
              <div className="iq-law-cell__name">{o.n}</div>
              <div className="iq-law-cell__en">{o.en}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Languages() {
  const langs = [
    { name:'IfaLang',          desc:'The formal language of Ifa — the Language of Everything (LangE). All of IfaQuantum is expressible in IfaLang.', color:'#00d4ff' },
    { name:'OrisaLang',        desc:'Language of Orisa — dual to IfaLang. OrisaQuantum maps Orisa principles to quantum fields through OrisaLang.', color:'#8b5cf6' },
    { name:'Yorùbá',           desc:'Ancestral language of Ifa and Orisa. Learn and teach quantum science in Yorùbá — the living mother tongue of this knowledge.', color:'#f0920c' },
    { name:'African Languages',desc:'IfaQuantum is for all African peoples. Quantum education, research, and development — in your language, from your cosmology.', color:'#22c55e' },
  ];
  return (
    <section id="languages" className="iq-section">
      <div className="iq-container">
        <div className="iq-eyebrow">Language · Linguistics · STEM</div>
        <h2 className="iq-section-title">Quantum in African Languages</h2>
        <p className="iq-section-sub">Every concept in IfaQuantum is teachable, researchable, and developable in Yorùbá and African languages. STEM — in your tongue, from your cosmology.</p>
        <div className="iq-lang-grid">
          {langs.map(l=>(
            <div key={l.name} className="iq-lang-card" style={{borderColor:`${l.color}28`}}>
              <div className="iq-lang-card__dot" style={{background:l.color}}/>
              <div className="iq-lang-card__name" style={{color:l.color}}>{l.name}</div>
              <p className="iq-lang-card__desc">{l.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function IfaQuantumComputing() {
  const features = [
    { icon:'⚛',  label:'IfaQubits',          desc:'Qubits defined and operated through Ifa Laws and binary Odu encoding.' },
    { icon:'🌀', label:'OrisaQubits',         desc:'Qubit states as Orisa energy signatures — the dual quantum system.' },
    { icon:'⊞',  label:'IfaCircuits',         desc:'Quantum circuits designed using Ifa combinatorial principles.' },
    { icon:'⊗',  label:'IfaGates',            desc:'Quantum logic gates derived from Odu Ifa transformations.' },
    { icon:'∑',  label:'Ifalgorithms (Ifalgo)',       desc:'Quantum algorithms structured using the 16 Ifa Laws as meta-heuristics.' },
    { icon:'📡', label:'IfaQuantum Internet', desc:'Quantum communication networks modeled on Ifa cosmological structures.' },
  ];
  return (
    <section id="computing" className="iq-section iq-section--alt">
      <div className="iq-container">
        <div className="iq-eyebrow">Quantum Hardware &amp; Software · AIKS</div>
        <h2 className="iq-section-title">IfaQuantum Computing</h2>
        <p className="iq-section-sub">Quantum computing architectures, algorithms, and systems developed through Ifa and Orisa principles — IfaQubits, OrisaQubits, IfaCircuits, and Ifalgorithms (Ifalgo) operating under the 16 Ifa Laws.</p>
        <div className="iq-dev-banner"><span className="iq-dev-dot"/><span>Under Development</span></div>
        <div className="iq-computing-card">
          <div className="iq-computing-card__vis">
            <BlochSphere color="#00d4ff" angle={28}/>
            <div className="iq-computing-card__eq">IfaQubit<br/>α|Ọ̀rún⟩ + β|Àiyé⟩</div>
            <div className="iq-computing-card__eq" style={{color:'rgba(139,92,246,0.65)',marginTop:'18px'}}>OrisaQubit<br/>Ψ|Ọ̀ṣun⟩ ⊗ |Ògún⟩</div>
            <BlochSphere color="#8b5cf6" angle={-45}/>
          </div>
          <div className="iq-computing-grid">
            {features.map((f,i)=>(
              <div key={i} className="iq-computing-feat">
                <span className="iq-computing-feat__icon">{f.icon}</span>
                <div>
                  <div className="iq-computing-feat__label">{f.label}</div>
                  <p className="iq-computing-feat__desc">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function IfaQuantumAtlas() {
  const features = [
    { icon:'🔬', label:'IfaSims',               desc:'Ifa Simulation (IfaSim). Quantum simulations in Yoruba and African languages — experience quantum phenomena through Ifa cosmology.' },
    { icon:'🎬', label:'Ifanimations',           desc:'Animated explanations of quantum fields, particles, and entanglement through Ifa and Orisa imagery.' },
    { icon:'📖', label:'IfaComics',              desc:'Comics teaching quantum science via Orisa characters and AIKS narratives — for all ages.' },
    { icon:'🎮', label:'IfaDemos',               desc:'Interactive demonstrations of quantum experiments and their Ifa correlations.' },
    { icon:'🗺', label:'IfaMaps',                desc:'Visual maps of IfaQuantum concepts — from Odu to quantum fields, made explorable.' },
    { icon:'🌍', label:'African Language STEM',  desc:'Every simulation and demo available in Yoruba, Igbo, Swahili, and other African languages.' },
  ];
  return (
    <section id="atlas" className="iq-section">
      <div className="iq-container">
        <div className="iq-eyebrow">Education · Media · STEM in African Languages</div>
        <h2 className="iq-section-title">IfaQuantum Atlas</h2>
        <p className="iq-section-sub">A creative platform for simulations, demos, animations, and comics that teach quantum science in Yoruba and African languages — grounded in Ifa, Orisa, and African Indigenous Knowledge Systems.</p>
        <div className="iq-dev-banner"><span className="iq-dev-dot"/><span>Under Development</span></div>
        <div className="iq-atlas-grid">
          {features.map((f,i)=>(
            <div key={i} className="iq-atlas-card">
              <div className="iq-atlas-card__icon">{f.icon}</div>
              <div className="iq-atlas-card__label">{f.label}</div>
              <p className="iq-atlas-card__desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// THEORETICAL FOUNDATIONS SECTION
// ─────────────────────────────────────────────────────────────────────────────

function IfaPhysicsPanel() {
  const tags = ['IfaQM','IfaQFT','IfaQG','Ifaquantization','CEN','iTOE','IQF','SIDECHRX'];
  return (
    <div className="iq-found-panel">
      <div className="iq-found-card iq-found-card--physics">
        <div className="iq-found-card__glow"/>
        <div className="iq-found-names">
          <span className="iq-found-name iq-found-name--lead">Ifa Physics</span>
          <span className="iq-found-name-sep">·</span>
          <span className="iq-found-name">ToE Physics</span>
          <span className="iq-found-name-sep">·</span>
          <span className="iq-found-name">Consciousness Physics</span>
        </div>
        <h3 className="iq-found-card__title">The Physics of Everything (PoE)</h3>
        <p className="iq-found-card__body">
          <strong>Ifa Physics</strong> is the theoretical foundation of IfaQuantum — and the cornerstone of{' '}
          <em>Consciousness Physics</em>, the study of consciousness-energy (CEN) as the primary physical reality.
          Known also as <em>ToE Physics</em> (Theory of Everything Physics), it frames quantum mechanics,
          consciousness, and energy through the 16 Ifa Laws of Nature.
          Discover IfaQM, IfaQFT, IfaQG, the Ifa Quantum Field (IQF), Ifaquantization,
          the CEN framework, and the Olodumare Frame.
        </p>
        <div className="iq-found-card__tags">
          {tags.map(t=><span key={t} className="iq-tag" style={{color:'#00d4ff',borderColor:'rgba(0,212,255,0.28)'}}>{t}</span>)}
        </div>
        <a href="https://toe.cenproject.org/ifa-physics/" target="_blank" rel="noopener noreferrer"
          className="iq-btn iq-btn--primary">Explore Ifa Physics ↗</a>
      </div>
    </div>
  );
}

function IfaMathPanel() {
  const [slide, setSlide] = useState(0);
  const labels = ['IfaNum STEAMSEX Matrix','IfaNum SIDECHRX Matrix'];
  return (
    <div className="iq-found-panel">
      <InmRevealStyles/>

      {/* Intro card */}
      <div className="iq-found-card iq-found-card--math">
        <div className="iq-found-card__glow iq-found-card__glow--gold"/>
        <div className="iq-found-names iq-found-names--gold">
          <span className="iq-found-name iq-found-name--lead">Ifa Mathematics</span>
          <span className="iq-found-name-sep">·</span>
          <span className="iq-found-name">ToE Mathematics</span>
          <span className="iq-found-name-sep">·</span>
          <span className="iq-found-name">Consciousness Mathematics</span>
        </div>
        <h3 className="iq-found-card__title iq-found-card__title--gold">The Mathematics of Everything (MoE)</h3>
        <p className="iq-found-card__body">
          <strong>Ifa Mathematics</strong> — also known as <em>ToE Mathematics</em> (Theory of Everything Mathematics)
          and <em>Consciousness Mathematics</em> — is the Formal Mathematical Language of the IFA Internet.
          Built on Ifanums, OnkaLang, and the 256-Odu IFABOK, it provides the complete mathematical
          foundation for IfaQuantum. Every quantum state, field, and transformation in IfaQuantum is
          expressible in Consciousness Mathematics through the Ifa Number Matrix.
        </p>
        <div className="iq-found-card__tags">
          {['Ifanums','OnkaLang','IFABOK','IfaNum Matrix','STEAMSEX','SIDECHRX','NumoE','ToE Nums'].map(t=>(
            <span key={t} className="iq-tag" style={{color:'#f5c518',borderColor:'rgba(245,197,24,0.28)'}}>{t}</span>
          ))}
        </div>
      </div>

      {/* ─── IfaNum Matrix subsection ─── */}
      <div className="iq-found-subsect">
        <div className="iq-eyebrow iq-eyebrow--amber">IfaNum Matrix · OnkaLang · IFABOK</div>
        <h3 className="iq-found-subsect__title">IfaNum Matrix</h3>
        <IfaNumMatrixInner/>
      </div>

      {/* ─── IfaNum 0+8D subsection ─── */}
      <div className="iq-found-subsect">
        <div className="iq-eyebrow iq-eyebrow--amber">IfaNum 0+8D Matrix · IfaSlider · OnkaLang</div>
        <h3 className="iq-found-subsect__title">The IfaNum Matrix (Featuring IfaSlider)</h3>
        <p className="iq-section-sub" style={{marginBottom:'28px'}}>
          The Ifanum{' '}<IfaNumOgbe sym="n" symSize="1rem" iconSize={10} color="var(--t1)"/>{' '}
          at the Centre, with its 8 Dimensions radiating outward.
          Use the <strong>IfaSlider</strong> to switch between the two 0+8D Matrices.
          Click any Node to explore its Dimension.
        </p>
        <div className="inm0-slider">
          {labels.map((label,i)=>(
            <button key={i}
              className={`inm0-slider__tab${slide===i?' inm0-slider__tab--active':''}`}
              onClick={()=>setSlide(i)}>
              {label}
            </button>
          ))}
        </div>
        <div className="inm0-matrix-title">{labels[slide]}</div>
        {slide===0
          ?<IfaNumRadialMatrix key="steamsex" dims={STEAMSEX_DIMS} variant="steamsex"/>
          :<IfaNumRadialMatrix key="sidechrx" dims={SIDECHRX_DIMS} variant="sidechrx"/>}
      </div>
    </div>
  );
}

function TheoryFoundations() {
  const [tab, setTab] = useState(0);
  return (
    <section id="foundations" className="iq-section iq-section--alt iq-tfound-section">
      <div className="iq-container">
        <div className="iq-eyebrow">CENProject · IfaQuantum</div>
        <h2 className="iq-section-title">
          Theoretical Foundation<span className="iq-tfound-cen"> · CENProject</span>
        </h2>
        <p className="iq-section-sub">
          IfaQuantum rests on two inseparable theoretical pillars. Together, as{' '}
          <em>Consciousness Physics</em> and <em>Consciousness Mathematics</em>, they form
          the complete Theory of Everything (ToE) framework underlying all IfaQuantum
          fields, technologies, and languages.
        </p>

        <div className="iq-tfound-tabs">
          <button
            className={`iq-tfound-tab${tab===0?' iq-tfound-tab--active iq-tfound-tab--cyan':''}`}
            onClick={()=>setTab(0)}>
            <span className="iq-tfound-tab__name">Ifa Physics</span>
            <span className="iq-tfound-tab__alts">ToE Physics · Consciousness Physics</span>
          </button>
          <button
            className={`iq-tfound-tab${tab===1?' iq-tfound-tab--active iq-tfound-tab--gold':''}`}
            onClick={()=>setTab(1)}>
            <span className="iq-tfound-tab__name">Ifa Mathematics</span>
            <span className="iq-tfound-tab__alts">ToE Mathematics · Consciousness Mathematics</span>
          </button>
        </div>

        {tab===0 ? <IfaPhysicsPanel/> : <IfaMathPanel/>}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="iq-footer">
      <div className="iq-footer__inner">
        <div className="iq-footer__logo">IfaQuantum</div>
        <div className="iq-footer__sub">
          Part of the <a href="https://ifainternet.org">IFA Internet</a> — the Internet Model of the Theory of Everything (iTOE){' '}
          · <a href="https://toe.cenproject.org">CENProject</a>{' '}
          · <a href="https://toe.cenproject.org/ifa-physics/" target="_blank" rel="noopener noreferrer">Ifa Physics</a>
        </div>
        <div className="iq-footer__links">
          <a href="../">IFA Internet</a>
          <a href="../ifa-number/">IFA Number</a>
          <a href="../ifa-number/ode-onka/">Òde Ònkà</a>
          <a href="../ifa-computing/">IFA Computing</a>
          <a href="../ifa-periodic-table/">IFA Periodic Table</a>
          <a href="https://toe.cenproject.org/ifa-physics/" target="_blank" rel="noopener noreferrer">Ifa Physics ↗</a>
        </div>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// APP
// ─────────────────────────────────────────────────────────────────────────────
function App() {
  return (
    <>
      <Nav/>
      <Hero/>
      <ImageGallery/>
      <Framework/>
      <IfaQuantumComputing/>
      <Pillars/>
      <IfaGeneralization/>
      <Integration/>
      <SixteenLaws/>
      <Languages/>
      <IfaQuantumAtlas/>
      <TheoryFoundations/>
      <Footer/>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
