/**
 * Fix files where imports were injected into function body or after const declarations.
 * These are files using ServicePageTemplate (no 'use client') or similar patterns.
 */

import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

// Files that use ServicePageTemplate (no 'use client' at top, functional JSX body)
// Pattern: imports appear before the const X = () => ( body
// But our script injected AFTER the const line, breaking the file

function fixFile(filePath) {
    let src = readFileSync(filePath, 'utf-8');
    
    // Pattern to fix: 
    // "import { FxBackground...} from '@/components/futuristic/fx';const X = () => (\n\nimport { useIsDayTime..."
    // Should be:
    // "import { FxBackground...} from '@/components/futuristic/fx';\nimport { useIsDayTime... };\nconst X = () => ("
    
    // Find if there's "} from '@/components/futuristic/fx';const " pattern
    const badPatternFx = `} from '@/components/futuristic/fx';const `;
    const badPatternFxDbl = `} from "@/components/futuristic/fx";const `;
    
    let fixed = src;
    
    if (fixed.includes(badPatternFx)) {
        const idx = fixed.indexOf(badPatternFx);
        const importEnd = idx + `} from '@/components/futuristic/fx';`.length;
        const constStart = fixed.indexOf('const ', importEnd);
        
        // Extract the misplaced import that follows the const
        // Pattern: "const X = () => (\n\nimport { useIsDayTime..."
        const misplacedImportMatch = fixed.match(/const\s+\w+\s*(?::\s*[^=]+)?\s*=\s*\(\s*\)\s*[=>\s{(]+\n\n(import[^\n]+\n)/);
        
        if (misplacedImportMatch) {
            const misplacedImport = misplacedImportMatch[1];
            // Remove misplaced import from after const
            fixed = fixed.replace('\n\n' + misplacedImport, '');
            // Insert it before the fx import line  
            const fxImportStart = fixed.lastIndexOf('\nimport { FxBackground');
            fixed = fixed.slice(0, fxImportStart) + '\n' + misplacedImport.trim() + fixed.slice(fxImportStart);
        }
    }
    
    return fixed;
}

// Fix service files using ServicePageTemplate
const serviceFiles = [
    'screens/services/IoT-Development.tsx',
    'screens/services/Python-Development.tsx', 
    'screens/services/Social-Networking.tsx',
    'screens/services/blockchain-development.tsx',
    'screens/services/flutter-development.tsx',
];

// Fix industry files using ServicePageTemplate
const industryFiles = readdirSync('/home/user/grey/screens/industries')
    .filter(f => f.endsWith('.tsx'))
    .map(f => `screens/industries/${f}`);

// Fix cross-platform-development and digital-marketing (bad 'use client' injection)  
const allToFix = [...serviceFiles, ...industryFiles];

let fixed = 0;
for (const relPath of allToFix) {
    const fullPath = `/home/user/grey/${relPath}`;
    let src;
    try {
        src = readFileSync(fullPath, 'utf-8');
    } catch { continue; }
    
    if (!src.includes("} from '@/components/futuristic/fx';const ")) {
        continue;
    }
    
    const result = fixFile(fullPath);
    if (result !== src) {
        writeFileSync(fullPath, result, 'utf-8');
        console.log(`Fixed: ${relPath}`);
        fixed++;
    }
}

// Also fix cross-platform-development (different pattern: 'use client' injected)
const crossPlatPath = '/home/user/grey/screens/services/cross-platform-development.tsx';
const digitalMktPath = '/home/user/grey/screens/services/digital-marketing.tsx';

for (const fp of [crossPlatPath, digitalMktPath]) {
    let src = readFileSync(fp, 'utf-8');
    // The issue is 'use client'; was added at the top AND there's a bad import injection
    // Pattern: "'use client';\n\nimport ..." followed by "} from '@/components/futuristic/fx';const"
    if (src.includes("} from '@/components/futuristic/fx';const ")) {
        const result = fixFile(fp);
        writeFileSync(fp, result, 'utf-8');
        console.log(`Fixed: ${fp.split('/').pop()}`);
        fixed++;
    }
}

console.log(`\nFixed ${fixed} files.`);
