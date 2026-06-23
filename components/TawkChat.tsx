'use client';

import Script from 'next/script';
import { useEffect } from 'react';

declare global {
    interface Window {
        Tawk_API?: {
            onLoad?: () => void;
            setAttributes?: (attrs: Record<string, string>, cb?: () => void) => void;
        };
        Tawk_LoadStart?: Date;
    }
}

export type TawkChatProps = {
    propertyId: string;
    widgetId: string;
    /** Bottom offset in px — nudges Tawk above the voice FAB. Default 80. */
    offsetPx?: number;
};

export default function TawkChat({propertyId, widgetId, offsetPx = 80}: TawkChatProps) {
    useEffect(() => {
        if (!propertyId || !widgetId) {
            console.warn('TawkChat: propertyId or widgetId missing. Set NEXT_PUBLIC_TAWK_PROPERTY_ID and NEXT_PUBLIC_TAWK_WIDGET_ID in .env.local');
            return;
        }

        // ── Suppress known Tawk internal noise ────────────────────────────
        const originalConsoleError = console.error.bind(console);
        console.error = (...args: unknown[]) => {
            try {
                if (args.length === 1 && args[0] === true) {
                    const stack = new Error().stack || '';
                    if (stack.includes('embed.tawk.to') || stack.includes('twk-chunk-common')) return;
                }
            } catch { /* ignore */ }
            originalConsoleError(...args);
        };

        const isTawkNoise = (val: unknown): boolean => {
            try {
                const msg =
                    typeof val === 'string'
                        ? val
                        : (val as {message?: string; stack?: string})?.message ||
                          (val as {stack?: string})?.stack || '';
                const stack = (val as {stack?: string})?.stack || '';
                return (
                    /i18next is not a function|\$_Tawk/i.test(String(msg)) ||
                    /embed\.tawk\.to|twk-(chunk|vendor)/i.test(String(stack))
                );
            } catch { return false; }
        };

        const onRejection = (e: PromiseRejectionEvent) => {
            if (isTawkNoise(e.reason)) { e.preventDefault(); e.stopImmediatePropagation(); }
        };
        const onError = (e: ErrorEvent) => {
            if (isTawkNoise(e.error) || isTawkNoise(e.message) || /tawk\.to/i.test(e.filename || '')) {
                e.preventDefault(); e.stopImmediatePropagation();
            }
        };
        window.addEventListener('unhandledrejection', onRejection, true);
        window.addEventListener('error', onError, true);
        // ──────────────────────────────────────────────────────────────────

        // Set up Tawk API and offset logic
        window.Tawk_API = window.Tawk_API || {};
        window.Tawk_LoadStart = new Date();

        const applyOffset = () => {
            try {
                // Tawk respects --tawk-bottom-offset CSS variable on its iframe containers.
                // Also directly style the iframes we can find.
                document.querySelectorAll<HTMLIFrameElement>(
                    'iframe[src*="tawk.to"], [id*="tawk"] iframe, [class*="tawk"] iframe'
                ).forEach((el) => {
                    // Only adjust bottom-anchored (launcher) iframes, not full-panel ones
                    const rect = el.getBoundingClientRect();
                    if (rect.height < 100) {
                        // small = launcher button
                        el.style.setProperty('bottom', `${offsetPx}px`, 'important');
                    }
                });
            } catch { /* cross-origin — can't touch */ }
        };

        const prevOnLoad = window.Tawk_API.onLoad;
        window.Tawk_API.onLoad = function () {
            if (prevOnLoad) try { prevOnLoad(); } catch (e) { /* ignore */ }
            applyOffset();
        };

        // Observe DOM for Tawk nodes appearing and nudge bottom offset
        const observer = new MutationObserver(() => applyOffset());
        observer.observe(document.body, {childList: true, subtree: false});

        return () => {
            observer.disconnect();
            window.removeEventListener('unhandledrejection', onRejection, true);
            window.removeEventListener('error', onError, true);
            console.error = originalConsoleError;
        };
    }, [propertyId, widgetId, offsetPx]);

    if (!propertyId || !widgetId) return null;

    return (
        <Script
            id="tawkto-embed-script"
            src={`https://embed.tawk.to/${propertyId}/${widgetId}`}
            strategy="afterInteractive"
            async
            charSet="UTF-8"
            crossOrigin="anonymous"
        />
    );
}
