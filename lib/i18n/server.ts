import { createInstance } from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { serverI18nConfig, getNamespaces } from './config';

const initI18nInstance = (language: string) => {
  const i18nInstance = createInstance();

  // Dynamically import all translation files
  const resources: Record<string, Record<string, any>> = {};
  const langs = ['en', 'es', 'fr', 'de', 'pt', 'ja', 'zh', 'ar', 'ru', 'it'];
  const namespaces = getNamespaces();

  i18nInstance.use(resourcesToBackend(
    (language: string, namespace: string) => {
      try {
        return require(`../../public/locales/${language}/${namespace}.json`);
      } catch {
        return {};
      }
    }
  ));

  i18nInstance.init({
    ...serverI18nConfig,
    lng: language,
    fallbackLng: 'en',
  });

  return i18nInstance;
};

export const getServerI18n = async (language: string) => {
  const instance = initI18nInstance(language);
  await instance.loadNamespaces(getNamespaces());
  return instance;
};

export const useServerTranslation = async (language: string, namespace: string) => {
  const i18n = await getServerI18n(language);
  return {
    t: (key: string, defaultValue?: string) => i18n.t(key, { defaultValue }),
    i18n,
  };
};

// URL routing for language prefixes
export const getLanguageFromPath = (pathname: string): string => {
  const match = pathname.match(/^\/(en|es|fr|de|pt|ja|zh|ar|ru|it)/);
  return match ? match[1] : 'en';
};

export const removeLanguagePrefix = (pathname: string): string => {
  return pathname.replace(/^\/(en|es|fr|de|pt|ja|zh|ar|ru|it)/, '') || '/';
};

export const addLanguagePrefix = (pathname: string, language: string): string => {
  const clean = removeLanguagePrefix(pathname);
  // Root path stays as root (special case)
  if (clean === '/') return '/';
  // Non-root paths get language prefix
  return language === 'en' ? clean : `/${language}${clean}`;
};
