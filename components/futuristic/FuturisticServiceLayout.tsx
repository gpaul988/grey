'use client';

/**
 * FuturisticServiceLayout
 * ─────────────────────────────────────────────────────────────────────────────
 * Drop-in wrapper for all 40 service detail pages.
 * Replace the old <h1> + sticky-scroll pattern with this component.
 *
 * Usage:
 *   <FuturisticServiceLayout
 *     isDayTime={isDayTime}
 *     title="Web Development"
 *     eyebrow="Our Services"
 *     subtitle="We build scalable, modern web applications."
 *     heroImage="/assets/services/web-dev.jpg"
 *     navSections={[...]}
 *     activeId={activeId}
 *     onNavClick={scrollToSection}
 *   >
 *     {page sections}
 *   </FuturisticServiceLayout>
 */

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FxBackground, FxChip, FxReveal, FxButton, FxHoloCard, FxStatBar, FxFrame } from '@/components/futuristic/fx';

interface NavSection {
    id: string;
    label: string;
}

interface Props {
    isDayTime: boolean;
    title: string;
    eyebrow?: string;
    subtitle?: string;
    heroImage?: string;
    heroVideo?: string;
    navSections?: NavSection[];
    activeId?: string;
    onNavClick?: (id: string) => void;
    stats?: { label: string; value: string; percent: number }[];
    children: React.ReactNode;
    ctaHref?: string;
    ctaLabel?: string;
}

export default function FuturisticServiceLayout({
    isDayTime,
    title,
    eyebrow = 'Our Services',
    subtitle,
    heroImage,
    heroVideo,
    navSections = [],
    activeId,
    onNavClick,
    stats = [],
    children,
    ctaHref = '/quote-request',
    ctaLabel = 'Get a Quote',
}: Props) {
    const dark = !isDayTime;

    return (
        <div className={`min-h-screen transition-colors duration-500 ${dark ? 'bg-[#050810] text-white' : 'bg-white text-black'}`}>

            {/* ── Full-bleed hero ── */}
            <section className="gx-page-hero relative overflow-hidden min-h-[72vh] flex flex-col justify-end">
                {/* Video / image background */}
                {heroVideo ? (
                    <video
                        src={heroVideo}
                        autoPlay loop muted playsInline
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                ) : heroImage ? (
                    <Image
                        src={heroImage}
                        alt={title}
                        fill
                        sizes="100vw"
                        className="object-cover"
                        priority
                    />
                ) : null}

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80" />

                {/* FX layers */}
                <FxBackground day={false} grid aurora className="opacity-50" />
                <div className="gx-scanline pointer-events-none" />
                <div className="gx-hero-scan" />
                <div className="gx-noise-overlay" />

                {/* Orbit rings */}
                <div className="gx-orbit pointer-events-none absolute" style={{ width: '70vmax', height: '70vmax', top: '-25vmax', right: '-25vmax', opacity: .18, borderColor: 'rgba(45,212,191,0.18)' }} />
                <div className="gx-orbit gx-orbit-reverse pointer-events-none absolute" style={{ width: '45vmax', height: '45vmax', top: '-8vmax', right: '-4vmax', opacity: .12, borderColor: 'rgba(45,212,191,0.12)' }} />

                {/* Hero content */}
                <div className="gx-page-hero-content relative z-10">
                    <div className="max-w-[90rem] mx-auto">
                        <FxReveal>
                            <div className="mb-4">
                                <FxChip day={false}>{eyebrow}</FxChip>
                            </div>
                            <div className="border-b border-white/20 pb-6 mb-6 max-w-4xl">
                                <h1 className="gx-hero-title text-white gx-glitch">
                                    {title}
                                </h1>
                            </div>
                            {subtitle && (
                                <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed">
                                    {subtitle}
                                </p>
                            )}
                        </FxReveal>
                    </div>
                </div>
            </section>

            {/* ── Main content ── */}
            <div className="relative z-10">

                {/* Background FX for body */}
                <div className="pointer-events-none fixed inset-0 z-0">
                    <FxBackground day={isDayTime} grid={true} aurora={true} className="opacity-30" />
                </div>

                {/* Content layout: sidebar + main */}
                {navSections.length > 0 ? (
                    <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-[4.5em] py-16 lg:py-24 relative z-10">
                        <div className="flex gap-12 lg:gap-16 items-start">

                            {/* Sidebar nav */}
                            <aside className="hidden lg:block w-56 shrink-0">
                                <div className="gx-sticky-nav">
                                    <div className={`text-[0.68em] uppercase tracking-[0.18em] font-[700] mb-4 ${dark ? 'text-teal-400/60' : 'text-teal-600/60'}`}>
                                        On This Page
                                    </div>
                                    <nav className="space-y-1">
                                        {navSections.map(({ id, label }) => (
                                            <button
                                                key={id}
                                                onClick={() => onNavClick?.(id)}
                                                className={`w-full text-left px-3 py-2.5 rounded-lg text-[0.82em] font-[500] transition-all duration-200 border-l-2 ${
                                                    activeId === id
                                                        ? 'border-teal-400 text-teal-400 ' + (dark ? 'bg-teal-400/08' : 'bg-teal-50')
                                                        : 'border-transparent ' + (dark ? 'text-gray-400 hover:text-white hover:border-teal-400/40' : 'text-gray-500 hover:text-black hover:border-teal-400/40')
                                                }`}
                                            >
                                                {label}
                                            </button>
                                        ))}
                                    </nav>

                                    {/* Stats */}
                                    {stats.length > 0 && (
                                        <div className={`mt-8 pt-8 border-t ${dark ? 'border-white/10' : 'border-gray-200'} space-y-4`}>
                                            {stats.map(s => (
                                                <FxStatBar key={s.label} day={isDayTime} label={s.label} value={s.value} percent={s.percent} />
                                            ))}
                                        </div>
                                    )}

                                    {/* Sidebar CTA */}
                                    <div className={`mt-8 p-4 rounded-xl border ${dark ? 'border-teal-400/20 bg-teal-400/05' : 'border-teal-200 bg-teal-50'}`}>
                                        <p className={`text-[0.75em] font-[500] mb-3 ${dark ? 'text-gray-300' : 'text-gray-700'}`}>
                                            Ready to get started?
                                        </p>
                                        <FxButton day={isDayTime} href={ctaHref} variant="solid" className="w-full justify-center text-[0.8em] py-2.5">
                                            {ctaLabel}
                                        </FxButton>
                                    </div>
                                </div>
                            </aside>

                            {/* Main content */}
                            <main className="flex-1 min-w-0">{children}</main>
                        </div>
                    </div>
                ) : (
                    <div className="relative z-10">{children}</div>
                )}
            </div>
        </div>
    );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Helper sub-components for service page sections
   ─────────────────────────────────────────────────────────────────────────── */

/** Full-width intro section with chip + large heading */
export function ServiceIntro({
    isDayTime,
    chip,
    heading,
    body,
}: { isDayTime: boolean; chip?: string; heading: React.ReactNode; body?: React.ReactNode }) {
    const dark = !isDayTime;
    return (
        <FxReveal className="mb-16">
            {chip && <FxChip day={isDayTime} className="mb-6">{chip}</FxChip>}
            <h2 className={`text-[2.2em] md:text-[3em] font-[700] leading-[1.1] tracking-tight mb-6 ${dark ? '' : ''}`}>
                {heading}
            </h2>
            {body && (
                <div className={`text-[0.92em] leading-[1.8] ${dark ? 'text-gray-300' : 'text-gray-600'} max-w-3xl`}>
                    {body}
                </div>
            )}
        </FxReveal>
    );
}

/** Sticky-scroll solution section (replaces old pattern) */
export function ServiceSectionBlock({
    isDayTime,
    id,
    number,
    title,
    body,
    image,
}: {
    isDayTime: boolean;
    id: string;
    number?: string;
    title: string;
    body: React.ReactNode;
    image?: string;
}) {
    const dark = !isDayTime;
    return (
        <motion.section
            id={id}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className={`mb-16 pb-16 border-b ${dark ? 'border-white/08' : 'border-gray-100'}`}
        >
            <div className={`grid ${image ? 'lg:grid-cols-2' : 'grid-cols-1'} gap-10 items-start`}>
                <div>
                    {number && (
                        <span className="gx-data-pill mb-4 inline-block">{number}</span>
                    )}
                    <h3 className="text-[1.6em] md:text-[2em] font-[700] leading-[1.15] tracking-tight mb-5 gx-glitch">
                        {title}
                    </h3>
                    <div className={`text-[0.9em] leading-[1.8] ${dark ? 'text-gray-300' : 'text-gray-600'}`}>
                        {body}
                    </div>
                </div>
                {image && (
                    <FxFrame>
                        <Image src={image} alt={title} width={600} height={420} className="w-full object-cover" />
                    </FxFrame>
                )}
            </div>
        </motion.section>
    );
}

/** Why Grey InfoTech accordion */
export function ServiceWhyAccordion({
    isDayTime,
    reasons,
    activeIndex,
    onSelect,
}: {
    isDayTime: boolean;
    reasons: { id: number; title: React.ReactNode; description: React.ReactNode }[];
    activeIndex: number;
    onSelect: (id: number) => void;
}) {
    const dark = !isDayTime;
    return (
        <div className={`space-y-1 ${dark ? 'text-white' : 'text-black'}`}>
            {reasons.map((r) => (
                <div
                    key={r.id}
                    className={`rounded-xl border transition-all duration-300 overflow-hidden ${
                        r.id === activeIndex
                            ? dark
                                ? 'border-teal-400/40 bg-teal-400/05'
                                : 'border-teal-300/60 bg-teal-50'
                            : dark
                                ? 'border-white/06 bg-transparent'
                                : 'border-gray-100 bg-transparent'
                    }`}
                >
                    <button
                        className={`w-full text-left px-5 py-4 font-[600] text-[0.95em] flex items-center justify-between ${
                            r.id === activeIndex
                                ? dark ? 'text-teal-300' : 'text-teal-700'
                                : dark ? 'text-gray-400' : 'text-gray-500'
                        }`}
                        onClick={() => onSelect(r.id)}
                    >
                        {r.title}
                        <span className={`text-[0.8em] transition-transform ${r.id === activeIndex ? 'rotate-90' : ''}`}>›</span>
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
    );
}

/** Stats countup row */
export function ServiceStatsRow({
    isDayTime,
    stats,
}: {
    isDayTime: boolean;
    stats: { label: string; value: number; suffix?: string }[];
}) {
    const dark = !isDayTime;
    return (
        <div className={`grid grid-cols-2 lg:grid-cols-4 gap-6 py-12 border-y ${dark ? 'border-white/10' : 'border-gray-100'}`}>
            {stats.map(({ label, value, suffix }) => (
                <FxReveal key={label}>
                    <FxHoloCard day={isDayTime} className="p-6 text-center">
                        <div className="text-[2.5em] font-[900] gx-gradient-text leading-none">
                            {value}{suffix}
                        </div>
                        <div className={`text-[0.72em] font-[600] uppercase tracking-wider mt-2 ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
                            {label}
                        </div>
                    </FxHoloCard>
                </FxReveal>
            ))}
        </div>
    );
}
