/* ─────────────────────────────────────────────────────────────────────────────
   Ifalibrium II — IFA Matrix Playground tab
   The 256 Odù chart by Dr. Will Coleman Ph.D., Oscar Daniel and Brad Ost,
   laid out RIGHT TO LEFT and drawn with the Playground's own tile format
   (number · two stacked I/O strings · short name) instead of vertical legs.

   Chart structure (mirrored):
     • Méjì band ........ 16 tiles, 1–16 (Ogbé at the far right)
     • Ogbé band ........ 30 tiles, 17–46   Ogbé-Òyèkú, Òyèkú-Ogbé, Ogbé-Ìwòrì, Ìwòrì-Ogbé …
     • Òyèkú band ....... 28 tiles, 47–74
       … each band pairs its Odù with every later Odù, in both orders …
     • Òsè band ......... 2 tiles, 255–256  Òsè-Òfún, Òfún-Òsè

   Tile glyph convention (same as the Ifalibrium I and Amulu tabs):
     bottom string = first-named Odù, top string = second-named Odù,
     O = single mark, I = double mark; Ogbé = "O", Òyèkú = "|".
     Tile colour = first-named Odù's colour; Méjì tiles use the gold "Self" tint.

   Uses the React global already loaded by the Playground (no imports).
   ───────────────────────────────────────────────────────────────────────── */

const IF2_SOURCE_URL = "https://atla.libguides.com/c.php?g=1138564&p=8385014";

// n, full name, short name (site style), site string, site colour, chart band label, chart band colour
const IF2_ODU = [
  { n: 1,  name: "Ogbé",      ab: "Ogb", code: "O",    color: "#f0920c", band: "OGBE",     strip: "#BF8F00" },
  { n: 2,  name: "Òyèkú",     ab: "Òyè", code: "|",    color: "#6366f1", band: "OYEKU",    strip: "#A9D18E" },
  { n: 3,  name: "Ìwòrì",     ab: "Ìwò", code: "IOOI", color: "#14b8d4", band: "IWORI",    strip: "#FFFF00" },
  { n: 4,  name: "Òdí",       ab: "Òdí", code: "OIIO", color: "#00c87c", band: "ODI",      strip: "#A5A5A5" },
  { n: 5,  name: "Ìrosùn",    ab: "Ìro", code: "IIOO", color: "#ef4444", band: "IROSUN",   strip: "#8EA9DB" },
  { n: 6,  name: "Òwónrín",   ab: "Òwó", code: "OOII", color: "#8b5cf6", band: "OWONRIN",  strip: "#70AD47" },
  { n: 7,  name: "Òbàrà",     ab: "Òbà", code: "IIIO", color: "#3b9eff", band: "OBARA",    strip: "#FFC000" },
  { n: 8,  name: "Òkànràn",   ab: "Òkà", code: "OIII", color: "#ec4899", band: "OKANRAN",  strip: "#FFE699" },
  { n: 9,  name: "Ògúndá",    ab: "Ògú", code: "IOOO", color: "#f0920c", band: "OGUNDA",   strip: "#548235" },
  { n: 10, name: "Òsá",       ab: "Òsá", code: "OOOI", color: "#6366f1", band: "OSA",      strip: "#C55A11" },
  { n: 11, name: "Ìká",       ab: "Ìká", code: "IIOI", color: "#14b8d4", band: "IKA",      strip: "#C5E0B4" },
  { n: 12, name: "Òtúrúpòn",  ab: "Òtú", code: "IOII", color: "#00c87c", band: "OTURUPON", strip: "#00B0F0" },
  { n: 13, name: "Òtúrá",     ab: "Òtú", code: "OOIO", color: "#ef4444", band: "OTURA",    strip: "#D6DCE4" },
  { n: 14, name: "Ìrètè",     ab: "Ìrè", code: "OIOO", color: "#8b5cf6", band: "IRETE",    strip: "#FCE4D6" },
  { n: 15, name: "Òsè",       ab: "Òsè", code: "IOIO", color: "#3b9eff", band: "OSE",      strip: "#DDEBF7" },
  { n: 16, name: "Òfún",      ab: "Òfú", code: "OIOI", color: "#ec4899", band: "OFUN",     strip: "#9DC3E6" },
];

function if2BuildBands() {
  const bands = [{ key: "meji", label: "MEJI", strip: "#4472C4", tiles: IF2_ODU.map((o) => ({ num: o.n, a: o, b: o })) }];
  let num = 17;
  for (let i = 0; i < 15; i++) {
    const x = IF2_ODU[i];
    const tiles = [];
    for (let j = i + 1; j < 16; j++) {
      const y = IF2_ODU[j];
      tiles.push({ num: num++, a: x, b: y });
      tiles.push({ num: num++, a: y, b: x });
    }
    bands.push({ key: x.band, label: x.band, strip: x.strip, tiles });
  }
  return bands; // 16 + 30 + 28 + … + 2 = 256 tiles
}

function if2TextOn(hex) {
  const v = parseInt(hex.slice(1), 16);
  const r = (v >> 16) & 255, g = (v >> 8) & 255, b = v & 255;
  return 0.299 * r + 0.587 * g + 0.114 * b > 150 ? "#14213d" : "#f5f7ff";
}

function if2Rgba(hex, a) {
  const v = parseInt(hex.slice(1), 16);
  return `rgba(${(v >> 16) & 255},${(v >> 8) & 255},${v & 255},${a})`;
}

function If2Glyph({ code, big }) {
  const chars = code.split("");
  return (
    <span className={big ? "if2-g if2-g-big" : "if2-g"}>
      {chars.map((c, k) => (
        <span key={k} className="if2-ch">{c}</span>
      ))}
    </span>
  );
}

function If2Tile({ t, filter }) {
  const meji = t.a === t.b;
  // Filters: 'self' = Self (Major), the 16 Méjì; 'dual' = Dual (Minor), the other 240.
  const faded = (filter === "self" && !meji) || (filter === "dual" && meji);
  const short = meji ? t.a.name : `${t.a.ab}-${t.b.ab}`;
  const full = meji ? `${t.a.name} Méjì` : `${t.a.name}-${t.b.name}`;
  const style = meji
    ? { color: t.a.color, background: "rgba(240,146,12,0.09)", borderColor: "rgba(240,146,12,0.38)" }
    : { color: t.a.color };
  return (
    <div className={faded ? "if2-tile if2-tile--faded" : "if2-tile"} style={style}
         title={`${t.num} · ${full} · ${meji ? "Self (Major)" : "Dual (Minor)"}`}>
      <span className="if2-num">{t.num}</span>
      <span className="if2-glyphs">
        <If2Glyph code={t.b.code} />
        <If2Glyph code={t.a.code} big />
      </span>
      <span className="if2-name">{short}</span>
    </div>
  );
}

function If2OduMark() {
  return (
    <div className="if2-mark" aria-hidden="true">
      <span className="if2-mark-word">256</span>
      <span className="if2-mark-word">ODU</span>
    </div>
  );
}

const IF2_CSS = `
.if2-root{container-type:inline-size;color:#eef2ff;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Inter,system-ui,sans-serif}
.if2-source{display:flex;flex-wrap:wrap;gap:4px 10px;align-items:baseline;justify-content:flex-end;text-align:right;
  font-size:10px;line-height:1.5;color:#8899bb;padding:8px 2px 10px}
.if2-source b{color:#eef2ff;font-weight:700}
.if2-source a{color:#f5c518;text-decoration:none;border-bottom:1px solid rgba(245,197,24,.4);white-space:nowrap}
.if2-source a:hover,.if2-source a:focus-visible{border-bottom-color:#f5c518;outline:none}
.if2-scroll{overflow-x:auto;padding-bottom:6px}
.if2-chart{--tw:max(36px,calc((100cqw - 28px - 3px - 29*2px - 2px)/30));display:flex;flex-direction:column;gap:6px;min-width:max-content}
.if2-band{display:flex;flex-direction:row-reverse;align-items:stretch;gap:3px}
.if2-strip{flex:0 0 28px;border-radius:3px;display:flex;flex-direction:column;align-items:center;justify-content:center;
  font-size:7px;font-weight:800;line-height:1.05;letter-spacing:.02em;padding:3px 0}
.if2-tiles{display:flex;flex-direction:row-reverse;gap:2px;border-top:3px solid;padding-top:3px}
.if2-tile{width:var(--tw);height:50px;box-sizing:border-box;display:flex;flex-direction:column;align-items:center;justify-content:center;
  padding:2px 1px;border-radius:4px;border:1px solid rgba(255,255,255,.07);background:rgba(255,255,255,.024);
  transition:background .12s,border-color .12s;cursor:default}
.if2-tile:hover{background:rgba(255,255,255,.07);border-color:currentColor}
.if2-tile{transition:background .12s,border-color .12s,opacity .2s}
.if2-tile--faded{opacity:.1}
.if2-num{font-size:6.76px;font-weight:700;line-height:1.1;font-variant-numeric:tabular-nums}
.if2-glyphs{display:flex;flex-direction:column;align-items:center;margin:1px 0}
.if2-g{display:flex;justify-content:center;font-size:6.76px;line-height:6.76px;font-weight:700;letter-spacing:-.26px}
.if2-g-big{font-size:10.14px;line-height:10.14px;font-weight:900;letter-spacing:0}
.if2-g-big .if2-ch+.if2-ch{margin-left:-2.23px}
.if2-name{font-size:6.24px;font-weight:600;line-height:1.1;white-space:nowrap;max-width:100%;overflow:hidden;text-overflow:ellipsis}
.if2-mark{margin-right:auto;align-self:center;display:flex;gap:22px;padding:0 28px}
.if2-mark-word{font-size:30px;font-weight:500;letter-spacing:.42em;color:#4472C4;padding:6px 0 6px .42em;
  border-top:6px solid #e8242a;border-bottom:6px solid #e8242a;line-height:1}
`;

function IfalibriumII({ filter = "all" } = {}) {
  const bands = React.useMemo(if2BuildBands, []);
  const scrollRef = React.useRef(null);
  React.useEffect(() => {
    // Right-to-left chart: when it is wider than the screen, start at the right edge (Méjì 1 / Ogbé side).
    const el = scrollRef.current;
    if (!el) return;
    const toRight = () => { el.scrollLeft = el.scrollWidth; };
    const raf = requestAnimationFrame(toRight);
    window.addEventListener("resize", toRight);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", toRight); };
  }, []);
  return (
    <div className="if2-root">
      <style>{IF2_CSS}</style>
      <div className="if2-source">
        <span><b>Source chart:</b> Image created by Dr. Will Coleman Ph.D., Oscar Daniel and Brad Ost (Available in appendix with Excel Spreadsheet).</span>
        <a href={IF2_SOURCE_URL} target="_blank" rel="noopener noreferrer">View the source chart on Atla LibGuides ↗</a>
      </div>
      <div className="if2-scroll" ref={scrollRef}>
        <div className="if2-chart">
          {bands.map((band) => (
            <div className="if2-band" key={band.key}>
              <div className="if2-strip" style={{ background: band.strip, color: if2TextOn(band.strip) }} title={band.label}>
                {band.label.split("").map((ch, k) => <span key={k}>{ch}</span>)}
              </div>
              <div className="if2-tiles" style={{ borderTopColor: band.strip }}>
                {band.tiles.map((t) => <If2Tile key={t.num} t={t} filter={filter} />)}
              </div>
              {band.key === "OGUNDA" && <If2OduMark />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

window.IfalibriumII = IfalibriumII;
