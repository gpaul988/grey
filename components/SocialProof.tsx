'use client';

import React, {useEffect, useRef, useState, useCallback} from 'react';

interface Partner {
    id: number;
    name: string;
    logo: string;
    url: string;
}

interface Review {
    id: number;
    author: string;
    role: string;
    company: string;
    avatar: string;
    quote: string;
    rating: number;
}

interface ContentResponse {
    partners: Partner[];
    reviews: Review[];
    placement: {partners: boolean; reviews: boolean};
}

/**
 * Admin-managed social proof block: a partners/clients logo carousel
 * (auto-scroll marquee on desktop, swipeable on mobile) plus a rotating
 * client-review slider (one testimonial at a time).
 *
 * Both sections render only when the admin has enabled them for `page`.
 * Pass the page key (e.g. "home", "about", "services", "industries", "portfolio").
 */
export default function SocialProof({page}: {page: string}) {
    const [data, setData] = useState<ContentResponse | null>(null);

    useEffect(() => {
        let alive = true;
        fetch(`/api/content?page=${encodeURIComponent(page)}`)
            .then((r) => (r.ok ? r.json() : null))
            .then((d: ContentResponse | null) => {
                if (alive && d) setData(d);
            })
            .catch(() => {});
        return () => {
            alive = false;
        };
    }, [page]);

    if (!data) return null;
    const showPartners = data.placement.partners && data.partners.length > 0;
    const showReviews = data.placement.reviews && data.reviews.length > 0;
    if (!showPartners && !showReviews) return null;

    return (
        <section className="sp-wrap" aria-label="Trusted by clients and partners">
            <div className="sp-inner">
                {showPartners && <PartnersCarousel partners={data.partners}/>}
                {showReviews && <ReviewsSlider reviews={data.reviews}/>}
            </div>
            <style jsx>{`
                .sp-wrap {
                    position: relative;
                    padding: 4rem 1.25rem;
                    overflow: hidden;
                }
                .sp-inner {
                    max-width: 1180px;
                    margin: 0 auto;
                    display: flex;
                    flex-direction: column;
                    gap: 4rem;
                }
            `}</style>
        </section>
    );
}

/* ───────────────────────── Partners carousel ───────────────────────── */

function PartnersCarousel({partners}: {partners: Partner[]}) {
    // Duplicate the list so the marquee loops seamlessly.
    const loop = partners.length >= 4 ? [...partners, ...partners] : partners;

    const LogoCard = ({p}: {p: Partner}) => {
        const inner = (
            <div className="sp-logo-card">
                {p.logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.logo} alt={p.name} loading="lazy" className="sp-logo-img"/>
                ) : (
                    <span className="sp-logo-text">{p.name}</span>
                )}
            </div>
        );
        return p.url ? (
            <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                title={p.name}
                aria-label={`${p.name} (opens in a new tab)`}
                className="sp-logo-link"
            >
                {inner}
            </a>
        ) : (
            inner
        );
    };

    return (
        <div className="sp-partners">
            <p className="sp-eyebrow">Trusted by teams &amp; partners</p>

            {/* Desktop: infinite marquee. Hover to pause. */}
            <div className="sp-marquee" role="list">
                <div className="sp-track">
                    {loop.map((p, i) => (
                        <div className="sp-item" role="listitem" key={`m-${p.id}-${i}`}>
                            <LogoCard p={p}/>
                        </div>
                    ))}
                </div>
            </div>

            {/* Mobile: native swipe carousel. */}
            <div className="sp-swipe" role="list">
                {partners.map((p) => (
                    <div className="sp-item" role="listitem" key={`s-${p.id}`}>
                        <LogoCard p={p}/>
                    </div>
                ))}
            </div>

            <style jsx>{`
                .sp-partners {
                    text-align: center;
                }
                .sp-eyebrow {
                    text-transform: uppercase;
                    letter-spacing: 0.18em;
                    font-size: 0.72rem;
                    font-weight: 600;
                    opacity: 0.6;
                    margin: 0 0 1.75rem;
                }
                /* ── desktop marquee ── */
                .sp-marquee {
                    position: relative;
                    width: 100%;
                    overflow: hidden;
                    -webkit-mask-image: linear-gradient(90deg, transparent, #000 9%, #000 91%, transparent);
                    mask-image: linear-gradient(90deg, transparent, #000 9%, #000 91%, transparent);
                }
                .sp-track {
                    display: flex;
                    width: max-content;
                    gap: 2.5rem;
                    animation: sp-scroll 38s linear infinite;
                }
                .sp-marquee:hover .sp-track {
                    animation-play-state: paused;
                }
                @keyframes sp-scroll {
                    from { transform: translateX(0); }
                    to { transform: translateX(-50%); }
                }
                /* ── mobile swipe ── */
                .sp-swipe {
                    display: none;
                    gap: 1.25rem;
                    overflow-x: auto;
                    scroll-snap-type: x mandatory;
                    -webkit-overflow-scrolling: touch;
                    padding: 0.25rem 0.25rem 0.75rem;
                    scrollbar-width: none;
                }
                .sp-swipe::-webkit-scrollbar { display: none; }
                .sp-swipe .sp-item { scroll-snap-align: center; }

                .sp-item { flex: 0 0 auto; }
                :global(.sp-logo-link) { display: block; text-decoration: none; }
                :global(.sp-logo-card) {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 88px;
                    width: 176px;
                    padding: 0 1.1rem;
                    border-radius: 16px;
                    background: rgba(255, 255, 255, 0.04);
                    border: 1px solid rgba(148, 163, 184, 0.16);
                    backdrop-filter: blur(8px);
                    transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
                }
                :global(.sp-logo-link:hover .sp-logo-card),
                :global(.sp-logo-card:hover) {
                    transform: translateY(-4px);
                    border-color: rgba(56, 189, 248, 0.5);
                    box-shadow: 0 12px 36px -14px rgba(56, 189, 248, 0.45);
                }
                :global(.sp-logo-img) {
                    max-height: 52px;
                    max-width: 140px;
                    object-fit: contain;
                    filter: grayscale(1) opacity(0.78);
                    transition: filter 0.25s ease;
                }
                :global(.sp-logo-link:hover .sp-logo-img),
                :global(.sp-logo-card:hover .sp-logo-img) {
                    filter: grayscale(0) opacity(1);
                }
                :global(.sp-logo-text) {
                    font-weight: 700;
                    font-size: 1.05rem;
                    color: rgba(226, 232, 240, 0.85);
                    white-space: nowrap;
                }
                @media (max-width: 640px) {
                    .sp-marquee { display: none; }
                    .sp-swipe { display: flex; }
                }
                @media (prefers-reduced-motion: reduce) {
                    .sp-track { animation: none; flex-wrap: wrap; justify-content: center; }
                }
            `}</style>
        </div>
    );
}

/* ───────────────────────── Reviews slider ───────────────────────── */

function ReviewsSlider({reviews}: {reviews: Review[]}) {
    const [idx, setIdx] = useState(0);
    const [paused, setPaused] = useState(false);
    const count = reviews.length;

    const go = useCallback((n: number) => setIdx((c) => (n + count) % count), [count]);

    useEffect(() => {
        if (paused || count <= 1) return;
        const t = setInterval(() => setIdx((c) => (c + 1) % count), 6000);
        return () => clearInterval(t);
    }, [paused, count]);

    // Touch swipe.
    const startX = useRef(0);
    const onTouchStart = (e: React.TouchEvent) => {
        startX.current = e.touches[0].clientX;
    };
    const onTouchEnd = (e: React.TouchEvent) => {
        const dx = e.changedTouches[0].clientX - startX.current;
        if (Math.abs(dx) > 40) go(dx < 0 ? idx + 1 : idx - 1);
    };

    const r = reviews[idx];

    return (
        <div
            className="sp-reviews"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            aria-roledescription="carousel"
            aria-label="Client reviews"
        >
            <p className="sp-eyebrow">What clients say</p>

            <div className="sp-card" key={r.id}>
                <div className="sp-stars" aria-label={`${r.rating} out of 5 stars`}>
                    {Array.from({length: 5}).map((_, i) => (
                        <span key={i} className={i < r.rating ? 'on' : 'off'}>★</span>
                    ))}
                </div>
                <blockquote className="sp-quote">&ldquo;{r.quote}&rdquo;</blockquote>
                <div className="sp-author">
                    {r.avatar ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={r.avatar} alt={r.author} className="sp-avatar" loading="lazy"/>
                    ) : (
                        <span className="sp-avatar sp-avatar-fallback">{r.author.charAt(0)}</span>
                    )}
                    <div className="sp-meta">
                        <span className="sp-name">{r.author}</span>
                        {(r.role || r.company) && (
                            <span className="sp-role">
                                {[r.role, r.company].filter(Boolean).join(' · ')}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {count > 1 && (
                <div className="sp-controls">
                    <button className="sp-arrow" onClick={() => go(idx - 1)} aria-label="Previous review">‹</button>
                    <div className="sp-dots" role="tablist">
                        {reviews.map((_, i) => (
                            <button
                                key={i}
                                className={`sp-dot${i === idx ? ' on' : ''}`}
                                onClick={() => setIdx(i)}
                                aria-label={`Go to review ${i + 1}`}
                                aria-selected={i === idx}
                                role="tab"
                            />
                        ))}
                    </div>
                    <button className="sp-arrow" onClick={() => go(idx + 1)} aria-label="Next review">›</button>
                </div>
            )}

            <style jsx>{`
                .sp-reviews { text-align: center; }
                .sp-eyebrow {
                    text-transform: uppercase;
                    letter-spacing: 0.18em;
                    font-size: 0.72rem;
                    font-weight: 600;
                    opacity: 0.6;
                    margin: 0 0 1.75rem;
                }
                .sp-card {
                    max-width: 760px;
                    margin: 0 auto;
                    padding: 2.5rem 2rem;
                    border-radius: 22px;
                    background: rgba(15, 23, 42, 0.45);
                    backdrop-filter: blur(14px) saturate(140%);
                    border: 1px solid rgba(148, 163, 184, 0.18);
                    box-shadow: 0 24px 60px -30px rgba(56, 189, 248, 0.3);
                    animation: sp-fade 0.5s ease;
                }
                @keyframes sp-fade {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .sp-stars { font-size: 1.1rem; letter-spacing: 2px; margin-bottom: 1.1rem; }
                .sp-stars .on { color: #fbbf24; }
                .sp-stars .off { color: rgba(148, 163, 184, 0.35); }
                .sp-quote {
                    font-size: 1.28rem;
                    line-height: 1.6;
                    font-weight: 500;
                    margin: 0 0 1.75rem;
                    color: rgba(226, 232, 240, 0.95);
                }
                .sp-author {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.85rem;
                }
                .sp-avatar {
                    width: 48px;
                    height: 48px;
                    border-radius: 9999px;
                    object-fit: cover;
                    border: 2px solid rgba(56, 189, 248, 0.4);
                }
                .sp-avatar-fallback {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 700;
                    font-size: 1.1rem;
                    color: #fff;
                    background: linear-gradient(135deg, #06b6d4, #a855f7);
                }
                .sp-meta { text-align: left; display: flex; flex-direction: column; }
                .sp-name { font-weight: 700; }
                .sp-role { font-size: 0.85rem; opacity: 0.65; }
                .sp-controls {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 1rem;
                    margin-top: 1.75rem;
                }
                .sp-arrow {
                    width: 40px;
                    height: 40px;
                    border-radius: 9999px;
                    border: 1px solid rgba(148, 163, 184, 0.25);
                    background: rgba(255, 255, 255, 0.04);
                    color: inherit;
                    font-size: 1.4rem;
                    line-height: 1;
                    cursor: pointer;
                    transition: border-color 0.2s ease, background 0.2s ease, transform 0.2s ease;
                }
                .sp-arrow:hover {
                    border-color: rgba(56, 189, 248, 0.6);
                    background: rgba(56, 189, 248, 0.12);
                    transform: scale(1.06);
                }
                .sp-dots { display: flex; gap: 0.5rem; }
                .sp-dot {
                    width: 9px;
                    height: 9px;
                    border-radius: 9999px;
                    border: none;
                    padding: 0;
                    background: rgba(148, 163, 184, 0.35);
                    cursor: pointer;
                    transition: width 0.25s ease, background 0.25s ease;
                }
                .sp-dot.on {
                    width: 26px;
                    background: linear-gradient(90deg, #22d3ee, #a855f7);
                }
                @media (max-width: 640px) {
                    .sp-quote { font-size: 1.08rem; }
                    .sp-card { padding: 2rem 1.25rem; }
                }
                @media (prefers-reduced-motion: reduce) {
                    .sp-card { animation: none; }
                }
            `}</style>
        </div>
    );
}
