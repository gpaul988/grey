'use client';

import {useTheme} from './ThemeProvider';

/**
 * Single source of truth for "day" (light) vs "night" (dark) appearance.
 *
 * Previously every screen/component independently computed this from the
 * device clock (`new Date().getHours()`) plus a 60s interval, which meant the
 * manual ThemeToggle button had no effect on page content. Now this is driven
 * entirely by the global ThemeProvider so the toggle controls the whole site.
 *
 * `true`  -> light theme (formerly "day")
 * `false` -> dark theme  (formerly "night")
 */
export function useIsDayTime(): boolean {
    return useTheme().resolved === 'light';
}
