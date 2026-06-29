/**
 * Upgrades misc pages with futuristic hero + isDayTime additions.
 * Pages: Our-Approach, Startups, support, open-ticket, feeling, cookies-policy,
 *        data-protection-policy, Terms-Conditions
 */

import { readFileSync, writeFileSync } from 'fs';

const MISC_PAGES = [
    '/home/user/grey/screens/Our-Approach.tsx',
    '/home/user/grey/screens/Startups.tsx',
    '/home/user/grey/screens/support.tsx',
    '/home/user/grey/screens/open-ticket.tsx',
    '/home/user/grey/screens/feeling.tsx',
    '/home/user/grey/screens/cookies-policy.tsx',
    '/home/user/grey/screens/data-protection-policy.tsx',
    '/home/user/grey/screens/Terms-Conditions.tsx',
];

for (const filePath of MISC_PAGES) {
    let src;
    try {
        src = readFileSync(filePath, 'utf-8');
    } catch {
        console.log(`MISSING: ${filePath}`);
        continue;
    }

    // Skip if already upgraded
    if (src.includes('gx-scanline') || src.includes('FxHoloCard') || src.includes('gx-hero-title')) {
        console.log(`SKIP (already upgraded): ${filePath.split('/').pop()}`);
        continue;
    }

    let newSrc = src;

    // 1. Add 'use client' if missing
    if (!newSrc.startsWith("'use client'") && !newSrc.startsWith('"use client"')) {
        newSrc = "'use client';\n\n" + newSrc;
    }

    // 2. Add useIsDayTime import if missing
    if (!newSrc.includes('useIsDayTime') && !newSrc.includes('isDayTime')) {
        const lastImportIdx = newSrc.lastIndexOf('\nimport ');
        const endOfLastImport = newSrc.indexOf('\n', lastImportIdx + 1);
        const hookImport = `\nimport { useIsDayTime } from '../components/useIsDayTime';`;
        newSrc = newSrc.slice(0, endOfLastImport + 1) + hookImport + newSrc.slice(endOfLastImport + 1);
    }

    // 3. Add FxChip/FxReveal/FxBackground imports if missing
    if (!newSrc.includes("futuristic/fx")) {
        const lastImportIdx = newSrc.lastIndexOf('\nimport ');
        const endOfLastImport = newSrc.indexOf('\n', lastImportIdx + 1);
        const fxImportLine = `\nimport { FxBackground, FxChip, FxReveal, FxButton, FxHoloCard } from '@/components/futuristic/fx';`;
        newSrc = newSrc.slice(0, endOfLastImport + 1) + fxImportLine + newSrc.slice(endOfLastImport + 1);
    }

    // 4. Add isDayTime hook call in component body if missing
    if (!newSrc.includes('isDayTime')) {
        // Try to inject after first useState or first const in component
        newSrc = newSrc.replace(
            /const\s+\w+\s*=\s*\(\s*\)\s*=>\s*\{/,
            (match) => match + '\n    const isDayTime = useIsDayTime();'
        );
        if (!newSrc.includes('isDayTime')) {
            // Functional component pattern: const X: React.FC = () => {
            newSrc = newSrc.replace(
                /const\s+\w+[:\s]+React\.FC\s*=\s*\(\s*\)\s*=>\s*\{/,
                (match) => match + '\n    const isDayTime = useIsDayTime();'
            );
        }
        if (!newSrc.includes('isDayTime')) {
            // Default export function
            newSrc = newSrc.replace(
                /export\s+default\s+function\s+\w+\s*\(\s*\)\s*\{/,
                (match) => match + '\n    const isDayTime = useIsDayTime();'
            );
        }
    }

    // 5. Upgrade hero sections: wrap h1 in FxGlitchText style + add scanline
    // Specifically find hero divs with h-[70vh] or similar and inject FX
    if (newSrc.includes('h-[70vh]') || newSrc.includes('min-h-[70vh]')) {
        // Find the hero section/div
        const heroSectionIdx = Math.max(
            newSrc.indexOf('h-[70vh]'),
            newSrc.indexOf('min-h-[70vh]')
        );
        // Walk back to find the wrapping div/section open tag
        const beforeHero = newSrc.slice(0, heroSectionIdx);
        const lastOpenTag = Math.max(
            beforeHero.lastIndexOf('<section'),
            beforeHero.lastIndexOf('<div')
        );
        if (lastOpenTag > -1) {
            const tagEnd = newSrc.indexOf('>', lastOpenTag) + 1;
            if (!newSrc.slice(tagEnd, tagEnd + 200).includes('gx-scanline')) {
                const injectFX = `\n                {/* ─── Futuristic FX overlay ─── */}\n                <div className="pointer-events-none absolute inset-0 z-[2] overflow-hidden"><div className="gx-scanline" /><div className="gx-noise-overlay" /></div>`;
                newSrc = newSrc.slice(0, tagEnd) + injectFX + newSrc.slice(tagEnd);
            }
        }
    }

    // 6. Upgrade page backgrounds to use isDayTime where hardcoded bg-white or bg-gray-50
    if (!newSrc.includes('isDayTime') || newSrc.includes('bg-gray-50')) {
        // Careful replacement only in root wrapper div
        newSrc = newSrc.replace(
            'className="bg-gray-50 text-black min-h-screen',
            'className={`${isDayTime ? \'bg-white text-black\' : \'bg-[#050810] text-white\'} min-h-screen'
        );
    }

    writeFileSync(filePath, newSrc, 'utf-8');
    console.log(`UPGRADED: ${filePath.split('/').pop()}`);
}

console.log('\nMisc pages done.');
