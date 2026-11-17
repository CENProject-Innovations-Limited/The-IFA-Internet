/* ─────────────────────────────────────────────────────────────────────────────
   IfaSchema Lab — Interactive Schema Experiment Environment
   The IFA Internet · CENProject
   Subpage of: ifa-schema-test (IfaSchema Platform)
───────────────────────────────────────────────────────────────────────────── */

const { useState } = React;

// ─── DATA ────────────────────────────────────────────────────────────────────

const FIELD_TYPES = [
  { id: 'text',    label: 'Text',    icon: 'T',    color: '#3b9eff', desc: 'String of characters — names, descriptions, labels, identifiers' },
  { id: 'number',  label: 'Number',  icon: '#',    color: '#f0920c', desc: 'Integer or decimal numeric value — counts, indexes, measurements' },
  { id: 'boolean', label: 'Boolean', icon: '⊤',    color: '#00c87c', desc: 'True/false binary value — flags, conditions, presence indicators' },
  { id: 'array',   label: 'Array',   icon: '[ ]',  color: '#8b5cf6', desc: 'Ordered list of values or nested items of any type' },
  { id: 'object',  label: 'Object',  icon: '{ }',  color: '#f59e0b', desc: 'Nested sub-schema or structured composite object' },
  { id: 'odu',     label: 'Odu',     icon: '◉',    color: '#f0920c', desc: 'One of the 256 Odu Ifa — axiomatic schema codes of the IFA Body of Knowledge' },
  { id: 'energy',  label: 'Energy',  icon: '⟳',    color: '#14b8d4', desc: 'CEN energy state or exchange value — Consciousness, Energy, Nature dimension' },
  { id: 'pattern', label: 'Pattern', icon: '∿',    color: '#ec4899', desc: 'Structural pattern or schema template reference — IfaWave field, superposition' },
];

const TEMPLATES = [
  {
    id: 'odu',
    name: 'Odu Ifa Schema',
    icon: '◉',
    color: '#f0920c',
    description: 'Universal schema for any of the 256 Odu Ifa — the axiomatic knowledge codes of the IFA Body of Knowledge.',
    fields: [
      { name: 'odu_name',         type: 'text',    required: true,  desc: 'Full name of the Odu (e.g. Ogbe Meji)' },
      { name: 'odu_number',       type: 'number',  required: true,  desc: 'Index number (1–256)' },
      { name: 'principal_code',   type: 'text',    required: false, desc: 'Parent principal code (1–16)' },
      { name: 'energy_signature', type: 'energy',  required: false, desc: 'CEN energy profile of this Odu' },
      { name: 'attributes',       type: 'array',   required: false, desc: 'List of qualities and characteristics' },
      { name: 'ifa_verses',       type: 'array',   required: false, desc: 'Collection of Ese Ifa (Ifa verses)' },
    ],
  },
  {
    id: 'ebo',
    name: 'Ẹbọ Exchange Schema',
    icon: '⟳',
    color: '#00c87c',
    description: 'Schema for an act of Ẹbọ (energy exchange) — capturing all dimensions of a ritual offering or energy transfer.',
    fields: [
      { name: 'exchange_type',    type: 'text',    required: true,  desc: 'Type of exchange (ritual, economic, natural)' },
      { name: 'giver',            type: 'object',  required: true,  desc: 'Entity initiating the exchange' },
      { name: 'receiver',         type: 'object',  required: true,  desc: 'Entity receiving the exchange' },
      { name: 'ase_level',        type: 'energy',  required: false, desc: 'Àṣẹ life-force energy level' },
      { name: 'governing_odu',    type: 'odu',     required: false, desc: 'Presiding Odu for this exchange' },
      { name: 'outcome_state',    type: 'text',    required: false, desc: 'Resulting censtate after exchange' },
    ],
  },
  {
    id: 'cen',
    name: 'CEN Field Schema',
    icon: 'Ψ',
    color: '#8b5cf6',
    description: 'Schema for the CEN (Consciousness-Energy-Nature) unified field — the governing intelligence of all ebological processes.',
    fields: [
      { name: 'field_name',       type: 'text',    required: true,  desc: 'Name of the CEN field instance' },
      { name: 'consciousness',    type: 'energy',  required: true,  desc: 'Consciousness component value' },
      { name: 'energy',           type: 'energy',  required: true,  desc: 'Energy component value' },
      { name: 'nature',           type: 'text',    required: true,  desc: 'Nature / natural-world component' },
      { name: 'interaction_mode', type: 'text',    required: false, desc: 'How C, E, N interact in this field' },
      { name: 'ifa_alignment',    type: 'odu',     required: false, desc: 'Aligned Odu Ifa for this field state' },
    ],
  },
  {
    id: 'knowledge',
    name: 'Knowledge Field Schema',
    icon: '◈',
    color: '#14b8d4',
    description: 'Universal schema for any field of knowledge on the IFA Internet — structured to integrate with the 256 Odu Ifa as axiomatic principles.',
    fields: [
      { name: 'field_name',       type: 'text',    required: true,  desc: 'Name of the knowledge field' },
      { name: 'field_id',         type: 'text',    required: true,  desc: 'Unique identifier slug' },
      { name: 'axiomatic_base',   type: 'odu',     required: false, desc: 'Principal Odu governing this field' },
      { name: 'sub_fields',       type: 'array',   required: false, desc: 'Sub-disciplines and related areas' },
      { name: 'ifa_principles',   type: 'array',   required: false, desc: 'Ifa principles that apply to this field' },
      { name: 'energy_signature', type: 'energy',  required: false, desc: 'Field-specific energy profile' },
    ],
  },
  {
    id: 'consciousness',
    name: 'Consciousness State Schema',
    icon: '∿',
    color: '#ec4899',
    description: 'Schema for mapping consciousness states — from Ifa Superposition through Wavefunction Collapse to a definite censtate.',
    fields: [
      { name: 'state_name',       type: 'text',    required: true,  desc: 'Name of the consciousness state' },
      { name: 'superposition',    type: 'boolean', required: false, desc: 'Is this state in Ifa Superposition?' },
      { name: 'ifa_field',        type: 'pattern', required: false, desc: 'Associated IfaWave probability field' },
      { name: 'collapse_trigger', type: 'text',    required: false, desc: 'What event collapses this field?' },
      { name: 'resulting_odu',    type: 'odu',     required: false, desc: 'Odu that governs the collapsed state' },
      { name: 'energy_level',     type: 'energy',  required: false, desc: 'Post-collapse energy value' },
    ],
  },
];

const LAB_TOOLS = [
  { icon: '⊞', title: 'Schema Builder',    color: '#14b8d4', desc: 'Construct custom schemas field by field — define names, types, and relationships for any knowledge domain.' },
  { icon: '◈', title: 'Template Library',  color: '#f0920c', desc: 'Load pre-built Ifa schemas: Odu Ifa, Ẹbọ Exchange, CEN Field, Knowledge Field, and Consciousness State.' },
  { icon: '∿', title: 'Schema Visualizer', color: '#8b5cf6', desc: 'View your schema in card view or schema-code format — visualize field structures and required relationships.' },
  { icon: '⬡', title: 'Field Type Ref',    color: '#00c87c', desc: 'Reference all available field types — from standard data types to Ifa-native types: Odu, Energy, and Pattern.' },
];

// ─── NAV ─────────────────────────────────────────────────────────────────────

function Nav() {
  return (
    <nav className="nav">
      <div className="nav__inner">
        <div className="nav__left">
          <a href="../" className="nav__back">
            <span className="nav__back-arrow">←</span>
            Ifa Schema
          </a>
          <span className="nav__divider">/</span>
          <span className="nav__current">Lab</span>
        </div>
        <span className="nav__logo">⊞ IfaSchema Lab</span>
        <a href="../../" className="nav__home">IFA Internet</a>
      </div>
    </nav>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="hero">
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__grid" />
        <div className="hero__beam hero__beam--1" />
        <div className="hero__beam hero__beam--2" />
        <div className="hero__beam hero__beam--3" />
      </div>
      <div className="container hero__inner">
        <div className="hero__badge">
          <span className="hero__badge-dot" />
          IfaSchema · Subplatform · Experimental Lab
        </div>
        <h1 className="hero__title">
          <span className="hero__title-ifa">IfaSchema</span>
          <span className="hero__title-lab"> Lab</span>
        </h1>
        <p className="hero__tagline">
          Interactive Schema Experiment Environment — Build, Explore &amp; Visualize Schemas for Every Domain of Knowledge
        </p>
        <p className="hero__desc">
          IfaSchema Lab is the interactive workspace of the IfaSchema Platform. Construct custom schemas,
          load Ifa-native templates, explore field types, and visualize schema structures — all within
          the universal meta-schema framework of the IFA Internet.
        </p>
        <div className="hero__ctas">
          <a href="#builder" className="btn btn--primary">Open Schema Builder</a>
          <a href="#field-types" className="btn btn--ghost">Field Type Reference</a>
        </div>
      </div>
    </section>
  );
}

// ─── LAB TOOLS OVERVIEW ───────────────────────────────────────────────────────

function LabToolsSection() {
  return (
    <section className="section" id="tools">
      <div className="container">
        <div className="section__header section__header--center">
          <span className="section__eyebrow">Lab Capabilities</span>
          <h2 className="section__title">What You Can Do in IfaSchema Lab</h2>
        </div>
        <div className="tools-grid">
          {LAB_TOOLS.map((t, i) => (
            <div key={i} className="tool-card" style={{ '--tc': t.color }}>
              <div className="tool-card__icon">{t.icon}</div>
              <h3 className="tool-card__title">{t.title}</h3>
              <p className="tool-card__desc">{t.desc}</p>
              <div className="tool-card__bar" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── SCHEMA BUILDER ───────────────────────────────────────────────────────────

function SchemaBuilder() {
  const [meta, setMeta]   = useState({ name: '', namespace: 'ifa', description: '' });
  const [fields, setFields] = useState([]);
  const [form, setForm]   = useState({ name: '', type: 'text', required: false, desc: '' });
  const [selectedTpl, setSelectedTpl] = useState('');
  const [view, setView]   = useState('cards');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const typeInfo = (id) => FIELD_TYPES.find(t => t.id === id) || FIELD_TYPES[0];

  function loadTemplate(tplId) {
    setSelectedTpl(tplId);
    if (!tplId) return;
    const tpl = TEMPLATES.find(t => t.id === tplId);
    if (!tpl) return;
    setMeta({ name: tpl.name, namespace: 'ifa', description: tpl.description });
    setFields(tpl.fields.map(f => ({ ...f })));
    setError('');
  }

  function addField(e) {
    e.preventDefault();
    const name = form.name.trim().replace(/\s+/g, '_').toLowerCase();
    if (!name) { setError('Field name is required.'); return; }
    if (fields.some(f => f.name === name)) { setError(`"${name}" already exists.`); return; }
    setFields(prev => [...prev, { ...form, name }]);
    setForm({ name: '', type: 'text', required: false, desc: '' });
    setError('');
  }

  function removeField(name) {
    setFields(prev => prev.filter(f => f.name !== name));
  }

  function clearAll() {
    setMeta({ name: '', namespace: 'ifa', description: '' });
    setFields([]);
    setSelectedTpl('');
    setError('');
  }

  const schemaCode = JSON.stringify({
    '@type': 'IfaSchema',
    name: meta.name || 'unnamed',
    namespace: meta.namespace || 'ifa',
    ...(meta.description && { description: meta.description }),
    fields: fields.map(f => ({
      name: f.name,
      type: f.type,
      required: f.required,
      ...(f.desc && { description: f.desc }),
    })),
  }, null, 2);

  function copyCode() {
    navigator.clipboard?.writeText(schemaCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    });
  }

  const reqCount  = fields.filter(f => f.required).length;
  const typeCount = [...new Set(fields.map(f => f.type))].length;

  return (
    <section className="section section--dark" id="builder">
      <div className="container">
        <div className="section__header section__header--center">
          <span className="section__eyebrow section__eyebrow--cyan">Interactive Tool</span>
          <h2 className="section__title">Schema Builder</h2>
          <p className="section__subtitle">
            Build a schema field by field or load an Ifa template. Switch between card view and JSON code.
          </p>
        </div>

        <div className="builder-layout">

          {/* ── FORM PANEL ─────────────────────────────────────────────────── */}
          <div className="builder-form">

            {/* Template Loader */}
            <div className="bblock bblock--template">
              <h3 className="bblock__title">
                <span className="bblock__title-icon">◈</span>
                Load Template
              </h3>
              <select
                className="field-input"
                value={selectedTpl}
                onChange={e => loadTemplate(e.target.value)}
              >
                <option value="">— select an Ifa template —</option>
                {TEMPLATES.map(t => (
                  <option key={t.id} value={t.id}>{t.icon}  {t.name}</option>
                ))}
              </select>
            </div>

            {/* Schema Identity */}
            <div className="bblock">
              <h3 className="bblock__title">
                <span className="bblock__title-icon">⊞</span>
                Schema Identity
              </h3>
              <label className="field-label">
                Schema Name
                <input
                  className="field-input"
                  value={meta.name}
                  placeholder="e.g. Odu Ifa Schema"
                  onChange={e => setMeta(m => ({ ...m, name: e.target.value }))}
                />
              </label>
              <label className="field-label">
                Namespace
                <input
                  className="field-input"
                  value={meta.namespace}
                  placeholder="ifa"
                  onChange={e => setMeta(m => ({ ...m, namespace: e.target.value }))}
                />
              </label>
              <label className="field-label">
                Description
                <textarea
                  className="field-input field-input--ta"
                  value={meta.description}
                  placeholder="Describe what this schema represents…"
                  rows={2}
                  onChange={e => setMeta(m => ({ ...m, description: e.target.value }))}
                />
              </label>
            </div>

            {/* Add Field */}
            <div className="bblock">
              <h3 className="bblock__title">
                <span className="bblock__title-icon">+</span>
                Add Field
              </h3>
              <form onSubmit={addField}>
                <label className="field-label">
                  Field Name
                  <input
                    className="field-input"
                    value={form.name}
                    placeholder="e.g. odu_name"
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  />
                </label>
                <label className="field-label">
                  Type
                  <select
                    className="field-input"
                    value={form.type}
                    onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
                  >
                    {FIELD_TYPES.map(t => (
                      <option key={t.id} value={t.id}>{t.icon}  {t.label}</option>
                    ))}
                  </select>
                </label>
                <label className="field-label">
                  Description
                  <input
                    className="field-input"
                    value={form.desc}
                    placeholder="What does this field hold? (optional)"
                    onChange={e => setForm(f => ({ ...f, desc: e.target.value }))}
                  />
                </label>
                <label className="field-label field-label--row">
                  <input
                    type="checkbox"
                    className="field-checkbox"
                    checked={form.required}
                    onChange={e => setForm(f => ({ ...f, required: e.target.checked }))}
                  />
                  Required field
                </label>
                {error && <p className="field-error">{error}</p>}
                <button type="submit" className="btn btn--primary btn--full">
                  + Add Field
                </button>
              </form>
            </div>

            <button className="btn btn--ghost btn--sm btn--full" onClick={clearAll}>
              Clear Schema
            </button>
          </div>

          {/* ── PREVIEW PANEL ──────────────────────────────────────────────── */}
          <div className="builder-preview">
            <div className="preview-top">
              <div className="preview-name">
                {meta.name
                  ? <><span className="preview-ns">{meta.namespace || 'ifa'}/</span>{meta.name}</>
                  : <span className="preview-name--dim">Unnamed Schema</span>
                }
              </div>
              <div className="view-toggle">
                <button
                  className={`view-btn${view === 'cards' ? ' view-btn--on' : ''}`}
                  onClick={() => setView('cards')}
                >Cards</button>
                <button
                  className={`view-btn${view === 'code' ? ' view-btn--on' : ''}`}
                  onClick={() => setView('code')}
                >Code</button>
              </div>
            </div>

            {view === 'cards' ? (
              <div className="preview-body">
                {fields.length === 0 ? (
                  <div className="preview-empty">
                    <div className="preview-empty__icon">⊞</div>
                    <p>No fields yet.<br />Add a field or load a template to begin.</p>
                  </div>
                ) : (
                  <>
                    {meta.description && (
                      <p className="preview-desc">{meta.description}</p>
                    )}
                    <div className="preview-fields">
                      {fields.map((f, i) => {
                        const ti = typeInfo(f.type);
                        return (
                          <div key={i} className="pfield" style={{ '--pfc': ti.color }}>
                            <span className="pfield__icon" title={ti.label}>{ti.icon}</span>
                            <div className="pfield__center">
                              <span className="pfield__name">{f.name}</span>
                              {f.desc && <span className="pfield__desc">{f.desc}</span>}
                            </div>
                            <div className="pfield__right">
                              <span className="pfield__badge" style={{ color: ti.color, background: `${ti.color}18` }}>
                                {ti.label}
                              </span>
                              {f.required && <span className="pfield__req">*</span>}
                              <button className="pfield__del" onClick={() => removeField(f.name)} title="Remove field">×</button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="preview-summary">
                      <span>{fields.length} field{fields.length !== 1 ? 's' : ''}</span>
                      <span className="preview-summary__dot">·</span>
                      <span>{reqCount} required</span>
                      <span className="preview-summary__dot">·</span>
                      <span>{typeCount} type{typeCount !== 1 ? 's' : ''}</span>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="preview-code">
                <div className="preview-code__bar">
                  <span className="preview-code__label">IfaSchema · JSON</span>
                  <button
                    className={`copy-btn${copied ? ' copy-btn--done' : ''}`}
                    onClick={copyCode}
                  >{copied ? '✓ Copied' : 'Copy'}</button>
                </div>
                <pre className="preview-code__pre">{schemaCode}</pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── UIoE SCHEMATIC SECTION ───────────────────────────────────────────────────

const UIOE_INPUTS = [
  { label: 'Western knowledge systems',        icon: '◈' },
  { label: 'Eastern (Asian) knowledge systems', icon: '◈' },
  { label: 'Ancient African knowledge systems', icon: '◈' },
  { label: 'All fields of knowledge (TOE)',     icon: '◈' },
  { label: 'Others',                            icon: '◈' },
];

const UIOE_PROCESS = [
  { label: 'The 256 Odu Ifa', color: '#f0920c' },
  { label: 'The 16 Ifa Principles (Oju Odufa Merindinlogun)', color: '#14b8d4' },
];

const UIOE_OUTPUTS = [
  { label: 'Ifa X',  icon: '◉', color: '#f0920c' },
  { label: 'ToE X',  icon: '∿', color: '#14b8d4' },
];

function UIoESection() {
  const [hovered, setHovered] = useState(null);

  return (
    <section className="section section--uioe" id="uioe">
      <div className="container">
        <div className="section__header section__header--center">
          <span className="section__eyebrow section__eyebrow--amber">Schematic Tools</span>
          <h2 className="section__title">
            Ifa Schematic Tools for the Unification and Integration of Everything (UIoE)
          </h2>
          <p className="section__subtitle">
            IfaSchema provides the universal meta-schema for the Unification and Integration of all
            knowledge — channelling every field of knowledge through the Ifa Process to produce
            Ifa-unified outputs grounded in the 256 Odu Ifa and the Totality of Existence.
          </p>
        </div>

        {/* ── Main Diagram ───────────────────────────────────────────────── */}
        <div className="uioe-schematic">
          <div className="uioe-schematic__header">
            <span className="uioe-schematic__tag">IfaSchema</span>
            <h3 className="uioe-schematic__title">ToE Schema</h3>
            <p className="uioe-schematic__sub">Ifa Process (Unification &amp; Integration, UI)</p>
          </div>

          <div className="uioe-body">
            {/* INPUT PORTAL */}
            <div
              className={`uioe-portal uioe-portal--in${hovered === 'input' ? ' uioe-portal--active' : ''}`}
              onMouseEnter={() => setHovered('input')}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="uioe-portal__head">
                <span className="uioe-portal__icon">⟶</span>
                <span className="uioe-portal__label">Input Portal</span>
                <span className="uioe-portal__sub">Ifa Inputs</span>
              </div>
              <ul className="uioe-list">
                {UIOE_INPUTS.map((item, i) => (
                  <li key={i} className="uioe-list__item">
                    <span className="uioe-list__dot" />
                    {item.label}
                  </li>
                ))}
              </ul>
            </div>

            {/* IFA PROCESS CIRCLE */}
            <div className="uioe-process-wrap">
              <div
                className={`uioe-process${hovered === 'process' ? ' uioe-process--active' : ''}`}
                onMouseEnter={() => setHovered('process')}
                onMouseLeave={() => setHovered(null)}
              >
                <div className="uioe-process__ring uioe-process__ring--outer" aria-hidden="true" />
                <div className="uioe-process__ring uioe-process__ring--inner" aria-hidden="true" />
                <div className="uioe-process__content">
                  {UIOE_PROCESS.map((p, i) => (
                    <div key={i} className="uioe-process__item" style={{ '--pc': p.color }}>
                      <span className="uioe-process__dot" />
                      <span>{p.label}</span>
                    </div>
                  ))}
                </div>
                <div className="uioe-process__glow" aria-hidden="true" />
              </div>
            </div>

            {/* OUTPUT PORTAL */}
            <div
              className={`uioe-portal uioe-portal--out${hovered === 'output' ? ' uioe-portal--active' : ''}`}
              onMouseEnter={() => setHovered('output')}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="uioe-portal__head">
                <span className="uioe-portal__icon">⟶</span>
                <span className="uioe-portal__label">Output Portal</span>
                <span className="uioe-portal__sub">Ifa Outputs: UI'ed</span>
              </div>
              <ul className="uioe-list">
                {UIOE_OUTPUTS.map((item, i) => (
                  <li key={i} className="uioe-list__item" style={{ '--oc': item.color }}>
                    <span className="uioe-list__badge" style={{ color: item.color }}>{item.icon}</span>
                    {item.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* IFA TRANSFORM ARROW */}
          <div className="uioe-transform">
            <div className="uioe-transform__track">
              <div className="uioe-transform__beam" />
              <div className="uioe-transform__arrowhead">▶</div>
            </div>
            <span className="uioe-transform__label">Ifa Transform</span>
          </div>
        </div>

        {/* ── Explainer cards ─────────────────────────────────────────────── */}
        <div className="uioe-cards">
          <div className="uioe-card" style={{ '--ucc': '#f0920c' }}>
            <div className="uioe-card__icon">⟶</div>
            <h4 className="uioe-card__title">Input Portal</h4>
            <p className="uioe-card__desc">
              Any field of knowledge — Western, Eastern, African, or other — enters the Ifa Process
              as a raw knowledge system to be unified and integrated.
            </p>
          </div>
          <div className="uioe-card" style={{ '--ucc': '#14b8d4' }}>
            <div className="uioe-card__icon">◉</div>
            <h4 className="uioe-card__title">Ifa Process</h4>
            <p className="uioe-card__desc">
              Knowledge is processed through the 256 Odu Ifa (axiomatic codes) and the 16 Ifa
              Principles (Oju Odufa Merindinlogun) — the universal laws of the Totality of Existence.
            </p>
          </div>
          <div className="uioe-card" style={{ '--ucc': '#8b5cf6' }}>
            <div className="uioe-card__icon">∿</div>
            <h4 className="uioe-card__title">Ifa Transform</h4>
            <p className="uioe-card__desc">
              The Ifa Transform is the schematic operation that converts all input knowledge
              into Ifa-unified form — applying IfaSchema meta-structures across every dimension.
            </p>
          </div>
          <div className="uioe-card" style={{ '--ucc': '#00c87c' }}>
            <div className="uioe-card__icon">◈</div>
            <h4 className="uioe-card__title">Output Portal</h4>
            <p className="uioe-card__desc">
              Unified outputs emerge as <em>Ifa X</em> (the Ifa-integrated form of any knowledge field)
              and <em>ToE X</em> (its Totality of Existence schema representation).
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FIELD TYPES REFERENCE ────────────────────────────────────────────────────

function FieldTypesSection() {
  return (
    <section className="section" id="field-types">
      <div className="container">
        <div className="section__header section__header--center">
          <span className="section__eyebrow section__eyebrow--jade">Reference</span>
          <h2 className="section__title">Field Type Reference</h2>
          <p className="section__subtitle">
            IfaSchema supports standard data types and Ifa-native types — designed to represent
            every dimension of knowledge within the IFA Body of Knowledge and the Totality of Existence.
          </p>
        </div>
        <div className="ftypes-grid">
          {FIELD_TYPES.map(t => (
            <div key={t.id} className="ftype-card" style={{ '--ftc': t.color }}>
              <div className="ftype-card__icon">{t.icon}</div>
              <div className="ftype-card__label">{t.label}</div>
              <p className="ftype-card__desc">{t.desc}</p>
              <code className="ftype-card__id">{t.id}</code>
              <div className="ftype-card__glow" />
            </div>
          ))}
        </div>

        <div className="ftype-note">
          <span className="ftype-note__icon">◉</span>
          <p>
            <strong>Ifa-native types</strong> — <code>odu</code>, <code>energy</code>, and <code>pattern</code> —
            extend standard schema vocabulary to represent dimensions of knowledge unique to the IFA Body of Knowledge:
            the 256 Odu Ifa, CEN energy exchange states, and IfaWave probability fields.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__energy-bar" aria-hidden="true" />
      <div className="container footer__inner">
        <div className="footer__brand">
          <div className="footer__logo">⊞ IfaSchema Lab</div>
          <div className="footer__sub">Subplatform of IfaSchema · The IFA Internet · CENProject</div>
        </div>
        <nav className="footer__nav">
          <a href="#builder"     className="footer__link">Schema Builder</a>
          <a href="#uioe"        className="footer__link">UIoE Schematic</a>
          <a href="#field-types" className="footer__link">Field Types</a>
          <a href="../"          className="footer__link">Ifa Schema</a>
          <a href="../../"       className="footer__link">IFA Internet</a>
        </nav>
        <div className="footer__copy">
          © 2026 CENProject Innovations Limited · The IFA Internet
        </div>
      </div>
    </footer>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────

function App() {
  return (
    <div className="app">
      <Nav />
      <main>
        <Hero />
        <LabToolsSection />
        <UIoESection />
        <SchemaBuilder />
        <FieldTypesSection />
      </main>
      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
