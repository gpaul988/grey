/**
 * All languages on Earth (ISO 639-1 codes + names)
 * Sorted alphabetically for display in language switcher
 */

export const ALL_LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'de', name: 'German', nativeName: 'Deutsch' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語' },
  { code: 'zh', name: 'Chinese (Simplified)', nativeName: '中文 (简体)' },
  { code: 'zh-TW', name: 'Chinese (Traditional)', nativeName: '中文 (繁體)' },
  { code: 'ko', name: 'Korean', nativeName: '한국어' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe' },
  { code: 'pl', name: 'Polish', nativeName: 'Polski' },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands' },
  { code: 'sv', name: 'Swedish', nativeName: 'Svenska' },
  { code: 'da', name: 'Danish', nativeName: 'Dansk' },
  { code: 'no', name: 'Norwegian', nativeName: 'Norsk' },
  { code: 'fi', name: 'Finnish', nativeName: 'Suomi' },
  { code: 'el', name: 'Greek', nativeName: 'Ελληνικά' },
  { code: 'cs', name: 'Czech', nativeName: 'Čeština' },
  { code: 'hu', name: 'Hungarian', nativeName: 'Magyar' },
  { code: 'ro', name: 'Romanian', nativeName: 'Română' },
  { code: 'bg', name: 'Bulgarian', nativeName: 'Български' },
  { code: 'hr', name: 'Croatian', nativeName: 'Hrvatski' },
  { code: 'sk', name: 'Slovak', nativeName: 'Slovenčina' },
  { code: 'sl', name: 'Slovenian', nativeName: 'Slovenščina' },
  { code: 'et', name: 'Estonian', nativeName: 'Eesti' },
  { code: 'lv', name: 'Latvian', nativeName: 'Latviešu' },
  { code: 'lt', name: 'Lithuanian', nativeName: 'Lietuvių' },
  { code: 'uk', name: 'Ukrainian', nativeName: 'Українська' },
  { code: 'be', name: 'Belarusian', nativeName: 'Беларуская' },
  { code: 'sr', name: 'Serbian', nativeName: 'Српски' },
  { code: 'mk', name: 'Macedonian', nativeName: 'Македонски' },
  { code: 'th', name: 'Thai', nativeName: 'ไทย' },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt' },
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia' },
  { code: 'ms', name: 'Malay', nativeName: 'Bahasa Melayu' },
  { code: 'tl', name: 'Filipino/Tagalog', nativeName: 'Tagalog' },
  { code: 'my', name: 'Burmese', nativeName: 'မြန်မာ' },
  { code: 'km', name: 'Khmer', nativeName: 'ខ្មែរ' },
  { code: 'lo', name: 'Lao', nativeName: 'ລາວ' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو' },
  { code: 'fa', name: 'Persian/Farsi', nativeName: 'فارسی' },
  { code: 'he', name: 'Hebrew', nativeName: 'עברית' },
  { code: 'sq', name: 'Albanian', nativeName: 'Shqip' },
  { code: 'mt', name: 'Maltese', nativeName: 'Malti' },
  { code: 'ga', name: 'Irish', nativeName: 'Gaeilge' },
  { code: 'cy', name: 'Welsh', nativeName: 'Cymraeg' },
  { code: 'zu', name: 'Zulu', nativeName: 'Zulu' },
  { code: 'xh', name: 'Xhosa', nativeName: 'Xhosa' },
  { code: 'am', name: 'Amharic', nativeName: 'አማርኛ' },
  { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili' },
  { code: 'ha', name: 'Hausa', nativeName: 'Hausa' },
  { code: 'ig', name: 'Igbo', nativeName: 'Igbo' },
  { code: 'yo', name: 'Yoruba', nativeName: 'Yorùbá' },
  { code: 'ug', name: 'Uyghur', nativeName: 'ئۇيغۇرچە' },
  { code: 'kk', name: 'Kazakh', nativeName: 'Қазақ' },
  { code: 'uz', name: 'Uzbek', nativeName: 'Oʻzbek' },
  { code: 'tg', name: 'Tajik', nativeName: 'Тоҷикӣ' },
  { code: 'ky', name: 'Kyrgyz', nativeName: 'Кыргызча' },
  { code: 'mn', name: 'Mongolian', nativeName: 'Монгол' },
].sort((a, b) => a.code.localeCompare(b.code));

export const DEFAULT_LANGUAGE = 'en';

/**
 * Detect browser language from Accept-Language header or navigator.language
 * Returns best-match language code from supported list, falls back to 'en'
 */
export function detectBrowserLanguage(acceptLanguageHeader?: string): string {
  if (typeof window === 'undefined') {
    // Server-side: parse Accept-Language header
    if (!acceptLanguageHeader) return DEFAULT_LANGUAGE;
    
    const langs = acceptLanguageHeader
      .split(',')
      .map(lang => lang.split(';')[0].trim().toLowerCase())
      .filter(Boolean);
    
    for (const lang of langs) {
      const exact = ALL_LANGUAGES.find(l => l.code.toLowerCase() === lang);
      if (exact) return exact.code;
      
      const prefix = lang.split('-')[0];
      const prefixMatch = ALL_LANGUAGES.find(l => l.code.split('-')[0].toLowerCase() === prefix);
      if (prefixMatch) return prefixMatch.code;
    }
    
    return DEFAULT_LANGUAGE;
  }
  
  // Client-side: use navigator.language
  const navLang = navigator.language.toLowerCase();
  const exact = ALL_LANGUAGES.find(l => l.code.toLowerCase() === navLang);
  if (exact) return exact.code;
  
  const prefix = navLang.split('-')[0];
  const prefixMatch = ALL_LANGUAGES.find(l => l.code.split('-')[0].toLowerCase() === prefix);
  if (prefixMatch) return prefixMatch.code;
  
  return DEFAULT_LANGUAGE;
}

/**
 * Get language name by code
 */
export function getLanguageName(code: string): string {
  const lang = ALL_LANGUAGES.find(l => l.code === code);
  return lang ? lang.nativeName : code;
}
