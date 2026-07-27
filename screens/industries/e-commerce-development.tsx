'use client';
import React, {useEffect, useRef, useState} from 'react';
import '@/app/globals.css'
import Image from "next/image";
import Link from "next/link";
import {motion} from 'framer-motion';
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
                                    We architect and develop conversion-optimized storefronts across Shopify Plus, WooCommerce, Magento, and headless solutions. Our expertise spans platform selection, theme customization, custom apps, API integrations, and advanced merchandising. We build with performance-first principles—fast checkout flows, mobile-first design, accessibility compliance (WCAG 2.1 AA), and SEO best practices. Every storefront includes design tokens, component libraries, and implementation documentation for seamless handoff to your engineering team.
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
                                    We engineer sophisticated multi-vendor marketplaces and subscription platforms with robust billing infrastructure. Our solutions handle recurring revenue management, vendor onboarding workflows, commission splits, real-time inventory sync, dispute resolution, and comprehensive admin dashboards. We integrate leading payment processors, implement fraud detection systems, and build tiered access controls. From B2B SaaS platforms to creator marketplaces, we deliver scalable systems handling millions in GMV with enterprise-grade reliability and compliance (PCI-DSS, GDPR, SOC 2).
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
                                    We architect secure, PCI-compliant payment systems integrating Stripe, PayPal, Square, Adyen, and regional gateways. Our expertise includes payment orchestration, 3D Secure authentication, tokenization, recurring billing, dynamic pricing, multi-currency support, and comprehensive fraud prevention. We optimize checkout flows using data-driven UX patterns—reducing cart abandonment, streamlining mobile payments, and supporting alternative methods (digital wallets, buy now pay later). Full compliance with industry standards and continuous security monitoring ensure your customers transact with confidence.
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
                                    We drive quantifiable revenue growth through rigorous experimentation and data-informed UX optimization. Our approach combines heatmap analysis, user session recording, multivariate A/B testing, and advanced analytics to identify friction points in the customer journey. We systematically test checkout flows, product recommendations, pricing strategies, and retention mechanics—measuring impact on conversion rates, average order value, and customer lifetime value. Documented insights inform roadmap prioritization while statistical rigor ensures all improvements are validated and scalable.
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
                                    We amplify product visibility and drive high-intent traffic through integrated SEO, content marketing, and performance advertising. Our eCommerce SEO strategy covers technical optimization, product schema markup, merchant center management, and category-level ranking. We build content strategies that capture buyer intent while managing Google Shopping campaigns, remarketing, and marketplace advertising across Amazon and other channels. Combined with conversion optimization and retention campaigns, we deliver sustainable growth in customer acquisition and lifetime value.
                                </p>
                            </div>
                        ),
                    },
                ]}
            />

            {/* eCommerce Capabilities Showcase - Futuristic Layered Design */}
            <section id={'ecommerce-showcase'} className={`relative py-20 lg:py-32 overflow-hidden ${isDayTime ? 'bg-white' : 'bg-black'}`}>
                {/* Ambient gradient layers */}
                <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute -top-40 -right-32 w-[600px] h-[600px] rounded-full opacity-12"
                         style={{background: isDayTime ? 'radial-gradient(circle, #ff005d 0%, transparent 70%)' : 'radial-gradient(circle, #ff005d 0%, transparent 70%)'}}/>
                    <div className="absolute -bottom-32 -left-24 w-[500px] h-[500px] rounded-full opacity-8"
                         style={{background: isDayTime ? 'radial-gradient(circle, #ff005d 0%, transparent 65%)' : 'radial-gradient(circle, #ff005d 0%, transparent 65%)'}}/>
                </div>

                {/* Content Container */}
                <div className="relative z-10 max-w-[96em] mx-auto px-6 sm:px-8 lg:px-[4.6em]">
                    {/* Section Header */}
                    <div className="mb-20">
                        <FxChip day={isDayTime} colorScheme="page-accent">PLATFORM CAPABILITIES</FxChip>
                        <h2 className={`mt-6 text-[2.2em] md:text-[3em] lg:text-[3.6em] font-[700] leading-[1.1] tracking-tight ${isDayTime ? 'text-black' : 'text-white'}`}>
                            Enterprise-Grade <span className="gx-gradient-text">Infrastructure</span>
                        </h2>
                        <p className={`mt-5 text-[1.05em] font-[300] leading-[1.6] max-w-3xl ${isDayTime ? 'text-gray-700' : 'text-white/70'}`}>
                            Our eCommerce platform combines cutting-edge technology, proven design patterns, and enterprise reliability to deliver measurable business outcomes at scale.
                        </p>
                    </div>

                    {/* Showcase Grid */}
                    <div className="grid lg:grid-cols-3 gap-6 mb-12">
                        {/* Primary Card - Platform Ecosystem */}
                        <motion.div initial={{opacity: 0, y: 20}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}} transition={{duration: 0.6}}
                                    className="lg:col-span-2">
                            <div className={`relative rounded-3xl overflow-hidden h-96 lg:h-[440px] group border backdrop-blur-sm
                                ${isDayTime ? 'bg-white/40 border-gray-200/50' : 'bg-gradient-to-br from-slate-800/40 to-slate-900/30 border-white/8'}`}>
                                <Image src={'/assets/ecom/mid.jpg'} alt={'Platform Architecture'} fill
                                       className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"/>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent pointer-events-none"/>

                                {/* Info Overlay */}
                                <div className="absolute bottom-0 left-0 right-0 p-8">
                                    <div className="text-sm text-white/80 uppercase tracking-widest mb-2">Integrated Platform</div>
                                    <h3 className="text-2xl lg:text-3xl font-bold text-white mb-3">Multi-Channel Commerce Engine</h3>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[var(--page-accent)] text-white">Omnichannel</span>
                                        <span className="px-3 py-1 rounded-full text-xs font-semibold badge-page">Real-time Sync</span>
                                        <span className="px-3 py-1 rounded-full text-xs font-semibold badge-page">99.99% Uptime</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Secondary Cards Stack */}
                        <div className="flex flex-col gap-6">
                            {/* Tech Stack Card */}
                            <motion.div initial={{opacity: 0, x: 20}} whileInView={{opacity: 1, x: 0}} viewport={{once: true}} transition={{delay: 0.15, duration: 0.6}}>
                                <div className={`rounded-2xl p-6 backdrop-blur-sm border h-full ${isDayTime ? 'bg-white/50 border-gray-200/50' : 'bg-slate-800/50 border-white/8'}`}>
                                    <div className="text-xs text-[var(--page-accent)] font-bold uppercase tracking-widest mb-3">Tech Stack</div>
                                    <h4 className={`text-lg font-bold mb-4 ${isDayTime ? 'text-black' : 'text-white'}`}>Modern & Scalable</h4>
                                    <ul className={`space-y-2 text-sm ${isDayTime ? 'text-gray-700' : 'text-white/70'}`}>
                                        <li className="flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--page-accent)]"/>
                                            Next.js & React
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--page-accent)]"/>
                                            Microservices API
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--page-accent)]"/>
                                            GraphQL & REST
                                        </li>
                                    </ul>
                                </div>
                            </motion.div>

                            {/* Performance Metrics Card */}
                            <motion.div initial={{opacity: 0, x: 20}} whileInView={{opacity: 1, x: 0}} viewport={{once: true}} transition={{delay: 0.3, duration: 0.6}}>
                                <div className={`rounded-2xl p-6 backdrop-blur-sm border h-full ${isDayTime ? 'bg-white/50 border-gray-200/50' : 'bg-slate-800/50 border-white/8'}`}>
                                    <div className="text-xs text-[var(--page-accent)] font-bold uppercase tracking-widest mb-3">Performance</div>
                                    <h4 className={`text-lg font-bold mb-4 ${isDayTime ? 'text-black' : 'text-white'}`}>Lightning Fast</h4>
                                    <div className="space-y-3">
                                        <div>
                                            <div className="text-xs text-white/60 mb-1">Page Speed</div>
                                            <div className="text-2xl font-bold text-[var(--page-accent)]">&lt;1.2s</div>
                                        </div>
                                        <div>
                                            <div className="text-xs text-white/60 mb-1">Core Web Vitals</div>
                                            <div className="text-sm text-green-400 font-semibold">All Green</div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Key Features Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            {label: 'Conversion', value: '+200%', desc: 'Avg. increase'},
                            {label: 'Cart Recovery', value: '45%', desc: 'Recovery rate'},
                            {label: 'Response Time', value: '&lt;200ms', desc: 'API latency'},
                            {label: 'Uptime', value: '99.99%', desc: 'SLA guarantee'}
                        ].map((metric, idx) => (
                            <motion.div key={idx} initial={{opacity: 0, y: 10}} whileInView={{opacity: 1, y: 0}} 
                                       viewport={{once: true}} transition={{delay: 0.1 * idx, duration: 0.5}}>
                                <div className={`rounded-xl p-4 backdrop-blur-sm border text-center ${isDayTime ? 'bg-white/30 border-gray-200/40' : 'bg-slate-800/30 border-white/6'}`}>
                                    <div className="text-xs text-[var(--page-accent)] font-bold uppercase tracking-widest mb-2">{metric.label}</div>
                                    <div className={`text-2xl font-bold mb-1 ${isDayTime ? 'text-black' : 'text-white'}`}>{metric.value}</div>
                                    <div className={`text-xs ${isDayTime ? 'text-gray-600' : 'text-white/50'}`}>{metric.desc}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
};

export default ECommerceDevelopment;

