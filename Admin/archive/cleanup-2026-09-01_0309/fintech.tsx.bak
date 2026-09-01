'use client';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import Image from "next/image";
import Link from "next/link";
import CountUp from "react-countup";
import {AnimatePresence, motion} from "framer-motion";
import {useIsDayTime} from '../../components/useIsDayTime';

import {
    FxBackground,
    FxChip,
    FxReveal,
    FxStickyScrollSection,
    FxButton,
    FxHoloCard,
    FxFrame
} from '@/components/futuristic/fx';
import {FinTechSolutionsSection} from '@/components/FinTechSolutionsSection';
import FinTechProcessesSection from '@/components/futuristic/FinTechProcessesSection';

const reasons = [
    {
        id: 1,
        title: 'Experienced Team',
        description: (
            <>
                Our deep industry expertise allows us to understand your specific business landscape, anticipate
                challenges, and craft solutions that align with your goals. We don’t just build software -we build
                strategic tools tailored to your operations, ensuring they solve real problems and drive measurable
                results.
            </>
        ),
        images: ['/assets/fin/grey.jpg']
    },
    {
        id: 2,
        title: 'Transparency at Every Step',
        description: (
            <>
                What truly sets us apart is our steadfast commitment to transparency. We believe in complete honesty and
                accountability throughout the development process -keeping you informed every step of the way. From
                clear
                communication to early visual and technical insights, we ensure you&#39;re always in control and
                confident
                in the direction of your project.
            </>
        ),
        images: ['/assets/fin/grey1.jpg']
    },
    {
        id: 3,
        title: 'Communication & Collaboration',
        description: (
            <>
                We believe strong communication and seamless collaboration are critical to every project&#39;s success.
                That’s why we prioritize clear, consistent updates and foster a transparent workflow -keeping all
                stakeholders aligned, informed, and engaged from start to finish.
            </>
        ),
        images: ['/assets/fin/grey2.jpg']
    },
    {
        id: 4,
        title: 'Scalability of Services',
        description: (
            <>
                Scalability plays a pivotal role in FinTech development by allowing platforms to efficiently handle
                increased user loads, expanding datasets, and evolving market requirements without compromising
                performance. A well-architected, scalable solution not only supports business growth but also builds
                long-term resilience and strengthens client relationships through consistent, high-quality service
                delivery.
            </>
        ),
        images: ['/assets/fin/grey.jpg']
    },
];

const Fintech = () => {
    const [, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);
    const pageAccentStyle = {
        ['--page-accent' as string]: '#38bdf8',
        ['--page-accent-rgb' as string]: '56, 189, 248',
    } as React.CSSProperties;
    const [isBackgroundActive, setIsBackgroundActive] = useState(false);
    const [activeId, setActiveId] = useState<string>("");
    const [activeIndex, setActiveIndex] = useState(1);

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
            "PDW",
            "BC",
            "WM",
            "IM",
            "CFTA",
            "AIS",
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

    // Why Grey InfoTech for your app project 
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prevIndex) => (prevIndex + 1) % reasons.length);
        }, 5000); // 5000ms = 5 seconds
        return () => clearInterval(interval);
    }, []);

    // Our Discovery Process Hook

    const imageIds = useMemo<string[]>(() => [
        "The Digital Phase",
        "Dedicated FinTech Engineers",
        "Security & Regulatory Compliance",
        "DevOps",
        "Quality Assurance",
        "Product Development",
    ], []);

    useEffect(() => {
        const handleScrollStages = () => {
            for (const imageId of imageIds) {
                const textElement = document.getElementById(imageId);
                const imageElement = document.getElementById(imageId);

                if (textElement && imageElement) {
                    const textRect = textElement.getBoundingClientRect();
                    const screenCenter = window.innerHeight / 2;

                    if (textRect.top <= screenCenter && textRect.bottom >= screenCenter) {
                        setActiveId(imageId);
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScrollStages);
        return () => {
            window.removeEventListener("scroll", handleScrollStages);
        };
    }, [imageIds]);

    // Countup hook for Digital partners
    const stats = [
        {label: 'Years Experience', value: 8, suffix: '+'},
        {label: 'Team Members', value: 10, suffix: '+'},
        {label: 'Products Launched', value: 150, suffix: '+'},
        {label: 'Successful rebrands', value: 27, suffix: '+'},
        {label: 'Increase in Website Traffic', value: 350, suffix: '%'},
    ];

    // Partners Section hook
    return (
        <div className={`${isDayTime ? 'bg-sky-50 text-slate-900' : 'bg-slate-950 text-slate-100'} min-h-screen`}
             style={pageAccentStyle}>

            {/* Hero Section */}
            <section className="relative overflow-hidden lg:w-full lg:min-h-[90vh] lg:h-[720px] w-full h-[600px]">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="hidden lg:block absolute inset-0 w-full h-full object-cover"
                    poster="/assets/fin/ux.jpg"
                    onError={(event) => {
                        const target = event.currentTarget;
                        target.style.display = 'none';
                    }}
                >
                    <source src="/assets/fin/fin-hero.mp4" type="video/mp4"/>
                    <source src="/assets/fin/fin-hero.webm" type="video/webm"/>
                </video>

                <Image
                    src="/assets/fin/ux.jpg"
                    alt="Fintech hero"
                    fill
                    priority
                    className="block lg:hidden object-cover"
                />

                <div className="pointer-events-none absolute inset-0 z-[1]">
                    <FxBackground day={isDayTime} grid={true} aurora={true}/>
                </div>

                <div
                    className={`absolute inset-0 z-[2] ${isDayTime ? 'bg-gradient-to-r from-sky-50/90 via-slate-100/85 to-sky-50/80' : 'bg-gradient-to-r from-sky-950/85 via-slate-900/70 to-sky-950/50'}`}/>
                <div
                    className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(var(--page-accent-rgb),0.16),transparent_50%)] z-[2]"/>

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
                                <div className={`w-2.5 h-2.5 rounded-full animate-pulse ${isDayTime ? 'bg-cyan-500' : 'bg-[var(--page-accent)]'}`}/>
                                <span
                                    className={`text-[0.7em] lg:text-[0.82em] uppercase tracking-[0.22em] font-[600] ${isDayTime ? 'text-cyan-600' : 'text-[var(--page-accent)]'}`}>FinTech</span>
                            </div>

                            <h1 className={`text-[2em] lg:text-[4.4em] font-[700] leading-[1.08] tracking-tight mb-6 lg:mb-8 ${isDayTime ? 'text-slate-900' : 'text-white'}`}>
                                Build Secure, <span className="gx-gradient-text">Future-Ready</span> Financial Products
                            </h1>

                            <p className={`text-[0.85em] lg:text-[1.08em] leading-[1.65] mb-8 lg:mb-10 font-[300] ${isDayTime ? 'text-slate-700' : 'text-white/70'}`}>
                                We design and develop fintech platforms that balance trust, performance, compliance, and
                                user delight—powering everything from digital wallets to regulated lending ecosystems.
                            </p>

                            <div className="flex flex-wrap gap-2 mb-10 lg:mb-12">
                                {['Payments', 'Digital Banking', 'Compliance', 'Risk Intelligence', 'Embedded Finance'].map((badge) => (
                                    <span key={badge}
                                          className={`px-3 py-1.5 rounded-full text-[0.7em] lg:text-[0.75em] font-[600] uppercase tracking-wider ${isDayTime ? 'bg-blue-100 border border-blue-300 text-blue-700' : 'bg-teal-400/10 border border-teal-400/30 text-teal-300'}`}>
                                        {badge}
                                    </span>
                                ))}
                            </div>

                            <div className="flex flex-wrap gap-4 items-center">
                                <Link href="/contact">
                                    <button
                                        className={`relative px-8 py-3 rounded-full text-[0.85em] lg:text-[0.88em] font-bold overflow-hidden hover:shadow-lg transition-shadow duration-300 whitespace-nowrap ${isDayTime ? 'bg-cyan-500 text-white hover:bg-cyan-600' : 'bg-teal-400/90 text-black hover:bg-teal-400'}`}>
                                        <span className="absolute inset-0"
                                              style={{background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)'}}/>
                                        <span className="relative">Start a project →</span>
                                    </button>
                                </Link>
                                <Link href="/portfolio">
                                    <button
                                        className={`px-8 py-3 rounded-full text-[0.85em] lg:text-[0.88em] font-semibold transition-all duration-300 whitespace-nowrap ${isDayTime ? 'text-slate-700 border border-slate-300 hover:bg-slate-100' : 'text-white/70 border border-white/15 hover:text-white hover:bg-white/10'}`}>
                                        View Case Studies
                                    </button>
                                </Link>
                            </div>
                        </div>

                        <div className="hidden lg:flex flex-col items-end">
                            <div className="grid grid-cols-2 gap-6 w-full">
                                {[
                                    {label: 'Products Launched', value: '123+'},
                                    {label: 'Years Experience', value: '8+'},
                                    {label: 'Compliance Focus', value: '100%'},
                                    {label: 'Avg Uplift', value: '300%'}
                                ].map((stat) => (
                                    <div key={stat.label}
                                         className={`px-6 py-5 rounded-2xl transition-all duration-300 text-right ${isDayTime ? 'border border-blue-200 bg-blue-50 hover:bg-blue-100 hover:border-blue-300' : 'border border-teal-400/25 bg-teal-400/8 backdrop-blur-md hover:bg-teal-400/12 hover:border-teal-400/50'}`}>
                                        <div
                                            className={`text-[0.7em] uppercase tracking-wider font-[600] mb-2 ${isDayTime ? 'text-blue-600' : 'text-teal-300'}`}>{stat.label}</div>
                                        <div className={`text-[1.8em] font-[700] ${isDayTime ? 'text-slate-900' : 'text-white'}`}>{stat.value}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:hidden absolute bottom-12 left-0 right-0 z-[11] px-6">
                    <div className="grid grid-cols-3 gap-3">
                        {[
                            {label: 'Products', value: '123+'},
                            {label: 'Experience', value: '8+'},
                            {label: 'Uplift', value: '300%'}
                        ].map((stat) => (
                            <div key={stat.label}
                                 className={`px-3 py-2 rounded-xl ${isDayTime ? 'border border-blue-200 bg-blue-50' : 'border border-teal-400/25 bg-teal-400/8 backdrop-blur-md'}`}>
                                <div
                                    className={`text-[0.5em] uppercase tracking-wider font-[600] mb-1 ${isDayTime ? 'text-blue-600' : 'text-teal-300'}`}>{stat.label}</div>
                                <div className={`text-[1.2em] font-[700] ${isDayTime ? 'text-slate-900' : 'text-white'}`}>{stat.value}</div>
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
                        <FxChip day={!isBackgroundActive ? !isDayTime : isDayTime}>Innovative Fintech tools designed <br
                            className="hidden md:block lg:block"/>to elevate your business</FxChip>
                    </div>

                    <div className="lg:-ml-[19em]">
                        <FxReveal>
                            <h3 className="lg:text-[3.5em] md:text-[3em] text-[2em] font-[700] tracking-tight leading-[1.15] mt-4">
                                Secure Fintech Products, <span
                                className="gx-gradient-text">Built for Growth</span>
                            </h3>
                        </FxReveal>

                        <FxReveal delay={0.08}>
                            <div
                                className="grid lg:grid-cols-2 grid-cols-1 gap-6 mt-6 font-[300] text-justify text-[0.95em] md:text-[1.05em] leading-relaxed">
                                <div className="space-y-4">
                                    <p>Fintech experiences demand more than attractive interfaces—they require secure
                                        foundations, compliant workflows, and carefully engineered systems that perform
                                        under pressure. At Grey InfoTech, we design and build financial products that
                                        earn trust from the first interaction onward.</p>
                                    <p>Our team combines product strategy, modern architecture, and specialized
                                        engineering to create digital banking, payments, and lending solutions that stay
                                        dependable as they scale. Every experience is crafted to feel intuitive,
                                        responsive, and reassuring.</p>
                                    <div className="flex flex-wrap gap-3 mt-4">
                                        {['Secure Architecture', 'Payment Infrastructure', 'Compliance Alignment', 'Scalable Platforms'].map((p) => (
                                            <span key={p} className="gx-data-pill">{p}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <p>Whether you are launching a digital wallet, modernizing core systems, or building
                                        a regulated finance platform, we deliver solutions that balance speed,
                                        resilience, and user confidence. We focus on seamless integrations, secure
                                        operations, and thoughtful product delivery at every stage.</p>
                                    <p>From discovery and design to implementation and optimization, we partner with
                                        your team to build products that are not only functional but also positioned for
                                        long-term growth and market leadership.</p>
                                    <div className="flex flex-wrap gap-3 mt-4">
                                        {['Risk-Aware UX', 'Real-Time Integrations', 'Data-Driven Delivery', 'Enterprise Readiness'].map((p) => (
                                            <span key={p} className="gx-data-pill">{p}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </FxReveal>
                    </div>
                </div>
            </section>

            {/* Premium showcase */}
            <section className={`${isDayTime ? 'bg-white' : 'bg-black'} py-12 lg:py-20`}>
                <div id={'top'}
                     className={'relative mx-auto h-auto w-full max-w-[100em] px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em]'}>
                    <div
                        className={`relative overflow-hidden rounded-[2.2rem] border ${isDayTime ? 'border-white/10 bg-white/5' : 'border-black/10 bg-black/5'} p-4 sm:p-6 lg:p-8 backdrop-blur-xl`}>
                        <div
                            className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(45,212,191,0.14),transparent_30%),linear-gradient(135deg,rgba(255,255,255,0.05),rgba(2,6,23,0.94))]"/>
                        <div className="absolute inset-0 border border-white/10 rounded-[2.2rem] pointer-events-none"/>
                        <div
                            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal-400/70 to-transparent"/>

                        <div className="relative z-10 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
                            <div className="group relative overflow-hidden rounded-[1.6rem] border border-white/10">
                                <Image
                                    src={'/assets/fin/app.jpg'}
                                    alt={'Fintech application interface showcase'}
                                    width={1396}
                                    height={1440}
                                    className="h-[360px] w-full object-cover transition-transform duration-700 group-hover:scale-105 sm:h-[440px] lg:h-[560px]"
                                />
                                <div
                                    className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(2,6,23,0.16)_45%,rgba(2,6,23,0.92)_100%)]"/>
                                <div
                                    className="absolute left-4 top-4 rounded-full border border-teal-400/30 bg-black/30 px-3 py-1 text-[0.62em] uppercase tracking-[0.3em] text-teal-300">
                                    01 / Product Experience
                                </div>
                                <div className="absolute bottom-5 left-5 right-5">
                                    <p className="text-[0.62em] uppercase tracking-[0.3em] text-teal-300 font-[600]">Digital
                                        product surfaces</p>
                                    <p className={`mt-2 max-w-xl text-sm sm:text-base ${isDayTime ? 'text-white/90' : 'text-white/90'}`}>Elegant,
                                        high-trust interfaces tailored for modern fintech users and regulated
                                        operations.</p>
                                </div>
                            </div>

                            <div className="grid gap-6">
                                <div className="group relative overflow-hidden rounded-[1.6rem] border border-white/10">
                                    <Image
                                        src={'/assets/fin/hand.jpg'}
                                        alt={'Fintech hand interaction showcase'}
                                        width={1396}
                                        height={1440}
                                        className="h-[220px] w-full object-cover transition-transform duration-700 group-hover:scale-105 sm:h-[260px] lg:h-[270px]"
                                    />
                                    <div
                                        className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(2,6,23,0.16)_50%,rgba(2,6,23,0.82)_100%)]"/>
                                    <div
                                        className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/20 px-3 py-1 text-[0.56em] uppercase tracking-[0.28em] text-teal-200">
                                        02 / Interaction Design
                                    </div>
                                </div>

                                <div
                                    className={`rounded-[1.6rem] border ${isDayTime ? 'border-black/10 bg-white/70' : 'border-white/10 bg-slate-900/60'} p-6 sm:p-7 backdrop-blur-md`}>
                                    <p className="text-[0.66em] uppercase tracking-[0.32em] text-teal-300">Executive
                                        Vision</p>
                                    <h3 className={`mt-3 text-[1.35em] sm:text-[1.6em] font-[700] leading-[1.1] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        Premium fintech experiences blend clarity, compliance, and conversion.
                                    </h3>
                                    <p className={`mt-4 text-[0.9em] leading-[1.75] ${isDayTime ? 'text-white/70' : 'text-black/70'}`}>
                                        Our visual systems are designed to feel refined and trustworthy while staying
                                        optimized for performance, accessibility, and growth-ready product strategy.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Fintech Development Solutions - Unified Futuristic Section */}
            <div id="node-development" className="w-full">
                <FinTechSolutionsSection isDayTime={isDayTime} activeId={activeId} onNavClickAction={scrollToSection}/>
            </div>

            {/* Design, UI and UX - Digital Adventure Style */}
            <div className={`relative lg:py-32 py-16 ${isDayTime ? 'bg-white text-black' : 'bg-black text-white'}`}>
                {/* Grid background */}
                <div className="pointer-events-none absolute inset-0" style={{
                    backgroundImage: `linear-gradient(${isDayTime ? 'rgba(45,212,191,0.06)' : 'rgba(13,148,136,0.07)'} 1px, transparent 1px), linear-gradient(90deg, ${isDayTime ? 'rgba(45,212,191,0.06)' : 'rgba(13,148,136,0.07)'} 1px, transparent 1px)`,
                    backgroundSize: '44px 44px',
                }}/>

                {/* Aurora blobs */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -left-32 w-[600px] h-[600px] rounded-full opacity-20"
                         style={{background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)'}}/>
                    <div className="absolute -bottom-32 -right-24 w-[480px] h-[480px] rounded-full opacity-10"
                         style={{background: 'radial-gradient(circle, #0891b2 0%, transparent 70%)'}}/>
                </div>

                <div className="relative z-10 max-w-[90em] mx-auto px-6 sm:px-8 lg:px-[4.6em]">
                    <FxReveal>
                        <div className="flex items-center gap-5 mb-14">
                            <FxChip day={isDayTime}>DESIGN EXPERTISE</FxChip>
                            <div className={`flex-1 h-px ${isDayTime ? 'bg-black/10' : 'bg-white/10'}`}/>
                            <span
                                className={`font-mono text-[0.7em] tracking-widest ${isDayTime ? 'text-black/30' : 'text-white/30'}`}>CREATIVE EXCELLENCE</span>
                        </div>
                    </FxReveal>

                    <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                        <FxReveal className="lg:order-2">
                            <div className="relative">
                                <div
                                    className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-cyan-400 rounded-tl-sm z-10"/>
                                <div
                                    className="absolute -top-3 -right-3 w-8 h-8 border-t-2 border-r-2 border-cyan-400 rounded-tr-sm z-10"/>
                                <div
                                    className="absolute -bottom-3 -left-3 w-8 h-8 border-b-2 border-l-2 border-cyan-400 rounded-bl-sm z-10"/>
                                <div
                                    className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-cyan-400 rounded-br-sm z-10"/>
                                <div className="absolute inset-0 rounded-2xl opacity-40"
                                     style={{boxShadow: '0 0 60px -10px rgba(6,182,212,0.5)'}}/>
                                <div className="relative overflow-hidden rounded-2xl">
                                    <Image src={'/assets/fin/ux.jpg'} alt={'Design, UI and UX'}
                                           width={900}
                                           height={520} className="w-full object-cover rounded-2xl"/>
                                    <div className="absolute inset-0 pointer-events-none"
                                         style={{background: 'linear-gradient(135deg, rgba(6,182,212,0.12) 0%, transparent 60%)'}}/>
                                    <div className="absolute inset-0 pointer-events-none"
                                         style={{backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(6,182,212,0.03) 3px, rgba(6,182,212,0.03) 4px)'}}/>
                                    <motion.div initial={{opacity: 0, y: 10}} whileInView={{opacity: 1, y: 0}}
                                                viewport={{once: true}} transition={{delay: 0.4}}
                                                className="absolute bottom-5 left-5 px-4 py-2 rounded-full backdrop-blur-md text-[0.72em] font-semibold tracking-wider text-cyan-300"
                                                style={{
                                                    background: 'rgba(0,0,0,0.65)',
                                                    border: '1px solid rgba(6,182,212,0.35)'
                                                }}>
                                        - User Research · Prototyping · Implementation
                                    </motion.div>
                                </div>
                                <motion.div initial={{opacity: 0, x: 20}} whileInView={{opacity: 1, x: 0}}
                                            viewport={{once: true}}
                                            transition={{delay: 0.5, type: 'spring', stiffness: 120}}
                                            className="absolute -right-6 top-10 hidden lg:block">
                                    <div className="rounded-2xl px-5 py-4 backdrop-blur-xl text-center min-w-[110px]"
                                         style={{
                                             background: isDayTime ? 'rgba(15,15,15,0.85)' : 'rgba(255,255,255,0.85)',
                                             border: '1px solid rgba(6,182,212,0.35)'
                                         }}>
                                        <div className="text-[2em] font-[900] text-cyan-400 leading-none">Designed</div>
                                        <div
                                            className={`text-[0.65em] font-[600] tracking-widest mt-1 uppercase ${isDayTime ? 'text-black/60' : 'text-white/60'}`}>For
                                            You
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </FxReveal>

                        <div>
                            <FxReveal delay={0.1}>
                                <h2 className="text-[2.6em] lg:text-[3.4em] font-[700] leading-[1.1] tracking-tight mb-8">Design,<br/>
                                    <span className="gx-gradient-text">UI and UX</span><br/><span
                                        className={`text-[0.65em] font-[300] ${isDayTime ? 'text-black/50' : 'text-white/50'}`}>Creating Digital Experiences.</span>
                                </h2>
                            </FxReveal>
                            <FxReveal delay={0.18}>
                                <p className={`text-[0.95em] leading-[1.8] mb-6 ${isDayTime ? 'text-black/75' : 'text-white/70'}`}>
                                    Our UI/UX design services are crafted to simplify complex financial products through
                                    intuitive, user-centric interfaces that enhance usability and engagement. We
                                    transform dense financial data into clear, actionable visuals and interactive
                                    dashboards that support smarter, faster decision-making.</p>
                            </FxReveal>
                            <FxReveal delay={0.24}>
                                <p className={`text-[0.95em] leading-[1.8] mb-10 pb-10 border-b ${isDayTime ? 'text-black/75 border-black/10' : 'text-white/70 border-white/10'}`}>
                                    Our approach combines strategic design thinking with powerful tools like Figma and
                                    Sketch to deliver high-fidelity prototypes. From user research to wireframing and
                                    testing, we ensure every touchpoint delivers a seamless, responsive experience that
                                    drives customer satisfaction and builds trust.</p>
                            </FxReveal>
                            <FxReveal delay={0.3}>
                                <div
                                    className="flex flex-wrap gap-3 mb-10">{['User Research', 'Prototyping', 'Design Systems', 'Accessibility'].map(i => (
                                    <span key={i}
                                          className={`px-4 py-1.5 rounded-full text-[0.75em] font-[600] tracking-wide border ${isDayTime ? 'border-cyan-700/30 text-cyan-700 bg-cyan-700/06' : 'border-cyan-400/30 text-cyan-300 bg-cyan-500/08'}`}>{i}</span>
                                ))}
                                </div>
                            </FxReveal>
                            <FxReveal delay={0.36}>
                                <p className={`text-[0.88em] font-[400] mb-6 ${isDayTime ? 'text-black/60' : 'text-white/60'}`}>Ready
                                    to transform your financial product with exceptional design?</p>
                                <Link href="/services/ui-ux-design">
                                    <FxButton day={!isDayTime} variant="solid">View Our Work <span
                                        className="text-[1.2em] leading-none ml-1">→</span></FxButton>
                                </Link>
                            </FxReveal>
                        </div>
                    </div>
                </div>
            </div>

            {/* Fintech Innovation Showcase */}
            <div id={'mid-image-showcase'}
                 className={`relative w-full h-auto py-16 lg:py-24 ${isDayTime ? 'bg-gray-50' : 'bg-black'} border-b ${isDayTime ? 'border-gray-200' : 'border-cyan-900/30'}`}>
                <FxBackground day={isDayTime} grid={true} aurora={true}/>

                <div
                    className="relative z-10 max-w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]">
                    {/* Section Header */}
                    <div className="mb-12 lg:mb-16">
                        <FxReveal>
                            <div className="flex items-center gap-3 mb-4">
                                <FxChip day={isDayTime}>INNOVATION</FxChip>
                                <div className={`w-8 h-px ${isDayTime ? 'bg-gray-300' : 'bg-cyan-500/50'}`}/>
                            </div>
                        </FxReveal>
                        <FxReveal>
                            <h2 className={`text-3xl lg:text-5xl font-[600] tracking-tight mb-4 ${isDayTime ? 'text-gray-900' : 'text-white'}`}>
                                Digital Financial Transformation
                            </h2>
                        </FxReveal>
                        <FxReveal>
                            <p className={`text-base lg:text-lg max-w-2xl leading-relaxed ${isDayTime ? 'text-gray-600' : 'text-cyan-100/80'}`}>
                                Experience cutting-edge FinTech solutions powered by advanced algorithms, real-time
                                analytics, and blockchain-secured transactions. Our platform seamlessly integrates with
                                your existing infrastructure.
                            </p>
                        </FxReveal>
                    </div>

                    {/* Main Showcase Grid */}
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 lg:gap-8 mb-8">
                        {/* Primary Image with Frame */}
                        <div className="lg:col-span-2 relative group">
                            <FxReveal>
                                <FxFrame className="overflow-hidden">
                                    <div
                                        className="relative h-80 lg:h-96 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 overflow-hidden">
                                        <Image
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            src={'/assets/fin/mid.jpg'}
                                            alt="FinTech Innovation Platform"
                                            width={2560}
                                            height={1440}
                                            priority
                                            style={{
                                                objectFit: "cover",
                                                objectPosition: "center",
                                            }}
                                        />
                                        {/* Overlay gradient */}
                                        <div
                                            className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"/>
                                    </div>
                                </FxFrame>
                            </FxReveal>

                            {/* Corner accent */}
                            <div
                                className="absolute -top-2 -right-2 w-16 h-16 border-t-2 border-r-2 border-cyan-500/50 pointer-events-none"/>
                            <div
                                className="absolute -bottom-2 -left-2 w-16 h-16 border-b-2 border-l-2 border-cyan-500/50 pointer-events-none"/>
                        </div>

                        {/* Info Cards Stack */}
                        <div className="flex flex-col gap-6">
                            <FxReveal>
                                <FxHoloCard day={isDayTime} className="p-6 flex flex-col justify-between h-full">
                                    <div>
                                        <div
                                            className={`text-3xl font-[700] mb-2 ${isDayTime ? 'text-cyan-600' : 'text-cyan-400'}`}>
                                            99.9%
                                        </div>
                                        <h3 className={`text-sm font-[600] uppercase tracking-wider mb-2 ${isDayTime ? 'text-gray-700' : 'text-cyan-300'}`}>
                                            Uptime
                                        </h3>
                                        <p className={`text-xs leading-relaxed ${isDayTime ? 'text-gray-600' : 'text-cyan-100/70'}`}>
                                            Enterprise-grade reliability with redundant systems
                                        </p>
                                    </div>
                                </FxHoloCard>
                            </FxReveal>

                            <FxReveal>
                                <FxHoloCard day={isDayTime} className="p-6 flex flex-col justify-between h-full">
                                    <div>
                                        <div
                                            className={`text-3xl font-[700] mb-2 ${isDayTime ? 'text-cyan-600' : 'text-cyan-400'}`}>
                                            &lt;50ms
                                        </div>
                                        <h3 className={`text-sm font-[600] uppercase tracking-wider mb-2 ${isDayTime ? 'text-gray-700' : 'text-cyan-300'}`}>
                                            Latency
                                        </h3>
                                        <p className={`text-xs leading-relaxed ${isDayTime ? 'text-gray-600' : 'text-cyan-100/70'}`}>
                                            Lightning-fast transaction processing
                                        </p>
                                    </div>
                                </FxHoloCard>
                            </FxReveal>
                        </div>
                    </div>

                    {/* Tech Stack Showcase */}
                    <FxReveal>
                        <div
                            className={`grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-lg border ${isDayTime ? 'bg-white border-gray-200' : 'bg-gray-900/50 border-cyan-500/20'} backdrop-blur-sm`}>
                            <div className="text-center">
                                <div
                                    className={`text-2xl font-[700] mb-1 ${isDayTime ? 'text-cyan-600' : 'text-cyan-400'}`}>
                                    AI
                                </div>
                                <p className={`text-xs ${isDayTime ? 'text-gray-600' : 'text-cyan-100/70'}`}>Predictive
                                    Analytics</p>
                            </div>
                            <div className="text-center">
                                <div
                                    className={`text-2xl font-[700] mb-1 ${isDayTime ? 'text-cyan-600' : 'text-cyan-400'}`}>
                                    ⛓️
                                </div>
                                <p className={`text-xs ${isDayTime ? 'text-gray-600' : 'text-cyan-100/70'}`}>Blockchain</p>
                            </div>
                            <div className="text-center">
                                <div
                                    className={`text-2xl font-[700] mb-1 ${isDayTime ? 'text-cyan-600' : 'text-cyan-400'}`}>
                                    🔐
                                </div>
                                <p className={`text-xs ${isDayTime ? 'text-gray-600' : 'text-cyan-100/70'}`}>Security</p>
                            </div>
                            <div className="text-center">
                                <div
                                    className={`text-2xl font-[700] mb-1 ${isDayTime ? 'text-cyan-600' : 'text-cyan-400'}`}>
                                    ⚡
                                </div>
                                <p className={`text-xs ${isDayTime ? 'text-gray-600' : 'text-cyan-100/70'}`}>Real-time</p>
                            </div>
                        </div>
                    </FxReveal>
                </div>
            </div>

            {/* Data Science - Digital Adventure Style */}
            <div className={`relative lg:py-32 py-16 ${isDayTime ? 'bg-white text-black' : 'bg-black text-white'}`}>
                {/* Grid background */}
                <div className="pointer-events-none absolute inset-0" style={{
                    backgroundImage: `linear-gradient(${isDayTime ? 'rgba(45,212,191,0.06)' : 'rgba(13,148,136,0.07)'} 1px, transparent 1px), linear-gradient(90deg, ${isDayTime ? 'rgba(45,212,191,0.06)' : 'rgba(13,148,136,0.07)'} 1px, transparent 1px)`,
                    backgroundSize: '44px 44px',
                }}/>

                {/* Aurora blobs */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -left-32 w-[600px] h-[600px] rounded-full opacity-20"
                         style={{background: 'radial-gradient(circle, #60a5fa 0%, transparent 70%)'}}/>
                    <div className="absolute -bottom-32 -right-24 w-[480px] h-[480px] rounded-full opacity-10"
                         style={{background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)'}}/>
                </div>

                <div className="relative z-10 max-w-[90em] mx-auto px-6 sm:px-8 lg:px-[4.6em]">
                    <FxReveal>
                        <div className="flex items-center gap-5 mb-14">
                            <FxChip day={isDayTime}>DATA INTELLIGENCE</FxChip>
                            <div className={`flex-1 h-px ${isDayTime ? 'bg-black/10' : 'bg-white/10'}`}/>
                            <span
                                className={`font-mono text-[0.7em] tracking-widest ${isDayTime ? 'text-black/30' : 'text-white/30'}`}>ANALYTICS EXPERTISE</span>
                        </div>
                    </FxReveal>

                    <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                        <FxReveal className="lg:order-2">
                            <div className="relative">
                                <div
                                    className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-blue-400 rounded-tl-sm z-10"/>
                                <div
                                    className="absolute -top-3 -right-3 w-8 h-8 border-t-2 border-r-2 border-blue-400 rounded-tr-sm z-10"/>
                                <div
                                    className="absolute -bottom-3 -left-3 w-8 h-8 border-b-2 border-l-2 border-blue-400 rounded-bl-sm z-10"/>
                                <div
                                    className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-blue-400 rounded-br-sm z-10"/>
                                <div className="absolute inset-0 rounded-2xl opacity-40"
                                     style={{boxShadow: '0 0 60px -10px rgba(59,130,246,0.5)'}}/>
                                <div className="relative overflow-hidden rounded-2xl">
                                    <Image src={'/assets/fin/data.jpg'} alt={'Data Science Analytics Dashboard'}
                                           width={900}
                                           height={520} className="w-full object-cover rounded-2xl"/>
                                    <div className="absolute inset-0 pointer-events-none"
                                         style={{background: 'linear-gradient(135deg, rgba(59,130,246,0.12) 0%, transparent 60%)'}}/>
                                    <div className="absolute inset-0 pointer-events-none"
                                         style={{backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(59,130,246,0.03) 3px, rgba(59,130,246,0.03) 4px)'}}/>
                                    <motion.div initial={{opacity: 0, y: 10}} whileInView={{opacity: 1, y: 0}}
                                                viewport={{once: true}} transition={{delay: 0.4}}
                                                className="absolute bottom-5 left-5 px-4 py-2 rounded-full backdrop-blur-md text-[0.72em] font-semibold tracking-wider text-blue-300"
                                                style={{
                                                    background: 'rgba(0,0,0,0.65)',
                                                    border: '1px solid rgba(59,130,246,0.35)'
                                                }}>
                                        - AI Analytics · Real-time Insights · Predictive Modeling
                                    </motion.div>
                                </div>
                                <motion.div initial={{opacity: 0, x: 20}} whileInView={{opacity: 1, x: 0}}
                                            viewport={{once: true}}
                                            transition={{delay: 0.5, type: 'spring', stiffness: 120}}
                                            className="absolute -right-6 top-10 hidden lg:block">
                                    <div className="rounded-2xl px-5 py-4 backdrop-blur-xl text-center min-w-[110px]"
                                         style={{
                                             background: isDayTime ? 'rgba(15,15,15,0.85)' : 'rgba(255,255,255,0.85)',
                                             border: '1px solid rgba(59,130,246,0.35)'
                                         }}>
                                        <div className="text-[2em] font-[900] text-blue-400 leading-none">Insight</div>
                                        <div
                                            className={`text-[0.65em] font-[600] tracking-widest mt-1 uppercase ${isDayTime ? 'text-black/60' : 'text-white/60'}`}>Driven
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </FxReveal>

                        <div>
                            <FxReveal delay={0.1}>
                                <h2 className="text-[2.6em] lg:text-[3.4em] font-[700] leading-[1.1] tracking-tight mb-8">Transform
                                    your data into <span
                                        className="gx-gradient-text">actionable intelligence</span><br/><span
                                        className={`text-[0.65em] font-[300] ${isDayTime ? 'text-black/50' : 'text-white/50'}`}>excellence through advanced analytics.</span>
                                </h2>
                            </FxReveal>
                            <FxReveal delay={0.18}>
                                <p className={`text-[0.95em] leading-[1.8] mb-6 ${isDayTime ? 'text-black/75' : 'text-white/70'}`}>
                                    Data science experts at Grey InfoTech specialise in transforming complex datasets
                                    into actionable insights by leveraging advanced AI and machine learning models.
                                    Using powerful tools like PowerBI, Tableau, and Google Looker Studio, we deliver
                                    real-time, data-driven intelligence that drives smarter business decisions.
                                </p>
                            </FxReveal>
                            <FxReveal delay={0.24}>
                                <p className={`text-[0.95em] leading-[1.8] mb-10 pb-10 border-b ${isDayTime ? 'text-black/75 border-black/10' : 'text-white/70 border-white/10'}`}>
                                    Our big data analytics capabilities enhance operational efficiency, optimise
                                    internal processes, and uncover growth opportunities. By identifying patterns,
                                    predicting trends, and automating analysis, our AI/ML solutions empower
                                    organisations to make informed, strategic decisions with confidence.
                                </p>
                            </FxReveal>
                            <FxReveal delay={0.3}>
                                <div
                                    className="flex flex-wrap gap-3 mb-10">{['ML Models', 'Real-time Analytics', 'Predictive AI', 'BI Tools'].map(i => (
                                    <span key={i}
                                          className={`px-4 py-1.5 rounded-full text-[0.75em] font-[600] tracking-wide border ${isDayTime ? 'border-blue-700/30 text-blue-700 bg-blue-700/06' : 'border-blue-400/30 text-blue-300 bg-blue-500/08'}`}>{i}</span>
                                ))}
                                </div>
                            </FxReveal>
                            <FxReveal delay={0.36}>
                                <p className={`text-[0.88em] font-[400] mb-6 ${isDayTime ? 'text-black/60' : 'text-white/60'}`}>Ready
                                    to unlock the full potential of your data?</p>
                                <Link href="/services/digital-marketing">
                                    <FxButton day={!isDayTime} variant="solid">Explore Data Solutions <span
                                        className="text-[1.2em] leading-none ml-1">→</span></FxButton>
                                </Link>
                            </FxReveal>
                        </div>
                    </div>

                    <FxReveal delay={0.1} y={16}>
                        <div
                            className={`mt-24 grid grid-cols-2 lg:grid-cols-4 gap-6 pt-10 border-t ${isDayTime ? 'border-black/10' : 'border-white/10'}`}>
                            {[{val: '100+', label: 'Data Projects'}, {
                                val: '15+',
                                label: 'Industries Served'
                            }, {val: '99.9%', label: 'Accuracy Rate'}, {
                                val: '500M+',
                                label: 'Data Points Analyzed'
                            }].map(s => (
                                <div key={s.label} className="text-center lg:text-left">
                                    <div
                                        className={`text-[2.2em] font-[900] leading-none mb-2 ${isDayTime ? 'text-blue-700' : 'text-blue-400'}`}>{s.val}</div>
                                    <div
                                        className={`text-[0.75em] font-[500] tracking-wider uppercase ${isDayTime ? 'text-black/50' : 'text-white/50'}`}>{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </FxReveal>
                </div>
            </div>

            <FinTechProcessesSection isDayTime={isDayTime}/>

            {/* Your Digital Journey — Digital Adventure Style */}
            <div className={`relative lg:py-32 py-16 ${isDayTime ? 'bg-white text-black' : 'bg-black text-white'}`}>
                {/* Grid background */}
                <div className="pointer-events-none absolute inset-0" style={{
                    backgroundImage: `linear-gradient(${isDayTime ? 'rgba(45,212,191,0.06)' : 'rgba(13,148,136,0.07)'} 1px, transparent 1px), linear-gradient(90deg, ${isDayTime ? 'rgba(45,212,191,0.06)' : 'rgba(13,148,136,0.07)'} 1px, transparent 1px)`,
                    backgroundSize: '44px 44px',
                }}/>

                {/* Aurora blobs */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -left-32 w-[600px] h-[600px] rounded-full opacity-20"
                         style={{background: 'radial-gradient(circle, #60a5fa 0%, transparent 70%)'}}/>
                    <div className="absolute -bottom-32 -right-24 w-[480px] h-[480px] rounded-full opacity-10"
                         style={{background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)'}}/>
                </div>

                <div className="relative z-10 max-w-[90em] mx-auto px-6 sm:px-8 lg:px-[4.6em]">
                    <FxReveal>
                        <div className="flex items-center gap-5 mb-14">
                            <FxChip day={isDayTime}>BUSINESS JOURNEY</FxChip>
                            <div className={`flex-1 h-px ${isDayTime ? 'bg-black/10' : 'bg-white/10'}`}/>
                            <span
                                className={`font-mono text-[0.7em] tracking-widest ${isDayTime ? 'text-black/30' : 'text-white/30'}`}>FINTECH TRANSFORMATION</span>
                        </div>
                    </FxReveal>

                    <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                        <FxReveal className="lg:order-first">
                            <div className="relative">
                                <div
                                    className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-blue-400 rounded-tl-sm z-10"/>
                                <div
                                    className="absolute -top-3 -right-3 w-8 h-8 border-t-2 border-r-2 border-blue-400 rounded-tr-sm z-10"/>
                                <div
                                    className="absolute -bottom-3 -left-3 w-8 h-8 border-b-2 border-l-2 border-blue-400 rounded-bl-sm z-10"/>
                                <div
                                    className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-blue-400 rounded-br-sm z-10"/>
                                <div className="absolute inset-0 rounded-2xl opacity-40"
                                     style={{boxShadow: '0 0 60px -10px rgba(59,130,246,0.5)'}}/>
                                <div className="relative overflow-hidden rounded-2xl">
                                    <Image src={'/assets/fin/journey.jpg'} alt={'Digital Journey'} width={900}
                                           height={520} className="w-full object-cover rounded-2xl"/>
                                    <div className="absolute inset-0 pointer-events-none"
                                         style={{background: 'linear-gradient(135deg, rgba(59,130,246,0.12) 0%, transparent 60%)'}}/>
                                    <div className="absolute inset-0 pointer-events-none"
                                         style={{backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(59,130,246,0.03) 3px, rgba(59,130,246,0.03) 4px)'}}/>
                                    <motion.div initial={{opacity: 0, y: 10}} whileInView={{opacity: 1, y: 0}}
                                                viewport={{once: true}} transition={{delay: 0.4}}
                                                className="absolute bottom-5 left-5 px-4 py-2 rounded-full backdrop-blur-md text-[0.72em] font-semibold tracking-wider text-blue-300"
                                                style={{
                                                    background: 'rgba(0,0,0,0.65)',
                                                    border: '1px solid rgba(59,130,246,0.35)'
                                                }}> - Product Strategy · MVPs · Scalable Systems
                                    </motion.div>
                                </div>
                                <motion.div initial={{opacity: 0, x: 20}} whileInView={{opacity: 1, x: 0}}
                                            viewport={{once: true}}
                                            transition={{delay: 0.5, type: 'spring', stiffness: 120}}
                                            className="absolute -right-6 top-10 hidden lg:block">
                                    <div className="rounded-2xl px-5 py-4 backdrop-blur-xl text-center min-w-[110px]"
                                         style={{
                                             background: isDayTime ? 'rgba(15,15,15,0.85)' : 'rgba(255,255,255,0.85)',
                                             border: '1px solid rgba(59,130,246,0.35)'
                                         }}>
                                        <div className="text-[2em] font-[900] text-blue-400 leading-none">Launch</div>
                                        <div
                                            className={`text-[0.65em] font-[600] tracking-widest mt-1 uppercase ${isDayTime ? 'text-black/60' : 'text-white/60'}`}>Faster
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </FxReveal>

                        <div className="lg:order-last">
                            <FxReveal delay={0.1}>
                                <h2 className="text-[2.6em] lg:text-[3.4em] font-[700] leading-[1.1] tracking-tight mb-8">Your
                                    Business <span className="gx-gradient-text">Digital Journey</span><br/><span
                                        className={`text-[0.65em] font-[300] ${isDayTime ? 'text-black/50' : 'text-white/50'}`}>from idea to market-ready product.</span>
                                </h2>
                            </FxReveal>
                            <FxReveal delay={0.18}>
                                <p className={`text-[0.95em] leading-[1.8] mb-6 ${isDayTime ? 'text-black/75' : 'text-white/70'}`}>Grey InfoTech helps entrepreneurs and businesses turn product concepts into scalable
                                    fintech platforms. From product strategy and MVP development to scaling and
                                    compliance, our team supports every stage of your journey.</p>
                            </FxReveal>
                            <FxReveal delay={0.24}>
                                <p className={`text-[0.95em] leading-[1.8] mb-10 pb-10 border-b ${isDayTime ? 'text-black/75 border-black/10' : 'text-white/70 border-white/10'}`}>We
                                    combine technical excellence with business insight—building products that are
                                    secure, compliant, and built for growth. Partner with us for hands-on expertise
                                    throughout your product lifecycle.</p>
                            </FxReveal>
                            <FxReveal delay={0.3}>
                                <div
                                    className="flex flex-wrap gap-3 mb-10">{['MVPs', 'Product Strategy', 'Scalability', 'Compliance'].map(i => (
                                    <span key={i}
                                          className={`px-4 py-1.5 rounded-full text-[0.75em] font-[600] tracking-wide border ${isDayTime ? 'border-blue-700/30 text-blue-700 bg-blue-700/06' : 'border-blue-400/30 text-blue-300 bg-blue-500/08'}`}>{i}</span>
                                ))}
                                </div>
                            </FxReveal>
                            <FxReveal delay={0.36}>
                                <p className={`text-[0.88em] font-[400] mb-6 ${isDayTime ? 'text-black/60' : 'text-white/60'}`}>Ready
                                    to start?</p>
                                <Link href='/contact'>
                                    <FxButton day={!isDayTime} variant="solid">Start a project <span
                                        className="text-[1.2em] leading-none ml-1">→</span></FxButton>
                                </Link>
                            </FxReveal>
                        </div>
                    </div>

                    <FxReveal delay={0.1} y={16}>
                        <div
                            className={`mt-24 grid grid-cols-2 lg:grid-cols-4 gap-6 pt-10 border-t ${isDayTime ? 'border-black/10' : 'border-white/10'}`}>
                            {[{val: '10+', label: 'Years Experience'}, {val: '200+', label: 'Projects'}, {
                                val: '99.9%',
                                label: 'Uptime'
                            }, {val: '250M+', label: 'Transactions Processed'}].map(s => (
                                <div key={s.label} className="text-center lg:text-left">
                                    <div
                                        className={`text-[2.2em] font-[900] leading-none mb-2 ${isDayTime ? 'text-blue-700' : 'text-blue-400'}`}>{s.val}</div>
                                    <div
                                        className={`text-[0.75em] font-[500] tracking-wider uppercase ${isDayTime ? 'text-black/50' : 'text-white/50'}`}>{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </FxReveal>
                </div>
            </div>

            {/* Why Grey InfoTech — Futuristic Showcase */}
            <section
                className={`relative overflow-hidden ${isDayTime ? 'bg-white text-black' : 'bg-black text-white'}`}>
                <FxBackground day={isDayTime} grid={true} aurora={true}/>

                <div
                    className="relative z-10 lg:pt-28 pt-16 lg:pb-24 pb-12 px-4 sm:px-6 lg:px-[4.6em] max-w-[100em] mx-auto">
                    <FxReveal>
                        <div className="flex items-center gap-4 mb-12">
                            <FxChip day={isDayTime}>PROVEN EXPERTISE</FxChip>
                            <div className={`flex-1 h-px ${isDayTime ? 'bg-black/10' : 'bg-white/10'}`}/>
                            <span
                                className={`font-mono text-[0.7em] tracking-widest ${isDayTime ? 'text-black/30' : 'text-white/30'}`}>EXCELLENCE DELIVERED</span>
                        </div>
                    </FxReveal>

                    <div className="grid lg:grid-cols-2 gap-16 items-start">
                        {/* Left: Reasons Cards */}
                        <FxReveal className="lg:order-1">
                            <div>
                                <h2 className='lg:text-[3.2em] text-[2em] font-[700] tracking-tight leading-[1.1] mb-2'>Why
                                    Grey InfoTech</h2>
                                <p className={`text-[0.95em] mb-8 leading-[1.7] ${isDayTime ? 'text-black/70' : 'text-white/70'}`}>
                                    Trusted expertise, proven results. We deliver tailored fintech solutions that drive
                                    real impact.
                                </p>

                                <div className="space-y-3">
                                    {reasons.map((reason, index) => (
                                        <FxReveal key={reason.id} delay={0.08 + index * 0.04}>
                                            <FxHoloCard
                                                day={isDayTime}
                                                className={`p-5 cursor-pointer transition-all duration-300 ${index + 1 === activeIndex ? 'ring-2 ring-cyan-400/40' : 'hover:ring-1 hover:ring-cyan-400/20'}`}
                                                onClick={() => setActiveIndex(index + 1)}
                                            >
                                                <div className="flex items-start gap-3">
                                                    <div
                                                        className={`text-[1.2em] font-[800] shrink-0 ${isDayTime ? 'text-cyan-600' : 'text-cyan-300'}`}>{String(index + 1).padStart(2, '0')}</div>
                                                    <div className="min-w-0">
                                                        <div
                                                            className={`font-[700] text-[1em] leading-tight mb-2 ${isDayTime ? 'text-black' : 'text-white'}`}>{reason.title}</div>
                                                        <AnimatePresence mode="wait">
                                                            {index + 1 === activeIndex && (
                                                                <motion.div
                                                                    key={reason.id}
                                                                    initial={{opacity: 0, height: 0}}
                                                                    animate={{opacity: 1, height: 'auto'}}
                                                                    exit={{opacity: 0, height: 0}}
                                                                    transition={{duration: 0.3}}
                                                                    className={`text-[0.85em] leading-[1.5] ${isDayTime ? 'text-black/70' : 'text-white/70'}`}
                                                                >
                                                                    {reason.description}
                                                                </motion.div>
                                                            )}
                                                        </AnimatePresence>
                                                    </div>
                                                </div>
                                            </FxHoloCard>
                                        </FxReveal>
                                    ))}
                                </div>
                            </div>
                        </FxReveal>

                        {/* Right: Image Panel */}
                        <FxReveal className="lg:order-2">
                            <div className="relative">
                                <FxFrame>
                                    <div
                                        className="relative w-full h-96 lg:h-[580px] bg-gradient-to-br from-cyan-600/8 to-blue-600/8 rounded-2xl overflow-hidden">
                                        <AnimatePresence mode="wait">
                                            <motion.div
                                                key={activeIndex}
                                                initial={{opacity: 0, scale: 0.97}}
                                                animate={{opacity: 1, scale: 1}}
                                                exit={{opacity: 0, scale: 0.97}}
                                                transition={{duration: 0.4}}
                                                className="absolute inset-0"
                                            >
                                                <Image
                                                    src={reasons[activeIndex - 1]?.images?.[0] || '/assets/fin/grey.jpg'}
                                                    alt={'Why Grey InfoTech'}
                                                    fill
                                                    className="object-cover"
                                                />
                                                <div className="absolute inset-0"
                                                     style={{background: isDayTime ? 'linear-gradient(135deg, rgba(6,182,212,0.08), transparent)' : 'linear-gradient(135deg, rgba(14,165,233,0.08), transparent)'}}/>
                                                <div className="absolute inset-0 pointer-events-none"
                                                     style={{backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.03) 3px, rgba(255,255,255,0.03) 4px)'}}/>
                                            </motion.div>
                                        </AnimatePresence>

                                        {/* Bottom Info Card */}
                                        <div className="absolute bottom-6 left-6 right-6">
                                            <FxHoloCard day={isDayTime} className="p-4">
                                                <div
                                                    className={`text-[0.7em] uppercase tracking-widest font-semibold mb-1 ${isDayTime ? 'text-cyan-600' : 'text-cyan-300'}`}>Current
                                                    Focus
                                                </div>
                                                <div
                                                    className={`text-[1.4em] font-[800] leading-none mb-2 ${isDayTime ? 'text-black' : 'text-white'}`}>{reasons[activeIndex - 1]?.title}</div>
                                                <div
                                                    className={`text-[0.8em] ${isDayTime ? 'text-black/60' : 'text-white/60'}`}>Enterprise-grade
                                                    solutions tailored to your needs
                                                </div>
                                            </FxHoloCard>
                                        </div>

                                        {/* Top Right Badge */}
                                        <div className="absolute top-6 right-6 hidden lg:block">
                                            <div className="rounded-2xl px-4 py-3 backdrop-blur-xl text-center" style={{
                                                background: isDayTime ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)',
                                                border: '1px solid rgba(59,130,246,0.15)'
                                            }}>
                                                <div
                                                    className={`text-[0.7em] uppercase tracking-widest font-semibold mb-1 ${isDayTime ? 'text-cyan-600' : 'text-cyan-300'}`}>Secure
                                                </div>
                                                <div
                                                    className={`text-[1.1em] font-[900] ${isDayTime ? 'text-black' : 'text-white'}`}>Compliant
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </FxFrame>
                            </div>
                        </FxReveal>
                    </div>

                    {/* Stats */}
                    <FxReveal delay={0.2} y={16}>
                        <div
                            className={`grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12 pt-12 border-t ${isDayTime ? 'border-black/10' : 'border-white/10'}`}>
                            {[{val: '8+', label: 'Years'}, {val: '25+', label: 'Projects'}, {
                                val: '99.9%',
                                label: 'Uptime'
                            }, {val: '98%', label: 'Satisfaction'}].map(s => (
                                <div key={s.label} className="text-center lg:text-left">
                                    <div
                                        className={`text-[2em] font-[900] leading-none mb-1 ${isDayTime ? 'text-cyan-600' : 'text-cyan-400'}`}>{s.val}</div>
                                    <div
                                        className={`text-[0.75em] font-[600] tracking-wider uppercase ${isDayTime ? 'text-black/50' : 'text-white/50'}`}>{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </FxReveal>

                    {/* CTA Section */}
                    <FxReveal delay={0.3}>
                        <div
                            className={`mt-16 pt-12 border-t ${isDayTime ? 'border-black/10' : 'border-white/10'} text-center`}>
                            <h3 className='lg:text-[2.4em] text-[1.5em] font-[700] tracking-tight leading-[1.2] mb-6'>Ready
                                to Transform Your Vision?</h3>
                            <p className={`text-[0.95em] max-w-2xl mx-auto mb-8 ${isDayTime ? 'text-black/70' : 'text-white/70'}`}>Partner
                                with Grey InfoTech to build secure, scalable fintech solutions that drive growth and
                                innovation.</p>
                            <Link href='/contact'>
                                <FxButton day={!isDayTime} variant="solid">Start a project <span
                                    className="ml-2">→</span></FxButton>
                            </Link>
                        </div>
                    </FxReveal>
                </div>
            </section>

            {/* Trusted Digital Partners — Futuristic */}
            <section
                className={`relative overflow-hidden ${isDayTime ? 'bg-white text-black' : 'bg-black text-white'}`}>
                <FxBackground day={isDayTime} grid={true} aurora={true}/>

                <div id={'partners'}
                     className="relative z-10 lg:py-28 py-16 px-4 sm:px-6 lg:px-[4.6em] max-w-[100em] mx-auto">
                    {/* Header */}
                    <FxReveal>
                        <div className="flex items-center gap-4 mb-16">
                            <FxChip day={isDayTime}>PARTNERSHIP EXCELLENCE</FxChip>
                            <div className={`flex-1 h-px ${isDayTime ? 'bg-black/10' : 'bg-white/10'}`}/>
                            <span
                                className={`font-mono text-[0.7em] tracking-widest ${isDayTime ? 'text-black/30' : 'text-white/30'}`}>TRUSTED SOLUTIONS</span>
                        </div>
                    </FxReveal>

                    <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
                        {/* Left: Main Message */}
                        <FxReveal>
                            <div>
                                <h1 className='lg:text-[3.4em] text-[2.2em] font-[800] tracking-tight leading-[1.1] mb-4'>
                                    Your Digital <span
                                    className={`${isDayTime ? 'text-cyan-600' : 'text-cyan-300'}`}>Transform</span> Partner
                                </h1>
                                <p className={`text-[0.95em] leading-[1.8] mb-8 ${isDayTime ? 'text-black/70' : 'text-white/70'}`}>
                                    We craft high-impact digital experiences that define industries. From startup MVPs
                                    to enterprise platforms, we deliver innovative web apps, mobile solutions, and
                                    marketing websites engineered for scale, security, and success.
                                </p>

                                <div className="space-y-4 mb-10">
                                    {[
                                        'Full-stack expertise in web & mobile',
                                        'Enterprise-grade security & compliance',
                                        'AI-powered solutions & optimization',
                                        'End-to-end product lifecycle management'
                                    ].map((item, idx) => (
                                        <FxReveal key={idx} delay={0.08 + idx * 0.04}>
                                            <div className="flex items-start gap-3">
                                                <div
                                                    className={`text-[1.2em] mt-1 shrink-0 ${isDayTime ? 'text-cyan-600' : 'text-cyan-400'}`}>✦
                                                </div>
                                                <span
                                                    className={`text-[0.9em] leading-tight ${isDayTime ? 'text-black/75' : 'text-white/75'}`}>{item}</span>
                                            </div>
                                        </FxReveal>
                                    ))}
                                </div>

                                <FxReveal delay={0.24}>
                                    <Link href='/contact'>
                                        <FxButton day={!isDayTime} variant="solid">
                                            Start Your Project <span className="ml-2">→</span>
                                        </FxButton>
                                    </Link>
                                </FxReveal>
                            </div>
                        </FxReveal>

                        {/* Right: Metrics Showcase */}
                        <FxReveal y={16} delay={0.08}>
                            <div className="relative">
                                <div
                                    className={`absolute -inset-8 rounded-3xl blur-3xl opacity-20 ${isDayTime ? 'bg-cyan-600' : 'bg-cyan-500'}`}/>
                                <FxFrame className="relative p-8 lg:p-12">
                                    <div className="grid grid-cols-2 gap-8">
                                        {stats.map((stat, index) => (
                                            <FxReveal key={index} delay={0.12 + index * 0.06}>
                                                <div className="text-center lg:text-left">
                                                    <div
                                                        className={`text-[2.4em] font-[900] leading-none mb-3 ${isDayTime ? 'text-cyan-600' : 'text-cyan-300'}`}>
                                                        <CountUp end={stat.value} duration={2.5}
                                                                 suffix={stat.suffix || ''}/>
                                                    </div>
                                                    <div
                                                        className={`text-[0.8em] font-[600] tracking-wider uppercase leading-tight ${isDayTime ? 'text-black/60' : 'text-white/60'}`}>
                                                        {stat.label}
                                                    </div>
                                                </div>
                                            </FxReveal>
                                        ))}
                                    </div>

                                    {/* Divider */}
                                    <div className={`my-8 h-px ${isDayTime ? 'bg-black/10' : 'bg-white/10'}`}/>

                                    {/* Certification Badge */}
                                    <FxReveal delay={0.3}>
                                        <div
                                            className={`p-4 rounded-2xl text-center backdrop-blur-xl ${isDayTime ? 'bg-black/5' : 'bg-white/5'}`}
                                            style={{border: `1px solid ${isDayTime ? 'rgba(6,182,212,0.2)' : 'rgba(14,165,233,0.2)'}`}}>
                                            <div
                                                className={`text-[0.65em] uppercase tracking-widest font-semibold mb-1 ${isDayTime ? 'text-cyan-600' : 'text-cyan-300'}`}>Certified
                                                Excellence
                                            </div>
                                            <div
                                                className={`text-[0.95em] font-[700] ${isDayTime ? 'text-black' : 'text-white'}`}>ISO
                                                27001 • SOC 2 • GDPR Ready
                                            </div>
                                        </div>
                                    </FxReveal>
                                </FxFrame>
                            </div>
                        </FxReveal>
                    </div>

                    {/* Service Pillars */}
                    <FxReveal delay={0.2} y={20}>
                        <div
                            className={`py-12 border-t border-b ${isDayTime ? 'border-black/10' : 'border-white/10'} mb-20`}>
                            <h3 className={`text-[1.2em] font-[700] uppercase tracking-widest mb-8 ${isDayTime ? 'text-black/50' : 'text-white/50'}`}>Our
                                Expertise</h3>
                            <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6">
                                {[
                                    {icon: '⚡', title: 'Web & Apps', desc: 'React, Next.js, Vue & beyond'},
                                    {icon: '🔐', title: 'Security', desc: 'Compliance & data protection'},
                                    {icon: '📱', title: 'Mobile', desc: 'iOS, Android, cross-platform'},
                                    {icon: '🚀', title: 'DevOps', desc: 'CI/CD, cloud infrastructure'}
                                ].map((service, idx) => (
                                    <FxReveal key={idx} delay={0.26 + idx * 0.05}>
                                        <FxHoloCard day={isDayTime} className="p-6 h-full">
                                            <div className={`text-[2em] mb-3`}>{service.icon}</div>
                                            <div
                                                className={`text-[0.95em] font-[700] mb-2 ${isDayTime ? 'text-black' : 'text-white'}`}>{service.title}</div>
                                            <div
                                                className={`text-[0.8em] ${isDayTime ? 'text-black/60' : 'text-white/60'}`}>{service.desc}</div>
                                        </FxHoloCard>
                                    </FxReveal>
                                ))}
                            </div>
                        </div>
                    </FxReveal>

                    {/* Final CTA */}
                    <FxReveal delay={0.3}>
                        <div className="text-center">
                            <h2 className={`text-[2.2em] font-[800] tracking-tight leading-[1.2] mb-6 ${isDayTime ? 'text-black' : 'text-white'}`}>
                                Ready to Build Something <span
                                className={`${isDayTime ? 'text-cyan-600' : 'text-cyan-300'}`}>Extraordinary?</span>
                            </h2>
                            <p className={`text-[0.95em] max-w-2xl mx-auto mb-8 ${isDayTime ? 'text-black/70' : 'text-white/70'}`}>
                                Let's partner to turn your vision into a digital powerhouse that drives growth,
                                innovation, and lasting impact.
                            </p>
                            <Link href='/contact'>
                                <FxButton day={!isDayTime} variant="solid">
                                    Schedule a Consultation <span className="ml-2">→</span>
                                </FxButton>
                            </Link>
                        </div>
                    </FxReveal>
                </div>
            </section>
        </div>
    );
};

export default Fintech;

