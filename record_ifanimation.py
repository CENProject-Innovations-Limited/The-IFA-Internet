#!/usr/bin/env python3
"""
Record the Ifanimation (Ifa Periodic Table Kids) as a shareable MP4 video.

Approach: screenshot-polling via Chrome DevTools Protocol (no puppeteer needed).
Requirements: google-chrome, ffmpeg, websockets
Usage:  python3 record_ifanimation.py
Output: ifa-periodic-table/kids/ifanimation.mp4
"""

import asyncio
import base64
import json
import shutil
import subprocess
import sys
import time
import urllib.request
from pathlib import Path

try:
    import websockets
except ImportError:
    sys.exit("ERROR: pip install websockets")

# ── Config ─────────────────────────────────────────────────────
ROOT        = Path(__file__).parent
FRAMES_DIR  = ROOT / "ifa-periodic-table/kids/video-frames"
OUTPUT_FILE = ROOT / "ifa-periodic-table/kids/ifanimation.mp4"
PAGE_URL    = "http://127.0.0.1:5500/ifa-periodic-table/kids/video-record.html"
HTTP_PORT   = 5500
CHROME_PORT = 9225
# title(4.5) + scenes(3.4+5.6+5+5.4+5.6+5.8+5.2) + outro(4) + buffer(3) ≈ 48s
RECORD_SECS = 48
TARGET_FPS  = 10       # 10fps → smooth enough for CSS animation video
WIDTH, HEIGHT = 1280, 720

# ── Simple CDP call (no background task, handles events gracefully) ──
_cdp_id = 0

async def cdp(ws, method, params=None, timeout=20):
    global _cdp_id
    _cdp_id += 1
    mid = _cdp_id
    await ws.send(json.dumps({"id": mid, "method": method, "params": params or {}}))
    deadline = time.time() + timeout
    while time.time() < deadline:
        try:
            raw = await asyncio.wait_for(ws.recv(), timeout=min(3.0, deadline - time.time()))
        except asyncio.TimeoutError:
            continue
        msg = json.loads(raw)
        if msg.get("id") == mid:
            return msg.get("result", {})
        # Otherwise: event or other response — ignore and keep reading
    raise TimeoutError(f"CDP {method} timed out after {timeout}s")

def find_chrome():
    for name in ("google-chrome", "chromium-browser", "chromium"):
        p = shutil.which(name)
        if p:
            return p
    sys.exit("ERROR: Chrome not found")

def ensure_http_server():
    try:
        urllib.request.urlopen(f"http://127.0.0.1:{HTTP_PORT}/", timeout=1)
        print("  HTTP server already running.")
        return None
    except Exception:
        print(f"  Starting HTTP server on port {HTTP_PORT}...")
        proc = subprocess.Popen(
            [sys.executable, "-m", "http.server", str(HTTP_PORT),
             "--directory", str(ROOT)],
            stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
        )
        time.sleep(1.5)
        return proc

async def record():
    print("=" * 62)
    print("  Ifanimation Video Recorder")
    print(f"  {TARGET_FPS} fps · {RECORD_SECS}s · {WIDTH}×{HEIGHT}")
    print("=" * 62)

    if FRAMES_DIR.exists():
        shutil.rmtree(FRAMES_DIR)
    FRAMES_DIR.mkdir(parents=True)

    http_proc = ensure_http_server()

    chrome = find_chrome()
    print(f"  Chrome: {chrome}")
    chrome_proc = subprocess.Popen([
        chrome,
        "--headless=new",
        f"--remote-debugging-port={CHROME_PORT}",
        f"--window-size={WIDTH},{HEIGHT}",
        "--no-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
        "--disable-background-timer-throttling",
        "--disable-renderer-backgrounding",
        "--disable-backgrounding-occluded-windows",
        "--force-device-scale-factor=1",
        "about:blank",
    ], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    ws = None
    try:
        # Wait for Chrome and get CDP WebSocket URL
        print("  Waiting for Chrome to initialise...")
        for attempt in range(12):
            await asyncio.sleep(1)
            try:
                targets = json.loads(urllib.request.urlopen(
                    f"http://127.0.0.1:{CHROME_PORT}/json", timeout=3).read())
                # Must connect to the real browser tab, not extension background pages
                tab = next((t for t in targets if t.get("type") == "page"), None)
                if not tab:
                    raise RuntimeError("No page-type target found")
                ws_url = tab["webSocketDebuggerUrl"]
                print(f"  CDP: [{tab['type']}] {tab.get('url','?')[:60]}")
                print(f"       {ws_url}")
                break
            except Exception as e:
                if attempt == 11:
                    sys.exit(f"ERROR: Chrome CDP not available after 12s: {e}")

        ws = await websockets.connect(ws_url, max_size=None, ping_interval=None)

        # Configure viewport
        await cdp(ws, "Page.enable")
        await cdp(ws, "Emulation.setDeviceMetricsOverride", {
            "width": WIDTH, "height": HEIGHT,
            "deviceScaleFactor": 1, "mobile": False,
        })

        # Navigate
        print(f"  Navigating → {PAGE_URL}")
        await cdp(ws, "Page.navigate", {"url": PAGE_URL})

        # Wait for page load + Babel transpile + fonts
        print("  Waiting 10s for page to fully render...")
        await asyncio.sleep(10)

        # Verify with a probe screenshot
        print("  Taking probe screenshot...")
        result = await cdp(ws, "Page.captureScreenshot", {
            "format": "jpeg", "quality": 85,
            "clip": {"x": 0, "y": 0, "width": WIDTH, "height": HEIGHT, "scale": 1},
        }, timeout=30)
        if not result or "data" not in result:
            sys.exit("ERROR: probe screenshot failed — page did not render")

        # Save probe for inspection
        probe_path = ROOT / "ifa-periodic-table/kids/video-probe.jpg"
        probe_path.write_bytes(base64.b64decode(result["data"]))
        print(f"  Probe saved → {probe_path}  ({len(result['data'])//1024} KB)")

        # ── Recording loop ──────────────────────────────────────
        frames = []
        interval = 1.0 / TARGET_FPS
        start = time.time()
        frame_n = 0
        last_log = 0.0

        print(f"\n  Recording {RECORD_SECS}s @ {TARGET_FPS}fps...")
        print(f"  Expected ~{RECORD_SECS * TARGET_FPS} frames\n")

        while True:
            elapsed = time.time() - start
            if elapsed >= RECORD_SECS:
                break

            t0 = time.time()
            result = await cdp(ws, "Page.captureScreenshot", {
                "format":  "jpeg",
                "quality": 88,
                "clip":    {"x": 0, "y": 0, "width": WIDTH, "height": HEIGHT, "scale": 1},
            }, timeout=10)

            if result and "data" in result:
                jpeg = base64.b64decode(result["data"])
                ts = time.time()
                fpath = FRAMES_DIR / f"frame_{frame_n:06d}.jpg"
                fpath.write_bytes(jpeg)
                frames.append((fpath, ts))
                frame_n += 1

            # Sleep to hit target FPS
            spent = time.time() - t0
            sleep = max(0.0, interval - spent)
            if sleep > 0.005:
                await asyncio.sleep(sleep)

            elapsed = time.time() - start
            if elapsed - last_log >= 6:
                actual_fps = frame_n / max(elapsed, 0.1)
                pct = elapsed / RECORD_SECS * 100
                print(f"  [{pct:4.0f}%]  {elapsed:5.1f}s  frame {frame_n:4d}  {actual_fps:.1f} fps")
                last_log = elapsed

    finally:
        if ws:
            await ws.close()
        chrome_proc.terminate()
        if http_proc:
            http_proc.terminate()

    n = len(frames)
    print(f"\n  Captured {n} frames")
    if n < 10:
        sys.exit("ERROR: too few frames captured")

    # ── ffmpeg concat with real timestamps ─────────────────────
    concat_file = FRAMES_DIR / "input.txt"
    with open(concat_file, "w") as f:
        for i, (path, ts) in enumerate(frames):
            if i < n - 1:
                dur = frames[i + 1][1] - frames[i][1]
                dur = max(0.02, min(dur, 2.0))
            else:
                dur = 1.0 / TARGET_FPS
            f.write(f"file '{path.name}'\n")
            f.write(f"duration {dur:.6f}\n")
        f.write(f"file '{frames[-1][0].name}'\n")   # required final entry

    # ── Compile to MP4 ─────────────────────────────────────────
    print("\n  Compiling MP4...")
    cmd = [
        "ffmpeg", "-y",
        "-f",        "concat",
        "-safe",     "0",
        "-i",        str(concat_file),
        "-c:v",      "libx264",
        "-preset",   "slow",
        "-crf",      "20",
        "-pix_fmt",  "yuv420p",
        "-movflags", "+faststart",
        "-r",        "24",
        str(OUTPUT_FILE),
    ]
    result = subprocess.run(cmd, cwd=str(FRAMES_DIR), capture_output=True, text=True)
    if result.returncode != 0:
        print("FFmpeg stderr:\n", result.stderr[-3000:])
        sys.exit("FFmpeg failed")

    size_mb = OUTPUT_FILE.stat().st_size / 1024 / 1024
    print(f"\n{'='*62}")
    print(f"  ✓  Video saved: {OUTPUT_FILE.name}")
    print(f"     Size       : {size_mb:.1f} MB")
    print(f"     Frames     : {n}  @ {TARGET_FPS}fps capture")
    print(f"     Output     : 24fps MP4 H.264  {WIDTH}×{HEIGHT}")
    print(f"     Duration   : ~{RECORD_SECS}s")
    print(f"{'='*62}")
    print()

if __name__ == "__main__":
    asyncio.run(record())
