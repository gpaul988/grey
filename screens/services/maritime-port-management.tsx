'use client';

import React, { useEffect, useRef, useState } from 'react';
import '@/app/globals.css';
import FloatingButton from "@/components/FloatingButton";
import Image from "next/image";
import ResponsiveVideoHero from '@/components/ResponsiveVideoHero';
import Link from "next/link";
import CountUp from "react-countup";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useIsDayTime } from '../../components/useIsDayTime';
import FuturisticServiceLayout from '@/components/futuristic/FuturisticServiceLayout';
import { FxBackground, FxChip, FxReveal, FxButton, FxHoloCard, FxStickyScrollSection } from '@/components/futuristic/fx';

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
    const [activeStep, setActiveStep] = useState<number>(0);
    const [mousePosition, setMousePosition] = useState({x: 0, y: 0});
    const [isMounted, setIsMounted] = useState(false);
    const [viewport, setViewport] = useState(() => ({
        width: typeof window !== 'undefined' ? window.innerWidth : 0,
        height: typeof window !== 'undefined' ? window.innerHeight : 0,
    }));

    // Floating button visibility hook
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsVisible(scrollPosition > 200);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // isDayTime react hook
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

    // Maritime Solutions scroll tracking
    const handleScroll = () => {
        const sections = [
            "VMS", "VOP", "TOS", "CCSS", "PO", "CNS", "IAIS"
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
            setActiveId(target);
        }
    }

    // Comprehensive Maritime Solutions Accordion
    const solutions = [
        {
            number: "01",
            title: "Integrated Vessel Fleet Management System (IVFMS)",
            heading: "Integrated Vessel Fleet Management System",
            description: (
                <>
                    <p>Our comprehensive Integrated Vessel Fleet Management System represents a paradigm shift in maritime fleet operations, delivering enterprise-grade visibility and automation across heterogeneous fleet compositions spanning container ships, bulk carriers, tanker vessels, multipurpose carriers, offshore support vessels, and specialized maritime equipment. This sophisticated platform orchestrates all dimensions of vessel operations, seamlessly integrating real-time vessel tracking, predictive maintenance scheduling, operational performance analytics, and regulatory compliance management into a unified operational framework designed specifically for global shipping companies, maritime operators, and fleet management organizations.</p>
                    
                    <p>Our IVFMS captures comprehensive real-time telemetry data from vessel-mounted IoT sensor networks including advanced engine parameters, fuel consumption metrics at granular intervals, navigational coordinates with positional accuracy, weather exposure assessment, machinery condition diagnostics, and environmental performance indicators. AI-powered predictive maintenance algorithms analyze historical performance patterns, identify anomaly signatures, and forecast component failures with remarkable accuracy, enabling fleet operators to implement proactive maintenance schedules that prevent costly breakdowns, extend vessel operational lifespan, minimize unexpected downtime, and optimize maintenance expenditures across entire fleet portfolios.</p>
                    
                    <p>Advanced integration capabilities seamlessly connect disparate maritime systems including vessel-mounted IoT infrastructure, integrated bridge systems, engine room instrumentation, satellite communication networks, automated identification systems (AIS), and global positioning networks to deliver comprehensive operational intelligence accessible to fleet managers, captains, technical teams, and shore-based operations centers. Real-time dashboards provide instantaneous access to vessel status, performance metrics, maintenance alerts, crew information, cargo status, and comprehensive compliance documentation. Automated regulatory compliance monitoring ensures systematic adherence to international maritime regulations including SOLAS (Safety of Life at Sea), MARPOL (International Convention for the Prevention of Pollution from Ships), ISM Code (International Safety Management), flag state requirements, and classification society regulations while maintaining comprehensive audit trails for regulatory authorities and maritime classification societies. Our system delivers up to 35% reduction in maintenance costs, 40% improvement in fuel efficiency, and 99.97% fleet availability rates.</p>
                </>
            )
        },
        {
            number: "02",
            title: "Advanced Voyage Optimization & Route Planning Platform (AVOPP)",
            heading: "Advanced Voyage Optimization & Route Planning Platform",
            description: (
                <>
                    <p>Our Advanced Voyage Optimization & Route Planning Platform revolutionizes maritime route planning through sophisticated AI-driven algorithms that synthesize dynamic environmental conditions, operational constraints, regulatory requirements, and multi-dimensional cost optimization objectives into optimal routing decisions. This enterprise-class platform integrates real-time weather data from multiple meteorological services, oceanographic current analysis, port congestion forecasts, fuel price fluctuations, vessel-specific performance characteristics, piracy threat assessments, and geopolitical restrictions to compute mathematically optimal voyage plans that maximize profitability while minimizing operational risks.</p>
                    
                    <p>Dynamic routing algorithms continuously recalibrate voyage plans as maritime conditions evolve, automatically accounting for emerging storms, unexpected port delays, security threats, geopolitical restrictions, and regulatory changes. The system provides AI-generated estimated time of arrival (ETA) predictions with 95%+ accuracy, enabling shippers, consignees, and supply chain partners to optimize inventory management, reduce supply chain buffers, and improve overall supply chain responsiveness. Automated berth scheduling algorithms coordinate vessel arrivals with terminal availability and berth utilization forecasts, systematically minimizing costly port waiting times, eliminating berth conflicts, and optimizing cargo handling operations. Energy optimization engines compute fuel-efficient speed profiles, optimal routing corridors, and operational strategies that significantly reduce maritime fuel consumption while maintaining schedule reliability and service level commitments.</p>
                    
                    <p>Environmental stewardship capabilities including carbon emissions tracking and reporting support compliance with IMO 2030 and IMO 2050 decarbonization targets, providing detailed metrics for environmental sustainability reporting and carbon accounting. Multi-port routing optimization enables complex voyages with multiple ports of call, systematically accounting for varying port capabilities, commodity handling restrictions, geographic constraints, and labor availability. Integration with global port information systems, automated identification systems (AIS), weather services, maritime communication networks, and market data providers delivers comprehensive voyage planning capabilities that enhance profitability, reduce environmental impact, and support sustainable maritime operations. Typical clients realize 18-25% fuel cost reduction, 12-15% voyage efficiency improvement, and substantial carbon emission reductions.</p>
                </>
            )
        },
        {
            number: "03",
            title: "Cloud-Native Terminal Operating System (CNTOS)",
            heading: "Cloud-Native Terminal Operating System",
            description: (
                <>
                    <p>Our cloud-native Terminal Operating System (CNTOS) represents a transformative approach to port terminal operations, delivering unprecedented real-time visibility, operational automation, and performance optimization across container terminals, breakbulk facilities, multipurpose terminals, and specialized port operations. This enterprise-grade platform orchestrates extraordinarily complex cargo handling sequences through intelligent crane scheduling algorithms, sophisticated yard planning optimization, and advanced vessel stowage management, enabling terminal operators to achieve unprecedented operational efficiency and throughput.</p>
                    
                    <p>AI-powered queue prediction algorithms forecast vessel arrival sequences, anticipate berth utilization patterns, and enable efficient deployment of specialized equipment and labor resources. Sophisticated yard management algorithms optimize container placement strategies, calculate optimal stacking sequences, and plan efficient retrieval patterns to systematically minimize cargo handling costs, reduce vessel turnaround times, and maximize terminal throughput. The system integrates tightly with vessel management systems to optimize cargo stowage plans that account for vessel stability requirements, weight distribution constraints, and port-specific handling limitations. Real-time equipment tracking provides continuous monitoring of crane locations and availability, carrier positioning, forklift deployment, and other terminal equipment, enabling efficient equipment allocation and implementing preventive maintenance scheduling for critical infrastructure.</p>
                    
                    <p>Advanced gate automation technologies utilizing optical character recognition (OCR), RFID scanning, license plate recognition, and automated container identification accelerate cargo inbound and outbound processes, systematically reducing congestion, improving terminal throughput, and enhancing security protocols. Seamless integration with customs systems, documentation providers, logistics networks, and port community systems enables expedited cargo release and customs clearance. Proprietary digital twin technology provides operational simulation and scenario modeling capabilities, enabling terminal managers to test alternative operating strategies, identify efficiency improvements, and model the impact of operational changes before implementation. Real-time performance dashboards deliver comprehensive key performance indicators including crane productivity metrics, vessel turnaround time measurements, terminal throughput statistics, equipment utilization rates, and labor efficiency metrics that systematically drive continuous operational improvement. Leading terminal operators using CNTOS report 22% improvement in crane productivity, 18% reduction in vessel turnaround times, and 31% increase in terminal throughput.</p>
                </>
            )
        },
        {
            number: "04",
            title: "Integrated Cargo Compliance, Customs & Trade Intelligence System (ICCCIS)",
            heading: "Integrated Cargo Compliance, Customs & Trade Intelligence System",
            description: (
                <>
                    <p>Our Integrated Cargo Compliance, Customs & Trade Intelligence System (ICCCIS) delivers comprehensive end-to-end cargo visibility and sophisticated regulatory management across the entire maritime supply chain, from initial shipper notification through final consignee delivery. This mission-critical platform synthesizes customs requirements, trade regulations, security mandates, environmental constraints, and international compliance obligations into unified, automated workflows that ensure regulatory adherence while maintaining operational efficiency and supply chain velocity.</p>
                    
                    <p>The platform provides comprehensive cargo tracking and traceability capabilities capturing commodity details, origin and destination information, shipper identification and verification, consignee profiles, hazardous material classifications, and regulatory certifications required by importing countries. Sophisticated customs documentation generation automatically creates compliant shipping papers including bills of lading, commercial invoices, certificates of origin, specialized certifications, and country-specific documentation requirements. Digital bill-of-lading capabilities eliminate inefficient paper-based documentation processes while providing cryptographic proof of ownership, transfer rights, and custody chains. Seamless integration with customs authorities worldwide enables pre-clearance, advance filing, and expedited release of low-risk commodities, significantly reducing cargo dwell time in ports.</p>
                    
                    <p>Comprehensive hazardous cargo management ensures strict compliance with IMDG Code (International Maritime Dangerous Goods Code), providing automated classification algorithms, labeling requirements, stowage planning, and emergency response protocols. Real-time exception alerting immediately identifies regulatory violations, documentation discrepancies, or compliance deficiencies before cargo reaches ports, systematically minimizing delays and penalties. Blockchain-verified cargo release protocols create immutable, tamper-proof evidence of regulatory compliance and authorized cargo release, substantially reducing fraud, preventing unauthorized cargo diversion, and ensuring chain of custody integrity. Port State Control (PSC) compliance monitoring ensures comprehensive vessel and cargo documentation adherence to international maritime standards. Global trade intelligence integration enables identification of sanctioned parties, restricted commodities, and elevated-risk shipments. The system maintains detailed audit trails documenting all compliance activities, regulatory filings, and approval authorizations, providing comprehensive evidence of regulatory due diligence for audits and regulatory inquiries. Organizations utilizing ICCCIS report average cargo clearance time reduction of 40%, virtually eliminated compliance violations, and reduced regulatory penalties.</p>
                </>
            )
        },
        {
            number: "05",
            title: "Unified Port Operations Management Platform (UPOMP)",
            heading: "Unified Port Operations Management Platform",
            description: (
                <>
                    <p>Our Unified Port Operations Management Platform (UPOMP) provides comprehensive integrated oversight of multi-faceted port facilities including container terminals, breakbulk operations, tanker operations, ro-ro facilities, general cargo handling areas, and specialized maritime infrastructure. This enterprise-class platform orchestrates coordination among multiple terminal operators, diverse service providers, customs agencies, shipping lines, and port authorities through unified operational workflows and real-time data sharing, creating a cohesive port community ecosystem that maximizes efficiency and safety.</p>
                    
                    <p>Sophisticated berth management algorithms optimize berth allocation across available berths, systematically accounting for vessel size, commodity type, handling equipment availability, operational schedules, turnaround time requirements, and port facility constraints. The system coordinates complex maritime operations including piloting services, tug operations, mooring arrangements, and vessel positioning to maximize safety standards and operational efficiency. Real-time vessel arrival management tracks approaching vessels, manages anchorage assignments, optimizes pilot boarding sequences, and coordinates vessel scheduling across multiple terminals. Advanced port traffic management directs vessel movements within port limits, coordinates lock operations where applicable, and manages vessel separation schemes to prevent collisions and operational conflicts.</p>
                    
                    <p>Integrated weather monitoring tracks maritime weather conditions including wind speeds, swell heights, barometric pressure, and port-specific weather restrictions that impact vessel movements and cargo handling operations. Comprehensive emergency management protocols provide rapid response coordination for vessel incidents, environmental emergencies, security threats, and natural disasters. Seamless integration with port community systems enables comprehensive information sharing with shipping agents, freight forwarders, customs brokers, and other port stakeholders. Performance analytics dashboards provide detailed tracking of port-level metrics including vessel throughput, total cargo handled, equipment availability, labor efficiency, and financial performance indicators. Dynamic pricing optimization algorithms adjust port service charges based on capacity utilization, vessel characteristics, seasonal demand patterns, and competitive market conditions to maximize port revenue while maintaining competitive positioning. Leading port operators report 28% improvement in vessel throughput, 19% reduction in operational costs, and significantly improved port community coordination.</p>
                </>
            )
        },
        {
            number: "06",
            title: "Comprehensive Maritime Crew & Advanced Navigation System (CMANS)",
            heading: "Comprehensive Maritime Crew & Advanced Navigation System",
            description: (
                <>
                    <p>Our Comprehensive Maritime Crew & Advanced Navigation System (CMANS) seamlessly integrates maritime personnel management, advanced navigation operations, bridge systems integration, and vessel safety protocols into a unified platform that enhances crew efficiency, navigational accuracy, and operational safety. This sophisticated system delivers comprehensive crew administration, professional training management, navigational support, and safety monitoring capabilities specifically engineered for modern maritime operations.</p>
                    
                    <p>The platform manages complete crew lifecycle operations including crew onboarding, comprehensive documentation management, maritime certification tracking, medical fitness requirements, visa status monitoring, and regulatory compliance for international maritime employment standards. Sophisticated crew scheduling algorithms optimize watch assignments, systematically ensure rest hour compliance with maritime labor conventions, manage training requirements, and coordinate crew changeover logistics across global vessel deployments. Advanced training management modules track maritime certifications, professional qualifications, continuing education requirements, competency assessments, and skill development for deck officers, engineering officers, navigation specialists, and other crew positions.</p>
                    
                    <p>Integration with global crew management networks facilitates efficient crew recruitment, professional placement, and logistics coordination for vessel deployments. Integrated bridge operations provide comprehensive access to electronic chart systems, automated identification system (AIS) displays, integrated radar systems, weather routing information, and navigation alerts directly to bridge systems. Real-time route monitoring tracks vessel adherence to planned routes and provides alerts for deviations that may indicate navigation issues or potential security threats. Advanced navigation performance analytics measure passage planning accuracy, fuel efficiency outcomes, schedule adherence, and collision avoidance effectiveness. Comprehensive incident reporting and near-miss tracking capture maritime safety observations, enabling organizational learning and continuous safety improvement. Strict integration with maritime labor conventions ensures compliance with crew wage regulations, working hour restrictions, and international maritime labor rights. Automated crew welfare monitoring supports comprehensive mental health initiatives, physical fitness tracking, and crew wellbeing programs that substantially enhance maritime safety and operational effectiveness. Digital crew file management maintains centralized personnel records accessible across vessel fleet operations. The system delivers 25% improvement in crew safety metrics, 18% reduction in crew scheduling inefficiencies, and significantly enhanced crew wellbeing.</p>
                </>
            )
        },
        {
            number: "07",
            title: "Advanced Maritime Analytics & Business Intelligence Platform (AMABIP)",
            heading: "Advanced Maritime Analytics & Business Intelligence Platform",
            description: (
                <>
                    <p>Our Advanced Maritime Analytics & Business Intelligence Platform (AMABIP) provides sophisticated data aggregation, advanced analytics capabilities, and enterprise-grade business intelligence across the entire maritime operations infrastructure. This platform consolidates comprehensive data from vessel systems, terminal operations, cargo management platforms, crew administration systems, and external data sources including weather patterns, market pricing, regulatory information, and competitive intelligence into unified data repositories enabling advanced analytics and informed decision-making.</p>
                    
                    <p>Advanced cloud-based data lake architecture enables flexible querying, ad-hoc analysis, and sophisticated machine learning model development across comprehensive maritime operational datasets. Real-time analytics dashboards deliver key performance indicators across multiple organizational dimensions including fleet performance metrics, terminal operations efficiency, cargo profitability analysis, crew management statistics, compliance tracking, and environmental impact metrics. Sophisticated predictive analytics models forecast vessel maintenance requirements, port congestion patterns, market price movements, demand fluctuations, and operational risks, enabling proactive decision-making and resource allocation optimization.</p>
                    
                    <p>Customizable reporting capabilities enable maritime organizations to define business metrics precisely aligned with strategic objectives and operational priorities. Comprehensive financial system integration provides detailed cost tracking, profitability analysis by voyage or route, and sophisticated financial forecasting for maritime operations. Advanced environmental sustainability analytics track fuel consumption patterns, carbon emissions by vessel and voyage, waste management metrics, and environmental compliance status supporting corporate sustainability goals. Supply chain optimization analytics systematically identify operational inefficiencies, supply chain bottlenecks, and opportunities for improvement across maritime logistics networks. AI-powered anomaly detection identifies unusual patterns, potential fraud indicators, and operational irregularities requiring management attention. Intuitive data visualization capabilities transform complex maritime datasets into visually compelling representations enabling rapid comprehension and executive decision-making. Automated compliance reporting systematically generates regulatory filings, audit documentation, and performance disclosures required by maritime authorities, investors, and stakeholders. Organizations implementing AMABIP realize 31% improvement in operational decision accuracy, 28% reduction in unplanned vessel downtime, and significantly enhanced competitive positioning through data-driven maritime operations.</p>
                </>
            )
        }
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

    // Maritime Process Steps
    const processSteps: ProcessStep[] = [
        {
            title: "Assess",
            content: [
                "Our engagement commences with comprehensive assessment of your maritime operations ecosystem, examining existing systems, operational workflows, data infrastructure, port facilities, fleet composition, supply chain networks, and organizational structure. Our specialized maritime technology consulting team conducts detailed evaluation of operational performance metrics, identifies bottlenecks, analyzes cost structures, and benchmarks performance against industry standards.",
                "We evaluate regulatory compliance status, security posture, integration capabilities, and technology maturity to understand current operational constraints and improvement opportunities. Stakeholder interviews with captains, terminal operators, logistics managers, and finance teams provide operational insights that inform solution design.",
                "This discovery phase produces a comprehensive operational assessment documenting existing capabilities, performance gaps, technical constraints, and organizational readiness for digital transformation initiatives."
            ]
        },
        {
            title: "Design",
            content: [
                "Based on operational assessment findings, our architects design customized maritime technology solutions tailored to your specific operational requirements, organizational structure, regulatory environment, and strategic objectives. Solution design incorporates industry best practices, emerging maritime technology innovations, and your unique competitive positioning.",
                "We develop comprehensive technology architectures addressing vessel operations, terminal management, cargo handling, crew administration, supply chain coordination, and data analytics. Design includes detailed system integration specifications, data flow architectures, security frameworks, and compliance mappings against international maritime regulations.",
                "Design phase produces system architecture documentation, detailed interface specifications, data models, security protocols, and implementation roadmaps that guide development teams and ensure solution coherence across maritime operations."
            ]
        },
        {
            title: "Implement",
            content: [
                "Our maritime technology development teams execute comprehensive implementation of designed solutions, building integrated systems across vessel operations, terminal management, cargo systems, crew administration, and analytics infrastructure. Implementation utilizes cloud-native architectures, containerized deployment, and scalable infrastructure supporting global maritime operations.",
                "We deploy advanced data integration frameworks consolidating information from diverse maritime systems into unified data repositories. Real-time synchronization ensures operational intelligence flows seamlessly across all maritime stakeholders. Rigorous quality assurance processes validate system functionality against operational requirements.",
                "Implementation includes comprehensive training programs enabling maritime personnel to effectively utilize new systems. Change management support facilitates organizational transition to new operational workflows and digital processes."
            ]
        },
        {
            title: "Optimize",
            content: [
                "Post-implementation, our maritime operations specialists conduct comprehensive performance optimization, fine-tuning system configurations based on operational experience and performance metrics. Continuous monitoring identifies optimization opportunities, refines algorithms, and improves system responsiveness.",
                "We analyze utilization patterns, identify underutilized capabilities, and recommend process improvements that maximize return on technology investment. Machine learning models continuously improve prediction accuracy and algorithm optimization.",
                "Ongoing optimization ensures maritime technology investments deliver sustained value, supporting competitive advantage and operational excellence across evolving maritime markets."
            ]
        }
    ];

    const stats = [
        {label: 'Global Port Integrations', value: 150, suffix: '+'},
        {label: 'Vessels Under Management', value: 1200, suffix: '+'},
        {label: 'Ports Served Globally', value: 350, suffix: '+'},
        {label: 'System Uptime', value: 99.99, suffix: '%'},
        {label: 'Daily Cargo Transactions', value: 500000, suffix: '+'}
    ];

    // Mouse tracking for interactive elements
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
        const rafId = requestAnimationFrame(() => setIsMounted(true));
        const update = () => setViewport({width: window.innerWidth, height: window.innerHeight});
        window.addEventListener('resize', update);
        return () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener('resize', update);
        };
    }, []);

    return (
        <div className={`${isDayTime ? 'bg-white' : 'bg-black'} min-h-screen`}>
            <FloatingButton
                className={`fixed bottom-6 right-6 transition-all z-50 duration-300 ${
                    isVisible ? 'mb-16' : 'mb-0'
                }`}
            />

            {/* Hero Section */}
            <div id={'hero'}
                 className={`relative max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>
                <div className="pointer-events-none absolute inset-0 z-[2] overflow-hidden">
                    <div className="gx-scanline" />
                    <div className="gx-noise-overlay" />
                    <div className="gx-orbit absolute" style={{ width: '60vmax', height: '60vmax', top: '-20vmax', right: '-20vmax', opacity: .15 }} />
                </div>
                <h1
                    className={`border-b pb-[0.5em] border-gray-500/50 px-0 gx-hero-title constant-text lg:text-[5em] md:text-[3em] sm:text-[2em] text-[2.5em] lg:mt-[3em] md:mt-[3em] mt-[1.5em] leading-[1.1] font-[800] ${
                        isDayTime ? 'text-black' : 'text-white'
                    }`}>
                    Maritime &amp; Port<br className={'lg:block md:block hidden'}/> Management<br className={'lg:block md:block hidden'}/> Platform
                </h1>
                <p className={'lg:mt-[4em] mt-[1.5em] text-[0.87em] font-[300]'}>
                    Next-generation digital solutions for global maritime operations: intelligent vessel management, automated terminal orchestration, and real-time cargo visibility across the entire supply chain.
                </p>
                <ResponsiveVideoHero videoDesktop="/assets/ads/hero.mp4" videoMobile="/assets/ads/hero-mobile.mp4" posterImage="/assets/ads/hero.jpg" />
            </div>

            {/* Stats Section */}
            <section className="w-full py-24 px-4 sm:px-6 md:px-10 lg:px-[4.5em]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                    {stats.map((stat, i) => (
                        <div key={i} className={`text-center p-6 rounded-lg ${isDayTime ? 'bg-gray-100' : 'bg-slate-800'}`}>
                            <h3 className="text-3xl font-bold text-blue-500 mb-2">
                                <CountUp end={stat.value} suffix={stat.suffix} duration={2.75} />
                            </h3>
                            <p className={`text-sm font-medium ${isDayTime ? 'text-gray-600' : 'text-gray-400'}`}>{stat.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Comprehensive Maritime Solutions Accordion */}
            <section className="w-full py-24 px-4 sm:px-6 md:px-10 lg:px-[4.5em]" ref={sectionRef}>
                <FxReveal>
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
                        <div>
                            <FxChip day={isDayTime}>MARITIME SOLUTIONS SUITE</FxChip>
                            <h2 className={`text-4xl md:text-5xl font-bold mt-6 ${isDayTime ? 'text-black' : 'text-white'}`}>
                                Comprehensive Maritime Technology <span className="gx-gradient-text">Solutions</span>
                            </h2>
                        </div>
                    </div>
                </FxReveal>

                <div className="space-y-6 mt-12">
                    {solutions.map((solution, idx) => (
                        <FxReveal key={solution.number} delay={idx * 0.05}>
                            <div
                                id={solution.heading.replace(/\s+/g, '_').toUpperCase()}
                                onClick={() => handleClick(idx)}
                                className={`cursor-pointer p-8 rounded-2xl border-2 transition-all duration-300 ${
                                    activeAcc === idx
                                        ? isDayTime
                                            ? 'border-cyan-400 bg-cyan-50 shadow-lg shadow-cyan-400/30'
                                            : 'border-cyan-400 bg-slate-900/80 shadow-lg shadow-cyan-400/20'
                                        : isDayTime
                                        ? 'border-gray-200 hover:border-cyan-400/50 bg-gray-50'
                                        : 'border-slate-700 hover:border-cyan-400/50 bg-slate-900/30'
                                }`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-6">
                                        <span className={`text-4xl font-black ${isDayTime ? 'text-gray-300' : 'text-cyan-400/40'}`}>
                                            {solution.number}
                                        </span>
                                        <div>
                                            <h3 className={`text-2xl font-bold mb-2 ${isDayTime ? 'text-black' : 'text-cyan-300'}`}>
                                                {solution.title}
                                            </h3>
                                            <p className={`text-sm ${isDayTime ? 'text-gray-600' : 'text-gray-400'}`}>
                                                Click to explore comprehensive capabilities
                                            </p>
                                        </div>
                                    </div>
                                    <motion.div
                                        animate={{rotate: activeAcc === idx ? 180 : 0}}
                                        transition={{duration: 0.3}}
                                        className={`text-2xl ${isDayTime ? 'text-cyan-500' : 'text-cyan-400'}`}
                                    >
                                        ▼
                                    </motion.div>
                                </div>

                                <AnimatePresence>
                                    {activeAcc === idx && (
                                        <motion.div
                                            initial={{opacity: 0, height: 0}}
                                            animate={{opacity: 1, height: 'auto'}}
                                            exit={{opacity: 0, height: 0}}
                                            transition={{duration: 0.3}}
                                            className="mt-8 pt-8 border-t border-gray-200/50"
                                        >
                                            <h4 className={`text-lg font-bold mb-4 ${isDayTime ? 'text-black' : 'text-white'}`}>
                                                {solution.heading}
                                            </h4>
                                            <div className={`text-base leading-relaxed ${isDayTime ? 'text-gray-700' : 'text-gray-300'}`}>
                                                {solution.description}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </FxReveal>
                    ))}
                </div>
            </section>

            {/* Implementation Process Section */}
            <section className={`w-full py-24 px-4 sm:px-6 md:px-10 lg:px-[4.5em] ${isBackgroundActive ? (isDayTime ? 'bg-gray-100' : 'bg-slate-900/50') : ''} transition-colors`}>
                <FxReveal>
                    <div className="text-center mb-16">
                        <FxChip day={isDayTime}>IMPLEMENTATION METHODOLOGY</FxChip>
                        <h2 className={`text-4xl md:text-5xl font-bold mt-6 mb-4 ${isDayTime ? 'text-black' : 'text-white'}`}>
                            Maritime Digital Transformation <span className="gx-gradient-text">Journey</span>
                        </h2>
                        <p className={`text-lg max-w-3xl mx-auto ${isDayTime ? 'text-gray-600' : 'text-gray-400'}`}>
                            Our proven four-phase methodology ensures successful maritime technology implementations with measurable business outcomes at every stage.
                        </p>
                    </div>
                </FxReveal>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
                    {processSteps.map((step, idx) => (
                        <FxReveal key={step.title} delay={idx * 0.1}>
                            <div
                                onClick={() => setActiveStep(idx)}
                                className={`cursor-pointer p-8 rounded-xl border-2 transition-all duration-300 h-full ${
                                    activeStep === idx
                                        ? isDayTime
                                            ? 'border-cyan-400 bg-cyan-50/80'
                                            : 'border-cyan-400 bg-cyan-400/10'
                                        : isDayTime
                                        ? 'border-gray-200 hover:border-cyan-300 bg-gray-50'
                                        : 'border-slate-700 hover:border-cyan-400/50 bg-slate-900/20'
                                }`}
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <span className={`text-3xl font-black ${isDayTime ? 'text-gray-200' : 'text-cyan-400/30'}`}>
                                        {String(idx + 1).padStart(2, '0')}
                                    </span>
                                    <h3 className={`text-xl font-bold ${isDayTime ? 'text-black' : 'text-white'}`}>
                                        {step.title}
                                    </h3>
                                </div>

                                <AnimatePresence>
                                    {activeStep === idx && (
                                        <motion.div
                                            initial={{opacity: 0}}
                                            animate={{opacity: 1}}
                                            exit={{opacity: 0}}
                                            transition={{duration: 0.2}}
                                        >
                                            <ul className={`space-y-3 text-sm ${isDayTime ? 'text-gray-700' : 'text-gray-300'}`}>
                                                {step.content.map((item, i) => (
                                                    <li key={i} className="flex gap-3">
                                                        <span className="text-cyan-400 font-bold">•</span>
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </FxReveal>
                    ))}
                </div>
            </section>

            {/* Comprehensive Capabilities Section */}
            <section className="w-full py-24 px-4 sm:px-6 md:px-10 lg:px-[4.5em]">
                <FxReveal>
                    <div className="text-center mb-16">
                        <FxChip day={isDayTime}>ENTERPRISE CAPABILITIES</FxChip>
                        <h2 className={`text-4xl md:text-5xl font-bold mt-6 ${isDayTime ? 'text-black' : 'text-white'}`}>
                            Complete Maritime Technology <span className="gx-gradient-text">Stack</span>
                        </h2>
                    </div>
                </FxReveal>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                    {[
                        {
                            title: 'Vessel Operations',
                            items: ['Real-time telemetry monitoring', 'Predictive maintenance systems', 'Fuel optimization', 'Performance analytics', 'AIS integration', 'Equipment tracking']
                        },
                        {
                            title: 'Terminal Management',
                            items: ['Yard optimization', 'Crane scheduling', 'Equipment allocation', 'Berth management', 'Gate automation', 'Throughput optimization']
                        },
                        {
                            title: 'Cargo Management',
                            items: ['End-to-end tracking', 'Customs integration', 'Digital documentation', 'Blockchain verification', 'Exception alerting', 'Release protocols']
                        },
                        {
                            title: 'Crew Administration',
                            items: ['Personnel management', 'Certification tracking', 'Scheduling optimization', 'Training programs', 'Compliance monitoring', 'Welfare support']
                        },
                        {
                            title: 'Supply Chain',
                            items: ['Multi-modal integration', 'Demand forecasting', 'Route optimization', 'Inventory management', 'Logistics coordination', 'Partner networks']
                        },
                        {
                            title: 'Analytics & Reporting',
                            items: ['Real-time dashboards', 'Predictive models', 'Cost analysis', 'Performance metrics', 'Compliance reports', 'Custom analytics']
                        }
                    ].map((capability, i) => (
                        <FxReveal key={i} delay={i * 0.08}>
                            <div className={`p-8 rounded-xl border-2 ${isDayTime ? 'border-gray-200 bg-gray-50' : 'border-slate-700 bg-slate-900/30'}`}>
                                <h3 className={`text-xl font-bold mb-6 ${isDayTime ? 'text-cyan-600' : 'text-cyan-300'}`}>
                                    {capability.title}
                                </h3>
                                <ul className={`space-y-3 ${isDayTime ? 'text-gray-700' : 'text-gray-300'}`}>
                                    {capability.items.map((item, j) => (
                                        <li key={j} className="flex items-start gap-3">
                                            <span className="text-cyan-400 mt-1 flex-shrink-0">✓</span>
                                            <span className="text-sm">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </FxReveal>
                    ))}
                </div>
            </section>

            {/* Premium CTA Section */}
            <section className={`w-full py-32 px-4 sm:px-6 md:px-10 lg:px-[4.5em] text-center ${isDayTime ? 'bg-gradient-to-r from-cyan-50 via-blue-50 to-cyan-50' : 'bg-gradient-to-r from-slate-900/80 via-slate-900/60 to-slate-900/80'} border-t-2 ${isDayTime ? 'border-gray-200' : 'border-slate-700/50'}`}>
                <FxReveal>
                    <h2 className={`text-5xl font-bold mb-6 ${isDayTime ? 'text-black' : 'text-white'}`}>
                        Transform Your Maritime Operations
                    </h2>
                    <p className={`text-xl max-w-2xl mx-auto mb-10 ${isDayTime ? 'text-gray-600' : 'text-gray-400'}`}>
                        Join leading global maritime companies leveraging advanced digital solutions to optimize operations, reduce costs, and achieve operational excellence.
                    </p>
                </FxReveal>

                <FxReveal delay={0.15}>
                    <div className="flex flex-wrap justify-center gap-6">
                        <Link href="/contact">
                            <button className="px-10 py-4 bg-cyan-500 text-white font-bold rounded-full hover:bg-cyan-600 transition-all duration-300 shadow-lg hover:shadow-xl text-lg">
                                Schedule Maritime Consultation →
                            </button>
                        </Link>
                        <Link href="/portfolio">
                            <button className={`px-10 py-4 font-bold rounded-full transition-all duration-300 text-lg border-2 ${isDayTime ? 'border-cyan-400 text-cyan-600 hover:bg-cyan-50' : 'border-cyan-400 text-cyan-300 hover:bg-cyan-400/10'}`}>
                                View Maritime Case Studies
                            </button>
                        </Link>
                    </div>
                </FxReveal>
            </section>
        </div>
    );
};

export default MaritimePortManagement;
