'use client';

/**
 * Single source of truth for "is the UI currently in its LIGHT (daytime) look".
 *
 * Historically every screen recomputed day/night from `new Date().getHours()`
 * on its own interval, so the manual ThemeToggle button had no effect on page
 * content. This hook makes `isDayTime` follow the global ThemeProvider instead:
 * `resolved === 'light'` (which the toggle/system/ambient logic controls).
 *
 * `isDayTime === true`  -> light theme (white backgrounds, dark text)
 * `isDayTime === false` -> dark theme  (black backgrounds, light text)
 */
import {useTheme} from './ThemeProvider';

export function useIsDayTime(): boolean {
    return useTheme().resolved === 'light';
}
