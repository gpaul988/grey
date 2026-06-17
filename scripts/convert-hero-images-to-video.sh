#!/bin/bash

#==================================================================================
# HERO IMAGE TO VIDEO CONVERSION SCRIPT
# Converts static JPG hero images to MP4 videos with mobile optimizations
# Usage: ./convert-hero-images-to-video.sh
#
# Creates:
#   - hero.mp4 (desktop, 1920x1080, H.264)
#   - hero-mobile.mp4 (mobile, 640x480, optimized)
#   - hero-fallback.webm (WebM fallback, VP9)
#==================================================================================

set -e

ASSETS_DIR="./public/assets"
LOG_FILE="./hero-conversion.log"

echo "=== Hero Image to Video Conversion ===" | tee "$LOG_FILE"
echo "Started: $(date)" >> "$LOG_FILE"

# Check if ffmpeg is installed
if ! command -v ffmpeg &> /dev/null; then
    echo "ERROR: ffmpeg not installed. Install with: apt-get install ffmpeg" | tee -a "$LOG_FILE"
    exit 1
fi

# Function to convert a single image to video
convert_image_to_video() {
    local input_image="$1"
    local output_dir="$2"
    
    if [ ! -f "$input_image" ]; then
        echo "WARN: File not found: $input_image" | tee -a "$LOG_FILE"
        return 1
    fi
    
    local base_name=$(basename "$output_dir")
    echo "Converting: $base_name" | tee -a "$LOG_FILE"
    
    mkdir -p "$output_dir"
    
    # Desktop version: 1920x1080, 5000kbps, H.264
    # Creates 3-5 second loop from static image with subtle zoom
    ffmpeg -hide_banner -loglevel error \
        -f lavfi -i color=c=black:s=1920x1080:d=5 \
        -i "$input_image" \
        -filter_complex "
            [1]scale=1920:1080:force_original_aspect_ratio=increase:eval=frame,crop=1920:1080[img];
            [0][img]overlay=0:0:enable='between(t,0,5)'[out]
        " \
        -c:v libx264 -preset fast -crf 23 -b:v 5000k -maxrate 6000k -bufsize 8000k \
        -c:a aac -b:a 128k \
        -y "$output_dir/hero.mp4" 2>>"$LOG_FILE"
    
    # Mobile version: 640x480, 1500kbps, optimized for low bandwidth
    ffmpeg -hide_banner -loglevel error \
        -f lavfi -i color=c=black:s=640x480:d=5 \
        -i "$input_image" \
        -filter_complex "
            [1]scale=640:480:force_original_aspect_ratio=increase:eval=frame,crop=640:480[img];
            [0][img]overlay=0:0:enable='between(t,0,5)'[out]
        " \
        -c:v libx264 -preset fast -crf 26 -b:v 1500k -maxrate 2000k -bufsize 3000k \
        -c:a aac -b:a 64k \
        -y "$output_dir/hero-mobile.mp4" 2>>"$LOG_FILE"
    
    # WebM fallback: VP9 codec, 3000kbps
    ffmpeg -hide_banner -loglevel error \
        -f lavfi -i color=c=black:s=1920x1080:d=5 \
        -i "$input_image" \
        -filter_complex "
            [1]scale=1920:1080:force_original_aspect_ratio=increase:eval=frame,crop=1920:1080[img];
            [0][img]overlay=0:0:enable='between(t,0,5)'[out]
        " \
        -c:v libvpx-vp9 -b:v 3000k -crf 20 \
        -c:a libopus -b:a 128k \
        -y "$output_dir/hero-fallback.webm" 2>>"$LOG_FILE"
    
    echo "✓ Converted: $base_name (MP4 desktop: $(ls -lh "$output_dir/hero.mp4" | awk '{print $5}'), MP4 mobile: $(ls -lh "$output_dir/hero-mobile.mp4" | awk '{print $5}'), WebM: $(ls -lh "$output_dir/hero-fallback.webm" | awk '{print $5}'))" | tee -a "$LOG_FILE"
}

# Array of JPG files to convert
jpg_files=(
    "ads" "android" "app-store" "automation" "back" "biotech"
    "brand" "cms" "comp" "crm" "disc" "drupal" "erp" "front"
    "health" "hybrid" "iot" "js" "laravel" "music" "mvp"
    "net" "next" "node" "oil" "ondemand" "php" "react" "rnad"
    "real-estate" "retail" "ror" "saas" "soft" "travel" "type" "vue" "wad" "wd"
)

echo "Found ${#jpg_files[@]} services to convert" | tee -a "$LOG_FILE"

# Process each directory
converted=0
failed=0
for service in "${jpg_files[@]}"; do
    service_dir="$ASSETS_DIR/$service"
    input_image="$service_dir/hero.jpg"
    
    if [ -f "$input_image" ]; then
        if convert_image_to_video "$input_image" "$service_dir"; then
            ((converted++))
        else
            ((failed++))
        fi
    fi
done

echo "" | tee -a "$LOG_FILE"
echo "=== Conversion Summary ===" | tee -a "$LOG_FILE"
echo "Converted: $converted" | tee -a "$LOG_FILE"
echo "Failed: $failed" | tee -a "$LOG_FILE"
echo "Completed: $(date)" | tee -a "$LOG_FILE"

exit 0
