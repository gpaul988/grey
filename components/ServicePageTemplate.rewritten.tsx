/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/static-components */
'use client';
import React, {useEffect, useMemo, useRef, useState, type ReactNode} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import CountUp from 'react-countup';
import {AnimatePresence, motion} from 'framer-motion';

import ResponsiveVideoHero from '@/components/ResponsiveVideoHero';
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

// Types - preserve original public API of the template
export interface SolutionItem {
    id: string;
    title: string;
    target: string;
    tags?: string[];
    body: ReactNode;
}
export interface StatItem {label: string; value: number; suffix?: string}
export interface HeroStat {label: string; value: string}
export interface Testimonial {name: string; title: string; message: ReactNode}
export interface PricePlan {name: string; monthlyGBP: number | null; yearlyGBP: number | null; bullets: string[]}
export interface ServicePricingData {plans: PricePlan[]}
export interface ReasonItem {id: number; title: string; description: ReactNode; image: string}

export interface ServicePageProps {
    title: ReactNode;
    intro?: ReactNode;
    heroVideo?: string;
    heroVideoMobile?: string;
    heroImage?: string;
    heroStats?: HeroStat[];
    topImages?: string[];
    midImage?: string;
    eyebrow?: ReactNode;
    introHeading?: ReactNode;
    introBody?: [ReactNode, ReactNode];
    solutionsHeading?: ReactNode;
    solutionsIntro?: ReactNode;
    solutions?: SolutionItem[];
    reasons?: ReasonItem[];
    developmentProcessDescription?: string;
    ctaHeading?: ReactNode;
    ctaBody?: ReactNode;
    stats?: StatItem[];
    testimonials?: Testimonial[];
    showPricing?: boolean;
    serviceType?: string;
    verticalSolutions?: Array<{id: string | number; title: string; description: string}>;
    verticalSolutionsTitle?: string;
    verticalSolutionsSubtitle?: string;
    verticalSolutionsEyebrow?: string;
}

// Lightweight defaults
const DEFAULT_STATS: StatItem[] = [
    {label: 'Years Experience', value: 8, suffix: '+'},
    {label: 'Team Members', value: 13, suffix: '+'},
    {label: 'Products Launched', value: 150, suffix: '+'},
];
const DEFAULT_HERO_STATS: HeroStat[] = [
    {label: 'Years Experience', value: '8+'},
    {label: 'Team Members', value: '13+'},
];

// Minimal pricing registry (kept small here, use existing SERVICE_PRICING in repo if needed)
const SERVICE_PRICING: Record<string, ServicePricingData> = {
    default: {plans: [{name: 'Professional Starter', monthlyGBP: 2000, yearlyGBP: 22000, bullets: ['Project kickoff','80 dev hours','QA & support']} ]},
};

// Small helper safe-to-run-in-SSR formatting function
function formatCurrencySAFE(amountGBP: number | null, currency: string, rates: Record<string, number> | null) {
    if (amountGBP === null) return 'Custom pricing';
    if (currency === 'GBP' || !rates) {
        try {
            return new Intl.NumberFormat('en-GB', {style: 'currency', currency: 'GBP'}).format(amountGBP);
        } catch (e) {
            return `GBP ${amountGBP}`;
        }
    }
    const rate = rates[currency];
    if (!rate) return ' -';
    const converted = amountGBP * rate;
    try {
        const locale = currency === 'USD' ? 'en-US' : 'en-IE';
        return new Intl.NumberFormat(locale, {style: 'currency', currency}).format(converted);
    } catch (e) {
        return `${currency} ${Math.round(converted)}`;
    }
}

// Currency-aware pricing component (client-only behavior inside useEffect)
export const CurrencyAwarePricing: React.FC<{defaultCurrency?: string; serviceType?: string}> = ({defaultCurrency='NGN', serviceType='default'}) => {
    const isDay = useIsDayTime();
    const [rates, setRates] = useState<Record<string, number> | null>(null);
    const [loading, setLoading] = useState(false);
    const [currency, setCurrency] = useState(defaultCurrency);
    const [billing, setBilling] = useState<'monthly'|'yearly'>('monthly');

    const basePlans = SERVICE_PRICING[serviceType] || SERVICE_PRICING['default'];

    useEffect(()=>{
        let mounted = true;
        async function load(){
            setLoading(true);
            try{
                const res = await fetch('/api/exchange');
                const json = await res.json();
                if (mounted && json?.rates) setRates(json.rates);
            }catch(e){console.warn(e)}finally{if(mounted) setLoading(false)}
        }
        load();
        return ()=>{mounted=false};
    },[]);

    return (
        <section className="py-12">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className={`text-2xl font-bold ${isDay ? 'text-gray-900' : 'text-white'}`}>Transparent Pricing</h3>
                        <p className={`mt-1 ${isDay ? 'text-gray-600' : 'text-white/70'}`}>Pick a plan and billing cycle.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex rounded-full bg-gray-200/30 p-1">
                            <button onClick={()=>setBilling('monthly')} className={`px-4 py-1 rounded-full ${billing==='monthly' ? 'bg-teal-500 text-white' : ''}`}>Monthly</button>
                            <button onClick={()=>setBilling('yearly')} className={`px-4 py-1 rounded-full ${billing==='yearly' ? 'bg-teal-500 text-white' : ''}`}>Yearly</button>
                        </div>
                        <select aria-label="currency" value={currency} onChange={(e)=>setCurrency(e.target.value)} className="rounded-md px-3 py-2">
                            <option value="GBP">GBP</option>
                            <option value="USD">USD</option>
                            <option value="NGN">NGN</option>
                            <option value="EUR">EUR</option>
                        </select>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {basePlans.plans.map((p)=>{
                        const v = billing==='monthly' ? p.monthlyGBP : p.yearlyGBP;
                        return (
                            <FxHoloCard key={p.name} day={isDay} className="p-6">
                                <div className="mb-4 font-bold text-lg">{p.name}</div>
                                <div className="text-3xl font-extrabold mb-2">{formatCurrencySAFE(v,currency,rates)}</div>
                                <div className="text-sm mb-4 text-gray-500">{billing==='monthly' ? 'per month' : 'per year'}</div>
                                <ul className="mb-6 space-y-2 text-sm">
                                    {p.bullets.map(b=> <li key={b} className="flex gap-2 items-start"><span className="text-teal-400">âœ“</span><span>{b}</span></li>)}
                                </ul>
                                <div>
                                    {v === null ? (
                                        <Link href="/quote-request"><a className="inline-block px-4 py-2 bg-teal-500 text-black rounded">Get custom quote</a></Link>
                                    ) : (
                                        <a className="inline-block px-4 py-2 bg-teal-500 text-black rounded" href={`/quote-request?plan=${encodeURIComponent(p.name)}&billing=${billing}`}>Start trial</a>
                                    )}
                                </div>
                            </FxHoloCard>
                        )
                    })}
                </div>

                <div className={`mt-6 p-4 rounded ${isDay? 'bg-gray-50 border' : 'bg-white/5 border'}`}>All plans include support and regular updates.</div>
            </div>
        </section>
    )
}

// Main template - aims to be feature-compatible but clearer and safer
const ServicePageTemplate: React.FC<ServicePageProps> = (props) => {
    const isDay = useIsDayTime();
    const {
        title,
        intro,
        heroVideo,
        heroVideoMobile,
        heroImage,
        heroStats = DEFAULT_HERO_STATS,
        topImages,
        midImage,
        eyebrow,
        introHeading,
        introBody,
        solutionsHeading,
        solutionsIntro,
        solutions = [],
        reasons = [],
        ctaHeading,
        ctaBody,
        stats = DEFAULT_STATS,
        testimonials = [],
        showPricing = true,
        serviceType,
        verticalSolutions,
        verticalSolutionsTitle,
        verticalSolutionsSubtitle,
        verticalSolutionsEyebrow,
    } = props;

    // Defensive client-only derived values
    const [clientTitle, setClientTitle] = useState<ReactNode | null>(null);
    useEffect(()=>{
        if (typeof window === 'undefined') return;
        if (!title) {
            const seg = window.location.pathname.split('/').filter(Boolean).pop() || 'Services';
            setClientTitle(seg.replace(/[-_]/g,' '));
        }
    },[title]);

    const resolvedTitle = clientTitle ?? title ?? 'Our Services';

    // Sticky section active id
    const [activeId, setActiveId] = useState<string>(solutions[0]?.target ?? '');

    // Simple scroll-to helper
    const scrollToSection = (target: string) => {
        const el = document.getElementById(target);
        if (el) el.scrollIntoView({behavior:'smooth', block:'start'});
    }

    // Minimal hero rendering
    const Hero = () => (
        <section className="relative overflow-hidden w-full" style={{minHeight: '60vh'}}>
            {heroVideo ? (
                <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" poster={heroImage || undefined}>
                    <source src={heroVideo} type="video/mp4"/>
                </video>
            ) : heroImage ? (
                <Image src={heroImage} alt={typeof title==='string'?title:'hero'} fill className="object-cover"/>
            ) : null}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30"/>

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                    <div>
                        {eyebrow && <div className="uppercase text-sm tracking-wide text-teal-300 font-semibold mb-3">{eyebrow}</div>}
                        <h1 className="text-4xl lg:text-6xl font-extrabold text-white leading-tight">{resolvedTitle}</h1>
                        {intro && <p className="mt-4 text-white/80 max-w-2xl">{intro}</p>}

                        <div className="mt-6 flex gap-4">
                            <Link href="/contact"><a className="px-6 py-3 rounded-full bg-teal-400 text-black font-semibold">Start a project</a></Link>
                            <Link href="/portfolio"><a className="px-6 py-3 rounded-full border border-white/10 text-white">View case studies</a></Link>
                        </div>
                    </div>

                    <div className="hidden lg:block">
                        <div className="grid grid-cols-2 gap-4">
                            {(topImages||[]).slice(0,4).map((src,i)=>(
                                <div key={i} className="relative w-full h-40 rounded overflow-hidden">
                                    <Image src={src} alt={`top-${i}`} fill className="object-cover"/>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );

    return (
        <div className={`${isDay ? 'bg-white text-black' : 'bg-black text-white'}`}>
            <Hero />

            <main className="max-w-7xl mx-auto px-6 py-12">
                {/* Intro */}
                <section className="mb-12">
                    <div className="grid lg:grid-cols-2 gap-8">
                        <div>
                            <FxSectionHeading day={isDay} title={introHeading ?? 'Overview'} subtitle={introBody ? introBody[0] : undefined}/>
                        </div>
                        <div>
                            <p className="text-[0.98em] leading-relaxed">{introBody ? introBody[1] : intro}</p>
                        </div>
                    </div>
                </section>

                {/* Solutions - use FxStickyScrollSection wrapper if there are items */}
                {solutions && solutions.length>0 && (
                    <FxStickyScrollSection day={isDay} heading={solutionsHeading ?? 'Solutions'} intro={solutionsIntro} navLabel="Our Solutions" activeId={activeId} onNavClickAction={scrollToSection} items={solutions} />
                )}

                {/* Mid image */}
                {midImage && (
                    <section className="py-10">
                        <FxReveal>
                            <FxFrame>
                                <div className="relative w-full h-64">
                                    <Image src={midImage} alt={typeof title==='string'?title:'mid'} fill className="object-cover"/>
                                </div>
                            </FxFrame>
                        </FxReveal>
                    </section>
                )}

                {/* Reasons / Who we are */}
                {reasons && reasons.length>0 && (
                    <section className="py-12">
                        <FxSectionHeading day={isDay} title="Why choose us"/>
                        <div className="grid md:grid-cols-3 gap-6 mt-6">
                            {reasons.map(r=> (
                                <FxHoloCard key={r.id} day={isDay} className="p-6">
                                    <div className="mb-3 font-bold">{r.title}</div>
                                    <div className="text-sm text-gray-400">{r.description}</div>
                                </FxHoloCard>
                            ))}
                        </div>
                    </section>
                )}

                {/* Pricing */}
                {showPricing && <CurrencyAwarePricing defaultCurrency={'NGN'} serviceType={serviceType || 'default'} />}

                {/* CTA */}
                {(ctaHeading || ctaBody) && (
                    <section className="py-12">
                        <FxFrame>
                            <div className="p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                                <div>
                                    <h3 className="text-2xl font-bold">{ctaHeading}</h3>
                                    <div className="mt-2 text-sm text-gray-500">{ctaBody}</div>
                                </div>
                                <div>
                                    <Link href="/contact"><a className="px-6 py-3 rounded-full bg-teal-400 text-black">Get started</a></Link>
                                </div>
                            </div>
                        </FxFrame>
                    </section>
                )}

            </main>
        </div>
    )
}

export default ServicePageTemplate;
