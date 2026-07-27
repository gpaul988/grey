'use client';
import React, {useEffect, useRef, useState} from 'react';
import '@/app/globals.css'
import Image from "next/image";
import Link from "next/link";
import {useIsDayTime} from '../../components/useIsDayTime';

import ResponsiveVideoHero from '@/components/ResponsiveVideoHero';

import FuturisticIndustryLayout from '@/components/futuristic/FuturisticIndustryLayout';
import {FxBackground, FxChip, FxReveal, FxButton, FxHoloCard, FxStickyScrollSection} from '@/components/futuristic/fx';

const ECommerceDevelopment = () => {

    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isBackgroundActive, setIsBackgroundActive] = useState(false);
    const [activeId, setActiveId] = useState<string>("");

    // Floating button visibility hook
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsVisible(scrollPosition > 200); // Show the button after scrolling 200px
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // isDaytime react hook
    const isDayTime = useIsDayTime();

    const pageAccent = '#ff005d';
    const pageAccentRgb = '255,0,93';

    const rootStyle: React.CSSProperties & Record<string, string> = {
        '--ecom-accent': pageAccent,
        '--ecom-accent-rgb': pageAccentRgb,
        '--page-accent': pageAccent,
        '--page-accent-rgb': pageAccentRgb,
    };

    // Introductory section hook
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

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Development Solutions hook
    const handleScroll = () => {
        const sections = [
            "EWD",
            "MSMP",
            "EPSG",
            "ISCO",
            "ESEM",
        ];

        for (const sectionId of sections) {
            const section = document.getElementById(sectionId);
            if (section) {
                const rect = section.getBoundingClientRect();
                if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
                    setActiveId(sectionId);
                    break;
                }
            }
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const scrollToSection = (target: string) => {
        const section = document.getElementById(target);
        if (section) {
            section.scrollIntoView({behavior: "smooth", block: "start"});
            setActiveId(target); // Ensure the arrow icon is displayed when a section is clicked
        }
    };

    return (
        <div className={`${isDayTime ? 'bg-white' : 'bg-black'} min-h-screen`} style={rootStyle}>

            {/* Unified Futuristic eCommerce Hero - Background Image/Video with overlay */}
            <section className="relative overflow-hidden lg:w-full lg:min-h-[90vh] lg:h-[720px] w-full h-[600px]">
                {/* Video/Image Background */}
                <ResponsiveVideoHero
                    videoFallback="/assets/ecom/hero.mp4"
                    posterImage="/assets/ecom/hero.jpg"
                />

                {/* Grid & FX Background */}
                <div className="pointer-events-none absolute inset-0 z-[1]">
                    <FxBackground day={false} grid={true} aurora={true}/>
                </div>

                {/* Gradient Overlay with Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/50 z-[2]"/>
                <div
                    className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(var(--ecom-accent-rgb),0.12),transparent_50%)] z-[2]"/>

                {/* Futuristic FX Elements */}
                <div className="pointer-events-none absolute inset-0 z-[3]">
                    <div className="gx-scanline"/>
                    <div className="gx-noise-overlay"/>
                    <div className="gx-orbit absolute"
                         style={{width: '60vmax', height: '60vmax', top: '-20vmax', right: '-20vmax', opacity: .12}}/>
                </div>

                {/* Content Container */}
                <div className="absolute inset-0 flex items-center top-32 z-[11] px-4 sm:px-6 md:px-10 lg:px-[4.5em]">
                    <div className="w-full grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <div>
                            <div className="flex items-center gap-3 mb-6 lg:mb-8">
                                <div className="w-2.5 h-2.5 rounded-full animate-pulse"
                                     style={{background: 'var(--ecom-accent)'}}/>
                                <span className="text-[0.7em] lg:text-[0.82em] uppercase tracking-[0.22em] font-[600]"
                                      style={{color: 'var(--ecom-accent)'}}>eCommerce</span>
                            </div>

                            <h1 className="text-white text-[2em] lg:text-[4.5em] font-[700] leading-[1.08] tracking-tight mb-6 lg:mb-8">
                                Build Scalable, <span className="gx-gradient-text">Conversion-First</span> Online Stores
                            </h1>

                            <p className="text-white/70 text-[0.85em] lg:text-[1.08em] leading-[1.65] mb-8 lg:mb-10 font-[300]">
                                From storefront design to payment integrations and performance optimization, deliver
                                best-in-class eCommerce experiences that convert.
                            </p>

                            <div className="flex flex-wrap gap-2 mb-10 lg:mb-12">
                                {['Shopify', 'Magento', 'WooCommerce', 'Headless', 'PIM'].map((badge) => (
                                    <span key={badge}
                                          className="px-3 py-1.5 rounded-full text-[0.7em] lg:text-[0.75em] font-[600] uppercase tracking-wider badge-page">
                                            {badge}
                                        </span>
                                ))}
                            </div>

                            <div className="flex flex-wrap gap-4 items-center">
                                <Link href="/contact">
                                    <button
                                        className="relative px-8 py-3 rounded-full text-[0.85em] lg:text-[0.88em] font-bold overflow-hidden hover:shadow-lg transition-shadow duration-300 whitespace-nowrap"
                                        style={{background: 'var(--ecom-accent)', color: '#fff'}}>
                                            <span className="absolute inset-0" style={{
                                                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)'
                                            }}/>
                                        <span className="relative">Start a project →</span>
                                    </button>
                                </Link>
                                <Link href="/portfolio">
                                    <button
                                        className="px-8 py-3 rounded-full text-[0.85em] lg:text-[0.88em] font-semibold text-white/70 hover:text-white transition-all duration-300 hover:bg-white/10 whitespace-nowrap"
                                        style={{border: `1px solid rgba(255,255,255,0.15)`}}>
                                        View Case Studies
                                    </button>
                                </Link>
                            </div>
                        </div>

                        {/* Right Column - Impact Stats */}
                        <div className="hidden lg:flex flex-col items-end">
                            <div className="grid grid-cols-2 gap-6 w-full">
                                {[
                                    {label: 'Integrations', value: '100+'},
                                    {label: 'Years Experience', value: '8+'},
                                    {label: 'Products Launched', value: '123+'},
                                    {label: 'Avg Conversion Lift', value: '200%'}
                                ].map((stat) => (
                                    <div key={stat.label}
                                         className="px-6 py-5 rounded-2xl backdrop-blur-md transition-all duration-300 text-right page-accent-panel">
                                        <div
                                            className="text-[0.7em] uppercase tracking-wider font-[600] mb-2 page-accent-label">{stat.label}</div>
                                        <div
                                            className="text-white text-[1.8em] font-[700]">{stat.value}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Stats - Visible on small screens only */}
                <div className="lg:hidden absolute bottom-12 left-0 right-0 z-[11] px-6">
                    <div className="grid grid-cols-3 gap-3">
                        {[
                            {label: 'Integrations', value: '100+'},
                            {label: 'Experts', value: '8+'},
                            {label: 'Satisfaction', value: '99%'}
                        ].map((stat) => (
                            <div key={stat.label}
                                 className="px-3 py-2 rounded-xl backdrop-blur-md page-accent-panel-mobile">
                                <div
                                    className="text-[0.5em] uppercase tracking-wider font-[600] mb-1 page-accent-label">{stat.label}</div>
                                <div className="text-white text-[1.1em] font-[700]">{stat.value}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Introductory section (futuristic style) */}
            <section
                ref={sectionRef}
                data-bg={isBackgroundActive ? (isDayTime ? 'Dark' : 'Light') : (isDayTime ? 'Light' : 'Dark')}
                className={`pt-16 transition-colors duration-500 ${
                    isBackgroundActive
                        ? isDayTime ? 'bg-black text-white' : 'bg-white text-black'
                        : isDayTime ? 'bg-white text-black' : 'bg-black text-white'
                }`}>
                <FxBackground day={isDayTime}/>
                <div aria-hidden style={{
                    height: '6px',
                    width: '80px',
                    background: 'var(--ecom-accent)',
                    borderRadius: '999px',
                    margin: '12px 0'
                }}/>
                <div
                    className="relative z-10 grid lg:grid-cols-2 grid-cols-1 lg:gap-14 gap-6 lg:pt-20 pt-6 lg:pb-32 pb-6 mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em]">
                    <div>
                        <FxChip day={!isBackgroundActive ? !isDayTime : isDayTime}>ECOMMERCE EXCELLENCE</FxChip>
                    </div>

                    <div className="lg:-ml-[19em]">
                        <FxReveal>
                            <h3 className="lg:text-[3.5em] md:text-[3em] text-[2em] font-[700] tracking-tight leading-[1.15] mt-4">
                                Build Fast, Reliable, <span className="gx-gradient-text">Revenue-Driving</span> Stores
                            </h3>
                        </FxReveal>

                        <FxReveal delay={0.08}>
                            <div
                                className="grid lg:grid-cols-2 grid-cols-1 gap-6 mt-6 font-[300] text-justify text-[0.95em] md:text-[1.05em] leading-relaxed">
                                <div className="space-y-4">
                                    <p>We craft eCommerce platforms that put conversions first — optimized checkout
                                        flows,
                                        fast performance, and reliable integrations. Our approach blends commerce
                                        strategy,
                                        UX optimization, and secure engineering to reduce friction and increase purchase
                                        velocity.</p>
                                    <p>From headless architectures to managed SaaS platforms, we select the right stack
                                        for scale, maintainability, and speed. Tracking and experimentation are baked in
                                        to
                                        iterate on experience and maximize lifetime value.</p>
                                    <div className="flex flex-wrap gap-3 mt-4">
                                        {['Checkout UX', 'Headless CMS', 'Payments', 'Search & Merchandising'].map((p) => (
                                            <span key={p} className="gx-data-pill">{p}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <p>Launch with confidence: secure payment gateways, scalable hosting, observability,
                                        and performance budgets ensure your store stays fast under peak traffic and
                                        converts
                                        reliably.</p>
                                    <p>We partner through discovery, implementation, and optimization — delivering not
                                        just code but measurable growth. Technical debt is avoided with robust testing,
                                        CI/CD, and modular architecture.</p>
                                    <div className="flex flex-wrap gap-3 mt-4">
                                        {['Observability', 'A/B Testing', 'Performance Budgets', 'Platform Integrations'].map((p) => (
                                            <span key={p} className="gx-data-pill">{p}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </FxReveal>
                    </div>
                </div>
            </section>

            {/* eCommerce solutions (sticky scroll section) */}
            <FxStickyScrollSection
                day={isDayTime}
                heading={<>eCommerce<br/>solutions overview</>}
                intro="Our eCommerce offerings cover end-to-end storefront strategy, headless and SaaS platforms, payments, and growth engineering — all focused on driving conversions and long-term retention."
                navLabel="Our Solutions"
                activeId={activeId}
                onNavClickAction={scrollToSection}
                colorScheme="page-accent"
                items={[
                    {
                        id: '01',
                        title: 'eCommerce Web Design',
                        target: 'EWD',
                        tags: ['Shopify', 'Online Store', 'Design'],
                        body: (
                            <div>
                                <div className="flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300]">
                                    <span className="px-4 py-2 rounded-full badge-page">Shopify Development</span>
                                    <span className="px-4 py-2 rounded-full badge-page">Online Store Development</span>
                                    <span className="px-4 py-2 rounded-full badge-page">eCommerce Strategy</span>
                                </div>
                                <p className={'text-justify leading-[1.5] text-[0.873em] font-[300]'}>
                                    We select the right platform for scale and implement high-converting storefronts with performance, accessibility, and modular design systems in mind. Our handoffs include interactive prototypes and implementation-ready tokens for engineering teams.
                                </p>
                            </div>
                        ),
                    },
                    {
                        id: '02',
                        title: 'Membership Sites & Marketplaces',
                        target: 'MSMP',
                        tags: ['Subscription', 'Marketplace', 'Monetization'],
                        body: (
                            <div>
                                <div className="flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300]">
                                    <span className="px-4 py-2 rounded-full badge-page">Paywall Solutions</span>
                                    <span className="px-4 py-2 rounded-full badge-page">Membership Site Development</span>
                                    <span className="px-4 py-2 rounded-full badge-page">Custom eCommerce Development</span>
                                </div>
                                <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                    From subscription paywalls to multi-vendor marketplaces, build platforms that monetize content and commerce reliably with secure recurring billing, vendor onboarding flows, and moderation tooling.
                                </p>
                            </div>
                        ),
                    },
                    {
                        id: '03',
                        title: 'Payments & Gateways',
                        target: 'EPSG',
                        tags: ['Payments', 'Stripe', 'PCI'],
                        body: (
                            <div>
                                <div className="flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300]">
                                    <span className="px-4 py-2 rounded-full badge-page">Online Payment System</span>
                                    <span className="px-4 py-2 rounded-full badge-page">Innovative Payment Solutions</span>
                                </div>
                                <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                    Implement secure, compliant payment flows with Stripe, PayPal and alternative local gateways. Ensure PCI compliance, fraud protection, and smooth checkout experiences to minimize abandonment.
                                </p>
                            </div>
                        ),
                    },
                    {
                        id: '04',
                        title: 'Conversion Optimization',
                        target: 'ISCO',
                        tags: ['CRO', 'A/B Testing', 'Analytics'],
                        body: (
                            <div>
                                <div className="flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300]">
                                    <span className="px-4 py-2 rounded-full badge-page">User Experience Improvement</span>
                                    <span className="px-4 py-2 rounded-full badge-page">Conversion Rate Strategies</span>
                                    <span className="px-4 py-2 rounded-full badge-page">A/B Testing Solutions</span>
                                </div>
                                <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                    Combine analytics, experimentation and UX refinements to increase average order value and conversion. We design hypotheses, implement experiments, and measure impact against business KPIs.
                                </p>
                            </div>
                        ),
                    },
                    {
                        id: '05',
                        title: 'eCommerce Marketing & SEO',
                        target: 'ESEM',
                        tags: ['SEO', 'Merchant Center', 'Growth'],
                        body: (
                            <div>
                                <div className="flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300]">
                                    <span className="px-4 py-2 rounded-full badge-page">eCommerce Marketing Strategy</span>
                                    <span className="px-4 py-2 rounded-full badge-page">Search Engine Visibility</span>
                                    <span className="px-4 py-2 rounded-full badge-page">Sales-driven Marketing Solutions</span>
                                </div>
                                <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                    Integrate SEO, structured data for product discoverability, and growth marketing to drive qualified traffic and improve product visibility across search and shopping surfaces.
                                </p>
                            </div>
                        ),
                    },
                ]}
            />

            {/* Mid image*/}
            <div id={'mid image'}
                 className={'lg:-mt-[28em] md:-mt-[27em] sm:-mt-[3em] -mt-[3em] h-auto max-w-full w-full mx-auto'}>
                <Image
                    className={' object-fill'}
                    src={'/assets/ecom/mid.jpg'}
                    alt={'Middle Image'}
                    width={2560}
                    height={1440}
                    style={{
                        objectFit: "fill",
                        objectPosition: "center",
                    }}
                />
            </div>

        </div>
    );
};

export default ECommerceDevelopment;

