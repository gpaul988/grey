#!/bin/bash
set -e

for dir in public/assets/*/; do
  [ ! -f "$dir/hero.jpg" ] && continue
  [ -f "$dir/hero.mp4" ] && [ -s "$dir/hero.mp4" ] && continue
  
  service=$(basename "$dir")
  echo "[CONVERTING] $service..."
  
  # Desktop MP4 - use ultrafast preset for speed
  ffmpeg -hide_banner -loglevel error -loop 1 -i "$dir/hero.jpg" \
    -c:v libx264 -preset ultrafast -crf 28 \
    -t 5 -pix_fmt yuv420p -y "$dir/hero.mp4" &
  
  # Mobile MP4
  ffmpeg -hide_banner -loglevel error -loop 1 -i "$dir/hero.jpg" \
    -vf "scale=640:480:force_original_aspect_ratio=increase,crop=640:480" \
    -c:v libx264 -preset ultrafast -crf 28 \
    -t 5 -pix_fmt yuv420p -y "$dir/hero-mobile.mp4" &
  
  # Wait for both to finish
  wait
  
  echo "[OK] $service"
done

echo "Done!"
