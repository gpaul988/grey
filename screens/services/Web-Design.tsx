'use client';


import React, {useEffect, useRef, useState} from 'react';
import '@/app/globals.css'
import FloatingButton from "@/components/FloatingButton";
import Image from "next/image";
import ResponsiveVideoHero from '@/components/ResponsiveVideoHero';
import Link from "next/link";
import {AiFillCaretDown, AiFillCaretUp, AiOutlineMinus, AiOutlinePlus} from "react-icons/ai";
import CountUp from "react-countup";
import {motion, useScroll, useTransform} from "framer-motion";
import {useIsDayTime} from '../../components/useIsDayTime';
import ServiceHero from '@/components/futuristic/ServiceHero';
import ServiceCapabilities from '@/components/futuristic/ServiceCapabilities';

import FuturisticServiceLayout from '@/components/futuristic/FuturisticServiceLayout';

import {FxBackground, FxChip, FxReveal, FxButton, FxHoloCard} from '@/components/futuristic/fx';

const WebDesign = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isBackgroundActive, setIsBackgroundActive] = useState(false);
    const [activeId, setActiveId] = useState<string>("");
    // x-scroller
    const targetRef = useRef<HTMLDivElement | null>(null);
    const {scrollYProgress} = useScroll({target: targetRef});
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);


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
            <FloatingButton
                className={`fixed bottom-6 right-6 transition-all z-50 duration-300 ${
                    isVisible ? 'mb-16' : 'mb-0'
                }`}
            />

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
                    poster="/assets/hero/hero.jpg"
                >
                    <source src="/assets/webd/hero.mp4" type="video/mp4"/>
                </video>

                <Image
                    src="/assets/hero/hero.jpg"
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
                                    <p>Web design is not just about aesthetics—it's about creating strategic digital assets that drive measurable business outcomes. Our design philosophy merges visual excellence, behavioral psychology, and technical precision to deliver websites that captivate users and maximize conversions.</p>
                                    <p>We employ a rigorous, data-driven design process: user research, competitive analysis, wireframing, prototyping, and iterative testing. Every pixel, interaction, and micromoment is intentional, designed to guide users toward desired actions while building trust and brand affinity.</p>
                                    <div className="flex flex-wrap gap-3 mt-4">
                                        {['Visual Strategy', 'UX Research', 'Interaction Design', 'Brand Expression'].map((p) => (
                                            <span key={p} className="gx-data-pill">{p}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <p>Whether launching a startup, rebranding an established business, or scaling eCommerce operations, we deliver responsive, accessible designs optimized for all devices and user scenarios. We ensure performance targets are met—fast load times, smooth interactions, optimal Core Web Vitals—because user experience directly impacts SEO rankings and conversion rates.</p>
                                    <p>Our end-to-end approach spans discovery consultation, strategic planning, UX/UI design system creation, front-end implementation, deployment, and ongoing optimization. We partner collaboratively with your team, providing transparent communication, regular reviews, and strategic recommendations—focused on delivering long-term value and sustainable growth.</p>
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

            {/*f Top Image*/}
            <div id={'top'}
                 className={'relative lg:max-w-full w-full py-16 mx-auto h-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em]'}>
                <div className={'relative grid lg:grid-cols-2 h-auto md:grid-cols-2 grid-cols-1 gap-6'}>
                    <div>
                        <Image
                            src={'/assets/wd/2.jpg'}
                            alt={'design1'}
                            width={800}
                            height={700}
                        />
                    </div>
                    <div>
                        <Image
                            src={'/assets/wd/1.jpg'}
                            alt={'design 2'}
                            width={800}
                            height={700}
                        />
                    </div>
                </div>
            </div>

            {/* Our Laravel Application Development Service */}
            <div className={`lg:pt-[2em]  ${isDayTime ? 'bg-white' : 'bg-black'}`}>
                <div id={'react-development'}
                     className={'relative lg:py-[3em] py-[1em] lg:my-[3em] my-[1em] max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]'}>
                    <div
                        className={`relative mb-8 border-b-[1px] lg:pb-[4em] pb-[2em] ${isDayTime ? 'text-black' : 'text-white'}`}>
                        <h2 className={`lg:text-[3em] text-[1.5em] font-[500] justify-center tracking-tight lg:pr-[1em] leading-[1.1]`}>
                            Our Web Design Services
                        </h2>
                    </div>
                    <div
                        className='grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-16 lg:mt-28 md:mt-28 mt-6 px-6 max-w-full w-full mx-auto h-full'>
                        <div
                            className='lg:sticky md:sticky top-28 lg:h-screen md:h-screen lg:mr-[12em] overflow-hidden'>
                            <h3 className={`text-[1.5em] font-[500] constant-text ${
                                isDayTime ? 'text-black' : 'text-white'
                            }`}>
                                Our Services
                            </h3>
                            <ul className={`list-disc constant-text text-[0.873em] ml-4 font-[300] relative space-y-1 ${
                                isDayTime ? 'text-black decoration-gray-600 focus:decoration-gray-900' : 'text-white decoration-gray-300 focus:decoration-gray-100'
                            }`}>
                                {[
                                    {id: "01", title: "Bespoke Web Design Service", target: "BWDS"},
                                    {id: "02", title: "Content Managed Website", target: "CMW"},
                                    {id: "03", title: "Responsive Web Design", target: "RWD"},
                                    {id: "04", title: "Mobile-First Website", target: "MFW"},
                                    {id: "05", title: "Website User Experience (UX)", target: "WSUE"},
                                    {id: "06", title: "Website User Journeys", target: "WSUJ"},
                                ].map((item, index) => (
                                    <li key={index} className={'group lg:mt-6 md:mt-6 mt-4'}>
                                        <button
                                            onClick={() => scrollToSection(item.target)}
                                            className={`w-full text-left flex items-center gap-4 mb-2 focus:font-[650] ${
                                                isDayTime
                                                    ? `focus:text-black ${activeId === item.target ? 'text-gray-900 font-[650]' : 'text-gray-500 font-[300]'}`
                                                    : `focus:text-white ${activeId === item.target ? 'text-gray-100 font-[650]' : 'text-gray-400 font-[300]'}`
                                            }`}
                                        >
                                            <div className={'flex gap-4'}>
                                                <span className={'shrink-0'}>{item.id}</span>
                                                <span
                                                    className={`opacity-0 transition-opacity text-[2em] leading-[0.59em] ${activeId === item.target ? 'opacity-100' : ''}`}>→</span>
                                                <span>{item.title}</span>
                                            </div>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className={'lg:-ml-[8em] md:-ml-[8em] lg:mb-[17em] md:mb-[17em]'}>
                            <div className="grid lg:grid-cols-[50px_auto] grid-cols-1 lg:gap-2 gap1 items-start">
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>01/
                                </div>
                                <div className={`lg:mb-44 mb-14  ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'BWDS'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        Bespoke Web Design Services
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Custom applications</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Digital transformation</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>User experience</span>
                                    </div>

                                    <p className={'text-justify leading-[1.6] text-[0.95em] font-[300] mb-4'}>
                                        Every bespoke engagement begins with a business-first discovery: stakeholder
                                        interviews, analytics review, and competitive benchmarking. Outputs include
                                        documented user personas, prioritized feature lists, and a measurable set of
                                        success metrics (KPIs) tied to revenue, conversion, and engagement goals.
                                    </p>

                                    <ul className="list-disc pl-5 text-[0.9em] font-[300] leading-[1.6] mb-4">
                                        <li><strong>Deliverables:</strong> discovery report, interactive prototypes,
                                            UI design system, accessible component library, implementation-ready
                                            design tokens, and handoff documentation for engineers.</li>
                                        <li><strong>Performance targets:</strong> initial Lighthouse score ≥ 90,
                                            TTFB &lt; 300ms, Core Web Vitals in recommended thresholds.</li>
                                        <li><strong>Security & compliance:</strong> secure asset delivery, CSP
                                            recommendations, and accessibility baseline (WCAG AA) by default.</li>
                                    </ul>

                                    <p className={'text-justify leading-[1.6] text-[0.9em] font-[300]'}>
                                        Typical engagement: 6–12 weeks for an MVP website; larger platforms are
                                        scoped per-feature. Team mix: product manager, UX lead, UI designer, frontend
                                        engineer, and QA. Acceptance criteria: signed-off design system, working
                                        prototype validated with 5+ user tests, and automated visual regression
                                        checks passing on CI.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>02/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'CMW'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        Content-Managed Websites (CMS)
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>WordPress / Headless CMS</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Editor UX</span>
                                    </div>

                                    <p className={'text-justify leading-[1.6] text-[0.95em] font-[300] mb-4'}>
                                        Implement a CMS tailored to your editorial workflow: choice of traditional
                                        (WordPress) or headless architecture (Strapi, Sanity). We design editor
                                        interfaces, content models, and role-based permissions to enable non-technical
                                        teams to publish rapidly while preserving content quality and structure.
                                    </p>

                                    <ul className="list-disc pl-5 text-[0.9em] font-[300] leading-[1.6] mb-4">
                                        <li><strong>Deliverables:</strong> content model, editor mockups, custom
                                            blocks/components, migration plan (if applicable), and training docs.</li>
                                        <li><strong>Operational targets:</strong> CMS admin load time &lt; 1s for key
                                            pages; media CDN configured; backup & restore tested weekly.</li>
                                        <li><strong>Acceptance:</strong> content editors can create, preview, and
                                            publish pages without developer support; editorial workflows documented.
                                        </li>
                                    </ul>

                                    <p className={'text-justify leading-[1.6] text-[0.9em] font-[300]'}>
                                        Typical engagement: 3–6 weeks for a standard CMS implementation. Optional
                                        additions include editorial automation, scheduled publishing, SEO templates,
                                        and multilingual setups. Post-launch training and a 30-day editorial support
                                        window are included by default.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>03/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'RWD'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>Responsive Web Design</h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Adaptive layouts</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Touch-friendly UI</span>
                                    </div>

                                    <p className={'text-justify leading-[1.6] text-[0.95em] font-[300] mb-4'}>
                                        Responsive design adapts UI, content priority and interactions to different
                                        viewports and input types. Our process includes breakpoint strategy, fluid
                                        typography, component responsiveness and accessibility checks to ensure a
                                        cohesive experience across devices.
                                    </p>

                                    <ul className="list-disc pl-5 text-[0.9em] font-[300] leading-[1.6] mb-4">
                                        <li><strong>Deliverables:</strong> responsive pattern library, pixel-accurate
                                            breakpoints, adaptive assets (SVGs/2x images), and QA checklist.</li>
                                        <li><strong>KPIs:</strong> median FCP &lt; 1.5s on mobile, CLS &lt; 0.1,
                                            mobile conversion rate uplift target defined per project.</li>
                                        <li><strong>Acceptance:</strong> cross-device visual parity, keyboard/
                                            screen-reader support validated, and end-to-end interaction tests passing.
                                        </li>
                                    </ul>

                                    <p className={'text-justify leading-[1.6] text-[0.9em] font-[300]'}>
                                        Timeline: 2–5 weeks for core responsive implementation; integrate with CMS
                                        or front-end frameworks as required. We provide regression tests to prevent
                                        regressions during iterative releases.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>04/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'MFW'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>Mobile-First Websites</h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Progressive enhancement</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Core Web Vitals</span>
                                    </div>

                                    <p className={'text-justify leading-[1.6] text-[0.95em] font-[300] mb-4'}>
                                        Mobile-first design starts by optimising the smallest screens and progressively
                                        enhancing features for larger devices. This ensures fast, reliable experiences
                                        where they matter most and reduces unnecessary complexity on constrained devices.
                                    </p>

                                    <ul className="list-disc pl-5 text-[0.9em] font-[300] leading-[1.6] mb-4">
                                        <li><strong>Deliverables:</strong> mobile interaction patterns, touch-optimised
                                            components, image delivery strategy (responsive images & lazy-loading), and
                                            mobile performance benchmarks.</li>
                                        <li><strong>KPIs:</strong> mobile LCP &lt; 2.5s, FID &lt; 100ms, mobile bounce
                                            rate reduction targets defined per campaign.</li>
                                        <li><strong>Acceptance:</strong> mobile usability testing with representative
                                            devices and networks; objective performance thresholds met in Lighthouse
                                            and real-user monitoring (RUM).</li>
                                    </ul>

                                    <p className={'text-justify leading-[1.6] text-[0.9em] font-[300]'}>
                                        Typical timescale: 2–6 weeks depending on scope. For eCommerce and complex
                                        apps, we include mobile device labs and real-user monitoring during the
                                        beta phase to validate experience under real network conditions.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>05/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'WSUE'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>Website User Experience (UX)</h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Behavioural research</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Usability testing</span>
                                    </div>

                                    <p className={'text-justify leading-[1.6] text-[0.95em] font-[300] mb-4'}>
                                        UX is a strategic discipline: we run user interviews, task analysis and
                                        heuristic reviews to surface the key friction points. Insights feed into wireframes
                                        and prototypes which are validated through moderated usability tests and
                                        unmoderated RUM analysis.
                                    </p>

                                    <ul className="list-disc pl-5 text-[0.9em] font-[300] leading-[1.6] mb-4">
                                        <li><strong>Deliverables:</strong> persona report, task flows, low & high-fidelity
                                            prototypes, usability test artifacts and prioritized backlog.</li>
                                        <li><strong>Acceptance:</strong> usability success rate &gt; 80% on core tasks,
                                            observed time-on-task within target thresholds, and reduced error rates in
                                            prototype tests.</li>
                                        <li><strong>Tools:</strong> Figma for design, Maze or UserTesting for validation,
                                            and Google Analytics / Hotjar for behaviour analytics.</li>
                                    </ul>

                                    <p className={'text-justify leading-[1.6] text-[0.9em] font-[300]'}>
                                        UX engagements typically last 3–6 weeks for an MVP; longer discovery phases
                                        (8–12 weeks) can be used for enterprise transformation projects.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>06/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'WSUJ'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>Website User Journeys</h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>User journeys</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Funnel optimisation</span>
                                    </div>

                                    <p className={'text-justify leading-[1.6] text-[0.95em] font-[300] mb-4'}>
                                        Mapping user journeys reveals the decision points and drop-off moments that
                                        influence conversion. We combine analytics, session replays and customer
                                        interviews to produce prioritized journey maps that inform design and content
                                        strategy.
                                    </p>

                                    <ul className="list-disc pl-5 text-[0.9em] font-[300] leading-[1.6] mb-4">
                                        <li><strong>Deliverables:</strong> journey maps, conversion funnel analysis,
                                            content strategy aligned to funnel stages, and experiment backlog.</li>
                                        <li><strong>KPIs:</strong> conversion rate lift, drop-off rate reduction, and
                                            average order value (for commerce projects) improvement targets.</li>
                                        <li><strong>Acceptance:</strong> conversion experiments defined and A/B test
                                            readiness achieved; measurement dashboards in place for ongoing optimisation.
                                        </li>
                                    </ul>

                                    <p className={'text-justify leading-[1.6] text-[0.9em] font-[300]'}>
                                        Typical sprint: 2–4 weeks to produce initial journey artifacts and test
                                        hypotheses; ongoing optimisation is continuous and data-driven.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* mid Image */}
            <div id={'mid'}
                 className={'relative lg:-mt-[28em] md:-mt-[28em] lg:max-w-full w-full py-16 mx-auto h-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em]'}>
                <div className={'relative grid lg:grid-cols-2 h-auto md:grid-cols-2 grid-cols-1 gap-6'}>
                    <div>
                        <Image
                            src={'/assets/wd/4.jpg'}
                            alt={'design1'}
                            width={800}
                            height={700}
                        />
                    </div>
                    <div>
                        <Image
                            src={'/assets/wd/3.jpg'}
                            alt={'design 2'}
                            width={800}
                            height={700}
                        />
                    </div>
                </div>
            </div>

            {/* Web Hosting */}
            <div
                className={`relative max-w-full w-full mx-auto px-4 sm:px-6 lg:px-[4.6em] lg:py-14 py-8 mt-14`}>
                <div
                    className={`relative grid lg:grid-cols-2 grid-cols-1 gap-10 mb-8 ${isDayTime ? 'text-black' : 'text-white'} `}>
                    <div className={'lg:mr-[8em]'}>
                        <h2 className={`lg:text-[3em] md:text-[3em] text-[1.5em] font-[500] justify-center tracking-tight lg:pr-[1em] lg:mb-12 mb-7 leading-[1.2]`}>
                            Web Hosting</h2>
                        <p className={'text-{0.8em] font-[200] leading-[1.2] tracking-normal text-justify'}>
                            We provides scalable, business-ready hosting solutions designed to support
                            companies of all sizes—from startups to large enterprises. Our offerings range from
                            affordable entry-level plans to high-performance, enterprise-grade infrastructure with
                            features like load balancing and high availability. Each solution is built for reliability,
                            security, and performance, ensuring your digital operations run smoothly while aligning with
                            your business objectives.
                        </p>
                    </div>
                    <div
                        className={`lg:-ml-5 md:-ml-5 border-t pt-4 relative mx-auto max-w-full w-full space-y-2 ${isDayTime ? 'text-black' : 'text-white'}`}>
                        <div
                            className={`w-full border-b pb-4`}>
                            <button
                                onClick={() => toggleWeb(0)}
                                className="flex items-center justify-between w-full text-start lg:text-[1.5em] md:text-[1.5em] sm:text-base font-[500] focus:outline-none"
                            >
                                <span>Content Delivery Network (CDN)</span>
                                {webIndex === 0 ? (
                                    <AiFillCaretUp
                                        className={`lg:text-[1.5em] text-[1em]`}/>
                                ) : (
                                    <AiFillCaretDown
                                        className={`lg:text-[1.5em] text-[1em]`}/>
                                )}
                            </button>
                            {webIndex === 0 && (
                                <div className="mt-4 text-[0.93em] text-justify tracking-normal leading-[1.6] text-gray-400">
                                    <p>
                                        A Content Delivery Network (CDN) is a core component of modern web
                                        performance strategy. We design CDN configurations that minimise latency,
                                        reduce origin load, and provide consistent performance for global audiences.
                                    </p>

                                    <ul className="list-disc pl-5 mt-3">
                                        <li><strong>Deliverables:</strong> edge caching rules, cache-control policy,
                                            image & asset optimisation pipeline, signed URLs for private assets, and
                                            automated cache invalidation strategy.</li>
                                        <li><strong>SLOs:</strong> 95th percentile asset latency &lt; 200ms for target
                                            regions; cache hit ratio &gt; 85% for static assets.</li>
                                        <li><strong>Operational notes:</strong> origin shielding, HTTP/2 &/or HTTP/3,
                                            Brotli compression, and automated purge hooks integrated into CI/CD.
                                        </li>
                                    </ul>

                                    <p className="mt-3">Typical rollout: 1–2 weeks for configuration and testing;
                                        we validate with synthetic tests and RUM to ensure real-user performance
                                        gains.</p>
                                </div>
                            )}
                        </div>
                        <div
                            className={`w-full border-b pb-4`}>
                            <button
                                onClick={() => toggleWeb(1)}
                                className="flex items-center justify-between w-full text-start lg:text-[1.5em] md:text-[1.5em] sm:text-base font-[500] focus:outline-none"
                            >
                                <span>Website Performance</span>
                                {webIndex === 1 ? (
                                    <AiFillCaretUp
                                        className={`lg:text-[1.5em] text-[1em]`}/>
                                ) : (
                                    <AiFillCaretDown
                                        className={`lg:text-[1.5em] text-[1em]`}/>
                                )}
                            </button>
                            {webIndex === 1 && (
                                <div className="mt-4 text-[0.93em] text-justify tracking-normal leading-[1.6] text-gray-400">
                                    <p>
                                        Performance is a measurable business lever. Our optimisation work targets
                                        server and client-side bottlenecks to achieve predictable, repeatable
                                        improvements in speed and user engagement.
                                    </p>

                                    <ul className="list-disc pl-5 mt-3">
                                        <li><strong>Tech stack:</strong> Redis/memcache for edge caching, Nginx or
                                            managed load balancers, background job queues (BullMQ), and build-time
                                            asset optimisation (image compression, critical CSS inlining).</li>
                                        <li><strong>KPIs:</strong> LCP &lt; 2.5s, TTFB &lt; 300ms, CLS &lt; 0.1, and
                                            mobile FCP targets aligned to project goals.</li>
                                        <li><strong>Process:</strong> performance budgets defined in CI, Lighthouse
                                            gating on pull requests, and periodic RUM analysis to detect regressions.
                                        </li>
                                    </ul>

                                    <p className="mt-3">Typical effort: 1–3 sprints to implement caching,
                                        optimise critical render path, and instrument monitoring for continuous
                                        measurement.</p>
                                </div>
                            )}
                        </div>
                        <div
                            className={`w-full border-b pb-4`}>
                            <button
                                onClick={() => toggleWeb(2)}
                                className="flex items-center justify-between w-full text-start lg:text-[1.5em] md:text-[1.5em] sm:text-base font-[500] focus:outline-none"
                            >
                                <span>Website Monitoring</span>
                                {webIndex === 2 ? (
                                    <AiFillCaretUp
                                        className={`lg:text-[1.5em] text-[1em]`}/>
                                ) : (
                                    <AiFillCaretDown
                                        className={`lg:text-[1.5em] text-[1em]`}/>
                                )}
                            </button>
                            {webIndex === 2 && (
                                <div className="mt-4 text-[0.93em] text-justify tracking-normal leading-[1.6] text-gray-400">
                                    <p>
                                        Continuous monitoring ensures availability and performance. We implement
                                        layered monitoring (synthetic, uptime, and RUM) to detect incidents and inform
                                        capacity planning.
                                    </p>

                                    <ul className="list-disc pl-5 mt-3">
                                        <li><strong>Deliverables:</strong> uptime alerting, synthetic checklists,
                                            RUM instrumentation, error aggregations, and runbooks for common incidents.</li>
                                        <li><strong>SLOs:</strong> 99.9% uptime target (or higher for enterprise plans);
                                            alerting thresholds tuned to reduce noise while maintaining responsiveness.
                                        </li>
                                        <li><strong>On-call:</strong> optional 24/7 on-call rotations and escalation
                                            paths; SLA-backed response times available for premium plans.</li>
                                    </ul>

                                    <p className="mt-3">Monitoring rollout typically accompanies deployment and is
                                        validated against synthetic tests and failover drills.</p>
                                </div>
                            )}
                        </div>
                        <div
                            className={`w-full border-b pb-4`}>
                            <button
                                onClick={() => toggleWeb(3)}
                                className="flex items-center justify-between w-full text-start lg:text-[1.5em] md:text-[1.5em] sm:text-base font-[500] focus:outline-none"
                            >
                                <span>Website Security</span>
                                {webIndex === 3 ? (
                                    <AiFillCaretUp
                                        className={`lg:text-[1.5em] text-[1em]`}/>
                                ) : (
                                    <AiFillCaretDown
                                        className={`lg:text-[1.5em] text-[1em]`}/>
                                )}
                            </button>
                            {webIndex === 3 && (
                                <div className="mt-4 text-[0.93em] text-justify tracking-normal leading-[1.6] text-gray-400">
                                    <p>
                                        Security is non-negotiable. We design defense-in-depth strategies combining
                                        hardened infrastructure, secure development practices, and continuous testing.
                                    </p>

                                    <ul className="list-disc pl-5 mt-3">
                                        <li><strong>Controls:</strong> WAF, regular dependency and OS patching,
                                            automated container/image scanning, and MFA for administrative access.</li>
                                        <li><strong>Process:</strong> periodic vulnerability scans, scheduled pentests
                                            for sensitive applications, and secure CI/CD pipelines with secrets
                                            management.</li>
                                        <li><strong>Compliance:</strong> GDPR-ready data handling patterns and optional
                                            PCI or SOC guidance for organisations with regulated data.
                                        </li>
                                    </ul>

                                    <p className="mt-3">We also produce an actionable security checklist and
                                        remediation roadmap after initial assessment to reduce exposure quickly.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Trusted Digital Partners */}
            <div className={`${isDayTime ? 'bg-gray-500' : 'bg-gray-950'}`}>
                <div
                    className={`relative py-16 lg:mb-10 mb-10 max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]  ${
                        isDayTime ? 'text-black' : 'text-white'
                    }`}>
                    <h1 className={'lg:text-5em] md:text-[4em] sm:text-[3em] text-[2em] font-[600] leading-[1.1]  mb-[0.6em]'}>
                        Your trusted <br className={'lg:block md:block hidden'}/>digital partner
                    </h1>
                    <p className={'text-[0.873em] font-[300] leading-[1.5] text-justify lg:pr-[33em] mb-10'}>
                        We specialize in crafting high-impact marketing websites, innovative web apps, and mobile
                        applications that drive real results. From funded startups to established businesses, we&#39;ve
                        helped a wide range of clients bring their digital products to life—delivering standout
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
                    <div
                        className={`grid lg:grid-cols-5 md:grid-cols-5 sm:grid-cols-3 grid-cols-1 text-center lg:mt-[3em] py-12 divide-x divide-gray-300 ${
                            isDayTime ? 'text-black' : 'text-white'
                        }`}
                        id={'countup'}
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

            {/* Why Web Design */}
            <div className={`lg:-mt-[3em] md:-mt-[3em] ${isDayTime ? 'bg-black text-white' : 'bg-white text-black'}`}>
                <div
                    className='relative grid lg:grid-cols-2 grid-cols-1 lg:my-[3em] my-[1em] lg:gap-14 gap-6 lg:pt-20 pt-6 lg:pb-16 pb-6 lg:max-w-full w-full mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em]'>
                    <div className=''>
                        <h6 className='constant-text uppercase lg:text-[0.85em] md:text-[0.85em] leading-[1.3] text-[0.8em] lg:font-[600] font-[600] lg:tracking-wider tracking-tight'>
                            Design That Drives <br className={'lg:block md:block hidden'}/>Engagement and Growth
                        </h6>
                    </div>
                    <div className='lg:-ml-[19em]'>
                        <h3 className='lg:text-[3em] md:text-[3em] text-[1.8em] font-[500] lg:mt-[0.01em] lg:leading-[1.1] tracking-tight border-b lg:pb-[0.7em] lg:mb-[0.7em] leading-[1.1] pb-6'>
                            Why Web Design?
                        </h3>
                        <div
                            className='grid lg:grid-cols-2 grid-cols-1 gap-6 mt-4 font-[300] text-justify text-[0.873em] tracking-normal leading-[1.5]'>
                            <div>
                                <p>
                                    In today’s competitive digital landscape, web design is more than visual appeal—it
                                    is a core business asset. Your website often serves as the first and most lasting
                                    impression of your brand. A well-designed site communicates professionalism,
                                    credibility, and trust, all of which directly impact your ability to convert
                                    visitors into customers. Strategic web design combines user experience (UX),
                                    responsive layout, speed optimization, and strong branding to create an engaging
                                    online presence that supports your business goals. Whether you&#39;re a startup,
                                    enterprise, or growing brand, a high-performing website can help you attract new
                                    customers, showcase your offerings, and differentiate your business in crowded
                                    markets.
                                </p>
                            </div>
                            <div>
                                <p>
                                    From a business perspective, professional web design is a powerful driver of growth.
                                    It directly supports your digital marketing efforts—improving search engine
                                    rankings, lowering bounce rates, and increasing time-on-site. A strong web presence
                                    also enhances customer service through features like chatbots, easy navigation, and
                                    clear contact paths. Moreover, a custom-designed website allows for seamless
                                    integration with backend systems like CRMs, analytics tools, and marketing
                                    automation, streamlining operations and driving better decision-making. Investing in
                                    quality web design isn’t just a branding choice—it’s a strategic move to improve
                                    customer engagement, increase ROI, and future-proof your digital growth.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Website support and maintenance */}
            <div
                className={`relative lg:pt-[4em] md:pt-[4em] pt-[2em] lg:pb-[5em] md:pb-[5em] pb-[2em] max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>
                <div
                    className={'relative grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:gap-[6em] gap-4 h-auto'}>
                    <div
                        className={'relative w-full max-w-full h-auto lg:pr-[11.2em] md:pr-[11.2em] mb-4'}>
                        <Image
                            src={'/assets/wd/wsm.jpg'}
                            alt={'Website support and maintenance'}
                            width={4650}
                            height={500}
                        />
                    </div>
                    <div
                        className={`lg:-ml-[10.5em] md:-ml-[10.5em] lg:mr-[8em] md:mr-[8em] lg:mt-[4em] md:mt-[4em] ${isDayTime ? 'text-black' : 'text-white'}`}>
                        <h2
                            className='text-[1.5em] capitalize font-[500] tracking-tight leading-[1.1] mb-10 mr-[2em] md:text-[2em] lg:text-[3em] w-auto h-auto md:mr-[2.5em] lg:mr-[3.5em]'>
                            Website support <br className={'lg:block md:block hidden'}/>and maintenance
                        </h2>
                        <p className='text-[0.85em] font-[300] tracking-normal text-justify leading-[1.5] '>
                            Our commitment to your success doesn’t end at launch. We offer a range of
                            tailored support and maintenance packages designed to ensure your website continues to
                            perform reliably, securely, and efficiently. From technical troubleshooting and bug fixes to
                            software updates and system monitoring, our team is available via phone or ticketing system
                            to respond promptly to your evolving needs. We also provide additional training to help your
                            team manage and update the site with confidence.<br/><br/>
                            Ongoing maintenance is essential to keeping your digital presence competitive and secure.
                            Our proactive approach includes regular security patches, performance optimisations, and
                            compatibility updates to safeguard your investment and minimise downtime. By partnering with
                            us for long-term support, you can focus on growing your business while we handle the
                            technical upkeep of your website.
                        </p>
                    </div>
                </div>
            </div>

            {/* Last image*/}
            <div id={'last-image'} className={'h-auto max-w-full w-full mx-auto'}>
                <Image
                    className={' object-fill'}
                    src={'/assets/wd/last.jpg'}
                    alt={'Last Image'}
                    width={1536}
                    height={900}
                    style={{
                        objectFit: "fill",
                        objectPosition: "center",
                    }}
                />
            </div>

            {/* Who is involved in the process */}
            <div id={'involved'}
                 className={`relative lg:pt-[5em] md:pt-[5em] pt-[2em] lg:pb-[5em] md:pb-[5em] pb-[2em] px-4 sm:px-6 lg:px-[4.6em] w-full max-w-full lg:mb-10 mb-8 ${
                     isDayTime ? 'text-black' : 'text-white'}`}>
                <div
                    className={`relative grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-6 lg:max-w-full mx-auto`}>
                    <div className={'lg:mr-[8em]'}>
                        <h2 className='lg:text-[3em] md:text-[3em] capitalize text-[1.5em] font-[500] tracking-tighter leading-[1.15] lg:pb-6 '>
                            who is involved <br className={'lg:block md:block hidden'}/>in the process
                        </h2>
                        <p className='text-[0.85em] font-[400] lg:-mt-[0.2em] md:-mt-[0.2em] text-justify  leading-[1.5]'>
                            Web design is a collaborative process that brings together creative and technical experts to
                            build a website that supports your business objectives and speaks to your
                            audience—regardless of industry. At the core of the team is a project manager who
                            coordinates timelines, client feedback, and overall direction. UI/UX designers shape the
                            look, feel, and usability of the website to ensure a smooth and engaging user experience
                            across all devices.<br/><br/>
                            Complementing this are front-end and back-end developers who turn design concepts into a
                            fully functional website, optimizing performance, responsiveness, and integration with other
                            systems. Depending on the project, content creators, SEO specialists, and quality assurance
                            testers may also be involved to ensure the website communicates clearly, ranks well, and
                            runs smoothly. The entire process is guided by your input, ensuring the final product is
                            aligned with your brand, goals, and customer needs.
                        </p><br/>
                        <Link href='/company'>
                            <button
                                className='relative mx-auto inline-flex items-center justify-start overflow-hidden group w-fit text-[0.85em]  border tracking-tighter  rounded-full py-2 px-6'>
                        <span
                            className={`w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 ${isDayTime ? 'bg-black' : 'bg-white'} opacity-[3%]`}></span>
                                <span
                                    className={`absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 ${isDayTime ? 'bg-black' : 'bg-white'} opacity-100 group-hover:-translate-x-8`}></span>
                                <span
                                    className={`relative w-full text-left transition-colors duration-200 ease-in-out ${isDayTime ? 'text-black group-hover:text-gray-300' : 'text-white group-hover:text-gray-800'}`}>About Us <span
                                    className={`text-[1.5em] leading-[0.7]`}> →</span></span>
                                <span
                                    className={"absolute inset-0 border-[1px] border-gray-900 ${isDayTime ? 'border-black' : 'border-white'} rounded-full"}></span>
                            </button>
                        </Link>
                    </div>
                    <div
                        className="relative flex flex-row lg:-ml-[2em] md:-ml-[2em] w-full h-auto max-w-full mx-auto gap-6">
                        <div className="flex-1 flex lg:-mr-[17.5em] md:-mr-[17.5em] justify-center items-center">
                            <div className="flex-1 flex justify-center h-auto items-center">
                                <Image
                                    src="/assets/hybrid/trip.jpg"
                                    alt="Team at table"
                                    width={900} // Add width
                                    height={600} // Add height
                                    style={{
                                        objectFit: "fill",
                                        objectPosition: "center",
                                    }}
                                    className="object-fill"
                                />
                            </div>
                        </div>
                        <div
                            className="flex-1 flex justify-center lg:-my-[20em] md:-my-[20em] lg:pl-[15em] md:pl-[15em] lg:-mr-[4em] items-center">
                            <Image
                                src="/assets/hybrid/disc.jpg"
                                alt="Team at table"
                                height={700}
                                width={220}
                                style={{
                                    objectFit: "fill",
                                    objectPosition: "center",
                                }}
                                className="object-fill"
                            />
                        </div>
                    </div>
                </div>
            </div>


            {/* Stages of our development process */}
            <div className={`${isDayTime ? 'bg-white' : 'bg-black'}`}>
                <div id={'development process'}
                     className={`lg:mt-[4em] md:mt-[4em] mt-[1.5em] relative lg:mb-[4em] md:mb-[4em] mb-[1.5em] max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>

                    {/* Development Process Header */}
                    <div className={`sticky top-0 z-10 bg-opacity-90 backdrop-blur-md ${
                        isDayTime ? 'bg-white text-black' : 'bg-black text-white'
                    }`}>
                        <div className="border-b-[0.1em] border-gray-300/50 pb-[2em]">
                            <h2 className='text-[1em] sm:text-[1.5em] md:text-[2em] lg:text-[3em] font-[550] tracking-normal leading-[1.15] lg:pb-6'>
                                Stages Of Our <br className={'lg:block md:block hidden'}/>Development Process
                            </h2>
                            <p className={'text-[0.87em] font-[300] leading-[1.5] tracking-tight'}>
                                We don’t just build functional products—we craft digital experiences that captivate
                                users and drive meaningful results for your business.
                            </p>
                        </div>
                    </div>

                    {/* X-Scroll */}
                    <section ref={targetRef} className="h-[250vh]">
                        <div
                            className="sticky top-52 flex h-[80vh] w-full max-w-full items-center overflow-hidden">
                            <motion.div
                                style={{x}}
                                className="flex lg:gap-[15em] md:gap-[15em] gap-[10em]" // Add padding for centering
                            >
                                {[
                                    {
                                        id: 1,
                                        subtitle: "01",
                                        title: (
                                            <>
                                                Discovery & Strategy
                                            </>
                                        ),
                                        description: (
                                            <>
                                                We begin by understanding your business, target audience, and goals.
                                                This forms the foundation for a strategy that aligns your website with
                                                your brand and objectives.
                                            </>
                                        ),
                                    },
                                    {
                                        id: 2,
                                        subtitle: "02",
                                        title: "Planning & Architecture",
                                        description: (
                                            <>
                                                We create a clear roadmap—defining the site structure, user journeys,
                                                and key features. Wireframes and sitemaps guide the user experience and
                                                functionality.
                                            </>
                                        ),
                                    },
                                    {
                                        id: 3,
                                        subtitle: "03",
                                        title: "Design & Branding",
                                        description: (
                                            <>
                                                Our design team brings your vision to life with custom UI/UX that
                                                reflects your brand, engages users, and ensures consistency across all
                                                devices.
                                            </>
                                        ),
                                    },
                                    {
                                        id: 4,
                                        subtitle: "04",
                                        title: (
                                            <>
                                                Development
                                            </>
                                        ),
                                        description: (
                                            <>
                                                Using modern, scalable technologies, we build responsive,
                                                high-performance websites with clean code and robust back-end systems.
                                            </>
                                        ),
                                    },
                                    {
                                        id: 5,
                                        subtitle: "05",
                                        title: (
                                            <>
                                                Testing & Quality Assurance
                                            </>
                                        ),
                                        description: (
                                            <>
                                                Before launch, we conduct thorough testing across browsers and devices,
                                                ensuring speed, security, and a seamless user experience.
                                            </>
                                        ),
                                    },
                                    {
                                        id: 6,
                                        subtitle: "06",
                                        title: (
                                            <>
                                                Launch & Optimization
                                            </>
                                        ),
                                        description: (
                                            <>
                                                Once approved, we deploy your site with minimal disruption. Post-launch,
                                                we monitor performance and offer ongoing support and enhancements.
                                            </>
                                        ),
                                    },
                                ].map((card, index, array) => (
                                    <div
                                        key={card.id}
                                        className={`group relative h-[350px] w-[400px] overflow-hidden flex flex-col items-start justify-self-start text-start ${
                                            isDayTime ? 'text-black' : 'text-white'
                                        } ${index === array.length - 1 ? 'ml-auto' : ''}`} // Ensure last item aligns
                                    >
                                        <h3 className="text-[1em] font-[400] text-gray-500">{card.subtitle}</h3>
                                        <h2 className="sm:text-[1.5em] md:text-[2.5em] lg:text-[2.5em] font-[500] mt-4 leading-[1.1]">{card.title}</h2>
                                        <p className="text-[0.873em] font-[300] mt-4 text-justify">{card.description}</p>
                                    </div>
                                ))}
                            </motion.div>
                        </div>
                    </section>
                </div>
            </div>


            {/* NLast image*/}
            <div id={'nlast-image'} className={'h-auto max-w-full w-full mx-auto'}>
                <Image
                    className={' object-fill'}
                    src={'/assets/wd/nlast.jpg'}
                    alt={'NLast Image'}
                    width={1536}
                    height={900}
                    style={{
                        objectFit: "fill",
                        objectPosition: "center",
                    }}
                />
            </div>


            {/* Futuristic Capabilities Section */}
            <ServiceCapabilities
                heading="Our web design capabilities"
                subheading="Capabilities"
                accentColor="#00f5d4"
                variant="terminal"
                ctaHref="/contact"
                ctaLabel="Discuss your project"
                capabilities={[
                    {
                        id: 'ux-design',
                        title: 'UX-First Design',
                        description: 'We design experiences around your users — not just aesthetics. Every layout decision is backed by user research, heatmaps, and conversion psychology.',
                        points: ['User journey mapping', 'Wireframing & prototyping', 'A/B test-ready layouts', 'Accessibility (WCAG 2.1)'],
                    },
                    {
                        id: 'web-dev',
                        title: 'High-Performance Dev',
                        description: 'Clean, semantic code built for speed. We target Core Web Vitals scores in the green — because performance is a conversion tool.',
                        points: ['Next.js / React', 'Sub-2s load times', 'Mobile-first responsive', 'CDN-optimized'],
                    },
                    {
                        id: 'seo-ready',
                        title: 'SEO Architecture',
                        description: 'Built to rank from day one. Technical SEO, semantic HTML, schema markup, and content structure that search engines love.',
                        points: ['Technical SEO audit', 'Schema markup', 'Core Web Vitals', 'sitemap & robots.txt'],
                    },
                    {
                        id: 'cms',
                        title: 'CMS Integration',
                        description: 'Own your content. We build with headless CMS platforms so your team can update pages without touching code.',
                        points: ['Contentful / Sanity', 'WordPress headless', 'Custom admin panels', 'Media management'],
                    },
                    {
                        id: 'ecommerce',
                        title: 'E-Commerce',
                        description: 'Conversion-focused storefronts built to sell. From product pages to checkout — every touchpoint is optimized.',
                        points: ['Shopify / WooCommerce', 'Custom cart flows', 'Payment gateway integration', 'Inventory management'],
                    },
                    {
                        id: 'analytics',
                        title: 'Analytics & Optimization',
                        description: 'We track, measure, and improve. Every site we build includes full analytics setup so you can make data-driven decisions from day one.',
                        points: ['GA4 / Mixpanel setup', 'Heatmap integration', 'Conversion funnel tracking', 'Monthly reporting'],
                    },
                ]}
            />
        </div>
    );
};

export default WebDesign;