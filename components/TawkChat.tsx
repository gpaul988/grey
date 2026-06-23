'use client';

import Script from 'next/script';
import { useEffect, useRef } from 'react';

declare global {
    interface Window {
        Tawk_API?: Record<string, unknown>;
        Tawk_LoadStart?: Date;
    }
}

export type TawkChatProps = {
    propertyId: string;
    widgetId: string;
    /** Bottom offset in px — nudges Tawk above any FAB. Default 80. */
    offsetPx?: number;
};

export default function TawkChat({ propertyId, widgetId, offsetPx = 80 }: TawkChatProps) {
    const injected = useRef(false);

    useEffect(() => {
        if (!propertyId || !widgetId) return;
        if (injected.current) return;
        injected.current = true;

        // ── Silence Tawk internal noise without re-throwing ──────────────
        const originalError = console.error.bind(console);
        const originalWarn  = console.warn.bind(console);

        const isTawkNoise = (...args: unknown[]): boolean => {
            try {
                const joined = args.map(a =>
                    typeof a === 'string' ? a : (a as { message?: string; stack?: string })?.message ?? String(a)
                ).join(' ');
                const stack = new Error().stack ?? '';
                return (
                    // Tawk error-report ping: single `true` value
                    (args.length === 1 && args[0] === true) ||
                    /i18next is not a function|\$_Tawk|Tawk\/Logger/i.test(joined) ||
                    /embed\.tawk\.to|twk-(chunk|vendor)/i.test(stack)
                );
            } catch { return false; }
        };

        console.error = (...args: unknown[]) => { if (!isTawkNoise(...args)) originalError(...args); };
        console.warn  = (...args: unknown[]) => { if (!isTawkNoise(...args)) originalWarn(...args); };

        // ── Suppress unhandled Tawk promise rejections & script errors ────
        const onRejection = (e: PromiseRejectionEvent) => {
            try {
                const msg = String((e.reason as { message?: string })?.message ?? e.reason ?? '');
                if (/tawk\.to|twk-chunk|i18next/i.test(msg)) { e.preventDefault(); }
            } catch { /* ignore */ }
        };
        const onError = (e: ErrorEvent) => {
            if (/tawk\.to/i.test(e.filename ?? '') || /tawk|twk/i.test(e.message ?? '')) {
                e.preventDefault();
            }
        };
        window.addEventListener('unhandledrejection', onRejection, true);
        window.addEventListener('error', onError, true);

        // ── Pre-initialise Tawk BEFORE the script can fire ────────────────
        window.Tawk_API        = window.Tawk_API ?? {};
        window.Tawk_LoadStart  = new Date();

        // ── Nudge launcher button above FAB once Tawk loads ───────────────
        const nudge = () => {
            document
                .querySelectorAll<HTMLElement>('#tawk-bubble-container, [id^="tawk-"], iframe[src*="tawk.to"]')
                .forEach(el => {
                    const h = el.getBoundingClientRect().height;
                    if (h === 0 || h < 120) {
                        el.style.setProperty('bottom', `${offsetPx}px`, 'important');
                    }
                });
        };

        const prevOnLoad = window.Tawk_API.onLoad as (() => void) | undefined;
        window.Tawk_API.onLoad = function () {
            try { prevOnLoad?.(); } catch { /* ignore */ }
            nudge();
        };

        const observer = new MutationObserver(nudge);
        observer.observe(document.body, { childList: true, subtree: false });

        return () => {
            observer.disconnect();
            window.removeEventListener('unhandledrejection', onRejection, true);
            window.removeEventListener('error', onError, true);
            console.error = originalError;
            console.warn  = originalWarn;
        };
    }, [propertyId, widgetId, offsetPx]);

    if (!propertyId || !widgetId) return null;

    return (
        <>
            {/*
              * Initialise Tawk globals SYNCHRONOUSLY so the embed script
              * always finds them ready — even on fast connections / CDN cache hits.
              */}
            <Script id="tawk-init" strategy="beforeInteractive">
                {`window.Tawk_API = window.Tawk_API || {};
window.Tawk_LoadStart = new Date();`}
            </Script>

            <Script
                id="tawkto-embed"
                src={`https://embed.tawk.to/${propertyId}/${widgetId}`}
                strategy="afterInteractive"
                async
            />
        </>
    );
}
