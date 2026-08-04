/**
 * Validate all translation files for consistency and correctness
 * Run: npm run i18n:validate
 */

import fs from 'fs';
import path from 'path';

const localesDir = './public/locales';
const issues: string[] = [];
let filesChecked = 0;
let keysChecked = 0;

interface TranslationData {
  [key: string]: string | TranslationData;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function flattenObject(obj: any, prefix = ''): Record<string, string> {
  const result: Record<string, string> = {};
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof value === 'string') {
      result[fullKey] = value;
    } else if (typeof value === 'object' && value !== null) {
      Object.assign(result, flattenObject(value, fullKey));
    } else if (value === undefined || value === null) {
      issues.push(`  ⚠️  ${fullKey}: null or undefined value`);
    } else {
      issues.push(`  ⚠️  ${fullKey}: expected string, got ${typeof value}`);
    }
  }
  return result;
}

try {
  console.log('🔍 Validating translations...\n');

  // Get all languages
  const languages = fs.readdirSync(localesDir)
    .filter(f => fs.statSync(path.join(localesDir, f)).isDirectory());

  // Get source language keys
  const enDir = path.join(localesDir, 'en');
  const sourceKeys: Record<string, Set<string>> = {};
  const namespaces = fs.readdirSync(enDir).filter(f => f.endsWith('.json'));

  for (const file of namespaces) {
    const filePath = path.join(enDir, file);
    const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const namespace = file.replace('.json', '');
    sourceKeys[namespace] = new Set(Object.keys(flattenObject(content)));
  }

  // Validate each language
  let totalMissing = 0;
  const langStats: { lang: string; missing: number; extra: number; errors: number }[] = [];

  for (const lang of languages) {
    if (lang === 'en') continue;

    const langPath = path.join(localesDir, lang);
    let missing = 0;
    let extra = 0;
    let langErrors = 0;

    for (const namespace of Object.keys(sourceKeys)) {
      const filePath = path.join(langPath, `${namespace}.json`);
      
      if (!fs.existsSync(filePath)) {
        issues.push(`❌ ${lang}/${namespace}.json: FILE MISSING`);
        missing += sourceKeys[namespace].size;
        langErrors++;
        continue;
      }

      try {
        const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        const langKeys = new Set(Object.keys(flattenObject(content)));

        // Find missing keys
        for (const key of sourceKeys[namespace]) {
          keysChecked++;
          if (!langKeys.has(key)) {
            missing++;
            totalMissing++;
          }
        }

        // Find extra keys (shouldn't happen but worth noting)
        for (const key of langKeys) {
          if (!sourceKeys[namespace].has(key)) {
            extra++;
          }
        }

        filesChecked++;
      } catch (e) {
        issues.push(`❌ ${lang}/${namespace}.json: INVALID JSON - ${(e as Error).message}`);
        langErrors++;
      }
    }

    langStats.push({ lang, missing, extra, errors: langErrors });
  }

  // Print report
  console.log('📊 VALIDATION REPORT\n');
  
  langStats.sort((a, b) => b.missing - a.missing);
  
  for (const stat of langStats) {
    const status = stat.errors > 0 ? '❌' : stat.missing > 0 ? '⚠️ ' : '✅';
    console.log(
      `${status} ${stat.lang.padEnd(10)} Missing: ${stat.missing.toString().padEnd(4)} Extra: ${stat.extra.toString().padEnd(3)} Errors: ${stat.errors}`
    );
  }

  console.log('\n' + '═'.repeat(60));
  console.log(`📈 Summary:`);
  console.log(`   Files checked: ${filesChecked}`);
  console.log(`   Keys checked: ${keysChecked}`);
  console.log(`   Total missing keys: ${totalMissing}`);
  console.log(`   Languages validated: ${languages.length - 1}`);

  if (issues.length > 0) {
    console.log(`\n⚠️  Issues found:\n`);
    issues.forEach(issue => console.log(issue));
  } else {
    console.log(`\n✅ All translations valid!`);
  }

  console.log('\n💡 Tip: Run "npm run i18n:sync" to fill missing keys with English fallback');
  
  process.exit(issues.length > 0 ? 1 : 0);
} catch (error) {
  console.error('❌ Validation error:', error);
  process.exit(1);
}
