import { defaultLanguage, supportedLanguages } from '@/i18n.config';

type TranslationKey = string; // e.g., "greeting.morning" or "header.services"

let translationsCache: Record<string, Record<string, any>> = {};

/**
 * Load translations for a specific language.
 */
export async function loadTranslations(lang: string): Promise<Record<string, any>> {
    if (translationsCache[lang]) {
        return translationsCache[lang];
    }

    try {
        const translations = await import(`./translations/${lang}.json`);
        translationsCache[lang] = translations.default || translations;
        return translationsCache[lang];
    } catch (error) {
        console.warn(`[i18n] Failed to load translations for ${lang}, falling back to ${defaultLanguage}`);
        if (lang !== defaultLanguage) {
            return loadTranslations(defaultLanguage);
        }
        return {};
    }
}

/**
 * Get a translated string by dot-notation key.
 * Supports placeholders: "{name}" will be replaced with values.greeting_name
 *
 * @example
 * t('greeting.greeting', 'en', { greeting: 'Good morning', name: 'John' })
 * => "Good morning, John!"
 */
export function getTranslation(
    key: TranslationKey,
    lang: string,
    placeholders?: Record<string, string>,
    translations?: Record<string, any>
): string {
    if (!translations) {
        console.warn(`[i18n] getTranslation called without translations loaded`);
        return key;
    }

    // Navigate nested keys (e.g., "greeting.morning" -> translations.greeting.morning)
    const keys = key.split('.');
    let value: any = translations;

    for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
            value = value[k];
        } else {
            console.warn(`[i18n] Missing translation key: ${key}`);
            return key;
        }
    }

    if (typeof value !== 'string') {
        return key;
    }

    // Replace placeholders
    if (placeholders) {
        let result = value;
        for (const [placeholder, text] of Object.entries(placeholders)) {
            result = result.replace(new RegExp(`{${placeholder}}`, 'g'), text);
        }
        return result;
    }

    return value;
}

/**
 * Get all translations for a language (for client-side hydration).
 */
export async function getAllTranslations(lang: string): Promise<Record<string, any>> {
    return loadTranslations(lang);
}

/**
 * Validate if a language is supported.
 */
export function isLanguageSupported(lang: string): boolean {
    return supportedLanguages.includes(lang);
}
