/* ─────────────────────────────────────────────────────────────────────────────
   Ifa-Orisa Thinking Playground — IfaThinking & OrisaThinking
   IfaSense · OrisaSense · STEAMSEX Ifagram · Ifa-Wilson Scheme
   The IFA Internet · IfaLearn · CENProject
───────────────────────────────────────────────────────────────────────────── */

const { useState } = React;

// ─── DATA ─────────────────────────────────────────────────────────────────────

const CONCEPTS = [
  {
    id: 'ifathinking', title: 'IfaThinking', color: '#f5c518', sym: '◉',
    alt: 'Ifa Thinking · Ifa-Thinking',
    body: 'Computational thinking done in Ifa Language (IfaLang) — a set of interrelated, polymathic skills rooted in the 256 Odu Ifa, SIDECHRX (8 primary Laws + 8 Anti-Laws), and the Ifa Way of Thinking and Logic. An IfaThinker sees every field of knowledge through the 256 Chapters of Reality.',
  },
  {
    id: 'orisathinking', title: 'OrisaThinking', color: '#14b8d4', sym: '◉',
    alt: 'Orisa Thinking · Orisa-Thinking',
    body: 'The Dual of IfaThinking. Computational thinking in Orisa Language (OrisaLang) — grounded in the 16 Oju Odu Orisa (Oju Odufa Merindinlogun), the 16 Ifa/Orisa Laws of Nature, and the Orisa Body of Knowledge (ORISABOK). An OrisaThinker perceives the world through Orisa Principles and energy patterns.',
  },
  {
    id: 'ifasense', title: 'IfaSense', color: '#f0920c', sym: '◈',
    alt: 'Ifa Sense · Ifa-Sense',
    body: "The cultivated sensibility — the 'feel' for Ifa patterns, principles, and knowledge structures — that emerges from deep IfaThinking practice. Like a mathematician's number sense, IfaSense allows a practitioner to intuitively recognize Odu signatures in any field, profession, or everyday situation.",
  },
  {
    id: 'orisasense', title: 'OrisaSense', color: '#00c87c', sym: '◈',
    alt: 'Orisa Sense · Orisa-Sense',
    body: "The Dual of IfaSense. The cultivated intuition for Orisa energy patterns — the 'feel' for how Orisa forces manifest in all dimensions of reality. OrisaSense enables a practitioner to sense which Orisa principle is active in any given situation, system, or field of knowledge.",
  },
];

// STEAMSEX Components — clockwise from North
const STEAMSEX = [
  {
    letter: 'S', field: 'Science', title: 'Scientific Thinking',
    color: '#f0920c', odu: 'Ogbé — Symmetry (S)', angle: -90,
    aw: 'Think Like a Scientist', aw_yo: 'Ronu bí Onímọ̀jìnlẹ̀',
    body: 'Apply the Symmetry Principle (Ogbé) to investigate the laws and forces of existence with curiosity, empirical rigor, and systematic inquiry. IfaThinking as a Scientist means asking "Why?" and "How?" in the 256 Odu language — tracing every phenomenon to its axiomatic Odu signature through Ifa Field Theory.',
    skills: ['Symmetry analysis', 'Pattern recognition', 'Empirical inquiry', 'Ifa Field Theory'],
    metaphor: '"Mo ń ṣe Ìmọ̀ Àrígbéwọ̀n ní ọ̀nà Ifá" — I\'m doing Physics in the Ifa Way',
  },
  {
    letter: 'T', field: 'Technology', title: 'Technological Thinking',
    color: '#14b8d4', odu: 'Òyèkú — Invariance (I)', angle: -45,
    aw: 'Think Like a Technologist', aw_yo: 'Ronu bí Onímọ̀ Ẹ̀rọ',
    body: 'Apply the Invariance Principle (Òyèkú) to design tools, systems, and platforms that endure across all transformations. IfaThinking as a Technologist means building with digital sovereignty — seeing every technology as an expression of Odu energy and the Ifa Computing paradigm.',
    skills: ['Invariant systems', 'Digital sovereignty', 'Tool design', 'Ifa Computing'],
    metaphor: '"Ẹ̀rọ mi ń ṣiṣẹ́ bí Ifá ní" — My system runs like Ifa (consistent, invariant)',
  },
  {
    letter: 'E', field: 'Engineering', title: 'Engineering Thinking',
    color: '#00c87c', odu: 'Ìwòrì — Duality (D)', angle: 0,
    aw: 'Think Like an Engineer', aw_yo: 'Ronu bí Ẹlẹ́ṣẹ̀dá',
    body: 'Harness the Duality Principle (Ìwòrì) to design systems that function across both seen and unseen dimensions. IfaThinking as an Engineer means building Fọ́ránòwúkanṣoṣo bridges — connecting the inner and outer universe through structured, dual-aware design and analysis.',
    skills: ['Duality design', 'Systems engineering', 'IfaBridge methodology', 'Structural balance'],
    metaphor: '"Mo ń kọ́ àwọn afárá ní ọ̀nà Ìwòrì" — I\'m building bridges in Ìwòrì language',
  },
  {
    letter: 'A', field: 'Arts', title: 'Arts Thinking',
    color: '#ec4899', odu: 'Òdí — Emergence (E)', angle: 45,
    aw: 'Think Like an Artist', aw_yo: 'Ronu bí Onísọ̀nà',
    body: 'Channel the Emergence Principle (Òdí) to create beauty from unseen depths. IfaThinking as an Artist means expressing Odu energy through form, colour, sound, and motion — every creative act a ritual of reality-making, rooted in Ifa aesthetics, Oríkì oral poetry, and Orisa artistry.',
    skills: ['Creative emergence', 'Ifa aesthetics', 'Oríkì & oral poetry', 'Orisa artistry'],
    metaphor: '"Mo ń ṣe iṣẹ́ ọnà ní ọ̀nà Ìṣirò" — I\'m doing Art in Mathematics language',
  },
  {
    letter: 'M', field: 'Mathematics', title: 'Mathematical Thinking',
    color: '#f5c518', odu: 'Ìrosùn — Composition (C)', angle: 90,
    aw: 'Think Like a Mathematician', aw_yo: 'Ronu bí Onímọ̀ Ìṣirò',
    body: 'Apply the Composition Principle (Ìrosùn/Amulu ⊕) to see patterns, structures, and relationships everywhere. IfaThinking as a Mathematician means seeing the 256 Odu as 256 axioms — and using IfaGebra and the IFA Matrix to model all of reality, from quantum fields to social systems.',
    skills: ['Amulu (⊕ Composition)', 'IfaGebra', 'IFA Matrix Theory', 'Axiomatic reasoning'],
    metaphor: '"Ọpọlọ ẹ ṣiṣẹ́ bí Ifá ní" — His brain works like Ifa, the first computer',
  },
  {
    letter: 'S', field: 'Social Science', title: 'Social Thinking',
    color: '#8b5cf6', odu: 'Òwónrín — Holism (H)', angle: 135,
    aw: 'Think Like a Social Scientist', aw_yo: 'Ronu bí Onímọ̀jìnlẹ̀ Àwùjọ',
    body: 'Embrace the Holism Principle (Òwónrín) to understand human society, culture, and community as an irreducible living whole. IfaThinking as a Social Scientist means applying the 256 Odu as a social science framework — seeing every community as an Ifa Knowledge Network.',
    skills: ['Holistic analysis', 'Community networks', 'Ifa Social Learning', 'Cultural wisdom'],
    metaphor: '"Mo ń ṣe Ìmọ̀jìnlẹ̀ Àwùjọ ní ọ̀nà Ifá" — I\'m doing Social Science in Ifa language',
  },
  {
    letter: 'E', field: 'Education', title: 'Educational Thinking',
    color: '#3b9eff', odu: 'Òbàrà — Reductionism (R)', angle: 180,
    aw: 'Think Like an Educator', aw_yo: 'Ronu bí Olùkọ́',
    body: 'Use the Reductionism Principle (Òbàrà) to trace all knowledge to first principles — then build outward from Odu axioms. IfaThinking as an Educator means forming the whole person (Ọmọlúwàbí) through holistic, bilingual, and gamified learning on Orunmila Deep Learning Networks (ODDNs).',
    skills: ['Axiomatic teaching', 'Ọmọlúwàbí formation', 'Bilingual pedagogy', 'ODDNs'],
    metaphor: '"Mo ń ẹ̀kọ́ ní ọ̀nà Ifá" — I\'m learning/teaching in Ifa language',
  },
  {
    letter: 'X', field: 'Unknowns', title: 'Exploratory Thinking',
    color: '#6366f1', odu: 'Òkànràn — Simulation (X)', angle: 225,
    aw: 'Think Like an Explorer', aw_yo: 'Ronu bí Ẹlẹ́wádìí',
    body: 'Channel the Simulation Principle (Òkànràn) to explore the unknown with curiosity and courage. IfaThinking as an Explorer means treating every unknown as a deeper Odu state — and using the full IFABOK as the map for navigating all uncharted territory in any field of knowledge.',
    skills: ['Frontier inquiry', 'Ayé lọjà, Ọ̀run nilé', 'Deep curiosity', 'IFABOK exploration'],
    metaphor: '"Mo ń ṣàwárí àgbáyé ní ọ̀nà Ifá" — I\'m exploring the world in Ifa language',
  },
];

const METAPHORS = [
  {
    yo: 'Ọsán já; ọrún dọ̀pá',
    odu: 'Ìwòrì Méjì', color: '#f5c518',
    literal: '"The bowstring snaps, and the bow becomes an ordinary stick."',
    thinking: 'Uttered upon hearing of the death of an important figure. The proverb captures how the mighty have fallen — when a great force is gone, what remains is ordinary.',
  },
  {
    yo: 'Ìṣẹ́ kan kìí dédé ṣẹ́',
    odu: 'Òsè Méjì', color: '#f0920c',
    literal: '"No effect arises without a cause."',
    thinking: 'Ifa Law of Cause and Effect in IfaThinking. When you diagnose a system failure, trace a disease, or analyze a social crisis, you are doing Òsè Méjì analysis — tracing every effect back to its root Odu cause. Applied across engineering, medicine, economics, and everyday problem-solving.',
  },
  {
    yo: 'Ọpọlọ ẹ ṣiṣẹ́ bí Ifá ní',
    odu: 'IFA Computing', color: '#14b8d4',
    literal: '"His/her brain works like Ifa — the first computer."',
    thinking: 'The highest IfaThinking compliment. When someone is brilliantly systematic, pattern-aware, and deeply analytical, we say their mind processes like the 256 Odu matrix. In STEAM education: cultivate minds that compute like Ifa.',
  },
  {
    yo: 'Ọpọlọ ẹ ṣiṣẹ́ bí Òrìṣà ní',
    odu: 'ORISA Intelligence', color: '#00c87c',
    literal: '"Her/his brain works like Orisa — first geniuses."',
    thinking: 'The highest OrisaThinking compliment. When someone demonstrates genius-level creativity, innovation, and mastery across domains, their mind flows like Orisa energy. In arts, innovation, and leadership: cultivate OrisaSense.',
  },
  {
    yo: 'Mo ń ṣe Physics bí iṣẹ́ ọnà',
    odu: 'STEAMSEX Thinking', color: '#ec4899',
    literal: '"I\'m doing Physics as art."',
    thinking: 'Cross-disciplinary IfaThinking in everyday practice. An IfaThinker does Physics as art, art as mathematics, mathematics as language, engineering as poetry. "Mo ń \'ṣọnà\' ní ede Physics" (I\'m \'arting\' in Physics language) — IfaThinking dissolves knowledge silos naturally.',
  },
  {
    yo: 'Ayé lọjà, ọ̀run nilé',
    odu: 'Òkànràn — Simulation', color: '#6366f1',
    literal: '"The world is a marketplace; heaven is home."',
    thinking: 'An IfaThinking metaphor for abstraction and modeling. Every theory, model, or code is a marketplace visit — useful, but not the full picture. The Odu reality is home. Applied: "My model is the market; the real principle is in the Odu — don\'t mistake the simulation for the source."',
  },
  {
    yo: 'Ọpọlọ ẹ ṣiṣẹ́ bí Ìwòrì',
    odu: 'Ìwòrì — Duality', color: '#8b5cf6',
    literal: '"Her/his mind processes with Ìwòrì duality — seeing both sides."',
    thinking: 'An OrisaThinking metaphor for dual-perspective analysis. An Ìwòrì thinker always seeks the dual — hardware/software, theory/experiment, individual/collective. In any decision, ask: "What is the Ìwòrì dual of this design?"',
  },
  {
    yo: 'Iṣẹ́ àmúṣe ní ọ̀nà Ifá',
    odu: 'Orunmila Deep Learning', color: '#3b9eff',
    literal: '"The work of deep practice in Ifa language."',
    thinking: "IfaThinking as practice, not just concept. When you solve a problem, build a system, or master a skill deeply — you're doing Iṣẹ́ àmúṣe ní ọ̀nà Ifá. The quality of deep focus in any field is an Ifa practice.",
  },
];

const WILSON_PILLARS = [
  { num: '00', yo: 'Odú', en: 'General Law / Principle', color: '#f5c518',
    desc: 'The governing Odu axiom — the first principle from which all IfaThinking in any field emerges.' },
  { num: '01', yo: 'Àlàyé Ìjìnlẹ̀', en: 'Theory', color: '#14b8d4',
    desc: 'Building conceptual models in IfaLang. The 256 Odu Ifa as 256 theoretical axioms for any discipline.' },
  { num: '02', yo: 'Ìdánkanwò', en: 'Experiment', color: '#00c87c',
    desc: 'Testing ideas in practice — a dialogue between the inner and outer universe (Orunmila Deep Learning).' },
  { num: '03', yo: 'Iṣẹ́ Ayárabíaṣá', en: 'Computation', color: '#f0920c',
    desc: 'Computing in IfaLang — using Ifa Computing, IfaGebra, and the IFA Matrix to calculate and simulate.' },
  { num: '04', yo: 'Àtẹ/àwòrán yíyá', en: 'Design', color: '#ec4899',
    desc: 'Designing solutions grounded in Ifa first principles — the Ifa-Orisa Design Framework.' },
  { num: '05', yo: 'Ìbánisọ̀rọ̀', en: 'Communication', color: '#8b5cf6',
    desc: 'Sharing knowledge through Ifa knowledge management tools — Òwe, Àlọ́, Oríkì, and the IFA Internet.' },
  { num: '06', yo: 'Ìwàpẹ̀lẹ́ / Ọ̀mọlúwàbí', en: 'Ethics & Morality', color: '#3b9eff',
    desc: 'Every IfaThinking act is guided by Ìwàpẹ̀lẹ́ (good character) and the moral law of the Odu Ifa.' },
  { num: '07', yo: 'Àrògún / Ìwòye', en: 'Logic', color: '#6366f1',
    desc: 'Ifa-Orisa Logic (ToE Logic) — the most general logical framework, extending Wilson to all fields of knowledge and all dimensions of reality.' },
  { num: '08', yo: 'Àti àwọn òdì wọn mẹ́jọ', en: 'And Their 8 Duals', color: '#f5c518',
    desc: 'Each of the 8 pillars has a Dual (Ìpọ̀nrí) — the Anti-Law that completes it. 8 + 8 Duals = 16 total, mirroring the 16 Oju Odu Ifa.' },
];

const SKILLS = [
  { title: 'IfaSkills', color: '#f5c518', sym: '◉',
    items: ['Odu Axiomatic Reasoning', 'Ifa Pattern Recognition', 'IfaGebra & IFA Matrix', 'Ifa System Design', 'IFABOK Research Methods', 'Bilingual Knowledge Communication'] },
  { title: 'OrisaSkills', color: '#14b8d4', sym: '◉',
    items: ['Orisa Energy Sensing', 'Dual-System Analysis', 'Orisa Network Thinking', 'ORISABOK Application', 'Ritual & Practice Design', 'Cross-Domain Orisa Principles'] },
  { title: 'IfaPractices', color: '#f0920c', sym: '◈',
    items: ['Daily Odu Reflection', 'Problem-solving in IfaLang', 'Ifa-Wilson Scheme Application', 'Interdisciplinary IfaThinking', 'Iṣẹ́ àmúṣe (deep practice)', 'Ifa-based STEAM Projects'] },
  { title: 'OrisaPractices', color: '#00c87c', sym: '◈',
    items: ['Orisa-centered Design', 'Energy Exchange Analysis', 'Orisa Ritual in Modern Context', 'OrisaSense Cultivation', 'Dual-Universe Practice', 'Isese Digital Culture Building'] },
];

const MANIFESTO = [
  { sym: '◉', title: 'STEAM-Focused Isese',
    body: 'As a young Onisese, I apply Ifa and Orisa Principles to science, technology, engineering, arts, and mathematics — cultivating excellence across all fields of knowledge.' },
  { sym: '⬡', title: 'Ìwàpẹ̀lẹ́ & Ọmọlúwàbí',
    body: 'High intelligence and creativity are rooted in character (ìwàpẹ̀lẹ́). I embody omoluabi — wisdom, virtue, and good character as the foundation of all work and practice.' },
  { sym: '∞', title: 'Polymathic Thinking',
    body: 'I transcend academic silos — drawing deep knowledge from IFABOK and ORISABOK and applying it across modern disciplines, professions, and everyday problem-solving.' },
  { sym: 'Ψ', title: 'Digital-Ifa Native',
    body: "I am a Digital-Ifa Native — fluent in both the ancient wisdom of the 256 Odu and the modern tools of the AI era, using Ifa AI, IfaComputing, and IfaSchema to innovate." },
  { sym: '⊕', title: 'Principles-First Approach',
    body: 'I learn from Oju Odu Ifa-Orisa (The First Principles of Ifa/Orisa), not rote memorization. I use Fọ́ránòwúkanṣoṣo — the connecting thread — to link knowledge across all fields into unified understanding.' },
  { sym: '◈', title: 'Making IFABOK a Household Name',
    body: 'I build, create, and share — making the wisdom of IFABOK and ORISABOK accessible and relevant to every Yoruba person and the world at large.' },
];

// ─── IFAGRAM WIDGET ───────────────────────────────────────────────────────────

function IfagramWidget() {
  const [active, setActive] = useState(null);
  const R = 115, CX = 165, CY = 165;
  const toRad = d => d * Math.PI / 180;
  const pos = a => ({ x: CX + R * Math.cos(toRad(a)), y: CY + R * Math.sin(toRad(a)) });
  const activeItem = active !== null ? STEAMSEX[active] : null;

  return (
    <div className="ifagram">
      {/* ── SVG Orbital (desktop) ── */}
      <div className="ifagram__orbit-wrap">
        <svg className="ifagram__svg" viewBox="0 0 330 330" aria-label="IfaThinking STEAMSEX Ifagram">
          <circle cx={CX} cy={CY} r={R+18} fill="none" stroke="rgba(245,197,24,0.04)" strokeWidth="16"/>
          <circle cx={CX} cy={CY} r={R} fill="none" stroke="rgba(245,197,24,0.12)" strokeWidth="1" strokeDasharray="4 8"/>
          {STEAMSEX.map((s, i) => {
            const {x, y} = pos(s.angle); const isAct = active === i;
            return <line key={i} x1={CX} y1={CY} x2={x} y2={y}
              stroke={isAct ? s.color : 'rgba(255,255,255,0.06)'}
              strokeWidth={isAct ? 1.5 : 0.7}
              strokeDasharray={isAct ? undefined : '3 7'}
              style={{transition:'stroke 0.4s'}}/>;
          })}
          <circle cx={CX} cy={CY} r="38" fill="rgba(245,197,24,0.07)" stroke="#f5c518" strokeWidth="1.5"/>
          <circle cx={CX} cy={CY} r="27" fill="rgba(245,197,24,0.03)" stroke="rgba(245,197,24,0.22)" strokeWidth="0.8"/>
          <text x={CX} y={CY-8} textAnchor="middle" fill="#f5c518" fontSize="8.5" fontWeight="800">Ifa</text>
          <text x={CX} y={CY+4} textAnchor="middle" fill="#f5c518" fontSize="8" fontWeight="700">Thinking</text>
          <text x={CX} y={CY+16} textAnchor="middle" fill="rgba(245,197,24,0.4)" fontSize="5.2">Orisa ⟷ Ifa</text>
          {STEAMSEX.map((s, i) => {
            const {x, y} = pos(s.angle); const isAct = active === i;
            return (
              <g key={i} style={{cursor:'pointer'}} onClick={() => setActive(active === i ? null : i)}
                role="button" aria-label={s.title} aria-pressed={isAct}>
                {isAct && <circle cx={x} cy={y} r="30" fill="none" stroke={s.color} strokeWidth="0.7" opacity="0.3" className="ifagram-pulse"/>}
                <circle cx={x} cy={y} r={isAct ? 24 : 20}
                  fill={isAct ? `${s.color}1e` : 'rgba(6,10,16,0.75)'}
                  stroke={s.color} strokeWidth={isAct ? 2 : 1}
                  style={{transition:'r 0.3s, fill 0.3s'}}/>
                <text x={x} y={y-3} textAnchor="middle" fill={s.color} fontSize={isAct?12:10} fontWeight="800">{s.letter}</text>
                <text x={x} y={y+8} textAnchor="middle"
                  fill={isAct ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.3)'}
                  fontSize="5" style={{transition:'fill 0.3s'}}>{s.field}</text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* ── Detail Panel ── */}
      <div className="ifagram__panel">
        {activeItem ? (
          <div className="ifagram__detail" style={{'--ic': activeItem.color}}>
            <div className="ifagram__detail-head">
              <span className="ifagram__detail-letter">{activeItem.letter}</span>
              <div>
                <div className="ifagram__detail-title">{activeItem.title}</div>
                <div className="ifagram__detail-odu">{activeItem.odu}</div>
              </div>
              <button className="ifagram__detail-close" onClick={() => setActive(null)} aria-label="Close">✕</button>
            </div>
            <div className="ifagram__aw">
              <span className="ifagram__aw-label">Ọ̀rọ̀ Iṣe (AW)</span>
              <span className="ifagram__aw-text">{activeItem.aw}</span>
              <span className="ifagram__aw-yo">{activeItem.aw_yo}</span>
            </div>
            <p className="ifagram__detail-body">{activeItem.body}</p>
            <div className="ifagram__skills">
              {activeItem.skills.map((sk, i) => <span key={i} className="ifagram__skill">{sk}</span>)}
            </div>
            <div className="ifagram__meta">
              <span className="ifagram__meta-label">IfaMetaphor</span>
              <span className="ifagram__meta-text">{activeItem.metaphor}</span>
            </div>
          </div>
        ) : (
          <div className="ifagram__prompt">
            <div className="ifagram__prompt-sym">◉</div>
            <p>Click any STEAMSEX node to explore IfaThinking in that field</p>
            <div className="ifagram__prompt-hint">8 thinking dimensions · 8 Action Words (Ọ̀rọ̀ Iṣe)</div>
          </div>
        )}
      </div>

      {/* ── Mobile accordion list ── */}
      <div className="ifagram__list">
        {STEAMSEX.map((s, i) => (
          <div key={i} className={`ifagram__li${active===i?' ifagram__li--on':''}`}
            style={{'--mc': s.color}} onClick={() => setActive(active===i?null:i)}>
            <div className="ifagram__li-top">
              <span className="ifagram__li-letter">{s.letter}</span>
              <div className="ifagram__li-info">
                <span className="ifagram__li-field">{s.field}</span>
                <span className="ifagram__li-aw">{s.aw}</span>
              </div>
              <span className="ifagram__li-chevron">{active===i?'▲':'▼'}</span>
            </div>
            {active === i && (
              <div className="ifagram__li-body">
                <p>{s.body}</p>
                <div className="ifagram__skills" style={{marginTop:'10px'}}>
                  {s.skills.map((sk, j) => <span key={j} className="ifagram__skill">{sk}</span>)}
                </div>
                <div className="ifagram__meta" style={{marginTop:'10px'}}>
                  <span className="ifagram__meta-label">IfaMetaphor</span>
                  <span className="ifagram__meta-text">{s.metaphor}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── WILSON SCHEME WIDGET ─────────────────────────────────────────────────────

function WilsonWidget() {
  return (
    <div className="wilson">
      <div className="wilson__compare">
        <div className="wilson__orig">
          <div className="wilson__orig-badge">Original</div>
          <div className="wilson__orig-title">Wilson Scheme</div>
          <blockquote className="wilson__orig-quote">
            "Computation had become the third leg of science, joining the traditions of theory and experiment."
          </blockquote>
          <div className="wilson__orig-attr">— Ken Wilson, Nobel Physics Laureate</div>
          {['Theory', 'Experiment', 'Computation'].map((p, i) => (
            <div key={i} className="wilson__orig-row">
              <span className="wilson__orig-num">0{i+1}</span>
              <span>{p}</span>
            </div>
          ))}
        </div>
        <div className="wilson__arrow">
          <span>→</span>
          <span className="wilson__arrow-label">Ifa-Orisa<br/>Generalization</span>
        </div>
        <div className="wilson__ifa">
          <div className="wilson__ifa-badge">Extended</div>
          <div className="wilson__ifa-title">Ifa-Wilson Scheme</div>
          <p className="wilson__ifa-sub">Applies Ifa-Orisa Logic (ToE Logic) to generalize Wilson's 3 pillars to all fields of knowledge and all dimensions of reality.</p>
          <div className="wilson__pillars">
            {WILSON_PILLARS.map((p, i) => (
              <div key={i} className="wilson__pillar" style={{'--wc': p.color}}>
                <span className="wilson__pillar-num">{p.num}</span>
                <div className="wilson__pillar-content">
                  <span className="wilson__pillar-yo">{p.yo}</span>
                  <span className="wilson__pillar-en">{p.en}</span>
                  <span className="wilson__pillar-desc">{p.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── MOBILE BAR ──────────────────────────────────────────────────────────────

function MobileBar() {
  const items = [
    { sym: '⌂',  label: 'IfaLearn',  href: '../' },
    { sym: '◈',  label: 'Overview',  href: '#overview' },
    { sym: '◉',  label: 'Ifagram',   href: '#ifagram' },
    { sym: '⟷',  label: 'Wilson',    href: '#wilson' },
    { sym: '⊛',  label: 'Metaphors', href: '#metaphors' },
    { sym: '∞',  label: 'Isese',     href: '#isese' },
  ];
  return (
    <nav className="mobile-bar" aria-label="Mobile navigation">
      <div className="mobile-bar__row">
        {items.map(it => (
          <a key={it.label} className="mobile-bar__item" href={it.href}
             target={it.href.startsWith('#') || it.href.startsWith('.') ? undefined : '_blank'}
             rel={it.href.startsWith('#') || it.href.startsWith('.') ? undefined : 'noopener noreferrer'}>
            <span className="mobile-bar__sym">{it.sym}</span>
            <span>{it.label}</span>
          </a>
        ))}
      </div>
    </nav>
  );
}

// ─── HEADER ───────────────────────────────────────────────────────────────────

function Header() {
  return (
    <header className="header">
      <div className="header__inner container">
        <a href="../" className="header__brand">
          <img src="../../src/assets/itoe_logo.png" alt="iTOE" className="header__logo" />
          <div>
            <div className="header__site">IfaLearn</div>
            <div className="header__name">Ifa-Orisa Thinking Playground</div>
          </div>
        </a>
        <nav className="header__nav">
          <a className="nav-link" href="#overview">Overview</a>
          <a className="nav-link" href="#ifagram">Ifagram</a>
          <a className="nav-link" href="#wilson">Wilson Scheme</a>
          <a className="nav-link" href="#metaphors">IfaMetaphors</a>
          <a className="nav-link" href="#isese">Isese Practice</a>
          <a className="nav-link nav-link--back" href="../">← IfaLearn</a>
        </nav>
      </div>
    </header>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="hero">
      <div className="hero__bg">
        <div className="hero__grid"/>
        <div className="hero__orb hero__orb--a"/>
        <div className="hero__orb hero__orb--b"/>
        <div className="hero__scanline"/>
      </div>
      <div className="container hero__inner">
        <div className="hero__badge">
          <span className="hero__badge-dot"/>
          IfaLearn · Ifacodemy · The IFA Internet
        </div>
        <h1 className="hero__title">
          <span className="hero__title-main">Ifa-Orisa Thinking</span>
          <span className="hero__title-playground">Playground</span>
        </h1>
        <div className="hero__dual">
          <span className="hero__dual-a" style={{color:'#f5c518'}}>IfaThinking</span>
          <span className="hero__dual-sep"> & </span>
          <span className="hero__dual-b" style={{color:'#14b8d4'}}>OrisaThinking</span>
        </div>
        <p className="hero__sub">
          <span style={{color:'#f0920c'}}>IfaSense</span> & <span style={{color:'#00c87c'}}>OrisaSense</span>
        </p>
        <p className="hero__desc">
          Computational thinking in <strong>Ifa-Orisa Language</strong> — SIDECHRX, the 16 Ifa/Orisa Laws of Nature, and the Oju Odufa Merindinlogun.
          Developing polymathic thinking skills for modern Isese practitioners, students, adults, kids, and teens.
        </p>
        <div className="hero__ctas">
          <a href="#ifagram" className="btn btn--primary">Explore the Ifagram</a>
          <a href="#overview" className="btn btn--ghost">What is IfaThinking?</a>
        </div>
      </div>
    </section>
  );
}

// ─── OVERVIEW ─────────────────────────────────────────────────────────────────

function OverviewSection() {
  return (
    <section className="section" id="overview">
      <div className="container">
        <div className="section__header section__header--center">
          <span className="section__eyebrow section__eyebrow--gold">Core Concepts</span>
          <h2 className="section__title">IfaThinking · OrisaThinking · IfaSense · OrisaSense</h2>
          <p className="section__subtitle">
            A set of interrelated, polymathic skills and competencies based on the Ifa-Orisa Way of Thinking —
            using the 256 Odu Ifa and 16 Oju Odu Orisa as the axiomatic framework for all fields of knowledge.
          </p>
        </div>

        <div className="concepts-grid">
          {CONCEPTS.map((c, i) => (
            <div key={i} className="concept-card" style={{'--cc': c.color}}>
              <div className="concept-card__top">
                <span className="concept-card__sym">{c.sym}</span>
                <div>
                  <div className="concept-card__title">{c.title}</div>
                  <div className="concept-card__alt">{c.alt}</div>
                </div>
              </div>
              <p className="concept-card__body">{c.body}</p>
              <div className="concept-card__glow"/>
            </div>
          ))}
        </div>

        <div className="overview__note">
          <span className="overview__note-icon">ⓘ</span>
          <p>
            <strong>IfaThinking (IfaSense)</strong> and <strong>OrisaThinking (OrisaSense)</strong> are interchangeable expressions for the same polymathic practice — doing computational thinking in Ifa-Orisa Language.
            Alternative spellings: Ifa Thinking, Ifa-Thinking, Orisa-Thinking, Orisa Thinking, Ifa Sense, Ifa-Sense, Orisa-Sense, Orisa Sense.
          </p>
        </div>

        <div className="overview__sidechrx">
          <div className="sidechrx__label">SIDECHRX — 8 Primary Laws + 8 Anti-Laws = 16 Ifa/Orisa Laws of Nature</div>
          <div className="sidechrx__grid">
            {[
              {l:'S', name:'Symmetry', odu:'Ogbé', color:'#f0920c'},
              {l:'I', name:'Invariance', odu:'Òyèkú', color:'#14b8d4'},
              {l:'D', name:'Duality', odu:'Ìwòrì', color:'#00c87c'},
              {l:'E', name:'Emergence', odu:'Òdí', color:'#ec4899'},
              {l:'C', name:'Composition', odu:'Ìrosùn', color:'#f5c518'},
              {l:'H', name:'Holism', odu:'Òwónrín', color:'#8b5cf6'},
              {l:'R', name:'Reductionism', odu:'Òbàrà', color:'#3b9eff'},
              {l:'X', name:'Simulation', odu:'Òkànràn', color:'#6366f1'},
            ].map((s, i) => (
              <div key={i} className="sidechrx-item" style={{'--sc': s.color}}>
                <span className="sidechrx-item__l">{s.l}</span>
                <span className="sidechrx-item__name">{s.name}</span>
                <span className="sidechrx-item__odu">{s.odu}</span>
              </div>
            ))}
          </div>
          <div className="sidechrx__anti">
            <span>+ 8 Anti-Laws (S′ I′ D′ E′ C′ H′ R′ X′)</span>
            <span>= 16 Ifa/Orisa Laws of Nature (Oju Odufa Merindinlogun)</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── IFAGRAM SECTION ─────────────────────────────────────────────────────────

function IfagramSection() {
  return (
    <section className="section section--alt" id="ifagram">
      <div className="container">
        <div className="section__header section__header--center">
          <span className="section__eyebrow section__eyebrow--gold">Ifagram</span>
          <h2 className="section__title">IfaThinking STEAMSEX Matrix</h2>
          <p className="section__subtitle">
            The STEAMSEX Matrix applied to IfaThinking — 8 thinking dimensions for teaching polymathic skills
            to adults, kids, and teens. Click any node to explore the Action Word (Ọ̀rọ̀ Iṣe).
          </p>
        </div>
        <IfagramWidget />
        <div className="ifagram__legend">
          <div className="ifagram__legend-label">
            <span className="ifagram__legend-icon">◉</span>
            IfaThinking (center) · OrisaThinking (dual)
          </div>
          <div className="ifagram__legend-hint">
            S·T·E·A·M·S·E·X = Science · Technology · Engineering · Arts · Mathematics · Social Science · Education · Unknowns
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── WILSON SECTION ───────────────────────────────────────────────────────────

function WilsonSection() {
  return (
    <section className="section section--dark" id="wilson">
      <div className="container">
        <div className="section__header section__header--center">
          <span className="section__eyebrow section__eyebrow--teal">Ifa Schemes</span>
          <h2 className="section__title">The Ifa-Wilson Scheme</h2>
          <p className="section__subtitle">
            Applying Ifa/Orisa Logic (ToE Logic) to generalize the Wilson Scheme to all fields of knowledge
            and all dimensions of reality — beyond science.
          </p>
        </div>
        <WilsonWidget />
      </div>
    </section>
  );
}

// ─── METAPHORS SECTION ────────────────────────────────────────────────────────

function MetaphorsSection() {
  const [active, setActive] = useState(0);
  return (
    <section className="section" id="metaphors">
      <div className="container">
        <div className="section__header section__header--center">
          <span className="section__eyebrow section__eyebrow--amber">IfaMetaphors & OrisaMetaphors</span>
          <h2 className="section__title">Speaking in Ifa-Orisa Language</h2>
          <p className="section__subtitle">
            Just as computational metaphors entered everyday language — "my brain crashed and was rebooted" —
            IfaMetaphors and OrisaMetaphors help everyday people develop IfaSense and OrisaThinking naturally.
            Making IFABOK and ORISABOK household names.
          </p>
        </div>
        <div className="metaphors-grid">
          {METAPHORS.map((m, i) => (
            <div key={i}
              className={`metaphor-card${active===i?' metaphor-card--active':''}`}
              style={{'--mcc': m.color}}
              onClick={() => setActive(active===i ? -1 : i)}>
              <div className="metaphor-card__odu">{m.odu}</div>
              <div className="metaphor-card__yo">{m.yo}</div>
              <div className="metaphor-card__literal">{m.literal}</div>
              {active === i && <p className="metaphor-card__thinking">{m.thinking}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── ISESE PRACTICE SECTION ───────────────────────────────────────────────────

function IsesePracticeSection() {
  return (
    <section className="section section--alt" id="isese">
      <div className="container">
        <div className="section__header section__header--center">
          <span className="section__eyebrow section__eyebrow--teal">Ifa-Orisa Practice in the Modern AI Era</span>
          <h2 className="section__title">Thriving as a Young Onisese in the 21st Century</h2>
          <p className="section__subtitle">
            IfaSkills, OrisaSkills, IfaPractices, and OrisaPractices — polymathic competencies rooted in
            IFABOK-ORISABOK for every Isese practitioner in the digital age.
          </p>
        </div>

        <div className="skills-grid">
          {SKILLS.map((sk, i) => (
            <div key={i} className="skill-card" style={{'--skc': sk.color}}>
              <div className="skill-card__header">
                <span className="skill-card__sym">{sk.sym}</span>
                <span className="skill-card__title">{sk.title}</span>
              </div>
              <ul className="skill-card__list">
                {sk.items.map((item, j) => (
                  <li key={j} className="skill-card__item">{item}</li>
                ))}
              </ul>
              <div className="skill-card__glow"/>
            </div>
          ))}
        </div>

        <div className="manifesto">
          <div className="manifesto__header">
            <span className="manifesto__eyebrow">21st Century Onisese</span>
            <h3 className="manifesto__title">The IfaThinker's Stack</h3>
            <h4 className="manifesto__subtitle">Becoming an OrisaThinker Using Practical Methods</h4>
          </div>
          <div className="manifesto__grid">
            {MANIFESTO.map((pt, i) => (
              <div key={i} className="manifesto-point">
                <div className="manifesto-point__sym">{pt.sym}</div>
                <div>
                  <div className="manifesto-point__title">{pt.title}</div>
                  <p className="manifesto-point__body">{pt.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── DISCLAIMER ───────────────────────────────────────────────────────────────

function DisclaimerBanner() {
  return (
    <div className="disclaimer">
      <div className="disclaimer__inner">
        <div className="disclaimer__head">
          <span className="disclaimer__pill disclaimer__pill--ifa">IFABOK</span>
          <span className="disclaimer__pill disclaimer__pill--orisa">ORISABOK</span>
          <span className="disclaimer__title">IFA Knowledge Disclaimer</span>
        </div>
        <p className="disclaimer__text">
          Our IFABOK and ORISABOK Courses are created strictly for{' '}
          <em>educational, research, entertainment, and technology development purposes</em>.
          They are not designed or intended as a substitute for authentic Ifa-Orisa Knowledge,
          Practice, or Tradition. The Study and Practice of Ifa-Orisa as a Babalawo/Iyanifa
          and Olorisa requires direct initiation, mentorship, and transmission within the
          living Ifa-Orisa Tradition — something no digital platform, comic, or game can
          provide or replace.
        </p>
        <div className="disclaimer__gloss">
          <span><strong>IFABOK</strong> — The IFA Body of Knowledge</span>
          <span className="disclaimer__dot">·</span>
          <span><strong>ORISABOK</strong> — The ORISA Body of Knowledge</span>
        </div>
      </div>
    </div>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__energy-line" aria-hidden="true"/>
      <div className="container footer__inner">
        <div className="footer__brand">
          <img src="../../src/assets/itoe_logo.png" alt="iTOE" className="footer__logo"/>
          <div>
            <div className="footer__name">Ifa-Orisa Thinking Playground</div>
            <div className="footer__sub">Part of <a href="../" className="footer__link-inline">IfaLearn</a> — The IFA Internet</div>
          </div>
        </div>
        <nav className="footer__nav">
          <a href="#overview" className="footer__link">Overview</a>
          <a href="#ifagram" className="footer__link">Ifagram</a>
          <a href="#wilson" className="footer__link">Wilson Scheme</a>
          <a href="#metaphors" className="footer__link">IfaMetaphors</a>
          <a href="#isese" className="footer__link">Isese Practice</a>
          <a href="../" className="footer__link">← IfaLearn</a>
          <a href="../../" className="footer__link" target="_blank" rel="noopener noreferrer">IFA Internet</a>
        </nav>
      </div>
      <div className="container footer__bottom">
        <span>&copy; 2026 CENProject Innovations Limited. All rights reserved.</span>
        <span>IfaLearn · Ifacodemy · IfaThinking · OrisaThinking</span>
      </div>
    </footer>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────

function App() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <OverviewSection />
        <IfagramSection />
        <WilsonSection />
        <MetaphorsSection />
        <IsesePracticeSection />
      </main>
      <DisclaimerBanner />
      <Footer />
      <MobileBar />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
