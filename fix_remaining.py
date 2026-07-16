#!/usr/bin/env python3
# -*- coding: utf-8 -*-

filepath = r'C:\Users\graha\Documents\GitHub\grey\screens\services\maritime-port-management.tsx'

# Read as binary
with open(filepath, 'rb') as f:
    data = f.read()

print(f"Original file size: {len(data)} bytes")

# Final set of remaining emoji patterns (hex from analysis)
replacements_hex = [
    # Remaining patterns found
    (bytes.fromhex('C3B0C5B8E2809DC290'), b'\xf0\x9f\x93\x8b'),  # clipboard variant 1
    (bytes.fromhex('C3B0C5B8C592C290'), b'\xf0\x9f\x8c\x8d'),  # earth variant
    (bytes.fromhex('C3B0C5B8E2809CC5A0'), b'\xf0\x9f\x93\x8a'),  # chart variant
    (bytes.fromhex('C3B0C5B8E28099C2B0'), b'\xf0\x9f\x92\xb0'),  # money variant
    (bytes.fromhex('C3B0C5B8C2908C'), b'\xf0\x9f\x8c\x8d'),  # earth (different encoding)
    (bytes.fromhex('C3A2E2809CC590'), b'\xe2\x80\x93'),  # dash variant
]

# Apply all replacements
total_count = 0
for old_bytes, new_bytes in replacements_hex:
    count = data.count(old_bytes)
    if count > 0:
        print(f"Replacing {old_bytes.hex()}: {count} occurrence(s)")
        data = data.replace(old_bytes, new_bytes)
        total_count += count

print(f"\nTotal replacements: {total_count}")
print(f"New file size: {len(data)} bytes")

# Write back
with open(filepath, 'wb') as f:
    f.write(data)

print("All remaining corrupted sequences have been fixed!")
