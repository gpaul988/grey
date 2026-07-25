'use client';

import React, {useEffect, useRef, useState} from 'react';
import '@/app/globals.css'
import Image from "next/image";
import ResponsiveVideoHero from '@/components/ResponsiveVideoHero';
import Link from 'next/link';
import {AnimatePresence, motion} from "framer-motion";
import {useIsDayTime} from '../../components/useIsDayTime';

import FuturisticServiceLayout from '@/components/futuristic/FuturisticServiceLayout';

import {FxBackground, FxChip, FxReveal, FxButton, FxHoloCard, FxStickyScrollSection} from '@/components/futuristic/fx';
// Reasons
const reasons = [
    {
        id: 1,
        title: 'Experience Meets Innovation',
        description: (
            <>
                Our team comprises seasoned professionals who have refined their skills through years of real-world,
                hands-on experience. This depth of expertise means you gain more than just technical capability -you
                benefit from strategic insight and a problem-solving mindset that only comes from experience. We
                understand the Unity engine inside and out, enabling us to maximise its capabilities and push creative
                and technical boundaries. Whether itâ€™s developing high-performance games, immersive VR experiences, or
                scalable multiplayer systems, we deliver solutions that are not only innovative but also commercially
                viable in todayâ€™s competitive gaming landscape.
            </>
        ),
        images: ['/assets/unity/exp.jpg']
    },
    {
        id: 2,
        title: 'Creating Outstanding Games',
        description: (
            <>
                With Grey InfoTech as your partner, you gain access to a deep well of technical expertise, creative
                innovation, and global industry insight. We collaborate closely with you to transform your ideas into
                games that donâ€™t just meet expectations -they exceed them. Our goal is to deliver experiences that
                captivate users and drive commercial success, setting new benchmarks for quality and performance in the
                gaming world.
            </>
        ),
        images: ['/assets/unity/creat.jpg']
    },
    {
        id: 3,
        title: 'Mastery Of Unity Technologies',
        description: (
            <>
                Our deep expertise in Unity technologies allows us to fully harness its capabilities -from delivering
                stunning visuals to optimising game performance. We leverage Unityâ€™s robust features to craft engaging,
                scalable, and high-performing games that align with your goals. With Grey InfoTech, your vision is
                transformed into a seamless, immersive experience that exceeds expectations and drives results.
            </>
        ),
        images: ['/assets/unity/mast.jpg']
    },
    {
        id: 4,
        title: 'An Array Of Opportunities',
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
            tags: ['2D game development','Platformers','Educational'],
            body: (
                <div>
                    <p>
                        We specialise in building high-quality 2D Unity titles for entertainment and educational use-cases. From retro-inspired platformers to interactive storytelling, these experiences are optimised for performance and player engagement.
                    </p>
                </div>
            ),
            metrics: [{label: 'Prototype Velocity', value: '1â€“3 weeks'}],
            deliverables: ['Playable prototype','Art & animation pipelines','Performance budget']
        },
        {
            id: '02',
            title: '3D Unity Games',
            target: '3D',
            tags: ['3D engines','Open world','RPG'],
            body: (
                <div>
                    <p>
                        Full-stack 3D development combining advanced rendering, physics and narrative design. Optimised for multi-platform deployment, from mobile to consoles and PC.
                    </p>
                </div>
            ),
            metrics: [{label: 'Average Uptime', value: '99.95%'}],
            deliverables: ['Engine & systems design','Performance profiling','Cross-platform builds']
        },
        {
            id: '03',
            title: 'Mobile Games',
            target: 'MG',
            tags: ['iOS','Android','Monetisation'],
            body: (<div><p>Cross-platform mobile games engineered for retention and monetisation with platform-specific optimisation and store readiness.</p></div>),
            deliverables: ['Device-specific optimisation','App Store/Play Store readiness']
        },
        {
            id: '04',
            title: 'Web-Based Games',
            target: 'WBG',
            tags: ['WebGL','Browser-first','Progressive'],
            body: (<div><p>Web-targeted experiences with progressive enhancement and fast load times, suitable for marketing and social distribution.</p></div>),
            deliverables: ['WebGL builds','Hosting guidance','CDN optimisation']
        },
        {
            id: '05',
            title: 'Immersive Experiences',
            target: 'IE',
            tags: ['XR','Training','Simulations'],
            body: (<div><p>AR/VR solutions for training, visualization and immersive storytelling with an emphasis on usability and measurable outcomes.</p></div>),
            deliverables: ['XR prototype','Interaction design','Hardware recommendations']
        },
        {
            id: '06',
            title: 'Elevate The Gaming Experience',
            target: 'EGE',
            tags: ['Innovation','VR/AR','Immersion'],
            body: (<div><p>Advanced sensory design and systems work that enhances player presence, retention and long-term engagement.</p></div>),
            deliverables: ['Experience design','Audio & haptics integration']
        },
        {
            id: '07',
            title: 'Unlocking New Realities',
            target: 'UNR',
            tags: ['Future tech','Scale','Integration'],
            body: (<div><p>Strategic projects combining cutting-edge tech and pragmatic engineering to open new business opportunities.</p></div>),
        },
        {
            id: '08',
            title: 'Enhancing Gameplay, Creating Presence',
            target: 'EGCP',
            tags: ['Immersion','Design','Retention'],
            body: (<div><p>Focused on player immersion through visual fidelity, sound design and responsive mechanics to drive deeper engagement.</p></div>),
        },
        {
            id: '09',
            title: 'Virtual & Augmented Reality',
            target: 'VRAR',
            tags: ['VR','AR','Spatial UX'],
            body: (<div><p>End-to-end VR/AR development, from prototypes to production, with hardware-aware optimisation and robust sync systems.</p></div>),
            deliverables: ['Prototype','XR performance report']
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

    return (
        <div className={`${isDayTime ? 'bg-white' : 'bg-black'} min-h-screen`}>

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
                                From high-performance multiplayer systems to photoreal visuals and XR experiences â€” Grey
                                InfoTech
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
                                        <span className="relative">Start a project â†’</span>
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

            {/* Introductory section â€” ERP-styled (from UI/UX) */}
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
                                                        <span className='text-cyan-400 font-bold mt-0.5'>â€¢</span>
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
                                            value: '1â€“3 weeks',
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
            <section id={'top'} className={'relative lg:max-w-full w-full py-16 mx-auto h-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em]'}>
                <div className={'relative grid lg:grid-cols-2 grid-cols-1 gap-6 items-start'}>
                    {/* Left: KPI / Mini-cards (visible on lg) */}
                    <div className={'hidden lg:block pr-6'}>
                        <div className={'rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm'}>
                            <div className="text-[0.72em] uppercase tracking-[0.28em] text-cyan-300/80">Showcase</div>
                            <h4 className={'text-[1.6em] font-[600] mt-2 mb-3'}>Realtime scenes â€¢ Production-ready</h4>
                            <p className={'text-sm text-slate-300 mb-4'}>A curated gallery of realtime experiences, lighting & rendering pipelines, and systems engineered for performance and scale.</p>

                            <div className="grid gap-2 sm:grid-cols-2">
                                {[
                                    {label: 'Rendering', value: 'Physically-based'},
                                    {label: 'Networking', value: 'Authoritative'},
                                    {label: 'Optimization', value: 'LOD & Baking'},
                                    {label: 'Tooling', value: 'Profiling & CI'}
                                ].map((item) => (
                                    <div key={item.label} className="rounded-2xl border border-white/10 bg-white/6 px-4 py-3">
                                        <div className="text-[0.58em] uppercase tracking-[0.3em] text-teal-300/80">{item.label}</div>
                                        <div className="mt-1 text-[1.05em] font-[600] text-white">{item.value}</div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 grid gap-3 sm:grid-cols-2">
                                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                                    <div className="text-[0.72em] uppercase tracking-[0.28em] text-teal-300">Realtime 3D</div>
                                    <div className="mt-2 text-sm text-white/80">Interactive scenes & shader-driven visuals.</div>
                                </div>
                                <div className="rounded-2xl border border-teal-400/10 bg-white/[0.03] p-3">
                                    <div className="text-[0.72em] uppercase tracking-[0.28em] text-teal-300">Multiplayer</div>
                                    <div className="mt-2 text-sm text-white/80">Authoritative servers & deterministic sync.</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Gallery */}
                    <div className={'relative z-10 mt-8 grid gap-4 lg:grid-cols-[1.35fr_0.9fr]'}>
                        <div className={'group relative overflow-hidden rounded-[1.6rem] border border-white/10 h-[320px] sm:h-[420px] lg:h-[540px]'}>
                            <Image
                                src={'/assets/unity/1.jpg'}
                                alt={'Unity architecture showcase'}
                                fill
                                className={'object-cover transition-transform duration-700 group-hover:scale-105'}
                            />
                            <div className={'absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(2,6,23,0.2)_40%,rgba(2,6,23,0.88)_100%)]'} />
                            <div className="absolute inset-0 border border-white/10"/>
                            <div className="absolute left-4 top-4 rounded-full border border-teal-400/30 bg-black/30 px-3 py-1 text-[0.62em] uppercase tracking-[0.3em] text-teal-300">01 / Realtime</div>
                            <div className="absolute bottom-4 left-4 right-4">
                                <p className="text-[0.62em] uppercase tracking-[0.3em] text-teal-300 font-[600]">Realtime Rendering</p>
                                <p className="mt-2 max-w-xl text-sm sm:text-base text-white/90">High-fidelity realtime scenes with scalable lighting and shader systems.</p>
                            </div>
                        </div>

                        <div className="grid gap-4">
                            <div className="group relative overflow-hidden rounded-[1.35rem] border border-white/10 h-[250px] sm:h-[260px] lg:h-[260px]">
                                <Image
                                    src={'/assets/unity/2.jpg'}
                                    alt={'Unity UI detail showcase'}
                                    fill
                                    className={'object-cover transition-transform duration-700 group-hover:scale-105'}
                                />
                                <div className={'absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(2,6,23,0.16)_55%,rgba(2,6,23,0.78)_100%)]'} />
                                <div className={'absolute inset-0 border border-white/10'} />
                                <div className={'absolute left-3 top-3 rounded-full border border-white/15 bg-black/20 px-2.5 py-1 text-[0.56em] uppercase tracking-[0.28em] text-teal-200'}>02 / UI</div>
                            </div>

                            <div className={'group relative overflow-hidden rounded-[1.35rem] border border-white/10 h-[250px] sm:h-[260px] lg:h-[260px]'}>
                                <Image
                                    src={'/assets/unity/3.jpg'}
                                    alt={'Unity workflow showcase'}
                                    fill
                                    className={'object-cover transition-transform duration-700 group-hover:scale-105'}
                                />
                                <div className={'absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(2,6,23,0.16)_55%,rgba(2,6,23,0.78)_100%)]'} />
                                <div className={'absolute inset-0 border border-white/10'} />
                                <div className={'absolute left-3 top-3 rounded-full border border-white/15 bg-black/20 px-2.5 py-1 text-[0.56em] uppercase tracking-[0.28em] text-teal-200'}>03 / Workflow</div>
                            </div>
                        </div>

                        <div className={'group relative overflow-hidden rounded-[1.6rem] border border-white/10 h-[240px] sm:h-[260px] lg:h-[260px] lg:col-span-2'}>
                            <Image
                                src={'/assets/unity/4.jpg'}
                                alt={'Unity product experience showcase'}
                                fill
                                className={'object-cover transition-transform duration-700 group-hover:scale-105'}
                            />
                            <div className={'absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(2,6,23,0.1)_35%,rgba(2,6,23,0.82)_100%)]'} />
                            <div className={'absolute inset-0 border border-white/10'} />
                            <div className={'absolute left-3 top-3 rounded-full border border-teal-400/30 bg-black/30 px-2.5 py-1 text-[0.56em] uppercase tracking-[0.28em] text-teal-300'}>04 / Experience</div>
                            <div className={'absolute bottom-4 left-4 right-4'}>
                                <p className={'text-white/90 text-sm sm:text-base'}>Premium, optimized product experiences built for production deployment.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Unity Development Solutions */}
            <FxStickyScrollSection
                day={isDayTime}
                heading={<>Our Unity<br/>development solutions</>}
                intro={"At Grey InfoTech, we use Unity to build immersive, cross-platform applications and games that support real business goals — from user engagement to training, marketing, or product innovation. Our teams combine creative design with engineering rigour to deliver production-ready systems at speed."}
                navLabel={"Unity Solutions"}
                activeId={activeId}
                onNavClickAction={scrollToSection}
                items={unityItems}
            />
{/* Mid image*/}
            <div id={'mid image'} className={'h-auto max-w-full w-full mx-auto'}>
                <Image
                    className={' object-fill'}
                    src={'/assets/unity/ani.jpg'}
                    alt={'Middle Image'}
                    width={2560}
                    height={1440}
                    style={{
                        objectFit: "fill",
                        objectPosition: "center",
                    }}
                />
            </div>

            {/* The benefits of Unity game development services */}
            <div
                className={`relative max-w-full w-full py-16 lg:mt-[3em] md:mt-[3em] mx-auto h-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em]`}>
                <div
                    className={`relative grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-4 border-b-[1px] lg:pb-[3em] pb-[2em] ${isDayTime ? 'text-black' : 'text-white'}`}>
                    <div>
                        <h2 className='lg:text-[3em] capitalize md:text-[2em] sm:text-[1em] font-[500] justify-center tracking-tight leading-[1.2]'>
                            The benefits <br className={'lg:block md:block hidden'}/>of Unity game <br
                            className={'lg:block md:block hidden'}/>development services
                        </h2>
                    </div>
                    <div>
                        <p className='text-[0.87em] font-[300] justify-center tracking-normal text-justify leading-[1.3] lg:-ml-[1.2em] md:-ml-[1.2em]'>
                            Unity is a leading choice in game development, renowned for its versatility and
                            comprehensive feature set. It combines a user-friendly interface with powerful scripting
                            capabilities and cross-platform support, enabling developers to build and deploy games
                            efficiently. The Unity Asset Store offers a vast library of ready-made assets and plugins,
                            streamlining production and reducing development time. Real-time previews, advanced graphics
                            rendering, and a strong developer community further contribute to its appeal. With the
                            ability to export to mobile, console, and PC platforms, Unity empowers developers to reach a
                            wide audience, solidifying its position as a top-tier game engine.
                        </p>
                    </div>
                </div>
                <div
                    className='relative grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 lg:gap-[6em] gap-4 lg:mb-8 mb-8'>
                    <div className={`mt-12 ${isDayTime ? 'text-black' : 'text-white'}`}>
                        <Image
                            src={isDayTime ? '/assets/unity/icon/cross.svg' : '/assets/unity/icon/cross1.svg'}
                            alt='Cross-platform games development'
                            width={60}
                            height={60}
                            className='mb-2'
                        />
                        <h3 className='capitalize text-[1.5em] leading-[1.2] font-[600] mb-2'>
                            Cross-platform <br className={'lg:block md:block hidden'}/>games development
                        </h3>
                        <p className='text-justify text-[0.85em] font-[400]'>
                            Unityâ€™s support for over 25 platforms allows developers to build once and deploy across
                            mobile, desktop, console, web, and AR/VR devices -maximising reach and revenue potential.
                            With flexible plans like Unity Personal, Pro, and Enterprise, businesses of all sizes can
                            access the tools they need at the right scale. The Unity Asset Store further accelerates
                            development with a vast library of ready-to-use assets and tools, helping teams reduce costs
                            and speed up time-to-market. For companies aiming to deliver engaging, cross-platform
                            experiences efficiently, Unity offers a robust and scalable solution.
                        </p>
                    </div>
                    <div className={`mt-12 ${isDayTime ? 'text-black' : 'text-white'}`}>
                        <Image
                            src={isDayTime ? '/assets/unity/icon/mult.svg' : '/assets/unity/icon/mult1.svg'}
                            alt='Multiplayer Support'
                            width={60}
                            height={60}
                            className='mb-2'
                        />
                        <h3 className='capitalize text-[1.5em] font-[600] mb-2'>
                            Multiplayer support
                        </h3>
                        <p className='text-justify text-[0.85em] font-[400]'>
                            Unityâ€™s robust multiplayer capabilities empower developers to build scalable,
                            high-performance systems that connect players in real-time across the globe. With built-in
                            support for cross-platform play, Unity enables seamless interaction between users on mobile,
                            PC, consoles, and web -creating a unified and inclusive gaming ecosystem. More than just
                            connectivity, Unityâ€™s multiplayer tools are designed to enhance player engagement by
                            fostering collaboration, competition, and lasting community bonds. For businesses, this
                            translates into higher user retention, increased monetisation opportunities, and a broader
                            market reach.
                        </p>
                    </div>
                    <div className={`mt-12 ${isDayTime ? 'text-black' : 'text-white'}`}>
                        <Image
                            src={isDayTime ? '/assets/unity/icon/acc.svg' : '/assets/unity/icon/acc1.svg'}
                            alt='Accelerated games development'
                            width={60}
                            height={60}
                            className='mb-2'
                        />
                        <h3 className='capitalize text-[1.5em] leading-[1.2] font-[600] mb-2'>
                            Accelerated game <br className={'lg:block md:block hidden'}/>development </h3>
                        <p className='text-justify text-[0.85em] font-[400]'>
                            Unity streamlines the entire game development lifecycle, enabling creators to move rapidly
                            from concept to launch with maximum efficiency. Its powerful engine, intuitive interface,
                            and comprehensive suite of development tools help reduce production time while maintaining
                            high performance and visual quality. Whether building casual mobile games or complex,
                            AAA-style experiences, Unity supports all genres and scales, making it an ideal solution for
                            businesses looking to accelerate time-to-market and maximise ROI without compromising on
                            creativity or functionality.
                        </p>
                    </div>
                    <div className={`mt-12 ${isDayTime ? 'text-black' : 'text-white'}`}>
                        <Image
                            src={isDayTime ? '/assets/unity/icon/mult.svg' : '/assets/unity/icon/mult1.svg'}
                            alt='AR & VR Support'
                            width={60}
                            height={60}
                            className='mb-2'
                        />
                        <h3 className='capitalize text-[1.5em] font-[600] mb-2'>
                            AR & VR support</h3>
                        <p className='text-justify text-[0.85em] font-[400]'>
                            Unity leads the way in AR and VR game development, providing advanced tools and workflows
                            that empower developers to build rich, immersive experiences across industries. With over
                            60% of AR and VR content powered by Unity 3D, the platform stands as a market leader in
                            shaping the future of interactive technology. Its real-time rendering capabilities,
                            cross-platform support, and robust development ecosystem enable businesses to create
                            cutting-edge applications -from immersive training simulations and virtual showrooms to
                            next-generation gaming -helping them stay ahead in a rapidly evolving digital landscape.
                        </p>
                    </div>
                    <div className={`mt-12 ${isDayTime ? 'text-black' : 'text-white'}`}>
                        <Image
                            src={isDayTime ? '/assets/unity/icon/enh.svg' : '/assets/unity/icon/enh1.svg'}
                            alt='Enhanced Customisation'
                            width={60}
                            height={60}
                            className='mb-2'
                        />
                        <h3 className='capitalize text-[1.5em] font-[600] mb-2'>
                            Enhanced customisation</h3>
                        <p className='text-justify text-[0.85em] font-[400]'>
                            Unityâ€™s flexibility empowers developers to fully customise games and interactive experiences
                            to align with their creative and strategic vision. Whether fine-tuning physics engines for
                            realistic gameplay, designing bespoke shaders for unique visual styles, or integrating
                            third-party plugins to extend functionality, Unity provides the freedom and control required
                            for innovation. This adaptability makes it the ideal choice for businesses seeking tailored
                            game development solutions that stand out in a competitive market while delivering precise,
                            high-quality results.
                        </p>
                    </div>
                    <div className={`mt-12 ${isDayTime ? 'text-black' : 'text-white'}`}>
                        <Image
                            src={isDayTime ? '/assets/unity/icon/cost.svg' : '/assets/unity/icon/cost1.svg'}
                            alt='Cost Efficiency For Development'
                            width={60}
                            height={60}
                            className='mb-2'
                        />
                        <h3 className='capitalize text-[1.5em] leading-[1.2] font-[600] mb-2'>
                            Cost-efficiency <br className={'lg:block md:block hidden'}/>for development</h3>
                        <p className='text-justify text-[0.85em] font-[400]'>
                            Unity offers cost-effective development solutions that are especially beneficial for
                            startups and small to medium-sized teams. With flexible licensing options like Unity
                            Personal, and access to a vast Asset Store filled with ready-made assets, tools, and
                            templates, developers can significantly reduce production costs without compromising on
                            quality. This allows businesses to focus their resources on creativity, rapid prototyping,
                            and innovation, ensuring faster time to market and better return on investment.
                        </p>
                    </div>
                </div>
            </div>

            {/* Unlocking tomorrowâ€™s gaming possibilities today */}
            <div id={'unlocking'} className={`relative ${isDayTime ? 'bg-black' : 'bg-white'}`}>
                <div
                    className={`relative grid lg:grid-cols-2 grid-cols-1 lg:gap-14 gap-6 lg:max-w-[90em] py-14 mx-auto px-4 sm:px-6 lg:px-[4.6em] ${isDayTime ? 'text-white' : 'text-black'}`}>
                    <div>
                        <h2 className={'lg:text-[3em] text-[1.5em] font-[500] tracking-tight leading-[1.1] lg:pb-6 capitalize'}>
                            unlocking <br className={'lg:block md:block hidden'}/>gaming potential<br
                            className={'lg:block md:block hidden'}/>of tomorrow now
                        </h2>
                    </div>
                    <div className='lg:-ml-[3.5em]'>
                        <p className='text-[0.873em] font-[400] lg:-mt-[0.2em] text-justify leading-[1.5]'>
                            In the dynamic world of Unity game development, the future is already unfolding -and at Grey
                            InfoTech, we&#39;re here to help you lead it. Whether you&#39;re building cross-platform
                            games,
                            immersive VR/AR experiences, or exploring the Metaverse, we combine technical expertise with
                            creative vision to bring your ideas to life. Our tailored development solutions are designed
                            to help you break into new markets, captivate users, and build lasting digital experiences
                            across mobile, console, and web platforms. With Unityâ€™s powerful engine and flexible
                            toolset, we accelerate time-to-market while ensuring high performance and visual fidelity.
                            As your strategic development partner, weâ€™re invested in your success -helping you unlock
                            new
                            business opportunities, outpace the competition, and shape the future of interactive media.
                        </p>
                    </div>
                </div>
            </div>

            {/* Reasons to partner with Grey InfoTech */}
            <div className={`${isDayTime ? 'bg-gray-50' : 'bg-gray-950'}`}>
                <div
                    className={`relative lg:pt-32 lg:pb-14 px-4 sm:px-6 lg:px-[4.6em] w-full max-w-full lg:mb-20 mb-12 ${
                        isDayTime ? 'text-black' : 'text-white'}`}>
                    <div
                        className={`relative lg:max-w-full mx-auto border-b-[0.001em] pb-2`}>
                        <h2 className='lg:text-[3em] text-[1.5em] font-[600] tracking-tight leading-[1.1] lg:pb-6'>
                            Reasons to partner <br className={'lg:block md:block hidden'}/>with Grey InfoTech
                        </h2>
                    </div>
                    <div
                        className='relative lg:mt-[6em] md:mt-[6em] mt-[3em]mx-auto px-4 grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:gap-14 gap-6 lg:mb-24'>
                        {/* Left Section */}
                        <div
                            className={`relative text-[0.873em] lg:leading-[1.5] ${isDayTime ? 'text-black' : 'text-white'} flex flex-col justify-center mb-4`}>
                            {reasons.map((reason, index) => (
                                <div
                                    key={reason.id}
                                    className={`relative mb-6 ${
                                        index + 1 === activeIndex
                                            ? isDayTime
                                                ? 'bg-gray-50 py-5'
                                                : 'bg-gray-950 py-5'
                                            : ''
                                    }`}
                                >
                                    <h3
                                        className={`relative leading-[1.2] lg:text-[1.5em] md:text-[1.5em] text-[1em] mb-4 font-[600] cursor-pointer transition-all ${
                                            index + 1 === activeIndex
                                                ? isDayTime
                                                    ? 'text-black font-[600]'
                                                    : 'text-white font-[600]'
                                                : 'text-gray-500'
                                        }`}
                                        onClick={() => setActiveIndex(index + 1)}
                                    >
                                        {reason.title}
                                    </h3>
                                    <div className={'lg:pr-[9.3em] md:pr-[9.3em]'}>
                                        <AnimatePresence mode="wait">
                                            {index + 1 === activeIndex && (
                                                <motion.div
                                                    key={reason.id}
                                                    initial={{opacity: 0, y: -20}}
                                                    animate={{opacity: 1, y: 0}}
                                                    exit={{opacity: 0, y: -20}}
                                                    transition={{duration: 0.5, ease: "easeInOut"}}
                                                    className={`relative text-justify inline-block ${
                                                        isDayTime ? 'text-black font-[300]' : 'text-white font-[300]'
                                                    }`}
                                                >
                                                    {reason.description}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* Right Section */}
                        <div className='lg:mt-[2em] md:mt-[2em] h-auto w-full max-w-full sticky'>
                            {reasons[activeIndex - 1]?.images?.map((image, idx) => (
                                <Image
                                    key={idx}
                                    src={image}
                                    alt={`Reason ${activeIndex} Image ${idx + 1}`}
                                    width={1024}
                                    height={583}
                                    className="mb-4 object-cover"
                                />
                            ))}
                        </div>
                    </div>
                    <div
                        className={`items-center ${isDayTime ? 'text-black' : 'text-white'} justify-center`}>
                        <h2 className='lg:text-[3em] text-[1.5em] font-[600] tracking-tighter leading-[1.1] pb-6 text-center'>
                            Ready to start the <br className={'lg:block md:block hidden'}/>conversation?
                        </h2><br/>
                        <Link href='/contact' className='flex items-center justify-center-safe text-center'>
                            <button
                                className='relative mx-auto inline-flex items-center justify-start overflow-hidden group w-fit text-[0.85em] border tracking-tighter rounded-full py-2 px-6'>
                        <span
                            className={`w-32 h-32 rotate-45 translate-x-[4em] -translate-y-[2.8em] absolute left-0 top-0 ${isDayTime ? 'bg-white' : 'bg-black'} opacity-[100%]`}></span>
                                <span
                                    className={`absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-90 -translate-x-56 -translate-y-24 ${isDayTime ? 'bg-black' : 'bg-white'} opacity-100 group-hover:-translate-x-8`}></span>
                                <span
                                    className={`relative w-full text-left text-black ${isDayTime ? 'text-black group-hover:text-white' : 'text-white group-hover:text-black'} transition-colors duration-200 ease-in-out`}>Get
                                started <span className={`text-[1.5em] leading-[0.7]`}> â†’</span></span>
                                <span className="absolute inset-0 rounded-full "></span>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Who is involved in the process */}
            <div id={'involved'}
                 className={`relative py-16 px-4 sm:px-6 lg:px-[4.6em] w-full max-w-full lg:mb-10 mb-8 ${
                     isDayTime ? 'text-black' : 'text-white'}`}>
                <div
                    className={`relative grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-6 lg:max-w-full mx-auto`}>
                    <div className={'lg:mr-[8em]'}>
                        <h2 className='lg:text-[3em] md:text-[3em] capitalize text-[1.5em] font-[500] tracking-tighter leading-[1.15] lg:pb-6 '>
                            who is involved <br className={'lg:block md:block hidden'}/>in the process
                        </h2>
                        <p className='text-[0.85em] font-[400] lg:-mt-[0.2em] md:-mt-[0.2em] text-justify  leading-[1.5]'>
                            Every successful project starts with a thoughtful discovery phase. We engage closely with
                            your key stakeholders -executives, IT leaders, project sponsors, and end-users -to align on
                            business goals, clarify priorities, and uncover essential insights that shape the direction
                            of the solution.<br/><br/>
                            Our team -typically including a business analyst, product and project
                            managers, <Link href={'/services/ui-ux-design'}
                                            className={`border-b pb-[0.02em] ${
                                                isDayTime ? 'border-gray-500 hover:border-black' : 'border-gray-500 hover:border-white'
                                            }`}>UX/UI designer</Link>, and technical leads -works to understand your
                            requirements, assess technical feasibility, and define the right approach. This ensures
                            weâ€™re solving the right problems in the most effective way.<br/><br/>By fostering close
                            collaboration early, we reduce risk, streamline development, and create a clear path
                            forward. This process sets the foundation for delivering a product that is strategically
                            aligned, user-centered, and technically sound.
                        </p>
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
                                    objectPosition: "center",
                                }}
                                className="object-fill"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UnityDevelopment;


