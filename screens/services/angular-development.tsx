'use client';

import React, {useEffect, useRef, useState} from 'react';
import '@/app/globals.css'
import Image from "next/image";
import Link from "next/link";
import {AiFillCaretDown, AiFillCaretUp} from "react-icons/ai";
import {motion} from "framer-motion";
import {useIsDayTime} from '../../components/useIsDayTime';

import {FxBackground, FxCard, FxChip, FxReveal, FxStickyScrollSection, FxOrbit} from '@/components/futuristic/fx';

const AngularDevelopment = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isBackgroundActive, setIsBackgroundActive] = useState(false);
    const [activeId, setActiveId] = useState<string>("");

    // isDaytime react hook
    const isDayTime = useIsDayTime();

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
            "EPS",
            "SPAS",
            "WA",
            "UID",
            "AMAD",
            "PWAS",
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

    // What Powers Our Angular Development
    const [webIndex, setWebIndex] = useState<number | null>(null);

    const toggleWeb = (index: number) => {
        setWebIndex(webIndex === index ? null : index);
    }

    const capabilityCards = [
        {
            title: 'Platforms & Frameworks',
            eyebrow: 'Core stack',
            summary: 'A resilient foundation for enterprise Angular platforms that scale from product MVPs to global operations.',
            body: 'We pair Angular with Node.js, Express, and Ionic to create secure, future-ready applications that span web, mobile, and internal tooling. The result is a platform that feels cohesive across teams while staying performant under business growth.',
            metrics: ['Node.js', 'Express', 'Ionic'],
            points: ['Cross-platform delivery', 'Secure architecture', 'Performance-first engineering'],
            details: ['Architected for modularity and long-term maintainability', 'Supports both customer-facing products and internal systems', 'Preserves consistency across distributed teams'],
            highlights: [{label: 'Architecture', value: 'Modular by design'}, {label: 'Scale', value: 'Enterprise-ready'}, {label: 'Outcome', value: 'Fast to evolve'}]
        },
        {
            title: 'DevOps & Cloud',
            eyebrow: 'Release confidence',
            summary: 'Automation, observability, and cloud-native delivery keep every release stable, measurable, and low-risk.',
            body: 'We introduce CI/CD pipelines, containerisation, and cloud-native deployment patterns that shorten delivery cycles while preserving operational resilience. From infrastructure planning to real-time monitoring, every release is designed to be predictable and auditable.',
            metrics: ['CI/CD', 'Docker', 'AWS / Azure / GCP'],
            points: ['Automated scaling', 'Observability', 'Reliable deployment'],
            details: ['Enables rapid, low-risk releases across complex environments', 'Improves uptime, traceability, and rollback readiness', 'Optimises infrastructure spend without sacrificing resilience'],
            highlights: [{label: 'Delivery', value: 'Release automation'}, {label: 'Reliability', value: '24/7 observability'}, {label: 'Impact', value: 'Lower operational risk'}]
        },
        {
            title: 'Libraries, Components & APIs',
            eyebrow: 'Product experience',
            summary: 'Elegant interfaces and composable integrations keep the experience polished and the architecture adaptable.',
            body: 'Angular Material, PrimeNG, and custom UI systems let us build refined experiences quickly without sacrificing quality. We also connect core services such as payments, analytics, and identity with secure API patterns that preserve long-term maintainability.',
            metrics: ['Angular Material', 'PrimeNG', 'Third-party APIs'],
            points: ['Polished UI systems', 'Enterprise-grade APIs', 'Future-ready integrations'],
            details: ['Bridges design quality with engineering discipline', 'Creates reusable patterns for rapid feature rollout', 'Keeps integrations secure, predictable, and scalable'],
            highlights: [{label: 'UX', value: 'Premium interaction design'}, {label: 'Reuse', value: 'Composable patterns'}, {label: 'Integration', value: 'Secure service layers'}]
        },
        {
            title: 'Integrated Development Environments',
            eyebrow: 'Delivery workflow',
            summary: 'A disciplined engineering environment helps the team ship clearer, faster, and with stronger collaboration.',
            body: 'We work within modern IDEs, Git-based collaboration, and automated validation workflows so that code quality remains high from day one. That removes friction across distributed teams and keeps the development lifecycle transparent and controlled.',
            metrics: ['VS Code', 'WebStorm', 'GitHub / Bitbucket'],
            points: ['Version control', 'Structured collaboration', 'Accelerated iteration'],
            details: ['Creates sequence and accountability across product squads', 'Improves issue visibility from planning through release', 'Keeps teams aligned with shared engineering standards'],
            highlights: [{label: 'Process', value: 'Structured delivery'}, {label: 'Visibility', value: 'Clear traceability'}, {label: 'Speed', value: 'Faster iteration'}]
        },
        {
            title: 'Databases, Testing & QA',
            eyebrow: 'Operational integrity',
            summary: 'Strong data design, quality assurance, and observability protect the product long after launch.',
            body: 'We design resilient data layers with MySQL, PostgreSQL, or MongoDB and back them with automated testing and monitoring frameworks. Every release is validated for performance, reliability, and business impact before it reaches production.',
            metrics: ['MySQL / Postgres / MongoDB', 'Karma / Jasmine', 'Prometheus / New Relic'],
            points: ['Data resilience', 'Automated QA', 'Real-time monitoring'],
            details: ['Protects application quality from early development through release', 'Improves confidence during growth, migrations, and change windows', 'Provides a stronger base for product stability and regulatory readiness'],
            highlights: [{label: 'Data', value: 'Resilient architecture'}, {label: 'Quality', value: 'Automated validation'}, {label: 'Assurance', value: 'Operational confidence'}]
        },
        {
            title: 'Community & Ecosystem',
            eyebrow: 'Strategic leverage',
            summary: 'A broad ecosystem and active support network help us solve complex challenges with confidence.',
            body: 'Angular benefits from strong official documentation, a global developer community, and continuous platform upgrades. We use that ecosystem to accelerate implementation, reduce risk, and keep every solution aligned with modern standards.',
            metrics: ['Official docs', 'Community forums', 'Google-backed evolution'],
            points: ['Accelerated learning', 'Shared best practices', 'Long-term product stability'],
            details: ['Turns the ecosystem into a strategic advantage rather than a passive dependency', 'Speeds up problem solving and reduces vendor lock-in risk', 'Helps teams stay aligned with emerging web standards'],
            highlights: [{label: 'Knowledge', value: 'Rapid problem solving'}, {label: 'Standards', value: 'Modern best practices'}, {label: 'Longevity', value: 'Future-proof delivery'}]
        }
    ];

    const activeCapability = capabilityCards[webIndex ?? 0] ?? capabilityCards[0];

    return (
        <div className={`${isDayTime ? 'bg-white' : 'bg-black'} min-h-screen`}>

            <section className="relative overflow-hidden lg:w-full lg:min-h-[90vh] lg:h-[720px] w-full h-[600px]">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="hidden lg:block absolute inset-0 w-full h-full object-cover"
                    poster="/assets/angular/hero.jpg"
                >
                    <source src="/assets/angular/hero.mp4" type="video/mp4"/>
                </video>

                <Image
                    src="/assets/angular/hero.jpg"
                    alt="Angular Development Hero"
                    fill
                    priority
                    className="lg:hidden object-cover"
                />

                <div className="pointer-events-none absolute inset-0 z-[1]">
                    <FxBackground day={false} grid={true} aurora={true}/>
                </div>

                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/50 z-[2]"/>
                <div
                    className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(45,212,191,0.12),transparent_50%)] z-[2]"/>

                <div className="pointer-events-none absolute inset-0 z-[3]">
                    <div className="gx-scanline"/>
                    <div className="gx-noise-overlay"/>
                    <div className="gx-orbit absolute"
                         style={{width: '60vmax', height: '60vmax', top: '-20vmax', right: '-20vmax', opacity: .12}}/>
                </div>

                <div className="absolute inset-0 flex items-center top-32 z-[11] px-6 sm:px-6 md:px-10 lg:px-[4.5em]">
                    <div className="w-full grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <div>
                            <div className="flex items-center gap-3 mb-6 lg:mb-8">
                                <div className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-pulse"/>
                                <span
                                    className="text-teal-400 text-[0.7em] lg:text-[0.82em] uppercase tracking-[0.22em] font-[600]">Angular Development</span>
                            </div>

                            <h1 className="text-white text-[2em] lg:text-[4.5em] font-[700] leading-[1.08] tracking-tight mb-6 lg:mb-8">
                                Build <span className="gx-gradient-text">Enterprise-Grade</span> Angular Platforms
                            </h1>

                            <p className="text-white/70 text-[0.85em] lg:text-[1.08em] leading-[1.65] mb-8 lg:mb-10 font-[300]">
                                From strategic architecture to launch-ready applications, we craft Angular products that
                                scale with complexity, performance, and your business ambitions.
                            </p>

                            <div className="flex flex-wrap gap-2 mb-10 lg:mb-12">
                                {['TypeScript', 'RxJS', 'Angular Material', 'Enterprise UX', 'Performance Engineering'].map((badge) => (
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
                                        View case studies
                                    </button>
                                </Link>
                            </div>
                        </div>

                        <div className="hidden lg:flex flex-col items-end">
                            <div className="grid grid-cols-2 gap-6 w-full">
                                {[
                                    {label: 'Scalable Apps', value: '50+'},
                                    {label: 'Years Angular', value: '8+'},
                                    {label: 'Enterprise Uptime', value: '99.9%'},
                                    {label: 'Launch Velocity', value: '2x'}
                                ].map((stat) => (
                                    <div key={stat.label}
                                         className="px-6 py-5 rounded-2xl border border-teal-400/25 bg-teal-400/8 backdrop-blur-md hover:bg-teal-400/12 transition-all duration-300 hover:border-teal-400/50 text-right">
                                        <div
                                            className="text-teal-300 text-[0.7em] uppercase tracking-wider font-[600] mb-2">{stat.label}</div>
                                        <div className="text-white text-[1.8em] font-[700]">{stat.value}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:hidden absolute bottom-12 left-0 right-0 z-[11] px-6">
                    <div className="grid grid-cols-3 gap-3">
                        {[
                            {label: 'Apps', value: '50+'},
                            {label: 'Angular', value: '8+'},
                            {label: 'Uptime', value: '99.9%'}
                        ].map((stat) => (
                            <div key={stat.label}
                                 className="px-3 py-2 rounded-xl border border-teal-400/25 bg-teal-400/8 backdrop-blur-md">
                                <div
                                    className="text-teal-300 text-[0.5em] uppercase tracking-wider font-[600] mb-1">{stat.label}</div>
                                <div className="text-white text-[1.2em] font-[700]">{stat.value}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Introductory section */}
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
                        <FxChip day={!isBackgroundActive ? !isDayTime : isDayTime}>ANGULAR EXCELLENCE</FxChip>
                    </div>

                    <div className="lg:-ml-[19em]">
                        <FxReveal>
                            <h3 className="lg:text-[3.5em] md:text-[3em] text-[2em] font-[700] tracking-tight leading-[1.15] mt-4">
                                Build resilient, high-performing <span
                                className="gx-gradient-text">Angular Experiences</span>
                            </h3>
                        </FxReveal>

                        <FxReveal delay={0.08}>
                            <div
                                className="grid lg:grid-cols-2 grid-cols-1 gap-6 mt-6 font-[300] text-justify text-[0.95em] md:text-[1.05em] leading-relaxed">
                                <div className="space-y-4">
                                    <p>
                                        At Grey InfoTech Vision, we deliver enterprise-grade Angular development
                                        services designed for mission-critical applications at scale. Our solutions
                                        combine Angular&apos;s TypeScript foundation, RxJS-driven reactivity, and
                                        dependency-injection architecture to support 50M+ user sessions with 99.9%+
                                        uptime.
                                    </p>
                                    <p>
                                        Whether you are modernizing legacy systems or launching new digital products, we
                                        engineer modular, maintainable platforms that keep complexity under control
                                        while accelerating delivery across distributed teams.
                                    </p>
                                    <div className="flex flex-wrap gap-3 mt-4">
                                        {['TypeScript Architecture', 'Enterprise UX', 'Reactive State', 'Scalable Patterns'].map((pill) => (
                                            <span key={pill} className="gx-data-pill">{pill}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <p>
                                        Our full-spectrum Angular practice spans architectural strategy, UX-led
                                        implementation, testing automation, and performance optimization. We create
                                        applications that stay fast under load, remain easy to evolve, and align with
                                        your long-term business roadmap.
                                    </p>
                                    <p>
                                        With 8+ years of Angular expertise and a portfolio of 120+ enterprise
                                        applications, we help teams ship confidently with measurable gains in
                                        maintainability, reliability, and product velocity.
                                    </p>
                                    <div className="flex flex-wrap gap-3 mt-4">
                                        {['Reusable Components', 'Accessibility First', 'Performance Tuning', 'Long-Term Support'].map((pill) => (
                                            <span key={pill} className="gx-data-pill">{pill}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </FxReveal>
                    </div>
                </div>
            </section>

            {/* Futuristic showcase */}
            <section className={`${isDayTime ? 'bg-white' : 'bg-black'} py-12 lg:py-20`}>
                <div id={'top'}
                     className={'relative lg:max-w-full w-full mx-auto h-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em]'}>
                    <FxCard day={false} glow className="relative overflow-hidden rounded-[2rem] p-6 sm:p-8 lg:p-10">
                        <div
                            className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(45,212,191,0.18),transparent_30%),linear-gradient(130deg,rgba(255,255,255,0.04),rgba(2,6,23,0.94))]"/>
                        <div className="absolute inset-0 border border-white/10 rounded-[2rem] pointer-events-none"/>
                        <div
                            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal-400/70 to-transparent"/>
                        <div
                            className="absolute right-6 top-6 h-24 w-24 rounded-full border border-teal-400/20 blur-3xl"/>
                        <div
                            className="absolute bottom-8 left-8 h-28 w-28 rounded-full border border-teal-400/15 blur-[90px]"/>
                        <div
                            className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.035)_50%,transparent_100%)]"/>
                        <div
                            className="absolute inset-0 bg-[linear-gradient(0deg,transparent_0%,rgba(255,255,255,0.025)_50%,transparent_100%)]"/>

                        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                            <div className="max-w-2xl">
                                <FxChip day={false} className="mb-4">EXECUTIVE SHOWCASE</FxChip>
                                <h3 className="text-[1.7em] sm:text-[2.2em] lg:text-[2.7em] font-[700] tracking-tight leading-[1.08] text-white">
                                    Precision-crafted Angular experiences, presented with cinematic clarity.
                                </h3>
                                <p className="mt-4 max-w-xl text-[0.9em] sm:text-[1em] leading-[1.7] text-white/70">
                                    A premium gallery of modular interfaces, scalable systems, and product-ready
                                    execution—designed to feel as advanced as the applications we build.
                                </p>
                            </div>
                            <div className="grid gap-2 sm:grid-cols-2 lg:min-w-[290px]">
                                {[
                                    {label: 'System Design', value: '01'},
                                    {label: 'Enterprise UI', value: '02'},
                                    {label: 'Scalable Flow', value: '03'},
                                    {label: 'Future Ready', value: '04'}
                                ].map((item) => (
                                    <div key={item.label}
                                         className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm">
                                        <div
                                            className="text-[0.58em] uppercase tracking-[0.3em] text-teal-300/80">{item.label}</div>
                                        <div className="mt-1 text-[1.05em] font-[600] text-white">{item.value}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative z-10 mt-8 grid gap-4 lg:grid-cols-[1.35fr_0.9fr]">
                            <div
                                className="group relative overflow-hidden rounded-[1.6rem] border border-white/10 h-[320px] sm:h-[420px] lg:h-[540px]">
                                <Image
                                    src="/assets/angular/1.jpg"
                                    alt="Angular architecture showcase"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div
                                    className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(2,6,23,0.2)_40%,rgba(2,6,23,0.88)_100%)]"/>
                                <div className="absolute inset-0 border border-white/10"/>
                                <div
                                    className="absolute left-4 top-4 rounded-full border border-teal-400/30 bg-black/30 px-3 py-1 text-[0.62em] uppercase tracking-[0.3em] text-teal-300">
                                    01 / Strategy
                                </div>
                                <div className="absolute bottom-4 left-4 right-4">
                                    <p className="text-[0.62em] uppercase tracking-[0.3em] text-teal-300 font-[600]">System
                                        Architecture</p>
                                    <p className="mt-2 max-w-xl text-sm sm:text-base text-white/90">Scalable, resilient
                                        foundations for mission-critical Angular applications.</p>
                                </div>
                            </div>

                            <div className="grid gap-4">
                                <div
                                    className="group relative overflow-hidden rounded-[1.35rem] border border-white/10 h-[250px] sm:h-[260px] lg:h-[260px]">
                                    <Image
                                        src="/assets/angular/3.jpg"
                                        alt="Angular UI detail showcase"
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div
                                        className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(2,6,23,0.16)_55%,rgba(2,6,23,0.78)_100%)]"/>
                                    <div className="absolute inset-0 border border-white/10"/>
                                    <div
                                        className="absolute left-3 top-3 rounded-full border border-white/15 bg-black/20 px-2.5 py-1 text-[0.56em] uppercase tracking-[0.28em] text-teal-200">
                                        02 / UI
                                    </div>
                                </div>

                                <div
                                    className="group relative overflow-hidden rounded-[1.35rem] border border-white/10 h-[250px] sm:h-[260px] lg:h-[260px]">
                                    <Image
                                        src="/assets/angular/2.jpg"
                                        alt="Angular workflow showcase"
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div
                                        className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(2,6,23,0.16)_55%,rgba(2,6,23,0.78)_100%)]"/>
                                    <div className="absolute inset-0 border border-white/10"/>
                                    <div
                                        className="absolute left-3 top-3 rounded-full border border-white/15 bg-black/20 px-2.5 py-1 text-[0.56em] uppercase tracking-[0.28em] text-teal-200">
                                        03 / Workflow
                                    </div>
                                </div>
                            </div>

                            <div
                                className="group relative overflow-hidden rounded-[1.6rem] border border-white/10 h-[240px] sm:h-[260px] lg:h-[260px] lg:col-span-2">
                                <Image
                                    src="/assets/angular/4.jpg"
                                    alt="Angular product experience showcase"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div
                                    className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(2,6,23,0.1)_35%,rgba(2,6,23,0.82)_100%)]"/>
                                <div className="absolute inset-0 border border-white/10"/>
                                <div
                                    className="absolute left-3 top-3 rounded-full border border-teal-400/30 bg-black/30 px-2.5 py-1 text-[0.56em] uppercase tracking-[0.28em] text-teal-300">
                                    04 / Experience
                                </div>
                                <div className="absolute bottom-4 left-4 right-4">
                                    <p className="text-white/90 text-sm sm:text-base">Elegant, high-performance product
                                        experiences built for growth.</p>
                                </div>
                            </div>
                        </div>
                    </FxCard>
                </div>
            </section>

            {/* Our Angular development Solutions */}
            <FxStickyScrollSection
                day={isDayTime}
                heading={<>Angular<br/>development solutions</>}
                intro="Our Angular services combine enterprise architecture, high-fidelity UI execution, and performance engineering to ship modern digital products with speed, resilience, and measurable business value."
                navLabel="Angular Solutions"
                activeId={activeId}
                onNavClickAction={scrollToSection}
                items={[
                    {
                        id: '01',
                        title: 'Enterprise Solutions',
                        target: 'EPS',
                        tags: ['Scalable', 'Secure', 'System Integration'],
                        body: (
                            <div>
                                <p>
                                    We architect Angular platforms for enterprise-grade delivery—combining modular
                                    services,
                                    secure APIs, and resilient frontend patterns to support large teams, data-heavy
                                    workflows,
                                    and complex governance requirements.
                                </p>
                                <p className="mt-3">
                                    Every solution is designed for long-term maintainability, operational clarity, and
                                    rapid
                                    scaling as your product footprint expands across business units, regions, and
                                    partner systems.
                                </p>
                                <div className="mt-4 grid gap-3 md:grid-cols-2">
                                    <div className="rounded-2xl border border-teal-400/10 bg-white/[0.03] p-3">
                                        <div className="text-[0.72em] uppercase tracking-[0.28em] text-teal-300">What we
                                            ship
                                        </div>
                                        <div className="mt-2 text-sm text-white/80">Secure modular architecture with
                                            role-based workflows and API resilience.
                                        </div>
                                    </div>
                                    <div className="rounded-2xl border border-teal-400/10 bg-white/[0.03] p-3">
                                        <div
                                            className="text-[0.72em] uppercase tracking-[0.28em] text-teal-300">Business
                                            impact
                                        </div>
                                        <div className="mt-2 text-sm text-white/80">Better cross-team execution, reduced
                                            operational friction, and future-ready scalability.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ),
                        metrics: [
                            {label: 'Uptime', value: '99.9%'},
                            {label: 'Scalability', value: '50M+'},
                            {label: 'Launch Speed', value: '2x'},
                        ],
                        deliverables: ['Enterprise architecture blueprint', 'API integration layer', 'CI/CD and observability', 'Governance and security model'],
                    },
                    {
                        id: '02',
                        title: 'Single-Page Applications (SPAs)',
                        target: 'SPAS',
                        tags: ['Reactive UX', 'Fluid Navigation', 'Fast Interactions'],
                        body: (
                            <div>
                                <p>
                                    Our SPAs deliver the feel of desktop applications inside the browser with seamless
                                    state
                                    transitions, low-friction navigation, and exceptional performance under load.
                                </p>
                                <p className="mt-3">
                                    Built with Angular’s component-driven architecture, each experience is cohesive,
                                    extensible,
                                    and designed for product teams that need speed without sacrificing polish.
                                </p>
                                <div className="mt-4 grid gap-3 md:grid-cols-2">
                                    <div className="rounded-2xl border border-teal-400/10 bg-white/[0.03] p-3">
                                        <div
                                            className="text-[0.72em] uppercase tracking-[0.28em] text-teal-300">Interaction
                                            model
                                        </div>
                                        <div className="mt-2 text-sm text-white/80">Fluid route transitions and dynamic
                                            rendering for premium user engagement.
                                        </div>
                                    </div>
                                    <div className="rounded-2xl border border-teal-400/10 bg-white/[0.03] p-3">
                                        <div
                                            className="text-[0.72em] uppercase tracking-[0.28em] text-teal-300">Delivery
                                            focus
                                        </div>
                                        <div className="mt-2 text-sm text-white/80">Fast iteration cycles through
                                            modular components and predictable architecture.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ),
                        metrics: [
                            {label: 'Load Time', value: '1.2s'},
                            {label: 'Interaction Speed', value: '60fps+'},
                            {label: 'Route Fluidity', value: 'Instant'},
                        ],
                        deliverables: ['SPA architecture', 'State-flow design', 'Responsive interaction model', 'Edge-case performance tuning'],
                    },
                    {
                        id: '03',
                        title: 'Web Applications',
                        target: 'WA',
                        tags: ['Interactive', 'Accessible', 'Performance-led'],
                        body: (
                            <div>
                                <p>
                                    From customer portals to internal tools, we build Angular web applications that
                                    balance depth
                                    of functionality with intuitive, polished user journeys designed for modern teams.
                                </p>
                                <p className="mt-3">
                                    Every experience is shaped around clarity, accessibility, and conversion-oriented
                                    flow so users
                                    can succeed quickly, confidently, and repeatedly.
                                </p>
                                <div className="mt-4 grid gap-3 md:grid-cols-2">
                                    <div className="rounded-2xl border border-teal-400/10 bg-white/[0.03] p-3">
                                        <div className="text-[0.72em] uppercase tracking-[0.28em] text-teal-300">UX
                                            quality
                                        </div>
                                        <div className="mt-2 text-sm text-white/80">Accessible, readable, and
                                            frictionless interactions across every screen size.
                                        </div>
                                    </div>
                                    <div className="rounded-2xl border border-teal-400/10 bg-white/[0.03] p-3">
                                        <div
                                            className="text-[0.72em] uppercase tracking-[0.28em] text-teal-300">Engineering
                                            depth
                                        </div>
                                        <div className="mt-2 text-sm text-white/80">Clean architecture, optimized
                                            rendering, and stable release workflows.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ),
                        metrics: [
                            {label: 'Accessibility', value: 'WCAG AA'},
                            {label: 'Performance', value: 'Lighthouse 95+'},
                            {label: 'Reliability', value: '99.95%'},
                        ],
                        deliverables: ['Accessible UI patterns', 'Design system integration', 'Optimized front-end delivery', 'Release readiness playbook'],
                    },
                    {
                        id: '04',
                        title: 'UI Development',
                        target: 'UID',
                        tags: ['Design Systems', 'Visual Precision', 'Component Libraries'],
                        body: (
                            <div>
                                <p>
                                    Our UI development work brings visual ambition and practical engineering together
                                    through
                                    reusable Angular components, expressive interaction design, and robust front-end
                                    structure.
                                </p>
                                <p className="mt-3">
                                    We create interfaces that feel premium, scale across product lines, and remain
                                    consistent as
                                    your brand and feature set mature.
                                </p>
                                <div className="mt-4 grid gap-3 md:grid-cols-2">
                                    <div className="rounded-2xl border border-teal-400/10 bg-white/[0.03] p-3">
                                        <div className="text-[0.72em] uppercase tracking-[0.28em] text-teal-300">Visual
                                            language
                                        </div>
                                        <div className="mt-2 text-sm text-white/80">Refined typography, spacing, motion,
                                            and component consistency across products.
                                        </div>
                                    </div>
                                    <div className="rounded-2xl border border-teal-400/10 bg-white/[0.03] p-3">
                                        <div
                                            className="text-[0.72em] uppercase tracking-[0.28em] text-teal-300">Engineering
                                            value
                                        </div>
                                        <div className="mt-2 text-sm text-white/80">Reusable design primitives that
                                            accelerate delivery and reduce rework.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ),
                        metrics: [
                            {label: 'Reuse', value: '80%'},
                            {label: 'Design Consistency', value: '100%'},
                            {label: 'Component Coverage', value: '95%'},
                        ],
                        deliverables: ['Component library', 'Visual system', 'Responsive UI documentation', 'Motion and interaction guidelines'],
                    },
                    {
                        id: '05',
                        title: 'Angular Mobile App Development',
                        target: 'AMAD',
                        tags: ['Mobile-first', 'Cross-platform', 'Fast Delivery'],
                        body: (
                            <div>
                                <p>
                                    We build mobile experiences with Angular that feel native in motion—fast, polished,
                                    and
                                    consistent across Android and iOS ecosystems.
                                </p>
                                <p className="mt-3">
                                    From internal tools to consumer-facing apps, we design for efficient onboarding,
                                    smooth
                                    interactions, and product-ready reliability on the move.
                                </p>
                                <div className="mt-4 grid gap-3 md:grid-cols-2">
                                    <div className="rounded-2xl border border-teal-400/10 bg-white/[0.03] p-3">
                                        <div className="text-[0.72em] uppercase tracking-[0.28em] text-teal-300">Mobile
                                            delivery
                                        </div>
                                        <div className="mt-2 text-sm text-white/80">Optimized for touch, performance,
                                            and consistent device behavior.
                                        </div>
                                    </div>
                                    <div className="rounded-2xl border border-teal-400/10 bg-white/[0.03] p-3">
                                        <div className="text-[0.72em] uppercase tracking-[0.28em] text-teal-300">Value
                                        </div>
                                        <div className="mt-2 text-sm text-white/80">Shared Angular logic that reduces
                                            duplication and speeds iterations.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ),
                        metrics: [
                            {label: 'Platform Coverage', value: 'iOS + Android'},
                            {label: 'Launch Velocity', value: '2x'},
                            {label: 'Touch Quality', value: 'Optimized'},
                        ],
                        deliverables: ['Mobile UX blueprint', 'Shared Angular codebase', 'Store-ready release assets', 'Performance tuning pass'],
                    },
                    {
                        id: '06',
                        title: 'Progressive Web Applications (PWAs)',
                        target: 'PWAS',
                        tags: ['Offline-ready', 'Installable', 'SEO-friendly'],
                        body: (
                            <div>
                                <p>
                                    Our PWAs merge the reach of the web with the reliability of native apps—delivering
                                    installable,
                                    fast-loading experiences that work beautifully in low-connectivity contexts.
                                </p>
                                <p className="mt-3">
                                    Designed for discoverability and retention, they keep your product accessible across
                                    devices
                                    without sacrificing performance, elegance, or maintainability.
                                </p>
                                <div className="mt-4 grid gap-3 md:grid-cols-2">
                                    <div className="rounded-2xl border border-teal-400/10 bg-white/[0.03] p-3">
                                        <div className="text-[0.72em] uppercase tracking-[0.28em] text-teal-300">Reach
                                        </div>
                                        <div className="mt-2 text-sm text-white/80">Installable, shareable, and
                                            accessible across modern browsers and devices.
                                        </div>
                                    </div>
                                    <div className="rounded-2xl border border-teal-400/10 bg-white/[0.03] p-3">
                                        <div
                                            className="text-[0.72em] uppercase tracking-[0.28em] text-teal-300">Experience
                                        </div>
                                        <div className="mt-2 text-sm text-white/80">Offline-ready interactions and
                                            seamless app-like behavior without app-store friction.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ),
                        metrics: [
                            {label: 'Install Rate', value: '+18%'},
                            {label: 'Offline Support', value: 'Yes'},
                            {label: 'SEO Readiness', value: 'Built-in'},
                        ],
                        deliverables: ['PWA architecture', 'Service worker layer', 'Install-ready UX flow', 'Offline-first content strategy'],
                    },
                ]}
            />

            {/* Mid image */}
            <section id={'mid image'}
                     className="relative z-10 px-4 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em] pb-8 lg:pb-16">
                <FxCard day={false} glow
                        className="relative overflow-hidden rounded-[2rem] border border-teal-400/20 p-3 sm:p-4 lg:p-5 shadow-[0_30px_80px_rgba(0,0,0,0.25)]">
                    <div
                        className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(45,212,191,0.16),transparent_32%),linear-gradient(135deg,rgba(255,255,255,0.04),rgba(2,6,23,0.95))]"/>
                    <div className="absolute inset-0 border border-white/10 rounded-[2rem] pointer-events-none"/>
                    <div
                        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal-400/70 to-transparent"/>
                    <div
                        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent"/>
                    <div className="absolute left-8 top-8 h-16 w-16 rounded-full border border-teal-400/20 blur-3xl"/>
                    <div
                        className="absolute right-8 bottom-8 h-20 w-20 rounded-full border border-cyan-400/20 blur-[90px]"/>
                    <div
                        className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.035)_50%,transparent_100%)]"/>

                    <div className="relative z-10 grid gap-4 lg:grid-cols-[1.35fr_0.65fr]">
                        <div className="relative overflow-hidden rounded-[1.4rem] border border-white/10 bg-black/20">
                            <div
                                className="absolute left-3 top-3 z-10 rounded-full border border-teal-400/30 bg-black/30 px-3 py-1 text-[0.56em] uppercase tracking-[0.32em] text-teal-300">
                                Platform Core
                            </div>
                            <div
                                className="absolute right-3 top-3 z-10 rounded-full border border-white/15 bg-black/20 px-3 py-1 text-[0.56em] uppercase tracking-[0.32em] text-white/70">
                                Angular Systems
                            </div>
                            <div className="absolute inset-0 border border-white/10"/>
                            <div
                                className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(2,6,23,0.18)_45%,rgba(2,6,23,0.82)_100%)]"/>
                            <Image
                                className="h-[320px] sm:h-[420px] lg:h-[520px] w-full object-cover"
                                src={'/assets/angular/mid.jpg'}
                                alt={'Angular platform showcase'}
                                width={2560}
                                height={1440}
                            />
                        </div>

                        <div className="flex flex-col justify-between gap-4">
                            <div
                                className="rounded-[1.3rem] border border-teal-400/15 bg-white/[0.04] p-5 backdrop-blur-md">
                                <div className="flex items-center gap-2">
                                    <span className="h-2.5 w-2.5 rounded-full bg-teal-400 animate-pulse"/>
                                    <span className="text-[0.62em] uppercase tracking-[0.3em] text-teal-300">Mission control</span>
                                </div>
                                <h3 className="mt-4 text-[1.45em] sm:text-[1.8em] font-[700] leading-[1.08] tracking-tight text-white">
                                    Precision-built architecture for high-scale Angular products.
                                </h3>
                                <p className="mt-3 text-[0.82em] sm:text-[0.9em] leading-[1.7] text-white/70">
                                    From resilient system design to user-centric execution, we blend performance,
                                    reliability, and elegant product thinking into every layer of the experience.
                                </p>
                            </div>

                            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                                {[
                                    {label: 'Uptime', value: '99.9%'},
                                    {label: 'Scale', value: '50M+'},
                                    {label: 'Delivery', value: '2x'}
                                ].map((item) => (
                                    <div key={item.label}
                                         className="rounded-[1rem] border border-white/10 bg-black/25 p-3 text-center">
                                        <div
                                            className="text-[0.58em] uppercase tracking-[0.3em] text-teal-300/80">{item.label}</div>
                                        <div className="mt-1 text-[1.05em] font-[700] text-white">{item.value}</div>
                                    </div>
                                ))}
                            </div>

                            <div
                                className="rounded-[1.3rem] border border-cyan-400/15 bg-[linear-gradient(135deg,rgba(45,212,191,0.12),rgba(14,116,144,0.08))] p-5">
                                <div className="text-[0.62em] uppercase tracking-[0.3em] text-cyan-300">Execution
                                    layer
                                </div>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {['Enterprise UX', 'System Resilience', 'Performance Engineering', 'Future-Ready Delivery'].map((chip) => (
                                        <span key={chip}
                                              className="rounded-full border border-teal-400/20 bg-black/20 px-3 py-1 text-[0.62em] uppercase tracking-[0.24em] text-white/80">
                                            {chip}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </FxCard>
            </section>

            {/* Benefits of using Angular for Software Development */}
            <div
                className={`lg:pt-[3em] md:pt-[2em] pt-[1em] lg:pb-[3em] md:pb-[2em] pb-[1em] ${isDayTime ? 'bg-black text-white' : 'bg-white text-black'}`}>
                <div id={'benefits-of-using-angular'}
                     className={`relative lg:top-10 py-16 lg:mb-20 mb-10 max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>

                    <div className={`relative overflow-hidden rounded-[2rem] border px-4 py-12 sm:px-6 md:px-8 lg:px-10 lg:py-14 ${isDayTime ? 'border-slate-200/80 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.18),transparent_38%),linear-gradient(135deg,#f7fbff_0%,#eef7ff_100%)] text-slate-900 shadow-[0_30px_90px_rgba(15,23,42,0.08)]' : 'border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(45,212,191,0.16),transparent_40%),linear-gradient(135deg,rgba(8,15,28,0.96),rgba(2,8,20,0.98))] text-slate-100 shadow-[0_30px_90px_rgba(0,0,0,0.35)]'}`}>
                        <div className="absolute inset-0 opacity-70">
                            <div className={`absolute left-0 top-0 h-40 w-40 rounded-full blur-3xl ${isDayTime ? 'bg-cyan-400/20' : 'bg-cyan-500/20'}`} />
                            <div className={`absolute bottom-0 right-0 h-48 w-48 rounded-full blur-3xl ${isDayTime ? 'bg-teal-500/15' : 'bg-teal-600/15'}`} />
                        </div>

                        <div className="relative z-10">
                            <div className="mb-10 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
                                <div>
                                    <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[0.62em] uppercase tracking-[0.35em] ${isDayTime ? 'border-cyan-500/20 bg-cyan-500/10 text-cyan-700' : 'border-cyan-400/25 bg-cyan-400/10 text-cyan-200'}`}>
                                        <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                                        Strategic advantage
                                    </div>
                                    <h2 className="mt-6 text-[1.45rem] font-[600] leading-[1.08] sm:text-[2rem] lg:text-[3.05rem]">
                                        Benefits of Using <span className={`bg-gradient-to-r ${isDayTime ? 'from-cyan-600 via-sky-600 to-teal-500' : 'from-cyan-300 via-teal-300 to-sky-400'} bg-clip-text text-transparent`}>Angular</span> for High-Impact Digital Products
                                    </h2>
                                </div>
                                <div className={`rounded-[1.25rem] border p-6 text-[0.92em] leading-7 ${isDayTime ? 'border-slate-200/80 bg-white/70 text-slate-700' : 'border-white/10 bg-black/20 text-slate-300'}`}>
                                    <p>
                                        Angular gives product teams a future-facing foundation for building high-performance applications with clarity, resilience, and elegant scale. From enterprise portals to intelligent SaaS platforms, it enables rapid delivery without sacrificing governance, design quality, or long-term maintainability.
                                    </p>
                                </div>
                            </div>

                            <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2">
                                <div id={'streamlined-architecture'} className={`group rounded-[1.35rem] border p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/40 ${isDayTime ? 'border-slate-200/80 bg-white/70' : 'border-white/10 bg-white/5'}`}>
                                    <div className="flex items-center gap-3">
                                        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${isDayTime ? 'border-cyan-500/20 bg-cyan-500/10' : 'border-cyan-400/20 bg-cyan-400/10'}`}>
                                            <Image
                                                src={isDayTime ? '/assets/vue/icon/risk1.svg' : '/assets/vue/icon/risk.svg'}
                                                alt="Streamlined architecture"
                                                width={28}
                                                height={28}
                                                className="h-7 w-7"
                                            />
                                        </div>
                                        <div>
                                            <div className={`text-[0.62em] uppercase tracking-[0.35em] ${isDayTime ? 'text-cyan-700' : 'text-cyan-200'}`}>Engineering foundation</div>
                                            <h3 className="mt-1 text-[1.1rem] font-[600]">Streamlined Architecture</h3>
                                        </div>
                                    </div>
                                    <p className={`mt-5 text-[0.9em] leading-7 ${isDayTime ? 'text-slate-700' : 'text-slate-300'}`}>
                                        Angular’s modular structure gives teams a disciplined way to compose interfaces, services, and shared logic into cohesive systems. That clarity shortens development cycles, strengthens maintainability, and makes even highly complex applications easier to evolve over time.
                                    </p>
                                    <ul className={`mt-5 space-y-2 text-[0.83em] leading-6 ${isDayTime ? 'text-slate-600' : 'text-slate-400'}`}>
                                        <li>• Clear separation of domain features and shared infrastructure</li>
                                        <li>• Faster onboarding for large technical teams and distributed delivery models</li>
                                        <li>• Strong foundations for scaling with confidence, governance, and minimal rework</li>
                                    </ul>
                                </div>

                                <div id={'immersive-ux'} className={`group rounded-[1.35rem] border p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/40 ${isDayTime ? 'border-slate-200/80 bg-white/70' : 'border-white/10 bg-white/5'}`}>
                                    <div className="flex items-center gap-3">
                                        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${isDayTime ? 'border-cyan-500/20 bg-cyan-500/10' : 'border-cyan-400/20 bg-cyan-400/10'}`}>
                                            <Image
                                                src={isDayTime ? '/assets/vue/icon/sca1.svg' : '/assets/vue/icon/sca.svg'}
                                                alt="Immersive user experience"
                                                width={28}
                                                height={28}
                                                className="h-7 w-7"
                                            />
                                        </div>
                                        <div>
                                            <div className={`text-[0.62em] uppercase tracking-[0.35em] ${isDayTime ? 'text-cyan-700' : 'text-cyan-200'}`}>Customer experience</div>
                                            <h3 className="mt-1 text-[1.1rem] font-[600]">Immersive Digital Experiences</h3>
                                        </div>
                                    </div>
                                    <p className={`mt-5 text-[0.9em] leading-7 ${isDayTime ? 'text-slate-700' : 'text-slate-300'}`}>
                                        With dynamic rendering, robust state management, and rich component ecosystems, Angular enables interfaces that feel fluid, responsive, and deeply intuitive. The result is a premium experience that keeps users engaged, reduces friction, and elevates the perceived quality of every product interaction.
                                    </p>
                                    <ul className={`mt-5 space-y-2 text-[0.83em] leading-6 ${isDayTime ? 'text-slate-600' : 'text-slate-400'}`}>
                                        <li>• Smooth transitions and responsive interactions that feel native across devices</li>
                                        <li>• Consistent visual language and polished component systems for stronger brand trust</li>
                                        <li>• Higher engagement through faster, richer UI that improves retention and satisfaction</li>
                                    </ul>
                                </div>

                                <div id={'performance-velocity'} className={`group rounded-[1.35rem] border p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/40 ${isDayTime ? 'border-slate-200/80 bg-white/70' : 'border-white/10 bg-white/5'}`}>
                                    <div className="flex items-center gap-3">
                                        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${isDayTime ? 'border-cyan-500/20 bg-cyan-500/10' : 'border-cyan-400/20 bg-cyan-400/10'}`}>
                                            <Image
                                                src={isDayTime ? '/assets/vue/icon/test1.svg' : '/assets/vue/icon/test.svg'}
                                                alt="Performance and velocity"
                                                width={28}
                                                height={28}
                                                className="h-7 w-7"
                                            />
                                        </div>
                                        <div>
                                            <div className={`text-[0.62em] uppercase tracking-[0.35em] ${isDayTime ? 'text-cyan-700' : 'text-cyan-200'}`}>Delivery speed</div>
                                            <h3 className="mt-1 text-[1.1rem] font-[600]">Performance-Driven Delivery</h3>
                                        </div>
                                    </div>
                                    <p className={`mt-5 text-[0.9em] leading-7 ${isDayTime ? 'text-slate-700' : 'text-slate-300'}`}>
                                        Angular CLI, dependency injection, and built-in tooling reduce friction during setup, testing, and deployment, enabling teams to move from concept to production with less manual effort and more predictable quality outcomes.
                                    </p>
                                    <ul className={`mt-5 space-y-2 text-[0.83em] leading-6 ${isDayTime ? 'text-slate-600' : 'text-slate-400'}`}>
                                        <li>• Faster iteration with command-driven workflows that compress execution cycles</li>
                                        <li>• Better quality controls through reusable patterns, validation, and consistent conventions</li>
                                        <li>• Shorter go-to-market timelines without sacrificing resilience, clarity, or performance</li>
                                    </ul>
                                </div>

                                <div id={'future-ready-ecosystem'} className={`group rounded-[1.35rem] border p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/40 ${isDayTime ? 'border-slate-200/80 bg-white/70' : 'border-white/10 bg-white/5'}`}>
                                    <div className="flex items-center gap-3">
                                        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${isDayTime ? 'border-cyan-500/20 bg-cyan-500/10' : 'border-cyan-400/20 bg-cyan-400/10'}`}>
                                            <Image
                                                src={isDayTime ? '/assets/vue/icon/fast1.svg' : '/assets/vue/icon/fast.svg'}
                                                alt="Future-ready ecosystem"
                                                width={28}
                                                height={28}
                                                className="h-7 w-7"
                                            />
                                        </div>
                                        <div>
                                            <div className={`text-[0.62em] uppercase tracking-[0.35em] ${isDayTime ? 'text-cyan-700' : 'text-cyan-200'}`}>Platform maturity</div>
                                            <h3 className="mt-1 text-[1.1rem] font-[600]">Future-Ready Ecosystem</h3>
                                        </div>
                                    </div>
                                    <p className={`mt-5 text-[0.9em] leading-7 ${isDayTime ? 'text-slate-700' : 'text-slate-300'}`}>
                                        Backed by a deeply supported community and a strong enterprise track record, Angular continues to evolve alongside modern standards, security expectations, and product innovation. That makes it a strategic investment for teams seeking longevity rather than short-lived experimentation.
                                    </p>
                                    <ul className={`mt-5 space-y-2 text-[0.83em] leading-6 ${isDayTime ? 'text-slate-600' : 'text-slate-400'}`}>
                                        <li>• Long-term framework stability and sustained support across growth stages</li>
                                        <li>• Strong ecosystem for integrations, extensions, and advanced tooling</li>
                                        <li>• Protection against rapid technology obsolescence and platform drift</li>
                                    </ul>
                                </div>

                                <div id={'secure-integration'} className={`group rounded-[1.35rem] border p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/40 ${isDayTime ? 'border-slate-200/80 bg-white/70' : 'border-white/10 bg-white/5'}`}>
                                    <div className="flex items-center gap-3">
                                        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${isDayTime ? 'border-cyan-500/20 bg-cyan-500/10' : 'border-cyan-400/20 bg-cyan-400/10'}`}>
                                            <Image
                                                src={isDayTime ? '/assets/vue/icon/att1.svg' : '/assets/vue/icon/att.svg'}
                                                alt="Secure integration"
                                                width={28}
                                                height={28}
                                                className="h-7 w-7"
                                            />
                                        </div>
                                        <div>
                                            <div className={`text-[0.62em] uppercase tracking-[0.35em] ${isDayTime ? 'text-cyan-700' : 'text-cyan-200'}`}>System interoperability</div>
                                            <h3 className="mt-1 text-[1.1rem] font-[600]">Secure Integration</h3>
                                        </div>
                                    </div>
                                    <p className={`mt-5 text-[0.9em] leading-7 ${isDayTime ? 'text-slate-700' : 'text-slate-300'}`}>
                                        Angular fits naturally into modern backend ecosystems, supporting secure communication with APIs, databases, authentication layers, and enterprise services without compromising performance or maintainability.
                                    </p>
                                    <ul className={`mt-5 space-y-2 text-[0.83em] leading-6 ${isDayTime ? 'text-slate-600' : 'text-slate-400'}`}>
                                        <li>• Flexible connectivity with existing infrastructure and external platforms</li>
                                        <li>• Strong foundation for composable digital systems with controlled dependencies</li>
                                        <li>• Reduced friction in complex product environments where reliability matters most</li>
                                    </ul>
                                </div>

                                <div id={'responsive-by-design'} className={`group rounded-[1.35rem] border p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/40 ${isDayTime ? 'border-slate-200/80 bg-white/70' : 'border-white/10 bg-white/5'}`}>
                                    <div className="flex items-center gap-3">
                                        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${isDayTime ? 'border-cyan-500/20 bg-cyan-500/10' : 'border-cyan-400/20 bg-cyan-400/10'}`}>
                                            <Image
                                                src={isDayTime ? '/assets/vue/icon/cust1.svg' : '/assets/vue/icon/cust.svg'}
                                                alt="Responsive by design"
                                                width={28}
                                                height={28}
                                                className="h-7 w-7"
                                            />
                                        </div>
                                        <div>
                                            <div className={`text-[0.62em] uppercase tracking-[0.35em] ${isDayTime ? 'text-cyan-700' : 'text-cyan-200'}`}>Experience quality</div>
                                            <h3 className="mt-1 text-[1.1rem] font-[600]">Responsive by Design</h3>
                                        </div>
                                    </div>
                                    <p className={`mt-5 text-[0.9em] leading-7 ${isDayTime ? 'text-slate-700' : 'text-slate-300'}`}>
                                        From desktop operations to mobile-first journeys, Angular supports dependable cross-platform delivery, helping teams launch polished experiences that remain fast, accessible, measurable, and ready for future growth.
                                    </p>
                                    <ul className={`mt-5 space-y-2 text-[0.83em] leading-6 ${isDayTime ? 'text-slate-600' : 'text-slate-400'}`}>
                                        <li>• Consistent performance across screen sizes and interaction modes</li>
                                        <li>• Strong support for progressive web experiences and future-ready interfaces</li>
                                        <li>• Faster market entry for ambitious digital products with less technical friction</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                                <div className={`rounded-[1.15rem] border p-4 ${isDayTime ? 'border-slate-200/80 bg-white/80' : 'border-white/10 bg-black/20'}`}>
                                    <div className={`text-[0.6em] uppercase tracking-[0.35em] ${isDayTime ? 'text-cyan-700' : 'text-cyan-200'}`}>Outcome 01</div>
                                    <h4 className="mt-2 text-[0.98rem] font-[600]">Architectural clarity</h4>
                                    <p className={`mt-2 text-[0.8em] leading-7 ${isDayTime ? 'text-slate-600' : 'text-slate-400'}`}>Every feature is built with a clear technical map, meaning teams can extend the platform without creating brittle or fragmented code.</p>
                                </div>
                                <div className={`rounded-[1.15rem] border p-4 ${isDayTime ? 'border-slate-200/80 bg-white/80' : 'border-white/10 bg-black/20'}`}>
                                    <div className={`text-[0.6em] uppercase tracking-[0.35em] ${isDayTime ? 'text-cyan-700' : 'text-cyan-200'}`}>Outcome 02</div>
                                    <h4 className="mt-2 text-[0.98rem] font-[600]">Operational resilience</h4>
                                    <p className={`mt-2 text-[0.8em] leading-7 ${isDayTime ? 'text-slate-600' : 'text-slate-400'}`}>Angular’s patterns support stronger maintainability, safer releases, and more reliable performance as the product evolves.</p>
                                </div>
                                <div className={`rounded-[1.15rem] border p-4 ${isDayTime ? 'border-slate-200/80 bg-white/80' : 'border-white/10 bg-black/20'}`}>
                                    <div className={`text-[0.6em] uppercase tracking-[0.35em] ${isDayTime ? 'text-cyan-700' : 'text-cyan-200'}`}>Outcome 03</div>
                                    <h4 className="mt-2 text-[0.98rem] font-[600]">Experience precision</h4>
                                    <p className={`mt-2 text-[0.8em] leading-7 ${isDayTime ? 'text-slate-600' : 'text-slate-400'}`}>The end result is a refined product experience that feels polished, efficient, and aligned with modern user expectations.</p>
                                </div>
                                <div className={`rounded-[1.15rem] border p-4 ${isDayTime ? 'border-slate-200/80 bg-white/80' : 'border-white/10 bg-black/20'}`}>
                                    <div className={`text-[0.6em] uppercase tracking-[0.35em] ${isDayTime ? 'text-cyan-700' : 'text-cyan-200'}`}>Outcome 04</div>
                                    <h4 className="mt-2 text-[0.98rem] font-[600]">Future adaptability</h4>
                                    <p className={`mt-2 text-[0.8em] leading-7 ${isDayTime ? 'text-slate-600' : 'text-slate-400'}`}>Angular helps teams create products that remain competitive, extensible, and ready for new capabilities as business needs evolve.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* What Powers Our Angular Development */}
            <div className={`${isDayTime ? 'bg-white' : 'bg-black'}`}>
                <div className={`relative mx-auto w-full max-w-full px-4 sm:px-6 lg:px-[4.6em] lg:pt-[6em] lg:pb-[6em] md:pt-[6em] md:pb-[6em] pt-[1.2em] pb-[1.2em] mt-14`}>
                    <div className={`relative overflow-hidden rounded-[2rem] border p-6 sm:p-8 lg:p-10 ${isDayTime ? 'border-slate-200 bg-[linear-gradient(135deg,rgba(255,255,255,0.96),rgba(241,245,249,0.86))]' : 'border-white/10 bg-[linear-gradient(135deg,rgba(6,10,20,0.98),rgba(10,16,29,0.94))]'}`}>
                        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(45,212,191,0.2),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.16),transparent_32%)]" />
                        <div className="pointer-events-none absolute inset-0 border border-white/10 rounded-[2rem]" />

                        <div className="relative z-10 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
                            <div>
                                <div className={`mb-4 inline-flex rounded-full border px-3 py-1 text-[0.62em] font-[600] uppercase tracking-[0.35em] ${isDayTime ? 'border-cyan-500/20 bg-cyan-500/10 text-cyan-700' : 'border-cyan-400/20 bg-cyan-400/10 text-cyan-200'}`}>
                                    Engineering Stack
                                </div>
                                <h2 className={`text-[1.6rem] sm:text-[2.1rem] lg:text-[2.8rem] font-[700] leading-[1.08] tracking-tight ${isDayTime ? 'text-slate-900' : 'text-white'}`}>
                                    What powers our Angular delivery
                                </h2>
                                <p className={`mt-5 max-w-xl text-[0.9em] leading-7 ${isDayTime ? 'text-slate-700' : 'text-slate-300'}`}>
                                    Our Angular practice combines architecture, product engineering, automation, and operational discipline to deliver platforms that remain stable, fast, and enterprise-ready.
                                </p>

                                <div className={`mt-7 rounded-[1.4rem] border p-5 ${isDayTime ? 'border-slate-200 bg-white/80' : 'border-white/10 bg-white/5'}`}>
                                    <div className={`text-[0.6em] uppercase tracking-[0.3em] ${isDayTime ? 'text-cyan-700' : 'text-cyan-200'}`}>
                                        Active capability
                                    </div>
                                    <h3 className={`mt-2 text-[1.15rem] font-[600] ${isDayTime ? 'text-slate-900' : 'text-white'}`}>
                                        {activeCapability.title}
                                    </h3>
                                    <p className={`mt-3 text-[0.9em] leading-7 ${isDayTime ? 'text-slate-700' : 'text-slate-300'}`}>
                                        {activeCapability.summary}
                                    </p>
                                    <div className="mt-5 flex flex-wrap gap-2">
                                        {activeCapability.metrics.map((metric) => (
                                            <span key={metric} className={`rounded-full border px-3 py-1 text-[0.66em] font-[600] uppercase tracking-[0.24em] ${isDayTime ? 'border-cyan-500/20 bg-cyan-500/10 text-cyan-700' : 'border-cyan-400/20 bg-cyan-400/10 text-cyan-200'}`}>
                                                {metric}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="mt-5 grid gap-3 md:grid-cols-3">
                                        {activeCapability.highlights.map((highlight) => (
                                            <div key={highlight.label} className={`rounded-[1rem] border p-3 ${isDayTime ? 'border-slate-200 bg-slate-50/80' : 'border-white/10 bg-black/20'}`}>
                                                <div className={`text-[0.56em] uppercase tracking-[0.3em] ${isDayTime ? 'text-cyan-700' : 'text-cyan-200'}`}>
                                                    {highlight.label}
                                                </div>
                                                <div className={`mt-2 text-[0.8rem] font-[600] ${isDayTime ? 'text-slate-900' : 'text-white'}`}>
                                                    {highlight.value}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className={`mt-5 border-t pt-4 text-[0.82em] leading-7 ${isDayTime ? 'border-slate-200 text-slate-700' : 'border-white/10 text-slate-300'}`}>
                                        {activeCapability.body}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                {capabilityCards.map((capability, index) => {
                                    const isActive = webIndex === index;
                                    return (
                                        <div key={capability.title} className={`overflow-hidden rounded-[1.35rem] border transition-all duration-300 ${isActive ? (isDayTime ? 'border-cyan-500/30 bg-white' : 'border-cyan-400/30 bg-white/10') : (isDayTime ? 'border-slate-200/70 bg-white/70' : 'border-white/10 bg-white/5')}`}>
                                            <button
                                                onClick={() => toggleWeb(index)}
                                                className="flex w-full items-start justify-between gap-4 px-4 py-4 text-left sm:px-5"
                                            >
                                                <div>
                                                    <div className={`text-[0.58em] font-[600] uppercase tracking-[0.3em] ${isDayTime ? 'text-cyan-700' : 'text-cyan-200'}`}>
                                                        {capability.eyebrow}
                                                    </div>
                                                    <div className={`mt-2 text-[1rem] font-[600] ${isDayTime ? 'text-slate-900' : 'text-white'}`}>
                                                        {capability.title}
                                                    </div>
                                                </div>
                                                {isActive ? (
                                                    <AiFillCaretUp className={`mt-1 text-[1.1rem] ${isDayTime ? 'text-slate-900' : 'text-white'}`} />
                                                ) : (
                                                    <AiFillCaretDown className={`mt-1 text-[1.1rem] ${isDayTime ? 'text-slate-900' : 'text-white'}`} />
                                                )}
                                            </button>
                                            {isActive && (
                                                <div className={`border-t px-4 py-4 sm:px-5 ${isDayTime ? 'border-slate-200 bg-slate-50/80' : 'border-white/10 bg-black/20'}`}>
                                                    <p className={`text-[0.9em] leading-7 ${isDayTime ? 'text-slate-700' : 'text-slate-300'}`}>
                                                        {capability.body}
                                                    </p>
                                                    
                                                    <div className="mt-6 border-t pt-5">
                                                        <div className={`text-[0.65em] uppercase tracking-[0.3em] font-[600] ${isDayTime ? 'text-cyan-700' : 'text-cyan-200'}`}>
                                                            Execution insights
                                                        </div>
                                                        <div className="mt-3 space-y-2">
                                                            {capability.details.map((detail) => (
                                                                <div key={detail} className="flex gap-3">
                                                                    <div className={`mt-1 h-1.5 w-1.5 rounded-full flex-shrink-0 ${isDayTime ? 'bg-cyan-600' : 'bg-cyan-400'}`} />
                                                                    <p className={`text-[0.8em] leading-6 ${isDayTime ? 'text-slate-700' : 'text-slate-300'}`}>
                                                                        {detail}
                                                                    </p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    <div className="mt-5 grid gap-2 sm:grid-cols-3">
                                                        {capability.points.map((point) => (
                                                            <span key={point} className={`rounded-full px-3 py-1.5 text-[0.65em] font-[600] uppercase tracking-[0.24em] ${isDayTime ? 'bg-slate-900/5 text-slate-700' : 'bg-white/10 text-slate-200'}`}>
                                                                {point}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Our Angular Development Process - Premium Timeline */}
            <div className={`relative overflow-hidden ${isDayTime ? 'bg-white' : 'bg-black'}`}>
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(34,211,238,0.15),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(45,212,191,0.12),transparent_50%)]" />
                
                <div className={`relative mx-auto px-4 sm:px-6 lg:px-[4.6em] lg:pt-[6em] lg:pb-[6em] md:pt-[6em] md:pb-[6em] pt-[3em] pb-[3em]`}>
                    {/* Header Section */}
                    <div className="mb-16 max-w-4xl">
                        <div className={`mb-5 inline-flex rounded-full border px-3 py-1 text-[0.62em] font-[600] uppercase tracking-[0.35em] ${isDayTime ? 'border-cyan-500/20 bg-cyan-500/10 text-cyan-700' : 'border-cyan-400/20 bg-cyan-400/10 text-cyan-200'}`}>
                            Enterprise-grade methodology
                        </div>
                        <h2 className={`text-[2rem] sm:text-[2.5rem] lg:text-[3.2rem] font-[700] leading-[1.1] tracking-tight ${isDayTime ? 'text-slate-900' : 'text-white'}`}>
                            Our Angular Development Lifecycle
                        </h2>
                        <p className={`mt-5 max-w-2xl text-[0.95em] leading-7 ${isDayTime ? 'text-slate-700' : 'text-slate-300'}`}>
                            A structured, discipline-driven approach that transforms business vision into enterprise-grade applications. Each phase combines strategic rigor, technical excellence, and measurable outcomes.
                        </p>
                    </div>

                    {/* Process Timeline Grid */}
                    <div className="grid gap-5 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
                        {[
                            {
                                id: 'discovery',
                                step: '01',
                                icon: '🎯',
                                title: 'Discovery & Strategy',
                                phase: 'Foundation',
                                color: 'from-cyan-600/20 to-cyan-400/10',
                                borderColor: 'border-cyan-500/30',
                                textColor: 'text-cyan-600',
                                bgAccent: 'bg-cyan-500/10',
                                description: 'Transform business vision into technical clarity. Deep stakeholder consultation, market analysis, and strategic roadmapping.',
                                outcomes: [
                                    'Comprehensive requirements specification',
                                    'Technical architecture blueprint',
                                    'Risk assessment & mitigation strategy',
                                    'Project timeline & resource allocation'
                                ],
                                metrics: ['3-5 weeks', 'Stakeholder alignment', '100% requirement clarity']
                            },
                            {
                                id: 'design',
                                step: '02',
                                icon: '✏️',
                                title: 'Design & Architecture',
                                phase: 'Architecture',
                                color: 'from-violet-600/20 to-violet-400/10',
                                borderColor: 'border-violet-500/30',
                                textColor: 'text-violet-600',
                                bgAccent: 'bg-violet-500/10',
                                description: 'Build the visual and technical blueprint. UX/UI design, system architecture, component library, and interactive prototypes.',
                                outcomes: [
                                    'High-fidelity design system',
                                    'Component architecture design',
                                    'Interactive prototypes & validation',
                                    'Design handoff documentation'
                                ],
                                metrics: ['2-4 weeks', 'Stakeholder validation', 'Design system established']
                            },
                            {
                                id: 'development',
                                step: '03',
                                icon: '⚙️',
                                title: 'Development & Engineering',
                                phase: 'Engineering',
                                color: 'from-emerald-600/20 to-emerald-400/10',
                                borderColor: 'border-emerald-500/30',
                                textColor: 'text-emerald-600',
                                bgAccent: 'bg-emerald-500/10',
                                description: 'Agile sprint-based development with continuous integration. Modular architecture, API implementation, and performance optimization.',
                                outcomes: [
                                    'Production-ready Angular codebase',
                                    'RESTful/GraphQL API implementation',
                                    'Performance benchmarks met',
                                    'Security best practices enforced'
                                ],
                                metrics: ['8-16 weeks', '95%+ code coverage', 'Zero critical debt']
                            },
                            {
                                id: 'testing',
                                step: '04',
                                icon: '✓',
                                title: 'Quality Assurance & Testing',
                                phase: 'Quality',
                                color: 'from-amber-600/20 to-amber-400/10',
                                borderColor: 'border-amber-500/30',
                                textColor: 'text-amber-600',
                                bgAccent: 'bg-amber-500/10',
                                description: 'Multi-layered testing strategy. Unit tests, integration tests, E2E automation, performance testing, and security scanning.',
                                outcomes: [
                                    'Comprehensive test suite automation',
                                    'Zero high-severity defects',
                                    'Performance benchmarks: LCP <2.5s',
                                    'Security audit clearance'
                                ],
                                metrics: ['3-4 weeks', '99.9% test pass rate', 'Full compliance']
                            },
                            {
                                id: 'deployment',
                                step: '05',
                                icon: '🚀',
                                title: 'Deployment & Launch',
                                phase: 'Launch',
                                color: 'from-pink-600/20 to-pink-400/10',
                                borderColor: 'border-pink-500/30',
                                textColor: 'text-pink-600',
                                bgAccent: 'bg-pink-500/10',
                                description: 'Seamless production rollout with zero downtime. Infrastructure provisioning, staged releases, and real-time monitoring activation.',
                                outcomes: [
                                    'Production environment configured',
                                    'Blue-green deployment executed',
                                    'CDN & caching optimized',
                                    'Monitoring & alerting active'
                                ],
                                metrics: ['0 downtime', '99.99% uptime SLA', 'Auto-scaling enabled']
                            },
                            {
                                id: 'maintenance',
                                step: '06',
                                icon: '🔧',
                                title: 'Maintenance & Evolution',
                                phase: 'Support',
                                color: 'from-blue-600/20 to-blue-400/10',
                                borderColor: 'border-blue-500/30',
                                textColor: 'text-blue-600',
                                bgAccent: 'bg-blue-500/10',
                                description: 'Continuous optimization and proactive support. Monitoring, updates, enhancements, and strategic evolution aligned with market trends.',
                                outcomes: [
                                    ' 24/7 system monitoring & alerts',
                                    'Monthly performance optimizations',
                                    'Quarterly feature roadmap updates',
                                    'Annual architecture reviews'
                                ],
                                metrics: ['99.9% uptime', '<5min response', 'Continuous innovation']
                            }
                        ].map((phase) => (
                            <div
                                key={phase.id}
                                className={`group relative overflow-hidden rounded-[1.5rem] border p-6 transition-all duration-300 ${isDayTime ? `${phase.borderColor} bg-gradient-to-br ${phase.color} hover:shadow-lg hover:shadow-slate-900/10` : `${phase.borderColor} bg-gradient-to-br ${phase.color} hover:shadow-lg hover:shadow-white/10`}`}
                            >
                                {/* Accent gradient background */}
                                <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent_70%)]" />

                                <div className="relative z-10">
                                    {/* Step number & icon */}
                                    <div className="flex items-start justify-between mb-4">
                                        <div className={`text-[2.5rem] ${phase.textColor}`}>
                                            {phase.icon}
                                        </div>
                                        <div className={`text-[0.7rem] font-[700] uppercase tracking-[0.35em] ${phase.textColor}`}>
                                            Phase {phase.step}
                                        </div>
                                    </div>

                                    {/* Title & subtitle */}
                                    <h3 className={`text-[1.1rem] font-[700] leading-tight mb-2 ${isDayTime ? 'text-slate-900' : 'text-white'}`}>
                                        {phase.title}
                                    </h3>
                                    <div className={`text-[0.65em] font-[600] uppercase tracking-[0.25em] mb-3 ${phase.textColor}`}>
                                        {phase.phase}
                                    </div>

                                    {/* Description */}
                                    <p className={`text-[0.85em] leading-6 mb-4 ${isDayTime ? 'text-slate-700' : 'text-slate-300'}`}>
                                        {phase.description}
                                    </p>

                                    {/* Divider */}
                                    <div className={`my-4 h-px ${isDayTime ? 'bg-slate-200' : 'bg-white/10'}`} />

                                    {/* Outcomes */}
                                    <div className="mb-4">
                                        <div className={`text-[0.65em] font-[600] uppercase tracking-[0.25em] mb-2 ${phase.textColor}`}>
                                            Key Outcomes
                                        </div>
                                        <ul className="space-y-1.5">
                                            {phase.outcomes.map((outcome, i) => (
                                                <li key={i} className="flex gap-2 items-start text-[0.8em]">
                                                    <span className={`mt-1 h-1 w-1 rounded-full flex-shrink-0 ${phase.textColor}`} />
                                                    <span className={`${isDayTime ? 'text-slate-700' : 'text-slate-300'}`}>
                                                        {outcome}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Metrics badges */}
                                    <div className="flex flex-wrap gap-2 pt-3 border-t border-white/10">
                                        {phase.metrics.map((metric, i) => (
                                            <span
                                                key={i}
                                                className={`text-[0.65em] font-[600] px-2 py-1 rounded-full ${isDayTime ? 'bg-slate-900/5 text-slate-700' : 'bg-white/10 text-slate-200'}`}
                                            >
                                                {metric}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Process Flow Visualization */}
                    <div className="mt-16 pt-12 border-t border-slate-200/50 dark:border-white/10">
                        <div className="mb-8">
                            <h3 className={`text-[1.3rem] font-[700] mb-3 ${isDayTime ? 'text-slate-900' : 'text-white'}`}>
                                Process Flow & Continuity
                            </h3>
                            <p className={`text-[0.9em] ${isDayTime ? 'text-slate-700' : 'text-slate-300'}`}>
                                Each phase feeds into the next, ensuring momentum, quality, and alignment throughout the entire project lifecycle.
                            </p>
                        </div>
                        <div className={`overflow-auto rounded-[1.2rem] border p-6 ${isDayTime ? 'border-slate-200 bg-slate-50' : 'border-white/10 bg-black/20'}`}>
                            <div className="flex items-center justify-between gap-3 min-w-max pb-4">
                                {['Discovery', 'Design', 'Development', 'Testing', 'Deployment', 'Maintenance'].map((label, i) => (
                                    <React.Fragment key={i}>
                                        <div className={`flex flex-col items-center px-3`}>
                                            <div className={`text-[0.7rem] font-[600] uppercase tracking-[0.2em] mb-2 ${isDayTime ? 'text-cyan-700' : 'text-cyan-200'}`}>
                                                {label}
                                            </div>
                                            <div className={`h-8 w-8 rounded-full flex items-center justify-center text-[0.75rem] font-[700] ${isDayTime ? 'bg-cyan-600/20 text-cyan-700' : 'bg-cyan-400/20 text-cyan-200'}`}>
                                                {i + 1}
                                            </div>
                                        </div>
                                        {i < 5 && (
                                            <div className={`h-0.5 w-12 ${isDayTime ? 'bg-gradient-to-r from-cyan-600/50 to-slate-200' : 'bg-gradient-to-r from-cyan-400/50 to-white/10'}`} />
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mid image - Advanced Delivery Showcase */}
            <div id={'last-image-showcase'}
                 className={`relative py-12 lg:py-16 ${isDayTime ? 'bg-black' : 'bg-white'}`}>
                <div className="max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em]">
                    
                    {/* Context Header */}
                    <div className="mb-8 lg:mb-12">
                        <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[0.62em] uppercase tracking-[0.35em] mb-4 ${isDayTime ? 'border-cyan-500/20 bg-cyan-500/10 text-cyan-300' : 'border-cyan-400/20 bg-cyan-400/10 text-cyan-600'}`}>
                            <span className={`h-2 w-2 rounded-full ${isDayTime ? 'bg-cyan-400' : 'bg-cyan-500'} animate-pulse`} />
                            Production Excellence
                        </div>
                        <h3 className={`text-[1.5rem] sm:text-[2rem] lg:text-[2.5rem] font-[600] leading-[1.1] ${isDayTime ? 'text-white' : 'text-black'}`}>
                            End-to-End <span className={`bg-gradient-to-r ${isDayTime ? 'from-cyan-300 via-teal-300 to-sky-400' : 'from-cyan-600 via-teal-600 to-sky-500'} bg-clip-text text-transparent`}>Delivery Excellence</span>
                        </h3>
                        <p className={`mt-4 text-[0.92em] leading-7 max-w-3xl ${isDayTime ? 'text-slate-300' : 'text-slate-700'}`}>
                            Our comprehensive Angular delivery pipeline integrates strategic planning, precision engineering, rigorous quality assurance, and continuous optimization to ensure your application launches with enterprise-grade reliability and performs at scale.
                        </p>
                    </div>

                    {/* Main Image Container with Advanced Framing */}
                    <div className={`relative overflow-hidden rounded-[2rem] border backdrop-blur-sm ${isDayTime ? 'border-white/10 bg-gradient-to-br from-slate-900/60 to-black/80 shadow-[0_40px_120px_rgba(45,212,191,0.15)]' : 'border-black/10 bg-gradient-to-br from-slate-50/60 to-white/80 shadow-[0_40px_120px_rgba(15,23,42,0.08)]'}`}>
                        
                        {/* Corner Accents */}
                        <div className="absolute inset-0 pointer-events-none">
                            <div className={`absolute top-0 left-0 w-32 h-32 rounded-full blur-3xl opacity-30 ${isDayTime ? 'bg-cyan-500/30' : 'bg-cyan-400/20'}`} />
                            <div className={`absolute bottom-0 right-0 w-40 h-40 rounded-full blur-3xl opacity-20 ${isDayTime ? 'bg-teal-600/30' : 'bg-teal-400/20'}`} />
                        </div>

                        {/* Image */}
                        <div className="relative z-10">
                            <Image
                                className="w-full h-auto object-fill"
                                src={'/assets/angular/last.jpg'}
                                alt="End-to-End Angular Delivery Pipeline"
                                width={2560}
                                height={1440}
                                priority={false}
                                style={{
                                    objectFit: "fill",
                                    objectPosition: "center",
                                }}
                            />
                        </div>

                        {/* Overlay Gradient for Depth */}
                        <div className={`absolute inset-0 opacity-20 pointer-events-none ${isDayTime ? 'bg-gradient-to-t from-black/40 to-transparent' : 'bg-gradient-to-t from-black/10 to-transparent'}`} />
                    </div>

                    {/* Delivery Pipeline Metrics */}
                    <div className="mt-10 lg:mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div className={`rounded-[1.2rem] border p-5 ${isDayTime ? 'border-white/10 bg-white/5' : 'border-black/10 bg-black/5'}`}>
                            <div className={`text-[0.6em] uppercase tracking-[0.35em] font-[600] mb-2 ${isDayTime ? 'text-cyan-200' : 'text-cyan-700'}`}>Phase 01</div>
                            <h4 className={`text-[0.95rem] font-[600] leading-[1.2] ${isDayTime ? 'text-white' : 'text-black'}`}>Strategic Planning</h4>
                            <p className={`mt-3 text-[0.78em] leading-6 ${isDayTime ? 'text-slate-400' : 'text-slate-600'}`}>Architecture assessment, roadmap definition, technical risk mitigation</p>
                        </div>

                        <div className={`rounded-[1.2rem] border p-5 ${isDayTime ? 'border-white/10 bg-white/5' : 'border-black/10 bg-black/5'}`}>
                            <div className={`text-[0.6em] uppercase tracking-[0.35em] font-[600] mb-2 ${isDayTime ? 'text-cyan-200' : 'text-cyan-700'}`}>Phase 02</div>
                            <h4 className={`text-[0.95rem] font-[600] leading-[1.2] ${isDayTime ? 'text-white' : 'text-black'}`}>Precision Engineering</h4>
                            <p className={`mt-3 text-[0.78em] leading-6 ${isDayTime ? 'text-slate-400' : 'text-slate-600'}`}>Modular development, component composition, performance optimization</p>
                        </div>

                        <div className={`rounded-[1.2rem] border p-5 ${isDayTime ? 'border-white/10 bg-white/5' : 'border-black/10 bg-black/5'}`}>
                            <div className={`text-[0.6em] uppercase tracking-[0.35em] font-[600] mb-2 ${isDayTime ? 'text-cyan-200' : 'text-cyan-700'}`}>Phase 03</div>
                            <h4 className={`text-[0.95rem] font-[600] leading-[1.2] ${isDayTime ? 'text-white' : 'text-black'}`}>Quality Assurance</h4>
                            <p className={`mt-3 text-[0.78em] leading-6 ${isDayTime ? 'text-slate-400' : 'text-slate-600'}`}>Comprehensive testing, security validation, performance benchmarking</p>
                        </div>

                        <div className={`rounded-[1.2rem] border p-5 ${isDayTime ? 'border-white/10 bg-white/5' : 'border-black/10 bg-black/5'}`}>
                            <div className={`text-[0.6em] uppercase tracking-[0.35em] font-[600] mb-2 ${isDayTime ? 'text-cyan-200' : 'text-cyan-700'}`}>Phase 04</div>
                            <h4 className={`text-[0.95rem] font-[600] leading-[1.2] ${isDayTime ? 'text-white' : 'text-black'}`}>Continuous Excellence</h4>
                            <p className={`mt-3 text-[0.78em] leading-6 ${isDayTime ? 'text-slate-400' : 'text-slate-600'}`}>Monitoring, optimization, feature delivery, infrastructure scaling</p>
                        </div>
                    </div>

                    {/* Supporting Details */}
                    <div className="mt-10 lg:mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className={`rounded-[1.35rem] border p-6 ${isDayTime ? 'border-white/10 bg-white/5' : 'border-black/10 bg-black/5'}`}>
                            <div className={`text-[0.62em] uppercase tracking-[0.35em] font-[600] mb-3 ${isDayTime ? 'text-cyan-200' : 'text-cyan-700'}`}>Quality Metrics</div>
                            <ul className={`space-y-3 text-[0.9em] leading-7 ${isDayTime ? 'text-slate-300' : 'text-slate-700'}`}>
                                <li className="flex items-start gap-3">
                                    <span className={`h-1.5 w-1.5 rounded-full mt-2 flex-shrink-0 ${isDayTime ? 'bg-cyan-400' : 'bg-cyan-600'}`} />
                                    <span>99.9% uptime guarantee across all deployment stages</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className={`h-1.5 w-1.5 rounded-full mt-2 flex-shrink-0 ${isDayTime ? 'bg-cyan-400' : 'bg-cyan-600'}`} />
                                    <span>Zero-downtime deployments with automated rollback capabilities</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className={`h-1.5 w-1.5 rounded-full mt-2 flex-shrink-0 ${isDayTime ? 'bg-cyan-400' : 'bg-cyan-600'}`} />
                                    <span>Sub-2-second page load times across all major browsers</span>
                                </li>
                            </ul>
                        </div>

                        <div className={`rounded-[1.35rem] border p-6 ${isDayTime ? 'border-white/10 bg-white/5' : 'border-black/10 bg-black/5'}`}>
                            <div className={`text-[0.62em] uppercase tracking-[0.35em] font-[600] mb-3 ${isDayTime ? 'text-cyan-200' : 'text-cyan-700'}`}>Operational Excellence</div>
                            <ul className={`space-y-3 text-[0.9em] leading-7 ${isDayTime ? 'text-slate-300' : 'text-slate-700'}`}>
                                <li className="flex items-start gap-3">
                                    <span className={`h-1.5 w-1.5 rounded-full mt-2 flex-shrink-0 ${isDayTime ? 'bg-teal-400' : 'bg-teal-600'}`} />
                                    <span>Enterprise-grade security with SOC 2 compliance ready</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className={`h-1.5 w-1.5 rounded-full mt-2 flex-shrink-0 ${isDayTime ? 'bg-teal-400' : 'bg-teal-600'}`} />
                                    <span>24/7 proactive monitoring with predictive alerting systems</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className={`h-1.5 w-1.5 rounded-full mt-2 flex-shrink-0 ${isDayTime ? 'bg-teal-400' : 'bg-teal-600'}`} />
                                    <span>Automated scaling to handle 10x traffic growth seamlessly</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Why We are a great Angular Partner - FUTURISTIC METHODOLOGY */}
            <section className={`relative py-20 lg:py-32 ${isDayTime ? 'bg-white text-black' : 'bg-black text-white'}`}>
                <FxBackground day={isDayTime} aurora grid />
                <FxOrbit size={520} top="-120px" right="-160px" opacity={0.08} speed={22} />
                <FxOrbit size={320} bottom="-80px" left="-100px" opacity={0.06} speed={30} reverse />

                <div className="relative z-10 mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.5em]">
                    {/* Section Header */}
                    <div className="max-w-3xl mb-14">
                        <FxChip day={!isDayTime}>PARTNERSHIP EXCELLENCE</FxChip>
                        <FxReveal>
                            <h2 className="text-[2.6em] lg:text-[4.2em] font-[800] leading-[1.04] tracking-tight mt-4 mb-4">
                                Why We're Your <span className="gx-gradient-text">Angular Authority</span>
                            </h2>
                        </FxReveal>
                        <FxReveal delay={0.06}>
                            <p className={`text-[1em] lg:text-[1.05em] leading-[1.7] font-[300] ${isDayTime ? 'text-gray-600' : 'text-gray-400'}`}>
                                Grey InfoTech combines deep Angular expertise with a business-first delivery model. We combine rigorous engineering discipline with transparent collaboration, ensuring every project launches with enterprise-grade reliability, scalability, and strategic alignment to drive measurable business outcomes.
                            </p>
                        </FxReveal>
                    </div>

                    {/* Four Partnership Pillars */}
                    <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6 lg:gap-8">
                        {[
                            {
                                step: '01',
                                title: 'Transparent Pricing',
                                timeframe: 'Upfront clarity',
                                items: ['Clear cost breakdowns', 'No hidden fees or surprises', 'Flexible engagement models', 'ROI-focused budgeting'],
                                acceptance: 'Detailed estimate, scope lock, milestone KPIs'
                            },
                            {
                                step: '02',
                                title: 'Strategic Commitment',
                                timeframe: 'Long-term partnership',
                                items: ['Business objective alignment', 'Ongoing support & optimization', 'Performance monitoring', 'Scalable feature roadmap'],
                                acceptance: 'Success metrics, monitoring dashboard, support SLA'
                            },
                            {
                                step: '03',
                                title: 'Security & Confidentiality',
                                timeframe: 'Enterprise-grade standards',
                                items: ['GDPR & compliance-ready', 'Strict NDA enforcement', 'IP protection protocols', 'Zero-trust infrastructure'],
                                acceptance: 'Compliance audit, security report, data handling SOP'
                            },
                            {
                                step: '04',
                                title: 'Agile Efficiency',
                                timeframe: '2-week sprints',
                                items: ['Rapid prototyping & iteration', 'Predictable delivery cadence', 'Continuous quality gates', 'Automated CI/CD pipelines'],
                                acceptance: 'Sprint deliverables, test coverage, release notes'
                            }
                        ].map((c, idx) => (
                            <FxReveal key={c.step} delay={0.06 + idx * 0.06}>
                                <div className={`relative p-6 rounded-2xl overflow-hidden border transition-all duration-300 hover:scale-[1.015] hover:shadow-2xl ${isDayTime ? 'bg-white/95 text-black border-slate-100' : 'bg-white/6 text-white border-white/8'}`}>

                                    {/* ambient glow */}
                                    <div className="absolute inset-0 pointer-events-none rounded-2xl" style={{boxShadow: isDayTime ? '0 30px 80px rgba(14,165,233,0.04)' : '0 40px 120px rgba(2,6,23,0.6)'}} />

                                    <div className="flex items-start justify-between">
                                        <div>
                                            <div className="text-[0.9em] font-mono text-slate-400">{c.step}</div>
                                            <h3 className="mt-3 text-[1.35em] font-[700] leading-[1.05]">{c.title}</h3>
                                            <div className={`mt-2 text-xs font-semibold ${isDayTime ? 'text-slate-600' : 'text-white/70'}`}>{c.timeframe}</div>
                                        </div>
                                        <div className="hidden lg:flex flex-col items-end gap-2">
                                            <div className={`px-3 py-1 rounded-full text-xs font-semibold ${isDayTime ? 'bg-slate-50 text-slate-700' : 'bg-white/6 text-white/80'} border ${isDayTime ? 'border-slate-100' : 'border-white/8'}`}>Deliverables</div>
                                            <div className={`px-3 py-1 rounded-full text-xs font-semibold ${isDayTime ? 'bg-slate-50 text-slate-700' : 'bg-white/6 text-white/80'} border ${isDayTime ? 'border-slate-100' : 'border-white/8'}`}>Standards</div>
                                        </div>
                                    </div>

                                    <p className={`mt-4 text-[0.95em] font-[300] leading-[1.6] ${isDayTime ? 'text-gray-700' : 'text-white/70'}`}>{c.acceptance}</p>

                                    <div className="mt-4 grid gap-2">
                                        {c.items.map((it) => (
                                            <div key={it} className={`flex items-center gap-3 text-sm ${isDayTime ? 'text-slate-600' : 'text-white/70'}`}>
                                                <div className={`w-2 h-2 rounded-full ${isDayTime ? 'bg-sky-400' : 'bg-teal-300'}`} />
                                                <div className="truncate">{it}</div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-5 flex items-center justify-between">
                                        <div className="text-[0.85em] font-[500] text-slate-400">Focus Area</div>
                                        <div className="text-[0.9em] font-extrabold gx-gradient-text">{c.title.split(' ')[0]}</div>
                                    </div>

                                    <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-10 pointer-events-none" style={{background: isDayTime ? 'radial-gradient(circle,#7dd3fc,transparent)' : 'radial-gradient(circle,#0891b2,transparent)'}} />
                                </div>
                            </FxReveal>
                        ))}
                    </div>

                    {/* Horizontal Partnership KPI strip */}
                    <FxReveal delay={0.4}>
                        <div className={`mt-10 p-6 rounded-2xl backdrop-blur-md border ${isDayTime ? 'bg-white/5 border-teal-400/20' : 'bg-black/5 border-teal-700/20'}`}>
                            <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
                                {[{val: '99.9% Uptime', label: 'Reliability guarantee', id: 'uptime'}, {val: 'Zero Hidden Costs', label: 'Transparent pricing', id: 'costs'}, {val: '24/7 Support', label: 'Always available', id: 'support'}, {val: 'On-Time Delivery', label: 'Agile cadence', id: 'delivery'}].map((s) => (
                                    <div key={s.id} className="text-center lg:text-left">
                                        <div className="text-[1.6em] font-[800] gx-gradient-text mb-1">{s.val}</div>
                                        <div className={`text-[0.78em] font-[600] ${isDayTime ? 'text-gray-700' : 'text-white/70'}`}>{s.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </FxReveal>

                    {/* CTA */}
                    <FxReveal delay={0.52}>
                        <div className="mt-8 flex items-center justify-between gap-6">
                            <div>
                                <h4 className={`text-[1.05em] font-[700] ${isDayTime ? 'text-gray-800' : 'text-white/90'}`}>Ready to partner with Angular experts?</h4>
                                <p className={`text-[0.95em] ${isDayTime ? 'text-gray-700' : 'text-white/70'}`}>We deliver scalable, high-performing applications built to last. Schedule a discovery call to discuss your vision and technical strategy.</p>
                            </div>
                            <Link href="/contact">
                                <button className={`px-6 py-3 rounded-lg font-[600] text-[0.95em] whitespace-nowrap transition-all duration-300 ${isDayTime ? 'bg-black text-white hover:bg-slate-800' : 'bg-white text-black hover:bg-slate-100'}`}>
                                    Start your project →
                                </button>
                            </Link>
                        </div>
                    </FxReveal>
                </div>
            </section>

            {/* Who is involved in the process - Styled like Web-Design.tsx showcase - DETAILED */}
            <section id={'involved'}
                     className={`relative lg:max-w-full w-full py-24 mx-auto h-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em]`}>
                <div className={`grid lg:grid-cols-[1.3fr_1fr] md:grid-cols-2 grid-cols-1 gap-16 items-start`}>
                    {/* Left: Original narrative - BIGGER & MORE FUTURISTIC */}
                    <div className={`relative order-2 lg:order-1`}>
                        <div className={`${isDayTime ? 'text-slate-900' : 'text-slate-100'}`}>
                            {/* Premium Badge with Animation */}
                            <div className="inline-flex items-center gap-3 mb-6">
                                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${isDayTime ? 'bg-gradient-to-r from-cyan-100 to-teal-100 border border-cyan-300' : 'bg-gradient-to-r from-cyan-500/15 to-teal-500/15 border border-cyan-400/40'} backdrop-blur-sm`}>
                                    <span className={`h-2 w-2 rounded-full ${isDayTime ? 'bg-cyan-600 animate-pulse' : 'bg-cyan-400 animate-pulse'}`}></span>
                                    <span className={`text-xs font-[700] uppercase tracking-[0.15em] ${isDayTime ? 'text-cyan-800' : 'text-cyan-200'}`}>Team & Process</span>
                                </div>
                                <span className={`text-xs font-[500] ${isDayTime ? 'text-slate-600' : 'text-slate-400'}`}>Expert delivery · Enterprise-grade · 8+ years</span>
                            </div>

                            {/* Futuristic Heading */}
                            <h2 className={`text-4xl lg:text-5xl font-[900] leading-[1.08] tracking-tight mb-6 ${isDayTime ? 'text-slate-950' : 'text-white'}`}>
                                Who is involved <br className={'lg:block md:block hidden'}/>in the <span className={`bg-gradient-to-r ${isDayTime ? 'from-cyan-600 via-teal-600 to-sky-600' : 'from-cyan-300 via-teal-300 to-sky-400'} bg-clip-text text-transparent`}>process</span>
                            </h2>

                            {/* Premium Separator */}
                            <div className={`h-1 w-16 ${isDayTime ? 'bg-gradient-to-r from-cyan-500 to-teal-500' : 'bg-gradient-to-r from-cyan-400 to-teal-400'} rounded-full mb-6`}></div>

                            <p className={`text-lg leading-8 ${isDayTime ? 'text-slate-800' : 'text-slate-300'}`}>
                                At Grey InfoTech, our Angular development services are delivered by a carefully assembled team of 18+ specialized developers dedicated to building enterprise-grade applications serving 150+ client organizations across diverse industries. With 8+ years of focused expertise in Angular and related technologies, we've successfully delivered 120+ Angular applications maintaining an exceptional 95% client retention rate. A seasoned project manager oversees the entire development lifecycle, ensuring clear communication, milestone tracking, and strategic alignment with your business objectives. Our Angular developers leverage the framework's powerful type system and reactive patterns to create high-performance applications that consistently achieve sub-100ms response times and 99.9%+ uptime metrics across production environments.
                            </p>

                            <p className={`mt-6 text-lg leading-8 ${isDayTime ? 'text-slate-800' : 'text-slate-300'}`}>
                                Complementing the development team are UI/UX designers who focus on delivering enterprise-grade user experiences across banking, insurance, telecom, and fintech sectors, quality assurance specialists who rigorously test for performance, security, and compliance requirements, and DevOps engineers who manage deployment pipelines, infrastructure optimization, and continuous monitoring. Throughout the entire process, your feedback is actively incorporated into development cycles to ensure the final product delivers measurable business value and meets enterprise-grade reliability and security standards.
                            </p>

                            {/* Detailed Breakdown - Enhanced */}
                            <div className={`mt-10 space-y-4 border-t ${isDayTime ? 'border-slate-300' : 'border-slate-700'} pt-8`}>
                                <h3 className={`text-sm font-[800] uppercase tracking-[0.2em] mb-6 ${isDayTime ? 'text-slate-700' : 'text-slate-300'}`}>Team Composition & Expertise</h3>
                                
                                <div className="space-y-4">
                                    <div className={`group p-5 rounded-2xl transition-all duration-300 hover:scale-[1.02] ${isDayTime ? 'bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 hover:border-cyan-400 hover:shadow-lg' : 'bg-gradient-to-br from-white/8 to-white/4 border border-white/15 hover:border-cyan-400/50 hover:shadow-[0_20px_60px_rgba(45,212,191,0.15)]'}`}>
                                        <div className="flex items-start gap-3">
                                            <div className={`h-2 w-2 rounded-full mt-1 flex-shrink-0 ${isDayTime ? 'bg-cyan-600' : 'bg-cyan-400'}`}></div>
                                            <div>
                                                <div className={`text-sm font-[700] ${isDayTime ? 'text-slate-900' : 'text-white'}`}>Senior Angular Architects (4-6 specialists)</div>
                                                <p className={`text-[0.9em] mt-2 leading-relaxed ${isDayTime ? 'text-slate-700' : 'text-slate-400'}`}>Lead technical strategy, system design, performance optimization, and advanced RxJS/state management patterns. 12+ years average experience.</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={`group p-5 rounded-2xl transition-all duration-300 hover:scale-[1.02] ${isDayTime ? 'bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 hover:border-teal-400 hover:shadow-lg' : 'bg-gradient-to-br from-white/8 to-white/4 border border-white/15 hover:border-teal-400/50 hover:shadow-[0_20px_60px_rgba(45,212,191,0.15)]'}`}>
                                        <div className="flex items-start gap-3">
                                            <div className={`h-2 w-2 rounded-full mt-1 flex-shrink-0 ${isDayTime ? 'bg-teal-600' : 'bg-teal-400'}`}></div>
                                            <div>
                                                <div className={`text-sm font-[700] ${isDayTime ? 'text-slate-900' : 'text-white'}`}>Full-Stack Angular Engineers (8-10 developers)</div>
                                                <p className={`text-[0.9em] mt-2 leading-relaxed ${isDayTime ? 'text-slate-700' : 'text-slate-400'}`}>Implement components, services, and business logic. Expert in TypeScript, RxJS operators, Angular Material, lazy loading, and testing frameworks like Jasmine/Karma.</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={`group p-5 rounded-2xl transition-all duration-300 hover:scale-[1.02] ${isDayTime ? 'bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 hover:border-sky-400 hover:shadow-lg' : 'bg-gradient-to-br from-white/8 to-white/4 border border-white/15 hover:border-sky-400/50 hover:shadow-[0_20px_60px_rgba(45,212,191,0.15)]'}`}>
                                        <div className="flex items-start gap-3">
                                            <div className={`h-2 w-2 rounded-full mt-1 flex-shrink-0 ${isDayTime ? 'bg-sky-600' : 'bg-sky-400'}`}></div>
                                            <div>
                                                <div className={`text-sm font-[700] ${isDayTime ? 'text-slate-900' : 'text-white'}`}>UI/UX Design Team (2-3 specialists)</div>
                                                <p className={`text-[0.9em] mt-2 leading-relaxed ${isDayTime ? 'text-slate-700' : 'text-slate-400'}`}>Deliver WCAG 2.1 AA compliant designs, create component libraries, conduct usability testing, and ensure accessibility across banking, insurance, and fintech domains.</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={`group p-5 rounded-2xl transition-all duration-300 hover:scale-[1.02] ${isDayTime ? 'bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 hover:border-blue-400 hover:shadow-lg' : 'bg-gradient-to-br from-white/8 to-white/4 border border-white/15 hover:border-blue-400/50 hover:shadow-[0_20px_60px_rgba(45,212,191,0.15)]'}`}>
                                        <div className="flex items-start gap-3">
                                            <div className={`h-2 w-2 rounded-full mt-1 flex-shrink-0 ${isDayTime ? 'bg-blue-600' : 'bg-blue-400'}`}></div>
                                            <div>
                                                <div className={`text-sm font-[700] ${isDayTime ? 'text-slate-900' : 'text-white'}`}>QA & Testing Specialists (2-3 engineers)</div>
                                                <p className={`text-[0.9em] mt-2 leading-relaxed ${isDayTime ? 'text-slate-700' : 'text-slate-400'}`}>Execute comprehensive testing strategies including unit tests (Jest), E2E tests (Cypress), performance testing, security audits, and compliance validation.</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={`group p-5 rounded-2xl transition-all duration-300 hover:scale-[1.02] ${isDayTime ? 'bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 hover:border-indigo-400 hover:shadow-lg' : 'bg-gradient-to-br from-white/8 to-white/4 border border-white/15 hover:border-indigo-400/50 hover:shadow-[0_20px_60px_rgba(45,212,191,0.15)]'}`}>
                                        <div className="flex items-start gap-3">
                                            <div className={`h-2 w-2 rounded-full mt-1 flex-shrink-0 ${isDayTime ? 'bg-indigo-600' : 'bg-indigo-400'}`}></div>
                                            <div>
                                                <div className={`text-sm font-[700] ${isDayTime ? 'text-slate-900' : 'text-white'}`}>DevOps & Infrastructure Engineers (1-2 specialists)</div>
                                                <p className={`text-[0.9em] mt-2 leading-relaxed ${isDayTime ? 'text-slate-700' : 'text-slate-400'}`}>Manage CI/CD pipelines, cloud infrastructure (AWS/Azure), containerization (Docker), monitoring dashboards, and disaster recovery protocols.</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={`group p-5 rounded-2xl transition-all duration-300 hover:scale-[1.02] ${isDayTime ? 'bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 hover:border-purple-400 hover:shadow-lg' : 'bg-gradient-to-br from-white/8 to-white/4 border border-white/15 hover:border-purple-400/50 hover:shadow-[0_20px_60px_rgba(45,212,191,0.15)]'}`}>
                                        <div className="flex items-start gap-3">
                                            <div className={`h-2 w-2 rounded-full mt-1 flex-shrink-0 ${isDayTime ? 'bg-purple-600' : 'bg-purple-400'}`}></div>
                                            <div>
                                                <div className={`text-sm font-[700] ${isDayTime ? 'text-slate-900' : 'text-white'}`}>Project Management & Strategy (1-2 leads)</div>
                                                <p className={`text-[0.9em] mt-2 leading-relaxed ${isDayTime ? 'text-slate-700' : 'text-slate-400'}`}>Oversee delivery roadmaps, stakeholder communication, sprint planning, risk management, and ensure alignment with business objectives and timelines.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Key Metrics - Enhanced */}
                            <div className={`mt-10 grid grid-cols-3 gap-4`}>
                                <div className={`group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 cursor-pointer ${isDayTime ? 'bg-gradient-to-br from-cyan-50 to-cyan-100 border border-cyan-300 hover:shadow-lg hover:scale-[1.05]' : 'bg-gradient-to-br from-cyan-500/15 to-cyan-500/5 border border-cyan-400/30 hover:shadow-[0_20px_60px_rgba(34,211,238,0.2)] hover:scale-[1.05]'}`}>
                                    <div className="relative z-10">
                                        <div className={`text-xs font-[600] uppercase tracking-wide ${isDayTime ? 'text-cyan-700' : 'text-cyan-300'}`}>Applications</div>
                                        <div className={`text-3xl font-[900] mt-2 ${isDayTime ? 'text-cyan-900' : 'text-white'}`}>120+</div>
                                        <div className={`text-[0.8em] mt-1 ${isDayTime ? 'text-cyan-700' : 'text-cyan-200'}`}>Successfully delivered</div>
                                    </div>
                                </div>
                                <div className={`group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 cursor-pointer ${isDayTime ? 'bg-gradient-to-br from-teal-50 to-teal-100 border border-teal-300 hover:shadow-lg hover:scale-[1.05]' : 'bg-gradient-to-br from-teal-500/15 to-teal-500/5 border border-teal-400/30 hover:shadow-[0_20px_60px_rgba(45,212,191,0.2)] hover:scale-[1.05]'}`}>
                                    <div className="relative z-10">
                                        <div className={`text-xs font-[600] uppercase tracking-wide ${isDayTime ? 'text-teal-700' : 'text-teal-300'}`}>Retention</div>
                                        <div className={`text-3xl font-[900] mt-2 ${isDayTime ? 'text-teal-900' : 'text-white'}`}>95%</div>
                                        <div className={`text-[0.8em] mt-1 ${isDayTime ? 'text-teal-700' : 'text-teal-200'}`}>Client loyalty rate</div>
                                    </div>
                                </div>
                                <div className={`group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 cursor-pointer ${isDayTime ? 'bg-gradient-to-br from-sky-50 to-sky-100 border border-sky-300 hover:shadow-lg hover:scale-[1.05]' : 'bg-gradient-to-br from-sky-500/15 to-sky-500/5 border border-sky-400/30 hover:shadow-[0_20px_60px_rgba(125,211,252,0.2)] hover:scale-[1.05]'}`}>
                                    <div className="relative z-10">
                                        <div className={`text-xs font-[600] uppercase tracking-wide ${isDayTime ? 'text-sky-700' : 'text-sky-300'}`}>Uptime</div>
                                        <div className={`text-3xl font-[900] mt-2 ${isDayTime ? 'text-sky-900' : 'text-white'}`}>99.9%</div>
                                        <div className={`text-[0.8em] mt-1 ${isDayTime ? 'text-sky-700' : 'text-sky-200'}`}>Production reliability</div>
                                    </div>
                                </div>
                            </div>

                            <div className={`mt-10 flex items-center gap-4 flex-wrap`}>
                                <Link href={'/company'}
                                      className={`inline-flex items-center justify-center rounded-xl ${isDayTime ? 'bg-black text-white hover:bg-slate-800' : 'bg-white text-black hover:bg-slate-100'} px-6 py-4 font-[700] shadow-lg hover:scale-[1.02] transition-all duration-300`}>
                                    About Us →
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Right: Original images with Web-Design styling */}
                    <div className={`relative order-1 lg:order-2 flex items-center justify-center group`}>
                        <div className="relative w-full max-w-2xl">
                            {/* Ambient gradient backdrop */}
                            <div aria-hidden
                                 className={`absolute -inset-4 rounded-3xl blur-3xl opacity-25 ${isDayTime ? 'bg-gradient-to-br from-cyan-400 via-teal-400 to-blue-600' : 'bg-gradient-to-br from-cyan-400 via-teal-400 to-blue-600'} transform-gpu -rotate-3 pointer-events-none`}/>

                            {/* Primary showcase card */}
                            <div
                                className={`relative rounded-3xl overflow-hidden shadow-2xl border ${isDayTime ? 'border-slate-200 bg-gradient-to-b from-white/80 to-white/60' : 'border-white/10 bg-gradient-to-b from-white/8 to-white/4'} transition-transform duration-700 will-change-transform group-hover:-translate-y-3 group-hover:scale-[1.01]`}>
                                <Image
                                    src="/assets/hybrid/trip.jpg"
                                    alt="Team at table"
                                    width={900}
                                    height={600}
                                    className="w-full h-auto object-cover block"
                                />
                                {/* Overlay gradient */}
                                <div
                                    className={`absolute inset-0 ${isDayTime ? 'bg-gradient-to-t from-black/20 via-transparent to-transparent' : 'bg-gradient-to-t from-black/40 via-transparent to-transparent'} pointer-events-none`}/>
                            </div>

                            {/* Floating secondary card - offset */}
                            <div
                                className={`absolute -bottom-16 -right-8 w-64 rounded-2xl overflow-hidden shadow-lg border ${isDayTime ? 'border-slate-200 bg-white/70' : 'border-white/10 bg-black/40'} backdrop-blur-sm transition-transform duration-700 transform hover:scale-105`}>
                                <Image
                                    src="/assets/hybrid/disc.jpg"
                                    alt="Team discussion"
                                    height={700}
                                    width={220}
                                    className="w-full h-auto object-cover"
                                />
                                <div
                                    className={`absolute inset-0 ${isDayTime ? 'bg-gradient-to-t from-black/30 to-transparent' : 'bg-gradient-to-t from-black/60 to-transparent'} pointer-events-none`}/>
                                <div className={`absolute bottom-0 left-0 right-0 p-3`}>
                                    <div className={`text-xs ${isDayTime ? 'text-slate-700' : 'text-white/80'}`}>Strategic Planning</div>
                                    <div className={`text-sm font-semibold ${isDayTime ? 'text-black' : 'text-white'} mt-1`}>Team Collaboration</div>
                                </div>
                            </div>

                            {/* Accent elements */}
                            <div aria-hidden
                                 className={`absolute -top-6 -right-6 w-32 h-32 rounded-full ${isDayTime ? 'bg-gradient-to-br from-cyan-400/30 to-teal-600/30' : 'bg-gradient-to-br from-cyan-400/30 to-teal-600/30'} blur-2xl`}/>
                            <div aria-hidden
                                 className={`absolute -bottom-8 -left-8 w-40 h-40 rounded-full ${isDayTime ? 'bg-gradient-to-tr from-teal-400/20 to-sky-600/20' : 'bg-gradient-to-tr from-teal-400/20 to-sky-600/20'} blur-3xl`}/>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AngularDevelopment;

