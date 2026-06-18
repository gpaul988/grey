import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

const languages = ['en', 'es', 'fr', 'de', 'pt', 'zh', 'ar', 'sw', 'yo', 'ig', 'ja', 'ru', 'hi', 'it'];

i18next
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    supportedLngs: languages,
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    ns: ['common'],
    defaultNS: 'common',
    interpolation: {
      escapeValue: false, // React already protects against XSS
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    react: {
      useSuspense: false, // Disable suspense to avoid hydration issues
    },
  });

export default i18next;

export const ISO_LANGUAGE_CODES = languages;

export const COUNTRY_TO_LANGUAGE: Record<string, string> = {
  US: 'en',
  GB: 'en',
  CA: 'en',
  AU: 'en',
  NZ: 'en',
  IE: 'en',
  ZA: 'en', // South Africa - English majority
  ES: 'es',
  MX: 'es',
  AR: 'es',
  CO: 'es',
  CL: 'es',
  PE: 'es',
  VE: 'es',
  FR: 'fr',
  CH: 'de', // Default to German for Switzerland
  BE: 'fr', // Default to French for Belgium
  DE: 'de',
  AT: 'de',
  IT: 'it',
  PT: 'pt',
  BR: 'pt',
  CN: 'zh',
  TW: 'zh',
  SG: 'zh',
  JP: 'ja',
  RU: 'ru',
  KZ: 'ru',
  BY: 'ru',
  SA: 'ar',
  AE: 'ar',
  EG: 'ar',
  JO: 'ar',
  LB: 'ar',
  IN: 'hi',
  TZ: 'sw',
  KE: 'sw',
  UG: 'sw',
  NG: 'yo',
  BJ: 'yo',
};
