'use client';

import React, {useEffect, useRef, useState} from 'react';
import '@/app/globals.css'
import Image from "next/image";
import ResponsiveVideoHero from '@/components/ResponsiveVideoHero';
import Link from "next/link";
import {AiFillCaretDown, AiFillCaretUp, AiOutlineMinus, AiOutlinePlus} from "react-icons/ai";
import CountUp from "react-countup";
import {motion} from "framer-motion";
import {useIsDayTime} from '../../components/useIsDayTime';
import ServiceHero from '@/components/futuristic/ServiceHero';
import ServiceCapabilities from '@/components/futuristic/ServiceCapabilities';

import FuturisticServiceLayout from '@/components/futuristic/FuturisticServiceLayout';

import {
    FxBackground,
    FxChip,
    FxReveal,
    FxButton,
    FxHoloCard,
    FxStickyScrollSection,
    FxOrbit
} from '@/components/futuristic/fx';

const WebDesign = () => {
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

    // Introductory section hook
    useEffect(() => {
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

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Web Design Solutions hook
    const handleScroll = () => {
        const sections = [
            "BWDS",
            "CMW",
            "RWD",
            "MFW",
            "WSUE",
            "WSUJ",
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

    // Web Hosting Hook
    const [webIndex, setWebIndex] = useState<number | null>(null);

    const toggleWeb = (index: number) => {
        setWebIndex(webIndex === index ? null : index);
    }

    // Countup hook for Digital partners
    const stats = [
        {label: 'Years Experience', value: 8, suffix: '+'},
        {label: 'Team Members', value: 10, suffix: '+'},
        {label: 'Products Launched', value: 150, suffix: '+'},
        {label: 'Successful rebrands', value: 27, suffix: '+'},
        {label: 'Increase in Website Traffic', value: 350, suffix: '%'},
    ];

    return (
        <div className={`${isDayTime ? 'bg-white' : 'bg-black'} min-h-screen`}>

            {/* Unified Futuristic Web Design Hero - Background Image/Video with overlay */}
            <section className="relative overflow-hidden lg:w-full lg:min-h-[90vh] lg:h-[720px] w-full h-[600px]">
                {/* Video Background (desktop) and Image fallback (mobile) */}
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="hidden lg:block absolute inset-0 w-full h-full object-cover"
                    poster="/assets/wd/hero.jpg"
                >
                    <source src="/assets/wd/hero-mobile.mp4" type="video/mp4"/>
                </video>

                <Image
                    src="/assets/wd/hero.jpg"
                    alt="Web Design Hero"
                    fill
                    priority
                    className="lg:hidden object-cover"
                />

                {/* Grid & FX Background */}
                <div className="pointer-events-none absolute inset-0 z-[1]">
                    <FxBackground day={false} grid={true} aurora={true}/>
                </div>

                {/* Gradient Overlay with Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/50 z-[2]"/>
                <div
                    className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(45,212,191,0.12),transparent_50%)] z-[2]"/>

                {/* Futuristic FX Elements */}
                <div className="pointer-events-none absolute inset-0 z-[3]">
                    <div className="gx-scanline"/>
                    <div className="gx-noise-overlay"/>
                    <div className="gx-orbit absolute"
                         style={{width: '60vmax', height: '60vmax', top: '-20vmax', right: '-20vmax', opacity: .12}}/>
                </div>

                {/* Content Container */}
                <div className="absolute inset-0 flex items-center top-32 z-[11] px-6 sm:px-6 md:px-10 lg:px-[4.5em]">
                    <div className="w-full grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <div>
                            <div className="flex items-center gap-3 mb-6 lg:mb-8">
                                <div className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-pulse"/>
                                <span
                                    className="text-teal-400 text-[0.7em] lg:text-[0.82em] uppercase tracking-[0.22em] font-[600]">Web Design</span>
                            </div>

                            <h1 className="text-white text-[2em] lg:text-[4.5em] font-[700] leading-[1.08] tracking-tight mb-6 lg:mb-8">
                                Craft Stunning, <span className="gx-gradient-text">Conversion-Ready</span> Designs
                            </h1>

                            <p className="text-white/70 text-[0.85em] lg:text-[1.08em] leading-[1.65] mb-8 lg:mb-10 font-[300]">
                                Expert web design that captivates your audience and drives measurable business results.
                                We combine
                                strategic thinking, visual excellence, and user psychology to create websites that
                                convert visitors
                                into loyal customers.
                            </p>

                            <div className="flex flex-wrap gap-2 mb-10 lg:mb-12">
                                {['UI/UX Design', 'Responsive Layout', 'Brand Strategy', 'User Experience', 'Conversion Optimization'].map((badge) => (
                                    <span key={badge}
                                          className="px-3 py-1.5 rounded-full bg-teal-400/10 border border-teal-400/30 text-teal-300 text-[0.7em] lg:text-[0.75em] font-[600] uppercase tracking-wider">
                                            {badge}
                                        </span>
                                ))}
                            </div>

                            <div className="flex flex-wrap gap-4 items-center">
                                <Link href="/contact">
                                    <button
                                        className="relative px-8 py-3 rounded-full text-[0.85em] lg:text-[0.88em] font-bold overflow-hidden hover:shadow-lg transition-shadow duration-300 whitespace-nowrap"
                                        style={{background: '#2dd4bf', color: '#000'}}>
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
                                    {label: 'Designs Created', value: '50+'},
                                    {label: 'Years Experience', value: '8+'},
                                    {label: 'Client Satisfaction', value: '100%'},
                                    {label: 'Avg Conversion Lift', value: '300%'}
                                ].map((stat) => (
                                    <div key={stat.label}
                                         className="px-6 py-5 rounded-2xl border border-teal-400/25 bg-teal-400/8 backdrop-blur-md hover:bg-teal-400/12 transition-all duration-300 hover:border-teal-400/50 text-right">
                                        <div
                                            className="text-teal-300 text-[0.7em] uppercase tracking-wider font-[600] mb-2">{stat.label}</div>
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
                            {label: 'Designs', value: '50+'},
                            {label: 'Experts', value: '8+'},
                            {label: 'Satisfaction', value: '99%'}
                        ].map((stat) => (
                            <div key={stat.label}
                                 className="px-3 py-2 rounded-xl border border-teal-400/25 bg-teal-400/8 backdrop-blur-md">
                                <div
                                    className="text-teal-300 text-[0.5em] uppercase tracking-wider font-[600] mb-1">{stat.label}</div>
                                <div
                                    className="text-white text-[1.2em] font-[700]">{stat.value}</div>
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
                <div
                    className="relative z-10 grid lg:grid-cols-2 grid-cols-1 lg:gap-14 gap-6 lg:pt-20 pt-6 lg:pb-32 pb-6 mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em]">
                    <div>
                        <FxChip day={!isBackgroundActive ? !isDayTime : isDayTime}>DESIGN EXCELLENCE</FxChip>
                    </div>

                    <div className="lg:-ml-[19em]">
                        <FxReveal>
                            <h3 className="lg:text-[3.5em] md:text-[3em] text-[2em] font-[700] tracking-tight leading-[1.15] mt-4">
                                Craft Beautiful, High-Converting <span
                                className="gx-gradient-text">Digital Experiences</span>
                            </h3>
                        </FxReveal>

                        <FxReveal delay={0.08}>
                            <div
                                className="grid lg:grid-cols-2 grid-cols-1 gap-6 mt-6 font-[300] text-justify text-[0.95em] md:text-[1.05em] leading-relaxed">
                                <div className="space-y-4">
                                    <p>Web design is not just about aesthetics -it's about creating strategic digital
                                        assets that drive measurable business outcomes. Our design philosophy merges
                                        visual excellence, behavioral psychology, and technical precision to deliver
                                        websites that captivate users and maximize conversions.</p>
                                    <p>We employ a rigorous, data-driven design process: user research, competitive
                                        analysis, wireframing, prototyping, and iterative testing. Every pixel,
                                        interaction, and micromoment is intentional, designed to guide users toward
                                        desired actions while building trust and brand affinity.</p>
                                    <div className="flex flex-wrap gap-3 mt-4">
                                        {['Visual Strategy', 'UX Research', 'Interaction Design', 'Brand Expression'].map((p) => (
                                            <span key={p} className="gx-data-pill">{p}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <p>Whether launching a startup, rebranding an established business, or scaling
                                        eCommerce operations, we deliver responsive, accessible designs optimized for
                                        all devices and user scenarios. We ensure performance targets are met -fast load
                                        times, smooth interactions, optimal Core Web Vitals -because user experience
                                        directly impacts SEO rankings and conversion rates.</p>
                                    <p>Our end-to-end approach spans discovery consultation, strategic planning, UX/UI
                                        design system creation, front-end implementation, deployment, and ongoing
                                        optimization. We partner collaboratively with your team, providing transparent
                                        communication, regular reviews, and strategic recommendations -focused on
                                        delivering long-term value and sustainable growth.</p>
                                    <div className="flex flex-wrap gap-3 mt-4">
                                        {['Mobile-First Design', 'Accessibility (WCAG)', 'Performance Optimization', 'Conversion Strategy'].map((p) => (
                                            <span key={p} className="gx-data-pill">{p}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </FxReveal>
                    </div>
                </div>
            </section>

            {/* Top Image - Futuristic Showcase (enhanced) */}
            <section id={'top'}
                     className={'relative lg:max-w-full w-full py-24 mx-auto h-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em]'}>
                <div className={'relative grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-10 items-center'}>
                    {/* Left: Layered visual mockups with interactive hover */}
                    <div className="relative flex items-center justify-center group">
                        <div className="relative w-full max-w-2xl">
                            {/* Ambient gradient glow (decorative) */}
                            <div aria-hidden
                                 className="absolute -inset-3 rounded-2xl blur-3xl opacity-30 bg-gradient-to-tr from-teal-400 via-indigo-500 to-purple-600 transform-gpu rotate-6 pointer-events-none"/>

                            {/* Main device mockup with subtle lift on hover */}
                            <div
                                className="relative rounded-2xl overflow-hidden shadow-[0_30px_60px_rgba(2,6,23,0.6)] border border-white/8 bg-gradient-to-b from-black/40 to-black/20 transition-transform duration-700 will-change-transform group-hover:-translate-y-2 group-hover:scale-[1.01]">
                                <Image
                                    src={'/assets/wd/2.jpg'}
                                    alt={'Product design mockup'}
                                    width={1200}
                                    height={800}
                                    className="w-full h-auto object-cover block"
                                />
                            </div>

                            {/* Floating detail cards with micro motion */}
                            <div className="absolute -bottom-12 left-6 flex flex-col gap-3">
                                {[
                                    {
                                        title: 'Adaptive UI',
                                        sub: 'Automated layouts for every device',
                                        icon: 'M10 2a8 8 0 100 16 8 8 0 000-16z'
                                    },
                                    {
                                        title: 'Realtime Preview',
                                        sub: 'Inspect states & breakpoints',
                                        icon: 'M3 3h14v14H3z'
                                    }
                                ].map((c, i) => (
                                    <div key={i}
                                         className="w-56 bg-white/6 backdrop-blur-sm border border-white/6 rounded-2xl px-4 py-3 shadow-lg transform transition-all duration-500 hover:-translate-y-1">
                                        <div className="flex items-start gap-3">
                                            <svg width="20" height="20" viewBox="0 0 20 20"
                                                 className="flex-none mt-1 text-cyan-300" fill="currentColor"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path d={c.icon}/>
                                            </svg>
                                            <div>
                                                <div className="text-xs text-slate-300">{c.title}</div>
                                                <div className="mt-1 text-sm font-medium text-white/90">{c.sub}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Accent vertical ribbon (decorative) */}
                            <div aria-hidden
                                 className="hidden lg:block absolute -right-6 top-8 w-2 h-44 rounded-full bg-gradient-to-b from-indigo-400 to-purple-600 opacity-85 shadow-sm"/>
                        </div>
                    </div>

                    {/* Right: High-detail copy, KPIs, tech stack, and CTAs */}
                    <div className="relative">
                        <div className={`max-w-xl ${isDayTime ? 'text-slate-900' : 'text-slate-100'}`}>
                            <div className="inline-flex items-center gap-3 mb-4">
                                <span
                                    className="px-3 py-1 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 text-black text-xs font-semibold tracking-wide">FUTURISTIC DESIGN</span>
                                <span className="text-xs text-slate-400">Human-centered · Scalable · Performant</span>
                            </div>

                            <h3 className="text-3xl lg:text-4xl font-extrabold leading-tight tracking-tight">Futuristic
                                Web Design — Precision, Empathy, Velocity</h3>

                            <p className="mt-4 text-lg text-slate-400">Design systems that anticipate user intent,
                                reduce cognitive load, and scale across platforms. Interactions are measured,
                                prototyped, and validated to ensure decisions are data-driven and production-ready.</p>

                            <div className="mt-6 grid grid-cols-1 gap-4">
                                <div className="flex items-start gap-3">
                                    <div
                                        className="flex-none w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-indigo-500 flex items-center justify-center text-black font-semibold">DS
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold">Design systems & tokens</div>
                                        <div className="text-xs text-slate-400">Atomic components, semantic tokens, and
                                            visual regression controls for consistent product experiences.
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div
                                        className="flex-none w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-black font-semibold">PX
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold">Performance-first architecture</div>
                                        <div className="text-xs text-slate-400">Critical-path rendering, lazy hydration,
                                            and image/asset automation to achieve sub-1.5s LCP in real-world conditions.
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 flex items-center gap-4">
                                <a href={'/contact'}
                                   className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-3 font-semibold shadow-lg hover:scale-[1.02] transition-transform">Start
                                    a project</a>
                                <a href={'/services/ui-ux-design'}
                                   className="inline-flex items-center justify-center rounded-xl border border-white/10 text-sm text-slate-300 px-4 py-2">Explore
                                    services</a>
                            </div>

                            <div className="mt-8 grid grid-cols-3 gap-3">
                                <div className="bg-white/4 rounded-lg p-4">
                                    <div className="text-xs text-slate-300">Avg. LCP</div>
                                    <div className="text-xl font-bold">1.2s</div>
                                    <div className="text-[11px] text-slate-400 mt-1">Measured on real devices (90th
                                        percentile)
                                    </div>
                                </div>
                                <div className="bg-white/4 rounded-lg p-4">
                                    <div className="text-xs text-slate-300">Conversion uplift</div>
                                    <div className="text-xl font-bold">+28%</div>
                                    <div className="text-[11px] text-slate-400 mt-1">Average uplift after UI &
                                        performance improvements
                                    </div>
                                </div>
                                <div className="bg-white/4 rounded-lg p-4">
                                    <div className="text-xs text-slate-300">Accessibility</div>
                                    <div className="text-xl font-bold">WCAG AA</div>
                                    <div className="text-[11px] text-slate-400 mt-1">Semantic HTML, keyboard & screen
                                        reader support
                                    </div>
                                </div>
                            </div>

                            {/* Tech stack chips */}
                            <div className="mt-6 flex flex-wrap gap-2">
                                {['React', 'Next.js', 'Tailwind', 'TypeScript', 'Vite', 'Cypress'].map((t) => (
                                    <span key={t}
                                          className="text-xs bg-white/6 px-3 py-1 rounded-full border border-white/6">{t}</span>
                                ))}
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            {/* Web Design Services Overview - Enhanced with FxStickyScrollSection */}
            <FxStickyScrollSection
                day={isDayTime}
                heading={<>Web Design<br/>services overview</>}
                intro="Our web design services deliver pixel-perfect, performance-optimized digital experiences engineered to drive user engagement, conversion, and measurable business outcomes. We combine strategic UX research, futuristic interface design, and cutting-edge development practices to create scalable design systems that evolve with your brand."
                navLabel="Design Solutions"
                activeId={activeId}
                onNavClickAction={scrollToSection}
                items={[
                    {
                        id: "01",
                        title: "Bespoke Web Design Services",
                        target: "BWDS",
                        tags: ["Custom Design", "Digital Transformation", "User Experience"],
                        body: (
                            <div>
                                <p>
                                    Every bespoke engagement begins with a business-first discovery: stakeholder
                                    interviews, analytics review, competitive benchmarking, and user research synthesis.
                                    We document user personas, prioritize features against measurable KPIs, and
                                    establish success metrics tied directly to revenue, conversion, and engagement
                                    goals. Our design process combines strategic thinking with creative excellence,
                                    producing interactive prototypes, comprehensive UI design systems, accessible
                                    component libraries, and implementation-ready design tokens with detailed handoff
                                    documentation for engineers.
                                </p>
                                <p className="mt-3">
                                    We deliver custom applications engineered for your specific market, user base, and
                                    business model. Typical engagement spans 6–12 weeks for MVP websites, with larger
                                    platforms requiring extended discovery and validation phases. Performance targets
                                    include Lighthouse scores ≥90, TTFB &lt;300ms, Core Web Vitals in recommended
                                    thresholds, WCAG AA accessibility baseline, and secure asset delivery with CSP
                                    recommendations baked in from the start.
                                </p>
                            </div>
                        ),
                    },
                    {
                        id: "02",
                        title: "Content Managed Websites",
                        target: "CMW",
                        tags: ["CMS Architecture", "Headless Systems", "Content Strategy"],
                        body: (
                            <div>
                                <p>
                                    Headless CMS architectures decouple content management from presentation, enabling
                                    your marketing team to publish across web, mobile, email, and third-party channels
                                    from a single content hub. We architect flexible content models, design intuitive
                                    editorial interfaces, and implement powerful APIs that empower non-technical content
                                    creators to manage branded experiences without developer intervention. Our
                                    implementations leverage platforms like Contentful, Sanity, or Strapi with custom
                                    frontend frameworks (Next.js, Astro) to deliver omnichannel content delivery at
                                    scale.
                                </p>
                                <p className="mt-3">
                                    Deliverables include content schema design, editorial workflow automation, media
                                    asset management integration, version control and scheduled publishing, localization
                                    frameworks for multi-market campaigns, SEO metadata management, and analytics
                                    instrumentation. Typical projects run 8–16 weeks and unlock rapid content velocity
                                    while maintaining design and brand consistency across touchpoints. We provide
                                    ongoing support for content optimization, performance monitoring, and feature
                                    expansion as your business evolves.
                                </p>
                            </div>
                        ),
                    },
                    {
                        id: "03",
                        title: "Responsive Web Design",
                        target: "RWD",
                        tags: ["Mobile-First", "Adaptive Layouts", "Cross-Device Testing"],
                        body: (
                            <div>
                                <p>
                                    Responsive design is no longer optional—it's foundational. We build adaptive
                                    experiences that scale gracefully from 320px mobile viewports to 2560px desktop
                                    displays, with fluid typography, flexible imagery, and intelligent touch targets.
                                    Our mobile-first methodology ensures core content and functionality remain
                                    accessible and performant on constrained networks and devices, while desktop
                                    experiences leverage additional screen real estate for richer interactions and data
                                    visualization.
                                </p>
                                <p className="mt-3">
                                    We employ modern CSS techniques (flexbox, grid, container queries) to create layouts
                                    that reflow naturally without breakpoint brittleness. Every design is tested across
                                    real devices (iOS, Android, macOS, Windows), browsers, and network conditions using
                                    tools like BrowserStack and Lighthouse CI. Deliverables include responsive component
                                    library documentation, performance budgets for each breakpoint, and accessibility
                                    validation at mobile resolutions (touch-friendly tap targets, readable text,
                                    sufficient color contrast). Typical projects run 4–10 weeks and yield 3–5x traffic
                                    lift post-launch when combined with SEO optimization.
                                </p>
                            </div>
                        ),
                    },
                    {
                        id: "04",
                        title: "Mobile-First Websites",
                        target: "MFW",
                        tags: ["App-Like Experience", "PWA", "Offline Functionality"],
                        body: (
                            <div>
                                <p>
                                    Mobile-first means designing the optimal experience for smartphones first, then
                                    enhancing for larger screens—the opposite of traditional responsive design. We
                                    prioritize essential content and calls-to-action for mobile, eliminate friction from
                                    navigation and forms, and implement app-like interactions (smooth scrolling, gesture
                                    support, bottom nav) that users expect from native apps. Progressive Web App (PWA)
                                    technology adds installability, offline support, and push notifications, turning
                                    your website into a first-class platform experience.
                                </p>
                                <p className="mt-3">
                                    Our mobile-first approach cuts load time in half on 4G networks, boosts Core Web
                                    Vitals metrics (LCP &lt;2.5s, FID &lt;100ms, CLS &lt;0.1), and dramatically improves
                                    SEO rankings—Google prioritizes mobile-optimized sites. We implement service workers
                                    for offline caching, web manifests for installability, and lazy-loading techniques
                                    to defer non-critical resources. Deliverables include performance audit reports,
                                    mobile lighthouse scores &gt;95, touch interaction guidelines, and A/B testing
                                    templates. Typical engagements run 6–12 weeks and yield 40%+ conversion uplift
                                    through frictionless mobile experiences.
                                </p>
                            </div>
                        ),
                    },
                    {
                        id: "05",
                        title: "Website User Experience (UX)",
                        target: "WSUE",
                        tags: ["User Research", "Usability Testing", "Information Architecture"],
                        body: (
                            <div>
                                <p>
                                    User experience design starts with empathy and data. We conduct moderated usability
                                    testing sessions, heatmap analysis, session replay studies, and user interviews to
                                    uncover friction points, mental models, and opportunities for delight. Our UX audit
                                    frameworks examine information architecture clarity, navigation discoverability,
                                    form optimization, accessibility compliance, and conversion path efficiency. We
                                    synthesize findings into actionable insights that inform design iteration and
                                    stakeholder buy-in.
                                </p>
                                <p className="mt-3">
                                    Deliverables include research synthesis reports, user flow diagrams, interaction
                                    specifications, accessibility audit reports (WCAG), and design rationale
                                    documentation. We run iterative design sprints with stakeholders, prototype
                                    high-fidelity interactions in Figma, and validate designs through user testing
                                    before engineering begins. UX engagements typically last 3–6 weeks for MVP
                                    validation; longer discovery phases (8–12 weeks) work best for enterprise
                                    transformation projects where organizational change is required. Our UX
                                    recommendations consistently yield 20–35% improvements in user satisfaction scores
                                    and measurable conversion gains.
                                </p>
                            </div>
                        ),
                    },
                    {
                        id: "06",
                        title: "Website User Journeys & Optimization",
                        target: "WSUJ",
                        tags: ["Journey Mapping", "Funnel Analysis", "Conversion Optimization"],
                        body: (
                            <div>
                                <p>
                                    Mapping user journeys reveals decision points, drop-off moments, and opportunities
                                    that influence conversion behavior. We combine analytics data, session replays,
                                    customer interviews, and event tracking to produce detailed journey maps that span
                                    awareness, consideration, decision, and retention phases. Each touchpoint is
                                    analyzed for friction, clarity, and persuasiveness—from the initial landing
                                    experience through purchase or sign-up and beyond into retention mechanics and
                                    referral loops.
                                </p>
                                <p className="mt-3">
                                    Deliverables include journey maps, conversion funnel analysis, content strategy
                                    aligned to each funnel stage, and prioritized experiment backlog for A/B testing. We
                                    establish KPI targets for conversion rate lift, drop-off rate reduction, average
                                    order value improvement, and customer lifetime value gains. Our typical sprint runs
                                    2–4 weeks to produce initial journey artifacts and test critical hypotheses; ongoing
                                    optimization is continuous and data-driven. Projects consistently yield 15–45%
                                    conversion uplift and 2–3x improvement in time-to-purchase metrics when combined
                                    with design and content refinements.
                                </p>
                            </div>
                        ),
                    },
                ]}
            />

            {/* Mid-Section Showcase - Design Systems & Component Libraries */}
            <section id={'mid'}
                     className={`relative lg:max-w-full w-full py-24 mx-auto h-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em]`}>
                <div className={`grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-12 items-center`}>
                    {/* Left: Detailed narrative and metrics */}
                    <div className={`relative order-2 lg:order-1`}>
                        <div className={`max-w-xl ${isDayTime ? 'text-slate-900' : 'text-slate-100'}`}>
                            <div className="inline-flex items-center gap-3 mb-4">
                                <span
                                    className="px-3 py-1 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 text-black text-xs font-semibold tracking-wide">DESIGN SYSTEMS</span>
                                <span className="text-xs text-slate-400">Component-driven · Scalable · Accessible</span>
                            </div>

                            <h2 className="text-3xl lg:text-4xl font-extrabold leading-tight tracking-tight">Design
                                Systems & Component Architecture</h2>

                            <p className="mt-4 text-lg text-slate-400">
                                Every enterprise digital experience requires a cohesive, scalable design system. We
                                architect comprehensive design systems—spanning visual tokens, component libraries,
                                interaction patterns, and accessibility guidelines—that empower distributed teams to
                                ship consistent, performant experiences at scale while reducing design-to-code friction.
                            </p>

                            <div className="mt-6 space-y-4">
                                <div className="flex items-start gap-4">
                                    <div
                                        className="flex-none w-10 h-10 rounded-lg bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center text-black font-semibold text-sm">01
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold">Token-based design architecture</div>
                                        <div className="text-xs text-slate-400 mt-1">Semantic color, typography,
                                            spacing, and shadow tokens; automated Figma-to-code sync via tools like
                                            Style Dictionary or Tokens Studio.
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div
                                        className="flex-none w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-black font-semibold text-sm">02
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold">Component library & storybook</div>
                                        <div className="text-xs text-slate-400 mt-1">Atomic components (atoms,
                                            molecules, organisms) with exhaustive prop documentation, accessibility
                                            annotations, and interactive sandbox for testing.
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div
                                        className="flex-none w-10 h-10 rounded-lg bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center text-black font-semibold text-sm">03
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold">Design-to-code automation</div>
                                        <div className="text-xs text-slate-400 mt-1">Handoff automation via Figma
                                            plugins, design specifications, and GitHub integration; zero manual
                                            copy-paste.
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 flex items-center gap-4 flex-wrap">
                                <a href={'/contact'}
                                   className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white px-5 py-3 font-semibold shadow-lg hover:scale-[1.02] transition-transform">Explore
                                    design systems</a>
                            </div>

                            <div className="mt-8 grid grid-cols-2 gap-4">
                                <div className="bg-white/4 rounded-lg p-4">
                                    <div className="text-xs text-slate-300">Efficiency</div>
                                    <div className="text-xl font-bold">70% faster</div>
                                    <div className="text-[11px] text-slate-400 mt-1">Design-to-production cycles</div>
                                </div>
                                <div className="bg-white/4 rounded-lg p-4">
                                    <div className="text-xs text-slate-300">Consistency</div>
                                    <div className="text-xl font-bold">99% match</div>
                                    <div className="text-[11px] text-slate-400 mt-1">Between design & shipped code</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Layered visual showcase */}
                    <div className={`relative order-1 lg:order-2 flex items-center justify-center group`}>
                        <div className="relative w-full max-w-2xl">
                            {/* Ambient gradient backdrop */}
                            <div aria-hidden
                                 className="absolute -inset-4 rounded-3xl blur-3xl opacity-25 bg-gradient-to-br from-purple-400 via-pink-400 to-indigo-600 transform-gpu -rotate-3 pointer-events-none"/>

                            {/* Primary showcase card */}
                            <div
                                className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-gradient-to-b from-white/8 to-white/4 transition-transform duration-700 will-change-transform group-hover:-translate-y-3 group-hover:scale-[1.01]">
                                <Image
                                    src={'/assets/wd/4.jpg'}
                                    alt={'Component library showcase'}
                                    width={1200}
                                    height={800}
                                    className="w-full h-auto object-cover block"
                                />
                                {/* Overlay gradient */}
                                <div
                                    className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"/>
                            </div>

                            {/* Floating secondary card - offset */}
                            <div
                                className="absolute -bottom-16 -right-8 w-64 rounded-2xl overflow-hidden shadow-lg border border-white/10 bg-black/40 backdrop-blur-sm transition-transform duration-700 transform hover:scale-105">
                                <Image
                                    src={'/assets/wd/3.jpg'}
                                    alt={'Design token system'}
                                    width={500}
                                    height={400}
                                    className="w-full h-auto object-cover"
                                />
                                <div
                                    className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"/>
                                <div className="absolute bottom-0 left-0 right-0 p-3">
                                    <div className="text-xs text-white/80">Token & Component System</div>
                                    <div className="text-sm font-semibold text-white mt-1">Design-to-Code Sync</div>
                                </div>
                            </div>

                            {/* Accent elements */}
                            <div aria-hidden
                                 className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-gradient-to-br from-pink-400/30 to-purple-600/30 blur-2xl"/>
                            <div aria-hidden
                                 className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full bg-gradient-to-tr from-indigo-400/20 to-purple-600/20 blur-3xl"/>
                        </div>
                    </div>
                </div>
            </section>

            {/* Web Hosting & Infrastructure Excellence */}
            <section
                className={`relative max-w-full w-full mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em] py-24 ${isDayTime ? 'bg-white' : 'bg-black'}`}>
                <div className={`relative grid lg:grid-cols-2 grid-cols-1 gap-12 lg:gap-16 items-start`}>
                    {/* Left: Compelling intro copy */}
                    <div className={`${isDayTime ? 'text-slate-900' : 'text-slate-100'}`}>
                        <div className="inline-flex items-center gap-3 mb-4">
                            <span
                                className="px-3 py-1 rounded-full bg-gradient-to-r from-cyan-400 to-blue-400 text-black text-xs font-semibold tracking-wide">INFRASTRUCTURE</span>
                            <span className="text-xs text-slate-400">Performance · Security · Scale</span>
                        </div>

                        <h2 className="text-3xl lg:text-4xl font-extrabold leading-tight tracking-tight mb-4">
                            Enterprise-Grade Hosting & Infrastructure
                        </h2>

                        <p className="text-lg text-slate-400 leading-relaxed mb-6">
                            We deliver scalable, business-ready hosting solutions engineered for companies of all
                            sizes—from ambitious startups to large enterprises. Our infrastructure portfolio spans
                            affordable entry-level platforms to high-performance enterprise-grade systems with built-in
                            load balancing, auto-scaling, disaster recovery, and 99.99% uptime guarantees. Every
                            solution is architected for reliability, security, compliance, and performance excellence.
                        </p>

                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd"
                                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                          clipRule="evenodd"/>
                                </svg>
                                <span className="text-sm">Auto-scaling to handle traffic spikes</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd"
                                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                          clipRule="evenodd"/>
                                </svg>
                                <span className="text-sm">Global CDN with sub-200ms latency</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd"
                                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                          clipRule="evenodd"/>
                                </svg>
                                <span className="text-sm">Enterprise security & compliance certifications</span>
                            </div>
                        </div>

                        <div className="mt-8 grid grid-cols-2 gap-4">
                            <div className="bg-white/4 rounded-lg p-4 border border-white/6">
                                <div className="text-xs text-slate-300">Uptime SLA</div>
                                <div className="text-2xl font-bold mt-1">99.99%</div>
                                <div className="text-[11px] text-slate-400 mt-1">Enterprise-grade availability</div>
                            </div>
                            <div className="bg-white/4 rounded-lg p-4 border border-white/6">
                                <div className="text-xs text-slate-300">Regions Served</div>
                                <div className="text-2xl font-bold mt-1">6+ continents</div>
                                <div className="text-[11px] text-slate-400 mt-1">Global infrastructure</div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Enhanced Accordion with Tabs */}
                    <div className={`relative space-y-3`}>
                        {/* Futuristic accent bars */}
                        <div aria-hidden
                             className="absolute -inset-3 rounded-2xl bg-gradient-to-br from-cyan-400/10 via-transparent to-blue-400/10 blur-2xl"/>

                        <div className="relative space-y-3">
                            {[
                                {
                                    id: 0,
                                    icon: '🌐',
                                    title: 'Content Delivery Network (CDN)',
                                    description: 'A Content Delivery Network (CDN) is a core component of modern web performance strategy. We design CDN configurations that minimize latency, reduce origin load, and provide consistent performance for global audiences across 200+ edge locations.',
                                    details: [
                                        {
                                            label: 'Deliverables',
                                            content: 'Edge caching rules, cache-control policy, image & asset optimization pipeline, signed URLs for private assets, and automated cache invalidation strategy.'
                                        },
                                        {
                                            label: 'SLOs',
                                            content: '95th percentile asset latency < 200ms for target regions; cache hit ratio > 85% for static assets.'
                                        },
                                        {
                                            label: 'Technical',
                                            content: 'Origin shielding, HTTP/2 & HTTP/3, Brotli compression, QUIC protocol, and automated purge hooks integrated into CI/CD.'
                                        },
                                    ],
                                    timeline: '1–2 weeks'
                                },
                                {
                                    id: 1,
                                    icon: '⚡',
                                    title: 'Website Performance Optimization',
                                    description: 'Performance is a measurable business lever that directly impacts user engagement and SEO rankings. Our optimization work targets server and client-side bottlenecks to achieve predictable, repeatable improvements in speed, conversion, and user satisfaction.',
                                    details: [
                                        {
                                            label: 'Tech Stack',
                                            content: 'Redis/memcache for edge caching, Nginx or managed load balancers, background job queues (BullMQ), build-time asset optimization (image compression, critical CSS inlining).'
                                        },
                                        {
                                            label: 'KPI Targets',
                                            content: 'LCP < 2.5s, TTFB < 300ms, CLS < 0.1, FID < 100ms, and mobile FCP aligned to project goals.'
                                        },
                                        {
                                            label: 'Continuous',
                                            content: 'Performance budgets defined in CI, Lighthouse gating on pull requests, automated RUM analysis, and regression detection.'
                                        },
                                    ],
                                    timeline: '1–3 sprints'
                                },
                                {
                                    id: 2,
                                    icon: '📊',
                                    title: 'Website Monitoring & Observability',
                                    description: 'Continuous monitoring ensures availability, performance, and incident response. We implement layered monitoring (synthetic, uptime, RUM, APM) to detect issues proactively and inform capacity planning before problems impact users.',
                                    details: [
                                        {
                                            label: 'Deliverables',
                                            content: 'Uptime alerting, synthetic health checklists, RUM instrumentation, error aggregations, distributed tracing, and runbooks for common incidents.'
                                        },
                                        {
                                            label: 'SLOs',
                                            content: '99.9% uptime target (99.99% for premium); alerting thresholds tuned to reduce noise while maintaining responsiveness.'
                                        },
                                        {
                                            label: 'Support',
                                            content: 'Optional 24/7 on-call rotations, SLA-backed response times, incident post-mortems, and continuous improvement cycles.'
                                        },
                                    ],
                                    timeline: 'Ongoing'
                                },
                                {
                                    id: 3,
                                    icon: '🔒',
                                    title: 'Website Security & Compliance',
                                    description: 'Security is non-negotiable. We design defense-in-depth strategies combining hardened infrastructure, secure development practices, continuous testing, and compliance frameworks to protect your digital assets and customer data.',
                                    details: [
                                        {
                                            label: 'Controls',
                                            content: 'WAF, regular dependency & OS patching, automated container/image scanning, MFA, encryption at rest & in transit, DDoS mitigation.'
                                        },
                                        {
                                            label: 'Process',
                                            content: 'Periodic vulnerability scans, scheduled pentests for sensitive applications, secure CI/CD pipelines with secrets management, compliance audits.'
                                        },
                                        {
                                            label: 'Compliance',
                                            content: 'GDPR-ready data handling patterns, optional PCI DSS, SOC 2 Type II guidance, HIPAA readiness, and industry-specific regulatory frameworks.'
                                        },
                                    ],
                                    timeline: 'Initial + quarterly'
                                }
                            ].map((item) => (
                                <div
                                    key={item.id}
                                    className={`group rounded-xl border transition-all duration-300 ${
                                        webIndex === item.id
                                            ? `${isDayTime ? 'border-black bg-black/5' : 'border-cyan-400/50 bg-cyan-400/5'} shadow-lg`
                                            : `${isDayTime ? 'border-gray-200 bg-white hover:border-gray-300' : 'border-white/10 bg-white/3 hover:border-white/20'}`
                                    }`}
                                >
                                    <button
                                        onClick={() => toggleWeb(item.id)}
                                        className={`w-full px-4 py-4 flex items-center justify-between focus:outline-none transition-colors`}
                                    >
                                        <div className="flex items-center gap-4 flex-1 text-left">
                                            <span className="text-2xl">{item.icon}</span>
                                            <div>
                                                <div
                                                    className="text-sm font-semibold text-slate-400">Step {item.id + 1}</div>
                                                <div
                                                    className={`text-lg font-bold ${isDayTime ? 'text-black' : 'text-white'}`}>{item.title}</div>
                                            </div>
                                        </div>
                                        <div className="flex-none">
                                            {webIndex === item.id ? (
                                                <AiFillCaretUp
                                                    className={`text-cyan-400 lg:text-[1.5em] text-[1.2em] transition-transform`}/>
                                            ) : (
                                                <AiFillCaretDown
                                                    className={`${isDayTime ? 'text-gray-400' : 'text-white/40'} lg:text-[1.5em] text-[1.2em] transition-transform group-hover:text-cyan-400/60`}/>
                                            )}
                                        </div>
                                    </button>

                                    {webIndex === item.id && (
                                        <div
                                            className={`px-4 pb-4 border-t ${isDayTime ? 'border-gray-200' : 'border-white/10'} animate-in fade-in slide-in-from-top-2 duration-300`}>
                                            <p className={`text-sm leading-relaxed mt-4 ${isDayTime ? 'text-gray-600' : 'text-gray-300'}`}>
                                                {item.description}
                                            </p>

                                            <div className="mt-4 space-y-3">
                                                {item.details.map((detail, idx) => (
                                                    <div key={idx}
                                                         className={`text-sm p-3 rounded-lg ${isDayTime ? 'bg-gray-100' : 'bg-white/5'} border ${isDayTime ? 'border-gray-200' : 'border-white/10'}`}>
                                                        <div
                                                            className="font-semibold text-cyan-400 mb-1">{detail.label}</div>
                                                        <div
                                                            className={`text-xs leading-relaxed ${isDayTime ? 'text-gray-600' : 'text-gray-400'}`}>{detail.content}</div>
                                                    </div>
                                                ))}
                                            </div>

                                            <div
                                                className={`mt-4 text-xs font-semibold px-3 py-2 rounded-lg inline-block ${isDayTime ? 'bg-blue-50 text-blue-700' : 'bg-blue-400/10 text-blue-300'}`}>
                                                ⏱️ Typical timeline: {item.timeline}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Closing CTA - Trusted Digital Partner Section */}
            <section
                className={`relative overflow-hidden ${isDayTime ? 'bg-gradient-to-br from-slate-100 to-slate-200' : 'bg-gradient-to-br from-slate-900 via-black to-slate-900'}`}>
                {/* Decorative animated background elements */}
                <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div
                        className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-gradient-to-br from-cyan-400/10 to-blue-600/10 blur-3xl"/>
                    <div
                        className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-gradient-to-tr from-purple-400/10 to-pink-600/10 blur-3xl"/>
                </div>

                <div
                    className={`relative py-24 lg:py-32 max-w-full w-full mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em]`}>
                    <div className="max-w-4xl">
                        {/* Badge intro */}
                        <div className="inline-flex items-center gap-2 mb-6">
                            <span
                                className="px-3 py-1 rounded-full bg-gradient-to-r from-cyan-400 to-blue-400 text-black text-xs font-semibold tracking-wide">LET'S BUILD TOGETHER</span>
                            <span className={`text-xs ${isDayTime ? 'text-slate-600' : 'text-slate-400'}`}>Enterprise-grade solutions · Proven results</span>
                        </div>

                        {/* Hero heading */}
                        <h2 className={`text-4xl lg:text-6xl font-bold leading-tight tracking-tight mb-6 ${isDayTime ? 'text-slate-900' : 'text-white'}`}>
                            Your <span className="gx-gradient-text">Trusted Digital Partner</span>
                        </h2>

                        {/* Compelling narrative */}
                        <p className={`text-lg lg:text-xl leading-relaxed max-w-3xl mb-8 ${isDayTime ? 'text-slate-700' : 'text-slate-300'}`}>
                            We specialize in crafting high-impact digital experiences—from strategic web applications
                            and conversion-optimized marketing websites to innovative mobile solutions. Whether you're a
                            funded startup, scaleup, or established enterprise, we've partnered with hundreds of
                            companies across verticals to bring ambitious digital products to life. Our approach
                            combines deep technical expertise, design excellence, and business acumen to deliver
                            standout experiences that fuel growth, engagement, and sustainable competitive advantage.
                        </p>

                        {/* Key highlights */}
                        <div className="grid lg:grid-cols-2 gap-4 mb-10">
                            {[
                                {icon: '✓', text: 'Proven track record: 100+ projects shipped'},
                                {icon: '✓', text: 'Cross-industry expertise (SaaS, fintech, commerce, healthcare)'},
                                {icon: '✓', text: 'End-to-end delivery: Strategy → Design → Development → Launch'},
                                {
                                    icon: '✓',
                                    text: 'Results-driven: 40% avg. conversion uplift, 2–3x faster time-to-market'
                                }
                            ].map((highlight, idx) => (
                                <div key={idx} className="flex items-center gap-3">
                                    <span className="flex-none text-cyan-400 text-xl font-bold">{highlight.icon}</span>
                                    <span
                                        className={`text-sm font-medium ${isDayTime ? 'text-slate-700' : 'text-slate-300'}`}>{highlight.text}</span>
                                </div>
                            ))}
                        </div>

                        {/* CTA Button - Enhanced */}
                        <div className="flex flex-col sm:flex-row gap-4 items-start mb-16">
                            <Link href="/contact">
                                <button
                                    className={`relative inline-flex items-center justify-center overflow-hidden group rounded-xl px-8 py-4 font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-[1.02]`}
                                    style={{
                                        background: 'linear-gradient(135deg, #0ff4dd 0%, #00d4ff 100%)',
                                        color: '#000'
                                    }}
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        Schedule Consultation
                                        <span className="text-xl">→</span>
                                    </span>
                                    <span
                                        className="absolute inset-0 bg-gradient-to-r from-cyan-300 to-blue-400 opacity-0 group-hover:opacity-30 transition-opacity"/>
                                </button>
                            </Link>
                            <Link href="/portfolio">
                                <button
                                    className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all border-2 ${
                                        isDayTime
                                            ? 'border-slate-800 text-slate-900 hover:bg-slate-800 hover:text-white'
                                            : 'border-white/20 text-white hover:bg-white/10 hover:border-white/40'
                                    }`}>
                                    View Case Studies
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* Stats Counter Section */}
                    <div className={`relative rounded-2xl border backdrop-blur-sm p-10 lg:p-14 ${
                        isDayTime
                            ? 'border-slate-300 bg-white/60'
                            : 'border-white/10 bg-white/5'
                    }`}>
                        <div className="mb-8">
                            <h3 className={`text-2xl font-bold mb-2 ${isDayTime ? 'text-slate-900' : 'text-white'}`}>
                                Our Impact by the Numbers
                            </h3>
                            <p className={`text-sm ${isDayTime ? 'text-slate-600' : 'text-slate-400'}`}>
                                Proven results across diverse industries and project scales
                            </p>
                        </div>

                        <div
                            className={`grid lg:grid-cols-5 md:grid-cols-5 sm:grid-cols-3 grid-cols-1 gap-6 lg:gap-8 ${isDayTime ? 'divide-slate-200' : 'divide-white/10'}`}
                            id={'countup'}
                        >
                            {stats.map((stat, index) => (
                                <div
                                    key={index}
                                    className={`flex flex-col items-center lg:items-start text-center lg:text-left p-4 rounded-lg transition-all hover:scale-105 ${
                                        isDayTime ? 'hover:bg-slate-100' : 'hover:bg-white/5'
                                    }`}
                                >
                                    <div
                                        className="gx-gradient-text lg:text-5xl md:text-4xl sm:text-3xl text-2xl font-bold mb-2">
                                        <CountUp end={stat.value} duration={2.5} suffix={stat.suffix || ''}/>
                                    </div>
                                    <p className={`text-sm font-semibold ${isDayTime ? 'text-slate-700' : 'text-slate-300'}`}>
                                        {stat.label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Trust indicators */}
                    <div
                        className={`mt-12 pt-8 border-t text-center ${isDayTime ? 'border-slate-300 text-slate-600' : 'border-white/10 text-slate-400'}`}>
                        <p className="text-sm font-medium">
                            <span className="inline-block mr-3">🤝</span> Trusted by 100+ companies • Industry leaders in
                            SaaS, fintech, e-commerce, and healthcare
                        </p>
                    </div>
                </div>
            </section>

            {/* Why Web Design - Premium Enterprise Section */}
            <div className={`lg:-mt-[3em] md:-mt-[3em] relative overflow-hidden transition-colors duration-300 ${
                isDayTime
                    ? 'bg-gradient-to-br from-black via-slate-950 to-slate-900 text-white'
                    : 'bg-gradient-to-br from-white via-slate-50 to-slate-100 text-slate-900'
            }`}>
                {/* Animated gradient orb background (subtle) */}
                <div
                    className={`absolute top-0 right-0 w-[500px] h-[500px] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob ${isDayTime ? 'bg-blue-500' : 'bg-blue-300'}`}/>
                <div
                    className={`absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000 ${isDayTime ? 'bg-purple-500' : 'bg-purple-300'}`}/>

                <div
                    className='relative grid lg:grid-cols-2 grid-cols-1 lg:my-[3em] my-[1em] lg:gap-16 gap-8 lg:pt-24 pt-8 lg:pb-20 pb-8 lg:max-w-full w-full mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em]'>

                    {/* Left Column: Strategic Copy & Metrics */}
                    <div className='flex flex-col justify-center'>
                        {/* Eyebrow */}
                        <div
                            className={`inline-flex items-center gap-2 mb-4 w-fit px-3 py-1.5 rounded-full text-[0.75em] font-semibold tracking-widest uppercase backdrop-blur-sm ${
                                isDayTime
                                    ? 'bg-white/10 text-blue-300 border border-white/20'
                                    : 'bg-slate-900/30 text-blue-600 border border-slate-300/20'
                            }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${isDayTime ? 'bg-blue-400' : 'bg-blue-500'}`}/>
                            Strategic Digital Asset
                        </div>

                        {/* Headline with gradient */}
                        <h2 className='lg:text-[3.5em] md:text-[3em] text-[2em] font-[600] lg:leading-[1.15] leading-[1.2] mt-4 mb-6 tracking-tight'>
                            Why Web Design<br/>
                            <span className={`bg-clip-text text-transparent bg-gradient-to-r ${
                                isDayTime
                                    ? 'from-blue-300 via-cyan-300 to-emerald-300'
                                    : 'from-blue-600 via-cyan-600 to-emerald-600'
                            }`}>
                                Matters
                            </span>
                        </h2>

                        {/* Compelling copy */}
                        <p className={`text-[0.95em] font-[300] leading-[1.7] mb-8 ${isDayTime ? 'text-slate-300' : 'text-slate-700'}`}>
                            Your website is your digital flagship—a critical business infrastructure that drives
                            conversion, establishes authority, and compounds customer lifetime value. Enterprise-grade
                            web design isn't cosmetic; it's a strategic investment in brand equity, operational
                            efficiency, and sustainable growth.
                        </p>

                        {/* Key Metrics Grid */}
                        <div className='grid grid-cols-2 gap-5 mt-2'>
                            {/* Metric 1: Conversion Rate */}
                            <div
                                className={`p-5 rounded-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 cursor-default ${
                                    isDayTime
                                        ? 'bg-white/8 border border-white/15 hover:bg-white/12'
                                        : 'bg-slate-700/20 border border-slate-300/20 hover:bg-slate-700/30'
                                }`}>
                                <div
                                    className={`text-[0.75em] font-semibold uppercase tracking-wider mb-3 ${isDayTime ? 'text-slate-400' : 'text-slate-600'}`}>
                                    ↗️ Conversion
                                </div>
                                <div
                                    className={`text-[2.2em] font-[700] ${isDayTime ? 'text-emerald-300' : 'text-emerald-600'}`}>
                                    60%
                                </div>
                                <div
                                    className={`text-[0.75em] font-[300] mt-2 ${isDayTime ? 'text-slate-400' : 'text-slate-600'}`}>
                                    avg. increase
                                </div>
                            </div>

                            {/* Metric 2: Engagement Rate */}
                            <div
                                className={`p-5 rounded-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 cursor-default ${
                                    isDayTime
                                        ? 'bg-white/8 border border-white/15 hover:bg-white/12'
                                        : 'bg-slate-700/20 border border-slate-300/20 hover:bg-slate-700/30'
                                }`}>
                                <div
                                    className={`text-[0.75em] font-semibold uppercase tracking-wider mb-3 ${isDayTime ? 'text-slate-400' : 'text-slate-600'}`}>
                                    🎯 Engagement
                                </div>
                                <div
                                    className={`text-[2.2em] font-[700] ${isDayTime ? 'text-cyan-300' : 'text-cyan-600'}`}>
                                    75%
                                </div>
                                <div
                                    className={`text-[0.75em] font-[300] mt-2 ${isDayTime ? 'text-slate-400' : 'text-slate-600'}`}>
                                    time-on-site
                                </div>
                            </div>

                            {/* Metric 3: Page Speed */}
                            <div
                                className={`p-5 rounded-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 cursor-default ${
                                    isDayTime
                                        ? 'bg-white/8 border border-white/15 hover:bg-white/12'
                                        : 'bg-slate-700/20 border border-slate-300/20 hover:bg-slate-700/30'
                                }`}>
                                <div
                                    className={`text-[0.75em] font-semibold uppercase tracking-wider mb-3 ${isDayTime ? 'text-slate-400' : 'text-slate-600'}`}>
                                    ⚡ Load Time
                                </div>
                                <div
                                    className={`text-[2.2em] font-[700] ${isDayTime ? 'text-blue-300' : 'text-blue-600'}`}>
                                    &lt;3s
                                </div>
                                <div
                                    className={`text-[0.75em] font-[300] mt-2 ${isDayTime ? 'text-slate-400' : 'text-slate-600'}`}>
                                    core web vital
                                </div>
                            </div>

                            {/* Metric 4: Bounce Rate */}
                            <div
                                className={`p-5 rounded-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 cursor-default ${
                                    isDayTime
                                        ? 'bg-white/8 border border-white/15 hover:bg-white/12'
                                        : 'bg-slate-700/20 border border-slate-300/20 hover:bg-slate-700/30'
                                }`}>
                                <div
                                    className={`text-[0.75em] font-semibold uppercase tracking-wider mb-3 ${isDayTime ? 'text-slate-400' : 'text-slate-600'}`}>
                                    📊 Bounce Rate
                                </div>
                                <div
                                    className={`text-[2.2em] font-[700] ${isDayTime ? 'text-purple-300' : 'text-purple-600'}`}>
                                    -40%
                                </div>
                                <div
                                    className={`text-[0.75em] font-[300] mt-2 ${isDayTime ? 'text-slate-400' : 'text-slate-600'}`}>
                                    reduction
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Premium Card with Business Impact */}
                    <div
                        className={`flex flex-col justify-center rounded-2xl backdrop-blur-xl p-8 transition-all duration-300 hover:shadow-2xl ${
                            isDayTime
                                ? 'bg-white/10 border border-white/20 shadow-2xl shadow-blue-900/20'
                                : 'bg-slate-900/40 border border-slate-400/20 shadow-2xl shadow-slate-900/30'
                        }`}>

                        <div className='space-y-8'>
                            {/* Section 1: Brand Strategy */}
                            <div className='group'>
                                <div className='flex items-start gap-4 mb-4'>
                                    <div className={`text-2xl p-3 rounded-lg backdrop-blur-sm ${
                                        isDayTime
                                            ? 'bg-blue-500/20 text-blue-300'
                                            : 'bg-blue-500/10 text-blue-600'
                                    }`}>
                                        🎯
                                    </div>
                                    <div className='flex-1'>
                                        <h4 className='text-[1.1em] font-[600] mb-2 tracking-tight'>Brand Strategy &
                                            Authority</h4>
                                        <p className={`text-[0.9em] font-[300] leading-[1.6] ${isDayTime ? 'text-slate-300' : 'text-slate-700'}`}>
                                            Your website is the central hub for brand storytelling. We craft digital
                                            experiences that position your enterprise as an industry authority,
                                            establishing trust with prospects through consistent messaging, premium
                                            design, and thought leadership positioning.
                                        </p>
                                    </div>
                                </div>
                                <div className={`h-px ${isDayTime ? 'bg-white/10' : 'bg-slate-300/20'}`}/>
                            </div>

                            {/* Section 2: Growth & Revenue */}
                            <div className='group'>
                                <div className='flex items-start gap-4 mb-4'>
                                    <div className={`text-2xl p-3 rounded-lg backdrop-blur-sm ${
                                        isDayTime
                                            ? 'bg-emerald-500/20 text-emerald-300'
                                            : 'bg-emerald-500/10 text-emerald-600'
                                    }`}>
                                        📊
                                    </div>
                                    <div className='flex-1'>
                                        <h4 className='text-[1.1em] font-[600] mb-2 tracking-tight'>Growth & Revenue
                                            Acceleration</h4>
                                        <p className={`text-[0.9em] font-[300] leading-[1.6] ${isDayTime ? 'text-slate-300' : 'text-slate-700'}`}>
                                            Optimized conversion funnels, intelligent CTAs, and behavioral UX design
                                            directly impact your bottom line. We integrate analytics, A/B testing, and
                                            growth loops to turn traffic into qualified leads and paying customers.
                                        </p>
                                    </div>
                                </div>
                                <div className={`h-px ${isDayTime ? 'bg-white/10' : 'bg-slate-300/20'}`}/>
                            </div>

                            {/* Section 3: Operations */}
                            <div className='group'>
                                <div className='flex items-start gap-4 mb-4'>
                                    <div className={`text-2xl p-3 rounded-lg backdrop-blur-sm ${
                                        isDayTime
                                            ? 'bg-cyan-500/20 text-cyan-300'
                                            : 'bg-cyan-500/10 text-cyan-600'
                                    }`}>
                                        ⚙️
                                    </div>
                                    <div className='flex-1'>
                                        <h4 className='text-[1.1em] font-[600] mb-2 tracking-tight'>Operations &
                                            Scalability</h4>
                                        <p className={`text-[0.9em] font-[300] leading-[1.6] ${isDayTime ? 'text-slate-300' : 'text-slate-700'}`}>
                                            Enterprise-grade infrastructure ensures your site scales effortlessly.
                                            Seamless CRM, marketing automation, and analytics integration streamline
                                            operations, reduce manual work, and enable data-driven decision making.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Highlighted Takeaway Box */}
                        <div className={`mt-8 p-5 rounded-lg backdrop-blur-sm border-l-4 ${
                            isDayTime
                                ? 'bg-gradient-to-r from-blue-500/10 to-transparent border-blue-400 text-blue-200'
                                : 'bg-gradient-to-r from-blue-500/5 to-transparent border-blue-500 text-blue-700'
                        }`}>
                            <div className='flex items-start gap-3'>
                                <span className='text-xl mt-1'>💡</span>
                                <div>
                                    <p className={`text-[0.9em] font-[500] ${isDayTime ? 'text-blue-300' : 'text-blue-600'}`}>
                                        The Bottom Line
                                    </p>
                                    <p className={`text-[0.85em] font-[300] mt-1 leading-[1.5] ${isDayTime ? 'text-slate-300' : 'text-slate-700'}`}>
                                        Professional web design is measurable, ROI-driven infrastructure. It's not an
                                        expense—it's your most effective channel for customer acquisition, brand
                                        reinforcement, and operational excellence.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`relative lg:py-32 py-16 ${isDayTime ? 'bg-white text-black' : 'bg-black text-white'}`}>
                {/* Grid background */}
                <div className="pointer-events-none absolute inset-0" style={{
                    backgroundImage: `linear-gradient(${isDayTime ? 'rgba(13,148,136,0.06)' : 'rgba(45,212,191,0.05)'} 1px, transparent 1px), linear-gradient(90deg, ${isDayTime ? 'rgba(13,148,136,0.06)' : 'rgba(45,212,191,0.05)'} 1px, transparent 1px)`,
                    backgroundSize: '44px 44px',
                }}/>

                {/* Soothing aurora blobs for depth */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="absolute -top-44 -right-28 w-[560px] h-[560px] rounded-full opacity-18"
                         style={{background: 'radial-gradient(circle, #7dd3fc 0%, transparent 70%)'}}/>
                    <div className="absolute -bottom-36 -left-20 w-[460px] h-[460px] rounded-full opacity-12"
                         style={{background: 'radial-gradient(circle, #60a5fa 0%, transparent 70%)'}}/>
                </div>

                <div className="relative z-10 max-w-[90em] mx-auto px-6 sm:px-8 lg:px-[4.6em]">
                    <FxReveal>
                        <div className="flex items-center gap-5 mb-14">
                            <FxChip day={isDayTime}>YOUR DESIGN JOURNEY</FxChip>
                            <div className={`flex-1 h-px ${isDayTime ? 'bg-black/10' : 'bg-white/10'}`}/>
                            <span
                                className={`font-mono text-[0.7em] tracking-widest ${isDayTime ? 'text-black/30' : 'text-white/30'}`}>DISCOVERY</span>
                        </div>
                    </FxReveal>

                    <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                        <FxReveal>
                            <div className="relative">
                                {/* decorative corner markers */}
                                <div
                                    className={`absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 ${isDayTime ? 'border-sky-400' : 'border-sky-500'} rounded-tl-sm z-10`}/>
                                <div
                                    className={`absolute -top-3 -right-3 w-8 h-8 border-t-2 border-r-2 ${isDayTime ? 'border-sky-400' : 'border-sky-500'} rounded-tr-sm z-10`}/>
                                <div
                                    className={`absolute -bottom-3 -left-3 w-8 h-8 border-b-2 border-l-2 ${isDayTime ? 'border-sky-400' : 'border-sky-500'} rounded-bl-sm z-10`}/>
                                <div
                                    className={`absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 ${isDayTime ? 'border-sky-400' : 'border-sky-500'} rounded-br-sm z-10`}/>


                                <div className="absolute inset-0 rounded-2xl opacity-40"
                                     style={{boxShadow: isDayTime ? '0 0 60px -10px rgba(59,130,246,0.28)' : '0 0 60px -10px rgba(96,165,250,0.12)'}}/>

                                <div className="relative overflow-hidden rounded-2xl">
                                    <Image src={'/assets/wd/wsm.jpg'} alt={'Website support and maintenance'}
                                           width={4650} height={500} className="w-full object-cover rounded-2xl"/>
                                    <div className="absolute inset-0 pointer-events-none"
                                         style={{background: 'linear-gradient(135deg, rgba(96,165,250,0.10) 0%, transparent 60%)'}}/>
                                    <div className="absolute inset-0 pointer-events-none"
                                         style={{backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(96,165,250,0.02) 3px, rgba(96,165,250,0.02) 4px)'}}/>
                                    <motion.div initial={{opacity: 0, y: 10}} whileInView={{opacity: 1, y: 0}}
                                                viewport={{once: true}} transition={{delay: 0.4}}
                                                className="absolute bottom-5 left-5 px-4 py-2 rounded-full backdrop-blur-md text-[0.72em] font-semibold tracking-wider text-sky-300"
                                                style={{
                                                    background: isDayTime ? 'rgba(255,255,255,0.7)' : 'rgba(8,10,20,0.6)',
                                                    border: '1px solid rgba(99,102,241,0.12)'
                                                }}>
                                        • Design Systems · Component Libraries · Accessibility Audit
                                    </motion.div>
                                </div>

                                <motion.div initial={{opacity: 0, x: 20}} whileInView={{opacity: 1, x: 0}}
                                            viewport={{once: true}}
                                            transition={{delay: 0.5, type: 'spring', stiffness: 120}}
                                            className="absolute -right-6 top-10 hidden lg:block">
                                    <div className="rounded-2xl px-5 py-4 backdrop-blur-xl text-center min-w-[110px]"
                                         style={{
                                             background: isDayTime ? 'rgba(255,255,255,0.85)' : 'rgba(10,10,30,0.85)',
                                             border: '1px solid rgba(99,102,241,0.06)'
                                         }}>
                                        <div className="text-[1.6em] font-[900] text-sky-500 leading-none">UI</div>
                                        <div
                                            className={`text-[0.65em] font-[600] tracking-widest mt-1 uppercase ${isDayTime ? 'text-black/60' : 'text-white/60'}`}>Kit
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </FxReveal>

                        <div>
                            <FxReveal delay={0.1}>
                                <h2 className="text-[2.4em] lg:text-[3.1em] font-[700] leading-[1.1] tracking-tight mb-6">Design-led <span
                                    className="gx-gradient-text">website</span> strategy<br/><span
                                    className={`text-[0.75em] font-[300] ${isDayTime ? 'text-black/50' : 'text-white/50'}`}>that converts.</span>
                                </h2>
                            </FxReveal>
                            <FxReveal delay={0.18}>
                                <p className={`text-[0.98em] leading-[1.8] mb-6 ${isDayTime ? 'text-black/70' : 'text-white/75'}`}>Crafting
                                    intuitive interfaces, consistent systems and accessible experiences that guide users
                                    to
                                    meaningful outcomes. We combine research-driven UX, performance optimisation, and
                                    scalable design systems to deliver measurable business impact.</p>
                            </FxReveal>
                            <FxReveal delay={0.24}>
                                <p className={`text-[0.95em] leading-[1.8] mb-10 pb-10 border-b ${isDayTime ? 'text-black/70 border-black/10' : 'text-white/75 border-white/10'}`}>Our
                                    process includes
                                    user research, rapid prototyping, component-driven engineering, and accessibility
                                    reviews.
                                    Each milestone is tied to KPIs—conversion, engagement, and speed—so design decisions
                                    are
                                    accountable and outcome-focused.</p>
                            </FxReveal>
                            <FxReveal delay={0.3}>
                                <div
                                    className="flex flex-wrap gap-3 mb-10">{['Design Systems', 'UX Research', 'Performance', 'Accessibility'].map(i => (
                                    <span key={i}
                                          className={`px-4 py-1.5 rounded-full text-[0.75em] font-[600] tracking-wide border ${isDayTime ? 'border-sky-700/30 text-sky-700 bg-sky-700/06' : 'border-sky-400/30 text-sky-300 bg-sky-400/08'}`}>{i}</span>
                                ))}
                                </div>
                            </FxReveal>
                            <FxReveal delay={0.36}>
                                <p className={`text-[0.88em] font-[400] mb-6 ${isDayTime ? 'text-black/60' : 'text-white/60'}`}>Ready
                                    to evolve your product with design-led strategy?</p>
                                <FxButton day={!isDayTime} href="/contact" variant="solid">Discuss Design <span
                                    className="text-[1.2em] leading-none ml-1">→</span></FxButton>
                            </FxReveal>
                        </div>
                    </div>
                </div>
            </div>

            {/* Last image — Futuristic flagship showcase */}
            <div id={'last-image'} className={'h-auto max-w-full w-full mx-auto'}>
                <div className={`relative rounded-4xl overflow-hidden ${isDayTime ? 'bg-white' : 'bg-slate-900'}`}>
                    {/* Layered ambient halos */}
                    <div aria-hidden className="absolute inset-0 pointer-events-none">
                        <div className="absolute -top-48 -left-32 w-[760px] h-[760px] rounded-full opacity-16"
                             style={{background: isDayTime ? 'radial-gradient(circle,#c7f9ff 0%, transparent 65%)' : 'radial-gradient(circle,#0ea5a4 0%, transparent 65%)'}}/>
                        <div className="absolute -bottom-44 -right-20 w-[680px] h-[680px] rounded-full opacity-10"
                             style={{background: isDayTime ? 'radial-gradient(circle,#eef2ff 0%, transparent 65%)' : 'radial-gradient(circle,#075985 0%, transparent 65%)'}}/>
                    </div>

                    <div className="relative z-10 max-w-[96em] mx-auto px-6 sm:px-8 lg:px-[4.6em] py-14">
                        <div className="grid lg:grid-cols-2 gap-10 items-center">

                            {/* Left: hero mockup stack with floating detail cards */}
                            <FxReveal>
                                <motion.div initial={{opacity: 0, y: 18}} whileInView={{opacity: 1, y: 0}}
                                            viewport={{once: true}} transition={{duration: 0.7}} className="relative">
                                    <div
                                        className="relative rounded-3xl overflow-hidden shadow-[0_50px_120px_-30px_rgba(2,6,23,0.7)] h-[60vh] lg:h-[80vh]">
                                        <Image src={'/assets/wd/last.jpg'} alt={'Final design showcase'} fill
                                               className="object-cover w-full h-full rounded-3xl" priority/>

                                        {/* interactive gradient layer with stronger cinematic sweep */}
                                        <div className="absolute inset-0 pointer-events-none"
                                             style={{background: isDayTime ? 'linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(59,130,246,0.02) 40%, transparent 60%)' : 'linear-gradient(135deg, rgba(6,182,212,0.09) 0%, rgba(2,6,23,0.4) 60%)'}}/>

                                        {/* subtle inner neon rim for futuristic edge */}
                                        <div className="absolute inset-0 rounded-3xl pointer-events-none"
                                             style={{boxShadow: isDayTime ? 'inset 0 0 40px rgba(59,130,246,0.06)' : 'inset 0 0 80px rgba(6,182,212,0.08)'}}/>

                                        {/* Primary floating card */}
                                        <motion.div initial={{opacity: 0, scale: 0.95, x: 40}}
                                                    whileInView={{opacity: 1, scale: 1, x: 0}} viewport={{once: true}}
                                                    transition={{delay: 0.28, type: 'spring', stiffness: 140}}
                                                    className="absolute -right-10 top-12 hidden lg:block">
                                            <div
                                                className={`rounded-3xl px-6 py-5 backdrop-blur-xl min-w-[200px] border ${isDayTime ? 'bg-white/75 border-slate-100' : 'bg-gradient-to-br from-slate-800/60 to-slate-900/40 border-white/6'}`}>
                                                <div className="text-[1.4em] font-extrabold gx-gradient-text">Design
                                                    System
                                                </div>
                                                <div
                                                    className={`text-[0.72em] mt-1 ${isDayTime ? 'text-slate-700' : 'text-white/70'}`}>Tokens
                                                    • Components • Documentation
                                                </div>
                                            </div>
                                        </motion.div>

                                        {/* Secondary floating mini-cards */}
                                        <motion.div initial={{opacity: 0, y: 12}} whileInView={{opacity: 1, y: 0}}
                                                    viewport={{once: true}} transition={{delay: 0.4}}
                                                    className="absolute left-6 top-6 hidden lg:flex flex-col gap-3">
                                            <div
                                                className={`w-[160px] rounded-xl p-3 shadow-md ${isDayTime ? 'bg-white/90 border border-slate-100' : 'bg-black/50 border-white/8'}`}>
                                                <div className="text-sm font-semibold">Adaptive UI</div>
                                                <div className="text-xs text-slate-400">Variants, states & tokens</div>
                                            </div>
                                            <div
                                                className={`w-[160px] rounded-xl p-3 shadow-md ${isDayTime ? 'bg-white/90 border border-slate-100' : 'bg-black/50 border-white/8'}`}>
                                                <div className="text-sm font-semibold">Realtime Preview</div>
                                                <div className="text-xs text-slate-400">Component playground</div>
                                            </div>
                                        </motion.div>

                                    </div>

                                    {/* decorative mini mockup */}
                                    <motion.div initial={{opacity: 0, y: 8}} whileInView={{opacity: 1, y: 0}}
                                                viewport={{once: true}} transition={{delay: 0.62}}
                                                className="absolute -left-10 -bottom-8 hidden lg:block">
                                        <div
                                            className={`w-[240px] h-[140px] rounded-xl shadow-2xl ${isDayTime ? 'bg-white/95 border border-slate-100' : 'bg-black/50 border-white/8'}`}>
                                            <div className="p-4 text-[0.9em] font-semibold">Prototype • Flows • States
                                            </div>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            </FxReveal>

                            {/* Right: copy, features, KPIs and CTAs */}
                            <div className="order-2 lg:order-none">
                                <FxReveal delay={0.06}>
                                    <h3 className={`text-3xl lg:text-4xl font-extrabold mb-4 leading-tight ${isDayTime ? 'text-slate-900' : 'text-white'}`}>
                                        Futuristic web experiences that translate into measurable growth
                                    </h3>
                                </FxReveal>

                                <FxReveal delay={0.12}>
                                    <p className={`mb-6 ${isDayTime ? 'text-slate-700' : 'text-slate-300'}`}>
                                        We design and deliver high-fidelity systems that scale across products and
                                        platforms. Expect
                                        accessible, performant interfaces, a living component library, and delivery
                                        pipelines that
                                        shorten release cycles while improving consistency and conversion.
                                    </p>
                                </FxReveal>

                                <div className="grid gap-4 mb-6">
                                    {[
                                        {
                                            title: 'Design systems & tokens',
                                            desc: 'Maintainable components and versioned token sets'
                                        },
                                        {
                                            title: 'UX research & testing',
                                            desc: 'Hypothesis-driven testing that de-risks features'
                                        },
                                        {
                                            title: 'Performance & accessibility',
                                            desc: 'CWV-first builds and WCAG-compliant interfaces'
                                        },
                                    ].map((f, i) => (
                                        <FxReveal key={f.title} delay={0.18 + i * 0.05}>
                                            <div
                                                className={`flex gap-4 items-start p-4 rounded-xl ${isDayTime ? 'bg-slate-50' : 'bg-white/5'} border ${isDayTime ? 'border-slate-100' : 'border-white/6'}`}>
                                                <div
                                                    className="flex-none w-10 h-10 rounded-md flex items-center justify-center bg-gradient-to-br from-sky-400 to-cyan-400 text-white font-bold">{i + 1}</div>
                                                <div>
                                                    <div className="font-semibold">{f.title}</div>
                                                    <div className="text-sm text-slate-500">{f.desc}</div>
                                                </div>
                                            </div>
                                        </FxReveal>
                                    ))}
                                </div>

                                {/* KPI tiles with motion */}
                                <div className="grid grid-cols-2 gap-3 mb-6">
                                    {[
                                        {k: 'Prototype time', v: '3–5w'},
                                        {k: 'Accessibility', v: 'WCAG AA+'},
                                        {k: 'Conversion uplift', v: '+25%'},
                                        {k: 'Design ops', v: 'Ready'}
                                    ].map((kpi, idx) => (
                                        <motion.div key={kpi.k} whileHover={{scale: 1.03}} initial={{opacity: 0, y: 8}}
                                                    whileInView={{opacity: 1, y: 0}} viewport={{once: true}}
                                                    transition={{delay: 0.22 + idx * 0.05}}
                                                    className={`p-4 rounded-xl flex flex-col ${isDayTime ? 'bg-white/95' : 'bg-white/6'} border ${isDayTime ? 'border-slate-100' : 'border-white/8'}`}>
                                            <span className="text-sm text-slate-500">{kpi.k}</span>
                                            <span className="text-2xl font-extrabold gx-gradient-text">{kpi.v}</span>
                                        </motion.div>
                                    ))}
                                </div>

                                <FxReveal delay={0.32}>
                                    <div className="flex gap-3 items-center">
                                        <motion.div whileHover={{scale: 1.04}}>
                                            <FxButton day={!isDayTime} href="/contact" variant="solid">Start a Project
                                                →</FxButton>
                                        </motion.div>
                                        <motion.div whileHover={{scale: 1.02}}>
                                            <FxButton day={!isDayTime} href="/portfolio" variant="ghost">See
                                                Work</FxButton>
                                        </motion.div>
                                    </div>
                                </FxReveal>

                                <FxReveal delay={0.4}>
                                    <p className={`mt-4 text-sm ${isDayTime ? 'text-slate-600' : 'text-white/60'}`}>
                                        Deliverables: design system, component library, accessibility report,
                                        performance baseline, interactive prototypes and handoff documentation.
                                    </p>
                                </FxReveal>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {/* Who is involved — Modern, collaborative teams */}
            <section id={'involved'}
                     className={`relative lg:pt-28 pt-12 lg:pb-28 pb-12 px-4 sm:px-6 lg:px-[4.6em] w-full max-w-full ${isDayTime ? 'text-slate-900' : 'text-white'}`}>
                <div className="relative max-w-[96em] mx-auto">
                    <div className="flex items-center gap-4 mb-8">
                        <span
                            className={`inline-block w-1.5 h-1.5 rounded-full ${isDayTime ? 'bg-gradient-to-br from-sky-400 to-cyan-400' : 'bg-gradient-to-br from-teal-400 to-blue-500'}`}></span>
                        <h6 className={`uppercase tracking-widest text-xs font-semibold ${isDayTime ? 'text-slate-500' : 'text-slate-300'}`}>Our
                            Team</h6>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-10 items-start">
                        {/* Left: Narrative + Roles */}
                        <div className="space-y-6">
                            <h2 className='lg:text-[3em] md:text-[3em] capitalize text-[1.5em] font-[500] tracking-tighter leading-[1.15] lg:pb-6 '>
                                who is involved <br className={'lg:block md:block hidden'}/>in the process
                            </h2>

                            <div
                                className={`p-4 rounded-xl backdrop-blur-sm ${isDayTime ? 'bg-white/80 border border-slate-100/30' : 'bg-black/40 border border-white/12'}`}>
                                <p className='text-[0.92em] font-[400] lg:-mt-[0.2em] md:-mt-[0.2em] text-justify leading-[1.6]'>
                                    Web design is a collaborative process that brings together creative and technical
                                    experts to
                                    build a website that supports your business objectives and speaks to your
                                    audience -regardless of industry. At the core of the team is a project manager who
                                    coordinates timelines, client feedback, and overall direction. UI/UX designers shape
                                    the
                                    look, feel, and usability of the website to ensure a smooth and engaging user
                                    experience
                                    across all devices.
                                </p>

                                <p className='text-[0.92em] font-[400] mt-4 text-justify leading-[1.6]'>
                                    Complementing this are front-end and back-end developers who turn design concepts
                                    into a
                                    fully functional website, optimizing performance, responsiveness, and integration
                                    with other
                                    systems. Depending on the project, content creators, SEO specialists, and quality
                                    assurance
                                    testers may also be involved to ensure the website communicates clearly, ranks well,
                                    and
                                    runs smoothly. The entire process is guided by your input, ensuring the final
                                    product is
                                    aligned with your brand, goals, and customer needs.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    {
                                        role: 'Product Lead',
                                        desc: 'Defines success metrics, prioritises roadmap, aligns stakeholders'
                                    },
                                    {
                                        role: 'Project Manager',
                                        desc: 'Coordinates delivery, feedback loops, and timelines'
                                    },
                                    {
                                        role: 'UX & UI Designers',
                                        desc: 'Research-led interfaces, accessibility, and motion'
                                    },
                                    {role: 'Frontend Engineers', desc: 'Component-driven implementation & performance'},
                                ].map((r, i) => (
                                    <FxReveal key={r.role} delay={0.08 + i * 0.04}>
                                        <div
                                            className={`p-4 rounded-lg border ${isDayTime ? 'bg-white/95 border-slate-100' : 'bg-white/5 border-white/8'}`}>
                                            <div className="flex items-start gap-4">
                                                <div
                                                    className="flex-none w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br from-sky-400 to-cyan-400 text-white font-bold text-lg">{i + 1}</div>
                                                <div>
                                                    <div className="font-semibold text-sm">{r.role}</div>
                                                    <div className="text-sm text-slate-500">{r.desc}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </FxReveal>
                                ))}
                            </div>

                            <div className="mt-4">
                                <FxReveal delay={0.26}>
                                    <FxButton day={!isDayTime} href="/contact" variant="solid">Work with our team
                                        →</FxButton>
                                </FxReveal>
                            </div>
                        </div>

                        <div
                            className="relative flex flex-row lg:-ml-[2em] md:-ml-[2em] w-full h-auto max-w-full mx-auto gap-6">
                            {/* Left image - larger */}
                            <div className="flex-1 flex lg:-mr-[17.5em] md:-mr-[17.5em] justify-center items-start">
                                <div
                                    className={`relative rounded-2xl overflow-hidden border ${isDayTime ? 'bg-white/95 border-slate-100' : 'bg-white/6 border-white/8'} shadow-xl`}>
                                    {/* Neon rim + ambient orbs */}
                                    <div className="absolute inset-0 pointer-events-none rounded-2xl"
                                         style={{boxShadow: isDayTime ? 'inset 0 0 40px rgba(34,211,238,0.06), 0 20px 60px rgba(59,130,246,0.05)' : 'inset 0 0 80px rgba(6,182,212,0.06), 0 30px 90px rgba(2,6,23,0.6)'}}/>
                                    <div aria-hidden className="absolute inset-0 pointer-events-none">
                                        <div
                                            className="absolute -top-28 -left-20 w-[420px] h-[420px] rounded-full opacity-18"
                                            style={{background: isDayTime ? 'radial-gradient(circle,#7dd3fc 0%, transparent 70%)' : 'radial-gradient(circle,#0891b2 0%, transparent 70%)'}}/>
                                        <div
                                            className="absolute -bottom-20 -right-16 w-[340px] h-[340px] rounded-full opacity-12"
                                            style={{background: isDayTime ? 'radial-gradient(circle,#c7f9ff 0%, transparent 70%)' : 'radial-gradient(circle,#0369a1 0%, transparent 70%)'}}/>
                                    </div>

                                    <Image
                                        src="/assets/hybrid/trip.jpg"
                                        alt="Team at table"
                                        width={1200}
                                        height={800}
                                        className="w-full h-auto object-cover rounded-2xl"
                                    />

                                    <div
                                        className='absolute bottom-4 left-4 px-3 py-2 rounded-full backdrop-blur-md text-sm font-semibold'
                                        style={{background: isDayTime ? 'rgba(255,255,255,0.85)' : 'rgba(8,10,20,0.6)'}}>
                                        Collaborative workshops
                                    </div>
                                </div>
                            </div>

                            {/* Right image - smaller, offset vertically */}
                            <div
                                className="flex-1 flex justify-center lg:pl-[15em] md:pl-[15em] lg:-mr-[4em] items-start pt-12">
                                <div
                                    className={`relative rounded-2xl overflow-hidden border ${isDayTime ? 'bg-white/95 border-slate-100' : 'bg-white/6 border-white/8'} shadow-xl w-full max-w-[320px]`}>
                                    {/* Neon rim */}
                                    <div className="absolute inset-0 pointer-events-none rounded-2xl"
                                         style={{boxShadow: isDayTime ? 'inset 0 0 30px rgba(99,102,241,0.08), 0 15px 50px rgba(99,102,241,0.04)' : 'inset 0 0 60px rgba(99,102,241,0.06), 0 20px 60px rgba(2,6,23,0.5)'}}/>

                                    <Image
                                        src="/assets/hybrid/disc.jpg"
                                        alt="Process diagram"
                                        height={700}
                                        width={320}
                                        className="w-full h-auto object-cover rounded-2xl"
                                    />

                                    <div className="p-4 space-y-3">
                                        <div
                                            className={`px-3 py-2 rounded-lg text-center ${isDayTime ? 'bg-slate-50' : 'bg-white/5'} border ${isDayTime ? 'border-slate-100' : 'border-white/8'}`}>
                                            <div className="text-xs text-slate-500 font-semibold">Avg sprint</div>
                                            <div className="text-xl font-extrabold gx-gradient-text">2 weeks</div>
                                        </div>
                                        <div
                                            className={`px-3 py-2 rounded-lg text-center ${isDayTime ? 'bg-slate-50' : 'bg-white/5'} border ${isDayTime ? 'border-slate-100' : 'border-white/8'}`}>
                                            <div className="text-xs text-slate-500 font-semibold">Design tokens</div>
                                            <div className="text-xl font-extrabold">Versioned</div>
                                        </div>
                                        <div
                                            className={`px-3 py-2 rounded-lg text-center ${isDayTime ? 'bg-slate-50' : 'bg-white/5'} border ${isDayTime ? 'border-slate-100' : 'border-white/8'}`}>
                                            <div className="text-xs text-slate-500 font-semibold">CI/CD</div>
                                            <div className="text-xl font-extrabold">Integrated</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Development Process & Methodology Section - FUTURISTIC, DETAILED */}
            <section className={`relative py-20 lg:py-32 ${isDayTime ? 'bg-white text-black' : 'bg-black text-white'}`}>
                <FxBackground day={isDayTime} aurora grid/>
                <FxOrbit size={520} top="-120px" right="-160px" opacity={0.08} speed={22}/>
                <FxOrbit size={320} bottom="-80px" left="-100px" opacity={0.06} speed={30} reverse/>

                <div className="relative z-10 mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.5em]">
                    {/* Section Header */}
                    <div className="max-w-3xl mb-14">
                        <FxChip day={!isDayTime}>OUR METHODOLOGY</FxChip>
                        <FxReveal>
                            <h2 className="text-[2.6em] lg:text-[4.2em] font-[800] leading-[1.04] tracking-tight mt-4 mb-4">
                                Design & Delivery — <span className="gx-gradient-text">Precision Methodology</span>
                            </h2>
                        </FxReveal>
                        <FxReveal delay={0.06}>
                            <p className={`text-[1em] lg:text-[1.05em] leading-[1.7] font-[300] ${isDayTime ? 'text-gray-600' : 'text-gray-400'}`}>
                                A rigorous, research-first approach combining product thinking, design systems and
                                engineering
                                rigor. Each phase includes measurable outputs, acceptance criteria and handovers to keep
                                delivery
                                predictable, fast and optimised for scale.
                            </p>
                        </FxReveal>
                    </div>

                    {/* Detailed process grid — rich cards */}
                    <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6 lg:gap-8">
                        {[
                            {
                                step: '01',
                                title: 'Discovery & Insight',
                                timeframe: '1–2 weeks',
                                items: ['Stakeholder workshops', 'User interviews & empathy maps', 'Analytics baseline & funnels', 'Competitive benchmarking'],
                                acceptance: 'Opportunity map, Problem statements, Prioritised roadmap'
                            },
                            {
                                step: '02',
                                title: 'Strategy & Architecture',
                                timeframe: '1–3 weeks',
                                items: ['Information architecture', 'Content modelling', 'Conversion funnel design', 'Platform recommendations'],
                                acceptance: 'Sitemap, content matrix, prioritised backlog'
                            },
                            {
                                step: '03',
                                title: 'Design Systems & Prototyping',
                                timeframe: '2–6 weeks',
                                items: ['Design tokens & accessibility', 'Component library', 'High-fidelity interactive prototypes', 'Usability testing'],
                                acceptance: 'Design system repo, validated prototypes, accessibility report'
                            },
                            {
                                step: '04',
                                title: 'Engineering & Launch',
                                timeframe: 'variable',
                                items: ['Component-driven implementation', 'API integration', 'Performance optimisation', 'CI/CD & automated tests'],
                                acceptance: 'Deployed release, monitoring dashboards, runbook'
                            }
                        ].map((c, idx) => (
                            <FxReveal key={c.step} delay={0.06 + idx * 0.06}>
                                <div
                                    className={`relative p-6 rounded-2xl overflow-hidden border transition-all duration-300 hover:scale-[1.015] hover:shadow-2xl ${isDayTime ? 'bg-white/95 text-black border-slate-100' : 'bg-white/6 text-white border-white/8'}`}>

                                    {/* ambient glow */}
                                    <div className="absolute inset-0 pointer-events-none rounded-2xl"
                                         style={{boxShadow: isDayTime ? '0 30px 80px rgba(14,165,233,0.04)' : '0 40px 120px rgba(2,6,23,0.6)'}}/>

                                    <div className="flex items-start justify-between">
                                        <div>
                                            <div className="text-[0.9em] font-mono text-slate-400">{c.step}</div>
                                            <h3 className="mt-3 text-[1.35em] font-[700] leading-[1.05]">{c.title}</h3>
                                            <div
                                                className={`mt-2 text-xs font-semibold ${isDayTime ? 'text-slate-600' : 'text-white/70'}`}>{c.timeframe}</div>
                                        </div>
                                        <div className="hidden lg:flex flex-col items-end gap-2">
                                            <div
                                                className={`px-3 py-1 rounded-full text-xs font-semibold ${isDayTime ? 'bg-slate-50 text-slate-700' : 'bg-white/6 text-white/80'} border ${isDayTime ? 'border-slate-100' : 'border-white/8'}`}>Deliverables
                                            </div>
                                            <div
                                                className={`px-3 py-1 rounded-full text-xs font-semibold ${isDayTime ? 'bg-slate-50 text-slate-700' : 'bg-white/6 text-white/80'} border ${isDayTime ? 'border-slate-100' : 'border-white/8'}`}>KPIs
                                            </div>
                                        </div>
                                    </div>

                                    <p className={`mt-4 text-[0.95em] font-[300] leading-[1.6] ${isDayTime ? 'text-gray-700' : 'text-white/70'}`}>{c.acceptance}</p>

                                    <div className="mt-4 grid gap-2">
                                        {c.items.map((it) => (
                                            <div key={it}
                                                 className={`flex items-center gap-3 text-sm ${isDayTime ? 'text-slate-600' : 'text-white/70'}`}>
                                                <div
                                                    className={`w-2 h-2 rounded-full ${isDayTime ? 'bg-sky-400' : 'bg-teal-300'}`}/>
                                                <div className="truncate">{it}</div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-5 flex items-center justify-between">
                                        <div className="text-[0.85em] font-[500] text-slate-400">Acceptance</div>
                                        <div
                                            className="text-[0.9em] font-extrabold gx-gradient-text">{c.acceptance.split(',')[0]}</div>
                                    </div>

                                    <div
                                        className="absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-10 pointer-events-none"
                                        style={{background: isDayTime ? 'radial-gradient(circle,#7dd3fc,transparent)' : 'radial-gradient(circle,#0891b2,transparent)'}}/>
                                </div>
                            </FxReveal>
                        ))}
                    </div>

                    {/* Horizontal KPI strip */}
                    <FxReveal delay={0.4}>
                        <div
                            className={`mt-10 p-6 rounded-2xl backdrop-blur-md border ${isDayTime ? 'bg-white/5 border-teal-400/20' : 'bg-black/5 border-teal-700/20'}`}>
                            <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
                                {[{val: 'Predictable Sprints', label: '2-week cadence'}, {
                                    val: 'Design System',
                                    label: 'Versioned & Accessible'
                                }, {val: 'Coverage', label: 'Accessibility & WCAG'}, {
                                    val: 'Monitoring',
                                    label: 'Realtime dashboards'
                                }].map((s, i) => (
                                    <div key={i} className="text-center lg:text-left">
                                        <div className="text-[1.6em] font-[800] gx-gradient-text mb-1">{s.val}</div>
                                        <div
                                            className={`text-[0.78em] font-[600] ${isDayTime ? 'text-gray-700' : 'text-white/70'}`}>{s.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </FxReveal>

                    {/* CTA */}
                    <FxReveal delay={0.52}>
                        <div className="mt-8 flex items-center justify-between gap-6">
                            <div>
                                <h4 className={`text-[1.05em] font-[700] ${isDayTime ? 'text-gray-800' : 'text-white/90'}`}>Ready
                                    for predictable product delivery?</h4>
                                <p className={`text-[0.95em] ${isDayTime ? 'text-gray-700' : 'text-white/70'}`}>We pair
                                    design and engineering to ship measurable outcomes. Book a discovery session to
                                    review timeline and risks.</p>
                            </div>
                            <FxButton day={!isDayTime} href="/contact" variant="solid">Book a discovery →</FxButton>
                        </div>
                    </FxReveal>
                </div>
            </section>

            {/* Full-width Hero Image — Futuristic, Detailed */}
            <div id={'nlast-image'}
                 className={`relative w-full h-auto overflow-hidden ${isDayTime ? 'bg-slate-50' : 'bg-slate-950'}`}>
                {/* Grid background */}
                <div className="pointer-events-none absolute inset-0" style={{
                    backgroundImage: `linear-gradient(${isDayTime ? 'rgba(13,148,136,0.05)' : 'rgba(45,212,191,0.04)'} 1px, transparent 1px), linear-gradient(90deg, ${isDayTime ? 'rgba(13,148,136,0.05)' : 'rgba(45,212,191,0.04)'} 1px, transparent 1px)`,
                    backgroundSize: '44px 44px',
                }}/>

                {/* Ambient aurora blobs */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="absolute -top-64 -right-48 w-[800px] h-[800px] rounded-full opacity-15"
                         style={{background: isDayTime ? 'radial-gradient(circle, #7dd3fc 0%, transparent 70%)' : 'radial-gradient(circle, #0891b2 0%, transparent 70%)'}}/>
                    <div className="absolute -bottom-48 -left-32 w-[600px] h-[600px] rounded-full opacity-10"
                         style={{background: isDayTime ? 'radial-gradient(circle, #c7f9ff 0%, transparent 70%)' : 'radial-gradient(circle, #0369a1 0%, transparent 70%)'}}/>
                </div>

                {/* Main image with decorative frame */}
                <div className="relative z-10 px-6 sm:px-8 lg:px-[4.6em] py-8 lg:py-12">
                    <div className="relative group">
                        {/* Neon rim + glow */}
                        <div
                            className="absolute -inset-2 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            style={{background: isDayTime ? 'linear-gradient(135deg, rgba(14,165,233,0.4), rgba(99,102,241,0.2))' : 'linear-gradient(135deg, rgba(6,182,212,0.3), rgba(2,6,23,0.8))'}}/>

                        <div className="absolute inset-0 rounded-2xl pointer-events-none"
                             style={{boxShadow: isDayTime ? '0 30px 120px rgba(14,165,233,0.08), inset 0 0 60px rgba(14,165,233,0.04)' : '0 50px 180px rgba(6,182,212,0.15), inset 0 0 80px rgba(6,182,212,0.06)'}}/>

                        {/* Corner accents */}
                        <div
                            className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-teal-400 rounded-tl-lg z-10 opacity-60"/>
                        <div
                            className="absolute -top-3 -right-3 w-8 h-8 border-t-2 border-r-2 border-teal-400 rounded-tr-lg z-10 opacity-60"/>
                        <div
                            className="absolute -bottom-3 -left-3 w-8 h-8 border-b-2 border-l-2 border-teal-400 rounded-bl-lg z-10 opacity-60"/>
                        <div
                            className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-teal-400 rounded-br-lg z-10 opacity-60"/>

                        {/* Image container */}
                        <div className="relative overflow-hidden rounded-2xl">
                            <Image
                                src={'/assets/wd/nlast.jpg'}
                                alt={'Design Excellence Showcase'}
                                width={1536}
                                height={900}
                                priority
                                className="w-full h-auto object-cover"
                            />

                            {/* Overlay gradient — subtle vignette */}
                            <div className="absolute inset-0 pointer-events-none"
                                 style={{background: isDayTime ? 'linear-gradient(135deg, rgba(14,165,233,0.08) 0%, transparent 60%)' : 'linear-gradient(135deg, rgba(45,212,191,0.12) 0%, transparent 60%)'}}/>

                            {/* Scanline effect */}
                            <div className="absolute inset-0 pointer-events-none"
                                 style={{backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(45,212,191,0.02) 3px, rgba(45,212,191,0.02) 4px)'}}/>

                            {/* Floating detail badge */}
                            <motion.div initial={{opacity: 0, y: 20}} whileInView={{opacity: 1, y: 0}}
                                        viewport={{once: true}} transition={{delay: 0.3, duration: 0.6}}
                                        className="absolute bottom-6 left-6 px-5 py-3 rounded-full backdrop-blur-xl text-[0.8em] font-semibold tracking-wider text-teal-300"
                                        style={{
                                            background: isDayTime ? 'rgba(255,255,255,0.85)' : 'rgba(8,10,20,0.7)',
                                            border: '1px solid rgba(45,212,191,0.4)'
                                        }}>
                                ✦ Research-led Design · Performance-Optimized · Conversion-Focused
                            </motion.div>

                            {/* Floating stats card */}
                            <motion.div initial={{opacity: 0, x: -20}} whileInView={{opacity: 1, x: 0}}
                                        viewport={{once: true}}
                                        transition={{delay: 0.4, duration: 0.6, type: 'spring', stiffness: 100}}
                                        className="absolute top-6 right-6 hidden lg:block rounded-2xl px-6 py-4 backdrop-blur-xl"
                                        style={{
                                            background: isDayTime ? 'rgba(255,255,255,0.8)' : 'rgba(15,15,15,0.8)',
                                            border: '1px solid rgba(45,212,191,0.3)'
                                        }}>
                                <div className="text-right">
                                    <div
                                        className={`text-xs font-semibold tracking-widest ${isDayTime ? 'text-slate-500' : 'text-white/70'}`}>DELIVERED
                                    </div>
                                    <div className="text-[1.8em] font-extrabold gx-gradient-text leading-none">500+
                                    </div>
                                    <div
                                        className={`text-[0.75em] font-[500] mt-1 ${isDayTime ? 'text-slate-600' : 'text-white/60'}`}>Web
                                        projects worldwide
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Bottom accent bar */}
                <div className="relative z-5 h-1 bg-gradient-to-r from-transparent via-teal-400/40 to-transparent"/>
            </div>

            {/* Futuristic Capabilities Section — Hero Pattern */}
            <section id="capabilities" className="relative overflow-hidden lg:w-full lg:min-h-[90vh] lg:h-auto w-full h-auto py-20">
                {/* Video Background (desktop) and Image fallback (mobile) */}
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="hidden lg:block absolute inset-0 w-full h-full object-cover"
                    poster="/assets/wd/capabilities-hero.jpg"
                >
                    <source src="/assets/wd/capabilities-hero.mp4" type="video/mp4"/>
                </video>

                <Image
                    src="/assets/wd/capabilities-hero.jpg"
                    alt="Capabilities Hero"
                    fill
                    priority
                    className="lg:hidden object-cover absolute inset-0"
                />

                {/* Grid & FX Background */}
                <div className="pointer-events-none absolute inset-0 z-[1]">
                    <FxBackground day={false} grid={true} aurora={true}/>
                </div>

                {/* Gradient Overlay with Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/50 z-[2]"/>
                <div
                    className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(45,212,191,0.12),transparent_50%)] z-[2]"/>

                {/* Futuristic FX Elements */}
                <div className="pointer-events-none absolute inset-0 z-[3]">
                    <div className="gx-scanline"/>
                    <div className="gx-noise-overlay"/>
                    <div className="gx-orbit absolute"
                         style={{width: '60vmax', height: '60vmax', top: '-20vmax', right: '-20vmax', opacity: .12}}/>
                </div>

                {/* Content Container */}
                <div className="relative z-[11]">
                    <ServiceCapabilities
                        heading="Web Design Capabilities & Expertise"
                        subheading="Full-Stack Expertise"
                        accentColor="#00f5d4"
                        variant="terminal"
                        ctaHref="/contact"
                        ctaLabel="Explore your solution"
                        capabilities={[
                            {
                                id: 'ux-design',
                                title: 'Human-Centered UX Design',
                                description: 'User-first methodology combining research, behavioral psychology and design systems. Every interface decision is validated through user testing, accessibility audits and conversion optimization.',
                                points: [
                                    'User research & personas',
                                    'Wireframing & interactive prototypes',
                                    'Usability testing (SUS scores)',
                                    'WCAG 2.1 AA compliance',
                                    'Design system documentation',
                                    'Design-to-dev handoff specs'
                                ],
                            },
                            {
                                id: 'web-dev',
                                title: 'Production-Grade Development',
                                description: 'Enterprise-level architecture with modern frameworks. We prioritize performance, scalability and maintainability using component-driven development and automated testing.',
                                points: [
                                    'Next.js / React with TypeScript',
                                    'Sub-1.5s FCP, <2.5s LCP',
                                    'Mobile-first responsive design',
                                    'CDN + edge caching strategy',
                                    'CI/CD automation (GitHub Actions)',
                                    'Automated E2E testing'
                                ],
                            },
                            {
                                id: 'seo-ready',
                                title: 'Technical SEO Foundation',
                                description: 'Built for organic discovery from day one. Semantic HTML, schema markup, performance optimization and strategic content architecture work together to dominate search rankings.',
                                points: [
                                    'Core Web Vitals optimization',
                                    'Structured data (JSON-LD)',
                                    'XML sitemap & robots.txt',
                                    'Mobile-first indexing prep',
                                    'Internal linking strategy',
                                    'Canonical & meta tag setup'
                                ],
                            },
                            {
                                id: 'cms',
                                title: 'Headless CMS Integration',
                                description: 'Decouple content from presentation. Your team manages pages independently with a modern admin interface while developers deploy updates seamlessly through APIs.',
                                points: [
                                    'Contentful / Sanity / Strapi',
                                    'WordPress headless mode',
                                    'Custom admin dashboards',
                                    'Real-time content preview',
                                    'Version control & publishing',
                                    'Multi-language content support'
                                ],
                            },
                            {
                                id: 'ecommerce',
                                title: 'Conversion-Optimized E-Commerce',
                                description: 'Storefronts engineered to sell. Product discovery, checkout flows and post-purchase experience are designed around reducing friction and maximizing revenue per visitor.',
                                points: [
                                    'Shopify Plus / WooCommerce',
                                    'Headless commerce architecture',
                                    'PCI-compliant payment flows',
                                    'Dynamic inventory sync',
                                    'Cart abandonment recovery',
                                    'Revenue analytics dashboard'
                                ],
                            },
                            {
                                id: 'analytics',
                                title: 'Data & Insights Infrastructure',
                                description: 'Every site ships with complete measurement infrastructure. Track user behavior, conversion funnels and revenue impact from day one to fuel continuous optimization.',
                                points: [
                                    'GA4 + custom events setup',
                                    'Hotjar / FullStory integration',
                                    'Conversion funnel tracking',
                                    'Revenue attribution modeling',
                                    'Monthly performance reports',
                                    'Quarterly optimization roadmap'
                                ],
                            },
                        ]}
                    />
                </div>
            </section>
        </div>
    );
};

export default WebDesign;

