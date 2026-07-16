'use client';

import React, {useEffect, useRef, useState} from 'react';
import '@/app/globals.css';
import Image from "next/image";
import ResponsiveVideoHero from '@/components/ResponsiveVideoHero';
import Link from "next/link";
import {AiFillCaretUp, AiFillCaretDown} from "react-icons/ai";
import {useIsDayTime} from '../../components/useIsDayTime';

import FuturisticServiceLayout from '@/components/futuristic/FuturisticServiceLayout';

import {
    FxBackground,
    FxChip,
    FxReveal,
    FxButton,
    FxHoloCard,
    FxStickyScrollSection
} from '@/components/futuristic/fx';

interface ProcessStep {
    title: string;
    content: string[];
}

const MaritimePortManagement = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isBackgroundActive, setIsBackgroundActive] = useState(false);
    const [activeId, setActiveId] = useState<string>("");
    const [activeAcc, setActiveAcc] = useState<number | null>(null);
    const [isDesktop, setIsDesktop] = useState(false);

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

                if (top < windowHeight * -0.15 || bottom < windowHeight * -0.1) {
                    setIsBackgroundActive(true);
                } else {
                    setIsBackgroundActive(false);
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Development Services hook
    const handleScroll = () => {
        const sections = [
            "VFM",
            "POP",
            "CMS",
            "OPE",
            "CSM",
            "MAN"
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
    }

    // Accordion
    const steps = [
        {
            number: "01",
            title: "IVFMS",
            heading: "Integrated Vessel Fleet Management",
            description: (
                <>
                    Our Integrated Vessel Fleet Management solution provides comprehensive oversight of maritime assets,
                    from vessel scheduling and maintenance tracking to crew management and operational compliance. IVFMS
                    delivers real-time visibility into fleet utilization, fuel consumption monitoring, maintenance
                    intervals, and vessel performance metrics. The system integrates vessel technical specifications,
                    crew certification tracking, compliance with international maritime regulations (IMO 2030, MARPOL,
                    ISM Code), and predictive maintenance capabilities to minimize downtime and extend vessel lifecycle.
                    Advanced analytics provide insights into fleet efficiency, route optimization, and resource
                    allocation across your maritime portfolio, enabling data-driven decisions that reduce operating
                    costs while improving safety and environmental compliance across all vessel classes.
                </>
            )
        },
        {
            number: "02",
            title: "AVOPP",
            heading: "Advanced Vessel Optimization & Performance Platform",
            description: (
                <>
                    AVOPP revolutionizes vessel performance through real-time optimization of maritime operations. This
                    advanced platform captures continuous vessel telemetry data, fuel consumption patterns, engine
                    performance metrics, and environmental conditions to provide actionable insights for operational
                    optimization. The system uses machine learning algorithms to analyze historical performance data,
                    predict maintenance requirements, and recommend operational adjustments that enhance efficiency and
                    reduce fuel costs. AVOPP integrates with onboard systems to monitor engine efficiency, propulsion
                    optimization, weather routing, speed optimization, and ballast management. The platform delivers
                    comprehensive performance dashboards, trend analysis, and benchmarking capabilities against similar
                    vessels, enabling port authorities and fleet operators to identify optimization opportunities,
                    comply with emission regulations, and achieve measurable improvements in operational efficiency and
                    profitability.
                </>
            )
        },
        {
            number: "03",
            title: "CNTOS",
            heading: "Container & Terminal Operations System",
            description: (
                <>
                    CNTOS provides end-to-end container and terminal operations management, from vessel arrival through
                    cargo discharge, storage, and final delivery. The system manages container tracking through the
                    entire supply chain, optimizes stacking and storage operations, coordinates gate operations, and
                    automates billing processes. CNTOS integrates with automated container handling equipment (cranes,
                    AGVs, reach stackers) to streamline operations and provide real-time inventory visibility. Advanced
                    features include yard management with optimal space utilization, berth scheduling optimization,
                    truck appointment systems to reduce terminal congestion, and seamless integration with customs and
                    regulatory agencies. The platform delivers comprehensive terminal performance metrics, container
                    dwell time analysis, equipment utilization reports, and financial reporting, enabling terminal
                    operators to maximize throughput, minimize vessel turnaround times, and optimize revenue from
                    container services.
                </>
            )
        },
        {
            number: "04",
            title: "ICCCIS",
            heading: "Intelligent Cargo Control & Compliance Integration System",
            description: (
                <>
                    ICCCIS ensures intelligent cargo control and comprehensive compliance management throughout maritime
                    operations. The system manages cargo documentation including bills of lading, commercial invoices,
                    certificates of origin, and hazardous material declarations with automated validation against
                    regulatory requirements. ICCCIS integrates with customs authorities, port security systems, and
                    international compliance frameworks (SOLAS, ISPS Code, IMO regulations) to streamline customs
                    clearance and ensure regulatory adherence. Advanced capabilities include real-time cargo tracking
                    with location and condition monitoring, automated compliance checking for restricted/dangerous
                    goods, temperature and condition monitoring for sensitive cargo, and comprehensive audit trails for
                    regulatory inspections. The platform reduces cargo handling errors, accelerates customs clearance,
                    ensures compliance with international maritime regulations, and provides port authorities with
                    enhanced security oversight and enforcement capabilities.
                </>
            )
        },
        {
            number: "05",
            title: "UPOMP",
            heading: "Unified Port Operations & Maritime Platforms",
            description: (
                <>
                    UPOMP creates a unified ecosystem connecting all stakeholders in port operations vessel operators,
                    terminal operators, cargo handlers, customs agencies, and service providers. The platform provides a
                    central hub for information exchange, streamlining communication and coordination across the
                    maritime supply chain. UPOMP integrates berth management, vessel scheduling, cargo manifests,
                    payment processing, and documentation workflows into a single platform accessible to all authorized
                    parties. The system automates information sharing between port operators and shipping lines,
                    reducing manual handoffs and documentation delays. Advanced features include vessel traffic service
                    integration, resource planning across multiple terminals, congestion monitoring and mitigation, and
                    comprehensive port performance analytics. UPOMP reduces coordination overhead, accelerates cargo
                    processing, improves port efficiency, and enhances collaboration among all maritime stakeholders,
                    positioning ports as efficient, digitally integrated hubs in the global supply chain.
                </>
            )
        },
        {
            number: "06",
            title: "CMANS",
            heading: "Comprehensive Maritime Analytics & Navigation System",
            description: (
                <>
                    CMANS delivers sophisticated analytics and navigation capabilities that optimize vessel routing and
                    maritime operations. The system integrates real-time weather data, sea state conditions, traffic
                    patterns, port congestion forecasts, and fuel cost variations to recommend optimal routes that
                    minimize fuel consumption, reduce transit time, and avoid operational delays. Advanced predictive
                    analytics forecast port arrival times with high accuracy, enabling terminal operators to prepare
                    resources and manage workforce scheduling efficiently. CMANS provides comprehensive historical
                    performance analysis, enabling identification of operational patterns, seasonal trends, and
                    optimization opportunities. The platform integrates with electronic chart display and information
                    systems (ECDIS) and ship bridge systems for seamless navigation support. Additional analytics cover
                    cargo handling efficiency, port performance trends, supply chain visibility, and operational cost
                    analysis, providing decision-makers with the insights needed to optimize maritime operations and
                    enhance profitability.
                </>
            )
        },
        {
            number: "07",
            title: "AMABIP",
            heading: "Autonomous Maritime Asset & Business Intelligence Platform",
            description: (
                <>
                    AMABIP leverages artificial intelligence and business intelligence to enable autonomous
                    decision-making in maritime operations. The platform collects data from all operational systems
                    vessels, terminals, equipment, cargo systems, and third-party services creating a comprehensive
                    operational data lake. Advanced machine learning models analyze this data to identify patterns,
                    predict equipment failures, optimize resource allocation, and recommend autonomous operational
                    decisions that improve efficiency and reduce costs. AMABIP provides comprehensive business
                    intelligence dashboards delivering real-time visibility into key performance indicators, financial
                    metrics, compliance status, and operational efficiency measures. The platform enables autonomous
                    scheduling optimization, predictive maintenance, dynamic pricing, and resource allocation decisions
                    with minimal manual intervention. AMABIP supports scenario planning and "what-if" analysis for
                    strategic decision-making, competitive benchmarking against industry standards, and strategic
                    recommendations based on comprehensive operational and market analysis. This transforms maritime
                    operations from reactive management to proactive, data-driven autonomy that maximizes profitability
                    and competitive advantage.
                </>
            )
        },
    ];

    useEffect(() => {
        const updateScreen = () => {
            setIsDesktop(window.innerWidth >= 768);
        };
        updateScreen();
        window.addEventListener("resize", updateScreen);
        return () => window.removeEventListener("resize", updateScreen);
    }, []);

    const handleClick = (idx: number) => {
        setActiveAcc((prev) => (prev === idx ? null : idx));
    };

    // Engineering Leadership in the App Economy
    const [webIndex, setWebIndex] = useState<number | null>(null);

    const toggleWeb = (index: number) => {
        setWebIndex(webIndex === index ? null : index);
    }

    // Maritime Port Management Watermark
    const [activeStep, setActiveStep] = useState<number>(0);
    const [mousePosition, setMousePosition] = useState({x: 0, y: 0});

    const [isMounted, setIsMounted] = useState(false);
    const [viewport, setViewport] = useState(() => ({
        width: typeof window !== 'undefined' ? window.innerWidth : 0,
        height: typeof window !== 'undefined' ? window.innerHeight : 0,
    }));

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        // schedule mounted flag asynchronously to avoid synchronous setState in effect
        const rafId = requestAnimationFrame(() => setIsMounted(true));

        const update = () => setViewport({width: window.innerWidth, height: window.innerHeight});
        window.addEventListener('resize', update);

        return () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener('resize', update);
        };
    }, []);

    const processSteps: ProcessStep[] = [
        {
            title: "Assessment",
            content: [
                "Our maritime engagement commences with a comprehensive port operations analysis, where we systematically examine the multifaceted dimensions of your maritime ecosystem. Our specialized maritime development team conducts an in-depth evaluation of your operational infrastructure, carefully analyzing your existing vessel schedules, cargo throughput, berth utilization, regulatory compliance frameworks, and long-term strategic vision. This rigorous discovery phase enables us to architect a port management solution that is precisely calibrated to address your port&#39;s distinct operational challenges and maritime imperatives.",
                "Following this thorough assessment, we develop a meticulously structured maritime implementation roadmap that serves as the blueprint for your operational transformation initiative. This strategic framework is deliberately engineered to align with your port objectives, ensuring seamless integration with your current maritime processes while positioning your port for sustainable competitive advantage. Our methodology emphasizes stakeholder collaboration, risk mitigation, and measurable outcomes, guaranteeing that every component of the implementation strategy directly contributes to your overarching maritime goals and delivers tangible value across all operational dimensions."
            ]
        },
        {
            title: "Deploy",
            content: [
                "Our specialized design team translates the strategic roadmap into intuitive user interface and user experience architectures that prioritize maritime operational efficiency and stakeholder adoption. Simultaneously, our maritime development specialists leverage these specifications to engineer a robust technical infrastructure, constructing both sophisticated front-end interfaces and scalable back-end systems that ensure optimal performance, data integrity, and system reliability across your port environment.",
                "During this critical deployment phase, we execute comprehensive system integration protocols, including strategic API deployment, port infrastructure connectivity, and the seamless incorporation of your existing maritime dashboards and reporting tools. This holistic integration approach ensures data consistency, eliminates operational silos, and creates a unified maritime digital ecosystem that enhances cross-functional collaboration while maintaining the flexibility to adapt to your evolving port requirements."
            ]
        },
        {
            title: "Optimize",
            content: [
                "Upon completion of rigorous quality assurance protocols encompassing both technical validation and maritime operations testing, our deployment specialists orchestrate the strategic integration of your new maritime solutions into your established port frameworks. This carefully managed transition ensures minimal disruption to port operations while maximizing the immediate value realization of newly implemented functionalities and system capabilities across all maritime touchpoints.",
                "Concurrently, we establish comprehensive maritime governance infrastructures that encompass robust collection mechanisms, advanced analytical frameworks, and intelligent reporting systems designed to drive informed decision-making. Our team provides extensive support and enablement to maritime stakeholders, implementing role-based access controls, delivering targeted maritime training programs, and ensuring proper system administration protocols are in place. This holistic approach guarantees that your port possesses both the technical infrastructure and the maritime operational proficiency necessary to leverage your maritime investment for sustained competitive advantage and port excellence."
            ]
        }
    ];

    return (
        <div className={`${isDayTime ? 'bg-white' : 'bg-black'} min-h-screen`}>

            {/* Unified Futuristic Maritime Port Management Hero - Background Image/Video with overlay */}
            <section className="relative overflow-hidden lg:w-full lg:min-h-[90vh] lg:h-[720px] w-full h-[600px]">
                {/* Background Image/Video */}
                {/* Video Background (plays on desktop, image on mobile) */}
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="hidden lg:block absolute inset-0 w-full h-full object-cover"
                    poster="/assets/maritime/hero.jpg"
                >
                    <source src="/assets/maritime/hero.mp4" type="video/mp4"/>
                </video>

                {/* Fallback Image Background for Mobile and Video Fallback */}
                <Image
                    src="/assets/maritime/hero.jpg"
                    alt="Maritime Port Management Hero"
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
                    className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(15,244,221,0.12),transparent_50%)] z-[2]"/>

                {/* Futuristic FX Elements */}
                <div className="pointer-events-none absolute inset-0 z-[3]">
                    <div className="gx-scanline"/>
                    <div className="gx-noise-overlay"/>
                    <div className="gx-orbit absolute"
                         style={{width: '60vmax', height: '60vmax', top: '-20vmax', right: '-20vmax', opacity: .12}}/>
                    <div className="gx-orbit absolute"
                         style={{width: '40vmax', height: '40vmax', bottom: '-15vmax', left: '-10vmax', opacity: .08}}/>
                </div>

                {/* Content Container - Two Column Layout */}
                <div
                    className="absolute inset-0 flex items-center top-32 z-[11] px-6 sm:px-6 md:px-10 lg:px-[4.5em]">
                    <div className="w-full grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        {/* Left Column - Main Content */}
                        <div>
                            {/* Eyebrow with animated dot */}
                            <div className="flex items-center gap-3 mb-6 lg:mb-8">
                                <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"/>
                                <span
                                    className="text-cyan-400 text-[0.7em] lg:text-[0.82em] uppercase tracking-[0.22em] font-[600]">Maritime Operations Management</span>
                            </div>

                            {/* Main Heading with Gradient */}
                            <h1 className="text-white text-[2em] lg:text-[4.5em] font-[700] leading-[1.08] tracking-tight mb-6 lg:mb-8">
                                Optimize Port Operations &amp; <span
                                className="gx-gradient-text">Maximize Throughput</span>
                            </h1>

                            {/* Description */}
                            <p className="text-white/70 text-[0.85em] lg:text-[1.08em] leading-[1.65] mb-8 lg:mb-10 font-[300]">
                                From vessel scheduling and cargo management to berth optimization and compliance
                                tracking, we deliver intelligent maritime solutions that streamline operations, automate
                                workflows, and provide real-time visibility. Transform your port into a unified,
                                data-driven operation that maximizes efficiency and profitability.
                            </p>

                            {/* Key Capabilities Pills */}
                            <div className="flex flex-wrap gap-2 mb-10 lg:mb-12">
                                {["Vessel Tracking", "Cargo Management", "Port Scheduling", "Compliance", "Analytics", "Automation"].map((badge) => (
                                    <span key={badge}
                                          className="px-3 py-1.5 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 text-[0.7em] lg:text-[0.75em] font-[600] uppercase tracking-wider">
                                            {badge}
                                        </span>
                                ))}
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex flex-wrap gap-4 items-center">
                                <Link href="/contact">
                                    <button
                                        className="relative px-8 py-3 rounded-full text-[0.85em] lg:text-[0.88em] font-bold overflow-hidden hover:shadow-lg transition-shadow duration-300 whitespace-nowrap"
                                        style={{background: '#0ff4dd', color: '#000'}}>
                                            <span className="absolute inset-0" style={{
                                                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)'
                                            }}/>
                                        <span className="relative">Schedule Consultation ?</span>
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
                                    {label: 'Port Implementations', value: '4+'},
                                    {label: 'Years of Maritime Expertise', value: '8+'},
                                    {label: 'Throughput Optimization', value: '90%'},
                                    {label: 'Cost Reduction', value: '40%'}
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
                            {label: 'Ports', value: '20+'},
                            {label: 'Maritime Experts', value: '8+'},
                            {label: 'Optimization', value: '90%'}
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

                {/* Animated Particles */}
                <div className="absolute top-1/4 left-8 z-[4] w-2 h-2 rounded-full bg-cyan-400 animate-pulse"/>
                <div className="absolute bottom-1/3 right-12 z-[4] w-3 h-3 rounded-full bg-cyan-500 animate-pulse"
                     style={{animationDelay: '0.5s'}}/>
                <div className="absolute top-3/4 left-1/3 z-[4] w-2 h-2 rounded-full bg-teal-400 animate-pulse"
                     style={{animationDelay: '1s'}}/>
            </section>

            {/* Introductory section (professional futuristic style matching SEO) */}
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
                        <FxChip day={!isBackgroundActive ? !isDayTime : isDayTime}>MARITIME OPTIMIZATION</FxChip>
                    </div>

                    <div className="lg:-ml-[19em]">
                        <FxReveal>
                            <h3 className="lg:text-[3.5em] md:text-[3em] text-[2em] font-[700] tracking-tight leading-[1.15] mt-4">
                                Transform Enterprise Operations with Advanced <span className="gx-gradient-text">maritime solutions</span>
                            </h3>
                        </FxReveal>

                        <FxReveal delay={0.08}>
                            <div
                                className="grid lg:grid-cols-2 grid-cols-1 gap-4 mt-4 font-[300] text-justify text-[0.95em] md:text-[1.05em] leading-relaxed">
                                <div>
                                    <p>Our Maritime Operations Management software development services deliver
                                        transformative business solutions engineered to revolutionize operational
                                        efficiency, streamline cross-departmental workflows, and accelerate digital
                                        transformation across your organization. We architect enterprise-grade platforms
                                        that seamlessly consolidate critical business functions including financial
                                        management, human capital systems, supply chain operations, inventory
                                        optimization, procurement automation, and advanced business intelligence into
                                        unified, real-time integrated systems. Our proprietary maritime solutions
                                        consistently deliver up to 90% efficiency optimization, substantial reductions
                                        in operational expenditures, complete elimination of process redundancies, and
                                        measurable improvements in organizational agility across all business units.</p>
                                </div>
                                <div>
                                    <p>We combine deep technical excellence, cloud-native architecture principles, and
                                        proprietary data-driven methodologies to help your organization achieve
                                        sustained operational excellence and establish measurable competitive advantage
                                        in dynamic markets. Our custom-built Maritime Port Management platforms are
                                        meticulously architected
                                        and tailored to address your unique business requirements, industry-specific
                                        regulations, compliance frameworks, and long-term growth trajectory. Featuring
                                        intuitive mobile and web applications, interactive real-time dashboards,
                                        predictive analytics engines, and comprehensive decision-support systems, we
                                        empower enterprise stakeholders and decision-makers at every organizational
                                        level while ensuring enterprise-grade security, unlimited scalability,
                                        regulatory compliance, and long-term technological sustainability across
                                        evolving market environments.</p>
                                    <div className="flex flex-wrap gap-3 mt-4">
                                        {['Process Automation', 'Real-Time Analytics', 'System Integration', 'Cloud Architecture', 'AI/ML Capabilities', 'Enterprise Security'].map((p) => (
                                            <span key={p} className="gx-data-pill">{p}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </FxReveal>

                        <FxReveal delay={0.16}>
                            <div className="mt-12 pt-8 border-t border-white/10">
                                <h4 className="text-[1.2em] font-[600] tracking-tight mb-6">Comprehensive Maritime Port
                                    Management
                                    Capabilities</h4>
                                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
                                    {[
                                        {
                                            title: 'Financial Management',
                                            items: ['General Ledger', 'Accounts Payable/Receivable', 'Fixed Assets', 'Multi-Currency Support', 'Financial Reporting', 'Compliance Automation']
                                        },
                                        {
                                            title: 'Supply Chain & Logistics',
                                            items: ['Demand Planning', 'Inventory Management', 'Supplier Collaboration', 'Procurement Automation', 'Warehouse Optimization', 'Distribution Network']
                                        },
                                        {
                                            title: 'Human Capital & Operations',
                                            items: ['Workforce Planning', 'Payroll Processing', 'Talent Management', 'Production Planning', 'Quality Management', 'Operational Analytics']
                                        }
                                    ].map((capability, idx) => (
                                        <div key={idx}
                                             className="p-4 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors duration-300">
                                            <h5 className="font-[600] text-[0.95em] mb-3 text-white">{capability.title}</h5>
                                            <ul className="space-y-2">
                                                {capability.items.map((item, i) => (
                                                    <li key={i} className="text-[0.85em] flex items-start gap-2">
                                                        <span className="text-cyan-400 font-bold mt-0.5"> </span>
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
                            <div className="mt-12 pt-8 border-t border-white/10">
                                <h4 className="text-[1.2em] font-[600] tracking-tight mb-6">Strategic Business
                                    Outcomes</h4>
                                <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
                                    {[
                                        {
                                            metric: 'Process Efficiency',
                                            value: '90%',
                                            description: 'Average operational efficiency gains across enterprise workflows'
                                        },
                                        {
                                            metric: 'Cost Reduction',
                                            value: '40%',
                                            description: 'Typical reduction in operational expenditures within first year'
                                        },
                                        {
                                            metric: 'Time-to-Decision',
                                            value: '75%',
                                            description: 'Faster data-driven decision-making with real-time insights'
                                        },
                                        {
                                            metric: 'System Uptime',
                                            value: '99.95%',
                                            description: 'Enterprise-grade availability and disaster recovery capabilities'
                                        }
                                    ].map((outcome, idx) => (
                                        <div key={idx}
                                             className="p-4 rounded-lg border border-cyan-400/20 bg-cyan-400/5 hover:bg-cyan-400/10 transition-colors duration-300">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <p className=" text-[0.85em] font-[500] mb-2">{outcome.metric}</p>
                                                    <p className="text-[2em] font-[700] text-cyan-400 mb-2">{outcome.value}</p>
                                                    <p className="text-[0.8em] ">{outcome.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </FxReveal>
                    </div>
                </div>
            </section>

            {/* maritime development services overview - Enhanced with FxStickyScrollSection */}
            <FxStickyScrollSection
                day={isDayTime}
                heading={<>maritime development<br/>services overview</>}
                intro="Our Maritime Operations Management development services are engineered to transform organizational operations through intelligent system integration, process automation, and intelligent workflows. We combine deep technical expertise, cloud-native architecture, and industry best practices to deliver custom maritime solutions that drive operational excellence, ensure regulatory compliance, and position your enterprise for sustained competitive advantage in dynamic markets."
                navLabel="maritime solutions"
                activeId={activeId}
                onNavClickAction={scrollToSection}
                items={[
                    {
                        id: "01",
                        title: "Custom maritime solutions & Development",
                        target: "VFM",
                        tags: ["System Architecture", "Integration", "Customization"],
                        body: (
                            <div>
                                <p>
                                    We design and develop fully customized Maritime Operations Management systems
                                    engineered specifically around your unique organizational structure, operational
                                    workflows, industry regulations, and strategic business objectives. Our custom
                                    Maritime Port Management
                                    solutions provide comprehensive integration of all critical business
                                    functions -including financial management systems, procurement automation, inventory
                                    control optimization, supply chain operations, human capital management, customer
                                    relationship systems, and advanced business intelligence into a unified, centralized
                                    platform. By eliminating operational silos and creating a single source of truth for
                                    enterprise data, we enable real-time visibility across all departments, facilitate
                                    data-driven decision-making at every organizational level, improve cross-functional
                                    collaboration, and establish scalable digital infrastructure that evolves alongside
                                    your business growth trajectory and changing market demands.
                                </p>
                                <p className="mt-3">
                                    Our development process encompasses detailed requirements analysis, system
                                    architecture design, database optimization, API development, user interface
                                    creation, security implementation, and comprehensive testing. We ensure your
                                    Maritime Port Management
                                    solution delivers measurable business value through improved efficiency, reduced
                                    operational costs, enhanced data accuracy, and accelerated decision-making cycles.
                                </p>
                            </div>
                        ),
                    },
                    {
                        id: "02",
                        title: "Maritime Port Management Integration & Legacy System Migration",
                        target: "POP",
                        tags: ["System Integration", "Data Migration", "Legacy Modernization"],
                        body: (
                            <div>
                                <p>
                                    Our experienced integration specialists deliver comprehensive Maritime Port
                                    Management implementation
                                    services that seamlessly connect your Maritime Operations Management platform with
                                    your entire existing technology ecosystem, including customer relationship
                                    management systems, e-commerce platforms, business intelligence tools, accounting
                                    software, warehouse management systems, manufacturing execution systems, supply
                                    chain visibility platforms, and specialized third-party applications. We execute
                                    meticulously planned data migration strategies from legacy systems with multi-phase
                                    validation protocols, comprehensive data cleansing procedures, thorough testing
                                    frameworks, and robust rollback mechanisms to guarantee data accuracy, maintain
                                    referential integrity, preserve historical records, and ensure zero disruption to
                                    daily operations.
                                </p>
                                <p className="mt-3">
                                    Our phased implementation approach minimizes business risk, enables stakeholder
                                    training at each stage, allows for iterative refinement based on user feedback, and
                                    ensures smooth organizational change management throughout the entire transformation
                                    journey. We provide continuous monitoring, performance validation, and
                                    post-implementation support to ensure optimal system performance and user adoption.
                                </p>
                            </div>
                        ),
                    },
                    {
                        id: "03",
                        title: "Cloud-Native Maritime Port Management Architecture & Development",
                        target: "CMS",
                        tags: ["Cloud Infrastructure", "Scalability", "Security Compliance"],
                        body: (
                            <div>
                                <p>
                                    We architect and deploy sophisticated cloud-native maritime solutions leveraging
                                    industry-leading infrastructure providers including Amazon Web Services (AWS),
                                    Microsoft Azure, Google Cloud Platform (GCP), and hybrid cloud configurations
                                    tailored to your specific security, compliance, and performance requirements. Our
                                    cloud Maritime Port Management implementations deliver exceptional scalability to
                                    accommodate business
                                    growth and seasonal demand fluctuations, provide anywhere-anytime access for
                                    distributed teams and remote workforces, enable automatic infrastructure scaling
                                    without capital expenditure, offer built-in redundancy and disaster recovery
                                    capabilities, and reduce total cost of ownership by eliminating on-premise hardware
                                    maintenance expenses.
                                </p>
                                <p className="mt-3">
                                    We maintain enterprise-grade security with advanced encryption protocols,
                                    multi-factor authentication, role-based access controls, and continuous compliance
                                    monitoring aligned with industry standards including SOC 2 Type II certification,
                                    ISO 27001, GDPR compliance, HIPAA requirements, PCI DSS, and sector-specific
                                    regulatory frameworks. Our cloud-first approach ensures your maritime system remains
                                    modern, secure, and competitive while providing unlimited growth potential.
                                </p>
                            </div>
                        ),
                    },
                    {
                        id: "04",
                        title: "Maritime Port Management Modernization, AI Integration & Optimization",
                        target: "OPE",
                        tags: ["Legacy Transformation", "AI/ML Integration", "Performance Optimization"],
                        body: (
                            <div>
                                <p>
                                    We transform legacy Maritime Port Management infrastructure through comprehensive
                                    modernization
                                    initiatives that re-architect outdated systems with contemporary technology stacks,
                                    microservices architectures, API-first design principles, and cloud-ready
                                    frameworks. Our modernization services enhance user experience through intuitive
                                    interface redesign based on modern UX principles, implement advanced analytics and
                                    business intelligence capabilities powered by machine learning algorithms, integrate
                                    artificial intelligence for predictive insights and automated decision support,
                                    deploy robotic process automation for repetitive tasks, optimize database
                                    performance and query efficiency, and streamline workflows to eliminate bottlenecks.
                                </p>
                                <p className="mt-3">
                                    We establish continuous integration and deployment pipelines for agile system
                                    evolution and innovation. These enhancements dramatically improve system
                                    responsiveness, accelerate user adoption rates across the organization, reduce
                                    operational costs through intelligent automation, increase employee productivity,
                                    deliver measurable return on investment, and extend the lifecycle of your Maritime
                                    Port Management
                                    investment while positioning your systems as competitive advantages.
                                </p>
                            </div>
                        ),
                    },
                    {
                        id: "05",
                        title: "Industry-Specific maritime solutions",
                        target: "CSM",
                        tags: ["Vertical Solutions", "Compliance", "Best Practices"],
                        body: (
                            <div>
                                <p>
                                    We develop highly specialized maritime solutions meticulously designed to address
                                    the
                                    distinctive operational challenges, regulatory landscapes, competitive requirements,
                                    and industry-specific workflows of manufacturing, healthcare, retail, finance,
                                    logistics, e-commerce, energy, utilities, and government sectors. Our
                                    vertical-specific solutions incorporate industry best practices, pre-configured
                                    workflows, validated business processes, compliance controls, and domain expertise
                                    developed through years of sector-specific experience. Whether serving automotive
                                    supply chains, pharmaceutical manufacturers, financial services firms, retail
                                    enterprises, healthcare systems, or government agencies, we deliver tailored
                                    solutions optimized for your sector's unique operational context.
                                </p>
                                <p className="mt-3">
                                    Our industry-specific implementations accelerate time-to-value by starting with
                                    proven configuration templates, reduce implementation risk through pre-built
                                    compliance controls, ensure regulatory adherence through built-in frameworks, and
                                    deliver faster ROI by eliminating redundant customization. We combine deep industry
                                    knowledge with technical excellence to ensure your maritime system becomes a
                                    competitive
                                    differentiator.
                                </p>
                            </div>
                        ),
                    },
                    {
                        id: "06",
                        title: "Maritime Port Management Support, Maintenance & Continuous Optimization",
                        target: "MAN",
                        tags: ["Support Services", "Performance Tuning", "System Evolution"],
                        body: (
                            <div>
                                <p>
                                    We provide comprehensive Maritime Port Management support and maintenance services
                                    including 24/7/365
                                    technical support, proactive system monitoring, performance optimization, security
                                    patching, data backup management, disaster recovery testing, and continuous system
                                    evolution. Our dedicated support teams ensure your Maritime Port Management platform
                                    operates at peak
                                    performance, addresses emerging challenges rapidly, adapts to changing business
                                    requirements, and delivers consistent value to your organization. We conduct regular
                                    system health checks, optimization reviews, user training programs, and strategic
                                    consultations to maximize your Maritime Port Management investment.
                                </p>
                                <p className="mt-3">
                                    Our proactive maintenance approach prevents issues before they impact operations,
                                    optimizes system performance through database tuning and infrastructure scaling,
                                    ensures security through continuous vulnerability assessments and patching, and
                                    enables business evolution through system upgrades and feature enhancements. With
                                    our support, your maritime system remains a reliable foundation for business
                                    operations
                                    and continuous competitive advantage.
                                </p>
                            </div>
                        ),
                    },
                ]}
            />

            {/* Service item sections with IDs for scroll tracking */}
            <div id="VFM" className="scroll-mt-20"/>
            <div id="POP" className="scroll-mt-20"/>
            <div id="CMS" className="scroll-mt-20"/>
            <div id="OPE" className="scroll-mt-20"/>
            <div id="CSM" className="scroll-mt-20"/>
            <div id="MAN" className="scroll-mt-20"/>

            {/* maritime solutions For Diverse Industries */}
            <div
                className={`lg:pt-[3em] md:pt-[2.5em] pt-[1.5em] lg:pb-[3em] md:pb-[2.5em] pb-[1.5em] relative overflow-hidden ${isDayTime ? 'bg-black' : 'bg-white'}`}>
                {/* Animated background gradient */}
                <div
                    className={`absolute inset-0 ${isDayTime ? 'bg-gradient-to-br from-[#031E29]/30 via-transparent to-[#041f2d]/30' : 'bg-gradient-to-br from-[#f0f9ff]/50 via-transparent to-[#f3e8ff]/50'} pointer-events-none`}/>
                <div id={'backend technology'}
                     className={`relative lg:mt-[1.5em] md:mt-[1.5em] mt-[1em] lg:mb-16 md:mb-16 mb-5 max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em] z-10`}>

                    {/* Header with EXTREME Detail - Enhanced Visibility & Animation */}
                    <div
                        className={`relative grid lg:grid-cols-2 grid-cols-1 lg:gap-14 gap-6 border-b-2 lg:pb-[3em] md:pb-[3em] pb-[1em] mb-20 ${
                            isDayTime ? 'text-white border-[#0ef0dd]/30' : 'text-black border-[#0ef0dd]/20'
                        }`}>
                        <div className='animate-fade-in'>
                            <h2 className={`capitalize text-[1.8em] md:text-[3em] lg:text-[3.3em] font-[800] tracking-tight leading-[1.2] lg:pb-6 text-shadow-lg`}>
                                <span className={`text-[#0ef0dd] drop-shadow-lg`}>Enterprise-Grade Maritime Port Management</span>
                                <br
                                    className={'lg:block md:block hidden'}/>Solutions Engineered for <span
                                className={`text-[#06b6d4] drop-shadow-lg`}>Global Scale & Compliance</span>
                            </h2>
                            <p className={`text-[0.9em] font-[400] leading-[1.7] mb-4 ${isDayTime ? 'text-gray-300' : 'text-gray-700'}`}>
                                Transform your entire business infrastructure with AI-powered intelligent automation and
                                real-time visibility across all enterprise operations
                            </p>
                            <div className={`flex gap-2 mt-5 flex-wrap`}>
                                <span
                                    className={`text-[0.75em] px-4 py-2 rounded-full border font-[600] transition-all hover:scale-110 ${isDayTime ? 'border-[#0ef0dd]/60 bg-[#0ef0dd]/20 text-[#0ef0dd]' : 'border-[#0ef0dd]/40 bg-[#0ef0dd]/15 text-[#0ef0dd]'}`}>?? Multi-Industry Support</span>
                                <span
                                    className={`text-[0.75em] px-4 py-2 rounded-full border font-[600] transition-all hover:scale-110 ${isDayTime ? 'border-[#06b6d4]/60 bg-[#06b6d4]/20 text-[#06b6d4]' : 'border-[#06b6d4]/40 bg-[#06b6d4]/15 text-[#06b6d4]'}`}>?? AI & Automation</span>
                                <span
                                    className={`text-[0.75em] px-4 py-2 rounded-full border font-[600] transition-all hover:scale-110 ${isDayTime ? 'border-[#7c3aed]/60 bg-[#7c3aed]/20 text-[#7c3aed]' : 'border-[#7c3aed]/40 bg-[#7c3aed]/15 text-[#7c3aed]'}`}>? Regulatory Compliance</span>
                                <span
                                    className={`text-[0.75em] px-4 py-2 rounded-full border font-[600] transition-all hover:scale-110 ${isDayTime ? 'border-[#f59e0b]/60 bg-[#f59e0b]/20 text-[#f59e0b]' : 'border-[#f59e0b]/40 bg-[#f59e0b]/15 text-[#f59e0b]'}`}>?? Cloud Native</span>
                                <span
                                    className={`text-[0.75em] px-4 py-2 rounded-full border font-[600] transition-all hover:scale-110 ${isDayTime ? 'border-[#10b981]/60 bg-[#10b981]/20 text-[#10b981]' : 'border-[#10b981]/40 bg-[#10b981]/15 text-[#10b981]'}`}>? 99.9% Uptime SLA</span>
                            </div>
                        </div>
                        <div className='animate-fade-in-delayed'>
                            <p className={`text-[0.92em] font-[400] lg:-mt-[0.2em] rounded-lg leading-[1.85] mb-5 p-5 ${isDayTime ? 'bg-[#0ef0dd]/5 border border-[#0ef0dd]/20' : 'bg-[#0ef0dd]/5 border border-[#0ef0dd]/20'}`}>
                                Our Maritime Operations Management solutions represent the apex of modern digital
                                transformation, meticulously engineered to satisfy the most demanding operational
                                requirements across manufacturing, healthcare, retail, logistics, financial services,
                                pharmaceuticals, energy, maritime & port management, and emerging industries. We deliver
                                sophisticated, industry-specific configurations backed by 8+ years of deep domain
                                expertise, ensuring your organization seamlessly navigates intricate regulatory
                                landscapes (GDPR, HIPAA, SOX, FDA, ISO), optimizes mission-critical workflows, and
                                overcomes sector-specific challenges with surgical precision. Our Maritime Port
                                Management implementations
                                consistently drive double-digit ROI through end-to-end process optimization,
                                enterprise-wide visibility, significant operational cost reduction (30-40%),
                                dramatically accelerated time-to-cash cycles (50-60% improvement), and absolute
                                enterprise-grade security & reliability standards across your entire interconnected
                                business ecosystem.
                            </p>
                            <div className={`grid grid-cols-2 gap-4 mb-5`}>
                                <div
                                    className={`p-4 rounded-xl border-l-4 transition-all hover:shadow-lg ${isDayTime ? 'border-[#0ef0dd]/80 bg-gradient-to-br from-[#0ef0dd]/15 to-[#0ef0dd]/5' : 'border-[#0ef0dd]/60 bg-gradient-to-br from-[#0ef0dd]/20 to-[#0ef0dd]/10'}`}>
                                    <p className={`text-[0.8em] font-[800] ${isDayTime ? 'text-[#0ef0dd]' : 'text-[#0ef0dd]'}`}>500+</p>
                                    <p className={`text-[0.75em] font-[600] ${isDayTime ? 'text-gray-400' : 'text-gray-600'}`}>Implementations</p>
                                </div>
                                <div
                                    className={`p-4 rounded-xl border-l-4 transition-all hover:shadow-lg ${isDayTime ? 'border-[#06b6d4]/80 bg-gradient-to-br from-[#06b6d4]/15 to-[#06b6d4]/5' : 'border-[#06b6d4]/60 bg-gradient-to-br from-[#06b6d4]/20 to-[#06b6d4]/10'}`}>
                                    <p className={`text-[0.8em] font-[800] ${isDayTime ? 'text-[#06b6d4]' : 'text-[#06b6d4]'}`}>25+</p>
                                    <p className={`text-[0.75em] font-[600] ${isDayTime ? 'text-gray-400' : 'text-gray-600'}`}>Industries</p>
                                </div>
                                <div
                                    className={`p-4 rounded-xl border-l-4 transition-all hover:shadow-lg ${isDayTime ? 'border-[#7c3aed]/80 bg-gradient-to-br from-[#7c3aed]/15 to-[#7c3aed]/5' : 'border-[#7c3aed]/60 bg-gradient-to-br from-[#7c3aed]/20 to-[#7c3aed]/10'}`}>
                                    <p className={`text-[0.8em] font-[800] ${isDayTime ? 'text-[#7c3aed]' : 'text-[#7c3aed]'}`}>$2B+</p>
                                    <p className={`text-[0.75em] font-[600] ${isDayTime ? 'text-gray-400' : 'text-gray-600'}`}>Enterprise
                                        Value</p>
                                </div>
                                <div
                                    className={`p-4 rounded-xl border-l-4 transition-all hover:shadow-lg ${isDayTime ? 'border-[#f59e0b]/80 bg-gradient-to-br from-[#f59e0b]/15 to-[#f59e0b]/5' : 'border-[#f59e0b]/60 bg-gradient-to-br from-[#f59e0b]/20 to-[#f59e0b]/10'}`}>
                                    <p className={`text-[0.8em] font-[800] ${isDayTime ? 'text-[#f59e0b]' : 'text-[#f59e0b]'}`}>98%</p>
                                    <p className={`text-[0.75em] font-[600] ${isDayTime ? 'text-gray-400' : 'text-gray-600'}`}>Success
                                        Rate</p>
                                </div>
                            </div>
                            <div
                                className={`p-5 rounded-xl border-l-4 ${isDayTime ? 'border-[#0ef0dd] bg-gradient-to-r from-[#0ef0dd]/10 to-transparent' : 'border-[#0ef0dd]/50 bg-gradient-to-r from-[#0ef0dd]/15 to-transparent'}`}>
                                <p className={`text-[0.85em] font-[600] leading-[1.8] ${isDayTime ? 'text-gray-200' : 'text-gray-800'}`}>
                                    ?? <strong>Industry-Leading Expertise:</strong> 500+ successful implementations
                                    across 25+ industries with $2B+ in managed enterprise value, 98% on-time delivery
                                    rate, and average 3.5-year ROI payback period ensuring measurable business outcomes
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Accordion Tabs with Enhanced Styling & Maximum Visibility */}
                    <div
                        className={`flex max-w-full mx-auto gap-[2px] ${isDesktop ? "flex-row h-[600px]" : "flex-col h-auto"}`}>
                        {steps.map((step, idx) => {
                            const isActive = idx === activeAcc;

                            return (
                                <div
                                    key={idx}
                                    className={`transition-all duration-700 ease-in-out flex flex-col bg-gradient-to-br ${isDayTime ? 'from-[#031E29] via-[#041f2d] to-[#0a2d3a]' : 'from-[#f8fafb] via-[#f0f3f7] to-[#e8ecf1]'} border-2 ${isDayTime ? 'border-[#0E3B46]' : 'border-[#d1e7f1]'} rounded-xl overflow-hidden transition-all shadow-xl hover:shadow-2xl relative ${
                                        isActive ? isDayTime ? 'hover:border-[#0ef0dd]/80' : 'hover:border-[#0ef0dd]/60' : isDayTime ? 'hover:border-[#0ef0dd]/40' : 'hover:border-[#06b6d4]/40'
                                    } ${
                                        isDesktop ? "mx-[0.15em]" : "mb-4"
                                    }`}
                                    style={{
                                        width: isDesktop
                                            ? isActive
                                                ? '100%'
                                                : '70px'
                                            : '100%'
                                    }}
                                >
                                    {/* Inactive Panel - Compact */}
                                    {!isActive && (
                                        <div
                                            onClick={() => handleClick(idx)}
                                            className={`flex cursor-pointer group hover:${isDayTime ? 'bg-[#0E3B46]/50' : 'bg-[#0ef0dd]/8'} transition-all duration-300 ${
                                                isDesktop
                                                    ? "flex-col items-center justify-center h-full pt-6 px-3"
                                                    : "flex-row items-center p-6"
                                            }`}>
                                            <div
                                                className={`${isDayTime ? 'text-[#0ef0dd]' : 'text-[#0ef0dd]'} text-[2.2em] font-[800] group-hover:scale-125 transition-transform duration-300`}>
                                                {step.number}
                                            </div>

                                            <div
                                                className={`${isDesktop ? 'flex items-center justify-center h-full flex-col' : 'items-center w-full '}`}>
                                                <span
                                                    className={`text-[0.8em] font-[700] tracking-wider uppercase ${isDayTime ? 'text-gray-500 group-hover:text-[#0ef0dd]' : 'text-gray-700 group-hover:text-[#0ef0dd]'} transition-all duration-300 ${
                                                        isDesktop ? "mt-6 text-center" : "ml-4 text-left"
                                                    }`}
                                                    style={
                                                        isDesktop
                                                            ? {
                                                                writingMode: "vertical-rl",
                                                                transform: "rotate(180deg)",
                                                            }
                                                            : {}
                                                    }
                                                >
                                                    {step.title}
                                                </span>
                                            </div>
                                            <div
                                                className={`text-[0.65em] mt-2 font-[600] ${isDayTime ? 'text-gray-600 group-hover:text-gray-400' : 'text-gray-500 group-hover:text-gray-700'} transition-all duration-300`}>
                                                {isDesktop ? '?' : '?'}
                                            </div>
                                        </div>
                                    )}

                                    {/* Active Panel - EXTREMELY DETAILED & COMPREHENSIVE */}
                                    {isActive && (
                                        <div
                                            className={`flex ${
                                                isDesktop ? "flex-row" : "flex-col"
                                            } flex-1 cursor-pointer transition-all duration-500`}
                                            onClick={() => handleClick(idx)}
                                        >
                                            <div
                                                className={`${
                                                    isDesktop
                                                        ? 'w-28 flex flex-col items-center justify-start pt-8 border-r px-4'
                                                        : 'flex-row items-center p-6 border-b'
                                                } ${isDayTime ? 'border-[#0E3B46]/70 bg-gradient-to-b from-[#0E3B46]/60 to-[#0E3B46]/20' : 'border-[#d1e7f1] bg-gradient-to-b from-[#f0f9ff] to-[#e8ecf1]'}`}
                                            >
                                                <div
                                                    className={`${isDayTime ? 'text-[#0ef0dd]' : 'text-[#0ef0dd]'} text-[2.5em] font-[800] drop-shadow-lg`}>
                                                    {step.number}
                                                </div>

                                                <span
                                                    className={`text-[0.8em] font-[800] tracking-wider uppercase ${isDayTime ? 'text-gray-300' : 'text-gray-800'} ${
                                                        isDesktop ? 'mt-10 text-center' : 'ml-4'}`}
                                                    style={
                                                        isDesktop
                                                            ? {
                                                                writingMode: "vertical-rl",
                                                                transform: "rotate(180deg)",
                                                            }
                                                            : {}
                                                    }
                                                >
                                                    {step.title}
                                                </span>
                                            </div>

                                            {/* Right content - EXTREMELY DETAILED & COMPREHENSIVE */}
                                            <div
                                                className={`flex-1 mx-0 relative overflow-y-auto transition-all duration-500 ease-in-out ${
                                                    isDesktop
                                                        ? "max-h-[600px]"
                                                        : isActive
                                                            ? "max-h-[4000px]"
                                                            : "max-h-0"
                                                }`}
                                            >
                                                <div
                                                    className={`h-full border-l-2 ${isDayTime ? 'border-[#0E3B46]/70' : 'border-[#d1e7f1]'} px-8 md:px-12 py-8 flex flex-col justify-start transform transition-all duration-500 ease-in-out bg-gradient-to-br ${isDayTime ? 'from-[#041f2d]/50 to-transparent' : 'from-white/50 to-transparent'} ${
                                                        isActive
                                                            ? "opacity-100 translate-y-0"
                                                            : "opacity-0 -translate-y-4"
                                                    }`}
                                                >
                                                    {/* Main Heading with Badge */}
                                                    <div className='flex items-start justify-between mb-4 gap-4'>
                                                        <h2 className={`text-2xl md:text-4xl font-[900] ${isDayTime ? 'text-[#0ef0dd]' : 'text-[#0ef0dd]'} leading-tight max-w-4xl drop-shadow-lg`}>
                                                            {step.heading}
                                                        </h2>
                                                        <span
                                                            className={`text-[0.7em] px-3.5 py-1.5 rounded-full font-[700] whitespace-nowrap ml-3 ${isDayTime ? 'bg-gradient-to-r from-[#0ef0dd]/30 to-[#06b6d4]/20 text-[#0ef0dd] border border-[#0ef0dd]/50' : 'bg-gradient-to-r from-[#0ef0dd]/25 to-[#06b6d4]/15 text-[#0ef0dd] border border-[#0ef0dd]/40'}`}>
                                                            {['? Enterprise', '?? Scalable', '?? Intelligent', '? Compliant'][idx] || '?? Advanced'}
                                                        </span>
                                                    </div>

                                                    {/* Subheading */}
                                                    <p className={`text-[1em] font-[700] mb-3 ${isDayTime ? 'text-[#06b6d4]' : 'text-[#0284c7]'} tracking-wide`}>
                                                        ?? Comprehensive Maritime Port Management solution for MARITIME
                                                        OPTIMIZATION
                                                    </p>
                                                    <div
                                                        className={`w-16 h-1.5 rounded-full mb-7 ${isDayTime ? 'bg-gradient-to-r from-[#0ef0dd] via-[#06b6d4] to-[#7c3aed]' : 'bg-gradient-to-r from-[#0ef0dd] via-[#06b6d4] to-[#7c3aed]'} shadow-lg`}/>

                                                    {/* Main Comprehensive Description */}
                                                    <p className={`text-[0.95em] leading-[1.95] mb-8 ${isDayTime ? 'text-gray-200' : 'text-gray-800'} text-justify font-[500]`}>
                                                        {step.description}
                                                    </p>

                                                    {/* Advanced Capabilities Grid - 4 Columns */}
                                                    <div className='mb-8'>
                                                        <h3 className={`text-[1em] font-[800] mb-5 ${isDayTime ? 'text-gray-100' : 'text-gray-900'} uppercase tracking-wider drop-shadow-md`}>??
                                                            Core Capabilities & Features</h3>
                                                        <div
                                                            className={`grid grid-cols-1 md:grid-cols-2 gap-5 p-6 rounded-2xl border-2 ${isDayTime ? 'bg-[#0E3B46]/30 border-[#0E3B46]/60' : 'bg-gradient-to-br from-[#f0f9ff]/80 to-[#e0f7ff]/60 border-[#bae6fd]/70'} backdrop-blur-sm`}>
                                                            <div
                                                                className={`flex gap-4 p-4 rounded-xl transition-all hover:scale-105 ${isDayTime ? 'bg-[#0E3B46]/20 text-gray-200' : 'bg-white/50 text-gray-900'}`}>
                                                                <span
                                                                    className={`text-2xl font-[800] flex-shrink-0`}>?</span>
                                                                <div>
                                                                    <p className='font-[800] text-[0.98em] mb-2'>Real-Time
                                                                        Visibility & Analytics</p>
                                                                    <p className={`text-[0.85em] leading-[1.7] font-[500] ${isDayTime ? 'text-gray-400' : 'text-gray-700'}`}>360-degree
                                                                        operational dashboards with customizable KPI
                                                                        tracking, multi-level drill-down analytics, and
                                                                        AI-powered anomaly detection across all business
                                                                        processes</p>
                                                                </div>
                                                            </div>
                                                            <div
                                                                className={`flex gap-4 p-4 rounded-xl transition-all hover:scale-105 ${isDayTime ? 'bg-[#0E3B46]/20 text-gray-200' : 'bg-white/50 text-gray-900'}`}>
                                                                <span
                                                                    className={`text-2xl font-[800] flex-shrink-0`}>??</span>
                                                                <div>
                                                                    <p className='font-[800] text-[0.98em] mb-2'>Intelligent
                                                                        Workflow Automation</p>
                                                                    <p className={`text-[0.85em] leading-[1.7] font-[500] ${isDayTime ? 'text-gray-400' : 'text-gray-700'}`}>Eliminate
                                                                        95%+ manual tasks through RPA and AI
                                                                        orchestration, with intelligent process mining,
                                                                        bottleneck detection, and continuous
                                                                        optimization algorithms</p>
                                                                </div>
                                                            </div>
                                                            <div
                                                                className={`flex gap-4 p-4 rounded-xl transition-all hover:scale-105 ${isDayTime ? 'bg-[#0E3B46]/20 text-gray-200' : 'bg-white/50 text-gray-900'}`}>
                                                                <span
                                                                    className={`text-2xl font-[800] flex-shrink-0`}>??</span>
                                                                <div>
                                                                    <p className='font-[800] text-[0.98em] mb-2'>Predictive
                                                                        & Prescriptive Intelligence</p>
                                                                    <p className={`text-[0.85em] leading-[1.7] font-[500] ${isDayTime ? 'text-gray-400' : 'text-gray-700'}`}>Advanced
                                                                        ML models for demand forecasting, inventory
                                                                        optimization, risk prediction, and actionable
                                                                        recommendations for supply chain & financial
                                                                        planning</p>
                                                                </div>
                                                            </div>
                                                            <div
                                                                className={`flex gap-4 p-4 rounded-xl transition-all hover:scale-105 ${isDayTime ? 'bg-[#0E3B46]/20 text-gray-200' : 'bg-white/50 text-gray-900'}`}>
                                                                <span
                                                                    className={`text-2xl font-[800] flex-shrink-0`}>??</span>
                                                                <div>
                                                                    <p className='font-[800] text-[0.98em] mb-2'>Enterprise
                                                                        Compliance & Security</p>
                                                                    <p className={`text-[0.85em] leading-[1.7] font-[500] ${isDayTime ? 'text-gray-400' : 'text-gray-700'}`}>Built-in
                                                                        GDPR, HIPAA, SOX, FDA compliance frameworks,
                                                                        advanced role-based access control, full audit
                                                                        trails, encrypted data at rest/transit, and
                                                                        penetration-tested architecture</p>
                                                                </div>
                                                            </div>
                                                            <div
                                                                className={`flex gap-4 p-4 rounded-xl transition-all hover:scale-105 ${isDayTime ? 'bg-[#0E3B46]/20 text-gray-200' : 'bg-white/50 text-gray-900'}`}>
                                                                <span
                                                                    className={`text-2xl font-[800] flex-shrink-0`}>??</span>
                                                                <div>
                                                                    <p className='font-[800] text-[0.98em] mb-2'>Advanced
                                                                        Financial Management</p>
                                                                    <p className={`text-[0.85em] leading-[1.7] font-[500] ${isDayTime ? 'text-gray-400' : 'text-gray-700'}`}>Multi-currency,
                                                                        multi-entity consolidation with real-time GL
                                                                        reconciliation, cash flow forecasting, variance
                                                                        analysis, and integrated statutory/management
                                                                        reporting</p>
                                                                </div>
                                                            </div>
                                                            <div
                                                                className={`flex gap-4 p-4 rounded-xl transition-all hover:scale-105 ${isDayTime ? 'bg-[#0E3B46]/20 text-gray-200' : 'bg-white/50 text-gray-900'}`}>
                                                                <span
                                                                    className={`text-2xl font-[800] flex-shrink-0`}>??</span>
                                                                <div>
                                                                    <p className='font-[800] text-[0.98em] mb-2'>Global
                                                                        Supply Chain Visibility</p>
                                                                    <p className={`text-[0.85em] leading-[1.7] font-[500] ${isDayTime ? 'text-gray-400' : 'text-gray-700'}`}>End-to-end
                                                                        supply chain orchestration with real-time
                                                                        tracking, supplier collaboration portal,
                                                                        procurement automation, and sustainability
                                                                        metrics</p>
                                                                </div>
                                                            </div>
                                                            <div
                                                                className={`flex gap-4 p-4 rounded-xl transition-all hover:scale-105 ${isDayTime ? 'bg-[#0E3B46]/20 text-gray-200' : 'bg-white/50 text-gray-900'}`}>
                                                                <span
                                                                    className={`text-2xl font-[800] flex-shrink-0`}>?? </span>
                                                                <div>
                                                                    <p className='font-[800] text-[0.98em] mb-2'>Mobile-First
                                                                        & API-Driven Architecture</p>
                                                                    <p className={`text-[0.85em] leading-[1.7] font-[500] ${isDayTime ? 'text-gray-400' : 'text-gray-700'}`}>Native
                                                                        iOS/Android apps with offline-sync, extensive
                                                                        REST/GraphQL APIs for seamless third-party
                                                                        integrations, and microservices-based cloud
                                                                        infrastructure</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Quantified Business Impact Matrix */}
                                                    <div className='mb-8'>
                                                        <h3 className={`text-[1em] font-[800] mb-5 ${isDayTime ? 'text-gray-100' : 'text-gray-900'} uppercase tracking-wider drop-shadow-md`}>??
                                                            Proven Business Impact & ROI Metrics</h3>
                                                        <div
                                                            className={`grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl border-2 ${isDayTime ? 'bg-gradient-to-br from-[#0E3B46]/30 via-[#041f2d]/20 to-[#0E3B46]/20 border-[#0ef0dd]/30' : 'bg-gradient-to-br from-[#f0f9ff] via-[#e8f4f8] to-[#e0f2fe] border-[#bae6fd]/70'}`}>
                                                            <div
                                                                className={`text-center p-4 rounded-xl transition-all hover:scale-110 ${isDayTime ? 'bg-[#0E3B46]/30' : 'bg-white/60'}`}>
                                                                <p className={`text-2.5xl md:text-4xl font-[900] ${isDayTime ? 'text-[#0ef0dd]' : 'text-[#06b6d4]'} drop-shadow-lg`}>30-40%</p>
                                                                <p className={`text-[0.8em] mt-2 ${isDayTime ? 'text-gray-300' : 'text-gray-800'} font-[700] uppercase tracking-wide`}>??
                                                                    Cost Reduction</p>
                                                            </div>
                                                            <div
                                                                className={`text-center p-4 rounded-xl transition-all hover:scale-110 ${isDayTime ? 'bg-[#0E3B46]/30' : 'bg-white/60'}`}>
                                                                <p className={`text-2.5xl md:text-4xl font-[900] ${isDayTime ? 'text-[#06b6d4]' : 'text-[#0284c7]'} drop-shadow-lg`}>50-60%</p>
                                                                <p className={`text-[0.8em] mt-2 ${isDayTime ? 'text-gray-300' : 'text-gray-800'} font-[700] uppercase tracking-wide`}>?
                                                                    Cycle Acceleration</p>
                                                            </div>
                                                            <div
                                                                className={`text-center p-4 rounded-xl transition-all hover:scale-110 ${isDayTime ? 'bg-[#0E3B46]/30' : 'bg-white/60'}`}>
                                                                <p className={`text-2.5xl md:text-4xl font-[900] ${isDayTime ? 'text-[#7c3aed]' : 'text-[#7c3aed]'} drop-shadow-lg`}>25-35%</p>
                                                                <p className={`text-[0.8em] mt-2 ${isDayTime ? 'text-gray-300' : 'text-gray-800'} font-[700] uppercase tracking-wide`}>??
                                                                    Inventory Improvement</p>
                                                            </div>
                                                            <div
                                                                className={`text-center p-4 rounded-xl transition-all hover:scale-110 ${isDayTime ? 'bg-[#0E3B46]/30' : 'bg-white/60'}`}>
                                                                <p className={`text-2.5xl md:text-4xl font-[900] ${isDayTime ? 'text-[#10b981]' : 'text-[#059669]'} drop-shadow-lg`}>99.9%</p>
                                                                <p className={`text-[0.8em] mt-2 ${isDayTime ? 'text-gray-300' : 'text-gray-800'} font-[700] uppercase tracking-wide`}>???
                                                                    System Uptime</p>
                                                            </div>
                                                            <div
                                                                className={`text-center p-4 rounded-xl transition-all hover:scale-110 ${isDayTime ? 'bg-[#0E3B46]/30' : 'bg-white/60'}`}>
                                                                <p className={`text-2.5xl md:text-4xl font-[900] ${isDayTime ? 'text-[#f59e0b]' : 'text-[#d97706]'} drop-shadow-lg`}>95%+</p>
                                                                <p className={`text-[0.8em] mt-2 ${isDayTime ? 'text-gray-300' : 'text-gray-800'} font-[700] uppercase tracking-wide`}>??
                                                                    Task Automation</p>
                                                            </div>
                                                            <div
                                                                className={`text-center p-4 rounded-xl transition-all hover:scale-110 ${isDayTime ? 'bg-[#0E3B46]/30' : 'bg-white/60'}`}>
                                                                <p className={`text-2.5xl md:text-4xl font-[900] ${isDayTime ? 'text-[#ef4444]' : 'text-[#dc2626]'} drop-shadow-lg`}>3.5yr</p>
                                                                <p className={`text-[0.8em] mt-2 ${isDayTime ? 'text-gray-300' : 'text-gray-800'} font-[700] uppercase tracking-wide`}>??
                                                                    ROI Payback</p>
                                                            </div>
                                                            <div
                                                                className={`text-center p-4 rounded-xl transition-all hover:scale-110 ${isDayTime ? 'bg-[#0E3B46]/30' : 'bg-white/60'}`}>
                                                                <p className={`text-2.5xl md:text-4xl font-[900] ${isDayTime ? 'text-[#06b6d4]' : 'text-[#0284c7]'} drop-shadow-lg`}>80%+</p>
                                                                <p className={`text-[0.8em] mt-2 ${isDayTime ? 'text-gray-300' : 'text-gray-800'} font-[700] uppercase tracking-wide`}>??
                                                                    User Adoption</p>
                                                            </div>
                                                            <div
                                                                className={`text-center p-4 rounded-xl transition-all hover:scale-110 ${isDayTime ? 'bg-[#0E3B46]/30' : 'bg-white/60'}`}>
                                                                <p className={`text-2.5xl md:text-4xl font-[900] ${isDayTime ? 'text-[#10b981]' : 'text-[#059669]'} drop-shadow-lg`}>98%</p>
                                                                <p className={`text-[0.8em] mt-2 ${isDayTime ? 'text-gray-300' : 'text-gray-800'} font-[700] uppercase tracking-wide`}>?
                                                                    On-Time Delivery</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Implementation Details & Timeline */}
                                                    <div className='mb-8'>
                                                        <h3 className={`text-[1em] font-[800] mb-5 ${isDayTime ? 'text-gray-100' : 'text-gray-900'} uppercase tracking-wider drop-shadow-md`}>??
                                                            Implementation Approach & Timeline</h3>
                                                        <div
                                                            className={`p-6 rounded-2xl border-l-4 ${isDayTime ? 'border-[#0ef0dd] bg-gradient-to-r from-[#0ef0dd]/8 to-transparent' : 'border-[#0ef0dd]/50 bg-gradient-to-r from-[#0ef0dd]/15 to-transparent'}`}>
                                                            <ul className={`text-[0.9em] space-y-3.5 ${isDayTime ? 'text-gray-200' : 'text-gray-800'} font-[500]`}>
                                                                <li className='flex gap-3 items-start'><span
                                                                    className={`font-[800] flex-shrink-0 ${isDayTime ? 'text-[#0ef0dd]' : 'text-[#0ef0dd]'}`}>?? Phase 1 (Weeks 1-4):</span>
                                                                    <span>Discovery, needs assessment, architecture design, data mapping, team training kickoff, stakeholder alignment</span>
                                                                </li>
                                                                <li className='flex gap-3 items-start'><span
                                                                    className={`font-[800] flex-shrink-0 ${isDayTime ? 'text-[#06b6d4]' : 'text-[#0284c7]'}`}>?? Phase 2 (Weeks 5-12):</span>
                                                                    <span>System configuration, custom development, integrations setup, legacy data migration (in parallel), UAT environment setup</span>
                                                                </li>
                                                                <li className='flex gap-3 items-start'><span
                                                                    className={`font-[800] flex-shrink-0 ${isDayTime ? 'text-[#7c3aed]' : 'text-[#7c3aed]'}`}>?? Phase 3 (Weeks 13-16):</span>
                                                                    <span>UAT execution, change management, knowledge transfer, performance tuning, security hardening</span>
                                                                </li>
                                                                <li className='flex gap-3 items-start'><span
                                                                    className={`font-[800] flex-shrink-0 ${isDayTime ? 'text-[#f59e0b]' : 'text-[#d97706]'}`}>?? Phase 4 (Weeks 17+):</span>
                                                                    <span>Go-live execution, hypercare support (24/7), stabilization, handoff to L2 support, optimization & continuous improvement</span>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>

                                                    {/* Call to Action Buttons - Enhanced */}
                                                    <div
                                                        className={`flex flex-wrap gap-4 mt-10 pt-8 border-t-2 ${isDayTime ? 'border-[#0E3B46]' : 'border-[#d1e7f1]'}`}>
                                                        <button
                                                            className={`px-8 py-4 text-[0.95em] font-[800] rounded-xl transition-all transform hover:scale-110 shadow-xl hover:shadow-2xl uppercase tracking-wider ${isDayTime ? 'bg-gradient-to-r from-[#0ef0dd] via-[#06b6d4] to-[#0284c7] text-black' : 'bg-gradient-to-r from-[#0ef0dd] via-[#06b6d4] to-[#0284c7] text-white'}`}>
                                                            ?? Schedule Expert Consultation
                                                        </button>
                                                        <button
                                                            className={`px-8 py-4 text-[0.95em] font-[800] rounded-xl transition-all ${isDayTime ? 'bg-[#0E3B46]/60 text-[#0ef0dd] border-2 border-[#0ef0dd]/70 hover:bg-[#0E3B46] hover:border-[#0ef0dd]' : 'bg-gradient-to-r from-white/15 to-white/5 text-[#0ef0dd] border-2 border-[#0ef0dd]/50 hover:bg-white/25 hover:border-[#0ef0dd]'} uppercase tracking-wider`}>
                                                            ?? Download Case Studies
                                                        </button>
                                                        <button
                                                            className={`px-8 py-4 text-[0.95em] font-[800] rounded-xl transition-all ${isDayTime ? 'text-gray-300 hover:text-[#0ef0dd] border-2 border-gray-500/30 hover:border-[#0ef0dd]/50' : 'text-gray-700 hover:text-[#0ef0dd] border-2 border-gray-300 hover:border-[#0ef0dd]'} uppercase tracking-wider`}>
                                                            ??? View Technical Architecture ?
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* How is Maritime Port Management Implementation Influencing Business Outcomes */}
            <div
                className={`lg:py-[3em] md:py-[2.5em] py-[1.5em] relative overflow-hidden ${isDayTime ? 'bg-gradient-to-br from-[#031E29] via-[#041f2d] to-[#0a2d3a]' : 'bg-gradient-to-br from-[#f8fafb] via-[#f0f3f7] to-[#e8ecf1]'}`}>
                {/* Animated background overlay */}
                <div
                    className={`absolute inset-0 ${isDayTime ? 'bg-gradient-to-t from-[#0ef0dd]/5 via-transparent to-[#06b6d4]/5' : 'bg-gradient-to-t from-[#0ef0dd]/3 via-transparent to-[#06b6d4]/3'} pointer-events-none`}/>

                <div id={'our-custom-enterprise-software-development-process'}
                     className={`relative z-10 py-12 lg:mb-12 md:mb-10 mb-6 max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>
                    <div
                        className={`border-2 rounded-2xl p-6 md:p-10 lg:p-12 transition-all duration-300 ${isDayTime ? 'bg-gradient-to-br from-[#0E3B46]/40 to-[#041f2d]/30 border-[#0ef0dd]/50 shadow-2xl hover:shadow-3xl' : 'bg-gradient-to-br from-white/60 to-[#f0f9ff]/40 border-[#0ef0dd]/40 shadow-xl hover:shadow-2xl'}`}>

                        {/* Premium Header */}
                        <div className='mb-10'>
                            <div className='flex items-center justify-center gap-3 mb-6'>
                                <div
                                    className={`h-1 w-12 rounded-full ${isDayTime ? 'bg-gradient-to-r from-[#0ef0dd] to-[#06b6d4]' : 'bg-gradient-to-r from-[#0ef0dd] via-[#06b6d4] to-[#7c3aed]'}`}/>
                                <span
                                    className={`text-[0.9em] font-[800] uppercase tracking-widest ${isDayTime ? 'text-[#06b6d4]' : 'text-[#0284c7]'}`}>?? Strategic Impact</span>
                                <div
                                    className={`h-1 w-12 rounded-full ${isDayTime ? 'bg-gradient-to-r from-[#06b6d4] to-[#0ef0dd]' : 'bg-gradient-to-r from-[#7c3aed] via-[#06b6d4] to-[#0ef0dd]'}`}/>
                            </div>

                            <h2 className={`text-[2em] md:text-[2.8em] lg:text-[3.8em] capitalize font-[900] text-center mb-8 leading-[1.1] drop-shadow-lg ${isDayTime ? 'text-[#0ef0dd]' : 'text-[#0ef0dd]'}`}>
                                How <span
                                className={`bg-gradient-to-r from-[#0ef0dd] via-[#06b6d4] to-[#7c3aed] bg-clip-text text-transparent`}>Maritime Port Management Implementation</span>
                                <br className={'lg:block md:block hidden'}/>Transforms <span
                                className={`text-[#06b6d4]`}>Business Outcomes</span>
                            </h2>
                        </div>

                        {/* Enhanced Content Section */}
                        <div className={`space-y-8 ${isDayTime ? 'text-gray-200' : 'text-gray-800'}`}>
                            {/* Key Statistics */}
                            <div
                                className={`grid grid-cols-1 md:grid-cols-3 gap-5 mb-8 p-6 rounded-xl ${isDayTime ? 'bg-[#0E3B46]/50 border border-[#0E3B46]/70' : 'bg-[#f0f9ff]/50 border border-[#bae6fd]/50'}`}>
                                <div className='text-center'>
                                    <p className={`text-3xl md:text-4xl font-[900] mb-2 drop-shadow-lg ${isDayTime ? 'text-[#0ef0dd]' : 'text-[#0284c7]'}`}>80%</p>
                                    <p className={`text-[0.85em] font-[700] uppercase tracking-wide ${isDayTime ? 'text-gray-300' : 'text-gray-700'}`}>Global
                                        Maritime Port Management Adoption</p>
                                    <p className={`text-[0.75em] mt-2 leading-relaxed ${isDayTime ? 'text-gray-400' : 'text-gray-600'}`}>Enterprise
                                        organizations worldwide</p>
                                </div>
                                <div
                                    className={`text-center border-l-2 border-r-2 px-5 md:border-l-2 md:border-r-2 md:px-5 lg:border-l-2 lg:border-r-2 lg:px-5 ${isDayTime ? 'border-[#0ef0dd]/30' : 'border-[#0ef0dd]/20'}`}>
                                    <p className={`text-3xl md:text-4xl font-[900] mb-2 drop-shadow-lg ${isDayTime ? 'text-[#06b6d4]' : 'text-[#06b6d4]'}`}>35-50%</p>
                                    <p className={`text-[0.85em] font-[700] uppercase tracking-wide ${isDayTime ? 'text-gray-300' : 'text-gray-700'}`}>Efficiency
                                        Improvement</p>
                                    <p className={`text-[0.75em] mt-2 leading-relaxed ${isDayTime ? 'text-gray-400' : 'text-gray-600'}`}>Operational
                                        performance gains</p>
                                </div>
                                <div className='text-center'>
                                    <p className={`text-3xl md:text-4xl font-[900] mb-2 drop-shadow-lg ${isDayTime ? 'text-[#7c3aed]' : 'text-[#7c3aed]'}`}>2-3yrs</p>
                                    <p className={`text-[0.85em] font-[700] uppercase tracking-wide ${isDayTime ? 'text-gray-300' : 'text-gray-700'}`}>Average
                                        ROI Timeline</p>
                                    <p className={`text-[0.75em] mt-2 leading-relaxed ${isDayTime ? 'text-gray-400' : 'text-gray-600'}`}>Full
                                        investment recovery</p>
                                </div>
                            </div>

                            {/* Main Description - Highly Detailed */}
                            <div
                                className={`space-y-6 p-6 rounded-xl ${isDayTime ? 'bg-[#041f2d]/50 border border-[#0E3B46]/50' : 'bg-white/50 border border-[#e0f2fe]/50'}`}>
                                <div>
                                    <h3 className={`text-[1.1em] font-[800] mb-3 uppercase tracking-wide flex items-center gap-2 ${isDayTime ? 'text-[#0ef0dd]' : 'text-[#0284c7]'}`}>
                                        <span className='text-2xl'>??</span>
                                        Maritime Operations Management: Strategic Imperative
                                    </h3>
                                    <p className={`text-[0.95em] leading-[1.95] font-[500] ${isDayTime ? 'text-gray-300' : 'text-gray-700'}`}>
                                        Maritime Operations Management systems have evolved into mission-critical
                                        business
                                        infrastructure, with approximately <span className='font-[800]'>80% of global organizations</span> deploying
                                        integrated maritime solutions to drive operational excellence and competitive
                                        advantage. These sophisticated platforms deliver <span className='font-[800]'>measurable improvements across process efficiency (35-50%), productivity acceleration (40-60%), and order fulfillment accuracy (25-35%)</span> while
                                        providing executive leadership with real-time visibility into enterprise-wide
                                        performance metrics, enabling <span className='font-[800]'>data-driven decision-making</span> that
                                        directly impacts organizational outcomes, revenue trajectory, and market
                                        responsiveness.
                                    </p>
                                </div>

                                <div>
                                    <h3 className={`text-[1.1em] font-[800] mb-3 uppercase tracking-wide flex items-center gap-2 ${isDayTime ? 'text-[#06b6d4]' : 'text-[#0ef0dd]'}`}>
                                        <span className='text-2xl'>?</span>
                                        Our Premier maritime development Approach
                                    </h3>
                                    <p className={`text-[0.95em] leading-[1.95] font-[500] ${isDayTime ? 'text-gray-300' : 'text-gray-700'}`}>
                                        As a <span className='font-[800]'>premier maritime development partner</span>,
                                        we
                                        architect <span
                                        className='font-[800]'>scalable, enterprise-grade solutions</span> that
                                        modernize legacy infrastructure and comprehensively transform operational
                                        capabilities across your entire organization. Our strategic implementations
                                        integrate <span className='font-[800]'>advanced analytics, intelligent automation (95%+ task elimination), real-time dashboards, seamless cross-functional workflows</span>,
                                        and <span className='font-[800]'>predictive intelligence</span>, enabling your
                                        organization to achieve:
                                    </p>
                                </div>

                                {/* Benefits Grid */}
                                <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 mt-4`}>
                                    <div
                                        className={`flex gap-3 p-4 rounded-lg ${isDayTime ? 'bg-[#0E3B46]/30' : 'bg-[#f0f9ff]/50'}`}>
                                        <span className='text-2xl flex-shrink-0'>?</span>
                                        <div>
                                            <p className={`font-[800] text-[0.95em] ${isDayTime ? 'text-[#0ef0dd]' : 'text-[#0284c7]'}`}>Measurable
                                                ROI & Cost Savings</p>
                                            <p className={`text-[0.85em] leading-relaxed mt-1 ${isDayTime ? 'text-gray-400' : 'text-gray-600'}`}>30-40%
                                                operational cost reduction within 12-18 months</p>
                                        </div>
                                    </div>
                                    <div
                                        className={`flex gap-3 p-4 rounded-lg ${isDayTime ? 'bg-[#0E3B46]/30' : 'bg-[#f0f9ff]/50'}`}>
                                        <span className='text-2xl flex-shrink-0'>??</span>
                                        <div>
                                            <p className={`font-[800] text-[0.95em] ${isDayTime ? 'text-[#06b6d4]' : 'text-[#0ef0dd]'}`}>Accelerated
                                                Growth Trajectories</p>
                                            <p className={`text-[0.85em] leading-relaxed mt-1 ${isDayTime ? 'text-gray-400' : 'text-gray-600'}`}>50-60%
                                                faster time-to-market & cycle acceleration</p>
                                        </div>
                                    </div>
                                    <div
                                        className={`flex gap-3 p-4 rounded-lg ${isDayTime ? 'bg-[#0E3B46]/30' : 'bg-[#f0f9ff]/50'}`}>
                                        <span className='text-2xl flex-shrink-0'>??</span>
                                        <div>
                                            <p className={`font-[800] text-[0.95em] ${isDayTime ? 'text-[#7c3aed]' : 'text-[#7c3aed]'}`}>Enterprise-Grade
                                                Security & Resilience</p>
                                            <p className={`text-[0.85em] leading-relaxed mt-1 ${isDayTime ? 'text-gray-400' : 'text-gray-600'}`}>99.9%
                                                uptime SLA with end-to-end encryption</p>
                                        </div>
                                    </div>
                                    <div
                                        className={`flex gap-3 p-4 rounded-lg ${isDayTime ? 'bg-[#0E3B46]/30' : 'bg-[#f0f9ff]/50'}`}>
                                        <span className='text-2xl flex-shrink-0'>??</span>
                                        <div>
                                            <p className={`font-[800] text-[0.95em] ${isDayTime ? 'text-[#10b981]' : 'text-[#059669]'}`}>Competitive
                                                Differentiation Through Innovation</p>
                                            <p className={`text-[0.85em] leading-relaxed mt-1 ${isDayTime ? 'text-gray-400' : 'text-gray-600'}`}>Sustainable
                                                advantage via robust digital frameworks</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Closing Statement */}
                            <div
                                className={`p-6 rounded-xl border-l-4 ${isDayTime ? 'border-[#0ef0dd] bg-[#0ef0dd]/8' : 'border-[#0ef0dd] bg-gradient-to-r from-[#0ef0dd]/15 to-transparent'}`}>
                                <p className={`text-[0.98em] leading-[1.95] font-[600] ${isDayTime ? 'text-gray-100' : 'text-gray-900'}`}>
                                    Our <span className='font-[900]'>enterprise-grade maritime solutions</span> are
                                    meticulously engineered for <span className='font-[900]'>operational resilience, strategic agility, and sustained competitive advantage</span>.
                                    We deliver end-to-end transformation that empowers your organization to unlock
                                    hidden operational value, accelerate digital maturity, and achieve strategic
                                    objectives with <span className='font-[900]'>measurable business impact across all stakeholder groups</span>.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Perks Of Custom Maritime Port Management Software Development */}
            <div
                className={`lg:pt-[3em] h-auto border-b overflow-hidden max-w-full w-full mx-auto ${isDayTime ? 'bg-gradient-to-br from-white via-[#f0f9ff] to-[#e8f4f8]' : 'bg-gradient-to-br from-[#031E29] via-[#0a2d3a] to-[#0f3f4f]'}`}>
                {/* Animated background overlay */}
                <div
                    className={`absolute inset-0 ${isDayTime ? 'bg-gradient-to-t from-[#0ef0dd]/3 via-transparent to-[#06b6d4]/3' : 'bg-gradient-to-t from-[#0ef0dd]/8 via-transparent to-[#06b6d4]/8'} pointer-events-none`}/>

                <div
                    className={`relative max-w-full w-full mx-auto px-4 sm:px-6 lg:px-[4.6em] lg:pt-[4em] md:pt-[3.5em] pt-[2em] lg:pb-[4em] md:pb-[3.5em] pb-[2em] mt-14 z-10`}>
                    {/* Premium Header Section */}
                    <div className={`mb-12 lg:mb-16 text-center ${isDayTime ? 'text-black' : 'text-white'}`}>
                        <div className='flex items-center justify-center gap-3 mb-4'>
                            <div
                                className={`h-1 w-10 rounded-full ${isDayTime ? 'bg-gradient-to-r from-[#0ef0dd] to-[#06b6d4]' : 'bg-gradient-to-r from-[#0ef0dd] to-[#06b6d4]'}`}/>
                            <span
                                className={`text-[0.9em] font-[800] uppercase tracking-widest ${isDayTime ? 'text-[#0284c7]' : 'text-[#0ef0dd]'}`}>?? Premium Features</span>
                            <div
                                className={`h-1 w-10 rounded-full ${isDayTime ? 'bg-gradient-to-r from-[#06b6d4] to-[#0ef0dd]' : 'bg-gradient-to-r from-[#06b6d4] to-[#0ef0dd]'}`}/>
                        </div>
                        <h2 className={`lg:text-[3.5em] md:text-[3em] text-[2.2em] font-[900] mb-6 leading-[1.15] drop-shadow-lg ${isDayTime ? 'text-[#031E29]' : 'text-[#0ef0dd]'}`}>
                            Perks Of <span
                            className={`bg-gradient-to-r from-[#0ef0dd] via-[#06b6d4] to-[#7c3aed] bg-clip-text text-transparent`}>Custom Maritime Port Management</span>
                            <br className='lg:block md:block hidden'/>Software Development
                        </h2>
                        <p className={`text-[1em] font-[600] leading-[1.85] max-w-[900px] mx-auto mb-8 ${isDayTime ? 'text-gray-700' : 'text-gray-300'}`}>
                            Transform operational performance through <span
                            className={`font-[900] ${isDayTime ? 'text-[#0284c7]' : 'text-[#0ef0dd]'}`}>enterprise-grade maritime solutions</span> architected
                            by our specialized development team. We ensure <span
                            className={`font-[900] ${isDayTime ? 'text-[#06b6d4]' : 'text-[#06b6d4]'}`}>seamless integration</span> with
                            existing infrastructure while delivering <span
                            className={`font-[900] ${isDayTime ? 'text-[#7c3aed]' : 'text-[#a78bfa]'}`}>measurable business transformation</span>.
                        </p>
                    </div>

                    <div
                        className={`relative grid lg:grid-cols-2 grid-cols-1 gap-12 mb-8`}>
                        <div
                            className={`lg:pr-8 flex flex-col justify-between ${isDayTime ? 'text-black' : 'text-white'}`}>
                            {/* Perks Summary Box */}
                            <div
                                className={`p-8 rounded-2xl border-2 mb-8 ${isDayTime ? 'bg-white/70 border-[#0ef0dd]/40 shadow-lg' : 'bg-[#0E3B46]/50 border-[#0ef0dd]/50 shadow-2xl'}`}>
                                <h3 className={`text-[1.3em] font-[900] mb-4 flex items-center gap-2 ${isDayTime ? 'text-[#0284c7]' : 'text-[#0ef0dd]'}`}>
                                    <span className='text-2xl'>??</span> Why Custom Maritime Port Management?
                                </h3>
                                <p className={`text-[0.95em] leading-[1.85] font-[600] ${isDayTime ? 'text-gray-700' : 'text-gray-300'}`}>
                                    Unlike <span className='font-[900]'>generic commercial solutions</span>, our custom
                                    Maritime Port Management delivers <span
                                    className={`font-[900] ${isDayTime ? 'text-[#06b6d4]' : 'text-[#06b6d4]'}`}>perfect alignment</span> with
                                    your specific business requirements, operational workflows, and strategic
                                    objectives, providing <span
                                    className={`font-[900] ${isDayTime ? 'text-[#7c3aed]' : 'text-[#a78bfa]'}`}>sustainable competitive advantage</span>.
                                </p>
                            </div>

                            <div className={'lg:mt-auto'}>
                                <Link href={'/contact'}
                                      className={`inline-flex items-center gap-3 border-2 px-10 py-4 rounded-full font-[800] text-[1.05em] transition-all duration-300 transform hover:scale-105 ${isDayTime ? 'border-[#0ef0dd] text-[#031E29] bg-gradient-to-r from-[#0ef0dd]/20 to-[#06b6d4]/20 hover:from-[#0ef0dd]/40 hover:to-[#06b6d4]/40 shadow-lg hover:shadow-xl' : 'border-[#0ef0dd] text-[#0ef0dd] bg-[#0ef0dd]/5 hover:bg-[#0ef0dd]/15 shadow-lg hover:shadow-[0_0_30px_rgba(14,240,221,0.3)]'}`}>
                                    <span>Let&#39;s Connect!</span>
                                    <span className='text-xl'>?</span>
                                </Link>
                            </div>
                        </div>
                        <div
                            className={`relative mx-auto max-w-full w-full space-y-3 z-20 ${isDayTime ? 'text-black' : 'text-white'}`}>
                            <div
                                className={`w-full rounded-2xl transition-all duration-300 overflow-hidden ${webIndex === 0 ? (isDayTime ? 'bg-white/80 border-2 border-[#0ef0dd]/40 shadow-xl' : 'bg-[#0E3B46]/60 border-2 border-[#0ef0dd]/50 shadow-2xl') : (isDayTime ? 'bg-white/40 border-2 border-gray-200/30 hover:border-[#0ef0dd]/30' : 'bg-[#0a1f28]/40 border-2 border-gray-600/20 hover:border-[#0ef0dd]/30')}`}>
                                <button
                                    onClick={() => toggleWeb(0)}
                                    className={`flex items-center justify-between w-full p-6 lg:p-8 text-start focus:outline-none transition-all duration-300 ${webIndex === 0 ? 'bg-gradient-to-r from-[#0ef0dd]/5 to-[#06b6d4]/5' : 'hover:bg-gradient-to-r hover:from-[#0ef0dd]/3 hover:to-[#06b6d4]/3'}`}
                                >
                                    <span
                                        className={`capitalize lg:text-[1.55em] md:text-[1.45em] text-base font-[900] flex items-center gap-3 ${webIndex === 0 ? (isDayTime ? 'text-[#0284c7]' : 'text-[#0ef0dd]') : (isDayTime ? 'text-[#031E29]' : 'text-white')}`}>
                                        <span className='text-2xl lg:text-3xl'>??</span>
                                        Tailored To Your Exact Business Requirements
                                    </span>
                                    {webIndex === 0 ? (
                                        <AiFillCaretUp
                                            className={`lg:text-[2em] text-[1.3em] flex-shrink-0 ml-4 ${isDayTime ? 'text-[#0284c7]' : 'text-[#0ef0dd]'}`}/>
                                    ) : (
                                        <AiFillCaretDown
                                            className={`lg:text-[2em] text-[1.3em] flex-shrink-0 ml-4 ${isDayTime ? 'text-gray-600' : 'text-gray-400'}`}/>
                                    )}
                                </button>
                                {webIndex === 0 && (
                                    <p className={`px-6 lg:px-8 pb-8 text-[0.95em] text-justify leading-[1.95] font-[600] border-t-2 pt-6 ${isDayTime ? 'border-[#0ef0dd]/20 text-gray-700' : 'border-[#0ef0dd]/30 text-gray-300'}`}>
                                        Custom Maritime Port Management software is meticulously designed around your
                                        specific organizational
                                        structure, operational workflows, industry requirements, and strategic business
                                        objectives rather than forcing your processes to conform to generic software
                                        limitations. Unlike off-the-shelf solutions that offer standardized
                                        functionality for broad market appeal, <span
                                        className={`font-[900] ${isDayTime ? 'text-[#0284c7]' : 'text-[#0ef0dd]'}`}>custom maritime development ensures every
                                        feature, workflow, module, and integration point</span> directly addresses your
                                        unique
                                        business challenges and operational needs. This tailored approach <span
                                        className={`font-[900] ${isDayTime ? 'text-[#06b6d4]' : 'text-[#06b6d4]'}`}>eliminates
                                        unnecessary features</span> that clutter interfaces and complicate user adoption
                                        while
                                        ensuring <span
                                        className={`font-[900] ${isDayTime ? 'text-[#7c3aed]' : 'text-[#a78bfa]'}`}>critical functionality specific to your industry</span>,
                                        market position, and
                                        competitive strategy is built directly into the system. Custom development
                                        accommodates your <span
                                        className={`font-[900] ${isDayTime ? 'text-[#0284c7]' : 'text-[#0ef0dd]'}`}>proprietary business processes</span>,
                                        specialized reporting
                                        requirements, unique compliance obligations, and distinctive operational
                                        methodologies that provide <span
                                        className={`font-[900] ${isDayTime ? 'text-[#06b6d4]' : 'text-[#06b6d4]'}`}>competitive differentiation</span> in
                                        your market, ensuring
                                        the technology infrastructure enhances rather than constrains your business
                                        model and strategic capabilities.
                                    </p>
                                )}
                            </div>
                            <div
                                className={`w-full rounded-2xl transition-all duration-300 overflow-hidden ${webIndex === 1 ? (isDayTime ? 'bg-white/80 border-2 border-[#06b6d4]/40 shadow-xl' : 'bg-[#0E3B46]/60 border-2 border-[#06b6d4]/50 shadow-2xl') : (isDayTime ? 'bg-white/40 border-2 border-gray-200/30 hover:border-[#06b6d4]/30' : 'bg-[#0a1f28]/40 border-2 border-gray-600/20 hover:border-[#06b6d4]/30')}`}>
                                <button
                                    onClick={() => toggleWeb(1)}
                                    className={`flex items-center justify-between w-full p-6 lg:p-8 text-start focus:outline-none transition-all duration-300 ${webIndex === 1 ? 'bg-gradient-to-r from-[#06b6d4]/5 to-[#0ef0dd]/5' : 'hover:bg-gradient-to-r hover:from-[#06b6d4]/3 hover:to-[#0ef0dd]/3'}`}
                                >
                                    <span
                                        className={`capitalize lg:text-[1.55em] md:text-[1.45em] text-base font-[900] flex items-center gap-3 ${webIndex === 1 ? (isDayTime ? 'text-[#0284c7]' : 'text-[#06b6d4]') : (isDayTime ? 'text-[#031E29]' : 'text-white')}`}>
                                        <span className='text-2xl lg:text-3xl'>??</span>
                                        Seamless Integration With Existing Systems
                                    </span>
                                    {webIndex === 1 ? (
                                        <AiFillCaretUp
                                            className={`lg:text-[2em] text-[1.3em] flex-shrink-0 ml-4 ${isDayTime ? 'text-[#0284c7]' : 'text-[#06b6d4]'}`}/>
                                    ) : (
                                        <AiFillCaretDown
                                            className={`lg:text-[2em] text-[1.3em] flex-shrink-0 ml-4 ${isDayTime ? 'text-gray-600' : 'text-gray-400'}`}/>
                                    )}
                                </button>
                                {webIndex === 1 && (
                                    <p className={`px-6 lg:px-8 pb-8 text-[0.95em] text-justify leading-[1.95] font-[600] border-t-2 pt-6 ${isDayTime ? 'border-[#06b6d4]/20 text-gray-700' : 'border-[#06b6d4]/30 text-gray-300'}`}>
                                        Custom maritime solutions provide <span
                                        className={`font-[900] ${isDayTime ? 'text-[#0284c7]' : 'text-[#06b6d4]'}`}>native integration capabilities</span> with
                                        your existing
                                        technology ecosystem, eliminating the <span
                                        className={`font-[900] ${isDayTime ? 'text-[#7c3aed]' : 'text-[#a78bfa]'}`}>data silos, manual data entry, integration
                                        middleware costs</span>, and operational inefficiencies that typically arise
                                        when
                                        implementing packaged software with limited connectivity options. Our
                                        development approach ensures your Maritime Port Management platform <span
                                        className={`font-[900] ${isDayTime ? 'text-[#0284c7]' : 'text-[#0ef0dd]'}`}>connects seamlessly</span> with
                                        legacy
                                        systems, specialized industry applications, customer relationship management
                                        platforms, e-commerce solutions, business intelligence tools, financial
                                        software, supply chain systems, manufacturing equipment, IoT devices, and
                                        third-party services that are critical to your operations. <span
                                        className={`font-[900] ${isDayTime ? 'text-[#06b6d4]' : 'text-[#06b6d4]'}`}>Custom-built APIs,
                                        data synchronization protocols, and integration architectures</span> are
                                        designed
                                        specifically for your environment, enabling <span
                                        className={`font-[900] ${isDayTime ? 'text-[#0284c7]' : 'text-[#0ef0dd]'}`}>real-time data flow</span> across
                                        systems,
                                        eliminating duplicate data entry, ensuring data consistency across platforms,
                                        automating cross-system workflows, and creating a unified technology
                                        infrastructure. This <span
                                        className={`font-[900] ${isDayTime ? 'text-[#7c3aed]' : 'text-[#a78bfa]'}`}>integration flexibility future-proofs</span> your
                                        investment by
                                        accommodating new systems, emerging technologies, and evolving business
                                        requirements without the constraints, compatibility issues, and integration
                                        limitations inherent in pre-packaged maritime solutions.
                                    </p>
                                )}
                            </div>
                            <div
                                className={`w-full rounded-2xl transition-all duration-300 overflow-hidden ${webIndex === 2 ? (isDayTime ? 'bg-white/80 border-2 border-[#7c3aed]/40 shadow-xl' : 'bg-[#0E3B46]/60 border-2 border-[#7c3aed]/50 shadow-2xl') : (isDayTime ? 'bg-white/40 border-2 border-gray-200/30 hover:border-[#7c3aed]/30' : 'bg-[#0a1f28]/40 border-2 border-gray-600/20 hover:border-[#7c3aed]/30')}`}>
                                <button
                                    onClick={() => toggleWeb(2)}
                                    className={`flex items-center justify-between w-full p-6 lg:p-8 text-start focus:outline-none transition-all duration-300 ${webIndex === 2 ? 'bg-gradient-to-r from-[#7c3aed]/5 to-[#a78bfa]/5' : 'hover:bg-gradient-to-r hover:from-[#7c3aed]/3 hover:to-[#a78bfa]/3'}`}
                                >
                                    <span
                                        className={`capitalize lg:text-[1.55em] md:text-[1.45em] text-base font-[900] flex items-center gap-3 ${webIndex === 2 ? (isDayTime ? 'text-[#7c3aed]' : 'text-[#a78bfa]') : (isDayTime ? 'text-[#031E29]' : 'text-white')}`}>
                                        <span className='text-2xl lg:text-3xl'>??</span>
                                        Unlimited Scalability And Growth Flexibility
                                    </span>
                                    {webIndex === 2 ? (
                                        <AiFillCaretUp
                                            className={`lg:text-[2em] text-[1.3em] flex-shrink-0 ml-4 ${isDayTime ? 'text-[#7c3aed]' : 'text-[#a78bfa]'}`}/>
                                    ) : (
                                        <AiFillCaretDown
                                            className={`lg:text-[2em] text-[1.3em] flex-shrink-0 ml-4 ${isDayTime ? 'text-gray-600' : 'text-gray-400'}`}/>
                                    )}
                                </button>
                                {webIndex === 2 && (
                                    <p className={`px-6 lg:px-8 pb-8 text-[0.95em] text-justify leading-[1.95] font-[600] border-t-2 pt-6 ${isDayTime ? 'border-[#7c3aed]/20 text-gray-700' : 'border-[#7c3aed]/30 text-gray-300'}`}>
                                        Custom Maritime Port Management platforms are <span
                                        className={`font-[900] ${isDayTime ? 'text-[#7c3aed]' : 'text-[#a78bfa]'}`}>architected with scalable infrastructure and flexible
                                        design principles</span> that grow seamlessly alongside your business expansion,
                                        accommodating increased transaction volumes, additional users, new business
                                        units, geographic expansion, product line diversification, and evolving
                                        operational complexity without performance degradation or costly system
                                        replacements. Unlike <span
                                        className={`font-[900] ${isDayTime ? 'text-[#0284c7]' : 'text-[#0ef0dd]'}`}>commercial Maritime Port Management packages with user-based licensing models</span>,
                                        module restrictions, and architectural limitations that necessitate expensive
                                        upgrades or migration to enterprise tiers as your business grows, <span
                                        className={`font-[900] ${isDayTime ? 'text-[#06b6d4]' : 'text-[#06b6d4]'}`}>custom
                                        solutions scale economically and technically</span> to support your growth
                                        trajectory.
                                        The system architecture can expand to accommodate new warehouses, manufacturing
                                        facilities, retail locations, international operations, acquired companies,
                                        additional product categories, emerging sales channels, and increased data
                                        volumes while maintaining optimal performance and user experience. This
                                        scalability extends beyond technical capacity to include <span
                                        className={`font-[900] ${isDayTime ? 'text-[#0284c7]' : 'text-[#0ef0dd]'}`}>functional flexibility</span>,
                                        enabling rapid deployment of new features, business processes, operational
                                        workflows, and analytical capabilities as market conditions change, competitive
                                        pressures evolve, or strategic priorities shift, ensuring your Maritime Port
                                        Management investment
                                        remains aligned with business needs throughout organizational growth and
                                        transformation.
                                    </p>
                                )}
                            </div>
                            <div
                                className={`w-full rounded-2xl transition-all duration-300 overflow-hidden ${webIndex === 3 ? (isDayTime ? 'bg-white/80 border-2 border-[#10b981]/40 shadow-xl' : 'bg-[#0E3B46]/60 border-2 border-[#10b981]/50 shadow-2xl') : (isDayTime ? 'bg-white/40 border-2 border-gray-200/30 hover:border-[#10b981]/30' : 'bg-[#0a1f28]/40 border-2 border-gray-600/20 hover:border-[#10b981]/30')}`}>
                                <button
                                    onClick={() => toggleWeb(3)}
                                    className={`flex items-center justify-between w-full p-6 lg:p-8 text-start focus:outline-none transition-all duration-300 ${webIndex === 3 ? 'bg-gradient-to-r from-[#10b981]/5 to-[#059669]/5' : 'hover:bg-gradient-to-r hover:from-[#10b981]/3 hover:to-[#059669]/3'}`}
                                >
                                    <span
                                        className={`capitalize lg:text-[1.55em] md:text-[1.45em] text-base font-[900] flex items-center gap-3 ${webIndex === 3 ? (isDayTime ? 'text-[#059669]' : 'text-[#10b981]') : (isDayTime ? 'text-[#031E29]' : 'text-white')}`}>
                                        <span className='text-2xl lg:text-3xl'>??</span>
                                        Complete Control And Ownership
                                    </span>
                                    {webIndex === 3 ? (
                                        <AiFillCaretUp
                                            className={`lg:text-[2em] text-[1.3em] flex-shrink-0 ml-4 ${isDayTime ? 'text-[#059669]' : 'text-[#10b981]'}`}/>
                                    ) : (
                                        <AiFillCaretDown
                                            className={`lg:text-[2em] text-[1.3em] flex-shrink-0 ml-4 ${isDayTime ? 'text-gray-600' : 'text-gray-400'}`}/>
                                    )}
                                </button>
                                {webIndex === 3 && (
                                    <p className={`px-6 lg:px-8 pb-8 text-[0.95em] text-justify leading-[1.95] font-[600] border-t-2 pt-6 ${isDayTime ? 'border-[#10b981]/20 text-gray-700' : 'border-[#10b981]/30 text-gray-300'}`}>
                                        Custom maritime development provides <span
                                        className={`font-[900] ${isDayTime ? 'text-[#059669]' : 'text-[#10b981]'}`}>full ownership of your software asset</span>,
                                        including
                                        source code, database schemas, system architecture, and intellectual property
                                        rights, eliminating <span
                                        className={`font-[900] ${isDayTime ? 'text-[#0284c7]' : 'text-[#0ef0dd]'}`}>vendor lock-in, recurring licensing fees, arbitrary price
                                        increases, forced upgrades</span>, and the operational risks associated with
                                        dependence
                                        on third-party software vendors. This ownership delivers <span
                                        className={`font-[900] ${isDayTime ? 'text-[#06b6d4]' : 'text-[#06b6d4]'}`}>strategic advantages</span>
                                        including independence from vendor business decisions, product discontinuations,
                                        merger and acquisition activities, or changes in vendor support policies that
                                        could disrupt your operations or require costly migrations. You maintain
                                        <span
                                            className={`font-[900] ${isDayTime ? 'text-[#059669]' : 'text-[#10b981]'}`}>complete control over system modifications, feature enhancements, security
                                        protocols, data governance policies</span>, hosting arrangements, and technology
                                        stack
                                        decisions without requiring vendor approval, waiting for scheduled releases, or
                                        accepting functionality changes that don&#39;t align with your business
                                        requirements. This autonomy extends to <span
                                        className={`font-[900] ${isDayTime ? 'text-[#0284c7]' : 'text-[#0ef0dd]'}`}>deployment flexibility</span>,
                                        enabling
                                        on-premise hosting for maximum data control, private cloud deployment for
                                        security requirements, or public cloud hosting for operational efficiency based
                                        on your specific security, compliance, performance, and cost considerations
                                        rather than vendor-imposed infrastructure constraints.
                                    </p>
                                )}
                            </div>
                            <div
                                className={`w-full rounded-2xl transition-all duration-300 overflow-hidden ${webIndex === 4 ? (isDayTime ? 'bg-white/80 border-2 border-[#f59e0b]/40 shadow-xl' : 'bg-[#0E3B46]/60 border-2 border-[#f59e0b]/50 shadow-2xl') : (isDayTime ? 'bg-white/40 border-2 border-gray-200/30 hover:border-[#f59e0b]/30' : 'bg-[#0a1f28]/40 border-2 border-gray-600/20 hover:border-[#f59e0b]/30')}`}>
                                <button
                                    onClick={() => toggleWeb(4)}
                                    className={`flex items-center justify-between w-full p-6 lg:p-8 text-start focus:outline-none transition-all duration-300 ${webIndex === 4 ? 'bg-gradient-to-r from-[#f59e0b]/5 to-[#d97706]/5' : 'hover:bg-gradient-to-r hover:from-[#f59e0b]/3 hover:to-[#d97706]/3'}`}
                                >
                                    <span
                                        className={`capitalize lg:text-[1.55em] md:text-[1.45em] text-base font-[900] flex items-center gap-3 ${webIndex === 4 ? (isDayTime ? 'text-[#d97706]' : 'text-[#f59e0b]') : (isDayTime ? 'text-[#031E29]' : 'text-white')}`}>
                                        <span className='text-2xl lg:text-3xl'>??? </span>
                                        Enhanced Security And Data Protection
                                    </span>
                                    {webIndex === 4 ? (
                                        <AiFillCaretUp
                                            className={`lg:text-[2em] text-[1.3em] flex-shrink-0 ml-4 ${isDayTime ? 'text-[#d97706]' : 'text-[#f59e0b]'}`}/>
                                    ) : (
                                        <AiFillCaretDown
                                            className={`lg:text-[2em] text-[1.3em] flex-shrink-0 ml-4 ${isDayTime ? 'text-gray-600' : 'text-gray-400'}`}/>
                                    )}
                                </button>
                                {webIndex === 4 && (
                                    <p className={`px-6 lg:px-8 pb-8 text-[0.95em] text-justify leading-[1.95] font-[600] border-t-2 pt-6 ${isDayTime ? 'border-[#f59e0b]/20 text-gray-700' : 'border-[#f59e0b]/30 text-gray-300'}`}>
                                        Custom maritime solutions implement <span
                                        className={`font-[900] ${isDayTime ? 'text-[#d97706]' : 'text-[#f59e0b]'}`}>security architectures, data protection
                                        protocols, access control mechanisms, and compliance frameworks</span> specifically
                                        designed for your industry requirements, regulatory obligations, data
                                        sensitivity levels, and risk tolerance rather than relying on <span
                                        className={`font-[900] ${isDayTime ? 'text-[#0284c7]' : 'text-[#0ef0dd]'}`}>generic security
                                        models</span> that may not adequately address your specific vulnerabilities or
                                        compliance mandates. Our <span
                                        className={`font-[900] ${isDayTime ? 'text-[#06b6d4]' : 'text-[#06b6d4]'}`}>security-first development approach</span> incorporates
                                        role-based access controls with granular permission levels, multi-factor
                                        authentication, encryption for data at rest and in transit, comprehensive audit
                                        logging, intrusion detection and prevention, secure API design, database
                                        security hardening, and application-layer security controls tailored to your
                                        threat landscape. Custom development enables <span
                                        className={`font-[900] ${isDayTime ? 'text-[#d97706]' : 'text-[#f59e0b]'}`}>implementation of industry-specific
                                        compliance requirements</span> including HIPAA for healthcare, PCI DSS for
                                        payment
                                        processing, SOX for financial reporting, GDPR for European data privacy, CCPA
                                        for California consumer privacy, ITAR for defense contractors, and
                                        sector-specific regulations that may not be adequately addressed in commercial
                                        software. The ability to host sensitive data in controlled environments,
                                        implement proprietary security protocols, conduct thorough security audits
                                        without vendor restrictions, and rapidly respond to emerging threats or evolving
                                        compliance requirements provides <span
                                        className={`font-[900] ${isDayTime ? 'text-[#0284c7]' : 'text-[#0ef0dd]'}`}>superior data protection and risk mitigation</span> compared
                                        to shared commercial platforms with
                                        standardized security models.
                                    </p>
                                )}
                            </div>
                            <div
                                className={`w-full rounded-2xl transition-all duration-300 overflow-hidden ${webIndex === 5 ? (isDayTime ? 'bg-white/80 border-2 border-[#ec4899]/40 shadow-xl' : 'bg-[#0E3B46]/60 border-2 border-[#ec4899]/50 shadow-2xl') : (isDayTime ? 'bg-white/40 border-2 border-gray-200/30 hover:border-[#ec4899]/30' : 'bg-[#0a1f28]/40 border-2 border-gray-600/20 hover:border-[#ec4899]/30')}`}>
                                <button
                                    onClick={() => toggleWeb(5)}
                                    className={`flex items-center justify-between w-full p-6 lg:p-8 text-start focus:outline-none transition-all duration-300 ${webIndex === 5 ? 'bg-gradient-to-r from-[#ec4899]/5 to-[#db2777]/5' : 'hover:bg-gradient-to-r hover:from-[#ec4899]/3 hover:to-[#db2777]/3'}`}
                                >
                                    <span
                                        className={`capitalize lg:text-[1.55em] md:text-[1.45em] text-base font-[900] flex items-center gap-3 ${webIndex === 5 ? (isDayTime ? 'text-[#db2777]' : 'text-[#ec4899]') : (isDayTime ? 'text-[#031E29]' : 'text-white')}`}>
                                        <span className='text-2xl lg:text-3xl'>??</span>
                                        Competitive Advantage Through Innovation
                                    </span>
                                    {webIndex === 5 ? (
                                        <AiFillCaretUp
                                            className={`lg:text-[2em] text-[1.3em] flex-shrink-0 ml-4 ${isDayTime ? 'text-[#db2777]' : 'text-[#ec4899]'}`}/>
                                    ) : (
                                        <AiFillCaretDown
                                            className={`lg:text-[2em] text-[1.3em] flex-shrink-0 ml-4 ${isDayTime ? 'text-gray-600' : 'text-gray-400'}`}/>
                                    )}
                                </button>
                                {webIndex === 5 && (
                                    <p className={`px-6 lg:px-8 pb-8 text-[0.95em] text-justify leading-[1.95] font-[600] border-t-2 pt-6 ${isDayTime ? 'border-[#ec4899]/20 text-gray-700' : 'border-[#ec4899]/30 text-gray-300'}`}>
                                        Custom maritime development transforms your enterprise software from a <span
                                        className={`font-[900] ${isDayTime ? 'text-[#0284c7]' : 'text-[#0ef0dd]'}`}>commodity
                                        business tool into a strategic competitive asset</span> by embedding <span
                                        className={`font-[900] ${isDayTime ? 'text-[#db2777]' : 'text-[#ec4899]'}`}>proprietary
                                        business processes, innovative workflows, unique analytical capabilities, and
                                        differentiated customer experiences</span> directly into your operational
                                        infrastructure. While competitors using identical commercial Maritime Port
                                        Management packages
                                        operate with standardized processes and generic capabilities, your custom
                                        solution <span
                                        className={`font-[900] ${isDayTime ? 'text-[#06b6d4]' : 'text-[#06b6d4]'}`}>operationalizes your competitive advantages</span>,
                                        encodes institutional
                                        knowledge and best practices, automates distinctive service delivery models, and
                                        enables innovative business strategies that would be impossible with
                                        off-the-shelf software. This strategic alignment allows you to <span
                                        className={`font-[900] ${isDayTime ? 'text-[#0284c7]' : 'text-[#0ef0dd]'}`}>respond more
                                        rapidly to market opportunities</span>, deliver superior customer experiences
                                        through
                                        seamless operations, optimize unique aspects of your value chain, and
                                        continuously innovate operational processes without waiting for software vendors
                                        to develop features or conforming to industry-standard processes that eliminate
                                        competitive differentiation. Custom Maritime Port Management becomes an <span
                                        className={`font-[900] ${isDayTime ? 'text-[#db2777]' : 'text-[#ec4899]'}`}>enabler of business strategy</span>
                                        rather than a constraint, supporting market innovation, operational excellence,
                                        and strategic positioning that strengthens your competitive position and creates
                                        barriers to entry that protect market share in increasingly competitive business
                                        environments.
                                    </p>
                                )}
                            </div>
                            <div
                                className={`w-full rounded-2xl transition-all duration-300 overflow-hidden ${webIndex === 6 ? (isDayTime ? 'bg-white/80 border-2 border-[#3b82f6]/40 shadow-xl' : 'bg-[#0E3B46]/60 border-2 border-[#3b82f6]/50 shadow-2xl') : (isDayTime ? 'bg-white/40 border-2 border-gray-200/30 hover:border-[#3b82f6]/30' : 'bg-[#0a1f28]/40 border-2 border-gray-600/20 hover:border-[#3b82f6]/30')}`}>
                                <button
                                    onClick={() => toggleWeb(6)}
                                    className={`flex items-center justify-between w-full p-6 lg:p-8 text-start focus:outline-none transition-all duration-300 ${webIndex === 6 ? 'bg-gradient-to-r from-[#3b82f6]/5 to-[#1d4ed8]/5' : 'hover:bg-gradient-to-r hover:from-[#3b82f6]/3 hover:to-[#1d4ed8]/3'}`}
                                >
                                    <span
                                        className={`capitalize lg:text-[1.55em] md:text-[1.45em] text-base font-[900] flex items-center gap-3 ${webIndex === 6 ? (isDayTime ? 'text-[#1d4ed8]' : 'text-[#60a5fa]') : (isDayTime ? 'text-[#031E29]' : 'text-white')}`}>
                                        <span className='text-2xl lg:text-3xl'>?</span>
                                        Superior User Experience And Adoption
                                    </span>
                                    {webIndex === 6 ? (
                                        <AiFillCaretUp
                                            className={`lg:text-[2em] text-[1.3em] flex-shrink-0 ml-4 ${isDayTime ? 'text-[#1d4ed8]' : 'text-[#60a5fa]'}`}/>
                                    ) : (
                                        <AiFillCaretDown
                                            className={`lg:text-[2em] text-[1.3em] flex-shrink-0 ml-4 ${isDayTime ? 'text-gray-600' : 'text-gray-400'}`}/>
                                    )}
                                </button>
                                {webIndex === 6 && (
                                    <p className={`px-6 lg:px-8 pb-8 text-[0.95em] text-justify leading-[1.95] font-[600] border-t-2 pt-6 ${isDayTime ? 'border-[#3b82f6]/20 text-gray-700' : 'border-[#3b82f6]/30 text-gray-300'}`}>
                                        Custom Maritime Port Management interfaces are <span
                                        className={`font-[900] ${isDayTime ? 'text-[#1d4ed8]' : 'text-[#60a5fa]'}`}>designed specifically for your users' roles,
                                        responsibilities, skill levels, and daily workflows</span>, resulting in <span
                                        className={`font-[900] ${isDayTime ? 'text-[#0284c7]' : 'text-[#0ef0dd]'}`}>intuitive
                                        navigation, relevant functionality, streamlined processes, and optimal user
                                        experiences</span> that drive <span
                                        className={`font-[900] ${isDayTime ? 'text-[#06b6d4]' : 'text-[#06b6d4]'}`}>higher adoption rates, increased productivity, and
                                        reduced training requirements</span> compared to generic interfaces designed for
                                        broad
                                        market appeal. Our user-centered design approach incorporates your
                                        organizational terminology, familiar workflows, role-specific dashboards,
                                        personalized views, and intuitive interaction patterns that align with how your
                                        teams actually work rather than forcing users to adapt to unfamiliar commercial
                                        software conventions. This tailored user experience <span
                                        className={`font-[900] ${isDayTime ? 'text-[#1d4ed8]' : 'text-[#60a5fa]'}`}>eliminates unnecessary
                                        complexity</span>, reduces clicks required for common tasks, surfaces relevant
                                        information contextually, automates repetitive activities, and provides mobile
                                        interfaces optimized for field operations or remote work scenarios specific to
                                        your business. Higher user satisfaction and lower resistance to adoption
                                        translate directly to <span
                                        className={`font-[900] ${isDayTime ? 'text-[#0284c7]' : 'text-[#0ef0dd]'}`}>faster implementation timelines, reduced change management
                                        challenges, shorter time-to-value</span>, improved data quality through
                                        consistent
                                        system usage, and better return on technology investment as employees embrace
                                        rather than resist the system that genuinely makes their work easier and more
                                        efficient.
                                    </p>
                                )}
                            </div>
                            <div
                                className={`w-full rounded-2xl transition-all duration-300 overflow-hidden ${webIndex === 7 ? (isDayTime ? 'bg-white/80 border-2 border-[#8b5cf6]/40 shadow-xl' : 'bg-[#0E3B46]/60 border-2 border-[#8b5cf6]/50 shadow-2xl') : (isDayTime ? 'bg-white/40 border-2 border-gray-200/30 hover:border-[#8b5cf6]/30' : 'bg-[#0a1f28]/40 border-2 border-gray-600/20 hover:border-[#8b5cf6]/30')}`}>
                                <button
                                    onClick={() => toggleWeb(7)}
                                    className={`flex items-center justify-between w-full p-6 lg:p-8 text-start focus:outline-none transition-all duration-300 ${webIndex === 7 ? 'bg-gradient-to-r from-[#8b5cf6]/5 to-[#6d28d9]/5' : 'hover:bg-gradient-to-r hover:from-[#8b5cf6]/3 hover:to-[#6d28d9]/3'}`}
                                >
                                    <span
                                        className={`capitalize lg:text-[1.55em] md:text-[1.45em] text-base font-[900] flex items-center gap-3 ${webIndex === 7 ? (isDayTime ? 'text-[#6d28d9]' : 'text-[#c4b5fd]') : (isDayTime ? 'text-[#031E29]' : 'text-white')}`}>
                                        <span className='text-2xl lg:text-3xl'>??</span>
                                        Long-Term Cost Efficiency
                                    </span>
                                    {webIndex === 7 ? (
                                        <AiFillCaretUp
                                            className={`lg:text-[2em] text-[1.3em] flex-shrink-0 ml-4 ${isDayTime ? 'text-[#6d28d9]' : 'text-[#c4b5fd]'}`}/>
                                    ) : (
                                        <AiFillCaretDown
                                            className={`lg:text-[2em] text-[1.3em] flex-shrink-0 ml-4 ${isDayTime ? 'text-gray-600' : 'text-gray-400'}`}/>
                                    )}
                                </button>
                                {webIndex === 7 && (
                                    <p className={`px-6 lg:px-8 pb-8 text-[0.95em] text-justify leading-[1.95] font-[600] border-t-2 pt-6 ${isDayTime ? 'border-[#8b5cf6]/20 text-gray-700' : 'border-[#8b5cf6]/30 text-gray-300'}`}>
                                        While custom maritime development requires <span
                                        className={`font-[900] ${isDayTime ? 'text-[#6d28d9]' : 'text-[#c4b5fd]'}`}>higher initial investment</span> compared
                                        to
                                        commercial software licensing, the <span
                                        className={`font-[900] ${isDayTime ? 'text-[#0284c7]' : 'text-[#0ef0dd]'}`}>total cost of ownership over the system
                                        lifecycle</span> typically proves significantly more economical when accounting
                                        for
                                        <span
                                            className={`font-[900] ${isDayTime ? 'text-[#06b6d4]' : 'text-[#06b6d4]'}`}>perpetual licensing fees, annual maintenance contracts, user-based pricing</span> that
                                        increases with organizational growth, mandatory upgrade costs, customization
                                        charges for vendor modifications, integration expenses for third-party
                                        connectors, consultant fees for implementation and support, and opportunity
                                        costs from operational limitations and workarounds required by packaged
                                        solutions. Custom development <span
                                        className={`font-[900] ${isDayTime ? 'text-[#6d28d9]' : 'text-[#c4b5fd]'}`}>eliminates recurring vendor payments</span>,
                                        provides
                                        ownership of a depreciable asset, scales economically without per-user licensing
                                        increases, accommodates modifications and enhancements at actual development
                                        costs rather than vendor premium rates, and delivers precisely the functionality
                                        you need without paying for unused features or unnecessary complexity. The
                                        ability to extend system lifespan through incremental modernization rather than
                                        complete replacement, flexibility to choose cost-effective hosting and
                                        infrastructure options, and elimination of vendor-imposed upgrade cycles that
                                        disrupt operations and consume IT resources contribute to <span
                                        className={`font-[900] ${isDayTime ? 'text-[#0284c7]' : 'text-[#0ef0dd]'}`}>superior long-term
                                        financial efficiency</span>. Organizations typically achieve return on custom
                                        Maritime Port Management
                                        investment within three to five years while gaining strategic capabilities,
                                        operational advantages, and competitive differentiation that deliver ongoing
                                        value far exceeding the software investment.
                                    </p>
                                )}
                            </div>
                            <div
                                className={`w-full rounded-2xl transition-all duration-300 overflow-hidden ${webIndex === 8 ? (isDayTime ? 'bg-white/80 border-2 border-[#06b6d4]/40 shadow-xl' : 'bg-[#0E3B46]/60 border-2 border-[#06b6d4]/50 shadow-2xl') : (isDayTime ? 'bg-white/40 border-2 border-gray-200/30 hover:border-[#06b6d4]/30' : 'bg-[#0a1f28]/40 border-2 border-gray-600/20 hover:border-[#06b6d4]/30')}`}>
                                <button
                                    onClick={() => toggleWeb(8)}
                                    className={`flex items-center justify-between w-full p-6 lg:p-8 text-start focus:outline-none transition-all duration-300 ${webIndex === 8 ? 'bg-gradient-to-r from-[#06b6d4]/5 to-[#0891b2]/5' : 'hover:bg-gradient-to-r hover:from-[#06b6d4]/3 hover:to-[#0891b2]/3'}`}
                                >
                                    <span
                                        className={`capitalize lg:text-[1.55em] md:text-[1.45em] text-base font-[900] flex items-center gap-3 ${webIndex === 8 ? (isDayTime ? 'text-[#0891b2]' : 'text-[#06b6d4]') : (isDayTime ? 'text-[#031E29]' : 'text-white')}`}>
                                        <span className='text-2xl lg:text-3xl'>?</span>
                                        Rapid Response To Business Changes
                                    </span>
                                    {webIndex === 8 ? (
                                        <AiFillCaretUp
                                            className={`lg:text-[2em] text-[1.3em] flex-shrink-0 ml-4 ${isDayTime ? 'text-[#0891b2]' : 'text-[#06b6d4]'}`}/>
                                    ) : (
                                        <AiFillCaretDown
                                            className={`lg:text-[2em] text-[1.3em] flex-shrink-0 ml-4 ${isDayTime ? 'text-gray-600' : 'text-gray-400'}`}/>
                                    )}
                                </button>
                                {webIndex === 8 && (
                                    <p className={`px-6 lg:px-8 pb-8 text-[0.95em] text-justify leading-[1.95] font-[600] border-t-2 pt-6 ${isDayTime ? 'border-[#06b6d4]/20 text-gray-700' : 'border-[#06b6d4]/30 text-gray-300'}`}>
                                        Custom Maritime Port Management platforms provide <span
                                        className={`font-[900] ${isDayTime ? 'text-[#0891b2]' : 'text-[#06b6d4]'}`}>organizational agility</span> to
                                        quickly adapt to <span
                                        className={`font-[900] ${isDayTime ? 'text-[#0284c7]' : 'text-[#0ef0dd]'}`}>market
                                        shifts, regulatory changes, competitive pressures, strategic pivots, mergers and
                                        acquisitions, new business models, and operational innovations</span> without
                                        the
                                        delays, limitations, and costs associated with modifying commercial software or
                                        waiting for vendor roadmaps to address your requirements. When business needs
                                        change, your development team can <span
                                        className={`font-[900] ${isDayTime ? 'text-[#0891b2]' : 'text-[#06b6d4]'}`}>rapidly implement new features, modify
                                        workflows, create custom reports, add integrations, adjust business rules, and
                                        deploy enhancements</span> on your timeline rather than submitting change
                                        requests to
                                        software vendors, waiting for scheduled releases, or accepting workarounds that
                                        compromise operational efficiency. This responsiveness proves invaluable during
                                        <span
                                            className={`font-[900] ${isDayTime ? 'text-[#0284c7]' : 'text-[#0ef0dd]'}`}>critical business events</span> including
                                        company acquisitions requiring rapid system
                                        consolidation, market disruptions demanding new operational capabilities,
                                        regulatory changes requiring compliance modifications, competitive threats
                                        necessitating process improvements, or strategic opportunities requiring quick
                                        technology enablement. The ability to evolve your maritime system at the pace of
                                        business change rather than the pace of vendor development cycles provides
                                        <span
                                            className={`font-[900] ${isDayTime ? 'text-[#0891b2]' : 'text-[#06b6d4]'}`}>strategic flexibility and operational resilience</span> that
                                        enables your organization
                                        to capitalize on opportunities, mitigate risks, and adapt to dynamic market
                                        conditions more effectively than competitors constrained by inflexible
                                        commercial software platforms.
                                    </p>
                                )}
                            </div>
                            <div
                                className={`w-full rounded-2xl transition-all duration-300 overflow-hidden ${webIndex === 9 ? (isDayTime ? 'bg-white/80 border-2 border-[#0ef0dd]/40 shadow-xl' : 'bg-[#0E3B46]/60 border-2 border-[#0ef0dd]/50 shadow-2xl') : (isDayTime ? 'bg-white/40 border-2 border-gray-200/30 hover:border-[#0ef0dd]/30' : 'bg-[#0a1f28]/40 border-2 border-gray-600/20 hover:border-[#0ef0dd]/30')}`}>
                                <button
                                    onClick={() => toggleWeb(9)}
                                    className={`flex items-center justify-between w-full p-6 lg:p-8 text-start focus:outline-none transition-all duration-300 ${webIndex === 9 ? 'bg-gradient-to-r from-[#0ef0dd]/5 to-[#06b6d4]/5' : 'hover:bg-gradient-to-r hover:from-[#0ef0dd]/3 hover:to-[#06b6d4]/3'}`}
                                >
                                    <span
                                        className={`capitalize lg:text-[1.55em] md:text-[1.45em] text-base font-[900] flex items-center gap-3 ${webIndex === 9 ? (isDayTime ? 'text-[#0284c7]' : 'text-[#0ef0dd]') : (isDayTime ? 'text-[#031E29]' : 'text-white')}`}>
                                        <span className='text-2xl lg:text-3xl'>?? </span>
                                        Optimized Performance For Your Workload
                                    </span>
                                    {webIndex === 9 ? (
                                        <AiFillCaretUp
                                            className={`lg:text-[2em] text-[1.3em] flex-shrink-0 ml-4 ${isDayTime ? 'text-[#0284c7]' : 'text-[#0ef0dd]'}`}/>
                                    ) : (
                                        <AiFillCaretDown
                                            className={`lg:text-[2em] text-[1.3em] flex-shrink-0 ml-4 ${isDayTime ? 'text-gray-600' : 'text-gray-400'}`}/>
                                    )}
                                </button>
                                {webIndex === 9 && (
                                    <p className={`px-6 lg:px-8 pb-8 text-[0.95em] text-justify leading-[1.95] font-[600] border-t-2 pt-6 ${isDayTime ? 'border-[#0ef0dd]/20 text-gray-700' : 'border-[#0ef0dd]/30 text-gray-300'}`}>
                                        Custom Maritime Port Management architecture is <span
                                        className={`font-[900] ${isDayTime ? 'text-[#0284c7]' : 'text-[#0ef0dd]'}`}>optimized specifically for your transaction volumes,
                                        data structures, usage patterns, performance requirements, and technical
                                        constraints</span> rather than relying on generic database designs and
                                        application
                                        architectures that attempt to serve diverse markets with varying needs. Our
                                        <span
                                            className={`font-[900] ${isDayTime ? 'text-[#06b6d4]' : 'text-[#06b6d4]'}`}>performance engineering approach</span> analyzes
                                        your specific operational
                                        characteristics including peak transaction periods, concurrent user loads, data
                                        volume growth projections, reporting requirements, batch processing needs, and
                                        integration demands to architect <span
                                        className={`font-[900] ${isDayTime ? 'text-[#0284c7]' : 'text-[#0ef0dd]'}`}>database schemas, indexing strategies, caching
                                        mechanisms, query optimization, and application logic</span> that deliver
                                        optimal
                                        responsiveness for your actual workload. This targeted optimization <span
                                        className={`font-[900] ${isDayTime ? 'text-[#06b6d4]' : 'text-[#06b6d4]'}`}>eliminates
                                        performance bottlenecks</span> common in commercial software where generic
                                        designs
                                        create inefficiencies for specific use cases, ensures consistent response times
                                        during critical operational periods, supports real-time data processing for
                                        time-sensitive decisions, handles complex analytical queries without impacting
                                        transactional performance, and provides headroom for growth without degradation.
                                        Performance tuning continues throughout the system lifecycle as usage patterns
                                        evolve, enabling <span
                                        className={`font-[900] ${isDayTime ? 'text-[#0284c7]' : 'text-[#0ef0dd]'}`}>ongoing optimization</span> that
                                        maintains excellent user experience,
                                        supports operational efficiency, and ensures your technology infrastructure
                                        performs reliably during both routine operations and exceptional demand periods
                                        when system performance directly impacts business outcomes and customer
                                        satisfaction.
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Our Custom Enterprise Software Development Process */}
            <div
                className={`lg:py-[4em] md:py-[3.5em] py-[2em] relative overflow-hidden ${isDayTime ? 'bg-gradient-to-br from-[#031E29] via-[#0a2d3a] to-[#0f3f4f]' : 'bg-gradient-to-br from-[#f8fafb] via-[#f0f3f7] to-[#e8ecf1]'}`}>
                {/* Animated gradient overlay */}
                <div
                    className={`absolute inset-0 ${isDayTime ? 'bg-gradient-to-t from-[#0ef0dd]/8 via-transparent to-[#06b6d4]/8' : 'bg-gradient-to-t from-[#0ef0dd]/3 via-transparent to-[#06b6d4]/3'} pointer-events-none`}/>

                <div id={'our-custom-enterprise-software-development-process'}
                     className={`relative lg:top-0 py-16 lg:mb-16 mb-10 max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em] z-10`}>

                    {/* Watermark Background - Follows Cursor */}
                    <div
                        className="absolute inset-0 pointer-events-none overflow-hidden flex items-center -mt-20 justify-center"
                        style={{
                            transform: isMounted
                                ? `translate(${(mousePosition.x - viewport.width / 2) / 20}px, ${(mousePosition.y - viewport.height / 2) / 20}px)`
                                : 'translate(0px, 0px)',
                            transition: 'transform 0.2s ease-out'
                        }}
                    >
                        {/* Large Maritime Port Management Text Watermark - Center */}
                        <div className="absolute opacity-10">
          <span
              className="text-[8rem] sm:text-[8rem] lg:text-[12rem] xl:text-[12rem] font-bold whitespace-nowrap ${isDayTime ? 'text-[#0ef0dd]' : 'text-[#0ef0dd]'}">
            maritime systems
          </span>
                        </div>

                        {/* Circuit Pattern Watermark - Around Center */}
                        <div className="absolute w-[600px] h-[600px] opacity-20">
                            <svg className="w-full h-full" viewBox="0 0 600 600" fill="none">
                                <circle cx="300" cy="300" r="200" stroke="currentColor" strokeWidth="2"
                                        className={isDayTime ? 'text-[#0ef0dd]' : 'text-[#0ef0dd]'}/>
                                <circle cx="300" cy="300" r="150" stroke="currentColor" strokeWidth="2"
                                        className={isDayTime ? 'text-[#06b6d4]' : 'text-[#06b6d4]'}/>
                                <circle cx="300" cy="300" r="100" stroke="currentColor" strokeWidth="2"
                                        className={isDayTime ? 'text-[#0ef0dd]' : 'text-[#0ef0dd]'}/>
                                <circle cx="300" cy="100" r="40" stroke="currentColor" strokeWidth="2"
                                        className={isDayTime ? 'text-[#7c3aed]' : 'text-[#a78bfa]'}/>
                                <circle cx="500" cy="300" r="40" stroke="currentColor" strokeWidth="2"
                                        className={isDayTime ? 'text-[#7c3aed]' : 'text-[#a78bfa]'}/>
                                <circle cx="300" cy="500" r="40" stroke="currentColor" strokeWidth="2"
                                        className={isDayTime ? 'text-[#7c3aed]' : 'text-[#a78bfa]'}/>
                                <circle cx="100" cy="300" r="40" stroke="currentColor" strokeWidth="2"
                                        className={isDayTime ? 'text-[#7c3aed]' : 'text-[#a78bfa]'}/>
                                <line x1="300" y1="300" x2="300" y2="100" stroke="currentColor" strokeWidth="1"
                                      className={isDayTime ? 'text-[#0ef0dd]' : 'text-[#0ef0dd]'}/>
                                <line x1="300" y1="300" x2="500" y2="300" stroke="currentColor" strokeWidth="1"
                                      className={isDayTime ? 'text-[#06b6d4]' : 'text-[#06b6d4]'}/>
                                <line x1="300" y1="300" x2="300" y2="500" stroke="currentColor" strokeWidth="1"
                                      className={isDayTime ? 'text-[#0ef0dd]' : 'text-[#0ef0dd]'}/>
                                <line x1="300" y1="300" x2="100" y2="300" stroke="currentColor" strokeWidth="1"
                                      className={isDayTime ? 'text-[#06b6d4]' : 'text-[#06b6d4]'}/>
                            </svg>
                        </div>
                    </div>
                    <div className="relative z-10">
                        {/* Our Custom Enterprise Software Development Process */}
                        <div
                            className={`${isDayTime ? 'text-[#031E29]' : 'text-white'} border-b-2 lg:pb-[4em] md:pb-[3em] pb-[2em] mb-20 text-center`}>
                            <div className='flex items-center justify-center gap-3 mb-6'>
                                <div
                                    className={`h-1 w-12 rounded-full ${isDayTime ? 'bg-gradient-to-r from-[#0ef0dd] to-[#06b6d4]' : 'bg-gradient-to-r from-[#0ef0dd] to-[#06b6d4]'}`}/>
                                <span
                                    className={`text-[0.9em] font-[800] uppercase tracking-widest ${isDayTime ? 'text-[#0284c7]' : 'text-[#0ef0dd]'}`}>??  Development Excellence</span>
                                <div
                                    className={`h-1 w-12 rounded-full ${isDayTime ? 'bg-gradient-to-r from-[#06b6d4] to-[#0ef0dd]' : 'bg-gradient-to-r from-[#06b6d4] to-[#0ef0dd]'}`}/>
                            </div>
                            <h2 className={`capitalize text-[2.2em] md:text-[3.2em] lg:text-[3.8em] font-[900] tracking-tight leading-[1.15] lg:pb-8 drop-shadow-lg ${isDayTime ? 'text-[#031E29]' : 'text-[#0ef0dd]'}`}>
                                Our <span
                                className={`bg-gradient-to-r from-[#0ef0dd] via-[#06b6d4] to-[#7c3aed] bg-clip-text text-transparent`}>Custom Enterprise</span>
                                <br
                                    className={'lg:block md:block hidden'}/>Software Development Process
                            </h2>
                            <p className={`mx-auto mt-6 max-w-5xl text-[0.98em] font-[600] leading-[1.95] ${isDayTime ? 'text-gray-700' : 'text-gray-300'}`}>
                                As a leading maritime solutions provider, we develop <span
                                className={`font-[900] ${isDayTime ? 'text-[#0284c7]' : 'text-[#0ef0dd]'}`}>comprehensive software modules</span> designed
                                to
                                optimize your operational workflows and drive <span
                                className={`font-[900] ${isDayTime ? 'text-[#06b6d4]' : 'text-[#06b6d4]'}`}>measurable performance improvements</span>.
                                Our
                                modular approach enables <span
                                className={`font-[900] ${isDayTime ? 'text-[#7c3aed]' : 'text-[#a78bfa]'}`}>precise customization</span> to
                                address your enterprise&#39;s specific
                                requirements and industry challenges.<br/><br/>
                                Our methodology encompasses <span
                                className={`font-[900] ${isDayTime ? 'text-[#0284c7]' : 'text-[#0ef0dd]'}`}>critical business functions</span> including
                                financial management,
                                supply chain optimization, human capital management, and customer relationship
                                management.
                                Each module features <span
                                className={`font-[900] ${isDayTime ? 'text-[#06b6d4]' : 'text-[#06b6d4]'}`}>enterprise-grade scalability and seamless interoperability</span> across
                                departments, delivering <span
                                className={`font-[900] ${isDayTime ? 'text-[#0284c7]' : 'text-[#0ef0dd]'}`}>targeted functionality</span> that
                                enhances efficiency and empowers
                                strategic decision-making for <span
                                className={`font-[900] ${isDayTime ? 'text-[#7c3aed]' : 'text-[#a78bfa]'}`}>sustained competitive advantage</span>.
                            </p>
                        </div>

                        {/* Process Steps */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start max-w-7xl mx-auto">
                            {/* Left Side - Step Titles */}
                            <div className="space-y-4 lg:space-y-8">
                                {processSteps.map((step, index) => (
                                    <div
                                        key={index}
                                        onClick={() => setActiveStep(index)}
                                        className={`cursor-pointer transition-all duration-300 transform ${
                                            activeStep === index
                                                ? 'scale-105'
                                                : 'hover:scale-102'
                                        }`}
                                    >
                                        <div className="flex items-center space-x-4 lg:space-x-6">
                                            <div
                                                className={`w-1.5 h-16 sm:h-20 rounded-r-full transition-all duration-300 ${
                                                    activeStep === index
                                                        ? `${isDayTime ? 'bg-gradient-to-b from-[#0ef0dd] to-[#06b6d4]' : 'bg-gradient-to-b from-[#0ef0dd] to-[#06b6d4]'} shadow-lg`
                                                        : `${isDayTime ? 'bg-gray-400' : 'bg-gray-600'}`
                                                }`}
                                            />
                                            <div>
                                                <div
                                                    className={`text-sm font-[800] uppercase tracking-widest mb-2 transition-colors duration-300 ${
                                                        activeStep === index
                                                            ? `${isDayTime ? 'text-[#0284c7]' : 'text-[#0ef0dd]'}`
                                                            : `${isDayTime ? 'text-gray-600' : 'text-gray-400'}`
                                                    }`}>Step {index + 1}</div>
                                                <h3
                                                    className={`text-2xl sm:text-3xl lg:text-4xl font-[900] transition-colors duration-300 leading-tight ${
                                                        activeStep === index
                                                            ? `${isDayTime ? 'text-[#0284c7]' : 'text-[#0ef0dd]'} drop-shadow-lg`
                                                            : `${isDayTime ? 'text-gray-700' : 'text-white'}`
                                                    }`}
                                                >
                                                    {step.title}
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Right Side - Content */}
                            <div
                                className={`rounded-3xl p-8 sm:p-10 border-l-4 border-t-4 min-h-[350px] lg:min-h-[500px] transition-all duration-300 ${
                                    isDayTime
                                        ? 'bg-gradient-to-br from-white/70 to-[#f0f9ff]/60 border-[#0ef0dd]/50 shadow-xl'
                                        : 'bg-gradient-to-br from-[#0E3B46]/60 to-[#041f2d]/50 border-[#0ef0dd]/50 shadow-2xl'
                                } md:-ml-32 lg:-ml-40`}>
                                <div className="space-y-5 sm:space-y-7">
                                    {processSteps[activeStep].content.map((paragraph, index) => (
                                        <p
                                            key={index}
                                            className={`text-[0.95em] leading-[1.85] font-[600] ${isDayTime ? 'text-gray-700' : 'text-gray-300'}`}
                                        >
                                            {paragraph}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Mobile Step Indicators */}
                        <div className="flex justify-center mt-12 lg:hidden space-x-3">
                            {processSteps.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveStep(index)}
                                    className={`rounded-full transition-all duration-300 ${
                                        activeStep === index
                                            ? `w-10 h-3 ${isDayTime ? 'bg-gradient-to-r from-[#0ef0dd] to-[#06b6d4]' : 'bg-gradient-to-r from-[#0ef0dd] to-[#06b6d4]'} shadow-lg`
                                            : `w-3 h-3 ${isDayTime ? 'bg-gray-400' : 'bg-gray-600'}`
                                    }`}
                                    aria-label={`Go to step ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default MaritimePortManagement;


