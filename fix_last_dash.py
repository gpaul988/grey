#!/usr/bin/env python3
# -*- coding: utf-8 -*-

filepath = r'C:\Users\graha\Documents\GitHub\grey\screens\services\maritime-port-management.tsx'

# Read as binary
with open(filepath, 'rb') as f:
    data = f.read()

print(f"Original file size: {len(data)} bytes")

# Find and fix the last corrupted dash pattern
# "functions???" where ??? is the corrupted dash
# Looking for the pattern: functions followed by corrupted bytes, then "including"

# 66756E6374696F6E73 = "functions"
# 696E636C7564696E67 = "including"

# Search for the pattern in hex
hexstring = data.hex()
print(f"Searching for functions...including pattern")

# The corrupted dash is likely between "functions" and "including"
search_pattern = b'functions'
idx = data.find(search_pattern)
if idx >= 0:
    # Get bytes after "functions"
    context_start = idx
    context_end = min(idx + 100, len(data))
    context = data[context_start:context_end]
    
    print(f"Found 'functions' at offset {idx}")
    print(f"Context hex: {context.hex()}")
    print(f"Context: {context}")

# Try to find any non-ASCII between "functions" and "including"  
# Replace common corrupted dash patterns
corrupted_dashes = [
    b'\xc3\xa2\xc2\x80\xc2\x9c',  # â€œ variant
    b'\xc3\xa2\xe2\x80\x9c',      # â€" variant
    b'\xc3\xa2\xc2\x9c\xc2\x9c',  # ââ€ variant  
]

correct_dash = b'\xe2\x80\x94'  # em dash (—)

total_replaced = 0
for corrupted in corrupted_dashes:
    count = data.count(corrupted)
    if count > 0:
        print(f"Replacing {corrupted.hex()}: {count} times")
        data = data.replace(corrupted, correct_dash)
        total_replaced += count

print(f"Total replacements: {total_replaced}")
print(f"New file size: {len(data)} bytes")

# Write back
with open(filepath, 'wb') as f:
    f.write(data)

print("Done!")
