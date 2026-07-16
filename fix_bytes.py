#!/usr/bin/env python3
# -*- coding: utf-8 -*-

filepath = r'C:\Users\graha\Documents\GitHub\grey\screens\services\maritime-port-management.tsx'

# Read file 
with open(filepath, 'r', encoding='utf-8', errors='replace') as f:
    content = f.read()

print(f"Original content length: {len(content)} characters")

# Use replace method with different encoding/escaping
# Based on grep output, we know these sequences exist in the file
# Map from corrupted to correct
replacements = [
    ("\u00d0\u009f\u00a2", "\U0001f3e2"),      # building
    ("\u00e2\u0098\u00af\u00ef\u00b8\u008f", "\u2601\ufe0f"),  # cloud  
    ("\u00d0\u009f\u0086", "\U0001f3c6"),      # trophy
    ("\u00e2\u00ad", "\u2b50"),                 # star
    ("\u00d0\u009f\u0093\u0088", "\U0001f4c8"), # chart up
    ("\u00d0\u009f\u00a7\u00a0", "\U0001f9a0"), # brain
    ("\u00e2\u009c\u0085", "\u2705"),          # checkmark
    ("\u00d0\u009f\u009a\u0080", "\U0001f680"), # rocket
    ("\u00d0\u009f\u0093", "\U0001f4cb"),      # clipboard
    ("\u00d0\u009f\u008c", "\U0001f30d"),      # earth
    ("\u00e2\u009a\u0099\u00ef\u00b8\u008f", "\u2699\ufe0f"),  # gear
    ("\u00d0\u009f\u008e\u00af", "\U0001f3af"),  # target
    ("\u00d0\u009f\u0097\u00ef\u00b8\u008f", "\U0001f5e3\ufe0f"), # speech
    ("\u00d0\u009f\u0093\u008a", "\U0001f4ca"),  # chart
    ("\u00e2\u009a\u00a1", "\u26a1"),          # lightning
    ("\u00d0\u009f\u009b\u00a1\u00ef\u00b8\u008f", "\U0001f6e1\ufe0f"), # shield
    ("\u00e2\u009c\u00a8", "\u2728"),          # sparkles
    ("\u00d0\u009f\u0091\u00b0", "\U0001f4b0"), # money
    ("\u00e2\u0080\u009c", "\u2013"),          # dash
    ("\u00e2\u0086", "\u2191"),                 # arrow up
]

# Apply replacements
for old, new in replacements:
    if old in content:
        count = content.count(old)
        print(f"Replacing sequence ({count} times): {repr(old)} -> {new}")
        content = content.replace(old, new)

# Write back
with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print(f"New content length: {len(content)} characters")
print("Done!")
