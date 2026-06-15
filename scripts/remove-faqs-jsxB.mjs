import fs from 'node:fs';

const data = JSON.parse(fs.readFileSync('scripts/faqs-extracted.json', 'utf8'));
const filesB = data.filter((o) => o.pattern === 'B').map((o) => o.file);

// Find matching close index of a JSX <div ...> starting at openIdx (index of '<').
// Returns index just AFTER the matching </div>, or -1.
function matchDiv(src, openIdx) {
    // Walk tags from openIdx, counting div depth. Handles self-closing <div ... /> (rare here).
    const tagRe = /<(\/?)div\b([^>]*?)(\/?)>/g;
    tagRe.lastIndex = openIdx;
    let depth = 0;
    let m;
    while ((m = tagRe.exec(src))) {
        const isClose = m[1] === '/';
        const selfClose = m[3] === '/';
        if (m.index < openIdx) continue;
        if (isClose) {
            depth--;
            if (depth === 0) return tagRe.lastIndex; // index after this </div>
        } else if (!selfClose) {
            depth++;
        }
        // self-closing div: no depth change
    }
    return -1;
}

let okCount = 0;
const failed = [];

for (const file of filesB) {
    let src = fs.readFileSync(file, 'utf8');
    const orig = src;

    const firstToggle = src.indexOf('toggleFAQ(');
    if (firstToggle === -1) {
        // maybe only in JSX render via onIndex; fall back
        failed.push(file + ' (no toggleFAQ call)');
        continue;
    }
    // find LAST toggleFAQ to ensure our chosen div contains all of them
    const lastToggle = src.lastIndexOf('toggleFAQ(');

    // Walk backwards collecting candidate <div opening positions before firstToggle.
    const opens = [];
    const openRe = /<div\b/g;
    let mm;
    while ((mm = openRe.exec(src)) && mm.index < firstToggle) opens.push(mm.index);

    // Try candidates from nearest-before-first-toggle going outward (reverse),
    // pick the smallest div that fully wraps [firstToggle..lastToggle] and whose
    // close is reasonably tight (the FAQ section wrapper).
    let chosenStart = -1;
    let chosenEnd = -1;
    for (let i = opens.length - 1; i >= 0; i--) {
        const start = opens[i];
        const end = matchDiv(src, start);
        if (end === -1) continue;
        if (start < firstToggle && end > lastToggle) {
            // This div wraps the whole FAQ list. Keep going outward only if this
            // one ALSO wraps a heading like "Frequently"/"FAQ". Prefer the one that
            // starts closest to a FAQ heading. We accept the first (innermost) wrap,
            // then expand to include a preceding heading div if it's the section.
            chosenStart = start;
            chosenEnd = end;
            break;
        }
    }

    if (chosenStart === -1) {
        failed.push(file + ' (no wrapping div found)');
        continue;
    }

    // Expand upward: if there is a section <div ... id={'FAQ'|'faq-section'}> or a
    // heading "Frequently"/"FAQ" just above that this wrapper is nested in, prefer it.
    // Look for an enclosing div whose content includes a Frequently/FAQ heading.
    for (let i = opens.length - 1; i >= 0; i--) {
        const start = opens[i];
        if (start >= chosenStart) continue;
        const end = matchDiv(src, start);
        if (end === -1) continue;
        if (start < chosenStart && end >= chosenEnd) {
            const inner = src.slice(start, end);
            if (/Frequently|FAQ&|FAQ\b|frequently asked|Got questions/i.test(inner) && /toggleFAQ/.test(inner)) {
                // ensure it doesn't swallow unrelated big sections: require it to start
                // within ~3000 chars before chosenStart
                if (chosenStart - start < 4000) {
                    chosenStart = start;
                    chosenEnd = end;
                }
            }
        }
    }

    // Also absorb a leading {/* ... */} comment immediately preceding chosenStart.
    let cut = chosenStart;
    const before = src.slice(Math.max(0, chosenStart - 200), chosenStart);
    const cm = before.match(/\{\/\*[^]*?\*\/\}\s*$/);
    if (cm) cut = chosenStart - (before.length - cm.index);

    src = src.slice(0, cut) + src.slice(chosenEnd);

    // sanity: removed region must have contained toggleFAQ and be non-trivial
    const removed = orig.length - src.length;
    if (removed < 200 || src.includes('toggleFAQ(')) {
        failed.push(file + ` (removed ${removed} chars; toggleFAQ still present=${src.includes('toggleFAQ(')})`);
        continue;
    }

    fs.writeFileSync(file, src);
    okCount++;
}

console.log(`Pattern B: cleaned ${okCount}/${filesB.length}`);
if (failed.length) {
    console.log('FAILED (handle manually):');
    failed.forEach((f) => console.log('  -', f));
}
