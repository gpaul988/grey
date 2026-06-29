'use client';

/**
 * FuturisticIndustryLayout
 * ─────────────────────────────────────────────────────────────────────────────
 * Drop-in wrapper for all 15 industry detail pages.
 *
 * Usage:
 *   <FuturisticIndustryLayout
 *     isDayTime={isDayTime}
 *     industry="FinTech"
 *     eyebrow="Industry Solutions"
 *     subtitle="Cutting-edge financial technology..."
 *     heroVideo="/assets/fin/hero.mp4"
 *     heroImage="/assets/fin/hero.jpg"
 *     accentColor="#2dd4bf"
 *   >
 *     {page sections}
 *   </FuturisticIndustryLayout>
 */

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FxBackground, FxChip, FxReveal, FxButton, FxHoloCard, FxFrame, FxStatBar } from '@/components/futuristic/fx';

interface Props {
    isDayTime: boolean;
    industry: string;
    eyebrow?: string;
    subtitle?: string;
    heroImage?: string;
    heroVideo?: string;
    accentColor?: string;
    stats?: { label: string; value: string; percent?: number }[];
    capabilities?: string[];
    children: React.ReactNode;
    ctaHref?: string;
    ctaLabel?: string;
}

export default function FuturisticIndustryLayout({
    isDayTime,
    industry,
    eyebrow = 'Industry Solutions',
    subtitle,
    heroImage,
    heroVideo,
    stats = [],
    capabilities = [],
    children,
    ctaHref = '/contact',
    ctaLabel = 'Discuss Your Project',
}: Props) {
    const dark = !isDayTime;

    return (
        <div className={`min-h-screen transition-colors duration-500 ${dark ? 'bg-[#050810] text-white' : 'bg-white text-black'}`}>

            {/* ── Full-bleed hero ── */}
            <section className="relative overflow-hidden min-h-[76vh] flex flex-col justify-end">
                {/* Background media */}
                {heroVideo ? (
                    <video
                        src={heroVideo}
                        autoPlay loop muted playsInline
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                ) : heroImage ? (
                    <Image src={heroImage} alt={industry} fill sizes="100vw" className="object-cover" priority />
                ) : null}

                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/90" />

                {/* FX layers */}
                <FxBackground day={false} grid aurora className="opacity-50" />
                <div className="gx-scanline pointer-events-none" />
                <div className="gx-hero-scan" />
                <div className="gx-noise-overlay" />

                {/* Orbit rings */}
                <div className="gx-orbit pointer-events-none absolute" style={{ width: '65vmax', height: '65vmax', top: '-22vmax', right: '-22vmax', opacity: .2 }} />

                {/* Hero content */}
                <div className="gx-page-hero-content relative z-10">
                    <div className="max-w-[90rem] mx-auto">
                        <FxReveal>
                            <FxChip day={false} className="mb-5">{eyebrow}</FxChip>
                            <div className="border-b border-white/20 pb-6 mb-6">
                                <h1 className="gx-hero-title text-white gx-glitch">{industry}</h1>
                            </div>
                            {subtitle && (
                                <p className="text-white/70 max-w-2xl text-base md:text-lg leading-relaxed">{subtitle}</p>
                            )}
                            {/* Stats row */}
                            {stats.length > 0 && (
                                <div className="grid grid-cols-3 gap-6 mt-8 max-w-lg">
                                    {stats.slice(0, 3).map(s => (
                                        <div key={s.label}>
                                            <div className="text-[2.2em] font-[800] gx-gradient-text leading-none">{s.value}</div>
                                            <div className="text-white/50 text-[0.7em] mt-1 uppercase tracking-wider">{s.label}</div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </FxReveal>
                    </div>
                </div>
            </section>

            {/* ── Body ── */}
            <div className="relative z-10">
                <div className="pointer-events-none fixed inset-0 z-0">
                    <FxBackground day={isDayTime} grid aurora className="opacity-25" />
                </div>

                {/* Capabilities strip (if provided) */}
                {capabilities.length > 0 && (
                    <div className={`relative z-10 border-b ${dark ? 'border-white/08 bg-white/[0.01]' : 'border-gray-100 bg-gray-50'} py-6 overflow-x-auto`}>
                        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-[4.5em]">
                            <div className="flex gap-3 flex-wrap">
                                {capabilities.map(cap => (
                                    <span key={cap} className="gx-data-pill">{cap}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Floating CTA */}
                <div className="relative z-10">{children}</div>

                {/* Bottom CTA section */}
                <section className={`relative overflow-hidden py-24 px-4 sm:px-6 lg:px-[4.5em] ${dark ? 'bg-[#030508]' : 'bg-teal-950'} text-white`}>
                    <FxBackground day={false} grid aurora className="opacity-50" />
                    <div className="gx-scanline pointer-events-none" />
                    <div className="relative z-10 max-w-[90rem] mx-auto text-center">
                        <FxReveal>
                            <FxChip day={false} className="mb-6">Let's Work Together</FxChip>
                            <h2 className="text-[2.5em] md:text-[3.5em] font-[800] leading-[1.1] tracking-tight mb-6">
                                Ready to transform <span className="gx-gradient-text">your {industry} platform?</span>
                            </h2>
                            <p className="text-white/60 max-w-2xl mx-auto mb-10 text-[1em] leading-relaxed">
                                Our team of engineers and strategists are ready to help you build, scale, and innovate.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <FxButton day={false} href={ctaHref} variant="solid">{ctaLabel}</FxButton>
                                <FxButton day={false} href="/case-studies" variant="ghost">View Case Studies</FxButton>
                            </div>
                        </FxReveal>
                    </div>
                </section>
            </div>
        </div>
    );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Shared section components for industry pages
   ─────────────────────────────────────────────────────────────────────────── */

export function IndustrySolutionsGrid({
    isDayTime,
    title,
    items,
}: {
    isDayTime: boolean;
    title?: string;
    items: { id: string; title: string; body: React.ReactNode; icon?: React.ReactNode }[];
}) {
    const dark = !isDayTime;
    return (
        <section className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-[4.5em] py-16 lg:py-24 relative z-10">
            {title && (
                <FxReveal className="mb-12">
                    <FxChip day={isDayTime} className="mb-4">Solutions</FxChip>
                    <h2 className="text-[2.2em] md:text-[3em] font-[700] leading-[1.1] tracking-tight">
                        {title}
                    </h2>
                </FxReveal>
            )}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((item, i) => (
                    <FxReveal key={item.id} delay={i * 0.06}>
                        <FxHoloCard day={isDayTime} className="p-7 h-full">
                            {item.icon && (
                                <div className={`mb-5 text-[1.8em] ${dark ? 'text-teal-400' : 'text-teal-600'}`}>{item.icon}</div>
                            )}
                            <h3 className="text-[1.1em] font-[700] mb-3">{item.title}</h3>
                            <div className={`text-[0.88em] leading-[1.7] ${dark ? 'text-gray-300' : 'text-gray-600'}`}>{item.body}</div>
                        </FxHoloCard>
                    </FxReveal>
                ))}
            </div>
        </section>
    );
}

export function IndustryAccordionSection({
    isDayTime,
    title,
    reasons,
    activeIndex,
    onSelect,
    image,
}: {
    isDayTime: boolean;
    title?: string;
    reasons: { id: number; title: string; description: React.ReactNode; images?: string[] }[];
    activeIndex: number;
    onSelect: (id: number) => void;
    image?: string;
}) {
    const dark = !isDayTime;
    const activeReason = reasons.find(r => r.id === activeIndex);
    const displayImage = activeReason?.images?.[0] ?? image;

    return (
        <section className={`relative py-20 px-4 sm:px-6 lg:px-[4.5em] ${dark ? 'bg-black/20' : 'bg-gray-50'} relative z-10`}>
            <div className="max-w-[90rem] mx-auto">
                {title && (
                    <FxReveal className="mb-12">
                        <h2 className="text-[2em] md:text-[2.8em] font-[700] leading-[1.1] tracking-tight">{title}</h2>
                    </FxReveal>
                )}
                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Accordion */}
                    <div className="space-y-2">
                        {reasons.map(r => (
                            <div
                                key={r.id}
                                className={`rounded-xl border transition-all duration-300 overflow-hidden ${
                                    r.id === activeIndex
                                        ? dark ? 'border-teal-400/40 bg-teal-400/06' : 'border-teal-300/60 bg-teal-50'
                                        : dark ? 'border-white/06' : 'border-gray-100'
                                }`}
                            >
                                <button
                                    onClick={() => onSelect(r.id)}
                                    className={`w-full text-left px-5 py-4 font-[600] flex justify-between items-center text-[0.95em] ${
                                        r.id === activeIndex
                                            ? dark ? 'text-teal-300' : 'text-teal-700'
                                            : dark ? 'text-gray-400' : 'text-gray-500'
                                    }`}
                                >
                                    {r.title}
                                    <span className={`transition-transform ${r.id === activeIndex ? 'rotate-90' : ''}`}>›</span>
                                </button>
                                {r.id === activeIndex && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className={`px-5 pb-5 text-[0.88em] leading-[1.7] ${dark ? 'text-gray-300' : 'text-gray-600'}`}
                                    >
                                        {r.description}
                                    </motion.div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Image */}
                    {displayImage && (
                        <FxReveal delay={0.1}>
                            <FxFrame>
                                <Image src={displayImage} alt="Solution" width={600} height={440} className="w-full object-cover" />
                            </FxFrame>
                        </FxReveal>
                    )}
                </div>
            </div>
        </section>
    );
}
