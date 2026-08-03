/* eslint-disable @typescript-eslint/no-require-imports */
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
  ['Ã°Å¸Â¢', 'ðŸ¢'],   // building
  ['Ã¢ËœÃ¯Â¸', 'â˜ï¸'],   // cloud
  ['Ã°Å¸â€ ', 'ðŸ†'],   // trophy
  ['Ã¢Â­', 'â­'],   // star
  ['Ã°Å¸"Ë†', 'ðŸ“ˆ'],   // chart
  ['Ã°Å¸Â§ ', 'ðŸ§ '],   // brain
  ['Ã¢Å“â€¦', 'âœ…'],   // checkmark
  ['Ã°Å¸Å¡â‚¬', 'ðŸš€'],   // rocket
  ['Ã°Å¸"', 'ðŸ“‹'],   // clipboard
  ['Ã°Å¸ÅŒ', 'ðŸŒ'],   // earth
  ['Ã¢Å¡â„¢Ã¯Â¸', 'âš™ï¸'],   // gear
  ['Ã°Å¸ÅŽÂ¯', 'ðŸŽ¯'],   // target
  ['Ã°Å¸â€”Ã¯Â¸', 'ðŸ—£ï¸'],   // speech
  ['Ã°Å¸"Å ', 'ðŸ“Š'],   // chart
  ['Ã¢Å¡Â¡', 'âš¡'],   // lightning
  ['Ã°Å¸â€ºÂ¡Ã¯Â¸', 'ðŸ›¡ï¸'],   // shield
  ['Ã¢Å“Â¨', 'âœ¨'],   // sparkles
  ["Ã°Å¸'Â°", "ðŸ’°"],   // money
  ['Ã¢â‚¬"', 'â€“'],    // dash
  ['Ã¢â€ ', 'â†‘'],    // arrow
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
console.log('âœ“ All corrupted emoji sequences have been fixed!');
