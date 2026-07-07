'use client';
import React, {useEffect, useState, useRef, type ReactNode} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import CountUp from 'react-countup';
import {AnimatePresence, motion, useScroll, useTransform} from 'framer-motion';
import {AiFillCaretUp, AiFillCaretDown} from 'react-icons/ai';

import FloatingButton from '@/components/FloatingButton';
import ResponsiveVideoHero from '@/components/ResponsiveVideoHero';
import FuturisticDevelopmentProcess from '@/components/FuturisticDevelopmentProcess';
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
    FxStickyScrollSection,
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
    developmentProcessDescription?: string;
    ctaHeading?: ReactNode;
    ctaBody?: ReactNode;
    stats?: StatItem[];
    testimonials?: Testimonial[];
    // New: whether to show the currency-aware pricing section (default true)
    showPricing?: boolean;
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

// Why-Us card colour palette — same visual logic as Home.tsx WHY_US
const CARD_COLORS = ['#2dd4bf', '#06b6d4', '#7c3aed', '#f59e0b', '#10b981', '#ef4444'];
const CARD_ICONS = ['◈', '◉', '◎', '◇', '⬡', '⬢'];

// ─────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────
// Currency-aware Pricing component used by the template
export const CurrencyAwarePricing: React.FC<{ defaultCurrency?: string }> = ({defaultCurrency = 'NGN'}) => {
    const isDayTimeLocal = useIsDayTime();
    const [rates, setRates] = React.useState<Record<string, number> | null>(null);
    const [loading, setLoading] = React.useState(true);
    const [currency, setCurrency] = React.useState<string>(defaultCurrency || 'NGN');

    const basePlans = [
        {name: 'Launch', monthlyGBP: 1500, bullets: ['Starter strategy', 'PPC & social ads', 'Basic analytics']},
        {
            name: 'Scale',
            monthlyGBP: 5500,
            bullets: ['Full-funnel strategy', 'Multichannel campaigns', 'Advanced analytics + ML']
        },
        {
            name: 'Enterprise',
            monthlyGBP: null,
            bullets: ['Dedicated team', 'Custom integrations', 'SLA & executive reporting']
        },
    ];

    React.useEffect(() => {
        let mounted = true;

        async function fetchRates() {
            try {
                setLoading(true);
                const res = await fetch('/api/exchange');
                const json = await res.json();
                if (mounted && json && json.rates) setRates(json.rates as Record<string, number>);
            } catch (e) {
                console.error('Failed to fetch currency rates', e);
            } finally {
                if (mounted) setLoading(false);
            }
        }

        fetchRates();
        const iv = setInterval(fetchRates, 10 * 60 * 1000);
        return () => {
            mounted = false;
            clearInterval(iv);
        };
    }, []);

    const format = (amountGBP: number | null, to: string) => {
        if (amountGBP === null) return 'Custom pricing';
        if (!rates) return '—';
        const rate = (to === 'GBP') ? 1 : rates[to];
        if (!rate) return '—';
        const converted = amountGBP * rate;
        try {
            const locale = to === 'GBP' ? 'en-GB' : to === 'NGN' ? 'en-NG' : (to === 'USD' ? 'en-US' : 'en-IE');
            return new Intl.NumberFormat(locale, {style: 'currency', currency: to}).format(converted);
        } catch (e) {
            return `${to} ${converted.toFixed(0)}`;
        }
    };

    return (
        <section className="py-16">
            <div className="max-w-[90em] mx-auto px-6 sm:px-10 lg:px-[4.6em]">
                <div className="flex items-center justify-between mb-6">
                    <h3 className={`text-[1.8em] font-[700] ${isDayTimeLocal ? 'text-gray-900' : 'text-white'}`}>Packages
                        & Pricing</h3>
                    <div className="flex items-center gap-3">
                        <label className={`text-sm ${isDayTimeLocal ? 'text-gray-600' : 'text-white/60'}`}>Display
                            currency</label>
                        <select value={currency} onChange={(e) => setCurrency(e.target.value)}
                                className={`px-3 py-1 rounded border ${isDayTimeLocal ? 'bg-white/5 border-gray-200 text-gray-900' : 'bg-black/20 border-white/10 text-white'}`}>
                            <option value="GBP">GBP (£)</option>
                            <option value="NGN">NGN (₦)</option>
                            <option value="USD">USD ($)</option>
                            <option value="EUR">EUR (€)</option>
                        </select>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {basePlans.map((p) => (
                        <FxHoloCard key={p.name} day={isDayTimeLocal}
                                    className="p-6 text-center relative overflow-hidden">
                            <div
                                className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-gradient-to-br from-teal-400/20 to-cyan-400/20 blur-3xl animate-blob opacity-70"/>
                            <div className="relative z-10">
                                <div
                                    className={`text-[0.9em] ${isDayTimeLocal ? 'text-gray-700' : 'text-white/50'} uppercase mb-2`}>{p.name}</div>
                                <div
                                    className={`text-3xl font-[800] mb-3 ${isDayTimeLocal ? 'text-black' : 'text-white'}`}>{format(p.monthlyGBP, currency)}</div>
                                <div
                                    className={`${isDayTimeLocal ? 'text-gray-500' : 'text-white/40'} text-xs mb-2`}>{loading ? 'Fetching live exchange rates…' : `≈ ${format(p.monthlyGBP, 'NGN')} (₦)`}</div>
                                <ul className={`${isDayTimeLocal ? 'text-gray-700/80' : 'text-white/60'} mb-4`}>
                                    {p.bullets.map((b) => <li key={b} className="py-1">{b}</li>)}
                                </ul>
                                {p.monthlyGBP === null ? (
                                    <Link href="/quote-request">
                                        <button
                                            className="px-6 py-3 rounded-full bg-[#00f5d4] text-black font-[700]">Contact
                                            us
                                        </button>
                                    </Link>
                                ) : (
                                    <button
                                        onClick={() => window.location.href = '/quote-request?plan=' + encodeURIComponent(p.name)}
                                        className="px-6 py-3 rounded-full bg-[#00f5d4] text-black font-[700]">
                                        Get started
                                    </button>
                                )}
                            </div>
                        </FxHoloCard>
                    ))}
                </div>
            </div>
        </section>
    );
};

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
                                                             developmentProcessDescription,
                                                             ctaHeading,
                                                             ctaBody,
                                                             stats = defaultStats,
                                                             testimonials = [],
                                                             showPricing = true,
                                                         }) => {
    // Client-side derived defaults: if a page passed generic/missing props, derive meaningful
    // headings/details from the current path to avoid identical content across pages.
    const [clientDerivedTitle, setClientDerivedTitle] = useState<ReactNode | null>(null);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        try {
            const path = window.location.pathname || '';
            const seg = path.split('/').filter(Boolean).pop() || '';
            const human = seg ? seg.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => String(c).toUpperCase()) : '';
            if (!title || (typeof title === 'string' && title.trim().length === 0)) {
                setClientDerivedTitle(human || 'Our Services');
            }
        } catch (e) {
            // no-op
        }
    }, [title]);

    const resolvedTitle = clientDerivedTitle ?? title ?? 'Our Services';
    const titleText = typeof resolvedTitle === 'string' ? resolvedTitle : String(resolvedTitle);

    const resolvedIntroHeading = introHeading ?? (`${titleText} — Futuristic, data-driven solutions`);
    const resolvedIntroBody: [ReactNode, ReactNode] = introBody ?? [
        intro ?? `We design and build ${titleText} with modern, scalable architectures, AI-augmented decisioning and measurable ROI.`,
        <>Speak with our experts to tailor a roadmap for your product.</>
    ];

    const [isVisible, setIsVisible] = useState(false);
    const [activeId, setActiveId] = useState<string>(solutions[0]?.target ?? '');
    const [activeWhyUs, setActiveWhyUs] = useState(0);
    const [activeFront, setActiveFront] = useState('frontend');
    const [webIndex, setWebIndex] = useState(0);
    const [activePhase, setActivePhase] = useState<number>(0);
    const [scrollProgress, setScrollProgress] = useState<number>(0);
    const [currentDay, setCurrentDay] = useState<number>(1);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [pointer, setPointer] = useState<{ x: number; y: number }>({x: 0, y: 0});
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const particlesRef = useRef<Array<{ x: number; y: number; vx: number; vy: number; size: number }>>([]);
    const rafRef = useRef<number | null>(null);
    const intervalRef = useRef<number | null>(null);

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

    // pointer events (works for mouse + touch + pen)
    const onPointerMove = (e: PointerEvent) => {
        setPointer({x: e.clientX, y: e.clientY});
    };

    useEffect(() => {
        window.addEventListener('pointermove', onPointerMove, {passive: true});
        return () => window.removeEventListener('pointermove', onPointerMove);
    }, []);

    // scroll progress
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            setScrollProgress(scrollPercent);
        };
        window.addEventListener('scroll', handleScroll, {passive: true});
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // canvas animation
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const initParticles = () => {
            particlesRef.current = [];
            for (let i = 0; i < 50; i++) {
                particlesRef.current.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 2,
                    vy: (Math.random() - 0.5) * 2,
                    size: Math.random() * 2 + 1,
                });
            }
        };

        initParticles();

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'rgba(45, 212, 191, 0.5)';

            particlesRef.current.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
                ctx.fillRect(p.x, p.y, p.size, p.size);
            });

            rafRef.current = requestAnimationFrame(animate);
        };

        animate();

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    const scrollToSection = (target: string) => {
        const el = document.getElementById(target);
        if (el) {
            el.scrollIntoView({behavior: 'smooth', block: 'start'});
            setActiveId(target);
        }
    };

    const mutedText = isDayTime ? 'text-gray-600' : 'text-gray-400';
    const borderCol = isDayTime ? 'border-gray-200' : 'border-teal-400/15';

    const toggleWeb = (index: number) => {
        setWebIndex(webIndex === index ? -1 : index);
    };

    const tabs = [
        {key: 'frontend', label: 'Frontend'},
        {key: 'backend', label: 'Backend'},
        {key: 'mobile', label: 'Mobile'},
    ];

    const data: Record<string, Array<{ name: string; logo: string }>> = {
        frontend: [
            {name: 'React', logo: '/assets/cms/logos/react.svg'},
            {name: 'Vue', logo: '/assets/cms/logos/vue.svg'},
            {name: 'Angular', logo: '/assets/cms/logos/angular.svg'},
            {name: 'Next.js', logo: '/assets/cms/logos/next.svg'},
            {name: 'Tailwind', logo: '/assets/cms/logos/tailwind.svg'},
            {name: 'Figma', logo: '/assets/cms/logos/figma.svg'},
            {name: 'Bootstrap', logo: '/assets/cms/logos/Bootstrap.svg'},
        ],
        backend: [
            {name: 'Node.js', logo: '/assets/cms/logos/node.svg'},
            {name: 'Django', logo: '/assets/cms/logos/django.svg'},
            {name: 'Laravel', logo: '/assets/cms/logos/laravel.svg'},
            {name: 'PostgreSQL', logo: '/assets/cms/logos/postgresql.svg'},
            {name: 'MongoDB', logo: '/assets/cms/logos/mongodb.svg'},
            {name: 'Docker', logo: '/assets/cms/logos/docker.svg'},
            {name: 'AWS', logo: '/assets/cross/logos/aws.svg'},
        ],
        mobile: [
            {name: 'React Native', logo: '/assets/cross/logos/react_native.svg'},
            {name: 'Flutter', logo: '/assets/cross/logos/flutter.svg'},
            {name: 'Ionic', logo: '/assets/cross/logos/ionic.svg'},
            {name: 'Kotlin', logo: '/assets/cross/logos/kotlin.svg'},
            {name: 'Xamarin', logo: '/assets/cross/logos/xamarin.svg'},
            {name: 'Cordova', logo: '/assets/cross/logos/cordova.svg'},
            {name: 'Go', logo: '/assets/cms/logos/go.svg'},
        ],
    };

    const phases = [
        {
            days: '1-30',
            title: 'Discovery & Strategy',
            tagline: 'Understanding Your Needs',
            color: 'from-cyan-400 via-blue-500 to-indigo-600',
            accentColor: 'bg-cyan-500',
            items: [
                'Deep-dive business requirements analysis',
                'Technical architecture planning',
                'Cross-platform strategy definition',
                'Technology stack selection',
                'Development roadmap creation'
            ],
            icon: (
                <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
                    <defs>
                        <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8"/>
                            <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.8"/>
                        </linearGradient>
                    </defs>
                    <circle cx="50" cy="50" r="35" stroke="url(#g1)" strokeWidth="2" fill="none" opacity="0.3"/>
                    <circle cx="50" cy="50" r="25" stroke="url(#g1)" strokeWidth="3" fill="none"/>
                    <path d="M50 25 L50 50 L70 40" stroke="url(#g1)" strokeWidth="3" strokeLinecap="round"/>
                    <circle cx="50" cy="50" r="5" fill="url(#g1)"/>
                </svg>
            )
        },
        {
            days: '31-60',
            title: 'Development & Integration',
            tagline: 'Building Your Solution',
            color: 'from-purple-400 via-pink-500 to-rose-600',
            accentColor: 'bg-purple-500',
            items: [
                'Core feature development',
                'Third-party API integration',
                'Database architecture implementation',
                'Real-time synchronization setup',
                'Security implementation'
            ],
            icon: (
                <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
                    <defs>
                        <linearGradient id="g2" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#c084fc" stopOpacity="0.8"/>
                            <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.8"/>
                        </linearGradient>
                    </defs>
                    <path d="M50 15 L65 35 L85 35 L70 50 L75 70 L50 55 L25 70 L30 50 L15 35 L35 35 Z" stroke="url(#g2)"
                          strokeWidth="3" fill="none"/>
                    <circle cx="50" cy="50" r="12" fill="url(#g2)"/>
                </svg>
            )
        },
        {
            days: '61-90',
            title: 'Testing & Launch',
            tagline: 'Delivering Excellence',
            color: 'from-emerald-400 via-teal-500 to-cyan-600',
            accentColor: 'bg-emerald-500',
            items: [
                'Comprehensive quality assurance',
                'Performance optimization',
                'Cross-platform testing',
                'App store submission preparation',
                'Production deployment & monitoring'
            ],
            icon: (
                <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
                    <defs>
                        <linearGradient id="g3" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#34d399" stopOpacity="0.8"/>
                            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.8"/>
                        </linearGradient>
                    </defs>
                    <path d="M30 50 L45 65 L70 35" stroke="url(#g3)" strokeWidth="3" fill="none" strokeLinecap="round"
                          strokeLinejoin="round"/>
                    <circle cx="50" cy="50" r="35" stroke="url(#g3)" strokeWidth="2" fill="none" opacity="0.3"/>
                </svg>
            )
        }
    ];

    const phase = phases[activePhase];


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
                    <div className="absolute inset-0 gx-grid opacity-20 pointer-events-none"/>
                    <div className="gx-scanline pointer-events-none"/>

                    {/* Vertical accent line */}
                    <div
                        className="absolute left-[4.5em] top-0 bottom-0 w-px bg-teal-400/15 hidden lg:block pointer-events-none"/>

                    {/* Orbit accents */}
                    <div
                        className="absolute -top-[15vmax] -right-[15vmax] w-[60vmax] h-[60vmax] rounded-full border border-teal-400/10 gx-orbit pointer-events-none"/>
                    <div
                        className="absolute -top-[5vmax] -right-[5vmax] w-[40vmax] h-[40vmax] rounded-full border border-cyan-400/08 gx-orbit-reverse pointer-events-none"/>

                    {/* Content */}
                    <div
                        className="absolute inset-0 flex flex-col justify-end max-w-auto w-full pb-12 md:pb-16 px-6 sm:px-8 md:px-10 lg:px-[4.5em] text-white">

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
                            transition={{duration: 0.8, delay: 0.35, ease: [0.2, 0.7, 0.2, 1]}}
                            className="gx-glitch cursor-default select-none text-[2.2em] sm:text-[3em] md:text-[4em] lg:text-[5em] font-[700] leading-[1.05] tracking-tight mb-5 "
                        >
                            {title}
                        </motion.h1>

                        {/* Divider */}
                        <motion.div
                            initial={{scaleX: 0}}
                            animate={{scaleX: 1}}
                            transition={{duration: 0.6, delay: 0.55}}
                            className="origin-left h-px bg-white/20 w-full  mb-5"
                        />

                        {/* Bottom row: intro + stats */}
                        <div className="grid lg:grid-cols-2 grid-cols-1 gap-6 ">
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
                                        <span
                                            className="gx-gradient-text text-[2.2em] font-[700] leading-none">{s.value}</span>
                                        <span
                                            className="text-[0.68em] font-[400] text-white/55 tracking-wider mt-1">{s.label}</span>
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
                            <div className="flex-1 h-px bg-white/08"/>
                            <span>STATUS: ACTIVE</span>
                            <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"/>
                        </motion.div>
                    </div>
                </ResponsiveVideoHero>
            </div>

            {/* ══════════════════════════════════════════
                INTRO — always-dark two-col with FX
                ══════════════════════════════════════════ */}
            <section className="relative overflow-hidden bg-[#050810] text-white">
                <FxBackground day={false} grid aurora/>
                <FxOrbit size={620} top="-120px" right="-180px" opacity={0.12} speed={40}/>
                <FxOrbit size={360} top="160px" left="-120px" opacity={0.08} speed={28} reverse/>

                <div
                    className="relative z-10 lg:py-[6em] md:py-[4em] py-12 max-w-full w-full mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.5em]">
                    <FxReveal>
                        <div className="flex items-center gap-5 mb-14">
                            <FxChip day={false}>{eyebrow}</FxChip>
                            <div className="flex-1 h-px bg-white/10"/>
                            <span className="font-mono text-[0.7em] tracking-widest text-white/30">
                                {typeof introHeading === 'string' ? introHeading : 'INTRO'}
                            </span>
                        </div>
                    </FxReveal>

                    <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                        <FxReveal>
                            <div className="relative">
                                <div
                                    className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-teal-400 rounded-tl-sm z-10"/>
                                <div
                                    className="absolute -top-3 -right-3 w-8 h-8 border-t-2 border-r-2 border-teal-400 rounded-tr-sm z-10"/>
                                <div
                                    className="absolute -bottom-3 -left-3 w-8 h-8 border-b-2 border-l-2 border-teal-400 rounded-bl-sm z-10"/>
                                <div
                                    className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-teal-400 rounded-br-sm z-10"/>
                                <div className="absolute inset-0 rounded-2xl opacity-40"
                                     style={{boxShadow: '0 0 60px -10px rgba(45,212,191,0.45)'}}/>
                                <div
                                    className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-7 lg:p-8">
                                    <FxGlitchText tag="h3"
                                                  className="text-[2.1em] sm:text-[2.6em] lg:text-[3.4em] font-[700] leading-[1.08] tracking-tight">
                                        {introHeading}
                                    </FxGlitchText>
                                    <div className="mt-6 flex flex-wrap gap-3">
                                        {heroStats.slice(0, 3).map((s) => (
                                            <span key={s.label} className="gx-data-pill">{s.label}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </FxReveal>

                        <FxReveal delay={0.12}>
                            <div
                                className="grid lg:grid-cols-2 grid-cols-1 gap-5 font-[300] text-[0.87em] leading-[1.7] tracking-normal text-gray-300">
                                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 lg:p-6">
                                    {introBody[0]}
                                </div>
                                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 lg:p-6">
                                    {introBody[1]}
                                </div>
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
            <FxStickyScrollSection
                day={false}
                heading={solutionsHeading}
                intro={solutionsIntro}
                navLabel="Our Solutions"
                activeId={activeId}
                onNavClick={scrollToSection}
                items={solutions}
            />

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
                                         style={{background: 'linear-gradient(to top, rgba(5,8,16,0.6), transparent)'}}/>
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
                    <FxBackground day={false} grid aurora/>
                    <FxOrbit size={600} top="-80px" left="-180px" opacity={0.12} speed={40}/>
                    <FxOrbit size={350} bottom="-60px" right="-100px" opacity={0.09} speed={25} reverse/>

                    <div
                        className="relative z-10 max-w-full w-full mx-auto px-6 sm:px-8 md:px-10 lg:px-[4.5em] lg:py-[6em] md:py-20 py-14 text-white">
                        {/* Scanline */}
                        <div className="gx-scanline pointer-events-none"/>

                        {/* Header */}
                        <FxReveal>
                            <div className="flex items-center gap-5 mb-6">
                                <FxChip day={false}>WHY CHOOSE US</FxChip>
                                <div className="flex-1 h-px bg-white/10"/>
                                <span
                                    className="font-mono text-[0.68em] tracking-widest text-white/25">8+ YRS PROVEN</span>
                            </div>
                            <h2 className="text-[2.8em] lg:text-[4em] font-[800] leading-[1.05] tracking-tight mb-6">
                                Not just a vendor.<br/>
                                <span className="gx-gradient-text">Your competitive edge.</span>
                            </h2>
                            <p className="text-white/55 max-w-2xl text-[0.95em] leading-[1.8] mb-16">
                                We&apos;ve built, scaled, and delivered digital products across industries. Here&apos;s
                                why forward-thinking teams trust Grey InfoTech with their most critical builds.
                            </p>
                        </FxReveal>

                        {/* Interactive 3-col grid — exact Home.tsx pattern */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
                            {reasons.map((r, i) => {
                                const color = CARD_COLORS[i % CARD_COLORS.length];
                                const icon = CARD_ICONS[i % CARD_ICONS.length];
                                const isActive = activeWhyUs === i;
                                return (
                                    <motion.div
                                        key={r.id}
                                        className="relative group cursor-pointer rounded-2xl p-7 border transition-all duration-500 overflow-hidden"
                                        style={{
                                            background: isActive ? `${color}10` : 'rgba(255,255,255,0.02)',
                                            borderColor: isActive ? `${color}50` : 'rgba(255,255,255,0.07)',
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
                                            <span className="font-mono text-[0.65em] tracking-widest"
                                                  style={{color: color + '99'}}>
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
                                    <div className="flex-1 h-px bg-white/08"/>
                                </div>
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                                    {[
                                        {val: '50+', label: 'Products Delivered', sub: 'Live in production'},
                                        {val: '8+', label: 'Years Experience', sub: 'Since 2016'},
                                        {val: '15+', label: 'Industries', sub: 'Served globally'},
                                        {val: '99%', label: 'Client Retention', sub: 'They come back'},
                                    ].map((s, i) => (
                                        <motion.div
                                            key={s.label}
                                            className="text-center lg:text-left"
                                            initial={{opacity: 0, y: 20}}
                                            whileInView={{opacity: 1, y: 0}}
                                            viewport={{once: true}}
                                            transition={{delay: i * 0.1 + 0.2}}
                                        >
                                            <div
                                                className="text-[3em] font-[900] gx-gradient-text leading-none mb-1">{s.val}</div>
                                            <div
                                                className="text-white/70 text-[0.82em] font-[600] mb-0.5">{s.label}</div>
                                            <div
                                                className="text-white/30 text-[0.68em] uppercase tracking-wider">{s.sub}</div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </FxReveal>
                    </div>
                </section>
            )}

            {/* ══════════════════════════════════════════
               TECHNOLOGIES & INDUSTRY SOLUTIONS
               ══════════════════════════════════════════ */}
            {/* Technologies We Use */}
            <div
                className={`lg:pt-[2em] md:pt-[2em] pt-[1em] lg:pb-[2em] md:pb-[2em] pb-[1em] ${isDayTime ? 'bg-white' : 'bg-slate-600'}`}>
                <div id={'Toolchain'}
                     className={`relative lg:mt-[1.5em] md:mt-[1.5em] mt-[1em] lg:mb-16 md:mb-16 mb-5 max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>
                    <div className={`${isDayTime ? 'text-black' : 'text-white'} text-center`}>
                        <h2 className="capitalize text-[1.8em] md:text-[3em] lg:text-[3.3em] font-[700] tracking-tight leading-[1.2] lg:pb-6">
                            <span className={'text-[#00f5d4]'}>Technologies</span> We Use
                        </h2>
                        <p className="mx-auto mt-4 max-w-5xl text-[0.9em] leading-relaxed ">
                            Grey InfoTech harnesses cutting-edge cross-platform technologies and frameworks to architect
                            mobile solutions that align precisely with your strategic business objectives. Our
                            development team leverages industry-leading platforms including React Native, Flutter, and
                            Xamarin, combined with cloud-native architectures, advanced API integrations, and modern
                            DevOps practices to create scalable, high-performance applications. By employing progressive
                            development methodologies, real-time analytics integration, and AI-powered features, we
                            ensure your mobile presence not only meets current market demands but anticipates future
                            technological evolution.
                        </p>

                        {/* Tabs */}
                        <div
                            className="mt-20 flex flex-wrap justify-center gap-8 border-b text-[1.3em] font-[500] text-gray-400">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.key}
                                    onClick={() => setActiveFront(tab.key)}
                                    className={`pb-1.5 transition-colors ${
                                        activeFront === tab.key
                                            ? "border-b-1 border-[#00f5d4] text-[#00f5d4]"
                                            : "hover:text-gray-800"
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* Content */}
                        <div className="mt-16">
                            <div
                                className="mx-auto grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-8 justify-start items-start">
                                {data[activeFront]?.map((item) => (
                                    <div key={item.name} className="flex flex-col items-center gap-1.5">
                                        <div className="relative h-16 w-16 lg:h-28 lg:w-28 md:h-20 md:w-20">
                                            <Image
                                                src={item.logo}
                                                alt={item.name}
                                                fill
                                                className="object-contain"
                                                sizes="(min-width:1024px) 64px, (min-width:768px) 56px, 48px"
                                            />
                                        </div>
                                        <span
                                            className="text-[1em] md:text-[1.3em] lg:text-[1.3em] text-center font-medium  break-words max-w-[8rem]">
                                          {item.name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Industry-Specific Cross-Platform App Development */}
            <div
                className={`lg:pt-[2em] h-auto border-b max-w-full w-full mx-auto ${isDayTime ? 'bg-black border-white' : 'bg-white border-black'}`}>
                <div
                    className={`relative max-w-full w-full mx-auto px-4 sm:px-6 lg:px-[4.6em] lg:pt-[3em] md:pt-[3em] pt-[1.2em] lg:pb-[6em] md:pb-[6em] pb-[1.2em] mt-14`}>
                    <div
                        className={`relative grid lg:grid-cols-2 grid-cols-1 gap-10 mb-8 ${isDayTime ? 'text-white' : 'text-black'} `}>
                        <div className={'lg:mr-[8em]'}>
                            <h2 className={`lg:text-[3.1em] md:text-[3.1em] text-[1.8em] font-[700] justify-center tracking-tight lg:mb-12 mb-7 leading-[1.2]`}>
                                <span className={'text-[#00f5d4]'}>Industry-Specific</span> Cross-Platform <span
                                className={'text-[#00f5d4]'}>App Development</span>
                            </h2>
                            <p className={'text-[0.873em] font-normal leading-normal tracking-normal text-justify'}>
                                Grey InfoTech's industry-specialized cross-platform development expertise delivers
                                solutions precisely calibrated to the unique regulatory requirements, operational
                                workflows, and competitive dynamics of your sector. Our deep vertical knowledge spans
                                healthcare, finance, retail, logistics, manufacturing, and beyond—enabling us to
                                architect applications that address industry-specific challenges while exceeding
                                compliance standards and performance benchmarks.
                            </p>
                        </div>
                        <div
                            className={`lg:-ml-5 md:-ml-5 border-t pt-[6em] relative mx-auto max-w-full w-full space-y-2 ${isDayTime ? 'text-white' : 'text-black'}`}>
                            <div className={`w-full border-b pb-6 mt-6`}>
                                <button
                                    onClick={() => toggleWeb(0)}
                                    className="flex items-center justify-between w-full text-start lg:text-[1.6em] md:text-[1.5em] sm:text-base font-medium focus:outline-none"
                                >
                                    <span className={'capitalize'}>IT Staff Augmentation & Resource Management Applications</span>
                                    {webIndex === 0 ? (
                                        <AiFillCaretUp
                                            className={`lg:text-[1.5em] text-[1em]`}/>
                                    ) : (
                                        <AiFillCaretDown
                                            className={`lg:text-[1.5em] text-[1em]`}/>
                                    )}
                                </button>
                                {webIndex === 0 && (
                                    <p className="mt-4 text-[0.873em] text-justify tracking-normal leading-[1.5] text-gray-400">
                                        We develop specialized cross-platform applications for IT staffing agencies,
                                        technology consulting firms, and enterprise IT departments that optimize
                                        resource allocation, streamline talent management, and enhance client-consultant
                                        collaboration. Our IT staffing solutions integrate comprehensive consultant
                                        databases with detailed skill profiles, certifications, experience levels,
                                        technology expertise, and availability status, advanced matching algorithms
                                        pairing consultants with project requirements based on skills and cultural fit,
                                        project management with resource forecasting and utilization tracking, timesheet
                                        management with mobile time entry and automated invoicing, applicant tracking
                                        for candidate sourcing and interview scheduling, client relationship management
                                        with contract details and billing rates, bench management with skills gap
                                        analysis and training recommendations, vendor management for subcontractor
                                        coordination, onboarding workflows with document collection and equipment
                                        provisioning, performance management with reviews and skill assessments,
                                        compliance tracking for certifications and work authorization, mobile access for
                                        consultants to view assignments and submit timesheets, client portals for
                                        requisition submission and consultant evaluation, resource forecasting tools
                                        predicting staffing needs, assignment history tracking for experience
                                        documentation, expense management, communication tools for team coordination,
                                        and reporting dashboards with utilization rates and revenue metrics.
                                    </p>
                                )}
                            </div>
                            <div className={`w-full border-b pb-6`}>
                                <button
                                    onClick={() => toggleWeb(1)}
                                    className="flex items-center mt-6 justify-between w-full text-start lg:text-[1.6em] md:text-[1.5em] sm:text-base font-medium focus:outline-none"
                                >
                                    <span className={'capitalize'}>Music & Entertainment Streaming Applications</span>
                                    {webIndex === 1 ? (
                                        <AiFillCaretUp
                                            className={`lg:text-[1.5em] text-[1em]`}/>
                                    ) : (
                                        <AiFillCaretDown
                                            className={`lg:text-[1.5em] text-[1em]`}/>
                                    )}
                                </button>
                                {webIndex === 1 && (
                                    <p className="mt-4 text-[0.873em] text-justify tracking-normal leading-[1.5] text-gray-400">

                                        Our cross-platform music and entertainment applications serve record labels,
                                        independent artists, streaming platforms, and media companies with sophisticated
                                        solutions for content discovery, playback, and social engagement. We develop
                                        immersive platforms featuring extensive music libraries with millions of tracks,
                                        intelligent search with genre and mood filters, personalized AI-powered
                                        recommendations analyzing listening behavior, curated playlists by music
                                        experts, user-generated collaborative playlists, high-quality adaptive bitrate
                                        streaming, offline downloads, seamless playback across devices with synchronized
                                        positions, social features for following friends and sharing tracks.
                                    </p>
                                )}
                            </div>
                            <div className={`w-full border-b pb-6`}>
                                <button
                                    onClick={() => toggleWeb(2)}
                                    className="flex mt-6 items-center justify-between w-full text-start lg:text-[1.6em] md:text-[1.5em] sm:text-base font-medium focus:outline-none"
                                >
                                    <span className={'capitalize'}>Business & Corporate Productivity Applications</span>
                                    {webIndex === 2 ? (
                                        <AiFillCaretUp
                                            className={`lg:text-[1.5em] text-[1em]`}/>
                                    ) : (
                                        <AiFillCaretDown
                                            className={`lg:text-[1.5em] text-[1em]`}/>
                                    )}
                                </button>
                                {webIndex === 2 && (
                                    <p className="mt-4 text-[0.873em] text-justify tracking-normal leading-[1.5] text-gray-400">
                                        We architect enterprise-grade cross-platform business applications for
                                        corporations, professional services firms, and consulting companies that enhance
                                        workplace productivity and streamline collaboration across iOS and Android
                                        platforms. Our corporate solutions integrate comprehensive project management
                                        with task assignment, milestone tracking, and resource allocation, team
                                        collaboration with threaded discussions and file sharing, document management
                                        with version control and collaborative editing, time tracking and timesheet
                                        management with billable hours, expense management with receipt capture and
                                        approval workflows, CRM functionality for contact management and sales pipeline
                                        tracking, meeting scheduling with calendar integration and room booking, mobile
                                        access to business intelligence dashboards and KPI monitoring, secure messaging
                                        and video conferencing, employee directory with organizational charts.
                                    </p>
                                )}
                            </div>
                            <div className={`w-full border-b pb-6`}>
                                <button
                                    onClick={() => toggleWeb(3)}
                                    className="flex mt-6 items-center justify-between w-full text-start lg:text-[1.6em] md:text-[1.5em] sm:text-base font-medium focus:outline-none"
                                >
                                    <span className={'capitalize'}>Logistics & Transportation Applications</span>
                                    {webIndex === 3 ? (
                                        <AiFillCaretUp
                                            className={`lg:text-[1.5em] text-[1em]`}/>
                                    ) : (
                                        <AiFillCaretDown
                                            className={`lg:text-[1.5em] text-[1em]`}/>
                                    )}
                                </button>
                                {webIndex === 3 && (
                                    <p className="mt-4 text-[0.873em] text-justify tracking-normal leading-[1.5] text-gray-400">
                                        Our cross-platform logistics applications serve freight companies, courier
                                        services, fleet operators, and supply chain businesses with comprehensive
                                        solutions for route optimization, shipment tracking, and driver management. We
                                        develop robust platforms with shipment booking and instant quotes, real-time GPS
                                        tracking, proof of delivery with digital signatures and photos, driver apps with
                                        optimized route navigation, job acceptance and status updates, barcode and QR
                                        code scanning, electronic logging for compliance, vehicle inspection checklists,
                                        load matching marketplace functionality, customer notifications for shipment
                                        status, estimated arrival times with live traffic updates.
                                    </p>
                                )}
                            </div>
                            <div className={`w-full border-b pb-6`}>
                                <button
                                    onClick={() => toggleWeb(4)}
                                    className="flex mt-6 items-center justify-between w-full text-start lg:text-[1.6em] md:text-[1.5em] sm:text-base font-medium focus:outline-none"
                                >
                                    <span className={'capitalize'}>Fitness & Wellness Applications</span>
                                    {webIndex === 4 ? (
                                        <AiFillCaretUp
                                            className={`lg:text-[1.5em] text-[1em]`}/>
                                    ) : (
                                        <AiFillCaretDown
                                            className={`lg:text-[1.5em] text-[1em]`}/>
                                    )}
                                </button>
                                {webIndex === 4 && (
                                    <p className="mt-4 text-[0.873em] text-justify tracking-normal leading-[1.5] text-gray-400">
                                        We develop engaging cross-platform fitness applications for gyms, studios,
                                        personal trainers, and wellness centers that motivate users, track progress, and
                                        deliver personalized health experiences. Our wellness solutions integrate
                                        workout libraries with video demonstrations, customizable workout plans based on
                                        goals and experience levels, workout tracking with sets and reps logging,
                                        exercise timers, progress tracking with body measurements and performance
                                        metrics, wearable device integration for automatic activity syncing, nutrition
                                        tracking with food diary and calorie counting, meal planning with recipes,
                                        hydration and sleep monitoring, guided meditation and yoga routines, personal
                                        training session booking, class schedules and check-in, virtual training
                                        sessions, social features for connecting with workout buddies, challenges and
                                        competitions, achievement badges.
                                    </p>
                                )}
                            </div>
                            <div className={`w-full border-b pb-6`}>
                                <button
                                    onClick={() => toggleWeb(5)}
                                    className="flex mt-6 items-center justify-between w-full text-start lg:text-[1.6em] md:text-[1.5em] sm:text-base font-medium focus:outline-none"
                                >
                                    <span className={'capitalize'}>Food & Restaurant Delivery Applications</span>
                                    {webIndex === 5 ? (
                                        <AiFillCaretUp
                                            className={`lg:text-[1.5em] text-[1em]`}/>
                                    ) : (
                                        <AiFillCaretDown
                                            className={`lg:text-[1.5em] text-[1em]`}/>
                                    )}
                                </button>
                                {webIndex === 5 && (
                                    <p className="mt-4 text-[0.873em] text-justify tracking-normal leading-[1.5] text-gray-400">
                                        Our cross-platform food delivery applications serve restaurant chains, cloud
                                        kitchens, and delivery platforms with comprehensive solutions for menu browsing,
                                        ordering, payment processing, and delivery coordination. We develop
                                        sophisticated platforms featuring visually appealing restaurant and menu
                                        browsing with high-quality photography, detailed dish descriptions with
                                        nutritional information, advanced search and filtering by cuisine, dietary
                                        preferences, and delivery time, personalized recommendations, customizable
                                        orders with modifications, multiple payment options including digital wallets,
                                        real-time order tracking with GPS-enabled driver location, push notifications
                                        for order status updates, order history for quick reordering.
                                    </p>
                                )}
                            </div>
                            <div className={`w-full border-b pb-6`}>
                                <button
                                    onClick={() => toggleWeb(6)}
                                    className="flex mt-6 items-center justify-between w-full text-start lg:text-[1.6em] md:text-[1.5em] sm:text-base font-medium focus:outline-none"
                                >
                                    <span className={'capitalize'}>Education & E-Learning Applications</span>
                                    {webIndex === 6 ? (
                                        <AiFillCaretUp
                                            className={`lg:text-[1.5em] text-[1em]`}/>
                                    ) : (
                                        <AiFillCaretDown
                                            className={`lg:text-[1.5em] text-[1em]`}/>
                                    )}
                                </button>
                                {webIndex === 6 && (
                                    <p className="mt-4 text-[0.873em] text-justify tracking-normal leading-[1.5] text-gray-400">
                                        We create comprehensive cross-platform educational applications for schools,
                                        universities, corporate training programs, and online learning platforms that
                                        facilitate engaging learning experiences and streamline administrative
                                        processes. Our educational solutions encompass course catalogs and enrollment,
                                        interactive multimedia lessons, video lectures with note-taking, document
                                        libraries, assignment submission and grading, assessments with various question
                                        types, discussion forums, real-time messaging and video conferencing, calendar
                                        integration, grade tracking and progress monitoring, attendance management, push
                                        notifications for deadlines, offline content access, certificate generation.
                                    </p>
                                )}
                            </div>
                            <div className={`w-full border-b pb-6`}>
                                <button
                                    onClick={() => toggleWeb(7)}
                                    className="flex mt-6 items-center justify-between w-full text-start lg:text-[1.6em] md:text-[1.5em] sm:text-base font-medium focus:outline-none"
                                >
                                    <span className={'capitalize'}>E-Commerce & Retail Applications</span>
                                    {webIndex === 7 ? (
                                        <AiFillCaretUp
                                            className={`lg:text-[1.5em] text-[1em]`}/>
                                    ) : (
                                        <AiFillCaretDown
                                            className={`lg:text-[1.5em] text-[1em]`}/>
                                    )}
                                </button>
                                {webIndex === 7 && (
                                    <p className="mt-4 text-[0.873em] text-justify tracking-normal leading-[1.5] text-gray-400">
                                        We architect sophisticated cross-platform shopping applications for retailers,
                                        consumer brands, and marketplace platforms that create seamless omnichannel
                                        experiences and maximize conversion rates across mobile devices. Our e-commerce
                                        solutions integrate comprehensive product catalogs with advanced search and
                                        filtering, detailed product pages with 360-degree views, AI-powered personalized
                                        recommendations, shopping cart and wish lists, secure checkout with multiple
                                        payment options, real-time order tracking, customer reviews and ratings, loyalty
                                        program integration, push notifications for promotions and price drops, barcode
                                        scanning, augmented reality try-on experiences, store locator with inventory
                                        availability, buy-online-pickup-in-store capabilities.
                                    </p>
                                )}
                            </div>
                            <div className={`w-full border-b pb-6`}>
                                <button
                                    onClick={() => toggleWeb(8)}
                                    className="flex mt-6 items-center justify-between w-full text-start lg:text-[1.6em] md:text-[1.5em] sm:text-base font-medium focus:outline-none"
                                >
                                    <span className={'capitalize'}>Finance & Banking Applications</span>
                                    {webIndex === 8 ? (
                                        <AiFillCaretUp
                                            className={`lg:text-[1.5em] text-[1em]`}/>
                                    ) : (
                                        <AiFillCaretDown
                                            className={`lg:text-[1.5em] text-[1em]`}/>
                                    )}
                                </button>
                                {webIndex === 8 && (
                                    <p className="mt-4 text-[0.873em] text-justify tracking-normal leading-[1.5] text-gray-400">
                                        Our cross-platform financial applications serve banks, fintech startups,
                                        investment firms, and insurance companies with secure, feature-rich mobile
                                        banking and financial services platforms that deliver consistent experiences
                                        across iOS and Android. We develop comprehensive solutions with account
                                        management, real-time balance and transaction history, funds transfer, mobile
                                        check deposit with OCR technology, bill payment, cardless ATM withdrawal,
                                        spending analytics and budgeting tools, savings goals, loan applications,
                                        investment portfolio tracking, fraud alerts, biometric authentication, and
                                        secure customer service messaging.
                                    </p>
                                )}
                            </div>
                            <div className={`w-full border-b pb-6`}>
                                <button
                                    onClick={() => toggleWeb(9)}
                                    className="flex mt-6 items-center justify-between w-full text-start lg:text-[1.6em] md:text-[1.5em] sm:text-base font-medium focus:outline-none"
                                >
                                    <span className={'capitalize'}>Healthcare & Telemedicine Applications</span>
                                    {webIndex === 9 ? (
                                        <AiFillCaretUp
                                            className={`lg:text-[1.5em] text-[1em]`}/>
                                    ) : (
                                        <AiFillCaretDown
                                            className={`lg:text-[1.5em] text-[1em]`}/>
                                    )}
                                </button>
                                {webIndex === 9 && (
                                    <p className="mt-4 text-[0.873em] text-justify tracking-normal leading-[1.5] text-gray-400">
                                        We develop HIPAA-compliant cross-platform mobile applications for healthcare
                                        providers, telemedicine platforms, and medical institutions that enable secure
                                        patient engagement and clinical workflow management across iOS and Android
                                        devices. Our healthcare solutions integrate electronic health records,
                                        appointment scheduling, secure video consultations with end-to-end encryption,
                                        prescription management, patient vital monitoring through wearable integration,
                                        medication reminders, and symptom tracking.
                                    </p>
                                )}
                            </div>
                            <div className={`w-full`}>
                                <button
                                    onClick={() => toggleWeb(10)}
                                    className="flex mt-6 items-center justify-between w-full text-start lg:text-[1.6em] md:text-[1.5em] sm:text-base font-medium focus:outline-none"
                                >
                                    <span className={'capitalize'}>Real Estate & Property Management Applications</span>
                                    {webIndex === 10 ? (
                                        <AiFillCaretUp
                                            className={`lg:text-[1.5em] text-[1em]`}/>
                                    ) : (
                                        <AiFillCaretDown
                                            className={`lg:text-[1.5em] text-[1em]`}/>
                                    )}
                                </button>
                                {webIndex === 10 && (
                                    <p className="mt-4 text-[0.873em] text-justify tracking-normal leading-[1.5] text-gray-400">
                                        Our cross-platform real estate applications serve property developers, agencies,
                                        and management companies with comprehensive solutions for property search,
                                        virtual tours, and tenant engagement. We develop feature-rich platforms with
                                        advanced property search and filtering, interactive map views with neighborhood
                                        insights, high-quality galleries and 360-degree virtual tours, augmented reality
                                        visualization for staging, saved searches with push notifications for new
                                        listings, mortgage calculators, appointment scheduling, agent communication,
                                        document management, digital signatures, rent payment processing, maintenance
                                        request tracking, inspection documentation, amenity booking.
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ══════════════════════════════════════════
               OUR PROVEN 90-DAY PROCESS
               ══════════════════════════════════════════ */}
            <div
                className={`lg:pt-[2em] md:pt-[2em] pt-[1em] lg:pb-[2em] md:pb-[2em] pb-[1em] ${isDayTime ? 'bg-black' : 'bg-white'}`}>
                <div id={'Our-proven-process'}
                     className={`relative z-10 lg:mt-[1.5em] md:mt-[1.5em] mt-[1em] lg:mb-16 md:mb-16 mb-5 max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>

                    <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0"/>

                    <div
                        className={`absolute inset-0 z-0 pointer-events-none ${isDayTime ? 'opacity-[0.14]' : 'opacity-10'}`}
                        style={{
                            transform: `translate(${pointer.x * 20}px, ${pointer.y * 20}px)`,
                            transition: 'transform 0.3s ease-out'
                        }}
                    >
                        <div className="absolute top-20 left-20 w-72 h-72 md:w-96 md:h-96 bg-cyan-500 rounded-full blur-3xl"/>
                        <div className="absolute bottom-20 right-20 w-72 h-72 md:w-96 md:h-96 bg-purple-500 rounded-full blur-3xl"/>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 md:w-96 md:h-96 bg-emerald-500 rounded-full blur-3xl"/>
                    </div>

                    {/* holographic grid */}
                    <div
                        aria-hidden
                        className="absolute inset-0 z-0 pointer-events-none"
                        style={{
                            backgroundImage: `linear-gradient(${isDayTime ? 'rgba(15,23,42,0.06)' : 'rgba(0,245,212,0.06)'} 1px, transparent 1px), linear-gradient(90deg, ${isDayTime ? 'rgba(15,23,42,0.06)' : 'rgba(0,245,212,0.06)'} 1px, transparent 1px)`,
                            backgroundSize: '44px 44px',
                            maskImage: 'radial-gradient(ellipse 90% 75% at 50% 40%, black 25%, transparent 100%)',
                            WebkitMaskImage: 'radial-gradient(ellipse 90% 75% at 50% 40%, black 25%, transparent 100%)'
                        }}
                    />

                    {/* scanline sweep */}
                    <div aria-hidden className="absolute inset-0 z-0 pointer-events-none">
                        <div
                            className={`dm-scanline absolute left-0 right-0 h-px ${isDayTime ? 'bg-gradient-to-r from-transparent via-[rgba(13,148,136,0.45)] to-transparent' : 'bg-gradient-to-r from-transparent via-[rgba(0,245,212,0.55)] to-transparent'}`}/>
                    </div>

                    {/* Header */}
                    <div
                        className={`relative ${isDayTime ? 'text-gray-900' : 'text-white'} text-center mb-12 md:mb-20 lg:mb-20 border-b ${isDayTime ? 'border-gray-200' : 'border-gray-700'} pb-[2em] space-y-6`}>
                        <div
                            className={`inline-flex items-center gap-3 px-5 py-2 rounded-full border backdrop-blur-sm font-mono text-[0.65em] font-[600] tracking-[0.35em] uppercase ${isDayTime ? 'border-teal-600/30 bg-teal-500/5 text-teal-700' : 'border-[#00f5d4]/30 bg-[#00f5d4]/5 text-[#00f5d4]'}`}>
                            <span className="relative flex h-2 w-2">
                                <span
                                    className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isDayTime ? 'bg-teal-600' : 'bg-[#00f5d4]'}`}/>
                                <span
                                    className={`relative inline-flex rounded-full h-2 w-2 ${isDayTime ? 'bg-teal-600' : 'bg-[#00f5d4]'}`}/>
                            </span>
                            Mission Protocol // Transformation Timeline
                        </div>
                        <h2 className={'capitalize text-[1.8em] md:text-[3em] lg:text-[3.3em] font-[700] tracking-tight leading-[1.2] lg:pb-6'}>
                            Our Proven <span
                            className={`text-transparent bg-clip-text bg-gradient-to-r animate-gradient ${isDayTime ? 'from-teal-600 via-cyan-600 to-violet-600' : 'from-[#00f5d4] via-cyan-400 to-violet-400'}`}>{phases.reduce((sum, p) => sum + parseInt(p.days.split('-')[1]), 0)}-Day Process</span>
                        </h2>
                        <p className={`text-[0.9em] font-[300] lg:-mt-[0.2em] rounded-none leading-[1.6] mx-auto max-w-7xl ${isDayTime ? 'text-gray-600' : 'text-gray-300'}`}>
                            Our comprehensive {phases.reduce((sum, p) => sum + parseInt(p.days.split('-')[1]), 0)}-day transformation methodology is engineered for measurable impact. Through strategic discovery, precise execution, and continuous optimization across {phases.length} distinct phases, we accelerate your time-to-value while maintaining alignment with your business objectives at every milestone. Our proven framework combines industry-leading best practices with adaptive agile responsiveness, turning initial engagement into tangible, sustainable outcomes that drive competitive advantage and long-term growth trajectory.
                        </p>
                        <div className="flex justify-center items-center gap-4 pt-8 flex-wrap">
                            {phases.map((p, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActivePhase(i)}
                                    className={`group relative transition-all duration-500 ${activePhase === i ? 'scale-110' : 'scale-100 opacity-70'}`}
                                    aria-label={`Select phase ${i + 1}`}
                                >
                                    <div
                                        className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br ${p.color} p-0.5 transition-all duration-500 ${activePhase === i ? 'rotate-0 shadow-lg shadow-cyan-500/30' : 'rotate-45'}`}>
                                        <div
                                            className={`w-full h-full ${isDayTime ? 'bg-white' : 'bg-black'} rounded-2xl flex items-center justify-center transition-colors duration-500`}>
                                            <span className={`text-sm font-bold font-mono transition-transform duration-500 ${activePhase === i ? 'rotate-0' : '-rotate-45'} ${isDayTime ? 'text-gray-900' : 'text-white'}`}>{String(i + 1).padStart(2, '0')}</span>
                                        </div>
                                    </div>
                                    {activePhase === i && <div
                                        className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 ${isDayTime ? 'bg-gray-900' : 'bg-white'} rounded-full animate-ping`}/>}
                                </button>
                            ))}
                        </div>

                        {/* Mission timeline HUD */}
                        <div
                            className={`relative max-w-4xl mx-auto text-left rounded-2xl border backdrop-blur-md px-8 py-7 ${isDayTime ? 'border-gray-200 bg-white/70 shadow-lg' : 'border-gray-800 bg-gray-900/50 shadow-2xl'}`}>
                            <span aria-hidden
                                  className={`absolute -top-px -left-px w-5 h-5 border-t-2 border-l-2 rounded-tl-2xl ${isDayTime ? 'border-teal-600' : 'border-[#00f5d4]'}`}/>
                            <span aria-hidden
                                  className={`absolute -top-px -right-px w-5 h-5 border-t-2 border-r-2 rounded-tr-2xl ${isDayTime ? 'border-teal-600' : 'border-[#00f5d4]'}`}/>
                            <span aria-hidden
                                  className={`absolute -bottom-px -left-px w-5 h-5 border-b-2 border-l-2 rounded-bl-2xl ${isDayTime ? 'border-teal-600' : 'border-[#00f5d4]'}`}/>
                            <span aria-hidden
                                  className={`absolute -bottom-px -right-px w-5 h-5 border-b-2 border-r-2 rounded-br-2xl ${isDayTime ? 'border-teal-600' : 'border-[#00f5d4]'}`}/>

                            <div
                                className={`flex items-center justify-between font-mono text-[0.75em] tracking-[0.3em] uppercase mb-4 ${isDayTime ? 'text-gray-500' : 'text-gray-400'}`}>
                                <span className="font-bold">MISSION TIMELINE</span>
                                <span
                                    className={`font-bold ${isDayTime ? 'text-teal-700' : 'text-[#00f5d4]'}`}>DAY {String(currentDay).padStart(2, '0')} / {phases.reduce((sum, p) => sum + parseInt(p.days.split('-')[1]), 0)}</span>
                            </div>
                            
                            <div className="mb-6">
                                <div
                                    className={`relative h-3 rounded-full overflow-hidden ${isDayTime ? 'bg-gradient-to-r from-gray-100 to-gray-200' : 'bg-gradient-to-r from-gray-800 to-gray-900'}`}>
                                    <div
                                        className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-emerald-500 transition-all duration-300 shadow-lg shadow-cyan-500/30"
                                        style={{width: `${(currentDay / phases.reduce((sum, p) => sum + parseInt(p.days.split('-')[1]), 0)) * 100}%`}}/>
                                    
                                    {/* Dynamic phase dividers based on actual phase day ranges */}
                                    {phases.map((phase, idx) => {
                                        const startDay = phases.slice(0, idx).reduce((sum, p) => sum + parseInt(p.days.split('-')[1]), 0);
                                        const endDay = startDay + parseInt(phase.days.split('-')[1]);
                                        const phasePercentage = (endDay / phases.reduce((sum, p) => sum + parseInt(p.days.split('-')[1]), 0)) * 100;
                                        
                                        return (
                                            <span 
                                                key={idx}
                                                aria-hidden
                                                className={`absolute top-0 bottom-0 w-px transition-colors duration-300 ${isDayTime ? 'bg-white/60' : 'bg-gray-950/60'}`}
                                                style={{left: `${phasePercentage}%`}}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                            
                            <div className="flex flex-wrap items-center justify-between gap-4">
                                <div className={`flex gap-6 font-mono text-[0.7em] tracking-[0.25em] uppercase font-bold ${isDayTime ? 'text-gray-500' : 'text-gray-400'}`}>
                                    {phases.map((phase, idx) => {
                                        const phaseStartDay = phases.slice(0, idx).reduce((sum, p) => sum + parseInt(p.days.split('-')[1]), 0) + 1;
                                        const phaseEndDay = phaseStartDay + parseInt(phase.days.split('-')[1]) - 1;
                                        
                                        return (
                                            <div 
                                                key={idx}
                                                className={`flex flex-col items-center transition-all duration-300 ${activePhase === idx ? (isDayTime ? 'text-gray-900' : 'text-white') : ''}`}
                                            >
                                                <span className={`text-[0.85em] font-black ${activePhase === idx ? (isDayTime ? (idx === 0 ? 'text-cyan-700' : idx === 1 ? 'text-purple-700' : 'text-emerald-700') : (idx === 0 ? 'text-cyan-400' : idx === 1 ? 'text-purple-400' : 'text-emerald-400')) : ''}`}>
                                                    {String(idx + 1).padStart(2, '0')} {phase.title.split(' ')[0]}
                                                </span>
                                                <span className={`text-[0.65em] font-mono mt-1 ${isDayTime ? 'text-gray-400' : 'text-gray-500'}`}>
                                                    D{phaseStartDay}-{phaseEndDay}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                                
                                <div className="flex gap-2">
                                    <button onClick={() => setIsPlaying((s) => !s)}
                                            className={`px-5 py-2 rounded-lg font-mono text-[0.7em] font-[700] tracking-[0.2em] uppercase transition-all duration-300 ${isDayTime ? 'bg-teal-600 text-white hover:bg-teal-700 shadow-md' : 'bg-[#00f5d4] text-black hover:bg-cyan-300 shadow-lg shadow-cyan-500/20'}`}>
                                        {isPlaying ? '⏸ Pause' : '▶ Play'}
                                    </button>
                                    <button onClick={() => {
                                        setIsPlaying(false);
                                        setCurrentDay(1);
                                    }}
                                            className={`px-5 py-2 rounded-lg border font-mono text-[0.7em] font-[700] tracking-[0.2em] uppercase transition-all duration-300 ${isDayTime ? 'border-gray-300 text-gray-600 hover:bg-gray-100' : 'border-gray-600 text-gray-300 hover:bg-gray-800/50'}`}>
                                        ↺ Reset
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main */}
                    <div className="grid lg:grid-cols-2 gap-16 items-start mb-24">
                        <div className="order-2 lg:order-1 flex justify-center">
                            <div className="relative w-80 h-80 sm:w-96 sm:h-96">
                                <div
                                    className={`absolute inset-0 rounded-full bg-gradient-to-r ${phase.color} blur-3xl transition-opacity duration-700 ${isDayTime ? 'opacity-20' : 'opacity-25'}`}/>
                                <div
                                    className={`absolute inset-0 rounded-full bg-gradient-to-r ${phase.color} ${isDayTime ? 'opacity-30' : 'opacity-20'} animate-spin-slow`}/>
                                <div
                                    className={`absolute inset-4 rounded-full border border-dashed animate-spin-reverse ${isDayTime ? 'border-gray-300' : 'border-gray-700'}`}/>
                                <div className="absolute inset-0 animate-spin-slow">
                                    <span
                                        className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full ${phase.accentColor} shadow-lg`}/>
                                </div>
                                <div
                                    className={`absolute inset-8 rounded-full bg-gradient-to-br ${phase.color} p-1 animate-pulse-slow`}>
                                    <div
                                        className={`w-full h-full ${isDayTime ? 'bg-white' : 'bg-black'} rounded-full flex items-center justify-center p-12 transition-colors duration-700`}>{phase.icon}</div>
                                </div>
                            </div>
                        </div>

                        <div className="order-1 lg:order-2 space-y-8 lg:pt-4">
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div
                                        className={`px-6 py-2 rounded-full bg-gradient-to-r ${phase.color} text-white font-mono font-bold text-sm tracking-[0.2em] uppercase shadow-lg`}>
                                        {(() => {
                                            const phaseStartDay = phases.slice(0, phases.indexOf(phase)).reduce((sum, p) => sum + parseInt(p.days.split('-')[1]), 0) + 1;
                                            const phaseEndDay = phaseStartDay + parseInt(phase.days.split('-')[1]) - 1;
                                            return `Days ${phaseStartDay}-${phaseEndDay}`;
                                        })()}
                                    </div>
                                    <div className={`px-4 py-2 rounded-full backdrop-blur border ${isDayTime ? 'border-gray-200 bg-white/50 text-gray-700' : 'border-gray-700 bg-gray-800/50 text-gray-300'} font-mono text-xs font-bold tracking-[0.15em]`}>
                                        {parseInt(phase.days.split('-')[1])} DAYS
                                    </div>
                                </div>
                                <h3 className={`text-4xl sm:text-5xl font-black mb-3 bg-gradient-to-r ${isDayTime ? 'from-gray-900 to-gray-600' : 'from-white to-gray-400'} bg-clip-text text-transparent`}>{phase.title}</h3>
                                <p className={`text-xl font-light bg-gradient-to-r ${phase.color} bg-clip-text text-transparent mb-4`}>{phase.tagline}</p>
                            </div>

                            <div className="space-y-4">
                                <p className={`text-sm font-[300] leading-[1.8] ${isDayTime ? 'text-gray-600' : 'text-gray-400'}`}>
                                    {phase.description || 'This phase focuses on strategic execution and measurable progress. Our experts work closely with your team to implement proven methodologies, ensure continuous optimization, and deliver tangible outcomes aligned with your business objectives.'}
                                </p>
                                <div className="pt-2">
                                    <p className={`text-xs font-mono tracking-[0.15em] uppercase mb-3 ${isDayTime ? 'text-gray-500' : 'text-gray-500'}`}>Key Deliverables</p>
                                    {phase.items.map((item, idx) => (
                                        <div key={idx}
                                             className={`group flex items-start gap-4 p-4 mb-3 rounded-2xl transition-all duration-300 ${isDayTime ? 'bg-white/70 border-gray-200 hover:border-gray-400 shadow-sm hover:shadow-md hover:bg-white' : 'bg-gray-900/50 border-gray-800 hover:border-gray-600 hover:bg-gray-900'} backdrop-blur-sm border`}>
                                            <div
                                                className={`flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br ${phase.color} flex items-center justify-center text-sm font-bold text-white`}>{idx + 1}</div>
                                            <p className={`text-sm leading-relaxed ${isDayTime ? 'text-gray-600 group-hover:text-gray-900' : 'text-gray-300 group-hover:text-white'} transition-colors`}>{item}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="relative group mt-12">
                        <div
                            className={`absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-3xl blur-3xl transition-opacity ${isDayTime ? 'opacity-25 group-hover:opacity-40' : 'opacity-35 group-hover:opacity-50'}`}/>
                        <div
                            className={`relative overflow-hidden ${isDayTime ? 'bg-white/85 backdrop-blur-lg border-gray-200' : 'bg-gradient-to-r from-gray-900 to-black border-gray-800'} rounded-3xl p-12 md:p-16 border text-center`}>
                            <span aria-hidden
                                  className={`absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 ${isDayTime ? 'border-teal-600/60' : 'border-[#00f5d4]/60'}`}/>
                            <span aria-hidden
                                  className={`absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 ${isDayTime ? 'border-teal-600/60' : 'border-[#00f5d4]/60'}`}/>
                            <span aria-hidden
                                  className={`absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 ${isDayTime ? 'border-teal-600/60' : 'border-[#00f5d4]/60'}`}/>
                            <span aria-hidden
                                  className={`absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 ${isDayTime ? 'border-teal-600/60' : 'border-[#00f5d4]/60'}`}/>
                            
                            <div className={`mb-6 inline-flex items-center gap-2 px-5 py-2 rounded-full border backdrop-blur-sm font-mono text-[0.65em] font-[600] tracking-[0.3em] uppercase ${isDayTime ? 'border-teal-600/30 bg-teal-500/10 text-teal-700' : 'border-[#00f5d4]/30 bg-[#00f5d4]/10 text-[#00f5d4]'}`}>
                                <span className="relative flex h-2 w-2">
                                    <span className={`animate-pulse absolute inline-flex h-full w-full rounded-full opacity-75 ${isDayTime ? 'bg-teal-600' : 'bg-[#00f5d4]'}`}/>
                                    <span className={`relative inline-flex rounded-full h-2 w-2 ${isDayTime ? 'bg-teal-600' : 'bg-[#00f5d4]'}`}/>
                                </span>
                                Accelerate Your Growth
                            </div>
                            
                            <h3 className={`text-4xl sm:text-5xl font-black mb-4 bg-gradient-to-r ${isDayTime ? 'from-gray-900 via-gray-700 to-gray-600' : 'from-white via-gray-200 to-gray-300'} bg-clip-text text-transparent`}>Ready to Launch?</h3>
                            
                            <p className={`text-lg leading-[1.7] mb-10 max-w-3xl mx-auto ${isDayTime ? 'text-gray-600' : 'text-gray-400'}`}>
                                Join industry-leading companies transforming their digital landscape with our proven {phases.reduce((sum, p) => sum + parseInt(p.days.split('-')[1]), 0)}-day methodology. From discovery to scale, we deliver measurable impact at every stage—accelerating growth while ensuring strategic alignment and sustainable competitive advantage.
                            </p>
                            
                            <div className="flex flex-col sm:flex-row justify-center gap-4 flex-wrap">
                                <Link href="/contact"
                                      className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg ${isDayTime ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white hover:shadow-xl hover:from-teal-700 hover:to-cyan-700' : 'bg-gradient-to-r from-[#00f5d4] to-cyan-400 text-black hover:shadow-xl hover:shadow-cyan-500/50 font-semibold'}`}>
                                    Start Your {phases.reduce((sum, p) => sum + parseInt(p.days.split('-')[1]), 0)}-Day Journey
                                </Link>
                                <Link href="/portfolio"
                                      className={`px-8 py-4 rounded-xl border-2 font-bold text-lg transition-all duration-300 ${isDayTime ? 'border-gray-300 text-gray-700 hover:border-gray-500 hover:bg-gray-100' : 'border-gray-600 text-gray-300 hover:border-gray-400 hover:bg-gray-800/50'}`}>
                                    View Our Work
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Pricing — show when requested */}
                {showPricing && <CurrencyAwarePricing/>}

                <style>{`
                            @keyframes blob { 0%,100%{transform:translate(0,0) scale(1);}25%{transform:translate(20px,-50px) scale(1.1);}50%{transform:translate(-20px,20px) scale(0.9);}75%{transform:translate(50px,50px) scale(1.05);} }
                            @keyframes gradient { 0%,100%{background-position:0% 50%}50%{background-position:100% 50%} }
                            @keyframes spin-slow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
                            @keyframes spin-reverse { from{transform:rotate(360deg)} to{transform:rotate(0deg)} }
                            @keyframes pulse-slow { 0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.8;transform:scale(1.05)} }
                            .animate-blob { animation: blob 7s infinite; }
                            .animate-gradient { background-size: 200% auto; animation: gradient 3s ease infinite; }
                            .animate-spin-slow { animation: spin-slow 20s linear infinite; }
                            .animate-spin-reverse { animation: spin-reverse 15s linear infinite; }
                            .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
                          `}</style>
            </div>

            {/* ══════════════════════════════════════════
                   DEVELOPMENT PROCESS
                   ══════════════════════════════════════════ */}
            <FuturisticDevelopmentProcess
                day={isDayTime}
                description={developmentProcessDescription}
            />

            {/* ══════════════════════════════════════════
                CTA + COUNTUP (UNCHANGED)
                ══════════════════════════════════════════ */}
            <section className="relative overflow-hidden bg-[#050810]">
                <FxBackground day={false} grid aurora/>
                <FxOrbit size={800} top="-200px" left="50%" opacity={0.08} speed={60}/>
                <FxOrbit size={500} bottom="-100px" right="-150px" opacity={0.10} speed={30} reverse/>

                <div
                    className="relative z-10 lg:py-20 md:py-16 py-12 max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] text-white">

                    <FxReveal>
                        <FxGlitchText tag="h1"
                                      className="gx-gradient-text lg:text-[5em] md:text-[4em] sm:text-[3em] text-[2em] font-[700] leading-[1.1] mb-[0.5em]">
                            {ctaHeading || (<>Your trusted<br className="lg:block md:block hidden"/>digital partner</>)}
                        </FxGlitchText>
                    </FxReveal>

                    <FxReveal delay={0.15}>
                        <p className="text-[0.9em] font-[300] leading-[1.6] text-gray-300 lg:pr-[33em] mb-8 text-justify">
                            {ctaBody || (
                                <>We specialize in crafting high-impact marketing websites, innovative web apps, and
                                    mobile
                                    applications that drive real results. From funded startups to established
                                    businesses, we&apos;ve
                                    helped a wide range of clients bring their digital products to life—delivering
                                    standout
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
                        <div
                            className={`grid lg:grid-cols-5 md:grid-cols-5 sm:grid-cols-3 grid-cols-1 gap-px rounded-2xl overflow-hidden border ${borderCol}`}>
                            {stats.map((stat, index) => (
                                <div key={index}
                                     className="relative flex flex-col justify-center items-center py-8 px-4 bg-white/[0.03] hover:bg-teal-400/5 transition-colors duration-300">
                                    <div className="absolute inset-0 pointer-events-none"
                                         style={{backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(45,212,191,0.015) 3px, rgba(45,212,191,0.015) 4px)'}}
                                    />
                                    <h2 className="gx-gradient-text lg:text-[3.2em] md:text-[3em] sm:text-[2em] text-[1.8em] font-[700] leading-none mb-2">
                                        <CountUp end={stat.value} duration={2} suffix={stat.suffix || ''}/>
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
