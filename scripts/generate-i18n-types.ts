/**
 * Generate TypeScript types from translation files
 * Run: npm run i18n:types
 */

import fs from 'fs';
import path from 'path';

const localesDir = './public/locales';

interface TranslationData {
  [key: string]: string | TranslationData;
}

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

try {
  // Load all English translation keys
  const enDir = path.join(localesDir, 'en');
  const allKeys = new Set<string>();

  const files = fs.readdirSync(enDir).filter(f => f.endsWith('.json'));
  
  for (const file of files) {
    const filePath = path.join(enDir, file);
    const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const flat = flattenObject(content);
    for (const key of Object.keys(flat)) {
      allKeys.add(key);
    }
  }

  // Generate TypeScript definitions
  const keys = Array.from(allKeys).sort();
  
  const typeDef = `/**
 * Auto-generated TypeScript types from translation files
 * Generated from: ${new Date().toISOString()}
 * 
 * DO NOT EDIT MANUALLY - run \`npm run i18n:types\` to regenerate
 */

// All available translation keys
export const TranslationKeys = {
${keys.map(k => `  '${k}': '${k}',`).join('\n')}
} as const;

// Type-safe translation key type
export type TranslationKey = typeof TranslationKeys[keyof typeof TranslationKeys];

// Namespace types
export const Namespaces = {
  common: 'common',
  services: 'services',
  products: 'products',
  checkout: 'checkout',
  errors: 'errors',
  notifications: 'notifications',
} as const;

export type Namespace = typeof Namespaces[keyof typeof Namespaces];

// Language codes
export const Languages = {
  af: 'Afrikaans',
  am: 'Amharic',
  ar: 'Arabic',
  bg: 'Bulgarian',
  bn: 'Bengali',
  bs: 'Bosnian',
  ca: 'Catalan',
  cs: 'Czech',
  cy: 'Welsh',
  da: 'Danish',
  de: 'Deutsch',
  el: 'Greek',
  en: 'English',
  es: 'Español',
  et: 'Estonian',
  fa: 'Persian',
  fi: 'Finnish',
  fr: 'Français',
  gu: 'Gujarati',
  ha: 'Hausa',
  he: 'Hebrew',
  hi: 'Hindi',
  hr: 'Croatian',
  hu: 'Hungarian',
  id: 'Indonesian',
  ig: 'Igbo',
  it: 'Italiano',
  ja: '日本語',
  ka: 'Georgian',
  kk: 'Kazakh',
  km: 'Khmer',
  kn: 'Kannada',
  ko: '한국어',
  ku: 'Kurdish',
  ky: 'Kyrgyz',
  lo: 'Lao',
  lt: 'Lithuanian',
  lv: 'Latvian',
  mk: 'Macedonian',
  ml: 'Malayalam',
  mn: 'Mongolian',
  mr: 'Marathi',
  ms: 'Malay',
  mt: 'Maltese',
  my: 'Burmese',
  ne: 'Nepali',
  nl: 'Dutch',
  no: 'Norwegian',
  or: 'Odia',
  pa: 'Punjabi',
  pl: 'Polish',
  ps: 'Pashto',
  pt: 'Português',
  ro: 'Romanian',
  ru: 'Русский',
  sd: 'Sindhi',
  si: 'Sinhala',
  sk: 'Slovak',
  sl: 'Slovenian',
  so: 'Somali',
  sq: 'Albanian',
  sv: 'Swedish',
  sw: 'Swahili',
  ta: 'Tamil',
  te: 'Telugu',
  tg: 'Tajik',
  th: 'Thai',
  tl: 'Tagalog',
  tr: 'Turkish',
  uk: 'Ukrainian',
  ur: 'Urdu',
  uz: 'Uzbek',
  vi: 'Vietnamese',
  xh: 'Xhosa',
  yo: 'Yoruba',
  'zh-CN': '简体中文',
  'zh-TW': '繁體中文',
  zu: 'Zulu',
} as const;

export type Language = keyof typeof Languages;

// Usage example:
// const key: TranslationKey = 'greeting.morning';
// const lang: Language = 'en';
// const ns: Namespace = 'common';
`;

  fs.writeFileSync(
    path.join('./lib/i18n/types.ts'),
    typeDef
  );

  console.log(`✅ Generated TypeScript types with ${keys.length} translation keys`);
  console.log(`📁 Written to: lib/i18n/types.ts`);
} catch (error) {
  console.error('❌ Error generating types:', error);
  process.exit(1);
}
