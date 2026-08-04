/**
 * Upgrades ALL industry pages to use the futuristic design system.
 */

import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

const INDUSTRIES_DIR = '/home/user/grey/screens/industries';

const files = readdirSync(INDUSTRIES_DIR).filter(f => f.endsWith('.tsx'));

let upgraded = 0;
let skipped = 0;

for (const file of files) {
    const filePath = join(INDUSTRIES_DIR, file);
    let src = readFileSync(filePath, 'utf-8');

    // Skip if already upgraded
    if (src.includes('FuturisticIndustryLayout') || src.includes('gx-page-hero')) {
        console.log(`SKIP (already upgraded): ${file}`);
        skipped++;
        continue;
    }

    let newSrc = src;

    // 1. Add FuturisticIndustryLayout import
    if (!newSrc.includes("FuturisticIndustryLayout")) {
        const lastImportIdx = newSrc.lastIndexOf('\nimport ');
        const endOfLastImport = newSrc.indexOf('\n', lastImportIdx + 1);
        const importLine = `\nimport FuturisticIndustryLayout from '@/components/futuristic/FuturisticIndustryLayout';`;
        newSrc = newSrc.slice(0, endOfLastImport + 1) + importLine + newSrc.slice(endOfLastImport + 1);
    }

    // 2. Add FxBackground, FxChip etc imports if missing
    if (!newSrc.includes("FxBackground") && !newSrc.includes("futuristic/fx")) {
        const lastImportIdx = newSrc.lastIndexOf('\nimport ');
        const endOfLastImport = newSrc.indexOf('\n', lastImportIdx + 1);
        const fxImportLine = `\nimport { FxBackground, FxChip, FxReveal, FxButton, FxHoloCard } from '@/components/futuristic/fx';`;
        newSrc = newSrc.slice(0, endOfLastImport + 1) + fxImportLine + newSrc.slice(endOfLastImport + 1);
    }

    // 3. Inject isDayTime if missing
    if (!newSrc.includes('useIsDayTime') && !newSrc.includes('isDayTime')) {
        const lastImportIdx = newSrc.lastIndexOf('\nimport ');
        const endOfLastImport = newSrc.indexOf('\n', lastImportIdx + 1);
        const hookImport = `\nimport { useIsDayTime } from '../../components/useIsDayTime';`;
        newSrc = newSrc.slice(0, endOfLastImport + 1) + hookImport + newSrc.slice(endOfLastImport + 1);
        newSrc = newSrc.replace(
            'const [isVisible, setIsVisible] = useState(false);',
            'const [isVisible, setIsVisible] = useState(false);\n    const isDayTime = useIsDayTime();'
        );
    }

    // 4. Add FX overlay to hero section
    const heroPatterns = [`<div id={'hero'}`, `<div id={"hero"}`, '<div id="hero"'];
    let heroFound = false;
    for (const pat of heroPatterns) {
        if (newSrc.includes(pat) && !heroFound) {
            if (!newSrc.includes('Futuristic FX overlay (hero enhancement)')) {
                const heroStart = newSrc.indexOf(pat);
                const heroTagEnd = newSrc.indexOf('>', heroStart) + 1;
                const injectFX = `
                {/* ─── Futuristic FX overlay (hero enhancement) ─── */}
                <div className="pointer-events-none absolute inset-0 z-[2] overflow-hidden">
                    <div className="gx-scanline" />
                    <div className="gx-noise-overlay" />
                    <div className="gx-orbit absolute" style={{ width: '65vmax', height: '65vmax', top: '-22vmax', right: '-22vmax', opacity: .15 }} />
                </div>`;
                newSrc = newSrc.slice(0, heroTagEnd) + injectFX + newSrc.slice(heroTagEnd);
                heroFound = true;
            }
        }
    }

    // 5. Upgrade ResponsiveVideoHero overlay text styling if present
    if (newSrc.includes('ResponsiveVideoHero')) {
        // Add gx-hero-title to any hero h1
        newSrc = newSrc.replace(
            /(<h1\s+className={`[^`]*)(lg:text-\[5\w*\][^`]*`)}/g,
            (match, before, classes) => `${before}gx-hero-title ${classes}}`
        );
    }

    writeFileSync(filePath, newSrc, 'utf-8');
    console.log(`UPGRADED: ${file}`);
    upgraded++;
}

console.log(`\nDone. Upgraded: ${upgraded}, Skipped: ${skipped}`);
