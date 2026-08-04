#!/bin/bash
set -e

ASSETS_DIR="./public/assets"
LOG_FILE="./hero-conversion-batch.log"

echo "=== Batch Hero Image to Video Conversion ===" | tee "$LOG_FILE"
echo "Started: $(date)" >> "$LOG_FILE"

if ! command -v ffmpeg &> /dev/null; then
    echo "ERROR: ffmpeg not installed" | tee -a "$LOG_FILE"
    exit 1
fi

count=0
for dir in "$ASSETS_DIR"/*/; do
    [ ! -f "$dir/hero.jpg" ] && continue
    
    service=$(basename "$dir")
    
    # Skip if already converted
    [ -f "$dir/hero.mp4" ] && [ -s "$dir/hero.mp4" ] && {
        echo "[SKIP] $service" | tee -a "$LOG_FILE"
        continue
    }
    
    echo "[CONVERTING] $service..."
    
    # Desktop MP4 (5s loop)
    ffmpeg -hide_banner -loglevel error \
        -loop 1 -i "$dir/hero.jpg" \
        -c:v libx264 -crf 23 -b:v 5000k -maxrate 6000k \
        -t 5 -pix_fmt yuv420p -y \
        "$dir/hero.mp4" 2>>"$LOG_FILE"
    
    # Mobile MP4 (640x480, optimized)
    ffmpeg -hide_banner -loglevel error \
        -loop 1 -i "$dir/hero.jpg" \
        -vf "scale=640:480:force_original_aspect_ratio=increase,crop=640:480" \
        -c:v libx264 -crf 26 -b:v 1500k -maxrate 2000k \
        -t 5 -pix_fmt yuv420p -y \
        "$dir/hero-mobile.mp4" 2>>"$LOG_FILE"
    
    # WebM fallback
    ffmpeg -hide_banner -loglevel error \
        -loop 1 -i "$dir/hero.jpg" \
        -c:v libvpx-vp9 -b:v 3000k -crf 20 \
        -t 5 -pix_fmt yuv420p -y \
        "$dir/hero-fallback.webm" 2>>"$LOG_FILE"
    
    echo "[OK] $service"
    ((count++))
done

echo "" | tee -a "$LOG_FILE"
echo "Converted: $count services" | tee -a "$LOG_FILE"
echo "Completed: $(date)" >> "$LOG_FILE"

