'use client';

/**
 * useDeviceCapabilities — the single performance gate for all futuristic systems.
 *
 * Every heavy effect (WebGL 3D, parallax, ambient sensors) reads this first so
 * we never ship expensive work to devices that can't afford it or users who
 * opted out. Purely client-side, no network, no PII.
 */
import {useEffect, useState} from 'react';

export interface DeviceCapabilities {
    /** Resolved once on mount (SSR-safe defaults until then). */
    ready: boolean;
    /** prefers-reduced-motion: reduce */
    reducedMotion: boolean;
    /** prefers-reduced-data: reduce OR Save-Data header hint */
    saveData: boolean;
    /** Coarse pointer (touch) — used to pick lighter interaction paths. */
    touch: boolean;
    /** Viewport <= 768px. */
    mobile: boolean;
    /** Rough device memory in GB (navigator.deviceMemory), 4 if unknown. */
    deviceMemory: number;
    /** Logical CPU cores. */
    cores: number;
    /** WebGL2/WebGL available. */
    webgl: boolean;
    /** Safe to mount full 3D/WebGL hero (capable + not opted out). */
    allow3D: boolean;
    /** Safe to run continuous parallax/tilt. */
    allowParallax: boolean;
}

function detectWebGL(): boolean {
    if (typeof document === 'undefined') return false;
    try {
        const canvas = document.createElement('canvas');
        return !!(
            canvas.getContext('webgl2') ||
            canvas.getContext('webgl') ||
            canvas.getContext('experimental-webgl')
        );
    } catch {
        return false;
    }
}

const SSR_DEFAULT: DeviceCapabilities = {
    ready: false,
    reducedMotion: false,
    saveData: false,
    touch: false,
    mobile: false,
    deviceMemory: 4,
    cores: 4,
    webgl: false,
    allow3D: false,
    allowParallax: false,
};

export function useDeviceCapabilities(): DeviceCapabilities {
    const [caps, setCaps] = useState<DeviceCapabilities>(SSR_DEFAULT);

    useEffect(() => {
        const compute = () => {
            const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
            const saveData =
                (window.matchMedia?.('(prefers-reduced-data: reduce)').matches ?? false) ||
                // @ts-expect-error - non-standard but widely supported
                (navigator.connection?.saveData ?? false);
            const touch = window.matchMedia?.('(pointer: coarse)').matches ?? ('ontouchstart' in window);
            const mobile = window.innerWidth <= 768;
            // @ts-expect-error - navigator.deviceMemory is not in all TS libs
            const deviceMemory: number = navigator.deviceMemory ?? 4;
            const cores = navigator.hardwareConcurrency ?? 4;
            const webgl = detectWebGL();

            // Be conservative: only run full 3D on capable, opted-in devices.
            const capable = deviceMemory >= 4 && cores >= 4 && !saveData;
            const allow3D = webgl && capable && !reducedMotion;
            const allowParallax = !reducedMotion && !saveData;

            setCaps({
                ready: true,
                reducedMotion,
                saveData,
                touch,
                mobile,
                deviceMemory,
                cores,
                webgl,
                allow3D,
                allowParallax,
            });
        };

        compute();
        const mqs = [
            window.matchMedia('(prefers-reduced-motion: reduce)'),
            window.matchMedia('(prefers-reduced-data: reduce)'),
        ];
        mqs.forEach((m) => m.addEventListener?.('change', compute));
        window.addEventListener('resize', compute, {passive: true});
        return () => {
            mqs.forEach((m) => m.removeEventListener?.('change', compute));
            window.removeEventListener('resize', compute);
        };
    }, []);

    return caps;
}
