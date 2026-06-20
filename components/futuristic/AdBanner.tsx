'use client';

/**
 * AdBanner — a futuristic promotional banner for the marketing site.
 * Fetches active ads for a given placement from /api/ads (impression tracked
 * server-side). Click-through goes via /api/ads?click=<id> for click tracking.
 *
 * Social share uses share-intent URLs only (no API keys). Instagram has no web
 * share intent, so we copy the caption and open the Grey profile.
 *
 * Variants: gradient (neon panel) | image (cover image) | minimal (slim strip).
 */

import React, {useEffect, useState} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import {
    FaFacebookF,
    FaXTwitter,
    FaLinkedinIn,
    FaWhatsapp,
    FaTelegram,
    FaInstagram,
} from 'react-icons/fa6';

type Ad = {
    id: number;
    title: string;
    body: string;
    image: string;
    link_url: string;
    cta_label: string;
    placement: string;
    variant: string;
    share_caption: string;
};

const SITE = 'https://www.greyinfotech.com.ng';

function shareLinks(caption: string, link: string) {
    const c = encodeURIComponent(caption);
    const l = encodeURIComponent(link || SITE);
    const full = encodeURIComponent(caption + (link ? ' ' + link : ''));
    return [
        {n: 'Facebook', color: '#1877f2', Icon: FaFacebookF, u: `https://www.facebook.com/sharer/sharer.php?u=${l}&quote=${c}`},
        {n: 'X', color: '#000000', Icon: FaXTwitter, u: `https://twitter.com/intent/tweet?text=${c}&url=${l}`},
        {n: 'LinkedIn', color: '#0a66c2', Icon: FaLinkedinIn, u: `https://www.linkedin.com/sharing/share-offsite/?url=${l}`},
        {n: 'WhatsApp', color: '#25d366', Icon: FaWhatsapp, u: `https://wa.me/?text=${full}`},
        {n: 'Telegram', color: '#229ed9', Icon: FaTelegram, u: `https://t.me/share/url?url=${l}&text=${c}`},
        {n: 'Instagram', color: '#e1306c', Icon: FaInstagram, u: 'https://www.instagram.com/greyinfotechltd/'},
    ];
}

export default function AdBanner({placement = 'home_banner'}: {placement?: string}) {
    const [ad, setAd] = useState<Ad | null>(null);
    const [shareOpen, setShareOpen] = useState(false);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        let alive = true;
        const url = `/api/ads?placement=${encodeURIComponent(placement)}`;
        fetch(url)
            .then((r) => r.json())
            .then((d: {ads: Ad[]}) => {
                if (alive && d.ads && d.ads.length) {
                    setAd(d.ads[0]);
                }
            })
            .catch((err) => {
                if (process.env.NODE_ENV === 'development') {
                    console.error('[AdBanner] Fetch error:', err);
                }
            });
        return () => {
            alive = false;
        };
    }, [placement]);

    if (!ad) return null;

    const caption = ad.share_caption || ad.title;
    const shareTarget = ad.link_url && /^https?:/.test(ad.link_url) ? ad.link_url : SITE;
    const clickHref = `/api/ads?click=${ad.id}`;

    const onShareClick = (e: React.MouseEvent<HTMLAnchorElement>, name: string) => {
        if (name === 'Instagram') {
            navigator.clipboard?.writeText(`${caption} ${shareTarget}`).catch(() => {});
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
        }
        // track share intent (best-effort)
        fetch('/api/track', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({type: 'click', path: `/share/${name.toLowerCase()}`, label: `ad-${ad.id}`}),
            keepalive: true,
        }).catch(() => {});
        void e;
    };

    const isImage = ad.variant === 'image' && ad.image;
    const isMinimal = ad.variant === 'minimal';

    return (
        <section className="relative mx-auto my-10 w-full max-w-6xl px-4">
            <motion.div
                initial={{opacity: 0, y: 24}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true, margin: '-80px'}}
                transition={{duration: 0.6, ease: [0.22, 1, 0.36, 1]}}
                className={`group relative overflow-hidden rounded-2xl border border-cyan-400/20 ${
                    isMinimal ? 'p-5' : 'p-7 sm:p-10'
                }`}
                style={
                    isImage
                        ? {
                              backgroundImage: `linear-gradient(90deg, rgba(4,8,20,0.92), rgba(4,8,20,0.55)), url(${ad.image})`,
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                          }
                        : {
                              background:
                                  'linear-gradient(120deg, rgba(13,148,136,0.18), rgba(8,145,178,0.14) 45%, rgba(79,70,229,0.20))',
                          }
                }
            >
                {/* neon grid / glow accents */}
                <div
                    aria-hidden
                    className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full blur-3xl"
                    style={{background: 'radial-gradient(circle, rgba(34,211,238,0.35), transparent 70%)'}}
                />
                <div
                    aria-hidden
                    className="pointer-events-none absolute -bottom-24 -left-16 h-56 w-56 rounded-full blur-3xl"
                    style={{background: 'radial-gradient(circle, rgba(129,140,248,0.30), transparent 70%)'}}
                />

                <div className={`relative flex flex-col gap-5 ${isMinimal ? 'sm:flex-row sm:items-center sm:justify-between' : 'lg:flex-row lg:items-center lg:justify-between'}`}>
                    <div className="max-w-2xl">
                        <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-[0.7rem] font-medium uppercase tracking-wider text-cyan-200">
                            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-300" />
                            Featured
                        </span>
                        <h3 className={`font-bold text-white ${isMinimal ? 'text-lg' : 'text-2xl sm:text-3xl'}`}>
                            {ad.title}
                        </h3>
                        {ad.body && !isMinimal && (
                            <p className="mt-2 text-[0.95rem] leading-relaxed text-gray-300">{ad.body}</p>
                        )}
                    </div>

                    <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                        <a
                            href={clickHref}
                            target={/^https?:/.test(ad.link_url) ? '_blank' : '_self'}
                            rel="noopener"
                            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-gradient-to-r from-teal-500 via-cyan-500 to-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:shadow-cyan-400/40"
                        >
                            {ad.cta_label || 'Learn more'}
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </a>

                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={() => setShareOpen((s) => !s)}
                                aria-label="Share"
                                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-cyan-400/30 bg-white/5 text-cyan-100 backdrop-blur-sm transition hover:bg-cyan-400/10"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5" width={18} height={18} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.7 10.7l6.6-3.4M8.7 13.3l6.6 3.4M18 8a3 3 0 10-6 0 3 3 0 006 0zM9 12a3 3 0 11-6 0 3 3 0 016 0zm9 4a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </button>

                            <AnimatePresence>
                                {shareOpen && (
                                    <motion.div
                                        initial={{opacity: 0, scale: 0.85, x: -8}}
                                        animate={{opacity: 1, scale: 1, x: 0}}
                                        exit={{opacity: 0, scale: 0.85, x: -8}}
                                        transition={{duration: 0.18}}
                                        className="flex items-center gap-1.5"
                                    >
                                        {shareLinks(caption, shareTarget).map(({n, color, Icon, u}) => (
                                            <a
                                                key={n}
                                                href={u}
                                                target="_blank"
                                                rel="noopener"
                                                title={n === 'Instagram' ? 'Copy caption & open Instagram' : `Share on ${n}`}
                                                onClick={(e) => onShareClick(e, n)}
                                                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-white transition hover:scale-110"
                                                style={{background: color}}
                                            >
                                                <Icon size={15} />
                                            </a>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                <AnimatePresence>
                    {copied && (
                        <motion.div
                            initial={{opacity: 0, y: 6}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0, y: 6}}
                            className="absolute bottom-3 right-4 rounded-full bg-cyan-500/90 px-3 py-1 text-xs font-medium text-[#031018]"
                        >
                            Caption copied — paste it on Instagram
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </section>
    );
}
