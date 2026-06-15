import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve('screens');
const files = [];
function walk(d) {
    for (const e of fs.readdirSync(d, {withFileTypes: true})) {
        const p = path.join(d, e.name);
        if (e.isDirectory()) walk(p);
        else if (e.name.endsWith('.tsx') && e.name !== 'faq.tsx') files.push(p);
    }
}
walk(ROOT);

const clean = (s) =>
    s
        .replace(/<br\s*\/?>/gi, ' ')
        .replace(/&apos;|&#39;|&rsquo;/g, "'")
        .replace(/&quot;/g, '"')
        .replace(/&amp;/g, '&')
        .replace(/&ldquo;|&rdquo;/g, '"')
        .replace(/\s+/g, ' ')
        .trim();

// Category derived from file path.
function catFor(file) {
    const rel = path.relative(ROOT, file).replace(/\.tsx$/, '');
    if (rel === 'Home') return 'General';
    if (rel === 'support') return 'Support';
    if (rel === 'Startups') return 'Startups';
    if (rel.startsWith('industries/')) return 'Industries';
    if (rel.startsWith('services/')) return 'Services';
    return 'General';
}

const out = [];
let totalQ = 0;

for (const file of files) {
    const src = fs.readFileSync(file, 'utf8');
    const cat = catFor(file);
    const items = [];

    // PATTERN A: faqs={[ {q:'...', a:'...'}, ... ]}
    const propMatch = src.match(/faqs=\{\[([\s\S]*?)\]\}/);
    if (propMatch) {
        const block = propMatch[1];
        const re = /\{\s*q:\s*(['"`])([\s\S]*?)\1\s*,\s*a:\s*(['"`])([\s\S]*?)\3\s*\}/g;
        let m;
        while ((m = re.exec(block))) {
            items.push({question: clean(m[2]), answer: clean(m[4])});
        }
    }

    // PATTERN C: FAQS array — const FAQS...: [] = [ {q:'...', a:'...'}, ... ]
    let patternC = false;
    if (items.length === 0) {
        const arrMatch = src.match(/(?:FAQS|FAQ_ITEMS|faqList)[^=]*=\s*\[([\s\S]*?)\];/);
        if (arrMatch) {
            const block = arrMatch[1];
            const re = /\{\s*q:\s*(['"`])([\s\S]*?)\1\s*,\s*a:\s*(['"`])([\s\S]*?)\3\s*,?\s*\}/g;
            let m;
            while ((m = re.exec(block))) {
                items.push({question: clean(m[2]), answer: clean(m[4])});
            }
            if (items.length) patternC = true;
        }
    }

    // PATTERN B: hardcoded JSX — <span>Question</span> ... <p ...>Answer</p>
    if (items.length === 0 && /toggleFAQ/.test(src)) {
        // grab each toggle block: <span>Q</span> then later first <p ...>A</p>
        const spanRe = /<span>([\s\S]*?)<\/span>/g;
        // We need Q/A pairs in order. Questions are inside <span> within the button;
        // answers are inside the conditional <p ...>...</p> right after.
        // Strategy: split on toggleFAQ( occurrences.
        const parts = src.split(/onClick=\{\(\)\s*=>\s*toggleFAQ\(\d+\)\}/);
        // parts[i] (i>=1) begins right after the onClick; question is first <span>, answer is first <p>
        for (let i = 1; i < parts.length; i++) {
            const seg = parts[i];
            const qm = seg.match(/<span>([\s\S]*?)<\/span>/);
            const am = seg.match(/<p[^>]*>([\s\S]*?)<\/p>/);
            if (qm && am) {
                const q = clean(qm[1]);
                const a = clean(am[1]);
                if (q && a && q.length < 300) items.push({question: q, answer: a});
            }
        }
    }

    if (items.length) {
        out.push({file: path.relative(process.cwd(), file), category: cat, pattern: propMatch ? 'A' : patternC ? 'C' : 'B', count: items.length, items});
        totalQ += items.length;
    }
}

fs.writeFileSync('scripts/faqs-extracted.json', JSON.stringify(out, null, 2));
console.log(`Files with FAQs: ${out.length}`);
console.log(`Total Q&A: ${totalQ}`);
console.log('By category:');
const byCat = {};
for (const o of out) byCat[o.category] = (byCat[o.category] || 0) + o.count;
console.log(byCat);
console.log('Pattern A (prop):', out.filter((o) => o.pattern === 'A').length, '| B (jsx):', out.filter((o) => o.pattern === 'B').length, '| C (array):', out.filter((o) => o.pattern === 'C').length);
