import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';

const namespaces = ['common', 'services', 'products', 'checkout', 'errors', 'notifications'];
const languages = ['en', 'es', 'fr', 'de', 'pt', 'ja', 'zh', 'ar', 'ru', 'it'];

export const i18nConfig = {
  fallbackLng: 'en',
  ns: namespaces,
  defaultNS: 'common',
  resources: {}, // Populated by HttpBackend
  backend: {
    loadPath: '/locales/{{lng}}/{{ns}}.json',
  },
  detection: {
    order: ['path', 'cookie', 'localStorage', 'navigator', 'htmlTag'],
    caches: ['localStorage', 'cookie'],
  },
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
};

export const initI18n = async () => {
  if (!i18next.isInitialized) {
    await i18next
      .use(HttpBackend)
      .use(LanguageDetector)
      .init({
        ...i18nConfig,
        backend: i18nConfig.backend,
        detection: i18nConfig.detection,
      });
  }
  return i18next;
};

export const serverI18nConfig = {
  fallbackLng: 'en',
  ns: namespaces,
  defaultNS: 'common',
  resources: {}, // Will be populated server-side
};

export const getLanguages = () => languages;
export const getNamespaces = () => namespaces;
