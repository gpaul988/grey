'use client';

import React, {useEffect, useRef, useState} from 'react';
import '@/app/globals.css'
import Image from "next/image";
import ResponsiveVideoHero from '@/components/ResponsiveVideoHero';
import ServiceHero from '@/components/futuristic/ServiceHero';
import ServiceCapabilities from '@/components/futuristic/ServiceCapabilities';
import Link from "next/link";
import {useIsDayTime} from '../../components/useIsDayTime';
import {motion} from 'framer-motion';

import FuturisticServiceLayout from '@/components/futuristic/FuturisticServiceLayout';

import {FxBackground, FxChip, FxReveal, FxButton, FxHoloCard, FxStickyScrollSection, FxOrbit} from '@/components/futuristic/fx';

const AndroidDevelopment = () => {
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

    // iOS App Development Solutions hook
    const handleScroll = () => {
        const sections = [
            "NAPA",
            "AW",
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
        <div className={`${isDayTime ? 'bg-white' : 'bg-black'} min-h-screen`}>

            {/* Unified Futuristic Android Development Hero - Background Image/Video with overlay */}
            <section className="relative overflow-hidden lg:w-full lg:min-h-[90vh] lg:h-[720px] w-full h-[600px]">
                {/* Video Background (desktop) and Image fallback (mobile) */}
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="hidden lg:block absolute inset-0 w-full h-full object-cover"
                    poster="/assets/android/hero.jpg"
                >
                    <source src="/assets/android/hero-mobile.mp4" type="video/mp4"/>
                </video>

                <Image
                    src="/assets/android/hero.jpg"
                    alt="Android Development Hero"
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
                                    className="text-teal-400 text-[0.7em] lg:text-[0.82em] uppercase tracking-[0.22em] font-[600]">Android Development</span>
                            </div>

                            <h1 className="text-white text-[2em] lg:text-[4.5em] font-[700] leading-[1.08] tracking-tight mb-6 lg:mb-8">
                                Native Android Apps, <span className="gx-gradient-text">Built for Scale</span>
                            </h1>

                            <p className="text-white/70 text-[0.85em] lg:text-[1.08em] leading-[1.65] mb-8 lg:mb-10 font-[300]">
                                Enterprise-grade Android applications engineered for performance and reach. We leverage
                                Kotlin,
                                Jetpack, and modern architecture patterns to deliver secure, maintainable apps that
                                delight users
                                and maximize engagement on the world's largest mobile platform.
                            </p>

                            <div className="flex flex-wrap gap-2 mb-10 lg:mb-12">
                                {['Kotlin Development', 'Jetpack Compose', 'Material Design', 'Performance Optimized', 'Play Store Ready'].map((badge) => (
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
                                        <span className="relative">Build your app →</span>
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
                                    {label: 'Apps Launched', value: '50+'},
                                    {label: 'Years Experience', value: '8+'},
                                    {label: 'Client Retention', value: '100%'},
                                    {label: 'Avg Rating', value: '4.8★'}
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
                            {label: 'Apps', value: '50+'},
                            {label: 'Experts', value: '8+'},
                            {label: 'Rating', value: '4.8★'}
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
                        <FxChip day={!isBackgroundActive ? !isDayTime : isDayTime}>MOBILE EXCELLENCE</FxChip>
                    </div>

                    <div className="lg:-ml-[19em]">
                        <FxReveal>
                            <h3 className="lg:text-[3.5em] md:text-[3em] text-[2em] font-[700] tracking-tight leading-[1.15] mt-4">
                                Build Scalable, High-Performance <span
                                className="gx-gradient-text">Android Experiences</span>
                            </h3>
                        </FxReveal>

                        <FxReveal delay={0.08}>
                            <div
                                className="grid lg:grid-cols-2 grid-cols-1 gap-6 mt-6 font-[300] text-justify text-[0.95em] md:text-[1.05em] leading-relaxed">
                                <div className="space-y-4">
                                    <p>Android development is not just about coding—it's about architecting robust, scalable solutions that reach billions of users worldwide. Our engineering philosophy combines modern architecture patterns, performance optimization, and user-centric design to deliver apps that engage users and drive measurable business impact.</p>
                                    <p>We employ a rigorous, tech-forward development process: architectural planning, clean code principles, comprehensive testing, and continuous optimization. Every feature, interaction, and performance metric is intentional, designed to maximize user engagement, minimize battery consumption, and ensure seamless cross-device compatibility across the vast Android ecosystem.</p>
                                    <div className="flex flex-wrap gap-3 mt-4">
                                        {['Kotlin Architecture', 'Jetpack Components', 'Performance Tuning', 'Security First'].map((p) => (
                                            <span key={p} className="gx-data-pill">{p}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <p>Whether launching a startup app, scaling enterprise solutions, or expanding to wearables and IoT devices, we deliver production-grade applications optimized for all Android devices, form factors, and use cases. We ensure platform best practices are met—Core App Quality guidelines, Play Store compliance, security audits, and performance benchmarks—because quality directly impacts user retention and app store rankings.</p>
                                    <p>Our end-to-end approach spans requirements analysis, system design, component-driven development, rigorous QA, Play Store deployment, and continuous optimization. We partner collaboratively with your team, providing transparent communication, regular reviews, and technical recommendations—focused on delivering value faster while maintaining long-term maintainability and scalability.</p>
                                </div>
                            </div>
                        </FxReveal>
                    </div>
                </div>
            </section>

            {/* Android Development Services Overview - Enhanced with FxStickyScrollSection */}
            <FxStickyScrollSection
                day={isDayTime}
                heading={<>Android<br/>services overview</>}
                intro="Our Android development services deliver production-grade, scalable native applications engineered for performance and reach. We combine modern architecture patterns (MVVM, Clean Architecture), Kotlin best practices, and rigorous testing to create maintainable, high-performance apps that engage users and drive business growth across the world's largest mobile platform."
                navLabel="Android Services"
                activeId={activeId}
                onNavClickAction={scrollToSection}
                items={[
                    {
                        id: "01",
                        title: "Native Android App Development",
                        target: "NAPA",
                        tags: ["Kotlin Development", "MVVM Architecture", "Material Design"],
                        body: (
                            <div>
                                <p>
                                    Android dominates global mobile with 80%+ market share across billions of devices from Samsung, Google, Motorola, Sony, and LG. Native development with Kotlin and Jetpack unlocks unmatched performance, hardware integration, and user experience consistency. We architect apps using modern patterns (MVVM, Clean Architecture, Dependency Injection) ensuring scalability, testability, and maintainability from day one.
                                </p>
                                <p className="mt-3">
                                    Our development process spans requirements analysis, architecture design, component-driven implementation, comprehensive testing (unit, integration, UI), and rigorous QA across device variations. Deliverables include production-ready APK releases, Google Play Store optimization, crash reporting integration (Firebase), and performance profiling. We specialize in gaming, retail, finance, logistics, and healthcare verticals. Typical projects run 12–24 weeks for feature-complete MVPs. Performance targets include &lt;5s cold start, jank-free 60fps animations, memory optimization (&lt;100MB baseline), and Play Store compliance with Vitals criteria. Post-launch, we provide ongoing optimization, A/B testing support, and version maintenance to ensure sustained user engagement and retention.
                                </p>
                            </div>
                        ),
                    },
                    {
                        id: "02",
                        title: "Jetpack Compose & Modern UI Framework",
                        target: "JCUI",
                        tags: ["Compose UI", "Reactive Programming", "Modern Tooling"],
                        body: (
                            <div>
                                <p>
                                    Jetpack Compose revolutionizes Android UI development with declarative, reactive patterns that reduce boilerplate and accelerate iteration. We leverage Compose to build pixel-perfect, performant interfaces with built-in Material Design 3 theming, gesture handling, and animation capabilities. Compose's composition-based architecture simplifies state management, testing, and preview workflows—meaning faster design-to-development cycles and fewer runtime bugs.
                                </p>
                                <p className="mt-3">
                                    Our Compose expertise spans custom composables, animation libraries, accessibility (screen readers, color contrast), theme management, and integration with ViewModels and Flows for reactive data binding. We architect composable hierarchies that prioritize reusability, testability, and performance. Deliverables include composable component libraries, Compose preview catalogs, Material Design token systems, and comprehensive documentation for teams. Typical adoption projects run 6–12 weeks and yield 40%+ reduction in UI code, accelerated feature delivery, and improved developer satisfaction. We combine Compose with modern testing frameworks (Junit5, Espresso) and CI/CD pipelines to ensure quality at release.
                                </p>
                            </div>
                        ),
                    },
                    {
                        id: "03",
                        title: "Cross-Platform Development & Kotlin Multiplatform",
                        target: "CPKM",
                        tags: ["Kotlin Multiplatform", "Code Sharing", "iOS Interop"],
                        body: (
                            <div>
                                <p>
                                    Building for both Android and iOS demands code reuse without compromise. Kotlin Multiplatform Mobile (KMM) enables shared business logic—networking, data persistence, encryption, analytics—across Android and iOS, eliminating duplication while maintaining native UI and performance. We architect KMM projects with clear separation: shared core (business rules, API clients, database) and platform-specific layers (UI, device APIs, OS-specific features).
                                </p>
                                <p className="mt-3">
                                    Our KMM implementations reduce time-to-market by 30–40%, minimize platform-specific bugs, and ensure consistency across apps. We design for future evolution, using dependency injection and abstraction layers that accommodate changing requirements. Deliverables include shared Kotlin/Native libraries (compiled to iOS frameworks), Gradle build configurations, CI/CD setup for cross-platform testing, and documentation for Android and iOS teams. Typical projects run 16–32 weeks for full-featured dual-platform apps. We provide ongoing support for platform updates, dependency management, and performance optimization across both ecosystems, enabling your team to ship updates with velocity and confidence.
                                </p>
                            </div>
                        ),
                    },
                    {
                        id: "04",
                        title: "Testing, QA & Performance Optimization",
                        target: "TQAP",
                        tags: ["Automated Testing", "Performance Profiling", "Crash Analytics"],
                        body: (
                            <div>
                                <p>
                                    Quality and performance are non-negotiable. We implement comprehensive testing strategies spanning unit tests (JUnit), integration tests (Espresso, Compose testing), performance benchmarks, and accessibility validation (Accessibility Scanner). Our testing pyramid ensures rapid feedback on regressions, enabling confident refactoring and feature delivery. We integrate continuous testing into CI/CD pipelines (GitHub Actions, GitLab CI) to catch issues before they reach users.
                                </p>
                                <p className="mt-3">
                                    Performance optimization begins at architecture—we profile memory usage, CPU utilization, and battery drain using Android Studio Profiler, track ANRs and crashes via Firebase Crashlytics, and benchmark against device capability matrices. Deliverables include performance audit reports, optimization recommendations, automated testing suites (80%+ coverage), and monitoring dashboards for production metrics. We establish baselines (cold start time, APK size, memory footprint) and set measurable targets. Typical projects run 4–8 weeks for comprehensive QA sprints. Our commitment: apps that launch fast, run smooth, consume minimal battery, and crash virtually never—ensuring user satisfaction and high App Store ratings.
                                </p>
                            </div>
                        ),
                    },
                    {
                        id: "05",
                        title: "Wearables & IoT Integration",
                        target: "WIE",
                        tags: ["Wear OS", "IoT Connectivity", "Edge Computing"],
                        body: (
                            <div>
                                <p>
                                    Android extends beyond smartphones—Wear OS powers smartwatches with advanced sensors (heart rate, GPS, temperature), while Android IoT enables embedded devices for connected home, industrial automation, and logistics. We architect apps that leverage wearable capabilities: fitness tracking with biometric sensors, real-time location services, offline-first synchronization, and seamless phone-watch communication via WearOS Data API.
                                </p>
                                <p className="mt-3">
                                    Our wearable expertise includes custom watch faces, complication development, health data integration with Google Fit, and battery optimization for constrained devices. We combine Wear OS with companion phone apps for rich experiences—data capture on-wrist, deeper analysis and sharing on phone. Deliverables include full-featured wearable apps, companion Android phone apps, integration documentation, and performance profiles for various watch hardware. Typical wearable projects run 8–16 weeks and open new user engagement opportunities: real-time notifications, quick actions, always-on fitness tracking. We're pioneering next-generation experiences in personal health, workplace logistics, and consumer IoT—positioning your brand at the cutting edge of mobile innovation.
                                </p>
                            </div>
                        ),
                    },
                    {
                        id: "06",
                        title: "App Store Optimization & Growth",
                        target: "ASOG",
                        tags: ["Play Store ASO", "Growth Analytics", "User Retention"],
                        body: (
                            <div>
                                <p>
                                    Launching an app is just the beginning—discovery and retention drive success. App Store Optimization (ASO) spans keyword research, app listing optimization (title, description, screenshots, video), review management, and A/B testing of store assets. We combine data analytics, user feedback, and competitive intelligence to craft compelling store listings that convert browsers into installers. Post-launch, in-app analytics and behavioral cohort analysis reveal what drives engagement, retention, and monetization.
                                </p>
                                <p className="mt-3">
                                    Our growth strategies include push notification campaigns (Firebase Cloud Messaging), in-app onboarding optimization, referral programs, and monetization experiments (ads, in-app purchases, subscriptions). Deliverables include ASO audit and recommendations, analytics instrumentation (Firebase Analytics, Mixpanel), cohort analysis reports, and growth experiment roadmap. Typical ASO engagements run 2–4 weeks; ongoing growth optimization is continuous. We've helped apps achieve 5–10x user acquisition improvements through systematic store listing refinement and user engagement optimization. Our holistic approach—from architecture to distribution—ensures your Android app reaches millions and keeps users engaged long-term.
                                </p>
                            </div>
                        ),
                    },
                ]}
            />

            {/* Full-Width Android Showcase - Premium Futuristic Showcase with KPI Tiles */}
            <div id={'mid image'} className={`relative w-full h-auto overflow-hidden ${isDayTime ? 'bg-slate-50' : 'bg-slate-950'}`}>
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

                {/* Main image with premium decorative frame */}
                <div className="relative z-10 px-6 sm:px-8 lg:px-[4.6em] py-8 lg:py-12">
                    <div className="relative group">
                        {/* Neon rim + glow */}
                        <div className="absolute -inset-2 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                             style={{background: isDayTime ? 'linear-gradient(135deg, rgba(14,165,233,0.4), rgba(99,102,241,0.2))' : 'linear-gradient(135deg, rgba(6,182,212,0.3), rgba(2,6,23,0.8))'}}/>

                        <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{boxShadow: isDayTime ? '0 30px 120px rgba(14,165,233,0.08), inset 0 0 60px rgba(14,165,233,0.04)' : '0 50px 180px rgba(6,182,212,0.15), inset 0 0 80px rgba(6,182,212,0.06)'}}/>

                        {/* Corner accent brackets */}
                        <div className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-teal-400 rounded-tl-lg z-10 opacity-60"/>
                        <div className="absolute -top-3 -right-3 w-8 h-8 border-t-2 border-r-2 border-teal-400 rounded-tr-lg z-10 opacity-60"/>
                        <div className="absolute -bottom-3 -left-3 w-8 h-8 border-b-2 border-l-2 border-teal-400 rounded-bl-lg z-10 opacity-60"/>
                        <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-teal-400 rounded-br-lg z-10 opacity-60"/>

                        {/* Image container */}
                        <div className="relative overflow-hidden rounded-2xl">
                            <Image
                                src={'/assets/android/first.jpg'}
                                alt={'Android Development Excellence - Production-Ready Apps'}
                                width={1536}
                                height={900}
                                priority
                                className="w-full h-auto object-cover"
                            />

                            {/* Overlay gradient — premium vignette */}
                            <div className="absolute inset-0 pointer-events-none"
                                 style={{background: isDayTime ? 'linear-gradient(135deg, rgba(14,165,233,0.08) 0%, transparent 60%)' : 'linear-gradient(135deg, rgba(45,212,191,0.12) 0%, transparent 60%)'}}/>

                            {/* Scanline effect */}
                            <div className="absolute inset-0 pointer-events-none"
                                 style={{backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(45,212,191,0.02) 3px, rgba(45,212,191,0.02) 4px)'}}/>

                            {/* Premium Detail Badge - Bottom Left */}
                            <motion.div 
                                initial={{opacity: 0, y: 20}} 
                                whileInView={{opacity: 1, y: 0}} 
                                viewport={{once: true}} 
                                transition={{delay: 0.3, duration: 0.6}}
                                className="absolute bottom-6 left-6 px-5 py-3 rounded-full backdrop-blur-xl text-[0.8em] font-semibold tracking-wider"
                                style={{
                                    background: isDayTime ? 'rgba(255,255,255,0.85)' : 'rgba(8,10,20,0.7)',
                                    border: '1px solid rgba(45,212,191,0.4)',
                                    color: isDayTime ? '#0d6b7a' : '#5eead4'
                                }}>
                                ✦ Native-First • Kotlin • High Performance
                            </motion.div>

                            {/* KPI Card - Top Right (Performance Metrics) */}
                            <motion.div 
                                initial={{opacity: 0, x: -20}} 
                                whileInView={{opacity: 1, x: 0}} 
                                viewport={{once: true}}
                                transition={{delay: 0.4, duration: 0.6, type: 'spring', stiffness: 100}}
                                className="absolute top-6 right-6 hidden lg:block rounded-2xl px-6 py-4 backdrop-blur-xl space-y-1"
                                style={{background: isDayTime ? 'rgba(255,255,255,0.8)' : 'rgba(15,15,15,0.8)', border: '1px solid rgba(45,212,191,0.3)'}}>
                                <div className={`text-xs font-semibold tracking-widest ${isDayTime ? 'text-slate-500' : 'text-white/70'}`}>BENCHMARK</div>
                                <div className={`text-2xl font-extrabold leading-none`} style={{
                                    background: isDayTime ? 'linear-gradient(135deg, #0891b2, #06b6d4)' : 'linear-gradient(135deg, #06b6d4, #14b8a6)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent'
                                }}>
                                    60 FPS
                                </div>
                                <div className={`text-[0.75em] font-[500] ${isDayTime ? 'text-slate-600' : 'text-white/60'}`}>Jank-free animations</div>
                            </motion.div>

                            {/* Tech Stack Card - Top Left */}
                            <motion.div 
                                initial={{opacity: 0, x: 20}} 
                                whileInView={{opacity: 1, x: 0}} 
                                viewport={{once: true}}
                                transition={{delay: 0.5, duration: 0.6, type: 'spring', stiffness: 100}}
                                className="absolute top-6 left-6 hidden lg:block rounded-2xl px-5 py-3 backdrop-blur-xl space-y-2"
                                style={{background: isDayTime ? 'rgba(255,255,255,0.75)' : 'rgba(15,15,15,0.75)', border: '1px solid rgba(45,212,191,0.3)'}}>
                                <div className={`text-xs font-semibold tracking-widest ${isDayTime ? 'text-slate-500' : 'text-white/70'}`}>ARCHITECTURE</div>
                                <div className={`text-sm font-medium space-y-0.5 ${isDayTime ? 'text-slate-700' : 'text-white/80'}`}>
                                    <div>• Kotlin + Jetpack</div>
                                    <div>• MVVM Pattern</div>
                                    <div>• Material 3 Design</div>
                                </div>
                            </motion.div>

                            {/* KPI Card - Bottom Right (Market Reach) */}
                            <motion.div 
                                initial={{opacity: 0, y: -20}} 
                                whileInView={{opacity: 1, y: 0}} 
                                viewport={{once: true}}
                                transition={{delay: 0.6, duration: 0.6}}
                                className="absolute bottom-6 right-6 hidden lg:block rounded-2xl px-6 py-4 backdrop-blur-xl space-y-1"
                                style={{background: isDayTime ? 'rgba(255,255,255,0.8)' : 'rgba(15,15,15,0.8)', border: '1px solid rgba(45,212,191,0.3)'}}>
                                <div className={`text-xs font-semibold tracking-widest ${isDayTime ? 'text-slate-500' : 'text-white/70'}`}>MARKET REACH</div>
                                <div className={`text-2xl font-extrabold leading-none`} style={{
                                    background: isDayTime ? 'linear-gradient(135deg, #0891b2, #06b6d4)' : 'linear-gradient(135deg, #06b6d4, #14b8a6)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent'
                                }}>
                                    80%+ Global
                                </div>
                                <div className={`text-[0.75em] font-[500] ${isDayTime ? 'text-slate-600' : 'text-white/60'}`}>Android market share</div>
                            </motion.div>

                            {/* Bottom Left QA Card */}
                            <motion.div 
                                initial={{opacity: 0, y: 20}} 
                                whileInView={{opacity: 1, y: 0}} 
                                viewport={{once: true}}
                                transition={{delay: 0.7, duration: 0.6}}
                                className="absolute bottom-6 left-6 hidden md:block lg:hidden rounded-lg px-4 py-2 backdrop-blur-xl text-xs font-semibold"
                                style={{background: isDayTime ? 'rgba(255,255,255,0.75)' : 'rgba(15,15,15,0.75)', border: '1px solid rgba(45,212,191,0.3)', color: isDayTime ? '#0d6b7a' : '#5eead4'}}>
                                Quality-First • Multi-Device
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Bottom accent bar */}
                <div className="relative z-5 h-1 bg-gradient-to-r from-transparent via-teal-400/40 to-transparent" />
            </div>

            {/* Why Android Application? - Premium, Futuristic, Detailed Section */}
            <div className={`relative w-full ${isDayTime ? 'bg-gradient-to-b from-slate-50 to-white' : 'bg-gradient-to-b from-slate-950 to-black'}`}>
                {/* Decorative background elements */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -left-32 w-[500px] h-[500px] rounded-full opacity-8"
                         style={{background: isDayTime ? 'radial-gradient(circle, #06b6d4 0%, transparent 70%)' : 'radial-gradient(circle, #0891b2 0%, transparent 70%)'}}/>
                    <div className="absolute -bottom-32 -right-40 w-[450px] h-[450px] rounded-full opacity-6"
                         style={{background: isDayTime ? 'radial-gradient(circle, #14b8a6 0%, transparent 70%)' : 'radial-gradient(circle, #0d9488 0%, transparent 70%)'}}/>
                </div>

                <div className='relative z-10 lg:py-[4em] py-[2em] lg:px-[4.6em] px-6 max-w-full w-full mx-auto'>
                    <div className='grid lg:grid-cols-2 grid-cols-1 lg:gap-20 gap-12 items-start'>
                        {/* Left Column - Context & Eyebrow */}
                        <motion.div 
                            initial={{opacity: 0, x: -40}}
                            whileInView={{opacity: 1, x: 0}}
                            viewport={{once: true, amount: 0.3}}
                            transition={{duration: 0.6}}
                        >
                            <div className={`uppercase text-xs font-semibold tracking-widest mb-4 ${isDayTime ? 'text-teal-600' : 'text-teal-300'}`}>
                                Market Leadership
                            </div>
                            <h2 className={`text-4xl lg:text-5xl font-bold leading-tight mb-6 ${isDayTime ? 'text-slate-900' : 'text-white'}`}>
                                Why Choose <span style={{
                                    background: isDayTime ? 'linear-gradient(135deg, #0891b2, #06b6d4)' : 'linear-gradient(135deg, #06b6d4, #14b8a6)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent'
                                }}>Android</span>?
                            </h2>
                            <p className={`text-lg font-light leading-relaxed ${isDayTime ? 'text-slate-600' : 'text-slate-300'}`}>
                                Android powers 80% of global smartphones and has evolved into a comprehensive ecosystem spanning phones, tablets, wearables, automotive, and IoT. For businesses scaling globally, Android represents unmatched reach, flexibility, and opportunity.
                            </p>
                        </motion.div>

                        {/* Right Column - Key Statistics Grid */}
                        <motion.div 
                            initial={{opacity: 0, x: 40}}
                            whileInView={{opacity: 1, x: 0}}
                            viewport={{once: true, amount: 0.3}}
                            transition={{duration: 0.6}}
                            className='grid grid-cols-2 gap-4 lg:gap-6'
                        >
                            {[
                                {label: 'Global Market Share', value: '80%+', color: 'from-cyan-400 to-teal-500'},
                                {label: 'Active Devices', value: '3.8B+', color: 'from-teal-400 to-emerald-500'},
                                {label: 'Device Manufacturers', value: '1000+', color: 'from-blue-400 to-cyan-500'},
                                {label: 'Countries Supported', value: '190+', color: 'from-cyan-400 to-blue-500'},
                            ].map((stat, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{opacity: 0, y: 20}}
                                    whileInView={{opacity: 1, y: 0}}
                                    viewport={{once: true}}
                                    transition={{delay: 0.3 + i * 0.1, duration: 0.5}}
                                    className={`p-4 rounded-xl backdrop-blur-xl border transition-all hover:scale-105 ${isDayTime ? 'bg-white/40 border-slate-200/40' : 'bg-slate-900/40 border-slate-700/40'}`}
                                >
                                    <div className={`text-sm font-semibold tracking-wider mb-2 ${isDayTime ? 'text-slate-600' : 'text-slate-400'}`}>
                                        {stat.label}
                                    </div>
                                    <div className={`text-2xl lg:text-3xl font-bold`} style={{
                                        background: `linear-gradient(135deg, ${stat.color})`,
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent'
                                    }}>
                                        {stat.value}
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Detailed Reasons - Three Column Layout */}
                    <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 lg:mt-[5em] mt-[3em]'>
                        {[
                            {
                                icon: '📊',
                                title: 'Unmatched Global Reach',
                                points: [
                                    'Billions of active devices worldwide',
                                    'Access emerging & mature markets simultaneously',
                                    'Lower device cost = broader audience',
                                    'Multi-device strategy (phones, tablets, wearables)',
                                    'Google Play Store: 3.5M+ apps live'
                                ]
                            },
                            {
                                icon: '⚡',
                                title: 'Engineering Excellence',
                                points: [
                                    'Kotlin: modern, expressive, safe language',
                                    'Jetpack: battle-tested framework & libraries',
                                    'MVVM architecture for scalability',
                                    'Compose: declarative, high-performance UI',
                                    'Faster time-to-market vs competitors'
                                ]
                            },
                            {
                                icon: '💰',
                                title: 'Business Economics',
                                points: [
                                    'Lower development costs (open ecosystem)',
                                    'Faster Play Store approval (hours vs days)',
                                    'No vendor lock-in restrictions',
                                    'Flexible monetization (ads, IAP, subscriptions)',
                                    'High ROI across price tiers & markets'
                                ]
                            },
                        ].map((card, idx) => (
                            <motion.div
                                key={idx}
                                initial={{opacity: 0, y: 40}}
                                whileInView={{opacity: 1, y: 0}}
                                viewport={{once: true, amount: 0.2}}
                                transition={{delay: 0.2 + idx * 0.15, duration: 0.6}}
                                className={`relative p-6 rounded-2xl border backdrop-blur-lg transition-all hover:shadow-2xl group ${isDayTime ? 'bg-white/30 border-teal-200/30 hover:bg-white/50' : 'bg-slate-900/30 border-teal-500/20 hover:bg-slate-900/50'}`}
                            >
                                {/* Accent border on hover */}
                                <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity ${isDayTime ? 'bg-gradient-to-br from-teal-100/30' : 'bg-gradient-to-br from-teal-900/20'}`} />
                                
                                <div className='relative z-10'>
                                    <div className='text-4xl mb-3'>{card.icon}</div>
                                    <h3 className={`text-xl font-bold mb-4 ${isDayTime ? 'text-slate-900' : 'text-white'}`}>
                                        {card.title}
                                    </h3>
                                    <ul className={`space-y-2.5 text-sm font-light ${isDayTime ? 'text-slate-700' : 'text-slate-300'}`}>
                                        {card.points.map((point, i) => (
                                            <li key={i} className='flex gap-3 items-start'>
                                                <span className={`flex-shrink-0 w-1.5 h-1.5 rounded-full mt-2 ${isDayTime ? 'bg-teal-500' : 'bg-teal-400'}`} />
                                                <span>{point}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Bottom accent bar */}
                                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity ${isDayTime ? 'from-teal-300 via-cyan-300 to-transparent' : 'from-teal-500 via-cyan-500 to-transparent'}`} />
                            </motion.div>
                        ))}
                    </div>

                    {/* Bottom CTA Section */}
                    <motion.div
                        initial={{opacity: 0, y: 30}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true}}
                        transition={{delay: 0.7, duration: 0.6}}
                        className={`mt-[4em] pt-[2em] border-t ${isDayTime ? 'border-slate-200/50' : 'border-slate-700/50'}`}
                    >
                        <div className='text-center'>
                            <p className={`text-lg font-light mb-6 max-w-2xl mx-auto ${isDayTime ? 'text-slate-600' : 'text-slate-400'}`}>
                                Ready to build a world-class Android application? Our expert team combines Kotlin mastery, Jetpack expertise, and proven architectural patterns to deliver apps that perform, scale, and delight users globally.
                            </p>
                            <FxButton 
                                day={isDayTime}
                                href="/contact" 
                                variant="solid"
                            >
                                Start Your Android Journey →
                            </FxButton>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Benefits of Android Application Development - Premium, Futuristic, Detailed */}
            <div className={`relative w-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>
                {/* Decorative background elements */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="absolute top-20 -left-32 w-[400px] h-[400px] rounded-full opacity-8"
                         style={{background: isDayTime ? 'radial-gradient(circle, #06b6d4 0%, transparent 70%)' : 'radial-gradient(circle, #0891b2 0%, transparent 70%)'}}/>
                    <div className="absolute -bottom-32 -right-40 w-[500px] h-[500px] rounded-full opacity-6"
                         style={{background: isDayTime ? 'radial-gradient(circle, #14b8a6 0%, transparent 70%)' : 'radial-gradient(circle, #0d9488 0%, transparent 70%)'}}/>
                </div>

                <div className='relative z-10 lg:py-[5em] py-[3em] lg:px-[4.6em] px-6 max-w-full w-full mx-auto'>
                    {/* Header Section */}
                    <motion.div
                        initial={{opacity: 0, y: -20}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true, amount: 0.3}}
                        transition={{duration: 0.6}}
                        className='mb-[4em]'
                    >
                        <div className={`uppercase text-xs font-semibold tracking-widest mb-4 ${isDayTime ? 'text-teal-600' : 'text-teal-300'}`}>
                            Platform Advantages
                        </div>
                        <h2 className={`text-4xl lg:text-5xl font-bold leading-tight mb-4 ${isDayTime ? 'text-slate-900' : 'text-white'}`}>
                            Why Android Powers
                            <br/>
                            <span style={{
                                background: isDayTime ? 'linear-gradient(135deg, #0891b2, #06b6d4)' : 'linear-gradient(135deg, #06b6d4, #14b8a6)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}>
                                Global Business Growth
                            </span>
                        </h2>
                        <p className={`text-lg font-light leading-relaxed max-w-3xl ${isDayTime ? 'text-slate-600' : 'text-slate-300'}`}>
                            Android's open ecosystem, technical excellence, and market dominance create unprecedented opportunities for businesses. From startup MVPs to enterprise-scale applications, Android delivers performance, reach, and profitability.
                        </p>
                    </motion.div>

                    {/* Benefits Grid - 3 Columns */}
                    <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 lg:gap-8'>
                        {[
                            {
                                icon: '🌍',
                                title: 'Global Market Reach',
                                subtitle: '80%+ Market Dominance',
                                points: [
                                    'Billions of active devices worldwide',
                                    'Premium to budget device coverage',
                                    'Emerging market penetration (India, Africa, SE Asia)',
                                    'Consistent app experience across manufacturers',
                                    'Google Play: 3.5M+ apps, 2.5M+ daily app updates'
                                ]
                            },
                            {
                                icon: '💰',
                                title: 'Cost-Effective Development',
                                subtitle: 'Open-Source Economics',
                                points: [
                                    'No licensing fees vs competing platforms',
                                    'Extensive open-source libraries reduce dev time',
                                    'Lower infrastructure costs for hosting',
                                    'Kotlin productivity: 30-40% faster development',
                                    'Jetpack components: battle-tested, production-ready'
                                ]
                            },
                            {
                                icon: '⚡',
                                title: 'Rapid Time-to-Market',
                                subtitle: 'Fast Launch, Faster Iteration',
                                points: [
                                    'Google Play: hours-level approval (vs days)',
                                    'Automated testing pipelines accelerate QA',
                                    'Over-the-air updates without app resubmission',
                                    'A/B testing infrastructure built-in',
                                    'Real-time analytics via Google Play Console'
                                ]
                            },
                            {
                                icon: '🎨',
                                title: 'Unlimited Customization',
                                subtitle: 'Design & Functional Freedom',
                                points: [
                                    'Complete UI/UX control without platform restrictions',
                                    'Deep integration with device hardware (sensors, cameras)',
                                    'Custom file systems and data persistence layers',
                                    'Advanced features: AR (ARCore), AI (ML Kit), NFC/Bluetooth',
                                    'Full access to OS-level APIs for enterprise requirements'
                                ]
                            },
                            {
                                icon: '🔗',
                                title: 'Multi-Device Ecosystem',
                                subtitle: 'Phones, Tablets, Wearables & Beyond',
                                points: [
                                    'Smartphones: the primary revenue driver',
                                    'Tablets: larger screens for productivity apps',
                                    'Wear OS: smartwatch integration with Complications API',
                                    'Android TV & Auto: living room & automotive experiences',
                                    'IoT devices: industrial & consumer applications'
                                ]
                            },
                            {
                                icon: '💵',
                                title: 'Strong Monetization Options',
                                subtitle: 'Multiple Revenue Streams',
                                points: [
                                    'Ads: Google Admob with rich targeting & analytics',
                                    'In-App Purchases: subscriptions, one-time purchases',
                                    'Freemium model: low friction user acquisition',
                                    'Google Play Billing: streamlined payment processing',
                                    'Premium distribution: enterprise licensing & B2B sales'
                                ]
                            },
                        ].map((benefit, idx) => (
                            <motion.div
                                key={idx}
                                initial={{opacity: 0, y: 30}}
                                whileInView={{opacity: 1, y: 0}}
                                viewport={{once: true, amount: 0.2}}
                                transition={{delay: 0.1 + idx * 0.08, duration: 0.6}}
                                className={`relative p-6 lg:p-8 rounded-2xl border backdrop-blur-lg transition-all hover:scale-105 group ${isDayTime ? 'bg-gradient-to-br from-slate-50 to-white border-teal-100 hover:border-teal-300 hover:shadow-xl' : 'bg-gradient-to-br from-slate-900/30 to-slate-800/20 border-teal-900/40 hover:border-teal-500/60 hover:shadow-2xl'}`}
                            >
                                {/* Accent gradient on hover */}
                                <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none ${isDayTime ? 'bg-gradient-to-br from-teal-50/50' : 'bg-gradient-to-br from-teal-900/20'}`} />

                                <div className='relative z-10'>
                                    {/* Icon & Header */}
                                    <div className='mb-4'>
                                        <div className='text-4xl mb-3'>{benefit.icon}</div>
                                        <h3 className={`text-xl font-bold mb-1 ${isDayTime ? 'text-slate-900' : 'text-white'}`}>
                                            {benefit.title}
                                        </h3>
                                        <p className={`text-sm font-semibold ${isDayTime ? 'text-teal-600' : 'text-teal-300'}`}>
                                            {benefit.subtitle}
                                        </p>
                                    </div>

                                    {/* Divider */}
                                    <div className={`h-px mb-4 ${isDayTime ? 'bg-gradient-to-r from-teal-200 to-transparent' : 'bg-gradient-to-r from-teal-600 to-transparent'}`} />

                                    {/* Benefit Points */}
                                    <ul className={`space-y-2.5 text-sm font-light ${isDayTime ? 'text-slate-700' : 'text-slate-300'}`}>
                                        {benefit.points.map((point, i) => (
                                            <li key={i} className='flex gap-3 items-start'>
                                                <span className={`flex-shrink-0 w-1 h-1 rounded-full mt-2.5 ${isDayTime ? 'bg-teal-500' : 'bg-teal-400'}`} />
                                                <span className='leading-tight'>{point}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Bottom accent bar */}
                                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity ${isDayTime ? 'from-teal-300 via-cyan-300 to-transparent' : 'from-teal-500 via-cyan-500 to-transparent'}`} />
                            </motion.div>
                        ))}
                    </div>

                    {/* Comparison Callout */}
                    <motion.div
                        initial={{opacity: 0, y: 40}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true}}
                        transition={{delay: 0.8, duration: 0.6}}
                        className={`mt-[4em] p-6 lg:p-8 rounded-2xl border backdrop-blur-lg ${isDayTime ? 'bg-gradient-to-br from-teal-50 to-cyan-50 border-teal-200' : 'bg-gradient-to-br from-teal-900/20 to-cyan-900/10 border-teal-700/40'}`}
                    >
                        <h3 className={`text-2xl font-bold mb-4 ${isDayTime ? 'text-slate-900' : 'text-white'}`}>
                            The Android Advantage: By The Numbers
                        </h3>
                        <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4'>
                            {[
                                {label: 'Play Store Apps', value: '3.5M+', desc: 'Live applications'},
                                {label: 'Daily Active Users', value: '1.4B+', desc: 'Global reach'},
                                {label: 'Market Share', value: '80%', desc: 'Smartphones worldwide'},
                                {label: 'Approval Time', value: '< 24hrs', desc: 'Google Play Store'},
                            ].map((stat, i) => (
                                <div key={i} className={`p-4 rounded-lg ${isDayTime ? 'bg-white/60' : 'bg-slate-800/40'} border ${isDayTime ? 'border-teal-100' : 'border-teal-700/30'}`}>
                                    <div className={`text-sm font-semibold mb-1 ${isDayTime ? 'text-teal-600' : 'text-teal-300'}`}>
                                        {stat.label}
                                    </div>
                                    <div className={`text-2xl font-bold mb-1 ${isDayTime ? 'text-slate-900' : 'text-white'}`}>
                                        {stat.value}
                                    </div>
                                    <div className={`text-xs ${isDayTime ? 'text-slate-600' : 'text-slate-400'}`}>
                                        {stat.desc}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Who is involved — Modern, collaborative Android teams (matched to Web-Design style) */}
            <section id={'involved'} className={`relative lg:pt-28 pt-12 lg:pb-28 pb-12 px-4 sm:px-6 lg:px-[4.6em] w-full max-w-full ${isDayTime ? 'text-slate-900' : 'text-white'}`}>
                <div className="relative max-w-[96em] mx-auto">
                    <div className="flex items-center gap-4 mb-8">
                        <span className={`inline-block w-1.5 h-1.5 rounded-full ${isDayTime ? 'bg-gradient-to-br from-sky-400 to-cyan-400' : 'bg-gradient-to-br from-teal-400 to-blue-500'}`}></span>
                        <h6 className={`uppercase tracking-widest text-xs font-semibold ${isDayTime ? 'text-slate-500' : 'text-slate-300'}`}>Our Team</h6>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-10 items-start">
                        {/* Left: Narrative + Roles */}
                        <div className="space-y-6">
                            <h2 className='lg:text-[3em] md:text-[3em] capitalize text-[1.5em] font-[500] tracking-tighter leading-[1.15] lg:pb-6 '>
                                who is involved <br className={'lg:block md:block hidden'}/>in the process
                            </h2>

                            <div className={`p-4 rounded-xl backdrop-blur-sm ${isDayTime ? 'bg-white/80 border border-slate-100/30' : 'bg-black/40 border border-white/12'}`}>
                                <p className='text-[0.92em] font-[400] lg:-mt-[0.2em] md:-mt-[0.2em] text-justify leading-[1.6]'>
                                    Android projects at Grey InfoTech are delivered by cross-functional teams blending product strategy, design thinking and engineering excellence. Each engagement is owner-led and outcome-focused — from discovery workshops through to sustainable operations. Communication is transparent, iteration is theory-driven, and every milestone ties back to measurable KPIs.
                                </p>

                                <p className='text-[0.92em] font-[400] mt-4 text-justify leading-[1.6]'>
                                    We follow a collaborative cadence: discovery, rapid prototyping, iterative sprints, and staged releases. Design, engineering and QA work in parallel to reduce handoff friction; product and analytics steer prioritisation while DevOps automates safe, repeatable delivery. Your stakeholders are embedded in demos and decision gates, ensuring the app meets business and user outcomes.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    {role: 'Product Lead', desc: 'Defines success metrics, prioritises roadmap, aligns stakeholders'},
                                    {role: 'Project Manager', desc: 'Coordinates delivery, mitigates risk, maintains timeline'},
                                    {role: 'Android Engineers', desc: 'Kotlin expertise, architecture, platform integrations'},
                                    {role: 'UX & UI Designers', desc: 'Research-led interfaces, accessibility, motion design'},
                                    {role: 'QA Engineers', desc: 'Automated & manual testing, device matrix coverage'},
                                    {role: 'DevOps & Release', desc: 'CI/CD, Play Store pipelines, crash reporting & monitoring'}
                                ].map((r, i) => (
                                    <FxReveal key={r.role} delay={0.08 + i * 0.04}>
                                        <div className={`p-4 rounded-lg border ${isDayTime ? 'bg-white/95 border-slate-100' : 'bg-white/5 border-white/8'}`}>
                                            <div className="flex items-start gap-4">
                                                <div className="flex-none w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br from-sky-400 to-cyan-400 text-white font-bold text-lg">{i + 1}</div>
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
                                    <FxButton day={!isDayTime} href="/contact" variant="solid">Work with our team →</FxButton>
                                </FxReveal>
                            </div>
                        </div>

                        {/* Right: Image gallery - modern, layered */}
                        <div className="relative flex flex-row w-full h-auto max-w-full mx-auto gap-6 items-start">
                            <div className="flex-1 flex justify-center items-start">
                                <div className={`relative rounded-2xl overflow-hidden border ${isDayTime ? 'bg-white/95 border-slate-100' : 'bg-white/6 border-white/8'} shadow-xl`}>
                                    {/* Neon rim + ambient orbs */}
                                    <div className="absolute inset-0 pointer-events-none rounded-2xl" style={{boxShadow: isDayTime ? 'inset 0 0 40px rgba(34,211,238,0.06), 0 20px 60px rgba(59,130,246,0.05)' : 'inset 0 0 80px rgba(6,182,212,0.06), 0 30px 90px rgba(2,6,23,0.6)'}}/>
                                    <div aria-hidden className="absolute inset-0 pointer-events-none">
                                        <div className="absolute -top-28 -left-20 w-[420px] h-[420px] rounded-full opacity-18" style={{background: isDayTime ? 'radial-gradient(circle,#7dd3fc 0%, transparent 70%)' : 'radial-gradient(circle,#0891b2 0%, transparent 70%)'}}/>
                                        <div className="absolute -bottom-20 -right-16 w-[340px] h-[340px] rounded-full opacity-12" style={{background: isDayTime ? 'radial-gradient(circle,#c7f9ff 0%, transparent 70%)' : 'radial-gradient(circle,#0369a1 0%, transparent 70%)'}}/>
                                    </div>

                                    <Image
                                        src="/assets/hybrid/trip.jpg"
                                        alt="Team at table"
                                        width={1200}
                                        height={800}
                                        className="w-full h-auto object-cover rounded-2xl"
                                    />

                                    <div className='absolute bottom-4 left-4 px-3 py-2 rounded-full backdrop-blur-md text-sm font-semibold' style={{background: isDayTime ? 'rgba(255,255,255,0.85)' : 'rgba(8,10,20,0.6)'}}>
                                        Collaborative workshops
                                    </div>
                                </div>
                            </div>

                            <div className="flex-1 flex justify-center items-start pt-12 lg:pt-0">
                                <div className={`relative rounded-2xl overflow-hidden border ${isDayTime ? 'bg-white/95 border-slate-100' : 'bg-white/6 border-white/8'} shadow-xl w-full max-w-[320px]`}>
                                    <div className="absolute inset-0 pointer-events-none rounded-2xl" style={{boxShadow: isDayTime ? 'inset 0 0 30px rgba(99,102,241,0.08), 0 15px 50px rgba(99,102,241,0.04)' : 'inset 0 0 60px rgba(99,102,241,0.06), 0 20px 60px rgba(2,6,23,0.5)'}}/>

                                    <Image
                                        src="/assets/hybrid/disc.jpg"
                                        alt="Team discussion"
                                        width={320}
                                        height={520}
                                        className="w-full h-auto object-cover rounded-2xl"
                                    />

                                    <div className='absolute top-4 right-4 px-3 py-1 rounded-full backdrop-blur-md text-xs font-semibold' style={{background: isDayTime ? 'rgba(255,255,255,0.85)' : 'rgba(8,10,20,0.6)'}}>
                                        Cross-functional teams
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AndroidDevelopment;


