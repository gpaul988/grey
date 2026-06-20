/**
 * i18n configuration for multi-language support.
 * Supports language auto-detection, manual switching, and localStorage persistence.
 */

export const defaultLanguage = 'en';
export const supportedLanguages = ['en', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'zh', 'ja', 'ar'];

/**
 * Get language from request headers (for SSR).
 * Parses Accept-Language header and returns the best match.
 */
export function getLanguageFromHeaders(acceptLanguageHeader?: string): string {
    if (!acceptLanguageHeader) return defaultLanguage;

    // Parse Accept-Language header (e.g., "en-US,en;q=0.9,es;q=0.8")
    const languages = acceptLanguageHeader
        .split(',')
        .map((lang) => {
            const [code, q = 'q=1'] = lang.trim().split(';');
            const quality = parseFloat(q.replace('q=', ''));
            return { code: code.split('-')[0].toLowerCase(), quality };
        })
        .sort((a, b) => b.quality - a.quality);

    for (const lang of languages) {
        if (supportedLanguages.includes(lang.code)) {
            return lang.code;
        }
    }

    return defaultLanguage;
}

/**
 * Get language from browser (client-side).
 * Checks localStorage first, then navigator.language, then defaults.
 */
export function getLanguageFromBrowser(): string {
    if (typeof window === 'undefined') return defaultLanguage;

    // Check localStorage
    const stored = localStorage.getItem('grey-language');
    if (stored && supportedLanguages.includes(stored)) {
        return stored;
    }

    // Check browser language
    const browserLang = navigator.language.split('-')[0].toLowerCase();
    if (supportedLanguages.includes(browserLang)) {
        return browserLang;
    }

    return defaultLanguage;
}

/**
 * Save language preference to localStorage.
 */
export function setLanguagePreference(lang: string): void {
    if (typeof window !== 'undefined' && supportedLanguages.includes(lang)) {
        localStorage.setItem('grey-language', lang);
    }
}

/**
 * Get or detect language (browser-side priority: stored > navigator > default).
 */
export function getDetectedLanguage(): string {
    return getLanguageFromBrowser();
}
