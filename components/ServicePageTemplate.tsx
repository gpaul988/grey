'use client';
import React, {useEffect, useRef, useState, type ReactNode} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import CountUp from 'react-countup';
import {AnimatePresence, motion, useScroll, useTransform} from 'framer-motion';

import FloatingButton from '@/components/FloatingButton';
import ResponsiveVideoHero from '@/components/ResponsiveVideoHero';
import {useIsDayTime} from './useIsDayTime';
import {
    FxBackground,
    FxChip,
    FxReveal,
    FxHoloCard,
    FxGlitchText,
    FxStatBar,
    FxSectionHeading,
    FxButton,
    FxOrbit,
    FxFrame,
    FxTerminal,
} from '@/components/futuristic/fx';

// ─────────────────────────────────────────────────────────
// INTERFACES
// ─────────────────────────────────────────────────────────
export interface SolutionItem {
    id: string;
    title: string;
    target: string;
    tags: string[];
    body: ReactNode;
}

export interface FaqItem {
    q: string;
    a: ReactNode;
}

export interface StatItem {
    label: string;
    value: number;
    suffix?: string;
}

export interface HeroStat {
    label: string;
    value: string;
}

export interface Testimonial {
    name: string;
    title: string;
    message: ReactNode;
}

export interface ReasonItem {
    id: number;
    title: string;
    description: ReactNode;
    image: string;
}

export interface ServicePageProps {
    title: ReactNode;
    intro: ReactNode;
    heroVideo?: string;
    heroVideoMobile?: string;
    heroImage?: string;
    heroStats?: HeroStat[];
    topImages?: [string, string];
    midImage?: string;
    eyebrow: ReactNode;
    introHeading: ReactNode;
    introBody: [ReactNode, ReactNode];
    solutionsHeading: ReactNode;
    solutionsIntro?: ReactNode;
    solutions: SolutionItem[];
    reasons?: ReasonItem[];
    ctaHeading?: ReactNode;
    ctaBody?: ReactNode;
    faqs?: FaqItem[];
    stats?: StatItem[];
    testimonials?: Testimonial[];
}

const defaultStats: StatItem[] = [
    {label: 'Years Experience',    value: 8,   suffix: '+'},
    {label: 'Team Members',        value: 13,  suffix: '+'},
    {label: 'Products Launched',   value: 150, suffix: '+'},
    {label: 'Projects Delivered',  value: 200, suffix: '+'},
    {label: 'Client Satisfaction', value: 98,  suffix: '%'},
];

const defaultHeroStats: HeroStat[] = [
    {label: 'Years Experience',  value: '8+'},
    {label: 'Team Members',      value: '13+'},
    {label: 'Products Launched', value: '123+'},
];

// Why-Us card colour palette — same visual logic as Home.tsx WHY_US
const CARD_COLORS = ['#2dd4bf','#06b6d4','#7c3aed','#f59e0b','#10b981','#ef4444'];
const CARD_ICONS  = ['◈','◉','◎','◇','⬡','⬢'];

// ─────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────
const ServicePageTemplate: React.FC<ServicePageProps> = ({
    title,
    intro,
    heroVideo = '/assets/hero/hero.mp4',
    heroVideoMobile,
    heroImage,
    heroStats = defaultHeroStats,
    topImages,
    midImage,
    eyebrow,
    introHeading,
    introBody,
    solutionsHeading,
    solutionsIntro,
    solutions,
    reasons = [],
    ctaHeading,
    ctaBody,
    faqs = [],
    stats = defaultStats,
    testimonials = [],
}) => {
    const [isVisible,          setIsVisible]          = useState(false);
    const [activeId,           setActiveId]           = useState<string>(solutions[0]?.target ?? '');
    const [openFaq,            setOpenFaq]            = useState<number | null>(null);
    const [activeWhyUs,        setActiveWhyUs]        = useState(0);

    const isDayTime = useIsDayTime();

    // floating button show/hide
    useEffect(() => {
        const fn = () => setIsVisible(window.scrollY > 200);
        window.addEventListener('scroll', fn);
        return () => window.removeEventListener('scroll', fn);
    }, []);

    // active solution tracking
    useEffect(() => {
        const fn = () => {
            for (const s of solutions) {
                const el = document.getElementById(s.target);
                if (el) {
                    const {top} = el.getBoundingClientRect();
                    if (top >= 0 && top <= window.innerHeight * 0.55) {
                        setActiveId(s.target);
                        break;
                    }
                }
            }
        };
        window.addEventListener('scroll', fn, {passive: true});
        return () => window.removeEventListener('scroll', fn);
    }, [solutions]);

    // auto-cycle why-us
    useEffect(() => {
        if (!reasons.length) return;
        const t = setInterval(() => setActiveWhyUs(p => (p + 1) % reasons.length), 3500);
        return () => clearInterval(t);
    }, [reasons]);

    const scrollToSection = (target: string) => {
        const el = document.getElementById(target);
        if (el) { el.scrollIntoView({behavior: 'smooth', block: 'start'}); setActiveId(target); }
    };

    const mutedText = isDayTime ? 'text-gray-600' : 'text-gray-400';
    const borderCol = isDayTime ? 'border-gray-200' : 'border-teal-400/15';

    // ── sentinel ref for solutions sticky release ──────────
    const solutionsSentinelRef = useRef<HTMLDivElement>(null);
    const leftNavRef            = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!solutionsSentinelRef.current || !leftNavRef.current) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (leftNavRef.current) {
                    leftNavRef.current.style.position = entry.isIntersecting ? 'relative' : 'sticky';
                }
            },
            {threshold: 0, rootMargin: '0px 0px -120px 0px'},
        );
        observer.observe(solutionsSentinelRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div className={`${isDayTime ? 'bg-white text-black' : 'bg-[#050810] text-white'} min-h-screen`}>
            <FloatingButton
                className={`fixed bottom-6 right-6 transition-all z-50 duration-300 ${isVisible ? 'mb-16' : 'mb-0'}`}
            />

            {/* ══════════════════════════════════════════
                HERO — cinematic full-bleed with data HUD
                ══════════════════════════════════════════ */}
            <div id="hero">
                <ResponsiveVideoHero
                    videoDesktop={heroVideo}
                    videoMobile={heroVideoMobile || heroVideo}
                    posterImage={heroImage}
                    posterAlt={typeof title === 'string' ? title : 'hero'}
                    overlayOpacity={0.55}
                    heights={{mobile: 'h-[680px]', tablet: 'md:h-[740px]', desktop: 'lg:h-[820px]'}}
                    className="rounded-none"
                >
                    {/* Grid + scanline layers */}
                    <div className="absolute inset-0 gx-grid opacity-20 pointer-events-none" />
                    <div className="gx-scanline pointer-events-none" />

                    {/* Vertical accent line */}
                    <div className="absolute left-[4.5em] top-0 bottom-0 w-px bg-teal-400/15 hidden lg:block pointer-events-none" />

                    {/* Orbit accents */}
                    <div className="absolute -top-[15vmax] -right-[15vmax] w-[60vmax] h-[60vmax] rounded-full border border-teal-400/10 gx-orbit pointer-events-none" />
                    <div className="absolute -top-[5vmax] -right-[5vmax] w-[40vmax] h-[40vmax] rounded-full border border-cyan-400/08 gx-orbit-reverse pointer-events-none" />

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-end pb-12 md:pb-16 px-6 sm:px-8 md:px-10 lg:px-[4.5em] text-white">

                        {/* Eyebrow chip */}
                        <motion.div
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.7, delay: 0.2}}
                            className="mb-5"
                        >
                            <FxChip day={false}>{eyebrow}</FxChip>
                        </motion.div>

                        {/* Headline */}
                        <motion.h1
                            initial={{opacity: 0, y: 32}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.8, delay: 0.35, ease: [0.2,0.7,0.2,1]}}
                            className="gx-glitch cursor-default select-none text-[2.2em] sm:text-[3em] md:text-[4em] lg:text-[5em] font-[700] leading-[1.05] tracking-tight mb-5 max-w-[14ch]"
                        >
                            {title}
                        </motion.h1>

                        {/* Divider */}
                        <motion.div
                            initial={{scaleX: 0}}
                            animate={{scaleX: 1}}
                            transition={{duration: 0.6, delay: 0.55}}
                            className="origin-left h-px bg-white/20 w-full max-w-[60em] mb-5"
                        />

                        {/* Bottom row: intro + stats */}
                        <div className="grid lg:grid-cols-2 grid-cols-1 gap-6 max-w-[60em]">
                            <motion.p
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                transition={{duration: 0.7, delay: 0.65}}
                                className="text-[0.87em] font-[300] leading-[1.6] text-white/80"
                            >
                                {intro}
                            </motion.p>

                            {/* Stat pills */}
                            <motion.div
                                initial={{opacity: 0, x: 20}}
                                animate={{opacity: 1, x: 0}}
                                transition={{duration: 0.7, delay: 0.75}}
                                className="hidden lg:flex gap-6 items-end justify-end"
                            >
                                {heroStats.map((s, i) => (
                                    <div
                                        key={i}
                                        className="flex flex-col items-center px-5 py-3 rounded-xl border border-teal-400/25 bg-teal-400/05 backdrop-blur-sm"
                                        style={{boxShadow: '0 0 20px -8px rgba(45,212,191,0.35)'}}
                                    >
                                        <span className="gx-gradient-text text-[2.2em] font-[700] leading-none">{s.value}</span>
                                        <span className="text-[0.68em] font-[400] text-white/55 tracking-wider mt-1">{s.label}</span>
                                    </div>
                                ))}
                            </motion.div>
                        </div>

                        {/* Data readout bar */}
                        <motion.div
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            transition={{duration: 0.6, delay: 0.9}}
                            className="hidden lg:flex items-center gap-6 mt-8 border-t border-white/10 pt-4 font-mono text-[0.65em] tracking-widest text-white/25"
                        >
                            <span>SYS://GREY-INFOTECH</span>
                            <div className="flex-1 h-px bg-white/08" />
                            <span>STATUS: ACTIVE</span>
                            <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                        </motion.div>
                    </div>
                </ResponsiveVideoHero>
            </div>

            {/* ══════════════════════════════════════════
                INTRO — always-dark two-col with FX
                ══════════════════════════════════════════ */}
            <section className="relative overflow-hidden bg-[#050810] text-white">
                <FxBackground day={false} grid aurora />
                <FxOrbit size={600} top="-100px" right="-150px" opacity={0.10} speed={40} />

                <div className="relative z-10 lg:py-[6em] md:py-[4em] py-12 max-w-full w-full mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.5em]">
                    <div className="grid lg:grid-cols-2 grid-cols-1 gap-14">

                        {/* Left — eyebrow */}
                        <FxReveal className="flex flex-col gap-5">
                            {/* Animated border accent */}
                            <div className="relative inline-block">
                                <FxChip day={false} className="text-[0.78em]">{eyebrow}</FxChip>
                                {/* Scan line decoration */}
                                <motion.div
                                    initial={{scaleY: 0}}
                                    whileInView={{scaleY: 1}}
                                    viewport={{once: true}}
                                    transition={{duration: 0.8, delay: 0.3}}
                                    className="absolute -left-4 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-teal-400/60 to-transparent origin-top"
                                />
                            </div>

                            {/* Glitch eyebrow text */}
                            <FxGlitchText tag="h3" className="text-[2em] lg:text-[2.6em] font-[700] leading-[1.1] tracking-tight text-white/80">
                                {introHeading}
                            </FxGlitchText>
                        </FxReveal>

                        {/* Right — body paragraphs */}
                        <FxReveal delay={0.15} className="flex flex-col gap-4">
                            <div className={`grid lg:grid-cols-2 grid-cols-1 gap-6 font-[300] text-[0.87em] leading-[1.65] tracking-normal text-justify text-gray-300`}>
                                <motion.p
                                    initial={{opacity: 0, y: 18}}
                                    whileInView={{opacity: 1, y: 0}}
                                    viewport={{once: true}}
                                    transition={{duration: 0.6, delay: 0.2}}
                                >
                                    {introBody[0]}
                                </motion.p>
                                <motion.p
                                    initial={{opacity: 0, y: 18}}
                                    whileInView={{opacity: 1, y: 0}}
                                    viewport={{once: true}}
                                    transition={{duration: 0.6, delay: 0.35}}
                                >
                                    {introBody[1]}
                                </motion.p>
                            </div>
                        </FxReveal>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════
                TOP IMAGES — cinematic dual FxFrame reveal
                ══════════════════════════════════════════ */}
            {topImages && (
                <section className="bg-[#050810] py-12 lg:py-16">
                    <div className="max-w-full w-full mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.5em]">
                        <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-8">
                            {([0, 1] as const).map(idx => (
                                <FxReveal key={idx} delay={idx * 0.15}>
                                    <FxFrame className="w-full overflow-hidden">
                                        <div className="relative w-full aspect-[4/3]">
                                            <Image
                                                src={topImages[idx]}
                                                alt="detail"
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 768px) 100vw, 50vw"
                                            />
                                            {/* Overlay scanline for depth */}
                                            <div
                                                className="absolute inset-0 pointer-events-none"
                                                style={{backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(45,212,191,0.025) 3px,rgba(45,212,191,0.025) 4px)'}}
                                            />
                                        </div>
                                    </FxFrame>
                                </FxReveal>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ══════════════════════════════════════════
                SOLUTIONS — sticky-left / scroll-right
                Sentinel div at bottom releases sticky nav
                ══════════════════════════════════════════ */}
            <section className={`relative overflow-hidden ${isDayTime ? 'bg-white' : 'bg-[#050810]'}`}>
                <FxBackground day={isDayTime} grid aurora />
                <FxOrbit size={700} top="-150px" right="-200px" opacity={0.12} speed={35} />
                <FxOrbit size={400} top="200px" left="-150px" opacity={0.10} speed={28} reverse />

                <div className="relative z-10 lg:pt-[4em] md:pt-[3em] pt-[2em] lg:pb-[4em] md:pb-[3em] pb-[3em] max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em]">

                    {/* Heading row */}
                    <FxReveal className={`relative grid lg:grid-cols-2 grid-cols-1 gap-4 mb-12 border-b pb-[3em] ${borderCol}`}>
                        <FxSectionHeading day={isDayTime} title={solutionsHeading} />
                        {solutionsIntro && (
                            <p className={`text-[0.87em] font-[400] leading-[1.6] lg:-ml-[7.5em] tracking-normal ${mutedText}`}>
                                {solutionsIntro}
                            </p>
                        )}
                    </FxReveal>

                    {/* Sticky scroll grid */}
                    <div className="relative grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-16 lg:mt-16 md:mt-12 mt-6">

                        {/* ── Left sticky nav ── */}
                        <div
                            ref={leftNavRef}
                            className="lg:sticky md:sticky top-28 self-start lg:mr-[11em] max-h-screen overflow-y-auto"
                        >
                            <FxReveal delay={0.1}>
                                <FxChip day={isDayTime} className="mb-5">Our Solutions</FxChip>
                            </FxReveal>
                            <nav className="space-y-1 mt-4">
                                {solutions.map((item, index) => {
                                    const isActive = activeId === item.target;
                                    return (
                                        <FxReveal key={index} delay={0.05 * index}>
                                            <button
                                                onClick={() => scrollToSection(item.target)}
                                                className={`group w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                                                    isActive
                                                        ? 'bg-teal-400/10 border border-teal-400/30 shadow-[0_0_20px_-6px_rgba(45,212,191,0.4)]'
                                                        : `border border-transparent hover:border-teal-400/15 hover:bg-teal-400/5 ${mutedText}`
                                                }`}
                                            >
                                                <span className={`text-[0.7em] font-[700] tracking-wider tabular-nums shrink-0 ${isActive ? 'text-teal-400' : mutedText}`}>
                                                    {item.id}
                                                </span>
                                                <span className={`text-[0.9em] font-[500] leading-snug ${isActive ? (isDayTime ? 'text-black' : 'text-white') : ''}`}>
                                                    {item.title}
                                                </span>
                                                {isActive && <span className="ml-auto text-teal-400 text-[1.1em]">→</span>}
                                            </button>
                                        </FxReveal>
                                    );
                                })}
                            </nav>
                        </div>

                        {/* ── Right scrollable content ── */}
                        <div className="lg:-ml-[8em] md:-ml-[8em]">
                            {solutions.map((item, index) => (
                                <FxReveal
                                    key={index}
                                    delay={0.08 * index}
                                    className={index < solutions.length - 1 ? 'mb-20 lg:mb-44' : ''}
                                >
                                    <div id={item.target} className="scroll-mt-28">
                                        <FxHoloCard day={isDayTime} className="p-6 lg:p-8">
                                            <div className="flex items-start gap-4 mb-4">
                                                <span className={`text-[0.7em] font-[700] tabular-nums shrink-0 mt-1 ${mutedText}`}>
                                                    {item.id}/
                                                </span>
                                                <h2 className="text-[1.4em] font-[600] leading-snug">{item.title}</h2>
                                            </div>
                                            <div className="flex flex-wrap gap-2 mb-5">
                                                {item.tags.map((tag, t) => (
                                                    <FxChip key={t} day={isDayTime}>{tag}</FxChip>
                                                ))}
                                            </div>
                                            <p className={`text-[0.85em] font-[300] leading-[1.6] text-justify ${mutedText}`}>
                                                {item.body}
                                            </p>
                                        </FxHoloCard>
                                    </div>
                                </FxReveal>
                            ))}

                            {/* Sentinel — IntersectionObserver releases left sticky here */}
                            <div ref={solutionsSentinelRef} className="h-px w-full" aria-hidden />
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════
                MID IMAGE — standalone FxFrame section
                ══════════════════════════════════════════ */}
            {midImage && (
                <section className="bg-[#050810] py-10 lg:py-14">
                    <div className="max-w-full w-full mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.5em]">
                        <FxReveal>
                            <FxFrame className="w-full overflow-hidden">
                                <div className="relative w-full">
                                    <Image
                                        src={midImage}
                                        alt={typeof title === 'string' ? title : 'detail'}
                                        width={2560}
                                        height={1440}
                                        className="w-full h-auto object-cover"
                                    />
                                    {/* Scanline depth overlay */}
                                    <div
                                        className="absolute inset-0 pointer-events-none"
                                        style={{backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(45,212,191,0.02) 3px,rgba(45,212,191,0.02) 4px)'}}
                                    />
                                    {/* Bottom gradient fade */}
                                    <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
                                        style={{background: 'linear-gradient(to top, rgba(5,8,16,0.6), transparent)'}} />
                                </div>
                            </FxFrame>
                        </FxReveal>
                    </div>
                </section>
            )}

            {/* ══════════════════════════════════════════
                WHY GREY INFOTECH
                Matches Home.tsx WHY_US grid exactly:
                - bg-[#050810] always
                - 3-col interactive grid cards
                - layoutId="why-glow" spring animation
                - auto-cycle 3500ms
                - stat strip below
                ══════════════════════════════════════════ */}
            {reasons.length > 0 && (
                <section className="relative overflow-hidden bg-[#050810]">
                    <FxBackground day={false} grid aurora />
                    <FxOrbit size={600} top="-80px" left="-180px" opacity={0.12} speed={40} />
                    <FxOrbit size={350} bottom="-60px" right="-100px" opacity={0.09} speed={25} reverse />

                    <div className="relative z-10 max-w-full w-full mx-auto px-6 sm:px-8 md:px-10 lg:px-[4.5em] lg:py-[6em] md:py-20 py-14 text-white">
                        {/* Scanline */}
                        <div className="gx-scanline pointer-events-none" />

                        {/* Header */}
                        <FxReveal>
                            <div className="flex items-center gap-5 mb-6">
                                <FxChip day={false}>WHY CHOOSE US</FxChip>
                                <div className="flex-1 h-px bg-white/10" />
                                <span className="font-mono text-[0.68em] tracking-widest text-white/25">8+ YRS PROVEN</span>
                            </div>
                            <h2 className="text-[2.8em] lg:text-[4em] font-[800] leading-[1.05] tracking-tight mb-6">
                                Not just a vendor.<br />
                                <span className="gx-gradient-text">Your competitive edge.</span>
                            </h2>
                            <p className="text-white/55 max-w-2xl text-[0.95em] leading-[1.8] mb-16">
                                We&apos;ve built, scaled, and delivered digital products across industries. Here&apos;s why forward-thinking teams trust Grey InfoTech with their most critical builds.
                            </p>
                        </FxReveal>

                        {/* Interactive 3-col grid — exact Home.tsx pattern */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
                            {reasons.map((r, i) => {
                                const color = CARD_COLORS[i % CARD_COLORS.length];
                                const icon  = CARD_ICONS[i % CARD_ICONS.length];
                                const isActive = activeWhyUs === i;
                                return (
                                    <motion.div
                                        key={r.id}
                                        className="relative group cursor-pointer rounded-2xl p-7 border transition-all duration-500 overflow-hidden"
                                        style={{
                                            background:   isActive ? `${color}10` : 'rgba(255,255,255,0.02)',
                                            borderColor:  isActive ? `${color}50` : 'rgba(255,255,255,0.07)',
                                        }}
                                        onClick={() => setActiveWhyUs(i)}
                                        initial={{opacity: 0, y: 30}}
                                        whileInView={{opacity: 1, y: 0}}
                                        viewport={{once: true}}
                                        transition={{delay: i * 0.08, duration: 0.6}}
                                        whileHover={{y: -4}}
                                    >
                                        {/* Spring glow on active */}
                                        {isActive && (
                                            <motion.div
                                                layoutId="why-glow"
                                                className="absolute inset-0 rounded-2xl"
                                                style={{boxShadow: `inset 0 0 40px -15px ${color}30`}}
                                                transition={{type: 'spring', stiffness: 120, damping: 20}}
                                            />
                                        )}

                                        {/* Number + Icon */}
                                        <div className="flex items-start justify-between mb-5">
                                            <span className="font-mono text-[0.65em] tracking-widest" style={{color: color + '99'}}>
                                                {String(i + 1).padStart(2, '0')}
                                            </span>
                                            <motion.span
                                                className="text-[1.8em]"
                                                style={{color}}
                                                animate={{rotate: isActive ? [0, 15, -10, 0] : 0}}
                                                transition={{duration: 1.2, ease: 'easeInOut'}}
                                            >
                                                {icon}
                                            </motion.span>
                                        </div>

                                        <h3 className="text-[1.1em] font-[700] mb-3 tracking-tight text-white">{r.title}</h3>
                                        <p className="text-white/55 text-[0.83em] leading-[1.7]">{r.description}</p>

                                        {/* Bottom accent line */}
                                        <div
                                            className="mt-5 h-[2px] w-0 group-hover:w-full transition-all duration-700 rounded-full"
                                            style={{background: `linear-gradient(90deg, ${color}80, transparent)`}}
                                        />
                                        {isActive && (
                                            <div
                                                className="mt-0 h-[2px] w-full rounded-full"
                                                style={{background: `linear-gradient(90deg, ${color}, transparent)`}}
                                            />
                                        )}
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Stat strip — bordered box, 4 stats */}
                        <FxReveal>
                            <div className="border border-white/08 rounded-3xl p-8 lg:p-12 overflow-hidden">
                                <div className="flex items-center gap-4 mb-10">
                                    <span className="text-[0.7em] font-[700] uppercase tracking-[0.25em] text-teal-400">WHAT SETS US APART</span>
                                    <div className="flex-1 h-px bg-white/08" />
                                </div>
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                                    {[
                                        {val: '50+',  label: 'Products Delivered', sub: 'Live in production'},
                                        {val: '8+',   label: 'Years Experience',   sub: 'Since 2016'},
                                        {val: '15+',  label: 'Industries',         sub: 'Served globally'},
                                        {val: '99%',  label: 'Client Retention',   sub: 'They come back'},
                                    ].map((s, i) => (
                                        <motion.div
                                            key={s.label}
                                            className="text-center lg:text-left"
                                            initial={{opacity: 0, y: 20}}
                                            whileInView={{opacity: 1, y: 0}}
                                            viewport={{once: true}}
                                            transition={{delay: i * 0.1 + 0.2}}
                                        >
                                            <div className="text-[3em] font-[900] gx-gradient-text leading-none mb-1">{s.val}</div>
                                            <div className="text-white/70 text-[0.82em] font-[600] mb-0.5">{s.label}</div>
                                            <div className="text-white/30 text-[0.68em] uppercase tracking-wider">{s.sub}</div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </FxReveal>
                    </div>
                </section>
            )}

            {/* ══════════════════════════════════════════
                FAQ — holographic accordion (UNCHANGED)
                ══════════════════════════════════════════ */}
            {faqs.length > 0 && (
                <section className="relative overflow-hidden bg-[#050810]">
                    <FxBackground day={false} grid aurora />
                    <FxOrbit size={500} top="-60px" right="-120px" opacity={0.10} speed={45} />

                    <div id="FAQ" className="relative z-10 lg:py-24 py-12 max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] text-white">

                        <FxReveal className="mb-12">
                            <FxSectionHeading
                                day={false}
                                eyebrow="FAQs"
                                title="Frequently Asked"
                                accent="Questions"
                            />
                        </FxReveal>

                        <div className="space-y-3 max-w-4xl">
                            {faqs.map((faq, i) => {
                                const isOpen = openFaq === i;
                                return (
                                    <FxReveal key={i} delay={0.04 * i}>
                                        <FxHoloCard day={false} className="overflow-hidden">
                                            <button
                                                onClick={() => setOpenFaq(isOpen ? null : i)}
                                                className="w-full flex justify-between items-center text-left gap-6 px-6 py-5"
                                                aria-expanded={isOpen}
                                            >
                                                <span className="text-[1em] font-[500] leading-snug">{faq.q}</span>
                                                <motion.span
                                                    animate={{rotate: isOpen ? 45 : 0}}
                                                    transition={{duration: 0.25}}
                                                    className={`text-[1.8em] leading-none shrink-0 ${isOpen ? 'text-teal-400' : 'text-gray-500'}`}
                                                >
                                                    +
                                                </motion.span>
                                            </button>
                                            <AnimatePresence>
                                                {isOpen && (
                                                    <motion.div
                                                        initial={{height: 0, opacity: 0}}
                                                        animate={{height: 'auto', opacity: 1}}
                                                        exit={{height: 0, opacity: 0}}
                                                        transition={{duration: 0.35}}
                                                        className="overflow-hidden"
                                                    >
                                                        <p className="px-6 pb-6 text-[0.88em] font-[300] leading-[1.7] text-gray-300 text-justify lg:pr-[6em]">
                                                            {faq.a}
                                                        </p>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </FxHoloCard>
                                    </FxReveal>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}

            {/* ══════════════════════════════════════════
                CTA + COUNTUP (UNCHANGED)
                ══════════════════════════════════════════ */}
            <section className="relative overflow-hidden bg-[#050810]">
                <FxBackground day={false} grid aurora />
                <FxOrbit size={800} top="-200px" left="50%" opacity={0.08} speed={60} />
                <FxOrbit size={500} bottom="-100px" right="-150px" opacity={0.10} speed={30} reverse />

                <div className="relative z-10 lg:py-20 md:py-16 py-12 max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] text-white">

                    <FxReveal>
                        <FxGlitchText tag="h1" className="gx-gradient-text lg:text-[5em] md:text-[4em] sm:text-[3em] text-[2em] font-[700] leading-[1.1] mb-[0.5em]">
                            {ctaHeading || (<>Your trusted<br className="lg:block md:block hidden" />digital partner</>)}
                        </FxGlitchText>
                    </FxReveal>

                    <FxReveal delay={0.15}>
                        <p className="text-[0.9em] font-[300] leading-[1.6] text-gray-300 lg:pr-[33em] mb-8 text-justify">
                            {ctaBody || (
                                <>We specialize in crafting high-impact marketing websites, innovative web apps, and mobile
                                applications that drive real results. From funded startups to established businesses, we&apos;ve
                                helped a wide range of clients bring their digital products to life—delivering standout
                                experiences that fuel growth, engagement, and long-term success.</>
                            )}
                        </p>
                    </FxReveal>

                    <FxReveal delay={0.2}>
                        <FxButton day={false} href="/contact" variant="solid">
                            Start a project →
                        </FxButton>
                    </FxReveal>

                    {/* Countup stats */}
                    <FxReveal delay={0.25} className="mt-16">
                        <div className={`grid lg:grid-cols-5 md:grid-cols-5 sm:grid-cols-3 grid-cols-1 gap-px rounded-2xl overflow-hidden border ${borderCol}`}>
                            {stats.map((stat, index) => (
                                <div key={index} className="relative flex flex-col justify-center items-center py-8 px-4 bg-white/[0.03] hover:bg-teal-400/5 transition-colors duration-300">
                                    <div className="absolute inset-0 pointer-events-none"
                                        style={{backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(45,212,191,0.015) 3px, rgba(45,212,191,0.015) 4px)'}}
                                    />
                                    <h2 className="gx-gradient-text lg:text-[3.2em] md:text-[3em] sm:text-[2em] text-[1.8em] font-[700] leading-none mb-2">
                                        <CountUp end={stat.value} duration={2} suffix={stat.suffix || ''} />
                                    </h2>
                                    <p className="text-[0.78em] font-[400] text-gray-400 text-center">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </FxReveal>

                    {/* Terminal decoration */}
                    <FxReveal delay={0.3} className="mt-14 max-w-lg">
                        <FxTerminal
                            day={false}
                            lines={[
                                '# Grey InfoTech — where innovation ships',
                                'npm run build:production',
                                'Deploying to edge network...',
                                '✓ Build complete — 0 errors',
                            ]}
                        />
                    </FxReveal>
                </div>
            </section>
        </div>
    );
};

export default ServicePageTemplate;
