import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

// List of service page basenames to upgrade (from user request)
const targets = [
  'app-store-optimization.tsx','branding.tsx','cms-development.tsx','crm-development.tsx','digital-marketing.tsx','seo.tsx','Social-Networking.tsx','ui-ux-design.tsx','Web-Application.tsx','Web-Design.tsx','Web-Development.tsx','android-development.tsx','cross-platform-development.tsx','hybrid-app-development.tsx','ios-development.tsx','Mobile-Application-Development.tsx','MVP.tsx','Software-Development.tsx','unity-development.tsx','e-commerce-development.tsx','fintech.tsx','healthcare.tsx','hr-tech.tsx','oil-and-gas.tsx','frontend-development.tsx','backend-development.tsx','Reactjs-Development.tsx','Nextjs-Development.tsx','angular-development.tsx','Vuejs-Development.tsx','Javascript.tsx','Typescript.tsx','React-Native-Development.tsx','Nodejs-Development.tsx','PHP-Development.tsx','Laravel-Development.tsx','Net-Development.tsx','Ruby-on-Rails.tsx'
];

const SERVICES_DIR = join(process.cwd(), 'screens', 'services');

let changed = 0;
let skipped = 0;

for (const file of targets) {
  const filePath = join(SERVICES_DIR, file);
  try {
    let src = readFileSync(filePath, 'utf-8');

    if (src.includes('<FuturisticServiceLayout') || src.includes('gx-page-hero')) {
      console.log(`SKIP (already using layout/hero): ${file}`);
      skipped++;
      continue;
    }

    // Add import for FuturisticServiceLayout if missing
    if (!src.includes("FuturisticServiceLayout")) {
      const insertAfter = src.lastIndexOf('\nimport ');
      const endOfLastImport = src.indexOf('\n', insertAfter + 1);
      const importLine = "\nimport FuturisticServiceLayout from '@/components/futuristic/FuturisticServiceLayout';\n";
      src = src.slice(0, endOfLastImport + 1) + importLine + src.slice(endOfLastImport + 1);
    }

    // Add useIsDayTime import if missing
    if (!src.includes('useIsDayTime') && !src.includes('isDayTime')) {
      const insertAfter = src.lastIndexOf('\nimport ');
      const endOfLastImport = src.indexOf('\n', insertAfter + 1);
      const hookImport = "\nimport { useIsDayTime } from '../../components/useIsDayTime';\n";
      src = src.slice(0, endOfLastImport + 1) + hookImport + src.slice(endOfLastImport + 1);
    }

    // Ensure hook call exists inside component
    if (!/const\s+isDayTime\s*=\s*useIsDayTime\(\)/.test(src)) {
      // Insert after first useState occurrence or after first const component open
      const marker = "const [isVisible";
      if (src.includes(marker)) {
        src = src.replace(marker, marker + "\n    const isDayTime = useIsDayTime();");
      } else {
        // fallback: insert after first function component opening (after first opening brace)
        const firstBrace = src.indexOf('{');
        if (firstBrace !== -1) {
          src = src.slice(0, firstBrace + 1) + "\n    const isDayTime = useIsDayTime();\n" + src.slice(firstBrace + 1);
        }
      }
    }

    // Extract first <h1> content to use as title prop
    let title = '';
    const h1match = src.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
    if (h1match) {
      title = h1match[1].replace(/[`\{\}]/g, '').trim();
      // remove the h1 from original to avoid duplicate heading inside layout hero
      src = src.replace(h1match[0], '');
    }

    // Find the first top-level return with a root <div ...>
    const returnIdx = src.indexOf('return (');
    if (returnIdx === -1) {
      console.log(`WARN: no return found in ${file}`);
      skipped++;
      continue;
    }

    // Find the opening of the root div after return(
    const afterReturn = src.indexOf('<', returnIdx);
    const rootTagStart = afterReturn;
    // Insert the wrapper before rootTagStart
    const beforeRoot = src.slice(0, rootTagStart);
    const afterRoot = src.slice(rootTagStart);

    const titleProp = title ? ` title={\`${title}\`}` : '';
    const wrapperOpen = `\n        <FuturisticServiceLayout${titleProp}>\n`;
    const wrapperClose = `\n        </FuturisticServiceLayout>\n`;

    // Append wrapperClose before the final closing of the component (before the last \n    );\n  }
    // Heuristic: find the last occurrence of '\n    );' which closes the return
    const closingPattern = "\n    );\n";
    const lastClosing = src.lastIndexOf(closingPattern);
    if (lastClosing === -1) {
      console.log(`WARN: couldn't find return closing in ${file}`);
      skipped++;
      continue;
    }

    // Build new source with wrapper
    const newSrc = beforeRoot + wrapperOpen + afterRoot.slice(0, lastClosing - rootTagStart) + wrapperClose + afterRoot.slice(lastClosing - rootTagStart);

    writeFileSync(filePath, newSrc, 'utf-8');
    console.log(`UPGRADED: ${file}`);
    changed++;
  } catch (e) {
    console.log(`ERROR processing ${file}: ${e.message}`);
  }
}

console.log(`\nDone. Changed: ${changed}, Skipped: ${skipped}`);
