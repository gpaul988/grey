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

const ErpDevelopment = () => {
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
            "CES",
            "EIM",
            "CED",
            "EMO",
            "ISE",
            "ESM"
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
            title: "Healthcare ERP",
            heading: "Healthcare ERP",
            description: (
                <>
                    ERP software development for hospitals and medical facilities addresses the complex operational
                    demands inherent in healthcare delivery, where diverse professional staff, multifaceted clinical
                    workflows, and stringent regulatory requirements converge. Healthcare organizations manage extensive
                    operations spanning patient care delivery, clinical documentation, diagnostic services,
                    pharmaceutical management, medical equipment tracking, patient billing, insurance claims processing,
                    regulatory compliance, and financial administration -all requiring seamless coordination and data
                    integration. As a specialized ERP development company, we engineer robust, comprehensive ERP systems
                    specifically designed for healthcare environments, addressing the unique challenges of medical
                    operations, patient safety protocols, and compliance with HIPAA and other regulatory frameworks. Our
                    healthcare ERP solutions streamline complex workflows, eliminate operational inefficiencies,
                    automate critical reporting processes, and provide real-time visibility into clinical, financial,
                    and operational performance metrics. These integrated platforms connect disparate departments and
                    functions -from emergency services and surgical units to pharmacy, laboratory, billing, and
                    administration -ensuring accurate data flow, reducing administrative burden, and enabling healthcare
                    professionals to focus on patient care rather than manual processes. By delivering customized ERP
                    systems that align with healthcare-specific requirements, we empower medical facilities to enhance
                    operational efficiency, improve financial performance, ensure regulatory accountability, strengthen
                    patient outcomes, and maintain the highest standards of care delivery in increasingly complex
                    healthcare environments.
                </>
            )
        },
        {
            number: "02",
            title: "Real Estate ERP",
            heading: "Real Estate ERP",
            description: (
                <>
                    We architect specialized ERP solutions for real estate developers, property management companies,
                    commercial real estate firms, and real estate investment trusts, integrating property portfolio
                    management, lease administration, tenant relationship management, facilities maintenance, financial
                    accounting, and property acquisition workflows. Our real estate ERP platforms provide comprehensive
                    visibility across property portfolios with detailed financial performance tracking by property,
                    unit, or tenant, automated lease management with critical date tracking for renewals and
                    escalations, tenant billing and accounts receivable with automated rent collection and late fee
                    assessment, maintenance request tracking with work order management and vendor coordination,
                    budgeting and forecasting at property and portfolio levels, and capital expenditure tracking for
                    renovation and improvement projects. Advanced capabilities include automated CAM reconciliation for
                    commercial properties, vacancy analysis and lease-up tracking, prospect and showing management for
                    leasing operations, document management for lease agreements and property records, compliance
                    tracking for property inspections and regulatory requirements, tenant portal access for rent payment
                    and maintenance requests, financial consolidation across multiple properties and entities, and
                    sophisticated reporting for investors and stakeholders. These systems streamline property
                    operations, improve tenant satisfaction and retention, optimize occupancy rates, enhance cash flow
                    management, reduce operational costs through efficient vendor management, provide actionable
                    insights into property performance and market trends, and support strategic decision-making for
                    acquisitions, dispositions, and portfolio optimization in competitive real estate markets.
                </>
            )
        },
        {
            number: "03",
            title: "Distribution & Logistics ERP",
            heading: "Distribution & Logistics ERP",
            description: (
                <>

                    Our distribution and logistics ERP platforms are engineered to optimize warehouse operations,
                    transportation management, order fulfillment processes, freight management, and end-to-end supply
                    chain coordination for distributors, third-party logistics providers, and logistics-intensive
                    businesses. We integrate advanced warehouse management with directed picking and putaway, inventory
                    management with lot and serial number tracking, demand planning with seasonal forecasting, route
                    optimization for delivery efficiency, carrier management and rate shopping, and real-time shipment
                    tracking with customer visibility portals. Sophisticated features include automated picking and
                    packing with barcode and RFID scanning, cross-docking operations to minimize handling,
                    multi-warehouse management with transfer orders and inter-warehouse visibility, freight audit and
                    payment with carrier invoice reconciliation, third-party logistics integration for outsourced
                    fulfillment, parcel and LTL shipping integration with major carriers, landed cost calculation for
                    international shipments, and returns management with reverse logistics workflows. Our solutions
                    enhance operational efficiency by reducing order cycle times, minimize shipping costs through
                    carrier optimization and consolidated shipments, improve inventory accuracy through cycle counting
                    and perpetual inventory management, reduce warehouse labor costs through optimized workflows,
                    increase order accuracy and reduce picking errors, and dramatically improve customer satisfaction
                    through accurate order fulfillment, on-time deliveries, real-time tracking visibility, and seamless
                    returns processing in today&#39;s demanding distribution and logistics environment.
                </>
            )
        },
        {
            number: "04",
            title: "Construction & Engineering ERP",
            heading: "Construction & Engineering ERP",
            description: (
                <>
                    We provide specialized ERP solutions tailored for construction companies, engineering firms, and
                    project-based organizations, seamlessly integrating project management, resource scheduling and
                    allocation, detailed cost estimation, contract management and change orders, subcontractor
                    coordination, equipment tracking and maintenance, and field operations management. Our construction
                    ERP systems deliver real-time project visibility across multiple concurrent projects, comprehensive
                    budget tracking with commitment accounting, equipment utilization and maintenance scheduling,
                    subcontractor performance monitoring, document control and RFI management, and mobile field access
                    for time tracking, daily reports, and safety inspections. Advanced capabilities include detailed job
                    costing with cost-to-complete projections, change order management with approval workflows, progress
                    billing and AIA-format invoicing, certified payroll reporting for prevailing wage compliance, safety
                    compliance tracking and incident management, project scheduling integration with critical path
                    analysis, procurement and submittal tracking, and retention management. These systems improve
                    project delivery timelines, enhance profitability through better cost control and forecasting,
                    facilitate collaboration among general contractors, subcontractors, architects, and owners, support
                    compliance with OSHA safety requirements and other construction regulations, and provide executive
                    visibility into project pipeline, backlog, and financial performance across the entire portfolio of
                    construction and engineering projects.
                </>
            )
        },
        {
            number: "05",
            title: "Financial Services ERP",
            heading: "Financial Services ERP",
            description: (
                <>
                    Our financial services ERP platforms deliver enterprise-grade solutions with robust audit trail
                    capabilities, automated regulatory reporting, comprehensive risk management frameworks, and built-in
                    compliance with Sarbanes-Oxley, Basel III capital requirements, MiFID II transparency rules,
                    Dodd-Frank regulations, and evolving banking compliance standards. We integrate core banking
                    operations, wealth and asset management, loan origination and servicing, customer onboarding with
                    KYC/AML verification, treasury management, and advanced financial analytics into secure, scalable
                    systems designed for banks, credit unions, investment firms, and insurance companies. Sophisticated
                    features include real-time fraud detection using machine learning algorithms, credit risk assessment
                    and portfolio risk analytics, investment portfolio management with performance attribution,
                    automated regulatory reporting to SEC, FINRA, and other regulatory bodies, general ledger with
                    multi-currency and multi-entity consolidation, and real-time financial reporting with customizable
                    dashboards. Our solutions enable financial institutions to maintain strict regulatory compliance
                    while reducing operational costs, improving risk management capabilities, enhancing customer service
                    through faster processing times, supporting digital banking transformation, and adapting quickly to
                    changing regulatory landscapes in highly regulated financial markets.
                </>
            )
        },
        {
            number: "06",
            title: "Retail & E-Commerce ERP",
            heading: "Retail & E-Commerce ERP",
            description: (
                <>
                    Our retail ERP platforms create a unified commerce ecosystem by integrating point-of-sale systems,
                    omnichannel inventory management, customer relationship management, merchandising analytics, and
                    supplier collaboration tools into a cohesive operational framework. We enable seamless customer
                    experiences across brick-and-mortar stores, e-commerce websites, mobile applications, and
                    marketplace integrations while providing real-time inventory visibility across all channels,
                    automated replenishment based on demand patterns, intelligent demand forecasting using historical
                    sales data, dynamic pricing optimization, and sophisticated customer loyalty program management with
                    personalized promotions. Advanced analytics capabilities deliver actionable insights into sales
                    trends, customer purchasing behavior, product performance metrics, store-level profitability, and
                    seasonal demand variations. Our solutions support omnichannel fulfillment strategies including
                    buy-online-pickup-in-store, ship-from-store, and endless aisle capabilities, while managing size and
                    color matrix inventory, vendor consignment arrangements, promotional campaigns, and markdown
                    optimization to maximize revenue growth, improve inventory turnover, enhance customer satisfaction,
                    and maintain competitive advantage in rapidly evolving retail landscapes.
                </>
            )
        },
        {
            number: "07",
            title: "Manufacturing ERP",
            heading: "Manufacturing ERP",
            description: (
                <>
                    We deliver comprehensive ERP solutions specifically engineered for manufacturing organizations,
                    seamlessly integrating materials requirement planning, production scheduling, shop floor control,
                    quality management systems, and preventive equipment maintenance into a unified operational
                    platform. Our manufacturing ERP systems provide real-time visibility into production workflows,
                    work-in-progress inventory, raw material availability, and complete supply chain operations while
                    optimizing resource allocation, minimizing material waste, reducing production downtime, and
                    improving on-time delivery performance. Advanced capabilities include multi-level bill of materials
                    management, work order tracking with labor and machine time capture, capacity planning and finite
                    scheduling, automated quality inspections with statistical process control, and predictive
                    maintenance powered by IoT sensor integration. These solutions enhance operational efficiency across
                    discrete and process manufacturing environments, support lean manufacturing principles, enable
                    just-in-time production strategies, facilitate compliance with industry standards including ISO 9001
                    and AS9100, and provide comprehensive cost tracking for accurate job costing and profitability
                    analysis across product lines and manufacturing facilities.
                </>
            )
        },
        {
            number: "08",
            title: "Hospitality & Lifestyle ERP",
            heading: "Hospitality & Lifestyle ERP",
            description: (
                <>
                    Our hospitality ERP platforms are designed for hotels, resorts, restaurant chains, spas, fitness
                    centers, country clubs, and lifestyle brands, seamlessly integrating property management systems,
                    point-of-sale operations, guest relationship management, reservation systems, housekeeping
                    operations, food and beverage management, event coordination, and enterprise financial management.
                    We deliver comprehensive solutions that enhance guest experiences while optimizing operational
                    efficiency across single properties or multi-location hospitality enterprises, managing room
                    inventory and dynamic pricing, coordinating housekeeping and maintenance operations, tracking guest
                    preferences and loyalty program engagement, managing food and beverage inventory with recipe
                    costing, coordinating banquet and event operations, and providing real-time visibility into property
                    performance and guest satisfaction metrics. Advanced features include channel management for online
                    travel agencies and booking platforms, revenue management with demand-based pricing optimization,
                    guest profile management with preference tracking and personalized service delivery, mobile check-in
                    and digital key integration, spa and amenity scheduling with therapist and instructor management,
                    catering and event management with floor plan visualization and contract management, food and
                    beverage inventory with supplier management and waste tracking, staff scheduling optimized for
                    occupancy forecasts and service standards, quality assurance and inspection workflows, maintenance
                    management with preventive maintenance scheduling, energy management and sustainability tracking,
                    guest feedback and reputation management integration with review platforms, loyalty program
                    management with points accrual and redemption, and consolidated reporting across properties for
                    multi-unit operations. These systems elevate guest satisfaction through personalized service and
                    seamless experiences, optimize revenue through dynamic pricing and yield management, reduce
                    operational costs through efficient resource allocation, improve staff productivity and service
                    consistency, and provide hospitality executives with the insights needed to drive profitability and
                    maintain competitive positioning in the experience-driven hospitality and lifestyle industries.
                </>
            )
        },
        {
            number: "09",
            title: "Media & Entertainment ERP",
            heading: "Media & Entertainment ERP",
            description: (
                <>
                    We develop specialized ERP platforms for media companies, entertainment studios, broadcasting
                    networks, music production houses, gaming studios, and digital content creators, integrating
                    project-based financial management, rights and royalty management, production planning and
                    scheduling, asset management, and creative workflow coordination. Our media and entertainment ERP
                    solutions manage the complex financial structures of film, television, music, and digital content
                    production including multi-project accounting, investor and co-production partner management, union
                    and guild compliance, residuals and participation&#39;s calculations, and international tax
                    incentive
                    tracking. Sophisticated capabilities include production budgeting and cost tracking against shooting
                    schedules, talent contract management with option tracking and obligation scheduling, rights
                    acquisition and licensing management with territory and media restrictions, royalty calculations and
                    payment processing for artists, writers, and performers, digital asset management with metadata
                    tagging and version control, distribution tracking across theatrical, streaming, broadcast, and home
                    entertainment channels, media library management with content monetization optimization, advertiser
                    relationship management for broadcasting operations, audience analytics and viewership tracking,
                    content planning and programming schedules, and financial reporting tailored to entertainment
                    industry standards including production accounting practices and revenue recognition for content
                    licensing. These systems provide essential financial controls for high-budget productions, ensure
                    accurate royalty payments and rights management, optimize content monetization across distribution
                    channels, support creative collaboration while maintaining budget discipline, and deliver the
                    specialized financial and operational capabilities required in the dynamic, project-intensive media
                    and entertainment industry.
                </>
            )
        },
        {
            number: "10",
            title: "Education ERP",
            heading: "Education ERP",
            description: (
                <>

                    Our education ERP solutions serve K-12 schools, higher education institutions, vocational training
                    centers, and educational service providers by integrating student information systems, learning
                    management platforms, admissions and enrollment management, financial aid administration, academic
                    scheduling, and institutional finance operations. We deliver comprehensive platforms that manage the
                    complete student lifecycle from inquiry and application through enrollment, academic progress,
                    graduation, and alumni engagement while supporting faculty management, curriculum planning,
                    accreditation compliance, and institutional effectiveness reporting. Advanced features include
                    online application portals with document submission and status tracking, automated enrollment
                    workflows with prerequisite checking and waitlist management, grade management with transcript
                    generation and academic standing calculations, attendance tracking with early alert systems for
                    at-risk students, financial aid packaging and disbursement with federal compliance reporting,
                    tuition billing with flexible payment plans and scholarship management, course scheduling with room
                    and resource optimization, faculty workload tracking and performance evaluation, learning outcome
                    assessment and program review workflows, library management integration, student conduct and
                    judicial affairs tracking, housing and residential life management, career services and job
                    placement tracking, alumni relations and fundraising integration, and comprehensive reporting for
                    accreditation bodies, state agencies, and federal IPEDS submissions. Our education ERP systems
                    improve operational efficiency, enhance student success through better support services, streamline
                    administrative processes, ensure regulatory compliance with federal and state education
                    requirements, support data-driven decision making, and enable institutions to focus resources on
                    their core educational mission.
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

    // ERP Watermark
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
            title: "Plan",
            content: [
                "Our engagement commences with a comprehensive organizational analysis, where we systematically examine the multifaceted dimensions of your enterprise ecosystem. Our specialized ERP development team conducts an in-depth evaluation of your operational infrastructure, carefully analyzing your existing revenue generation frameworks, performance benchmarks, scalability trajectories, and long-term strategic vision. This rigorous discovery phase enables us to architect an ERP solution that is precisely calibrated to address your organization&#39;s distinct operational challenges and business imperatives.",
                "Following this thorough assessment, we develop a meticulously structured ERP implementation roadmap that serves as the blueprint for your digital transformation initiative. This strategic framework is deliberately engineered to align with your corporate objectives, ensuring seamless integration with your current business processes while positioning your organization for sustainable competitive advantage. Our methodology emphasizes stakeholder collaboration, risk mitigation, and measurable outcomes, guaranteeing that every component of the implementation strategy directly contributes to your overarching business goals and delivers tangible value across all operational dimensions."
            ]
        },
        {
            title: "Build",
            content: [
                "Our creative design team translates the strategic roadmap into intuitive user interface and user experience architectures that prioritize operational efficiency and user adoption. Simultaneously, our ERP development specialists leverage these specifications to engineer a robust technical infrastructure, constructing both sophisticated front-end interfaces and scalable back-end systems that ensure optimal performance, data integrity, and system reliability across your enterprise environment.",
                "During this critical implementation phase, we execute comprehensive system integration protocols, including strategic API deployment, enterprise data center connectivity, and the seamless incorporation of your existing analytical dashboards and reporting tools. This holistic integration approach ensures data consistency, eliminates operational silos, and creates a unified digital ecosystem that enhances cross-functional collaboration while maintaining the flexibility to adapt to your evolving business requirements."
            ]
        },
        {
            title: "Transform",
            content: [
                "Upon completion of rigorous quality assurance protocols encompassing both technical validation and user experience testing, our deployment specialists orchestrate the strategic integration of your new ERP solutions into your established operational frameworks. This carefully managed transition ensures minimal disruption to business continuity while maximizing the immediate value realization of newly implemented functionalities and system capabilities across all organizational touchpoints.",
                " Concurrently, we establish comprehensive data governance infrastructures that encompass robust collection mechanisms, advanced analytical frameworks, and intelligent reporting systems designed to drive informed decision-making. Our team provides extensive support and enablement to internal stakeholders, implementing role-based access controls, delivering targeted training programs, and ensuring proper system administration protocols are in place. This holistic approach guarantees that your organization possesses both the technical infrastructure and the human capital proficiency necessary to leverage your ERP investment for sustained competitive advantage and operational excellence."
            ]
        }
    ];

    return (
        <div className={`${isDayTime ? 'bg-white' : 'bg-black'} min-h-screen`}>

            {/* Unified Futuristic ERP Hero - Background Image/Video with overlay */}
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
                    poster="/assets/erp/hero.jpg"
                >
                    <source src="/assets/erp/hero.mp4" type="video/mp4"/>
                </video>

                {/* Fallback Image Background for Mobile and Video Fallback */}
                <Image
                    src="/assets/erp/hero.jpg"
                    alt="ERP Development Hero"
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
                                    className="text-cyan-400 text-[0.7em] lg:text-[0.82em] uppercase tracking-[0.22em] font-[600]">Enterprise Resource Planning</span>
                            </div>

                            {/* Main Heading with Gradient */}
                            <h1 className="text-white text-[2em] lg:text-[4.5em] font-[700] leading-[1.08] tracking-tight mb-6 lg:mb-8">
                                Enterprise Integration &amp; <span className="gx-gradient-text">Digital Transformation</span>
                            </h1>

                            {/* Description */}
                            <p className="text-white/70 text-[0.85em] lg:text-[1.08em] leading-[1.65] mb-8 lg:mb-10 font-[300]">
                                End-to-end ERP solutions that consolidate finance, supply chain, HR, and operations into
                                unified systems. 150+ enterprises transformed. 40% process efficiency gains. 99.9% uptime.
                                10M+ daily transactions. Real-time dashboards drive measurable ROI.
                            </p>

                            {/* Key Capabilities Pills */}
                            <div className="flex flex-wrap gap-2 mb-10 lg:mb-12">
                                {["Finance", "Supply Chain", "HR", "Manufacturing", "Inventory", "Analytics"].map((badge) => (
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
                                        <span className="relative">Schedule Consultation →</span>
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
                                    {label: 'Enterprises Served', value: '150+'},
                                    {label: 'Years of Expertise', value: '10+'},
                                    {label: 'Process Efficiency', value: '40%'},
                                    {label: 'System Uptime', value: '99.9%'}
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
                            {label: 'Enterprises', value: '150+'},
                            {label: 'Experts', value: '10+'},
                            {label: 'Efficiency', value: '40%'}
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
                        <FxChip day={!isBackgroundActive ? !isDayTime : isDayTime}>ENTERPRISE TRANSFORMATION</FxChip>
                    </div>

                    <div className="lg:-ml-[19em]">
                        <FxReveal>
                            <h3 className="lg:text-[3.5em] md:text-[3em] text-[2em] font-[700] tracking-tight leading-[1.15] mt-4">
                                Enterprise ERP Built for <span className="gx-gradient-text">Scale & ROI</span>
                            </h3>
                        </FxReveal>

                        <FxReveal delay={0.08}>
                            <div
                                className="grid lg:grid-cols-2 grid-cols-1 gap-4 mt-4 font-[300] text-justify text-[0.95em] md:text-[1.05em] leading-relaxed">
                                <div>
                                    <p>We architect enterprise ERP solutions that unify finance, HR, supply chain, and
                                        operations into real-time integrated systems. Our platforms handle 10M+ daily transactions,
                                        achieve 99.9% uptime, and deliver 40% process efficiency gains. From SAP and Oracle to
                                        custom-built solutions, our enterprise experts drive measurable transformation across
                                        150+ organizations globally.</p>
                                </div>
                                <div>
                                    <p>Implementation excellence combined with post-go-live support ensures sustained adoption
                                        and ROI realization. Our methodology emphasizes change management, user enablement, and
                                        ongoing optimization. Clients report 300%+ ROI within 18 months through automation,
                                        elimination of manual processes, improved data accuracy, and informed decision-making
                                        powered by real-time dashboards and advanced analytics.</p>
                                    <div className="flex flex-wrap gap-3 mt-4">
                                        {['Finance Automation', 'Supply Chain Optimization', 'Workforce Planning', 'Real-Time Analytics', 'Integration Excellence', 'Change Management'].map((p) => (
                                            <span key={p} className="gx-data-pill">{p}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </FxReveal>

                        <FxReveal delay={0.16}>
                            <div className="mt-12 pt-8 border-t border-white/10">
                                <h4 className="text-[1.2em] font-[600] tracking-tight mb-6">Comprehensive ERP
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
                                                        <span className="text-cyan-400 font-bold mt-0.5">•</span>
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

            {/* ERP Development services overview - Enhanced with FxStickyScrollSection */}
            <FxStickyScrollSection
                day={isDayTime}
                heading={<>ERP Development<br/>services overview</>}
                intro="Our enterprise resource planning development services are engineered to transform organizational operations through intelligent system integration, process automation, and intelligent workflows. We combine deep technical expertise, cloud-native architecture, and industry best practices to deliver custom ERP solutions that drive operational excellence, ensure regulatory compliance, and position your enterprise for sustained competitive advantage in dynamic markets."
                navLabel="ERP Solutions"
                activeId={activeId}
                onNavClickAction={scrollToSection}
                items={[
                    {
                        id: "01",
                        title: "Custom ERP Solutions & Development",
                        target: "CES",
                        tags: ["System Architecture", "Integration", "Customization"],
                        body: (
                            <div>
                                <p>
                                    We design and develop fully customized enterprise resource planning systems
                                    engineered specifically around your unique organizational structure, operational
                                    workflows, industry regulations, and strategic business objectives. Our custom ERP
                                    solutions provide comprehensive integration of all critical business
                                    functions -including financial management systems, procurement automation, inventory
                                    control optimization, supply chain operations, human capital management, customer
                                    relationship systems, and advanced business intelligence -into a unified, centralized
                                    platform. By eliminating operational silos and creating a single source of truth for
                                    enterprise data, we enable real-time visibility across all departments, facilitate
                                    data-driven decision-making at every organizational level, improve cross-functional
                                    collaboration, and establish scalable digital infrastructure that evolves alongside
                                    your business growth trajectory and changing market demands.
                                </p>
                                <p className="mt-3">
                                    Our development process encompasses detailed requirements analysis, system
                                    architecture design, database optimization, API development, user interface
                                    creation, security implementation, and comprehensive testing. We ensure your ERP
                                    solution delivers measurable business value through improved efficiency, reduced
                                    operational costs, enhanced data accuracy, and accelerated decision-making cycles.
                                </p>
                            </div>
                        ),
                    },
                    {
                        id: "02",
                        title: "ERP Integration & Legacy System Migration",
                        target: "EIM",
                        tags: ["System Integration", "Data Migration", "Legacy Modernization"],
                        body: (
                            <div>
                                <p>
                                    Our experienced integration specialists deliver comprehensive ERP implementation
                                    services that seamlessly connect your enterprise resource planning platform with
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
                        title: "Cloud-Native ERP Architecture & Development",
                        target: "CED",
                        tags: ["Cloud Infrastructure", "Scalability", "Security Compliance"],
                        body: (
                            <div>
                                <p>
                                    We architect and deploy sophisticated cloud-native ERP solutions leveraging
                                    industry-leading infrastructure providers including Amazon Web Services (AWS),
                                    Microsoft Azure, Google Cloud Platform (GCP), and hybrid cloud configurations
                                    tailored to your specific security, compliance, and performance requirements. Our
                                    cloud ERP implementations deliver exceptional scalability to accommodate business
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
                                    regulatory frameworks. Our cloud-first approach ensures your ERP system remains
                                    modern, secure, and competitive while providing unlimited growth potential.
                                </p>
                            </div>
                        ),
                    },
                    {
                        id: "04",
                        title: "ERP Modernization, AI Integration & Optimization",
                        target: "EMO",
                        tags: ["Legacy Transformation", "AI/ML Integration", "Performance Optimization"],
                        body: (
                            <div>
                                <p>
                                    We transform legacy ERP infrastructure through comprehensive modernization
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
                                    deliver measurable return on investment, and extend the lifecycle of your ERP
                                    investment while positioning your systems as competitive advantages.
                                </p>
                            </div>
                        ),
                    },
                    {
                        id: "05",
                        title: "Industry-Specific ERP Solutions",
                        target: "ISE",
                        tags: ["Vertical Solutions", "Compliance", "Best Practices"],
                        body: (
                            <div>
                                <p>
                                    We develop highly specialized ERP solutions meticulously designed to address the
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
                                    knowledge with technical excellence to ensure your ERP system becomes a competitive
                                    differentiator.
                                </p>
                            </div>
                        ),
                    },
                    {
                        id: "06",
                        title: "ERP Support, Maintenance & Continuous Optimization",
                        target: "ESM",
                        tags: ["Support Services", "Performance Tuning", "System Evolution"],
                        body: (
                            <div>
                                <p>
                                    We provide comprehensive ERP support and maintenance services including 24/7/365
                                    technical support, proactive system monitoring, performance optimization, security
                                    patching, data backup management, disaster recovery testing, and continuous system
                                    evolution. Our dedicated support teams ensure your ERP platform operates at peak
                                    performance, addresses emerging challenges rapidly, adapts to changing business
                                    requirements, and delivers consistent value to your organization. We conduct regular
                                    system health checks, optimization reviews, user training programs, and strategic
                                    consultations to maximize your ERP investment.
                                </p>
                                <p className="mt-3">
                                    Our proactive maintenance approach prevents issues before they impact operations,
                                    optimizes system performance through database tuning and infrastructure scaling,
                                    ensures security through continuous vulnerability assessments and patching, and
                                    enables business evolution through system upgrades and feature enhancements. With
                                    our support, your ERP system remains a reliable foundation for business operations
                                    and continuous competitive advantage.
                                </p>
                            </div>
                        ),
                    },
                ]}
            />

            {/* Service item sections with IDs for scroll tracking */}
            <div id="CES" className="scroll-mt-20"/>
            <div id="EIM" className="scroll-mt-20"/>
            <div id="CED" className="scroll-mt-20"/>
            <div id="EMO" className="scroll-mt-20"/>
            <div id="ISE" className="scroll-mt-20"/>
            <div id="ESM" className="scroll-mt-20"/>

            {/* ERP Solutions For Diverse Industries */}
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
                                <span className={`text-[#0ef0dd] drop-shadow-lg`}>Enterprise-Grade ERP</span> <br
                                className={'lg:block md:block hidden'}/>Solutions Engineered for <span
                                className={`text-[#06b6d4] drop-shadow-lg`}>Global Scale & Compliance</span>
                            </h2>
                            <p className={`text-[0.9em] font-[400] leading-[1.7] mb-4 ${isDayTime ? 'text-gray-300' : 'text-gray-700'}`}>
                                Transform your entire business infrastructure with AI-powered intelligent automation and
                                real-time visibility across all enterprise operations
                            </p>
                            <div className={`flex gap-2 mt-5 flex-wrap`}>
                                <span
                                    className={`text-[0.75em] px-4 py-2 rounded-full border font-[600] transition-all hover:scale-110 ${isDayTime ? 'border-[#0ef0dd]/60 bg-[#0ef0dd]/20 text-[#0ef0dd]' : 'border-[#0ef0dd]/40 bg-[#0ef0dd]/15 text-[#0ef0dd]'}`}>🏢 Multi-Industry Support</span>
                                <span
                                    className={`text-[0.75em] px-4 py-2 rounded-full border font-[600] transition-all hover:scale-110 ${isDayTime ? 'border-[#06b6d4]/60 bg-[#06b6d4]/20 text-[#06b6d4]' : 'border-[#06b6d4]/40 bg-[#06b6d4]/15 text-[#06b6d4]'}`}> - AI & Automation</span>
                                <span
                                    className={`text-[0.75em] px-4 py-2 rounded-full border font-[600] transition-all hover:scale-110 ${isDayTime ? 'border-[#7c3aed]/60 bg-[#7c3aed]/20 text-[#7c3aed]' : 'border-[#7c3aed]/40 bg-[#7c3aed]/15 text-[#7c3aed]'}`}>✅ Regulatory Compliance</span>
                                <span
                                    className={`text-[0.75em] px-4 py-2 rounded-full border font-[600] transition-all hover:scale-110 ${isDayTime ? 'border-[#f59e0b]/60 bg-[#f59e0b]/20 text-[#f59e0b]' : 'border-[#f59e0b]/40 bg-[#f59e0b]/15 text-[#f59e0b]'}`}>☁️ Cloud Native</span>
                                <span
                                    className={`text-[0.75em] px-4 py-2 rounded-full border font-[600] transition-all hover:scale-110 ${isDayTime ? 'border-[#10b981]/60 bg-[#10b981]/20 text-[#10b981]' : 'border-[#10b981]/40 bg-[#10b981]/15 text-[#10b981]'}`}>⚡ 99.9% Uptime SLA</span>
                            </div>
                        </div>
                        <div className='animate-fade-in-delayed'>
                            <p className={`text-[0.92em] font-[400] lg:-mt-[0.2em] rounded-lg leading-[1.85] mb-5 p-5 ${isDayTime ? 'bg-[#0ef0dd]/5 border border-[#0ef0dd]/20' : 'bg-[#0ef0dd]/5 border border-[#0ef0dd]/20'}`}>
                                Our enterprise resource planning solutions represent the apex of modern digital
                                transformation, meticulously engineered to satisfy the most demanding operational
                                requirements across manufacturing, healthcare, retail, logistics, financial services,
                                pharmaceuticals, energy, maritime & port management, and emerging industries. We deliver
                                sophisticated, industry-specific configurations backed by 8+ years of deep domain
                                expertise, ensuring your organization seamlessly navigates intricate regulatory
                                landscapes (GDPR, HIPAA, SOX, FDA, ISO), optimizes mission-critical workflows, and
                                overcomes sector-specific challenges with surgical precision. Our ERP implementations
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
                                    🏆 <strong>Industry-Leading Expertise:</strong> 500+ successful implementations
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
                                                {isDesktop ? '↑' : '→'}
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
                                                            {['⭐ Enterprise', '📈 Scalable', '🧠 Intelligent', '✅ Compliant'][idx] || '🚀 Advanced'}
                                                        </span>
                                                    </div>

                                                    {/* Subheading */}
                                                    <p className={`text-[1em] font-[700] mb-3 ${isDayTime ? 'text-[#06b6d4]' : 'text-[#0284c7]'} tracking-wide`}>
                                                        🎯 Comprehensive ERP solution for enterprise transformation
                                                    </p>
                                                    <div
                                                        className={`w-16 h-1.5 rounded-full mb-7 ${isDayTime ? 'bg-gradient-to-r from-[#0ef0dd] via-[#06b6d4] to-[#7c3aed]' : 'bg-gradient-to-r from-[#0ef0dd] via-[#06b6d4] to-[#7c3aed]'} shadow-lg`}/>

                                                    {/* Main Comprehensive Description */}
                                                    <p className={`text-[0.95em] leading-[1.95] mb-8 ${isDayTime ? 'text-gray-200' : 'text-gray-800'} text-justify font-[500]`}>
                                                        {step.description}
                                                    </p>

                                                    {/* Advanced Capabilities Grid - 4 Columns */}
                                                    <div className='mb-8'>
                                                        <h3 className={`text-[1em] font-[800] mb-5 ${isDayTime ? 'text-gray-100' : 'text-gray-900'} uppercase tracking-wider drop-shadow-md`}>⚙️
                                                            Core Capabilities & Features</h3>
                                                        <div
                                                            className={`grid grid-cols-1 md:grid-cols-2 gap-5 p-6 rounded-2xl border-2 ${isDayTime ? 'bg-[#0E3B46]/30 border-[#0E3B46]/60' : 'bg-gradient-to-br from-[#f0f9ff]/80 to-[#e0f7ff]/60 border-[#bae6fd]/70'} backdrop-blur-sm`}>
                                                            <div
                                                                className={`flex gap-4 p-4 rounded-xl transition-all hover:scale-105 ${isDayTime ? 'bg-[#0E3B46]/20 text-gray-200' : 'bg-white/50 text-gray-900'}`}>
                                                                <span
                                                                    className={`text-2xl font-[800] flex-shrink-0`}>⚡</span>
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
                                                                    className={`text-2xl font-[800] flex-shrink-0`}> -</span>
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
                                                                    className={`text-2xl font-[800] flex-shrink-0`}> - </span>
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
                                                                    className={`text-2xl font-[800] flex-shrink-0`}> - </span>
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
                                                                    className={`text-2xl font-[800] flex-shrink-0`}>📊</span>
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
                                                                    className={`text-2xl font-[800] flex-shrink-0`}>🌐</span>
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
                                                                    className={`text-2xl font-[800] flex-shrink-0`}>⚙️</span>
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
                                                        <h3 className={`text-[1em] font-[800] mb-5 ${isDayTime ? 'text-gray-100' : 'text-gray-900'} uppercase tracking-wider drop-shadow-md`}>📈
                                                            Proven Business Impact & ROI Metrics</h3>
                                                        <div
                                                            className={`grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl border-2 ${isDayTime ? 'bg-gradient-to-br from-[#0E3B46]/30 via-[#041f2d]/20 to-[#0E3B46]/20 border-[#0ef0dd]/30' : 'bg-gradient-to-br from-[#f0f9ff] via-[#e8f4f8] to-[#e0f2fe] border-[#bae6fd]/70'}`}>
                                                            <div
                                                                className={`text-center p-4 rounded-xl transition-all hover:scale-110 ${isDayTime ? 'bg-[#0E3B46]/30' : 'bg-white/60'}`}>
                                                                <p className={`text-2.5xl md:text-4xl font-[900] ${isDayTime ? 'text-[#0ef0dd]' : 'text-[#06b6d4]'} drop-shadow-lg`}>30-40%</p>
                                                                <p className={`text-[0.8em] mt-2 ${isDayTime ? 'text-gray-300' : 'text-gray-800'} font-[700] uppercase tracking-wide`}>💰
                                                                    Cost Reduction</p>
                                                            </div>
                                                            <div
                                                                className={`text-center p-4 rounded-xl transition-all hover:scale-110 ${isDayTime ? 'bg-[#0E3B46]/30' : 'bg-white/60'}`}>
                                                                <p className={`text-2.5xl md:text-4xl font-[900] ${isDayTime ? 'text-[#06b6d4]' : 'text-[#0284c7]'} drop-shadow-lg`}>50-60%</p>
                                                                <p className={`text-[0.8em] mt-2 ${isDayTime ? 'text-gray-300' : 'text-gray-800'} font-[700] uppercase tracking-wide`}>⚡
                                                                    Cycle Acceleration</p>
                                                            </div>
                                                            <div
                                                                className={`text-center p-4 rounded-xl transition-all hover:scale-110 ${isDayTime ? 'bg-[#0E3B46]/30' : 'bg-white/60'}`}>
                                                                <p className={`text-2.5xl md:text-4xl font-[900] ${isDayTime ? 'text-[#7c3aed]' : 'text-[#7c3aed]'} drop-shadow-lg`}>25-35%</p>
                                                                <p className={`text-[0.8em] mt-2 ${isDayTime ? 'text-gray-300' : 'text-gray-800'} font-[700] uppercase tracking-wide`}>📦
                                                                    Inventory Improvement</p>
                                                            </div>
                                                            <div
                                                                className={`text-center p-4 rounded-xl transition-all hover:scale-110 ${isDayTime ? 'bg-[#0E3B46]/30' : 'bg-white/60'}`}>
                                                                <p className={`text-2.5xl md:text-4xl font-[900] ${isDayTime ? 'text-[#10b981]' : 'text-[#059669]'} drop-shadow-lg`}>99.9%</p>
                                                                <p className={`text-[0.8em] mt-2 ${isDayTime ? 'text-gray-300' : 'text-gray-800'} font-[700] uppercase tracking-wide`}>🛡️
                                                                    System Uptime</p>
                                                            </div>
                                                            <div
                                                                className={`text-center p-4 rounded-xl transition-all hover:scale-110 ${isDayTime ? 'bg-[#0E3B46]/30' : 'bg-white/60'}`}>
                                                                <p className={`text-2.5xl md:text-4xl font-[900] ${isDayTime ? 'text-[#f59e0b]' : 'text-[#d97706]'} drop-shadow-lg`}>95%+</p>
                                                                <p className={`text-[0.8em] mt-2 ${isDayTime ? 'text-gray-300' : 'text-gray-800'} font-[700] uppercase tracking-wide`}> -
                                                                    Task Automation</p>
                                                            </div>
                                                            <div
                                                                className={`text-center p-4 rounded-xl transition-all hover:scale-110 ${isDayTime ? 'bg-[#0E3B46]/30' : 'bg-white/60'}`}>
                                                                <p className={`text-2.5xl md:text-4xl font-[900] ${isDayTime ? 'text-[#ef4444]' : 'text-[#dc2626]'} drop-shadow-lg`}>3.5yr</p>
                                                                <p className={`text-[0.8em] mt-2 ${isDayTime ? 'text-gray-300' : 'text-gray-800'} font-[700] uppercase tracking-wide`}>💹
                                                                    ROI Payback</p>
                                                            </div>
                                                            <div
                                                                className={`text-center p-4 rounded-xl transition-all hover:scale-110 ${isDayTime ? 'bg-[#0E3B46]/30' : 'bg-white/60'}`}>
                                                                <p className={`text-2.5xl md:text-4xl font-[900] ${isDayTime ? 'text-[#06b6d4]' : 'text-[#0284c7]'} drop-shadow-lg`}>80%+</p>
                                                                <p className={`text-[0.8em] mt-2 ${isDayTime ? 'text-gray-300' : 'text-gray-800'} font-[700] uppercase tracking-wide`}>👥
                                                                    User Adoption</p>
                                                            </div>
                                                            <div
                                                                className={`text-center p-4 rounded-xl transition-all hover:scale-110 ${isDayTime ? 'bg-[#0E3B46]/30' : 'bg-white/60'}`}>
                                                                <p className={`text-2.5xl md:text-4xl font-[900] ${isDayTime ? 'text-[#10b981]' : 'text-[#059669]'} drop-shadow-lg`}>98%</p>
                                                                <p className={`text-[0.8em] mt-2 ${isDayTime ? 'text-gray-300' : 'text-gray-800'} font-[700] uppercase tracking-wide`}>✅
                                                                    On-Time Delivery</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Implementation Details & Timeline */}
                                                    <div className='mb-8'>
                                                        <h3 className={`text-[1em] font-[800] mb-5 ${isDayTime ? 'text-gray-100' : 'text-gray-900'} uppercase tracking-wider drop-shadow-md`}> - ️
                                                            Implementation Approach & Timeline</h3>
                                                        <div
                                                            className={`p-6 rounded-2xl border-l-4 ${isDayTime ? 'border-[#0ef0dd] bg-gradient-to-r from-[#0ef0dd]/8 to-transparent' : 'border-[#0ef0dd]/50 bg-gradient-to-r from-[#0ef0dd]/15 to-transparent'}`}>
                                                            <ul className={`text-[0.9em] space-y-3.5 ${isDayTime ? 'text-gray-200' : 'text-gray-800'} font-[500]`}>
                                                                <li className='flex gap-3 items-start'><span
                                                                    className={`font-[800] flex-shrink-0 ${isDayTime ? 'text-[#0ef0dd]' : 'text-[#0ef0dd]'}`}>📍 Phase 1 (Weeks 1-4):</span>
                                                                    <span>Discovery, needs assessment, architecture design, data mapping, team training kickoff, stakeholder alignment</span>
                                                                </li>
                                                                <li className='flex gap-3 items-start'><span
                                                                    className={`font-[800] flex-shrink-0 ${isDayTime ? 'text-[#06b6d4]' : 'text-[#0284c7]'}`}>📍 Phase 2 (Weeks 5-12):</span>
                                                                    <span>System configuration, custom development, integrations setup, legacy data migration (in parallel), UAT environment setup</span>
                                                                </li>
                                                                <li className='flex gap-3 items-start'><span
                                                                    className={`font-[800] flex-shrink-0 ${isDayTime ? 'text-[#7c3aed]' : 'text-[#7c3aed]'}`}>📍 Phase 3 (Weeks 13-16):</span>
                                                                    <span>UAT execution, change management, knowledge transfer, performance tuning, security hardening</span>
                                                                </li>
                                                                <li className='flex gap-3 items-start'><span
                                                                    className={`font-[800] flex-shrink-0 ${isDayTime ? 'text-[#f59e0b]' : 'text-[#d97706]'}`}>📍 Phase 4 (Weeks 17+):</span>
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
                                                            🎯 Schedule Expert Consultation
                                                        </button>
                                                        <button
                                                            className={`px-8 py-4 text-[0.95em] font-[800] rounded-xl transition-all ${isDayTime ? 'bg-[#0E3B46]/60 text-[#0ef0dd] border-2 border-[#0ef0dd]/70 hover:bg-[#0E3B46] hover:border-[#0ef0dd]' : 'bg-gradient-to-r from-white/15 to-white/5 text-[#0ef0dd] border-2 border-[#0ef0dd]/50 hover:bg-white/25 hover:border-[#0ef0dd]'} uppercase tracking-wider`}>
                                                            📥 Download Case Studies
                                                        </button>
                                                        <button
                                                            className={`px-8 py-4 text-[0.95em] font-[800] rounded-xl transition-all ${isDayTime ? 'text-gray-300 hover:text-[#0ef0dd] border-2 border-gray-500/30 hover:border-[#0ef0dd]/50' : 'text-gray-700 hover:text-[#0ef0dd] border-2 border-gray-300 hover:border-[#0ef0dd]'} uppercase tracking-wider`}>
                                                             -️ View Technical Architecture →
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

            {/* How is ERP Implementation Influencing Business Outcomes */}
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
                                    className={`text-[0.9em] font-[800] uppercase tracking-widest ${isDayTime ? 'text-[#06b6d4]' : 'text-[#0284c7]'}`}>🚀 Strategic Impact</span>
                                <div
                                    className={`h-1 w-12 rounded-full ${isDayTime ? 'bg-gradient-to-r from-[#06b6d4] to-[#0ef0dd]' : 'bg-gradient-to-r from-[#7c3aed] via-[#06b6d4] to-[#0ef0dd]'}`}/>
                            </div>

                            <h2 className={`text-[2em] md:text-[2.8em] lg:text-[3.8em] capitalize font-[900] text-center mb-8 leading-[1.1] drop-shadow-lg ${isDayTime ? 'text-[#0ef0dd]' : 'text-[#0ef0dd]'}`}>
                                How <span
                                className={`bg-gradient-to-r from-[#0ef0dd] via-[#06b6d4] to-[#7c3aed] bg-clip-text text-transparent`}>ERP Implementation</span>
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
                                        ERP Adoption</p>
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
                                        <span className='text-2xl'>📊</span>
                                        Enterprise Resource Planning: Strategic Imperative
                                    </h3>
                                    <p className={`text-[0.95em] leading-[1.95] font-[500] ${isDayTime ? 'text-gray-300' : 'text-gray-700'}`}>
                                        Enterprise resource planning systems have evolved into mission-critical business
                                        infrastructure, with approximately <span className='font-[800]'>80% of global organizations</span> deploying
                                        integrated ERP solutions to drive operational excellence and competitive
                                        advantage. These sophisticated platforms deliver <span className='font-[800]'>measurable improvements across process efficiency (35-50%), productivity acceleration (40-60%), and order fulfillment accuracy (25-35%)</span> while
                                        providing executive leadership with real-time visibility into enterprise-wide
                                        performance metrics, enabling <span className='font-[800]'>data-driven decision-making</span> that
                                        directly impacts organizational outcomes, revenue trajectory, and market
                                        responsiveness.
                                    </p>
                                </div>

                                <div>
                                    <h3 className={`text-[1.1em] font-[800] mb-3 uppercase tracking-wide flex items-center gap-2 ${isDayTime ? 'text-[#06b6d4]' : 'text-[#0ef0dd]'}`}>
                                        <span className='text-2xl'>⚡</span>
                                        Our Premier ERP Development Approach
                                    </h3>
                                    <p className={`text-[0.95em] leading-[1.95] font-[500] ${isDayTime ? 'text-gray-300' : 'text-gray-700'}`}>
                                        As a <span className='font-[800]'>premier ERP development partner</span>, we
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
                                        <span className='text-2xl flex-shrink-0'>✅</span>
                                        <div>
                                            <p className={`font-[800] text-[0.95em] ${isDayTime ? 'text-[#0ef0dd]' : 'text-[#0284c7]'}`}>Measurable
                                                ROI & Cost Savings</p>
                                            <p className={`text-[0.85em] leading-relaxed mt-1 ${isDayTime ? 'text-gray-400' : 'text-gray-600'}`}>30-40%
                                                operational cost reduction within 12-18 months</p>
                                        </div>
                                    </div>
                                    <div
                                        className={`flex gap-3 p-4 rounded-lg ${isDayTime ? 'bg-[#0E3B46]/30' : 'bg-[#f0f9ff]/50'}`}>
                                        <span className='text-2xl flex-shrink-0'>🚀</span>
                                        <div>
                                            <p className={`font-[800] text-[0.95em] ${isDayTime ? 'text-[#06b6d4]' : 'text-[#0ef0dd]'}`}>Accelerated
                                                Growth Trajectories</p>
                                            <p className={`text-[0.85em] leading-relaxed mt-1 ${isDayTime ? 'text-gray-400' : 'text-gray-600'}`}>50-60%
                                                faster time-to-market & cycle acceleration</p>
                                        </div>
                                    </div>
                                    <div
                                        className={`flex gap-3 p-4 rounded-lg ${isDayTime ? 'bg-[#0E3B46]/30' : 'bg-[#f0f9ff]/50'}`}>
                                        <span className='text-2xl flex-shrink-0'> - </span>
                                        <div>
                                            <p className={`font-[800] text-[0.95em] ${isDayTime ? 'text-[#7c3aed]' : 'text-[#7c3aed]'}`}>Enterprise-Grade
                                                Security & Resilience</p>
                                            <p className={`text-[0.85em] leading-relaxed mt-1 ${isDayTime ? 'text-gray-400' : 'text-gray-600'}`}>99.9%
                                                uptime SLA with end-to-end encryption</p>
                                        </div>
                                    </div>
                                    <div
                                        className={`flex gap-3 p-4 rounded-lg ${isDayTime ? 'bg-[#0E3B46]/30' : 'bg-[#f0f9ff]/50'}`}>
                                        <span className='text-2xl flex-shrink-0'>🎯</span>
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
                                    Our <span className='font-[900]'>enterprise-grade ERP solutions</span> are
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

            {/* Perks Of Custom ERP Software Development */}
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
                                className={`text-[0.9em] font-[800] uppercase tracking-widest ${isDayTime ? 'text-[#0284c7]' : 'text-[#0ef0dd]'}`}>💎 Premium Features</span>
                            <div
                                className={`h-1 w-10 rounded-full ${isDayTime ? 'bg-gradient-to-r from-[#06b6d4] to-[#0ef0dd]' : 'bg-gradient-to-r from-[#06b6d4] to-[#0ef0dd]'}`}/>
                        </div>
                        <h2 className={`lg:text-[3.5em] md:text-[3em] text-[2.2em] font-[900] mb-6 leading-[1.15] drop-shadow-lg ${isDayTime ? 'text-[#031E29]' : 'text-[#0ef0dd]'}`}>
                            Perks Of <span
                            className={`bg-gradient-to-r from-[#0ef0dd] via-[#06b6d4] to-[#7c3aed] bg-clip-text text-transparent`}>Custom ERP</span>
                            <br className='lg:block md:block hidden'/>Software Development
                        </h2>
                        <p className={`text-[1em] font-[600] leading-[1.85] max-w-[900px] mx-auto mb-8 ${isDayTime ? 'text-gray-700' : 'text-gray-300'}`}>
                            Transform operational performance through <span
                            className={`font-[900] ${isDayTime ? 'text-[#0284c7]' : 'text-[#0ef0dd]'}`}>enterprise-grade ERP solutions</span> architected
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
                                    <span className='text-2xl'>🎯</span> Why Custom ERP?
                                </h3>
                                <p className={`text-[0.95em] leading-[1.85] font-[600] ${isDayTime ? 'text-gray-700' : 'text-gray-300'}`}>
                                    Unlike <span className='font-[900]'>generic commercial solutions</span>, our custom
                                    ERP delivers <span
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
                                    <span className='text-xl'>→</span>
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
                                        <span className='text-2xl lg:text-3xl'>📋</span>
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
                                        Custom ERP software is meticulously designed around your specific organizational
                                        structure, operational workflows, industry requirements, and strategic business
                                        objectives rather than forcing your processes to conform to generic software
                                        limitations. Unlike off-the-shelf solutions that offer standardized
                                        functionality for broad market appeal, <span
                                        className={`font-[900] ${isDayTime ? 'text-[#0284c7]' : 'text-[#0ef0dd]'}`}>custom ERP development ensures every
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
                                        <span className='text-2xl lg:text-3xl'> --</span>
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
                                        Custom ERP solutions provide <span
                                        className={`font-[900] ${isDayTime ? 'text-[#0284c7]' : 'text-[#06b6d4]'}`}>native integration capabilities</span> with
                                        your existing
                                        technology ecosystem, eliminating the <span
                                        className={`font-[900] ${isDayTime ? 'text-[#7c3aed]' : 'text-[#a78bfa]'}`}>data silos, manual data entry, integration
                                        middleware costs</span>, and operational inefficiencies that typically arise
                                        when
                                        implementing packaged software with limited connectivity options. Our
                                        development approach ensures your ERP platform <span
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
                                        limitations inherent in pre-packaged ERP solutions.
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
                                        <span className='text-2xl lg:text-3xl'>📈</span>
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
                                        Custom ERP platforms are <span
                                        className={`font-[900] ${isDayTime ? 'text-[#7c3aed]' : 'text-[#a78bfa]'}`}>architected with scalable infrastructure and flexible
                                        design principles</span> that grow seamlessly alongside your business expansion,
                                        accommodating increased transaction volumes, additional users, new business
                                        units, geographic expansion, product line diversification, and evolving
                                        operational complexity without performance degradation or costly system
                                        replacements. Unlike <span
                                        className={`font-[900] ${isDayTime ? 'text-[#0284c7]' : 'text-[#0ef0dd]'}`}>commercial ERP packages with user-based licensing models</span>,
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
                                        pressures evolve, or strategic priorities shift, ensuring your ERP investment
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
                                        <span className='text-2xl lg:text-3xl'> - </span>
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
                                        Custom ERP development provides <span
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
                                        <span className='text-2xl lg:text-3xl'>🛡️</span>
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
                                        Custom ERP solutions implement <span
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
                                        <span className='text-2xl lg:text-3xl'>🚀</span>
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
                                        Custom ERP development transforms your enterprise software from a <span
                                        className={`font-[900] ${isDayTime ? 'text-[#0284c7]' : 'text-[#0ef0dd]'}`}>commodity
                                        business tool into a strategic competitive asset</span> by embedding <span
                                        className={`font-[900] ${isDayTime ? 'text-[#db2777]' : 'text-[#ec4899]'}`}>proprietary
                                        business processes, innovative workflows, unique analytical capabilities, and
                                        differentiated customer experiences</span> directly into your operational
                                        infrastructure. While competitors using identical commercial ERP packages
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
                                        competitive differentiation. Custom ERP becomes an <span
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
                                        <span className='text-2xl lg:text-3xl'>✨</span>
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
                                        Custom ERP interfaces are <span
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
                                        <span className='text-2xl lg:text-3xl'>💰</span>
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
                                        While custom ERP development requires <span
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
                                        ERP
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
                                        <span className='text-2xl lg:text-3xl'>⚡</span>
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
                                        Custom ERP platforms provide <span
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
                                        technology enablement. The ability to evolve your ERP system at the pace of
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
                                        <span className='text-2xl lg:text-3xl'>⚙️</span>
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
                                        Custom ERP architecture is <span
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
                        {/* Large ERP Text Watermark - Center */}
                        <div className="absolute opacity-10">
          <span
              className="text-[8rem] sm:text-[8rem] lg:text-[12rem] xl:text-[12rem] font-bold whitespace-nowrap ${isDayTime ? 'text-[#0ef0dd]' : 'text-[#0ef0dd]'}">
            ERP Systems
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
                                    className={`text-[0.9em] font-[800] uppercase tracking-widest ${isDayTime ? 'text-[#0284c7]' : 'text-[#0ef0dd]'}`}>⚙️ Development Excellence</span>
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
                                As a leading ERP solutions provider, we develop <span
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

export default ErpDevelopment;

