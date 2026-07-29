'use client';

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
    /** Bottom offset in px  - nudges Tawk above any FAB. Default 80. */
    offsetPx?: number;
};

export default function TawkChat({ propertyId, widgetId, offsetPx = 80 }: TawkChatProps) {
    const injected = useRef(false);

    useEffect(() => {
        if (!propertyId || !widgetId) return;
        if (injected.current) return;
        injected.current = true;

        // Intentionally avoid overriding console.error/console.warn globally because
        // third-party embeds (like Tawk) may rely on console behavior. Rely instead
        // on window error / rejection handlers below to suppress known noisy errors.

        //  -  -  Suppress unhandled Tawk rejections & script errors  -  -  -  -  -  -  -  -  -  -  -  - 
        const onRejection = (e: PromiseRejectionEvent) => {
            const msg = String((e.reason as {message?: string})?.message ?? e.reason ?? '');
            if (/tawk\.to|twk-chunk|i18next|Tawk_API|\$_Tawk|is not a function/i.test(msg)) e.preventDefault();
        };
        const onError = (e: ErrorEvent) => {
            if (/tawk\.to/i.test(e.filename ?? '') || /tawk|twk|i18next|Tawk_API|\$_Tawk|is not a function/i.test(e.message ?? ''))
                e.preventDefault();
        };
        window.addEventListener('unhandledrejection', onRejection, true);
        window.addEventListener('error', onError, true);

        //  -  -  Pre-init Tawk globals  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  - 
        // Provide a tiny shim for `i18next` because the Tawk embed can call it
        // as a function in some builds which causes `i18next is not a function`.
        // The shim is harmless and exposes common methods used by Tawk.
        if (!(window as any).i18next) {
            const _shim: any = function () { return _shim; };
            _shim.t = (k: string) => k;
            _shim.init = () => {};
            _shim.on = () => {};
            (window as any).i18next = _shim;
        }
        window.Tawk_API       = window.Tawk_API ?? {};
        window.Tawk_LoadStart = window.Tawk_LoadStart ?? new Date();

        //  -  -  Nudge launcher above FAB once loaded  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  - 
        const nudge = () => {
            document
                .querySelectorAll<HTMLElement>('[id^="tawk-"], iframe[src*="tawk.to"]')
                .forEach(el => {
                    try {
                        const rect = el.getBoundingClientRect();
                        if (rect && rect.height < 120) {
                            el.style.setProperty('bottom', `${offsetPx}px`, 'important');
                        }
                    } catch (e) {
                        // ignore elements not fully available yet
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

        //  -  -  Inject the Tawk embed script directly into <head>  -  -  -  -  -  -  -  -  -  -  -  -  - 
        // Using DOM injection (not Next/Script) so it always fires regardless
        // of Turbopack's script scheduling quirks.
        if (!document.getElementById('tawkto-embed')) {
            const s = document.createElement('script');
            s.id       = 'tawkto-embed';
            s.async    = true;
            s.src      = `https://embed.tawk.to/${propertyId}/${widgetId}`;
            s.charset  = 'UTF-8';
            s.setAttribute('crossorigin', '*');
            document.head.appendChild(s);
        }

        return () => {
            observer.disconnect();
            window.removeEventListener('unhandledrejection', onRejection, true);
            window.removeEventListener('error', onError, true);
            console.error = originalError;
            console.warn  = originalWarn;
        };
    }, [propertyId, widgetId, offsetPx]);

    return null;
}
