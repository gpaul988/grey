'use client';

/**
 * AdBanner — a futuristic promotional banner with full image support.
 * Features: image backgrounds, gradient overlays, bright animations, no errors.
 */

import React, {useEffect, useState} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import Image from 'next/image';
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
const GRADIENTS = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
];

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
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
        let alive = true;
        const url = `/api/ads?placement=${encodeURIComponent(placement)}`;
        fetch(url)
            .then((r) => r.json())
            .then((d: {ads: Ad[]}) => {
                if (alive && d.ads && d.ads.length) {
                    setAd(d.ads[0]);
                    setImageError(false);
                    setImageLoaded(false);
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
    const hasImage = ad.image && !imageError;
    const randomGradient = GRADIENTS[ad.id % GRADIENTS.length];

    const onShareClick = (e: React.MouseEvent<HTMLAnchorElement>, name: string) => {
        if (name === 'Instagram') {
            navigator.clipboard?.writeText(`${caption} ${shareTarget}`).catch(() => {});
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
        }
        fetch('/api/track', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({type: 'click', path: `/share/${name.toLowerCase()}`, label: `ad-${ad.id}`}),
            keepalive: true,
        }).catch(() => {});
        void e;
    };

    const isMinimal = ad.variant === 'minimal';

    return (
        <section className="relative mx-auto my-10 w-full max-w-6xl px-4">
            <motion.div
                initial={{opacity: 0, y: 24}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true, margin: '-80px'}}
                transition={{duration: 0.6, ease: [0.22, 1, 0.36, 1]}}
                className={`group relative overflow-hidden rounded-2xl border border-cyan-400/20 shadow-2xl ${
                    isMinimal ? 'p-5' : 'p-7 sm:p-10'
                }`}
                style={{
                    backgroundImage: hasImage ? `linear-gradient(90deg, rgba(4,8,20,0.85), rgba(4,8,20,0.45)), url(${ad.image})` : randomGradient,
                    backgroundSize: hasImage ? 'cover' : undefined,
                    backgroundPosition: hasImage ? 'center' : undefined,
                }}
            >
                {/* Bright neon glow accents */}
                <div
                    aria-hidden
                    className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full blur-3xl opacity-40"
                    style={{background: 'radial-gradient(circle, rgba(34,211,238,0.6), transparent 70%)'}}
                />
                <div
                    aria-hidden
                    className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full blur-3xl opacity-40"
                    style={{background: 'radial-gradient(circle, rgba(129,140,248,0.5), transparent 70%)'}}
                />

                {/* Animated shimmer effect */}
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-20"
                    style={{
                        background: 'linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)',
                        backgroundSize: '200% 100%',
                        animation: 'shimmer 8s linear infinite',
                    }}
                />

                <div className={`relative flex flex-col gap-5 ${isMinimal ? 'sm:flex-row sm:items-center sm:justify-between' : 'lg:flex-row lg:items-center lg:justify-between'}`}>
                    <div className="max-w-2xl">
                        <motion.span
                            initial={{scale: 0.8, opacity: 0}}
                            animate={{scale: 1, opacity: 1}}
                            transition={{delay: 0.1}}
                            className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-300/50 bg-cyan-500/20 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-widest text-cyan-100 shadow-lg shadow-cyan-500/30"
                        >
                            <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-300" />
                            Featured
                        </motion.span>
                        <motion.h3
                            initial={{y: 10, opacity: 0}}
                            animate={{y: 0, opacity: 1}}
                            transition={{delay: 0.15}}
                            className={`font-bold text-white ${isMinimal ? 'text-lg' : 'text-2xl sm:text-3xl'} drop-shadow-lg`}
                        >
                            {ad.title}
                        </motion.h3>
                        {ad.body && !isMinimal && (
                            <motion.p
                                initial={{y: 10, opacity: 0}}
                                animate={{y: 0, opacity: 1}}
                                transition={{delay: 0.2}}
                                className="mt-2 text-[0.95rem] leading-relaxed text-gray-100 drop-shadow"
                            >
                                {ad.body}
                            </motion.p>
                        )}
                    </div>

                    <motion.div
                        initial={{scale: 0.9, opacity: 0}}
                        animate={{scale: 1, opacity: 1}}
                        transition={{delay: 0.25}}
                        className="flex flex-col items-start gap-4 sm:flex-row sm:items-center"
                    >
                        <a
                            href={clickHref}
                            target={/^https?:/.test(ad.link_url) ? '_blank' : '_self'}
                            rel="noopener"
                            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 via-teal-500 to-cyan-400 px-7 py-3 text-sm font-bold text-white shadow-xl shadow-cyan-500/50 transition-all hover:shadow-cyan-400/80 hover:scale-105 active:scale-95"
                        >
                            {ad.cta_label || 'Learn more'}
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </a>

                        <motion.button
                            whileHover={{scale: 1.1}}
                            whileTap={{scale: 0.95}}
                            type="button"
                            onClick={() => setShareOpen((s) => !s)}
                            aria-label="Share"
                            className="inline-flex h-11 w-11 items-center justify-center rounded-full border-2 border-cyan-300/50 bg-white/10 text-cyan-100 backdrop-blur-md transition hover:bg-cyan-400/20 shadow-lg"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" width={18} height={18} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.7 10.7l6.6-3.4M8.7 13.3l6.6 3.4M18 8a3 3 0 10-6 0 3 3 0 006 0zM9 12a3 3 0 11-6 0 3 3 0 016 0zm9 4a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </motion.button>

                        <AnimatePresence>
                            {shareOpen && (
                                <motion.div
                                    initial={{opacity: 0, scale: 0.85, x: -8}}
                                    animate={{opacity: 1, scale: 1, x: 0}}
                                    exit={{opacity: 0, scale: 0.85, x: -8}}
                                    transition={{duration: 0.18}}
                                    className="flex items-center gap-2"
                                >
                                    {shareLinks(caption, shareTarget).map(({n, color, Icon, u}) => (
                                        <motion.a
                                            key={n}
                                            whileHover={{scale: 1.15, rotate: 5}}
                                            whileTap={{scale: 0.9}}
                                            href={u}
                                            target="_blank"
                                            rel="noopener"
                                            title={n === 'Instagram' ? 'Copy caption & open Instagram' : `Share on ${n}`}
                                            onClick={(e) => onShareClick(e, n)}
                                            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white transition shadow-lg hover:shadow-xl"
                                            style={{background: color}}
                                        >
                                            <Icon size={16} />
                                        </motion.a>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>

                <AnimatePresence>
                    {copied && (
                        <motion.div
                            initial={{opacity: 0, y: 6}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0, y: 6}}
                            className="absolute bottom-4 right-4 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-400 px-4 py-2 text-xs font-bold text-[#031018] shadow-lg"
                        >
                            ✓ Caption copied — paste it on Instagram
                        </motion.div>
                    )}
                </AnimatePresence>

                <style>{`
                    @keyframes shimmer {
                        0% { background-position: 200% 0; }
                        100% { background-position: -200% 0; }
                    }
                `}</style>
            </motion.div>
        </section>
    );
}
