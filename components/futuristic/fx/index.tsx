'use client';

/**
 * Futuristic FX design-system primitives.
 * All components are daytime-aware via the `day` prop, keep the teal brand,
 * and degrade gracefully with prefers-reduced-motion (handled in globals.css).
 *
 * Usage: wrap a section in <FxBackground day={isDayTime}> for grid+aurora,
 * use <FxCard>, <FxChip>, <FxSectionHeading>, <FxButton> for consistent UI.
 */

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

type DayProp = { day?: boolean };

/* ---------- Animated grid + aurora background layer ---------- */
export function FxBackground({
    day,
    grid = true,
    aurora = true,
    className = '',
}: DayProp & { grid?: boolean; aurora?: boolean; className?: string }) {
    return (
        <div data-day={day ? 'true' : 'false'} className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden>
            {grid && <div className="gx-grid" />}
            {aurora && (
                <div className="gx-aurora">
                    <span /><span /><span />
                </div>
            )}
        </div>
    );
}

/* ---------- Glass / holographic card ---------- */
export function FxCard({
    day,
    glow = false,
    className = '',
    children,
    ...rest
}: DayProp & { glow?: boolean; className?: string; children: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>) {
    const inner = (
        <div data-day={day ? 'true' : 'false'} className={`gx-card ${className}`} {...rest}>
            {children}
        </div>
    );
    if (!glow) return inner;
    return (
        <div className="gx-glow-border">
            {inner}
        </div>
    );
}

/* ---------- Chip / pill label ---------- */
export function FxChip({
    day,
    children,
    className = '',
}: DayProp & { children: React.ReactNode; className?: string }) {
    return (
        <span data-day={day ? 'true' : 'false'} className={`gx-chip ${className}`}>
            <span className="gx-dot" />
            {children}
        </span>
    );
}

/* ---------- Section heading with eyebrow + gradient accent ---------- */
export function FxSectionHeading({
    day,
    eyebrow,
    title,
    accent,
    subtitle,
    align = 'left',
    className = '',
}: DayProp & {
    eyebrow?: string;
    title: React.ReactNode;
    accent?: string;
    subtitle?: React.ReactNode;
    align?: 'left' | 'center';
    className?: string;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className={`${align === 'center' ? 'text-center mx-auto' : ''} max-w-3xl ${className}`}
        >
            {eyebrow && (
                <div className={align === 'center' ? 'flex justify-center mb-4' : 'mb-4'}>
                    <FxChip day={day}>{eyebrow}</FxChip>
                </div>
            )}
            <h2 className="text-[2em] md:text-[2.6em] lg:text-[3.2em] font-[700] leading-[1.1] tracking-tight">
                {title} {accent && <span className="gx-gradient-text">{accent}</span>}
            </h2>
            {subtitle && (
                <p className={`mt-4 text-[0.95em] lg:text-[1.05em] font-[300] leading-[1.6] ${day ? 'text-gray-600' : 'text-gray-300'}`}>
                    {subtitle}
                </p>
            )}
        </motion.div>
    );
}

/* ---------- Futuristic button (link or action) ---------- */
export function FxButton({
    day,
    href,
    onClick,
    children,
    variant = 'solid',
    className = '',
}: DayProp & {
    href?: string;
    onClick?: () => void;
    children: React.ReactNode;
    variant?: 'solid' | 'ghost';
    className?: string;
}) {
    const base =
        'group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3 text-[0.9em] font-[600] tracking-tight transition-all duration-300 grey-squish';
    const styles =
        variant === 'solid'
            ? 'text-[#04110f] bg-gradient-to-r from-teal-400 to-cyan-400 shadow-[0_10px_30px_-10px_rgba(34,211,238,.8)] hover:shadow-[0_16px_40px_-10px_rgba(45,212,191,.9)] hover:-translate-y-0.5'
            : day
              ? 'text-teal-800 border border-teal-700/30 hover:border-teal-600 hover:bg-teal-50'
              : 'text-teal-100 border border-white/20 hover:border-teal-300/60 hover:bg-white/5';

    const content = (
        <>
            <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
            {variant === 'solid' && (
                <span className="absolute inset-0 -translate-x-full bg-white/30 blur-md transition-transform duration-500 group-hover:translate-x-full" />
            )}
        </>
    );

    if (href) {
        return (
            <Link href={href} className={`${base} ${styles} ${className}`}>
                {content}
            </Link>
        );
    }
    return (
        <button type="button" onClick={onClick} className={`${base} ${styles} ${className}`}>
            {content}
        </button>
    );
}

/* ---------- Reveal wrapper (scroll-in animation) ---------- */
export function FxReveal({
    children,
    delay = 0,
    y = 28,
    className = '',
}: {
    children: React.ReactNode;
    delay?: number;
    y?: number;
    className?: string;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, delay, ease: [0.2, 0.7, 0.2, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

/* ---------- Section wrapper that auto-applies daytime bg + futuristic layer ---------- */
export function FxSection({
    day,
    tone = 'base',
    background = true,
    id,
    className = '',
    children,
}: DayProp & {
    tone?: 'base' | 'invert' | 'teal';
    background?: boolean;
    id?: string;
    className?: string;
    children: React.ReactNode;
}) {
    const toneClass =
        tone === 'teal'
            ? day
                ? 'bg-teal-900 text-white'
                : 'bg-teal-50 text-teal-900'
            : tone === 'invert'
              ? day
                  ? 'bg-black text-white'
                  : 'bg-white text-black'
              : day
                ? 'bg-white text-black'
                : 'bg-black text-white';

    return (
        <section
            id={id}
            data-bg={day ? 'light' : 'dark'}
            className={`relative overflow-hidden transition-colors duration-500 ${toneClass} ${className}`}
        >
            {background && tone !== 'teal' && <FxBackground day={day} />}
            <div className="relative z-10">{children}</div>
        </section>
    );
}

/* ══════════════════════════════════════════════════════
   EXTENDED FX PRIMITIVES v3 — scanlines, glitch, orbit,
   terminal, stat bars, full-bleed hero layer
   ══════════════════════════════════════════════════════ */

/* ---------- Full-bleed futuristic hero wrapper ---------- */
export function FxHero({
    day,
    children,
    minHeight = '78vh',
    className = '',
    scanline = true,
    orbit = true,
}: DayProp & {
    children: React.ReactNode;
    minHeight?: string;
    className?: string;
    scanline?: boolean;
    orbit?: boolean;
}) {
    return (
        <section
            data-day={day ? 'true' : 'false'}
            className={`relative isolate overflow-hidden flex flex-col justify-end ${className}`}
            style={{ minHeight }}
        >
            {/* Base FX layer */}
            <FxBackground day={day} grid aurora />
            {/* Scanline shimmer */}
            {scanline && <div className="gx-scanline pointer-events-none" />}
            {/* Noise texture */}
            <div className="gx-noise-overlay" />
            {/* Hero scan highlight */}
            <div className="gx-hero-scan" />
            {/* Orbit rings */}
            {orbit && (
                <>
                    <div className="gx-orbit" style={{ width: '60vmax', height: '60vmax', top: '-10vmax', right: '-20vmax', opacity: .3 }} />
                    <div className="gx-orbit gx-orbit-reverse" style={{ width: '40vmax', height: '40vmax', top: '5vmax', right: '-5vmax', opacity: .2 }} />
                </>
            )}
            {/* Content */}
            <div className="relative z-10 w-full">{children}</div>
        </section>
    );
}

/* ---------- Rotating orbit ring decoration ---------- */
export function FxOrbit({
    size = 400,
    top,
    right,
    left,
    bottom,
    speed = 20,
    reverse = false,
    opacity = 0.25,
    dotColor = '#2dd4bf',
}: {
    size?: number;
    top?: string | number;
    right?: string | number;
    left?: string | number;
    bottom?: string | number;
    speed?: number;
    reverse?: boolean;
    opacity?: number;
    dotColor?: string;
}) {
    return (
        <div
            aria-hidden
            className={`pointer-events-none absolute rounded-full border border-[rgba(45,212,191,0.18)] ${reverse ? 'gx-orbit-reverse' : 'gx-orbit'}`}
            style={{
                width: size,
                height: size,
                top,
                right,
                left,
                bottom,
                opacity,
                animationDuration: `${speed}s`,
                '--dot-color': dotColor,
            } as React.CSSProperties}
        />
    );
}

/* ---------- Terminal / typewriter code block ---------- */
export function FxTerminal({
    lines,
    day,
    className = '',
}: DayProp & { lines: string[]; className?: string }) {
    return (
        <div
            data-day={day ? 'true' : 'false'}
            className={`gx-hologram-card p-5 gx-terminal-text text-[0.78em] ${className}`}
        >
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-teal-400/15">
                <span className="w-3 h-3 rounded-full bg-red-500/70" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <span className="w-3 h-3 rounded-full bg-green-500/70" />
                <span className="ml-2 text-[0.9em] text-white/40 tracking-wider">grey ~ terminal</span>
            </div>
            {lines.map((line, i) => (
                <div key={i} className="flex gap-3">
                    <span className="text-teal-600/60 select-none">{'>'}</span>
                    <span className={line.startsWith('#') ? 'text-teal-500/60' : 'text-teal-200/90'}>{line}</span>
                </div>
            ))}
            <div className="flex gap-3 mt-1">
                <span className="text-teal-600/60 select-none">{'>'}</span>
                <span className="w-2 h-[1em] bg-teal-400/80 inline-block" style={{ animation: 'gxBlink 1.2s step-end infinite' }} />
            </div>
        </div>
    );
}

/* ---------- Animated stat/metric bar ---------- */
export function FxStatBar({
    day,
    label,
    value,
    percent,
    className = '',
}: DayProp & { label: string; value: string; percent: number; className?: string }) {
    return (
        <div className={`space-y-1.5 ${className}`}>
            <div className="flex justify-between items-center">
                <span className={`text-[0.72em] font-[600] uppercase tracking-[0.08em] ${day ? 'text-gray-600' : 'text-gray-400'}`}>{label}</span>
                <span className="gx-data-pill text-[0.7em]">{value}</span>
            </div>
            <div className="gx-stat-bar">
                <div
                    className="gx-stat-bar-fill"
                    style={{ '--gx-bar-w': `${percent}%` } as React.CSSProperties}
                />
            </div>
        </div>
    );
}

/* ---------- Glitch text heading ---------- */
export function FxGlitchText({
    children,
    tag: Tag = 'h2',
    className = '',
}: {
    children: React.ReactNode;
    tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'span';
    className?: string;
}) {
    return (
        <Tag className={`gx-glitch cursor-default select-none ${className}`}>
            {children}
        </Tag>
    );
}

/* ---------- Holographic data card ---------- */
export function FxHoloCard({
    day,
    className = '',
    children,
    ...rest
}: DayProp & { className?: string; children: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            data-day={day ? 'true' : 'false'}
            className={`gx-hologram-card ${className}`}
            {...rest}
        >
            {children}
        </div>
    );
}

/* ---------- Corner-bracketed media frame ---------- */
export function FxFrame({
    children,
    className = '',
    glow = true,
}: { children: React.ReactNode; className?: string; glow?: boolean }) {
    return (
        <div className={`relative ${className}`}>
            {/* Corner brackets */}
            <div className="absolute -top-2.5 -left-2.5 w-7 h-7 border-t-2 border-l-2 border-teal-400/70 rounded-tl z-10 animate-pulse" />
            <div className="absolute -top-2.5 -right-2.5 w-7 h-7 border-t-2 border-r-2 border-teal-400/70 rounded-tr z-10 animate-pulse" />
            <div className="absolute -bottom-2.5 -left-2.5 w-7 h-7 border-b-2 border-l-2 border-teal-400/70 rounded-bl z-10 animate-pulse" />
            <div className="absolute -bottom-2.5 -right-2.5 w-7 h-7 border-b-2 border-r-2 border-teal-400/70 rounded-br z-10 animate-pulse" />
            {/* Glow */}
            {glow && (
                <div className="absolute inset-0 rounded-xl pointer-events-none"
                    style={{ boxShadow: '0 0 40px -12px rgba(45,212,191,0.45)' }} />
            )}
            {/* Scanline overlay */}
            <div className="absolute inset-0 pointer-events-none rounded-xl overflow-hidden z-[2]"
                style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(45,212,191,0.03) 3px, rgba(45,212,191,0.03) 4px)' }} />
            <div className="relative rounded-xl overflow-hidden">{children}</div>
        </div>
    );
}

/* ══════════════════════════════════════════════════════
   FxStickyScrollSection — shared sticky-left/scroll-right
   layout used for "Development Solutions", "Development
   Process", "Service Solutions" across all pages.
   ══════════════════════════════════════════════════════ */
export type FxScrollItem = {
    id: string;        // e.g. "01"
    title: string;
    target: string;    // DOM id for scrollTo
    tags?: string[];
    body: React.ReactNode;
};

export function FxStickyScrollSection({
    day,
    heading,
    intro,
    navLabel = 'Our Solutions',
    items,
    activeId,
    onNavClick,
}: DayProp & {
    heading: React.ReactNode;
    intro?: React.ReactNode;
    navLabel?: string;
    items: FxScrollItem[];
    activeId: string;
    onNavClick: (target: string) => void;
}) {
    const mutedText = day ? 'text-gray-500' : 'text-white/45';
    const borderCol = day ? 'border-gray-200' : 'border-white/10';

    return (
        <section className={`relative isolate ${day ? 'bg-white' : 'bg-[#050810]'}`}>
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <FxBackground day={day} grid aurora />
                <FxOrbit size={700} top="-150px" right="-200px" opacity={0.12} speed={35} />
                <FxOrbit size={400} top="200px" left="-150px" opacity={0.10} speed={28} reverse />
            </div>

            <div className="relative z-10 lg:pt-[4em] md:pt-[3em] pt-[2em] lg:pb-[7em] md:pb-[5em] pb-[3em] max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em]">

                {/* Heading row */}
                <FxReveal className={`relative grid lg:grid-cols-2 grid-cols-1 gap-4 mb-12 border-b pb-[3em] ${borderCol}`}>
                    <FxSectionHeading day={day} title={heading} />
                    {intro && (
                        <p className={`text-[0.87em] font-[400] leading-[1.6] lg:-ml-[7.5em] tracking-normal ${mutedText}`}>
                            {intro}
                        </p>
                    )}
                </FxReveal>

                {/* Sticky scroll grid */}
                <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-16 lg:mt-16 md:mt-12 mt-6 items-start">

                    {/* Left sticky nav */}
                    <div className="lg:sticky md:sticky top-28 self-start z-20 lg:mr-[11em]">
                        <div className="relative overflow-hidden rounded-[1.5rem] border border-teal-400/15 bg-white/[0.03] p-5 shadow-[0_0_40px_-18px_rgba(45,212,191,0.6)] backdrop-blur-xl">
                            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(45,212,191,0.16),transparent_42%)]" />
                            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal-400/70 to-transparent" />
                            <FxChip day={day} className="relative mb-5">{navLabel}</FxChip>
                            <p className={`relative text-[0.76em] font-[300] leading-[1.7] ${mutedText}`}>
                                Guided startup solutions, arranged as a futuristic command stack.
                            </p>
                        </div>
                        <nav className="space-y-1 mt-5">
                            {items.map((item, index) => {
                                const isActive = activeId === item.target;
                                return (
                                    <FxReveal key={index} delay={0.05 * index}>
                                        <button
                                            onClick={() => onNavClick(item.target)}
                                            className={`group w-full text-left flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 border ${
                                                isActive
                                                    ? 'bg-teal-400/10 border-teal-400/30 shadow-[0_0_20px_-6px_rgba(45,212,191,0.4)]'
                                                    : `border-transparent hover:border-teal-400/15 hover:bg-teal-400/5 ${mutedText}`
                                            }`}
                                        >
                                            <span className={`text-[0.7em] font-[700] tracking-wider tabular-nums shrink-0 ${isActive ? 'text-teal-400' : mutedText}`}>
                                                {item.id}
                                            </span>
                                            <span className={`text-[0.9em] font-[500] leading-snug ${isActive ? (day ? 'text-black' : 'text-white') : ''}`}>
                                                {item.title}
                                            </span>
                                            {isActive && <span className="ml-auto text-teal-400 text-[1.1em]">→</span>}
                                        </button>
                                    </FxReveal>
                                );
                            })}
                        </nav>
                    </div>

                    {/* Right scrollable content */}
                    <div className="lg:-ml-[8em] md:-ml-[8em] lg:mb-[30em] md:mb-[30em]">
                        {items.map((item, index) => (
                            <FxReveal key={index} delay={0.08 * index} className={index < items.length - 1 ? 'mb-20 lg:mb-44' : ''}>
                                <div id={item.target} className="scroll-mt-28">
                                    <FxHoloCard day={day} className="p-6 lg:p-8 border border-teal-400/10 shadow-[0_0_50px_-24px_rgba(45,212,191,0.35)]">
                                        <div className="flex items-start gap-4 mb-4">
                                            <span className={`text-[0.7em] font-[700] tabular-nums shrink-0 mt-1 ${mutedText}`}>{item.id}/</span>
                                            <h2 className={`text-[1.4em] font-[600] leading-snug ${day ? 'text-gray-900' : 'text-white'}`}>{item.title}</h2>
                                        </div>
                                        {item.tags && item.tags.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mb-5">
                                                {item.tags.map((tag, t) => <FxChip key={t} day={day}>{tag}</FxChip>)}
                                            </div>
                                        )}
                                        <div className={`text-[0.85em] font-[300] leading-[1.6] text-justify ${mutedText}`}>
                                            {item.body}
                                        </div>
                                    </FxHoloCard>
                                </div>
                            </FxReveal>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
