'use client';

/**
 * AnnouncementBar — a thin, dismissible futuristic bar that sits above the header.
 * Pulls the latest active announcement from /api/announcement (schedule-aware).
 * Dismissal is remembered per-announcement for the browser session.
 */

import React, {useEffect, useState} from 'react';
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
    const [open, setOpen] = useState(false);

    useEffect(() => {
        let alive = true;
        fetch('/api/announcement')
            .then((r) => r.json())
            .then((d: {announcement: Announcement | null}) => {
                if (!alive) return;
                if (!d.announcement) return;
                // Check if this exact announcement was dismissed in THIS session
                const dismissed = sessionStorage.getItem(`grey-ann-dismissed-${d.announcement.id}`);
                if (dismissed === 'true') return;
                setAnn(d.announcement);
                setOpen(true);
            })
            .catch((err) => {
                if (process.env.NODE_ENV === 'development') {
                    console.error('[AnnouncementBar] Fetch error:', err);
                }
            });
        return () => {
            alive = false;
        };
    }, []);

    const dismiss = () => {
        if (ann) {
            sessionStorage.setItem(`grey-ann-dismissed-${ann.id}`, 'true');
        }
        setOpen(false);
    };

    if (!ann) return null;
    const cls = VARIANTS[ann.variant] || VARIANTS.gradient;

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{height: 0, opacity: 0}}
                    animate={{height: 'auto', opacity: 1}}
                    exit={{height: 0, opacity: 0}}
                    transition={{duration: 0.4, ease: [0.22, 1, 0.36, 1]}}
                    className={`relative z-[60] overflow-hidden ${cls}`}
                >
                    {/* subtle moving sheen */}
                    <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 opacity-30"
                        style={{
                            background:
                                'linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.25) 50%, transparent 70%)',
                            backgroundSize: '200% 100%',
                            animation: 'grey-ann-sheen 6s linear infinite',
                        }}
                    />
                    <div className="relative mx-auto flex max-w-7xl items-center justify-center gap-3 px-4 py-2 text-center text-[0.82rem] font-medium tracking-wide">
                        <span className="inline-flex h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-current" />
                        <span className="truncate sm:whitespace-normal">{ann.message}</span>
                        {ann.link_url && (
                            <a
                                href={ann.link_url}
                                className="shrink-0 underline decoration-current/40 underline-offset-2 hover:decoration-current"
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
                                className="h-3.5 w-3.5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <style>{`@keyframes grey-ann-sheen{0%{background-position:200% 0}100%{background-position:-200% 0}}`}</style>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
