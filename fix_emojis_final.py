#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import os

filepath = r'C:\Users\graha\Documents\GitHub\grey\screens\services\maritime-port-management.tsx'

# Read file as binary
with open(filepath, 'rb') as f:
    content = f.read()

# Convert to string for analysis
text = content.decode('utf-8', errors='replace')

print(f"Original file size: {len(content)} bytes")
print(f"Original text length: {len(text)} characters")

# All replacements using string literals (these get properly encoded)
replacements = [
    ('ðŸ¢', '🏢'),
    ('â˜ï¸', '☁️'),
    ('ðŸ†', '🏆'),
    ('â­', '⭐'),
    ('ðŸ"ˆ', '📈'),
    ('ðŸ§ ', '🧠'),
    ('âœ…', '✅'),
    ('ðŸš€', '🚀'),
    ('ðŸ"', '📋'),
    ('ðŸŌ', '🌍'),
    ('âš™ï¸', '⚙️'),
    ('ðŸŎ¯', '🎯'),
    ('ðŸ—ï¸', '🗣️'),
    ('ðŸ"Š', '📊'),
    ('âš¡', '⚡'),
    ('ðŸ›¡ï¸', '🛡️'),
    ('âœ¨', '✨'),
    ('ðŸ'°', '💰'),
    ('â€"', '–'),
    ('â†', '↑'),
]

# Count and replace
total_replacements = 0
for old, new in replacements:
    count = text.count(old)
    if count > 0:
        print(f"  Replacing '{repr(old)}' -> '{new}' ({count} occurrences)")
        text = text.replace(old, new)
        total_replacements += count

print(f"\nTotal replacements made: {total_replacements}")

# Write back as UTF-8
with open(filepath, 'w', encoding='utf-8') as f:
    f.write(text)

print(f"New file size: {len(text.encode('utf-8'))} bytes")
print("✓ All corrupted emoji sequences have been replaced successfully!")
