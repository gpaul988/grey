'use client';

import {useEffect} from 'react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

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
    /** Extra bottom offset (px) for the chat widget. Defaults to 24. */
    offsetPx?: number;
};

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const SCRIPT_ID = 'tawkto-embed-script';
const FLOATING_BUTTON_SELECTOR = '[data-request-quote-floating-button="true"]';
const TAWK_NODE_SELECTOR = '[id*="tawk"], [class*="tawk"], iframe[src*="tawk.to"]';
const DEFAULT_OFFSET_PX = 24;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Returns true if an error originates from Tawk.to's hosted scripts. */
function isTawkError(reason: unknown): boolean {
    if (!reason || typeof reason !== 'object') return false;
    const {message = '', stack = ''} = reason as { message?: string; stack?: string };
    return (
        message.includes('i18next') ||
        stack.includes('embed.tawk.to') ||
        stack.includes('twk-chunk') ||
        stack.includes('twk-vendor')
    );
}

/** Reads the height of the optional floating button so Tawk sits above it. */
function getFloatingButtonOffset(): number | null {
    const button = document.querySelector<HTMLElement>(FLOATING_BUTTON_SELECTOR);
    if (!button) return null;

    const style = window.getComputedStyle(button);
    if (style.display === 'none' || style.visibility === 'hidden') return null;

    const {width, height} = button.getBoundingClientRect();
    if (!width || !height) return null;

    // `bottom-8` (32 px) + button height + 16 px breathing room
    return 32 + Math.ceil(height) + 16;
}

/** Applies a bottom offset to all fixed/sticky Tawk DOM nodes. */
function applyOffset(offsetPx: number): boolean {
    if (!offsetPx) return false;

    const nodes = Array.from(document.querySelectorAll<HTMLElement>(TAWK_NODE_SELECTOR));
    let applied = false;

    for (const node of nodes) {
        try {
            const {position} = window.getComputedStyle(node);
            if (position === 'fixed' || position === 'sticky') {
                node.style.bottom = `${offsetPx}px`;
                if (node.parentElement) node.parentElement.style.bottom = `${offsetPx}px`;
                applied = true;
            }
        } catch {
            // Cross-origin iframe — try setting the style directly anyway
            try {
                node.style.bottom = `${offsetPx}px`;
                applied = true;
            } catch {
                // ignore
            }
        }
    }

    return applied;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function TawkChat({propertyId, widgetId, offsetPx}: TawkChatProps) {
    useEffect(() => {
        if (!propertyId || !widgetId) return;

        const fallbackOffset = typeof offsetPx === 'number' ? offsetPx : DEFAULT_OFFSET_PX;
        const getDesiredOffset = () => getFloatingButtonOffset() ?? fallbackOffset;

        // -- 1. Suppress Tawk's internal console.error(true) noise -----------
        const originalConsoleError = console.error.bind(console);
        console.error = (...args: unknown[]) => {
            try {
                if (args.length === 1 && args[0] === true) {
                    const stack = new Error().stack ?? '';
                    if (stack.includes('embed.tawk.to') || stack.includes('twk-chunk-common')) {
                        return;
                    }
                }
            } catch {
                // ignore
            }
            originalConsoleError(...args);
        };

        // -- 2. Suppress Tawk's i18next unhandledRejection -------------------
        const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
            try {
                if (isTawkError(event?.reason)) event.preventDefault();
            } catch {
                // ignore
            }
        };
        window.addEventListener('unhandledrejection', handleUnhandledRejection);

        // -- 3. Inject the Tawk embed script (once) --------------------------
        window.Tawk_API = window.Tawk_API ?? {};
        window.Tawk_LoadStart = new Date();

        const alreadyLoaded =
            document.getElementById(SCRIPT_ID) ||
            document.querySelector('script[src*="embed.tawk.to"]');

        if (!alreadyLoaded) {
            const script = document.createElement('script');
            script.id = SCRIPT_ID;
            script.async = true;
            script.src = `https://embed.tawk.to/${propertyId}/${widgetId}`;
            script.charset = 'UTF-8';
            script.setAttribute('crossorigin', '*');
            document.body.appendChild(script);
        }

        // -- 4. Keep the widget offset correct --------------------------------
        let intervalId: number | undefined;
        let resizeTimer: number | undefined;
        let observer: MutationObserver | undefined;

        const tryApply = () => {
            const px = getDesiredOffset();
            if (!px) return;
            if (applyOffset(px)) return; // done immediately

            // Fall back to polling until Tawk's iframe appears in the DOM
            intervalId = window.setInterval(() => applyOffset(getDesiredOffset()), 500);

            // Also hook into Tawk's own onLoad callback
            try {
                if (window.Tawk_API) {
                    const prev = window.Tawk_API.onLoad;
                    window.Tawk_API.onLoad = () => {
                        try {
                            prev?.();
                        } catch { /* ignore */
                        }
                        applyOffset(getDesiredOffset());
                    };
                }
            } catch {
                // ignore
            }
        };

        const scheduleApply = () => {
            window.clearTimeout(resizeTimer);
            resizeTimer = window.setTimeout(tryApply, 50);
        };

        observer = new MutationObserver(scheduleApply);
        observer.observe(document.body, {childList: true, subtree: true, attributes: true});
        window.addEventListener('resize', scheduleApply);
        scheduleApply();

        // -- Cleanup ----------------------------------------------------------
        return () => {
            if (intervalId !== undefined) window.clearInterval(intervalId);
            if (resizeTimer !== undefined) window.clearTimeout(resizeTimer);
            observer?.disconnect();
            window.removeEventListener('resize', scheduleApply);
            window.removeEventListener('unhandledrejection', handleUnhandledRejection);
            console.error = originalConsoleError;
        };
    }, [propertyId, widgetId, offsetPx]);

    return null;
}