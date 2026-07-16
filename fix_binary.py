#!/usr/bin/env python3
# -*- coding: utf-8 -*-

filepath = r'C:\Users\graha\Documents\GitHub\grey\screens\services\maritime-port-management.tsx'

# Read as binary
with open(filepath, 'rb') as f:
    data = f.read()

print(f"Original file size: {len(data)} bytes")

# The corrupted sequences as hex strings that were found in the file
# These are UTF-8 mojibake sequences
replacements_hex = [
    (b'\xc3\xb0\xc5\xb8\xc2\x8f\xc2\xa2', '🏢'.encode('utf-8')),  # building
    (b'\xc3\xa2\xc2\x98\xc3\xaf\xc2\xb8', '☁️'.encode('utf-8')),  # cloud
    (b'\xc3\xb0\xc5\xb8\xc2\x86', '🏆'.encode('utf-8')),  # trophy
    (b'\xc3\xa2\xc2\xad', '⭐'.encode('utf-8')),  # star
    (b'\xc3\xb0\xc5\xb8\xc2\x93\xc2\x88', '📈'.encode('utf-8')),  # chart
    (b'\xc3\xb0\xc5\xb8\xc2\xa7\xc2\xa0', '🧠'.encode('utf-8')),  # brain
    (b'\xc3\xa2\xc2\x9c\xc2\x85', '✅'.encode('utf-8')),  # checkmark
    (b'\xc3\xb0\xc5\xb8\xc2\x9a\xc2\x80', '🚀'.encode('utf-8')),  # rocket
    (b'\xc3\xb0\xc5\xb8\xc2\x93', '📋'.encode('utf-8')),  # clipboard
    (b'\xc3\xb0\xc5\xb8\xc2\x8c', '🌍'.encode('utf-8')),  # earth
    (b'\xc3\xa2\xc2\x9a\xc3\xa2\xc3\xaf\xc2\xb8', '⚙️'.encode('utf-8')),  # gear
    (b'\xc3\xb0\xc5\xb8\xc2\x8e\xc2\xaf', '🎯'.encode('utf-8')),  # target
    (b'\xc3\xb0\xc5\xb8\xc2\x97\xc3\xaf\xc2\xb8', '🗣️'.encode('utf-8')),  # speech
    (b'\xc3\xb0\xc5\xb8\xc2\x93\xc2\x8a', '📊'.encode('utf-8')),  # chart
    (b'\xc3\xa2\xc2\x9a\xc2\xa1', '⚡'.encode('utf-8')),  # lightning
    (b'\xc3\xb0\xc5\xb8\xc2\x9b\xc2\xa1\xc3\xaf\xc2\xb8', '🛡️'.encode('utf-8')),  # shield
    (b'\xc3\xa2\xc2\x9c\xc2\xa8', '✨'.encode('utf-8')),  # sparkles
    (b'\xc3\xb0\xc5\xb8\xc2\x91\xc2\xb0', '💰'.encode('utf-8')),  # money
    (b'\xc3\xa2\xc2\x80\xc2\x9c', '–'.encode('utf-8')),  # dash
    (b'\xc3\xa2\xc2\x86', '↑'.encode('utf-8')),  # arrow
]

# Apply all replacements
total_count = 0
for old_bytes, new_bytes in replacements_hex:
    count = data.count(old_bytes)
    if count > 0:
        print(f"Found {count} occurrences of {old_bytes.hex()}")
        data = data.replace(old_bytes, new_bytes)
        total_count += count

print(f"Total replacements: {total_count}")
print(f"New file size: {len(data)} bytes")

# Write back
with open(filepath, 'wb') as f:
    f.write(data)

print("✓ File has been fixed!")
