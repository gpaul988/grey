'use client';
import React, {useEffect, useRef, useState} from 'react';
import '@/app/globals.css';
import Header from "@/components/Header";
import FloatingButton from "@/components/FloatingButton";
import Image from "next/image";
import Link from "next/link";
import {AiFillCaretUp, AiFillCaretDown} from "react-icons/ai";
import Footer from "@/components/Footer";

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
    const [isDayTime, setIsDayTime] = useState<boolean>(() => {
        const hour = new Date().getHours();
        return hour >= 6 && hour < 18;
    });

// Optional: if you want the value to update over time, use an interval (does not set state synchronously on mount)
    useEffect(() => {
        const id = setInterval(() => {
            const hour = new Date().getHours();
            setIsDayTime(prev => {
                const next = hour >= 6 && hour < 18;
                return prev === next ? prev : next;
            });
        }, 60_000); // check every minute

        return () => clearInterval(id);
    }, []);

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
                    regulatory compliance, and financial administration—all requiring seamless coordination and data
                    integration. As a specialized ERP development company, we engineer robust, comprehensive ERP systems
                    specifically designed for healthcare environments, addressing the unique challenges of medical
                    operations, patient safety protocols, and compliance with HIPAA and other regulatory frameworks. Our
                    healthcare ERP solutions streamline complex workflows, eliminate operational inefficiencies,
                    automate critical reporting processes, and provide real-time visibility into clinical, financial,
                    and operational performance metrics. These integrated platforms connect disparate departments and
                    functions—from emergency services and surgical units to pharmacy, laboratory, billing, and
                    administration—ensuring accurate data flow, reducing administrative burden, and enabling healthcare
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
            {/* Header now provided globally by app/layout.tsx — duplicate render disabled to fix doubled header */ false && <Header/>}
            <FloatingButton
                className={`fixed bottom-6 right-6 transition-all z-50 duration-300 ${
                    isVisible ? 'mb-16' : 'mb-0'
                }`}
            />

            {/* Hero Section */}
            <div id={'hero'}
                 className={`relative max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em] ${
                     isDayTime ? 'text-black' : 'text-white'
                 }`}>
                <h1
                    className={`border-b pb-[0.5em] border-gray-500/50 px-0 constant-text lg:text-[5.35em] md:text-[5.35em] text-[2.5em] lg:mt-[2.5em] md:mt-[2.5em] mt-[3em] leading-[1.1] font-[750]`}>
                    ERP <br className={'lg:block md:block hidden'}/>Development <br
                    className={'lg:hidden md:hidden block'}/>Services
                </h1>
                <p className={'lg:mt-[4em] mt-[1.5em] text-[0.87em] font-[300]'}>
                    We deliver custom ERP solutions that unify your critical business functions into one intelligent
                    platform. Our services streamline operations, eliminate inefficiencies, and provide <br
                    className={'lg:block md:block hidden'}/>real-time insights that drive informed decision-making and
                    sustainable growth across your organization.
                </p>
                <div
                    className={'relative max-w-full w-full h-auto mt-[2em] lg:mt-[3em] bg-gray-300/10'}>
                    <Image
                        src={'/assets/erp/hero.jpg'}
                        alt={'ERP Development Services'}
                        width={1920}
                        height={1080}
                        style={{
                            objectFit: 'cover',
                            objectPosition: 'center',
                        }}
                    />
                </div>
            </div>

            {/* Introductory section */}
            <section ref={sectionRef}
                     className={`py-12 transition-colors duration-500 ${
                         isBackgroundActive
                             ? isDayTime
                                 ? "bg-white text-black"
                                 : "bg-black text-white"
                             : isDayTime
                                 ? "bg-black text-white"
                                 : "bg-white text-black"
                     }`}>
                <div
                    className='relative grid lg:grid-cols-2 grid-cols-1 lg:gap-14 gap-6 lg:pt-20 md:pt-20 pt-6 lg:pb-16 md:pb-16 pb-6 lg:max-w-full w-full mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em]'>
                    <div className=''>
                        <h6 className='constant-text uppercase lg:text-[0.85em] md:text-[0.85em] leading-[1.3] text-[0.7em] font-[400] lg:tracking-wider tracking-tight'>
                            Scalable ERP Systems <br className={'lg:block md:block hidden'}/>for Business Growth
                        </h6>
                    </div>
                    <div className='lg:-ml-[19em]'>
                        <h3 className='lg:text-[3.2em] md:text-[3.2em] text-[1.7em] font-[700] lg:mt-[0.01em] lg:leading-[1.2] tracking-tight border-b lg:pb-[0.7em] lg:mb-[0.7em] leading-[1.1] pb-6'>
                            <span className={'text-[#0ef0dd]'}>ERP Software Development Company</span> <br
                            className={'lg:block md:block hidden'}/>- Hire ERP Developer
                        </h3>
                        <div
                            className='grid lg:grid-cols-2 grid-cols-1 gap-6 mt-4 font-[300] text-justify text-[0.873em] tracking-normal leading-[1.5]'>
                            <div>
                                <p>
                                    Our advanced ERP software development services deliver transformative process
                                    automation that achieves up to 90% efficiency optimization across your enterprise
                                    operations. We architect comprehensive solutions that integrate seamlessly with your
                                    existing business infrastructure, streamlining workflows and eliminating
                                    redundancies while significantly enhancing productivity and operational precision.
                                    Our ERP platforms consolidate critical business functions including finance, human
                                    resources, supply chain management, inventory control, and procurement into unified
                                    systems that provide real-time visibility and control. By automating routine
                                    processes and establishing intelligent workflows, we enable your organization to
                                    reallocate valuable resources toward strategic initiatives while reducing
                                    operational costs and minimizing human error across all departments.
                                </p>
                            </div>
                            <div>
                                <p>
                                    Our ERP development expertise encompasses full-spectrum mobile and web applications
                                    featuring intuitive user interfaces, real-time push notifications, advanced
                                    reporting and analytics tools, and customizable dashboards that deliver actionable
                                    insights at every organizational level. We develop solutions optimized for
                                    smartphones, tablets, and desktop platforms, ensuring that key stakeholders maintain
                                    operational oversight and decision-making capabilities regardless of location or
                                    device. Our custom ERP software development services provide end-to-end solutions
                                    meticulously tailored to your unique business requirements, industry regulations,
                                    and growth trajectory. This comprehensive approach empowers organizations to manage
                                    and automate day-to-day operations with exceptional accuracy and reliability while
                                    proactively minimizing operational risks. The result is a resilient, scalable
                                    technological foundation that adapts to evolving business complexities, supports
                                    data-driven decision-making, and positions your enterprise for sustained competitive
                                    advantage in dynamic market environments.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our ERP Development services */}
            <div
                className={`lg:pt-[4em] md:pt-[4em] pt-[2em] lg:pb-[4em] md:pb-[4em] pb-[2em]  ${isDayTime ? 'bg-white' : 'bg-black'}`}>
                <div id={'crm-development'}
                     className={'relative lg:pt-[4em] md:pt-[3em] pt-[1em] lg:pb-[6em] md:pb-[6em] pb-[1em] lg:mt-[3em] md:mt-[3em] mt-[1em] lg:mb-[8em] md:mb-[6em] mb-[1em] max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]'}>
                    <div
                        className={`relative grid lg:grid-cols-2 grid-cols-1 gap-4 mb-8 border-b-[1px]  pb-[3em] ${isDayTime ? 'text-black' : 'text-white'} `}>
                        <div>
                            <h2 className={`lg:text-[3.12em] md:text-[3.12em] text-[1.7em] font-[700] justify-center tracking-tight  leading-[1.1]`}>
                                Our <span className={'text-[#0ef0dd]'}>ERP Development</span> <br
                                className={'lg:block md:block hidden'}/>Services Overview
                            </h2>
                        </div>
                        <div>
                            <p className='text-[0.85em] font-[400] justify-center text-justify leading-[1.5] lg:-ml-[7.5em] tracking-noromal'>
                                We empower enterprises to optimize operations and accelerate digital transformation
                                through advanced ERP solutions. As a leading ERP development partner, we deliver custom
                                systems engineered for scalability, performance, and comprehensive functionality. Our
                                expert team architects and configures platforms tailored to your unique business
                                requirements—providing complete control over workflows, data management, and operational
                                processes.
                            </p>
                        </div>
                    </div>
                    <div
                        className='grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-16 lg:mt-28 md:mt-28 mt-6 px-6 max-w-full w-full mx-auto h-full'>
                        <div
                            className='lg:sticky md:sticky top-28 lg:h-screen md:h-screen lg:mr-[11em] overflow-hidden'>
                            <h3 className={`text-[1.5em] font-[500] tracking-tight constant-text ${
                                isDayTime ? 'text-black' : 'text-white'
                            }`}>
                                Our Solutions
                            </h3>
                            <ul className={`list-disc capitalize constant-text text-[0.89em] ml-4 font-[600] relative space-y-3 ${
                                isDayTime ? 'text-black decoration-gray-600 focus:decoration-gray-900' : 'text-white decoration-gray-400 focus:decoration-gray-600'
                            }`}>
                                {[
                                    {id: "01", title: "Custom ERP Solution", target: "CES"},
                                    {id: "02", title: "ERP Integration & Migration", target: "EIM"},
                                    {id: "03", title: "Cloud ERP Development", target: "CED"},
                                    {id: "04", title: "ERP Modernization & Optimization", target: "EMO"},
                                    {id: "05", title: "Industry-Specific ERP", target: "ISE"},
                                    {id: "06", title: "ERP Support & Maintenance", target: "ESM"},
                                ].map((item, index) => (
                                    <li key={index} className={'group lg:mt-6 mt-4'}>
                                        <button
                                            onClick={() => scrollToSection(item.target)}
                                            className={`w-full text-left flex items-center gap-4 mb-4 focus:font-[650] ${
                                                isDayTime
                                                    ? `focus:text-black ${activeId === item.target ? 'text-gray-900 font-[650]' : 'text-gray-500 font-[400]'}`
                                                    : `focus:text-white ${activeId === item.target ? 'text-gray-100 font-[650]' : 'text-gray-500 font-[400]'}`
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
                        <div className={'lg:-ml-[8em] md:-ml-[8em] lg:mb-[22.5em] md:mb-[22em]'}>
                            <div className="grid lg:grid-cols-[50px_auto] grid-cols-1 lg:gap-2 gap1 items-start">
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>01/
                                </div>
                                <div className={`lg:mb-44 mb-14  ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'CES'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        Custom ERP Solutions
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>System Integration</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Scalability</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Business Intelligence</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.873em] font-[300]'}>
                                        We design and develop fully customized enterprise resource planning systems
                                        engineered specifically around your unique organizational structure, operational
                                        workflows, regulatory requirements, and strategic business objectives. Our
                                        custom ERP solutions provide comprehensive integration of critical business
                                        functions including financial management, procurement, inventory control, supply
                                        chain operations, human capital management, customer relationship management,
                                        and business intelligence into a unified, centralized platform. By eliminating
                                        operational silos and creating a single source of truth for enterprise data, we
                                        enable real-time visibility across all departments, facilitate data-driven
                                        decision-making at every organizational level, improve cross-functional
                                        collaboration, and establish scalable digital infrastructure that evolves
                                        alongside your business growth trajectory and changing market demands.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>02/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'EIM'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        ERP Integration & Migration
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>System Integration</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Data Migration</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Legacy Modernization</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Business Continuity</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        Our experienced integration specialists deliver comprehensive ERP implementation
                                        services that seamlessly connect your enterprise resource planning platform with
                                        your entire existing technology landscape, including customer relationship
                                        management systems, e-commerce platforms, business intelligence tools,
                                        accounting software, warehouse management systems, manufacturing execution
                                        systems, and specialized third-party applications. We execute meticulously
                                        planned data migration strategies from legacy systems with multi-phase
                                        validation protocols, comprehensive data cleansing procedures, thorough testing
                                        frameworks, and robust rollback mechanisms to guarantee data accuracy, maintain
                                        referential integrity, preserve historical records, and ensure zero disruption
                                        to daily operations. Our phased implementation approach minimizes business risk,
                                        enables stakeholder training at each stage, allows for iterative refinement
                                        based on user feedback, and ensures smooth organizational change management
                                        throughout the entire transformation journey.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>03/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'CED'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        Cloud ERP Development
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Cloud Architecture</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Scalability</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Security Compliance</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Cost Optimization</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        We architect and deploy sophisticated cloud-native ERP solutions leveraging
                                        industry-leading infrastructure providers including Amazon Web Services,
                                        Microsoft Azure, Google Cloud Platform, and hybrid cloud configurations tailored
                                        to your specific security, compliance, and performance requirements. Our cloud
                                        ERP implementations deliver exceptional scalability to accommodate business
                                        growth and seasonal demand fluctuations, provide anywhere-anytime access for
                                        distributed teams and remote workforces, enable automatic infrastructure scaling
                                        without capital expenditure, offer built-in redundancy and disaster recovery
                                        capabilities, reduce total cost of ownership by eliminating on-premise hardware
                                        maintenance, and maintain enterprise-grade security with advanced encryption,
                                        multi-factor authentication, role-based access controls, and continuous
                                        compliance monitoring aligned with industry standards including SOC 2, ISO
                                        27001, GDPR, HIPAA, and sector-specific regulatory frameworks.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>04/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'EMO'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        ERP Modernization & Optimization </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Legacy Transformation</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>AI & Automation</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Performance Optimization</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>User Expertise</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        We transform legacy ERP infrastructure through comprehensive modernization
                                        initiatives that re-architect outdated systems with contemporary technology
                                        stacks, microservices architectures, API-first design principles, and
                                        cloud-ready frameworks. Our modernization services enhance user experience
                                        through intuitive interface redesign based on modern UX principles, implement
                                        advanced analytics and business intelligence capabilities powered by machine
                                        learning algorithms, integrate artificial intelligence for predictive insights
                                        and automated decision support, deploy robotic process automation for repetitive
                                        tasks, optimize database performance and query efficiency, streamline workflows
                                        to eliminate bottlenecks, and establish continuous integration and deployment
                                        pipelines for agile system evolution. These enhancements dramatically improve
                                        system responsiveness, accelerate user adoption rates across the organization,
                                        reduce operational costs through automation, increase employee productivity, and
                                        deliver measurable return on investment while extending the lifecycle of your
                                        ERP investment.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>05/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'ISE'}>
                                    <h2 className={`text-[1.5em] font-medium mb-3`}>
                                        Industry-Specific ERP
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-light ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Industry Compliance</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Vertical Solutions</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Best Practice</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Regulatory Framework</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        We develop highly specialized ERP solutions meticulously designed to address the
                                        distinctive operational challenges, regulatory landscapes, and competitive
                                        dynamics of your specific industry vertical. For manufacturing organizations, we
                                        incorporate materials requirement planning, production scheduling, quality
                                        management, shop floor control, and equipment maintenance modules. Retail
                                        implementations feature point-of-sale integration, omnichannel inventory
                                        management, customer loyalty programs, and merchandising analytics. Healthcare
                                        solutions include electronic health records integration, patient management,
                                        medical billing compliance, appointment scheduling, and HIPAA-compliant data
                                        handling. Financial services implementations provide audit trail capabilities,
                                        regulatory reporting automation, risk management frameworks, and compliance with
                                        SOX, Basel III, and MiFID II requirements. Each industry-specific solution
                                        embeds proven best practices, standardized workflows, pre-configured compliance
                                        frameworks, and specialized functionality that accelerates deployment timelines
                                        and ensures regulatory adherence from day one.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>06/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'ESM'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        ERP Support & Maintenance </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>24/7 Support</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Proactive Monitoring</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Security Management</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Continuous Optimization</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        Our comprehensive managed services program delivers continuous system
                                        optimization and operational excellence through 24/7/365 technical support with
                                        guaranteed response times, proactive system monitoring utilizing advanced
                                        analytics to identify potential issues before they impact operations, regular
                                        security patching and vulnerability remediation to protect against emerging
                                        threats, performance tuning and database optimization to maintain peak system
                                        efficiency, capacity planning to anticipate infrastructure needs, scheduled
                                        system upgrades to leverage new platform capabilities, user training programs
                                        and knowledge transfer sessions to maximize adoption, detailed documentation
                                        maintenance, troubleshooting and rapid incident resolution, disaster recovery
                                        testing and business continuity planning, compliance monitoring and regulatory
                                        reporting assistance, and strategic consultation services to align your ERP
                                        roadmap with evolving business objectives. Our dedicated support team ensures
                                        your ERP system consistently delivers optimal performance, maintains the highest
                                        security standards, adapts to changing business requirements, and continues to
                                        provide exceptional value throughout its operational lifecycle.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ERP Solutions For Diverse Industries */}
            <div
                className={`lg:-mt-[45em] md:-mt-[45em] lg:pt-[2em] md:pt-[2em] pt-[1em] lg:pb-[2em] md:pb-[2em] pb-[1em] ${isDayTime ? 'bg-black' : 'bg-white'}`}>
                <div id={'backend technology'}
                     className={`relative lg:mt-[1.5em] md:mt-[1.5em] mt-[1em] lg:mb-16 md:mb-16 mb-5 max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>

                    {/* Header */}
                    <div
                        className={`relative grid lg:grid-cols-2 grid-cols-1 lg:gap-14 gap-6 border-b-[1px] lg:pb-[3em] md:pb-[3em] pb-[1em] mb-20 ${
                            isDayTime ? 'text-white' : 'text-black'
                        }`}>
                        <div>
                            <h2 className='capitalize text-[1.8em] md:text-[3em] lg:text-[3.3em] font-[700] tracking-tight leading-[1.2] lg:pb-6'>
                                <span className={'text-[#0ef0dd]'}>ERP Solutions</span> <br
                                className={'lg:block md:block hidden'}/>For Diverse Industries
                            </h2>
                        </div>
                        <div className='lg:-ml-[7.8em]'>
                            <p className='text-[0.873em] font-[300] lg:-mt-[0.2em] rounded-none leading-[1.5]'>
                                Our ERP solutions are engineered to meet the unique operational demands across diverse
                                industries, from manufacturing and healthcare to retail and logistics. We deliver
                                industry-specific configurations and customizations that address your sector&#39;s
                                regulatory requirements, workflow complexities, and business challenges, ensuring
                                seamless integration and measurable performance improvements tailored to your industry
                                landscape.
                            </p>
                        </div>
                    </div>
                    <div
                        className={`flex max-w-full mx-auto ${isDesktop ? "flex-row h-[400px]" : "flex-col h-auto"}`}>
                        {steps.map((step, idx) => {
                            const isActive = idx === activeAcc;

                            return (
                                <div
                                    key={idx}
                                    className={`transition-all duration-500 ease-in-out flex flex-col bg-[#031E29] border border-[#0E3B46] rounded-md overflow-hidden ${
                                        isDesktop ? "mx-[0.05em]" : "mb-3"
                                    }`}
                                    style={{
                                        width: isDesktop
                                            ? isActive
                                                ? '110%'
                                                : '50px'
                                            : '100%'
                                    }}
                                >
                                    {/* Inactive Panel */}
                                    {!isActive && (
                                        <div
                                            onClick={() => handleClick(idx)}
                                            className={`flex cursor-pointer ${
                                                isDesktop
                                                    ? "flex-col items-center justify-center h-full pt-3"
                                                    : "flex-row items-center p-4"
                                            }`}>
                                            <span className="text-[1.5em] font-[600] text-gray-500">
                                                {step.number}
                                            </span>

                                            <div
                                                className={`${isDesktop ? 'flex items-center justify-center h-full' : 'items-center w-full '}`}>
                                                <span
                                                    className={`text-[0.875em] font-[600] tracking-widest uppercase text-gray-400 ${
                                                        isDesktop ? "mt-4" : "ml-3"
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

                                        </div>
                                    )}

                                    {/* Active Panel */}
                                    {isActive && (
                                        <div
                                            className={`flex ${
                                                isDesktop ? "flex-row" : "flex-col"
                                            } flex-1 cursor-pointer`}
                                            onClick={() => handleClick(idx)}
                                        >
                                            <div
                                                className={`${
                                                    isDesktop
                                                        ? 'w-20 flex flex-col items-center justify-start pt-3 border-r'
                                                        : 'flex-row items-center p-4 border-b'
                                                } border-[#0E3B46]`}
                                            >

                                                <span className="text-[1.5em] font-[600] text-gray-500">
                                                    {step.number}
                                                </span>

                                                <span
                                                    className={`text-[0.8em] font-[600] tracking-wide uppercase text-gray-400 ${
                                                        isDesktop ? 'mt-[6em]' : 'ml-3'}`}
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

                                            {/* Right content */}
                                            <div
                                                className={`flex-1 mx-1 relative overflow-hidden transition-all duration-500 ease-in-out ${
                                                    isDesktop
                                                        ? ""
                                                        : isActive
                                                            ? "max-h-[1000px]"
                                                            : "max-h-0"
                                                }`}
                                            >
                                                <div
                                                    className={`h-full border border-[#0E3B46] p-6 md:p-6 flex flex-col justify-center transform transition-all duration-500 ease-in-out ${
                                                        isActive
                                                            ? "opacity-100 translate-y-0"
                                                            : "opacity-0 -translate-y-4"
                                                    }`}
                                                >

                                                    <h2 className="text-xl md:text-3xl font-bold mb-3 md:mb-4 text-gray-200">
                                                        {step.heading}
                                                    </h2>
                                                    <p className="text-[0.873em] text-gray-400 text-justify  leading-relaxed">
                                                        {step.description}
                                                    </p>
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
                className={`lg:py-[2em] md:py-[2em] py-[1em] ${isDayTime ? 'bg-gradient-to-br from-slate-100 via-slate-400 to-slate-700' : 'bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900'}`}>
                <div id={'our-custom-enterprise-software-development-process'}
                     className={`relative  py-10 lg:mb-10 mb-10 mb-4 max-w-full w-full mx-auto px-4 sm:px-4 md:px-44 lg:px-[12.5em] xl:px-[12.5em] 2xl:px-[12.5em]`}>
                    <div
                        className={`border-4 border-teal-300 rounded-lg p-4 md:p-[3em] lg:p-[6em] ${isDayTime ? 'text-black' : 'text-white'}shadow-lg`}>
                        <h2 className={`text-[1.8em] md:text-[2.5em] lg:text-[3.5em] capitalize font-[700] text-center mb-6 sm:mb-8 leading-tight`}>
                            How is <span className={'text-teal-300'}>ERP Implementation <br
                            className={'lg:block md:block hidden'}/>Influencing</span> Business Outcomes?
                        </h2>

                        <div className="space-y-4 sm:space-y-6 text-center">
                            <p className="text-[0.9em] leading-relaxed">
                                Enterprise resource planning systems have become essential business infrastructure, with
                                approximately 80% of global organizations deploying ERP solutions to drive operational
                                excellence. These integrated platforms deliver measurable improvements in process
                                efficiency, productivity, and order fulfillment accuracy while providing leadership with
                                real-time visibility into enterprise-wide performance metrics and enabling data-driven
                                decision-making that directly impacts organizational outcomes.<br/><br/>
                                As a premier ERP development partner, we architect scalable, enterprise-grade solutions
                                that modernize legacy infrastructure and transform operational capabilities. Our
                                implementations integrate advanced analytics, intelligent automation, and seamless
                                cross-functional workflows, enabling your organization to achieve measurable ROI,
                                accelerate growth trajectories, and sustain competitive differentiation through robust
                                digital frameworks designed for operational resilience and strategic agility.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Perks Of Custom ERP Software Development */}
            <div
                className={`lg:pt-[2em] h-auto border-b border-white max-w-full w-full mx-auto ${isDayTime ? 'bg-white' : 'bg-black'}`}>
                <div
                    className={`relative max-w-full w-full mx-auto px-4 sm:px-6 lg:px-[4.6em] lg:pt-[6em] md:pt-[6em] pt-[1.2em] lg:pb-[6em] md:pb-[6em] pb-[1.2em] mt-14`}>
                    <div
                        className={`relative grid lg:grid-cols-2 grid-cols-1 gap-10 mb-8 ${isDayTime ? 'text-black' : 'text-white'} `}>
                        <div className={'lg:mr-[8em]'}>
                            <h2 className={`lg:text-[3.1em] md:text-[3.1em] text-[1.8em] font-[700] justify-center tracking-tight lg:mb-12 mb-7 leading-[1.2]`}>
                                Perks Of <span className={'text-[#0ef0dd]'}>Custom <br
                                className={'lg:block md:block hidden'}/>ERP Software</span> Development
                            </h2>
                            <p className={'text-[0.873em] font-normal leading-normal tracking-normal text-justify'}>
                                Transform operational performance through enterprise ERP solutions architected by our
                                specialized development team. We ensure seamless integration with your existing
                                technology infrastructure, minimizing business disruption while maximizing system
                                adoption. Our custom ERP platforms unify disparate business functions—from finance and
                                supply chain to human resources and customer management—into a cohesive ecosystem that
                                enhances visibility, streamlines workflows, and enables data-driven decision-making
                                across your organization.
                            </p>
                            <div className={'lg:mt-[28em] '}>
                                <Link href={'/contact'}
                                      className={`border border-gray-200 hover:border-teal-500 ${isDayTime ? 'text-black text-shadow-sm/70 text-shadow-teal-200' : 'text-white text-shadow-sm/70 text-shadow-teal-800'} font-bold text-[1em] px-8 sm:px-10 py-3 sm:py-4 rounded-full shadow-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl`}>
                                    Let&#39;s Connect!
                                </Link>
                            </div>
                        </div>
                        <div
                            className={`lg:-ml-5 md:-ml-5 border-t pt-[6em]] relative mx-auto max-w-full w-full space-y-2 ${isDayTime ? 'text-black' : 'text-white'}`}>
                            <div
                                className={`w-full border-b pb-6 mt-6`}>
                                <button
                                    onClick={() => toggleWeb(0)}
                                    className="flex items-center justify-between w-full text-start lg:text-[1.6em] md:text-[1.5em] sm:text-base font-medium focus:outline-none"
                                >
                                    <span className={'capitalize'}>Tailored To Your Exact Business Requirements</span>
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
                                        Custom ERP software is meticulously designed around your specific organizational
                                        structure, operational workflows, industry requirements, and strategic business
                                        objectives rather than forcing your processes to conform to generic software
                                        limitations. Unlike off-the-shelf solutions that offer standardized
                                        functionality for broad market appeal, custom ERP development ensures every
                                        feature, workflow, module, and integration point directly addresses your unique
                                        business challenges and operational needs. This tailored approach eliminates
                                        unnecessary features that clutter interfaces and complicate user adoption while
                                        ensuring critical functionality specific to your industry, market position, and
                                        competitive strategy is built directly into the system. Custom development
                                        accommodates your proprietary business processes, specialized reporting
                                        requirements, unique compliance obligations, and distinctive operational
                                        methodologies that provide competitive differentiation in your market, ensuring
                                        the technology infrastructure enhances rather than constrains your business
                                        model and strategic capabilities.
                                    </p>
                                )}
                            </div>
                            <div
                                className={`w-full border-b pb-6`}>
                                <button
                                    onClick={() => toggleWeb(1)}
                                    className="flex items-center mt-6 justify-between w-full text-start lg:text-[1.6em] md:text-[1.5em] sm:text-base font-medium focus:outline-none"
                                >
                                    <span className={'capitalize'}>Seamless Integration With Existing Systems</span>
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
                                        Custom ERP solutions provide native integration capabilities with your existing
                                        technology ecosystem, eliminating the data silos, manual data entry, integration
                                        middleware costs, and operational inefficiencies that typically arise when
                                        implementing packaged software with limited connectivity options. Our
                                        development approach ensures your ERP platform connects seamlessly with legacy
                                        systems, specialized industry applications, customer relationship management
                                        platforms, e-commerce solutions, business intelligence tools, financial
                                        software, supply chain systems, manufacturing equipment, IoT devices, and
                                        third-party services that are critical to your operations. Custom-built APIs,
                                        data synchronization protocols, and integration architectures are designed
                                        specifically for your environment, enabling real-time data flow across systems,
                                        eliminating duplicate data entry, ensuring data consistency across platforms,
                                        automating cross-system workflows, and creating a unified technology
                                        infrastructure. This integration flexibility future-proofs your investment by
                                        accommodating new systems, emerging technologies, and evolving business
                                        requirements without the constraints, compatibility issues, and integration
                                        limitations inherent in pre-packaged ERP solutions.
                                    </p>
                                )}
                            </div>
                            <div
                                className={`w-full border-b pb-6`}>
                                <button
                                    onClick={() => toggleWeb(2)}
                                    className="flex mt-6 items-center justify-between w-full text-start lg:text-[1.6em] md:text-[1.5em] sm:text-base font-medium focus:outline-none"
                                >
                                    <span className={'capitalize'}>Unlimited Scalability And Growth Flexibility</span>
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
                                        Custom ERP platforms are architected with scalable infrastructure and flexible
                                        design principles that grow seamlessly alongside your business expansion,
                                        accommodating increased transaction volumes, additional users, new business
                                        units, geographic expansion, product line diversification, and evolving
                                        operational complexity without performance degradation or costly system
                                        replacements. Unlike commercial ERP packages with user-based licensing models,
                                        module restrictions, and architectural limitations that necessitate expensive
                                        upgrades or migration to enterprise tiers as your business grows, custom
                                        solutions scale economically and technically to support your growth trajectory.
                                        The system architecture can expand to accommodate new warehouses, manufacturing
                                        facilities, retail locations, international operations, acquired companies,
                                        additional product categories, emerging sales channels, and increased data
                                        volumes while maintaining optimal performance and user experience. This
                                        scalability extends beyond technical capacity to include functional flexibility,
                                        enabling rapid deployment of new features, business processes, operational
                                        workflows, and analytical capabilities as market conditions change, competitive
                                        pressures evolve, or strategic priorities shift, ensuring your ERP investment
                                        remains aligned with business needs throughout organizational growth and
                                        transformation.
                                    </p>
                                )}
                            </div>
                            <div
                                className={`w-full border-b pb-6`}>
                                <button
                                    onClick={() => toggleWeb(3)}
                                    className="flex mt-6 items-center justify-between w-full text-start lg:text-[1.6em] md:text-[1.5em] sm:text-base font-medium focus:outline-none"
                                >
                                    <span className={'capitalize'}>Complete Control And Ownership</span>
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
                                        Custom ERP development provides full ownership of your software asset, including
                                        source code, database schemas, system architecture, and intellectual property
                                        rights, eliminating vendor lock-in, recurring licensing fees, arbitrary price
                                        increases, forced upgrades, and the operational risks associated with dependence
                                        on third-party software vendors. This ownership delivers strategic advantages
                                        including independence from vendor business decisions, product discontinuations,
                                        merger and acquisition activities, or changes in vendor support policies that
                                        could disrupt your operations or require costly migrations. You maintain
                                        complete control over system modifications, feature enhancements, security
                                        protocols, data governance policies, hosting arrangements, and technology stack
                                        decisions without requiring vendor approval, waiting for scheduled releases, or
                                        accepting functionality changes that don&#39;t align with your business
                                        requirements. This autonomy extends to deployment flexibility, enabling
                                        on-premise hosting for maximum data control, private cloud deployment for
                                        security requirements, or public cloud hosting for operational efficiency based
                                        on your specific security, compliance, performance, and cost considerations
                                        rather than vendor-imposed infrastructure constraints.
                                    </p>
                                )}
                            </div>
                            <div
                                className={`w-full border-b pb-6`}>
                                <button
                                    onClick={() => toggleWeb(4)}
                                    className="flex mt-6 items-center justify-between w-full text-start lg:text-[1.6em] md:text-[1.5em] sm:text-base font-medium focus:outline-none"
                                >
                                    <span className={'capitalize'}>Enhanced Security And Data Protection</span>
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
                                        Custom ERP solutions implement security architectures, data protection
                                        protocols, access control mechanisms, and compliance frameworks specifically
                                        designed for your industry requirements, regulatory obligations, data
                                        sensitivity levels, and risk tolerance rather than relying on generic security
                                        models that may not adequately address your specific vulnerabilities or
                                        compliance mandates. Our security-first development approach incorporates
                                        role-based access controls with granular permission levels, multi-factor
                                        authentication, encryption for data at rest and in transit, comprehensive audit
                                        logging, intrusion detection and prevention, secure API design, database
                                        security hardening, and application-layer security controls tailored to your
                                        threat landscape. Custom development enables implementation of industry-specific
                                        compliance requirements including HIPAA for healthcare, PCI DSS for payment
                                        processing, SOX for financial reporting, GDPR for European data privacy, CCPA
                                        for California consumer privacy, ITAR for defense contractors, and
                                        sector-specific regulations that may not be adequately addressed in commercial
                                        software. The ability to host sensitive data in controlled environments,
                                        implement proprietary security protocols, conduct thorough security audits
                                        without vendor restrictions, and rapidly respond to emerging threats or evolving
                                        compliance requirements provides superior data protection, regulatory compliance
                                        assurance, and risk mitigation compared to shared commercial platforms with
                                        standardized security models.
                                    </p>
                                )}
                            </div>
                            <div
                                className={`w-full border-b pb-6`}>
                                <button
                                    onClick={() => toggleWeb(5)}
                                    className="flex mt-6 items-center justify-between w-full text-start lg:text-[1.6em] md:text-[1.5em] sm:text-base font-medium focus:outline-none"
                                >
                                    <span className={'capitalize'}>Competitive Advantage Through Innovation</span>
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
                                        Custom ERP development transforms your enterprise software from a commodity
                                        business tool into a strategic competitive asset by embedding proprietary
                                        business processes, innovative workflows, unique analytical capabilities, and
                                        differentiated customer experiences directly into your operational
                                        infrastructure. While competitors using identical commercial ERP packages
                                        operate with standardized processes and generic capabilities, your custom
                                        solution operationalizes your competitive advantages, encodes institutional
                                        knowledge and best practices, automates distinctive service delivery models, and
                                        enables innovative business strategies that would be impossible with
                                        off-the-shelf software. This strategic alignment allows you to respond more
                                        rapidly to market opportunities, deliver superior customer experiences through
                                        seamless operations, optimize unique aspects of your value chain, and
                                        continuously innovate operational processes without waiting for software vendors
                                        to develop features or conforming to industry-standard processes that eliminate
                                        competitive differentiation. Custom ERP becomes an enabler of business strategy
                                        rather than a constraint, supporting market innovation, operational excellence,
                                        and strategic positioning that strengthens your competitive position and creates
                                        barriers to entry that protect market share in increasingly competitive business
                                        environments.
                                    </p>
                                )}
                            </div>
                            <div
                                className={`w-full border-b pb-6`}>
                                <button
                                    onClick={() => toggleWeb(6)}
                                    className="flex mt-6 items-center justify-between w-full text-start lg:text-[1.6em] md:text-[1.5em] sm:text-base font-medium focus:outline-none"
                                >
                                    <span className={'capitalize'}>Superior User Experience And Adoption</span>
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
                                        Custom ERP interfaces are designed specifically for your users&#39; roles,
                                        responsibilities, skill levels, and daily workflows, resulting in intuitive
                                        navigation, relevant functionality, streamlined processes, and optimal user
                                        experiences that drive higher adoption rates, increased productivity, and
                                        reduced training requirements compared to generic interfaces designed for broad
                                        market appeal. Our user-centered design approach incorporates your
                                        organizational terminology, familiar workflows, role-specific dashboards,
                                        personalized views, and intuitive interaction patterns that align with how your
                                        teams actually work rather than forcing users to adapt to unfamiliar commercial
                                        software conventions. This tailored user experience eliminates unnecessary
                                        complexity, reduces clicks required for common tasks, surfaces relevant
                                        information contextually, automates repetitive activities, and provides mobile
                                        interfaces optimized for field operations or remote work scenarios specific to
                                        your business. Higher user satisfaction and lower resistance to adoption
                                        translate directly to faster implementation timelines, reduced change management
                                        challenges, shorter time-to-value, improved data quality through consistent
                                        system usage, and better return on technology investment as employees embrace
                                        rather than resist the system that genuinely makes their work easier and more
                                        efficient.
                                    </p>
                                )}
                            </div>
                            <div
                                className={`w-full border-b pb-6 mt-6`}>
                                <button
                                    onClick={() => toggleWeb(7)}
                                    className="flex mt-6 items-center justify-between w-full text-start lg:text-[1.6em] md:text-[1.5em] sm:text-base font-medium focus:outline-none"
                                >
                                    <span className={'capitalize'}>Long-Term Cost Efficiency</span>
                                    {webIndex === 7 ? (
                                        <AiFillCaretUp
                                            className={`lg:text-[1.5em] text-[1em]`}/>
                                    ) : (
                                        <AiFillCaretDown
                                            className={`lg:text-[1.5em] text-[1em]`}/>
                                    )}
                                </button>
                                {webIndex === 7 && (
                                    <p className="mt-4 text-[0.873em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                        While custom ERP development requires higher initial investment compared to
                                        commercial software licensing, the total cost of ownership over the system
                                        lifecycle typically proves significantly more economical when accounting for
                                        perpetual licensing fees, annual maintenance contracts, user-based pricing that
                                        increases with organizational growth, mandatory upgrade costs, customization
                                        charges for vendor modifications, integration expenses for third-party
                                        connectors, consultant fees for implementation and support, and opportunity
                                        costs from operational limitations and workarounds required by packaged
                                        solutions. Custom development eliminates recurring vendor payments, provides
                                        ownership of a depreciable asset, scales economically without per-user licensing
                                        increases, accommodates modifications and enhancements at actual development
                                        costs rather than vendor premium rates, and delivers precisely the functionality
                                        you need without paying for unused features or unnecessary complexity. The
                                        ability to extend system lifespan through incremental modernization rather than
                                        complete replacement, flexibility to choose cost-effective hosting and
                                        infrastructure options, and elimination of vendor-imposed upgrade cycles that
                                        disrupt operations and consume IT resources contribute to superior long-term
                                        financial efficiency. Organizations typically achieve return on custom ERP
                                        investment within three to five years while gaining strategic capabilities,
                                        operational advantages, and competitive differentiation that deliver ongoing
                                        value far exceeding the software investment.
                                    </p>
                                )}
                            </div>
                            <div
                                className={`w-full border-b pb-6 mt-6`}>
                                <button
                                    onClick={() => toggleWeb(8)}
                                    className="flex mt-6 items-center justify-between w-full text-start lg:text-[1.6em] md:text-[1.5em] sm:text-base font-medium focus:outline-none"
                                >
                                    <span className={'capitalize'}>Rapid Response To Business Changes</span>
                                    {webIndex === 8 ? (
                                        <AiFillCaretUp
                                            className={`lg:text-[1.5em] text-[1em]`}/>
                                    ) : (
                                        <AiFillCaretDown
                                            className={`lg:text-[1.5em] text-[1em]`}/>
                                    )}
                                </button>
                                {webIndex === 8 && (
                                    <p className="mt-4 text-[0.873em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                        Custom ERP platforms provide organizational agility to quickly adapt to market
                                        shifts, regulatory changes, competitive pressures, strategic pivots, mergers and
                                        acquisitions, new business models, and operational innovations without the
                                        delays, limitations, and costs associated with modifying commercial software or
                                        waiting for vendor roadmaps to address your requirements. When business needs
                                        change, your development team can rapidly implement new features, modify
                                        workflows, create custom reports, add integrations, adjust business rules, and
                                        deploy enhancements on your timeline rather than submitting change requests to
                                        software vendors, waiting for scheduled releases, or accepting workarounds that
                                        compromise operational efficiency. This responsiveness proves invaluable during
                                        critical business events including company acquisitions requiring rapid system
                                        consolidation, market disruptions demanding new operational capabilities,
                                        regulatory changes requiring compliance modifications, competitive threats
                                        necessitating process improvements, or strategic opportunities requiring quick
                                        technology enablement. The ability to evolve your ERP system at the pace of
                                        business change rather than the pace of vendor development cycles provides
                                        strategic flexibility and operational resilience that enables your organization
                                        to capitalize on opportunities, mitigate risks, and adapt to dynamic market
                                        conditions more effectively than competitors constrained by inflexible
                                        commercial software platforms.
                                    </p>
                                )}
                            </div>
                            <div
                                className={`w-full`}>
                                <button
                                    onClick={() => toggleWeb(9)}
                                    className="flex mt-6 items-center justify-between w-full text-start lg:text-[1.6em] md:text-[1.5em] sm:text-base font-medium focus:outline-none"
                                >
                                    <span className={'capitalize'}>Optimized Performance For Your Workload</span>
                                    {webIndex === 9 ? (
                                        <AiFillCaretUp
                                            className={`lg:text-[1.5em] text-[1em]`}/>
                                    ) : (
                                        <AiFillCaretDown
                                            className={`lg:text-[1.5em] text-[1em]`}/>
                                    )}
                                </button>
                                {webIndex === 9 && (
                                    <p className="mt-4 text-[0.873em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                        Custom ERP architecture is optimized specifically for your transaction volumes,
                                        data structures, usage patterns, performance requirements, and technical
                                        constraints rather than relying on generic database designs and application
                                        architectures that attempt to serve diverse markets with varying needs. Our
                                        performance engineering approach analyzes your specific operational
                                        characteristics including peak transaction periods, concurrent user loads, data
                                        volume growth projections, reporting requirements, batch processing needs, and
                                        integration demands to architect database schemas, indexing strategies, caching
                                        mechanisms, query optimization, and application logic that deliver optimal
                                        responsiveness for your actual workload. This targeted optimization eliminates
                                        performance bottlenecks common in commercial software where generic designs
                                        create inefficiencies for specific use cases, ensures consistent response times
                                        during critical operational periods, supports real-time data processing for
                                        time-sensitive decisions, handles complex analytical queries without impacting
                                        transactional performance, and provides headroom for growth without degradation.
                                        Performance tuning continues throughout the system lifecycle as usage patterns
                                        evolve, enabling ongoing optimization that maintains excellent user experience,
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
                className={`lg:py-[2em] md:py-[2em] py-[1em] ${isDayTime ? 'bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900' : 'bg-gradient-to-br from-slate-100 via-slate-400 to-slate-700'}`}>
                <div id={'our-custom-enterprise-software-development-process'}
                     className={`relative lg:top-10 py-16 lg:mb-20 mb-10 max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>

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
              className="text-[8rem] sm:text-[8rem] lg:text-[12rem] xl:text-[12rem] font-bold text-white whitespace-nowrap">
            ERP Systems
          </span>
                        </div>

                        {/* Circuit Pattern Watermark - Around Center */}
                        <div className="absolute w-[600px] h-[600px] opacity-20">
                            <svg className="w-full h-full" viewBox="0 0 600 600" fill="none">
                                <circle cx="300" cy="300" r="200" stroke="currentColor" strokeWidth="2"
                                        className="text-teal-300"/>
                                <circle cx="300" cy="300" r="150" stroke="currentColor" strokeWidth="2"
                                        className="text-teal-300"/>
                                <circle cx="300" cy="300" r="100" stroke="currentColor" strokeWidth="2"
                                        className="text-teal-300"/>
                                <circle cx="300" cy="100" r="40" stroke="currentColor" strokeWidth="2"
                                        className="text-teal-300"/>
                                <circle cx="500" cy="300" r="40" stroke="currentColor" strokeWidth="2"
                                        className="text-teal-300"/>
                                <circle cx="300" cy="500" r="40" stroke="currentColor" strokeWidth="2"
                                        className="text-teal-300"/>
                                <circle cx="100" cy="300" r="40" stroke="currentColor" strokeWidth="2"
                                        className="text-teal-300"/>
                                <line x1="300" y1="300" x2="300" y2="100" stroke="currentColor" strokeWidth="1"
                                      className="text-teal-300"/>
                                <line x1="300" y1="300" x2="500" y2="300" stroke="currentColor" strokeWidth="1"
                                      className="ttext-teal-300"/>
                                <line x1="300" y1="300" x2="300" y2="500" stroke="currentColor" strokeWidth="1"
                                      className="text-teal-300"/>
                                <line x1="300" y1="300" x2="100" y2="300" stroke="currentColor" strokeWidth="1"
                                      className="text-teal-300"/>
                            </svg>
                        </div>
                    </div>
                    <div>
                        {/* Our Custom Enterprise Software Development Process */}
                        <div
                            className={`${isDayTime ? 'text-white' : 'text-black'} border-b-[1px] lg:pb-[3em] md:pb-[3em] pb-[1em] mb-20 text-center`}>
                            <h2 className="capitalize text-[1.8em] md:text-[3em] lg:text-[3.3em] font-[700] tracking-tight leading-[1.2] lg:pb-6">
                                Our <span className={'text-[#0ef0dd]'}>Custom Enterprise <br
                                className={'lg:block md:block hidden'}/>Software</span> Development Process
                            </h2>
                            <p className="mx-auto mt-4 max-w-6xl text-[0.87em] leading-relaxed ">
                                As a leading ERP solutions provider, we develop comprehensive software modules designed
                                to
                                optimize your operational workflows and drive measurable performance improvements. Our
                                modular approach enables precise customization to address your enterprise&#39;s specific
                                requirements and industry challenges.<br/><br/>
                                Our methodology encompasses critical business functions including financial management,
                                supply chain optimization, human capital management, and customer relationship
                                management.
                                Each module features enterprise-grade scalability and seamless interoperability across
                                departments, delivering targeted functionality that enhances efficiency and empowers
                                strategic decision-making for sustained competitive advantage.
                            </p>
                        </div>

                        {/* Process Steps */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-start max-w-7xl mx-auto">
                            {/* Left Side - Step Titles */}
                            <div className="space-y-4 lg:space-y-6">
                                {processSteps.map((step, index) => (
                                    <div
                                        key={index}
                                        onClick={() => setActiveStep(index)}
                                        className={`cursor-pointer transition-all duration-300 ${
                                            activeStep === index
                                                ? 'transform scale-105'
                                                : 'hover:transform hover:scale-102'
                                        }`}
                                    >
                                        <div className="flex items-center space-x-4">
                                            <div
                                                className={`w-0.5 h-8 sm:h-14 rounded-r-full transition-all duration-300 ${
                                                    activeStep === index
                                                        ? 'bg-teal-300'
                                                        : 'bg-gray-600'
                                                }`}
                                            />
                                            <h3
                                                className={`text-2xl sm:text-3xl lg:text-4xl font-bold transition-colors duration-300 ${
                                                    activeStep === index
                                                        ? 'text-teal-300'
                                                        : 'text-white'
                                                }`}
                                            >
                                                {step.title}
                                            </h3>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Right Side - Content */}
                            <div
                                className="bg-slate-800/30 backdrop-blur-xs rounded-2xl p-6 sm:p-8 border-l-5 border-t-5 border-teal-300 min-h-[300px] lg:min-h-[400px] md:-ml-32 lg:-ml-52">
                                <div className="space-y-4 sm:space-y-6">
                                    {processSteps[activeStep].content.map((paragraph, index) => (
                                        <p
                                            key={index}
                                            className="text-[0.9em] text-gray-300 leading-relaxed"
                                        >
                                            {paragraph}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Mobile Step Indicators */}
                        <div className="flex justify-center mt-8 lg:hidden space-x-2">
                            {processSteps.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveStep(index)}
                                    className={`h-2 rounded-full transition-all duration-300 ${
                                        activeStep === index
                                            ? 'w-8 bg-teal-300'
                                            : 'w-2 bg-gray-600'
                                    }`}
                                    aria-label={`Go to step ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>

                </div>
            </div>


            {/* Footer now provided globally by app/layout.tsx — duplicate render disabled to fix doubled footer */ false && <Footer/>}
        </div>
    );
};

export default ErpDevelopment;