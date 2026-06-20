'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getLanguageFromBrowser, setLanguagePreference, defaultLanguage } from '@/i18n.config';
import { getAllTranslations } from '@/lib/translations';

interface I18nContextType {
    language: string;
    translations: Record<string, any>;
    setLanguage: (lang: string) => void;
    t: (key: string, placeholders?: Record<string, string>) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function useI18n() {
    const context = useContext(I18nContext);
    if (!context) {
        throw new Error('useI18n must be used within I18nProvider');
    }
    return context;
}

interface I18nProviderProps {
    initialLanguage?: string;
    initialTranslations?: Record<string, any>;
    children: ReactNode;
}

/**
 * I18n Provider for client-side translation management.
 * Handles language detection, switching, and translation lookup.
 */
export function I18nProvider({ initialLanguage = defaultLanguage, initialTranslations = {}, children }: I18nProviderProps) {
    const [language, setLanguageState] = useState(initialLanguage);
    const [translations, setTranslations] = useState(initialTranslations);
    const [isLoading, setIsLoading] = useState(!initialTranslations || Object.keys(initialTranslations).length === 0);

    // Load translations on language change
    useEffect(() => {
        const loadLanguage = async () => {
            setIsLoading(true);
            try {
                const newTranslations = await getAllTranslations(language);
                setTranslations(newTranslations);
            } catch (error) {
                console.error(`Failed to load translations for ${language}:`, error);
            } finally {
                setIsLoading(false);
            }
        };

        if (Object.keys(translations).length === 0 || language !== initialLanguage) {
            loadLanguage();
        }
    }, [language, initialLanguage, translations]);

    const setLanguage = (newLang: string) => {
        setLanguageState(newLang);
        setLanguagePreference(newLang);
    };

    const t = (key: string, placeholders?: Record<string, string>): string => {
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
    };

    return (
        <I18nContext.Provider
            value={{
                language,
                translations,
                setLanguage,
                t,
            }}
        >
            {children}
        </I18nContext.Provider>
    );
}
