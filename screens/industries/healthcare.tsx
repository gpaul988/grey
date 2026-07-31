'use client';
import React, {useEffect, useRef, useState} from 'react';
import '@/app/globals.css'
import Link from "next/link";
import Image from "next/image";
import {AiFillCaretDown, AiFillCaretUp, AiOutlineMinus, AiOutlinePlus} from "react-icons/ai";
import {FaCode, FaPencilRuler, FaRocket, FaSearch, FaShieldAlt, FaVial,} from "react-icons/fa";
import {AnimatePresence, motion, useScroll, useTransform} from "framer-motion";
import {useIsDayTime} from '../../components/useIsDayTime';

import ResponsiveVideoHero from '@/components/ResponsiveVideoHero';

import FuturisticIndustryLayout from '@/components/futuristic/FuturisticIndustryLayout';// Reasons

import {
    FxBackground,
    FxChip,
    FxReveal,
    FxButton,
    FxHoloCard,
    FxCard,
    FxStickyScrollSection,
    FxOrbit
} from '@/components/futuristic/fx';

const reasons = [
    {
        id: 1,
        title: (
            <>Healthcare Software Modernization</>
        ),
        description: (
            <>
                We deliver end-to-end healthcare software modernization and re-engineering services designed to maximize
                the performance, security, and functionality of legacy systems. Through a thorough audit process, we
                identify technical gaps, compliance risks, and improvement opportunities, ensuring your software meets
                current industry standards and regulatory requirements. Our expertise spans cloud migration, performance
                optimization, advanced security enhancements, seamless multi-system integrations, and intuitive
                interface redesign -enabling healthcare organizations to unlock new capabilities, streamline operations,
                and provide a more secure, efficient, and future-ready technology infrastructure that supports both
                clinical excellence and business growth.
            </>
        ),
        images: ['/assets/health/healthcare software modernization.png']
    },
    {
        id: 2,
        title: (
            <>Custom Healthcare Software Development</>
        ),
        description: (
            <>
                Every healthcare organization operates with distinct objectives, workflows, and challenges, which is why
                we specialize in delivering fully customized healthcare IT solutions that align precisely with your
                vision and operational needs. Our end-to-end software development services encompass the full lifecycle
                of web, desktop, and mobile application development -from initial consultation, requirements gathering,
                and architecture design to coding, rigorous testing, deployment, and ongoing support. Whether you
                require a complex medical platform built from the ground up, an MVP to validate your concept, or the
                enhancement and scaling of an existing solution, we ensure every stage is executed with technical
                excellence, regulatory compliance, and a clear focus on delivering secure, high-performance
                applications. The result is a tailored, future-ready product that accelerates market entry, drives
                operational efficiency, and supports superior patient care.
            </>
        ),
        images: ['/assets/health/custom healthcare software development.png']
    },
    {
        id: 3,
        title: (
            <>AI & Machine Learning Development for Healthcare</>
        ),
        description: (
            <>
                We leverage advanced AI and machine learning algorithms to identify complex data patterns and generate
                predictive insights that support accurate diagnostics, personalized treatment plans, and effective
                chronic disease management. Our expertise spans the entire machine learning development lifecycle for
                healthcare, including data mining, establishing robust and secure infrastructure, and designing,
                customizing, and training ML models to meet specific clinical and operational goals. By integrating
                these intelligent solutions into healthcare workflows, we empower providers to enhance patient care,
                improve clinical decision-making, optimize resource utilization, and achieve measurable outcomes with
                greater precision and efficiency.
            </>
        ),
        images: ['/assets/health/ai and machine learning development for healthcare.png']
    },
    {
        id: 4,
        title: (
            <> Third-party Software Integrations</>
        ),
        description: (
            <>
                We provide seamless integration services that connect healthcare software with third-party systems and
                APIs, including LIMS/LIS platforms, patient portals, EHR/EMR systems, databases, and other critical
                applications. Our approach ensures secure, reliable data exchange through well-structured processing
                pipelines, maintaining strict compliance with HIPAA and other relevant data protection regulations. In
                addition, we enable direct integration with laboratory equipment, medical devices, and other data
                sources, ensuring real-time, accurate information flow that enhances interoperability, streamlines
                operations, and supports more informed, data-driven clinical and administrative decision-making.
            </>
        ),
        images: ['/assets/health/third-party software integrations.png']
    },
    {
        id: 5,
        title: (
            <>Healthcare e-Commerce Functionality</>
        ),
        description: (
            <>
                Expanded eCommerce capabilities are essential for effectively promoting healthcare services, engaging
                patients, and broadening your market reach. Our experienced engineers specialize in designing,
                developing, and integrating tailored healthcare eCommerce solutions that streamline service offerings,
                enable secure online transactions, and improve patient access. By leveraging these advanced
                functionalities, we help healthcare providers strengthen their market position, drive revenue growth,
                and deliver a seamless digital experience that meets the evolving expectations of today’s patients.
            </>
        ),
        images: ['/assets/health/healthcare ecommerce functionality.jpg']
    },
    {
        id: 6,
        title: (
            <>Healthcare Product Development</>
        ),
        description: (
            <>
                Our healthcare development experts partner with you to translate your vision into effective, scalable
                solutions that meet the dynamic needs of the healthcare industry. By leveraging industry insights and
                technical expertise, we guide you through the entire development process -whether launching a minimum
                viable product (MVP) to validate your concept, enhancing and updating existing applications to improve
                functionality and user experience, or seamlessly integrating new features to stay ahead of market
                trends. Our collaborative, user-focused approach ensures that your software remains aligned with
                evolving patient and provider preferences, regulatory requirements, and technological advancements,
                ultimately positioning your organization for sustained success and growth in a highly competitive
                landscape.
            </>
        ),
        images: ['/assets/health/healthcare product development.jpg']
    },
    {
        id: 7,
        title: (
            <>Technical Consulting</>
        ),
        description: (
            <>
                With extensive expertise in medical software development, our team identifies the most suitable
                healthcare IT solutions and delivers a clear, strategic implementation roadmap with defined milestones
                and timelines. We conduct a thorough analysis of your business case, assessing operational needs,
                regulatory requirements, and stakeholder priorities to design a technology stack that effectively
                addresses challenges and aligns with your objectives. By combining the right mix of innovative tools,
                proven frameworks, and industry best practices, we ensure the delivery of solutions that drive
                efficiency, enhance patient care, and support sustainable business growth.
            </>
        ),
        images: ['/assets/health/technical consulting.png']
    },
    {
        id: 8,
        title: (
            <>Healthcare Management System (HMS) Development</>
        ),
        description: (
            <>
                A fully customizable hospital management system enables healthcare organizations to optimize internal
                workflows, improve resource allocation, and enhance overall operational efficiency across clinical,
                administrative, and financial departments. Our team provides end-to-end support in selecting the most
                suitable HMS tailored to your organization’s unique requirements, managing the deployment process, and
                fine-tuning system configurations to maximize performance and user adoption. We also design and
                implement a secure, scalable IT infrastructure that protects sensitive patient and organizational data,
                ensuring strict compliance with healthcare regulations such as HIPAA. By combining advanced technology
                with best practices in data security and system integration, we help you build a resilient, future-proof
                platform that drives operational excellence and supports superior patient care.

            </>
        ),
        images: ['/assets/health/hms.jpg']
    },
];

const Healthcare = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isBackgroundActive, setIsBackgroundActive] = useState(false);
    const [activeId, setActiveId] = useState<string>("");
    const [activeIndex, setActiveIndex] = useState(0);
    const [activeAcc, setActiveAcc] = useState<number | null>(null);
    const [isDesktop, setIsDesktop] = useState(false);
    // x-scroller
    const targetRef = useRef<HTMLDivElement | null>(null);
    const {scrollYProgress} = useScroll({target: targetRef});
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-83%"]);

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
            "RDSS",
            "MPMS",
            "HMS",
            "PPMS",
            "HMAS",
            "APDAS",
            "FWS",
            "THP",
            "EHR",
            "PMS",
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

    // Our Capabilities
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prevIndex) => (prevIndex + 1) % reasons.length);
        }, 5000); // 5000ms = 5 seconds
        return () => clearInterval(interval);
    }, []);

    // Trends in healthcare software development services
    const [webIndex, setWebIndex] = useState<number | null>(null);

    const toggleWeb = (index: number) => {
        setWebIndex(webIndex === index ? null : index);
    }

    // Accordion
    const steps = [
        {
            number: "01",
            title: "DISCOVERY & STRATEGY",
            heading: "Discovery & Strategy",
            description: (<>
                We start by gaining a comprehensive understanding of your vision, business goals, and target users to
                lay the foundation for a successful healthcare application. Through detailed research, stakeholder
                collaboration, and market analysis, we define project objectives, identify key features, and map out a
                tailored development strategy. This ensures the final product not only meets user expectations and
                regulatory requirements but also aligns seamlessly with your long-term growth and competitive advantage
                in the healthcare sector.
            </>),
            icon: <FaSearch/>,
        },
        {
            number: "02",
            title: "COMPLIANCE-FIRST PLANNING",
            heading: "Compliance-First Planning",
            description: (<>
                From the very beginning, we integrate HIPAA, HL7, and all relevant regulatory requirements into every
                stage of the planning process -ensuring compliance is not an afterthought but a foundational element.
                Our
                approach eliminates risks, avoids costly rework, and guarantees that your healthcare application meets
                strict industry standards for security, privacy, and interoperability. By embedding compliance into the
                core architecture and workflows, we deliver solutions that inspire trust, protect sensitive data, and
                stand up to rigorous audits without unexpected issues or compromises.
            </>),
            icon: <FaShieldAlt/>,
        },
        {
            number: "03",
            title: "UI/UX DESIGN",
            heading: "UI/UX Design",
            description: (<>
                We create interfaces that are not only visually clean and modern but also highly intuitive, ensuring
                ease of use for both patients and healthcare providers. By applying user-centered design principles, we
                balance aesthetic appeal with functional clarity, streamlining navigation and reducing cognitive load.
                Our design process incorporates user research, wireframing, and prototyping to validate workflows and
                optimize every interaction. The result is a healthcare application that enhances engagement, improves
                accessibility, and delivers a seamless experience across all devices -fostering satisfaction, trust, and
                long-term adoption.
            </>),
            icon: <FaPencilRuler/>,
        },
        {
            number: "04",
            title: "AGILE DEVELOPMENT",
            heading: "Agile Development",
            description: (<>
                We leverage agile methodologies to deliver healthcare applications that are scalable, secure, and
                high-performing, using modern frameworks and clean, maintainable code. Our iterative approach promotes
                flexibility, allowing us to adapt quickly to evolving requirements while maintaining strict quality
                standards. By breaking development into manageable sprints, we ensure continuous progress, early
                feedback integration, and rapid delivery of functional features. This process not only accelerates
                time-to-market but also results in robust, future-ready healthcare solutions optimized for performance,
                security, and long-term scalability.
            </>),
            icon: <FaCode/>,
        },
        {
            number: "05",
            title: "TESTING & QA",
            heading: "Testing & QA",
            description: (<>
                We conduct rigorous, end-to-end testing to validate every interaction, workflow, and data exchange under
                real-world healthcare scenarios. Our QA process covers functional, usability, performance,
                interoperability, and security testing to ensure the application operates flawlessly across devices,
                platforms, and network conditions. By simulating actual user environments and clinical use cases, we
                identify and resolve issues before launch, safeguarding against downtime, errors, and compliance risks.
                The result is a reliable, secure, and high-performing healthcare solution that delivers consistent
                excellence from the first click to ongoing daily use.
            </>),
            icon: <FaVial/>,
        },
        {
            number: "06",
            title: "LAUNCH & SUPPORT",
            heading: "Launch & Support",
            description: (<>
                We conduct rigorous, end-to-end testing to validate every interaction, workflow, and data exchange under
                real-world healthcare scenarios. Our QA process covers functional, usability, performance,
                interoperability, and security testing to ensure the application operates flawlessly across devices,
                platforms, and network conditions. By simulating actual user environments and clinical use cases, we
                identify and resolve issues before launch, safeguarding against downtime, errors, and compliance risks.
                The result is a reliable, secure, and high-performing healthcare solution that delivers consistent
                excellence from the first click to ongoing daily use.
            </>),
            icon: <FaRocket/>,
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

    // Top Features for Medical Software & Apps
    const [activeTab, setActiveTab] = useState("Patient App");
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const features: Record<string, { title: React.ReactNode; content: React.ReactNode }[]> = {
        "Patient App": [
            {
                title: "Scheduling Appointments",
                content: (
                    <>
                        Eliminate the frustration of long wait times and complicated scheduling with our innovative
                        doctor appointment app development solutions. Designed with both patients and providers in mind,
                        our applications streamline the entire booking process, offering real-time availability,
                        automated reminders, and seamless calendar integration. This ensures patients can easily
                        schedule appointments at their convenience while healthcare professionals optimize their time
                        and reduce administrative burdens. The result is a smoother, more efficient system that enhances
                        accessibility, improves patient satisfaction, and strengthens the overall care experience.
                    </>
                ),
            },
            {
                title: "Patient Educational Reminders",
                content: (<>
                    We prioritize comprehensive care by seamlessly integrating patient education resources and
                    personalized reminders into our healthcare applications. These features empower patients with
                    accessible, easy-to-understand information about their conditions, treatments, and wellness plans
                    while providing timely notifications to support medication adherence, appointment attendance, and
                    healthy lifestyle habits. By combining education with proactive engagement, we help improve patient
                    outcomes, strengthen provider-patient relationships, and promote a more informed, compliant, and
                    health-conscious patient community.
                </>),
            },
            {
                title: "Patient-Generated Data Tracking",
                content: (<>
                    As pioneers in healthcare application development, we uphold the highest standards of
                    confidentiality, reliability, and compliance in every solution we deliver. Our applications are
                    designed with a strong focus on patient safety and clinical efficacy, ensuring they meet the
                    stringent requirements of the healthcare industry. Guided by the International Medical Device
                    Regulators Forum’s (IMDRF) Software as a Medical Device (SaMD) risk categories, we incorporate
                    robust risk management frameworks, secure data handling practices, and rigorous validation
                    processes. This commitment allows us to provide innovative, dependable healthcare applications that
                    not only enhance patient outcomes but also maintain full regulatory alignment and industry trust.
                </>),
            },
            {
                title: "In-App Communication",
                content: (<>
                    Our medical app development process integrates advanced capabilities for capturing and analyzing
                    patient-generated health data, enabling providers to gain deeper insights into individual health
                    conditions and progress. By leveraging this data, healthcare professionals can design highly
                    personalized treatment plans tailored to each patient’s unique needs, improving accuracy, adherence,
                    and overall effectiveness of care. Beyond individualized treatment, the continuous flow of real-time
                    patient data enhances clinical decision-making, supports preventive strategies, and contributes to
                    superior healthcare outcomes through more informed, data-driven insights.
                </>),
            },
            {
                title: "Prescription Upload",
                content: (<>
                    Our pharmacy app developers specialize in building secure and intuitive prescription upload features
                    that streamline the medication management process within telemedicine applications. By enabling
                    patients to easily upload prescriptions directly through the app, we simplify access to necessary
                    medications, reduce administrative effort, and enhance the overall efficiency of pharmacy workflows.
                    This functionality not only improves patient convenience and adherence but also strengthens the
                    integration between telemedicine services and pharmacy operations, ensuring a seamless, reliable,
                    and patient-centered healthcare experience.
                </>),
            },
            {
                title: "Secure Payment Gateways",
                content: (<>
                    Our telemedicine app development solutions are designed to support secure, convenient, and seamless
                    payment processing across multiple platforms, ensuring both patients and providers benefit from a
                    streamlined financial experience. We integrate trusted payment gateways with advanced encryption and
                    compliance measures to protect sensitive financial data while enabling diverse payment options such
                    as credit cards, digital wallets, and insurance claims. By simplifying billing and reducing
                    administrative complexities, our solutions enhance patient convenience, improve provider efficiency,
                    and foster trust through safe, transparent, and hassle-free transactions.
                </>),
            },
        ],
        "Hospital and Clinic Panel": [
            {
                title: 'Health Activity Tracking',
                content: (<>
                    Our healthcare app solutions incorporate comprehensive health activity tracking features that
                    empower users to actively monitor and manage their well-being on a daily basis. By capturing key
                    metrics such as physical activity, sleep patterns, heart rate, and other vital signs, these tools
                    provide patients with valuable insights into their overall health and lifestyle habits. Integrated
                    analytics and personalized dashboards transform raw data into actionable recommendations,
                    encouraging healthier choices and proactive self-care. This functionality not only enhances patient
                    engagement but also supports providers in tailoring treatment plans, leading to improved long-term
                    outcomes and a more connected, preventive approach to healthcare.
                </>),
            },
            {
                title: "Electronic Health Record (EHR) Systems",
                content: (<>
                    Our medical app developers design and build flexible, secure, and fully compliant Electronic Health
                    Record (EHR) systems that streamline the management of patient health information while enhancing
                    the quality and continuity of care. These solutions ensure safe data storage, seamless access, and
                    interoperability across healthcare providers, enabling efficient information exchange and reducing
                    administrative burdens. By centralizing patient records and integrating them with clinical
                    workflows, our EHR systems support accurate diagnostics, personalized treatment plans, and improved
                    patient outcomes, all while maintaining strict adherence to healthcare regulations and data privacy
                    standards.
                </>),
            },
            {
                title: "Staff Management",
                content: (<>
                    Our healthcare mobile app development services include advanced staff management solutions designed
                    to help healthcare organizations optimize workforce scheduling, streamline administrative processes,
                    and improve overall staff performance. These tools enable efficient allocation of resources, shift
                    planning, attendance tracking, and real-time communication between team members, ensuring that the
                    right personnel are available when and where they are needed most. By reducing scheduling conflicts,
                    enhancing transparency, and providing actionable performance insights, our solutions empower
                    healthcare providers to maximize productivity, minimize operational inefficiencies, and maintain a
                    high standard of patient care.
                </>),
            },
            {
                title: "Inventory Management",
                content: (<>
                    Our medical software development solutions feature robust inventory management capabilities designed
                    to ensure that hospitals, clinics, and healthcare facilities consistently maintain the right levels
                    of medical supplies and equipment. These systems provide real-time tracking, automated stock alerts,
                    and usage analytics, enabling staff to anticipate shortages, reduce waste, and streamline
                    procurement processes. By optimizing inventory management, our solutions help healthcare
                    organizations maintain operational efficiency, prevent treatment delays, control costs, and support
                    uninterrupted, high-quality patient care.
                </>),
            },
            {
                title: "Reporting and Analytics",
                content: (<>
                    We provide comprehensive reporting and analytics solutions that empower hospitals and clinics to
                    make data-driven decisions with confidence. By collecting, aggregating, and analyzing patient data,
                    our systems generate actionable insights into clinical outcomes, operational efficiency, and
                    resource utilization. These detailed reports enable healthcare providers to identify trends,
                    optimize workflows, improve patient care, and support strategic planning. By transforming raw data
                    into meaningful intelligence, our solutions enhance decision-making, promote evidence-based
                    practices, and drive continuous improvement across healthcare organizations.
                </>),
            },
            {
                title: "Telemedicine Integration",
                content: (<>
                    Our telemedicine solutions are engineered for seamless integration with existing healthcare systems,
                    enabling smooth and efficient remote patient consultations, follow-ups, and care coordination. By
                    connecting securely with electronic health records, scheduling platforms, and communication tools,
                    these solutions ensure continuity of care while maintaining data privacy and regulatory compliance.
                    This integration allows healthcare providers to deliver timely, personalized, and accessible care,
                    reduce administrative burdens, and enhance patient engagement, ultimately improving clinical
                    outcomes and operational efficiency.
                </>),
            },
        ],
        "Apps For Medical Professionals": [
            {
                title: "Clinical Decision Support",
                content: (<>
                    Our healthcare practitioner applications are designed to provide robust clinical decision support,
                    equipping medical professionals with real-time insights and evidence-based recommendations. By
                    analyzing patient data and highlighting critical trends, these applications enhance diagnostic
                    accuracy, treatment planning, and timely intervention. This empowers healthcare providers to deliver
                    precise, efficient, and informed care, ultimately improving patient outcomes, reducing errors, and
                    supporting a higher standard of clinical excellence.
                </>),
            },
            {
                title: "Medical Record Management",
                content: (<>
                    Our medical applications are designed to provide secure, efficient, and compliant management of
                    patient health records, ensuring that healthcare professionals can access critical information
                    quickly and reliably. By centralizing data storage, implementing robust encryption, and enabling
                    streamlined retrieval, these solutions support accurate diagnostics, informed treatment decisions,
                    and seamless care coordination. This approach not only safeguards sensitive patient information but
                    also enhances workflow efficiency, reduces administrative burdens, and contributes to improved
                    patient outcomes across healthcare settings.
                </>),
            },
            {
                title: "Secure Communication Channels",
                content: (<>
                    Our medical practitioner applications feature secure, encrypted communication channels that
                    facilitate seamless collaboration among healthcare teams. By enabling real-time messaging, file
                    sharing, and coordinated care planning within a protected environment, these solutions enhance
                    teamwork, reduce miscommunication, and support faster, more informed clinical decisions. This secure
                    and efficient communication framework ultimately contributes to improved patient outcomes,
                    streamlined workflows, and a more connected, responsive healthcare delivery system.
                </>),
            },
            {
                title: "Research and Data Collection Tools",
                content: (<>
                    Our healthcare solutions are designed to streamline research and data collection, equipping medical
                    professionals with advanced tools to gather, organize, and analyze critical clinical information. By
                    enabling efficient data management and real-time insights, these solutions support evidence-based
                    studies, clinical trials, and population health research. This empowers healthcare organizations to
                    advance medical knowledge, drive innovation, and make informed decisions that improve patient care,
                    optimize treatment protocols, and contribute to the broader development of the healthcare industry.
                </>),
            },
            {
                title: "Remote Monitoring Solutions",
                content: (<>
                    Our healthcare applications offer comprehensive remote monitoring solutions that allow medical
                    professionals to continuously track patient health metrics and progress in real time. By collecting
                    and analyzing vital signs, activity levels, and other relevant data, these tools enable clinicians
                    to detect early warning signs, intervene proactively, and adjust treatment plans as needed. This
                    capability enhances patient safety, supports timely clinical decision-making, reduces hospital
                    visits, and promotes more personalized, effective, and proactive care management.
                </>),
            },
            {
                title: "Compliance and Reporting Tools",
                content: (<>
                    We design and develop comprehensive compliance and reporting tools that help healthcare
                    professionals adhere to regulatory standards while maintaining high-quality patient care. These
                    solutions automate data collection, track key performance indicators, and generate accurate,
                    audit-ready reports, ensuring transparency and accountability. By simplifying compliance processes
                    and providing actionable insights, our tools enable healthcare organizations to minimize regulatory
                    risks, streamline administrative tasks, and focus on delivering safe, efficient, and
                    patient-centered care.
                </>),
            },
        ],
    };

    const images: Record<string, string[]> = {
        "Patient App": ["/assets/health/patient_app.jpg"],
        "Hospital and Clinic Panel": ["/assets/health/hospital_clinic.jpg"],
        "Apps For Medical Professionals": ["/assets/health/professional.jpg"],
    };
    return (
        <div
            style={( { ['--page-accent']: '#2dd4bf', ['--page-accent-rgb']: '45, 212, 191' } as React.CSSProperties & Record<string, string> )}
            className={`${isDayTime ? 'bg-gradient-to-b from-teal-50 to-white' : 'bg-[#001f24]'} min-h-screen`}>

            {/* Unified Futuristic Healthcare Hero - Background Image/Video with overlay */}
            <section className="relative overflow-hidden lg:w-full lg:min-h-[90vh] lg:h-[720px] w-full h-[600px]">
                {/* Video Background (desktop) and Image fallback (mobile) */}
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="hidden lg:block absolute inset-0 w-full h-full object-cover"
                    poster="/assets/health/hero.jpg"
                    style={{mixBlendMode: 'multiply', opacity: 0.85}}
                >
                    <source src="/assets/health/hero.webm" type="video/webm"/>
                </video>

                <Image
                    src="/assets/health/hero.jpg"
                    alt="Healthcare Hero"
                    fill
                    priority
                    className="lg:hidden object-cover"
                />

                {/* Grid & FX Background */}
                <div className="pointer-events-none absolute inset-0 z-[1]">
                    {/* Use day visuals for FxBackground so colors are brighter and teal-friendly */}
                    <FxBackground day={true} grid={true} aurora={true}/>
                </div>

                {/* Unified Healthcare Gradient Overlay (teal tones) — stronger to fully tint media */}
                <div
                    className="absolute inset-0 bg-gradient-to-r from-[#013a36]/95 via-[#026d68]/85 to-[#028b82]/70 z-[2] mix-blend-multiply opacity-95"/>
                <div
                    className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(45,212,191,0.22),transparent_60%)] z-[2] mix-blend-screen opacity-95"/>

                {/* Futuristic FX Elements */}
                <div className="pointer-events-none absolute inset-0 z-[3]">
                    <div className="gx-scanline" style={{opacity: 0.5}}/>
                    <div className="gx-noise-overlay" style={{opacity: 0.4}}/>
                    <div className="gx-orbit absolute"
                         style={{
                             width: '60vmax',
                             height: '60vmax',
                             top: '-20vmax',
                             right: '-20vmax',
                             opacity: .14,
                             background: 'radial-gradient(circle, rgba(45,212,191,0.12), transparent)'
                         }}/>
                </div>

                {/* Content Container */}
                <div className="absolute inset-0 flex items-center top-32 z-[11] px-6 sm:px-6 md:px-10 lg:px-[4.5em]">
                    <div className="w-full grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <div>
                            <div className="flex items-center gap-3 mb-6 lg:mb-8">
                                <div className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-pulse"/>
                                <span
                                    className="text-teal-400 text-[0.7em] lg:text-[0.82em] uppercase tracking-[0.22em] font-[600]">Healthcare</span>
                            </div>

                            <h1 className="text-white text-[2em] lg:text-[4.5em] font-[700] leading-[1.08] tracking-tight mb-6 lg:mb-8">
                                Secure, Compliant <span
                                className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-teal-600">Healthcare Software</span> that
                                Scales
                            </h1>

                            <p className="text-white/70 text-[0.85em] lg:text-[1.08em] leading-[1.65] mb-8 lg:mb-10 font-[300]">
                                Modern healthcare systems engineered for privacy, interoperability, and superior patient
                                outcomes.
                                From EMR integrations to AI-assistive workflows — built for compliance and performance.
                            </p>

                            <div className="flex flex-wrap gap-2 mb-10 lg:mb-12">
                                {['EHR/EMR', 'HIPAA Compliance', 'Cloud Migration', 'AI/ML'].map((badge) => (
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
                                        <span className="relative">Get a Consultation →</span>
                                    </button>
                                </Link>
                                <Link href="/industries/healthcare#contact">
                                    <button
                                        className="px-8 py-3 rounded-full text-[0.85em] lg:text-[0.88em] font-semibold text-white/70 hover:text-white transition-all duration-300 hover:bg-white/10 whitespace-nowrap"
                                        style={{border: `1px solid rgba(255,255,255,0.15)`}}>
                                        Learn More
                                    </button>
                                </Link>
                            </div>
                        </div>

                        {/* Right Column - Impact Stats */}
                        <div className="hidden lg:flex flex-col items-end">
                            <div className="grid grid-cols-2 gap-6 w-full">
                                {[
                                    {label: 'Years Experience', value: '8+'},
                                    {label: 'Team Members', value: '13+'},
                                    {label: 'Products Launched', value: '123+'},
                                    {label: 'HIPAA Compliant', value: 'Yes'}
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
            </section>

            {/* Introductory section (futuristic style) */}
            <section
                ref={sectionRef}
                className={`pt-16 transition-colors duration-500 ${isBackgroundActive ? 'bg-[#013a36] text-white' : 'bg-gradient-to-b from-teal-50 to-white text-[#013a36]'}`}>
                <FxBackground day={isBackgroundActive}/>
                <div
                    className="relative z-10 grid lg:grid-cols-2 grid-cols-1 lg:gap-14 gap-6 lg:pt-20 pt-6 lg:pb-32 pb-6 mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em]">
                    <div>
                        <FxChip day={isBackgroundActive} colorScheme={'teal'}>HEALTHCARE EXCELLENCE</FxChip>
                    </div>

                    <div className="lg:-ml-[19em]">
                        <FxReveal>
                            <h3 className="lg:text-[3.5em] md:text-[3em] text-[2em] font-[700] tracking-tight leading-[1.15] mt-4">
                                Design Secure, <span
                                className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-teal-600">Patient-Centric</span> Healthcare
                                Systems
                            </h3>
                        </FxReveal>

                        <FxReveal delay={0.08}>
                            <div
                                className="grid lg:grid-cols-2 grid-cols-1 gap-6 mt-6 font-[300] text-justify text-[0.95em] md:text-[1.05em] leading-relaxed">
                                <div className="space-y-4">
                                    <p>
                                        Our approach blends clinical empathy, strong security controls, and
                                        interoperable
                                        architectures. We design solutions that prioritise patient safety, data privacy,
                                        and operational efficiency — from EMR integrations to telehealth platforms and
                                        AI-augmented workflows.
                                    </p>
                                    <p>
                                        We deliver practical, production-ready systems with clear SLAs, compliance
                                        documentation, and maintainable codebases to ensure long-term reliability and
                                        measurable clinical impact.
                                    </p>
                                    <div className="flex flex-wrap gap-3 mt-4">
                                        {['EHR Integration', 'Telehealth', 'Data Security', 'AI Assist'].map((p) => (
                                            <span key={p}
                                                  className={`${isBackgroundActive ? 'px-3 py-1 rounded-full bg-white/6 text-teal-200 border border-teal-300/10' : 'px-3 py-1 rounded-full bg-teal-100 text-[#013a36] border border-teal-200'}`}>{p}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <p>
                                        From discovery and architecture to deployment and support, Grey InfoTech
                                        builds solutions that adapt to clinical workflows and scale across
                                        organisations.
                                    </p>
                                    <p>
                                        Our teams ensure performance, accessibility, and audit-ready compliance to
                                        support clinicians and administrators with tools that enable better care.
                                    </p>
                                    <div className="flex flex-wrap gap-3 mt-4">
                                        {['HIPAA Compliance', 'Interoperability', 'Cloud-Native', 'Monitoring'].map((p) => (
                                            <span key={p}
                                                  className={`${isBackgroundActive ? 'px-3 py-1 rounded-full bg-white/6 text-teal-200 border border-teal-300/10' : 'px-3 py-1 rounded-full bg-teal-100 text-[#013a36] border border-teal-200'}`}>{p}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </FxReveal>
                    </div>
                </div>
            </section>

            {/* Futuristic showcase */}
            <section className={`${isDayTime ? 'bg-white' : 'bg-[#001f24]'} py-12 lg:py-20`}>
                <div id={'top'}
                     className={'relative lg:max-w-full w-full mx-auto h-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em]'}>
                    <FxCard day={isDayTime} glow className="relative overflow-hidden rounded-[2rem] p-6 sm:p-8 lg:p-10">
                        <div
                            className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(45,212,191,0.12),transparent_30%),linear-gradient(130deg,rgba(255,255,255,0.02),rgba(2,6,23,0.94))]"/>
                        <div className="absolute inset-0 border border-white/10 rounded-[2rem] pointer-events-none"/>
                        <div
                            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal-400/40 to-transparent"/>
                        <div
                            className="absolute right-6 top-6 h-24 w-24 rounded-full border border-teal-400/20 blur-3xl"/>
                        <div
                            className="absolute bottom-8 left-8 h-28 w-28 rounded-full border border-teal-400/15 blur-[90px]"/>
                        <div
                            className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.03)_50%,transparent_100%)]"/>
                        <div
                            className="absolute inset-0 bg-[linear-gradient(0deg,transparent_0%,rgba(255,255,255,0.02)_50%,transparent_100%)]"/>

                        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                            <div className="max-w-2xl">
                                <FxChip day={isDayTime} className="mb-4">HEALTHCARE SHOWCASE</FxChip>
                                <h3 className="text-[1.7em] sm:text-[2.2em] lg:text-[2.7em] font-[700] tracking-tight leading-[1.08] text-white">
                                    Showcasing secure, patient-centered interfaces and operational tooling.
                                </h3>
                                <p className="mt-4 max-w-xl text-[0.9em] sm:text-[1em] leading-[1.7] text-white/70">
                                    Curated examples of clinical UIs, telehealth flows, and administrative dashboards
                                    built for reliability and compliance.
                                </p>
                            </div>
                            <div className="grid gap-2 sm:grid-cols-2 lg:min-w-[290px]">
                                {[
                                    {label: 'Clinical UX', value: '01'},
                                    {label: 'Compliance', value: '02'},
                                    {label: 'Performance', value: '03'},
                                    {label: 'Security', value: '04'}
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
                                    src="/assets/health/1.jpg"
                                    alt="Healthcare showcase 1"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div
                                    className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(2,6,23,0.18)_40%,rgba(2,6,23,0.82)_100%)]"/>
                                <div className="absolute inset-0 border border-white/10"/>
                                <div
                                    className="absolute left-4 top-4 rounded-full border border-teal-400/30 bg-black/30 px-3 py-1 text-[0.62em] uppercase tracking-[0.3em] text-teal-300">
                                    01 / Strategy
                                </div>
                                <div className="absolute bottom-4 left-4 right-4">
                                    <p className="text-[0.62em] uppercase tracking-[0.3em] text-teal-300 font-[600]">Clinical
                                        Workflows</p>
                                    <p className="mt-2 max-w-xl text-sm sm:text-base text-white/90">Interfaces designed
                                        to reduce cognitive load while improving task completion rates.</p>
                                </div>
                            </div>

                            <div className="grid gap-4">
                                <div
                                    className="group relative overflow-hidden rounded-[1.35rem] border border-white/10 h-[250px] sm:h-[260px] lg:h-[260px]">
                                    <Image
                                        src="/assets/health/2.jpg"
                                        alt="Healthcare showcase 2"
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
                                        src="/assets/health/cta-4.jpg"
                                        alt="Healthcare showcase 3"
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
                                    src="/assets/health/cta-5.jpg"
                                    alt="Healthcare showcase 4"
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
                                    <p className="text-white/90 text-sm sm:text-base">Showcase of patient-facing and
                                        clinician tools optimised for real-world clinical environments.</p>
                                </div>
                            </div>
                        </div>
                    </FxCard>
                </div>
            </section>

            {/* Healthcare Software Development solutions - Enhanced with FxStickyScrollSection */}
            <FxStickyScrollSection
                day={isDayTime}
                colorScheme="page-accent"
                heading={<>Healthcare<br/>Development<br/>Solutions</>}
                intro="We develop secure, scalable healthcare solutions that streamline operations and enhance patient engagement while ensuring regulatory compliance. Our expertise covers EHR, telehealth, and custom healthcare applications designed for efficiency. Focused on usability and performance, our solutions empower healthcare organizations to improve care delivery and make informed decisions, supporting long-term growth and digital transformation."
                navLabel="Our Solutions"
                activeId={activeId}
                onNavClickAction={scrollToSection}
                items={[
                    {
                        id: "01",
                        title: "Reference & Diagnostic Support Systems",
                        target: "RDSS",
                        tags: ["Intelligent Diagnostics", "Integrated Solutions", "Streamlined Diagnostics"],
                        body: (
                            <div>
                                <p>
                                    Our healthcare software development company provides intelligent diagnostic
                                    support systems specifically built to aid in the identification and management
                                    of complex medical conditions. These solutions integrate evidence-based medical
                                    guidelines with real-time access to patient data, enabling clinicians to make
                                    faster, more accurate, and informed decisions at the point of care.
                                </p>
                                <p className="mt-3">
                                    By streamlining the diagnostic process and supporting clinical judgment with
                                    actionable insights, we help healthcare providers enhance efficiency, reduce
                                    diagnostic errors, and deliver improved patient outcomes.
                                </p>
                            </div>
                        ),
                    },
                    {
                        id: "02",
                        title: "Medical Practice Management System",
                        target: "MPMS",
                        tags: ["Automated Tasks", "Quality Deliverables", "Operational Growth"],
                        body: (
                            <div>
                                <p>
                                    Medical practice management systems are designed to automate repetitive
                                    administrative tasks and optimize day-to-day workflows across healthcare
                                    facilities. By reducing the time spent on scheduling, billing, documentation,
                                    and other routine processes, these systems allow healthcare professionals to
                                    focus more on delivering quality patient care.
                                </p>
                                <p className="mt-3">
                                    The result is a more efficient, organized, and productive practice environment
                                    that not only enhances the patient experience but also drives long-term
                                    profitability and operational growth for healthcare providers.
                                </p>
                            </div>
                        ),
                    },
                    {
                        id: "03",
                        title: "Hospital Management Software",
                        target: "HMS",
                        tags: ["Integrated Modules", "Automated Routine", "Optimised Productivity"],
                        body: (
                            <div>
                                <p>
                                    These healthcare management solutions are equipped with integrated modules for
                                    resource allocation, staff scheduling, billing, and electronic patient
                                    records—ensuring a centralized and cohesive approach to operational oversight.
                                    By automating routine processes and minimizing the risk of administrative
                                    errors, they help reduce patient wait times, optimize staff productivity, and
                                    maintain regulatory compliance.
                                </p>
                                <p className="mt-3">
                                    This leads to smoother, more efficient clinical operations while significantly
                                    enhancing the quality, consistency, and responsiveness of the patient experience
                                    across the care continuum.
                                </p>
                            </div>
                        ),
                    },
                    {
                        id: "04",
                        title: "Patient Profile Management Software",
                        target: "PPMS",
                        tags: ["Instant Access", "Clinical Data", "Diagnostic Records"],
                        body: (
                            <div>
                                <p>
                                    These centralized systems enable seamless care coordination by providing
                                    healthcare professionals with instant access to comprehensive patient histories,
                                    clinical data, and diagnostic records. This facilitates more informed
                                    decision-making and allows for the development of tailored treatment plans based
                                    on individual patient needs.
                                </p>
                                <p className="mt-3">
                                    As a result, providers can deliver more accurate diagnoses, reduce delays in care,
                                    and offer highly personalized, effective treatment—ultimately improving clinical
                                    outcomes and patient satisfaction.
                                </p>
                            </div>
                        ),
                    },
                    {
                        id: "05",
                        title: "Health Monitoring & Analysis Solutions",
                        target: "HMAS",
                        tags: ["Advanced Tools", "Data-driven Insight", "Personalized Information"],
                        body: (
                            <div>
                                <p>
                                    We design and develop advanced tools that capture and analyze patient data in
                                    real time, enabling early identification of potential health risks and
                                    facilitating timely preventive interventions. These solutions are particularly
                                    valuable for the ongoing management of chronic conditions, as they support
                                    continuous monitoring, data-driven insights, and proactive care strategies.
                                </p>
                                <p className="mt-3">
                                    By empowering healthcare providers with timely, personalized information, our
                                    systems contribute to improved patient outcomes and more efficient, targeted
                                    healthcare delivery.
                                </p>
                            </div>
                        ),
                    },
                    {
                        id: "06",
                        title: "AI-Powered Data Analysis Solutions",
                        target: "APDAS",
                        tags: ["Healthcare Providers", "Advanced Analytics", "Resource Utilization"],
                        body: (
                            <div>
                                <p>
                                    Systems that identify patterns and correlations within clinical data enable
                                    healthcare providers to enhance diagnostic precision, optimize treatment
                                    effectiveness, and drive better patient outcomes. By leveraging advanced
                                    analytics, these solutions support predictive modeling and risk stratification.
                                </p>
                                <p className="mt-3">
                                    This allows care teams to anticipate potential health issues and implement
                                    proactive, data-informed care strategies. The result is more efficient
                                    resource utilization, timely interventions, and a higher standard of
                                    personalized patient care.
                                </p>
                            </div>
                        ),
                    },
                    {
                        id: "07",
                        title: "Fitness & Wellness Solutions",
                        target: "FWS",
                        tags: ["Real-time Monitor", "Continuous Monitoring", "Proactive Approach"],
                        body: (
                            <div>
                                <p>
                                    These mobile health applications empower users to set and track fitness goals,
                                    monitor vital signs in real time, and receive tailored health recommendations
                                    based on individual needs. Whether supporting post-surgical recovery, chronic
                                    disease management, or overall wellness, these apps foster greater patient
                                    engagement and self-care.
                                </p>
                                <p className="mt-3">
                                    By promoting healthier habits and enabling continuous monitoring, they contribute
                                    to long-term well-being and a more proactive approach to personal health
                                    management.
                                </p>
                            </div>
                        ),
                    },
                    {
                        id: "08",
                        title: "Telemedicine & Telehealth Platforms",
                        target: "THP",
                        tags: ["Remote Consultations", "Virtual Care", "Patient Accessibility"],
                        body: (
                            <div>
                                <p>
                                    Our telemedicine platforms enable secure, real-time virtual consultations between
                                    patients and healthcare providers, breaking down geographical barriers and improving
                                    access to care. With integrated video conferencing, prescription management, and
                                    appointment scheduling, patients can receive quality care from the comfort of their
                                    homes.
                                </p>
                                <p className="mt-3">
                                    These solutions support improved patient outcomes, reduced travel time and costs,
                                    and increased provider efficiency. Our telehealth platforms comply with healthcare
                                    regulations and ensure secure, HIPAA-compliant communication, making remote care
                                    accessible, affordable, and trusted.
                                </p>
                            </div>
                        ),
                    },
                    {
                        id: "09",
                        title: "Electronic Health Records (EHR) Systems",
                        target: "EHR",
                        tags: ["Digital Records", "Data Integration", "Compliance & Security"],
                        body: (
                            <div>
                                <p>
                                    Electronic Health Records systems centralize and digitize patient medical histories,
                                    enabling seamless access to comprehensive health information across all points of
                                    care.
                                    Our EHR solutions streamline documentation, reduce administrative burden, and ensure
                                    all healthcare providers have access to accurate, up-to-date patient data.
                                </p>
                                <p className="mt-3">
                                    By eliminating paper-based processes and supporting interoperability with other
                                    healthcare systems, EHRs improve clinical decision-making, reduce medical errors,
                                    enhance care coordination, and ensure full regulatory compliance with healthcare
                                    standards and privacy requirements.
                                </p>
                            </div>
                        ),
                    },
                    {
                        id: "10",
                        title: "Pharmacy Management Systems",
                        target: "PMS",
                        tags: ["Medication Tracking", "Inventory Control", "Dispensing Automation"],
                        body: (
                            <div>
                                <p>
                                    Our pharmacy management systems optimize medication inventory, streamline
                                    prescription
                                    processing, and improve patient safety through automated dispensing and
                                    verification.
                                    These solutions integrate with patient records, insurance systems, and supplier
                                    networks
                                    to ensure accurate, efficient pharmacy operations.
                                </p>
                                <p className="mt-3">
                                    With real-time inventory management, barcode scanning, and drug interaction
                                    checking,
                                    our systems reduce medication errors, minimize waste, and improve patient
                                    compliance.
                                    Automated workflows and integrated analytics enable pharmacies to operate more
                                    efficiently
                                    while maintaining the highest standards of patient safety and care quality.
                                </p>
                            </div>
                        ),
                    },
                ]}
            />

            {/* Service item sections with IDs for scroll tracking */}
            <div id="RDSS" className="scroll-mt-20"/>
            <div id="MPMS" className="scroll-mt-20"/>
            <div id="HMS" className="scroll-mt-20"/>
            <div id="PPMS" className="scroll-mt-20"/>
            <div id="HMAS" className="scroll-mt-20"/>
            <div id="APDAS" className="scroll-mt-20"/>
            <div id="FWS" className="scroll-mt-20"/>
            <div id="THP" className="scroll-mt-20"/>
            <div id="EHR" className="scroll-mt-20"/>
            <div id="PMS" className="scroll-mt-20"/>

            {/* Futuristic healthcare showcase */}
            <FxReveal delay={0.08}>
                <div id="mid image"
                     className="mx-auto w-full max-w-full px-4 sm:px-6 lg:px-[4.6em] lg:py-14 md:py-10 py-6">
                    <FxHoloCard
                        day={isDayTime}
                        className={`relative overflow-hidden rounded-[2rem] border p-2 sm:p-3 lg:p-4 ${isDayTime ? 'border-teal-500/20 bg-white/70' : 'border-white/10 bg-slate-950/70'}`}
                    >
                        <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/10">
                            <FxBackground day={isDayTime} className="opacity-30"/>
                            <div className="grid lg:grid-cols-[1.25fr_0.75fr]">
                                <div
                                    className="relative min-h-[360px] sm:min-h-[430px] lg:min-h-[520px] overflow-hidden">
                                    <Image
                                        src="/assets/health/hospital.jpg"
                                        alt="Hospital Software"
                                        fill
                                        priority
                                        className="object-cover"
                                        style={{objectPosition: 'center'}}
                                    />
                                    <div
                                        className={`absolute inset-0 bg-gradient-to-r ${isDayTime ? 'from-slate-950/90 via-slate-950/30 to-transparent' : 'from-slate-950/95 via-slate-900/35 to-transparent'}`}/>
                                    <div
                                        className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(45,212,191,0.16),transparent_42%)]"/>
                                    <div className="absolute inset-0 border border-white/10"/>
                                    <div className="absolute left-4 top-4 sm:left-6 sm:top-6">
                                        <span
                                            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[0.6em] font-semibold uppercase tracking-[0.28em] ${isDayTime ? 'border-teal-500/30 bg-teal-500/10 text-teal-700' : 'border-teal-400/25 bg-teal-400/10 text-teal-200'}`}>
                                            <span
                                                className="h-2 w-2 rounded-full bg-[var(--page-accent)] animate-pulse"/>
                                            Connected Care
                                        </span>
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-10">
                                        <div className="max-w-2xl space-y-3">
                                            <p className="text-[0.68em] uppercase tracking-[0.34em] text-teal-200/80">Operational
                                                Intelligence</p>
                                            <h3 className="text-2xl font-semibold leading-tight text-white sm:text-3xl lg:text-[2.35rem]">
                                                Secure digital infrastructure for modern healthcare ecosystems.
                                            </h3>
                                            <p className="max-w-xl text-sm leading-6 text-slate-200/85 sm:text-[0.95rem]">
                                                Built to unify clinical, operational, and patient-facing workflows in
                                                one resilient platform.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className={`relative flex flex-col justify-between p-6 sm:p-8 lg:p-9 ${isDayTime ? 'bg-white/85' : 'bg-slate-950/75'}`}>
                                    <div
                                        className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(var(--page-accent-rgb),0.18),transparent_46%)]"/>
                                    <div className="relative z-10 space-y-6">
                                        <div className="space-y-3">
                                            <p className={`text-[0.68em] font-semibold uppercase tracking-[0.3em] ${isDayTime ? 'text-teal-700' : 'text-teal-300'}`}>
                                                Future-ready platform
                                            </p>
                                            <h4 className={`text-xl font-semibold leading-tight sm:text-2xl ${isDayTime ? 'text-slate-900' : 'text-white'}`}>
                                                Precision-built for clinical resilience and growth.
                                            </h4>
                                            <p className={`text-sm leading-7 ${isDayTime ? 'text-slate-700' : 'text-slate-300'}`}>
                                                From diagnostics and records to telehealth and pharmacy operations,
                                                every layer is designed to scale securely while elevating the care
                                                experience.
                                            </p>
                                        </div>

                                        <div className="grid gap-3 sm:grid-cols-2">
                                            {[
                                                ['24/7', 'Always-on visibility'],
                                                ['HIPAA', 'Compliance-first delivery'],
                                                ['AI', 'Predictive workflow insight'],
                                                ['Cloud', 'Elastic infrastructure'],
                                            ].map(([value, label]) => (
                                                <div key={label}
                                                     className={`rounded-2xl border p-3 ${isDayTime ? 'border-slate-200 bg-white/90' : 'border-white/10 bg-white/5'}`}>
                                                    <div
                                                        className={`text-lg font-semibold ${isDayTime ? 'text-slate-900' : 'text-white'}`}>{value}</div>
                                                    <div
                                                        className={`mt-1 text-[0.76em] uppercase tracking-[0.24em] ${isDayTime ? 'text-slate-600' : 'text-slate-400'}`}>{label}</div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="flex flex-wrap gap-2">
                                            {['Interoperability', 'Real-time collaboration', 'Secure-by-design'].map((item) => (
                                                <span key={item}
                                                      className={`rounded-full border px-3 py-1.5 text-[0.72em] font-medium uppercase tracking-[0.24em] ${isDayTime ? 'border-slate-200 bg-slate-50 text-slate-700' : 'border-white/10 bg-white/5 text-slate-200'}`}>
                                                    {item}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </FxHoloCard>
                </div>
            </FxReveal>

            {/* Our Capabilities */}
            <div
                className={`relative overflow-hidden ${isDayTime ? 'bg-[radial-gradient(circle_at_top_left,rgba(45,212,191,0.08),transparent_40%),linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)]' : 'bg-[radial-gradient(circle_at_top_left,rgba(45,212,191,0.15),transparent_42%),linear-gradient(180deg,#020617_0%,#030712_100%)]'}`}>
                <div className="absolute inset-0 opacity-60">
                    <FxBackground day={isDayTime} className="opacity-30"/>
                </div>
                <div
                    className={`relative lg:pt-32 lg:pb-16 md:pt-24 md:pb-12 pt-20 pb-10 px-4 sm:px-6 lg:px-[4.6em] w-full max-w-full lg:mb-20 mb-12 ${isDayTime ? 'text-black' : 'text-white'}`}>
                    <FxReveal delay={0.04}>
                        <div
                            className={`relative mx-auto mb-12 max-w-6xl overflow-hidden rounded-[2rem] border p-6 sm:p-8 lg:p-10 ${isDayTime ? 'border-slate-200/80 bg-white/85 shadow-[0_25px_80px_-25px_rgba(15,23,42,0.25)]' : 'border-white/10 bg-slate-950/70 shadow-[0_25px_80px_-25px_rgba(45,212,191,0.18)]'}`}>
                            <div
                                className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(var(--page-accent-rgb),0.16),transparent_42%)]"/>
                            <div className="relative z-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
                                <div className="space-y-5">
                                    <div className="flex flex-wrap gap-2">
                                        <FxChip day={isDayTime} colorScheme="page-accent">Clinical Systems</FxChip>
                                        <FxChip day={isDayTime} colorScheme="page-accent">Secure Delivery</FxChip>
                                        <FxChip day={isDayTime} colorScheme="page-accent">Future Workflow</FxChip>
                                    </div>
                                    <h2 className="text-[2rem] font-semibold tracking-tight leading-[1.05] sm:text-[2.6rem] lg:text-[3.1rem]">
                                        Our Areas <br className="hidden lg:block"/>of Expertise
                                    </h2>
                                    <p className={`max-w-2xl text-[0.9rem] leading-7 ${isDayTime ? 'text-slate-700' : 'text-slate-300'}`}>
                                        We design secure, compliant, and scalable healthcare software that connects
                                        clinical teams, patients, operators, and data systems into one resilient digital
                                        environment.
                                    </p>
                                </div>
                                <div
                                    className={`grid gap-3 rounded-[1.5rem] border p-4 sm:grid-cols-3 ${isDayTime ? 'border-slate-200 bg-slate-50/90' : 'border-white/10 bg-white/5'}`}>
                                    {[
                                        ['12+', 'Specialized services'],
                                        ['99.9%', 'Platform reliability focus'],
                                        ['24/7', 'Operational continuity'],
                                    ].map(([value, label]) => (
                                        <div key={label} className="rounded-[1.15rem] border border-transparent p-3">
                                            <div
                                                className={`text-xl font-semibold ${isDayTime ? 'text-slate-900' : 'text-white'}`}>{value}</div>
                                            <div
                                                className={`mt-1 text-[0.7em] uppercase tracking-[0.24em] ${isDayTime ? 'text-slate-600' : 'text-slate-400'}`}>{label}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </FxReveal>

                    <div className="relative mx-auto grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-8 lg:mb-16">
                        <FxReveal delay={0.08}>
                            <div
                                className={`rounded-[1.8rem] border p-4 sm:p-6 ${isDayTime ? 'border-slate-200 bg-white/80 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.2)]' : 'border-white/10 bg-slate-950/70 shadow-[0_20px_60px_-20px_rgba(45,212,191,0.14)]'}`}>
                                <div
                                    className={`mb-4 text-[0.7em] font-semibold uppercase tracking-[0.3em] ${isDayTime ? 'text-teal-700' : 'text-teal-300'}`}>
                                    Capability Matrix
                                </div>
                                <div className="space-y-3">
                                    {reasons.map((reason, index) => {
                                        const isActive = index === activeIndex;
                                        return (
                                            <button
                                                key={reason.id}
                                                onClick={() => setActiveIndex(index)}
                                                className={`group w-full rounded-[1.2rem] border p-4 text-left transition-all duration-300 ${isActive
                                                    ? isDayTime
                                                        ? 'border-teal-500/30 bg-teal-500/10 shadow-[0_12px_30px_-15px_rgba(20,184,166,0.35)]'
                                                        : 'border-teal-400/25 bg-teal-400/10 shadow-[0_12px_30px_-15px_rgba(45,212,191,0.25)]'
                                                    : isDayTime
                                                        ? 'border-slate-200 bg-white/70 hover:border-slate-300 hover:bg-slate-50'
                                                        : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'}`}
                                            >
                                                <div className="flex items-start gap-3">
                                                    <span
                                                        className={`mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-[0.72em] font-semibold ${isActive ? (isDayTime ? 'border-teal-500/40 bg-teal-500/20 text-teal-700' : 'border-teal-400/30 bg-teal-400/10 text-teal-300') : (isDayTime ? 'border-slate-200 text-slate-500' : 'border-white/10 text-slate-400')}`}>
                                                        {String(index + 1).padStart(2, '0')}
                                                    </span>
                                                    <div className="flex-1">
                                                        <div className="flex items-center justify-between gap-3">
                                                            <h3 className={`text-[0.96rem] font-semibold leading-snug ${isActive ? (isDayTime ? 'text-slate-900' : 'text-white') : (isDayTime ? 'text-slate-800' : 'text-slate-200')}`}>
                                                                {reason.title}
                                                            </h3>
                                                            <span
                                                                className={`text-lg transition-transform duration-300 ${isActive ? 'translate-x-0 text-[var(--page-accent)]' : 'translate-x-0 text-slate-400 group-hover:translate-x-1'}`}>→</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </FxReveal>

                        <FxReveal delay={0.12}>
                            <FxHoloCard day={isDayTime}
                                        className={`relative overflow-hidden rounded-[1.8rem] border p-2 sm:p-3 ${isDayTime ? 'border-slate-200/80 bg-white/85' : 'border-white/10 bg-slate-950/70'}`}>
                                <div className="relative overflow-hidden rounded-[1.4rem] border border-white/10">
                                    <div
                                        className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(var(--page-accent-rgb),0.18),transparent_48%)]"/>
                                    <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
                                        <div
                                            className="relative min-h-[320px] sm:min-h-[410px] lg:min-h-[500px] overflow-hidden">
                                            <Image
                                                src={reasons[activeIndex]?.images?.[0] || '/assets/health/hospital.jpg'}
                                                alt={`Focused capability ${activeIndex + 1}`}
                                                fill
                                                className="object-cover"
                                            />
                                            <div
                                                className={`absolute inset-0 bg-gradient-to-r ${isDayTime ? 'from-slate-950/90 via-slate-950/35 to-transparent' : 'from-slate-950/95 via-slate-900/35 to-transparent'}`}/>
                                            <div className="absolute inset-0 border border-white/10"/>
                                            <div className="absolute left-4 top-4 sm:left-6 sm:top-6">
                                                <span
                                                    className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[0.58em] font-semibold uppercase tracking-[0.28em] ${isDayTime ? 'border-teal-500/30 bg-teal-500/10 text-teal-700' : 'border-teal-400/25 bg-teal-400/10 text-teal-200'}`}>
                                                    <span
                                                        className="h-2 w-2 rounded-full bg-[var(--page-accent)] animate-pulse"/>
                                                    Focus Area
                                                </span>
                                            </div>
                                            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7 lg:p-8">
                                                <p className="text-[0.68em] uppercase tracking-[0.34em] text-teal-200/80">Adaptive
                                                    Delivery</p>
                                                <h3 className="mt-2 text-xl font-semibold leading-tight text-white sm:text-2xl lg:text-[1.8rem]">
                                                    {reasons[activeIndex]?.title}
                                                </h3>
                                            </div>
                                        </div>
                                        <div
                                            className={`relative p-6 sm:p-7 lg:p-8 ${isDayTime ? 'bg-white/85' : 'bg-slate-950/75'}`}>
                                            <div
                                                className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(var(--page-accent-rgb),0.16),transparent_46%)]"/>
                                            <div className="relative z-10 space-y-5">
                                                <div
                                                    className={`text-[0.68em] font-semibold uppercase tracking-[0.3em] ${isDayTime ? 'text-teal-700' : 'text-teal-300'}`}>
                                                    Active focus
                                                </div>
                                                <AnimatePresence mode="wait">
                                                    <motion.div
                                                        key={reasons[activeIndex]?.id}
                                                        initial={{opacity: 0, y: 16}}
                                                        animate={{opacity: 1, y: 0}}
                                                        exit={{opacity: 0, y: -16}}
                                                        transition={{duration: 0.35, ease: 'easeOut'}}
                                                        className="space-y-4"
                                                    >
                                                        <p className={`text-[0.93rem] leading-7 ${isDayTime ? 'text-slate-700' : 'text-slate-300'}`}>
                                                            {reasons[activeIndex]?.description}
                                                        </p>
                                                        <div className="grid gap-3 sm:grid-cols-2">
                                                            {[
                                                                ['Interoperable', 'Shared systems'],
                                                                ['Compliant', 'Protected delivery'],
                                                                ['Scalable', 'Growth-ready'],
                                                                ['Human-centered', 'Better care'],
                                                            ].map(([value, label]) => (
                                                                <div key={label}
                                                                     className={`rounded-[1rem] border p-3 ${isDayTime ? 'border-slate-200 bg-white/90' : 'border-white/10 bg-white/5'}`}>
                                                                    <div
                                                                        className={`text-[0.9rem] font-semibold ${isDayTime ? 'text-slate-900' : 'text-white'}`}>{value}</div>
                                                                    <div
                                                                        className={`mt-1 text-[0.68em] uppercase tracking-[0.24em] ${isDayTime ? 'text-slate-600' : 'text-slate-400'}`}>{label}</div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </motion.div>
                                                </AnimatePresence>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </FxHoloCard>
                        </FxReveal>
                    </div>

                    <FxReveal delay={0.16}>
                        <div
                            className={`mx-auto mt-8 max-w-5xl rounded-[1.8rem] border px-6 py-8 sm:px-8 lg:px-10 ${isDayTime ? 'border-slate-200 bg-white/80 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.18)]' : 'border-white/10 bg-slate-950/70 shadow-[0_20px_60px_-20px_rgba(45,212,191,0.14)]'}`}>
                            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                                <div className="max-w-2xl">
                                    <div
                                        className={`text-[0.68em] font-semibold uppercase tracking-[0.3em] ${isDayTime ? 'text-teal-700' : 'text-teal-300'}`}>
                                        Strategic partnership
                                    </div>
                                    <h2 className={`mt-2 text-[1.55rem] font-semibold leading-tight sm:text-[2rem] ${isDayTime ? 'text-slate-900' : 'text-white'}`}>
                                        Ready to start the conversation?
                                    </h2>
                                    <p className={`mt-3 text-[0.95rem] leading-7 ${isDayTime ? 'text-slate-700' : 'text-slate-300'}`}>
                                        Let’s turn your next healthcare product idea into a secure, high-performance
                                        platform designed for real-world clinical impact.
                                    </p>
                                </div>
                                <Link href="/contact" className="flex items-center justify-center">
                                    <button
                                        className={`group relative inline-flex items-center overflow-hidden rounded-full border px-6 py-3 text-[0.9rem] font-semibold tracking-[0.02em] transition-all duration-300 ${isDayTime ? 'border-slate-300 bg-white text-slate-900 hover:border-teal-500 hover:text-teal-700' : 'border-white/15 bg-white/10 text-white hover:border-teal-400 hover:text-teal-200'}`}>
                                        <span
                                            className={`absolute inset-0 -translate-x-full bg-[var(--page-accent)] transition-transform duration-500 group-hover:translate-x-full`}/>
                                        <span className="relative z-10 inline-flex items-center gap-3">
                                            Get started
                                            <span className="text-[1.2em] leading-none">→</span>
                                        </span>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </FxReveal>
                </div>
            </div>

            {/* Trends in healthcare software development services */}
            <div className={`${isDayTime ? 'bg-[#020617]' : 'bg-[#f8fbff]'}`}>
                <div className={`relative mx-auto w-full max-w-full px-4 sm:px-6 lg:px-[4.6em] lg:pt-[6em] md:pt-[6em] pt-[1.2em] lg:pb-[6em] md:pb-[6em] pb-[1.2em] mt-14`}>
                    <FxReveal delay={0.04}>
                        <div className={`relative overflow-hidden rounded-[2rem] border p-6 sm:p-8 lg:p-10 ${isDayTime ? 'border-white/10 bg-slate-950/70 shadow-[0_24px_80px_-28px_rgba(45,212,191,0.22)]' : 'border-slate-200 bg-white/85 shadow-[0_24px_80px_-28px_rgba(15,23,42,0.18)]'}`}>
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(var(--page-accent-rgb),0.14),transparent_42%)]" />
                            <div className="relative z-10 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
                                <div className="space-y-5">
                                    <div className="flex flex-wrap gap-2">
                                        <FxChip day={isDayTime} colorScheme="page-accent">Emerging Trends</FxChip>
                                        <FxChip day={isDayTime} colorScheme="page-accent">Digital Health</FxChip>
                                    </div>
                                    <h2 className={`text-[2rem] font-semibold tracking-tight leading-[1.08] sm:text-[2.6rem] lg:text-[3.1rem] ${isDayTime ? 'text-white' : 'text-slate-900'}`}>
                                        Trends in <br className="hidden lg:block" />Healthcare Software <br className="hidden lg:block" />Development Services
                                    </h2>
                                    <p className={`max-w-2xl text-[0.95rem] leading-7 ${isDayTime ? 'text-slate-300' : 'text-slate-700'}`}>
                                        Healthcare software is evolving toward intelligent, connected, and human-centered experiences. The most impactful shifts are redefining how providers deliver care, how patients engage with their health, and how organizations scale responsibly.
                                    </p>
                                </div>

                                <div className={`rounded-[1.6rem] border p-4 sm:p-5 ${isDayTime ? 'border-white/10 bg-white/5' : 'border-slate-200 bg-slate-50/90'}`}>
                                    <div className="grid gap-3 sm:grid-cols-2">
                                        {[
                                            ['Connected Care', 'Remote & continuous monitoring'],
                                            ['Predictive Intelligence', 'Smarter clinical decisions'],
                                            ['Secure Data Flow', 'Interoperable health systems'],
                                            ['Patient Empowerment', 'Always-on digital experience'],
                                        ].map(([title, desc]) => (
                                            <div key={title} className={`rounded-[1.1rem] border p-3 ${isDayTime ? 'border-white/10 bg-slate-900/70' : 'border-slate-200 bg-white'}`}>
                                                <div className={`text-[0.95rem] font-semibold ${isDayTime ? 'text-white' : 'text-slate-900'}`}>{title}</div>
                                                <div className={`mt-1 text-[0.73em] uppercase tracking-[0.22em] ${isDayTime ? 'text-slate-400' : 'text-slate-600'}`}>{desc}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </FxReveal>

                    <FxReveal delay={0.1}>
                        <div className="relative mx-auto mt-8 grid gap-4 lg:grid-cols-[0.8fr_1.2fr] lg:gap-6">
                            <div className={`rounded-[1.6rem] border p-4 sm:p-5 ${isDayTime ? 'border-white/10 bg-slate-950/70' : 'border-slate-200 bg-white/80'}`}>
                                <div className={`text-[0.68em] font-semibold uppercase tracking-[0.3em] ${isDayTime ? 'text-teal-300' : 'text-teal-700'}`}>
                                    Focus Areas
                                </div>
                                <div className="mt-4 space-y-3">
                                    {[
                                        'Telemedicine & Remote Patient Monitoring',
                                        'Artificial Intelligence & Machine Learning in Healthcare',
                                        'Internet of Things (IoT) in Healthcare',
                                        'Mobile Health (mHealth) Applications',
                                        'Cloud Computing & Data Management in Healthcare',
                                        'Blockchain & Healthcare Data Security',
                                        'Interoperability & Health Information Exchange',
                                        'Cybersecurity & HIPAA Compliance',
                                    ].map((item, index) => {
                                        const active = webIndex === index;
                                        return (
                                            <button
                                                key={item}
                                                onClick={() => toggleWeb(index)}
                                                className={`w-full rounded-[1.05rem] border p-3 text-left transition-all duration-300 ${active
                                                    ? isDayTime
                                                        ? 'border-teal-400/25 bg-teal-400/10 shadow-[0_12px_28px_-16px_rgba(45,212,191,0.3)]'
                                                        : 'border-teal-500/25 bg-teal-500/10 shadow-[0_12px_28px_-16px_rgba(20,184,166,0.2)]'
                                                    : isDayTime
                                                        ? 'border-white/10 bg-slate-900/70 hover:border-white/20 hover:bg-slate-900'
                                                        : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'}`}
                                            >
                                                <div className="flex items-center justify-between gap-3">
                                                    <span className={`text-[0.95rem] font-medium ${isDayTime ? 'text-white' : 'text-slate-900'}`}>{item}</span>
                                                    <span className={`text-lg ${isDayTime ? 'text-teal-300' : 'text-teal-700'}`}>{active ? '▾' : '▸'}</span>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className={`rounded-[1.6rem] border p-4 sm:p-6 ${isDayTime ? 'border-white/10 bg-slate-950/70' : 'border-slate-200 bg-white/85'}`}>
                                <div className="space-y-5">
                                    <div className="flex items-center justify-between gap-4">
                                        <div>
                                            <div className={`text-[0.68em] font-semibold uppercase tracking-[0.3em] ${isDayTime ? 'text-teal-300' : 'text-teal-700'}`}>
                                                Insight
                                            </div>
                                            <h3 className={`mt-1 text-[1.2rem] font-semibold leading-tight ${isDayTime ? 'text-white' : 'text-slate-900'}`}>
                                                {[
                                                    'Telemedicine & Remote Patient Monitoring',
                                                    'Artificial Intelligence & Machine Learning in Healthcare',
                                                    'Internet of Things (IoT) in Healthcare',
                                                    'Mobile Health (mHealth) Applications',
                                                    'Cloud Computing & Data Management in Healthcare',
                                                    'Blockchain & Healthcare Data Security',
                                                    'Interoperability & Health Information Exchange',
                                                    'Cybersecurity & HIPAA Compliance',
                                                    ][webIndex ?? 0]}
                                            </h3>
                                        </div>
                                        <div className={`rounded-full border px-3 py-1 text-[0.68em] font-semibold uppercase tracking-[0.24em] ${isDayTime ? 'border-teal-400/20 bg-teal-400/10 text-teal-300' : 'border-teal-500/20 bg-teal-500/10 text-teal-700'}`}>
                                            Live trend
                                        </div>
                                    </div>

                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={webIndex}
                                            initial={{opacity: 0, y: 10}}
                                            animate={{opacity: 1, y: 0}}
                                            exit={{opacity: 0, y: -10}}
                                            transition={{duration: 0.25, ease: 'easeOut'}}
                                            className={`rounded-[1.2rem] border p-4 sm:p-5 ${isDayTime ? 'border-white/10 bg-slate-900/70' : 'border-slate-200 bg-slate-50/80'}`}
                                        >
                                            <p className={`text-[0.92rem] leading-7 ${isDayTime ? 'text-slate-300' : 'text-slate-700'}`}>
                                                {[
                                                    'Telemedicine has fundamentally transformed healthcare by enabling providers to deliver medical consultations, diagnoses, and treatments remotely, expanding access to quality care beyond traditional clinical environments. When paired with remote monitoring, it supports continuous supervision of chronic and acute conditions through real-time data, early detection, and faster intervention.',
                                                    'AI and machine learning are revolutionizing healthcare by enabling advanced predictive analytics, improving diagnostic accuracy, and accelerating personalized treatment planning. These technologies uncover patterns in complex clinical data, helping teams act with greater precision and confidence.',
                                                    'IoT devices are becoming integral to modern healthcare by connecting wearables, sensors, and care environments into real-time insight loops. This creates more proactive support for chronic care, faster response times, and better-connected patient experiences.',
                                                    'mHealth applications are empowering patients to manage wellness, reminders, appointments, and vital signs from their smartphones. This improves engagement, adherence, and continuity of care across the full patient journey.',
                                                    'Cloud solutions provide the secure, scalable foundation for modern healthcare data systems. They enable privacy-conscious collaboration, fast access to records, and the analytics infrastructure needed for data-heavy clinical operations.',
                                                    'Blockchain technology ensures immutable, transparent healthcare records with cryptographic security. It enables patient-centric data control, streamlines supply chain verification for pharmaceuticals, and creates audit trails that meet stringent compliance requirements while preventing unauthorized access.',
                                                    'Interoperability standards like FHIR and HL7 break down data silos, enabling seamless health information exchange across providers, insurers, and systems. This unified data ecosystem improves care coordination, reduces redundant testing, and creates a complete clinical picture for better decision-making.',
                                                    'Enterprise-grade cybersecurity and HIPAA compliance safeguard patient data through encryption, multi-factor authentication, and zero-trust architectures. Proactive threat monitoring and incident response ensure healthcare organizations maintain patient trust while meeting regulatory mandates and industry standards.',
                                                    ][webIndex ?? 0]}
                                            </p>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>
                    </FxReveal>
                </div>
            </div>

            {/* Business Benefits - Futuristic Premium Section */}
            <div className={`relative overflow-hidden ${isDayTime ? 'bg-white text-black' : 'bg-black text-white'}`}>
                <FxBackground day={isDayTime} grid aurora/>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(var(--page-accent-rgb),0.08),transparent_50%)] pointer-events-none" />
                
                <div className="relative z-10 lg:pt-[4.5em] md:pt-[3em] pt-[2em] lg:pb-[4.5em] md:pb-[3em] pb-[2em] max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em]">
                    
                    {/* Enhanced Header */}
                    <FxReveal>
                        <div className={`border-b grid lg:grid-cols-2 grid-cols-1 gap-8 lg:gap-12 pb-12 lg:pb-16 mb-16 lg:mb-24 ${isDayTime ? 'border-gray-200' : 'border-white/10'}`}>
                            <div>
                                <div className="flex items-center gap-3 mb-6">
                                    <FxChip day={isDayTime} colorScheme="page-accent">Strategic Value</FxChip>
                                </div>
                                <h2 className={`text-[1.8em] sm:text-[2.5em] md:text-[3em] lg:text-[3.6em] font-[700] tracking-tight leading-[1.1] ${isDayTime ? 'text-black' : 'text-white'}`}>
                                    Business Benefits <br/>From Partnering <br/>with Us
                                </h2>
                            </div>
                            <div className={`flex flex-col justify-center ${isDayTime ? 'lg:ml-4' : 'lg:ml-4'}`}>
                                <p className={`text-[0.95em] lg:text-[1.02em] leading-[1.7] font-[300] ${isDayTime ? 'text-gray-700' : 'text-white/70'}`}>
                                    Partnering with us means gaining access to world-class development teams, deeply customized solutions, and a collaborative approach that aligns cutting-edge technology with your strategic business goals. We deliver enterprise-grade, secure, and efficient software architectures that drive measurable innovation, enhance operational efficiency, and unlock sustainable growth across your healthcare ecosystem.
                                </p>
                            </div>
                        </div>
                    </FxReveal>

                    {/* Benefits Grid - Enhanced */}
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 lg:gap-6">
                        {[
                            {
                                id: 'usability',
                                icon: isDayTime ? '/assets/health/icon/att.svg' : '/assets/health/icon/att1.svg',
                                title: 'Advanced UX/UI Design',
                                subtitle: 'Intuitive & Accessible',
                                description: 'Our UX/UI design team specializes in creating intuitive, user-friendly interfaces that simplify complex clinical workflows and ensure accessibility for users of all technical skill levels. By adhering to human-centered design principles rooted in healthcare ergonomics, we develop interfaces that align seamlessly with your business strategy while enhancing user satisfaction and clinical engagement. Complementing this, our AI and ML-driven solutions intelligently optimize and automate routine tasks, allowing healthcare professionals to focus on critical patient care and decision-making.',
                                features: ['User-Centered Design', 'WCAG Compliance', 'Workflow Optimization', 'AI-Assisted Automation']
                            },
                            {
                                id: 'optimization',
                                icon: isDayTime ? '/assets/health/icon/fast.svg' : '/assets/health/icon/fast1.svg',
                                title: 'Intelligent Workflow Optimization',
                                subtitle: 'AI-Powered Efficiency',
                                description: 'We partner strategically to optimize complex laboratory and clinical workflows, accelerating the achievement of your business objectives through intelligent automation. Leveraging cutting-edge AI, machine learning, and specialized healthcare software architectures, we streamline processes and intelligently automate time-consuming tasks traditionally performed by medical personnel. This reduces operational inefficiencies, minimizes human error, and empowers healthcare professionals to focus on higher-value clinical activities, ultimately enhancing productivity and patient outcomes.',
                                features: ['Process Automation', 'ML-Driven Analytics', 'Error Reduction', 'Productivity Gains']
                            },
                            {
                                id: 'deployment',
                                icon: isDayTime ? '/assets/health/icon/test.svg' : '/assets/health/icon/test1.svg',
                                title: 'Flexible Deployment Architecture',
                                subtitle: 'On-Premise & Cloud',
                                description: 'Our cloud development specialists design and implement robust, enterprise-grade data infrastructures tailored to healthcare environments, ensuring seamless and secure migration of your medical software to cloud platforms. We establish automated CI/CD deployment pipelines that facilitate continuous integration and delivery, enhancing system reliability and scalability. We optimize data flow processes to maintain integrity, improve accessibility, and support efficient interoperability across your healthcare ecosystem.',
                                features: ['Cloud Migration', 'CI/CD Pipelines', 'Data Integrity', 'Scalable Infrastructure']
                            },
                            {
                                id: 'qa',
                                icon: isDayTime ? '/assets/health/icon/sca.svg' : '/assets/health/icon/sca1.svg',
                                title: 'Enterprise Quality Assurance',
                                subtitle: 'Rigorous Testing & Validation',
                                description: 'Our dedicated QA specialists conduct comprehensive, multi-layered testing of healthcare software solutions to guarantee optimal performance, stability, efficient resource utilization, and seamless responsiveness across diverse operating systems and devices. We rigorously validate interoperability to ensure consistent functionality within complex healthcare ecosystems. Our thorough evaluations identify and resolve errors, performance bottlenecks, and legacy system incompatibilities, extending system lifespan and ensuring robust, secure, user-centric experiences.',
                                features: ['Multi-Layer Testing', 'Performance Validation', 'Interoperability Checks', 'Legacy System Audit']
                            },
                            {
                                id: 'security',
                                icon: isDayTime ? '/assets/health/icon/risk.svg' : '/assets/health/icon/risk1.svg',
                                title: 'Healthcare Data Security & Compliance',
                                subtitle: 'HIPAA & Enterprise Standards',
                                description: 'We possess extensive expertise in developing HIPAA-compliant healthcare software that rigorously adheres to industry regulations and standards. Our solutions prioritize data privacy and security through encrypted communication protocols, secure data storage with robust backup mechanisms, multi-factor authentication, and granular role-based access controls. We ensure sensitive patient information is protected throughout its entire lifecycle, enabling healthcare organizations to maintain regulatory compliance while fostering trust and confidence among patients and stakeholders.',
                                features: ['HIPAA Compliance', 'End-to-End Encryption', 'MFA & RBAC', 'Audit Trail Logging']
                            },
                            {
                                id: 'scalability',
                                icon: isDayTime ? '/assets/health/icon/cust.svg' : '/assets/health/icon/cust1.svg',
                                title: 'Scalability & Future-Proofing',
                                subtitle: 'Long-Term Strategic Vision',
                                description: 'We develop healthcare solutions with a forward-looking vision, ensuring they remain adaptable, resilient, and future-ready within an evolving industry landscape. Our focus on scalability enables your software to seamlessly handle growing user demands, expanding datasets, and complex workflows without performance degradation. By designing with architectural flexibility, we enable smooth integration of emerging technologies, regulatory updates, and new functionalities as your organization evolves and scales.',
                                features: ['Scalable Architecture', 'Technology Flexibility', 'Future-Ready Design', 'Long-Term ROI']
                            },
                            {
                                id: 'integration',
                                icon: isDayTime ? '/assets/health/icon/att.svg' : '/assets/health/icon/att1.svg',
                                title: 'Seamless System Integration & Interoperability',
                                subtitle: 'Multi-Platform Connectivity',
                                description: 'We specialize in designing and implementing enterprise-grade healthcare system integrations that connect disparate medical devices, EMR/EHR systems, laboratory information systems (LIS), and third-party platforms into unified, interoperable ecosystems. Our integration strategies leverage industry-standard protocols including FHIR, HL7v2, and DICOM to ensure seamless data exchange while maintaining data integrity and security. We architect middleware solutions that enable real-time synchronization, eliminate data silos, and create a single source of truth across your entire healthcare infrastructure, supporting better clinical decisions and improved operational visibility.',
                                features: ['FHIR & HL7 Standards', 'Real-Time Sync', 'Data Reconciliation', 'API Gateway Design']
                            },
                            {
                                id: 'performance',
                                icon: isDayTime ? '/assets/health/icon/fast.svg' : '/assets/health/icon/fast1.svg',
                                title: 'High-Performance & Mission-Critical Systems',
                                subtitle: 'Reliability & Uptime',
                                description: 'Healthcare systems demand absolute reliability and performance at scale. We architect and deploy mission-critical applications with 99.99% uptime SLAs, redundant failover systems, and geo-distributed infrastructure to ensure your healthcare operations never experience downtime. Our approach includes comprehensive load balancing, auto-scaling capabilities, database optimization, and caching strategies that guarantee microsecond response times even during peak clinical usage. We implement robust monitoring, alerting, and incident response protocols to proactively identify and resolve performance issues before they impact patient care or operational continuity.',
                                features: ['99.99% Uptime SLA', 'Failover Systems', 'Auto-Scaling', 'Real-Time Monitoring']
                            },
                            {
                                id: 'training',
                                icon: isDayTime ? '/assets/health/icon/test.svg' : '/assets/health/icon/test1.svg',
                                title: 'Comprehensive Training & Change Management',
                                subtitle: 'User Adoption & Excellence',
                                description: 'Successful healthcare software deployment extends far beyond technical implementation. We provide comprehensive end-user training, clinical workflow workshops, and change management consulting to ensure rapid adoption and maximum ROI. Our training programs are tailored to different user personas—from clinical staff and administrative personnel to IT teams—with role-specific curricula, hands-on simulations, and ongoing support resources. We develop detailed documentation, video tutorials, and knowledge bases that empower your teams to independently manage and optimize their systems. Our proactive change management strategies minimize disruption, address resistance to new workflows, and establish a culture of continuous improvement that maximizes the value of your investment.',
                                features: ['Role-Based Training', 'Workflow Simulations', 'Documentation & Videos', 'Ongoing Support']
                            }
                        ].map((benefit, index) => (
                            <FxReveal key={benefit.id} delay={0.05 * index}>
                                <div className={`group relative overflow-hidden rounded-[1.5rem] border p-6 lg:p-7 transition-all duration-500 ${isDayTime 
                                    ? 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)]' 
                                    : 'border-white/10 bg-white/[0.03] backdrop-blur-sm hover:border-[rgba(var(--page-accent-rgb),0.3)] hover:bg-white/[0.06] hover:shadow-[0_20px_60px_-15px_rgba(var(--page-accent-rgb),0.15)]'}`}>
                                    
                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(var(--page-accent-rgb),0.06),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                    <div className={`absolute inset-0 border rounded-[1.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${isDayTime ? 'border-transparent' : 'border-[rgba(var(--page-accent-rgb),0.2)]'}`} />
                                    
                                    <div className="relative z-10">
                                        {/* Icon */}
                                        <div className={`mb-5 inline-flex items-center justify-center h-14 w-14 rounded-[1rem] transition-all duration-300 ${isDayTime 
                                            ? 'bg-gray-100 group-hover:bg-gray-200' 
                                            : 'bg-white/8 group-hover:bg-[rgba(var(--page-accent-rgb),0.15)]'}`}>
                                            <Image
                                                src={benefit.icon}
                                                alt={benefit.title}
                                                width={28}
                                                height={28}
                                                className="h-7 w-7"
                                            />
                                        </div>

                                        {/* Title & Subtitle */}
                                        <h3 className={`text-[1.15em] lg:text-[1.25em] font-[600] leading-tight mb-1 transition-colors duration-300 ${isDayTime ? 'text-black group-hover:text-[var(--page-accent)]' : 'text-white group-hover:text-[var(--page-accent)]'}`}>
                                            {benefit.title}
                                        </h3>
                                        <p className={`text-[0.75em] uppercase tracking-[0.15em] font-[500] mb-4 ${isDayTime ? 'text-gray-500' : 'text-white/50'}`}>
                                            {benefit.subtitle}
                                        </p>

                                        {/* Description */}
                                        <p className={`text-[0.85em] leading-[1.6] mb-5 ${isDayTime ? 'text-gray-700' : 'text-white/65'}`}>
                                            {benefit.description}
                                        </p>

                                        {/* Feature Tags */}
                                        <div className="flex flex-wrap gap-2">
                                            {benefit.features.map((feature) => (
                                                <span key={feature} className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[0.7em] font-[500] tracking-wide uppercase transition-all duration-300 ${isDayTime
                                                    ? 'bg-gray-100 text-gray-700 group-hover:bg-gray-200'
                                                    : 'bg-white/8 text-white/70 group-hover:bg-[rgba(var(--page-accent-rgb),0.15)] group-hover:text-[var(--page-accent)]'}`}>
                                                    <span className={`h-1.5 w-1.5 rounded-full ${isDayTime ? 'bg-gray-400' : 'bg-white/40 group-hover:bg-[var(--page-accent)]'}`} />
                                                    {feature}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </FxReveal>
                        ))}
                    </div>
                </div>
            </div>

            {/* Premium CTA Showcase - Futuristic Design */}
            <div className={`relative overflow-hidden ${isDayTime ? 'bg-white' : 'bg-black'}`}>
                <FxBackground day={isDayTime} grid aurora/>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(var(--page-accent-rgb),0.06),transparent_60%)] pointer-events-none" />
                
                <div className="relative z-10 lg:py-[5em] md:py-[3.5em] py-[2em] max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em]">
                    <FxReveal>
                        <div className="relative overflow-hidden rounded-[2.5rem] border group">
                            {/* Gradient Border & Glow */}
                            <div className={`absolute inset-0 rounded-[2.5rem] ${isDayTime 
                                ? 'border border-gray-200 bg-gradient-to-br from-transparent via-gray-50 to-transparent' 
                                : 'border border-white/10 bg-gradient-to-br from-white/5 via-transparent to-white/5'}`} />
                            
                            {/* Premium Top Accent Line */}
                            <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(var(--page-accent-rgb),0.5)] to-transparent`} />
                            
                            {/* Image Container */}
                            <div className="relative overflow-hidden h-auto min-h-[400px] sm:min-h-[500px] lg:min-h-[680px]">
                                <Image
                                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                                    src="/assets/health/cta-5.jpg"
                                    alt="Healthcare Innovation Showcase"
                                    width={1536}
                                    height={860}
                                    priority
                                    style={{
                                        objectFit: "cover",
                                        objectPosition: "center",
                                    }}
                                />
                                
                                {/* Sophisticated Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                                <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
                                
                                {/* Premium Content Layer */}
                                <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 lg:p-12">
                                    <div className="max-w-2xl">
                                        <div className="flex items-center gap-2 mb-6">
                                            <div className="h-1 w-12 bg-[var(--page-accent)] rounded-full" />
                                            <span className={`text-[0.7em] uppercase tracking-[0.25em] font-[600] ${isDayTime ? 'text-gray-700' : 'text-white/80'}`}>
                                                Healthcare Excellence
                                            </span>
                                        </div>
                                        
                                        <h2 className="text-[1.8em] sm:text-[2.5em] lg:text-[3.2em] font-[700] leading-[1.15] text-white mb-4">
                                            Enterprise-Ready Healthcare Solutions
                                        </h2>
                                        
                                        <p className="text-[0.95em] sm:text-[1.05em] leading-[1.7] text-white/85 max-w-xl mb-8">
                                            Our comprehensive suite of healthcare software solutions is architected for mission-critical performance, regulatory compliance, and seamless integration across your entire healthcare ecosystem. From patient engagement to operational analytics, we deliver technology that transforms care delivery.
                                        </p>
                                        
                                        {/* Feature Highlights */}
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                                            {[
                                                { label: 'HIPAA Compliant', icon: '✓' },
                                                { label: 'Real-Time Data', icon: '⚡' },
                                                { label: '99.99% Uptime', icon: '◆' },
                                                { label: 'FHIR Enabled', icon: '≡' },
                                                { label: 'AI-Powered', icon: '⟡' },
                                                { label: 'Enterprise Scale', icon: '▲' }
                                            ].map((feature, idx) => (
                                                <div key={idx} className="flex items-center gap-2">
                                                    <span className="text-[1.2em] text-[var(--page-accent)]">{feature.icon}</span>
                                                    <span className="text-[0.8em] text-white/80 font-[500]">{feature.label}</span>
                                                </div>
                                            ))}
                                        </div>
                                        
                                        {/* CTA Button */}
                                        <div className="flex flex-col sm:flex-row gap-4">
                                            <FxButton 
                                                day={false}
                                                href="/contact"
                                                colorScheme="page-accent"
                                                className="whitespace-nowrap"
                                            >
                                                Schedule Healthcare Demo
                                            </FxButton>
                                            <button className="group/secondary inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-white/30 text-white/90 font-[600] text-[0.9em] transition-all duration-300 hover:border-[var(--page-accent)] hover:text-[var(--page-accent)] hover:bg-white/5">
                                                Explore Solutions
                                                <span className="transition-transform group-hover/secondary:translate-x-1">→</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Corner Accent Elements */}
                                <div className="absolute top-6 right-6 h-20 w-20 border border-[rgba(var(--page-accent-rgb),0.3)] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="absolute bottom-6 left-6 h-16 w-16 border border-[rgba(var(--page-accent-rgb),0.2)] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            </div>
                        </div>
                    </FxReveal>
                </div>
            </div>

            {/* Accordion */}
            <div className={`${isDayTime ? 'bg-black' : 'bg-white'} `}>
                <div
                    className={'relative pt-[3em] max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]'}>
                    <div className={`py-10 ${isDayTime ? 'text-white' : 'text-black'}`}>
                        <h1 className="text-center text-[1.em] sm:text-[1.5em] md:text-[2.5em] lg:text-[3.3em] font-[500] leading-[1.1] mb-8">
                            Our Process Behind Every Great <br className={'lg:block md:block hidden'}/><span
                            className={'text-teal-600'}>Health App</span>
                        </h1>
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
                                                ? '100%'
                                                : '60px'
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
                                            <span className="text-[1.5em] font-[600]">
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
                                                        ? 'w-16 flex flex-col items-center justify-start pt-3 border-r'
                                                        : 'flex-row items-center p-4 border-b'
                                                } border-[#0E3B46]`}
                                            >

                                                <span className="text-[1.5em] font-[600]">
                                                    {step.number}
                                                </span>

                                                <span
                                                    className={`text-[0.875em] font-[500] tracking-widest uppercase text-gray-400 ${
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
                                                    className={`h-full border border-[#0E3B46] p-6 md:p-10 flex flex-col justify-center transform transition-all duration-500 ease-in-out ${
                                                        isActive
                                                            ? "opacity-100 translate-y-0"
                                                            : "opacity-0 -translate-y-4"
                                                    }`}
                                                >
                                                    <div
                                                        className="w-10 h-10 md:w-12 md:h-12 rounded-md flex items-center justify-center mb-4 md:mb-6 text-xl md:text-2xl border border-teal-600 text-teal-600">
                                                        {step.icon}
                                                    </div>
                                                    <h2 className="text-xl md:text-3xl font-bold mb-3 md:mb-4">
                                                        {step.heading}
                                                    </h2>
                                                    <p className="text-[0.873em] text-gray-300 text-justify  leading-relaxed">
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

            {/* Top Features for Medical Software & Apps */}
            <div className={`${isDayTime ? 'bg-white' : 'bg-black'} `}>
                <div
                    className=" relative  lg:pt-[6em] lg:pb-[6em]  max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]">
                    {/* Header */}
                    <div className={`${isDayTime ? 'text-black' : 'text-white'} mb-[4em]`}>
                        <h1 className="text-center  text-[1.em] sm:text-[1.5em] md:text-[2.5em] lg:text-[3.3em] font-[500] leading-[1.1]">Top
                            Features for <br className={'lg:block md:block hidden'}/><span
                                className={'text-teal-600'}>Medical Software</span> & <span
                                className={'text-teal-600'}>Apps</span></h1>
                        <p className="text-justify  mt-4 text-[0.87em] font-[300] mx-auto">
                            At Grey InfoTech Ltd., we deliver advanced medical app solutions that are fully
                            customizable,
                            highly adaptable, and built for scalability to meet the evolving demands of modern
                            healthcare.
                            Our dedicated mHealth app development team combines technical expertise with creative
                            innovation
                            to design applications that integrate powerful, industry-specific features with intuitive,
                            user-friendly UI/UX designs. Each solution is tailored to enhance patient engagement,
                            streamline
                            healthcare workflows, and ensure seamless interoperability with existing systems. Explore
                            our
                            comprehensive range of healthcare app features below, crafted to deliver exceptional
                            performance, compliance, and long-term value.
                        </p>
                    </div>

                    {/* Tabs */}
                    <div className="flex flex-wrap justify-center gap-2 my-6 w-full min-w-0 overflow-x-auto">
                        {Object.keys(features).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => {
                                    setActiveTab(tab);
                                    setOpenIndex(null);
                                }}
                                className={`px-4 py-2 rounded-full border-2 transition font-medium
                                    text-sm sm:text-base
                                    ${activeTab === tab
                                    ? "bg-teal-500 text-white border-teal-500"
                                    : "bg-white text-gray-800 border-gray-300"
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Content Area */}
                    <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-10 mt-10 ">
                        {/* Accordion Section */}
                        <div className={`${isDayTime ? 'text-black' : 'text-white'}`}>
                            {features[activeTab].map((feature, i) => (
                                <div key={i} className="border-b border-gray-300">
                                    <button
                                        className="w-full flex justify-between items-center py-4 text-lg font-medium"
                                        onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                    >
                                        {feature.title}
                                        <span>{openIndex === i ? " - " : " - "}</span>
                                    </button>
                                    {openIndex === i &&
                                        <p className={`pb-4 text-gray-500 text-[0.873em] `}>{feature.content}</p>}
                                </div>
                            ))}
                        </div>

                        {/* Image Section */}
                        <div className="flex gap-4 overflow-x-auto pb-4 h-auto max-w-full w-full mx-auto">
                            {images[activeTab].map((src, i) => (
                                <Image
                                    key={i}
                                    src={src} // Should be like "/assets/health/patient_app.jpg"
                                    width={800}
                                    height={545}
                                    alt="Healthcare technology solution showcase"
                                    className="object-fill flex-shrink-0"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Premium Technology Showcase - Futuristic Design */}
            <div className={`relative overflow-hidden ${isDayTime ? 'bg-white' : 'bg-black'}`}>
                <FxBackground day={isDayTime} grid aurora/>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(var(--page-accent-rgb),0.05),transparent_60%)] pointer-events-none" />
                
                <div className="relative z-10 lg:py-[5em] md:py-[3.5em] py-[2em] max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em]">
                    <FxReveal>
                        <div className="relative overflow-hidden rounded-[2.5rem] border group">
                            {/* Premium Styling */}
                            <div className={`absolute inset-0 rounded-[2.5rem] ${isDayTime 
                                ? 'border border-gray-200 bg-gradient-to-br from-transparent via-gray-50 to-transparent' 
                                : 'border border-white/10 bg-gradient-to-br from-white/5 via-transparent to-white/5'}`} />
                            
                            {/* Top Accent Line */}
                            <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(var(--page-accent-rgb),0.5)] to-transparent`} />
                            
                            {/* Image Container */}
                            <div className="relative overflow-hidden h-auto min-h-[400px] sm:min-h-[500px] lg:min-h-[680px]">
                                <Image
                                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                                    src="/assets/health/cta-3.jpg"
                                    alt="Healthcare Technology Platform"
                                    width={1536}
                                    height={860}
                                    priority
                                    style={{
                                        objectFit: "cover",
                                        objectPosition: "center",
                                    }}
                                />
                                
                                {/* Multi-Layer Professional Overlays */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                                <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />
                                
                                {/* Premium Content Layer */}
                                <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8 lg:p-12">
                                    {/* Top section with badge and eyebrow */}
                                    <div>
                                        <div className="flex items-center gap-2 mb-4">
                                            <div className="h-1 w-10 bg-[var(--page-accent)] rounded-full" />
                                            <span className="text-[0.7em] uppercase tracking-[0.25em] font-[600] text-white/80">
                                                Advanced Technology Stack
                                            </span>
                                        </div>
                                    </div>

                                    {/* Bottom content section */}
                                    <div className="max-w-2xl">
                                        <h2 className="text-[1.8em] sm:text-[2.4em] lg:text-[3em] font-[700] leading-[1.15] text-white mb-4">
                                            Hospital Management <br/>& Clinical Operations
                                        </h2>
                                        
                                        <p className="text-[0.95em] sm:text-[1.05em] leading-[1.7] text-white/85 max-w-xl mb-8">
                                            Comprehensive platform for seamless integration of clinical workflows, patient management, and operational analytics. Real-time data synchronization across all healthcare touchpoints ensures unified visibility and informed decision-making at every level of your organization.
                                        </p>
                                        
                                        {/* Capability Grid */}
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                                            {[
                                                { label: 'Clinical UX', value: '02' },
                                                { label: 'EMR Integration', value: '03' },
                                                { label: 'Real-Time Sync', value: '⚡' },
                                                { label: 'Analytics Engine', value: '📊' }
                                            ].map((capability, idx) => (
                                                <div key={idx} className={`rounded-xl p-3 border backdrop-blur-sm ${
                                                    isDayTime
                                                        ? 'border-white/10 bg-white/5'
                                                        : 'border-white/10 bg-white/5'
                                                }`}>
                                                    <div className="text-[0.7em] uppercase tracking-[0.2em] text-white/70 font-[500] mb-1">
                                                        {capability.label}
                                                    </div>
                                                    <div className="text-[1.3em] font-[700] text-white">
                                                        {capability.value}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        
                                        {/* CTA Section */}
                                        <div className="flex flex-col sm:flex-row gap-4">
                                            <FxButton 
                                                day={false}
                                                href="/contact"
                                                colorScheme="page-accent"
                                                className="whitespace-nowrap"
                                            >
                                                Request Platform Demo
                                            </FxButton>
                                            <button className="group/secondary inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-white/30 text-white/90 font-[600] text-[0.9em] transition-all duration-300 hover:border-[var(--page-accent)] hover:text-[var(--page-accent)] hover:bg-white/5">
                                                View Case Study
                                                <span className="transition-transform group-hover/secondary:translate-x-1">→</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Decorative Corner Elements */}
                                <div className="absolute top-8 right-8 h-24 w-24 border border-[rgba(var(--page-accent-rgb),0.25)] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="absolute bottom-8 left-8 h-20 w-20 border border-[rgba(var(--page-accent-rgb),0.15)] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            </div>
                        </div>
                    </FxReveal>
                </div>
            </div>

            {/* How Healthcare Software Transforms Your Business - ULTRA PREMIUM FUTURISTIC */}
            <section className={`relative py-24 lg:py-40 overflow-hidden ${isDayTime ? 'bg-white text-black' : 'bg-black text-white'}`}>
                <FxBackground day={isDayTime} aurora grid/>
                <FxOrbit size={620} top="-180px" right="-140px" opacity={0.09} speed={18}/>
                <FxOrbit size={420} bottom="-120px" left="-100px" opacity={0.06} speed={32} reverse/>

                <div className="relative z-10 mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.5em]">
                    {/* Premium Section Header */}
                    <div className="max-w-5xl mb-20">
                        <FxReveal>
                            <div className="flex items-center gap-3 mb-6">
                                <FxChip day={!isDayTime}>TRANSFORMATIVE IMPACT</FxChip>
                                <div className="h-px flex-1 max-w-[200px]" style={{background: 'linear-gradient(90deg, rgba(var(--page-accent-rgb),0.5), transparent)'}}/>
                            </div>
                        </FxReveal>
                        <FxReveal>
                            <h2 className="text-[2.8em] lg:text-[4.6em] font-[900] leading-[1.02] tracking-tight mb-6">
                                Healthcare Software That <span style={{background: 'linear-gradient(to right, rgba(var(--page-accent-rgb),1), rgba(var(--page-accent-rgb),0.6))', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}} className="inline-block">Drives Real Business Value</span>
                            </h2>
                        </FxReveal>
                        <FxReveal delay={0.06}>
                            <p className={`text-[1.05em] lg:text-[1.15em] leading-[1.8] font-[300] max-w-3xl ${isDayTime ? 'text-gray-700' : 'text-gray-300'}`}>
                                Transform your healthcare operations with intelligent software that streamlines workflows, ensures compliance, improves patient engagement, and unlocks sustainable growth. Every solution is built on security, scalability, and measurable outcomes.
                            </p>
                        </FxReveal>
                    </div>

                    {/* Ultra Premium Benefits Grid - 3 columns with variable heights */}
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 lg:gap-8 mb-16">
                        {[
                            {
                                id: 'care-coordination',
                                step: '01',
                                title: 'Streamlined Care Coordination',
                                tagline: 'Central Hub for Patient Management',
                                description: 'Consolidate patient information into a unified, secure platform. Automate scheduling, reminders, and multi-party communication while enabling real-time access to critical data.',
                                metrics: [
                                    { label: 'Admin Reduction', value: '60%+' },
                                    { label: 'Access Time', value: '-70%' }
                                ],
                                features: [
                                    'Centralized patient records',
                                    'Automated scheduling & reminders',
                                    'Multi-provider communication',
                                    'Real-time data synchronization'
                                ],
                                featured: true
                            },
                            {
                                id: 'data-protection',
                                step: '02',
                                title: 'Enterprise-Grade Security',
                                tagline: 'HIPAA & GDPR Compliant by Default',
                                description: 'Multi-layer encryption, advanced authentication, and role-based access controls ensure sensitive patient data remains protected at every level with full regulatory compliance.',
                                metrics: [
                                    { label: 'Compliance', value: '100%' },
                                    { label: 'Encryption', value: 'AES-256' }
                                ],
                                features: [
                                    'HIPAA & GDPR certified',
                                    'End-to-end encryption',
                                    'Advanced authentication',
                                    'Audit trail logging'
                                ],
                                featured: true
                            },
                            {
                                id: 'clinical-workflows',
                                step: '03',
                                title: 'Intelligent Workflow Automation',
                                tagline: 'Eliminate Manual Processes',
                                description: 'Automate routine clinical tasks, streamline documentation, and reduce human error. Empower medical personnel to dedicate more time to patient care instead of paperwork.',
                                metrics: [
                                    { label: 'Docs Time', value: '-50%' },
                                    { label: 'Error Rate', value: '-85%' }
                                ],
                                features: [
                                    'Clinical task automation',
                                    'Smart documentation',
                                    'Error reduction AI',
                                    'Workflow optimization'
                                ]
                            },
                            {
                                id: 'telehealth',
                                step: '04',
                                title: 'Advanced Telehealth Platform',
                                tagline: 'Care Beyond Clinic Walls',
                                description: 'Secure video consultations, remote patient monitoring, and seamless provider-patient communication. Expand access to care globally while maintaining continuity and quality.',
                                metrics: [
                                    { label: 'Patient Reach', value: 'Global' },
                                    { label: 'Uptime', value: '99.9%' }
                                ],
                                features: [
                                    'Secure video consultations',
                                    'Remote monitoring suite',
                                    'Provider messaging',
                                    'Global accessibility'
                                ]
                            },
                            {
                                id: 'compliance-management',
                                step: '05',
                                title: 'Automated Compliance Framework',
                                tagline: 'Stay Audit-Ready Always',
                                description: 'Automatically track regulatory changes, maintain detailed audit trails, and streamline compliance reporting across local and international standards without disrupting operations.',
                                metrics: [
                                    { label: 'Reporting Time', value: '-75%' },
                                    { label: 'Standards', value: '20+' }
                                ],
                                features: [
                                    'Regulatory tracking',
                                    'Automated documentation',
                                    'Audit trail logging',
                                    'Compliance dashboards'
                                ]
                            },
                            {
                                id: 'ehr-integration',
                                step: '06',
                                title: 'Unified EHR Ecosystem',
                                tagline: 'Single Source of Truth',
                                description: 'Consolidate patient histories, lab results, prescriptions, and clinical notes into one secure hub. Enable seamless care coordination and eliminate data silos completely.',
                                metrics: [
                                    { label: 'Data Silos', value: 'Eliminated' },
                                    { label: 'Query Time', value: '<2s' }
                                ],
                                features: [
                                    'Unified patient records',
                                    'Lab & prescription integration',
                                    'Clinical notes consolidation',
                                    'Instant data retrieval'
                                ],
                                featured: true
                            }
                        ].map((benefit, idx) => (
                            <FxReveal key={benefit.id} delay={0.05 + idx * 0.04}>
                                <div
                                    id={benefit.id}
                                    className={`relative h-full rounded-2xl overflow-hidden border transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 group ${benefit.featured ? 'lg:col-span-1 ring-2 ring-opacity-50' : ''} ${isDayTime ? 'bg-white/97 border-slate-100' : 'bg-white/8 border-white/12'} ${benefit.featured ? isDayTime ? 'ring-sky-300' : 'ring-cyan-400/40' : ''}`}>
                                    
                                    {/* Premium Background Layers */}
                                    <div className="absolute inset-0 pointer-events-none">
                                        <div className="absolute inset-0 rounded-2xl"
                                             style={{boxShadow: isDayTime ? `inset 0 0 60px rgba(var(--page-accent-rgb),0.04), 0 30px 100px rgba(var(--page-accent-rgb),0.08)` : `inset 0 0 100px rgba(var(--page-accent-rgb),0.05), 0 40px 120px rgba(2,6,23,0.7)`}}/>
                                    </div>

                                    {/* Top gradient accent line with pulse effect */}
                                    <div className="absolute top-0 left-0 h-0.5 w-full"
                                         style={{background: 'linear-gradient(90deg, transparent, rgba(var(--page-accent-rgb),1), transparent)'}}/>

                                    {/* Featured badge */}
                                    {benefit.featured && (
                                        <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold text-white backdrop-blur-md"
                                             style={{background: 'linear-gradient(135deg, rgba(var(--page-accent-rgb),0.8), rgba(var(--page-accent-rgb),0.5))'}}>
                                            ✦ Featured
                                        </div>
                                    )}

                                    <div className="relative p-6 lg:p-7 h-full flex flex-col">
                                        {/* Step Badge */}
                                        <div className="mb-5">
                                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl text-white font-bold text-lg"
                                                 style={{background: 'linear-gradient(135deg, rgba(var(--page-accent-rgb),1), rgba(var(--page-accent-rgb),0.7))'}}>
                                                {benefit.step}
                                            </div>
                                        </div>

                                        {/* Title & Tagline */}
                                        <h3 className="text-[1.35em] font-[800] leading-[1.15] mb-2">{benefit.title}</h3>
                                        <p className={`text-xs font-semibold tracking-widest mb-4 ${isDayTime ? 'text-slate-500' : 'text-white/50'}`}>
                                            {benefit.tagline.toUpperCase()}
                                        </p>

                                        {/* Description */}
                                        <p className={`text-[0.9em] font-[300] leading-[1.7] mb-6 ${isDayTime ? 'text-gray-700' : 'text-white/70'}`}>
                                            {benefit.description}
                                        </p>

                                        {/* Metrics Grid */}
                                        <div className="grid grid-cols-2 gap-3 mb-6">
                                            {benefit.metrics.map((metric, i) => (
                                                <div key={i} className={`p-3 rounded-lg border ${isDayTime ? 'bg-slate-50 border-slate-100' : 'bg-white/6 border-white/8'}`}>
                                                    <div className={`text-xs font-semibold ${isDayTime ? 'text-slate-600' : 'text-white/60'}`}>
                                                        {metric.label}
                                                    </div>
                                                    <div className="text-lg font-[900] mt-1" style={{background: 'linear-gradient(135deg, rgba(var(--page-accent-rgb),1), rgba(var(--page-accent-rgb),0.7))', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
                                                        {metric.value}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Features List */}
                                        <div className="space-y-2 mb-6 flex-grow">
                                            {benefit.features.map((feature, i) => (
                                                <div key={i} className="flex items-center gap-3">
                                                    <div className="flex-none w-1.5 h-1.5 rounded-full" 
                                                         style={{backgroundColor: 'rgba(var(--page-accent-rgb),0.8)'}}/>
                                                    <span className={`text-[0.85em] font-[400] ${isDayTime ? 'text-gray-700' : 'text-white/70'}`}>
                                                        {feature}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* CTA Link */}
                                        <div className="pt-4 border-t" style={{borderColor: isDayTime ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)'}}>
                                            <a href={`#${benefit.id}`} className={`inline-flex items-center gap-2 text-sm font-semibold group/link transition-all ${isDayTime ? 'text-slate-600 hover:text-black' : 'text-white/70 hover:text-white'}`}>
                                                Learn more
                                                <span className="transition-transform group-hover/link:translate-x-1">→</span>
                                            </a>
                                        </div>
                                    </div>

                                    {/* Decorative accent glow */}
                                    <div className="absolute -right-20 -bottom-20 w-48 h-48 rounded-full opacity-[0.05] pointer-events-none group-hover:opacity-[0.1] transition-opacity duration-500"
                                         style={{background: `radial-gradient(circle, rgba(var(--page-accent-rgb),1), transparent)`}}/>
                                </div>
                            </FxReveal>
                        ))}
                    </div>

                    {/* Advanced Impact Statistics Section */}
                    <FxReveal delay={0.4}>
                        <div className="relative rounded-2xl overflow-hidden mb-16 p-8 lg:p-12 border"
                             style={{background: isDayTime ? 'linear-gradient(135deg, rgba(var(--page-accent-rgb),0.06), rgba(var(--page-accent-rgb),0.02))' : 'linear-gradient(135deg, rgba(var(--page-accent-rgb),0.1), rgba(var(--page-accent-rgb),0.04))', borderColor: `rgba(var(--page-accent-rgb),${isDayTime ? '0.2' : '0.15'})`}}>
                            <div className="relative z-10">
                                <h3 className="text-[1.8em] lg:text-[2.4em] font-[800] mb-8">
                                    Measurable Impact Across Your Organization
                                </h3>
                                <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6">
                                    {[
                                        { metric: '+40%', label: 'Operational Efficiency', desc: 'Reduce manual tasks & overhead' },
                                        { metric: '-60%', label: 'Administrative Burden', desc: 'Free up time for patient care' },
                                        { metric: '100%', label: 'Compliance Coverage', desc: 'HIPAA, GDPR & beyond' },
                                        { metric: '3-6mo', label: 'ROI Timeline', desc: 'Measurable value delivery' }
                                    ].map((stat, i) => (
                                        <div key={i} className="space-y-2">
                                            <div className="text-[2.2em] font-[900]" style={{background: 'linear-gradient(to right, rgba(var(--page-accent-rgb),1), rgba(var(--page-accent-rgb),0.7))', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
                                                {stat.metric}
                                            </div>
                                            <div className="font-[700]">{stat.label}</div>
                                            <div className={`text-sm ${isDayTime ? 'text-gray-700' : 'text-white/70'}`}>
                                                {stat.desc}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="absolute -right-32 -top-32 w-96 h-96 rounded-full opacity-[0.04] pointer-events-none"
                                 style={{background: `radial-gradient(circle, rgba(var(--page-accent-rgb),1), transparent)`}}/>
                        </div>
                    </FxReveal>

                    {/* Premium CTA Section */}
                    <FxReveal delay={0.5}>
                        <div className="relative rounded-2xl overflow-hidden p-10 lg:p-16 border text-center lg:text-left"
                             style={{background: isDayTime ? 'linear-gradient(135deg, rgba(var(--page-accent-rgb),0.08), rgba(var(--page-accent-rgb),0.03))' : 'linear-gradient(135deg, rgba(var(--page-accent-rgb),0.12), rgba(var(--page-accent-rgb),0.05))', borderColor: `rgba(var(--page-accent-rgb),${isDayTime ? '0.25' : '0.2'})`}}>
                            <div className="relative z-10 max-w-4xl">
                                <h3 className="text-[2em] lg:text-[2.8em] font-[900] leading-[1.1] mb-4">
                                    Ready to transform your healthcare operations?
                                </h3>
                                <p className={`text-[1em] lg:text-[1.1em] leading-[1.8] mb-8 max-w-2xl ${isDayTime ? 'text-gray-700' : 'text-white/70'}`}>
                                    Our healthcare software solutions deliver measurable value through intelligent automation, enterprise security, and seamless integration. Let's discuss how we can help your organization achieve its transformation goals and unlock sustainable growth.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                    <FxButton day={!isDayTime} href="/contact" variant="solid">
                                        Schedule a consultation →
                                    </FxButton>
                                    <FxButton day={!isDayTime} href="/portfolio" variant="ghost">
                                        View case studies
                                    </FxButton>
                                </div>
                            </div>
                            <div className="absolute -right-40 -top-40 w-[500px] h-[500px] rounded-full opacity-[0.05] pointer-events-none"
                                 style={{background: `radial-gradient(circle, rgba(var(--page-accent-rgb),1), transparent)`}}/>
                        </div>
                    </FxReveal>
                </div>
            </section>

            {/* Last Image - Premium Healthcare Showcase */}
            <div id={'healthcare-solution-showcase'} className={`relative w-full mx-auto px-4 sm:px-6 lg:px-[4.6em] md:px-[4.6em] lg:py-[6em] md:py-[6em] py-[3em]`}>
                <FxBackground day={isDayTime} />
                
                <div className={`relative rounded-2xl overflow-hidden group`}>
                    {/* Base Image with Enhanced Overlays */}
                    <div className={`relative h-[500px] lg:h-[600px] overflow-hidden rounded-2xl border ${isDayTime ? 'border-white/10' : 'border-black/10'}`}>
                        {/* Image */}
                        <Image
                            className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-700'
                            src={'/assets/health/cta-4.jpg'}
                            alt={'Healthcare Solution Showcase'}
                            width={1536}
                            height={860}
                            style={{
                                objectFit: "cover",
                                objectPosition: "center",
                            }}
                        />
                        
                        {/* Premium Gradient Overlays */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                        <div className={`absolute inset-0 bg-gradient-to-r from-[rgba(var(--page-accent-rgb),0.15)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                        
                        {/* Decorative Corner Elements */}
                        <div className="absolute top-0 left-0 w-32 h-32 border border-[rgba(var(--page-accent-rgb),0.2)] rounded-br-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="absolute bottom-0 right-0 w-40 h-40 border border-[rgba(var(--page-accent-rgb),0.15)] rounded-tl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        
                        {/* Content Overlay */}
                        <div className={`absolute inset-0 flex flex-col justify-end p-8 lg:p-12 text-white`}>
                            <div className="relative z-10 max-w-2xl">
                                {/* Badge */}
                                <div className="mb-4 inline-block">
                                    <FxChip day={true} colorScheme="page-accent">HEALTHCARE EXCELLENCE</FxChip>
                                </div>
                                
                                {/* Headline */}
                                <h2 className="text-2xl lg:text-4xl font-[600] tracking-tight leading-[1.2] mb-4">
                                    Transforming Healthcare <br/>Through Intelligent Technology
                                </h2>
                                
                                {/* Description */}
                                <p className="text-gray-300 text-sm lg:text-base leading-[1.7] mb-6 max-w-xl">
                                    Our comprehensive healthcare solutions integrate cutting-edge technology with clinical expertise to deliver transformative outcomes. From patient engagement to operational optimization, we empower healthcare organizations to achieve digital excellence.
                                </p>
                                
                                {/* Feature Grid */}
                                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-3">
                                        <div className="text-xs uppercase tracking-wider text-[rgba(var(--page-accent-rgb),1)] font-[600] mb-1">Patient Engagement</div>
                                        <div className="text-xs text-gray-300">Real-time monitoring & support</div>
                                    </div>
                                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-3">
                                        <div className="text-xs uppercase tracking-wider text-[rgba(var(--page-accent-rgb),1)] font-[600] mb-1">Clinical Efficiency</div>
                                        <div className="text-xs text-gray-300">Streamlined workflows & processes</div>
                                    </div>
                                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-3">
                                        <div className="text-xs uppercase tracking-wider text-[rgba(var(--page-accent-rgb),1)] font-[600] mb-1">Data Security</div>
                                        <div className="text-xs text-gray-300">HIPAA-compliant protection</div>
                                    </div>
                                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-3">
                                        <div className="text-xs uppercase tracking-wider text-[rgba(var(--page-accent-rgb),1)] font-[600] mb-1">Scalability</div>
                                        <div className="text-xs text-gray-300">Enterprise-grade infrastructure</div>
                                    </div>
                                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-3">
                                        <div className="text-xs uppercase tracking-wider text-[rgba(var(--page-accent-rgb),1)] font-[600] mb-1">Interoperability</div>
                                        <div className="text-xs text-gray-300">Seamless system integration</div>
                                    </div>
                                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-3">
                                        <div className="text-xs uppercase tracking-wider text-[rgba(var(--page-accent-rgb),1)] font-[600] mb-1">24/7 Support</div>
                                        <div className="text-xs text-gray-300">Expert clinical & technical teams</div>
                                    </div>
                                </div>
                                
                                {/* CTA Buttons */}
                                <div className="flex flex-wrap gap-3">
                                    <button className={`px-6 py-3 rounded-lg font-[600] text-sm transition-all duration-300 ${
                                        isDayTime 
                                            ? 'bg-white text-black hover:bg-gray-100 hover:shadow-lg' 
                                            : 'bg-white text-black hover:bg-gray-100 hover:shadow-lg'
                                    }`}>
                                        Explore Solutions
                                    </button>
                                    <button className={`px-6 py-3 rounded-lg font-[600] text-sm border transition-all duration-300 ${
                                        isDayTime 
                                            ? 'border-white/30 text-white hover:border-white/60 hover:bg-white/5' 
                                            : 'border-white/30 text-white hover:border-white/60 hover:bg-white/5'
                                    }`}>
                                        Schedule Demo
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Healthcare Development Methodology - FUTURISTIC, DETAILED */}
            <section className={`relative py-20 lg:py-32 ${isDayTime ? 'bg-white text-black' : 'bg-black text-white'}`}>
                <FxBackground day={isDayTime} aurora grid/>
                <FxOrbit size={520} top="-120px" right="-160px" opacity={0.08} speed={22}/>
                <FxOrbit size={320} bottom="-80px" left="-100px" opacity={0.06} speed={30} reverse/>

                <div className="relative z-10 mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.5em]">
                    {/* Section Header */}
                    <div className="max-w-3xl mb-14">
                        <FxChip day={!isDayTime}>OUR APPROACH</FxChip>
                        <FxReveal>
                            <h2 className="text-[2.6em] lg:text-[4.2em] font-[800] leading-[1.04] tracking-tight mt-4 mb-4">
                                How We Stand Out — <span style={{background: 'linear-gradient(to right, rgba(var(--page-accent-rgb),1), rgba(var(--page-accent-rgb),0.7))', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}} className="inline-block">Healthcare Excellence</span>
                            </h2>
                        </FxReveal>
                        <FxReveal delay={0.06}>
                            <p className={`text-[1em] lg:text-[1.05em] leading-[1.7] font-[300] ${isDayTime ? 'text-gray-600' : 'text-gray-400'}`}>
                                We combine deep industry expertise with cutting-edge technology to deliver secure, compliant, and scalable healthcare solutions. Our methodology emphasizes measurable outcomes, seamless integration, and user-centric design that improves patient care and operational efficiency.
                            </p>
                        </FxReveal>
                    </div>

                    {/* Detailed process grid — rich cards */}
                    <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6 lg:gap-8">
                        {[
                            {
                                step: '01',
                                title: 'Committed to Client Success',
                                timeframe: '1–2 weeks',
                                items: ['Stakeholder workshops', 'Requirements analysis', 'Healthcare compliance review', 'Solution architecture planning'],
                                acceptance: 'Scope document, Requirements matrix, Project timeline'
                            },
                            {
                                step: '02',
                                title: 'Expertise You Can Trust',
                                timeframe: '2–4 weeks',
                                items: ['Domain expertise validation', 'Security & HIPAA assessment', 'Technology stack selection', 'Integration planning'],
                                acceptance: 'Technical roadmap, Security protocols, Vendor evaluation'
                            },
                            {
                                step: '03',
                                title: 'Scalable Architecture',
                                timeframe: '3–6 weeks',
                                items: ['System design & modeling', 'Database architecture', 'API & microservices design', 'Performance planning'],
                                acceptance: 'Architecture diagram, System specifications, Capacity plan'
                            },
                            {
                                step: '04',
                                title: 'User-Centric Interface Design',
                                timeframe: 'Ongoing',
                                items: ['Interface design & prototypes', 'Accessibility compliance', 'Usability testing', 'Patient & provider workflows'],
                                acceptance: 'Design system, Validated prototypes, Accessibility report'
                            }
                        ].map((c, idx) => (
                            <FxReveal key={c.step} delay={0.06 + idx * 0.06}>
                                <div
                                    className={`relative p-6 rounded-2xl overflow-hidden border transition-all duration-300 hover:scale-[1.015] hover:shadow-2xl ${isDayTime ? 'bg-white/95 text-black border-slate-100' : 'bg-white/6 text-white border-white/8'}`}>

                                    {/* ambient glow */}
                                    <div className="absolute inset-0 pointer-events-none rounded-2xl"
                                         style={{boxShadow: isDayTime ? `0 30px 80px rgba(var(--page-accent-rgb),0.08)` : `0 40px 120px rgba(2,6,23,0.6)`}}/>

                                    <div className="flex items-start justify-between">
                                        <div>
                                            <div className="text-[0.9em] font-mono text-slate-400">{c.step}</div>
                                            <h3 className="mt-3 text-[1.35em] font-[700] leading-[1.05]">{c.title}</h3>
                                            <div
                                                className={`mt-2 text-xs font-semibold ${isDayTime ? 'text-slate-600' : 'text-white/70'}`}>{c.timeframe}</div>
                                        </div>
                                        <div className="hidden lg:flex flex-col items-end gap-2">
                                            <div
                                                className={`px-3 py-1 rounded-full text-xs font-semibold ${isDayTime ? 'bg-slate-50 text-slate-700' : 'bg-white/6 text-white/80'} border ${isDayTime ? 'border-slate-100' : 'border-white/8'}`}>Deliverables
                                            </div>
                                            <div
                                                className={`px-3 py-1 rounded-full text-xs font-semibold ${isDayTime ? 'bg-slate-50 text-slate-700' : 'bg-white/6 text-white/80'} border ${isDayTime ? 'border-slate-100' : 'border-white/8'}`}>Outcomes
                                            </div>
                                        </div>
                                    </div>

                                    <p className={`mt-4 text-[0.95em] font-[300] leading-[1.6] ${isDayTime ? 'text-gray-700' : 'text-white/70'}`}>{c.acceptance}</p>

                                    <div className="mt-4 grid gap-2">
                                        {c.items.map((it) => (
                                            <div key={it}
                                                 className={`flex items-center gap-3 text-sm ${isDayTime ? 'text-slate-600' : 'text-white/70'}`}>
                                                <div
                                                    className={`w-2 h-2 rounded-full`}
                                                    style={{backgroundColor: 'rgba(var(--page-accent-rgb),0.8)'}}/>
                                                <div className="truncate">{it}</div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-5 flex items-center justify-between">
                                        <div className="text-[0.85em] font-[500] text-slate-400">Acceptance</div>
                                        <div
                                            style={{background: 'linear-gradient(to right, rgba(var(--page-accent-rgb),1), rgba(var(--page-accent-rgb),0.7))', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}
                                            className="text-[0.9em] font-extrabold">{c.acceptance.split(',')[0]}</div>
                                    </div>

                                    <div
                                        className="absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-10 pointer-events-none"
                                        style={{background: isDayTime ? `radial-gradient(circle, rgba(var(--page-accent-rgb),0.8), transparent)` : `radial-gradient(circle, rgba(var(--page-accent-rgb),0.4), transparent)`}}/>
                                </div>
                            </FxReveal>
                        ))}
                    </div>

                    {/* Horizontal KPI strip */}
                    <FxReveal delay={0.4}>
                        <div
                            className={`mt-10 p-6 rounded-2xl backdrop-blur-md border ${isDayTime ? 'bg-white/5' : 'bg-black/5'}`}
                            style={{borderColor: `rgba(var(--page-accent-rgb), ${isDayTime ? '0.2' : '0.15'})`}}>
                            <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
                                {[{val: 'Secure by Default', label: 'HIPAA & GDPR Compliant'}, {
                                    val: 'Scalable Systems',
                                    label: 'Enterprise-grade Infrastructure'
                                }, {val: 'User Focused', label: 'Patient & Provider UX'}, {
                                    val: 'Measurable Results',
                                    label: 'KPI-driven Delivery'
                                }].map((s, i) => (
                                    <div key={i} className="text-center lg:text-left">
                                        <div style={{background: 'linear-gradient(to right, rgba(var(--page-accent-rgb),1), rgba(var(--page-accent-rgb),0.7))', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}} className="text-[1.6em] font-[800] mb-1">{s.val}</div>
                                        <div
                                            className={`text-[0.78em] font-[600] ${isDayTime ? 'text-gray-700' : 'text-white/70'}`}>{s.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </FxReveal>

                    {/* CTA */}
                    <FxReveal delay={0.52}>
                        <div className="mt-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                            <div>
                                <h4 className={`text-[1.05em] font-[700] ${isDayTime ? 'text-gray-800' : 'text-white/90'}`}>Ready to transform your healthcare delivery?</h4>
                                <p className={`text-[0.95em] ${isDayTime ? 'text-gray-700' : 'text-white/70'}`}>We combine clinical expertise and engineering excellence to deliver secure, compliant, and impactful healthcare solutions. Book a discovery session to explore your transformation journey.</p>
                            </div>
                            <FxButton day={!isDayTime} href="/contact" variant="solid" className="whitespace-nowrap">Book a discovery →</FxButton>
                        </div>
                    </FxReveal>
                </div>
            </section>

            {/* Who is involved — Modern, collaborative teams */}
            <section id={'involved'}
                     className={`relative lg:pt-28 pt-12 lg:pb-28 pb-12 px-4 sm:px-6 lg:px-[4.6em] w-full max-w-full ${isDayTime ? 'text-slate-900' : 'text-white'}`}>
                <div className="relative max-w-[96em] mx-auto">
                    <div className="flex items-center gap-4 mb-8">
                        <span
                            className={`inline-block w-1.5 h-1.5 rounded-full ${isDayTime ? 'bg-gradient-to-br from-sky-400 to-cyan-400' : 'bg-gradient-to-br from-teal-400 to-blue-500'}`} style={{background: 'linear-gradient(135deg, rgba(var(--page-accent-rgb),1), rgba(var(--page-accent-rgb),0.7))'}}></span>
                        <h6 className={`uppercase tracking-widest text-xs font-semibold ${isDayTime ? 'text-slate-500' : 'text-slate-300'}`}>Our Team</h6>
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
                                    Healthcare software development is a collaborative process that brings together clinical expertise and technical innovation to build solutions that improve patient outcomes and streamline operations. At the core of the team is a project manager or healthcare product lead who coordinates timelines, client feedback, compliance requirements, and overall direction. Healthcare software architects and developers design and build robust, secure systems to handle sensitive patient data, ensure HIPAA compliance, and integrate seamlessly with existing healthcare infrastructure and EHR systems.
                                </p>

                                <p className='text-[0.92em] font-[400] mt-4 text-justify leading-[1.6]'>
                                    Complementing this are UI/UX designers who create intuitive, accessible interfaces for both healthcare providers and patients, QA specialists who rigorously test for functionality, security, and regulatory compliance, and DevOps engineers who manage deployment, system stability, and disaster recovery. Depending on the project, healthcare compliance officers, data security specialists, and clinical advisors may also be involved to ensure solutions meet regulatory standards, protect patient privacy, and deliver measurable clinical and business value.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    {
                                        role: 'Healthcare Product Lead',
                                        desc: 'Defines clinical requirements, success metrics, compliance roadmap'
                                    },
                                    {
                                        role: 'Project Manager',
                                        desc: 'Coordinates delivery, stakeholder engagement, and project milestones'
                                    },
                                    {
                                        role: 'Healthcare Software Engineers',
                                        desc: 'Build secure systems, ensure HIPAA compliance, seamless EHR integration'
                                    },
                                    {role: 'UX/UI & QA Specialists', desc: 'Accessible interfaces, security testing, compliance validation'},
                                ].map((r, i) => (
                                    <FxReveal key={r.role} delay={0.08 + i * 0.04}>
                                        <div
                                            className={`p-4 rounded-lg border ${isDayTime ? 'bg-white/95 border-slate-100' : 'bg-white/5 border-white/8'}`}>
                                            <div className="flex items-start gap-4">
                                                <div
                                                    className="flex-none w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-lg"
                                                    style={{background: 'linear-gradient(135deg, rgba(var(--page-accent-rgb),1), rgba(var(--page-accent-rgb),0.7))'}}>
                                                    {i + 1}
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-sm">{r.role}</div>
                                                    <div className={`text-sm ${isDayTime ? 'text-slate-600' : 'text-slate-400'}`}>{r.desc}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </FxReveal>
                                ))}
                            </div>

                            <div className="mt-4">
                                <FxReveal delay={0.26}>
                                    <FxButton day={!isDayTime} href="/contact" variant="solid">Work with our team →</FxButton>
                                </FxReveal>
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
                                         style={{boxShadow: isDayTime ? 'inset 0 0 40px rgba(var(--page-accent-rgb),0.06), 0 20px 60px rgba(var(--page-accent-rgb),0.05)' : 'inset 0 0 80px rgba(var(--page-accent-rgb),0.06), 0 30px 90px rgba(2,6,23,0.6)'}}/>
                                    <div aria-hidden className="absolute inset-0 pointer-events-none">
                                        <div
                                            className="absolute -top-28 -left-20 w-[420px] h-[420px] rounded-full opacity-18"
                                            style={{background: isDayTime ? `radial-gradient(circle, rgba(var(--page-accent-rgb),1) 0%, transparent 70%)` : `radial-gradient(circle, rgba(var(--page-accent-rgb),0.6) 0%, transparent 70%)`}}/>
                                        <div
                                            className="absolute -bottom-20 -right-16 w-[340px] h-[340px] rounded-full opacity-12"
                                            style={{background: isDayTime ? `radial-gradient(circle, rgba(var(--page-accent-rgb),0.8) 0%, transparent 70%)` : `radial-gradient(circle, rgba(var(--page-accent-rgb),0.4) 0%, transparent 70%)`}}/>
                                    </div>

                                    <Image
                                        src="/assets/hybrid/trip.jpg"
                                        alt="Team at table"
                                        width={1200}
                                        height={800}
                                        className="w-full h-auto object-cover rounded-2xl"
                                    />

                                    <div
                                        className='absolute bottom-4 left-4 px-3 py-2 rounded-full backdrop-blur-md text-sm font-semibold text-white'
                                        style={{background: isDayTime ? 'rgba(255,255,255,0.85)' : 'rgba(8,10,20,0.6)', color: isDayTime ? 'black' : 'white'}}>
                                        Collaborative workshops
                                    </div>
                                </div>
                            </div>

                            {/* Right image - smaller, offset vertically */}
                            <div
                                className="flex-1 flex justify-center lg:pl-[15em] md:pl-[15em] lg:-mr-[4em] items-start pt-12">
                                <div
                                    className={`relative rounded-2xl overflow-hidden border ${isDayTime ? 'bg-white/95 border-slate-100' : 'bg-white/6 border-white/8'} shadow-xl w-full max-w-[320px]`}>
                                    {/* Neon rim */}
                                    <div className="absolute inset-0 pointer-events-none rounded-2xl"
                                         style={{boxShadow: isDayTime ? `inset 0 0 30px rgba(var(--page-accent-rgb),0.08), 0 15px 50px rgba(var(--page-accent-rgb),0.04)` : `inset 0 0 60px rgba(var(--page-accent-rgb),0.06), 0 20px 60px rgba(2,6,23,0.5)`}}/>

                                    <Image
                                        src="/assets/hybrid/disc.jpg"
                                        alt="Team collaboration"
                                        width={320}
                                        height={480}
                                        className="w-full h-auto object-cover rounded-2xl"
                                    />

                                    <div
                                        className='absolute top-4 right-4 px-3 py-2 rounded-full backdrop-blur-md text-xs font-semibold text-white'
                                        style={{background: isDayTime ? 'rgba(255,255,255,0.85)' : 'rgba(8,10,20,0.6)', color: isDayTime ? 'black' : 'white'}}>
                                        ✦ Expert Teams
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

export default Healthcare;

