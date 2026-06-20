'use client';

import React, { useEffect, useState } from 'react';
import Header from './Header';
import GreetingHeader from './futuristic/GreetingHeader';
import LanguageSwitcher from './futuristic/LanguageSwitcher';
import { useI18n } from '@/components/futuristic/I18nProvider';

/**
 * Wrapper that combines greeting header, language switcher, and the main header.
 * Rendered within I18nProvider context.
 * 
 * ONLY mounted after LayoutClient has hydrated translations and language.
 */
export default function HeaderWithGreeting() {
    const { language, translations, setLanguage } = useI18n();

    // If context values are missing, fall back to header-only
    if (!language || !translations || Object.keys(translations).length === 0) {
        return (
            <div className="flex items-center justify-between px-4 lg:px-[4.6em]">
                <Header />
            </div>
        );
    }

    return (
        <>
            {/* Greeting header with personalized name and time-based greeting */}
            <GreetingHeader translations={translations} currentLanguage={language} />
            
            {/* Main header with logo and navigation */}
            <div className="flex items-center justify-between px-4 lg:px-[4.6em]">
                <div className="flex-1">
                    <Header />
                </div>
                {/* Language switcher in top-right */}
                <LanguageSwitcher 
                    currentLanguage={language} 
                    onLanguageChange={setLanguage}
                    translations={translations}
                />
            </div>
        </>
    );
}
