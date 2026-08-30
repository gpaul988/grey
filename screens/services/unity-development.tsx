'use client';

import React, {useEffect, useRef, useState} from 'react';
import '@/app/globals.css'
import Image from "next/image";
import ResponsiveVideoHero from '@/components/ResponsiveVideoHero';
import Link from 'next/link';
import {AnimatePresence, motion} from "framer-motion";
import {ArrowRight, Circle, Globe2, MonitorSmartphone, Rocket, ShieldCheck, Sparkles, Users, Wand2} from 'lucide-react';
import {useIsDayTime} from '../../components/useIsDayTime';

import FuturisticServiceLayout from '@/components/futuristic/FuturisticServiceLayout';

import {
    FxBackground,
    FxChip,
    FxReveal,
    FxButton,
    FxHoloCard,
    FxFrame,
    FxStickyScrollSection
} from '@/components/futuristic/fx';
// Reasons
const reasons = [
    {
        id: 1,
        title: 'Experience Meets Innovation',
        summary: 'A seasoned delivery team that combines product intuition, technical mastery, and launch discipline.',
        detail: 'We bridge product strategy, technical architecture, and delivery governance to keep ambitious concepts grounded in execution.',
        focusPoints: ['Product strategy', 'Delivery discipline', 'Studio-grade execution'],
        description: (
            <>
                Our team comprises seasoned professionals who have refined their skills through years of real-world,
                hands-on experience. This depth of expertise means you gain more than just technical capability; you
                benefit from strategic insight and a problem-solving mindset that only comes from experience. We
                understand the Unity engine inside and out, enabling us to maximise its capabilities and push creative
                and technical boundaries. Whether it’s developing high-performance games, immersive VR experiences, or
                scalable multiplayer systems, we deliver solutions that are not only innovative but also commercially
                viable in today’s competitive gaming landscape.
            </>
        ),
        images: ['/assets/unity/exp.jpg']
    },
    {
        id: 2,
        title: 'Creating Outstanding Games',
        summary: 'We turn ambitious concepts into polished, memorable player journeys that stand out in a crowded market.',
        detail: 'From concept framing to release readiness, every experience is shaped around playability, retention, and commercial impact.',
        focusPoints: ['Player experience', 'Retention design', 'Launch readiness'],
        description: (
            <>
                With Graham Sobiribo Paul as your partner, you gain access to a deep well of technical expertise, creative
                innovation, and global industry insight. We collaborate closely with you to transform your ideas into
                games that don’t just meet expectations; they exceed them. Our goal is to deliver experiences that
                captivate users and drive commercial success, setting new benchmarks for quality and performance in the
                gaming world.
            </>
        ),
        images: ['/assets/unity/creat.jpg']
    },
    {
        id: 3,
        title: 'Mastery Of Unity Technologies',
        summary: 'Deep technical fluency across Unity’s ecosystem, enabling premium visuals, efficient systems, and scalable builds.',
        detail: 'We combine technical depth with production discipline to deliver performant, maintainable builds that scale with ambition.',
        focusPoints: ['Technical depth', 'Performance engineering', 'Scalable architecture'],
        description: (
            <>
                Our deep expertise in Unity technologies allows us to fully harness its capabilities, from delivering
                stunning visuals to optimising game performance. We leverage Unity’s robust features to craft
                engaging, scalable, and high-performing games that align with your goals. With Graham Sobiribo Paul, your
                vision is
                transformed into a seamless, immersive experience that exceeds expectations and drives results.
            </>
        ),
        images: ['/assets/unity/mast.jpg']
    },
    {
        id: 4,
        title: 'An Array Of Opportunities',
        summary: 'A broad perspective shaped by cross-industry collaboration, helping us build future-ready products with confidence.',
        detail: 'Cross-industry exposure allows us to bring sharper thinking to product strategy, technical choices, and long-term growth planning.',
        focusPoints: ['Cross-industry insight', 'Future readiness', 'Growth planning'],
        description: (
            <>
                Our collaborations with renowned companies have expanded our perspective, exposing us to diverse
                industry challenges and cutting-edge technologies. This experience sharpens our approach to game
                development, enabling us to deliver innovative, future-ready solutions that align with evolving market
                demands and set new benchmarks in the industry.
            </>
        ),
        images: ['/assets/unity/arr.jpg']
    },
    {
        id: 5,
        title: 'Precision Delivery Governance',
        summary: 'A structured operating model that keeps scope, risk, and momentum under control from day one.',
        detail: 'We bring predictable decision-making, milestone-based transparency, and disciplined execution so teams can move with confidence.',
        focusPoints: ['Delivery governance', 'Risk clarity', 'Milestone control'],
        description: (
            <>
                Our delivery approach is built around structure and accountability. By aligning stakeholders, timelines,
                and technical decisions from the outset, we reduce friction and keep every phase of the product journey
                focused,
                measurable, and commercially sound.
            </>
        ),
        images: ['/assets/unity/mast.jpg']
    },
    {
        id: 6,
        title: 'Future-Ready Product Evolution',
        summary: 'We design for long-term growth, enabling products to adapt, expand, and evolve with market demand.',
        detail: 'Our approach balances immediate launch goals with the flexibility required for live updates, platform expansion, and ongoing product maturity.',
        focusPoints: ['Product evolution', 'Long-term growth', 'Platform expansion'],
        description: (
            <>
                We think beyond the initial release. Every Unity product we build is prepared for future updates,
                broader
                audience reach, and changing market expectations so the experience remains relevant and resilient over
                time.
            </>
        ),
        images: ['/assets/unity/exp.jpg']
    },
];

const unlockCapabilities = [
    {
        title: 'Rapid prototyping',
        description: 'Move from concept to playable verticals quickly with aligned UX, technical, and content milestones.',
        icon: Rocket
    },
    {
        title: 'Cross-platform delivery',
        description: 'Deploy premium experiences across mobile, desktop, browser, and console without compromising quality.',
        icon: Globe2
    },
    {
        title: 'Performance engineering',
        description: 'Fine-tune frame pacing, memory budgets, and runtime stability for a polished player experience.',
        icon: ShieldCheck
    },
    {
        title: 'Live growth systems',
        description: 'Integrate analytics, backend hooks, and live-ops readiness from day one to support expansion.',
        icon: Users
    },
];

const unlockStats = [
    {
        label: 'Prototype velocity',
        value: '1–3 weeks',
        description: 'Playable validation loops with measurable feedback'
    },
    {label: 'Platform reach', value: '6+ targets', description: 'Built for multi-device release and scale'}
];

const UnityDevelopment = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);
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

    // Development Solutions hook
    const handleScroll = () => {
        const sections = [
            "2D",
            "3D",
            "MG",
            "WBG",
            "IE",
            "EGE",
            "UNR",
            "EGCP",
            "VRAR",
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

    // Unity solutions data (used by FxStickyScrollSection)
    const unityItems = [
        {
            id: '01',
            title: '2D Unity Games',
            target: '2D',
            tags: ['2D game development', 'Platformers', 'Educational'],
            body: (
                <div>
                    <p>
                        Specialist 2D production pipeline: concept, rapid prototyping, playable vertical, and full
                        production.
                    </p>
                    <p className="mt-3">
                        Our process is evidence-driven — design hypotheses are validated with lightweight prototypes and
                        player telemetry. UX flows, input mapping and performance budgets are established in discovery,
                        ensuring the final title meets business KPIs for retention and monetisation.
                    </p>
                    <ul className="mt-3 list-disc pl-5">
                        <li>Prototyping & concept validation</li>
                        <li>Pixel/Vector art pipelines & animation rigs</li>
                        <li>Optimization for memory & frame stability across target devices</li>
                    </ul>
                </div>
            ),
            metrics: [
                {
                    label: 'Prototype Velocity',
                    value: '1–3 weeks',
                    description: 'Validated playable prototype delivered quickly'
                },
                {label: 'Target FPS', value: '60+', description: 'Engineering budget for smooth mobile/desktop play'}
            ],
            deliverables: ['Playable prototype', 'Art & animation pipelines', 'Performance budget', 'Retention & monetisation plan'],
            cta: {label: 'Request 2D scoping', href: '/contact'}
        },
        {
            id: '02',
            title: '3D Unity Games',
            target: '3D',
            tags: ['3D engines', 'Open world', 'RPG'],
            body: (
                <div>
                    <p>
                        End-to-end 3D production combining advanced rendering, deterministic networking and modular
                        systems architecture designed for scale.
                    </p>
                    <p className="mt-3">
                        Deliverables include data-driven entity systems, LOD/streaming strategies, server-authoritative
                        networking and automated build pipelines to support multi-platform shipping and live-ops.
                    </p>
                    <ul className="mt-3 list-disc pl-5">
                        <li>Engine & systems architecture (networking, replication, persistence)</li>
                        <li>Graphics pipeline: PBR materials, clustered lighting, GPU-instancing</li>
                        <li>Live-ops readiness: analytics, remote config, content pipelines</li>
                    </ul>
                </div>
            ),
            metrics: [
                {label: 'Average Uptime', value: '99.95%', description: 'Target for core runtime services'},
                {label: 'Network Tick', value: '30–60Hz', description: 'Authoritative server tick rate options'}
            ],
            deliverables: ['Engine & systems design', 'Performance profiling & toolchain', 'Cross-platform CI/CD', 'Server-authoritative networking'],
            cta: {label: 'Discuss 3D architecture', href: '/contact'}
        },
        {
            id: '03',
            title: 'Mobile Games',
            target: 'MG',
            tags: ['iOS', 'Android', 'Monetisation'],
            body: (
                <div>
                    <p>
                        Mobile-first game development with device-specific optimisation, energy budgets, and
                        store-delivery readiness.
                    </p>
                    <p className="mt-3">
                        Focus areas include adaptive rendering, asset bundling strategies, memory budgets per device
                        class, and store submission support (iOS App Store & Google Play). A/B frameworks and analytics
                        are integrated for incremental growth.
                    </p>
                </div>
            ),
            metrics: [
                {label: 'Load Time', value: '<1.2s', description: 'Fast cold start for retention'},
                {label: 'Battery Impact', value: '-5%', description: 'Average runtime improvement vs baseline'}
            ],
            deliverables: ['Device-specific optimisation', 'App Store/Play Store readiness', 'A/B test & analytics integration'],
            cta: {label: 'Plan a mobile audit', href: '/contact'}
        },
        {
            id: '04',
            title: 'Web-Based Games',
            target: 'WBG',
            tags: ['WebGL', 'Browser-first', 'Progressive'],
            body: (
                <div>
                    <p>
                        High-performance WebGL builds and progressive delivery strategies that prioritise first-load
                        speed and graceful degradation across browsers.
                    </p>
                    <p className="mt-3">
                        Includes asset streaming, code-splitting, and CDN deployment guidance to ensure low latency and
                        broad accessibility for marketing, social and embed use-cases.
                    </p>
                </div>
            ),
            metrics: [
                {label: 'First Paint', value: '<1.5s', description: 'Optimised for low-bandwidth environments'},
                {label: 'Bundle Size', value: '<3MB', description: 'Typical compressed initial payload target'}
            ],
            deliverables: ['WebGL builds', 'Hosting & CDN plan', 'Progressive asset streaming'],
            cta: {label: 'Request Web demo', href: '/contact'}
        },
        {
            id: '05',
            title: 'Immersive Experiences',
            target: 'IE',
            tags: ['XR', 'Training', 'Simulations'],
            body: (
                <div>
                    <p>
                        XR solutions tailored for training, simulation and immersive storytelling with a strong emphasis
                        on measurable outcomes and usability.
                    </p>
                    <p className="mt-3">
                        Projects include hardware compatibility analysis, interaction model design, and data capture for
                        assessment and analytics. Accessibility and safety are first-class concerns in all immersive
                        deployments.
                    </p>
                </div>
            ),
            metrics: [
                {label: 'Prototype Time', value: '2–6 weeks', description: 'Validated XR interaction prototype'},
                {label: 'Target Frame', value: '90Hz', description: 'Recommended for comfortable VR UXR'}
            ],
            deliverables: ['XR prototype', 'Interaction design', 'Hardware compatibility report'],
            cta: {label: 'Explore XR options', href: '/contact'}
        },
        {
            id: '06',
            title: 'Elevate The Gaming Experience',
            target: 'EGE',
            tags: ['Innovation', 'VR/AR', 'Immersion'],
            body: (
                <div>
                    <p>
                        Experience design that fuses sensory systems — audio, haptics and environmental feedback — with
                        adaptive gameplay loops to increase presence and retention.
                    </p>
                    <p className="mt-3">
                        Technical work focuses on low-latency input, procedural content systems, and modular
                        audio/haptics pipelines for consistent cross-platform behaviour.
                    </p>
                </div>
            ),
            metrics: [
                {
                    label: 'Retention Lift',
                    value: '+10–30%',
                    description: 'Estimated uplift from sensory & flow improvements'
                },
            ],
            deliverables: ['Experience design', 'Audio & haptics integration', 'Procedural content systems'],
            cta: {label: 'Schedule experience workshop', href: '/contact'}
        },
        {
            id: '07',
            title: 'Unlocking New Realities',
            target: 'UNR',
            tags: ['Future tech', 'Scale', 'Integration'],
            body: (
                <div>
                    <p>
                        Strategic, high-leverage engagements blending R&D, platform integration and proof-of-value
                        pilots to open new markets or products.
                    </p>
                    <p className="mt-3">
                        Workstreams include infrastructure cost modelling, partner integration (cloud, analytics, auth),
                        and MVP roadmap aligned to measurable business objectives.
                    </p>
                </div>
            ),
            deliverables: ['R&D prototype', 'MVP roadmap', 'Integration plan'],
            cta: {label: 'Start strategic discussion', href: '/contact'}
        },
        {
            id: '08',
            title: 'Enhancing Gameplay, Creating Presence',
            target: 'EGCP',
            tags: ['Immersion', 'Design', 'Retention'],
            body: (
                <div>
                    <p>
                        Focused R&D and feature work to improve core gameplay loops, fidelity and perceived presence
                        using data-driven optimisation.
                    </p>
                    <p className="mt-3">
                        Outputs include tuning frameworks, session telemetry, and UI/UX interventions that materially
                        improve player satisfaction.
                    </p>
                </div>
            ),
            deliverables: ['Feature R&D', 'Telemetry & tuning frameworks', 'UX improvements'],
            cta: {label: 'Discuss feature R&D', href: '/contact'}
        },
        {
            id: '09',
            title: 'Virtual & Augmented Reality',
            target: 'VRAR',
            tags: ['VR', 'AR', 'Spatial UX'],
            body: (
                <div>
                    <p>
                        End-to-end VR & AR development: hardware-aware engineering, spatial UX design, and robust
                        performance optimisation for comfortable, high-fidelity experiences.
                    </p>
                    <p className="mt-3">
                        Includes automation for multi-device testing, repro-capture for bug triage, and guidance for
                        long-term support and distribution strategies.
                    </p>
                </div>
            ),
            metrics: [
                {
                    label: 'Prototype Deliverable',
                    value: 'Playable module',
                    description: 'Hardware-tested on target devices'
                },
            ],
            deliverables: ['Prototype', 'XR performance report', 'Multi-device test matrix'],
            cta: {label: 'Request XR pilot', href: '/contact'}
        }
    ];

    // Why Work hook
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex(prevIndex => (prevIndex % reasons.length) + 1);
        }, 3000); // Change slide every 3 seconds

        return () => {
            clearInterval(interval);
        }; // Clean up the interval on unmount
    }, []);

    const benefits = [
        {
            icon: Globe2,
            title: 'Cross-platform reach',
            description: 'Deploy once across mobile, desktop, console, web and XR while keeping performance polished and content pipelines efficient.',
            metric: '25+ platforms',
        },
        {
            icon: Users,
            title: 'Multiplayer engagement',
            description: 'Create scalable networking, shared worlds and competitive systems that keep players connected and retention high.',
            metric: 'Real-time multiplayer',
        },
        {
            icon: Rocket,
            title: 'Faster launch cycles',
            description: 'Accelerate from prototype to production with high-velocity workflows, reusable systems and a streamlined content pipeline.',
            metric: '1–3 week prototypes',
        },
        {
            icon: MonitorSmartphone,
            title: 'XR-ready experiences',
            description: 'Blend immersive VR and AR experiences with responsive UI and device-aware engineering for modern interactive products.',
            metric: 'Immersive by design',
        },
        {
            icon: Wand2,
            title: 'Flexible customisation',
            description: 'Tailor the experience with bespoke systems, shader work, tooling and integrations that align with your creative vision.',
            metric: 'Bespoke systems',
        },
        {
            icon: ShieldCheck,
            title: 'Smarter ROI',
            description: 'Reduce rework and production overhead with a modular architecture that keeps projects lean, maintainable and cost-conscious.',
            metric: 'Lower delivery risk',
        },
    ];

    return (
        <div suppressHydrationWarning className={`${isDayTime ? 'bg-white' : 'bg-black'} min-h-screen`}>

            {/* Unified Unity Hero â€” Background Video/Image with Futuristic Overlay */}
            <section className="relative overflow-hidden lg:w-full lg:min-h-[90vh] lg:h-[720px] w-full h-[600px]">
                {/* Video Background (desktop) and Image fallback (mobile) */}
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="hidden lg:block absolute inset-0 w-full h-full object-cover"
                    poster="/assets/unity/hero.jpg"
                >
                    <source src="/assets/unity/hero.mp4" type="video/mp4"/>
                </video>

                <Image
                    src="/assets/unity/hero.jpg"
                    alt="Unity Hero"
                    fill
                    priority
                    className="lg:hidden object-cover"
                />

                {/* Grid & FX Background */}
                <div className="pointer-events-none absolute inset-0 z-[1]">
                    <FxBackground day={!isDayTime} grid={true} aurora={true}/>
                </div>

                {/* Gradient Overlay with glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/60 to-black/40 z-[2]"/>
                <div
                    className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.12),transparent_40%)] z-[2]"/>

                {/* Futuristic FX Elements */}
                <div className="pointer-events-none absolute inset-0 z-[3]">
                    <div className="gx-scanline"/>
                    <div className="gx-noise-overlay"/>
                    <div className="gx-orbit absolute"
                         style={{width: '60vmax', height: '60vmax', top: '-20vmax', right: '-20vmax', opacity: .12}}/>
                </div>

                {/* Content Container */}
                <div className="absolute inset-0 flex items-center top-24 z-[11] px-6 sm:px-6 md:px-10 lg:px-[4.5em]">
                    <div className="w-full grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        {/* Left: Headline + CTA */}
                        <div>
                            <div className="flex items-center gap-3 mb-6 lg:mb-8">
                                <div className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-pulse"/>
                                <span
                                    className="text-teal-400 text-[0.7em] lg:text-[0.82em] uppercase tracking-[0.22em] font-[600]">Unity Development</span>
                            </div>

                            <h1 className="text-white text-[2em] lg:text-[4.5em] font-[700] leading-[1.08] tracking-tight mb-6 lg:mb-8">
                                Build Immersive, <span className="gx-gradient-text">Real-Time Experiences</span> with
                                Unity
                            </h1>

                            <p className="text-white/70 text-[0.9em] lg:text-[1.05em] leading-[1.65] mb-8 lg:mb-10 font-[300]">
                                From high-performance multiplayer systems to photoreal visuals and XR experiences â€”
                                Graham Sobiribo Paul
                                engineers deliver robust, scalable Unity projects designed for long-term success and
                                measurable impact.
                            </p>

                            <div className="flex flex-wrap gap-2 mb-10 lg:mb-12">
                                {['Real-time 3D', 'XR & AR/VR', 'Multiplayer', 'Optimised Rendering', 'Tooling & CI'].map((badge) => (
                                    <span key={badge}
                                          className="px-3 py-1.5 rounded-full bg-teal-400/10 border border-teal-400/30 text-teal-300 text-[0.7em] lg:text-[0.75em] font-[600] uppercase tracking-wider">{badge}</span>
                                ))}
                            </div>

                            <div className="flex flex-wrap gap-4 items-center">
                                <Link href="/contact">
                                    <button
                                        className="relative px-8 py-3 rounded-full text-[0.9em] lg:text-[0.95em] font-bold overflow-hidden hover:shadow-lg transition-shadow duration-300 whitespace-nowrap"
                                        style={{background: '#06b6d4', color: '#000'}}>
                                        <span className="absolute inset-0"
                                              style={{background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)'}}/>
                                        <span className="relative inline-flex items-center gap-2">
                                            Start a project
                                            <ArrowRight className="h-4 w-4"/>
                                        </span>
                                    </button>
                                </Link>
                                <Link href="/portfolio">
                                    <button
                                        className="px-8 py-3 rounded-full text-[0.9em] lg:text-[0.95em] font-semibold text-white/70 hover:text-white transition-all duration-300 hover:bg-white/10 whitespace-nowrap"
                                        style={{border: `1px solid rgba(255,255,255,0.15)`}}>
                                        View Case Studies
                                    </button>
                                </Link>
                            </div>
                        </div>

                        {/* Right Column - Impact Stats */}
                        <div className="hidden lg:flex flex-col items-end">
                            <div className="grid grid-cols-2 gap-6 w-full">
                                {[{label: 'Projects', value: '10+'}, {
                                    label: 'XR Experiences',
                                    value: '8+'
                                }, {label: 'Multiplayer Systems', value: '2+'}, {
                                    label: 'Optimisations',
                                    value: '100s'
                                }].map((s, i) => (
                                    <div key={i} className="bg-white/6 rounded-lg p-4 w-56">
                                        <div className="text-xs text-slate-300">{s.label}</div>
                                        <div className="text-2xl font-bold mt-1">{s.value}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Introductory section — ERP-styled (from UI/UX) */}
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
                    className='relative z-10 grid lg:grid-cols-2 grid-cols-1 lg:gap-14 gap-6 lg:pt-20 pt-6 lg:pb-32 pb-6 mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em]'>
                    <div>
                        <FxChip day={!isBackgroundActive ? !isDayTime : isDayTime}>ENGINEERING-LED EXPERIENCES</FxChip>
                    </div>

                    <div className='lg:-ml-[19em]'>
                        <FxReveal>
                            <h3 className='lg:text-[3.5em] md:text-[3em] text-[2em] font-[700] tracking-tight leading-[1.15] mt-4'>
                                Real-time Systems & <span className='gx-gradient-text'>Immersive Interactions</span>
                            </h3>
                        </FxReveal>

                        <FxReveal delay={0.08}>
                            <div
                                className='grid lg:grid-cols-2 grid-cols-1 gap-4 mt-4 font-[300] text-justify text-[0.95em] md:text-[1.05em] leading-relaxed'>
                                <div>
                                    <p>We engineer real-time experiences that balance creative fidelity with production
                                        reliability. From rapid prototyping and shader-driven visuals to authoritative
                                        multiplayer architectures, our process unites research, iteration, and
                                        production-grade engineering to reduce risk and accelerate value.</p>
                                </div>
                                <div>
                                    <p>Our delivery model focuses on observable, testable outcomes: latency budgets,
                                        deterministic replay for debugging, automated performance pipelines, and XR
                                        compatibility. We deliver design systems, tooling, and production workflows that
                                        integrate with your engineering lifecycle for seamless handoff and scale.</p>
                                    <div className='flex flex-wrap gap-3 mt-4'>
                                        {['Real-time 3D', 'Multiplayer', 'XR-Ready', 'Optimized Rendering', 'CI/CD', 'Observability'].map((p) => (
                                            <span key={p} className='gx-data-pill'>{p}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </FxReveal>

                        <FxReveal delay={0.16}>
                            <div className='mt-12 pt-8 border-t'>
                                <h4 className='text-[1.2em] font-[600] tracking-tight mb-6'>Engineering
                                    Capabilities</h4>
                                <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6'>
                                    {[
                                        {
                                            title: 'Core Engine & Systems',
                                            items: ['Performance Profiling', 'Deterministic Networking', 'Server Authoritative Architecture', 'Optimization & LOD Systems']
                                        },
                                        {
                                            title: 'Visual & Interaction Systems',
                                            items: ['Advanced Shader Pipelines', 'XR Interactions', 'Cinematic Rendering', 'Tooling & Debugging UIs']
                                        },
                                        {
                                            title: 'DevOps & Reliability',
                                            items: ['CI/CD pipelines', 'Automated Performance Tests', 'Observability & Tracing', 'Runbooks & SLOs']
                                        }
                                    ].map((capability, idx) => (
                                        <div key={idx}
                                             className='p-4 rounded-lg border bg-white/5 hover:bg-white/10 transition-colors duration-300'>
                                            <h5 className='font-[600] text-[0.95em] mb-3'>{capability.title}</h5>
                                            <ul className='space-y-2'>
                                                {capability.items.map((item, i) => (
                                                    <li key={i} className='text-[0.85em] flex items-start gap-2'>
                                                                    <span
                                                                        className='mt-0.5 inline-flex h-4 w-4 items-center justify-center text-cyan-400'>
                                                            <Circle className='h-3 w-3 fill-current'/>
                                                        </span>
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </FxReveal>

                        <FxReveal delay={0.24}>
                            <div className='mt-12 pt-8 border-t '>
                                <h4 className='text-[1.2em] font-[600] tracking-tight mb-6'>Impact & Outcomes</h4>
                                <div className='grid lg:grid-cols-2 grid-cols-1 gap-6'>
                                    {[
                                        {
                                            metric: 'Prototype Velocity',
                                            value: '1–3 weeks',
                                            description: 'Time from discovery to validated prototype'
                                        },
                                        {
                                            metric: 'Average Uptime',
                                            value: '99.95%',
                                            description: 'Targeted availability for critical runtime services'
                                        }
                                    ].map((m, i) => (
                                        <div key={i} className='p-4 rounded-lg border bg-white/5'>
                                            <div
                                                className='text-xs text-slate-300 uppercase tracking-wider font-[600] mb-2'>{m.metric}</div>
                                            <div className='text-[1.6em] font-[700]'>{m.value}</div>
                                            <div className='text-[0.85em] text-slate-400 mt-2'>{m.description}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </FxReveal>
                    </div>
                </div>
            </section>

            {/* Futuristic showcase */}
            <section id={'top'}
                     className={'relative lg:max-w-full w-full py-16 mx-auto h-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em]'}>
                <div className={'relative grid lg:grid-cols-2 grid-cols-1 gap-6 items-start'}>
                    {/* Left: KPI / Mini-cards (visible on lg) */}
                    <div className={'hidden lg:block pr-6'}>
                        <div className={'rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm'}>
                            <div className="text-[0.72em] uppercase tracking-[0.28em] text-cyan-300/80">Showcase</div>
                            <h4 className={'text-[1.9em] font-[700] mt-2 mb-3 inline-flex items-center gap-2'}>
                                <Sparkles className={'h-4 w-4 text-teal-400'}/>
                                Realtime scenes
                                <span className={'text-teal-400'}>•</span>
                                Production-ready
                            </h4>
                            <p className={'text-sm text-slate-300 mb-4'}>A curated gallery of realtime experiences,
                                lighting & rendering pipelines, and systems engineered for performance and scale.</p>

                            <div className="grid gap-2 sm:grid-cols-2">
                                {[
                                    {label: 'Rendering', value: 'Physically-based'},
                                    {label: 'Networking', value: 'Authoritative'},
                                    {label: 'Optimization', value: 'LOD & Baking'},
                                    {label: 'Tooling', value: 'Profiling & CI'}
                                ].map((item) => (
                                    <div key={item.label}
                                         className="rounded-2xl border bg-white/6 px-4 py-3">
                                        <div
                                            className="text-[0.58em] uppercase tracking-[0.3em] text-teal-300/80">{item.label}</div>
                                        <div className="mt-1 text-[1.05em] font-[600]">{item.value}</div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 grid gap-3 sm:grid-cols-2">
                                <div className="rounded-2xl border  bg-white/[0.03] p-3">
                                    <div className="text-[0.72em] uppercase tracking-[0.28em] text-teal-300">Realtime
                                        3D
                                    </div>
                                    <div className="mt-2 text-sm ">Interactive scenes & shader-driven
                                        visuals.
                                    </div>
                                </div>
                                <div className="rounded-2xl border border-teal-400/10 bg-white/[0.03] p-3">
                                    <div
                                        className="text-[0.72em] uppercase tracking-[0.28em] text-teal-300">Multiplayer
                                    </div>
                                    <div className="mt-2 text-sm ">Authoritative servers & deterministic
                                        sync.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Gallery */}
                    <div className={'relative z-10 mt-8 grid gap-4 lg:grid-cols-[1.35fr_0.9fr]'}>
                        <div
                            className={'group relative overflow-hidden rounded-[1.6rem] border border-white/10 h-[320px] sm:h-[420px] lg:h-[540px]'}>
                            <Image
                                src={'/assets/unity/1.jpg'}
                                alt={'Unity architecture showcase'}
                                fill
                                className={'object-cover transition-transform duration-700 group-hover:scale-105'}
                            />
                            <div
                                className={'absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(2,6,23,0.2)_40%,rgba(2,6,23,0.88)_100%)]'}/>
                            <div className="absolute inset-0 border border-white/10"/>
                            <div
                                className="absolute left-4 top-4 rounded-full border border-teal-400/30 bg-black/30 px-3 py-1 text-[0.62em] uppercase tracking-[0.3em] text-teal-300">01
                                / Realtime
                            </div>
                            <div className="absolute bottom-4 left-4 right-4">
                                <p className="text-[0.62em] uppercase tracking-[0.3em] text-teal-300 font-[600]">Realtime
                                    Rendering</p>
                                <p className="mt-2 max-w-xl text-sm sm:text-base text-white/90">High-fidelity realtime
                                    scenes with scalable lighting and shader systems.</p>
                            </div>
                        </div>

                        <div className="grid gap-4">
                            <div
                                className="group relative overflow-hidden rounded-[1.35rem] border border-white/10 h-[250px] sm:h-[260px] lg:h-[260px]">
                                <Image
                                    src={'/assets/unity/2.jpg'}
                                    alt={'Unity UI detail showcase'}
                                    fill
                                    className={'object-cover transition-transform duration-700 group-hover:scale-105'}
                                />
                                <div
                                    className={'absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(2,6,23,0.16)_55%,rgba(2,6,23,0.78)_100%)]'}/>
                                <div className={'absolute inset-0 border border-white/10'}/>
                                <div
                                    className={'absolute left-3 top-3 rounded-full border border-white/15 bg-black/20 px-2.5 py-1 text-[0.56em] uppercase tracking-[0.28em] text-teal-200'}>02
                                    / UI
                                </div>
                            </div>

                            <div
                                className={'group relative overflow-hidden rounded-[1.35rem] border border-white/10 h-[250px] sm:h-[260px] lg:h-[260px]'}>
                                <Image
                                    src={'/assets/unity/3.jpg'}
                                    alt={'Unity workflow showcase'}
                                    fill
                                    className={'object-cover transition-transform duration-700 group-hover:scale-105'}
                                />
                                <div
                                    className={'absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(2,6,23,0.16)_55%,rgba(2,6,23,0.78)_100%)]'}/>
                                <div className={'absolute inset-0 border border-white/10'}/>
                                <div
                                    className={'absolute left-3 top-3 rounded-full border border-white/15 bg-black/20 px-2.5 py-1 text-[0.56em] uppercase tracking-[0.28em] text-teal-200'}>03
                                    / Workflow
                                </div>
                            </div>
                        </div>

                        <div
                            className={'group relative overflow-hidden rounded-[1.6rem] border border-white/10 h-[240px] sm:h-[260px] lg:h-[260px] lg:col-span-2'}>
                            <Image
                                src={'/assets/unity/4.jpg'}
                                alt={'Unity product experience showcase'}
                                fill
                                className={'object-cover transition-transform duration-700 group-hover:scale-105'}
                            />
                            <div
                                className={'absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(2,6,23,0.1)_35%,rgba(2,6,23,0.82)_100%)]'}/>
                            <div className={'absolute inset-0 border border-white/10'}/>
                            <div
                                className={'absolute left-3 top-3 rounded-full border border-teal-400/30 bg-black/30 px-2.5 py-1 text-[0.56em] uppercase tracking-[0.28em] text-teal-300'}>04
                                / Experience
                            </div>
                            <div className={'absolute bottom-4 left-4 right-4'}>
                                <p className={'text-white/90 text-sm sm:text-base'}>Premium, optimized product
                                    experiences built for production deployment.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Unity Development Solutions */}
            <FxStickyScrollSection
                day={isDayTime}
                heading={<>Our Unity<br/>development solutions</>}
                intro={"At Graham Sobiribo Paul, we use Unity to build immersive, cross-platform applications and games that support real business goals — from user engagement to training, marketing, or product innovation. Our teams combine creative design with engineering rigour to deliver production-ready systems at speed."}
                navLabel={"Unity Solutions"}
                activeId={activeId}
                onNavClickAction={scrollToSection}
                items={unityItems}
            />

            {/* Mid image — Futuristic showcase */}
            <section id={'mid image'} className={'relative max-w-full w-full mx-auto py-12'}>
                <div className={'relative max-w-full mx-auto px-6'}>
                    <FxFrame className={'rounded-3xl overflow-hidden'}>
                        <div className={'relative h-[420px] sm:h-[560px] lg:h-[720px]'}>
                            <Image
                                src={'/assets/unity/ani.jpg'}
                                alt={'Unity realtime showcase'}
                                fill
                                className={'object-cover transition-transform duration-1000 scale-100 hover:scale-105'}
                            />

                            {/* Depth & gradient overlays */}
                            <div
                                className={'absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(2,6,23,0.15)_35%,rgba(2,6,23,0.7)_100%)]'}/>
                            <div className={'pointer-events-none absolute inset-0'}>
                                <FxBackground day={isDayTime} grid={true} aurora={true} className={'opacity-90'}/>
                            </div>

                            {/* Eyebrow chip */}
                            <div className={'absolute left-8 top-8'}>
                                <FxChip day={isDayTime}>FUTURISTIC SHOWCASE</FxChip>
                            </div>

                            {/* Lead content */}
                            <div className={'absolute left-8 bottom-8 max-w-lg'}>
                                <FxReveal>
                                    <h3 className={'text-white lg:text-3xl text-xl font-[700] tracking-tight'}>Realtime
                                        pipelines — live rendering, streaming & authoritative systems</h3>
                                    <p className={'text-white/80 mt-3 text-sm'}>A production snapshot showcasing our
                                        realtime rendering fidelity, streaming asset pipelines and low-latency
                                        networking. Designed for sustained performance across devices and scalable
                                        live-ops.</p>
                                    <div className={'mt-4 flex gap-3'}>
                                        <FxButton day={isDayTime} href={'/contact'}>Start a pilot</FxButton>
                                        <Link href={'/portfolio'}
                                              className={'inline-flex items-center text-sm text-white/70 underline px-3 py-2'}>View
                                            case studies</Link>
                                    </div>
                                </FxReveal>
                            </div>

                            {/* Floating holo stats */}
                            <div className={'absolute right-8 top-24 flex flex-col gap-4'}>
                                <FxHoloCard day={isDayTime} className={'p-4 w-44'}>
                                    <div className={'text-[0.66em] uppercase tracking-[0.18em] text-slate-300'}>Render
                                        throughput
                                    </div>
                                    <div className={'text-2xl font-[800] mt-1'}>4K • 60fps</div>
                                    <div className={'text-xs text-slate-400 mt-1'}>Optimised GPU & batching</div>
                                </FxHoloCard>

                                <FxHoloCard day={isDayTime} className={'p-4 w-44'}>
                                    <div
                                        className={'text-[0.66em] uppercase tracking-[0.18em] text-slate-300'}>Authoritative
                                        tick
                                    </div>
                                    <div className={'text-2xl font-[800] mt-1'}>60Hz</div>
                                    <div className={'text-xs text-slate-400 mt-1'}>Deterministic networking options
                                    </div>
                                </FxHoloCard>
                            </div>

                            {/* Subtle orbit decoration */}
                            <div aria-hidden
                                 className={'hidden lg:block absolute -right-20 -top-20 w-[40vmax] h-[40vmax] rounded-full opacity-10'}/>
                        </div>
                    </FxFrame>
                </div>
            </section>

            {/* The benefits of Unity game development services */}
            <section
                className={`relative max-w-full w-full py-20 lg:mt-[3em] md:mt-[3em] mx-auto h-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em] ${isDayTime ? 'text-black' : 'text-white'}`}>
                <div className="relative z-10">
                    <FxReveal>
                        <div className="max-w-3xl mb-12">
                            <div
                                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[0.72em] font-semibold uppercase tracking-[0.24em] ${isDayTime ? 'border-black/10 bg-black/[0.03] text-black/70' : 'border-cyan-400/20 bg-cyan-400/10 text-cyan-300'}`}>
                                <Sparkles className="h-3.5 w-3.5"/>
                                Business Benefits
                            </div>
                            <h2 className={`mt-6 text-3xl md:text-4xl lg:text-[3.2rem] font-[700] tracking-tight leading-[1.08] ${isDayTime ? 'text-black' : 'text-white'}`}>
                                Why Unity development delivers <span
                                className={`bg-gradient-to-r ${isDayTime ? 'from-slate-700 to-slate-950' : 'from-cyan-300 to-blue-400'} bg-clip-text text-transparent`}>measurable business value</span>
                            </h2>
                            <p className={`mt-5 max-w-2xl text-[0.95rem] leading-[1.7] ${isDayTime ? 'text-slate-700' : 'text-slate-300'}`}>
                                Unity gives teams a fast, flexible foundation for building premium games and interactive
                                products — from rapid prototypes to full-scale launches across devices and platforms.
                            </p>
                        </div>
                    </FxReveal>

                    <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
                        {benefits.map((benefit, index) => {
                            const Icon = benefit.icon;
                            return (
                                <FxReveal key={benefit.title} delay={0.06 * (index + 1)}>
                                    <FxFrame className="h-full">
                                        <div
                                            className={`group relative h-full overflow-hidden rounded-[1.6rem] border p-8 transition-all duration-300 hover:-translate-y-1 ${isDayTime ? 'border-slate-200 bg-gradient-to-br from-white to-slate-50 shadow-[0_20px_60px_rgba(15,23,42,0.08)]' : 'border-white/10 bg-gradient-to-br from-white/10 to-white/[0.03] shadow-[0_20px_60px_rgba(0,0,0,0.22)]'}`}>
                                            <div
                                                className={`absolute inset-0 bg-gradient-to-br ${isDayTime ? 'from-slate-900/[0.03] to-transparent' : 'from-cyan-400/[0.08] to-transparent'}`}/>
                                            <div
                                                className={`absolute -right-10 -top-10 h-28 w-28 rounded-full blur-3xl ${isDayTime ? 'bg-slate-900/10' : 'bg-cyan-400/10'}`}/>
                                            <div className="relative">
                                                <div
                                                    className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl border ${isDayTime ? 'border-slate-200 bg-white text-slate-900 shadow-sm' : 'border-cyan-400/20 bg-cyan-400/10 text-cyan-300'}`}>
                                                    <Icon className="h-5 w-5"/>
                                                </div>
                                                <div
                                                    className={`mt-6 h-1 w-12 rounded-full ${isDayTime ? 'bg-slate-900' : 'bg-cyan-400'}`}/>
                                                <h3 className={`mt-5 text-[1.2rem] font-[700] tracking-tight ${isDayTime ? 'text-slate-900' : 'text-white'}`}>
                                                    {benefit.title}
                                                </h3>
                                                <p className={`mt-3 text-[0.92rem] leading-[1.75] ${isDayTime ? 'text-slate-600' : 'text-slate-300'}`}>
                                                    {benefit.description}
                                                </p>
                                                <div
                                                    className={`mt-8 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[0.75rem] font-semibold uppercase tracking-[0.18em] ${isDayTime ? 'bg-slate-900 text-white' : 'bg-cyan-400/10 text-cyan-300'}`}>
                                                    {benefit.metric}
                                                    <ArrowRight
                                                        className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"/>
                                                </div>
                                            </div>
                                        </div>
                                    </FxFrame>
                                </FxReveal>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Unlocking tomorrow’s gaming possibilities today */}
            <section id="unlocking"
                     className={`relative overflow-hidden py-20 lg:py-24 ${isDayTime ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
                <div className="absolute inset-0 overflow-hidden">
                    <div
                        className={`absolute left-0 top-0 h-72 w-72 rounded-full blur-3xl ${isDayTime ? 'bg-cyan-400/20' : 'bg-cyan-500/15'}`}/>
                    <div
                        className={`absolute bottom-0 right-0 h-80 w-80 rounded-full blur-3xl ${isDayTime ? 'bg-blue-500/20' : 'bg-indigo-400/15'}`}/>
                    <div
                        className={`absolute inset-0 ${isDayTime ? 'bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.18),transparent_38%)]' : 'bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.12),transparent_38%)]'}`}/>
                    <div
                        className={`absolute inset-0 opacity-20 ${isDayTime ? 'bg-[linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)]' : 'bg-[linear-gradient(90deg,rgba(15,23,42,0.08)_1px,transparent_1px),linear-gradient(rgba(15,23,42,0.08)_1px,transparent_1px)]'} [background-size:26px_26px]`}/>
                </div>

                <div
                    className="relative mx-auto grid max-w-full gap-8 px-4 sm:px-6 lg:grid-cols-[1.03fr,0.97fr] lg:px-[4.6em]">
                    <FxReveal>
                        <div
                            className={`relative overflow-hidden rounded-[2rem] border p-7 lg:p-8 ${isDayTime ? 'border-white/10 bg-slate-900/70 shadow-[0_30px_120px_rgba(2,8,23,0.45)]' : 'border-slate-200 bg-white/90 shadow-[0_25px_90px_rgba(15,23,42,0.12)]'}`}>
                            <div
                                className={`absolute inset-0 ${isDayTime ? 'bg-gradient-to-br from-cyan-400/10 via-transparent to-blue-500/10' : 'bg-gradient-to-br from-slate-900/[0.03] via-transparent to-slate-900/[0.05]'}`}/>
                            <div className="relative">
                                <div
                                    className={`inline-flex w-fit items-center gap-2 rounded-full border px-4 py-2 text-[0.72em] font-semibold uppercase tracking-[0.24em] ${isDayTime ? 'border-cyan-400/20 bg-cyan-400/10 text-cyan-300' : 'border-slate-300 bg-slate-50 text-slate-700'}`}>
                                    <Sparkles className="h-3.5 w-3.5"/>
                                    Future-ready Unity delivery
                                </div>

                                <h2 className={`mt-6 text-3xl font-[700] leading-[1.04] tracking-tight md:text-4xl lg:text-[3.15rem] ${isDayTime ? 'text-white' : 'text-slate-950'}`}>
                                    Designing <span
                                    className={`bg-gradient-to-r ${isDayTime ? 'from-cyan-300 via-blue-400 to-slate-100' : 'from-slate-700 via-slate-900 to-slate-950'} bg-clip-text text-transparent`}>high-performance interactive systems</span>{' '}
                                    with precision, clarity, and strategic pace
                                </h2>

                                <p className={`mt-5 max-w-2xl text-[0.95rem] leading-[1.8] ${isDayTime ? 'text-slate-300' : 'text-slate-700'}`}>
                                    Graham Sobiribo Paul brings together product thinking, technical architecture, and
                                    production
                                    discipline to build Unity experiences that feel premium from the first interaction
                                    to
                                    the final release. Every layer is shaped to improve retention, reduce uncertainty,
                                    and
                                    create a more durable digital product.
                                </p>

                                <div className="mt-8 grid gap-4 lg:grid-cols-2">
                                    {unlockStats.map((stat) => (
                                        <div key={stat.label}
                                             className={`rounded-[1.2rem] border p-4 ${isDayTime ? 'border-white/10 bg-white/[0.04] backdrop-blur-sm' : 'border-slate-200 bg-slate-50/90'}`}>
                                            <p className={`text-[0.65rem] font-semibold uppercase tracking-[0.24em] ${isDayTime ? 'text-cyan-300/90' : 'text-slate-500'}`}>
                                                {stat.label}
                                            </p>
                                            <p className={`mt-2 text-2xl font-[700] ${isDayTime ? 'text-white' : 'text-slate-950'}`}>
                                                {stat.value}
                                            </p>
                                            <p className={`mt-1 text-sm leading-[1.6] ${isDayTime ? 'text-slate-400' : 'text-slate-600'}`}>
                                                {stat.description}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <div
                                    className={`mt-6 rounded-[1.4rem] border p-5 ${isDayTime ? 'border-cyan-400/20 bg-cyan-400/10' : 'border-slate-200 bg-slate-50/90'}`}>
                                    <div className="flex flex-wrap items-start justify-between gap-4">
                                        <div className="flex items-start gap-3">
                                            <div
                                                className={`flex h-11 w-11 items-center justify-center rounded-2xl ${isDayTime ? 'bg-slate-950/80 text-cyan-300' : 'bg-slate-900 text-white'}`}>
                                                <ShieldCheck className="h-5 w-5"/>
                                            </div>
                                            <div>
                                                <p className={`text-[0.95rem] font-[700] ${isDayTime ? 'text-white' : 'text-slate-950'}`}>
                                                    Delivery intelligence
                                                </p>
                                                <p className={`mt-1 text-sm leading-[1.7] ${isDayTime ? 'text-slate-300' : 'text-slate-600'}`}>
                                                    We structure each build around measurable milestones, platform
                                                    readiness,
                                                    and long-term maintainability so the roadmap stays calm, credible,
                                                    and
                                                    commercially focused.
                                                </p>
                                            </div>
                                        </div>
                                        <div
                                            className={`rounded-full border px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.2em] ${isDayTime ? 'border-cyan-400/20 text-cyan-300' : 'border-slate-300 text-slate-700'}`}>
                                            Operational clarity
                                        </div>
                                    </div>

                                    <div className="mt-5 grid gap-2 sm:grid-cols-3">
                                        <div
                                            className={`rounded-2xl border px-3 py-3 text-sm ${isDayTime ? 'border-white/10 bg-slate-950/70 text-slate-200' : 'border-slate-200 bg-white text-slate-700'}`}>
                                            Production governance
                                        </div>
                                        <div
                                            className={`rounded-2xl border px-3 py-3 text-sm ${isDayTime ? 'border-white/10 bg-slate-950/70 text-slate-200' : 'border-slate-200 bg-white text-slate-700'}`}>
                                            Performance assurance
                                        </div>
                                        <div
                                            className={`rounded-2xl border px-3 py-3 text-sm ${isDayTime ? 'border-white/10 bg-slate-950/70 text-slate-200' : 'border-slate-200 bg-white text-slate-700'}`}>
                                            Growth-ready systems
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </FxReveal>

                    <FxReveal delay={0.08}>
                        <FxHoloCard day={isDayTime}
                                    className={`overflow-hidden rounded-[2rem] border p-0 ${isDayTime ? 'border-white/10 bg-slate-900/80 shadow-[0_30px_120px_rgba(2,8,23,0.5)]' : 'border-slate-200 bg-white/90 shadow-[0_25px_90px_rgba(15,23,42,0.12)]'}`}>
                            <div
                                className={`relative overflow-hidden p-7 lg:p-8 ${isDayTime ? 'bg-slate-950/70' : 'bg-white/95'}`}>
                                <div
                                    className={`absolute inset-0 ${isDayTime ? 'bg-gradient-to-br from-cyan-500/12 via-transparent to-blue-500/12' : 'bg-gradient-to-br from-slate-900/[0.03] via-transparent to-slate-900/[0.05]'}`}/>
                                <div className="relative">
                                    <div className="flex flex-wrap items-center justify-between gap-3">
                                        <div
                                            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.24em] ${isDayTime ? 'border-cyan-400/20 bg-cyan-400/10 text-cyan-300' : 'border-slate-300 bg-slate-50 text-slate-700'}`}>
                                            <Wand2 className="h-3.5 w-3.5"/>
                                            Precision systems
                                        </div>
                                        <div
                                            className={`rounded-full border px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.2em] ${isDayTime ? 'border-white/10 text-slate-300' : 'border-slate-200 text-slate-600'}`}>
                                            Live production stack
                                        </div>
                                    </div>

                                    <div
                                        className={`mt-7 rounded-[1.5rem] border p-5 ${isDayTime ? 'border-white/10 bg-white/[0.04]' : 'border-slate-200 bg-slate-50/90'}`}>
                                        <div className="flex flex-wrap items-start justify-between gap-4">
                                            <div className="max-w-2xl">
                                                <p className={`text-[0.68rem] font-semibold uppercase tracking-[0.24em] ${isDayTime ? 'text-cyan-300/90' : 'text-slate-500'}`}>
                                                    Operational model
                                                </p>
                                                <h3 className={`mt-2 text-[1.14rem] font-[700] leading-[1.25] ${isDayTime ? 'text-white' : 'text-slate-950'}`}>
                                                    A premium execution framework for ambitious Unity products
                                                </h3>
                                                <p className={`mt-3 text-sm leading-[1.75] ${isDayTime ? 'text-slate-400' : 'text-slate-600'}`}>
                                                    We combine strategic direction, technical rigor, and production
                                                    discipline so
                                                    the experience feels deliberate at every stage, from concept
                                                    validation to
                                                    launch readiness.
                                                </p>
                                            </div>
                                            <div
                                                className={`rounded-full border px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.2em] ${isDayTime ? 'border-cyan-400/20 text-cyan-300' : 'border-slate-300 text-slate-700'}`}>
                                                Product-grade
                                            </div>
                                        </div>

                                        <div className="mt-6 grid gap-4 lg:grid-cols-2">
                                            {unlockCapabilities.map((item) => {
                                                const Icon = item.icon;
                                                return (
                                                    <FxFrame key={item.title} className="h-full">
                                                        <div
                                                            className={`h-full rounded-[1.2rem] border p-4 transition-all duration-300 hover:-translate-y-1 ${isDayTime ? 'border-white/10 bg-slate-950/70' : 'border-slate-200 bg-white'}`}>
                                                            <div
                                                                className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl ${isDayTime ? 'bg-cyan-400/10 text-cyan-300' : 'bg-slate-900 text-white'}`}>
                                                                <Icon className="h-5 w-5"/>
                                                            </div>
                                                            <h3 className={`mt-4 text-[1rem] font-[700] ${isDayTime ? 'text-white' : 'text-slate-950'}`}>
                                                                {item.title}
                                                            </h3>
                                                            <p className={`mt-2 text-sm leading-[1.7] ${isDayTime ? 'text-slate-400' : 'text-slate-600'}`}>
                                                                {item.description}
                                                            </p>
                                                        </div>
                                                    </FxFrame>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    <div
                                        className={`mt-6 rounded-[1.4rem] border p-5 ${isDayTime ? 'border-cyan-400/20 bg-cyan-400/10' : 'border-slate-200 bg-slate-50/90'}`}>
                                        <div className="flex flex-wrap items-start justify-between gap-4">
                                            <div className="flex items-start gap-3">
                                                <div
                                                    className={`flex h-11 w-11 items-center justify-center rounded-2xl ${isDayTime ? 'bg-slate-950/80 text-cyan-300' : 'bg-slate-900 text-white'}`}>
                                                    <Rocket className="h-5 w-5"/>
                                                </div>
                                                <div>
                                                    <p className={`text-[0.95rem] font-[700] ${isDayTime ? 'text-white' : 'text-slate-950'}`}>
                                                        Prototype velocity
                                                    </p>
                                                    <p className={`mt-1 text-sm leading-[1.7] ${isDayTime ? 'text-slate-300' : 'text-slate-600'}`}>
                                                        Rapid concept validation, focused playtesting, and
                                                        production-ready
                                                        handoff without compromising quality or momentum.
                                                    </p>
                                                </div>
                                            </div>
                                            <div
                                                className={`rounded-full border px-3 py-1.5 text-sm font-semibold ${isDayTime ? 'border-cyan-400/20 text-cyan-300' : 'border-slate-300 text-slate-700'}`}>
                                                1–3 weeks
                                            </div>
                                        </div>

                                        <div className="mt-5 grid gap-3 md:grid-cols-3">
                                            <div
                                                className={`rounded-2xl border px-3 py-3 ${isDayTime ? 'border-white/10 bg-slate-950/70 text-slate-200' : 'border-slate-200 bg-white text-slate-700'}`}>
                                                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em]">Concept
                                                    clarity</p>
                                                <p className="mt-1 text-sm">Tight scope and rapid validation loops</p>
                                            </div>
                                            <div
                                                className={`rounded-2xl border px-3 py-3 ${isDayTime ? 'border-white/10 bg-slate-950/70 text-slate-200' : 'border-slate-200 bg-white text-slate-700'}`}>
                                                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em]">System
                                                    integrity</p>
                                                <p className="mt-1 text-sm">Architecture designed to support scale</p>
                                            </div>
                                            <div
                                                className={`rounded-2xl border px-3 py-3 ${isDayTime ? 'border-white/10 bg-slate-950/70 text-slate-200' : 'border-slate-200 bg-white text-slate-700'}`}>
                                                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em]">Launch
                                                    confidence</p>
                                                <p className="mt-1 text-sm">Polished readiness for release</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-6 flex flex-wrap items-center gap-3">
                                        <Link href="/contact"
                                              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-transform duration-300 hover:-translate-y-0.5 ${isDayTime ? 'bg-cyan-400 text-slate-950' : 'bg-slate-900 text-white'}`}>
                                            Book a discovery call
                                            <ArrowRight className="h-4 w-4"/>
                                        </Link>
                                        <div
                                            className={`rounded-full border px-3 py-2 text-sm font-medium ${isDayTime ? 'border-white/10 text-slate-300' : 'border-slate-200 text-slate-600'}`}>
                                            Built for ambitious studios and product teams
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </FxHoloCard>
                    </FxReveal>
                </div>
            </section>

            {/* Reasons to partner with Graham Sobiribo Paul */}
            <section
                className={`relative overflow-hidden py-20 lg:py-24 ${isDayTime ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
                <div className="absolute inset-0 overflow-hidden">
                    <div
                        className={`absolute left-0 top-0 h-72 w-72 rounded-full blur-3xl ${isDayTime ? 'bg-cyan-400/20' : 'bg-cyan-500/15'}`}/>
                    <div
                        className={`absolute bottom-0 right-0 h-80 w-80 rounded-full blur-3xl ${isDayTime ? 'bg-blue-500/20' : 'bg-indigo-400/15'}`}/>
                    <div
                        className={`absolute inset-0 ${isDayTime ? 'bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.18),transparent_38%)]' : 'bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.12),transparent_38%)]'}`}/>
                    <div
                        className={`absolute inset-0 opacity-20 ${isDayTime ? 'bg-[linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)]' : 'bg-[linear-gradient(90deg,rgba(15,23,42,0.08)_1px,transparent_1px),linear-gradient(rgba(15,23,42,0.08)_1px,transparent_1px)]'} [background-size:22px_22px]`}/>
                </div>

                <div className="relative mx-auto max-w-full px-4 sm:px-6 lg:px-[4.6em]">
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                        <div className="max-w-3xl">
                            <div
                                className={`inline-flex w-fit items-center gap-2 rounded-full border px-4 py-2 text-[0.72em] font-semibold uppercase tracking-[0.24em] ${isDayTime ? 'border-cyan-400/20 bg-cyan-400/10 text-cyan-300' : 'border-slate-300 bg-white/70 text-slate-700'}`}>
                                <Sparkles className="h-3.5 w-3.5"/>
                                Strategic partnership architecture
                            </div>
                            <h2 className={`mt-6 text-3xl font-[700] leading-[1.05] tracking-tight md:text-4xl lg:text-[3.2rem] ${isDayTime ? 'text-white' : 'text-slate-950'}`}>
                                Reasons to partner with <span
                                className={`bg-gradient-to-r ${isDayTime ? 'from-cyan-300 via-blue-400 to-slate-100' : 'from-slate-700 via-slate-900 to-slate-950'} bg-clip-text text-transparent`}>Graham Sobiribo Paul</span>
                            </h2>
                            <p className={`mt-4 max-w-2xl text-[0.96rem] leading-[1.8] ${isDayTime ? 'text-slate-300' : 'text-slate-700'}`}>
                                We combine product thinking, engineering excellence, and launch discipline to create
                                Unity
                                experiences that are clear, resilient, and ready to scale.
                            </p>
                        </div>
                        <div
                            className={`rounded-full border px-4 py-2 text-sm font-medium ${isDayTime ? 'border-white/10 text-slate-300' : 'border-slate-200 text-slate-600'}`}>
                            Built for studios, founders, and growth teams
                        </div>
                    </div>

                    <div className="mt-12 flex flex-col gap-6 lg:flex-row lg:items-stretch">
                        <div className="order-2 w-full lg:order-1 lg:w-[42%] xl:w-[38%]">
                            <div className="space-y-3">
                                {reasons.map((reason, index) => {
                                    const isActive = index + 1 === activeIndex;
                                    return (
                                        <button
                                            key={reason.id}
                                            type="button"
                                            onClick={() => setActiveIndex(index + 1)}
                                            className={`w-full rounded-[1.35rem] border p-5 text-left transition-all duration-300 ${isActive
                                                ? isDayTime
                                                    ? 'border-cyan-400/30 bg-cyan-400/10 shadow-[0_20px_80px_rgba(34,211,238,0.14)]'
                                                    : 'border-slate-300 bg-white shadow-[0_20px_80px_rgba(15,23,42,0.08)]'
                                                : isDayTime
                                                    ? 'border-white/10 bg-white/[0.03] hover:border-cyan-400/20 hover:bg-white/[0.06]'
                                                    : 'border-slate-200 bg-white/70 hover:border-slate-300 hover:bg-white'}`}
                                        >
                                            <div className="flex items-start gap-4">
                                                <div
                                                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-sm font-semibold ${isActive
                                                        ? isDayTime
                                                            ? 'bg-cyan-400 text-slate-950'
                                                            : 'bg-slate-900 text-white'
                                                        : isDayTime
                                                            ? 'bg-white/[0.08] text-slate-300'
                                                            : 'bg-slate-100 text-slate-700'}`}>
                                                    0{index + 1}
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <div className="flex flex-wrap items-center justify-between gap-3">
                                                        <h3 className={`text-[1.02rem] font-[700] ${isActive ? (isDayTime ? 'text-white' : 'text-slate-950') : (isDayTime ? 'text-slate-200' : 'text-slate-700')}`}>
                                                            {reason.title}
                                                        </h3>
                                                        <span
                                                            className={`rounded-full px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] ${isActive
                                                                ? isDayTime
                                                                    ? 'bg-cyan-400/10 text-cyan-300'
                                                                    : 'bg-slate-900/5 text-slate-700'
                                                                : isDayTime
                                                                    ? 'bg-white/[0.06] text-slate-400'
                                                                    : 'bg-slate-100 text-slate-500'}`}>
                                                            {isActive ? 'Active focus' : 'Strategic lens'}
                                                        </span>
                                                    </div>
                                                    <p className={`mt-2 text-sm leading-[1.7] ${isDayTime ? 'text-slate-400' : 'text-slate-600'}`}>
                                                        {reason.summary}
                                                    </p>
                                                    <div className="mt-3 flex flex-wrap gap-2">
                                                        {reason.focusPoints?.map((point) => (
                                                            <span key={point}
                                                                  className={`rounded-full px-2.5 py-1 text-[0.64rem] font-semibold uppercase tracking-[0.18em] ${isDayTime ? 'bg-white/[0.06] text-slate-300' : 'bg-slate-100 text-slate-600'}`}>
                                                                {point}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="order-1 w-full lg:order-2 lg:w-[58%] xl:w-[62%]">
                            <FxReveal delay={0.08}>
                                <FxHoloCard day={isDayTime}
                                            className={`overflow-hidden rounded-[2rem] border p-0 ${isDayTime ? 'border-white/10 bg-slate-900/80 shadow-[0_30px_120px_rgba(2,8,23,0.5)]' : 'border-slate-200 bg-white/90 shadow-[0_25px_90px_rgba(15,23,42,0.12)]'}`}>
                                    <div
                                        className={`relative overflow-hidden p-6 lg:p-7 ${isDayTime ? 'bg-slate-950/70' : 'bg-white/95'}`}>
                                        <div
                                            className={`absolute inset-0 ${isDayTime ? 'bg-gradient-to-br from-cyan-500/12 via-transparent to-blue-500/12' : 'bg-gradient-to-br from-slate-900/[0.03] via-transparent to-slate-900/[0.05]'}`}/>
                                        <div className="relative">
                                            <div className="flex flex-wrap items-center justify-between gap-3">
                                                <div
                                                    className={`rounded-full border px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.24em] ${isDayTime ? 'border-cyan-400/20 text-cyan-300' : 'border-slate-300 text-slate-700'}`}>
                                                    Selected capability
                                                </div>
                                                <div
                                                    className={`rounded-full border px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.2em] ${isDayTime ? 'border-white/10 text-slate-300' : 'border-slate-200 text-slate-600'}`}>
                                                    {activeIndex}/6
                                                </div>
                                            </div>

                                            <div className="mt-6 grid gap-5 lg:grid-cols-[1fr,0.95fr]">
                                                <div className="flex flex-col justify-between">
                                                    <div>
                                                        <p className={`text-[0.68rem] font-semibold uppercase tracking-[0.24em] ${isDayTime ? 'text-cyan-300/90' : 'text-slate-500'}`}>
                                                            Current strategic lens
                                                        </p>
                                                        <h3 className={`mt-2 text-[1.28rem] font-[700] leading-[1.2] ${isDayTime ? 'text-white' : 'text-slate-950'}`}>
                                                            {reasons[activeIndex - 1]?.title}
                                                        </h3>
                                                        <p className={`mt-3 text-sm leading-[1.8] ${isDayTime ? 'text-slate-400' : 'text-slate-600'}`}>
                                                            {reasons[activeIndex - 1]?.summary}
                                                        </p>
                                                        <p className={`mt-3 text-sm leading-[1.8] ${isDayTime ? 'text-slate-300' : 'text-slate-700'}`}>
                                                            {reasons[activeIndex - 1]?.detail}
                                                        </p>
                                                    </div>
                                                    <div className="mt-5 flex flex-wrap gap-2">
                                                        {reasons[activeIndex - 1]?.focusPoints?.map((point) => (
                                                            <span key={point}
                                                                  className={`rounded-full px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.2em] ${isDayTime ? 'bg-white/[0.06] text-slate-300' : 'bg-slate-100 text-slate-700'}`}>
                                                                {point}
                                                            </span>
                                                        ))}
                                                    </div>
                                                    <div className="mt-5 flex flex-wrap gap-2">
                                                        <span
                                                            className={`rounded-full px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.2em] ${isDayTime ? 'bg-white/[0.06] text-slate-300' : 'bg-slate-100 text-slate-700'}`}>
                                                            Product clarity
                                                        </span>
                                                        <span
                                                            className={`rounded-full px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.2em] ${isDayTime ? 'bg-white/[0.06] text-slate-300' : 'bg-slate-100 text-slate-700'}`}>
                                                            Technical depth
                                                        </span>
                                                        <span
                                                            className={`rounded-full px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.2em] ${isDayTime ? 'bg-white/[0.06] text-slate-300' : 'bg-slate-100 text-slate-700'}`}>
                                                            Launch confidence
                                                        </span>
                                                    </div>
                                                </div>

                                                <div
                                                    className={`relative overflow-hidden rounded-[1.6rem] border ${isDayTime ? 'border-white/10' : 'border-slate-200'}`}>
                                                    {reasons[activeIndex - 1]?.images?.map((image, idx) => (
                                                        <Image
                                                            key={idx}
                                                            src={image}
                                                            alt={`Reason ${activeIndex} Image ${idx + 1}`}
                                                            width={1024}
                                                            height={583}
                                                            className="h-full min-h-[260px] w-full object-cover"
                                                        />
                                                    ))}
                                                    <div
                                                        className={`absolute inset-0 bg-gradient-to-t ${isDayTime ? 'from-slate-950/80 via-slate-950/20 to-transparent' : 'from-slate-950/70 via-slate-950/20 to-transparent'}`}/>
                                                    <div className="absolute bottom-0 left-0 right-0 p-4">
                                                        <div
                                                            className={`inline-flex rounded-full border px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.24em] ${isDayTime ? 'border-cyan-400/20 bg-cyan-400/10 text-cyan-300' : 'border-slate-300 bg-white/70 text-slate-700'}`}>
                                                            Studio-grade visibility
                                                        </div>
                                                        <p className={`mt-3 text-sm leading-[1.7] ${isDayTime ? 'text-slate-200' : 'text-slate-700'}`}>
                                                            Every engagement is shaped around clarity, precision, and
                                                            confident delivery.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div
                                                className={`mt-6 rounded-[1.4rem] border p-4 ${isDayTime ? 'border-white/10 bg-white/[0.04]' : 'border-slate-200 bg-slate-50/90'}`}>
                                                <AnimatePresence mode="wait">
                                                    <motion.div
                                                        key={reasons[activeIndex - 1]?.id}
                                                        initial={{opacity: 0, y: 12}}
                                                        animate={{opacity: 1, y: 0}}
                                                        exit={{opacity: 0, y: -12}}
                                                        transition={{duration: 0.35, ease: 'easeOut'}}
                                                        className={`text-sm leading-[1.8] ${isDayTime ? 'text-slate-300' : 'text-slate-700'}`}
                                                    >
                                                        {reasons[activeIndex - 1]?.description}
                                                    </motion.div>
                                                </AnimatePresence>
                                            </div>
                                        </div>
                                    </div>
                                </FxHoloCard>
                            </FxReveal>
                        </div>
                    </div>

                    <div
                        className={`mt-10 rounded-[2rem] border p-6 lg:p-8 ${isDayTime ? 'border-white/10 bg-white/[0.04]' : 'border-slate-200 bg-white/80'}`}>
                        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                            <div>
                                <p className={`text-[0.7rem] font-semibold uppercase tracking-[0.24em] ${isDayTime ? 'text-cyan-300/90' : 'text-slate-500'}`}>
                                    Ready for a sharper delivery experience?
                                </p>
                                <h3 className={`mt-2 text-[1.45rem] font-[700] leading-[1.15] ${isDayTime ? 'text-white' : 'text-slate-950'}`}>
                                    Let’s create a Unity product experience that feels designed, not improvised.
                                </h3>
                            </div>
                            <Link href="/contact"
                                  className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-transform duration-300 hover:-translate-y-0.5 ${isDayTime ? 'bg-cyan-400 text-slate-950' : 'bg-slate-900 text-white'}`}>
                                Start the conversation
                                <ArrowRight className="h-4 w-4"/>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Who is involved — Expert Unity development teams */}
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
                                    Every successful project starts with a thoughtful discovery phase. We engage closely with your key stakeholders—executives, IT leaders, project sponsors, and end-users—to align on business goals, clarify priorities, and uncover essential insights that shape the direction of the solution.
                                </p>

                                <p className='text-[0.92em] font-[400] mt-4 text-justify leading-[1.6]'>
                                    Our team—typically including a business analyst, product and project managers, <Link href={'/services/ui-ux-design'}
                                                    className={`border-b pb-[0.02em] ${
                                                        isDayTime ? 'border-gray-500 hover:border-black' : 'border-gray-500 hover:border-white'
                                                    }`}>UX/UI designer</Link>, and technical leads—works to understand your requirements, assess technical feasibility, and define the right approach. By fostering close collaboration early, we reduce risk, streamline development, and create a clear path forward.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    {
                                        role: 'Unity Architect',
                                        desc: 'Defines game structure, performance targets, and technical roadmap'
                                    },
                                    {
                                        role: 'Project Manager',
                                        desc: 'Coordinates delivery, client sync, and milestone tracking'
                                    },
                                    {
                                        role: 'UI/UX Designers',
                                        desc: 'Game design, accessibility, interactive prototypes'
                                    },
                                    {role: 'Unity Engineers', desc: 'C# implementation, engine optimization, performance tuning'},
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

export default UnityDevelopment;


