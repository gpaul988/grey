'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import { ThemeProvider, themeInitScript } from "@/components/ThemeProvider";
import { PersonalizationProvider } from "@/components/futuristic/PersonalizationProvider";
import ParallaxProvider from "@/components/futuristic/ParallaxProvider";
import VoiceCommander from "@/components/futuristic/VoiceCommander";
import Preloader from "@/components/futuristic/Preloader";
import CookieConsent from "@/components/futuristic/CookieConsent";
import ErrorBoundary from "@/components/ErrorBoundary";
import { I18nProvider } from "@/components/futuristic/I18nProvider";
import { getLanguageFromBrowser, defaultLanguage } from "@/i18n.config";
import { getAllTranslations } from "@/lib/translations";

interface LayoutClientProps {
    children: ReactNode;
    initialLanguage?: string;
    initialTranslations?: Record<string, any>;
}

/**
 * Client-side layout wrapper for i18n and provider setup.
 */
export default function LayoutClient({ 
    children, 
    initialLanguage = defaultLanguage,
    initialTranslations = {}
}: LayoutClientProps) {
    const [language, setLanguage] = useState(initialLanguage);
    const [translations, setTranslations] = useState(initialTranslations);
    const [isHydrated, setIsHydrated] = useState(false);

    // Hydrate with browser language preference
    useEffect(() => {
        const hydrate = async () => {
            const browserLang = getLanguageFromBrowser();
            setLanguage(browserLang);

            // Load translations if not already loaded
            if (!initialTranslations || Object.keys(initialTranslations).length === 0) {
                const trans = await getAllTranslations(browserLang);
                setTranslations(trans);
            }

            setIsHydrated(true);
        };

        hydrate().catch(console.error);
    }, [initialTranslations]);

    return (
        <ErrorBoundary>
            <ThemeProvider>
                <PersonalizationProvider>
                    <I18nProvider initialLanguage={language} initialTranslations={translations}>
                        <Preloader />
                        <CookieConsent />
                        <ParallaxProvider />
                        <React.Suspense fallback={null}>
                            <VoiceCommander />
                        </React.Suspense>
                        {children}
                    </I18nProvider>
                </PersonalizationProvider>
            </ThemeProvider>
        </ErrorBoundary>
    );
}
