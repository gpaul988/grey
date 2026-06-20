import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

// Load language codes
const languageCodes = JSON.parse(fs.readFileSync('./scripts/language-codes.json', 'utf-8'));
const localesDir = './public/locales';
const enDir = path.join(localesDir, 'en');
const namespaces = ['common', 'services', 'products', 'checkout', 'errors', 'notifications'];

interface TranslationData {
  [key: string]: string | TranslationData;
}

// Helper to flatten nested objects into dot notation
function flattenObject(obj: TranslationData, prefix = ''): Record<string, string> {
  const result: Record<string, string> = {};
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof value === 'string') {
      result[fullKey] = value;
    } else if (typeof value === 'object' && value !== null) {
      Object.assign(result, flattenObject(value as TranslationData, fullKey));
    }
  }
  return result;
}

// Helper to unflatten dot notation back to nested object
function unflattenObject(flatObj: Record<string, string>): TranslationData {
  const result: TranslationData = {};
  for (const [key, value] of Object.entries(flatObj)) {
    const parts = key.split('.');
    let current = result;
    for (let i = 0; i < parts.length - 1; i++) {
      if (!current[parts[i]]) {
        current[parts[i]] = {};
      }
      current = current[parts[i]] as TranslationData;
    }
    current[parts[parts.length - 1]] = value;
  }
  return result;
}

// Use Google Translate free API via a simple HTTP request
async function translateText(text: string, targetLang: string): Promise<string> {
  // Normalize language code for Google Translate
  let googleLang = targetLang;
  if (targetLang === 'zh-CN') googleLang = 'zh-CN';
  if (targetLang === 'zh-TW') googleLang = 'zh-TW';

  // Use simple URL-based translation (no auth needed)
  const encodedText = encodeURIComponent(text);
  const url = `https://translate.googleapis.com/translate_a/element.js?cb=callback&client=gtx`;

  // Alternative: Use a free translation service
  // For now, we'll use a simple fallback or setup a better solution
  console.log(`[Translation] ${targetLang}: "${text.substring(0, 30)}..."`);
  
  return text; // Placeholder - will use proper API below
}

async function generateTranslationsForLanguage(lang: string, namespace: string) {
  const sourceFile = path.join(enDir, `${namespace}.json`);
  const targetDir = path.join(localesDir, lang);
  const targetFile = path.join(targetDir, `${namespace}.json`);

  // Create directory if it doesn't exist
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  // If file already exists and is complete, skip
  if (fs.existsSync(targetFile)) {
    console.log(`✓ ${lang}/${namespace}.json exists`);
    return;
  }

  // Read source (English) file
  const sourceContent = JSON.parse(fs.readFileSync(sourceFile, 'utf-8'));
  
  // For now, copy the structure and mark as needing translation
  // A full implementation would use an actual translation API
  const targetContent = { ...sourceContent };
  
  fs.writeFileSync(targetFile, JSON.stringify(targetContent, null, 2));
  console.log(`✓ Created ${lang}/${namespace}.json`);
}

async function main() {
  console.log(`🌍 Generating translations for ${languageCodes.languages.length} languages...`);
  console.log(`📚 Namespaces: ${namespaces.join(', ')}`);

  // Ensure locales directory exists
  if (!fs.existsSync(localesDir)) {
    fs.mkdirSync(localesDir, { recursive: true });
  }

  for (const lang of languageCodes.languages) {
    if (lang === 'en') continue; // Skip English
    console.log(`\n📝 Processing ${lang} (${languageCodes.languageNames[lang] || lang})`);
    
    for (const namespace of namespaces) {
      await generateTranslationsForLanguage(lang, namespace);
    }
  }

  console.log('\n✅ Translation structure generated!');
  console.log('⚠️  NOTE: Use proper translation API (Google Translate, DeepL, etc.) to fill actual translations');
}

main().catch(console.error);
