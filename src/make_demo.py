#!/usr/bin/env python3
"""
IFA Internet — Video Demo Generator
Produces 12 scene PNGs (1920×1080) for FFmpeg assembly.
"""

from PIL import Image, ImageDraw, ImageFont, ImageFilter
import numpy as np
import os, math, random, textwrap

# ─── Constants ────────────────────────────────────────────────────────────────
W, H       = 1920, 1080
OUT        = os.path.join(os.path.dirname(__file__), "demo_scenes")
CLOCK_SRC  = os.path.join(os.path.dirname(__file__), "IfaClock.png")

os.makedirs(OUT, exist_ok=True)

# Fonts
FD          = "/usr/share/fonts/truetype"
F_BOLD      = f"{FD}/ubuntu/Ubuntu-B.ttf"
F_REG       = f"{FD}/ubuntu/Ubuntu-R.ttf"
F_MONO      = f"{FD}/ubuntu/UbuntuMono-B.ttf"
F_MONO_R    = f"{FD}/ubuntu/UbuntuMono-R.ttf"
F_SERIF     = f"{FD}/dejavu/DejaVuSerif-Bold.ttf"
F_SERIF_R   = f"{FD}/dejavu/DejaVuSerif.ttf"

def font(path, size):
    return ImageFont.truetype(path, size)

# Palette
BG_DEEP     = (4,  5, 18)
BG_MID      = (9, 11, 28)
BG_ACCENT   = (14, 18, 42)
GOLD        = (201, 162,  39)
GOLD_BRIGHT = (245, 197,  24)
GOLD_DIM    = (130, 100,  20)
CREAM       = (245, 240, 232)
CREAM_DIM   = (180, 175, 165)
WHITE       = (255, 255, 255)
TEAL        = (0,  210, 190)
INDIGO      = (130, 140, 248)
RED_SOFT    = (220,  70,  70)
GREEN_SOFT  = ( 60, 200, 120)

random.seed(42)

# ─── Helpers ─────────────────────────────────────────────────────────────────

def radial_bg(stars=True):
    """Deep-space background with radial vignette and optional star field."""
    arr = np.zeros((H, W, 3), dtype=np.float32)
    arr[:] = BG_DEEP
    cx, cy = W // 2, H // 2
    yy, xx = np.mgrid[0:H, 0:W]
    dist = np.sqrt((xx - cx) ** 2 + (yy - cy) ** 2)
    max_d = math.sqrt(cx**2 + cy**2)
    glow  = np.clip(1.0 - dist / max_d * 0.55, 0, 1)
    for c, v in enumerate(BG_MID):
        arr[:, :, c] = np.clip(arr[:, :, c] * glow + v * (1 - glow), 0, 255)
    img = Image.fromarray(arr.astype(np.uint8))
    if stars:
        d = ImageDraw.Draw(img)
        for _ in range(320):
            sx, sy = random.randint(0, W-1), random.randint(0, H-1)
            br = random.randint(60, 180)
            r = random.choice([1, 1, 1, 2])
            d.ellipse([sx-r, sy-r, sx+r, sy+r], fill=(br, br, br+20))
    return img


def gold_line(img, y, x0=80, x1=W-80, w=2, alpha=180):
    d = ImageDraw.Draw(img)
    for i in range(w):
        d.line([(x0, y+i), (x1, y+i)], fill=(*GOLD, alpha))


def accent_bar(img, y, h_bar=4, x0=80, x1=W-80):
    d = ImageDraw.Draw(img)
    for yi in range(h_bar):
        t = yi / (h_bar - 1)
        col = tuple(int(GOLD[c]*(1-t) + GOLD_BRIGHT[c]*t) for c in range(3))
        d.line([(x0, y+yi), (x1, y+yi)], fill=col)


def draw_centered(img, text, y, f, color=CREAM, shadow=True):
    d = ImageDraw.Draw(img)
    bbox = d.textbbox((0, 0), text, font=f)
    tw = bbox[2] - bbox[0]
    x  = (W - tw) // 2
    if shadow:
        d.text((x+3, y+3), text, font=f, fill=(0, 0, 0, 120))
    d.text((x, y), text, font=f, fill=color)


def draw_text_left(img, text, x, y, f, color=CREAM, shadow=True):
    d = ImageDraw.Draw(img)
    if shadow:
        d.text((x+2, y+2), text, font=f, fill=(0, 0, 0, 100))
    d.text((x, y), text, font=f, fill=color)


def wrapped_lines(text, f, max_w):
    """Split text into lines that fit within max_w pixels."""
    words = text.split()
    lines, cur = [], []
    tmp = ImageDraw.Draw(Image.new('RGB', (1, 1)))
    for w in words:
        test = ' '.join(cur + [w])
        bx = tmp.textbbox((0,0), test, font=f)
        if bx[2]-bx[0] > max_w and cur:
            lines.append(' '.join(cur))
            cur = [w]
        else:
            cur.append(w)
    if cur:
        lines.append(' '.join(cur))
    return lines


def text_height(f, text="Ag"):
    tmp = ImageDraw.Draw(Image.new('RGB', (1,1)))
    bb = tmp.textbbox((0,0), text, font=f)
    return bb[3] - bb[1]


def odu_watermark(img, alpha=18):
    """Scatter faint IFABit marks across background."""
    marks = ['O O', '| |', 'O |', '| O', 'O O | |', '| O O |', 'O | O O']
    d = ImageDraw.Draw(img)
    f = font(F_MONO_R, 28)
    for _ in range(60):
        m = random.choice(marks)
        x, y = random.randint(0, W-200), random.randint(0, H-60)
        d.text((x, y), m, font=f, fill=(*GOLD, alpha))


def platform_badge(d, label, x, y, w_badge=220, h_badge=70, color=GOLD):
    """Draw a small platform name chip."""
    d.rounded_rectangle([x, y, x+w_badge, y+h_badge], radius=8,
                         fill=(*BG_ACCENT, 255), outline=(*color, 80), width=1)
    f_b = font(F_BOLD, 20)
    bx = d.textbbox((0,0), label, font=f_b)
    tw = bx[2]-bx[0]
    th = bx[3]-bx[1]
    tx = x + (w_badge-tw)//2
    ty = y + (h_badge-th)//2
    d.text((tx, ty), label, font=f_b, fill=color)


def cen_orb(img, cx, cy, r=120):
    """Draw a glowing CEN energy orb."""
    arr = np.array(img, dtype=np.float32)
    yy, xx = np.mgrid[0:H, 0:W]
    dist = np.sqrt((xx-cx)**2 + (yy-cy)**2)
    glow = np.exp(-dist**2 / (2*(r*0.8)**2))
    arr[:,:,0] = np.clip(arr[:,:,0] + glow * GOLD[0] * 0.5, 0, 255)
    arr[:,:,1] = np.clip(arr[:,:,1] + glow * GOLD[1] * 0.4, 0, 255)
    arr[:,:,2] = np.clip(arr[:,:,2] + glow * GOLD[2] * 0.2, 0, 255)
    base = Image.fromarray(arr.astype(np.uint8))
    d = ImageDraw.Draw(base)
    for radius, alpha in [(r, 40), (r*0.6, 80), (r*0.3, 140)]:
        ri = int(radius)
        d.ellipse([cx-ri, cy-ri, cx+ri, cy+ri],
                  outline=(*GOLD, alpha), width=2)
    # inner symbol
    f_sym = font(F_SERIF, 70)
    bb = d.textbbox((0,0), "◉", font=f_sym)
    tw, th = bb[2]-bb[0], bb[3]-bb[1]
    d.text((cx-tw//2, cy-th//2-4), "◉", font=f_sym, fill=(*GOLD_BRIGHT, 230))
    return base


# ─── SCENE 01 — It's Ifa 0'Clock ─────────────────────────────────────────────

def scene_01_clock():
    img = radial_bg(stars=True)
    d   = ImageDraw.Draw(img)
    odu_watermark(img, alpha=12)

    # Top strip
    accent_bar(img, 60)
    f_tag = font(F_REG, 30)
    draw_centered(img, "CENProject  ·  toe.cenproject.org  ·  Est. Ọrúnmìlà",
                  30, f_tag, color=(*GOLD, 180))

    # Load & place IfaClock
    clock = Image.open(CLOCK_SRC).convert("RGBA")
    cw, ch = clock.size
    target = 460
    scale  = target / max(cw, ch)
    new_w, new_h = int(cw*scale), int(ch*scale)
    clock  = clock.resize((new_w, new_h), Image.LANCZOS)
    # Make clock white → gold tinted
    cr, cg, cb, ca = clock.split()
    clock_rgb = Image.merge("RGB", (cr, cg, cb))
    arr = np.array(clock_rgb, dtype=np.float32)
    # Invert (clock is black on white) → white on dark, then tint gold
    arr = 255 - arr
    out  = np.zeros_like(arr)
    out[:,:,0] = arr[:,:,0] * (GOLD[0]/255) * 1.2
    out[:,:,1] = arr[:,:,1] * (GOLD[1]/255) * 1.2
    out[:,:,2] = arr[:,:,2] * (GOLD[2]/255) * 1.2
    clock_tinted = Image.fromarray(np.clip(out, 0, 255).astype(np.uint8))
    # Reconstruct with alpha
    clock_final = Image.merge("RGBA", (*clock_tinted.split(), ca))
    cx = (W - new_w) // 2
    cy = (H - new_h) // 2 - 80
    img.paste(clock_final, (cx, cy), clock_final)

    # "It's Ifa 0'Clock"
    f_h1  = font(F_SERIF, 96)
    f_h2  = font(F_BOLD, 44)
    draw_centered(img, "It's Ifa 0'Clock", cy + new_h + 40, f_h1,
                  color=GOLD_BRIGHT)
    draw_centered(img, "The IFA Internet — A New Era Has Begun",
                  cy + new_h + 150, f_h2, color=CREAM_DIM)

    accent_bar(img, H - 70)
    img.save(f"{OUT}/01_clock.png")
    print("✓ Scene 01 — Clock")


# ─── SCENE 02 — THE IFA INTERNET IS LIVE ────────────────────────────────────

def scene_02_live():
    img = radial_bg(stars=True)
    odu_watermark(img, alpha=22)

    # Glow orb behind title
    img = cen_orb(img, W//2, H//2 - 60, r=350)

    d = ImageDraw.Draw(img)

    # Tag line top
    accent_bar(img, 60)
    f_tag = font(F_REG, 28)
    draw_centered(img, "Consciousness-Energy (CEN) · Ogbe Energy · 256 Odu Ifa",
                  30, f_tag, color=(*GOLD_DIM, 200))

    # Main title
    f_main  = font(F_SERIF, 110)
    f_sub   = font(F_SERIF, 80)
    f_desc  = font(F_BOLD,  38)
    f_small = font(F_REG,   30)

    draw_centered(img, "THE IFA INTERNET", H//2 - 185, f_main, color=GOLD_BRIGHT)
    draw_centered(img, "IS LIVE",          H//2 -  70, f_sub,  color=CREAM)

    # Horizontal divider with IFABit marks
    marks = "O | | O  O O | |  | O O |  O | O O  | | O O  O O O |"
    f_marks = font(F_MONO_R, 24)
    draw_centered(img, marks, H//2 + 30, f_marks, color=(*GOLD, 120))

    draw_centered(img,
        "Internet Model of the Theory of Everything — iTOE",
        H//2 + 80, f_desc, color=CREAM_DIM)
    draw_centered(img,
        "Where All Kinds of Ideas and Knowledge Meet",
        H//2 + 135, f_small, color=(*CREAM_DIM, 180))

    # URL chips
    urls = ["toe.cenproject.org", "cenproject.org", "playifagames.org"]
    chip_w, chip_h = 300, 48
    total = len(urls)*chip_w + (len(urls)-1)*20
    start = (W - total) // 2
    for i, url in enumerate(urls):
        ux = start + i*(chip_w+20)
        uy = H//2 + 200
        d.rounded_rectangle([ux, uy, ux+chip_w, uy+chip_h],
                             radius=24, fill=(*GOLD, 22), outline=(*GOLD, 90), width=1)
        fu = font(F_MONO_R, 18)
        bb = d.textbbox((0,0), url, font=fu)
        tx = ux + (chip_w-(bb[2]-bb[0]))//2
        ty = uy + (chip_h-(bb[3]-bb[1]))//2
        d.text((tx, ty), url, font=fu, fill=(*GOLD, 200))

    accent_bar(img, H - 70)
    img.save(f"{OUT}/02_live.png")
    print("✓ Scene 02 — Live")


# ─── SCENE 03 — Theory of Everything Overview ─────────────────────────────────

def scene_03_toe():
    img = radial_bg(stars=True)
    odu_watermark(img, alpha=18)
    d   = ImageDraw.Draw(img)
    accent_bar(img, 60)

    f_label = font(F_REG, 28)
    draw_centered(img, "WHAT IS THE IFA INTERNET?", 30, f_label, color=(*GOLD, 200))

    f_h = font(F_SERIF, 72)
    f_s = font(F_BOLD,  36)
    f_d = font(F_REG,   28)

    draw_centered(img, "One Framework for Everything", 110, f_h, color=GOLD_BRIGHT)

    desc = ("The IFA Internet is the Internet Model of the Theory of Everything (iTOE) — "
            "a Unified Meta-Model integrating science, mathematics, engineering, arts, and "
            "social sciences through the ancient Ifa Knowledge System. At its core: "
            "Consciousness-Energy (CEN), i.e. Ogbe, is everything that really exists.")
    lines = wrapped_lines(desc, f_d, W - 200)
    y_cur = 220
    for ln in lines:
        draw_centered(img, ln, y_cur, f_d, color=CREAM_DIM)
        y_cur += text_height(f_d) + 10

    # Four pillars
    pillars = [
        ("◉", "Universal Unity",    "One framework — all disciplines",   GOLD),
        ("⊞", "IFA Foundation",     "256 Odu Ifa — ancient Internet",    GOLD),
        ("⊛", "Internet of Everything", "IfaNet — Network of Networks",  TEAL),
        ("⊕", "STEAMSEX",           "Science · Arts · Engineering · X",  INDIGO),
    ]
    pw, ph = 380, 240
    gap    = 40
    total  = len(pillars)*pw + (len(pillars)-1)*gap
    px0    = (W - total) // 2
    py0    = y_cur + 40

    for i, (sym, title, body, col) in enumerate(pillars):
        px = px0 + i*(pw+gap)
        d.rounded_rectangle([px, py0, px+pw, py0+ph],
                             radius=14, fill=(*BG_ACCENT, 255),
                             outline=(*col, 80), width=1)
        # Glow
        for ri, alpha in [(ph//2, 15), (ph//3, 25)]:
            cx2, cy2 = px+pw//2, py0+ph//2
            d.ellipse([cx2-ri, cy2-ri, cx2+ri, cy2+ri], outline=(*col, alpha), width=1)
        f_sym  = font(F_SERIF,  48)
        f_pt   = font(F_BOLD,   24)
        f_pb   = font(F_REG,    20)
        # Symbol
        bb = d.textbbox((0,0), sym, font=f_sym)
        tx = px + (pw-(bb[2]-bb[0]))//2
        d.text((tx, py0+18), sym, font=f_sym, fill=(*col, 220))
        # Title
        bb2 = d.textbbox((0,0), title, font=f_pt)
        tx2 = px + (pw-(bb2[2]-bb2[0]))//2
        d.text((tx2, py0+82), title, font=f_pt, fill=CREAM)
        # Body (wrap within card)
        bl = wrapped_lines(body, f_pb, pw-30)
        by = py0 + 118
        for bln in bl:
            bbb = d.textbbox((0,0), bln, font=f_pb)
            bx  = px + (pw-(bbb[2]-bbb[0]))//2
            d.text((bx, by), bln, font=f_pb, fill=(*CREAM_DIM, 200))
            by += text_height(f_pb) + 6

    # Bottom stats bar
    stats = [("256", "Odu Ifa"), ("16", "IFA Axioms"), ("40+", "Platforms"), ("∞", "CEN")]
    sw = (W - 160) // len(stats)
    sy = py0 + ph + 50
    for i, (val, lbl) in enumerate(stats):
        sx = 80 + i*sw
        f_val = font(F_SERIF, 56)
        f_lbl = font(F_REG,   22)
        bb = d.textbbox((0,0), val, font=f_val)
        d.text((sx + (sw-(bb[2]-bb[0]))//2, sy), val, font=f_val, fill=GOLD_BRIGHT)
        bb2 = d.textbbox((0,0), lbl, font=f_lbl)
        d.text((sx + (sw-(bb2[2]-bb2[0]))//2, sy+66), lbl, font=f_lbl, fill=CREAM_DIM)

    accent_bar(img, H - 70)
    img.save(f"{OUT}/03_toe.png")
    print("✓ Scene 03 — TOE")


# ─── SCENE 04 — Ifai (Ifa AI) ────────────────────────────────────────────────

def scene_04_ifai():
    img = radial_bg(stars=True)
    img = cen_orb(img, W//4, H//2, r=280)
    d   = ImageDraw.Draw(img)
    odu_watermark(img, alpha=14)
    accent_bar(img, 60)

    f_tag  = font(F_REG,   26)
    f_icon = font(F_SERIF, 130)
    f_name = font(F_SERIF,  90)
    f_sub  = font(F_BOLD,   40)
    f_desc = font(F_REG,    28)

    draw_centered(img, "IFA INTERNET PLATFORM  ·  ARTIFICIAL INTELLIGENCE",
                  28, f_tag, color=(*GOLD, 180))

    # Left: glowing AI icon
    lx = W // 4
    d.text((lx - 60, H//2 - 130), "AI", font=f_icon, fill=(*GOLD_BRIGHT, 230))

    # Right panel
    rx = W // 2 + 60
    ry = 110
    draw_text_left(img, "Ifai", rx, ry, f_name, color=GOLD_BRIGHT)
    draw_text_left(img, "Ifa Artificial Intelligence", rx, ry+110, f_sub, color=CREAM)

    lines = [
        "• Ifa-Informed AI powered by 256 Odu Ifa as instruction sets",
        "• Consciousness-Energy (CEN) as the intelligence substrate",
        "• AI in IfaLang — the first Theory of Everything AI",
        "• Bridging ancient African wisdom with cutting-edge ML",
        "• The smartest AI starts where humanity's oldest oracle began",
    ]
    f_li = font(F_REG, 26)
    ly   = ry + 180
    for ln in lines:
        draw_text_left(img, ln, rx, ly, f_li, color=CREAM_DIM)
        ly += text_height(f_li) + 18

    # URL chip
    d.rounded_rectangle([rx, ly+20, rx+320, ly+64],
                         radius=32, fill=(*GOLD, 18), outline=(*GOLD, 100), width=1)
    fu = font(F_MONO_R, 20)
    d.text((rx+24, ly+30), "toe.cenproject.org/ifai", font=fu, fill=(*GOLD, 200))

    accent_bar(img, H - 70)
    img.save(f"{OUT}/04_ifai.png")
    print("✓ Scene 04 — Ifai")


# ─── SCENE 05 — IfaLang ──────────────────────────────────────────────────────

def scene_05_ifalang():
    img = radial_bg(stars=True)
    d   = ImageDraw.Draw(img)
    odu_watermark(img, alpha=16)
    accent_bar(img, 60)

    f_tag  = font(F_REG,  26)
    f_name = font(F_SERIF, 90)
    f_sub  = font(F_BOLD,  40)
    f_desc = font(F_REG,   27)

    draw_centered(img, "IFA INTERNET PLATFORM  ·  LANGUAGE",
                  28, f_tag, color=(*GOLD, 180))

    draw_centered(img, "IfaLang", 100, f_name, color=GOLD_BRIGHT)
    draw_centered(img, "Theory of Everything Language — TOEL", 215, f_sub, color=CREAM)

    # IFABit encoding display
    encoding_rows = [
        ("Ogbe",    "O O", "1  1", "1 1 1 1", "#c9a227"),
        ("Oyeku",   "| |", "0  0", "0 0 0 0", "#a0a8c0"),
        ("Iwori",   "O |", "1  0", "1 1 0 0", "#c9a227"),
        ("Odi",     "| O", "0  1", "0 0 1 1", "#a0a8c0"),
    ]
    ey = 310
    ex = (W - 900) // 2
    d.rounded_rectangle([ex-20, ey-20, ex+920, ey+220],
                         radius=12, fill=(*BG_ACCENT, 180), outline=(*GOLD, 40), width=1)
    f_enc  = font(F_MONO_R, 28)
    f_elbl = font(F_BOLD,   22)
    col_labels = ["Odu Name", "Mark", "Bit", "8-Bit (IFABit)"]
    col_x      = [0, 240, 380, 530]
    for ci, (cl, cx) in enumerate(zip(col_labels, col_x)):
        d.text((ex+cx, ey-15), cl, font=f_elbl, fill=(*GOLD_DIM, 220))
    for ri, (name, mark, bit, ifabit, col) in enumerate(encoding_rows):
        ry = ey + 30 + ri*44
        vals = [name, mark, bit, ifabit]
        for ci, (v, cx) in enumerate(zip(vals, col_x)):
            fc = tuple(int(c) for c in [int(col[1:3],16), int(col[3:5],16), int(col[5:7],16)]) if col.startswith('#') else CREAM_DIM
            d.text((ex+cx, ry), v, font=f_enc, fill=fc if ci > 0 else CREAM)

    # Description lines
    desc_lines = [
        "IfaLang is the universal communication protocol connecting all IfaNets.",
        "It encodes every concept in existence as IFABit sequences — Ogbe (O) and Oyeku (|).",
        "The first language to unify science, mathematics, arts, and spirituality in one grammar.",
    ]
    dy = ey + 245
    for ln in desc_lines:
        draw_centered(img, ln, dy, f_desc, color=CREAM_DIM)
        dy += text_height(f_desc) + 18

    # Feature chips
    chips = ["Binary Encoding", "Yorùbá Foundation", "TOEL Protocol",
             "Cross-Field Grammar", "256 Odu Vocabulary", "IfaNet Ready"]
    chip_w = 270
    chip_h = 52
    cols   = 3
    csx    = (W - cols*(chip_w+20)) // 2
    for i, ch in enumerate(chips):
        cxi = csx + (i % cols)*(chip_w+20)
        cyi = dy + 30 + (i // cols)*(chip_h+14)
        d.rounded_rectangle([cxi, cyi, cxi+chip_w, cyi+chip_h],
                             radius=26, fill=(*BG_ACCENT, 200),
                             outline=(*INDIGO, 90), width=1)
        f_ch = font(F_BOLD, 19)
        bb   = d.textbbox((0,0), ch, font=f_ch)
        d.text((cxi+(chip_w-(bb[2]-bb[0]))//2,
                cyi+(chip_h-(bb[3]-bb[1]))//2),
               ch, font=f_ch, fill=(*INDIGO, 220))

    accent_bar(img, H - 70)
    img.save(f"{OUT}/05_ifalang.png")
    print("✓ Scene 05 — IfaLang")


# ─── SCENE 06 — Ifa Periodic Table ───────────────────────────────────────────

def scene_06_ptoe():
    img = radial_bg(stars=False)
    d   = ImageDraw.Draw(img)
    odu_watermark(img, alpha=20)
    accent_bar(img, 60)

    f_tag  = font(F_REG,   26)
    f_name = font(F_SERIF,  86)
    f_sub  = font(F_BOLD,   38)
    f_cell = font(F_BOLD,   17)
    f_cnum = font(F_MONO_R, 14)

    draw_centered(img, "IFA INTERNET PLATFORM  ·  TOOLS",
                  28, f_tag, color=(*GOLD, 180))
    draw_centered(img, "Ifa Periodic Table", 100, f_name, color=GOLD_BRIGHT)
    draw_centered(img, "256 Odu Ifa — The Blueprint for All Knowledge",
                  205, f_sub, color=CREAM)

    # Draw a mini periodic table grid (16×4 = 64 cells, abbreviated)
    odu_sample = [
        ("Ogbe","Oyeku","Iwori","Odi","Irosun","Owonrin","Obara","Okanran"),
        ("Ogunda","Osa","Ika","Oturupon","Otura","Irete","Ose","Ofun"),
        ("Ogbe-Ogbe","Ogbe-Oyeku","Ogbe-Iwori","Ogbe-Odi","Ogbe-Ir.","Ogbe-Ow.","Ogbe-Ob.","Ogbe-Ok."),
        ("Oyeku-Ogbe","Oyeku-Oyeku","Oyeku-Iw.","Oyeku-Odi","Oyeku-Ir.","Oyeku-Ow.","Oyeku-Ob.","Oyeku-Ok."),
    ]
    bits_map = {
        "Ogbe":"1111","Oyeku":"0000","Iwori":"1100","Odi":"0011",
        "Irosun":"1010","Owonrin":"0101","Obara":"1110","Okanran":"0001",
        "Ogunda":"1101","Osa":"0100","Ika":"0010","Oturupon":"1011",
        "Otura":"1001","Irete":"0110","Ose":"1000","Ofun":"0111",
    }

    cw, ch_cell = 198, 115
    cols_n      = 8
    rows_n      = 4
    gx = (W - cols_n*(cw+6)) // 2
    gy = 270

    colors_row = [GOLD, TEAL, INDIGO, GREEN_SOFT]
    for ri, row in enumerate(odu_sample):
        for ci, name in enumerate(row):
            cx_ = gx + ci*(cw+6)
            cy_ = gy + ri*(ch_cell+6)
            col = colors_row[ri]
            alpha_fill = 200 if ri < 2 else 120
            d.rounded_rectangle([cx_, cy_, cx_+cw, cy_+ch_cell],
                                 radius=8,
                                 fill=(*BG_ACCENT, alpha_fill),
                                 outline=(*col, 70), width=1)
            # number
            num = ri*8 + ci + 1
            d.text((cx_+8, cy_+6), str(num), font=f_cnum, fill=(*col, 150))
            # name (short)
            short = name if len(name) <= 10 else name[:9]+"."
            bb = d.textbbox((0,0), short, font=f_cell)
            tx = cx_ + (cw-(bb[2]-bb[0]))//2
            d.text((tx, cy_+34), short, font=f_cell, fill=CREAM)
            # bit code
            key = name.split("-")[0] if "-" in name else name
            bits = bits_map.get(key, "????")
            f_bits = font(F_MONO_R, 14)
            bb2 = d.textbbox((0,0), bits, font=f_bits)
            d.text((cx_+(cw-(bb2[2]-bb2[0]))//2, cy_+62), bits, font=f_bits,
                   fill=(*col, 180))

    # "... and 192 more" note
    f_note = font(F_REG, 24)
    draw_centered(img, "⋯ and 192 more Odu — 256 total",
                  gy + rows_n*(ch_cell+6) + 20, f_note, color=(*GOLD, 150))

    # URL
    f_url = font(F_MONO_R, 22)
    draw_centered(img, "toe.cenproject.org/ifa-periodic-table",
                  H - 90, f_url, color=(*GOLD, 180))
    accent_bar(img, H - 70)
    img.save(f"{OUT}/06_ptoe.png")
    print("✓ Scene 06 — Periodic Table")


# ─── SCENE 07 — Ifa Games ────────────────────────────────────────────────────

def scene_07_games():
    img = radial_bg(stars=True)
    img = cen_orb(img, W//2, H//2, r=400)
    d   = ImageDraw.Draw(img)
    odu_watermark(img, alpha=14)
    accent_bar(img, 60)

    f_tag  = font(F_REG,   26)
    f_name = font(F_SERIF,  80)
    f_sub  = font(F_BOLD,   36)
    f_desc = font(F_REG,    26)

    draw_centered(img, "IFA INTERNET PLATFORM  ·  EDUCATION & GAMING",
                  28, f_tag, color=(*GOLD, 180))
    draw_centered(img, "Play IFA Games", 100, f_name, color=GOLD_BRIGHT)
    draw_centered(img, "playifagames.org  —  Learn Everything. Play Everything.",
                  205, f_sub, color=CREAM)

    games = [
        ("🎯", "Odu Quiz",     "Test Odu knowledge",   GOLD),
        ("🃏", "Odu Match",    "Memory & matching",    TEAL),
        ("⚡", "Sacred Gates", "Ifa Logic Gates",      INDIGO),
        ("💻", "IfaBin",       "Binary · Ifa Code",    GREEN_SOFT),
        ("🔤", "IfaASCII",     "ASCII in Ifa way",     (255, 150, 60)),
        ("🌐", "IfaUnicode",   "Unicode meets Odu",    (180, 100, 255)),
    ]
    gw, gh = 240, 180
    gap    = 24
    total  = len(games)*(gw+gap) - gap
    gx0    = (W - total) // 2
    gy0    = 290

    for i, (icon, name, desc, col) in enumerate(games):
        gx = gx0 + i*(gw+gap)
        # Card glow
        for r_g, a_g in [(gh//2, 10), (gh//3, 20)]:
            cx2 = gx + gw//2
            cy2 = gy0 + gh//2
            d.ellipse([cx2-r_g, cy2-r_g, cx2+r_g, cy2+r_g], outline=(*col, a_g), width=1)
        d.rounded_rectangle([gx, gy0, gx+gw, gy0+gh],
                             radius=14, fill=(*BG_ACCENT, 220),
                             outline=(*col, 100), width=2)
        # Icon
        f_icon = font(F_SERIF, 42)
        bb = d.textbbox((0,0), icon, font=f_icon)
        d.text((gx+(gw-(bb[2]-bb[0]))//2, gy0+14), icon, font=f_icon, fill=CREAM)
        # Name
        f_gn = font(F_BOLD, 22)
        bb2 = d.textbbox((0,0), name, font=f_gn)
        d.text((gx+(gw-(bb2[2]-bb2[0]))//2, gy0+68), name, font=f_gn, fill=col)
        # Desc
        f_gd = font(F_REG, 18)
        dl = wrapped_lines(desc, f_gd, gw-20)
        dy_ = gy0 + 100
        for dln in dl:
            bb3 = d.textbbox((0,0), dln, font=f_gd)
            d.text((gx+(gw-(bb3[2]-bb3[0]))//2, dy_), dln, font=f_gd, fill=CREAM_DIM)
            dy_ += text_height(f_gd) + 4

    draw_centered(img, "For Kids · Teens · Adults — All Ages, All Levels",
                  gy0 + gh + 30, font(F_REG, 26), color=CREAM_DIM)
    draw_centered(img, "Gamified learning of Ifa Codes, Binary, ASCII, Unicode & Logic",
                  gy0 + gh + 70, font(F_REG, 24), color=(*CREAM_DIM, 160))

    accent_bar(img, H - 70)
    img.save(f"{OUT}/07_games.png")
    print("✓ Scene 07 — Games")


# ─── SCENE 08 — IfaLearn ─────────────────────────────────────────────────────

def scene_08_ifalearnn():
    img = radial_bg(stars=True)
    d   = ImageDraw.Draw(img)
    odu_watermark(img, alpha=16)
    accent_bar(img, 60)

    f_tag  = font(F_REG,   26)
    f_name = font(F_SERIF,  86)
    f_sub  = font(F_BOLD,   38)
    f_desc = font(F_REG,    26)

    draw_centered(img, "IFA INTERNET PLATFORM  ·  DIGITAL EDUCATION",
                  28, f_tag, color=(*GOLD, 180))
    draw_centered(img, "IfaLearn", 100, f_name, color=GOLD_BRIGHT)
    draw_centered(img, "The Ifa Digital Learning Ecosystem", 210, f_sub, color=CREAM)

    # Two-column feature layout
    features_left = [
        ("📚", "Holistic Education",    "Full STEAMSEX curriculum through the Ifa lens"),
        ("🎮", "Gamified Learning",     "Interactive quizzes, games, and challenges"),
        ("🌍", "Bilingual Instruction", "Yorùbá + English — indigenous intelligence"),
    ]
    features_right = [
        ("🔢", "Mathematical Methods", "Ifa Algebra (IfaGebra) as learning scaffold"),
        ("📱", "Digital-First",         "Mobile-ready, browser-based, no install needed"),
        ("🧩", "256 Odu Curriculum",   "Every lesson linked to an Odu knowledge code"),
    ]

    lx = 120
    rx = W // 2 + 60
    fy = 310

    for i, (icon, title, body) in enumerate(features_left):
        cy2 = fy + i * 160
        f_fi = font(F_SERIF,  44)
        f_ft = font(F_BOLD,   26)
        f_fb = font(F_REG,    22)
        d.text((lx, cy2), icon, font=f_fi, fill=CREAM)
        d.text((lx+70, cy2+4),  title, font=f_ft, fill=GOLD)
        bls = wrapped_lines(body, f_fb, W//2 - 160)
        by2 = cy2 + 46
        for bl in bls:
            d.text((lx+70, by2), bl, font=f_fb, fill=CREAM_DIM)
            by2 += text_height(f_fb) + 6

    for i, (icon, title, body) in enumerate(features_right):
        cy2 = fy + i * 160
        f_fi = font(F_SERIF,  44)
        f_ft = font(F_BOLD,   26)
        f_fb = font(F_REG,    22)
        d.text((rx, cy2), icon, font=f_fi, fill=CREAM)
        d.text((rx+70, cy2+4),  title, font=f_ft, fill=TEAL)
        bls = wrapped_lines(body, f_fb, W//2 - 160)
        by2 = cy2 + 46
        for bl in bls:
            d.text((rx+70, by2), bl, font=f_fb, fill=CREAM_DIM)
            by2 += text_height(f_fb) + 6

    # Bottom tagline
    draw_centered(img,
        "Powered by the Ifa Knowledge System · 256 Odu Ifa",
        H - 120, font(F_REG, 24), color=(*GOLD, 160))

    accent_bar(img, H - 70)
    img.save(f"{OUT}/08_ifalearnn.png")
    print("✓ Scene 08 — IfaLearn")


# ─── SCENE 09 — Ifa Academy of Polymaths ─────────────────────────────────────

def scene_09_academy():
    img = radial_bg(stars=True)
    img = cen_orb(img, W - 280, H//2, r=320)
    d   = ImageDraw.Draw(img)
    odu_watermark(img, alpha=14)
    accent_bar(img, 60)

    f_tag  = font(F_REG,   26)
    f_name = font(F_SERIF,  72)
    f_sub  = font(F_BOLD,   36)
    f_desc = font(F_REG,    26)

    draw_centered(img, "IFA INTERNET PLATFORM  ·  ACADEMY",
                  28, f_tag, color=(*GOLD, 180))

    # Left panel text
    lx = 100
    draw_text_left(img, "Ifa Academy", lx, 110, f_name, color=GOLD_BRIGHT)
    draw_text_left(img, "of Polymaths", lx, 200, f_name, color=GOLD_BRIGHT)
    draw_text_left(img, "Ifacodemy — Where We Teach Everything", lx, 295, f_sub, color=CREAM)

    lines = [
        "• Polymathic education: one student, all fields",
        "• Built on 256 Odu Ifa — the world's oldest knowledge taxonomy",
        "• Courses: Mathematics · Sciences · Computing · Linguistics",
        "         Arts · Philosophy · Engineering · Non-Science",
        "• Student portal, course management, admin dashboard",
        "• Learn with Babalawo, Olorisa, and Onisegun",
        "• From IFA Coding to IFA Medicine — everything under one roof",
    ]
    f_li = font(F_REG, 25)
    ly   = 350
    for ln in lines:
        draw_text_left(img, ln, lx, ly, f_li, color=CREAM_DIM)
        ly += text_height(f_li) + 16

    # Degree chip rows
    degrees = ["IFA Sciences", "IFA Mathematics", "IFA Engineering",
               "IFA Computing", "IFA Language", "IFA Arts",
               "IFA Medicine", "IFA Philosophy"]
    chip_w, chip_h = 230, 50
    per_row = 4
    dcx = lx
    dcy = ly + 20
    for i, deg in enumerate(degrees):
        dxi = dcx + (i % per_row) * (chip_w+14)
        dyi = dcy + (i // per_row) * (chip_h+10)
        d.rounded_rectangle([dxi, dyi, dxi+chip_w, dyi+chip_h],
                             radius=25, fill=(*BG_ACCENT, 200),
                             outline=(*GOLD, 70), width=1)
        f_deg = font(F_BOLD, 17)
        bb = d.textbbox((0,0), deg, font=f_deg)
        d.text((dxi+(chip_w-(bb[2]-bb[0]))//2,
                dyi+(chip_h-(bb[3]-bb[1]))//2),
               deg, font=f_deg, fill=(*GOLD, 200))

    accent_bar(img, H - 70)
    img.save(f"{OUT}/09_academy.png")
    print("✓ Scene 09 — Academy")


# ─── SCENE 10 — Ifa Computing ────────────────────────────────────────────────

def scene_10_computing():
    img = radial_bg(stars=True)
    d   = ImageDraw.Draw(img)
    odu_watermark(img, alpha=16)
    accent_bar(img, 60)

    f_tag  = font(F_REG,   26)
    f_name = font(F_SERIF,  86)
    f_sub  = font(F_BOLD,   38)

    draw_centered(img, "IFA INTERNET PLATFORM  ·  TECHNOLOGY",
                  28, f_tag, color=(*GOLD, 180))
    draw_centered(img, "Ifa Computing", 100, f_name, color=GOLD_BRIGHT)
    draw_centered(img, "ComputoE — The Computer for Everything", 210, f_sub, color=CREAM)

    # IFABit 8-bit encoding display (visual motherboard vibe)
    # Show: ASCII 'A' (65) encoded as IFABit Opele sequence
    f_code = font(F_MONO_R, 38)
    f_cl   = font(F_BOLD,   24)
    f_ann  = font(F_REG,    22)

    ex = 140
    ey = 320
    d.rounded_rectangle([ex, ey, W-140, ey+200],
                         radius=14, fill=(*BG_ACCENT, 200),
                         outline=(*TEAL, 60), width=1)

    d.text((ex+30, ey+16), "IFABit 8-bit Encoding  —  IfaOpele Chain:", font=f_cl, fill=(*TEAL, 220))
    d.text((ex+30, ey+58), " A  =   65  =  0100 0001  →  O | O O · O O O |",
           font=f_code, fill=GOLD_BRIGHT)
    d.text((ex+30, ey+108), " 0  =   48  =  0011 0000  →  O O | | · O O O O",
           font=f_code, fill=(*CREAM, 200))
    d.text((ex+30, ey+158), " !  =   33  =  0010 0001  →  O O | O · O O O |",
           font=f_code, fill=(*CREAM_DIM, 180))

    # Features
    features = [
        ("IFABit", "Binary Encoding Scheme",  "Ogbe=1 (Energy) · Oyeku=0 (Anergy)"),
        ("IFA CPU", "Ifa Instruction Set",     "256 Odu as universal instruction codes"),
        ("IFA PL",  "IFA Programming Language","PL Generator & Integrator for all PL"),
        ("Ifalg.",  "Algorithm of Everything", "Ifa-based algorithms for all domains"),
    ]
    fw, fh = 390, 155
    gap2   = 30
    total2 = 2*(fw+gap2) - gap2
    fx0    = (W - total2) // 2
    fy0    = 545

    for i, (icon_, ttl, dsc) in enumerate(features):
        fxi = fx0 + (i%2)*(fw+gap2)
        fyi = fy0 + (i//2)*(fh+18)
        d.rounded_rectangle([fxi, fyi, fxi+fw, fyi+fh],
                             radius=10, fill=(*BG_ACCENT, 180),
                             outline=(*TEAL, 60), width=1)
        f_fi = font(F_BOLD, 24)
        f_ft = font(F_BOLD, 20)
        f_fd = font(F_REG,  18)
        d.text((fxi+16, fyi+12), icon_, font=f_fi, fill=TEAL)
        d.text((fxi+16, fyi+46), ttl,   font=f_ft, fill=CREAM)
        d.text((fxi+16, fyi+78), dsc,   font=f_fd, fill=CREAM_DIM)

    draw_centered(img, "From the Babalawo's Opele to the CPU's byte — it's the same logic.",
                  H - 110, font(F_REG, 24), color=(*CREAM_DIM, 180))
    accent_bar(img, H - 70)
    img.save(f"{OUT}/10_computing.png")
    print("✓ Scene 10 — Computing")


# ─── SCENE 11 — More Platforms ────────────────────────────────────────────────

def scene_11_platforms():
    img = radial_bg(stars=False)
    d   = ImageDraw.Draw(img)
    odu_watermark(img, alpha=14)
    accent_bar(img, 60)

    f_tag  = font(F_REG,   26)
    f_name = font(F_SERIF,  70)
    f_sub  = font(F_BOLD,   32)

    draw_centered(img, "IFA INTERNET  ·  40+ PLATFORMS ACROSS ALL DISCIPLINES",
                  28, f_tag, color=(*GOLD, 180))
    draw_centered(img, "The Full Ecosystem", 100, f_name, color=GOLD_BRIGHT)
    draw_centered(img, "Science · Math · Technology · Arts · Philosophy · Education · Language",
                  190, f_sub, color=CREAM_DIM)

    platforms = [
        # (name, color)
        ("IFA Mathematics",   GOLD),       ("IFA Science",      TEAL),
        ("IFA Physics",       INDIGO),     ("IFA Medicine",     RED_SOFT),
        ("Ebology",           GREEN_SOFT), ("IfaGebra",         GOLD),
        ("IFA Networking",    TEAL),       ("IfaPedia",         INDIGO),
        ("IFA Script",        (255,140,60)), ("Ifagraphy",       GREEN_SOFT),
        ("IFA Calendar",      GOLD),       ("IfaLabs",          TEAL),
        ("IFA Philosophy",    INDIGO),     ("IFA Ethics",       RED_SOFT),
        ("IFA Biology",       GREEN_SOFT), ("Igi Iye Ifa",      (255,140,60)),
        ("IFA Chemistry",     GOLD),       ("IFA Neuroscience", TEAL),
        ("IFA Architecture",  INDIGO),     ("IFA Engineering",  RED_SOFT),
        ("IFA Banking",       GREEN_SOFT), ("IFABitcoin",       GOLD),
        ("IFA Logic",         TEAL),       ("IFA Matrix",       INDIGO),
    ]

    cols_n = 6
    rows_n = 4
    pw, ph = 272, 78
    gap    = 14
    total  = cols_n*(pw+gap) - gap
    px0    = (W - total) // 2
    py0    = 245

    for i, (name, col) in enumerate(platforms):
        xi = px0 + (i % cols_n)*(pw+gap)
        yi = py0 + (i // cols_n)*(ph+gap)
        d.rounded_rectangle([xi, yi, xi+pw, yi+ph],
                             radius=10, fill=(*BG_ACCENT, 200),
                             outline=(*col, 80), width=1)
        f_pn = font(F_BOLD, 19)
        bb   = d.textbbox((0,0), name, font=f_pn)
        tx   = xi + (pw-(bb[2]-bb[0]))//2
        ty   = yi + (ph-(bb[3]-bb[1]))//2
        d.text((tx, ty), name, font=f_pn, fill=col)

    draw_centered(img, "⋯ and many more — the IFA Internet keeps growing",
                  py0 + rows_n*(ph+gap) + 20, font(F_REG, 24), color=(*GOLD, 140))
    draw_centered(img, "Every field. Every discipline. Every question. One framework.",
                  py0 + rows_n*(ph+gap) + 60, font(F_REG, 22), color=(*CREAM_DIM, 160))

    accent_bar(img, H - 70)
    img.save(f"{OUT}/11_platforms.png")
    print("✓ Scene 11 — Platforms")


# ─── SCENE 12 — Call to Action / Outro ───────────────────────────────────────

def scene_12_cta():
    img = radial_bg(stars=True)
    img = cen_orb(img, W//2, H//2, r=500)
    d   = ImageDraw.Draw(img)
    odu_watermark(img, alpha=22)

    # Reload clock at top-right, small
    try:
        clock = Image.open(CLOCK_SRC).convert("RGBA")
        cw, ch = clock.size
        target = 180
        scale  = target / max(cw, ch)
        clock  = clock.resize((int(cw*scale), int(ch*scale)), Image.LANCZOS)
        cr, cg, cb, ca = clock.split()
        arr = np.array(Image.merge("RGB",(cr,cg,cb)), dtype=np.float32)
        arr = 255 - arr
        out = np.zeros_like(arr)
        out[:,:,0] = np.clip(arr[:,:,0]*(GOLD[0]/255)*1.2, 0, 255)
        out[:,:,1] = np.clip(arr[:,:,1]*(GOLD[1]/255)*1.2, 0, 255)
        out[:,:,2] = np.clip(arr[:,:,2]*(GOLD[2]/255)*1.2, 0, 255)
        ct = Image.merge("RGBA",(*Image.fromarray(out.astype(np.uint8)).split(), ca))
        img.paste(ct, (W-int(cw*scale)-60, 80), ct)
    except Exception:
        pass

    accent_bar(img, 60)

    f_tag   = font(F_REG,   28)
    f_small = font(F_REG,   26)
    f_h1    = font(F_SERIF, 100)
    f_h2    = font(F_SERIF,  62)
    f_sub   = font(F_BOLD,   36)
    f_url   = font(F_MONO_R, 30)

    draw_centered(img, "CENProject  ·  Consciousness-Energy Network", 28, f_tag, color=(*GOLD, 200))

    draw_centered(img, "It's Ifa 0'Clock.", H//2 - 230, f_h1, color=GOLD_BRIGHT)
    draw_centered(img, "The Future Is Now.", H//2 - 120, f_h2, color=CREAM)

    draw_centered(img,
        "Join the IFA Internet — the most comprehensive framework for everything",
        H//2 - 30, f_sub, color=CREAM_DIM)

    # Divider with marks
    marks2 = "O | O O  | | O |  O O | |  | O | O  O | | O  | | O O"
    draw_centered(img, marks2, H//2 + 50, font(F_MONO_R, 26), color=(*GOLD, 100))

    # URL boxes
    urls2 = [
        ("toe.cenproject.org",    "The IFA Internet HQ"),
        ("cenproject.org",         "CENProject"),
        ("playifagames.org",       "Ifa Games"),
        ("ejiodi.com",             "Ifa Oracle"),
    ]
    box_w, box_h = 350, 90
    total2 = 2*(box_w+24)
    bx0 = (W - total2) // 2
    by0 = H//2 + 90

    for i, (url, lbl) in enumerate(urls2):
        bxi = bx0 + (i%2)*(box_w+24)
        byi = by0 + (i//2)*(box_h+16)
        d.rounded_rectangle([bxi, byi, bxi+box_w, byi+box_h],
                             radius=14, fill=(*BG_ACCENT, 200),
                             outline=(*GOLD, 100), width=1)
        f_ul = font(F_MONO_R, 22)
        f_ll = font(F_REG,    18)
        d.text((bxi+20, byi+12), url, font=f_ul, fill=(*GOLD, 230))
        d.text((bxi+20, byi+46), lbl, font=f_ll, fill=CREAM_DIM)

    # Final tagline
    draw_centered(img,
        "Where Ancient Wisdom Meets the Internet of Everything",
        H - 120, font(F_REG, 26), color=(*CREAM_DIM, 180))
    draw_centered(img,
        "© CENProject · Ọrúnmìlà & Ọ̀ṣun · Founded on 256 Odu Ifa",
        H - 80, font(F_REG, 20), color=(*GOLD, 120))

    accent_bar(img, H - 62)
    img.save(f"{OUT}/12_cta.png")
    print("✓ Scene 12 — CTA")


# ─── MAIN ─────────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    print("Generating IFA Internet demo frames…")
    scene_01_clock()
    scene_02_live()
    scene_03_toe()
    scene_04_ifai()
    scene_05_ifalang()
    scene_06_ptoe()
    scene_07_games()
    scene_08_ifalearnn()
    scene_09_academy()
    scene_10_computing()
    scene_11_platforms()
    scene_12_cta()
    print(f"\nAll scenes saved to: {OUT}/")
    print("Run make_video.sh to compile the final MP4.")
