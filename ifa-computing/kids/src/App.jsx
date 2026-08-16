/* ─────────────────────────────────────────────────────────────
   Ifa Computer for Kids & Teens
   Ifa Computing · The IFA Internet · CENProject
───────────────────────────────────────────────────────────── */

const { useState, useEffect } = React;

// ── Native Item SVG Renderers ──────────────────────────────────
const CowrieSVG = (size = 20) => (
  <svg viewBox="0 0 60 42" width={Math.round(size * 1.5)} height={size} aria-hidden="true" style={{display:'block'}}>
    <ellipse cx="30" cy="21" rx="28" ry="18" fill="#ede8d0" stroke="#c4ad7a" strokeWidth="1.2"/>
    <ellipse cx="30" cy="21" rx="20" ry="10" fill="#d4c898"/>
    <ellipse cx="30" cy="21" rx="13" ry="4.5" fill="#1c0e06"/>
    <rect x="19" y="16.8" width="2" height="2.8" rx="0.6" fill="#e8dfc4"/>
    <rect x="24" y="16.2" width="2" height="3.4" rx="0.6" fill="#e8dfc4"/>
    <rect x="29" y="16.0" width="2" height="3.6" rx="0.6" fill="#e8dfc4"/>
    <rect x="34" y="16.2" width="2" height="3.4" rx="0.6" fill="#e8dfc4"/>
    <rect x="39" y="16.8" width="2" height="2.8" rx="0.6" fill="#e8dfc4"/>
    <rect x="19" y="22.4" width="2" height="2.8" rx="0.6" fill="#e8dfc4"/>
    <rect x="24" y="22.4" width="2" height="3.4" rx="0.6" fill="#e8dfc4"/>
    <rect x="29" y="22.4" width="2" height="3.6" rx="0.6" fill="#e8dfc4"/>
    <rect x="34" y="22.4" width="2" height="3.4" rx="0.6" fill="#e8dfc4"/>
    <rect x="39" y="22.4" width="2" height="2.8" rx="0.6" fill="#e8dfc4"/>
    <ellipse cx="22" cy="14" rx="7" ry="3.5" fill="rgba(255,255,255,0.28)" transform="rotate(-18 22 14)"/>
  </svg>
);
const IkinSVG = (size = 20) => (
  <svg viewBox="0 0 40 40" width={size} height={size} aria-hidden="true" style={{display:'block'}}>
    <circle cx="20" cy="21" r="17" fill="#1e0e05"/>
    <ellipse cx="17" cy="15" rx="11" ry="7" fill="rgba(100,45,10,0.55)" transform="rotate(-20 17 15)"/>
    <circle cx="20" cy="21" r="17" fill="none" stroke="#321508" strokeWidth="2.5" strokeDasharray="2.5 2"/>
    <ellipse cx="20" cy="6" rx="4.5" ry="2.5" fill="#0d0603"/>
    <ellipse cx="20" cy="6" rx="2.5" ry="1.2" fill="#2a1208"/>
    <ellipse cx="14" cy="13" rx="4" ry="2.5" fill="rgba(255,255,255,0.1)" transform="rotate(-30 14 13)"/>
  </svg>
);
const ObiSVG = (size = 20) => (
  <svg viewBox="0 0 44 42" width={Math.round(size * 1.05)} height={size} aria-hidden="true" style={{display:'block'}}>
    <ellipse cx="22" cy="21" rx="20" ry="19" fill="#c04828"/>
    <line x1="22" y1="21" x2="22" y2="3" stroke="#8b2e12" strokeWidth="1.5"/>
    <line x1="22" y1="21" x2="39" y2="13" stroke="#8b2e12" strokeWidth="1.5"/>
    <line x1="22" y1="21" x2="39" y2="29" stroke="#8b2e12" strokeWidth="1.5"/>
    <line x1="22" y1="21" x2="22" y2="39" stroke="#8b2e12" strokeWidth="1.5"/>
    <line x1="22" y1="21" x2="5" y2="29" stroke="#8b2e12" strokeWidth="1.5"/>
    <line x1="22" y1="21" x2="5" y2="13" stroke="#8b2e12" strokeWidth="1.5"/>
    <ellipse cx="22" cy="21" rx="20" ry="19" fill="none" stroke="#7a2210" strokeWidth="1.2"/>
    <ellipse cx="22" cy="21" rx="10" ry="9" fill="rgba(230,120,70,0.35)"/>
    <ellipse cx="15" cy="14" rx="6" ry="3.5" fill="rgba(255,180,130,0.3)" transform="rotate(-25 15 14)"/>
  </svg>
);
const OpeleSVG = (size = 20) => (
  <svg viewBox="0 0 28 42" width={Math.round(size * 0.67)} height={size} aria-hidden="true" style={{display:'block'}}>
    <ellipse cx="14" cy="21" rx="12" ry="19" fill="#2e1608"/>
    <ellipse cx="14" cy="21" rx="3" ry="18" fill="rgba(60,25,10,0.6)"/>
    <ellipse cx="10" cy="13" rx="5" ry="7" fill="rgba(100,45,12,0.45)" transform="rotate(-12 10 13)"/>
    <ellipse cx="9" cy="11" rx="3" ry="4.5" fill="rgba(255,255,255,0.1)" transform="rotate(-15 9 11)"/>
    <ellipse cx="14" cy="21" rx="12" ry="19" fill="none" stroke="#4d2210" strokeWidth="0.8"/>
  </svg>
);
function renderSym(sym, size = 20) {
  return typeof sym === 'function' ? sym(size) : sym;
}

// ── Kids Platform Constants ────────────────────────────────────
const NATIVE_ITEMS = [
  { name: 'Owó Ẹyọ', label: 'Cowrie Shell',    sym: CowrieSVG, bg: '#fef3c7', accent: '#d97706' },
  { name: 'Ikin',    label: 'Sacred Palm Nut', sym: IkinSVG,   bg: '#fdf2e9', accent: '#92400e' },
  { name: 'Obì',     label: 'Kolanut',         sym: ObiSVG,    bg: '#fdf4ee', accent: '#78350f' },
  { name: 'Ọ̀pẹ̀lẹ̀',   label: 'Divination Chain',sym: OpeleSVG,  bg: '#f0ebe3', accent: '#5c3018' },
];
const MODERN_ITEMS = [
  { name: 'Stars',   sym: '⭐', bg: '#fefce8', accent: '#ca8a04' },
  { name: 'Hearts',  sym: '❤️', bg: '#fdf2f8', accent: '#db2777' },
  { name: 'Rockets', sym: '🚀', bg: '#eff6ff', accent: '#2563eb' },
  { name: 'Gems',    sym: '💎', bg: '#f0fdf4', accent: '#16a34a' },
];

function makeMatrix(n) {
  return Array.from({ length: n }, () => Array(n).fill(0));
}
function matAdd(A, B) { return A.map((r, i) => r.map((v, j) => v + B[i][j])); }
function matSub(A, B) { return A.map((r, i) => r.map((v, j) => v - B[i][j])); }
function matMul(A, B) {
  return A.map((r, i) => B[0].map((_, j) => r.reduce((s, _, k) => s + A[i][k] * B[k][j], 0)));
}

function ItemDisplay({ sym, count, col }) {
  const n = Math.min(Math.abs(count), 6);
  if (n === 0) return <div className="kids-items kids-items--empty"><span className="kids-items__zero">0</span></div>;
  return (
    <div className={`kids-items${col ? ' kids-items--col' : ''}`}>
      {Array.from({ length: n }).map((_, i) => (
        <span key={i} className="kids-item-sym">{renderSym(sym, 16)}</span>
      ))}
      {Math.abs(count) > 6 && <span className="kids-item-more">+{Math.abs(count) - 6}</span>}
    </div>
  );
}

// ── Page Header ────────────────────────────────────────────────
function KidsPageHeader() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);
  return (
    <header className={`kp-header${scrolled ? ' kp-header--scrolled' : ''}`}>
      <div className="container kp-header__inner">
        <a href="../" className="kp-back">← Ifa Computing</a>
        <div className="kp-brand">
          <span className="kp-brand__icon">⬡</span>
          <span className="kp-brand__name">Ifa Computer for Kids &amp; Teens</span>
        </div>
        <a href="https://ifainternet.org" className="kp-inet" target="_blank" rel="noopener noreferrer">
          IFA Internet
        </a>
      </div>
    </header>
  );
}

// ── Kids Platform Section ──────────────────────────────────────
function KidsSection() {
  const [mode, setMode] = useState('native');
  const [itemIdx, setItemIdx] = useState(0);
  const [size, setSize] = useState(2);
  const [matA, setMatA] = useState(makeMatrix(2));
  const [matB, setMatB] = useState(makeMatrix(2));
  const [op, setOp] = useState('add');
  const [result, setResult] = useState(null);
  const [computed, setComputed] = useState(false);
  const [celebrate, setCelebrate] = useState(false);

  const items = mode === 'native' ? NATIVE_ITEMS : MODERN_ITEMS;
  const safeIdx = Math.min(itemIdx, items.length - 1);
  const item = items[safeIdx];

  const changeSize = (s) => {
    setSize(s); setMatA(makeMatrix(s)); setMatB(makeMatrix(s));
    setResult(null); setComputed(false);
  };

  const updateCell = (which, i, j, val) => {
    const n = parseInt(val);
    const v = isNaN(n) ? 0 : Math.max(-99, Math.min(99, n));
    if (which === 'A') setMatA(prev => { const m = prev.map(r => [...r]); m[i][j] = v; return m; });
    else               setMatB(prev => { const m = prev.map(r => [...r]); m[i][j] = v; return m; });
    setResult(null); setComputed(false);
  };

  const compute = () => {
    let res;
    if (op === 'add') res = matAdd(matA, matB);
    else if (op === 'sub') res = matSub(matA, matB);
    else res = matMul(matA, matB);
    setResult(res); setComputed(true); setCelebrate(true);
    setTimeout(() => setCelebrate(false), 1200);
  };

  const reset = () => {
    setMatA(makeMatrix(size)); setMatB(makeMatrix(size));
    setResult(null); setComputed(false);
  };

  const opSymbol = op === 'add' ? '+' : op === 'sub' ? '−' : '×';

  const MatrixGrid = ({ mat, which, readOnly }) => (
    <div className="kids-matrix" style={{ '--km-cols': size }}>
      {mat.map((row, i) => row.map((val, j) => (
        <div key={`${i}-${j}`} className={`kids-cell${readOnly ? ' kids-cell--result' : ''}`}>
          <ItemDisplay sym={item.sym} count={val} col={mode === 'native'} />
          {readOnly
            ? <div className="kids-cell-val">{val}</div>
            : <input
                type="number"
                className="kids-cell-input"
                value={val === 0 ? '' : val}
                placeholder="0"
                onChange={e => updateCell(which, i, j, e.target.value)}
              />
          }
        </div>
      )))}
    </div>
  );

  return (
    <section id="kids" className="kids-section">
      {/* Animated background blobs */}
      <div className="kids-bg" aria-hidden="true">
        <div className="kids-blob kids-blob--1" />
        <div className="kids-blob kids-blob--2" />
        <div className="kids-blob kids-blob--3" />
        {[...Array(10)].map((_, i) => (
          <div key={i} className="kids-dot" style={{
            '--kd-x': `${[6,18,32,48,58,70,82,90,24,75][i]}%`,
            '--kd-y': `${[12,78,28,60,85,18,45,72,52,38][i]}%`,
            '--kd-d': `${i * 0.5}s`,
            '--kd-c': ['#f5c518','#00d9b8','#e9498a','#7c4dff','#4361ee','#ff6b35','#f5c518','#00d9b8','#e9498a','#7c4dff'][i],
          }} />
        ))}
      </div>

      <div className="container">
        {/* Section header */}
        <div className="kids-header">
          <div className="kids-badge">🌟 Ifa Computer for Kids &amp; Teens</div>
          <h2 className="kids-title">
            <span className="kids-title-word kids-title-word--1">Learn.</span>{' '}
            <span className="kids-title-word kids-title-word--2">Think.</span>{' '}
            <span className="kids-title-word kids-title-word--3">Build.</span>
          </h2>
          <p className="kids-subtitle">
            Master Ifa Matrix Math using cowries, palm nuts &amp; kolanut — or your favourite shapes.
            Become a thinker and polymath in any career you choose! 🚀
          </p>
        </div>

        {/* Playground card */}
        <div className={`kids-playground${celebrate ? ' kids-playground--celebrate' : ''}`}>
          <div className="kids-pg-head">
            <div className="kids-pg-title">
              <span>⬡</span> Ifa Matrix Playground
            </div>
            <div className="kids-pg-sub">Build matrices · compute results · see your items!</div>
          </div>

          {/* Controls */}
          <div className="kids-controls">
            {/* Mode */}
            <div className="kids-ctrl-group">
              <div className="kids-ctrl-label">Your Style</div>
              <div className="kids-mode-toggle">
                <button
                  className={`kids-mode-btn${mode === 'native' ? ' active' : ''}`}
                  onClick={() => { setMode('native'); setItemIdx(0); setResult(null); setComputed(false); }}
                >🐚 Yoruba (Native)</button>
                <button
                  className={`kids-mode-btn${mode === 'modern' ? ' active' : ''}`}
                  onClick={() => { setMode('modern'); setItemIdx(0); setResult(null); setComputed(false); }}
                >⭐ Modern Shapes</button>
              </div>
            </div>

            {/* Item picker */}
            <div className="kids-ctrl-group">
              <div className="kids-ctrl-label">{mode === 'native' ? 'Pick an Item' : 'Pick a Shape'}</div>
              <div className="kids-item-picker">
                {items.map((it, i) => (
                  <button
                    key={i}
                    className={`kids-item-btn${safeIdx === i ? ' active' : ''}`}
                    style={{ '--kib-bg': it.bg, '--kib-ac': it.accent }}
                    onClick={() => setItemIdx(i)}
                    title={it.label || it.name}
                  >
                    <span className="kids-item-btn__sym">{renderSym(it.sym, 30)}</span>
                    <span className="kids-item-btn__name">{it.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Size + op */}
            <div className="kids-ctrl-group kids-ctrl-group--row">
              <div>
                <div className="kids-ctrl-label">Matrix Size</div>
                <div className="kids-size-btns">
                  {[2, 3].map(s => (
                    <button key={s}
                      className={`kids-size-btn${size === s ? ' active' : ''}`}
                      onClick={() => changeSize(s)}
                    >{s}×{s}</button>
                  ))}
                </div>
              </div>
              <div>
                <div className="kids-ctrl-label">Operation</div>
                <div className="kids-op-btns">
                  {[
                    { k: 'add', l: '+ Add',        c: '#00d9b8' },
                    { k: 'sub', l: '− Subtract',   c: '#e9498a' },
                    { k: 'mul', l: '× Multiply',   c: '#7c4dff' },
                  ].map(o => (
                    <button key={o.k}
                      className={`kids-op-btn${op === o.k ? ' active' : ''}`}
                      style={{ '--kop-c': o.c }}
                      onClick={() => { setOp(o.k); setResult(null); setComputed(false); }}
                    >{o.l}</button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Workspace */}
          <div className="kids-workspace">
            <div className="kids-mat-wrap">
              <div className="kids-mat-label">Matrix A</div>
              <MatrixGrid mat={matA} which="A" readOnly={false} />
            </div>

            <div className="kids-op-display">{opSymbol}</div>

            <div className="kids-mat-wrap">
              <div className="kids-mat-label">Matrix B</div>
              <MatrixGrid mat={matB} which="B" readOnly={false} />
            </div>

            {computed && result && (
              <>
                <div className="kids-op-display kids-op-display--eq">=</div>
                <div className="kids-mat-wrap kids-mat-wrap--result">
                  <div className="kids-mat-label kids-mat-label--result">Result 🎉</div>
                  <MatrixGrid mat={result} which="R" readOnly={true} />
                </div>
              </>
            )}
          </div>

          {/* Actions */}
          <div className="kids-actions">
            <button className="kids-btn-compute" onClick={compute}>🚀 Compute!</button>
            <button className="kids-btn-reset" onClick={reset}>🔄 Reset</button>
          </div>

          {/* Native items legend */}
          {mode === 'native' && (
            <div className="kids-legend">
              {NATIVE_ITEMS.map((it, i) => (
                <div key={i} className="kids-legend-item">
                  <span>{renderSym(it.sym, 22)}</span>
                  <strong>{it.name}</strong>
                  <span className="kids-legend-label">({it.label})</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Coming soon */}
        <div className="kids-coming">
          <div className="kids-coming__label">🚀 Coming Soon to Ifa Computer for Kids</div>
          <div className="kids-coming__grid">
            {[
              { icon: '🎮', name: 'Ifa Matrix Games',   desc: 'Play and learn matrix math through Ifa-themed games' },
              { icon: '✨', name: 'Odu Animations',      desc: 'Watch Odu Ifa come alive — energy, nature, and spirit in motion' },
              { icon: '🧪', name: 'Ifa Simulations',     desc: 'Simulate real-world systems with Ifa Computing principles' },
              { icon: '🤖', name: 'Ifa Tech Builder',    desc: 'Build your first tech project using Ifa Computing as the foundation' },
            ].map((c, i) => (
              <div key={i} className="kids-coming__card">
                <div className="kids-coming__icon">{c.icon}</div>
                <div className="kids-coming__name">{c.name}</div>
                <p className="kids-coming__desc">{c.desc}</p>
                <span className="kids-coming__tag">Coming Soon</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Page Footer ────────────────────────────────────────────────
function KidsPageFooter() {
  return (
    <footer className="kp-footer">
      <div className="container kp-footer__inner">
        <span>
          Part of{' '}
          <a href="../">Ifa Computing</a>
          {' · '}
          <a href="https://ifainternet.org" target="_blank" rel="noopener noreferrer">The IFA Internet</a>
          {' · '}
          <a href="https://cenproject.org" target="_blank" rel="noopener noreferrer">CENProject</a>
        </span>
        <span className="kp-footer__axiom">"Consciousness-Energy (CEN) is everything that really exists."</span>
      </div>
    </footer>
  );
}

// ── App ────────────────────────────────────────────────────────
function App() {
  return (
    <>
      <KidsPageHeader />
      <main>
        <KidsSection />
      </main>
      <KidsPageFooter />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
