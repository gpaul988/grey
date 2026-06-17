#!/usr/bin/env python3
"""
Batch refactor all service screens: Replace static Image heroes with ResponsiveVideoHero
"""

import re
from pathlib import Path

SERVICES_DIR = Path('./screens/services')
LOG_FILE = Path('./refactor_all_heroes.log')

logs = []

def log(msg):
    print(msg)
    logs.append(msg)

log('=== Batch Refactoring Service Heroes to ResponsiveVideoHero ===')
log('')

count = 0
skipped = 0
errors = 0

# Find all .tsx files
tsx_files = sorted(SERVICES_DIR.glob('*.tsx'))
log(f'Found {len(tsx_files)} service files\n')

for file in tsx_files:
    filename = file.name
    
    try:
        content = file.read_text('utf-8')
        
        # Skip if already refactored
        if 'ResponsiveVideoHero' in content:
            log(f'[SKIP] {filename} (already refactored)')
            skipped += 1
            continue
        
        # Skip if no hero image
        if 'hero.jpg' not in content:
            log(f'[SKIP] {filename} (no hero.jpg)')
            skipped += 1
            continue
        
        log(f'[REFACTORING] {filename}...')
        
        # Extract asset path from hero.jpg reference
        asset_match = re.search(r"/assets/([^/]+)/hero\.jpg", content)
        if not asset_match:
            log(f'[WARN] Could not extract asset path')
            errors += 1
            continue
        
        asset_path = asset_match.group(1)
        
        # Add ResponsiveVideoHero import if not present
        if 'import ResponsiveVideoHero' not in content:
            content = re.sub(
                r"(import Image from ['\"]next/image['\"];)",
                r"\1\nimport ResponsiveVideoHero from '@/components/ResponsiveVideoHero';",
                content
            )
        
        # Replace hero Image with ResponsiveVideoHero
        # Pattern: <div...bg-gray-300/10...> ... <Image.../> ... </div>
        pattern = r'<div\s+className=\{\'[^\']*bg-gray-300/10[^\']*\'\}>\s*<Image[\s\S]*?\/>\s*<\/div>'
        replacement = f'<ResponsiveVideoHero videoDesktop="/assets/{asset_path}/hero.mp4" videoMobile="/assets/{asset_path}/hero-mobile.mp4" posterImage="/assets/{asset_path}/hero.jpg" />'
        
        new_content = re.sub(pattern, replacement, content)
        
        if new_content != content:
            file.write_text(new_content, 'utf-8')
            log(f'[OK] {filename}')
            count += 1
        else:
            log(f'[WARN] Hero pattern not matched')
            errors += 1
    
    except Exception as e:
        log(f'[ERROR] {str(e)}')
        errors += 1

log('')
log('=== Summary ===')
log(f'Refactored: {count} files')
log(f'Skipped: {skipped} files')
log(f'Errors/Warnings: {errors}')

# Write log
with open(LOG_FILE, 'w') as f:
    f.write('\n'.join(logs))

print(f'\nLog written to: {LOG_FILE}')
