'use client';

/**
 * Futuristic theme system (audit §5).
 *
 * Replaces the old "time-of-day only" theming with a real user-controllable
 * light / dark / system theme — while preserving the brand's signature
 * behaviour: when set to "system", it still honours the time of day
 * (dark 6pm–6am) on top of the OS preference, so the site keeps its
 * day/night character but the visitor can override it and the choice sticks.
 */
import React, {createContext, useCallback, useContext, useEffect, useMemo, useState} from 'react';

export type Theme = 'light' | 'dark' | 'system';

interface ThemeCtx {
    theme: Theme;
    resolved: 'light' | 'dark';
    setTheme: (t: Theme) => void;
    toggle: () => void;
}

const Ctx = createContext<ThemeCtx | null>(null);
const STORAGE_KEY = 'grey-theme';

function computeSystem(): 'light' | 'dark' {
    if (typeof window === 'undefined') return 'light';
    const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
    const hour = new Date().getHours();
    const isNight = hour >= 18 || hour < 6;
    // Dark if the OS asks for it OR it's night — keeps the day/night identity.
    return prefersDark || isNight ? 'dark' : 'light';
}

export function ThemeProvider({children}: {children: React.ReactNode}) {
    const [theme, setThemeState] = useState<Theme>('system');
    const [resolved, setResolved] = useState<'light' | 'dark'>('light');
    // Ambient lux from AmbientLightSensor (null = unsupported/unknown).
    const [ambientLux, setAmbientLux] = useState<number | null>(null);

    // Hydrate from storage once.
    useEffect(() => {
        const saved = (localStorage.getItem(STORAGE_KEY) as Theme) || 'system';
        setThemeState(saved);
    }, []);

    // Ambient light sensor (progressive enhancement). When the device exposes
    // an AmbientLightSensor and the user is on "system", dark rooms -> dark UI,
    // bright rooms -> light UI, with smooth transitions. Manual choice always
    // wins; we never override an explicit light/dark selection.
    useEffect(() => {
        // @ts-expect-error AmbientLightSensor is experimental / not in TS libs
        if (typeof window === 'undefined' || typeof window.AmbientLightSensor === 'undefined') return;
        let sensor: any;
        try {
            // @ts-expect-error experimental constructor
            sensor = new window.AmbientLightSensor({frequency: 1});
            sensor.addEventListener('reading', () => {
                if (typeof sensor.illuminance === 'number') setAmbientLux(sensor.illuminance);
            });
            sensor.addEventListener('error', () => setAmbientLux(null));
            sensor.start();
        } catch {
            setAmbientLux(null);
        }
        return () => {
            try {
                sensor?.stop?.();
            } catch {
                /* no-op */
            }
        };
    }, []);

    // Recompute resolved theme whenever theme changes, system updates, or the
    // ambient light reading changes.
    useEffect(() => {
        const apply = () => {
            let r = theme === 'system' ? computeSystem() : theme;
            // On "system", let ambient light fine-tune: a dark room nudges to
            // dark, a bright room nudges to light. Threshold ~ typical indoor lux.
            if (theme === 'system' && ambientLux != null) {
                r = ambientLux < 30 ? 'dark' : ambientLux > 120 ? 'light' : r;
            }
            setResolved(r);
            const root = document.documentElement;
            // Smooth, GPU-friendly cross-fade between themes (added once).
            root.classList.add('grey-theme-transition');
            root.classList.toggle('dark', r === 'dark');
            root.setAttribute('data-theme', r);
            root.style.colorScheme = r;
        };
        apply();

        const mq = window.matchMedia('(prefers-color-scheme: dark)');
        mq.addEventListener('change', apply);
        const interval = setInterval(apply, 60_000); // re-check day/night each minute
        return () => {
            mq.removeEventListener('change', apply);
            clearInterval(interval);
        };
    }, [theme, ambientLux]);

    const setTheme = useCallback((t: Theme) => {
        setThemeState(t);
        localStorage.setItem(STORAGE_KEY, t);
    }, []);

    const toggle = useCallback(() => {
        setTheme(resolved === 'dark' ? 'light' : 'dark');
    }, [resolved, setTheme]);

    const value = useMemo(() => ({theme, resolved, setTheme, toggle}), [theme, resolved, setTheme, toggle]);
    return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useTheme(): ThemeCtx {
    const ctx = useContext(Ctx);
    if (!ctx) {
        // Safe fallback so legacy components that read the hook never crash
        // even if rendered outside the provider during migration.
        return {theme: 'system', resolved: 'light', setTheme: () => {}, toggle: () => {}};
    }
    return ctx;
}

/** Inline script to set the theme class before paint (prevents FOUC). */
export const themeInitScript = `
(function(){try{
  var k='grey-theme';var t=localStorage.getItem(k)||'system';
  var h=new Date().getHours();var night=h>=18||h<6;
  var sysDark=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches;
  var r=t==='system'?((sysDark||night)?'dark':'light'):t;
  var d=document.documentElement;d.classList.toggle('dark',r==='dark');
  d.setAttribute('data-theme',r);d.style.colorScheme=r;
}catch(e){}})();
`;
