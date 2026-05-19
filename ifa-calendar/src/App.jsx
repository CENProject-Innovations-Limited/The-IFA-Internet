/* ─────────────────────────────────────────────────────────────
   IfaCalendar — World Calendar Explorer
   The IFA Internet · CENProject · toe.cenproject.org
───────────────────────────────────────────────────────────── */

const { useState, useEffect, useRef } = React;

// ── Calendar data ─────────────────────────────────────────────
const CALENDARS = [
  {
    id: 'kojoda',
    name: 'Kọ́jọ́dá',
    subtitle: 'Ètò Ìkajọ́ Ìṣẹ̀ṣe — Yoruba Calendar System',
    region: 'West Africa',
    origin: 'Ancient Yoruba Civilization — Ilé-Ifẹ̀',
    accent: '#f5c518',
    symbol: '◉',
    type: 'Lunar / Ritual',
    epoch: 'Year 10,068 begins June 3, 2026',
    status: 'Living Tradition',
    statusColor: '#2d9e6b',
    featured: true,
    intro: 'Kọ́jọ́dá — formally known as Ètò Ìkajọ́ Ìṣẹ̀ṣe (the Ìṣẹ̀ṣe Calendar System) — is the traditional lunar calendar of the Yoruba people. Its new year begins on June 3 each year, coinciding with the Ifá festival and the new yam harvest. As of June 3, 2026, Kọ́jọ́dá enters the year 10,068 — one of the oldest calendar traditions in continuous living use.',
    history: 'The Kọ́jọ́dá is one of the oldest time-keeping systems in the world, rooted in the Ifa divination corpus at Ilé-Ifẹ̀. The 256 Odu Ifa encode not only wisdom but time itself — a framework for measuring and understanding cycles of existence. In the 19th century, the 7-day Gregorian week was adopted alongside the traditional system; the Yoruba call it Ọ̀sẹ̀ Ìgbàlódé (the Modern Week). Both systems coexist in Yoruba life today: the 4-day sacred week (Ọ̀sẹ̀ Ìṣẹ̀ṣe) for ritual and community life, and the 7-day Gregorian week for civil affairs.',
    structure: 'Kọ́jọ́dá comprises 13 months of 28 days each — totaling 364 days organized into 91 weeks. Each week (Ọ̀sẹ̀ Ìṣẹ̀ṣe) has 4 sacred days, each governed by a principal Orisa: Ọjọ́ Ọbàtálá, Ọjọ́ Orunmila/Ifá, Ọjọ́ Ògún, and Ọjọ́ Ṣàngó. The 12 named months run from June (Òkúdù) through May (Èbìbí), with a 13th intercalary month completing the lunar cycle. The new year begins June 3, linked to the Ifá festival and new yam harvest.',
    modern: 'Kọ́jọ́dá is actively celebrated by Yoruba communities across Nigeria, Benin, Brazil (Candomblé), Cuba (Lucumí/Santería), and the global Yoruba diaspora. The new year falls on June 3 — a time of Ifá festivals, ancestral veneration, and community renewal. As of June 3, 2026, Kọ́jọ́dá enters year 10,068, affirming an extraordinary continuity of culture and time-consciousness. The Ifa World Congress and Orisa communities worldwide formally observe Kọ́jọ́dá as the sacred new year.',
    facts: [
      'New Year: June 3 — Kọ́jọ́dá begins annually',
      'Year 10,068 commences June 3, 2026',
      '13 months × 28 days = 364 days per year',
      '91 weeks of 4 sacred days each (Ọ̀sẹ̀)',
      '4-day week: Ọbàtálá · Orunmila · Ògún · Ṣàngó',
      'Coexists with 7-day Gregorian (adopted 19th c.)',
    ],
    orisa: ['Ọrúnmìlà', 'Ọ̀ṣun', 'Ògún', 'Ọbàtálá', 'Ṣàngó', 'Yemọja'],
  },
  {
    id: 'gregorian',
    name: 'Gregorian Calendar',
    subtitle: 'International Civil Standard',
    region: 'Global',
    origin: 'Rome / Vatican',
    accent: '#4361ee',
    symbol: '✦',
    type: 'Solar',
    epoch: '1 AD (Anno Domini)',
    status: 'Global Standard',
    statusColor: '#4361ee',
    featured: false,
    intro: 'The most widely used civil calendar on Earth, introduced by Pope Gregory XIII in 1582 as a refinement of the Julian calendar. It corrected accumulated drift against the solar year.',
    history: 'Julius Caesar introduced the Julian calendar in 46 BC — a 365-day solar calendar with a leap year every four years. Over 16 centuries this accumulated an 11-minute annual error, drifting 10 days by the 16th century. Pope Gregory XIII, guided by astronomer Aloysius Lilius and mathematician Christopher Clavius, reformed the system: century years are leap years only if divisible by 400. Catholic nations adopted it first; Protestant and Eastern nations followed over subsequent centuries. Britain and its colonies adopted it in 1752; Russia after the 1917 revolution.',
    structure: '12 months; 365 days in a common year, 366 in a leap year. Leap years occur every 4 years, except century years unless divisible by 400. The year begins January 1.',
    modern: 'Used universally as the international civil and commercial calendar. All global timekeeping, international law, finance, and communications operate on the Gregorian system. Many communities maintain their traditional calendars alongside it.',
    facts: [
      'Introduced October 15, 1582',
      '365 days; 366 in leap years',
      'Error of only 1 day in ~3,236 years',
      '12 months of 28–31 days',
      'Replaced the Julian calendar',
      'Used in nearly every nation',
    ],
  },
  {
    id: 'islamic',
    name: 'Islamic / Hijri Calendar',
    subtitle: 'Lunar Calendar of Islam',
    region: 'Global Muslim Communities',
    origin: 'Arabia — 622 CE',
    accent: '#2d9e6b',
    symbol: '☽',
    type: 'Purely Lunar',
    epoch: '622 CE — The Hijra of Prophet Muhammad',
    status: 'Living Tradition',
    statusColor: '#2d9e6b',
    featured: false,
    intro: 'A purely lunar calendar of 12 months used by 1.8 billion Muslims worldwide for religious observances including Ramadan, Eid al-Fitr, and Eid al-Adha.',
    history: 'The Islamic calendar was formalized by Caliph Umar ibn al-Khattab in 638 CE, dating from the Hijra — the migration of Prophet Muhammad from Mecca to Medina in 622 CE. Pre-Islamic Arabia used a lunisolar calendar with intercalary months; Islam prohibited intercalation (Quran 9:36–37), establishing the pure lunar system. The calendar was instrumental in unifying the early Islamic world across vast territories.',
    structure: '12 lunar months of 29 or 30 days each. The year is approximately 354 days — 11 days shorter than the solar year. No leap months; religious dates thus migrate through all seasons over a 33-year cycle. Months begin with the sighting of the crescent moon.',
    modern: 'Used by Muslims everywhere for determining Ramadan, Hajj, and other religious observances. Many Muslim-majority nations use it alongside the Gregorian calendar. Saudi Arabia, Iran (which uses its own Persian calendar), and others maintain dual systems.',
    facts: [
      'Begins from 622 CE (Hijra)',
      '12 lunar months per year',
      '~354 days — 11 less than solar year',
      'Religious dates cycle through all seasons',
      'Ramadan, Eid, Hajj determined by it',
      '1.8 billion Muslims observe it',
    ],
  },
  {
    id: 'hebrew',
    name: 'Hebrew Calendar',
    subtitle: 'Jewish Lunisolar Calendar',
    region: 'Global Jewish Communities',
    origin: 'Ancient Canaan / Mesopotamia',
    accent: '#7c4dff',
    symbol: '✡',
    type: 'Lunisolar',
    epoch: '3761 BCE — Anno Mundi (Year of Creation)',
    status: 'Living Tradition',
    statusColor: '#2d9e6b',
    featured: false,
    intro: 'One of the oldest continuously used calendar systems, the Hebrew calendar governs Jewish religious life, from Shabbat to Rosh Hashanah, Passover, and Yom Kippur.',
    history: 'Ancient Israelites initially used a calendar borrowed from neighboring Babylonian systems. After the Babylonian exile (6th century BCE), they adopted the Babylonian lunisolar structure — 12 or 13 months with intercalary months to align with the solar year. The calendar was formalized by Rabbi Hillel II around 359 CE with a fixed mathematical system, replacing the earlier practice of declaring months by rabbinic observation of the new moon. The epoch — Anno Mundi — is calculated from a traditional date of creation.',
    structure: '12 or 13 months. Seven times in every 19-year cycle a 13th month (Adar I) is added. Months alternate between 29 and 30 days. The year begins at Rosh Hashanah (New Year) in the autumn.',
    modern: 'Used by Jewish communities globally for all religious purposes. The State of Israel uses both the Hebrew and Gregorian calendars in civil affairs. Hebrew year 5786 corresponds roughly to 2025–2026 CE.',
    facts: [
      'Epoch: ~3761 BCE (Anno Mundi)',
      'Lunisolar — 12 or 13 months',
      '7 leap years in a 19-year cycle',
      'New Year: Rosh Hashanah (autumn)',
      'Formalized by Hillel II (~359 CE)',
      'Year 5786 ≈ 2025–2026 CE',
    ],
  },
  {
    id: 'chinese',
    name: 'Chinese Calendar',
    subtitle: 'Traditional Lunisolar Calendar',
    region: 'East Asia',
    origin: 'Ancient China',
    accent: '#e63946',
    symbol: '☯',
    type: 'Lunisolar',
    epoch: '2637 BCE — Emperor Huangdi',
    status: 'Living Tradition',
    statusColor: '#2d9e6b',
    featured: false,
    intro: 'One of the world\'s oldest and most sophisticated calendar systems, governing agricultural seasons, festivals, and the famous 12-year animal zodiac cycle across China and East Asia.',
    history: 'Traditionally attributed to Emperor Huangdi (Yellow Emperor) around 2637 BCE, the Chinese calendar evolved over millennia through successive dynasties refining its astronomical precision. The oracle bone inscriptions of the Shang dynasty (c. 1600–1046 BCE) document early lunisolar calculations. The calendar integrates the 10 Heavenly Stems and 12 Earthly Branches into the famous 60-year sexagenary cycle. Extensive imperial observatories tracked celestial bodies for calendar reform across history.',
    structure: 'Lunisolar: months follow the Moon; years align with the Sun via intercalary months added 7 times every 19 years. The 12 zodiac animals cycle through years. The 60-year cycle combines 10 Heavenly Stems and 12 Earthly Branches. New Year begins with the second new moon after the winter solstice.',
    modern: 'Widely used alongside the Gregorian calendar across China, Taiwan, Korea, Vietnam, and diaspora communities. Chinese New Year (Spring Festival) is the world\'s most widely celebrated traditional new year. The calendar continues to govern marriage dates, auspicious days, and agricultural timing.',
    facts: [
      'Attributed to Emperor Huangdi, ~2637 BCE',
      '60-year sexagenary cycle',
      '12 zodiac animals in yearly rotation',
      'Months follow the Moon',
      'Chinese New Year: globally celebrated',
      'Governs auspicious days and festivals',
    ],
  },
  {
    id: 'ethiopian',
    name: 'Ethiopian Calendar',
    subtitle: 'Ge\'ez Calendar — Qen',
    region: 'East Africa',
    origin: 'Ancient Ethiopia / Coptic Egypt',
    accent: '#ff6b35',
    symbol: '⬟',
    type: 'Solar / Coptic',
    epoch: '8 CE (Ethiopian Era)',
    status: 'Official National Calendar',
    statusColor: '#2d9e6b',
    featured: false,
    intro: 'The official calendar of Ethiopia, with 13 months — 12 months of 30 days each and a 13th month of 5 or 6 days. Ethiopia runs 7–8 years behind the Gregorian calendar.',
    history: 'Derived from the ancient Egyptian civil calendar and the Coptic calendar of the Alexandrian church, the Ethiopian calendar diverges from the Gregorian in its calculation of the date of the Annunciation of Jesus. Early Christian Ethiopia, through the Ethiopian Orthodox Tewahedo Church, preserved this ancient calendar tradition unbroken. Unlike most African nations, Ethiopia was never colonized at scale, and its calendar survived intact as a national institution.',
    structure: '13 months: 12 × 30 days + Pagumē (5 or 6 days). New Year (Enkutatash) falls on September 11 (or 12 in leap years) of the Gregorian calendar. The Ethiopian year 2017 corresponds roughly to 2024–2025 CE.',
    modern: 'Ethiopia officially uses its own calendar for all governmental, religious, and civil purposes. Banks, courts, and public offices operate on the Ethiopian calendar. The Ethiopian New Year (Enkutatash) is a major national celebration. The Ethiopian Orthodox Church relies on it for all liturgical timing.',
    facts: [
      '13 months per year',
      '12 months of 30 days + Pagumē',
      'New Year: Enkutatash (Sep 11 Gregorian)',
      '7–8 years behind the Gregorian calendar',
      'Official calendar of Ethiopia',
      'Preserved by the Ethiopian Orthodox Church',
    ],
  },
  {
    id: 'egyptian',
    name: 'Ancient Egyptian Calendar',
    subtitle: 'Calendar of the Pharaohs',
    region: 'North Africa',
    origin: 'Ancient Egypt — Nile Valley',
    accent: '#daa520',
    symbol: '𓇳',
    type: 'Solar (Civil)',
    epoch: 'c. 4241 BCE — Oldest recorded calendar',
    status: 'Historical',
    statusColor: '#8b92a8',
    featured: false,
    intro: 'One of the oldest calendars in human history, the ancient Egyptian calendar was a purely solar system of 365 days organized around the annual flooding of the Nile River.',
    history: 'The ancient Egyptian calendar is among the earliest known — potentially dating to 4241 BCE, based on the heliacal rising of Sirius (Sopdet). It was a 365-day solar calendar divided into 12 months of 30 days, with 5 additional epagomenal days dedicated to the gods. Three seasons structured life: Akhet (inundation/flooding), Peret (emergence/growing), and Shemu (harvest/drought). The Egyptians also maintained a 365.25-day Sothic cycle tracked through the star Sirius. The Egyptian calendar directly influenced the Roman calendar and ultimately the Gregorian system.',
    structure: '12 months × 30 days = 360 days + 5 epagomenal days (birthdays of Osiris, Horus, Set, Isis, and Nephthys) = 365 days. Three seasons of 4 months each: Akhet, Peret, Shemu.',
    modern: 'No longer in active civil use, but the Egyptian calendar is the direct ancestor of the Gregorian calendar through the Julian reform. Coptic Christianity preserved a modified form as the Coptic calendar, still used today. Egyptian archaeological and historical scholarship depends on it for dating.',
    facts: [
      'Possibly the world\'s oldest calendar (~4241 BCE)',
      '365 days — 12 months of 30 + 5 epagomenal days',
      'Three seasons: Akhet, Peret, Shemu',
      'Tracked Sirius (Sopdet) for New Year',
      'Direct ancestor of the Gregorian calendar',
      'Preserved in the Coptic calendar',
    ],
  },
  {
    id: 'maya',
    name: 'Maya Calendar System',
    subtitle: 'Tzolk\'in · Haab\' · Long Count',
    region: 'Mesoamerica',
    origin: 'Ancient Maya Civilization',
    accent: '#9b59b6',
    symbol: '⊕',
    type: 'Ritual / Solar / Long Count',
    epoch: '3114 BCE — Maya Creation Date',
    status: 'Living Tradition',
    statusColor: '#2d9e6b',
    featured: false,
    intro: 'Perhaps the most sophisticated calendar system ever devised, the Maya used three interlocking cycles — a 260-day ritual calendar, a 365-day solar calendar, and a long-count system spanning millions of years.',
    history: 'The Maya inherited and perfected earlier Mesoamerican calendrical traditions from the Olmec and Zapotec civilizations. By the Classic Period (250–900 CE), Maya astronomers had calculated celestial cycles with extraordinary precision — tracking Venus to within 2 hours per 584-day synodic period, predicting solar eclipses, and mapping the Milky Way\'s precessional motion. The Long Count calendar, which measures time from a mythological creation date in 3114 BCE, demonstrates an abstract, mathematical view of deep time rare in the ancient world.',
    structure: 'Three interlocking systems: (1) Tzolk\'in — 260-day sacred/ritual calendar (13 numbers × 20 day signs); (2) Haab\' — 365-day solar calendar (18 months × 20 days + 5 Wayeb\' days); (3) Long Count — positional notation counting days from the creation epoch. The Tzolk\'in and Haab\' together create the 52-year Calendar Round.',
    modern: 'The Tzolk\'in and Haab\' are actively maintained by Maya communities across Guatemala, Mexico (Chiapas, Yucatán), Belize, and Honduras. Maya day-keepers (Ajq\'ij) continue to practice traditional timekeeping for agricultural, ceremonial, and spiritual purposes. The Maya calendar\'s precision has gained global recognition in archaeoastronomy.',
    facts: [
      '260-day Tzolk\'in ritual calendar',
      '365-day Haab\' solar calendar',
      '52-year Calendar Round cycle',
      'Long Count spans millions of years',
      'Venus cycle accurate to 2 hours/584 days',
      'Actively maintained by Maya communities',
    ],
  },
  {
    id: 'hindu',
    name: 'Hindu / Vedic Calendar',
    subtitle: 'Panchanga — The Five-Limbed Calendar',
    region: 'South Asia',
    origin: 'Ancient India — Vedic Period',
    accent: '#e9498a',
    symbol: '❋',
    type: 'Lunisolar',
    epoch: '3102 BCE — Kali Yuga',
    status: 'Living Tradition',
    statusColor: '#2d9e6b',
    featured: false,
    intro: 'Among the world\'s most ancient and complex calendar traditions, the Hindu Panchanga tracks five simultaneous cycles — day, lunar date, lunar mansion, auspicious moment, and solar-lunar combination.',
    history: 'Vedic astronomers (jyotishis) developed calendar science (Jyotisha) as one of the six Vedangas — auxiliary sciences supporting the Vedas. The Vedanga Jyotisha (c. 1400–1200 BCE) is among the earliest astronomical texts. The Surya Siddhanta (c. 400 CE) calculated the Earth\'s diameter and precession of equinoxes to remarkable accuracy. India maintained a rich tradition of regional calendar variants — Vikram Samvat, Saka Era, Bengali Calendar, Tamil Calendar — united by shared Vedic astronomical principles.',
    structure: 'The Panchanga (five limbs): Tithi (lunar day), Vara (weekday), Nakshatra (lunar mansion — 27 or 28 asterisms), Yoga (sun-moon combination), Karana (half-lunar-day). The solar year is divided into 12 months (Rashis) tied to zodiac constellations. Leap months (Adhika Masa) align the lunar and solar years. The cosmic time scale includes Yugas (ages) of millions of years.',
    modern: 'The Panchanga is published annually across India and the diaspora and used daily for determining auspicious times for weddings, business, travel, and religious festivals. Diwali, Holi, Navratri, and all Hindu festivals are calculated from it. Multiple national calendars coexist: the Government of India\'s National Calendar (Saka era) alongside regional traditional systems.',
    facts: [
      '5 simultaneous cycles (Panchanga)',
      'Epoch: 3102 BCE (start of Kali Yuga)',
      '27 or 28 Nakshatras (lunar mansions)',
      'Regional variants: Vikram, Saka, Bengali',
      'Governs all Hindu festival timing',
      'Cosmic time scales spanning millions of years',
    ],
  },
  {
    id: 'persian',
    name: 'Persian / Solar Hijri Calendar',
    subtitle: 'Gāhshomāri-ye Irani',
    region: 'Iran, Afghanistan, Central Asia',
    origin: 'Ancient Persia / Iran',
    accent: '#0099ff',
    symbol: '⚘',
    type: 'Solar',
    epoch: '622 CE — The Hijra (Solar reckoning)',
    status: 'Official National Calendar',
    statusColor: '#2d9e6b',
    featured: false,
    intro: 'The official calendar of Iran and Afghanistan, and among the most astronomically accurate solar calendars ever created. Its new year, Nowruz, is celebrated by over 300 million people worldwide.',
    history: 'Ancient Persia used the Zoroastrian calendar — a solar system of 12 months of 30 days with 5 epagomenal days, derived from the Egyptian model. Under the Achaemenid Empire, this calendar governed one of the ancient world\'s largest bureaucracies. After the Arab conquest (7th century CE), the Islamic Hijri epoch was adopted but Iran retained solar reckoning. The great polymath and poet Omar Khayyam reformed the Persian calendar in 1079 CE, creating the Jalali calendar — more accurate than the Gregorian calendar, which was introduced 500 years later.',
    structure: '12 months: the first 6 have 31 days, the next 5 have 30 days, and the last month has 29 days (30 in leap years). New Year (Nowruz) begins at the spring equinox, calculated astronomically. The year 1404 SH (Solar Hijri) corresponds to 2025–2026 CE.',
    modern: 'Official calendar of Iran and Afghanistan. Nowruz (Persian New Year at spring equinox) is UNESCO-recognized and celebrated by Iranian, Kurdish, Afghan, Azerbaijani, and Central Asian communities worldwide. The calendar\'s astronomically calculated equinox alignment makes it exceptionally accurate.',
    facts: [
      'New Year: Nowruz (spring equinox)',
      'Reformed by Omar Khayyam in 1079 CE',
      'More accurate than the Gregorian calendar',
      'Official calendar of Iran and Afghanistan',
      '300+ million people celebrate Nowruz',
      'UNESCO Intangible Cultural Heritage',
    ],
  },
];

// ── Timeline data ─────────────────────────────────────────────
const TIMELINE = [
  { year: 'c. 4241 BCE', event: 'Ancient Egyptian calendar established — possibly the world\'s oldest', accent: '#daa520', paired: true },
  { year: 'Immemorial', event: 'Kọ́jọ́dá / Yoruba calendar rooted in ancient Ifẹ̀ — encoded in 256 Odu Ifa', accent: '#f5c518', paired: true },
  { year: 'c. 3114 BCE', event: 'Maya Long Count creation epoch — Maya calendar system origins', accent: '#9b59b6' },
  { year: 'c. 3102 BCE', event: 'Hindu Kali Yuga begins — Vedic calendar epoch', accent: '#e9498a' },
  { year: 'c. 2637 BCE', event: 'Chinese sexagenary cycle attributed to Emperor Huangdi', accent: '#e63946' },
  { year: '46 BCE', event: 'Julius Caesar introduces the Julian Calendar in Rome', accent: '#4361ee' },
  { year: '359 CE', event: 'Hillel II formalizes the Hebrew Calendar with fixed calculations', accent: '#7c4dff' },
  { year: '622 CE', event: 'Islamic Hijri Calendar begins — Prophet Muhammad\'s Hijra from Mecca', accent: '#2d9e6b' },
  { year: '1079 CE', event: 'Omar Khayyam reforms the Persian Calendar — the Jalali system', accent: '#0099ff' },
  { year: '1582 CE', event: 'Pope Gregory XIII introduces the Gregorian Calendar', accent: '#4361ee' },
  { year: 'Modern', event: 'All calendar traditions coexist — UNESCO recognizes multiple systems', accent: '#8b92a8' },
];

// ── Orisa Days (4-day Yoruba sacred week) ─────────────────────
const ORISA_DAYS = [
  {
    name: 'Ọjọ́ Ọbàtálá',
    meaning: 'Day of Obatalá',
    orisa: 'Ọbàtálá/Òrìṣà Ńlá',
    note: 'Day of purity, creation, and justice',
    orisa_list: ['Ọbàtálá/Òrìṣà Ńlá', 'Yemòó', 'Èṣù', 'Egúngún', 'Ẹgbẹ́-Ọ̀gbà/Alárá-Igbó', 'Orò', 'Ẹ̀lúkú', 'Agẹmọ', 'Òrìṣà Òkè', 'Ògìyán/Ògìrìyán'],
  },
  {
    name: 'Ọjọ́ Ifá',
    meaning: 'Day of Ifa',
    orisa: 'Ifá/Ọ̀rúnmìlà',
    note: 'Day of wisdom, destiny, and divination',
    orisa_list: ['Ifá/Ọ̀rúnmìlà', 'Ọ̀ṣun', 'Ọ̀ṣanyìn', 'Yemọja', 'Olókun', 'Ẹ̀là'],
  },
  {
    name: 'Ọjọ́ Ògún',
    meaning: 'Day of Ogún',
    orisa: 'Ògún',
    note: 'Day of iron, labor, and progress',
    orisa_list: ['Ògún', 'Ìja', 'Ọ̀ṣọ́ọ̀sí', 'Òrìṣà-Oko', 'Erinlẹ̀'],
  },
  {
    name: 'Ọjọ́ Ṣàngó',
    meaning: 'Day of Ṣàngó',
    orisa: 'Ṣàngó/Jàkúta',
    note: 'Day of thunder, justice, and power',
    orisa_list: ['Ṣàngó/Jàkúta', 'Ọya', 'Baáyànnì', 'Aganjú', 'Ọbalúayé/Ṣànpọ̀nná', 'Nàná-Bùkúù'],
  },
];

// ── Kọ́jọ́dá Months ────────────────────────────────────────────
const KOJODA_MONTHS = [
  { num: 1,  name: 'Òkúdù',   greg: 'June' },
  { num: 2,  name: 'Agẹmọ',   greg: 'July' },
  { num: 3,  name: 'Ògún',    greg: 'August' },
  { num: 4,  name: 'Ọ̀wẹ̀wẹ̀', greg: 'September' },
  { num: 5,  name: 'Ọ̀wàwà',  greg: 'October' },
  { num: 6,  name: 'Bélù',    greg: 'November' },
  { num: 7,  name: 'Ọ̀pẹ',    greg: 'December' },
  { num: 8,  name: 'Sẹrẹ',    greg: 'January' },
  { num: 9,  name: 'Erelé',   greg: 'February' },
  { num: 10, name: 'Eréna',   greg: 'March' },
  { num: 11, name: 'Igbe',    greg: 'April' },
  { num: 12, name: 'Èbìbí',   greg: 'May' },
  { num: 13, name: 'Ìyájọ́',  greg: 'Intercalary' },
];

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
          <span className="header__brand-icon">◉</span>
          <span className="header__brand-name">IfaCalendar</span>
        </div>
        <nav className="header__nav">
          <a className="nav-link" href="#calendars">Calendars</a>
          <a className="nav-link" href="#kojoda">Kọ́jọ́dá</a>
          <a className="nav-link" href="#timeline">Timeline</a>
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
      {/* Layered backgrounds */}
      <div className="hero__bg">
        <div className="hero__grid" />
        <div className="hero__glow hero__glow--gold" />
        <div className="hero__glow hero__glow--blue" />
      </div>

      {/* Floating calendar rings */}
      <div className="hero__rings" aria-hidden="true">
        <div className="hero__ring hero__ring--1" />
        <div className="hero__ring hero__ring--2" />
        <div className="hero__ring hero__ring--3" />
        <div className="hero__ring hero__ring--4" />
      </div>

      {/* Orbit dots */}
      <div className="hero__orbits" aria-hidden="true">
        {['#f5c518','#4361ee','#2d9e6b','#7c4dff','#e63946','#ff6b35','#e9498a','#0099ff'].map((c, i) => (
          <div
            key={i}
            className="hero__orbit-dot"
            style={{
              '--dot-color': c,
              '--orbit-r': `${130 + i * 28}px`,
              '--orbit-delay': `${i * -1.5}s`,
              '--orbit-dur': `${14 + i * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="hero__inner">
        <div className="hero__eyebrow">
          <span className="hero__eyebrow-dot" />
          The IFA Internet · iTOE Platform
        </div>

        <h1 className="hero__title">
          <span className="hero__title-ifa">Ifa</span>Calendar
        </h1>
        <p className="hero__subtitle">World Calendar Explorer</p>
        <p className="hero__desc">
          Time is a sacred technology. Explore how civilizations across Africa, Asia, the Americas, and Europe
          have measured, honored, and encoded the rhythms of existence — from the ancient Yoruba Kọ́jọ́dá
          to the Gregorian standard, from the Maya Long Count to the stars of Orisa.
        </p>

        <div className="hero__stats">
          {[
            { v: '10+', l: 'Calendar Systems' },
            { v: '6000+', l: 'Years of Records' },
            { v: '256', l: 'Odu Ifa Codes' },
            { v: '∞', l: 'Cycles of Time' },
          ].map(s => (
            <div key={s.l} className="hero__stat">
              <div className="hero__stat-value">{s.v}</div>
              <div className="hero__stat-label">{s.l}</div>
            </div>
          ))}
        </div>

        <div className="hero__ctas">
          <a className="btn btn--primary" href="#kojoda">Explore Kọ́jọ́dá ↓</a>
          <a className="btn btn--ghost" href="#calendars">All Calendars</a>
        </div>
      </div>
    </section>
  );
}

// ── Intro Banner ───────────────────────────────────────────────
function IntroBanner() {
  return (
    <section className="intro-banner">
      <div className="container">
        <div className="intro-banner__inner">
          <div className="intro-banner__quote">
            <span className="intro-banner__mark">"</span>
            Ìgbà ò lọ bí òréré; ayé ò lọ bí ọ̀pá ìbọn: No season goes on endlessly; life isn't always as straight as the barrel of a gun.
            <span className="intro-banner__mark">"</span>
          </div>
          <div className="intro-banner__attr">— The Ifa Wisdom of Ọ̀wọ́nrín Ògúndá (Ọ̀wọ́nrín Dàágbọ́n)</div>
        </div>
      </div>
    </section>
  );
}

// ── Kojoda Feature ─────────────────────────────────────────────
function KojodaSection() {
  const cal = CALENDARS.find(c => c.id === 'kojoda');
  const [tab, setTab] = useState('history');

  const tabs = [
    { id: 'history', label: 'History & Origins' },
    { id: 'structure', label: 'Structure' },
    { id: 'modern', label: 'Today' },
    { id: 'orisa', label: 'Orisa Days' },
  ];

  return (
    <section id="kojoda" className="section kojoda-section">
      {/* Gold bar at top */}
      <div className="kojoda-section__bar" />

      <div className="container">
        {/* Header */}
        <div className="section__header">
          <span className="section__eyebrow" style={{ color: '#f5c518' }}>Featured · Yoruba Calendar System</span>
          <h2 className="section__title">
            Kọ́jọ́dá — <span style={{ color: '#f5c518' }}>The Yoruba New Year</span>
          </h2>
          <p className="section__desc">
            The traditional lunar calendar of the Yoruba people — Ètò Ìkajọ́ Ìṣẹ̀ṣe —
            with 13 months, a 4-day sacred week, and a new year beginning every June 3.
            As of June 3, 2026, Kọ́jọ́dá enters year <strong style={{ color: '#f5c518' }}>10,068</strong>.
          </p>
        </div>

        {/* Main feature grid */}
        <div className="kojoda-grid">
          {/* Left — visual panel */}
          <div className="kojoda-visual">
            {/* Central Opon Ifa symbol */}
            <div className="kojoda-wheel">
              <div className="kojoda-wheel__outer">
                <div className="kojoda-wheel__inner">
                  <div className="kojoda-wheel__core">
                    <div className="kojoda-wheel__symbol">◉</div>
                    <div className="kojoda-wheel__label">Kọ́jọ́dá</div>
                    <div className="kojoda-wheel__sub">Yoruba New Year</div>
                  </div>
                </div>
              </div>
              {/* 16 Odu markers around wheel */}
              {Array.from({ length: 16 }, (_, i) => {
                const angle = (i / 16) * 360 - 90;
                const rad = (angle * Math.PI) / 180;
                const r = 130;
                const x = 50 + (r / 160) * 50 * Math.cos(rad);
                const y = 50 + (r / 160) * 50 * Math.sin(rad);
                return (
                  <div
                    key={i}
                    className="kojoda-wheel__odu"
                    style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${i * 0.2}s` }}
                  />
                );
              })}
            </div>

            {/* Key facts */}
            <div className="kojoda-facts">
              {cal.facts.map((f, i) => (
                <div key={i} className="kojoda-fact">
                  <span className="kojoda-fact__dot" />
                  {f}
                </div>
              ))}
            </div>

            {/* Meta info */}
            <div className="kojoda-meta">
              {[
                { label: 'Type', value: cal.type },
                { label: 'New Year', value: 'June 3, annually' },
                { label: 'Year (2026)', value: '10,068' },
                { label: 'Status', value: cal.status },
              ].map(m => (
                <div key={m.label} className="kojoda-meta__item">
                  <span className="kojoda-meta__label">{m.label}</span>
                  <span className="kojoda-meta__value">{m.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — content tabs */}
          <div className="kojoda-content">
            <div className="kojoda-tabs">
              {tabs.map(t => (
                <button
                  key={t.id}
                  className={`kojoda-tab${tab === t.id ? ' kojoda-tab--active' : ''}`}
                  onClick={() => setTab(t.id)}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div className="kojoda-body">
              {tab === 'history' && (
                <div className="kojoda-panel">
                  <p className="kojoda-intro">{cal.intro}</p>
                  <p>{cal.history}</p>
                </div>
              )}
              {tab === 'structure' && (
                <div className="kojoda-panel">
                  <p>{cal.structure}</p>

                  {/* Months grid */}
                  <div className="kojoda-odu-grid kojoda-months-grid">
                    <div className="kojoda-odu-header">13 Months of the Kọ́jọ́dá Calendar</div>
                    {KOJODA_MONTHS.map(m => (
                      <div key={m.num} className={`kojoda-odu-chip kojoda-month-chip${m.num === 13 ? ' kojoda-month-chip--intercalary' : ''}`}>
                        <span className="kojoda-odu-num">{m.num}</span>
                        <span className="kojoda-month-name">{m.name}</span>
                        <span className="kojoda-month-greg">{m.greg}</span>
                      </div>
                    ))}
                  </div>

                  {/* Sacred week */}
                  <div className="kojoda-odu-grid" style={{ marginTop: '1.25rem' }}>
                    <div className="kojoda-odu-header">4-Day Sacred Week — Ọ̀sẹ̀ Ìṣẹ̀ṣe</div>
                    {ORISA_DAYS.map((d, i) => (
                      <div key={d.name} className="kojoda-odu-chip kojoda-week-chip">
                        <span className="kojoda-odu-num">{i + 1}</span>
                        <span className="kojoda-month-name">{d.name}</span>
                        <span className="kojoda-month-greg">{d.orisa}</span>
                      </div>
                    ))}
                  </div>

                  {/* Odu Ifa codes */}
                  <div className="kojoda-odu-grid" style={{ marginTop: '1.25rem' }}>
                    <div className="kojoda-odu-header">16 Principal Odu Ifa — Structural Codes of Time</div>
                    {['Ogbe','Oyeku','Iwori','Odi','Irosun','Owonrin','Obara','Okanran','Ogunda','Osa','Ika','Oturupọn','Otura','Irete','Oṣe','Ofun'].map((odu, i) => (
                      <div key={odu} className="kojoda-odu-chip">
                        <span className="kojoda-odu-num">{i + 1}</span>
                        <span>{odu}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {tab === 'modern' && (
                <div className="kojoda-panel">
                  <p>{cal.modern}</p>
                  <div className="kojoda-diaspora">
                    <div className="kojoda-diaspora__title">Global Yoruba Diaspora</div>
                    {['Nigeria','Benin Republic','Brazil (Candomblé)','Cuba (Lucumí / Santería)','Trinidad & Tobago','United States','United Kingdom','Global Ifa Communities'].map(place => (
                      <div key={place} className="kojoda-diaspora__item">
                        <span className="kojoda-diaspora__dot" />
                        {place}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {tab === 'orisa' && (
                <div className="kojoda-panel">
                  <p style={{ marginBottom: '1.5rem', color: 'var(--text-2)' }}>
                    The Yoruba sacred week (Ọ̀sẹ̀ Ìṣẹ̀ṣe) is a 4-day cycle — Ọjọ́ Ọbàtálá, Ọjọ́ Ifá, Ọjọ́ Ògún, and Ọjọ́ Ṣàngó — each day hosting a cluster of associated Orisa. 91 of these weeks make up the 364-day Kọ́jọ́dá year.
                  </p>
                  <div className="orisa-days">
                    {ORISA_DAYS.map((d, i) => (
                      <div key={d.name} className="orisa-day" style={{ '--day-accent': ['#ffffff','#f5c518','#2d9e6b','#e63946'][i] }}>
                        <div className="orisa-day__num">{i + 1}</div>
                        <div className="orisa-day__content">
                          <div className="orisa-day__name">{d.name}</div>
                          <div className="orisa-day__meaning">{d.meaning}</div>
                          <div className="orisa-day__note">{d.note}</div>
                          <div className="orisa-day__list">
                            {d.orisa_list.map((o, j) => (
                              <span key={j} className={`orisa-day__tag${j === 0 ? ' orisa-day__tag--lead' : ''}`}>{o}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Calendar Card ──────────────────────────────────────────────
function CalendarCard({ cal, onClick }) {
  return (
    <div
      className="cal-card"
      style={{ '--cal-accent': cal.accent }}
      onClick={() => onClick(cal)}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onClick(cal)}
    >
      <div className="cal-card__top-bar" />
      <div className="cal-card__header">
        <div className="cal-card__symbol">{cal.symbol}</div>
        <div>
          <div className="cal-card__name">{cal.name}</div>
          <div className="cal-card__subtitle">{cal.subtitle}</div>
        </div>
      </div>
      <div className="cal-card__meta">
        <span className="cal-card__badge" style={{ background: cal.statusColor + '22', color: cal.statusColor, border: `1px solid ${cal.statusColor}44` }}>
          {cal.status}
        </span>
        <span className="cal-card__type">{cal.type}</span>
      </div>
      <div className="cal-card__region">{cal.region}</div>
      <p className="cal-card__intro">{cal.intro.slice(0, 120)}…</p>
      <div className="cal-card__epoch">
        <span className="cal-card__epoch-label">Epoch</span>
        <span className="cal-card__epoch-value">{cal.epoch}</span>
      </div>
      <div className="cal-card__cta">Explore →</div>
    </div>
  );
}

// ── Calendar Modal ─────────────────────────────────────────────
function CalendarModal({ cal, onClose }) {
  useEffect(() => {
    const h = e => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', h);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', h);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={{ '--modal-accent': cal.accent }}>
        <div className="modal__top-bar" />
        <button className="modal__close" onClick={onClose} aria-label="Close">✕</button>

        <div className="modal__header">
          <div className="modal__symbol">{cal.symbol}</div>
          <div>
            <h2 className="modal__name">{cal.name}</h2>
            <div className="modal__subtitle">{cal.subtitle}</div>
          </div>
        </div>

        <div className="modal__meta-row">
          {[
            { label: 'Region', value: cal.region },
            { label: 'Origin', value: cal.origin },
            { label: 'Type', value: cal.type },
            { label: 'Epoch', value: cal.epoch },
          ].map(m => (
            <div key={m.label} className="modal__meta-item">
              <span className="modal__meta-label">{m.label}</span>
              <span className="modal__meta-value">{m.value}</span>
            </div>
          ))}
        </div>

        <div className="modal__body">
          <section className="modal__section">
            <h3 className="modal__section-title">Overview</h3>
            <p>{cal.intro}</p>
          </section>
          <section className="modal__section">
            <h3 className="modal__section-title">History</h3>
            <p>{cal.history}</p>
          </section>
          <section className="modal__section">
            <h3 className="modal__section-title">Structure</h3>
            <p>{cal.structure}</p>
          </section>
          <section className="modal__section">
            <h3 className="modal__section-title">In the Modern World</h3>
            <p>{cal.modern}</p>
          </section>
          <section className="modal__section">
            <h3 className="modal__section-title">Key Facts</h3>
            <div className="modal__facts">
              {cal.facts.map((f, i) => (
                <div key={i} className="modal__fact">
                  <span className="modal__fact-dot" style={{ background: cal.accent }} />
                  {f}
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

// ── Calendars Section ──────────────────────────────────────────
function CalendarsSection() {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All Systems' },
    { id: 'living', label: 'Living Traditions' },
    { id: 'africa', label: 'Africa' },
    { id: 'asia', label: 'Asia' },
    { id: 'americas', label: 'Americas' },
    { id: 'global', label: 'Global' },
  ];

  const regionMatch = {
    africa: ['West Africa', 'East Africa', 'North Africa'],
    asia: ['Global Muslim Communities', 'Global Jewish Communities', 'East Asia', 'South Asia', 'Iran, Afghanistan, Central Asia'],
    americas: ['Mesoamerica'],
    global: ['Global'],
  };

  const filtered = CALENDARS.filter(c => {
    if (filter === 'all') return true;
    if (filter === 'living') return c.status !== 'Historical';
    return regionMatch[filter]?.includes(c.region);
  });

  return (
    <section id="calendars" className="section section--alt">
      <div className="container">
        <div className="section__header">
          <span className="section__eyebrow">World Calendar Systems</span>
          <h2 className="section__title">Calendars of Civilization</h2>
          <p className="section__desc">
            Every civilization built its own relationship with time. These calendar systems are living expressions
            of culture, astronomy, spirituality, and mathematics — each a unique lens on the universe.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="filter-tabs">
          {filters.map(f => (
            <button
              key={f.id}
              className={`filter-tab${filter === f.id ? ' filter-tab--active' : ''}`}
              onClick={() => setFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="cal-grid">
          {filtered.map(c => (
            <CalendarCard key={c.id} cal={c} onClick={setSelected} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p style={{ textAlign: 'center', color: 'var(--text-2)', padding: '3rem 0' }}>
            No calendars in this filter.
          </p>
        )}
      </div>

      {selected && <CalendarModal cal={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}

// ── Timeline ───────────────────────────────────────────────────
function TimelineSection() {
  // Group consecutive paired items into side-by-side rows
  const groups = [];
  let i = 0;
  while (i < TIMELINE.length) {
    if (TIMELINE[i].paired && TIMELINE[i + 1]?.paired) {
      groups.push({ type: 'pair', items: [TIMELINE[i], TIMELINE[i + 1]] });
      i += 2;
    } else {
      groups.push({ type: 'single', item: TIMELINE[i] });
      i++;
    }
  }

  return (
    <section id="timeline" className="section">
      <div className="container">
        <div className="section__header">
          <span className="section__eyebrow">History of Timekeeping</span>
          <h2 className="section__title">A Timeline of Calendar Evolution</h2>
          <p className="section__desc">
            From the earliest Egyptian and Kọ́jọ́dá calendars to the global Gregorian standard — a journey through
            humanity's relationship with time.
          </p>
        </div>

        <div className="timeline">
          <div className="timeline__line" />
          {groups.map((g, gi) => {
            if (g.type === 'pair') {
              return (
                <div key={gi} className="timeline__item timeline__item--pair">
                  <div className="timeline__dot timeline__dot--pair"
                    style={{ background: 'linear-gradient(135deg, #daa520, #f5c518)', boxShadow: '0 0 14px rgba(245,197,24,0.4)' }} />
                  <div className="timeline__pair-row">
                    {g.items.map((item, pi) => (
                      <div key={pi} className="timeline__card timeline__card--paired">
                        <div className="timeline__year" style={{ color: item.accent }}>{item.year}</div>
                        <div className="timeline__event">{item.event}</div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            }
            return (
              <div key={gi} className={`timeline__item${gi % 2 === 0 ? ' timeline__item--left' : ' timeline__item--right'}`}>
                <div className="timeline__dot" style={{ background: g.item.accent, boxShadow: `0 0 12px ${g.item.accent}55` }} />
                <div className="timeline__card">
                  <div className="timeline__year" style={{ color: g.item.accent }}>{g.item.year}</div>
                  <div className="timeline__event">{g.item.event}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── Ifa & Time Section ─────────────────────────────────────────
function IfaTimeSection() {
  return (
    <section className="section section--alt ifa-time">
      <div className="container">
        <div className="section__header">
          <span className="section__eyebrow" style={{ color: '#f5c518' }}>Ifa & Time</span>
          <h2 className="section__title">Time as Encoded in Ifa</h2>
          <p className="section__desc">
            In Ifa philosophy, time is not merely chronological — it is ontological. The 256 Odu Ifa are
            not only wisdom codes but temporal codes — encoding the qualities, potentials, and destinies
            active within every moment of existence.
          </p>
        </div>

        <div className="ifa-time__grid">
          {[
            {
              symbol: '◉',
              title: '256 Odu Ifa',
              subtitle: 'Codes of All Time',
              body: 'The 256 Odu Ifa encode every possible quality of existence — including every quality of time. Each Odu governs a different energetic signature that manifests in cycles of life, season, and cosmos.',
              accent: '#f5c518',
            },
            {
              symbol: '⊞',
              title: '4-Day Sacred Week',
              subtitle: 'Ọ̀sẹ̀ Yoruba',
              body: 'The Yoruba sacred week (ọ̀sẹ̀) has 4 days, each governed by a principal Orisa. This 4-day cycle is the fundamental temporal unit of Ifa practice — mirroring the 4-Bit structure of the Odu.',
              accent: '#daa520',
            },
            {
              symbol: '⊛',
              title: 'Orisa Festival Cycles',
              subtitle: 'Living Calendar',
              body: 'Major Orisa festivals — Ọṣun Ọṣogbo, Ògún, Ṣàngó, Yemọja, Obatalá — structure the Yoruba year into a living sacred calendar, each marking a cosmic renewal and community gathering.',
              accent: '#e63946',
            },
            {
              symbol: '⊕',
              title: 'IFABit Time Encoding',
              subtitle: 'Binary of Eternity',
              body: 'Ogbe (IfaZero — Energy) and Oyeku (IfaOne — Anergy) are the primal forces of all existence. Their interaction generates the 254 remaining Odu and the infinite cycles of time itself.',
              accent: '#4361ee',
            },
          ].map(item => (
            <div key={item.title} className="ifa-time__card" style={{ '--it-accent': item.accent }}>
              <div className="ifa-time__symbol">{item.symbol}</div>
              <h3 className="ifa-time__title">{item.title}</h3>
              <div className="ifa-time__sub">{item.subtitle}</div>
              <p className="ifa-time__body">{item.body}</p>
            </div>
          ))}
        </div>

        <blockquote className="ifa-time__axiom">
          "Ọrúnmìlà witnessed the beginning of all things — he is the witness of time itself,
          the keeper of Odu, and the guardian of all cycles of existence."
          <cite>— Ifa Corpus</cite>
        </blockquote>
      </div>
    </section>
  );
}

// ── Cultures Strip ─────────────────────────────────────────────
function CulturesStrip() {
  const cultures = [
    { name: 'Yoruba', region: 'West Africa', color: '#f5c518' },
    { name: 'Egyptian', region: 'North Africa', color: '#daa520' },
    { name: 'Ethiopian', region: 'East Africa', color: '#ff6b35' },
    { name: 'Akan / Ghanaian', region: 'West Africa', color: '#e63946' },
    { name: 'Zulu', region: 'Southern Africa', color: '#2d9e6b' },
    { name: 'Maya', region: 'Mesoamerica', color: '#9b59b6' },
    { name: 'Aztec / Mexica', region: 'Mesoamerica', color: '#7c4dff' },
    { name: 'Chinese', region: 'East Asia', color: '#e9498a' },
    { name: 'Hindu / Vedic', region: 'South Asia', color: '#ff6b35' },
    { name: 'Persian', region: 'Central Asia', color: '#0099ff' },
    { name: 'Hebrew', region: 'Middle East', color: '#7c4dff' },
    { name: 'Islamic', region: 'Global', color: '#2d9e6b' },
    { name: 'Celtic', region: 'Europe', color: '#4361ee' },
    { name: 'Roman', region: 'Europe', color: '#8b92a8' },
  ];

  return (
    <section className="cultures-strip">
      <div className="cultures-strip__inner">
        <div className="cultures-strip__label">Cultures & Civilizations Represented</div>
        <div className="cultures-strip__list">
          {cultures.map(c => (
            <div key={c.name} className="culture-chip" style={{ '--chip-color': c.color }}>
              <span className="culture-chip__dot" />
              <span className="culture-chip__name">{c.name}</span>
              <span className="culture-chip__region">{c.region}</span>
            </div>
          ))}
        </div>
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
              <span className="footer__logo-icon">◉</span>
              <span className="footer__logo-name">IfaCalendar</span>
            </div>
            <p className="footer__tagline">World Calendar Explorer — The IFA Internet</p>
            <p className="footer__tagline" style={{ marginTop: 4, fontSize: '0.8rem' }}>
              Part of <a href="https://toe.cenproject.org" style={{ color: 'var(--gold)' }}>The IFA Internet</a> ·
              <a href="https://cenproject.org" style={{ color: 'var(--gold)', marginLeft: 4 }}>CENProject</a>
            </p>
          </div>
          <nav className="footer__links">
            <a href="https://ifainternet.org" className="footer__link" target="_blank" rel="noopener noreferrer">← IFA Internet</a>
            <a href="#kojoda" className="footer__link">Kọ́jọ́dá</a>
            <a href="#calendars" className="footer__link">All Calendars</a>
            <a href="#timeline" className="footer__link">Timeline</a>
            <a href="https://toe.cenproject.org/ifa-periodic-table/" className="footer__link" target="_blank" rel="noopener noreferrer">Ifa Periodic Table</a>
            <a href="https://toe.cenproject.org/ifai/" className="footer__link" target="_blank" rel="noopener noreferrer">Ifai Oracle</a>
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
        <IntroBanner />
        <KojodaSection />
        <CalendarsSection />
        <TimelineSection />
        <IfaTimeSection />
        <CulturesStrip />
      </main>
      <Footer />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
