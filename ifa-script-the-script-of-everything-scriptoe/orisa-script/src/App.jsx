/* ─────────────────────────────────────────────────────────────
   OrisaScript — Orisa-Script · The Orisa Scripting Algorithm
   A subpage of IfaScript · The IFA Internet · CENProject
───────────────────────────────────────────────────────────── */

const { useState, useEffect } = React;

// ── Floating background glyphs ────────────────────────────────
const HERO_GLYPHS = [
  '‖','‖‖','⊙','◎','O','|','≡','≣','∥','⊗','⊕','||','⟨⟩','∂',
  '‖','○','◎','⊙','∥','ا','ب','α','β','A','Ā','Ẹ','Ọ','⊗','||',
];

// ── Dual SVG helpers — line-like duals ───────────────────────

const DualSvg = ({ children }) => (
  <svg viewBox="0 0 40 40" width="36" height="36" fill="none"
    stroke="currentColor" strokeWidth="2.3" strokeLinecap="round"
    style={{ display: 'block' }} aria-hidden="true">
    {children}
  </svg>
);

// ── Dual Symbol pairs for line-like demo ──────────────────────
const LINE_PAIRS = [
  {
    orig: 'X',
    dual: (
      <DualSvg>
        {/* \\ pair — left-leaning diagonal doubled */}
        <line x1="7"  y1="3"  x2="37" y2="33"/>
        <line x1="3"  y1="7"  x2="33" y2="37"/>
        {/* // pair — right-leaning diagonal doubled */}
        <line x1="33" y1="3"  x2="3"  y2="33"/>
        <line x1="37" y1="7"  x2="7"  y2="37"/>
      </DualSvg>
    ),
    origLabel: 'Latin X — two crossing diagonals',
    dualLabel: 'Dual X — each diagonal doubled (4 lines)',
  },
  {
    orig: 'A',
    dual: (
      <DualSvg>
        {/* Left diagonal pair */}
        <line x1="22" y1="5"  x2="6"  y2="37"/>
        <line x1="18" y1="3"  x2="2"  y2="35"/>
        {/* Right diagonal pair */}
        <line x1="22" y1="3"  x2="38" y2="35"/>
        <line x1="18" y1="5"  x2="34" y2="37"/>
        {/* Crossbar pair */}
        <line x1="11" y1="22" x2="29" y2="22"/>
        <line x1="11" y1="26" x2="29" y2="26"/>
      </DualSvg>
    ),
    origLabel: 'Latin A — two diagonals + crossbar',
    dualLabel: 'Dual A — every stroke doubled (6 lines)',
  },
  {
    orig: 'I',
    dual: (
      <DualSvg>
        {/* Two parallel verticals */}
        <line x1="14" y1="8"  x2="14" y2="32"/>
        <line x1="24" y1="8"  x2="24" y2="32"/>
        {/* Top serif pair */}
        <line x1="8"  y1="4"  x2="30" y2="4"/>
        <line x1="8"  y1="9"  x2="30" y2="9"/>
        {/* Bottom serif pair */}
        <line x1="8"  y1="31" x2="30" y2="31"/>
        <line x1="8"  y1="36" x2="30" y2="36"/>
      </DualSvg>
    ),
    origLabel: 'Latin I — vertical line + serifs',
    dualLabel: 'Dual I — doubled vertical + doubled serifs',
  },
  {
    orig: 'L',
    dual: (
      <DualSvg>
        {/* Outer L: full-height vert + bottom horiz */}
        <line x1="6"  y1="4"  x2="6"  y2="36"/>
        <line x1="6"  y1="36" x2="34" y2="36"/>
        {/* Inner L: shorter vert + upper horiz, nested inside */}
        <line x1="13" y1="4"  x2="13" y2="29"/>
        <line x1="13" y1="29" x2="34" y2="29"/>
      </DualSvg>
    ),
    origLabel: 'Latin L — vertical + horizontal stroke',
    dualLabel: 'Dual L — two nested L-corners (doubled strokes)',
  },
  {
    orig: 'Y',
    dual: (
      <DualSvg>
        {/* Left upper diagonal pair */}
        <line x1="18" y1="20" x2="3"  y2="6"/>
        <line x1="22" y1="16" x2="7"  y2="2"/>
        {/* Right upper diagonal pair */}
        <line x1="22" y1="20" x2="37" y2="6"/>
        <line x1="18" y1="16" x2="33" y2="2"/>
        {/* Lower vertical pair */}
        <line x1="17" y1="19" x2="17" y2="37"/>
        <line x1="23" y1="19" x2="23" y2="37"/>
      </DualSvg>
    ),
    origLabel: 'Latin Y — two upper diagonals + vertical',
    dualLabel: 'Dual Y — every stroke doubled (6 lines)',
  },
];

// ── Dual Symbol pairs for circle-like demo ────────────────────
const CIRCLE_PAIRS = [
  { orig: 'O',  dual: '◎',  origLabel: 'Ogbe circle / letter O', dualLabel: 'Bullseye — dual circle (circle within circle)' },
  { orig: '○',  dual: '⊙',  origLabel: 'White circle', dualLabel: 'Circle with dot — dual circle' },
  { orig: '0',  dual: '⊘',  origLabel: 'Zero (circle-like digit)', dualLabel: 'Empty set / slashed zero — dual circle' },
];

// ── Ogbe Energy Symbol (4-petal clover · cyan) ───────────────
function OgbeSymbol() {
  return (
    <svg width="1.1em" height="1.1em" viewBox="-2 -2 4 4"
      style={{ display: 'inline-block', verticalAlign: '-0.18em' }}
      aria-hidden="true">
      <circle cx="0"  cy="-1" r="1" fill="var(--cyan)" />
      <circle cx="1"  cy="0"  r="1" fill="var(--cyan)" />
      <circle cx="0"  cy="1"  r="1" fill="var(--cyan)" />
      <circle cx="-1" cy="0"  r="1" fill="var(--cyan)" />
    </svg>
  );
}

// ── Oyeku Anergy Symbol (4 elongated oval petals · gold) ─────
function OyekuSymbol() {
  return (
    <svg width="1.1em" height="1.1em" viewBox="-2.2 -2.2 4.4 4.4"
      style={{ display: 'inline-block', verticalAlign: '-0.18em' }}
      aria-hidden="true">
      <ellipse cx="0"    cy="-1.4" rx="0.65" ry="1.4"  fill="var(--gold)" />
      <ellipse cx="1.4"  cy="0"    rx="1.4"  ry="0.65" fill="var(--gold)" />
      <ellipse cx="0"    cy="1.4"  rx="0.65" ry="1.4"  fill="var(--gold)" />
      <ellipse cx="-1.4" cy="0"    rx="1.4"  ry="0.65" fill="var(--gold)" />
    </svg>
  );
}

// ── Duality Table Data ────────────────────────────────────────
const DUALITY_ROWS = [
  { left: 'Ojú',  right: 'Òdì',  mid: '/',  leftSub: 'Face · Front',  rightSub: 'Back · Reverse' },
  { left: 'Ifá',  right: 'Òrìṣà', mid: '↔', leftSub: 'Energy (Ogbe)', rightSub: 'Anergy (Oyeku)' },
  { left: 'IfaLang', right: 'OrisaLang', mid: '/', leftSub: 'Ifalgo · IfaAlgo', rightSub: 'orisalgo · OrisaAlgo' },
  { left: <span>Ogbe <OgbeSymbol /></span>, right: <span>Oyeku <OyekuSymbol /></span>, mid: '↔', leftSub: 'Energyform subscript', rightSub: 'Anergyform subscript' },
  { left: 'Left-Brain', right: 'Right-Brain', mid: '/', leftSub: 'Logical · Mathematical', rightSub: 'Intuitive · Artistic' },
  { left: 'Original symbol', right: 'Dual symbol', mid: '→', leftSub: 'Any char, any script', rightSub: 'New symbol — generated by orisalgo' },
];

// ── Knowledge Language examples ───────────────────────────────
const KNOWLEDGE_LANGS = [
  { icon: '∑', name: 'Mathematics', desc: 'Mathematical notation extended via IfaLang/OrisaLang — every symbol gets a dual, generating a richer symbolic field.' },
  { icon: '♩', name: 'Music Notation', desc: 'Musical symbols gain dual counterparts — interval inversions, rhythmic duals, and anergy-state notations.' },
  { icon: 'ACGT', name: 'DNA/RNA Notation', desc: 'Biological base symbols extended — each nucleotide character maps to a dual anergyform character.' },
  { icon: '⌨', name: 'Programming Languages', desc: 'Code syntax — operators, keywords, brackets — each extended with dual symbols via orisalgo.' },
  { icon: '⚖', name: 'Legal Language', desc: 'Jurisprudential terms and legal frameworks expressed as knowledge languages, extendable by IfaLang/OrisaLang.' },
  { icon: '≡', name: 'Logic & Philosophy', desc: 'Formal logic symbols (∧, ∨, →, ¬) each acquire dual counterparts, building a richer logic of Everything.' },
];

// ── Platform Switcher ─────────────────────────────────────────
function PlatformSwitcher() {
  return (
    <div className="platform-switcher" aria-label="Switch scripting platform">
      <a href="../" className="platform-switcher__pill platform-switcher__pill--ifa">
        <span className="platform-switcher__icon">⌨</span>
        <span className="platform-switcher__label">IfaScript</span>
      </a>
      <div className="platform-switcher__pill platform-switcher__pill--active" aria-current="page">
        <span className="platform-switcher__icon">◈</span>
        <span className="platform-switcher__label">OrisaScript</span>
      </div>
    </div>
  );
}

// ── Header ────────────────────────────────────────────────────
function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`header${scrolled ? ' header--scrolled' : ''}`}>
      <div className="header__inner">
        <a href="../" className="header__back">
          <span className="header__back-arrow">←</span>
          <span>IfaScript · ScriptoE</span>
        </a>
        <div className="header__brand">
          <span className="header__brand-icon">⊙</span>
          <span className="header__brand-name">OrisaScript</span>
          <span className="header__brand-tag">orisalgo</span>
        </div>
        <PlatformSwitcher />
        <nav className="header__nav">
          <a className="nav-link" href="#duality">Duality</a>
          <a className="nav-link" href="#algorithms">Algorithms</a>
          <a className="nav-link" href="#methods">Methods</a>
          <a className="nav-link" href="#knowledge-langs">Knowledge Languages</a>
          <a className="nav-link" href="#sidechrx">SIDECHRX</a>
          <a className="nav-link nav-link--cta" href="../">IfaScript →</a>
        </nav>
      </div>
    </header>
  );
}

// ── Hero Section ──────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="hero" id="hero">
      <div className="hero__grid-bg" aria-hidden="true" />
      <div className="hero__bg-glyphs" aria-hidden="true">
        {HERO_GLYPHS.map((g, i) => (
          <span
            key={i}
            className="hero__bg-glyph"
            style={{
              top:               `${4   + (i * 4.7  % 92)}%`,
              left:              `${1   + (i * 7.1  % 97)}%`,
              fontSize:          `${0.7 + (i % 5) * 0.38}rem`,
              animationDelay:    `${i   * 0.28}s`,
              animationDuration: `${5   + (i % 4) * 1.9}s`,
              color: i % 3 === 0
                ? 'rgba(245,197,24,0.16)'
                : i % 3 === 1
                ? 'rgba(124,77,255,0.14)'
                : 'rgba(0,212,255,0.10)',
            }}
          >{g}</span>
        ))}
      </div>
      <div className="container hero__inner">
        <div className="hero__eyebrow">
          <span className="hero__eyebrow-tag">⊙ The Orisa Scripting Algorithm</span>
          <a className="hero__eyebrow-parent" href="../">↑ IfaScript · ScriptoE</a>
        </div>
        <div className="hero__prompt">
          <span className="hero__prompt-prefix">orisascript:~$</span>
          <span className="hero__prompt-cmd"> generate --dual-symbols --all-scripts --duality-principle</span>
          <span className="hero__prompt-cursor">▊</span>
        </div>
        <h1 className="hero__title">
          <span className="hero__title-gold">OrisaScript</span>
          <span className="hero__title-sep"> · </span>
          <span className="hero__title-sub">Orisa-Script</span>
        </h1>

        {/* Dual ribbon */}
        <div className="hero__dual-ribbon" aria-label="OrisaScript dual symbol ribbon">
          <div className="hero__dual-marquee" aria-hidden="true">
            <span className="hero__dual-track">
              | → ‖ • O → ◎ • / → ⫽ • A → Ā • ا → اا • α → αα • – → ═ • ○ → ⊙ • I → ‼ • 0 → ⊘ • Q → ⊛ • ∑ → ΣΣ • ♩ → ♩♩ •
            </span>
            <span className="hero__dual-track" aria-hidden="true">
              | → ‖ • O → ◎ • / → ⫽ • A → Ā • ا → اا • α → αα • – → ═ • ○ → ⊙ • I → ‼ • 0 → ⊘ • Q → ⊛ • ∑ → ΣΣ • ♩ → ♩♩ •
            </span>
          </div>
          <div className="hero__dual-label">
            <span className="hero__dual-bracket" aria-hidden="true">⌜</span>
            <span className="hero__dual-text">The Orisa Dual Symbol Principle</span>
            <span className="hero__dual-bracket" aria-hidden="true">⌟</span>
          </div>
        </div>

        <p className="hero__tagline">Generating the Dual of Every Symbol in Every Script</p>
        <p className="hero__desc">
          <strong>OrisaScript</strong> (also written as <strong>Orisa-Script</strong>) is the{' '}
          <em>OrisaLang Algorithm (orisalgo)</em> of the IFA Internet — the intuitive, artistic,
          right-brained counterpart to IfaLang (ifalgo). Using the{' '}
          <strong>Duality Principle (Ojú/Òdì)</strong>, it takes any character or symbol in any
          language in the world — natural or artificial — creates its dual symbol, and adds the{' '}
          <strong>Oyeku Anergy Symbol</strong> as subscript, declaring it as an{' '}
          <em>anergyform</em> or <em>anergystate</em>.
        </p>
        <div className="hero__ctas">
          <a className="btn btn--primary" href="#algorithms">Explore the Algorithms</a>
          <a className="btn btn--ghost" href="#methods">Dual Symbol Methods →</a>
        </div>
        <div className="hero__stats">
          <div className="hero__stat">
            <div className="hero__stat-val">2</div>
            <div className="hero__stat-lab">Paired Algorithms (IfaLang + OrisaLang)</div>
          </div>
          <div className="hero__stat">
            <div className="hero__stat-val">∞</div>
            <div className="hero__stat-lab">Symbols Extendable (any language)</div>
          </div>
          <div className="hero__stat">
            <div className="hero__stat-val">256</div>
            <div className="hero__stat-lab">Odu Ifa — Axiomatic Base</div>
          </div>
          <div className="hero__stat">
            <div className="hero__stat-val">Ojú/Òdì</div>
            <div className="hero__stat-lab">The Generating Duality Principle</div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Duality Principle Section ─────────────────────────────────
function DualitySection() {
  return (
    <section className="section" id="duality">
      <div className="container">
        <div className="section__head">
          <p className="section__eyebrow">// The Generating Principle</p>
          <h2 className="section__title">The Duality Principle — Ojú / Òdì</h2>
          <p className="section__desc">
            At the foundation of OrisaScript is the <strong>Duality Principle</strong> — the
            Ifa-Orisa law of Dual and Partner, expressed as <strong>Ojú/Òdì</strong> (Face/Back).
            Everything in existence has a dual: every symbol, every character, every script, every
            concept. OrisaScript is the algorithmic engine for generating those duals.
          </p>
        </div>

        <div className="duality-table">
          <div className="duality-table__header">
            <span className="duality-table__col-head duality-table__col-head--left">Ifá Side (Ojú)</span>
            <span className="duality-table__col-head duality-table__col-head--mid">Dual</span>
            <span className="duality-table__col-head duality-table__col-head--right">Òrìṣà Side (Òdì)</span>
          </div>
          {DUALITY_ROWS.map((r, i) => (
            <div key={i} className="duality-table__row">
              <div>
                <div className="duality-table__cell duality-table__cell--left">{r.left}</div>
                <div className="duality-table__cell duality-table__cell--label">{r.leftSub}</div>
              </div>
              <div className="duality-table__cell duality-table__cell--mid">{r.mid}</div>
              <div style={{ textAlign: 'right' }}>
                <div className="duality-table__cell duality-table__cell--right">{r.right}</div>
                <div className="duality-table__cell duality-table__cell--label-r">{r.rightSub}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="principle-callout">
          <div className="principle-callout__eyebrow">// IfaPrinciple · Duality</div>
          <div className="principle-callout__title">
            The Generating IfaPrinciple: Duality (Ojú/Òdì)
          </div>
          <p className="principle-callout__body">
            The <em>Duality Principle</em> is the IfaPrinciple used to build dual symbols in{' '}
            <strong>any language (script or writing system) in the world</strong> — natural or
            artificial. It is expressed in the Ifa-Orisa system as <em>Ojú/Òdì</em> (Face/Back) —
            the complementary poles of every reality. <strong>Ifá</strong> and <strong>Òrìṣà</strong>{' '}
            are themselves a Dual/Partner pair (Ojú/Òdì): Ifá is the Energy pole (Ogbe), and Òrìṣà
            is the Anergy pole (Oyeku). The IfaLang algorithm (ifalgo) operates on the Ifá/Ojú side —
            adding the <em>Ogbe Energy Symbol</em> as subscript to declare an{' '}
            <strong>energyform</strong> or <strong>energystate</strong>. The OrisaLang algorithm
            (orisalgo) operates on the Òrìṣà/Òdì side — generating the dual symbol and adding the{' '}
            <em>Oyeku Anergy Symbol</em> as subscript to declare an{' '}
            <strong>anergyform</strong> or <strong>anergystate</strong>.
          </p>
        </div>
      </div>
    </section>
  );
}

// ── Algorithm Cards Section ───────────────────────────────────
function AlgorithmsSection() {
  return (
    <section className="section section--alt" id="algorithms">
      <div className="container">
        <div className="section__head">
          <p className="section__eyebrow">// The Two Paired Algorithms</p>
          <h2 className="section__title">IfaLang Algorithm · OrisaLang Algorithm</h2>
          <p className="section__desc">
            IfaLang (ifalgo) and OrisaLang (orisalgo) are the Dual pair of scripting algorithms
            at the heart of OrisaScript. Together they form a complete system for extending any
            symbol, character, or script into the full Ifa-Orisa field of energyforms and anergyforms.
          </p>
        </div>

        <div className="algo-duo">
          {/* IfaLang card */}
          <div className="algo-card algo-card--ifa">
            <div className="algo-card__glow" aria-hidden="true" />
            <div className="algo-card__tag">Ojú · Energy Side</div>
            <div className="algo-card__icon">⊕</div>
            <div className="algo-card__title">IfaLang Algorithm</div>
            <div className="algo-card__aliases">IfaAlgo · Ifalgo · IfaLang Algo</div>
            <p className="algo-card__desc">
              Takes any character, symbol, or sign in the world — from any language, script, or
              writing system — and adds the <strong>Ogbe Energy Symbol (SymboE)</strong> to it as
              subscript. This declares the character as an <strong>energyform</strong> or{' '}
              <strong>energystate</strong> in IfaLang — the Language of the Theory of Everything.
            </p>
            <div className="algo-card__traits">
              {['Logical', 'Mathematical', 'Methodical', 'Left-Brained', 'Systematic'].map(t => (
                <span key={t} className="algo-card__trait">{t}</span>
              ))}
            </div>
            <div className="algo-formula">
              <span className="algo-formula__elem">X</span>
              <span className="algo-formula__op">+</span>
              <span className="algo-formula__elem">SymboE</span>
              <span className="algo-formula__op">→</span>
              <span className="algo-formula__result">X꜀ (energyform)</span>
            </div>
          </div>

          {/* OrisaLang card */}
          <div className="algo-card algo-card--orisa">
            <div className="algo-card__glow" aria-hidden="true" />
            <div className="algo-card__tag">Òdì · Anergy Side</div>
            <div className="algo-card__icon">⊙</div>
            <div className="algo-card__title">OrisaLang Algorithm</div>
            <div className="algo-card__aliases">OrisaAlgo · orisalgo · OrisaLang Algo</div>
            <p className="algo-card__desc">
              Takes any character, symbol, or sign in the world — from any language, script, or
              writing system — <strong>creates its dual symbol</strong> (a new symbol generated by
              the Duality Principle), and adds the <strong>Oyeku Anergy Symbol (SymboN)</strong> to
              it as subscript. This declares the dual character as an{' '}
              <strong>anergyform</strong> or <strong>anergystate</strong> in OrisaLang.
            </p>
            <div className="algo-card__traits">
              {['Intuitive', 'Instinctive', 'Artistic', 'Creative', 'Right-Brained'].map(t => (
                <span key={t} className="algo-card__trait">{t}</span>
              ))}
            </div>
            <div className="algo-formula">
              <span className="algo-formula__elem">X</span>
              <span className="algo-formula__op">→</span>
              <span className="algo-formula__elem">X̄ (dual)</span>
              <span className="algo-formula__op">+</span>
              <span className="algo-formula__result">X̄꜀ (anergyform)</span>
            </div>
          </div>
        </div>

        {/* Mind mode comparison */}
        <div className="mind-duo">
          <div className="mind-card mind-card--ifa">
            <div className="mind-card__icon">🧠</div>
            <div className="mind-card__name">IfaLang (ifalgo) — Left Brain</div>
            <div className="mind-card__brain">Ojú · Ifá · Energy Pole</div>
            <div className="mind-card__traits">
              <div className="mind-card__trait">Logical and rule-based — proceeds from axioms</div>
              <div className="mind-card__trait">Mathematical — operates on formal symbolic structures</div>
              <div className="mind-card__trait">Methodical — step-by-step, systematic application</div>
              <div className="mind-card__trait">Produces energyforms — the Ogbe (active) pole of any symbol</div>
            </div>
          </div>
          <div className="mind-card mind-card--orisa">
            <div className="mind-card__icon">✦</div>
            <div className="mind-card__name">OrisaLang (orisalgo) — Right Brain</div>
            <div className="mind-card__brain">Òdì · Òrìṣà · Anergy Pole</div>
            <div className="mind-card__traits">
              <div className="mind-card__trait">Intuitive and instinctive — feels the dual before defining it</div>
              <div className="mind-card__trait">Artistic and creative — generates new forms, not copies</div>
              <div className="mind-card__trait">Holistic — perceives the whole duality at once</div>
              <div className="mind-card__trait">Produces anergyforms — the Oyeku (receptive) pole of any symbol</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Methods Section ───────────────────────────────────────────
function MethodsSection() {
  return (
    <section className="section section--purple-tint" id="methods">
      <div className="container">
        <div className="section__head">
          <p className="section__eyebrow">// OrisaLang (orisalgo) — Dual Symbol Generation</p>
          <h2 className="section__title">How to Generate Dual Symbols</h2>
          <p className="section__desc">
            The OrisaLang Algorithm (orisalgo) uses the Duality Principle to generate new symbols
            as dual counterparts of existing characters. The technique depends on the nature of the
            original symbol. Below are the two primary methods — with examples from world scripts.
          </p>
        </div>

        <div className="methods-grid">
          {/* Method 1 — Line-like */}
          <div className="method-card">
            <div className="method-card__header">
              <div className="method-card__num">Method 1 · Ifalgo — Line-Like Symbols</div>
              <div className="method-card__title">Dual / Double Lines</div>
              <p className="method-card__rule">
                Where there are lines in the symbols or characters — or where they are essentially
                just lines — use <strong>dual (double) lines</strong> to generate the dual symbol.
                A single line becomes two lines; a single stroke becomes a double stroke.
                Where the symbol is not purely line-like, <strong>apply the Duality Principle</strong>{' '}
                (or modify the symbol appropriately) to generate a dual that captures the
                doubled-line essence.
              </p>
            </div>
            <div className="method-card__examples">
              <div className="method-card__ex-label">Examples — world scripts</div>
              <div className="symbol-pairs">
                {LINE_PAIRS.map((p, i) => (
                  <div key={i} className="symbol-pair">
                    <div className="symbol-pair__orig">{p.orig}</div>
                    <div className="symbol-pair__arrow">→</div>
                    <div className="symbol-pair__dual">{p.dual}</div>
                    <div className="symbol-pair__label">
                      <strong>{p.origLabel}</strong><br />
                      <span>Dual: {p.dualLabel}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Method 2 — Circle-like */}
          <div className="method-card">
            <div className="method-card__header">
              <div className="method-card__num">Method 2 · orisalgo — Circle-Like Symbols</div>
              <div className="method-card__title">Dual / Double Circles</div>
              <p className="method-card__rule">
                Where there are circles in the symbols or characters — or where they are essentially
                just circles — use <strong>dual (double) circles</strong> to generate the dual symbol.
                A single circle becomes two nested circles, a circle within a circle, or a
                circle-with-dot. Where the symbol is not purely circle-like, <strong>apply the
                Duality Principle</strong> (or modify the symbol appropriately) to generate a dual
                that captures the doubled-circle essence.
              </p>
            </div>
            <div className="method-card__examples">
              <div className="method-card__ex-label">Examples — world scripts</div>
              <div className="symbol-pairs">
                {CIRCLE_PAIRS.map((p, i) => (
                  <div key={i} className="symbol-pair">
                    <div className="symbol-pair__orig">{p.orig}</div>
                    <div className="symbol-pair__arrow">→</div>
                    <div className="symbol-pair__dual">{p.dual}</div>
                    <div className="symbol-pair__label">
                      <strong>{p.origLabel}</strong><br />
                      <span>Dual: {p.dualLabel}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Principle note */}
        <div className="principle-callout" style={{ marginBottom: 0 }}>
          <div className="principle-callout__eyebrow">// orisalgo · General Principle</div>
          <div className="principle-callout__title">
            Combining the Duality Principle for Non-Line, Non-Circle Symbols
          </div>
          <p className="principle-callout__body">
            For symbols that are <em>neither purely line-like nor purely circle-like</em>, the
            OrisaLang Algorithm (orisalgo) applies the <strong>Duality Principle</strong> directly —
            modifying the symbol appropriately to generate a new symbol that expresses its dual
            nature. This may involve combining the Duality Principle with the symbol's inherent
            visual structure: doubling a component, mirroring it, inverting it, or composing it
            with a complementary form. The result is always a <strong>new symbol</strong> — not
            a copy — that faithfully represents the Òdì (Back/Dual) of the original. This is
            why OrisaLang is <em>artistic and right-brained</em>: the generation of the dual
            requires creative perception, not mechanical rule application.
          </p>
        </div>
      </div>
    </section>
  );
}

// ── Knowledge Languages Section ───────────────────────────────
function KnowledgeLanguagesSection() {
  return (
    <section className="section section--alt" id="knowledge-langs">
      <div className="container">
        <div className="section__head">
          <p className="section__eyebrow">// Extensions to All Fields of Knowledge</p>
          <h2 className="section__title">IfaLang · OrisaLang Across All Knowledge Languages</h2>
          <p className="section__desc">
            The IfaLang (ifalgo) and OrisaLang (orisalgo) algorithms reveal how to use the
            Ifa-Orisa System to <strong>develop new symbols or characters as extensions of any kind
            of language in the world</strong> — both natural and artificial/constructed. This
            includes the lingos of every field of study — called{' '}
            <strong>knowledge languages</strong> on the IFA Internet. These frameworks are
            languages in their own right: any notation system, symbolic vocabulary, or formal
            language in any discipline is a knowledge language that IfaLang and OrisaLang can
            extend, enrich, and unify within the IFA-Orisa scripting system.
          </p>
        </div>

        <div className="knowledge-grid">
          {KNOWLEDGE_LANGS.map((k, i) => (
            <div key={i} className="knowledge-card">
              <div className="knowledge-card__icon">{k.icon}</div>
              <div className="knowledge-card__name">{k.name}</div>
              <p className="knowledge-card__desc">{k.desc}</p>
            </div>
          ))}
        </div>

        <div className="principle-callout" style={{ marginBottom: 0 }}>
          <div className="principle-callout__eyebrow">// Building New Scripts</div>
          <div className="principle-callout__title">
            How These Ifalgos Build New Scripts for Any Language or Framework
          </div>
          <p className="principle-callout__body">
            The IfaLang (ifalgo) and OrisaLang (orisalgo) algorithms do not merely annotate
            existing symbols — they <em>generate new symbolic languages</em>. Applied to any
            natural language (Arabic, Chinese, Yoruba, Greek, Sanskrit…) or any artificial language
            (programming languages, mathematical notation, musical staff, DNA notation…), the two
            algorithms produce a complete <strong>Dual Script Extension</strong>: every original
            symbol acquires an energyform (via IfaLang) and an anergyform (via OrisaLang),
            effectively doubling the expressive capacity of the script. This is how the Ifa-Orisa
            System can <strong>build a new script for a new or existing language</strong> — or
            extend any framework in any field of study. The 256 Odu Ifa serve as the{' '}
            <em>axiomatic energy-exchange matrix</em> underlying all such extensions, grounding
            every new symbol in the universal structure of Consciousness-Energy.
          </p>
        </div>
      </div>
    </section>
  );
}

// ── SIDECHRX Principle System Section ────────────────────────
const SIDECHRX_PRINCIPLES = [
  {
    letter: 'S',
    name: 'Symmetry',
    color: '#00d4ff',
    colorDim: 'rgba(0,212,255,0.10)',
    colorBorder: 'rgba(0,212,255,0.2)',
    icon: '⇔',
    scriptApp: 'Mirror and rotational symmetry operations on existing symbols generate new characters — reflections, 180° rotations, and glide symmetries naturally expand a script\'s character set while preserving visual coherence.',
  },
  {
    letter: 'I',
    name: 'Invariance',
    color: '#39d353',
    colorDim: 'rgba(57,211,83,0.10)',
    colorBorder: 'rgba(57,211,83,0.2)',
    icon: '≡',
    scriptApp: 'Invariant properties of symbols — stroke count, topology, directionality — are preserved across transformations. New characters generated under Invariance remain recognisably within the same script family even as new features are added.',
  },
  {
    letter: 'D',
    name: 'Duality',
    color: '#f5c518',
    colorDim: 'rgba(245,197,24,0.10)',
    colorBorder: 'rgba(245,197,24,0.22)',
    icon: '⊙',
    scriptApp: 'The primary principle of OrisaScript (orisalgo): every symbol generates its dual — double lines for line-like symbols, double circles for circle-like symbols, and creative dualisation for all others. Covered in full on this page.',
  },
  {
    letter: 'E',
    name: 'Emergence',
    color: '#ff6b35',
    colorDim: 'rgba(255,107,53,0.10)',
    colorBorder: 'rgba(255,107,53,0.2)',
    icon: '✦',
    scriptApp: 'New symbols and script features arise from the interaction of simpler elements — not designed top-down but allowed to emerge from combining existing forms. Emergent scripts often have organic, self-organising character sets.',
  },
  {
    letter: 'C',
    name: 'Composition',
    color: '#7c4dff',
    colorDim: 'rgba(124,77,255,0.10)',
    colorBorder: 'rgba(124,77,255,0.22)',
    icon: '⊕',
    scriptApp: 'New characters and scripts are built by composing existing symbols — ligatures, compound glyphs, stacked diacritics, and modular glyph assemblies. Composition is the structural engine behind most of the world\'s complex writing systems.',
  },
  {
    letter: 'H',
    name: 'Holism',
    color: '#c4813a',
    colorDim: 'rgba(196,129,58,0.10)',
    colorBorder: 'rgba(196,129,58,0.2)',
    icon: '◉',
    scriptApp: 'A script is designed and interpreted as a whole system — each symbol acquires meaning in relation to all others. Holistic script development ensures internal consistency, shared aesthetic grammar, and systemic coherence across the full glyph set.',
  },
  {
    letter: 'R',
    name: 'Reductionism',
    color: '#e63946',
    colorDim: 'rgba(230,57,70,0.10)',
    colorBorder: 'rgba(230,57,70,0.2)',
    icon: '↓',
    scriptApp: 'Scripts are built from the smallest irreducible elements — minimal strokes, base marks, atomic glyphs — and all characters are derived from these primitives. Reductionist script design yields maximally consistent, learnable, and encodable symbol systems.',
  },
  {
    letter: 'X',
    name: 'Others',
    color: '#8892aa',
    colorDim: 'rgba(136,146,170,0.10)',
    colorBorder: 'rgba(136,146,170,0.18)',
    icon: '∞',
    scriptApp: 'Beyond SIDECHR, additional principles drawn from linguistics, cognitive science, semiotics, and the IFA Body of Knowledge (IFABOK) may be applied — including analogy, recursion, resonance, and field-theoretic approaches from IfaLang and IfaGebra.',
  },
];

function SidechrxSection() {
  return (
    <section className="section" id="sidechrx">
      <div className="container">
        <div className="section__head">
          <p className="section__eyebrow">// Beyond Duality — The SIDECHRX Principle System</p>
          <h2 className="section__title">Generating New Scripts Using Non-Dualistic Principles</h2>
          <p className="section__desc">
            While the Duality Principle (D) is the defining engine of OrisaScript, it is one of
            eight generative principles in the <strong>SIDECHRX Principle System</strong> of the
            IFA Body of Knowledge (IFABOK). Each principle offers a distinct method for generating
            new symbols, extending existing scripts, and building knowledge languages — applicable
            to natural writing systems, constructed scripts, notation systems, and all other
            knowledge languages on the IFA Internet.
          </p>
        </div>

        {/* SIDECHRX acronym display */}
        <div className="sidechrx-acronym">
          {SIDECHRX_PRINCIPLES.map(p => (
            <div key={p.letter} className="sidechrx-letter" style={{ '--p-color': p.color, '--p-dim': p.colorDim, '--p-border': p.colorBorder }}>
              <span className="sidechrx-letter__char">{p.letter}</span>
              <span className="sidechrx-letter__name">{p.name}</span>
            </div>
          ))}
        </div>

        {/* Principle cards */}
        <div className="sidechrx-grid">
          {SIDECHRX_PRINCIPLES.map(p => (
            <div key={p.letter} className="sidechrx-card" style={{ '--p-color': p.color, '--p-dim': p.colorDim, '--p-border': p.colorBorder }}>
              <div className="sidechrx-card__top">
                <div className="sidechrx-card__badge">
                  <span className="sidechrx-card__letter">{p.letter}</span>
                  <span className="sidechrx-card__icon">{p.icon}</span>
                </div>
                <div>
                  <div className="sidechrx-card__name">{p.name}</div>
                  {p.letter === 'D' && (
                    <span className="sidechrx-card__active-tag">Active on this page</span>
                  )}
                </div>
              </div>
              <p className="sidechrx-card__desc">{p.scriptApp}</p>
            </div>
          ))}
        </div>

        <div className="principle-callout" style={{ marginBottom: 0 }}>
          <div className="principle-callout__eyebrow">// SIDECHRX in Script Generation</div>
          <div className="principle-callout__title">
            One Principle System — All Methods of Script Creation
          </div>
          <p className="principle-callout__body">
            The <em>SIDECHRX Principle System</em> — <strong>Symmetry, Invariance, Duality,
            Emergence, Composition, Holism, Reductionism, and Others (X)</strong> — is the
            IFA Internet's framework for understanding how scripts, symbols, and knowledge
            languages are generated, structured, and extended. Every writing system ever
            created — from the Chinese logographic script to the IFA binary system — can be
            analysed and built through one or more of these principles. <em>Duality (D)</em>{' '}
            is the principle OrisaScript specialises in; the remaining principles (S, I, E, C,
            H, R, X) are equally available for script generation and language development,
            each revealing a different dimension of how symbolic systems grow. Together, the
            SIDECHRX principles constitute a <strong>complete generative theory of scripting</strong>{' '}
            — applicable across all natural languages, constructed languages, knowledge
            languages, and the full expressive field of the IFA Internet.
          </p>
        </div>
      </div>
    </section>
  );
}

// ── CTA Section ───────────────────────────────────────────────
function CtaSection() {
  return (
    <section className="section" id="explore">
      <div className="container">
        <div className="cta-block">
          <div className="cta-block__prompt">
            <span className="cta-prompt-prefix">orisascript:~$</span>
            <span className="cta-prompt-cmd"> generate --dual --all-langs --ifa-orisa-system</span>
          </div>
          <div className="cta-block__symbol">⊙</div>
          <h2 className="cta-block__title">
            The Dual Script<br />
            <span className="cta-block__title-sub">for Everything</span>
          </h2>
          <p className="cta-block__desc">
            OrisaScript — the Orisa-Script and orisalgo of the IFA Internet — is the artistic,
            intuitive engine of symbolic duality. Paired with IfaLang (ifalgo), it completes the
            Ifa-Orisa scripting system: every symbol in every language now has an energyform
            and an anergyform, a Face (Ojú) and a Back (Òdì).
          </p>
          <div className="cta-block__btns">
            <a className="btn btn--primary" href="../">IfaScript · ScriptoE →</a>
            <a className="btn btn--secondary" href="../../ifa-language/">IFA Language (IfaLang) →</a>
            <a
              className="btn btn--ghost"
              href="https://toe.cenproject.org/"
              target="_blank"
              rel="noopener noreferrer"
            >The IFA Internet</a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <span className="footer__brand-icon">⊙</span>
          <span className="footer__brand-name">OrisaScript · Orisa-Script</span>
        </div>
        <p className="footer__tagline">The Orisa Scripting Algorithm · IfaScript · The IFA Internet</p>
        <nav className="footer__links">
          <a href="#duality"         className="footer__link">Duality Principle</a>
          <a href="#algorithms"      className="footer__link">Algorithms</a>
          <a href="#methods"         className="footer__link">Dual Methods</a>
          <a href="#knowledge-langs" className="footer__link">Knowledge Languages</a>
          <a href="#sidechrx"        className="footer__link">SIDECHRX Principles</a>
          <a href="../"              className="footer__link">IfaScript · ScriptoE</a>
          <a href="../../ifa-language/" className="footer__link">IFA Language</a>
          <a href="../../ifagraphy-toegraphy/" className="footer__link">Ifagraphy</a>
          <a
            href="https://toe.cenproject.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__link"
          >The IFA Internet</a>
        </nav>
        <p className="footer__copy">© CENProject — toe.cenproject.org</p>
      </div>
    </footer>
  );
}

// ── App ───────────────────────────────────────────────────────
function App() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <DualitySection />
        <AlgorithmsSection />
        <MethodsSection />
        <KnowledgeLanguagesSection />
        <SidechrxSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
