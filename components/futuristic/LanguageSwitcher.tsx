'use client';

import React, { useState } from 'react';
import { supportedLanguages } from '@/i18n.config';

interface LanguageSwitcherProps {
    currentLanguage: string;
    onLanguageChange: (lang: string) => void;
    translations?: Record<string, any>;
}

const languageNames: Record<string, string> = {
    en: '🇺🇸 English',
    es: '🇪🇸 Español',
    fr: '🇫🇷 Français',
    de: '🇩🇪 Deutsch',
    it: '🇮🇹 Italiano',
    pt: '🇵🇹 Português',
    ru: '🇷🇺 Русский',
    zh: '🇨🇳 中文',
    ja: '🇯🇵 日本語',
    ar: '🇸🇦 العربية',
};

/**
 * Language switcher button with dropdown.
 * Updates language preference and triggers page reload.
 */
export default function LanguageSwitcher({ currentLanguage, onLanguageChange, translations }: LanguageSwitcherProps) {
    const [isOpen, setIsOpen] = useState(false);

    const handleLanguageSelect = (lang: string) => {
        if (lang !== currentLanguage) {
            localStorage.setItem('grey-language', lang);
            onLanguageChange(lang);
            // Reload page to apply translations
            window.location.reload();
        }
        setIsOpen(false);
    };

    return (
        <div className="relative inline-block">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg border border-cyan-400/30 bg-black/30 hover:bg-cyan-400/10 text-cyan-100 text-sm font-medium transition-colors duration-200"
                title={translations?.common?.language || 'Language'}
                aria-label="Select language"
            >
                <span className="text-base">{languageNames[currentLanguage]?.split(' ')[0] || '🌐'}</span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
            </button>

            {isOpen && (
                <>
                    {/* Backdrop to close dropdown */}
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Dropdown menu */}
                    <div className="absolute right-0 top-full mt-2 w-56 bg-black/95 border border-cyan-400/30 rounded-lg shadow-2xl z-50 overflow-hidden">
                        <div className="p-2">
                            <p className="text-xs text-gray-400 px-2 py-1 uppercase tracking-wider font-semibold">
                                {translations?.common?.selectLanguage || 'Select Language'}
                            </p>
                            <div className="mt-2 space-y-1">
                                {supportedLanguages.map((lang) => (
                                    <button
                                        key={lang}
                                        onClick={() => handleLanguageSelect(lang)}
                                        className={`w-full text-left px-3 py-2 rounded transition-colors duration-150 text-sm font-medium ${
                                            lang === currentLanguage
                                                ? 'bg-teal-500/80 text-white'
                                                : 'text-cyan-100 hover:bg-cyan-400/10'
                                        }`}
                                    >
                                        {languageNames[lang] || lang.toUpperCase()}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
