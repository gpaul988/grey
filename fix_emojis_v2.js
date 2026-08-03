/* eslint-disable @typescript-eslint/no-require-imports */
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
  lines[i] = lines[i].replace(/ÃƒÂ°Ã…Â¸Ã‚Â¢/g, 'Ã°Å¸ÂÂ¢');
  lines[i] = lines[i].replace(/ÃƒÂ¢Ã‹Å“ÃƒÂ¯Ã‚Â¸/g, 'Ã¢ËœÂÃ¯Â¸Â');
  lines[i] = lines[i].replace(/ÃƒÂ°Ã…Â¸Ã¢â‚¬Â /g, 'Ã°Å¸Ââ€ ');
  lines[i] = lines[i].replace(/ÃƒÂ¢Ã‚Â­/g, 'Ã¢Â­Â');
  lines[i] = lines[i].replace(/ÃƒÂ°Ã…Â¸"Ã‹â€ /g, 'Ã°Å¸â€œË†');
  lines[i] = lines[i].replace(/ÃƒÂ°Ã…Â¸Ã‚Â§ /g, 'Ã°Å¸Â§Â ');
  lines[i] = lines[i].replace(/ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦/g, 'Ã¢Å“â€¦');
  lines[i] = lines[i].replace(/ÃƒÂ°Ã…Â¸Ã…Â¡Ã¢â€šÂ¬/g, 'Ã°Å¸Å¡â‚¬');
  lines[i] = lines[i].replace(/ÃƒÂ°Ã…Â¸"/g, 'Ã°Å¸â€œâ€¹');
  lines[i] = lines[i].replace(/ÃƒÂ°Ã…Â¸Ã…Å’/g, 'Ã°Å¸Å’Â');
  lines[i] = lines[i].replace(/ÃƒÂ¢Ã…Â¡Ã¢â€žÂ¢ÃƒÂ¯Ã‚Â¸/g, 'Ã¢Å¡â„¢Ã¯Â¸Â');
  lines[i] = lines[i].replace(/ÃƒÂ°Ã…Â¸Ã…Å½Ã‚Â¯/g, 'Ã°Å¸Å½Â¯');
  lines[i] = lines[i].replace(/ÃƒÂ°Ã…Â¸Ã¢â‚¬â€ÃƒÂ¯Ã‚Â¸/g, 'Ã°Å¸â€”Â£Ã¯Â¸Â');
  lines[i] = lines[i].replace(/ÃƒÂ°Ã…Â¸"Ã…Â /g, 'Ã°Å¸â€œÅ ');
  lines[i] = lines[i].replace(/ÃƒÂ¢Ã…Â¡Ã‚Â¡/g, 'Ã¢Å¡Â¡');
  lines[i] = lines[i].replace(/ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂºÃ‚Â¡ÃƒÂ¯Ã‚Â¸/g, 'Ã°Å¸â€ºÂ¡Ã¯Â¸Â');
  lines[i] = lines[i].replace(/ÃƒÂ¢Ã…â€œÃ‚Â¨/g, 'Ã¢Å“Â¨');
  lines[i] = lines[i].replace(/ÃƒÂ°Ã…Â¸'Ã‚Â°/g, 'Ã°Å¸â€™Â°');
  lines[i] = lines[i].replace(/ÃƒÂ¢Ã¢â€šÂ¬"/g, 'Ã¢â‚¬â€œ');
  lines[i] = lines[i].replace(/ÃƒÂ¢Ã¢â‚¬Â /g, 'Ã¢â€ â€˜');
}

content = lines.join('\n');
fs.writeFileSync(filepath, content, 'utf8');

console.log('All corrupted emoji sequences have been fixed!');
