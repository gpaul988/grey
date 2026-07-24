'use client';

import React, {useEffect, useRef, useState} from 'react';
import '@/app/globals.css'
import Image from "next/image";
import Link from "next/link";
import CountUp from "react-countup";
import {motion, useScroll, useTransform, useMotionValue} from "framer-motion";
import {useIsDayTime} from '../../components/useIsDayTime';

import {FxBackground, FxChip, FxReveal, FxCard, FxStickyScrollSection, FxOrbit} from '@/components/futuristic/fx';

const FrontendDevelopment = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isBackgroundActive, setIsBackgroundActive] = useState(false);
    const [activeId, setActiveId] = useState<string>("");
    // x-scroller
    const targetRef = useRef<HTMLDivElement | null>(null);
    // Avoid useScroll passing an unhydrated ref: only attach target after client mount
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => { setIsMounted(true); }, []);
    const fallback = useMotionValue(0);
    const { scrollYProgress } = useScroll({ target: isMounted ? targetRef : undefined });
    const x = useTransform(scrollYProgress ?? fallback, [0, 1], ["0%", "-50%"]);

    // isDaytime react hook
    const isDayTime = useIsDayTime();

    // Introductory section hook
    useEffect(() => {
        const handleScroll = () => {
            if (sectionRef.current) {
                const {top, bottom} = sectionRef.current.getBoundingClientRect();
                const windowHeight = window.innerHeight;

                if (top < windowHeight * -0.3 || bottom < windowHeight * -0.1) {
                    setIsBackgroundActive(true);
                } else {
                    setIsBackgroundActive(false);
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Front-end Development hook
    const handleScroll = () => {
        const sections = [
            "DR",
            "ID",
            "PT",
            "IMP",
            "DP",
            "MM",
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

            {/* Unified Futuristic Frontend Development Hero - Background Image/Video with overlay */}
            <section className="relative overflow-hidden lg:w-full lg:min-h-[90vh] lg:h-[720px] w-full h-[600px]">
                {/* Video Background (desktop) and Image fallback (mobile) */}
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="hidden lg:block absolute inset-0 w-full h-full object-cover"
                    poster="/assets/front/hero.jpg"
                >
                    <source src="/assets/front/hero-mobile.mp4" type="video/mp4"/>
                </video>

                <Image
                    src="/assets/front/hero.jpg"
                    alt="Frontend Development Hero"
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
                    className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.12),transparent_50%)] z-[2]"/>

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
                                    className="text-cyan-400 text-[0.7em] lg:text-[0.82em] uppercase tracking-[0.22em] font-[600]">Frontend Development</span>
                            </div>

                            <h1 className="text-white text-[2em] lg:text-[4.5em] font-[700] leading-[1.08] tracking-tight mb-6 lg:mb-8">
                                High-Performance, <span className="gx-gradient-text">Accessible</span> Front-Ends
                            </h1>

                            <p className="text-white/70 text-[0.85em] lg:text-[1.08em] leading-[1.65] mb-8 lg:mb-10 font-[300]">
                                Enterprise-grade frontend solutions engineered for performance, accessibility, and user
                                experience. We build React applications that scale to millions of users while
                                maintaining pixel-perfect design and lightning-fast interactions.
                            </p>

                            <div className="flex flex-wrap gap-2 mb-10 lg:mb-12">
                                {['React', 'TypeScript', 'Accessibility', 'Performance', 'Responsive Design'].map((badge) => (
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
                                        <span className="relative">Get started →</span>
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
                                    {label: 'Projects Delivered', value: '150+'},
                                    {label: 'Years Experience', value: '8+'},
                                    {label: 'Team Members', value: '10+'},
                                    {label: 'Performance Boost', value: '350%'}
                                ].map((stat) => (
                                    <div key={stat.label}
                                         className="px-6 py-5 rounded-2xl border border-cyan-400/25 bg-cyan-400/8 backdrop-blur-md hover:bg-cyan-400/12 transition-all duration-300 hover:border-cyan-400/50 text-right">
                                        <div
                                            className="text-cyan-300 text-[0.7em] uppercase tracking-wider font-[600] mb-2">{stat.label}</div>
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
                            {label: 'Projects', value: '150+'},
                            {label: 'Experts', value: '8+'},
                            {label: 'Performance', value: '350%'}
                        ].map((stat) => (
                            <div key={stat.label}
                                 className="px-3 py-2 rounded-xl border border-cyan-400/25 bg-cyan-400/8 backdrop-blur-md">
                                <div
                                    className="text-cyan-300 text-[0.5em] uppercase tracking-wider font-[600] mb-1">{stat.label}</div>
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
                        <FxChip day={!isBackgroundActive ? !isDayTime : isDayTime}>FRONTEND EXPERTISE</FxChip>
                    </div>

                    <div className="lg:-ml-[19em]">
                        <FxReveal>
                            <h3 className="lg:text-[3.5em] md:text-[3em] text-[2em] font-[700] tracking-tight leading-[1.15] mt-4">
                                Build Lightning-Fast, <span
                                className="gx-gradient-text">Accessible Interfaces</span>
                            </h3>
                        </FxReveal>

                        <FxReveal delay={0.08}>
                            <div
                                className="grid lg:grid-cols-2 grid-cols-1 gap-6 mt-6 font-[300] text-justify text-[0.95em] md:text-[1.05em] leading-relaxed">
                                <div className="space-y-4">
                                    <p>Front-end development is more than writing code&mdash;it&apos;s about crafting
                                        user experiences that drive engagement and conversions. Our frontend philosophy
                                        merges cutting-edge React architecture, performance optimization, and
                                        accessibility best practices to deliver interfaces that scale to millions of
                                        users while maintaining pixel-perfect quality and lightning-fast
                                        interactions.</p>
                                    <p>We employ a rigorous, performance-first approach: component architecture, state
                                        management optimization, lazy loading strategies, and progressive enhancement.
                                        Every component, interaction, and loading state is intentional, designed to
                                        maximize Core Web Vitals, reduce bundle size, and ensure your application
                                        performs flawlessly across devices, network conditions, and browsers.</p>
                                    <div className="flex flex-wrap gap-3 mt-4">
                                        {['Component Architecture', 'Performance Optimization', 'Type Safety', 'Accessibility (WCAG 2.1)'].map((p) => (
                                            <span key={p} className="gx-data-pill">{p}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <p>Whether launching a startup, scaling an enterprise SaaS platform, or modernizing
                                        a legacy application, we deliver responsive, accessible interfaces optimized for
                                        all devices and user scenarios. We prioritize performance: sub-100ms
                                        interactions, optimized images, code splitting, and smart caching because user
                                        experience directly impacts business metrics—conversion rates, engagement,
                                        retention, and SEO rankings.</p>
                                    <p>Our end-to-end approach spans discovery consultation, component design systems,
                                        TypeScript implementation, integration testing, deployment, and continuous
                                        optimization. We partner collaboratively with your team, providing transparent
                                        communication, code reviews, performance audits, and strategic
                                        recommendations—focused on delivering long-term value through maintainable,
                                        scalable frontend architecture.</p>
                                    <div className="flex flex-wrap gap-3 mt-4">
                                        {['React Mastery', 'Mobile-First Design', 'SEO Optimization', 'Real-Time Performance Monitoring'].map((p) => (
                                            <span key={p} className="gx-data-pill">{p}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </FxReveal>
                    </div>
                </div>
            </section>

            {/* Image Showcase - Futuristic Executive Presentation */}
            <section className={`${isDayTime ? 'bg-white' : 'bg-black'} py-12 lg:py-20`}>
                <div id={'showcase'}
                     className={'relative lg:max-w-full w-full mx-auto h-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em]'}>
                    <FxCard day={false} glow className="relative overflow-hidden rounded-[2rem] p-6 sm:p-8 lg:p-10">
                        <div
                            className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.18),transparent_30%),linear-gradient(130deg,rgba(255,255,255,0.04),rgba(2,6,23,0.94))]"/>
                        <div className="absolute inset-0 border border-white/10 rounded-[2rem] pointer-events-none"/>
                        <div
                            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent"/>
                        <div
                            className="absolute right-6 top-6 h-24 w-24 rounded-full border border-cyan-400/20 blur-3xl"/>
                        <div
                            className="absolute bottom-8 left-8 h-28 w-28 rounded-full border border-cyan-400/15 blur-[90px]"/>
                        <div
                            className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.035)_50%,transparent_100%)]"/>
                        <div
                            className="absolute inset-0 bg-[linear-gradient(0deg,transparent_0%,rgba(255,255,255,0.025)_50%,transparent_100%)]"/>

                        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                            <div className="max-w-2xl">
                                <FxChip day={false} className="mb-4">EXECUTIVE SHOWCASE</FxChip>
                                <h3 className="text-[1.7em] sm:text-[2.2em] lg:text-[2.7em] font-[700] tracking-tight leading-[1.08] text-white">
                                    High-performance React interfaces, presented with cinematic clarity.
                                </h3>
                                <p className="mt-4 max-w-xl text-[0.9em] sm:text-[1em] leading-[1.7] text-white/70">
                                    A premium gallery of scalable components, accessible systems, and production-ready
                                    execution—designed to feel as advanced as the applications we build.
                                </p>
                            </div>
                            <div className="grid gap-2 sm:grid-cols-2 lg:min-w-[290px]">
                                {[
                                    {label: 'Component Design', value: '01'},
                                    {label: 'React Architecture', value: '02'},
                                    {label: 'Performance Flow', value: '03'},
                                    {label: 'Future Ready', value: '04'}
                                ].map((item) => (
                                    <div key={item.label}
                                         className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm">
                                        <div
                                            className="text-[0.58em] uppercase tracking-[0.3em] text-cyan-300/80">{item.label}</div>
                                        <div className="mt-1 text-[1.05em] font-[600] text-white">{item.value}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative z-10 mt-8 grid gap-4 lg:grid-cols-[1.35fr_0.9fr]">
                            <div
                                className="group relative overflow-hidden rounded-[1.6rem] border border-white/10 h-[320px] sm:h-[420px] lg:h-[540px]">
                                <Image
                                    src="/assets/hybrid/3.jpg"
                                    alt="Frontend architecture showcase"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div
                                    className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(2,6,23,0.2)_40%,rgba(2,6,23,0.88)_100%)]"/>
                                <div className="absolute inset-0 border border-white/10"/>
                                <div
                                    className="absolute left-4 top-4 rounded-full border border-cyan-400/30 bg-black/30 px-3 py-1 text-[0.62em] uppercase tracking-[0.3em] text-cyan-300">
                                    01 / Strategy
                                </div>
                                <div className="absolute bottom-4 left-4 right-4">
                                    <p className="text-[0.62em] uppercase tracking-[0.3em] text-cyan-300 font-[600]">Component
                                        Architecture</p>
                                    <p className="mt-2 max-w-xl text-sm sm:text-base text-white/90">Scalable, accessible
                                        foundations for enterprise React applications.</p>
                                </div>
                            </div>

                            <div className="grid gap-4">
                                <div
                                    className="group relative overflow-hidden rounded-[1.35rem] border border-white/10 h-[250px] sm:h-[260px] lg:h-[260px]">
                                    <Image
                                        src="/assets/hybrid/4.jpg"
                                        alt="React UI detail showcase"
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div
                                        className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(2,6,23,0.16)_55%,rgba(2,6,23,0.78)_100%)]"/>
                                    <div className="absolute inset-0 border border-white/10"/>
                                    <div
                                        className="absolute left-3 top-3 rounded-full border border-white/15 bg-black/20 px-2.5 py-1 text-[0.56em] uppercase tracking-[0.28em] text-cyan-200">
                                        02 / UI Design
                                    </div>
                                </div>

                                <div
                                    className="group relative overflow-hidden rounded-[1.35rem] border border-white/10 h-[250px] sm:h-[260px] lg:h-[260px]">
                                    <Image
                                        src="/assets/hybrid/1.png"
                                        alt="React workflow showcase"
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div
                                        className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(2,6,23,0.16)_55%,rgba(2,6,23,0.78)_100%)]"/>
                                    <div className="absolute inset-0 border border-white/10"/>
                                    <div
                                        className="absolute left-3 top-3 rounded-full border border-white/15 bg-black/20 px-2.5 py-1 text-[0.56em] uppercase tracking-[0.28em] text-cyan-200">
                                        03 / Performance
                                    </div>
                                </div>
                            </div>

                            <div
                                className="group relative overflow-hidden rounded-[1.6rem] border border-white/10 h-[240px] sm:h-[260px] lg:h-[260px] lg:col-span-2">
                                <Image
                                    src="/assets/hybrid/2.jpg"
                                    alt="React product experience showcase"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div
                                    className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(2,6,23,0.1)_35%,rgba(2,6,23,0.82)_100%)]"/>
                                <div className="absolute inset-0 border border-white/10"/>
                                <div
                                    className="absolute left-3 top-3 rounded-full border border-cyan-400/30 bg-black/30 px-2.5 py-1 text-[0.56em] uppercase tracking-[0.28em] text-cyan-300">
                                    04 / Experience
                                </div>
                                <div className="absolute bottom-4 left-4 right-4">
                                    <p className="text-white/90 text-sm sm:text-base">Elegant, high-performance product
                                        experiences built for scale.</p>
                                </div>
                            </div>
                        </div>
                    </FxCard>
                </div>
            </section>

            {/* Front-End Development Services - Professional Futuristic Grid */}
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
                            Core Frontend Development <span className="gx-gradient-text">Services</span>
                        </h2>
                    </FxReveal>
                    <FxReveal delay={0.08}>
                        <p className={`text-[1.08em] leading-relaxed mt-4 max-w-3xl ${
                            isDayTime ? 'text-slate-600' : 'text-slate-400'
                        }`}>
                            Enterprise-grade frontend solutions engineered for high-performance applications. Each
                            service combines cutting-edge React technologies, accessibility best practices, and scalable
                            architecture patterns tailored to your specific business requirements and growth trajectory.
                        </p>
                    </FxReveal>
                </div>

                {/* Services Grid */}
                <div className="relative z-10 grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-6 lg:gap-8">
                    {[
                        {
                            id: 'custom-frontend',
                            title: 'Custom Frontend Development',
                            icon: '/assets/front/icon/mobile.svg',
                            tags: ['React', 'TypeScript', 'Tailwind CSS', 'Custom Design'],
                            shortDesc: 'We design and build bespoke frontends that perfectly align with your brand and business objectives.',
                            description: 'Your business is unique, and your digital experience should reflect that uniqueness at every touchpoint. We take a deep dive into your brand, goals, and target audience to develop tailored frontend solutions that truly align with your business vision. Our team combines creativity with technical precision to design responsive, accessible, and high-performing interfaces that not only look impressive but also deliver smooth, intuitive user experiences across all devices and screen sizes.',
                            details: 'Pixel-perfect design implementation | Fully responsive layouts | WCAG 2.1 AA compliance | Mobile-first approach | Performance optimization | Custom component libraries | Figma-to-React workflow | Brand consistency | Cross-browser testing'
                        },
                        {
                            id: 'spa-development',
                            title: 'Single-Page Application (SPA) Development',
                            icon: '/assets/front/icon/weba.svg',
                            tags: ['React', 'Vue.js', 'Angular', 'State Management'],
                            shortDesc: 'We build fast, interactive Single Page Applications using React, Vue.js, and Angular for fluid user experiences.',
                            description: 'We create fast, interactive Single Page Applications (SPAs) using powerful frameworks like React, Vue.js, and Angular. These technologies allow us to create fluid, app-like experiences in the browser by enabling asynchronous data handling and efficient state management. Our SPAs eliminate unnecessary page reloads, ensuring that users can navigate smoothly and interact in real time with your application.',
                            details: 'Advanced state management (Redux, Vuex, NgRx) | Real-time data synchronization | Smooth page transitions | Lazy loading optimization | Code splitting strategies | Efficient caching | Progressive loading | SEO-friendly SPA architecture | Sub-100ms interactions'
                        },
                        {
                            id: 'pwa-development',
                            title: 'Progressive Web App (PWA) Development',
                            icon: '/assets/front/icon/web.svg',
                            tags: ['Service Workers', 'Offline-First', 'Push Notifications', 'Installable'],
                            shortDesc: 'We build Progressive Web Apps that deliver app-like functionality with offline access and push notifications.',
                            description: 'Our Progressive Web Apps (PWAs) bring app-like functionality to the web, offering features such as offline access, push notifications, and home screen installation without the need for app store downloads. Designed with speed, usability, and reliability in mind, our PWAs deliver seamless, consistent user experiences across all devices and browsers.',
                            details: 'Service Worker implementation | Offline-first architecture | Web App Manifest configuration | Push notification integration | Install prompts | Automatic updates | Full responsiveness | Performance monitoring | Analytics integration'
                        },
                        {
                            id: 'responsive-design',
                            title: 'Responsive & Cross-Browser Design',
                            icon: '/assets/front/icon/cross.svg',
                            tags: ['Mobile-First', 'CSS Grid', 'Flexbox', 'Testing'],
                            shortDesc: 'We rigorously test across devices and browsers to ensure consistent functionality and pixel-perfect experiences.',
                            description: 'We rigorously test your platform across a wide range of devices, screen sizes, and browsers to ensure consistent functionality, design integrity, and user experience. Whether your audience accesses your site from desktops, laptops, tablets, or smartphones, every interaction is smooth, responsive, and pixel-perfect across all environments.',
                            details: 'Mobile-first design approach | Flexible grid systems | Touch-optimized interfaces | Screen size testing | Browser compatibility | Performance validation | Accessibility testing | Device-specific optimization | Automated cross-browser testing'
                        },
                        {
                            id: 'custom-component-development',
                            title: 'Custom Component Development',
                            icon: '/assets/front/icon/pwa.svg',
                            tags: ['Design System', 'React', 'Reusable'],
                            shortDesc: 'Design and build reusable, well-documented component libraries tailored to your product.',
                            description: 'Create consistent, accessible, and reusable component libraries that speed development and improve maintainability across teams.',
                            details: 'Design system creation | Atomic components | Storybook documentation | TypeScript typings | Theming support | Unit tests | Accessibility-ready components'
                        },
                        {
                            id: 'accessibility-services',
                            title: 'Accessibility Services',
                            icon: '/assets/front/icon/access.svg',
                            tags: ['WCAG', 'A11y', 'Screen Readers'],
                            shortDesc: 'Ensure your product is accessible to everyone by meeting WCAG 2.1 standards.',
                            description: 'Comprehensive accessibility audits, remediation, and training to make your site usable for all users.',
                            details: 'WCAG 2.1 AA audits | Screen reader testing | Keyboard navigation | ARIA roles & semantics | Remediation guidance | Accessibility reporting'
                        },
                        {
                            id: 'cross-device-browser-compat',
                            title: 'Cross-Device & Cross-Browser Compatibility',
                            icon: '/assets/front/icon/cross.svg',
                            tags: ['Responsive', 'Cross-Browser', 'Testing'],
                            shortDesc: 'Guarantee consistent experiences across devices and browsers with exhaustive testing.',
                            description: 'Testing and optimization to ensure consistent UI/UX across device types, OSs, and browsers.',
                            details: 'Automated cross-browser testing | Device labs | Polyfills & fallbacks | CSS normalization | Touch and pointer support | Regression testing'
                        },

                        {
                            id: 'frontend-modernization',
                            title: 'Legacy Frontend Modernization',
                            icon: '/assets/front/icon/hybrid.svg',
                            tags: ['Migration', 'Refactoring', 'Modernization', 'Performance'],
                            shortDesc: 'We transform outdated interfaces into modern, fast, and scalable frontends using cutting-edge technologies.',
                            description: "Don't let outdated interfaces slow your growth. We specialize in modernizing legacy frontends by migrating to cutting-edge frameworks, streamlining codebases, and ensuring full compliance with current web standards. Our process begins with comprehensive audit to uncover performance bottlenecks, UI/UX limitations, and architectural inefficiencies.",
                            details: 'Legacy code analysis | Framework migration strategy | Incremental refactoring | Performance profiling | Codebase modernization | Testing framework implementation | Build tool optimization | Documentation updates | Team knowledge transfer'
                        },
                        {
                            id: 'performance-optimization',
                            title: 'Frontend Performance Optimization',
                            icon: '/assets/front/icon/perf.svg',
                            tags: ['Speed', 'Optimization', 'Core Web Vitals', 'Analytics'],
                            shortDesc: 'We optimize your frontend for lightning-fast load times, smooth interactions, and exceptional user experience.',
                            description: 'A fast, seamless digital experience is essential for keeping users engaged and driving conversions. We fine-tune your frontend using performance optimization techniques such as code splitting, lazy loading, caching strategies, image compression, and bundle optimization. These improvements lead to significantly faster load times, smoother interactions, and reduced bounce rates.',
                            details: 'Code splitting & chunking | Image optimization | Lazy loading implementation | Caching strategies (HTTP, browser) | Bundle size reduction | CSS/JS minification | CDN integration | Web performance monitoring | Core Web Vitals optimization'
                        },
                        {
                            id: 'api-integration',
                            title: 'API Integration & Connectivity',
                            icon: '/assets/front/icon/access.svg',
                            tags: ['REST APIs', 'GraphQL', 'WebSockets', 'Third-party Integration'],
                            shortDesc: 'We seamlessly integrate your frontend with robust backend APIs and third-party services for seamless data flow.',
                            description: 'Seamless connectivity is the backbone of modern web applications. We integrate your frontend with REST APIs, GraphQL endpoints, and real-time WebSocket connections to ensure fluid data exchange and instant updates. Our team specializes in handling complex API orchestration, authentication strategies, error handling, and rate limiting to create resilient, production-grade integrations that scale with your business.',
                            details: 'REST & GraphQL integration | Real-time WebSocket connections | Authentication & authorization | Error handling & retry logic | API rate limiting | Caching strategies | Data transformation | Third-party service integration | API documentation & testing'
                        },
                        {
                            id: 'testing-qa',
                            title: 'Testing & Quality Assurance',
                            icon: '/assets/front/icon/pwa.svg',
                            tags: ['Unit Testing', 'E2E Testing', 'QA', 'Automation'],
                            shortDesc: 'We implement comprehensive testing strategies to ensure your frontend is bug-free, performant, and user-ready.',
                            description: 'Quality is non-negotiable. We implement comprehensive testing strategies across unit tests, integration tests, and end-to-end automation to catch issues before they reach production. Our QA approach covers functionality, performance, accessibility, security, and user experience across all browsers and devices, ensuring your application meets the highest standards.',
                            details: 'Unit testing (Jest, Vitest) | Integration testing | End-to-end testing (Cypress, Playwright) | Visual regression testing | Performance testing | Accessibility audits (WCAG) | Security testing | Load testing | Continuous integration & deployment'
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


            {/* Frontend Development Process - Enhanced with FxStickyScrollSection */}
            <FxStickyScrollSection
                day={isDayTime}
                heading={<>Frontend Development<br/>process overview</>}
                intro="Our frontend development process combines strategic discovery with agile execution, ensuring your application is architected for performance, accessibility, and scalability. We balance creative innovation with technical excellence, delivering products that delight users while meeting business objectives."
                navLabel="Process Phases"
                activeId={activeId}
                onNavClickAction={scrollToSection}
                items={[
                    {
                        id: "01",
                        title: "Discovery & Research",
                        target: "DR",
                        tags: ["User Research", "Market Analysis", "Roadmap", "Business Alignment"],
                        body: (
                            <div>
                                <p>
                                    We immerse ourselves in your business to uncover the insights that drive strategic
                                    success. By conducting stakeholder interviews, performing in-depth user research,
                                    and analyzing behavioral and performance data, we define clear user personas and
                                    identify key pain points and opportunities. This discovery phase allows us to craft
                                    a tailored roadmap that aligns with your business objectives, ensuring the final
                                    product not only meets user needs but also delivers measurable results.
                                </p>
                                <p className="mt-3">
                                    Our research methodology combines qualitative interviews (user personas,
                                    job-to-be-done analysis), quantitative analysis (usage patterns, competitor
                                    analysis), and market trend evaluation. We establish baseline metrics and success
                                    criteria, creating a foundation for data-driven decision-making throughout the
                                    project. Discovery typically spans 2-4 weeks for MVP scope; enterprise applications
                                    requiring complex stakeholder alignment extend 4-6 weeks. Deliverables: user
                                    personas, journey maps, competitive analysis, technical feasibility assessment, and
                                    prioritized feature roadmap.
                                </p>
                            </div>
                        ),
                    },
                    {
                        id: "02",
                        title: "Ideation & Design",
                        target: "ID",
                        tags: ["Wireframing", "Design System", "Prototyping", "Collaboration"],
                        body: (
                            <div>
                                <p>
                                    In collaborative workshops, we work closely with your team to brainstorm ideas,
                                    wireframe concepts, and prototype solutions that align with your business goals.
                                    This hands-on, iterative process ensures every design decision is guided by user
                                    needs and feedback, resulting in innovative, intuitive interfaces that not only look
                                    great but also perform effectively in real-world scenarios.
                                </p>
                                <p className="mt-3">
                                    We establish comprehensive design systems defining typography, color palettes,
                                    component libraries, and interaction patterns. Our design system approach ensures
                                    consistency across the application while accelerating development velocity. We
                                    conduct design reviews with stakeholders, iterate based on feedback, and validate
                                    designs against accessibility standards (WCAG 2.1 AA). Typical timeline: 3-6 weeks
                                    for design system establishment and detailed component specifications. Deliverables:
                                    wireframes, high-fidelity mockups, interactive prototypes, design system
                                    documentation, and design tokens for development teams.
                                </p>
                            </div>
                        ),
                    },
                    {
                        id: "03",
                        title: "Prototyping & Validation",
                        target: "PT",
                        tags: ["Interactive Prototypes", "Usability Testing", "Iteration", "Refinement"],
                        body: (
                            <div>
                                <p>
                                    Using advanced front-end tools, we craft interactive prototypes that simulate real
                                    user interactions, allowing us to validate functionality, usability, and design
                                    early in the process. This approach helps reduce development risk, uncover potential
                                    issues, and refine the product before full-scale implementation, ensuring a smoother
                                    path to launch and a solution that meets both business and user expectations.
                                </p>
                                <p className="mt-3">
                                    We conduct usability testing with target users, gathering qualitative feedback on
                                    navigation, task completion rates, and user satisfaction. A/B testing frameworks
                                    validate design decisions against hypotheses. We implement accessibility testing
                                    (keyboard navigation, screen reader compatibility, color contrast validation),
                                    performance profiling, and cross-browser compatibility checks. Iteration cycles
                                    typically include 2-3 rounds of refinement based on user feedback. Timeline: 2-4
                                    weeks including testing and iteration. Deliverables: validated prototypes, usability
                                    test reports, accessibility audit results, and refined design specifications ready
                                    for development.
                                </p>
                            </div>
                        ),
                    },
                    {
                        id: "04",
                        title: "Frontend Implementation",
                        target: "IMP",
                        tags: ["React/Vue/Angular", "TypeScript", "Component Architecture", "Performance"],
                        body: (
                            <div>
                                <p>
                                    With clean, maintainable code as the foundation, we develop your front-end using
                                    modern frameworks like React, Vue, or Angular, paired with industry-standard
                                    development methodologies. Our approach ensures scalability, responsiveness, and
                                    future-proofing. We also prioritize seamless integration with backend systems,
                                    enabling fast data flow and optimal performance across all devices and environments.
                                </p>
                                <p className="mt-3">
                                    We implement component-based architecture with reusable, testable components
                                    following SOLID principles. State management is architected for scalability (Redux,
                                    Zustand, Vuex). We conduct continuous code reviews, maintain comprehensive test
                                    coverage (unit, integration, E2E), and implement performance monitoring from day
                                    one. Our development process includes automated testing (Jest, Cypress), static code
                                    analysis, and security scanning (OWASP compliance). Typical timeline: 6-12 weeks for
                                    MVP scope; complex enterprise applications require 12-20 weeks. Deliverables:
                                    production-ready code, automated test suite, performance benchmarks, and
                                    deployment-ready build pipelines.
                                </p>
                            </div>
                        ),
                    },
                    {
                        id: "05",
                        title: "Quality Assurance & Testing",
                        target: "DP",
                        tags: ["QA Testing", "Performance", "Accessibility", "Security Audit"],
                        body: (
                            <div>
                                <p>
                                    Comprehensive QA ensures your application meets quality standards across
                                    functionality, performance, accessibility, and security. We conduct manual testing
                                    covering user workflows, edge cases, and error scenarios. Automated testing suites
                                    validate core functionality, prevent regressions, and enable confident deployments.
                                    Performance testing validates Core Web Vitals, load times, and resource
                                    optimization.
                                </p>
                                <p className="mt-3">
                                    Our QA methodology includes functional testing (feature validation), regression
                                    testing (automated suites prevent breakage), performance testing (load testing,
                                    stress testing, profiling), accessibility audits (WCAG 2.1 AA compliance), and
                                    security testing (penetration testing, vulnerability scanning). We establish quality
                                    gates preventing deployment of code failing test suites or security checks.
                                    Cross-browser testing ensures compatibility (Chrome, Firefox, Safari, Edge) across
                                    devices (mobile, tablet, desktop). Typical timeline: 2-4 weeks QA cycles running
                                    parallel to final implementation. Deliverables: test coverage reports
                                    (target &gt;80%), performance baselines, accessibility compliance report, security
                                    audit results, and deployment readiness assessment.
                                </p>
                            </div>
                        ),
                    },
                    {
                        id: "06",
                        title: "Deployment & Launch",
                        target: "MM",
                        tags: ["CI/CD Pipeline", "Zero-Downtime Deploy", "Monitoring", "Analytics"],
                        body: (
                            <div>
                                <p>
                                    After launch, we provide continuous support to ensure your platform remains secure,
                                    functional, and aligned with evolving needs. From applying regular updates and
                                    performance enhancements to scaling infrastructure as your user base grows, our team
                                    is committed to maintaining long-term stability and helping your digital solution
                                    grow alongside your business.
                                </p>
                                <p className="mt-3">
                                    We implement automated deployment pipelines (CI/CD) enabling zero-downtime
                                    deployments. Blue-green deployment strategies ensure instant rollback capability if
                                    issues arise. We establish comprehensive monitoring and alerting (uptime monitoring,
                                    error tracking, performance analytics). Post-launch support includes security patch
                                    management, dependency updates, performance optimization, and feature iteration
                                    based on user analytics. We implement feature flags enabling gradual rollout and A/B
                                    testing. Long-term support includes quarterly performance reviews, security audits,
                                    and strategic roadmap refinement. Deliverables: deployment documentation, monitoring
                                    dashboards, runbooks for incident response, and quarterly business reviews tracking
                                    KPIs and recommending improvements.
                                </p>
                            </div>
                        ),
                    },
                ]}
            />

            {/* Front-end Technologies — Comprehensive, professional */}
            <div
                className={`${isDayTime ? 'bg-gradient-to-br from-white via-slate-50 to-indigo-50' : 'bg-gradient-to-br from-slate-900 via-indigo-950 to-black'}`}>
                <div id={'technology used'}
                     className={`relative py-32 max-w-full w-full mx-auto px-6 sm:px-8 md:px-12 lg:px-[4.5em] xl:px[4.5em] 2xl:px-[4.5em]`}>

                    {/* Header */}
                    <header
                        className={`relative grid lg:grid-cols-2 grid-cols-1 gap-8 items-start ${isDayTime ? 'text-slate-900' : 'text-white'}`}>
                        <div>
                            <h2 className='text-[1.05em] sm:text-[1.6em] md:text-[2.2em] lg:text-[3.6em] font-semibold tracking-tight leading-[0.95]'>
                                Front‑end Technologies
                                <br className={'lg:block md:block hidden'}/> & Capability Matrix
                            </h2>
                            <div className='mt-3 flex gap-3 items-center'>
                                <span
                                    className='inline-block px-3 py-1 text-[0.72em] rounded-full bg-indigo-500/10 text-indigo-500 border border-indigo-500/10'>Enterprise</span>
                                <span
                                    className='inline-block px-3 py-1 text-[0.72em] rounded-full bg-green-500/10 text-green-500 border border-green-500/10'>Performance</span>
                                <span
                                    className='inline-block px-3 py-1 text-[0.72em] rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/10'>Accessible</span>
                            </div>
                        </div>

                        <div className='lg:ml-8'>
                            <p className='text-[0.95em] font-light leading-6'>
                                A rigorously curated stack with operational guidance, migration paths, and measurable
                                outcomes. Each technology block contains: use-cases, maturity, recommended
                                architectures,
                                performance/security notes, testing strategy, and a short migration/implementation plan.
                            </p>

                            <div className='mt-4 text-sm text-slate-500 dark:text-slate-400 space-y-1'>
                                <div>Deliverables per stack: Architecture diagram • Typical CI steps • Performance
                                    targets
                                </div>
                                <div>Observability: Suggested telemetry events, SLOs, and error budget guidance</div>
                            </div>
                        </div>
                    </header>

                    {/* Tools Grid */}
                    <section id={'tools'} className='mt-12 grid lg:grid-cols-2 gap-8'>

                        {/* Angular — Deep detail */}
                        <article id={'angular'} role='article'
                                 className='group flex flex-col gap-4 p-6 rounded-2xl border border-gray-200/8 bg-white/6 dark:bg-black/30 backdrop-blur-sm shadow-sm hover:shadow-lg transition-transform hover:-translate-y-2'>
                            <div className='flex gap-6 items-start'>
                                <div className='flex-shrink-0'>
                                    <div
                                        className='w-16 h-16 rounded-xl flex items-center justify-center bg-gradient-to-tr from-red-400 to-pink-500 p-1'>
                                        <div className='bg-white/90 dark:bg-gray-900/70 rounded-lg p-2'>
                                            <Image
                                                src={isDayTime ? '/assets/front/icon1/angular.svg' : '/assets/front/icon1/angular1.svg'}
                                                alt='Angular' width={44} height={44}/>
                                        </div>
                                    </div>
                                </div>

                                <div className='flex-1'>
                                    <div className='flex items-start justify-between gap-4'>
                                        <div>
                                            <h3 className='text-2xl font-semibold'>Angular</h3>
                                            <div className='mt-1 text-sm text-slate-500 dark:text-slate-300'>Enterprise
                                                SPAs · Strict architecture
                                            </div>
                                        </div>

                                        <div className='text-right space-y-1'>
                                            <span
                                                className='inline-block px-2 py-1 text-xs rounded-md bg-slate-800/10 dark:bg-slate-200/6'>Maturity: High</span>
                                            <span
                                                className='inline-block px-2 py-1 text-xs rounded-md bg-slate-800/10 dark:bg-slate-200/6'>Stable releases</span>
                                        </div>
                                    </div>

                                    <p className='mt-3 text-[0.92em] text-justify text-slate-600 dark:text-slate-300'>
                                        Best for mission-critical, large-scale applications that require opinionated
                                        structure,
                                        explicit DI, and long-term maintainability. Prefer TypeScript-first workflows
                                        and
                                        strict linting/enforcement for scalable teams.
                                    </p>
                                </div>
                            </div>

                            <div className='grid grid-cols-2 gap-4 text-[0.88em] text-slate-600 dark:text-slate-300'>
                                <div>
                                    <strong>Use cases</strong>
                                    <ul className='mt-2 list-disc ml-5'>
                                        <li>Large admin portals, dashboards, and enterprise SPAs</li>
                                        <li>Applications requiring fine-grained role-based access and complex
                                            workflows
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <strong>Recommended stack</strong>
                                    <ul className='mt-2 list-disc ml-5'>
                                        <li>Angular + NgRx | Nx monorepo | Angular Universal (SSR)</li>
                                        <li>ESLint, Jest, Cypress; build with Bazel or Nx caching</li>
                                    </ul>
                                </div>
                            </div>

                            <div
                                className='mt-2 grid grid-cols-2 gap-4 text-[0.85em] text-slate-500 dark:text-slate-400'>
                                <div>
                                    <strong>Performance & Security</strong>
                                    <ul className='mt-2 list-disc ml-5'>
                                        <li>Bundle budgets: target &lt; 150KB gzipped for initial bundle</li>
                                        <li>Enable SSR for first-paint and SEO-sensitive pages</li>
                                    </ul>
                                </div>
                                <div>
                                    <strong>Testing & CI</strong>
                                    <ul className='mt-2 list-disc ml-5'>
                                        <li>Unit: Jest; E2E: Cypress</li>
                                        <li>CI: lint → test → build → perf budgets → deploy staging</li>
                                    </ul>
                                </div>
                            </div>

                            <div className='mt-3 text-[0.85em] text-slate-500 dark:text-slate-400'>
                                <strong>Migration snapshot</strong>
                                <p className='mt-1'>For legacy AngularJS migrations: Phase 1 — audit & carve
                                    micro-frontends; Phase 2 — migrate services and routes to Angular; Phase 3 — enforce
                                    CI gates and observability.</p>
                            </div>

                            <div className='mt-4 flex items-center justify-between'>
                                <Link href={'/services/angular-development'}
                                      className='text-indigo-600 dark:text-indigo-400 font-medium hover:underline'>Angular
                                    Development ↗</Link>
                                <div className='flex gap-2 items-center text-xs text-slate-500 dark:text-slate-300'>
                                    <span className='px-2 py-1 rounded-md bg-black/5 dark:bg-white/6'>SSR</span>
                                    <span className='px-2 py-1 rounded-md bg-black/5 dark:bg-white/6'>Monorepo</span>
                                </div>
                            </div>
                        </article>

                        {/* React — Deep detail */}
                        <article id={'react'} role='article'
                                 className='group flex flex-col gap-4 p-6 rounded-2xl border border-gray-200/8 bg-white/6 dark:bg-black/30 backdrop-blur-sm shadow-sm hover:shadow-lg transition-transform hover:-translate-y-2'>
                            <div className='flex gap-6 items-start'>
                                <div className='flex-shrink-0'>
                                    <div
                                        className='w-16 h-16 rounded-xl flex items-center justify-center bg-gradient-to-tr from-cyan-400 to-blue-500 p-1'>
                                        <div className='bg-white/90 dark:bg-gray-900/70 rounded-lg p-2'>
                                            <Image
                                                src={isDayTime ? '/assets/front/icon1/react.svg' : '/assets/front/icon1/react1.svg'}
                                                alt='React' width={44} height={44}/>
                                        </div>
                                    </div>
                                </div>

                                <div className='flex-1'>
                                    <div className='flex items-start justify-between gap-4'>
                                        <div>
                                            <h3 className='text-2xl font-semibold'>React</h3>
                                            <div
                                                className='mt-1 text-sm text-slate-500 dark:text-slate-300'>Component-driven
                                                · Highly flexible
                                            </div>
                                        </div>

                                        <div className='text-right space-y-1'>
                                            <span
                                                className='inline-block px-2 py-1 text-xs rounded-md bg-slate-800/10 dark:bg-slate-200/6'>Maturity: Very High</span>
                                            <span
                                                className='inline-block px-2 py-1 text-xs rounded-md bg-slate-800/10 dark:bg-slate-200/6'>Ecosystem-rich</span>
                                        </div>
                                    </div>

                                    <p className='mt-3 text-[0.92em] text-justify text-slate-600 dark:text-slate-300'>
                                        Suited to high-interaction products where a component system, fine-grained
                                        rendering
                                        control, and progressive rendering strategies are required. Choose frameworks
                                        like
                                        Next.js or Remix for SSR/SSG and Vite for fast local iteration.
                                    </p>
                                </div>
                            </div>

                            <div className='grid grid-cols-2 gap-4 text-[0.88em] text-slate-600 dark:text-slate-300'>
                                <div>
                                    <strong>Use cases</strong>
                                    <ul className='mt-2 list-disc ml-5'>
                                        <li>Consumer-facing products, marketplaces, and dashboards</li>
                                        <li>Teams needing component libraries & cross-platform parity</li>
                                    </ul>
                                </div>
                                <div>
                                    <strong>Recommended stack</strong>
                                    <ul className='mt-2 list-disc ml-5'>
                                        <li>React + Next.js | Vite | React Query or SWR</li>
                                        <li>TypeScript, ESLint, Playwright/Cypress, Jest</li>
                                    </ul>
                                </div>
                            </div>

                            <div
                                className='mt-2 grid grid-cols-2 gap-4 text-[0.85em] text-slate-500 dark:text-slate-400'>
                                <div>
                                    <strong>Performance & Security</strong>
                                    <ul className='mt-2 list-disc ml-5'>
                                        <li>Server-side rendering for SEO-critical routes; streaming for fast TTFB</li>
                                        <li>Content security policy, strict mode, and dependency scanning</li>
                                    </ul>
                                </div>
                                <div>
                                    <strong>Testing & CI</strong>
                                    <ul className='mt-2 list-disc ml-5'>
                                        <li>Unit: Jest/RTL; E2E: Playwright</li>
                                        <li>CI: test coverage, perf budgets (Lighthouse), security scans</li>
                                    </ul>
                                </div>
                            </div>

                            <div className='mt-3 text-[0.85em] text-slate-500 dark:text-slate-400'>
                                <strong>Observability</strong>
                                <p className='mt-1'>Capture hydration metrics, client-side API error rates, and RUM
                                    traces. Define SLOs for Time to Interactive and error budget policies for
                                    releases.</p>
                            </div>

                            <div className='mt-4 flex items-center justify-between'>
                                <Link href={'/services/Reactjs-Development'}
                                      className='text-indigo-600 dark:text-indigo-400 font-medium hover:underline'>React
                                    Development ↗</Link>
                                <div className='flex gap-2 items-center text-xs text-slate-500 dark:text-slate-300'>
                                    <span className='px-2 py-1 rounded-md bg-black/5 dark:bg-white/6'>SSR/SSG</span>
                                    <span className='px-2 py-1 rounded-md bg-black/5 dark:bg-white/6'>PWA</span>
                                </div>
                            </div>
                        </article>

                        {/* HTML — Deep detail */}
                        <article id={'html'} role='article'
                                 className='group flex flex-col gap-4 p-6 rounded-2xl border border-gray-200/8 bg-white/6 dark:bg-black/30 backdrop-blur-sm shadow-sm hover:shadow-lg transition-transform hover:-translate-y-2'>
                            <div className='flex gap-6 items-start'>
                                <div className='flex-shrink-0'>
                                    <div
                                        className='w-16 h-16 rounded-xl flex items-center justify-center bg-gradient-to-tr from-orange-300 to-yellow-400 p-1'>
                                        <div className='bg-white/90 dark:bg-gray-900/70 rounded-lg p-2'>
                                            <Image
                                                src={isDayTime ? '/assets/front/icon1/html.svg' : '/assets/front/icon1/html1.svg'}
                                                alt='HTML' width={44} height={44}/>
                                        </div>
                                    </div>
                                </div>

                                <div className='flex-1'>
                                    <div className='flex items-start justify-between gap-4'>
                                        <div>
                                            <h3 className='text-2xl font-semibold'>HTML5</h3>
                                            <div className='mt-1 text-sm text-slate-500 dark:text-slate-300'>Semantic
                                                markup · Accessibility
                                            </div>
                                        </div>

                                        <div className='text-right space-y-1'>
                                            <span
                                                className='inline-block px-2 py-1 text-xs rounded-md bg-slate-800/10 dark:bg-slate-200/6'>Maturity: Core</span>
                                        </div>
                                    </div>

                                    <p className='mt-3 text-[0.92em] text-justify text-slate-600 dark:text-slate-300'>
                                        Semantic markup, progressive enhancement, and ARIA-first approaches form the
                                        foundation of inclusive, resilient interfaces.
                                    </p>
                                </div>
                            </div>

                            <div className='mt-2 text-[0.88em] text-slate-500 dark:text-slate-400'>
                                <strong>Checklist</strong>
                                <ul className='mt-2 list-disc ml-5'>
                                    <li>Landmark regions, semantic headings, and accessible forms</li>
                                    <li>Server-side rendered content where SEO matters; pre-render static content</li>
                                </ul>
                            </div>

                            <div className='mt-3 text-[0.85em] text-slate-500 dark:text-slate-400'>
                                <strong>Performance targets</strong>
                                <p className='mt-1'>Aim for first-contentful-paint &lt; 1.2s on 3G simulated mobile;
                                    enforce image and font optimization pipeline.</p>
                            </div>
                        </article>

                        {/* CSS — Deep detail */}
                        <article id={'css'} role='article'
                                 className='group flex flex-col gap-4 p-6 rounded-2xl border border-gray-200/8 bg-white/6 dark:bg-black/30 backdrop-blur-sm shadow-sm hover:shadow-lg transition-transform hover:-translate-y-2'>
                            <div className='flex gap-6 items-start'>
                                <div className='flex-shrink-0'>
                                    <div
                                        className='w-16 h-16 rounded-xl flex items-center justify-center bg-gradient-to-tr from-sky-300 to-slate-400 p-1'>
                                        <div className='bg-white/90 dark:bg-gray-900/70 rounded-lg p-2'>
                                            <Image
                                                src={isDayTime ? '/assets/front/icon1/css.svg' : '/assets/front/icon1/css1.svg'}
                                                alt='CSS' width={44} height={44}/>
                                        </div>
                                    </div>
                                </div>

                                <div className='flex-1'>
                                    <div className='flex items-start justify-between gap-4'>
                                        <div>
                                            <h3 className='text-2xl font-semibold'>CSS & Design Systems</h3>
                                            <div className='mt-1 text-sm text-slate-500 dark:text-slate-300'>Design
                                                tokens · Theming · Scale
                                            </div>
                                        </div>

                                        <div className='text-right space-y-1'>
                                            <span
                                                className='inline-block px-2 py-1 text-xs rounded-md bg-slate-800/10 dark:bg-slate-200/6'>Maturity: High</span>
                                        </div>
                                    </div>

                                    <p className='mt-3 text-[0.92em] text-justify text-slate-600 dark:text-slate-300'>
                                        Scale design systems with tokens, componentized styles, and a strict versioning
                                        policy. Ensure theme parity and runtime theming for multi-brand deployments.
                                    </p>
                                </div>
                            </div>

                            <div
                                className='mt-2 grid grid-cols-2 gap-4 text-[0.88em] text-slate-500 dark:text-slate-400'>
                                <div>
                                    <strong>Patterns</strong>
                                    <ul className='mt-2 list-disc ml-5'>
                                        <li>Design tokens, atomic components, visual regression testing</li>
                                        <li>Scoped styles: CSS modules, Tailwind, or CSS-in-JS (with strict runtime
                                            budgets)
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <strong>QA</strong>
                                    <ul className='mt-2 list-disc ml-5'>
                                        <li>Visual diffs, accessibility audits (axe), and contrast checks</li>
                                        <li>Automated theming tests and cross-browser regression</li>
                                    </ul>
                                </div>
                            </div>
                        </article>

                        {/* Vue — Deep detail */}
                        <article id={'vue'} role='article'
                                 className='group flex flex-col gap-4 p-6 rounded-2xl border border-gray-200/8 bg-white/6 dark:bg-black/30 backdrop-blur-sm shadow-sm hover:shadow-lg transition-transform hover:-translate-y-2'>
                            <div className='flex gap-6 items-start'>
                                <div className='flex-shrink-0'>
                                    <div
                                        className='w-16 h-16 rounded-xl flex items-center justify-center bg-gradient-to-tr from-green-300 to-emerald-500 p-1'>
                                        <div className='bg-white/90 dark:bg-gray-900/70 rounded-lg p-2'>
                                            <Image
                                                src={isDayTime ? '/assets/front/icon1/vue.svg' : '/assets/front/icon1/vue1.svg'}
                                                alt='Vue' width={44} height={44}/>
                                        </div>
                                    </div>
                                </div>

                                <div className='flex-1'>
                                    <div className='flex items-start justify-between gap-4'>
                                        <div>
                                            <h3 className='text-2xl font-semibold'>Vue.js</h3>
                                            <div className='mt-1 text-sm text-slate-500 dark:text-slate-300'>Progressive
                                                enhancement · Developer ergonomics
                                            </div>
                                        </div>

                                        <div className='text-right space-y-1'>
                                            <span
                                                className='inline-block px-2 py-1 text-xs rounded-md bg-slate-800/10 dark:bg-slate-200/6'>Maturity: High</span>
                                        </div>
                                    </div>

                                    <p className='mt-3 text-[0.92em] text-justify text-slate-600 dark:text-slate-300'>
                                        Fast to ship and easy to onboard. Well-suited for teams that prioritise rapid
                                        iteration
                                        and maintainability with a gentle learning curve.
                                    </p>
                                </div>
                            </div>

                            <div className='mt-2 text-[0.88em] text-slate-500 dark:text-slate-400'>
                                <strong>Guidance</strong>
                                <ul className='mt-2 list-disc ml-5'>
                                    <li>Use Vite + Vue 3 + Pinia for small-to-medium applications</li>
                                    <li>Adopt SSR or pre-rendering for SEO-sensitive routes</li>
                                </ul>
                            </div>

                            <div className='mt-3 flex items-center justify-between'>
                                <Link href={'/services/Vuejs-Development'}
                                      className='text-indigo-600 dark:text-indigo-400 font-medium hover:underline'>Vue.js
                                    Development ↗</Link>
                                <div className='flex gap-2 items-center text-xs text-slate-500 dark:text-slate-300'>
                                    <span className='px-2 py-1 rounded-md bg-black/5 dark:bg-white/6'>Vite</span>
                                </div>
                            </div>
                        </article>

                        {/* JavaScript — Deep detail */}
                        <article id={'javascript'} role='article'
                                 className='group flex flex-col gap-4 p-6 rounded-2xl border border-gray-200/8 bg-white/6 dark:bg-black/30 backdrop-blur-sm shadow-sm hover:shadow-lg transition-transform hover:-translate-y-2'>
                            <div className='flex gap-6 items-start'>
                                <div className='flex-shrink-0'>
                                    <div
                                        className='w-16 h-16 rounded-xl flex items-center justify-center bg-gradient-to-tr from-yellow-300 to-orange-400 p-1'>
                                        <div className='bg-white/90 dark:bg-gray-900/70 rounded-lg p-2'>
                                            <Image
                                                src={isDayTime ? '/assets/front/icon1/js.png' : '/assets/front/icon1/js1.png'}
                                                alt='JavaScript' width={44} height={44}/>
                                        </div>
                                    </div>
                                </div>

                                <div className='flex-1'>
                                    <div className='flex items-start justify-between gap-4'>
                                        <div>
                                            <h3 className='text-2xl font-semibold'>JavaScript (ES6+)</h3>
                                            <div className='mt-1 text-sm text-slate-500 dark:text-slate-300'>Runtime
                                                features · Modern toolchain
                                            </div>
                                        </div>

                                        <div className='text-right space-y-1'>
                                            <span
                                                className='inline-block px-2 py-1 text-xs rounded-md bg-slate-800/10 dark:bg-slate-200/6'>Maturity: Core</span>
                                        </div>
                                    </div>

                                    <p className='mt-3 text-[0.92em] text-justify text-slate-600 dark:text-slate-300'>
                                        The foundation for in-browser logic and tooling. Focus on small, auditable
                                        bundles,
                                        modern module syntax, and deterministic builds.
                                    </p>
                                </div>
                            </div>

                            <div className='mt-2 text-[0.88em] text-slate-500 dark:text-slate-400'>
                                <strong>Best practices</strong>
                                <ul className='mt-2 list-disc ml-5'>
                                    <li>Strict linting & TypeScript where possible</li>
                                    <li>Bundle splitting, tree-shaking, and service-worker caching strategies</li>
                                </ul>
                            </div>

                            <div className='mt-4 flex items-center justify-between'>
                                <Link href={'/services/Javascript'}
                                      className='text-indigo-600 dark:text-indigo-400 font-medium hover:underline'>Javascript
                                    Development ↗</Link>
                                <div className='flex gap-2 items-center text-xs text-slate-500 dark:text-slate-300'>
                                    <span className='px-2 py-1 rounded-md bg-black/5 dark:bg-white/6'>ES6+</span>
                                </div>
                            </div>
                        </article>

                    </section>

                    {/* Operational notes: telemetry, SLOs, rollout */}
                    <div className='mt-8 border-t border-gray-200/8 pt-6 text-sm text-slate-500 dark:text-slate-400'>
                        <strong>Operational guidance</strong>
                        <ul className='mt-2 ml-5 list-disc'>
                            <li>Telemetry: Instrument client-side RUM (TTI, FCP), API latency, and error-rate metrics.
                            </li>
                            <li>SLOs: Define Time to Interactive and Error Rate SLOs before major releases.</li>
                            <li>Rollout: Canary releases with feature flags; automated rollback on SLO breaches.</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Mid image - refined futuristic hero */}
            <div id={'mid image'}
                 className={'relative h-[420px] sm:h-[520px] max-w-full w-full mx-auto overflow-hidden rounded-2xl'}
                 role={'region'} aria-label={'Frontend architecture hero'}>
                {/* Retain background image for SEO and visual continuity */}
                <Image
                    className={'absolute inset-0 w-full h-full object-cover'}
                    src={'/assets/front/midd.jpg'}
                    alt={'Abstract visualization of frontend architecture: layered UIs, micro-frontends, edge caching, low-latency delivery.'}
                    width={2560}
                    height={1440}
                    style={{
                        objectPosition: 'center'
                    }}
                />

                {/* Layered color grading for a professional, futuristic tone */}
                <div
                    className='absolute inset-0 bg-gradient-to-br from-[#071033]/40 via-[#08263a]/12 to-transparent mix-blend-overlay pointer-events-none'/>
                <div
                    className='absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),transparent 40%)] pointer-events-none'/>

                {/* Main content panel — glass card with concise, technical messaging */}
                <div className='relative z-20 max-w-full mx-auto h-full flex items-center px-4 sm:px-6 lg:px-[4.5em]'>
                    <section className='w-full grid grid-cols-1 lg:grid-cols-2 gap-6 items-center'>
                        {/* Visual accent on large screens */}
                        <div className='hidden lg:flex items-center justify-center p-4'>
                            <div
                                className='w-full h-48 md:h-56 rounded-xl border border-white/6 bg-white/4 backdrop-blur-sm flex items-center justify-center'>
                                <svg width='120' height='120' viewBox='0 0 120 120' fill='none'
                                     xmlns='http://www.w3.org/2000/svg' aria-hidden='true'>
                                    <rect x='4' y='4' width='112' height='112' rx='14' stroke='rgba(255,255,255,0.06)'
                                          strokeWidth='2'/>
                                    <path d='M18 78 L48 42 L78 78' stroke='rgba(92,234,255,0.9)' strokeWidth='2'
                                          strokeLinecap='round' strokeLinejoin='round'/>
                                </svg>
                            </div>
                        </div>

                        <article
                            className='bg-white/5 dark:bg-slate-900/50 backdrop-blur-md border border-white/6 rounded-2xl p-6 sm:p-8 text-slate-50'>
                            <h3 className='text-[1.05em] sm:text-[1.4em] md:text-[1.6em] font-semibold leading-tight'>
                                Front-End Systems — Secure, Observable, Edge-First
                            </h3>

                            <p className='mt-2 text-[0.92em] text-slate-200/95'>
                                Predictable performance and operational clarity: small audit-ready bundles, edge-aware
                                delivery, feature-flagged rollouts, and telemetry-driven releases.
                            </p>

                            <ul className='mt-4 space-y-2 text-[0.9em] text-slate-300'>
                                <li className='flex gap-3 items-start'>
                                    <span className='w-2.5 h-2.5 rounded-full bg-cyan-400 mt-1'/>
                                    Deterministic builds & immutable, verifiable releases
                                </li>
                                <li className='flex gap-3 items-start'>
                                    <span className='w-2.5 h-2.5 rounded-full bg-indigo-400 mt-1'/>
                                    Edge CDN strategies with fine-grained invalidation and cache control
                                </li>
                                <li className='flex gap-3 items-start'>
                                    <span className='w-2.5 h-2.5 rounded-full bg-emerald-400 mt-1'/>
                                    Observability-first: RUM, distributed traces, SLO-based automation
                                </li>
                            </ul>

                            <div className='mt-4 flex flex-wrap gap-2'>
                                {['TypeScript', 'ESM', 'Vite', 'Edge CDN', 'RUM', 'Feature Flags'].map((chip) => (
                                    <span key={chip}
                                          className='px-3 py-1 text-xs rounded-full bg-white/6 text-slate-100'>
                                        {chip}
                                    </span>
                                ))}
                            </div>
                        </article>
                    </section>
                </div>

                {/* Depth gradient */}
                <div
                    className='pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/20 to-transparent'/>
            </div>

            {/* Front-end Development Business Benefits — extremely detailed, professional design */}
            <section id={'business benefit'} aria-label={'Frontend business benefits'}
                     className={`relative lg:top-10 py-16 lg:mb-20 mb-10 max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>

                {/* Header: concise, technical brief */}
                <div className={`grid lg:grid-cols-2 gap-6 pb-6 border-b border-gray-300/16 ${isDayTime ? 'text-black' : 'text-white'}`}>
                    <div>
                        <h2 className='text-[1.05em] sm:text-[1.5em] md:text-[2.1em] lg:text-[2.6em] font-extrabold tracking-tight leading-[1.02]'>
                            Business Benefits — Measured, Actionable, and Engineered
                        </h2>

                        <p className='mt-3 text-[0.95em] font-[300] text-slate-400 max-w-3xl'>
                            Each benefit represents a convergent set of engineering practices, operational controls and
                            product experiments designed to move KPIs. The cards below include target metrics, recommended
                            tooling, and concrete implementation notes to make each benefit actionable for engineering teams.
                        </p>

                        <div className='mt-4 flex flex-wrap gap-3'>
                            <div className='px-3 py-2 rounded-lg bg-gradient-to-r from-cyan-500/6 to-indigo-500/6 border border-white/6'>
                                <div className='text-xs text-cyan-300 uppercase tracking-wider font-semibold'>Target</div>
                                <div className='text-sm text-slate-100 font-bold'>TTI ≤ 1.2s</div>
                            </div>
                            <div className='px-3 py-2 rounded-lg bg-white/4 border border-white/6'>
                                <div className='text-xs text-slate-300 uppercase tracking-wider font-semibold'>SLO</div>
                                <div className='text-sm text-slate-100 font-bold'>Error-rate ≤ 0.2%</div>
                            </div>
                        </div>
                    </div>

                    <aside className='lg:-ml-8 flex items-start justify-end'>
                        <div className='bg-black/18 dark:bg-white/5 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/6 w-full max-w-xs'>
                            <div className='flex items-center gap-3'>
                                <svg width='36' height='36' viewBox='0 0 24 24' fill='none' aria-hidden>
                                    <circle cx='12' cy='12' r='10' stroke='url(#g2)' strokeWidth='1.5' />
                                    <defs>
                                        <linearGradient id='g2' x1='0' x2='1'>
                                            <stop offset='0' stopColor='#06b6d4' />
                                            <stop offset='1' stopColor='#8b5cf6' />
                                        </linearGradient>
                                    </defs>
                                </svg>
                                <div>
                                    <div className='text-xs text-cyan-300 uppercase tracking-wider font-semibold'>Operational Summary</div>
                                    <div className='text-sm text-slate-200 mt-1'>20ms median deploy time · Observability-first pipelines</div>
                                </div>
                            </div>

                            <div className='mt-4 grid grid-cols-2 gap-2 text-xs text-slate-300'>
                                <div>
                                    <div className='font-semibold text-slate-100'>CI</div>
                                    <div>Lint, Typecheck, Perf gate</div>
                                </div>
                                <div>
                                    <div className='font-semibold text-slate-100'>Runtime</div>
                                    <div>RUM, Traces, Error aggregation</div>
                                </div>
                            </div>

                        </div>
                    </aside>
                </div>

                {/* Deeply detailed benefits grid — six cards with metrics, tools, and implementation notes */}
                <div className='mt-8 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>

                    {[
                        {
                            id: 'faster-load',
                            title: 'Faster Load Time',
                            iconDay: '/assets/front/icon2/test.svg',
                            iconNight: '/assets/front/icon2/test1.svg',
                            metric: 'TTI ≤ 1.2s',
                            desc: 'Reduce cold-start and render-blocking work by shipping tiny, audited bundles and prioritising critical rendering paths.',
                            bullets: ['Split critical & non-critical bundles', 'Use HTTP/2 push sparingly, rely on CDN preconnect', 'Enforce CI performance budgets (Lighthouse)'],
                            tools: ['Vite', 'Rollup', 'Cloud CDN', 'Lighthouse']
                        },
                        {
                            id: 'mobile-resp',
                            title: 'Mobile Responsiveness',
                            iconDay: '/assets/front/icon2/fast.svg',
                            iconNight: '/assets/front/icon2/fast1.svg',
                            metric: 'CLS < 0.1 · LCP < 2.5s',
                            desc: 'Adaptive UIs that progressively enhance for fast networks and degrade gracefully under constrained conditions.',
                            bullets: ['Fluid grid + container queries', 'Priority image formats & size-aware loading', 'Network-aware resource throttling'],
                            tools: ['Tailwind', 'imgix/Cloudinary', 'Client-hints']
                        },
                        {
                            id: 'conversion-growth',
                            title: 'Conversion & Growth',
                            iconDay: '/assets/front/icon2/att.svg',
                            iconNight: '/assets/front/icon2/att1.svg',
                            metric: '↑ Conversion (est.) +10–20%',
                            desc: 'Run targeted experiments, reduce friction in key funnels, and roll out improvements safely with feature flags.',
                            bullets: ['Hypothesis-driven A/B tests', 'Feature flags & gradual rollouts', 'Telemetry-driven prioritisation'],
                            tools: ['LaunchDarkly', 'Split.io', 'Segment', 'Amplitude']
                        },
                        {
                            id: 'ux',
                            title: 'Enhanced User Experience',
                            iconDay: '/assets/front/icon2/fast.svg',
                            iconNight: '/assets/front/icon2/fast1.svg',
                            metric: 'Accessibility score ≥ 90',
                            desc: 'Accessibility-first patterns ensure keyboard, screen-reader and low-bandwidth compatibility for broader reach and retention.',
                            bullets: ['Semantic components & ARIA patterns', 'Automated axe/lighthouse audits in CI', 'Keyboard-first interaction flows'],
                            tools: ['React Aria', 'axe-core', 'Storybook']
                        },
                        {
                            id: 'scalability',
                            title: 'Scalability & Future-proofing',
                            iconDay: '/assets/front/icon2/fast.svg',
                            iconNight: '/assets/front/icon2/fast1.svg',
                            metric: 'Autoscale · Modular releases',
                            desc: 'Modular frontends, well-defined contracts and independent deploys reduce blast radius while enabling rapid feature delivery.',
                            bullets: ['Micro-frontends with strict APIs', 'Parcel/Edge function co-located logic', 'Contract tests & CI gating'],
                            tools: ['Module Federation', 'OpenAPI', 'Cypress']
                        },
                        {
                            id: 'seo',
                            title: 'SEO & Discoverability',
                            iconDay: '/assets/front/icon2/cust.svg',
                            iconNight: '/assets/front/icon2/cust1.svg',
                            metric: '↑ Organic traffic (est.) +25%',
                            desc: 'Semantic markup, clean routing and fast experiences improve crawlability and increase long-term organic growth.',
                            bullets: ['Canonical URLs & structured data', 'Server-side rendering where critical', 'Fast critical-path assets'],
                            tools: ['Next.js/SSR', 'Sitemap/robots', 'Google Search Console']
                        }
                    ].map((card) => (
                        <article key={card.id} aria-labelledby={`${card.id}-title`} className='relative p-6 rounded-3xl border border-white/6 bg-gradient-to-tr from-white/6 to-transparent backdrop-blur-lg'>

                            <div className='flex items-start gap-4'>
                                <Image src={isDayTime ? card.iconDay : card.iconNight} alt={card.title} width={64} height={64} className='w-16 h-16'/>
                                <div className='flex-1'>
                                    <div className='flex items-center justify-between'>
                                        <h3 id={`${card.id}-title`} className='text-[1.1em] font-semibold'>{card.title}</h3>
                                        <div className='text-xs px-2 py-1 rounded-md bg-white/8 text-slate-100 font-medium'>{card.metric}</div>
                                    </div>

                                    <p className='mt-2 text-[0.92em] text-slate-300'>{card.desc}</p>

                                    <div className='mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[0.86em] text-slate-300'>
                                        <ul className='space-y-1'>
                                            {card.bullets.map((b) => (<li key={b}>• {b}</li>))}
                                        </ul>
                                        <div>
                                            <div className='text-xs text-slate-400 uppercase tracking-wider mb-2'>Recommended</div>
                                            <div className='flex flex-wrap gap-2'>
                                                {card.tools.map((t) => (<span key={t} className='px-2 py-0.5 text-xs rounded-full bg-white/6 text-slate-100'>{t}</span>))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className='mt-4 flex items-center justify-between'>
                                        <a href={`#${card.id}-details`} className='text-xs text-cyan-300 hover:underline'>Implementation notes</a>
                                        <div className='text-xs text-slate-400'>Measured in production</div>
                                    </div>
                                </div>
                            </div>

                        </article>
                    ))}

                </div>

            </section>

            {/* Trusted Digital Partners */}
            <div className={`${isDayTime ? 'bg-gray-50' : 'bg-gray-950'}`}>
                <div id={'partners'}
                     className={`relative lg:py-20 lg:mb-20 md:mb-20 mb-5 max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]  ${
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
                            Start a project <span className={`text-[1.5em] leading-[0.7]`}> →</span></span>
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

            {/* Development Process & Methodology Section - EXTREMELY DETAILED, PROFESSIONAL */}
            <section className={`relative py-20 lg:py-32 ${isDayTime ? 'bg-white text-black' : 'bg-black text-white'}`}>
                <FxBackground day={isDayTime} aurora grid/>
                <FxOrbit size={520} top="-120px" right="-160px" opacity={0.08} speed={22}/>
                <FxOrbit size={320} bottom="-80px" left="-100px" opacity={0.06} speed={30} reverse/>

                <div className="relative z-10 mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.5em]">
                    {/* Section Header */}
                    <div className="max-w-3xl mb-12">
                        <FxChip day={!isDayTime}>OUR METHODOLOGY</FxChip>
                        <FxReveal>
                            <h2 className="text-[2.2em] lg:text-[3.6em] font-[800] leading-[1.04] tracking-tight mt-4 mb-3">
                                Development Process & Delivery — <span className="gx-gradient-text">Governed, Measurable, Iterative</span>
                            </h2>
                        </FxReveal>
                        <FxReveal delay={0.06}>
                            <p className={`text-[0.98em] lg:text-[1.02em] leading-[1.75] font-[300] ${isDayTime ? 'text-gray-600' : 'text-gray-400'}`}>
                                An outcomes-first engineering practice that unites product strategy, UX research, accessible design systems and resilient front-end engineering. Each phase below defines explicit deliverables, stakeholders, tools, acceptance criteria and measurable success metrics to reduce risk and accelerate value delivery.
                            </p>
                        </FxReveal>
                    </div>

                    {/* Detailed process grid — rich cards with professional detail */}
                    <div className="grid lg:grid-cols-5 md:grid-cols-2 grid-cols-1 gap-6 lg:gap-8">
                        {[
                            {
                                step: '01',
                                title: 'Discovery & Insight',
                                timeframe: '1–2 weeks',
                                description: 'Rapid research sprints to validate problem space, quantify opportunity and align stakeholders on success criteria.',
                                deliverables: ['Opportunity map & hypothesis log', 'Stakeholder alignment deck', 'User personas & journey maps', 'Analytics baseline & conversion funnels'],
                                roles: ['Product Lead', 'UX Researcher', 'Eng Lead'],
                                tools: ['Figma', 'Hotjar/FullStory', 'Google Analytics', 'Miro'],
                                acceptance: 'Signed opportunity map, measurable success KPIs, prioritised backlog'
                            },
                            {
                                step: '02',
                                title: 'Strategy & Architecture',
                                timeframe: '1–3 weeks',
                                description: 'Define a scalable information architecture, performance budget and a technology strategy that balances speed, maintainability and cost.',
                                deliverables: ['Sitemap & content model', 'Component & data contracts', 'Performance budget & SLIs', 'Risk & migration plan'],
                                roles: ['Technical Architect', 'Content Strategist', 'PM'],
                                tools: ['Lucidchart/Whimsical', 'Notion', 'OpenAPI/Swagger'],
                                acceptance: 'Approved architecture docs, backlog with non-functional requirements and estimated roadmap'
                            },
                            {
                                step: '03',
                                title: 'Design Systems & Prototyping',
                                timeframe: '2–6 weeks',
                                description: 'Build an accessible, tokenised design system and validated interactive prototypes that reduce dev rework and speed engineering handoff.',
                                deliverables: ['Design tokens & accessibility matrix', 'Component library (Figma + React examples)', 'Interactive prototypes & test scripts', 'Usability test report with prioritized fixes'],
                                roles: ['Design System Engineer', 'UX Designer', 'QA'],
                                tools: ['Figma', 'Storybook', 'aXe/Deque', 'Playwright/Cypress for visual tests'],
                                acceptance: 'Design system repo, storybook coverage, pass on accessibility baseline (WCAG AA)'
                            },
                            {
                                step: '04',
                                title: 'Engineering & Launch',
                                timeframe: 'variable (sprints)',
                                description: 'Component-driven implementation paired with automated testing, CI/CD pipelines and observability to ensure safe, repeatable releases.',
                                deliverables: ['Production-ready component library', 'Automated test suites (unit, integration, e2e)', 'CI/CD workflows, feature flags', 'Monitoring & runbooks'],
                                roles: ['Frontend Engineers', 'DevOps', 'Product Owner'],
                                tools: ['Vite/Next.js', 'Jest/Testing Library', 'GitHub Actions', 'Sentry/NewRelic'],
                                acceptance: 'Green build, pre-production smoke tests passed, rollout plan and monitoring configured'
                            },
                            {
                                step: '05',
                                title: 'Operate, Measure & Iterate',
                                timeframe: 'Ongoing',
                                description: 'Data-driven post-launch operations that close the loop between user signals and product decisions.',
                                deliverables: ['Dashboards & KPI reports', 'A/B test plans & results', 'Technical debt register & backlog', 'Quarterly roadmap updates'],
                                roles: ['Product Manager', 'Data Analyst', 'Engineering Lead'],
                                tools: ['Looker/GA4', 'Optimizely/VWO', 'Linear/Jira', 'PagerDuty'],
                                acceptance: 'Improvement in target KPIs, reduction in critical incidents, and validated product experiments'
                            }
                        ].map((c, idx) => (
                            <FxReveal key={c.step} delay={0.06 + idx * 0.06}>
                                <div className={`relative p-6 rounded-2xl overflow-hidden border transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl ${isDayTime ? 'bg-white/95 text-black border-slate-100' : 'bg-white/6 text-white border-white/8'}`}>
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <div className="text-sm text-gray-500 font-medium">{c.step}</div>
                                            <div className="text-xs text-gray-400 mt-1">{c.timeframe}</div>
                                        </div>
                                    </div>
                                    <h3 className="text-[1.05em] lg:text-[1.25em] font-[800] mb-3">{c.title}</h3>
                                    <p className={`text-[0.92em] leading-[1.6] font-[300] mb-3 ${isDayTime ? 'text-gray-600' : 'text-gray-300'}`}>{c.description}</p>

                                    <div className="text-[0.90em] font-[500] mb-2">Key Deliverables</div>
                                    <ul className={`text-[0.9em] leading-[1.5] font-[300] list-disc pl-5 mb-3 ${isDayTime ? 'text-gray-600' : 'text-gray-300'}`}>
                                        {c.deliverables.map((d, i) => <li key={i}>{d}</li>)}
                                    </ul>

                                    <div className="flex flex-col gap-2 mt-2 text-[0.85em] text-gray-400">
                                        <div><strong>Roles:</strong> {c.roles.join(', ')}</div>
                                        <div><strong>Tools & Artifacts:</strong> {c.tools.join(', ')}</div>
                                        <div><strong>Acceptance:</strong> {c.acceptance}</div>
                                    </div>
                                </div>
                            </FxReveal>
                        ))}
                    </div>

                    {/* Outcomes & KPIs row */}
                    <FxReveal delay={0.4}>
                        <div className={`mt-10 p-6 rounded-xl border ${isDayTime ? 'bg-white/95 border-slate-100 text-black' : 'bg-white/6 border-white/8 text-white'}`}>
                            <h4 className="text-[1.1em] font-[700] mb-3">Outcomes & Measurement</h4>
                            <p className={`text-[0.95em] font-[300] mb-4 ${isDayTime ? 'text-gray-600' : 'text-gray-300'}`}>
                                Every engagement includes a tailored measurement plan. Typical KPIs include Time-to-Interactive, Core Web Vitals improvements, conversion lift, accessibility score (WCAG compliance), and mean time to recovery for incidents. Quarterly reviews align product outcomes with business objectives.
                            </p>
                            <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
                                <div className="p-4 rounded-lg bg-transparent border">
                                    <div className="text-sm text-gray-400">Performance</div>
                                    <div className="font-[700] text-[1.4em]">Lighthouse & Core Web Vitals</div>
                                </div>
                                <div className="p-4 rounded-lg bg-transparent border">
                                    <div className="text-sm text-gray-400">Reliability</div>
                                    <div className="font-[700] text-[1.4em]">Error rate & MTTR</div>
                                </div>
                                <div className="p-4 rounded-lg bg-transparent border">
                                    <div className="text-sm text-gray-400">Business</div>
                                    <div className="font-[700] text-[1.4em]">Conversion & Retention</div>
                                </div>
                            </div>
                        </div>
                    </FxReveal>

                </div>
            </section>

            {/* Last image*/}
            <div id={'last image'} className={'lg:-mt-[10em] h-auto max-w-full w-full mx-auto'}>
                <Image
                    className={' object-fill'}
                    src={'/assets/front/last.jpg'}
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

export default FrontendDevelopment;

