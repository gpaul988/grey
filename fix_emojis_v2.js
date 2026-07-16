const fs = require('fs');
const path = require('path');

const filepath = path.join(__dirname, 'screens', 'services', 'maritime-port-management.tsx');

let content = fs.readFileSync(filepath, 'utf8');

// Map corrupted UTF-8 sequences to correct emojis
// These are the actual mojibake sequences in the file
const replacementMap = new Map([
  [String.fromCharCode(0xd0, 0x9f, 0xd0, 0xa2), String.fromCharCode(0xf0, 0x9f, 0x8f, 0xa2)], // building
  [String.fromCharCode(0xd0, 0x9e, 0xd0, 0x98, 0xd0, 0xaf, 0xd0, 0xb8), String.fromCharCode(0xe2, 0x98, 0x81, 0xef, 0xb8, 0x8f)], // cloud
]);

// Actually, let's just do simple string-based replacement with the literal strings
// Read the file and replace line by line
let lines = content.split('\n');
for (let i = 0; i < lines.length; i++) {
  // Direct replacements
  lines[i] = lines[i].replace(/ðŸ¢/g, '🏢');
  lines[i] = lines[i].replace(/â˜ï¸/g, '☁️');
  lines[i] = lines[i].replace(/ðŸ†/g, '🏆');
  lines[i] = lines[i].replace(/â­/g, '⭐');
  lines[i] = lines[i].replace(/ðŸ"ˆ/g, '📈');
  lines[i] = lines[i].replace(/ðŸ§ /g, '🧠');
  lines[i] = lines[i].replace(/âœ…/g, '✅');
  lines[i] = lines[i].replace(/ðŸš€/g, '🚀');
  lines[i] = lines[i].replace(/ðŸ"/g, '📋');
  lines[i] = lines[i].replace(/ðŸŌ/g, '🌍');
  lines[i] = lines[i].replace(/âš™ï¸/g, '⚙️');
  lines[i] = lines[i].replace(/ðŸŎ¯/g, '🎯');
  lines[i] = lines[i].replace(/ðŸ—ï¸/g, '🗣️');
  lines[i] = lines[i].replace(/ðŸ"Š/g, '📊');
  lines[i] = lines[i].replace(/âš¡/g, '⚡');
  lines[i] = lines[i].replace(/ðŸ›¡ï¸/g, '🛡️');
  lines[i] = lines[i].replace(/âœ¨/g, '✨');
  lines[i] = lines[i].replace(/ðŸ'°/g, '💰');
  lines[i] = lines[i].replace(/â€"/g, '–');
  lines[i] = lines[i].replace(/â†/g, '↑');
}

content = lines.join('\n');
fs.writeFileSync(filepath, content, 'utf8');

console.log('All corrupted emoji sequences have been fixed!');
