#!/usr/bin/env python3
"""
Batch convert raw <video> tags in hero sections to ResponsiveVideoHero component.
This script:
1. Finds all .tsx files with <video> tags in hero sections
2. Replaces the video + overlay div with ResponsiveVideoHero component
3. Adds the import at the top of the file
"""

import os
import re
import sys
from pathlib import Path

SCREENS_DIR = Path("screens")
RESPONSIVE_VIDEO_HERO_IMPORT = "import ResponsiveVideoHero from '@/components/ResponsiveVideoHero';"


def extract_video_src(content: str) -> str | None:
    """Extract the src attribute from a <video> tag."""
    match = re.search(r'<video\s+[^>]*src=["\']([^"\']+)["\']', content)
    if match:
        return match.group(1)
    return None


def has_responsive_video_hero_import(content: str) -> bool:
    """Check if file already imports ResponsiveVideoHero."""
    return "ResponsiveVideoHero" in content


def add_import_if_needed(content: str) -> str:
    """Add ResponsiveVideoHero import if not already present."""
    if has_responsive_video_hero_import(content):
        return content
    
    # Find the last import statement
    import_match = list(re.finditer(r"^import\s+.*?from\s+['\"].*?['\"];?\s*$", content, re.MULTILINE))
    if import_match:
        last_import = import_match[-1]
        insert_pos = last_import.end()
        return content[:insert_pos] + f"\n{RESPONSIVE_VIDEO_HERO_IMPORT}" + content[insert_pos:]
    
    # If no imports found, add after the 'use client' directive if present
    if content.startswith("'use client'"):
        pos = content.find('\n') + 1
        return content[:pos] + f"{RESPONSIVE_VIDEO_HERO_IMPORT}\n" + content[pos:]
    
    # Otherwise add at the very top
    return f"{RESPONSIVE_VIDEO_HERO_IMPORT}\n{content}"


def convert_video_to_hero(content: str, file_path: str) -> tuple[str, bool]:
    """
    Convert a raw <video> tag to ResponsiveVideoHero component.
    Returns (modified_content, was_modified)
    """
    
    # Pattern to match the entire hero section with video + overlay
    # This looks for: <div id="hero" ...> <video ... /> <div ... className="absolute...
    pattern = r'''<div\s+id=\{?['"]?hero['"]?\}?\s*\n\s*className=\{?[^}]*\}?\s*>\s*<video\s+([^>]*)>\s*</video>\s*\n\s*<div\s+className=\{?`absolute[^`]*`\}?\s*>'''
    
    match = re.search(pattern, content, re.DOTALL)
    if not match:
        return content, False
    
    # Extract the video src
    video_match = re.search(r'src=["\']([^"\']+)["\']', match.group(0))
    if not video_match:
        print(f"  ⚠️  Could not extract video src from {file_path}")
        return content, False
    
    video_src = video_match.group(1)
    
    # Create the replacement component
    hero_replacement = f'''<div id={{'hero'}} className={{'relative overflow-hidden lg:w-full lg:h-[720px] justify-center items-center md:w-full md:h-[700] w-full h-[700] pb-6'}}>
                <ResponsiveVideoHero
                    src="{video_src}"
                    poster="/images/default-poster.jpg"
                />
                <div
                    className={{'absolute top-0 left-0 w-full h-full flex flex-col justify-center items-start text-start lg:max-w-[90em] px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em] ${{isDayTime ? 'text-white' : 'text-white'}}'}}>'''
    
    # Replace the old pattern with the new component
    modified = re.sub(pattern, hero_replacement, content, count=1, flags=re.DOTALL)
    
    if modified != content:
        print(f"  ✅ Converted {file_path}")
        return modified, True
    
    return content, False


def process_file(file_path: Path) -> bool:
    """Process a single .tsx file. Returns True if modified."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Check if file has a video tag
        if '<video' not in content:
            return False
        
        # Add import if needed
        content = add_import_if_needed(content)
        
        # Convert video to ResponsiveVideoHero
        modified_content, was_modified = convert_video_to_hero(content, str(file_path))
        
        if was_modified:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(modified_content)
            return True
        
        return False
    
    except Exception as e:
        print(f"  ❌ Error processing {file_path}: {e}")
        return False


def main():
    """Find and convert all hero sections with video tags."""
    print("\n🎬 Batch converting hero sections to ResponsiveVideoHero...\n")
    
    if not SCREENS_DIR.exists():
        print(f"Error: {SCREENS_DIR} directory not found")
        sys.exit(1)
    
    # Find all .tsx files
    tsx_files = list(SCREENS_DIR.rglob("*.tsx"))
    print(f"Found {len(tsx_files)} .tsx files\n")
    
    converted = 0
    skipped = 0
    errors = 0
    
    for file_path in sorted(tsx_files):
        # Skip specific paths that shouldn't have hero sections
        skip_dirs = ['store', 'contact', 'portfolio']
        if any(skip_dir in str(file_path) for skip_dir in skip_dirs):
            continue
        
        try:
            if process_file(file_path):
                converted += 1
            else:
                skipped += 1
        except Exception as e:
            print(f"  ❌ Error: {e}")
            errors += 1
    
    print(f"\n📊 Summary:")
    print(f"   ✅ Converted: {converted}")
    print(f"   ⏭️  Skipped: {skipped}")
    print(f"   ❌ Errors: {errors}")
    print()


if __name__ == '__main__':
    main()
