#!/usr/bin/env python3
"""
Refactor all service screens: Replace static Image heroes with ResponsiveVideoHero
"""

import os
import re
from pathlib import Path

SERVICES_DIR = Path('./screens/services')
LOG_FILE = Path('./refactor_heroes.log')

logs = []

def log(msg):
    print(msg)
    logs.append(msg)

log('=== Refactoring Service Heroes to ResponsiveVideoHero ===')
log(f'Started: {Path.cwd()}')
log('')

count = 0
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
            continue
        
        # Skip if no hero image
        if 'hero.jpg' not in content:
            log(f'[SKIP] {filename} (no hero.jpg)')
            continue
        
        log(f'[REFACTORING] {filename}...')
        
        # Extract asset path
        asset_match = re.search(r'/assets/([^/]+)/hero\.jpg', content)
        if not asset_match:
            log(f'[WARN] Could not extract asset path from {filename}')
            errors += 1
            continue
        
        asset_path = asset_match.group(1)
        
        # Add ResponsiveVideoHero import if not present
        if 'import ResponsiveVideoHero' not in content:
            # Find the "import Image" line
            image_import_match = re.search(r'^import Image from ["\']next/image["\'];', content, re.MULTILINE)
            if image_import_match:
                old_import = image_import_match.group(0)
                new_import = old_import + '\nimport ResponsiveVideoHero from "@/components/ResponsiveVideoHero";'
                content = content.replace(old_import, new_import)
            else:
                log(f'[WARN] Could not find Image import in {filename}')
                errors += 1
                continue
        
        # Find and replace the hero Image element
        # Pattern: <div className="...bg-gray-300/10...">
        #            <Image src="/assets/X/hero.jpg" ... />
        #          </div>
        hero_pattern = r'(<div[^>]*className=\{`[^`]*bg-gray-300/10[^`]*`\}[^>]*>[\s\S]*?<Image[\s\S]*?src=\{[\'"]\/assets\/[^\/]+\/hero\.jpg[\'"]\}[\s\S]*?\/>\s*<\/div>)'
        
        def replace_hero(match):
            return f'<ResponsiveVideoHero videoDesktop="/assets/{asset_path}/hero.mp4" videoMobile="/assets/{asset_path}/hero-mobile.mp4" posterImage="/assets/{asset_path}/hero.jpg" />'
        
        new_content = re.sub(hero_pattern, replace_hero, content)
        
        if new_content != content:
            file.write_text(new_content, 'utf-8')
            log(f'[OK] {filename}')
            count += 1
        else:
            log(f'[WARN] Hero pattern not matched in {filename} (manual review needed)')
            errors += 1
    
    except Exception as e:
        log(f'[ERROR] {filename}: {str(e)}')
        errors += 1

log('')
log('=== Summary ===')
log(f'Refactored: {count} files')
log(f'Errors/Warnings: {errors}')
log(f'Completed: {Path.cwd()}')

# Write log
with open(LOG_FILE, 'w') as f:
    f.write('\n'.join(logs))

print(f'\nLog written to: {LOG_FILE}')
