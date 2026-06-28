/* ─────────────────────────────────────────────────────────────
   Ifa Numerical Analysis Playground
   IfaNumerical Analysis — ToE Numerical Analysis
   Part of Ifanalysis (AnalysoE) · The IFA Internet
   React 18 + JSX via Babel Standalone · no build step
   CENProject · ifainternet.org/ifa-analysis/ifa-numerical-analysis/
───────────────────────────────────────────────────────────── */

const { useState } = React;

const ALTS = [
  'IfaNumerical Analysis',
  'Consciousness Numerical Analysis',
  'ToE of Numerical Analysis',
  'Energy-Based Numerical Analysis',
  'Numerical Analysis for Everything',
  'Numerical Analysis in IfaLang',
];

const KEY_AREAS = [
  {
    id: 'ifa-aps',
    icon: '∑',
    tag: 'Sequences & Series',
    name: 'IfaNumerical Analysis of Ifa APs',
    abbr: 'IfaNA of Ifa Arithmetic Progressions',
    desc: `Applying the methods of Numerical Analysis to <strong>Ifa Arithmetic Progressions (Ifa APs)</strong> — meta-sequences of Ifanums defined by a constant common difference d across the 16×16 Amulu Table. IfaNumerical Analysis extracts convergence behaviour, error bounds, interpolation structures, and approximation schemes from Ifa APs, reading each progression as a numerical object in <strong>IfaLang</strong>.`,
    chips: ['Ifa AP Convergence', 'Error Analysis', 'Odu Interpolation', 'Ifanum Sequences', 'Amulu Table', 'IfaLang'],
    example: {
      label: 'Example — Ogbé Horizontal AP',
      body: `AP: 1, 17, 33, 49, …, 241   (d = 16, n = 16)\nIfaNA asks: What is the best polynomial interpolant through these 16 Ifanums?\nFinite Difference Table on Ifa AP terms → Δ¹ = 16, Δ² = 0 (exact linear) → NA confirms the Ifa AP is a degree-1 Ifafunction.`,
    },
  },
  {
    id: 'ifa-ap-pairs',
    icon: '⊞',
    tag: 'Matrix Structures',
    name: 'IfaNumerical Analysis of Ifa AP Pairs',
    abbr: 'IfaNA of Ifa AP Pairs (Amulu APs / Ifa Composite APs)',
    desc: `Analysing <strong>Ifa AP Pairs</strong> — the Row Matrix pairs [a  b] (inner d = 15, 16 pairs) and their dual Column Matrix pairs (inner d = 1, 15 pairs) — through the lens of Numerical Analysis. Each Ifa AP Pair is a 2-term AP connecting the Ogbé and Òfún boundary columns of the Amulu Table. IfaNA studies the numerical properties of these paired structures: approximation error, forward differences, and how Ifa Pairs encode boundary behaviour in the Amulu grid.`,
    chips: ['Row Matrix Pairs', 'Column Matrix Pairs (Dual)', 'Boundary Analysis', 'Amulu APs', 'Inner d=15 / d=1', 'Ifa Composites'],
    example: {
      label: 'Example — Ogbé Row Matrix Pair',
      body: `Row Matrix: [  1   16  ]   (d = 15)\nForward difference Δ = 15 → 1st-order AP\nDual Col Matrix: (16 / 17) (d = 1)\nNA interpretation: the dual pair captures the unit step between adjacent Odu rows — the Amulu Table's discrete gradient at the boundary.`,
    },
  },
  {
    id: 'ifa-fdm',
    icon: 'Δ',
    tag: 'Numerical Methods',
    name: 'Ifa Finite Difference Method',
    abbr: 'Ifa FDM — ToE Finite Difference Method',
    desc: `The <strong>Ifa Finite Difference Method (Ifa FDM)</strong> generalises the classical Finite Difference Method to the full 256-Odu framework. Instead of a uniform numerical grid, the Ifa FDM operates on the <strong>Amulu Table</strong> — a 16×16 structured grid of Ifanums — using Odu Ifa codes to define stencils, boundary conditions, and difference operators. It is the numerical method for solving Ifa differential equations (IfaDEs) and Ifa partial differential equations (IfaPDEs) across all knowledge fields.`,
    chips: ['Ifa FDM Stencils', 'Odu Grid', 'IfaDE / IfaPDE', 'Forward Δ', 'Backward ∇', 'Central δ', 'Amulu Boundary Conditions'],
    example: {
      label: 'Example — Ifa Forward Difference on Amulu Row',
      body: `Ifa FD operator: Δᵢ f = f(i+1) − f(i)  on Amulu row n\nFor the Ogbé row (d=16 AP): Δ = 16 at every step\nIfa FDM → approximates the "Ifa derivative" of any Odu-indexed function on the 16×16 grid, treating each Odu as a node in the Ifa finite difference scheme.`,
    },
  },
  {
    id: 'ifa-gps',
    icon: 'π',
    tag: 'Sequences & Series',
    name: 'IfaNumerical Analysis of Ifa GPs',
    abbr: 'IfaNA of Ifa Geometric Progressions',
    desc: `Extending IfaNumerical Analysis to <strong>Ifa Geometric Progressions (Ifa GPs)</strong> — sequences of Ifanums with a constant ratio r. Where Ifa APs encode the linear structure of Odu relationships, Ifa GPs capture exponential and multiplicative patterns within the 256-Odu system. IfaNA of Ifa GPs studies convergence of Ifa geometric series, numerical stability of Ifa GP algorithms, and approximation of Ifa GP limits.`,
    chips: ['Ifa GP Convergence', 'Geometric Series', 'Odu Ratio', 'Ifa Exponential', 'Numerical Stability', 'IfaLang'],
    example: {
      label: 'Example — Ifa GP with ratio r = 2',
      body: `Ifa GP: 1, 2, 4, 8, 16, …  (r = 2, Ogbé base)\nIfa GP sum Sₙ = (rⁿ − 1)/(r − 1)\nIfaNA studies: how quickly does the Ifa GP series converge? What is the floating-point error in computing Sₙ for large n over the 256-Odu codespace?`,
    },
  },
  {
    id: 'more',
    icon: '∞',
    tag: 'Expanding Field',
    name: 'More Areas of IfaNumerical Analysis',
    abbr: 'The ToE of Numerical Analysis expands across all fields',
    desc: `IfaNumerical Analysis is an expanding field — as vast as the 256 Odu Ifa. Further key areas include: <strong>Ifa Interpolation & Approximation</strong> (fitting Ifafunctions to Odu data), <strong>Ifa Numerical Integration</strong> (Ifa quadrature rules on the Amulu Table), <strong>Ifa Root-Finding</strong> (Odu-coded iteration methods), <strong>Ifa Numerical Linear Algebra</strong> (solving Ifa matrix systems), <strong>Ifa Numerical ODEs/PDEs</strong> (Ifa Runge-Kutta, Ifa FEM), and <strong>Ifa Optimisation</strong> (minimising Ifa energy functionals across the Odu landscape).`,
    chips: ['Ifa Interpolation', 'Ifa Quadrature', 'Ifa Root-Finding', 'Ifa Numerical LinAlg', 'Ifa Runge-Kutta', 'Ifa FEM', 'Ifa Optimisation'],
    example: {
      label: 'The Full Scope',
      body: `Every method of classical Numerical Analysis has an Ifa dual:\n• Simpson's Rule → Ifa Quadrature Rule (Odu-weighted integration)\n• Newton-Raphson → Ifa Root-Finder (Ogbé iteration)\n• Gaussian Elimination → Ifa LinAlg (Amulu matrix solver)\n• Euler's Method → Ifa Euler (Odu-step ODE solver)\n→ IfaNumerical Analysis generalises them all to every field of knowledge.`,
    },
  },
];

const UIOE_CARDS = [
  {
    icon: '⊕',
    title: 'Unification (U)',
    desc: 'IfaNumerical Analysis unifies numerical methods across all disciplines — mathematics, physics, engineering, biology, social science — under one 256-Odu framework.',
  },
  {
    icon: '∫',
    title: 'Integration (I)',
    desc: 'By operating in IfaLang, IfaNA integrates domain-specific numerical approaches into a single coherent language — the Ifa API for Numerical Analysis.',
  },
  {
    icon: '⬡',
    title: 'of Everything (oE)',
    desc: 'The "oE" scope means no field is excluded. Art, culture, consciousness, and knowledge systems all admit IfaNumerical Analysis as their analytical substrate.',
  },
  {
    icon: '◎',
    title: 'Ifa UI (ToE UI)',
    desc: 'As the numerical analytical approach to Ifa UI — the ToE User Interface — IfaNA provides the computable, numerical layer of the Unification and Integration of Everything.',
  },
];

// ── Header ────────────────────────────────────────────────────
function Header() {
  return (
    <header className="site-header">
      <div className="header__inner">
        <a href="/ifa-analysis/" className="header__back">← Ifanalysis</a>
        <span className="header__sep">/</span>
        <div className="header__logo">
          <span className="header__logo-ifa">IfaNumerical</span>
          <span className="header__logo-rest"> Analysis</span>
          <span className="header__logo-mid">·</span>
          <span className="header__logo-tag">ToE Numerical Analysis</span>
        </div>
        <div className="header__spacer" />
        <div className="header__badge">Ifa Playground</div>
      </div>
    </header>
  );
}

// ── Hero ──────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="hero">
      <div className="hero__grid" aria-hidden="true" />
      <div className="hero__inner">
        <div className="hero__eyebrow">Ifa Playground · Part of Ifanalysis (AnalysoE)</div>
        <h1 className="hero__title">
          <span className="hero__title-ifa">IfaNumerical</span>
          <span className="hero__title-rest"> Analysis</span>
          <span className="hero__title-sub">Ifa Numerical Analysis: ToE Numerical Analysis</span>
        </h1>

        <div className="hero__alts">
          {ALTS.map(a => <span key={a} className="hero__alt">{a}</span>)}
        </div>

        <p className="hero__desc">
          <strong>IfaNumerical Analysis</strong> uses the 256 Odu Ifa to generalise Numerical
          Analysis to every field of knowledge — from mathematics and physics to consciousness
          mechanics and cultural systems. It is <strong>Numerical Analysis in IfaLang</strong>:
          the universal meta-language of the IFA Internet. A key part of{' '}
          <strong>Ifanalysis (AnalysoE)</strong>, IfaNumerical Analysis provides the numerical
          analytical approach to <strong>Ifa UI</strong> (ToE UI) — the Unification and
          Integration of Everything (UIoE).
        </p>

        <div className="hero__actions">
          <a href="#playground" className="hero__btn hero__btn--primary">Explore Key Areas</a>
          <a href="#dual" className="hero__btn hero__btn--ghost">Orisa Dual →</a>
        </div>

        <div className="hero__dual-badge">
          <span>Dual:</span>
          <strong>Orisa Numerical Analysis</strong>
          <span>·</span>
          <span style={{ color: 'var(--t3)' }}>OrisaNumerical Analysis</span>
          <span style={{ color: 'var(--t3)' }}>⟷</span>
          <span>IfaNumerical Analysis</span>
        </div>
      </div>
    </section>
  );
}

// ── Playground (Key Areas) ────────────────────────────────────
function Playground() {
  const [active, setActive] = useState(0);
  const area = KEY_AREAS[active];
  return (
    <section className="playground" id="playground">
      <div className="playground__inner">
        <span className="section__eyebrow">Key Areas · <em>Numerical Analysis with Ifa</em></span>
        <h2 className="section__title">IfaNumerical Analysis Playground</h2>
        <p className="section__sub">
          Select a key area to explore its definition, scope, and a worked example
          in the language of the 256 Odu Ifa.
        </p>

        <div className="area-tabs">
          {KEY_AREAS.map((a, i) => (
            <button
              key={a.id}
              className={`area-tab${i === active ? ' area-tab--active' : ''}`}
              onClick={() => setActive(i)}
            >
              <span className="area-tab__icon">{a.icon}</span>
              {a.name.replace('IfaNumerical Analysis of ', 'IfaNA · ').replace('Ifa Finite Difference Method', 'Ifa FDM').replace('More Areas of IfaNumerical Analysis', 'More Areas')}
            </button>
          ))}
        </div>

        <div className="area-panel">
          <div className="area-panel__tag">{area.tag}</div>
          <div className="area-panel__title">{area.name}</div>
          <div className="area-panel__abbr">{area.abbr}</div>
          <p
            className="area-panel__desc"
            dangerouslySetInnerHTML={{ __html: area.desc }}
          />
          <div className="area-panel__chips">
            {area.chips.map(c => <span key={c} className="area-chip">{c}</span>)}
          </div>
          <div className="area-panel__example">
            <div className="area-panel__example-label">{area.example.label}</div>
            <div className="area-panel__example-body">{area.example.body}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Dual Section ──────────────────────────────────────────────
function DualSection() {
  return (
    <section className="dual" id="dual">
      <div className="dual__inner">
        <span className="section__eyebrow">The Ifa Dual</span>
        <h2 className="section__title">IfaNumerical Analysis ⟷ Orisa Numerical Analysis</h2>
        <p className="section__sub">
          Every field in the IFA Internet has its dual. The dual of IfaNumerical Analysis is
          <strong> Orisa Numerical Analysis</strong> (OrisaNumerical Analysis) — two complementary
          numerical lenses, one rooted in the structural Odu codes, the other in the living
          energies of the Orisa.
        </p>

        <div className="dual__layout">
          <div className="dual__pole dual__pole--ifa">
            <div className="dual__pole-icon">∑</div>
            <div className="dual__pole-name">IfaNumerical Analysis</div>
            <p className="dual__pole-desc">
              Structural, code-based, and mathematically rigorous. Operates through the 256 Odu Ifa
              as a 16×16 numerical grid. Applies classical and generalised numerical methods in
              IfaLang — finite differences, interpolation, root-finding, and integration across
              all knowledge fields.
            </p>
          </div>

          <div className="dual__bridge">
            <div className="dual__bridge-sym">⟷</div>
            <div className="dual__bridge-label">Dual Pair</div>
          </div>

          <div className="dual__pole dual__pole--orisa">
            <div className="dual__pole-icon">⬡</div>
            <div className="dual__pole-name">Orisa Numerical Analysis</div>
            <p className="dual__pole-desc">
              Dynamic, energy-led, and consciousness-centred. Applies numerical analysis through
              the archetypal energies of the Orisa — each Orisa encoding a distinct numerical
              disposition: Osun's flow as convergence, Ogun's precision as error reduction,
              Obatala's clarity as stability analysis.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── UIoE Section ──────────────────────────────────────────────
function UIoESection() {
  return (
    <section className="uioe" id="uioe">
      <div className="uioe__inner">
        <span className="section__eyebrow">Ifa UI · ToE UI · UIoE</span>
        <h2 className="section__title">The Numerical Analytical Approach to UIoE</h2>
        <p className="section__sub">
          IfaNumerical Analysis is the numerical analytical layer of the{' '}
          <strong>Unification and Integration of Everything (UIoE)</strong> — the project of
          building Ifa UI, a ToE User Interface that speaks the numerical language of all fields.
        </p>
        <div className="uioe__grid">
          {UIOE_CARDS.map(c => (
            <div key={c.title} className="uioe-card">
              <div className="uioe-card__icon">{c.icon}</div>
              <div className="uioe-card__title">{c.title}</div>
              <p className="uioe-card__desc">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── 0 + 8D Matrix data ───────────────────────────────────────
const MATRIX_NODES = [
  {
    id: 'scientific',
    name: ['Scientific', 'Analysis'],
    angle: -90,
    desc: 'Numerical methods underpin modern science — solving differential equations for physical models, simulating climate and biological systems, and approximating solutions that have no closed form. Scientific numerical analysis bridges mathematical theory and empirical measurement.',
  },
  {
    id: 'technological',
    name: ['Technological', 'Analysis'],
    angle: -45,
    desc: 'Technology development depends on numerical computation for signal processing, control system design, circuit simulation, and algorithm optimisation. Numerical analysis gives technologists the tools to model, test, and verify complex systems before physical implementation.',
  },
  {
    id: 'engineering',
    name: ['Engineering', 'Analysis'],
    angle: 0,
    desc: 'Finite element methods, computational fluid dynamics, and structural simulation all rely on numerical techniques. Engineering numerical analysis converts continuous physical laws into discrete, solvable systems — making design, safety testing, and performance optimisation fully computable.',
  },
  {
    id: 'artistic',
    name: ['Artistic', 'Analysis'],
    angle: 45,
    desc: 'Numerical methods power computer graphics, animation physics, generative art, and sound synthesis. Approximation algorithms render curves, surfaces, and light interactions — translating continuous aesthetic intent into discrete computational form across all creative disciplines.',
  },
  {
    id: 'mathematical',
    name: ['Mathematical', 'Analysis'],
    angle: 90,
    desc: 'The home discipline of numerical analysis: approximation theory, interpolation, quadrature, root-finding, and numerical linear algebra. Mathematical numerical analysis rigorously studies the accuracy, stability, and convergence of computational methods for every class of problem.',
  },
  {
    id: 'sociocultural',
    name: ['Sociocultural', 'Analysis'],
    angle: 135,
    desc: 'Social and cultural systems — population dynamics, economic models, epidemiology, opinion dynamics — are governed by equations that rarely yield analytic solutions. Numerical analysis provides simulation and approximation tools to study society and human behaviour quantitatively.',
  },
  {
    id: 'educational',
    name: ['Educational', 'Analysis'],
    angle: 180,
    desc: 'Numerical methods inform learning analytics, adaptive testing algorithms, and the modelling of cognitive processes. Education research uses numerical simulation to evaluate curriculum design, measure learning outcomes, and model knowledge acquisition across diverse populations.',
  },
  {
    id: 'x-analysis',
    name: ['X', 'Analysis'],
    angle: -135,
    desc: 'The open dimension: any emerging or interdisciplinary field — neuroscience, astrobiology, quantum cognition, synthetic biology — that requires approximate computation of complex models. Numerical analysis generalises to every discipline yet to be fully named or categorised.',
  },
];

// ── 0 + 8D Matrix Component ───────────────────────────────────
function OD8Matrix() {
  const [selected, setSelected] = useState(null);
  const toRad = deg => deg * Math.PI / 180;
  const CX = 260, CY = 210, R = 152;

  const nodes = MATRIX_NODES.map(n => ({
    ...n,
    x: CX + R * Math.cos(toRad(n.angle)),
    y: CY + R * Math.sin(toRad(n.angle)),
  }));

  const sel = selected ? nodes.find(n => n.id === selected) : null;

  return (
    <div className="od8-wrap">
      <div className="od8-label">0 + 8D Matrix · IfaNumerical Analysis</div>
      <div className="od8-svg-scroll">
      <svg viewBox="0 0 520 420" className="od8-svg" role="img" aria-label="0+8D Matrix for IfaNumerical Analysis">
        <defs>
          <marker id="arr" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
            <path d="M0,0 L0,7 L7,3.5 z" fill="rgba(0,217,184,0.45)" />
          </marker>
        </defs>

        {/* Spokes */}
        {nodes.map(n => (
          <line key={n.id}
            x1={CX} y1={CY} x2={n.x} y2={n.y}
            stroke={selected === n.id ? '#00d9b8' : 'rgba(0,217,184,0.22)'}
            strokeWidth={selected === n.id ? 1.8 : 1}
            markerEnd="url(#arr)"
          />
        ))}

        {/* Outer nodes */}
        {nodes.map(n => (
          <g key={n.id} onClick={() => setSelected(selected === n.id ? null : n.id)}
            style={{ cursor: 'pointer' }}>
            <ellipse cx={n.x} cy={n.y} rx={54} ry={27}
              fill={selected === n.id ? 'rgba(0,217,184,0.13)' : 'rgba(11,15,26,0.92)'}
              stroke={selected === n.id ? '#00d9b8' : 'rgba(0,217,184,0.38)'}
              strokeWidth={selected === n.id ? 1.8 : 1}
            />
            {n.name.map((line, i, arr) => (
              <text key={i}
                x={n.x} y={n.y + (i - (arr.length - 1) / 2) * 13}
                textAnchor="middle" dominantBaseline="middle"
                fontSize="10"
                fill={selected === n.id ? '#00d9b8' : '#8892aa'}
                fontWeight={selected === n.id ? '700' : '500'}
              >{line}</text>
            ))}
          </g>
        ))}

        {/* Center node */}
        <ellipse cx={CX} cy={CY} rx={66} ry={36}
          fill="rgba(0,217,184,0.1)"
          stroke="#00d9b8" strokeWidth="1.8"
        />
        <text x={CX} y={CY - 8} textAnchor="middle" fontSize="11.5"
          fill="#00d9b8" fontWeight="700">IfaNumerical</text>
        <text x={CX} y={CY + 8} textAnchor="middle" fontSize="11.5"
          fill="#00d9b8" fontWeight="700">Analysis</text>
      </svg>
      </div>

      {sel ? (
        <div className="od8-desc">
          <div className="od8-desc__name">{sel.name.join(' ')}</div>
          <p className="od8-desc__body">{sel.desc}</p>
        </div>
      ) : (
        <p className="od8-hint">Select any node to explore its scope in numerical analysis.</p>
      )}
    </div>
  );
}

// ── AI Matrix data ────────────────────────────────────────────
const AI_MATRIX_NODES = [
  {
    id: 'claude',
    name: ['Claude'],
    color: '#a78bfa',
    angle: -90,
    platform: 'Anthropic',
    url: 'https://claude.ai',
    desc: 'Claude is Anthropic\'s AI assistant built for safety, nuanced reasoning, and long-context analysis. It excels at structured thinking, mathematics, scientific research support, and code generation across diverse fields of knowledge.',
  },
  {
    id: 'openai',
    name: ['OpenAI'],
    color: '#10a37f',
    angle: -45,
    platform: 'ChatGPT · GPT-4o',
    url: 'https://openai.com',
    desc: 'OpenAI\'s GPT series powers ChatGPT and one of the largest AI API ecosystems. Widely used for natural language understanding, data analysis, scientific reasoning, code assistance, and generative problem-solving across industries.',
  },
  {
    id: 'gemini',
    name: ['Gemini'],
    color: '#4285f4',
    angle: 0,
    platform: 'Google DeepMind',
    url: 'https://gemini.google.com',
    desc: 'Google Gemini is a multimodal AI model designed for reasoning across text, code, images, and data. Integrated into Google\'s ecosystem, it supports research workflows, engineering analysis, and large-scale data processing tasks.',
  },
  {
    id: 'copilot',
    name: ['Copilot'],
    color: '#0096d6',
    angle: 45,
    platform: 'Microsoft',
    url: 'https://copilot.microsoft.com',
    desc: 'Microsoft Copilot embeds AI assistance across productivity and developer tools — including Word, Excel, and GitHub — enabling numerical data analysis, code generation, and document synthesis within professional workflows.',
  },
  {
    id: 'grok',
    name: ['Grok'],
    color: '#d4d4d4',
    angle: 90,
    platform: 'xAI',
    url: 'https://grok.com',
    desc: 'Grok is xAI\'s conversational AI model built for real-time information retrieval and direct technical reasoning. It handles scientific, mathematical, and engineering queries with a focus on speed and analytical depth.',
  },
  {
    id: 'meta-ai',
    name: ['Meta AI'],
    color: '#3b82f6',
    angle: 135,
    platform: 'Meta · Llama',
    url: 'https://ai.meta.com',
    desc: 'Meta AI is powered by the open-weight Llama model family, available for research and commercial use. Its open approach enables numerical analysis workflows in self-hosted, customisable environments across science and engineering.',
  },
  {
    id: 'perplexity',
    name: ['Perplexity'],
    color: '#20c4d4',
    angle: 180,
    platform: 'Perplexity AI',
    url: 'https://perplexity.ai',
    desc: 'Perplexity AI combines large language models with real-time web search, making it effective for sourcing, summarising, and cross-referencing numerical data from live scientific literature and technical documentation.',
  },
  {
    id: 'others',
    name: ['Others'],
    color: '#8892aa',
    angle: -135,
    platform: 'Open Ecosystem',
    url: 'https://huggingface.co',
    desc: 'The broader AI ecosystem — Mistral, Cohere, DeepSeek, Hugging Face models, and emerging research platforms — collectively expands the numerical analysis toolkit. Open-source and domain-specific models cover fields from bioinformatics to climate modelling.',
  },
];

// ── AI 0 + 8D Matrix Component ────────────────────────────────
function AIMatrix() {
  const [selected, setSelected] = useState(null);
  const toRad = deg => deg * Math.PI / 180;
  const CX = 270, CY = 215, R = 158;

  const nodes = AI_MATRIX_NODES.map(n => ({
    ...n,
    x: CX + R * Math.cos(toRad(n.angle)),
    y: CY + R * Math.sin(toRad(n.angle)),
  }));

  const sel = selected ? nodes.find(n => n.id === selected) : null;

  return (
    <div className="ai8-wrap">
      <div className="ai8-header">
        <div className="ai8-badge">0 + 8D Matrix</div>
        <div className="ai8-title">IfaNumerical Analysis with AI</div>
        <p className="ai8-sub">Select an AI platform to explore its role in numerical analysis.</p>
      </div>

      <div className="ai8-svg-scroll">
      <svg viewBox="0 0 540 430" className="ai8-svg" role="img" aria-label="0+8D Matrix: IfaNumerical Analysis with AI">
        <defs>
          <radialGradient id="ai-hub-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(0,217,184,0.28)" />
            <stop offset="100%" stopColor="rgba(0,217,184,0.04)" />
          </radialGradient>
          <radialGradient id="ai-bg-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(0,217,184,0.03)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>

        {/* Background glow */}
        <ellipse cx={CX} cy={CY} rx={200} ry={180}
          fill="url(#ai-bg-grad)" />

        {/* Orbit ring — slowly rotates via CSS */}
        <circle cx={CX} cy={CY} r={R}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="1"
          strokeDasharray="5 12"
          className="ai8-orbit"
        />

        {/* Spokes */}
        {nodes.map(n => (
          <line key={n.id}
            x1={CX} y1={CY} x2={n.x} y2={n.y}
            stroke={selected === n.id ? n.color : 'rgba(255,255,255,0.06)'}
            strokeWidth={selected === n.id ? 2.2 : 1}
            strokeDasharray={selected === n.id ? null : '3 7'}
            opacity={selected && selected !== n.id ? 0.3 : 1}
          />
        ))}

        {/* Outer nodes */}
        {nodes.map(n => (
          <g key={n.id}
            onClick={() => setSelected(selected === n.id ? null : n.id)}
            style={{ cursor: 'pointer' }}>
            {/* Glow halo (selected only) */}
            {selected === n.id && (
              <ellipse cx={n.x} cy={n.y} rx={66} ry={34}
                fill="none"
                stroke={n.color}
                strokeWidth="10"
                opacity="0.1"
              />
            )}
            <ellipse cx={n.x} cy={n.y} rx={54} ry={27}
              fill={selected === n.id ? `${n.color}1a` : 'rgba(11,15,26,0.96)'}
              stroke={selected === n.id ? n.color : 'rgba(255,255,255,0.09)'}
              strokeWidth={selected === n.id ? 1.8 : 1}
            />
            {/* Colored top-cap accent line */}
            <line
              x1={n.x - 18} y1={n.y - 27} x2={n.x + 18} y2={n.y - 27}
              stroke={n.color}
              strokeWidth="2"
              strokeLinecap="round"
              opacity={selected === n.id ? 0.9 : 0.28}
            />
            {n.name.map((line, i, arr) => (
              <text key={i}
                x={n.x} y={n.y + (i - (arr.length - 1) / 2) * 13}
                textAnchor="middle" dominantBaseline="middle"
                fontSize="11"
                fill={selected === n.id ? n.color : 'rgba(200,210,230,0.75)'}
                fontWeight={selected === n.id ? '700' : '500'}
              >{line}</text>
            ))}
          </g>
        ))}

        {/* Center hub outer glow ring */}
        <ellipse cx={CX} cy={CY} rx={82} ry={48}
          fill="none"
          stroke="rgba(0,217,184,0.1)"
          strokeWidth="10"
        />
        {/* Center hub */}
        <ellipse cx={CX} cy={CY} rx={70} ry={38}
          fill="url(#ai-hub-grad)"
          stroke="#00d9b8" strokeWidth="1.8"
        />
        <text x={CX} y={CY - 9} textAnchor="middle" fontSize="12"
          fill="#00d9b8" fontWeight="800">IfaNumerical</text>
        <text x={CX} y={CY + 9} textAnchor="middle" fontSize="12"
          fill="#00d9b8" fontWeight="800">Analysis</text>
      </svg>
      </div>

      {sel ? (
        <div className="ai8-desc" style={{ borderColor: `${sel.color}45`, background: `${sel.color}0c` }}>
          <div className="ai8-desc__header">
            <span className="ai8-desc__dot" style={{ background: sel.color }} />
            <div className="ai8-desc__name" style={{ color: sel.color }}>{sel.name.join(' ')}</div>
            <span className="ai8-desc__platform">{sel.platform}</span>
          </div>
          <p className="ai8-desc__body">{sel.desc}</p>
          <a href={sel.url} target="_blank" rel="noopener noreferrer"
            className="ai8-desc__link"
            style={{ color: sel.color, borderColor: `${sel.color}50` }}>
            Visit {sel.name.join(' ')} →
          </a>
        </div>
      ) : (
        <p className="ai8-hint">Select any platform node to explore its scope.</p>
      )}
    </div>
  );
}

// ── About ─────────────────────────────────────────────────────
function AboutSection() {
  return (
    <section className="about-strip" id="about">
      <div className="about-strip__inner">
        <span className="section__eyebrow">About IfaNumerical Analysis</span>
        <h2 className="section__title" style={{ marginBottom: '20px' }}>
          Numerical Analysis for Every Field of Knowledge
        </h2>
        <OD8Matrix />
        <div className="about-strip__body">
          <p>
            Ifa-Numerical Analysis is the meta-science of using Ifa Numbers and Ifa Computation
            to solve complex problems in all fields approximately while controlling the error.
          </p>
          <p>
            <strong>Ifa Numerical Analysis</strong> (IfaNumerical Analysis) is a key part of
            <strong> Ifanalysis</strong> — the unified analytical Platform of the IFA Internet.
            Classical Numerical Analysis provides algorithms for approximating mathematical
            solutions. IfaNumerical Analysis generalises this scope: using the 256 Odu Ifa as
            an analytical Codebook, it applies numerical meta-methods to every field of knowledge —
            from physics and engineering to social science, philosophy, and the arts.
          </p>
          <p>
            Its Dual, <strong>Orisa Numerical Analysis</strong>, provides the energetic,
            consciousness-led complement — two Lenses that together cover the full analytical
            Scope of numerical Knowledge in the IFA Internet.
          </p>
        </div>
        <AIMatrix />
      </div>
    </section>
  );
}

// ── CTA ───────────────────────────────────────────────────────
function CTASection() {
  return (
    <section className="cta">
      <div className="cta__inner">
        <h2 className="cta__title">Explore the Full Ifanalysis Platform</h2>
        <p className="cta__sub">
          IfaNumerical Analysis is one part of AnalysoE — the Analysis of Everything.
        </p>
        <div className="cta__actions">
          <a href="/ifa-analysis/" className="cta__btn cta__btn--primary">← Ifanalysis</a>
          <a href="/ifa-number/ap-playground/" className="cta__btn cta__btn--ghost">Ifa AP Playground →</a>
          <a href="/" className="cta__btn cta__btn--ghost">IFA Internet →</a>
        </div>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <span className="footer__logo">IfaNumerical Analysis</span>
          <span className="footer__tag">ToE Numerical Analysis · Part of Ifanalysis (AnalysoE)</span>
        </div>
        <div className="footer__links">
          <a href="/ifa-analysis/">Ifanalysis</a>
          <a href="/ifa-number/ap-playground/">Ifa AP Playground</a>
          <a href="/ifa-periodic-table/">Ifa Periodic Table</a>
          <a href="/">IFA Internet</a>
          <a href="https://toe.cenproject.org/" target="_blank">toe.cenproject.org</a>
        </div>
        <p className="footer__copy">© 2025 CENProject Innovations Limited. Part of the IFA Internet — the Internet Model of the Theory of Everything (iTOE).</p>
      </div>
    </footer>
  );
}

// ── App ───────────────────────────────────────────────────────
function App() {
  return (
    <div className="app">
      <Header />
      <Hero />
      <Playground />
      <DualSection />
      <UIoESection />
      <AboutSection />
      <CTASection />
      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
