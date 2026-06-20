/**
 * Translation Manager
 * Handles validation, synchronization, and fallback logic for all translations
 */

import fs from 'fs';
import path from 'path';

interface LanguageStats {
  language: string;
  completeness: number; // percentage
  missingKeys: string[];
  totalKeys: number;
  translatedKeys: number;
}

export class TranslationManager {
  private localesDir: string;
  private sourceLanguage = 'en';
  private namespaces = ['common', 'services', 'products', 'checkout', 'errors', 'notifications'];

  constructor(localesDir = './public/locales') {
    this.localesDir = localesDir;
  }

  /**
   * Get all translation files structure
   */
  private getLanguages(): string[] {
    if (!fs.existsSync(this.localesDir)) return [];
    return fs.readdirSync(this.localesDir)
      .filter(f => fs.statSync(path.join(this.localesDir, f)).isDirectory());
  }

  /**
   * Flatten nested object for easier comparison
   */
  private flattenObject(obj: any, prefix = ''): Record<string, string> {
    const result: Record<string, string> = {};
    for (const [key, value] of Object.entries(obj)) {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      if (typeof value === 'string') {
        result[fullKey] = value;
      } else if (typeof value === 'object' && value !== null) {
        Object.assign(result, this.flattenObject(value, fullKey));
      }
    }
    return result;
  }

  /**
   * Unflatten flat object back to nested structure
   */
  private unflattenObject(flat: Record<string, string>): any {
    const result: any = {};
    for (const [key, value] of Object.entries(flat)) {
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

  /**
   * Load translation file
   */
  private loadTranslation(lang: string, namespace: string): any {
    const filePath = path.join(this.localesDir, lang, `${namespace}.json`);
    if (!fs.existsSync(filePath)) return null;
    try {
      return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    } catch {
      return null;
    }
  }

  /**
   * Save translation file
   */
  private saveTranslation(lang: string, namespace: string, data: any): void {
    const dir = path.join(this.localesDir, lang);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const filePath = path.join(dir, `${namespace}.json`);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  }

  /**
   * Validate all translations and find missing keys
   */
  analyzeCompleteness(): LanguageStats[] {
    const sourceContent: Record<string, any> = {};
    const sourceKeys: Record<string, Set<string>> = {};

    // Load all source (English) keys
    for (const namespace of this.namespaces) {
      const source = this.loadTranslation(this.sourceLanguage, namespace);
      if (source) {
        sourceContent[namespace] = source;
        sourceKeys[namespace] = new Set(Object.keys(this.flattenObject(source)));
      }
    }

    const stats: LanguageStats[] = [];
    const languages = this.getLanguages();

    for (const lang of languages) {
      if (lang === this.sourceLanguage) continue;

      let totalKeys = 0;
      let translatedKeys = 0;
      const missingKeys: string[] = [];

      for (const namespace of this.namespaces) {
        const source = sourceContent[namespace];
        const target = this.loadTranslation(lang, namespace);
        
        if (!source) continue;

        const sourceFlat = this.flattenObject(source);
        const targetFlat = target ? this.flattenObject(target) : {};

        for (const key of Object.keys(sourceFlat)) {
          totalKeys++;
          if (targetFlat[key]) {
            translatedKeys++;
          } else {
            missingKeys.push(`${namespace}.${key}`);
          }
        }
      }

      stats.push({
        language: lang,
        completeness: totalKeys > 0 ? (translatedKeys / totalKeys) * 100 : 0,
        missingKeys,
        totalKeys,
        translatedKeys,
      });
    }

    return stats;
  }

  /**
   * Sync translations - fill missing translations from source or fallback language
   */
  syncTranslations(fallbackLang = this.sourceLanguage): Record<string, number> {
    const results: Record<string, number> = {};
    const sourceContent: Record<string, any> = {};

    // Load source content
    for (const namespace of this.namespaces) {
      const source = this.loadTranslation(fallbackLang, namespace);
      if (source) {
        sourceContent[namespace] = source;
      }
    }

    const languages = this.getLanguages();

    for (const lang of languages) {
      if (lang === fallbackLang) continue;

      let synced = 0;

      for (const namespace of this.namespaces) {
        const source = sourceContent[namespace];
        if (!source) continue;

        let target = this.loadTranslation(lang, namespace) || {};
        const sourceFlat = this.flattenObject(source);
        const targetFlat = this.flattenObject(target);

        // Fill missing keys from fallback
        for (const [key, value] of Object.entries(sourceFlat)) {
          if (!targetFlat[key]) {
            targetFlat[key] = value; // Use English as fallback
            synced++;
          }
        }

        // Save the synced translation
        const syncedTarget = this.unflattenObject(targetFlat);
        this.saveTranslation(lang, namespace, syncedTarget);
      }

      results[lang] = synced;
    }

    return results;
  }

  /**
   * Generate TypeScript types from translations
   */
  generateTypes(): string {
    const source = this.loadTranslation(this.sourceLanguage, 'common');
    if (!source) return '';

    const flat = this.flattenObject(source);
    const keys = Object.keys(flat);

    const typeDef = `
// Auto-generated from translations
export const TranslationKeys = {
${keys.map(k => `  ${k}: '${k}',`).join('\n')}
} as const;

export type TranslationKey = typeof TranslationKeys[keyof typeof TranslationKeys];

export interface TranslationResources {
  [key: string]: {
    [namespace: string]: {
      [key: string]: string;
    };
  };
}
`;

    return typeDef;
  }

  /**
   * Get statistics report
   */
  getReport(): string {
    const stats = this.analyzeCompleteness();
    const sortedByCompleteness = stats.sort((a, b) => b.completeness - a.completeness);

    let report = `
╔════════════════════════════════════════════════════════════════╗
║           TRANSLATION COMPLETENESS REPORT                      ║
╚════════════════════════════════════════════════════════════════╝

`;

    for (const stat of sortedByCompleteness) {
      const percent = stat.completeness.toFixed(1);
      const bar = this.getProgressBar(stat.completeness, 30);
      report += `${stat.language.padEnd(10)} ${bar} ${percent}% (${stat.translatedKeys}/${stat.totalKeys})\n`;
    }

    report += `\n📊 Summary:\n`;
    const avgCompleteness = stats.reduce((a, b) => a + b.completeness, 0) / stats.length;
    report += `   • Total Languages: ${stats.length}\n`;
    report += `   • Average Completeness: ${avgCompleteness.toFixed(1)}%\n`;
    report += `   • Total Namespaces: ${this.namespaces.length}\n`;

    const incompleteCount = stats.filter(s => s.completeness < 100).length;
    if (incompleteCount > 0) {
      report += `\n⚠️  Incomplete Languages: ${incompleteCount}\n`;
    }

    return report;
  }

  private getProgressBar(percent: number, width = 30): string {
    const filled = Math.round((percent / 100) * width);
    const empty = width - filled;
    return `[${('█').repeat(filled)}${('░').repeat(empty)}]`;
  }
}

// Export singleton instance
export const translationManager = new TranslationManager();
