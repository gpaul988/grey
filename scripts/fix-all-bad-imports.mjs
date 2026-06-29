/**
 * Fix files where imports were concatenated onto a const X = () => { line.
 * Pattern: "import X from 'path';const ComponentName = () => {    const ..."
 * or:      "} from 'path';    const something = useState..."
 */

import { readFileSync, writeFileSync } from 'fs';

const FILES_TO_FIX = [
    // Industries
    'screens/industries/e-commerce-development.tsx',
    'screens/industries/fintech.tsx',
    'screens/industries/healthcare.tsx',
    'screens/industries/hr-tech.tsx',
    'screens/industries/oil-and-gas.tsx',
    // Services
    'screens/services/Javascript.tsx',
    'screens/services/Mobile-Application-Development.tsx',
    'screens/services/Net-Development.tsx',
    'screens/services/Software-Development.tsx',
    'screens/services/ai-development-services.tsx',
    'screens/services/android-development.tsx',
    'screens/services/cms-development.tsx',
    'screens/services/hybrid-app-development.tsx',
    'screens/services/ios-development.tsx',
    'screens/services/seo.tsx',
    'screens/services/ui-ux-design.tsx',
    'screens/services/Typescript.tsx',
    'screens/services/angular-development.tsx',
];

function fixFile(src) {
    let result = src;
    
    // Pattern 1: "import X from 'path';const" → "import X from 'path';\nconst"
    result = result.replace(/('|");\s*const\s+/g, (match, quote) => {
        return `${quote};\nconst `;
    });
    
    // Pattern 2: "} from 'path';const" → "} from 'path';\nconst"  (already handled above)
    
    // Pattern 3: "FuturisticServiceLayout';const X = () => {\n\nimport"
    // The "import { FxBackground..." was placed INSIDE the component body.
    // Move it back above the component declaration.
    
    // Find pattern: an import statement inside a function body (after first { in component)
    // Specifically: "    \nimport { FxBackground..." appearing after const X = () => {
    
    // Strategy: find all lines that start with "import" but are preceded by non-import lines
    // (indicating they're inside function bodies)
    const lines = result.split('\n');
    const importLines = [];
    const codeLines = [];
    let inImportBlock = true;
    let firstNonImportLine = -1;
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const trimmed = line.trim();
        
        // After seeing the component declaration, track imports that appear in code
        if (!inImportBlock && (
            trimmed.startsWith("import ") && 
            !trimmed.startsWith("import type") &&
            (trimmed.includes(" from '") || trimmed.includes(' from "'))
        )) {
            // This is a misplaced import — collect it
            importLines.push(i);
        }
        
        // Detect when we leave the import block
        if (inImportBlock && trimmed !== '' && !trimmed.startsWith('import ') && !trimmed.startsWith("'use client'") && !trimmed.startsWith('"use client"') && !trimmed.startsWith('//') && !trimmed.startsWith('/*') && !trimmed.startsWith('*')) {
            inImportBlock = false;
            firstNonImportLine = i;
        }
    }
    
    if (importLines.length === 0) return result;
    
    // Extract misplaced imports
    const misplacedImports = importLines.map(i => lines[i].trim()).filter(Boolean);
    
    // Remove them from their current positions (set to empty)
    const newLines = lines.map((line, i) => {
        if (importLines.includes(i)) return null;
        return line;
    }).filter(line => line !== null);
    
    // Find where to insert them (before firstNonImportLine, which is now shifted)
    // Find the last import line in newLines
    let lastImportIdx = -1;
    for (let i = 0; i < newLines.length; i++) {
        const t = newLines[i].trim();
        if (t.startsWith('import ') && (t.includes(" from '") || t.includes(' from "'))) {
            lastImportIdx = i;
        }
    }
    
    if (lastImportIdx >= 0) {
        newLines.splice(lastImportIdx + 1, 0, ...misplacedImports);
    }
    
    return newLines.join('\n');
}

let fixed = 0;
for (const relPath of FILES_TO_FIX) {
    const fullPath = `/home/user/grey/${relPath}`;
    let src;
    try {
        src = readFileSync(fullPath, 'utf-8');
    } catch { 
        console.log(`SKIP (not found): ${relPath}`);
        continue; 
    }
    
    const result = fixFile(src);
    if (result !== src) {
        writeFileSync(fullPath, result, 'utf-8');
        console.log(`Fixed: ${relPath}`);
        fixed++;
    } else {
        console.log(`No changes needed: ${relPath}`);
    }
}

console.log(`\nFixed ${fixed} files.`);
