'use client';

import React, {useEffect, useState, useRef} from 'react';
import {AnimatePresence, motion} from 'framer-motion';

type Announcement = {
    id: number;
    message: string;
    link_url: string;
    link_label: string;
    variant: string;
};

const VARIANTS: Record<string, string> = {
    gradient: 'bg-gradient-to-r from-teal-600 via-cyan-600 to-indigo-600 text-white',
    dark: 'bg-[#0a0e1a] text-cyan-100 border-b border-cyan-400/20',
    solid: 'bg-cyan-500 text-[#031018]',
};

export default function AnnouncementBar() {
    const [ann, setAnn] = useState<Announcement | null>(null);
    const [visible, setVisible] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let alive = true;
        const dismissed = sessionStorage.getItem('grey-ann-dismissed');
        if (dismissed === 'true') return;

        const fetchAnnouncement = async () => {
            try {
                const response = await fetch('/api/announcement', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                    cache: 'no-cache',
                });
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json() as { announcement: Announcement | null };
                
                if (alive && data.announcement) {
                    setAnn(data.announcement);
                    setVisible(true);
                }
            } catch (err) {
                // Silently fail - announcements are optional
                if (process.env.NODE_ENV === 'development') {
                    console.warn('[AnnouncementBar] Failed to fetch announcement:', err);
                }
            }
        };

        fetchAnnouncement();

        return () => {
            alive = false;
        };
    }, []);

    useEffect(() => {
        if (!containerRef.current) return;

        const updateHeight = () => {
            const height = containerRef.current?.offsetHeight || 0;
            document.documentElement.style.setProperty('--ann-bar-height', `${height}px`);
        };

        updateHeight();
        const resizeObserver = new ResizeObserver(updateHeight);
        resizeObserver.observe(containerRef.current);
        return () => resizeObserver.disconnect();
    }, [visible]);

    const dismiss = () => {
        setVisible(false);
        sessionStorage.setItem('grey-ann-dismissed', 'true');
        document.documentElement.style.setProperty('--ann-bar-height', '0px');
    };

    if (!ann || !visible) return null;

    const cls = VARIANTS[ann.variant] || VARIANTS.gradient;

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    ref={containerRef}
                    initial={{height: 0, opacity: 0}}
                    animate={{height: 'auto', opacity: 1}}
                    exit={{height: 0, opacity: 0}}
                    transition={{duration: 0.3, ease: 'easeInOut'}}
                    className={`fixed top-0 left-0 right-0 z-[75] w-full overflow-hidden ${cls}`}
                >
                    <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 opacity-30"
                        style={{
                            background: 'linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.25) 50%, transparent 70%)',
                            backgroundSize: '200% 100%',
                            animation: 'grey-ann-sheen 6s linear infinite',
                        }}
                    />

                    <div
                        className="relative mx-auto flex max-w-full items-center justify-center gap-3 px-4 py-3 text-center text-sm font-medium tracking-wide">
                        <span className="inline-flex h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-current"/>
                        <span className="truncate sm:whitespace-normal">{ann.message}</span>
                        {ann.link_url && (
                            <a
                                href={ann.link_url}
                                className="shrink-0 underline decoration-current/40 underline-offset-2 hover:decoration-current transition"
                            >
                                {ann.link_label || 'Learn more'} →
                            </a>
                        )}
                        <button
                            type="button"
                            onClick={dismiss}
                            aria-label="Dismiss announcement"
                            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 opacity-70 transition hover:opacity-100"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                                      d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </button>
                    </div>

                    <style>{`@keyframes grey-ann-sheen{0%{background-position:200% 0}100%{background-position:-200% 0}}`}</style>
                </motion.div>
            )}
        </AnimatePresence>
    );
}