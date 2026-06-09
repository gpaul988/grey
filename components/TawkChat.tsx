'use client';

import {useEffect} from 'react';

declare global {
    interface Window {
        Tawk_API?: {
            onLoad?: () => void;
        };
        Tawk_LoadStart?: Date;
    }
}

export type TawkChatProps = {
    propertyId: string;
    widgetId: string;
    offsetPx?: number;
};

export default function TawkChat({propertyId, widgetId, offsetPx}: TawkChatProps) {
    useEffect(() => {
        if (!propertyId || !widgetId) return;

        const scriptId = 'tawkto-embed-script';
        const fallbackOffset = typeof offsetPx === 'number' ? offsetPx : 24;
        const floatingButtonSelector = '[data-request-quote-floating-button="true"]';
        const originalConsoleError = console.error.bind(console);

        window.Tawk_API = window.Tawk_API || {};
        window.Tawk_LoadStart = new Date();

        // Tawk's embed can emit `console.error(true)` during its internal loading flow.
        // Filter only that exact noise so Next.js dev overlay doesn't surface it as an app error.
        console.error = (...args: unknown[]) => {
            try {
                if (args.length === 1 && args[0] === true) {
                    const stack = new Error().stack || '';
                    if (stack.includes('embed.tawk.to') || stack.includes('twk-chunk-common')) {
                        return;
                    }
                }
            } catch {
                // ignore
            }

            originalConsoleError(...args);
        };

        // If a global Tawk script already exists (for example injected in _document), don't duplicate it
        const existingTawkScript = document.querySelector('script[src*="embed.tawk.to"]');

        if (!existingTawkScript && !document.getElementById(scriptId)) {
            const script = document.createElement('script');
            script.id = scriptId;
            script.async = true;
            script.src = `https://embed.tawk.to/${propertyId}/${widgetId}`;
            script.charset = 'UTF-8';
            script.setAttribute('crossorigin', '*');
            document.body.appendChild(script);
        }

        const getFloatingButtonOffset = () => {
            const button = document.querySelector<HTMLElement>(floatingButtonSelector);
            if (!button) return null;

            const style = window.getComputedStyle(button);
            if (style.display === 'none' || style.visibility === 'hidden') return null;

            const rect = button.getBoundingClientRect();
            if (!rect.width || !rect.height) return null;

            // `bottom-8` = 32px. Add the button's height and a little breathing room.
            return 32 + Math.ceil(rect.height) + 16;
        };

        const getDesiredOffset = () => getFloatingButtonOffset() ?? fallbackOffset;

        // Try to find injected Tawk elements and apply an inline bottom offset.
        const applyOffset = (offset: number) => {
            if (!offset) return false;

            const selector = '[id*="tawk"], [class*="tawk"], iframe[src*="tawk.to"]';
            const nodes = Array.from(document.querySelectorAll<HTMLElement>(selector));

            for (const node of nodes) {
                try {
                    const style = window.getComputedStyle(node);
                    if (style.position === 'fixed' || style.position === 'sticky') {
                        node.style.bottom = `${offset}px`;
                        if (node.parentElement) node.parentElement.style.bottom = `${offset}px`;
                        return true;
                    }
                } catch (err) {
                    // If cross-origin iframe access throws, still try setting inline style on the element
                    try {
                        node.style.bottom = `${offset}px`;
                        return true;
                    } catch (e) {
                        // ignore and continue
                    }
                }
            }

            return false;
        };

        let intervalId: number | undefined;
        let mutationObserver: MutationObserver | undefined;
        let resizeTimer: number | undefined;

        const tryApply = () => {
            const px = getDesiredOffset();
            if (!px) return;

            // try immediate
            if (applyOffset(px)) return;

            if (intervalId) window.clearInterval(intervalId);
            intervalId = window.setInterval(() => {
                applyOffset(getDesiredOffset());
            }, 500);

            // attach to Tawk onLoad callback if available
            try {
                if (window.Tawk_API) {
                    const prev = window.Tawk_API.onLoad;
                    window.Tawk_API.onLoad = function () {
                        if (prev) try { prev(); } catch (e) {}
                        applyOffset(getDesiredOffset());
                    };
                }
            } catch (e) {
                // ignore
            }
        };

        const scheduleApply = () => {
            window.clearTimeout(resizeTimer);
            resizeTimer = window.setTimeout(() => tryApply(), 50);
        };

        // eslint-disable-next-line prefer-const
        mutationObserver = new MutationObserver(() => scheduleApply());
        mutationObserver.observe(document.body, {childList: true, subtree: true, attributes: true});

        window.addEventListener('resize', scheduleApply);
        scheduleApply();

        return () => {
            if (intervalId) window.clearInterval(intervalId);
            if (mutationObserver) mutationObserver.disconnect();
            window.removeEventListener('resize', scheduleApply);
            if (resizeTimer) window.clearTimeout(resizeTimer);
            console.error = originalConsoleError;
        };
    }, [propertyId, widgetId, offsetPx]);

    return null;
}