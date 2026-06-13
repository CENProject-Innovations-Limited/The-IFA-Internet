#!/usr/bin/env python3
"""
IFA Internet — Video Demo Compiler
Produces ifa_internet_demo.mp4 from 12 scene PNGs.
Uses FFmpeg: zoompan (Ken Burns) per clip → xfade crossfade assembly.
"""

import subprocess, os, shutil, math

DIR     = os.path.dirname(os.path.abspath(__file__))
SCENES  = os.path.join(DIR, "demo_scenes")
CLIPS   = os.path.join(DIR, "demo_clips")
OUT     = os.path.join(DIR, "ifa_internet_demo.mp4")
FPS     = 24
FADE    = 0.8      # crossfade seconds between scenes
CRF     = 18

os.makedirs(CLIPS, exist_ok=True)

# Scene files and durations (seconds)
SCENE_DATA = [
    ("01_clock.png",      12),   # Intro: It's Ifa 0'Clock
    ("02_live.png",       15),   # The IFA Internet Is Live
    ("03_toe.png",        20),   # Theory of Everything overview
    ("04_ifai.png",       15),   # Ifai — Ifa AI
    ("05_ifalang.png",    15),   # IfaLang
    ("06_ptoe.png",       15),   # Ifa Periodic Table
    ("07_games.png",      14),   # Ifa Games
    ("08_ifalearnn.png",  14),   # IfaLearn
    ("09_academy.png",    14),   # Ifa Academy of Polymaths
    ("10_computing.png",  15),   # Ifa Computing
    ("11_platforms.png",  17),   # All Platforms
    ("12_cta.png",        20),   # Call to Action
]
N = len(SCENE_DATA)


def run(cmd, label=""):
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        print(f"  ERROR in {label}:")
        print(result.stderr[-1000:])
        raise RuntimeError(f"FFmpeg failed: {label}")


# ── Step 1: Build per-scene clip with gentle zoompan ─────────────────────────
print("=== IFA Internet Demo — Video Compiler ===")
print(f"Scenes : {SCENES}")
print(f"Output : {OUT}")
print()

clip_paths = []
for i, (fname, dur) in enumerate(SCENE_DATA):
    src   = os.path.join(SCENES, fname)
    clip  = os.path.join(CLIPS, f"clip_{i:02d}.mp4")
    clip_paths.append(clip)
    nf    = dur * FPS

    # Alternate: even scenes zoom IN (1.0→1.04), odd scenes zoom OUT (1.04→1.0)
    if i % 2 == 0:
        z0, z1 = 1.00, 1.04
    else:
        z0, z1 = 1.04, 1.00
    dz = (z1 - z0) / max(nf - 1, 1)

    # zoompan expression — 'zoom' is the previous frame's zoom value
    if dz >= 0:
        z_expr = f"'min(if(lte(on,1),{z0:.4f},zoom+{abs(dz):.6f}),{z1:.4f})'"
    else:
        z_expr = f"'max(if(lte(on,1),{z0:.4f},zoom-{abs(dz):.6f}),{z1:.4f})'"

    vf = (
        f"scale=2048:1152:flags=lanczos,"
        f"zoompan=z={z_expr}:"
        f"x='iw/2-(iw/zoom/2)':"
        f"y='ih/2-(ih/zoom/2)':"
        f"d={nf}:s=1920x1080:fps={FPS}"
    )

    cmd = [
        "ffmpeg", "-y",
        "-loop", "1", "-i", src,
        "-vf", vf,
        "-t", str(dur),
        "-c:v", "libx264", "-preset", "fast", "-crf", "22",
        "-pix_fmt", "yuv420p", "-an",
        clip
    ]
    print(f"  [{i+1:2d}/{N}] {fname:30s}  {dur:2d}s  zoom {z0:.2f}→{z1:.2f}", end="  ", flush=True)
    run(cmd, fname)
    print("✓")

# ── Step 2: Assemble clips with xfade crossfades ─────────────────────────────
print()
print("Assembling final video with xfade transitions...")

# Build filter_complex for N clips with xfade between each adjacent pair
# Offsets: cumulative sum of (dur - fade) for each preceding clip
offsets = []
cum = 0.0
for i, (_, dur) in enumerate(SCENE_DATA[:-1]):
    cum += dur - FADE
    offsets.append(round(cum, 4))

# Build filter string
# [0][1]xfade=...:offset=o1[x1]; [x1][2]xfade=...:offset=o2[x2]; ...
filter_parts = []
for i in range(N - 1):
    src_a = f"[0]" if i == 0 else f"[x{i}]"
    src_b = f"[{i+1}]"
    dst   = f"[x{i+1}]"
    part  = (f"{src_a}{src_b}xfade=transition=fade:"
             f"duration={FADE}:offset={offsets[i]}{dst}")
    filter_parts.append(part)

filter_complex = ";".join(filter_parts)
last_label = f"[x{N-1}]"

# Build input list
input_args = []
for cp in clip_paths:
    input_args += ["-i", cp]

cmd = (
    ["ffmpeg", "-y"]
    + input_args
    + [
        "-filter_complex", filter_complex,
        "-map", last_label,
        "-c:v", "libx264", "-preset", "medium", f"-crf", str(CRF),
        "-pix_fmt", "yuv420p",
        "-movflags", "+faststart",
        OUT
    ]
)

run(cmd, "final assembly")
print("✓  Final assembly complete")

# ── Report ────────────────────────────────────────────────────────────────────
size = os.path.getsize(OUT) / 1024 / 1024
result = subprocess.run(
    ["ffprobe", "-v", "error", "-show_entries", "format=duration",
     "-of", "csv=p=0", OUT],
    capture_output=True, text=True
)
dur_sec = float(result.stdout.strip()) if result.stdout.strip() else 0
m, s = divmod(int(dur_sec), 60)

print()
print(f"=== OUTPUT ===")
print(f"  File    : {OUT}")
print(f"  Size    : {size:.1f} MB")
print(f"  Duration: {m}m {s:02d}s")
print()
print("Clean up clips? Run:  rm -rf src/demo_clips/")
