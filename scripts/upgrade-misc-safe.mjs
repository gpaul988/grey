/**
 * Safe misc page upgrade — only adds imports at top, doesn't modify existing JSX.
 * For each file, we:
 * 1. Add 'use client' if missing (as separate first line)
 * 2. Add useIsDayTime import at the TOP of imports
 * 3. Add FxBackground/FxChip imports at the TOP of imports
 * 4. Add isDayTime hook inside the component
 * 5. Do NOT modify existing className attributes (no template literal injection)
 */

import { readFileSync, writeFileSync } from 'fs';

const MISC_PAGES = [
    { path: '/home/user/grey/screens/Our-Approach.tsx', isClass: false, existingHook: false },
    { path: '/home/user/grey/screens/Startups.tsx', isClass: false, existingHook: true },
    { path: '/home/user/grey/screens/support.tsx', isClass: false, existingHook: true },
    { path: '/home/user/grey/screens/open-ticket.tsx', isClass: false, existingHook: false },
    { path: '/home/user/grey/screens/feeling.tsx', isClass: false, existingHook: false },
    { path: '/home/user/grey/screens/cookies-policy.tsx', isClass: false, existingHook: false },
    { path: '/home/user/grey/screens/data-protection-policy.tsx', isClass: false, existingHook: false },
    { path: '/home/user/grey/screens/Terms-Conditions.tsx', isClass: false, existingHook: false },
];

for (const { path: filePath, existingHook } of MISC_PAGES) {
    let src;
    try {
        src = readFileSync(filePath, 'utf-8');
    } catch {
        console.log(`MISSING: ${filePath}`);
        continue;
    }

    let newSrc = src;

    // 1. Add 'use client' if missing
    if (!newSrc.startsWith("'use client'") && !newSrc.startsWith('"use client"')) {
        newSrc = "'use client';\n\n" + newSrc;
    }

    // 2. Add imports if missing — insert BEFORE the first existing import line
    const firstImportIdx = newSrc.indexOf('\nimport ');
    
    const addImports = [];
    
    if (!newSrc.includes('useIsDayTime') && !existingHook) {
        addImports.push("import { useIsDayTime } from '../components/useIsDayTime';");
    }
    if (!newSrc.includes("futuristic/fx")) {
        addImports.push("import { FxBackground, FxChip, FxReveal, FxButton, FxHoloCard } from '@/components/futuristic/fx';");
    }
    
    if (addImports.length > 0 && firstImportIdx >= 0) {
        newSrc = newSrc.slice(0, firstImportIdx + 1) + addImports.join('\n') + '\n' + newSrc.slice(firstImportIdx + 1);
    }

    // 3. Add isDayTime hook if missing — find a safe injection point
    if (!newSrc.includes('isDayTime') && !existingHook) {
        // Find "const X = () => {" or "const X: React.FC = () => {" pattern
        const componentDefMatch = newSrc.match(/const\s+\w+[^=\n]*=\s*\(\s*\)\s*(?::\s*[^{]+)?\s*=>\s*\{(?:\s*\()?/);
        if (componentDefMatch) {
            const matchEnd = newSrc.indexOf(componentDefMatch[0]) + componentDefMatch[0].length;
            newSrc = newSrc.slice(0, matchEnd) + '\n    const isDayTime = useIsDayTime();' + newSrc.slice(matchEnd);
        } else {
            // Try "export default function X() {"
            const funcMatch = newSrc.match(/export\s+default\s+function\s+\w+\s*\([^)]*\)\s*\{/);
            if (funcMatch) {
                const matchEnd = newSrc.indexOf(funcMatch[0]) + funcMatch[0].length;
                newSrc = newSrc.slice(0, matchEnd) + '\n    const isDayTime = useIsDayTime();' + newSrc.slice(matchEnd);
            }
        }
    }

    writeFileSync(filePath, newSrc, 'utf-8');
    console.log(`UPGRADED: ${filePath.split('/').pop()}`);
}

console.log('\nMisc pages done.');
