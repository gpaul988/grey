/**
 * Injects a hidden CSRF field into every POST form in the EJS admin views.
 * The server enables doubleCsrfProtection on all session paths and exposes
 * `csrfToken` to views, but the forms were missing the token — which would
 * make every admin/login/register POST fail. This wires them up.
 *
 * Idempotent: skips forms that already contain name="_csrf".
 */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const VIEWS = path.resolve(__dirname, '..', 'Admin', 'views');

const FIELD = '\n                                <input type="hidden" name="_csrf" value="<%= typeof csrfToken !== \'undefined\' ? csrfToken : \'\' %>">';

function walk(dir) {
    const out = [];
    for (const e of fs.readdirSync(dir, {withFileTypes: true})) {
        const full = path.join(dir, e.name);
        if (e.isDirectory()) out.push(...walk(full));
        else if (e.name.endsWith('.ejs')) out.push(full);
    }
    return out;
}

let patched = 0;
let formsTouched = 0;

for (const file of walk(VIEWS)) {
    let src = fs.readFileSync(file, 'utf8');
    // Match opening <form ...> tags that use method post (any quoting/spacing).
    const formOpen = /<form\b[^>]*\bmethod\s*=\s*["']?post["']?[^>]*>/gi;
    let changed = false;
    src = src.replace(formOpen, (tag, offset, full) => {
        // Look ahead a little after the tag to see if a _csrf field already exists
        // within the next 400 chars (cheap heuristic to stay idempotent).
        const after = full.slice(offset + tag.length, offset + tag.length + 600);
        if (/name=["']_csrf["']/.test(after) || /name=["']_csrf["']/.test(tag)) return tag;
        formsTouched++;
        changed = true;
        return tag + FIELD;
    });
    if (changed) {
        fs.writeFileSync(file, src);
        patched++;
        console.log('patched', path.relative(VIEWS, file));
    }
}

console.log(`\nDone. Files patched: ${patched}, forms wired: ${formsTouched}`);
