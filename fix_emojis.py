#!/usr/bin/env python
# -*- coding: utf-8 -*-

file_path = r'C:\Users\graha\Documents\GitHub\grey\screens\services\maritime-port-management.tsx'

# Read the file
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replacement map using bytes for reliability
replacements = [
    (b'\xc3\xb0\xc2\x9f\xc2\xa2'.decode('utf-8', errors='replace'), chr(0x1f3e2)),  # ðŸ¢ -> 🏢
    (b'\xc3\xa2\xc2\x98\xc3\xaf\xc2\xb8'.decode('utf-8', errors='replace'), chr(0x2601) + chr(0xfe0f)),  # â˜ï¸ -> ☁️
    (b'\xc3\xb0\xc2\x9f\xc2\x86'.decode('utf-8', errors='replace'), chr(0x1f3c6)),  # ðŸ† -> 🏆
    (b'\xc3\xa2\xc2\xad'.decode('utf-8', errors='replace'), chr(0x2b50)),  # â­ -> ⭐
    (b'\xc3\xb0\xc2\x9f\xc2\x93\xc2\x88'.decode('utf-8', errors='replace'), chr(0x1f4c8)),  # ðŸ"ˆ -> 📈
    (b'\xc3\xb0\xc2\x9f\xc2\xa7\xc2\xa0'.decode('utf-8', errors='replace'), chr(0x1f9a0)),  # ðŸ§  -> 🧠
    (b'\xc3\xa2\xc2\x9c\xc2\x85'.decode('utf-8', errors='replace'), chr(0x2705)),  # âœ… -> ✅
    (b'\xc3\xb0\xc2\x9f\xc2\x9a\xc2\x80'.decode('utf-8', errors='replace'), chr(0x1f680)),  # ðŸš€ -> 🚀
    (b'\xc3\xb0\xc2\x9f\xc2\x93'.decode('utf-8', errors='replace'), chr(0x1f4cb)),  # ðŸ" -> 📋
    (b'\xc3\xb0\xc2\x9f\xc2\x8c'.decode('utf-8', errors='replace'), chr(0x1f30d)),  # ðŸŌ -> 🌍
    (b'\xc3\xa2\xc2\x9a\xc3\xa2\xc3\xaf\xc2\xb8'.decode('utf-8', errors='replace'), chr(0x2699) + chr(0xfe0f)),  # âš™ï¸ -> ⚙️
    (b'\xc3\xb0\xc2\x9f\xc2\x8e\xc2\xaf'.decode('utf-8', errors='replace'), chr(0x1f3af)),  # ðŸŎ¯ -> 🎯
    (b'\xc3\xb0\xc2\x9f\xc2\x97\xc3\xaf\xc2\xb8'.decode('utf-8', errors='replace'), chr(0x1f5e3) + chr(0xfe0f)),  # ðŸ—ï¸ -> 🗣️
    (b'\xc3\xb0\xc2\x9f\xc2\x93\xc2\x8a'.decode('utf-8', errors='replace'), chr(0x1f4ca)),  # ðŸ"Š -> 📊
    (b'\xc3\xa2\xc2\x9a\xc2\xa1'.decode('utf-8', errors='replace'), chr(0x26a1)),  # âš¡ -> ⚡
    (b'\xc3\xb0\xc2\x9f\xc2\x9b\xc2\xa1\xc3\xaf\xc2\xb8'.decode('utf-8', errors='replace'), chr(0x1f6e1) + chr(0xfe0f)),  # ðŸ›¡ï¸ -> 🛡️
    (b'\xc3\xa2\xc2\x9c\xc2\xa8'.decode('utf-8', errors='replace'), chr(0x2728)),  # âœ¨ -> ✨
    (b'\xc3\xb0\xc2\x9f\xc2\x91\xc2\xb0'.decode('utf-8', errors='replace'), chr(0x1f4b0)),  # ðŸ'° -> 💰
    (b'\xc3\xa2\xc2\x80\xc2\x9c'.decode('utf-8', errors='replace'), '–'),  # â€" -> –
    (b'\xc3\xa2\xc2\x86'.decode('utf-8', errors='replace'), '↑'),  # â† -> ↑
]

# Apply all replacements
for old, new in replacements:
    content = content.replace(old, new)

# Write back
with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("All corrupted emoji sequences have been replaced successfully!")
