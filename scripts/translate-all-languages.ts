import fs from 'fs';
import path from 'path';
import https from 'https';

const languageCodes = JSON.parse(fs.readFileSync('./scripts/language-codes.json', 'utf-8'));
const localesDir = './public/locales';
const enDir = path.join(localesDir, 'en');
const namespaces = ['common', 'services', 'products', 'checkout', 'errors', 'notifications'];

interface TranslationData {
  [key: string]: string | TranslationData;
}

// Flatten nested objects
function flattenObject(obj: any, prefix = ''): Record<string, string> {
  const result: Record<string, string> = {};
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof value === 'string') {
      result[fullKey] = value;
    } else if (typeof value === 'object' && value !== null) {
      Object.assign(result, flattenObject(value, fullKey));
    }
  }
  return result;
}

// Unflatten back to nested
function unflattenObject(flatObj: Record<string, string>): any {
  const result: any = {};
  for (const [key, value] of Object.entries(flatObj)) {
    const parts = key.split('.');
    let current = result;
    for (let i = 0; i < parts.length - 1; i++) {
      if (!current[parts[i]]) {
        current[parts[i]] = {};
      }
      current = current[parts[i]];
    }
    current[parts[parts.length - 1]] = value;
  }
  return result;
}

// Simple translation using free API (we'll use a fallback for demonstration)
// For production, use: https://libretranslate.com or https://translate.googleapis.com
function translateViaFreeAPI(text: string, targetLang: string): Promise<string> {
  return new Promise((resolve) => {
    // Map language codes to API format
    const langMap: Record<string, string> = {
      'zh-CN': 'zh',
      'zh-TW': 'zh',
      'pt': 'pt',
    };
    
    const apiLang = langMap[targetLang] || targetLang;
    
    // Using Google Translate via API (free endpoint)
    const query = encodeURIComponent(text);
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${apiLang}&dt=t&q=${query}`;

    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          // Extract translated text from nested array structure
          const translated = parsed[0]?.[0]?.[0] || text;
          resolve(translated);
        } catch {
          resolve(text); // Fallback to original
        }
      });
    }).on('error', () => resolve(text));
  });
}

// Batch translate with rate limiting
async function batchTranslate(texts: string[], lang: string, delayMs = 100): Promise<string[]> {
  const results: string[] = [];
  
  for (const text of texts) {
    const translated = await translateViaFreeAPI(text, lang);
    results.push(translated);
    await new Promise(r => setTimeout(r, delayMs)); // Rate limit
  }
  
  return results;
}

async function generateAllLanguages() {
  console.log(`🌍 Generating translations for ${languageCodes.languages.length} languages...\n`);

  if (!fs.existsSync(localesDir)) {
    fs.mkdirSync(localesDir, { recursive: true });
  }

  // Get reference English files
  const enFiles: Record<string, any> = {};
  for (const namespace of namespaces) {
    const filePath = path.join(enDir, `${namespace}.json`);
    if (fs.existsSync(filePath)) {
      enFiles[namespace] = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }
  }

  // Generate for each language
  const skipLangs = ['en']; // Already have English
  let processed = 0;

  for (const lang of languageCodes.languages) {
    if (skipLangs.includes(lang)) continue;

    const langName = languageCodes.languageNames[lang] || lang;
    console.log(`\n📝 ${lang.padEnd(6)} (${langName})`);

    const langDir = path.join(localesDir, lang);
    if (!fs.existsSync(langDir)) {
      fs.mkdirSync(langDir, { recursive: true });
    }

    for (const namespace of namespaces) {
      const outputFile = path.join(langDir, `${namespace}.json`);
      
      // Skip if already exists
      if (fs.existsSync(outputFile)) {
        console.log(`  ✓ ${namespace}.json (exists)`);
        continue;
      }

      if (!enFiles[namespace]) {
        console.log(`  ✗ ${namespace}.json (source not found)`);
        continue;
      }

      // Translate all keys
      const flat = flattenObject(enFiles[namespace]);
      const keys = Object.keys(flat);
      const values = Object.values(flat);

      console.log(`  → ${namespace}.json (${keys.length} keys)...`);

      // Translate in batches (with rate limiting to avoid API blocks)
      const translatedValues = await batchTranslate(values, lang, 50);
      
      const translatedFlat: Record<string, string> = {};
      keys.forEach((key, i) => {
        translatedFlat[key] = translatedValues[i];
      });

      const result = unflattenObject(translatedFlat);
      fs.writeFileSync(outputFile, JSON.stringify(result, null, 2));
      console.log(`  ✓ ${namespace}.json`);
    }

    processed++;
    if (processed % 10 === 0) {
      console.log(`\n⏱️  Processed ${processed}/${languageCodes.languages.length - 1} languages...`);
    }
  }

  console.log(`\n✅ All translations generated!`);
  console.log(`📊 Summary: ${languageCodes.languages.length} languages × ${namespaces.length} namespaces`);
}

generateAllLanguages().catch(console.error);
