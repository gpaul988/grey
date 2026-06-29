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
