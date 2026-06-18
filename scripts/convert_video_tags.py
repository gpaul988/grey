#!/usr/bin/env python3
"""
Simple converter: Replace <video> tags with ResponsiveVideoHero component.
Only processes files that explicitly need it.
"""

import re
from pathlib import Path

FILES_TO_CONVERT = [
    "screens/industries/e-commerce-development.tsx",
    "screens/industries/fintech.tsx",
    "screens/industries/healthcare.tsx",
    "screens/industries/oil-and-gas.tsx",
    "screens/services/Javascript.tsx",
    "screens/services/Typescript.tsx",
    "screens/services/angular-development.tsx",
    "screens/services/app-store-optimization.tsx",
    "screens/services/cross-platform-development.tsx",
    "screens/services/digital-marketing.tsx",
]

def add_import(content: str) -> str:
    """Add ResponsiveVideoHero import if not present."""
    if "ResponsiveVideoHero" in content:
        return content
    
    # Find the position after the last import statement
    import_pattern = r"^import\s+.*?from\s+['\"].*?['\"];?\s*$"
    matches = list(re.finditer(import_pattern, content, re.MULTILINE))
    
    if matches:
        last_import_end = matches[-1].end()
        new_import = "\nimport ResponsiveVideoHero from '@/components/ResponsiveVideoHero';"
        return content[:last_import_end] + new_import + content[last_import_end:]
    
    return content

def convert_video_tag(content: str) -> str:
    """Replace <video .../> with <ResponsiveVideoHero ... />"""
    # Pattern to match video tags
    pattern = r'<video\s+([^>]*?)src=["\']([^"\']+)["\']([^>]*)\/?\s*>'
    
    def replacer(match):
        src = match.group(2)
        # Use videoFallback to keep simple; component will pick best size
        return f'<ResponsiveVideoHero\n                    videoFallback="{src}"\n                    posterImage="/images/default-poster.jpg"\n                />'
    
    return re.sub(pattern, replacer, content)

def main():
    print("\n🎬 Converting video tags to ResponsiveVideoHero...\n")
    
    converted = 0
    errors = 0
    
    for file_rel_path in FILES_TO_CONVERT:
        file_path = Path(file_rel_path)
        
        if not file_path.exists():
            print(f"  ⚠️  {file_rel_path} not found")
            continue
        
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Add import
            content = add_import(content)
            
            # Replace video tags
            new_content = convert_video_tag(content)
            
            if new_content != content:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"  ✅ {file_rel_path}")
                converted += 1
            else:
                print(f"  ⏭️  {file_rel_path} (no video tags found)")
        
        except Exception as e:
            print(f"  ❌ {file_rel_path}: {e}")
            errors += 1
    
    print(f"\n📊 Summary: {converted} converted, {errors} errors\n")

if __name__ == "__main__":
    main()
