#!/bin/bash

# Generate hero videos for all pages
# Desktop: 1920×1080, Mobile: 640×480

OUTPUT_DIR="/home/user/grey/public/assets"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}=== Hero Video Generation Script ===${NC}\n"

# List of asset folders to process
ASSETS=(
  "hero"
  "laravel"
  "nodejs"
  "react"
  "nextjs"
  "angular"
  "vuejs"
  "mobile"
  "backend"
  "frontend"
  "ai"
  "android"
  "ios"
  "flutter"
  "blockchain"
  "cms"
  "crm"
  "erp"
  "api"
  "seo"
  "brand"
  "comp"
  "disc"
  "social"
  "python"
  "php"
  "ruby"
  "net"
  "hybrid"
  "cross"
  "digital"
  "aso"
  "ecom"
  "mvp"
  "discovery"
  "case-study"
  "blog"
  "portfolio"
)

# Create videos from images if they don't exist
for ASSET in "${ASSETS[@]}"; do
  ASSET_PATH="$OUTPUT_DIR/$ASSET"
  
  if [ -d "$ASSET_PATH" ]; then
    # Check for hero image (jpg or png)
    HERO_IMG=$(ls "$ASSET_PATH"/hero.{jpg,png} 2>/dev/null | head -1)
    
    if [ -f "$HERO_IMG" ]; then
      DESKTOP_VIDEO="$ASSET_PATH/hero.mp4"
      MOBILE_VIDEO="$ASSET_PATH/hero-mobile.mp4"
      
      # Skip if videos already exist
      if [ ! -f "$DESKTOP_VIDEO" ]; then
        echo -e "${BLUE}Processing: $ASSET${NC}"
        
        # Desktop video: 1920×1080, 10 second loop with zoom effect
        ffmpeg -y -loop 1 -i "$HERO_IMG" \
          -vf "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2,zoompan=z='min(zoom+0.0015,1.5)':d=300:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)',format=yuv420p" \
          -c:v libx264 -preset medium -b:v 4M -pix_fmt yuv420p \
          -t 10 "$DESKTOP_VIDEO" 2>/dev/null &
        
        # Mobile video: 640×480, 10 second loop with subtle zoom
        ffmpeg -y -loop 1 -i "$HERO_IMG" \
          -vf "scale=640:480:force_original_aspect_ratio=decrease,pad=640:480:(ow-iw)/2:(oh-ih)/2,zoompan=z='min(zoom+0.001,1.3)':d=300:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)',format=yuv420p" \
          -c:v libx264 -preset medium -b:v 1.5M -pix_fmt yuv420p \
          -t 10 "$MOBILE_VIDEO" 2>/dev/null &
        
        # Limit parallel jobs to 4
        if (( $(jobs -r -p | wc -l) >= 4 )); then
          wait -n
        fi
        
        echo -e "${GREEN}✓ Created hero videos for: $ASSET${NC}"
      else
        echo -e "${GREEN}✓ Hero videos already exist for: $ASSET${NC}"
      fi
    fi
  fi
done

echo -e "\n${BLUE}Waiting for all FFmpeg jobs to complete...${NC}"
wait
echo -e "${GREEN}✓ Hero video generation complete!${NC}"
