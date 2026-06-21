'use client';

/**
 * AdBanner — Ultra-futuristic, high-impact promotional banner
 * Features: 3D effects, neon glows, particle effects, dramatic animations
 * Now with automatic ad rotation every 6 seconds
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
    const [ads, setAds] = useState<Ad[]>([]);
    const [currentIdx, setCurrentIdx] = useState(0);
    const [shareOpen, setShareOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const [loading, setLoading] = useState(true);

    // Fetch ads from API
    useEffect(() => {
        let alive = true;
        const url = `/api/ads?placement=${encodeURIComponent(placement)}`;
        fetch(url)
            .then((r) => r.json())
            .then((d: {ads: Ad[]}) => {
                if (alive && d.ads && Array.isArray(d.ads) && d.ads.length) {
                    setAds(d.ads);
                    setCurrentIdx(0);
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error('[AdBanner] Fetch error:', err);
                setLoading(false);
            });
        return () => {
            alive = false;
        };
    }, [placement]);

    // Auto-rotate ads every 6 seconds
    useEffect(() => {
        if (ads.length <= 1 || loading) return;
        
        const timer = setInterval(() => {
            setCurrentIdx((prev) => (prev + 1) % ads.length);
        }, 6000);
        
        return () => clearInterval(timer);
    }, [ads.length, loading]);

    if (loading || !ads.length) return null;

    const ad = ads[currentIdx];
    const caption = ad.share_caption || ad.title;
    const shareTarget = ad.link_url && /^https?:/.test(ad.link_url) ? ad.link_url : SITE;
    const clickHref = `/api/ads?click=${ad.id}`;

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

    return (
        <section className="relative mx-auto my-12 w-full max-w-7xl px-4">
            <AnimatePresence mode="wait">
                <motion.div
                    key={ad.id}
                    initial={{opacity: 0, y: 40, scale: 0.95}}
                    animate={{opacity: 1, y: 0, scale: 1}}
                    exit={{opacity: 0, y: 40, scale: 0.95}}
                    transition={{duration: 0.6, ease: [0.22, 1, 0.36, 1]}}
                    className="group relative overflow-hidden rounded-3xl shadow-2xl"
                    style={{perspective: '1000px'}}
                >
                    {/* Background with image */}
                    {ad.image && (
                        <img
                            src={ad.image}
                            alt={ad.title}
                            className="absolute inset-0 z-0 h-full w-full object-cover"
                            loading="lazy"
                        />
                    )}
                    
                    {/* Overlay gradient */}
                    <div
                        className="absolute inset-0 z-0"
                        style={{
                            background: ad.image
                                ? 'linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(10,20,40,0.4) 100%)'
                                : 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                        }}
                    />

                    {/* Neon glow layers (3 colors: cyan, magenta, purple) */}
                    <div className="absolute inset-0 z-0">
                        {/* Cyan glow - top right */}
                        <div
                            className="pointer-events-none absolute -right-40 -top-40 h-80 w-80 rounded-full blur-[100px] opacity-60"
                            style={{background: 'radial-gradient(circle, rgba(0,255,255,0.4), transparent 70%)'}}
                        />
                        {/* Magenta glow - bottom left */}
                        <div
                            className="pointer-events-none absolute -bottom-40 -left-40 h-80 w-80 rounded-full blur-[100px] opacity-50"
                            style={{background: 'radial-gradient(circle, rgba(255,0,127,0.3), transparent 70%)'}}
                        />
                        {/* Purple glow - center */}
                        <div
                            className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px] opacity-40"
                            style={{background: 'radial-gradient(circle, rgba(139,92,246,0.3), transparent 70%)'}}
                        />
                    </div>

                    {/* Animated neon border */}
                    <div className="absolute inset-0 z-0 rounded-3xl border-2 border-transparent bg-clip-padding p-[2px]"
                        style={{
                            background: 'linear-gradient(135deg, rgba(0,255,255,0.8), rgba(255,0,127,0.6), rgba(139,92,246,0.6))',
                            opacity: 0.8,
                        }}
                    />
                    <div className="absolute inset-0 z-0 rounded-3xl"
                        style={{background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'}}
                    />

                    {/* Animated grid background */}
                    <div className="absolute inset-0 z-0 opacity-20"
                        style={{
                            backgroundImage: `
                                linear-gradient(0deg, transparent 24%, rgba(0, 255, 255, 0.1) 25%, rgba(0, 255, 255, 0.1) 26%, transparent 27%, transparent 74%, rgba(0, 255, 255, 0.1) 75%, rgba(0, 255, 255, 0.1) 76%, transparent 77%, transparent),
                                linear-gradient(90deg, transparent 24%, rgba(0, 255, 255, 0.1) 25%, rgba(0, 255, 255, 0.1) 26%, transparent 27%, transparent 74%, rgba(0, 255, 255, 0.1) 75%, rgba(0, 255, 255, 0.1) 76%, transparent 77%, transparent)
                            `,
                            backgroundSize: '50px 50px',
                        }}
                    />

                    {/* Scanline effect */}
                    <div className="absolute inset-0 z-0 opacity-10 pointer-events-none"
                        style={{
                            background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.5) 0px, rgba(0,0,0,0.5) 1px, transparent 1px, transparent 2px)',
                        }}
                    />

                    {/* Content */}
                    <div className="relative z-10 p-8 sm:p-12 md:p-16 lg:p-20">
                        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                            {/* Left: Text Content */}
                            <motion.div
                                initial={{opacity: 0, x: -40}}
                                animate={{opacity: 1, x: 0}}
                                transition={{delay: 0.2, duration: 0.6}}
                                className="max-w-2xl"
                            >
                                {/* Badge */}
                                <motion.div
                                    initial={{scale: 0.8, opacity: 0}}
                                    animate={{scale: 1, opacity: 1}}
                                    transition={{delay: 0.3}}
                                    className="mb-4 inline-flex items-center gap-2"
                                >
                                    <span className="inline-block h-3 w-3 animate-pulse rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/80" />
                                    <span className="rounded-full border border-cyan-400/50 bg-cyan-500/20 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-cyan-100 backdrop-blur-md">
                                        FEATURED CAMPAIGN
                                    </span>
                                </motion.div>

                                {/* Title with gradient */}
                                <motion.h2
                                    initial={{opacity: 0, y: 20}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.4}}
                                    className="mb-4 text-3xl sm:text-4xl md:text-5xl font-black leading-tight text-white drop-shadow-2xl"
                                    style={{
                                        backgroundImage: 'linear-gradient(135deg, #00ffff, #ff00ff, #00ffff)',
                                        backgroundSize: '200% 200%',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text',
                                        animation: 'gradient-shift 8s ease infinite',
                                    }}
                                >
                                    {ad.title}
                                </motion.h2>

                                {/* Body text */}
                                {ad.body && (
                                    <motion.p
                                        initial={{opacity: 0, y: 20}}
                                        animate={{opacity: 1, y: 0}}
                                        transition={{delay: 0.5}}
                                        className="mb-6 text-base sm:text-lg text-gray-100 drop-shadow-lg leading-relaxed"
                                    >
                                        {ad.body}
                                    </motion.p>
                                )}
                            </motion.div>

                            {/* Right: CTA + Share */}
                            <motion.div
                                initial={{opacity: 0, x: 40}}
                                animate={{opacity: 1, x: 0}}
                                transition={{delay: 0.3, duration: 0.6}}
                                className="flex flex-col gap-5"
                            >
                                {/* Primary CTA Button - Glowing effect */}
                                <motion.a
                                    href={clickHref}
                                    target={/^https?:/.test(ad.link_url) ? '_blank' : '_self'}
                                    rel="noopener"
                                    whileHover={{scale: 1.05, boxShadow: '0 0 40px rgba(0,255,255,0.8)'}}
                                    whileTap={{scale: 0.95}}
                                    className="group relative inline-flex shrink-0 items-center justify-center gap-3 rounded-2xl px-8 py-4 text-center text-lg font-bold text-white transition-all duration-300"
                                    style={{
                                        background: 'linear-gradient(135deg, #00ffff, #0088ff, #ff00ff)',
                                        backgroundSize: '200% 200%',
                                        boxShadow: '0 0 30px rgba(0,255,255,0.6), inset 0 1px 0 rgba(255,255,255,0.2)',
                                    }}
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        {ad.cta_label || 'Learn more'}
                                        <motion.svg
                                            animate={{x: [0, 8, 0]}}
                                            transition={{duration: 1.5, repeat: Infinity}}
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </motion.svg>
                                    </span>

                                    {/* Button glow effect */}
                                    <div className="pointer-events-none absolute inset-0 rounded-2xl blur-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                                        style={{background: 'linear-gradient(135deg, #00ffff, #ff00ff)'}}
                                    />
                                </motion.a>

                                {/* Share button */}
                                <motion.button
                                    whileHover={{scale: 1.1}}
                                    whileTap={{scale: 0.9}}
                                    onClick={() => setShareOpen((s) => !s)}
                                    className="inline-flex h-12 w-12 items-center justify-center rounded-full border-2 border-cyan-400/50 bg-white/10 text-cyan-100 backdrop-blur-md shadow-lg transition hover:bg-cyan-400/20 hover:border-cyan-300"
                                    aria-label="Share"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.7 10.7l6.6-3.4M8.7 13.3l6.6 3.4M18 8a3 3 0 10-6 0 3 3 0 006 0zM9 12a3 3 0 11-6 0 3 3 0 016 0zm9 4a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </motion.button>

                                {/* Share menu */}
                                <AnimatePresence>
                                    {shareOpen && (
                                        <motion.div
                                            initial={{opacity: 0, scale: 0.8, y: -10}}
                                            animate={{opacity: 1, scale: 1, y: 0}}
                                            exit={{opacity: 0, scale: 0.8, y: -10}}
                                            transition={{duration: 0.2}}
                                            className="flex flex-wrap gap-2 justify-center lg:flex-col"
                                        >
                                            {shareLinks(caption, shareTarget).map(({n, color, Icon, u}) => (
                                                <motion.a
                                                    key={n}
                                                    href={u}
                                                    target="_blank"
                                                    rel="noopener"
                                                    whileHover={{scale: 1.15}}
                                                    whileTap={{scale: 0.9}}
                                                    className="inline-flex h-11 w-11 items-center justify-center rounded-full text-white shadow-lg transition"
                                                    style={{background: color}}
                                                    title={n === 'Instagram' ? 'Copy caption & open Instagram' : `Share on ${n}`}
                                                    onClick={(e) => onShareClick(e, n)}
                                                >
                                                    <Icon size={18} />
                                                </motion.a>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        </div>

                        {/* Ad indicators (dots) */}
                        {ads.length > 1 && (
                            <div className="flex justify-center gap-2 mt-8">
                                {ads.map((_, idx) => (
                                    <motion.button
                                        key={idx}
                                        onClick={() => setCurrentIdx(idx)}
                                        className={`h-2 rounded-full transition-all ${
                                            idx === currentIdx
                                                ? 'w-8 bg-cyan-400'
                                                : 'w-2 bg-cyan-400/40 hover:bg-cyan-400/60'
                                        }`}
                                        aria-label={`Show ad ${idx + 1}`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Copied notification */}
                    <AnimatePresence>
                        {copied && (
                            <motion.div
                                initial={{opacity: 0, y: 10}}
                                animate={{opacity: 1, y: 0}}
                                exit={{opacity: 0, y: 10}}
                                className="fixed bottom-6 right-6 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-400 px-6 py-3 text-sm font-bold text-black shadow-2xl shadow-cyan-500/50 z-50"
                            >
                                ✓ Caption copied — paste it on Instagram
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* CSS Animations */}
                    <style>{`
                        @keyframes gradient-shift {
                            0% { background-position: 0% 50%; }
                            50% { background-position: 100% 50%; }
                            100% { background-position: 0% 50%; }
                        }
                    `}</style>
                </motion.div>
            </AnimatePresence>
        </section>
    );
}
