import { readFileSync, writeFileSync, copyFileSync } from 'fs';
import { join } from 'path';

const targets = [
  'app-store-optimization.tsx','branding.tsx','cms-development.tsx','crm-development.tsx','digital-marketing.tsx','seo.tsx','Social-Networking.tsx','ui-ux-design.tsx','Web-Application.tsx','Web-Design.tsx'
];

const SERVICES_DIR = join(process.cwd(), 'screens', 'services');

for (const file of targets) {
  const filePath = join(SERVICES_DIR, file);
  try {
    let src = readFileSync(filePath, 'utf-8');
    if (src.includes('<FuturisticServiceLayout')) {
      console.log(`SKIP (already using layout): ${file}`);
      continue;
    }

    // backup
    copyFileSync(filePath, filePath + '.bak2');

    // add imports if missing
    if (!src.includes("FuturisticServiceLayout")) {
      const lastImportIdx = src.lastIndexOf('\nimport ');
      const endOfLastImport = src.indexOf('\n', lastImportIdx + 1);
      const importLine = "\nimport FuturisticServiceLayout from '@/components/futuristic/FuturisticServiceLayout';\n";
      src = src.slice(0, endOfLastImport + 1) + importLine + src.slice(endOfLastImport + 1);
    }
    if (!/useIsDayTime/.test(src)) {
      const lastImportIdx = src.lastIndexOf('\nimport ');
      const endOfLastImport = src.indexOf('\n', lastImportIdx + 1);
      const hookImport = "\nimport { useIsDayTime } from '../../components/useIsDayTime';\n";
      src = src.slice(0, endOfLastImport + 1) + hookImport + src.slice(endOfLastImport + 1);
    }

    // extract first h1 content
    let title = '';
    const h1 = src.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
    if (h1) {
      title = h1[1].replace(/[`\\{}]/g, '').trim();
      src = src.replace(h1[0], '');
    }

    // ensure isDayTime hook usage
    if (!/const\s+isDayTime\s*=/.test(src)) {
      const useStateIdx = src.indexOf('useState(');
      if (useStateIdx !== -1) {
        const lineStart = src.lastIndexOf('\n', useStateIdx);
        const insertionPoint = src.indexOf('\n', lineStart) + 1;
        src = src.slice(0, insertionPoint) + '    const isDayTime = useIsDayTime();\n' + src.slice(insertionPoint);
      } else {
        const firstBrace = src.indexOf('{');
        if (firstBrace !== -1) {
          src = src.slice(0, firstBrace + 1) + '\n    const isDayTime = useIsDayTime();\n' + src.slice(firstBrace + 1);
        }
      }
    }

    // Replace the top-level return that renders JSX (starts with a '<')
    const re = /return\s*\(\s*(<[^][\s\S]*?)\s*\)\s*;/m;
    const match = src.match(re);
    if (!match) {
      console.log(`WARN: no JSX-return block matched for ${file}`);
      continue;
    }
    const inner = match[1];
    const titleProp = title ? ` title={\`${title}\`}` : '';
    const wrapped = `return (\n    <FuturisticServiceLayout${titleProp}>\n${inner}\n    </FuturisticServiceLayout>\n  );`;
    src = src.replace(re, wrapped);

    writeFileSync(filePath, src, 'utf-8');
    console.log(`UPGRADED: ${file}`);
  } catch (e) {
    console.log(`ERROR ${file}: ${e.message}`);
  }
}
