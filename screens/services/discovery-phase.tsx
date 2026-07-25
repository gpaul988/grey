'use client';

import React, {useEffect, useRef, useState} from 'react';
import Image from "next/image";
import ResponsiveVideoHero from '@/components/ResponsiveVideoHero';
import ServiceHero from '@/components/futuristic/ServiceHero';
import ServiceCapabilities from '@/components/futuristic/ServiceCapabilities';
import Link from "next/link";
import {AiFillCaretDown, AiFillCaretUp, AiOutlineMinus, AiOutlinePlus} from "react-icons/ai";
import CountUp from "react-countup";
import {useIsDayTime} from '../../components/useIsDayTime';

import FuturisticServiceLayout from '@/components/futuristic/FuturisticServiceLayout';

import { FxBackground, FxChip, FxReveal, FxButton, FxHoloCard, FxFrame, FxStickyScrollSection } from '@/components/futuristic/fx';

const DiscoveryPhase = () => {
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
            "URED",
            "CRA",
            "PV",
            "BA",
            "TFA",
            "PR",
            "PPE",
            "SHA",
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

    // Our Discovery Process Hook
    const imageIds: string[] = [
        "Initial Meeting",
        "Workshops",
        "Follow-up Meetings",
        "Write-up & Presentation",
    ];

    const handleScrollStages = () => {
        for (const imageId of imageIds) {
            const textElement = document.getElementById(imageId); // Corresponding text element
            const imageElement = document.getElementById(imageId); // Corresponding image element

            if (textElement && imageElement) {
                const textRect = textElement.getBoundingClientRect();
                const screenCenter = window.innerHeight / 2; // Center of the screen

                // Check if the text is centered on the screen
                if (textRect.top <= screenCenter && textRect.bottom >= screenCenter) {
                    setActiveId(imageId); // Set activeId when the text is centered
                    break;
                }
            }
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScrollStages);
        return () => {
            window.removeEventListener("scroll", handleScrollStages);
        };
    }, []);

    // Sticky menu hook
    useEffect(() => {
        const handleScroll = () => {
            const stagesSection = document.getElementById('stages');
            const involvedSection = document.getElementById('involved');

            if (stagesSection && involvedSection) {
                const stagesRect = stagesSection.getBoundingClientRect();
                const involvedRect = involvedSection.getBoundingClientRect();

                // Make sticky menu visible only within the "services-section"
                setIsVisible(
                    stagesRect.top <= window.innerHeight &&
                    stagesRect.bottom >= 0 &&
                    involvedRect.top >= window.innerHeight
                );
            } else {
                console.warn('Sections not found in DOM');
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Discovery Process Deliverables Hook
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

            {/* Unified Futuristic Discovery Phase Hero - Background Image/Video with overlay */}
            <section className="relative overflow-hidden lg:w-full lg:min-h-[90vh] lg:h-[720px] w-full h-[600px]">
                {/* Video Background (desktop) and Image fallback (mobile) */}
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="hidden lg:block absolute inset-0 w-full h-full object-cover"
                    poster="/assets/disc/hero.jpg"
                >
                    <source src="/assets/disc/hero.mp4" type="video/mp4"/>
                </video>

                <Image
                    src="/assets/disc/hero.jpg"
                    alt="Discovery Phase Hero"
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
                    className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.12),transparent_50%)] z-[2]"/>

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
                                <div className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse"/>
                                <span
                                    className="text-orange-500 text-[0.7em] lg:text-[0.82em] uppercase tracking-[0.22em] font-[600]">Discovery Phase</span>
                            </div>

                            <h1 className="text-white text-[2em] lg:text-[4.5em] font-[700] leading-[1.08] tracking-tight mb-6 lg:mb-8">
                                Strategic Discovery, <span className="gx-gradient-text">Flawless Execution</span>
                            </h1>

                            <p className="text-white/70 text-[0.85em] lg:text-[1.08em] leading-[1.65] mb-8 lg:mb-10 font-[300]">
                                Deep-dive discovery sessions that uncover insights, align stakeholders, and build
                                bulletproof project foundations before a single line of code is written. We transform
                                ambiguity into clarity.
                            </p>

                            <div className="flex flex-wrap gap-2 mb-10 lg:mb-12">
                                {['Requirements', 'Workshops', 'Wireframes', 'Roadmapping', 'Feasibility', 'Risk Analysis'].map((badge) => (
                                    <span key={badge}
                                          className="px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-300 text-[0.7em] lg:text-[0.75em] font-[600] uppercase tracking-wider">
                                            {badge}
                                        </span>
                                ))}
                            </div>

                            <div className="flex flex-wrap gap-4 items-center">
                                <Link href="/contact">
                                    <button
                                        className="relative px-8 py-3 rounded-full text-[0.85em] lg:text-[0.88em] font-bold overflow-hidden hover:shadow-lg transition-shadow duration-300 whitespace-nowrap"
                                        style={{background: '#f97316', color: '#000'}}>
                                            <span className="absolute inset-0" style={{
                                                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)'
                                            }}/>
                                        <span className="relative">Start Discovery â†’</span>
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
                                    {label: 'Discoveries', value: '150+'},
                                    {label: 'Years Experience', value: '8+'},
                                    {label: 'Success Rate', value: '100%'},
                                    {label: 'Avg Alignment', value: '99%'}
                                ].map((stat) => (
                                    <div key={stat.label}
                                         className="px-6 py-5 rounded-2xl border border-orange-500/25 bg-orange-500/8 backdrop-blur-md hover:bg-orange-500/12 transition-all duration-300 hover:border-orange-500/50 text-right">
                                        <div
                                            className="text-orange-300 text-[0.7em] uppercase tracking-wider font-[600] mb-2">{stat.label}</div>
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
                            {label: 'Discoveries', value: '150+'},
                            {label: 'Experts', value: '8+'},
                            {label: 'Success', value: '100%'}
                        ].map((stat) => (
                            <div key={stat.label}
                                 className="px-3 py-2 rounded-xl border border-orange-500/25 bg-orange-500/8 backdrop-blur-md">
                                <div
                                    className="text-orange-300 text-[0.5em] uppercase tracking-wider font-[600] mb-1">{stat.label}</div>
                                <div
                                    className="text-white text-[1.2em] font-[700]">{stat.value}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Strategic Discovery Framework & Methodology */}
            <section ref={sectionRef}
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
                        <FxChip day={!isBackgroundActive ? !isDayTime : isDayTime}>STRATEGIC DISCOVERY</FxChip>
                    </div>

                    <div className="lg:-ml-[19em]">
                        <FxReveal>
                            <h3 className="lg:text-[3.5em] md:text-[3em] text-[2em] font-[700] tracking-tight leading-[1.15] mt-4">
                                Transform Vision Into <span
                                className="gx-gradient-text">Executable Strategy</span>
                            </h3>
                        </FxReveal>

                        <FxReveal delay={0.08}>
                            <div
                                className="grid lg:grid-cols-2 grid-cols-1 gap-6 mt-6 font-[300] text-justify text-[0.95em] md:text-[1.05em] leading-relaxed">
                                <div className="space-y-4">
                                    <p>Discovery is the strategic foundation that separates high-impact products from
                                        mediocre implementations. We orchestrate comprehensive, multi-disciplinary
                                        discovery engagements that systematically uncover competitive advantages,
                                        validate market assumptions, and architect technically sound product strategies
                                        grounded in genuine business outcomes.</p>
                                    <p>Through intensive stakeholder workshops, user research synthesis, competitive
                                        intelligence, and business analysis, we establish shared organizational
                                        understanding. Every technical decision, feature prioritization, and
                                        architectural choice becomes grounded in measurable KPIs and validated user
                                        insights rather than assumptions or politics.</p>
                                    <div className="flex flex-wrap gap-3 mt-4">
                                        {['Market Validation', 'User Research', 'Technical Architecture', 'Risk Assessment'].map((p) => (
                                            <span key={p} className="gx-data-pill">{p}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <p>Whether launching innovative startups, transforming established enterprises, or
                                        scaling complex platforms, discovery delivers a comprehensive strategic roadmap
                                        validated before significant investment. We ensure alignment across product,
                                        technical, and business stakeholders while identifying feasibility constraints,
                                        market opportunities, and scalability requirements early.</p>
                                    <p>Our discovery methodology prioritizes risk mitigation and opportunity
                                        acceleration. We deliver actionable clarity: validated product vision, technical
                                        blueprint, prioritized feature roadmap, go-to-market strategy, and
                                        organizational alignment. This strategic foundation empowers your team to
                                        execute with confidence, reduce time-to-market, and achieve sustainable
                                        product-market fit and growth.</p>
                                    <div className="flex flex-wrap gap-3 mt-4">
                                        {['Roadmapping', 'Feasibility Analysis', 'Stakeholder Alignment', 'Go-To-Market'].map((p) => (
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
                            className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.18),transparent_30%),linear-gradient(130deg,rgba(255,255,255,0.04),rgba(2,6,23,0.94))]"/>
                        <div className="absolute inset-0 border border-white/10 rounded-[2rem] pointer-events-none"/>
                        <div
                            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-400/70 to-transparent"/>
                        <div
                            className="absolute right-6 top-6 h-24 w-24 rounded-full border border-orange-400/20 blur-3xl"/>
                        <div
                            className="absolute bottom-8 left-8 h-28 w-28 rounded-full border border-orange-400/15 blur-[90px]"/>
                        <div
                            className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.035)_50%,transparent_100%)]"/>
                        <div
                            className="absolute inset-0 bg-[linear-gradient(0deg,transparent_0%,rgba(255,255,255,0.025)_50%,transparent_100%)]"/>

                        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                            <div className="max-w-2xl">
                                <FxChip day={false} className="mb-4">DISCOVERY SHOWCASE</FxChip>
                                <h3 className="text-[1.7em] sm:text-[2.2em] lg:text-[2.7em] font-[700] tracking-tight leading-[1.08] text-white">
                                    Strategic insights transformed into market-ready solutions.
                                </h3>
                                <p className="mt-4 max-w-xl text-[0.9em] sm:text-[1em] leading-[1.7] text-white/70">
                                    A premium gallery of validated concepts, user-centered designs, and data-informed
                                    strategiesâ€”showcasing the power of discovery-driven development.
                                </p>
                            </div>
                            <div className="grid gap-2 sm:grid-cols-2 lg:min-w-[290px]">
                                {[
                                    {label: 'User Insights', value: '01'},
                                    {label: 'Market Validation', value: '02'},
                                    {label: 'Strategic Vision', value: '03'},
                                    {label: 'Executable Plan', value: '04'}
                                ].map((item) => (
                                    <div key={item.label}
                                         className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm">
                                        <div
                                            className="text-[0.58em] uppercase tracking-[0.3em] text-orange-300/80">{item.label}</div>
                                        <div className="mt-1 text-[1.05em] font-[600] text-white">{item.value}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative z-10 mt-8 grid gap-4 lg:grid-cols-[1.35fr_0.9fr]">
                            <div
                                className="group relative overflow-hidden rounded-[1.6rem] border border-white/10 h-[320px] sm:h-[420px] lg:h-[540px]">
                                <Image
                                    src="/assets/disc/2.jpg"
                                    alt="Discovery market validation showcase"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div
                                    className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(2,6,23,0.2)_40%,rgba(2,6,23,0.88)_100%)]"/>
                                <div className="absolute inset-0 border border-white/10"/>
                                <div
                                    className="absolute left-4 top-4 rounded-full border border-orange-400/30 bg-black/30 px-3 py-1 text-[0.62em] uppercase tracking-[0.3em] text-orange-300">
                                    01 / Strategy
                                </div>
                                <div className="absolute bottom-4 left-4 right-4">
                                    <p className="text-[0.62em] uppercase tracking-[0.3em] text-orange-300 font-[600]">Market
                                        Analysis</p>
                                    <p className="mt-2 max-w-xl text-sm sm:text-base text-white/90">Deep competitive
                                        insights and opportunity mapping for market leadership.</p>
                                </div>
                            </div>

                            <div className="grid gap-4">
                                <div
                                    className="group relative overflow-hidden rounded-[1.35rem] border border-white/10 h-[250px] sm:h-[260px] lg:h-[260px]">
                                    <Image
                                        src="/assets/disc/3.jpg"
                                        alt="Discovery user experience design showcase"
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div
                                        className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(2,6,23,0.16)_55%,rgba(2,6,23,0.78)_100%)]"/>
                                    <div className="absolute inset-0 border border-white/10"/>
                                    <div
                                        className="absolute left-3 top-3 rounded-full border border-white/15 bg-black/20 px-2.5 py-1 text-[0.56em] uppercase tracking-[0.28em] text-orange-200">
                                        02 / Design
                                    </div>
                                </div>

                                <div
                                    className="group relative overflow-hidden rounded-[1.35rem] border border-white/10 h-[250px] sm:h-[260px] lg:h-[260px]">
                                    <Image
                                        src="/assets/disc/1.jpg"
                                        alt="Discovery user research showcase"
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div
                                        className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(2,6,23,0.16)_55%,rgba(2,6,23,0.78)_100%)]"/>
                                    <div className="absolute inset-0 border border-white/10"/>
                                    <div
                                        className="absolute left-3 top-3 rounded-full border border-white/15 bg-black/20 px-2.5 py-1 text-[0.56em] uppercase tracking-[0.28em] text-orange-200">
                                        03 / Research
                                    </div>
                                </div>
                            </div>

                            <div
                                className="group relative overflow-hidden rounded-[1.6rem] border border-white/10 h-[240px] sm:h-[260px] lg:h-[260px] lg:col-span-2">
                                <Image
                                    src="/assets/disc/4.jpg"
                                    alt="Discovery roadmap execution showcase"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div
                                    className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(2,6,23,0.1)_35%,rgba(2,6,23,0.82)_100%)]"/>
                                <div className="absolute inset-0 border border-white/10"/>
                                <div
                                    className="absolute left-3 top-3 rounded-full border border-orange-400/30 bg-black/30 px-2.5 py-1 text-[0.56em] uppercase tracking-[0.28em] text-orange-300">
                                    04 / Execution
                                </div>
                                <div className="absolute bottom-4 left-4 right-4">
                                    <p className="text-white/90 text-sm sm:text-base">Actionable roadmaps and validated
                                        strategies built for sustainable growth.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Discovery process solutions */}
            <FxStickyScrollSection
                day={isDayTime}
                heading={<>Discovery<br/>process solutions</>}
                intro="We translate research, user needs, and technical assessment into validated product strategies and prioritised roadmaps. Our discovery solutions reduce risk, accelerate alignment, and create executable plans for delivery."
                navLabel="Discovery Solutions"
                activeId={activeId}
                onNavClickAction={scrollToSection}
                items={[
                    {
                        id: '01',
                        title: 'User Research & UX Strategy',
                        target: 'URED',
                        tags: ['Qualitative', 'Quantitative', 'Personas'],
                        body: (
                            <div>
                                <p>
                                    We engage with users through interviews, surveys, and usability studies to build
                                    deep empathy and uncover latent needs. This insight becomes the backbone of your
                                    product strategy — informing priorities, experience flows, and measurable
                                    success criteria.
                                </p>
                                <p className="mt-3">
                                    Outputs include detailed personas, journey maps, and validated experience
                                    patterns ready for prototyping and development handoff.
                                </p>
                            </div>
                        ),
                        metrics: [
                            {label: 'Interviews', value: '30+'},
                            {label: 'Validated Flows', value: '12+'},
                        ],
                        deliverables: ['User research report', 'Personas & journeys', 'Experience hypotheses']
                    },
                    {
                        id: '02',
                        title: 'Market & Competitive Analysis',
                        target: 'CRA',
                        tags: ['Positioning', 'Opportunity Mapping'],
                        body: (
                            <div>
                                <p>
                                    A disciplined market analysis highlights whitespace, competitor strengths, and
                                    opportunities for differentiation. We combine product, pricing, and user data to
                                    craft a clear go-to-market direction.
                                </p>
                                <p className="mt-3">
                                    Recommendations focus on positioning, feature prioritisation, and business model
                                    opportunities that maximise product-market fit.
                                </p>
                            </div>
                        ),
                        metrics: [
                            {label: 'Opportunities', value: '5+'},
                            {label: 'Segments', value: '3+'},
                        ],
                        deliverables: ['Competitive analysis', 'Opportunity report', 'Go-to-market brief']
                    },
                    {
                        id: '03',
                        title: 'Prototyping & Validation',
                        target: 'PV',
                        tags: ['Rapid Prototyping', 'User Testing'],
                        body: (
                            <div>
                                <p>
                                    Interactive prototypes allow rapid validation of hypotheses with real users and
                                    stakeholders. This reduces technical risk and provides clear guidance for the
                                    engineering team.
                                </p>
                                <p className="mt-3">
                                    Iterative testing cycles ensure features solve real problems and deliver
                                    measurable value before costly implementation begins.
                                </p>
                            </div>
                        ),
                        metrics: [
                            {label: 'Sessions', value: '40+'},
                            {label: 'Iterations', value: '3+'},
                        ],
                        deliverables: ['Clickable prototypes', 'Test reports', 'Validated feature set']
                    },
                    {
                        id: '04',
                        title: 'Business & Monetisation Strategy',
                        target: 'BA',
                        tags: ['Value Modeling', 'Pricing'],
                        body: (
                            <div>
                                <p>
                                    We align product features with clear business outcomes — revenue, retention,
                                    or operational efficiency — and recommend viable monetisation approaches.
                                </p>
                                <p className="mt-3">
                                    This includes pricing experiments, success metrics, and a prioritized list of
                                    commercially important features.
                                </p>
                            </div>
                        ),
                        metrics: [
                            {label: 'Models', value: '3'},
                            {label: 'Recommendations', value: 'Top 5'},
                        ],
                        deliverables: ['Business model canvas', 'Pricing recommendations', 'Commercial roadmap']
                    },
                    {
                        id: '05',
                        title: 'Technical Feasibility',
                        target: 'TFA',
                        tags: ['Architecture', 'Integrations'],
                        body: (
                            <div>
                                <p>
                                    Technical assessments evaluate architecture options, integration complexity,
                                    and scalability trade-offs so you can plan reliable, maintainable systems.
                                </p>
                                <p className="mt-3">
                                    We surface required APIs, data flows, and infrastructure considerations to
                                    reduce surprises during implementation.
                                </p>
                            </div>
                        ),
                        metrics: [
                            {label: 'Assessments', value: '1 comprehensive'},
                            {label: 'Integrations', value: 'Points identified'},
                        ],
                        deliverables: ['Feasibility report', 'Integration map', 'Tech risk register']
                    },
                    {
                        id: '06',
                        title: 'Product Roadmapping',
                        target: 'PR',
                        tags: ['MVP', 'Milestones'],
                        body: (
                            <div>
                                <p>
                                    We convert validated insights into a phased roadmap that balances business
                                    impact with delivery risk — prioritising an MVP that proves value early.
                                </p>
                                <p className="mt-3">
                                    Roadmaps include release milestones, dependencies, and expected outcomes per
                                    phase.
                                </p>
                            </div>
                        ),
                        metrics: [
                            {label: 'Milestones', value: '4+'},
                            {label: 'MVP Scope', value: 'Defined'},
                        ],
                        deliverables: ['Phase roadmap', 'MVP definition', 'Release plan']
                    },
                    {
                        id: '07',
                        title: 'Project Planning & Estimation',
                        target: 'PPE',
                        tags: ['Estimates', 'Risks'],
                        body: (
                            <div>
                                <p>
                                    Detailed planning and estimation give stakeholders confidence to commit
                                    resources. We identify tasks, dependencies, and realistic timelines.
                                </p>
                                <p className="mt-3">
                                    Our estimates include assumptions and risk buffers, enabling transparent
                                    decision-making.
                                </p>
                            </div>
                        ),
                        metrics: [
                            {label: 'Estimates', value: 'T-Shirt/Story points'},
                        ],
                        deliverables: ['Estimate pack', 'Risk register', 'Delivery plan']
                    },
                    {
                        id: '08',
                        title: 'Stakeholder Alignment',
                        target: 'SHA',
                        tags: ['Workshops', 'Roadmaps'],
                        body: (
                            <div>
                                <p>
                                    Structured workshops and documentation ensure alignment across teams and
                                    decision-makers so the product vision is shared and actionable.
                                </p>
                                <p className="mt-3">
                                    This reduces rework and accelerates approvals, keeping projects on schedule and
                                    on budget.
                                </p>
                            </div>
                        ),
                        metrics: [
                            {label: 'Workshops', value: '4+'},
                            {label: 'Aligned stakeholders', value: 'Key teams'},
                        ],
                        deliverables: ['Alignment workshop notes', 'Requirements backlog', 'Decision log']
                    }
                ]}
            />

            {/* Discovery process benefits - Premium Grid */}
            <div className={`lg:pt-[3em] md:pt-[3em] pt-[1em] lg:pb-[3em] md:pb-[3em] pb-[1em] ${isDayTime ? 'bg-black text-white' : 'bg-white text-black'}`}>
                <div id={'discovery-phase-benefit'} className={`relative lg:top-10 py-16 lg:mb-20 mb-10 max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>

                    {/* Section Header */}
                    <div className={`grid lg:grid-cols-2 grid-cols-1 gap-6 pb-[3em] lg:mb-[5em] border-b border-gray-300/20`}>
                        <div>
                            <h2 className={`text-[1em] sm:text-[1.5em] md:text-[2.6em] lg:text-[3.2em] font-[700] tracking-tight leading-[1.08]`}> 
                                Discovery <br className={'lg:block md:block hidden'}/>Process Benefits
                            </h2>
                            <p className={`mt-4 text-[0.95em] font-[300] max-w-xl`}>A focused discovery phase transforms ambiguity into a clear, executable plan. The premium benefits below articulate the measurable outcomes, operational efficiencies, and competitive advantages organisations achieve when discovery is engineered as a strategic investment.</p>
                        </div>

                        <div className={'lg:-ml-[1.5em] md:-ml-[1.5em]'}>
                            <p className={'text-justify text-[0.93em] font-[300]'}>
                                Our discovery engagements combine product strategy, technical validation, user research, and commercial modelling to deliver investor‑grade artefacts and an actionable delivery roadmap. Each benefit below maps to outcomes, typical metrics, and recommended artefacts for executive review.
                            </p>
                        </div>
                    </div>

                    {/* Premium Grid */}
                    <div className={`relative w-full h-auto grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 lg:gap-12 mt-8`}>
                        {[
                            {
                                id: 'reduced-risk',
                                icon: isDayTime ? '/assets/disc/icon/risk1.svg' : '/assets/disc/icon/risk.svg',
                                title: 'Mitigated Delivery Risk',
                                desc: 'Early technical and market validation exposes failure modes and reduces uncertainty, turning hypotheses into testable assumptions.',
                                notes: ['Risk register', 'Mitigation roadmap', 'Decision gates']
                            },
                            {
                                id: 'cost-savings',
                                icon: isDayTime ? '/assets/disc/icon/sca1.svg' : '/assets/disc/icon/sca.svg',
                                title: 'Optimised Cost-to-Market',
                                desc: 'Targeted scoping and prioritisation reduce wasted engineering effort and shorten time-to-value, improving capital efficiency.',
                                notes: ['MVP scope', 'Cost scenarios', 'Resource plan']
                            },
                            {
                                id: 'validated-ux',
                                icon: isDayTime ? '/assets/disc/icon/test1.svg' : '/assets/disc/icon/test.svg',
                                title: 'Validated User Experience',
                                desc: 'Mixed-method research and prototype testing ensure product decisions are driven by user evidence—improving adoption and retention.',
                                notes: ['User journeys', 'Prototype tests', 'Acceptance criteria']
                            },
                            {
                                id: 'clear-direction',
                                icon: isDayTime ? '/assets/disc/icon/att1.svg' : '/assets/disc/icon/att.svg',
                                title: 'Strategic Roadmapping',
                                desc: 'A sequenced delivery plan aligns commercial goals with technical feasibility, enabling phased launches that de‑risk investment.',
                                notes: ['Release roadmap', 'Milestone KPIs', 'Dependency map']
                            },
                            {
                                id: 'market-validation',
                                icon: isDayTime ? '/assets/disc/icon/fast1.svg' : '/assets/disc/icon/fast.svg',
                                title: 'Market & Competitive Validation',
                                desc: 'Competitive mapping and demand analysis clarify positioning and reveal differentiated opportunities that scale.',
                                notes: ['Competitor matrix', 'TAM/SOM workbook', 'Go-to-market brief']
                            },
                            {
                                id: 'accurate-estimation',
                                icon: isDayTime ? '/assets/disc/icon/test1.svg' : '/assets/disc/icon/test.svg',
                                title: 'Precise Estimation',
                                desc: 'Implementation-level estimations with assumptions and risk buffers reduce scope creep and enable predictable delivery.',
                                notes: ['Estimate pack', 'Assumption log', 'Risk buffers']
                            },
                            {
                                id: 'informed-decisions',
                                icon: isDayTime ? '/assets/disc/icon/cust1.svg' : '/assets/disc/icon/cust.svg',
                                title: 'Data-Driven Decisions',
                                desc: 'Synthesis of research and analytics provides executive-ready insights that prioritise product choices with measurable impact.',
                                notes: ['Research synthesis', 'OKR alignment', 'Hypothesis backlog']
                            },
                            {
                                id: 'team-alignment',
                                icon: isDayTime ? '/assets/disc/icon/risk1.svg' : '/assets/disc/icon/risk.svg',
                                title: 'Cross‑Functional Alignment',
                                desc: 'Workshops and artefacts align stakeholders, reducing communication overhead and accelerating approvals.',
                                notes: ['Workshop outputs', 'Roles & responsibilities', 'Decision logs']
                            },
                            {
                                id: 'stakeholder-confidence',
                                icon: isDayTime ? '/assets/disc/icon/sca1.svg' : '/assets/disc/icon/sca.svg',
                                title: 'Investor‑Ready Artefacts',
                                desc: 'Concise, evidence-backed deliverables that support funding decisions, procurement, and executive buy-in.',
                                notes: ['Feasibility report', 'Commercial scenarios', 'Executive summary']
                            }
                        ].map((b, i) => (
                            <FxReveal key={b.id} delay={i * 0.04}>
                                <FxFrame className={`p-6 rounded-2xl h-full transition-transform duration-300 hover:scale-[1.02] ${isDayTime ? 'bg-gradient-to-br from-black/5 to-black/10 border border-white/8' : 'bg-gradient-to-br from-white/6 to-white/3 border border-white/8'}`}>
                                    <div className="flex flex-col h-full">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${isDayTime ? 'bg-orange-600/10 border border-orange-400/20' : 'bg-orange-500/10 border border-orange-300/20'}`}>
                                                <Image src={b.icon} alt={b.title} width={44} height={44} className="object-contain" />
                                            </div>
                                            <h3 className={`text-[1.15em] font-[700] ${isDayTime ? 'text-white' : 'text-black'}`}>{b.title}</h3>
                                        </div>

                                        <p className={`text-[0.92em] font-[300] leading-[1.6] mb-4 flex-grow ${isDayTime ? 'text-gray-300' : 'text-gray-700'}`}>{b.desc}</p>

                                        <div className="mt-4 pt-4 border-t border-white/6">
                                            <div className="flex flex-wrap gap-2">
                                                {b.notes.map((n, idx) => (
                                                    <span key={idx} className={`text-[0.72em] px-3 py-1 rounded-full font-[600] uppercase tracking-wide ${isDayTime ? 'bg-orange-500/10 text-orange-300 border border-orange-400/10' : 'bg-orange-400/8 text-orange-700 border border-orange-300/10'}`}>
                                                        {n}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </FxFrame>
                            </FxReveal>
                        ))}
                    </div>
                </div>
            </div>

            {/* Stages of Our Discovery Process */}
            <div className={` lg:pt-[2em]  ${isDayTime ? 'bg-white' : 'bg-black'}`}>
                <div className={`${isDayTime ? 'text-black' : ' text-white'}`}>
                    <div id={'process'}
                         className={`relative lg:pt-[2em] md:pt-[2em] pt-[1em] lg:mt-[3em] md:mt-[3em] mt-[1em] lg:max-w-full w-full mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em] `}>
                        <h2 className={'border-b pb-[0.8em] capitalize border-gray-500 px-0 constant-text lg:text-[3em] md:text-[2em] sm:text-[1.5em] text-[1.5em] leading-[1.1] font-[500]'}>
                            Stages of Our<br className={'lg:block md:block hidden'}/>Discovery Process
                        </h2>

                        <div id={'stages'}
                             className={'grid lg:grid-cols-2 grid-cols-1 gap-10 lg:mt-[10em] mt-6 max-w-full mx-auto w-full h-full lg:mb-0 mb-6'}>

                            {/* Left Section */}
                            <div className={'lg:mr-28 md:mr-28 lg:mb-[9em] md:mb-[9em]'}>

                                {/* Initial Meeting */}
                                <div className={`lg:mb-[6em] md:mb-[6em] mb-14`} id={'Initial Meeting'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>Initial Meeting</h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.8em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                    <span
                                        className={`px-4 py-2 ${isDayTime ? 'bg-black' : 'bg-white'} rounded-full`}>Workshops</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Competitor Analysis</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Flow Diagrams</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] lg:mb-[3em] mb-[1.5em] font-[300]'}>
                                        We begin with an initial meeting to understand your project goals, business
                                        objectives, and technical requirements. This session allows us to explore your
                                        vision, clarify expectations, and assess how we can deliver value from day one.
                                        It&#39;s also a chance for you to experience our process, ask questions, and
                                        align
                                        on priorities. While we always welcome face-to-face meetings to foster stronger
                                        relationships and gain deeper insights, we also offer seamless virtual sessions
                                        via MS Teams, Google Meet, or Zoom. Whichever format you prefer, our focus
                                        remains the same -laying the foundation for a successful collaboration built on
                                        clarity, trust, and shared purpose.
                                    </p>
                                </div>

                                {/* Workshops */}
                                <div className={`lg:mb-[6em] md:mb-[6em] mb-14`} id={'Workshops'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>Workshops</h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.8em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                    <span
                                        className={`px-4 py-2 ${isDayTime ? 'bg-black' : 'bg-white'} rounded-full`}>Workshops</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Competitor Analysis</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Flow Diagrams</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] lg:mb-[3em] mb-[1.5em] font-[300]'}>
                                        Next, weâ€™ll conduct a series of structured, collaborative workshops to delve
                                        deeper into your projectâ€™s requirements, user expectations, and overall business
                                        goals. These sessions are designed to align stakeholders, clarify priorities,
                                        and uncover potential challenges or constraints early in the process. Together,
                                        weâ€™ll map out user journeys, define core workflows, and assess any technical or
                                        operational considerations that may impact delivery. Whether hosted in person or
                                        virtually, these workshops are tailored to your organisationâ€™s needs and focused
                                        on generating actionable insights, enabling informed decisions that shape a
                                        clear and strategic roadmap for your product.
                                    </p>
                                </div>

                                {/* Follow-up Meetings */}
                                <div className={`lg:mb-[6em] md:mb-[6em] mb-14`} id={'Follow-up Meetings'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>Follow-up Meetings</h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.8em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                    <span
                                        className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Competitor Analysis</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Flow Diagrams</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] lg:mb-[3em] mb-[1.5em] font-[300]'}>
                                        Following the workshops, weâ€™ll hold structured follow-up meetings to present our
                                        findings, validate key assumptions, and outline actionable recommendations
                                        tailored to your business objectives. These sessions are designed to be
                                        collaborative and outcome-driven, giving you the opportunity to review our
                                        insights, provide feedback, and ensure strategic alignment before moving into
                                        execution. By addressing open questions, refining priorities, and confirming the
                                        project direction, we establish a clear, shared understanding across all
                                        stakeholders. Whether conducted in person or remotely, these meetings are
                                        focused on delivering clarity, accountability, and measurable value for your
                                        organisation.
                                    </p>
                                </div>

                                {/* Write-up & Presentation */}
                                <div className={`lg:mb-[6em] md:mb-[6em] mb-14`} id={'Write-up & Presentation'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>Write-up & Presentation</h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.8em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                    <span
                                        className={`px-4 py-2 ${isDayTime ? 'bg-black' : 'bg-white'} rounded-full`}>Workshops</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Competitor Analysis</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Flow Diagrams</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] lg:mb-[3em] mb-[1.5em] font-[300]'}>
                                        Finally, weâ€™ll consolidate all insights, findings, and strategic recommendations
                                        into a detailed report and presentation that serves as a clear and actionable
                                        roadmap for your project. This comprehensive documentation will outline key
                                        milestones, timelines, budget estimates, technical recommendations, and
                                        potential risks -ensuring you have full visibility and alignment before
                                        development begins. It acts as both a reference and a blueprint, equipping you
                                        with the clarity and confidence to move forward efficiently and effectively.
                                    </p>
                                </div>
                            </div>

                            {/* Right Section */}
                            <div
                                className='lg:sticky md:sticky lg:top-[5em] md:top-[5em] justify-center items-center w-full max-w-full h-screen lg:h-screen md:h-screen overflow-hidden'>
                                <div>
                                    {imageIds.map((imageId: string) => (
                                        activeId === imageId && (
                                            <div
                                                key={imageId}
                                                className="relative shadow-lg transition-opacity duration-500 ease-in-out opacity-100"
                                                id={imageId}
                                            >
                                                <Image
                                                    src={`/assets/disc/stages/${imageId}.jpg`}
                                                    alt={imageId}
                                                    className="transition-transform duration-500 ease-in-out transform scale-105 hover:scale-110"
                                                    width={1030}
                                                    height={768}
                                                />
                                            </div>
                                        )
                                    ))}
                                </div>

                                {/* sticky menu */}
                                {isVisible && (
                                    <div
                                        className={`lg:fixed justify-center md:fixed bottom-0 left-0 w-full ${
                                            isDayTime ? 'bg-black text-white' : 'bg-white text-black'} py-5 z-50`}>
                                        <div
                                            className={`grid lg:grid-cols-4 md:grid-cols-4 grid-cols-1 lg:max-w-full w-full h-auto lg:px-[4.6em] mx-auto justify-center gap-0 ${
                                                isDayTime ? 'border-gray-500' : 'border-gray-500'}`}>
                                            {imageIds.map((id) => (
                                                <button
                                                    key={id}
                                                    onClick={() => {
                                                        const element = document.getElementById(id);
                                                        if (element) {
                                                            element.scrollIntoView({behavior: 'smooth'});
                                                        }
                                                    }}
                                                    className={`mt-4 ${
                                                        activeId === id
                                                            ? isDayTime
                                                                ? 'text-white hover:text-gray-500 focus:text-gray-500'
                                                                : 'text-black hover:text-gray-500 focus:text-gray-500'
                                                            : isDayTime
                                                                ? 'text-gray-500 hover:text-white focus:text-white'
                                                                : 'text-gray-500 hover:text-black focus:text-black'
                                                    }`}
                                                >
                                                    {id.replace('-', ' ')}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Who is involved in the process */}
            <div className={`lg:-mt-[9em] md:-mt-[9em] ${isDayTime ? 'bg-black' : 'bg-white'}`}>
                <div id={'involved'}
                     className={`relative lg:pt-[7em] md:pt-[7em] pt-[2em] lg:pb-[7em] md:pb-[7em] pb-[2em] px-4 sm:px-6 lg:px-[4.6em] w-full max-w-full lg:mb-10 mb-8 ${
                         isDayTime ? 'text-white' : 'text-black'}`}>
                    <div
                        className={`relative grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-6 max-w-full mx-auto`}>
                        <div className={'lg:mr-[8em] md:mr-[8em] lg:mt-[2em] md:mt-[2em] '}>
                            <h2 className='lg:text-[3em] md:text-[3em] capitalize text-[1.5em] font-[500] tracking-tighter leading-[1.15] lg:pb-6 '>
                                who is involved <br className={'lg:block md:block hidden'}/>in the process
                            </h2>
                            <p className='text-[0.85em] font-[400] lg:-mt-[0.2em] md:-mt-[0.2em] text-justify  leading-[1.5]'>
                                At Grey InfoTech, .NET development is driven by a dedicated team focused on delivering
                                scalable, secure, and high-performance business applications. A project manager
                                coordinates the process, ensuring clear communication, timely delivery, and alignment
                                with your strategic objectives. Our experienced .NET developers build robust backend
                                systems and integrate custom features tailored to your unique business needs, while
                                UI/UX designers create intuitive, user-friendly interfaces.<br/><br/>

                                Supporting the development team are quality assurance specialists who conduct thorough
                                testing to guarantee reliability and security. DevOps engineers manage deployment, cloud
                                integration, and ongoing maintenance to ensure optimal performance and scalability.
                                Throughout the project, your feedback is actively incorporated, ensuring the final
                                product delivers measurable value and supports your long-term business growth.
                            </p><br/>
                            <Link href='/company'>
                                <button
                                    className='relative mx-auto inline-flex items-center justify-start overflow-hidden group w-fit text-[0.85em]  border tracking-tighter  rounded-full py-2 px-6'>
                        <span
                            className={`w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 ${isDayTime ? 'bg-white' : 'bg-black'} opacity-[3%]`}></span>
                                    <span
                                        className={`absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 ${isDayTime ? 'bg-white' : 'bg-black'} opacity-100 group-hover:-translate-x-8`}></span>
                                    <span
                                        className={`relative w-full text-left transition-colors duration-200 ease-in-out ${isDayTime ? 'text-white group-hover:text-gray-800' : 'text-black group-hover:text-gray-300'}`}>About Us <span
                                        className={`text-[1.5em] leading-[0.7]`}> â†’</span></span>
                                    <span
                                        className={"absolute inset-0 border-[1px] border-gray-900 ${isDayTime ? 'border-white' : 'border-black'} rounded-full"}></span>
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
            </div>

            {/* Discovery Process Deliverables */}
            <div className={`lg:-mt-[3.5em] md:-mt-[3.5em] ${isDayTime ? 'bg-white' : 'bg-black'}`}>
                <div
                    className={`relative max-w-full w-full mx-auto px-4 sm:px-6 lg:px-[4.6em] lg:pt-[6em] md:pt-[6em] pt-[1.2em] lg:pb-[6em] md:pb-[6em] pb-[1.2em] mt-14`}>
                    <div
                        className={`relative grid lg:grid-cols-2 grid-cols-1 gap-10 mb-8 ${isDayTime ? 'text-black' : 'text-white'} `}>
                        <div className={'lg:mr-[8em]'}>
                            <h2 className={`lg:text-[3.33em] md:text-[3.33em] text-[1.5em] font-[500] justify-center tracking-tight lg:mb-12 mb-7 leading-[1.2]`}>
                                Discovery Process <br className={'lg:block md:block hidden'}/>Deliverables
                            </h2>
                            <p className={'text-[0.873em] font-[400] leading-[1.5] tracking-normal text-justify'}>
                                To ensure your projectâ€™s success, we provide clear, actionable deliverables that align
                                stakeholders, streamline development, and maintain transparency -keeping your business
                                goals front and center throughout the process.
                            </p>
                        </div>
                        <div
                            className={`lg:-ml-5 md:-ml-5 border-t pt-[6em]] relative mx-auto max-w-full w-full space-y-2 ${isDayTime ? 'text-black' : 'text-white'}`}>
                            <div
                                className={`w-full border-b pb-6 mt-6`}>
                                <button
                                    onClick={() => toggleWeb(0)}
                                    className="flex items-center justify-between w-full text-start lg:text-[1.5em] md:text-[1.5em] sm:text-base font-[500] focus:outline-none"
                                >
                                    <span>Product Requirements Document</span>
                                    {webIndex === 0 ? (
                                        <AiFillCaretUp
                                            className={`lg:text-[1.5em] text-[1em]`}/>
                                    ) : (
                                        <AiFillCaretDown
                                            className={`lg:text-[1.5em] text-[1em]`}/>
                                    )}
                                </button>
                                {webIndex === 0 && (
                                    <p className="mt-4 text-[0.873em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                        A clearly defined overview of your productâ€™s vision, strategic goals, core
                                        features, user interface design, and key performance indicators ensures
                                        alignment across all teams and stakeholders. This shared understanding minimizes
                                        miscommunication, streamlines decision-making, and keeps the project focused on
                                        delivering tangible business outcomes.
                                    </p>
                                )}
                            </div>
                            <div
                                className={`w-full border-b pb-6`}>
                                <button
                                    onClick={() => toggleWeb(1)}
                                    className="flex items-center mt-6 justify-between w-full text-start lg:text-[1.5em] md:text-[1.5em] sm:text-base font-[500] focus:outline-none"
                                >
                                    <span>User Stories & Personas</span>
                                    {webIndex === 1 ? (
                                        <AiFillCaretUp
                                            className={`lg:text-[1.5em] text-[1em]`}/>
                                    ) : (
                                        <AiFillCaretDown
                                            className={`lg:text-[1.5em] text-[1em]`}/>
                                    )}
                                </button>
                                {webIndex === 1 && (
                                    <p className="mt-4 text-[0.873em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                        A comprehensive profile of your target audience - covering demographics,
                                        behaviours, goals, and interaction patterns - enables you to design a product
                                        that resonates with real users. This insight-driven approach ensures your
                                        solution is relevant, user-centric, and positioned to deliver meaningful value
                                        and long-term engagement.
                                    </p>
                                )}
                            </div>
                            <div
                                className={`w-full border-b pb-6`}>
                                <button
                                    onClick={() => toggleWeb(2)}
                                    className="flex mt-6 items-center justify-between w-full text-start lg:text-[1.5em] md:text-[1.5em] sm:text-base font-[500] focus:outline-none"
                                >
                                    <span>Interactive Prototypes</span>
                                    {webIndex === 2 ? (
                                        <AiFillCaretUp
                                            className={`lg:text-[1.5em] text-[1em]`}/>
                                    ) : (
                                        <AiFillCaretDown
                                            className={`lg:text-[1.5em] text-[1em]`}/>
                                    )}
                                </button>
                                {webIndex === 2 && (
                                    <p className="mt-4 text-[0.873em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                        A visual representation of your product -featuring user flows, interactive
                                        wireframes, and high-fidelity mockups -enables you to test core functionality,
                                        validate assumptions, and gather real user feedback early. This iterative
                                        process helps refine the user experience, reduce development risks, and ensure
                                        the final product aligns with user expectations and business objectives.
                                    </p>
                                )}
                            </div>
                            <div
                                className={`w-full border-b pb-6`}>
                                <button
                                    onClick={() => toggleWeb(3)}
                                    className="flex mt-6 items-center justify-between w-full text-start lg:text-[1.5em] md:text-[1.5em] sm:text-base font-[500] focus:outline-none"
                                >
                                    <span>Technical Architecture Diagram</span>
                                    {webIndex === 3 ? (
                                        <AiFillCaretUp
                                            className={`lg:text-[1.5em] text-[1em]`}/>
                                    ) : (
                                        <AiFillCaretDown
                                            className={`lg:text-[1.5em] text-[1em]`}/>
                                    )}
                                </button>
                                {webIndex === 3 && (
                                    <p className="mt-4 text-[0.873em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                        A comprehensive overview of your systemâ€™s architecture -covering components such
                                        as database schema, APIs, and integration points -ensures technical alignment
                                        with your business needs. This foundational clarity supports scalability,
                                        performance, and future enhancements, reducing development friction and enabling
                                        smoother implementation.
                                    </p>
                                )}
                            </div>
                            <div
                                className={`w-full border-b pb-6`}>
                                <button
                                    onClick={() => toggleWeb(4)}
                                    className="flex mt-6 items-center justify-between w-full text-start lg:text-[1.5em] md:text-[1.5em] sm:text-base font-[500] focus:outline-none"
                                >
                                    <span>Project Estimates & Timeline</span>
                                    {webIndex === 4 ? (
                                        <AiFillCaretUp
                                            className={`lg:text-[1.5em] text-[1em]`}/>
                                    ) : (
                                        <AiFillCaretDown
                                            className={`lg:text-[1.5em] text-[1em]`}/>
                                    )}
                                </button>
                                {webIndex === 4 && (
                                    <p className="mt-4 text-[0.873em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                        A clear breakdown of development phases, resource allocation, key milestones,
                                        and dependencies provides you with the structure needed to manage your project
                                        efficiently. This transparency enables better planning, risk mitigation, and
                                        informed decision-making throughout the development lifecycle.
                                    </p>
                                )}
                            </div>
                            <div
                                className={`w-full border-b pb-6`}>
                                <button
                                    onClick={() => toggleWeb(5)}
                                    className="flex mt-6 items-center justify-between w-full text-start lg:text-[1.5em] md:text-[1.5em] sm:text-base font-[500] focus:outline-none"
                                >
                                    <span>Team Composition Plan</span>
                                    {webIndex === 5 ? (
                                        <AiFillCaretUp
                                            className={`lg:text-[1.5em] text-[1em]`}/>
                                    ) : (
                                        <AiFillCaretDown
                                            className={`lg:text-[1.5em] text-[1em]`}/>
                                    )}
                                </button>
                                {webIndex === 5 && (
                                    <p className="mt-4 text-[0.873em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                        A clear and structured outline of team roles, responsibilities, and required
                                        skill sets ensures your project is staffed with the right expertise from day
                                        one. This strategic alignment enhances collaboration, reduces inefficiencies,
                                        and drives faster, more effective execution across all phases of development.
                                    </p>
                                )}
                            </div>
                            <div
                                className={`w-full border-b pb-6`}>
                                <button
                                    onClick={() => toggleWeb(6)}
                                    className="flex items-center mt-6 justify-between w-full text-start lg:text-[1.5em] md:text-[1.5em] sm:text-base font-[500] focus:outline-none"
                                >
                                    <span>Risk Assessment Report</span>
                                    {webIndex === 6 ? (
                                        <AiFillCaretUp
                                            className={`lg:text-[1.5em] text-[1em]`}/>
                                    ) : (
                                        <AiFillCaretDown
                                            className={`lg:text-[1.5em] text-[1em]`}/>
                                    )}
                                </button>
                                {webIndex === 6 && (
                                    <p className="mt-4 text-[0.873em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                        A proactive assessment of potential project risks, supported by well-defined
                                        mitigation strategies and prioritised response plans, equips your team to manage
                                        uncertainties efficiently, reduce delays, and maintain consistent progress
                                        toward successful delivery.
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Strategic Digital Partnership & Impact Metrics */}
            <div className={`${isDayTime ? 'bg-black' : 'bg-white'}`}>
                <div id={'partners'}
                     className={`relative lg:py-20 md:py-16 lg:mb-16 md:mb-16 mb-5 max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]  ${
                         isDayTime ? 'text-white' : 'text-black'
                     }`}>

                    {/* Decorative Background Elements */}
                    <div className="pointer-events-none absolute inset-0 overflow-hidden">
                        <div
                            className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-[0.04] ${isDayTime ? 'bg-orange-500' : 'bg-orange-400'}`}></div>
                        <div
                            className={`absolute bottom-0 left-0 w-80 h-80 rounded-full blur-3xl opacity-[0.03] ${isDayTime ? 'bg-cyan-500' : 'bg-cyan-400'}`}></div>
                    </div>

                    <div className="relative z-10">
                        <h1 className={'lg:text-[4.5em] md:text-[3.5em] sm:text-[2.5em] text-[1.8em] font-[700] leading-[1.1]  mb-[0.8em] tracking-tight'}>
                            Your Strategic <br className={'lg:block md:block hidden'}/>Digital Innovation Partner
                        </h1>

                        <p className={'text-[0.95em] font-[300] leading-[1.8] text-justify lg:pr-[35em] mb-6'}>
                            At Grey InfoTech, we orchestrate transformative digital solutions that transcend traditional
                            boundaries. Our discovery-driven approach combines deep strategic insights with cutting-edge
                            technical execution to deliver high-impact products that drive exponential growth. From
                            early-stage innovation to enterprise-scale digital transformation, we've guided hundreds of
                            organizations through complex technology landscapesâ€”architecting solutions that unlock
                            competitive advantage, accelerate market capture, and establish lasting digital leadership.
                        </p>

                        <p className={'text-[0.92em] font-[300] leading-[1.7] text-justify lg:pr-[25em] mb-8 opacity-90'}>
                            Our methodology prioritizes deep discovery and strategic alignment before execution,
                            ensuring every technical decision is grounded in measurable business outcomes. We don't just
                            buildâ€”we architect scalable, secure, and future-ready platforms that anticipate market
                            evolution and empower your organization to lead.
                        </p>

                        <Link href='/contact'>
                            <button
                                className='relative inline-flex items-center justify-start overflow-hidden group w-fit text-[0.85em]  border tracking-tighter  rounded-full py-3 px-8'>
                            <span
                                className={`w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 ${isDayTime ? 'bg-white' : 'bg-black'} opacity-[3%]`}></span>
                                <span
                                    className={`absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 ${isDayTime ? 'bg-white' : 'bg-black'} opacity-100 group-hover:-translate-x-8`}></span>
                                <span
                                    className={`relative w-full text-left transition-colors duration-200 ease-in-out ${isDayTime ? 'text-white group-hover:text-gray-300' : 'text-black group-hover:text-gray-800'}`}>
                                Start Your Discovery Journey <span
                                    className={`text-[1.5em] leading-[0.7]`}> â†’</span></span>
                                <span
                                    className={"absolute inset-0 border-[1px] border-gray-900 ${isDayTime ? 'border-white' : 'border-black'} rounded-full"}></span>
                            </button>
                        </Link>

                        {/* Performance Metrics Grid */}
                        <div id={'countup'}
                             className={`grid lg:grid-cols-5 md:grid-cols-5 sm:grid-cols-3 grid-cols-1 text-center lg:mt-[4.5em] md:mt-[3em] mt-[2em] py-12 gap-6 lg:gap-0 lg:divide-x divide-gray-500`}
                        >
                            {stats.map((stat, index) => (
                                <div
                                    key={index}
                                    className={`flex flex-col justify-center items-center px-4 py-6 rounded-lg transition-all duration-300 ${
                                        isDayTime ? 'hover:bg-white/5' : 'hover:bg-black/5'
                                    }`}
                                >
                                    <div className="mb-2 inline-flex items-center justify-center w-12 h-12 rounded-lg"
                                         style={{
                                             background: isDayTime ? 'linear-gradient(135deg, #f97316/20, #f97316/10)' : 'linear-gradient(135deg, #f97316/15, #f97316/5)'
                                         }}>
                                        <span className="text-orange-500 font-bold">â†—</span>
                                    </div>
                                    <h2 className="gx-gradient-text lg:text-[3.2em] md:text-[2.8em] sm:text-[2em] text-[1.5em] font-[700] leading-tight">
                                        <CountUp end={stat.value} duration={2.5} suffix={stat.suffix || ''}/>
                                    </h2>
                                    <p className={`text-[0.85em] font-[500] mt-2 tracking-wide uppercase ${isDayTime ? 'text-gray-400' : 'text-gray-600'}`}>
                                        {stat.label}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Trust Indicators */}
                        <div
                            className={`mt-12 pt-12 border-t ${isDayTime ? 'border-gray-600/30' : 'border-gray-400/20'}`}>
                            <p className={`text-[0.8em] uppercase tracking-[0.15em] font-[600] mb-6 ${isDayTime ? 'text-gray-500' : 'text-gray-600'}`}>
                                Trusted By Industry Leaders
                            </p>
                            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
                                {['Enterprise Scale', 'Security Certified', 'Award Winning', 'Globally Distributed'].map((badge) => (
                                    <div key={badge}
                                         className={`px-4 py-2.5 rounded-lg border text-[0.75em] font-[600] uppercase tracking-wider text-center ${
                                             isDayTime
                                                 ? 'bg-white/8 border-white/15 text-gray-300'
                                                 : 'bg-black/8 border-black/15 text-gray-700'
                                         }`}>
                                        {badge}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ServiceCapabilities
                accentColor="#f97316"
                variant="terminal"
                capabilities={[
                    {
                        id: "cap-1",
                        icon: " - ",
                        title: "Requirements Gathering",
                        description: "Structured stakeholder interviews and workshops to surface functional, technical, and business requirements."
                    },
                    {
                        id: "cap-2",
                        icon: " - ï¸",
                        title: "Technical Roadmapping",
                        description: "Architecture decisions, technology selection, and phased delivery plans that reduce risk from day one."
                    },
                    {
                        id: "cap-3",
                        icon: "ðŸ“‹",
                        title: "Feasibility Analysis",
                        description: "Technical and commercial feasibility assessments that give you confidence before committing budget."
                    },
                    {
                        id: "cap-4",
                        icon: " - ï¸",
                        title: "Wireframing & IA",
                        description: "Low-fidelity wireframes and information architecture that align teams on structure before visual design begins."
                    },
                    {
                        id: "cap-5",
                        icon: "âš ï¸",
                        title: "Risk Assessment",
                        description: "Identify and mitigate technical, timeline, and commercial risks before they become expensive problems."
                    },
                    {
                        id: "cap-6",
                        icon: "ðŸ“„",
                        title: "Project Documentation",
                        description: "Full discovery output: SOW, technical spec, user stories, acceptance criteria, and project charter."
                    },
                ]}
            />
        </div>
    );
};

export default DiscoveryPhase;


