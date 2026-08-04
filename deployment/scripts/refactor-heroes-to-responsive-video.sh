#!/bin/bash
# Refactor all service screens to use ResponsiveVideoHero component

set -e

SERVICES_DIR="./screens/services"
LOG_FILE="./refactor-heroes.log"

echo "=== Refactoring Service Heroes to ResponsiveVideoHero ===" | tee "$LOG_FILE"
echo "Started: $(date)" >> "$LOG_FILE"

count=0
for file in "$SERVICES_DIR"/*.tsx; do
    [ ! -f "$file" ] && continue
    
    filename=$(basename "$file")
    
    # Skip if already refactored
    grep -q "ResponsiveVideoHero" "$file" && {
        echo "[SKIP] $filename (already refactored)" | tee -a "$LOG_FILE"
        continue
    }
    
    # Skip if no hero image
    grep -q "hero.jpg" "$file" || {
        echo "[SKIP] $filename (no hero.jpg)" | tee -a "$LOG_FILE"
        continue
    }
    
    echo "[REFACTORING] $filename..."
    
    # Extract the assets path (e.g., /assets/react/)
    asset_path=$(grep -oP '(?<=/assets/)[^/]+' "$file" | head -1)
    
    if [ -z "$asset_path" ]; then
        echo "[WARN] Could not extract asset path from $filename" | tee -a "$LOG_FILE"
        continue
    fi
    
    # Add ResponsiveVideoHero import if not present
    if ! grep -q "import.*ResponsiveVideoHero" "$file"; then
        # Find the line with last import (usually component imports)
        sed -i "/^import.*from.*components/a import ResponsiveVideoHero from '@/components/ResponsiveVideoHero';" "$file"
    fi
    
    # Replace Image element with ResponsiveVideoHero
    # This regex finds the Image wrapper div and replaces it
    perl -i -0pe 's{<div\s+className=\{[^}]*bg-gray-300[^}]*\}>\s*<Image\s+src=\{['\''"]\/assets\/[^\/]+\/hero\.jpg['\''"][^}]*height=\{[^}]*\}\s*style=\{\{[^}]*\}\}\s*\/>\s*<\/div>}{<ResponsiveVideoHero videoDesktop="/assets/'$asset_path'/hero.mp4" videoMobile="/assets/'$asset_path'/hero-mobile.mp4" posterImage="/assets/'$asset_path'/hero.jpg" />}g' "$file" 2>/dev/null || {
        echo "[WARN] Regex replacement failed for $filename (manual edit needed)" | tee -a "$LOG_FILE"
        continue
    }
    
    echo "[OK] $filename"
    ((count++))
done

echo "" | tee -a "$LOG_FILE"
echo "Refactored: $count files" | tee -a "$LOG_FILE"
echo "Completed: $(date)" >> "$LOG_FILE"

