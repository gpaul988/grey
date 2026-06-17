#!/usr/bin/env node
/**
 * Refactor service screens: Replace static hero Images with ResponsiveVideoHero
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob').sync;

const SERVICES_DIR = './screens/services';
const LOG_FILE = './refactor-heroes.log';

let logMessages = [];
function log(msg) {
  console.log(msg);
  logMessages.push(msg);
}

log('=== Refactoring Service Heroes to ResponsiveVideoHero ===');
log(`Started: ${new Date().toISOString()}`);

let count = 0;

// Find all .tsx files
const files = glob(`${SERVICES_DIR}/*.tsx`);
log(`Found ${files.length} service files\n`);

files.forEach(file => {
  const filename = path.basename(file);
  let content = fs.readFileSync(file, 'utf-8');

  // Skip if already refactored
  if (content.includes('ResponsiveVideoHero')) {
    log(`[SKIP] ${filename} (already refactored)`);
    return;
  }

  // Skip if no hero image
  if (!content.includes('hero.jpg')) {
    log(`[SKIP] ${filename} (no hero.jpg)`);
    return;
  }

  log(`[REFACTORING] ${filename}...`);

  // Extract asset path from hero.jpg reference
  const assetMatch = content.match(/\/assets\/([^\/]+)\/hero\.jpg/);
  if (!assetMatch) {
    log(`[WARN] Could not extract asset path from ${filename}`);
    return;
  }

  const assetPath = assetMatch[1];

  // Add import for ResponsiveVideoHero if not present
  if (!content.includes("import ResponsiveVideoHero")) {
    const importMatch = content.match(/(import Image from "next\/image";)/);
    if (importMatch) {
      content = content.replace(
        importMatch[0],
        `import Image from "next/image";\nimport ResponsiveVideoHero from "@/components/ResponsiveVideoHero";`
      );
    }
  }

  // Replace the Image-wrapped hero section
  // Pattern: <div className="...">
  //            <Image src="/assets/.../hero.jpg" ... />
  //          </div>
  const heroPattern = /(<div[^>]*className=\{[^}]*bg-gray-300\/10[^}]*\}>[\s\S]*?<Image[\s\S]*?src=\{['\"]\/assets\/[^\/]+\/hero\.jpg['\"]\}[\s\S]*?\/>\s*<\/div>)/;

  if (heroPattern.test(content)) {
    content = content.replace(
      heroPattern,
      `<ResponsiveVideoHero videoDesktop="/assets/${assetPath}/hero.mp4" videoMobile="/assets/${assetPath}/hero-mobile.mp4" posterImage="/assets/${assetPath}/hero.jpg" />`
    );
    log(`[OK] ${filename}`);
    count++;
  } else {
    log(`[WARN] Hero pattern not matched for ${filename} (manual review needed)`);
  }

  // Write updated file
  fs.writeFileSync(file, content, 'utf-8');
});

log('');
log(`=== Summary ===`);
log(`Refactored: ${count} files`);
log(`Completed: ${new Date().toISOString()}`);

// Write log
fs.writeFileSync(LOG_FILE, logMessages.join('\n'), 'utf-8');
