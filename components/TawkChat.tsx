'use client';

import {useEffect} from 'react';

declare global {
    interface Window {
        Tawk_API?: {
            onLoad?: () => void;
            setAttributes?: (attrs: Record<string, string>, cb?: () => void) => void;
        };
        Tawk_LoadStart?: Date;
        Tawk_SSOToken?: string;
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
        if (!propertyId || !widgetId) return;

        const scriptId = 'tawkto-embed-script';

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

        // Let Tawk position itself naturally (bottom-right).
        // We only apply its official CSS-variable offset to push it above
        // the voice FAB button which sits at bottom-right as well.
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

        // Inject script once
        if (!document.getElementById(scriptId) && !document.querySelector('script[src*="embed.tawk.to"]')) {
            const script = document.createElement('script');
            script.id = scriptId;
            script.async = true;
            script.src = `https://embed.tawk.to/${propertyId}/${widgetId}`;
            script.charset = 'UTF-8';
            script.setAttribute('crossorigin', '*');
            document.body.appendChild(script);
        }

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

    return null;
}
