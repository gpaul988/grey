'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ALL_LANGUAGES, detectBrowserLanguage, DEFAULT_LANGUAGE } from './languages';
import { getTranslations } from './translations-complete';

interface I18nContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string, defaultValue?: string) => string;
  translations: Record<string, any>;
}

// Default context for SSR — prevent "must be used within I18nProvider" errors
const defaultContext: I18nContextType = {
  language: DEFAULT_LANGUAGE,
  setLanguage: () => {},
  t: (key: string, defaultValue: string = key) => defaultValue,
  translations: getTranslations(DEFAULT_LANGUAGE),
};

const I18nContext = createContext<I18nContextType>(defaultContext);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<string>(DEFAULT_LANGUAGE);
  const [translations, setTranslations] = useState<Record<string, any>>({});
  const [isMounted, setIsMounted] = useState(false);

  // Initialize on mount
  useEffect(() => {
    const savedLang = localStorage.getItem('grey-language');
    const detectedLang = detectBrowserLanguage();
    const initialLang = savedLang || detectedLang;
    
    setLanguageState(initialLang);
    setTranslations(getTranslations(initialLang));
    setIsMounted(true);
  }, []);

  const setLanguage = (newLang: string) => {
    setLanguageState(newLang);
    setTranslations(getTranslations(newLang));
    localStorage.setItem('grey-language', newLang);
  };

  const t = (key: string, defaultValue: string = key): string => {
    const keys = key.split('.');
    let value: any = translations;
    
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        return defaultValue;
      }
    }
    
    return typeof value === 'string' ? value : defaultValue;
  };

  if (!isMounted) {
    return <>{children}</>;
  }

  return (
    <I18nContext.Provider value={{ language, setLanguage, t, translations }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  // Context will always have a value (default during SSR, real during client)
  return context;
}
