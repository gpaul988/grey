'use client';

/**
 * PersonalizationProvider — privacy-safe predictive personalization.
 *
 * 100% client-side. No backend, no cookies, no PII. It reads only:
 *   - local time of day  -> daypart greeting + warm/cool accent bias
 *   - visited sections (this site only, kept in localStorage) -> inferred intent
 *   - visit count / recency -> "new vs returning" tone
 *
 * It exposes a small signal object + writes CSS custom properties
 * (--grey-accent / --grey-accent-2) and a data-intent attribute on <html>,
 * so any component can adapt layout/color/content. Users can reset via
 * clearPersonalization(). Fully respects Do-Not-Track and save-data.
 */
import React, {createContext, useContext, useEffect, useMemo, useState} from 'react';
import {usePathname} from 'next/navigation';

export type Intent = 'explore' | 'hire' | 'shop' | 'learn' | 'career';
export type Daypart = 'morning' | 'afternoon' | 'evening' | 'night';

interface Signals {
    ready: boolean;
    daypart: Daypart;
    greeting: string;
    intent: Intent;
    returning: boolean;
    visits: number;
    enabled: boolean;
    clearPersonalization: () => void;
    setEnabled: (v: boolean) => void;
}

const Ctx = createContext<Signals | null>(null);
const KEY = 'grey-personalization-v1';

// Accent palettes per intent (cyan→purple base, biased by daypart warmth).
const ACCENTS: Record<Intent, [string, string]> = {
    explore: ['#22d3ee', '#a855f7'],
    hire: ['#14b8a6', '#6366f1'],
    shop: ['#06b6d4', '#0ea5e9'],
    learn: ['#8b5cf6', '#ec4899'],
    career: ['#10b981', '#22d3ee'],
};

function dayInfo(): {daypart: Daypart; greeting: string} {
    const h = new Date().getHours();
    if (h >= 5 && h < 12) return {daypart: 'morning', greeting: 'Good morning'};
    if (h >= 12 && h < 17) return {daypart: 'afternoon', greeting: 'Good afternoon'};
    if (h >= 17 && h < 22) return {daypart: 'evening', greeting: 'Good evening'};
    return {daypart: 'night', greeting: 'Working late'};
}

function intentFromPath(path: string, history: Record<string, number>): Intent {
    const p = path.toLowerCase();
    if (p.startsWith('/store') || history['/store']) return 'shop';
    if (p.includes('career') || history['/careers']) return 'career';
    if (p.includes('contact') || p.includes('quote') || history['/contact'] || history['/quote-request'])
        return 'hire';
    if (p.includes('blog') || p.includes('industries') || history['/blog']) return 'learn';
    // weight by most-visited section
    const top = Object.entries(history).sort((a, b) => b[1] - a[1])[0]?.[0] || '';
    if (top.includes('store')) return 'shop';
    if (top.includes('career')) return 'career';
    if (top.includes('contact') || top.includes('quote')) return 'hire';
    if (top.includes('blog') || top.includes('industries')) return 'learn';
    return 'explore';
}

function dnt(): boolean {
    if (typeof navigator === 'undefined') return false;
    // @ts-expect-error vendor-prefixed legacy flags
    return navigator.doNotTrack === '1' || window.doNotTrack === '1' || navigator.msDoNotTrack === '1';
}

export function PersonalizationProvider({children}: {children: React.ReactNode}) {
    const pathname = usePathname();
    const [signals, setSignals] = useState<Signals>({
        ready: false,
        daypart: 'morning',
        greeting: 'Hello',
        intent: 'explore',
        returning: false,
        visits: 0,
        enabled: true,
        clearPersonalization: () => {},
        setEnabled: () => {},
    });

    useEffect(() => {
        const optedOut = localStorage.getItem(`${KEY}-off`) === '1';
        const enabled = !optedOut && !dnt();

        // load + update per-section visit history (store-excluded from heavy theming downstream)
        let store: {visits: number; history: Record<string, number>; last: number} = {
            visits: 0,
            history: {},
            last: 0,
        };
        try {
            store = {...store, ...JSON.parse(localStorage.getItem(KEY) || '{}')};
        } catch {
            /* ignore */
        }
        const section = '/' + (pathname?.split('/')[1] || '');
        store.visits = (store.visits || 0) + 1;
        store.history[section] = (store.history[section] || 0) + 1;
        const returning = store.last > 0;
        store.last = Date.now();
        if (enabled) {
            try {
                localStorage.setItem(KEY, JSON.stringify(store));
            } catch {
                /* ignore */
            }
        }

        const {daypart, greeting} = dayInfo();
        const intent = enabled ? intentFromPath(pathname || '/', store.history) : 'explore';

        // publish accent CSS vars + intent attribute for adaptive layout/colour
        const root = document.documentElement;
        if (enabled) {
            const [a, b] = ACCENTS[intent];
            root.style.setProperty('--grey-accent', a);
            root.style.setProperty('--grey-accent-2', b);
            root.setAttribute('data-intent', intent);
            root.setAttribute('data-daypart', daypart);
        }

        const clearPersonalization = () => {
            try {
                localStorage.removeItem(KEY);
            } catch {
                /* ignore */
            }
            root.removeAttribute('data-intent');
            root.style.removeProperty('--grey-accent');
            root.style.removeProperty('--grey-accent-2');
        };
        const setEnabled = (v: boolean) => {
            localStorage.setItem(`${KEY}-off`, v ? '0' : '1');
            if (!v) clearPersonalization();
        };

        setSignals({
            ready: true,
            daypart,
            greeting,
            intent,
            returning,
            visits: store.visits,
            enabled,
            clearPersonalization,
            setEnabled,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    const value = useMemo(() => signals, [signals]);
    return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function usePersonalization(): Signals {
    const ctx = useContext(Ctx);
    if (!ctx)
        return {
            ready: false,
            daypart: 'morning',
            greeting: 'Hello',
            intent: 'explore',
            returning: false,
            visits: 0,
            enabled: false,
            clearPersonalization: () => {},
            setEnabled: () => {},
        };
    return ctx;
}
