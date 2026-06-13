#!/bin/bash
# ─────────────────────────────────────────────────────────────────────────────
#  IFA Internet — Video Demo Compiler
#  Stitches 12 scene PNGs with Ken Burns motion + xfade crossfades → MP4
#  Output: src/ifa_internet_demo.mp4
# ─────────────────────────────────────────────────────────────────────────────

set -e
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SCENES="$DIR/demo_scenes"
OUT="$DIR/ifa_internet_demo.mp4"

echo "=== IFA Internet Demo — FFmpeg Compile ==="
echo "Scenes: $SCENES"
echo "Output: $OUT"

# ── Per-scene durations (seconds) ────────────────────────────────────────────
#  01-clock:10  02-live:14  03-toe:18  04-ifai:14  05-lang:14  06-ptoe:14
#  07-games:13  08-learn:13  09-acad:13  10-comp:14  11-plat:16  12-cta:18
# Total: 171 s ≈ 2 min 51 s
D=(10 14 18 14 14 14 13 13 13 14 16 18)

SCENES_LIST=(
  "01_clock.png"
  "02_live.png"
  "03_toe.png"
  "04_ifai.png"
  "05_ifalang.png"
  "06_ptoe.png"
  "07_games.png"
  "08_ifalearnn.png"
  "09_academy.png"
  "10_computing.png"
  "11_platforms.png"
  "12_cta.png"
)
N=${#SCENES_LIST[@]}

# ── Step 1: Convert each PNG to a short video clip with zoompan motion ───────
# Ken Burns: slow zoom-in on odd scenes, slow zoom-out on even
mkdir -p "$DIR/demo_clips"
for i in "${!SCENES_LIST[@]}"; do
  SCENE="${SCENES}/${SCENES_LIST[$i]}"
  DUR="${D[$i]}"
  CLIP="$DIR/demo_clips/clip_$(printf '%02d' $i).mp4"
  FPS=24
  NFRAMES=$((DUR * FPS))

  # Alternating zoom direction: in for even, out for odd
  if (( i % 2 == 0 )); then
    ZOOM_START="1.0"
    ZOOM_END="1.04"
  else
    ZOOM_START="1.04"
    ZOOM_END="1.0"
  fi

  # zoompan: z=zoom, x/y=pan, d=frames, s=output size
  # We do a gentle zoom; x and y stay centered
  ZOOM_EXPR="z='if(lte(on,1),${ZOOM_START},zoom+((${ZOOM_END}-${ZOOM_START})/${NFRAMES}))'"
  ffmpeg -y -loop 1 -i "$SCENE" \
    -vf "scale=2048:1152,zoompan=z='if(lte(on,1),${ZOOM_START},min(zoom+0.0004,${ZOOM_END}))':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=${NFRAMES}:s=1920x1080:fps=${FPS}" \
    -t "$DUR" \
    -c:v libx264 -preset fast -crf 20 -pix_fmt yuv420p \
    -an "$CLIP" 2>/dev/null
  echo "  Clip $(( i+1 ))/${N}: ${SCENES_LIST[$i]} (${DUR}s)"
done

# ── Step 2: Build xfade filter chain ─────────────────────────────────────────
# Transition: 0.8s crossfade between every adjacent clip
FADE_DUR=0.8
INPUTS=""
FILTER=""
OFFSET=0.0

for i in "${!SCENES_LIST[@]}"; do
  CLIP="$DIR/demo_clips/clip_$(printf '%02d' $i).mp4"
  INPUTS+=" -i \"$CLIP\""
done

# Build the xfade chain
# [0][1]xfade=crossfade:d=0.8:offset=<d0-0.8>[x1]; [x1][2]xfade=...:offset=<d0+d1-0.8>[x2]; ...
CHAIN=""
LABEL_IN="[0]"
CUM=0.0

for i in "${!SCENES_LIST[@]}"; do
  CUM=$(awk "BEGIN{print $CUM + ${D[$i]} - $FADE_DUR}")
  if (( i < N-1 )); then
    NEXT=$((i+1))
    if (( i == 0 )); then
      SRC_A="[0]"
    else
      SRC_A="[x${i}]"
    fi
    SRC_B="[$((i+1))]"
    DST="[x$((i+1))]"
    OFFSET_VAL=$(awk "BEGIN{printf \"%.2f\", $CUM}")
    FILTER+="${SRC_A}${SRC_B}xfade=transition=fade:duration=${FADE_DUR}:offset=${OFFSET_VAL}${DST};"
  fi
done

# Last label
LAST_LABEL="[x${N}]"
# Remove trailing semicolon and get last output label
FILTER="${FILTER%;}"
# The last produced label
LAST="[x$((N-1))]"

# Build inputs string for ffmpeg
INPUT_ARGS=""
for i in "${!SCENES_LIST[@]}"; do
  INPUT_ARGS+=" -i \"$DIR/demo_clips/clip_$(printf '%02d' $i).mp4\""
done

# ── Step 3: Concatenate with xfade ───────────────────────────────────────────
echo ""
echo "Assembling final video with crossfade transitions..."
eval ffmpeg -y $INPUT_ARGS \
  -filter_complex "${FILTER}" \
  -map "${LAST}" \
  -c:v libx264 -preset medium -crf 18 -pix_fmt yuv420p \
  -movflags +faststart \
  "$OUT" 2>/dev/null

echo ""
echo "=== Done! ==="
echo "Output: $OUT"
FILESIZE=$(du -sh "$OUT" | cut -f1)
echo "File size: $FILESIZE"
DURATION=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$OUT" 2>/dev/null | awk '{printf "%.1f", $1}')
echo "Duration: ${DURATION}s"
