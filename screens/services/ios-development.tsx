'use client';

import React, {useEffect, useRef, useState} from 'react';
import '@/app/globals.css'
import Image from "next/image";
import ResponsiveVideoHero from '@/components/ResponsiveVideoHero';
import ServiceHero from '@/components/futuristic/ServiceHero';
import ServiceCapabilities from '@/components/futuristic/ServiceCapabilities';
import Link from "next/link";
import {useIsDayTime} from '../../components/useIsDayTime';

import FuturisticServiceLayout from '@/components/futuristic/FuturisticServiceLayout';

import { FxBackground, FxChip, FxReveal, FxButton, FxHoloCard, FxCard, FxStickyScrollSection } from '@/components/futuristic/fx';
const IosDevelopment = () => {
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
            "IPA",
            "IPDA",
            "AWA",
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

            {/* Unified Futuristic iOS Development Hero - Background Image/Video with overlay */}
            <section className="relative overflow-hidden lg:w-full lg:min-h-[90vh] lg:h-[720px] w-full h-[600px]">
                {/* Video Background (desktop) and Image fallback (mobile) */}
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="hidden lg:block absolute inset-0 w-full h-full object-cover"
                    poster="/assets/ios/hero.jpg"
                >
                    <source src="/assets/ios/hero-mobile.mp4" type="video/mp4"/>
                </video>

                <Image
                    src="/assets/ios/hero.jpg"
                    alt="iOS App Development Hero"
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
                                    className="text-cyan-400 text-[0.7em] lg:text-[0.82em] uppercase tracking-[0.22em] font-[600]">iOS Development</span>
                            </div>

                            <h1 className="text-white text-[2em] lg:text-[4.5em] font-[700] leading-[1.08] tracking-tight mb-6 lg:mb-8">
                                Native iOS Apps, <span className="gx-gradient-text">Extraordinary Results</span>
                            </h1>

                            <p className="text-white/70 text-[0.85em] lg:text-[1.08em] leading-[1.65] mb-8 lg:mb-10 font-[300]">
                                Expert iOS development for iPhone, iPad, and Apple Watch. We build high-performance native apps that deliver seamless user experiences and unlock the full potential of Apple's ecosystem.
                            </p>

                            <div className="flex flex-wrap gap-2 mb-10 lg:mb-12">
                                {['Swift & SwiftUI', 'App Store Ready', 'Native Performance', 'Secure Architecture', 'Hardware Integration'].map((badge) => (
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
                                        style={{background: '#06b6d4', color: '#000'}}>
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
                                    {label: 'Apps Delivered', value: '40+'},
                                    {label: 'Years Experience', value: '8+'},
                                    {label: 'App Store Success', value: '100%'},
                                    {label: 'Avg Rating', value: '4.8★'}
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
                            {label: 'Apps', value: '40+'},
                            {label: 'Experts', value: '8+'},
                            {label: 'Rating', value: '4.8★'}
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
                        <FxChip day={!isBackgroundActive ? !isDayTime : isDayTime}>NATIVE EXCELLENCE</FxChip>
                    </div>

                    <div className="lg:-ml-[19em]">
                        <FxReveal>
                            <h3 className="lg:text-[3.5em] md:text-[3em] text-[2em] font-[700] tracking-tight leading-[1.15] mt-4">
                                Powerful iOS Apps, <span
                                className="gx-gradient-text">Unlimited Potential</span>
                            </h3>
                        </FxReveal>

                        <FxReveal delay={0.08}>
                            <div
                                className="grid lg:grid-cols-2 grid-cols-1 gap-6 mt-6 font-[300] text-justify text-[0.95em] md:text-[1.05em] leading-relaxed">
                                <div className="space-y-4">
                                    <p>Native iOS development unlocks the full potential of Apple's ecosystem. At Grey InfoTech, we specialize in crafting high-performance apps using Swift and SwiftUI that deliver exceptional user experiences. Our approach maximizes device capabilities—GPS, sensors, cameras, biometrics—to create innovative solutions that drive real business value.</p>
                                    <p>We follow rigorous best practices: thorough requirements analysis, architecture design, secure implementation, comprehensive testing, and iterative refinement. Every feature is intentionally crafted to be intuitive, performant, and aligned with Apple's Human Interface Guidelines, ensuring your app stands out in the App Store.</p>
                                    <div className="flex flex-wrap gap-3 mt-4">
                                        {['Swift Development', 'App Store Optimization', 'Hardware Integration', 'Security & Privacy'].map((p) => (
                                            <span key={p} className="gx-data-pill">{p}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <p>Whether building consumer apps, enterprise solutions, or custom tools for iPhone, iPad, or Apple Watch, we deliver scalable applications optimized for performance, security, and user satisfaction. Native development means zero compromise on speed or access to device hardware—your users get the smoothest, most responsive experience possible.</p>
                                    <p>Our end-to-end process spans discovery, prototyping, implementation, App Store submission, launch support, and ongoing optimization. We partner closely with your team, providing transparent progress tracking, regular updates, and strategic guidance to ensure your app achieves long-term success and user loyalty.</p>
                                    <div className="flex flex-wrap gap-3 mt-4">
                                        {['iOS Performance', 'Accessibility (VoiceOver)', 'Continuous Deployment', 'User Retention'].map((p) => (
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
                                    Premium iOS experiences, crafted with precision and delivered with excellence.
                                </h3>
                                <p className="mt-4 max-w-xl text-[0.9em] sm:text-[1em] leading-[1.7] text-white/70">
                                    A showcase gallery of elegant interfaces, optimized performance, and App Store-ready applications—built with cutting-edge Swift and native iOS frameworks.
                                </p>
                            </div>
                            <div className="grid gap-2 sm:grid-cols-2 lg:min-w-[290px]">
                                {[
                                    {label: 'Native Code', value: '01'},
                                    {label: 'App Store', value: '02'},
                                    {label: 'Performance', value: '03'},
                                    {label: 'Innovation', value: '04'}
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
                                    src="/assets/ios/1.jpg"
                                    alt="iOS architecture showcase"
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
                                    <p className="text-[0.62em] uppercase tracking-[0.3em] text-teal-300 font-[600]">Native Architecture</p>
                                    <p className="mt-2 max-w-xl text-sm sm:text-base text-white/90">Swift-first development delivering high-performance iOS applications.</p>
                                </div>
                            </div>

                            <div className="grid gap-4">
                                <div
                                    className="group relative overflow-hidden rounded-[1.35rem] border border-white/10 h-[250px] sm:h-[260px] lg:h-[260px]">
                                    <Image
                                        src="/assets/ios/2.jpg"
                                        alt="iOS UI detail showcase"
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
                                        src="/assets/ios/3.jpg"
                                        alt="iOS workflow showcase"
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
                                    src="/assets/ios/4.jpg"
                                    alt="iOS product experience showcase"
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
                                    <p className="text-white/90 text-sm sm:text-base">Premium, optimized product experiences built for App Store success.</p>
                                </div>
                            </div>
                        </div>
                    </FxCard>
                </div>
            </section>

            {/* iOS development solutions */}
            <FxStickyScrollSection
                day={isDayTime}
                heading={<>iOS<br/>development solutions</>}
                intro="Our iOS services combine native Swift development, intuitive interface design, and App Store expertise to deliver premium applications across iPhone, iPad, and Apple Watch ecosystems with exceptional performance and user satisfaction."
                navLabel="iOS Solutions"
                activeId={activeId}
                onNavClickAction={scrollToSection}
                items={[
                    {
                        id: '01',
                        title: 'iPhone Apps',
                        target: 'IPA',
                        tags: ['Mobile-first', 'Touch Optimized', 'On-the-go Ready'],
                        body: (
                            <div>
                                <p>
                                    We craft native iPhone applications designed for seamless user experiences on Apple&apos;s 
                                    premium handsets. From optimized onboarding to smooth navigation, every interaction is 
                                    engineered for mobile-first usage patterns with exceptional performance across device generations.
                                </p>
                                <p className="mt-3">
                                    Whether targeting peak usage during commute hours or always-on user engagement, our iPhone apps 
                                    deliver responsive, battery-efficient experiences that keep users coming back with consistent 
                                    quality from iPhone 12 through iPhone 15 and beyond.
                                </p>
                                <div className="mt-4 grid gap-3 md:grid-cols-2">
                                    <div className="rounded-2xl border border-teal-400/10 bg-white/[0.03] p-3">
                                        <div className="text-[0.72em] uppercase tracking-[0.28em] text-teal-300">User Experience</div>
                                        <div className="mt-2 text-sm text-white/80">Intuitive, touch-first interfaces optimized 
                                            for on-the-go engagement and quick interactions.</div>
                                    </div>
                                    <div className="rounded-2xl border border-teal-400/10 bg-white/[0.03] p-3">
                                        <div className="text-[0.72em] uppercase tracking-[0.28em] text-teal-300">Performance</div>
                                        <div className="mt-2 text-sm text-white/80">Swift-native code delivering fast startup times, 
                                            smooth animations, and battery efficiency across all models.</div>
                                    </div>
                                </div>
                            </div>
                        ),
                        metrics: [
                            {label: 'App Store Rating', value: '4.8+'},
                            {label: 'Load Time', value: '&lt;1.2s'},
                            {label: 'Battery Life', value: '+25%'},
                        ],
                        deliverables: ['Swift native architecture', 'Device-specific optimization', 'App Store submission readiness', 'Performance profiling and tuning'],
                    },
                    {
                        id: '02',
                        title: 'iPad Apps',
                        target: 'IPDA',
                        tags: ['Tablet-optimized', 'Productivity-focused', 'Large-screen UX'],
                        body: (
                            <div>
                                <p>
                                    Our iPad applications leverage the tablet&apos;s generous screen real estate to deliver powerful, 
                                    content-rich experiences for both consumer and enterprise environments. We design for multi-tasking, 
                                    split-view workflows, and immersive visual storytelling.
                                </p>
                                <p className="mt-3">
                                    Perfect for workplace productivity, creative tools, and data visualization, our iPad apps maximize 
                                    information density while maintaining intuitive navigation that enterprise users and consumers alike 
                                    can master instantly across all iPad sizes and orientations.
                                </p>
                                <div className="mt-4 grid gap-3 md:grid-cols-2">
                                    <div className="rounded-2xl border border-teal-400/10 bg-white/[0.03] p-3">
                                        <div className="text-[0.72em] uppercase tracking-[0.28em] text-teal-300">Information Design</div>
                                        <div className="mt-2 text-sm text-white/80">Multi-column layouts, split-view, and 
                                            adaptive UI patterns that shine on larger screens.</div>
                                    </div>
                                    <div className="rounded-2xl border border-teal-400/10 bg-white/[0.03] p-3">
                                        <div className="text-[0.72em] uppercase tracking-[0.28em] text-teal-300">Enterprise Value</div>
                                        <div className="mt-2 text-sm text-white/80">Replace desktop workflows with fluid iPad experiences 
                                            designed for workplace efficiency and team productivity.</div>
                                    </div>
                                </div>
                            </div>
                        ),
                        metrics: [
                            {label: 'Screen Efficiency', value: '90%+'},
                            {label: 'Productivity Gain', value: '3x'},
                            {label: 'Orientation Support', value: 'Full'},
                        ],
                        deliverables: ['iPad-first UI architecture', 'Multi-window and split-view support', 'Enterprise deployment guide', 'Accessibility compliance (WCAG AA)'],
                    },
                    {
                        id: '03',
                        title: 'Apple Watch Apps',
                        target: 'AWA',
                        tags: ['Wearable-first', 'Lightweight', 'Instant Insights'],
                        body: (
                            <div>
                                <p>
                                    We pioneer Apple Watch experiences that deliver instant value on the wrist—from glanceable 
                                    health metrics and productivity shortcuts to immersive complications and watch-native interactions 
                                    that feel intuitive within the constraints of watchOS.
                                </p>
                                <p className="mt-3">
                                    Approved Apple developers, we design watch apps for quick engagement, minimal battery drain, and 
                                    seamless synchronization with companion iPhone apps. Whether health tracking, payments, or notifications, 
                                    every interaction is optimized for the wrist experience.
                                </p>
                                <div className="mt-4 grid gap-3 md:grid-cols-2">
                                    <div className="rounded-2xl border border-teal-400/10 bg-white/[0.03] p-3">
                                        <div className="text-[0.72em] uppercase tracking-[0.28em] text-teal-300">Wearable UX</div>
                                        <div className="mt-2 text-sm text-white/80">Glanceable designs, quick actions, and 
                                            complications that provide instant context without navigation.</div>
                                    </div>
                                    <div className="rounded-2xl border border-teal-400/10 bg-white/[0.03] p-3">
                                        <div className="text-[0.72em] uppercase tracking-[0.28em] text-teal-300">Ecosystem Integration</div>
                                        <div className="mt-2 text-sm text-white/80">Seamless sync with iPhone apps and HealthKit 
                                            for unified experiences across Apple devices.</div>
                                    </div>
                                </div>
                            </div>
                        ),
                        metrics: [
                            {label: 'Launch Time', value: '&lt;500ms'},
                            {label: 'Battery Impact', value: '-2%'},
                            {label: 'Device Coverage', value: 'All Series'},
                        ],
                        deliverables: ['watchOS-native architecture', 'Complication design and integration', 'Cellular and standalone mode support', 'Health and fitness framework integration'],
                    },
                    {
                        id: '04',
                        title: 'iOS System Integration',
                        target: 'ISI',
                        tags: ['Deep Integration', 'Advanced Frameworks', 'Platform Mastery'],
                        body: (
                            <div>
                                <p>
                                    We leverage Apple&apos;s advanced frameworks—ARKit, CoreML, CallKit, SiriKit, and more—to build 
                                    deeply integrated experiences that feel native and unlock capabilities beyond standard apps. From 
                                    augmented reality to AI-powered features, we push the platform to its potential.
                                </p>
                                <p className="mt-3">
                                    Our system integration expertise enables push notifications, background processing, app extensions, 
                                    and secure data exchange that turn your iOS app into an indispensable part of the Apple ecosystem, 
                                    driving user loyalty and retention.
                                </p>
                                <div className="mt-4 grid gap-3 md:grid-cols-2">
                                    <div className="rounded-2xl border border-teal-400/10 bg-white/[0.03] p-3">
                                        <div className="text-[0.72em] uppercase tracking-[0.28em] text-teal-300">Advanced Features</div>
                                        <div className="mt-2 text-sm text-white/80">ARKit, CoreML, Vision framework, and 
                                            real-time processing for immersive, intelligent applications.</div>
                                    </div>
                                    <div className="rounded-2xl border border-teal-400/10 bg-white/[0.03] p-3">
                                        <div className="text-[0.72em] uppercase tracking-[0.28em] text-teal-300">Ecosystem Depth</div>
                                        <div className="mt-2 text-sm text-white/80">CallKit, SiriKit, Share extensions, and HomeKit 
                                            integration for seamless platform participation.</div>
                                    </div>
                                </div>
                            </div>
                        ),
                        metrics: [
                            {label: 'Framework Coverage', value: '15+'},
                            {label: 'Integration Depth', value: 'Maximal'},
                            {label: 'Siri Support', value: 'Yes'},
                        ],
                        deliverables: ['Framework integration architecture', 'ARKit and ML model deployment', 'Extension and widget framework', 'Security and privacy implementation'],
                    },
                    {
                        id: '05',
                        title: 'App Store Optimization & Launch',
                        target: 'ASOL',
                        tags: ['App Store Mastery', 'Launch Strategy', 'Growth Hacking'],
                        body: (
                            <div>
                                <p>
                                    We handle every aspect of App Store presence—from compelling app store listings and 
                                    strategic keyword optimization to coordinated launch campaigns that drive discovery, downloads, 
                                    and user engagement from day one.
                                </p>
                                <p className="mt-3">
                                    Our ASO expertise spans localization strategies, competitive analysis, A/B testing of preview 
                                    images and descriptions, and post-launch momentum management to ensure your app achieves top 
                                    rankings and sustained visibility in competitive categories.
                                </p>
                                <div className="mt-4 grid gap-3 md:grid-cols-2">
                                    <div className="rounded-2xl border border-teal-400/10 bg-white/[0.03] p-3">
                                        <div className="text-[0.72em] uppercase tracking-[0.28em] text-teal-300">Discovery</div>
                                        <div className="mt-2 text-sm text-white/80">Keyword strategy, localization, and competitive 
                                            positioning to maximize organic App Store visibility.</div>
                                    </div>
                                    <div className="rounded-2xl border border-teal-400/10 bg-white/[0.03] p-3">
                                        <div className="text-[0.72em] uppercase tracking-[0.28em] text-teal-300">Conversion</div>
                                        <div className="mt-2 text-sm text-white/80">A/B tested preview images, app descriptions, 
                                            and rating strategies to maximize install conversion rates.</div>
                                    </div>
                                </div>
                            </div>
                        ),
                        metrics: [
                            {label: 'Download Growth', value: '3-5x'},
                            {label: 'Ranking Position', value: 'Top 10%'},
                            {label: 'Conversion Rate', value: '+40%'},
                        ],
                        deliverables: ['App Store listing optimization', 'Localization strategy', 'Launch campaign plan', 'Ongoing ASO monitoring and refinement'],
                    },
                    {
                        id: '06',
                        title: 'Performance Optimization & Testing',
                        target: 'POT',
                        tags: ['Speed Optimization', 'Battery Efficiency', 'Quality Assurance'],
                        body: (
                            <div>
                                <p>
                                    We rigorously profile, test, and optimize iOS apps to meet Apple&apos;s high performance standards—
                                    minimizing launch times, reducing memory footprint, optimizing battery drain, and ensuring 
                                    stability across all supported devices and iOS versions.
                                </p>
                                <p className="mt-3">
                                    From automated testing frameworks to real-device performance profiling, our QA process catches 
                                    edge cases, memory leaks, and performance regressions before they reach users. Every release is 
                                    production-ready and exceeds Apple&apos;s technical guidelines.
                                </p>
                                <div className="mt-4 grid gap-3 md:grid-cols-2">
                                    <div className="rounded-2xl border border-teal-400/10 bg-white/[0.03] p-3">
                                        <div className="text-[0.72em] uppercase tracking-[0.28em] text-teal-300">Performance Tuning</div>
                                        <div className="mt-2 text-sm text-white/80">Launch time reduction, memory optimization, 
                                            battery profiling, and frame-rate stability across device tiers.</div>
                                    </div>
                                    <div className="rounded-2xl border border-teal-400/10 bg-white/[0.03] p-3">
                                        <div className="text-[0.72em] uppercase tracking-[0.28em] text-teal-300">Quality Assurance</div>
                                        <div className="mt-2 text-sm text-white/80">Automated testing, real-device testing, crash 
                                            reporting integration, and compliance verification.</div>
                                    </div>
                                </div>
                            </div>
                        ),
                        metrics: [
                            {label: 'Launch Time', value: '&lt;800ms'},
                            {label: 'Memory Usage', value: '-35%'},
                            {label: 'Crash Rate', value: '&lt;0.01%'},
                        ],
                        deliverables: ['Performance benchmark report', 'Automated testing suite', 'Memory/battery profiling', 'Continuous integration pipeline'],
                    },
                    {
                        id: '07',
                        title: 'In-App Monetization & Analytics',
                        target: 'IAMAA',
                        tags: ['Revenue Optimization', 'User Analytics', 'Engagement Tracking'],
                        body: (
                            <div>
                                <p>
                                    We implement sophisticated monetization strategies—in-app purchases, subscriptions, ad integration, 
                                    and freemium models—designed to maximize revenue while maintaining positive user sentiment and 
                                    long-term retention.
                                </p>
                                <p className="mt-3">
                                    Advanced analytics tracking provides deep insight into user behavior, conversion funnels, lifetime 
                                    value, and feature engagement. Data-driven decisions guide pricing strategies, promotional timing, 
                                    and feature prioritization for continuous revenue growth.
                                </p>
                                <div className="mt-4 grid gap-3 md:grid-cols-2">
                                    <div className="rounded-2xl border border-teal-400/10 bg-white/[0.03] p-3">
                                        <div className="text-[0.72em] uppercase tracking-[0.28em] text-teal-300">Monetization</div>
                                        <div className="mt-2 text-sm text-white/80">StoreKit 2 integration, in-app purchases, subscription 
                                            management, and revenue optimization strategies.</div>
                                    </div>
                                    <div className="rounded-2xl border border-teal-400/10 bg-white/[0.03] p-3">
                                        <div className="text-[0.72em] uppercase tracking-[0.28em] text-teal-300">Analytics & Insights</div>
                                        <div className="mt-2 text-sm text-white/80">Funnel analysis, cohort tracking, LTV calculation, 
                                            and conversion optimization with privacy compliance.</div>
                                    </div>
                                </div>
                            </div>
                        ),
                        metrics: [
                            {label: 'Revenue per User', value: '+60%'},
                            {label: 'Subscription Retention', value: '85%+'},
                            {label: 'Conversion Rate', value: '8-12%'},
                        ],
                        deliverables: ['Monetization architecture', 'StoreKit 2 implementation', 'Analytics dashboard', 'Revenue forecasting model'],
                    },
                    {
                        id: '08',
                        title: 'Cross-Platform Development',
                        target: 'CPD',
                        tags: ['React Native', 'Flutter', 'Code Reuse'],
                        body: (
                            <div>
                                <p>
                                    For teams needing iOS and Android presence, we architect cross-platform solutions using React Native 
                                    and Flutter—delivering native performance and UX while dramatically reducing development time and 
                                    maintenance overhead through shared code.
                                </p>
                                <p className="mt-3">
                                    Our platform-agnostic approach maximizes code reuse while respecting platform-specific patterns, 
                                    ensuring experiences that feel genuinely native on iOS. Whether choosing React Native for JavaScript 
                                    teams or Flutter for rapid development, we handle the full stack.
                                </p>
                                <div className="mt-4 grid gap-3 md:grid-cols-2">
                                    <div className="rounded-2xl border border-teal-400/10 bg-white/[0.03] p-3">
                                        <div className="text-[0.72em] uppercase tracking-[0.28em] text-teal-300">Code Efficiency</div>
                                        <div className="mt-2 text-sm text-white/80">Share 60-80% of code between iOS and Android 
                                            while maintaining native look and feel on both platforms.</div>
                                    </div>
                                    <div className="rounded-2xl border border-teal-400/10 bg-white/[0.03] p-3">
                                        <div className="text-[0.72em] uppercase tracking-[0.28em] text-teal-300">Time to Market</div>
                                        <div className="mt-2 text-sm text-white/80">Ship to both app stores simultaneously with 
                                            reduced development cycles and unified testing.</div>
                                    </div>
                                </div>
                            </div>
                        ),
                        metrics: [
                            {label: 'Platform Coverage', value: 'iOS + Android'},
                            {label: 'Code Reuse', value: '70%+'},
                            {label: 'Dev Efficiency', value: '2x'},
                        ],
                        deliverables: ['Cross-platform architecture', 'Shared component library', 'Platform-specific customization', 'Dual app store releases'],
                    },
                    {
                        id: '09',
                        title: 'Security & Data Protection',
                        target: 'SDP',
                        tags: ['Encryption', 'GDPR Compliance', 'Data Privacy'],
                        body: (
                            <div>
                                <p>
                                    We implement enterprise-grade security from architecture through deployment—end-to-end encryption, 
                                    secure credential storage, biometric authentication, and data protection frameworks that meet GDPR, 
                                    CCPA, and industry-specific compliance standards.
                                </p>
                                <p className="mt-3">
                                    Security is embedded in every development decision: secure API communication, encrypted local storage, 
                                    privacy-preserving analytics, and regular security audits. Your users&apos; data stays protected, your 
                                    business stays compliant, and your reputation stays intact.
                                </p>
                                <div className="mt-4 grid gap-3 md:grid-cols-2">
                                    <div className="rounded-2xl border border-teal-400/10 bg-white/[0.03] p-3">
                                        <div className="text-[0.72em] uppercase tracking-[0.28em] text-teal-300">Data Protection</div>
                                        <div className="mt-2 text-sm text-white/80">End-to-end encryption, biometric auth, Keychain 
                                            integration, and encrypted data persistence.</div>
                                    </div>
                                    <div className="rounded-2xl border border-teal-400/10 bg-white/[0.03] p-3">
                                        <div className="text-[0.72em] uppercase tracking-[0.28em] text-teal-300">Compliance</div>
                                        <div className="mt-2 text-sm text-white/80">GDPR, CCPA, HIPAA, and PCI-DSS compliance 
                                            documentation and implementation verification.</div>
                                    </div>
                                </div>
                            </div>
                        ),
                        metrics: [
                            {label: 'Encryption', value: 'AES-256'},
                            {label: 'Auth Method', value: 'Biometric + 2FA'},
                            {label: 'Compliance', value: 'Multi-standard'},
                        ],
                        deliverables: ['Security architecture blueprint', 'Encryption implementation', 'Compliance audit report', 'Security testing and pen testing'],
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
                                Apple Ecosystem
                            </div>
                            <div
                                className="absolute right-3 top-3 z-10 rounded-full border border-white/15 bg-black/20 px-3 py-1 text-[0.56em] uppercase tracking-[0.32em] text-white/70">
                                iOS Excellence
                            </div>
                            <div className="absolute inset-0 border border-white/10"/>
                            <div
                                className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(2,6,23,0.18)_45%,rgba(2,6,23,0.82)_100%)]"/>
                            <Image
                                className="h-[320px] sm:h-[420px] lg:h-[520px] w-full object-cover"
                                src={'/assets/ios/mid.jpg'}
                                alt={'iOS development showcase'}
                                width={2560}
                                height={1440}
                            />
                        </div>

                        <div className="flex flex-col justify-between gap-4">
                            <div
                                className="rounded-[1.3rem] border border-teal-400/15 bg-white/[0.04] p-5 backdrop-blur-md">
                                <div className="flex items-center gap-2">
                                    <span className="h-2.5 w-2.5 rounded-full bg-teal-400 animate-pulse"/>
                                    <span className="text-[0.62em] uppercase tracking-[0.3em] text-teal-300">Innovation center</span>
                                </div>
                                <h3 className="mt-4 text-[1.45em] sm:text-[1.8em] font-[700] leading-[1.08] tracking-tight text-white">
                                    Premium iOS experiences engineered for excellence.
                                </h3>
                                <p className="mt-3 text-[0.82em] sm:text-[0.9em] leading-[1.7] text-white/70">
                                    From Swift-native architecture to App Store mastery, we craft iOS applications that combine 
                                    elegant design, robust performance, and seamless user engagement across all Apple devices.
                                </p>
                            </div>

                            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                                {[
                                    {label: 'App Rating', value: '4.8+'},
                                    {label: 'Users', value: '50M+'},
                                    {label: 'Platform', value: '100%'}
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
                                <div className="text-[0.62em] uppercase tracking-[0.3em] text-cyan-300">Capability suite
                                </div>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {['Native Swift', 'App Store Ready', 'System Integration', 'Enterprise Grade'].map((chip) => (
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

            {/* Why iOS Application */}
            <div
                className={`lg:pt-[3em] md:pt-[2em] pt-[1em] lg:pb-[3em] md:pb-[2em] pb-[1em] ${isDayTime ? 'bg-black text-white' : 'bg-white text-black'}`}>
                <div id={'why-ios-application'}
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
                                        Why iOS is the <span className={`bg-gradient-to-r ${isDayTime ? 'from-cyan-600 via-sky-600 to-teal-500' : 'from-cyan-300 via-teal-300 to-sky-400'} bg-clip-text text-transparent`}>Premium Choice</span> for Mobile Excellence
                                    </h2>
                                </div>
                                <div className={`rounded-[1.25rem] border p-6 text-[0.92em] leading-7 ${isDayTime ? 'border-slate-200/80 bg-white/70 text-slate-700' : 'border-white/10 bg-black/20 text-slate-300'}`}>
                                    <p>
                                        iOS delivers a premium platform for businesses targeting high-value users with exceptional engagement potential. Apple's ecosystem combines cutting-edge hardware, rigorous security, and powerful frameworks that enable innovative, high-performance applications built to scale with your business ambitions.
                                    </p>
                                </div>
                            </div>

                            <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2">
                                <div id={'premium-user-base'} className={`group rounded-[1.35rem] border p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/40 ${isDayTime ? 'border-slate-200/80 bg-white/70' : 'border-white/10 bg-white/5'}`}>
                                    <div className="flex items-center gap-3">
                                        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${isDayTime ? 'border-cyan-500/20 bg-cyan-500/10' : 'border-cyan-400/20 bg-cyan-400/10'}`}>
                                            <svg className="h-7 w-7 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
                                            </svg>
                                        </div>
                                        <div>
                                            <div className={`text-[0.62em] uppercase tracking-[0.35em] ${isDayTime ? 'text-cyan-700' : 'text-cyan-200'}`}>Revenue potential</div>
                                            <h3 className="mt-1 text-[1.1rem] font-[600]">Premium User Base</h3>
                                        </div>
                                    </div>
                                    <p className={`mt-5 text-[0.9em] leading-7 ${isDayTime ? 'text-slate-700' : 'text-slate-300'}`}>
                                        iOS users demonstrate higher lifetime value and greater willingness to pay for quality apps and in-app purchases. This premium demographic translates to stronger monetization opportunities and more engaged customer bases that drive sustainable business growth.
                                    </p>
                                    <ul className={`mt-5 space-y-2 text-[0.83em] leading-6 ${isDayTime ? 'text-slate-600' : 'text-slate-400'}`}>
                                        <li>• 2-3x higher revenue per user compared to other platforms</li>
                                        <li>• More engaged, loyal users with consistent app usage patterns</li>
                                        <li>• Strong in-app purchase and subscription adoption rates</li>
                                    </ul>
                                </div>

                                <div id={'security-reliability'} className={`group rounded-[1.35rem] border p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/40 ${isDayTime ? 'border-slate-200/80 bg-white/70' : 'border-white/10 bg-white/5'}`}>
                                    <div className="flex items-center gap-3">
                                        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${isDayTime ? 'border-cyan-500/20 bg-cyan-500/10' : 'border-cyan-400/20 bg-cyan-400/10'}`}>
                                            <svg className="h-7 w-7 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.72-7 8.77V12H5V6.3l7-3.11v8.8z"/>
                                            </svg>
                                        </div>
                                        <div>
                                            <div className={`text-[0.62em] uppercase tracking-[0.35em] ${isDayTime ? 'text-cyan-700' : 'text-cyan-200'}`}>Data protection</div>
                                            <h3 className="mt-1 text-[1.1rem] font-[600]">Security & Compliance</h3>
                                        </div>
                                    </div>
                                    <p className={`mt-5 text-[0.9em] leading-7 ${isDayTime ? 'text-slate-700' : 'text-slate-300'}`}>
                                        Apple's rigorous App Store review process and built-in security frameworks ensure applications meet the highest standards for data protection, privacy, and reliability. Enterprise-grade security by default builds customer trust and ensures regulatory compliance.
                                    </p>
                                    <ul className={`mt-5 space-y-2 text-[0.83em] leading-6 ${isDayTime ? 'text-slate-600' : 'text-slate-400'}`}>
                                        <li>• Stringent App Store review process ensures quality and safety</li>
                                        <li>• GDPR, CCPA, and HIPAA-ready security architecture</li>
                                        <li>• Biometric authentication and encrypted data storage built-in</li>
                                    </ul>
                                </div>

                                <div id={'ecosystem-integration'} className={`group rounded-[1.35rem] border p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/40 ${isDayTime ? 'border-slate-200/80 bg-white/70' : 'border-white/10 bg-white/5'}`}>
                                    <div className="flex items-center gap-3">
                                        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${isDayTime ? 'border-cyan-500/20 bg-cyan-500/10' : 'border-cyan-400/20 bg-cyan-400/10'}`}>
                                            <svg className="h-7 w-7 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
                                            </svg>
                                        </div>
                                        <div>
                                            <div className={`text-[0.62em] uppercase tracking-[0.35em] ${isDayTime ? 'text-cyan-700' : 'text-cyan-200'}`}>Platform harmony</div>
                                            <h3 className="mt-1 text-[1.1rem] font-[600]">Seamless Ecosystem Integration</h3>
                                        </div>
                                    </div>
                                    <p className={`mt-5 text-[0.9em] leading-7 ${isDayTime ? 'text-slate-700' : 'text-slate-300'}`}>
                                        Access Apple's powerful frameworks—ARKit, CoreML, HealthKit, HomeKit, SiriKit—to unlock innovative features impossible on other platforms. Deep integration with iPhone, iPad, Apple Watch, and Mac creates distinctive experiences that drive competitive advantage.
                                    </p>
                                    <ul className={`mt-5 space-y-2 text-[0.83em] leading-6 ${isDayTime ? 'text-slate-600' : 'text-slate-400'}`}>
                                        <li>• Native access to AR, ML, and advanced hardware capabilities</li>
                                        <li>• Synchronized experiences across iPhone, iPad, and Apple Watch</li>
                                        <li>• Siri integration and Home automation for smart connectivity</li>
                                    </ul>
                                </div>

                                <div id={'performance-standard'} className={`group rounded-[1.35rem] border p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/40 ${isDayTime ? 'border-slate-200/80 bg-white/70' : 'border-white/10 bg-white/5'}`}>
                                    <div className="flex items-center gap-3">
                                        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${isDayTime ? 'border-cyan-500/20 bg-cyan-500/10' : 'border-cyan-400/20 bg-cyan-400/10'}`}>
                                            <svg className="h-7 w-7 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.62l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.48.11.62l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.11.62l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.48-.12-.62l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
                                            </svg>
                                        </div>
                                        <div>
                                            <div className={`text-[0.62em] uppercase tracking-[0.35em] ${isDayTime ? 'text-cyan-700' : 'text-cyan-200'}`}>Execution quality</div>
                                            <h3 className="mt-1 text-[1.1rem] font-[600]">Performance Excellence</h3>
                                        </div>
                                    </div>
                                    <p className={`mt-5 text-[0.9em] leading-7 ${isDayTime ? 'text-slate-700' : 'text-slate-300'}`}>
                                        Swift's performance characteristics and iOS's optimized OS deliver blazingly fast apps that respect battery life and responsiveness. Every device runs consistently, eliminating fragmentation challenges and ensuring exceptional experiences for every user.
                                    </p>
                                    <ul className={`mt-5 space-y-2 text-[0.83em] leading-6 ${isDayTime ? 'text-slate-600' : 'text-slate-400'}`}>
                                        <li>• Sub-second launch times and smooth 60fps interactions</li>
                                        <li>• Optimized battery efficiency across all device tiers</li>
                                        <li>• Consistent hardware capabilities eliminate device variance</li>
                                    </ul>
                                </div>

                                <div id={'business-growth'} className={`group rounded-[1.35rem] border p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/40 ${isDayTime ? 'border-slate-200/80 bg-white/70' : 'border-white/10 bg-white/5'}`}>
                                    <div className="flex items-center gap-3">
                                        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${isDayTime ? 'border-cyan-500/20 bg-cyan-500/10' : 'border-cyan-400/20 bg-cyan-400/10'}`}>
                                            <svg className="h-7 w-7 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18 10 11.41l4 4 6.3-6.29L22 12v-6z"/>
                                            </svg>
                                        </div>
                                        <div>
                                            <div className={`text-[0.62em] uppercase tracking-[0.35em] ${isDayTime ? 'text-cyan-700' : 'text-cyan-200'}`}>Business momentum</div>
                                            <h3 className="mt-1 text-[1.1rem] font-[600]">Scalable Growth Engine</h3>
                                        </div>
                                    </div>
                                    <p className={`mt-5 text-[0.9em] leading-7 ${isDayTime ? 'text-slate-700' : 'text-slate-300'}`}>
                                        iOS's business maturity and proven monetization pathways create a predictable platform for sustainable revenue growth. Well-documented SDKs, mature analytics, and app store optimization frameworks accelerate go-to-market and scale efficiently.
                                    </p>
                                    <ul className={`mt-5 space-y-2 text-[0.83em] leading-6 ${isDayTime ? 'text-slate-600' : 'text-slate-400'}`}>
                                        <li>• Proven monetization models with high conversion rates</li>
                                        <li>• Mature analytics and attribution frameworks</li>
                                        <li>• Consistent, predictable App Store algorithm and ranking criteria</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Benefits of iOS Application Development */}
            <div className={`${isDayTime ? 'bg-white' : 'bg-black'}`}>
                <div className={`relative mx-auto w-full max-w-full px-4 sm:px-6 lg:px-[4.6em] lg:pt-[6em] lg:pb-[6em] md:pt-[6em] md:pb-[6em] pt-[1.2em] pb-[1.2em] mt-14`}>
                    <div className={`relative overflow-hidden rounded-[2rem] border p-6 sm:p-8 lg:p-10 ${isDayTime ? 'border-slate-200 bg-[linear-gradient(135deg,rgba(255,255,255,0.98),rgba(245,247,250,0.9))]' : 'border-white/10 bg-[linear-gradient(135deg,rgba(6,10,20,0.98),rgba(8,14,25,0.96))]'}`}>
                        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(45,212,191,0.14),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.12),transparent_32%)]" />
                        <div className="pointer-events-none absolute inset-0 border border-white/10 rounded-[2rem]" />

                        <div className="relative z-10 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
                            <div>
                                <div className={`mb-4 inline-flex rounded-full border px-3 py-1 text-[0.62em] font-[600] uppercase tracking-[0.35em] ${isDayTime ? 'border-cyan-500/20 bg-cyan-500/10 text-cyan-700' : 'border-cyan-400/20 bg-cyan-400/10 text-cyan-200'}`}>
                                    Strategic Differentiators
                                </div>
                                <h2 className={`text-[1.6rem] sm:text-[2.1rem] lg:text-[2.8rem] font-[700] leading-[1.08] tracking-tight ${isDayTime ? 'text-slate-900' : 'text-white'}`}>
                                    Why iOS is the strategic platform for future-ready products
                                </h2>

                                <p className={`mt-5 max-w-xl text-[0.95em] leading-7 ${isDayTime ? 'text-slate-700' : 'text-slate-300'}`}>
                                    iOS combines premium monetization, deterministic performance, and hardened privacy controls. Our approach turns platform strengths into measurable outcomes: higher lifetime value, reduced operational risk, and an extensible foundation for emerging capabilities like on-device ML, spatial computing, and secure edge processing.
                                </p>

                                <div className={`mt-7 rounded-[1.4rem] border p-5 ${isDayTime ? 'border-slate-200 bg-white/90' : 'border-white/10 bg-white/6'}`}>
                                    <div className={`text-[0.6em] uppercase tracking-[0.3em] ${isDayTime ? 'text-cyan-700' : 'text-cyan-200'}`}>
                                        Core Differentiator
                                    </div>
                                    <h3 className={`mt-2 text-[1.15rem] font-[600] ${isDayTime ? 'text-slate-900' : 'text-white'}`}>
                                        Platform-Led Business Advantage
                                    </h3>
                                    <p className={`mt-3 text-[0.92em] leading-7 ${isDayTime ? 'text-slate-700' : 'text-slate-300'}`}>
                                        iOS affords a uniquely consistent hardware and software stack that reduces maintenance overhead, accelerates premium feature delivery, and unlocks emergent value streams — from secure payments to health integrations and device continuity — that are difficult to replicate on fragmented ecosystems.
                                    </p>

                                    <div className="mt-5 grid grid-cols-2 gap-2">
                                        {['Elevated LTV', 'Cohesive Hardware Stack', 'Stronger Trust Signals', 'Faster Iteration'].map((metric) => (
                                            <span key={metric} className={`inline-flex items-center justify-center rounded-full border px-3 py-1 text-[0.66em] font-[600] uppercase tracking-[0.18em] ${isDayTime ? 'border-cyan-500/20 bg-cyan-500/8 text-cyan-700' : 'border-cyan-400/20 bg-cyan-400/6 text-cyan-200'}`}>
                                                {metric}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className={`rounded-[1.35rem] border p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/40 ${isDayTime ? 'border-slate-200/80 bg-white/80' : 'border-white/10 bg-white/5'}`}>
                                    <div className={`text-[0.62em] uppercase tracking-[0.3em] font-[600] ${isDayTime ? 'text-cyan-700' : 'text-cyan-200'}`}>Advantage</div>
                                    <h4 className={`mt-2 text-[1.08rem] font-[600] ${isDayTime ? 'text-slate-900' : 'text-white'}`}>Monetization & Customer Quality</h4>
                                    <p className={`mt-3 text-[0.88em] leading-6 ${isDayTime ? 'text-slate-700' : 'text-slate-300'}`}>
                                        Targeting iOS-first unlocks higher ARPU, superior conversion for subscriptions and in-app commerce, and a customer base predisposed to premium offerings — improving unit economics for both B2C and B2B models.
                                    </p>
                                </div>

                                <div className={`rounded-[1.35rem] border p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/40 ${isDayTime ? 'border-slate-200/80 bg-white/80' : 'border-white/10 bg-white/5'}`}>
                                    <div className={`text-[0.62em] uppercase tracking-[0.3em] font-[600] ${isDayTime ? 'text-cyan-700' : 'text-cyan-200'}`}>Advantage</div>
                                    <h4 className={`mt-2 text-[1.08rem] font-[600] ${isDayTime ? 'text-slate-900' : 'text-white'}`}>Enterprise-Grade Security</h4>
                                    <p className={`mt-3 text-[0.88em] leading-6 ${isDayTime ? 'text-slate-700' : 'text-slate-300'}`}>
                                        Secure Enclave, biometric authentication, and Apple's privacy-first APIs enable robust compliance and minimize breach risk. This reduces insurance and remediation costs while providing a compelling trust signal to enterprise customers.
                                    </p>
                                </div>

                                <div className={`rounded-[1.35rem] border p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/40 ${isDayTime ? 'border-slate-200/80 bg-white/80' : 'border-white/10 bg-white/5'}`}>
                                    <div className={`text-[0.62em] uppercase tracking-[0.3em] font-[600] ${isDayTime ? 'text-cyan-700' : 'text-cyan-200'}`}>Advantage</div>
                                    <h4 className={`mt-2 text-[1.08rem] font-[600] ${isDayTime ? 'text-slate-900' : 'text-white'}`}>Performance & Predictability</h4>
                                    <p className={`mt-3 text-[0.88em] leading-6 ${isDayTime ? 'text-slate-700' : 'text-slate-300'}`}>
                                        Consistent hardware profiles and Apple-optimized runtimes yield deterministic performance, enabling richer animations, lower latency, and power-efficient background processing for prolonged sessions.
                                    </p>
                                </div>

                                <div className={`rounded-[1.35rem] border p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/40 ${isDayTime ? 'border-slate-200/80 bg-white/80' : 'border-white/10 bg-white/5'}`}>
                                    <div className={`text-[0.62em] uppercase tracking-[0.3em] font-[600] ${isDayTime ? 'text-cyan-700' : 'text-cyan-200'}`}>Advantage</div>
                                    <h4 className={`mt-2 text-[1.08rem] font-[600] ${isDayTime ? 'text-slate-900' : 'text-white'}`}>Rapid Product Iteration</h4>
                                    <p className={`mt-3 text-[0.88em] leading-6 ${isDayTime ? 'text-slate-700' : 'text-slate-300'}`}>
                                        Mature toolchains, continuous integration with TestFlight, and deterministic device behavior compress QA cycles — enabling weekly experiments and faster validation of revenue-driving features.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="relative z-10 mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            <div className={`rounded-[1.15rem] border p-4 ${isDayTime ? 'border-slate-200/80 bg-white/88' : 'border-white/10 bg-black/24'}`}>
                                <div className={`text-[0.6em] uppercase tracking-[0.35em] font-[600] ${isDayTime ? 'text-cyan-700' : 'text-cyan-200'}`}>Outcome</div>
                                <h4 className={`mt-2 text-[0.98rem] font-[600] ${isDayTime ? 'text-slate-900' : 'text-white'}`}>Sustained Revenue Growth</h4>
                                <p className={`mt-2 text-[0.82em] leading-6 ${isDayTime ? 'text-slate-600' : 'text-slate-400'}`}>An iOS-first roadmap yields predictable monetization mechanics: higher ARPU, recurring revenue, and decreased churn through quality-driven retention strategies.</p>
                            </div>

                            <div className={`rounded-[1.15rem] border p-4 ${isDayTime ? 'border-slate-200/80 bg-white/88' : 'border-white/10 bg-black/24'}`}>
                                <div className={`text-[0.6em] uppercase tracking-[0.35em] font-[600] ${isDayTime ? 'text-cyan-700' : 'text-cyan-200'}`}>Outcome</div>
                                <h4 className={`mt-2 text-[0.98rem] font-[600] ${isDayTime ? 'text-slate-900' : 'text-white'}`}>Trust & Compliance</h4>
                                <p className={`mt-2 text-[0.82em] leading-6 ${isDayTime ? 'text-slate-600' : 'text-slate-400'}`}>Built-in privacy controls and strong platform governance reduce legal exposure and increase adoption in regulated sectors, from healthcare to finance.</p>
                            </div>

                            <div className={`rounded-[1.15rem] border p-4 ${isDayTime ? 'border-slate-200/80 bg-white/88' : 'border-white/10 bg-black/24'}`}>
                                <div className={`text-[0.6em] uppercase tracking-[0.35em] font-[600] ${isDayTime ? 'text-cyan-700' : 'text-cyan-200'}`}>Outcome</div>
                                <h4 className={`mt-2 text-[0.98rem] font-[600] ${isDayTime ? 'text-slate-900' : 'text-white'}`}>Retention & Engagement</h4>
                                <p className={`mt-2 text-[0.82em] leading-6 ${isDayTime ? 'text-slate-600' : 'text-slate-400'}`}>High-fidelity UX, on-device personalization, and native continuity features translate into measurable retention lifts and deeper lifetime engagement.</p>
                            </div>

                            <div className={`rounded-[1.15rem] border p-4 ${isDayTime ? 'border-slate-200/80 bg-white/88' : 'border-white/10 bg-black/24'}`}>
                                <div className={`text-[0.6em] uppercase tracking-[0.35em] font-[600] ${isDayTime ? 'text-cyan-700' : 'text-cyan-200'}`}>Outcome</div>
                                <h4 className={`mt-2 text-[0.98rem] font-[600] ${isDayTime ? 'text-slate-900' : 'text-white'}`}>Future-Proof Differentiation</h4>
                                <p className={`mt-2 text-[0.82em] leading-6 ${isDayTime ? 'text-slate-600' : 'text-slate-400'}`}>A strategic iOS investment creates a resilient product backbone ready for spatial computing, private on-device AI, seamless device orchestration, and post-quantum cryptography pathways.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Who is involved — Expert iOS development teams */}
            <section id={'involved'}
                     className={`relative lg:pt-28 pt-12 lg:pb-28 pb-12 px-4 sm:px-6 lg:px-[4.6em] w-full max-w-full ${isDayTime ? 'text-slate-900' : 'text-white'}`}>
                <div className="relative max-w-[96em] mx-auto">
                    <div className="flex items-center gap-4 mb-8">
                        <span
                            className={`inline-block w-1.5 h-1.5 rounded-full ${isDayTime ? 'bg-gradient-to-br from-sky-400 to-cyan-400' : 'bg-gradient-to-br from-teal-400 to-blue-500'}`}></span>
                        <h6 className={`uppercase tracking-widest text-xs font-semibold ${isDayTime ? 'text-slate-500' : 'text-slate-300'}`}>Expert Team</h6>
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
                                    iOS app development is a specialized, collaborative process that demands expertise across mobile architecture, native frameworks, and Apple's evolving ecosystem. At Grey InfoTech, our cross-functional teams work in tight synchronization to deliver premium applications. A dedicated project manager coordinates priorities, timelines, and client feedback, while our skilled iOS developers architect robust, performant applications using Swift and modern frameworks. Our UI/UX designers craft interfaces that align with Human Interface Guidelines, ensuring intuitive navigation and visual polish.
                                </p>

                                <p className='text-[0.92em] font-[400] mt-4 text-justify leading-[1.6]'>
                                    Quality assurance specialists rigorously test across iOS versions and device models, while DevOps engineers manage deployment pipelines, App Store submissions, and continuous monitoring. Security-focused engineers integrate encryption, authentication, and privacy controls throughout development. The entire engagement is guided by your strategic vision, ensuring the final product maximizes user retention, monetization potential, and competitive positioning in the App Store.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    {
                                        role: 'iOS Architect',
                                        desc: 'Defines app structure, performance targets, and technical roadmap'
                                    },
                                    {
                                        role: 'Project Manager',
                                        desc: 'Coordinates delivery, client sync, and milestone tracking'
                                    },
                                    {
                                        role: 'UI/UX Designers',
                                        desc: 'HIG-aligned design, accessibility, interactive prototypes'
                                    },
                                    {role: 'iOS Engineers', desc: 'Swift implementation, native APIs, performance optimization'},
                                ].map((r, i) => (
                                    <div key={r.role}>
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
                                    </div>
                                ))}
                            </div>

                            <div className="mt-4">
                                <Link href='/contact'>
                                    <button
                                        className='relative inline-flex items-center justify-start overflow-hidden group w-fit text-[0.85em]  border tracking-tighter  rounded-full py-2 px-6'>
                                <span
                                    className={`w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 ${isDayTime ? 'bg-black' : 'bg-white'} opacity-[3%]`}></span>
                                        <span
                                            className={`absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 ${isDayTime ? 'bg-black' : 'bg-white'} opacity-100 group-hover:-translate-x-8`}></span>
                                        <span
                                            className={`relative w-full text-left transition-colors duration-200 ease-in-out ${isDayTime ? 'text-black group-hover:text-gray-300' : 'text-white group-hover:text-gray-800'}`}>Work with our team <span
                                            className={`text-[1.5em] leading-[0.7]`}> →</span></span>
                                        <span
                                            className={"absolute inset-0 border-[1px] border-gray-900 ${isDayTime ? 'border-black' : 'border-white'} rounded-full"}></span>
                                    </button>
                                </Link>
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
                                        Development sprints
                                    </div>
                                </div>
                            </div>

                            {/* Right image - smaller, offset vertically */}
                            <div
                                className="flex-1 flex justify-center lg:pl-[15em] md:pl-[15em] lg:-mr-[4em] items-start pt-12">
                                <div
                                    className={`relative rounded-2xl overflow-hidden border ${isDayTime ? 'bg-white/95 border-slate-100' : 'bg-white/6 border-white/8'} shadow-xl w-full max-w-[320px]`}>
                                    <div className="absolute inset-0 pointer-events-none rounded-2xl"
                                         style={{boxShadow: isDayTime ? 'inset 0 0 40px rgba(34,211,238,0.06)' : 'inset 0 0 60px rgba(6,182,212,0.05)'}}/>
                                    <Image
                                        src="/assets/hybrid/disc.jpg"
                                        alt="Team discussion"
                                        height={700}
                                        width={320}
                                        className="w-full h-auto object-cover rounded-2xl"
                                    />
                                    <div
                                        className='absolute top-4 right-4 px-3 py-2 rounded-full backdrop-blur-md text-sm font-semibold'
                                        style={{background: isDayTime ? 'rgba(255,255,255,0.85)' : 'rgba(8,10,20,0.6)'}}>
                                        Code reviews
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

export default IosDevelopment;

