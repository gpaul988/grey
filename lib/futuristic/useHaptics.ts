'use client';

/**
 * useHaptics — subtle physics/haptic cues.
 *
 * Wraps the Vibration API (navigator.vibrate) with named patterns and a
 * global "respect reduced-motion" guard. No-ops gracefully on unsupported
 * devices (most desktops, iOS Safari) — callers never need to feature-check.
 */
import {useCallback} from 'react';

export type HapticPattern = 'tap' | 'soft' | 'success' | 'warning' | 'select';

const PATTERNS: Record<HapticPattern, number | number[]> = {
    tap: 8,
    soft: 12,
    select: [6, 10, 6],
    success: [10, 30, 10],
    warning: [20, 40, 20],
};

export function useHaptics() {
    const vibrate = useCallback((pattern: HapticPattern = 'tap') => {
        if (typeof navigator === 'undefined' || typeof navigator.vibrate !== 'function') return;
        try {
            const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
            if (reduced) return;
            navigator.vibrate(PATTERNS[pattern]);
        } catch {
            /* no-op */
        }
    }, []);

    return {vibrate};
}
