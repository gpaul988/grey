'use client';

import {useEffect} from 'react';
import { useIsDayTime } from './useIsDayTime';

/**
 * Timebased — lightweight adapter that exposes a stable `data-daytime` attribute
 * on <body> for legacy styles/scripts that relied on ad-hoc time checks.
 * The canonical source of truth is ThemeProvider/useIsDayTime; this component
 * simply mirrors that value to body.dataset.daytime and performs no direct
 * color manipulation (ThemeProvider handles theme classes).
 */
const Timebased = () => {
    const isDayTime = useIsDayTime();

    useEffect(() => {
        const body = document.body;
        try {
            if (isDayTime) body.dataset.daytime = 'day';
            else body.dataset.daytime = 'night';
        } catch (e) {
            /* ignore */
        }
        return () => {
            try { delete body.dataset.daytime; } catch {}
        };
    }, [isDayTime]);

    return null;
};

export default Timebased;