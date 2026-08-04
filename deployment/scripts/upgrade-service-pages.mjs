/**
 * Upgrades ALL service pages to use the futuristic design system.
 * Strategy: inject FuturisticServiceLayout wrapper around existing content
 * rather than rewriting from scratch, to preserve all content.
 *
 * For each file:
 * 1. Add FuturisticServiceLayout import
 * 2. Replace the plain h1 hero section with an enhanced layout
 * 3. Ensure isDayTime is used
 */

import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

const SERVICES_DIR = '/home/user/grey/screens/services';

const files = readdirSync(SERVICES_DIR).filter(f => f.endsWith('.tsx'));

let upgraded = 0;
let skipped = 0;

for (const file of files) {
    const filePath = join(SERVICES_DIR, file);
    let src = readFileSync(filePath, 'utf-8');

    // Skip if already upgraded
    if (src.includes('FuturisticServiceLayout') || src.includes('gx-page-hero')) {
        console.log(`SKIP (already upgraded): ${file}`);
        skipped++;
        continue;
    }

    // Add imports
    let newSrc = src;

    // 1. Add FuturisticServiceLayout import after first 'use client' or existing imports
    if (!newSrc.includes("FuturisticServiceLayout")) {
        // Find insertion point — after the last import line
        const lastImportIdx = newSrc.lastIndexOf('\nimport ');
        const endOfLastImport = newSrc.indexOf('\n', lastImportIdx + 1);
        const importLine = `\nimport FuturisticServiceLayout from '@/components/futuristic/FuturisticServiceLayout';`;
        newSrc = newSrc.slice(0, endOfLastImport + 1) + importLine + newSrc.slice(endOfLastImport + 1);
    }

    // 2. Add FxBackground, FxChip etc imports if missing
    if (!newSrc.includes("FxBackground") && !newSrc.includes("futuristic/fx")) {
        const lastImportIdx = newSrc.lastIndexOf('\nimport ');
        const endOfLastImport = newSrc.indexOf('\n', lastImportIdx + 1);
        const fxImportLine = `\nimport { FxBackground, FxChip, FxReveal, FxButton, FxHoloCard } from '@/components/futuristic/fx';`;
        newSrc = newSrc.slice(0, endOfLastImport + 1) + fxImportLine + newSrc.slice(endOfLastImport + 1);
    } else if (newSrc.includes("from '@/components/futuristic/fx'") || newSrc.includes('from "@/components/futuristic/fx"')) {
        // Already has fx import, ensure new components included
        newSrc = newSrc
            .replace("} from '@/components/futuristic/fx'", ", FxHoloCard } from '@/components/futuristic/fx'")
            .replace("} from \"@/components/futuristic/fx\"", ", FxHoloCard } from \"@/components/futuristic/fx\"");
        // Clean up double entries
        newSrc = newSrc.replace(', FxHoloCard, FxHoloCard }', ', FxHoloCard }');
    }

    // 3. Remove old imports that are no longer needed at top (Header, Footer are in layout)
    // Keep them — they might be used. Just add FuturisticServiceLayout.

    // 4. Inject isDayTime if missing
    if (!newSrc.includes('useIsDayTime') && !newSrc.includes('isDayTime')) {
        // Add import
        const lastImportIdx = newSrc.lastIndexOf('\nimport ');
        const endOfLastImport = newSrc.indexOf('\n', lastImportIdx + 1);
        const hookImport = `\nimport { useIsDayTime } from '../../components/useIsDayTime';`;
        newSrc = newSrc.slice(0, endOfLastImport + 1) + hookImport + newSrc.slice(endOfLastImport + 1);
        // Add hook usage after first useState/useRef in component
        newSrc = newSrc.replace(
            'const [isVisible, setIsVisible] = useState(false);',
            'const [isVisible, setIsVisible] = useState(false);\n    const isDayTime = useIsDayTime();'
        );
    }

    // 5. Wrap the return's root div with FuturisticServiceLayout
    // Find the main <div className={`${isDayTime ? 'bg-white' : 'bg-black'}...`}>
    // Replace it with FuturisticServiceLayout wrapper + pass content
    
    // Pattern: find the hero h1 section and add scanline overlay + gx-hero-title class
    // We'll do a targeted hero enhancement — add the FX hero overlay on top of existing hero
    
    // Find the hero div pattern: <div id={'hero'}
    const heroPattern = `<div id={'hero'}`;
    const heroPatternAlt = `<div id={"hero"}`;
    
    if (newSrc.includes(heroPattern) || newSrc.includes(heroPatternAlt)) {
        // Add FX overlay to the hero div by injecting after the opening tag
        const injectAfterHero = `
                {/* ─── Futuristic FX overlay (hero enhancement) ─── */}
                <div className="pointer-events-none absolute inset-0 z-[2] overflow-hidden">
                    <div className="gx-scanline" />
                    <div className="gx-noise-overlay" />
                    <div className="gx-orbit absolute" style={{ width: '60vmax', height: '60vmax', top: '-20vmax', right: '-20vmax', opacity: .15 }} />
                </div>`;
        
        // Inject FX only if not already there
        if (!newSrc.includes('Futuristic FX overlay (hero enhancement)')) {
            // Find the end of <div id={'hero'} ...> opening tag
            const heroStart = newSrc.includes(heroPattern) 
                ? newSrc.indexOf(heroPattern) 
                : newSrc.indexOf(heroPatternAlt);
            const heroTagEnd = newSrc.indexOf('>', heroStart) + 1;
            newSrc = newSrc.slice(0, heroTagEnd) + injectAfterHero + newSrc.slice(heroTagEnd);
        }
    }

    // 6. Upgrade h1 in hero to use gx-hero-title + gx-gradient-text  
    // Find pattern: className={`...lg:text-[5em]...`} on h1s
    newSrc = newSrc.replace(
        /className={`border-b pb-\[0\.5em\] border-gray-500\/50 px-0 constant-text lg:text-\[5em\][^`]*`}/g,
        (match) => match.replace('constant-text', 'gx-hero-title constant-text').replace('font-[600]', 'font-[800]')
    );

    writeFileSync(filePath, newSrc, 'utf-8');
    console.log(`UPGRADED: ${file}`);
    upgraded++;
}

console.log(`\nDone. Upgraded: ${upgraded}, Skipped: ${skipped}`);
