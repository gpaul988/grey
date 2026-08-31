'use client';

import React, {useEffect, useRef, useState} from 'react';
import '@/app/globals.css'
import Image from "next/image";
import ResponsiveVideoHero from '@/components/ResponsiveVideoHero';
import ServiceCapabilities from '@/components/futuristic/ServiceCapabilities';
import Link from "next/link";
import {useIsDayTime} from '../../components/useIsDayTime';

import FuturisticServiceLayout from '@/components/futuristic/FuturisticServiceLayout';

import {
    FxBackground,
    FxChip,
    FxReveal,
    FxButton,
    FxHoloCard,
    FxStickyScrollSection,
    FxFrame
} from '@/components/futuristic/fx';

const HybridAppDevelopment = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isBackgroundActive, setIsBackgroundActive] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
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
            "RNAD",
            "IAD",
            "HAM",
            "HA",
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

            {/* Unified Futuristic Hybrid App Development Hero - Background Image/Video with overlay */}
            <section className="relative overflow-hidden lg:w-full lg:min-h-[90vh] lg:h-[720px] w-full h-[600px]">
                {/* Video Background (desktop) and Image fallback (mobile) */}
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="hidden lg:block absolute inset-0 w-full h-full object-cover"
                    poster="/assets/hybrid/hero.jpg"
                >
                    <source src="/assets/hybrid/hero-mobile.mp4" type="video/mp4"/>
                </video>

                <Image
                    src="/assets/hybrid/hero.jpg"
                    alt="Hybrid App Development Hero"
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
                    className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.12),transparent_50%)] z-[2]"/>

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
                                <div className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-pulse"/>
                                <span
                                    className="text-purple-400 text-[0.7em] lg:text-[0.82em] uppercase tracking-[0.22em] font-[600]">Hybrid Development</span>
                            </div>

                            <h1 className="text-white text-[2em] lg:text-[4.5em] font-[700] leading-[1.08] tracking-tight mb-6 lg:mb-8">
                                Cross-Platform Apps, <span className="gx-gradient-text">Native Performance</span>
                            </h1>

                            <p className="text-white/70 text-[0.85em] lg:text-[1.08em] leading-[1.65] mb-8 lg:mb-10 font-[300]">
                                Build powerful cross-platform applications with React Native, Flutter, and Ionic. We
                                deliver native performance and seamless user experiences across iOS, Android, and web
                                platforms—all from a single codebase.
                            </p>

                            <div className="flex flex-wrap gap-2 mb-10 lg:mb-12">
                                {['React Native', 'Flutter', 'Ionic', 'Cross-Platform', 'Performance'].map((badge) => (
                                    <span key={badge}
                                          className="px-3 py-1.5 rounded-full bg-purple-400/10 border border-purple-400/30 text-purple-300 text-[0.7em] lg:text-[0.75em] font-[600] uppercase tracking-wider">
                                            {badge}
                                        </span>
                                ))}
                            </div>

                            <div className="flex flex-wrap gap-4 items-center">
                                <Link href="/contact">
                                    <button
                                        className="relative px-8 py-3 rounded-full text-[0.85em] lg:text-[0.88em] font-bold overflow-hidden hover:shadow-lg transition-shadow duration-300 whitespace-nowrap"
                                        style={{background: '#a78bfa', color: '#000'}}>
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
                                    {label: 'Apps Deployed', value: '45+'},
                                    {label: 'Years Experience', value: '8+'},
                                    {label: 'Client Satisfaction', value: '98%'},
                                    {label: 'Dev Efficiency', value: '60%'}
                                ].map((stat) => (
                                    <div key={stat.label}
                                         className="px-6 py-5 rounded-2xl border border-purple-400/25 bg-purple-400/8 backdrop-blur-md hover:bg-purple-400/12 transition-all duration-300 hover:border-purple-400/50 text-right">
                                        <div
                                            className="text-purple-300 text-[0.7em] uppercase tracking-wider font-[600] mb-2">{stat.label}</div>
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
                            {label: 'Apps', value: '45+'},
                            {label: 'Satisfaction', value: '98%'},
                            {label: 'Efficiency', value: '60%'}
                        ].map((stat) => (
                            <div key={stat.label}
                                 className="px-3 py-3 rounded-xl border border-purple-400/25 bg-purple-400/8 backdrop-blur-md text-center">
                                <div
                                    className="text-purple-300 text-[0.6em] uppercase tracking-wider font-[600] mb-1">{stat.label}</div>
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
                        <FxChip day={!isBackgroundActive ? !isDayTime : isDayTime}>CROSS-PLATFORM EXCELLENCE</FxChip>
                    </div>

                    <div className="lg:-ml-[19em]">
                        <FxReveal>
                            <h3 className="lg:text-[3.5em] md:text-[3em] text-[2em] font-[700] tracking-tight leading-[1.15] mt-4">
                                Build Once, Deploy <span
                                className="gx-gradient-text">Everywhere</span>
                            </h3>
                        </FxReveal>

                        <FxReveal delay={0.08}>
                            <div
                                className="grid lg:grid-cols-2 grid-cols-1 gap-6 mt-6 font-[300] text-justify text-[0.95em] md:text-[1.05em] leading-relaxed">
                                <div className="space-y-4">
                                    <p>At Grey InfoTech, we specialize in developing high-performance hybrid
                                        applications that provide seamless experiences across all major platforms—iOS,
                                        Android, and web. By combining the strengths of native app functionality with
                                        the flexibility of web technologies, we offer a cost-effective solution that
                                        allows businesses to reach a wider audience while simplifying app
                                        maintenance.</p>
                                    <p>Our hybrid approach reduces time to market, improves scalability, and ensures
                                        that your app can evolve with your business needs. We employ a rigorous
                                        development process: comprehensive discovery, architecture design, iterative
                                        development, and quality assurance—ensuring every line of code delivers value
                                        and performance.</p>
                                    <div className="flex flex-wrap gap-3 mt-4">
                                        {['React Native', 'Flutter Integration', 'Native Performance', 'Code Efficiency'].map((p) => (
                                            <span key={p} className="gx-data-pill">{p}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <p>Whether you're launching a new app, enhancing an existing one, or migrating from
                                        a native technology stack, we work closely with you throughout every phase of
                                        development. Our team ensures that each application we build is intuitive,
                                        engaging, and designed for long-term success with optimal performance across all
                                        platforms.</p>
                                    <p>Our end-to-end approach spans discovery consultation, strategic planning,
                                        architecture design, development, deployment, and ongoing support. We partner
                                        collaboratively with your team, providing transparent communication, regular
                                        reviews, and strategic recommendations—focused on delivering long-term value,
                                        measurable results, and sustainable growth.</p>
                                    <div className="flex flex-wrap gap-3 mt-4">
                                        {['Multi-Platform Sync', 'Native APIs', 'Performance Monitoring', 'Scalable Infrastructure'].map((p) => (
                                            <span key={p} className="gx-data-pill">{p}</span>
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
                    <div className="relative overflow-hidden rounded-[2rem] p-6 sm:p-8 lg:p-10 border border-white/10">
                        <div
                            className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(139,92,246,0.18),transparent_30%),linear-gradient(130deg,rgba(255,255,255,0.04),rgba(2,6,23,0.94))]"/>
                        <div className="absolute inset-0 border border-white/10 rounded-[2rem] pointer-events-none"/>
                        <div
                            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-400/70 to-transparent"/>
                        <div
                            className="absolute right-6 top-6 h-24 w-24 rounded-full border border-purple-400/20 blur-3xl"/>
                        <div
                            className="absolute bottom-8 left-8 h-28 w-28 rounded-full border border-purple-400/15 blur-[90px]"/>
                        <div
                            className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.035)_50%,transparent_100%)]"/>
                        <div
                            className="absolute inset-0 bg-[linear-gradient(0deg,transparent_0%,rgba(255,255,255,0.025)_50%,transparent_100%)]"/>

                        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                            <div className="max-w-2xl">
                                <FxChip day={false} className="mb-4">HYBRID SHOWCASE</FxChip>
                                <h3 className="text-[1.7em] sm:text-[2.2em] lg:text-[2.7em] font-[700] tracking-tight leading-[1.08] text-white">
                                    Cross-platform excellence from concept to deployment.
                                </h3>
                                <p className="mt-4 max-w-xl text-[0.9em] sm:text-[1em] leading-[1.7] text-white/70">
                                    A premium gallery of high-performance hybrid applications, native-ready user
                                    experiences, and production-grade solutions—showcasing our expertise in
                                    cross-platform development.
                                </p>
                            </div>
                            <div className="grid gap-2 sm:grid-cols-2 lg:min-w-[290px]">
                                {[
                                    {label: 'React Native', value: '01'},
                                    {label: 'Flutter Dev', value: '02'},
                                    {label: 'UI/UX Focus', value: '03'},
                                    {label: 'Performance', value: '04'}
                                ].map((item) => (
                                    <div key={item.label}
                                         className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm">
                                        <div
                                            className="text-[0.58em] uppercase tracking-[0.3em] text-purple-300/80">{item.label}</div>
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
                                    alt="Hybrid app development showcase"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div
                                    className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(2,6,23,0.2)_40%,rgba(2,6,23,0.88)_100%)]"/>
                                <div className="absolute inset-0 border border-white/10"/>
                                <div
                                    className="absolute left-4 top-4 rounded-full border border-purple-400/30 bg-black/30 px-3 py-1 text-[0.62em] uppercase tracking-[0.3em] text-purple-300">
                                    01 / Architecture
                                </div>
                                <div className="absolute bottom-4 left-4 right-4">
                                    <p className="text-[0.62em] uppercase tracking-[0.3em] text-purple-300 font-[600]">Robust
                                        Design</p>
                                    <p className="mt-2 max-w-xl text-sm sm:text-base text-white/90">Enterprise-grade
                                        architecture for seamless cross-platform performance.</p>
                                </div>
                            </div>

                            <div className="grid gap-4">
                                <div
                                    className="group relative overflow-hidden rounded-[1.35rem] border border-white/10 h-[250px] sm:h-[260px] lg:h-[260px]">
                                    <Image
                                        src="/assets/hybrid/4.jpg"
                                        alt="Hybrid app UI/UX design showcase"
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div
                                        className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(2,6,23,0.16)_55%,rgba(2,6,23,0.78)_100%)]"/>
                                    <div className="absolute inset-0 border border-white/10"/>
                                    <div
                                        className="absolute left-3 top-3 rounded-full border border-white/15 bg-black/20 px-2.5 py-1 text-[0.56em] uppercase tracking-[0.28em] text-purple-200">
                                        02 / Design
                                    </div>
                                </div>

                                <div
                                    className="group relative overflow-hidden rounded-[1.35rem] border border-white/10 h-[250px] sm:h-[260px] lg:h-[260px]">
                                    <Image
                                        src="/assets/hybrid/1.png"
                                        alt="Hybrid app development workflow showcase"
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div
                                        className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(2,6,23,0.16)_55%,rgba(2,6,23,0.78)_100%)]"/>
                                    <div className="absolute inset-0 border border-white/10"/>
                                    <div
                                        className="absolute left-3 top-3 rounded-full border border-white/15 bg-black/20 px-2.5 py-1 text-[0.56em] uppercase tracking-[0.28em] text-purple-200">
                                        03 / Development
                                    </div>
                                </div>
                            </div>

                            <div
                                className="group relative overflow-hidden rounded-[1.6rem] border border-white/10 h-[240px] sm:h-[260px] lg:h-[260px] lg:col-span-2">
                                <Image
                                    src="/assets/hybrid/2.jpg"
                                    alt="Hybrid app deployment showcase"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div
                                    className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(2,6,23,0.1)_35%,rgba(2,6,23,0.82)_100%)]"/>
                                <div className="absolute inset-0 border border-white/10"/>
                                <div
                                    className="absolute left-3 top-3 rounded-full border border-purple-400/30 bg-black/30 px-2.5 py-1 text-[0.56em] uppercase tracking-[0.28em] text-purple-300">
                                    04 / Deployment
                                </div>
                                <div className="absolute bottom-4 left-4 right-4">
                                    <p className="text-white/90 text-sm sm:text-base">Production-ready apps deployed
                                        across iOS, Android, and web platforms with continuous monitoring.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* What is Hybrid Mobile App Development - Premium Futuristic Section */}
            <section
                className={`relative py-12 lg:py-24 px-6 sm:px-6 md:px-10 lg:px-[4.6em] w-full max-w-full overflow-hidden ${
                    isDayTime ? 'bg-white text-black' : 'bg-black text-white'}`}>
                <FxBackground day={isDayTime}/>

                {/* Decorative gradient orbs */}
                <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-20"
                         style={{background: 'radial-gradient(circle, rgba(139,92,246,0.4), transparent)'}}/>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full opacity-15"
                         style={{background: 'radial-gradient(circle, rgba(139,92,246,0.3), transparent)'}}/>
                </div>

                <div className="relative z-10 max-w-full mx-auto">
                    {/* Header with badge */}
                    <div className="mb-12 lg:mb-16">
                        <FxReveal>
                            <FxChip day={!isDayTime} className="mb-6">CORE TECHNOLOGY</FxChip>
                        </FxReveal>
                        <FxReveal delay={0.1}>
                            <h2 className='lg:text-[3.2em] md:text-[2.5em] text-[2em] font-[700] tracking-tight leading-[1.1] mb-6'>
                                What is Hybrid <br className={'lg:block md:block hidden'}/>
                                <span className='gx-gradient-text'>Mobile App Development?</span>
                            </h2>
                        </FxReveal>
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
                        {/* Left Column - Main Definition */}
                        <div className="lg:col-span-2">
                            <FxReveal delay={0.15}>
                                <div className={`p-8 rounded-2xl border backdrop-blur-md transition-all duration-300 ${
                                    isDayTime
                                        ? 'bg-gradient-to-br from-white/60 to-white/40 border-gray-200/50 hover:border-gray-300'
                                        : 'bg-gradient-to-br from-white/8 to-white/4 border-white/15 hover:border-white/25'
                                }`}>
                                    <p className='text-[1em] md:text-[1.05em] font-[400] leading-[1.8] mb-6'>
                                        Hybrid <Link href={'/services/Mobile-Application-Development'}
                                                     className={`font-[600] border-b pb-[0.05em] transition-all ${
                                                         isDayTime ? 'border-purple-400 text-purple-600 hover:border-purple-600' : 'border-purple-400 text-purple-300 hover:border-purple-300'
                                                     }`}>mobile app development</Link> is a sophisticated approach that
                                        seamlessly integrates web technologies—HTML5, CSS, and <Link
                                        href={'/services/Javascript'}
                                        className={`font-[600] border-b pb-[0.05em] transition-all ${
                                            isDayTime ? 'border-purple-400 text-purple-600 hover:border-purple-600' : 'border-purple-400 text-purple-300 hover:border-purple-300'
                                        }`}>JavaScript</Link>—with native mobile capabilities, enabling developers to
                                        architect a unified codebase that executes flawlessly across iOS, Android, and
                                        web platforms.
                                    </p>
                                    <p className='text-[1em] md:text-[1.05em] font-[400] leading-[1.8]'>
                                        This revolutionary methodology dramatically reduces development cycles,
                                        optimizes resource allocation, and accelerates time-to-market—all while
                                        maintaining enterprise-grade performance and delivering native-quality user
                                        experiences that exceed customer expectations.
                                    </p>
                                </div>
                            </FxReveal>

                            {/* Key Benefits Cards */}
                            <FxReveal delay={0.2}>
                                <div className="grid md:grid-cols-2 gap-4 mt-8">
                                    {[
                                        {
                                            icon: '⚡',
                                            title: 'Rapid Development',
                                            desc: 'Single codebase accelerates deployment across multiple platforms',
                                            metric: '60-70% faster'
                                        },
                                        {
                                            icon: '💰',
                                            title: 'Cost Efficiency',
                                            desc: 'Reduce resource overhead and development expenses significantly',
                                            metric: '40-50% savings'
                                        },
                                        {
                                            icon: '🎯',
                                            title: 'Cross-Platform Reach',
                                            desc: 'Seamless deployment on iOS, Android, and web simultaneously',
                                            metric: '3 platforms'
                                        },
                                        {
                                            icon: '⚙️',
                                            title: 'Easy Maintenance',
                                            desc: 'Centralized codebase simplifies updates and feature additions',
                                            metric: '1 codebase'
                                        }
                                    ].map((benefit, idx) => (
                                        <FxReveal key={benefit.title} delay={0.25 + idx * 0.05}>
                                            <div
                                                className={`p-5 rounded-xl border transition-all duration-300 group hover:scale-105 ${
                                                    isDayTime
                                                        ? 'bg-white/40 border-gray-200/40 hover:bg-white/60 hover:border-purple-400/50'
                                                        : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-purple-400/40'
                                                }`}>
                                                <div className="flex items-start justify-between mb-2">
                                                    <div className="text-2xl">{benefit.icon}</div>
                                                    <span className={`text-[0.75em] font-[600] px-2 py-1 rounded-lg ${
                                                        isDayTime ? 'bg-purple-100 text-purple-600' : 'bg-purple-400/20 text-purple-300'
                                                    }`}>
                                                        {benefit.metric}
                                                    </span>
                                                </div>
                                                <h4 className="font-[600] text-[0.95em] mb-2">{benefit.title}</h4>
                                                <p className={`text-[0.85em] leading-[1.6] ${isDayTime ? 'text-gray-700' : 'text-white/70'}`}>
                                                    {benefit.desc}
                                                </p>
                                            </div>
                                        </FxReveal>
                                    ))}
                                </div>
                            </FxReveal>

                            {/* Technical Specifications */}
                            <FxReveal delay={0.25}>
                                <div className={`mt-8 p-6 rounded-xl border ${
                                    isDayTime
                                        ? 'bg-white/30 border-gray-200/40'
                                        : 'bg-white/5 border-white/10'
                                }`}>
                                    <h4 className={`text-[1em] font-[600] mb-4 ${isDayTime ? 'text-gray-900' : 'text-white'}`}>
                                        Technical Architecture
                                    </h4>
                                    <div className="grid md:grid-cols-3 gap-4">
                                        {[
                                            {
                                                label: 'API Integration',
                                                value: 'RESTful + GraphQL',
                                                desc: 'Flexible data layer architecture'
                                            },
                                            {
                                                label: 'State Management',
                                                value: 'Redux / MobX',
                                                desc: 'Predictable app state handling'
                                            },
                                            {
                                                label: 'Performance',
                                                value: '60 FPS Target',
                                                desc: 'Smooth interactions guaranteed'
                                            }
                                        ].map((spec, idx) => (
                                            <FxReveal key={spec.label} delay={0.3 + idx * 0.04}>
                                                <div className={`p-3 rounded-lg border ${
                                                    isDayTime
                                                        ? 'bg-white/40 border-gray-200/50'
                                                        : 'bg-white/8 border-white/10'
                                                }`}>
                                                    <p className={`text-[0.75em] uppercase tracking-wide font-[600] mb-1 ${
                                                        isDayTime ? 'text-gray-600' : 'text-white/50'
                                                    }`}>
                                                        {spec.label}
                                                    </p>
                                                    <p className={`text-[0.95em] font-[600] mb-1 ${
                                                        isDayTime ? 'text-purple-600' : 'text-purple-300'
                                                    }`}>
                                                        {spec.value}
                                                    </p>
                                                    <p className={`text-[0.8em] ${isDayTime ? 'text-gray-700' : 'text-white/60'}`}>
                                                        {spec.desc}
                                                    </p>
                                                </div>
                                            </FxReveal>
                                        ))}
                                    </div>
                                </div>
                            </FxReveal>
                        </div>

                        {/* Right Column - Detailed Insights */}
                        <div className="lg:col-span-1 space-y-6">
                            <FxReveal delay={0.2}>
                                <div
                                    className={`rounded-2xl border backdrop-blur-md p-8 relative overflow-hidden group transition-all ${
                                        isDayTime
                                            ? 'bg-gradient-to-br from-purple-50/60 to-white/40 border-purple-200/40 hover:border-purple-400'
                                            : 'bg-gradient-to-br from-purple-500/10 to-white/5 border-purple-400/20 hover:border-purple-400/50'
                                    }`}>
                                    <div className="absolute inset-0 pointer-events-none"
                                         style={{background: isDayTime ? 'radial-gradient(circle at top right, rgba(139,92,246,0.1), transparent)' : 'radial-gradient(circle at top right, rgba(139,92,246,0.15), transparent)'}}/>

                                    <div className="relative z-10">
                                        <h4 className={`text-[0.75em] uppercase tracking-[0.2em] font-[700] mb-6 ${
                                            isDayTime ? 'text-purple-700' : 'text-purple-300'
                                        }`}>Core Technology Stack</h4>

                                        <div className="space-y-4">
                                            {[
                                                {
                                                    tech: 'React Native',
                                                    coverage: '95%',
                                                    desc: 'Industry-leading iOS/Android'
                                                },
                                                {tech: 'Flutter', coverage: '92%', desc: 'Google\'s modern framework'},
                                                {tech: 'Ionic', coverage: '88%', desc: 'Web-first mobile platform'},
                                                {
                                                    tech: 'Web Standards',
                                                    coverage: '100%',
                                                    desc: 'Universal browser compatibility'
                                                }
                                            ].map((item, idx) => (
                                                <div key={item.tech} className="space-y-1">
                                                    <div className="flex items-start justify-between gap-2">
                                                        <div className="flex-1 min-w-0">
                                                            <span
                                                                className={`text-[0.9em] font-[500] block ${isDayTime ? 'text-gray-800' : 'text-white/80'}`}>
                                                                {item.tech}
                                                            </span>
                                                            <span
                                                                className={`text-[0.7em] ${isDayTime ? 'text-gray-600' : 'text-white/50'}`}>
                                                                {item.desc}
                                                            </span>
                                                        </div>
                                                        <span className={`text-[0.8em] font-[600] whitespace-nowrap ${
                                                            isDayTime ? 'text-purple-600' : 'text-purple-300'
                                                        }`}>
                                                            {item.coverage}
                                                        </span>
                                                    </div>
                                                    <div className={`h-2 rounded-full overflow-hidden ${
                                                        isDayTime ? 'bg-gray-200/50' : 'bg-white/10'
                                                    }`}>
                                                        <div
                                                            className={`h-full rounded-full transition-all duration-1000 ${
                                                                isDayTime ? 'bg-gradient-to-r from-purple-400 to-purple-500' : 'bg-gradient-to-r from-purple-400 to-purple-300'
                                                            }`}
                                                            style={{width: item.coverage}}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div
                                            className={`mt-8 pt-8 border-t ${isDayTime ? 'border-gray-200/40' : 'border-white/10'}`}>
                                            <p className={`text-[0.8em] leading-[1.6] ${isDayTime ? 'text-gray-700' : 'text-white/60'}`}>
                                                At Grey InfoTech, we leverage cutting-edge frameworks to deliver
                                                high-performance, native-quality applications that scale with your
                                                business.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </FxReveal>

                            <FxReveal delay={0.25}>
                                <div className={`rounded-2xl border backdrop-blur-md p-6 ${
                                    isDayTime
                                        ? 'bg-white/40 border-gray-200/40'
                                        : 'bg-white/5 border-white/10'
                                }`}>
                                    <h4 className={`text-[0.8em] uppercase tracking-[0.2em] font-[700] mb-4 ${
                                        isDayTime ? 'text-purple-700' : 'text-purple-300'
                                    }`}>Key Metrics</h4>
                                    <div className="space-y-3">
                                        {[
                                            {label: 'Code Reuse', value: '70-80%'},
                                            {label: 'Dev Time', value: '-60%'},
                                            {label: 'Platform Support', value: '3+'},
                                            {label: 'Launch Speed', value: 'Fast'}
                                        ].map((metric, idx) => (
                                            <FxReveal key={metric.label} delay={0.28 + idx * 0.03}>
                                                <div
                                                    className="flex items-center justify-between p-2 rounded-lg hover:bg-white/8 transition-all">
                                                    <span
                                                        className={`text-[0.85em] ${isDayTime ? 'text-gray-700' : 'text-white/70'}`}>
                                                        {metric.label}
                                                    </span>
                                                    <span className={`text-[0.9em] font-[600] ${
                                                        isDayTime ? 'text-purple-600' : 'text-purple-300'
                                                    }`}>
                                                        {metric.value}
                                                    </span>
                                                </div>
                                            </FxReveal>
                                        ))}
                                    </div>
                                </div>
                            </FxReveal>
                        </div>
                    </div>

                    {/* Technology Pillars & Use Cases */}
                    <FxReveal delay={0.3}>
                        <div className="mt-16 pt-16 border-t border-white/10">
                            <h3 className={`text-[1.4em] font-[600] mb-12 ${isDayTime ? 'text-gray-900' : 'text-white'}`}>
                                Why Hybrid Development Excels
                            </h3>
                            <div className="grid md:grid-cols-3 gap-6 mb-12">
                                {[
                                    {
                                        num: '01',
                                        title: 'Code Reusability',
                                        content: 'Write once, deploy everywhere. Eliminate redundant development and maintain consistency across platforms effortlessly.',
                                        details: [
                                            'Shared business logic across platforms',
                                            'Consistent UI/UX patterns',
                                            'Unified API layer',
                                            'Synchronized feature rollouts'
                                        ]
                                    },
                                    {
                                        num: '02',
                                        title: 'Performance Parity',
                                        content: 'Modern frameworks deliver native-level performance and responsiveness, ensuring seamless user interactions and minimal latency.',
                                        details: [
                                            'Optimized rendering engines',
                                            'Native module access',
                                            'Hardware acceleration',
                                            '60+ FPS capability'
                                        ]
                                    },
                                    {
                                        num: '03',
                                        title: 'Strategic Scaling',
                                        content: 'Scale your business rapidly with unified infrastructure, simplified DevOps, and streamlined continuous deployment pipelines.',
                                        details: [
                                            'Single CI/CD pipeline',
                                            'Centralized analytics',
                                            'Unified monitoring',
                                            'Scalable backend architecture'
                                        ]
                                    }
                                ].map((pillar, idx) => (
                                    <FxReveal key={pillar.num} delay={0.35 + idx * 0.06}>
                                        <div className={`p-6 rounded-xl border transition-all group hover:scale-105 ${
                                            isDayTime
                                                ? 'bg-white/50 border-gray-200/40 hover:bg-white/70 hover:border-purple-400/50'
                                                : 'bg-white/5 border-white/10 hover:bg-white/8 hover:border-purple-400/40'
                                        }`}>
                                            <div
                                                className={`text-[2.2em] font-[700] mb-3 ${isDayTime ? 'text-purple-600' : 'text-purple-400'}`}>
                                                {pillar.num}
                                            </div>
                                            <h4 className={`text-[1.05em] font-[600] mb-3 ${isDayTime ? 'text-gray-900' : 'text-white'}`}>
                                                {pillar.title}
                                            </h4>
                                            <p className={`text-[0.92em] leading-[1.6] mb-4 ${isDayTime ? 'text-gray-700' : 'text-white/70'}`}>
                                                {pillar.content}
                                            </p>
                                            <ul className="space-y-2">
                                                {pillar.details.map((detail, didx) => (
                                                    <li key={didx}
                                                        className={`flex items-start gap-2 text-[0.85em] ${isDayTime ? 'text-gray-600' : 'text-white/60'}`}>
                                                        <span
                                                            className={`${isDayTime ? 'text-purple-600' : 'text-purple-400'} font-bold`}>✓</span>
                                                        <span>{detail}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </FxReveal>
                                ))}
                            </div>

                            {/* Use Cases Section */}
                            <FxReveal delay={0.42}>
                                <div className={`rounded-xl border backdrop-blur-sm p-8 ${
                                    isDayTime
                                        ? 'bg-white/30 border-gray-200/40'
                                        : 'bg-white/5 border-white/10'
                                }`}>
                                    <h4 className={`text-[1.1em] font-[600] mb-6 ${isDayTime ? 'text-gray-900' : 'text-white'}`}>
                                        Ideal Use Cases
                                    </h4>
                                    <div className="grid md:grid-cols-4 gap-4">
                                        {[
                                            {
                                                icon: '📱',
                                                name: 'Social Apps',
                                                desc: 'Cross-platform social networks and messaging'
                                            },
                                            {
                                                icon: '🛒',
                                                name: 'E-Commerce',
                                                desc: 'Shopping apps with consistent experience'
                                            },
                                            {
                                                icon: '💼',
                                                name: 'Enterprise',
                                                desc: 'Business tools and productivity apps'
                                            },
                                            {icon: '🎮', name: 'Gaming', desc: 'Casual games with multi-platform reach'}
                                        ].map((useCase, idx) => (
                                            <FxReveal key={useCase.name} delay={0.45 + idx * 0.03}>
                                                <div
                                                    className={`p-4 rounded-lg border text-center transition-all hover:scale-105 ${
                                                        isDayTime
                                                            ? 'bg-white/40 border-gray-200/40 hover:bg-white/60'
                                                            : 'bg-white/8 border-white/10 hover:bg-white/12'
                                                    }`}>
                                                    <div className="text-3xl mb-2">{useCase.icon}</div>
                                                    <h5 className={`text-[0.95em] font-[600] mb-1 ${isDayTime ? 'text-gray-900' : 'text-white'}`}>
                                                        {useCase.name}
                                                    </h5>
                                                    <p className={`text-[0.8em] leading-[1.4] ${isDayTime ? 'text-gray-700' : 'text-white/60'}`}>
                                                        {useCase.desc}
                                                    </p>
                                                </div>
                                            </FxReveal>
                                        ))}
                                    </div>
                                </div>
                            </FxReveal>
                        </div>
                    </FxReveal>
                </div>
            </section>

            {/* Development Services - FxStickyScrollSection */}
            <FxStickyScrollSection
                day={isDayTime}
                colorScheme="purple"
                heading={<>Hybrid app<br/>development services</>}
                intro="We deliver enterprise-grade hybrid applications by combining React Native, Flutter, and Ionic with strategic architecture. Our end-to-end services—from development to migration and maintenance—ensure cross-platform excellence with unified codebases, reduced costs, and accelerated time-to-market."
                navLabel="Development Services"
                activeId={activeId}
                onNavClickAction={scrollToSection}
                items={[
                    {
                        id: '01',
                        title: 'React Native App Development',
                        target: 'RNAD',
                        tags: ['Meta Framework', 'Native Performance', 'iOS & Android'],
                        body: (
                            <div>
                                <p>
                                    React Native is a powerful, industry-leading framework backed by Meta (Facebook),
                                    enabling the development of mobile applications that deliver a native-like
                                    experience across both iOS and Android platforms—all from a single codebase. This
                                    approach significantly reduces development time and cost while maintaining high
                                    performance and visual appeal.
                                </p>
                                <p className="mt-3">
                                    At Grey InfoTech, we use React Native to serve businesses of all sizes and
                                    industries—from startups to enterprises. Whether you're launching a new product,
                                    enhancing an existing app, or expanding to new platforms, our team ensures your
                                    application is fast, user-friendly, and built for scale. We leverage industry best
                                    practices including modular architecture, performance optimization, and seamless
                                    third-party integrations.
                                </p>
                                <p className="mt-3 text-sm font-semibold">Technical Excellence:</p>
                                <ul className="mt-2 space-y-1 text-sm">
                                    <li>• Expo & React Native CLI mastery for rapid development</li>
                                    <li>• Native modules integration (camera, geolocation, payment systems)</li>
                                    <li>• Redux & MobX state management for complex apps</li>
                                    <li>• Firebase & backend API integration</li>
                                    <li>• Performance profiling & optimization techniques</li>
                                </ul>
                            </div>
                        ),
                        metrics: [
                            {label: 'iOS & Android', value: '100%', description: 'Full platform coverage'},
                            {label: 'Code Reuse', value: '70%+', description: 'Shared codebase efficiency'},
                            {label: 'Development Speed', value: '50%', description: 'Faster than native dual'},
                        ],
                        deliverables: ['Native-quality app', 'Scalable architecture', 'Performance optimized', 'App Store ready', 'Analytics integration', 'Push notification system'],
                        timeline: '8–12 weeks',
                        engagement: 'Fixed-price, Time & Materials, or Dedicated Team'
                    },
                    {
                        id: '02',
                        title: 'Ionic App Development',
                        target: 'IAD',
                        tags: ['Web Technologies', 'Angular Integration', 'UI Components'],
                        body: (
                            <div>
                                <p>
                                    Ionic is a widely used hybrid app development framework built on web technologies
                                    like HTML, CSS, and JavaScript. Known for its flexibility and scalability, Ionic
                                    allows businesses to deliver cross-platform applications with a single codebase.
                                    With its extensive UI component library and seamless integration with tools like
                                    Angular, Ionic is ideal for creating responsive, high-performance apps.
                                </p>
                                <p className="mt-3">
                                    At Grey InfoTech, we leverage Ionic to build fast, stylish applications tailored to
                                    your business goals—whether you're launching a simple utility app or a complex
                                    feature-rich platform. Our team ensures your app delivers a consistent user
                                    experience across devices, helping you reach a wider audience without sacrificing
                                    speed, quality, or design.
                                </p>
                                <p className="mt-3 text-sm font-semibold">Technical Excellence:</p>
                                <ul className="mt-2 space-y-1 text-sm">
                                    <li>• Angular & Ionic Angular integration for enterprise apps</li>
                                    <li>• Capacitor plugin development for native capabilities</li>
                                    <li>• Progressive web app (PWA) deployment options</li>
                                    <li>• Cordova plugin integration & customization</li>
                                    <li>• Real-time data synchronization & offline support</li>
                                </ul>
                            </div>
                        ),
                        metrics: [
                            {label: 'Web-First Approach', value: 'HTML5', description: 'Web standards based'},
                            {label: 'Platform Coverage', value: '3+', description: 'iOS, Android, Web'},
                            {label: 'Component Library', value: '50+', description: 'Pre-built UI components'},
                        ],
                        deliverables: ['Responsive design', 'Cross-platform app', 'Web component library', 'PWA version', 'Custom plugins', 'Offline capability'],
                        timeline: '6–10 weeks',
                        engagement: 'Agile sprints, flexible team scaling, or dedicated developers'
                    },
                    {
                        id: '03',
                        title: 'Flutter App Development',
                        target: 'FAD',
                        tags: ['Google Framework', 'Dart Language', 'Beautiful UIs'],
                        body: (
                            <div>
                                <p>
                                    Flutter, backed by Google, is a modern framework that enables beautiful, natively
                                    compiled applications for mobile, web, and desktop from a single codebase. With its
                                    expressive UI framework, hot reload feature, and exceptional performance
                                    characteristics, Flutter is the choice for teams prioritizing stunning interfaces
                                    and rapid iteration.
                                </p>
                                <p className="mt-3">
                                    At Grey InfoTech, we specialize in building visually rich Flutter applications that
                                    deliver pixel-perfect designs and smooth 60-120fps performance. Our expertise spans
                                    from high-fidelity e-commerce apps to complex fintech solutions, ensuring your
                                    Flutter app stands out in the market while maintaining enterprise-grade reliability.
                                </p>
                                <p className="mt-3 text-sm font-semibold">Technical Excellence:</p>
                                <ul className="mt-2 space-y-1 text-sm">
                                    <li>• Advanced widget composition & custom animations</li>
                                    <li>• BLoC & Provider state management patterns</li>
                                    <li>• Firebase & REST API integration</li>
                                    <li>• Platform channel integration (native code)</li>
                                    <li>• Performance optimization for 60-120fps target</li>
                                </ul>
                            </div>
                        ),
                        metrics: [
                            {label: 'Performance', value: '120fps', description: 'Smooth animations'},
                            {label: 'Code Reuse', value: '95%+', description: 'Single codebase'},
                            {label: 'Build Time', value: '40%', description: 'Faster compilation'},
                        ],
                        deliverables: ['Beautiful UI app', 'High-performance build', 'Custom animations', 'Platform integration', 'Web app version', 'Desktop app version'],
                        timeline: '10–14 weeks',
                        engagement: 'Collaborative design sprints with dedicated technical lead'
                    },
                    {
                        id: '04',
                        title: 'Hybrid App Migration',
                        target: 'HAM',
                        tags: ['Platform Transition', 'Code Modernization', 'Zero-Downtime'],
                        body: (
                            <div>
                                <p>
                                    If you're looking to transition from a native app to a hybrid solution, Grey InfoTech can help streamline the process. Migrating to a hybrid app offers strategic
                                    advantages—reduced development and maintenance costs, faster updates, and the
                                    ability to reach iOS and Android users from a single codebase. Our team has
                                    successfully migrated 25+ apps with zero production incidents.
                                </p>
                                <p className="mt-3">
                                    Our team ensures a seamless migration by preserving your app's core functionality
                                    while enhancing its design, performance, and scalability. We collaborate closely
                                    with you to modernise the user experience and prepare your application for long-term
                                    growth across platforms. We use a phased approach with comprehensive testing to
                                    minimize risk.
                                </p>
                                <p className="mt-3 text-sm font-semibold">Migration Process:</p>
                                <ul className="mt-2 space-y-1 text-sm">
                                    <li>• Architecture assessment & codebase analysis</li>
                                    <li>• Gradual feature porting & parallel testing</li>
                                    <li>• Data integrity & state preservation</li>
                                    <li>• User acceptance testing (UAT) oversight</li>
                                    <li>• Post-migration support & optimization</li>
                                </ul>
                            </div>
                        ),
                        metrics: [
                            {label: 'Migration Success', value: '100%', description: 'Zero failures tracked'},
                            {label: 'Downtime', value: 'Zero', description: 'Blue-green deployment'},
                            {label: 'User Migration', value: '99.8%', description: 'Retention rate'},
                        ],
                        deliverables: ['Seamless transition', 'Data preservation', 'Enhanced architecture', 'UAT support', 'Beta program', 'Rollback plan'],
                        timeline: '4–8 weeks',
                        engagement: 'Phased approach with parallel testing and risk mitigation'
                    },
                    {
                        id: '05',
                        title: 'Performance Optimization',
                        target: 'PO',
                        tags: ['App Speed', 'Battery Efficiency', 'Memory Management'],
                        body: (
                            <div>
                                <p>
                                    Performance is critical for user retention and app store rankings. Grey InfoTech
                                    provides comprehensive performance optimization services for hybrid apps, focusing
                                    on load times, frame rates, memory usage, and battery consumption. We use
                                    industry-standard profiling tools and best practices to transform sluggish apps into
                                    lightning-fast experiences.
                                </p>
                                <p className="mt-3">
                                    Our optimization process includes detailed performance auditing, bottleneck
                                    identification, and targeted refactoring. We reduce app size, optimize bundle
                                    loading, implement efficient rendering strategies, and minimize native bridge calls.
                                    Our clients typically see 40-60% performance improvements after optimization.
                                </p>
                                <p className="mt-3 text-sm font-semibold">Optimization Services:</p>
                                <ul className="mt-2 space-y-1 text-sm">
                                    <li>• Runtime performance analysis & profiling</li>
                                    <li>• Bundle size reduction & code splitting</li>
                                    <li>• Rendering optimization & lazy loading</li>
                                    <li>• Memory leak detection & resolution</li>
                                    <li>• Battery consumption optimization</li>
                                </ul>
                            </div>
                        ),
                        metrics: [
                            {label: 'Load Time Reduction', value: '45%', description: 'Average improvement'},
                            {label: 'Memory Usage', value: '50%', description: 'Footprint reduced'},
                            {label: 'Frame Rate', value: '60fps', description: 'Consistent performance'},
                        ],
                        deliverables: ['Performance audit', 'Optimization roadmap', 'Code refactoring', 'Profiling report', 'Best practices guide', 'Ongoing monitoring'],
                        timeline: '2–4 weeks',
                        engagement: 'Sprint-based optimization with continuous profiling'
                    },
                    {
                        id: '06',
                        title: 'Hybrid App Maintenance',
                        target: 'HAM_MAIN',
                        tags: ['24/7 Support', 'Bug Fixes', 'Feature Updates'],
                        body: (
                            <div>
                                <p>
                                    Building an app is only the beginning—ongoing maintenance is essential to keep it
                                    secure, optimised, and aligned with evolving user expectations. At Grey InfoTech, we
                                    provide continuous hybrid app maintenance services to ensure your app remains
                                    functional, compatible with the latest platform updates, and delivers a seamless
                                    user experience.
                                </p>
                                <p className="mt-3">
                                    Our team handles everything from routine bug fixes to adding new features that
                                    support your business growth. Whether it's performance tuning, security patches, UX
                                    enhancements, or platform version updates, we offer reliable support through our
                                    tiered SLA agreements so you can focus on scaling your product with confidence.
                                </p>
                                <p className="mt-3 text-sm font-semibold">Support Services:</p>
                                <ul className="mt-2 space-y-1 text-sm">
                                    <li>• Monthly platform & dependency updates</li>
                                    <li>• Security patch management & vulnerability fixes</li>
                                    <li>• Feature development & custom enhancements</li>
                                    <li>• Crash reporting & analytics monitoring</li>
                                    <li>• Version compatibility management</li>
                                </ul>
                            </div>
                        ),
                        metrics: [
                            {label: 'Uptime SLA', value: '99.9%', description: 'Enterprise standard'},
                            {label: 'Response Time', value: '<2h', description: 'Priority support'},
                            {label: 'Monthly Updates', value: '4+', description: 'Continuous improvement'},
                        ],
                        deliverables: ['24/7 monitoring', 'Regular updates', 'Performance optimization', 'Security reviews', 'Feature roadmap', 'Incident response'],
                        timeline: 'Ongoing (monthly retainers)',
                        engagement: '24/7 support with tiered SLA: Standard, Priority, Enterprise'
                    }
                ]}
            />

            {/* Looking for help with your hybrid app development? - Premium CTA */}
            <section className={`${isDayTime ? 'bg-black' : 'bg-white'} py-12 lg:py-20`}>
                <div id={'looking'}
                     className={`relative lg:max-w-full w-full mx-auto h-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em]`}>

                    {/* Background enhancement */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        <div
                            className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle_at_right_top,rgba(139,92,246,0.15),transparent_60%)]"/>
                        <div
                            className="absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.08),transparent_70%)]"/>
                    </div>

                    <div className="relative z-10">
                        {/* Top badge */}
                        <div className="flex justify-center mb-8">
                            <FxChip day={isDayTime} className={`mb-4 ${isDayTime ? 'text-white' : 'text-black'}`}>LET'S
                                COLLABORATE</FxChip>
                        </div>

                        {/* Main heading with gradient text */}
                        <div className="grid lg:grid-cols-2 grid-cols-1 gap-8 lg:gap-16 items-center mb-12">
                            <div>
                                <h2 className="lg:text-[3.2em] text-[2em] font-[700] tracking-tight leading-[1.1] lg:pb-6 text-white">
                                    Ready to transform <span className="gx-gradient-text">your vision</span>
                                    <br/>into <span className="gx-gradient-text">reality?</span>
                                </h2>
                                <p className="mt-6 text-[1em] font-[300] leading-[1.7] text-white/75 max-w-xl">
                                    Whether you're building a new hybrid app or elevating an existing one, Grey InfoTech
                                    partners with you to deliver world-class solutions. Our expertise spans React
                                    Native, Flutter, Ionic, and beyond—all tailored to your unique goals.
                                </p>
                            </div>

                            {/* Right side stats/highlights */}
                            <div className="grid grid-cols-2 gap-4">
                                <div
                                    className="p-6 rounded-2xl border border-purple-400/20 bg-white/[0.05] backdrop-blur-sm hover:bg-white/[0.08] transition-all duration-300">
                                    <div className="text-[2.2em] font-[700] text-purple-300">10+</div>
                                    <div className="mt-2 text-[0.85em] text-white/70">Successful Migrations</div>
                                </div>
                                <div
                                    className="p-6 rounded-2xl border border-purple-400/20 bg-white/[0.05] backdrop-blur-sm hover:bg-white/[0.08] transition-all duration-300">
                                    <div className="text-[2.2em] font-[700] text-purple-300">99.9%</div>
                                    <div className="mt-2 text-[0.85em] text-white/70">Uptime SLA</div>
                                </div>
                                <div
                                    className="p-6 rounded-2xl border border-purple-400/20 bg-white/[0.05] backdrop-blur-sm hover:bg-white/[0.08] transition-all duration-300">
                                    <div className="text-[2.2em] font-[700] text-purple-300">15+</div>
                                    <div className="mt-2 text-[0.85em] text-white/70">Projects Delivered</div>
                                </div>
                                <div
                                    className="p-6 rounded-2xl border border-purple-400/20 bg-white/[0.05] backdrop-blur-sm hover:bg-white/[0.08] transition-all duration-300">
                                    <div className="text-[2.2em] font-[700] text-purple-300">7+</div>
                                    <div className="mt-2 text-[0.85em] text-white/70">Years Experience</div>
                                </div>
                            </div>
                        </div>

                        {/* Professional divider */}
                        <div className="my-12 h-px bg-gradient-to-r from-transparent via-purple-400/40 to-transparent"/>

                        {/* Service highlights grid */}
                        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 mb-12">
                            {[
                                {
                                    title: 'End-to-End Strategy',
                                    description: 'From discovery and architecture design to deployment and maintenance, we handle every phase of your hybrid development journey.',
                                    icon: '🎯'
                                },
                                {
                                    title: 'Cross-Platform Excellence',
                                    description: 'Unified codebases, native performance, and consistent UX across iOS, Android, Web, and Desktop platforms.',
                                    icon: '🚀'
                                },
                                {
                                    title: '24/7 Enterprise Support',
                                    description: 'Dedicated support team, priority incident response, regular updates, and continuous performance optimization.',
                                    icon: '⚡'
                                }
                            ].map((item, idx) => (
                                <FxReveal key={idx} delay={0.1 * idx}>
                                    <div
                                        className="p-6 rounded-2xl border border-purple-400/15 bg-white/[0.03] backdrop-blur-sm hover:border-purple-400/30 hover:bg-white/[0.08] transition-all duration-300 group cursor-pointer">
                                        <div className="text-[2.5em] mb-4">{item.icon}</div>
                                        <h3 className="text-[1.1em] font-[600] text-white mb-3">{item.title}</h3>
                                        <p className="text-[0.9em] text-white/65 leading-[1.6]">{item.description}</p>
                                    </div>
                                </FxReveal>
                            ))}
                        </div>

                        {/* CTA section */}
                        <div className="mt-16 text-center">
                            <p className="text-[1em] text-white/75 mb-8 max-w-2xl mx-auto leading-[1.6]">
                                Let's discuss your hybrid app development needs. Our team will work with you to create a
                                solution that drives real business value and user engagement.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button
                                    className="px-8 py-4 rounded-xl font-[600] bg-gradient-to-r from-purple-400 to-purple-500 text-black hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all duration-300 text-[0.95em]">
                                    Start Your Project
                                </button>
                                <button
                                    className="px-8 py-4 rounded-xl font-[600] border border-purple-400/30 text-white hover:border-purple-400/60 hover:bg-purple-400/10 transition-all duration-300 text-[0.95em]">
                                    Schedule Consultation
                                </button>
                            </div>
                        </div>

                        {/* Bottom accent line */}
                        <div className="mt-16 h-px bg-gradient-to-r from-transparent via-purple-400/30 to-transparent"/>
                    </div>
                </div>
            </section>

            {/* Middle - Futuristic showcase */}
            <section className="relative h-auto pt-16 lg:pt-20">
                <div className="relative max-w-Full mx-auto px-4 sm:px-6 lg:px-[4.6em]">
                    <div className="relative rounded-2xl overflow-hidden">
                        {/* Decorative orbs and aurora */}
                        <FxBackground day={isDayTime} grid={false} aurora/>
                        <div className="absolute inset-0 pointer-events-none">
                            <div
                                className="absolute -top-32 -left-32 w-[520px] h-[520px] bg-[radial-gradient(circle,rgba(139,92,246,0.12),transparent_40%)] blur-3xl transform-gpu animate-tilt"/>
                            <div
                                className="absolute -bottom-32 -right-20 w-[380px] h-[380px] bg-[radial-gradient(circle,rgba(139,92,246,0.08),transparent_40%)] blur-2xl"/>
                        </div>

                        <div className="relative grid lg:grid-cols-2 gap-8 items-center">
                            <FxReveal>
                                <FxFrame className="lg:order-1">
                                    <Image
                                        src={'/assets/hybrid/mid.jpg'}
                                        alt={'Hybrid architecture visualization'}
                                        width={1536}
                                        height={1025}
                                        className={`w-full h-auto object-cover rounded-xl`}
                                    />
                                    <div
                                        className="absolute inset-0 bg-gradient-to-t from-black/28 to-transparent rounded-xl mix-blend-overlay"/>
                                </FxFrame>
                            </FxReveal>

                            <FxReveal>
                                <div className="p-6 lg:p-12 relative z-10">
                                    <FxChip day={isDayTime} colorScheme="purple">ARCHITECTURE</FxChip>
                                    <h3 className={`mt-4 text-[1.6em] font-[700] ${isDayTime ? 'text-black' : 'text-white'}`}>
                                        Unified Hybrid Architecture
                                    </h3>
                                    <p className={`mt-4 text-[0.95em] ${isDayTime ? 'text-black/70' : 'text-white/75'}`}>
                                        Design patterns, integration points and delivery orchestration for
                                        cross-platform success. Pixel-perfect UI, single shared business logic, and
                                        native bridges where required.
                                    </p>

                                    <div className="mt-6 grid grid-cols-3 gap-3">
                                        <div
                                            className={`p-3 rounded-lg text-center ${isDayTime ? 'bg-black/6 border border-black/6' : 'bg-white/6 border border-white/6'}`}>
                                            <div className="text-sm font-semibold">Avg Delivery</div>
                                            <div className="text-lg font-[700] mt-1">8–12 wks</div>
                                        </div>
                                        <div
                                            className={`p-3 rounded-lg text-center ${isDayTime ? 'bg-black/6 border border-black/6' : 'bg-white/6 border border-white/6'}`}>
                                            <div className="text-sm font-semibold">Code Reuse</div>
                                            <div className="text-lg font-[700] mt-1">70%+</div>
                                        </div>
                                        <div
                                            className={`p-3 rounded-lg text-center ${isDayTime ? 'bg-black/6 border border-black/6' : 'bg-white/6 border border-white/6'}`}>
                                            <div className="text-sm font-semibold">Uptime SLA</div>
                                            <div className="text-lg font-[700] mt-1">99.9%</div>
                                        </div>
                                    </div>

                                    <div className="mt-6 flex gap-3">
                                        <FxButton href="/quote-request" day={isDayTime} colorScheme="purple">Request
                                            Quote</FxButton>
                                        <FxButton href="/contact" day={isDayTime} variant="ghost" colorScheme="purple">Talk
                                            to an Architect</FxButton>
                                    </div>

                                    <ul className={`mt-6 space-y-2 text-sm ${isDayTime ? 'text-black/70' : 'text-white/70'}`}>
                                        <li>• Modular micro-frontends for platform parity</li>
                                        <li>• Secure API gateways & offline-first data sync</li>
                                        <li>• Automated CI/CD with blue/green deployments</li>
                                    </ul>
                                </div>
                            </FxReveal>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why build a hybrid rather than a native app? - Premium Futuristic */}
            <section className={`${isDayTime ? 'bg-black' : 'bg-white'}`}>
                <div id={'why build'}
                     className={`relative h-auto lg:pt-[12em] md:pt-[12em] pt-[4em] lg:mt-[4em] md:mt-[4em] mt-[2em] px-4 sm:px-6 lg:px-[4.6em] w-full max-w-full lg:pb-[8em] md:pb-[8em] pb-[2em] ${isDayTime ? 'text-white' : 'text-black'}`}>

                    {/* Decorative background elements */}
                    <div className="pointer-events-none absolute inset-0 overflow-hidden">
                        <FxBackground day={isDayTime} grid aurora={false}/>
                        <div
                            className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(139,92,246,0.1),transparent_40%)] blur-3xl"/>
                        <div
                            className="absolute -bottom-20 -left-20 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(139,92,246,0.08),transparent_40%)] blur-2xl"/>
                    </div>

                    <div className="relative z-10">
                        {/* Header with badge */}
                        <FxReveal>
                            <div className="flex justify-center mb-8">
                                <FxChip day={isDayTime} colorScheme="purple">STRATEGIC ADVANTAGES</FxChip>
                            </div>
                        </FxReveal>

                        {/* Main heading */}
                        <FxReveal delay={0.1}>
                            <div className="max-w-4xl mx-auto text-center mb-16">
                                <h2 className={`lg:text-[3.2em] text-[2em] font-[700] tracking-tight leading-[1.15] mb-6 ${isDayTime ? 'text-white' : 'text-black'}`}>
                                    Why <span className="gx-gradient-text">Hybrid Development</span> Powers Modern Apps
                                </h2>
                                <p className={`text-[1em] ${isDayTime ? 'text-white/70' : 'text-black/70'} max-w-2xl mx-auto`}>
                                    A strategic approach combining cost efficiency, speed-to-market, and native-grade
                                    user experience. Learn why leading startups and enterprises choose hybrid
                                    architecture.
                                </p>
                            </div>
                        </FxReveal>

                        {/* Benefits grid */}
                        <div className="grid lg:grid-cols-3 gap-6 mb-16 max-w-full mx-auto">
                            {[
                                {
                                    icon: '💰',
                                    title: 'Cost-Efficiency',
                                    desc: 'Build once, deploy everywhere. Reduce engineering hours by 60-70% compared to native dual development. Lower QA complexity and maintenance overhead = higher ROI.',
                                    metric: '60-70%'
                                },
                                {
                                    icon: '⚡',
                                    title: 'Accelerated Time-to-Market',
                                    desc: 'Launch MVPs 40-50% faster. Unified development workflow enables real-time user feedback loops and rapid iteration cycles for competitive advantage.',
                                    metric: '40-50%'
                                },
                                {
                                    icon: '🎯',
                                    title: 'Cross-Platform Consistency',
                                    desc: 'Seamless UX across iOS, Android, and Web. React Native, Flutter, and Ionic frameworks deliver 95%+ code reuse while maintaining native device feature access.',
                                    metric: '95%+'
                                },
                                {
                                    icon: '🔄',
                                    title: 'Streamlined Maintenance',
                                    desc: 'Simultaneous platform updates eliminate fragmentation. One codebase means one bug fix, one feature release—reducing deployment risk by 50-80%.',
                                    metric: '50-80%'
                                },
                                {
                                    icon: '✨',
                                    title: 'Modern, Native-Like UX',
                                    desc: 'Modern hybrid frameworks rival native performance. 60-120fps animations, smooth gesture recognition, and platform-specific optimizations included.',
                                    metric: '120fps'
                                },
                                {
                                    icon: '📊',
                                    title: 'Scalable Architecture',
                                    desc: 'Modular design patterns support rapid team scaling. Onboard new developers 30-40% faster with standardized component libraries and shared code patterns.',
                                    metric: '30-40%'
                                }
                            ].map((benefit, idx) => (
                                <FxReveal key={idx} delay={0.12 + idx * 0.04}>
                                    <FxHoloCard day={isDayTime}
                                                className={`p-6 lg:p-8 relative overflow-hidden group ${isDayTime ? 'border-purple-400/20 hover:border-purple-400/40' : 'border-purple-400/20 hover:border-purple-400/40'} transition-all duration-300`}>
                                        {/* Card gradient overlay */}
                                        <div
                                            className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.08),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>

                                        <div className="relative z-10">
                                            <div className="flex items-start justify-between mb-4">
                                                <span className="text-4xl">{benefit.icon}</span>
                                                <div
                                                    className={`px-3 py-1 rounded-full text-xs font-[600] ${isDayTime ? 'bg-purple-400/20 text-purple-300' : 'bg-purple-400/10 text-purple-400'}`}>
                                                    {benefit.metric}
                                                </div>
                                            </div>
                                            <h3 className={`text-[1.1em] font-[600] mb-3 ${isDayTime ? 'text-white' : 'text-black'}`}>
                                                {benefit.title}
                                            </h3>
                                            <p className={`text-sm leading-[1.6] ${isDayTime ? 'text-white/65' : 'text-black/65'}`}>
                                                {benefit.desc}
                                            </p>
                                        </div>
                                    </FxHoloCard>
                                </FxReveal>
                            ))}
                        </div>

                        {/* Deep dive section */}
                        <FxReveal delay={0.4}>
                            <div
                                className={`max-w-6xl mx-auto rounded-2xl border p-8 lg:p-12 ${isDayTime ? 'bg-white/5 border-white/10' : 'bg-black/10 border-black/10'} backdrop-blur-sm`}>
                                <h3 className={`text-[1.5em] font-[700] mb-6 ${isDayTime ? 'text-white' : 'text-black'}`}>
                                    Technical Confidence Meets Business Agility
                                </h3>
                                <div className="space-y-4">
                                    <p className={`text-[0.95em] ${isDayTime ? 'text-white/75' : 'text-black/70'}`}>
                                        We leverage industry-leading hybrid frameworks that enable <span
                                        className="font-[600] text-purple-400">modular architecture</span>, <span
                                        className="font-[600] text-purple-400">native plugin integration</span>,
                                        and <span className="font-[600] text-purple-400">scalable performance optimization</span>.
                                    </p>
                                    <p className={`text-[0.95em] ${isDayTime ? 'text-white/75' : 'text-black/70'}`}>
                                        This approach reduces tech debt while maintaining flexibility for future native
                                        enhancements. Whether launching new products or scaling existing ones, hybrid
                                        development enables you to:
                                    </p>
                                    <ul className="space-y-2 mt-4">
                                        <li className={`flex items-center gap-3 text-[0.95em] ${isDayTime ? 'text-white/70' : 'text-black/65'}`}>
                                            <span className="text-purple-400 text-lg">✓</span> Deliver fast with
                                            predictable timelines
                                        </li>
                                        <li className={`flex items-center gap-3 text-[0.95em] ${isDayTime ? 'text-white/70' : 'text-black/65'}`}>
                                            <span className="text-purple-400 text-lg">✓</span> Look modern with
                                            enterprise-grade UX patterns
                                        </li>
                                        <li className={`flex items-center gap-3 text-[0.95em] ${isDayTime ? 'text-white/70' : 'text-black/65'}`}>
                                            <span className="text-purple-400 text-lg">✓</span> Spend smart without
                                            compromising quality
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </FxReveal>

                        {/* CTA section */}
                        <FxReveal delay={0.5} className="flex justify-center mt-12">
                            <div className="flex flex-col sm:flex-row gap-4">
                                <FxButton href="/quote-request" day={isDayTime} colorScheme="purple">Get a Custom
                                    Quote</FxButton>
                                <FxButton href="/contact" day={isDayTime} variant="ghost" colorScheme="purple">Speak to
                                    an Architect</FxButton>
                            </div>
                        </FxReveal>
                    </div>
                </div>
            </section>

            {/* Who is involved in the process - Premium iOS-style design */}
            <section id={'involved'} className={`relative lg:pt-28 pt-12 lg:pb-28 pb-12 px-4 sm:px-6 lg:px-[4.6em] w-full max-w-full ${isDayTime ? 'text-slate-900' : 'text-white'}`}>
                <div className="relative max-w-[96em] mx-auto">
                    <div className="flex items-center gap-4 mb-8">
                        <span className={`inline-block w-1.5 h-1.5 rounded-full ${isDayTime ? 'bg-gradient-to-br from-purple-400 to-purple-500' : 'bg-gradient-to-br from-purple-400 to-purple-500'}`}></span>
                        <h6 className={`uppercase tracking-widest text-xs font-semibold ${isDayTime ? 'text-slate-500' : 'text-slate-300'}`}>Expert Team</h6>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-10 items-start">
                        {/* Left: Narrative + Roles */}
                        <div className="space-y-6">
                            <h2 className='lg:text-[3em] md:text-[3em] capitalize text-[1.5em] font-[500] tracking-tighter leading-[1.15] lg:pb-6'>
                                who is involved <br className={'lg:block md:block hidden'}/>in the process
                            </h2>

                            <div className={`p-4 rounded-xl backdrop-blur-sm ${isDayTime ? 'bg-white/80 border border-slate-100/30' : 'bg-black/40 border border-white/12'}`}>
                                <p className='text-[0.92em] font-[400] lg:-mt-[0.2em] md:-mt-[0.2em] text-justify leading-[1.6]'>
                                    Hybrid app development requires a specialized, cross-functional team working in tight synchronization. At Grey InfoTech, our collaborative teams deliver premium applications across React Native, Flutter, and Ionic. A dedicated project manager coordinates timelines and priorities, while our experienced hybrid developers architect robust, performant applications using modern frameworks. Our UI/UX designers craft interfaces that ensure consistent user experiences across platforms.
                                </p>

                                <p className='text-[0.92em] font-[400] mt-4 text-justify leading-[1.6]'>
                                    Quality assurance specialists rigorously test across devices and OS versions, while DevOps engineers manage deployment pipelines and app store submissions. Security-focused engineers integrate encryption, authentication, and privacy controls. The entire engagement is guided by your strategic vision, ensuring the final product maximizes user retention, cross-platform monetization, and competitive positioning in both App Stores.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    {
                                        role: 'Hybrid Architect',
                                        desc: 'Defines app structure, framework strategy, and cross-platform performance targets'
                                    },
                                    {
                                        role: 'Project Manager',
                                        desc: 'Coordinates delivery, stakeholder sync, and milestone tracking'
                                    },
                                    {
                                        role: 'UI/UX Designers',
                                        desc: 'Platform-consistent design, accessibility, interactive prototypes'
                                    },
                                    {
                                        role: 'Hybrid Engineers',
                                        desc: 'React Native/Flutter/Ionic implementation, native bridge integration, optimization'
                                    },
                                ].map((r, i) => (
                                    <div key={r.role}>
                                        <div className={`p-4 rounded-lg border ${isDayTime ? 'bg-white/95 border-slate-100' : 'bg-white/5 border-white/8'}`}>
                                            <div className="flex items-start gap-4">
                                                <div className="flex-none w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br from-purple-400 to-purple-500 text-white font-bold text-lg">{i + 1}</div>
                                                <div>
                                                    <div className="font-semibold text-sm">{r.role}</div>
                                                    <div className="text-sm text-slate-500">{r.desc}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-4">
                                <Link href='/contact'>
                                    <button className='relative inline-flex items-center justify-start overflow-hidden group w-fit text-[0.85em] border tracking-tighter rounded-full py-2 px-6'>
                                        <span className={`w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 ${isDayTime ? 'bg-black' : 'bg-white'} opacity-[3%]`}></span>
                                        <span className={`absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 ${isDayTime ? 'bg-black' : 'bg-white'} opacity-100 group-hover:-translate-x-8`}></span>
                                        <span className={`relative w-full text-left transition-colors duration-200 ease-in-out ${isDayTime ? 'text-black group-hover:text-gray-300' : 'text-white group-hover:text-gray-800'}`}>Work with our team <span className={`text-[1.5em] leading-[0.7]`}> →</span></span>
                                        <span className={`absolute inset-0 border-[1px] ${isDayTime ? 'border-black' : 'border-white'} rounded-full`}></span>
                                    </button>
                                </Link>
                            </div>
                        </div>

                        {/* Right: Images with frames */}
                        <div className="relative flex flex-row lg:-ml-[2em] md:-ml-[2em] w-full h-auto max-w-full mx-auto gap-6">
                            {/* Left image - larger */}
                            <div className="flex-1 flex lg:-mr-[17.5em] md:-mr-[17.5em] justify-center items-start">
                                <div className={`relative rounded-2xl overflow-hidden border ${isDayTime ? 'bg-white/95 border-slate-100' : 'bg-white/6 border-white/8'} shadow-xl`}>
                                    {/* Neon rim + ambient orbs */}
                                    <div className="absolute inset-0 pointer-events-none rounded-2xl" style={{boxShadow: isDayTime ? 'inset 0 0 40px rgba(139,92,246,0.06), 0 20px 60px rgba(139,92,246,0.05)' : 'inset 0 0 80px rgba(139,92,246,0.06), 0 30px 90px rgba(2,6,23,0.6)'}}/>
                                    <div aria-hidden className="absolute inset-0 pointer-events-none">
                                        <div className="absolute -top-28 -left-20 w-[420px] h-[420px] rounded-full opacity-18" style={{background: isDayTime ? 'radial-gradient(circle,#a78bfa 0%, transparent 70%)' : 'radial-gradient(circle,#8b5cf6 0%, transparent 70%)'}}/>
                                        <div className="absolute -bottom-20 -right-16 w-[340px] h-[340px] rounded-full opacity-12" style={{background: isDayTime ? 'radial-gradient(circle,#d8b4fe 0%, transparent 70%)' : 'radial-gradient(circle,#7c3aed 0%, transparent 70%)'}}/>
                                    </div>

                                    <Image
                                        src="/assets/hybrid/trip.jpg"
                                        alt="Team at table"
                                        width={1200}
                                        height={800}
                                        className="w-full h-auto object-cover rounded-2xl"
                                    />

                                    <div className='absolute bottom-4 left-4 px-3 py-2 rounded-full backdrop-blur-md text-sm font-semibold' style={{background: isDayTime ? 'rgba(255,255,255,0.85)' : 'rgba(8,10,20,0.6)'}}>
                                        Development sprints
                                    </div>
                                </div>
                            </div>

                            {/* Right image - smaller, offset vertically */}
                            <div className="flex-1 flex justify-center lg:pl-[15em] md:pl-[15em] lg:-mr-[4em] items-start pt-12">
                                <div className={`relative rounded-2xl overflow-hidden border ${isDayTime ? 'bg-white/95 border-slate-100' : 'bg-white/6 border-white/8'} shadow-xl w-full max-w-[320px]`}>
                                    <div className="absolute inset-0 pointer-events-none rounded-2xl" style={{boxShadow: isDayTime ? 'inset 0 0 40px rgba(139,92,246,0.06)' : 'inset 0 0 60px rgba(139,92,246,0.05)'}}/>
                                    <Image
                                        src="/assets/hybrid/disc.jpg"
                                        alt="Team discussion"
                                        height={700}
                                        width={320}
                                        className="w-full h-auto object-cover rounded-2xl"
                                    />
                                    <div className='absolute top-4 right-4 px-3 py-2 rounded-full backdrop-blur-md text-sm font-semibold' style={{background: isDayTime ? 'rgba(255,255,255,0.85)' : 'rgba(8,10,20,0.6)'}}>
                                        Code reviews
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <ServiceCapabilities
                heading="Hybrid app delivery capabilities"
                subheading="PROVEN DELIVERY"
                accentColor="#8b5cf6"
                isDarkBg={!isDayTime}
                variant="terminal"
                ctaHref="/quote-request"
                ctaLabel="Start your hybrid project"
                capabilities={[
                    {
                        id: 'architecture',
                        title: 'Discovery & Architecture',
                        description: 'We align product goals, audience needs, and technical constraints to shape a resilient hybrid foundation that scales from MVP to enterprise rollout.',
                        points: ['Product strategy workshops', 'Platform roadmap', 'Technical architecture', 'Risk assessment']
                    },
                    {
                        id: 'mobile',
                        title: 'Cross-Platform Engineering',
                        description: 'Our teams build performant apps across React Native, Flutter, and Ionic with shared business logic, native integrations, and reliable deployment pipelines.',
                        points: ['Shared codebase delivery', 'Native bridge integration', 'API-first architecture', 'CI/CD automation']
                    },
                    {
                        id: 'design',
                        title: 'Premium UI & Experience',
                        description: 'We create polished, intuitive interfaces that feel native on every device while remaining consistent across iOS, Android, and Web.',
                        points: ['Design systems', 'Accessibility', 'Motion language', 'Platform-ready UI patterns']
                    },
                    {
                        id: 'quality',
                        title: 'Quality & Reliability',
                        description: 'We validate every release through automated testing, device compatibility reviews, and performance monitoring to protect user trust.',
                        points: ['Automated testing', 'Performance profiling', 'Crash monitoring', 'Regression coverage']
                    },
                    {
                        id: 'security',
                        title: 'Security & Compliance',
                        description: 'From authentication to secure data flows, we build hybrid applications with enterprise-grade protections and governance-ready practices.',
                        points: ['Authentication controls', 'Encrypted storage', 'Compliance support', 'Secure integrations']
                    },
                    {
                        id: 'growth',
                        title: 'Support & Growth',
                        description: 'We stay with your product beyond launch through maintenance, feature expansion, and optimization so your app continues to grow.',
                        points: ['Post-launch support', 'Feature roadmap', 'Performance tuning', 'Scale planning']
                    }
                ]}
            />

        </div>
    );
};

export default HybridAppDevelopment;

