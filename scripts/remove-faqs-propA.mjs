import fs from 'node:fs';
import { execSync } from 'node:child_process';

const data = JSON.parse(fs.readFileSync('scripts/faqs-extracted.json', 'utf8'));
const filesA = data.filter((o) => o.pattern === 'A').map((o) => o.file);

let done = 0;
for (const file of filesA) {
    let src = fs.readFileSync(file, 'utf8');
    const before = src;
    // Remove the whole faqs={[ ... ]} prop including trailing newline/indent.
    src = src.replace(/\n?\s*faqs=\{\[[\s\S]*?\]\}/, '');
    if (src !== before) {
        fs.writeFileSync(file, src);
        done++;
    } else {
        console.log('NO MATCH:', file);
    }
}
console.log(`Pattern A: removed faqs prop from ${done}/${filesA.length} files`);
