'use client';

/**
 * Futuristic FX design-system primitives.
 * All components are daytime-aware via the `day` prop, keep the teal brand,
 * and degrade gracefully with prefers-reduced-motion (handled in globals.css).
 *
 * Usage: wrap a section in <FxBackground day={isDayTime}> for grid+aurora,
 * use <FxCard>, <FxChip>, <FxSectionHeading>, <FxButton> for consistent UI.
 */

import React, {useEffect, useRef, useState} from 'react';
import {motion} from 'framer-motion';
import Link from 'next/link';
import CountUp from 'react-countup';

type DayProp = { day?: boolean };

/* ---------- Animated grid + aurora background layer ---------- */
export function FxBackground({
                                 day,
                                 grid = true,
                                 aurora = true,
                                 className = '',
                             }: DayProp & { grid?: boolean; aurora?: boolean; className?: string }) {
    return (
        <div data-day={day ? 'true' : 'false'} className={`pointer-events-none absolute inset-0 ${className}`}
             aria-hidden>
            {grid && <div className="gx-grid"/>}
            {aurora && (
                <div className="gx-aurora">
                    <span/><span/><span/>
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
                       }: DayProp & {
    glow?: boolean;
    className?: string;
    children: React.ReactNode
} & React.HTMLAttributes<HTMLDivElement>) {
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
                           colorScheme = 'teal',
                       }: DayProp & {
    children: React.ReactNode;
    className?: string;
    colorScheme?: 'teal' | string; // fallback to teal for any legacy values
}) {
    // Only teal is the supported color scheme; other values will render as teal for safety.
    // Color scheme mapping for chip styles — force teal for everything
    const chipClass = '';
    const dotClass = 'gx-dot';

    return (
        <span data-day={day ? 'true' : 'false'} className={`gx-chip ${chipClass} ${className}`}>
            <span className={dotClass}/>
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
                                     accentClassName = 'text-[var(--page-accent)]',
                                 }: DayProp & {
    eyebrow?: string;
    title: React.ReactNode;
    accent?: string;
    subtitle?: React.ReactNode;
    align?: 'left' | 'center';
    className?: string;
    accentClassName?: string;
}) {
    return (
        <motion.div
            initial={{opacity: 0, y: 24}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, amount: 0.4}}
            transition={{duration: 0.6}}
            className={`${align === 'center' ? 'text-center mx-auto' : ''} max-w-3xl ${className}`}
        >
            {eyebrow && (
                <div className={align === 'center' ? 'flex justify-center mb-4' : 'mb-4'}>
                    <FxChip day={day}>{eyebrow}</FxChip>
                </div>
            )}
            <h2 className="text-[2em] md:text-[2.6em] lg:text-[3.2em] font-[700] leading-[1.1] tracking-tight">
                {title} {accent && <span className={`${accentClassName} bg-clip-text`}>{accent}</span>}
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
                             onClickAction,
                             children,
                             variant = 'solid',
                             className = '',
                             colorScheme = 'teal',
                         }: DayProp & {
    href?: string;
    onClickAction?: () => void;
    children: React.ReactNode;
    variant?: 'solid' | 'ghost';
    className?: string;
    colorScheme?: 'teal' | string; // fallback: treat other values as teal
}) {
    const base =
        'group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3 text-[0.9em] font-[600] tracking-tight transition-all duration-300 grey-squish';

    // Color scheme mapping for buttons — only teal (page-accent falls back to teal)
    const colorMap = {
        teal: {
            solid: 'text-white bg-teal-400/60 shadow-[0_10px_30px_-10px_rgba(20,184,166,0.35)] hover:shadow-[0_16px_40px_-10px_rgba(20,184,166,0.55)] hover:-translate-y-0.5',
            ghostLight: 'text-[#0d9488] border border-[#0d9488]/20 hover:border-[#0d9488]/40 hover:bg-[#e6fffb]',
            ghostDark: 'text-[#ecfeff] border border-white/10 hover:border-[#0d9488]/40 hover:bg-white/5'
        },
        'page-accent': {
            // page-accent uses the same teal mapping to ensure consistency across the app
            solid: 'text-white bg-gradient-to-r from-[#14b8a6] to-[#0d9488] shadow-[0_10px_30px_-10px_rgba(20,184,166,0.35)] hover:shadow-[0_16px_40px_-10px_rgba(20,184,166,0.55)] hover:-translate-y-0.5',
            ghostLight: 'text-[#0d9488] border border-[#0d9488]/20 hover:border-[#0d9488]/40 hover:bg-[#e6fffb]',
            ghostDark: 'text-[#ecfeff] border border-white/10 hover:border-[#0d9488]/40 hover:bg-white/5'
        }
    };

    const colors = colorMap[colorScheme as keyof typeof colorMap] || colorMap.teal;
    const styles =
        variant === 'solid'
            ? colors.solid
            : day
                ? colors.ghostLight
                : colors.ghostDark;

    const content = (
        <>
            <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
            {variant === 'solid' && (
                <span
                    className="absolute inset-0 -translate-x-full bg-white/30 blur-md transition-transform duration-500 group-hover:translate-x-full"/>
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
        <button type="button" onClick={onClickAction} className={`${base} ${styles} ${className}`}>
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
            initial={{opacity: 0, y}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, amount: 0.25}}
            transition={{duration: 0.6, delay, ease: [0.2, 0.7, 0.2, 1]}}
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
            {background && tone !== 'teal' && <FxBackground day={day}/>}
            <div className="relative z-10">{children}</div>
        </section>
    );
}

/*  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  - 
   EXTENDED FX PRIMITIVES v3  - scanlines, glitch, orbit,
   terminal, stat bars, full-bleed hero layer
    -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  */

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
            style={{minHeight}}
        >
            {/* Base FX layer */}
            <FxBackground day={day} grid aurora/>
            {/* Scanline shimmer */}
            {scanline && <div className="gx-scanline pointer-events-none"/>}
            {/* Noise texture */}
            <div className="gx-noise-overlay"/>
            {/* Hero scan highlight */}
            <div className="gx-hero-scan"/>
            {/* Orbit rings */}
            {orbit && (
                <>
                    <div className="gx-orbit"
                         style={{width: '60vmax', height: '60vmax', top: '-10vmax', right: '-20vmax', opacity: .3}}/>
                    <div className="gx-orbit gx-orbit-reverse"
                         style={{width: '40vmax', height: '40vmax', top: '5vmax', right: '-5vmax', opacity: .2}}/>
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
                <span className="w-3 h-3 rounded-full bg-red-500/70"/>
                <span className="w-3 h-3 rounded-full bg-yellow-500/70"/>
                <span className="w-3 h-3 rounded-full bg-green-500/70"/>
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
                <span className="w-2 h-[1em] bg-teal-400/80 inline-block"
                      style={{animation: 'gxBlink 1.2s step-end infinite'}}/>
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
                <span
                    className={`text-[0.72em] font-[600] uppercase tracking-[0.08em] ${day ? 'text-gray-600' : 'text-gray-400'}`}>{label}</span>
                <span className="gx-data-pill text-[0.7em]">{value}</span>
            </div>
            <div className="gx-stat-bar">
                <div
                    className="gx-stat-bar-fill"
                    style={{'--gx-bar-w': `${percent}%`} as React.CSSProperties}
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
                           }: DayProp & {
    className?: string;
    children: React.ReactNode
} & React.HTMLAttributes<HTMLDivElement>) {
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
            <div
                className="absolute -top-2.5 -left-2.5 w-7 h-7 border-t-2 border-l-2 border-teal-400/70 rounded-tl z-10 animate-pulse"/>
            <div
                className="absolute -top-2.5 -right-2.5 w-7 h-7 border-t-2 border-r-2 border-teal-400/70 rounded-tr z-10 animate-pulse"/>
            <div
                className="absolute -bottom-2.5 -left-2.5 w-7 h-7 border-b-2 border-l-2 border-teal-400/70 rounded-bl z-10 animate-pulse"/>
            <div
                className="absolute -bottom-2.5 -right-2.5 w-7 h-7 border-b-2 border-r-2 border-teal-400/70 rounded-br z-10 animate-pulse"/>
            {/* Glow */}
            {glow && (
                <div className="absolute inset-0 rounded-xl pointer-events-none"
                     style={{boxShadow: '0 0 40px -12px rgba(45,212,191,0.45)'}}/>
            )}
            {/* Scanline overlay */}
            <div className="absolute inset-0 pointer-events-none rounded-xl overflow-hidden z-[2]"
                 style={{backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(45,212,191,0.03) 3px, rgba(45,212,191,0.03) 4px)'}}/>
            <div className="relative rounded-xl overflow-hidden">{children}</div>
        </div>
    );
}

/*  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  - 
   FxStickyScrollSection  - shared sticky-left/scroll-right
   layout used for "Development Solutions", "Development
   Process", "Service Solutions" across all pages.
    -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  */
export type FxMetric = {
    id?: string | number;
    label: string;
    value: string;
    description?: React.ReactNode;
    details?: string[]
};

export type FxScrollItem = {
    id: string;        // e.g. "01"
    title: string;
    target: string;    // DOM id for scrollTo
    tags?: string[];
    body: React.ReactNode;
    metrics?: FxMetric[]; // optional structured metrics (value, label, description)
    deliverables?: string[]; // optional deliverables list
    cta?: { label: string; href: string };
    // Optional timeline & engagement metadata (rendered in CTA/meta column)
    timeline?: string;
    engagement?: string;
};

export function FxStickyScrollSection({
                                          day,
                                          heading,
                                          intro,
                                          navLabel = 'Our Solutions',
                                          items,
                                          activeId,
                                          onNavClickAction,
                                          colorScheme = 'teal',
                                      }: DayProp & {
    heading: React.ReactNode;
    intro?: React.ReactNode;
    navLabel?: string;
    items: FxScrollItem[];
    activeId: string;
    onNavClickAction: (target: string) => void;
    colorScheme?: 'teal' | 'purple' | 'cyan' | 'orange' | 'page-accent';
}) {
    const mutedText = day ? 'text-gray-500' : 'text-white/45';
    const borderCol = day ? 'border-gray-200' : 'border-white/10';
    const bgColor = day ? 'bg-white' : 'bg-black';
    const textColor = day ? 'text-black' : 'text-white';

    // Color scheme mappings
    const colorMap = {
        teal: {
            rail: 'border-teal-400/15 shadow-[0_0_60px_-20px_rgba(45,212,191,0.65)]',
            grad1: 'bg-[radial-gradient(circle_at_top_left,rgba(45,212,191,0.18),transparent_46%)]',
            grad2: 'via-teal-400/80',
            grad3: 'via-teal-400/20',
            active: 'bg-teal-400/10 border-teal-400/30 shadow-[0_0_24px_-8px_rgba(45,212,191,0.55)]',
            hover: 'border-teal-400/15 hover:bg-teal-400/5',
            accent: 'text-teal-400',
            cardBorder: 'border-teal-400/10 shadow-[0_0_50px_-24px_rgba(45,212,191,0.35)]',
            metricBorder: 'border-teal-400/8',
            topGrad: 'via-teal-400/80',
            leftGrad: 'via-teal-400/20',
            orbGrad: 'bg-[radial-gradient(circle_at_top,rgba(45,212,191,0.08),transparent_38%)]',
        },
        purple: {
            rail: 'border-purple-400/15 shadow-[0_0_60px_-20px_rgba(139,92,246,0.65)]',
            grad1: 'bg-[radial-gradient(circle_at_top_left,rgba(139,92,246,0.18),transparent_46%)]',
            grad2: 'via-purple-400/80',
            grad3: 'via-purple-400/20',
            active: 'bg-purple-400/10 border-purple-400/30 shadow-[0_0_24px_-8px_rgba(139,92,246,0.55)]',
            hover: 'border-purple-400/15 hover:bg-purple-400/5',
            accent: 'text-purple-400',
            cardBorder: 'border-purple-400/10 shadow-[0_0_50px_-24px_rgba(139,92,246,0.35)]',
            metricBorder: 'border-purple-400/8',
            topGrad: 'via-purple-400/80',
            leftGrad: 'via-purple-400/20',
            orbGrad: 'bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.08),transparent_38%)]',
        },
        cyan: {
            rail: 'border-cyan-400/15 shadow-[0_0_60px_-20px_rgba(34,211,238,0.65)]',
            grad1: 'bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.18),transparent_46%)]',
            grad2: 'via-cyan-400/80',
            grad3: 'via-cyan-400/20',
            active: 'bg-cyan-400/10 border-cyan-400/30 shadow-[0_0_24px_-8px_rgba(34,211,238,0.55)]',
            hover: 'border-cyan-400/15 hover:bg-cyan-400/5',
            accent: 'text-cyan-400',
            cardBorder: 'border-cyan-400/10 shadow-[0_0_50px_-24px_rgba(34,211,238,0.35)]',
            metricBorder: 'border-cyan-400/8',
            topGrad: 'via-cyan-400/80',
            leftGrad: 'via-cyan-400/20',
            orbGrad: 'bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.08),transparent_38%)]',
        },
        orange: {
            rail: 'border-orange-400/15 shadow-[0_0_60px_-20px_rgba(249,115,22,0.65)]',
            grad1: 'bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.18),transparent_46%)]',
            grad2: 'via-orange-400/80',
            grad3: 'via-orange-400/20',
            active: 'bg-orange-400/10 border-orange-400/30 shadow-[0_0_24px_-8px_rgba(249,115,22,0.55)]',
            hover: 'border-orange-400/15 hover:bg-orange-400/5',
            accent: 'text-orange-400',
            cardBorder: 'border-orange-400/10 shadow-[0_0_50px_-24px_rgba(249,115,22,0.35)]',
            metricBorder: 'border-orange-400/8',
            topGrad: 'via-orange-400/80',
            leftGrad: 'via-orange-400/20',
            orbGrad: 'bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.08),transparent_38%)]',
        },
        'page-accent': {
            rail: 'border-[rgba(var(--page-accent-rgb),0.15)] shadow-[0_0_60px_-20px_rgba(var(--page-accent-rgb),0.65)]',
            grad1: 'bg-[radial-gradient(circle_at_top_left,rgba(var(--page-accent-rgb),0.18),transparent_46%)]',
            grad2: 'via-[rgb(var(--page-accent-rgb))] via-opacity-80',
            grad3: 'via-[rgb(var(--page-accent-rgb))] via-opacity-20',
            active: 'bg-[rgba(var(--page-accent-rgb),0.1)] border-[rgba(var(--page-accent-rgb),0.3)] shadow-[0_0_24px_-8px_rgba(var(--page-accent-rgb),0.55)]',
            hover: 'border-[rgba(var(--page-accent-rgb),0.15)] hover:bg-[rgba(var(--page-accent-rgb),0.05)]',
            accent: 'text-[var(--page-accent)]',
            cardBorder: 'border-[rgba(var(--page-accent-rgb),0.1)] shadow-[0_0_50px_-24px_rgba(var(--page-accent-rgb),0.35)]',
            metricBorder: 'border-[rgba(var(--page-accent-rgb),0.08)]',
            topGrad: 'via-[rgb(var(--page-accent-rgb))] via-opacity-80',
            leftGrad: 'via-[rgb(var(--page-accent-rgb))] via-opacity-20',
            orbGrad: 'bg-[radial-gradient(circle_at_top,rgba(var(--page-accent-rgb),0.08),transparent_38%)]',
        },
    };

    const colors = colorMap[colorScheme];
    const sectionRef = useRef<HTMLElement | null>(null);
    const headerRef = useRef<HTMLDivElement | null>(null);
    const railRef = useRef<HTMLDivElement | null>(null);

    // Track whether the final (last) item is visibly within the viewport
    const [isEndVisible, setIsEndVisible] = useState(false);

    useEffect(() => {
        // Robust end-of-list detection using IntersectionObserver (falls back to midpoint check if unavailable)
        const lastTarget = items[items.length - 1]?.target;
        if (!lastTarget) {
            setIsEndVisible(false);
            return;
        }

        const el = document.getElementById(lastTarget);
        if (!el) {
            setIsEndVisible(false);
            return;
        }

        if ('IntersectionObserver' in window) {
            const obs = new IntersectionObserver((entries) => {
                const e = entries[0];
                // visible when at least 50% of the final card is in view
                setIsEndVisible(e.isIntersecting && e.intersectionRatio >= 0.5);
            }, {threshold: [0.5]});

            obs.observe(el);
            // initial check is handled by observer firing immediately in many browsers; keep explicit fallback
            return () => {
                obs.disconnect();
            };
        }

        // Fallback: midpoint check (legacy)
        const checkEnd = () => {
            const rect = el.getBoundingClientRect();
            const vh = window.innerHeight;
            const mid = rect.top + rect.height / 2;
            setIsEndVisible(mid >= vh * 0.45 && mid <= vh * 1.05);
        };

        checkEnd();
        if (typeof window !== 'undefined') {
            (window as any).addEventListener('scroll', checkEnd, {passive: true});
            (window as any).addEventListener('resize', checkEnd);
        }
        return () => {
            if (typeof window !== 'undefined') {
                (window as any).removeEventListener('scroll', checkEnd);
                (window as any).removeEventListener('resize', checkEnd);
            }
        };
    }, [items.length]);

    // Use CSS sticky for the left rail (more robust). JavaScript pinning introduced layout bugs
    // on pages with overlapping/negative-margin sections; CSS sticky is simpler and works across layouts.
    // Keep the activeId-based fade-out behavior but remove manual positioning logic.


    return (
        <section ref={sectionRef} className={`relative isolate overflow-visible ${bgColor} ${textColor}`}>
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <FxBackground day={day} grid aurora/>
                <FxOrbit size={700} top="-150px" right="-200px" opacity={0.12} speed={35}/>
                <FxOrbit size={400} top="200px" left="-150px" opacity={0.10} speed={28} reverse/>
                <div className={`absolute inset-0 ${colors.orbGrad}`}/>
                {/* Additional purple gradient overlays for enhanced color cohesion */}
                {colorScheme === 'purple' && (
                    <>
                        <div
                            className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle_at_right_top,rgba(139,92,246,0.12),transparent_60%)] pointer-events-none"/>
                        <div
                            className="absolute bottom-1/3 left-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.08),transparent_70%)] pointer-events-none"/>
                    </>
                )}
            </div>

            <div
                className="relative z-10 lg:pt-[4em] md:pt-[3em] pt-[2em] lg:pb-[7em] md:pb-[5em] pb-[3em] max-w-auto w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em]">

                {/* Heading row */}
                <div ref={headerRef}>
                    <FxReveal
                        className={`relative grid lg:grid-cols-2 grid-cols-1 gap-4 mb-12 border-b pb-[3em] ${borderCol}`}>
                        <FxSectionHeading day={day} title={heading}/>
                        {intro && (
                            <p className={`text-[0.87em] font-[400] leading-[1.6] lg:-ml-[7.5em] tracking-normal ${day ? 'text-gray-600' : 'text-white/60'}`}>
                                {intro}
                            </p>
                        )}
                    </FxReveal>
                </div>

                {/* Sticky scroll grid */}
                <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 lg:mt-16 md:mt-12 mt-6 items-start">

                    {/* Left sticky rail - fade out on last item */}
                    <aside
                        className={`z-20 w-full lg:w-[44%] lg:max-w-[500px] shrink-0 lg:sticky lg:top-[96px] lg:self-start transition-opacity duration-700 ease-in-out ${
                            (isEndVisible || activeId === items[items.length - 1]?.target) ? 'lg:opacity-0 lg:pointer-events-none' : 'lg:opacity-100'
                        }`}
                    >
                        <div
                            ref={railRef}
                            className={`relative overflow-hidden rounded-[1.75rem] border ${colors.rail} bg-white/[0.03] p-6 backdrop-blur-2xl`}
                        >
                            <div
                                className={`pointer-events-none absolute inset-0 ${colors.grad1}`}/>
                            <div
                                className={`pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent ${colors.grad2} to-transparent`}/>
                            <div
                                className={`pointer-events-none absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent ${colors.grad3} to-transparent`}/>

                            <FxChip day={day} className="relative mb-5">{navLabel}</FxChip>
                            <h3 className={`relative text-[1.5em] lg:text-[2.3em] font-[700] leading-[1.05] tracking-tight ${day ? 'text-gray-900' : 'text-white'}`}>
                                Command <span className={colors.accent}>stack</span>
                            </h3>
                            <p className={`relative mt-4 text-[0.75em] lg:text-[0.78em] font-[300] leading-[1.6] lg:leading-[1.7] ${day ? 'text-gray-600' : 'text-white/55'}`}>
                                A guided experience for startup solutions, designed like a futuristic mission control
                                panel.
                            </p>

                            <div className="relative mt-6 space-y-1.5">
                                {items.map((item, index) => {
                                    const isActive = activeId === item.target;
                                    return (
                                        <button
                                            key={index}
                                            onClick={() => onNavClickAction(item.target)}
                                            className={`group w-full text-left flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300 border text-[0.82em] lg:text-[0.9em] ${
                                                isActive
                                                    ? colors.active
                                                    : `border-transparent ${colors.hover} ${mutedText}`
                                            }`}
                                        >
                                            <span
                                                className={`flex h-7 w-7 items-center justify-center rounded-full border text-[0.68em] font-[700] tabular-nums shrink-0 ${isActive ? `${colors.accent} border-current/60` : (day ? 'border-gray-200 text-gray-400' : 'border-white/10 text-white/40')}`}>
                                                {item.id}
                                            </span>
                                            <span
                                                className={`text-[0.85em] lg:text-[0.9em] font-[500] leading-snug ${isActive ? (day ? 'text-gray-900' : 'text-white') : (day ? 'text-gray-700' : 'text-white/70')}`}>
                                                {item.title}
                                            </span>
                                            {isActive && <span
                                                className={`ml-auto ${colors.accent} text-[1em] lg:text-[1.1em]`}>→</span>}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </aside>

                    {/* Right scrollable content */}
                    <div className="min-w-0 flex-1 lg:pt-2 space-y-6 lg:space-y-16">
                        {items.map((item, index) => (
                            <FxReveal key={index} delay={0.08 * index}>
                                <div id={item.target} className="scroll-mt-28">
                                    <FxHoloCard day={day}
                                                className={`p-4 lg:p-9 border ${colors.cardBorder} relative overflow-hidden shadow-[0_0_45px_-22px_rgba(var(--page-accent-rgb),0.28)]`}>
                                        {/* Purple gradient overlay for color cohesion */}
                                        {colorScheme === 'purple' && (
                                            <div
                                                className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.08),transparent_70%)] pointer-events-none"/>
                                        )}
                                        <div className="relative z-10 flex items-start gap-4 mb-4">
                                            <span
                                                className={`text-[0.65em] lg:text-[0.7em] font-[700] tabular-nums shrink-0 mt-1 ${day ? 'text-gray-500' : 'text-white/50'}`}>{item.id}/</span>
                                            <h2 className={`text-[1.15em] lg:text-[1.65em] font-[600] leading-snug ${day ? 'text-gray-900' : 'text-white'}`}>{item.title}</h2>
                                        </div>
                                        {item.tags && item.tags.length > 0 && (
                                            <div className="relative z-10 flex flex-wrap gap-2 mb-5">
                                                {item.tags.map((tag, t) => <FxChip key={t} day={day}
                                                                                   colorScheme={colorScheme}>{tag}</FxChip>)}
                                            </div>
                                        )}
                                        <div
                                            className={`relative z-10 text-[0.8em] lg:text-[0.85em] font-[300] leading-[1.6] lg:leading-[1.7] text-justify ${day ? 'text-gray-700' : 'text-white/65'}`}>
                                            {item.body}
                                        </div>

                                        {/* Professional detail band: metrics, deliverables, CTA (enhanced) */}
                                        <div
                                            className="relative z-10 mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
                                            {/* Metrics column with CountUp for numeric values */}
                                            <div>
                                                {item.metrics && item.metrics.length ? (
                                                    <div className="grid grid-cols-2 gap-3">
                                                        {item.metrics.map((m, mi) => (
                                                            <div key={mi}
                                                                 className={`p-3 rounded-xl border ${colors.metricBorder} bg-white/[0.02]`}>
                                                                {/* Render numeric values with CountUp when possible */}
                                                                {(() => {
                                                                    const raw = String(m.value ?? '');
                                                                    const numeric = parseFloat(raw.replace(/[^0-9+\-.,]/g, '').replace(/,/g, ''));
                                                                    const hasNumber = !Number.isNaN(numeric);
                                                                    const suffix = raw.replace(/[0-9,\.\s+-]/g, '');
                                                                    return (
                                                                        <div>
                                                                            {hasNumber ? (
                                                                                <div
                                                                                    className="flex items-baseline gap-2">
                                                                                    <div
                                                                                        className="text-[1.6em] font-extrabold  leading-none">
                                                                                        <CountUp end={numeric}
                                                                                                 duration={1.4}
                                                                                                 separator=","
                                                                                                 preserveValue/>
                                                                                    </div>
                                                                                    {suffix && <div
                                                                                        className="text-[0.9em] ">{suffix}</div>}
                                                                                </div>
                                                                            ) : (
                                                                                <div
                                                                                    className="text-[1.25em] font-extrabold  leading-none">{raw}</div>
                                                                            )}
                                                                            <div
                                                                                className="text-xs mt-1">{m.label}</div>
                                                                            {m.description && <div
                                                                                className="text-[0.82em] mt-2">{m.description}</div>}
                                                                        </div>
                                                                    );
                                                                })()}
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <div className="text-sm ">No metrics provided for this
                                                        solution. Provide per-item <code>metrics</code> to display KPIs.
                                                    </div>
                                                )}
                                            </div>

                                            {/* Deliverables column with concise, professional list */}
                                            <div>
                                                <h4 className="text-sm font-semibold mb-2">Deliverables</h4>
                                                <ul className="list-disc pl-5  space-y-2 text-sm">
                                                    {item.deliverables && item.deliverables.length ? (
                                                        item.deliverables.slice(0, 6).map((d, di) => (
                                                            <li key={di} className="flex items-start gap-2">
                                                                <svg width="14" height="14" viewBox="0 0 24 24"
                                                                     fill="none" xmlns="http://www.w3.org/2000/svg"
                                                                     className={`mt-1 ${colors.accent}`}>
                                                                    <path d="M20 6L9 17l-5-5" stroke="currentColor"
                                                                          strokeWidth="2" strokeLinecap="round"
                                                                          strokeLinejoin="round"/>
                                                                </svg>
                                                                <span>{d}</span>
                                                            </li>
                                                        ))
                                                    ) : (
                                                        <>
                                                            <li className="flex items-start gap-2">
                                                                <svg width="14" height="14" viewBox="0 0 24 24"
                                                                     fill="none" xmlns="http://www.w3.org/2000/svg"
                                                                     className={`mt-1 ${colors.accent}`}>
                                                                    <path d="M20 6L9 17l-5-5" stroke="currentColor"
                                                                          strokeWidth="2" strokeLinecap="round"
                                                                          strokeLinejoin="round"/>
                                                                </svg>
                                                                <span>Requirements & prioritised scope brief</span>
                                                            </li>
                                                            <li className="flex items-start gap-2">
                                                                <svg width="14" height="14" viewBox="0 0 24 24"
                                                                     fill="none" xmlns="http://www.w3.org/2000/svg"
                                                                     className={`mt-1 ${colors.accent}`}>
                                                                    <path d="M20 6L9 17l-5-5" stroke="currentColor"
                                                                          strokeWidth="2" strokeLinecap="round"
                                                                          strokeLinejoin="round"/>
                                                                </svg>
                                                                <span>Design system & component library (Figma + tokens)</span>
                                                            </li>
                                                            <li className="flex items-start gap-2">
                                                                <svg width="14" height="14" viewBox="0 0 24 24"
                                                                     fill="none" xmlns="http://www.w3.org/2000/svg"
                                                                     className={`mt-1 ${colors.accent}`}>
                                                                    <path d="M20 6L9 17l-5-5" stroke="currentColor"
                                                                          strokeWidth="2" strokeLinecap="round"
                                                                          strokeLinejoin="round"/>
                                                                </svg>
                                                                <span>Production-ready, accessible front-end and docs</span>
                                                            </li>
                                                        </>
                                                    )}
                                                    {item.deliverables && item.deliverables.length && item.deliverables.length > 6 ? (
                                                        <li className="text-sm ">+{item.deliverables.length - 6} more
                                                            items (available on request)</li>
                                                    ) : null}
                                                </ul>
                                            </div>

                                            {/* CTA / Meta column (professional microcopy) */}
                                            <div className="flex flex-col justify-between">
                                                <div>
                                                    <h5 className="text-sm font-semibold mb-2">Timeline &
                                                        Engagement</h5>
                                                    <div className="text-sm ">
                                                        <div className="mb-2">
                                                            <span className="font-medium">Delivery:</span> {item.timeline}
                                                        </div>
                                                        <div>
                                                            <span className="font-medium">Model:</span> {item.engagement}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="mt-4">
                                                    {item.cta ? (
                                                        <FxButton href={item.cta.href}
                                                                  day={day}
                                                                  colorScheme={colorScheme}>{item.cta.label}</FxButton>
                                                    ) : (
                                                        <FxButton href="/contact" day={day} colorScheme={colorScheme}>Discuss
                                                            this
                                                            solution</FxButton>
                                                    )}
                                                    <div className="mt-2 text-xs text-white/60">Includes initial scoping
                                                        call and delivery plan.
                                                    </div>
                                                </div>
                                            </div>
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
