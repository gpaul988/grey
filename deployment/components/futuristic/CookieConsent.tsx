'use client';

/**
 * CookieConsent  - a GDPR-style, extremely futuristic consent manager.
 *
 * Modes: Accept all / Reject all / Customize (granular categories).
 * Persists the choice in localStorage and exposes it on `window.__greyConsent`
 * plus a `grey:consent` CustomEvent so analytics/marketing scripts can gate
 * themselves. Necessary cookies are always on (locked).
 */
import React, {useEffect, useMemo, useState, useRef, useLayoutEffect} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import {ShieldCheck, Cookie, SlidersHorizontal, Check, X} from 'lucide-react';

const STORAGE_KEY = 'grey-cookie-consent-v1';

export type ConsentCategories = {
    necessary: true;
    analytics: boolean;
    marketing: boolean;
    preferences: boolean;
};

type StoredConsent = {categories: ConsentCategories; ts: number};

const CATEGORY_META: {
    key: keyof ConsentCategories;
    title: string;
    desc: string;
    locked?: boolean;
}[] = [
    {
        key: 'necessary',
        title: 'Strictly Necessary',
        desc: 'Required for core functionality, security and session integrity. Always active.',
        locked: true,
    },
    {
        key: 'analytics',
        title: 'Analytics & Performance',
        desc: 'Anonymous insights that help us measure and improve the experience.',
    },
    {
        key: 'marketing',
        title: 'Marketing',
        desc: 'Used to deliver relevant content and measure campaign effectiveness.',
    },
    {
        key: 'preferences',
        title: 'Preferences',
        desc: 'Remembers choices like theme and region for a tailored experience.',
    },
];

function publish(consent: ConsentCategories) {
    try {
        (window as unknown as {__greyConsent?: ConsentCategories}).__greyConsent = consent;
        window.dispatchEvent(new CustomEvent('grey:consent', {detail: consent}));
    } catch {
        /* ignore */
    }
}

export default function CookieConsent() {
    const [open, setOpen] = useState(false);
    const [customizing, setCustomizing] = useState(false);
    const [cats, setCats] = useState<ConsentCategories>({
        necessary: true,
        analytics: true,
        marketing: false,
        preferences: true,
    });

    useEffect(() => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) {
                const parsed = JSON.parse(raw) as StoredConsent;
                publish(parsed.categories);
                return; // already decided  - stay hidden
            }
        } catch {
            /* ignore */
        }
        // Delay slightly so it doesn't collide with the preloader iris-out
        const t = setTimeout(() => setOpen(true), 900);
        return () => clearTimeout(t);
    }, []);

    const save = (next: ConsentCategories) => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({categories: next, ts: Date.now()}));
        } catch {
            /* ignore */
        }
        publish(next);
        setOpen(false);
    };

    const acceptAll = () =>
        save({necessary: true, analytics: true, marketing: true, preferences: true});
    const rejectAll = () =>
        save({necessary: true, analytics: false, marketing: false, preferences: false});
    const saveCustom = () => save(cats);

    const toggle = (key: keyof ConsentCategories) => {
        if (key === 'necessary') return;
        setCats((c) => ({...c, [key]: !c[key]}));
    };

    const backdrop = useMemo(() => customizing, [customizing]);

    // Panel positioning: keep the cookie dialog above the footer so it doesn't obscure it.
    const panelRef = useRef<HTMLDivElement | null>(null);
    const [panelBottom, setPanelBottom] = useState<string>('22px');

    useLayoutEffect(() => {
        if (!open) return;
        const calc = () => {
            try {
                const footer = document.querySelector('footer');
                if (!footer) {
                    setPanelBottom('22px');
                    return;
                }
                const rect = footer.getBoundingClientRect();
                // place the panel above the footer with a small gap
                const gap = 16; // px
                const bottomPx = Math.max(22, rect.height + gap);
                setPanelBottom(`${bottomPx}px`);
            } catch (e) {
                setPanelBottom('22px');
            }
        };
        calc();
        window.addEventListener('resize', calc);
        return () => window.removeEventListener('resize', calc);
    }, [open]);

    return (
        <AnimatePresence>
            {open && (
                <>
                    {backdrop && (
                        <motion.div
                            className="grey-cc-backdrop"
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            exit={{opacity: 0}}
                            onClick={() => setCustomizing(false)}
                        />
                    )}

                    <motion.div
                        ref={panelRef}
                        role="dialog"
                        aria-label="Cookie consent"
                        aria-live="polite"
                        className={`grey-cc ${customizing ? 'is-panel' : ''}`}
                        style={{bottom: panelBottom}}
                        initial={{opacity: 0, y: 40, scale: 0.98}}
                        animate={{opacity: 1, y: 0, scale: 1}}
                        exit={{opacity: 0, y: 40, scale: 0.98}}
                        transition={{type: 'spring', stiffness: 280, damping: 26}}
                    >
                        {/* animated neon edge */}
                        <span className="grey-cc-edge" aria-hidden="true" />

                        <div className="grey-cc-head">
                            <span className="grey-cc-icon">
                                <Cookie size={18} />
                            </span>
                            <div>
                                <p className="grey-cc-title">
                                    {customizing ? 'Privacy Preferences' : 'We value your privacy'}
                                </p>
                                <p className="grey-cc-sub">
                                    {customizing
                                        ? 'Choose which cookies we may use. You can change this anytime.'
                                        : 'We use cookies to power core features, analyze traffic and personalize content. Manage your choices below.'}
                                </p>
                            </div>
                        </div>

                        <AnimatePresence initial={false} mode="wait">
                            {customizing && (
                                <motion.div
                                    key="cats"
                                    initial={{opacity: 0, height: 0}}
                                    animate={{opacity: 1, height: 'auto'}}
                                    exit={{opacity: 0, height: 0}}
                                    className="grey-cc-cats"
                                >
                                    {CATEGORY_META.map((m) => {
                                        const on = cats[m.key];
                                        return (
                                            <div key={m.key} className="grey-cc-cat">
                                                <div className="grey-cc-cat-text">
                                                    <p className="grey-cc-cat-title">
                                                        {m.title}
                                                        {m.locked && (
                                                            <span className="grey-cc-lock">
                                                                <ShieldCheck size={12} /> Always on
                                                            </span>
                                                        )}
                                                    </p>
                                                    <p className="grey-cc-cat-desc">{m.desc}</p>
                                                </div>
                                                <button
                                                    type="button"
                                                    role="switch"
                                                    aria-checked={on}
                                                    aria-label={m.title}
                                                    disabled={m.locked}
                                                    onClick={() => toggle(m.key)}
                                                    className={`grey-cc-switch ${on ? 'is-on' : ''} ${
                                                        m.locked ? 'is-locked' : ''
                                                    }`}
                                                >
                                                    <span className="grey-cc-knob">
                                                        {on ? <Check size={11} /> : <X size={11} />}
                                                    </span>
                                                </button>
                                            </div>
                                        );
                                    })}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="grey-cc-actions">
                            {!customizing ? (
                                <>
                                    <button className="grey-cc-btn ghost" onClick={() => setCustomizing(true)}>
                                        <SlidersHorizontal size={15} /> Customize
                                    </button>
                                    <button className="grey-cc-btn outline" onClick={rejectAll}>
                                        Reject all
                                    </button>
                                    <button className="grey-cc-btn solid" onClick={acceptAll}>
                                        Accept all
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button className="grey-cc-btn ghost" onClick={() => setCustomizing(false)}>
                                        Back
                                    </button>
                                    <button className="grey-cc-btn outline" onClick={rejectAll}>
                                        Reject all
                                    </button>
                                    <button className="grey-cc-btn solid" onClick={saveCustom}>
                                        Save preferences
                                    </button>
                                </>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
