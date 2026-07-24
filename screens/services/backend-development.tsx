'use client';

import React, {useEffect, useRef, useState} from 'react';
import '@/app/globals.css'
import Image from "next/image";
import ResponsiveVideoHero from '@/components/ResponsiveVideoHero';
import ServiceHero from '@/components/futuristic/ServiceHero';
import ServiceCapabilities from '@/components/futuristic/ServiceCapabilities';
import Link from "next/link";
import CountUp from "react-countup";
import {motion, useScroll, useTransform, useMotionValue} from "framer-motion";
import {useIsDayTime} from '../../components/useIsDayTime';

import FuturisticServiceLayout from '@/components/futuristic/FuturisticServiceLayout';

import {FxBackground, FxChip, FxReveal, FxButton, FxHoloCard, FxStickyScrollSection} from '@/components/futuristic/fx';

const BackendDevelopment = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isBackgroundActive, setIsBackgroundActive] = useState(false);
    const [activeId, setActiveId] = useState<string>("");
    // x-scroller
    const targetRef = useRef<HTMLDivElement | null>(null);
    const [isMounted, setIsMounted] = useState(false);
    useEffect(()=> setIsMounted(true), []);
    const fallbackScroll = useMotionValue(0);
    const { scrollYProgress } = useScroll({ target: isMounted ? targetRef : undefined });
    const x = useTransform(scrollYProgress ?? fallbackScroll, [0, 1], ["0%", "-80%"]);

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
            "DM",
            "AD",
            "AS",
            "SSL",
            "CI",
            "CMS",
            "PO",
            "RF",
            "ES",
            "DA",
            "DAR",
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

            {/* Unified Futuristic Backend Development Hero - Background Image/Video with overlay */}
            <section className="relative overflow-hidden lg:w-full lg:min-h-[90vh] lg:h-[720px] w-full h-[600px]">
                {/* Video Background (desktop) and Image fallback (mobile) */}
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="hidden lg:block absolute inset-0 w-full h-full object-cover"
                    poster="/assets/back/hero.jpg"
                >
                    <source src="/assets/back/hero-mobile.mp4" type="video/mp4"/>
                </video>

                <Image
                    src="/assets/back/hero.jpg"
                    alt="Backend Development Hero"
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
                    className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,245,212,0.12),transparent_50%)] z-[2]"/>

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
                                <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"/>
                                <span
                                    className="text-cyan-400 text-[0.7em] lg:text-[0.82em] uppercase tracking-[0.22em] font-[600]">Back-end Development</span>
                            </div>

                            <h1 className="text-white text-[2em] lg:text-[4.5em] font-[700] leading-[1.08] tracking-tight mb-6 lg:mb-8">
                                Robust, <span className="gx-gradient-text">Scalable</span> Systems
                            </h1>

                            <p className="text-white/70 text-[0.85em] lg:text-[1.08em] leading-[1.65] mb-8 lg:mb-10 font-[300]">
                                Expert backend architecture that powers enterprise applications. We build
                                high-performance,
                                secure, and scalable server-side systems that handle millions of requests while
                                maintaining
                                data integrity and optimal performance at every scale.
                            </p>

                            <div className="flex flex-wrap gap-2 mb-10 lg:mb-12">
                                {['APIs', 'Databases', 'Scalability', 'Security', 'Performance', 'Microservices'].map((badge) => (
                                    <span key={badge}
                                          className="px-3 py-1.5 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 text-[0.7em] lg:text-[0.75em] font-[600] uppercase tracking-wider">
                                        {badge}
                                    </span>
                                ))}
                            </div>

                            <div className="flex flex-wrap gap-4 items-center">
                                <Link href="/contact">
                                    <button
                                        className="relative px-8 py-3 rounded-full text-[0.85em] lg:text-[0.88em] font-bold overflow-hidden hover:shadow-lg transition-shadow duration-300 whitespace-nowrap"
                                        style={{background: '#00f5d4', color: '#000'}}>
                                        <span className="absolute inset-0" style={{
                                            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)'
                                        }}/>
                                        <span className="relative">Discuss your project →</span>
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
                                    {label: 'APIs Built', value: '100+'},
                                    {label: 'Years Experience', value: '8+'},
                                    {label: 'Uptime Rate', value: '99.9%'},
                                    {label: 'Avg Response Time', value: '<50ms'}
                                ].map((stat) => (
                                    <div key={stat.label}
                                         className="p-4 rounded-lg border border-cyan-400/20 bg-cyan-400/5">
                                        <p className="text-cyan-400/60 text-[0.75em] uppercase tracking-wider font-[600] mb-2">{stat.label}</p>
                                        <p className="text-white text-[1.8em] lg:text-[2.2em] font-[700]">{stat.value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
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
                        <FxChip day={!isBackgroundActive ? !isDayTime : isDayTime}>BACKEND EXCELLENCE</FxChip>
                    </div>

                    <div className="lg:-ml-[19em]">
                        <FxReveal>
                            <h3 className="lg:text-[3.5em] md:text-[3em] text-[2em] font-[700] tracking-tight leading-[1.15] mt-4">
                                Powerful Server Architecture, <span
                                className="gx-gradient-text">Enterprise-Grade Infrastructure</span>
                            </h3>
                        </FxReveal>

                        <FxReveal delay={0.08}>
                            <div
                                className="grid lg:grid-cols-2 grid-cols-1 gap-6 mt-6 font-[300] text-justify text-[0.95em] md:text-[1.05em] leading-relaxed">
                                <div className="space-y-4">
                                    <p>Backend development is the cornerstone of every robust digital product. It's
                                        where scalability meets security, and where architecture directly impacts user
                                        experience. Our engineering approach combines system design excellence,
                                        performance optimization, and security-first principles to build backend systems
                                        that are not just functional, but strategically aligned with your business
                                        growth.</p>
                                    <p>We employ a rigorous, scalability-focused development process: technical
                                        architecture design, database optimization, API design patterns, security
                                        auditing, and performance benchmarking. Every microservice, database query, and
                                        endpoint is engineered for reliability, scalability, and maintainability under
                                        real-world production loads.</p>
                                    <div className="flex flex-wrap gap-3 mt-4">
                                        {['API Architecture', 'Database Design', 'System Scalability', 'Security-First'].map((p) => (
                                            <span key={p} className="gx-data-pill">{p}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <p>Whether building microservices for startups, optimizing legacy systems for
                                        enterprises, or scaling APIs handling millions of requests, we deliver
                                        production-ready infrastructure designed for performance. We ensure uptime
                                        targets are metÃ¢â‚¬â€99.9%+ availability, sub-50ms response times, optimal
                                        resource utilizationÃ¢â‚¬â€because backend reliability directly impacts
                                        revenue, user retention, and competitive advantage.</p>
                                    <p>Our end-to-end backend expertise spans architecture consultation, technical
                                        planning, service design, database optimization, API development, deployment
                                        automation, and continuous monitoring. We partner collaboratively with your
                                        team, providing transparent communication, security reviews, and strategic
                                        recommendationsÃ¢â‚¬â€focused on delivering systems that scale with your
                                        business and maintain peak performance through every growth milestone.</p>
                                    <div className="flex flex-wrap gap-3 mt-4">
                                        {['Microservices', 'Cloud Infrastructure', 'Real-time Systems', 'Data Persistence'].map((p) => (
                                            <span key={p} className="gx-data-pill">{p}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </FxReveal>
                    </div>
                </div>
            </section>

            {/* Top Image - Futuristic Backend Showcase (enhanced) */}
            <section id={'backend-showcase'}
                     className={'relative lg:max-w-full w-full py-24 mx-auto h-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em]'}>
                <div className={'relative grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-10 items-center'}>
                    {/* Left: Layered visual mockups with overlay effect */}
                    <div className="relative flex items-center justify-center group">
                        <div className="relative w-full max-w-2xl h-[750px]">
                            {/* Ambient gradient glow (decorative) */}
                            <div aria-hidden
                                 className="absolute -inset-3 rounded-2xl blur-3xl opacity-30 bg-gradient-to-tr from-cyan-400 via-blue-500 to-teal-600 transform-gpu rotate-6 pointer-events-none"/>

                            {/* Main Large Image - Background */}
                            <div
                                className="absolute inset-0 rounded-2xl overflow-hidden shadow-[0_30px_60px_rgba(2,6,23,0.6)] border border-white/8 bg-gradient-to-b from-black/40 to-black/20 transition-transform duration-700 will-change-transform group-hover:-translate-y-2 group-hover:scale-[1.01]">
                                <Image
                                    src={'/assets/back/first1.jpg'}
                                    alt={'Backend Architecture Mockup'}
                                    fill
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Secondary Smaller Image - Floating Overlay */}
                            <div
                                className="absolute bottom-0 right-0 w-48 h-40 rounded-2xl overflow-hidden shadow-[0_20px_40px_rgba(2,6,23,0.8)] border border-white/8 bg-gradient-to-b from-black/40 to-black/20 transition-all duration-700 will-change-transform group-hover:scale-110 group-hover:-translate-y-2 transform translate-x-8 translate-y-12">
                                <Image
                                    src={'/assets/back/first.jpg'}
                                    alt={'Infrastructure & Scalability'}
                                    fill
                                    className="w-full h-full object-cover"
                                />
                                <div
                                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <span className="text-xs text-teal-300 font-semibold">Infrastructure</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative flex flex-col gap-8">
                        {/* Floating detail cards with micro motion */}
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                {
                                    title: 'API Gateway',
                                    sub: 'High-throughput request routing',
                                    icon: 'M10 2a8 8 0 100 16 8 8 0 000-16z',
                                    color: 'from-cyan-400 to-blue-500'
                                },
                                {
                                    title: 'Database Optimization',
                                    sub: 'Advanced indexing & queries',
                                    icon: 'M3 3h14v14H3z',
                                    color: 'from-teal-400 to-cyan-500'
                                }
                            ].map((c, i) => (
                                <div key={i}
                                     className="bg-white/6 backdrop-blur-sm border border-white/6 rounded-xl px-3 py-3 shadow-lg transform transition-all duration-500 hover:-translate-y-1">
                                    <div className="flex items-start gap-2">
                                        <div
                                            className={`flex-none w-8 h-8 rounded-lg bg-gradient-to-br ${c.color} flex items-center justify-center flex-shrink-0`}>
                                            <svg width="16" height="16" viewBox="0 0 20 20"
                                                 className="text-black" fill="currentColor"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path d={c.icon}/>
                                            </svg>
                                        </div>
                                        <div className="min-w-0">
                                            <div className="text-xs text-slate-300 font-medium">{c.title}</div>
                                            <div className="mt-0.5 text-xs text-white/70">{c.sub}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Right: High-detail copy, KPIs, tech stack, and CTAs */}
                        <div className="relative">
                            <div className={`max-w-xl ${isDayTime ? 'text-slate-900' : 'text-slate-100'}`}>
                                <div className="inline-flex items-center gap-3 mb-4">
                                    <span
                                        className="px-3 py-1 rounded-full bg-gradient-to-r from-cyan-400 to-teal-400 text-black text-xs font-semibold tracking-wide">ENTERPRISE ARCHITECTURE</span>
                                    <span
                                        className="text-xs text-slate-400">Scalable Ã‚Â· Secure Ã‚Â· High-Performance</span>
                                </div>

                                <h3 className="text-3xl lg:text-4xl font-extrabold leading-tight tracking-tight">Backend
                                    Systems Ã¢â‚¬â€ Reliability, Scalability, Intelligence</h3>

                                <p className="mt-4 text-lg text-slate-400">Enterprise-grade backend infrastructure that
                                    powers mission-critical applications. We architect systems that handle millions of
                                    requests, ensure data integrity, and scale seamlessly as your business grows. Every
                                    component is engineered, tested, and validated for production excellence.</p>

                                <div className="mt-6 grid grid-cols-1 gap-4">
                                    <div className="flex items-start gap-3">
                                        <div
                                            className="flex-none w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-black font-semibold text-sm">AS
                                        </div>
                                        <div>
                                            <div className="text-sm font-semibold">Microservices Architecture</div>
                                            <div className="text-xs text-slate-400">Modular service design, container
                                                orchestration with Kubernetes, service mesh patterns, and circuit
                                                breaker patterns for resilient distributed systems.
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div
                                            className="flex-none w-10 h-10 rounded-lg bg-gradient-to-br from-blue-400 to-teal-500 flex items-center justify-center text-black font-semibold text-sm">DB
                                        </div>
                                        <div>
                                            <div className="text-sm font-semibold">Database Expertise</div>
                                            <div className="text-xs text-slate-400">SQL & NoSQL optimization, sharding
                                                strategies, replication & failover mechanisms, and data consistency
                                                patterns for mission-critical persistence.
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div
                                            className="flex-none w-10 h-10 rounded-lg bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center text-black font-semibold text-sm">RT
                                        </div>
                                        <div>
                                            <div className="text-sm font-semibold">Real-time Infrastructure</div>
                                            <div className="text-xs text-slate-400">WebSocket architectures, message
                                                brokers (RabbitMQ, Kafka), streaming pipelines, and event-driven systems
                                                for low-latency data synchronization.
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 flex items-center gap-4">
                                    <a href={'/contact'}
                                       className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-cyan-600 to-teal-600 text-white px-5 py-3 font-semibold shadow-lg hover:scale-[1.02] transition-transform">Start
                                        a project</a>
                                    <a href={'/portfolio'}
                                       className="inline-flex items-center justify-center rounded-xl border border-white/10 text-sm text-slate-300 px-4 py-2">View
                                        case studies</a>
                                </div>

                                <div className="mt-8 grid grid-cols-3 gap-3">
                                    <div className="bg-white/4 rounded-lg p-4">
                                        <div className="text-xs text-slate-300">Uptime SLA</div>
                                        <div className="text-xl font-bold">99.99%</div>
                                        <div className="text-[11px] text-slate-400 mt-1">Multi-region failover &
                                            redundancy
                                        </div>
                                    </div>
                                    <div className="bg-white/4 rounded-lg p-4">
                                        <div className="text-xs text-slate-300">Response Time</div>
                                        <div className="text-xl font-bold">&lt;50ms</div>
                                        <div className="text-[11px] text-slate-400 mt-1">P95 latency under peak load
                                        </div>
                                    </div>
                                    <div className="bg-white/4 rounded-lg p-4">
                                        <div className="text-xs text-slate-300">Data Security</div>
                                        <div className="text-xl font-bold">ISO 27001</div>
                                        <div className="text-[11px] text-slate-400 mt-1">End-to-end encryption &
                                            compliance
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Backend Development Services - Professional Futuristic Grid */}
            <section
                className={`relative lg:py-[5em] py-[2em] lg:my-[3em] lg:max-w-full w-full mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em] ${
                    isDayTime ? 'bg-white text-black' : 'bg-black text-white'}`}>

                {/* Background FX */}
                <FxBackground day={isDayTime}/>

                {/* Section Header */}
                <div className="relative z-10 mb-16">
                    <FxChip day={isDayTime}>SERVICE PORTFOLIO</FxChip>
                    <FxReveal>
                        <h2 className={'lg:text-[3.5em] md:text-[2.5em] text-[2em] font-[700] leading-[1.15] tracking-tight mt-4'}>
                            Core Backend Development <span className="gx-gradient-text">Services</span>
                        </h2>
                    </FxReveal>
                    <FxReveal delay={0.08}>
                        <p className={`text-[1.08em] leading-relaxed mt-4 max-w-3xl ${
                            isDayTime ? 'text-slate-600' : 'text-slate-400'
                        }`}>
                            Enterprise-grade backend solutions engineered for mission-critical applications. Each
                            service combines cutting-edge technology, rigorous security practices, and scalable
                            architecture patterns tailored to your specific business requirements and growth trajectory.
                        </p>
                    </FxReveal>
                </div>

                {/* Services Grid */}
                <div className="relative z-10 grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-6 lg:gap-8">
                    {[
                        {
                            id: 'api-development',
                            title: 'API Development & Integration',
                            icon: '/assets/back/icon/brand.svg',
                            tags: ['RESTful', 'GraphQL', 'OAuth 2.0', 'API Security'],
                            shortDesc: 'We design and build robust APIs that enable your application to seamlessly communicate with external systems, services, and data sources.',
                            description: 'Our API development expertise spans from straightforward RESTful endpoints to complex GraphQL implementations, designed to be secure, scalable, and easy to consume by third-party integrations, mobile clients, and web applications. We implement comprehensive API authentication (OAuth 2.0, API keys, JWT), rate limiting, caching strategies (Redis/Memcached), and comprehensive versioning protocols to ensure backward compatibility as your system evolves.',
                            details: 'Sub-100ms response times | OpenAPI/Swagger documentation | OWASP compliance | SDK generation | Webhook architectures | Performance monitoring | 99.95%+ availability SLA | Comprehensive error handling'
                        },
                        {
                            id: 'web-app-backend',
                            title: 'Web Application Backend Architecture',
                            icon: '/assets/back/icon/web.svg',
                            tags: ['SaaS', 'E-commerce', 'Scalability', 'Performance'],
                            shortDesc: 'We build production-grade backend systems for web applications that deliver strong performance and support long-term growth.',
                            description: 'Our web application backend solutions support everything from MVP SaaS platforms to high-traffic e-commerce systems. We design architectures that scale from 1,000 to 10+ million daily active users without requiring fundamental rework. Our approach includes database optimization with strategic indexing, connection pooling, asynchronous job processing, intelligent caching layers, and load balancing strategies that ensure optimal performance under peak demand. We implement zero-downtime deployment strategies, comprehensive backup systems, and disaster recovery procedures with defined RTO/RPO targets.',
                            details: '100K+ requests/second | Multi-database strategy | ACID transactions | Connection pooling | Job queues | Cache warming | Blue-green deployments | Multi-region redundancy | Automated scaling | Real-time metrics'
                        },
                        {
                            id: 'mobile-app-backend',
                            title: 'Mobile App Backend & Synchronization',
                            icon: '/assets/back/icon/weba.svg',
                            tags: ['iOS', 'Android', 'Offline Sync', 'Push Notifications'],
                            shortDesc: 'Our mobile app backend expertise ensures optimal server-side performance and seamless integration with mobile front-end implementations.',
                            description: 'Mobile backends demand specialized architectures considering unreliable networks, intermittent connectivity, battery constraints, and cross-platform compatibility. We implement intelligent offline-first sync engines with differential data updates, compressed payloads, and sophisticated retry mechanisms with exponential backoff. Our push notification infrastructure supports batch campaigns, segmentation, and A/B testing. We implement API versioning strategies supporting multiple app versions simultaneously, feature flagging for gradual rollouts, and comprehensive analytics integration for user behavior tracking and engagement optimization.',
                            details: 'Offline-first sync engine | Sub-200ms response times on 4G | Push notification management | Feature flagging | A/B testing infrastructure | Device management | Version compatibility | Network traffic optimization | Battery optimization | Real-time data synchronization'
                        },
                        {
                            id: 'custom-server',
                            title: 'Custom Server Configuration & Infrastructure',
                            icon: '/assets/back/icon/hybrid.svg',
                            tags: ['Infrastructure', 'Optimization', 'Reliability', 'Compliance'],
                            shortDesc: 'We design, configure, and optimize high-performance servers tailored to your specific use case and operational requirements.',
                            description: 'Custom server development addresses unique infrastructure requirements that off-the-shelf solutions cannot accommodate. We conduct comprehensive capacity planning analysis, implement load balancing across multiple servers, configure auto-scaling policies based on traffic patterns and resource utilization metrics. Our approach includes security hardening (firewall rules, intrusion detection, DDoS mitigation), performance tuning (kernel optimization, memory management), monitoring dashboards with alerting, and comprehensive logging for security and compliance auditing. We ensure 99.99% uptime availability through redundancy, failover mechanisms, and proactive health monitoring.',
                            details: '99.99% uptime SLA | Multi-server load balancing | Auto-scaling based on metrics | Security hardening | DDoS protection | Comprehensive logging | Real-time monitoring | Incident response procedures | Performance optimization | Compliance auditing'
                        },
                        {
                            id: 'custom-backend',
                            title: 'Custom Backend Systems & Architecture Design',
                            icon: '/assets/back/icon/mobile.svg',
                            tags: ['Architecture', 'Enterprise', 'Scalability', 'Security'],
                            shortDesc: 'We build custom backend systems from the ground up, tailored to your specific business requirements and technical constraints.',
                            description: 'Our custom backend solutions represent end-to-end system design, from detailed requirements analysis through production deployment and ongoing optimization. We conduct comprehensive technical discovery sessions to understand your business processes, competitive requirements, and growth projections. Our architectural approach includes detailed system design documentation, database schema optimization for your access patterns, microservices boundaries using domain-driven design principles, API contract specifications, security architecture reviews, and comprehensive test coverage (unit, integration, end-to-end, performance, security). We implement industry best practices for error handling, logging, monitoring, and observability to ensure production readiness.',
                            details: 'Comprehensive architecture design | Domain-driven design | Database optimization | Microservices patterns | Security architecture | Comprehensive testing | Error handling strategies | Logging & monitoring | Performance benchmarking | Production deployment support'
                        },
                        {
                            id: 'cloud-backend',
                            title: 'Cloud Infrastructure & Multi-Cloud Strategy',
                            icon: '/assets/back/icon/pwa.svg',
                            tags: ['AWS', 'GCP', 'Azure', 'Infrastructure-as-Code'],
                            shortDesc: 'We architect cloud-native infrastructure leveraging AWS, GCP, and Azure for scalability, cost-efficiency, and high availability.',
                            description: 'Our cloud infrastructure expertise spans multi-cloud strategies, Infrastructure-as-Code (Terraform, CloudFormation), containerization (Docker), orchestration (Kubernetes), and serverless architectures. We design cost-optimized cloud solutions through resource right-sizing, reserved instance strategies, and automated cost analysis. Our CI/CD pipelines enable rapid deployment with automated testing, security scanning, and progressive rollout strategies. We implement comprehensive disaster recovery procedures with geographic redundancy, automated failover, and RPO/RTO targets aligned to business requirements. We provide ongoing cloud optimization consulting to continuously reduce operational costs while improving performance and reliability.',
                            details: 'Multi-cloud capability | Infrastructure-as-Code | Cost optimization | Containerization | Kubernetes orchestration | Serverless patterns | CI/CD automation | Disaster recovery | Geographic redundancy | Continuous optimization'
                        },
                        {
                            id: 'code-audits',
                            title: 'Backend Code Audits & Performance Optimization',
                            icon: '/assets/back/icon/back.svg',
                            tags: ['Security Audit', 'Performance', 'Optimization', 'Compliance'],
                            shortDesc: 'We conduct comprehensive audits of existing backend systems to identify vulnerabilities, inefficiencies, and architectural improvements.',
                            description: 'Our code audit services provide deep technical analysis of your existing backend infrastructure. We conduct vulnerability scanning (OWASP Top 10), performance profiling to identify bottlenecks, query optimization analysis, architectural review against industry best practices, and security compliance verification. Our detailed audit reports include executive summaries, technical findings with severity ratings, remediation roadmaps with prioritization, cost-benefit analysis for recommended improvements, and estimated implementation timelines. We deliver not just problems, but actionable solutions with clear business impact metrics. Our typical optimization projects deliver 50–300% query performance improvements, reduce p95 latency by 70%+, and lower database operational costs by 40–60%.',
                            details: 'OWASP vulnerability scanning | Performance profiling | Query optimization analysis | Architecture review | Security compliance verification | Remediation roadmap | Cost-benefit analysis | Implementation timelines | Detailed reporting | Post-audit support'
                        },
                        {
                            id: 'legacy-modernization',
                            title: 'Legacy System Modernization & Migration',
                            icon: '/assets/back/icon/legacy.svg',
                            tags: ['Migration', 'Modernization', 'Technical Debt', 'Scalability'],
                            shortDesc: 'We specialize in transforming legacy backend systems into modern, scalable, and maintainable architectures.',
                            description: 'Legacy system modernization requires careful planning to minimize disruption while maximizing improvements. We employ incremental migration strategies that allow your business to continue operating while we gradually transform your infrastructure. Our approach includes detailed legacy system analysis, identification of technical debt and inefficiencies, design of modern architecture aligned with current best practices, phased migration planning with minimal downtime, and comprehensive testing at each phase. We implement API-first approaches that maintain backward compatibility while gradually transitioning to modern systems. Our modernization projects typically improve system maintainability by 80%+, reduce operational costs by 30–50%, improve performance by 2–5x, and dramatically improve developer productivity by reducing complexity and improving code clarity.',
                            details: 'Incremental migration strategy | Legacy system analysis | Technical debt assessment | Modern architecture design | API-first approach | Phased implementation | Backward compatibility | Comprehensive testing | Minimal downtime | Knowledge transfer'
                        },
                    ].map((service, index) => (
                        <motion.div
                            key={service.id}
                            initial={{opacity: 0, y: 20}}
                            whileInView={{opacity: 1, y: 0}}
                            transition={{duration: 0.5, delay: index * 0.1}}
                            className={`group relative rounded-2xl border overflow-hidden transition-all duration-500 hover:scale-105 ${
                                isDayTime
                                    ? 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-400/20'
                                    : 'bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-400/30'
                            }`}
                        >
                            {/* Gradient Background Overlay */}
                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-cyan-500/10 to-teal-500/10 pointer-events-none"/>

                            {/* Content Container */}
                            <div className="relative z-10 p-6 lg:p-8 h-full flex flex-col">
                                {/* Icon */}
                                <div
                                    className={`inline-flex items-center justify-center w-14 h-14 rounded-xl mb-4 transition-transform duration-500 group-hover:scale-110 ${
                                        isDayTime ? 'bg-black/5' : 'bg-white/10'
                                    }`}>
                                    <Image
                                        src={isDayTime ? service.icon.replace('.svg', '1.svg') : service.icon}
                                        alt={service.title}
                                        width={32}
                                        height={32}
                                        className="w-8 h-8"
                                    />
                                </div>

                                {/* Title */}
                                <h3 className={`text-xl lg:text-2xl font-[700] mb-2 transition-colors duration-300 ${
                                    isDayTime ? 'text-black group-hover:text-cyan-600' : 'text-white group-hover:text-cyan-300'
                                }`}>
                                    {service.title}
                                </h3>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {service.tags.map(tag => (
                                        <span key={tag}
                                              className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-300 whitespace-nowrap ${
                                                  isDayTime
                                                      ? 'bg-cyan-100 text-cyan-700 group-hover:bg-cyan-200'
                                                      : 'bg-cyan-900/30 text-cyan-300 group-hover:bg-cyan-900/50'
                                              }`}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Short Description */}
                                <p className={`text-sm leading-relaxed mb-4 font-medium ${
                                    isDayTime ? 'text-slate-700' : 'text-slate-300'
                                }`}>
                                    {service.shortDesc}
                                </p>

                                {/* Full Description */}
                                <p className={`text-sm lg:text-base leading-relaxed mb-4 ${
                                    isDayTime ? 'text-slate-600' : 'text-slate-400'
                                }`}>
                                    {service.description}
                                </p>

                                {/* Details Highlight - Grows to fill available space */}
                                <div
                                    className={`pt-4 border-t mt-auto ${isDayTime ? 'border-gray-200' : 'border-slate-700'}`}>
                                    <p className={`text-xs lg:text-sm font-medium leading-relaxed ${
                                        isDayTime ? 'text-slate-600' : 'text-slate-400'
                                    }`}>
                                        <span className="font-semibold block mb-2">Key Capabilities:</span>
                                        {service.details}
                                    </p>
                                </div>

                                {/* Arrow Indicator */}
                                <div
                                    className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:translate-x-1">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                        isDayTime ? 'bg-cyan-600' : 'bg-cyan-500'
                                    }`}>
                                        <span className="text-white font-bold">→</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Backend Development Services Overview - Enhanced with FxStickyScrollSection */}
            <FxStickyScrollSection
                day={isDayTime}
                heading={<>Backend Development<br/>services overview</>}
                intro="Our backend development services architect scalable, secure, and high-performance server infrastructure engineered to power sophisticated digital experiences. We combine enterprise-grade design patterns, rigorous security practices, and cutting-edge technologies to create robust systems that evolve with your business while delivering measurable ROI and operational excellence."
                navLabel="Backend Solutions"
                activeId={activeId}
                onNavClickAction={scrollToSection}
                items={[
                    {
                        id: "01",
                        title: "API Development & Integration",
                        target: "AD",
                        tags: ["RESTful APIs", "GraphQL", "Third-party Integration", "OAuth 2.0"],
                        body: (
                            <div>
                                <p>
                                    APIs are the essential bridge between your backend infrastructure and the broader
                                    digital ecosystem. We design and develop secure, scalable, well-architected APIs
                                    that enable seamless communication across platforms, services, and internal systems.
                                    Whether building RESTful endpoints for traditional client-server architectures or
                                    leveraging GraphQL for flexible, efficient data fetching, we architect APIs that
                                    prioritize developer experience, performance, and maintainability. Our
                                    implementation includes comprehensive documentation, automated testing, rate
                                    limiting, caching strategies, and security hardening with OAuth 2.0/JWT
                                    authentication.
                                </p>
                                <p className="mt-3">
                                    Typical integrations span payment gateways (Stripe, PayPal), social platforms
                                    (OAuth), CRM systems, analytics services, and proprietary enterprise solutions. We
                                    deliver API gateway configurations, versioning strategies, detailed OpenAPI/Swagger
                                    specifications, and client SDKs. Projects typically span 4Ã¢â‚¬â€œ8 weeks for MVP
                                    APIs; enterprise integration architectures requiring multi-year evolution frameworks
                                    extend 12Ã¢â‚¬â€œ16 weeks. Performance targets: sub-100ms p95 latency, 99.95%
                                    availability SLA, comprehensive logging and monitoring instrumentation.
                                </p>
                            </div>
                        ),
                    },
                    {
                        id: "02",
                        title: "Web Application Backend Architecture",
                        target: "WAB",
                        tags: ["Microservices", "Domain-Driven Design", "Database Design", "Scalability"],
                        body: (
                            <div>
                                <p>
                                    Enterprise web applications demand sophisticated backend architectures capable of
                                    supporting millions of daily users. We architect modular, loosely-coupled systems
                                    using microservices patterns, event-driven architectures, and domain-driven design
                                    principles. Our approach begins with deep business requirement analysis, domain
                                    modeling, and technology selection aligned to your growth trajectory. We design for
                                    horizontal scalability, implement circuit breakers and service mesh infrastructure,
                                    and establish clear API contracts between services.
                                </p>
                                <p className="mt-3">
                                    Deliverables include comprehensive architecture documentation, service decomposition
                                    diagrams, database schema design with normalization/denormalization strategies,
                                    distributed transaction patterns (sagas), and DevOps-ready deployment
                                    configurations. We support 10M+ daily active users with zero-downtime deployments,
                                    multi-region redundancy, and 99.99% availability targets. Typical engagements span
                                    8Ã¢â‚¬â€œ16 weeks for foundational architecture; ongoing optimization and scaling
                                    represents 40Ã¢â‚¬â€œ50% efficiency gains within 6 months of deployment through
                                    caching, indexing, and asynchronous processing strategies.
                                </p>
                            </div>
                        ),
                    },
                    {
                        id: "03",
                        title: "Mobile App Backend & Synchronization",
                        target: "MAB",
                        tags: ["Real-time Sync", "Push Notifications", "Offline Support", "Data Consistency"],
                        body: (
                            <div>
                                <p>
                                    Mobile applications require specialized backend infrastructure handling offline
                                    scenarios, real-time synchronization, push notifications, and bandwidth
                                    optimization. We build resilient backends supporting offline-first architectures
                                    with eventual consistency models, change data capture (CDC) for sync mechanisms, and
                                    conflict resolution strategies. Our implementations include comprehensive push
                                    notification systems (Firebase, OneSignal), A/B testing frameworks, feature flag
                                    infrastructure, and analytics instrumentation tracking user behavior across
                                    touchpoints.
                                </p>
                                <p className="mt-3">
                                    Deliverables include sync protocol specification, offline queue management systems,
                                    real-time push infrastructure with deep linking, usage analytics dashboards, and
                                    mobile-optimized API endpoints. We reduce sync overhead by 70% through delta
                                    synchronization and intelligent batching. Feature management infrastructure enables
                                    100% rollout automation. Projects span 6Ã¢â‚¬â€œ12 weeks for MVP backends;
                                    enterprise applications with complex sync requirements and white-label support
                                    extend 14Ã¢â‚¬â€œ20 weeks. Typical performance: sub-500ms sync times, 99.9% message
                                    delivery reliability, support for 100K+ concurrent connected clients.
                                </p>
                            </div>
                        ),
                    },
                    {
                        id: "04",
                        title: "Custom Server Configuration & Infrastructure",
                        target: "CSC",
                        tags: ["99.99% Uptime", "DDoS Protection", "Security Hardening", "Compliance"],
                        body: (
                            <div>
                                <p>
                                    Enterprise applications demand more than commodity hostingÃ¢â‚¬â€they require
                                    purpose-built infrastructure with enterprise-grade security, disaster recovery, and
                                    compliance capabilities. We configure highly available server environments with
                                    redundancy across availability zones, automated failover, and load balancing. Our
                                    infrastructure implementations include DDoS mitigation, Web Application Firewalls
                                    (WAF), SSL/TLS termination, and security hardening following CIS benchmarks. We
                                    implement infrastructure-as-code (Terraform, CloudFormation) for reproducibility and
                                    disaster recovery.
                                </p>
                                <p className="mt-3">
                                    Deliverables include infrastructure documentation, monitoring and alerting
                                    configurations, automated backup and recovery procedures, security audit reports,
                                    and compliance attestations (SOC 2, HIPAA, GDPR). We achieve 99.99% uptime through
                                    multi-region active-active deployments and automated incident response.
                                    Implementation spans 4Ã¢â‚¬â€œ8 weeks for straightforward setups; complex compliance
                                    requirements (fintech, healthcare) require 10Ã¢â‚¬â€œ16 weeks. Ongoing management
                                    typically represents 15Ã¢â‚¬â€œ25% infrastructure cost savings through optimization
                                    and right-sizing.
                                </p>
                            </div>
                        ),
                    },
                    {
                        id: "05",
                        title: "Custom Backend Systems & Architecture Design",
                        target: "CBS",
                        tags: ["Domain-Driven Design", "Clean Architecture", "SOLID Principles", "Testing"],
                        body: (
                            <div>
                                <p>
                                    Building sophisticated backend systems requires more than codeÃ¢â‚¬â€it demands
                                    disciplined architecture applying domain-driven design, clean architecture
                                    principles, and SOLID design patterns. We architect layered systems with clear
                                    separation of concerns: presentation, application, domain, and infrastructure
                                    layers. Our approach emphasizes testability, maintainability, and scalability
                                    through rigorous design patterns, comprehensive test coverage (unit, integration,
                                    end-to-end), and continuous refactoring to maintain code quality over time.
                                </p>
                                <p className="mt-3">
                                    Deliverables include architecture decision records (ADRs), comprehensive design
                                    documentation, test coverage reports (&gt;80% target), design pattern implementation
                                    guides, and technology stack recommendations. We establish automated quality gates
                                    enforcing test coverage, code complexity analysis, and security scanning. Projects
                                    span 6Ã¢â‚¬â€œ12 weeks for architecture design and initial implementation;
                                    50Ã¢â‚¬â€œ70% of initial scope typically represents architectural refactoring and
                                    optimization. Continuous architecture evolution ensures systems remain maintainable
                                    as they scale from 10K to 10M requests daily.
                                </p>
                            </div>
                        ),
                    },
                    {
                        id: "06",
                        title: "Cloud Infrastructure & Multi-Cloud Strategy",
                        target: "CIM",
                        tags: ["AWS", "Google Cloud", "Multi-Cloud", "Cost Optimization"],
                        body: (
                            <div>
                                <p>
                                    Cloud computing offers unprecedented scalability, but maximizing value requires
                                    strategic planning and expert implementation. We architect cloud-native solutions
                                    leveraging managed services (Lambda, Cloud Run, RDS, Firestore) to reduce
                                    operational overhead while improving scalability and reliability. Our multi-cloud
                                    strategies prevent vendor lock-in through abstraction layers and portable container
                                    architectures, enabling optimal service selection from each provider's strongest
                                    offerings. We implement infrastructure-as-code across clouds using Terraform,
                                    enabling reproducible deployments and disaster recovery.
                                </p>
                                <p className="mt-3">
                                    Deliverables include cloud architecture diagrams, cost optimization analysis
                                    (typically 30Ã¢â‚¬â€œ50% savings through reserved instances and resource
                                    right-sizing), containerization strategies (Docker, Kubernetes), CI/CD pipelines,
                                    and disaster recovery procedures. Multi-cloud implementations span 8Ã¢â‚¬â€œ16 weeks
                                    for greenfield projects; existing workload cloud migrations typically require
                                    12Ã¢â‚¬â€œ24 weeks. Post-deployment, continuous optimization delivers 40Ã¢â‚¬â€œ60%
                                    cost improvements within the first year through RI purchasing, spot instances, and
                                    workload consolidation.
                                </p>
                            </div>
                        ),
                    },
                    {
                        id: "07",
                        title: "Backend Code Audits & Performance Optimization",
                        target: "BCA",
                        tags: ["Performance Analysis", "OWASP Compliance", "Cost-Benefit", "Optimization"],
                        body: (
                            <div>
                                <p>
                                    Existing backend systems often accumulate technical debt, performance bottlenecks,
                                    and security vulnerabilities. Our comprehensive code audits and performance analysis
                                    examine architecture efficiency, database query performance, caching strategies,
                                    security posture (OWASP Top 10), and operational costs. We profile systems under
                                    production load, identify latency hotspots, analyze resource utilization, and
                                    recommend targeted optimizations with ROI projections. Our approach combines
                                    automated analysis tools with expert manual review.
                                </p>
                                <p className="mt-3">
                                    Deliverables include detailed audit reports with findings categorized by severity
                                    and remediation effort, cost-benefit analysis for optimization recommendations,
                                    performance baseline metrics, and prioritized remediation roadmap. Typical systems
                                    achieve 50Ã¢â‚¬â€œ300% performance improvements through query optimization
                                    (70Ã¢â‚¬â€œ80% latency reduction), strategic caching, connection pooling, and
                                    asynchronous processing. Audits typically span 2Ã¢â‚¬â€œ4 weeks; implementation of
                                    high-impact recommendations (80/20 rule) spans 4Ã¢â‚¬â€œ8 weeks. Security audit
                                    findings are immediately actionable: 15Ã¢â‚¬â€œ30% of issues are critical/high
                                    severity requiring urgent remediation.
                                </p>
                            </div>
                        ),
                    },
                    {
                        id: "08",
                        title: "Legacy System Modernization & Migration",
                        target: "LSM",
                        tags: ["Incremental Migration", "Backward Compatibility", "Zero Downtime", "Strangler Fig"],
                        body: (
                            <div>
                                <p>
                                    Legacy systems represent significant business value but often constrain innovation
                                    and impose operational overhead. We design and execute incremental modernization
                                    strategies using the Strangler Fig pattern, gradually replacing legacy components
                                    with modern services while maintaining backward compatibility and zero-downtime
                                    deployments. Our approach prioritizes business continuity, minimal risk, and
                                    measurable value delivery at each phase. We establish clear success metrics:
                                    performance gains, cost reduction, developer productivity, and capability expansion.
                                </p>
                                <p className="mt-3">
                                    Deliverables include modernization roadmap spanning 12Ã¢â‚¬â€œ36 months, phased
                                    migration plan with rollback procedures, parallel run testing protocols, and
                                    comprehensive cutover documentation. We reduce technical debt by 60Ã¢â‚¬â€œ80%
                                    through measured steps, achieving immediate value (20% cost reduction, 30%
                                    performance improvement) while positioning systems for future growth. Each phase
                                    delivers tangible business outcomes: reduced maintenance burden, faster feature
                                    delivery, improved reliability. Legacy systems modernized using our approach
                                    consistently show 2Ã¢â‚¬â€œ3x capability improvements within 18 months while
                                    reducing total cost of ownership by 40Ã¢â‚¬â€œ60%.
                                </p>
                            </div>
                        ),
                    },
                ]}
            />

            {/* Backend Technologies */}
            <div
                className={`${isDayTime ? 'bg-gradient-to-br from-white to-slate-50' : 'bg-gradient-to-br from-black to-slate-900'}`}>
                <div id={'backend technology'}
                     className={`relative py-24 lg:mb-16 mb-10 max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>

                    {/* Header - futurist, concise */}
                    <div
                        className={`relative grid lg:grid-cols-2 grid-cols-1 lg:gap-14 gap-6 ${
                            isDayTime ? 'text-slate-900' : 'text-slate-100'
                        }`}>
                        <div className='min-w-0'>
                            <h2 className='text-[1em] sm:text-[1.6em] md:text-[2.2em] lg:text-[3.3em] font-[600] tracking-tight leading-[1.05] lg:pb-6'>
                                Backend Architecture —
                                <span
                                    className={'block text-[0.7em] sm:text-[0.9em] md:text-[1em] font-[400] mt-1 opacity-80'}>
                                    Scalable, resilient systems engineered for the next decade
                                </span>
                            </h2>
                        </div>

                        <div className='lg:ml-0 lg:pl-[3.5rem] min-w-0'>
                            <p className='text-[0.95em] font-[300] leading-[1.6]'>
                                Selection driven by project constraints: latency budget, concurrency, operational
                                complexity and long-term maintainability. Below are curated platform patterns — each
                                entry lists strengths, ideal use-cases and maturity signals to help align tech to
                                business outcomes.
                            </p>

                            <div className='mt-4 flex gap-3 items-center'>
                                <span
                                    className='inline-block text-[0.75em] px-3 py-1 rounded-full bg-opacity-10 border border-current'>
                                    Strategy: API-first • Cloud-native • Observability
                                </span>
                                <span
                                    className='inline-block text-[0.75em] px-3 py-1 rounded-full bg-opacity-10 border border-current'>
                                    Delivery: CI/CD • IaC • Automated testing
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Tools grid: futuristic cards with details */}
                    <div id={'tools'}
                         className={`relative w-full h-auto grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-8 lg:mt-[3em] md:mt-[2em] sm:mt-[1.5em] mt-[1em] ${
                             isDayTime ? 'text-slate-900' : 'text-slate-100'
                         }`}>

                        {/* Card: Next.js */}
                        <div id={'next'}
                             className={'relative p-6 rounded-2xl backdrop-blur-sm border border-opacity-10 shadow-lg bg-opacity-40 flex gap-4 items-start flex-col lg:flex-row'}>
                            <div className={'flex-none mt-1'}>
                                <Image
                                    src={isDayTime ? '/assets/back/icon/next.svg' : '/assets/back/icon/next1.svg'}
                                    alt={'Next.js'}
                                    width={56}
                                    height={56}
                                />
                            </div>
                            <div className={'flex-1 lg:ml-0'}>
                                <div className='flex items-baseline justify-between'>
                                    <h6 className={'text-[1.6em] font-[700] mb-1'}>Next.js</h6>
                                    <div className='text-[0.75em] opacity-80'>Stable • Edge-ready</div>
                                </div>

                                <p className={'text-[0.95em] leading-[1.5] text-justify'}>
                                    Next.js combines hybrid rendering (SSR/SSG/ISR) with edge-execution, enabling
                                    sub-second time-to-first-byte and SEO-friendly content delivery. Recommended for
                                    consumer-facing platforms with heavy SEO, personalization at the edge, or where
                                    server-side logic and static generation coexist.
                                </p>

                                <ul className='mt-3 text-[0.85em] grid grid-cols-2 gap-2'>
                                    <li>Strengths: SSR/SSG/ISR, Edge Functions, Image &amp; Asset optimisation</li>
                                    <li>When to choose: Content sites, e-commerce, landing pages with dynamic widgets
                                    </li>
                                    <li>Operational notes: Prefer CDN + edge runtime (Vercel, Cloudflare) for scale</li>
                                    <li>Testing &amp; Observability: Jest/Playwright, Sentry, Real User Monitoring</li>
                                    <li>Security / Auth: HTTP security headers, JWT/OAuth for APIs, server-side session
                                        hardening
                                    </li>
                                    <li>Trade-offs: Complex server logic at scale may require API microservices or BFF
                                        layer
                                    </li>
                                </ul>

                                <div className='mt-4 flex items-center gap-4'>
                                    <Link href={'/services/Nextjs-Development'}
                                          className={`inline-flex items-center text-[0.9em] font-medium ${isDayTime ? 'text-slate-800' : 'text-white'}`}>
                                        <span className='border-b pb-[0.05em]'>Next.js Development</span>
                                    </Link>

                                    <Link href={'/services/Reactjs-Development'}
                                          className={'ml-4 text-[0.85em] opacity-80'}>
                                        React integration &amp; component-driven UX
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Card: Symfony */}
                        <div id={'symfony'}
                             className={'relative p-6 rounded-2xl backdrop-blur-sm border border-opacity-10 shadow-lg bg-opacity-40 flex gap-4 items-start flex-col lg:flex-row'}>
                            <div className={'flex-none mt-1'}>
                                <Image
                                    src={isDayTime ? '/assets/back/icon/sym.svg' : '/assets/back/icon/sym1.svg'}
                                    alt={'Symfony'}
                                    width={56}
                                    height={56}
                                />
                            </div>
                            <div className={'flex-1 lg:ml-0'}>
                                <div className='flex items-baseline justify-between'>
                                    <h6 className={'text-[1.6em] font-[700] mb-1'}>Symfony</h6>
                                    <div className='text-[0.75em] opacity-80'>Enterprise • Componentized</div>
                                </div>

                                <p className={'text-[0.95em] leading-[1.45] text-justify'}>
                                    Symfony provides a proven component-based architecture and strict conventions
                                    ideal for large codebases, domain-driven design, and long-term maintainability.
                                    Favoured where predictable upgrade paths, dependency injection, and testability
                                    are priorities.
                                </p>

                                <ul className='mt-3 text-[0.85em] grid grid-cols-2 gap-2'>
                                    <li>Strengths: Reusable components, DI, robust HTTP kernel</li>
                                    <li>When to choose: Enterprise apps, complex domain models, APIs</li>
                                    <li>Deployment: PHP-FPM / FPM + nginx, Docker, or platform services</li>
                                    <li>Operational notes: Long-term support versions, strong migration tooling</li>
                                    <li>Security &amp; Testing: Security component, CSRF/XSS protections,
                                        PHPUnit &amp; Behat
                                    </li>
                                    <li>Trade-offs: Heavier learning curve vs micro-frameworks; upfront architecture
                                        investment
                                    </li>
                                </ul>

                                <div className='mt-4 flex items-center gap-4'>
                                    <Link href={'/services/PHP-Development'}
                                          className={`inline-flex items-center text-[0.9em] font-medium ${isDayTime ? 'text-slate-800' : 'text-white'}`}>
                                        <span className='border-b pb-[0.05em]'>PHP Development</span>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Card: .NET */}
                        <div id={'net'}
                             className={'relative p-6 rounded-2xl backdrop-blur-sm border border-opacity-10 shadow-lg bg-opacity-40 flex gap-4 items-start flex-col lg:flex-row'}>
                            <div className={'flex-none mt-1'}>
                                <Image
                                    src={isDayTime ? '/assets/back/icon/net.png' : '/assets/back/icon/net1.png'}
                                    alt={'.NET'}
                                    width={56}
                                    height={56}
                                />
                            </div>
                            <div className={'flex-1 lg:ml-0'}>
                                <div className='flex items-baseline justify-between'>
                                    <h6 className={'text-[1.6em] font-[700] mb-1'}>.NET</h6>
                                    <div className='text-[0.75em] opacity-80'>Cross-platform • High-throughput</div>
                                </div>

                                <p className={'text-[0.95em] leading-[1.45] text-justify'}>
                                    ASP.NET Core delivers a high-performance, cross-platform runtime suitable for
                                    latency-sensitive services, high-throughput APIs and compute-heavy workloads.
                                    Strong typing and first-class tooling reduce runtime surprises and improve
                                    maintainability in large teams.
                                </p>

                                <ul className='mt-3 text-[0.85em] grid grid-cols-2 gap-2'>
                                    <li>Strengths: Performance, strong typing, mature ecosystem (EF Core, gRPC)</li>
                                    <li>When to choose: Financial systems, analytics, low-latency services</li>
                                    <li>Deployment: Kestrel behind nginx/Envoy, containers, Kubernetes, AOT for
                                        cold-start
                                    </li>
                                    <li>Observability &amp; Ops: Serilog, Application Insights, GC tuning, Prometheus
                                    </li>
                                    <li>Resilience: Retry/circuit-breaker with Polly, connection pooling</li>
                                    <li>Security: IdentityServer/ASP.NET Identity, secure TLS defaults, code access
                                        audits
                                    </li>
                                </ul>

                                <div className='mt-4 flex items-center gap-4'>
                                    <Link href={'/services/Net-Development'}
                                          className={`inline-flex items-center text-[0.9em] font-medium ${isDayTime ? 'text-slate-800' : 'text-white'}`}>
                                        <span className='border-b pb-[0.05em]'>Net Development</span>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Card: Laravel */}
                        <div id={'laravel'}
                             className={'relative p-6 rounded-2xl backdrop-blur-sm border border-opacity-10 shadow-lg bg-opacity-40 flex gap-4 items-start flex-col lg:flex-row'}>
                            <div className={'flex-none mt-1'}>
                                <Image
                                    src={isDayTime ? '/assets/back/icon/laravel.svg' : '/assets/back/icon/laravel1.svg'}
                                    alt={'Laravel'}
                                    width={56}
                                    height={56}
                                />
                            </div>
                            <div className={'flex-1 lg:ml-0'}>
                                <div className='flex items-baseline justify-between'>
                                    <h6 className={'text-[1.6em] font-[700] mb-1'}>Laravel</h6>
                                    <div className='text-[0.75em] opacity-80'>Developer-friendly • Rapid</div>
                                </div>

                                <p className={'text-[0.95em] leading-[1.45] text-justify'}>
                                    Laravel emphasises developer ergonomics with batteries-included conventions:
                                    expressive
                                    ORM (Eloquent), first-class queueing, and integrated tooling for authentication and
                                    caching. Well-suited for rapid product iteration while keeping patterns
                                    maintainable.
                                </p>

                                <ul className='mt-3 text-[0.85em] grid grid-cols-2 gap-2'>
                                    <li>Strengths: Eloquent ORM, queues, developer productivity</li>
                                    <li>When to choose: MVPs, SaaS, admin dashboards with rapid iteration needs</li>
                                    <li>Scaling: Horizontal scaling with stateless app servers, Redis queues, database
                                        replicas
                                    </li>
                                    <li>Deployment &amp; Ops: Forge / Vapor, containerised pipelines, robust CI/CD</li>
                                    <li>Testing &amp; Security: PHPUnit, Pest; built-in auth scaffolding and CSRF
                                        protection
                                    </li>
                                    <li>Trade-offs: For extreme concurrency, consider services in strongly-typed
                                        runtimes
                                    </li>
                                </ul>

                                <div className='mt-4 flex items-center gap-4'>
                                    <Link href={'/services/Laravel-Development'}
                                          className={`inline-flex items-center text-[0.9em] font-medium ${isDayTime ? 'text-slate-800' : 'text-white'}`}>
                                        <span className='border-b pb-[0.05em]'>Laravel Development</span>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Card: Ruby on Rails */}
                        <div id={'ruby'}
                             className={'relative p-6 rounded-2xl backdrop-blur-sm border border-opacity-10 shadow-lg bg-opacity-40 flex gap-4 items-start flex-col lg:flex-row'}>
                            <div className={'flex-none mt-1'}>
                                <Image
                                    src={isDayTime ? '/assets/back/icon/ruby.svg' : '/assets/back/icon/ruby1.svg'}
                                    alt={'Ruby on Rails'}
                                    width={56}
                                    height={56}
                                />
                            </div>
                            <div className={'flex-1 lg:ml-0'}>
                                <div className='flex items-baseline justify-between'>
                                    <h6 className={'text-[1.6em] font-[700] mb-1'}>Ruby on Rails</h6>
                                    <div className='text-[0.75em] opacity-80'>Convention • Speed-to-market</div>
                                </div>

                                <p className={'text-[0.95em] leading-[1.45] text-justify'}>
                                    Rails provides rapid developer velocity through opinionated conventions and a
                                    rich ecosystem. It's a strong choice for startups and marketplaces that prioritise
                                    fast iteration while keeping an eye on maintainability via well-established
                                    patterns.
                                </p>

                                <ul className='mt-3 text-[0.85em] grid grid-cols-2 gap-2'>
                                    <li>Strengths: Strong defaults, rich gems ecosystem, fast prototyping</li>
                                    <li>When to choose: Marketplaces, MVPs, SaaS with quick feature cycles</li>
                                    <li>Performance &amp; Ops: Use Sidekiq for background work, connection pooling for
                                        DB
                                    </li>
                                    <li>Scalability: Horizontally scale app servers, optimise DB queries and caching
                                    </li>
                                    <li>Testing &amp; Quality: RSpec, Minitest, continuous regression suites</li>
                                    <li>Trade-offs: CPU-bound workloads may need service extraction into other
                                        runtimes
                                    </li>
                                </ul>

                                <div className='mt-4 flex items-center gap-4'>
                                    <Link href={'/services/Ruby-on-Rails'}
                                          className={`inline-flex items-center text-[0.9em] font-medium ${isDayTime ? 'text-slate-800' : 'text-white'}`}>
                                        <span className='border-b pb-[0.05em]'>Ruby on Rails Development</span>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Card: Node.js */}
                        <div id={'node'}
                             className={'relative p-6 rounded-2xl backdrop-blur-sm border border-opacity-10 shadow-lg bg-opacity-40 flex gap-4 items-start flex-col lg:flex-row'}>
                            <div className={'flex-none mt-1'}>
                                <Image
                                    src={isDayTime ? '/assets/back/icon/node.svg' : '/assets/back/icon/node1.svg'}
                                    alt={'Node.js'}
                                    width={56}
                                    height={56}
                                />
                            </div>
                            <div className={'flex-1 lg:ml-0'}>
                                <div className='flex items-baseline justify-between'>
                                    <h6 className={'text-[1.6em] font-[700] mb-1'}>Node.js</h6>
                                    <div className='text-[0.75em] opacity-80'>Event-driven • Lightweight</div>
                                </div>

                                <p className={'text-[0.95em] leading-[1.45] text-justify'}>
                                    Node.js is optimal for high-concurrency, I/O-bound workloads and real-time
                                    platforms. When combined with TypeScript and modern frameworks it provides rapid
                                    delivery while remaining operationally lightweight.
                                </p>

                                <ul className='mt-3 text-[0.85em] grid grid-cols-2 gap-2'>
                                    <li>Strengths: Non-blocking I/O, vast ecosystem, TypeScript compatibility</li>
                                    <li>When to choose: APIs, real-time services, streaming, lightweight microservices
                                    </li>
                                    <li>Scalability: Process clustering, worker threads, horizontal scaling behind a
                                        load balancer
                                    </li>
                                    <li>Operational notes: Use PM2/container orchestration, observability (Prometheus,
                                        Grafana, OpenTelemetry)
                                    </li>
                                    <li>Reliability &amp; Security: Proper input validation, Helmet, rate-limiting,
                                        secure dependency management
                                    </li>
                                    <li>Trade-offs: CPU-intensive tasks should be offloaded to specialized services</li>
                                </ul>

                                <div className='mt-4 flex items-center gap-4'>
                                    <Link href={'/services/Nodejs-Development'}
                                          className={`inline-flex items-center text-[0.9em] font-medium ${isDayTime ? 'text-slate-800' : 'text-white'}`}>
                                        <span className='border-b pb-[0.05em]'>Node.js Development</span>
                                    </Link>

                                    <Link href={'/services/Javascript'}
                                          className={'ml-4 text-[0.85em] opacity-80'}>
                                        JavaScript &amp; TypeScript ecosystem
                                    </Link>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Mid image */}
            <div id={'mid image'} className={'relative h-auto max-w-full w-full mx-auto'}>
                <div className={'relative overflow-hidden rounded-2xl max-h-[52rem]'}>
                    <Image
                        className={'w-full h-auto'}
                        src={'/assets/back/meet.jpg'}
                        alt={'Middle Image'}
                        width={2560}
                        height={1440}
                        style={{
                            objectFit: "cover",
                            objectPosition: "center",
                        }}
                    />

                    {/* Soft gradient & glass overlay for futuristic feel */}
                    <div
                        className={`absolute inset-0 pointer-events-none ${isDayTime ? 'bg-gradient-to-tr from-transparent via-white/10 to-white/20' : 'bg-gradient-to-tr from-transparent via-black/20 to-black/60'}`}
                        aria-hidden="true"
                    />

                    {/* Subtle grid/tech pattern */}
                    <svg className={'absolute inset-0 w-full h-full opacity-10'} width="100%" height="100%"
                         viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                        <defs>
                            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                                <path d="M10 0 L0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.2"
                                      strokeOpacity="0.06"/>
                            </pattern>
                        </defs>
                        <rect width="100" height="100" fill="url(#grid)"/>
                    </svg>

                    {/* Left caption card */}
                    <div
                        className={`absolute left-6 bottom-8 max-w-[36rem] p-6 rounded-xl backdrop-blur-sm border ${isDayTime ? 'bg-white/60 border-white/20 text-slate-900' : 'bg-black/50 border-white/10 text-slate-100'}`}>
                        <h3 className={'text-[1.25em] font-[700] leading-tight'}>
                            Human-centered engineering, machine-scale reliability
                        </h3>
                        <p className={'mt-2 text-[0.92em] font-[300] leading-5 opacity-90'}>
                            Designing backend systems that scale to millions while keeping observability,
                            security and developer productivity central to every decision.
                        </p>

                        <div className={'mt-3 grid grid-cols-3 gap-3 text-[0.78em]'}>
                            <div>
                                <div className={'font-[700]'}>99.99%</div>
                                <div className={'opacity-70'}>Availability</div>
                            </div>
                            <div>
                                <div className={'font-[700]'}><span className={'tabular-nums'}>10ms</span></div>
                                <div className={'opacity-70'}>P95 Latency</div>
                            </div>
                            <div>
                                <div className={'font-[700]'}>Cloud-native</div>
                                <div className={'opacity-70'}>Containers &amp; IaC</div>
                            </div>
                        </div>

                        <div className={'mt-4 flex gap-3'}>
                            <Link href={'/contact'} className={'inline-block text-[0.88em] font-[600] underline'}>Request
                                architecture review</Link>
                            <Link href={'/services'} className={'inline-block text-[0.88em] opacity-80'}>Explore
                                services</Link>
                        </div>
                    </div>

                    {/* Right floating badges */}
                    <div className={'absolute right-6 top-8 flex flex-col gap-3'}>
                        <div
                            className={`px-3 py-2 rounded-lg text-[0.78em] font-[600] ${isDayTime ? 'bg-white/40 text-slate-900' : 'bg-white/10 text-slate-100'} border ${isDayTime ? 'border-white/10' : 'border-white/6'}`}>
                            Edge-ready • CDN-first
                        </div>
                        <div
                            className={`px-3 py-2 rounded-lg text-[0.78em] font-[600] ${isDayTime ? 'bg-white/40 text-slate-900' : 'bg-white/10 text-slate-100'} border ${isDayTime ? 'border-white/10' : 'border-white/6'}`}>
                            Observability baked-in
                        </div>
                        <div
                            className={`px-3 py-2 rounded-lg text-[0.78em] font-[600] ${isDayTime ? 'bg-white/40 text-slate-900' : 'bg-white/10 text-slate-100'} border ${isDayTime ? 'border-white/10' : 'border-white/6'}`}>
                            Zero-downtime deploys
                        </div>
                    </div>

                </div>
            </div>

            {/* Back-end development benefits */}
            <div id={'development benefit'}
                 className={`relative lg:top-10 py-16 lg:mb-16 mb-10 max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>

                {/* Business Benefit Header - Futuristic, precise */}
                <div className={`border-b-[0.1em] border-gray-300/40 pb-[2em] lg:mb-[4em] ${
                    isDayTime ? 'text-slate-900' : 'text-slate-100'
                }`}>
                    <h2 className='text-[1em] text-start sm:text-[1.4em] md:text-[2.6em] lg:text-[3.3em] font-[600] tracking-tight leading-[1.08] lg:pb-6'>
                        Back-End Development Benefits
                    </h2>
                    <p className='mt-3 max-w-3xl text-[0.95em] font-[300] leading-[1.6] opacity-90'>
                        Engineered outcomes: from sub-second P95 service-levels to secure, observable
                        platforms. The benefits below summarise the measurable value delivered by a
                        production-grade backend engineered for scale, resilience and developer velocity.
                    </p>
                </div>

                {/* Benefits grid - detailed cards */}
                <div
                    className={`relative w-full h-auto grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-8 md:gap-6 sm:gap-6 gap-6 ${
                        isDayTime ? 'text-slate-900' : 'text-slate-100'
                    }`}>

                    {/* Card: Process Maturity */}
                    <div id={'mature'}
                         className={'relative p-6 rounded-2xl bg-opacity-5 border border-opacity-10 backdrop-blur-sm'}>
                        <div className='flex items-start gap-4'>
                            <Image
                                src={isDayTime ? '/assets/back/icon/test.svg' : '/assets/back/icon/test1.svg'}
                                alt={'Mature Process'}
                                width={60}
                                height={60}
                                className={'h-auto w-auto'}
                            />
                            <div className='min-w-0'>
                                <h5 className={'lg:text-[1.3em] md:text-[1.25em] sm:text-[1.15em] text-[1.05em] font-[700] mb-1'}>
                                    Process Maturity
                                </h5>
                                <div className='text-[0.85em] opacity-75'>
                                    Predictable delivery, measurable quality
                                </div>
                            </div>
                        </div>

                        <p className='mt-4 text-[0.9em] font-[300] leading-[1.6] text-justify'>
                            Institutionalised engineering practices: CI/CD pipelines with automated gates,
                            branching strategies, peer-driven code reviews, and staged rollout patterns. These
                            practices reduce mean time to recovery (MTTR) and improve release frequency while
                            preserving stability.
                        </p>

                        <ul className='mt-4 text-[0.85em] grid grid-cols-1 gap-2 list-disc pl-5'>
                            <li>Automated test pyramid (unit, integration, E2E) with quality gates</li>
                            <li>CI policies: linting, security scans, performance smoke tests</li>
                            <li>Release strategies: blue/green, canary and feature flags</li>
                        </ul>

                        <div className='mt-4 flex items-center gap-3'>
                            <div
                                className='px-3 py-2 rounded-lg text-[0.85em] font-[700] bg-opacity-10 border border-current'>
                                99.99% SLA
                            </div>
                            <div
                                className='px-3 py-2 rounded-lg text-[0.85em] font-[700] bg-opacity-10 border border-current'>
                                <span className='tabular-nums'>P95 &lt; 100ms</span>
                            </div>
                        </div>

                        <div className='mt-4'>
                            <Link href={'/services/Process-Consulting'}
                                  className={`text-[0.9em] font-[600] underline ${isDayTime ? 'text-slate-800' : 'text-white'}`}>
                                Request a maturity assessment
                            </Link>
                        </div>
                    </div>

                    {/* Card: Security & Compliance */}
                    <div id={'high security'}
                         className={'relative p-6 rounded-2xl bg-opacity-5 border border-opacity-10 backdrop-blur-sm'}>
                        <div className='flex items-start gap-4'>
                            <Image
                                src={isDayTime ? '/assets/back/icon/del.svg' : '/assets/back/icon/del.svg'}
                                alt={'High Security'}
                                width={60}
                                height={60}
                                className={'h-auto w-auto'}
                            />
                            <div className='min-w-0'>
                                <h5 className={'lg:text-[1.3em] md:text-[1.25em] sm:text-[1.15em] text-[1.05em] font-[700] mb-1'}>
                                    Security &amp; Compliance
                                </h5>
                                <div className='text-[0.85em] opacity-75'>
                                    Proactive, layered protection
                                </div>
                            </div>
                        </div>

                        <p className='mt-4 text-[0.9em] font-[300] leading-[1.6] text-justify'>
                            Defence-in-depth architecture combining transport and at-rest encryption, hardened
                            runtime configurations, identity &amp; access management, and continuous security
                            validation. Compliance readiness (SOC2, ISO27001, HIPAA) is integrated into the
                            delivery lifecycle where required.
                        </p>

                        <ul className='mt-4 text-[0.85em] grid grid-cols-1 gap-2 list-disc pl-5'>
                            <li>Threat modelling &amp; design reviews early in the project</li>
                            <li>Automated SAST/DAST, dependency scanning and continuous monitoring</li>
                            <li>Role-based access control, least-privilege policies and audit trails</li>
                        </ul>

                        <div className='mt-4 flex items-center gap-3'>
                            <div
                                className='px-3 py-2 rounded-lg text-[0.85em] font-[700] bg-opacity-10 border border-current'>
                                Compliance-ready
                            </div>
                            <div
                                className='px-3 py-2 rounded-lg text-[0.85em] font-[700] bg-opacity-10 border border-current'>
                                SOC2 / ISO / HIPAA
                            </div>
                        </div>

                        <div className='mt-4'>
                            <Link href={'/services/Security-Audit'}
                                  className={`text-[0.9em] font-[600] underline ${isDayTime ? 'text-slate-800' : 'text-white'}`}>
                                Schedule a security audit
                            </Link>
                        </div>
                    </div>

                    {/* Card: Scalability & Architecture */}
                    <div id={'scalable'}
                         className={'relative p-6 rounded-2xl bg-opacity-5 border border-opacity-10 backdrop-blur-sm'}>
                        <div className='flex items-start gap-4'>
                            <Image
                                src={isDayTime ? '/assets/back/icon/brand.svg' : '/assets/back/icon/brand1.svg'}
                                alt={'Scalable'}
                                width={60}
                                height={60}
                                className={'h-auto w-auto'}
                            />
                            <div className='min-w-0'>
                                <h5 className={'lg:text-[1.3em] md:text-[1.25em] sm:text-[1.15em] text-[1.05em] font-[700] mb-1'}>
                                    Scalability &amp; Architecture
                                </h5>
                                <div className='text-[0.85em] opacity-75'>
                                    Future-proof patterns for growth
                                </div>
                            </div>
                        </div>

                        <p className='mt-4 text-[0.9em] font-[300] leading-[1.6] text-justify'>
                            Architectural patterns tuned to your domain: service decomposition, data partitioning,
                            eventual consistency patterns, asynchronous processing and resilient communication
                            (retries, idempotency, dead-lettering). Design choices focus on total cost of ownership
                            and operational simplicity at scale.
                        </p>

                        <ul className='mt-4 text-[0.85em] grid grid-cols-1 gap-2 list-disc pl-5'>
                            <li>Microservices or modular monoliths depending on domain boundaries</li>
                            <li>Event-driven designs for high-throughput workflows</li>
                            <li>Autoscaling, caching and database sharding strategies</li>
                        </ul>

                        <div className='mt-4 flex items-center gap-3'>
                            <div
                                className='px-3 py-2 rounded-lg text-[0.85em] font-[700] bg-opacity-10 border border-current'>
                                Cloud-native
                            </div>
                            <div
                                className='px-3 py-2 rounded-lg text-[0.85em] font-[700] bg-opacity-10 border border-current'>
                                IaC &amp; Containers
                            </div>
                        </div>

                        <div className='mt-4'>
                            <Link href={'/services/Architecture-Design'}
                                  className={`text-[0.9em] font-[600] underline ${isDayTime ? 'text-slate-800' : 'text-white'}`}>
                                Book an architecture workshop
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
            {/* Trusted Digital Partners */}
            <div className={`${isDayTime ? 'bg-gray-50' : 'bg-gray-950'}`}>
                <div id={'partners'}
                     className={`relative py-16 lg:mb-16 mb-10 max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]  ${
                         isDayTime ? 'text-black' : 'text-white'
                     }`}>
                    <h1 className={'lg:text-5em] md:text-[4em] sm:text-[3em] text-[2em] font-[600] leading-[1.1]  mb-[0.6em]'}>
                        Your trusted <br className={'lg:block md:block hidden'}/>digital partner
                    </h1>
                    <p className={'text-[0.873em] font-[300] leading-[1.5] text-justify lg:pr-[33em] mb-10'}>
                        We specialize in crafting high-impact marketing websites, innovative web apps, and mobile
                        applications that drive real results. From funded startups to established businesses, we&#39;ve
                        helped a wide range of clients bring their digital products to life -delivering standout
                        experiences
                        that fuel growth, engagement, and long-term success.
                    </p>
                    <Link href='/contact'>
                        <button
                            className='relative mx-auto inline-flex items-center justify-start overflow-hidden group w-fit text-[0.85em]  border tracking-tighter  rounded-full py-2 px-6'>
                        <span
                            className={`w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 ${isDayTime ? 'bg-black' : 'bg-white'} opacity-[3%]`}></span>
                            <span
                                className={`absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 ${isDayTime ? 'bg-black' : 'bg-white'} opacity-100 group-hover:-translate-x-8`}></span>
                            <span
                                className={`relative w-full text-left transition-colors duration-200 ease-in-out ${isDayTime ? 'text-black group-hover:text-gray-300' : 'text-white group-hover:text-gray-800'}`}>
                            Start a project <span className={`text-[1.5em] leading-[0.7]`}> Ã¢â€ â€™</span></span>
                            <span
                                className={"absolute inset-0 border-[1px] border-gray-900 ${isDayTime ? 'border-black' : 'border-white'} rounded-full"}></span>
                        </button>
                    </Link>

                    {/* Countup */}
                    <div id={'countup'}
                         className={`grid lg:grid-cols-5 md:grid-cols-5 sm:grid-cols-3 grid-cols-1 text-center lg:mt-[3em] py-12 divide-x divide-gray-300 ${
                             isDayTime ? 'text-black' : 'text-white'
                         }`}
                    >
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className="flex flex-col justify-center items-center "
                            >
                                <h2 className="gx-gradient-text lg:text-[3.2em] md:text-[3em] sm:text-[2em] text-[1.5em] text-start font-[600]">
                                    <CountUp end={stat.value} duration={2} suffix={stat.suffix || ''}/>
                                </h2>
                                <p className="text-[0.873em] font-[400] mt-1">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Back-end development process (premium futuristic presentation) */}
            <div className={`${isDayTime ? 'bg-white' : 'bg-black'}`}>
                <div id={'development process'}
                     className={`py-10 relative lg:mb-16 mb-10 max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>

                    {/* Header: crisp, outcome-focused */}
                    <div
                        className={`sticky top-0 z-10 bg-opacity-90 backdrop-blur-md ${isDayTime ? 'bg-white text-slate-900' : 'bg-black text-slate-100'}`}>
                        <div className="border-b-[0.1em] border-gray-300/40 pb-[2em]">
                            <h2 className='text-[1em] sm:text-[1.5em] md:text-[2em] lg:text-[2.6em] font-[700] tracking-tight leading-[1.04] lg:pb-6'>
                                Development Process & Methodology — Engineered for production
                            </h2>

                            <div className='mt-2 max-w-3xl text-[0.95em] font-[300] leading-[1.6] opacity-90'>
                                A repeatable, observable engineering pipeline focused on validated learning,
                                deterministic releases and operational resilience. Each phase produces tangible
                                artifacts and measurable signals used to gate progress and reduce risk.
                            </div>

                            <div className='mt-4 flex items-center gap-3'>
                                <div
                                    className='h-[6px] rounded-full w-56 bg-gradient-to-r from-cyan-400 to-violet-500 shadow-sm'/>
                                <div className='text-[0.82em] opacity-70'>6 phases • configurable to domain</div>
                            </div>
                        </div>
                    </div>

                    {/* Grid: 4-column responsive with enhanced cards */}
                    <section ref={targetRef} className="py-12">
                        <div className='grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-6'>

                            {[
                                {
                                    id: 1,
                                    step: '01',
                                    title: 'Discovery & Outcome Framing',
                                    duration: '1–2 weeks',
                                    artifacts: ['Problem Hypothesis', 'Success Metrics', 'High-level Architecture'],
                                    tech: ['Workshops', 'User research'],
                                    short: 'Rapid alignment on problem, constraints and KPIs that define success.',
                                    maturity: 0.2,
                                },
                                {
                                    id: 2,
                                    step: '02',
                                    title: 'Architecture & API Contracts',
                                    duration: '2–4 weeks',
                                    artifacts: ['System Diagram', 'OpenAPI Spec', 'Data Model & ADRs'],
                                    tech: ['OpenAPI', 'ERD'],
                                    short: 'Define bounded contexts, data contracts and service topology.',
                                    maturity: 0.4,
                                },
                                {
                                    id: 3,
                                    step: '03',
                                    stepLabel: '03',
                                    title: 'Implementation & Incremental Delivery',
                                    duration: 'Iterative — 2-week sprints',
                                    artifacts: ['Working APIs', 'Integration Tests', 'CI Pipelines'],
                                    tech: ['Feature flags', 'CI/CD'],
                                    short: 'Continuous delivery with contract tests, telemetry and feature gating.',
                                    maturity: 0.65,
                                },
                                {
                                    id: 4,
                                    step: '04',
                                    title: 'Performance, Security & Resilience',
                                    duration: '1–3 weeks (parallel)',
                                    artifacts: ['Load Tests', 'SAST/DAST', 'Chaos Runbooks'],
                                    tech: ['k6', 'OWASP'],
                                    short: 'Non-functional validation and runbook generation for predictable failures.',
                                    maturity: 0.8,
                                },
                                {
                                    id: 5,
                                    step: '05',
                                    title: 'Release & Observability',
                                    duration: 'Release window',
                                    artifacts: ['Dashboards', 'SLOs & Alerts', 'Runbooks'],
                                    tech: ['Prometheus', 'Grafana'],
                                    short: 'SLO-driven deploys (canary/blue-green) and tuned alerting for operations.',
                                    maturity: 0.9,
                                },
                                {
                                    id: 6,
                                    step: '06',
                                    title: 'Operate, Iterate & Transfer',
                                    duration: 'Ongoing',
                                    artifacts: ['Operational Playbook', 'Knowledge Transfer', 'Roadmap'],
                                    tech: ['Runbooks', 'On-call'],
                                    short: 'Handover, continuous improvement and product-driven iteration cycles.',
                                    maturity: 1.0,
                                },
                            ].map((card) => (
                                <article key={card.id} role="article" aria-label={`Phase ${card.step}: ${card.title}`}
                                         className={`relative p-6 rounded-2xl border shadow-lg backdrop-blur-sm hover:scale-[1.02] transition-transform duration-300 ${isDayTime ? 'bg-gradient-to-br from-white/90 to-slate-50/60 border-gray-200 text-slate-900' : 'bg-gradient-to-br from-slate-900/60 to-black/60 border-white/10 text-slate-100'}`}>

                                    <header className='flex items-start gap-3'>
                                        <div
                                            className={`flex-none w-12 h-12 rounded-full flex items-center justify-center font-[800] text-[0.95em] ${isDayTime ? 'bg-gradient-to-br from-cyan-600 to-violet-600 text-white ring-2 ring-cyan-200/20' : 'bg-gradient-to-br from-cyan-400 to-violet-500 text-black ring-2 ring-cyan-300/12'}`}>
                                            <span className='sr-only'>Phase</span>{card.step}
                                        </div>

                                        <div className='min-w-0'>
                                            <h3 className='text-[1.05em] font-[800] leading-tight'>{card.title}</h3>
                                            <div className='flex items-center gap-3 mt-1'>
                                                <div className='text-[0.78em] opacity-80'>{card.duration}</div>
                                                <div
                                                    className='text-[0.72em] px-2 py-0.5 rounded-full border border-current opacity-90'>{(card.tech || []).slice(0, 3).join(' • ')}</div>
                                            </div>
                                        </div>
                                    </header>

                                    <p className='mt-4 text-[0.95em] font-[300] leading-[1.5] text-justify min-h-[3.2rem]'>
                                        {card.short}
                                    </p>

                                    <dl className='mt-4 grid grid-cols-1 gap-2 text-[0.88em]'>
                                        {(card.artifacts || []).map((a: string, i: number) => (
                                            <div key={i} className='flex items-start gap-2'>
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                                                     xmlns="http://www.w3.org/2000/svg" className='mt-1 flex-shrink-0'>
                                                    <circle cx="12" cy="12" r="6" stroke="currentColor"
                                                            strokeWidth="1.2"/>
                                                    <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5"
                                                          strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                                <dt className='font-[700]'>{a}</dt>
                                            </div>
                                        ))}
                                    </dl>

                                    <div className='mt-4'>
                                        <div className='w-full bg-white/6 rounded-full h-2 overflow-hidden'>
                                            <div
                                                className={`h-2 ${isDayTime ? 'bg-gradient-to-r from-cyan-400 to-violet-500' : 'bg-gradient-to-r from-cyan-400 to-violet-500'} rounded-full`}
                                                style={{width: `${(card.maturity || 0) * 100}%`}}/>
                                        </div>
                                        <div className='flex items-center justify-between mt-2'>
                                            <Link href={'/services/Architecture-Design'}
                                                  className={`text-[0.88em] font-[700] underline ${isDayTime ? 'text-slate-900' : 'text-white'}`}>
                                                Learn more
                                            </Link>
                                            <div className='text-[0.8em] opacity-80'>
                                                Step {card.step}
                                            </div>
                                        </div>
                                    </div>

                                </article>
                            ))}

                        </div>
                    </section>
                </div>
            </div>
            {/* Last image*/}
            <div id={'last-image'} className={'h-auto max-w-full w-full mx-auto'}>
                <Image
                    className={' object-fill'}
                    src={'/assets/back/last.jpg'}
                    alt={'Last Image'}
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

export default BackendDevelopment;


