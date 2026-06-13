/**
 * Dedupe Header/Footer: the App Router root layout (app/layout.tsx) now renders
 * <Header/> and <Footer/> globally. Legacy screens (migrated from the Pages
 * Router) ALSO render their own, producing a doubled header + footer on every
 * page. This script NEUTRALIZES (does not delete) the per-screen renders by
 * wrapping the JSX element in a `{false && ...}` guard and a clear comment, so
 * the markup is preserved and trivially reversible.
 *
 * It only touches self-closing <Header/> / <Footer/> (and <Header />, etc.)
 * JSX usages — imports are left intact.
 */
import {readFileSync, writeFileSync} from 'node:fs';
import {globSync} from 'node:fs';
import {execSync} from 'node:child_process';

const files = execSync('grep -rl "<Header\\|<Footer" screens/', {encoding: 'utf8'})
    .trim()
    .split('\n')
    .filter(Boolean);

let changed = 0;
const log = [];

for (const file of files) {
    let src = readFileSync(file, 'utf8');
    const before = src;

    // Match self-closing <Header/> or <Header /> (and Footer), with optional
    // surrounding whitespace, NOT already neutralized.
    // We wrap as: {/* moved to app/layout.tsx (dedupe) */ false && <Header/>}
    src = src.replace(
        /(^[ \t]*)(<(Header|Footer)\s*\/>)/gm,
        (m, indent, tag, name) => {
            // Skip if previous neutralization marker is right before it.
            return `${indent}{/* ${name} now provided globally by app/layout.tsx — duplicate render disabled to fix doubled ${name.toLowerCase()} */ false && ${tag}}`;
        },
    );

    if (src !== before) {
        writeFileSync(file, src, 'utf8');
        changed++;
        log.push(file);
    }
}

console.log(`Neutralized duplicate Header/Footer in ${changed} files:`);
log.forEach((f) => console.log('  ' + f));
