'use client';

import { useTranslation as useI18NextTranslation } from 'react-i18next';
import { useRouter, usePathname } from 'next/navigation';
import { useCallback } from 'react';
import { addLanguagePrefix, removeLanguagePrefix } from './server';

export const useTranslation = (namespace?: string) => {
  return useI18NextTranslation(namespace);
};

export const useLanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();

  const changeLanguage = useCallback(
    (lang: string) => {
      const cleanPath = removeLanguagePrefix(pathname || '/');
      const newPath = addLanguagePrefix(cleanPath, lang);
      router.push(newPath);
    },
    [router, pathname]
  );

  const getCurrentLanguage = useCallback((): string => {
    const match = (pathname || '/').match(/^\/(en|es|fr|de|pt|ja|zh|ar|ru|it)/);
    return match ? match[1] : 'en';
  }, [pathname]);

  return { changeLanguage, getCurrentLanguage };
};

export const LanguageSwitcher = () => {
  const { changeLanguage, getCurrentLanguage } = useLanguageSwitcher();
  const current = getCurrentLanguage();
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' },
    { code: 'pt', name: 'Português' },
    { code: 'ja', name: '日本語' },
    { code: 'zh', name: '中文' },
    { code: 'ar', name: 'العربية' },
    { code: 'ru', name: 'Русский' },
    { code: 'it', name: 'Italiano' },
  ];

  return (
    <div className="flex items-center gap-2">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => changeLanguage(lang.code)}
          className={`px-3 py-1 rounded text-sm transition ${
            current === lang.code
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          {lang.name}
        </button>
      ))}
    </div>
  );
};

export const useLanguagePreference = () => {
  const { i18n } = useI18NextTranslation();
  
  const savePreference = useCallback(
    (lang: string) => {
      localStorage.setItem('preferred-language', lang);
      i18n.changeLanguage(lang);
    },
    [i18n]
  );

  const loadPreference = useCallback((): string => {
    if (typeof window === 'undefined') return 'en';
    return localStorage.getItem('preferred-language') || 'en';
  }, []);

  return { savePreference, loadPreference };
};
