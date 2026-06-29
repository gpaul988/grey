'use client';
import React, {useEffect, useRef, useState, type ReactNode} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import CountUp from 'react-countup';
import {AnimatePresence, motion} from 'framer-motion';

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
    {label: 'Years Experience', value: 8, suffix: '+'},
    {label: 'Team Members', value: 13, suffix: '+'},
    {label: 'Products Launched', value: 150, suffix: '+'},
    {label: 'Projects Delivered', value: 200, suffix: '+'},
    {label: 'Client Satisfaction', value: 98, suffix: '%'},
];

const defaultHeroStats: HeroStat[] = [
    {label: 'Years Experience', value: '8+'},
    {label: 'Team Members', value: '13+'},
    {label: 'Products Launched', value: '123+'},
];

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
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isBackgroundActive, setIsBackgroundActive] = useState(false);
    const [activeId, setActiveId] = useState<string>('');
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const isDayTime = useIsDayTime();

    useEffect(() => {
        const handleScroll = () => setIsVisible(window.scrollY > 200);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (sectionRef.current) {
                const {top, bottom} = sectionRef.current.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                if (top < windowHeight * -0.1 || bottom < windowHeight * -0.1) {
                    setIsBackgroundActive(true);
                } else {
                    setIsBackgroundActive(false);
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            for (const s of solutions) {
                const section = document.getElementById(s.target);
                if (section) {
                    const rect = section.getBoundingClientRect();
                    if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
                        setActiveId(s.target);
                        break;
                    }
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [solutions]);

    useEffect(() => {
        if (!reasons.length) return;
        const interval = setInterval(() => {
            setActiveIndex(prev => (prev + 1) % reasons.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [reasons]);

    const scrollToSection = (target: string) => {
        const section = document.getElementById(target);
        if (section) {
            section.scrollIntoView({behavior: 'smooth', block: 'start'});
            setActiveId(target);
        }
    };

    // ── colour tokens ─────────────────────────────────────────
    const pageBg   = isDayTime ? 'bg-white'   : 'bg-[#050810]';
    const pageText  = isDayTime ? 'text-black' : 'text-white';
    const mutedText = isDayTime ? 'text-gray-600' : 'text-gray-400';
    const borderCol = isDayTime ? 'border-gray-200' : 'border-teal-400/15';

    return (
        <div className={`${pageBg} ${pageText} min-h-screen`}>
            <FloatingButton
                className={`fixed bottom-6 right-6 transition-all z-50 duration-300 ${isVisible ? 'mb-16' : 'mb-0'}`}
            />

            {/* ── Hero ── */}
            <div id="hero">
                <ResponsiveVideoHero
                    videoDesktop={heroVideo}
                    videoMobile={heroVideoMobile || heroVideo}
                    posterImage={heroImage}
                    posterAlt={typeof title === 'string' ? title : 'hero'}
                    overlayOpacity={0.4}
                    heights={{
                        mobile:  'h-[640px]',
                        tablet:  'md:h-[700px]',
                        desktop: 'lg:h-[720px]',
                    }}
                    className="rounded-none"
                >
                    <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-start text-start px-4 sm:px-6 md:px-10 lg:px-[4.5em] text-white">
                        <div className="flex flex-col justify-start items-start border-b pb-[0.3em] border-gray-400/50 max-w-full w-full mx-auto">
                            <h1 className="px-0 constant-text lg:text-[5.35em] md:text-[4.4em] sm:text-[3.5em] text-[2em] lg:mt-[3em] md:mt-[3em] mt-[4em] w-auto h-auto leading-[1.1] font-[600]">
                                {title}
                            </h1>
                        </div>
                        <div className="relative grid lg:grid-cols-2 md:grid-cols-1 grid-cols-1 lg:mt-[1em] md:mt-[1em] mt-[0.5em] w-full max-w-full mx-auto">
                            <div className="lg:-mr-[4em] md:-mr-[1em] lg:mt-[1em] md:mt-[1em]">
                                <p className="text-[0.87em] font-[300]">{intro}</p>
                            </div>
                            <div className="relative grid lg:grid-cols-3 lg:gap-8 lg:ml-[13em]">
                                {heroStats.map((s, i) => (
                                    <div key={i} className="border-0 lg:block md:hidden sm:hidden hidden">
                                        <h6 className="gx-gradient-text text-[3em] font-[500] -mb-[0.3em] justify-center">{s.value}</h6>
                                        <p className="text-[0.7em] font-[300]">{s.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </ResponsiveVideoHero>
            </div>

            {/* ── Introductory section ── */}
            <section
                ref={sectionRef}
                className={`py-12 transition-colors duration-500 ${
                    isBackgroundActive
                        ? (isDayTime ? 'bg-black text-white' : 'bg-white text-black')
                        : (isDayTime ? 'bg-white text-black' : 'bg-[#050810] text-white')
                }`}
            >
                <div className="relative grid lg:grid-cols-2 grid-cols-1 lg:gap-14 gap-6 lg:pt-20 md:pt-20 pt-6 lg:pb-16 md:pb-16 pb-6 lg:max-w-full w-full mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em]">
                    <div>
                        <h6 className="constant-text uppercase lg:text-[0.85em] md:text-[0.85em] leading-[1.3] text-[0.8em] lg:font-[600] font-[600] lg:tracking-wider tracking-tight">
                            {eyebrow}
                        </h6>
                    </div>
                    <div className="lg:-ml-[19em]">
                        <h3 className="lg:text-[3.2em] md:text-[3.2em] text-[1.8em] font-[500] lg:mt-[0.01em] lg:leading-[1.1] tracking-tight border-b lg:pb-[0.7em] lg:mb-[0.7em] leading-[1.1] pb-6">
                            {introHeading}
                        </h3>
                        <div className="grid lg:grid-cols-2 grid-cols-1 gap-6 mt-4 font-[300] text-justify text-[0.873em] tracking-normal leading-[1.5]">
                            <div><p>{introBody[0]}</p></div>
                            <div><p>{introBody[1]}</p></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Top images ── */}
            {topImages && (
                <div className={isDayTime ? 'bg-black' : 'bg-white'}>
                    <div className="relative lg:max-w-full w-full lg:pt-[5em] md:pt-[5em] pt-[2em] lg:pb-[5em] md:pb-[5em] pb-[2em] mx-auto h-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em]">
                        <div className="relative grid lg:grid-cols-2 h-auto md:grid-cols-2 grid-cols-1 gap-6">
                            <Image src={topImages[0]} alt="detail" width={1396} height={1440} />
                            <Image src={topImages[1]} alt="detail" width={1396} height={1440} />
                        </div>
                    </div>
                </div>
            )}

            {/* ══════════════════════════════════════════
                SOLUTIONS — futuristic sticky-scroll layout
                ══════════════════════════════════════════ */}
            <section className={`relative overflow-hidden ${isDayTime ? 'bg-white' : 'bg-[#050810]'}`}>
                <FxBackground day={isDayTime} grid aurora />
                {/* Orbit accents */}
                <FxOrbit size={700} top="-150px" right="-200px" opacity={0.12} speed={35} />
                <FxOrbit size={400} top="200px" left="-150px"  opacity={0.10} speed={28} reverse />

                <div className="relative z-10 lg:pt-[4em] md:pt-[3em] pt-[2em] lg:pb-[7em] md:pb-[5em] pb-[3em] max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em]">

                    {/* Heading row */}
                    <FxReveal className={`relative grid lg:grid-cols-2 grid-cols-1 gap-4 mb-12 border-b pb-[3em] ${borderCol}`}>
                        <FxSectionHeading
                            day={isDayTime}
                            title={solutionsHeading}
                        />
                        {solutionsIntro && (
                            <p className={`text-[0.87em] font-[400] leading-[1.6] lg:-ml-[7.5em] tracking-normal ${mutedText}`}>
                                {solutionsIntro}
                            </p>
                        )}
                    </FxReveal>

                    {/* Sticky scroll grid */}
                    <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-16 lg:mt-16 md:mt-12 mt-6">

                        {/* Left sticky nav */}
                        <div className="lg:sticky md:sticky top-28 lg:h-screen md:h-screen lg:mr-[11em] overflow-hidden">
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
                                                {isActive && (
                                                    <span className="ml-auto text-teal-400 text-[1.1em]">→</span>
                                                )}
                                            </button>
                                        </FxReveal>
                                    );
                                })}
                            </nav>
                        </div>

                        {/* Right content */}
                        <div className="lg:-ml-[8em] md:-ml-[8em] lg:mb-[30em] md:mb-[30em]">
                            {solutions.map((item, index) => (
                                <FxReveal key={index} delay={0.08 * index} className={index < solutions.length - 1 ? 'mb-20 lg:mb-44' : ''}>
                                    <div id={item.target} className="scroll-mt-28">
                                        <FxHoloCard day={isDayTime} className="p-6 lg:p-8">
                                            {/* Number + title */}
                                            <div className="flex items-start gap-4 mb-4">
                                                <span className={`text-[0.7em] font-[700] tabular-nums shrink-0 mt-1 ${mutedText}`}>
                                                    {item.id}/
                                                </span>
                                                <h2 className="text-[1.4em] font-[600] leading-snug">{item.title}</h2>
                                            </div>
                                            {/* Tags */}
                                            <div className="flex flex-wrap gap-2 mb-5">
                                                {item.tags.map((tag, t) => (
                                                    <FxChip key={t} day={isDayTime}>{tag}</FxChip>
                                                ))}
                                            </div>
                                            {/* Body */}
                                            <p className={`text-[0.85em] font-[300] leading-[1.6] text-justify ${mutedText}`}>
                                                {item.body}
                                            </p>
                                        </FxHoloCard>
                                    </div>
                                </FxReveal>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Mid image ── */}
            {midImage && (
                <div className="h-auto max-w-full w-full mx-auto lg:-mt-[34em] md:-mt-[34em]">
                    <Image
                        className="object-fill"
                        src={midImage}
                        alt={typeof title === 'string' ? title : 'detail'}
                        width={2560}
                        height={1440}
                        style={{objectFit: 'fill', objectPosition: 'center'}}
                    />
                </div>
            )}

            {/* ══════════════════════════════════════════
                WHY GREY INFOTECH — futuristic accordion
                ══════════════════════════════════════════ */}
            {reasons.length > 0 && (
                <section className={`relative overflow-hidden ${isDayTime ? 'bg-[#050810]' : 'bg-white'}`}>
                    {/* Dark/Light invert for contrast */}
                    <FxBackground day={!isDayTime} grid aurora />
                    <FxOrbit size={600} top="-80px" left="-180px" opacity={0.12} speed={40} />
                    <FxOrbit size={350} bottom="-60px" right="-100px" opacity={0.09} speed={25} reverse />

                    <div className={`relative z-10 max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] lg:py-[6em] py-12 ${isDayTime ? 'text-white' : 'text-black'}`}>

                        <FxReveal className="mb-12">
                            <FxGlitchText tag="h2" className="lg:text-[3em] text-[1.8em] font-[700] leading-[1.1] mb-3">
                                Why Grey InfoTech
                            </FxGlitchText>
                            <p className={`text-[0.9em] font-[300] ${isDayTime ? 'text-gray-400' : 'text-gray-600'}`}>
                                The edge that separates good from exceptional.
                            </p>
                        </FxReveal>

                        <div className="grid lg:grid-cols-2 grid-cols-1 gap-10 items-start">
                            {/* Accordion list */}
                            <div className="space-y-3">
                                {reasons.map((r, i) => {
                                    const isActive = activeIndex === i;
                                    return (
                                        <FxReveal key={r.id} delay={0.06 * i}>
                                            <button
                                                onClick={() => setActiveIndex(i)}
                                                className={`block w-full text-left rounded-xl border transition-all duration-400 p-5 ${
                                                    isActive
                                                        ? `border-teal-400/40 ${isDayTime ? 'bg-teal-400/10' : 'bg-teal-400/5'} shadow-[0_0_30px_-8px_rgba(45,212,191,0.35)]`
                                                        : `${isDayTime ? 'border-white/10 hover:border-teal-400/20' : 'border-gray-200 hover:border-teal-400/30'}`
                                                }`}
                                            >
                                                <div className="flex items-center gap-3 mb-1">
                                                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-teal-400 shrink-0 animate-pulse" />}
                                                    <h3 className={`text-[1.1em] font-[600] ${isActive ? 'text-teal-400' : ''}`}>{r.title}</h3>
                                                    <span className={`ml-auto text-[1.2em] leading-none transition-transform duration-300 ${isActive ? 'rotate-45 text-teal-400' : (isDayTime ? 'text-gray-400' : 'text-gray-500')}`}>+</span>
                                                </div>
                                                <AnimatePresence>
                                                    {isActive && (
                                                        <motion.p
                                                            initial={{opacity: 0, height: 0}}
                                                            animate={{opacity: 1, height: 'auto'}}
                                                            exit={{opacity: 0, height: 0}}
                                                            className={`text-[0.85em] font-[300] leading-[1.6] overflow-hidden ${isDayTime ? 'text-gray-300' : 'text-gray-600'}`}
                                                        >
                                                            {r.description}
                                                        </motion.p>
                                                    )}
                                                </AnimatePresence>
                                            </button>
                                        </FxReveal>
                                    );
                                })}
                            </div>

                            {/* Image frame */}
                            <FxReveal delay={0.2} className="relative h-[420px] w-full">
                                <FxFrame className="h-full w-full">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={reasons[activeIndex].id}
                                            initial={{opacity: 0}}
                                            animate={{opacity: 1}}
                                            exit={{opacity: 0}}
                                            transition={{duration: 0.5}}
                                            className="absolute inset-0"
                                        >
                                            <Image
                                                src={reasons[activeIndex].image}
                                                alt={reasons[activeIndex].title}
                                                fill
                                                className="object-cover"
                                            />
                                        </motion.div>
                                    </AnimatePresence>
                                </FxFrame>
                            </FxReveal>
                        </div>
                    </div>
                </section>
            )}

            {/* ══════════════════════════════════════════
                FAQ — holographic accordion
                ══════════════════════════════════════════ */}
            {faqs.length > 0 && (
                <section className={`relative overflow-hidden ${isDayTime ? 'bg-[#050810]' : 'bg-[#050810]'}`}>
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
                CTA + COUNTUP — full FX treatment
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
                                    {/* Subtle scanline overlay */}
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
