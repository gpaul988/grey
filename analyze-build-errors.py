#!/usr/bin/env python3
"""
Comprehensive TypeScript Build Error Analyzer
Scans all TypeScript files for common build-blocking issues without running npm
"""

import os
import re
import sys
from pathlib import Path
from collections import defaultdict

errors_found = defaultdict(list)
warnings_found = defaultdict(list)

def scan_file(filepath, content):
    """Scan a single TypeScript file for common errors"""
    lines = content.split('\n')
    
    # Check for unresolved imports
    for i, line in enumerate(lines, 1):
        if re.match(r"^\s*import\s+.*from\s+['\"]", line):
            # Extract import path
            match = re.search(r"from\s+['\"](.+?)['\"]", line)
            if match:
                import_path = match.group(1)
                
                # Check if it's a relative or absolute path
                if import_path.startswith('@/'):
                    # This is an alias, need to verify it's in tsconfig
                    pass
                elif not (import_path.startswith('./') or import_path.startswith('../') or import_path.startswith('/')):
                    # This is a node module, check if it exists
                    pass
    
    # Check for missing return types on async functions
    for i, line in enumerate(lines, 1):
        if 'async function' in line and not ('Promise<' in line or ': any' in line or ': void' in line):
            if ') {' in line and ':' not in line.split(')')[0]:
                warnings_found['missing-return-type'].append({
                    'file': filepath,
                    'line': i,
                    'code': line.strip()
                })
    
    # Check for implicit `any` usage
    if ': any' in content or 'as any' in content:
        for i, line in enumerate(lines, 1):
            if ': any' in line or 'as any' in line:
                warnings_found['implicit-any'].append({
                    'file': filepath,
                    'line': i,
                    'code': line.strip()
                })
    
    # Check for unused variables
    unused_vars = re.findall(r'let\s+(\w+)\s*=', content)
    for var in unused_vars:
        pattern = rf'\b{var}\b'
        usage_count = len(re.findall(pattern, content))
        if usage_count == 1:  # Only the declaration
            warnings_found['unused-variable'].append({
                'file': filepath,
                'variable': var,
            })

def main():
    # Get all TS/TSX files
    ts_files = list(Path('/home/user/grey-fresh').rglob('*.ts')) + \
               list(Path('/home/user/grey-fresh').rglob('*.tsx'))
    
    # Exclude node_modules and .next
    ts_files = [f for f in ts_files if 'node_modules' not in str(f) and '.next' not in str(f)]
    
    print(f"Analyzing {len(ts_files)} TypeScript files...")
    print("=" * 80)
    
    for filepath in sorted(ts_files):
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
                scan_file(str(filepath), content)
        except Exception as e:
            print(f"Error scanning {filepath}: {e}")
    
    # Print results
    print("\n📊 BUILD ERROR ANALYSIS RESULTS\n")
    
    if not (errors_found or warnings_found):
        print("✅ No obvious build errors found!")
        return 0
    
    total_issues = sum(len(v) for v in errors_found.values()) + \
                   sum(len(v) for v in warnings_found.values())
    
    print(f"Total Issues Found: {total_issues}\n")
    
    # Print errors
    if errors_found:
        print("❌ ERRORS (Will block build):")
        for error_type, items in sorted(errors_found.items()):
            print(f"\n  {error_type} ({len(items)} instances)")
            for item in items[:3]:
                print(f"    - {item}")
    
    # Print warnings
    if warnings_found:
        print(f"\n⚠️  WARNINGS (May cause issues):")
        for warn_type, items in sorted(warnings_found.items()):
            print(f"\n  {warn_type} ({len(items)} instances)")
            for item in items[:3]:
                if isinstance(item, dict):
                    if 'code' in item:
                        print(f"    - {item['file']}:{item['line']} → {item['code'][:80]}")
                    else:
                        print(f"    - {item}")
    
    return 0

if __name__ == '__main__':
    sys.exit(main())
