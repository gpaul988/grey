'use client';

import React, {useEffect, useState, useRef, type ReactNode} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import CountUp from 'react-countup';
import {AnimatePresence, motion} from 'framer-motion';

import ResponsiveVideoHero from '@/components/ResponsiveVideoHero';
import FuturisticDevelopmentProcess from '@/components/FuturisticDevelopmentProcess';
import VerticalSolutionsAccordion from '@/components/VerticalSolutionsAccordion';
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

// Interfaces
export interface SolutionItem {
    id: string;
    title: string;
    target: string;
    tags: string[];
    body: ReactNode
}

export interface StatItem {
    label: string;
    value: number;
    suffix?: string
}

export interface HeroStat {
    label: string;
    value: string
}

export interface Testimonial {
    name: string;
    title: string;
    message: ReactNode
}

export interface PricePlan {
    name: string;
    monthlyGBP: number | null;
    yearlyGBP: number | null;
    bullets: string[]
}

export interface ServicePricingData {
    plans: PricePlan[]
}

export interface ReasonItem {
    id: number;
    title: string;
    description: ReactNode;
    image: string
}

export interface IntroMetric {
    id?: string | number;
    label: string;
    value: string;
    description?: ReactNode;
    details?: string[]
}

export interface ServicePageProps {
    title: ReactNode;
    intro: ReactNode;
    heroVideo?: string;
    heroVideoMobile?: string;
    heroImage?: string;
    heroStats?: HeroStat[];
    topImages?: string[];
    midImage?: string;
    eyebrow: ReactNode;
    introHeading?: ReactNode;
    introBody?: [ReactNode, ReactNode];
    solutionsHeading?: ReactNode;
    solutionsIntro?: ReactNode;
    solutions: SolutionItem[];
    reasons?: ReasonItem[];
    developmentProcessDescription?: string;
    ctaHeading?: ReactNode;
    ctaBody?: ReactNode;
    stats?: StatItem[];
    testimonials?: Testimonial[];
    showPricing?: boolean;
    serviceType?: string;
    verticalSolutions?: Array<{ id: string | number; title: string; description: string }>;
    verticalSolutionsTitle?: string;
    verticalSolutionsSubtitle?: string;
    verticalSolutionsEyebrow?: string;
    // Optional intro pill labels shown under intro paragraphs (per-page)
    introPills?: string[];
    // Optional structured, professional metrics shown in the intro (per-page)
    introMetrics?: IntroMetric[];
    // Explicit list of deliverables to display in the intro (per-page)
    introDeliverables?: string[];
}

const defaultStats: StatItem[] = [
    {label: 'Years Experience', value: 8, suffix: '+'},
    {label: 'Team Members', value: 13, suffix: '+'},
    {label: 'Products Launched', value: 150, suffix: '+'},
    {label: 'Projects Delivered', value: 200, suffix: '+'},
    {label: 'Client Satisfaction', value: 100, suffix: '%'},
];

const defaultHeroStats: HeroStat[] = [
    {label: 'Years Experience', value: '8+'},
    {label: 'Team Members', value: '13+'},
    {label: 'Products Launched', value: '123+'},
];

// Minimal pricing dataset used by CurrencyAwarePricing (kept small here)
const SERVICE_PRICING: Record<string, ServicePricingData> = {
    default: {
        plans: [
            {
                name: 'Professional Starter',
                monthlyGBP: 2000,
                yearlyGBP: 22000,
                bullets: ['Initial project setup', 'Team onboarding', '80 hours development']
            },
            {
                name: 'Professional Growth',
                monthlyGBP: 6000,
                yearlyGBP: 66000,
                bullets: ['Dedicated team', 'Advanced architecture', 'Continuous delivery']
            },
            {
                name: 'Enterprise Custom',
                monthlyGBP: null,
                yearlyGBP: null,
                bullets: ['Full SLA', 'Dedicated engineers', 'Custom integrations']
            },
        ]
    }
};

// Currency-aware Pricing component (keeps network call in useEffect so SSR-safe)
export const CurrencyAwarePricing: React.FC<{
    defaultCurrency?: string;
    serviceType?: string
}> = ({defaultCurrency = 'GBP', serviceType = 'default'}) => {
    const isDayTimeLocal = useIsDayTime();
    const [rates, setRates] = useState<Record<string, number> | null>(null);
    const [loading, setLoading] = useState(true);
    const [currency, setCurrency] = useState<string>(defaultCurrency || 'GBP');
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

    useEffect(() => {
        let mounted = true;

        async function fetchRates() {
            try {
                setLoading(true);
                const res = await fetch('/api/exchange').catch(() => null);
                if (!res) return;
                const json = await res.json().catch(() => null);
                if (mounted && json && json.rates) setRates(json.rates as Record<string, number>);
            } catch (e) { /* silent */
            } finally {
                if (mounted) setLoading(false)
            }
        }

        fetchRates();
        const iv = setInterval(fetchRates, 10 * 60 * 1000);
        return () => {
            mounted = false;
            clearInterval(iv)
        };
    }, []);

    const format = (amountGBP: number | null, to: string) => {
        if (amountGBP === null) return 'Custom pricing';
        if (!rates) return ' -';
        const rate = to === 'GBP' ? 1 : rates[to];
        if (!rate) return ' -';
        const converted = amountGBP * rate;
        try {
            return new Intl.NumberFormat('en-GB', {style: 'currency', currency: to}).format(converted)
        } catch (e) {
            return `${to} ${Math.round(converted)}`
        }
    }

    const basePlans = SERVICE_PRICING[serviceType || 'default'] ?? SERVICE_PRICING.default;

    return (
        <section suppressHydrationWarning className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h3 className={`text-2xl font-bold ${isDayTimeLocal ? 'text-gray-900' : 'text-white'}`}>Transparent
                            Pricing</h3>
                        <p className={`text-sm ${isDayTimeLocal ? 'text-gray-600' : 'text-white/80'}`}>Clear plans,
                            clear outcomes.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <select value={currency} onChange={(e) => setCurrency(e.target.value)}
                                className="px-3 py-2 rounded-md">
                            <option value="GBP">GBP (£)</option>
                            <option value="USD">USD ($)</option>
                            <option value="EUR">EUR (€)</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {basePlans.plans.map((p) => {
                        const price = billingCycle === 'monthly' ? p.monthlyGBP : p.yearlyGBP;
                        return (
                            <FxHoloCard key={p.name} day={isDayTimeLocal} className="p-6">
                                <div className="mb-4 font-bold text-lg">{p.name}</div>
                                <div className="text-3xl font-extrabold mb-2">{format(price ?? null, currency)}</div>
                                <div
                                    className="text-sm text-gray-500 mb-4">{billingCycle === 'monthly' ? 'per month' : 'per year'}</div>
                                <ul className="mb-4 space-y-2 text-sm">
                                    {p.bullets.map(b => <li key={b}>✓ {b}</li>)}
                                </ul>
                                {price === null ? (
                                    <Link href="/quote-request"
                                          className="inline-block w-full text-center py-2 px-4 rounded-md bg-indigo-600 text-white">Request
                                        Quote</Link>
                                ) : (
                                    <button onClick={() => location.assign('/quote-request')}
                                            className="inline-block w-full text-center py-2 px-4 rounded-md bg-indigo-600 text-white">Start</button>
                                )}
                            </FxHoloCard>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

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
                                                             serviceType,
                                                             verticalSolutions,
                                                             verticalSolutionsTitle,
                                                             verticalSolutionsSubtitle,
                                                             verticalSolutionsEyebrow,
                                                             introPills,
                                                             introMetrics,
                                                             introDeliverables,
                                                         }) => {
    // keep client-only derived behavior within effects
    const [clientTitle, setClientTitle] = useState<ReactNode | null>(null);
    const [derivedServiceType, setDerivedServiceType] = useState<string>(serviceType ?? 'default');
    const isDayTime = useIsDayTime();
    const [activeId, setActiveId] = useState<string>(solutions?.[0]?.target ?? '');

    // Intro section visibility/overlay control (copied behavior from Web-Design.tsx)
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const [isBackgroundActive, setIsBackgroundActive] = useState(false);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const p = window.location.pathname.split('/').filter(Boolean).pop() || '';
        if (!title) setClientTitle(p.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()));
        if (!serviceType && p) setDerivedServiceType(p as string);
    }, []);

    // Intro background activation (mirrors Web-Design.tsx behaviour)
    useEffect(() => {
        if (typeof window === 'undefined') return;
        const handleScroll = () => {
            if (sectionRef.current) {
                const {top, bottom} = sectionRef.current.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                if (top < windowHeight * -0.2 || bottom < windowHeight * -0.1) {
                    setIsBackgroundActive(true);
                } else {
                    setIsBackgroundActive(false);
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Track active solution via IntersectionObserver (no oversized offsets)
    useEffect(() => {
        if (typeof window === 'undefined') return;
        const observer = new IntersectionObserver((entries) => {
            for (const e of entries) {
                if (e.isIntersecting && e.target instanceof HTMLElement) {
                    const id = e.target.id;
                    if (id) setActiveId(id);
                }
            }
        }, {root: null, rootMargin: '0px 0px -40% 0px', threshold: 0});

        solutions.forEach(s => {
            const el = document.getElementById(s.target);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [solutions]);

    const handleNavClick = (id: string) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({behavior: 'smooth', block: 'start'});
        setActiveId(id);
    }

    const resolvedTitle = clientTitle ?? title ?? 'Our Services';

    return (
        // Important: do NOT force min-h-screen here. Let layout (app/layout.tsx main flex-1) manage footer anchoring.
        <div className={`${isDayTime ? 'bg-white text-black' : 'bg-[#050810] text-white'} w-full`}>

            {/* HERO */}
            <div id="hero">
                <ResponsiveVideoHero
                    videoDesktop={heroVideo}
                    videoMobile={heroVideoMobile || heroVideo}
                    posterImage={heroImage}
                    posterAlt={typeof title === 'string' ? title : 'hero'}
                    overlayOpacity={0.55}
                    heights={{mobile: 'h-[480px]', tablet: 'md:h-[540px]', desktop: 'lg:h-[620px]'}}
                    className="rounded-none"
                >
                    <div className="absolute inset-0 gx-grid opacity-20 pointer-events-none"/>
                    <div className="gx-scanline pointer-events-none"/>

                    <div
                        className="absolute inset-0 flex flex-col justify-end pb-12 px-6 sm:px-8 md:px-10 lg:px-[4.5em] text-white">
                        <div className="mb-5"><FxChip day={!isDayTime}>{eyebrow}</FxChip></div>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">{resolvedTitle}</h1>
                        <div className="mt-4 max-w-3xl text-base text-white/80">{intro}</div>
                    </div>
                </ResponsiveVideoHero>
            </div>

            <section
                ref={sectionRef}
                data-bg={isBackgroundActive ? (isDayTime ? 'Dark' : 'Light') : (isDayTime ? 'Light' : 'Dark')}
                className={`pt-16 transition-colors duration-500 ${
                    isBackgroundActive
                        ? isDayTime ? 'bg-black text-white' : 'bg-white text-black'
                        : isDayTime ? 'bg-white text-black' : 'bg-black text-white'
                }`}>
                <FxBackground day={isDayTime}/>
                <div
                    className="relative z-10 grid lg:grid-cols-2 grid-cols-1 lg:gap-14 gap-6 lg:pt-20 pt-6 lg:pb-32 pb-6 mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em]">
                    <div>
                        <FxChip
                            day={!isBackgroundActive ? !isDayTime : isDayTime}>{eyebrow ?? 'DESIGN EXCELLENCE'}</FxChip>
                    </div>

                    <div className="lg:-ml-[19em]">
                        <FxReveal>
                            <h3 className="lg:text-[3.5em] md:text-[3em] text-[2em] font-[700] tracking-tight leading-[1.15] mt-4">
                                {typeof introHeading === 'string' ? (() => {
                                    const words = String(introHeading).trim().split(/\s+/);
                                    const last = words.pop();
                                    return <>{words.join(' ')} <span className="gx-gradient-text">{last}</span></>;
                                })() : (introHeading ? <>{introHeading}</> : <><span
                                    className="gx-gradient-text">{resolvedTitle}</span></>)}
                            </h3>
                        </FxReveal>

                        <FxReveal delay={0.08}>
                            <div
                                className="grid lg:grid-cols-2 grid-cols-1 gap-6 mt-6 font-[300] text-justify text-[0.95em] md:text-[1.05em] leading-relaxed">
                                <div className="space-y-4">
                                    <p>{(introBody && introBody[0]) ?? (typeof intro === 'string' ? intro : '')}</p>
                                    <p>{(introBody && introBody[1]) ?? ''}</p>
                                    {(introPills && introPills.length > 0) ? (
                                        <div className="flex flex-wrap gap-3 mt-4">
                                            {introPills.map((pill: string) => (
                                                <span key={pill} className="gx-data-pill">{pill}</span>
                                            ))}
                                        </div>
                                    ) : null}
                                </div>
                                <div className="space-y-4">
                                    <p>{(introBody && introBody[1]) ?? ''}</p>
                                    <p className="text-sm text-white/60">{''}</p>

                                    {(introPills && introPills.length > 0) ? (
                                        <div className="flex flex-wrap gap-3 mt-4">
                                            {introPills.map((pill: string) => (
                                                <span key={pill} className="gx-data-pill">{pill}</span>
                                            ))}
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                        </FxReveal>

                        {/* Detailed intro panel — professional outcomes, deliverables, process snapshot */}
                        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="rounded-2xl p-6 border border-white/6 bg-white/[0.02]">
                                <h4 className="text-sm font-semibold text-teal-300 uppercase tracking-wider mb-3">Expected
                                    Outcomes</h4>
                                <p className="text-sm text-white/75 mb-4">High-level measurable outcomes this engagement
                                    aims to deliver (page provides specifics via <code>introMetrics</code>).</p>
                                <div className="space-y-4">
                                    {introMetrics && introMetrics.length ? introMetrics.map((m: IntroMetric) => (
                                        <div key={m.id ?? m.label}>
                                            <div className="text-2xl font-extrabold text-white">{m.value}</div>
                                            <div className="text-sm text-white/70 mt-1">{m.label}</div>
                                            {m.description &&
                                                <div className="text-sm text-white/60 mt-2">{m.description}</div>}
                                        </div>
                                    )) : (
                                        <div>
                                            {heroStats.map(s => (
                                                <div key={s.label} className="mb-3">
                                                    <div className="text-xl font-bold text-white">{s.value}</div>
                                                    <div className="text-sm text-white/70">{s.label}</div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="rounded-2xl p-6 border border-white/6 bg-white/[0.02]">
                                <h4 className="text-sm font-semibold mb-3">Deliverables</h4>
                                <p className="text-sm text-white/75 mb-3">What you'll receive during and at the end of
                                    the engagement.</p>
                                <ul className="list-disc pl-5 space-y-2 text-white/70">
                                    {introDeliverables && introDeliverables.length ? introDeliverables.map((d, i) => (
                                        <li key={i}>{d}</li>
                                    )) : (
                                        <>
                                            <li>Discovery & prioritised requirements brief</li>
                                            <li>Interactive prototypes & component library</li>
                                            <li>Production-ready, accessible front-end</li>
                                            <li>CI/CD pipeline and deployment documentation</li>
                                        </>
                                    )}
                                </ul>
                            </div>

                            <div className="rounded-2xl p-6 border border-white/6 bg-white/[0.02]">
                                <h4 className="text-sm font-semibold mb-3">Process Snapshot</h4>
                                <p className="text-sm text-white/75 mb-3">A concise view of our workflow and governance
                                    for the project.</p>
                                <div className="text-sm text-white/70 space-y-2">
                                    <div><strong>Phases:</strong> Discovery → Design → Build → Validate → Launch</div>
                                    <div><strong>Typical timeline:</strong> 6–12 weeks (dependent on scope)</div>
                                    <div><strong>Engagement model:</strong> Fixed-scope, Time & Materials, or Dedicated
                                        Team
                                    </div>
                                    <div><strong>Support:</strong> Optional SLA & post-launch support packages</div>
                                </div>
                                {developmentProcessDescription &&
                                    <div className="mt-4 text-sm text-white/60">{developmentProcessDescription}</div>}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sticky Solutions (uses FxStickyScrollSection, which handles internal sticky behavior safely) */}
            <FxStickyScrollSection
                day={!isDayTime}
                heading={solutionsHeading}
                intro={solutionsIntro}
                navLabel="Our Solutions"
                activeId={activeId}
                onNavClickAction={handleNavClick}
                items={solutions}
            />

            {/* Mid image - keep full width, preserve height while avoiding negative margins */}
            {midImage && (
                <section aria-label="Showcase" className="relative w-full overflow-hidden" style={{height: '85vh'}}>

                    {/* Full-bleed background image + subtle dark overlay (image-first) */}
                    <div className="absolute inset-0">
                        <Image src={midImage} alt={typeof title === 'string' ? title : 'detail'} fill
                               className="object-cover w-full h-full"/>
                        <div className="absolute inset-0 bg-black/40"/>
                    </div>

                    {/* Minimal but high-quality FX layers to amplify futurism without overpowering */}
                    <div className="pointer-events-none absolute inset-0">
                        <FxBackground day={!isDayTime} grid={false} aurora={true} className="opacity-60"/>
                        <FxOrbit size={520} top="-120px" right="-160px" opacity={0.08} speed={36}/>
                        <div className="absolute inset-0">
                            {/* SVG stroke network for subtle futuristic lines */}
                            <svg className="w-full h-full" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"
                                 aria-hidden>
                                <defs>
                                    <linearGradient id="g1" x1="0" x2="1">
                                        <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.12"/>
                                        <stop offset="100%" stopColor="#6366f1" stopOpacity="0"/>
                                    </linearGradient>
                                </defs>
                                <rect width="100%" height="100%" fill="none"/>
                                <path d="M0 30 C 200 80, 400 0, 1000 60" stroke="url(#g1)" strokeWidth="1.5" fill="none"
                                      className="opacity-40"/>
                            </svg>
                        </div>
                    </div>

                    {/* Foreground — minimal overlays to keep image dominant */}
                    <div className="relative z-10 h-full flex items-center">
                        <div className="max-w-full mx-auto w-full px-6 sm:px-8 md:px-10 lg:px-[4.5em]">
                            <div className="grid lg:grid-cols-2 items-center gap-8">

                                {/* Left: compact overlay — eyebrow, concise heading, single CTA */}
                                <div className="text-white max-w-lg">
                                    {eyebrow && <FxChip day={!isDayTime}>{eyebrow}</FxChip>}

                                    <h2 className="mt-4 text-[1.6rem] md:text-[2.2rem] lg:text-[2.8rem] font-extrabold leading-tight">
                                        {introHeading ? (typeof introHeading === 'string' ? introHeading : introHeading) : resolvedTitle}
                                    </h2>

                                    <p className="mt-3 text-sm text-white/70">{(introBody && introBody[0]) ? String((introBody && introBody[0])) : ''}</p>

                                    <div className="mt-4">
                                        <FxButton day={!isDayTime} href="/contact">Request Consultation</FxButton>
                                    </div>
                                </div>

                                {/* Right: compact snapshot card with professional microdetails */}
                                <div className="flex justify-end">
                                    <div className="w-full max-w-sm">
                                        <div
                                            className="rounded-2xl overflow-hidden border border-white/8 bg-gradient-to-b from-white/[0.02] to-white/[0.01] p-4 backdrop-blur-md shadow-[0_30px_80px_-30px_rgba(2,6,23,0.75)]">

                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <div className="text-xs text-white/60">Est. delivery</div>
                                                    <div
                                                        className="text-lg font-bold text-white mt-1">{introMetrics && introMetrics[0] ? introMetrics[0].value : '8–12 wks'}</div>
                                                    <div
                                                        className="text-sm text-white/70">{introMetrics && introMetrics[0] ? introMetrics[0].label : 'Delivery'}</div>
                                                </div>

                                                <div className="text-right">
                                                    <div className="text-xs text-white/60">Team size</div>
                                                    <div
                                                        className="text-lg font-bold text-white mt-1">{introMetrics && introMetrics[1] ? introMetrics[1].value : '3–6'}</div>
                                                    <div
                                                        className="text-sm text-white/70">{introMetrics && introMetrics[1] ? introMetrics[1].label : 'Engineers'}</div>
                                                </div>
                                            </div>

                                            <div className="mt-4 text-sm text-white/70">
                                                {(introDeliverables && introDeliverables.length ? introDeliverables.slice(0, 3) : ['Discovery brief', 'Prototype', 'Production front-end']).map((d, idx) => (
                                                    <div key={idx} className="flex items-start gap-2 mb-2">
                                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                                                             xmlns="http://www.w3.org/2000/svg"
                                                             className="mt-1 text-teal-400">
                                                            <path d="M20 6L9 17l-5-5" stroke="currentColor"
                                                                  strokeWidth="2" strokeLinecap="round"
                                                                  strokeLinejoin="round"/>
                                                        </svg>
                                                        <div>{d}</div>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="mt-4 text-xs text-white/60">Includes scoping call, QA, and
                                                deployment support.
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Reasons / Why choose us - simplified and safe */}
            {reasons && reasons.length > 0 && (
                <section className="bg-[#050810] py-12">
                    <div className="max-w-6xl mx-auto px-6 sm:px-8 md:px-10 lg:px-[4.5em] text-white">
                        <div className="mb-6"><FxChip day={!isDayTime}>WHY CHOOSE US</FxChip></div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {reasons.map(r => (
                                <div key={r.id} className="p-6 rounded-2xl border border-white/10 bg-white/[0.03]">
                                    <h3 className="text-lg font-bold mb-2">{r.title}</h3>
                                    <div className="text-sm text-white/70">{r.description}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Technologies / Tools - compact */}
            <div className={`py-10 ${isDayTime ? 'bg-white' : 'bg-transparent'}`}>
                <div className="max-w-6xl mx-auto px-6 sm:px-8 md:px-10 lg:px-[4.5em]">
                    <h2 className={`text-2xl font-bold ${isDayTime ? 'text-black' : 'text-white'}`}>Technologies We
                        Use</h2>
                </div>
            </div>

            {/* Optional vertical solutions */}
            {verticalSolutions && verticalSolutions.length > 0 && (
                <VerticalSolutionsAccordion
                    isDayTime={!isDayTime}
                    title={verticalSolutionsTitle ?? 'Vertical Solutions'}
                    subtitle={verticalSolutionsSubtitle}
                    items={verticalSolutions}
                    eyebrow={verticalSolutionsEyebrow}
                />
            )}

            {/* Development process */}
            <FuturisticDevelopmentProcess day={!isDayTime} description={developmentProcessDescription}/>

            {/* CTA section */}
            <section className={`py-12 ${isDayTime ? 'bg-white' : 'bg-[#050810]'}`}>
                <div className="max-w-6xl mx-auto px-6 sm:px-8 md:px-10 lg:px-[4.5em] text-center">
                    <FxGlitchText tag="h2"
                                  className={`text-3xl font-extrabold mb-4 ${isDayTime ? 'text-gray-900' : 'text-white'}`}>{ctaHeading ?? 'Ready to Launch?'}</FxGlitchText>
                    <p className={`mb-8 ${isDayTime ? 'text-gray-700' : 'text-white/70'}`}>{ctaBody ?? 'Let us build something extraordinary together.'}</p>
                    <div className="flex items-center justify-center gap-4">
                        <FxButton day={!isDayTime} href="/contact">Start Your Project →</FxButton>
                        <Link href="/portfolio" className="px-6 py-3 rounded-lg border">View Our Work</Link>
                    </div>
                </div>
            </section>

            {/* Pricing */}
            {showPricing && <CurrencyAwarePricing serviceType={derivedServiceType}/>}

            {/* Stats / Countup */}
            <section className={`py-12 ${isDayTime ? 'bg-white' : 'bg-[#050810]'}`}>
                <div className="max-w-6xl mx-auto px-6 sm:px-8 md:px-10 lg:px-[4.5em]">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        {stats.map((s, i) => (
                            <div key={i} className="py-6 text-center">
                                <h3 className="text-3xl font-bold"><CountUp end={s.value} duration={2}
                                                                            suffix={s.suffix || ''}/></h3>
                                <p className="text-sm text-white/70 mt-2">{s.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Terminal */}
            <div className="max-w-6xl mx-auto px-6 sm:px-8 md:px-10 lg:px-[4.5em] pb-12">
                <FxTerminal day={!isDayTime}
                            lines={["# Grey InfoTech - innovation ships", "Build complete", "Deployed to edge"]}/>
            </div>

        </div>
    );
}

export default ServicePageTemplate;
