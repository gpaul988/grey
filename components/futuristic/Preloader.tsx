'use client';

/**
 * Preloader — an extremely futuristic, first-load-only boot sequence.
 *
 * Shows ONCE per browser session (sessionStorage gate). Renders a fullscreen
 * neon "system boot" with an animated holographic logo ring, a scanning grid,
 * progress that eases to 100%, and a smooth iris-out reveal of the site.
 *
 * Pure CSS + framer-motion. No layout shift — it sits above everything and
 * unmounts cleanly. Respects prefers-reduced-motion.
 */
import React, {useEffect, useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';

const SESSION_KEY = 'grey-preloaded';

const BOOT_LINES = [
    'Initializing GreyOS kernel…',
    'Linking neural interface…',
    'Calibrating quantum mesh…',
    'Loading experience…',
];

export default function Preloader() {
    const [show, setShow] = useState(false);
    const [progress, setProgress] = useState(0);
    const [line, setLine] = useState(0);

    useEffect(() => {
        // Only run on the very first load of a session.
        let already = false;
        try {
            already = sessionStorage.getItem(SESSION_KEY) === '1';
        } catch {
            /* storage blocked — show once anyway */
        }
        if (already) return;

        setShow(true);
        // lock scroll while booting
        const prevOverflow = document.documentElement.style.overflow;
        document.documentElement.style.overflow = 'hidden';

        const reduce =
            typeof window !== 'undefined' &&
            window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

        const total = reduce ? 600 : 2200;
        const start = performance.now();
        let raf = 0;

        const tick = (now: number) => {
            const t = Math.min(1, (now - start) / total);
            // easeOutExpo for a snappy, premium fill
            const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
            setProgress(Math.round(eased * 100));
            setLine(Math.min(BOOT_LINES.length - 1, Math.floor(eased * BOOT_LINES.length)));
            if (t < 1) {
                raf = requestAnimationFrame(tick);
            } else {
                try {
                    sessionStorage.setItem(SESSION_KEY, '1');
                } catch {
                    /* ignore */
                }
                // small beat at 100% then iris-out
                setTimeout(() => {
                    document.documentElement.style.overflow = prevOverflow;
                    setShow(false);
                }, reduce ? 80 : 420);
            }
        };
        raf = requestAnimationFrame(tick);

        return () => {
            cancelAnimationFrame(raf);
            document.documentElement.style.overflow = prevOverflow;
        };
    }, []);

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    key="grey-preloader"
                    initial={{opacity: 1}}
                    exit={{opacity: 0, clipPath: 'circle(0% at 50% 50%)'}}
                    transition={{duration: 0.7, ease: [0.65, 0, 0.35, 1]}}
                    className="grey-preloader"
                    aria-hidden="true"
                >
                    {/* layered backdrops */}
                    <div className="grey-pl-grid" />
                    <div className="grey-pl-scan" />
                    <div className="grey-pl-vignette" />

                    {/* core */}
                    <div className="grey-pl-core">
                        {/* holographic logo ring */}
                        <div className="grey-pl-ring">
                            <span className="grey-pl-ring-arc grey-pl-arc-1" />
                            <span className="grey-pl-ring-arc grey-pl-arc-2" />
                            <span className="grey-pl-ring-arc grey-pl-arc-3" />
                            <div className="grey-pl-orb">
                                <span className="grey-pl-mono">G</span>
                            </div>
                        </div>

                        <div className="grey-pl-wordmark">
                            GREY<span>INFOTECH</span>
                        </div>

                        {/* progress */}
                        <div className="grey-pl-bar">
                            <div className="grey-pl-bar-fill" style={{width: `${progress}%`}} />
                        </div>
                        <div className="grey-pl-meta">
                            <span className="grey-pl-line">{BOOT_LINES[line]}</span>
                            <span className="grey-pl-pct">{progress}%</span>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
