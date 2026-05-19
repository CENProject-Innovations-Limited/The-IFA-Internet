/* ─────────────────────────────────────────────────────────────
   Ifa Architecture (Ifarch) — ToE Architecture · ArchoE
   The IFA Internet · CENProject · toe.cenproject.org
───────────────────────────────────────────────────────────── */

const { useState, useEffect } = React;

// ── Core Identities ───────────────────────────────────────────
const IDENTITIES = [
  { id: 'ifarch',            name: 'Ifa Architecture',           abbr: 'Ifarch',   accent: '#f5c518', symbol: '◫', desc: 'The primary framework — studying all fields of Architecture through the Energy-based Principles of Ifa. The 256 Odu Ifa are the original blueprints of existence, encoding every possible architectural configuration of Consciousness-Energy.' },
  { id: 'orisarch',          name: 'Orisa Architecture',         abbr: 'Orisarch', accent: '#4361ee', symbol: '⬡', desc: 'The dual of Ifarch — each Orisa is a distinct architectural intelligence embodying a unique structural principle. Orisarch studies how divine archetypes organize reality, space, community, and form through the Anergy-side of existence.' },
  { id: 'archoe',            name: 'Architecture for Everything',abbr: 'ArchoE',   accent: '#2d9e6b', symbol: '⊞', desc: 'ArchoE reveals the Odu Ifa as the Blueprint of the IFA Internet — and of all existence. Every field, every system, every being is a unique architectural expression of Consciousness-Energy structured by Odu principles.' },
  { id: 'toe-arch',          name: 'ToE Architecture',           abbr: 'ToE Arch', accent: '#e9498a', symbol: '⊛', desc: 'Architecture as the organizing framework of the Theory of Everything — the structural intelligence connecting all platforms of the IFA Internet into one coherent, unified meta-architecture.' },
  { id: 'energy-arch',       name: 'Energy-Based Architecture',  abbr: 'EnerArch', accent: '#ff6b35', symbol: '⚡', desc: 'Grounded in Consciousness-Energy (CEN) — the fundamental substance of all existence. Every structure, from a quark to a galaxy to a network, is a configuration of a single energetic reality expressing itself in form.' },
  { id: 'consciousness-arch',name: 'Consciousness Architecture', abbr: 'ConsArch', accent: '#7c4dff', symbol: '◉', desc: 'The study of how consciousness organizes itself into structure — from neural architectures to cosmic patterns, from social systems to digital networks — through the unified lens of Ifa philosophy and modern science.' },
];

// ── Fields of Architecture ────────────────────────────────────
const FIELDS = [
  { name: 'Physical Architecture',      desc: 'Buildings, cities, and spaces — the material fabric of civilization as structured energyforms', accent: '#3b82f6' },
  { name: 'Cosmic Architecture',        desc: 'Structure of the universe — galaxies, solar systems, and spacetime as divine blueprint', accent: '#f5c518' },
  { name: 'Digital Architecture',       desc: 'The IFA Internet, software, networks — information as structured and interconnected consciousness', accent: '#2d9e6b' },
  { name: 'Biological Architecture',    desc: 'DNA, cells, organs, organisms — living structural systems encoding Odu design principles', accent: '#e9498a' },
  { name: 'Social Architecture',        desc: 'Communities, institutions, governance — human systems as designed and inhabited environments', accent: '#4361ee' },
  { name: 'Mathematical Architecture',  desc: 'Ifa Mathematics, IfaGebra, AxioE — the architecture of pure abstraction, number, and logical form', accent: '#7c4dff' },
  { name: 'Sacred Architecture',        desc: 'Shrines, temples, ceremonial groves — built environments aligned with Orisa energy and Ifa ritual', accent: '#daa520' },
  { name: 'Linguistic Architecture',    desc: 'IfaLang — the structural design of universal language as protocol, blueprint, and meta-system', accent: '#0099ff' },
  { name: 'African Architecture',       desc: 'Yoruba compounds, Great Zimbabwe, Mali mosques, Nubian pyramids — Africa as first architect', accent: '#ff6b35' },
  { name: 'Musical Architecture',       desc: 'Sound, rhythm, and harmony — the temporal architecture of vibration, resonance, and Orisa praise', accent: '#e63946' },
  { name: 'Knowledge Architecture',     desc: 'IFABOK, IfaPedia, IfaHubs — systems that structure, store, and transmit all knowledge as networks', accent: '#9b59b6' },
  { name: 'Philosophical Architecture', desc: 'The architecture of thought — meta-structures of Ifa logic, ethics, ontology, and epistemology', accent: '#38bdf8' },
];

// ── 16 Odu as Blueprints ──────────────────────────────────────
const ODU_BLUEPRINTS = [
  { num:  1, name: 'Ogbe',     accent: '#f5c518', role: 'Blueprint of Energy — primal creative force, the Light of all architectures and the source of all form' },
  { num:  2, name: 'Oyeku',    accent: '#e8ecf5', role: 'Blueprint of Anergy — the receptive void, the dark ground from which all structures emerge into being' },
  { num:  3, name: 'Iwori',    accent: '#4361ee', role: 'Blueprint of Inner Vision — introspection and the architecture of deep self-knowledge and consciousness' },
  { num:  4, name: 'Odi',      accent: '#2d9e6b', role: 'Blueprint of the Womb — generative container, the architecture of potential space and hidden possibility' },
  { num:  5, name: 'Irosun',   accent: '#e63946', role: 'Blueprint of Flow — blood, water, circulation, connectivity, and life-force distribution systems' },
  { num:  6, name: 'Owonrin',  accent: '#ff6b35', role: 'Blueprint of Dynamic Change — transformation, turbulence, and adaptive structural flexibility in form' },
  { num:  7, name: 'Obara',    accent: '#daa520', role: 'Blueprint of Hierarchy — leadership structures, royal architecture, and the ordering of authority in space' },
  { num:  8, name: 'Okanran',  accent: '#e9498a', role: 'Blueprint of Resolution — tension-and-balance, conflict made productive through structural design' },
  { num:  9, name: 'Ogunda',   accent: '#7c4dff', role: 'Blueprint of Pathways — roads, corridors, networks; the clearing and opening of routes through form' },
  { num: 10, name: 'Osa',      accent: '#0099ff', role: 'Blueprint of Swift Force — rapid structural change, architectural revolution, and sudden transformation' },
  { num: 11, name: 'Ika',      accent: '#38bdf8', role: 'Blueprint of the Hand — craft, making, fabrication, and the architect\'s creative mastery of material' },
  { num: 12, name: 'Oturupọn', accent: '#2d9e6b', role: 'Blueprint of Stabilization — peace in structure, resolved tensions, equilibrium, and grounded form' },
  { num: 13, name: 'Otura',    accent: '#9b59b6', role: 'Blueprint of Completion — wholeness, final forms, fulfilled architectural visions brought to totality' },
  { num: 14, name: 'Irete',    accent: '#c4813a', role: 'Blueprint of Endurance — structural durability, deep time, patience, and resilience encoded in form' },
  { num: 15, name: 'Oṣe',      accent: '#f5c518', role: 'Blueprint of Power — triumphant structures, peaks, heights, vertical assertion, and victory in form' },
  { num: 16, name: 'Ofun',     accent: '#8b92a8', role: 'Blueprint of Transformation — endings that enable new architectures; death as the source of redesign' },
];

// ── African Architectural Heritage ───────────────────────────
const AFRICAN_ARCH = [
  {
    name: 'Yoruba Agbo Ilé',
    region: 'West Africa — Nigeria / Benin Republic',
    accent: '#f5c518',
    icon: '⬡',
    gradient: 'linear-gradient(155deg, #2a0e00 0%, #7a3010 45%, #c47818 80%, #e89a22 100%)',
    pattern: 'radial-gradient(circle at 50% 65%, rgba(245,197,24,0.22) 0%, transparent 65%)',
    wikiTitle: 'Yoruba architecture',
    wiki: 'https://en.wikipedia.org/wiki/Yoruba_architecture',
    desc: 'The Yoruba compound (agbo ilé) is a living social architecture centered on the courtyard (àgbàlà), where multiple family units cluster around a shared sacred space. The ilé (house) is not merely shelter — it is a cosmological statement, encoding the family\'s relationship with ancestors, Orisa, and land.',
    highlights: [
      'Courtyard (àgbàlà) is the spiritual and social heart — all family life flows around it',
      'Carved wooden doors, house posts, and pillars encode Orisa and ancestral iconography',
      'Ochre and white earthen plaster; distinct architectural styles across Yoruba cities',
      'Compounds grow organically as families expand — living architecture that evolves over generations',
    ],
    moreInfo: 'The Yoruba compound can house dozens of family members across generations within a single walled enclosure. Its layout mirrors Yoruba cosmology — earth, community, and divine realms intersecting at the central courtyard. Shrines to ancestors and Orisa are built directly into the architecture, making every Yoruba ilé a living sacred space. The Afin (royal palace) is the supreme expression of this tradition — a compound-city encoding the entire Yoruba cosmos in plan.',
  },
  {
    name: 'Egyptian Pyramids of Giza',
    region: 'North Africa — Egypt',
    accent: '#e8c040',
    icon: '△',
    gradient: 'linear-gradient(180deg, #060402 0%, #2a1800 40%, #7a4a08 75%, #c89018 100%)',
    pattern: 'linear-gradient(180deg, transparent 30%, rgba(200,144,24,0.22) 100%)',
    wikiTitle: 'Giza pyramid complex',
    wiki: 'https://en.wikipedia.org/wiki/Giza_pyramid_complex',
    desc: 'The Great Pyramids of Giza — built around 2560 BCE — are among the most precisely engineered structures in human history. Rising 138 metres at Khufu\'s peak, aligned to the cardinal points with extraordinary accuracy, they encode astronomical knowledge, royal theology, and architectural mastery that continues to astound the modern world.',
    highlights: [
      'Khufu\'s pyramid: 138m tall, 2.3 million stone blocks, aligned to true north within 0.05°',
      'Base level to within 2.1 cm across 13.5 hectares — precision still unmatched by modern construction',
      'Originally cased in polished white Tura limestone; three pyramids mirror Orion\'s Belt',
      'UNESCO World Heritage Site; sole surviving Wonder of the Ancient World',
    ],
    moreInfo: 'The engineering precision of Giza remains extraordinary — the base of the Great Pyramid is level to within 2.1 cm across a 13.5-hectare footprint. The complex likely involved 20,000+ workers over two decades. The three pyramids\' layout mirrors the belt stars of Orion — encoding astronomical intelligence directly into the landscape. The Great Sphinx, carved from a single limestone outcrop, stands as the world\'s largest monolithic statue and guardian of the royal necropolis.',
  },
  {
    name: 'Nubian Pyramids of Meroe',
    region: 'Northeast Africa — Sudan',
    accent: '#daa520',
    icon: '▲',
    gradient: 'linear-gradient(180deg, #050306 0%, #1e1200 40%, #6b4a0a 75%, #a87818 100%)',
    pattern: 'linear-gradient(180deg, transparent 30%, rgba(170,120,24,0.20) 100%)',
    wikiTitle: 'Meroë',
    wiki: 'https://en.wikipedia.org/wiki/Mero%C3%AB',
    desc: 'More numerous than Egyptian pyramids, the Nubian pyramids of Meroe and Nuri reveal a wholly independent African evolution of monumental form — steeper angles, distinctive proportions, attached mortuary chapels. An original architectural vision developed by the Kushite civilization over 2,500 years.',
    highlights: [
      'Over 200 pyramids — more than exist in all of Egypt combined',
      'Steeper profile (65°–70°) and smaller bases distinguish Nubian from Egyptian pyramids',
      'Built by Kushite kings and queens from 700 BCE – 350 CE',
      'UNESCO World Heritage Site; attached mortuary chapels with carved relief panels',
    ],
    moreInfo: 'The Nubian pyramids were built independently of Egyptian influence — their steeper proportions, smaller bases, and attached chapels reflect a wholly African evolution of pyramid architecture. The Kingdom of Kush at Meroe was a major Iron Age empire whose architectural legacy rivals Egypt\'s in scope. Queens (Kandakes) were buried here with as much grandeur as kings — the royal burial fields at Meroe, Nuri, and Barkal span centuries of Kushite monumental achievement.',
  },
  {
    name: 'Great Zimbabwe',
    region: 'Southern Africa — Zimbabwe',
    accent: '#2d9e6b',
    icon: '◫',
    gradient: 'linear-gradient(180deg, #020a04 0%, #0c2a0a 50%, #1a5c14 80%, #24801a 100%)',
    pattern: 'radial-gradient(ellipse at 50% 80%, rgba(45,158,107,0.22) 0%, transparent 70%)',
    wikiTitle: 'Great Zimbabwe',
    wiki: 'https://en.wikipedia.org/wiki/Great_Zimbabwe',
    desc: 'Massive dry-stone enclosures built without mortar by the Kingdom of Zimbabwe between the 11th and 15th centuries. These monumental walls — some 11 metres high, 5 metres thick — represent Africa\'s most sophisticated ancient stone architecture, built entirely from internal African knowledge and engineering.',
    highlights: [
      'Dry-stone walls up to 11m tall and 5m thick — built without mortar using interlocking granite',
      '18,000 tonnes of shaped granite; construction spans the 11th–15th centuries',
      'Capital of the Zimbabwe Kingdom controlling gold routes to the Indian Ocean coast',
      'UNESCO World Heritage Site; gave Zimbabwe its name ("dzimba dzemabwe" = great stone houses)',
    ],
    moreInfo: 'European colonists long refused to credit African builders with Great Zimbabwe\'s construction — a racist denial that archaeology has thoroughly refuted. The walls were built using a sophisticated interlocking dry-stone technique that has survived 700+ years without mortar. Great Zimbabwe was the capital of a powerful trading state that connected the Shona interior to global networks, with Chinese, Persian, and Arab trade goods found in the ruins.',
  },
  {
    name: 'Great Mosque of Djenné',
    region: 'West Africa — Mali',
    accent: '#c4813a',
    icon: '✦',
    gradient: 'linear-gradient(155deg, #160800 0%, #5a2a0a 50%, #9a4e1a 80%, #c47830 100%)',
    pattern: 'radial-gradient(circle at 50% 40%, rgba(196,129,58,0.20) 0%, transparent 60%)',
    wikiTitle: 'Great Mosque of Djenné',
    wiki: 'https://en.wikipedia.org/wiki/Great_Mosque_of_Djenn%C3%A9',
    desc: 'The world\'s largest mud-brick structure — a masterpiece of Sudano-Sahelian architecture. Its organic towers and facade rise from an island city, rebuilt in 1907 on a 13th-century foundation. The mosque is maintained annually in a community-wide ceremony of collective structural renewal.',
    highlights: [
      'World\'s largest mud-brick (adobe) structure; 75m × 75m footprint with three minarets',
      'Torons (protruding wooden beams) serve as permanent scaffolding for annual repairs',
      'Annual "Fête du Crépissage" — thousands gather at dawn to replaster the entire mosque',
      'UNESCO World Heritage Site; centre of the island city and Saharan Islamic scholarship',
    ],
    moreInfo: 'The mosque\'s annual plastering festival is one of the world\'s most extraordinary collective architectural maintenance events — thousands of residents gather to replaster the entire structure with wet banco (mud mixed with rice husks and karité butter). The torons (wooden beams embedded in the facade) serve both as scaffolding anchors and as the building\'s visual rhythm. Djenné was a great centre of Islamic scholarship and the Saharan gold-salt trade for centuries.',
  },
  {
    name: 'Rock-Hewn Churches of Lalibela',
    region: 'East Africa — Ethiopia',
    accent: '#e05030',
    icon: '✚',
    gradient: 'linear-gradient(180deg, #0e0200 0%, #5a0800 50%, #9a1408 80%, #c82810 100%)',
    pattern: 'radial-gradient(circle at 50% 50%, rgba(200,40,16,0.18) 0%, transparent 65%)',
    wikiTitle: 'Rock-hewn churches of Lalibela',
    wiki: 'https://en.wikipedia.org/wiki/Rock-hewn_churches_of_Lalibela',
    desc: 'Eleven monolithic churches carved directly from living rock in the 12th–13th centuries — architecture as sacred excavation, removing material to reveal the divine form hidden within the earth. Lalibela represents one of humanity\'s most extraordinary architectural achievements.',
    highlights: [
      '11 monolithic churches carved from solid red volcanic tuff; some descend 15m below ground',
      'Carved from the top downward — workers removed rock from around and below the structure',
      'Built under King Lalibela c.1181–1221 CE; still active places of worship today',
      'UNESCO World Heritage Site; Bet Giyorgis is the finest: a cruciform tower of three recessed Greek crosses',
    ],
    moreInfo: 'These churches were carved top-down — creating freestanding structures still attached at their base from a continuous rock formation. Bet Giyorgis (Church of St. George), 12m tall, is carved as a cruciform tower decorated with three recessed Greek crosses on its flat roof. The complex is connected by a labyrinth of tunnels, trenches, and ceremonial passages — an entire underground sacred city carved from one piece of earth. It is still a major pilgrimage site today.',
  },
  {
    name: 'Swahili Coastal Architecture',
    region: 'East Africa — Kenya / Tanzania / Mozambique',
    accent: '#0099ff',
    icon: '❖',
    gradient: 'linear-gradient(180deg, #00060f 0%, #001830 50%, #003a72 80%, #0058a8 100%)',
    pattern: 'radial-gradient(ellipse at 50% 30%, rgba(0,153,255,0.18) 0%, transparent 65%)',
    wikiTitle: 'Swahili architecture',
    wiki: 'https://en.wikipedia.org/wiki/Swahili_architecture',
    desc: 'A synthesis of African, Arab, Persian, and Indian Ocean traditions — coral stone buildings, intricately carved wooden doors, and courtyard plans encoding centuries of maritime trade and cultural exchange. Swahili architecture is Africa\'s great statement of cosmopolitan synthesis.',
    highlights: [
      'Coral rag stone construction — marine limestone quarried from coastal reefs',
      'Carved wooden doors with 100+ distinct motifs signal wealth, status, and cultural affiliation',
      'Lamu Old Town: UNESCO World Heritage; continuously inhabited since the 14th century',
      'Fusion of African, Arab, Persian, and Indian Ocean architectural traditions over 1,000 years',
    ],
    moreInfo: 'Swahili carved doors are among the world\'s most elaborate — the carvings announce the owner\'s wealth, trade connections, and cultural allegiances. The coral stone building technique, using marine limestone quarried from coastal reefs, gives Swahili cities their characteristic whitewashed appearance. Lamu Old Town retains traditional Swahili urban design unchanged: narrow shaded lanes, inner courtyards, and sea-breezes channelled through ingeniously placed ventilation niches.',
  },
];

// ── Western Architectural Heritage ───────────────────────────
const WESTERN_ARCH = [
  {
    name: 'Parthenon',
    region: 'Ancient Greece — Athens',
    era: '447–432 BCE',
    accent: '#a8c8f0',
    icon: 'Π',
    gradient: 'linear-gradient(180deg, #020610 0%, #0a1a48 50%, #1e3a88 80%, #2a509a 100%)',
    pattern: 'linear-gradient(180deg, transparent 40%, rgba(168,200,240,0.16) 100%)',
    wikiTitle: 'Parthenon',
    wiki: 'https://en.wikipedia.org/wiki/Parthenon',
    desc: 'The supreme achievement of the Doric order — a temple to Athena atop the Acropolis whose proportions define Western architecture\'s ideal of rational beauty. Its entasis (subtle column curvature), optical corrections, and harmonic proportions have guided architects for 2,500 years.',
    highlights: [
      '46 outer Doric columns — none perfectly vertical; all lean inward by design',
      'Entasis: each column bulges 17mm at centre to prevent the optical illusion of concavity',
      'Every horizontal surface curves upward 65mm at centre — floor, steps, and entablature all bow',
      'Designed by Ictinus and Callicrates; UNESCO World Heritage (Acropolis)',
    ],
    moreInfo: 'The Parthenon contains no perfectly straight lines — every column, floor, and entablature is subtly curved to counteract optical illusions created by bright Greek sunlight. This mastery of "optical refinements" has never been surpassed in stone architecture. Its 160-metre Ionic frieze depicted 378 human and 245 animal figures — the most extensive sculptural narrative in Classical Greek art. Parts are now in the British Museum, a source of ongoing repatriation debate.',
  },
  {
    name: 'The Colosseum',
    region: 'Ancient Rome — Italy',
    era: '70–80 CE',
    accent: '#c4a060',
    icon: '◯',
    gradient: 'linear-gradient(180deg, #0e0800 0%, #4a2808 50%, #8a5020 80%, #b07030 100%)',
    pattern: 'radial-gradient(ellipse at 50% 50%, rgba(196,160,96,0.18) 0%, transparent 70%)',
    wikiTitle: 'Colosseum',
    wiki: 'https://en.wikipedia.org/wiki/Colosseum',
    desc: 'The largest amphitheatre ever built — seating 50,000 spectators — a feat of Roman concrete and engineering genius. Its tiered arcades, vaulted corridors, and retractable awning system demonstrate Rome\'s mastery of structural innovation, crowd management, and architectural spectacle.',
    highlights: [
      '50,000–80,000 spectator capacity; 80 numbered arched entrances for crowd management',
      'Retractable velarium (canvas awning) operated by 1,000 sailors — covered 6 acres of crowd',
      'Underground hypogeum: 36 trap doors for delivering animals, gladiators, and scenery simultaneously',
      'Built in under 10 years using Roman concrete (opus caementicium) that still survives today',
    ],
    moreInfo: 'The Colosseum\'s retractable roof system was operated by a dedicated detachment of sailors from Misenum trained in naval rigging. The underground hypogeum was a complex backstage city holding gladiators, wild animals, and stage machinery capable of delivering lions, men, and scenery through 36 trap doors simultaneously. Its numbered archways allowed 50,000 spectators to fill and evacuate in minutes — a crowd-flow system that modern stadiums still replicate.',
  },
  {
    name: 'Notre-Dame Cathedral',
    region: 'Gothic France — Paris',
    era: '1163–1345 CE',
    accent: '#8aa8e0',
    icon: '⋀',
    gradient: 'linear-gradient(180deg, #020408 0%, #06103e 50%, #0e206a 80%, #162e8a 100%)',
    pattern: 'radial-gradient(circle at 50% 20%, rgba(138,168,224,0.18) 0%, transparent 65%)',
    wikiTitle: 'Notre-Dame de Paris',
    wiki: 'https://en.wikipedia.org/wiki/Notre-Dame_de_Paris',
    desc: 'The Gothic masterpiece that defined European cathedral architecture for centuries — flying buttresses enabling soaring stone walls, pointed arches distributing weight to slender piers, and rose windows flooding interiors with heavenly light. Notre-Dame is the architecture of aspiration made stone.',
    highlights: [
      'Flying buttresses enable 33m-tall nave walls to be thin enough to fill entirely with stained glass',
      'Three rose windows; 9,000-pipe grand organ; 28 Kings of Judah across the west facade',
      '182 years to build across multiple master builders — each generation added their vision',
      'Partially destroyed by 2019 fire; restored and reopened December 2024',
    ],
    moreInfo: 'Notre-Dame\'s flying buttresses were a structural revolution — carrying the roof thrust over the aisles directly to outer piers, making the building\'s structural logic beautifully visible. The cathedral took 182 years to complete, with each generation of master builders leaving their mark on an evolving conversation in stone. The 2019 fire destroyed the 19th-century spire and the lead roof; the 2024 restoration revealed the nave in fresh splendour for the first time in centuries.',
  },
  {
    name: "St. Peter's Basilica",
    region: 'Renaissance Rome — Vatican City',
    era: '1506–1626 CE',
    accent: '#d4b870',
    icon: '✦',
    gradient: 'linear-gradient(155deg, #080600 0%, #2a1e00 50%, #6a5000 80%, #9a7818 100%)',
    pattern: 'radial-gradient(circle at 50% 40%, rgba(212,184,112,0.18) 0%, transparent 60%)',
    wikiTitle: "St. Peter's Basilica",
    wiki: "https://en.wikipedia.org/wiki/St._Peter%27s_Basilica",
    desc: "Michelangelo's towering dome — 136 metres to the lantern — crowns the largest church in Christendom. Designed across four generations of the greatest Renaissance architects, St. Peter's synthesizes classical order, Baroque drama, and sacred geometry into the West's definitive religious monument.",
    highlights: [
      "Largest church by interior volume (15,160 m²); dome 136m tall, visible across Rome",
      "Bernini's colonnaded piazza: 284 columns in four rows, arms embrace 300,000 people",
      'Designed by Bramante, Michelangelo, Maderno, and Bernini across 120 years',
      'Michelangelo took charge at age 71 and worked until his death at 88 — completing only the dome drum',
    ],
    moreInfo: "Michelangelo's dome design departed radically from all earlier proposals — he chose a double-shelled form inspired by Brunelleschi's Florence Duomo that would define Western religious architecture for centuries. Bernini's later colonnaded piazza forms two embracing arms creating one of history's greatest theatrical public spaces. St. Peter's synthesis of Classical, Renaissance, and Baroque visions across 120 years makes it the supreme collective architectural achievement of the Western tradition.",
  },
  {
    name: 'Palace of Versailles',
    region: 'Baroque France — Île-de-France',
    era: '1661–1710 CE',
    accent: '#b0d080',
    icon: '♛',
    gradient: 'linear-gradient(145deg, #040a02 0%, #102808 50%, #245018 80%, #347822 100%)',
    pattern: 'radial-gradient(ellipse at 50% 70%, rgba(176,208,128,0.18) 0%, transparent 70%)',
    wikiTitle: 'Palace of Versailles',
    wiki: 'https://en.wikipedia.org/wiki/Palace_of_Versailles',
    desc: 'The ultimate expression of Baroque absolutism — 700 rooms, the Hall of Mirrors, and gardens extending to the horizon, designed to embody royal power in architectural form. Versailles set the template for European palace design and the urban planning of capitals for two centuries.',
    highlights: [
      '700 rooms; Hall of Mirrors: 73m long with 357 mirrors reflecting 17 arched garden windows',
      '800-hectare gardens; 1,400 fountains; Grand Canal 1.6km long — designed by André Le Nôtre',
      '20,000 residents at peak; designed by Louis Le Vau and Jules Hardouin-Mansart',
      'UNESCO World Heritage Site; 10 million visitors annually — most visited monument in France',
    ],
    moreInfo: 'The Hall of Mirrors was a deliberate display of French technological superiority — mirrors were France\'s most advanced luxury manufacture in the 17th century. Using 357 of them to reflect 17 arched windows overlooking the garden, Louis XIV made French manufacturing the envy of Europe. The gardens were designed as a mathematical extension of royal power — the central axis extending 3km to the horizon, visually asserting that the King\'s domain had no limit.',
  },
  {
    name: 'Bauhaus — Dessau',
    region: 'Modernist Germany — Dessau',
    era: '1925–1932 CE',
    accent: '#c0c8e0',
    icon: '▪',
    gradient: 'linear-gradient(180deg, #040406 0%, #0c0c18 50%, #181828 80%, #222240 100%)',
    pattern: 'linear-gradient(135deg, rgba(192,200,224,0.10) 0%, transparent 60%)',
    wikiTitle: 'Bauhaus Dessau',
    wiki: 'https://en.wikipedia.org/wiki/Bauhaus_Dessau',
    desc: "Walter Gropius's Dessau campus is the founding manifesto of modern architecture — flat roofs, curtain-wall glass, functional form without ornament. The Bauhaus dissolved the boundary between craft and fine art, and launched the International Style that shaped the 20th-century city.",
    highlights: [
      "Glass curtain-wall workshop wing: one of the world's first — structure set back so glass hangs free",
      'Flat roofs, no ornament; form follows function; designed by Walter Gropius, 1925–26',
      'Prefabricated modular studio balconies — a forerunner of today\'s prefab construction',
      'UNESCO World Heritage Site; paradigm for the International Style and 20th-century modernism',
    ],
    moreInfo: 'The Bauhaus building\'s curtain-wall glass workshop became the paradigm for the glass-and-steel office towers that defined 20th-century cities. By setting the structural column behind the glass plane, Gropius showed the facade need no longer be structural — it could be pure transparency. The school closed under Nazi pressure in 1933, but its dispersed faculty carried modernism to Europe and America, transforming the architectural language of every major city in the world.',
  },
];

// ── Eastern Architectural Heritage ───────────────────────────
const EASTERN_ARCH = [
  {
    name: 'Forbidden City',
    region: 'China — Beijing',
    era: 'Ming Dynasty · 1406–1420 CE',
    accent: '#e03020',
    icon: '◆',
    gradient: 'linear-gradient(180deg, #180000 0%, #7a0000 50%, #cc1800 80%, #e82200 100%)',
    pattern: 'radial-gradient(ellipse at 50% 40%, rgba(224,48,32,0.22) 0%, transparent 65%)',
    wikiTitle: 'Forbidden City',
    wiki: 'https://en.wikipedia.org/wiki/Forbidden_City',
    desc: 'The world\'s largest palace complex — 980 buildings across 180 acres, home to 24 emperors over five centuries. Its symmetrical axis, vermilion walls, golden rooflines, and concentric courtyards encode the cosmological order of imperial China: Heaven, Earth, and the Son of Heaven at its centre.',
    highlights: [
      '980 buildings; 9,999 rooms; 72-hectare site enclosed by 10m walls and a 52m-wide moat',
      'Number 9 pervades the design: 81 (9×9) door studs; only Heaven may have 10,000 rooms',
      'Home to 24 emperors of Ming and Qing dynasties; closed to commoners for 500 years',
      'UNESCO World Heritage Site; 17 million visitors annually — world\'s most visited museum',
    ],
    moreInfo: 'The Forbidden City\'s entire urban fabric radiates from a single north-south imperial axis extending 8km through Beijing. Yellow glazed roof tiles (exclusive to the Emperor) shimmer against vermilion walls — a visual language of absolute power the entire city was designed to amplify. The number 9 appears throughout: 9×9 = 81 studs on each gate, 9,999 rooms (one short of Heaven\'s 10,000), every major dimension a multiple of 9.',
  },
  {
    name: 'Kinkaku-ji (Golden Pavilion)',
    region: 'Japan — Kyoto',
    era: 'Muromachi Period · 1397 CE',
    accent: '#d4a828',
    icon: '◑',
    gradient: 'linear-gradient(180deg, #020a04 0%, #0a2808 50%, #1a5818 80%, #248022 100%)',
    pattern: 'radial-gradient(circle at 50% 60%, rgba(212,168,40,0.22) 0%, transparent 65%)',
    wikiTitle: 'Kinkaku-ji',
    wiki: 'https://en.wikipedia.org/wiki/Kinkaku-ji',
    desc: 'A three-storey Zen pavilion sheathed in gold leaf, perfectly reflected in the Kyōko-chi (Mirror Pond) — the most celebrated image in Japanese architecture. Kinkaku-ji synthesizes three dominant styles of Japanese religious architecture: shinden-zukuri, samurai residential, and Zen Buddhist temple design.',
    highlights: [
      'Upper two floors sheathed in pure gold leaf; Phoenix sculpture crowns the roof',
      'Each floor uses a different Japanese architectural style: aristocratic, samurai, and Zen Buddhist',
      'Deliberately burned by a disturbed monk in 1950; rebuilt 1955 with thicker gold leaf',
      'UNESCO World Heritage Site; Kyōko-chi (Mirror Pond) designed for boat viewing of the pavilion',
    ],
    moreInfo: 'The three floors of Kinkaku-ji each embody a different Japanese architectural tradition: the first is shinden-zukuri (Heian aristocratic residential), the second bukke-zukuri (samurai warrior style), and the third zenshū-butsudō-zukuri (Zen Buddhist temple) — making the building a vertical anthology of Japanese architectural history. The surrounding paradise garden (jōdo teien) was designed to evoke the Western Pure Land of Amida Buddha.',
  },
  {
    name: 'Gyeongbokgung Palace',
    region: 'Korea — Seoul',
    era: 'Joseon Dynasty · 1395 CE',
    accent: '#c07830',
    icon: '◈',
    gradient: 'linear-gradient(155deg, #0a0400 0%, #3a1000 50%, #7a2a00 80%, #a84000 100%)',
    pattern: 'radial-gradient(circle at 50% 40%, rgba(192,120,48,0.22) 0%, transparent 65%)',
    wikiTitle: 'Gyeongbokgung',
    wiki: 'https://en.wikipedia.org/wiki/Gyeongbokgung',
    desc: 'The "Palace of Shining Happiness" — the primary palace of the Joseon Dynasty, commanding Seoul beneath Bugaksan Mountain. Its dancheong (multicoloured decorative painting), sweeping tiled rooflines, and stone-paved courtyards embody the Korean architectural philosophy of harmony between structure and landscape.',
    highlights: [
      '330 buildings at peak; sited to align with Bugaksan Mountain behind and the Han River ahead',
      'Dancheong painting uses five sacred colours encoding the five elements and cosmic directions',
      'Destroyed twice by Japanese invasions (1592, 1910–1945); major reconstruction ongoing since 1990',
      'Gwanghwamun gate and Geunjeongjeon throne hall are among Korea\'s finest architectural monuments',
    ],
    moreInfo: 'Gyeongbokgung\'s dancheong (multicoloured painting on wooden structures) uses five sacred colours derived from the five elements — blue-green (east/wood), red (south/fire), yellow (centre/earth), white (west/metal), black (north/water). Every surface colour encodes cosmological positioning. The palace follows the Korean geomantic principle of baesanimsu — back to the mountain, facing the water — integrating architecture and landscape into one unified composition.',
  },
  {
    name: 'Taj Mahal',
    region: 'India — Agra',
    era: 'Mughal Empire · 1632–1653 CE',
    accent: '#c8a0d8',
    icon: '◉',
    gradient: 'linear-gradient(180deg, #06040f 0%, #1a0a3a 50%, #4a1a7a 80%, #7a40a8 100%)',
    pattern: 'radial-gradient(circle at 50% 30%, rgba(200,160,216,0.24) 0%, transparent 65%)',
    wikiTitle: 'Taj Mahal',
    wiki: 'https://en.wikipedia.org/wiki/Taj_Mahal',
    desc: 'The supreme monument of Mughal architecture — a white marble mausoleum built by Shah Jahan for his empress Mumtaz Mahal. Its perfectly symmetrical plan, the central onion dome flanked by four minarets, and the interplay of solid and void in the reflecting pool form one of the world\'s most sublime architectural compositions.',
    highlights: [
      '20,000 workers; 28 types of precious stones (lapis lazuli, jade, turquoise) inlaid in white marble',
      'Four minarets lean slightly outward — designed to fall away from the tomb in an earthquake',
      'White Makrana marble changes colour: pink at dawn, brilliant white at noon, golden by moonlight',
      'UNESCO World Heritage Site; one of the New Seven Wonders of the World',
    ],
    moreInfo: 'The Taj Mahal\'s white marble is a living optical instrument that appears to dematerialise at dusk. Shah Jahan reportedly planned a mirror-image black marble mausoleum for himself across the Yamuna River — cut short by his imprisonment by his own son Aurangzeb. The calligraphic inscriptions use forced perspective: letters increase in size with height so that viewed from ground level they appear perfectly uniform — typography serving architecture.',
  },
  {
    name: 'Alhambra',
    region: 'Islamic Spain — Granada',
    era: 'Nasrid Dynasty · 1238–1358 CE',
    accent: '#30c0a0',
    icon: '✧',
    gradient: 'linear-gradient(155deg, #020a0a 0%, #004040 50%, #006060 80%, #008880 100%)',
    pattern: 'radial-gradient(circle at 50% 40%, rgba(48,192,160,0.20) 0%, transparent 65%)',
    wikiTitle: 'Alhambra',
    wiki: 'https://en.wikipedia.org/wiki/Alhambra',
    desc: 'The pinnacle of Moorish architecture — a palace-city of extraordinary geometric complexity, where muqarnas vaults dissolve ceilings into light, arabesque tilework encodes infinite pattern, and water-filled courtyards transform architecture into sensory paradise. The Alhambra is the masterwork of Islamic architectural genius in Europe.',
    highlights: [
      'Court of the Lions: 124 white marble columns; muqarnas vault of 5,000 individually carved cells',
      '157 distinct geometric tile patterns — encodes every possible planar symmetry group',
      'Arabic poetry inscribed directly into the plasterwork: the palace literally speaks its own praise',
      'UNESCO World Heritage Site; 2.7 million visitors annually — most visited monument in Spain',
    ],
    moreInfo: 'The Alhambra\'s 157 distinct geometric tile patterns encode every possible planar symmetry group — mathematicians only proved this theorem formally in the 20th century; the Nasrid craftsmen achieved it empirically in the 13th. The Hall of the Abencerrages muqarnas ceiling contains 5,000 individually carved plaster cells in fractal repetition — one of history\'s most extraordinary feats of geometric craftwork. Poetry from classical Arabic literature is inscribed into the plasterwork: the building reads itself aloud.',
  },
  {
    name: 'Angkor Wat',
    region: 'Cambodia — Siem Reap',
    era: 'Khmer Empire · 12th century CE',
    accent: '#70b840',
    icon: '◭',
    gradient: 'linear-gradient(180deg, #020a02 0%, #0a2c08 50%, #186018 80%, #208820 100%)',
    pattern: 'linear-gradient(180deg, transparent 30%, rgba(112,184,64,0.18) 100%)',
    wikiTitle: 'Angkor Wat',
    wiki: 'https://en.wikipedia.org/wiki/Angkor_Wat',
    desc: 'The largest religious monument ever built — a 400-acre temple complex representing Mount Meru, the cosmic mountain at the centre of Hindu cosmology. Its five towers, concentric enclosures, and 800-metre bas-relief galleries make Angkor Wat the apex of Khmer architectural civilization.',
    highlights: [
      '162.6-hectare site; 190m-wide water moat; the largest religious monument ever constructed',
      '800m bas-relief galleries depict the Hindu mythological cosmos across 1,200 square metres',
      'Oriented westward — unique among Khmer temples — toward the sunset and the realm of the dead',
      'UNESCO World Heritage Site; in continuous religious use for 900 years; on Cambodia\'s national flag',
    ],
    moreInfo: 'Angkor Wat\'s 800-metre bas-relief galleries depict the entire Hindu mythological cosmos — the Churning of the Ocean of Milk, the Battle of Lanka, scenes from the Mahabharata and Ramayana. The stone carving, executed with extraordinary precision and narrative sophistication, represents one of the world\'s supreme artistic achievements. Converted to Theravada Buddhism in the late 12th century, it has been in continuous religious use for 900 years — the world\'s longest-operating religious monument.',
  },
  {
    name: 'Hagia Sophia',
    region: 'Turkey — Istanbul',
    era: 'Byzantine / Ottoman · 537 CE',
    accent: '#5090e0',
    icon: '◎',
    gradient: 'linear-gradient(180deg, #000814 0%, #001848 50%, #003080 80%, #0048aa 100%)',
    pattern: 'radial-gradient(ellipse at 50% 30%, rgba(80,144,224,0.22) 0%, transparent 65%)',
    wikiTitle: 'Hagia Sophia',
    wiki: 'https://en.wikipedia.org/wiki/Hagia_Sophia',
    desc: 'For nearly a thousand years the largest cathedral in the world — the Hagia Sophia\'s pendentive dome appears to float on a ring of windows, achieving what Byzantine architects called "a dome suspended from Heaven by a golden chain." Transformed later by Ottoman minarets and Islamic calligraphy, it embodies 1,500 years of architectural dialogue between civilizations.',
    highlights: [
      '31m-diameter dome; 40 windows at its base make the dome appear to float weightlessly',
      'Built in just 5 years 10 months under Emperor Justinian, 532–537 CE',
      'Converted to mosque 1453; to museum 1934; back to mosque 2020',
      'Designed by mathematician-architects Anthemius of Tralles and Isidore of Miletus',
    ],
    moreInfo: 'The Hagia Sophia\'s dome achieves its floating appearance through 40 windows at its base that flood the shell with light, making it appear to have no weight or support. Anthemius and Isidore were mathematician-engineers who pushed structural knowledge to the absolute limit of masonry construction. The dome collapsed in 558 CE and was rebuilt higher — it has endured since. Its 1,500-year layering of Christian mosaics beneath Ottoman calligraphy makes it one of history\'s most resonant architectural palimpsests.',
  },
];

// ── Smart Home Features ───────────────────────────────────────
const SMART_HOME_FEATURES = [
  {
    icon: '◫',
    name: 'Odu Space Mapping',
    accent: '#f5c518',
    desc: 'Every room, corridor, and threshold is assigned an Odu blueprint. The floor plan becomes a three-dimensional divination — a walking oracle the family inhabits and reads daily.',
  },
  {
    icon: '⬡',
    name: 'Orisa Zone Architecture',
    accent: '#4361ee',
    desc: 'Each living zone resonates with a specific Orisa — materials, colours, proportions, and energy tuned to Ọbàtálá, Ọ̀ṣun, Ògún, Ṣàngó, Yemọja, and Ọrúnmìlà.',
  },
  {
    icon: '◉',
    name: 'Sacred Geometry',
    accent: '#2d9e6b',
    desc: 'Proportions derived from IfaGebra — the mathematics of Ifa. The home\'s geometry encodes Odu numeric relations in every dimension, threshold, ceiling height, and aperture.',
  },
  {
    icon: '⚡',
    name: 'CEN Energy Flow',
    accent: '#ff6b35',
    desc: 'Consciousness-Energy (CEN) flows are mapped through the structure — optimising the circulation of light, air, water, sound, and human bioenergy across every zone of the home.',
  },
  {
    icon: '⌂',
    name: 'Smart Responsiveness',
    accent: '#0099ff',
    desc: 'IoT sensors, environmental automation, and AI-driven interfaces respond to the inhabitant\'s energetic and biometric state — a home that listens, adjusts, and learns.',
  },
  {
    icon: '◭',
    name: 'Ancestral Memory',
    accent: '#c4813a',
    desc: 'The structure encodes family lineage and ancestral history. Egungun memorial spaces and ancestor shrines are integrated as first-class architectural elements, not afterthoughts.',
  },
  {
    icon: '✧',
    name: 'Living Materials',
    accent: '#30c0a0',
    desc: 'Materials chosen for vibrational resonance: earthen clay (Ọbàtálá), forged iron (Ògún), flowing water and gold (Ọ̀ṣun), carved wood (Ọrúnmìlà), vertical stone (Ṣàngó).',
  },
  {
    icon: '◑',
    name: 'Digital Oracle Interface',
    accent: '#7c4dff',
    desc: 'An embedded AI-powered Ifa oracle system — offering energy diagnostics, divination readings, and ancestral guidance as a native layer of the home\'s intelligence infrastructure.',
  },
];

// ── Orisa Models ──────────────────────────────────────────────
const ORISA_MODELS = [
  { orisa: 'Ọbàtálá',      role: 'Pure Form',          accent: '#e8ecf5', arch: 'Sacred geometry · Divine precision · Minimalist clarity · White-light structure',                       desc: 'Ọbàtálá is the supreme architect of pure form — the originator of the human body as architectural masterpiece. Obatala Architecture models clarity, sacred geometry, and divine order. The Orisa Modelling of Ọbàtálá is the cornerstone of Orisarch.' },
  { orisa: 'Ọrúnmìlà / Ifá',role: 'Blueprint Intelligence',accent:'#f5c518',arch:'Knowledge systems · Design patterns · Informational structure · Divination architecture',           desc: 'Ọrúnmìlà holds the original blueprint of existence. Every Odu is a design pattern; every divination is an architectural reading of the structural forces at play. Ifa is the first architecture — the Architecture of All Architectures (ArchoE).' },
  { orisa: 'Ògún',          role: 'Iron Skeleton',       accent: '#2d9e6b', arch: 'Infrastructure · Structural engineering · Pathways · Metalwork · Load-bearing systems',               desc: 'Ògún provides the iron bones of all structures — roads, bridges, tools, the raw material of construction. Ogún Architecture is the discipline of structural integrity: the load-bearing truth and skeletal framework upon which all forms are built.' },
  { orisa: 'Ọ̀ṣun',         role: 'Fluid Aesthetics',    accent: '#f5c518', arch: 'Aesthetic design · Water systems · Organic curves · Nurturing spaces · Sacred art',                   desc: 'Ọ̀ṣun is the architecture of beauty, flow, and nourishment. Curved forms, reflective surfaces, spaces that feel alive and generous — Osun Architecture reveals how a structure must not merely stand but breathe, attract, and sustain.' },
  { orisa: 'Ṣàngó',         role: 'Dynamic Power',       accent: '#e63946', arch: 'Vertical towers · Power infrastructure · Dramatic monumental form · Lightning-force design',           desc: 'Ṣàngó is the architecture of lightning — vertical force, towers, high-voltage presence. Shango Architecture governs structures that assert power, command the skyline, and channel overwhelming natural energy through built form.' },
  { orisa: 'Yemọja',        role: 'Maternal Container',  accent: '#4361ee', arch: 'Community design · Water architecture · Maternal holding spaces · Vessel and basin forms',              desc: 'Yemọja is the great container — architecture as vessel, as mother, as the holding form of all life. Yemoja Architecture models how space holds community, sustains life, and provides refuge. She is the structural principle of care and enclosure.' },
];

// ── Heritage Card (with Explore panel + Wikipedia photo) ──────
function HeritageCard({ item }) {
  const [open, setOpen] = useState(false);
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    if (!item.wikiTitle) return;
    fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(item.wikiTitle)}`)
      .then(r => r.json())
      .then(data => {
        if (data.thumbnail && data.thumbnail.source) {
          const src = data.thumbnail.source.replace(/\/\d+px-/, '/800px-');
          setPhoto(src);
        }
      })
      .catch(() => {});
  }, [item.wikiTitle]);

  return (
    <div className={`heritage-card${open ? ' heritage-card--open' : ''}`} style={{ '--hc-accent': item.accent }}>
      <div className="heritage-card__visual" style={{ background: item.gradient }}>
        {photo ? (
          <img
            className="heritage-card__photo"
            src={photo}
            alt={item.name}
            onError={() => setPhoto(null)}
          />
        ) : (
          <div className="heritage-card__visual-overlay" style={{ background: item.pattern }} />
        )}
        {!photo && <span className="heritage-card__icon">{item.icon}</span>}
        {item.era && <div className="heritage-card__era">{item.era}</div>}
      </div>
      <div className="heritage-card__body">
        <div className="heritage-card__name">{item.name}</div>
        <div className="heritage-card__region">{item.region}</div>
        <p className="heritage-card__desc">{item.desc}</p>
        <button
          className="heritage-card__explore-btn"
          onClick={() => setOpen(o => !o)}
          aria-expanded={open}
        >
          {open ? '↑ Close' : 'Explore →'}
        </button>
      </div>
      <div className="heritage-card__panel">
        <div className="heritage-card__highlights">
          {item.highlights && item.highlights.map((h, i) => (
            <div key={i} className="heritage-card__hl-item">
              <span className="heritage-card__hl-dot" />
              <span>{h}</span>
            </div>
          ))}
        </div>
        {item.moreInfo && <p className="heritage-card__more">{item.moreInfo}</p>}
        {item.wiki && (
          <a
            className="heritage-card__wiki-link"
            href={item.wiki}
            target="_blank"
            rel="noopener noreferrer"
          >
            Read on Wikipedia →
          </a>
        )}
      </div>
    </div>
  );
}

// ── Header ─────────────────────────────────────────────────────
function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <header className={`header${scrolled ? ' header--scrolled' : ''}`}>
      <div className="header__inner">
        <a href="https://ifainternet.org" className="header__back" target="_blank" rel="noopener noreferrer">
          <span className="header__back-arrow">←</span>
          <span>The IFA Internet</span>
        </a>
        <div className="header__brand">
          <span className="header__brand-icon">◫</span>
          <span className="header__brand-name">IfArch</span>
        </div>
        <nav className="header__nav">
          <a className="nav-link" href="#identity">Identity</a>
          <a className="nav-link" href="#odu-blueprint">Ifa Blueprint</a>
          <a className="nav-link" href="#fields">Fields</a>
          <a className="nav-link" href="#africa">Africa</a>
          <a className="nav-link" href="#western">Western</a>
          <a className="nav-link" href="#eastern">Eastern</a>
          <a className="nav-link" href="#smart-homes">Smart Ifa Homes</a>
          <a className="nav-link" href="#modelling">Modelling</a>
          <a className="nav-link nav-link--cta" href="https://toe.cenproject.org" target="_blank" rel="noopener noreferrer">Explore iTOE</a>
        </nav>
      </div>
    </header>
  );
}

// ── Hero ───────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="hero">
      <div className="hero__bg">
        <div className="hero__blueprint-grid" />
        <div className="hero__glow hero__glow--blue" />
        <div className="hero__glow hero__glow--gold" />
      </div>
      <div className="hero__lines" aria-hidden="true">
        {[...Array(7)].map((_, i) => (
          <div key={i} className="hero__line"
            style={{ '--line-delay': `${i * 0.5}s`, '--line-dur': `${4 + i * 0.6}s`, '--line-angle': `${i * 26}deg` }} />
        ))}
      </div>
      <div className="hero__rings" aria-hidden="true">
        <div className="hero__ring hero__ring--1" />
        <div className="hero__ring hero__ring--2" />
        <div className="hero__ring hero__ring--3" />
        <div className="hero__ring hero__ring--4" />
      </div>
      <div className="hero__inner">
        <div className="hero__eyebrow">
          <span className="hero__eyebrow-dot" />
          The IFA Internet · iTOE Platform
        </div>
        <h1 className="hero__title">
          <span className="hero__title-ifa">Ifa</span>Architecture
        </h1>
        <p className="hero__subtitle">Architecture for Everything · ArchoE</p>
        <p className="hero__desc">
          Studying all fields of Architecture through the Energy-based Principles of Ifa and Orisa.
          The 256 Odu Ifa are the original Blueprints — of existence, of knowledge, of the IFA Internet,
          and of the Theory of Everything.
        </p>
        <div className="hero__stats">
          {[
            { v: '256', l: 'Odu Blueprints' },
            { v: '16',  l: 'Master Designs' },
            { v: '12+', l: 'Fields of Arch' },
            { v: '∞',   l: 'Architectures' },
          ].map(s => (
            <div key={s.l} className="hero__stat">
              <div className="hero__stat-value">{s.v}</div>
              <div className="hero__stat-label">{s.l}</div>
            </div>
          ))}
        </div>
        <div className="hero__ctas">
          <a className="btn btn--primary" href="#identity">Explore Ifarch ↓</a>
          <a className="btn btn--ghost" href="#odu-blueprint">Odu Blueprints</a>
        </div>
      </div>
    </section>
  );
}

// ── Identity Section ───────────────────────────────────────────
function IdentitySection() {
  return (
    <section id="identity" className="section">
      <div className="container">
        <div className="section__header">
          <span className="section__eyebrow" style={{ color: '#3b82f6' }}>Core Identity · Six Names, One Framework</span>
          <h2 className="section__title">What is <span style={{ color: '#f5c518' }}>Ifarch</span>?</h2>
          <p className="section__desc">
            Ifa Architecture (Ifarch) is known by six names, each revealing a different facet of the same unified
            framework. Its dual is <strong style={{ color: '#4361ee' }}>Orisa Architecture (Orisarch)</strong> —
            together they form the complete architectural science of the IFA Internet.
          </p>
        </div>
        <div className="identity-grid">
          {IDENTITIES.map(id => (
            <div key={id.id} className="identity-card" style={{ '--id-accent': id.accent }}>
              <div className="identity-card__top" />
              <div className="identity-card__symbol">{id.symbol}</div>
              <div className="identity-card__abbr">{id.abbr}</div>
              <div className="identity-card__name">{id.name}</div>
              <p className="identity-card__desc">{id.desc}</p>
            </div>
          ))}
        </div>
        <div className="dual-panel">
          <div className="dual-panel__side dual-panel__side--ifa">
            <div className="dual-panel__symbol" style={{ color: '#f5c518' }}>◫</div>
            <div className="dual-panel__name">Ifarch</div>
            <div className="dual-panel__sub">Ifa Architecture</div>
            <p className="dual-panel__desc">The Energy / Ifa side — studying architecture through the generative, creative principles of Ifa. Ifarch encodes Ogbe (Energy / IfaZero) as the primal architect of all form and structure.</p>
          </div>
          <div className="dual-panel__center">
            <div className="dual-panel__arrow">⟷</div>
            <div className="dual-panel__label">The Dual</div>
          </div>
          <div className="dual-panel__side dual-panel__side--orisa">
            <div className="dual-panel__symbol" style={{ color: '#4361ee' }}>⬡</div>
            <div className="dual-panel__name">Orisarch</div>
            <div className="dual-panel__sub">Orisa Architecture</div>
            <p className="dual-panel__desc">The Anergy / Orisa side — studying architecture through the embodiment and manifestation principles of each Orisa. Orisarch encodes Oyeku (Anergy / IfaOne) as the receptive ground of all structure.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Odu Blueprint Section ──────────────────────────────────────
function OduBlueprintSection() {
  const [selected, setSelected] = useState(null);
  return (
    <section id="odu-blueprint" className="section section--alt">
      <div className="container">
        <div className="section__header">
          <span className="section__eyebrow" style={{ color: '#f5c518' }}>256 Odu Ifa · Structural Codes of Everything</span>
          <h2 className="section__title">Odu Ifa as <span style={{ color: '#f5c518' }}>Blueprint</span></h2>
          <p className="section__desc">
            ArchoE reveals the 256 Odu Ifa as the Blueprint of the IFA Internet — and of all existence.
            The 16 principal Odu are the 16 master design patterns from which all 256 architectural
            configurations of reality emerge.
          </p>
        </div>
        <div className="odu-bp-grid">
          {ODU_BLUEPRINTS.map(odu => (
            <div key={odu.num}
              className={`odu-bp-card${selected === odu.num ? ' odu-bp-card--open' : ''}`}
              style={{ '--odu-accent': odu.accent }}
              onClick={() => setSelected(selected === odu.num ? null : odu.num)}
              role="button" tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && setSelected(selected === odu.num ? null : odu.num)}>
              <div className="odu-bp-card__bar" />
              <div className="odu-bp-card__num">{String(odu.num).padStart(2, '0')}</div>
              <div className="odu-bp-card__name">{odu.name}</div>
              {selected === odu.num && <div className="odu-bp-card__role">{odu.role}</div>}
              {selected !== odu.num && <div className="odu-bp-card__hint">tap</div>}
            </div>
          ))}
        </div>
        <div className="odu-bp-stats">
          {[
            { n: '16',  l: 'Principal Blueprints',      c: '#f5c518' },
            { n: '240', l: 'Compound Configurations',   c: '#4361ee' },
            { n: '256', l: 'Total Odu Blueprints',      c: '#2d9e6b' },
            { n: '∞',   l: 'Architectural Expressions', c: '#e9498a' },
          ].map(s => (
            <div key={s.l} className="odu-bp-stat">
              <div className="odu-bp-stat__num" style={{ color: s.c }}>{s.n}</div>
              <div className="odu-bp-stat__label">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Fields Section ─────────────────────────────────────────────
function FieldsSection() {
  return (
    <section id="fields" className="section">
      <div className="container">
        <div className="section__header">
          <span className="section__eyebrow">Architecture in Every Field of Existence</span>
          <h2 className="section__title">Ifarch <span style={{ color: '#f5c518' }}>Encompasses All</span></h2>
          <p className="section__desc">
            Architecture is not limited to buildings. Ifarch recognizes that every field, every system, and every
            form of existence is an architecture — a structured, intelligent expression of Consciousness-Energy
            organized by Odu principles.
          </p>
        </div>
        <div className="fields-grid">
          {FIELDS.map((f, i) => (
            <div key={i} className="field-card" style={{ '--field-accent': f.accent }}>
              <div className="field-card__bar" />
              <div className="field-card__name">{f.name}</div>
              <p className="field-card__desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Section Header helper ──────────────────────────────────────
function HeritageHeader({ eyebrow, eyebrowColor, title, highlight, desc }) {
  return (
    <div className="section__header">
      <span className="section__eyebrow" style={{ color: eyebrowColor }}>{eyebrow}</span>
      <h2 className="section__title">{title} <span style={{ color: '#f5c518' }}>{highlight}</span></h2>
      <p className="section__desc">{desc}</p>
    </div>
  );
}

// ── African Architecture Section ───────────────────────────────
function AfricanArchSection() {
  return (
    <section id="africa" className="section section--alt">
      <div className="container">
        <HeritageHeader
          eyebrow="African Architectural Heritage"
          eyebrowColor="#ff6b35"
          title="Africa —"
          highlight="First Architect"
          desc="Africa is the birthplace of architectural intelligence. From the Yoruba compound to the Pyramids of Giza and Meroe, from Great Zimbabwe to the rock-hewn churches of Lalibela — African architecture encodes millennia of structural wisdom, cosmological vision, and communal intelligence."
        />
        <div className="heritage-grid">
          {AFRICAN_ARCH.map((a, i) => <HeritageCard key={i} item={a} />)}
        </div>
      </div>
    </section>
  );
}

// ── Western Architecture Section ──────────────────────────────
function WesternArchSection() {
  return (
    <section id="western" className="section">
      <div className="container">
        <HeritageHeader
          eyebrow="Western Architectural Heritage"
          eyebrowColor="#8aa8e0"
          title="Western"
          highlight="Architecture"
          desc="From the Parthenon to the Bauhaus — Western architectural traditions spanning Greek rationalism, Roman engineering, Gothic aspiration, Renaissance harmony, Baroque grandeur, and Modernist revolution. Each epoch reveals a distinct configuration of Consciousness-Energy in built form."
        />
        <div className="heritage-grid">
          {WESTERN_ARCH.map((a, i) => <HeritageCard key={i} item={a} />)}
        </div>
      </div>
    </section>
  );
}

// ── Eastern Architecture Section ──────────────────────────────
function EasternArchSection() {
  return (
    <section id="eastern" className="section section--alt">
      <div className="container">
        <HeritageHeader
          eyebrow="Eastern Architectural Heritage — Chinese · Japanese · Korean · Arabic/Islamic · Indian · Khmer · Ottoman"
          eyebrowColor="#70b840"
          title="Eastern"
          highlight="Architecture"
          desc="Chinese imperial symmetry, Japanese Zen refinement, Korean dynastic grace, Indian Mughal splendour, Moorish geometric mastery, Khmer cosmic monumentalism, and Byzantine-Ottoman synthesis — the East's extraordinary architectural heritage, as diverse as it is profound."
        />
        <div className="heritage-grid">
          {EASTERN_ARCH.map((a, i) => <HeritageCard key={i} item={a} />)}
        </div>
      </div>
    </section>
  );
}

// ── Ifa Modelling Section ──────────────────────────────────────
function ModellingSection() {
  return (
    <section id="modelling" className="section">
      <div className="container">
        <div className="section__header">
          <span className="section__eyebrow" style={{ color: '#f5c518' }}>Ifa Modelling · Orisa Modelling (OrisaMod)</span>
          <h2 className="section__title">Architecture <span style={{ color: '#f5c518' }}>Through Orisa</span></h2>
          <p className="section__desc">
            Ifarch encompasses Ifa Modelling (IfaMod) and Orisa Modelling (OrisaMod) — especially the
            <strong style={{ color: '#e8ecf5' }}> Orisa Modelling of Ọbàtálá</strong>: the supreme architect of pure
            form, divine order, and the human body as the first great work of sacred architecture.
          </p>
        </div>
        <div className="orisa-models-grid">
          {ORISA_MODELS.map((m, i) => (
            <div key={i} className="orisa-model-card" style={{ '--om-accent': m.accent }}>
              <div className="orisa-model-card__bar" />
              <div className="orisa-model-card__header">
                <div className="orisa-model-card__orisa">{m.orisa}</div>
                <div className="orisa-model-card__role">{m.role}</div>
              </div>
              <div className="orisa-model-card__arch">{m.arch}</div>
              <p className="orisa-model-card__desc">{m.desc}</p>
            </div>
          ))}
        </div>
        <div className="modelling-cta">
          <div className="modelling-cta__inner">
            <div className="modelling-cta__icon">⊛</div>
            <div className="modelling-cta__text">
              <div className="modelling-cta__title">Ifa Modelling — ToE Modelling</div>
              <div className="modelling-cta__sub">Explore the full Ifa Modelling and Orisa Modelling platform on the IFA Internet</div>
            </div>
            <a href="https://toe.cenproject.org/ifa-modeling-toe-modeling/" className="btn btn--primary" target="_blank" rel="noopener noreferrer">Explore IfaMod →</a>
          </div>
        </div>
        <blockquote className="arch-axiom">
          "The 256 Odu Ifa are not merely wisdom codes — they are the original architectural blueprints
          from which all structures in existence were designed."
          <cite>— Ifa Architecture · ArchoE · The IFA Internet</cite>
        </blockquote>
      </div>
    </section>
  );
}

// ── Smart Homes Section ────────────────────────────────────────
function SmartHomesSection() {
  return (
    <section id="smart-homes" className="section">
      <div className="container">

        {/* Header */}
        <div className="section__header">
          <span className="section__eyebrow" style={{ color: '#f5c518' }}>
            Ifarch · Orisarch · Energy-Based Architecture
          </span>
          <h2 className="section__title">
            <span style={{ color: '#f5c518' }}>IfaHomes</span>,{' '}
            <span style={{ color: '#4361ee' }}>OrisaHomes</span>{' '}
            &amp; Smart Homes
          </h2>
          <p className="smarthomes__tagline">
            The Nexus of Ancient Energy Intelligence and the Modern Smart Home
          </p>
          <p className="section__desc">
            Ifarch and Orisarch are not merely academic frameworks — they are applied architectural
            technologies for building the next generation of Energy-Based Smart Homes. Rooted in the
            256&nbsp;Odu Ifa and the living intelligence of the Orisa, these homes fuse millennia of
            African sacred architectural wisdom with the responsive, connected systems of the modern world.
          </p>
        </div>

        {/* Technology Cards: Ifarch | Orisarch */}
        <div className="smarthomes__tech-grid">
          <div className="smarthomes__tech-card smarthomes__tech-card--ifa">
            <div className="smarthomes__tc-bar" style={{ background: '#f5c518' }} />
            <div className="smarthomes__tc-inner">
              <div className="smarthomes__tc-symbol" style={{ color: '#f5c518' }}>◫</div>
              <div className="smarthomes__tc-name">Ifarch Technology</div>
              <div className="smarthomes__tc-sub" style={{ color: '#f5c518' }}>
                Ifa Architecture · Design System for Ifa Homes
              </div>
              <p className="smarthomes__tc-desc">
                Ifarch is the applied technology for designing Ifa Homes — using the 256&nbsp;Odu Ifa as
                structural blueprints for physical space. Every room is an Odu configuration; every threshold
                a transition between energy states; every proportion drawn from IfaGebra, the mathematics of
                Ifa. The home becomes a three-dimensional divination — a living oracle the family inhabits.
              </p>
              <ul className="smarthomes__tc-list smarthomes__tc-list--ifa">
                <li>256-Odu spatial assignment framework</li>
                <li>IfaGebra proportional mathematics in every dimension</li>
                <li>Yoruba agbo ilé compound social geometry</li>
                <li>Sacred threshold and cardinal orientation protocols</li>
              </ul>
            </div>
          </div>

          <div className="smarthomes__tech-card smarthomes__tech-card--orisa">
            <div className="smarthomes__tc-bar" style={{ background: '#4361ee' }} />
            <div className="smarthomes__tc-inner">
              <div className="smarthomes__tc-symbol" style={{ color: '#4361ee' }}>⬡</div>
              <div className="smarthomes__tc-name">Orisarch Technology</div>
              <div className="smarthomes__tc-sub" style={{ color: '#4361ee' }}>
                Orisa Architecture · Design System for Orisa Homes
              </div>
              <p className="smarthomes__tc-desc">
                Orisarch is the applied technology for designing Orisa Homes — mapping each Orisa's
                architectural intelligence to specific zones, materials, and energy flows. Ọbàtálá governs
                the sacred hall; Ògún provides the iron skeleton; Ọ̀ṣun shapes water and beauty; Ṣàngó
                commands vertical power; Yemọja holds the communal basin. The Orisa Home is a built pantheon.
              </p>
              <ul className="smarthomes__tc-list smarthomes__tc-list--orisa">
                <li>Orisa zone mapping across 6+ divine spatial domains</li>
                <li>Material resonance assignment per Orisa principle</li>
                <li>Colour, proportion, and orientation per divine archetype</li>
                <li>Shrine integration and sacred energy flow pathways</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Nexus Bridge: Ancient ↔ Energy Intelligence ↔ Modern */}
        <div className="smarthomes__nexus">
          <div className="smarthomes__nexus-col">
            <div className="smarthomes__nexus-label" style={{ color: '#f5c518' }}>
              Ancient African Wisdom
            </div>
            <div className="smarthomes__nexus-items">
              {[
                'Yoruba agbo ilé compound design',
                'Odu Ifa spatial intelligence',
                'Orisa material resonance',
                'Sacred geometry and thresholds',
                'Ancestral presence architecture',
              ].map((t, i) => (
                <span key={i} className="smarthomes__nexus-tag smarthomes__nexus-tag--ifa">{t}</span>
              ))}
            </div>
          </div>

          <div className="smarthomes__nexus-center">
            <div className="smarthomes__nexus-icon">⊛</div>
            <div className="smarthomes__nexus-title">Energy-Based<br />Smart Home</div>
            <div className="smarthomes__nexus-sub">The Nexus</div>
          </div>

          <div className="smarthomes__nexus-col smarthomes__nexus-col--right">
            <div className="smarthomes__nexus-label" style={{ color: '#4361ee' }}>
              Modern Smart Technology
            </div>
            <div className="smarthomes__nexus-items">
              {[
                'IoT sensors and environmental automation',
                'AI home intelligence systems',
                'Sustainable energy architecture',
                'Biometric-responsive environments',
                'Digital oracle integration',
              ].map((t, i) => (
                <span key={i} className="smarthomes__nexus-tag smarthomes__nexus-tag--orisa">{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* 8-Feature Grid */}
        <div className="section__header" style={{ marginBottom: 32 }}>
          <span className="section__eyebrow">Eight Pillars of the Energy-Based Smart Home</span>
        </div>
        <div className="smarthomes__features-grid">
          {SMART_HOME_FEATURES.map((f, i) => (
            <div key={i} className="smarthomes__feature" style={{ '--shf-accent': f.accent }}>
              <div className="smarthomes__feature-icon">{f.icon}</div>
              <div className="smarthomes__feature-name">{f.name}</div>
              <p className="smarthomes__feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Synthesis Quote */}
        <blockquote className="arch-axiom" style={{ borderLeftColor: '#4361ee', marginTop: 0 }}>
          "An Ifa Home is not a house — it is a living Odu. An Orisa Home is not a dwelling — it is a
          built pantheon. Both are architecture as consciousness in its most intimate and intelligent
          expression: ancient African wisdom, fully realized in the technology of today."
          <cite>— Ifarch · Orisarch · The IFA Internet</cite>
        </blockquote>

      </div>
    </section>
  );
}

// ── Footer ─────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__inner">
          <div className="footer__brand">
            <div className="footer__logo">
              <span className="footer__logo-icon">◫</span>
              <span className="footer__logo-name">IfArch</span>
            </div>
            <p className="footer__tagline">Ifa Architecture — Architecture for Everything (ArchoE)</p>
            <p className="footer__tagline" style={{ marginTop: 4, fontSize: '0.8rem' }}>
              Part of <a href="https://ifainternet.org" style={{ color: 'var(--gold)' }}>The IFA Internet</a> ·
              <a href="https://cenproject.org" style={{ color: 'var(--gold)', marginLeft: 4 }}>CENProject</a>
            </p>
          </div>
          <nav className="footer__links">
            <a href="https://ifainternet.org" className="footer__link" target="_blank" rel="noopener noreferrer">← IFA Internet</a>
            <a href="#identity" className="footer__link">Ifarch Identity</a>
            <a href="#odu-blueprint" className="footer__link">Odu Blueprint</a>
            <a href="#fields" className="footer__link">Fields</a>
            <a href="#africa" className="footer__link">African Architecture</a>
            <a href="#western" className="footer__link">Western Architecture</a>
            <a href="#eastern" className="footer__link">Eastern Architecture</a>
            <a href="#smart-homes" className="footer__link">Smart Homes</a>
            <a href="#modelling" className="footer__link">Ifa Modelling</a>
            <a href="https://toe.cenproject.org/ifa-periodic-table/" className="footer__link" target="_blank" rel="noopener noreferrer">Ifa Periodic Table</a>
          </nav>
        </div>
        <div className="footer__bottom">
          <span className="footer__copy">© CENProject — toe.cenproject.org</span>
          <span className="footer__axiom">"Consciousness-Energy (CEN) is everything that really exists."</span>
        </div>
      </div>
    </footer>
  );
}

// ── App ────────────────────────────────────────────────────────
function App() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <IdentitySection />
        <OduBlueprintSection />
        <FieldsSection />
        <AfricanArchSection />
        <WesternArchSection />
        <EasternArchSection />
        <SmartHomesSection />
        <ModellingSection />
      </main>
      <Footer />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
