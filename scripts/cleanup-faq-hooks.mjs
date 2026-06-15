import fs from 'node:fs';

const data = JSON.parse(fs.readFileSync('scripts/faqs-extracted.json', 'utf8'));
const filesB = data.filter((o) => o.pattern === 'B').map((o) => o.file);

let cleaned = 0;
const notes = [];

for (const file of filesB) {
    let src = fs.readFileSync(file, 'utf8');
    const orig = src;

    // Remove optional comment + onIndex state + toggleFAQ function.
    src = src.replace(
        /\n?[ \t]*\/\/[^\n]*FAQ[^\n]*\n(?=[ \t]*const \[onIndex)/i,
        '\n'
    );
    src = src.replace(
        /[ \t]*const \[onIndex, setOnIndex\] = useState<number \| null>\(null\);\s*\n/,
        ''
    );
    src = src.replace(
        /[ \t]*const toggleFAQ = \(index: number\) => \{\s*setOnIndex\(onIndex === index \? null : index\);\s*\}\s*\n/,
        ''
    );

    // Remove now-unused AiOutlinePlus/AiOutlineMinus import if not used elsewhere.
    if (!/AiOutlinePlus|AiOutlineMinus/.test(src.replace(/import\s*\{[^}]*\}\s*from\s*["']react-icons\/ai["'];?/g, ''))) {
        src = src.replace(/\n?import\s*\{\s*AiOutlineMinus\s*,\s*AiOutlinePlus\s*\}\s*from\s*["']react-icons\/ai["'];?/g, '');
        src = src.replace(/\n?import\s*\{\s*AiOutlinePlus\s*,\s*AiOutlineMinus\s*\}\s*from\s*["']react-icons\/ai["'];?/g, '');
    }

    if (/onIndex|toggleFAQ|setOnIndex/.test(src)) {
        notes.push(file + ' (residual hook refs remain)');
    }
    if (src !== orig) {
        fs.writeFileSync(file, src);
        cleaned++;
    } else {
        notes.push(file + ' (no change)');
    }
}

console.log(`Hooks cleaned in ${cleaned}/${filesB.length}`);
if (notes.length) {
    console.log('NOTES:');
    notes.forEach((n) => console.log('  -', n));
}
