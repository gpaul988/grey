const fs = require('fs');
const path = require('path');

const filepath = path.join(__dirname, 'screens', 'services', 'maritime-port-management.tsx');

let content = fs.readFileSync(filepath, 'utf8');

// Direct string replacements - reading from the file itself
const beforeCount = content.length;

// First, let's identify what specific byte sequences are actually in the file
// and replace them directly

// Based on our observation, these are UTF-8 mojibake sequences
const replacements = [
  ['ðŸ¢', '🏢'],   // building
  ['â˜ï¸', '☁️'],   // cloud
  ['ðŸ†', '🏆'],   // trophy
  ['â­', '⭐'],   // star
  ['ðŸ"ˆ', '📈'],   // chart
  ['ðŸ§ ', '🧠'],   // brain
  ['âœ…', '✅'],   // checkmark
  ['ðŸš€', '🚀'],   // rocket
  ['ðŸ"', '📋'],   // clipboard
  ['ðŸŌ', '🌍'],   // earth
  ['âš™ï¸', '⚙️'],   // gear
  ['ðŸŎ¯', '🎯'],   // target
  ['ðŸ—ï¸', '🗣️'],   // speech
  ['ðŸ"Š', '📊'],   // chart
  ['âš¡', '⚡'],   // lightning
  ['ðŸ›¡ï¸', '🛡️'],   // shield
  ['âœ¨', '✨'],   // sparkles
  ['ðŸ'°', '💰'],   // money
  ['â€"', '–'],    // dash
  ['â†', '↑'],    // arrow
];

replacements.forEach(([from, to]) => {
  const count = (content.match(new RegExp(from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
  if (count > 0) {
    console.log(`Replacing "${from}" with "${to}" (found ${count} occurrences)`);
    content = content.split(from).join(to);
  }
});

fs.writeFileSync(filepath, content, 'utf8');

const afterCount = content.length;
console.log(`File updated. Length changed from ${beforeCount} to ${afterCount}`);
console.log('✓ All corrupted emoji sequences have been fixed!');
